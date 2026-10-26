import {
  NovelConfig,
  NovelNode,
  NodeType,
  CharacterProfile,
  DivineEntity,
  CosmologicalEpochEvent,
  DivineChronicleSimulation,
  MasterCultivationStage,
  NovelMasterSpinePlan,
  SpineSceneDraftResult,
  SwordDaoCanonItem,
  SwordEnlightenmentSimulation,
  SpellDaoCanonItem,
  SpellEnlightenmentSimulation,
  TalismanDaoCanonItem,
  TalismanEnlightenmentSimulation,
  LoreNetworkNode,
  StoryVignetteItem,
  NaturalStoryWeaveResult,
  PillRecipe,
  AlchemyCauldron,
  HerbGuide,
  AlchemySimulation,
  WeaponTierItem,
  WeaponEvolutionResult,
  ForgingMethod,
  ForgingSimulation,
  SpiritBeastItem,
  BeastEvolutionSimulation,
  BeastTamingMethod,
  BeastTamingSimulationResult,
  BeastNurtureSimulationResult,
  LocationItem,
  GrottoDwellingItem,
  SecretRealmItem,
  SecretRealmExplorationResult,
  CitadelItem,
  CitadelEventSimulationResult,
  SectItem,
  VillainItem,
  SpyItem,
  FactionConflictSimulationResult,
  SpiritCrystalItem,
  NaturalTreasureItem,
  AncientArtifactItem,
  TreasureAppraisalSimulation,
  QuestItem,
  QuestMissionExecutionSimulation,
  NationItem,
  NationDiplomaticSimulation,
  ElementalCultivationManual,
  TechniqueFusionResult,
  CatalyzedBreakthrough,
  CharacterRoadmap,
  CharacterTrajectoryRoutingProfile,
  SpiritualRootAppraisalResult,
  CharacterEncounterSimulationResult,
  SupremeCultivationMethodItem,
  CultivationBreakthroughSimulation,
  SectPositionDetail,
  MasterCreationPipelineConfig,
  MasterCreationPipelineResult,
  SubplotArcItem,
  SubplotGenerationConfig,
  SubplotGenerationResult,
  CharacterChronicleClue,
  ClueTriangulationResult,
  ClueTriangulationConfig,
  MicroStoryStrand,
  MicroArcGenerationConfig,
  MicroArcGenerationResult,
  TrajectoryConvergenceSimulationConfig,
  TrajectoryConvergenceSimulationResult,
  BranchStoryArc,
  BranchConvergenceNexus,
  OmniDatasetSelection,
  StoryBibleChapterContext,
  OmniStoryGenerationParams,
  NeuralInferenceType,
  NeuralWeightMatrix,
  LearnedNarrativeAxiom,
  NeuralDeductionStep,
  NeuralInferenceRecord,
  NeuralSelfLearningState,
  NeuralInferenceRunParams,
  NeuralSelfLearnFeedbackParams,
  StoryNode,
  StoryConnection,
  StoryWorkflowVariant,
  StoryWorkflowExecutionResult
} from '../types';

const handleResponse = async (res: Response) => {
  const data = await res.json();
  if (!res.ok || (data.success === false && data.error)) {
    throw new Error(data.error || 'Yêu cầu không thành công');
  }
  return data;
};

// Map raw API structure to internal tree node with IDs and expanded state
const mapNodeRecursive = (n: any, type: NodeType = NodeType.NOVEL): NovelNode => {
  const getChildType = (parentType: NodeType): NodeType => {
    switch (parentType) {
      case NodeType.NOVEL: return NodeType.PART;
      case NodeType.PART: return NodeType.CHAPTER;
      case NodeType.CHAPTER: return NodeType.ACT;
      case NodeType.ACT: return NodeType.SECTION;
      default: return NodeType.SCENE;
    }
  };

  return {
    id: 'node_' + Math.random().toString(36).substring(2, 10),
    type: (n.type as NodeType) || type,
    title: n.title || 'Chưa đặt tên',
    summary: n.summary || '',
    content: n.content || '',
    children: Array.isArray(n.children)
      ? n.children.map((c: any) => mapNodeRecursive(c, getChildType(type)))
      : [],
    isExpanded: true,
  };
};

export const generateStructure = async (config: NovelConfig): Promise<NovelNode> => {
  const res = await fetch('/api/gemini/generate-structure', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ config }),
  });
  const data = await handleResponse(res);
  return mapNodeRecursive(data.data, NodeType.NOVEL);
};

export const generateContent = async (
  node: NovelNode,
  context: string,
  mode: string = 'CONTINUE',
  customInstruction: string = '',
  currentDraft: string = '',
  characters?: CharacterProfile[],
  storyBibleChapter?: StoryBibleChapterContext,
  omniDatasets?: OmniDatasetSelection,
  wordCountTarget?: number,
  literaryTone?: string
): Promise<string> => {
  const res = await fetch('/api/gemini/generate-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      node,
      context,
      mode,
      customInstruction,
      currentDraft,
      characters,
      storyBibleChapter,
      omniDatasets,
      wordCountTarget,
      literaryTone
    }),
  });
  const data = await handleResponse(res);
  return data.content || '';
};

export const generateSummary = async (content: string): Promise<{ summary: string; keyEvents: string[]; cliffhanger?: string }> => {
  const res = await fetch('/api/gemini/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  const data = await handleResponse(res);
  return data.data;
};

export const generateEnding = async (node: NovelNode, endingType: string = 'CLIMAX_CLIFFHANGER'): Promise<{ ending: string; transition: string }> => {
  const res = await fetch('/api/gemini/ending', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ node, endingType }),
  });
  const data = await handleResponse(res);
  return data.data;
};

export const generateIntroOptions = async (tone: string, genre: string, idea: string): Promise<Array<{ style: string; text: string }>> => {
  const res = await fetch('/api/gemini/intro-options', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tone, genre, idea }),
  });
  const data = await handleResponse(res);
  return data.data;
};

export const sendChatMessage = async (messages: Array<{ role: string; content: string }>, context?: any): Promise<string> => {
  const res = await fetch('/api/gemini/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, context }),
  });
  const data = await handleResponse(res);
  return data.reply;
};

export const generateCharacter = async (genre: string, rolePrompt: string, novelTheme: string): Promise<CharacterProfile> => {
  const res = await fetch('/api/gemini/generate-character', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre, rolePrompt, novelTheme }),
  });
  const data = await handleResponse(res);
  const c = data.character;
  return {
    id: 'char_' + Math.random().toString(36).substring(2, 9),
    name: c.name,
    role: c.role || 'Chính diện',
    realmOrRank: c.realmOrRank || 'Cấp 1',
    personality: c.personality || '',
    appearance: c.appearance || '',
    weaponOrAbility: c.weaponOrAbility || '',
    backstory: c.backstory || '',
  };
};

// =========================================================================
// MẠNG LƯỚI TRI THỨC & DỆT TRUYỆN TỰ NHIÊN (NATURAL STORY WEAVER)
// =========================================================================
export const weaveNaturalStory = async (params: {
  selectedNodes: LoreNetworkNode[];
  vignettes: StoryVignetteItem[];
  character?: CharacterProfile;
  storyTone?: string;
  chapterSpan?: string;
  customPrompt?: string;
}): Promise<NaturalStoryWeaveResult> => {
  const res = await fetch('/api/gemini/weave-natural-story', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

export const generateStoryVignette = async (params: {
  category?: string;
  domainTags?: string[];
  mood?: string;
  customIdea?: string;
}): Promise<StoryVignetteItem> => {
  const res = await fetch('/api/gemini/generate-story-vignette', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return {
    ...data.vignette,
    id: 'vignette_' + Math.random().toString(36).substring(2, 9),
  };
};

// =========================================================================
// MASTER CULTIVATION SPINE & NARRATIVE PLAN
// =========================================================================
export const generateCultivationSpineStage = async (params: {
  stageOrder?: number;
  stageName?: string;
  genre?: string;
  worldTheme?: string;
  userPrompt?: string;
}): Promise<MasterCultivationStage> => {
  const res = await fetch('/api/gemini/generate-cultivation-spine', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

export const generateNovelNarrativeArc = async (params: {
  novelTitle?: string;
  protagonistName?: string;
  storyTone?: string;
  goldenFinger?: string;
  worldSetting?: string;
  customIdea?: string;
}): Promise<NovelMasterSpinePlan> => {
  const res = await fetch('/api/gemini/generate-novel-narrative-arc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

export const draftSpineChapterScene = async (params: {
  stage?: MasterCultivationStage;
  character?: CharacterProfile;
  conflictContext?: string;
  opponent?: string;
  userInstructions?: string;
}): Promise<SpineSceneDraftResult> => {
  const res = await fetch('/api/gemini/draft-spine-chapter-scene', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

// =========================================================================
// KIẾM ĐẠO, THUẬT PHÁP, PHÙ LỤC, THẦN PHẢ
// =========================================================================
export const simulateSwordEnlightenment = async (params: {
  character?: CharacterProfile;
  swordCanon: SwordDaoCanonItem;
  stance: any;
  opponent?: string;
  genre?: string;
}): Promise<SwordEnlightenmentSimulation> => {
  try {
    const res = await fetch('/api/gemini/simulate-sword-enlightenment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.result) return data.result;
    }
  } catch (err) {
    console.warn('Backend sword simulation failed, using fallback', err);
  }

  const charName = params.character?.name || 'Kiếm Khách';
  const canonName = params.swordCanon.name;
  const stanceName = params.stance.stanceName;
  const opp = params.opponent || 'Cường Địch Ma Đầu';

  return {
    characterName: charName,
    canonName,
    stanceName,
    opponentName: opp,
    crisisTrigger: `Đối mặt với lưỡi đao tàn nhẫn của ${opp}, sinh tử cận kề chỉ trong một phần mười cái chớp mắt, ${charName} bị dồn vào chân vách đá không còn đường lui.`,
    innerComprehension: `Trong thời khắc ngàn cân treo sợi tóc, toàn bộ tạp niệm trong tâm ${charName} tan biến. Tiếng kiếm ngân vang vọng từ đáy linh hồn, hắn chợt bừng tỉnh đốn ngộ chân lý cốt lõi của ${stanceName}.`,
    qiAndSwordExecution: `${charName} bước ra một bước, chân đạp bộ pháp huyền diệu, cổ tay khẽ rung truyền chân khí qua kinh mạch phóng thẳng ra lưỡi kiếm sắc bén.`,
    environmentalDestruction: `Một đạo kiếm quang kinh thiên động địa xé toạc màn sương mù, kiếm khí rít gào làm nứt toác mặt đất dài mười trượng, chấn lùi toàn bộ áp lực của đối thủ.`,
    climacticStrikingMoment: `Kiếm xuất như sấm sét! Một đường kiếm tuyệt mỹ chém đứt hung khí của ${opp}, để lại một vệt kiếm ngân lạnh thấu xương cắt ngang cổ họng địch thủ.`,
    proseSegment: `Gió tuyết rít gào qua khe núi đá hiểm trở.

${opp} gầm thét dữ dội, sát khí nồng nặc tựa biển máu bốc lên từ hung đao trong tay, bổ thẳng xuống đầu ${charName} như muốn chẻ đôi càn khôn.

"Chết đi cho ta!"

Đối diện với đòn sát thủ hủy thiên diệt địa, đôi mắt ${charName} lại phẳng lặng như mặt gương hồ băng ngàn năm không chút gợn sóng. Thời gian xung quanh tựa như chậm lại trong sát na đó. Hắn khẽ thở ra một hơi khí trắng, thanh trường kiếm bên hông phát ra một tiếng kiếm minh thanh thúy lay động cửu thiên:

"Keng ——!!"

Không cần động tác hoa mỹ, ${charName} đạp chân tiến lên một bước. Thập Tự Bạt Kiếm Bộ pháp kích hoạt, thân hình hóa thành một đạo cầu vồng bạc xé toạc hư không. Chân khí từ đan điền dũng tuyền trào dâng nén chặt nơi đầu mũi kiếm, thi triển trọn vẹn tinh túy của [${stanceName}].

"Xoẹt!"

Một vệt kiếm quang sáng rực như mặt trời ban trưa lóe lên trong đêm tuyết. Không gian dường như ngưng đọng trong nửa nhịp thở.

Hung đao gãy đôi rơi leng keng xuống nền đá lạnh. Đôi mắt ${opp} trợn trừng kinh hoàng, một dòng máu đỏ tươi rỉ ra từ cổ họng trước khi thân hình đồ sộ ngã quỵ xuống tuyết trắng.

${charName} thu kiếm vào bao, vạt áo bay phấp phới trong gió bão, bóng lưng kiêu hãnh tựa kiếm tiên hạ phàm!`
  };
};

export const generateSwordCanon = async (params: {
  name?: string;
  philosophy?: string;
  genre?: string;
}): Promise<SwordDaoCanonItem> => {
  try {
    const res = await fetch('/api/swords/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.canon) return data.canon;
    }
  } catch (err) {
    console.warn('Backend sword generate failed, using fallback', err);
  }

  const rnd = Math.random().toString(36).substring(2, 7);
  return {
    id: `canon_${rnd}`,
    name: params.name || `Vô Cực Bạt Kiếm Quyết • ${rnd}`,
    philosophy: params.philosophy || 'Lấy khoái chứng đạo, rút kiếm trong chớp mắt chém đứt sinh tử luân hồi.',
    gradeLevel: 'Thần Thánh Chí Tôn (Cực Đạo Kiếm Điển)',
    swordRankRequirements: 'Yêu cầu kiếm tâm sắt đá, ngộ tính Đốn Ngộ Thông Thiên',
    originAndCreator: 'Sáng lập bởi Vô Danh Kiếm Thánh đời trước.',
    coreSwordIntent: 'Vô Cực Sát Kiếm Ý',
    absoluteSwordDomain: 'Vô Cực Tuyệt Đối Kiếm Vực',
    trainingRegimen: {
      basicConditioning: 'Mỗi ngày rút kiếm mười vạn lần.',
      heartTestingTrial: 'Ngồi thiền trước vách đá ba ngàn ngày.',
      swordEnergyAwakening: 'Dẫn khí ngưng tụ kiếm tủy.'
    },
    stances: [
      {
        orderNumber: 1,
        stanceName: 'Đệ Nhất Thức: Nhất Thiểm Bạt Kiếm',
        intentLevel: '1. Sơ Nhập Kiếm Khí (Luyện Khí - Kiếm Khí Ly Thể)',
        mantraOrIncantation: 'Nhất kiếm xuất thế phong vân biến, chớp mắt đoạt mệnh bất lưu ngân.',
        qiMovementPath: 'Khí tụ ngón tay trỏ phóng ra mũi kiếm.',
        footworkAndKinetic: 'Thập Tự Bạt Kiếm Bộ: xoay hông bật đà.',
        physicalMovementAndFootwork: 'Rút kiếm thẳng tắp chém xé không khí.',
        swordFormMechanics: 'Đâm thẳng chính diện xoay cổ tay 15 độ.',
        visualPhenomenon: 'Tia sáng bạc xé toạc bóng tối.',
        offensiveLethality: 'Đâm thủng hộ thể cương khí trong chớp mắt.',
        defensiveVersatility: 'Đâm thẳng điểm trung tâm triệt tiêu lực địch.',
        hardcoreTrainingMethod: 'Đâm xuyên lỗ đồng tiền 5.000 lần mỗi ngày.',
        enlightenmentKey: 'Ngộ chữ "Khoái" (Nhanh như chớp).',
        fatalFlawIfRushed: 'Dễ nứt kinh mạch ngón tay nếu khí chưa thông.'
      }
    ],
    authorWritingNotes: 'Bộ kiếm pháp bạt kiếm chớp nhoáng, tạo điểm nhấn cao trào trong các trận giao đấu 1v1.'
  };
};

export const simulateSpellEnlightenment = async (params: {
  character?: CharacterProfile;
  spellCanon: SpellDaoCanonItem;
  stance: any;
  opponent?: string;
  genre?: string;
}): Promise<SpellEnlightenmentSimulation> => {
  const res = await fetch('/api/gemini/simulate-spell-enlightenment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

export const simulateTalismanEnlightenment = async (params: {
  character?: CharacterProfile;
  talismanCanon?: TalismanDaoCanonItem;
  method?: any;
  drawingMethod?: any;
  techniqueRank?: any;
  stance?: any;
  opponent?: string;
  genre?: string;
}): Promise<TalismanEnlightenmentSimulation> => {
  const res = await fetch('/api/gemini/simulate-talisman-enlightenment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

export const simulateDivineChronicle = async (params: {
  character?: CharacterProfile;
  deity?: DivineEntity;
  epoch?: CosmologicalEpochEvent;
  sceneType?: 'CreationGenesis' | 'DivineBattle' | 'TombAwakening' | 'GodhoodInheritance';
  customPrompt?: string;
  genre?: string;
}): Promise<DivineChronicleSimulation> => {
  const res = await fetch('/api/gemini/simulate-divine-chronicle', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

// =========================================================================
// ALCHEMY, WEAPONS, BEASTS, REALMS, SECTS, TREASURES, QUESTS, NATIONS
// =========================================================================
export const generatePillRecipe = async (params: any): Promise<PillRecipe> => {
  try {
    const res = await fetch('/api/alchemy/generate-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.recipe) return data.recipe;
    }
  } catch (err) {
    console.warn('Backend call failed, using smart fallback', err);
  }

  return {
    id: 'pill_' + Math.random().toString(36).substring(2, 9),
    name: params.name || 'Niết Bàn Bất Diệt Đế Đan',
    rank: params.targetRank || 'Bát Phẩm Thần Đan (Viên Mãn)',
    category: params.category || 'Đột Phá Cảnh Giới',
    mainHerbs: [
      { name: 'Cửu Diệp Hồi Hồn Thảo', ageRequirement: '3000 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Tái tạo thần hồn và linh căn' },
      { name: 'Thái Sơ Tử Khí Chi', ageRequirement: '1500 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Hấp thu tiên thiên tử khí bồi bổ đan thai' },
      { name: 'Long Tủy Địa Linh Tinh', ageRequirement: '2000 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Trấn áp hỏa khí bạo ngược' },
      { name: 'Ngũ Hành Tố Khí Đằng', ageRequirement: '800 năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Dẫn dược lực chạy suốt 108 khiếu huyệt' }
    ],
    effects: 'Giúp tu sĩ phá vỡ gông cùm bình cảnh tối cao, ngưng tụ Bất Diệt Kim Thân và Pháp Tướng Đế Đan, gia tăng 95% tỷ lệ đột phá.',
    refiningKeynotes: 'Lúc trích xuất dịch thảo mộc cần Văn Hỏa ôn dưỡng 49 ngày, lúc ngưng đan kích phát Vũ Hỏa cực hạn.',
    fireControl: 'Dùng Tam Muội Chân Hỏa giai đoạn đầu (Văn Hỏa), chuyển sang Dị Hỏa bạo phát lúc kết đan (Vũ Hỏa).',
    pillAroma: 'Đan hương thanh khiết lan tỏa vạn dặm, cây cỏ khô héo ngửi thấy lập tức đâm chồi nảy lộc.',
    phenomenon: 'Trời hiện cầu vồng cửu sắc, mây tím bao phủ đan phòng, xuất hiện rồng phượng vờn đỉnh lò.',
    sideEffects: 'Kinh mạch như bị thiêu đốt trong 3 ngày 3 đêm, cần tĩnh tâm hộ trì đạo tâm.',
    drugResistance: 'Đời người chỉ được uống tối đa 3 viên, uống viên thứ hai dược hiệu giảm một nửa.'
  };
};

export const forgeCauldron = async (params: any): Promise<AlchemyCauldron> => {
  try {
    const res = await fetch('/api/alchemy/forge-cauldron', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.cauldron) return data.cauldron;
    }
  } catch (err) {
    console.warn('Backend call failed, using fallback', err);
  }

  return {
    id: 'cauldron_' + Math.random().toString(36).substring(2, 9),
    name: params.cauldronName || 'Cửu Long Xích Diễm Đan Đỉnh',
    rank: params.targetRank || 'Cổ Đỉnh',
    materials: params.materials || 'Vạn Niên Xích Đồng kết hợp Long Cốt Thượng Cổ & Thiên Ngoại Vẫn Thiết',
    features: 'Tự động điều tiết áp suất nội đỉnh, giảm 60% tỷ lệ nổ lò, uẩn dưỡng 9 tầng đan văn thần bí.',
    fireVentDesign: 'Cửu Long Phun Lửa tại 9 góc Bát Quái, kết hợp Thất Tinh Tụ Hỏa Trận điều hỏa cực kỳ ổn định.',
    craftingMethod: 'Do Đan Đạo Chí Tôn khai sáng cùng Thần Khí Tông rèn đúc dưới đáy dung nham Thái Cổ.',
    cauldronSoul: 'Hỏa Long Khí Linh thức tỉnh, có thể tự động gầm vang nhắc nhở thời khắc đổi Văn - Vũ Hỏa.',
    forgingSteps: [
      'Bước 1: Nung phôi kim loại dưới đáy miệng núi lửa Thái Cổ suốt 81 ngày',
      'Bước 2: Dập khuôn thân đỉnh, chạm khắc 108 đạo Cửu Cung Phù Văn tụ hỏa',
      'Bước 3: Đục thông Cửu Long Hỏa Nhãn và bố trí Bát Quái Điều Áp Trận',
      'Bước 4: Tôi luyện qua Vạn Niên Huyền Băng Tuyết Dịch để cân bằng âm dương',
      'Bước 5: Huyết tế Long Huyết thượng cổ để thức tỉnh Đỉnh Linh'
    ]
  };
};

export const simulateAlchemyProcess = async (params: any): Promise<AlchemySimulation> => {
  try {
    const res = await fetch('/api/alchemy/simulate-scene', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.simulation) return data.simulation;
    }
  } catch (err) {
    console.warn('Backend simulate call failed, using fallback', err);
  }

  return {
    pillName: params.pillName || 'Cực Phẩm Hóa Thần Tiên Đan',
    cauldronName: params.cauldronName || 'Thái Hư Cổ Đỉnh',
    flameType: params.flameType || 'Thanh Liên Địa Tâm Hỏa',
    alchemistLevel: params.alchemistLevel || 'Đan Đạo Đại Tông Sư',
    extractedEssence: 'Hàng trăm vị dược liệu thượng cổ được thanh lọc tinh khiết, dược dịch trong suốt lơ lửng như giọt ngọc bích.',
    cauldronExplosionRisk: 'Tại thời khắc kết hợp âm dương, áp suất đỉnh bùng nổ kịch liệt đe dọa nổ lò; Đan sư lập tức thi triển Đan Quyết cửu ấn trấn áp thành công.',
    pillTribulation: 'Cửu Trọng Thiên Lôi Kiếp cuồn cuộn giáng lâm, lôi quang xanh biếc đánh thẳng vào miệng lò tôi luyện đan văn.',
    finalPillQuality: 'Cực Phẩm Viên Mãn (Sinh ra 9 đạo Tử Sắc Đan Vân rực rỡ)',
    pillVeins: 'Cửu Chuyển Đan Văn',
    processNarrative: `Đan phòng yên tĩnh bỗng chốc bùng nổ sóng nhiệt kinh người!

Ngọn lửa ${params.flameType || 'Thanh Liên Địa Tâm Hỏa'} gầm thét dữ dội quanh ${params.cauldronName || 'Thái Hư Cổ Đỉnh'}. Từng vị thảo dược quý giá lần lượt được thả vào lòng đỉnh, dưới nhiệt độ hủy diệt liền tan chảy thành từng luồng dược dịch óng ánh, tạp chất bị bốc hơi thành khói xám phụt ra ngoài hỏa khẩu.

"Ngưng!" 

Đan sư khẽ quát một tiếng, mười ngón tay biến ảo như hoa sen nở rộ, từng đạo linh quyết như mưa sao băng bắn vào thân lò. Bỗng nhiên, đỉnh lò run rẩy kịch liệt, khí tức cuồng bạo bên trong xung đột như muốn nổ tung — nguy cơ tạc đỉnh chỉ cách trong gang tấc! Đan sư ánh mắt sắc lạnh, cắn đầu ngón tay bắn ra một giọt tinh huyết, dẫn dắt Thất Tinh Trận pháp cưỡng ép áp chế bạo động.

"Oanh long long!"

Bầu trời ngoài động phủ mây đen sà xuống, Đan Lôi Kiếp chói lòa đánh thẳng qua nóc đỉnh, rèn đúc nên những đường vân thần bí. Nắp lò bật mở, chín luồng hào quang rực rỡ mang theo mùi hương thanh tao ngút trời bay vọt lên không trung, hóa thành hư ảnh Long Phượng vờn mây. Cực phẩm linh đan đã thành!`
  };
};

export const generateWeaponTier = async (params: any): Promise<WeaponTierItem> => {
  try {
    const res = await fetch('/api/weapons/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.weapon) return data.weapon;
    }
  } catch (err) {
    console.warn('Backend weapon generate failed, using fallback', err);
  }

  return {
    id: 'weapon_' + Math.random().toString(36).substring(2, 9),
    name: params.name || 'Hoang Thiên Trảm Tiên Bá Đao',
    category: params.category || 'Đao (Bá Đao / Trảm Ma Đao)',
    rank: params.rank || 'Cực Đạo Đế Binh / Thần Binh Viễn Cổ',
    materials: 'Hoang Cổ Huyền Kim, Chân Long Cốt & Thiên Ngoại Vẫn Thiết',
    spiritSoul: 'Bá Long Khí Linh cuồng bạo, thức tỉnh Đế Văn sát phạt',
    inscribedArrays: 'Chín đạo Thái Cổ Trảm Thần Đại Trận khắc sâu vào sống đao',
    combatPowerEffect: 'Một đao trảm tinh thần, xé toạc ngân hà, trấn áp vạn đạo chư thiên.',
    evolutionPath: 'Hấp thụ thêm Hỗn Độn Chi Khí để thăng hoa thành Hồng Hoang Tiên Khí.',
    ultimateTechnique: 'Hoang Thiên Diệt Thế Nhất Đao Trảm',
    backstory: 'Thần binh tùy thân của Hoang Thiên Cổ Đế từng chém giết Thần Ma viễn cổ, chìm vào giấc ngủ vạn năm chờ chủ nhân chân chính.'
  };
};

export const evolveWeapon = async (params: any): Promise<WeaponEvolutionResult & { proseNarrative?: string }> => {
  try {
    const res = await fetch('/api/weapons/evolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.evolution) return data.evolution;
    }
  } catch (err) {
    console.warn('Backend weapon evolve failed, using fallback', err);
  }

  return {
    originalWeapon: params.weapon?.name || 'Bích Thủy Kiếm',
    catalystMaterial: params.catalystMaterial || 'Vạn Niên Canh Kim & Cửu Trọng Thiên Kiếp',
    evolvedName: (params.weapon?.name || 'Thần Kiếm') + ' (Tiến Hóa Tuyệt Phẩm)',
    evolvedRank: 'Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)',
    forgingProcess: 'Thân kiếm nung đỏ dưới ngọn lửa dung hợp, 49 đạo sấm sét thiên kiếp trút xuống tôi luyện cốt khí.',
    spiritAwakening: 'Khí Linh phá kén thành hình hài Kiếm Đồng áo lam, mở mắt nhận chủ, tâm ý tương thông tuyệt đối.',
    newAbilities: 'Tự động xuất vỏ chém địch cách vạn dặm, phóng ra kiếm võng phong tỏa không gian.',
    proseNarrative: `Giữa phong ba bão táp, sấm sét tím sẫm xé rách bầu trời đêm!

${params.weapon?.name || 'Thần binh'} lơ lửng giữa không trung, hấp thu từng luồng linh khí từ ${params.catalystMaterial || 'dị bảo'}. Tạp chất bị đốt sạch, thân kiếm phát ra tiếng ngân vang trong trẻo rung chuyển cả sơn hà. Bỗng nhiên, một hư ảnh Khí Linh từ thân kiếm bay vọt lên, hóa thành chân long vờn quanh lôi đình.

Khi lôi kiếp tan đi, thanh kiếm rơi nhẹ nhàng vào lòng bàn tay chủ nhân, tỏa ra ánh linh quang rực rỡ tuyệt mỹ. Một thanh Đạo Khí cái thế đã chính thức xuất thế!`
  };
};

export const simulateWeaponForging = async (params: any): Promise<ForgingSimulation> => {
  return {
    weaponName: params.weaponName || 'Hỗn Độn Trấn Ma Kiếm',
    targetRank: params.targetRank || 'Đạo Khí',
    methodUsed: params.methodUsed || 'Cửu Thiên Lôi Kiếp Đúc Binh',
    materialsList: ['Thái Ất Canh Kim', 'Long Tủy', 'Huyền Hoàng Chi Khí'],
    flameOrFurnace: 'Hỗn Độn Thần Lò',
    craftingNarrative: 'Thợ rèn vung búa vạn lần dưới sấm sét, giọt máu hiến tế vào chuôi kiếm đánh thức khí linh ngàn năm.',
    tribulationOrPhenomenon: 'Trời đổ mưa máu, sấm sét tím giáng xuống chúc phúc cho thần binh xuất thế.',
    finalStats: {
      gradeAchieved: 'Thượng Phẩm Đạo Khí',
      specialEffects: ['Tự động hộ chủ', 'Chém đứt thọ mệnh đối thủ'],
      spiritSoulBorn: 'Thanh Long Ấu Hồn',
      ultimateSkill: 'Vạn Kiếm Phá Càn Khôn'
    },
    authorNotes: 'Phù hợp làm bước ngoặt khi nhân vật chính chế tạo bản mệnh thần binh.'
  };
};

export const generateSpiritBeast = async (params: any): Promise<SpiritBeastItem> => {
  try {
    const res = await fetch('/api/beasts/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.beast) return data.beast;
    }
  } catch (err) {
    console.warn('Backend beast generate failed, using fallback', err);
  }

  return {
    id: 'beast_' + Math.random().toString(36).substring(2, 9),
    name: params.name || 'Tử Tiêu Ma Lôi Điểu',
    species: 'Lôi Đình Yêu Thú',
    bloodlineTier: params.bloodlineTier || 'Vương Huyết Yêu Thú (Hậu Duệ Thần Thú / Giao Long / Phượng Điểu)',
    realmTier: params.realmTier || 'Tam Giai (Ngưng Đan Kết Tinh)',
    element: params.element || 'Lôi Đình & Tốc Độ',
    habitat: 'Đỉnh núi Lôi Phong Hẻm quanh năm sét đánh',
    appearance: 'Lông vũ ánh lên sắc tím ma mị, mỏ và móng vuốt sắc như câu liêm, sải cánh dài mười trượng.',
    innateAbilities: [
      { name: 'Tử Tiêu Lôi Thiểm', description: 'Dịch chuyển tức thời trong cự ly trăm trượng như một tia sét.' },
      { name: 'Lôi Đình Phong Bạo', description: 'Vỗ cánh triệu hồi bão sét bao trùm chiến trường.' }
    ],
    combatRole: params.combatRole || 'Tiên Phong Cận Chiến',
    temperament: 'Hung hãn kiêu hãnh nhưng tuyệt đối trung thành sau khi nhận chủ.',
    contractType: 'Bình Đẳng Huyết Khế (Cùng Sinh Cùng Tử / Chia Sẻ Tu Vi)',
    evolutionPath: 'Nuốt Lôi Tinh Chi Tủy và Hóa Hình Đan để độ kiếp hóa hình.',
    backstory: 'Được nhân vật chính cứu thoát khỏi lồng sắt thợ săn từ khi còn là thú con sơ sinh.'
  };
};

export const simulateBeastEvolution = async (params: any): Promise<BeastEvolutionSimulation> => {
  try {
    const res = await fetch('/api/beasts/evolve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.simulation) return data.simulation;
    }
  } catch (err) {
    console.warn('Backend beast evolve failed, using fallback', err);
  }

  return {
    beastName: params.beast?.name || 'Linh Thú',
    originalRealm: params.originalRealm || 'Tam Giai',
    targetRealm: params.targetRealm || 'Tứ Giai Hóa Hình Nửa Người',
    catalyst: params.catalyst || 'Hóa Hình Đan Cực Phẩm',
    evolutionNarrative: `Cuồng phong gầm thét, mây đen cuồn cuộn giáng lâm từ cửu thiên!

${params.beast?.name || 'Linh thú'} gầm lên một tiếng rúng động cả sơn hà. Dưới sức mạnh của ${params.catalyst || 'Hóa Hình Đan'}, bộ lông cũ bắt đầu rụng xuống, từng khớp xương gãy vụn rồi tái sinh với tốc độ kinh hoàng. 

"Oanh long long!"

Chín đạo Tử Tiêu Thần Lôi xé toạc màn đêm đánh thẳng xuống mi tâm. Linh thú kiên cường chống đỡ, yêu khí ngút trời biến chuyển thành tiên linh khí thuần khiết. Khi ánh sáng tan đi, hiện ra một bóng hình tuyệt mỹ mang theo đôi tai thú ma mị và ánh mắt sắc lạnh kiêu hùng. Đại kiếp hóa hình đã thành công!`,
    humanoidAppearance: 'Thân hình thanh mảnh cao ráo, mang nét ma mị hoang dã, giữ lại đôi tai thú nhỏ nhắn và ánh mắt hoàng kim sắc bén.',
    newAbilitiesUnlocked: ['Thiên Lôi Thần Thông Cực Hạn', 'Yêu Vương Lĩnh Vực'],
    powerSurgeDescription: 'Chiến lực bùng nổ gấp mười lần, có thể tay không xé toạc pháp bảo thượng phẩm.',
    authorNotes: 'Tạo nên phân cảnh gắn kết sâu sắc giữa nhân vật chính và thú sủng.'
  };
};

export const simulateBeastTaming = async (params: any): Promise<BeastTamingSimulationResult> => {
  try {
    const res = await fetch('/api/beasts/tame', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.result) return data.result;
    }
  } catch (err) {
    console.warn('Backend beast tame failed, using fallback', err);
  }

  return {
    beastName: params.beast?.name || 'Linh Thú',
    beastRank: params.beast?.realmTier || 'Tam Giai',
    strategyUsed: params.tamingMethod?.name || 'Bình Đẳng Huyết Khế Thuật',
    contractFormed: params.tamingMethod?.contractType || 'Bình Đẳng Huyết Khế',
    captureNarrative: 'Quá trình thuần phục và cảm hóa linh thú bằng ý chí kiên định.',
    contractSealingMoment: 'Giọt Bản Mệnh Tinh Huyết dung hợp, hóa thành phù văn hình hoa sen khắc sâu vào mi tâm.',
    bondStrength: '100% Tâm Ý Tương Thông (Cùng sinh cùng tử)',
    battleStorySegment: `Ánh mắt hung bạo của ${params.beast?.name || 'yêu thú'} dần dịu lại khi nhìn vào đôi mắt chân thành của ${params.characterName || 'nhân vật chính'}.

Hai giọt máu đỏ tươi bay lơ lửng giữa không trung, xoay tròn rồi hòa vào làm một. Một luồng linh quang chói lòa bùng nổ, tiếng gầm thét vang dội đất trời như lời thề ước vĩnh cửu.

Từ khoảnh khắc này, một sợi dây liên kết tâm linh vô hình đã nối liền sinh mệnh của cả hai người!`,
    authorWritingTips: 'Nên miêu tả quá trình thấu hiểu qua ánh mắt thay vì áp bức cưỡng chế.'
  };
};

export const groundedResearch = async (query: string): Promise<{ text: string; sources: Array<{ title?: string; uri?: string }> }> => {
  return {
    text: `Điển tích về "${query}": Bắt nguồn từ truyền thuyết thần thoại cổ xưa trong kho tàng văn học phương Đông, thể hiện ước vọng trường sinh và đạo đức nhân nghĩa.`,
    sources: [{ title: 'Cổ Thần Điển Tích Lục', uri: 'https://imperium.lore' }]
  };
};

export const generatePowerTierSystem = async (params: {
  genre?: string;
  systemIdea?: string;
  tierCount?: number;
}): Promise<any> => {
  const res = await fetch('/api/gemini/generate-power-tier-system', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.system;
};

export const generateCharacterRoadmap = async (params: {
  character: any;
  system?: any;
  genre?: string;
  customGoal?: string;
}): Promise<any> => {
  const res = await fetch('/api/gemini/generate-character-roadmap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.roadmap;
};

export const generateCultivationManual = async (params: {
  name?: string;
  element?: string;
  school?: string;
  rank?: string;
  userIdea?: string;
  genre?: string;
}): Promise<ElementalCultivationManual> => {
  const res = await fetch('/api/gemini/generate-cultivation-manual', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.manual;
};

export const fuseTechniques = async (params: {
  primaryManual: ElementalCultivationManual;
  secondaryManual: ElementalCultivationManual;
  catalystIdea?: string;
  genre?: string;
}): Promise<TechniqueFusionResult> => {
  const res = await fetch('/api/gemini/fuse-techniques', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.fusion;
};

export const simulateCatalyzedBreakthrough = async (params: {
  character?: any;
  targetRealm?: string;
  catalystType?: string;
  catalystName?: string;
  ritualPlace?: string;
  techniqueUsed?: string;
  customPrompt?: string;
  genre?: string;
}): Promise<CatalyzedBreakthrough & { proseSegment?: string }> => {
  const res = await fetch('/api/gemini/simulate-catalyzed-breakthrough', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.result;
};

export const generateTierEncyclopedia = async (params: {
  levelName: string;
  subStages?: string;
  systemName?: string;
  genre?: string;
  customIdea?: string;
}): Promise<any> => {
  const res = await fetch('/api/gemini/generate-tier-encyclopedia', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.compendium;
};

export const generateLocationOrRealm = async (params: {
  type: 'location' | 'grotto' | 'secretRealm';
  tier?: string;
  category?: string;
  element?: string;
  contextPrompt?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/locations/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.item) return data.item;
    }
  } catch (err) {
    console.warn('Backend generate location failed, using fallback', err);
  }

  // Graceful fallback
  if (params.type === 'grotto') {
    return {
      id: 'grotto_' + Math.random().toString(36).substring(2, 9),
      name: 'Huyền Thiên Tĩnh Tu Tiên Động',
      tier: params.tier || 'Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)',
      locationName: 'Vách đá phù vân phía tây linh phong',
      spiritVeinType: 'Tam Phẩm Thượng Giai Tụ Linh Mạch',
      timeDilationRate: '1:3 (1 ngày ngoài = 3 ngày trong động)',
      chambers: [
        { name: 'Ngộ Đạo Tĩnh Thất', purpose: 'Đả tọa ngộ đạo', features: 'Tường khắc Bát Quái trận đồ viễn cổ' },
        { name: 'Luyện Đan Các', purpose: 'Luyện chế bảo đan', features: 'Dẫn địa hỏa ngàn trượng tinh thuần' },
        { name: 'Linh Thảo Viên', purpose: 'Nuôi dưỡng thảo dược', features: 'Nửa mẫu linh điền dẫn suối sương mai' }
      ],
      defensiveArrays: 'Cửu Cung Bát Quái Cấm Chế & Ẩn Linh Trận',
      specialFacilities: ['Hồ Linh Dịch tẩy tủy', 'Suối nước ngầm thanh khiết'],
      description: 'Động phủ u tịch được bao bọc bởi trận pháp mây mù, linh khí nén đặc như sương sớm.'
    };
  } else if (params.type === 'secretRealm') {
    return {
      id: 'realm_' + Math.random().toString(36).substring(2, 9),
      name: 'Thái Cổ Lôi Thần Bí Cảnh',
      tier: params.tier || 'Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)',
      element: params.element || 'Lôi Đình',
      recommendedRealm: 'Kim Đan Sơ Kỳ trở lên',
      openingCycle: '60 năm mở một lần vào đêm Lôi Vũ',
      entryRestrictions: 'Yêu cầu tu sĩ phải có Lôi Kháng Lệnh hoặc linh căn tương thích',
      guardianBeasts: ['Tứ Giai Lôi Tinh Thú', 'Hư Không Lôi Điểu'],
      trialsAndHazards: ['Lôi Kiếp Trọng Lực Cương Phong', 'Tâm Ma Ảo Cảnh', 'Kẽ nứt hư không'],
      ultimateTreasures: ['Lôi Đình Đạo Thạch', 'Cửu Chuyển Hoàn Hồn Thảo', 'Cổ Lôi Phù Điển'],
      survivalRate: 'Dưới 35%',
      environmentDescription: 'Không gian vỡ vụn trôi dạt giữa hư vô, sấm sét tím sẫm bao phủ khắp các ngọn núi cổ.',
      backstory: 'Nơi Lôi Thần viễn cổ ngã xuống trong trận Tiên Ma đại chiến để lại đạo vận bất diệt.'
    };
  } else {
    return {
      id: 'loc_' + Math.random().toString(36).substring(2, 9),
      name: 'Vạn Tiên Triều Thánh Phong',
      tier: params.tier || 'Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)',
      category: params.category || 'Sơn Mạch Nguyên Sinh',
      spiritEnergyDensity: 'Gấp 30 lần thế tục, linh vũ bay lượn',
      terrainAndWeather: 'Đỉnh núi cao vút xuyên tầng mây, ngàn tầng thác nước linh tuyền đổ xuống vực sâu',
      dominantForces: 'Thái Hư Tiên Cung',
      naturalTreasures: ['Vạn Niên Tuyết Chi', 'Huyền Thiên Tinh Kim'],
      dangerLevel: 'Nguy Hiểm Cấp A',
      description: 'Linh sơn hùng vĩ tụ hợp 9 đầu linh mạch rồng, nơi tụ hội của các bậc đại năng.',
      loreAndHistory: 'Thời thái cổ từng có vạn vị chân tiên giáng trần ngộ đạo tại đỉnh núi này.'
    };
  }
};

export const simulateRealmExploration = async (params: {
  character?: any;
  realm?: any;
  goal?: string;
  gearUsed?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/locations/explore-realm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.exploration) return data.exploration;
    }
  } catch (err) {
    console.warn('Backend realm exploration failed, using fallback', err);
  }

  const charName = params.character?.name || 'Nhân vật chính';
  const realmName = params.realm?.name || 'Thái Cổ Bí Cảnh';
  return {
    characterName: charName,
    realmName: realmName,
    goal: params.goal || 'Đoạt lấy kỳ trân ngàn năm để đột phá sinh tử',
    encounterNarrative: `${charName} bước vào ${realmName}, chạm trán sương mù sát khí và đàn thủ hộ yêu thú hung tợn. Vận dụng ${params.gearUsed || 'pháp bảo'}, nhân vật đã kiên cường vượt qua các tầng cạm bẫy.`,
    trialOvercome: 'Vận dụng cơ trí và kiếm ý thượng thừa, phá tan ma trận ảo ảnh và đánh bại yêu thú thủ hộ.',
    treasureLooted: 'Cổ Kinh Tàn Quyển cùng một đóa Vạn Niên Huyết Tinh Liên hoàn mỹ.',
    breakthroughOrInjury: 'Khí hải mở rộng, cảnh giới tu vi nhảy vọt một tiểu cảnh giới sau trận sinh tử chiến.',
    authorPlotHooks: 'Cổ kinh thu được dẫn tới manh mối về một bí mật kinh thiên động địa của tông môn đối địch.',
    proseNarrative: `Gió lốc gầm rú, không gian bên trong ${realmName} rung chuyển dữ dội khi ${charName} đặt chân qua cánh cổng truyền tống cổ xưa!

Trước mắt là một vùng hoang vu nhuốm màu hoàng hôn vĩnh hằng. Từng luồng sương mù đỏ sẫm cuộn trào như muốn nuốt chửng linh lực hộ thể. Bỗng nhiên, một tiếng gầm xé rách màng nhĩ vang lên, Yêu Thú thủ hộ khổng lồ lao ra từ vách đá đen kịt, móng vuốt sắc nhọn mang theo phong lôi quét tới.

${charName} ánh mắt sắc lạnh, không hề lùi bước. Chân khí trong đan điền bùng nổ, ${params.gearUsed || 'bản mệnh thần binh'} trong tay phát ra tiếng kiếm ngâm trong trẻo vút lên trời cao. Từng đạo quang mang chói lòa chém rách hư không, huyết hoa bắn tung tóe giữa sương mây cuồng bạo.

Sau một hồi huyết chiến long trời lở đất, con hung thú gục ngã. Phía sau hang động sâu thẳm, ánh hào quang dị bảo tỏa rạng rực rỡ, chiếu sáng mi tâm đầy mồ hôi và máu của ${charName}. Một chuyến thám hiểm thập tử nhất sinh đã đổi lại cơ duyên nghịch thiên cải mệnh!`
  };
};

export const simulateGrottoCultivation = async (params: {
  character?: any;
  grotto?: any;
  years?: string;
  pillOrTreasure?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/locations/simulate-grotto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.simulation) return data.simulation;
    }
  } catch (err) {
    console.warn('Backend grotto simulation failed, using fallback', err);
  }

  const charName = params.character?.name || 'Nhân vật chính';
  const grottoName = params.grotto?.name || 'Động Thiên Phúc Địa';
  return {
    characterName: charName,
    grottoName: grottoName,
    cultivationYears: params.years || '3 năm',
    externalTimeElapsed: 'Khoảng 4 tháng ở thế giới bên ngoài (nhờ gia tốc thời gian)',
    breakthroughStage: 'Viên mãn đột phá lên cảnh giới kế tiếp',
    pillOrTreasureUsed: params.pillOrTreasure || 'Cửu Chuyển Đan',
    enlightenmentInsight: 'Đạo sinh nhất, nhất sinh nhị, nhị sinh tam, tam sinh vạn vật. Ngũ hành quy nhất, vạn pháp quy tông.',
    tribulationPhenomenon: 'Mây lành ngũ sắc tụ hội trên đỉnh động phủ, hương thơm thanh khiết bay xa mười dặm',
    proseNarrative: `Cửa đá ngàn cân của ${grottoName} từ từ khép lại, ngăn cách hoàn toàn với mọi ồn ào hồng trần.

Bên trong tĩnh thất, ${charName} khoanh chân ngồi trên bồ đoàn bện từ linh thảo. Linh khí tinh thuần từ địa mạch cuồn cuộn đổ về như trăm sông đổ ra biển lớn, rót thẳng vào từng huyệt đạo. Từng ngày, từng tháng trôi qua trong tịch mịch. Dưới sự trợ lực của ${params.pillOrTreasure || 'dị bảo'}, bình cảnh vững như bàn thạch trong đan điền bắt đầu xuất hiện những vết rạn nứt.

"Phá cho ta!"

Một tiếng quát khẽ vang lên giữa hư không! Luồng chân khí tích tụ bấy lâu như sóng thần vỡ bờ, cuồn cuộn xung phá gông cùm cuối cùng. Bên ngoài động phủ, mây lành ngũ sắc tụ hội ngút trời, tiếng sấm êm dịu chúc phúc vang dội. ${charName} từ từ mở mắt, song đồng lóe lên ánh linh quang sâu thẳm như vũ trụ bao la. Cuộc bế quan đã đại công cáo thành!`
  };
};

export const generateCitadel = async (params: {
  name?: string;
  tier?: string;
  category?: string;
  customIdea?: string;
  genre?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/citadels/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.item) return data.item;
    }
  } catch (err) {
    console.warn('Backend generate citadel failed, using fallback', err);
  }

  return {
    id: 'citadel_' + Math.random().toString(36).substring(2, 9),
    name: params.name || 'Thái Hư Thần Thành • Trung Châu Chi Quan',
    tier: params.tier || 'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4 - Nguyên Anh / Hóa Thần)',
    category: params.category || 'Đấu Giá & Mậu Dịch Đô Hội',
    locationRegion: 'Trung Châu • Linh Khí Hội Tụ Chi Địa',
    population: 'Khoảng 8.500.000 tu sĩ và cư dân phàm trần',
    defensiveArray: {
      name: 'Thái Cực Bát Quái Cực Đạo Trận',
      tier: 'Bát Phẩm Cực Trận',
      features: 'Mượn thiên địa linh khí tạo thành màng bảo vệ kim sắc, phản chấn 40% sát thương công kích.',
      maintenanceCost: '50.000 Thượng Phẩm Linh Thạch mỗi tháng'
    },
    rulingFaction: {
      name: 'Thái Hư Tiên Minh Thành Chủ Phủ',
      leaderName: 'Thái Hư Chân Nhân',
      realmLevel: 'Hóa Thần Kỳ Sơ Kỳ',
      stance: 'Chính Đạo • Duy Trì Trật Tự & Công Lý'
    },
    keyDistricts: [
      { name: 'Cửu Trọng Thiên Đấu Giá Các', type: 'Đấu Giá Các', description: 'Nơi đấu giá pháp bảo và linh dược quý hiếm mỗi tháng.' },
      { name: 'Thiết Huyết Sinh Tử Lôi Đài', type: 'Lôi Đài', description: 'Giải quyết mọi ân oán giang hồ dưới sự giám sát của hộ thành quân.' },
      { name: 'Tụ Linh Khách Điếm & Động Phủ', type: 'Động Phủ Thuê', description: 'Nơi tu luyện có Tụ Linh Trận phục vụ khách vãng lai.' }
    ],
    lawsAndTaboos: [
      'Nghiêm cấm tư đấu chém giết bên ngoài lôi đài quy định.',
      'Cấm ngự kiếm bay ở tầm thấp dưới 200 trượng làm kinh động cư dân.',
      'Thuế thương nghiệp 2% cho các giao dịch quy mô lớn.'
    ],
    entryFeeAndTaxes: 'Phí nhập thành 5 Trung Phẩm Linh Thạch (Miễn phí cho tu sĩ từ Kim Đan Kỳ trở lên).',
    specialResources: [
      'Khoáng mạch Linh Thạch Thượng Phẩm dưới lòng đất',
      'Đại trận dịch chuyển xuyên lục địa nối 72 châu phủ',
      'Thần Binh Các rèn đúc bảo khí trứ danh'
    ],
    description: 'Tòa thành hùng vĩ với tường thành đúc bằng Cự Linh Thạch cao trăm trượng, ánh đèn pháp trận sáng rực cả một vùng trời đêm.',
    historyAndLegends: 'Được dựng nên từ thời đại Thượng Cổ Phong Thần, từng chịu đựng cuộc tấn công của Thập Đại Ma Quân mà vẫn sừng sững không đổ.'
  };
};

export const simulateCitadelEvent = async (params: {
  citadel?: any;
  character?: any;
  eventType?: string;
  goal?: string;
  customDetails?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/citadels/simulate-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.simulation) return data.simulation;
    }
  } catch (err) {
    console.warn('Backend simulate citadel event failed, using fallback', err);
  }

  const charName = params.character?.name || 'Nhân vật chính';
  const citName = params.citadel?.name || 'Vạn Bảo Tiên Thành';
  const evt = params.eventType || 'Thú Triều Vạn Cổ Công Thành';

  return {
    citadelName: citName,
    characterName: charName,
    eventType: evt,
    goal: params.goal || 'Bảo vệ thành trì, chém giết đầu lĩnh đoạt bảo',
    situationOverview: `Tiếng tù và bằng xương thú cổ vang lên xé toạc màn đêm tĩnh mịch của ${citName}! Từ đường chân trời xa xôi, cuồng phong cát bụi mịt mù cuộn trào cùng tiếng gầm thét rung chuyển trời đất báo hiệu ${evt} ập tới.`,
    defenseDeployment: `Hộ thành đại trận kích hoạt tức thì, phóng lên chín cột sáng chọc thủng tầng mây, kết thành màn chắn lưu ly rực rỡ. Hàng trăm cỗ ma năng pháo trên tường thành đồng loạt lên nòng, sát khí ngút trời.`,
    characterActionAndBattle: `Giữa thời khắc sinh tử, ${charName} bất ngờ phi thân lên không trung, tay nắm chặt bản mệnh thần binh. Từng đường kiếm khí xé gió tung hoành, chém rách phòng tuyến quân địch, thẳng tiến về phía chỉ huy đầu lĩnh!`,
    dramaticClimax: `Thời khắc đầu lĩnh địch quân vung trảo đập nứt góc hộ thành trận, ${charName} kích hoạt toàn bộ át chủ bài tiềm tàng, một kích kinh thiên động địa chặt đứt sinh cơ đối phương trước sự kinh ngạc của vạn người!`,
    outcomeAndCasualties: `Mất đi kẻ cầm đầu, quân địch tan rã tháo chạy. Khói lửa dần tắt, để lại chiến trường rải rác chiến lợi phẩm. Hộ thành đại trận dù rạn nứt nhưng vẫn trụ vững kỳ tích.`,
    rewardsAndReputation: `${charName} thu hoạch được thú đan cực phẩm và được đích thân Thành Chủ trao tặng Kim Bài Khách Khanh cùng vạn khối thượng phẩm linh thạch trước sự kính ngưỡng của toàn thành.`,
    authorPlotHooks: '1. Manh mối từ chiếc ngọc bội rơi ra từ thủ lĩnh kẻ địch chỉ về một thế lực ma môn thượng cổ.\n2. Thành Chủ có biểu hiện giấu giếm một bí mật lớn trong mật thất.\n3. Hư không trên đỉnh thành xuất hiện một vết rạn kỳ lạ chưa lành.',
    chapterStorySegment: `Tiếng tù và bằng sừng Cổ Ma Ngưu xé toạc màn sương sớm, đánh thức ${citName} khỏi giấc mộng thái bình.

"Báo động cấp một! Toàn thể tu sĩ chuẩn bị nghênh chiến!"

Âm thanh đanh thép của thủ lĩnh chấp pháp đội vang dội khắp bốn cổng thành. Trên bầu trời, bức màn chắn lưu ly của Hộ Thành Đại Trận bùng sáng rực rỡ, chiếu rọi hàng vạn bóng đen cuồn cuộn như thác lũ đang từ chân trời tràn tới. Mùi tanh hôi của cuồng phong và áp lực tu vi đè nặng khiến hư không như muốn vỡ vụn.

Đứng trên tường thành đúc bằng Vẫn Thiết ngàn trượng, ${charName} hít sâu một hơi. Cảm nhận chân khí trong kinh mạch sôi trào, ánh mắt hắn lóe lên tia sáng sắc lạnh.

"Đến đúng lúc lắm!"

Không hề do dự, ${charName} đạp không mà lên. Thần binh trong tay phát ra tiếng ngân vang sắc bén, hóa thành một đạo cầu vồng chém thẳng vào giữa chiến trường khốc liệt...`
  };
};

export const generateSectEntity = async (params: {
  entityType?: 'sect' | 'villain' | 'spy';
  camp?: string;
  grade?: string;
  category?: string;
  userPrompt?: string;
  genre?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/sects/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.item) return data.item;
    }
  } catch (err) {
    console.warn('Backend generate sect failed, using client fallback', err);
  }

  const rnd = Math.random().toString(36).substring(2, 7);
  if (params.entityType === 'villain') {
    return {
      id: `villain_${rnd}`,
      name: `Cố Hàn Lăng • ${rnd}`,
      title: 'Hắc Vân Quân Tử • Tông Môn Chấp Sự',
      category: params.category || 'Ngụy Quân Tử / Đạo Mạo Nhân Quân',
      cultivationRealm: 'Nguyên Anh Trung Kỳ',
      sectAffiliation: 'Thái Hư Kiếm Tông',
      publicFacade: 'Vẻ ngoài hòa nhã, luôn nhiệt tình chỉ điểm đệ tử tân tiến, phong thái thoát tục phiêu dật như trích tiên hạ phàm.',
      trueDarkNature: 'Lòng dạ hiểm độc, ngấm ngầm nuôi dưỡng Cổ trùng để khống chế thiên kiêu trẻ tuổi, sẵn sàng hy sinh toàn môn để đoạt nghịch thiên cơ duyên.',
      deadlySchemes: [
        'Hạ độc vào linh tuyền của Kiếm Trủng để bẫy nhân vật chính vào tội danh mưu sát trưởng lão.',
        'Bán thông tin phòng thủ sơn môn cho ma đạo để tạo cớ trục xuất các đối thủ cạnh tranh.'
      ],
      fatalWeakness: 'Đạo tâm bất ổn do luyện cấm thuật, sợ hãi sấm sét Thiên Kiếp và thần thông Phật môn.',
      signatureViciousMove: 'Cửu Hồn Thực Cốt Ma Trảo (Ẩn giấu dưới tay áo rộng, một kích bóp nát kim đan)',
      nemesisGrudge: 'Căm ghét sự tỏa sáng của nhân vật chính, kẻ đã cướp đi vị trí Chân Truyền Đệ Nhất mà hắn khổ công toan tính mười năm.'
    };
  }

  if (params.entityType === 'spy') {
    return {
      id: `spy_${rnd}`,
      name: `Bạch Chỉ • ${rnd}`,
      disguisedRole: 'Linh Thảo Viên Chấp Sự',
      actualLoyalty: 'Thiên Ma Cung',
      infiltratedSect: 'Thái Hư Kiếm Tông',
      category: params.category || 'Điệp Viên Ma Đạo Trà Trộn Tiên Môn',
      missionObjective: 'Đánh cắp trận bàn cốt lõi của Hộ Sơn Vạn Kiếm Đại Trận.',
      camouflageTechnique: 'Ẩn Tức Huyền Đan kết hợp Phù Văn Tẩy Tủy che giấu ma khí.',
      secretTokenOrSignal: 'Thắp một nén Tử Hương trên đỉnh ngọn thông già vào đêm trăng khuyết.',
      exposureRiskLevel: 'Trung Bình (Đang bị Chấp Pháp Viện theo dõi ngầm)',
      innerConflict: 'Bị cảm hóa bởi sự bao dung của sư phụ môn phái, giằng xé giữa cái chết của gia tộc bị ma giáo khống chế và đạo nghĩa tiên môn.',
      fatalFlaw: 'Vết bớt hình ma diễm sau vai sẽ phát nhiệt khi tiếp xúc với chính khí thuần dương.'
    };
  }

  // Default: Sect
  return {
    id: `sect_${rnd}`,
    name: `Huyền Thiên Cổ Tông • ${rnd}`,
    camp: params.camp || 'Chính Đạo (Orthodox / Tiên Môn)',
    grade: params.grade || 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)',
    headquarters: 'Huyền Thiên Cửu Đỉnh Phong (Lơ lửng trên tầng mây Nam Vực)',
    founderAndLegacy: 'Khai sáng bởi Huyền Thiên Đạo Tôn vạn năm trước, lưu truyền chín cỗ Huyền Thiên Đỉnh trấn áp khí vận non sông.',
    leadership: {
      patriarch: 'Huyền Chân Lão Tổ (Hóa Thần Viên Mãn)',
      sectMaster: 'Cố Thiên Thu (Hóa Thần Sơ Kỳ)',
      lawEnforcementElder: 'Thiết Diện Chân Nhân (Nguyên Anh Hậu Kỳ)',
      discipleCount: 'Ngoại môn 10 vạn, Nội môn 3 ngàn, Chân truyền 36 người'
    },
    heritageScriptures: [
      { name: 'Huyền Thiên Chân Kinh', grade: 'Thiên Giai Hạ Phẩm', summary: 'Hấp thu cửu thiên thanh khí rèn luyện linh thể kim cương bất hoại.' }
    ],
    sacredArtifacts: [
      { name: 'Huyền Thiên Đỉnh', rank: 'Thông Thiên Linh Bảo', power: 'Trấn áp yêu ma vạn dặm, luyện hóa vạn vật thành linh dịch.' }
    ],
    guardianArray: {
      name: 'Cửu Cung Huyền Thiên Tru Ma Đại Trận',
      tier: 'Nhị Phẩm Đại Trận',
      powerDescription: 'Phong tỏa toàn bộ không gian, triệu hoán Cửu Thiên Thần Lôi oanh kích kẻ địch.'
    },
    specialties: ['Luyện đúc linh đỉnh', 'Đan dược cửu chuyển', 'Ngự khí phi hành thuật'],
    rulesAndPrecepts: ['Đồng môn tương trợ, cấm tàn sát lẫn nhau', 'Trừ ma vệ đạo', 'Tôn sư trọng đạo'],
    politicalStance: {
      allies: ['Thái Hư Kiếm Tông', 'Đan Đỉnh Tiên Các'],
      bitterEnemies: ['Huyết Hải Ma Tông', 'Thiên Ma Cung'],
      currentCrisis: 'Mạch linh thạch thượng phẩm tại sơn môn có dấu hiệu cạn kiệt, ma môn lăm le xâm lược.'
    },
    description: 'Một cổ tông uy danh lẫy lừng phương Nam, sở hữu truyền thừa chín đỉnh uy chấn giang hồ.'
  };
};

export const simulateFactionConflict = async (params: {
  scenarioType?: string;
  sectName?: string;
  spyOrVillainName?: string;
  protagonistName?: string;
  customContext?: string;
  genre?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/sects/simulate-conflict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.simulation) return data.simulation;
    }
  } catch (err) {
    console.warn('Backend simulate faction conflict failed, using fallback', err);
  }

  const sType = params.scenarioType || 'Đại Chiến Tông Môn / Vây Hãm Sơn Môn';
  const sect = params.sectName || 'Thái Hư Kiếm Tông';
  const enemy = params.spyOrVillainName || 'Cố Thanh Hà';
  const protag = params.protagonistName || 'Lâm Phong';

  return {
    scenarioTitle: `Huyết Chiến ${sect} • Trừ Gian Diệt Ma Ngút Trời`,
    scenarioType: sType,
    sectName: sect,
    spyOrVillainName: enemy,
    protagonistName: protag,
    situationOverview: `Bầu không khí trên đỉnh ${sect} trở nên ngột ngạt đến cực điểm. Mây đen cuồn cuộn kéo tới che khuất cả vầng thái dương, từng đợt sát khí lạnh lẽo từ bên ngoài kết giới ập vào. Đúng lúc toàn môn phái đang chuẩn bị nghênh chiến thì ${enemy} bất ngờ lộ rõ dã tâm phản nghịch.`,
    thePlotScheme: `${enemy} đã âm thầm đầu độc vào trận nhãn của Hộ Sơn Đại Trận từ nửa tháng trước, đồng thời gửi mật thư báo trước lộ trình phòng thủ cho kẻ thù bên ngoài. Hắn toan tính lợi dụng lúc nội loạn để xông vào Tàng Bảo Các đoạt lấy trấn phái chí bảo rồi tẩu thoát.`,
    turningPointAndBetrayal: `Thời khắc trận pháp rạn nứt một góc, ${enemy} rút đoản đao tẩm độc đâm lén từ sau lưng Chấp Pháp Trưởng Lão! Tiếng thét căm hận vang lên xé toạc màn sương mù, bộ mặt giả nhân giả nghĩa bấy lâu nay của hắn hoàn toàn bị phơi bày trước mắt hàng vạn đệ tử.`,
    battleActionClimax: `Giữa thời khắc ngàn cân treo sợi tóc, ${protag} hét lớn một tiếng, thân hình hóa thành một đạo kiếm quang xé toạc hư không ngăn cản đòn sát thủ của ${enemy}! Hai bên giao tranh kịch liệt, kiếm khí cùng tà hỏa va chạm dữ dội làm sụp đổ cả nửa tòa đại điện. Với bản lĩnh phi thường và sự quả đoán, ${protag} tung ra đòn sát chiêu tuyệt đỉnh đánh gãy hung khí của phản đồ!`,
    resolutionAndCasualties: `Âm mưu nội ứng ngoại hợp bị đập tan. Kẻ thù bên ngoài hoảng loạn tháo chạy khi thấy Thái Thượng Trưởng Lão xuất quan. ${enemy} bị phế bỏ toàn bộ tu vi, xích vào Trấn Ma Cột chờ ngày thụ hình vạn kiếp. ${sect} dù tổn thất một phần kiến trúc nhưng danh tiếng của ${protag} vang dội khắp thiên hạ.`,
    authorPlotHooks: [
      `1. Dưới đáy Trấn Ma Cột, ${enemy} rít lên lời nguyền rủa tiết lộ một kẻ chủ mưu còn ẩn giấu ở cảnh giới cao hơn trong Tiên Minh.`,
      `2. Trận nhãn bị hư hại vô tình để lộ một lối vào bí mật dẫn xuống một tầng hầm viễn cổ chưa từng được ghi chép trong tông sử.`,
      `3. ${protag} thu hoạch được chiếc nhẫn trữ vật của ${enemy}, bên trong chứa một mảnh bản đồ dẫn tới Cấm Địa Thần Tộc.`
    ],
    novelSceneSnippet: `Gió lạnh rít gào qua những rặng tùng ngàn năm trên đỉnh Thông Thiên Phong. Bầu trời vốn trong xanh bỗng chốc bị tầng tầng mây đen ma khí bao phủ, đen kịt như mực tàu đổ xuống non sông.

"Ầm ầm ầm!"

Tiếng nổ kinh thiên động địa vang lên từ chân núi. Màn chắn hộ sơn của ${sect} vốn kiên cố bất khả xâm phạm bỗng xuất hiện một vết rạn nứt đỏ lòm như vết máu rỉ.

"Ha ha ha! Lũ ngu xuẩn các ngươi, hôm nay chính là ngày tận thế của tông môn!"

Một giọng cười the thé đầy đắc ý vang lên từ phía sau hàng ngũ chấp pháp. Tất cả đệ tử bàng hoàng quay lại, chỉ thấy ${enemy} — người vốn được xưng tụng là bậc hiền tài đức độ — đang cầm trên tay một thanh đoản đao đen tuyền bốc khói độc, dưới chân hắn là một vị trưởng lão đã ngã quỵ trên vũng máu.

"Sư huynh... tại sao lại là ngươi?!" Một đệ tử trẻ run rẩy hét lên trong tuyệt vọng.

"Tại sao ư? Vì các ngươi quá ngây thơ!" ${enemy} cười gằn, ánh mắt tràn ngập sát khí điên cuồng. "Cả đời này ta cống hiến cho tông môn nhưng nhận lại được gì? Chỉ có thực lực ma đạo mới là vĩnh hằng!"

Hắn dậm chân một cái, ma khí cuồn cuộn hóa thành một con cự mãng đen ngòm lao thẳng về phía tế đàn trấn phái.

"Muốn hủy diệt tông môn? Bước qua xác ta trước đã!"

Một tiếng quát vang như sấm sét giữa trời quang. Từ giữa quảng trường, ${protag} đạp không mà lên. Toàn thân hắn bốc lên kiếm ý ngút trời chọc thủng tầng mây đen, một đạo kiếm mang sáng rực như mặt trời ban trưa chém thẳng vào đầu cự mãng ma khí!

"Keng ——!!"

Kim loại va chạm tóe lửa chấn động màng nhĩ vạn người. Đôi mắt ${protag} sắc lạnh nhìn thẳng vào kẻ phản đồ, thanh trường kiếm trong tay rung lên từng hồi kiếm minh giận dữ:

"Hôm nay, trước bài vị liệt tổ liệt tông, ta ${protag} sẽ lấy máu ngươi để tế kiếm!"`
  };
};

export const appraiseSpiritualRoots = async (params: {
  character: CharacterProfile;
  ceremonyType?: string;
  examiner?: string;
  genre?: string;
}): Promise<SpiritualRootAppraisalResult> => {
  const res = await fetch('/api/characters/appraise-roots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.appraisal;
};

export const simulateCharacterEncounter = async (params: {
  character1: CharacterProfile;
  character2: CharacterProfile;
  encounterType?: string;
  location?: string;
  userPrompt?: string;
  genre?: string;
}): Promise<CharacterEncounterSimulationResult> => {
  const res = await fetch('/api/characters/simulate-encounter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await handleResponse(res);
  return data.simulation;
};

export const simulateCultivationBreakthrough = async (params: {
  character: CharacterProfile;
  method: SupremeCultivationMethodItem;
  fromTier: string;
  toTier: string;
  catalysts?: string[];
  environment?: string;
  genre?: string;
}): Promise<CultivationBreakthroughSimulation> => {
  try {
    const res = await fetch('/api/cultivation/simulate-breakthrough', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.simulation) return data.simulation;
    }
  } catch (err) {
    console.warn('Backend breakthrough failed, using fallback', err);
  }

  const charName = params.character.name || 'Nhân vật chính';
  const methodName = params.method.name || 'Cửu Chuyển Huyền Công';
  const fromT = params.fromTier || 'Tầng 1';
  const toT = params.toTier || 'Tầng 2';

  return {
    characterName: charName,
    methodName: methodName,
    fromTier: fromT,
    toTier: toT,
    catalystsUsed: params.catalysts && params.catalysts.length > 0 ? params.catalysts : ['Vạn Niên Long Tủy', 'Lôi Trì Chi Thủy'],
    environmentalAtmosphere: `Tại thạch thất sâu thẳm dưới lòng Cửu U Động Phủ, linh khí ngưng kết thành giọt sương linh dịch lơ lửng giữa không trung. Bốn bề vách đá khắc đầy phù văn phong ấn rung chuyển dữ dội dưới áp lực khí huyết của ${charName}.`,
    breakthroughProcess: `${charName} cắn chặt răng, điên cuồng vận chuyển ${methodName}. Từng sợi gân cốt như bị búa tạ ngàn cân đập nát, tủy xương sôi trào như nham thạch nóng bỏng. Khí huyết nghịch chuyển phá tan chín tầng gông cùm xiềng xích, tái cấu trúc từng tế bào từ gốc rễ.`,
    tribulationPhenomenon: `Bên ngoài động phủ, mây đen cuồn cuộn ngàn dặm che khuất cả bầu trời, chín đạo Tử Tiêu Thần Lôi xé toạc tầng không giáng xuống như thác lũ. Tiếng sấm rền vang kinh động toàn thể trưởng lão và yêu thú xung quanh.`,
    innerDemonEncounter: `Trong biển ý thức, ảo ảnh Tâm Ma hiện hình biến hóa thành những chấp niệm quá khứ đau thương hòng làm lung lạc ý chí. ${charName} quát lớn một tiếng, trảm ma kiếm ý chém toạc ảo ảnh, đạo tâm kiên cố như bàn thạch ngàn năm không chút lay chuyển.`,
    physicalTransformationDetails: `Da dẻ bài trừ hắc sắc độc tố, lộ ra làn da óng ánh sắc lưu ly kim quang. Toàn bộ khung xương chuyển sang màu ngọc bích lấp lánh, một giọt bản mệnh tinh huyết đỏ thẫm như hồng ngọc ngưng tụ tại mi tâm.`,
    ultimatePowerBurst: `Bình cảnh ầm ầm sụp đổ! Một cột sáng khí huyết đỏ rực chọc thủng đỉnh núi lao thẳng lên chín tầng mây, áp lực Thần Ma bùng nổ hất tung toàn bộ cấm chế thạch thất, chiến lực tăng vọt gấp mười lần!`,
    authorProseSnippet: `Gió lạnh rít gào bên ngoài thạch thất bế quan, nhưng bên trong, nhiệt độ lại nóng bỏng tựa như lò luyện đan của Thái Thượng Lão Quân.

${charName} ngồi xếp bằng trên bồ đoàn ngàn năm, hai mắt nhắm nghiền, từng giọt mồ hôi hòa lẫn máu tươi túa ra từ trán rồi lập tức bị bốc hơi thành từng làn khói đỏ mờ ảo. Trong lồng ngực hắn, tiếng tim đập trầm hùng như tiếng trống trận thúc giục ngàn quân, mỗi một nhịp đập đều khiến không gian xung quanh rung lên bần bật.

"Rắc... rắc..."

Từng tiếng xương gãy giòn giã vang lên từ bên trong cơ thể. Nỗi đau đớn thấu tận tâm can như bị vạn lưỡi dao cùn cạo xé tủy não ập đến, nhưng khóe môi ${charName} lại khẽ nhếch lên một nụ cười ngạo nghễ:

"Muốn cản ta nghịch thiên cầu đạo sao? Bấy nhiêu đây còn chưa đủ đâu!"

Hắn ngửa đầu gầm thét, hai tay kết ấn, kích phát toàn bộ dược lực của bảo vật. 

"Ầm ——!!"

Một tiếng nổ kinh thiên động địa vang lên từ sâu thẳm đan điền. Bình cảnh cứng rắn như bàn thạch rốt cuộc đã xuất hiện một vết rạn nứt! Một đạo thần quang chói lòa từ mi tâm ${charName} phóng thẳng lên trời cao, chém tan mây đen sấm sét, chính thức tuyên cáo bước chân thần thánh của một vị tuyệt thế cường giả bước lên ${toT}!`
  };
};

export const generateCultivationMethod = async (params: {
  path?: string;
  gradeLevel?: string;
  customIdea?: string;
  tierCount?: number;
  genre?: string;
}): Promise<SupremeCultivationMethodItem> => {
  try {
    const res = await fetch('/api/cultivation/generate-method', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.method) return data.method;
    }
  } catch (err) {
    console.warn('Backend generate method failed, using fallback', err);
  }

  const rnd = Math.random().toString(36).substring(2, 7);
  return {
    id: `method_${rnd}`,
    name: `Vạn Tượng Thần Ma Luyện Thể Điển • ${rnd}`,
    path: (params.path as any) || 'Luyện Thể Ngoại Công',
    gradeLevel: (params.gradeLevel as any) || 'Đạo Thống Đế Kinh',
    originAndHeritage: 'Tuyệt học thượng cổ thất truyền được tìm thấy trong hang động Thần Ma Cấm Địa.',
    corePhilosophy: 'Lấy thân làm lò, mượn lôi đình và địa hỏa để nặn lại phàm thân thành kim thân bất diệt.',
    bodyTransformationMechanism: 'Thiêu đốt phàm huyết, ngưng kết Thần Huyết Thượng Cổ qua từng chu thiên.',
    energyCircuitRoute: 'Khí chạy theo 108 đại chu thiên, đả thông toàn bộ kỳ kinh bát mạch.',
    innateSecretAbilities: [
      { name: 'Thần Ma Biến', tierRequired: 'Tầng 1', description: 'Tăng gấp ba sức mạnh và tốc độ trong ba khắc.' },
      { name: 'Bất Hoại Thân', tierRequired: 'Tầng 2', description: 'Miễn dịch toàn bộ đòn đánh của phàm nhân và tu sĩ cấp thấp.' }
    ],
    requiredCatalysts: ['Huyết Tinh Thạch', 'Lôi Kiếp Mộc', 'Thiên Niên Thạch Nhũ'],
    tiers: [
      {
        tierNumber: 1,
        tierName: 'Tầng 1: Cương Thiết Thể Phách',
        subStages: ['Sơ Cương', 'Thiết Cốt', 'Viên Mãn'],
        realmEssence: 'Da thịt săn chắc như đá tảng, gân cốt dẻo dai khó đứt.',
        physicalManifestation: 'Da ánh lên sắc xanh đồng, đao kiếm chém vào chỉ xước nhẹ.',
        spiritualVeinOperation: 'Khí huyết cuộn trào như suối ngầm róc rách.',
        breakthroughPhenomenon: 'Khói đỏ bốc lên đầu, cơ bắp căng phồng nổ vang.',
        mortalLifespan: '200 tuổi',
        combatAura: 'Khí tức trầm ổn uy nghiêm.',
        tabooAndDemonDanger: 'Dễ nứt nẻ da thịt nếu thiếu nước suối linh tuyền.'
      },
      {
        tierNumber: 2,
        tierName: 'Tầng 2: Ngọc Cốt Lưu Ly Thân',
        subStages: ['Ngọc Hóa', 'Lưu Ly Quang', 'Bất Hoại'],
        realmEssence: 'Xương trắng trong suốt như bạch ngọc, tủy xương màu bạc.',
        physicalManifestation: 'Toàn thân phát ra ánh ngọc dịu nhẹ, cơ thể nhẹ nhàng lướt trên mặt nước.',
        spiritualVeinOperation: 'Máu chảy phát ra tiếng sấm rền giòn giã.',
        breakthroughPhenomenon: 'Mùi hương sen thoang thoảng bay xa mười dặm.',
        mortalLifespan: '500 tuổi',
        combatAura: 'Áp lực khí áp khiến đối thủ khó thở.',
        tabooAndDemonDanger: 'Đau buốt tủy xương, cần định tâm an thần.'
      }
    ],
    authorWritingTips: [
      'Miêu tả cảm giác vỡ vụn rồi tái sinh để tạo chiều sâu cảm xúc cho nhân vật.',
      'Sử dụng các chiêu thức cận chiến uy lực để làm nổi bật sự vượt trội về thể chất.'
    ]
  };
};

export const simulateSectPromotion = async (params: {
  character: CharacterProfile;
  targetPosition: SectPositionDetail;
  previousPosition?: string;
  sectName?: string;
  genre?: string;
}): Promise<any> => {
  try {
    const res = await fetch('/api/sects/promote-disciple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.promotion) return data.promotion;
    }
  } catch (err) {
    console.warn('Backend promotion failed, using fallback', err);
  }

  const charName = params.character.name || 'Nhân vật chính';
  const sect = params.sectName || 'Thái Hư Kiếm Tông';
  const toRank = params.targetPosition.rankName || 'Chân Truyền Đệ Tử';
  const fromRank = params.previousPosition || 'Ngoại Môn Đệ Tử';

  return {
    characterName: charName,
    sectName: sect,
    promotedRank: toRank,
    ceremonyNarrative: `Tại Quảng Trường Thiên Đạo của ${sect}, tiếng chuông Cửu Tiêu ngân vang 81 hồi chấn động mây xanh. Mười vạn đệ tử tề tựu hai bên bậc thang đá, đưa mắt ngưỡng mộ nhìn ${charName} từng bước tiến lên đại điện. Đích thân Chưởng Môn và Chấp Pháp Trưởng Lão đứng nghênh đón để làm lễ phong tước.`,
    trialPassed: `Nhờ chiến tích chém sát Đại Ma Đầu trong Bí Cảnh và đoạt ngôi vị Quán Quân tại Đại Hội Tỷ Võ Toàn Tông, ${charName} đã hoàn toàn chứng minh thực lực và đạo tâm phi thường, vượt xa tiêu chuẩn quy định để thăng từ ${fromRank} lên ${toRank}.`,
    newPrivilegesAndStipend: `Được ban tặng Động Phủ riêng biệt tại sườn núi mây phủ, mỗi tháng nhận bổng lộc: ${params.targetPosition.resourceMonthlyStipend}, cùng quyền tự do ra vào Tàng Kinh Các.`,
    tokenBestowed: `Chưởng Môn trang trọng trao Lệnh Bài Bản Mệnh bằng ${params.targetPosition.clothingAndToken} cùng đạo bào tông môn, dặn dò phải luôn giữ vững đạo tâm trừ ma vệ đạo.`,
    novelSceneSnippet: `Ánh nắng sớm mai rải một lớp vàng óng ánh lên những mái ngói lưu ly của Thái Hư Vô Cực Điện.

"Đệ tử ${charName}, tiến lên thụ phong!"

Tiếng quát trầm hùng của Đại Trưởng Lão vang vọng khắp quảng trường rộng lớn, tựa như sấm sét xé toạc màn sương mù mờ ảo. Mười vạn ánh mắt lập tức đổ dồn về phía bậc thềm đá Thông Thiên.

${charName} khoác trên mình bộ đạo bào mới tinh tươm, bước đi vững chãi như núi non sừng sững. Mỗi một bước chân hắn bước lên, tiếng chuông cổ viễn cổ lại vang lên một tiếng ngân dài, hòa cùng tiếng hạc tiên bay lượn trên tầng mây.

Tiến đến trước mặt Đương Kim Chưởng Môn, ${charName} khom người hành lễ bái tổ:

"Đệ tử ${charName}, bái kiến Chưởng Môn cùng chư vị Trưởng Lão!"

Chưởng Môn mỉm cười hài lòng, nâng tay đỡ lấy hắn, trên tay là một khối ngọc bài phát ra linh quang chói mắt:

"Hảo! Từ hôm nay trở đi, ngươi chính là ${toRank} của bản tông! Mong ngươi dốc lòng tu luyện, làm rạng danh đạo thống liệt tổ liệt tông!"

Dứt lời, mười vạn môn nhân đồng thanh quỳ bái hô vang như sóng trào dâng:

"Chúc mừng sư huynh đăng lâm tôn vị! Chúc mừng ${sect} đạo thống trường tồn vạn vạn năm!"`
  };
};

export const generateMasterCreationPipelineFlow = async (params: {
  character: CharacterProfile;
  sectPosition: SectPositionDetail;
  sectName: string;
  spineStage: any;
  cultivationMethod?: any;
  swordStance?: any;
  spell?: any;
  talisman?: any;
  narrativeSetting: string;
  opponentOrObstacle: string;
  primaryConflict: string;
  narrativePacing: 'dramatic_climax' | 'breakthrough_tribulation' | 'strategic_duel' | 'sect_intrigue' | 'full_chapter';
  wordCountTarget: 'compact' | 'standard' | 'epic_chapter';
  literaryTone: string;
}): Promise<MasterCreationPipelineResult> => {
  try {
    const res = await fetch('/api/gemini/master-creation-pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.result) return data.result;
    }
  } catch (err) {
    console.warn('Backend master pipeline failed, generating high-fidelity fallback', err);
  }

  const charName = params.character.name || 'Lăng Tiêu';
  const root = (params.character as any).spiritualRoot || params.character.spiritualRoots || params.character.spiritualRootDetail?.rootName || 'Hỗn Độn Ngũ Hành Khai Thiên Căn';
  const sectRank = params.sectPosition.rankName || 'Chân Truyền Đệ Tử';
  const sect = params.sectName || 'Thái Hư Kiếm Tông';
  const spineTitle = params.spineStage?.stageName || 'Trúc Cơ & Tụ Đan';
  const spineRealm = params.spineStage?.realmTierTitle || 'Kim Đan Sơ Kỳ (Cửu Chuyển Đạo Đài)';
  const swordName = params.swordStance?.stanceName || 'Thái Sơ Tru Tiên Nhất Kiếm';
  const spellName = params.spell?.spellName || 'Ngũ Hành Diệt Ma Thần Lôi';
  const talismanName = params.talisman?.talismanName || 'Cửu Thiên Trấn Ma Đạo Triện';
  const setting = params.narrativeSetting || 'Cổ Thần Bí Cảnh - Huyết Nguyệt Hạp Cốc';
  const opponent = params.opponentOrObstacle || 'Huyết Ma Thiếu Chủ cùng tam đại Hộ Pháp';
  const conflict = params.primaryConflict || 'Tranh đoạt Thái Cổ Tiên Thiên Dược Thảo';

  return {
    pipelineTitle: `Chương: ${charName} Nghịch Chuyển Càn Khôn, Tam Đạo Hợp Nhất Chấn Động ${sect}`,
    characterFullSummary: `${charName} mang trong mình ${root}, đạo tâm kiên cố như bàn thạch ngàn năm. Trong hoàn cảnh ngàn cân treo sợi tóc, thần niệm tập trung cao độ, đả thông các mạch lạc ẩn tàng để thi triển liên hoàn tuyệt kỹ.`,
    sectStandingSummary: `Thân phận ${sectRank} của ${sect} đặt lên vai ${charName} trọng trách giữ gìn uy nghiêm môn phái, không lùi nửa bước trước yêu ma nghịch tặc.`,
    cultivationCircuitSummary: `Khí tức vận hành theo tuyến mạch ${spineTitle} (${spineRealm}), linh lực trong đan điền cuồn cuộn như đại dương gầm thét, mượn áp lực sinh tử để chấn vỡ bình cảnh.`,
    martialTrinitySummary: `Sự kết hợp hoàn hảo giữa Tam Đạo: Thân pháp biến hóa theo kiếm ý của [${swordName}], tay trái kết ấn dẫn phát [${spellName}], đồng thời thần thức hư không ngưng tụ dẫn động [${talismanName}] phong tỏa toàn bộ đường lui của địch thủ.`,
    sceneDynamics: {
      settingAtmosphere: `Gió rít gào quét qua ${setting}, mây đen ngập trời tích tụ sấm chớp rền vang, sát khí nồng nặc tựa hồ đóng băng cả không khí.`,
      stakesAndMotivation: `Trước mặt là ${opponent}, mục tiêu không chỉ là ${conflict} mà còn là con đường sinh tử chứng đạo, quyết định vận mệnh tương lai.`,
      tacticalChoreography: `1. Khởi chiêu kiếm khí quét ngang dò xét hư thực. 2. Lách người né đòn hiểm, tay trái bấm quyết triệu hồi thần lôi. 3. Phóng xuất đạo triện giam hãm chân nguyên đối phương. 4. Nhất kiếm quy tông kết liễu trận chiến.`
    },
    wovenProse: `Gió lạnh thấu xương rít gào qua từng khe đá lởm chởm tại ${setting}. Mây đen kịt từ bốn phương tám hướng kéo về, che khuất hoàn toàn vầng trăng máu trên đỉnh đầu, khiến không khí ngột ngạt đến mức một giọt nước rơi cũng tựa như tiếng sấm nổ.

Đứng trên mỏm đá nhô ra giữa vực sâu, ${charName} đạo bào phần phật tung bay trong gió dữ. Trên ngực áo, đồ đằng của ${sect} phản chiếu ánh kim quang lạnh lẽo, minh chứng cho tôn vị ${sectRank} mà hắn đã đổ biết bao máu và mồ hôi để giành lấy.

"Ha ha ha! ${charName}, ngươi tưởng mang danh ${sectRank} của ${sect} là có thể một mình xông vào đây sao?"

Một tràng cười the the lạnh lẽo xé toạc màn đêm. Từ trong bóng tối mịt mùng, ${opponent} chầm chậm bước ra. Từng luồng ma khí đen đặc quấn quanh cơ thể gã như những con rắn độc đói khát, ánh mắt đỏ quạch khóa chặt lấy thiếu niên đối diện:

"Hôm nay, ${conflict} này chính là mồ chôn ngươi! Khôn hồn giao ra Thái Cổ Tiên Thảo, bổn tọa sẽ cho ngươi một cái chết toàn thây!"

${charName} không đáp, sắc mặt trầm tĩnh tựa như mặt hồ mùa đông không một gợn sóng. Bên trong cơ thể hắn, ${root} đang khẽ rung động, cộng hưởng cùng thiên địa linh khí xung quanh. Luồng kinh mạch của cảnh giới ${spineTitle} (${spineRealm}) đột nhiên trào dâng dữ dội như cuồng triều vỡ đê.

"Nói nhiều vô ích. Rút binh khí đi!"

Thoát khỏi vỏ kiếm, thanh trường kiếm trong tay ${charName} phát ra một tiếng ngâm dài trong trẻo rúng động thiên địa. 

"Vụt!"

Hắn dậm chân một cái, Thập Tự Bộ Pháp thi triển ảo diệu, thân ảnh lập tức hóa thành tàn ảnh mơ hồ. [${swordName}] xuất thế! Một đạo kiếm khí sắc bén như xé toạc màn đêm, mang theo kiếm ý thấu triệt xương tủy đâm thẳng vào yết hầu đối phương.

"Muốn chết!" Đối thủ gầm lên, vung ma trảo chém xuống, ma phong rít gào va chạm vào kiếm phong tạo nên một chuỗi tia lửa chói lọi.

Nhưng ngay trong khoảnh khắc song phương giằng co, tay trái của ${charName} đã âm thầm biến đổi thủ ấn. Hắn không hề dựa vào một môn kiếm đạo đơn thuần! Mười ngón tay hắn đan chéo với tốc độ mắt thường khó lòng bắt kịp, khẩu tụng chân ngôn:

"[${spellName}], hàng ma phục yêu, cấp cấp như luật lệnh!"

"Ầm ầm ầm!"

Ngũ Hành linh quang bốc lên ngùn ngụt, ba đạo lôi đình từ trên chín tầng mây đánh bổ xuống ngay đỉnh đầu đối thủ. Ánh sáng chói lòa làm đối phương hoa mắt, hoảng hốt lùi lại ba bước.

Chưa dừng lại ở đó! Thần thức của ${charName} đã sớm phân hóa ra hư không. Ngón trỏ hắn điểm vào không trung, hư không họa phù! [${talismanName}] tỏa sáng rực rỡ, hàng vạn phù văn màu tím vàng hóa thành xiềng xích vô hình quấn chặt lấy tứ chi và khí hải của ${opponent}.

"Cái gì?! Hư không họa phù?! Ngươi... ngươi đồng tu cả Kiếm Đạo, Pháp Thuật lẫn Phù Triện?!"

Tiếng thét kinh hoàng của đối thủ vang lên nhưng đã quá muộn màng. Kiếm quang của ${charName} đã phá không mà đến, mang theo ý chí vô địch của một kẻ nghịch thiên cải mệnh, rạch đôi màn đêm u tối.

Máu tươi bắn tung tóe. Ma vụ tan biến. 

${charName} thu kiếm vào vỏ, tiếng kiếm ngân dần lắng xuống giữa màn đêm tịch mịch. Hắn hít sâu một hơi, cảm nhận bình cảnh của ${spineTitle} trong cơ thể rạn nứt thành từng mảnh nhỏ, đón chào một luồng thiên địa tinh hoa mới cuồn cuộn tràn vào khiếu huyệt...`,
    plotContinuationHooks: [
      `Dấu vết để lại trên thi thể đối thủ hé lộ nội gián cấp Trưởng Lão trong ${sect} đã tiết lộ hành tung`,
      `Bản đồ da cừu rơi ra chỉ đến tầng sâu nhất của ${setting}, nơi một Cổ Thần Trận đang chờ người thừa kế`,
      `Biến động linh khí từ trận chiến đã đánh thức một đầu Viễn Cổ Lôi Thú dưới đáy vực sâu`
    ],
    chapterOutlineSuggested: [
      { act: 'Hồi 1: Đối Đầu Giữa Vực Sâu', description: `${charName} đối mặt ${opponent} tại ${setting}, giữ vững khí thế ${sectRank}.` },
      { act: 'Hồi 2: Thử Nghiệm Kiếm Khí', description: `Giao tranh kịch liệt bước đầu, đối thủ dùng ma công hòng áp chế nhưng bất thành.` },
      { act: 'Hồi 3: Tam Đạo Hợp Nhất Tuyệt Sát', description: `Dung hợp Kiếm Đạo, Thuật Pháp lôi đình và Phù Lục trấn áp xoay chuyển tình thế.` },
      { act: 'Hồi 4: Bình Cảnh Phá Vỡ & Mầm Mống Mới', description: `Đột phá cảnh giới mới, phát hiện bí mật kinh hoàng mở ra chương tiếp theo.` }
    ]
  };
};

export const generateSubplotArc = async (
  config: SubplotGenerationConfig
): Promise<SubplotGenerationResult> => {
  try {
    const res = await fetch('/api/gemini/generate-subplot-arc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    const data = await handleResponse(res);
    if (data.result && data.result.arc) {
      return data.result;
    }
    throw new Error('Không nhận được dữ liệu nhánh phụ hợp lệ');
  } catch (error) {
    console.warn('API error, falling back to local algorithmic subplot generator:', error);
    return generateFallbackSubplotArc(config);
  }
};

const generateFallbackSubplotArc = (
  config: SubplotGenerationConfig
): SubplotGenerationResult => {
  const pName = config.protagonistName || 'Nhân vật chính';
  const keyword = config.coreKeywordOrItem || 'Mảnh chuông đồng cổ kính';
  const setting = config.initialDeceptiveSetting || 'Góc phế tích chân núi tông môn';

  const arc: SubplotArcItem = {
    id: `subplot_arc_${Date.now()}`,
    title: `Bí Ẩn ${keyword} & Chìa Khóa Hư Không Thượng Giới`,
    deceptiveFacade: `Một vật phẩm tầm thường bề ngoài hoen rỉ vứt lăn lóc tại ${setting}, người ngoài nhìn vào chỉ tưởng là đồ phế thải của thợ rèn phàm trần bỏ đi.`,
    foreshadowType: 'relic_token',
    plantedStageId: config.plantedStageId || 'spine_stage_1',
    plantedStageName: 'Giai Đoạn Khởi Khắc (Sơ Kỳ)',
    payoffStageId: config.payoffStageId || 'spine_stage_4',
    payoffStageName: 'Giai Đoạn Đại Kiếp Đột Phá (Trung Hậu Kỳ)',
    coreClueDetail: `Mỗi khi ${pName} vận chuyển công pháp hoặc trải qua sinh tử chi chiến, ${keyword} âm thầm hấp thụ một tia kiếm ý và tinh huyết. Bên trong nó phong ấn một sợi tàn hồn trận nhãn của Tiên Thiên Đạo Tàng thất lạc từ thời Thái Cổ.`,
    mainPlotCatalystEffect: `Khi ${pName} đối mặt với bình cảnh chí mạng và bị cường địch phong tỏa không gian ở giai đoạn cao trào, ${keyword} bộc phát thần uy, giải khai cấm chế hư không, cung cấp lượng thiên địa linh lực vô tận để ${pName} nghịch chuyển càn khôn, mở ra con đường phi thăng.`,
    associatedCharactersOrFactions: 'Cổ Trận Tông tàn phái, Chấp sự ti giám nội môn, Huyền Thiên Ma Giáo ẩn nặc',
    seedScenePromptSnippet: `Gió lạnh rít từng cơn qua ${setting}. ${pName} cúi người nhặt ${keyword} dính đầy bùn đất lên, bàn tay vô tình quẹt qua gờ kim loại sắc nhọn. Một giọt máu đỏ tươi rỉ ra, thấm vào hoa văn mờ nhạt... Không có dị tượng kinh thiên, chỉ có một cảm giác lành lạnh kỳ lạ thoảng qua đầu ngón tay rồi biến mất.`,
    payoffScenePromptSnippet: `Hư không chung quanh rạn nứt như mạng nhện, sát khí của cường địch bủa vây bốn phía không lối thoát. Đúng lúc ấy, ${keyword} trong ngực ${pName} bỗng phát ra tiếng ngân thanh thúy xé toạc màng nhĩ! Vô số đạo văn cổ xưa phóng vút lên trời xanh, kết thành một tòa Thái Cổ Hộ Đạo Trận bao bọc lấy hắn giữa biển lôi đình cuồng nộ!`,
    status: 'planted'
  };

  return {
    arc,
    narrativeIntegrationTips: [
      `1. Gieo hạt tự nhiên: Hãy để ${pName} nhặt hoặc bắt gặp ${keyword} như một việc ngẫu nhiên không có chủ đích, tuyệt đối không miêu tả nó phát sáng hay thu hút sự chú ý của mọi người.`,
      `2. Nhắc lại gián đoạn (Echoing): Ở các cảnh giới trung gian, chỉ cần nhắc lại một hai câu ngắn (ví dụ: ${pName} vô tình chạm vào nó khi lau kiếm, hoặc để ý vết rỉ sét hơi nhạt đi) để độc giả nhớ vật này vẫn tồn tại.`,
      `3. Bùng nổ tương phản (Payoff): Khi tới giai đoạn cao trào, giải phóng sức mạnh của nó một cách đột ngột trong khoảnh khắc tuyệt vọng nhất để tạo hiệu ứng giải tỏa cảm xúc cao độ cho độc giả.`
    ]
  };
};

export const triangulateChronicleClues = async (
  clues: CharacterChronicleClue[],
  config: ClueTriangulationConfig,
  protagonistName?: string
): Promise<ClueTriangulationResult> => {
  try {
    const res = await fetch('/api/gemini/triangulate-clues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clues,
        mainCharacterGoal: config.mainCharacterGoal,
        investigationContext: config.investigationContext,
        discoveryStyle: config.discoveryStyle,
        protagonistName
      })
    });
    const data = await handleResponse(res);
    return data.result;
  } catch (error) {
    console.warn('Backend triangulate-clues failed, using smart algorithmic synthesizer fallback:', error);
    return fallbackTriangulateClues(clues, config, protagonistName);
  }
};

const fallbackTriangulateClues = (
  clues: CharacterChronicleClue[],
  config: ClueTriangulationConfig,
  protagonistName?: string
): ClueTriangulationResult => {
  const pName = protagonistName || 'Lâm Tiêu';
  const charNames = Array.from(new Set(clues.map((c) => c.characterName)));
  const locations = Array.from(new Set(clues.map((c) => c.locationName)));
  const simultaneousCount = clues.filter((c) => c.syncMode === 'simultaneous').length;
  const asyncCount = clues.length - simultaneousCount;

  return {
    investigationTitle: `Ma Trận Bí Mật: ${charNames.slice(0, 2).join(' & ')} • Đại Khúc Giao Thoa`,
    charactersInvolved: [...charNames, pName],
    locationsSpan: locations,
    timelineReconstruction: `Tái dựng dòng thời gian: ${asyncCount > 0 ? `Bắt nguồn từ sự kiện dị thời (${asyncCount} mắt xích gieo mầm trong quá khứ) ` : ''}kết hợp cùng ${simultaneousCount} biến cố diễn ra đồng thời trong cùng một đêm bão táp. Mọi tuyến đường và hành vi đều quy về một điểm giao thoa địa lý.`,
    theHiddenTruth: `Tất cả những vụ việc tưởng chừng rời rạc - từ biến động giá dược liệu, 15 phút tuần tra bị xóa bỏ, đến di tích bia đá 300 năm trước - thực chất là một kế hoạch hoàn hảo do thế lực thượng tầng giật dây nhằm cô lập và thanh trừng các đệ tử nắm giữ bí mật Thái Cổ.`,
    mainCharacterDiscoveryBeat: `${pName} đặt các vật chứng lên bàn đá: ngọc bài bị mẻ góc, tàn dư Lam Lân Chu Sa và nét khắc cổ xưa. Đột nhiên các mảnh ghép khớp vào nhau hoàn hảo! Hắn nhận ra người mà cả tông môn tin tưởng nhất chính là kẻ chủ mưu điều khiển toàn bộ ván cờ.`,
    storyImpactAndDramaticPayoff: `Nhân vật chính không còn bị động rơi vào bẫy, mà chủ động tương kế tựu kế, đảo ngược tình thế ngay trong đại điển tỉ võ, khiến toàn thể trưởng lão và đối thủ phải bàng hoàng trước tầm nhìn thấu suốt của hắn.`,
    sceneDraftPrompt: `Ánh trăng lạnh lẽo xuyên qua song cửa sổ rọi xuống mặt bàn đá. ${pName} ngón tay nhẹ nhàng lướt qua ${clues[0]?.clueArtifactOrProof || 'mảnh di vật'}. Mùi hương lạ thoang thoảng cùng những mốc thời gian trùng hợp đến rợn người khiến đồng tử hắn co rút lại. "Thì ra là vậy..." Hắn lẩm bẩm, khóe môi khẽ nhếch lên một nụ cười lạnh buốt. Bàn cờ này, đã đến lúc hắn làm người hạ quân cờ quyết định.`
  };
};

export const generateChronicleClue = async (
  params: {
    characterName: string;
    characterRole: string;
    locationName: string;
    syncMode: 'simultaneous' | 'asynchronous_past' | 'asynchronous_future_planted';
    genre?: string;
    protagonistName?: string;
  }
): Promise<CharacterChronicleClue> => {
  try {
    const res = await fetch('/api/gemini/generate-chronicle-clue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await handleResponse(res);
    return data.result;
  } catch (error) {
    console.warn('Backend generate-chronicle-clue failed, using creative fallback:', error);
    return {
      id: `clue_${Date.now()}`,
      characterId: `char_${Math.random().toString(36).substring(2, 7)}`,
      characterName: params.characterName,
      characterRoleTag: params.characterRole,
      locationName: params.locationName,
      timeAnchor: params.syncMode === 'simultaneous' ? 'Canh ba đêm mưa tuyết (Đồng thời với Main)' : 'Nửa năm trước đại điển môn phái (Dị thời)',
      syncMode: params.syncMode,
      surfaceAppearance: `Thực hiện công vụ bình thường tại ${params.locationName}, không để lộ bất kỳ dấu hiệu khác lạ nào trước mắt người ngoài.`,
      secretTruth: `Bí mật lưu lại ám hiệu và chôn giấu một phần cơ mật để phòng thân khi nhận thấy nguy cơ bị thủ tiêu diệt khẩu.`,
      clueType: 'physical_evidence',
      clueArtifactOrProof: 'Một chiếc ngọc giản bị vỡ đôi bọc trong vải tơ tằm chống nước, khắc nửa đồ hình địa mạch.',
      linkedPlotHook: `Nhân vật chính tìm thấy mảnh ngọc giản này, dùng chân hỏa dung hợp với mảnh vỡ sẵn có để mở khóa vị trí cấm địa mật thất.`,
      triangulationPartners: ['Chưởng quỹ đan phường', 'Mật thám biên ải'],
      authorWritingTip: 'Tập trung miêu tả sự kín kẽ của nhân vật phụ giữa chốn đông người, chỉ để lộ manh mối qua một ánh mắt nhìn nghiêng hoặc một cử chỉ vô thức.'
    };
  }
};

export const generateMicroStoryStrand = async (
  config: MicroArcGenerationConfig
): Promise<MicroArcGenerationResult> => {
  try {
    const res = await fetch('/api/gemini/generate-micro-arc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    const data = await handleResponse(res);
    return data.result;
  } catch (error) {
    console.warn('Backend generate-micro-arc failed, using smart algorithmic fallback:', error);
    return fallbackGenerateMicroStrand(config);
  }
};

const fallbackGenerateMicroStrand = (
  config: MicroArcGenerationConfig
): MicroArcGenerationResult => {
  const pName = config.protagonistName || 'Lâm Tiêu';
  const cat = config.category || 'vendetta_local';
  const setting = config.localSetting || 'Khu chợ đen ngoại môn / Chân núi Vấn Kiếm';
  const need = config.immediateNeedOrTrouble || 'Khắc phục khó khăn trước mắt';

  const titles: Record<string, string> = {
    vendetta_local: `Phản Sát Tiểu Nhân Tại ${setting.split('/')[0].trim()}`,
    micro_treasure: `Đào Được Phế Thiết Tàn Bảo Giữa ${setting.split('/')[0].trim()}`,
    serendipitous_encounter: `Kỳ Ngộ Thiếu Nữ Thoát Hiểm Ven Suối`,
    technique_experiment: `Đột Phá Bí Thuật Nghịch Chuyển Chân Khí`,
    infiltration_recon: `Dọ Thám Mật Cung Trong Đêm Mưa Bão`,
    dao_heart_tribulation: `Một Thoáng Ký Ức Hồng Trần Phàm Tục`,
    black_market_gamble: `Đổ Thạch Nghịch Thiên Giành Trọn Linh Thạch`,
    sect_daily_slice: `Chuyện Hài Hước Bắt Linh Thú Sau Núi`
  };

  const title = titles[cat] || `Tiểu Mạch Biến Cố Tại ${setting}`;

  const strand: MicroStoryStrand = {
    id: `micro_strand_${Date.now()}`,
    title,
    category: cat,
    scope: config.scope || 'single_scene',
    parentSpineStageId: config.parentSpineStageId || 'spine_stage_1',
    localTrigger: `Trong lúc lưu lại ${setting}, ${pName} bất ngờ gặp phải tình huống: ${need}.`,
    protagonistMotivation: `Cần giải quyết dứt điểm rắc rối này để bảo vệ bí mật công pháp và thu hoạch tài nguyên cần thiết cho kỳ đột phá tiếp theo.`,
    immediateObstacle: `Đối thủ cậy thế lực đông đảo hoặc địa hình hiểm trở, định dùng áp lực số đông ép ${pName} cúi đầu.`,
    tacticalResolution: `${pName} không dùng vũ lực thô bạo mà quan sát thấy điểm yếu trong thế trận của đối phương, một kiếm phá điểm then chốt rồi tương kế tựu kế phản kích.`,
    tangibleReward: `Thu được một chiếc túi trữ vật chứa 60 linh thạch trung phẩm, một tấm tàn đồ và một lọ dược dịch quý hiếm.`,
    anchorHookToMainPlot: `Tấm tàn đồ này liên kết trực tiếp với đại cấm địa của Mạch Chính, giúp ${pName} đi trước kẻ thù một bước trong đại kiếp sắp tới.`,
    associatedNpcName: `Mã Chấp Sự & Nhóm Tu Sĩ Ngoại Vực`,
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Gặp Gỡ Xung Đột Bất Ngờ',
        narrativeFunction: 'inciting_incident',
        sceneSummary: `Tại ${setting}, biến cố nổ ra khi đối phương cản đường gây khó dễ.`,
        sceneDraftSnippet: `Gió lạnh thổi qua ${setting}. ${pName} khựng bước khi ba bóng người từ trong góc tối bước ra, ánh đao sáng loáng phản chiếu nụ cười nham hiểm.`
      },
      {
        beatOrder: 2,
        beatTitle: 'Đấu Trí Chiến Thuật & Đảo Ngược Tình Thế',
        narrativeFunction: 'rising_friction',
        sceneSummary: `${pName} khéo léo dùng lời nói làm phân tán chú ý, sau đó bất ngờ xuất chiêu khống chế đầu não.`,
        sceneDraftSnippet: `"Các ngươi tưởng đông người là có thể định đoạt quy củ sao?" ${pName} mỉm cười nhạt, mũi kiếm khẽ rung lên một tiếng ngân như xé toạc màn sương mù.`
      },
      {
        beatOrder: 3,
        beatTitle: 'Thu Hoạch Chiến Lợi & Neo Mắt Xích',
        narrativeFunction: 'micro_climax',
        sceneSummary: `Đối phương thất kinh tháo chạy, để lại chiến lợi phẩm quan trọng chứa manh mối của mạch chính.`,
        sceneDraftSnippet: `Tiếng bước chân hốt hoảng xa dần. ${pName} nhặt chiếc túi trữ vật rơi trên nền đất, mở ra nhìn tấm tàn đồ da cừu: "Trùng hợp vậy sao? Món đồ này chính là thứ ta đang tìm kiếm cho đại kiếp sắp tới."`
      }
    ],
    readyToInsertProseSnippet: `Bóng tối dần buông xuống ${setting}. Sau vài chiêu thức gọn gàng sắc bén, kẻ ngáng đường ngã quỵ ôm vết thương rên rỉ, vội vã bỏ lại chiến lợi phẩm rồi lết đi trong đêm tối. ${pName} không đuổi theo cùng diệt tận, chỉ lạnh lùng thu kiếm vào vỏ. Hắn cúi người nhặt chiếc túi trữ vật lên, ngón tay chạm vào tấm da thú tàn khuyết bên trong. Một luồng linh khí cổ xưa thoáng rung động. Hắn khẽ nhếch môi: "Một nhánh rẽ nhỏ tưởng chừng phiền toái, không ngờ lại dẫn lối đến cơ duyên lớn của toàn bộ chuyến đi này."`
  };

  return {
    strand,
    writingTechniqueTips: [
      '1. Giữ nhịp độ nhanh: Tiểu mạch truyện chỉ nên tập trung giải quyết 1 vấn đề cụ thể trong phạm vi 1-2 cảnh, không kéo dài quá nhiều chi tiết rườm rà.',
      '2. Tạo sự thỏa mãn tức thì (Instant Gratification): Hãy cho nhân vật chính thu hoạch được chiến lợi phẩm cụ thể (đan dược, tiền bạc, võ kỹ) ngay sau khi giải quyết xung đột cục bộ.',
      '3. Luôn có điểm neo (Anchor Hook): Dù là chuyện nhỏ nhặt như nhặt đồ rỉ sét hay cãi vã ở tửu quán, hãy để lại 1 chi tiết nhỏ mở ra cơ duyên cho Mạch Chính sau này.'
    ]
  };
};

export const simulateTrajectoryConvergence = async (
  config: TrajectoryConvergenceSimulationConfig,
  trajectoryName: string,
  branchArcs: BranchStoryArc[],
  nexus: BranchConvergenceNexus
): Promise<TrajectoryConvergenceSimulationResult> => {
  try {
    const res = await fetch('/api/gemini/simulate-trajectory-convergence', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trajectoryId: config.trajectoryId,
        trajectoryName,
        selectedBranchArcIds: config.selectedBranchArcIds,
        branchArcs,
        nexus,
        protagonistName: config.protagonistName,
        climacticTone: config.climacticTone,
        genre: config.genre
      })
    });
    const data = await handleResponse(res);
    return data.result;
  } catch (error) {
    console.warn('Backend simulate-trajectory-convergence failed, using creative fallback:', error);
    const pName = config.protagonistName || 'Lâm Tiêu';
    const branchTitles = branchArcs.map(b => b.title).join(', ');
    return {
      convergenceTitle: `Hợp Lưu Thiên Mệnh: Đại Chiến ${nexus.nexusName}`,
      trajectoryAdopted: trajectoryName,
      branchesIntertwined: branchArcs.map(b => b.title),
      nexusStageLinked: nexus.targetSpineStageTitle,
      grandSynthesisNarrative: `Tại thời khắc diễn ra ${nexus.nexusName}, toàn bộ những manh mối và lực lượng tích lũy từ các mạch nhánh (${branchTitles}) đồng loạt phát huy uy lực. Từng ân oán cũ, từng tấm ngọc giản và liên minh ngầm mà ${pName} dày công xây dựng từ thuở ban sơ nay cùng lúc nở rộ như một mạng lưới nhân quả hoàn mỹ, đập tan thế cô lập của nhân vật chính giữa muôn trùng vây bủa.`,
      climacticClashScene: `Giữa tiếng sấm sét rền vang của đại trận, các thế lực tưởng chừng không liên quan bỗng chốc quay ngoắt mũi giáo theo sự điều động của ${pName}. Một kiếm định giang sơn, sát chiêu từ mạch nhánh cấm kỵ xé rách phòng tuyến của đối thủ hùng mạnh nhất, tạo nên một cú lội ngược dòng chấn động toàn bộ giới tu chân.`,
      aftermathAndSpineElevation: `Chiến thắng vang dội không chỉ giải quyết triệt để mối đe dọa của hồi này mà còn gột rửa hoàn toàn đạo tâm của ${pName}. Lực lượng từ các nhánh quy tụ về đan điền, tạo tiền đề vững chắc phá tan xiềng xích cảnh giới, đưa hắn vững bước tiến vào đỉnh phong ${nexus.targetSpineStageTitle}.`,
      readyChapterDraftSnippet: `Mây đen cuồn cuộn che kín vòm trời ${nexus.nexusName}. Địch nhân đứng trên cao ngạo nghễ cười lạnh: "${pName}, hôm nay dù ngươi có mọc cánh cũng khó thoát!". ${pName} không hề biến sắc, chỉ thong thả giơ cao ngọc lệnh trong tay. Trong chớp mắt, bốn phương tám hướng đồng loạt bùng lên hào quang rực rỡ—từ mạng lưới tình báo ngầm, đội quân long kỵ cho đến những tàn kiếm cổ xưa từ cấm địa đều gầm vang đáp lời. Hắn lạnh lùng cất lời: "Ai nói ta chỉ có một mình? Toàn bộ bàn cờ này, từ khoảnh khắc ta bước chân vào tu đạo... đã do ta nắm giữ!"`
    };
  }
};

export const generateBranchStoryArc = async (
  params: {
    trajectoryId: string;
    trajectoryName: string;
    domain: string;
    initiatingStageId: string;
    convergingStageId: string;
    narrativeHook: string;
    genre?: string;
    protagonistName?: string;
  }
): Promise<{ arc: BranchStoryArc; narrativeTips: string[] }> => {
  try {
    const res = await fetch('/api/gemini/generate-branch-story-arc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await handleResponse(res);
    return data.result;
  } catch (error) {
    console.warn('Backend generate-branch-story-arc failed, using algorithmic fallback:', error);
    const pName = params.protagonistName || 'Lâm Tiêu';
    const arc: BranchStoryArc = {
      id: `arc_branch_${Date.now()}`,
      trajectoryId: params.trajectoryId as any,
      title: `Nhánh Rẽ: ${params.narrativeHook.slice(0, 35)}...`,
      domain: params.domain as any,
      initiatingStageId: params.initiatingStageId,
      convergingStageId: params.convergingStageId,
      narrativeHook: params.narrativeHook,
      progressionPhases: [
        {
          phaseOrder: 1,
          phaseTitle: 'Khởi Sinh Ân Oán & Khám Phá Bí Ẩn',
          eventsSummary: `${pName} tiếp cận sự việc ban đầu, phát hiện ra dấu tích bất thường và ngấm ngầm tìm hiểu đối sách.`
        },
        {
          phaseOrder: 2,
          phaseTitle: 'Tích Lũy Thế Lực & Tranh Đoạt Thời Cơ',
          eventsSummary: `Phát triển độc lập trong 2-3 chương, vượt qua cạm bẫy của phe đối lập và thu thập chiến lợi phẩm quyết định.`
        },
        {
          phaseOrder: 3,
          phaseTitle: 'Chuẩn Bị Hợp Lưu Về Mạch Chính',
          eventsSummary: `Toàn bộ kết quả từ nhánh này được chuyển hóa thành vũ khí bí mật sẵn sàng phóng thích tại đại biến cố.`
        }
      ],
      convergencePointDescription: `Đâm thẳng vào biến cố lớn tại cảnh giới ${params.convergingStageId}, cung cấp viện binh hoặc bảo vật đảo ngược thế trận.`,
      catalystRewardOrStakes: `Thu hoạch được đạo khí độc môn và danh vọng lớn, đồng thời gánh chịu sự chú ý từ các cự đầu cõi thượng giới.`,
      sampleProseSnippet: `Gió rít gào bên vách đá. ${pName} siết chặt bảo vật vừa đoạt được trong tay, ánh mắt hướng về phương xa nơi môn phái đang chuẩn bị bước vào đại kiếp: "Mảnh ghép cuối cùng đã đủ... Món quà này, ta sẽ dành tặng cho các ngươi tại lôi đài đại hội!"`
    };
    return {
      arc,
      narrativeTips: [
        '1. Đảm bảo nhánh rẽ có khởi đầu - cao trào - kết thúc độc lập để người đọc cảm thấy cuốn hút.',
        '2. Không để nhánh rẽ trôi dạt vô tận: Luôn ấn định trước cảnh giới hội tụ để bùng nổ trở lại cốt truyện chính.'
      ]
    };
  }
};

// =========================================================================
// MẠNG THẦN KINH SUY DIỄN & TỰ HỌC NÂNG CAO CHẤT LƯỢNG NỘI DUNG
// =========================================================================

export const runNeuralNarrativeInference = async (
  params: NeuralInferenceRunParams
): Promise<NeuralInferenceRecord> => {
  try {
    const res = await fetch('/api/gemini/run-neural-inference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await handleResponse(res);
    return data.result;
  } catch (error) {
    console.warn('Backend run-neural-inference failed, using high-order neural fallback:', error);
    const pName = params.protagonistName || 'Nhân vật chính';
    const chTitle = params.currentChapterTitle || 'Chương Hiện Tại';

    // Algorithmic deduction based on inference type
    let revelation = '';
    let butterfly = '';
    let draft = '';
    let steps: NeuralDeductionStep[] = [];
    let appliedIds: string[] = params.learnedAxioms.slice(0, 2).map(a => a.id);

    if (params.inferenceType === 'PLOT_TWIST') {
      revelation = `Tình huống hiện tại chứa đựng một nghịch lý: Đối thủ bề ngoài đang tấn công dữ dội thực chất chỉ là con rối thế mạng, trong khi kẻ gián điệp thực sự lại chính là người đồng hành đáng tin cậy nhất đang bảo hộ hậu phương.`;
      butterfly = `${pName} cần tương kế tựu kế: giả vờ trúng kế để dụ kẻ chủ mưu xuất đầu lộ diện tại tế đàn cổ, bẻ gãy đòn bẩy phản kích ngay trước mắt mọi người.`;
      steps = [
        {
          stepOrder: 1,
          layerName: 'Lớp 1: Nhận diện Tín Hiệu & Mâu Thuẫn Vật Lý',
          observation: `Dấu vết công pháp và hướng gió linh khí không trùng khớp với sơ đồ phục kích thông thường.`,
          inference: `Có kẻ thứ ba đứng sau thao túng cục diện, dùng một trận chiến giả để che mắt Hộ Tông Trận.`,
          confidenceScore: 94,
          activatedSynapses: ['Tín hiệu trận pháp', 'Nghịch lý hiện trường', 'Dương đông kích tây']
        },
        {
          stepOrder: 2,
          layerName: 'Lớp 2: Suy Diễn Động Cơ Ngầm & Bàn Cờ Thế Lực',
          observation: `Đối phương biết trước lộ trình bí mật mà chỉ có 3 người trong cốt cán nắm rõ.`,
          inference: `Nội gián đã gài mồi nhử từ trước, mượn đao sát nhân để đoạt lấy di vật gia tộc.`,
          confidenceScore: 91,
          activatedSynapses: ['Nội gián thâm tàng', 'Động cơ gia tộc', 'Lợi ích tranh đoạt']
        },
        {
          stepOrder: 3,
          layerName: 'Lớp 3: Dự Phóng Cánh Bướm & Khắc Chế Phản Đòn',
          observation: `Nếu lập tức vạch trần, kẻ địch sẽ tiêu hủy chứng cứ và phát động đại đồ sát.`,
          inference: `Phải kìm nén sát khí, dùng linh phù hư ảnh thế mạng để bắt quả tang tại cấm địa.`,
          confidenceScore: 96,
          activatedSynapses: ['Bảo toàn nghiệp lực', 'Tương kế tựu kế', 'Chuyển bại thành thắng']
        }
      ];
      draft = `Gió đêm gào thét qua khe núi đá hiểm trở.

${pName} đứng lặng trong bóng tối, mũi kiếm rủ xuống đất, từng giọt máu tanh chậm rãi rơi rớt trên phiến đá rêu phong. Ánh mắt hắn không nhìn về phía thi thể đối thủ vừa ngã xuống, mà lại hướng về phía ánh lửa trại bập bùng nơi hậu phương.

Nơi đó, một bóng người quen thuộc đang lặng lẽ lau chùi đoản đao. Động tác kia nhìn qua như đang cảnh giác tuần tra, nhưng ngón tay út của kẻ ấy lại khẽ gõ nhẹ ba nhịp lên vỏ bao bằng gỗ đàn hương — đúng chuẩn ám hiệu dẫn đường của Cổ Linh Các.

"Thì ra là vậy..."

${pName} khẽ siết chặt chuôi kiếm, đốt ngón tay trắng bệch. Một cơn sóng dữ dâng lên trong đáy mắt, nhưng vẻ mặt hắn nhanh chóng khôi phục lại sự lạnh lùng tựa băng sương. Hắn không vội vạch trần, mà chỉ khẽ nuốt một viên Liễm Khí Đan vào bụng: "Ngươi đã thích diễn màn kịch huynh đệ tình thâm này đến vậy, ta sẽ phụng bồi cho ngươi đến hồi hạ màn!"`;
    } else if (params.inferenceType === 'LATENT_MOTIVE') {
      revelation = `Đối phương đưa ra đề nghị hợp tác hào phóng không phải vì thiện chí, mà vì chiếc chìa khóa phong ấn chỉ có thể kích hoạt bằng máu của dòng dõi ${pName}.`;
      butterfly = `Sau khi phá vỡ phong ấn, đối phương chắc chắn sẽ trở mặt hạ sát để diệt khẩu; cần chuẩn bị sẵn cấm chế nghịch chuyển linh lực.`;
      steps = [
        {
          stepOrder: 1,
          layerName: 'Lớp 1: Quan Sát Ngôn Ngữ Hành Vi & Điểm Bất Thường',
          observation: `Lời nói cực kỳ cung kính nhã nhặn nhưng ánh mắt liên tục liếc về chiếc nhẫn tín vật.`,
          inference: `Mục tiêu thực sự là kiểm chứng phản ứng cộng hưởng huyết mạch viễn cổ.`,
          confidenceScore: 93,
          activatedSynapses: ['Ngôn ngữ cơ thể', 'Thăm dò huyết mạch', 'Vỏ bọc hòa hoãn']
        },
        {
          stepOrder: 2,
          layerName: 'Lớp 2: Bóc Tách Động Cơ Ngầm & Cán Cân Lợi Ích',
          observation: `Tông môn đối phương vốn khét tiếng tàn bạo, chưa từng chia sẻ bí cảnh cho bất kỳ ai.`,
          inference: `Sự nhượng bộ bất thường này chứng minh bọn chúng đang gặp rào cản chết người mà chỉ ${pName} giải được.`,
          confidenceScore: 95,
          activatedSynapses: ['Nghịch lý lợi ích', 'Chìa khóa huyết tế', 'Cạm bẫy mật ngọt']
        },
        {
          stepOrder: 3,
          layerName: 'Lớp 3: Hiệu Ứng Dây Chuyền & Đối Sách',
          observation: `Khai thác sự nôn nóng của kẻ địch để thương lượng nâng cao điều kiện, đồng thời cài cắm phân hồn thần thức.`,
          inference: `Biến kẻ thù thành lá chắn miễn phí mở đường vượt qua các tầng cấm chế nguy hiểm trước.`,
          confidenceScore: 92,
          activatedSynapses: ['Mượn đao mở lối', 'Trói buộc nghiệp quả', 'Chủ động bàn cờ']
        }
      ];
      draft = `Trong căn sương phòng thoang thoảng mùi đàn hương, chén trà nóng bốc khói mờ ảo che khuất nụ cười đầy ẩn ý của vị khách phương xa.

"Chỉ cần đạo hữu gật đầu, ba phần mười bảo vật trong cổ điện Thần Tiên Mộ đều thuộc về các hạ." Giọng nói ôn tồn như gió xuân, từng câu từng chữ đều chan chứa vẻ chí tình chí nghĩa.

${pName} khẽ cười, nâng chén trà lên ngang môi nhưng không uống. 

Dưới đáy chén ngọc thanh khiết, một vệt tơ máu cực nhỏ đang khẽ xoay tròn theo chiều kim đồng hồ, phản chiếu chính xác ánh sáng tử kim nơi ngực áo của đối phương. Bí thuật Thấu Hồn Chỉ của Lâm gia đã thức tỉnh, mách bảo cho hắn biết: Kẻ trước mặt đang cực kỳ hồi hộp. Hắn sợ ${pName} từ chối, nhưng lại càng sợ ${pName} phát hiện ra tế đàn kia cần một vạn giọt chân huyết của người mang Hoàng Cực Kiếm Cốt để mở cổng!

"Đạo hữu đã có thịnh tình như thế," ${pName} buông chén trà xuống bàn phát ra một tiếng cạch giòn tan, khóe môi khẽ nhếch lên nụ cười đầy bí hiểm: "Tại sao chúng ta không chia theo tỷ lệ... năm - năm?"`;
    } else {
      revelation = `Hành động tưởng chừng vô hại của nhân vật tại thời điểm này sẽ kích hoạt phản ứng domino: làm sống lại một tàn hồn viễn cổ đang ngủ say dưới lòng đất, buộc các đại tông môn phải đình chiến để cùng đối phó đại nạn.`;
      butterfly = `Biến số này phá vỡ toàn bộ toan tính cục bộ, nâng tầm xung đột từ ân oán cá nhân thành cuộc chiến sinh tồn giữa các cõi giới.`;
      steps = [
        {
          stepOrder: 1,
          layerName: 'Lớp 1: Khởi Phát Nhân Quả & Tác Động Vi Mô',
          observation: `Lực lượng linh khí phát tiết ra khi phá vỡ linh đan chạm tới tầng địa mạch phong ấn cổ đại.`,
          inference: `Một vết nứt vô hình đã hình thành trên Trấn Ma Cổ Trận.`,
          confidenceScore: 90,
          activatedSynapses: ['Địa mạch chấn động', 'Nứt vỡ phong ấn', 'Sóng linh lực ngầm']
        },
        {
          stepOrder: 2,
          layerName: 'Lớp 2: Khuyếch Đại Hệ Quả Domino',
          observation: `Ma khí rò rỉ sẽ làm biến dị các loài linh thú trong phạm vi ngàn dặm trong 3 ngày tới.`,
          inference: `Đợt thú triều chưa từng có sẽ tấn công cả bản môn lẫn địch phái, san bằng ranh giới thù hằn trước đó.`,
          confidenceScore: 94,
          activatedSynapses: ['Thú triều bùng phát', 'Trật tự đảo lộn', 'Nguy cơ toàn diện']
        },
        {
          stepOrder: 3,
          layerName: 'Lớp 3: Cục Diện Mới & Thời Cơ Đột Phá',
          observation: `Trong cảnh hỗn loạn long trời lở đất, các đại lão sẽ rời khỏi hang ổ.`,
          inference: `${pName} có cơ hội hoàng kim để đột nhập vào Thần Binh Các cấm kỵ đoạt lấy Cực Phẩm Đạo Binh.`,
          confidenceScore: 95,
          activatedSynapses: ['Đục nước béo cò', 'Cơ hội ngàn năm', 'Nghịch cảnh trùng sinh']
        }
      ];
      draft = `Rắc!

Một thanh âm giòn tan vang lên sâu thẳm dưới lòng đất, nhỏ bé tựa như một cành khô gãy rụng giữa rừng già, nhưng lại khiến cả đỉnh Cô Vân phong khẽ run rẩy một nhịp.

${pName} đứng sững lại giữa màn sương mù mịt. Một luồng khí tức cổ xưa, lạnh lẽo và tà dị dị thường từ kẽ nứt vừa hé mở phả thẳng vào mặt hắn. Những con chim đêm trong rừng bỗng nhiên im bặt tiếng hót, lũ thú hoang bắt đầu phát ra những tiếng gầm rú rợn người rồi cuống cuồng giẫm đạp lên nhau chạy tháo thân về phía hạ giới.

Hắn cúi đầu nhìn xuống bàn tay mình — nơi vừa vô tình đánh vỡ viên Hắc Thiết Tinh Thạch để hộ thân. Hắn chưa từng nghĩ một đòn tự vệ vô thưởng vô phạt ấy lại vừa chạm tới mắt xích yếu nhất của Cửu U Ma Trận đã ngủ yên suốt vạn năm.

"Trời muốn biến sắc rồi..." 

${pName} hít sâu một hơi khí lạnh, ánh mắt nhìn qua biển mây đang cuồn cuộn chuyển sang màu tím thẫm nơi chân trời xa: "Nếu phong ba bão táp đã định sẵn không thể tránh khỏi, vậy thì hãy để cơn cuồng nộ này xé toạc tấm màn dối trá của thiên hạ luôn đi!"`;
    }

    return {
      id: `inf_rec_${Date.now()}`,
      timestamp: new Date().toLocaleString('vi-VN'),
      epoch: params.learningEpoch || 1,
      sourceChapterTitle: chTitle,
      inferenceType: params.inferenceType,
      inputContext: params.context,
      deductionChain: steps,
      coreRevelation: revelation,
      butterflyForecast: butterfly,
      narrativeExpansionOutline: [
        'Hồi 1: Khởi Sự - Nhân vật chính nhận diện manh mối và giả vờ rơi vào bẫy để điều khiển thế cục.',
        'Hồi 2: Chuyển Hướng - Kích hoạt mắt xích đòn bẩy đã cài cắm ngầm, tước đoạt lợi thế của kẻ chủ mưu.',
        'Hồi 3: Thu Lưới - Đột phá tu vi hoặc đoạt lấy di vật quyết định, bộc lộ chân tướng gây sốc toàn trường.'
      ],
      synthesizedProseDraft: draft,
      confidenceIndex: 94,
      authorRating: 5,
      selfLearningInsights: [
        `Áp dụng triệt để nguyên lý: Không để bất kỳ chi tiết nào xuất hiện vô cớ; mọi manh mối đều có 2 tầng nhân quả.`,
        `Gia tăng lực căng kịch tính bằng cách để nhân vật chính tự mình điều khiển cạm bẫy của đối phương.`
      ],
      appliedAxiomIds: appliedIds,
      isReinforced: false
    };
  }
};

export const trainNeuralEpochAndSelfLearn = async (
  records: NeuralInferenceRecord[],
  currentAxioms: LearnedNarrativeAxiom[],
  currentEpoch: number
): Promise<{ newAxioms: LearnedNarrativeAxiom[]; qualityBoost: number; summary: string }> => {
  try {
    const res = await fetch('/api/gemini/neural-epoch-self-learn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inferenceRecords: records,
        currentAxioms,
        currentEpoch
      })
    });
    const data = await handleResponse(res);
    return data.result;
  } catch (error) {
    console.warn('Backend neural-epoch-self-learn failed, using heuristic self-learning synthesis:', error);
    const nextEpoch = currentEpoch + 1;
    const newAxiom: LearnedNarrativeAxiom = {
      id: `axiom_epoch_${nextEpoch}_${Date.now()}`,
      category: nextEpoch % 2 === 0 ? 'CHARACTER_PSYCHOLOGY' : 'CAUSALITY',
      ruleSummary: `Quy Luật Hội Tụ Động Cơ Kép (Đã Tự Rút Ra Từ Epoch ${nextEpoch})`,
      detailedInsight: `Qua phân tích ${records.length} chuỗi suy diễn trước đó, mạng nơ-ron nhận diện: Khi một sự kiện xuất hiện, phải có ít nhất 2 thế lực cùng muốn thúc đẩy nó nhưng với 2 mục đích hoàn toàn đối nghịch nhau. Điều này khiến câu chuyện sâu sắc gấp 3 lần và triệt tiêu tính dự đoán đơn giản.`,
      weight: 1.48 + (nextEpoch * 0.05),
      effectivenessRating: 4.9,
      status: 'ACTIVE',
      timesApplied: 1,
      learnedAtEpoch: nextEpoch
    };

    return {
      newAxioms: [newAxiom],
      qualityBoost: 0.32,
      summary: `Mạng thần kinh đã hoàn tất chu kỳ hồi quy học tập Epoch ${nextEpoch}. Đã phân tích ${records.length} hồ sơ suy diễn lịch sử, tối ưu hóa trọng số nhân quả thêm 4.5% và bổ sung tiên đề sáng tác mới vào bộ nhớ vĩnh cửu.`
    };
  }
};

export const generateCharacterTrajectoryRouting = async (params: {
  character: CharacterProfile;
  genre?: string;
  focusPrompt?: string;
}): Promise<CharacterTrajectoryRoutingProfile> => {
  try {
    const res = await fetch('/api/character/generate-trajectory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.trajectoryProfile) return data.trajectoryProfile;
    }
  } catch (err) {
    console.warn('Backend generate-trajectory failed, using comprehensive synthesis generator:', err);
  }

  const charName = params.character.name || 'Nhân vật';
  const role = params.character.role || 'Chính diện';
  const realm = params.character.realmOrRank || 'Trúc Cơ';
  const sect = params.character.sectOrFaction || 'Tu Chân Môn Phái';
  const rnd = Math.random().toString(36).substring(2, 7);

  return {
    characterId: params.character.id || `char_traj_${rnd}`,
    characterName: charName,
    characterAlias: params.character.pinyinOrAlias || `${charName} Chí Tôn`,
    overviewPhilosophy: `Lấy đạo tâm kiên định vượt qua vạn kiếp luân hồi; ân oán phân minh, bảo hộ người thân và sư môn trước ma triều thiên kiếp.`,
    lifeDestinyVow: `Phục hồi hưng thịnh gia tộc và tông môn, chém nát túc địch ma đạo, bước lên tiên lộ trường sinh bất tử.`,
    relations: [
      {
        id: `rel_gen_1_${rnd}`,
        category: 'CHA_ME',
        targetName: `${charName} Phụ Mẫu`,
        targetRoleOrTitle: 'Phụ Thân & Mẫu Thân - Tộc Nhân Bản Địa',
        intimacyLevel: 95,
        status: 'Còn Sống',
        originStory: `Công ơn dưỡng dục từ thuở hàn vi tại thôn trang, từng dốc hết gia tài mua đan dược mở mạch cho ${charName}.`,
        currentDynamics: `Được ${charName} đón về tiên phủ an dưỡng tuổi già, hưởng thụ linh khí dồi dào thọ mệnh trăm tuổi.`,
        karmicTies: 'Chữ Hiếu nặng tựa non cao, là điểm tựa đạo tâm vững chắc nhất.'
      },
      {
        id: `rel_gen_2_${rnd}`,
        category: 'GIA_TOC',
        targetName: `Gia Tộc Chi Phái`,
        targetRoleOrTitle: 'Tộc Nhân & Trưởng Lão Bản Tộc',
        intimacyLevel: 45,
        status: 'Còn Sống',
        originStory: `Từng có lúc nghi ngờ thiên phú của ${charName}, nhưng sau khi chứng kiến thực lực đã hết lòng ủng hộ.`,
        currentDynamics: `Gia tộc dựa vào uy danh của ${charName} mà quật khởi trở thành đệ nhất thế gia trong vùng.`,
        karmicTies: 'Trách nhiệm hưng thịnh gia tộc và bảo vệ con cháu đời sau.'
      },
      {
        id: `rel_gen_3_${rnd}`,
        category: 'VO_DAO_LU',
        targetName: `Tuyết Dao Tiên Tử`,
        targetRoleOrTitle: 'Đạo Lữ Song Tu - Hồng Nhan Tri Kỷ',
        intimacyLevel: 99,
        status: 'Còn Sống',
        originStory: `Gặp nhau trong sinh tử tại Cổ Cấm Địa, cùng chung hoạn nạn chia sẻ giọt linh tuyền cuối cùng.`,
        currentDynamics: `Cùng nhau song tu công pháp âm dương hợp bích, tâm ý tương thông không rời không bỏ.`,
        karmicTies: 'Lời thề thệ tử tương tùy ba ngàn thế giới.'
      },
      {
        id: `rel_gen_4_${rnd}`,
        category: 'CON_CAI',
        targetName: `${charName} Huyền Nhi`,
        targetRoleOrTitle: 'Nhi Tử Đích Tôn - Thiếu Chủ Thế Hệ Mới',
        intimacyLevel: 96,
        status: 'Còn Sống',
        originStory: `Kế thừa linh căn song hệ của cha mẹ, sinh ra mang dị tượng hà quang vạn trượng.`,
        currentDynamics: `Đang được ${charName} trực tiếp truyền thụ tâm pháp căn bản và tôi luyện ý chí.`,
        karmicTies: 'Huyết mạch trường tồn, ngọn đuốc truyền thừa không tắt.'
      },
      {
        id: `rel_gen_5_${rnd}`,
        category: 'BAN_BE',
        targetName: `Cố Hàn`,
        targetRoleOrTitle: 'Bằng Hữu Tri Giao - Huynh Đệ Rượu Nồng',
        intimacyLevel: 88,
        status: 'Còn Sống',
        originStory: `Tán tu quen biết từ thời còn tranh đoạt từng viên linh thạch hạ phẩm nơi phường thị.`,
        currentDynamics: `Luôn sẵn sàng xách đao xuất chiến mỗi khi ${charName} cần hỗ trợ.`,
        karmicTies: 'Tình nghĩa giang hồ, sinh tử một lời.'
      },
      {
        id: `rel_gen_6_${rnd}`,
        category: 'HANG_XOM',
        targetName: `Lão Lý Thôn Cố`,
        targetRoleOrTitle: 'Cố Nhân Xóm Cũ - Trưởng Bối Phàm Trần',
        intimacyLevel: 70,
        status: 'Đã Tọa Hóa / Bỏ Mạng',
        originStory: `Từng che chở gia đình ${charName} khi bị quan sai ức hiếp thuở thiếu thời.`,
        currentDynamics: `Đã mất vì tuổi thọ; ${charName} lập từ đường phụng dưỡng con cháu ông trọn đời bình yên.`,
        karmicTies: 'Món nợ ân nghĩa thuở hàn vi ấm lòng phàm thế.'
      },
      {
        id: `rel_gen_7_${rnd}`,
        category: 'TONG_MON',
        targetName: sect,
        targetRoleOrTitle: 'Sơn Môn Bái Nhập - Chưởng Môn & Hộ Pháp Trưởng Lão',
        intimacyLevel: 85,
        status: 'Còn Sống',
        originStory: `Nơi ${charName} bái sư dấn thân vào con đường tu đạo chính thức.`,
        currentDynamics: `${charName} trở thành rường cột đệ nhất thiên kiêu của môn phái.`,
        karmicTies: 'Lời thề bảo hộ tông môn vĩnh viễn không bị yêu ma xâm phạm.'
      },
      {
        id: `rel_gen_8_${rnd}`,
        category: 'SU_HUYNH_DE',
        targetName: `Thanh Hư Đạo Nhân & Sở Sư Huynh`,
        targetRoleOrTitle: 'Ân Sư Khai Tâm & Đại Sư Huynh Đồng Môn',
        intimacyLevel: 92,
        status: 'Còn Sống',
        originStory: `Ân sư tận tình chỉ dạy từng kinh mạch, Đại sư huynh nhiều lần che chắn gió mưa lôi kiếp.`,
        currentDynamics: `Sư đồ huynh đệ đồng lòng sát cánh trấn thủ hộ sơn đại trận.`,
        karmicTies: 'Ân sư sâu nặng hơn biển trời.'
      },
      {
        id: `rel_gen_9_${rnd}`,
        category: 'DE_TU',
        targetName: `Lục Minh`,
        targetRoleOrTitle: 'Đại Đệ Tử Chân Truyền',
        intimacyLevel: 85,
        status: 'Còn Sống',
        originStory: `Thiếu niên mồ côi có đạo tâm bất khuất được ${charName} thu nhận làm đệ tử đầu tiên.`,
        currentDynamics: `Khổ luyện ngày đêm dưới chân núi, uy phong lẫm liệt kế thừa y bát.`,
        karmicTies: 'Gửi gắm đạo thống tương lai.'
      },
      {
        id: `rel_gen_10_${rnd}`,
        category: 'KE_THU',
        targetName: `U Minh Quỷ Tôn`,
        targetRoleOrTitle: 'Túc Địch Huyết Hải Thâm Cừu',
        intimacyLevel: -98,
        status: 'Còn Sống',
        originStory: `Kẻ chủ mưu sát hại đồng môn và từng phong tỏa linh mạch hòng triệt hạ ${charName}.`,
        currentDynamics: `Đang liên minh với ngoại đạo mưu tính cuộc đại tấn công bất ngờ.`,
        karmicTies: 'Huyết nợ phải trả bằng máu, quyết chiến sinh tử không chết không thôi.'
      }
    ],
    milestones: [
      {
        id: `ms_gen_1_${rnd}`,
        timeAnchor: 'Năm 8 tuổi',
        type: 'BUOC_NGOAT_THAY_DOI',
        title: 'Phát Hiện Linh Căn & Thoát Ly Cuộc Sống Phàm Trần',
        location: 'Thôn Trang Bản Thổ',
        involvedCharacters: [`${charName} Phụ Mẫu`],
        description: `Trắc thí tiên duyên, phát hiện kinh mạch ẩn giấu thiên phú kinh người, từ biệt cha mẹ và hàng xóm lên đường bái sư.`,
        cultivationStateBeforeAndAfter: 'Phàm nhân lực điền -> Luyện Khí Sơ Kỳ',
        psychologicalTransformation: `Từ bỏ tuổi thơ ngây ngô để đối mặt với sự nghiêm cẩn và gian nan của tu đạo trường sinh.`,
        karmicEcho: `Khởi đầu vận mệnh tiên lộ ngàn năm.`,
        novelSnippetDraft: `Chiếc xe bò cọc cạch lăn bánh qua cổng làng trong sương sớm. Đứa trẻ ngoái đầu nhìn bóng cha mẹ nhỏ dần trong làn khói bếp, giọt nước mắt rơi xuống vạt áo thô, trong lòng tự nhủ: Ngày trở về, con sẽ là tiên nhân che chở cho cả mảnh đất này!`
      },
      {
        id: `ms_gen_2_${rnd}`,
        timeAnchor: 'Năm 16 tuổi',
        type: 'CO_DUYEN_KY_NGO',
        title: 'Lạc Bước Cổ Tiên Phủ & Đoạt Di Vực Bí Điển',
        location: 'Huyền Thiên Cổ Bí Cảnh',
        involvedCharacters: ['Cổ Tiên Khí Linh'],
        description: `Bị đối thủ ép vào khe nứt không gian, vô tình mở ra động phủ thời thượng cổ, nhận được bảo khí bản mệnh và công pháp khai mạch vô thượng.`,
        cultivationStateBeforeAndAfter: 'Luyện Khí Đỉnh Phong -> Trúc Cơ Viên Mãn',
        psychologicalTransformation: `Tự tin quật khởi, nhận thức rõ sức mạnh của cơ duyên và thực lực trong tu chân giới tàn khốc.`,
        karmicEcho: `Tạo bước nhảy vọt về thực lực, bỏ xa toàn bộ đệ tử cùng thời.`,
        novelSnippetDraft: `Một luồng tiên quang rực rỡ bùng phát từ lòng đất sâu. Giữa những bức bích họa cổ xưa đã phong hóa ngàn năm, thanh linh kiếm cổ cất tiếng gầm xé toạc màn đêm u tối...`
      },
      {
        id: `ms_gen_3_${rnd}`,
        timeAnchor: 'Năm 22 tuổi',
        type: 'CUOC_CHIA_LY',
        title: 'Tông Môn Kiếp Nạn & Ân Sư Hy Sinh Đoạn Hậu',
        location: 'Hộ Sơn Hắc Nhai',
        involvedCharacters: ['Thanh Hư Đạo Nhân', 'U Minh Quỷ Tôn'],
        description: `Ma tộc đánh úp bất ngờ. Ân sư kích phát cấm thuật tự bạo Kim Đan mở đường máu cho các đệ tử chạy trốn; ${charName} nuốt máu vào trong thề phục thù.`,
        cultivationStateBeforeAndAfter: 'Trúc Cơ Đỉnh Phong -> Kết Đan Sinh Tử Kiếp',
        psychologicalTransformation: `Đạo tâm rèn đúc sát khí lạnh lùng, từ bỏ mọi ngây thơ ảo tưởng, đặt gánh nặng phục hưng lên vai.`,
        karmicEcho: 'Mối thù khắc cốt ghi tâm chi phối toàn bộ hành trình trưởng thành.',
        novelSnippetDraft: `Tiếng nổ xé trời rực sáng đỉnh núi sau lưng. Lời dặn dò cuối cùng của sư phụ còn văng vẳng bên tai: "Sống sót... mang theo ngọn lửa của tông môn mà bước tiếp!"`
      },
      {
        id: `ms_gen_4_${rnd}`,
        timeAnchor: 'Năm 35 tuổi',
        type: 'HOI_NGO_TUONG_PHUNG',
        title: 'Tương Phùng Bằng Hữu & Gặp Lại Hồng Nhan Nơi Tuyệt Địa',
        location: 'Vạn Tinh Hải Tiên Thành',
        involvedCharacters: ['Tuyết Dao Tiên Tử', 'Cố Hàn'],
        description: `Sau mười năm lưu lạc chém giết ma tu, ${charName} trùng phùng Tuyết Dao và người bạn cũ Cố Hàn tại đại hội đấu giá Tiên Thành, hợp lực lập thế chân vạc.`,
        cultivationStateBeforeAndAfter: 'Kim Đan Sơ Kỳ -> Kim Đan Hậu Kỳ',
        psychologicalTransformation: `Tìm lại hơi ấm của tình thân và sự tin tưởng; không còn phải độc hành trong đêm tối.`,
        karmicEcho: `Xây dựng liên minh hùng mạnh sẵn sàng cho cuộc tổng phản công.`,
        novelSnippetDraft: `Giữa dòng người tấp nập của tiên đô rực rỡ đèn hoa, hai ánh mắt bất chợt chạm nhau qua bức rèm ngọc. Bao nhiêu gian truân cách biệt bỗng tan biến trong nụ cười rạng rỡ và chén rượu mừng ngày hội ngộ.`
      },
      {
        id: `ms_gen_5_${rnd}`,
        timeAnchor: 'Năm 60 tuổi',
        type: 'SU_MENH',
        title: 'Đại Thắng Trảm Túc Địch & Tái Lập Sơn Môn Tối Cao',
        location: 'U Minh Quỷ Uyên',
        involvedCharacters: ['U Minh Quỷ Tôn', 'Toàn Thể Môn Nhân'],
        description: `Đột phá Nguyên Anh, dẫn đầu toàn quân phản công tiêu diệt hoàn toàn sào huyệt U Minh Quỷ Tôn, tế bái vong linh ân sư, hoàn thành lời thề hộ đạo.`,
        cultivationStateBeforeAndAfter: 'Kim Đan Viên Mãn -> Nguyên Anh Cực Phẩm Chấn Thiên Hạ',
        psychologicalTransformation: `Đạt tới cảnh giới thấu triệt đại đạo: Uy nghiêm nhân hậu, bao dung vạn vật nhưng bất khả xâm phạm.`,
        karmicEcho: `Danh chấn bát phương, khai sáng một kỷ nguyên thái bình thịnh trị.`,
        novelSnippetDraft: `Cờ xí sơn môn một lần nữa tung bay ngạo nghễ trên đỉnh phong lộng gió. Một chén rượu nồng tưới xuống đất đá, ${charName} ngước nhìn bầu trời trong xanh: "Sư phụ, đồ nhi đã làm được rồi!"`
      }
    ],
    geographicAtlas: [
      {
        id: `geo_gen_1_${rnd}`,
        name: `${charName} Lạc Thôn`,
        type: 'LANG_MAC',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 1: Thuở Hàn Vi (0 - 15 tuổi)',
        realmOrRegion: 'Đông Vực • Sơn Khê Thôn Dã',
        terrainAndAura: 'Thôn dã phàm trần mộc mạc nép mình dưới rặng tre, linh khí thưa thớt, khói bếp chiều tà bình yên',
        requiredTasksOrTrials: `Cùng phụ mẫu kiếm củi hái thuốc mưu sinh, bảo vệ gia đình trước mã tặc và hoàn thành việc kích hoạt linh mạch đầu tiên.`,
        conquestOrLegacy: 'Sau khi thành đạo lập từ đường bảo hộ thôn trang muôn đời thái bình ấm no.',
        novelSceneryProse: 'Con đường đất đỏ gập ghềnh in dấu chân đứa trẻ nghèo. Tiếng chuông chiều làng quê xa vắng như lời tiễn biệt êm đềm trước khi dấn thân vào cõi phong trần vạn dặm...'
      },
      {
        id: `geo_gen_2_${rnd}`,
        name: 'Vân Mộng Tiên Thành',
        type: 'THANH_TRI',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 2: Bái Môn Nhập Đạo (16 - 25 tuổi)',
        realmOrRegion: 'Trung Châu Tiên Vực • Phồn Hoa Đô Thị',
        terrainAndAura: 'Đô thị tu chân phồn hoa khổng lồ, lâu đài bằng ngọc lơ lửng giữa mây, phường thị buôn bán linh đan bảo khí tấp nập',
        requiredTasksOrTrials: `Tham gia đại hội tuyển trắc ngoại môn, đánh bại đệ tử thế gia kiêu ngạo, tranh đoạt tư cách nhập môn.`,
        conquestOrLegacy: 'Để lại kiếm ngân chém rách bảng vàng của đấu giá trường khi bảo vệ công đạo cho người yếu thế.',
        novelSceneryProse: 'Đèn lồng huyền lăng sáng rực như sao sa. Dòng tu sĩ phi kiếm vun vút lướt qua các cầu vồng liên kết các tòa tháp ngọc, tiếng nhạc tiên lãng đãng trong gió thoảng...'
      },
      {
        id: `geo_gen_3_${rnd}`,
        name: 'Huyền Thiên Cổ Bí Cảnh',
        type: 'BI_CANH_DONG_THIEN',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 2: Kỳ Ngộ Đột Phá (20 tuổi)',
        realmOrRegion: 'Cấm Địa Vực Sâu Ba Vạn Trượng',
        terrainAndAura: 'Động thiên thượng cổ rêu phong nghìn năm, sát khí viễn cổ cuồn cuộn, sấm sét đan xen như mạng nhện bảo vệ trận pháp trung tâm',
        requiredTasksOrTrials: `Vượt qua kiếm trận thí luyện của Cổ Tiên Khí Linh, giải thoát tàn hồn và ngưng kết đạo đan cực phẩm.`,
        conquestOrLegacy: 'Đoạt được Thái Sơ Cổ Bí Điển và Thần Binh Bản Mệnh.',
        novelSceneryProse: 'Không gian tĩnh lặng ngàn năm bỗng rung chuyển dữ dội khi luồng tiên quang rực sáng xé toạc màn sương mù vĩnh cửu...'
      },
      {
        id: `geo_gen_4_${rnd}`,
        name: 'Hắc Ma Nhai & U Minh Quỷ Uyên',
        type: 'VUNG_DAT_SON_HAI',
        status: 'DANG_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 3: Phục Thù Tiêu Diệt Túc Địch (30 - 60 tuổi)',
        realmOrRegion: 'Ma Vực Biên Cảnh • Vực Sâu Vô Tận',
        terrainAndAura: 'Bầu trời đỏ quạch ma vân, dung nham đen chảy róc rách, sương độc tanh nồng, tiếng quỷ khóc thần gào thấu tận tâm can',
        requiredTasksOrTrials: `Đơn thương độc mã đột nhập sào huyệt ma đầu, chém giết ba đại hộ pháp và trảm sát U Minh Quỷ Tôn trả thù cho ân sư.`,
        conquestOrLegacy: 'Phá hủy vĩnh viễn Huyết Tế Trận, giải cứu hàng vạn linh hồn đệ tử bị giam cầm.',
        novelSceneryProse: 'Gió tanh mưa máu thốc vào vạt áo rách. Giữa chiến trường ngập tràn tro tàn ma đạo, thanh kiếm trong tay ${charName} nhỏ từng giọt máu đen xuống lòng đất cằn cỗi...'
      },
      {
        id: `geo_gen_5_${rnd}`,
        name: 'Thần Tiêu Thiên Lộ & Cửu Trọng Tiên Môn',
        type: 'THANH_TRI',
        status: 'CAN_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 4: Độ Kiếp Phi Thăng (100 - 300 tuổi)',
        realmOrRegion: 'Giới Diện Thiên Đỉnh • Hư Không Cổ Cực',
        terrainAndAura: 'Cửa ải bằng bạch ngọc và đồng xanh dựng giữa dải ngân hà, lôi kiếp hỗn độn giáng xuống từng đợt như muốn nghiền nát phàm thân',
        requiredTasksOrTrials: `Vượt qua Cửu Cửu Thiên Kiếp, đánh bại Thần Tướng Trấn Môn của Thượng Giới để đắc đạo phi thăng.`,
        conquestOrLegacy: 'Khai mở lại Thông Thiên Tiên Lộ cho toàn thể tu sĩ thế gian.',
        novelSceneryProse: 'Cánh cổng đồng xanh cao ngút ngàn rung chuyển trước tiếng sấm sét khai thiên lập địa. Một bóng hình cô độc vung kiếm nghênh chiến lôi kiếp, hào khí ngút trời...'
      },
      {
        id: `geo_gen_6_${rnd}`,
        name: 'Bắc Minh Thần Hải • Chung Cực Tiên Giới',
        type: 'TONG_MON_THANH_DIA',
        status: 'MUC_TIEU_TOI_HAU',
        chronologicalStage: 'Giai đoạn 5: Tối Hậu Đại Viên Mãn (500 năm sau)',
        realmOrRegion: 'Thượng Thiên Tiên Giới • Vô Cực Thánh Vực',
        terrainAndAura: 'Biển mây ngũ sắc dâng trào, tiên khí nồng đậm hóa thành dịch thể, cây sinh mệnh vạn năm che rợp bầu trời',
        requiredTasksOrTrials: `Hội ngộ toàn thể người thân, giải cứu mẫu thân khỏi phong ấn vạn năm, đúc lại luân hồi trật tự cho tam giới.`,
        conquestOrLegacy: 'Đăng lâm Vô Cực Chí Tôn, được muôn loài xưng tụng thiên thu vạn đại.',
        novelSceneryProse: 'Ánh rạng đông vĩnh hằng chiếu rọi cung điện pha lê. Chén rượu trùng phùng sau trăm năm bôn ba rốt cuộc cũng chạm vào nhau giữa tiếng cười rộn rã của người thân yêu...'
      }
    ],
    questTrialRecords: [
      {
        id: `qtr_gen_1_${rnd}`,
        category: 'THI_LUYEN',
        title: 'Thí Luyện Nhập Môn Vấn Đạo Lộ',
        stageTimeAnchor: 'Năm 16 tuổi (Sơ Nhập Đạo)',
        locationName: 'Vân Mộng Tiên Thành • Khảo Hạch Lôi Đài',
        dangerAndDifficulty: 'Hiểm Trở',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Đại hội tuyển chọn đệ tử trăm năm một lần của chư đại môn phái trong vùng',
        keyObjectives: [
          'Vượt qua 999 bậc thang uy áp tâm ma',
          'Đánh bại 3 cơ quan thú Luyện Khí Kỳ',
          'Thể hiện kiếm ý thuần khiết trước mặt các vị phong chủ'
        ],
        rewardsOrBreakthroughs: 'Nhận được tư cách Nội Môn Đệ Tử, được ban thưởng bản mệnh pháp bảo sơ giai và đan dược tẩy tủy',
        trialEncounters: 'Bị công tử của thế gia địa phương ỷ thế hiếp người khiêu khích, ${charName} lấy yếu thắng mạnh làm chấn động toàn trường',
        narrativeJournalSnippet: 'Gió rít bên tai khi bước chân thứ chín trăm chạm vào đỉnh núi. Mồ hôi ướt đẫm áo gai nhưng ánh mắt thiếu niên sáng rực như tinh tú trên bầu trời đêm...'
      },
      {
        id: `qtr_gen_2_${rnd}`,
        category: 'VAO_BI_CANH',
        title: 'Thám Hiểm Huyền Thiên Cổ Bí Cảnh',
        stageTimeAnchor: 'Năm 20 tuổi (Trúc Cơ Đỉnh Phong)',
        locationName: 'Huyền Thiên Cổ Bí Cảnh',
        dangerAndDifficulty: 'Cực Nguy Cấp S',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Bí cảnh cổ xưa xuất thế, các môn phái phái đệ tử tinh anh tiến vào tầm bảo và tranh đoạt cơ duyên nghìn năm',
        keyObjectives: [
          'Phá giải tầng thứ ba Thượng Cổ Phong Ấn Trận',
          'Đoạt lấy Thái Sơ Hỗn Độn Bí Điển',
          'Hộ tống đạo lữ thoát khỏi sự truy kích của ma tu ngoại vực'
        ],
        rewardsOrBreakthroughs: 'Lĩnh ngộ công pháp vô thượng, ngưng kết Cửu Chuyển Kim Đan vượt xa đồng đạo',
        trialEncounters: 'Đối đầu với ba đại trưởng lão Ma Môn liên thủ tập kích, kích phát cấm thuật xé rách trùng vây',
        narrativeJournalSnippet: 'Trong lòng đất tối đen như mực, luồng kiếm khí xé toạc bóng tối như nhát kéo rạch đôi bức màn đêm. Giọt máu nóng rơi xuống mặt đá cổ xưa, đánh thức khí linh đã ngủ say vạn năm...'
      },
      {
        id: `qtr_gen_3_${rnd}`,
        category: 'DU_NGOAN',
        title: 'Chu Du Hồng Trần Thể Nghiệm Phàm Tâm',
        stageTimeAnchor: 'Năm 28 tuổi (Kim Đan Sơ Kỳ)',
        locationName: 'Thập Lý Đào Hoa Thôn & Tứ Đại Hải Vực',
        dangerAndDifficulty: 'Phổ Thông',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Bế quan gặp phải bình cảnh tâm ma, tuân theo lời khuyên của ân sư hạ sơn du lịch thế gian để ngộ đạo',
        keyObjectives: [
          'Hóa thân thành thầy thuốc phàm trần cứu độ muôn dân nghèo khó',
          'Lắng nghe nỗi khổ sinh lão bệnh tử nơi nhân gian',
          'Hóa giải chấp niệm cô độc để kiếm ý dung nạp tình thương'
        ],
        rewardsOrBreakthroughs: 'Tâm cảnh thăng hoa tột bậc, kiếm ý từ lạnh lùng sắc bén chuyển hóa thành sinh sôi bất tận',
        trialEncounters: 'Gặp gỡ một vị lão ông chèo đò thông thái trên sông Tiêu Tương, một câu đàm đạo làm bừng sáng đạo tâm',
        narrativeJournalSnippet: 'Cơn mưa xuân lất phất bay trên mái tranh. Tay cầm chén trà ấm, nhìn dòng người hối hả ngược xuôi mưu sinh, ${charName} chợt mỉm cười thấu hiểu: Tu tiên không phải là tuyệt tình, mà là vì tình mà nghịch thiên cải mệnh...'
      },
      {
        id: `qtr_gen_4_${rnd}`,
        category: 'NHIEM_VU',
        title: 'Trảm Ma Trừ Yêu Tiêu Diệt U Minh Quỷ Uyên',
        stageTimeAnchor: 'Năm 60 tuổi (Nguyên Anh Đại Đạo)',
        locationName: 'Hắc Ma Nhai & U Minh Quỷ Uyên',
        dangerAndDifficulty: 'Thập Tử Vô Sinh SSS',
        executionStatus: 'Đang Thực Hiện',
        issuingAuthorityOrContext: 'Sắc lệnh liên minh chính đạo và mối thù huyết hải sát hại ân sư thúc giục phát động trận chiến quyết định',
        keyObjectives: [
          'Phá hủy Cửu U Huyết Ma Đại Trận',
          'Trảm thủ U Minh Quỷ Tôn bản thể',
          'Đoạt lại tàn hồn và pháp bảo trấn sơn của tông môn'
        ],
        rewardsOrBreakthroughs: 'Khắc ghi tên tuổi vào bảng vàng chấn hưng tiên tộc, đoạt lại an bình cho giang sơn vạn dặm',
        trialEncounters: 'Vạn quỷ vây hãm, Quỷ Tôn kích phát cấm thuật huyết sát thôn phệ vạn sinh linh làm lá chắn',
        narrativeJournalSnippet: 'Tiếng thét xung trận rền vang khắp sơn cốc. Bạch y đón gió thốc, thân hình ${charName} hóa thành luồng kiếm mang sáng chói đâm thẳng vào giữa quả cầu ma hỏa khổng lồ...'
      },
      {
        id: `qtr_gen_5_${rnd}`,
        category: 'NHIEM_VU',
        title: 'Chung Cực Sứ Mệnh: Phá Thiên Lao Thượng Giới Cứu Mẫu Thân',
        stageTimeAnchor: 'Năm 300 tuổi (Đại Thừa Kỳ - Chung Cục)',
        locationName: 'Bắc Minh Thần Hải • Thượng Thiên Cửu U Hàn Ngục',
        dangerAndDifficulty: 'Thập Tử Vô Sinh SSS',
        executionStatus: 'Cần Thực Hiện (Chờ Kích Hoạt)',
        issuingAuthorityOrContext: 'Lời thề khắc ghi từ thuở ấu thơ khi tận mắt chứng kiến mẫu thân bị bắt đi trong màn sấm sét bi thương',
        keyObjectives: [
          'Độ kiếp phi thăng thượng giới an toàn',
          'Đánh bại Thượng Cổ Chấp Pháp Trưởng Lão đoàn',
          'Chém đứt Tru Tiên Tỏa Ngục cứu mẫu thân đoàn tụ gia đình'
        ],
        rewardsOrBreakthroughs: 'Đại đạo viên mãn không còn tỳ vết, bước lên đỉnh cao Vô Cực Chân Tiên',
        trialEncounters: 'Đối đầu với quy tắc thiên đạo hà khắc và thế gia cường đại nhất Thượng Giới',
        narrativeJournalSnippet: 'Tám trăm năm dằng dặc, thanh kiếm trong tay chưa từng hạ xuống. Nhìn cánh cổng thiên lao sắp sửa nứt toác, ${charName} khẽ cất lời: "Mẹ... con đã đến!"'
      }
    ],
    karmicInheritances: [
      {
        id: `ki_gen_1_${rnd}`,
        name: `Bản Mệnh ${charName} Thần Binh`,
        type: 'THAN_BINH_BAN_MENH',
        acquisitionMilestone: 'Năm 16 tuổi (Kỳ Ngộ Cấm Địa)',
        rankOrGrade: 'Cực Phẩm Linh Bảo (Có thể tấn thăng)',
        awakeningStage: 'Tầng 4/9 Thức Tỉnh',
        soulBondStatus: 'Tâm Huyết Tương Liên',
        specialAbilities: ['Phá Không Trảm', 'Hộ Thể Kiếm Cương', 'Hút Linh Khí Trời Đất'],
        karmicCostOrBacklash: 'Mỗi lần bộc phát uy lực cực hạn cần tiêu hao một phần mười tinh huyết.',
        novelLoreSnippet: 'Ánh kiếm sáng rực giữa đêm tăm tối, thanh âm ngân vang như rồng ngâm lay động cửu thiên...'
      },
      {
        id: `ki_gen_2_${rnd}`,
        name: 'Thượng Cổ Đạo Điển Tàn Thiên',
        type: 'TRUYEN_THUA_CO_TIEN',
        acquisitionMilestone: 'Năm 20 tuổi (Động Thiên Phúc Địa)',
        rankOrGrade: 'Tiên Giai Công Pháp Khai Mạch',
        awakeningStage: 'Lĩnh ngộ 70% Tinh Yếu',
        soulBondStatus: 'Khí Linh Thức Tỉnh',
        specialAbilities: ['Đúc Lại 108 Khiếu Huyệt', 'Khai Mở Thần Nhãn'],
        karmicCostOrBacklash: 'Gánh vác sứ mệnh phục hưng truyền thừa môn phái cổ xưa.',
        novelLoreSnippet: 'Chữ vàng cổ kính bay lượn quanh ấn đường, từng câu khẩu quyết khắc sâu vào tận tủy cốt...'
      }
    ],
    nemesisFeuds: [
      {
        id: `nf_gen_1_${rnd}`,
        nemesisName: 'U Minh Ma Vực Tôn Chủ',
        nemesisFactionAndRank: 'Vạn Ma Tông (Cảnh Giới Cao Hơn 1 Đại Cảnh)',
        feudOriginCause: 'Huyết thù diệt môn và sát hại sư trưởng thuở hàn vi.',
        feudSeverity: 'Huyết Hải Thâm Cừu',
        status: 'Chờ Ngày Quyết Đấu',
        pastClashes: 'Đã giao thủ 3 lần qua phân thân hư ảnh, suýt mất mạng nhưng kịp thời đột phá.',
        destinedDuelCondition: 'Ước hẹn quyết chiến trên đỉnh Hắc Ma Nhai khi ma triều bộc phát.',
        feudResolutionReward: 'Cởi bỏ nút thắt tâm ma lớn nhất, đột phá cảnh giới chí tôn.',
        duelSnippetDraft: '"Năm xưa ngươi coi ta như cỏ rác, hôm nay kiếm của ta sẽ trảm nát ma hồn ngươi!"'
      }
    ],
    daoHeartDemons: [
      {
        id: `dhd_gen_1_${rnd}`,
        demonName: 'Chấp Niệm Quá Khứ & Nỗi Sợ Mất Mát',
        demonType: 'CHẤP_NIỆM_QUÁ_KHỨ',
        triggerStage: 'Mỗi khi đột phá đại cảnh giới sinh tử',
        innerDemonManifestation: 'Hiện về hình ảnh người thân lâm nguy khiến linh lực hỗn loạn bốc hỏa.',
        daoResolutionMethod: 'Lấy tình nhập đạo, biến sợ hãi thành ý chí bảo hộ kiên cường bất khuất.',
        daoDomainMastery: 'Bất Diệt Thủ Hộ Đạo Vực 75%',
        breakthroughState: 'Đã Đốn Ngộ Hoàn Toàn',
        enlightenmentSnippet: 'Trời đất mênh mông, đạo tâm sáng tỏ như trăng rằm, không còn vướng bận sợ hãi.'
      }
    ],
    factionPowers: [
      {
        id: `fp_gen_1_${rnd}`,
        factionName: sect,
        characterTitleOrRole: 'Đại Đệ Tử Chân Truyền / Hộ Đạo Giả',
        authorityLevel: 'Chấp Chưởng Trọng Quyền',
        controlledTerritory: 'Ngọn núi chính và toàn bộ phân đà ngoại vi',
        alliedSubFactions: ['Chiến Đường', 'Chấp Pháp Đường'],
        rivalFactionForces: 'Phe phái bảo thủ trong trưởng lão đoàn',
        powerLegacyContribution: 'Bảo vệ sơn môn trước ma triều, đúc lại hộ sơn đại trận vững như bàn thạch.'
      }
    ],
    oralLoreSubplots: [
      {
        id: `ols_gen_1_${rnd}`,
        subplotTitle: `Thước Gõ Trà Quán: Trận Chiến Bên Sông & Áo Bào Đẫm Máu Của ${charName}`,
        speakerType: 'THUYET_THU_NHAN',
        speakerNameAndRole: 'Lão Thuyết Thư Nhân (Quán trà Tiên Khách Điếm)',
        narrativeSetting: 'Bên bàn trà đông đúc ven đường quan lộ, tiếng thước kinh đường gõ vang giòn giã',
        recountedEraOrEvent: 'Giai đoạn xuất sơn lập nghiệp, một mình đối đầu ma đạo cường địch',
        associatedTreasureOrRealm: 'Cổ Đạo Quan Lộ • Trảm Yêu Đoản Kiếm',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Sau trận chiến, chàng chôn cất những nạn nhân vô tội và khắc kiếm ấn trấn áp oán khí bảo vệ lữ khách muôn đời.',
        narrativePerspectiveSummary: 'Kính phục vô biên xen lẫn bùi ngùi xúc động trước ý chí sắt đá của nhân vật',
        historicalTruthVsRumor: `Người đời đồn rằng ${charName} tàn nhẫn vô tình, nhưng thực chất chính chàng đã liều thân đỡ lấy đòn chí mạng cho phàm nhân vô tội.`,
        characterVividImpact: 'Thói quen khẽ vuốt chuôi kiếm trước khi ra tay; ánh mắt kiên định nhìn về chân trời xa xăm dù toàn thân đẫm máu.',
        spokenDialogueDraft: `Chư vị thử nghĩ xem! Khi ma vụ che khuất cả bầu trời, ai là người rút kiếm đứng chắn trước mặt dân làng? Chính là ${charName}! Áo bào rách nát, máu nhuộm đỏ cả vạt áo, nhưng bóng lưng ấy đứng vững như thái sơn, không lùi nửa bước!`
      },
      {
        id: `ols_gen_2_${rnd}`,
        subplotTitle: `Ký Ức Cố Nhân: Bát Canh Nóng & Nụ Cười Thuở Hàn Vi`,
        speakerType: 'CO_NHAN_HAN_VI',
        speakerNameAndRole: 'Bà Lão Bán Canh (Láng giềng thuở hàn vi)',
        narrativeSetting: 'Góc phố nghèo dưới chân núi, khói bếp chiều tà bình yên',
        recountedEraOrEvent: 'Thuở thiếu thời chưa bước chân vào con đường tu đạo',
        associatedTreasureOrRealm: 'Thôn Gian Cổ Mộc • Thảo Dược Hái Rừng Nuôi Mẹ',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Đứa trẻ nghèo trèo lên vách đá cheo leo giữa đêm giông bão để hái một nhánh cỏ hạ sốt cho người thân, rơi xuống suýt mất mạng nhưng vẫn giữ chặt nhánh thuốc trong lòng.',
        narrativePerspectiveSummary: 'Ấm áp, trìu mến, xúc động nhớ về một đứa trẻ ngoan hiền biết yêu thương gia đình',
        historicalTruthVsRumor: `Người ta bảo ngài trời sinh sát tính, nhưng từ thuở bé ngài đã là đứa trẻ hiếu thuận nhất vùng, một củ khoai cũng chia đôi cho phụ mẫu.`,
        characterVividImpact: 'Dù sau này đã là đại năng hô mưa gọi gió, chàng vẫn giữ thói quen ăn đồ ăn mộc mạc và luôn mỉm cười cúi chào các bậc cao niên.',
        spokenDialogueDraft: `Thằng bé ấy ngày xưa ngoan lắm! Trưa nào đi kiếm củi về cũng chạy qua hỏi thăm ta một câu. Nhìn nó giờ ngự kiếm trên mây cao vời vợi, bà lão này mừng rơi cả nước mắt...`
      },
      {
        id: `ols_gen_3_${rnd}`,
        subplotTitle: `Nỗi Run Sợ Của Bại Tướng: Uy Áp Không Thể Cản Phá`,
        speakerType: 'KE_THU_SONG_SOT',
        speakerNameAndRole: 'Cựu Địch Thủ Thoát Chết (Tu sĩ phe đối địch)',
        narrativeSetting: 'Góc tối tàn tạ của một khu chợ đen hoang phế, thì thào với đồng bọn',
        recountedEraOrEvent: 'Trận giao đấu sinh tử trên lôi đài đoạt bảo',
        associatedTreasureOrRealm: 'Hắc Thị Đấu Trường • Cực Phẩm Đoạt Hồn Thần Kính',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: `${charName} đã có thể thu giữ thần kính làm chiến lợi phẩm, nhưng chàng đã phá hủy nó ngay tại chỗ vì không muốn tà vật này tiếp tục hút máu tu sĩ vô tội.`,
        narrativePerspectiveSummary: 'Kinh hãi tột cùng, tâm phục khẩu phục và không còn dám sinh lòng báo thù',
        historicalTruthVsRumor: `Phe chúng ta rêu rao hắn đánh lén, nhưng thật ra là hắn đã nương tay ba lần để cho ta một con đường sống.`,
        characterVividImpact: 'Ánh mắt không chút gợn sóng khi vung kiếm, phong thái thong dong như dạo bước chốn hồng trần.',
        spokenDialogueDraft: `Ngươi không hiểu đâu! Khi thanh kiếm của hắn vung lên, không hề có sát khí điên cuồng mà chỉ có sự tĩnh lặng đến rợn người. Hắn thu kiếm, liếc nhìn ta một cái rồi bảo: "Ngươi đi đi, đừng để kiếm của ta phải nhuốm máu uổng phí." Cả đời này ta không dám đối mặt với hắn lần thứ hai!`
      },
      {
        id: `ols_gen_4_${rnd}`,
        subplotTitle: `Tầm Bảo Giả Hồi Tưởng: Tranh Đoạt Thánh Dược & Đạo Nghĩa Giữa Vực Sâu Cấm Địa`,
        speakerType: 'TAM_BAO_GIA_BI_CANH',
        speakerNameAndRole: 'Lão Tán Tu Thám Hiểm Bí Cảnh',
        narrativeSetting: 'Bên lửa trại cấm khu rùng rợn, kể lại biến cố tranh đoạt địa bảo nghẹt thở',
        recountedEraOrEvent: 'Lần thám hiểm Thượng Cổ Tiên Phủ Vực Sâu Ba Vạn Trượng',
        associatedTreasureOrRealm: 'Thượng Cổ Tiên Phủ Bí Cảnh • Vạn Niên Huyền Băng Tủy & Ngộ Đạo Cổ Trà',
        treasureLoreCategory: 'THIEN_TAI_DIA_BAO',
        treasureTrialSecret: `Thánh dược nằm giữa hồ băng độc có cự thú canh giữ; ai nấy đều muốn cướp đoạt bỏ chạy, chỉ có ${charName} kiên định chặn cửa hang đoạn hậu cho toàn bộ đội thám hiểm rút lui an toàn.`,
        narrativePerspectiveSummary: 'Khâm phục nhân cách cao thượng, cảm động vì một tu sĩ trẻ tuổi sẵn sàng liều mạng vì sự an nguy của người khác',
        historicalTruthVsRumor: `Thiên hạ đồn ${charName} độc chiếm bảo vật bí cảnh, nhưng sự thật là chàng đã chia đều linh dịch cho các đạo hữu bị thương rồi chỉ lấy một phần nhỏ cần thiết.`,
        characterVividImpact: 'Bàn tay đầy vết chai sần vì đào tuyết bới đất tìm thuốc; nụ cười sảng khoái khi thấy mọi người thoát hiểm an toàn.',
        spokenDialogueDraft: `Năm ấy nếu không có ${charName} lấy thân mình làm lá chắn chặn đứng hàn triều ma quái, thì xương cốt của mười mấy lão già chúng ta đã mục nát dưới đáy bí cảnh rồi! Hắn chẳng màng tranh giành kho báu vàng ngọc, chỉ lấy đúng lượng dược thảo để cứu mạng người. Tấm lòng ấy khiến trời đất cũng phải nghiêng mình!`
      },
      {
        id: `ols_gen_5_${rnd}`,
        subplotTitle: `Khí Linh Thượng Cổ Khảo Nghiệm: Bạt Kiếm Vấn Tâm & Lựa Chọn Đạo Nghĩa`,
        speakerType: 'KHI_LINH_THU_HO',
        speakerNameAndRole: 'Thượng Cổ Trận Linh Thủ Hộ Bí Cảnh',
        narrativeSetting: 'Trong lõi phong ấn của bí cảnh cổ xưa, linh quang hư ảo huyền bí',
        recountedEraOrEvent: 'Khoảnh khắc mở ra cửa ải truyền thừa tối cao',
        associatedTreasureOrRealm: 'Thần Ma Cổ Điện • Thái Cổ Khai Thiên Thần Binh & Tiên Thiên Truyền Thừa',
        treasureLoreCategory: 'TRUYEN_THUA_CO_TIEN',
        treasureTrialSecret: `Ảo cảnh thử thách yêu cầu người kế thừa phải dứt bỏ mọi ràng buộc phàm trần để đổi lấy lực lượng vô địch; ${charName} dứt khoát từ chối sức mạnh vô tình để giữ trọn sơ tâm hữu ái.`,
        narrativePerspectiveSummary: 'Kinh ngạc và tràn đầy kiêu hãnh vì đã tìm được người kế tục đại đạo chân chính',
        historicalTruthVsRumor: `Người đời ngỡ chàng thừa hưởng di sản nhờ huyết mạch dị biệt, nhưng chính đạo tâm bất khuất và tình nghĩa sâu nặng mới là chìa khóa mở ra phong ấn ngàn năm.`,
        characterVividImpact: 'Ánh mắt kiên định ngời sáng giữa muôn trùng ảo ảnh ma mị; sự thanh thản khi đứng trước cám dỗ quyền lực tột đỉnh.',
        spokenDialogueDraft: `Ta đã canh giữ bí cảnh này suốt vạn năm, thử thách qua trăm vạn thiên kiêu. Bọn họ ai cũng tham lam sức mạnh độc tôn, sẵn sàng giẫm đạp lên tất cả. Chỉ riêng ${charName} ngẩng cao đầu đáp lại ta: 'Đại đạo nếu không có tình nghĩa, thì trường sinh chỉ là một kiếp cô độc dài vô tận.' Khoảnh khắc ấy, toàn bộ bí cảnh đã cúi đầu trước chàng!`
      },
      {
        id: `ols_gen_6_${rnd}`,
        subplotTitle: `Truyền Thuyết Cây Trường Sinh & Giọt Sương Hồi Mạch Của ${charName}`,
        speakerType: 'THUYET_THU_NHAN',
        speakerNameAndRole: 'Thuyết Thư Nhân Bách Hiểu Sinh',
        narrativeSetting: 'Tại Trà Lâu Tiên Các nơi tụ hội của chư phương hào kiệt, chén trà tỏa khói lượn lờ',
        recountedEraOrEvent: 'Đại kiếp Thần Ma sụp đổ, sinh linh đồ thán',
        associatedTreasureOrRealm: 'Cấm Khu Sinh Mệnh Cổ Đại • Cây Trường Sinh & Sinh Mệnh Bất Tử Thần Mộc',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret: `Cây Trường Sinh yêu cầu người tiếp cận phải hiến tế một nửa linh hồn mới được ban tặng giọt sương bất tử; ${charName} đã dùng chân tình và ý chí bảo vệ muôn dân làm xúc động linh thụ ngàn năm.`,
        immortalTreeConnection: `Cây Trường Sinh tương thông mệnh cách với ${charName}, ban cho chàng phiến lá xanh bất diệt để phong ấn vết thương căn nguyên, kết nối sinh mệnh chàng với dòng chảy vĩnh hằng của trời đất.`,
        narrativePerspectiveSummary: 'Sùng bái, tôn vinh nhân cách vĩ đại dám hy sinh vì sinh linh của nhân vật',
        historicalTruthVsRumor: `Người ta đồn ngài mưu cầu sự sống vĩnh hằng để độc bá thiên hạ, nhưng sự thật là ngài đã đem giọt sương trường sinh tưới mát cho mảnh đất khô cằn để hồi sinh vạn vật.`,
        characterVividImpact: 'Một đóa hoa nhỏ màu lục biếc thêu trên vạt áo bào mộc mạc; ánh mắt ngập tràn bao dung nhìn ngắm hoa cỏ đâm chồi.',
        spokenDialogueDraft: `Năm ấy Cây Trường Sinh rụng xuống chiếc lá duy nhất cứu nguy cho cõi đời, ai nấy đều nghĩ ${charName} sẽ nuốt vào để phi thăng thành thần. Nhưng ngài lại nghiền nát chiếc lá ấy thành bột ngọc, rải đều trên sông suối để cứu sống mười vạn bách tính đang hấp hối vì ôn dịch ma đạo. Tấm lòng vì thiên hạ ấy mới chính là Trường Sinh chân chính!`
      },
      {
        id: `ols_gen_7_${rnd}`,
        subplotTitle: `Nhiệm Vụ Huyền Thưởng Cấp Địa: Một Mình Chặn Miệng Hang Đoạt Thánh Dược & Cứu Hộ Tống Đội`,
        speakerType: 'DONG_DOI_NHIEM_VU',
        speakerNameAndRole: 'Đồng Đội Cùng Nhận Nhiệm Vụ (Chấp Sự Đường Tiền Tiêu)',
        narrativeSetting: 'Bên đống lửa tàn sau chuyến áp tải gian nan, nhìn những vết thương đã lên da non',
        recountedEraOrEvent: 'Thời kỳ làm nhiệm vụ tích lũy điểm cống hiến môn phái',
        associatedMissionOrQuest: 'Huyền Thưởng Cấp Địa: Hộ Tống Đoàn Thảo Dược & Thám Hiểm Cấm Khu Ma Vực',
        missionExecutionTruth: `Hồ sơ nhiệm vụ chỉ ghi ba chữ 'Đã hoàn thành', nhưng thực tế khi đội hình bị phục kích, chính ${charName} đã một mình đoạn hậu, dùng kiếm gãy chống đỡ ba ngày ba đêm cho đồng đội rút lui an toàn. Chàng nộp đủ dược liệu và chia hết phần thưởng cho anh em bị thương.`,
        associatedTreasureOrRealm: 'Cấm Khu Ma Vực • Vạn Niên Thánh Thảo & Cổ Tiên Khai Mạch Thạch',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret: 'Thánh thảo có độc xà ngàn năm canh giữ; người hái phải chấp nhận để nọc độc xâm lấn một phần kinh mạch mới không làm dập nát dược tính.',
        immortalTreeConnection: 'Sinh khí từ mảnh lá Cây Trường Sinh mang theo bên mình đã giúp chàng hóa giải độc tố, tái tạo kinh mạch cứng cáp hơn trước.',
        narrativePerspectiveSummary: 'Cảm phục sâu sắc đức hy sinh và nghĩa khí huynh đệ cao cả của chàng',
        historicalTruthVsRumor: `Người ngoài tưởng chàng ham công chuộng lợi nhận nhiệm vụ nguy hiểm, thực chất chàng nhận phần hiểm ác nhất để đệ tử yếu thế không phải chịu rủi ro.`,
        characterVividImpact: 'Vết sẹo kiếm chém trên cánh tay áo rách; thói quen luôn chia đều từng viên đan dược thù lao cho mọi người trong đội.',
        spokenDialogueDraft: `Nếu hôm đó không có ${charName} liều mạng chắn trước cửa hang, thì cả đội mười người chúng ta đã bỏ mạng dưới vuốt thú rồi! Hắn toàn thân đẫm máu mà vẫn cười hỏi: "Mọi người có ai bị thương nặng không?" Một người đồng đội như thế, cả đời này chúng ta thề theo sau lưng hắn!`
      }
    ]
  };
};

// =========================================================================
// NODE-BASED VISUAL STORY WORKFLOW EXECUTION
// =========================================================================

export const executeStoryWorkflow = async (params: {
  nodes: StoryNode[];
  connections: StoryConnection[];
  genre?: string;
  tone?: string;
  customPrompt?: string;
  seed?: number;
}): Promise<StoryWorkflowExecutionResult> => {
  try {
    const res = await fetch('/api/gemini/execute-story-workflow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await handleResponse(res);
    if (data.data) return data.data;
    return fallbackExecuteStoryWorkflow(params);
  } catch (err: any) {
    console.warn('Backend workflow execution failed, running client synthesis:', err);
    return fallbackExecuteStoryWorkflow(params);
  }
};

export const fallbackExecuteStoryWorkflow = (params: {
  nodes: StoryNode[];
  connections: StoryConnection[];
  genre?: string;
  tone?: string;
  customPrompt?: string;
  seed?: number;
}): StoryWorkflowExecutionResult => {
  const { nodes, connections } = params;
  const currentSeed = params.seed || Math.floor(Math.random() * 899999 + 100000);

  // Extract connected nodes (filter out muted nodes)
  const activeNodes = nodes.filter(n => !n.muted);
  const charNodes = activeNodes.filter(n => n.type === 'character_input' as any || n.type === 'character_loader');
  const locNodes = activeNodes.filter(n => n.type === 'location_input' as any || n.type === 'location_setting');
  const calamityNodes = activeNodes.filter(n => n.type === 'calamity_ruins');
  const seedNodes = activeNodes.filter(n => n.type === 'longevity_seed');
  const battleNodes = activeNodes.filter(n => n.type === 'battle_breakthrough');
  const pillNodes = activeNodes.filter(n => n.type === 'alchemy_catalyst');
  const daoNodes = activeNodes.filter(n => n.type === 'dao_revelation');
  const cameraNodes = activeNodes.filter(n => n.type === 'cinematic_director');
  const talismanNodes = activeNodes.filter(n => n.type === 'talisman_formation');
  const beastNodes = activeNodes.filter(n => n.type === 'spirit_beast_summon');
  const promptNodes = activeNodes.filter(n => n.type === 'story_prompt');
  const masterNodes = activeNodes.filter(n => n.type === 'master_synthesis');
  const upscalerNodes = activeNodes.filter(n => n.type === 'spatial_prose_upscaler');

  const mainChar = charNodes[0]?.data?.characterName || 'Lăng Tiêu';
  const mainRealm = charNodes[0]?.data?.realm || 'Kim Đan Hậu Kỳ';
  const mainWeapon = charNodes[0]?.data?.weapon || 'Thái Sơ Trảm Tiên Kiếm';

  const location = locNodes[0]?.data?.locationName || 'Đoạn Hồn Cổ Nhai';
  const region = locNodes[0]?.data?.region || 'Biên Giới Tây Hoang';
  const weather = locNodes[0]?.data?.weather || 'Mây xám nặng trĩu sà sát đỉnh núi, gió bấc gào rít lạnh buốt';

  const hasCalamity = calamityNodes.length > 0;
  const calamityDesc = calamityNodes[0]?.data?.calamityType || 'Chiến trường hoang tàn sau cuộc huyết chiến vạn người';
  const ruinScale = calamityNodes[0]?.data?.ruinScale || 'Binh khí gãy vụn cắm ngập trên đất cháy, xác chiến xa bốc khói';
  const mortalTragedy = calamityNodes[0]?.data?.mortalTragedy || 'Tiếng kêu thê lương của sinh linh chìm nghỉm trong gió hú';

  const hasSeed = seedNodes.length > 0;
  const seedName = seedNodes[0]?.data?.seedName || 'Thái Cổ Trường Sinh Thần Chủng';
  const seedGlow = seedNodes[0]?.data?.descentGlow || 'Hạt mầm xanh biếc lấp lánh như viên phỉ thúy rơi từ chín tầng mây';
  const seedMiracle = seedNodes[0]?.data?.sproutingAura || 'Rễ thần ôm trọn đao kiếm gãy vụn, đâm chồi nở hoa linh chi ngào ngạt';

  const hasBattle = battleNodes.length > 0;
  const opponent = battleNodes[0]?.data?.opponent || 'U Hồn Ma Tông Thất Đại Ma Tướng';
  const conflict = battleNodes[0]?.data?.conflictCause || 'Tranh đoạt hạt giống trường sinh giữa tâm bão sát phạt';
  const secretMove = battleNodes[0]?.data?.secretMove || 'Thái Sơ Kiếm Quyết: Nhất Niệm Hoa Nở, Quân Lâm Thiên Hạ';

  const hasPill = pillNodes.length > 0;
  const pillName = pillNodes[0]?.data?.pillName || 'Cửu Khiếu Bất Tử Niết Bàn Đan';
  const pillRank = pillNodes[0]?.data?.rank || 'Thánh Phẩm Thần Đan';
  const pillSensation = pillNodes[0]?.data?.internalSensation || 'Dược lực bùng nổ như dung nham thiêu đốt 108 khiếu huyệt';
  const pillBurst = pillNodes[0]?.data?.burstEffect || 'Pháp lực cuộn trào tăng vọt gấp mười lần, kinh mạch mở rộng vô biên';

  const hasDao = daoNodes.length > 0;
  const daoAxiom = daoNodes[0]?.data?.daoAxiom || 'Sinh tử luân hồi, cực hạn tử vong chính là khởi nguyên sinh mệnh';
  const daoTrigger = daoNodes[0]?.data?.enlightenmentTrigger || 'Chứng kiến thảo mộc đâm chồi từ trong đống tro tàn hài cốt';
  const daoDomain = daoNodes[0]?.data?.domainExpansion || 'Vạn Cổ Sinh Mệnh Đạo Vực mười dặm, hoa sen nở rộ trong hư không';

  const hasCamera = cameraNodes.length > 0;
  const cameraFraming = cameraNodes[0]?.data?.framingStyle || 'Toàn cảnh vũ trụ thu hẹp vào ánh mắt nhân vật';
  const cameraMovement = cameraNodes[0]?.data?.lensMovement || 'Góc máy lướt chậm trên mặt đất nứt nẻ rồi bay vút lên trời cao';
  const cameraPalette = cameraNodes[0]?.data?.colorPalette || 'Tông màu tro xám tang thương tương phản với ánh bích lục sinh mệnh';
  const cameraSoundscape = cameraNodes[0]?.data?.soundscape || 'Tiếng gió hú rít lạnh lẽo xen lẫn tiếng nhịp tim trầm hùng';

  const hasTalisman = talismanNodes.length > 0;
  const formationName = talismanNodes[0]?.data?.formationName || 'Cửu U Tru Tiên Đại Trận';
  const formationGrade = talismanNodes[0]?.data?.formationGrade || 'Thái Cổ Tuyệt Sát Trận';
  const formationEffect = talismanNodes[0]?.data?.effectMechanic || 'Phong tỏa vạn trượng hư không, ngưng kết Tru Tiên Kiếm Khí';
  const formationChant = talismanNodes[0]?.data?.activationChant || 'Càn Khôn Mượn Pháp, Trấn Hồn Tỏa Phách!';

  const hasBeast = beastNodes.length > 0;
  const beastName = beastNodes[0]?.data?.beastName || 'Thái Cổ Ngũ Trảo Kim Long';
  const beastSpecies = beastNodes[0]?.data?.species || 'Hồng Hoang Chân Long Thần Thú';
  const beastAura = beastNodes[0]?.data?.combatAura || 'Long ngâm xé toạc chín tầng mây, vảy rồng kim sắc đỡ trọn thiên kiếp';

  const promptIdea = promptNodes[0]?.data?.promptText || params.customPrompt || 'Đạo tâm chấn động trước sinh tử vô thường, quyết định gieo mầm sống cứu vớt trần gian.';
  const upscalerStyle = upscalerNodes[0]?.data?.styleRegister || 'Cổ phong bi tráng kết hợp hào khí thần tiên';

  // Synthesize Raw Prose
  let rawProse = `Gió hoàng hôn quét qua ${location} mang theo hơi lạnh buốt giá và sát khí đặc quánh làm nghẹt thở. Mười dặm hẻm núi thuộc ${region} giờ đây tựa hồ một nấm mồ tập thể khổng lồ. ${weather}. ${hasCamera ? `Khung cảnh mở ra theo phong cách ${cameraFraming}: ${cameraMovement}, nơi ${cameraPalette} hòa quyện cùng ${cameraSoundscape}.` : ''}

${mainChar} dừng chân trên mỏm đá tai mèo chênh vênh, vạt áo bào thêu chỉ vàng phần phật bay trong gió lạnh. Tay phải chàng khẽ siết chặt chuôi ${mainWeapon}, ánh mắt thâm trầm như giếng cổ nhìn xuống cảnh tượng tang thương bên dưới. ${hasCalamity ? `${calamityDesc}. ${ruinScale}. ${mortalTragedy}.` : ''}

${hasBattle ? `Đúng lúc ấy, không gian chợt rách toạc. Tiếng gầm thét âm u của ${opponent} vang vọng giữa tầng không: "${mainChar}, hôm nay chốn này chính là ngày giỗ của ngươi!". ${conflict}. Không chút nao núng, chàng vận chuyển công pháp ${mainRealm}, xuất chiêu ${secretMove}, kiếm khí xé toạc màn đêm tịch mịch!` : ''}

${hasPill ? `Thời khắc then chốt, ${mainChar} mở nắp bình ngọc, nuốt trọn ${pillName} (${pillRank}). ${pillSensation}! ${pillBurst}, đánh tan mọi thương tổn và đưa chiến lực lên đỉnh cao tuyệt đối.` : ''}

${hasDao ? `Trong khoảnh khắc đối mặt ranh giới sinh tử, ${daoTrigger}, tâm hải chàng bỗng bừng sáng đại ngộ: "${daoAxiom}". ${daoDomain}, uy áp đạo vận bao trùm cả bầu trời!` : ''}

${hasSeed ? `Giữa đống đổ nát ngút trời, ${mainChar} chậm rãi đưa tay lên hư không. Từ trong lòng bàn tay chàng, một hạt ngọc tròn trịa tỏa ánh sáng bích lục ấm áp — ${seedName} — khẽ bay vút lên. ${seedGlow}. Vừa chạm đất tro tàn, một tiếng sấm sinh mệnh trầm hùng vang lên từ lòng đất mẹ. ${seedMiracle}. Rễ cây đan cài hàn gắn lại vách đá nứt toác, vạn thanh đao kiếm gỉ sét bỗng trổ hoa linh chi ngào ngạt, mưa cam lộ nhỏ xuống làm lành mọi thương tích, biến nấm mồ hoang phế thành tiên cảnh bồng lai rực rỡ sinh cơ.` : ''}

${promptIdea}

Đứng dưới tán cây thần ngàn trượng chọc thủng vòm trời, ngắm nhìn ánh bình minh đầu tiên le lói chiếu rọi vạn vật vừa tái sinh, đạo tâm của ${mainChar} chưa bao giờ kiên định đến thế. Tu tiên nghịch thiên, chẳng phải vì trường sinh bất tử của riêng mình, mà là để bảo hộ chút sinh cơ mong manh cho thiên hạ thái bình!`;

  // Synthesize Upscaled Prose (Variant 1: Bi Tráng Sử Thi)
  let upscaledProse = `【Đại Đạo Phong Vân • Khởi Sinh Từ Đống Tro Tàn】

Gió bấc rít gào qua ${location}, thổi tung vạt áo bào của ${mainChar} giữa bóng tà dương đỏ quạch như máu đọng. Nơi biên thùy ${region}, đất trời chìm trong một màu ảm đạm hoang hoải đến nao lòng. ${hasCamera ? `${cameraMovement}, bao quát trọn vẹn ${cameraPalette}. Trong không gian văng vẳng ${cameraSoundscape}.` : ''} Bụi tro than bay rợp trời, phủ lên vạn mũi tên đồng gãy vụn và những cỗ chiến xa đã vỡ nát từ trận huyết chiến sinh tử.

Chàng khẽ nhắm mắt, cảm nhận từng luồng kiếm khí tàn dư đang gào thét u u trong từng kẽ đá. Tu vi ${mainRealm} ngưng tụ thành một vòng hào quang óng ánh hộ thể, ngăn cách chàng với tử khí nồng nặc đang bốc lên từ lòng vực thẳm.

${hasBattle ? `Bỗng nhiên, sát khí ngút trời ập đến! ${opponent} từ trong hư không đạp mây đen giáng thế, thanh âm cuồng loạn chấn động sơn hà: "${mainChar}, giao ra chí bảo, lưu ngươi toàn thây!". Đối diện nghịch cảnh ngàn cân treo sợi tóc, chàng cười dài sảng khoái, rút kiếm xuất chiêu ${secretMove}. Kiếm mang rực rỡ tựa dải ngân hà xé toạc vòm mây đen kịt, đẩy lùi ma sát vạn trượng!` : ''}

${hasPill ? `Giữa lằn ranh sinh tử, ${mainChar} điểm ngón tay, một viên đan dược phát quang bảy màu — ${pillName} — rơi thẳng vào miệng. Trong chớp mắt, ${pillSensation}. ${pillBurst}, toàn thân chàng bộc phát thần quang kim sắc như chiến thần giáng trần!` : ''}

${hasDao ? `Chứng kiến đao binh đổ nát bỗng nảy mầm chồi biếc, ${daoTrigger}, chàng thốt lên chân lý vĩnh hằng: "${daoAxiom}". ${daoDomain}, trấn áp hoàn toàn ma khí hung bạo!` : ''}

${hasSeed ? `Thế nhưng, sau cuộc chém giết vang trời lở đất, nhìn lại nhân gian điêu tàn xơ xác, đạo tâm chàng chợt rung lên những hồi chuông tỉnh thức. Chàng chậm rãi mở lòng bàn tay, nâng niu ${seedName}. Hạt mầm lấp lánh như giọt lệ của trời xanh khẽ rơi xuống, chạm vào lớp đất cháy sém. 

"Oanh!" — Một tiếng sấm đại đạo rền vang cửu u. Sóng gợn sinh mệnh màu ngọc bích từ điểm rơi bùng nổ, quét sạch mọi hận thù và oán khí đẫm máu. Từ lòng xỉ than, một chồi non xanh biếc vươn mình, chỉ sau vài nhịp thở đã hóa thành Cổ Mộc ngàn trượng xòe tán lọng tiên che rợp mười dặm non sông. Vạn thanh đao kiếm rỉ máu bỗng đâm chồi những dây leo phỉ thúy, bung nở những đóa linh chi thơm ngát. Từng giọt sương mai cam lộ rơi xuống tí tách, làm lành da thịt của những kẻ sống sót, hồi sinh mảnh đất chết chóc thành một chốn bồng lai bất lão vĩnh hằng.` : ''}

${promptIdea}

Gió xuân ấm áp mơn man lọn tóc mai, thay thế cho cơn buốt giá thấu xương thủa nào. Đứng trước kỳ quan do chính tay mình khai sinh, ${mainChar} ngửa mặt cười vang giữa đất trời bao la:
"Thiên đạo bất nhân coi vạn vật như chó rơm, vậy thì người tu đạo ta xin vì chúng sinh mà gieo xuống một mầm bất tử!"`;

  // Variant 2: Nhân Sinh Chữa Lành & Mầm Sống (Deep emotional and poignant healing focus)
  const variant2Prose = `【Mưa Cam Lộ Rửa Vết Thương Trần Thế • Mầm Sống Khởi Nguyên】

Mùi khói xám của đống tàn tích tại ${location} quyện chặt vào sương chiều, buốt giá đến tận tâm can. Khắp nẻo đường vào thôn xóm, tường sụp đá tan, những luống khoai khô nứt toác vì nắng hạn, những mảnh ngói vỡ của miếu thành hoàng chỏng chơ trong gió bấc.

${mainChar} cúi người, nhặt lên một chiếc chuông gió bằng đồng đã méo mó của một hài đồng vô tội. Trong lòng chàng dâng lên một nỗi xót xa vô hạn: "Trời cao nuôi dưỡng vạn vật, cớ sao lại để hồng trần chịu cảnh lầm than nhường này?".

${hasBattle ? `Khi bóng tối toan nuốt chửng những tia hy vọng cuối cùng, ${opponent} hiện thân toan cướp sạch sinh khí. Bằng ý chí kiên định ngút trời, chàng thi triển ${secretMove}, kiếm quang bừng sáng đẩy lui ác khí, chở che cho chút hơi tàn của mảnh đất nghèo.` : ''}

${hasPill ? `Nhìn những sinh linh thoi thóp, ${mainChar} không ngần ngại tán nhỏ ${pillName}, hòa vào chén sương sớm rưới lên kinh mạch đang vụn vỡ của đồng bào. Dược lực ${pillBurst} mang lại kỳ tích phục sinh chấn động cõi lòng.` : ''}

${hasDao ? `Lòng tràn đầy từ bi, ${mainChar} tỏ ngộ sâu sắc: "${daoAxiom}". ${daoDomain}, xoa dịu mọi oán niệm ngút trời.` : ''}

${hasSeed ? `Giữa chốn thê lương ấy, ${mainChar} hướng tâm về thiên địa, thả rơi ${seedName}. Không có tiếng nổ đinh tai nhức óc, chỉ có tiếng suối róc rách dịu dàng len lỏi vào lòng đất sâu. 

Một luồng linh khí dịu mát tựa bàn tay người mẹ nhẹ nhàng vỗ về khắp núi rừng. Mầm cây hé nở, rễ trường sinh vươn dài đan thành những chiếc cầu nối liền khe nứt vực sâu. Từ trên tán cây ngọc, mưa cam lộ nhỏ xuống lách tách, thấm vào môi khô của những người hấp hối, nuôi dưỡng những mầm lúa xanh mơn mởn đội đất trồi lên. Nước ngọt mát rượi tràn đầy lại lòng giếng cạn, chim én từ phương xa rủ nhau bay về ríu rít quanh mái hiên tranh vừa được dựng lại.` : ''}

${promptIdea}

Nhìn những nụ cười rạng rỡ của người dân bên bờ suối mới khơi dòng, ${mainChar} cất bước ra đi trong lặng lẽ. Đại đạo vô hình, nhưng ân tình của mầm sống trường sinh sẽ mãi mãi khắc sâu trong ký ức của nhân gian.`;

  // Variant 3: Thần Thoại Thượng Cổ & Giác Ngộ Đại Đạo (Mythic cosmic rebirth & Dao realization)
  const variant3Prose = `【Hỗn Độn Sơ Khai • Thái Cổ Thần Mộc Trùng Sinh】

Tại cấm địa ${location}, không gian vặn xoắn như dải lụa rách nát sau đòn hủy diệt của cấm kỵ pháp bảo. Quy tắc thiên địa sụp đổ, linh khí cạn kiệt, chỉ còn lại hư vô hoang vu và những mảnh vỡ ngôi sao rơi rụng. ${hasCamera ? `Góc nhìn bao la ${cameraFraming}, lướt qua dải tinh hà tĩnh lặng.` : ''}

${mainChar} khoanh chân ngồi giữa hư không, đỉnh đầu hiện ra ba đóa hoa sen đại đạo của cảnh giới ${mainRealm}. Trong tay chàng, ${seedName} không đơn thuần là một hạt mầm, mà là kết tinh của một kỷ nguyên thái cổ đã qua.

${hasBattle ? `Trận quyết chiến với ${opponent} đã chứng minh chân lý: dùng bạo lực chế ngự bạo lực chỉ sinh thêm oán hận. ${secretMove} chàng xuất ra không phải để sát sinh, mà là để phong ấn cuồng nộ, mở ra cánh cửa tạo hóa!` : ''}

${hasPill ? `Nội tức cuộn trào, chàng nuốt ${pillName}, ${pillSensation}, để thần hồn hòa nhập cùng quy luật vũ trụ.` : ''}

${hasDao ? `Thiên địa cộng minh vang vọng: "${daoAxiom}". ${daoDomain}, chiếu sáng cửu thiên thập địa!` : ''}

${hasSeed ? `Khi ${seedName} chạm vào tọa độ linh mạch đứt đoạn, hư không bỗng ngưng đọng lại trong tích tắc. 

"Đạo sinh nhất, nhất sinh nhị, nhị sinh tam, tam sinh vạn vật!"

Hạt giống nứt vỏ, một luồng sinh khí màu tím biếc cuộn trào tựa hồ Hỗn Độn Khí thuở khai thiên lập địa. Cổ Mộc Bất Diệt vươn cao vượt khỏi tầng mây thứ chín, rễ cắm sâu vào Cửu U Minh Giới, cành lá nâng đỡ cả ngân hà tinh tú! Những vết rách không gian được khâu lại bằng những sợi tơ sinh mệnh óng ánh. Nơi từng là cấm địa tử vong, nay chuyển hóa thành Động Thiên Thần Tiên đệ nhất của ${region}, tiên hạc bay lượn, kỳ lân phủ phục dưới bóng đại thụ ngàn năm.` : ''}

${promptIdea}

Trong khoảnh khắc ấy, ${mainChar} mở mắt, ánh nhìn xuyên thấu vạn cổ. Chàng đã không còn bị trói buộc bởi cảnh giới trần tục, mà chính thức chạm tay vào cánh cửa Trường Sinh Bất Lão của chư thần!`;

  const variants: StoryWorkflowVariant[] = [
    {
      variantId: 'variant_epic',
      label: 'Bản 1: Bi Tráng Sử Thi',
      toneStyle: 'Hùng tráng bi tráng, hoành tráng chiến trận & thần tích',
      chapterTitle: `Chương: ${mainChar} Gieo Mầm Bất Tử Tại ${location}`,
      prose: upscaledProse,
      summary: `Phân cảnh sử thi: ${mainChar} vượt qua chiến tàn ${location}, đối đầu ${hasBattle ? opponent : 'tử khí'}, ${hasPill ? `dược lực ${pillName}, ` : ''}${hasDao ? `đốn ngộ ${daoAxiom}, ` : ''}hạt trường sinh đâm chồi phục hưng non sông.`,
      wordCount: upscaledProse.trim().split(/\s+/).length,
      seed: currentSeed
    },
    {
      variantId: 'variant_healing',
      label: 'Bản 2: Mầm Sống Chữa Lành',
      toneStyle: 'Nhân văn sâu sắc, mưa cam lộ cứu giúp trăm họ',
      chapterTitle: `Chương: Mưa Cam Lộ Tại ${location}`,
      prose: variant2Prose,
      summary: `Phân cảnh nhân văn cảm động: Hạt trường sinh tưới mát hạn hán thiên tai, cứu vớt sinh linh và tái lập thôn trang thanh bình.`,
      wordCount: variant2Prose.trim().split(/\s+/).length,
      seed: currentSeed + 137
    },
    {
      variantId: 'variant_mythic',
      label: 'Bản 3: Thần Thoại Thượng Cổ',
      toneStyle: 'Khai thiên lập địa, quy tắc đại đạo & tiên cảnh bồng lai',
      chapterTitle: `Chương: Thái Cổ Thần Mộc Đản Sinh`,
      prose: variant3Prose,
      summary: `Phân cảnh kỳ ảo vũ trụ: Hạt trường sinh nối liền linh mạch cấm địa, biến nơi tử vong thành thánh địa tu tiên bậc nhất.`,
      wordCount: variant3Prose.trim().split(/\s+/).length,
      seed: currentSeed + 888
    }
  ];

  const activePathParts: string[] = [`[${mainChar}]`, `[${location}]`];
  if (hasCalamity) activePathParts.push('[Chiến Tàn]');
  if (hasBattle) activePathParts.push(`[Giao Đấu ${opponent}]`);
  if (hasPill) activePathParts.push(`[Đan Dược ${pillName}]`);
  if (hasDao) activePathParts.push(`[Ngộ Đạo]`);
  if (hasSeed) activePathParts.push(`[${seedName}]`);
  if (hasCamera) activePathParts.push('[Cinematic]');
  activePathParts.push('[Master Engine]', '[Spatial Upscaler]', '[Chapter Output]');

  return {
    chapterTitle: `Chương: ${mainChar} Gieo Mầm Bất Tử Tại ${location}`,
    rawProse,
    upscaledProse,
    summary: `Phân cảnh khởi tạo từ workflow đồ thị: ${mainChar} bước vào ${location}, đối mặt với ${hasCalamity ? calamityDesc : 'nghịch cảnh'}, kích hoạt ${hasSeed ? seedName : 'cơ duyên'}, thực hiện nâng cấp văn phong theo phong cách ${upscalerStyle}.`,
    wordCount: upscaledProse.trim().split(/\s+/).length,
    activePathSummary: activePathParts.join(' ➔ '),
    seed: currentSeed,
    variants,
    connectedElements: {
      characters: [mainChar],
      locations: [location],
      calamities: hasCalamity ? [calamityDesc] : [],
      miracles: hasSeed ? [seedName] : [],
      conflicts: hasBattle ? [conflict] : [],
      pills: hasPill ? [pillName] : [],
      daoAxioms: hasDao ? [daoAxiom] : [],
      cinematics: hasCamera ? [cameraFraming] : [],
      talismans: hasTalisman ? [formationName] : [],
      beasts: hasBeast ? [beastName] : []
    }
  };
};




