// =========================================================================
// PRESET STORY NODE WORKFLOWS (ĐỒ PHỔ SÁNG TÁC WORKFLOW PRESETS)
// Kiến trúc đồ thị node dạng ComfyUI / Blueprint kết nối nhân vật, bối cảnh,
// thiên tai, hạt trường sinh, đột phá và máy khởi tạo phân cảnh tiểu thuyết
// =========================================================================

import { StoryNode, StoryConnection, StoryWorkflowPreset } from '../types';

// =========================================================================
// FACTORY FUNCTIONS ĐỂ TẠO CÁC NÚT (NODE CREATORS)
// =========================================================================

export const createCharacterLoaderNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'character_input' as any,
  title: 'Nhân Vật & Đạo Hữu',
  categoryLabel: 'Loader / Input',
  icon: '👤',
  x,
  y,
  width: 250,
  color: '#6366f1',
  headerBg: 'from-indigo-950 via-slate-900 to-indigo-950',
  inputs: [],
  outputs: [
    { id: `${id}_out_char`, name: 'Nhân Vật (Char)', type: 'character', direction: 'out', color: '#818cf8' },
    { id: `${id}_out_realm`, name: 'Cảnh Giới (Realm)', type: 'character', direction: 'out', color: '#a5b4fc' }
  ],
  data: {
    characterName: 'Lăng Tiêu',
    realm: 'Kim Đan Hậu Kỳ (Hỗn Độn Kiếm Ý)',
    spiritualRoot: 'Hỗn Độn Ngũ Hành Tổ Căn',
    weapon: 'Thái Sơ Trảm Tiên Kiếm',
    personality: 'Quả quyết, trọng tình nghĩa, đạo tâm bất diệt',
    ...initialData
  },
  status: 'idle'
});

export const createLocationSettingNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'location_input' as any,
  title: 'Bối Cảnh & Địa Danh',
  categoryLabel: 'Setting / Environment',
  icon: '🏔️',
  x,
  y,
  width: 260,
  color: '#06b6d4',
  headerBg: 'from-cyan-950 via-slate-900 to-cyan-950',
  inputs: [],
  outputs: [
    { id: `${id}_out_loc`, name: 'Địa Danh (Loc)', type: 'location', direction: 'out', color: '#22d3ee' },
    { id: `${id}_out_aura`, name: 'Khí Tức (Aura)', type: 'location', direction: 'out', color: '#67e8f9' }
  ],
  data: {
    locationName: 'Đoạn Hồn Cổ Nhai',
    region: 'Biên Giới Tây Hoang • Cổ Chiến Trường Vạn Năm',
    weather: 'Mây xám nặng trĩu, gió bấc lạnh buốt xương tủy, tà dương đỏ quạch',
    residualAura: 'Kiếm khí tàn dư rít u u, sát khí đặc quánh nghẹt thở',
    ...initialData
  },
  status: 'idle'
});

export const createCalamityRuinsNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'calamity_ruins',
  title: 'Thiên Tai & Phế Tích',
  categoryLabel: 'Crisis / Destruction',
  icon: '⚡',
  x,
  y,
  width: 270,
  color: '#ef4444',
  headerBg: 'from-red-950 via-slate-900 to-red-950',
  inputs: [
    { id: `${id}_in_loc`, name: 'Địa Điểm (Loc In)', type: 'location', direction: 'in', color: '#22d3ee' }
  ],
  outputs: [
    { id: `${id}_out_calamity`, name: 'Kiếp Nạn (Crisis)', type: 'calamity', direction: 'out', color: '#f87171' },
    { id: `${id}_out_tragedy`, name: 'Thảm Cảnh (Tragedy)', type: 'calamity', direction: 'out', color: '#fca5a5' }
  ],
  data: {
    calamityType: 'Chiến trường hoang tàn sau đại chiến vạn người',
    ruinScale: 'Vạn thanh binh khí gãy vụn cắm ngập trên đất cháy, xác chiến xa lật nghiêng bốc khói đen',
    mortalTragedy: 'Thương binh lết giữa thi hài ngổn ngang, tiếng quạ kêu bi thảm xé toạc hoàng hôn',
    poignantDetail: 'Đôi giày cỏ trẻ con vương máu nằm bên mép vực sâu',
    ...initialData
  },
  status: 'idle'
});

export const createLongevitySeedNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'longevity_seed',
  title: 'Hạt Trường Sinh Hồi Sinh',
  categoryLabel: 'Miracle / Rebirth',
  icon: '🌱',
  x,
  y,
  width: 270,
  color: '#10b981',
  headerBg: 'from-emerald-950 via-slate-900 to-emerald-950',
  inputs: [
    { id: `${id}_in_calamity`, name: 'Đất Chết (Crisis In)', type: 'calamity', direction: 'in', color: '#f87171' }
  ],
  outputs: [
    { id: `${id}_out_miracle`, name: 'Thần Tích (Miracle)', type: 'miracle', direction: 'out', color: '#34d399' },
    { id: `${id}_out_vitality`, name: 'Sinh Mệnh (Vitality)', type: 'miracle', direction: 'out', color: '#6ee7b7' }
  ],
  data: {
    seedName: 'Thái Cổ Trường Sinh Thần Chủng',
    descentGlow: 'Hạt giống xanh biếc lấp lánh như viên phỉ thúy rơi từ cửu thiên rạch thủng mây mù',
    sproutingAura: 'Rễ thần ôm trọn đao kiếm gãy vụn, đâm chồi nở bung hoa linh chi thơm ngát',
    camLoEffect: 'Mưa cam lộ rải xuống làm lành mọi thương tích, biến nấm mồ vạn người thành tiên cảnh trần gian',
    ...initialData
  },
  status: 'idle'
});

export const createBattleBreakthroughNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'battle_breakthrough',
  title: 'Đại Chiến & Đột Phá Lôi Kiếp',
  categoryLabel: 'Conflict / Action',
  icon: '⚔️',
  x,
  y,
  width: 260,
  color: '#f59e0b',
  headerBg: 'from-amber-950 via-slate-900 to-amber-950',
  inputs: [
    { id: `${id}_in_char`, name: 'Nhân Vật (Char In)', type: 'character', direction: 'in', color: '#818cf8' },
    { id: `${id}_in_realm`, name: 'Cảnh Giới (Realm In)', type: 'character', direction: 'in', color: '#a5b4fc' }
  ],
  outputs: [
    { id: `${id}_out_battle`, name: 'Đại Chiến (Battle)', type: 'conflict', direction: 'out', color: '#fbbf24' },
    { id: `${id}_out_climax`, name: 'Cao Trào (Climax)', type: 'conflict', direction: 'out', color: '#fde68a' }
  ],
  data: {
    opponent: 'U Hồn Ma Tông Thất Đại Ma Tướng',
    conflictCause: 'Tranh đoạt hạt giống thần mộc trường sinh giữa tâm bão sát phạt',
    breakthroughTrigger: 'Trong tuyệt cảnh sinh tử, ngộ ra Đạo Sinh Nhất, Cửu Trọng Thiên Kiếp giáng thế',
    secretMove: 'Thái Sơ Kiếm Quyết Thức Thứ Tư: Nhất Niệm Hoa Nở, Quân Lâm Thiên Hạ',
    ...initialData
  },
  status: 'idle'
});

export const createStoryPromptNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'story_prompt',
  title: 'Ý Tưởng & Phục Bút (Prompt)',
  categoryLabel: 'Prompt / Condition',
  icon: '📜',
  x,
  y,
  width: 250,
  color: '#14b8a6',
  headerBg: 'from-teal-950 via-slate-900 to-teal-950',
  inputs: [],
  outputs: [
    { id: `${id}_out_prompt`, name: 'Ý Tưởng (Prompt Out)', type: 'prompt', direction: 'out', color: '#2dd4bf' }
  ],
  data: {
    promptText: 'Nhân vật chính đối diện thảm cảnh hoang tàn, đạo tâm rung động sâu sắc rồi quyết định nghịch thiên gieo mầm trường sinh cứu vớt sinh linh.',
    foreshadowing: 'Một lão già mù hấp hối trao lại ngọc giản bí mật trước khi linh hồn siêu thoát.',
    ...initialData
  },
  status: 'idle'
});

export const createAlchemyCatalystNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'alchemy_catalyst',
  title: 'Đan Dược & Thần Dược Xúc Tác',
  categoryLabel: 'Pill / Catalyst',
  icon: '🧪',
  x,
  y,
  width: 270,
  color: '#f59e0b',
  headerBg: 'from-amber-950 via-slate-900 to-amber-950',
  inputs: [
    { id: `${id}_in_char`, name: 'Nhân Vật (Char In)', type: 'character', direction: 'in', color: '#818cf8' }
  ],
  outputs: [
    { id: `${id}_out_catalyst`, name: 'Dược Lực (Catalyst Out)', type: 'catalyst', direction: 'out', color: '#f59e0b' }
  ],
  data: {
    pillName: 'Cửu Chuyển Sinh Tử Hoán Cốt Đan',
    pillRank: 'Thần Phẩm Thượng Cổ Chí Bảo',
    medicinalEffect: 'Hóa giải tử khí ngàn năm, kích thích hạt mầm trường sinh cắm sâu vào lòng đất',
    consumptionPhenomenon: 'Hương thơm đan dược xua tan mây đen, xuất hiện đan vân cửu sắc',
    ...initialData
  },
  status: 'idle'
});

export const createDaoRevelationNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'dao_revelation',
  title: 'Đạo Ngộ & Dị Tượng Thiên Địa',
  categoryLabel: 'Dao / Epiphany',
  icon: '☯️',
  x,
  y,
  width: 280,
  color: '#ec4899',
  headerBg: 'from-pink-950 via-slate-900 to-pink-950',
  inputs: [
    { id: `${id}_in_conflict`, name: 'Cảnh Ngộ (Conflict In)', type: 'conflict', direction: 'in', color: '#fbbf24' }
  ],
  outputs: [
    { id: `${id}_out_dao`, name: 'Quy Tắc Đạo (Dao Out)', type: 'dao', direction: 'out', color: '#ec4899' }
  ],
  data: {
    daoDomain: 'Sinh Tử Luân Hồi Quy Tắc & Vạn Vật Bất Hủ',
    epiphanyTrigger: 'Chứng kiến cảnh tàn sát phế tích, bỗng thấu tỏ lý cùng tắc biến, tử cực sinh sinh',
    cosmicPhenomenon: 'Tử khí đông lai ba vạn dặm, hoa sen hư không nở rộ trên bầu trời phế tích',
    daoInsightQuote: 'Cái chết chỉ là phân bón cho sinh mệnh mới vươn cao ngút ngàn.',
    ...initialData
  },
  status: 'idle'
});

export const createCinematicDirectorNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'cinematic_director',
  title: 'Khung Hình & Góc Máy Điện Ảnh',
  categoryLabel: 'Director / Cinematic Framing',
  icon: '🎬',
  x,
  y,
  width: 280,
  color: '#38bdf8',
  headerBg: 'from-sky-950 via-slate-900 to-sky-950',
  inputs: [],
  outputs: [
    { id: `${id}_out_camera`, name: 'Chỉ Đạo Khung Hình (Camera)', type: 'camera', direction: 'out', color: '#38bdf8' }
  ],
  data: {
    cameraPerspective: 'Trượt từ đại cảnh hoang vu điêu linh ➔ cận cảnh vỏ hạt mầm nứt toác ➔ góc ngửa đón ánh rạng đông',
    lightingTone: 'Sắc xám tro tàn u tịch chuyển sang ánh sáng hoàng kim thanh khiết rực rỡ',
    visualRhythm: 'Nhịp điệu dồn nén nghẹt thở chuyển sang bùng nổ tráng lệ vô song',
    soundscapeCue: 'Tiếng gió rít thê lương ➔ khoảng lặng tĩnh mịch ➔ tiếng ngân chuông sinh mệnh thánh thót',
    ...initialData
  },
  status: 'idle'
});

export const createTalismanFormationNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'talisman_formation',
  title: 'Trận Pháp & Phù Lục Cấm Đoán',
  categoryLabel: 'Formation / Talisman Array',
  icon: '🔯',
  x,
  y,
  width: 280,
  color: '#8b5cf6',
  headerBg: 'from-violet-950 via-slate-900 to-violet-950',
  inputs: [
    { id: `${id}_in_loc`, name: 'Bối Cảnh (Loc In)', type: 'location', direction: 'in', color: '#22d3ee' }
  ],
  outputs: [
    { id: `${id}_out_formation`, name: 'Trận Pháp (Formation)', type: 'talisman', direction: 'out', color: '#a78bfa' },
    { id: `${id}_out_talisman`, name: 'Phù Lục (Talisman)', type: 'talisman', direction: 'out', color: '#c4b5fd' }
  ],
  data: {
    formationName: 'Hỗn Nguyên Tru Tiên Trận & Thái Sơ Thần Phù',
    formationGrade: 'Thái Cổ Tuyệt Sát Cấm Trận (Chuẩn Đạo Khí)',
    effectMechanic: 'Phong tỏa vạn trượng hư không, ngưng kết thời gian ba nhịp thở, triệu hồi lôi vân sát phạt',
    activationChant: 'Thiên Địa Vô Cực, Càn Khôn Mượn Pháp, Thái Thượng Chân Phù, Trấn Hồn Tỏa Phách!',
    ...initialData
  },
  status: 'idle'
});

export const createSpiritBeastSummonNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'spirit_beast_summon',
  title: 'Linh Thú & Thần Thú Giáng Thế',
  categoryLabel: 'Beast / Mythic Companion',
  icon: '🐉',
  x,
  y,
  width: 280,
  color: '#f97316',
  headerBg: 'from-orange-950 via-slate-900 to-orange-950',
  inputs: [
    { id: `${id}_in_char`, name: 'Chủ Nhân (Char In)', type: 'character', direction: 'in', color: '#818cf8' }
  ],
  outputs: [
    { id: `${id}_out_beast`, name: 'Thần Thú (Beast Out)', type: 'beast', direction: 'out', color: '#fb923c' },
    { id: `${id}_out_aura`, name: 'Uy Áp (Roar Aura)', type: 'beast', direction: 'out', color: '#fdba74' }
  ],
  data: {
    beastName: 'Thái Cổ Hỗn Độn Chân Long',
    species: 'Thần Thú Đỉnh Cấp Bát Hoang',
    bloodlineTier: 'Ngũ Trảo Kim Long Huyết Mạch (Vương Giai Cực Phẩm)',
    combatAura: 'Long ngâm chấn toạc chín tầng mây, vảy rồng lấp lánh kim quang đỡ trọn thiên kiếp',
    loyaltyBond: 'Sinh tử khế ước huyết thệ từ thời niên thiếu',
    ...initialData
  },
  status: 'idle'
});

export const createMasterSynthesisNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'master_synthesis',
  title: 'Máy Khởi Tạo Phân Cảnh (Master Story Engine)',
  categoryLabel: 'AI Core Generator (LTX-2 Style)',
  icon: '⚡',
  x,
  y,
  width: 320,
  color: '#a855f7',
  headerBg: 'from-purple-950 via-slate-900 to-purple-950',
  inputs: [
    { id: `${id}_in_char`, name: 'Nhân Vật (Char)', type: 'character', direction: 'in', color: '#818cf8' },
    { id: `${id}_in_loc`, name: 'Địa Danh (Loc)', type: 'location', direction: 'in', color: '#22d3ee' },
    { id: `${id}_in_calamity`, name: 'Thiên Tai (Calamity)', type: 'calamity', direction: 'in', color: '#f87171' },
    { id: `${id}_in_miracle`, name: 'Hạt Trường Sinh (Miracle)', type: 'miracle', direction: 'in', color: '#34d399' },
    { id: `${id}_in_conflict`, name: 'Đại Chiến (Conflict)', type: 'conflict', direction: 'in', color: '#fbbf24' },
    { id: `${id}_in_catalyst`, name: 'Đan Dược (Catalyst)', type: 'catalyst', direction: 'in', color: '#f59e0b' },
    { id: `${id}_in_dao`, name: 'Đạo Ngộ (Dao)', type: 'dao', direction: 'in', color: '#ec4899' },
    { id: `${id}_in_camera`, name: 'Góc Máy (Camera)', type: 'camera', direction: 'in', color: '#38bdf8' },
    { id: `${id}_in_talisman`, name: 'Trận Pháp (Talisman)', type: 'talisman', direction: 'in', color: '#8b5cf6' },
    { id: `${id}_in_beast`, name: 'Thần Thú (Beast)', type: 'beast', direction: 'in', color: '#f97316' },
    { id: `${id}_in_prompt`, name: 'Ý Tưởng (Prompt)', type: 'prompt', direction: 'in', color: '#2dd4bf' }
  ],
  outputs: [
    { id: `${id}_out_raw`, name: 'Bản Thảo Thô (Raw Prose)', type: 'raw_prose', direction: 'out', color: '#c084fc' },
    { id: `${id}_out_summary`, name: 'Mạch Truyện (Beats)', type: 'raw_prose', direction: 'out', color: '#e879f9' }
  ],
  data: {
    narrativePacing: 'Cao trào kịch tính chuyển sang thần tích cứu rỗi',
    pacingMode: 'dramatic_miracle',
    wordCountTarget: '1500_words',
    perspective: 'Ngôi thứ ba toàn tri (Cổ phong tiên hiệp)',
    ...initialData
  },
  status: 'idle'
});

export const createSpatialProseUpscalerNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'spatial_prose_upscaler',
  title: 'Nâng Cấp Văn Phong (Spatial Prose Upscaler)',
  categoryLabel: 'Post-Processor / Upscaler',
  icon: '🎨',
  x,
  y,
  width: 290,
  color: '#0d9488',
  headerBg: 'from-teal-950 via-slate-900 to-teal-950',
  inputs: [
    { id: `${id}_in_raw`, name: 'Bản Thảo Thô (Raw In)', type: 'raw_prose', direction: 'in', color: '#c084fc' }
  ],
  outputs: [
    { id: `${id}_out_upscaled`, name: 'Văn Phong Hoàn Thiện (Upscaled)', type: 'upscaled_prose', direction: 'out', color: '#5eead4' },
    { id: `${id}_out_metrics`, name: 'Chỉ Số Văn Học (Metrics)', type: 'upscaled_prose', direction: 'out', color: '#99f6e4' }
  ],
  data: {
    styleRegister: 'Cổ phong bi tráng kết hợp hào khí thần tiên',
    upscaleLevel: 'Bậc Thầy (Level 3 - Trau chuốt câu từ & gài điển tích)',
    imageryDensity: 'Cao (Giàu hình ảnh ngũ giác, âm vang thi ca)',
    ...initialData
  },
  status: 'idle'
});

export const createChapterOutputNode = (id: string, x: number, y: number, initialData?: any): StoryNode => ({
  id,
  type: 'chapter_output',
  title: 'Đầu Ra Bản Thảo (Chapter Output)',
  categoryLabel: 'Output / Terminal',
  icon: '📖',
  x,
  y,
  width: 310,
  color: '#10b981',
  headerBg: 'from-emerald-950 via-slate-900 to-emerald-950',
  inputs: [
    { id: `${id}_in_upscaled`, name: 'Văn Bản Hoàn Thiện (Prose In)', type: 'upscaled_prose', direction: 'in', color: '#5eead4' }
  ],
  outputs: [],
  data: {
    chapterTitle: 'Chương 18: Hạt Mầm Trường Sinh Phá Tan Tro Tàn Vực Thẳm',
    generatedProse: '',
    summary: '',
    wordCount: 0,
    isReady: false,
    ...initialData
  },
  status: 'idle'
});

// =========================================================================
// 4 BỘ PRESET WORKFLOW KINH ĐIỂN
// =========================================================================

export const PRESET_STORY_WORKFLOWS: StoryWorkflowPreset[] = [
  // -----------------------------------------------------------------------
  // PRESET 1: THIÊN TAI HOANG TÀN & HẠT TRƯỜNG SINH HỒI SINH
  // (Đúng như ảnh người dùng gửi: Input bên trái -> Processor tím ở giữa -> Upscaler xanh ở phải -> Output)
  // -----------------------------------------------------------------------
  {
    id: 'workflow_calamity_seed_rebirth',
    name: 'Thiên Tai Hoang Tàn & Hạt Trường Sinh Hồi Sinh',
    subtitle: 'Pipeline chuẩn xác theo mô hình LTX-2 & Spatial Upscaler trong ảnh',
    description: 'Kết nối Nhân vật chính, Chiến địa hoang tàn, Hạt cây trường sinh giáng thế, qua Máy khởi tạo Master AI và Bộ nâng cấp văn phong tác gia.',
    badge: 'Khuyên Dùng • Đúng Như Hình',
    nodes: [
      createCharacterLoaderNode('node_char_1', 60, 60, {
        characterName: 'Lăng Tiêu',
        realm: 'Kim Đan Hậu Kỳ',
        weapon: 'Thái Sơ Trảm Tiên Kiếm'
      }),
      createLocationSettingNode('node_loc_1', 60, 280, {
        locationName: 'Đoạn Hồn Cổ Nhai',
        region: 'Biên Giới Tây Hoang • Cổ Chiến Trường Vạn Năm'
      }),
      createCalamityRuinsNode('node_calamity_1', 60, 500, {
        calamityType: 'Chiến trường hoang tàn sau huyết chiến vạn người',
        ruinScale: 'Vạn thanh binh khí gãy vụn cắm ngập trên đất cháy, xác chiến xa bốc khói đen'
      }),
      createLongevitySeedNode('node_seed_1', 370, 500, {
        seedName: 'Thái Cổ Trường Sinh Thần Chủng',
        descentGlow: 'Hạt giống xanh biếc lấp lánh như viên phỉ thúy rơi từ cửu thiên',
        sproutingAura: 'Rễ thần ôm trọn đao kiếm gãy vụn, đâm chồi nở bung hoa linh chi'
      }),
      createStoryPromptNode('node_prompt_1', 370, 150, {
        promptText: 'Đạo tâm nhân vật rung động trước thảm cảnh bách tính, quyết định gieo hạt trường sinh cứu rỗi vạn vật từ đống tro tàn.'
      }),
      createMasterSynthesisNode('node_master_engine', 700, 220, {
        narrativePacing: 'Cao trào bi tráng chuyển sang thần tích cứu rỗi rạng ngời',
        wordCountTarget: '1500_words'
      }),
      createSpatialProseUpscalerNode('node_upscaler', 1080, 200, {
        styleRegister: 'Cổ phong bi tráng kết hợp hào khí thần tiên thoát tục',
        upscaleLevel: 'Bậc Thầy (Level 3)'
      }),
      createChapterOutputNode('node_output', 1430, 220, {
        chapterTitle: 'Chương 24: Hạt Mầm Trường Sinh Hồi Sinh Cổ Chiến Địa'
      })
    ],
    connections: [
      // Character -> Master Engine
      { id: 'conn_1', fromNodeId: 'node_char_1', fromPortId: 'node_char_1_out_char', toNodeId: 'node_master_engine', toPortId: 'node_master_engine_in_char', color: '#818cf8' },
      // Location -> Calamity
      { id: 'conn_2', fromNodeId: 'node_loc_1', fromPortId: 'node_loc_1_out_loc', toNodeId: 'node_calamity_1', toPortId: 'node_calamity_1_in_loc', color: '#22d3ee' },
      // Location -> Master Engine
      { id: 'conn_3', fromNodeId: 'node_loc_1', fromPortId: 'node_loc_1_out_loc', toNodeId: 'node_master_engine', toPortId: 'node_master_engine_in_loc', color: '#22d3ee' },
      // Calamity -> Longevity Seed
      { id: 'conn_4', fromNodeId: 'node_calamity_1', fromPortId: 'node_calamity_1_out_calamity', toNodeId: 'node_seed_1', toPortId: 'node_seed_1_in_calamity', color: '#f87171' },
      // Calamity -> Master Engine
      { id: 'conn_5', fromNodeId: 'node_calamity_1', fromPortId: 'node_calamity_1_out_tragedy', toNodeId: 'node_master_engine', toPortId: 'node_master_engine_in_calamity', color: '#f87171' },
      // Longevity Seed -> Master Engine
      { id: 'conn_6', fromNodeId: 'node_seed_1', fromPortId: 'node_seed_1_out_miracle', toNodeId: 'node_master_engine', toPortId: 'node_master_engine_in_miracle', color: '#34d399' },
      // Prompt -> Master Engine
      { id: 'conn_7', fromNodeId: 'node_prompt_1', fromPortId: 'node_prompt_1_out_prompt', toNodeId: 'node_master_engine', toPortId: 'node_master_engine_in_prompt', color: '#2dd4bf' },
      // Master Engine -> Spatial Upscaler
      { id: 'conn_8', fromNodeId: 'node_master_engine', fromPortId: 'node_master_engine_out_raw', toNodeId: 'node_upscaler', toPortId: 'node_upscaler_in_raw', color: '#c084fc' },
      // Spatial Upscaler -> Chapter Output
      { id: 'conn_9', fromNodeId: 'node_upscaler', fromPortId: 'node_upscaler_out_upscaled', toNodeId: 'node_output', toPortId: 'node_output_in_upscaled', color: '#5eead4' }
    ]
  },

  // -----------------------------------------------------------------------
  // PRESET 2: TUYỆT CẢNH ĐỘT PHÁ LÔI KIẾP & ĐẠI CHIẾN
  // -----------------------------------------------------------------------
  {
    id: 'workflow_battle_tribulation',
    name: 'Tuyệt Cảnh Tử Chiến & Đột Phá Lôi Kiếp',
    subtitle: 'Đại chiến ma giáo, lôi kiếp giáng thế, đao kiếm va chạm sinh tử',
    description: 'Thiết lập trận đánh kinh thiên động địa, nghênh chiến thiên kiếp và kẻ thù bao vây, đột phá cảnh giới chấn động chư thiên.',
    badge: 'Chiến Đấu • Nhiệt Huyết',
    nodes: [
      createCharacterLoaderNode('node_b_char', 60, 80, {
        characterName: 'Tiêu Diệp',
        realm: 'Trúc Cơ Viên Mãn -> Kết Đan',
        weapon: 'Cửu U Trảm Ma Đao'
      }),
      createLocationSettingNode('node_b_loc', 60, 320, {
        locationName: 'Độ Kiếp Phong • Cửu Tiêu Lôi Trì',
        region: 'Trung Châu • Cấm Khu Cổ Thần'
      }),
      createBattleBreakthroughNode('node_b_battle', 370, 80, {
        opponent: 'Huyết Sát Ma Tông Tam Đại Hộ Pháp',
        conflictCause: 'Đánh lén cướp đoạt Kim Đan Thảo giữa lúc lôi kiếp ập đến',
        breakthroughTrigger: 'Mượn uy lực của Cửu Trọng Diệt Thế Thần Lôi để tôi luyện kiếm cốt'
      }),
      createStoryPromptNode('node_b_prompt', 370, 350, {
        promptText: 'Một đao chém toạc lôi đình, phá tan ma trận, tắm máu kết thành Cực Phẩm Hỗn Độn Kim Đan.'
      }),
      createMasterSynthesisNode('node_b_master', 720, 180, {
        narrativePacing: 'Dồn dập gay cấn, hoành tráng tột bậc',
        wordCountTarget: '1800_words'
      }),
      createSpatialProseUpscalerNode('node_b_upscaler', 1090, 180, {
        styleRegister: 'Hào hùng bi tráng, đậm chất kiếm hiệp huyền huyễn cổ phong'
      }),
      createChapterOutputNode('node_b_output', 1440, 180, {
        chapterTitle: 'Chương 45: Nhất Kiếm Phá Lôi Kiếp, Trảm Tận Ma Đầu'
      })
    ],
    connections: [
      { id: 'b_conn_1', fromNodeId: 'node_b_char', fromPortId: 'node_b_char_out_char', toNodeId: 'node_b_battle', toPortId: 'node_b_battle_in_char', color: '#818cf8' },
      { id: 'b_conn_2', fromNodeId: 'node_b_char', fromPortId: 'node_b_char_out_realm', toNodeId: 'node_b_battle', toPortId: 'node_b_battle_in_realm', color: '#a5b4fc' },
      { id: 'b_conn_3', fromNodeId: 'node_b_char', fromPortId: 'node_b_char_out_char', toNodeId: 'node_b_master', toPortId: 'node_b_master_in_char', color: '#818cf8' },
      { id: 'b_conn_4', fromNodeId: 'node_b_loc', fromPortId: 'node_b_loc_out_loc', toNodeId: 'node_b_master', toPortId: 'node_b_master_in_loc', color: '#22d3ee' },
      { id: 'b_conn_5', fromNodeId: 'node_b_battle', fromPortId: 'node_b_battle_out_battle', toNodeId: 'node_b_master', toPortId: 'node_b_master_in_conflict', color: '#fbbf24' },
      { id: 'b_conn_6', fromNodeId: 'node_b_prompt', fromPortId: 'node_b_prompt_out_prompt', toNodeId: 'node_b_master', toPortId: 'node_b_master_in_prompt', color: '#2dd4bf' },
      { id: 'b_conn_7', fromNodeId: 'node_b_master', fromPortId: 'node_b_master_out_raw', toNodeId: 'node_b_upscaler', toPortId: 'node_b_upscaler_in_raw', color: '#c084fc' },
      { id: 'b_conn_8', fromNodeId: 'node_b_upscaler', fromPortId: 'node_b_upscaler_out_upscaled', toNodeId: 'node_b_output', toPortId: 'node_b_output_in_upscaled', color: '#5eead4' }
    ]
  },

  // -----------------------------------------------------------------------
  // PRESET 3: TIÊU DAO DU SƠN THỦY & HỒNG NHAN TRI KỶ
  // -----------------------------------------------------------------------
  {
    id: 'workflow_poetic_romance',
    name: 'Tiêu Dao Sơn Thủy & Hồng Nhan Tri Kỷ',
    subtitle: 'Nâng chén ngắm trăng, cổ cầm hòa sáo trúc, giang hồ hữu tình',
    description: 'Tạo phân cảnh tiêu dao lãng mạn, ẩm rượu đối ẩm cùng hồng nhan bên hồ sen ngắm pháo hoa và đàm đạo trường sinh.',
    badge: 'Thi Vị • Lãng Mạn',
    nodes: [
      createCharacterLoaderNode('node_p_char', 60, 100, {
        characterName: 'Tiêu Cảnh',
        realm: 'Nguyên Anh Tiêu Dao Kỳ',
        weapon: 'Thanh Phong Lưu Ly Phiến'
      }),
      createLocationSettingNode('node_p_loc', 60, 340, {
        locationName: 'Vọng Nguyệt Đầm • Vạn Hoa Trấn',
        region: 'Giang Nam Thủy Huyện • Hồ Sen Tiên Dạ Hội'
      }),
      createStoryPromptNode('node_p_prompt', 380, 220, {
        promptText: 'Đêm hội hoa đăng thả đèn lồng cầu phúc, cùng hồng nhan tri kỷ Liễu Tố Y uống rượu Cửu Chuyển Bách Hoa Lộ, gảy khúc Phượng Cầu Hoàng.'
      }),
      createMasterSynthesisNode('node_p_master', 720, 180, {
        narrativePacing: 'Thanh tao êm ả, đậm chất thơ ca thi họa',
        wordCountTarget: '1200_words'
      }),
      createSpatialProseUpscalerNode('node_p_upscaler', 1090, 180, {
        styleRegister: 'Kim cổ thi họa, diễm lệ tao nhã, câu từ uyển chuyển mượt mà'
      }),
      createChapterOutputNode('node_p_output', 1440, 180, {
        chapterTitle: 'Chương 12: Đêm Trăng Vọng Nguyệt, Tiếng Đàn Tri Kỷ'
      })
    ],
    connections: [
      { id: 'p_conn_1', fromNodeId: 'node_p_char', fromPortId: 'node_p_char_out_char', toNodeId: 'node_p_master', toPortId: 'node_p_master_in_char', color: '#818cf8' },
      { id: 'p_conn_2', fromNodeId: 'node_p_loc', fromPortId: 'node_p_loc_out_loc', toNodeId: 'node_p_master', toPortId: 'node_p_master_in_loc', color: '#22d3ee' },
      { id: 'p_conn_3', fromNodeId: 'node_p_prompt', fromPortId: 'node_p_prompt_out_prompt', toNodeId: 'node_p_master', toPortId: 'node_p_master_in_prompt', color: '#2dd4bf' },
      { id: 'p_conn_4', fromNodeId: 'node_p_master', fromPortId: 'node_p_master_out_raw', toNodeId: 'node_p_upscaler', toPortId: 'node_p_upscaler_in_raw', color: '#c084fc' },
      { id: 'p_conn_5', fromNodeId: 'node_p_upscaler', fromPortId: 'node_p_upscaler_out_upscaled', toNodeId: 'node_p_output', toPortId: 'node_p_output_in_upscaled', color: '#5eead4' }
    ]
  },

  // -----------------------------------------------------------------------
  // PRESET 4: THÀNH TRÌ SỤP ĐỔ & TÁI THIẾT THÁNH ĐỊA
  // -----------------------------------------------------------------------
  {
    id: 'workflow_city_collapse_rebuild',
    name: 'Thành Trì Sụp Đổ & Tái Sinh Thánh Địa',
    subtitle: 'Đại trận vỡ vụn, thành trì sụp đổ, hạt thần mộc tái tạo càn khôn',
    description: 'Khắc họa cảnh tượng Thiên Khuyết Cổ Thành sụp đổ trong đại kiếp, sau đó hạt trường sinh rơi xuống hóa ngọc toàn bộ tường thành và tái sinh đại trận.',
    badge: 'Đế Vương • Thánh Địa',
    nodes: [
      createCharacterLoaderNode('node_c_char', 60, 80, {
        characterName: 'Khương Hạo Thiên',
        realm: 'Đại La Kim Tiên',
        weapon: 'Trấn Thiên Ngọc Tỷ'
      }),
      createLocationSettingNode('node_c_loc', 60, 320, {
        locationName: 'Thiên Khuyết Hoàng Triều Cổ Kinh',
        region: 'Trung Châu • Đế Đô Ngàn Năm'
      }),
      createCalamityRuinsNode('node_c_calamity', 370, 80, {
        calamityType: 'Thành trì vạn trượng sụp đổ như cát lở, trận pháp hộ thành vỡ tan như lưu ly',
        ruinScale: 'Cung điện lầu gác sập đổ, bụi đất che lấp nhật nguyệt'
      }),
      createLongevitySeedNode('node_c_seed', 370, 360, {
        seedName: 'Bất Lão Tiên Đằng Thần Chủng',
        descentGlow: 'Hạt giống giáng thế mang theo vầng sáng hoàng kim và bích lục',
        sproutingAura: 'Dây leo kéo các phiến tường thành đổ nát đứng dậy hóa thành ngọc bích kiên cố'
      }),
      createMasterSynthesisNode('node_c_master', 720, 180, {
        narrativePacing: 'Uy nghiêm tráng lệ, từ sụp đổ lụi tàn vươn lên thành thánh địa bất hủ'
      }),
      createSpatialProseUpscalerNode('node_c_upscaler', 1090, 180, {
        styleRegister: 'Đế vương khí phách, từ ngữ trầm hùng tráng lệ bậc nhất'
      }),
      createChapterOutputNode('node_c_output', 1440, 180, {
        chapterTitle: 'Chương 50: Vạn Dặm Thành Cổ Hóa Ngọc Mộc, Tái Lập Tiên Triều'
      })
    ],
    connections: [
      { id: 'c_conn_1', fromNodeId: 'node_c_char', fromPortId: 'node_c_char_out_char', toNodeId: 'node_c_master', toPortId: 'node_c_master_in_char', color: '#818cf8' },
      { id: 'c_conn_2', fromNodeId: 'node_c_loc', fromPortId: 'node_c_loc_out_loc', toNodeId: 'node_c_calamity', toPortId: 'node_c_calamity_in_loc', color: '#22d3ee' },
      { id: 'c_conn_3', fromNodeId: 'node_c_loc', fromPortId: 'node_c_loc_out_loc', toNodeId: 'node_c_master', toPortId: 'node_c_master_in_loc', color: '#22d3ee' },
      { id: 'c_conn_4', fromNodeId: 'node_c_calamity', fromPortId: 'node_c_calamity_out_calamity', toNodeId: 'node_c_seed', toPortId: 'node_c_seed_in_calamity', color: '#f87171' },
      { id: 'c_conn_5', fromNodeId: 'node_c_calamity', fromPortId: 'node_c_calamity_out_tragedy', toNodeId: 'node_c_master', toPortId: 'node_c_master_in_calamity', color: '#f87171' },
      { id: 'c_conn_6', fromNodeId: 'node_c_seed', fromPortId: 'node_c_seed_out_miracle', toNodeId: 'node_c_master', toPortId: 'node_c_master_in_miracle', color: '#34d399' },
      { id: 'c_conn_7', fromNodeId: 'node_c_master', fromPortId: 'node_c_master_out_raw', toNodeId: 'node_c_upscaler', toPortId: 'node_c_upscaler_in_raw', color: '#c084fc' },
      { id: 'c_conn_8', fromNodeId: 'node_c_upscaler', fromPortId: 'node_c_upscaler_out_upscaled', toNodeId: 'node_c_output', toPortId: 'node_c_output_in_upscaled', color: '#5eead4' }
    ]
  },

  // -----------------------------------------------------------------------
  // PRESET 5: SINH TỬ ĐẠO NGỘ & VẠN CỔ HỒI SINH (FULL COMFYUI PIPELINE)
  // -----------------------------------------------------------------------
  {
    id: 'workflow_dao_enlightenment',
    name: 'Sinh Tử Đạo Ngộ & Vạn Cổ Hồi Sinh',
    subtitle: 'Đan dược thượng cổ kích mầm, thấu tỏ đạo sinh tử, tái tạo tiên thổ',
    description: 'Pipeline hoàn chỉnh 10 nút: Đan Dược Xúc Tác + Đạo Ngộ Quy Tắc + Khung Hình Điện Ảnh + Hạt Trường Sinh giải cứu phế tích vạn cổ.',
    badge: 'Đạo Ngộ • Đỉnh Cao LTX-2',
    nodes: [
      createCharacterLoaderNode('node_d_char', 50, 70, {
        characterName: 'Lăng Tiêu',
        realm: 'Hỗn Độn Tiên Tôn',
        weapon: 'Thái Sơ Khai Thiên Kiếm'
      }),
      createLocationSettingNode('node_d_loc', 50, 380, {
        locationName: 'Thái Cổ Táng Tiên Vực',
        region: 'Hoang Cổ Cấm Địa • Nơi Vạn Tiên Vùi Thây'
      }),
      createCalamityRuinsNode('node_d_calamity', 410, 70, {
        calamityType: 'Chiến trường Táng Tiên Vực sau vạn năm phong ấn, ngập tràn sát khí và oan hồn',
        ruinScale: 'Vạn dặm đất đen không một cọng cỏ, tiên quan vỡ nát, sấm ma rền vang'
      }),
      createAlchemyCatalystNode('node_d_pill', 410, 380, {
        pillName: 'Thái Cực Hồi Dương Thần Đan',
        medicinalEffect: 'Tưới đẫm linh dịch hóa giải tử khí vạn năm, đánh thức mầm trường sinh ngủ say'
      }),
      createLongevitySeedNode('node_d_seed', 770, 70, {
        seedName: 'Hỗn Độn Tịnh Thế Thanh Liên Chủng',
        sproutingAura: 'Đâm chồi hoa sen xanh biếc tỏa hương thanh tịnh, rễ cây hút trọn oán khí chuyển thành linh khí'
      }),
      createDaoRevelationNode('node_d_dao', 770, 380, {
        daoDomain: 'Sinh Tử Luân Hồi & Tạo Hóa Khởi Nguyên',
        cosmicPhenomenon: 'Tử khí đông lai ba vạn dặm, tiếng thiên âm vang vọng cả cấm vực'
      }),
      createCinematicDirectorNode('node_d_camera', 770, 690, {
        cameraPerspective: 'Trượt từ toàn cảnh hoang tàn ngút ngàn ➔ zoom cận rễ mầm sen xuyên qua giáp rách ➔ vươn lên mây trời ngũ sắc',
        visualRhythm: 'Mở đầu thê lương tịch diệt, chuyển hóa huy hoàng tráng lệ'
      }),
      createMasterSynthesisNode('node_d_master', 1130, 200, {
        narrativePacing: 'Hùng tráng bi tráng chuyển sang đạo ngộ thần thánh cứu vớt thương sinh',
        wordCountTarget: '2000_words'
      }),
      createSpatialProseUpscalerNode('node_d_upscaler', 1490, 200, {
        styleRegister: 'Cổ phong huyền ảo, ngôn từ trầm hùng, khí phách đạo tiên chí cao'
      }),
      createChapterOutputNode('node_d_output', 1850, 200, {
        chapterTitle: 'Chương 99: Nhất Niệm Sinh Tử, Thanh Liên Nở Rộ Giữa Hoang Tàn'
      })
    ],
    connections: [
      { id: 'd_conn_1', fromNodeId: 'node_d_char', fromPortId: 'node_d_char_out_char', toNodeId: 'node_d_master', toPortId: 'node_d_master_in_char', color: '#818cf8' },
      { id: 'd_conn_2', fromNodeId: 'node_d_loc', fromPortId: 'node_d_loc_out_loc', toNodeId: 'node_d_master', toPortId: 'node_d_master_in_loc', color: '#22d3ee' },
      { id: 'd_conn_3', fromNodeId: 'node_d_calamity', fromPortId: 'node_d_calamity_out_tragedy', toNodeId: 'node_d_master', toPortId: 'node_d_master_in_calamity', color: '#f87171' },
      { id: 'd_conn_4', fromNodeId: 'node_d_pill', fromPortId: 'node_d_pill_out_catalyst', toNodeId: 'node_d_master', toPortId: 'node_d_master_in_catalyst', color: '#f59e0b' },
      { id: 'd_conn_5', fromNodeId: 'node_d_seed', fromPortId: 'node_d_seed_out_miracle', toNodeId: 'node_d_master', toPortId: 'node_d_master_in_miracle', color: '#34d399' },
      { id: 'd_conn_6', fromNodeId: 'node_d_dao', fromPortId: 'node_d_dao_out_dao', toNodeId: 'node_d_master', toPortId: 'node_d_master_in_dao', color: '#ec4899' },
      { id: 'd_conn_7', fromNodeId: 'node_d_camera', fromPortId: 'node_d_camera_out_camera', toNodeId: 'node_d_master', toPortId: 'node_d_master_in_camera', color: '#38bdf8' },
      { id: 'd_conn_8', fromNodeId: 'node_d_master', fromPortId: 'node_d_master_out_raw', toNodeId: 'node_d_upscaler', toPortId: 'node_d_upscaler_in_raw', color: '#c084fc' },
      { id: 'd_conn_9', fromNodeId: 'node_d_upscaler', fromPortId: 'node_d_upscaler_out_upscaled', toNodeId: 'node_d_output', toPortId: 'node_d_output_in_upscaled', color: '#5eead4' }
    ],
    groups: [
      {
        id: 'group_d_inputs',
        title: 'Khu Vực 1: Nhân Vật & Bối Cảnh Thái Cổ',
        color: '#818cf8',
        bgColor: 'rgba(99, 102, 241, 0.05)',
        x: 30,
        y: 30,
        width: 330,
        height: 680
      },
      {
        id: 'group_d_catalyst',
        title: 'Khu Vực 2: Phế Tích, Đan Dược, Thần Mộc & Đạo Ngộ',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.05)',
        x: 380,
        y: 30,
        width: 690,
        height: 980
      },
      {
        id: 'group_d_engine',
        title: 'Khu Vực 3: Master Engine & Chapter Output',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.05)',
        x: 1090,
        y: 120,
        width: 1050,
        height: 520
      }
    ]
  },

  // -----------------------------------------------------------------------
  // PRESET 6: LÔI KIẾP PHẠT THÁNH & THẦN BINH TÁI SINH
  // -----------------------------------------------------------------------
  {
    id: 'workflow_tribulation_weapon_rebirth',
    name: 'Lôi Kiếp Phạt Thánh & Thần Binh Tái Sinh',
    subtitle: 'Đại chiến Ma Thần, gãy kiếm độ kiếp, tôi luyện Đạo Khí tối cao',
    description: 'Pipeline 11 nút tối thượng: Nhân Vật + Bối Cảnh Lôi Hải + Đối Đầu Ma Thần + Thiên Tai Lôi Kiếp + Đan Dược Tôi Thể + Đạo Ngộ Nghịch Mệnh + Hạt Thần Mộc + Quay Phim Điện Ảnh + Master + Upscaler + Output.',
    badge: 'Đột Phá • Đạo Khí Tối Thượng',
    nodes: [
      createCharacterLoaderNode('node_t_char', 50, 70, {
        characterName: 'Tiêu Diệp',
        realm: 'Độ Kiếp Kỳ Đỉnh Phong',
        weapon: 'Cửu U Trảm Ma Kiếm (Sắp đứt gãy)',
        personality: 'Bá đạo cuồng ngạo, ngạo thị quần hùng, nghịch thiên cải mệnh'
      }),
      createLocationSettingNode('node_t_loc', 50, 380, {
        locationName: 'Vạn Cổ Lôi Trì & Tru Tiên Nhai',
        region: 'Vực Ngoại Hư Không • Giới Hạn Cửu Thiên',
        weather: 'Lôi vân tím sẫm dày vạn dặm, sấm sét xé toạc bầu trời liên tục không ngừng',
        residualAura: 'Thiên đạo sát phạt uy áp nghẹt thở, không gian rạn nứt từng mảng'
      }),
      createBattleBreakthroughNode('node_t_battle', 410, 70, {
        opponent: 'Thái Cổ Lôi Thần Hư Ảnh & Lục Đại Ma Vương',
        opponentRealm: 'Bán Bộ Chân Tiên',
        conflictCause: 'Tranh đoạt Lôi Tinh Hạt Giống để vượt qua Cửu Cửu Thiên Kiếp',
        battleTechnique: 'Nghịch Thiên Bạt Kiếm Quyết • Cửu Chuyển Lôi Đình Thức',
        breakthroughPhenomenon: 'Huyết khí ngưng tụ Chân Long, đạp nát lôi đình xông thẳng lên chín tầng trời'
      }),
      createCalamityRuinsNode('node_t_calamity', 410, 380, {
        calamityType: 'Cửu Trọng Diệt Thế Tử Tiêu Thần Lôi giáng lâm',
        ruinScale: 'Dãy núi ngàn trượng bị đánh tan thành tro bụi, hư không sụp đổ thành hố đen',
        mortalTragedy: 'Thanh kiếm bản mệnh gãy làm đôi, máu tươi nhuộm đỏ áo choàng rách',
        poignantDetail: 'Mảnh vỡ thanh kiếm rơi lơ lửng giữa biển lôi điện rực lửa'
      }),
      createAlchemyCatalystNode('node_t_pill', 410, 690, {
        pillName: 'Hỗn Độn Cửu Khiếu Tôi Thể Đan',
        pillRank: 'Đế Phẩm Đạo Đan',
        medicinalEffect: 'Hấp thụ thiên lôi tôi luyện lại từng khúc xương tủy và đan điền',
        consumptionPhenomenon: 'Thân thể phát sáng như mặt trời chói chang, nung chảy lại kiếm gãy'
      }),
      createLongevitySeedNode('node_t_seed', 770, 70, {
        seedName: 'Thái Cổ Lôi Kiếp Thần Mộc Chủng',
        descentGlow: 'Hạt mầm màu vàng kim kim lôi lấp lánh rơi vào kẽ nứt thanh kiếm gãy',
        sproutingAura: 'Dây leo lôi điện hàn gắn hai đoạn kiếm gãy, đúc thành Tuyệt Thế Đạo Khí'
      }),
      createDaoRevelationNode('node_t_dao', 770, 380, {
        daoDomain: 'Phá Diệt Trọng Sinh & Nghịch Thiên Đạo Cảnh',
        cosmicPhenomenon: 'Trời đổ mưa kim sắc, tiếng chuông đạo viễn cổ vang rền chúc phúc',
        daoInsightQuote: 'Kiếm gãy rồi đúc lại, người chết rồi tái sinh; phá tan gông cùm mới thấy đại đạo!'
      }),
      createCinematicDirectorNode('node_t_camera', 770, 690, {
        cameraPerspective: 'Cận cảnh slow-motion giọt máu rơi trên lưỡi kiếm gãy ➔ tia sét đánh nổ ➔ góc lia 360 độ từ dưới đất bay vút theo bóng lưng nhân vật xé toạc mây trời',
        visualRhythm: 'Dồn dập nghẹt thở như tiếng tim đập ➔ im bặt nửa nhịp ➔ bùng nổ vạn đạo hào quang',
        lightingTone: 'Sắc tím ma mị của thiên kiếp đối chọi ánh hoàng kim bất diệt của thần kiếm'
      }),
      createMasterSynthesisNode('node_t_master', 1130, 200, {
        narrativePacing: 'Cao trào nghẹt thở, nhiệt huyết sôi trào, văn phong bùng nổ chiến ý',
        wordCountTarget: '2500_words'
      }),
      createSpatialProseUpscalerNode('node_t_upscaler', 1490, 200, {
        styleRegister: 'Hào hùng kinh thiên động địa, chi tiết võ hiệp kết hợp tiên hiệp thượng thừa'
      }),
      createChapterOutputNode('node_t_output', 1850, 200, {
        chapterTitle: 'Chương 108: Kiếm Đoạn Trùng Sinh, Nghịch Thiên Chém Đứt Cửu Trọng Lôi Kiếp'
      })
    ],
    connections: [
      { id: 't_conn_1', fromNodeId: 'node_t_char', fromPortId: 'node_t_char_out_char', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_char', color: '#818cf8' },
      { id: 't_conn_2', fromNodeId: 'node_t_loc', fromPortId: 'node_t_loc_out_loc', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_loc', color: '#22d3ee' },
      { id: 't_conn_3', fromNodeId: 'node_t_battle', fromPortId: 'node_t_battle_out_conflict', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_conflict', color: '#fbbf24' },
      { id: 't_conn_4', fromNodeId: 'node_t_calamity', fromPortId: 'node_t_calamity_out_tragedy', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_calamity', color: '#f87171' },
      { id: 't_conn_5', fromNodeId: 'node_t_pill', fromPortId: 'node_t_pill_out_catalyst', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_catalyst', color: '#f59e0b' },
      { id: 't_conn_6', fromNodeId: 'node_t_seed', fromPortId: 'node_t_seed_out_miracle', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_miracle', color: '#34d399' },
      { id: 't_conn_7', fromNodeId: 'node_t_dao', fromPortId: 'node_t_dao_out_dao', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_dao', color: '#ec4899' },
      { id: 't_conn_8', fromNodeId: 'node_t_camera', fromPortId: 'node_t_camera_out_camera', toNodeId: 'node_t_master', toPortId: 'node_t_master_in_camera', color: '#38bdf8' },
      { id: 't_conn_9', fromNodeId: 'node_t_master', fromPortId: 'node_t_master_out_raw', toNodeId: 'node_t_upscaler', toPortId: 'node_t_upscaler_in_raw', color: '#c084fc' },
      { id: 't_conn_10', fromNodeId: 'node_t_upscaler', fromPortId: 'node_t_upscaler_out_upscaled', toNodeId: 'node_t_output', toPortId: 'node_t_output_in_upscaled', color: '#5eead4' }
    ],
    groups: [
      {
        id: 'group_t_inputs',
        title: 'Khu Vực 1: Nhân Vật & Vạn Cổ Lôi Trì',
        color: '#818cf8',
        bgColor: 'rgba(99, 102, 241, 0.05)',
        x: 30,
        y: 30,
        width: 330,
        height: 680
      },
      {
        id: 'group_t_battle',
        title: 'Khu Vực 2: Đại Chiến, Thiên Kiếp & Đan Dược Tôi Thể',
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.05)',
        x: 380,
        y: 30,
        width: 330,
        height: 980
      },
      {
        id: 'group_t_dao',
        title: 'Khu Vực 3: Thần Mộc, Đạo Ngộ & Góc Máy Điện Ảnh',
        color: '#06b6d4',
        bgColor: 'rgba(6, 182, 212, 0.05)',
        x: 740,
        y: 30,
        width: 330,
        height: 980
      },
      {
        id: 'group_t_engine',
        title: 'Khu Vực 4: Master Engine & Chapter Output',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.05)',
        x: 1090,
        y: 120,
        width: 1050,
        height: 520
      }
    ]
  },
  {
    id: 'preset_talisman_beast_epic',
    name: 'Mẫu 7: Vạn Cổ Tru Tiên Trận & Thần Thú Hộ Tông',
    subtitle: 'Đại Trận Thái Cổ, Thần Thú Giáng Thế & Nghịch Thiên Phong Ma',
    description: 'Quy tụ Linh Thú Hộ Mệnh, Phù Lục Tuyệt Sát và Trận Pháp Cấm Kỵ chống lại Ma Triều',
    badge: 'Đại Trận & Thần Thú',
    nodes: [
      createCharacterLoaderNode('node_arr_char', 50, 70, {
        characterName: 'Lăng Tiêu',
        realm: 'Hóa Thần Sơ Kỳ (Chân Long Khí Vận)',
        weapon: 'Thái Sơ Trảm Tiên Kiếm & Hỗn Độn Trận Bàn'
      }),
      createLocationSettingNode('node_arr_loc', 50, 390, {
        locationName: 'Thái Sơ Thần Sơn • Vạn Kiếm Nhai Cấm Địa',
        region: 'Đông Hoang Thần Vực • Thiên Cơ Tông Sơn Môn',
        residualAura: 'Khí tức đại trận ngút trời, phù văn lơ lửng như tinh tú ngân hà'
      }),
      createCalamityRuinsNode('node_arr_calamity', 410, 70, {
        calamityType: 'Thái Cổ Ma Triều Huyết Tế Vạn Dặm',
        ruinScale: 'Trăm vạn ma binh đen đặc chân trời, ma vân che khuất thái dương, sơn hà chìm trong biển máu',
        mortalTragedy: 'Tông môn đệ tử kết trận tử thủ, thi hài ma tộc chất cao như núi'
      }),
      createSpiritBeastSummonNode('node_arr_beast', 410, 390, {
        beastName: 'Thái Cổ Ngũ Trảo Kim Long',
        species: 'Hồng Hoang Chân Long Thần Thú',
        combatAura: 'Long ngâm xé toạc ma vụ, vảy rồng kim sắc bắn ra vạn đạo kiếm quang nghiền nát ma tướng'
      }),
      createTalismanFormationNode('node_arr_talisman', 770, 70, {
        formationName: 'Cửu U Tru Tiên Phong Ma Đại Trận & Càn Khôn Độn Thiên Phù',
        formationGrade: 'Viễn Cổ Thập Đại Tuyệt Trận',
        effectMechanic: 'Dẫn động linh mạch ngàn dặm, giáng xuống ba vạn đạo Tru Ma Kiếm Khí'
      }),
      createAlchemyCatalystNode('node_arr_pill', 770, 390, {
        pillName: 'Thái Ất Hồi Nguyên Thần Đan',
        pillRank: 'Cửu Phẩm Thánh Giai',
        medicinalEffect: 'Tức thời hồi phục 100% linh lực và khuếch đại uy lực trận pháp lên gấp mười lần'
      }),
      createDaoRevelationNode('node_arr_dao', 770, 710, {
        daoDomain: 'Vạn Trận Quy Tông & Sát Đạo Chỉ Sát',
        cosmicPhenomenon: 'Hư không ngưng kết, chữ "ĐẠO" màu hoàng kim tỏa sáng ngàn trượng trên đỉnh đầu'
      }),
      createCinematicDirectorNode('node_arr_camera', 770, 1030, {
        cameraPerspective: 'Flycam từ đỉnh mây nhìn xuống đại trận xoay tròn như tinh vân ➔ cận cảnh ánh mắt thần thú ➔ zoom cực đại vào ngón tay kết ấn',
        lightingTone: 'Sắc đỏ tà ma bị kim quang và tử lôi của đại trận nuốt chửng'
      }),
      createMasterSynthesisNode('node_arr_master', 1130, 200, {
        narrativePacing: 'Hùng tráng bi tráng, hoành tráng chiến trận, bùng nổ kỳ tích',
        wordCountTarget: '2800_words'
      }),
      createSpatialProseUpscalerNode('node_arr_upscaler', 1490, 200, {
        styleRegister: 'Sử thi hùng tráng tiên hiệp, dày đặc điển cố và thi ảnh tráng lệ'
      }),
      createChapterOutputNode('node_arr_output', 1850, 200, {
        chapterTitle: 'Chương 109: Vạn Cổ Tru Tiên Trận Khởi, Thần Long Bãi Vĩ Trấn U Hồn'
      })
    ],
    connections: [
      { id: 'arr_c1', fromNodeId: 'node_arr_char', fromPortId: 'node_arr_char_out_char', toNodeId: 'node_arr_beast', toPortId: 'node_arr_beast_in_char', color: '#818cf8' },
      { id: 'arr_c2', fromNodeId: 'node_arr_char', fromPortId: 'node_arr_char_out_char', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_char', color: '#818cf8' },
      { id: 'arr_c3', fromNodeId: 'node_arr_loc', fromPortId: 'node_arr_loc_out_loc', toNodeId: 'node_arr_talisman', toPortId: 'node_arr_talisman_in_loc', color: '#22d3ee' },
      { id: 'arr_c4', fromNodeId: 'node_arr_loc', fromPortId: 'node_arr_loc_out_loc', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_loc', color: '#22d3ee' },
      { id: 'arr_c5', fromNodeId: 'node_arr_calamity', fromPortId: 'node_arr_calamity_out_tragedy', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_calamity', color: '#f87171' },
      { id: 'arr_c6', fromNodeId: 'node_arr_beast', fromPortId: 'node_arr_beast_out_beast', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_beast', color: '#f97316' },
      { id: 'arr_c7', fromNodeId: 'node_arr_talisman', fromPortId: 'node_arr_talisman_out_formation', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_talisman', color: '#8b5cf6' },
      { id: 'arr_c8', fromNodeId: 'node_arr_pill', fromPortId: 'node_arr_pill_out_catalyst', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_catalyst', color: '#f59e0b' },
      { id: 'arr_c9', fromNodeId: 'node_arr_dao', fromPortId: 'node_arr_dao_out_dao', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_dao', color: '#ec4899' },
      { id: 'arr_c10', fromNodeId: 'node_arr_camera', fromPortId: 'node_arr_camera_out_camera', toNodeId: 'node_arr_master', toPortId: 'node_arr_master_in_camera', color: '#38bdf8' },
      { id: 'arr_c11', fromNodeId: 'node_arr_master', fromPortId: 'node_arr_master_out_raw', toNodeId: 'node_arr_upscaler', toPortId: 'node_arr_upscaler_in_raw', color: '#c084fc' },
      { id: 'arr_c12', fromNodeId: 'node_arr_upscaler', fromPortId: 'node_arr_upscaler_out_upscaled', toNodeId: 'node_arr_output', toPortId: 'node_arr_output_in_upscaled', color: '#5eead4' }
    ],
    groups: [
      {
        id: 'group_arr_p1',
        title: 'Khu Vực 1: Nhân Vật, Địa Linh & Ma Triều',
        color: '#818cf8',
        bgColor: 'rgba(99, 102, 241, 0.05)',
        x: 30,
        y: 30,
        width: 350,
        height: 680
      },
      {
        id: 'group_arr_p2',
        title: 'Khu Vực 2: Thần Thú Hộ Tông & Cổ Trận Phong Tỏa',
        color: '#f97316',
        bgColor: 'rgba(249, 115, 22, 0.05)',
        x: 390,
        y: 30,
        width: 350,
        height: 680
      },
      {
        id: 'group_arr_p3',
        title: 'Khu Vực 3: Trận Đạo, Thần Dược & Góc Máy Điện Ảnh',
        color: '#8b5cf6',
        bgColor: 'rgba(139, 92, 246, 0.05)',
        x: 750,
        y: 30,
        width: 350,
        height: 1300
      },
      {
        id: 'group_arr_p4',
        title: 'Khu Vực 4: Master Engine & Đầu Ra Bản Thảo',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.05)',
        x: 1110,
        y: 120,
        width: 1050,
        height: 520
      }
    ]
  },

  // -----------------------------------------------------------------------
  // PRESET 8: CỔ THẦN THỨC TỈNH & LU N HỒI NGHỊCH CHUYỂN (CHÍ TÔN THẦN THOẠI)
  // -----------------------------------------------------------------------
  {
    id: 'workflow_ancient_god_awakening',
    name: 'Cổ Thần Thức Tỉnh & Luân Hồi Nghịch Chuyển',
    subtitle: 'Hắc Ám Động Loạn, Thần Mộ khai mở, Cổ Thần giáng thế chuyển càn khôn',
    description: 'Workflow đỉnh cao 12 nút: Đại kiếp chư thiên tịch diệt, huyết mạch Cổ Thần thức tỉnh, triệu hoán Thôn Thiên Thần Lang, tế xuất Lục Đạo Luân Hồi Trận nghịch thiên cải mệnh.',
    badge: 'Chí Tôn • Thần Thoại',
    nodes: [
      createCharacterLoaderNode('node_ag_char', 50, 70, {
        characterName: 'Diệp Trần (Hỗn Độn Tiên Tôn Trọng Sinh)',
        realm: 'Cổ Thần Lục Tinh (Chuẩn Bị Đột Phá Thất Tinh Chí Tôn)',
        weapon: 'Khai Thiên Thần Phủ & Luân Hồi Kính',
        objective: 'Phá toái gông xiềng thiên đạo, cứu vớt cửu châu chúng sinh khỏi tịch diệt'
      }),
      createLocationSettingNode('node_ag_loc', 50, 380, {
        locationName: 'Luân Hồi Hải • Thái Cổ Thần Mộ',
        region: 'Vực sâu vô tận chôn cất chư thần thượng cổ, thời không thác loạn'
      }),
      createCalamityRuinsNode('node_ag_calamity', 50, 690, {
        calamityType: 'Hắc Ám Động Loạn • Chư Thiên Tịch Diệt',
        ruinScale: 'Vạn giới sụp đổ, lôi đình màu máu xé toạc bầu trời, hư không vỡ vụn',
        mortalTragedy: 'Muôn vàn tu sĩ hóa thành tro bụi, sơn hà tiêu điều táng mạng',
        poignantDetail: 'Một nhánh hoa sen trắng nở cô độc trên đỉnh sọ hóa thạch của cự thần'
      }),
      createTalismanFormationNode('node_ag_talisman', 410, 70, {
        formationName: 'Thái Cổ Lục Đạo Luân Hồi Diệt Ma Cổ Trận',
        formationRank: 'Thần Giai Cấm Kỵ Đại Trận',
        formationMechanism: 'Vận chuyển sáu đạo luân hồi chi lực, hút cạn tà khí biến thành linh tuyền cam lộ',
        formationIncantation: 'Lục đạo luân hồi, nghịch chuyển sinh tử, càn khôn định vị, vạn ma tịch diệt!'
      }),
      createSpiritBeastSummonNode('node_ag_beast', 410, 380, {
        beastName: 'Thái Cổ Thôn Thiên Hắc Lang Vương',
        beastSpecies: 'Hung Thú Cấm Kỵ Thời Không Tộc',
        beastBloodline: 'Không Gian Thôn Phệ Thần Huyết 100%',
        beastPresence: 'Mắt đỏ như huyết nguyệt, một ngụm nuốt trọn ma vân ngàn dặm, gầm vang chấn vỡ vòm mây'
      }),
      createLongevitySeedNode('node_ag_seed', 410, 690, {
        seedName: 'Thái Cổ Sinh Mệnh Hỗn Độn Thần Chủng',
        descentGlow: 'Hạt giống tỏa ra ánh sáng phỉ thúy cửu sắc bao bọc toàn bộ Thần Mộ',
        sproutingAura: 'Dây leo sinh mệnh cuốn quanh Khai Thiên Phủ, nở rộ vạn đóa trường sinh liên',
        camLoEffect: 'Mưa cam lộ rơi xuống hồi sinh vạn vạn hài cốt anh linh thời viễn cổ'
      }),
      createBattleBreakthroughNode('node_ag_battle', 770, 70, {
        opponent: 'Hắc Ám Cổ Tôn • Vô Tận Hư Vô Ma Chủ',
        opponentRealm: 'Ma Thần Bán Bộ Cực Cảnh',
        battleTechnique: 'Cổ Thần Cửu Quyền - Đệ Thất Quyền: Nghịch Loạn m Dương',
        breakthroughPhenomenon: 'Trán rực sáng thêm ngôi sao thứ bảy, hào quang Cổ Thần Thất Tinh chiếu sáng Tam Giới'
      }),
      createDaoRevelationNode('node_ag_dao', 770, 380, {
        daoDomain: 'Sinh Tử Luân Hồi & Khởi Nguyên Tạo Hóa',
        epiphanyTrigger: 'Thấu suốt quy luật tử cực sinh sinh khi chứng kiến đóa sen nở trên đầu lâu cự thần',
        cosmicPhenomenon: 'Trời đất ngân vang cổ chuông, hoa sen vàng mọc đầy trong hư không ba vạn dặm',
        daoInsightQuote: 'Cái chết chỉ là khởi đầu của sự tái sinh, luân hồi bất diệt, đạo ta trường tồn.'
      }),
      createCinematicDirectorNode('node_ag_camera', 770, 690, {
        cameraPerspective: 'Orbit xoay vòng 360 độ từ đáy vực sâu Thần Mộ ➔ Lia thẳng lên đỉnh vòm trời hoàng kim',
        lightingTone: 'Tương phản ngoạn mục giữa hắc ám tà khí đỏ sẫm và kim quang cứu thế thanh khiết',
        visualRhythm: 'Tiết tấu dồn dập đến nghẹt thở rồi bùng nổ tráng lệ, giải phóng năng lượng tuyệt đỉnh',
        soundscapeCue: 'Tiếng sấm ma gầm ➔ Khoảng lặng vô thanh ➔ Tiếng long ngâm lang hống và chuông đại đạo vang rền'
      }),
      createMasterSynthesisNode('node_ag_master', 1130, 200, {
        narrativePacing: 'Đại sử thi thần thoại đỉnh cao, nhiệt huyết bùng cháy kết hợp mỹ cảm bi tráng',
        wordCountTarget: '2000_words',
        perspective: 'Ngôi thứ ba toàn tri'
      }),
      createSpatialProseUpscalerNode('node_ag_upscaler', 1490, 200, {
        styleRegister: 'Đại sử thi hùng tráng tiên hiệp, dày đặc điển cố, triết lý nhân sinh và thi ảnh tráng lệ'
      }),
      createChapterOutputNode('node_ag_output', 1850, 200, {
        chapterTitle: 'Chương 150: Cổ Thần Thức Tỉnh, Nhất Chỉ Luân Hồi Định Càn Khôn'
      })
    ],
    connections: [
      { id: 'ag_c1', fromNodeId: 'node_ag_char', fromPortId: 'node_ag_char_out_char', toNodeId: 'node_ag_beast', toPortId: 'node_ag_beast_in_char', color: '#818cf8' },
      { id: 'ag_c2', fromNodeId: 'node_ag_char', fromPortId: 'node_ag_char_out_char', toNodeId: 'node_ag_battle', toPortId: 'node_ag_battle_in_char', color: '#818cf8' },
      { id: 'ag_c3', fromNodeId: 'node_ag_char', fromPortId: 'node_ag_char_out_char', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_char', color: '#818cf8' },
      { id: 'ag_c4', fromNodeId: 'node_ag_loc', fromPortId: 'node_ag_loc_out_loc', toNodeId: 'node_ag_talisman', toPortId: 'node_ag_talisman_in_loc', color: '#22d3ee' },
      { id: 'ag_c5', fromNodeId: 'node_ag_loc', fromPortId: 'node_ag_loc_out_loc', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_loc', color: '#22d3ee' },
      { id: 'ag_c6', fromNodeId: 'node_ag_calamity', fromPortId: 'node_ag_calamity_out_tragedy', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_calamity', color: '#f87171' },
      { id: 'ag_c7', fromNodeId: 'node_ag_talisman', fromPortId: 'node_ag_talisman_out_formation', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_talisman', color: '#06b6d4' },
      { id: 'ag_c8', fromNodeId: 'node_ag_beast', fromPortId: 'node_ag_beast_out_beast', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_beast', color: '#10b981' },
      { id: 'ag_c9', fromNodeId: 'node_ag_seed', fromPortId: 'node_ag_seed_out_miracle', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_seed', color: '#34d399' },
      { id: 'ag_c10', fromNodeId: 'node_ag_battle', fromPortId: 'node_ag_battle_out_battle', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_conflict', color: '#fbbf24' },
      { id: 'ag_c11', fromNodeId: 'node_ag_dao', fromPortId: 'node_ag_dao_out_dao', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_dao', color: '#ec4899' },
      { id: 'ag_c12', fromNodeId: 'node_ag_camera', fromPortId: 'node_ag_camera_out_camera', toNodeId: 'node_ag_master', toPortId: 'node_ag_master_in_camera', color: '#38bdf8' },
      { id: 'ag_c13', fromNodeId: 'node_ag_master', fromPortId: 'node_ag_master_out_raw', toNodeId: 'node_ag_upscaler', toPortId: 'node_ag_upscaler_in_raw', color: '#c084fc' },
      { id: 'ag_c14', fromNodeId: 'node_ag_upscaler', fromPortId: 'node_ag_upscaler_out_upscaled', toNodeId: 'node_ag_output', toPortId: 'node_ag_output_in_upscaled', color: '#5eead4' }
    ],
    groups: [
      {
        id: 'group_ag_p1',
        title: 'Khu Vực 1: Nhân Vật, Thần Mộ & Hắc Ám Động Loạn',
        color: '#818cf8',
        bgColor: 'rgba(99, 102, 241, 0.05)',
        x: 30,
        y: 30,
        width: 350,
        height: 1000
      },
      {
        id: 'group_ag_p2',
        title: 'Khu Vực 2: Trận Pháp, Thần Thú & Mầm Sinh Mệnh',
        color: '#06b6d4',
        bgColor: 'rgba(6, 182, 212, 0.05)',
        x: 390,
        y: 30,
        width: 350,
        height: 1000
      },
      {
        id: 'group_ag_p3',
        title: 'Khu Vực 3: Đột Phá Lôi Kiếp, Đạo Ngộ & Góc Máy',
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.05)',
        x: 750,
        y: 30,
        width: 350,
        height: 1000
      },
      {
        id: 'group_ag_p4',
        title: 'Khu Vực 4: Master Engine & Đầu Ra Bản Thảo',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.05)',
        x: 1110,
        y: 120,
        width: 1050,
        height: 520
      }
    ]
  }
];
