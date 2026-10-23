import React, { useState } from 'react';
import {
  LocationItem,
  GrottoDwellingItem,
  SecretRealmItem,
  LocationTier,
  GrottoTier,
  SecretRealmTier,
  CharacterProfile,
  SecretRealmExplorationResult,
  GrottoCultivationSimulationResult
} from '../types';
import {
  PRESET_LOCATIONS,
  PRESET_GROTTOS,
  PRESET_SECRET_REALMS
} from '../data/presetLocations';
import {
  PRESET_POETIC_SCENES,
  PoeticSceneryScene
} from '../data/presetPoeticSceneryBible';
import {
  PRESET_DISASTER_RUINS_SCENES,
  DisasterRuinsScene,
  DisasterRuinsCategory,
  DISASTER_RUINS_CATEGORIES_META,
  filterDisasterRuinsScenes
} from '../data/presetDisasterRuinsSceneryBible';
import {
  generateLocationOrRealm,
  simulateRealmExploration,
  simulateGrottoCultivation
} from '../services/geminiService';

interface RealmLocationStudioProps {
  genre?: string;
  characters?: CharacterProfile[];
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
  onInsertText?: (text: string) => void;
}

export const RealmLocationStudio: React.FC<RealmLocationStudioProps> = ({
  genre = 'Tiên Hiệp',
  characters = [],
  onUpdateCharacters,
  onInsertText
}) => {
  // Main Navigation Tabs
  const [activeTab, setActiveTab] = useState<'locations' | 'grottos' | 'secretRealms' | 'poeticScenery' | 'disasterRuins' | 'expedition' | 'grottoSim' | 'aiCreator'>('locations');

  // Catalogs
  const [locations, setLocations] = useState<LocationItem[]>(PRESET_LOCATIONS);
  const [grottos, setGrottos] = useState<GrottoDwellingItem[]>(PRESET_GROTTOS);
  const [secretRealms, setSecretRealms] = useState<SecretRealmItem[]>(PRESET_SECRET_REALMS);
  const [poeticScenes, setPoeticScenes] = useState<PoeticSceneryScene[]>(PRESET_POETIC_SCENES);
  const [selectedPoeticSceneId, setSelectedPoeticSceneId] = useState<string>(PRESET_POETIC_SCENES[0].id);
  const [selectedPoeticTheme, setSelectedPoeticTheme] = useState<string>('all');
  const [poeticCustomHero, setPoeticCustomHero] = useState<string>(characters[0]?.name || 'Tiêu Cảnh');
  const [poeticCustomBeauty, setPoeticCustomBeauty] = useState<string>('Liễu Tố Y (Hồng nhan tri kỷ)');
  const [poeticCustomWine, setPoeticCustomWine] = useState<string>('Cửu Chuyển Bách Hoa Lộ');
  const [poeticCustomInstrument, setPoeticCustomInstrument] = useState<string>('Cổ Cầm & Sáo Trúc');
  const [isGeneratingPoeticDraft, setIsGeneratingPoeticDraft] = useState<boolean>(false);
  const [poeticGeneratedDraft, setPoeticGeneratedDraft] = useState<string>('');

  // Disaster & Ruins Scenery Catalog
  const [disasterScenes, setDisasterScenes] = useState<DisasterRuinsScene[]>(PRESET_DISASTER_RUINS_SCENES);
  const [selectedDisasterCategory, setSelectedDisasterCategory] = useState<string>('all');
  const [selectedDisasterSceneId, setSelectedDisasterSceneId] = useState<string>(PRESET_DISASTER_RUINS_SCENES[0]?.id || '');
  const [disasterViewMode, setDisasterViewMode] = useState<'calamity' | 'revival'>('calamity');
  const [disasterCustomHero, setDisasterCustomHero] = useState<string>(characters[0]?.name || 'Tiêu Cảnh');
  const [disasterCustomCompanion, setDisasterCustomCompanion] = useState<string>('Tống Vấn Thiên (Đồng đạo)');
  const [disasterCustomEnemyOrSource, setDisasterCustomEnemyOrSource] = useState<string>('Huyết Ma Giáo & Lôi Đình Thiên Tai');
  const [isGeneratingDisasterDraft, setIsGeneratingDisasterDraft] = useState<boolean>(false);
  const [disasterGeneratedDraft, setDisasterGeneratedDraft] = useState<string>('');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocTier, setSelectedLocTier] = useState<string>('all');
  const [selectedGrottoTier, setSelectedGrottoTier] = useState<string>('all');
  const [selectedRealmTier, setSelectedRealmTier] = useState<string>('all');

  // Expedition Simulator State
  const [selectedRealmForExpedition, setSelectedRealmForExpedition] = useState<SecretRealmItem>(PRESET_SECRET_REALMS[0]);
  const [expeditionCharId, setExpeditionCharId] = useState<string>(characters[0]?.id || '');
  const [expeditionGoal, setExpeditionGoal] = useState<string>('Đoạt lấy Vạn Niên Linh Thảo để đột phá đại cảnh giới sinh tử');
  const [expeditionGear, setExpeditionGear] = useState<string>('Bản Mệnh Phi Kiếm, Bát Quái Hộ Thân Kính, 3 tấm Ngũ Hành Độn Phù');
  const [isSimulatingExpedition, setIsSimulatingExpedition] = useState(false);
  const [expeditionResult, setExpeditionResult] = useState<(SecretRealmExplorationResult & { proseNarrative?: string }) | null>(null);

  // Grotto Cultivation Simulator State
  const [selectedGrottoForSim, setSelectedGrottoForSim] = useState<GrottoDwellingItem>(PRESET_GROTTOS[2]);
  const [grottoCharId, setGrottoCharId] = useState<string>(characters[0]?.id || '');
  const [cultivationYears, setCultivationYears] = useState<string>('3 năm');
  const [cultivationPill, setCultivationPill] = useState<string>('Cực Phẩm Trúc Cơ Đan & Bách Thảo Thanh Tâm Lộ');
  const [isSimulatingGrotto, setIsSimulatingGrotto] = useState(false);
  const [grottoSimResult, setGrottoSimResult] = useState<GrottoCultivationSimulationResult | null>(null);

  // AI Creator State
  const [createType, setCreateType] = useState<'location' | 'grotto' | 'secretRealm'>('secretRealm');
  const [createTier, setCreateTier] = useState<string>('Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)');
  const [createElement, setCreateElement] = useState<string>('Cổ Kiếm Ý & Lôi Đình');
  const [createCategory, setCreateCategory] = useState<string>('Sơn Mạch Nguyên Sinh');
  const [createContext, setCreateContext] = useState<string>('Tàn tích chiến trường viễn cổ chôn vùi thần binh và cổ kinh');
  const [isCreatingAI, setIsCreatingAI] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Assign Grotto to Character
  const handleAssignGrotto = (grotto: GrottoDwellingItem, charId: string) => {
    if (!onUpdateCharacters) return;
    const char = characters.find(c => c.id === charId);
    if (!char) return;

    const updatedChars = characters.map(c => {
      if (c.id === charId) {
        const note = `[Động Phủ: ${grotto.name} (${grotto.tier})]`;
        const updatedBio = c.bio.includes('[Động Phủ:')
          ? c.bio.replace(/\[Động Phủ:.*?\]/, note)
          : `${c.bio}\n${note}`;
        return { ...c, bio: updatedBio };
      }
      return c;
    });
    onUpdateCharacters(updatedChars);
    setGrottos(grottos.map(g => (g.id === grotto.id ? { ...g, assignedCharacterId: charId } : g)));
    showToast(`Đã ban tặng động phủ "${grotto.name}" cho ${char.name}!`);
  };

  // Filtered Lists
  const filteredLocations = locations.filter(loc => {
    const matchesQuery = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.dominantForces.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedLocTier === 'all' || loc.tier === selectedLocTier;
    return matchesQuery && matchesTier;
  });

  const filteredGrottos = grottos.filter(g => {
    const matchesQuery = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.locationName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedGrottoTier === 'all' || g.tier === selectedGrottoTier;
    return matchesQuery && matchesTier;
  });

  const filteredRealms = secretRealms.filter(r => {
    const matchesQuery = r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.environmentDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.element || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedRealmTier === 'all' || r.tier === selectedRealmTier;
    return matchesQuery && matchesTier;
  });

  // Run Expedition Simulation
  const handleRunExpedition = async () => {
    setIsSimulatingExpedition(true);
    setExpeditionResult(null);
    try {
      const char = characters.find(c => c.id === expeditionCharId);
      const res = await simulateRealmExploration({
        character: char,
        realm: selectedRealmForExpedition,
        goal: expeditionGoal,
        gearUsed: expeditionGear
      });
      setExpeditionResult(res);
      showToast('Đã mô phỏng chuyến thám hiểm bí cảnh thành công!');
    } catch (err: any) {
      showToast('Mô phỏng thám hiểm thất bại: ' + err.message);
    } finally {
      setIsSimulatingExpedition(false);
    }
  };

  // Run Grotto Cultivation Simulation
  const handleRunGrottoSim = async () => {
    setIsSimulatingGrotto(true);
    setGrottoSimResult(null);
    try {
      const char = characters.find(c => c.id === grottoCharId);
      const res = await simulateGrottoCultivation({
        character: char,
        grotto: selectedGrottoForSim,
        years: cultivationYears,
        pillOrTreasure: cultivationPill
      });
      setGrottoSimResult(res);
      showToast('Đã mô phỏng đại cảnh bế quan đột phá thành công!');
    } catch (err: any) {
      showToast('Mô phỏng bế quan thất bại: ' + err.message);
    } finally {
      setIsSimulatingGrotto(false);
    }
  };

  // Run AI Creator
  const handleCreateAI = async () => {
    setIsCreatingAI(true);
    try {
      const newItem = await generateLocationOrRealm({
        type: createType,
        tier: createTier,
        element: createElement,
        category: createCategory,
        contextPrompt: createContext
      });

      if (createType === 'location') {
        setLocations([newItem, ...locations]);
        setActiveTab('locations');
        showToast(`Đã kiến tạo địa danh "${newItem.name}" thành công!`);
      } else if (createType === 'grotto') {
        setGrottos([newItem, ...grottos]);
        setActiveTab('grottos');
        showToast(`Đã kiến tạo động phủ "${newItem.name}" thành công!`);
      } else {
        setSecretRealms([newItem, ...secretRealms]);
        setActiveTab('secretRealms');
        showToast(`Đã mở ra bí cảnh "${newItem.name}" thành công!`);
      }
    } catch (err: any) {
      showToast('Khởi tạo AI thất bại: ' + err.message);
    } finally {
      setIsCreatingAI(false);
    }
  };

  // Generate Custom Poetic Scene
  const handleGenerateCustomPoeticScene = () => {
    setIsGeneratingPoeticDraft(true);
    const sceneToUse = poeticScenes.find(s => s.id === selectedPoeticSceneId) || poeticScenes[0];
    const customText = `Giang sơn vạn dặm như họa, sương khói mờ ảo tựa cõi bồng lai.

${sceneToUse.sceneryDescription}

Thời khắc ấy: ${sceneToUse.timeAndAtmosphere.timeOfDay}. Tiết trời ${sceneToUse.timeAndAtmosphere.weatherAndSeason.toLowerCase()}, ánh trăng dát một dải bạc lấp lánh xuống mặt nước phẳng lặng như tờ.

Trên bàn tiệc thịnh soạn, hũ rượu ${poeticCustomWine} vừa khui nắp, hương thơm nồng nàn ngào ngạt lan tỏa khắp không gian, quyện cùng mùi thịt nướng than hồng béo ngậy đang xèo xèo bốc khói thơm lừng.

${poeticCustomHero} ngửa đầu nâng chén ngọc lưu ly, phóng tầm mắt ngắm nhìn sông núi hùng vĩ, khẽ cười sảng khoái:
"Đời người như giấc mộng, giang hồ đao quang kiếm ảnh mấy phen chìm nổi. Đêm nay dưới bóng trăng thanh, có rượu ngon thịt béo, có huynh đệ bốn bể sum vầy, dẫu đổi lấy cả ngai vàng cũng chẳng bằng một khắc tiêu dao!"

Bên cạnh chàng, ${poeticCustomBeauty} mỉm cười dịu dàng, đôi bàn tay ngọc khẽ lướt trên cung đàn. Từng thanh âm trong trẻo vang lên từ ${poeticCustomInstrument}, hòa nhịp cùng khúc sáo trúc thanh tao của các bậc hào kiệt tứ phương. 

Tiếng đàn quyện vào tiếng sáo, lời thơ hào hùng hòa cùng tiếng sóng nước rì rào vỗ mạn thuyền:
"""
${sceneToUse.musicAndPoetry.originalPoem}
"""

Giữa đất trời bao la tĩnh mịch, men rượu say nồng, tình nghĩa huynh đệ sắt son và nụ cười khuynh thành của giai nhân đã khắc sâu vào ký ức muôn đời.`;

    setPoeticGeneratedDraft(customText);
    setIsGeneratingPoeticDraft(false);
    showToast('✨ Đã khởi tạo phân cảnh tiêu dao giang hồ tùy biến thành công!');
  };

  // Generate Custom Disaster & Ruins Scene (Calamity or Longevity Seed Revival)
  const handleGenerateCustomDisasterScene = () => {
    setIsGeneratingDisasterDraft(true);
    const sceneToUse = disasterScenes.find(s => s.id === selectedDisasterSceneId) || disasterScenes[0];
    
    let customText = '';
    if (disasterViewMode === 'revival' && sceneToUse.longevitySeedRevival) {
      const rev = sceneToUse.longevitySeedRevival;
      customText = `Đất trời ngưng đọng trong một khoảnh khắc kỳ diệu thiêng liêng.

${rev.descentPhenomenon}

Giữa cảnh tượng tan hoang điêu tàn, ${disasterCustomHero} dừng chân trên đống đổ nát, chậm rãi mở lòng bàn tay. Một hạt ngọc xanh biếc lấp lánh như viên phỉ thúy — "${rev.seedName}" — tỏa ra luồng hào quang ấm áp dịu dàng, chiếu rọi khuôn mặt phong trần của chàng.

${disasterCustomCompanion} nín thở thốt lên:
"Đây là... Bất Lão Tiên Chủng trong truyền thuyết thái cổ? Chẳng lẽ có thể nghịch chuyển càn khôn, tái sinh vùng đất chết này?"

Không chút chần chừ, ${disasterCustomHero} khẽ búng ngón tay. Hạt giống trường sinh vẽ nên một vệt sáng bích lục rơi thẳng xuống đất chết.

${rev.momentOfTouchingGround}

${rev.rootingAndPurification}

${rev.sproutingAndCanopyBloom}

Trước sự ngỡ ngàng tột cùng của muôn dân bá tánh, ${rev.mortalAndSurvivorMiracle.toLowerCase()}. Khí tức tàn độc của ${disasterCustomEnemyOrSource} bị quét sạch không còn một dấu vết, nhường chỗ cho sinh cơ dạt dào muôn đời vĩnh cửu.

${rev.masterRevivalProseExcerpt}`;
    } else {
      customText = `Đất trời chao đảo, vạn vật hoang phế giữa cơn bão táp kiếp nạn.

${sceneToUse.sceneryDescription}

Thời khắc ấy: ${sceneToUse.timeAndAtmosphere.timeOfDay}. Tiết trời: ${sceneToUse.timeAndAtmosphere.weatherAndSky}. 
Tàn dư khí tức còn sót lại: ${sceneToUse.timeAndAtmosphere.residualEnergyOrAura}.

Giữa đống đổ nát điêu tàn, ${disasterCustomHero} dừng chân trên lớp xỉ than còn âm ỉ cháy, vạt áo bào nhuốm bụi tro phần phật bay trong cơn gió lạnh buốt xương. Ánh mắt chàng quét qua ${sceneToUse.destructiveScale.rubbleAndRuins.toLowerCase()}, nơi dấu vết của ${disasterCustomEnemyOrSource} vẫn còn hằn sâu trên từng tấc đất rỉ máu.

Bên cạnh, ${disasterCustomCompanion} siết chặt chuôi kiếm, giọng run run vì phẫn nộ và bi ai:
"Trời đất bất nhân, coi vạn vật như chó rơm! Một phen đại kiếp, sinh linh lầm than, bách tính vô tội biết nương tựa vào đâu?"

Trước mắt họ, thảm cảnh nhân gian hiện lên rợn ngợp: ${sceneToUse.humanAndMortalTragedy.survivorsPlight.toLowerCase()}. 
Đặc biệt là ${sceneToUse.humanAndMortalTragedy.poignantDetail.toLowerCase()} — một chi tiết cứa sâu vào tâm can, khiến đạo tâm của bậc tu sĩ kiên định nhất cũng phải chấn động dữ dội.

${sceneToUse.masterProseExcerpt}`;
    }

    setDisasterGeneratedDraft(customText);
    setIsGeneratingDisasterDraft(false);
    showToast(disasterViewMode === 'revival' ? '🌱 Đã khởi tạo phân cảnh Hạt Trường Sinh Hồi Sinh tùy biến!' : '🔥 Đã khởi tạo phân cảnh hoang tàn & thiên tai tùy biến!');
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 bg-cyan-900 border border-cyan-400 text-cyan-100 text-xs font-bold px-4 py-2.5 rounded-lg shadow-xl shadow-cyan-950/80 animate-fade-in flex items-center gap-2">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-gray-950 via-cyan-950/40 to-gray-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-xl shadow-inner">
            🗺️
          </div>
          <div>
            <h2 className="text-base font-black text-cyan-300 tracking-wide flex items-center gap-2">
              ĐỊA DANH, ĐỘNG THIÊN & BÍ CẢNH
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-500/30">
                Chư Thiên Kỳ Cảnh
              </span>
            </h2>
            <p className="text-[11px] text-gray-400">
              Sơn mạch linh địa, động phủ bế quan gia tốc thời gian và di tích bí cảnh sinh tử
            </p>
          </div>
        </div>

        {/* Global Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Tìm kiếm địa danh, bí cảnh, sản vật..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-3 py-1 bg-gray-900/90 border border-gray-700 rounded-lg text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 w-52 sm:w-64"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-2.5 flex flex-wrap gap-1.5 border-b border-white/10 bg-gray-900/50">
        <button
          onClick={() => setActiveTab('locations')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'locations'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🏔️</span> Sơn Mạch & Cấm Khu ({locations.length})
        </button>
        <button
          onClick={() => setActiveTab('grottos')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'grottos'
              ? 'border-amber-400 text-amber-300 bg-amber-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🏯</span> Động Phủ & Động Thiên ({grottos.length})
        </button>
        <button
          onClick={() => setActiveTab('secretRealms')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'secretRealms'
              ? 'border-purple-400 text-purple-300 bg-purple-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🌀</span> Bí Cảnh & Cấm Địa ({secretRealms.length})
        </button>
        <button
          onClick={() => setActiveTab('poeticScenery')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'poeticScenery'
              ? 'border-pink-400 text-pink-300 bg-pink-950/40 shadow-sm shadow-pink-950'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🌸</span> Tiêu Dao Sơn Thủy ({poeticScenes.length})
        </button>
        <button
          onClick={() => setActiveTab('disasterRuins')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'disasterRuins'
              ? 'border-red-500 text-red-300 bg-red-950/40 shadow-sm shadow-red-950'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🔥</span> Thiên Tai & Chiến Tàn Phế Tích ({disasterScenes.length})
        </button>
        <button
          onClick={() => setActiveTab('expedition')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'expedition'
              ? 'border-rose-400 text-rose-300 bg-rose-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>⚔️</span> Thám Hiểm Bí Cảnh
        </button>
        <button
          onClick={() => setActiveTab('grottoSim')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'grottoSim'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🧘</span> Bế Quan Đột Phá
        </button>
        <button
          onClick={() => setActiveTab('aiCreator')}
          className={`px-3 py-2 rounded-t-lg text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
            activeTab === 'aiCreator'
              ? 'border-yellow-400 text-yellow-300 bg-yellow-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>✨</span> AI Sáng Tạo Kỳ Cảnh
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">

        {/* ================= TAB 1: LOCATIONS ================= */}
        {activeTab === 'locations' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-900/60 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-bold">Phân Tầng Địa Danh:</span>
              <button
                onClick={() => setSelectedLocTier('all')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedLocTier === 'all' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Tất Cả ({locations.length})
              </button>
              <button
                onClick={() => setSelectedLocTier('Phàm Trần Kỳ Cảnh (Hồng Trần Khí Mỏng)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedLocTier === 'Phàm Trần Kỳ Cảnh (Hồng Trần Khí Mỏng)' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                1. Phàm Trần (Nhất - Nhị Phẩm)
              </button>
              <button
                onClick={() => setSelectedLocTier('Tu Chân Sơn Mạch & Linh Địa (Nhất - Tam Phẩm)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedLocTier === 'Tu Chân Sơn Mạch & Linh Địa (Nhất - Tam Phẩm)' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                2. Tu Chân Sơn Mạch (Tam - Tứ Phẩm)
              </button>
              <button
                onClick={() => setSelectedLocTier('Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedLocTier === 'Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                3. Thánh Địa Tông Môn (Ngũ - Lục Phẩm)
              </button>
              <button
                onClick={() => setSelectedLocTier('Vô Sinh Cấm Khu & Thâm Uyên Hung Địa (Thất - Cửu Phẩm)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedLocTier === 'Vô Sinh Cấm Khu & Thâm Uyên Hung Địa (Thất - Cửu Phẩm)' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                4. Thượng Cổ Cấm Sơn (Thất - Bát Phẩm)
              </button>
              <button
                onClick={() => setSelectedLocTier('Thái Cổ Thần Vực & Tiên Giới Di Lạc (Tiên Phẩm Vô Thượng)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedLocTier === 'Thái Cổ Thần Vực & Tiên Giới Di Lạc (Tiên Phẩm Vô Thượng)' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                5. Thái Cổ Thần Vực (Tiên Phẩm)
              </button>
            </div>

            {/* Location Cards */}
            <div className="grid grid-cols-1 gap-4">
              {filteredLocations.map(loc => (
                <div
                  key={loc.id}
                  className="p-5 rounded-xl bg-gray-950/90 border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-950/30 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40">
                          {loc.tier}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                          loc.dangerLevel === 'An Toàn' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' :
                          loc.dangerLevel === 'Nguy Hiểm Cấp B' ? 'bg-blue-950 text-blue-300 border-blue-500/40' :
                          loc.dangerLevel === 'Nguy Hiểm Cấp A' ? 'bg-amber-950 text-amber-300 border-amber-500/40' :
                          loc.dangerLevel === 'Cực Nguy Cấp S' ? 'bg-orange-950 text-orange-300 border-orange-500/40' :
                          'bg-red-950 text-red-300 border-red-500/40 animate-pulse'
                        }`}>
                          ⚠️ {loc.dangerLevel}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                          {loc.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-vip-gold tracking-wide">{loc.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Thế lực cai quản: <span className="text-gray-200 font-semibold">{loc.dominantForces}</span></p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {onInsertText && (
                        <button
                          onClick={() => {
                            const snippet = `[ĐỊA DANH TU CHÂN: ${loc.name}]\n- Cấp bậc: ${loc.tier} (${loc.dangerLevel})\n- Thể loại: ${loc.category}\n- Nồng độ linh khí: ${loc.spiritEnergyDensity}\n- Địa mạo & Thời tiết: ${loc.terrainAndWeather}\n- Thế lực chiếm đóng: ${loc.dominantForces}\n- Sản vật quý báu: ${loc.naturalTreasures.join(', ')}\n- Miêu tả: ${loc.description}\n- Truyền thuyết: ${loc.loreAndHistory}`;
                            onInsertText(snippet);
                            showToast(`Đã chèn địa danh "${loc.name}" vào chương truyện!`);
                          }}
                          className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
                        >
                          <span>📜</span> Chèn Vào Truyện
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed bg-gray-900/60 p-3 rounded-lg border border-white/5">
                    {loc.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-gray-900/40 border border-white/5">
                      <span className="text-gray-400 font-semibold flex items-center gap-1">
                        <span>✨</span> Nồng độ Linh Khí:
                      </span>
                      <p className="text-cyan-200 mt-1 leading-snug">{loc.spiritEnergyDensity}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-900/40 border border-white/5">
                      <span className="text-gray-400 font-semibold flex items-center gap-1">
                        <span>🏔️</span> Địa Thế & Khí Hậu:
                      </span>
                      <p className="text-gray-200 mt-1 leading-snug">{loc.terrainAndWeather}</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-900/40 border border-white/5">
                      <span className="text-gray-400 font-semibold flex items-center gap-1">
                        <span>🌿</span> Kỳ Trân Dị Sản:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {loc.naturalTreasures.map((item, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[11px]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {loc.loreAndHistory && (
                    <div className="text-[11px] text-gray-400 italic pt-1 border-t border-white/5 flex items-start gap-1.5">
                      <span className="text-amber-400 not-italic">📖 Cổ Tích:</span>
                      <span>{loc.loreAndHistory}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: GROTTOS ================= */}
        {activeTab === 'grottos' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-900/60 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-bold">Phẩm Cấp Động Phủ:</span>
              <button
                onClick={() => setSelectedGrottoTier('all')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedGrottoTier === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Tất Cả ({grottos.length})
              </button>
              <button
                onClick={() => setSelectedGrottoTier('Hạ Phẩm Thạch Động (Luyện Khí / Tán Tu)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedGrottoTier === 'Hạ Phẩm Thạch Động (Luyện Khí / Tán Tu)' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                1. Hạ Phẩm (Luyện Khí)
              </button>
              <button
                onClick={() => setSelectedGrottoTier('Trung Phẩm Linh Động (Trúc Cơ / Nội Môn)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedGrottoTier === 'Trung Phẩm Linh Động (Trúc Cơ / Nội Môn)' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                2. Trung Phẩm (Trúc Cơ)
              </button>
              <button
                onClick={() => setSelectedGrottoTier('Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedGrottoTier === 'Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                3. Thượng Phẩm (Kim Đan)
              </button>
              <button
                onClick={() => setSelectedGrottoTier('Cực Phẩm Đạo Quân Động Thiên (Nguyên Anh / Hóa Thần)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedGrottoTier === 'Cực Phẩm Đạo Quân Động Thiên (Nguyên Anh / Hóa Thần)' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                4. Cực Phẩm Đạo Quân
              </button>
              <button
                onClick={() => setSelectedGrottoTier('Thái Cổ Tiên Phủ / Giới Tử Động Thiên (Luyện Hư / Hợp Thể / Đại Thừa)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedGrottoTier === 'Thái Cổ Tiên Phủ / Giới Tử Động Thiên (Luyện Hư / Hợp Thể / Đại Thừa)' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                5. Giới Tử Động Thiên
              </button>
              <button
                onClick={() => setSelectedGrottoTier('Hỗn Độn Thần Cung / Vạn Cổ Tiên Điện (Chân Tiên Cực Đạo)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedGrottoTier === 'Hỗn Độn Thần Cung / Vạn Cổ Tiên Điện (Chân Tiên Cực Đạo)' ? 'bg-amber-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                6. Hỗn Độn Thần Cung (Chân Tiên)
              </button>
            </div>

            {/* Grotto Cards */}
            <div className="grid grid-cols-1 gap-4">
              {filteredGrottos.map(g => {
                const assignedChar = characters.find(c => c.id === g.assignedCharacterId);

                return (
                  <div
                    key={g.id}
                    className="p-5 rounded-xl bg-gray-950/90 border border-amber-500/30 hover:border-amber-400/60 transition-all shadow-lg shadow-amber-950/30 space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-[10px] font-mono uppercase text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-950 border border-amber-500/40">
                            {g.tier}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                            ⏳ Gia tốc: {g.timeDilationRate}
                          </span>
                          {assignedChar && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                              👤 Chủ nhân: {assignedChar.name}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-black text-vip-gold tracking-wide">{g.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Vị trí tọa lạc: <span className="text-gray-200">{g.locationName}</span></p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Assign Character Selector */}
                        {characters.length > 0 && (
                          <select
                            value={g.assignedCharacterId || ''}
                            onChange={e => handleAssignGrotto(g, e.target.value)}
                            className="px-2.5 py-1.5 bg-gray-900 border border-amber-500/40 rounded-lg text-xs text-amber-200 focus:outline-none"
                          >
                            <option value="">-- Ban Cho Tu Sĩ --</option>
                            {characters.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name} ({c.realm || 'Trúc Cơ'})
                              </option>
                            ))}
                          </select>
                        )}

                        <button
                          onClick={() => {
                            setSelectedGrottoForSim(g);
                            setActiveTab('grottoSim');
                          }}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
                        >
                          <span>🧘</span> Bế Quan Tại Đây
                        </button>

                        {onInsertText && (
                          <button
                            onClick={() => {
                              const chambersDesc = g.chambers.map(c => `+ ${c.name} (${c.purpose}): ${c.features}`).join('\n');
                              const snippet = `[ĐỘNG PHỦ TU LUYỆN: ${g.name}]\n- Phẩm cấp: ${g.tier}\n- Vị trí: ${g.locationName}\n- Linh mạch: ${g.spiritVeinType}\n- Gia tốc thời gian: ${g.timeDilationRate}\n- Đại trận hộ phủ: ${g.defensiveArrays}\n- Phòng ốc chi tiết:\n${chambersDesc}\n- Tiện ích đặc biệt: ${g.specialFacilities.join(', ')}\n- Miêu tả: ${g.description}`;
                              onInsertText(snippet);
                              showToast(`Đã chèn động phủ "${g.name}" vào chương truyện!`);
                            }}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
                          >
                            <span>📜</span> Chèn Vào Truyện
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed bg-gray-900/60 p-3 rounded-lg border border-white/5">
                      {g.description}
                    </p>

                    {/* Chambers Grid */}
                    <div className="space-y-2">
                      <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                        <span>🏛️</span> Các Phòng Tu Luyện & Thần Thất:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {g.chambers.map((chamber, cIdx) => (
                          <div key={cIdx} className="p-3 bg-gray-900/70 rounded-lg border border-white/5 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-amber-200">{chamber.name}</span>
                              <span className="text-[10px] text-gray-400">{chamber.purpose}</span>
                            </div>
                            <p className="text-[11px] text-gray-300 leading-snug">{chamber.features}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Defensive arrays & Facilities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1 border-t border-white/5">
                      <div>
                        <span className="text-gray-400 font-semibold">🛡️ Hộ Phủ Đại Trận:</span>
                        <p className="text-purple-300 mt-0.5">{g.defensiveArrays}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold">✨ Tiện Ích Độc Tôn:</span>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          {g.specialFacilities.map((fac, fIdx) => (
                            <span key={fIdx} className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[11px]">
                              {fac}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: SECRET REALMS ================= */}
        {activeTab === 'secretRealms' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-900/60 rounded-xl border border-white/5">
              <span className="text-xs text-gray-400 font-bold">Phân Tầng Bí Cảnh:</span>
              <button
                onClick={() => setSelectedRealmTier('all')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedRealmTier === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                Tất Cả ({secretRealms.length})
              </button>
              <button
                onClick={() => setSelectedRealmTier('Hạ Phẩm Thí Luyện Bí Cảnh (Trúc Cơ / Ngũ Hành)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedRealmTier === 'Hạ Phẩm Thí Luyện Bí Cảnh (Trúc Cơ / Ngũ Hành)' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                1. Hạ Phẩm (Trúc Cơ)
              </button>
              <button
                onClick={() => setSelectedRealmTier('Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedRealmTier === 'Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                2. Trung Phẩm (Kim Đan)
              </button>
              <button
                onClick={() => setSelectedRealmTier('Thượng Phẩm Hư Không Mảnh Vỡ (Nguyên Anh / Hóa Thần)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedRealmTier === 'Thượng Phẩm Hư Không Mảnh Vỡ (Nguyên Anh / Hóa Thần)' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                3. Thượng Phẩm Hư Không
              </button>
              <button
                onClick={() => setSelectedRealmTier('Tuyệt Thế Cổ Tiên Ma Chiến Trường (Luyện Hư / Hợp Thể)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedRealmTier === 'Tuyệt Thế Cổ Tiên Ma Chiến Trường (Luyện Hư / Hợp Thể)' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                4. Tiên Ma Chiến Trường
              </button>
              <button
                onClick={() => setSelectedRealmTier('Thái Sơ Hỗn Độn Vực / Tiên Thiên Thần Vực (Đại Thừa / Chân Tiên)')}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  selectedRealmTier === 'Thái Sơ Hỗn Độn Vực / Tiên Thiên Thần Vực (Đại Thừa / Chân Tiên)' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                5. Thái Sơ Hỗn Độn
              </button>
            </div>

            {/* Realm Cards */}
            <div className="grid grid-cols-1 gap-4">
              {filteredRealms.map(r => (
                <div
                  key={r.id}
                  className="p-5 rounded-xl bg-gray-950/90 border border-purple-500/30 hover:border-purple-400/60 transition-all shadow-lg shadow-purple-950/30 space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono uppercase text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40">
                          {r.tier}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                          💀 Sống sót: {r.survivalRate}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                          ⏳ Chu kỳ: {r.openingCycle}
                        </span>
                        {r.element && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                            ⚡ {r.element}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-black text-vip-gold tracking-wide">{r.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Giới hạn nhập cảnh: <span className="text-red-300 font-semibold">{r.entryRestrictions}</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedRealmForExpedition(r);
                          setActiveTab('expedition');
                        }}
                        className="px-3.5 py-1.5 bg-rose-700 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
                      >
                        <span>⚔️</span> Khởi Hành Thám Hiểm
                      </button>

                      {onInsertText && (
                        <button
                          onClick={() => {
                            const snippet = `[BÍ CẢNH THƯỢNG CỔ: ${r.name}]\n- Cấp bậc: ${r.tier}\n- Thuộc tính: ${r.element || 'Hỗn Hợp'}\n- Cảnh giới khuyến nghị: ${r.recommendedRealm || 'Tùy cơ duyên'}\n- Chu kỳ mở cửa: ${r.openingCycle}\n- Hạn chế vào: ${r.entryRestrictions}\n- Tỷ lệ sống sót: ${r.survivalRate}\n- Yêu thú thủ hộ: ${(r.guardianBeasts || []).join(', ')}\n- Cạm bẫy hung hiểm: ${r.trialsAndHazards.join(', ')}\n- Cơ duyên chung cực: ${r.ultimateTreasures.join(', ')}\n- Môi trường: ${r.environmentDescription}\n- Điển tích: ${r.backstory}`;
                            onInsertText(snippet);
                            showToast(`Đã chèn bí cảnh "${r.name}" vào chương truyện!`);
                          }}
                          className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
                        >
                          <span>📜</span> Chèn Vào Truyện
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed bg-gray-900/60 p-3 rounded-lg border border-white/5">
                    {r.environmentDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/20 space-y-1.5">
                      <span className="text-red-400 font-bold flex items-center gap-1">
                        <span>⚡</span> Cạm Bẫy & Hiểm Họa Sinh Tử:
                      </span>
                      <ul className="list-disc list-inside text-gray-300 space-y-0.5">
                        {r.trialsAndHazards.map((hazard, hIdx) => (
                          <li key={hIdx}>{hazard}</li>
                        ))}
                      </ul>
                      {r.guardianBeasts && r.guardianBeasts.length > 0 && (
                        <p className="text-[11px] text-orange-300 pt-1 border-t border-red-500/20">
                          🐾 Yêu Thú Thủ Hộ: {r.guardianBeasts.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span>💎</span> Cơ Duyên & Thần Vật Chung Cực:
                      </span>
                      <ul className="list-disc list-inside text-gray-300 space-y-0.5">
                        {r.ultimateTreasures.map((treasure, tIdx) => (
                          <li key={tIdx}>{treasure}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {r.backstory && (
                    <div className="text-[11px] text-gray-400 italic pt-1 border-t border-white/5 flex items-start gap-1.5">
                      <span className="text-purple-400 not-italic">📜 Lai Lịch:</span>
                      <span>{r.backstory}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB: TIÊU DAO SƠN THỦY & GIANG HỒ HỮU TÌNH ================= */}
        {activeTab === 'poeticScenery' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-950/80 rounded-xl border border-pink-500/30">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0 scrollbar-thin">
                <span className="text-pink-300 font-bold mr-1 whitespace-nowrap">Chủ Đề & Lễ Hội:</span>
                {[
                  { id: 'all', label: `Tất Cả (${poeticScenes.length} Bối Cảnh)` },
                  { id: 'Hẹn Hò Phố Hội', label: '🏮 Hẹn Hò Phố Hội' },
                  { id: 'Tuyết Dạ Tương Tư', label: '❄️ Đoạn Kiều Tàn Tuyết' },
                  { id: 'Tiên Lữ Đồng Hành', label: '✨ Tiên Lữ Ngắm Sao' },
                  { id: 'Lãng Mạn Uyên Ương', label: '🌸 Lãng Mạn Uyên Ương' },
                  { id: 'Lễ Hội Thả Hoa Đăng', label: '🪷 Thả Đèn Hoa Đăng' },
                  { id: 'Lễ Hội Thất Tịch Nguyện Ước', label: '🎋 Thất Tịch Nguyện Ước' },
                  { id: 'Lễ Hội Đèn Khổng Minh', label: '🏮 Đèn Khổng Minh' },
                  { id: 'Lễ Hội Giao Mùa Nghênh Xuân', label: '🎆 Lập Xuân Nghênh Phúc' },
                  { id: 'Lễ Hội Giao Mùa Lập Hạ', label: '🍃 Lập Hạ Thiền Thanh' },
                  { id: 'Lễ Hội Giao Mùa Lập Thu', label: '🍂 Lập Thu Nhất Diệp' },
                  { id: 'Lễ Hội Giao Mùa Lập Đông', label: '❄️ Lập Đông Hồng Lô' },
                  { id: 'Lễ Hội Nguyên Tiêu Phố Cổ', label: '🏮 Thượng Nguyên Phố Cổ' },
                  { id: 'Du Thuyền Giang Hà', label: '⛵ Du Thuyền Giang Hà' },
                  { id: 'Tuyết Dạ Đun Trà', label: '❄️ Đình Tuyết Nướng Thịt' },
                  { id: 'Đầm Sen Trăng Rằm', label: '🪷 Đầm Sen Trăng Rằm' },
                  { id: 'Đình Đài Hoa Lạc', label: '🌸 Đào Hoa Tiên Ổ' },
                  { id: 'Suối Rừng Ẩn Dật', label: '🌲 Suối Rừng Ẩn Dật' }
                ].map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedPoeticTheme(theme.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                      selectedPoeticTheme === theme.id
                        ? 'bg-pink-600 text-white shadow-md shadow-pink-950 ring-1 ring-pink-300'
                        : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-pink-300/80 font-serif italic">
                🌸 Rượu ngon • Thịt nướng • Mỹ nhân • Anh hùng • Tứ hải huynh đệ • Đàn sáo ngâm thơ
              </div>
            </div>

            {/* Main Content Layout */}
            {(() => {
              const filteredScenes = poeticScenes.filter(s => {
                const matchesTheme = selectedPoeticTheme === 'all' || s.theme === selectedPoeticTheme;
                const matchesQuery = !searchQuery ||
                  s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.sceneryDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  s.alias.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesTheme && matchesQuery;
              });

              const currentScene = poeticScenes.find(s => s.id === selectedPoeticSceneId) || poeticScenes[0];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  {/* Left Column: Scene List (4 cols) */}
                  <div className="lg:col-span-4 space-y-2">
                    <div className="text-xs font-bold text-gray-400 px-1">
                      Danh Mục Bối Cảnh Tiêu Dao ({filteredScenes.length}):
                    </div>
                    <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1 custom-scrollbar">
                      {filteredScenes.map(scene => (
                        <div
                          key={scene.id}
                          onClick={() => setSelectedPoeticSceneId(scene.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                            selectedPoeticSceneId === scene.id
                              ? 'bg-gradient-to-r from-pink-950/80 to-purple-950/80 border-pink-500 shadow-lg shadow-pink-950/40 ring-1 ring-pink-400/50'
                              : 'bg-gray-950/70 border-white/10 hover:border-pink-500/40'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-pink-200 truncate">{scene.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-800/60 shrink-0 font-bold">
                              {scene.theme}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-300 italic font-serif line-clamp-2">
                            &quot;{scene.alias}&quot;
                          </p>
                          <div className="text-[10px] text-gray-400 pt-1 border-t border-white/5 flex items-center justify-between">
                            <span className="truncate max-w-[190px]">🍶 {scene.wineAndFeast.wines[0]}</span>
                            <span className="text-pink-400 font-medium">Chi tiết →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Scene Detail Dossier (8 cols) */}
                  <div className="lg:col-span-8 space-y-4">
                    {currentScene && (
                      <div className="p-4 md:p-5 rounded-2xl bg-gray-950/90 border border-pink-500/40 shadow-2xl space-y-4">
                        {/* Header Banner */}
                        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-pink-500/20 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-black text-pink-200">{currentScene.title}</h3>
                              <span className="text-xs px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-500/40 font-bold">
                                {currentScene.theme}
                              </span>
                            </div>
                            <p className="text-xs text-amber-300 font-serif italic mt-0.5">
                              ✨ {currentScene.alias}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(currentScene.masterProseExcerpt);
                                showToast('📋 Đã sao chép phân cảnh mẫu!');
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 text-xs font-bold transition flex items-center gap-1"
                            >
                              <span>📋</span> Sao Chép
                            </button>
                            {onInsertText && (
                              <button
                                onClick={() => {
                                  onInsertText(`\n\n${currentScene.masterProseExcerpt}\n\n`);
                                  showToast('✍️ Đã chèn phân cảnh tiêu dao vào bản thảo!');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-black shadow-md transition flex items-center gap-1"
                              >
                                <span>✍️</span> Chèn Vào Chương
                              </button>
                            )}
                          </div>
                        </div>

                        {/* 4 Pillars Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          {/* 1. Time & Atmosphere */}
                          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
                            <span className="text-purple-300 font-black flex items-center gap-1.5">
                              <span>🌌</span> Thời Khắc & Khí Quyển:
                            </span>
                            <div className="space-y-1 text-gray-300 text-[11px]">
                              <div><strong className="text-purple-400">Thời gian:</strong> {currentScene.timeAndAtmosphere.timeOfDay}</div>
                              <div><strong className="text-purple-400">Tiết trời:</strong> {currentScene.timeAndAtmosphere.weatherAndSeason}</div>
                              <div><strong className="text-purple-400">Ánh sáng & Không gian:</strong> {currentScene.timeAndAtmosphere.lightingAndSpace}</div>
                            </div>
                          </div>

                          {/* 2. Scenery Description */}
                          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                            <span className="text-cyan-300 font-black flex items-center gap-1.5">
                              <span>🏞️</span> Cảnh Sắc Sông Nước & Non Xanh:
                            </span>
                            <p className="text-gray-300 text-[11px] leading-relaxed font-serif">
                              {currentScene.sceneryDescription}
                            </p>
                          </div>

                          {/* 3. Wine & Feast */}
                          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                            <span className="text-amber-300 font-black flex items-center gap-1.5">
                              <span>🍶</span> Rượu Ngon & Sơn Hào Hải Vị:
                            </span>
                            <div className="space-y-1 text-gray-300 text-[11px]">
                              <div><strong className="text-amber-400">Danh tửu:</strong> {currentScene.wineAndFeast.wines.join('; ')}</div>
                              <div><strong className="text-amber-400">Thịt nướng & Mỹ vị:</strong> {currentScene.wineAndFeast.delicacies.join('; ')}</div>
                              <div><strong className="text-amber-400">Bày biện:</strong> {currentScene.wineAndFeast.tableSetting}</div>
                            </div>
                          </div>

                          {/* 4. Companions, Heroes & Beauties */}
                          <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                            <span className="text-rose-300 font-black flex items-center gap-1.5">
                              <span>💃</span> Mỹ Nhân, Anh Hùng & Huynh Đệ:
                            </span>
                            <div className="space-y-1 text-gray-300 text-[11px]">
                              <div><strong className="text-rose-400">Hào kiệt:</strong> {currentScene.companionsAndRomance.heroes}</div>
                              <div><strong className="text-rose-400">Mỹ nhân:</strong> {currentScene.companionsAndRomance.beauties}</div>
                              <div><strong className="text-rose-400">Tứ hải giai huynh đệ:</strong> {currentScene.companionsAndRomance.brotherhoodBond}</div>
                            </div>
                          </div>
                        </div>

                        {/* Festival Rituals & Wish Inscriptions (if available) */}
                        {currentScene.festivalRituals && (
                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-red-950/30 to-purple-950/40 border border-amber-500/40 space-y-2.5">
                            <div className="flex flex-wrap items-center justify-between gap-1">
                              <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                                <span>🏮</span> Nghi Thức & Phong Tục Lễ Hội: {currentScene.festivalRituals.ritualName}
                              </span>
                              <span className="text-[10px] text-amber-200/70 italic font-serif">
                                {currentScene.festivalRituals.culturalMeaning}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px]">
                              <div className="p-2.5 rounded-lg bg-black/50 border border-amber-500/20 space-y-1">
                                <span className="text-amber-400 font-bold block">📜 Trình Tự Nghi Lễ Cử Hành:</span>
                                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                                  {currentScene.festivalRituals.stepByStep.map((step, sIdx) => (
                                    <li key={sIdx}>{step}</li>
                                  ))}
                                </ol>
                              </div>
                              <div className="p-2.5 rounded-lg bg-black/50 border border-amber-500/20 space-y-1">
                                <span className="text-amber-400 font-bold block">✨ Câu Liễn & Lời Nguyện Đề Trên Đèn:</span>
                                <div className="space-y-1">
                                  {currentScene.festivalRituals.wishInscriptions.map((wish, wIdx) => (
                                    <div
                                      key={wIdx}
                                      className="flex items-center justify-between p-1.5 bg-amber-950/30 rounded border border-amber-500/20 text-amber-200 font-serif text-[11px]"
                                    >
                                      <span>&ldquo;{wish}&rdquo;</span>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(wish);
                                          showToast('Đã sao chép lời thề nguyền!');
                                        }}
                                        className="text-[10px] px-1.5 py-0.5 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded ml-1 transition-colors"
                                      >
                                        Copy
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Romantic Couple Spotlight, Sky & Crowd Dynamics (if available) */}
                        {(currentScene.skyAndAirborne || currentScene.crowdAndPassersby || currentScene.coupleRomanceFocus) && (
                          <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-pink-950/40 border border-rose-500/40 space-y-3">
                            <div className="flex flex-wrap items-center justify-between gap-1 border-b border-rose-500/20 pb-2">
                              <span className="text-xs font-black text-rose-300 flex items-center gap-1.5">
                                <span>💖</span> TÂM ĐIỂM TÌNH DUYÊN, BẦU TRỜI & DÒNG NGƯỜI QUA LẠI
                              </span>
                              <span className="text-[10px] text-rose-200/80 italic font-serif">
                                Hẹn hò lãng mạn • Khoảnh khắc ngưng đọng giữa biển người
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px]">
                              {/* 1. Sky & Airborne */}
                              {currentScene.skyAndAirborne && (
                                <div className="p-2.5 rounded-lg bg-black/50 border border-purple-500/20 space-y-1.5">
                                  <span className="text-purple-300 font-bold block flex items-center gap-1">
                                    <span>🌌</span> Bầu Trời & Vòm Không:
                                  </span>
                                  <div className="text-gray-300 space-y-1">
                                    <div><strong className="text-purple-400">Thiên tượng:</strong> {currentScene.skyAndAirborne.celestialPhenomena}</div>
                                    <div><strong className="text-purple-400">Chuyển động trên không:</strong> {currentScene.skyAndAirborne.aerialMotion}</div>
                                  </div>
                                </div>
                              )}

                              {/* 2. Crowd & Passersby Dynamics */}
                              {currentScene.crowdAndPassersby && (
                                <div className="p-2.5 rounded-lg bg-black/50 border border-amber-500/20 space-y-1.5">
                                  <span className="text-amber-300 font-bold block flex items-center gap-1">
                                    <span>👥</span> Dòng Người & Sự Tương Phản:
                                  </span>
                                  <div className="text-gray-300 space-y-1">
                                    <div><strong className="text-amber-400">Biển người:</strong> {currentScene.crowdAndPassersby.crowdAtmosphere}</div>
                                    <div><strong className="text-amber-400">Tương phản đôi lứa:</strong> {currentScene.crowdAndPassersby.contrastWithCouple}</div>
                                  </div>
                                </div>
                              )}

                              {/* 3. Couple Romance & Tender Gestures */}
                              {currentScene.coupleRomanceFocus && (
                                <div className="p-2.5 rounded-lg bg-black/50 border border-rose-500/20 space-y-1.5">
                                  <span className="text-rose-300 font-bold block flex items-center gap-1">
                                    <span>💑</span> Cử Chỉ Ngọt Ngào & Ánh Mắt:
                                  </span>
                                  <div className="text-gray-300 space-y-1">
                                    <div><strong className="text-rose-400">Cử chỉ nâng niu:</strong> {currentScene.coupleRomanceFocus.tenderMoments}</div>
                                    <div><strong className="text-rose-400">Ánh mắt & Nhịp tim:</strong> {currentScene.coupleRomanceFocus.unspokenGaze}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Music, Poetry & Zither-Flute Harmony */}
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-pink-950/40 border border-indigo-500/40 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
                              <span>🎶</span> Hợp Đàn Thổi Sáo & Thi Ca Vọng Nguyệt
                            </span>
                            <span className="text-[10px] text-gray-400">Nhạc cụ: {currentScene.musicAndPoetry.instruments}</span>
                          </div>
                          <p className="text-xs text-gray-300 italic font-serif">
                            &quot;{currentScene.musicAndPoetry.harmonyVibe}&quot;
                          </p>
                          <div className="p-3 rounded-lg bg-black/60 border border-indigo-500/30 font-serif text-center text-xs text-amber-200 leading-relaxed whitespace-pre-line tracking-wide">
                            {currentScene.musicAndPoetry.originalPoem}
                          </div>
                        </div>

                        {/* 5 Sensory Dimensions */}
                        <div className="p-3.5 rounded-xl bg-gray-900/60 border border-white/10 space-y-2 text-xs">
                          <span className="text-xs font-black text-vip-gold flex items-center gap-1.5">
                            <span>🖐️</span> Trực Giác Chi Tiết 5 Giác Quan (Ngũ Giác Cảm Thụ):
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-[11px]">
                            <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                              <span className="text-cyan-300 font-bold block">👁️ Thị Giác:</span>
                              <p className="text-gray-300">{currentScene.sensoryDetails.visual}</p>
                            </div>
                            <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                              <span className="text-purple-300 font-bold block">👂 Thính Giác:</span>
                              <p className="text-gray-300">{currentScene.sensoryDetails.auditory}</p>
                            </div>
                            <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                              <span className="text-pink-300 font-bold block">👃 Khứu Giác:</span>
                              <p className="text-gray-300">{currentScene.sensoryDetails.olfactory}</p>
                            </div>
                            <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                              <span className="text-amber-300 font-bold block">👅 Vị Giác:</span>
                              <p className="text-gray-300">{currentScene.sensoryDetails.gustatory}</p>
                            </div>
                            <div className="p-2 rounded bg-black/40 border border-white/5 space-y-0.5">
                              <span className="text-emerald-300 font-bold block">✋ Xúc Giác:</span>
                              <p className="text-gray-300">{currentScene.sensoryDetails.tactile}</p>
                            </div>
                          </div>
                        </div>

                        {/* Master Prose Excerpt */}
                        <div className="p-4 rounded-xl bg-black/70 border border-pink-500/30 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                              <span>📖</span> Trích Đoạn Văn Mẫu Tuyệt Tác:
                            </span>
                            <span className="text-[10px] text-gray-400">Có thể chèn trực tiếp vào chương đang viết</span>
                          </div>
                          <p className="text-xs text-gray-200 font-serif leading-relaxed whitespace-pre-line italic">
                            {currentScene.masterProseExcerpt}
                          </p>
                        </div>

                        {/* Interactive Custom Leisure Scene Mixer */}
                        <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-gray-900 to-pink-950/40 border border-pink-500/40 space-y-3">
                          <div className="flex items-center justify-between border-b border-pink-500/20 pb-2">
                            <span className="text-xs font-black text-pink-200 flex items-center gap-1.5">
                              <span>✨</span> TRÌNH HÒA TẤU TIÊU DAO: TÙY BIẾN CHO NHÂN VẬT CỦA BẠN
                            </span>
                            <span className="text-[10px] text-gray-400">Ghép nhân vật & tạo ngay phân cảnh giang hồ</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                            <div>
                              <label className="text-[11px] font-bold text-gray-300 block mb-1">Anh Hùng / Nhân Vật:</label>
                              <input
                                type="text"
                                value={poeticCustomHero}
                                onChange={e => setPoeticCustomHero(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-200 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-pink-300 block mb-1">Mỹ Nhân / Tri Kỷ:</label>
                              <input
                                type="text"
                                value={poeticCustomBeauty}
                                onChange={e => setPoeticCustomBeauty(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-xs text-pink-200 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-amber-300 block mb-1">Rượu Quý Cạn Chén:</label>
                              <input
                                type="text"
                                value={poeticCustomWine}
                                onChange={e => setPoeticCustomWine(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-xs text-amber-200 outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-indigo-300 block mb-1">Nhạc Cụ Hòa Tấu:</label>
                              <input
                                type="text"
                                value={poeticCustomInstrument}
                                onChange={e => setPoeticCustomInstrument(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-gray-900 border border-gray-700 rounded-lg text-xs text-indigo-200 outline-none"
                              />
                            </div>
                          </div>

                          <button
                            onClick={handleGenerateCustomPoeticScene}
                            disabled={isGeneratingPoeticDraft}
                            className="w-full py-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-950 transition flex items-center justify-center gap-1.5"
                          >
                            <span>🌸</span> Khởi Tạo Phân Cảnh Tiêu Dao Tùy Biến
                          </button>

                          {poeticGeneratedDraft && (
                            <div className="p-3.5 rounded-xl bg-black/80 border border-pink-400/50 space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-pink-300 font-bold">📖 Đoạn Văn Đã Tùy Biến Theo Nhân Vật:</span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(poeticGeneratedDraft);
                                      showToast('📋 Đã sao chép!');
                                    }}
                                    className="px-2 py-1 bg-gray-800 text-gray-200 rounded text-[11px]"
                                  >
                                    📋 Sao chép
                                  </button>
                                  {onInsertText && (
                                    <button
                                      onClick={() => {
                                        onInsertText(`\n\n${poeticGeneratedDraft}\n\n`);
                                        showToast('✍️ Đã chèn vào chương!');
                                      }}
                                      className="px-2.5 py-1 bg-pink-600 text-white font-bold rounded text-[11px]"
                                    >
                                      ✍️ Chèn vào chương
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-200 font-serif leading-relaxed whitespace-pre-line italic">
                                {poeticGeneratedDraft}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB: DISASTER & RUINS SCENERY BIBLE ================= */}
        {activeTab === 'disasterRuins' && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-stone-950/80 to-orange-950/60 border border-red-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔥</span>
                    <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-orange-200 to-amber-200 tracking-wide uppercase">
                      Bảo Điển Miêu Tả: Thiên Tai, Chiến Tàn & Phế Tích Đổ Nát
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 border border-red-500/50 text-red-300">
                      Văn Phong Tác Gia
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 max-w-3xl leading-relaxed">
                    Hệ thống miêu tả cảnh tượng hoang tàn sau đại chiến đao kiếm, làng mạc gặp thiên tai hạn hán nứt nẻ, ngập lụt hồng thủy cuốn trôi, cùng thành trì tráng lệ sụp đổ vỡ trận pháp và biển lửa cháy nổ kinh hoàng. Hỗ trợ sao chép văn mẫu 1-chạm hoặc ghép nhân vật vào bối cảnh thê lương để khắc họa đạo tâm chấn động.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-red-500/30 text-right">
                    <div className="text-[10px] text-stone-400 uppercase tracking-wider">Tổng Số Phân Cảnh</div>
                    <div className="text-base font-black text-red-400">{disasterScenes.length} Đại Kỳ Cảnh</div>
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="mt-4 pt-3 border-t border-red-500/20 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-stone-400 mr-1 flex items-center gap-1">
                  <span>⚡</span> Phân Loại:
                </span>
                <button
                  onClick={() => setSelectedDisasterCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedDisasterCategory === 'all'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/50 scale-105'
                      : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-700/50'
                  }`}
                >
                  <span>🌐</span> Tất Cả ({disasterScenes.length})
                </button>
                {Object.entries(DISASTER_RUINS_CATEGORIES_META).map(([catKey, meta]) => {
                  const count = disasterScenes.filter(s => s.category === catKey).length;
                  const isSelected = selectedDisasterCategory === catKey;
                  return (
                    <button
                      key={catKey}
                      onClick={() => setSelectedDisasterCategory(catKey)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? `${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText} shadow-md scale-105 ring-1 ring-red-400/50`
                          : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 border-stone-800'
                      }`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-stone-300">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main 2-Column Split */}
            {(() => {
              const filteredList = filterDisasterRuinsScenes(selectedDisasterCategory, searchQuery);
              const currentScene = disasterScenes.find(s => s.id === selectedDisasterSceneId) || filteredList[0] || disasterScenes[0];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Left Column: Scene Selector Cards */}
                  <div className="lg:col-span-4 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-stone-400 px-1 font-bold">
                      <span>DANH SÁCH PHÂN CẢNH ({filteredList.length})</span>
                      <span className="text-[11px] text-stone-500">Nhấp để xem chi tiết</span>
                    </div>

                    <div className="space-y-2 max-h-[750px] overflow-y-auto custom-scrollbar pr-1">
                      {filteredList.length === 0 ? (
                        <div className="p-8 text-center bg-stone-950/60 rounded-xl border border-stone-800 text-stone-500 text-xs">
                          Không tìm thấy phân cảnh phù hợp với từ khóa & bộ lọc.
                        </div>
                      ) : (
                        filteredList.map(scene => {
                          const isSelected = scene.id === currentScene?.id;
                          return (
                            <div
                              key={scene.id}
                              onClick={() => {
                                setSelectedDisasterSceneId(scene.id);
                                if (scene.category === 'TRUONG_SINH_HOI_SINH') {
                                  setDisasterViewMode('revival');
                                }
                              }}
                              className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                                isSelected
                                  ? `${scene.categoryBadgeBg} ${scene.categoryBadgeBorder} ring-1 ring-red-500/50 shadow-lg shadow-black/60`
                                  : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900/60'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${scene.categoryBadgeBg} ${scene.categoryBadgeBorder} ${scene.categoryBadgeText}`}>
                                  <span>{scene.categoryIcon}</span>
                                  <span>{scene.categoryLabel}</span>
                                </span>
                                <span className="text-[10px] text-stone-500 truncate max-w-[120px]">
                                  {scene.realmOrRegion.split('•')[0]}
                                </span>
                              </div>

                              <h4 className={`text-xs font-bold leading-snug line-clamp-2 mb-1 ${
                                isSelected ? 'text-white' : 'text-stone-200 group-hover:text-red-300'
                              }`}>
                                {scene.title}
                              </h4>

                              <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                                {scene.sceneryDescription}
                              </p>

                              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-stone-500">
                                <span className="truncate max-w-[160px] text-stone-400 font-mono">📍 {scene.locationName}</span>
                                <span className={`font-semibold ${isSelected ? 'text-red-400' : 'text-stone-500'}`}>
                                  {isSelected ? 'Đang chọn ▶' : 'Chi tiết →'}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Right Column: Detailed Scene Dossier */}
                  <div className="lg:col-span-8 space-y-4">
                    {currentScene ? (
                      <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800/80 space-y-5 shadow-2xl relative">
                        {/* Top Banner / Actions */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-stone-800">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`text-xs font-black px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 ${currentScene.categoryBadgeBg} ${currentScene.categoryBadgeBorder} ${currentScene.categoryBadgeText}`}>
                                <span>{currentScene.categoryIcon}</span>
                                <span>{currentScene.categoryLabel}</span>
                              </span>
                              <span className="text-xs text-stone-400">
                                📍 {currentScene.locationName} • <span className="text-stone-300">{currentScene.realmOrRegion}</span>
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-black text-red-200 tracking-wide mt-1">
                              {currentScene.title}
                            </h3>
                            <p className="text-xs text-stone-400 italic font-serif">
                              Bí danh / Biểu trưng: {currentScene.alias}
                            </p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(currentScene.readyToInsertProseSnippet);
                                showToast('📋 Đã sao chép đoạn văn mẫu!');
                              }}
                              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
                            >
                              <span>📋</span> Sao Chép Đoạn Mẫu
                            </button>
                            {onInsertText && (
                              <button
                                onClick={() => {
                                  onInsertText(`\n\n${currentScene.readyToInsertProseSnippet}\n\n`);
                                  showToast('✍️ Đã chèn vào chương truyện!');
                                }}
                                className="px-3.5 py-1.5 bg-red-700 hover:bg-red-600 text-white rounded-lg text-xs font-black transition flex items-center gap-1.5 shadow-md shadow-red-950"
                              >
                                <span>✍️</span> Chèn Vào Bản Thảo
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Mode Switcher: Calamity vs Longevity Seed Rebirth */}
                        <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-black/70 border border-stone-800">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setDisasterViewMode('calamity')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                                disasterViewMode === 'calamity'
                                  ? 'bg-red-900/80 border border-red-500 text-red-200 shadow-md shadow-red-950'
                                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                              }`}
                            >
                              <span>💀</span> Cảnh Hoang Tàn & Kiếp Nạn
                            </button>
                            <button
                              onClick={() => setDisasterViewMode('revival')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                                disasterViewMode === 'revival'
                                  ? 'bg-emerald-900/90 border border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-950 scale-105'
                                  : 'text-emerald-400/90 hover:text-emerald-200 hover:bg-emerald-950/40 border border-emerald-800/40'
                              }`}
                            >
                              <span className="animate-pulse">🌱</span> Hạt Trường Sinh Hồi Sinh & Nẩy Mầm
                            </button>
                          </div>
                          <span className="text-[11px] text-stone-400 font-serif italic pr-2">
                            {disasterViewMode === 'revival'
                              ? '✨ Đang xem thần tích mầm sống tái sinh vạn vật'
                              : '⚡ Đang xem thảm cảnh điêu tàn trước khi thần tích giáng thế'}
                          </span>
                        </div>

                        {/* ================= VIEW 1: LONGEVITY SEED REVIVAL VIEW ================= */}
                        {disasterViewMode === 'revival' && currentScene.longevitySeedRevival ? (
                          <div className="space-y-4">
                            {/* Rebirth Main Banner */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 via-teal-950/50 to-green-950/70 border border-emerald-500/40 space-y-2 shadow-lg shadow-emerald-950/40">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-500/20 pb-2">
                                <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                                  <span>🌱</span> THẦN TÍCH: HẠT CÂY TRƯỜNG SINH RƠI XUỐNG & NẨY MẦM
                                </span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-900/70 text-emerald-200 border border-emerald-500/30 font-mono">
                                  {currentScene.longevitySeedRevival.seedName}
                                </span>
                              </div>
                              <p className="text-xs text-emerald-100/90 font-serif leading-relaxed italic">
                                &ldquo;{currentScene.longevitySeedRevival.descentPhenomenon}&rdquo;
                              </p>
                              <div className="p-2.5 rounded-lg bg-black/60 border border-emerald-500/20 text-xs text-stone-300">
                                <strong className="text-emerald-300">Khoảnh khắc chạm đất:</strong> {currentScene.longevitySeedRevival.momentOfTouchingGround}
                              </div>
                            </div>

                            {/* Rooting & Canopy Bloom */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              {/* Rooting and Purification */}
                              <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 space-y-2">
                                <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5 border-b border-emerald-800/60 pb-1.5">
                                  <span>🌿</span> RỄ THẦN ĐAN CÀI & THANH TẨY SÁT KHÍ, HỎA ĐỘC
                                </div>
                                <p className="text-xs text-stone-300 leading-relaxed font-serif">
                                  {currentScene.longevitySeedRevival.rootingAndPurification}
                                </p>
                              </div>

                              {/* Sprouting and Canopy Bloom */}
                              <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 space-y-2">
                                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 border-b border-emerald-800/60 pb-1.5">
                                  <span>🌳</span> CHỒI NON VƯƠN CAO & TÁN CỔ MỘC NGÀN TRƯỢNG
                                </div>
                                <p className="text-xs text-stone-300 leading-relaxed font-serif">
                                  {currentScene.longevitySeedRevival.sproutingAndCanopyBloom}
                                </p>
                              </div>
                            </div>

                            {/* Mortal & Survivor Miracle */}
                            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-stone-950 to-teal-950/40 border border-emerald-500/30 space-y-2">
                              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                                <span>✨</span> KỲ TÍCH HỒI SINH BÁCH TÍNH & SINH LINH
                              </span>
                              <p className="text-xs text-stone-200 font-serif leading-relaxed italic">
                                {currentScene.longevitySeedRevival.mortalAndSurvivorMiracle}
                              </p>
                            </div>

                            {/* Sensory Details of Rebirth */}
                            <div className="p-3.5 rounded-xl bg-black/50 border border-emerald-500/20 space-y-2">
                              <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 border-b border-stone-800 pb-1.5">
                                <span>👁️</span> NGŨ GIÁC TÁI SINH (SẮC NGỌC BÍCH, TIÊN ÂM, HƯƠNG TRẦM, GIÓ ẤM)
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
                                <div className="p-2 rounded-lg bg-stone-900/70 border border-emerald-900/40 space-y-1">
                                  <span className="text-emerald-400 font-bold block">Thị Giác Hồi Sinh:</span>
                                  <p className="text-stone-300">{currentScene.longevitySeedRevival.revivedSensoryAtmosphere.visual}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-stone-900/70 border border-emerald-900/40 space-y-1">
                                  <span className="text-emerald-400 font-bold block">Thính Giác An Bình:</span>
                                  <p className="text-stone-300">{currentScene.longevitySeedRevival.revivedSensoryAtmosphere.auditory}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-stone-900/70 border border-emerald-900/40 space-y-1">
                                  <span className="text-emerald-400 font-bold block">Khứu Giác Thanh Khiết:</span>
                                  <p className="text-stone-300">{currentScene.longevitySeedRevival.revivedSensoryAtmosphere.olfactory}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-stone-900/70 border border-emerald-900/40 space-y-1">
                                  <span className="text-emerald-400 font-bold block">Xúc Giác Ấm Áp:</span>
                                  <p className="text-stone-300">{currentScene.longevitySeedRevival.revivedSensoryAtmosphere.tactile}</p>
                                </div>
                              </div>
                            </div>

                            {/* Master Revival Prose Excerpt */}
                            <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-950/60 via-stone-900/90 to-black border border-emerald-500/40 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-200 flex items-center gap-1.5">
                                  <span>📜</span> TRÍCH ĐOẠN VĂN PHONG TÁC GIA HỒI SINH MẪU MỰC
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(currentScene.longevitySeedRevival!.masterRevivalProseExcerpt);
                                    showToast('📋 Đã sao chép đoạn trích hồi sinh!');
                                  }}
                                  className="text-[11px] px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 rounded border border-emerald-500/40 transition"
                                >
                                  📋 Sao chép toàn đoạn
                                </button>
                              </div>
                              <div className="p-3.5 rounded-lg bg-black/80 border border-emerald-900/40 font-serif text-emerald-100 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line italic">
                                {currentScene.longevitySeedRevival.masterRevivalProseExcerpt}
                              </div>
                            </div>

                            {/* Ready-To-Insert Revival Snippet */}
                            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                                  <span>✍️</span> ĐOẠN VĂN HỒI SINH SẴN SÀNG CHÈN VÀO TRUYỆN
                                </span>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(currentScene.longevitySeedRevival!.readyToInsertRevivalSnippet);
                                      showToast('📋 Đã sao chép!');
                                    }}
                                    className="text-[11px] px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded transition"
                                  >
                                    Sao chép
                                  </button>
                                  {onInsertText && (
                                    <button
                                      onClick={() => {
                                        onInsertText(`\n\n${currentScene.longevitySeedRevival!.readyToInsertRevivalSnippet}\n\n`);
                                        showToast('✍️ Đã chèn vào chương!');
                                      }}
                                      className="text-[11px] px-2.5 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded transition shadow-md shadow-emerald-950"
                                    >
                                      Chèn vào truyện
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-stone-200 font-serif leading-relaxed italic bg-black/60 p-2.5 rounded border border-emerald-900/30">
                                &ldquo;{currentScene.longevitySeedRevival.readyToInsertRevivalSnippet}&rdquo;
                              </p>
                            </div>
                          </div>
                        ) : (
                          /* ================= VIEW 2: CALAMITY VIEW ================= */
                          <div className="space-y-4">
                            {/* General Description */}
                            <div className="p-3.5 rounded-xl bg-black/60 border border-stone-800/80 space-y-1.5">
                              <span className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                                <span>🗺️</span> Bức Tranh Toàn Cảnh Phế Tích:
                              </span>
                              <p className="text-xs text-stone-300 font-serif leading-relaxed italic">
                                {currentScene.sceneryDescription}
                              </p>
                            </div>

                            {/* Grid: Atmosphere & Destructive Scale */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              {/* Atmosphere & Residual Qi */}
                              <div className="p-3.5 rounded-xl bg-black/50 border border-stone-800/80 space-y-2">
                                <div className="text-xs font-bold text-red-400 flex items-center gap-1.5 border-b border-stone-800 pb-1.5">
                                  <span>🌌</span> THỜI KHẮC, THIÊN KHÍ & TÀN DƯ AURA
                                </div>
                                <div className="text-xs space-y-1.5 text-stone-300">
                                  <div><strong className="text-stone-400">Thời khắc:</strong> {currentScene.timeAndAtmosphere.timeOfDay}</div>
                                  <div><strong className="text-stone-400">Thiên tượng:</strong> {currentScene.timeAndAtmosphere.weatherAndSky}</div>
                                  <div><strong className="text-stone-400">Ánh sáng & Tầm nhìn:</strong> {currentScene.timeAndAtmosphere.lightingAndVisibility}</div>
                                  <div><strong className="text-stone-400">Tàn dư linh lực/sát khí:</strong> <span className="text-red-300 font-serif italic">{currentScene.timeAndAtmosphere.residualEnergyOrAura}</span></div>
                                </div>
                              </div>

                              {/* Destructive Scale */}
                              <div className="p-3.5 rounded-xl bg-black/50 border border-stone-800/80 space-y-2">
                                <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5 border-b border-stone-800 pb-1.5">
                                  <span>🏔️</span> QUY MÔ SỤP ĐỔ & ĐỐNG HOANG TÀN
                                </div>
                                <div className="text-xs space-y-1.5 text-stone-300">
                                  <div><strong className="text-stone-400">Gạch đá & Đổ nát:</strong> {currentScene.destructiveScale.rubbleAndRuins}</div>
                                  <div><strong className="text-stone-400">Công trình sụp đổ:</strong> {currentScene.destructiveScale.fallenLandmarks}</div>
                                  <div><strong className="text-stone-400">Vết tích tàn dư:</strong> {currentScene.destructiveScale.weaponsOrDebris}</div>
                                </div>
                              </div>
                            </div>

                            {/* Mortal Tragedy & Survivors Plight */}
                            <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 via-stone-950 to-stone-950 border border-red-500/30 space-y-2.5">
                              <div className="flex items-center justify-between border-b border-red-500/20 pb-1.5">
                                <span className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                                  <span>🩸</span> THẢM CẢNH BÁCH TÍNH & NỖI ĐAU SINH LINH
                                </span>
                                <span className="text-[10px] text-stone-400 italic">Khắc họa sự bất lực của phàm nhân trước tai kiếp</span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-stone-300">
                                <div className="p-2.5 rounded-lg bg-black/40 border border-stone-800/60 space-y-1">
                                  <span className="text-red-400 font-bold block text-[11px]">Sinh Tồn Tuyệt Vọng:</span>
                                  <p className="text-[11px] leading-relaxed">{currentScene.humanAndMortalTragedy.survivorsPlight}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-black/40 border border-stone-800/60 space-y-1">
                                  <span className="text-amber-400 font-bold block text-[11px]">Bóng Hình Còn Xót Lại:</span>
                                  <p className="text-[11px] leading-relaxed">{currentScene.humanAndMortalTragedy.silhouettesAndEchoes}</p>
                                </div>
                                <div className="p-2.5 rounded-lg bg-black/40 border border-stone-800/60 space-y-1">
                                  <span className="text-stone-300 font-bold block text-[11px]">Chi Tiết Xé Lòng (Điểm Nhấn):</span>
                                  <p className="text-[11px] text-red-200/90 font-serif italic leading-relaxed">{currentScene.humanAndMortalTragedy.poignantDetail}</p>
                                </div>
                              </div>
                            </div>

                            {/* Sensory Details: 5 Senses */}
                            <div className="p-3.5 rounded-xl bg-black/50 border border-stone-800/80 space-y-2">
                              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 border-b border-stone-800 pb-1.5">
                                <span>👁️</span> KHẢO SÁT NGŨ GIÁC (THỊ, THÍNH, KHỨU, XÚC & KHÍ THẾ TÂM LÝ)
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-[11px]">
                                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-800 space-y-1">
                                  <span className="text-stone-400 font-bold block">Thị Giác (Màu sắc):</span>
                                  <p className="text-stone-300">{currentScene.sensoryDetails.visual}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-800 space-y-1">
                                  <span className="text-stone-400 font-bold block">Thính Giác (Âm vang):</span>
                                  <p className="text-stone-300">{currentScene.sensoryDetails.auditory}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-800 space-y-1">
                                  <span className="text-stone-400 font-bold block">Khứu Giác (Mùi vị):</span>
                                  <p className="text-stone-300">{currentScene.sensoryDetails.olfactory}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-800 space-y-1">
                                  <span className="text-stone-400 font-bold block">Xúc Giác (Nhiệt độ):</span>
                                  <p className="text-stone-300">{currentScene.sensoryDetails.tactile}</p>
                                </div>
                                <div className="p-2 rounded-lg bg-stone-900/60 border border-stone-800 space-y-1 sm:col-span-2 lg:col-span-1">
                                  <span className="text-red-400 font-bold block">Tâm Cảnh U Ám:</span>
                                  <p className="text-red-200/90 font-serif italic">{currentScene.sensoryDetails.emotionalAtmosphere}</p>
                                </div>
                              </div>
                            </div>

                            {/* Master Prose Excerpt */}
                            <div className="p-4 rounded-xl bg-gradient-to-b from-stone-900/90 to-black border border-stone-700/80 space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                                  <span>📜</span> TRÍCH ĐOẠN VĂN PHONG TÁC GIA MẪU MỰC
                                </span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(currentScene.masterProseExcerpt);
                                    showToast('📋 Đã sao chép đoạn trích mẫu mực!');
                                  }}
                                  className="text-[11px] px-2.5 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded border border-stone-700 transition"
                                >
                                  📋 Sao chép toàn đoạn
                                </button>
                              </div>
                              <div className="p-3.5 rounded-lg bg-black/70 border border-stone-800 font-serif text-stone-200 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line italic">
                                {currentScene.masterProseExcerpt}
                              </div>
                            </div>

                            {/* Ready-To-Insert Prose Snippet */}
                            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                                  <span>✍️</span> ĐOẠN VĂN ĐIỂN HÌNH SẴN SÀNG CHÈN VÀO TRUYỆN
                                </span>
                                <div className="flex gap-1.5">
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(currentScene.readyToInsertProseSnippet);
                                      showToast('📋 Đã sao chép!');
                                    }}
                                    className="text-[11px] px-2 py-0.5 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded transition"
                                  >
                                    Sao chép
                                  </button>
                                  {onInsertText && (
                                    <button
                                      onClick={() => {
                                        onInsertText(`\n\n${currentScene.readyToInsertProseSnippet}\n\n`);
                                        showToast('✍️ Đã chèn vào chương!');
                                      }}
                                      className="text-[11px] px-2.5 py-0.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition"
                                    >
                                      Chèn vào truyện
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-stone-300 font-serif leading-relaxed italic bg-black/50 p-2.5 rounded border border-stone-800/80">
                                &ldquo;{currentScene.readyToInsertProseSnippet}&rdquo;
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Author Plot Hooks */}
                        <div className="p-3.5 rounded-xl bg-black/50 border border-stone-800 space-y-2">
                          <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                            <span>💡</span> GỢI Ý MẠCH TRUYỆN & TÌNH TIẾT DÀNH CHO TÁC GIẢ
                          </span>
                          <ul className="list-disc list-inside space-y-1 text-xs text-stone-300">
                            {currentScene.authorPlotHooks.map((hook, hIdx) => (
                              <li key={hIdx} className="leading-relaxed">
                                <span className="text-stone-200">{hook}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Dynamic Scene Generator by Character */}
                        <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-stone-950 to-orange-950/40 border border-red-500/40 space-y-3">
                          <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                            <span className="text-xs font-black text-red-300 flex items-center gap-1.5">
                              <span>🛠️</span> BỘ GHÉP PHÂN CẢNH KHẢO NGHIỆM ĐẠO TÂM NHÂN VẬT
                            </span>
                            <span className="text-[10px] text-stone-400">
                              Tự động lồng ghép nhân vật vào bối cảnh hoang tàn
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div>
                              <label className="text-[11px] font-bold text-stone-400 block mb-1">Nhân Vật Chính (Đạo tâm):</label>
                              <input
                                type="text"
                                value={disasterCustomHero}
                                onChange={e => setDisasterCustomHero(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-red-200 outline-none focus:border-red-500"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-stone-400 block mb-1">Đồng Đạo / Bạn Đồng Hành:</label>
                              <input
                                type="text"
                                value={disasterCustomCompanion}
                                onChange={e => setDisasterCustomCompanion(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-amber-200 outline-none focus:border-amber-500"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-stone-400 block mb-1">Kẻ Gây Họa / Căn Nguyên Thiên Tai:</label>
                              <input
                                type="text"
                                value={disasterCustomEnemyOrSource}
                                onChange={e => setDisasterCustomEnemyOrSource(e.target.value)}
                                className="w-full px-2.5 py-1.5 bg-stone-900 border border-stone-700 rounded-lg text-xs text-orange-200 outline-none focus:border-orange-500"
                              />
                            </div>
                          </div>

                          <button
                            onClick={handleGenerateCustomDisasterScene}
                            disabled={isGeneratingDisasterDraft}
                            className="w-full py-2 bg-gradient-to-r from-red-700 via-stone-800 to-orange-700 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg shadow-red-950 transition flex items-center justify-center gap-1.5"
                          >
                            <span>🔥</span> Khởi Tạo Phân Cảnh Hoang Tàn Tùy Biến
                          </button>

                          {disasterGeneratedDraft && (
                            <div className="p-3.5 rounded-xl bg-black/90 border border-red-500/50 space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="text-red-300 font-bold">📖 Đoạn Văn Đã Ghép Vào Bối Cảnh Của Nhân Vật:</span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(disasterGeneratedDraft);
                                      showToast('📋 Đã sao chép phân cảnh tùy biến!');
                                    }}
                                    className="px-2 py-1 bg-stone-800 text-stone-200 rounded text-[11px]"
                                  >
                                    📋 Sao chép
                                  </button>
                                  {onInsertText && (
                                    <button
                                      onClick={() => {
                                        onInsertText(`\n\n${disasterGeneratedDraft}\n\n`);
                                        showToast('✍️ Đã chèn vào chương!');
                                      }}
                                      className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded text-[11px]"
                                    >
                                      ✍️ Chèn vào chương
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-stone-200 font-serif leading-relaxed whitespace-pre-line italic">
                                {disasterGeneratedDraft}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB 4: EXPEDITION SIMULATOR ================= */}
        {activeTab === 'expedition' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-gray-950/90 border border-rose-500/30 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="text-2xl">⚔️</span>
                <div>
                  <h3 className="text-base font-bold text-rose-300">TRÌNH MÔ PHỎNG THÁM HIỂM BÍ CẢNH SINH TỬ</h3>
                  <p className="text-xs text-gray-400">Chọn nhân vật, bí cảnh mục tiêu và bảo vật hỗ trợ để AI sinh phân cảnh đại chiến đoạt cơ duyên</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Realm select */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Bí Cảnh Mục Tiêu:</label>
                  <select
                    value={selectedRealmForExpedition.id}
                    onChange={e => {
                      const found = secretRealms.find(r => r.id === e.target.value);
                      if (found) setSelectedRealmForExpedition(found);
                    }}
                    className="w-full px-3 py-2 bg-gray-900 border border-rose-500/40 rounded-lg text-xs text-rose-200 focus:outline-none"
                  >
                    {secretRealms.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.tier})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Character select */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Nhân Vật Thám Hiểm:</label>
                  <select
                    value={expeditionCharId}
                    onChange={e => setExpeditionCharId(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-rose-500/40 rounded-lg text-xs text-rose-200 focus:outline-none"
                  >
                    {characters.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.realm || 'Trúc Cơ Kỳ'}, Căn Cốt: {c.element || 'Ngũ Hành'})
                      </option>
                    ))}
                    {characters.length === 0 && <option value="">Nhân vật chính mặc định</option>}
                  </select>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Mục Tiêu Thám Hiểm:</label>
                  <input
                    type="text"
                    value={expeditionGoal}
                    onChange={e => setExpeditionGoal(e.target.value)}
                    placeholder="VD: Thu thập linh thảo luyện Trúc Cơ Đan, tìm kiếm tiên khí tàn khuyết..."
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Gears */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Pháp Bảo & Binh Khí Hỗ Trợ:</label>
                  <input
                    type="text"
                    value={expeditionGear}
                    onChange={e => setExpeditionGear(e.target.value)}
                    placeholder="VD: Bản Mệnh Phi Kiếm, Bát Quái Kính, Huyết Linh Phù..."
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <button
                onClick={handleRunExpedition}
                disabled={isSimulatingExpedition}
                className="w-full py-2.5 bg-gradient-to-r from-rose-700 via-pink-700 to-purple-700 hover:brightness-110 text-white font-black text-xs rounded-lg transition-all shadow-lg shadow-rose-950/60 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSimulatingExpedition ? (
                  <>
                    <span className="animate-spin">🌀</span> Đang mô phỏng diễn biến thám hiểm bí cảnh...
                  </>
                ) : (
                  <>
                    <span>⚡</span> BẮT ĐẦU MÔ PHỎNG THÁM HIỂM BÍ CẢNH
                  </>
                )}
              </button>
            </div>

            {/* Expedition Result Display */}
            {expeditionResult && (
              <div className="p-5 rounded-xl bg-gray-950 border border-rose-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <h4 className="text-base font-bold text-vip-gold">KẾT QUẢ THÁM HIỂM BÍ CẢNH</h4>
                  </div>
                  {onInsertText && expeditionResult.proseNarrative && (
                    <button
                      onClick={() => {
                        onInsertText(expeditionResult.proseNarrative || '');
                        showToast('Đã chèn toàn bộ đại cảnh thám hiểm vào chương truyện!');
                      }}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
                    >
                      <span>📜</span> Chèn Đoạn Văn Vào Truyện (500-800 Từ)
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-gray-400 font-bold">Vượt Qua Cạm Bẫy:</span>
                    <p className="text-gray-200 mt-1">{expeditionResult.trialOvercome}</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-emerald-400 font-bold">Bảo Vật Cướp Được:</span>
                    <p className="text-emerald-300 mt-1">{expeditionResult.treasureLooted}</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-amber-400 font-bold">Biến Cố Tu Vi:</span>
                    <p className="text-amber-300 mt-1">{expeditionResult.breakthroughOrInjury}</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-purple-400 font-bold">Gợi Ý Chương Tiếp:</span>
                    <p className="text-purple-300 mt-1">{expeditionResult.authorPlotHooks}</p>
                  </div>
                </div>

                {expeditionResult.proseNarrative && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-300">Văn Phong Tiểu Thuyết Đại Thần:</span>
                    <div className="p-4 bg-gray-900/80 rounded-xl border border-white/5 text-xs text-gray-200 leading-relaxed whitespace-pre-line font-serif">
                      {expeditionResult.proseNarrative}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: GROTTO CULTIVATION SIMULATOR ================= */}
        {activeTab === 'grottoSim' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-gray-950/90 border border-emerald-500/30 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="text-2xl">🧘</span>
                <div>
                  <h3 className="text-base font-bold text-emerald-300">TRÌNH MÔ PHỎNG BẾ QUAN ĐỘT PHÁ ĐỘNG PHỦ</h3>
                  <p className="text-xs text-gray-400">Chọn tu sĩ và động thiên, khai thác gia tốc thời gian và địa mạch linh khí để đột phá cảnh giới</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Grotto select */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Động Phủ Bế Quan:</label>
                  <select
                    value={selectedGrottoForSim.id}
                    onChange={e => {
                      const found = grottos.find(g => g.id === e.target.value);
                      if (found) setSelectedGrottoForSim(found);
                    }}
                    className="w-full px-3 py-2 bg-gray-900 border border-emerald-500/40 rounded-lg text-xs text-emerald-200 focus:outline-none"
                  >
                    {grottos.map(g => (
                      <option key={g.id} value={g.id}>
                        {g.name} ({g.tier} • Gia tốc: {g.timeDilationRate})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Character select */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Tu Sĩ Bế Quan:</label>
                  <select
                    value={grottoCharId}
                    onChange={e => setGrottoCharId(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-900 border border-emerald-500/40 rounded-lg text-xs text-emerald-200 focus:outline-none"
                  >
                    {characters.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.realm || 'Trúc Cơ Kỳ'})
                      </option>
                    ))}
                    {characters.length === 0 && <option value="">Nhân vật chính mặc định</option>}
                  </select>
                </div>

                {/* Years */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Thời Gian Bế Quan Trong Động:</label>
                  <input
                    type="text"
                    value={cultivationYears}
                    onChange={e => setCultivationYears(e.target.value)}
                    placeholder="VD: 3 năm, 10 năm, 49 ngày..."
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Pill or Treasure */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Đan Dược & Dị Bảo Phụ Trợ:</label>
                  <input
                    type="text"
                    value={cultivationPill}
                    onChange={e => setCultivationPill(e.target.value)}
                    placeholder="VD: Cửu Chuyển Hóa Anh Đan, Vạn Niên Băng Tinh..."
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                onClick={handleRunGrottoSim}
                disabled={isSimulatingGrotto}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-700 hover:brightness-110 text-white font-black text-xs rounded-lg transition-all shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSimulatingGrotto ? (
                  <>
                    <span className="animate-spin">🌀</span> Đang mô phỏng quá trình bế quan và xung kích bình cảnh...
                  </>
                ) : (
                  <>
                    <span>✨</span> BẮT ĐẦU MÔ PHỎNG BẾ QUAN ĐỘT PHÁ
                  </>
                )}
              </button>
            </div>

            {/* Grotto Sim Result Display */}
            {grottoSimResult && (
              <div className="p-5 rounded-xl bg-gray-950 border border-emerald-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    <h4 className="text-base font-bold text-vip-gold">KẾT QUẢ BẾ QUAN TU LUYỆN</h4>
                  </div>
                  {onInsertText && grottoSimResult.proseNarrative && (
                    <button
                      onClick={() => {
                        onInsertText(grottoSimResult.proseNarrative || '');
                        showToast('Đã chèn phân cảnh bế quan đột phá vào chương truyện!');
                      }}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center gap-1"
                    >
                      <span>📜</span> Chèn Đoạn Văn Vào Truyện (400-700 Từ)
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-emerald-400 font-bold">Cảnh Giới Mới Đạt:</span>
                    <p className="text-emerald-300 mt-1">{grottoSimResult.breakthroughStage}</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-gray-400 font-bold">Thời Gian Thực Bên Ngoài:</span>
                    <p className="text-cyan-300 mt-1">{grottoSimResult.externalTimeElapsed}</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-amber-400 font-bold">Cảm Ngộ Đại Đạo:</span>
                    <p className="text-amber-300 mt-1">{grottoSimResult.enlightenmentInsight}</p>
                  </div>
                  <div className="p-3 bg-gray-900 rounded-lg border border-white/5">
                    <span className="text-purple-400 font-bold">Dị Tượng Thiên Địa:</span>
                    <p className="text-purple-300 mt-1">{grottoSimResult.tribulationPhenomenon}</p>
                  </div>
                </div>

                {grottoSimResult.proseNarrative && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-300">Văn Phong Tiểu Thuyết Đột Phá:</span>
                    <div className="p-4 bg-gray-900/80 rounded-xl border border-white/5 text-xs text-gray-200 leading-relaxed whitespace-pre-line font-serif">
                      {grottoSimResult.proseNarrative}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: AI CREATOR ================= */}
        {activeTab === 'aiCreator' && (
          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-gray-950/90 border border-yellow-500/30 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="text-base font-bold text-yellow-300">AI THIẾT KẾ ĐỊA DANH, ĐỘNG PHỦ & BÍ CẢNH</h3>
                  <p className="text-xs text-gray-400">Tự động sinh trọn vẹn thông số worldbuilding và lore cổ xưa phù hợp tuyệt đối với tiểu thuyết của bạn</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Type select */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Loại Hình Kỳ Cảnh:</label>
                  <select
                    value={createType}
                    onChange={e => {
                      const t = e.target.value as any;
                      setCreateType(t);
                      if (t === 'location') setCreateTier('Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)');
                      if (t === 'grotto') setCreateTier('Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)');
                      if (t === 'secretRealm') setCreateTier('Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)');
                    }}
                    className="w-full px-3 py-2 bg-gray-900 border border-yellow-500/40 rounded-lg text-xs text-yellow-200 focus:outline-none"
                  >
                    <option value="location">🏔️ Địa Danh / Sơn Mạch / Cấm Sơn</option>
                    <option value="grotto">🏯 Động Phủ / Động Thiên Phúc Địa</option>
                    <option value="secretRealm">🌀 Bí Cảnh / Cấm Địa Thử Thách</option>
                  </select>
                </div>

                {/* Tier select */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Phẩm Cấp Kỳ Cảnh:</label>
                  {createType === 'location' ? (
                    <select
                      value={createTier}
                      onChange={e => setCreateTier(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-yellow-500/40 rounded-lg text-xs text-yellow-200 focus:outline-none"
                    >
                      <option value="Phàm Trần Kỳ Cảnh (Hồng Trần Khí Mỏng)">1. Phàm Trần (Nhất - Nhị Phẩm)</option>
                      <option value="Tu Chân Sơn Mạch & Linh Địa (Nhất - Tam Phẩm)">2. Tu Chân Sơn Mạch (Tam - Tứ Phẩm)</option>
                      <option value="Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)">3. Thánh Địa Tông Môn (Ngũ - Lục Phẩm)</option>
                      <option value="Vô Sinh Cấm Khu & Thâm Uyên Hung Địa (Thất - Cửu Phẩm)">4. Thượng Cổ Cấm Sơn (Thất - Bát Phẩm)</option>
                      <option value="Thái Cổ Thần Vực & Tiên Giới Di Lạc (Tiên Phẩm Vô Thượng)">5. Thái Cổ Thần Vực (Tiên Phẩm)</option>
                    </select>
                  ) : createType === 'grotto' ? (
                    <select
                      value={createTier}
                      onChange={e => setCreateTier(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-yellow-500/40 rounded-lg text-xs text-yellow-200 focus:outline-none"
                    >
                      <option value="Hạ Phẩm Thạch Động (Luyện Khí / Tán Tu)">1. Hạ Phẩm (Luyện Khí)</option>
                      <option value="Trung Phẩm Linh Động (Trúc Cơ / Nội Môn)">2. Trung Phẩm (Trúc Cơ)</option>
                      <option value="Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)">3. Thượng Phẩm (Kim Đan)</option>
                      <option value="Cực Phẩm Đạo Quân Động Thiên (Nguyên Anh / Hóa Thần)">4. Cực Phẩm (Nguyên Anh / Hóa Thần)</option>
                      <option value="Thái Cổ Tiên Phủ / Giới Tử Động Thiên (Luyện Hư / Hợp Thể / Đại Thừa)">5. Giới Tử Động Thiên (Đại Thừa)</option>
                      <option value="Hỗn Độn Thần Cung / Vạn Cổ Tiên Điện (Chân Tiên Cực Đạo)">6. Hỗn Độn Thần Cung (Chân Tiên)</option>
                    </select>
                  ) : (
                    <select
                      value={createTier}
                      onChange={e => setCreateTier(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900 border border-yellow-500/40 rounded-lg text-xs text-yellow-200 focus:outline-none"
                    >
                      <option value="Hạ Phẩm Thí Luyện Bí Cảnh (Trúc Cơ / Ngũ Hành)">1. Hạ Phẩm (Trúc Cơ)</option>
                      <option value="Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)">2. Trung Phẩm (Kim Đan)</option>
                      <option value="Thượng Phẩm Hư Không Mảnh Vỡ (Nguyên Anh / Hóa Thần)">3. Thượng Phẩm Hư Không (Hóa Thần)</option>
                      <option value="Tuyệt Thế Cổ Tiên Ma Chiến Trường (Luyện Hư / Hợp Thể)">4. Tiên Ma Chiến Trường (Hợp Thể)</option>
                      <option value="Thái Sơ Hỗn Độn Vực / Tiên Thiên Thần Vực (Đại Thừa / Chân Tiên)">5. Thái Sơ Hỗn Độn (Chân Tiên)</option>
                    </select>
                  )}
                </div>

                {/* Element / Category */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Nguyên Tố & Đạo Pháp Chủ Đạo:</label>
                  <input
                    type="text"
                    value={createElement}
                    onChange={e => setCreateElement(e.target.value)}
                    placeholder="VD: Cực Âm Băng Sát, Lôi Đình Cuồng Nộ, Ngũ Hành Dung Hợp..."
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-yellow-500"
                  />
                </div>

                {/* Context Idea */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">Ý Tưởng Cốt Truyện & Bối Cảnh Tác Giả:</label>
                  <input
                    type="text"
                    value={createContext}
                    onChange={e => setCreateContext(e.target.value)}
                    placeholder="VD: Nơi nhân vật chính trốn thoát kẻ thù, tìm được truyền thừa của Tiên Đế..."
                    className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <button
                onClick={handleCreateAI}
                disabled={isCreatingAI}
                className="w-full py-2.5 bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 hover:brightness-110 text-white font-black text-xs rounded-lg transition-all shadow-lg shadow-yellow-950/60 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCreatingAI ? (
                  <>
                    <span className="animate-spin">🌀</span> Đang vận dụng Thiên Đạo kiến tạo kỳ cảnh...
                  </>
                ) : (
                  <>
                    <span>✨</span> KHỞI TẠO BẰNG AI & LƯU VÀO KHO BÁCH KHOA
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
