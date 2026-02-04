import { GoogleGenAI, Type } from "@google/genai";
import { NovelConfig, NovelNode, NodeType } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("Vui lòng cấu hình API KEY");
  return new GoogleGenAI({ apiKey });
};

// Prompt templates based on the user request
const PROMPTS = {
  STRUCTURE: (config: NovelConfig) => `
    Bạn là một kiến trúc sư tiểu thuyết đại tài. Dựa trên ý tưởng sau, hãy xây dựng một cấu trúc cây cho tiểu thuyết.
    
    Thông tin đầu vào:
    - Thể loại: ${config.genre}
    - Giọng văn: ${config.tone}
    - Bối cảnh: ${config.setting}
    - Nhân vật chính: ${config.mainCharacter}
    - Ý tưởng cốt lõi: ${config.plotIdea}

    Yêu cầu output:
    - Trả về JSON theo cấu trúc phân cấp: Tiểu thuyết -> Phần -> Chương -> Hồi (tùy chọn) -> Mục.
    - Ít nhất 3 Phần, mỗi Phần 2-3 Chương.
    - JSON Schema:
    {
      "title": "Tên tiểu thuyết",
      "children": [
        {
          "type": "Phần",
          "title": "Tên phần",
          "summary": "Tóm tắt ngắn gọn phần này",
          "children": [
             { "type": "Chương", "title": "Tên chương", "summary": "Tóm tắt", "children": [] }
          ]
        }
      ]
    }
  `,
  CONTINUE: (node: NovelNode, context: string) => `
    Bạn là một công cụ viết tiểu thuyết. Hãy viết tiếp nội dung cho node: [${node.type} - ${node.title}].
    
    Bối cảnh/Tóm tắt node này: ${node.summary || "Chưa có tóm tắt"}
    Ngữ cảnh truyện: ${context}
    
    Yêu cầu:
    - Giữ đúng mạch truyện và phong cách đã thiết lập.
    - Viết chi tiết, có miêu tả nhân vật, bối cảnh, cảm xúc.
    - Độ dài: Khoảng 1000 - 2000 từ (phù hợp với response limit, user yêu cầu 20k nhưng ta chia nhỏ).
    - Kết thúc mở để có thể tiếp tục ở node sau.
    - Trả về nội dung văn bản thuần túy (Plain Text).
  `,
  SUMMARIZE: (content: string) => `
    Bạn là một công cụ tóm tắt tiểu thuyết. Hãy tóm tắt nội dung sau.
    
    Yêu cầu:
    - Tóm tắt súc tích trong 3–5 câu.
    - Giữ đúng mạch truyện và nhân vật.
    - Nêu rõ bối cảnh, sự kiện chính và cảm xúc nổi bật.
    - Output JSON: { "TomTat": "..." }
    
    Nội dung cần tóm tắt:
    ${content.substring(0, 10000)}
  `,
  ENDING: (node: NovelNode) => `
    Bạn là một công cụ viết tiểu thuyết. Hãy viết đoạn kết cho node: [${node.type} - ${node.title}].
    
    Yêu cầu:
    - Kết thúc súc tích, làm rõ nội dung chính.
    - Viết thêm đoạn dẫn chuyện 2–3 câu để mở sang mục tiếp theo.
    - Xuất ra JSON: { "KetThuc": "...", "DanChuyen": "..." }
  `,
  INTRO: (style: string) => `
    Bạn là một người kể chuyện. Hãy viết đoạn dẫn nhập cho tiểu thuyết theo phong cách ${style}.
    
    Yêu cầu:
    - 3–5 câu.
    - Tạo cảm giác người kể chuyện đang nói trực tiếp.
    - Sinh ít nhất 3 lựa chọn khác nhau.
    - Xuất ra JSON: { "options": ["lựa chọn 1", "lựa chọn 2", "lựa chọn 3"] }
  `
};

export const generateStructure = async (config: NovelConfig): Promise<NovelNode> => {
  const ai = getClient();
  // Using Flash for structure as it's faster and structure logic is strong in 2.5
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: PROMPTS.STRUCTURE(config),
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          children: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                title: { type: Type.STRING },
                summary: { type: Type.STRING },
                children: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING },
                      title: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      children: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: {} } } // Limit depth for schema simplicity, handled by recursive logic in prompt
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  const data = JSON.parse(response.text || "{}");
  
  // Map to internal structure with IDs
  const mapNode = (n: any, type: NodeType = NodeType.NOVEL): NovelNode => ({
    id: Math.random().toString(36).substr(2, 9),
    type: n.type || type,
    title: n.title,
    summary: n.summary,
    content: "",
    children: n.children ? n.children.map((c: any) => mapNode(c, getChildType(type))) : [],
    isExpanded: true
  });

  return mapNode(data, NodeType.NOVEL);
};

const getChildType = (parentType: NodeType): NodeType => {
  switch (parentType) {
    case NodeType.NOVEL: return NodeType.PART;
    case NodeType.PART: return NodeType.CHAPTER;
    case NodeType.CHAPTER: return NodeType.ACT;
    case NodeType.ACT: return NodeType.SECTION;
    default: return NodeType.SECTION;
  }
};

export const generateContent = async (node: NovelNode, context: string): Promise<string> => {
  const ai = getClient();
  // Using Pro for creative writing depth
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: PROMPTS.CONTINUE(node, context),
    config: {
      thinkingConfig: { thinkingBudget: 2048 } // Allow some thinking for plot consistency
    }
  });
  return response.text || "";
};

export const generateSummary = async (content: string): Promise<string> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: PROMPTS.SUMMARIZE(content),
    config: { responseMimeType: "application/json" }
  });
  const json = JSON.parse(response.text || "{}");
  return json.TomTat || "";
};

export const generateEnding = async (node: NovelNode): Promise<{ending: string, transition: string}> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: PROMPTS.ENDING(node),
    config: { responseMimeType: "application/json" }
  });
  const json = JSON.parse(response.text || "{}");
  return { ending: json.KetThuc, transition: json.DanChuyen };
};

export const generateIntroOptions = async (style: string): Promise<string[]> => {
  const ai = getClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // Pro for better style mimicking
    contents: PROMPTS.INTRO(style),
    config: { responseMimeType: "application/json" }
  });
  const json = JSON.parse(response.text || "{}");
  return json.options || [];
};
