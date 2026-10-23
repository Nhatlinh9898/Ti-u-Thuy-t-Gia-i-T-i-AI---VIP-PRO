import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const getApiKey = () => {
  return process.env.GEMINI_API_KEY || process.env.API_KEY || '';
};

const getGenAI = () => {
  const key = getApiKey();
  if (!key) {
    throw new Error('Chưa thiết lập biến môi trường GEMINI_API_KEY');
  }
  return new GoogleGenAI({ apiKey: key });
};

// -------------------------------------------------------------------------
// 1. STANDARD GENERATION APIS
// -------------------------------------------------------------------------
app.post('/api/gemini/generate-structure', async (req, res) => {
  try {
    const { config } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là một kiến trúc sư tiểu thuyết đại tài bậc thầy. Dựa trên ý tưởng sau, hãy xây dựng một cấu trúc cây cho tiểu thuyết theo cấu trúc phân cấp: Tiểu thuyết -> Phần -> Chương -> Hồi -> Mục.
Thể loại: ${config.genre}
Giọng văn: ${config.tone}
Bối cảnh: ${config.setting}
Nhân vật chính: ${config.mainCharacter}
Ý tưởng cốt lõi: ${config.plotIdea}
Quy tắc thế giới: ${config.worldRules || 'Tu luyện từ thấp đến cao'}

Yêu cầu output: Trả về JSON theo cấu trúc cây có ít nhất 3 Phần, mỗi Phần có 2-3 Chương, mỗi Chương có 1-2 Hồi hoặc Mục.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
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
                              summary: { type: Type.STRING }
                            }
                          }
                        }
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

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error generating structure:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-content', async (req, res) => {
  try {
    const {
      node,
      context,
      mode,
      customInstruction,
      currentDraft,
      characters,
      storyBibleChapter,
      omniDatasets,
      wordCountTarget,
      literaryTone
    } = req.body;
    const ai = getGenAI();

    // 1. Dàn nhân vật
    const charContext = Array.isArray(characters) && characters.length > 0
      ? `\n[DANH SÁCH NHÂN VẬT THAM GIA PHÂN CẢNH]:\n` + characters.map((c: any) => `- ${c.name} (${c.realmOrRank || 'Chưa rõ'}, vai trò: ${c.role || 'Nhân vật'}): Tính cách: ${c.personality || 'Không rõ'}, Khí giới/Tuyệt kỹ: ${c.weaponOrAbility || 'Chưa rõ'}, Tông môn/Thân phận: ${c.factionPosition || c.sectOrFaction || 'Không rõ'}`).join('\n')
      : '';

    // 2. Ngữ cảnh Hồ Sơ Cốt Truyện Kinh Điển (Story Bible Dossier)
    let bibleContextSection = '';
    if (storyBibleChapter) {
      bibleContextSection = `
[HỒ SƠ CỐT TRUYỆN CHI TIẾT - STORY BIBLE DOSSIER]:
• Tác Phẩm: ${storyBibleChapter.bibleTitle || 'Tiểu Thuyết Tiên Hiệp Kinh Điển'}
• Quyển: ${storyBibleChapter.volumeTitle || 'Quyển Hiện Tại'}
${storyBibleChapter.volumeConflict ? `• Mâu Thuẫn Lớn Toàn Quyển: ${storyBibleChapter.volumeConflict}` : ''}
• Tiêu Đề Chương Đại Cương: ${storyBibleChapter.chapterTitle || node?.title || ''}
${storyBibleChapter.conflict ? `• XUNG ĐỘT CỐT LÕI CẦN GIẢI QUYẾT: ${storyBibleChapter.conflict}` : ''}
${storyBibleChapter.characterObjective ? `• MỤC TIÊU & ĐỘNG CƠ CỦA NHÂN VẬT CHÍNH: ${storyBibleChapter.characterObjective}` : ''}
${storyBibleChapter.foreshadowing ? `• PHỤC BÚT CẦN GÀI GẮM (CLUES/FORESHADOWING): ${storyBibleChapter.foreshadowing}` : ''}
${storyBibleChapter.lootBreakthrough ? `• PHẦN THƯỞNG / ĐỘT PHÁ CƠ DUYÊN: ${storyBibleChapter.lootBreakthrough}` : ''}
${storyBibleChapter.sampleProse ? `• ĐOẠN VĂN MẪU THAM CHIẾU (HỌC HỎI NHỊP ĐIỆU & PHONG VỊ):\n"""\n${storyBibleChapter.sampleProse.slice(0, 1000)}\n"""` : ''}
`;
    }

    // 3. Toàn bộ kho dữ liệu mẫu được vận dụng (Omni-Datasets Selection)
    let omniDatasetsSection = '';
    if (omniDatasets && Object.keys(omniDatasets).length > 0) {
      const items: string[] = [];
      if (omniDatasets.weapons?.length) items.push(`⚔️ THẦN BINH & PHÁP BẢO: ${omniDatasets.weapons.join('; ')}`);
      if (omniDatasets.treasures?.length) items.push(`💎 THIÊN TÀI ĐỊA BẢO / THƯỢNG CỔ CHÍ BẢO: ${omniDatasets.treasures.join('; ')}`);
      if (omniDatasets.locations?.length) items.push(`🗺️ ĐỊA DANH / BÍ CẢNH / CẤM ĐỊA: ${omniDatasets.locations.join('; ')}`);
      if (omniDatasets.sectsAndEnemies?.length) items.push(`⛩️ TÔNG MÔN / KẺ ĐỊCH / GIAN TẾ / THẾ LỰC: ${omniDatasets.sectsAndEnemies.join('; ')}`);
      if (omniDatasets.cultivationRealms?.length) items.push(`🔥 CẢNH GIỚI TU LUYỆN / DỊ TƯỢNG ĐỘT PHÁ: ${omniDatasets.cultivationRealms.join('; ')}`);
      if (omniDatasets.swordCanons?.length) items.push(`🗡️ KIẾM ĐẠO CHÍ TÔN (CHIÊU THỨC / KIẾM Ý): ${omniDatasets.swordCanons.join('; ')}`);
      if (omniDatasets.spellCanons?.length) items.push(`🔮 THUẬT PHÁP & THẦN THÔNG: ${omniDatasets.spellCanons.join('; ')}`);
      if (omniDatasets.talismanCanons?.length) items.push(`📜 PHÙ LỤC & ĐẠO TRIỆN: ${omniDatasets.talismanCanons.join('; ')}`);
      if (omniDatasets.alchemyPills?.length) items.push(`🌿 ĐAN DƯỢC & DƯỢC THẢO THẦN PHẨM: ${omniDatasets.alchemyPills.join('; ')}`);
      if (omniDatasets.spiritBeasts?.length) items.push(`🐉 LINH THÚ / DỊ THÚ THƯỢNG CỔ: ${omniDatasets.spiritBeasts.join('; ')}`);
      if (omniDatasets.subplotsAndClues?.length) items.push(`🌿 MẠCH NHÁNH / TIỂU TÌNH TIẾT / MANH MỐI: ${omniDatasets.subplotsAndClues.join('; ')}`);
      if (omniDatasets.artOfWarFormations?.length) items.push(`⚔️ BINH PHÁP, CHIẾN TRẬN & ĐIỀU BINH KHIỂN TƯỚNG: ${omniDatasets.artOfWarFormations.join('; ')}`);
      if (omniDatasets.poeticScenes?.length) items.push(`🌸 TIÊU DAO SƠN THỦY, RƯỢU NGON, MỸ NHÂN, ANH HÙNG & HỢP ĐÀN THỔI SÁO: ${omniDatasets.poeticScenes.join('; ')}`);
      if (omniDatasets.martialTraining?.length) items.push(`🥋 DIỄN VÕ, LUYỆN CÔNG, KHỔ LUYỆN CUNG THƯƠNG & THỔ NẠP: ${omniDatasets.martialTraining.join('; ')}`);
      if (omniDatasets.physicalDuels?.length) items.push(`⚡ THƯ HÙNG GIAO ĐẤU, BIỆN GIẢI CHIÊU THỨC & VẬT LÝ CHIẾN TRƯỜNG: ${omniDatasets.physicalDuels.join('; ')}`);

      if (items.length > 0) {
        omniDatasetsSection = `
[KHO DỮ LIỆU MẪU ĐƯỢC CHỈ ĐỊNH VẬN DỤNG VÀO PHÂN CẢNH]:
Hãy khéo léo đan cài các yếu tố sau vào dòng chảy văn học (miêu tả sinh động uy lực, hình dáng, lai lịch, không khí thay vì chỉ liệt kê khô khan):
${items.map(it => `• ${it}`).join('\n')}
`;
      }
    }

    // 4. Chỉ đạo theo chế độ viết
    let modeDirective = 'Viết tiếp mạch truyện tự nhiên, giàu hình ảnh và kịch tính.';
    switch (mode) {
      case 'MARTIAL_TRAINING':
        modeDirective = 'DIỄN VÕ, LUYỆN TẬP VÕ CÔNG, CÔNG PHÁP & CUNG THƯƠNG: Miêu tả cực kỳ chi tiết cảnh nhân vật khổ luyện võ học, xạ thuật (cung pháp giương cung kéo tên ngàn cân, định thần tức, bắn xuyên bia đá qua bão tuyết), thương pháp (đâm quét, thương kình xoắn ốc xé toạc dòng thác ngược dòng, điểm nhụy hoa cành không rung), võ công quyền cước luyện thể (cương kình, thốn kình nứt đá, ngâm hàn đàm thối cốt) và công pháp thổ nạp (hút tiên thiên tử khí, vận chuyển đại chu thiên kinh mạch, dẫn thiên lôi phá vỡ bình cảnh). Khắc họa sống động thời gian (rạng đông giờ Mão, chính ngọ nắng gắt, đêm tuyết lạnh buốt, giông bão sấm sét), không gian (chân thác nước, đỉnh vách đá cheo leo, cồn cát sa mạc, miệng núi lửa), từng giọt mồ hôi, cơ bắp căng tràn, tiếng vũ khí xé gió và sự tương tác mãnh liệt với môi trường thiên nhiên.';
        break;
      case 'POETIC_LEISURE':
        modeDirective = 'TIÊU DAO DU NGOẠN, LỄ HỘI HOA ĐĂNG & LÃNG MẠN ĐÔI LỨA: Miêu tả cảnh sắc sông nước hữu tình, trăng thanh gió mát, các đêm lễ hội hoa đăng dập dềnh sóng biếc, biển đèn Khổng Minh bay rực rỡ trời đêm, lễ hội giao mùa đất trời. ĐẶC BIỆT KHẮC HỌA SÂU SẮC TÌNH CẢM CẶP ĐÔI ĐANG YÊU: miêu tả chi tiết không gian, thời gian, cảnh vật xung quanh, các hiện tượng trên không (mưa sao băng, pháo hoa nở bung, cánh hoa mai rơi quyện tuyết trắng, đàn én lượn quanh mành trúc), dòng người qua lại tấp nập huyên náo tạo nên sự tương phản với khoảnh khắc tĩnh lặng thiêng liêng chỉ có hai người trong mắt nhau; những cử chỉ ngọt ngào nâng niu (nắm tay sưởi ấm trong tay áo, cùng che ô dầu, gạt bông tuyết trên mi, lau giọt mưa xuân trên má, cài trâm ngọc, ánh mắt tình tứ e lệ); chén rượu ấm nồng và tiếng đàn tỳ bà sáo trúc tri âm thề ước trọn đời.';
        break;
      case 'BIBLE_CANON':
        modeDirective = 'BÁM SÁT HỒ SƠ ĐẠI CƯƠNG: Triển khai chặt chẽ tình tiết theo đúng xung đột cốt lõi, mục tiêu nhân vật và phục bút của chương trong Story Bible. Giữ vững phong thái nhân vật chính.';
        break;
      case 'BATTLE_DAO':
        modeDirective = 'ĐẠI CHIẾN THẦN BINH & TAM ĐẠO: Miêu tả trận thư hùng khốc liệt, uy áp ngập trời. Vận dụng chi tiết chiêu thức kiếm pháp, pháp thuật thần thông, phù lục và thần binh đã chọn. Đối chiến có tiết tấu nhanh, biến hóa hiểm hóc, sát thương uy lực chân thực.';
        break;
      case 'ART_OF_WAR':
        modeDirective = 'BINH PHÁP THỰC CHIẾN & ĐẠI QUÂN CHIẾN TRẬN: Khắc họa bố cục chiến trường quy mô lớn, tiếng trống sấm chiêng lệnh điều động tam quân, sự biến hóa kỳ diệu giữa các chiến trận (Phong Thỉ, Hạc Dực, Ngư Lân, Bát Quái...), sự hiệp đồng giữa cự thuẫn, thiết kỵ, nỏ cơ quan và chiến thuật khắc chế đối thủ.';
        break;
      case 'BREAKTHROUGH':
        modeDirective = 'ĐỘT PHÁ CẢNH GIỚI & DỊ TƯỢNG THIÊN ĐỊA: Miêu tả quá trình vận chuyển linh lực trong kinh mạch, công phá bình cảnh đan điền, chịu đựng lôi kiếp thống khổ, thần hồn lột xác và dị tượng kinh động bát hoang.';
        break;
      case 'FACTION_INTRIGUE':
        modeDirective = 'TÔNG MÔN ĐẤU TRÍ & GIAN TẾ: Khắc họa cuộc đấu trí ngầm giữa các thế lực, âm mưu cài cắm gián điệp, lời thoại thâm sâu từng chữ như đao kiếm, sự căng thẳng ngột ngạt trước bão táp.';
        break;
      case 'SUBPLOT_WEAVE':
        modeDirective = 'LỒNG GHÉP MẠCH NHÁNH & MANH MỐI: Khéo léo kết nối mạch truyện phụ, giải mã hoặc tạo đầu mối manh mối mới, gắn kết tiểu mạch vào đại cuộc của mạch chính mà không gây đứt đoạn cảm xúc.';
        break;
      case 'CLASSICAL_PROSE':
        modeDirective = 'PHONG VỊ CỔ PHONG TRẦM HÙNG: Vận dụng bút pháp cổ văn hào hùng, giàu nhạc tính, thi vị hóa cảnh giới và khắc họa chiều sâu nhân sinh quan, tư tưởng nghịch thiên cải mệnh.';
        break;
      case 'PHYSICAL_DUEL':
        modeDirective = 'THƯ HÙNG GIAO ĐẤU, BIỆN GIẢI CHIÊU THỨC & TÁC ĐỘNG VẬT LÝ CHIẾN TRƯỜNG: Miêu tả cực kỳ tỉ mỉ cuộc so tài đối kháng đỉnh cao giữa các nhân vật. BẮT BUỘC MIÊU TẢ CẢ CHIÊU THỨC VÀ DIỄN GIẢI BẢN CHẤT CHIÊU THỨC CỦA TỪNG ĐỐI THỦ (cách vận kình, đường đi lực học, góc vung kiếm/thương/quyền, ý đồ chiến thuật, chiêu phản đòn, hóa giải mượn lực tá lực, khai thác sơ hở). ĐỒNG THỜI KHẮC HỌA CHI TIẾT KHÔNG GIAN, THỜI GIAN VÀ TÁC ĐỘNG VẬT LÝ THỰC THỤ LÊN MÔI TRƯỜNG: sóng xung kích nén khí (shockwave Mach cone), chênh lệch áp suất tạo vùng chân không, truyền động năng qua cấu trúc đất/đá làm nứt vỡ vi mô mạng nhện, biến dạng nhiệt và giãn nở hơi nước khi băng hỏa va chạm, sóng âm nổ xé rách không gian, dư chấn rung chuyển địa tầng.';
        break;
      case 'FIGHT_SCENE':
        modeDirective = 'GIAO CHIẾN NẢY LỬA & BIỆN GIẢI CHIÊU THỨC: Nhịp văn dồn dập, đòn thế hiểm hóc, va chạm sát khí ngập trời; miêu tả chiêu thức và cách khắc chế của từng đấu thủ kèm tác động vật lý chấn động không gian cảnh vật.';
        break;
      case 'DIALOGUE':
        modeDirective = 'ĐỐI THOẠI CĂNG THẲNG: Ngôn ngữ sắc bén, ẩn giấu toan tính và khí phách của từng phe phái.';
        break;
      case 'EXPAND':
        modeDirective = 'MỞ RỘNG KHÔNG GIAN & TÂM LÝ: Khắc họa sâu sắc phong cảnh kỳ vĩ, áp lực thời không và chuyển biến nội tâm của nhân vật.';
        break;
    }

    const minWords = wordCountTarget ? Math.max(600, wordCountTarget) : 1000;
    const maxWords = minWords + 600;

    const prompt = `Bạn là Đại Văn Hào viết tiểu thuyết Tiên Hiệp / Huyền Huyễn thượng thừa với vốn từ cổ phong uyên thâm, cấu trúc kịch tính bậc thầy và khả năng vận dụng tài tình mọi kho dữ liệu mẫu vào trang viết.

MỤC TIÊU PHÂN ĐOẠN:
- Cấp bậc Node: [${node?.type || 'Chương'}] - ${node?.title || 'Chưa đặt tên'}
- Định hướng tóm tắt: ${node?.summary || 'Triển khai hấp dẫn, lôi cuốn'}
- Đại cục thế giới / Ý tưởng gốc: ${context || ''}
${bibleContextSection}
${omniDatasetsSection}
${charContext}

[BẢN NHÁP HIỆN TẠI]:
${currentDraft ? currentDraft.slice(-2500) : '(Bắt đầu phân cảnh mới từ đầu)'}

[ĐỊNH HƯỚNG VĂN PHONG & CHỈ ĐẠO CỦA TÁC GIẢ]:
- Chế độ sáng tác: ${mode || 'CONTINUE'} (${modeDirective})
- Tông điệu văn học: ${literaryTone || 'Hào hùng bi tráng, nhiệt huyết sảng khoái, đậm chất tiên hiệp cổ phong'}
- Ghi chú chỉ đạo riêng: ${customInstruction || 'Văn phong sắc sảo, câu chữ giàu nhạc tính, đối thoại có thần thái, hình tượng nhân vật rõ nét.'}

YÊU CẦU ĐẶC BIỆT KHI VIẾT:
1. Viết trực tiếp văn xuôi tiểu thuyết tiếng Việt chất lượng cao (tuyệt đối không kèm lời chào hay giải thích ngoài lề).
2. Tự nhiên hóa các dữ liệu mẫu đã cung cấp thành hành động, thoại, uy lực tuyệt chiêu và bầu không khí chân thực.
3. Độ dài mục tiêu: Viết từ ${minWords} đến ${maxWords} chữ, ngắt đoạn mạch lạc, dễ đọc.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ success: true, content: response.text || '' });
  } catch (error: any) {
    console.error('Error generating content:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/summarize', async (req, res) => {
  try {
    const { content } = req.body;
    const ai = getGenAI();
    const prompt = `Tóm tắt súc tích đoạn tiểu thuyết sau trong 3-5 câu, trích xuất 3 sự kiện chính và một điểm thắt nút lôi cuốn (cliffhanger):
${(content || '').substring(0, 8000)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyEvents: { type: Type.ARRAY, items: { type: Type.STRING } },
            cliffhanger: { type: Type.STRING }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error summarizing:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/ending', async (req, res) => {
  try {
    const { node, endingType } = req.body;
    const ai = getGenAI();
    const prompt = `Hãy viết đoạn kết thúc cho chương: "${node?.title || 'Chương này'}".
Tóm tắt chương: ${node?.summary || ''}
Phong cách kết thúc: ${endingType || 'CLIMAX_CLIFFHANGER'} (đỉnh cao kịch tính, mở ra nút thắt tiếp theo).
Yêu cầu:
1. Đoạn kết đắt giá từ 2-4 câu.
2. Đoạn dẫn chuyện mở sang chương sau.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ending: { type: Type.STRING },
            transition: { type: Type.STRING }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error ending:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/intro-options', async (req, res) => {
  try {
    const { tone, genre, idea } = req.body;
    const ai = getGenAI();
    const prompt = `Hãy viết 3 phong cách mở đầu khác nhau cho tác phẩm:
Thể loại: ${genre || 'Tiên Hiệp'}
Giọng văn: ${tone || 'Hùng tráng'}
Ý tưởng: ${idea || ''}
Xuất ra 3 lựa chọn với tên phong cách (style) và đoạn văn dẫn nhập (text).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              style: { type: Type.STRING },
              text: { type: Type.STRING }
            }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '[]');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error intro options:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, context } = req.body;
    const ai = getGenAI();
    const conversation = (messages || []).map((m: any) => `${m.role === 'user' ? 'Người dùng' : 'Trợ lý'}: ${m.content}`).join('\n');
    const prompt = `Bạn là Trợ Lý Cố Vấn Văn Học AI Siêu Cấp VIP PRO cho nhà văn.
Ngữ cảnh tác phẩm: ${JSON.stringify(context || {})}
Lịch sử trò chuyện:
${conversation}

Hãy trả lời chu đáo, sáng tạo, đưa ra các gợi ý cốt truyện độc đáo và logic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    return res.json({ success: true, reply: response.text || '' });
  } catch (error: any) {
    console.error('Error in chat:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-character', async (req, res) => {
  try {
    const { genre, rolePrompt, novelTheme } = req.body;
    const ai = getGenAI();
    const prompt = `Hãy tạo một hồ sơ nhân vật độc đáo cho tiểu thuyết ${genre || 'Tiên Hiệp'}.
Yêu cầu vai trò: ${rolePrompt || 'Chính diện'}
Chủ đề tác phẩm: ${novelTheme || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            realmOrRank: { type: Type.STRING },
            personality: { type: Type.STRING },
            appearance: { type: Type.STRING },
            weaponOrAbility: { type: Type.STRING },
            backstory: { type: Type.STRING }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, character: parsed });
  } catch (error: any) {
    console.error('Error generating character:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// 2. DỆT TRUYỆN TỰ NHIÊN ĐA MẢNG (NATURAL NOVEL WEAVING ENGINE) - CORE NEW API
// -------------------------------------------------------------------------
app.post('/api/gemini/weave-natural-story', async (req, res) => {
  try {
    const { selectedNodes, vignettes, character, storyTone, chapterSpan, customPrompt } = req.body;
    const ai = getGenAI();

    const nodesList = (selectedNodes || []).map((n: any) => `[Mảng: ${n.domain}] - ${n.title} (${n.subtitle || ''}): ${n.essenceDescription || ''}`).join('\n');
    const vignettesList = (vignettes || []).map((v: any) => `[Tàn đoạn / Mẩu truyện: ${v.title}] (${v.category}):\n"${v.vignetteProse}"\nManh mối cốt truyện: ${v.plotSeedsAndSecrets?.join('; ') || ''}`).join('\n\n');

    const prompt = `Bạn là Đệ Nhất Bút Thần Tiểu Thuyết Tiên Hiệp & Huyền Huyễn.
Nhiệm vụ của bạn là: DỆT MẠNG LƯỚI TRI THỨC VÀ CÁC MẪU TRUYỆN ĐƠN LẺ THÀNH MỘT PHÂN CẢNH TRUYỆN TỰ NHIÊN (NATURAL STORY WEAVING).

Yêu cầu then chốt:
1. KHÔNG LIỆT KÊ khô khan: Các yếu tố tri thức (Kiếm đạo, Thuật pháp, Phù lục, Linh thảo, Thần linh, Cảnh giới, Tông môn) và mẩu truyện đơn lẻ phải được đan xen tự nhiên qua hành động, thị giác, xúc giác, âm thanh, tâm lý nhân vật và tình huống hiểm nghèo.
2. MẠCH NHÂN QUẢ TỰ NHIÊN (Organic Causal Chain): Giải thích hợp lý tại sao nhân vật lại đụng độ mẩu truyện này, tại sao chiêu thức kiếm đạo hay phù lục lại xuất hiện đúng lúc, và mối liên kết ngầm với thần phả hoặc địa danh cổ xưa.
3. VĂN PHONG VĂN HỌC ĐỈNH CAO: Tinh tế, giàu hình ảnh, nhịp văn biến hóa từ tĩnh lặng huyền bí sang dồn dập nổ bùng cao trào rồi lắng đọng để lại dư ba sâu lắng.

Dữ liệu đầu vào:
--- CÁC NÚT TRI THỨC ĐƯỢC CHỌN ---
${nodesList || 'Chưa chọn nút cụ thể, hãy tự do phối hợp linh hoạt.'}

--- CÁC MẪU TRUYỆN / TÀN ĐOẠN ĐƠN LẺ ĐƯỢC CHỌN ---
${vignettesList || 'Chưa có mẩu truyện mẫu, hãy sáng tạo một tình huống tao ngộ bất ngờ.'}

--- NHÂN VẬT CHỦ ĐẠO ---
Tên: ${character?.name || 'Lăng Tiêu'} (${character?.realmOrRank || 'Trúc Cơ Kỳ'})
Tính cách: ${character?.personality || 'Trầm tĩnh, quyết đoán, trọng nghĩa'}
Linh căn & Binh khí: ${character?.spiritualRoots || 'Hỗn Độn Căn'} - ${character?.weaponOrAbility || 'Cổ Kiếm Tàn Nguyệt'}

--- PHONG CÁCH & ĐỊNH HƯỚNG ---
Giọng văn mong muốn: ${storyTone || 'Hùng tráng bi tráng, nhiệt huyết nghịch thiên, đấu trí sâu sắc'}
Vị trí chương: ${chapterSpan || 'Phân cảnh cao trào bước ngoặt'}
Chỉ đạo riêng của tác giả: ${customPrompt || 'Tạo cảm giác tự nhiên như nước chảy thành sông, không gượng ép chắp vá.'}

Hãy xuất kết quả theo định dạng JSON chuẩn.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            chapterSceneTitle: { type: Type.STRING },
            selectedNodesUsed: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nodeId: { type: Type.STRING },
                  title: { type: Type.STRING },
                  domain: { type: Type.STRING },
                  wovenRole: { type: Type.STRING }
                }
              }
            },
            organicCausalChain: { type: Type.STRING },
            narrativePacing: {
              type: Type.OBJECT,
              properties: {
                incitingBeat: { type: Type.STRING },
                risingComplication: { type: Type.STRING },
                climaxEncounter: { type: Type.STRING },
                lingeringAftermath: { type: Type.STRING }
              }
            },
            wovenProseStory: { type: Type.STRING },
            naturalFollowupPaths: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  directionTitle: { type: Type.STRING },
                  plotHook: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error weaving natural story:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Sinh mẩu truyện đơn lẻ mới
app.post('/api/gemini/generate-story-vignette', async (req, res) => {
  try {
    const { category, domainTags, mood, customIdea } = req.body;
    const ai = getGenAI();
    const prompt = `Hãy sáng tác một MẪU TRUYỆN ĐƠN LẺ / TÀN ĐOẠN GIAI THOẠI (STORY VIGNETTE) đặc sắc cho tiểu thuyết Tiên Hiệp.
Phân loại: ${category || 'GiaiThoaiDanGian'}
Các mảng liên quan: ${(domainTags || []).join(', ') || 'Kiếm Đạo, Cổ Vật, Tông Môn'}
Bầu không khí: ${mood || 'U tối bí ẩn'}
Ý tưởng gợi mở: ${customIdea || 'Một câu chuyện lưu truyền trong quán trọ hoặc cuốn nhật ký rách của tiền nhân'}

Yêu cầu:
1. vignetteProse: Một đoạn trích truyện đơn lẻ hoàn chỉnh, giàu hình ảnh, có đối thoại, 300 - 600 từ.
2. plotSeedsAndSecrets: 3 bí mật ngầm có thể phát triển thành cốt truyện chính.
3. naturalHookQuestions: 2 câu hỏi khơi gợi tò mò.
4. authorWeavingTips: Lời khuyên cho tác giả cách ghép mẩu truyện này vào truyện một cách tự nhiên.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            loreTags: { type: Type.ARRAY, items: { type: Type.STRING } },
            linkedDomains: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedRealm: { type: Type.STRING },
            atmosphericMood: { type: Type.STRING },
            vignetteProse: { type: Type.STRING },
            plotSeedsAndSecrets: { type: Type.ARRAY, items: { type: Type.STRING } },
            naturalHookQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            authorWeavingTips: { type: Type.STRING }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, vignette: parsed });
  } catch (error: any) {
    console.error('Error generating story vignette:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// 3. MASTER CULTIVATION SPINE & NARRATIVE PLAN APIS
// -------------------------------------------------------------------------
app.post('/api/gemini/generate-cultivation-spine', async (req, res) => {
  try {
    const { stageOrder, stageName, genre, worldTheme, userPrompt } = req.body;
    const ai = getGenAI();
    const prompt = `Hãy thiết kế một Tầng Tuyến Mạch Tu Luyện Toàn Cảnh (Master Cultivation Stage) bậc ${stageOrder || 1}: "${stageName || 'Cảnh Giới Mới'}".
Thể loại: ${genre || 'Tiên Hiệp'}
Chủ đề thế giới: ${worldTheme || ''}
Yêu cầu của tác giả: ${userPrompt || ''}
Bao gồm đầy đủ 10 mảng: Thể Phách, Kiếm Đạo, Thuật Pháp, Phù Lục, Đan Dược, Binh Khí, Thế Lực, Thần Linh, Thiên Kiếp & Cốt Lõi Viết Truyện.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error generating cultivation spine:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-novel-narrative-arc', async (req, res) => {
  try {
    const { novelTitle, protagonistName, storyTone, goldenFinger, worldSetting, customIdea } = req.body;
    const ai = getGenAI();
    const prompt = `Hãy lập một Kế Hoạch Mạch Truyện Dài Hơi (Novel Master Spine Plan) cho tiểu thuyết:
Tên truyện: ${novelTitle || 'Vạn Cổ Kiếm Tôn'}
Nhân vật chính: ${protagonistName || 'Lăng Tiêu'}
Giọng văn: ${storyTone || 'Nhiệt huyết nghịch thiên'}
Bàn tay vàng: ${goldenFinger || 'Hỗn Độn Tàn Ngọc'}
Bối cảnh: ${worldSetting || 'Cửu Châu Thần Vực'}
Ý tưởng riêng: ${customIdea || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error generating novel narrative arc:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/draft-spine-chapter-scene', async (req, res) => {
  try {
    const { stage, character, conflictContext, opponent, userInstructions } = req.body;
    const ai = getGenAI();
    const prompt = `Hãy viết một Phân Cảnh Đột Phá & Thực Chiến Đa Mảng sống động:
Cảnh giới: ${stage?.stageName || 'Trúc Cơ Kỳ'}
Nhân vật: ${character?.name || 'Lăng Tiêu'} (${character?.realmOrRank || 'Trúc Cơ Đỉnh Phong'})
Bối cảnh xung đột: ${conflictContext || 'Bị đối thủ vây hãm trong trận chiến sinh tử'}
Kẻ địch: ${opponent || 'Trưởng lão ma tông hung tàn'}
Chỉ đạo riêng: ${userInstructions || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error drafting spine chapter scene:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// 4. KIẾM ĐẠO, THUẬT PHÁP, PHÙ LỤC, THẦN PHẢ APIS
// -------------------------------------------------------------------------
app.post('/api/gemini/simulate-sword-enlightenment', async (req, res) => {
  try {
    const { character, swordCanon, stance, opponent, genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    const charName = character?.name || 'Kiếm Khách';
    const canonName = swordCanon?.name || 'Thái Cổ Tru Tiên Kiếm Quyết';
    const stanceName = stance?.stanceName || 'Đệ Nhất Thức: Nhất Điểm Hàn Quang';
    const oppName = opponent || 'Cường Địch Ma Đầu';

    const prompt = `Bạn là đại thần văn hào tiểu thuyết ${genre} đỉnh cao.
Hãy viết một phân đoạn MÔ PHỎNG DIỄN VÕ, ĐỐN NGỘ KIẾM ĐẠO VÀ SÁT ĐỊCH ĐỊNH SINH TỬ:
- Nhân vật thi triển: ${charName} (Cảnh giới: ${character?.realmOrRank || 'Trúc Cơ / Kim Đan'}, Kiếm tâm: ${character?.personality || 'Kiên định'})
- Bộ kiếm pháp: ${canonName} (${swordCanon?.gradeLevel || 'Thần Thánh Chí Tôn'})
- Ý cảnh kiếm đạo: ${swordCanon?.coreSwordIntent || 'Bá kiếm sát phạt'}
- Tuyệt Đối Kiếm Vực: ${swordCanon?.absoluteSwordDomain || 'Tru Tiên Kiếm Vực'}
- Chiêu thức thi triển: ${stanceName} (Cảnh giới: ${stance?.intentLevel || 'Kiếm Ý'})
- Khẩu quyết: "${stance?.mantraOrIncantation || 'Nhất kiếm xuất thế'}"
- Vận hành kinh mạch: ${stance?.qiMovementPath || 'Khí tụ mũi kiếm'}
- Bộ pháp & Động tác: ${stance?.footworkKinetic || stance?.physicalMovementAndFootwork || 'Bạt kiếm bộ pháp'}
- Dị tượng kiếm quang: ${stance?.visualPhenomenon || 'Kiếm quang rực rỡ'}
- Đối thủ chạm trán: ${oppName}

Yêu cầu xuất ra định dạng JSON đúng chuẩn với cấu trúc:
{
  "characterName": "${charName}",
  "canonName": "${canonName}",
  "stanceName": "${stanceName}",
  "opponentName": "${oppName}",
  "crisisTrigger": "Tình thế ngàn cân treo sợi tóc kích phát cực hạn tiềm năng (70-100 từ)",
  "innerComprehension": "Khoảnh khắc bừng tỉnh đốn ngộ kiếm ý trong tâm, nhận ra bản chất của chiêu kiếm (80-120 từ)",
  "qiAndSwordExecution": "Chu thiên vận khí qua các huyệt đạo, bộ pháp di chuyển và cơ chế vung kiếm xuất thần (90-130 từ)",
  "environmentalDestruction": "Dị tượng kiếm quang xé toạc đất trời, chấn động không gian và chấn nhiếp địch thủ (80-120 từ)",
  "climacticStrikingMoment": "Khoảnh khắc nhát chém định đoạt sinh tử quyết định chém đứt vũ khí và phòng ngự của kẻ địch (80-110 từ)",
  "proseSegment": "Đoạn văn xuôi tiểu thuyết kiếm hiệp / tiên hiệp mẫu mực dài 750 - 1000 từ, nhịp điệu nghẹt thở dồn dập, miêu tả từng đường kiếm sắc lẹm, đối thoại hào sảng và cảm xúc thăng hoa để tác giả chèn trực tiếp vào bản thảo truyện."
}`;

    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const result = JSON.parse(responseText);
    return res.json({ success: true, result });
  } catch (error: any) {
    console.error('Error simulating sword enlightenment:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/swords/generate', async (req, res) => {
  try {
    const { name, philosophy, genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là đại tông sư sáng lập Kiếm Đạo trong tiểu thuyết ${genre}.
Hãy sáng tạo một BỘ KIẾM ĐẠO CHÍ TÔN hoàn chỉnh đủ 9 TẦNG CẢNH GIỚI (từ Luyện Khí Sơ Nhập đến Thần Cấp Siêu Thoát) với đầy đủ 8 yếu tố chi tiết cho mỗi chiêu:
- Tên gợi ý hoặc ý tưởng: "${name || 'Vô Cực Bạt Kiếm Thuật'}"
- Triết lý kiếm đạo: "${philosophy || 'Bá đạo sát phạt / Khoái kiếm cực hạn / Huyễn kiếm vô hình'}"

Yêu cầu xuất ra JSON chuẩn với cấu trúc:
{
  "name": "Tên bộ kiếm đạo chuẩn kiếm hiệp hào hùng",
  "philosophy": "Triết lý kiếm đạo cốt lõi",
  "gradeLevel": "Thần Thánh Chí Tôn (Cực Đạo Kiếm Điển)",
  "swordRankRequirements": "Yêu cầu phẩm cấp kiếm tu và kiếm tâm",
  "originAndCreator": "Tổ sư sáng lập và lai lịch truyền thuyết",
  "coreSwordIntent": "Tên loại kiếm ý độc môn (ví dụ: Hỗn Độn Kiếm Ý)",
  "absoluteSwordDomain": "Tên Kiếm Vực Tuyệt Đối (ví dụ: Bát Hoang Kiếm Vực)",
  "trainingRegimen": {
    "basicConditioning": "Khổ luyện thể chất cơ bản hàng ngày",
    "heartTestingTrial": "Thử thách tôi luyện đạo tâm và sự kiên định",
    "swordEnergyAwakening": "Phương pháp thức tỉnh tia kiếm khí đầu tiên"
  },
  "stances": [
    {
      "orderNumber": 1,
      "stanceName": "Đệ Nhất Thức: Tên chiêu thức",
      "intentLevel": "1. Sơ Nhập Kiếm Khí (Luyện Khí - Kiếm Khí Ly Thể)",
      "mantraOrIncantation": "Khẩu quyết 4 câu thơ lục ngôn/thất ngôn cổ phong",
      "qiMovementPath": "Đường vận hành kinh mạch từ đan điền qua các huyệt vị",
      "footworkAndKinetic": "Bộ pháp & chuyển dịch trọng tâm",
      "physicalMovementAndFootwork": "Cơ chế di chuyển thân thể",
      "swordFormMechanics": "Góc vung kiếm, biến chiêu và kỹ thuật cổ tay",
      "visualPhenomenon": "Dị tượng kiếm quang màu sắc và hình thái",
      "offensiveLethality": "Ứng dụng sát phạt thực chiến",
      "defensiveVersatility": "Ứng dụng phòng ngự phản kích",
      "hardcoreTrainingMethod": "Bài tập khổ luyện mỗi ngày",
      "enlightenmentKey": "Chìa khóa đốn ngộ kiếm ý",
      "fatalFlawIfRushed": "Nguy hiểm tẩu hỏa nếu luyện vội vã"
    }
  ],
  "authorWritingNotes": "Lời khuyên sáng tác cho tác giả"
}`;

    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const canon = JSON.parse(responseText);
    canon.id = 'canon_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, canon });
  } catch (error: any) {
    console.error('Error generating sword canon:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/simulate-spell-enlightenment', async (req, res) => {
  try {
    const { character, spellCanon, stance, opponent, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Mô phỏng thi triển thuật pháp thần thông:
Nhân vật: ${character?.name || 'Pháp Sư'}
Bộ pháp thuật: ${spellCanon?.name || 'Ngũ Hành Thần Thông'}
Thuật pháp: ${stance?.spellName || 'Ngũ Hành Thần Quang'}
Đối thủ: ${opponent || 'Ma Quân'}
Viết đoạn văn tiểu thuyết thi triển pháp quyết 500 - 800 từ.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error simulating spell:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/simulate-talisman-enlightenment', async (req, res) => {
  try {
    const {
      character,
      talismanCanon,
      method,
      drawingMethod,
      techniqueRank,
      stance,
      opponent,
      genre
    } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là đại sư phụ trách thiết lập hệ thống Phù Lục & Phù Đạo Tiên Hiệp đỉnh cao.
Hãy tạo phân cảnh tiểu thuyết mô tả chi tiết quá trình THI TRIỂN VẼ BÙA, BỘ PHÁP DI CHUYỂN, VẬN KHÍ KINH MẠCH, ĐỐN NGỘ VÀ KÍCH NỔ UY LỰC:
- Nhân vật: ${character?.name || 'Nhân vật chính'} (Cảnh giới: ${character?.realm || 'Trúc Cơ / Kim Đan'})
- Bộ phù lục truyền thừa: ${talismanCanon?.name || 'Thái Thượng Thông Thiên Phù Lục'}
- Cấp bậc thuật pháp: ${techniqueRank?.tierName || 'Trung Cấp'} - Danh hiệu: ${techniqueRank?.masteryTitle || 'Linh Mặc Phù Sư'}
- Trường phái / Phương thức vẽ: ${drawingMethod?.name || 'Chỉ Hư Điểm Phù (Hư Không Lạc Bút)'} (${drawingMethod?.carrierMedium || 'Hư không'})
- Chiêu thức & Bộ pháp thi triển: ${stance?.name || 'Long Xà Biến Vũ'}
  + Bộ pháp di chuyển: ${stance?.footworkMovement || 'Đạp Cương Đẩu Bộ Bát Quái'}
  + Thủ ấn & thế cầm bút: ${stance?.handSealAndGrip || 'Chính Phong Bút Trụ'}
  + Quỹ đạo nét bút: ${stance?.brushTrajectory || 'Như rồng cuộn hổ phục'}
  + Vận hành kinh mạch & huyệt vị: ${stance?.meridianQiOperation || 'Từ Đan Điền qua Đốc Mạch tụ tại Lao Cung huyệt'}
  + Khẩu quyết chân ngôn: ${stance?.incantationSound || 'Cấp Cấp Như Luật Lệnh'}
- Đạo phù kích hoạt: ${method?.talismanName || 'Cửu Thiên Thần Lôi Phù'} (${method?.gradeLevel || 'Tam Phẩm Thượng Giai'})
- Đối thủ / Tình thế ngàn cân treo sợi tóc: ${opponent || 'Đại Yêu Quái vây hãm'}
- Thể loại: ${genre || 'Tiên Hiệp'}

Yêu cầu xuất ra định dạng JSON thuần túy (không markdown bao quanh) với các trường:
{
  "characterName": string,
  "talismanCanonName": string,
  "talismanName": string,
  "opponentName": string,
  "drawingContext": "Bối cảnh căng thẳng trước khi chấp bút/vạch phù",
  "brushTechniqueAndSoulFocus": "Mô tả chi tiết động tác thân pháp, bộ pháp di chuyển, vận khí từ Đan Điền qua kinh mạch đến đầu ngón tay/ngọn bút",
  "runeGlowAndHeavenlyEcho": "Khoảnh khắc đạo văn thành hình, dị tượng trời đất, phù đảm ngưng tụ và đốn ngộ đạo vận",
  "talismanDetonationOrDefense": "Khẩu quyết, ngòi nổ, khoảnh khắc bùa bộc phát xé rách không gian",
  "battlefieldShockwave": "Dư chấn chiến trường, tác động lên đối thủ và cục diện trận chiến",
  "proseSegment": "Đoạn văn tiểu thuyết dài 600 - 1000 từ hoàn chỉnh, văn phong hào sảng, chi tiết cử động, đậm chất tiên hiệp để đưa trực tiếp vào tác phẩm"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (primaryErr: any) {
      console.warn('Primary model busy, falling back to gemini-2.5-flash:', primaryErr?.message);
      try {
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = fallbackRes.text || '{}';
      } catch (secErr: any) {
        // Fallback procedural generation if both models undergo temporary spike
        const fallbackObj = {
          characterName: character?.name || 'Nhân vật chính',
          talismanCanonName: talismanCanon?.name || 'Thái Thượng Thông Thiên Phù Lục',
          talismanName: method?.talismanName || 'Cửu Thiên Thần Lôi Phù',
          opponentName: opponent || 'Đại Yêu Ma Vây Hãm',
          drawingContext: `Giữa vòng vây hiểm nghèo trước ${opponent || 'kẻ thù hung bạo'}, sát khí bốc lên ngùn ngụt như muốn xé rách không gian.`,
          brushTechniqueAndSoulFocus: `Chân đạp Đạp Cương Đẩu Bộ lướt qua ô Khảm Thủy rồi xoay mình giẫm vào ô Ly Hỏa. Chân nguyên từ Khí Hải Đan Điền dâng tràn qua Đốc Mạch, nén chặt tại huyệt Lao Cung rồi bộc phát qua đầu ngón tay như rồng cuộn hổ phục!`,
          runeGlowAndHeavenlyEcho: `Trong hư không, đạo ngân kim sắc rực sáng chói lòa! Bảy điểm Bắc Đẩu Thất Tinh tựa như sao băng ngưng tụ, phù đảm bốc cháy với âm vang chấn động Cửu Châu!`,
          talismanDetonationOrDefense: `Tiếng thét vang dội: "Cấp Cấp Như Luật Lệnh, KHAI!". Tấm phù lục vỡ òa thành hàng ngàn tia lôi hỏa bùng nổ xé toạc màn đêm!`,
          battlefieldShockwave: `Sóng xung kích quét sạch ba mươi trượng, đất đá nổ tung thành tro bụi, khiến đối phương chấn động kinh hoàng thối lui trong biển lửa!`,
          proseSegment: `Gió rít gào thét qua hẻm núi, sát khí lạnh thấu xương của ${opponent || 'kẻ địch'} bủa vây bốn bề. Đối diện với sinh tử gang tấc, ${character?.name || 'Lăng Tiêu'} vẫn bình thản như mặt nước hồ thu.\n\n` +
            `Đột nhiên, bước chân chàng chuyển động! "Đạp Cương Đẩu Bộ!" — thân hình ${character?.name || 'Lăng Tiêu'} biến ảo khôn lường, lướt theo quỹ đạo Cửu Cung Bát Quái. Tay áo phất mạnh, ngón tay điểm chỉ vào hư không. Một luồng linh lực thuần khiết từ Khí Hải Đan Điền dâng tràn dọc theo Đốc Mạch, vượt qua Mệnh Môn và Đại Chùy, rồi nén lại với mật độ kinh hoàng tại huyệt Lao Cung nơi lòng bàn tay!\n\n` +
            `"${stance?.name || 'Long Xà Biến Vũ'}!"\n\n` +
            `Đầu ngón tay chàng phát ra ánh sáng vàng kim chói lọi, vạch vào hư không những đường nét uốn lượn liên miên bất tuyệt. Từng nét vẽ như rồng bay phượng múa, đan dệt không gian thành một tấm phù đồ thượng cổ. Bảy điểm tinh tú sáng rực như Thất Tinh Bắc Đẩu đồng loạt định hình trận nhãn. Thiên địa nguyên khí trong bán kính trăm trượng điên cuồng quy tụ về trung tâm, ngưng kết thành ${method?.talismanName || 'Cửu Thiên Thần Lôi Phù'}!\n\n` +
            `"Thái Thượng sắc lệnh, lôi đình giáng thế, PHÁ!"\n\n` +
            `Một tiếng nổ kinh thiên động địa vang lên! Đạo phù lục bùng cháy chói lòa, phóng ra chín đạo cuồng lôi tím biếc đâm thẳng xuống mặt đất. Sóng xung kích cuộn trào quét bay mọi chướng ngại, chấn nhiếp toàn bộ chiến trường trong khoảnh khắc thần thánh!`
        };
        return res.json({ success: true, result: fallbackObj });
      }
    }

    const parsed = JSON.parse(responseText);
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error simulating talisman:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/simulate-divine-chronicle', async (req, res) => {
  try {
    const { character, deity, epoch, sceneType, customPrompt, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Mô phỏng thần tích và thừa kế thần cách:
Thần linh: ${deity?.name || 'Bàn Cổ Thần'}
Kỷ nguyên: ${epoch?.epochName || 'Kỷ Nguyên Thái Sơ'}
Nhân vật: ${character?.name || 'Lăng Tiêu'}
Dạng phân cảnh: ${sceneType || 'CreationGenesis'}
Viết đoạn văn sử thi hoành tráng 600 - 1000 từ.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error simulating divine chronicle:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// POWER TIER SYSTEM & CHARACTER PROGRESSION ROADMAP GENERATION
// -------------------------------------------------------------------------
app.post('/api/gemini/generate-power-tier-system', async (req, res) => {
  try {
    const { genre, systemIdea, tierCount } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Đại Tông Sư Thiết Kế Hệ Thống Cảnh Giới Tu Luyện Tiểu Thuyết Tiên Hiệp, Huyền Huyễn, Khoa Huyễn đỉnh cao.
Hãy thiết lập một Sơ đồ Hệ thống Tiêu chuẩn Cảnh giới / Trình độ / Cấp bậc cho tác phẩm:
Thể loại: ${genre || 'Tiên Hiệp Cổ Phong'}
Ý tưởng độc quyền: ${systemIdea || 'Hệ thống tu chân chính tông kết hợp thần ma'}
Số lượng đại cảnh giới: ${tierCount || 7}

Yêu cầu xuất JSON cấu trúc chuẩn:
{
  "name": "Tên hệ thống (VD: Cửu Trọng Tiên Đạo Hệ Thống)",
  "genre": "${genre || 'Tiên Hiệp'}",
  "description": "Mô tả triết lý và cốt lõi của hệ thống...",
  "levels": [
    {
      "level": 1,
      "name": "Tên cảnh giới (tiểu cảnh giới)",
      "subStages": "Sơ kỳ • Trung kỳ • Hậu kỳ • Viên mãn",
      "description": "Biến đổi thể chất, kinh mạch, đan điền, thọ mệnh...",
      "breakthroughCondition": "Điều kiện cần để đột phá (đan dược, lôi kiếp, ngộ tính)...",
      "combatPower": "Uy lực thực chiến, khả năng phá hoại, tốc độ...",
      "cultivationMethod": "Phương pháp vận hành chu thiên, thổ nạp...",
      "breakthroughRitual": {
        "requirements": "Dược liệu, linh thạch, trận pháp...",
        "danger": "Hiểm nguy, tâm ma, kinh mạch vỡ vụn...",
        "ritualPlace": "Địa điểm lý tưởng để đột phá..."
      }
    }
  ]
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (err: any) {
      console.warn('Fallback to gemini-2.5-flash for power tier system:', err?.message);
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const parsed = JSON.parse(responseText);
    return res.json({
      success: true,
      system: {
        ...parsed,
        id: 'system_' + Math.random().toString(36).substring(2, 9)
      }
    });
  } catch (error: any) {
    console.error('Error generating power tier system:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-character-roadmap', async (req, res) => {
  try {
    const { character, system, genre, customGoal } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Trợ Lý Cốt Truyện Văn Học AI Siêu Cấp. Hãy thiết lập Sơ đồ Lộ trình Phát triển Nhân vật Theo Từng Giai Đoạn (Character Arc & Progression Roadmap) chuẩn mực cho tiểu thuyết:
Nhân vật: ${character?.name || 'Lăng Tiêu'} (Vai trò: ${character?.role || 'Chính diện'})
Cảnh giới ban đầu: ${character?.realmOrRank || 'Luyện Khí Tầng 1'}
Hệ thống cấp bậc: ${system?.name || 'Cửu Trọng Tiên Đạo Hệ Thống'}
Thể loại: ${genre || 'Tiên Hiệp'}
Định hướng / Mục tiêu: ${customGoal || 'Từ thiếu niên nghèo khó quật khởi chứng đạo vô thượng, bảo hộ người thân'}

Hãy phân chia thành 5 đến 6 giai đoạn phát triển toàn diện trải dài từ mở đầu đến kết thúc truyện:
Xuất ra JSON chuẩn:
{
  "characterId": "${character?.id || 'char_custom'}",
  "characterName": "${character?.name || 'Nhân vật'}",
  "systemName": "${system?.name || 'Hệ thống Tiêu chuẩn'}",
  "overallArcSummary": "Tóm lược toàn bộ hành trình chuyển biến...",
  "stages": [
    {
      "id": "stage_1",
      "order": 1,
      "phaseName": "Tên giai đoạn (VD: Khởi đầu: Phế vật quật khởi)",
      "characterRealm": "Cảnh giới đạt được trong giai đoạn này",
      "storyChapterRange": "Khoảng chương tương ứng (VD: Chương 1 - Chương 30)",
      "milestoneEvent": "Biến cố kích hoạt / Bước ngoặt sinh tử (Catalyst)",
      "abilityUnlocked": "Công pháp, tuyệt kỹ, pháp bảo thức tỉnh",
      "psychologicalArc": "Chuyển biến tâm lý, quá trình tôi luyện nhân cách",
      "bottleneckOrTribulation": "Bình cảnh nan giải, đại kiếp hoặc kẻ thù định mệnh"
    }
  ]
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (err: any) {
      console.warn('Fallback to gemini-2.5-flash for roadmap:', err?.message);
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const parsed = JSON.parse(responseText);
    return res.json({ success: true, roadmap: parsed });
  } catch (error: any) {
    console.error('Error generating character roadmap:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// CHARACTER TRAJECTORY & RELATIONAL NEXUS ROUTING GENERATOR
// -------------------------------------------------------------------------
app.post('/api/character/generate-trajectory', async (req, res) => {
  try {
    const { character, genre, focusPrompt } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là Trưởng Biên Kịch & Chuyên Gia Thiết Kế Vận Mệnh Nhân Vật cho tiểu thuyết ${genre || 'Tiên Hiệp Cổ Phong'}.
Hãy thiết lập một MÔ HÌNH SƠ ĐỒ ĐỊNH TUYẾN MẠNG LƯỚI & NIÊN BIỂU VẬN MỆNH hoàn chỉnh và sâu sắc cho nhân vật sau:

[THÔNG TIN NHÂN VẬT]:
- Tên: ${character.name}
- Danh xưng/Ngoại hiệu: ${character.pinyinOrAlias || 'Chí Tôn'}
- Vai trò: ${character.role || 'Chính diện'}
- Cảnh giới: ${character.realmOrRank || 'Trúc Cơ Kỳ'}
- Tông môn / Thế lực: ${character.sectOrFaction || 'Tán tu'}
- Tính cách: ${character.personality || 'Trầm tĩnh kiên nghị'}
- Vũ khí / Tuyệt kỹ: ${character.weaponOrAbility || 'Kiếm pháp'}
- Bối cảnh quá khứ: ${character.backstory || 'Xuất thân hàn vi'}
- Ý tưởng định hướng thêm: ${focusPrompt || 'Vận mệnh trắc trở, thề phục thù và bảo hộ người thân'}

YÊU CẦU BẮT BUỘC:
1. MẠNG LƯỚI QUAN HỆ (relations): Phải bao gồm đủ các nhóm đối tượng:
   - CHA_ME (Cha mẹ, phụ mẫu, nuôi nấng)
   - GIA_TOC (Gia tộc, dòng họ, thế gia, phân gia)
   - VO_DAO_LU (Vợ, thê thiếp, đạo lữ song tu, hồng nhan)
   - CON_CAI (Con cái, hậu duệ, huyết mạch nối dõi)
   - BAN_BE (Bạn bè, bằng hữu tri giao, huynh đệ sinh tử)
   - HANG_XOM (Hàng xóm, láng giềng hàn vi, thôn trang xưa)
   - TONG_MON (Tông môn, môn phái, chưởng môn, hộ pháp)
   - SU_HUYNH_DE (Sư tôn, sư huynh đệ, sư tỷ muội, đồng môn)
   - DE_TU (Đệ tử môn hạ, chân truyền, truyền nhân)
   - KE_THU (Kẻ thù truyền kiếp, huyết hải thâm cừu, túc địch)

2. NIÊN BIỂU VẬN MỆNH (milestones): Phải có từ 5 đến 8 mốc thời gian:
   - TU_LUYEN | CO_DUYEN_KY_NGO | HOI_NGO_TUONG_PHUNG | CUOC_CHIA_LY | SU_MENH | BUOC_NGOAT_THAY_DOI | NHIEM_VU | DU_NGOAN | THI_LUYEN | BI_CANH

3. BẢN ĐỒ HÀNH TRÌNH ĐỊA DANH THEO MỐC THỜI GIAN (geographicAtlas):
   - Bao gồm các làng mạc, thành trì, bí cảnh, vùng đất, môn phái đã trải qua (DA_TRAI_QUA), đang trải qua (DANG_TRAI_QUA) và cần trải qua / mục tiêu tối hậu trong tương lai (CAN_TRAI_QUA, MUC_TIEU_TOI_HAU) theo từng giai đoạn thời gian.

4. NHÁNH NHIỆM VỤ, DU NGOẠN, THÍ LUYỆN & VÀO BÍ CẢNH (questTrialRecords):
    - NHIEM_VU: Nhiệm vụ tông môn, triều đình, trừ yêu
    - DU_NGOAN: Lần du ngoạn hồng trần, ngao du sơn hà, đàm đạo
    - THI_LUYEN: Thí luyện đại bỉ, lôi đài thiên kiêu, khảo nghiệm sinh tử
    - VAO_BI_CANH: Vào bí cảnh thám hiểm, động thiên phúc địa, đoạt di bảo

5. CƠ DUYÊN THẦN BINH & TRUYỀN THỪA (karmicInheritances):
   - Thần binh bản mệnh, tàn hồn cổ tiên, dị hỏa dị lôi, thần thú khế ước, thánh dược

6. TÚC ĐỊCH HUYẾT THÙ & QUYẾT CHIẾN (nemesisFeuds):
   - Kẻ thù không đội trời chung, nguồn gốc ân oán, quá khứ giao đấu, ước hẹn quyết chiến sinh tử

7. TÂM MA KIẾP NẠN & ĐẠO TÂM (daoHeartDemons):
   - Chấp niệm quá khứ, sát tâm cuồng bạo, bình cảnh cảnh giới, phương pháp phá chấp đốn ngộ

8. QUYỀN LỰC THẾ LỰC & LÃNH ĐỊA (factionPowers):
   - Chức vị môn phái, lãnh địa cai quản, đồng minh liên minh, di sản đóng góp

9. MẠCH CHUYỆN PHỤ & GIAI THOẠI TIỂU SỬ QUA LỜI TƯỜNG THUẬT / NHẮC TỚI (oralLoreSubplots):
   - Bổ sung giải thích về tiểu sử của nhân vật khi nhân vật được người tường thuật hay nhắc tới, tạo cho nhân vật có sự sống động, chân thực và rõ ràng:
     + THUYET_THU_NHAN: Thuyết thư nhân quán trà / khách điếm gõ thước kinh đường truyền tụng
     + CO_NHAN_HAN_VI: Cố nhân thuở hàn vi, hàng xóm láng giềng nghèo khó
     + KE_THU_SONG_SOT: Kẻ thù sống sót, bại tướng run rẩy nhắc về với nỗi khiếp đảm
     + DONG_MON_DE_TU: Đồng môn, sư muội / sư huynh đệ, hậu bối truyền tai nhau
     + TIEN_BOI_AN_THE: Tiền bối đại năng ẩn thế đánh giá, cảm thán
     + PHUC_DU_THUONG_DAN: Phàm nhân, thường dân thọ ân lập từ đường
     + TAM_BAO_GIA_BI_CANH: Tầm bảo giả, tu sĩ mạo hiểm cùng thám hiểm bí cảnh chứng kiến tranh đoạt thiên tài địa bảo
     + GIAM_DINH_SU_BAO_CAC: Giám định sư / trưởng lão Đấu Giá Các, Tàng Bảo Các thẩm định bảo vật, dị bảo kinh thế
     + KHI_LINH_THU_HO: Khí linh thủ hộ bí cảnh, cổ thần tàn hồn khảo nghiệm đạo tâm trước khi trao truyền thừa
   - Chú trọng ĐẶC BIỆT khi nhân vật có liên quan tới các thiên tài địa bảo, các bí cảnh truyền thừa:
     + associatedTreasureOrRealm: Tên thiên tài địa bảo, bí cảnh hoặc truyền thừa cổ tiên liên quan
     + treasureLoreCategory: THIEN_TAI_DIA_BAO | BI_CANH_DONG_THIEN | TRUYEN_THUA_CO_TIEN | TRUONG_SINH_CO_THU | GIAI_THOAI_CHUNG
     + treasureTrialSecret: Bí mật khảo nghiệm hoặc cái giá khi đoạt bảo / nhận truyền thừa mà thế gian không hay biết
     + immortalTreeConnection: Mạch kết nối sâu sắc giữa Truyền Thuyết Cây Trường Sinh với tiểu sử, đạo tâm và sinh mệnh nhân vật
     + historicalTruthVsRumor: Đối chiếu sự thật lịch sử vs Dị bản đồn thổi thêu dệt của thế gian
     + characterVividImpact: Chi tiết khắc họa nhân vật sống động (thói quen độc đáo, ánh mắt, vết sẹo, nụ cười, thói quen ăn uống, cử chỉ vô thức)
     + spokenDialogueDraft: Đoạn thoại / độc thoại trực tiếp của người kể bằng văn phong sống động, có thể chèn trực tiếp vào bản thảo chương truyện.

Định dạng JSON yêu cầu chính xác:
{
  "characterId": "${character.id || 'char_traj_' + Date.now()}",
  "characterName": "${character.name}",
  "characterAlias": "Danh xưng oai phong",
  "overviewPhilosophy": "Đạo tâm cốt lõi chi phối số mệnh",
  "lifeDestinyVow": "Đại thệ / Sứ mệnh tối thượng của đời tu đạo",
  "relations": [
    {
      "id": "rel_1",
      "category": "CHA_ME | GIA_TOC | VO_DAO_LU | CON_CAI | BAN_BE | HANG_XOM | TONG_MON | SU_HUYNH_DE | DE_TU | KE_THU",
      "targetName": "Tên đối tượng",
      "targetRoleOrTitle": "Danh phận / Vai vế cụ thể",
      "intimacyLevel": 90,
      "status": "Còn Sống | Đã Tọa Hóa / Bỏ Mạng | Mất Tích / Lưu Lạc | Phi Thăng Thượng Giới | Bị Giam Cầm / Phong Ấn",
      "originStory": "Nguồn gốc mối quan hệ (Bắt đầu từ đâu)",
      "currentDynamics": "Tình trạng dây dưa nhân quả hiện tại",
      "karmicTies": "Món nợ nhân quả / Lời hứa hẹn / Huyết thù"
    }
  ],
  "milestones": [
    {
      "id": "ms_1",
      "timeAnchor": "Năm 6 tuổi | Năm 18 tuổi | Kỷ nguyên thứ 100...",
      "type": "TU_LUYEN | CO_DUYEN_KY_NGO | HOI_NGO_TUONG_PHUNG | CUOC_CHIA_LY | SU_MENH | BUOC_NGOAT_THAY_DOI | NHIEM_VU | DU_NGOAN | THI_LUYEN | BI_CANH",
      "title": "Tiêu đề mốc biến cố",
      "location": "Địa điểm / Không gian xảy ra",
      "involvedCharacters": ["Tên các nhân vật liên quan"],
      "description": "Diễn biến chi tiết sự việc xảy ra",
      "cultivationStateBeforeAndAfter": "Tu vi trước và sau mốc này",
      "psychologicalTransformation": "Biến chuyển tâm tính / Đạo tâm nhân vật",
      "karmicEcho": "Dấu ấn lâu dài tác động đến tương lai",
      "novelSnippetDraft": "Trích đoạn văn phong miêu tả đầy cảm xúc theo đúng phong vị tiểu thuyết"
    }
  ],
  "geographicAtlas": [
    {
      "id": "geo_1",
      "name": "Tên địa danh (Thôn trang / Tiên thành / Bí cảnh / Sơn mạch)",
      "type": "LANG_MAC | THANH_TRI | BI_CANH_DONG_THIEN | VUNG_DAT_SON_HAI | TONG_MON_THANH_DIA",
      "status": "DA_TRAI_QUA | DANG_TRAI_QUA | CAN_TRAI_QUA | MUC_TIEU_TOI_HAU",
      "chronologicalStage": "Giai đoạn mốc thời gian (vd: Giai đoạn 1: Thuở Hàn Vi)",
      "realmOrRegion": "Vực / Cõi giới địa lý",
      "terrainAndAura": "Địa hình, khí hậu, mật độ linh khí",
      "requiredTasksOrTrials": "Nhiệm vụ hoặc biến cố bắt buộc phải thực hiện tại đây",
      "conquestOrLegacy": "Dấu ấn để lại hoặc chiến lợi phẩm thu được",
      "novelSceneryProse": "Trích đoạn miêu tả cảnh sắc không gian và dòng người qua lại"
    }
  ],
  "questTrialRecords": [
    {
      "id": "qtr_1",
      "category": "NHIEM_VU | DU_NGOAN | THI_LUYEN | VAO_BI_CANH",
      "title": "Tiêu đề nhiệm vụ / chuyến du ngoạn / thí luyện / bí cảnh",
      "stageTimeAnchor": "Mốc thời gian thực hiện",
      "locationName": "Địa danh diễn ra",
      "dangerAndDifficulty": "Phổ Thông | Hiểm Trở | Cực Nguy Cấp S | Thập Tử Vô Sinh SSS",
      "executionStatus": "Đã Hoàn Thành | Đang Thực Hiện | Cần Thực Hiện (Chờ Kích Hoạt) | Di Hận Thất Bại",
      "issuingAuthorityOrContext": "Đơn vị giao phó hoặc nguyên nhân khởi xướng",
      "keyObjectives": ["Mục tiêu 1", "Mục tiêu 2"],
      "rewardsOrBreakthroughs": "Phần thưởng, công pháp, bảo vật hoặc đột phá",
      "trialEncounters": "Đối thủ chạm trán hoặc hiểm họa đối mặt",
      "narrativeJournalSnippet": "Ký sự hành trình / trích đoạn tiểu thuyết"
    }
  ],
  "karmicInheritances": [
    {
      "id": "ki_1",
      "name": "Tên thần binh / cơ duyên",
      "type": "THAN_BINH_BAN_MENH | TRUYEN_THUA_CO_TIEN | DI_HOA_DI_LOI | LINH_THU_KHE_UOC | DAN_DUOC_THIEN_TAI",
      "acquisitionMilestone": "Mốc thời gian & địa điểm đạt được",
      "rankOrGrade": "Cực Phẩm Linh Bảo | Thượng Cổ Chí Bảo",
      "awakeningStage": "Tiến độ thức tỉnh / phong ấn",
      "soulBondStatus": "Sơ Bộ Luyện Hóa | Tâm Huyết Tương Liên | Hợp Nhất Đạo Thân | Khí Linh Thức Tỉnh",
      "specialAbilities": ["Khả năng đặc biệt 1", "Khả năng 2"],
      "karmicCostOrBacklash": "Tác dụng phụ hoặc cái giá phải trả",
      "novelLoreSnippet": "Đoạn văn miêu tả thần binh tỏa sáng"
    }
  ],
  "nemesisFeuds": [
    {
      "id": "nf_1",
      "nemesisName": "Tên kẻ thù",
      "nemesisFactionAndRank": "Thế lực & Cảnh giới kẻ thù",
      "feudOriginCause": "Nguồn gốc mối thù",
      "feudSeverity": "Không Đội Trời Chung | Huyết Hải Thâm Cừu | Đạo Tâm Xung Đột | Túc Mệnh Tranh Đoạt",
      "status": "Đang Truy Lùng | Chờ Ngày Quyết Đấu | Đã Trảm Sát | Đã Hóa Giải Ân Oán",
      "pastClashes": "Các lần giao đấu trong quá khứ",
      "destinedDuelCondition": "Thời gian và địa điểm hẹn quyết chiến",
      "feudResolutionReward": "Đột phá đạo tâm / phần thưởng khi diệt thù",
      "duelSnippetDraft": "Trích đoạn lời thoại rực lửa sát khí"
    }
  ],
  "daoHeartDemons": [
    {
      "id": "dhd_1",
      "demonName": "Tên tâm ma kiếp nạn",
      "demonType": "CHẤP_NIỆM_QUÁ_KHỨ | SÁT_TÂM_CUỒNG_BẠO | BÌNH_CẢNH_CẢNH_GIỚI | SINH_TỬ_KIẾP_SỐ",
      "triggerStage": "Mốc cảnh giới bộc phát",
      "innerDemonManifestation": "Biểu hiện của tâm ma",
      "daoResolutionMethod": "Phương thức phá chấp đốn ngộ",
      "daoDomainMastery": "Quy tắc đại đạo đắc chứng",
      "breakthroughState": "Chưa Vượt Qua (Nguy Cơ Phản Phệ) | Đang Giằng Co Tâm Trí | Đã Đốn Ngộ Hoàn Toàn",
      "enlightenmentSnippet": "Trích đoạn triết lý giác ngộ đạo tâm"
    }
  ],
  "factionPowers": [
    {
      "id": "fp_1",
      "factionName": "Tên thế lực môn phái",
      "characterTitleOrRole": "Chức vị hiện tại",
      "authorityLevel": "Đệ Tử Bình Thường | Nòng Cốt / Chân Truyền | Chấp Chưởng Trọng Quyền | Lãnh Tụ Tối Cao",
      "controlledTerritory": "Lãnh địa / sơn phong cai quản",
      "alliedSubFactions": ["Đồng minh 1", "Đồng minh 2"],
      "rivalFactionForces": "Phe phái đối lập dòm ngó",
      "powerLegacyContribution": "Di sản đóng góp cho thế lực"
    }
  ],
  "oralLoreSubplots": [
    {
      "id": "ols_1",
      "subplotTitle": "Tiêu đề giai thoại tiểu sử / mạch chuyện phụ",
      "speakerType": "THUYET_THU_NHAN | CO_NHAN_HAN_VI | KE_THU_SONG_SOT | DONG_MON_DE_TU | TIEN_BOI_AN_THE | PHUC_DU_THUONG_DAN | TAM_BAO_GIA_BI_CANH | GIAM_DINH_SU_BAO_CAC | KHI_LINH_THU_HO",
      "speakerNameAndRole": "Tên người kể & Thân phận địa vị",
      "narrativeSetting": "Bối cảnh không gian thời gian khi kể lại (quán trà, cấm khu, mật thất đấu giá các, kiếm vực)",
      "recountedEraOrEvent": "Mốc thời gian / biến cố trong quá khứ được nhắc tới",
      "associatedTreasureOrRealm": "Tên thiên tài địa bảo / bí cảnh / truyền thừa cổ tiên liên quan",
      "treasureLoreCategory": "THIEN_TAI_DIA_BAO | BI_CANH_DONG_THIEN | TRUYEN_THUA_CO_TIEN | TRUONG_SINH_CO_THU | GIAI_THOAI_CHUNG",
      "treasureTrialSecret": "Bí mật khảo nghiệm hoặc cái giá khi đoạt bảo / nhận truyền thừa",
      "immortalTreeConnection": "Mạch kết nối sâu sắc giữa Truyền Thuyết Cây Trường Sinh với tiểu sử, đạo tâm và sinh mệnh nhân vật",
      "narrativePerspectiveSummary": "Góc nhìn cảm xúc và nhận định của người kể",
      "historicalTruthVsRumor": "Đối chiếu: Sự thật cốt lõi vs Dị bản thêu dệt truyền miệng của thế gian",
      "characterVividImpact": "Chi tiết đắt giá làm nhân vật sống động (thói quen, ánh mắt, vết sẹo, nụ cười, cử chỉ)",
      "spokenDialogueDraft": "Lời thoại / Độc thoại người kể trực tiếp thuật lại sống động để chèn vào chương tiểu thuyết"
    }
  ]
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (err: any) {
      console.warn('Fallback to gemini-2.5-flash for trajectory:', err?.message);
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const parsed = JSON.parse(responseText);
    return res.json({ success: true, trajectoryProfile: parsed });
  } catch (error: any) {
    console.error('Error generating character trajectory:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// TECHNIQUE EXPANSION, FUSION & CATALYZED BREAKTHROUGH SIMULATION
// -------------------------------------------------------------------------
app.post('/api/gemini/generate-cultivation-manual', async (req, res) => {
  try {
    const { name, element, school, rank, userIdea, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Đại Tông Sư sáng chế công pháp tu chân cho tiểu thuyết ${genre || 'Tiên Hiệp'}.
Hãy sáng tạo một môn công pháp võ học / tâm pháp hoàn chỉnh với thông tin:
- Tên công pháp (nếu có yêu cầu): ${name || 'Tự động đặt tên cực kêu'}
- Thuộc tính / Nguyên tố: ${element || 'Kim/Mộc/Thủy/Hỏa/Thổ/Lôi/Phong/Băng/Âm Dương/Thôn Phệ/Không Gian/Hỗn Độn'}
- Hệ phái: ${school || 'Tâm Pháp Nội Công / Luyện Thể / Kiếm Pháp / Thân Pháp / Thần Hồn'}
- Phẩm giai: ${rank || 'Thiên Giai'}
- Ý tưởng cốt lõi: ${userIdea || 'Sáng tạo độc đáo, khí phái bàng bạc, khẩu quyết thâm sâu, uy lực cái thế'}

Định dạng JSON yêu cầu:
{
  "name": "Tên công pháp",
  "element": "Thuộc tính nguyên tố",
  "school": "Hệ phái",
  "rank": "Hoàng Giai / Huyền Giai / Địa Giai / Thiên Giai / Thần Giai / Cấm Kỵ",
  "origin": "Lai lịch nguồn gốc chi tiết",
  "entryRequirements": "Điều kiện nhập môn, linh căn, thể chất",
  "corePhilosophy": "Tư tưởng ngộ đạo cốt lõi",
  "chantMnemonic": "Khẩu quyết vận hành kinh mạch 4 chữ hoặc 8 chữ cổ thi (ví dụ: 'Canh Kim sát khí, vạn kiếp bất diệt. Nhất kiếm khai thiên, lục đạo thần phục...')",
  "meridianRoute": "Lộ trình chu thiên kinh mạch (ví dụ: Từ Đan Điền qua Nhâm Mạch, vận chuyển qua Thiếu Dương, hội tụ tại Bách Hội...)",
  "compatibilities": "Thể chất hoặc linh căn thích hợp nhất (ví dụ: Thuần Dương Linh Thể, Thiên Linh Căn)",
  "layers": [
    {
      "layerNumber": 1,
      "name": "Tên tầng 1",
      "requirements": "Yêu cầu cảnh giới đạt được",
      "effects": "Hiệu quả thực chiến, biến đổi linh lực nhục thân",
      "cultivationMethod": "Phương pháp tu luyện, vận hành chu thiên kinh mạch"
    },
    {
      "layerNumber": 2,
      "name": "Tên tầng 2",
      "requirements": "Cảnh giới kế tiếp",
      "effects": "Hiệu quả nâng cao",
      "cultivationMethod": "Cách thức đột phá tầng này"
    },
    {
      "layerNumber": 3,
      "name": "Tên tầng 3 (Viên Mãn)",
      "requirements": "Cảnh giới cao thâm",
      "effects": "Uy lực kinh thiên",
      "cultivationMethod": "Dung hợp thiên địa dị bảo hoặc ngộ đạo"
    }
  ],
  "ultimateMoves": [
    {
      "name": "Tên tuyệt kỹ sát chiêu",
      "description": "Mô tả uy lực hủy diệt khi thi triển chiêu thức",
      "drawback": "Tác dụng phụ hoặc tiêu hao chân nguyên/thọ nguyên"
    }
  ]
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const manual = JSON.parse(responseText);
    manual.id = 'manual_' + Date.now();
    return res.json({ success: true, manual });
  } catch (error: any) {
    console.error('Error generating manual:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/fuse-techniques', async (req, res) => {
  try {
    const { primaryManual, secondaryManual, catalystIdea, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Tông Sư Khai Tông Lập Phái trong tiểu thuyết ${genre || 'Tiên Hiệp'}.
Hãy thực hiện DUNG HỢP (FUSION) hai môn công pháp tuyệt đỉnh sau đây thành một MÔN CÔNG PHÁP MỚI ĐỘT PHÁ TOÀN DIỆN:

CÔNG PHÁP THỨ NHẤT:
- Tên: ${primaryManual?.name || 'Thái Ất Canh Kim Sát Kiếm Quyết'}
- Nguyên tố: ${primaryManual?.element || 'Kim'}
- Hệ phái: ${primaryManual?.school || 'Kiếm Pháp'}
- Phẩm cấp: ${primaryManual?.rank || 'Địa Giai'}
- Khẩu quyết: ${primaryManual?.corePhilosophy || ''}

CÔNG PHÁP THỨ HAI:
- Tên: ${secondaryManual?.name || 'Cửu Chuyển Thanh Mộc Trường Sinh Kinh'}
- Nguyên tố: ${secondaryManual?.element || 'Mộc'}
- Hệ phái: ${secondaryManual?.school || 'Tâm Pháp'}
- Phẩm cấp: ${secondaryManual?.rank || 'Thiên Giai'}
- Khẩu quyết: ${secondaryManual?.corePhilosophy || ''}

VẬT DẪN HOẶC Ý TƯỞNG DUNG HỢP: ${catalystIdea || 'Lấy Âm Dương điều hòa hoặc Hỗn Độn quy nhất, biến tương khắc thành tương sinh'}

Hãy mô tả môn công pháp dung hợp mới (phẩm cấp tăng lên một bậc, kết hợp hoàn hảo đặc tính của cả 2 môn hoặc sinh ra biến dị siêu đẳng).

Trả về JSON:
{
  "parentNames": ["${primaryManual?.name || ''}", "${secondaryManual?.name || ''}"],
  "fusedName": "Tên công pháp dung hợp mới (ví dụ: Ất Mộc Canh Kim Vạn Kiếm Trường Sinh Điển)",
  "fusedElement": "Thuộc tính mới (kết hợp hoặc thăng hoa)",
  "fusedSchool": "Hệ phái mới",
  "fusedRank": "Phẩm cấp mới (ví dụ: Thiên Giai Đỉnh Phong hoặc Thần Giai)",
  "fusionPrinciple": "Nguyên lý dung hợp (giải thích cách hóa giải xung đột giữa hai công pháp, mạch kinh mạch dung thông ra sao)",
  "corePhilosophy": "Tư tưởng mới thâm sâu bao quát",
  "chantMnemonic": "Khẩu quyết chân ngôn 4 chữ hoặc 8 chữ cổ thi sau khi dung hợp (ví dụ: 'Kim Mộc giao hòa, sinh tử luân hồi. Thần thông cái thế, vạn cổ bất ma...')",
  "proseNarrative": "Đoạn văn tự sự tiểu thuyết 300-500 từ miêu tả khoảnh khắc dung hợp thành công rực rỡ, hai luồng kình lực va chạm rồi dung hòa, linh quang bùng nổ, nhân vật đốn ngộ!",
  "layers": [
    {
      "layerNumber": 1,
      "name": "Tên tầng dung hợp 1",
      "requirements": "Yêu cầu cảnh giới",
      "effects": "Hiệu quả kết hợp đặc thù",
      "cultivationMethod": "Phương pháp tu luyện dung hợp"
    },
    {
      "layerNumber": 2,
      "name": "Tên tầng dung hợp 2",
      "requirements": "Cảnh giới trung kỳ",
      "effects": "Hiệu quả bá đạo",
      "cultivationMethod": "Cách vận hành chu thiên"
    },
    {
      "layerNumber": 3,
      "name": "Tên tầng dung hợp 3 (Cực Hạn)",
      "requirements": "Cảnh giới tối cao",
      "effects": "Sức mạnh áp đảo",
      "cultivationMethod": "Phương pháp ngộ đạo hoàn mỹ"
    }
  ],
  "ultimateMoves": [
    {
      "name": "Tuyệt kỹ độc quyền mới",
      "description": "Chi tiết đòn đánh kết hợp uy lực của cả hai môn",
      "drawback": "Hạn chế hoặc yêu cầu khi thi triển"
    }
  ]
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const fusion = JSON.parse(responseText);
    fusion.id = 'fusion_' + Date.now();
    return res.json({ success: true, fusion });
  } catch (error: any) {
    console.error('Error fusing techniques:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/simulate-catalyzed-breakthrough', async (req, res) => {
  try {
    const { character, targetRealm, catalystType, catalystName, ritualPlace, techniqueUsed, customPrompt, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là tác giả văn học mạng đại thần viết truyện ${genre || 'Tiên Hiệp'}.
Hãy mô phỏng một phân cảnh ĐỘT PHÁ CẢNH GIỚI ĐỈNH CAO KHI KẾT HỢP VỚI CƠ DUYÊN / PHÁP KHÍ / KỲ CHÂN DỊ BẢO:

Nhân vật: ${character?.name || 'Lăng Tiêu'} (Cảnh giới hiện tại: ${character?.realmOrRank || 'Trúc Cơ Kỳ'})
Cảnh giới muốn đột phá: ${targetRealm || 'Kim Đan Kỳ (Cực Phẩm Đan Thai)'}
Loại hình kết hợp: ${catalystType || 'Kỳ Chân Dị Bảo'}
Tên cơ duyên / pháp khí / kỳ chân dị bảo: ${catalystName || 'Thiên Địa Dị Hỏa & Vạn Năm Huyền Băng Chi'}
Địa điểm nghi thức đột phá: ${ritualPlace || 'Đáy Vực Sinh Tử / Miệng Núi Lửa Cổ'}
Công pháp vận hành: ${techniqueUsed || 'Hỗn Độn Khai Thiên Quyết'}
Tình huống bối cảnh: ${customPrompt || 'Đột phá giữa hiểm cảnh hoặc sinh tử đốn ngộ, lôi kiếp giáng lâm'}

Hãy viết chi tiết, ngôn từ hùng tráng, văn phong giàu hình tượng, mô tả chi tiết:
1. Tiêu đề phân cảnh
2. Quá trình chuẩn bị và địa thế xung quanh
3. Quá trình vận khí, dẫn nạp cơ duyên / kỳ bảo / pháp khí vào cơ thể
4. Sự giằng xé nguy hiểm, nỗi đau thấu xương, tâm ma cám dỗ, hiểm họa lôi kiếp
5. Sự biến đổi dị thường (Breakthrough Mutation) của nhục thân, linh lực hoặc thần hồn sau khi hấp thu kỳ bảo
6. Đoạn văn mẫu miêu tả sinh động 400 - 800 từ để chèn thẳng vào chương truyện.

Trả về JSON:
{
  "title": "Tiêu đề phân cảnh hoành tráng",
  "characterName": "${character?.name || 'Nhân vật'}",
  "targetRealm": "${targetRealm || 'Cảnh giới mới'}",
  "catalystType": "${catalystType || 'Kỳ Chân Dị Bảo'}",
  "catalystName": "${catalystName || 'Tên bảo vật'}",
  "ritualPlace": "${ritualPlace || 'Địa điểm'}",
  "breakthroughProcess": "Tóm tắt các giai đoạn đột phá",
  "dangerAndPain": "Mô tả chi tiết hiểm nguy sinh tử và quá trình tôi luyện đạo tâm",
  "breakthroughMutation": "Biến đổi dị thường, thần thông mới hoặc thể chất đột biến đạt được",
  "proseSegment": "Đoạn văn tự sự tiểu thuyết cao trào đầy cảm xúc (400-800 từ) chuẩn phong cách tác giả đại thần"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const parsed = JSON.parse(responseText);
    parsed.id = 'breakthrough_' + Date.now();
    return res.json({ success: true, result: parsed });
  } catch (error: any) {
    console.error('Error simulating catalyzed breakthrough:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-tier-encyclopedia', async (req, res) => {
  try {
    const { levelName, subStages, systemName, genre, customIdea } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Đại Tông Sư Quản Lý Tạng Kinh Các & Bảo Khố Cảnh Giới trong tiểu thuyết ${genre || 'Tiên Hiệp'}.
Hãy sáng tạo toàn bộ kho tàng bách khoa tu luyện tương thích hoàn hảo cho Cảnh Giới:
- Tên cảnh giới: ${levelName || 'Kim Đan Kỳ'}
- Phân tầng: ${subStages || 'Sơ kỳ - Trung kỳ - Hậu kỳ - Viên mãn'}
- Hệ thống: ${systemName || 'Cửu Trọng Tiên Đạo Hệ Thống'}
- Ý tưởng bổ sung: ${customIdea || 'Đặc sắc, giàu tính tu chân, uy lực bộc phát mạnh mẽ'}

Hãy tạo đầy đủ các danh mục bách khoa cho cảnh giới này gồm:
1. Phương pháp tu luyện (cultivationMethod) & Nghi thức đột phá (breakthroughRitual gồm requirements, danger, ritualPlace)
2. 2 Cơ Duyên Bí Cảnh (fortuitousEncounters) gồm name, description, opportunity, danger
3. 2 Đan Dược & Linh Thảo (pillsAndElixirs) gồm id, name, rank, effects, ingredients
4. 2 Binh Khí & Pháp Bảo (weaponsAndArtifacts) gồm name, rank, effects
5. 2 Công Pháp & Sát Chiêu (techniquesAndMartialArts) gồm name, rank, effects

Trả về định dạng JSON thuần túy:
{
  "cultivationMethod": "Mô tả chi tiết phương pháp vận hành chu thiên...",
  "breakthroughRitual": {
    "requirements": "Yêu cầu đan dược, trận pháp, linh thạch...",
    "danger": "Nguy cơ tẩu hỏa nhập ma, thiên kiếp...",
    "ritualPlace": "Địa điểm lý tưởng..."
  },
  "fortuitousEncounters": [
    {
      "name": "Tên bí cảnh 1",
      "description": "Mô tả bí cảnh",
      "opportunity": "Lợi ích cơ duyên",
      "danger": "Cạm bẫy sinh tử"
    },
    {
      "name": "Tên bí cảnh 2",
      "description": "Mô tả bí cảnh",
      "opportunity": "Lợi ích cơ duyên",
      "danger": "Cạm bẫy sinh tử"
    }
  ],
  "pillsAndElixirs": [
    {
      "id": "pill_gen_1",
      "name": "Tên đan dược 1",
      "rank": "Phẩm giai (VD: Tam Phẩm Cực Phẩm)",
      "effects": "Dược hiệu đặc thù",
      "ingredients": "Thành phần dược liệu chính"
    },
    {
      "id": "pill_gen_2",
      "name": "Tên linh dược 2",
      "rank": "Phẩm giai",
      "effects": "Dược hiệu",
      "ingredients": "Thành phần"
    }
  ],
  "weaponsAndArtifacts": [
    {
      "name": "Tên pháp bảo 1",
      "rank": "Phẩm giai (VD: Thượng Phẩm Bảo Khí)",
      "effects": "Uy lực & cấm chế đặc thù"
    },
    {
      "name": "Tên pháp bảo 2",
      "rank": "Phẩm giai",
      "effects": "Uy lực"
    }
  ],
  "techniquesAndMartialArts": [
    {
      "name": "Tên công pháp 1",
      "rank": "Phẩm giai (VD: Địa Giai Trung Phẩm)",
      "effects": "Nguyên lý vận hành & sát chiêu tuyệt kỹ"
    },
    {
      "name": "Tên công pháp 2",
      "rank": "Phẩm giai",
      "effects": "Hiệu quả thực chiến"
    }
  ]
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const compendium = JSON.parse(responseText);
    return res.json({ success: true, compendium });
  } catch (error: any) {
    console.error('Error generating tier encyclopedia:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// ALCHEMY, CAULDRON FORGING & SIMULATION ENDPOINTS
// -------------------------------------------------------------------------
app.post('/api/alchemy/generate-recipe', async (req, res) => {
  try {
    const { category, targetRank, targetEffect, currentStoryContext } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Đan Đạo Chí Tôn trong tiểu thuyết tu tiên kinh điển. Hãy sáng tạo một Đan Phương hoàn toàn mới, độc nhất vô nhị chuẩn quy tắc cổ truyền Quân - Thần - Tá - Sứ:
- Phân loại mục đích: ${category || 'Đột Phá Cảnh Giới'}
- Phẩm cấp mong muốn: ${targetRank || 'Tứ Phẩm Tiên Đan'}
- Hiệu quả mong muốn: ${targetEffect || 'Đột phá gông cùm tu vi, bảo hộ đan điền, gia tăng thọ nguyên'}
- Bối cảnh truyện: ${currentStoryContext || 'Tu sĩ bế quan trong động phủ bí cảnh hoặc đối mặt sinh tử đại kiếp'}

Yêu cầu xuất sắc:
1. Tên đan dược cực kỳ khí phách, cổ phong huyền ảo.
2. Dược liệu phối ngũ đúng 4 vai trò Quân - Thần - Tá - Sứ kèm niên đại và dược tính đặc thù.
3. Bí quyết hỏa hầu: Phân biệt rõ lúc nào dùng Văn Hỏa ôn dưỡng, lúc nào dùng Vũ Hỏa ngưng tụ, thời khắc mở lò.
4. Dị tượng khi xuất đan: Mây ngũ sắc, đan hà ngút trời, hương thơm lan tỏa bao nhiêu dặm, đan lôi kiếp nếu có.
5. Kháng đan & Phản phệ khi dùng quá liều hoặc dùng sai cách.

Trả về định dạng JSON thuần túy:
{
  "name": "Tên đan dược",
  "rank": "Phẩm cấp (Nhất Phẩm - Cửu Phẩm / Thần Phẩm)",
  "category": "${category || 'Đột Phá Cảnh Giới'}",
  "mainHerbs": [
    { "name": "Tên thảo dược 1", "ageRequirement": "Niên đại (VD: 1000 năm)", "role": "Quân Dược (Chủ đạo)", "spiritualProperty": "Dược tính chủ lực" },
    { "name": "Tên thảo dược 2", "ageRequirement": "Niên đại", "role": "Thần Dược (Bổ trợ)", "spiritualProperty": "Trợ giúp tăng cường quân dược" },
    { "name": "Tên thảo dược 3", "ageRequirement": "Niên đại", "role": "Tá Dược (Hòa hoãn)", "spiritualProperty": "Áp chế độc tính và xung đột" },
    { "name": "Tên thảo dược 4", "ageRequirement": "Niên đại", "role": "Sứ Dược (Dẫn mạch)", "spiritualProperty": "Dẫn dược lực vào kinh mạch đan điền" }
  ],
  "effects": "Công hiệu dược lực thần kỳ chi tiết",
  "refiningKeynotes": "Bí quyết luyện chế then chốt",
  "fireControl": "Quy tắc Văn Hỏa - Vũ Hỏa chi tiết",
  "pillAroma": "Mùi hương đan đạo đặc sắc",
  "phenomenon": "Dị tượng thiên địa khi xuất đan",
  "sideEffects": "Tác dụng phụ, cảm giác đau đớn khi hấp thu",
  "drugResistance": "Mức độ kháng đan nếu uống liên tục và hạn mức tối đa"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const recipe = JSON.parse(responseText);
    recipe.id = 'pill_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, recipe });
  } catch (error: any) {
    console.error('Error generating pill recipe:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/alchemy/forge-cauldron', async (req, res) => {
  try {
    const { cauldronName, targetRank, materials, customIdea } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Luyện Khí Tông Sư thượng cổ chuyên rèn đúc Đan Đỉnh cho Tiên Giới. Hãy thiết kế một lò luyện đan (Đan Đỉnh) tuyệt đỉnh:
- Tên đan đỉnh dự kiến: ${cauldronName || 'Tử Vi Cửu Long Luyện Đan Đỉnh'}
- Phẩm cấp: ${targetRank || 'Cổ Đỉnh'}
- Vật liệu dự kiến: ${materials || 'Thiên Ngoại Vẫn Thiết, Long Cốt Thượng Cổ, Xích Đồng Vạn Niên'}
- Ý tưởng riêng: ${customIdea || 'Đỉnh có khả năng tự điều tiết áp suất hỏa hầu, khắc 108 đạo tụ hỏa trận pháp'}

Hãy phân tích và mô tả chi tiết:
1. Tên chính thức và phẩm giai (Phàm Khí / Linh Khí / Bảo Khí / Cổ Đỉnh / Đạo Khí / Thần Khí Viễn Cổ).
2. Chất liệu đúc thân đỉnh và nắp đỉnh.
3. Thiết kế Hỏa Nhãn & Trận Pháp: Bát Quái Hỏa Nhãn, Thất Tinh Tụ Hỏa Trận, Cửu Long Phun Lửa giúp dẫn hỏa và giảm nguy cơ nổ lò.
4. Khí linh / Linh tính uẩn dưỡng trong lò.
5. Quy trình đúc lò 4-5 bước: Nung phôi kim loại, Khắc phù văn tụ hỏa, Tôi lửa hàn băng dịch, Huyết tế định linh.

Trả về JSON:
{
  "name": "Tên đan đỉnh",
  "rank": "${targetRank || 'Cổ Đỉnh'}",
  "materials": "Vật liệu chi tiết",
  "features": "Tính năng và trận pháp uẩn dưỡng đặc biệt",
  "fireVentDesign": "Thiết kế hỏa nhãn, cơ chế điều tiết áp suất và dẫn hỏa",
  "craftingMethod": "Nguồn gốc xuất xứ và tông môn khai sáng",
  "cauldronSoul": "Linh tính hoặc Khí Linh thức tỉnh",
  "forgingSteps": [
    "Bước 1: Nung chảy phôi thần kim dưới Địa Tâm Chân Hỏa vạn trượng",
    "Bước 2: Gõ đúc thân đỉnh và nắp đỉnh, khắc 108 đạo Cửu Cung Phù Văn",
    "Bước 3: Bố trí Bát Quái Hỏa Khẩu và Thất Tinh Tụ Hỏa Trận",
    "Bước 4: Tôi luyện qua Vạn Niên Huyền Băng Dịch để định hình linh lực",
    "Bước 5: Nhỏ máu Khởi Linh (Huyết Tế) đánh thức đỉnh linh"
  ]
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const cauldron = JSON.parse(responseText);
    cauldron.id = 'cauldron_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, cauldron });
  } catch (error: any) {
    console.error('Error forging cauldron:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/alchemy/simulate-scene', async (req, res) => {
  try {
    const { pillName, cauldronName, flameType, alchemistLevel, specialCircumstance, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp / Huyền Huyễn đỉnh cao.
Hãy viết một ĐẠI CẢNH LUYỆN ĐAN CAO TRÀO, NGHẸT THỞ VÀ HOÀNH TRÁNG với các dữ liệu sau:
- Tên Đan Dược: ${pillName || 'Thái Hư Hóa Thần Đan'}
- Đan Đỉnh: ${cauldronName || 'Cửu Long Xích Diễm Đỉnh'}
- Ngọn Lửa / Dị Hỏa: ${flameType || 'Thanh Liên Địa Tâm Hỏa kết hợp Tam Muội Chân Hỏa'}
- Trình độ Đan Sư: ${alchemistLevel || 'Đan Đạo Đại Tông Sư'}
- Hoàn cảnh đặc biệt: ${specialCircumstance || 'Luyện đan giữa lúc đại địch vây công hoặc chuẩn bị độ thiên kiếp sinh tử'}

Hãy khắc họa sống động qua đầy đủ các giai đoạn kinh điển:
1. Khởi hỏa ôn đỉnh: Nhiệt độ tăng vọt, phù văn trên thân lò bừng sáng.
2. Thả thảo dược trích xuất linh dịch: Từng vị thảo dược quý hiếm được tôi luyện, thanh lọc tạp chất, dược dịch lơ lửng xoay tròn.
3. Hỏa hầu biến ảo & Nguy cơ TẠC ĐỈNH (NỔ LÒ): Năng lượng bạo loạn, áp suất cực hạn, đan sư toàn lực dùng thần thức trấn áp hoặc kết thủ ấn nghịch thiên.
4. Ngưng đan kết châu: Dược dịch thu nhỏ, cô đọng thành từng viên đan tròn trịa tỏa hào quang rực rỡ.
5. ĐAN LÔI KIẾP giáng lâm: Mây đen che phủ đỉnh trời, sấm sét đánh thẳng vào miệng lò để tôi luyện đan văn.
6. Xuất Đan Cực Phẩm: Đan khí hóa thành rồng phượng, hương thơm vạn dặm, xuất hiện Đan Vân / Đan Văn lấp lánh!

Trả về định dạng JSON thuần túy:
{
  "pillName": "${pillName || 'Linh Đan'}",
  "cauldronName": "${cauldronName || 'Đan Đỉnh'}",
  "flameType": "${flameType || 'Dị Hỏa'}",
  "alchemistLevel": "${alchemistLevel || 'Đan Sư'}",
  "extractedEssence": "Tóm tắt quá trình trích xuất dược dịch tinh túy",
  "cauldronExplosionRisk": "Khoảnh khắc áp suất bùng nổ nghẹt thở và cách đan sư nghịch chuyển cứu vãn",
  "pillTribulation": "Mô tả đan lôi kiếp xé rách tầng mây giáng xuống",
  "finalPillQuality": "Cực Phẩm Viên Mãn (Xuất hiện 9 đạo Kim Sắc Đan Vân)",
  "pillVeins": "9 Đạo Đan Văn Thần Bí",
  "processNarrative": "Đoạn văn tự sự tiểu thuyết cao trào đầy cảm xúc (500 - 900 từ) miêu tả trọn vẹn từ lúc châm lửa đến khi thu đan vào bình ngọc, văn phong chuẩn tác giả Bạch Kim Tiên Hiệp."
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const simulation = JSON.parse(responseText);
    return res.json({ success: true, simulation });
  } catch (error: any) {
    console.error('Error simulating alchemy scene:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// WEAPONS ARSENAL & EVOLUTION ENDPOINTS
// -------------------------------------------------------------------------
app.post('/api/weapons/generate', async (req, res) => {
  try {
    const { name, category, rank, customIdea, characterName, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Thần Khí Tông Sư thượng cổ trong tiểu thuyết Tiên Hiệp / Huyền Huyễn đỉnh cao.
Hãy sáng tạo một Binh Khí / Thần Binh / Pháp Bảo hoàn chỉnh theo đúng phân tầng 7 phẩm cấp chuẩn:
- Tên gợi ý: ${name || 'Hoang Thiên Trảm Tiên Bá Đao'}
- Chủng loại: ${category || 'Đao (Bá Đao / Trảm Ma Đao)'}
- Phẩm cấp chuẩn: ${rank || 'Cực Đạo Đế Binh / Thần Binh Viễn Cổ'}
- Ý tưởng đặc thù: ${customIdea || 'Đao chém vỡ tinh thần, uy áp chấn nhiếp chư thiên, uẩn dưỡng khí linh cuồng bạo'}
- Nhân vật trang bị: ${characterName || 'Nhân vật chính'}
- Thể loại: ${genre || 'Tiên Hiệp'}

Yêu cầu chi tiết, ngôn từ hùng tráng, văn phong chuẩn đại thần:
1. Tên thần binh khí phách.
2. Chất liệu khoáng thạch viễn cổ rèn đúc (Thái Ất Canh Kim, Chân Long Cốt, Huyền Hoàng Tinh Sa, Vẫn Thiết...).
3. Khí Linh uẩn dưỡng (hình thái, tính cách, mức độ thức tỉnh).
4. Trận pháp phù văn khắc trên thân vũ khí (Đế văn, Tru Ma Trận, Thái Cực Giới...).
5. Uy lực thực chiến & dị tượng thiên địa khi xuất vỏ.
6. Lộ trình thăng cấp / Tiến hóa về sau.
7. Tuyệt kỹ thức tỉnh độc quyền của binh khí.
8. Lai lịch truyền thuyết và chiến tích cổ xưa.

Trả về định dạng JSON thuần túy:
{
  "name": "Tên thần binh",
  "category": "${category || 'Kiếm (Phi Kiếm / Trọng Kiếm)'}",
  "rank": "${rank || 'Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)'}",
  "materials": "Chất liệu rèn đúc chi tiết",
  "spiritSoul": "Mô tả Khí Linh uẩn dưỡng",
  "inscribedArrays": "Trận pháp phù văn khắc trên thân",
  "combatPowerEffect": "Uy lực thực chiến & Dị tượng thiên địa khi xuất thế",
  "evolutionPath": "Lộ trình thăng phẩm kế tiếp",
  "ultimateTechnique": "Tuyệt kỹ thức tỉnh tối thượng",
  "backstory": "Lai lịch nguồn gốc huyền thoại (100 - 200 từ)"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const weapon = JSON.parse(responseText);
    weapon.id = 'weapon_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, weapon });
  } catch (error: any) {
    console.error('Error generating weapon:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/weapons/evolve', async (req, res) => {
  try {
    const { weapon, catalystMaterial, catalystType, characterName } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp / Huyền Huyễn.
Hãy viết quá trình THĂNG PHẨM & TIẾN HÓA BINH KHÍ (Weapon Evolution) đầy kịch tính:
- Binh khí hiện tại: ${weapon?.name || 'Thanh Phong Kiếm'} (${weapon?.rank || 'Linh Khí'})
- Chủng loại: ${weapon?.category || 'Kiếm'}
- Khoáng thạch quý hiếm / Dị bảo / Cơ duyên kết hợp: ${catalystMaterial || 'Vạn Niên Canh Kim Tinh Sa & Cửu Trọng Lôi Kiếp'}
- Loại hình tiến hóa: ${catalystType || 'Tôi Luyện Lôi Kiếp & Dung Hợp Thần Thạch'}
- Chủ nhân sở hữu: ${characterName || 'Nhân vật chính'}

Hãy khắc họa sống động:
1. Tên mới sau khi tiến hóa (ngầu hơn, phẩm cấp cao hơn 1 bậc, ví dụ từ Linh Khí lên Bảo Khí, hoặc Bảo Khí lên Đạo Khí).
2. Phẩm cấp mới đạt được.
3. Quá trình đập phôi, dung hợp khoáng thạch, ngọn lửa tôi luyện, lôi kiếp giáng lâm rèn giũa thân kiếm/đao.
4. Quá trình Khí Linh lột xác thức tỉnh: Biến đổi hình hài, trí tuệ tăng vọt, nhận chủ sâu sắc.
5. Thần thông chiến đấu và Tuyệt kỹ mới được mở khóa.
6. Đoạn văn tự sự tiểu thuyết cao trào (400 - 700 từ) chuẩn phong cách đại thần để chèn thẳng vào chương truyện.

Trả về định dạng JSON thuần túy:
{
  "originalWeapon": "${weapon?.name || 'Binh khí'}",
  "catalystMaterial": "${catalystMaterial || 'Vật liệu'}",
  "evolvedName": "Tên thần binh sau khi thăng cấp",
  "evolvedRank": "Phẩm cấp mới (VD: Đạo Khí / Cực Đạo Đế Binh)",
  "forgingProcess": "Tóm tắt các giai đoạn tôi luyện và lôi kiếp",
  "spiritAwakening": "Mô tả Khí Linh lột xác thức tỉnh",
  "newAbilities": "Thần thông và tuyệt kỹ mới đạt được",
  "proseNarrative": "Đoạn văn tự sự tiểu thuyết cao trào đầy cảm xúc (400-700 từ)"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const evolution = JSON.parse(responseText);
    return res.json({ success: true, evolution });
  } catch (error: any) {
    console.error('Error evolving weapon:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// SPIRIT BEASTS, TAMING & EVOLUTION ENDPOINTS
// -------------------------------------------------------------------------
app.post('/api/beasts/generate', async (req, res) => {
  try {
    const { name, bloodlineTier, realmTier, element, combatRole, customIdea, characterName, genre } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là Ngự Thú Đại Tông Sư thượng cổ trong tiểu thuyết Tiên Hiệp / Huyền Huyễn.
Hãy sáng tạo một Linh Thú / Yêu Thú / Thú Sủng hoàn chỉnh và độc nhất vô nhị:
- Tên gợi ý: ${name || 'Tử Tiêu Ma Lôi Điểu'}
- Phẩm cấp huyết mạch: ${bloodlineTier || 'Vương Huyết Yêu Thú (Hậu Duệ Thần Thú)'}
- Cảnh giới tu vi: ${realmTier || 'Tam Giai (Ngưng Đan Kết Tinh)'}
- Thuộc tính nguyên tố: ${element || 'Lôi Đình & Hắc Ám'}
- Vai trò chiến đấu: ${combatRole || 'Tiên Phong Cận Chiến'}
- Ý tưởng riêng: ${customIdea || 'Thú sủng có tốc độ cực hạn, trung thành tuyệt đối, có khả năng độ kiếp hóa hình'}
- Chủ nhân ký kết: ${characterName || 'Nhân vật chính'}
- Thể loại: ${genre || 'Tiên Hiệp'}

Yêu cầu chi tiết, văn phong hùng tráng giàu sức gợi:
1. Tên thú sủng và chủng loài chính xác.
2. Ngoại hình miêu tả sống động từ bộ lông, móng vuốt, ánh mắt, khí thế.
3. 2-3 Kỹ năng thiên phú (Innate Abilities) độc môn kèm mô tả tác dụng.
4. Tập tính, tính cách và khế ước tương thích.
5. Lộ trình tiến hóa & thức tỉnh huyết mạch (Hóa hình nửa người hoặc Chân Thần Thú).
6. Lai lịch xuất thân hoặc duyên ngộ khi gặp gỡ chủ nhân.

Trả về định dạng JSON thuần túy:
{
  "name": "Tên thú sủng",
  "species": "Chủng loài",
  "bloodlineTier": "${bloodlineTier || 'Vương Huyết Yêu Thú'}",
  "realmTier": "${realmTier || 'Tam Giai'}",
  "element": "${element || 'Lôi Đình'}",
  "habitat": "Môi trường sống hiểm trở ngoài tự nhiên",
  "appearance": "Ngoại hình chi tiết đặc sắc",
  "innateAbilities": [
    { "name": "Tên kỹ năng 1", "description": "Mô tả uy lực thực chiến" },
    { "name": "Tên kỹ năng 2", "description": "Mô tả tác dụng" }
  ],
  "combatRole": "${combatRole || 'Tiên Phong Cận Chiến'}",
  "temperament": "Tập tính và thái độ đối với chủ nhân",
  "contractType": "Loại khế ước phù hợp nhất",
  "evolutionPath": "Lộ trình ăn dược thảo / đan dược để đột phá hóa hình",
  "backstory": "Lai lịch gặp gỡ truyền kỳ (100 - 200 từ)"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const beast = JSON.parse(responseText);
    beast.id = 'beast_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, beast });
  } catch (error: any) {
    console.error('Error generating spirit beast:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/beasts/evolve', async (req, res) => {
  try {
    const { beast, originalRealm, targetRealm, catalyst, characterName } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp.
Hãy viết một ĐẠI CẢNH TIẾN HÓA / HÓA HÌNH ĐỘ KIẾP CỦA LINH THÚ đầy cảm xúc và hùng tráng:
- Tên Linh Thú: ${beast?.name || 'Hắc Lôi Báo'} (${beast?.bloodlineTier || 'Vương Huyết'})
- Cảnh giới xuất phát: ${originalRealm || 'Tam Giai'}
- Cảnh giới mục tiêu: ${targetRealm || 'Tứ Giai Hóa Hình Nửa Người'}
- Xúc tác đột phá (Đan dược / Dị bảo / Huyết mạch): ${catalyst || 'Hóa Hình Đan Cực Phẩm & Vạn Năm Long Huyết'}
- Chủ nhân hộ pháp: ${characterName || 'Nhân vật chính'}

Hãy khắc họa sống động:
1. Cơn đau thấu xương khi lột xác, xương cốt gãy rồi liền lại, lông rụng mọc da mới.
2. Thiên Kiếp giáng lâm (Lôi kiếp xé toạc mây trời, chủ nhân cùng linh thú kề vai chiến đấu chống đỡ sét đánh).
3. Dung mạo hóa hình thành hình người hoặc nửa người nửa thú (tuấn tú, ma mị, giữ lại tai thú, đuôi hoặc vảy rồng).
4. Thần thông mới thức tỉnh sau khi độ kiếp thành công.
5. Đoạn văn tự sự tiểu thuyết cao trào đầy cảm xúc (500 - 800 từ) để chèn thẳng vào chương truyện.

Trả về định dạng JSON thuần túy:
{
  "beastName": "${beast?.name || 'Linh Thú'}",
  "originalRealm": "${originalRealm || 'Tam Giai'}",
  "targetRealm": "${targetRealm || 'Tứ Giai Hóa Hình'}",
  "catalyst": "${catalyst || 'Hóa Hình Đan'}",
  "humanoidAppearance": "Mô tả dung mạo người / nửa người sau khi hóa hình",
  "newAbilitiesUnlocked": ["Kỹ năng mới 1", "Kỹ năng mới 2"],
  "powerSurgeDescription": "Sự bùng nổ chiến lực và khí thế yêu vương",
  "evolutionNarrative": "Đoạn văn tự sự tiểu thuyết cao trào miêu tả trọn vẹn cảnh độ kiếp hóa hình (500-800 từ)",
  "authorNotes": "Gợi ý cốt truyện cho tác giả"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const simulation = JSON.parse(responseText);
    return res.json({ success: true, simulation });
  } catch (error: any) {
    console.error('Error simulating beast evolution:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/beasts/tame', async (req, res) => {
  try {
    const { beast, tamingMethod, characterName, customCircumstance } = req.body;
    const ai = getGenAI();
    const prompt = `Bạn là tác giả đại thần Tiên Hiệp. Hãy viết phân cảnh THU PHỤC & KÝ KẾT KHẾ ƯỚC VỚI LINH THÚ / YÊU THÚ:
- Yêu Thú: ${beast?.name || 'Tử Tiêu Ma Lôi Báo'} (${beast?.realmTier || 'Tam Giai'})
- Phương pháp khế ước: ${tamingMethod?.name || 'Bình Đẳng Huyết Khế Thuật'}
- Nhân vật thu phục: ${characterName || 'Nhân vật chính'}
- Tình huống: ${customCircumstance || 'Sau trận chiến ác liệt trong sơn động hoặc cứu mạng thú con khỏi thợ săn'}

Hãy viết chi tiết kịch tính:
1. Khoảnh khắc giao tranh hoặc cảm hóa ánh mắt dã tính.
2. Nghi thức giọt máu Bản Mệnh Tinh Huyết dung hợp, phù văn sáng lóa.
3. Liên kết tâm linh thức tỉnh (cảm nhận được tiếng lòng của thú sủng).
4. Đoạn văn tự sự tiểu thuyết hấp dẫn (400 - 700 từ).

Trả về JSON:
{
  "beastName": "${beast?.name || 'Linh Thú'}",
  "beastRank": "${beast?.realmTier || 'Tam Giai'}",
  "strategyUsed": "${tamingMethod?.name || 'Huyết Khế'}",
  "contractFormed": "Xác nhận loại khế ước thành lập",
  "contractSealingMoment": "Khoảnh khắc phù văn khắc vào mi tâm",
  "bondStrength": "Mức độ gắn kết tâm linh (100% Tuyệt đối trung thành)",
  "battleStorySegment": "Đoạn văn tự sự tiểu thuyết kịch tính đầy cảm xúc (400-700 từ)",
  "authorWritingTips": "Lời khuyên phát triển mối quan hệ nhân thú"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const result = JSON.parse(responseText);
    return res.json({ success: true, result });
  } catch (error: any) {
    console.error('Error simulating beast taming:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/locations/generate', async (req, res) => {
  try {
    const { type, tier, category, element, contextPrompt } = req.body;
    const ai = getGenAI();

    let prompt = '';
    if (type === 'grotto') {
      prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp / Huyền Huyễn.
Hãy thiết kế một ĐỘNG PHỦ / ĐỘNG THIÊN TU LUYỆN (Grotto Dwelling) độc nhất vô nhị:
- Phẩm cấp: ${tier || 'Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)'}
- Nguyên tố / Thuộc tính: ${element || 'Ngũ Hành & Lôi Hỏa'}
- Bối cảnh / Yêu cầu: ${contextPrompt || 'Nơi bế quan đột phá cảnh giới và trồng trọt thảo dược'}

Trả về định dạng JSON thuần túy:
{
  "name": "Tên Động Phủ (VD: Tử Tiêu Lôi Hỏa Động)",
  "tier": "${tier || 'Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)'}",
  "locationName": "Vị trí tọa lạc (núi non, vách đá, đảo bay hoặc giới tử)",
  "spiritVeinType": "Loại linh mạch hội tụ (VD: Tam Phẩm Hỏa Mộc Song Tinh)",
  "timeDilationRate": "Tỷ lệ gia tốc thời gian (VD: 1:3 hoặc 1:1)",
  "chambers": [
    { "name": "Tên phòng 1", "purpose": "Mục đích sử dụng", "features": "Đặc điểm bài trí trận pháp" },
    { "name": "Tên phòng 2", "purpose": "Mục đích sử dụng", "features": "Đặc điểm" },
    { "name": "Tên phòng 3", "purpose": "Mục đích sử dụng", "features": "Đặc điểm" }
  ],
  "defensiveArrays": "Đại trận phòng hộ và cấm chế ngăn kẻ thù",
  "specialFacilities": ["Tiện ích đặc biệt 1 (Linh Dược Điền)", "Tiện ích 2 (Hồ Linh Dịch)", "Tiện ích 3"],
  "description": "Mô tả toàn cảnh động phủ (80 - 150 từ)"
}`;
    } else if (type === 'secretRealm') {
      prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp / Huyền Huyễn.
Hãy thiết kế một BÍ CẢNH / CẤM ĐỊA THÍ LUYỆN (Secret Realm) kịch tính và đầy cơ duyên:
- Phẩm cấp: ${tier || 'Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)'}
- Nguyên tố chủ đạo: ${element || 'Cổ Kiếm Ý & Lôi Đình'}
- Bối cảnh mong muốn: ${contextPrompt || 'Chiến trường di tích cổ xưa'}

Trả về định dạng JSON thuần túy:
{
  "name": "Tên Bí Cảnh (VD: Thái Cổ Thiên Kiếm Di Tích)",
  "tier": "${tier || 'Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)'}",
  "element": "${element || 'Ngũ Hành'}",
  "recommendedRealm": "Cảnh giới khuyến nghị để sống sót",
  "openingCycle": "Chu kỳ mở cửa (VD: 60 năm một lần khi trăng máu tròn)",
  "entryRestrictions": "Hạn chế tu vi, tuổi tác hoặc lệnh bài để vào",
  "guardianBeasts": ["Tên Yêu Thú canh giữ 1", "Yêu Thú 2"],
  "trialsAndHazards": ["Cạm bẫy 1", "Hiểm họa 2", "Ảo cảnh 3"],
  "ultimateTreasures": ["Bảo vật chung cực 1", "Kỳ trân 2", "Bí điển 3"],
  "survivalRate": "Tỷ lệ sống sót (VD: Dưới 30%)",
  "environmentDescription": "Mô tả khung cảnh kỳ vĩ, hiểm trở (100 - 150 từ)",
  "backstory": "Lai lịch nguồn gốc từ thời thượng cổ (100 - 150 từ)"
}`;
    } else {
      prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp / Huyền Huyễn.
Hãy thiết kế một ĐỊA DANH / SƠN MẠCH / CẤM KHU (Cultivation Location) mang đậm màu sắc tu chân:
- Phẩm cấp: ${tier || 'Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)'}
- Thể loại: ${category || 'Sơn Mạch Nguyên Sinh'}
- Bối cảnh mong muốn: ${contextPrompt || 'Nơi linh mạch phồn thịnh'}

Trả về định dạng JSON thuần túy:
{
  "name": "Tên Địa Danh (VD: Côn Lôn Thần Sơn Mạch)",
  "tier": "${tier || 'Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)'}",
  "category": "${category || 'Sơn Mạch Nguyên Sinh'}",
  "spiritEnergyDensity": "Nồng độ linh khí so với thế tục",
  "terrainAndWeather": "Địa mạo và thời tiết thiên tai đặc thù",
  "dominantForces": "Thế lực thống trị hoặc bang phái chiếm đóng",
  "naturalTreasures": ["Sản vật 1", "Khoáng thạch 2", "Kỳ thảo 3"],
  "dangerLevel": "An Toàn / Nguy Hiểm Cấp B / Nguy Hiểm Cấp A / Cực Nguy Cấp S / Thập Tử Vô Sinh SSS",
  "description": "Mô tả khái quát cảnh quan (80 - 120 từ)",
  "loreAndHistory": "Truyền thuyết viễn cổ gắn liền với địa danh (80 - 120 từ)"
}`;
    }

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const item = JSON.parse(responseText);
    item.id = (type || 'loc') + '_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, item });
  } catch (error: any) {
    console.error('Error generating realm/location item:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/locations/explore-realm', async (req, res) => {
  try {
    const { character, realm, goal, gearUsed } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp / Huyền Huyễn.
Hãy viết một phân cảnh THÁM HIỂM BÍ CẢNH / CẤM ĐỊA (Secret Realm Expedition) kịch tính, nghẹt thở:
- Nhân vật thám hiểm: ${character?.name || 'Nhân vật chính'} (${character?.realm || 'Trúc Cơ Kỳ'}, ${character?.element || 'Ngũ Hành'})
- Bí cảnh mục tiêu: ${realm?.name || 'Huyết Sắc Thí Luyện Cổ Lâm'} (${realm?.tier || 'Hạ Phẩm Thí Luyện Bí Cảnh'})
- Độc chiêu / Cạm bẫy bí cảnh: ${(realm?.trialsAndHazards || []).join(', ') || 'Ma trận ảo ảnh, yêu thú thủ hộ'}
- Bảo vật tiềm ẩn: ${(realm?.ultimateTreasures || []).join(', ') || 'Thượng Cổ Dị Bảo'}
- Mục tiêu thám hiểm: ${goal || 'Đoạt lấy dược liệu ngàn năm để đột phá sinh tử'}
- Pháp bảo / Binh khí trợ lực: ${gearUsed || 'Bản Mệnh Phi Kiếm & Hộ Thân Phù Lục'}

Hãy khắc họa chi tiết:
1. Quá trình vượt qua cấm chế và cạm bẫy hung hiểm.
2. Trận chiến kịch tính với Yêu Thú thủ hộ hoặc đệ tử phái địch tranh đoạt bảo vật.
3. Thu hoạch cơ duyên tối thượng và biến cố đột phá / thương thế.
4. Đoạn văn tự sự tiểu thuyết cao trào (500 - 800 từ) chuẩn phong cách đại thần để chèn thẳng vào chương truyện.

Trả về định dạng JSON thuần túy:
{
  "characterName": "${character?.name || 'Nhân vật'}",
  "realmName": "${realm?.name || 'Bí Cảnh'}",
  "goal": "${goal || 'Đoạt bảo'}",
  "encounterNarrative": "Tóm tắt cuộc chạm trán và biến cố chính",
  "trialOvercome": "Cách thức nhân vật phá giải cạm bẫy bí cảnh",
  "treasureLooted": "Cơ duyên hoặc bảo vật thực tế cướp được",
  "breakthroughOrInjury": "Tiến cảnh tu vi hoặc vết thương sau chuyến đi",
  "authorPlotHooks": "Gợi ý của tác giả để dẫn dắt các chương tiếp theo",
  "proseNarrative": "Đoạn văn tiểu thuyết hoàn chỉnh (500-800 từ) giàu cảm xúc, văn phong đại thần"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const exploration = JSON.parse(responseText);
    return res.json({ success: true, exploration });
  } catch (error: any) {
    console.error('Error simulating realm exploration:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/locations/simulate-grotto', async (req, res) => {
  try {
    const { character, grotto, years, pillOrTreasure } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là tác giả đại thần chuyên viết tiểu thuyết Tiên Hiệp.
Hãy viết một phân cảnh BẾ QUAN TU LUYỆN TRONG ĐỘNG THIÊN (Grotto Cultivation Breakthrough):
- Nhân vật bế quan: ${character?.name || 'Nhân vật chính'} (${character?.realm || 'Kim Đan Kỳ'})
- Động phủ: ${grotto?.name || 'Thái Hư Giới Tử Tiên Phủ'} (${grotto?.tier || 'Thái Cổ Tiên Phủ'})
- Linh mạch & Gia tốc thời gian: ${grotto?.spiritVeinType || 'Cực phẩm linh mạch'}, ${grotto?.timeDilationRate || '1:10'}
- Thời gian bế quan: ${years || '3 năm'}
- Đan dược / Dị bảo phụ trợ: ${pillOrTreasure || 'Cửu Chuyển Phá Chướng Đan'}

Hãy mô tả sâu sắc:
1. Trạng thái nhập định, thổ nạp linh khí tinh thuần, kinh mạch giãn nở.
2. Quá trình xung phá bình cảnh, thiên địa dị tượng xuất hiện bên trên động phủ.
3. Cảm ngộ đại đạo và kết quả đột phá thành công.
4. Đoạn văn tự sự tiểu thuyết cao trào (400 - 700 từ) để chèn thẳng vào chương truyện.

Trả về định dạng JSON thuần túy:
{
  "characterName": "${character?.name || 'Nhân vật'}",
  "grottoName": "${grotto?.name || 'Động phủ'}",
  "cultivationYears": "${years || '3 năm'}",
  "externalTimeElapsed": "Thời gian trôi qua ở thế giới bên ngoài theo tỷ lệ gia tốc",
  "breakthroughStage": "Cảnh giới mới đột phá đạt được",
  "pillOrTreasureUsed": "${pillOrTreasure || 'Đan dược'}",
  "enlightenmentInsight": "Chân ngôn hoặc pháp tắc đại đạo lĩnh ngộ được",
  "tribulationPhenomenon": "Dị tượng thiên địa (mây ngũ sắc, sấm sét, rồng phượng)",
  "proseNarrative": "Đoạn văn tự sự tiểu thuyết trác tuyệt (400-700 từ) chèn vào truyện"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const simulation = JSON.parse(responseText);
    return res.json({ success: true, simulation });
  } catch (error: any) {
    console.error('Error simulating grotto cultivation:', error);
    return res.status(500).json({ error: error.message });
  }
});

// CITADEL & CITY SIMULATION APIS
app.post('/api/citadels/generate', async (req, res) => {
  try {
    const { name, tier, category, customIdea, genre } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là tác giả đại thần chuyên xây dựng thế giới quan (Worldbuilding) cho tiểu thuyết ${genre || 'Tiên Hiệp / Huyền Huyễn'}.
Hãy thiết kế một THÀNH TRÌ / TIÊN ĐÔ / PHÙ KHÔNG CỔ QUAN chi tiết, độc bản:
- Tên hoặc ý tưởng: ${name || customIdea || 'Tự sáng tạo độc đáo'}
- Cấp bậc phẩm giai: ${tier || 'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4)'}
- Phân loại công năng: ${category || 'Đấu Giá & Mậu Dịch Đô Hội'}
- Bối cảnh gợi ý: ${customIdea || 'Đô thị tu tiên hùng vĩ'}

Yêu cầu xuất ra định dạng JSON đúng chuẩn với các trường sau:
{
  "name": "Tên thành trì kèm danh hiệu hào nhoáng (ví dụ: Vạn Tinh Thần Thành • Đệ Nhất Thương Minh)",
  "tier": "${tier || 'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4 - Nguyên Anh / Hóa Thần)'}",
  "category": "${category || 'Đấu Giá & Mậu Dịch Đô Hội'}",
  "locationRegion": "Vị trí địa lý, thuộc châu vực, đại lục nào",
  "population": "Quy mô dân số tu sĩ và phàm nhân",
  "defensiveArray": {
    "name": "Tên Hộ Thành Đại Trận",
    "tier": "Phẩm cấp trận pháp (ví dụ: Bát Phẩm Cực Trận)",
    "features": "Cơ chế phòng hộ, phản kích, bẫy sát thương và phong ấn uy áp",
    "maintenanceCost": "Mức tiêu hao linh thạch bảo dưỡng"
  },
  "rulingFaction": {
    "name": "Tên thế lực / gia tộc / tông môn chấp chưởng",
    "leaderName": "Tên Thành Chủ / Lãnh Tụ",
    "realmLevel": "Cảnh giới tu vi thành chủ",
    "stance": "Lập trường cai trị (ví dụ: Thiết Huyết Quân Quy / Tuyệt Đối Trung Lập / Chính Đạo / Ma Đạo)"
  },
  "keyDistricts": [
    { "name": "Tên phân khu 1 (ví dụ: Đại Đấu Giá Các)", "type": "Loại hình", "description": "Mô tả công năng và hoạt động náo nhiệt" },
    { "name": "Tên phân khu 2 (ví dụ: Lôi Đài Sinh Tử)", "type": "Loại hình", "description": "Quy tắc và điểm đặc sắc" },
    { "name": "Tên phân khu 3 (ví dụ: Động Phủ Cho Thuê / Phường Thị)", "type": "Loại hình", "description": "Chi tiết phục vụ tu sĩ" }
  ],
  "lawsAndTaboos": [
    "Thiết luật 1 (cấm tư đấu ngoài lôi đài...)",
    "Thiết luật 2 (hạn chế phi hành độ cao thấp...)",
    "Thiết luật 3 (thuế khóa hoặc lệnh điều động...)"
  ],
  "entryFeeAndTaxes": "Quy định phí nhập thành và thuế mậu dịch",
  "specialResources": [
    "Tài nguyên / mạch khoáng độc nhất 1",
    "Tài nguyên / đặc sản độc nhất 2",
    "Lợi thế địa lý chiến lược 3"
  ],
  "description": "Đoạn văn miêu tả diện mạo, không khí và cảnh tượng hùng vĩ của thành trì (100-150 từ)",
  "historyAndLegends": "Lịch sử lập thành, truyền thuyết thượng cổ hoặc chiến tích lừng lẫy (80-120 từ)"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const item = JSON.parse(responseText);
    item.id = 'citadel_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, item });
  } catch (error: any) {
    console.error('Error generating citadel:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/citadels/simulate-event', async (req, res) => {
  try {
    const { citadel, character, eventType, goal, customDetails } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là tác giả đại thần tiểu thuyết Tiên Hiệp / Huyền Huyễn với ngòi bút miêu tả chiến trận quy mô lớn hào hùng, kịch tính, dồn dập:
Hãy mô phỏng một ĐẠI BIẾN CỐ / CHIẾN SỰ THÀNH TRÌ (Citadel Siege & Mega Event) tại:
- Thành trì: ${citadel?.name || 'Vạn Bảo Tiên Thành'} (Phẩm giai: ${citadel?.tier || 'Thần Thành'})
- Hộ Thành Đại Trận: ${citadel?.defensiveArray?.name || 'Hộ Thành Trận'}
- Loại biến cố: ${eventType || 'Thú Triều Vạn Cổ Công Thành'}
- Nhân vật tham gia: ${character?.name || 'Nhân vật chính'} (Tu vi: ${character?.realm || 'Trúc Cơ / Kim Đan'}, Bản mệnh: ${character?.element || 'Ngũ Hành'})
- Mục tiêu / Động cơ nhân vật: ${goal || 'Bảo vệ thành trì, chém giết đầu lĩnh đoạt bảo'}
- Chi tiết thêm: ${customDetails || 'Chiến sự khốc liệt nghẹt thở'}

Yêu cầu xuất ra JSON cấu trúc sau:
{
  "citadelName": "${citadel?.name || 'Tiên Thành'}",
  "characterName": "${character?.name || 'Nhân vật chính'}",
  "eventType": "${eventType || 'Thú Triều Công Thành'}",
  "goal": "${goal || 'Chiến đấu đoạt bảo'}",
  "situationOverview": "Khí tượng mở đầu, tiếng còi báo động xé tan bầu trời, áp lực từ biến cố giáng xuống (70-100 từ)",
  "defenseDeployment": "Hộ thành đại trận kích hoạt chùm sáng vút lên, quân lực, đại pháo và các đại năng nghênh chiến (70-100 từ)",
  "characterActionAndBattle": "Hành động chiến đấu quyết liệt của nhân vật chính, thi triển công pháp binh khí át chủ bài (100-150 từ)",
  "dramaticClimax": "Cao trào nghẹt thở khi xuất hiện biến số nguy cấp hoặc đối đầu kẻ địch mạnh nhất (100-120 từ)",
  "outcomeAndCasualties": "Kết cục biến cố, mức độ tổn hại của thành trì và chiến thắng vẻ vang (70-90 từ)",
  "rewardsAndReputation": "Chiến lợi phẩm đoạt được, nội đan / bảo vật và sự kính nể của Thành Chủ / vạn dân (70-90 từ)",
  "authorPlotHooks": "3-4 điểm phục bút, manh mối thế lực đứng sau hoặc cơ duyên mở ra cho các chương tiếp theo",
  "chapterStorySegment": "Đoạn văn văn phong tiểu thuyết hoàn chỉnh, giàu hình ảnh, âm thanh, thoại chiến đấu kịch tính và cảm xúc tu tiên (500 - 700 từ) để tác giả chèn trực tiếp vào bản thảo"
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const simulation = JSON.parse(responseText);
    return res.json({ success: true, simulation });
  } catch (error: any) {
    console.error('Error simulating citadel event:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Sect / Villain / Spy Generation Endpoint
app.post('/api/sects/generate', async (req, res) => {
  try {
    const { entityType = 'sect', camp, grade, category, userPrompt, genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    let systemInstruction = '';
    let prompt = '';

    if (entityType === 'villain') {
      systemInstruction = 'Bạn là bậc thầy thiết kế nhân vật phản diện, đại ma đầu, ngụy quân tử trong tiểu thuyết Tiên Hiệp, Huyền Huyễn phương Đông.';
      prompt = `Hãy sáng tạo một Nhân Vật Phản Diện / Đối Đầu (Villain & Antagonist) độc đáo cho thế giới ${genre}.
Phân loại: ${category || 'Ngụy Quân Tử / Đạo Mạo Nhân Quân'}
Ý tưởng người dùng: "${userPrompt || 'Một nhân vật phản diện thâm độc, nhiều tầng lớp tâm lý'}"

Yêu cầu xuất ra định dạng JSON đúng chuẩn với các trường sau:
{
  "name": "Họ và tên nhân vật phản diện",
  "title": "Danh hiệu / Ngoại hiệu (ví dụ: Lăng Vân Quân Tử / Vạn Huyết Đồ Tể)",
  "category": "${category || 'Ngụy Quân Tử / Đạo Mạo Nhân Quân'}",
  "cultivationRealm": "Cảnh giới tu vi (ví dụ: Nguyên Anh Hậu Kỳ)",
  "sectAffiliation": "Tông môn / thế lực liên hệ",
  "publicFacade": "Vỏ bọc đạo mạo / giả tạo trước mặt thiên hạ (60-90 từ)",
  "trueDarkNature": "Bản chất tàn độc, dục vọng sâu kín thực sự (60-90 từ)",
  "deadlySchemes": [
    "Âm mưu tàn độc 1",
    "Âm mưu tàn độc 2"
  ],
  "fatalWeakness": "Nhược điểm chí mạng / sơ hở tâm lý",
  "signatureViciousMove": "Tuyệt chiêu sát phạt hiểm ác nhất",
  "nemesisGrudge": "Mối thâm thù ân oán với nhân vật chính hoặc đối thủ"
}`;
    } else if (entityType === 'spy') {
      systemInstruction = 'Bạn là chuyên gia thiết kế nội gián, điệp viên, trinh sát nằm vùng trong tiểu thuyết Tiên Hiệp.';
      prompt = `Hãy sáng tạo một Nhân Vật Điệp Báo / Nội Gián (Spy & Infiltrator) đầy kịch tính cho thế giới ${genre}.
Loại hình: ${category || 'Điệp Viên Ma Đạo Trà Trộn Tiên Môn'}
Ý tưởng người dùng: "${userPrompt || 'Một nội gián sống trong hai thân phận đối nghịch'}"

Yêu cầu xuất ra định dạng JSON đúng chuẩn với các trường sau:
{
  "name": "Họ tên gián điệp",
  "disguisedRole": "Thân phận ngụy trang bề ngoài (ví dụ: Ngoại Môn Dược Sư)",
  "actualLoyalty": "Tổ chức / thế lực trung thành thực sự (ví dụ: Thiên Ma Cung)",
  "infiltratedSect": "Tông môn / nơi đang nằm vùng (ví dụ: Thái Hư Kiếm Tông)",
  "category": "${category || 'Điệp Viên Ma Đạo Trà Trộn Tiên Môn'}",
  "missionObjective": "Mục tiêu mật lệnh tối thượng",
  "camouflageTechnique": "Bí pháp che giấu thân phận / ma khí / đạo tâm",
  "secretTokenOrSignal": "Tín vật bí mật hoặc ám hiệu liên lạc",
  "exposureRiskLevel": "Mức độ rủi ro hiện tại (ví dụ: Rất Cao / Đang bị Chấp Pháp Đường nghi ngờ)",
  "innerConflict": "Xung đột nội tâm sâu sắc giữa hai thân phận (50-80 từ)",
  "fatalFlaw": "Tử huyệt hoặc thói quen vô thức dễ bị lộ"
}`;
    } else {
      // Default: Sect
      systemInstruction = 'Bạn là đại sư kiến thiết thế giới quan Tông Môn, Bất Hủ Thánh Địa, Ma Giáo và Đạo Thống trong tiểu thuyết Tiên Hiệp.';
      prompt = `Hãy sáng tạo một Tông Môn / Thế Lực (Sect & Faction) độc đáo cho thế giới ${genre}.
Trận doanh: ${camp || 'Chính Đạo (Orthodox / Tiên Môn)'}
Phẩm cấp: ${grade || 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)'}
Ý tưởng người dùng: "${userPrompt || 'Một tông môn có truyền thừa cổ xưa và hộ sơn đại trận uy mãnh'}"

Yêu cầu xuất ra định dạng JSON đúng chuẩn với các trường sau:
{
  "name": "Tên Tông Môn kèm danh hiệu hào hùng",
  "camp": "${camp || 'Chính Đạo (Orthodox / Tiên Môn)'}",
  "grade": "${grade || 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)'}",
  "headquarters": "Địa điểm đóng quân / trụ sở sơn môn hùng vĩ",
  "founderAndLegacy": "Tổ sư khai sơn và truyền thuyết lịch sử (60-100 từ)",
  "leadership": {
    "patriarch": "Tên và cảnh giới Thái Thượng Tổ Sư (ví dụ: Thái Hư Kiếm Thánh - Đại Thừa Hậu Kỳ)",
    "sectMaster": "Tên và cảnh giới Đương Kim Chưởng Môn",
    "lawEnforcementElder": "Tên và cảnh giới Trưởng Lão Chấp Pháp",
    "discipleCount": "Quy mô số lượng đệ tử ngoại môn, nội môn, chân truyền"
  },
  "heritageScriptures": [
    { "name": "Tên công pháp truyền thừa 1", "grade": "Phẩm giai", "summary": "Mô tả uy lực tóm tắt" },
    { "name": "Tên công pháp truyền thừa 2", "grade": "Phẩm giai", "summary": "Mô tả uy lực tóm tắt" }
  ],
  "sacredArtifacts": [
    { "name": "Tên Trấn Tông Pháp Bảo 1", "rank": "Phẩm cấp", "power": "Uy năng trấn phái" }
  ],
  "guardianArray": {
    "name": "Tên Hộ Sơn Đại Trận",
    "tier": "Phẩm cấp đại trận",
    "powerDescription": "Cơ chế phòng thủ, kết giới và sát thương"
  },
  "specialties": ["Đặc sản môn phái 1", "Đặc sản môn phái 2", "Đặc sản môn phái 3"],
  "rulesAndPrecepts": ["Môn quy giới luật 1", "Môn quy giới luật 2", "Môn quy giới luật 3"],
  "politicalStance": {
    "allies": ["Đồng minh 1", "Đồng minh 2"],
    "bitterEnemies": ["Túc địch 1", "Túc địch 2"],
    "currentCrisis": "Khủng hoảng hoặc điểm nóng xung đột hiện tại của tông môn"
  },
  "description": "Đoạn văn giới thiệu tổng quan về thanh thế, vị thế và bầu không khí của tông môn (100-150 từ)"
}`;
    }

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction, responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { systemInstruction, responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const item = JSON.parse(responseText);
    item.id = (entityType === 'villain' ? 'villain_' : entityType === 'spy' ? 'spy_' : 'sect_') + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, item });
  } catch (error: any) {
    console.error('Error generating sect/villain/spy:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Faction War & Scheme Simulation Endpoint
app.post('/api/sects/simulate-conflict', async (req, res) => {
  try {
    const {
      scenarioType,
      sectName,
      spyOrVillainName,
      protagonistName = 'Lâm Phong',
      customContext = '',
      genre = 'Tiên Hiệp'
    } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là bậc thầy biên kịch tiểu thuyết ${genre} đỉnh cao. Hãy mô phỏng một diễn biến kịch tính về Đấu Trí & Xung Đột Tông Môn (Faction War & Scheme Conflict).
Thông tin bối cảnh:
- Loại hình xung đột: ${scenarioType || 'Đại Chiến Tông Môn / Vây Hãm Sơn Môn'}
- Tông môn liên quan: ${sectName || 'Thái Hư Kiếm Tông'}
- Nhân vật đối đầu / nội gián: ${spyOrVillainName || 'Cố Thanh Hà'}
- Nhân vật chính / can dự: ${protagonistName}
- Tình tiết đặc thù bổ sung: "${customContext || 'Âm mưu bại lộ ngay tại buổi đại lễ tế thiên phong bế sơn môn'}"

Yêu cầu xuất ra định dạng JSON đúng chuẩn với cấu trúc:
{
  "scenarioTitle": "Tiêu đề diễn biến hào hùng, đậm chất chương truyện (ví dụ: Huyết Tế Thái Hư • Kiếm Khí Ngút Trời Chém Phản Đồ)",
  "scenarioType": "${scenarioType || 'Đại Chiến Tông Môn / Vây Hãm Sơn Môn'}",
  "sectName": "${sectName || 'Thái Hư Kiếm Tông'}",
  "spyOrVillainName": "${spyOrVillainName || 'Cố Thanh Hà'}",
  "protagonistName": "${protagonistName}",
  "situationOverview": "Tình huống tổng quan dẫn đến căng thẳng bùng nổ (100-150 từ)",
  "thePlotScheme": "Mưu mô thâm độc được vạch ra chi tiết và cơ chế lừa gạt (100-150 từ)",
  "turningPointAndBetrayal": "Bước ngoặt kịch tính, sự phản bội hoặc khoảnh khắc bại lộ (100-150 từ)",
  "battleActionClimax": "Cao trào chiến đấu đỉnh điểm giữa các đại năng, kích hoạt trận pháp và đại sát chiêu (150-200 từ)",
  "resolutionAndCasualties": "Kết cục xung đột, tổn thất thương vong và thế cục sau cơn chấn động (100-150 từ)",
  "authorPlotHooks": [
    "Gợi ý plot hook 1 cho tác giả phát triển chương tiếp",
    "Gợi ý plot hook 2 về manh mối bảo vật hoặc kẻ đứng sau",
    "Gợi ý plot hook 3 về sự đột phá hoặc ân oán tiếp diễn"
  ],
  "novelSceneSnippet": "Trích đoạn văn phong tiểu thuyết Tiên Hiệp mẫu mực (500-700 từ), miêu tả chân thực từng hơi thở, kiếm khí rít gào, tiếng cười man rợ của phản diện, đòn phản kích nghịch chuyển của nhân vật chính, phù hợp chèn thẳng vào bản thảo chương truyện."
}`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const simulation = JSON.parse(responseText);
    return res.json({ success: true, simulation });
  } catch (error: any) {
    console.error('Error simulating faction conflict:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// CHARACTER APRAISAL & ENCOUNTER SIMULATION APIS
// -------------------------------------------------------------------------
app.post('/api/characters/appraise-roots', async (req, res) => {
  try {
    const { character, ceremonyType = 'Đại Điển Trắc Căn Tông Môn', examiner = 'Thủ Tọa Trưởng Lão', genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là Trưởng Lão Giám Định Linh Căn & Đạo Cốt Tối Cao trong tiểu thuyết ${genre}.
Hãy tiến hành một buổi giám định và trắc thí linh căn, đạo tâm, thiên phú kinh mạch cho nhân vật sau:
Tên: ${character.name} (${character.pinyinOrAlias || 'Không có'})
Vai trò: ${character.role} - Cảnh giới: ${character.realmOrRank}
Linh căn hiện tại: ${character.spiritualRoots || 'Bình thường'}
Hình thức trắc thí: ${ceremonyType} do ${examiner} chủ trì.

Yêu cầu xuất ra JSON chính xác với cấu trúc:
{
  "testingCeremonyNarrative": "Mô tả sinh động khoảng 150-250 từ về diễn biến nghi lễ trắc thí, phản ứng của bia đá trắc linh/trụ ngọc, ánh sáng linh quang bộc phát, tiếng trầm trồ của vạn người chứng kiến.",
  "appraisalConclusion": "Lời phê phán quyết chính thức và dự đoán tiền đồ tương lai của nhân vật.",
  "updatedSpiritualRootDetail": {
    "countCategory": "Đơn Linh Căn / Song Linh Căn / Tam Linh Căn / Ngũ Hành Tạp Căn / Dị Linh Căn / Hỗn Độn Khai Thiên Căn",
    "grade": "Phế Căn / Hạ Phẩm / Trung Phẩm / Thượng Phẩm / Cực Phẩm / Thiên Linh Căn / Tiên Phẩm Dị Chủng / Thần Cấp Hỗn Độn Tổ Căn",
    "rootName": "Tên linh căn chuẩn tiên hiệp (ví dụ: Cực Dương Chân Hỏa Thiên Linh Căn)",
    "elements": [
      { "element": "Kim/Mộc/Thủy/Hỏa/Thổ/Lôi/Băng/Phong/Ám/Quang/Hỗn Độn", "purity": 95, "color": "#facc15", "description": "Ý nghĩa sát thương hoặc đặc tính" }
    ],
    "cultivationSpeedMultiplier": "Hệ số tu luyện (ví dụ: x10 lần khi hấp thu hỏa linh)",
    "specialAuraEffect": "Dị tượng thiên địa khi vận chuyển chu thiên"
  },
  "updatedMentalAttributes": {
    "soulRealm": "Phàm Hồn / Uẩn Thần / Du Thần / Nguyên Thần Pháp Tướng / Bất Diệt Hồn Quang / Chân Linh Thái Cổ",
    "soulPowerPoints": 6500,
    "perceptionRange": "Phạm vi thần thức (ví dụ: 10 dặm)",
    "daoHeartType": "Tên loại đạo tâm",
    "daoHeartStability": 95,
    "comprehensionTier": "Cấp bậc ngộ tính",
    "comprehensionScore": 92,
    "innerDemonResistance": 90
  },
  "awakenedTalents": [
    {
      "id": "tal_awakened_1",
      "name": "Tên thiên phú bẩm sinh mới thức tỉnh",
      "tier": "Hoàng Cấp/Huyền Cấp/Địa Cấp/Thiên Cấp/Thánh Cấp/Thần Cấp/Cấm Kỵ",
      "category": "Đồng Thuật / Cốt Cách / Bách Nghệ / Ý Cảnh / Thôn Phệ / Thời Không",
      "description": "Chi tiết hiệu ứng",
      "combatBuffEffect": "Chỉ số gia tăng chiến lực"
    }
  ]
}`;

    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const appraisal = JSON.parse(responseText);
    return res.json({ success: true, appraisal });
  } catch (error: any) {
    console.error('Error appraising roots:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/characters/simulate-encounter', async (req, res) => {
  try {
    const { character1, character2, encounterType, location, userPrompt, genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là đại thần văn hào tiểu thuyết ${genre}. Hãy viết một phân đoạn mô phỏng cuộc tao ngộ, đối đầu hoặc giao phong sâu sắc giữa hai nhân vật:
Nhân vật 1: ${character1.name} (${character1.pinyinOrAlias || ''}) - ${character1.role} - Cảnh giới: ${character1.realmOrRank}
- Tông môn: ${character1.sectOrFaction || 'Tán tu'} - Binh khí: ${character1.weaponOrAbility || 'Chưa rõ'}
- Tính cách: ${character1.personality}

Nhân vật 2: ${character2.name} (${character2.pinyinOrAlias || ''}) - ${character2.role} - Cảnh giới: ${character2.realmOrRank}
- Tông môn: ${character2.sectOrFaction || 'Tán tu'} - Binh khí: ${character2.weaponOrAbility || 'Chưa rõ'}
- Tính cách: ${character2.personality}

Loại hình tao ngộ: ${encounterType || 'Đấu Trí & Đấu Khí Tranh Đoạt Duyên'}
Địa điểm: ${location || 'Cổ Thần Di Tích'}
Yêu cầu cốt truyện bổ sung: ${userPrompt || 'Không có'}

Hãy trả về định dạng JSON chính xác:
{
  "character1Name": "${character1.name}",
  "character2Name": "${character2.name}",
  "encounterType": "${encounterType || 'Kỳ Ngộ Tranh Chấp'}",
  "location": "${location || 'Cổ Thần Di Tích'}",
  "contextNarrative": "Mô tả bối cảnh khởi đầu cuộc gặp gỡ, không khí căng thẳng hoặc bất ngờ khoảng 100-150 từ.",
  "dialogueExchange": [
    { "speaker": "${character1.name}", "line": "Câu thoại đầu tiên...", "expression": "Thần sắc, cử chỉ" },
    { "speaker": "${character2.name}", "line": "Câu đối đáp...", "expression": "Phản ứng đối lập" },
    { "speaker": "${character1.name}", "line": "Cao trào lời nói...", "expression": "Khí thế bùng nổ" }
  ],
  "combatOrActionClimax": "Mô tả cao trào chạm trán: chiêu thức thi triển, linh áp bùng nổ, pháp bảo va chạm, uy lực chấn động trời đất khoảng 150-200 từ.",
  "resolutionAndImpact": "Kết cục cuộc chạm trán và ảnh hưởng tới vận mệnh, ân oán giữa hai người về sau.",
  "novelSnippet": "Trích đoạn văn xuôi tiên hiệp hoàn chỉnh dài 500 - 800 từ đạt chuẩn văn phong xuất bản, giàu hình tượng, nhịp điệu dồn dập, để tác giả chèn trực tiếp vào bản thảo truyện."
}`;

    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const simulation = JSON.parse(responseText);
    return res.json({ success: true, simulation });
  } catch (error: any) {
    console.error('Error simulating encounter:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// SUPREME CULTIVATION BREAKTHROUGH & METHOD GENERATION
// -------------------------------------------------------------------------
app.post('/api/cultivation/simulate-breakthrough', async (req, res) => {
  try {
    const { character, method, fromTier, toTier, catalysts = [], environment = 'Động phủ bí mật', genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    const charName = character?.name || 'Nhân vật chính';
    const methodName = method?.name || 'Cửu Chuyển Huyền Công';
    const catalystsStr = catalysts.length > 0 ? catalysts.join(', ') : 'Linh thạch cực phẩm và dị bảo thiên địa';

    const prompt = `Bạn là đại văn hào chuyên viết tiểu thuyết ${genre} đỉnh cao.
Hãy viết một ĐẠI CẢNH ĐỘT PHÁ LỘT XÁC VÀ BƯỚC NGOẶT TU VI đầy kịch tính, nghẹt thở và hào tráng:
- Nhân vật tu luyện: ${charName} (Cảnh giới hiện tại: ${character?.realmOrRank || 'Trúc Cơ / Kim Đan'}, Thể chất: ${character?.specialPhysique || 'Phàm thể'}, Linh căn: ${character?.spiritualRoots || 'Ngũ Hành'})
- Công pháp tu luyện: ${methodName} (Hệ phái: ${method?.path || 'Luyện Thể Ngoại Công'}, Phẩm cấp: ${method?.gradeLevel || 'Đạo Thống Đế Kinh'})
- Tầng đột phá: Từ [${fromTier}] lên [${toTier}]
- Chất xúc tác / Thiên tài địa bảo / Đan dược sử dụng: ${catalystsStr}
- Bối cảnh / Động phủ bế quan: ${environment}

Yêu cầu xuất ra định dạng JSON đúng chuẩn với các trường sau:
{
  "characterName": "${charName}",
  "methodName": "${methodName}",
  "fromTier": "${fromTier}",
  "toTier": "${toTier}",
  "catalystsUsed": ${JSON.stringify(catalysts.length > 0 ? catalysts : ['Linh Dược Cực Phẩm'])},
  "environmentalAtmosphere": "Bầu không khí căng thẳng, linh khí tích tụ cuồn cuộn bên trong và bên ngoài động phủ (60-90 từ)",
  "breakthroughProcess": "Quá trình vận chuyển chu thiên, bẻ gãy kinh mạch, tôi luyện gân cốt hoặc đốt cháy đan điền đầy đau đớn dữ dội (100-150 từ)",
  "tribulationPhenomenon": "Thiên kiếp giáng lâm hoặc dị tượng thiên địa rung chuyển đất trời (lôi kiếp, mây ngũ sắc, thần ma gầm rống) (90-130 từ)",
  "innerDemonEncounter": "Tâm ma xuất hiện cám dỗ hoặc ảo cảnh chấp niệm quá khứ và cách nhân vật chém đứt tâm ma bằng đạo tâm kiên cường (90-130 từ)",
  "physicalTransformationDetails": "Chi tiết lột xác nhục thân hoặc nguyên thần (kim cốt, lưu ly bì, tủy xương đổi màu, bài trừ tạp chất) (80-120 từ)",
  "ultimatePowerBurst": "Khoảnh khắc phá tan bình cảnh, uy áp bùng nổ chấn nhiếp non sông, khí thế tăng vọt (70-100 từ)",
  "authorProseSnippet": "Đoạn văn tự sự tiểu thuyết hoàn chỉnh dài 600 - 900 từ đạt chuẩn văn phong đại thần xuất bản, giàu hình tượng, nhịp điệu dồn dập kịch tính, để tác giả chèn trực tiếp vào bản thảo chương truyện."
}`;

    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const simulation = JSON.parse(responseText);
    return res.json({ success: true, simulation });
  } catch (error: any) {
    console.error('Error simulating breakthrough:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/cultivation/generate-method', async (req, res) => {
  try {
    const { path = 'Luyện Thể Ngoại Công', gradeLevel = 'Thiên Giai Tuyệt Thế', customIdea = '', tierCount = 4, genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    const prompt = `Bạn là tác giả đại thần thế giới quan ${genre}.
Hãy sáng tạo một BỘ CÔNG PHÁP TU LUYỆN SIÊU CẤP (Supreme Cultivation Method) độc bản, sâu sắc và uy lực:
- Hệ phái: ${path}
- Phẩm cấp: ${gradeLevel}
- Ý tưởng cốt lõi: "${customIdea || 'Một tuyệt học thượng cổ thất truyền có cơ chế lột xác độc đáo'}"
- Số lượng tầng chi tiết: ${tierCount} tầng

Yêu cầu xuất ra JSON chuẩn:
{
  "name": "Tên công pháp chuẩn tiên hiệp uy mãnh",
  "path": "${path}",
  "gradeLevel": "${gradeLevel}",
  "originAndHeritage": "Lai lịch nguồn gốc thượng cổ và người sáng tạo (60-90 từ)",
  "corePhilosophy": "Triết lý tu hành cốt lõi (40-60 từ)",
  "bodyTransformationMechanism": "Cơ chế biến đổi nhục thân / kinh mạch (50-80 từ)",
  "energyCircuitRoute": "Đường vận khí chu thiên và các khiếu huyệt chủ chốt (50-80 từ)",
  "innateSecretAbilities": [
    { "name": "Thần thông bí kỹ 1", "tierRequired": "Tầng 1", "description": "Mô tả uy lực" },
    { "name": "Thần thông bí kỹ 2", "tierRequired": "Tầng 2", "description": "Mô tả uy lực" }
  ],
  "requiredCatalysts": ["Xúc tác 1", "Xúc tác 2", "Xúc tác 3"],
  "tiers": [
    {
      "tierNumber": 1,
      "tierName": "Tầng 1: Tên tầng",
      "subStages": ["Sơ kỳ", "Trung kỳ", "Viên mãn"],
      "realmEssence": "Bản chất cảnh giới tầng này",
      "physicalManifestation": "Biểu hiện cơ thể bên ngoài",
      "spiritualVeinOperation": "Vận hành khí huyết / kinh mạch",
      "breakthroughPhenomenon": "Dị tượng khi đột phá",
      "mortalLifespan": "Thọ mệnh gia tăng",
      "combatAura": "Khí tức chiến đấu tỏa ra",
      "tabooAndDemonDanger": "Cấm kỵ hoặc nguy hiểm tẩu hỏa nhập ma"
    }
  ],
  "authorWritingTips": ["Mẹo viết 1", "Mẹo viết 2"]
}`;

    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const method = JSON.parse(responseText);
    method.id = 'method_' + Math.random().toString(36).substring(2, 9);
    return res.json({ success: true, method });
  } catch (error: any) {
    console.error('Error generating cultivation method:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/sects/promote-disciple', async (req, res) => {
  try {
    const { character, targetPosition, previousPosition, sectName = 'Thái Hư Kiếm Tông', genre = 'Tiên Hiệp' } = req.body;
    const ai = getGenAI();

    const charName = character?.name || 'Nhân vật chính';
    const toRank = targetPosition?.rankName || 'Chân Truyền Đệ Tử';
    const fromRank = previousPosition || 'Nội Môn Đệ Tử';

    const prompt = `Bạn là tác giả đại thần tiểu thuyết ${genre}.
Hãy viết một phân đoạn ĐẠI ĐIỂN TẤN THĂNG CHỨC VỤ TÔNG MÔN long trọng và kịch tính:
- Môn phái: ${sectName}
- Đệ tử được tấn thăng: ${charName} (Cảnh giới: ${character?.realmOrRank || 'Trúc Cơ / Kim Đan'}, Linh căn: ${character?.spiritualRoots || 'Đơn Linh Căn'})
- Chức vụ trước đây: ${fromRank}
- Chức vụ mới được phong: ${toRank}
- Phục sức & Lệnh bài mới ban: ${targetPosition?.clothingAndToken || 'Đạo Bào Tử Kim và Lệnh Bài Huyết Ngọc'}
- Bổng lộc & Quyền hạn mới: ${targetPosition?.resourceMonthlyStipend || 'Linh thạch và đan dược tăng vọt'}

Yêu cầu xuất ra định dạng JSON:
{
  "characterName": "${charName}",
  "sectName": "${sectName}",
  "promotedRank": "${toRank}",
  "ceremonyNarrative": "Mô tả đại lễ tấn thăng tại Quảng Trường Tông Môn hoặc Tổ Sư Điện, tiếng chuông đồng ngân vang, vạn đệ tử ngưỡng vọng (100-150 từ)",
  "trialPassed": "Thành tích hoặc chiến tích rực rỡ giúp nhân vật đủ tư cách tấn thăng (ví dụ: chém sát ma đầu, đoạt quán quân tỷ võ) (70-100 từ)",
  "newPrivilegesAndStipend": "Quyền hạn mới, động phủ mới và tài nguyên bổng lộc hàng tháng nhận được (60-90 từ)",
  "tokenBestowed": "Khoảnh khắc Trưởng Lão hoặc Chưởng Môn đích thân trao lệnh bài, đạo bào và cấm chế động phủ (60-90 từ)",
  "novelSceneSnippet": "Trích đoạn văn xuôi tiểu thuyết 500 - 800 từ đạt chuẩn văn phong xuất bản, có đối thoại tuyên thệ, ánh mắt ghen tị của đối thủ và niềm tự hào của sư môn để chèn thẳng vào bản thảo truyện."
}`;

    let responseText = '{}';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      const fallback = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = fallback.text || '{}';
    }

    const promotion = JSON.parse(responseText);
    return res.json({ success: true, promotion });
  } catch (error: any) {
    console.error('Error simulating disciple promotion:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/master-creation-pipeline', async (req, res) => {
  try {
    const {
      character,
      sectPosition,
      sectName,
      spineStage,
      cultivationMethod,
      swordStance,
      spell,
      talisman,
      narrativeSetting,
      opponentOrObstacle,
      primaryConflict,
      narrativePacing,
      wordCountTarget,
      literaryTone
    } = req.body;

    const charName = character?.name || 'Lăng Tiêu';
    const rootName = character?.spiritualRoot || character?.spiritualRootDetail?.name || 'Hỗn Độn Ngũ Hành Khai Thiên Căn';
    const daoHeart = character?.daoHeart || 'Vô Địch Đạo Tâm';
    const sName = sectName || 'Thái Hư Kiếm Tông';
    const sRank = sectPosition?.rankName || 'Chân Truyền Đệ Tử';
    const spineName = spineStage?.stageName || 'Trúc Cơ & Tụ Đan';
    const spineRealm = spineStage?.realmTierTitle || 'Kim Đan Sơ Kỳ (Cửu Chuyển Đạo Đài)';
    const methodStr = cultivationMethod?.name ? `${cultivationMethod.name} (${cultivationMethod.currentLayer || 'Tầng 3'})` : 'Hỗn Độn Thôn Thiên Thần Ma Quyết';
    
    const swordStr = swordStance ? `${swordStance.stanceName} (${swordStance.intentLevel || ''}) - Khẩu quyết: ${swordStance.mantraOrIncantation || ''}` : 'Thái Sơ Nhất Kiếm - Kiếm Ý Phá Toái Hư Không';
    const spellStr = spell ? `${spell.spellName} (${spell.tierRank || ''}) - Thủ ấn: ${spell.handMudraFormula || ''} - Chân ngôn: ${spell.incantationChant || ''}` : 'Ngũ Hành Diệt Ma Thần Lôi';
    const talismanStr = talisman ? `${talisman.talismanName} (${talisman.gradeLevel || ''}) - Hạ bút: ${talisman.brushMovementScripture || ''}` : 'Cửu Thiên Trấn Ma Đạo Triện';
    
    const settingStr = narrativeSetting || 'Cổ Thần Bí Cảnh - Huyết Nguyệt Hạp Cốc';
    const opponentStr = opponentOrObstacle || 'Huyết Ma Giáo Thiếu Chủ cùng tam đại Hộ Pháp';
    const conflictStr = primaryConflict || 'Tranh đoạt Thái Cổ Tiên Thiên Linh Thảo giữa lôi kiếp sắp giáng lâm';
    const toneStr = literaryTone || 'Hào hùng bi tráng, nhiệt huyết sảng khoái, đậm chất tiên hiệp cổ phong';
    
    const wordTarget = wordCountTarget === 'epic_chapter' ? '2500 - 3200 từ' : wordCountTarget === 'compact' ? '900 - 1400 từ' : '1600 - 2200 từ';

    const prompt = `Bạn là Đại Tông Sư tiểu thuyết Tiên Hiệp & Huyền Huyễn Cổ Phong đỉnh cao hàng đầu.
Nhiệm vụ của bạn là kết nối MẠCH NỐI SÁNG TÁC TOÀN DIỆN (UNIFIED MASTER CREATION PIPELINE), dung hợp toàn bộ các trục cảnh giới, tông môn, võ kỹ, thuật pháp và phù lục thành một luồng sáng tác trác tuyệt:

1. TRỤC NHÂN VẬT & CĂN CỐT:
- Nhân vật: ${charName}
- Linh Căn: ${rootName}
- Đạo Tâm & Tâm Thức: ${daoHeart} | Thần Thức: ${character?.spiritMindRealm || 'Du Thần Chi Cảnh'}
- Thiên Phú: ${character?.innateTalents?.join(', ') || 'Chí Tôn Cốt, Vô Địch Kiếm Ý'}

2. TRỤC TÔNG MÔN & THÂN PHẬN (11 CẤP BẬC):
- Tông Môn: ${sName}
- Cấp Bậc / Chức Vụ: ${sRank}
- Động phủ / Nơi cư ngụ: ${sectPosition?.residenceArea || 'Động phủ mây phủ sườn núi Thông Thiên'}
- Bổng lộc tài nguyên: ${sectPosition?.resourceMonthlyStipend || 'Linh thạch thượng phẩm và đan dược bồi bổ'}

3. TRỤC TUYẾN MẠCH CỐT LÕI (8 ĐẠI TẦNG TU CHÂN):
- Cảnh Giới Tuyến Mạch: ${spineName} [${spineRealm}]
- Rèn Luyện Thể Phách: ${spineStage?.bodyTempering?.stageTitle || 'Bách Luyện Huyết Khí'}
- Bộ Công Pháp Vận Hành: ${methodStr}

4. TRỤC TAM ĐẠO CHIẾN ĐẤU (KIẾM ĐẠO • THUẬT PHÁP • PHÙ LỤC):
- Kiếm Đạo: ${swordStr}
- Thuật Pháp Thần Thông: ${spellStr}
- Phù Lục Đạo Triện: ${talismanStr}

5. TRỤC BỐI CẢNH & XUNG ĐỘT:
- Địa điểm: ${settingStr}
- Đối thủ / Nguy cơ: ${opponentStr}
- Đại Xung Đột: ${conflictStr}
- Tiết Tấu (Pacing): ${narrativePacing || 'dramatic_climax'}
- Giọng văn (Tone): ${toneStr}
- Mục tiêu độ dài văn xuôi: ${wordTarget}

HÃY SINH DỮ LIỆU ĐỊNH DẠNG JSON DUY NHẤT (không bọc markdown backtick hay kèm bất kỳ văn bản nào ngoài JSON hợp lệ):
{
  "pipelineTitle": "Tựa đề chương hoặc phân cảnh văn học cực kỳ cuốn hút, hào hùng (dưới 20 từ)",
  "characterFullSummary": "Tóm lược cách linh căn, đạo tâm và thần thức của nhân vật phối hợp tự nhiên trong hoàn cảnh này (60-90 từ)",
  "sectStandingSummary": "Vai trò môn phái, trách nhiệm và áp lực thân phận ${sRank} của ${charName} chi phối tình thế (50-80 từ)",
  "cultivationCircuitSummary": "Mô tả trạng thái kinh mạch theo tuyến mạch ${spineName}, khí tức chuyển vận và bình cảnh (50-80 từ)",
  "martialTrinitySummary": "Phân tích chiến thuật vi diệu: Cách kết hợp Kiếm Đạo di chuyển, Thuật Pháp kết ấn và Phù Lục kích hoạt đồng thời một cách logic, không chắp vá (80-120 từ)",
  "sceneDynamics": {
    "settingAtmosphere": "Miêu tả không khí bối cảnh trời đất u ám hoặc lộng lẫy, áp lực đè nặng (50-80 từ)",
    "stakesAndMotivation": "Mục tiêu sinh tử, danh dự môn phái hoặc con đường đạo tâm của nhân vật (50-80 từ)",
    "tacticalChoreography": "Tiến trình chiến đấu 4 nhịp: 1. Khởi thế dò xét -> 2. Biến chiêu liên hoàn -> 3. Phối hợp phù kiếm thần thông -> 4. Tuyệt sát định càn khôn (100-150 từ)"
  },
  "wovenProse": "Toàn văn chương tiểu thuyết chuẩn mực văn phong tiên hiệp cổ phong (đạt độ dài khoảng ${wordTarget}). Miêu tả kỹ xảo võ thuật chuẩn xác từ bộ pháp, đường kiếm, thần niệm vẽ bùa, quyết ấn kết thành pháp quang rực rỡ, cảm giác đau đớn khi linh lực cạn kiệt, lôi đình giáng lâm và sự bùng nổ đạo tâm vô địch. Có đối thoại đanh thép, phản ứng bàng hoàng của đối thủ và kết thúc giàu dư ba.",
  "plotContinuationHooks": [
    "Hạt giống tình tiết gợi mở 1 cho chương kế tiếp",
    "Hạt giống tình tiết gợi mở 2",
    "Hạt giống tình tiết gợi mở 3"
  ],
  "chapterOutlineSuggested": [
    { "act": "Hồi 1 - Mở đầu", "description": "Tóm tắt sự kiện dẫn dắt vào trận chiến" },
    { "act": "Hồi 2 - Leo thang", "description": "Đối thủ ép bước, bộc lộ thủ đoạn hung hiểm" },
    { "act": "Hồi 3 - Cao trào Tam Đạo", "description": "Dung hợp Kiếm - Thuật - Phù xoay chuyển càn khôn" },
    { "act": "Hồi 4 - Dư ba", "description": "Kết quả trận chiến và biến số mới nảy sinh" }
  ]
}`;

    let responseText = '{}';
    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      try {
        const ai = getGenAI();
        const fallback = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = fallback.text || '{}';
      } catch (errFallback) {
        console.warn('Fallback Gemini model failed too, sending template', errFallback);
      }
    }

    const pipelineResult = JSON.parse(responseText);
    return res.json({ success: true, result: pipelineResult });
  } catch (error: any) {
    console.error('Error generating master creation pipeline:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-subplot-arc', async (req, res) => {
  try {
    const {
      plantedStageId,
      plantedStageName,
      payoffStageId,
      payoffStageName,
      coreKeywordOrItem,
      initialDeceptiveSetting,
      genre,
      protagonistName
    } = req.body;

    const pName = protagonistName || 'Nhân vật chính';
    const keyword = coreKeywordOrItem || 'Mảnh di vật tàn khuyết';
    const setting = initialDeceptiveSetting || 'Khu chợ phàm trần / Chân núi tông môn';
    const pStage = plantedStageName || 'Cấp 1: Phàm Trần Luyện Thể';
    const hStage = payoffStageName || 'Cấp 4: Luyện Hư & Hợp Thể';

    const prompt = `BẠN LÀ MỘT ĐẠI SƯ HOẠCH ĐỊNH CỐT TRUYỆN TIÊN HIỆP & HUYỀN HUYỄN KỲ CỰU (MASTER PLOT ARCHITECT).
Nhiệm vụ của bạn là thiết kế một "NHÁNH MẠCH CHUYỆN PHỤ RỜI RẠC NHƯNG LÀ GIỮ KIỆN / PHỤC BÚT CỐT LÕI" (Subplot Branch with Hidden Clue & Foreshadowing Chain) kết nối liền mạch hai tầng cảnh giới của mạch chính:

- Nhân vật chính: ${pName}
- Thể loại: ${genre || 'Tiên Hiệp Cổ Phong'}
- Từ khóa khởi nguồn / vật phẩm / manh mối: ${keyword}
- Bối cảnh xuất hiện ban đầu: ${setting}
- Tầng Khởi Phát (Gieo mầm phục bút): ${pStage} (${plantedStageId || 'spine_stage_1'})
- Tầng Bùng Nổ Nhân Quả (Thu hoạch / Giải mã đại nạn): ${hStage} (${payoffStageId || 'spine_stage_4'})

QUY TẮC NGHỆ THUẬT PHỤC BÚT CỦA TIỂU THUYẾT ĐỈNH CAO:
1. "VỎ BỌC TẦM THƯỜNG / RỜI RẠC" (Deceptive Facade): Khi mới xuất hiện ở tầng ${pStage}, độc giả và nhân vật trong truyện chỉ nghĩ đây là một sự việc vặt vãnh, một món đồ phế phẩm vô giá trị, một nhân vật qua đường điên rồ, hoặc một rắc rối nhỏ đời thường. Tuyệt đối không phô trương thần quang hay tỏ ra là bảo vật nghìn năm.
2. "MANH MỐI NGẦM CHÂN THẬT" (Hidden Clue Core): Ẩn sâu bên trong là một quy tắc thiên đạo, bí mật huyết mạch, trận nhãn phong ấn cổ đại, hoặc chìa khóa giải tử kiếp.
3. "MẮT XÍCH CỨU CÁNH MẠCH CHÍNH" (Grand Plot Catalyst): Đến tầng ${hStage}, tại sao nếu KHÔNG CÓ dữ kiện này thì mạch chính của nhân vật chính sẽ BỊ TẮC NGHẼN, chết chắc dưới thiên kiếp, hoặc không thể lý giải được bí mật của thế giới? Dữ kiện này liên kết nhân quả như thế nào?
4. ĐOẠN VĂN GIEO MẦM (Seed Excerpt): Giàu chất văn học, miêu tả chi tiết cảm giác xúc giác, mùi vị, ánh mắt gieo hạt tự nhiên.
5. ĐOẠN VĂN BÙNG NỔ THU HOẠCH (Payoff Excerpt): Hoành tráng, chấn động tâm can, khi hai đầu mối nối lại làm độc giả nổi da gà vì sự tài tình của tác giả.

TRẢ VỀ DUY NHẤT ĐỊNH DẠNG JSON HỢP LỆ (Không kèm markdown backticks):
{
  "arc": {
    "id": "subplot_${Date.now()}",
    "title": "Tên nhánh truyện phụ gợi mở và đậm chất văn học (dưới 15 từ)",
    "deceptiveFacade": "Miêu tả vỏ bọc tầm thường, vụn vặt ban đầu khiến mọi người lơ là (60-90 từ)",
    "foreshadowType": "relic_token | bloodline_debt | sect_conspiracy | anomaly_phenomenon | cipher_rhyme | forbidden_ruin | destined_npc",
    "plantedStageId": "${plantedStageId || 'spine_stage_1'}",
    "plantedStageName": "${pStage}",
    "payoffStageId": "${payoffStageId || 'spine_stage_4'}",
    "payoffStageName": "${hStage}",
    "coreClueDetail": "Bản chất thực sự giấu kín của dữ kiện này và cơ chế vận hành ngầm của nó (80-120 từ)",
    "mainPlotCatalystEffect": "Tác dụng xúc tác then chốt: Giúp nhân vật chính đột phá, lật ngược thế cờ hoặc giải mã đại kiếp ở tầng ${hStage} như thế nào (80-120 từ)",
    "associatedCharactersOrFactions": "Tên 2-3 nhân vật phụ hoặc thế lực liên đới ngầm",
    "seedScenePromptSnippet": "Đoạn văn gieo hạt mẫu (100-150 từ) sẵn sàng để tác giả chèn vào chương sơ kỳ",
    "payoffScenePromptSnippet": "Đoạn văn bùng nổ nhân quả mẫu (120-180 từ) khi tới tầng cao trào để tác giả chèn vào",
    "status": "planted"
  },
  "narrativeIntegrationTips": [
    "Mẹo 1: Cách giấu manh mối trong đối thoại tự nhiên không lộ liễu",
    "Mẹo 2: Cách nhắc lại ngắt quãng (echoing) ở các tầng giữa để độc giả không quên",
    "Mẹo 3: Điểm mấu chốt để bùng nổ nhân quả tạo cảm giác thỏa mãn tột cùng"
  ]
}`;

    let responseText = '{}';
    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = response.text || '{}';
      } catch (err: any) {
        console.error('Gemini fallback error for subplot arc:', err);
        throw err;
      }
    }

    const jsonResult = JSON.parse(responseText);
    return res.json({ success: true, result: jsonResult });
  } catch (error: any) {
    console.error('Error generating subplot arc:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/triangulate-clues', async (req, res) => {
  try {
    const { clues, mainCharacterGoal, investigationContext, discoveryStyle, protagonistName } = req.body;
    const pName = protagonistName || 'Lâm Tiêu';
    const goal = mainCharacterGoal || 'Điều tra chân tướng vụ ám sát và âm mưu cướp đoạt linh căn';
    const context = investigationContext || 'Tông môn đang chao đảo trước thềm đại điển, các thế lực ngấm ngầm liên thủ';
    const style = discoveryStyle || 'deductive_reasoning';

    const cluesText = (clues || []).map((c: any, idx: number) => `
[Mảnh Ghép ${idx + 1}]
- Nhân vật: ${c.characterName} (${c.characterRoleTag || 'Nhân vật phụ'})
- Địa điểm: ${c.locationName}
- Thời điểm: ${c.timeAnchor} (Chế độ: ${c.syncMode === 'simultaneous' ? 'ĐỒNG THỜI với Main' : 'DỊ THỜI / Quá khứ / Điềm báo'})
- Vỏ bọc bề ngoài: ${c.surfaceAppearance}
- Chân tướng ngầm: ${c.secretTruth}
- Loại manh mối: ${c.clueType}
- Vật chứng cụ thể: ${c.clueArtifactOrProof}
- Móc xích cốt truyện: ${c.linkedPlotHook}
`).join('\n');

    const prompt = `
Bạn là đại sư phụ kiến tạo cốt truyện Tiên Hiệp & Huyền Huyễn đỉnh cao (phong cách Mục Thần Ký, Quỷ Bí Chi Chủ, Nhĩ Căn, Phàm Nhân Tu Tiên).
Nhiệm vụ của bạn là: ĐỐI CHIẾU & XÂU CHUỖI CÁC MANH MỐI THỜI-KHÔNG (CHRONICLE CLUE TRIANGULATION) TỪ NHÂN VẬT PHỤ ĐỂ PHÁ ÁN / PHÁ VỠ CỤC DIỆN BÍ ẨN CHO NHÂN VẬT CHÍNH.

Thông tin bối cảnh:
- Nhân vật chính: ${pName}
- Mục tiêu điều tra của Main: ${goal}
- Hoàn cảnh môn phái / thế giới: ${context}
- Phong cách khám phá: ${style}

DANH SÁCH CÁC MANH MỐI TỪ CÁC NHÂN VẬT PHỤ (ĐỒNG THỜI VÀ DỊ THỜI):
${cluesText}

Yêu cầu:
1. Tổng hợp các mảng thông tin rời rạc này thành một bức tranh chân thực nhiều tầng nhiều lớp (Không để lộ chân tướng ngay từ đầu, mà qua sự kết nối logic giữa vật chứng, thời gian và địa điểm).
2. Làm nổi bật khoảnh khắc "Aha Moment" khi nhân vật chính ${pName} phát hiện ra điểm giao thoa giữa các manh mối.
3. Cung cấp một đoạn văn mẫu văn xuôi tiểu thuyết sống động, giàu chi tiết tu chân kỳ ảo, sắc lạnh và lôi cuốn.

Trả về kết quả ĐÚNG ĐỊNH DẠNG JSON sau:
{
  "investigationTitle": "Tiêu đề cuộc điều tra / Bức màn bí mật (ví dụ: 'Mạng Lưới Thất Diệp & Bí Mật Huyết Ma Dưới Lòng Vực')",
  "charactersInvolved": ["Tên các nhân vật phụ và chính tham gia xâu chuỗi"],
  "locationsSpan": ["Các địa danh xuất hiện trong mạng lưới manh mối"],
  "timelineReconstruction": "Tái hiện dòng thời gian liền mạch từ quá khứ dị thời đến thời điểm đồng thời hiện tại",
  "theHiddenTruth": "Chân tướng ngầm toàn cảnh được xâu chuỗi (Bí mật mà từng cá nhân không thể nhìn thấy hết)",
  "mainCharacterDiscoveryBeat": "Khoảnh khắc nhân vật chính giác ngộ, cách đối chiếu chi tiết vật chứng để suy luận ra kẻ đứng sau",
  "storyImpactAndDramaticPayoff": "Tác động chấn động tới mạch truyện chính, thay đổi cán cân quyền lực hoặc mở ra bước ngoặt mới",
  "sceneDraftPrompt": "Đoạn văn mẫu tiểu thuyết (khoảng 300-450 từ) miêu tả cảnh nhân vật chính lắp ghép các manh mối và đưa ra quyết định hành động"
}
`;

    let responseText = '{}';
    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = response.text || '{}';
      } catch (err: any) {
        console.error('Gemini fallback error for clue triangulation:', err);
        throw err;
      }
    }

    const jsonResult = JSON.parse(responseText);
    return res.json({ success: true, result: jsonResult });
  } catch (error: any) {
    console.error('Error triangulating chronicle clues:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-chronicle-clue', async (req, res) => {
  try {
    const { characterName, characterRole, locationName, syncMode, genre, protagonistName } = req.body;
    const cName = characterName || 'Lý Chưởng Quầy';
    const cRole = characterRole || 'Thương nhân / Hắc thị';
    const loc = locationName || 'Hắc Thị U Minh Cốc';
    const mode = syncMode || 'simultaneous';
    const pName = protagonistName || 'Lâm Tiêu';

    const prompt = `
Bạn là biên kịch tiểu thuyết Tiên Hiệp & Huyền Huyễn chuyên nghiệp.
Hãy thiết kế MỘT TRƯỜNG THÔNG TIN / MANH MỐI THỜI-KHÔNG (CHRONICLE CLUE) cho một nhân vật phụ:
- Tên nhân vật phụ: ${cName}
- Vai trò: ${cRole}
- Địa điểm hoạt động: ${loc}
- Chế độ thời gian: ${mode === 'simultaneous' ? 'Đồng thời (xảy ra song song cùng lúc Main đang ở nơi khác)' : 'Dị thời (xảy ra trong quá khứ / điềm báo trước)'}
- Nhân vật chính: ${pName}
- Thể loại: ${genre || 'Tiên Hiệp'}

Yêu cầu:
- Phải có sự đối lập sâu sắc giữa "Hiện tượng bề ngoài / Vỏ bọc ngụy trang" và "Chân tướng ngầm".
- Phải có "Vật chứng / Dấu tích cụ thể" có thể sờ, thấy, hoặc ghi chép được.
- Phải có móc xích logic để nhân vật chính kết nối thông tin đa chiều.

Trả về JSON:
{
  "id": "clue_${Date.now()}",
  "characterName": "${cName}",
  "characterRoleTag": "${cRole}",
  "locationName": "${loc}",
  "timeAnchor": "Mốc thời gian cụ thể (ví dụ: 'Giờ Tý đêm mưa bão trước ngày quyết chiến')",
  "syncMode": "${mode}",
  "surfaceAppearance": "Vỏ bọc bên ngoài người khác nhìn thấy",
  "secretTruth": "Hành động hoặc sự thật ngầm thực tế diễn ra sau lưng",
  "clueType": "physical_evidence hoặc intel_rumor hoặc anomaly_witness hoặc economic_fluctuation hoặc combat_residue hoặc identity_leak hoặc ancient_records",
  "clueArtifactOrProof": "Vật chứng hữu hình cụ thể lưu lại",
  "linkedPlotHook": "Cách nhân vật chính hoặc cốt truyện chính thu hoạch và kết nối mảnh ghép này",
  "triangulationPartners": ["Gợi ý tên các nhân vật/manh mối có thể liên kết"],
  "authorWritingTip": "Gợi ý thủ pháp viết văn cho tác giả"
}
`;

    let responseText = '{}';
    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = response.text || '{}';
      } catch (err: any) {
        console.error('Gemini fallback error for chronicle clue generation:', err);
        throw err;
      }
    }

    const jsonResult = JSON.parse(responseText);
    return res.json({ success: true, result: jsonResult });
  } catch (error: any) {
    console.error('Error generating chronicle clue:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/generate-micro-arc', async (req, res) => {
  try {
    const {
      protagonistName,
      category,
      scope,
      localSetting,
      immediateNeedOrTrouble,
      parentSpineStageId,
      genre
    } = req.body;

    const pName = protagonistName || 'Lâm Tiêu';
    const cat = category || 'vendetta_local';
    const sc = scope || 'single_scene';
    const setting = localSetting || 'Phường thị chân núi tông môn / Khu rừng ven suối';
    const need = immediateNeedOrTrouble || 'Bị chấp sự ngáng đường khấu trừ tài nguyên / Cần tìm dược liệu chữa thương';

    const prompt = `
Bạn là đại sư phụ cấu trúc tiểu thuyết Tiên Hiệp & Huyền Huyễn đỉnh cao.
Nhiệm vụ: Hãy sáng tạo MỘT TIỂU PHÂN NHÁNH MẠCH TRUYỆN VI MÔ (MICRO-STORY STRAND / TIỂU MẠCH TRUYỆN NHỎ HƠN MẠCH CHÍNH).
Đây là nhánh sự kiện cục bộ (diễn ra trong 1 phân cảnh hoặc 1 chương ngắn) nhưng ĐÓNG VAI TRÒ MẮT XÍCH QUAN TRỌNG giúp nhân vật chính giải quyết nhu cầu trước mắt và neo lại hệ quả/cơ duyên cho Mạch Chính lớn.

Thông tin đầu vào:
- Nhân vật chính: ${pName}
- Thể loại vi mạch: ${cat} (vendetta_local | micro_treasure | serendipitous_encounter | technique_experiment | infiltration_recon | dao_heart_tribulation | black_market_gamble | sect_daily_slice)
- Quy mô độ dài: ${sc} (single_scene: 1 cảnh | short_episode: 1 chương | mini_arc_multi: 2-3 chương)
- Địa điểm diễn ra: ${setting}
- Tình huống cục bộ / Vấn đề phát sinh: ${need}
- Giai đoạn cảnh giới mạch chính: ${parentSpineStageId || 'spine_stage_1'}
- Thể loại văn phong: ${genre || 'Tiên Hiệp Cổ Phong'}

Yêu cầu kiến trúc truyện:
1. Có "Nguyên nhân kích hoạt cục bộ" (localTrigger) và "Động cơ trước mắt" (protagonistMotivation) thực tế, hợp lý.
2. Có "Chướng ngại tức thời" (immediateObstacle) và "Cách xử lý mưu trí, sắc sảo" (tacticalResolution) của Main.
3. Có "Chiến lợi phẩm hữu hình" (tangibleReward) có thể cầm nắm hoặc ghi nhớ được.
4. Có "Điểm neo kết nối ngược về Mạch Chính" (anchorHookToMainPlot) - tạo đà cho đại kiếp hoặc ân oán lớn sau này.
5. Cung cấp 3 nhịp kịch bản (beats) chi tiết và 1 đoạn văn xuôi tiểu thuyết mẫu (readyToInsertProseSnippet) chuẩn phong cách Tiên Hiệp sắc nét.

Trả về kết quả ĐÚNG ĐỊNH DẠNG JSON sau:
{
  "strand": {
    "id": "micro_strand_${Date.now()}",
    "title": "Tên tiểu mạch truyện (hấp dẫn, gợi mở)",
    "category": "${cat}",
    "scope": "${sc}",
    "parentSpineStageId": "${parentSpineStageId || 'spine_stage_1'}",
    "localTrigger": "Cơ duyên hoặc biến cố kích hoạt cục bộ",
    "protagonistMotivation": "Nhu cầu tức thời của nhân vật chính",
    "immediateObstacle": "Kẻ ngáng đường hoặc khó khăn trước mắt",
    "tacticalResolution": "Hành động mưu mẹo, sắc bén của nhân vật chính để lật ngược tình thế",
    "tangibleReward": "Chiến lợi phẩm cụ thể thu được",
    "anchorHookToMainPlot": "Móc xích kết nối ngược về mạch chính / đại kiếp sau này",
    "associatedNpcName": "Tên nhân vật phụ đối đầu hoặc tương tác",
    "beats": [
      {
        "beatOrder": 1,
        "beatTitle": "Tên nhịp 1 (Mở đầu / Va chạm)",
        "narrativeFunction": "inciting_incident",
        "sceneSummary": "Tóm tắt tình huống",
        "sceneDraftSnippet": "Văn mẫu gợi ý nhịp 1"
      },
      {
        "beatOrder": 2,
        "beatTitle": "Tên nhịp 2 (Xung đột leo thang)",
        "narrativeFunction": "rising_friction",
        "sceneSummary": "Tóm tắt tình huống",
        "sceneDraftSnippet": "Văn mẫu gợi ý nhịp 2"
      },
      {
        "beatOrder": 3,
        "beatTitle": "Tên nhịp 3 (Giải quyết & Thu hoạch)",
        "narrativeFunction": "micro_climax",
        "sceneSummary": "Tóm tắt tình huống",
        "sceneDraftSnippet": "Văn mẫu gợi ý nhịp 3"
      }
    ],
    "readyToInsertProseSnippet": "Đoạn văn xuôi tiểu thuyết hoàn chỉnh khoảng 300-450 từ sẵn sàng để tác giả chèn vào bản thảo chương truyện"
  },
  "writingTechniqueTips": [
    "Lời khuyên thủ pháp 1 về nhịp độ nhánh nhỏ",
    "Lời khuyên thủ pháp 2 về tương phản tâm lý",
    "Lời khuyên thủ pháp 3 về điểm neo mạch chính"
  ]
}
`;

    let responseText = '{}';
    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = response.text || '{}';
      } catch (err: any) {
        console.error('Gemini fallback error for micro-arc generation:', err);
        throw err;
      }
    }

    const jsonResult = JSON.parse(responseText);
    return res.json({ success: true, result: jsonResult });
  } catch (error: any) {
    console.error('Error generating micro-arc:', error);
    return res.status(500).json({ error: error.message });
  }
});

// SIMULATE TRAJECTORY CONVERGENCE & BRANCH NEXUS
app.post('/api/gemini/simulate-trajectory-convergence', async (req, res) => {
  try {
    const {
      trajectoryName,
      branchArcs,
      nexus,
      protagonistName,
      climacticTone,
      genre
    } = req.body;

    const pName = protagonistName || 'Lâm Tiêu';
    const gStyle = genre || 'Tiên Hiệp Cổ Phong';
    const tone = climacticTone || 'Bi tráng hùng vĩ, cao trào cảm xúc bùng nổ, nghịch cảnh phản sát';

    const branchesText = (branchArcs || [])
      .map(
        (b: any, idx: number) => `
[Mạch Nhánh ${idx + 1}: ${b.title}]
- Lĩnh vực: ${b.domain || 'Phe phái / Đối đầu'}
- Bắt đầu từ cảnh giới: ${b.initiatingStageId} -> Hợp lưu tại cảnh giới: ${b.convergingStageId}
- Điểm phát sinh (Hook): ${b.narrativeHook}
- Điểm hội tụ dự kiến: ${b.convergencePointDescription}
- Chiến lợi phẩm / Cái giá: ${b.catalystRewardOrStakes}
`
      )
      .join('\n');

    const prompt = `
Bạn là đại sư phụ kiến tạo cấu trúc tiểu thuyết Tiên Hiệp & Huyền Huyễn đỉnh cao (phong cách Mục Thần Ký, Nhĩ Căn, Phàm Nhân Tu Tiên, Già Thiên, Quỷ Bí Chi Chủ).
Nhiệm vụ: HỢP LƯU CÁC MẠCH NHÁNH (BRANCH ARCS) VỀ MẠCH CHÍNH (MASTER SPINE CONVERGENCE) THEO PHƯƠNG HƯỚNG PHÁT TRIỂN ĐÃ CHỌN.

Thông tin thiết lập:
- Nhân vật chính: ${pName}
- Thể loại: ${gStyle}
- Phương hướng phát triển chủ đạo: ${trajectoryName || 'Chính Đạo Tiên Sơn • Tông Môn Khai Tổ'}
- Điểm hợp lưu trung tâm (Convergence Nexus): ${nexus?.nexusName || 'Đại Hội Thí Kiếm Bách Môn'} (Tại cảnh giới: ${nexus?.targetSpineStageTitle || 'Kim Đan Kỳ'})
- Đại biến cố thế giới tại điểm hợp lưu: ${nexus?.macroCosmicEvent || 'Ma triều bùng nổ, cửu đại tông môn nguy khốn'}
- Tông giọng cảm xúc mong muốn: ${tone}

DANH SÁCH CÁC MẠCH NHÁNH ĐƯỢC CHỌN ĐỂ HỢP LƯU VỀ MẠCH CHÍNH:
${branchesText}

YÊU CẦU ĐẦU RA:
Hãy xâu chuỗi tất cả các mạch nhánh rời rạc này thành một thể thống nhất hữu cơ, cho thấy tại sao từng nhánh phụ, từng nhân vật phụ và chiến lợi phẩm trước đó đều là mắt xích nhân quả chuẩn bị cho trận đại chiến / bước ngoặt chấn động này của Mạch Chính.

Trả về kết quả bằng JSON HỢP LỆ THEO SCHEMA SAU:
{
  "convergenceTitle": "Tên hồi / sự kiện đại hợp lưu hoành tráng",
  "trajectoryAdopted": "${trajectoryName || 'Phương hướng phát triển'}",
  "branchesIntertwined": ["Tên nhánh 1", "Tên nhánh 2"],
  "nexusStageLinked": "${nexus?.targetSpineStageTitle || 'Cảnh giới hội tụ'}",
  "grandSynthesisNarrative": "Bức tranh toàn cảnh 2-3 đoạn văn phân tích mạch nhân quả: cách các nguồn lực, tình báo, đồng minh hoặc cừu địch từ các mạch nhánh cùng lúc hội tụ tại biến cố mạch chính, xóa bỏ cảm giác phân mảnh",
  "climacticClashScene": "Mô tả phân cảnh đại chiến / đối chất cao trào nghẹt thở nơi nhân vật chính phát huy tối đa các thành quả từ mạch nhánh để lật ngược thế cờ",
  "aftermathAndSpineElevation": "Hậu quả và bước ngoặt sau trận chiến: Nhân vật chính được tôn vinh ra sao, đạo tâm thăng hoa thế nào để làm bàn đạp đột phá sang cảnh giới tiếp theo của Mạch Chính",
  "readyChapterDraftSnippet": "Trích đoạn văn xuôi tiểu thuyết hoàn chỉnh khoảng 450-650 từ, giàu hình tượng, nhịp văn dồn dập, lời thoại sắc bén, sẵn sàng 1-Click chèn vào chương truyện"
}
`;

    let responseText = '{}';
    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = response.text || '{}';
      } catch (err: any) {
        console.error('Gemini fallback error for trajectory convergence:', err);
        throw err;
      }
    }

    const jsonResult = JSON.parse(responseText);
    return res.json({ success: true, result: jsonResult });
  } catch (error: any) {
    console.error('Error simulating trajectory convergence:', error);
    return res.status(500).json({ error: error.message });
  }
});

// GENERATE CUSTOM BRANCH STORY ARC
app.post('/api/gemini/generate-branch-story-arc', async (req, res) => {
  try {
    const {
      trajectoryId,
      trajectoryName,
      domain,
      initiatingStageId,
      convergingStageId,
      narrativeHook,
      genre,
      protagonistName
    } = req.body;

    const pName = protagonistName || 'Lâm Tiêu';
    const gStyle = genre || 'Tiên Hiệp Cổ Phong';

    const prompt = `
Bạn là đại sư phụ kiến tạo cốt truyện Tiên Hiệp & Huyền Huyễn.
Nhiệm vụ: SÁNG TẠO MỘT MẠCH NHÁNH CÂU CHUYỆN (BRANCH STORY ARC) ĐỘC ĐÁO LIÊN KẾT CHẶT CHẼ VỚI MẠCH CHÍNH.

Thông tin:
- Nhân vật chính: ${pName}
- Thể loại: ${gStyle}
- Phương hướng phát triển: ${trajectoryName || 'Chính Đạo Tiên Sơn'} (${trajectoryId})
- Lĩnh vực nhánh: ${domain || 'allied_faction'}
- Cảnh giới khởi phát: ${initiatingStageId || 'spine_stage_1'}
- Cảnh giới hợp lưu về Mạch Chính: ${convergingStageId || 'spine_stage_3'}
- Ý tưởng gợi ý: ${narrativeHook || 'Khám phá bí mật cấm địa và kết giao đồng minh'}

YÊU CẦU:
Tạo ra một mạch nhánh phát triển độc lập gồm 3 hồi (giai đoạn), có điểm giao thoa rõ ràng và đâm thẳng vào mạch chính ở cảnh giới đích.

Trả về kết quả bằng JSON HỢP LỆ THEO SCHEMA SAU:
{
  "arc": {
    "id": "arc_branch_custom_${Date.now()}",
    "trajectoryId": "${trajectoryId || 'orthodox_sect'}",
    "title": "Tên mạch nhánh hấp dẫn, đậm chất Tiên Hiệp",
    "domain": "${domain || 'allied_faction'}",
    "initiatingStageId": "${initiatingStageId || 'spine_stage_1'}",
    "convergingStageId": "${convergingStageId || 'spine_stage_3'}",
    "narrativeHook": "Khởi nguyên và động cơ ban đầu dẫn tới việc rẽ nhánh",
    "progressionPhases": [
      {
        "phaseOrder": 1,
        "phaseTitle": "Tên hồi 1 (Khởi động & Va chạm)",
        "eventsSummary": "Tóm tắt các sự kiện của hồi 1"
      },
      {
        "phaseOrder": 2,
        "phaseTitle": "Tên hồi 2 (Phát triển độc lập & Tích lũy)",
        "eventsSummary": "Tóm tắt các sự kiện của hồi 2"
      },
      {
        "phaseOrder": 3,
        "phaseTitle": "Tên hồi 3 (Đột phá & Tiến sát mạch chính)",
        "eventsSummary": "Tóm tắt các sự kiện của hồi 3"
      }
    ],
    "convergencePointDescription": "Cách mạch nhánh này đâm thẳng vào đại chiến/biến cố mạch chính",
    "catalystRewardOrStakes": "Chiến lợi phẩm hoặc bài học nhân quả thu hoạch được",
    "sampleProseSnippet": "Đoạn trích tiểu thuyết khoảng 200-300 từ thể hiện khoảnh khắc mạch nhánh giao cắt với mạch chính"
  },
  "narrativeTips": [
    "Mẹo 1 để lồng ghép nhánh này mượt mà",
    "Mẹo 2 để kiểm soát nhịp độ không làm loãng cốt chính"
  ]
}
`;

    let responseText = '{}';
    try {
      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' }
      });
      responseText = response.text || '{}';
    } catch (e: any) {
      try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        });
        responseText = response.text || '{}';
      } catch (err: any) {
        console.error('Gemini fallback error for branch arc generation:', err);
        throw err;
      }
    }

    const jsonResult = JSON.parse(responseText);
    return res.json({ success: true, result: jsonResult });
  } catch (error: any) {
    console.error('Error generating branch arc:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// NEURAL NARRATIVE INFERENCE & SELF-LEARNING ENGINE
// -------------------------------------------------------------------------
app.post('/api/gemini/run-neural-inference', async (req, res) => {
  try {
    const {
      inferenceType,
      context,
      currentChapterTitle,
      protagonistName,
      unresolvedClues,
      activeWeights,
      learnedAxioms,
      learningEpoch,
      customDeductionFocus,
      genre
    } = req.body;

    const ai = getGenAI();

    const axiomsText = Array.isArray(learnedAxioms) && learnedAxioms.length > 0
      ? learnedAxioms.map((ax: any, i: number) => 
          `[QUY LUẬT ĐÃ HỌC #${i+1}] (${ax.category} - Trọng số: ${ax.weight} - Hiệu quả: ${ax.effectivenessRating}/5.0): ${ax.ruleSummary} -> Chi tiết: ${ax.detailedInsight}`
        ).join('\n')
      : 'Chưa có tiên đề tự học, sử dụng mạng nơ-ron khởi thủy.';

    const weightsText = activeWeights 
      ? `Độ chặt chẽ nhân quả: ${(activeWeights.causalityRigor * 100).toFixed(0)}%, Độ bất ngờ: ${(activeWeights.surpriseFactor * 100).toFixed(0)}%, Chiều sâu tâm lý: ${(activeWeights.emotionalDepth * 100).toFixed(0)}%, Bút lực văn phong: ${(activeWeights.proseSophistication * 100).toFixed(0)}%, Nhất quán thế giới: ${(activeWeights.worldConsistency * 100).toFixed(0)}%`
      : 'Cân bằng mặc định';

    const prompt = `Bạn là HẠT NHÂN MẠNG THẦN KINH SUY DIỄN & TỰ HỌC NÂNG CAO CHẤT LƯỢNG TIỂU THUYẾT (Neural Narrative Inference & Self-Learning Engine) ở Chu kỳ Huấn luyện (Epoch) ${learningEpoch || 1}.

NHIỆM VỤ CỦA MẠNG NƠ-RON:
Thay vì viết một cách tùy tiện hay sáo mòn, bạn phải thực hiện một quy trình Lan Truyền Xuôi (Forward Pass) gồm 3 lớp nơ-ron suy diễn:
- Lớp 1 (Sensory / Perception Layer): Nhận diện các tín hiệu ngầm, vết tích vật lý, ngôn ngữ cơ thể, tàn dư công pháp, điểm bất thường trong tình tiết.
- Lớp 2 (Hidden Causal & Motivation Layer): Phân tích động cơ ngầm, bẫy tâm lý, bàn cờ thế lực, các tính toán lợi ích sâu kín mà nhân vật giấu kín.
- Lớp 3 (Butterfly Effect & Subversion Layer): Dự phóng phản ứng dây chuyền dài hạn, nguy cơ tiềm ẩn, và tạo ra bước ngoặt chấn động hợp lý.
- Lớp Kiến Tạo Nội Dung (Output Synthesis): Phát triển dàn ý tiếp theo và tạo 1 trích đoạn văn xuôi mẫu đỉnh cao chuẩn bị đưa vào bản thảo.

ĐẶC BIỆT - ÁP DỤNG CÁC QUY LUẬT ĐÃ TỰ HỌC TỪ CÁC SUY DIỄN TRƯỚC ĐỂ NÂNG CAO CHẤT LƯỢNG NỘI DUNG:
${axiomsText}

TRỌNG SỐ NƠ-RON KÍCH HOẠT:
${weightsText}

THÔNG TIN ĐẦU VÀO TỪ BẢN THẢO:
- Thể loại: ${genre || 'Tiên Hiệp / Huyền Huyễn'}
- Chương nguồn: ${currentChapterTitle || 'Chương hiện tại'}
- Nhân vật chính: ${protagonistName || 'Nhân vật chính'}
- Manh mối chưa giải: ${Array.isArray(unresolvedClues) ? unresolvedClues.join(', ') : 'Chưa có'}
- Bối cảnh / Tình huống đầu vào: ${context}
- Phân loại suy diễn: ${inferenceType}
- Trọng tâm suy diễn tùy biến: ${customDeductionFocus || 'Suy diễn động cơ sâu kín và bước ngoặt tiếp theo'}

YÊU CẦU ĐẦU RA JSON TUÂN THỦ SCHEMA:
Trả về JSON cấu trúc gồm:
1. deductionChain: mảng 3 bước suy diễn (Lớp 1, Lớp 2, Lớp 3) với layerName, observation, inference, confidenceScore (số nguyên 80-99), activatedSynapses (mảng từ khóa).
2. coreRevelation: Chuỗi tóm tắt phát hiện suy diễn cốt lõi / Điểm bùng nổ.
3. butterflyForecast: Dự báo phản ứng dây chuyền và biến số trong tương lai.
4. narrativeExpansionOutline: Mảng 3 hồi phát triển tiếp diễn của cốt truyện.
5. synthesizedProseDraft: Đoạn văn xuôi tiểu thuyết hoàn chỉnh (khoảng 250 - 450 chữ), bút lực đỉnh cao, giàu cảm xúc và hình ảnh, áp dụng triệt để kết quả suy diễn.
6. confidenceIndex: Số nguyên (85 - 98) đánh giá độ tin cậy.
7. selfLearningInsights: Mảng 2-3 bài học quy luật mới được rút ra từ suy diễn này để nạp vào bộ nhớ tự học.
8. appliedAxiomIds: Mảng ID của các quy luật đã được áp dụng.`;

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              deductionChain: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    stepOrder: { type: Type.INTEGER },
                    layerName: { type: Type.STRING },
                    observation: { type: Type.STRING },
                    inference: { type: Type.STRING },
                    confidenceScore: { type: Type.INTEGER },
                    activatedSynapses: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    }
                  },
                  required: ['stepOrder', 'layerName', 'observation', 'inference', 'confidenceScore', 'activatedSynapses']
                }
              },
              coreRevelation: { type: Type.STRING },
              butterflyForecast: { type: Type.STRING },
              narrativeExpansionOutline: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              synthesizedProseDraft: { type: Type.STRING },
              confidenceIndex: { type: Type.INTEGER },
              selfLearningInsights: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              appliedAxiomIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: [
              'deductionChain',
              'coreRevelation',
              'butterflyForecast',
              'narrativeExpansionOutline',
              'synthesizedProseDraft',
              'confidenceIndex',
              'selfLearningInsights'
            ]
          }
        }
      });
      responseText = response.text || '{}';
    } catch (apiErr: any) {
      console.warn('Primary schema inference failed, falling back to basic prompt:', apiErr);
      const fallback = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt + '\nTrả về định dạng JSON thuần.'
      });
      responseText = fallback.text || '{}';
    }

    const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleaned);

    return res.json({
      success: true,
      result: {
        ...result,
        id: `inf_rec_${Date.now()}`,
        timestamp: new Date().toLocaleString('vi-VN'),
        epoch: learningEpoch || 1,
        sourceChapterTitle: currentChapterTitle || 'Chương Hiện Tại',
        inferenceType,
        inputContext: context,
        isReinforced: false
      }
    });
  } catch (error: any) {
    console.error('Error running neural narrative inference:', error);
    return res.status(500).json({ error: error.message });
  }
});

app.post('/api/gemini/neural-epoch-self-learn', async (req, res) => {
  try {
    const { inferenceRecords, currentAxioms, currentEpoch } = req.body;
    const ai = getGenAI();

    const historySample = (inferenceRecords || []).slice(-8).map((rec: any, idx: number) => `
Record #${idx + 1} (${rec.inferenceType}):
- Bối cảnh: ${rec.inputContext?.slice(0, 150)}...
- Suy diễn cốt lõi: ${rec.coreRevelation}
- Đánh giá của tác giả: ${rec.authorRating ? `${rec.authorRating}/5 sao - "${rec.authorCritique || ''}"` : 'Tự động kiểm định'}
- Bài học chiết xuất: ${(rec.selfLearningInsights || []).join('; ')}
`).join('\n');

    const prompt = `Bạn là BỘ TỰ HỌC & LAN TRUYỀN NGƯỢC THẦN KINH (Neural Backpropagation & Meta-Reflection Engine) trong hệ thống sáng tác văn học.

Hệ thống đang tiến hành Chu kỳ học tập Epoch ${Number(currentEpoch || 1) + 1}.
Dựa trên ${inferenceRecords?.length || 0} bản ghi suy diễn lịch sử cùng các phản hồi chất lượng từ người viết:
${historySample}

NHIỆM VỤ:
1. Rút trích 2-3 QUY LUẬT NGHỆ THUẬT SÁNG TÁC MỚI (LearnedNarrativeAxiom) chưa từng có hoặc nâng cấp từ quy luật cũ để nâng cao toàn diện chất lượng nội dung các lần sau.
2. Ước tính mức gia tăng chất lượng (Quality Boost, ví dụ +0.25 đến +0.45).
3. Viết một bản tóm tắt chu kỳ tự học (summary) nêu rõ mạng nơ-ron đã cải tiến những trọng số nào (nhân quả, tâm lý, bút lực, nhịp điệu).

Trả về JSON:
{
  "newAxioms": [
    {
      "id": "axiom_learned_...",
      "category": "CAUSALITY" | "CHARACTER_PSYCHOLOGY" | "PLOT_PACING" | "LITERARY_TONE" | "SUBVERSION",
      "ruleSummary": "Tóm tắt súc tích quy luật mới",
      "detailedInsight": "Chi tiết cách suy diễn và bằng chứng thực nghiệm",
      "weight": 1.45,
      "effectivenessRating": 4.9,
      "status": "ACTIVE",
      "timesApplied": 1,
      "learnedAtEpoch": ${Number(currentEpoch || 1) + 1}
    }
  ],
  "qualityBoost": 0.35,
  "summary": "Tóm tắt tiến trình tự học của mạng thần kinh..."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const cleaned = (response.text || '{}').replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleaned);

    return res.json({ success: true, result });
  } catch (error: any) {
    console.error('Error running neural self-learning epoch:', error);
    return res.status(500).json({ error: error.message });
  }
});

// -------------------------------------------------------------------------
// SERVER & VITE INTEGRATION
// -------------------------------------------------------------------------
const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
