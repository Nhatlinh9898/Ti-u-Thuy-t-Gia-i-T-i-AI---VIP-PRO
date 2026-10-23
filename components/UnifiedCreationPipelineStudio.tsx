import React, { useState } from 'react';
import {
  CharacterProfile,
  MasterCreationPipelineConfig,
  MasterCreationPipelineResult,
  SectPositionDetail,
  MasterCultivationStage,
  SwordDaoCanonItem,
  SpellDaoCanonItem,
  TalismanDaoCanonItem,
  SupremeCultivationMethodItem
} from '../types';
import { PRESET_11_SECT_POSITIONS } from '../data/presetSectPositions';
import { PRESET_MASTER_CULTIVATION_SPINE } from '../data/presetMasterCultivationSpine';
import { PRESET_SWORD_DAO_CANONS } from '../data/presetSwordDaoCanons';
import { PRESET_SPELL_DAO_CANONS } from '../data/presetSpellDaoCanons';
import { PRESET_TALISMAN_DAO_CANONS } from '../data/presetTalismanDaoCanons';
import { PRESET_CULTIVATION_METHODS } from '../data/presetCultivationMethods';
import { PRESET_SUBPLOT_ARCS } from '../data/presetSubplotArcs';
import { PRESET_MICRO_STORY_STRANDS } from '../data/presetMicroStoryStrands';
import { generateMasterCreationPipelineFlow } from '../services/geminiService';
import { Spinner } from './Spinner';

interface Props {
  characters: CharacterProfile[];
  genre: string;
  onInsertText: (text: string) => void;
  onCreateChapter?: (title: string, content: string, summary: string) => void;
}

export const UnifiedCreationPipelineStudio: React.FC<Props> = ({
  characters,
  genre,
  onInsertText,
  onCreateChapter
}) => {
  // Active Navigation Step in Pipeline
  const [activeStep, setActiveStep] = useState<number>(1);

  // Configuration State
  const [selectedCharId, setSelectedCharId] = useState<string>(characters[0]?.id || 'char_1');
  const [sectName, setSectName] = useState<string>('Thái Hư Kiếm Tông');
  const [selectedPositionId, setSelectedPositionId] = useState<string>(PRESET_11_SECT_POSITIONS[3]?.id || 'pos_chan_truyen'); // Chân Truyền
  const [selectedSpineStageId, setSelectedSpineStageId] = useState<string>(PRESET_MASTER_CULTIVATION_SPINE[1]?.id || 'spine_stage_2'); // Trúc Cơ & Tụ Đan
  const [selectedMethodId, setSelectedMethodId] = useState<string>(PRESET_CULTIVATION_METHODS[0]?.id || 'method_cuu_chuyen_huyen_cong');
  const [selectedSwordId, setSelectedSwordId] = useState<string>(PRESET_SWORD_DAO_CANONS[0]?.id || 'canon_thai_co_tru_tien');
  const [swordStanceIdx, setSwordStanceIdx] = useState<number>(0);
  const [selectedSpellId, setSelectedSpellId] = useState<string>(PRESET_SPELL_DAO_CANONS[0]?.id || 'canon_ngu_hanh_than_quang');
  const [spellIdx, setSpellIdx] = useState<number>(0);
  const [selectedTalismanId, setSelectedTalismanId] = useState<string>(PRESET_TALISMAN_DAO_CANONS[0]?.id || 'canon_thai_thuong_phu_luc');
  const [talismanIdx, setTalismanIdx] = useState<number>(0);

  // Conflict & Narrative Settings
  const [settingLocation, setSettingLocation] = useState<string>('Cổ Thần Bí Cảnh - Huyết Nguyệt Hạp Cốc');
  const [opponent, setOpponent] = useState<string>('Huyết Ma Giáo Thiếu Chủ cùng tam đại Ma Tướng');
  const [primaryConflict, setPrimaryConflict] = useState<string>('Tranh đoạt Thái Cổ Tiên Thiên Linh Thảo giữa lôi kiếp sắp giáng lâm');
  const [narrativePacing, setNarrativePacing] = useState<'dramatic_climax' | 'breakthrough_tribulation' | 'strategic_duel' | 'sect_intrigue' | 'full_chapter'>('dramatic_climax');
  const [wordCountTarget, setWordCountTarget] = useState<'compact' | 'standard' | 'epic_chapter'>('standard');
  const [literaryTone, setLiteraryTone] = useState<string>('Hào hùng bi tráng, nhiệt huyết sảng khoái, đậm chất tiên hiệp cổ phong');
  const [selectedSubplotId, setSelectedSubplotId] = useState<string>('');
  const [subplotRole, setSubplotRole] = useState<'plant_seed' | 'harvest_payoff' | 'mention_echo'>('plant_seed');
  const [selectedMicroStrandId, setSelectedMicroStrandId] = useState<string>('');

  // Generator & Result State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<string>('');
  const [pipelineResult, setPipelineResult] = useState<MasterCreationPipelineResult | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);
  const [viewTab, setViewTab] = useState<'prose' | 'strategy' | 'outline' | 'flowchart'>('prose');

  // Current entity lookups
  const activeChar = characters.find((c) => c.id === selectedCharId) || characters[0];
  const activePosition = PRESET_11_SECT_POSITIONS.find((p) => p.id === selectedPositionId) || PRESET_11_SECT_POSITIONS[0];
  const activeSpineStage = PRESET_MASTER_CULTIVATION_SPINE.find((s) => s.id === selectedSpineStageId) || PRESET_MASTER_CULTIVATION_SPINE[0];
  const activeMethod = PRESET_CULTIVATION_METHODS.find((m) => m.id === selectedMethodId) || PRESET_CULTIVATION_METHODS[0];
  const activeSword = PRESET_SWORD_DAO_CANONS.find((s) => s.id === selectedSwordId) || PRESET_SWORD_DAO_CANONS[0];
  const activeStance = activeSword.stances[swordStanceIdx] || activeSword.stances[0];
  const activeSpellCanon = PRESET_SPELL_DAO_CANONS.find((sp) => sp.id === selectedSpellId) || PRESET_SPELL_DAO_CANONS[0];
  const activeSpell = activeSpellCanon.spells[spellIdx] || activeSpellCanon.spells[0];
  const activeTalismanCanon = PRESET_TALISMAN_DAO_CANONS.find((t) => t.id === selectedTalismanId) || PRESET_TALISMAN_DAO_CANONS[0];
  const activeTalisman = activeTalismanCanon.talismans[talismanIdx] || activeTalismanCanon.talismans[0];

  // 1-Click Classic Presets
  const applyPreset = (presetType: 'phe_sai' | 'do_kiep' | 'chan_truyen' | 'dai_thua' | 'than_ma') => {
    if (presetType === 'phe_sai') {
      setSelectedPositionId('pos_ngoai_mon');
      setSelectedSpineStageId('spine_stage_1'); // Luyện khí
      setSettingLocation('Sinh Tử Đài Ngoại Môn - Thái Hư Kiếm Tông');
      setOpponent('Chấp Sự biểu đệ - kẻ ỷ thế cướp đoạt Trúc Cơ Đan');
      setPrimaryConflict('Bị ép lên sinh tử đài, nghịch tập trảm địch trước vạn môn nhân');
      setSwordStanceIdx(0);
      setNarrativePacing('dramatic_climax');
      setWordCountTarget('standard');
      setActiveStep(6);
    } else if (presetType === 'do_kiep') {
      setSelectedPositionId('pos_truong_lao');
      setSelectedSpineStageId('spine_stage_3'); // Nguyên Anh & Hóa Thần
      setSettingLocation('Độ Kiếp Phong - Đỉnh Cửu Tiêu Lôi Trì');
      setOpponent('Cửu Trọng Diệt Thế Tử Tiêu Thần Lôi & Tâm Ma Vực');
      setPrimaryConflict('Đột phá Hóa Thần, nghênh chiến thiên kiếp cùng ba tôn ma đầu đánh lén');
      setNarrativePacing('breakthrough_tribulation');
      setWordCountTarget('epic_chapter');
      setActiveStep(6);
    } else if (presetType === 'chan_truyen') {
      setSelectedPositionId('pos_chan_truyen');
      setSelectedSpineStageId('spine_stage_2'); // Kim Đan
      setSettingLocation('Cổ Thần Bí Cảnh - Huyết Nguyệt Hạp Cốc');
      setOpponent('Huyết Ma Giáo Thiếu Chủ cùng tam đại Ma Tướng');
      setPrimaryConflict('Tranh đoạt Thái Cổ Tiên Thiên Linh Thảo giữa lôi kiếp sắp giáng lâm');
      setNarrativePacing('dramatic_climax');
      setWordCountTarget('standard');
      setActiveStep(6);
    } else if (presetType === 'dai_thua') {
      setSelectedPositionId('pos_thai_thuong');
      setSelectedSpineStageId('spine_stage_5'); // Đại Thừa & Độ Kiếp
      setSettingLocation('Giới Ngoại Tinh Không - Cực Lạc Thiên Môn');
      setOpponent('Vực Ngoại Tà Thần Ma Tháp');
      setPrimaryConflict('Phá toái hư không phi thăng, một kiếm trảm giới bích khai thiên');
      setNarrativePacing('full_chapter');
      setWordCountTarget('epic_chapter');
      setActiveStep(6);
    } else if (presetType === 'than_ma') {
      setSelectedPositionId('pos_noi_mon');
      setSelectedSpineStageId('spine_stage_2');
      setSettingLocation('Vạn Yêu Quỷ Lâm - Hắc Thạch Tàn Trận');
      setOpponent('Ngũ Giai Lôi Dực Ma Báo & Tán Tu Đoàn Hung Hiểm');
      setPrimaryConflict('Nuốt chửng Thần Ma Huyết Tinh, luyện thể đột phá giữa vòng vây');
      setNarrativePacing('strategic_duel');
      setWordCountTarget('standard');
      setActiveStep(6);
    }
  };

  // Execution: Weave Novel Chapter Flow
  const handleWeavePipeline = async () => {
    setIsGenerating(true);
    setGenerationProgress('Đang đồng bộ thần niệm & xâu chuỗi Linh Căn, Tông Môn và Tuyến Mạch...');
    try {
      setTimeout(() => setGenerationProgress('Đang phối hợp Tam Đạo: Kiếm Khí, Ấn Quyết và Phù Triện...'), 800);
      setTimeout(() => setGenerationProgress('AI đang dệt văn xuôi cổ phong hào hùng theo bối cảnh sinh tử...'), 1600);

      const result = await generateMasterCreationPipelineFlow({
        character: activeChar,
        sectPosition: activePosition,
        sectName,
        spineStage: activeSpineStage,
        cultivationMethod: activeMethod,
        swordStance: activeStance,
        spell: activeSpell,
        talisman: activeTalisman,
        narrativeSetting: settingLocation,
        opponentOrObstacle: opponent,
        primaryConflict,
        narrativePacing,
        wordCountTarget,
        literaryTone
      });

      setPipelineResult(result);
      setActiveStep(7);
      setViewTab('prose');
    } catch (err) {
      console.error('Lỗi sinh luồng sáng tác:', err);
    } finally {
      setIsGenerating(false);
      setGenerationProgress('');
    }
  };

  const handleCopyProse = () => {
    if (!pipelineResult) return;
    navigator.clipboard.writeText(pipelineResult.wovenProse);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!pipelineResult) return;
    const blob = new Blob([`${pipelineResult.pipelineTitle}\n\n${pipelineResult.wovenProse}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pipelineResult.pipelineTitle.replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-[#080c14] text-gray-200 select-none overflow-hidden font-sans">
      {/* HEADER BANNER */}
      <div className="p-3.5 bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-amber-950/80 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-purple-600 to-cyan-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-950/80 animate-pulse">
            <span className="text-xl">🌊</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-amber-200 tracking-wide">
                MẠCH NỐI SÁNG TÁC TOÀN DIỆN (MASTER CREATION PIPELINE)
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-gradient-to-r from-amber-500 to-purple-600 text-black uppercase">
                Siêu Cấp Liền Mạch
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Xâu chuỗi trọn vẹn: <span className="text-purple-300">Linh Căn</span> ➔ <span className="text-amber-300">Tông Môn (11 Cấp)</span> ➔ <span className="text-cyan-300">Tuyến Mạch Cốt Lõi</span> ➔ <span className="text-red-300">Tu Pháp</span> ➔ <span className="text-emerald-300">Kiếm • Thuật • Phù</span> ➔ <span className="text-yellow-300">Chương Văn Xuôi</span>
            </p>
          </div>
        </div>

        {/* 1-Click Classic Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[10px] text-amber-400/80 font-bold uppercase tracking-wider mr-1">Mẫu Nhanh:</span>
          <button
            onClick={() => applyPreset('phe_sai')}
            className="px-2.5 py-1 rounded-lg bg-gray-900/80 hover:bg-amber-950/70 border border-amber-500/40 text-[11px] font-bold text-amber-200 transition-all hover:scale-105"
          >
            🌱 Phế Sài Ngoại Môn
          </button>
          <button
            onClick={() => applyPreset('chan_truyen')}
            className="px-2.5 py-1 rounded-lg bg-gray-900/80 hover:bg-cyan-950/70 border border-cyan-500/40 text-[11px] font-bold text-cyan-200 transition-all hover:scale-105"
          >
            🗡️ Chân Truyền Trảm Ma
          </button>
          <button
            onClick={() => applyPreset('do_kiep')}
            className="px-2.5 py-1 rounded-lg bg-gray-900/80 hover:bg-purple-950/70 border border-purple-500/40 text-[11px] font-bold text-purple-200 transition-all hover:scale-105"
          >
            ⚡ Độ Kiếp Hóa Thần
          </button>
          <button
            onClick={() => applyPreset('than_ma')}
            className="px-2.5 py-1 rounded-lg bg-gray-900/80 hover:bg-red-950/70 border border-red-500/40 text-[11px] font-bold text-red-200 transition-all hover:scale-105"
          >
            🔥 Thần Ma Luyện Thể
          </button>
          <button
            onClick={() => applyPreset('dai_thua')}
            className="px-2.5 py-1 rounded-lg bg-gray-900/80 hover:bg-yellow-950/70 border border-yellow-500/50 text-[11px] font-black text-yellow-300 transition-all hover:scale-105"
          >
            🌌 Khai Thiên Phi Thăng
          </button>
        </div>
      </div>

      {/* PIPELINE PROGRESS RIBBON (7 STAGES FLOW) */}
      <div className="bg-gray-950/90 px-3 py-2 border-b border-white/10 overflow-x-auto custom-scrollbar flex items-center justify-between gap-1 shrink-0">
        {[
          { step: 1, label: '1. Căn Cốt & Nhân Vật', icon: '👤', tag: activeChar.name },
          { step: 2, label: '2. Vị Trí Môn Phái', icon: '🏛️', tag: activePosition.rankName.split(' ')[0] },
          { step: 3, label: '3. Tuyến Mạch Cốt Lõi', icon: '🌀', tag: activeSpineStage.stageName.split(' ')[0] },
          { step: 4, label: '4. Tu Pháp Thể Phách', icon: '🔥', tag: activeMethod.name.split(' ')[0] },
          { step: 5, label: '5. Tam Đạo Võ Học', icon: '⚔️', tag: 'Kiếm • Thuật • Phù' },
          { step: 6, label: '6. Bối Cảnh Xung Đột', icon: '⚡', tag: settingLocation.split('-')[0] },
          { step: 7, label: '7. Dệt Văn Xuôi', icon: '📖', tag: pipelineResult ? 'Đã sinh' : 'Chờ dệt' },
        ].map((item, idx) => {
          const isActive = activeStep === item.step;
          return (
            <React.Fragment key={item.step}>
              <button
                onClick={() => setActiveStep(item.step)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/50 ring-1 ring-amber-300'
                    : 'bg-gray-900/70 text-gray-400 hover:text-white hover:bg-gray-800/80 border border-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
                <span className="text-[10px] opacity-75 max-w-[80px] truncate bg-black/40 px-1.5 py-0.5 rounded">
                  {item.tag}
                </span>
              </button>
              {idx < 6 && <span className="text-gray-600 text-xs px-0.5">➔</span>}
            </React.Fragment>
          );
        })}
      </div>

      {/* MAIN PIPELINE WORKSPACE */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 md:p-4 space-y-4">
        {/* STEP 1: NHÂN VẬT & LINH CĂN */}
        {activeStep === 1 && (
          <div className="bg-gray-900/70 border border-purple-500/30 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-purple-300 flex items-center gap-2">
                <span>👤</span> BƯỚC 1: THIẾT LẬP NHÂN VẬT, LINH CĂN & ĐẠO TÂM
              </h3>
              <span className="text-xs text-gray-400">Trục căn bản quyết định thiên tư và tâm ma</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">CHỌN NHÂN VẬT CHỦ TRÌ:</label>
                <select
                  value={selectedCharId}
                  onChange={(e) => setSelectedCharId(e.target.value)}
                  className="w-full bg-gray-950 border border-purple-500/40 rounded-xl p-2.5 text-xs text-vip-gold font-bold outline-none"
                >
                  {characters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.role || 'Nhân vật'}) - {(c as any).spiritualRoot || c.spiritualRoots || c.spiritualRootDetail?.rootName || 'Thiên Căn'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">LINH CĂN TIÊN THIÊN:</label>
                <div className="bg-gray-950 p-2.5 rounded-xl border border-white/10 text-xs text-purple-200">
                  {(activeChar as any).spiritualRoot || activeChar.spiritualRoots || activeChar.spiritualRootDetail?.rootName || 'Hỗn Độn Ngũ Hành Khai Thiên Căn'}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">ĐẠO TÂM & THẦN THỨC:</label>
                <div className="bg-gray-950 p-2.5 rounded-xl border border-white/10 text-xs text-amber-300">
                  {activeChar.daoHeart || 'Vô Địch Kiếm Tâm'} • Ngộ Tính: {(activeChar as any).comprehensionScore || 95}/100
                </div>
              </div>
            </div>

            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 text-xs space-y-2">
              <div className="font-bold text-purple-200 flex items-center gap-2">
                <span>✨</span> Thiên Phú Dị Bẩm & Thể Chất:
              </div>
              <div className="flex flex-wrap gap-2">
                {(activeChar.innateTalents && activeChar.innateTalents.length > 0
                  ? activeChar.innateTalents
                  : ['Chí Tôn Cốt', 'Vô Địch Kiếm Ý', 'Thiên Thiên Đạo Đồng']
                ).map((talent, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-purple-900/60 border border-purple-400/40 rounded-lg text-purple-200 font-semibold"
                  >
                    ✦ {talent}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep(2)}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xs font-bold text-white hover:brightness-110 shadow-md flex items-center gap-1.5"
              >
                Tiếp tục: Chọn Vị Trí Môn Phái ➔
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: VỊ TRÍ TÔNG MÔN (11 CẤP BẬC) */}
        {activeStep === 2 && (
          <div className="bg-gray-900/70 border border-amber-500/30 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-amber-300 flex items-center gap-2">
                <span>🏛️</span> BƯỚC 2: THÂN PHẬN TÔNG MÔN & 11 PHẨM BẬC CHỨC VỤ
              </h3>
              <span className="text-xs text-gray-400">Trục quyền lực, động phủ và tài nguyên bổng lộc</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">TÊN TÔNG MÔN CHỦ QUẢN:</label>
                <input
                  type="text"
                  value={sectName}
                  onChange={(e) => setSectName(e.target.value)}
                  className="w-full bg-gray-950 border border-amber-500/40 rounded-xl p-2.5 text-xs text-amber-200 font-bold outline-none"
                  placeholder="Ví dụ: Thái Hư Kiếm Tông, Cửu U Ma Tông..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">CHỨC VỤ TRONG 11 CẤP BẬC:</label>
                <select
                  value={selectedPositionId}
                  onChange={(e) => setSelectedPositionId(e.target.value)}
                  className="w-full bg-gray-950 border border-amber-500/40 rounded-xl p-2.5 text-xs text-amber-300 font-bold outline-none"
                >
                  {PRESET_11_SECT_POSITIONS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.tier} - {p.rankName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Position Details Card */}
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3.5 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-200 text-sm">{activePosition.rankName}</span>
                <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-400/40 text-[10px] font-bold">
                  Yêu cầu: {activePosition.requiredCultivationRealm}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
                <div>
                  <span className="text-amber-400 font-semibold">🏠 Động Phủ:</span> {activePosition.residenceArea}
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">💎 Bổng Lộc Hàng Tháng:</span> {activePosition.resourceMonthlyStipend}
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">📜 Quyền Hạn:</span> {activePosition.scopeOfAuthority}
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">🏷️ Lệnh Bài & Đạo Bào:</span> {activePosition.clothingAndToken}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 font-bold"
              >
                ⬅ Quay lại
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-5 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl text-xs font-bold text-gray-950 hover:brightness-110 shadow-md flex items-center gap-1.5"
              >
                Tiếp tục: Cảnh Giới Tuyến Mạch ➔
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TUYẾN MẠCH CỐT LÕI (8 ĐẠI TẦNG) */}
        {activeStep === 3 && (
          <div className="bg-gray-900/70 border border-cyan-500/30 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-cyan-300 flex items-center gap-2">
                <span>🌀</span> BƯỚC 3: CẢNH GIỚI TUYẾN MẠCH CỐT LÕI (8 ĐẠI TẦNG)
              </h3>
              <span className="text-xs text-gray-400">Trục năng lượng sinh tử & thước đo sức mạnh vũ trụ</span>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-400 mb-2">CHỌN ĐẠI TẦNG TIẾN TRÌNH:</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {PRESET_MASTER_CULTIVATION_SPINE.map((stage) => {
                  const isCur = stage.id === selectedSpineStageId;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedSpineStageId(stage.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        isCur
                          ? 'bg-gradient-to-br from-cyan-950 to-blue-900 border-cyan-400 shadow-md text-white ring-1 ring-cyan-300'
                          : 'bg-gray-950 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                      }`}
                    >
                      <div className="text-[10px] font-black uppercase text-cyan-400">Cấp {stage.stageOrder}</div>
                      <div className="font-bold text-xs truncate mt-0.5">{stage.stageName}</div>
                      <div className="text-[10px] text-gray-400 truncate mt-1">{stage.realmTierTitle}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Detailed Info */}
            <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-3.5 text-xs space-y-2 text-gray-300">
              <div className="flex items-center justify-between text-cyan-200 font-bold">
                <span>Đại Cảnh Giới: {activeSpineStage.realmTierTitle}</span>
                <span className="text-gray-400">Thọ Nguyên: {activeSpineStage.lifespanSpan}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <span className="text-cyan-400 font-semibold">💪 Luyện Thể:</span> {activeSpineStage.bodyTempering.stageTitle} - {activeSpineStage.bodyTempering.boneAndMarrowRefinement}
                </div>
                <div>
                  <span className="text-cyan-400 font-semibold">⚔️ Kiếm Khí:</span> {activeSpineStage.swordDao.stageTitle} - {activeSpineStage.swordDao.swordIntentTier}
                </div>
                <div>
                  <span className="text-cyan-400 font-semibold">🔮 Pháp Thuật:</span> {activeSpineStage.spellDao.spellTier} ({activeSpineStage.spellDao.representativeSpells.join(', ')})
                </div>
                <div>
                  <span className="text-cyan-400 font-semibold">📜 Phù Lục:</span> {activeSpineStage.talismanDao.grade} ({activeSpineStage.talismanDao.typicalTalismans.join(', ')})
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setActiveStep(2)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 font-bold"
              >
                ⬅ Quay lại
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-xs font-bold text-white hover:brightness-110 shadow-md flex items-center gap-1.5"
              >
                Tiếp tục: Chọn Tu Pháp Luyện Thể ➔
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: TU PHÁP LUYỆN THỂ */}
        {activeStep === 4 && (
          <div className="bg-gray-900/70 border border-red-500/30 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-red-300 flex items-center gap-2">
                <span>🔥</span> BƯỚC 4: BỘ CÔNG PHÁP & TU PHÁP LUYỆN THỂ
              </h3>
              <span className="text-xs text-gray-400">Trục công pháp vận hành kinh mạch & thần ma biến hóa</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">CHỌN BỘ CÔNG PHÁP TRẤN MẠCH:</label>
                <select
                  value={selectedMethodId}
                  onChange={(e) => setSelectedMethodId(e.target.value)}
                  className="w-full bg-gray-950 border border-red-500/40 rounded-xl p-2.5 text-xs text-red-200 font-bold outline-none"
                >
                  {PRESET_CULTIVATION_METHODS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} [{m.path}] - {m.gradeLevel}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-red-950/30 border border-red-500/20 rounded-xl p-3 text-xs space-y-1">
                <div className="font-bold text-red-300">{activeMethod.name}</div>
                <div className="text-gray-300 italic">{activeMethod.corePhilosophy}</div>
                <div className="text-gray-400 text-[11px] pt-1">
                  Đường lối khí huyết: {activeMethod.energyCircuitRoute}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setActiveStep(3)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 font-bold"
              >
                ⬅ Quay lại
              </button>
              <button
                onClick={() => setActiveStep(5)}
                className="px-5 py-2 bg-gradient-to-r from-red-600 to-amber-600 rounded-xl text-xs font-bold text-white hover:brightness-110 shadow-md flex items-center gap-1.5"
              >
                Tiếp tục: Phối Hợp Tam Đạo Võ Học ➔
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: TAM ĐẠO VÕ HỌC (KIẾM ĐẠO • THUẬT PHÁP • PHÙ LỤC) */}
        {activeStep === 5 && (
          <div className="bg-gray-900/70 border border-emerald-500/30 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-emerald-300 flex items-center gap-2">
                <span>⚔️</span> BƯỚC 5: PHỐI HỢP TAM ĐẠO (KIẾM ĐẠO • THUẬT PHÁP • PHÙ LỤC)
              </h3>
              <span className="text-xs text-gray-400">Đỉnh cao liên chiêu: kiếm ý xuất trần, thủ ấn lôi đình, hư không họa phù</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* KIẾM ĐẠO */}
              <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-cyan-300 font-bold text-xs">
                  <span>🗡️ Kiếm Đạo Chí Tôn</span>
                </div>
                <select
                  value={selectedSwordId}
                  onChange={(e) => {
                    setSelectedSwordId(e.target.value);
                    setSwordStanceIdx(0);
                  }}
                  className="w-full bg-gray-950 border border-cyan-500/30 rounded-lg p-2 text-xs text-cyan-200 outline-none"
                >
                  {PRESET_SWORD_DAO_CANONS.map((sw) => (
                    <option key={sw.id} value={sw.id}>
                      {sw.name}
                    </option>
                  ))}
                </select>
                <label className="block text-[10px] text-gray-400 font-semibold">Chiêu thức thi triển:</label>
                <select
                  value={swordStanceIdx}
                  onChange={(e) => setSwordStanceIdx(parseInt(e.target.value, 10))}
                  className="w-full bg-gray-950 border border-cyan-500/30 rounded-lg p-1.5 text-xs text-cyan-300 outline-none"
                >
                  {activeSword.stances.map((st, i) => (
                    <option key={i} value={i}>
                      {st.stanceName}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-gray-300 bg-black/40 p-2 rounded border border-white/5">
                  <span className="text-cyan-400 font-semibold">Khẩu quyết:</span> {activeStance.mantraOrIncantation}
                </div>
              </div>

              {/* THUẬT PHÁP */}
              <div className="bg-purple-950/30 border border-purple-500/30 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-purple-300 font-bold text-xs">
                  <span>🔮 Thuật Pháp & Pháp Ấn</span>
                </div>
                <select
                  value={selectedSpellId}
                  onChange={(e) => {
                    setSelectedSpellId(e.target.value);
                    setSpellIdx(0);
                  }}
                  className="w-full bg-gray-950 border border-purple-500/30 rounded-lg p-2 text-xs text-purple-200 outline-none"
                >
                  {PRESET_SPELL_DAO_CANONS.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.name}
                    </option>
                  ))}
                </select>
                <label className="block text-[10px] text-gray-400 font-semibold">Thuật pháp kích hoạt:</label>
                <select
                  value={spellIdx}
                  onChange={(e) => setSpellIdx(parseInt(e.target.value, 10))}
                  className="w-full bg-gray-950 border border-purple-500/30 rounded-lg p-1.5 text-xs text-purple-300 outline-none"
                >
                  {activeSpellCanon.spells.map((sp, i) => (
                    <option key={i} value={i}>
                      {sp.spellName}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-gray-300 bg-black/40 p-2 rounded border border-white/5">
                  <span className="text-purple-400 font-semibold">Thủ ấn:</span> {activeSpell.handMudraFormula}
                </div>
              </div>

              {/* PHÙ LỤC */}
              <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-amber-300 font-bold text-xs">
                  <span>📜 Phù Lục & Đạo Triện</span>
                </div>
                <select
                  value={selectedTalismanId}
                  onChange={(e) => {
                    setSelectedTalismanId(e.target.value);
                    setTalismanIdx(0);
                  }}
                  className="w-full bg-gray-950 border border-amber-500/30 rounded-lg p-2 text-xs text-amber-200 outline-none"
                >
                  {PRESET_TALISMAN_DAO_CANONS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <label className="block text-[10px] text-gray-400 font-semibold">Đạo phù kích nổ:</label>
                <select
                  value={talismanIdx}
                  onChange={(e) => setTalismanIdx(parseInt(e.target.value, 10))}
                  className="w-full bg-gray-950 border border-amber-500/30 rounded-lg p-1.5 text-xs text-amber-300 outline-none"
                >
                  {activeTalismanCanon.talismans.map((tl, i) => (
                    <option key={i} value={i}>
                      {tl.talismanName}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-gray-300 bg-black/40 p-2 rounded border border-white/5">
                  <span className="text-amber-400 font-semibold">Vận bút:</span> {activeTalisman.brushMovementScripture}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setActiveStep(4)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 font-bold"
              >
                ⬅ Quay lại
              </button>
              <button
                onClick={() => setActiveStep(6)}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-xs font-bold text-white hover:brightness-110 shadow-md flex items-center gap-1.5"
              >
                Tiếp tục: Thiết Lập Bối Cảnh Xung Đột ➔
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: BỐI CẢNH & XUNG ĐỘT KỊCH TÍNH */}
        {activeStep === 6 && (
          <div className="bg-gray-900/70 border border-yellow-500/30 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-yellow-300 flex items-center gap-2">
                <span>⚡</span> BƯỚC 6: BỐI CẢNH, ĐỐI THỦ & CAO TRÀO ĐẠI XUNG ĐỘT
              </h3>
              <span className="text-xs text-gray-400">Ngòi nổ cốt truyện & định hình cao trào phân cảnh</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">ĐỊA ĐIỂM CHIẾN TRƯỜNG:</label>
                <input
                  type="text"
                  value={settingLocation}
                  onChange={(e) => setSettingLocation(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white outline-none"
                  placeholder="Ví dụ: Bí Cảnh Cổ Thần, Sinh Tử Đài, Lôi Trì..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">ĐỐI THỦ / NGUY CƠ:</label>
                <input
                  type="text"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white outline-none"
                  placeholder="Ví dụ: Ma Đầu Nguyên Anh, Lôi Kiếp Cửu Trọng..."
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">MỤC TIÊU / ĐẠI XUNG ĐỘT:</label>
                <input
                  type="text"
                  value={primaryConflict}
                  onChange={(e) => setPrimaryConflict(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2.5 text-xs text-white outline-none"
                  placeholder="Ví dụ: Đoạt bảo, đột phá sinh tử, rửa nhục..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">TIẾT TẤU PHÂN CẢNH:</label>
                <select
                  value={narrativePacing}
                  onChange={(e) => setNarrativePacing(e.target.value as any)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2 text-xs text-yellow-300 outline-none font-bold"
                >
                  <option value="dramatic_climax">⚔️ Đại Chiến Cao Trào Nghẹt Thở</option>
                  <option value="breakthrough_tribulation">⚡ Độ Kiếp & Phá Vỡ Bình Cảnh</option>
                  <option value="strategic_duel">🧠 Đấu Trí & Đấu Pháp Mưu Lược</option>
                  <option value="sect_intrigue">🏛️ Tranh Đoạt Âm Mưu Tông Môn</option>
                  <option value="full_chapter">📖 Trọn Vẹn Một Chương Tiểu Thuyết</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">QUY MÔ ĐỘ DÀI:</label>
                <select
                  value={wordCountTarget}
                  onChange={(e) => setWordCountTarget(e.target.value as any)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2 text-xs text-vip-gold outline-none font-bold"
                >
                  <option value="compact">Gọn Gàng (900 - 1400 từ)</option>
                  <option value="standard">Chuẩn Mực (1600 - 2200 từ)</option>
                  <option value="epic_chapter">Đại Chương Hùng Tráng (2500 - 3200 từ)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1">GIỌNG VĂN (TONE):</label>
                <input
                  type="text"
                  value={literaryTone}
                  onChange={(e) => setLiteraryTone(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl p-2 text-xs text-gray-300 outline-none"
                />
              </div>
            </div>

            {/* SUBPLOT ARC INTEGRATION (PHỤC BÚT & DỮ KIỆN NGẦM) */}
            <div className="p-3 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                  <span>🧶</span> ĐAN CÀI NHÁNH PHỤ / PHỤC BÚT LIỀN MẠCH (TÙY CHỌN):
                </label>
                {selectedSubplotId && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400 font-semibold">Vai trò trong phân cảnh:</span>
                    <select
                      value={subplotRole}
                      onChange={(e) => setSubplotRole(e.target.value as any)}
                      className="bg-gray-900 border border-purple-400/40 rounded px-2 py-0.5 text-[10px] text-purple-200 outline-none font-bold"
                    >
                      <option value="plant_seed">🌱 Gieo mầm dữ kiện ngầm (Plant Seed)</option>
                      <option value="harvest_payoff">💥 Bùng nổ nhân quả giải cứu (Harvest Payoff)</option>
                      <option value="mention_echo">🔔 Nhắc lại gợi nhớ (Mention Echo)</option>
                    </select>
                  </div>
                )}
              </div>
              <select
                value={selectedSubplotId}
                onChange={(e) => setSelectedSubplotId(e.target.value)}
                className="w-full bg-gray-950 border border-purple-500/40 rounded-lg p-2 text-xs text-purple-200 outline-none"
              >
                <option value="">-- Không đan cài nhánh phụ (Chỉ tập trung đại xung đột mạch chính) --</option>
                {PRESET_SUBPLOT_ARCS.map((arc) => (
                  <option key={arc.id} value={arc.id}>
                    [{arc.plantedStageName.split(':')[0]} ➔ {arc.payoffStageName.split(':')[0]}] {arc.title}
                  </option>
                ))}
              </select>
            </div>

            {/* MICRO-STORY STRAND INTEGRATION (TIỂU PHÂN NHÁNH CỤC BỘ) */}
            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>🌿</span> LỒNG GHÉP TIỂU PHÂN NHÁNH VI MÔ (NHỎ HƠN MẠCH CHÍNH):
                </label>
                {selectedMicroStrandId && (
                  <span className="text-[10px] text-emerald-400 font-mono">
                    ✓ Đã chọn: {PRESET_MICRO_STORY_STRANDS.find(s => s.id === selectedMicroStrandId)?.tangibleReward}
                  </span>
                )}
              </div>
              <select
                value={selectedMicroStrandId}
                onChange={(e) => {
                  setSelectedMicroStrandId(e.target.value);
                  const strand = PRESET_MICRO_STORY_STRANDS.find(s => s.id === e.target.value);
                  if (strand && !primaryConflict.includes(strand.title)) {
                    setPrimaryConflict(prev => `${prev} • Kèm tiểu biến cố: ${strand.localTrigger}`);
                  }
                }}
                className="w-full bg-gray-950 border border-emerald-500/40 rounded-lg p-2 text-xs text-emerald-200 outline-none"
              >
                <option value="">-- Không lồng tiểu nhánh (Chương truyện phát triển theo nhịp thông thường) --</option>
                {PRESET_MICRO_STORY_STRANDS.map((strand) => (
                  <option key={strand.id} value={strand.id}>
                    [{strand.scope === 'single_scene' ? '1 Cảnh' : strand.scope === 'short_episode' ? '1 Chương' : '2 Chương'}] {strand.title} (Chiến lợi phẩm: {strand.tangibleReward})
                  </option>
                ))}
              </select>
            </div>

            {/* ACTION BUTTON TO EXECUTE WEAVE */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setActiveStep(5)}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 font-bold"
              >
                ⬅ Quay lại Tam Đạo
              </button>

              <button
                onClick={handleWeavePipeline}
                disabled={isGenerating}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-purple-600 to-cyan-500 hover:brightness-110 disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-xl shadow-purple-950/70 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                {isGenerating ? <Spinner /> : '🚀 KHỞI ĐỘNG DỆT LUỒNG SÁNG TÁC (AI MASTER WEAVE)'}
              </button>
            </div>

            {isGenerating && (
              <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-center text-xs text-purple-200 animate-pulse">
                {generationProgress}
              </div>
            )}
          </div>
        )}

        {/* STEP 7: KẾT QUẢ DỆT VĂN XUÔI & SƠ ĐỒ MẠCH SÁNG TÁC */}
        {activeStep === 7 && (
          <div className="bg-gray-900/80 border border-amber-500/40 rounded-2xl p-4 space-y-4 shadow-2xl">
            {pipelineResult ? (
              <>
                {/* Result Title & Tab Controls */}
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-white/10 gap-2">
                  <div className="flex-1 min-w-[200px]">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                      BẢN THẢO DỆT XONG TỪ LUỒNG TOÀN DIỆN
                    </span>
                    <h3 className="text-base md:text-lg font-black text-vip-gold mt-1">
                      {pipelineResult.pipelineTitle}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setViewTab('prose')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewTab === 'prose' ? 'bg-amber-600 text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      📖 Văn Xuôi
                    </button>
                    <button
                      onClick={() => setViewTab('strategy')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewTab === 'strategy' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      ⚔️ Tam Đạo & Chiến Thuật
                    </button>
                    <button
                      onClick={() => setViewTab('outline')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewTab === 'outline' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      📋 Dàn Ý 4 Hồi
                    </button>
                    <button
                      onClick={() => setViewTab('flowchart')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        viewTab === 'flowchart' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      🌐 Sơ Đồ Mạch Chảy
                    </button>
                  </div>
                </div>

                {/* TAB 1: PROSE VIEW */}
                {viewTab === 'prose' && (
                  <div className="space-y-3">
                    <div className="bg-gray-950/90 rounded-2xl border border-amber-500/20 p-4 md:p-6 text-gray-100 font-serif text-sm md:text-base leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar whitespace-pre-line shadow-inner">
                      {pipelineResult.wovenProse}
                    </div>

                    {/* Plot continuation hooks */}
                    {pipelineResult.plotContinuationHooks && pipelineResult.plotContinuationHooks.length > 0 && (
                      <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-3 text-xs space-y-1.5">
                        <div className="font-bold text-purple-300 flex items-center gap-1.5">
                          <span>🌱</span> Hạt Giống Tình Tiết Nối Sang Chương Sau:
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-300">
                          {pipelineResult.plotContinuationHooks.map((hook, i) => (
                            <li key={i}>{hook}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: STRATEGY & TACTICAL ANALYSIS */}
                {viewTab === 'strategy' && (
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-purple-950/30 border border-purple-500/20 p-3 rounded-xl">
                        <span className="font-bold text-purple-300 block mb-1">👤 Căn Cốt & Đạo Tâm:</span>
                        <p className="text-gray-300">{pipelineResult.characterFullSummary}</p>
                      </div>
                      <div className="bg-amber-950/30 border border-amber-500/20 p-3 rounded-xl">
                        <span className="font-bold text-amber-300 block mb-1">🏛️ Vai Trò & Thân Phận Tông Môn:</span>
                        <p className="text-gray-300">{pipelineResult.sectStandingSummary}</p>
                      </div>
                      <div className="bg-cyan-950/30 border border-cyan-500/20 p-3 rounded-xl">
                        <span className="font-bold text-cyan-300 block mb-1">🌀 Tuyến Mạch Vận Chuyển:</span>
                        <p className="text-gray-300">{pipelineResult.cultivationCircuitSummary}</p>
                      </div>
                      <div className="bg-emerald-950/30 border border-emerald-500/20 p-3 rounded-xl">
                        <span className="font-bold text-emerald-300 block mb-1">⚔️ Tam Đạo Hợp Nhất Chiến Thuật:</span>
                        <p className="text-gray-300">{pipelineResult.martialTrinitySummary}</p>
                      </div>
                    </div>

                    <div className="bg-gray-950 p-3.5 rounded-xl border border-white/10 space-y-2">
                      <div className="font-bold text-amber-300">Chiến Thuật Phân Cảnh 4 Nhịp:</div>
                      <p className="text-gray-300 leading-relaxed">
                        {pipelineResult.sceneDynamics.tacticalChoreography}
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 3: OUTLINE */}
                {viewTab === 'outline' && (
                  <div className="space-y-2 text-xs">
                    {pipelineResult.chapterOutlineSuggested?.map((item, i) => (
                      <div
                        key={i}
                        className="bg-gray-950 p-3 rounded-xl border border-cyan-500/20 flex items-start gap-3"
                      >
                        <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold shrink-0">
                          {item.act}
                        </span>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 4: INTERACTIVE FLOWCHART VISUALIZER */}
                {viewTab === 'flowchart' && (
                  <div className="bg-black/50 p-4 rounded-xl border border-indigo-500/30 text-xs space-y-4">
                    <h4 className="font-bold text-indigo-300 text-center uppercase tracking-wider">
                      Sơ Đồ Mạch Chảy Tuyến Tính Của Phân Cảnh
                    </h4>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-2 overflow-x-auto p-2">
                      <div className="p-3 bg-purple-950/70 border border-purple-400 rounded-xl text-center min-w-[120px]">
                        <div className="text-purple-300 font-bold">{activeChar.name}</div>
                        <div className="text-[10px] text-gray-400">Linh Căn & Đạo Tâm</div>
                      </div>
                      <span className="text-amber-400 font-bold">➔</span>

                      <div className="p-3 bg-amber-950/70 border border-amber-400 rounded-xl text-center min-w-[120px]">
                        <div className="text-amber-300 font-bold">{activePosition.rankName.split(' ')[0]}</div>
                        <div className="text-[10px] text-gray-400">{sectName}</div>
                      </div>
                      <span className="text-amber-400 font-bold">➔</span>

                      <div className="p-3 bg-cyan-950/70 border border-cyan-400 rounded-xl text-center min-w-[120px]">
                        <div className="text-cyan-300 font-bold">{activeSpineStage.stageName.split(' ')[0]}</div>
                        <div className="text-[10px] text-gray-400">Tuyến Mạch Cảnh Giới</div>
                      </div>
                      <span className="text-amber-400 font-bold">➔</span>

                      <div className="p-3 bg-emerald-950/70 border border-emerald-400 rounded-xl text-center min-w-[130px]">
                        <div className="text-emerald-300 font-bold">Tam Đạo Võ Học</div>
                        <div className="text-[10px] text-gray-400">Kiếm + Thuật + Phù</div>
                      </div>
                      <span className="text-amber-400 font-bold">➔</span>

                      <div className="p-3 bg-yellow-950/70 border border-yellow-400 rounded-xl text-center min-w-[120px]">
                        <div className="text-yellow-300 font-bold">Đại Xung Đột</div>
                        <div className="text-[10px] text-gray-400">{opponent.slice(0, 15)}...</div>
                      </div>
                      <span className="text-amber-400 font-bold">➔</span>

                      <div className="p-3 bg-indigo-950/70 border border-indigo-400 rounded-xl text-center min-w-[120px]">
                        <div className="text-indigo-300 font-bold">Chương Văn Xuôi</div>
                        <div className="text-[10px] text-emerald-400">Hoàn Tất</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRIMARY ACTIONS BAR */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveStep(6)}
                      className="px-3.5 py-2 bg-gray-800 text-gray-300 rounded-xl text-xs hover:bg-gray-700 font-bold"
                    >
                      ⚙️ Chỉnh sửa thông số
                    </button>
                    <button
                      onClick={handleWeavePipeline}
                      disabled={isGenerating}
                      className="px-4 py-2 bg-purple-900/80 hover:bg-purple-800 border border-purple-400/50 text-purple-200 rounded-xl text-xs font-bold"
                    >
                      🔄 Sinh Lại Bản Thảo
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyProse}
                      className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 border border-white/10 rounded-xl text-xs font-bold text-gray-200"
                    >
                      {copiedStatus ? '✅ Đã Sao Chép!' : '📋 Sao Chép'}
                    </button>

                    <button
                      onClick={handleDownloadTxt}
                      className="px-3.5 py-2 bg-gray-800 hover:bg-gray-700 border border-white/10 rounded-xl text-xs font-bold text-gray-200"
                    >
                      💾 Tải File .TXT
                    </button>

                    {onCreateChapter && (
                      <button
                        onClick={() => {
                          onCreateChapter(
                            pipelineResult.pipelineTitle,
                            pipelineResult.wovenProse,
                            pipelineResult.characterFullSummary
                          );
                          alert('Đã tạo chương mới thành công trong cây cốt truyện!');
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md"
                      >
                        ➕ Tạo Chương Mới Vào Cây
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onInsertText(pipelineResult.wovenProse);
                        alert('Đã chèn nội dung vào chương văn học hiện tại!');
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-gray-950 font-black rounded-xl text-xs shadow-lg shadow-amber-950/60"
                    >
                      📝 Chèn Vào Chương Đang Viết
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-10 space-y-3">
                <div className="text-3xl">🌊</div>
                <p className="text-gray-400 text-xs">Chưa có kết quả dệt văn xuôi. Vui lòng quay lại bước 6 và nhấn Khởi Động.</p>
                <button
                  onClick={() => setActiveStep(6)}
                  className="px-5 py-2 bg-purple-700 text-white rounded-xl text-xs font-bold"
                >
                  Đến Bước 6 Để Bắt Đầu
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
