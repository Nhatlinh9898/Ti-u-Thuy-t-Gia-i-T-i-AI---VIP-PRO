import React, { useState, useMemo } from 'react';
import {
  CharacterProfile,
  MasterCultivationStage,
  NovelMasterSpinePlan,
  SpineSceneDraftResult
} from '../types';
import {
  PRESET_MASTER_CULTIVATION_SPINE,
  PRESET_NOVEL_MASTER_SPINE_PLAN
} from '../data/presetMasterCultivationSpine';
import {
  generateCultivationSpineStage,
  generateNovelNarrativeArc,
  draftSpineChapterScene
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface MasterCultivationSpineStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const MasterCultivationSpineStudio: React.FC<MasterCultivationSpineStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText
}) => {
  const [stages, setStages] = useState<MasterCultivationStage[]>(PRESET_MASTER_CULTIVATION_SPINE);
  const [activeStageId, setActiveStageId] = useState<string>(PRESET_MASTER_CULTIVATION_SPINE[0].id);
  const [masterPlan, setMasterPlan] = useState<NovelMasterSpinePlan>(PRESET_NOVEL_MASTER_SPINE_PLAN);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'matrix' | 'storySpine' | 'sceneDrafter' | 'aiPlanner'>('matrix');

  // Discipline focus in Matrix tab
  const [activeDiscipline, setActiveDiscipline] = useState<
    'all' | 'body' | 'sword' | 'spell' | 'talisman' | 'pill' | 'treasure' | 'society' | 'pantheon' | 'tribulation' | 'authorStory'
  >('all');

  // Drafting state
  const [draftingCharId, setDraftingCharId] = useState<string>(characters[0]?.id || 'char_lingxiao');
  const [draftConflict, setDraftConflict] = useState<string>('Bị đối thủ vây hãm trong trận chiến sinh tử');
  const [draftOpponent, setDraftOpponent] = useState<string>('Trưởng lão ma tông hung tàn');
  const [draftCustomNotes, setDraftCustomNotes] = useState<string>('Nhịp văn dồn dập, đan xen kiếm khí và phù lục');
  const [isDrafting, setIsDrafting] = useState<boolean>(false);
  const [draftResult, setDraftResult] = useState<SpineSceneDraftResult | null>(null);

  // AI Master Plan Generation State
  const [planTitle, setPlanTitle] = useState<string>('Vạn Cổ Kiếm Tôn');
  const [planProtagonist, setPlanProtagonist] = useState<string>('Lăng Tiêu');
  const [planTone, setPlanTone] = useState<string>('Hùng tráng bi tráng, nhiệt huyết nghịch thiên');
  const [planGoldenFinger, setPlanGoldenFinger] = useState<string>('Hỗn Độn Tàn Ngọc');
  const [planSetting, setPlanSetting] = useState<string>('Cửu Châu Thần Vực');
  const [isPlanning, setIsPlanning] = useState<boolean>(false);

  const activeStage = useMemo(() => {
    return stages.find(s => s.id === activeStageId) || stages[0];
  }, [stages, activeStageId]);

  const handleDraftScene = async () => {
    setIsDrafting(true);
    try {
      const chosenChar = characters.find(c => c.id === draftingCharId) || {
        name: 'Lăng Tiêu',
        realmOrRank: activeStage.realmTierTitle
      } as any;

      const res = await draftSpineChapterScene({
        stage: activeStage,
        character: chosenChar,
        conflictContext: draftConflict,
        opponent: draftOpponent,
        userInstructions: draftCustomNotes
      });
      setDraftResult(res);
      setActiveTab('sceneDrafter');
    } catch (err: any) {
      alert('Lỗi tạo phân cảnh đột phá: ' + err.message);
    } finally {
      setIsDrafting(false);
    }
  };

  const handleGeneratePlan = async () => {
    setIsPlanning(true);
    try {
      const res = await generateNovelNarrativeArc({
        novelTitle: planTitle,
        protagonistName: planProtagonist,
        storyTone: planTone,
        goldenFinger: planGoldenFinger,
        worldSetting: planSetting
      });
      setMasterPlan(res);
      setActiveTab('storySpine');
    } catch (err: any) {
      alert('Lỗi tạo mạch truyện dài hơi: ' + err.message);
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Studio Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-purple-950/50 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌀</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 tracking-wide">
              TUYẾN MẠCH TU LUYỆN LIỀN MẠCH & CỐT LÕI TÁC PHẨM
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
              MASTER PROGRESSION SPINE
            </span>
          </div>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Trục xương sống 8 Đại Cảnh Giới: Kết nối Thể Phách, Kiếm Đạo, Thuật Pháp, Phù Lục, Đan Dược và Cốt Lõi Tác Phẩm Nương Tựa Viết Truyện
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1.5 bg-gray-900/90 p-1 rounded-xl border border-purple-500/30 text-xs">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-vip-purple to-pink-600 text-white shadow-md shadow-purple-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>📊</span> Ma Trận 8 Cảnh Giới
          </button>
          <button
            onClick={() => setActiveTab('storySpine')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'storySpine'
                ? 'bg-gradient-to-r from-amber-900 to-yellow-900 text-amber-200 shadow-md shadow-amber-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>📜</span> Cốt Lõi Mạch Truyện
          </button>
          <button
            onClick={() => setActiveTab('sceneDrafter')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'sceneDrafter'
                ? 'bg-gradient-to-r from-cyan-900 to-blue-900 text-cyan-200 shadow-md shadow-cyan-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>✍️</span> Bản Nháp Phân Cảnh
          </button>
          <button
            onClick={() => setActiveTab('aiPlanner')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'aiPlanner'
                ? 'bg-gradient-to-r from-rose-900 to-pink-900 text-rose-200 shadow-md shadow-rose-900/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>✨</span> AI Master Planner
          </button>
        </div>
      </div>

      {/* Progression Ribbon (8 Stages) */}
      <div className="px-4 py-2.5 bg-gray-950 border-b border-white/10 overflow-x-auto flex items-center gap-2 custom-scrollbar">
        {stages.map(s => {
          const isCurrent = activeStageId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStageId(s.id)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border ${
                isCurrent
                  ? 'bg-gradient-to-r from-purple-900 via-pink-950 to-amber-950 text-amber-200 border-amber-400 shadow-md shadow-purple-950/60 ring-1 ring-amber-400/50'
                  : 'bg-gray-900/80 hover:bg-gray-800 text-gray-400 hover:text-gray-200 border-gray-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-black/60 flex items-center justify-center font-mono text-[10px] text-amber-300">
                {s.stageOrder}
              </span>
              <span className="truncate max-w-[170px]">{s.stageName}</span>
            </button>
          );
        })}
      </div>

      {/* BODY VIEW */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* ============================================================== */}
        {/* TAB 1: 10-DISCIPLINE MATRIX                                    */}
        {/* ============================================================== */}
        {activeTab === 'matrix' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            {/* Active Stage Overview Banner */}
            <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-gray-950 to-indigo-950/70 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono uppercase text-pink-400 font-bold">
                    CẤP BẬC {activeStage.stageOrder} TRONG TUYẾN MẠCH
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono">
                    Thọ mệnh: {activeStage.lifespanSpan}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-black text-vip-gold">
                  {activeStage.realmTierTitle}
                </h3>
                <p className="text-xs text-purple-200/80 mt-1">
                  Mục tiêu tự sự: {activeStage.novelStoryBeat?.narrativeRole}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                {onInsertText && (
                  <button
                    onClick={() => {
                      const text = `=== [TUYẾN MẠCH TU LUYỆN: ${activeStage.realmTierTitle}] ===
- Thọ Mệnh: ${activeStage.lifespanSpan}
- Thể Phách: ${activeStage.bodyTempering.stageTitle} (${activeStage.bodyTempering.meridianTransformation})
- Kiếm Đạo: ${activeStage.swordDao.stageTitle} (${activeStage.swordDao.swordIntentTier})
- Thuật Pháp: ${activeStage.spellDao.spellTier} (Tiêu biểu: ${activeStage.spellDao.representativeSpells?.join(', ')})
- Phù Lục: ${activeStage.talismanDao.grade} (${activeStage.talismanDao.typicalTalismans?.join(', ')})
- Đan Dược: ${activeStage.pillAndAlchemy.essentialPills?.join(', ')} (${activeStage.pillAndAlchemy.furnaceAndHerbRequirement})
- Pháp Khí / Binh Khí: ${activeStage.treasureAndArmament.gearTier}
- Thế Lực Xã Hội: ${activeStage.socialAndSectLevel.factionTier} (${activeStage.socialAndSectLevel.hierarchyStatus})
- Thần Linh & Kỷ Nguyên: ${activeStage.pantheonAndCosmicEcho.divineInfluence}
- Thiên Kiếp & Tâm Ma: ${activeStage.tribulationAndHeartDemon.tribulationType}
---
* Cốt Lõi Tác Giả: Mâu thuẫn chính: ${activeStage.novelStoryBeat.coreConflict}; Động lực: ${activeStage.novelStoryBeat.protagonistGoal}
* Gợi Ý Phân Cảnh: ${activeStage.novelStoryBeat.sceneWritingPrompts?.join('; ')}`;
                      onInsertText(text);
                      alert(`Đã chèn toàn bộ mạch cảnh giới ${activeStage.realmTierTitle} vào truyện!`);
                    }}
                    className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
                  >
                    <span>📥</span>
                    <span>Chèn Toàn Bộ Mạch Này Vào Truyện</span>
                  </button>
                )}

                <button
                  onClick={handleDraftScene}
                  disabled={isDrafting}
                  className="px-4 py-2 bg-gradient-to-r from-vip-purple via-pink-600 to-amber-500 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5"
                >
                  {isDrafting ? <Spinner /> : <span>✍️</span>}
                  <span>Viết Phân Cảnh Đột Phá Cảnh Giới Này</span>
                </button>
              </div>
            </div>

            {/* Discipline Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/10 text-xs">
              <span className="text-[10px] font-mono uppercase text-gray-500 font-bold px-1">Lọc Mảng:</span>
              {[
                { id: 'all', label: 'Tất Cả 10 Mảng' },
                { id: 'body', label: '🔥 Thể Phách' },
                { id: 'sword', label: '🗡️ Kiếm Đạo' },
                { id: 'spell', label: '🔮 Thuật Pháp' },
                { id: 'talisman', label: '📜 Phù Lục' },
                { id: 'pill', label: '🌿 Đan Dược' },
                { id: 'treasure', label: '💎 Binh Khí' },
                { id: 'society', label: '⛩️ Thế Lực' },
                { id: 'pantheon', label: '🌌 Thần Linh' },
                { id: 'tribulation', label: '⚡ Thiên Kiếp' },
                { id: 'authorStory', label: '⭐ Cốt Lõi Tác Giả' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveDiscipline(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    activeDiscipline === f.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Matrix Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. Thể Phách */}
              {(activeDiscipline === 'all' || activeDiscipline === 'body') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-red-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-red-300 flex items-center gap-1.5">
                      <span>🔥</span> THỂ PHÁCH & HUYẾT KHÍ
                    </span>
                    <span className="text-[10px] text-gray-500">{activeStage.bodyTempering.stageTitle}</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Kinh mạch:</strong> {activeStage.bodyTempering.meridianTransformation}</p>
                    <p><strong className="text-gray-400">Cốt tủy:</strong> {activeStage.bodyTempering.boneAndMarrowRefinement}</p>
                    <p><strong className="text-gray-400">Khí tức:</strong> {activeStage.bodyTempering.sensoryAura}</p>
                  </div>
                </div>
              )}

              {/* 2. Kiếm Đạo */}
              {(activeDiscipline === 'all' || activeDiscipline === 'sword') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-cyan-300 flex items-center gap-1.5">
                      <span>🗡️</span> KIẾM ĐẠO TIẾN CẤP
                    </span>
                    <span className="text-[10px] text-gray-500">{activeStage.swordDao.stageTitle}</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Kiếm ý:</strong> {activeStage.swordDao.swordIntentTier}</p>
                    <p><strong className="text-gray-400">Ngự kiếm:</strong> {activeStage.swordDao.flyingSwordOrBladeArt}</p>
                    <p><strong className="text-gray-400">Thực chiến:</strong> {activeStage.swordDao.combatApplication}</p>
                  </div>
                </div>
              )}

              {/* 3. Thuật Pháp */}
              {(activeDiscipline === 'all' || activeDiscipline === 'spell') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-purple-300 flex items-center gap-1.5">
                      <span>🔮</span> THUẬT PHÁP & THỦ ẤN
                    </span>
                    <span className="text-[10px] text-gray-500">{activeStage.spellDao.spellTier}</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Tiêu biểu:</strong> {activeStage.spellDao.representativeSpells?.join(', ')}</p>
                    <p><strong className="text-gray-400">Khẩu quyết & Ấn:</strong> {activeStage.spellDao.chantAndMudras}</p>
                  </div>
                </div>
              )}

              {/* 4. Phù Lục */}
              {(activeDiscipline === 'all' || activeDiscipline === 'talisman') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
                      <span>📜</span> PHÙ LỤC & ĐẠO TRIỆN
                    </span>
                    <span className="text-[10px] text-gray-500">{activeStage.talismanDao.grade}</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Loại bùa:</strong> {activeStage.talismanDao.typicalTalismans?.join(', ')}</p>
                    <p><strong className="text-gray-400">Nguyên tắc vẽ:</strong> {activeStage.talismanDao.drawingPrinciple}</p>
                  </div>
                </div>
              )}

              {/* 5. Đan Dược */}
              {(activeDiscipline === 'all' || activeDiscipline === 'pill') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-emerald-300 flex items-center gap-1.5">
                      <span>🌿</span> ĐAN DƯỢC & LUYỆN ĐAN
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Đan then chốt:</strong> {activeStage.pillAndAlchemy.essentialPills?.join(', ')}</p>
                    <p><strong className="text-gray-400">Đỉnh & Thảo dược:</strong> {activeStage.pillAndAlchemy.furnaceAndHerbRequirement}</p>
                  </div>
                </div>
              )}

              {/* 6. Binh Khí */}
              {(activeDiscipline === 'all' || activeDiscipline === 'treasure') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-indigo-300 flex items-center gap-1.5">
                      <span>💎</span> BINH KHÍ & PHÁP KHÍ
                    </span>
                    <span className="text-[10px] text-gray-500">{activeStage.treasureAndArmament.gearTier}</span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Nguyên liệu:</strong> {activeStage.treasureAndArmament.materialsNeeded?.join(', ')}</p>
                  </div>
                </div>
              )}

              {/* 7. Xã Hội & Môn Phái */}
              {(activeDiscipline === 'all' || activeDiscipline === 'society') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-blue-300 flex items-center gap-1.5">
                      <span>⛩️</span> CẤP BẬC TÔNG MÔN & THẾ LỰC
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Thế lực:</strong> {activeStage.socialAndSectLevel.factionTier}</p>
                    <p><strong className="text-gray-400">Thân phận:</strong> {activeStage.socialAndSectLevel.hierarchyStatus}</p>
                    <p><strong className="text-gray-400">Địa vực:</strong> {activeStage.socialAndSectLevel.territoryRealm}</p>
                  </div>
                </div>
              )}

              {/* 8. Thần Linh & Kỷ Nguyên */}
              {(activeDiscipline === 'all' || activeDiscipline === 'pantheon') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-yellow-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-yellow-300 flex items-center gap-1.5">
                      <span>🌌</span> THẦN LINH & DẤU ẤN VŨ TRỤ
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Dấu ấn thần:</strong> {activeStage.pantheonAndCosmicEcho.divineInfluence}</p>
                    <p><strong className="text-gray-400">Ký ức kỷ nguyên:</strong> {activeStage.pantheonAndCosmicEcho.cosmicEpochMemory}</p>
                  </div>
                </div>
              )}

              {/* 9. Thiên Kiếp & Tâm Ma */}
              {(activeDiscipline === 'all' || activeDiscipline === 'tribulation') && (
                <div className="p-4 rounded-xl bg-gray-900/80 border border-orange-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-orange-300 flex items-center gap-1.5">
                      <span>⚡</span> THIÊN KIẾP & TÂM MA
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 space-y-1.5">
                    <p><strong className="text-gray-400">Dạng thiên kiếp:</strong> {activeStage.tribulationAndHeartDemon.tribulationType}</p>
                    <p><strong className="text-gray-400">Triệu chứng tâm ma:</strong> {activeStage.tribulationAndHeartDemon.heartDemonSymptom}</p>
                    <p><strong className="text-gray-400">Rủi ro:</strong> {activeStage.tribulationAndHeartDemon.mortalityRisk}</p>
                  </div>
                </div>
              )}

              {/* 10. Cốt Lõi Tác Giả Nương Tựa Viết Truyện */}
              {(activeDiscipline === 'all' || activeDiscipline === 'authorStory') && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/90 to-pink-950/90 border border-pink-500/40 space-y-2 md:col-span-2 lg:col-span-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-pink-300 flex items-center gap-1.5">
                      <span>⭐</span> CỐT LÕI TÁC PHẨM NƯƠNG TỰA VIẾT TRUYỆN (NOVEL ANCHOR)
                    </span>
                    <span className="text-[11px] font-mono text-vip-gold font-bold">
                      {activeStage.novelStoryBeat.suggestedChapters}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <strong className="text-amber-300 block">Mâu Thuẫn Cốt Lõi:</strong>
                      <p className="text-gray-300">{activeStage.novelStoryBeat.coreConflict}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <strong className="text-cyan-300 block">Động Lực Sống Còn:</strong>
                      <p className="text-gray-300">{activeStage.novelStoryBeat.protagonistGoal}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1">
                      <strong className="text-pink-300 block">Khai Màn Bước Ngoặt:</strong>
                      <p className="text-gray-300">{activeStage.novelStoryBeat.incitingIncidentTemplate}</p>
                    </div>
                  </div>

                  <div className="pt-2 text-xs">
                    <strong className="text-purple-300 block mb-1">Gợi ý phân cảnh đắt giá cho tác giả:</strong>
                    <ul className="list-disc list-inside space-y-1 text-gray-300 italic">
                      {activeStage.novelStoryBeat.sceneWritingPrompts?.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: NOVEL MASTER SPINE PLAN                                 */}
        {/* ============================================================== */}
        {activeTab === 'storySpine' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-5 rounded-2xl bg-gray-900 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                    KẾ HOẠCH MẠCH TRUYỆN DÀI HƠI DỰA TRÊN TUYẾN MẠCH
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-vip-gold">
                    {masterPlan.novelTitle}
                  </h3>
                </div>
                <span className="text-xs font-mono text-gray-400">
                  Nhân vật chính: <strong className="text-white">{masterPlan.protagonistName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400 block mb-0.5">Giọng văn:</span>
                  <strong className="text-purple-300">{masterPlan.storyTone}</strong>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400 block mb-0.5">Lộ trình bản đồ:</span>
                  <strong className="text-cyan-300">{masterPlan.coreWorldMapProgression}</strong>
                </div>
                <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400 block mb-0.5">Bàn tay vàng / Truyền thừa:</span>
                  <strong className="text-amber-300">{masterPlan.goldenFingerOrDestiny}</strong>
                </div>
              </div>
            </div>

            {/* Stage Cards in Master Plan */}
            <div className="space-y-4">
              {masterPlan.spineStages?.map((stage, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-purple-500/40 space-y-3 transition-all"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-900 text-purple-200 font-bold text-xs flex items-center justify-center">
                        {stage.stageOrder}
                      </span>
                      <h4 className="font-bold text-sm text-white">{stage.stageName}</h4>
                    </div>
                    <span className="text-xs font-mono text-vip-gold font-bold">
                      {stage.chapterSpan}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <p><strong className="text-amber-300">Mục tiêu chính:</strong> {stage.mainObjective}</p>
                    <p><strong className="text-red-300">Xung đột cao trào:</strong> {stage.keyPlotConflict}</p>
                    <p><strong className="text-cyan-300">Phối hợp đa mảng:</strong> {stage.crossDisciplinaryCombo}</p>
                    <p><strong className="text-yellow-300">Thần tích thức tỉnh:</strong> {stage.divineEncounter}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs">
                    <strong className="text-amber-300 block mb-1">💡 Lời khuyên vàng cho tác giả:</strong>
                    <p className="text-gray-300 italic">{stage.authorWritingTips}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SCENE DRAFTER (BẢN NHÁP PHÂN CẢNH)                       */}
        {/* ============================================================== */}
        {activeTab === 'sceneDrafter' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-4 rounded-xl bg-gray-900 border border-cyan-500/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Nhân vật:</label>
                <select
                  value={draftingCharId}
                  onChange={e => setDraftingCharId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                >
                  {characters.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.realmOrRank})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Xung đột / Hiểm cảnh:</label>
                <input
                  type="text"
                  value={draftConflict}
                  onChange={e => setDraftConflict(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Đối thủ:</label>
                <input
                  type="text"
                  value={draftOpponent}
                  onChange={e => setDraftOpponent(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={handleDraftScene}
                  disabled={isDrafting}
                  className="px-5 py-2 bg-gradient-to-r from-vip-purple to-pink-600 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                >
                  {isDrafting ? <Spinner /> : <span>✨</span>}
                  <span>Viết Phân Cảnh Đa Mảng Này</span>
                </button>
              </div>
            </div>

            {draftResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-vip-gold/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-lg font-bold text-vip-gold">{draftResult.sceneTitle}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(draftResult.novelProseScene);
                        alert('Đã sao chép đoạn văn!');
                      }}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs"
                    >
                      Sao chép
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          onInsertText(draftResult.novelProseScene);
                          alert('Đã chèn vào chương truyện!');
                        }}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold"
                      >
                        Chèn vào truyện
                      </button>
                    )}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none text-gray-200 text-sm md:text-base leading-relaxed font-serif whitespace-pre-line">
                  {draftResult.novelProseScene}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: AI MASTER PLANNER                                       */}
        {/* ============================================================== */}
        {activeTab === 'aiPlanner' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-5 rounded-2xl bg-gray-900 border border-pink-500/30 space-y-4 max-w-2xl mx-auto">
              <h3 className="text-base font-bold text-pink-300">
                KHỞI TẠO MẠCH TRUYỆN DÀI HƠI TOÀN BỘ 8 CẢNH GIỚI BẰNG AI
              </h3>
              <p className="text-xs text-gray-400">
                AI sẽ tính toán toàn bộ lộ trình phân bổ chương, mâu thuẫn, bảo vật, và cao trào cho toàn bộ tác phẩm từ mở màn đến đại kết cục.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1">Tên tác phẩm:</label>
                  <input
                    type="text"
                    value={planTitle}
                    onChange={e => setPlanTitle(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Nhân vật chính:</label>
                  <input
                    type="text"
                    value={planProtagonist}
                    onChange={e => setPlanProtagonist(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Giọng văn:</label>
                  <input
                    type="text"
                    value={planTone}
                    onChange={e => setPlanTone(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Bàn tay vàng / Cơ duyên định mệnh:</label>
                  <input
                    type="text"
                    value={planGoldenFinger}
                    onChange={e => setPlanGoldenFinger(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                  />
                </div>
              </div>

              <button
                onClick={handleGeneratePlan}
                disabled={isPlanning}
                className="w-full py-3 bg-gradient-to-r from-vip-purple via-pink-600 to-amber-500 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2"
              >
                {isPlanning ? <Spinner /> : <span>🚀</span>}
                <span>Tạo Mạch Truyện Toàn Cảnh Ngay</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
