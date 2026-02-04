import React, { useState } from 'react';
import { NovelConfig, NovelNode, NodeType } from './types';
import { generateStructure, generateContent, generateSummary, generateEnding, generateIntroOptions } from './services/geminiService';
import { TreeRenderer } from './components/TreeRenderer';
import { VoiceStudio } from './components/VoiceStudio';
import { Spinner } from './components/Spinner';

export default function App() {
  const [config, setConfig] = useState<NovelConfig>({
    genre: 'Tiên Hiệp',
    tone: 'Hùng tráng',
    pov: 'Ngôi thứ ba (Toàn tri)',
    setting: 'Thế giới tu tiên giả tưởng',
    mainCharacter: '',
    plotIdea: '',
  });

  const [treeData, setTreeData] = useState<NovelNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<NovelNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatedOptions, setGeneratedOptions] = useState<string[]>([]);
  
  // Helpers to update tree recursively
  const updateNodeInTree = (root: NovelNode, targetId: string, updater: (n: NovelNode) => NovelNode): NovelNode => {
    if (root.id === targetId) return updater(root);
    return {
      ...root,
      children: root.children.map(c => updateNodeInTree(c, targetId, updater))
    };
  };

  const handleGenerateStructure = async () => {
    if (!config.plotIdea) {
      alert("Vui lòng nhập ý tưởng cốt lõi!");
      return;
    }
    setLoading(true);
    try {
      const root = await generateStructure(config);
      setTreeData(root);
      setSelectedNode(root);
    } catch (e) {
      alert("Lỗi khi tạo cấu trúc: " + e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!selectedNode || !treeData) return;
    setLoading(true);
    try {
      const content = await generateContent(selectedNode, config.plotIdea); // Simplify context for demo
      const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({ ...n, content: (n.content || "") + "\n" + content }));
      setTreeData(updatedTree);
      setSelectedNode({ ...selectedNode, content: (selectedNode.content || "") + "\n" + content });
    } catch (e) {
      alert("Lỗi sinh nội dung: " + e);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
     if (!selectedNode?.content || !treeData) return;
     setLoading(true);
     try {
       const summary = await generateSummary(selectedNode.content);
       const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({ ...n, summary }));
       setTreeData(updatedTree);
       setSelectedNode({ ...selectedNode, summary });
     } catch(e) {
        alert("Lỗi tóm tắt: " + e);
     } finally {
        setLoading(false);
     }
  };

  const handleEnding = async () => {
      if (!selectedNode || !treeData) return;
      setLoading(true);
      try {
        const { ending, transition } = await generateEnding(selectedNode);
        const textToAdd = `\n\n--- KẾT THÚC ---\n${ending}\n\n>>> DẪN CHUYỆN: ${transition}`;
        const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({ ...n, content: (n.content || "") + textToAdd }));
        setTreeData(updatedTree);
        setSelectedNode({ ...selectedNode, content: (selectedNode.content || "") + textToAdd });
      } catch(e) {
         alert("Lỗi tạo kết thúc: " + e);
      } finally {
         setLoading(false);
      }
  };

  const handleIntro = async () => {
      setLoading(true);
      try {
          const opts = await generateIntroOptions(config.tone);
          setGeneratedOptions(opts);
      } catch (e) {
          alert("Lỗi tạo dẫn nhập: " + e);
      } finally {
          setLoading(false);
      }
  }

  const applyOption = (opt: string) => {
      if (!selectedNode || !treeData) return;
      const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({ ...n, content: (n.content || "") + "\n" + opt }));
      setTreeData(updatedTree);
      setSelectedNode({ ...selectedNode, content: (selectedNode.content || "") + "\n" + opt });
      setGeneratedOptions([]);
  }

  const toggleNode = (id: string) => {
    if (!treeData) return;
    setTreeData(updateNodeInTree(treeData, id, (n) => ({ ...n, isExpanded: !n.isExpanded })));
  };

  const exportToTxt = () => {
      if (!selectedNode) return;
      const element = document.createElement("a");
      const file = new Blob([selectedNode.content || ""], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${selectedNode.title}.txt`;
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      {/* --- HEADER VIP PRO --- */}
      <header className="bg-gradient-to-r from-gray-900 via-vip-purple/20 to-gray-900 border-b border-white/10 p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-vip-gold via-white to-gray-300 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] mb-2 relative z-10">
          SIÊU APP VIP PRO
        </h1>
        <p className="text-vip-accent/80 text-sm uppercase tracking-[0.3em] font-semibold relative z-10">
          HỆ THỐNG KIẾN TẠO TIỂU THUYẾT AI ĐỈNH CAO
        </p>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR - SETTINGS & TREE */}
        <div className="w-80 md:w-96 border-r border-white/10 flex flex-col bg-gray-900/50 backdrop-blur-md">
          {!treeData ? (
             <div className="p-6 overflow-y-auto custom-scrollbar h-full">
               <h2 className="text-xl font-bold text-vip-gold mb-6 border-b border-vip-gold/30 pb-2">THIẾT LẬP DỰ ÁN</h2>
               
               <div className="space-y-5">
                 {/* Field 1: Genre */}
                 <div className="group">
                   <label className="block text-xs font-semibold text-gray-400 mb-1 group-hover:text-vip-accent transition-colors">THỂ LOẠI (GENRE)</label>
                   <select 
                     className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-vip-purple outline-none transition-all"
                     value={config.genre} onChange={e => setConfig({...config, genre: e.target.value})}
                   >
                     {['Tiên Hiệp', 'Kiếm Hiệp', 'Ngôn Tình', 'Trinh Thám', 'Khoa Học Viễn Tưởng', 'Kinh Dị', 'Lịch Sử', 'Huyền Huyễn', 'Đô Thị'].map(o => <option key={o} value={o}>{o}</option>)}
                   </select>
                 </div>

                 {/* Field 2: Tone */}
                 <div className="group">
                    <label className="block text-xs font-semibold text-gray-400 mb-1 group-hover:text-vip-accent transition-colors">GIỌNG VĂN (TONE)</label>
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-vip-purple outline-none transition-all"
                      value={config.tone} onChange={e => setConfig({...config, tone: e.target.value})}
                    >
                      {['Hùng tráng', 'Bi ai', 'Hài hước', 'Châm biếm', 'Nhẹ nhàng', 'Kịch tính', 'Lạnh lùng'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                 </div>

                 {/* Field 3: POV */}
                 <div className="group">
                    <label className="block text-xs font-semibold text-gray-400 mb-1 group-hover:text-vip-accent transition-colors">GÓC NHÌN (POV)</label>
                    <select 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-vip-purple outline-none transition-all"
                      value={config.pov} onChange={e => setConfig({...config, pov: e.target.value})}
                    >
                      {['Ngôi thứ nhất (Tôi)', 'Ngôi thứ ba (Toàn tri)', 'Ngôi thứ ba (Khách quan)'].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                 </div>
                 
                 {/* Field 4: Main Char */}
                 <div className="group">
                    <label className="block text-xs font-semibold text-gray-400 mb-1 group-hover:text-vip-accent transition-colors">NHÂN VẬT CHÍNH</label>
                    <input 
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-vip-purple outline-none transition-all"
                      placeholder="Tên, tuổi, tính cách..."
                      value={config.mainCharacter} onChange={e => setConfig({...config, mainCharacter: e.target.value})}
                    />
                 </div>

                 {/* Field 5: Plot */}
                 <div className="group">
                    <label className="block text-xs font-semibold text-gray-400 mb-1 group-hover:text-vip-accent transition-colors">Ý TƯỞNG CỐT LÕI (CORE IDEA)</label>
                    <textarea 
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-vip-purple outline-none transition-all h-32"
                      placeholder="Mô tả tóm tắt nội dung bạn muốn xây dựng..."
                      value={config.plotIdea} onChange={e => setConfig({...config, plotIdea: e.target.value})}
                    ></textarea>
                 </div>

                 <button 
                    onClick={handleGenerateStructure}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-vip-purple to-pink-600 rounded-xl font-bold text-white shadow-lg shadow-purple-900/50 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                 >
                   {loading ? <Spinner /> : '🚀 KHỞI TẠO CẤU TRÚC SIÊU CẤP'}
                 </button>
               </div>
             </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gray-800/30">
                <h3 className="font-bold text-vip-gold">SƠ ĐỒ CẤU TRÚC</h3>
                <button onClick={() => setTreeData(null)} className="text-xs text-gray-400 hover:text-white underline">Làm lại</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <TreeRenderer 
                  node={treeData} 
                  selectedId={selectedNode?.id || null} 
                  onSelect={setSelectedNode} 
                  onToggle={toggleNode} 
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT AREA - WORKSPACE */}
        <div className="flex-1 flex flex-col bg-[#0b0f19] relative">
          {/* Workspace Background Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-vip-purple/10 via-transparent to-transparent pointer-events-none"></div>

          {selectedNode ? (
            <div className="flex-1 flex flex-col p-6 overflow-hidden relative z-10">
              {/* Toolbar */}
              <div className="flex flex-wrap gap-2 mb-4">
                 <div className="px-3 py-1 bg-vip-gold/10 border border-vip-gold/30 rounded text-vip-gold text-xs font-mono">
                    {selectedNode.type.toUpperCase()}
                 </div>
                 <h2 className="text-xl font-bold text-white truncate flex-1">{selectedNode.title}</h2>
                 <button onClick={exportToTxt} className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded border border-gray-600">
                    Xuất File .TXT
                 </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button 
                  onClick={handleGenerateContent} disabled={loading}
                  className="flex items-center gap-2 px-4 py-2 bg-vip-purple hover:bg-purple-700 rounded-lg font-semibold text-sm transition-all shadow-lg shadow-purple-900/30"
                >
                   {loading ? <Spinner /> : '✍️ VIẾT TIẾP NỘI DUNG'}
                </button>
                <button 
                  onClick={handleSummarize} disabled={loading}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm transition-all"
                >
                   📘 TÓM TẮT
                </button>
                 <button 
                  onClick={handleIntro} disabled={loading}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm transition-all"
                >
                   🗣️ DẪN NHẬP MẪU
                </button>
                <button 
                  onClick={handleEnding} disabled={loading}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm transition-all"
                >
                   🔚 KẾT THÚC & NỐI MẠCH
                </button>
              </div>

              {/* Options Selection Area */}
              {generatedOptions.length > 0 && (
                  <div className="mb-4 p-4 bg-gray-800/80 rounded-xl border border-vip-accent/30 animate-fade-in">
                      <h4 className="text-vip-accent font-bold mb-3 text-sm">CHỌN PHƯƠNG ÁN DẪN NHẬP:</h4>
                      <div className="space-y-2">
                          {generatedOptions.map((opt, idx) => (
                              <div key={idx} onClick={() => applyOption(opt)} className="p-3 bg-gray-900 hover:bg-gray-700 cursor-pointer rounded border border-gray-700 hover:border-vip-gold transition-all text-sm">
                                  {opt}
                              </div>
                          ))}
                      </div>
                  </div>
              )}

              {/* Editor Area */}
              <div className="flex-1 flex flex-col gap-4 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                    {/* Main Content */}
                    <div className="md:col-span-2 flex flex-col">
                        <textarea 
                            className="flex-1 w-full bg-gray-900/80 border border-gray-700 rounded-xl p-4 text-gray-200 leading-relaxed resize-none focus:ring-1 focus:ring-vip-purple outline-none custom-scrollbar font-serif text-lg"
                            placeholder="Nội dung sẽ xuất hiện tại đây..."
                            value={selectedNode.content || ""}
                            onChange={(e) => {
                                if (treeData) {
                                    const updated = updateNodeInTree(treeData, selectedNode.id, n => ({...n, content: e.target.value}));
                                    setTreeData(updated);
                                    setSelectedNode({...selectedNode, content: e.target.value});
                                }
                            }}
                        />
                    </div>
                    {/* Summary & Meta */}
                    <div className="md:col-span-1 flex flex-col gap-4">
                        <div className="bg-gray-800/40 rounded-xl p-4 border border-white/5 flex-1 overflow-y-auto">
                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">TÓM TẮT NODE</h4>
                            <p className="text-sm text-gray-300 italic">{selectedNode.summary || "Chưa có tóm tắt. Nhấn 'Tóm tắt' để tạo."}</p>
                        </div>
                        {/* VOICE STUDIO INTEGRATION */}
                        <VoiceStudio text={selectedNode.content || ""} />
                    </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 opacity-50">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
               </svg>
               <p className="font-light text-lg">Chọn một node hoặc khởi tạo cấu trúc để bắt đầu sáng tác</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
