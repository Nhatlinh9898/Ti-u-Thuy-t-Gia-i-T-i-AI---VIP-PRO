import React, { useState } from 'react';
import {
  MASTER_BATTLE_FORMATIONS,
  MASTER_TROOP_BRANCHES,
  MASTER_TRAINING_DOCTRINES,
  MASTER_TERRAIN_TACTICS,
  MASTER_COUNTER_FORMATION_RULES,
  MASTER_ART_OF_WAR_FULL_TREATISE,
  MASTER_ANTI_BATTLE_FORMATIONS,
  MASTER_ANTI_TROOP_BRANCHES,
  MASTER_ANTI_DESTINY_DOCTRINES,
  MASTER_ANTI_ART_OF_WAR_FULL_TREATISE,
  MASTER_AMPHIBIOUS_FORMATIONS,
  MASTER_AMPHIBIOUS_TROOPS,
  MASTER_HYBRID_TERRAIN_TACTICS,
  MASTER_WATER_MOUNTAIN_RULES,
  MASTER_AMPHIBIOUS_FULL_TREATISE,
  BattleFormation,
  TroopBranch,
  TerrainTactic,
  AntiBattleFormation,
  AntiTroopBranch,
  AntiDestinyDoctrine,
  AmphibiousFormation,
  AmphibiousTroopBranch,
  HybridTerrainManual,
  WaterMountainDrillRule
} from '../data/artOfWarBible';
import { NovelNode } from '../types';

interface ArtOfWarStudioProps {
  selectedNode: NovelNode | null;
  onInsertText: (text: string) => void;
  onUpdateContent?: (content: string) => void;
}

export const ArtOfWarStudio: React.FC<ArtOfWarStudioProps> = ({
  selectedNode,
  onInsertText,
  onUpdateContent
}) => {
  // Top-Level Mode: 'empire' | 'antiEmpire' | 'amphibious' | 'duel'
  const [doctrineMode, setDoctrineMode] = useState<'empire' | 'antiEmpire' | 'amphibious' | 'duel'>('empire');

  // Sub-tabs for Empire mode
  const [empireTab, setEmpireTab] = useState<'formations' | 'troops' | 'terrain' | 'training' | 'counterRules' | 'treatise'>('formations');

  // Sub-tabs for Anti-Empire mode
  const [antiTab, setAntiTab] = useState<'antiFormations' | 'antiTroops' | 'antiDestiny' | 'antiTreatise'>('antiFormations');

  // Sub-tabs for Amphibious mode
  const [amphibiousTab, setAmphibiousTab] = useState<'ampFormations' | 'ampTroops' | 'ampTerrain' | 'ampRules' | 'ampTreatise'>('ampFormations');

  // Selected item states - Empire
  const [selectedFormationId, setSelectedFormationId] = useState<string>(MASTER_BATTLE_FORMATIONS[0].id);
  const [selectedTroopId, setSelectedTroopId] = useState<string>(MASTER_TROOP_BRANCHES[0].id);
  const [selectedTerrainId, setSelectedTerrainId] = useState<string>(MASTER_TERRAIN_TACTICS[0].id);
  const [formationFilter, setFormationFilter] = useState<string>('ALL');

  // Selected item states - Anti-Empire
  const [selectedAntiFormationId, setSelectedAntiFormationId] = useState<string>(MASTER_ANTI_BATTLE_FORMATIONS[0].id);
  const [selectedAntiTroopId, setSelectedAntiTroopId] = useState<string>(MASTER_ANTI_TROOP_BRANCHES[0].id);
  const [selectedAntiDestinyId, setSelectedAntiDestinyId] = useState<string>(MASTER_ANTI_DESTINY_DOCTRINES[0].id);
  const [antiFilter, setAntiFilter] = useState<string>('ALL');

  // Selected item states - Amphibious
  const [selectedAmpFormationId, setSelectedAmpFormationId] = useState<string>(MASTER_AMPHIBIOUS_FORMATIONS[0].id);
  const [selectedAmpTroopId, setSelectedAmpTroopId] = useState<string>(MASTER_AMPHIBIOUS_TROOPS[0].id);
  const [selectedAmpTerrainId, setSelectedAmpTerrainId] = useState<string>(MASTER_HYBRID_TERRAIN_TACTICS[0].id);
  const [selectedAmpRuleId, setSelectedAmpRuleId] = useState<string>(MASTER_WATER_MOUNTAIN_RULES[0].id);
  const [ampFilter, setAmpFilter] = useState<string>('ALL');

  // Duel Simulator State
  const [duelTargetFormationId, setDuelTargetFormationId] = useState<string>(MASTER_BATTLE_FORMATIONS[0].id);
  const [duelCommanderEmpire, setDuelCommanderEmpire] = useState<string>('Tiêu Cảnh (Đại Càn)');
  const [duelCommanderAnti, setDuelCommanderAnti] = useState<string>('Mặc Thương Lãng (Tông Môn Liên Minh)');
  const [duelTerrain, setDuelTerrain] = useState<string>('Bắc Lương Phong Tuyết Quan');
  const [duelProse, setDuelProse] = useState<string>('');

  const [copySuccess, setCopySuccess] = useState<string>('');

  // Current entity lookups
  const currentFormation = MASTER_BATTLE_FORMATIONS.find((f) => f.id === selectedFormationId) || MASTER_BATTLE_FORMATIONS[0];
  const currentTroop = MASTER_TROOP_BRANCHES.find((t) => t.id === selectedTroopId) || MASTER_TROOP_BRANCHES[0];
  const currentTerrain = MASTER_TERRAIN_TACTICS.find((t) => t.id === selectedTerrainId) || MASTER_TERRAIN_TACTICS[0];

  const currentAntiFormation = MASTER_ANTI_BATTLE_FORMATIONS.find((f) => f.id === selectedAntiFormationId) || MASTER_ANTI_BATTLE_FORMATIONS[0];
  const currentAntiTroop = MASTER_ANTI_TROOP_BRANCHES.find((t) => t.id === selectedAntiTroopId) || MASTER_ANTI_TROOP_BRANCHES[0];
  const currentAntiDestiny = MASTER_ANTI_DESTINY_DOCTRINES.find((d) => d.id === selectedAntiDestinyId) || MASTER_ANTI_DESTINY_DOCTRINES[0];

  const currentAmpFormation = MASTER_AMPHIBIOUS_FORMATIONS.find((f) => f.id === selectedAmpFormationId) || MASTER_AMPHIBIOUS_FORMATIONS[0];
  const currentAmpTroop = MASTER_AMPHIBIOUS_TROOPS.find((t) => t.id === selectedAmpTroopId) || MASTER_AMPHIBIOUS_TROOPS[0];
  const currentAmpTerrain = MASTER_HYBRID_TERRAIN_TACTICS.find((t) => t.id === selectedAmpTerrainId) || MASTER_HYBRID_TERRAIN_TACTICS[0];
  const currentAmpRule = MASTER_WATER_MOUNTAIN_RULES.find((r) => r.id === selectedAmpRuleId) || MASTER_WATER_MOUNTAIN_RULES[0];

  // Duel matched counter
  const duelTargetFormation = MASTER_BATTLE_FORMATIONS.find((f) => f.id === duelTargetFormationId) || MASTER_BATTLE_FORMATIONS[0];
  const matchedAntiFormation = MASTER_ANTI_BATTLE_FORMATIONS.find(
    (af) => af.countersTarget.toLowerCase().includes(duelTargetFormation.name.slice(0, 8).toLowerCase())
  ) || MASTER_ANTI_BATTLE_FORMATIONS[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(label);
    setTimeout(() => setCopySuccess(''), 2500);
  };

  const handleInsert = (text: string) => {
    onInsertText(text);
    setCopySuccess('Đã chèn vào chương!');
    setTimeout(() => setCopySuccess(''), 2500);
  };

  // Generate Epic Battle Duel Scene
  const handleGenerateDuelScene = () => {
    const scene = `Trận huyết chiến tại ${duelTerrain} đã bước vào hồi căng thẳng tột bực. Gió bão cuộn cát bụi bay mù mịt, nhuộm kín nửa vầng nhật nguyệt đỏ quạch như máu.

Phía Tiên Triều, ${duelCommanderEmpire} đứng sừng sững trên chiến xa hoàng bào phấp phới, vung kiếm lệnh thét vang:
\"Tam quân nghe lệnh! Bày ${duelTargetFormation.name}! Nhắm thẳng trung quân giặc nghiền nát cho ta!\"

\"RẦM RẦM RẦM!\" 
Tiếng trống sấm chín hồi rung chuyển mặt đất. Quân đội Tiên Triều xếp thành ${duelTargetFormation.name}, khí thế xung thiên đè bẹp trời đất. ${duelTargetFormation.corePhilosophy}

Thế nhưng, đứng trước hiểm cảnh nghìn cân treo sợi tóc, ${duelCommanderAnti} không hề nao núng. Vị thống soái cười khẩy, tay phất Nghịch Tiên Lệnh Kỳ:
\"Tiêu Cảnh, ngươi tưởng chỉ có Tiên Triều mới biết bày trận sao? Muốn phá ${duelTargetFormation.name}, hãy xem ${matchedAntiFormation.name}!\"

Ngay lập tức, cờ lệnh chuyển màu tím thẫm. ${matchedAntiFormation.corePhilosophy}

${matchedAntiFormation.stepByStepManeuvers.phase1}
${matchedAntiFormation.stepByStepManeuvers.phase2}

Thời khắc mấu chốt: ${matchedAntiFormation.keyTurningPoint}!

${matchedAntiFormation.battleExcerpt}`;

    setDuelProse(scene);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 via-blue-950 to-purple-950 border-b border-amber-600/30 p-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl p-1.5 bg-amber-500/20 border border-amber-500/40 rounded-lg shadow-inner">
            ⚔️
          </span>
          <div>
            <h2 className="text-base font-bold text-amber-200 tracking-wide flex items-center gap-2">
              QUÂN SỰ ĐỐI BẢO: TAM ĐẠI HỆ THỐNG BINH THƯ
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-900/70 border border-blue-500/50 text-cyan-300 uppercase tracking-widest font-mono">
                THỦY - LỤC - NGHỊCH CHIẾN
              </span>
            </h2>
            <p className="text-xs text-amber-400/80">
              Đại Càn Tiên Triều ⟷ Cửu Tông Nghịch Binh ⟷ Thủy Lục & Sơn Lâm Hiểm Địa (Sông - Núi - Rừng - Hẻm Vực)
            </p>
          </div>
        </div>

        {copySuccess && (
          <span className="text-xs px-2.5 py-1 bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 rounded animate-pulse font-medium">
            ✓ {copySuccess}
          </span>
        )}
      </div>

      {/* TOP-LEVEL DOCTRINE SWITCHER: 4 BUTTONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 p-1.5 bg-slate-900 border-b border-slate-800 gap-1.5 text-xs">
        <button
          onClick={() => setDoctrineMode('empire')}
          className={`py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
            doctrineMode === 'empire'
              ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-900/50 ring-1 ring-amber-400'
              : 'bg-slate-800/80 text-amber-200/70 hover:bg-slate-800 hover:text-amber-200'
          }`}
        >
          <span>👑</span>
          <span className="truncate">ĐẠI CÀN TIÊN TRIỀU</span>
        </button>

        <button
          onClick={() => setDoctrineMode('antiEmpire')}
          className={`py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
            doctrineMode === 'antiEmpire'
              ? 'bg-gradient-to-r from-purple-700 to-red-800 text-white shadow-lg shadow-purple-900/50 ring-1 ring-purple-400'
              : 'bg-slate-800/80 text-purple-200/70 hover:bg-slate-800 hover:text-purple-200'
          }`}
        >
          <span>🗡️</span>
          <span className="truncate">CỬU TÔNG NGHỊCH CHIẾN</span>
        </button>

        <button
          onClick={() => setDoctrineMode('amphibious')}
          className={`py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
            doctrineMode === 'amphibious'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-900/50 ring-1 ring-cyan-400'
              : 'bg-slate-800/80 text-cyan-200/70 hover:bg-slate-800 hover:text-cyan-200'
          }`}
        >
          <span>🌊</span>
          <span className="truncate">THỦY LỤC & SƠN LÂM HIỂM ĐỊA</span>
        </button>

        <button
          onClick={() => setDoctrineMode('duel')}
          className={`py-2 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
            doctrineMode === 'duel'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-800 text-white shadow-lg shadow-emerald-900/50 ring-1 ring-emerald-400'
              : 'bg-slate-800/80 text-emerald-200/70 hover:bg-slate-800 hover:text-emerald-200'
          }`}
        >
          <span>⚖️</span>
          <span className="truncate">ĐỐI KHÁNG SIMULATOR</span>
        </button>
      </div>

      {/* SUB-TABS: EMPIRE MODE */}
      {doctrineMode === 'empire' && (
        <div className="flex items-center gap-1 p-1.5 bg-slate-900/90 border-b border-slate-800 text-xs overflow-x-auto select-none scrollbar-thin">
          <button
            onClick={() => setEmpireTab('formations')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              empireTab === 'formations'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🛡️</span> 12 Đại Chiến Trận
          </button>
          <button
            onClick={() => setEmpireTab('troops')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              empireTab === 'troops'
                ? 'bg-red-700 text-white shadow-md shadow-red-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>👥</span> Binh Chủng Tinh Nhuệ
          </button>
          <button
            onClick={() => setEmpireTab('terrain')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              empireTab === 'terrain'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🏔️</span> Địa Hình Tác Chiến
          </button>
          <button
            onClick={() => setEmpireTab('training')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              empireTab === 'training'
                ? 'bg-indigo-700 text-white shadow-md shadow-indigo-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>📜</span> Quân Quy & Luyện Binh
          </button>
          <button
            onClick={() => setEmpireTab('counterRules')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              empireTab === 'counterRules'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>⚡</span> Quy Luật Tương Khắc
          </button>
          <button
            onClick={() => setEmpireTab('treatise')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              empireTab === 'treatise'
                ? 'bg-amber-700 text-white shadow-md shadow-amber-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>📖</span> Toàn Văn Tiên Triều Binh Thư
          </button>
        </div>
      )}

      {/* SUB-TABS: ANTI-EMPIRE MODE */}
      {doctrineMode === 'antiEmpire' && (
        <div className="flex items-center gap-1 p-1.5 bg-slate-900/90 border-b border-purple-950/60 text-xs overflow-x-auto select-none scrollbar-thin">
          <button
            onClick={() => setAntiTab('antiFormations')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              antiTab === 'antiFormations'
                ? 'bg-purple-700 text-white shadow-md shadow-purple-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🗡️</span> 12 Đại Phá Trận Nghịch Khắc
          </button>
          <button
            onClick={() => setAntiTab('antiTroops')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              antiTab === 'antiTroops'
                ? 'bg-red-800 text-white shadow-md shadow-red-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🎯</span> Thợ Săn Binh Chủng
          </button>
          <button
            onClick={() => setAntiTab('antiDestiny')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              antiTab === 'antiDestiny'
                ? 'bg-indigo-800 text-white shadow-md shadow-indigo-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🌀</span> Nghịch Long Đoạt Vận
          </button>
          <button
            onClick={() => setAntiTab('antiTreatise')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              antiTab === 'antiTreatise'
                ? 'bg-purple-900 text-white shadow-md shadow-purple-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>📜</span> Toàn Văn Nghịch Chiến Bí Thư
          </button>
        </div>
      )}

      {/* SUB-TABS: AMPHIBIOUS & MOUNTAIN/FOREST/CANYON MODE */}
      {doctrineMode === 'amphibious' && (
        <div className="flex items-center gap-1 p-1.5 bg-slate-900/90 border-b border-cyan-950/60 text-xs overflow-x-auto select-none scrollbar-thin">
          <button
            onClick={() => setAmphibiousTab('ampFormations')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              amphibiousTab === 'ampFormations'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🌊</span> 12 Thủy Lục Hiểm Trận
          </button>
          <button
            onClick={() => setAmphibiousTab('ampTroops')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              amphibiousTab === 'ampTroops'
                ? 'bg-blue-700 text-white shadow-md shadow-blue-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🚢</span> Binh Chủng Thủy Lục & Leo Núi
          </button>
          <button
            onClick={() => setAmphibiousTab('ampTerrain')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              amphibiousTab === 'ampTerrain'
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>🏞️</span> Địa Hình Sông Núi Rừng Vực
          </button>
          <button
            onClick={() => setAmphibiousTab('ampRules')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              amphibiousTab === 'ampRules'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>📜</span> Thập Bát Thủy Lệnh & Tam Phòng
          </button>
          <button
            onClick={() => setAmphibiousTab('ampTreatise')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 whitespace-nowrap transition-all font-semibold ${
              amphibiousTab === 'ampTreatise'
                ? 'bg-cyan-800 text-white shadow-md shadow-cyan-950/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <span>📖</span> Toàn Văn Thủy Lục Binh Thư
          </button>
        </div>
      )}

      {/* MAIN VIEW CONTAINER */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* ========================================================= */}
        {/* TAB 1: EMPIRE MODE */}
        {/* ========================================================= */}
        {doctrineMode === 'empire' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* 1.1 FORMATIONS */}
            {empireTab === 'formations' && (
              <div className="flex-1 flex overflow-hidden">
                {/* List left */}
                <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  {/* Category filter */}
                  <div className="p-2 border-b border-slate-800">
                    <select
                      value={formationFilter}
                      onChange={(e) => setFormationFilter(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-xs rounded p-1.5 text-slate-200"
                    >
                      <option value="ALL">Tất cả chủng loại trận đồ (12 Trận)</option>
                      <option value="Công Kích Mãnh Liệt">Công Kích Mãnh Liệt</option>
                      <option value="Phòng Ngự Bất Hoại">Phòng Ngự Bất Hoại</option>
                      <option value="Vu Hồi Bao Vây">Vu Hồi Bao Vây</option>
                      <option value="Kỳ Môn Tiên Trận">Kỳ Môn Tiên Trận</option>
                      <option value="Phục Kích Du Kích">Phục Kích Du Kích</option>
                    </select>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_BATTLE_FORMATIONS.filter(
                      (f) => formationFilter === 'ALL' || f.category === formationFilter
                    ).map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedFormationId(f.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedFormationId === f.id
                            ? 'bg-amber-950/70 border-amber-500/70 text-amber-100 shadow-md ring-1 ring-amber-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          {f.symbol}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-amber-200">{f.name}</h4>
                          <span className="text-[10px] text-amber-400/80 block truncate">
                            {f.alias}
                          </span>
                          <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded bg-amber-900/50 border border-amber-700/40 text-amber-300">
                            {f.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail right */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-2 bg-amber-950/40 border border-amber-500/40 rounded-xl">
                        {currentFormation.symbol}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-amber-200">{currentFormation.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-600/40">
                            {currentFormation.category}
                          </span>
                        </div>
                        <p className="text-xs text-amber-400/90 font-serif italic mt-0.5">
                          {currentFormation.alias}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(currentFormation.battleProseSample, 'Đã sao chép văn mẫu!')}
                        className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition"
                      >
                        📋 Sao chép
                      </button>
                      <button
                        onClick={() => handleInsert(currentFormation.battleProseSample)}
                        className="px-3 py-1 text-xs bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded shadow transition"
                      >
                        ✍️ Chèn vào chương
                      </button>
                    </div>
                  </div>

                  {/* Core Philosophy */}
                  <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-700/30">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>🧠</span> Tôn Chỉ Cốt Lõi
                    </h5>
                    <p className="text-xs text-slate-200 leading-relaxed font-serif">
                      {currentFormation.corePhilosophy}
                    </p>
                  </div>

                  {/* ASCII Matrix Diagram */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>📐</span> Bố Cục Trận Thế (Sơ Đồ Chiến Thuật)
                    </h5>
                    <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto whitespace-pre leading-snug">
                      {currentFormation.diagramText}
                    </pre>
                  </div>

                  {/* Two Columns: Deployment & Movements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Deployment Rules */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span>🛡️</span> Quy Tắc Bố Trận
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {currentFormation.deploymentRules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Maneuvers */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span>🔄</span> Di Chuyển & Biến Hóa Trận Hình
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {currentFormation.movementAndManeuvers.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400">➔</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Signal Commands */}
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>🥁</span> Hiệu Lệnh Quân Đội
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-1">🥁 Trống Sấm:</span>
                        <span className="text-slate-300 text-[11px]">{currentFormation.signalCommands.drum}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-1">🚩 Cờ Hiệu:</span>
                        <span className="text-slate-300 text-[11px]">{currentFormation.signalCommands.flag}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-1">🔔 Chiêng Đồng:</span>
                        <span className="text-slate-300 text-[11px]">{currentFormation.signalCommands.gong}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800">
                        <span className="text-amber-400 font-bold block mb-1">🎆 Hỏa Tiễn/Pháo Sáng:</span>
                        <span className="text-slate-300 text-[11px]">{currentFormation.signalCommands.flare}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prose Sample */}
                  <div className="p-4 bg-gradient-to-br from-amber-950/30 to-slate-950 rounded-xl border border-amber-800/40">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span>📜</span> Đoạn Văn Mẫu Miêu Tả Chiến Trận
                      </h5>
                      <button
                        onClick={() => handleInsert(currentFormation.battleProseSample)}
                        className="text-xs text-amber-400 hover:text-amber-200 underline font-semibold"
                      >
                        Chèn vào chương đang viết →
                      </button>
                    </div>
                    <p className="text-xs text-slate-200 font-serif leading-relaxed italic bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                      &quot;{currentFormation.battleProseSample}&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 1.2 TROOPS */}
            {empireTab === 'troops' && (
              <div className="flex-1 flex overflow-hidden">
                <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  <div className="p-2.5 border-b border-slate-800 text-xs font-bold text-slate-300">
                    Binh Chủng Tiên Triều ({MASTER_TROOP_BRANCHES.length})
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_TROOP_BRANCHES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTroopId(t.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedTroopId === t.id
                            ? 'bg-red-950/70 border-red-500/70 text-red-100 shadow-md ring-1 ring-red-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          {t.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-red-200">{t.name}</h4>
                          <span className="text-[10px] text-slate-400 block truncate">{t.role}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-2 bg-red-950/40 border border-red-500/40 rounded-xl">
                        {currentTroop.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-red-200">{currentTroop.name}</h3>
                        <p className="text-xs text-red-400/90">{currentTroop.category} • {currentTroop.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleInsert(currentTroop.proseExcerpt)}
                      className="px-3 py-1 text-xs bg-red-700 hover:bg-red-600 text-white font-bold rounded shadow transition"
                    >
                      ✍️ Chèn trích dẫn
                    </button>
                  </div>

                  <div className="p-3 bg-red-950/20 rounded-xl border border-red-900/40">
                    <h5 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-1">
                      Khẩu Hiệu Chiến Trường:
                    </h5>
                    <p className="text-xs text-red-100 font-serif italic">
                      &quot;{currentTroop.battlefieldMotto}&quot;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                        🗡️ Trang Bị Tiêu Chuẩn
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentTroop.standardEquipment.map((eq, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                        💪 Lợi Thế & Huấn Luyện
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentTroop.advantages.map((adv, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400">✓</span>
                            <span>{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-xs font-serif leading-relaxed italic text-slate-300">
                    &quot;{currentTroop.proseExcerpt}&quot;
                  </div>
                </div>
              </div>
            )}

            {/* 1.3 TERRAIN */}
            {empireTab === 'terrain' && (
              <div className="flex-1 flex overflow-hidden">
                <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  <div className="p-2.5 border-b border-slate-800 text-xs font-bold text-slate-300">
                    Địa Hình Chiến Trận ({MASTER_TERRAIN_TACTICS.length})
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_TERRAIN_TACTICS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTerrainId(t.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedTerrainId === t.id
                            ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-100 shadow-md ring-1 ring-emerald-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          {t.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-emerald-200">{t.terrainName}</h4>
                          <span className="text-[10px] text-slate-400 block truncate">{t.nature}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <span className="text-4xl p-2 bg-emerald-950/40 border border-emerald-500/40 rounded-xl">
                      {currentTerrain.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-emerald-200">{currentTerrain.terrainName}</h3>
                      <p className="text-xs text-emerald-400">{currentTerrain.nature}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-800/30">
                    <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                      Lợi Thế Tác Chiến:
                    </h5>
                    <p className="text-xs text-slate-200 leading-relaxed">{currentTerrain.tacticalAdvantage}</p>
                  </div>

                  <div className="p-3 bg-red-950/20 rounded-xl border border-red-900/40">
                    <h5 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-1">
                      Tử Huyệt Cần Tránh:
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {currentTerrain.fatalDisadvantages.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-red-500">⚠</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      Cơ Hội Phục Kích:
                    </h5>
                    <p className="text-xs text-slate-300 font-serif">{currentTerrain.ambushOpportunities}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 1.4 TRAINING */}
            {empireTab === 'training' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-amber-200">
                    QUÂN QUY THẬP BÁT LỆNH & HUẤN LUYỆN BINH HUYẾT
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kỷ luật sắt đá biến phàm nhân thành chiến binh trảm yêu diệt thần
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MASTER_TRAINING_DOCTRINES.map((d) => (
                    <div key={d.id} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-amber-300">{d.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/40">
                          {d.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-serif italic">&quot;{d.principle}&quot;</p>
                      <ul className="space-y-1 text-xs text-slate-300 pt-1">
                        {d.detailMethods.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-500">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                        <span className="text-amber-400 font-semibold">Tác động cốt truyện: </span>
                        {d.narrativeImpact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 1.5 COUNTER RULES */}
            {empireTab === 'counterRules' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-amber-200">
                    QUY LUẬT TƯƠNG SINH TƯƠNG KHẮC TRẬN PHÁP
                  </h3>
                  <p className="text-xs text-slate-400">
                    Ngũ hành trận thế, biến ảo vô cùng, không có trận đồ nào là tuyệt đối vô địch
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MASTER_COUNTER_FORMATION_RULES.map((rule, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                          <span>🎯</span> {rule.enemyStance}
                        </span>
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <span>⚡</span> {rule.counterFormationName}
                        </span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-slate-800/80 text-xs text-slate-300">
                        <span className="text-amber-300 font-semibold block mb-0.5">Hiểm họa từ thế trận địch:</span>
                        {rule.enemyThreat}
                      </div>
                      <div className="p-2 bg-amber-950/20 rounded border border-amber-900/30 text-xs text-amber-200">
                        <span className="text-amber-400 font-semibold block mb-0.5">Chiến thuật phá giải:</span>
                        {rule.tacticalAction}
                      </div>
                      <div className="text-[11px] text-cyan-300 italic pt-1 border-t border-slate-800">
                        ⚡ Thời khắc then chốt: {rule.decisivePhase}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 1.6 FULL TREATISE */}
            {empireTab === 'treatise' && (
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-950">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-amber-200 flex items-center gap-2">
                    <span>📖</span> TOÀN VĂN: ĐẠI CÀN TIÊN TRIỀU BINH PHÁP TOÀN THƯ
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(MASTER_ART_OF_WAR_FULL_TREATISE, 'Đã sao chép toàn văn binh thư!')}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700"
                    >
                      📋 Sao chép toàn văn
                    </button>
                    <button
                      onClick={() => handleInsert(MASTER_ART_OF_WAR_FULL_TREATISE)}
                      className="px-3 py-1 text-xs bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded shadow"
                    >
                      ✍️ Chèn vào chương
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 font-serif text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
                  {MASTER_ART_OF_WAR_FULL_TREATISE}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ANTI-EMPIRE (CỬU TÔNG NGHỊCH CHIẾN BÍ THƯ) */}
        {/* ========================================================= */}
        {doctrineMode === 'antiEmpire' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* 2.1 ANTI-FORMATIONS */}
            {antiTab === 'antiFormations' && (
              <div className="flex-1 flex overflow-hidden">
                <div className="w-84 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  <div className="p-2 border-b border-slate-800">
                    <select
                      value={antiFilter}
                      onChange={(e) => setAntiFilter(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-xs rounded p-1.5 text-purple-200"
                    >
                      <option value="ALL">Tất cả Phá Trận Nghịch Khắc (12 Phá Trận)</option>
                      <option value="Khống Chế & Làm Rối">Khống Chế & Làm Rối</option>
                      <option value="Hóa Giải & Tiêu Diệt">Hóa Giải & Tiêu Diệt</option>
                      <option value="Chôn Vùi Địa Hình">Chôn Vùi Địa Hình</option>
                      <option value="Cắt Đứt Liên Lạc">Cắt Đứt Liên Lạc</option>
                      <option value="Bẫy Độc & Chướng Khí">Bẫy Độc & Chướng Khí</option>
                    </select>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_ANTI_BATTLE_FORMATIONS.filter(
                      (af) => antiFilter === 'ALL' || af.category === antiFilter
                    ).map((af) => (
                      <button
                        key={af.id}
                        onClick={() => setSelectedAntiFormationId(af.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedAntiFormationId === af.id
                            ? 'bg-purple-950/70 border-purple-500/70 text-purple-100 shadow-md ring-1 ring-purple-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          {af.symbol}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-purple-200">{af.name}</h4>
                          <span className="text-[10px] text-red-400 block truncate">
                            Khắc: {af.countersTarget}
                          </span>
                          <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded bg-purple-900/50 border border-purple-700/40 text-purple-300">
                            {af.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-2 bg-purple-950/40 border border-purple-500/40 rounded-xl">
                        {currentAntiFormation.symbol}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-purple-200">{currentAntiFormation.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-600/40">
                            {currentAntiFormation.category}
                          </span>
                        </div>
                        <p className="text-xs text-red-400 font-semibold mt-0.5">
                          🎯 Chuyên Đặc Trị: {currentAntiFormation.countersTarget} ({currentAntiFormation.alias})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(currentAntiFormation.battleExcerpt, 'Đã sao chép văn mẫu!')}
                        className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 transition"
                      >
                        📋 Sao chép
                      </button>
                      <button
                        onClick={() => handleInsert(currentAntiFormation.battleExcerpt)}
                        className="px-3 py-1 text-xs bg-purple-600 hover:bg-purple-500 text-white font-bold rounded shadow transition"
                      >
                        ✍️ Chèn vào chương
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-700/30">
                    <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>👁️</span> Nguyên Lý Khắc Chế & Triệt Hạ
                    </h5>
                    <p className="text-xs text-slate-200 leading-relaxed font-serif">
                      {currentAntiFormation.corePhilosophy}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>📐</span> Bố Trận Phá Giải (Sơ Đồ Tác Chiến Nghịch Khắc)
                    </h5>
                    <pre className="p-3 bg-slate-950 rounded-lg border border-purple-900/50 text-[11px] font-mono text-purple-300 overflow-x-auto whitespace-pre leading-snug">
                      {currentAntiFormation.diagramText}
                    </pre>
                  </div>

                  {/* 3 Step-by-Step Maneuvers */}
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                    <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                      <span>⚙️</span> Ba Bước Điều Chuyển Hóa Giải
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-950 rounded border border-purple-900/40">
                        <span className="text-purple-400 font-bold block mb-1">Giai đoạn 1: Mồi Nhử & Phá Thế</span>
                        <p className="text-slate-300 text-[11px]">{currentAntiFormation.stepByStepManeuvers.phase1}</p>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded border border-purple-900/40">
                        <span className="text-purple-400 font-bold block mb-1">Giai đoạn 2: Khóa Trục & Siết Vòng</span>
                        <p className="text-slate-300 text-[11px]">{currentAntiFormation.stepByStepManeuvers.phase2}</p>
                      </div>
                      <div className="p-2.5 bg-slate-950 rounded border border-purple-900/40">
                        <span className="text-purple-400 font-bold block mb-1">Giai đoạn 3: Quyết Trảm & Tuyệt Diệt</span>
                        <p className="text-slate-300 text-[11px]">{currentAntiFormation.stepByStepManeuvers.phase3}</p>
                      </div>
                    </div>
                  </div>

                  {/* Critical Moment & Narrative Prose */}
                  <div className="p-4 bg-gradient-to-br from-purple-950/40 to-slate-950 rounded-xl border border-purple-800/40 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-400">
                        ⚡ Thời Khắc Chuyển Bại Thành Thắng:
                      </span>
                      <span className="text-xs text-purple-300 italic">{currentAntiFormation.keyTurningPoint}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-serif leading-relaxed italic bg-slate-950/70 p-3 rounded-lg border border-purple-900/30">
                      &quot;{currentAntiFormation.battleExcerpt}&quot;
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2.2 ANTI-TROOPS */}
            {antiTab === 'antiTroops' && (
              <div className="flex-1 flex overflow-hidden">
                <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  <div className="p-2.5 border-b border-slate-800 text-xs font-bold text-slate-300">
                    Thợ Săn Binh Chủng ({MASTER_ANTI_TROOP_BRANCHES.length})
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_ANTI_TROOP_BRANCHES.map((at) => (
                      <button
                        key={at.id}
                        onClick={() => setSelectedAntiTroopId(at.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedAntiTroopId === at.id
                            ? 'bg-purple-950/70 border-purple-500/70 text-purple-100 shadow-md ring-1 ring-purple-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          {at.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-purple-200">{at.name}</h4>
                          <span className="text-[10px] text-red-400 block truncate">Săn: {at.preysUpon}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                    <span className="text-4xl p-2 bg-purple-950/40 border border-purple-500/40 rounded-xl">
                      {currentAntiTroop.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-purple-200">{currentAntiTroop.name}</h3>
                      <p className="text-xs text-red-400">Khắc Tinh Tuyệt Đối Của: {currentAntiTroop.preysUpon}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                        🗡️ Vũ Khí Tương Khắc Độc Chế
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentAntiTroop.lethalWeaponry.map((w, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-red-400">•</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                        🧠 Tâm Lý Chiến & Đòn Độc
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {currentAntiTroop.psychologicalEdge}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-xs font-serif leading-relaxed italic text-slate-300">
                    &quot;{currentAntiTroop.proseExcerpt}&quot;
                  </div>
                </div>
              </div>
            )}

            {/* 2.3 ANTI-DESTINY */}
            {antiTab === 'antiDestiny' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-purple-200">
                    TỨ ĐẠI NGHỊCH LONG ĐOẠT VẬN PHÁP (PHONG THỦY & KHÍ VẬN CHIẾN)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cắt đứt huyết mạch Tiên Triều, làm nguội Binh Huyết sát khí, nhiễu loạn thiên đạo
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MASTER_ANTI_DESTINY_DOCTRINES.map((d) => (
                    <div key={d.id} className="p-3.5 bg-slate-900/80 rounded-xl border border-purple-900/40 space-y-2">
                      <h4 className="text-xs font-bold text-purple-300">{d.title}</h4>
                      <p className="text-xs text-slate-200 font-serif italic">&quot;{d.concept}&quot;</p>
                      <div className="p-2 bg-slate-950 rounded border border-purple-950 text-xs text-purple-200">
                        <span className="text-purple-400 font-semibold block mb-0.5">Cách thức thi triển:</span>
                        <ul className="space-y-1">
                          {d.practicalMethods.map((m, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span>•</span> <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-2 bg-red-950/20 rounded border border-red-950 text-xs text-red-300">
                        <span className="text-red-400 font-semibold block mb-0.5">Tử huyệt Tiên Triều bị khai thác:</span>
                        {d.counterEmpireVulnerability}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2.4 ANTI-TREATISE */}
            {antiTab === 'antiTreatise' && (
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-950">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-purple-200 flex items-center gap-2">
                    <span>📜</span> TOÀN VĂN: CỬU TÔNG NGHỊCH CHIẾN PHÁ TRẬN BÍ THƯ
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(MASTER_ANTI_ART_OF_WAR_FULL_TREATISE, 'Đã sao chép bí thư!')}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-purple-200 rounded border border-slate-700"
                    >
                      📋 Sao chép
                    </button>
                    <button
                      onClick={() => handleInsert(MASTER_ANTI_ART_OF_WAR_FULL_TREATISE)}
                      className="px-3 py-1 text-xs bg-purple-700 hover:bg-purple-600 text-white font-bold rounded shadow"
                    >
                      ✍️ Chèn vào chương
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/60 rounded-xl border border-purple-900/40 font-serif text-xs leading-relaxed text-purple-100 whitespace-pre-wrap">
                  {MASTER_ANTI_ART_OF_WAR_FULL_TREATISE}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AMPHIBIOUS & MOUNTAIN/FOREST/CANYON (THỦY LỤC HIỂM ĐỊA) */}
        {/* ========================================================= */}
        {doctrineMode === 'amphibious' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* 3.1 AMPHIBIOUS FORMATIONS */}
            {amphibiousTab === 'ampFormations' && (
              <div className="flex-1 flex overflow-hidden">
                {/* List left */}
                <div className="w-84 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  <div className="p-2 border-b border-slate-800">
                    <select
                      value={ampFilter}
                      onChange={(e) => setAmpFilter(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 text-xs rounded p-1.5 text-cyan-200"
                    >
                      <option value="ALL">Tất cả địa hình Thủy Lục (12 Đại Trận)</option>
                      <option value="Sông Lớn Thủy Vực">Sông Lớn Thủy Vực</option>
                      <option value="Hẻm Núi Vực Sâu">Hẻm Núi Vực Sâu</option>
                      <option value="Sơn Lâm Đầm Lầy">Sơn Lâm Đầm Lầy</option>
                      <option value="Ghềnh Thác Thượng Nguồn">Ghềnh Thác Thượng Nguồn</option>
                      <option value="Sông Núi Đan Xen">Sông Núi Đan Xen</option>
                    </select>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_AMPHIBIOUS_FORMATIONS.filter(
                      (af) => ampFilter === 'ALL' || af.terrainType === (ampFilter as any)
                    ).map((af) => (
                      <button
                        key={af.id}
                        onClick={() => setSelectedAmpFormationId(af.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedAmpFormationId === af.id
                            ? 'bg-cyan-950/70 border-cyan-500/70 text-cyan-100 shadow-md ring-1 ring-cyan-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          {af.symbol}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-cyan-200">{af.name}</h4>
                          <span className="text-[10px] text-cyan-400/80 block truncate">
                            {af.alias}
                          </span>
                          <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded bg-cyan-900/50 border border-cyan-700/40 text-cyan-300">
                            {af.terrainType}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail right */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-2 bg-cyan-950/40 border border-cyan-500/40 rounded-xl">
                        {currentAmpFormation.symbol}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-cyan-200">{currentAmpFormation.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-600/40">
                            {currentAmpFormation.terrainType}
                          </span>
                        </div>
                        <p className="text-xs text-cyan-400/90 font-serif italic mt-0.5">
                          {currentAmpFormation.alias}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(currentAmpFormation.narrativeBattleExcerpt, 'Đã sao chép phân cảnh chiến trận!')}
                        className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-200 rounded border border-slate-700 transition"
                      >
                        📋 Sao chép
                      </button>
                      <button
                        onClick={() => handleInsert(currentAmpFormation.narrativeBattleExcerpt)}
                        className="px-3 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded shadow transition"
                      >
                        ✍️ Chèn vào chương
                      </button>
                    </div>
                  </div>

                  {/* Core Philosophy */}
                  <div className="p-3 bg-cyan-950/30 rounded-xl border border-cyan-700/30">
                    <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span>🌊</span> Tôn Chỉ Dụng Thủy & Giang Sơn Hiểm Địa
                    </h5>
                    <p className="text-xs text-slate-200 leading-relaxed font-serif">
                      {currentAmpFormation.corePhilosophy}
                    </p>
                  </div>

                  {/* ASCII Matrix Diagram */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>📐</span> Bố Cục Thủy Lục Trận (Sơ Đồ Tác Chiến Không Gian Ba Chiều)
                    </h5>
                    <pre className="p-3 bg-slate-950 rounded-lg border border-cyan-900/50 text-[11px] font-mono text-cyan-300 overflow-x-auto whitespace-pre leading-snug">
                      {currentAmpFormation.diagramText}
                    </pre>
                  </div>

                  {/* Principles & Maneuvers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tactical Principles */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span>🛡️</span> Yếu Lĩnh Chiến Thuật Sông Núi
                      </h5>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {currentAmpFormation.tacticalPrinciples.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Formation Movement */}
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <span>🛶</span> Điều Động Binh Thuyền & Vực Sâu
                      </h5>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div><strong className="text-cyan-400">Tiến:</strong> {currentAmpFormation.formationMovement.advance}</div>
                        <div><strong className="text-red-400">Thoái:</strong> {currentAmpFormation.formationMovement.retreat}</div>
                        <div><strong className="text-amber-400">Vu hồi:</strong> {currentAmpFormation.formationMovement.flanking}</div>
                        <div><strong className="text-emerald-400">Phục kích:</strong> {currentAmpFormation.formationMovement.ambushTrigger}</div>
                      </div>
                    </div>
                  </div>

                  {/* Signal Commands */}
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                    <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span>📯</span> Tín Hiệu Thủy Vực & Khói Lửa Sơn Lâm
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 bg-slate-950 rounded border border-cyan-900/40">
                        <span className="text-cyan-400 font-bold block mb-1">🐚 Tù Và Sừng Trâu/Ốc:</span>
                        <span className="text-slate-300 text-[11px]">{currentAmpFormation.signalCommands.waterHorn}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-cyan-900/40">
                        <span className="text-cyan-400 font-bold block mb-1">🌫️ Khói Mù Ngũ Sắc:</span>
                        <span className="text-slate-300 text-[11px]">{currentAmpFormation.signalCommands.coloredSmoke}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-cyan-900/40">
                        <span className="text-cyan-400 font-bold block mb-1">🚩 Cờ Cột Buồm:</span>
                        <span className="text-slate-300 text-[11px]">{currentAmpFormation.signalCommands.mastFlag}</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded border border-cyan-900/40">
                        <span className="text-cyan-400 font-bold block mb-1">🔥 Hỏa Đăng / Đuốc Hiệu:</span>
                        <span className="text-slate-300 text-[11px]">{currentAmpFormation.signalCommands.flameBeacon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Synergy & Water/Weather Condition */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-amber-300 block mb-1">🤝 Binh Chủng Hiệp Đồng:</span>
                      <p className="text-xs text-slate-300">{currentAmpFormation.troopSynergy.join(' • ')}</p>
                      <span className="text-xs font-bold text-blue-300 block mt-2 mb-1">🌦️ Thời Tiết & Thủy Triều:</span>
                      <p className="text-xs text-slate-300">{currentAmpFormation.weatherAndWaterCondition}</p>
                    </div>

                    <div className="p-3 bg-red-950/20 rounded-xl border border-red-900/40">
                      <span className="text-xs font-bold text-red-300 block mb-1">⚠ Sai Lầm Chí Mạng:</span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentAmpFormation.fatalMistakes.map((f, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-red-400">✗</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Narrative Battle Excerpt */}
                  <div className="p-4 bg-gradient-to-br from-cyan-950/30 to-slate-950 rounded-xl border border-cyan-800/40">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                        <span>📜</span> Phân Cảnh Thủy Chiến & Sơn Lâm Sử Thi
                      </h5>
                      <button
                        onClick={() => handleInsert(currentAmpFormation.narrativeBattleExcerpt)}
                        className="text-xs text-cyan-400 hover:text-cyan-200 underline font-semibold"
                      >
                        Chèn vào chương đang viết →
                      </button>
                    </div>
                    <p className="text-xs text-slate-200 font-serif leading-relaxed italic bg-slate-950/70 p-3 rounded-lg border border-slate-800 whitespace-pre-line">
                      {currentAmpFormation.narrativeBattleExcerpt}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3.2 AMPHIBIOUS TROOPS */}
            {amphibiousTab === 'ampTroops' && (
              <div className="flex-1 flex overflow-hidden">
                <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  <div className="p-2.5 border-b border-slate-800 text-xs font-bold text-slate-300">
                    Binh Chủng Thủy Lục & Leo Núi ({MASTER_AMPHIBIOUS_TROOPS.length})
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_AMPHIBIOUS_TROOPS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedAmpTroopId(t.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedAmpTroopId === t.id
                            ? 'bg-blue-950/70 border-blue-500/70 text-blue-100 shadow-md ring-1 ring-blue-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          {t.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-blue-200">{t.name}</h4>
                          <span className="text-[10px] text-cyan-400 block truncate">{t.category}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl p-2 bg-blue-950/40 border border-blue-500/40 rounded-xl">
                        {currentAmpTroop.icon}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-blue-200">{currentAmpTroop.name}</h3>
                        <p className="text-xs text-cyan-400/90">{currentAmpTroop.category} • {currentAmpTroop.specialty}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleInsert(currentAmpTroop.proseExcerpt)}
                      className="px-3 py-1 text-xs bg-blue-700 hover:bg-blue-600 text-white font-bold rounded shadow transition"
                    >
                      ✍️ Chèn trích dẫn
                    </button>
                  </div>

                  <div className="p-3 bg-blue-950/20 rounded-xl border border-blue-900/40">
                    <h5 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1">
                      Khẩu Hiệu Binh Chủng:
                    </h5>
                    <p className="text-xs text-blue-100 font-serif italic">
                      &quot;{currentAmpTroop.unitMotto}&quot;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                        🗡️ Trang Bị Đặc Thù Thủy Lục
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentAmpTroop.standardEquipment.map((eq, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400">•</span>
                            <span>{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                        🧗 Kỹ Năng Leo Vách & Bơi Lặn
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentAmpTroop.survivalAndMovementSkills.map((sk, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400">✓</span>
                            <span>{sk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800 text-xs font-serif leading-relaxed italic text-slate-300">
                    &quot;{currentAmpTroop.proseExcerpt}&quot;
                  </div>
                </div>
              </div>
            )}

            {/* 3.3 AMPHIBIOUS TERRAIN (RIVER - MOUNTAIN - FOREST - CANYON) */}
            {amphibiousTab === 'ampTerrain' && (
              <div className="flex-1 flex overflow-hidden">
                <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col">
                  <div className="p-2.5 border-b border-slate-800 text-xs font-bold text-slate-300">
                    Bách Biến Địa Hình ({MASTER_HYBRID_TERRAIN_TACTICS.length})
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-1.5 scrollbar-thin">
                    {MASTER_HYBRID_TERRAIN_TACTICS.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedAmpTerrainId(t.id)}
                        className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start gap-2.5 ${
                          selectedAmpTerrainId === t.id
                            ? 'bg-emerald-950/70 border-emerald-500/70 text-emerald-100 shadow-md ring-1 ring-emerald-500/30'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xl p-1 bg-slate-800 rounded border border-slate-700/50">
                          🏞️
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate text-emerald-200">{t.name}</h4>
                          <span className="text-[10px] text-slate-400 block truncate">{t.topography}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-950/60">
                  <div className="border-b border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-emerald-200">{currentAmpTerrain.name}</h3>
                    <p className="text-xs text-slate-300 mt-1">{currentAmpTerrain.topography}</p>
                    <p className="text-xs text-red-400 mt-0.5">⚡ Nguy hiểm thời tiết: {currentAmpTerrain.weatherHazards}</p>
                  </div>

                  <div className="p-3 bg-emerald-950/20 rounded-xl border border-emerald-800/30">
                    <h5 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
                      Yếu Điểm Chiến Thuật Cần Chiếm Giữ:
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-200">
                      {currentAmpTerrain.tacticalKeypoints.map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-red-950/20 rounded-xl border border-red-900/40">
                      <h5 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-1">
                        Cạm Bẫy Tuyệt Diệt:
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentAmpTerrain.disastrousTraps.map((tr, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-red-400">☠</span>
                            <span>{tr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                        Quy Tắc Lương Thảo & Hậu Cần:
                      </h5>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {currentAmpTerrain.logisticsRules.map((lg, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400">📦</span>
                            <span>{lg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/50 rounded-xl border border-cyan-800/30 text-xs">
                    <span className="text-cyan-400 font-bold block mb-1">Trận Chiến Kinh Điển Điển Hình:</span>
                    <p className="text-slate-300 font-serif italic">{currentAmpTerrain.historicalClassicBattle}</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3.4 AMPHIBIOUS DRILL RULES & TAM PHÒNG */}
            {amphibiousTab === 'ampRules' && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                <div className="border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-cyan-200">
                    THẬP BÁT THỦY LỆNH, TAM PHÒNG BÍ QUYẾT & VƯỢT VỰC SINH TỒN
                  </h3>
                  <p className="text-xs text-slate-400">
                    Đạo rèn quân trước sóng gió, hẻm núi sâu, độc trùng và chướng khí ngàn năm
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MASTER_WATER_MOUNTAIN_RULES.map((rule) => (
                    <div key={rule.id} className="p-3.5 bg-slate-900/80 rounded-xl border border-cyan-900/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-cyan-300">{rule.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-700/40">
                          {rule.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-serif italic">&quot;{rule.teaching}&quot;</p>
                      <ul className="space-y-1 text-xs text-slate-300 pt-1">
                        {rule.practicalDrill.map((dr, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400">•</span>
                            <span>{dr}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-2 bg-slate-950 rounded border border-cyan-950/60 text-xs font-serif text-amber-300/90 italic">
                        {rule.warningVerse}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3.5 AMPHIBIOUS FULL TREATISE */}
            {amphibiousTab === 'ampTreatise' && (
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-950">
                <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-cyan-200 flex items-center gap-2">
                    <span>📖</span> TOÀN VĂN: CỬU CHÂU THỦY LỤC HIỂM ĐỊA THẦN CƠ BINH PHÁP
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(MASTER_AMPHIBIOUS_FULL_TREATISE, 'Đã sao chép thủy lục binh thư!')}
                      className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-200 rounded border border-slate-700"
                    >
                      📋 Sao chép
                    </button>
                    <button
                      onClick={() => handleInsert(MASTER_AMPHIBIOUS_FULL_TREATISE)}
                      className="px-3 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded shadow"
                    >
                      ✍️ Chèn vào chương
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-slate-900/60 rounded-xl border border-cyan-900/40 font-serif text-xs leading-relaxed text-cyan-100 whitespace-pre-wrap">
                  {MASTER_AMPHIBIOUS_FULL_TREATISE}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: DUEL SIMULATOR (SO KÈ TRẬN ĐỒ ĐỐI ĐẦU) */}
        {/* ========================================================= */}
        {doctrineMode === 'duel' && (
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin bg-slate-950">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-cyan-200 flex items-center gap-2">
                    <span>⚖️</span> MÔ PHỎNG ĐỐI ĐẦU QUÂN SỰ: TIÊN TRIỀU vs NGHỊCH CHIẾN
                  </h3>
                  <p className="text-xs text-slate-400">
                    Chọn trận đồ Đại Càn, hệ thống sẽ tự động đối chiếu trận pháp tương khắc và tạo phân cảnh đại chiến sử thi
                  </p>
                </div>
                <button
                  onClick={handleGenerateDuelScene}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg flex items-center gap-1.5 transition"
                >
                  <span>⚡</span> Khởi Tạo Phân Cảnh Huyết Chiến
                </button>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-amber-300 font-bold block mb-1">Trận Đồ Đại Càn Triển Khai:</label>
                  <select
                    value={duelTargetFormationId}
                    onChange={(e) => setDuelTargetFormationId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-amber-200"
                  >
                    {MASTER_BATTLE_FORMATIONS.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.symbol} {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Thống Soái Tiên Triều:</label>
                  <input
                    type="text"
                    value={duelCommanderEmpire}
                    onChange={(e) => setDuelCommanderEmpire(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Thống Soái Phá Trận:</label>
                  <input
                    type="text"
                    value={duelCommanderAnti}
                    onChange={(e) => setDuelCommanderAnti(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="text-slate-300 font-bold block mb-1">Chiến Trường Địa Hình Hiểm Yếu:</label>
                  <input
                    type="text"
                    value={duelTerrain}
                    onChange={(e) => setDuelTerrain(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-slate-200"
                  />
                </div>
              </div>

              {/* Visual Matchup Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Imperial Side */}
                <div className="p-3 bg-amber-950/30 rounded-xl border border-amber-600/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-900 text-amber-200 font-bold uppercase tracking-wider">
                      👑 Phe Tấn Công: Đại Càn Tiên Triều
                    </span>
                    <span className="text-lg">{duelTargetFormation.symbol}</span>
                  </div>
                  <h4 className="text-base font-bold text-amber-100">{duelTargetFormation.name}</h4>
                  <p className="text-xs text-amber-300/80 italic font-serif">&quot;{duelTargetFormation.corePhilosophy}&quot;</p>
                  <pre className="p-2 bg-slate-950 rounded border border-amber-900/40 text-[10px] font-mono text-amber-400 overflow-x-auto whitespace-pre">
                    {duelTargetFormation.diagramText}
                  </pre>
                </div>

                {/* Counter Side */}
                <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-600/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-900 text-purple-200 font-bold uppercase tracking-wider">
                      🗡️ Phe Hóa Giải: Liên Minh Phá Trận
                    </span>
                    <span className="text-lg">{matchedAntiFormation.symbol}</span>
                  </div>
                  <h4 className="text-base font-bold text-purple-100">{matchedAntiFormation.name}</h4>
                  <p className="text-xs text-purple-300/80 italic font-serif">&quot;{matchedAntiFormation.corePhilosophy}&quot;</p>
                  <pre className="p-2 bg-slate-950 rounded border border-purple-900/40 text-[10px] font-mono text-purple-300 overflow-x-auto whitespace-pre">
                    {matchedAntiFormation.diagramText}
                  </pre>
                </div>
              </div>

              {/* Generated Scene Output */}
              {duelProse && (
                <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <span>📖</span> Phân Cảnh So Trận Đã Tạo:
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopy(duelProse, 'Đã sao chép cảnh đối đầu!')}
                        className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded border border-slate-700"
                      >
                        📋 Sao chép
                      </button>
                      <button
                        onClick={() => handleInsert(duelProse)}
                        className="px-3 py-1 text-xs bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded shadow"
                      >
                        ✍️ Chèn vào chương
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-slate-200 font-serif leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto pr-2">
                    {duelProse}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
