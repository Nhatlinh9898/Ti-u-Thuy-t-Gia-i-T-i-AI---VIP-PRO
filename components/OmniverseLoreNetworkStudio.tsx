import React, { useState, useMemo } from 'react';
import {
  CharacterProfile,
  LoreNetworkNode,
  LoreNetworkEdge,
  StoryVignetteItem,
  NaturalStoryWeaveResult,
  LoreDomain
} from '../types';
import {
  PRESET_LORE_NODES,
  PRESET_LORE_EDGES,
  PRESET_STORY_VIGNETTES
} from '../data/presetOmniverseLoreNetwork';
import { weaveNaturalStory, generateStoryVignette } from '../services/geminiService';
import { Spinner } from './Spinner';

interface OmniverseLoreNetworkStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const OmniverseLoreNetworkStudio: React.FC<OmniverseLoreNetworkStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText
}) => {
  // Master state
  const [nodes, setNodes] = useState<LoreNetworkNode[]>(PRESET_LORE_NODES);
  const [edges, setEdges] = useState<LoreNetworkEdge[]>(PRESET_LORE_EDGES);
  const [vignettes, setVignettes] = useState<StoryVignetteItem[]>(PRESET_STORY_VIGNETTES);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'networkGraph' | 'vignetteLibrary' | 'storyWeaver' | 'causalMatrix'>('storyWeaver');

  // Filter & Search
  const [domainFilter, setDomainFilter] = useState<LoreDomain | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Nodes Basket for Natural Story Weaving
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([
    'node_char_lingxiao',
    'node_sword_nhat_diem_han_quang',
    'node_treasure_cuu_diep_thao',
    'node_vignette_tho_ren_mu'
  ]);

  // Selected Vignette for detail viewing
  const [activeVignetteId, setActiveVignetteId] = useState<string>(PRESET_STORY_VIGNETTES[0].id);

  // Story Weaving Config
  const [selectedCharId, setSelectedCharId] = useState<string>(characters[0]?.id || 'char_lingxiao');
  const [storyTone, setStoryTone] = useState<string>('Hùng tráng bi tráng, nhiệt huyết nghịch thiên, đấu trí sâu sắc');
  const [chapterSpan, setChapterSpan] = useState<string>('Phân cảnh cao trào bước ngoặt (Chương 45)');
  const [customPrompt, setCustomPrompt] = useState<string>('Mạch truyện tự nhiên, đan xen lời dặn của lão thợ rèn mù và mùi hương thảo dược trong đêm mưa.');

  // AI State
  const [isWeaving, setIsWeaving] = useState(false);
  const [weaveResult, setWeaveResult] = useState<NaturalStoryWeaveResult | null>(null);
  const [isGeneratingVignette, setIsGeneratingVignette] = useState(false);
  const [vignetteCategory, setVignetteCategory] = useState<string>('GiaiThoaiDanGian');
  const [vignetteMood, setVignetteMood] = useState<string>('U tối bí ẩn');

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => {
      const matchDomain = domainFilter === 'ALL' || n.domain === domainFilter;
      const matchSearch = searchTerm === '' ||
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchDomain && matchSearch;
    });
  }, [nodes, domainFilter, searchTerm]);

  // Basket objects
  const selectedNodes = useMemo(() => {
    return nodes.filter(n => selectedNodeIds.includes(n.id));
  }, [nodes, selectedNodeIds]);

  const activeVignette = useMemo(() => {
    return vignettes.find(v => v.id === activeVignetteId) || vignettes[0];
  }, [vignettes, activeVignetteId]);

  const toggleSelectNode = (nodeId: string) => {
    setSelectedNodeIds(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  // Trigger Natural Story Weaving
  const handleWeaveStory = async () => {
    if (selectedNodes.length === 0) {
      alert('Vui lòng chọn ít nhất 1-2 nút tri thức hoặc mẩu truyện để dệt truyện!');
      return;
    }
    setIsWeaving(true);
    try {
      const chosenChar = characters.find(c => c.id === selectedCharId) || {
        name: 'Lăng Tiêu',
        realmOrRank: 'Trúc Cơ Kỳ',
        personality: 'Trầm tĩnh kiên định',
        spiritualRoots: 'Hỗn Độn Tổ Căn',
        weaponOrAbility: 'Cổ Kiếm Tàn Nguyệt'
      } as any;

      // Extract vignettes matching selected nodes or active
      const relevantVignettes = vignettes.filter(v =>
        selectedNodeIds.includes(v.id) || selectedNodeIds.some(nid => nid.includes(v.id))
      );
      const vignettesToUse = relevantVignettes.length > 0 ? relevantVignettes : [activeVignette];

      const res = await weaveNaturalStory({
        selectedNodes,
        vignettes: vignettesToUse,
        character: chosenChar,
        storyTone,
        chapterSpan,
        customPrompt
      });
      setWeaveResult(res);
      setActiveTab('storyWeaver');
    } catch (err: any) {
      alert('Lỗi dệt truyện tự nhiên: ' + err.message);
    } finally {
      setIsWeaving(false);
    }
  };

  // Generate new vignette
  const handleCreateVignette = async () => {
    setIsGeneratingVignette(true);
    try {
      const newV = await generateStoryVignette({
        category: vignetteCategory,
        domainTags: ['Kiếm Đạo', 'Cổ Vật', 'Hiểm Địa'],
        mood: vignetteMood,
        customIdea: 'Một truyền thuyết về tàn tích thanh kiếm cắm sâu trong lòng núi lửa'
      });
      setVignettes(prev => [newV, ...prev]);
      setActiveVignetteId(newV.id);
      // Also add as a lore node
      const newNode: LoreNetworkNode = {
        id: newV.id,
        domain: 'StoryVignette',
        title: newV.title,
        subtitle: newV.category,
        tags: newV.loreTags,
        essenceDescription: newV.vignetteProse.substring(0, 100) + '...',
        stageLevel: newV.recommendedRealm,
        powerScore: 80,
        icon: '📖',
        color: '#f43f5e'
      };
      setNodes(prev => [newNode, ...prev]);
      setSelectedNodeIds(prev => [...prev, newV.id]);
    } catch (err: any) {
      alert('Lỗi tạo mẩu truyện: ' + err.message);
    } finally {
      setIsGeneratingVignette(false);
    }
  };

  const domainBadge = (d: LoreDomain) => {
    switch (d) {
      case 'CultivationSpine': return { label: 'Tuyến Mạch', color: 'bg-cyan-950 text-cyan-300 border-cyan-500/40' };
      case 'SwordDao': return { label: 'Kiếm Đạo', color: 'bg-sky-950 text-sky-300 border-sky-500/40' };
      case 'SpellDao': return { label: 'Thuật Pháp', color: 'bg-purple-950 text-purple-300 border-purple-500/40' };
      case 'TalismanDao': return { label: 'Phù Lục', color: 'bg-amber-950 text-amber-300 border-amber-500/40' };
      case 'PantheonCosmology': return { label: 'Thần Phả', color: 'bg-yellow-950 text-yellow-300 border-yellow-500/40' };
      case 'Alchemy': return { label: 'Đan Dược', color: 'bg-emerald-950 text-emerald-300 border-emerald-500/40' };
      case 'Weapons': return { label: 'Binh Khí', color: 'bg-indigo-950 text-indigo-300 border-indigo-500/40' };
      case 'Sects': return { label: 'Tông Môn', color: 'bg-blue-950 text-blue-300 border-blue-500/40' };
      case 'Nations': return { label: 'Quốc Gia', color: 'bg-orange-950 text-orange-300 border-orange-500/40' };
      case 'Characters': return { label: 'Nhân Vật', color: 'bg-violet-950 text-violet-300 border-violet-500/40' };
      case 'Realms': return { label: 'Địa Danh', color: 'bg-slate-800 text-slate-300 border-slate-600' };
      case 'StoryVignette': return { label: 'Mẩu Truyện', color: 'bg-rose-950 text-rose-300 border-rose-500/40' };
      default: return { label: d, color: 'bg-gray-800 text-gray-300 border-gray-600' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* HEADER BANNER */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-purple-950/60 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌐</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 tracking-wide">
              MẠNG LƯỚI TRI THỨC TOÀN CẢNH & BỘ DỆT TRUYỆN TỰ NHIÊN
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-vip-gold/20 text-vip-gold border border-vip-gold/40 font-mono font-bold">
              OMNIVERSE LORE WEB
            </span>
          </div>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Kết nối đa mảng (Kiếm, Pháp, Phù, Đan, Thần, Thế Lực) cùng các mẩu truyện đơn lẻ để dệt thành chương truyện liền mạch tự nhiên
          </p>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-900/90 p-1 rounded-xl border border-purple-500/30 text-xs">
          <button
            onClick={() => setActiveTab('storyWeaver')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'storyWeaver'
                ? 'bg-gradient-to-r from-vip-purple to-pink-600 text-white shadow-md shadow-purple-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>✨</span> Dệt Truyện Tự Nhiên
          </button>
          <button
            onClick={() => setActiveTab('networkGraph')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'networkGraph'
                ? 'bg-gradient-to-r from-cyan-900 to-blue-900 text-cyan-200 shadow-md shadow-cyan-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🕸️</span> Đồ Thị Mạng Lưới ({nodes.length})
          </button>
          <button
            onClick={() => setActiveTab('vignetteLibrary')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'vignetteLibrary'
                ? 'bg-gradient-to-r from-rose-900 to-red-900 text-rose-200 shadow-md shadow-rose-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>📖</span> Kho Mẩu Truyện ({vignettes.length})
          </button>
          <button
            onClick={() => setActiveTab('causalMatrix')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'causalMatrix'
                ? 'bg-gradient-to-r from-amber-900 to-yellow-900 text-amber-200 shadow-md shadow-amber-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🔗</span> Ma Trận Nhân Quả ({edges.length})
          </button>
        </div>
      </div>

      {/* SELECTED BASKET STATUS STRIP */}
      <div className="px-4 py-2 bg-gray-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-purple-400 font-bold flex items-center gap-1">
            <span>🧺</span> Giỏ Kết Nối Dệt Truyện ({selectedNodes.length} nút):
          </span>
          <div className="flex flex-wrap items-center gap-1.5 max-h-16 overflow-y-auto">
            {selectedNodes.map(n => {
              const b = domainBadge(n.domain);
              return (
                <span
                  key={n.id}
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${b.color}`}
                >
                  <span>{n.icon}</span>
                  <span className="truncate max-w-[140px]">{n.title}</span>
                  <button
                    onClick={() => toggleSelectNode(n.id)}
                    className="hover:text-red-400 font-bold ml-0.5"
                    title="Bỏ chọn"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleWeaveStory}
          disabled={isWeaving || selectedNodes.length === 0}
          className="px-4 py-1.5 bg-gradient-to-r from-vip-purple via-pink-600 to-amber-500 hover:brightness-110 disabled:opacity-50 text-white font-black text-xs rounded-lg shadow-lg flex items-center gap-1.5 transition-all"
        >
          {isWeaving ? <Spinner /> : <span>🚀</span>}
          <span>DỆT CHƯƠNG TỰ NHIÊN NGAY</span>
        </button>
      </div>

      {/* BODY CONTENT BY TAB */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* ============================================================== */}
        {/* TAB 1: NATURAL STORY WEAVER (DỆT TRUYỆN TỰ NHIÊN)             */}
        {/* ============================================================== */}
        {activeTab === 'storyWeaver' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6">
            {/* Controls Bar */}
            <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">
                  NHÂN VẬT TRỌNG TÂM
                </label>
                <select
                  value={selectedCharId}
                  onChange={e => setSelectedCharId(e.target.value)}
                  className="w-full bg-gray-950 border border-purple-500/30 rounded-lg p-2 text-xs text-vip-gold focus:ring-1 focus:ring-vip-purple outline-none"
                >
                  {characters.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.realmOrRank})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">
                  GIỌNG VĂN CHỦ ĐẠO
                </label>
                <input
                  type="text"
                  value={storyTone}
                  onChange={e => setStoryTone(e.target.value)}
                  placeholder="VD: Hùng tráng bi tráng, nhiệt huyết..."
                  className="w-full bg-gray-950 border border-purple-500/30 rounded-lg p-2 text-xs text-white focus:ring-1 focus:ring-vip-purple outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">
                  VỊ TRÍ CHƯƠNG / GIAI ĐOẠN
                </label>
                <input
                  type="text"
                  value={chapterSpan}
                  onChange={e => setChapterSpan(e.target.value)}
                  placeholder="VD: Phân cảnh cao trào Chương 45"
                  className="w-full bg-gray-950 border border-purple-500/30 rounded-lg p-2 text-xs text-white focus:ring-1 focus:ring-vip-purple outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <label className="block text-[11px] font-bold text-gray-400 mb-1">
                  CHỈ ĐẠO DỆT TRUYỆN RIÊNG CỦA TÁC GIẢ (PROMPT NARRATIVE)
                </label>
                <textarea
                  value={customPrompt}
                  onChange={e => setCustomPrompt(e.target.value)}
                  rows={2}
                  placeholder="Nhập yêu cầu để AI lồng ghép tự nhiên..."
                  className="w-full bg-gray-950 border border-purple-500/30 rounded-lg p-2 text-xs text-white focus:ring-1 focus:ring-vip-purple outline-none"
                />
              </div>
            </div>

            {/* Weaving Result Display */}
            {weaveResult ? (
              <div className="space-y-4">
                {/* Result Title & Quick Actions */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-gray-950 border border-purple-500/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-pink-400 font-bold">
                      KẾT QUẢ DỆT TRUYỆN TỰ NHIÊN ĐA MẢNG
                    </span>
                    <h3 className="text-lg md:text-xl font-black text-vip-gold">
                      {weaveResult.chapterSceneTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(weaveResult.wovenProseStory);
                        alert('Đã sao chép đoạn truyện vào Clipboard!');
                      }}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-all"
                    >
                      <span>📋</span> Sao chép
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          onInsertText(weaveResult.wovenProseStory);
                          alert('Đã chèn nội dung vào chương truyện đang viết dở!');
                        }}
                        className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 transition-all"
                      >
                        <span>📥</span> Chèn Vào Trình Viết Truyện
                      </button>
                    )}
                  </div>
                </div>

                {/* Organic Causal Chain & Pacing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Organic Causal Chain */}
                  <div className="p-4 rounded-xl bg-gray-900/60 border border-cyan-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <span>🔗</span> MẠCH LIÊN KẾT NHÂN QUẢ TỰ NHIÊN (CAUSAL CHAIN)
                    </h4>
                    <p className="text-xs text-gray-300 leading-relaxed italic bg-cyan-950/20 p-3 rounded-lg border border-cyan-500/20">
                      "{weaveResult.organicCausalChain}"
                    </p>
                    <div className="space-y-1 pt-1">
                      <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">
                        Vai trò các yếu tố được dệt:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {weaveResult.selectedNodesUsed?.map((n, i) => (
                          <div
                            key={i}
                            className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-[11px]"
                          >
                            <strong className="text-amber-300">{n.title}:</strong>{' '}
                            <span className="text-gray-300">{n.wovenRole}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Narrative Pacing Breakdown */}
                  <div className="p-4 rounded-xl bg-gray-900/60 border border-pink-500/30 space-y-2">
                    <h4 className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                      <span>⏱️</span> NHỊP ĐỘ TỰ SỰ 4 HỒI (NARRATIVE PACING)
                    </h4>
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded bg-gray-800/80 border border-white/5">
                        <span className="font-mono text-cyan-400 font-bold">1. Mở Đầu (Inciting):</span>{' '}
                        <span className="text-gray-300">{weaveResult.narrativePacing?.incitingBeat}</span>
                      </div>
                      <div className="p-2 rounded bg-gray-800/80 border border-white/5">
                        <span className="font-mono text-amber-400 font-bold">2. Biến Cố (Complication):</span>{' '}
                        <span className="text-gray-300">{weaveResult.narrativePacing?.risingComplication}</span>
                      </div>
                      <div className="p-2 rounded bg-gray-800/80 border border-white/5">
                        <span className="font-mono text-red-400 font-bold">3. Đỉnh Điểm (Climax):</span>{' '}
                        <span className="text-gray-300">{weaveResult.narrativePacing?.climaxEncounter}</span>
                      </div>
                      <div className="p-2 rounded bg-gray-800/80 border border-white/5">
                        <span className="font-mono text-purple-400 font-bold">4. Dư Ba (Aftermath):</span>{' '}
                        <span className="text-gray-300">{weaveResult.narrativePacing?.lingeringAftermath}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* The Full Story Prose Output */}
                <div className="p-5 md:p-6 rounded-xl bg-gray-950/90 border border-vip-gold/30 shadow-2xl relative">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📜</span>
                      <h4 className="font-bold text-sm text-vip-gold">
                        VĂN BẢN TIỂU THUYẾT HOÀN CHỈNH ĐƯỢC DỆT RA
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-gray-400">
                      {weaveResult.wovenProseStory.split(/\s+/).filter(Boolean).length} từ
                    </span>
                  </div>

                  <div className="prose prose-invert max-w-none text-gray-200 text-sm md:text-base leading-relaxed font-serif whitespace-pre-line space-y-3">
                    {weaveResult.wovenProseStory}
                  </div>

                  {/* Followup directions */}
                  {weaveResult.naturalFollowupPaths && weaveResult.naturalFollowupPaths.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <span className="text-xs font-mono uppercase text-vip-gold font-bold block mb-2">
                        💡 CÁC HƯỚNG PHÁT TRIỂN TỰ NHIÊN TIẾP THEO:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {weaveResult.naturalFollowupPaths.map((p, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-lg bg-gray-900 border border-purple-500/20 text-xs"
                          >
                            <strong className="text-purple-300 block mb-1">{p.directionTitle}</strong>
                            <p className="text-gray-400">{p.plotHook}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-900/30 border border-dashed border-gray-800 rounded-2xl p-6">
                <span className="text-5xl mb-3">🌀</span>
                <h3 className="text-base font-bold text-gray-300 mb-1">
                  Chưa Thực Hiện Dệt Truyện Tự Nhiên
                </h3>
                <p className="text-xs text-gray-500 max-w-md mb-4">
                  Chọn các nút trong Đồ Thị Tri Thức hoặc Kho Mẩu Truyện, cấu hình nhân vật và nhấn "Dệt Chương Tự Nhiên Ngay" để AI sáng tạo phân cảnh văn học sống động.
                </p>
                <button
                  onClick={handleWeaveStory}
                  disabled={isWeaving}
                  className="px-6 py-2.5 bg-gradient-to-r from-vip-purple to-pink-600 rounded-xl font-bold text-xs text-white shadow-lg shadow-purple-900/40 hover:scale-105 transition-all"
                >
                  🚀 Thử Nghiệm Dệt Truyện Mẫu (4 Nút Mặc Định)
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: NETWORK GRAPH / OMNIVERSE RADAR BROWSER                 */}
        {/* ============================================================== */}
        {activeTab === 'networkGraph' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left Filter & Search Pane */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-4 flex flex-col gap-3">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm kiếm đạo, phù lục, thần linh..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-3 py-2 text-xs text-white focus:ring-1 focus:ring-cyan-500 outline-none"
                />
                <span className="absolute left-2.5 top-2.5 text-xs text-gray-400">🔍</span>
              </div>

              {/* Domain Pills */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block">
                  Lọc Theo Mảng Tri Thức:
                </span>
                <div className="flex flex-wrap gap-1">
                  {(['ALL', 'CultivationSpine', 'SwordDao', 'SpellDao', 'TalismanDao', 'PantheonCosmology', 'Alchemy', 'Weapons', 'Sects', 'Nations', 'Characters', 'Realms', 'StoryVignette'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setDomainFilter(d)}
                      className={`px-2 py-1 rounded text-[10px] font-semibold transition-all ${
                        domainFilter === d
                          ? 'bg-cyan-500 text-black font-bold'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      {d === 'ALL' ? 'Tất Cả' : domainBadge(d as LoreDomain).label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Node List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                <span className="text-[10px] font-mono uppercase text-gray-500 font-bold">
                  Danh Sách Nút ({filteredNodes.length}):
                </span>
                {filteredNodes.map(node => {
                  const isSelected = selectedNodeIds.includes(node.id);
                  const badge = domainBadge(node.domain);
                  return (
                    <div
                      key={node.id}
                      onClick={() => toggleSelectNode(node.id)}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-950/60 border-vip-gold shadow-sm ring-1 ring-vip-gold/40'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">{node.icon}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-gray-200">{node.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-0.5">
                        {node.essenceDescription}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5 text-[10px] text-gray-500">
                        <span>{node.stageLevel}</span>
                        <span className={isSelected ? 'text-vip-gold font-bold' : 'text-gray-400'}>
                          {isSelected ? '✓ Đã chọn dệt' : '+ Chọn'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Details & Relationship Explorer */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10">
                <h3 className="text-sm font-bold text-cyan-300 mb-2 flex items-center gap-2">
                  <span>🕸️</span> HỆ SINH THÁI LIÊN KẾT ĐA MẢNG
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Mỗi nút tri thức trong hệ thống không tồn tại đơn lẻ, mà gắn kết chặt chẽ qua các mối quan hệ: 
                  <strong className="text-amber-300"> Kế thừa, Bổ trợ, Yêu cầu, Khắc chế, Khởi phát</strong>. Khi bạn chọn nhiều nút, AI sẽ giải mã toàn bộ mạng lưới nhân quả để tự động sản sinh ra câu chuyện hợp lý nhất.
                </p>
              </div>

              {/* Selected Nodes Visual Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-vip-gold font-bold">
                  Các Nút Đã Chọn Trong Giỏ Dệt Truyện ({selectedNodes.length}):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedNodes.map(n => {
                    const badge = domainBadge(n.domain);
                    // Find related edges
                    const connectedEdges = edges.filter(e => e.sourceId === n.id || e.targetId === n.id);
                    return (
                      <div
                        key={n.id}
                        className="p-4 rounded-xl bg-gray-900 border border-purple-500/30 space-y-2 relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{n.icon}</span>
                            <div>
                              <h5 className="font-bold text-xs text-white">{n.title}</h5>
                              <span className="text-[10px] text-gray-400">{n.subtitle}</span>
                            </div>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-mono border ${badge.color}`}>
                            {badge.label}
                          </span>
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed">
                          {n.essenceDescription}
                        </p>

                        {/* Connected lines */}
                        {connectedEdges.length > 0 && (
                          <div className="pt-2 border-t border-white/5 space-y-1">
                            <span className="text-[10px] font-mono text-gray-500 block">
                              Liên kết trực tiếp:
                            </span>
                            {connectedEdges.map(e => (
                              <div key={e.id} className="text-[11px] text-purple-300 flex items-center gap-1">
                                <span>↳</span>
                                <strong className="text-pink-400">[{e.label}]:</strong>
                                <span className="text-gray-400 truncate">{e.narrativeCausality}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: STANDALONE STORY VIGNETTES (KHO MẪU TRUYỆN ĐƠN LẺ)       */}
        {/* ============================================================== */}
        {activeTab === 'vignetteLibrary' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left Vignette List */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h3 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span>📖</span> TÀN ĐOẠN GIAI THOẠI
                </h3>
                <span className="text-[10px] font-mono text-gray-400">{vignettes.length} mẫu</span>
              </div>

              {/* Creator Box */}
              <div className="p-3 rounded-lg bg-gray-900 border border-rose-500/20 space-y-2">
                <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                  Tạo Mẩu Truyện Mới Bằng AI:
                </span>
                <select
                  value={vignetteCategory}
                  onChange={e => setVignetteCategory(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-1.5 text-[11px] text-white"
                >
                  <option value="GiaiThoaiDanGian">Lời đồn quán rượu / Dân gian</option>
                  <option value="TanDoanBiCanh">Nhật ký thám hiểm bí cảnh</option>
                  <option value="GiaoTranhBatNgo">Giao tranh bất ngờ / Phục kích</option>
                  <option value="TruyenThuyetLaoQuai">Ký ức tàn hồn lão quái</option>
                  <option value="NgoNghiengDuyenPhan">Kỳ ngộ nhặt bảo éo le</option>
                </select>
                <button
                  onClick={handleCreateVignette}
                  disabled={isGeneratingVignette}
                  className="w-full py-1.5 bg-gradient-to-r from-rose-600 to-red-600 hover:brightness-110 rounded text-xs font-bold text-white flex items-center justify-center gap-1"
                >
                  {isGeneratingVignette ? <Spinner /> : <span>✨</span>}
                  <span>Sinh Mẩu Truyện Mới</span>
                </button>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
                {vignettes.map(v => {
                  const isCurrent = activeVignetteId === v.id;
                  const isSelected = selectedNodeIds.includes(v.id);
                  return (
                    <div
                      key={v.id}
                      onClick={() => setActiveVignetteId(v.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-rose-950/60 border-rose-500 shadow-md'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-rose-300 font-bold">{v.category}</span>
                        <span className="text-[10px] text-gray-500">{v.recommendedRealm}</span>
                      </div>
                      <h4 className="font-bold text-xs text-white line-clamp-1">{v.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">
                        {v.vignetteProse}
                      </p>
                      <div className="mt-2 pt-1 border-t border-white/5 flex items-center justify-between text-[10px]">
                        <span className="text-gray-500 italic">{v.atmosphericMood}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSelectNode(v.id);
                          }}
                          className={`font-bold ${isSelected ? 'text-vip-gold' : 'text-gray-400 hover:text-white'}`}
                        >
                          {isSelected ? '✓ Đang dệt' : '+ Đưa vào giỏ dệt'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Vignette Detail Reader */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {activeVignette && (
                <div className="p-6 rounded-2xl bg-gray-950/90 border border-rose-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">
                        {activeVignette.category} • {activeVignette.recommendedRealm}
                      </span>
                      <h3 className="text-lg md:text-xl font-black text-rose-200">
                        {activeVignette.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleSelectNode(activeVignette.id)}
                      className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                        selectedNodeIds.includes(activeVignette.id)
                          ? 'bg-vip-gold text-black shadow-md shadow-amber-900/40'
                          : 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-500/40'
                      }`}
                    >
                      {selectedNodeIds.includes(activeVignette.id)
                        ? '✓ ĐÃ CHỌN DỆT VÀO TRUYỆN'
                        : '+ ĐƯA VÀO GIỎ DỆT TRUYỆN'}
                    </button>
                  </div>

                  {/* Prose Story Segment */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10">
                    <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block mb-2">
                      Đoạn Trích Văn Học Hoàn Chỉnh:
                    </span>
                    <p className="text-sm md:text-base text-gray-200 font-serif leading-relaxed whitespace-pre-line">
                      {activeVignette.vignetteProse}
                    </p>
                  </div>

                  {/* Secrets & Hook Questions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gray-900/60 border border-purple-500/20 space-y-2">
                      <h5 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <span>🌱</span> HẠT MẦM CỐT TRUYỆN CÓ THỂ PHÁT TRIỂN:
                      </h5>
                      <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                        {activeVignette.plotSeedsAndSecrets?.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-900/60 border border-pink-500/20 space-y-2">
                      <h5 className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                        <span>❓</span> CÂU HỎI MỞ KHƠI GỢI TRÍ TƯỞNG TƯỢNG:
                      </h5>
                      <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
                        {activeVignette.naturalHookQuestions?.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Author Weaving Advice */}
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1.5">
                      <span>💡</span> LỜI KHUYÊN CHO TÁC GIẢ KHI GHÉP MẪU NÀY VÀO MẠCH CHÍNH:
                    </strong>
                    <p className="text-gray-300 leading-relaxed italic">
                      "{activeVignette.authorWeavingTips}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: CAUSAL RELATIONSHIP MATRIX (MA TRẬN NHÂN QUẢ)           */}
        {/* ============================================================== */}
        {activeTab === 'causalMatrix' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-4 rounded-xl bg-gray-900/80 border border-amber-500/30 space-y-1">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <span>🔗</span> MA TRẬN NHÂN QUẢ VÀ LIÊN KẾT TƯƠNG TÁC ĐA MẢNG
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Các mối nối nhân quả giúp việc phát triển cốt truyện diễn ra tự nhiên như nước chảy thành sông, tránh cảm giác nhét tài nguyên bừa bãi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {edges.map(e => {
                const srcNode = nodes.find(n => n.id === e.sourceId);
                const tgtNode = nodes.find(n => n.id === e.targetId);
                return (
                  <div
                    key={e.id}
                    className="p-4 rounded-xl bg-gray-900/70 border border-gray-800 hover:border-amber-500/40 space-y-2 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-amber-300">
                        <span>{srcNode?.icon || '•'}</span>
                        <span>{srcNode?.title || e.sourceId}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                        {e.label}
                      </span>
                      <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                        <span>{tgtNode?.icon || '•'}</span>
                        <span>{tgtNode?.title || e.targetId}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed italic bg-black/40 p-2.5 rounded-lg border border-white/5">
                      "{e.narrativeCausality}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
