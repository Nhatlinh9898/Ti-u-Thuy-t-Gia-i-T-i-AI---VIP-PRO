import React, { useState } from 'react';
import {
  SectItem,
  SectCamp,
  SectGrade,
  VillainItem,
  SpyItem,
  FactionConflictSimulationResult,
  CharacterProfile,
  SectPositionDetail,
} from '../types';
import {
  PRESET_SECTS_ALL,
  PRESET_VILLAINS_ALL,
  PRESET_SPIES_ALL,
} from '../data/presetSectsVillainsSpies';
import { PRESET_11_SECT_POSITIONS } from '../data/presetSectPositions';
import {
  generateSectEntity,
  simulateFactionConflict,
  simulateSectPromotion,
} from '../services/geminiService';

interface SectFactionStudioProps {
  genre?: string;
  characters?: CharacterProfile[];
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
  onInsertText?: (text: string) => void;
}

type StudioTab = 'sects' | 'positions' | 'villains' | 'spies' | 'simulation' | 'generator';

const FACTION_CAMPS: (SectCamp | 'Tất Cả')[] = [
  'Tất Cả',
  'Chính Đạo (Orthodox / Tiên Môn)',
  'Ma Đạo & Tà Tu (Demonic / Tà Phái)',
  'Yêu Tộc & Dị Tộc (Monster & Alien Clan)',
  'Trung Lập & Tán Tu Minh (Neutral & Rogue Alliance)',
  'Ẩn Thế Cổ Tộc & Cấm Địa Thế Lực (Ancient Clans & Forbidden Zones)',
];

const SECT_GRADES: (SectGrade | 'Tất Cả')[] = [
  'Tất Cả',
  'Bất Hủ Thánh Địa & Đạo Thống Thái Cổ (Đại Thừa Tiên Khí / Trấn Giới Vĩnh Hằng)',
  'Nhị Phẩm - Nhất Phẩm Tông Môn (Đỉnh Cấp Cự Phách / Luyện Hư & Hợp Thể)',
  'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)',
  'Lục Phẩm - Ngũ Phẩm (Châu Phủ Trung Môn / Kim Đan Tọa Trấn)',
  'Bát Phẩm - Thất Phẩm (Sơn Đầu Bang Phái / Hương Trấn Thế Lực)',
];

const VILLAIN_CATEGORIES = [
  'Tất Cả',
  'Ngụy Quân Tử / Đạo Mạo Nhân Quân',
  'Tuyệt Thế Kiêu Hùng / Ma Đầu Quyết Đoán',
  'Cuồng Ngạo Thiên Kiêu / Nhị Thế Tổ',
  'Lão Ma Đầu Đoạt Xá / Lão Quái Vật Phục Sinh',
  'Hắc Hóa Huynh Đệ / Phản Bội Tri Kỷ',
  'Cuồng Tín Đồ / Cấm Thuật Si Mê',
];

const SPY_CATEGORIES = [
  'Tất Cả',
  'Điệp Viên Ma Đạo Trà Trộn Tiên Môn',
  'Trinh Sát Tiên Minh Nằm Vùng Ma Giáo',
  'Song Diện Gián Điệp (Double Agent)',
  'Tử Sĩ Cài Cắm Từ Nhỏ',
  'Bị Khống Chế Hồn Phách',
  'Điệp Viên Thu Thập Tình Báo Tự Do',
];

const CONFLICT_SCENARIOS = [
  'Đại Chiến Tông Môn / Vây Hãm Sơn Môn',
  'Điệp Báo Bại Lộ / Thanh Trừng Nội Gian',
  'Tranh Đoạt Mạch Linh Thạch / Bí Cảnh Cổ Phái',
  'Thí Luyện Tông Môn / Ám Sát Thiên Kiêu',
  'Ma Đạo Huyết Tế / Chính Đạo Thảo Phạt',
];

export const SectFactionStudio: React.FC<SectFactionStudioProps> = ({
  genre = 'Tiên Hiệp',
  characters = [],
  onUpdateCharacters,
  onInsertText,
}) => {
  // Main state
  const [activeTab, setActiveTab] = useState<StudioTab>('sects');

  // Sects data & filters
  const [sects, setSects] = useState<SectItem[]>(PRESET_SECTS_ALL);
  const [selectedSectId, setSelectedSectId] = useState<string>(PRESET_SECTS_ALL[0]?.id || '');
  const [filterCamp, setFilterCamp] = useState<string>('Tất Cả');
  const [filterGrade, setFilterGrade] = useState<string>('Tất Cả');
  const [searchSect, setSearchSect] = useState<string>('');

  // 11 Sect Positions state
  const [positions, setPositions] = useState<SectPositionDetail[]>(PRESET_11_SECT_POSITIONS);
  const [selectedPositionId, setSelectedPositionId] = useState<string>(PRESET_11_SECT_POSITIONS[0]?.id || '');
  const [searchPosition, setSearchPosition] = useState<string>('');
  const [assignCharId, setAssignCharId] = useState<string>(characters[0]?.id || '');
  const [promoCharId, setPromoCharId] = useState<string>(characters[0]?.id || '');
  const [promoPrevRank, setPromoPrevRank] = useState<string>('Ngoại Môn Đệ Tử');
  const [isPromoting, setIsPromoting] = useState<boolean>(false);
  const [promotionResult, setPromotionResult] = useState<any>(null);

  // Villains data & filters
  const [villains, setVillains] = useState<VillainItem[]>(PRESET_VILLAINS_ALL);
  const [selectedVillainId, setSelectedVillainId] = useState<string>(PRESET_VILLAINS_ALL[0]?.id || '');
  const [filterVillainCat, setFilterVillainCat] = useState<string>('Tất Cả');
  const [searchVillain, setSearchVillain] = useState<string>('');

  // Spies data & filters
  const [spies, setSpies] = useState<SpyItem[]>(PRESET_SPIES_ALL);
  const [selectedSpyId, setSelectedSpyId] = useState<string>(PRESET_SPIES_ALL[0]?.id || '');
  const [filterSpyCat, setFilterSpyCat] = useState<string>('Tất Cả');
  const [searchSpy, setSearchSpy] = useState<string>('');

  // Simulation State
  const [simScenario, setSimScenario] = useState<string>(CONFLICT_SCENARIOS[0]);
  const [simSectName, setSimSectName] = useState<string>(PRESET_SECTS_ALL[0]?.name || '');
  const [simEnemyName, setSimEnemyName] = useState<string>(PRESET_VILLAINS_ALL[0]?.name || '');
  const [simProtagName, setSimProtagName] = useState<string>(
    characters[0]?.name || 'Lâm Phong'
  );
  const [simCustomContext, setSimCustomContext] = useState<string>('');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResult, setSimResult] = useState<FactionConflictSimulationResult | null>(null);

  // Generator State
  const [genEntityType, setGenEntityType] = useState<'sect' | 'villain' | 'spy'>('sect');
  const [genCamp, setGenCamp] = useState<string>(FACTION_CAMPS[1]);
  const [genGrade, setGenGrade] = useState<string>(SECT_GRADES[3]);
  const [genCategory, setGenCategory] = useState<string>(VILLAIN_CATEGORIES[1]);
  const [genPrompt, setGenPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedEntity, setGeneratedEntity] = useState<any>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered Sects
  const filteredSects = sects.filter((s) => {
    const matchCamp = filterCamp === 'Tất Cả' || s.camp.includes(filterCamp.split(' ')[0]);
    const matchGrade = filterGrade === 'Tất Cả' || s.grade.includes(filterGrade.split(' ')[0]);
    const matchSearch =
      searchSect.trim() === '' ||
      s.name.toLowerCase().includes(searchSect.toLowerCase()) ||
      s.headquarters.toLowerCase().includes(searchSect.toLowerCase()) ||
      s.specialties.some((sp) => sp.toLowerCase().includes(searchSect.toLowerCase()));
    return matchCamp && matchGrade && matchSearch;
  });

  const selectedSect = sects.find((s) => s.id === selectedSectId) || filteredSects[0] || sects[0];

  // Filtered Villains
  const filteredVillains = villains.filter((v) => {
    const matchCat = filterVillainCat === 'Tất Cả' || v.category === filterVillainCat;
    const matchSearch =
      searchVillain.trim() === '' ||
      v.name.toLowerCase().includes(searchVillain.toLowerCase()) ||
      v.title.toLowerCase().includes(searchVillain.toLowerCase()) ||
      v.sectAffiliation.toLowerCase().includes(searchVillain.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedVillain =
    villains.find((v) => v.id === selectedVillainId) || filteredVillains[0] || villains[0];

  // Filtered Spies
  const filteredSpies = spies.filter((sp) => {
    const matchCat = filterSpyCat === 'Tất Cả' || sp.category === filterSpyCat;
    const matchSearch =
      searchSpy.trim() === '' ||
      sp.name.toLowerCase().includes(searchSpy.toLowerCase()) ||
      sp.disguisedRole.toLowerCase().includes(searchSpy.toLowerCase()) ||
      sp.actualLoyalty.toLowerCase().includes(searchSpy.toLowerCase());
    return matchCat && matchSearch;
  });

  const selectedSpy =
    spies.find((sp) => sp.id === selectedSpyId) || filteredSpies[0] || spies[0];

  // Handle Simulation
  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const result = await simulateFactionConflict({
        scenarioType: simScenario,
        sectName: simSectName,
        spyOrVillainName: simEnemyName,
        protagonistName: simProtagName,
        customContext: simCustomContext,
        genre,
      });
      setSimResult(result);
      showToast('Đã mô phỏng xong thế cuộc xung đột!');
    } catch (err: any) {
      showToast('Lỗi khi mô phỏng: ' + (err.message || 'Thử lại sau'));
    } finally {
      setIsSimulating(false);
    }
  };

  // Handle Generate Entity
  const handleGenerateEntity = async () => {
    setIsGenerating(true);
    try {
      const result = await generateSectEntity({
        entityType: genEntityType,
        camp: genCamp,
        grade: genGrade,
        category: genCategory,
        userPrompt: genPrompt,
        genre,
      });
      setGeneratedEntity(result);
      showToast('Khởi tạo thành công bằng AI!');
    } catch (err: any) {
      showToast('Lỗi khi tạo: ' + (err.message || 'Thử lại sau'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveGeneratedEntity = () => {
    if (!generatedEntity) return;
    if (genEntityType === 'villain') {
      setVillains([generatedEntity, ...villains]);
      setSelectedVillainId(generatedEntity.id);
      setActiveTab('villains');
    } else if (genEntityType === 'spy') {
      setSpies([generatedEntity, ...spies]);
      setSelectedSpyId(generatedEntity.id);
      setActiveTab('spies');
    } else {
      setSects([generatedEntity, ...sects]);
      setSelectedSectId(generatedEntity.id);
      setActiveTab('sects');
    }
    showToast('Đã lưu vào kho dữ liệu thành công!');
    setGeneratedEntity(null);
  };

  // Insert Sect to Text Editor
  const handleInsertSect = (s: SectItem) => {
    if (!onInsertText) return;
    const content = `
=== [TÔNG MÔN: ${s.name.toUpperCase()}] ===
- Trận Doanh: ${s.camp}
- Phẩm Cấp: ${s.grade}
- Trụ Sở Sơn Môn: ${s.headquarters}
- Tổ Sư & Lịch Sử: ${s.founderAndLegacy}
- Lãnh Tụ:
  + Thái Thượng Tổ Sư: ${s.leadership.patriarch}
  + Đương Kim Chưởng Môn: ${s.leadership.sectMaster}
  + Chấp Pháp Trưởng Lão: ${s.leadership.lawEnforcementElder}
  + Quy Mô Đệ Tử: ${s.leadership.discipleCount}
- Hộ Tông Đại Trận: ${s.guardianArray.name} (${s.guardianArray.tier}) - ${s.guardianArray.powerDescription}
- Công Pháp Truyền Thừa: ${s.heritageScriptures.map((sc) => `${sc.name} [${sc.grade}]`).join(' • ')}
- Trấn Phái Chí Bảo: ${s.sacredArtifacts.map((sa) => `${sa.name} [${sa.rank}]`).join(' • ')}
- Đặc Sản Tông Môn: ${s.specialties.join(', ')}
- Môn Quy Thiết Luật: ${s.rulesAndPrecepts.join('; ')}
- Cục Diện Chính Trị:
  + Đồng Minh: ${s.politicalStance.allies.join(', ')}
  + Túc Địch: ${s.politicalStance.bitterEnemies.join(', ')}
  + Nguy Cơ Hiện Tại: ${s.politicalStance.currentCrisis}
- Miêu Tả Khí Tượng: ${s.description}
==============================================
`;
    onInsertText(content.trim());
    showToast(`Đã chèn tông môn "${s.name}" vào bản thảo!`);
  };

  // Insert Villain
  const handleInsertVillain = (v: VillainItem) => {
    if (!onInsertText) return;
    const content = `
=== [NHÂN VẬT ĐỐI ĐẦU / PHẢN DIỆN: ${v.name.toUpperCase()} - ${v.title}] ===
- Loại Hình: ${v.category}
- Cảnh Giới Tu Vi: ${v.cultivationRealm}
- Tông Môn / Thế Lực: ${v.sectAffiliation}
- Vỏ Bọc Giả Tạo: ${v.publicFacade}
- Bản Chất Tàn Nhẫn: ${v.trueDarkNature}
- Âm Mưu Thâm Độc:
  ${v.deadlySchemes.map((sc, i) => `+ Kế sách ${i + 1}: ${sc}`).join('\n  ')}
- Sát Chiêu Tuyệt Tuyệt: ${v.signatureViciousMove}
- Tử Huyệt / Nhược Điểm: ${v.fatalWeakness}
- Mối Thù Truyền Kiếp: ${v.nemesisGrudge}
==============================================
`;
    onInsertText(content.trim());
    showToast(`Đã chèn phản diện "${v.name}" vào bản thảo!`);
  };

  // Insert Spy
  const handleInsertSpy = (sp: SpyItem) => {
    if (!onInsertText) return;
    const content = `
=== [ĐIỆP BÁO & NỘI GIÁN: ${sp.name.toUpperCase()}] ===
- Thân Phận Ngụy Trang: ${sp.disguisedRole}
- Lòng Trung Thực Tế: ${sp.actualLoyalty}
- Tông Môn Xâm Nhập: ${sp.infiltratedSect}
- Phân Loại: ${sp.category}
- Mật Lệnh Tối Cao: ${sp.missionObjective}
- Bí Pháp Che Giấu Khí Tức: ${sp.camouflageTechnique}
- Ám Hiệu & Tín Vật: ${sp.secretTokenOrSignal}
- Mức Độ Rủi Ro: ${sp.exposureRiskLevel}
- Giằng Xé Nội Tâm: ${sp.innerConflict}
- Sơ Hở / Tử Huyệt Dễ Bại Lộ: ${sp.fatalFlaw}
==============================================
`;
    onInsertText(content.trim());
    showToast(`Đã chèn điệp viên "${sp.name}" vào bản thảo!`);
  };

  return (
    <div className="flex flex-col h-full bg-[#080b14] text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-xl font-medium text-xs flex items-center gap-2 border border-indigo-400 animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Studio */}
      <div className="p-4 border-b border-indigo-500/20 bg-gradient-to-r from-gray-950 via-indigo-950/40 to-gray-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 shadow-inner">
            ⛩️
          </span>
          <div>
            <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-amber-200">
              TÔNG MÔN • THẾ LỰC & ĐIỆP BÁO
            </h2>
            <p className="text-[11px] text-gray-400">
              Bách Đại Tông Môn, Chính Ma Lưỡng Đạo, Phản Diện Đa Chiều & Mô Phỏng Đấu Trí
            </p>
          </div>
        </div>

        {/* Studio Subtabs */}
        <div className="flex items-center gap-1 bg-gray-900/90 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTab('sects')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'sects'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>⛩️</span> Tông Môn ({sects.length})
          </button>
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'positions'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🎖️</span> 11 Cấp Bậc & Chức Vụ
          </button>
          <button
            onClick={() => setActiveTab('villains')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'villains'
                ? 'bg-gradient-to-r from-rose-700 to-red-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🦹</span> Phản Diện ({villains.length})
          </button>
          <button
            onClick={() => setActiveTab('spies')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'spies'
                ? 'bg-gradient-to-r from-teal-700 to-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🕵️</span> Điệp Báo ({spies.length})
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'simulation'
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>⚔️</span> Mô Phỏng Đấu Trí
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>✨</span> Sáng Tạo AI
          </button>
        </div>
      </div>

      {/* ================= TAB 1: BÁCH ĐẠI TÔNG MÔN ================= */}
      {activeTab === 'sects' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Filters Bar */}
          <div className="p-3 bg-gray-900/60 border-b border-white/10 flex flex-wrap items-center gap-2 text-xs">
            {/* Search */}
            <div className="relative flex-1 min-w-[160px]">
              <input
                type="text"
                placeholder="Tìm kiếm tông môn, sơn môn, đặc sản..."
                value={searchSect}
                onChange={(e) => setSearchSect(e.target.value)}
                className="w-full bg-gray-950/80 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
              {searchSect && (
                <button
                  onClick={() => setSearchSect('')}
                  className="absolute right-2 top-1.5 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Camp Filter */}
            <select
              value={filterCamp}
              onChange={(e) => setFilterCamp(e.target.value)}
              className="bg-gray-950/80 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-indigo-300 focus:outline-none focus:border-indigo-500"
            >
              {FACTION_CAMPS.map((c) => (
                <option key={c} value={c} className="bg-gray-950 text-white">
                  Trận Doanh: {c.split('(')[0]}
                </option>
              ))}
            </select>

            {/* Grade Filter */}
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="bg-gray-950/80 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-purple-300 focus:outline-none focus:border-purple-500"
            >
              {SECT_GRADES.map((g) => (
                <option key={g} value={g} className="bg-gray-950 text-white">
                  Phẩm Cấp: {g.split('(')[0]}
                </option>
              ))}
            </select>

            <span className="text-gray-400 text-[11px] ml-auto">
              Hiển thị: <strong>{filteredSects.length}</strong> / {sects.length}
            </span>
          </div>

          {/* Main Layout: Left Sect Selector Ribbon & Right Details */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Left Sect List (Width: 280px on desktop) */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/70 overflow-y-auto custom-scrollbar p-2 space-y-1.5 shrink-0">
              {filteredSects.map((s) => {
                const isSelected = selectedSect.id === s.id;
                const isDemonic = s.camp.includes('Ma Đạo');
                const isBeast = s.camp.includes('Yêu Tộc');
                const isNeutral = s.camp.includes('Trung Lập');
                const isAncient = s.camp.includes('Ẩn Thế');

                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSectId(s.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-950/90 via-purple-950/60 to-gray-950 border-indigo-400 shadow-md ring-1 ring-indigo-500/40'
                        : 'bg-gray-900/50 hover:bg-gray-800/60 border-white/5 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          isDemonic
                            ? 'bg-red-950/90 text-red-300 border border-red-500/30'
                            : isBeast
                            ? 'bg-amber-950/90 text-amber-300 border border-amber-500/30'
                            : isNeutral
                            ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30'
                            : isAncient
                            ? 'bg-purple-950/90 text-purple-300 border border-purple-500/30'
                            : 'bg-indigo-950/90 text-indigo-300 border border-indigo-500/30'
                        }`}
                      >
                        {s.camp.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {s.grade.split('(')[0].trim()}
                      </span>
                    </div>

                    <h4
                      className={`text-xs font-bold leading-snug ${
                        isSelected ? 'text-amber-300' : 'text-white'
                      }`}
                    >
                      {s.name}
                    </h4>

                    <p className="text-[11px] text-gray-400 truncate mt-1">
                      📍 {s.headquarters}
                    </p>
                  </button>
                );
              })}

              {filteredSects.length === 0 && (
                <div className="p-6 text-center text-xs text-gray-500">
                  Không tìm thấy tông môn phù hợp với bộ lọc.
                </div>
              )}
            </div>

            {/* Right Sect Details Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-5 bg-[#090d18]">
              {selectedSect ? (
                <>
                  {/* Sect Hero Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-950 via-indigo-950/40 to-purple-950/30 border border-indigo-500/30 shadow-xl space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-900/60 text-indigo-300 border border-indigo-500/30">
                            {selectedSect.camp}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-500/30">
                            {selectedSect.grade}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-amber-300 tracking-wide">
                          {selectedSect.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                          <span>📍 Trụ sở sơn môn:</span>
                          <span className="text-gray-200 font-medium">
                            {selectedSect.headquarters}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSimSectName(selectedSect.name);
                            setActiveTab('simulation');
                            showToast(`Đã chọn ${selectedSect.name} vào Trình Mô Phỏng!`);
                          }}
                          className="px-3 py-1.5 bg-amber-600/90 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow"
                        >
                          <span>⚔️</span> Đưa vào Mô Phỏng
                        </button>
                        {onInsertText && (
                          <button
                            onClick={() => handleInsertSect(selectedSect)}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg"
                          >
                            <span>📝</span> Chèn vào Truyện
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed italic bg-black/30 p-3 rounded-xl border border-white/5">
                      "{selectedSect.description}"
                    </p>

                    {/* Tổ Sư & Lịch Sử Khai Sơn */}
                    <div className="text-xs text-gray-300 bg-gray-900/60 p-3.5 rounded-xl border border-white/5 space-y-1">
                      <span className="text-amber-400 font-bold uppercase text-[11px] tracking-wider">
                        📜 Tổ Sư Khai Sơn & Truyền Thuyết Lịch Sử:
                      </span>
                      <p className="leading-relaxed">{selectedSect.founderAndLegacy}</p>
                    </div>
                  </div>

                  {/* 4 Pillars Grid: Leadership, Defense Array, Scriptures, Artifacts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* 1. Lãnh Đạo Tối Cao */}
                    <div className="p-4 rounded-xl bg-gray-950/80 border border-indigo-500/20 space-y-2.5">
                      <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm border-b border-white/10 pb-2">
                        <span>👑</span>
                        <span>Cơ Cấu Lãnh Đạo Tối Cao</span>
                      </div>
                      <div className="space-y-1.5 text-gray-300">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-400">Thái Thượng Tổ Sư:</span>
                          <span className="text-amber-300 font-bold text-right">
                            {selectedSect.leadership.patriarch}
                          </span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-400">Đương Kim Chưởng Môn:</span>
                          <span className="text-white font-semibold text-right">
                            {selectedSect.leadership.sectMaster}
                          </span>
                        </div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-gray-400">Chấp Pháp Trưởng Lão:</span>
                          <span className="text-indigo-200 text-right">
                            {selectedSect.leadership.lawEnforcementElder}
                          </span>
                        </div>
                        <div className="flex justify-between items-start gap-2 pt-1 border-t border-white/5">
                          <span className="text-gray-400">Quy mô đệ tử:</span>
                          <span className="text-emerald-300 font-mono text-right">
                            {selectedSect.leadership.discipleCount}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 2. Hộ Tông Đại Trận */}
                    <div className="p-4 rounded-xl bg-gray-950/80 border border-amber-500/20 space-y-2.5">
                      <div className="flex items-center gap-2 text-amber-300 font-bold text-sm border-b border-white/10 pb-2">
                        <span>🛡️</span>
                        <span>Hộ Tông Đại Trận Trấn Sơn</span>
                      </div>
                      <div className="space-y-1.5 text-gray-300">
                        <p className="text-amber-200 font-bold text-sm">
                          {selectedSect.guardianArray.name}
                        </p>
                        <span className="inline-block text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-500/30">
                          {selectedSect.guardianArray.tier}
                        </span>
                        <p className="text-gray-400 text-xs leading-relaxed pt-1">
                          {selectedSect.guardianArray.powerDescription}
                        </p>
                      </div>
                    </div>

                    {/* 3. Công Pháp & Kinh Điển Truyền Thừa */}
                    <div className="p-4 rounded-xl bg-gray-950/80 border border-emerald-500/20 space-y-2.5">
                      <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm border-b border-white/10 pb-2">
                        <span>📖</span>
                        <span>Công Pháp & Kinh Điển Truyền Thừa</span>
                      </div>
                      <div className="space-y-2">
                        {selectedSect.heritageScriptures.map((scr, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-gray-900/60 border border-emerald-500/20 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-emerald-300 text-xs">
                                {scr.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 font-mono">
                                {scr.grade}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-snug">{scr.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Trấn Phái Chí Bảo & Tiên Khí */}
                    <div className="p-4 rounded-xl bg-gray-950/80 border border-purple-500/20 space-y-2.5">
                      <div className="flex items-center gap-2 text-purple-300 font-bold text-sm border-b border-white/10 pb-2">
                        <span>⚔️</span>
                        <span>Trấn Tông Thần Khí & Chí Bảo</span>
                      </div>
                      <div className="space-y-2">
                        {selectedSect.sacredArtifacts.map((art, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-gray-900/60 border border-purple-500/20 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-purple-200 text-xs">
                                {art.name}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 font-mono">
                                {art.rank}
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-400 leading-snug">{art.power}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Specialties, Rules, Geopolitical Stance */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Đặc Sản */}
                    <div className="p-3.5 rounded-xl bg-gray-950/70 border border-white/5 space-y-2">
                      <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                        <span>🌟</span> Đặc Sản & Thế Mạnh
                      </span>
                      <ul className="space-y-1 text-gray-300">
                        {selectedSect.specialties.map((sp, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-gray-400">
                            <span className="text-cyan-400">•</span> {sp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Môn Quy */}
                    <div className="p-3.5 rounded-xl bg-gray-950/70 border border-white/5 space-y-2">
                      <span className="text-rose-300 font-bold flex items-center gap-1.5">
                        <span>⚖️</span> Môn Quy Giới Luật
                      </span>
                      <ul className="space-y-1 text-gray-300">
                        {selectedSect.rulesAndPrecepts.map((rp, i) => (
                          <li key={i} className="flex items-center gap-1.5 text-gray-400">
                            <span className="text-rose-400">•</span> {rp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cục Diện Chính Trị */}
                    <div className="p-3.5 rounded-xl bg-gray-950/70 border border-white/5 space-y-2">
                      <span className="text-amber-300 font-bold flex items-center gap-1.5">
                        <span>🌐</span> Quan Hệ Thế Lực & Nguy Cơ
                      </span>
                      <div className="space-y-1 text-[11px]">
                        <p className="text-emerald-300">
                          <strong>Đồng minh:</strong>{' '}
                          {selectedSect.politicalStance.allies.join(', ')}
                        </p>
                        <p className="text-red-300">
                          <strong>Túc địch:</strong>{' '}
                          {selectedSect.politicalStance.bitterEnemies.join(', ')}
                        </p>
                        <p className="text-amber-200/90 pt-1 border-t border-white/5">
                          <strong>Nguy cơ hiện tại:</strong>{' '}
                          {selectedSect.politicalStance.currentCrisis}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-gray-500">Hãy chọn một tông môn để xem chi tiết.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: 11 CẤP BẬC & CHỨC VỤ TÔNG MÔN ================= */}
      {activeTab === 'positions' && (() => {
        const selectedPos = positions.find((p) => p.id === selectedPositionId) || positions[0];
        const filteredPositions = positions.filter((p) =>
          !searchPosition.trim() ||
          p.rankName.toLowerCase().includes(searchPosition.toLowerCase()) ||
          p.scopeOfAuthority.toLowerCase().includes(searchPosition.toLowerCase())
        );

        const handleAssignCharacterToPosition = () => {
          if (!onUpdateCharacters || !assignCharId) return;
          const currentSect = sects.find((s) => s.id === selectedSectId) || sects[0];
          const updatedChars = characters.map((c) => {
            if (c.id === assignCharId) {
              return {
                ...c,
                factionPosition: selectedPos.rankName,
                sectOrFaction: currentSect.name,
              };
            }
            return c;
          });
          onUpdateCharacters(updatedChars);
          const assignedChar = characters.find((c) => c.id === assignCharId);
          showToast(`Đã bổ nhiệm ${assignedChar?.name || 'nhân vật'} đảm nhiệm: ${selectedPos.rankName}!`);
        };

        const handleSimulatePromotion = async () => {
          const promoChar = characters.find((c) => c.id === promoCharId) || characters[0];
          const currentSect = sects.find((s) => s.id === selectedSectId) || sects[0];
          if (!promoChar) {
            alert('Vui lòng chọn nhân vật để mô phỏng lễ tấn thăng!');
            return;
          }
          setIsPromoting(true);
          setPromotionResult(null);
          try {
            const res = await simulateSectPromotion({
              character: promoChar,
              targetPosition: selectedPos,
              previousPosition: promoPrevRank,
              sectName: currentSect.name,
              genre,
            });
            setPromotionResult(res);
            showToast('Đại lễ tấn thăng hoàn tất!');
          } catch (err: any) {
            showToast('Lỗi mô phỏng tấn thăng: ' + err.message);
          } finally {
            setIsPromoting(false);
          }
        };

        const handleInsertPosition = () => {
          if (!onInsertText) return;
          const content = `
=== [CHỨC VỤ TÔNG MÔN: ${selectedPos.rankName.toUpperCase()}] ===
- Phẩm Cấp & Thứ Bậc: ${selectedPos.tier} (Cấp ${selectedPos.levelNumber || '1'})
- Yêu Cầu Cảnh Giới: ${selectedPos.requiredCultivationRealm || 'Luyện Khí Kỳ'}
- Quyền Hạn Tối Cao: ${selectedPos.scopeOfAuthority}
- Trách Nhiệm Thiết Yếu:
  ${(selectedPos.keyResponsibilities || []).map((r, i) => `+ ${i + 1}. ${r}`).join('\n  ')}
- Bổng Lộc Tài Nguyên Hàng Tháng: ${selectedPos.resourceMonthlyStipend}
- Nơi Ở / Động Phủ: ${selectedPos.residenceArea}
- Tiêu Chuẩn Tấn Thăng: ${selectedPos.advancementCriteria}
- Phục Sức & Lệnh Bài: ${selectedPos.clothingAndToken}
- Giới Luật & Tội Danh Thường Gặp: ${selectedPos.commonInternalCrimes}
- Hình Phạt Kỷ Luật: ${selectedPos.disciplinePenalty || 'Đánh gậy hoặc phế tu vi'}
=========================================================
`;
          onInsertText(content.trim());
          showToast(`Đã chèn chức vụ "${selectedPos.rankName}" vào bản thảo!`);
        };

        return (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Top Bar */}
            <div className="p-3 bg-gray-900/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Tìm kiếm cấp bậc, chức vụ, quyền hạn..."
                  value={searchPosition}
                  onChange={(e) => setSearchPosition(e.target.value)}
                  className="w-full max-w-sm bg-gray-950/80 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/40 font-bold">
                  11 Cấp Bậc Chuẩn Tiên Hiệp
                </span>
                <span>Từ Tạp Dịch đến Thái Thượng Lão Tổ</span>
              </div>
            </div>

            {/* Positions Layout */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
              {/* Left Ladder Ribbon */}
              <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/60 flex flex-col shrink-0 overflow-y-auto custom-scrollbar p-2 space-y-1.5">
                {filteredPositions.map((p) => {
                  const isSelected = p.id === selectedPos.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPositionId(p.id);
                        setPromotionResult(null);
                      }}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-950/80 to-yellow-950/40 border-amber-500/70 shadow-md shadow-amber-950/30'
                          : 'bg-gray-900/50 border-white/5 hover:border-white/20 hover:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800/40">
                          Cấp {p.levelNumber || '1'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {p.requiredCultivationRealm?.split('/')[0]?.trim()}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-vip-gold mt-1 line-clamp-1">{p.rankName}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-snug">
                        {p.scopeOfAuthority}
                      </p>
                      <div className="text-[10px] text-amber-400/80 mt-1.5 pt-1.5 border-t border-white/5 truncate font-mono">
                        💰 {p.resourceMonthlyStipend}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Detail Inspector */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                {/* Hero Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-amber-500/30 shadow-xl space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-white/10 gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                          {selectedPos.tier}
                        </span>
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/40">
                          Cảnh giới: {selectedPos.requiredCultivationRealm}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-vip-gold mt-2">{selectedPos.rankName}</h3>
                    </div>

                    <div className="flex items-center gap-2 self-start md:self-auto">
                      <button
                        onClick={handleInsertPosition}
                        className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow flex items-center gap-1.5"
                      >
                        <span>📝</span> Chèn Vào Truyện
                      </button>
                    </div>
                  </div>

                  {/* Scope of Authority */}
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-amber-500/20 text-xs space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1.5 font-bold">
                      <span>👑</span> Quyền Hạn & Phạm Vi Quản Hạt:
                    </strong>
                    <p className="text-gray-200 leading-relaxed">{selectedPos.scopeOfAuthority}</p>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-2 text-xs">
                    <strong className="text-red-300 flex items-center gap-1.5 font-bold">
                      <span>📜</span> Trách Nhiệm & Trọng Trách Thiết Yếu:
                    </strong>
                    <ul className="list-disc list-inside text-gray-300 space-y-1.5 leading-relaxed">
                      {(selectedPos.keyResponsibilities || []).map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Monthly Stipend & Residence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-emerald-500/20 space-y-2">
                      <strong className="text-emerald-300 flex items-center gap-1.5 font-bold">
                        <span>💰</span> Bổng Lộc Tài Nguyên Hàng Tháng:
                      </strong>
                      <p className="text-gray-200 font-medium">{selectedPos.resourceMonthlyStipend}</p>
                      {selectedPos.stipendDetails && (
                        <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-gray-400">
                          <p>• Linh thạch: <span className="text-emerald-400 font-bold">{selectedPos.stipendDetails.spiritStones}</span></p>
                          <p>• Đan dược: <span className="text-amber-300 font-bold">{selectedPos.stipendDetails.pills}</span></p>
                          {selectedPos.stipendDetails.specialPrivileges && (
                            <p>• Đặc quyền: <span className="text-purple-300">{selectedPos.stipendDetails.specialPrivileges}</span></p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-gray-900/80 border border-cyan-500/20 space-y-2">
                      <strong className="text-cyan-300 flex items-center gap-1.5 font-bold">
                        <span>🏡</span> Nơi Cư Ngụ & Động Phủ:
                      </strong>
                      <p className="text-gray-200 leading-relaxed">{selectedPos.residenceArea}</p>
                    </div>
                  </div>

                  {/* Advancement Criteria & Token/Robes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 space-y-2">
                      <strong className="text-purple-300 flex items-center gap-1.5 font-bold">
                        <span>🎯</span> Tiêu Chuẩn & Khảo Hạch Tấn Thăng:
                      </strong>
                      <p className="text-gray-200 leading-relaxed">{selectedPos.advancementCriteria}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-900/80 border border-amber-500/20 space-y-2">
                      <strong className="text-vip-gold flex items-center gap-1.5 font-bold">
                        <span>🎴</span> Phục Sức & Lệnh Bài Trấn Thân:
                      </strong>
                      <p className="text-gray-200 leading-relaxed">{selectedPos.clothingAndToken}</p>
                      {selectedPos.tokenAndRobes && (
                        <div className="pt-2 border-t border-white/5 space-y-1 text-[11px] text-gray-400">
                          <p>• Chất liệu lệnh bài: <span className="text-amber-300">{selectedPos.tokenAndRobes.tokenMaterial}</span></p>
                          <p>• Màu sắc đạo bào: <span className="text-purple-300">{selectedPos.tokenAndRobes.robeColor}</span></p>
                          <p>• Phù văn huy hiệu: <span className="text-cyan-300">{selectedPos.tokenAndRobes.insignia}</span></p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Discipline & Penalties */}
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-2">
                    <strong className="text-rose-400 flex items-center gap-1.5 font-bold">
                      <span>⚖️</span> Tội Danh Thường Gặp & Giới Luật Trừng Phạt:
                    </strong>
                    <p className="text-gray-300">
                      <strong>Hành vi vi phạm:</strong> {selectedPos.commonInternalCrimes}
                    </p>
                    {selectedPos.disciplinePenalty && (
                      <p className="text-rose-300/90">
                        <strong>Hình phạt môn quy:</strong> {selectedPos.disciplinePenalty}
                      </p>
                    )}
                  </div>

                  {/* Promotion Ceremony Narrative Snippet */}
                  {selectedPos.promotionCeremonyNarrative && (
                    <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs space-y-1.5">
                      <strong className="text-blue-300 flex items-center gap-1.5 font-bold">
                        <span>🔔</span> Đại Lễ Thụ Phong Tiêu Biểu:
                      </strong>
                      <p className="text-gray-200 italic leading-relaxed">
                        "{selectedPos.promotionCeremonyNarrative}"
                      </p>
                    </div>
                  )}

                  {/* Character Assignment Bar */}
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs text-white font-bold flex items-center gap-1.5">
                        <span>👤</span> Bổ Nhiệm Nhân Vật Đảm Nhiệm Chức Vụ Này:
                      </strong>
                      <span className="text-[11px] text-gray-400">
                        Cập nhật hồ sơ nhân vật trong tiểu thuyết
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <select
                        value={assignCharId}
                        onChange={(e) => setAssignCharId(e.target.value)}
                        className="flex-1 bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {characters.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.realmOrRank} • {c.factionPosition || 'Chưa có chức vụ'})
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAssignCharacterToPosition}
                        className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white rounded-xl text-xs font-bold shadow"
                      >
                        Bổ Nhiệm Ngay
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Promotion Ceremony Simulator */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-yellow-500/30 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <h4 className="text-sm font-bold text-vip-gold uppercase tracking-wider">
                          Mô Phỏng Đại Lễ Tấn Thăng Chức Vụ Bằng AI
                        </h4>
                        <p className="text-xs text-gray-400">
                          Viết đại điển bái tổ, tiếng chuông đồng Cửu Tiêu và thụ phong trước mười vạn môn đồ
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-gray-300 font-bold block">Nhân Vật Tấn Thăng:</label>
                      <select
                        value={promoCharId}
                        onChange={(e) => setPromoCharId(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                      >
                        {characters.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.realmOrRank})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-300 font-bold block">Chức Vụ Trước Khi Tấn Thăng:</label>
                      <input
                        type="text"
                        value={promoPrevRank}
                        onChange={(e) => setPromoPrevRank(e.target.value)}
                        placeholder="VD: Ngoại Môn Đệ Tử"
                        className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSimulatePromotion}
                    disabled={isPromoting}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {isPromoting ? (
                      <span>ĐANG VIẾT ĐẠI LỄ TẤN THĂNG TRƯỚC MƯỜI VẠN ĐỆ TỬ...</span>
                    ) : (
                      <>
                        <span>🔔</span>
                        <span>MÔ PHỎNG ĐẠI LỄ TẤN THĂNG LÊN [{selectedPos.rankName.toUpperCase()}]</span>
                      </>
                    )}
                  </button>

                  {/* Promotion Result Display */}
                  {promotionResult && (
                    <div className="p-5 rounded-2xl bg-black/60 border border-amber-500/30 space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/40">
                            THỤ PHONG THÀNH CÔNG
                          </span>
                          <h4 className="text-base font-bold text-vip-gold mt-1">
                            {promotionResult.characterName} ➔ {promotionResult.promotedRank}
                          </h4>
                        </div>
                        {onInsertText && (
                          <button
                            onClick={() => {
                              onInsertText(
                                `[ĐẠI LỄ TẤN THĂNG: ${promotionResult.characterName} - ${promotionResult.promotedRank}]\n` +
                                `- Tông môn: ${promotionResult.sectName}\n` +
                                `- Chiến tích khảo hạch: ${promotionResult.trialPassed}\n` +
                                `- Bổng lộc & Quyền hạn: ${promotionResult.newPrivilegesAndStipend}\n` +
                                `- Trao lệnh bài: ${promotionResult.tokenBestowed}\n\n` +
                                `${promotionResult.novelSceneSnippet}`
                              );
                              showToast('Đã chèn phân cảnh đại lễ tấn thăng vào truyện!');
                            }}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                          >
                            Chèn Vào Truyện
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-gray-900/80 rounded-xl border border-white/5 space-y-1">
                          <strong className="text-amber-300">Quang Cảnh Đại Lễ:</strong>
                          <p className="text-gray-300 leading-relaxed">{promotionResult.ceremonyNarrative}</p>
                        </div>
                        <div className="p-3 bg-gray-900/80 rounded-xl border border-white/5 space-y-1">
                          <strong className="text-emerald-300">Chiến Tích Vượt Qua:</strong>
                          <p className="text-gray-300 leading-relaxed">{promotionResult.trialPassed}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-950/80 rounded-xl border border-white/5 space-y-2">
                        <strong className="text-xs text-amber-300 block font-bold">
                          Trích Đoạn Văn Xuôi Tiểu Thuyết:
                        </strong>
                        <p className="text-gray-200 leading-relaxed text-xs whitespace-pre-line font-serif max-h-60 overflow-y-auto custom-scrollbar">
                          {promotionResult.novelSceneSnippet}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ================= TAB 2: HỆ THỐNG PHẢN DIỆN (VILLAINS) ================= */}
      {activeTab === 'villains' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Filters Bar */}
          <div className="p-3 bg-gray-900/60 border-b border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <div className="relative flex-1 min-w-[160px]">
              <input
                type="text"
                placeholder="Tìm phản diện, danh hiệu, tông môn..."
                value={searchVillain}
                onChange={(e) => setSearchVillain(e.target.value)}
                className="w-full bg-gray-950/80 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
              {searchVillain && (
                <button
                  onClick={() => setSearchVillain('')}
                  className="absolute right-2 top-1.5 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={filterVillainCat}
              onChange={(e) => setFilterVillainCat(e.target.value)}
              className="bg-gray-950/80 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-rose-300 focus:outline-none focus:border-rose-500"
            >
              {VILLAIN_CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-gray-950 text-white">
                  {c}
                </option>
              ))}
            </select>

            <span className="text-gray-400 text-[11px] ml-auto">
              Hiển thị: <strong>{filteredVillains.length}</strong> / {villains.length}
            </span>
          </div>

          {/* Villains Layout */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Left Ribbon */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/70 overflow-y-auto custom-scrollbar p-2 space-y-1.5 shrink-0">
              {filteredVillains.map((v) => {
                const isSelected = selectedVillain.id === v.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVillainId(v.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-950/90 via-red-950/60 to-gray-950 border-rose-400 shadow-md ring-1 ring-rose-500/40'
                        : 'bg-gray-900/50 hover:bg-gray-800/60 border-white/5 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/30 truncate max-w-[170px]">
                        {v.category.split('/')[0]}
                      </span>
                      <span className="text-[10px] text-amber-300 font-mono">
                        {v.cultivationRealm.split('(')[0]}
                      </span>
                    </div>

                    <h4
                      className={`text-xs font-bold leading-snug ${
                        isSelected ? 'text-amber-300' : 'text-white'
                      }`}
                    >
                      {v.name} • <span className="text-gray-400 font-normal">{v.title}</span>
                    </h4>

                    <p className="text-[11px] text-gray-400 truncate mt-1">
                      🏛️ {v.sectAffiliation}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Villain Details */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-5 bg-[#090d18]">
              {selectedVillain && (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-950 via-rose-950/30 to-red-950/30 border border-rose-500/30 shadow-xl space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-900/60 text-rose-300 border border-rose-500/30">
                            {selectedVillain.category}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-900/60 text-amber-300 border border-amber-500/30 font-mono">
                            {selectedVillain.cultivationRealm}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-rose-300">
                          {selectedVillain.name}
                        </h3>
                        <p className="text-xs text-amber-200/90 font-medium">
                          {selectedVillain.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          🏛️ Thuộc thế lực: <span className="text-gray-200">{selectedVillain.sectAffiliation}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSimEnemyName(selectedVillain.name);
                            setActiveTab('simulation');
                            showToast(`Đã chọn ${selectedVillain.name} làm đối thủ trong Mô Phỏng!`);
                          }}
                          className="px-3 py-1.5 bg-amber-600/90 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow"
                        >
                          <span>⚔️</span> Đưa vào Mô Phỏng
                        </button>
                        {onInsertText && (
                          <button
                            onClick={() => handleInsertVillain(selectedVillain)}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-600 hover:to-red-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg"
                          >
                            <span>📝</span> Chèn vào Truyện
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Mask vs True Dark Nature */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 rounded-xl bg-gray-900/80 border border-indigo-500/20 space-y-1.5">
                        <span className="text-indigo-300 font-bold flex items-center gap-1.5 text-xs">
                          <span>🎭</span> Vỏ Bọc Giả Tạo Trước Thiên Hạ:
                        </span>
                        <p className="text-gray-300 leading-relaxed text-[11px]">
                          {selectedVillain.publicFacade}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 space-y-1.5">
                        <span className="text-red-400 font-bold flex items-center gap-1.5 text-xs">
                          <span>😈</span> Bản Chất Tàn Nhẫn Sâu Kín:
                        </span>
                        <p className="text-gray-300 leading-relaxed text-[11px]">
                          {selectedVillain.trueDarkNature}
                        </p>
                      </div>
                    </div>

                    {/* Deadly Schemes */}
                    <div className="p-4 rounded-xl bg-gray-950/80 border border-white/10 space-y-2 text-xs">
                      <span className="text-amber-300 font-bold flex items-center gap-1.5 text-xs">
                        <span>🕸️</span> Các Âm Mưu Thâm Độc Đang Toan Tính:
                      </span>
                      <div className="space-y-1.5">
                        {selectedVillain.deadlySchemes.map((sch, i) => (
                          <div key={i} className="flex items-start gap-2 text-gray-300">
                            <span className="text-rose-400 font-bold">[{i + 1}]</span>
                            <p className="leading-snug">{sch}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Combat Details: Sát Chiêu, Tử Huyệt, Ân Oán */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-gray-900/60 border border-purple-500/20 space-y-1">
                        <span className="text-purple-300 font-bold flex items-center gap-1">
                          <span>⚡</span> Sát Chiêu Tuyệt Tuyệt:
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedVillain.signatureViciousMove}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-gray-900/60 border border-amber-500/20 space-y-1">
                        <span className="text-amber-300 font-bold flex items-center gap-1">
                          <span>🎯</span> Tử Huyệt / Sơ Hở Chí Mạng:
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedVillain.fatalWeakness}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-gray-900/60 border border-rose-500/20 space-y-1">
                        <span className="text-rose-300 font-bold flex items-center gap-1">
                          <span>🩸</span> Thâm Thù Ân Oán:
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedVillain.nemesisGrudge}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ĐIỆP BÁO & NỘI GIÁN (SPIES) ================= */}
      {activeTab === 'spies' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Filters Bar */}
          <div className="p-3 bg-gray-900/60 border-b border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <div className="relative flex-1 min-w-[160px]">
              <input
                type="text"
                placeholder="Tìm nội gián, thân phận ngụy trang, thế lực..."
                value={searchSpy}
                onChange={(e) => setSearchSpy(e.target.value)}
                className="w-full bg-gray-950/80 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-teal-500"
              />
              {searchSpy && (
                <button
                  onClick={() => setSearchSpy('')}
                  className="absolute right-2 top-1.5 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <select
              value={filterSpyCat}
              onChange={(e) => setFilterSpyCat(e.target.value)}
              className="bg-gray-950/80 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-teal-300 focus:outline-none focus:border-teal-500"
            >
              {SPY_CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-gray-950 text-white">
                  {c}
                </option>
              ))}
            </select>

            <span className="text-gray-400 text-[11px] ml-auto">
              Hiển thị: <strong>{filteredSpies.length}</strong> / {spies.length}
            </span>
          </div>

          {/* Spies Layout */}
          <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
            {/* Left Ribbon */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/70 overflow-y-auto custom-scrollbar p-2 space-y-1.5 shrink-0">
              {filteredSpies.map((sp) => {
                const isSelected = selectedSpy.id === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => setSelectedSpyId(sp.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-r from-teal-950/90 via-emerald-950/60 to-gray-950 border-teal-400 shadow-md ring-1 ring-teal-500/40'
                        : 'bg-gray-900/50 hover:bg-gray-800/60 border-white/5 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-500/30 truncate max-w-[170px]">
                        {sp.category.split('(')[0]}
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono">
                        {sp.infiltratedSect.split('(')[0]}
                      </span>
                    </div>

                    <h4
                      className={`text-xs font-bold leading-snug ${
                        isSelected ? 'text-teal-300' : 'text-white'
                      }`}
                    >
                      {sp.name} • <span className="text-gray-400 font-normal">{sp.disguisedRole}</span>
                    </h4>

                    <p className="text-[11px] text-gray-400 truncate mt-1">
                      🛡️ Trung thành: {sp.actualLoyalty}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Spy Details */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-5 bg-[#090d18]">
              {selectedSpy && (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-950 via-teal-950/30 to-emerald-950/30 border border-teal-500/30 shadow-xl space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-900/60 text-teal-300 border border-teal-500/30">
                            {selectedSpy.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-teal-300">{selectedSpy.name}</h3>
                        <p className="text-xs text-amber-200 mt-0.5">
                          Vỏ bọc: <strong>{selectedSpy.disguisedRole}</strong>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Nằm vùng tại: <span className="text-gray-200">{selectedSpy.infiltratedSect}</span> | Trung thành: <span className="text-emerald-400 font-semibold">{selectedSpy.actualLoyalty}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSimEnemyName(selectedSpy.name);
                            setActiveTab('simulation');
                            showToast(`Đã chọn ${selectedSpy.name} vào Trình Mô Phỏng!`);
                          }}
                          className="px-3 py-1.5 bg-amber-600/90 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow"
                        >
                          <span>⚔️</span> Đưa vào Mô Phỏng
                        </button>
                        {onInsertText && (
                          <button
                            onClick={() => handleInsertSpy(selectedSpy)}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-600 hover:to-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg"
                          >
                            <span>📝</span> Chèn vào Truyện
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Mission Objective & Camouflage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 rounded-xl bg-gray-900/80 border border-teal-500/20 space-y-1.5">
                        <span className="text-teal-300 font-bold flex items-center gap-1.5 text-xs">
                          <span>🎯</span> Mật Lệnh Tối Thượng:
                        </span>
                        <p className="text-gray-300 leading-relaxed text-[11px]">
                          {selectedSpy.missionObjective}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-gray-900/80 border border-emerald-500/20 space-y-1.5">
                        <span className="text-emerald-300 font-bold flex items-center gap-1.5 text-xs">
                          <span>🌫️</span> Bí Pháp Ẩn Tức & Che Giấu Khí Tức:
                        </span>
                        <p className="text-gray-300 leading-relaxed text-[11px]">
                          {selectedSpy.camouflageTechnique}
                        </p>
                      </div>
                    </div>

                    {/* Tokens & Risk */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 rounded-xl bg-gray-950/80 border border-white/10 space-y-1.5">
                        <span className="text-amber-300 font-bold flex items-center gap-1.5 text-xs">
                          <span>📿</span> Ám Hiệu & Tín Vật Bí Mật:
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedSpy.secretTokenOrSignal}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 space-y-1.5">
                        <span className="text-red-400 font-bold flex items-center gap-1.5 text-xs">
                          <span>⚠️</span> Mức Độ Nguy Cơ Bại Lộ:
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedSpy.exposureRiskLevel}
                        </p>
                      </div>
                    </div>

                    {/* Inner Conflict & Fatal Flaw */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3.5 rounded-xl bg-gray-950/80 border border-indigo-500/20 space-y-1.5">
                        <span className="text-indigo-300 font-bold flex items-center gap-1.5 text-xs">
                          <span>💔</span> Giằng Xé Nội Tâm Sâu Sắc:
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedSpy.innerConflict}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-gray-950/80 border border-yellow-500/20 space-y-1.5">
                        <span className="text-yellow-300 font-bold flex items-center gap-1.5 text-xs">
                          <span>🔍</span> Sơ Hở Vô Thức / Tử Huyệt Dễ Lộ:
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {selectedSpy.fatalFlaw}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: MÔ PHỎNG ĐẤU TRÍ & XUNG ĐỘT (SIMULATOR) ================= */}
      {activeTab === 'simulation' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Setup Form */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-amber-950/20 to-gray-950 border border-amber-500/30 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="text-xl">⚔️</span>
                <div>
                  <h3 className="text-base font-bold text-amber-300">
                    TRÌNH MÔ PHỎNG ĐẤU TRÍ & XUNG ĐỘT TÔNG MÔN
                  </h3>
                  <p className="text-xs text-gray-400">
                    Mô phỏng bằng AI các đại biến cố, thanh trừng gián điệp, tranh đoạt bí cảnh và huyết chiến sơn môn
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* 1. Kịch bản */}
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Kịch Bản Xung Đột:</label>
                  <select
                    value={simScenario}
                    onChange={(e) => setSimScenario(e.target.value)}
                    className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-amber-200 focus:outline-none focus:border-amber-500"
                  >
                    {CONFLICT_SCENARIOS.map((sc) => (
                      <option key={sc} value={sc}>
                        {sc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Tông Môn */}
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Tông Môn / Trận Địa:</label>
                  <input
                    type="text"
                    value={simSectName}
                    onChange={(e) => setSimSectName(e.target.value)}
                    placeholder="Ví dụ: Thái Hư Kiếm Tông"
                    className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* 3. Phản Diện / Nội Gián */}
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Kẻ Đối Đầu / Nội Gián:</label>
                  <input
                    type="text"
                    value={simEnemyName}
                    onChange={(e) => setSimEnemyName(e.target.value)}
                    placeholder="Ví dụ: Cố Thanh Hà / Huyết Lệ Ma Hoàng"
                    className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-rose-300 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* 4. Nhân vật chính */}
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Nhân Vật Chính / Phe Can Dự:</label>
                  <input
                    type="text"
                    value={simProtagName}
                    onChange={(e) => setSimProtagName(e.target.value)}
                    placeholder="Ví dụ: Lâm Phong"
                    className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-emerald-300 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Tình tiết bổ sung */}
              <div className="space-y-1.5 text-xs">
                <label className="text-gray-300 font-bold">Ý Tưởng / Tình Tiết Cụ Thể (Tùy chọn):</label>
                <textarea
                  rows={2}
                  value={simCustomContext}
                  onChange={(e) => setSimCustomContext(e.target.value)}
                  placeholder="Ví dụ: Âm mưu phát tác ngay tại Đại Lễ Bái Sư của Chưởng Môn, đâm lén từ sau lưng khi kích hoạt trận pháp..."
                  className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Action Button */}
              <button
                disabled={isSimulating}
                onClick={handleRunSimulation}
                className="w-full py-3 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
              >
                {isSimulating ? (
                  <>
                    <span className="animate-spin text-base">⏳</span>
                    <span>AI Đang Diễn Toán Chiến Cuộc & Mưu Mô...</span>
                  </>
                ) : (
                  <>
                    <span>⚔️</span>
                    <span>Khởi Động Mô Phỏng Xung Đột Bằng AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulation Result Display */}
            {simResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-amber-500/40 shadow-2xl space-y-5 animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
                      {simResult.scenarioType}
                    </span>
                    <h3 className="text-lg font-black text-amber-300 mt-1">
                      {simResult.scenarioTitle}
                    </h3>
                  </div>

                  {onInsertText && (
                    <button
                      onClick={() => {
                        const text = `
=== [KỊCH BẢN XUNG ĐỘT: ${simResult.scenarioTitle}] ===
- Bối Cảnh: ${simResult.situationOverview}
- Mưu Mô: ${simResult.thePlotScheme}
- Biến Cố & Phản Bội: ${simResult.turningPointAndBetrayal}
- Cao Trào Chiến Đấu: ${simResult.battleActionClimax}
- Kết Cục: ${simResult.resolutionAndCasualties}

[GỢI Ý TÁC GIẢ]
${simResult.authorPlotHooks.join('\n')}

[TRÍCH ĐOẠN VĂN CHƯƠNG]
${simResult.novelSceneSnippet}
==============================================
`;
                        onInsertText(text.trim());
                        showToast('Đã chèn toàn bộ kịch bản vào truyện!');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
                    >
                      <span>📝</span> Chèn Toàn Bộ Vào Truyện
                    </button>
                  )}
                </div>

                {/* 5 Scenario Steps */}
                <div className="space-y-4 text-xs">
                  {/* 1. Tình huống tổng quan */}
                  <div className="p-3.5 rounded-xl bg-gray-900/70 border border-white/5 space-y-1">
                    <span className="text-indigo-300 font-bold uppercase text-[11px] flex items-center gap-1.5">
                      <span>1️⃣</span> Tình Huống Tổng Quan:
                    </span>
                    <p className="text-gray-300 leading-relaxed">{simResult.situationOverview}</p>
                  </div>

                  {/* 2. Mưu mô thâm độc */}
                  <div className="p-3.5 rounded-xl bg-gray-900/70 border border-red-500/20 space-y-1">
                    <span className="text-rose-300 font-bold uppercase text-[11px] flex items-center gap-1.5">
                      <span>2️⃣</span> Mưu Mô Thâm Độc Vạch Sẵn:
                    </span>
                    <p className="text-gray-300 leading-relaxed">{simResult.thePlotScheme}</p>
                  </div>

                  {/* 3. Bước ngoặt phản trắc */}
                  <div className="p-3.5 rounded-xl bg-gray-900/70 border border-amber-500/20 space-y-1">
                    <span className="text-amber-300 font-bold uppercase text-[11px] flex items-center gap-1.5">
                      <span>3️⃣</span> Bước Ngoặt Phản Trắc & Khoảnh Khắc Bại Lộ:
                    </span>
                    <p className="text-gray-300 leading-relaxed">{simResult.turningPointAndBetrayal}</p>
                  </div>

                  {/* 4. Cao trào chiến đấu */}
                  <div className="p-3.5 rounded-xl bg-gray-900/70 border border-purple-500/20 space-y-1">
                    <span className="text-purple-300 font-bold uppercase text-[11px] flex items-center gap-1.5">
                      <span>4️⃣</span> Cao Trào Chiến Đấu & Đại Sát Chiêu:
                    </span>
                    <p className="text-gray-300 leading-relaxed">{simResult.battleActionClimax}</p>
                  </div>

                  {/* 5. Kết cục & thương vong */}
                  <div className="p-3.5 rounded-xl bg-gray-900/70 border border-emerald-500/20 space-y-1">
                    <span className="text-emerald-300 font-bold uppercase text-[11px] flex items-center gap-1.5">
                      <span>5️⃣</span> Kết Cục, Thương Vong & Thế Cuộc Mới:
                    </span>
                    <p className="text-gray-300 leading-relaxed">{simResult.resolutionAndCasualties}</p>
                  </div>
                </div>

                {/* Plot Hooks for Author */}
                <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-2 text-xs">
                  <span className="text-amber-300 font-bold flex items-center gap-1.5">
                    <span>💡</span> Gợi Ý Phát Triển Cốt Truyện (Author Plot Hooks):
                  </span>
                  <ul className="space-y-1 text-gray-300">
                    {simResult.authorPlotHooks.map((hk, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{hk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Novel Scene Snippet */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-vip-gold font-bold flex items-center gap-1.5 text-xs">
                      <span>📜</span> Trích Đoạn Tiểu Thuyết Mẫu Mực (500–700 từ):
                    </span>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          onInsertText(simResult.novelSceneSnippet);
                          showToast('Đã chèn trích đoạn văn chương vào bản thảo!');
                        }}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-bold"
                      >
                        Chèn Trích Đoạn Này
                      </button>
                    )}
                  </div>
                  <div className="text-gray-300 whitespace-pre-line leading-relaxed font-serif bg-gray-950/70 p-4 rounded-lg border border-white/5">
                    {simResult.novelSceneSnippet}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 5: TRÌNH SÁNG TẠO AI (GENERATOR) ================= */}
      {activeTab === 'generator' && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-violet-950/20 to-gray-950 border border-violet-500/30 shadow-xl space-y-5">
              <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="text-xl">✨</span>
                <div>
                  <h3 className="text-base font-bold text-violet-300">
                    SÁNG TẠO TÔNG MÔN • PHẢN DIỆN • ĐIỆP BÁO BẰNG AI
                  </h3>
                  <p className="text-xs text-gray-400">
                    Tùy biến khởi tạo thực thể mới theo ý tưởng riêng và lưu vào kho dữ liệu
                  </p>
                </div>
              </div>

              {/* Entity Type Toggle */}
              <div className="flex items-center gap-2 bg-gray-900 p-1.5 rounded-xl border border-white/10 text-xs">
                <button
                  onClick={() => setGenEntityType('sect')}
                  className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                    genEntityType === 'sect'
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>⛩️</span> Tông Môn Mới
                </button>
                <button
                  onClick={() => setGenEntityType('villain')}
                  className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                    genEntityType === 'villain'
                      ? 'bg-rose-700 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🦹</span> Phản Diện Mới
                </button>
                <button
                  onClick={() => setGenEntityType('spy')}
                  className={`flex-1 py-2 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                    genEntityType === 'spy'
                      ? 'bg-teal-700 text-white shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🕵️</span> Điệp Báo Mới
                </button>
              </div>

              {/* Dynamic Inputs Based on Entity Type */}
              <div className="space-y-4 text-xs">
                {genEntityType === 'sect' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-gray-300 font-bold">Trận Doanh:</label>
                      <select
                        value={genCamp}
                        onChange={(e) => setGenCamp(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-indigo-200 focus:outline-none"
                      >
                        {FACTION_CAMPS.filter((c) => c !== 'Tất Cả').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-300 font-bold">Phẩm Cấp Tông Môn:</label>
                      <select
                        value={genGrade}
                        onChange={(e) => setGenGrade(e.target.value)}
                        className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-purple-200 focus:outline-none"
                      >
                        {SECT_GRADES.filter((g) => g !== 'Tất Cả').map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {genEntityType === 'villain' && (
                  <div className="space-y-1">
                    <label className="text-gray-300 font-bold">Hình Mẫu Phản Diện:</label>
                    <select
                      value={genCategory}
                      onChange={(e) => setGenCategory(e.target.value)}
                      className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-rose-300 focus:outline-none"
                    >
                      {VILLAIN_CATEGORIES.filter((c) => c !== 'Tất Cả').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {genEntityType === 'spy' && (
                  <div className="space-y-1">
                    <label className="text-gray-300 font-bold">Loại Hình Gián Điệp:</label>
                    <select
                      value={genCategory}
                      onChange={(e) => setGenCategory(e.target.value)}
                      className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-teal-300 focus:outline-none"
                    >
                      {SPY_CATEGORIES.filter((c) => c !== 'Tất Cả').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* User Prompt */}
                <div className="space-y-1">
                  <label className="text-gray-300 font-bold">Ý Tưởng Sáng Tạo Cụ Thể:</label>
                  <textarea
                    rows={3}
                    value={genPrompt}
                    onChange={(e) => setGenPrompt(e.target.value)}
                    placeholder="Mô tả ý tưởng về phong cách, sở trường, vũ khí, bối cảnh đặc biệt..."
                    className="w-full bg-gray-900 border border-white/10 rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={isGenerating}
                onClick={handleGenerateEntity}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin text-base">⏳</span>
                    <span>AI Đang Thiết Kế Chi Tiết...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Tạo Mới Bằng Trí Tuệ Nhân Tạo</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Entity Preview */}
            {generatedEntity && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-violet-500/40 shadow-2xl space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-500/30 font-bold">
                      {genEntityType === 'villain'
                        ? 'Phản Diện Tạo Mới'
                        : genEntityType === 'spy'
                        ? 'Điệp Viên Tạo Mới'
                        : 'Tông Môn Tạo Mới'}
                    </span>
                    <h3 className="text-lg font-black text-amber-300 mt-1">
                      {generatedEntity.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveGeneratedEntity}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
                    >
                      <span>💾</span> Lưu Vào Kho Dữ Liệu
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          if (genEntityType === 'villain') handleInsertVillain(generatedEntity);
                          else if (genEntityType === 'spy') handleInsertSpy(generatedEntity);
                          else handleInsertSect(generatedEntity);
                        }}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                      >
                        Chèn Vào Truyện
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-xs text-gray-300 space-y-2 bg-gray-900/60 p-4 rounded-xl border border-white/5">
                  <p>
                    <strong>Mô tả tổng quan:</strong>{' '}
                    {generatedEntity.description ||
                      generatedEntity.publicFacade ||
                      generatedEntity.missionObjective}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
