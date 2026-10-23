import React, { useState } from 'react';
import {
  CitadelItem,
  CitadelTier,
  CitadelCategory,
  CitadelEventSimulationResult,
  CharacterProfile,
} from '../types';
import { PRESET_CITADELS } from '../data/presetCitadels';
import { generateCitadel, simulateCitadelEvent } from '../services/geminiService';

interface CitadelStudioProps {
  genre?: string;
  characters?: CharacterProfile[];
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
  onInsertText?: (text: string) => void;
}

const TIER_BADGES: Record<string, { bg: string; text: string; border: string }> = {
  'Phàm Trần Hùng Thành (Cấp 1 - Phàm nhân / Hoàng triều đế chế)': {
    bg: 'bg-amber-950/60',
    text: 'text-amber-300',
    border: 'border-amber-700/60',
  },
  'Hạ Phẩm Tiên Thành & Tán Tu Phường Thị (Cấp 2 - Luyện Khí / Trúc Cơ)': {
    bg: 'bg-emerald-950/60',
    text: 'text-emerald-300',
    border: 'border-emerald-700/60',
  },
  'Trung Phẩm Cổ Thành & Châu Phủ Đô Hội (Cấp 3 - Kim Đan Kỳ)': {
    bg: 'bg-blue-950/60',
    text: 'text-blue-300',
    border: 'border-blue-700/60',
  },
  'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4 - Nguyên Anh / Hóa Thần)': {
    bg: 'bg-purple-950/60',
    text: 'text-purple-300',
    border: 'border-purple-700/60',
  },
  'Cực Phẩm Phù Không Thành & Trấn Giới Cổ Quan (Cấp 5 - Luyện Hư / Hợp Thể)': {
    bg: 'bg-cyan-950/60',
    text: 'text-cyan-300',
    border: 'border-cyan-700/60',
  },
  'Thần Thoại Tiên Đô & Thái Cổ Thiên Thành (Cấp 6 - Đại Thừa / Chân Tiên)': {
    bg: 'bg-yellow-950/60',
    text: 'text-yellow-300',
    border: 'border-yellow-500/80',
  },
};

const CATEGORIES: CitadelCategory[] = [
  'Đấu Giá & Mậu Dịch Đô Hội',
  'Biên Giới Trấn Quan & Pháo Đài Chiến Tranh',
  'Lăng Không Phù Không Tiên Đô',
  'Hoàng Triều Đế Đô Khí Vận',
  'Tán Tu Thánh Địa Tự Do',
  'Hải Để Tiên Thành',
  'Hắc Thị & Ma Đạo Ẩn Thành',
  'Thái Cổ Thiên Đình Tiên Cung',
];

const TIERS: CitadelTier[] = [
  'Phàm Trần Hùng Thành (Cấp 1 - Phàm nhân / Hoàng triều đế chế)',
  'Hạ Phẩm Tiên Thành & Tán Tu Phường Thị (Cấp 2 - Luyện Khí / Trúc Cơ)',
  'Trung Phẩm Cổ Thành & Châu Phủ Đô Hội (Cấp 3 - Kim Đan Kỳ)',
  'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4 - Nguyên Anh / Hóa Thần)',
  'Cực Phẩm Phù Không Thành & Trấn Giới Cổ Quan (Cấp 5 - Luyện Hư / Hợp Thể)',
  'Thần Thoại Tiên Đô & Thái Cổ Thiên Thành (Cấp 6 - Đại Thừa / Chân Tiên)',
];

const EVENT_TYPES = [
  { id: 'beast_siege', name: '🐺 Thú Triều Vạn Cổ Công Thành', desc: 'Thú triều biển người bao vây bốn cổng, đại pháo và hộ thành trận gầm rú nghênh địch' },
  { id: 'auction_chaos', name: '💎 Đại Đấu Giá Hội Đoạt Bảo & Hỗn Chiến', desc: 'Chí bảo xuất thế chấn động vạn tộc, các đại năng bí mật ám sát, cướp đoạt hỗn loạn' },
  { id: 'demonic_night_raid', name: '⚔️ Ma Đạo Dạ Tập Phá Trận', desc: 'Đêm đen gió lớn, tà tu nội gián huyết tế phá trận pháp, thành trì đối mặt nguy cơ thất thủ' },
  { id: 'coup_usurpation', name: '👑 Thế Lực Soán Ngôi & Tranh Đoạt Quyền Thành Chủ', desc: 'Phản đồ mưu sát Thành Chủ, các đại thế lực trong thành chia bè phái huyết chiến đoạt ấn' },
  { id: 'ancient_plague', name: '☠️ Cổ Trùng Tà Độc Lan Tràn Toàn Thành', desc: 'Tà độc ăn mòn kinh mạch bùng phát, tu sĩ hóa cuồng, nguy cơ toàn thành bị phong tỏa thanh tẩy' }
];

export const CitadelStudio: React.FC<CitadelStudioProps> = ({
  genre = 'Tiên Hiệp',
  characters = [],
  onInsertText,
}) => {
  const [citadels, setCitadels] = useState<CitadelItem[]>(PRESET_CITADELS);
  const [selectedCitadel, setSelectedCitadel] = useState<CitadelItem>(PRESET_CITADELS[0]);
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'simulator' | 'creator'>('encyclopedia');

  // Filters
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Simulator state
  const [simCharacter, setSimCharacter] = useState<string>(characters[0]?.name || 'Tiêu Diệp');
  const [simCharRealm, setSimCharRealm] = useState<string>(characters[0]?.realm || 'Kim Đan Sơ Kỳ');
  const [simEventType, setSimEventType] = useState<string>(EVENT_TYPES[0].name);
  const [simGoal, setSimGoal] = useState<string>('Chém giết thống lĩnh địch quân, bảo vệ trận cơ, đoạt thú đan cực phẩm');
  const [simCustomDetails, setSimCustomDetails] = useState<string>('Sát khí ngút trời, nghẹt thở');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<CitadelEventSimulationResult | null>(null);

  // Creator state
  const [creatorName, setCreatorName] = useState<string>('');
  const [creatorTier, setCreatorTier] = useState<CitadelTier>(TIERS[3]);
  const [creatorCategory, setCreatorCategory] = useState<CitadelCategory>(CATEGORIES[0]);
  const [creatorCustomIdea, setCreatorCustomIdea] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Filter citadels
  const filteredCitadels = citadels.filter((c) => {
    if (filterTier !== 'all' && c.tier !== filterTier) return false;
    if (filterCategory !== 'all' && c.category !== filterCategory) return false;
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      return (
        c.name.toLowerCase().includes(kw) ||
        c.locationRegion.toLowerCase().includes(kw) ||
        c.defensiveArray.name.toLowerCase().includes(kw) ||
        c.rulingFaction.name.toLowerCase().includes(kw)
      );
    }
    return true;
  });

  // Handle Event Simulation
  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const selectedCharObj = characters.find((c) => c.name === simCharacter);
      const res = await simulateCitadelEvent({
        citadel: selectedCitadel,
        character: selectedCharObj || { name: simCharacter, realm: simCharRealm, element: 'Hỗn Độn' },
        eventType: simEventType,
        goal: simGoal,
        customDetails: simCustomDetails,
      });
      setSimResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  // Handle Create Citadel
  const handleCreateCitadel = async () => {
    setIsGenerating(true);
    try {
      const newCitadel = await generateCitadel({
        name: creatorName,
        tier: creatorTier,
        category: creatorCategory,
        customIdea: creatorCustomIdea,
        genre,
      });
      setCitadels((prev) => [newCitadel, ...prev]);
      setSelectedCitadel(newCitadel);
      setActiveTab('encyclopedia');
      setCreatorName('');
      setCreatorCustomIdea('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  // Insert into editor
  const handleInsertCitadelLore = (c: CitadelItem) => {
    if (!onInsertText) return;
    const text = `
=== THÔNG TIN THÀNH TRÌ: ${c.name} ===
• Phẩm Giai: ${c.tier}
• Loại Hình: ${c.category}
• Vị Trí: ${c.locationRegion} | Dân Số: ${c.population}
• Hộ Thành Đại Trận: ${c.defensiveArray.name} (${c.defensiveArray.tier})
  - Đặc tính: ${c.defensiveArray.features}
  - Tiêu hao: ${c.defensiveArray.maintenanceCost}
• Lãnh Tụ & Thế Lực: ${c.rulingFaction.leaderName} (${c.rulingFaction.realmLevel}) - ${c.rulingFaction.name}
  - Lập trường: ${c.rulingFaction.stance}
• Phí Nhập Thành & Thuế: ${c.entryFeeAndTaxes}
• Phân Khu Trọng Điểm:
${c.keyDistricts.map((d) => `  + ${d.name} (${d.type}): ${d.description}`).join('\n')}
• Thiết Luật Cấm Kỵ:
${c.lawsAndTaboos.map((l) => `  - ${l}`).join('\n')}
• Tài Nguyên & Đặc Sản: ${c.specialResources.join(', ')}
• Miêu Tả: ${c.description}
• Lịch Sử Viễn Cổ: ${c.historyAndLegends}
===================================================
`;
    onInsertText(text.trim());
  };

  const handleInsertSimulationStory = () => {
    if (!onInsertText || !simResult) return;
    const text = `
=== ĐẠI BIẾN CỐ CHIẾN SỰ: ${simResult.citadelName} ===
[Biến cố: ${simResult.eventType} | Nhân vật chính: ${simResult.characterName}]

${simResult.chapterStorySegment}

--- Phục Bút & Manh Mối Tiếp Theo ---
${simResult.authorPlotHooks}
====================================================
`;
    onInsertText(text.trim());
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-200 font-sans border-l border-amber-900/40">
      {/* Top Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-950/80 via-yellow-950/60 to-gray-950 border-b border-amber-800/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏯</span>
            <div>
              <h2 className="text-base font-black text-amber-300 tracking-wide uppercase flex items-center gap-2">
                Thành Trì • Tiên Đô • Phù Không Cổ Quan
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/50 px-2 py-0.5 rounded-full font-bold">
                  {citadels.length} Đô Thị
                </span>
              </h2>
              <p className="text-xs text-amber-400/70">
                Thế giới quan 6 Cấp Phẩm, 8 Loại Hình, Hộ Thành Thần Trận & Mô Phỏng Chiến Sự Đỉnh Cao
              </p>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setActiveTab('encyclopedia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'encyclopedia'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/50'
                : 'bg-gray-900/80 text-gray-400 hover:text-amber-200 border border-gray-800'
            }`}
          >
            <span>📜</span> Bách Khoa Thành Trì
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950/60'
                : 'bg-gray-900/80 text-gray-400 hover:text-red-300 border border-gray-800'
            }`}
          >
            <span>⚔️</span> Mô Phỏng Chiến Sự
          </button>
          <button
            onClick={() => setActiveTab('creator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'creator'
                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white shadow-lg shadow-yellow-950/60'
                : 'bg-gray-900/80 text-gray-400 hover:text-yellow-300 border border-gray-800'
            }`}
          >
            <span>✨</span> Sáng Tạo Bằng AI
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* ================= TAB 1: ENCYCLOPEDIA ================= */}
        {activeTab === 'encyclopedia' && (
          <>
            {/* Sidebar List */}
            <div className="w-full md:w-80 border-r border-gray-800 bg-gray-950/90 flex flex-col h-full overflow-hidden">
              {/* Search & Filter */}
              <div className="p-3 border-b border-gray-800 space-y-2 bg-gray-900/50">
                <input
                  type="text"
                  placeholder="🔍 Tìm tên thành, lãnh tụ, trận pháp..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-amber-200 placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={filterTier}
                    onChange={(e) => setFilterTier(e.target.value)}
                    className="bg-gray-950 border border-gray-800 rounded px-2 py-1 text-[11px] text-gray-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Tất cả phẩm giai</option>
                    {TIERS.map((t, idx) => (
                      <option key={idx} value={t}>
                        Cấp {idx + 1} - {t.split('(')[0]}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-gray-950 border border-gray-800 rounded px-2 py-1 text-[11px] text-gray-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Tất cả thể loại</option>
                    {CATEGORIES.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Citadels list items */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
                {filteredCitadels.map((c) => {
                  const isSelected = selectedCitadel.id === c.id;
                  const badge = TIER_BADGES[c.tier] || {
                    bg: 'bg-gray-800',
                    text: 'text-gray-300',
                    border: 'border-gray-700',
                  };
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCitadel(c)}
                      className={`p-3 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500/80 shadow-md shadow-amber-950/40'
                          : 'bg-gray-900/60 border-gray-800/80 hover:border-gray-700 hover:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-black text-amber-200 line-clamp-1">
                          {c.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold ${badge.bg} ${badge.text} ${badge.border}`}
                        >
                          {c.tier.split('(')[0].trim()}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                          {c.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                        📍 {c.locationRegion}
                      </p>
                    </div>
                  );
                })}
                {filteredCitadels.length === 0 && (
                  <div className="p-6 text-center text-xs text-gray-500">
                    Không tìm thấy thành trì phù hợp
                  </div>
                )}
              </div>
            </div>

            {/* Main Detail View */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar bg-gray-950">
              {/* Header Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-gray-900 to-gray-950 border border-amber-600/40 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
                  <div>
                    <span className="text-xs font-black text-amber-400 tracking-wider uppercase bg-amber-950/80 px-2.5 py-1 rounded border border-amber-700/60">
                      {selectedCitadel.tier}
                    </span>
                    <h1 className="text-lg md:text-xl font-black text-amber-200 mt-2 flex items-center gap-2">
                      <span>🏯</span> {selectedCitadel.name}
                    </h1>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-3">
                      <span>📍 <b>Vị trí:</b> {selectedCitadel.locationRegion}</span>
                      <span>👥 <b>Dân số:</b> {selectedCitadel.population}</span>
                      <span>🏷️ <b>Thể loại:</b> {selectedCitadel.category}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInsertCitadelLore(selectedCitadel)}
                      className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
                    >
                      <span>📥</span> Chèn Vào Bản Thảo
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('simulator');
                      }}
                      className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-amber-700 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
                    >
                      <span>⚔️</span> Mô Phỏng Chiến Sự
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-300 mt-4 leading-relaxed border-t border-gray-800/80 pt-3">
                  {selectedCitadel.description}
                </p>
              </div>

              {/* Grid 2 Columns: Hộ Thành Đại Trận & Thế Lực Thống Trị */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hộ Thành Đại Trận */}
                <div className="p-4 rounded-xl bg-gray-900/70 border border-blue-900/40 relative">
                  <div className="flex items-center gap-2 mb-2 text-blue-300 font-black text-xs uppercase tracking-wide">
                    <span>🛡️</span> Hộ Thành Đại Trận
                    <span className="ml-auto text-[10px] bg-blue-950 text-blue-300 border border-blue-700 px-2 py-0.5 rounded font-mono">
                      {selectedCitadel.defensiveArray.tier}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-blue-200">
                    {selectedCitadel.defensiveArray.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                    <b>Cơ chế phòng thủ:</b> {selectedCitadel.defensiveArray.features}
                  </p>
                  <p className="text-xs text-amber-300/90 mt-2 font-mono">
                    ⚡ <b>Tiêu hao bảo dưỡng:</b> {selectedCitadel.defensiveArray.maintenanceCost}
                  </p>
                </div>

                {/* Thành Chủ & Thế Lực */}
                <div className="p-4 rounded-xl bg-gray-900/70 border border-purple-900/40 relative">
                  <div className="flex items-center gap-2 mb-2 text-purple-300 font-black text-xs uppercase tracking-wide">
                    <span>👑</span> Thành Chủ & Thế Lực Thống Trị
                  </div>
                  <h3 className="text-sm font-black text-purple-200">
                    {selectedCitadel.rulingFaction.leaderName}{' '}
                    <span className="text-xs text-amber-300 font-mono font-normal">
                      ({selectedCitadel.rulingFaction.realmLevel})
                    </span>
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    🏛️ <b>Thế lực:</b> {selectedCitadel.rulingFaction.name}
                  </p>
                  <p className="text-xs text-purple-300 mt-2">
                    ⚖️ <b>Lập trường cai trị:</b> {selectedCitadel.rulingFaction.stance}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 font-mono">
                    💰 <b>Phí & Thuế:</b> {selectedCitadel.entryFeeAndTaxes}
                  </p>
                </div>
              </div>

              {/* Phân Khu Trọng Điểm */}
              <div className="p-4 rounded-xl bg-gray-900/70 border border-gray-800">
                <h3 className="text-xs font-black text-amber-300 uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <span>🏛️</span> Các Phân Khu Trọng Điểm Trong Thành
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCitadel.keyDistricts.map((d, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-gray-950/80 border border-gray-800/80 hover:border-amber-700/50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-xs font-bold text-amber-200">{d.name}</h4>
                        <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">
                          {d.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{d.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thiết Luật & Tài Nguyên Đặc Sản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Thiết Luật */}
                <div className="p-4 rounded-xl bg-gray-900/70 border border-red-900/30">
                  <h3 className="text-xs font-black text-red-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>📜</span> Thiết Luật & Cấm Kỵ
                  </h3>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {selectedCitadel.lawsAndTaboos.map((law, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{law}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tài Nguyên & Đặc Sản */}
                <div className="p-4 rounded-xl bg-gray-900/70 border border-emerald-900/30">
                  <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span>💎</span> Tài Nguyên & Mạch Khoáng Giao Thương
                  </h3>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {selectedCitadel.specialResources.map((res, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Lịch Sử & Truyền Thuyết Viễn Cổ */}
              <div className="p-4 rounded-xl bg-gray-900/70 border border-amber-900/30">
                <h3 className="text-xs font-black text-amber-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <span>📖</span> Lịch Sử & Truyền Thuyết Viễn Cổ
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{selectedCitadel.historyAndLegends}"
                </p>
              </div>
            </div>
          </>
        )}

        {/* ================= TAB 2: SIMULATOR ================= */}
        {activeTab === 'simulator' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar bg-gray-950">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-gray-900 to-amber-950/60 border border-red-700/50 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚔️</span>
                <div>
                  <h2 className="text-base font-black text-red-300 uppercase tracking-wide">
                    Mô Phỏng Chiến Sự & Biến Cố Thành Trì (City Siege Simulator)
                  </h2>
                  <p className="text-xs text-gray-400">
                    Tạo lập các phân cảnh phòng ngự công thành, phá trận, đại đấu giá tranh đoạt nghẹt thở đậm chất tiểu thuyết
                  </p>
                </div>
              </div>

              {/* Config Form */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">
                    Thành Trì Mục Tiêu
                  </label>
                  <select
                    value={selectedCitadel.id}
                    onChange={(e) => {
                      const found = citadels.find((c) => c.id === e.target.value);
                      if (found) setSelectedCitadel(found);
                    }}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-amber-300 focus:outline-none focus:border-red-500"
                  >
                    {citadels.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">
                    Nhân Vật Tham Gia
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={simCharacter}
                      onChange={(e) => setSimCharacter(e.target.value)}
                      placeholder="Tên nhân vật"
                      className="flex-1 bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="text"
                      value={simCharRealm}
                      onChange={(e) => setSimCharRealm(e.target.value)}
                      placeholder="Cảnh giới"
                      className="w-28 bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-gray-300 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">
                    Kịch Bản Biến Cố
                  </label>
                  <select
                    value={simEventType}
                    onChange={(e) => setSimEventType(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-red-300 focus:outline-none focus:border-red-500"
                  >
                    {EVENT_TYPES.map((evt) => (
                      <option key={evt.id} value={evt.name}>
                        {evt.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Goal & Motive */}
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">
                    Mục Tiêu & Động Cơ Của Nhân Vật Chính
                  </label>
                  <input
                    type="text"
                    value={simGoal}
                    onChange={(e) => setSimGoal(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 block mb-1">
                    Chi Tiết / Yếu Tố Kịch Tính Bổ Sung
                  </label>
                  <input
                    type="text"
                    value={simCustomDetails}
                    onChange={(e) => setSimCustomDetails(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg p-2 text-xs text-gray-200 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:brightness-110 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg shadow-red-950/60 flex items-center gap-2 transition-all"
                >
                  {isSimulating ? (
                    <>
                      <span className="animate-spin">🌀</span> Đang Mô Phỏng Chiến Sự Hào Hùng...
                    </>
                  ) : (
                    <>
                      <span>🔥</span> Khởi Động Mô Phỏng Chiến Sự
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulation Results Output */}
            {simResult && (
              <div className="p-5 rounded-2xl bg-gray-900/90 border border-red-600/50 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-red-950 text-red-300 border border-red-700 px-2 py-0.5 rounded">
                      Kết Quả Mô Phỏng
                    </span>
                    <h3 className="text-base font-black text-red-200 mt-1">
                      {simResult.citadelName} — {simResult.eventType}
                    </h3>
                  </div>
                  <button
                    onClick={handleInsertSimulationStory}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>📥</span> 1-Click Chèn Toàn Bộ Vào Truyện
                  </button>
                </div>

                {/* 4 Phases cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                    <h4 className="font-bold text-amber-400 mb-1 flex items-center gap-1">
                      <span>🚨</span> Khí Tượng & Tiếng Còi Báo Động
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{simResult.situationOverview}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                    <h4 className="font-bold text-blue-400 mb-1 flex items-center gap-1">
                      <span>🛡️</span> Đại Trận Bùng Nổ & Quân Lực
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{simResult.defenseDeployment}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                    <h4 className="font-bold text-red-400 mb-1 flex items-center gap-1">
                      <span>⚔️</span> Hành Động Của {simResult.characterName}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{simResult.characterActionAndBattle}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
                    <h4 className="font-bold text-purple-400 mb-1 flex items-center gap-1">
                      <span>⚡</span> Cao Trào Nghẹt Thở & Chuyển Biến
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{simResult.dramaticClimax}</p>
                  </div>
                </div>

                {/* Outcome & Rewards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-950 border border-emerald-900/40">
                    <h4 className="font-bold text-emerald-400 mb-1 flex items-center gap-1">
                      <span>🏆</span> Kết Cục & Tổn Thất
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{simResult.outcomeAndCasualties}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-950 border border-yellow-900/40">
                    <h4 className="font-bold text-yellow-400 mb-1 flex items-center gap-1">
                      <span>🎁</span> Chiến Lợi Phẩm & Vinh Danh
                    </h4>
                    <p className="text-gray-300 leading-relaxed">{simResult.rewardsAndReputation}</p>
                  </div>
                </div>

                {/* Plot Hooks */}
                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-700/40 text-xs">
                  <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1">
                    <span>💡</span> Gợi Ý Phục Bút & Manh Mối Tiếp Theo
                  </h4>
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                    {simResult.authorPlotHooks}
                  </p>
                </div>

                {/* Chapter Story Segment */}
                <div className="p-4 rounded-xl bg-gray-950 border border-amber-600/40">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                      <span>📖</span> Trường Đoạn Tiểu Thuyết Mẫu (500 - 700 Từ)
                    </h4>
                  </div>
                  <div className="p-3 bg-gray-900/60 rounded-lg text-xs text-gray-200 leading-relaxed whitespace-pre-line font-serif border border-gray-800">
                    {simResult.chapterStorySegment}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: CREATOR ================= */}
        {activeTab === 'creator' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 custom-scrollbar bg-gray-950">
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-br from-amber-950/40 via-gray-900 to-gray-950 border border-amber-600/50 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl">✨</span>
                <div>
                  <h2 className="text-base font-black text-amber-300 uppercase tracking-wide">
                    Sáng Tạo Thành Trì Mới Bằng AI
                  </h2>
                  <p className="text-xs text-gray-400">
                    Tạo lập tức thì các đô thị tu tiên, tiên cung lăng không, trấn thành biên giới độc bản chỉ trong vài giây
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-5">
                <div>
                  <label className="text-xs font-bold text-amber-300 block mb-1">
                    Tên Hoặc Danh Hiệu Thành Trì (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={creatorName}
                    onChange={(e) => setCreatorName(e.target.value)}
                    placeholder="Ví dụ: Vạn Tinh Thần Thành, Băng Phách Cổ Quan, Minh Nguyệt Tiên Đô..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-amber-200 focus:outline-none focus:border-amber-500 placeholder-gray-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Phẩm Giai Thành Trì
                    </label>
                    <select
                      value={creatorTier}
                      onChange={(e) => setCreatorTier(e.target.value as CitadelTier)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none focus:border-amber-500"
                    >
                      {TIERS.map((tier, idx) => (
                        <option key={idx} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">
                      Loại Hình Công Năng
                    </label>
                    <select
                      value={creatorCategory}
                      onChange={(e) => setCreatorCategory(e.target.value as CitadelCategory)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none focus:border-amber-500"
                    >
                      {CATEGORIES.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    Ý Tưởng & Bối Cảnh Độc Đáo Của Tác Giả
                  </label>
                  <textarea
                    rows={4}
                    value={creatorCustomIdea}
                    onChange={(e) => setCreatorCustomIdea(e.target.value)}
                    placeholder="Mô tả ý tưởng của bạn: Ví dụ một thành phố rèn đúc vũ khí nằm ngay bên miệng núi lửa nghìn năm, Thành Chủ là một lão điên luyện kiếm..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-amber-500 placeholder-gray-600"
                  />
                </div>

                <button
                  onClick={handleCreateCitadel}
                  disabled={isGenerating}
                  className="w-full py-3 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:brightness-110 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-xl shadow-amber-950/60 flex items-center justify-center gap-2 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <span className="animate-spin">🌀</span> Đang Kiến Thiết Thành Trì Bằng AI...
                    </>
                  ) : (
                    <>
                      <span>🏯</span> Khởi Tạo Thành Trì Mới
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
