import React, { useState } from 'react';
import {
  SupremeCultivationMethodItem,
  SupremeCultivationTier,
  CharacterProfile,
  CultivationBreakthroughSimulation
} from '../types';
import { PRESET_CULTIVATION_METHODS } from '../data/presetCultivationMethods';
import {
  simulateCultivationBreakthrough,
  generateCultivationMethod
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface SupremeCultivationStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
}

type StudioTab = 'methods' | 'breakthrough' | 'generator';

const PATH_FILTERS = [
  'Tất Cả',
  'Luyện Thể Ngoại Công',
  'Luyện Khí Nội Công',
  'Thần Ma Song Tu',
  'Hỗn Độn Nguyên Sơ',
  'Kiếm Tu Thuần Đạo',
  'Tà Ma Ma Tu'
];

const GRADE_FILTERS = [
  'Tất Cả',
  'Hỗn Độn Khai Thiên',
  'Hồng Hoang Bất Hủ',
  'Đạo Thống Đế Kinh',
  'Thiên Giai Tuyệt Thế',
  'Địa Giai Huyền Diệu'
];

const POPULAR_CATALYSTS = [
  'Vạn Niên Long Tủy',
  'Lôi Trì Chi Thủy (Thiên Kiếp Chi Lôi)',
  'Cửu U Minh Hỏa',
  'Thái Dương Chân Hỏa',
  'Hóa Anh Đan Cực Phẩm',
  'Hỗn Độn Tàn Ngọc',
  'Vạn Niên Canh Kim Thần Sa',
  'Thiên Niên Thạch Nhũ',
  'Thần Thú Bản Mệnh Tinh Huyết',
  'Bồ Đề Thanh Tâm Quả'
];

export const SupremeCultivationStudio: React.FC<SupremeCultivationStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText,
  onUpdateCharacters
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('methods');

  // Methods list & filter
  const [methods, setMethods] = useState<SupremeCultivationMethodItem[]>(PRESET_CULTIVATION_METHODS);
  const [selectedMethodId, setSelectedMethodId] = useState<string>(PRESET_CULTIVATION_METHODS[0]?.id || '');
  const [selectedPathFilter, setSelectedPathFilter] = useState<string>('Tất Cả');
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string>('Tất Cả');
  const [searchMethod, setSearchMethod] = useState<string>('');
  const [activeTierIdx, setActiveTierIdx] = useState<number>(0);

  // Breakthrough Simulation state
  const [selectedCharId, setSelectedCharId] = useState<string>(characters[0]?.id || '');
  const [breakthroughMethodId, setBreakthroughMethodId] = useState<string>(PRESET_CULTIVATION_METHODS[0]?.id || '');
  const [fromTierText, setFromTierText] = useState<string>('Tầng 1: Đồng Bì Thiết Cốt (Viên Mãn)');
  const [toTierText, setToTierText] = useState<string>('Tầng 2: Ngân Tủy Ngọc Cốt (Sơ Cương)');
  const [selectedCatalysts, setSelectedCatalysts] = useState<string[]>([
    'Vạn Niên Long Tủy',
    'Lôi Trì Chi Thủy (Thiên Kiếp Chi Lôi)'
  ]);
  const [customCatalyst, setCustomCatalyst] = useState<string>('');
  const [breakthroughEnvironment, setBreakthroughEnvironment] = useState<string>(
    'Động Phủ Bí Mật Dưới Lòng Núi Núi Lửa, có Cửu Cung Phong Ma Trận phong tỏa khí tức'
  );
  const [isSimulatingBreakthrough, setIsSimulatingBreakthrough] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<CultivationBreakthroughSimulation | null>(null);

  // Method Generator state
  const [genPath, setGenPath] = useState<string>('Luyện Thể Ngoại Công');
  const [genGrade, setGenGrade] = useState<string>('Đạo Thống Đế Kinh');
  const [genIdea, setGenIdea] = useState<string>('Lấy Lôi Đình đập nát kinh mạch, ngưng tụ Cửu Tiêu Lôi Thể');
  const [genTierCount, setGenTierCount] = useState<number>(4);
  const [isGeneratingMethod, setIsGeneratingMethod] = useState<boolean>(false);

  const selectedMethod = methods.find(m => m.id === selectedMethodId) || methods[0];
  const breakthroughMethod = methods.find(m => m.id === breakthroughMethodId) || methods[0];
  const selectedChar = characters.find(c => c.id === selectedCharId) || characters[0];

  // Filtered methods
  const filteredMethods = methods.filter(m => {
    const matchPath = selectedPathFilter === 'Tất Cả' || m.path === selectedPathFilter;
    const matchGrade = selectedGradeFilter === 'Tất Cả' || m.gradeLevel === selectedGradeFilter;
    const matchSearch =
      !searchMethod.trim() ||
      m.name.toLowerCase().includes(searchMethod.toLowerCase()) ||
      m.corePhilosophy.toLowerCase().includes(searchMethod.toLowerCase());
    return matchPath && matchGrade && matchSearch;
  });

  // Toggle catalyst
  const toggleCatalyst = (cat: string) => {
    setSelectedCatalysts(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const addCustomCatalyst = () => {
    if (customCatalyst.trim() && !selectedCatalysts.includes(customCatalyst.trim())) {
      setSelectedCatalysts(prev => [...prev, customCatalyst.trim()]);
      setCustomCatalyst('');
    }
  };

  // Run AI Breakthrough Simulation
  const handleSimulateBreakthrough = async () => {
    if (!selectedChar) {
      alert('Vui lòng chọn nhân vật để mô phỏng!');
      return;
    }
    setIsSimulatingBreakthrough(true);
    setSimulationResult(null);

    try {
      const res = await simulateCultivationBreakthrough({
        character: selectedChar,
        method: breakthroughMethod,
        fromTier: fromTierText,
        toTier: toTierText,
        catalysts: selectedCatalysts,
        environment: breakthroughEnvironment,
        genre
      });
      setSimulationResult(res);
    } catch (err: any) {
      alert('Lỗi mô phỏng đột phá: ' + err.message);
    } finally {
      setIsSimulatingBreakthrough(false);
    }
  };

  // Apply breakthrough outcome to character
  const handleApplyBreakthroughToCharacter = () => {
    if (!simulationResult || !selectedChar || !onUpdateCharacters) return;
    const updatedChars = characters.map(c => {
      if (c.id === selectedChar.id) {
        return {
          ...c,
          realmOrRank: `${toTierText.split(':')[0]} (${breakthroughMethod.name})`,
          specialPhysique: `${c.specialPhysique ? c.specialPhysique + ' • ' : ''}${simulationResult.physicalTransformationDetails.slice(0, 40)}...`,
          backstory: `${c.backstory}\n\n[Đột Phá Thành Công]: Tại ${breakthroughEnvironment}, đã vận chuyển ${breakthroughMethod.name} thành công phá tan bình cảnh từ ${fromTierText} lên ${toTierText}.`
        };
      }
      return c;
    });
    onUpdateCharacters(updatedChars);
    alert(`Đã cập nhật tu vi đột phá của ${selectedChar.name} vào hồ sơ nhân vật!`);
  };

  // Run AI Method Generator
  const handleGenerateMethod = async () => {
    setIsGeneratingMethod(true);
    try {
      const res = await generateCultivationMethod({
        path: genPath,
        gradeLevel: genGrade,
        customIdea: genIdea,
        tierCount: genTierCount,
        genre
      });
      if (res) {
        setMethods(prev => [res, ...prev]);
        setSelectedMethodId(res.id);
        setActiveTab('methods');
        alert(`Đã kiến tạo thành công công pháp: "${res.name}"!`);
      }
    } catch (err: any) {
      alert('Lỗi tạo công pháp: ' + err.message);
    } finally {
      setIsGeneratingMethod(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-red-500/20 bg-gradient-to-r from-gray-950 via-red-950/40 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-yellow-300 tracking-wide">
              HỆ THỐNG TU PHÁP & ĐỘT PHÁ LỘT XÁC
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 font-mono font-bold">
              SUPREME CULTIVATION STUDIO
            </span>
          </div>
          <p className="text-xs text-red-300/80 mt-0.5">
            Cửu Chuyển Huyền Công, Thái Sơ Hỗn Độn, Thần Ma Luyện Thể, Kiếm Tu Thuần Đạo & Mô phỏng lột xác bằng AI
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'methods'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-900/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📜</span> Bách Khoa Tu Pháp ({methods.length})
          </button>
          <button
            onClick={() => setActiveTab('breakthrough')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'breakthrough'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-900/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>⚡</span> Mô Phỏng Đột Phá AI
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-900/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🔮</span> Khởi Tạo Công Pháp
          </button>
        </div>
      </div>

      {/* TAB 1: BÁCH KHOA TU PHÁP */}
      {activeTab === 'methods' && (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left: Filter & List */}
          <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 flex flex-col shrink-0">
            {/* Search & Filter */}
            <div className="p-3 border-b border-white/10 space-y-2">
              <input
                type="text"
                placeholder="Tìm tên công pháp, triết lý..."
                value={searchMethod}
                onChange={e => setSearchMethod(e.target.value)}
                className="w-full px-3 py-1.5 bg-gray-900 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
              />
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-gray-400 block mb-1">Hệ Phái:</span>
                  <select
                    value={selectedPathFilter}
                    onChange={e => setSelectedPathFilter(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded p-1 text-gray-300 focus:outline-none"
                  >
                    {PATH_FILTERS.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">Phẩm Cấp:</span>
                  <select
                    value={selectedGradeFilter}
                    onChange={e => setSelectedGradeFilter(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded p-1 text-gray-300 focus:outline-none"
                  >
                    {GRADE_FILTERS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
              {filteredMethods.map(m => {
                const isSelected = m.id === selectedMethod.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedMethodId(m.id);
                      setActiveTierIdx(0);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-950/80 to-amber-950/40 border-red-500/60 shadow-md shadow-red-950/30'
                        : 'bg-gray-900/60 border-white/5 hover:border-white/20 hover:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold border border-red-800/40">
                        {m.path}
                      </span>
                      <span className="text-[10px] text-amber-400 font-bold">
                        {m.gradeLevel}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-vip-gold mt-1 line-clamp-1">{m.name}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                      {m.corePhilosophy}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 mt-2 pt-2 border-t border-white/5">
                      <span>{m.tiers.length} Tầng Luyện</span>
                      <span>{m.innateSecretAbilities.length} Thần Thông</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Method Detailed Inspector */}
          {selectedMethod && (
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {/* Method Hero Header */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-red-500/30 shadow-xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-white/10 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold border border-red-500/40">
                        {selectedMethod.path}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                        {selectedMethod.gradeLevel}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-vip-gold mt-2">{selectedMethod.name}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      <strong className="text-amber-300">Nguồn gốc & Lai lịch:</strong> {selectedMethod.originAndHeritage}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto">
                    <button
                      onClick={() => {
                        setBreakthroughMethodId(selectedMethod.id);
                        if (selectedMethod.tiers.length > 1) {
                          setFromTierText(`${selectedMethod.tiers[0].tierName}`);
                          setToTierText(`${selectedMethod.tiers[1].tierName}`);
                        }
                        setActiveTab('breakthrough');
                      }}
                      className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-lg text-xs font-bold shadow-md flex items-center gap-1"
                    >
                      <span>⚡</span> Đột Phá AI
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          const abilities = selectedMethod.innateSecretAbilities
                            .map(a => `- ${a.name} (${a.tierRequired}): ${a.description}`)
                            .join('\n');
                          onInsertText(
                            `[CÔNG PHÁP: ${selectedMethod.name} - ${selectedMethod.gradeLevel}]\n` +
                            `- Hệ phái: ${selectedMethod.path}\n` +
                            `- Nguồn gốc: ${selectedMethod.originAndHeritage}\n` +
                            `- Triết lý: ${selectedMethod.corePhilosophy}\n` +
                            `- Cơ chế lột xác: ${selectedMethod.bodyTransformationMechanism}\n` +
                            `- Đường vận khí: ${selectedMethod.energyCircuitRoute}\n` +
                            `- Thần thông bí kỹ:\n${abilities}\n` +
                            `- Xúc tác cần thiết: ${selectedMethod.requiredCatalysts.join(', ')}`
                          );
                          alert('Đã chèn toàn bộ thông số công pháp vào bản thảo!');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <span>📝</span> Chèn Vào Truyện
                      </button>
                    )}
                  </div>
                </div>

                {/* Core Philosophy Box */}
                <div className="p-4 rounded-xl bg-gray-900/90 border border-amber-500/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <span>💡</span>
                    <span>Triết Lý Cốt Lõi:</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed italic">{selectedMethod.corePhilosophy}</p>
                </div>

                {/* Transformation Mechanism & Energy Circuit */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-red-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-red-300 font-bold">
                      <span>🩸</span>
                      <span>Cơ Chế Lột Xác Nhục Thân:</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{selectedMethod.bodyTransformationMechanism}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-cyan-500/20 space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                      <span>🌀</span>
                      <span>Đường Vận Khí & Huyết Mạch:</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{selectedMethod.energyCircuitRoute}</p>
                  </div>
                </div>

                {/* Innate Secret Abilities */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase text-vip-gold font-bold flex items-center gap-1.5">
                    <span>✨</span> Thần Thông Bí Kỹ Thiên Phú ({selectedMethod.innateSecretAbilities.length}):
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {selectedMethod.innateSecretAbilities.map((ab, idx) => (
                      <div key={idx} className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                        <div className="flex items-center justify-between">
                          <strong className="text-amber-300 font-bold">{ab.name}</strong>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-800/40">
                            {ab.tierRequired}
                          </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-[11px]">{ab.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Catalysts Checklist */}
                <div className="p-3.5 bg-gray-900/70 rounded-xl border border-white/5 space-y-2">
                  <span className="text-xs text-rose-300 font-bold block">
                    🌿 Dị Bảo & Xúc Tác Đột Phá Bắt Buộc:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedMethod.requiredCatalysts.map((cat, idx) => (
                      <span key={idx} className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-800 text-gray-300 border border-white/10 flex items-center gap-1">
                        <span>💠</span> {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tiers Breakdown & Interactive Navigator */}
              <div className="p-6 rounded-2xl bg-gray-950/90 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🪜</span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Phân Tầng Cảnh Giới Tu Luyện ({selectedMethod.tiers.length} Tầng)
                    </h4>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">
                    Chọn từng tầng để soi chiếu dị tượng & cơ năng
                  </span>
                </div>

                {/* Tier Tab Selector */}
                <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                  {selectedMethod.tiers.map((t, idx) => {
                    const isSelectedTier = idx === activeTierIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveTierIdx(idx)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                          isSelectedTier
                            ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white border-amber-400 shadow-md'
                            : 'bg-gray-900 text-gray-400 border-white/5 hover:text-white'
                        }`}
                      >
                        Tầng {t.tierNumber}: {t.tierName.split(':')[1] || t.tierName}
                      </button>
                    );
                  })}
                </div>

                {/* Active Tier Details */}
                {selectedMethod.tiers[activeTierIdx] && (() => {
                  const currentTier: SupremeCultivationTier = selectedMethod.tiers[activeTierIdx];
                  return (
                    <div className="p-5 rounded-xl bg-gray-900/90 border border-red-500/20 space-y-4 text-xs">
                      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-white/10 gap-2">
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 font-bold border border-red-800/40">
                            Cảnh Giới Tầng {currentTier.tierNumber}
                          </span>
                          <h4 className="text-lg font-black text-vip-gold mt-1">{currentTier.tierName}</h4>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                          <span>⏳ Thọ Mệnh: <strong className="text-emerald-400">{currentTier.mortalLifespan}</strong></span>
                        </div>
                      </div>

                      {/* Sub-stages pills */}
                      {currentTier.subStages && currentTier.subStages.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-gray-400 font-semibold">Các giai đoạn:</span>
                          {currentTier.subStages.map((sub, sIdx) => (
                            <span key={sIdx} className="px-2.5 py-0.5 rounded-full bg-gray-800 text-amber-300 border border-amber-500/30 text-[11px] font-medium">
                              {sub}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                          <strong className="text-gray-400 block">Bản Chất Cảnh Giới:</strong>
                          <p className="text-gray-200 leading-relaxed">{currentTier.realmEssence}</p>
                        </div>
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                          <strong className="text-gray-400 block">Biểu Hiện Thể Xác Bên Ngoài:</strong>
                          <p className="text-gray-200 leading-relaxed">{currentTier.physicalManifestation}</p>
                        </div>
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                          <strong className="text-cyan-300 block">Vận Hành Khí Huyết / Chu Thiên:</strong>
                          <p className="text-gray-300 leading-relaxed">{currentTier.spiritualVeinOperation}</p>
                        </div>
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                          <strong className="text-purple-300 block">Dị Tượng Đột Phá Đất Trời:</strong>
                          <p className="text-gray-300 leading-relaxed">{currentTier.breakthroughPhenomenon}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-1">
                          <strong className="text-amber-300 block">Khí Tức Chiến Đấu (Combat Aura):</strong>
                          <p className="text-gray-300 leading-relaxed">{currentTier.combatAura}</p>
                        </div>
                        <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-500/30 space-y-1">
                          <strong className="text-rose-400 block">Cấm Kỵ & Nguy Hiểm Tâm Ma / Tẩu Hỏa:</strong>
                          <p className="text-rose-200 leading-relaxed">{currentTier.tabooAndDemonDanger}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Author Writing Tips */}
              {selectedMethod.authorWritingTips && selectedMethod.authorWritingTips.length > 0 && (
                <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <span>✍️</span>
                    <span>Mẹo Sáng Tác & Diễn Đạt Tiểu Thuyết Cho Tác Giả:</span>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-1.5 leading-relaxed">
                    {selectedMethod.authorWritingTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MÔ PHỎNG ĐỘT PHÁ LỘT XÁC BẰNG AI */}
      {activeTab === 'breakthrough' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Setup Panel */}
            <div className="p-6 rounded-2xl bg-gray-950/90 border border-red-500/30 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="text-lg font-black text-vip-gold">TRÌNH MÔ PHỎNG ĐẠI CẢNH ĐỘT PHÁ & LỘT XÁC AI</h3>
                    <p className="text-xs text-gray-400">Chọn nhân vật, bộ tu pháp và chọn từ Tầng lên Tầng</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Select Character */}
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold block">1. Chọn Nhân Vật Đột Phá:</label>
                  <select
                    value={selectedCharId}
                    onChange={e => setSelectedCharId(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500 font-medium"
                  >
                    {characters.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.realmOrRank} • {c.role})
                      </option>
                    ))}
                  </select>
                  {selectedChar && (
                    <p className="text-[11px] text-gray-400 italic">
                      Linh căn: {selectedChar.spiritualRoots || 'Bình thường'} • Thể chất: {selectedChar.specialPhysique || 'Phàm thể'}
                    </p>
                  )}
                </div>

                {/* Select Method */}
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold block">2. Chọn Bộ Tu Pháp Áp Dụng:</label>
                  <select
                    value={breakthroughMethodId}
                    onChange={e => {
                      setBreakthroughMethodId(e.target.value);
                      const m = methods.find(x => x.id === e.target.value);
                      if (m && m.tiers.length > 1) {
                        setFromTierText(`${m.tiers[0].tierName}`);
                        setToTierText(`${m.tiers[1].tierName}`);
                      }
                    }}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500 font-medium"
                  >
                    {methods.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.path} • {m.gradeLevel})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-gray-400 italic">
                    Hệ phái: {breakthroughMethod.path} • {breakthroughMethod.tiers.length} Tầng
                  </p>
                </div>
              </div>

              {/* From Tier & To Tier */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-red-300 font-bold block">3. Từ Tầng Hiện Tại:</label>
                  <input
                    type="text"
                    value={fromTierText}
                    onChange={e => setFromTierText(e.target.value)}
                    placeholder="VD: Tầng 1: Đồng Bì Thiết Cốt (Viên Mãn)"
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500"
                  />
                  <div className="flex gap-1.5 flex-wrap">
                    {breakthroughMethod.tiers.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFromTierText(`${t.tierName}`)}
                        className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 hover:text-white"
                      >
                        T{t.tierNumber}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-emerald-300 font-bold block">4. Đột Phá Lên Tầng Mục Tiêu:</label>
                  <input
                    type="text"
                    value={toTierText}
                    onChange={e => setToTierText(e.target.value)}
                    placeholder="VD: Tầng 2: Ngân Tủy Ngọc Cốt (Sơ Cương)"
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500 font-bold text-vip-gold"
                  />
                  <div className="flex gap-1.5 flex-wrap">
                    {breakthroughMethod.tiers.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setToTierText(`${t.tierName}`)}
                        className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-300 hover:text-white"
                      >
                        T{t.tierNumber}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Catalysts Picker */}
              <div className="space-y-2 text-xs">
                <label className="text-amber-300 font-bold block">
                  5. Thiên Tài Địa Bảo, Đan Dược & Xúc Tác Hỗ Trợ Đột Phá:
                </label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_CATALYSTS.map(cat => {
                    const isChecked = selectedCatalysts.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCatalyst(cat)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                          isChecked
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 font-bold'
                            : 'bg-gray-900 text-gray-400 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {isChecked ? '✓ ' : '+ '} {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Custom catalyst input */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={customCatalyst}
                    onChange={e => setCustomCatalyst(e.target.value)}
                    placeholder="Thêm dị bảo riêng (VD: Một giọt Huyết Mạch Phượng Hoàng)..."
                    className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                    onKeyDown={e => e.key === 'Enter' && addCustomCatalyst()}
                  />
                  <button
                    type="button"
                    onClick={addCustomCatalyst}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-xs font-bold text-white border border-white/10"
                  >
                    Thêm
                  </button>
                </div>
              </div>

              {/* Environment context */}
              <div className="space-y-1.5 text-xs">
                <label className="text-gray-300 font-bold block">6. Bối Cảnh / Động Phủ Bế Quan:</label>
                <input
                  type="text"
                  value={breakthroughEnvironment}
                  onChange={e => setBreakthroughEnvironment(e.target.value)}
                  placeholder="VD: Cổ Tiên Phủ ngàn trượng dưới đáy Bắc Minh Hàn Hải..."
                  className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Generate button */}
              <div className="pt-2">
                <button
                  onClick={handleSimulateBreakthrough}
                  disabled={isSimulatingBreakthrough}
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-amber-600 to-yellow-600 hover:from-red-500 hover:to-amber-500 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSimulatingBreakthrough ? (
                    <>
                      <Spinner />
                      <span>ĐANG KÍCH PHÁT THIÊN ĐẠO LÔI KIẾP & LỘT XÁC...</span>
                    </>
                  ) : (
                    <>
                      <span>🔥</span>
                      <span>KÍCH HOẠT MÔ PHỎNG ĐỘT PHÁ LỘT XÁC BẰNG AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulation Results Display */}
            {simulationResult && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-red-500/40 shadow-2xl space-y-5 animate-fadeIn">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                      ĐỘT PHÁ THÀNH CÔNG VIÊN MÃN
                    </span>
                    <h3 className="text-xl font-black text-vip-gold mt-1">
                      {simulationResult.characterName} • Phá Cảnh Thành Công Lên {simulationResult.toTier}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Công pháp: {simulationResult.methodName} | Từ [{simulationResult.fromTier}] ➔ [{simulationResult.toTier}]
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleApplyBreakthroughToCharacter}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md"
                    >
                      <span>🔄</span> Đồng Bộ Nhân Vật
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          onInsertText(
                            `[PHÂN ĐOẠN ĐỘT PHÁ: ${simulationResult.characterName} - ${simulationResult.methodName}]\n` +
                            `- Cảnh giới: Từ ${simulationResult.fromTier} lên ${simulationResult.toTier}\n` +
                            `- Khí tượng: ${simulationResult.environmentalAtmosphere}\n` +
                            `- Thiên kiếp: ${simulationResult.tribulationPhenomenon}\n` +
                            `- Trảm tâm ma: ${simulationResult.innerDemonEncounter}\n` +
                            `- Lột xác thể chất: ${simulationResult.physicalTransformationDetails}\n\n` +
                            `${simulationResult.authorProseSnippet}`
                          );
                          alert('Đã chèn đại cảnh đột phá vào bản thảo truyện!');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md"
                      >
                        <span>📝</span> Chèn Vào Truyện
                      </button>
                    )}
                  </div>
                </div>

                {/* Breakthrough narrative breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                    <strong className="text-red-300 flex items-center gap-1">
                      <span>🌋</span> Quá Trình Bẻ Gãy Kinh Mạch / Lột Xác:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{simulationResult.breakthroughProcess}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                    <strong className="text-purple-300 flex items-center gap-1">
                      <span>⚡</span> Dị Tượng Thiên Kiếp Giáng Lâm:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{simulationResult.tribulationPhenomenon}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                    <strong className="text-rose-300 flex items-center gap-1">
                      <span>🧠</span> Vượt Qua Cám Dỗ & Trảm Diệt Tâm Ma:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{simulationResult.innerDemonEncounter}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1">
                      <span>✨</span> Lột Xác Nhục Thân & Thần Hồn Mới:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{simulationResult.physicalTransformationDetails}</p>
                  </div>
                </div>

                {/* Ultimate Power Burst */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1">
                  <strong className="text-vip-gold flex items-center gap-1 font-bold">
                    <span>💥</span> Uy Áp Bộc Phát Phá Tan Bình Cảnh:
                  </strong>
                  <p className="text-gray-200 leading-relaxed">{simulationResult.ultimatePowerBurst}</p>
                </div>

                {/* Novel Prose Snippet */}
                <div className="p-5 rounded-2xl bg-black/60 border border-red-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📜</span>
                      <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                        Trích Đoạn Văn Xuôi Tiểu Thuyết Hoàn Chỉnh (Chèn Trực Tiếp Vào Truyện)
                      </h4>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(simulationResult.authorProseSnippet);
                        alert('Đã sao chép đoạn văn xuôi vào khay nhớ tạm!');
                      }}
                      className="text-[11px] text-gray-400 hover:text-white underline cursor-pointer"
                    >
                      Sao chép văn bản
                    </button>
                  </div>
                  <div className="p-4 bg-gray-950/80 rounded-xl border border-white/5 max-h-80 overflow-y-auto custom-scrollbar">
                    <p className="text-gray-200 leading-relaxed text-xs whitespace-pre-line font-serif">
                      {simulationResult.authorProseSnippet}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: KHỞI TẠO CÔNG PHÁP MỚI BẰNG AI */}
      {activeTab === 'generator' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gray-950/90 border border-red-500/30 shadow-xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <span className="text-2xl">🔮</span>
              <div>
                <h3 className="text-base font-bold text-vip-gold">KHỞI TẠO CÔNG PHÁP TU LUYỆN BẰNG AI</h3>
                <p className="text-xs text-gray-400">Thiết kế công pháp độc bản theo ý niệm của tác giả</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold block">Hệ Phái Công Pháp:</label>
                  <select
                    value={genPath}
                    onChange={e => setGenPath(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500"
                  >
                    {PATH_FILTERS.filter(p => p !== 'Tất Cả').map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold block">Phẩm Cấp Đạo Thống:</label>
                  <select
                    value={genGrade}
                    onChange={e => setGenGrade(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500"
                  >
                    {GRADE_FILTERS.filter(g => g !== 'Tất Cả').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-gray-300 font-bold block">Số Lượng Tầng Tu Luyện Chi Tiết:</label>
                <div className="flex gap-2">
                  {[3, 4, 5, 7, 9].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGenTierCount(num)}
                      className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                        genTierCount === num
                          ? 'bg-red-600 text-white border-red-400'
                          : 'bg-gray-900 text-gray-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {num} Tầng
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-amber-300 font-bold block">Ý Tưởng Độc Môn & Điểm Nhấn Sáng Tạo:</label>
                <textarea
                  rows={4}
                  value={genIdea}
                  onChange={e => setGenIdea(e.target.value)}
                  placeholder="Ví dụ: Công pháp kết hợp giữa Hỏa Linh Căn và Thần Ma Chi Lực, hấp thu dung nham đáy biển để ngưng tụ Hỏa Ma Thần Thể..."
                  className="w-full bg-gray-900 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 leading-relaxed"
                />
              </div>

              <button
                onClick={handleGenerateMethod}
                disabled={isGeneratingMethod}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
              >
                {isGeneratingMethod ? (
                  <>
                    <Spinner />
                    <span>ĐANG DIỄN HÓA CÔNG PHÁP VÔ THƯỢNG...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>KHỞI TẠO CÔNG PHÁP MỚI VÀ LƯU VÀO KHO</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
