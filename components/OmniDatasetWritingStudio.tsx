import React, { useState, useMemo } from 'react';
import {
  NovelNode,
  CharacterProfile,
  OmniDatasetSelection,
  StoryBibleChapterContext
} from '../types';
import {
  ALL_MASTER_PRESET_STORIES,
  MasterPresetStoryBundle,
  StoryBibleVolumeDetail,
  StoryBibleChapterDetail
} from '../data/presetMasterNovelBible';
import { PRESET_WEAPON_TIERS } from '../data/presetWeapons';
import {
  PRESET_SPIRIT_CRYSTALS,
  PRESET_NATURAL_TREASURES,
  PRESET_ANCIENT_ARTIFACTS
} from '../data/presetTreasures';
import { PRESET_LOCATIONS } from '../data/presetLocations';
import {
  PRESET_SECTS_ALL,
  PRESET_VILLAINS_ALL,
  PRESET_SPIES_ALL
} from '../data/presetSectsVillainsSpies';
import { PRESET_MASTER_CULTIVATION_SPINE } from '../data/presetMasterCultivationSpine';
import { PRESET_SWORD_DAO_CANONS } from '../data/presetSwordDaoCanons';
import { PRESET_SPELL_DAO_CANONS } from '../data/presetSpellDaoCanons';
import { PRESET_TALISMAN_DAO_CANONS } from '../data/presetTalismanDaoCanons';
import { PRESET_PILL_RECIPES, PRESET_HERB_GUIDES } from '../data/presetAlchemy';
import { PRESET_SPIRIT_BEASTS } from '../data/presetSpiritBeasts';
import { PRESET_SUBPLOT_ARCS } from '../data/presetSubplotArcs';
import { PRESET_MICRO_STORY_STRANDS } from '../data/presetMicroStoryStrands';
import { PRESET_CHRONICLE_CLUES } from '../data/presetChronicleClues';
import {
  MASTER_BATTLE_FORMATIONS,
  MASTER_TROOP_BRANCHES,
  MASTER_TERRAIN_TACTICS,
  MASTER_COUNTER_FORMATION_RULES,
  MASTER_ANTI_BATTLE_FORMATIONS,
  MASTER_ANTI_TROOP_BRANCHES,
  MASTER_AMPHIBIOUS_FORMATIONS,
  MASTER_AMPHIBIOUS_TROOPS
} from '../data/artOfWarBible';
import { PRESET_POETIC_SCENES } from '../data/presetPoeticSceneryBible';
import { PRESET_MARTIAL_TRAINING_SCENES } from '../data/presetMartialTrainingBible';
import { PRESET_PHYSICAL_DUEL_SCENES } from '../data/presetPhysicalDuelBible';
import { generateContent } from '../services/geminiService';
import { Spinner } from './Spinner';

interface OmniDatasetWritingStudioProps {
  selectedNode: NovelNode | null;
  plotIdea: string;
  characters: CharacterProfile[];
  onInsertText: (text: string) => void;
  onUpdateContent: (newContent: string) => void;
  activeStoryBible?: MasterPresetStoryBundle | null;
  onSelectStoryBible?: (bible: MasterPresetStoryBundle) => void;
  onNavigateToNeural?: () => void;
}

export const OmniDatasetWritingStudio: React.FC<OmniDatasetWritingStudioProps> = ({
  selectedNode,
  plotIdea,
  characters,
  onInsertText,
  onUpdateContent,
  activeStoryBible,
  onSelectStoryBible,
  onNavigateToNeural
}) => {
  // Current selected bible
  const [selectedBibleId, setSelectedBibleId] = useState<string>(
    activeStoryBible?.id || ALL_MASTER_PRESET_STORIES[0].id
  );

  const currentBible = useMemo(() => {
    return ALL_MASTER_PRESET_STORIES.find((b) => b.id === selectedBibleId) || ALL_MASTER_PRESET_STORIES[0];
  }, [selectedBibleId]);

  // Selected volume and chapter index
  const [selectedVolIdx, setSelectedVolIdx] = useState<number>(0);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);

  // Auto-detect matching chapter from Story Bible if possible based on node title
  React.useEffect(() => {
    if (!currentBible.detailedBible || !selectedNode?.title) return;
    const volumes = currentBible.detailedBible.volumes;
    for (let vIdx = 0; vIdx < volumes.length; vIdx++) {
      const vol = volumes[vIdx];
      for (let cIdx = 0; cIdx < vol.chapters.length; cIdx++) {
        const ch = vol.chapters[cIdx];
        if (
          selectedNode.title &&
          (selectedNode.title.toLowerCase().includes(ch.title.toLowerCase()) ||
            ch.title.toLowerCase().includes(selectedNode.title.toLowerCase()))
        ) {
          setSelectedVolIdx(vIdx);
          setSelectedChapterIdx(cIdx);
          return;
        }
      }
    }
  }, [selectedNode?.title, currentBible]);

  const currentVolume: StoryBibleVolumeDetail | undefined = currentBible.detailedBible?.volumes[selectedVolIdx];
  const currentChapterDossier: StoryBibleChapterDetail | undefined = currentVolume?.chapters[selectedChapterIdx];

  // Active Main Tabs: 'bible' | 'datasets' | 'active_pinned'
  const [studioTab, setStudioTab] = useState<'bible' | 'datasets' | 'active_pinned'>('bible');

  // Category filter inside Datasets tab
  const [datasetCategory, setDatasetCategory] = useState<
    | 'weapons'
    | 'treasures'
    | 'locations'
    | 'sects'
    | 'cultivation'
    | 'swords'
    | 'spells'
    | 'talismans'
    | 'alchemy'
    | 'beasts'
    | 'subplots'
    | 'artOfWar'
    | 'poeticScenery'
    | 'martialTraining'
    | 'physicalDuels'
  >('weapons');

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Pinned/Selected Datasets
  const [selectedWeapons, setSelectedWeapons] = useState<string[]>([
    'Thanh Phong Bách Luyện Kiếm'
  ]);
  const [selectedTreasures, setSelectedTreasures] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    'Thanh Ngưu Trấn & Thúy Vân Phong'
  ]);
  const [selectedSects, setSelectedSects] = useState<string[]>([
    'Thái Hư Kiếm Tông • Vạn Cổ Kiếm Đạo Thánh Địa'
  ]);
  const [selectedRealms, setSelectedRealms] = useState<string[]>([
    'Tầng 1: Luyện Khí Kỳ (Thu nạp linh khí, khai mở 108 khiếu huyệt)'
  ]);
  const [selectedSwords, setSelectedSwords] = useState<string[]>([]);
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);
  const [selectedTalismans, setSelectedTalismans] = useState<string[]>([]);
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  const [selectedBeasts, setSelectedBeasts] = useState<string[]>([]);
  const [selectedSubplots, setSelectedSubplots] = useState<string[]>([]);
  const [selectedFormations, setSelectedFormations] = useState<string[]>([
    'Phong Thỉ Trận (Trận Mũi Tên Gió)'
  ]);
  const [selectedPoeticScenes, setSelectedPoeticScenes] = useState<string[]>([
    'Họa Thuyền Dạ Bạc • Trường Giang Vọng Nguyệt'
  ]);
  const [selectedMartialTraining, setSelectedMartialTraining] = useState<string[]>([
    'Hàn Phong Đoán Xạ • Tuyết Đỉnh Khai Cung Xạ Điêu'
  ]);
  const [selectedPhysicalDuels, setSelectedPhysicalDuels] = useState<string[]>([
    'Kiếm Phách Đoạn Kiều • Thái Sơ Trọng Kiếm vs Thu Thủy Linh Kiếm'
  ]);

  // Writing Controls State
  const [generationMode, setGenerationMode] = useState<string>('BIBLE_CANON');
  const [wordCountTarget, setWordCountTarget] = useState<number>(1500);
  const [literaryTone, setLiteraryTone] = useState<string>(
    'Cổ phong bi tráng, nhiệt huyết hào sảng, đậm chất tiên hiệp chính tông'
  );
  const [customInstruction, setCustomInstruction] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [lastGeneratedSnippet, setLastGeneratedSnippet] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Helper toggle
  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Total active pinned elements
  const totalPinnedCount =
    selectedWeapons.length +
    selectedTreasures.length +
    selectedLocations.length +
    selectedSects.length +
    selectedRealms.length +
    selectedSwords.length +
    selectedSpells.length +
    selectedTalismans.length +
    selectedPills.length +
    selectedBeasts.length +
    selectedSubplots.length +
    selectedFormations.length +
    selectedPoeticScenes.length +
    selectedMartialTraining.length +
    selectedPhysicalDuels.length;

  // Auto-Suggest Datasets based on chapter title & summary
  const handleAutoSuggest = () => {
    const text = (((selectedNode?.title) || '') + ' ' + ((selectedNode?.summary) || '') + ' ' + (currentChapterDossier?.summary || '')).toLowerCase();

    const newWeapons = [...selectedWeapons];
    const newSects = [...selectedSects];
    const newLocations = [...selectedLocations];
    const newSwords = [...selectedSwords];
    const newRealms = [...selectedRealms];
    const newPills = [...selectedPills];

    if (text.includes('kiếm') || text.includes('vấn kiếm') || text.includes('hỗn độn')) {
      if (!newWeapons.includes('Thái Cổ Hỗn Độn Thần Kiếm')) newWeapons.push('Thái Cổ Hỗn Độn Thần Kiếm');
      if (!newSwords.includes('Thái Cổ Tru Tiên Kiếm Quyết')) newSwords.push('Thái Cổ Tru Tiên Kiếm Quyết');
    }
    if (text.includes('ma') || text.includes('huyết') || text.includes('cửu u')) {
      if (!newSects.includes('Cửu U Huyết Ma Giáo')) newSects.push('Cửu U Huyết Ma Giáo');
    }
    if (text.includes('trúc cơ') || text.includes('luyện khí')) {
      if (!newPills.includes('Cực Phẩm Trúc Cơ Đan')) newPills.push('Cực Phẩm Trúc Cơ Đan');
    }
    if (text.includes('vạn kiếm') || text.includes('bí cảnh')) {
      if (!newLocations.includes('Vạn Kiếm Trủng & Hắc Thủy Hạp Cốc')) newLocations.push('Vạn Kiếm Trủng & Hắc Thủy Hạp Cốc');
    }

    setSelectedWeapons(Array.from(new Set(newWeapons)));
    setSelectedSects(Array.from(new Set(newSects)));
    setSelectedLocations(Array.from(new Set(newLocations)));
    setSelectedSwords(Array.from(new Set(newSwords)));
    setSelectedRealms(Array.from(new Set(newRealms)));
    setSelectedPills(Array.from(new Set(newPills)));

    showToast('✨ Đã tự động phân tích và gài gắm các dữ liệu mẫu phù hợp nhất vào phân cảnh!');
  };

  const handleClearAllPinned = () => {
    setSelectedWeapons([]);
    setSelectedTreasures([]);
    setSelectedLocations([]);
    setSelectedSects([]);
    setSelectedRealms([]);
    setSelectedSwords([]);
    setSelectedSpells([]);
    setSelectedTalismans([]);
    setSelectedPills([]);
    setSelectedBeasts([]);
    setSelectedSubplots([]);
    setSelectedFormations([]);
    setSelectedPoeticScenes([]);
    setSelectedMartialTraining([]);
    setSelectedPhysicalDuels([]);
    showToast('Đã làm trống toàn bộ dữ liệu mẫu gài gắm.');
  };

  // Execute AI Story Generation
  const handleExecuteGeneration = async () => {
    if (!selectedNode) {
      alert('Vui lòng nhấp chọn một chương trên sơ đồ/cây cốt truyện (bên trái) trước khi ấn Sáng Tác, hoặc dùng nút "📋 Chèn" để đưa trực tiếp dữ liệu mẫu vào bản thảo!');
      return;
    }
    setIsGenerating(true);
    try {
      const storyBibleContext: StoryBibleChapterContext | undefined = currentChapterDossier
        ? {
            bibleTitle: currentBible.title,
            volumeTitle: currentVolume?.title,
            volumeConflict: currentVolume?.mainFactionsClash,
            chapterTitle: currentChapterDossier.title,
            conflict: currentChapterDossier.coreConflict,
            characterObjective: currentChapterDossier.characterObjective,
            foreshadowing: currentChapterDossier.foreshadowingAndClues,
            lootBreakthrough: currentChapterDossier.lootOrBreakthrough,
            sampleProse: currentChapterDossier.proseDraftSample
          }
        : undefined;

      const omniDatasets: OmniDatasetSelection = {
        weapons: selectedWeapons,
        treasures: selectedTreasures,
        locations: selectedLocations,
        sectsAndEnemies: selectedSects,
        cultivationRealms: selectedRealms,
        swordCanons: selectedSwords,
        spellCanons: selectedSpells,
        talismanCanons: selectedTalismans,
        alchemyPills: selectedPills,
        spiritBeasts: selectedBeasts,
        subplotsAndClues: selectedSubplots,
        artOfWarFormations: selectedFormations,
        poeticScenes: selectedPoeticScenes,
        martialTraining: selectedMartialTraining,
        physicalDuels: selectedPhysicalDuels
      };

      const result = await generateContent(
        selectedNode,
        plotIdea,
        generationMode,
        customInstruction,
        selectedNode.content || '',
        characters,
        storyBibleContext,
        omniDatasets,
        wordCountTarget,
        literaryTone
      );

      const delimiter = selectedNode.content ? '\n\n' : '';
      const updatedText = (selectedNode.content || '') + delimiter + result;
      onUpdateContent(updatedText);
      setLastGeneratedSnippet(result);
      showToast('🎉 Sáng tác thành công! Đã vận dụng toàn bộ dữ liệu mẫu vào chương.');
    } catch (err: any) {
      alert('Lỗi sinh nội dung AI: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 border border-purple-500/40 rounded-2xl p-4 md:p-5 shadow-2xl space-y-4 text-gray-200">
      {/* Top Banner & Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/30 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-purple-600 to-cyan-500 flex items-center justify-center text-xl shadow-lg shadow-purple-950/60 ring-2 ring-vip-gold/40">
            <span>⚡</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-200 to-cyan-300">
                Trung Tâm Vận Dụng Hồ Sơ Cốt Truyện & Đa Bộ Dữ Liệu Mẫu
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                AI Story Weaver Pro
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Vận dụng 40 chương đại cương kinh điển cùng 15+ kho dữ liệu thần binh, tam đạo, tông môn, bí cảnh & mạch nhánh vào từng trang viết
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAutoSuggest}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-gray-950 font-black text-xs rounded-lg shadow-md flex items-center gap-1.5 transition-all"
            title="Tự động phân tích tên và tóm tắt chương để gài gắm dữ liệu mẫu chuẩn xác"
          >
            <span>✨</span> Gợi Ý Tự Động
          </button>
          {totalPinnedCount > 0 && (
            <button
              onClick={handleClearAllPinned}
              className="px-2.5 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg border border-gray-700 transition-all"
            >
              Làm trống ({totalPinnedCount})
            </button>
          )}
        </div>
      </div>

      {/* Chapter Connection Status Banner */}
      {selectedNode ? (
        <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-purple-300 font-bold">🎯 Tiết điểm đang chọn:</span>
            <span className="text-amber-300 font-extrabold">{selectedNode.title || 'Chương không tên'}</span>
            {selectedNode.summary && (
              <span className="text-gray-400 text-[11px] truncate max-w-[260px] hidden md:inline">
                - {selectedNode.summary}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-semibold">
              ● Đã kết nối bản thảo
            </span>
            {onNavigateToNeural && (
              <button
                onClick={onNavigateToNeural}
                className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-800 to-pink-800 hover:from-purple-700 hover:to-pink-700 text-purple-100 border border-purple-400/40 text-[11px] font-bold flex items-center gap-1 shadow transition"
              >
                <span>🧠</span> Mạng Thần Kinh Suy Diễn ➔
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs flex flex-wrap items-center justify-between gap-2 text-amber-200">
          <div className="flex items-center gap-2">
            <span>💡</span>
            <span>Chưa chọn chương trên Cây Cốt Truyện. Bạn vẫn có thể duyệt 15+ kho dữ liệu mẫu hoặc nhấn <b>"📋 Chèn"</b>. Để AI viết thẳng vào phân cảnh, hãy nhấp chọn 1 chương bên trái!</span>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-950/90 to-purple-950/90 border border-amber-400 text-amber-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
          <span>🌟</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Mode Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-gray-900/90 p-1.5 rounded-xl border border-white/10">
        <button
          onClick={() => setStudioTab('bible')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all ${
            studioTab === 'bible'
              ? 'bg-gradient-to-r from-purple-800 to-indigo-700 text-white shadow-md ring-1 ring-purple-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>📖</span>
          <span>Hồ Sơ Cốt Truyện Đại Cương</span>
          {currentChapterDossier && (
            <span className="px-1.5 py-0.2 bg-vip-gold/30 text-vip-gold rounded-full text-[10px]">
              {currentChapterDossier.chapterNumber}
            </span>
          )}
        </button>

        <button
          onClick={() => setStudioTab('datasets')}
          className={`flex-1 min-w-[140px] px-3 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all ${
            studioTab === 'datasets'
              ? 'bg-gradient-to-r from-cyan-800 to-sky-700 text-white shadow-md ring-1 ring-cyan-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>🗃️</span>
          <span>Kho Dữ Liệu Mẫu Đa Danh Mục</span>
          <span className="px-1.5 py-0.2 bg-cyan-500/30 text-cyan-200 rounded-full text-[10px]">
            15+ Kho
          </span>
        </button>

        <button
          onClick={() => setStudioTab('active_pinned')}
          className={`px-4 py-2 rounded-lg text-xs font-black flex items-center justify-center gap-2 transition-all ${
            studioTab === 'active_pinned'
              ? 'bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-md ring-1 ring-amber-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>🏷️</span>
          <span>Đang Gài Gắm</span>
          <span className="px-2 py-0.2 bg-amber-400 text-gray-950 rounded-full text-[10px] font-black">
            {totalPinnedCount}
          </span>
        </button>
      </div>

      {/* TAB 1: STORY BIBLE DOSSIER MATCHER */}
      {studioTab === 'bible' && (
        <div className="space-y-3 bg-gray-950/70 p-4 rounded-xl border border-purple-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Story Bible Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-300 font-bold">Chọn Bộ Cốt Truyện:</span>
              <select
                value={selectedBibleId}
                onChange={(e) => {
                  setSelectedBibleId(e.target.value);
                  setSelectedVolIdx(0);
                  setSelectedChapterIdx(0);
                  const found = ALL_MASTER_PRESET_STORIES.find((b) => b.id === e.target.value);
                  if (found && onSelectStoryBible) {
                    onSelectStoryBible(found);
                  }
                }}
                className="bg-gray-900 border border-purple-500/50 rounded-lg px-3 py-1.5 text-xs text-vip-gold font-bold outline-none"
              >
                {ALL_MASTER_PRESET_STORIES.map((bible) => (
                  <option key={bible.id} value={bible.id}>
                    {bible.title} ({bible.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Volume Selector */}
            {currentBible.detailedBible && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-300 font-medium">Quyển:</span>
                <select
                  value={selectedVolIdx}
                  onChange={(e) => {
                    setSelectedVolIdx(Number(e.target.value));
                    setSelectedChapterIdx(0);
                  }}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-semibold outline-none"
                >
                  {currentBible.detailedBible.volumes.map((vol, vIdx) => (
                    <option key={vol.id} value={vIdx}>
                      {vol.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Chapter Quick Slider / Pills */}
          {currentVolume && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-gray-400">
                Chọn chương tương ứng trong đại cương ({currentVolume.chapters.length} chương chi tiết):
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 custom-scrollbar">
                {currentVolume.chapters.map((ch, idx) => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapterIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      selectedChapterIdx === idx
                        ? 'bg-vip-gold text-gray-950 shadow-md ring-1 ring-yellow-200'
                        : 'bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800'
                    }`}
                  >
                    <span>Chương {ch.chapterNumber}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chapter Detailed Card */}
          {currentChapterDossier ? (
            <div className="bg-black/60 rounded-xl p-4 border border-purple-500/30 space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-white/10 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-vip-purple text-vip-gold">
                      ĐẠI CƯƠNG CHƯƠNG {currentChapterDossier.chapterNumber}
                    </span>
                    <h3 className="text-sm md:text-base font-black text-amber-200">
                      {currentChapterDossier.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">{currentChapterDossier.summary}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onInsertText(`\n\n${currentChapterDossier.proseDraftSample}\n\n`);
                      showToast('📋 Đã chèn trích đoạn văn mẫu vào editor!');
                    }}
                    className="px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-400/50 rounded-lg text-xs font-bold text-purple-200 flex items-center gap-1 transition-all"
                    title="Chèn trích đoạn văn mẫu kinh điển vào editor"
                  >
                    <span>📋</span> Chèn Văn Mẫu
                  </button>
                  <button
                    onClick={() => {
                      setGenerationMode('BIBLE_CANON');
                      showToast('⚡ Đã kích hoạt chế độ "Bám Sát Hồ Sơ Cốt Truyện"!');
                    }}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 text-gray-950 rounded-lg text-xs font-black shadow flex items-center gap-1 transition-all"
                  >
                    <span>⚡</span> Dùng Hồ Sơ Này Cho AI
                  </button>
                </div>
              </div>

              {/* Grid 4 Key Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 space-y-1">
                  <strong className="text-red-300 font-bold flex items-center gap-1.5">
                    <span>⚔️</span> Xung Đột Cốt Lõi:
                  </strong>
                  <p className="text-gray-300 leading-relaxed">{currentChapterDossier.coreConflict}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-500/30 space-y-1">
                  <strong className="text-cyan-300 font-bold flex items-center gap-1.5">
                    <span>🎯</span> Mục Tiêu Nhân Vật Chính:
                  </strong>
                  <p className="text-gray-300 leading-relaxed">{currentChapterDossier.characterObjective}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-500/30 space-y-1">
                  <strong className="text-purple-300 font-bold flex items-center gap-1.5">
                    <span>🔍</span> Phục Bút & Manh Mối Cần Gài:
                  </strong>
                  <p className="text-gray-300 leading-relaxed">{currentChapterDossier.foreshadowingAndClues}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                  <strong className="text-emerald-300 font-bold flex items-center gap-1.5">
                    <span>💎</span> Phần Thưởng / Đột Phá:
                  </strong>
                  <p className="text-gray-300 leading-relaxed">{currentChapterDossier.lootOrBreakthrough}</p>
                </div>
              </div>

              {/* Prose Sample Preview */}
              <div className="p-3 rounded-lg bg-gray-900/80 border border-gray-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-vip-gold flex items-center gap-1.5">
                    <span>📜</span> Trích Đoạn Văn Mẫu Tham Chiếu (Phong cách & Nhịp điệu):
                  </span>
                  <span className="text-[11px] text-gray-400">Tiêu chuẩn cổ phong</span>
                </div>
                <p className="text-xs text-gray-300 italic font-serif leading-relaxed line-clamp-3 bg-black/40 p-2.5 rounded border border-gray-800/60">
                  "{currentChapterDossier.proseDraftSample}"
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">Chưa tìm thấy hồ sơ chi tiết cho chương này.</p>
          )}
        </div>
      )}

      {/* TAB 2: OMNI-DATASET MULTI-CATEGORY WEAVER */}
      {studioTab === 'datasets' && (
        <div className="space-y-3 bg-gray-950/70 p-4 rounded-xl border border-cyan-500/20">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 border-b border-gray-800 pb-2.5">
            {[
              { id: 'weapons', label: '⚔️ Thần Binh', count: PRESET_WEAPON_TIERS.length, activeCount: selectedWeapons.length },
              { id: 'treasures', label: '💎 Bảo Vật', count: PRESET_SPIRIT_CRYSTALS.length + PRESET_NATURAL_TREASURES.length + PRESET_ANCIENT_ARTIFACTS.length, activeCount: selectedTreasures.length },
              { id: 'locations', label: '🗺️ Bí Cảnh', count: PRESET_LOCATIONS.length, activeCount: selectedLocations.length },
              { id: 'sects', label: '⛩️ Tông Môn & Kẻ Địch', count: PRESET_SECTS_ALL.length + PRESET_VILLAINS_ALL.length, activeCount: selectedSects.length },
              { id: 'cultivation', label: '🔥 Cảnh Giới', count: PRESET_MASTER_CULTIVATION_SPINE.length, activeCount: selectedRealms.length },
              { id: 'swords', label: '🗡️ Kiếm Đạo', count: PRESET_SWORD_DAO_CANONS.length, activeCount: selectedSwords.length },
              { id: 'spells', label: '🔮 Thuật Pháp', count: PRESET_SPELL_DAO_CANONS.length, activeCount: selectedSpells.length },
              { id: 'talismans', label: '📜 Phù Lục', count: PRESET_TALISMAN_DAO_CANONS.length, activeCount: selectedTalismans.length },
              { id: 'alchemy', label: '🌿 Đan Dược', count: PRESET_PILL_RECIPES.length + PRESET_HERB_GUIDES.length, activeCount: selectedPills.length },
              { id: 'beasts', label: '🐉 Dị Thú', count: PRESET_SPIRIT_BEASTS.length, activeCount: selectedBeasts.length },
              { id: 'subplots', label: '🌿 Mạch Nhánh', count: PRESET_SUBPLOT_ARCS.length + PRESET_MICRO_STORY_STRANDS.length + PRESET_CHRONICLE_CLUES.length, activeCount: selectedSubplots.length },
              { id: 'artOfWar', label: '⚔️ Binh Pháp & Trận Đồ', count: MASTER_BATTLE_FORMATIONS.length + MASTER_TROOP_BRANCHES.length + MASTER_ANTI_BATTLE_FORMATIONS.length + MASTER_ANTI_TROOP_BRANCHES.length + MASTER_AMPHIBIOUS_FORMATIONS.length + MASTER_AMPHIBIOUS_TROOPS.length, activeCount: selectedFormations.length },
              { id: 'poeticScenery', label: '🌸 Tiêu Dao Sơn Thủy', count: PRESET_POETIC_SCENES.length, activeCount: selectedPoeticScenes.length },
              { id: 'martialTraining', label: '🥋 Diễn Võ Khổ Luyện', count: PRESET_MARTIAL_TRAINING_SCENES.length, activeCount: selectedMartialTraining.length },
              { id: 'physicalDuels', label: '⚡ Thư Hùng Đối Kháng', count: PRESET_PHYSICAL_DUEL_SCENES.length, activeCount: selectedPhysicalDuels.length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setDatasetCategory(cat.id as any)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  datasetCategory === cat.id
                    ? 'bg-cyan-600 text-white shadow-md ring-1 ring-cyan-300'
                    : 'bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800'
                }`}
              >
                <span>{cat.label}</span>
                {cat.activeCount > 0 ? (
                  <span className="px-1.5 py-0.2 bg-amber-400 text-gray-950 font-black rounded-full text-[10px]">
                    {cat.activeCount}
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-500">({cat.count})</span>
                )}
              </button>
            ))}
          </div>

          {/* Search box inside category */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Tìm nhanh dữ liệu mẫu theo tên hoặc đặc tính..."
              className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-gray-400 hover:text-white px-2"
              >
                Xóa tìm
              </button>
            )}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
            {/* 1. WEAPONS */}
            {datasetCategory === 'weapons' &&
              PRESET_WEAPON_TIERS.filter(
                (w) =>
                  !searchTerm ||
                  w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  w.rank.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((w) => {
                const isSelected = selectedWeapons.includes(w.name);
                return (
                  <div
                    key={w.id}
                    onClick={() => toggleItem(selectedWeapons, setSelectedWeapons, w.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-md ring-1 ring-cyan-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-cyan-200">{w.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {w.rank}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{w.combatPowerEffect}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-amber-300">Tuyệt kỹ: {w.ultimateTechnique}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Thần Binh: ${w.name} - ${w.rank}. ${w.combatPowerEffect} Chiêu thức: ${w.ultimateTechnique}]\n`);
                          showToast(`📋 Đã chèn thông tin "${w.name}" vào văn bản!`);
                        }}
                        className="text-cyan-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 2. TREASURES */}
            {datasetCategory === 'treasures' &&
              [...PRESET_SPIRIT_CRYSTALS, ...PRESET_NATURAL_TREASURES, ...PRESET_ANCIENT_ARTIFACTS]
                .filter(
                  (t) =>
                    !searchTerm ||
                    t.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((t: any) => {
                  const isSelected = selectedTreasures.includes(t.name);
                  return (
                    <div
                      key={t.id}
                      onClick={() => toggleItem(selectedTreasures, setSelectedTreasures, t.name)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                        isSelected
                          ? 'bg-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-black text-amber-200">{t.name}</strong>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          {t.grade || t.tier || t.era || 'Chí Bảo'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 line-clamp-2">
                        {t.novelEffects || t.effects || t.activePower || t.appearance}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                        <span className="text-yellow-400">
                          {t.miningLocation || t.growthYears || t.unsealingCondition || ''}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInsertText(`\n[Chí Bảo: ${t.name}. ${t.novelEffects || t.effects || t.activePower || ''}]\n`);
                            showToast(`📋 Đã chèn "${t.name}" vào văn bản!`);
                          }}
                          className="text-amber-400 hover:underline"
                        >
                          📋 Chèn
                        </button>
                      </div>
                    </div>
                  );
                })}

            {/* 3. LOCATIONS */}
            {datasetCategory === 'locations' &&
              PRESET_LOCATIONS.filter(
                (loc) =>
                  !searchTerm ||
                  loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  loc.tier.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((loc) => {
                const isSelected = selectedLocations.includes(loc.name);
                return (
                  <div
                    key={loc.id}
                    onClick={() => toggleItem(selectedLocations, setSelectedLocations, loc.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-emerald-950/60 border-emerald-400 shadow-md ring-1 ring-emerald-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-emerald-200">{loc.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {loc.dangerLevel || 'Bí Cảnh'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{loc.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-emerald-300 truncate max-w-[200px]">
                        Linh khí: {loc.spiritEnergyDensity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Địa Danh: ${loc.name}. ${loc.description} Địa hình: ${loc.terrainAndWeather}]\n`);
                          showToast(`📋 Đã chèn "${loc.name}" vào văn bản!`);
                        }}
                        className="text-emerald-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 4. SECTS & VILLAINS */}
            {datasetCategory === 'sects' &&
              [...PRESET_SECTS_ALL, ...PRESET_VILLAINS_ALL].map((s: any) => {
                const isSelected = selectedSects.includes(s.name);
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleItem(selectedSects, setSelectedSects, s.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-rose-950/60 border-rose-400 shadow-md ring-1 ring-rose-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-rose-200">{s.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        {s.camp || s.villainType || 'Thế Lực'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">
                      {s.founderAndLegacy || s.backstoryAndGrudge || s.ideology}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-rose-300">
                        {s.headquarters || s.cultivationRealm || ''}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Thế Lực / Đối Đầu: ${s.name}. ${s.founderAndLegacy || s.backstoryAndGrudge || ''}]\n`);
                          showToast(`📋 Đã chèn "${s.name}"!`);
                        }}
                        className="text-rose-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 5. CULTIVATION REALMS */}
            {datasetCategory === 'cultivation' &&
              PRESET_MASTER_CULTIVATION_SPINE.map((st) => {
                const isSelected = selectedRealms.includes(st.stageName);
                return (
                  <div
                    key={st.id}
                    onClick={() => toggleItem(selectedRealms, setSelectedRealms, st.stageName)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 shadow-md ring-1 ring-purple-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-purple-200">{st.stageName}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                        Giai đoạn {st.stageOrder}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{st.bodyTempering.meridianTransformation}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-amber-300 truncate max-w-[200px]">
                        Lôi kiếp: {st.tribulationAndHeartDemon.tribulationType}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Cảnh Giới Tu Luyện: ${st.stageName}. Biến đổi: ${st.bodyTempering.meridianTransformation} Lôi kiếp: ${st.tribulationAndHeartDemon.tribulationType}]\n`);
                          showToast(`📋 Đã chèn "${st.stageName}"!`);
                        }}
                        className="text-purple-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 6. SWORD DAO */}
            {datasetCategory === 'swords' &&
              PRESET_SWORD_DAO_CANONS.map((sw) => {
                const isSelected = selectedSwords.includes(sw.name);
                return (
                  <div
                    key={sw.id}
                    onClick={() => toggleItem(selectedSwords, setSelectedSwords, sw.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-400 shadow-md ring-1 ring-sky-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-sky-200">{sw.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                        {sw.gradeLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{sw.coreSwordIntent}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-sky-300">{sw.stances.length} thức kiếm chiêu</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Kiếm Đạo: ${sw.name} (${sw.gradeLevel}). Ý cảnh: ${sw.coreSwordIntent}. Thức kiếm: ${sw.stances[0]?.stanceName}: ${sw.stances[0]?.physicalMovementAndFootwork}]\n`);
                          showToast(`📋 Đã chèn "${sw.name}"!`);
                        }}
                        className="text-sky-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 7. SPELL DAO */}
            {datasetCategory === 'spells' &&
              PRESET_SPELL_DAO_CANONS.map((sp) => {
                const isSelected = selectedSpells.includes(sp.name);
                return (
                  <div
                    key={sp.id}
                    onClick={() => toggleItem(selectedSpells, setSelectedSpells, sp.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-indigo-950/60 border-indigo-400 shadow-md ring-1 ring-indigo-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-indigo-200">{sp.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {sp.gradeLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{sp.corePrinciple}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-indigo-300">{sp.spells.length} pháp thuật</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Thuật Pháp: ${sp.name}. Đạo lý: ${sp.corePrinciple}]\n`);
                          showToast(`📋 Đã chèn "${sp.name}"!`);
                        }}
                        className="text-indigo-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 8. TALISMAN DAO */}
            {datasetCategory === 'talismans' &&
              PRESET_TALISMAN_DAO_CANONS.map((tl) => {
                const isSelected = selectedTalismans.includes(tl.name);
                return (
                  <div
                    key={tl.id}
                    onClick={() => toggleItem(selectedTalismans, setSelectedTalismans, tl.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-yellow-950/60 border-yellow-400 shadow-md ring-1 ring-yellow-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-yellow-200">{tl.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-950 text-yellow-300 border border-yellow-800">
                        {tl.gradeLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{tl.fundamentalPhilosophy}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-yellow-300">{tl.talismans.length} đạo phù</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Phù Lục: ${tl.name}. ${tl.fundamentalPhilosophy}]\n`);
                          showToast(`📋 Đã chèn "${tl.name}"!`);
                        }}
                        className="text-yellow-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 9. ALCHEMY */}
            {datasetCategory === 'alchemy' &&
              PRESET_PILL_RECIPES.map((pill) => {
                const isSelected = selectedPills.includes(pill.name);
                return (
                  <div
                    key={pill.id}
                    onClick={() => toggleItem(selectedPills, setSelectedPills, pill.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-green-950/60 border-green-400 shadow-md ring-1 ring-green-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-green-200">{pill.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-950 text-green-300 border border-green-800">
                        {pill.rank}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{pill.effects}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-amber-300 truncate max-w-[200px]">
                        Hương đan: {pill.pillAroma}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Đan Dược: ${pill.name} (${pill.rank}). Hiệu quả: ${pill.effects} Dị tượng: ${pill.phenomenon}]\n`);
                          showToast(`📋 Đã chèn "${pill.name}"!`);
                        }}
                        className="text-green-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 10. SPIRIT BEASTS */}
            {datasetCategory === 'beasts' &&
              PRESET_SPIRIT_BEASTS.map((bst) => {
                const isSelected = selectedBeasts.includes(bst.name);
                return (
                  <div
                    key={bst.id}
                    onClick={() => toggleItem(selectedBeasts, setSelectedBeasts, bst.name)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-amber-200">{bst.name}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                        {bst.realmTier}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">{bst.appearance}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-amber-300">Tính tình: {bst.temperament}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Linh Thú: ${bst.name} (${bst.realmTier}). Ngoại hình: ${bst.appearance}]\n`);
                          showToast(`📋 Đã chèn "${bst.name}"!`);
                        }}
                        className="text-amber-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 11. SUBPLOTS & CLUES */}
            {datasetCategory === 'subplots' &&
              [...PRESET_SUBPLOT_ARCS, ...PRESET_MICRO_STORY_STRANDS, ...PRESET_CHRONICLE_CLUES].map((sub: any) => {
                const title = sub.title || sub.clueName || 'Mạch truyện nhánh';
                const isSelected = selectedSubplots.includes(title);
                return (
                  <div
                    key={sub.id}
                    onClick={() => toggleItem(selectedSubplots, setSelectedSubplots, title)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-pink-950/60 border-pink-400 shadow-md ring-1 ring-pink-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-pink-200">{title}</strong>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800">
                        {sub.arcType || sub.clueCategory || 'Tiểu Mạch'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300 line-clamp-2">
                      {sub.summary || sub.coreDilemma || sub.evidenceDescription}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <span className="text-pink-300 truncate max-w-[200px]">
                        Hợp lưu: {sub.convergenceSpineMilestone || sub.unravelConsequence || ''}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onInsertText(`\n[Mạch Nhánh: ${title}. ${sub.summary || sub.coreDilemma || ''}]\n`);
                          showToast(`📋 Đã chèn "${title}"!`);
                        }}
                        className="text-pink-400 hover:underline"
                      >
                        📋 Chèn
                      </button>
                    </div>
                  </div>
                );
              })}

            {/* 12. ART OF WAR & BATTLE FORMATIONS */}
            {datasetCategory === 'artOfWar' &&
              [
                ...MASTER_BATTLE_FORMATIONS.map((f) => ({
                  id: f.id,
                  name: f.name,
                  category: f.category,
                  desc: f.corePhilosophy,
                  detail: f.suitableTerrain.join(', '),
                  prose: f.battleProseSample,
                  badge: 'Đại Trận'
                })),
                ...MASTER_TROOP_BRANCHES.map((t) => ({
                  id: t.id,
                  name: t.name,
                  category: t.category,
                  desc: t.role,
                  detail: `Khẩu hiệu: "${t.battlefieldMotto}"`,
                  prose: t.proseExcerpt,
                  badge: 'Binh Chủng'
                })),
                ...MASTER_ANTI_BATTLE_FORMATIONS.map((af) => ({
                  id: af.id,
                  name: af.name,
                  category: af.category,
                  desc: `${af.alias}. Khắc chế: ${af.countersTarget}. ${af.corePhilosophy}`,
                  detail: `Thời khắc: ${af.keyTurningPoint}`,
                  prose: af.battleExcerpt,
                  badge: 'Phá Trận'
                })),
                ...MASTER_ANTI_TROOP_BRANCHES.map((at) => ({
                  id: at.id,
                  name: at.name,
                  category: at.alias,
                  desc: `Khắc tinh: ${at.preysUpon}. ${at.psychologicalEdge}`,
                  detail: `Vũ khí: ${at.lethalWeaponry.slice(0, 2).join('; ')}`,
                  prose: at.proseExcerpt,
                  badge: 'Thợ Săn Binh'
                })),
                ...MASTER_AMPHIBIOUS_FORMATIONS.map((af) => ({
                  id: af.id,
                  name: af.name,
                  category: af.terrainType,
                  desc: `${af.alias}. ${af.corePhilosophy}`,
                  detail: `Binh chủng phối hợp: ${af.troopSynergy.join(', ')}`,
                  prose: af.narrativeBattleExcerpt,
                  badge: 'Thủy Lục Trận'
                })),
                ...MASTER_AMPHIBIOUS_TROOPS.map((atr) => ({
                  id: atr.id,
                  name: atr.name,
                  category: atr.category,
                  desc: `${atr.specialty}. "${atr.unitMotto}"`,
                  detail: `Trang bị: ${atr.standardEquipment.slice(0, 2).join('; ')}`,
                  prose: atr.proseExcerpt,
                  badge: 'Thủy Lục Binh'
                }))
              ]
                .filter(
                  (item) =>
                    !searchTerm ||
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => {
                  const isSelected = selectedFormations.includes(item.name);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(selectedFormations, setSelectedFormations, item.name)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                        isSelected
                          ? 'bg-red-950/60 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-black text-amber-200">{item.name}</strong>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950 text-amber-300 border border-red-800">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 line-clamp-2">{item.desc}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                        <span className="text-amber-300 truncate max-w-[200px]">{item.detail}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onInsertText(`\n[Binh Pháp: ${item.name} (${item.badge}). ${item.desc}]\n`);
                            showToast(`📋 Đã chèn "${item.name}"!`);
                          }}
                          className="text-amber-400 hover:underline"
                        >
                          📋 Chèn
                        </button>
                      </div>
                    </div>
                  );
                })}

            {/* 13. POETIC SCENERY & LEISURE SCENES */}
            {datasetCategory === 'poeticScenery' &&
              PRESET_POETIC_SCENES
                .filter(
                  (scene) =>
                    !searchTerm ||
                    scene.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    scene.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    scene.sceneryDescription.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((scene) => {
                  const isSelected = selectedPoeticScenes.includes(scene.title);
                  return (
                    <div
                      key={scene.id}
                      onClick={() => toggleItem(selectedPoeticScenes, setSelectedPoeticScenes, scene.title)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                        isSelected
                          ? 'bg-rose-950/60 border-rose-400 shadow-md ring-1 ring-rose-400/50'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-black text-rose-200">{scene.title}</strong>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                          {scene.theme}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 line-clamp-2 italic font-serif">
                        &quot;{scene.alias}&quot; — {scene.timeAndAtmosphere.timeOfDay}. {scene.timeAndAtmosphere.weatherAndSeason}.
                      </p>
                      <div className="text-[10px] text-amber-300/90 bg-black/40 p-1.5 rounded border border-white/5 space-y-0.5">
                        <div>🍶 <strong>Rượu & Món ngon:</strong> {scene.wineAndFeast.wines[0]}, {scene.wineAndFeast.delicacies[0]}</div>
                        <div>🎶 <strong>Hòa tấu:</strong> {scene.musicAndPoetry.instruments}</div>
                        {scene.festivalRituals && (
                          <div className="text-amber-300 font-serif">
                            🏮 <strong>Nghi thức:</strong> {scene.festivalRituals.ritualName}
                          </div>
                        )}
                        {scene.coupleRomanceFocus && (
                          <div className="text-pink-300 font-serif">
                            💑 <strong>Tình duyên:</strong> {scene.coupleRomanceFocus.tenderMoments.slice(0, 75)}...
                          </div>
                        )}
                        {scene.skyAndAirborne && (
                          <div className="text-purple-300 font-serif">
                            🌌 <strong>Bầu trời:</strong> {scene.skyAndAirborne.celestialPhenomena.slice(0, 75)}...
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                        <span className="text-rose-300 truncate max-w-[200px]">
                          {scene.companionsAndRomance.heroes.slice(0, 45)}...
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onInsertText(`\n${scene.masterProseExcerpt}\n`);
                              showToast(`📋 Đã chèn phân cảnh "${scene.title}"!`);
                            }}
                            className="text-cyan-400 hover:underline font-bold"
                          >
                            ✍️ Chèn văn mẫu
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {datasetCategory === 'martialTraining' &&
                PRESET_MARTIAL_TRAINING_SCENES.filter(
                  (scene) =>
                    !searchTerm ||
                    scene.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    scene.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    scene.weaponOrDiscipline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    scene.category.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((scene) => {
                  const isSelected = selectedMartialTraining.includes(scene.title);
                  return (
                    <div
                      key={scene.id}
                      onClick={() =>
                        toggleItem(selectedMartialTraining, setSelectedMartialTraining, scene.title)
                      }
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-950/80 to-red-950/80 border-amber-400 shadow-lg shadow-amber-950/50 ring-1 ring-amber-400'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                            scene.category === 'Luyện Cung'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                              : scene.category === 'Luyện Thương'
                              ? 'bg-red-950 text-red-300 border-red-700'
                              : scene.category === 'Luyện Võ Công'
                              ? 'bg-amber-950 text-amber-300 border-amber-700'
                              : 'bg-purple-950 text-purple-300 border-purple-700'
                          }`}
                        >
                          {scene.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {scene.spaceAndTime.timeOfDay.split(',')[0]}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-100 group-hover:text-amber-200">
                        {scene.title}
                      </h4>
                      <p className="text-[11px] text-gray-300 line-clamp-2 italic font-serif">
                        &quot;{scene.alias}&quot; — {scene.spaceAndTime.seasonAndWeather}. {scene.spaceAndTime.locationAndAtmosphere}.
                      </p>
                      <div className="text-[10px] text-amber-200/90 bg-black/40 p-1.5 rounded border border-white/5 space-y-0.5">
                        <div>⚡ <strong>Vũ khí / Tuyệt kỹ:</strong> {scene.weaponOrDiscipline}</div>
                        <div>💥 <strong>Kình lực:</strong> {scene.trainingMotions.forceAndQiExecution.slice(0, 85)}...</div>
                        <div>🌪️ <strong>Môi trường:</strong> {scene.environmentalInteractions.slice(0, 85)}...</div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                        <span className="text-amber-300 font-mono">
                          👁️ {scene.sensoryDetails.visual.slice(0, 35)}...
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onInsertText(`\n${scene.masterProseExcerpt}\n`);
                              showToast(`📋 Đã chèn phân cảnh diễn võ "${scene.title}"!`);
                            }}
                            className="text-amber-400 hover:underline font-bold"
                          >
                            ✍️ Chèn văn mẫu
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {datasetCategory === 'physicalDuels' &&
                PRESET_PHYSICAL_DUEL_SCENES.filter(
                  (duel) =>
                    !searchTerm ||
                    duel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    duel.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    duel.combatantA.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    duel.combatantB.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    duel.category.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((duel) => {
                  const isSelected = selectedPhysicalDuels.includes(duel.title);
                  return (
                    <div
                      key={duel.id}
                      onClick={() =>
                        toggleItem(selectedPhysicalDuels, setSelectedPhysicalDuels, duel.title)
                      }
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all space-y-2 ${
                        isSelected
                          ? 'bg-gradient-to-r from-red-950/80 via-amber-950/70 to-gray-900 border-red-400 shadow-xl shadow-red-950/50 ring-1 ring-red-400'
                          : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold border bg-red-950 text-red-300 border-red-700">
                          {duel.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {duel.spaceAndTime.timeOfDay.split(',')[0]}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-100 group-hover:text-amber-200">
                        {duel.title}
                      </h4>

                      {/* Combatant Clash Mini-Bar */}
                      <div className="grid grid-cols-11 items-center text-[10px] bg-black/50 p-1.5 rounded-lg border border-white/5 font-semibold">
                        <div className="col-span-5 text-amber-300 truncate">
                          ⚔️ {duel.combatantA.name}
                        </div>
                        <div className="col-span-1 text-center text-red-500 font-black">
                          VS
                        </div>
                        <div className="col-span-5 text-right text-cyan-300 truncate">
                          {duel.combatantB.name} 🛡️
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-300 line-clamp-2 italic font-serif">
                        &quot;{duel.alias}&quot; — {duel.spaceAndTime.locationAndTerrain}. {duel.spaceAndTime.seasonAndWeather}.
                      </p>

                      <div className="text-[10px] text-amber-200/90 bg-black/40 p-2 rounded border border-white/5 space-y-1">
                        <div>
                          ⚡ <strong>Chiêu thức & Biện giải:</strong> {duel.exchanges[0]?.combatantA.moveName} vs {duel.exchanges[0]?.combatantB.moveName}
                        </div>
                        <div className="text-emerald-300">
                          🔬 <strong>Tác động vật lý:</strong> {duel.exchanges[0]?.physicsImpactDetail.shockwaveAndAirCompression.slice(0, 90)}...
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1 border-t border-white/5">
                        <span className="text-purple-300 truncate max-w-[200px]">
                          ⚛️ {duel.physicsMechanicsSummary.slice(0, 45)}...
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onInsertText(`\n${duel.masterProseExcerpt}\n`);
                              showToast(`📋 Đã chèn phân cảnh giao đấu "${duel.title}"!`);
                            }}
                            className="text-red-400 hover:underline font-bold"
                          >
                            ✍️ Chèn văn mẫu
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE PINNED LORE ELEMENTS */}
      {studioTab === 'active_pinned' && (
        <div className="space-y-3 bg-gray-950/70 p-4 rounded-xl border border-amber-500/20">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-black text-vip-gold">
              Tất Cả Dữ Liệu Mẫu Đang Được Gài Gắm Vào Prompt AI ({totalPinnedCount} mục):
            </span>
            {totalPinnedCount > 0 && (
              <button
                onClick={handleClearAllPinned}
                className="text-xs text-red-400 hover:underline"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          {totalPinnedCount === 0 ? (
            <p className="text-xs text-gray-400 italic py-4 text-center">
              Chưa có dữ liệu mẫu nào được chọn. Hãy qua tab "Kho Dữ Liệu Mẫu" hoặc bấm "Gợi Ý Tự Động" ở trên.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {selectedWeapons.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500 text-cyan-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>⚔️</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedWeapons, setSelectedWeapons, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedTreasures.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500 text-amber-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>💎</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedTreasures, setSelectedTreasures, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedLocations.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🗺️</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedLocations, setSelectedLocations, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedSects.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>⛩️</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedSects, setSelectedSects, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedRealms.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500 text-purple-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🔥</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedRealms, setSelectedRealms, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedSwords.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-500 text-sky-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🗡️</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedSwords, setSelectedSwords, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedSpells.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-500 text-indigo-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🔮</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedSpells, setSelectedSpells, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedTalismans.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-yellow-950/80 border border-yellow-500 text-yellow-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>📜</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedTalismans, setSelectedTalismans, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedPills.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-green-950/80 border border-green-500 text-green-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🌿</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedPills, setSelectedPills, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedBeasts.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500 text-amber-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🐉</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedBeasts, setSelectedBeasts, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedSubplots.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-pink-950/80 border border-pink-500 text-pink-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🌿</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedSubplots, setSelectedSubplots, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedFormations.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-amber-500 text-amber-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>⚔️</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedFormations, setSelectedFormations, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedPoeticScenes.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-400 text-rose-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🌸</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedPoeticScenes, setSelectedPoeticScenes, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedMartialTraining.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-400 text-amber-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>🥋</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedMartialTraining, setSelectedMartialTraining, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedPhysicalDuels.map((it) => (
                <span
                  key={it}
                  className="px-2.5 py-1 rounded-lg bg-red-950/80 border border-red-400 text-red-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>⚡</span>
                  <span>{it}</span>
                  <button
                    onClick={() => toggleItem(selectedPhysicalDuels, setSelectedPhysicalDuels, it)}
                    className="hover:text-red-400 ml-1"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* BOTTOM ACTION BAR: ADVANCED WRITING CONTROLS & GENERATE BUTTON */}
      <div className="bg-gradient-to-r from-purple-950/80 via-gray-900 to-indigo-950/80 rounded-2xl p-4 border border-purple-500/40 shadow-xl space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Mode Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-amber-300">Chế Độ Sáng Tác Chuyên Sâu:</label>
            <select
              value={generationMode}
              onChange={(e) => setGenerationMode(e.target.value)}
              className="w-full bg-gray-950 border border-purple-500/50 rounded-xl px-3 py-2 text-xs text-vip-gold font-bold outline-none"
            >
              <option value="BIBLE_CANON">📖 Bám Sát Hồ Sơ Cốt Truyện Kinh Điển</option>
              <option value="PHYSICAL_DUEL">⚡ Thư Hùng Đối Kháng (Vật Lý & Biện Giải Chiêu Thức)</option>
              <option value="MARTIAL_TRAINING">🥋 Diễn Võ Khổ Luyện (Cung • Thương • Võ Công • Công Pháp)</option>
              <option value="POETIC_LEISURE">🌸 Tiêu Dao Sơn Thủy & Giang Hồ Hữu Tình</option>
              <option value="ART_OF_WAR">⚔️ Binh Pháp & Đại Quân Chiến Trận</option>
              <option value="BATTLE_DAO">⚔️ Đại Chiến Thần Binh & Tam Đạo</option>
              <option value="BREAKTHROUGH">⚡ Đột Phá Cảnh Giới & Dị Tượng</option>
              <option value="FACTION_INTRIGUE">♟️ Tông Môn Đấu Trí & Gian Tế</option>
              <option value="SUBPLOT_WEAVE">🌿 Lồng Ghép Mạch Nhánh & Manh Mối</option>
              <option value="CLASSICAL_PROSE">📜 Chuốt Văn Phong Cổ Điển (Văn Mẫu)</option>
              <option value="CONTINUE">✍️ Viết Tiếp Mạch Tự Nhiên</option>
              <option value="FIGHT_SCENE">⚔️ Giao Chiến Nảy Lửa</option>
              <option value="DIALOGUE">🗣️ Đối Thoại Căng Thẳng</option>
            </select>
          </div>

          {/* Target Word Count */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-cyan-300">Quy Mô & Độ Dài Mục Tiêu:</label>
            <select
              value={wordCountTarget}
              onChange={(e) => setWordCountTarget(Number(e.target.value))}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-cyan-200 font-semibold outline-none"
            >
              <option value={1000}>Tiêu Chuẩn (1.000 - 1.500 chữ)</option>
              <option value={1800}>Trường Thiên Chi Tiết (1.800 - 2.400 chữ)</option>
              <option value={2800}>Cao Trào Sử Thi (2.800 - 3.500 chữ)</option>
            </select>
          </div>

          {/* Literary Tone */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-pink-300">Tông Điệu Văn Học:</label>
            <select
              value={literaryTone}
              onChange={(e) => setLiteraryTone(e.target.value)}
              className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-pink-200 font-semibold outline-none"
            >
              <option value="Cổ phong bi tráng, nhiệt huyết hào sảng, đậm chất tiên hiệp chính tông">
                Hào Hùng Bi Tráng • Cổ Phong Chính Tông
              </option>
              <option value="Nghịch tập sảng khoái, vả mặt chấn động, sảng văn cao trào">
                Nghịch Tập Sảng Khoái • Vả Mặt Chấn Động
              </option>
              <option value="U tối ma đạo tàn khốc, sát phạt quả quyết, tâm tính thâm trầm">
                Ma Đạo Sát Phạt • Tâm Tính Thâm Trầm
              </option>
              <option value="Huyền ảo thâm thúy, triết lý ngộ đạo, thiên đạo vô tình">
                Huyền Ảo Thâm Thúy • Triết Lý Ngộ Đạo
              </option>
            </select>
          </div>
        </div>

        {/* Custom Prompt Instruction */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customInstruction}
            onChange={(e) => setCustomInstruction(e.target.value)}
            placeholder="Chỉ đạo riêng của bạn cho phân cảnh này (ví dụ: 'Cho Lâm Tiêu dùng thức thứ nhất chém vỡ ma hồn của Thiết Kiếm Chân Nhân...')"
            className="flex-1 bg-gray-950 border border-purple-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-vip-gold"
          />
        </div>

        {/* Execute Button */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="text-[11px] text-gray-400 flex items-center gap-2">
            <span>Đang gài gắm:</span>
            <span className="font-bold text-amber-300">
              {currentChapterDossier ? `Hồ Sơ Chương ${currentChapterDossier.chapterNumber}` : 'Đại Cương Tự Do'}
            </span>
            <span>+</span>
            <span className="font-bold text-cyan-300">{totalPinnedCount} dữ liệu mẫu</span>
            <span>+</span>
            <span className="font-bold text-purple-300">{characters.length} nhân vật</span>
          </div>

          <button
            onClick={handleExecuteGeneration}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:brightness-110 disabled:opacity-50 text-white font-black text-xs md:text-sm rounded-xl shadow-xl shadow-purple-950/80 ring-2 ring-amber-300 flex items-center gap-2 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Spinner />
                <span>Đang Vận Dụng Dữ Liệu Sáng Tác Chương...</span>
              </>
            ) : (
              <>
                <span>⚡</span>
                <span>SÁNG TÁC CHƯƠNG BẰNG TOÀN BỘ DỮ LIỆU</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
