import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  CharacterProfile,
  StoryNode,
  StoryConnection,
  StoryWorkflowPreset,
  StoryWorkflowExecutionResult,
  StoryWorkflowVariant,
  StoryPort,
  StoryGroupFrame
} from '../types';
import {
  PRESET_STORY_WORKFLOWS,
  createCharacterLoaderNode,
  createLocationSettingNode,
  createCalamityRuinsNode,
  createLongevitySeedNode,
  createBattleBreakthroughNode,
  createAlchemyCatalystNode,
  createDaoRevelationNode,
  createCinematicDirectorNode,
  createTalismanFormationNode,
  createSpiritBeastSummonNode,
  createStoryPromptNode,
  createMasterSynthesisNode,
  createSpatialProseUpscalerNode,
  createChapterOutputNode
} from '../data/presetStoryNodeWorkflows';
import { executeStoryWorkflow } from '../services/geminiService';

interface Props {
  characters?: CharacterProfile[];
  genre?: string;
  tone?: string;
  onInsertText?: (text: string) => void;
  onCreateChapter?: (title: string, content: string, summary: string) => void;
  onSwitchToEditor?: () => void;
  activeStoryBible?: any;
  currentChapter?: any;
}

// Sound Synthesizer via Native Web Audio API
const playAudioFeedback = (type: 'click' | 'connect' | 'hum' | 'chime', enabled: boolean = true) => {
  if (!enabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'connect') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'hum') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(280, now + 0.35);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch {
    // Ignore audio autoplay restrictions
  }
};

const CALAMITY_QUICK_PRESETS = [
  {
    label: '⚔️ Huyết chiến vạn người',
    type: 'Chiến trường hoang tàn sau đại chiến vạn người',
    scale: 'Vạn thanh binh khí gãy vụn cắm ngập trên đất cháy, xác chiến xa lật nghiêng bốc khói đen',
    tragedy: 'Thương binh lết giữa thi hài ngổn ngang, tiếng quạ kêu bi thảm xé toạc hoàng hôn',
    detail: 'Đôi giày cỏ trẻ con vương máu nằm bên mép vực sâu'
  },
  {
    label: '☀️ Đại hạn hán nứt nẻ',
    type: 'Thiên tai đại hạn hán kéo dài ba năm ròng rã',
    scale: 'Sông cạn trơ đáy nứt toác như mai rùa, đồng ruộng cháy khô thành tro xám',
    tragedy: 'Dân làng đói lả gom từng nhánh cỏ khô, hài đồng khóc ngất vì khát',
    detail: 'Một chiếc bát sành nứt vỡ nằm trơ trọi bên giếng làng đã cạn khô'
  },
  {
    label: '🌊 Đại hồng thủy ngập lụt',
    type: 'Đại hồng thủy ngập lụt cuốn phăng thôn trang',
    scale: 'Nước lũ đỏ ngầu cuồn cuộn dâng cao ngập nóc nhà, cây cổ thụ bị bứng tận gốc',
    tragedy: 'Xác gia súc trôi dạt vô định, tiếng gào khóc tìm người thân nghẹn ngào trong mưa bão',
    detail: 'Một con diều giấy rách tả tơi mắc kẹt trên ngọn cây ngâm trong nước bùn'
  },
  {
    label: '💥 Thành trì nổ tung sụp đổ',
    type: 'Tòa thành cổ ngàn năm bị pháp bảo cháy nổ và sụp đổ',
    scale: 'Tường thành đá hoa cương vỡ vụn từng mảng lớn, lửa ma đạo bùng lên thiêu rụi lầu son',
    tragedy: 'Khói độc bao phủ bầu trời đêm, cấm địa tổ tông biến thành biển lửa',
    detail: 'Tấm biển hiệu dát vàng rơi xuống bậc thềm vỡ làm đôi'
  },
  {
    label: '🌌 Hư không cấm địa sụp đổ',
    type: 'Không gian cấm địa vỡ nát, thiên lôi cuồng nộ giáng thế',
    scale: 'Hư không rách toạc từng khe nứt sâu thẳm, linh mạch đứt đoạn gào thét',
    tragedy: 'Vạn vật bị lực hút hư vô nuốt chửng, vạn pháp điêu linh',
    detail: 'Những mảnh gương vỡ không gian phản chiếu hình ảnh đất trời đảo lộn'
  }
];

const SEED_QUICK_PRESETS = [
  {
    label: '🌱 Mầm xanh đâm chồi ngàn trượng',
    name: 'Thái Cổ Trường Sinh Thần Chủng',
    glow: 'Hạt giống xanh biếc lấp lánh như viên phỉ thúy rơi từ cửu thiên rạch thủng mây mù',
    aura: 'Rễ thần ôm trọn đao kiếm gãy vụn, đâm chồi nở hoa linh chi ngào ngạt',
    effect: 'Mưa cam lộ rải xuống làm lành mọi thương tích, biến nấm mồ vạn người thành tiên cảnh trần gian'
  },
  {
    label: '🌧️ Mưa cam lộ tẩy uế',
    name: 'Cửu Thiên Tịnh Thế Huyền Chủng',
    glow: 'Hạt ngọc tỏa ánh bạch kim rực rỡ xua tan mây mù tà ám',
    aura: 'Lá cây đọng sương mai rơi xuống đâu, tử khí và oán hận tan biến đến đó',
    effect: 'Những người hấp hối bỗng da thịt hồng hào trở lại, oán hồn được vãng sinh siêu thoát'
  },
  {
    label: '🌸 Đao kiếm trổ hoa linh chi',
    name: 'Hóa Kiếm Vi Hoa Sinh Tử Đan Chủng',
    glow: 'Hạt mầm phát ra tiếng ngân chuông thanh thoát giữa tiếng gió rít',
    aura: 'Từng lưỡi gươm rỉ sét bỗng trổ ra những bông hoa sen tuyết trắng tinh khôi',
    effect: 'Sát khí chuyển hóa thành thiên địa linh khí nồng đậm gấp mười lần'
  },
  {
    label: '💧 Suối nguồn sinh mệnh tuôn trào',
    name: 'Hỗn Độn Tạo Hóa Linh Chủng',
    glow: 'Viên ngọc chạm đất lập tức phát ra tiếng suối róc rách ấm áp',
    aura: 'Mạch nước ngầm sinh mệnh tuôn trào làm đầy lại lòng sông cạn',
    effect: 'Cỏ cây hoa lá đua nhau nảy lộc, chim muông bay về ca hát rộn rã'
  },
  {
    label: '🕊️ Tiên cảnh bồng lai phục sinh',
    name: 'Bất Tử Bất Diệt Đế Chủng',
    glow: 'Hào quang bảy sắc bừng sáng chiếu rọi cả một góc trời Tây Hoang',
    aura: 'Cổ Mộc vươn cao chọc thủng vòm mây, xòe tán lọng chở che cho trăm họ',
    effect: 'Một thánh địa tu tiên mới ra đời từ chính nấm mồ phế tích năm xưa'
  }
];

const PILL_QUICK_PRESETS = [
  {
    label: '🧪 Cửu Chuyển Hoàn Hồn Đan',
    name: 'Cửu Chuyển Sinh Tử Hoán Cốt Đan',
    rank: 'Thần Phẩm Thượng Cổ Chí Bảo',
    effect: 'Hóa giải tử khí ngàn năm, kích thích hạt mầm trường sinh cắm sâu vào lòng đất',
    phenomenon: 'Hương thơm đan dược xua tan mây đen, xuất hiện đan vân cửu sắc rực rỡ'
  },
  {
    label: '✨ Thái Cực Sinh Hóa Đan',
    name: 'Thái Cực Âm Dương Hồi Sinh Đan',
    rank: 'Cực Phẩm Tiên Thiên Đạo Đan',
    effect: 'Cân bằng âm dương trời đất, chuyển hóa sát khí chiến trường thành ngọc dịch cam lộ',
    phenomenon: 'Khí tức hai màu đen trắng xoay tròn như đồ hình Bát Quái che chở vạn dặm'
  },
  {
    label: '🔥 Bất Diệt Niết Bàn Đan',
    name: 'Chân Hoàng Niết Bàn Tiên Đan',
    rank: 'Đế Phẩm Niết Bàn Thần Dược',
    effect: 'Tái sinh vạn vật từ tro tàn, khiến cỏ cây đao kiếm hóa thành ngọc bích',
    phenomenon: 'Hư ảnh Phượng Hoàng lửa bay lượn trên trời rồi hóa thành mưa ngũ sắc cứu nhân gian'
  }
];

const DAO_QUICK_PRESETS = [
  {
    label: '☯️ Sinh Tử Luân Hồi',
    domain: 'Sinh Tử Luân Hồi & Vạn Vật Bất Hủ',
    trigger: 'Chứng kiến cảnh tàn sát phế tích, bỗng thấu tỏ lý cùng tắc biến, tử cực sinh sinh',
    phenomenon: 'Tử khí đông lai ba vạn dặm, hoa sen hư không nở rộ trên bầu trời phế tích',
    quote: 'Cái chết chỉ là phân bón cho sinh mệnh mới vươn cao ngút ngàn.'
  },
  {
    label: '🌌 Hỗn Độn Khởi Nguyên',
    domain: 'Hỗn Độn Thái Sơ & Tạo Hóa Khai Thiên',
    trigger: 'Tiếp xúc với hạt mầm trường sinh, cảm nhận được hơi thở của kỷ nguyên đầu tiên',
    phenomenon: 'Trời đất chìm trong sắc vàng ấm áp, chuông đạo ngân vang từ hư vô',
    quote: 'Từ trong hư vô sinh ra vạn hữu, từ trong tàn lụi phục sinh càn khôn.'
  },
  {
    label: '⚡ Nghịch Thiên Độ Chúng',
    domain: 'Nghịch Thiên Cải Mệnh & Bách Tính An Bình',
    trigger: 'Nghe tiếng khóc than của người dân lầm than, đạo tâm kiên định thề cứu vớt muôn người',
    phenomenon: 'Lôi kiếp giáng xuống nhưng bị kiếm ý từ bi hóa giải thành ánh sáng hiền hòa',
    quote: 'Tu đạo không vì phi thăng làm thần, chỉ nguyện nhân gian khói bếp bình an.'
  }
];

const CAMERA_QUICK_PRESETS = [
  {
    label: '🎬 Toàn Cảnh ➔ Cận Cảnh Mầm',
    perspective: 'Trượt từ đại cảnh hoang vu điêu linh ➔ cận cảnh vỏ hạt mầm nứt toác ➔ góc ngửa đón ánh rạng đông',
    tone: 'Sắc xám tro tàn u tịch chuyển sang ánh sáng hoàng kim thanh khiết rực rỡ',
    rhythm: 'Nhịp điệu dồn nén nghẹt thở chuyển sang bùng nổ tráng lệ vô song',
    cue: 'Tiếng gió rít thê lương ➔ khoảng lặng tĩnh mịch ➔ tiếng ngân chuông sinh mệnh thánh thót'
  },
  {
    label: '⚡ Góc Ngửa Lôi Kiếp ➔ Chiếu Đất Nở Hoa',
    perspective: 'Góc máy ngửa 80 độ ngắm lôi kiếp xé rách trời ➔ lia thần tốc xuống đất bùn trổ hoa sen',
    tone: 'Tương phản cực mạnh giữa sấm tím hủy diệt và ánh sáng xanh lục cứu rỗi',
    rhythm: 'Dồn dập như mưa rào thác đổ rồi thả lỏng êm đềm như mặt hồ phẳng lặng',
    cue: 'Tiếng sấm sét rền vang ➔ tiếng giọt nước thánh cam lộ rơi tí tách êm dịu'
  },
  {
    label: '👁️ Toàn Tri Từ Trên Cao (Orbit)',
    perspective: 'Góc nhìn toàn tri từ tầng mây thứ chín xoay vòng 360 độ ngắm làn sóng xanh tỏa khắp đại địa',
    tone: 'Bầu trời đêm chuyển màu lam ngọc bích rồi bừng sáng nhật nguyệt đồng huy',
    rhythm: 'Trang nghiêm tráng lệ, mở rộng không gian vô hạn',
    cue: 'Hợp xướng thánh ca tiên tộc hòa quyện tiếng tiêu dao sáo trúc bay bổng'
  }
];

const TALISMAN_QUICK_PRESETS = [
  {
    label: '🔯 Cửu Cung Hỗn Nguyên',
    name: 'Cửu Cung Hỗn Nguyên Kim Cương Kết Giới',
    rank: 'Thiên Giai Thượng Phẩm • Cấm Kỵ Cổ Trận',
    mechanism: 'Hấp thu cửu thiên tinh hoa, tạo vòm sáng kim quang bất hoại ngăn cản vạn kiếp sát phạt',
    incantation: 'Cửu cung định vị, hỗn nguyên quy nhất, vạn kiếp bất xâm, càn khôn vĩnh cố!'
  },
  {
    label: '⚔️ Vạn Kiếm Chu Thiên',
    name: 'Thái Ất Vạn Kiếm Chu Thiên Trận',
    rank: 'Thần Giai • Công Phạt Vô Song',
    mechanism: 'Vạn đạo kiếm quang ngưng tụ thành kiếm võng xé toạc thương khung, chém tan cấm chế thiên địa',
    incantation: 'Vạn kiếm triều tông, thiên ý thuận hành, sát phạt chi kiếm, phá diệt hoàn vũ!'
  },
  {
    label: '🌀 Lục Đạo Khóa Hồn',
    name: 'Thái Thượng Lục Đạo Tỏa Hồn Phù Trận',
    rank: 'Chuẩn Thần Giai • Phong Ấn Cấm Thuật',
    mechanism: 'Lục đạo phù văn liên hoàn phong ấn nguyên thần kẻ địch, cưỡng chế giam cầm vào hư không luân hồi',
    incantation: 'Lục đạo luân hồi, linh hồn hữu tỏa, thiên địa cấm cố, vĩnh thế trầm luân!'
  }
];

const BEAST_QUICK_PRESETS = [
  {
    label: '🐉 Thái Cổ Kim Long',
    name: 'Thái Cổ Ngũ Trảo Hoàng Kim Cự Long',
    species: 'Thần Thú Khởi Nguyên Hoàng Kim Long Tộc',
    bloodline: 'Huyết mạch Khai Thiên 100% Thuần Khiết',
    presence: 'Long ngâm chấn động cửu tiêu, long uy tràn ngập ngàn vạn dặm khiến vạn linh quỳ phục run rẩy'
  },
  {
    label: '🐦 Bất Diệt Phượng Hoàng',
    name: 'Cửu U Niết Bàn Bất Tử Phượng Hoàng',
    species: 'Thần Thú Hỏa Tộc Thượng Cổ',
    bloodline: 'Chân Hỏa Bất Diệt Cửu Chuyển Chi Huyết',
    presence: 'Liệt diễm ngũ sắc thiêu đốt hư vô, giang cánh che rợp nửa bầu trời, dục hỏa trùng sinh cứu độ chúng sinh'
  },
  {
    label: '🐺 U Minh Thôn Thiên Lang',
    name: 'Thái Cổ Thôn Thiên Hắc Lang Vương',
    species: 'Hung Thú Cấm Kỵ Không Gian Tộc',
    bloodline: 'Không Gian Thôn Phệ Thần Huyết',
    presence: 'Đồng tử màu huyết nguyệt rực cháy, nuốt trọn lôi kiếp vào bụng như ăn kẹo, gầm thét xé rách hư không'
  }
];

export const VisualStoryNodeWorkflowStudio: React.FC<Props> = ({
  characters = [],
  genre = 'Tiên Hiệp Cổ Phong',
  tone = 'Hùng tráng bi tráng, nhiệt huyết',
  onInsertText,
  onCreateChapter,
  onSwitchToEditor,
  activeStoryBible,
  currentChapter
}) => {
  // Custom Group Frames Defaults
  const DEFAULT_GROUP_FRAMES: StoryGroupFrame[] = useMemo(() => [
    {
      id: 'group_inputs',
      title: 'Khu Vực 1: Nguồn Dữ Liệu Nhân Vật, Bối Cảnh & Thiên Tai',
      color: '#818cf8',
      bgColor: 'rgba(99, 102, 241, 0.05)',
      x: 30,
      y: 40,
      width: 630,
      height: 720
    },
    {
      id: 'group_engine',
      title: 'Khu Vực 2: Máy Khởi Tạo AI Master & Upscaler Điển Tích',
      color: '#a855f7',
      bgColor: 'rgba(168, 85, 247, 0.05)',
      x: 690,
      y: 110,
      width: 710,
      height: 520
    },
    {
      id: 'group_output',
      title: 'Khu Vực 3: Trạm Đầu Ra Bản Thảo & Chèn Truyện',
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.05)',
      x: 1430,
      y: 110,
      width: 350,
      height: 480
    }
  ], []);

  // User Presets from LocalStorage
  const [userPresets, setUserPresets] = useState<StoryWorkflowPreset[]>(() => {
    try {
      const saved = localStorage.getItem('story_workflow_custom_presets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Preset Selection
  const [selectedPresetId, setSelectedPresetId] = useState<string>(PRESET_STORY_WORKFLOWS[0].id);

  // Graph State: Nodes, Connections, and Group Frames
  const [nodes, setNodes] = useState<StoryNode[]>(() => {
    return JSON.parse(JSON.stringify(PRESET_STORY_WORKFLOWS[0].nodes));
  });
  const [connections, setConnections] = useState<StoryConnection[]>(() => {
    return JSON.parse(JSON.stringify(PRESET_STORY_WORKFLOWS[0].connections));
  });
  const [groupFrames, setGroupFrames] = useState<StoryGroupFrame[]>(() => {
    return PRESET_STORY_WORKFLOWS[0].groups || DEFAULT_GROUP_FRAMES;
  });

  // Canvas Pan & Zoom
  const [zoom, setZoom] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 30, y: 30 });
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sound FX and Minimap Radar States
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isMinimapOpen, setIsMinimapOpen] = useState<boolean>(true);

  // Wire Hover for Quick-Cut Scissors
  const [hoveredConnId, setHoveredConnId] = useState<string | null>(null);

  // Group Frame Dragging
  const [draggingGroupId, setDraggingGroupId] = useState<string | null>(null);
  const groupDragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Context Menu State for Quick Node Creation
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    canvasX: number;
    canvasY: number;
    searchQuery: string;
  } | null>(null);

  // Random Seed and Batch Variants
  const [generationSeed, setGenerationSeed] = useState<number>(() => Math.floor(Math.random() * 899999 + 100000));
  const [selectedVariantId, setSelectedVariantId] = useState<string>('variant_epic');

  // Node Dragging
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Wire Connecting & Hover Snapping
  const [connectingPort, setConnectingPort] = useState<{
    nodeId: string;
    portId: string;
    portType: string;
    direction: 'in' | 'out';
    color: string;
    startX: number;
    startY: number;
  } | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredPortId, setHoveredPortId] = useState<string | null>(null);

  // Selected Node for detailed parameter editing & Multi-Selection
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('node_master_engine');
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>(['node_master_engine']);
  const [isMarqueeMode, setIsMarqueeMode] = useState<boolean>(false);
  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);
  const isMarqueeDraggingRef = useRef<boolean>(false);
  const multiDragInitialPositionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());

  // History Undo / Redo Stack
  const [history, setHistory] = useState<Array<{ nodes: StoryNode[]; connections: StoryConnection[]; groupFrames: StoryGroupFrame[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Execution Phase Pipeline (Simulation Flow for Animated Highlighting)
  const [executionPhase, setExecutionPhase] = useState<'idle' | 'sources' | 'catalysts' | 'synthesis' | 'upscaling' | 'done'>('idle');

  // Minimap Dragging Ref
  const isMinimapDraggingRef = useRef<boolean>(false);

  const [isPromptInspectorOpen, setIsPromptInspectorOpen] = useState<boolean>(true);

  // Custom Preset Modal State
  const [isSavePresetModalOpen, setIsSavePresetModalOpen] = useState<boolean>(false);
  const [newPresetForm, setNewPresetForm] = useState<{
    name: string;
    subtitle: string;
    description: string;
    badge: string;
  }>({
    name: '',
    subtitle: '',
    description: '',
    badge: 'Bản Mẫu Riêng'
  });

  // Export Diagram / Architecture Modal State
  const [isExportDiagramModalOpen, setIsExportDiagramModalOpen] = useState<boolean>(false);
  const [exportModalTab, setExportModalTab] = useState<'mermaid' | 'markdown' | 'json' | 'import' | 'image'>('mermaid');
  const [importJsonText, setImportJsonText] = useState<string>('');
  const [pngResolutionScale, setPngResolutionScale] = useState<number>(2);
  const [isRenderingPng, setIsRenderingPng] = useState<boolean>(false);

  // Story Bible Bridge Modal State
  const [isStoryBibleSyncModalOpen, setIsStoryBibleSyncModalOpen] = useState<boolean>(false);

  // Wire Routing Style: curved (Bézier), orthogonal (Manhattan), straight
  const [wireRoutingStyle, setWireRoutingStyle] = useState<'curved' | 'orthogonal' | 'straight'>('curved');

  // Quick Node Search Filter & Jump
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [nodeSearchQuery, setNodeSearchQuery] = useState<string>('');

  // Execution State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<StoryWorkflowExecutionResult | null>(null);
  const [resultViewTab, setResultViewTab] = useState<'upscaled' | 'raw' | 'compare' | 'cinematic'>('upscaled');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Combined Presets
  const allPresets = useMemo(() => {
    return [...PRESET_STORY_WORKFLOWS, ...userPresets];
  }, [userPresets]);

  // Push graph state to undo/redo history
  const pushHistory = (newNodes: StoryNode[], newConnections: StoryConnection[], newGroups: StoryGroupFrame[]) => {
    setHistory(prev => {
      const slice = historyIndex >= 0 ? prev.slice(0, historyIndex + 1) : [];
      return [...slice, {
        nodes: JSON.parse(JSON.stringify(newNodes)),
        connections: JSON.parse(JSON.stringify(newConnections)),
        groupFrames: JSON.parse(JSON.stringify(newGroups))
      }].slice(-30);
    });
    setHistoryIndex(prev => Math.min(prev + 1, 29));
  };

  // Initialize history with initial state
  useEffect(() => {
    if (history.length === 0 && nodes.length > 0) {
      setHistory([{
        nodes: JSON.parse(JSON.stringify(nodes)),
        connections: JSON.parse(JSON.stringify(connections)),
        groupFrames: JSON.parse(JSON.stringify(groupFrames))
      }]);
      setHistoryIndex(0);
    }
  }, []);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevEntry = history[historyIndex - 1];
      setNodes(JSON.parse(JSON.stringify(prevEntry.nodes)));
      setConnections(JSON.parse(JSON.stringify(prevEntry.connections)));
      setGroupFrames(JSON.parse(JSON.stringify(prevEntry.groupFrames)));
      setHistoryIndex(historyIndex - 1);
      playAudioFeedback('click', isSoundEnabled);
      showToast('↩️ Hoàn tác thay đổi gần nhất!');
    } else {
      showToast('Đã ở trạng thái khởi đầu, không còn bước hoàn tác!');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextEntry = history[historyIndex + 1];
      setNodes(JSON.parse(JSON.stringify(nextEntry.nodes)));
      setConnections(JSON.parse(JSON.stringify(nextEntry.connections)));
      setGroupFrames(JSON.parse(JSON.stringify(nextEntry.groupFrames)));
      setHistoryIndex(historyIndex + 1);
      playAudioFeedback('click', isSoundEnabled);
      showToast('↪️ Làm lại thay đổi!');
    } else {
      showToast('Đã ở trạng thái mới nhất!');
    }
  };

  // Node active in pipeline simulation phase
  const isNodeActiveInPhase = (node: StoryNode, phase: string): boolean => {
    if (phase === 'sources') {
      return ['character_input', 'character_loader', 'location_input', 'location_setting', 'calamity_ruins', 'longevity_seed', 'battle_breakthrough'].includes(node.type);
    }
    if (phase === 'catalysts') {
      return ['alchemy_catalyst', 'dao_revelation', 'cinematic_director', 'talisman_formation', 'spirit_beast_summon', 'story_prompt'].includes(node.type);
    }
    if (phase === 'synthesis') {
      return node.type === 'master_synthesis';
    }
    if (phase === 'upscaling') {
      return node.type === 'spatial_prose_upscaler';
    }
    if (phase === 'done') {
      return node.type === 'chapter_output';
    }
    return false;
  };

  // Batch Operations for Multiple Selected Nodes
  const handleBatchDelete = () => {
    if (selectedNodeIds.length === 0) return;
    const toDelete = new Set(selectedNodeIds);
    const newNodes = nodes.filter(n => !toDelete.has(n.id));
    const newConnections = connections.filter(c => !toDelete.has(c.fromNodeId) && !toDelete.has(c.toNodeId));
    setNodes(newNodes);
    setConnections(newConnections);
    pushHistory(newNodes, newConnections, groupFrames);
    setSelectedNodeIds([]);
    setSelectedNodeId(null);
    playAudioFeedback('click', isSoundEnabled);
    showToast(`🗑️ Đã xóa ${toDelete.size} nút khỏi workflow!`);
  };

  const handleBatchDuplicate = () => {
    if (selectedNodeIds.length === 0) return;
    const idMap = new Map<string, string>();
    const duplicatedNodes: StoryNode[] = [];

    selectedNodeIds.forEach((oldId, idx) => {
      const node = nodes.find(n => n.id === oldId);
      if (!node) return;
      const newId = `node_${Date.now()}_${idx}_${Math.random().toString(36).substring(2, 5)}`;
      idMap.set(oldId, newId);
      const cloned: StoryNode = {
        ...JSON.parse(JSON.stringify(node)),
        id: newId,
        title: `${node.title} (Bản sao)`,
        x: node.x + 40,
        y: node.y + 40,
        inputs: node.inputs.map(p => ({ ...p, id: `${newId}_${p.id.split('_').slice(2).join('_')}` })),
        outputs: node.outputs.map(p => ({ ...p, id: `${newId}_${p.id.split('_').slice(2).join('_')}` }))
      };
      duplicatedNodes.push(cloned);
    });

    // Re-wire internal connections between duplicated nodes
    const duplicatedConnections: StoryConnection[] = [];
    connections.forEach(conn => {
      if (idMap.has(conn.fromNodeId) && idMap.has(conn.toNodeId)) {
        const newFromNodeId = idMap.get(conn.fromNodeId)!;
        const newToNodeId = idMap.get(conn.toNodeId)!;
        const newFromNode = duplicatedNodes.find(n => n.id === newFromNodeId);
        const newToNode = duplicatedNodes.find(n => n.id === newToNodeId);
        const fromPortSuffix = conn.fromPortId.split('_').slice(2).join('_');
        const toPortSuffix = conn.toPortId.split('_').slice(2).join('_');
        const newFromPort = newFromNode?.outputs.find(p => p.id.endsWith(fromPortSuffix)) || newFromNode?.outputs[0];
        const newToPort = newToNode?.inputs.find(p => p.id.endsWith(toPortSuffix)) || newToNode?.inputs[0];

        if (newFromPort && newToPort) {
          duplicatedConnections.push({
            id: `conn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            fromNodeId: newFromNodeId,
            fromPortId: newFromPort.id,
            toNodeId: newToNodeId,
            toPortId: newToPort.id,
            color: conn.color
          });
        }
      }
    });

    const newNodes = [...nodes, ...duplicatedNodes];
    const newConnections = [...connections, ...duplicatedConnections];
    setNodes(newNodes);
    setConnections(newConnections);
    pushHistory(newNodes, newConnections, groupFrames);

    const newIds = duplicatedNodes.map(n => n.id);
    setSelectedNodeIds(newIds);
    setSelectedNodeId(newIds[0]);
    playAudioFeedback('chime', isSoundEnabled);
    showToast(`⎘ Đã nhân bản cụm ${duplicatedNodes.length} nút cùng ${duplicatedConnections.length} đường dây liên kết!`);
  };

  const handleBatchGroup = () => {
    if (selectedNodeIds.length === 0) return;
    const selected = nodes.filter(n => selectedNodeIds.includes(n.id));
    if (selected.length === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    selected.forEach(n => {
      minX = Math.min(minX, n.x);
      maxX = Math.max(maxX, n.x + (n.width || 260));
      minY = Math.min(minY, n.y);
      maxY = Math.max(maxY, n.y + (n.collapsed ? 55 : 220));
    });

    const padding = 25;
    const newGroup: StoryGroupFrame = {
      id: `group_${Date.now()}`,
      title: `Nhóm phân vùng: ${selected[0].title} & ${selected.length - 1} nút`,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.05)',
      x: Math.round(minX - padding),
      y: Math.round(minY - padding - 20),
      width: Math.round(maxX - minX + padding * 2),
      height: Math.round(maxY - minY + padding * 2 + 20)
    };

    const newGroups = [...groupFrames, newGroup];
    setGroupFrames(newGroups);
    pushHistory(nodes, connections, newGroups);
    playAudioFeedback('chime', isSoundEnabled);
    showToast(`📦 Đã tạo Khung Phân Vùng bao quanh ${selected.length} nút!`);
  };

  const handleBatchAlign = (direction: 'horizontal' | 'vertical') => {
    if (selectedNodeIds.length < 2) {
      showToast('Cần chọn ít nhất 2 nút để căn thẳng hàng!');
      return;
    }
    const selected = nodes.filter(n => selectedNodeIds.includes(n.id));
    if (selected.length < 2) return;

    let newNodes: StoryNode[];
    if (direction === 'horizontal') {
      const avgY = Math.round(selected.reduce((sum, n) => sum + n.y, 0) / selected.length);
      newNodes = nodes.map(n => selectedNodeIds.includes(n.id) ? { ...n, y: avgY } : n);
    } else {
      const avgX = Math.round(selected.reduce((sum, n) => sum + n.x, 0) / selected.length);
      newNodes = nodes.map(n => selectedNodeIds.includes(n.id) ? { ...n, x: avgX } : n);
    }

    setNodes(newNodes);
    pushHistory(newNodes, connections, groupFrames);
    playAudioFeedback('click', isSoundEnabled);
    showToast(`📐 Đã căn thẳng hàng ${direction === 'horizontal' ? 'ngang' : 'dọc'} cho ${selected.length} nút!`);
  };

  const handleBatchToggleMute = () => {
    if (selectedNodeIds.length === 0) return;
    const anyUnmuted = nodes.some(n => selectedNodeIds.includes(n.id) && !n.muted);
    const newNodes = nodes.map(n => selectedNodeIds.includes(n.id) ? { ...n, muted: anyUnmuted } : n);
    setNodes(newNodes);
    pushHistory(newNodes, connections, groupFrames);
    playAudioFeedback('click', isSoundEnabled);
    showToast(`🔇 Đã ${anyUnmuted ? 'bỏ qua (Mute)' : 'kích hoạt lại (Unmute)'} ${selectedNodeIds.length} nút!`);
  };

  // Switch Preset
  const handleSelectPreset = (presetId: string) => {
    const preset = allPresets.find(p => p.id === presetId);
    if (!preset) return;
    setSelectedPresetId(presetId);
    const loadedNodes = JSON.parse(JSON.stringify(preset.nodes));
    const loadedConns = JSON.parse(JSON.stringify(preset.connections));
    const loadedGroups = preset.groups && preset.groups.length > 0
      ? JSON.parse(JSON.stringify(preset.groups))
      : DEFAULT_GROUP_FRAMES;

    setNodes(loadedNodes);
    setConnections(loadedConns);
    setGroupFrames(loadedGroups);
    setSelectedNodeIds(loadedNodes.length > 0 ? [loadedNodes[0].id] : []);
    setSelectedNodeId(loadedNodes.length > 0 ? loadedNodes[0].id : null);
    pushHistory(loadedNodes, loadedConns, loadedGroups);
    setExecutionResult(null);
    setPan({ x: 30, y: 30 });
    setZoom(0.85);
    playAudioFeedback('click', isSoundEnabled);
    showToast(`Đã nạp bộ workflow: "${preset.name}"!`);
  };

  // Save Custom Preset into LocalStorage
  const handleSaveCustomPreset = () => {
    if (!newPresetForm.name.trim()) {
      showToast('Vui lòng nhập tên cho bản mẫu!');
      return;
    }
    const newPreset: StoryWorkflowPreset = {
      id: `user_preset_${Date.now()}`,
      name: newPresetForm.name.trim(),
      subtitle: newPresetForm.subtitle.trim() || 'Bản mẫu workflow tự thiết kế',
      description: newPresetForm.description.trim() || 'Workflow do tác giả cấu hình',
      badge: newPresetForm.badge.trim() || 'Tác Giả',
      nodes: JSON.parse(JSON.stringify(nodes)),
      connections: JSON.parse(JSON.stringify(connections)),
      groups: JSON.parse(JSON.stringify(groupFrames))
    };

    const updated = [newPreset, ...userPresets];
    setUserPresets(updated);
    try {
      localStorage.setItem('story_workflow_custom_presets', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setSelectedPresetId(newPreset.id);
    setIsSavePresetModalOpen(false);
    playAudioFeedback('chime', isSoundEnabled);
    showToast(`💾 Đã lưu đồ phổ "${newPreset.name}" vào danh sách bản mẫu cá nhân!`);
  };

  // Delete User Preset
  const handleDeleteUserPreset = (presetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = userPresets.filter(p => p.id !== presetId);
    setUserPresets(updated);
    try {
      localStorage.setItem('story_workflow_custom_presets', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (selectedPresetId === presetId) {
      handleSelectPreset(PRESET_STORY_WORKFLOWS[0].id);
    }
    playAudioFeedback('click', isSoundEnabled);
    showToast('Đã xóa bản mẫu cá nhân!');
  };

  // Auto-Layout Algorithm (Layered Hierarchical Graph Layout)
  const handleAutoLayout = () => {
    const columns: StoryNode[][] = [[], [], [], [], []];

    nodes.forEach(node => {
      switch (node.type) {
        case 'character_loader':
        case 'character_input' as any:
        case 'location_setting':
        case 'location_input' as any:
        case 'calamity_ruins':
          columns[0].push(node);
          break;
        case 'longevity_seed':
        case 'battle_breakthrough':
        case 'alchemy_catalyst':
        case 'dao_revelation':
        case 'cinematic_director':
        case 'talisman_formation':
        case 'spirit_beast_summon':
        case 'story_prompt':
          columns[1].push(node);
          break;
        case 'master_synthesis':
          columns[2].push(node);
          break;
        case 'spatial_prose_upscaler':
          columns[3].push(node);
          break;
        case 'chapter_output':
          columns[4].push(node);
          break;
        default:
          columns[1].push(node);
          break;
      }
    });

    const colXPositions = [50, 410, 770, 1130, 1490];
    const newNodes = nodes.map(node => {
      let colIdx = columns.findIndex(col => col.some(n => n.id === node.id));
      if (colIdx === -1) colIdx = 0;
      const rowIdx = columns[colIdx].findIndex(n => n.id === node.id);

      const targetX = colXPositions[colIdx] || (50 + colIdx * 360);
      const targetY = 70 + (rowIdx >= 0 ? rowIdx * (node.collapsed ? 90 : 310) : 0);

      return {
        ...node,
        x: targetX,
        y: targetY
      };
    });

    const updatedGroups: StoryGroupFrame[] = [
      {
        id: 'group_inputs',
        title: 'Khu Vực 1: Nguồn Dữ Liệu Bối Cảnh, Nhân Vật & Thiên Tai',
        color: '#818cf8',
        bgColor: 'rgba(99, 102, 241, 0.05)',
        x: 30,
        y: 30,
        width: 350,
        height: Math.max(680, columns[0].length * 310 + 70)
      },
      {
        id: 'group_prompts',
        title: 'Khu Vực 2: Thần Dược, Đạo Ngộ, Trận Pháp & Thần Thú',
        color: '#2dd4bf',
        bgColor: 'rgba(45, 212, 191, 0.05)',
        x: 390,
        y: 30,
        width: 350,
        height: Math.max(480, columns[1].length * 310 + 70)
      },
      {
        id: 'group_engine',
        title: 'Khu Vực 3: Master Engine & Upscaler Điển Tích',
        color: '#a855f7',
        bgColor: 'rgba(168, 85, 247, 0.05)',
        x: 750,
        y: 30,
        width: 710,
        height: 600
      },
      {
        id: 'group_output',
        title: 'Khu Vực 4: Đầu Ra Bản Thảo & Chèn Truyện',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.05)',
        x: 1470,
        y: 30,
        width: 350,
        height: 520
      }
    ];

    setNodes(newNodes);
    setGroupFrames(updatedGroups);
    setPan({ x: 25, y: 25 });
    setZoom(0.72);
    playAudioFeedback('chime', isSoundEnabled);
    showToast('📐 Đã tự động căn chỉnh và sắp xếp các cột đồ thị thẳng hàng khoa học!');
  };

  // Node Prompt Contribution Text for Inspection
  const getNodePromptContribution = (node: StoryNode): string => {
    if (node.muted) return '(Nút này đang bị tắt / bỏ qua, không đưa vào prompt)';
    switch (node.type) {
      case 'character_loader':
      case 'character_input' as any:
        return `[Nhân vật]: ${node.data.characterName || 'Vô danh'} | Cảnh giới: ${node.data.realm || 'Phàm nhân'} | Pháp bảo: ${node.data.weapon || 'Không'} | Động cơ: ${node.data.objective || 'Tu hành'}`;
      case 'location_setting':
      case 'location_input' as any:
        return `[Bối cảnh & Động phủ]: ${node.data.locationName || 'Địa linh'} (${node.data.region || 'Cấm địa'}) | Linh khí: ${node.data.spiritualQi || 'Thịnh vượng'} | Bầu không khí: ${node.data.atmosphere || 'Huyền bí'}`;
      case 'calamity_ruins':
        return `[Chiến tàn & Thiên tai]: Loại: ${node.data.calamityType} | Quy mô: ${node.data.ruinScale} | Bi kịch nhân gian: ${node.data.mortalTragedy} | Chi tiết đau xót: ${node.data.poignantDetail}`;
      case 'longevity_seed':
        return `[Hạt trường sinh hồi sinh]: Tên thần chủng: ${node.data.seedName} | Ánh sáng giáng thế: ${node.data.descentGlow} | Linh khí đâm chồi: ${node.data.sproutingAura} | Hiệu ứng cam lộ: ${node.data.camLoEffect}`;
      case 'battle_breakthrough':
        return `[Đại chiến & Đột phá]: Đối thủ: ${node.data.opponent} | Cảnh giới đối thủ: ${node.data.opponentRealm} | Tuyệt kỹ thi triển: ${node.data.battleTechnique} | Hiện tượng đột phá: ${node.data.breakthroughPhenomenon}`;
      case 'alchemy_catalyst':
        return `[Đan dược & Thần dược xúc tác]: Tên đan: ${node.data.pillName} | Phẩm giai: ${node.data.pillRank} | Dược hiệu: ${node.data.medicinalEffect} | Dị tượng: ${node.data.consumptionPhenomenon}`;
      case 'dao_revelation':
        return `[Đạo ngộ & Dị tượng]: Lĩnh vực: ${node.data.daoDomain} | Cơ duyên đốn ngộ: ${node.data.epiphanyTrigger} | Thiên tượng: ${node.data.cosmicPhenomenon} | Đạo âm: "${node.data.daoInsightQuote || ''}"`;
      case 'cinematic_director':
        return `[Chỉ đạo khung hình điện ảnh]: Góc nhìn/Camera: ${node.data.cameraPerspective} | Ánh sáng: ${node.data.lightingTone} | Tiết tấu: ${node.data.visualRhythm} | Âm thanh/BGM: ${node.data.soundscapeCue}`;
      case 'talisman_formation':
        return `[Trận pháp & Phù lục cấm đoán]: Tên trận: ${node.data.formationName || 'Vô danh trận'} | Phẩm giai: ${node.data.formationRank || 'Phàm trận'} | Cơ chế vận hành: ${node.data.formationMechanism || 'Chưa định'} | Khẩu quyết: "${node.data.formationIncantation || ''}"`;
      case 'spirit_beast_summon':
        return `[Thần thú & Linh thú giáng thế]: Tên thú: ${node.data.beastName || 'Vô danh linh thú'} | Chủng loài: ${node.data.beastSpecies || 'Linh thú'} | Huyết mạch: ${node.data.beastBloodline || 'Bình thường'} | Uy áp thần thông: ${node.data.beastPresence || 'Bình thường'}`;
      case 'story_prompt':
        return `[Ý tưởng dẫn dắt]: "${node.data.promptText || 'Không có'}" | Yếu tố cao trào: ${node.data.climaxHook || 'Không'}`;
      case 'master_synthesis':
        return `[Master Story Engine]: Nhịp điệu: ${node.data.narrativePacing} | Mục tiêu chữ: ${node.data.wordCountTarget} | Góc nhìn: ${node.data.perspective}`;
      case 'spatial_prose_upscaler':
        return `[Upscaler]: Phong cách: ${node.data.styleRegister} | Cấp độ: ${node.data.upscaleLevel} | Mật độ thi ảnh: ${node.data.imageryDensity}`;
      case 'chapter_output':
        return `[Chapter Output]: Tiêu đề dự kiến: ${node.data.chapterTitle}`;
      default:
        return JSON.stringify(node.data, null, 2);
    }
  };

  // Pan Canvas Mouse Handlers
  // Pan Canvas Mouse Handlers & Marquee Selection
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // Close context menu if open
    if (contextMenu) setContextMenu(null);

    // If clicking on the canvas directly (not on node)
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'svg' || (e.target as HTMLElement).classList.contains('canvas-bg')) {
      const containerRect = canvasRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const mouseCanvasX = Math.round((e.clientX - containerRect.left - pan.x) / zoom);
      const mouseCanvasY = Math.round((e.clientY - containerRect.top - pan.y) / zoom);

      // Check if marquee mode or shift key held
      if (e.shiftKey || isMarqueeMode) {
        isMarqueeDraggingRef.current = true;
        setSelectionBox({
          startX: mouseCanvasX,
          startY: mouseCanvasY,
          currentX: mouseCanvasX,
          currentY: mouseCanvasY
        });
        if (connectingPort) setConnectingPort(null);
        return;
      }

      setIsPanning(true);
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      setSelectedNodeId(null);
      setSelectedNodeIds([]);
      if (connectingPort) setConnectingPort(null);
    }
  };

  // Right Click on Canvas to Open Quick Node Context Menu
  const handleCanvasContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const containerRect = canvasRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const canvasX = Math.round((e.clientX - containerRect.left - pan.x) / zoom);
    const canvasY = Math.round((e.clientY - containerRect.top - pan.y) / zoom);

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      canvasX,
      canvasY,
      searchQuery: ''
    });
    playAudioFeedback('click', isSoundEnabled);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Canvas Pan
    if (isPanning) {
      setPan({
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y
      });
      return;
    }

    // Marquee Box Selection Drag
    if (isMarqueeDraggingRef.current && selectionBox) {
      const containerRect = canvasRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      const currentX = Math.round((e.clientX - containerRect.left - pan.x) / zoom);
      const currentY = Math.round((e.clientY - containerRect.top - pan.y) / zoom);
      setSelectionBox(prev => prev ? { ...prev, currentX, currentY } : null);
      return;
    }

    // Node Drag (Single or Multi-Node)
    if (draggingNodeId) {
      const containerRect = canvasRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const currentX = (e.clientX - containerRect.left - pan.x) / zoom - dragOffsetRef.current.x;
      const currentY = (e.clientY - containerRect.top - pan.y) / zoom - dragOffsetRef.current.y;

      const primaryInitial = multiDragInitialPositionsRef.current.get(draggingNodeId);
      if (primaryInitial && multiDragInitialPositionsRef.current.size > 1) {
        const deltaX = Math.round(currentX - primaryInitial.x);
        const deltaY = Math.round(currentY - primaryInitial.y);

        setNodes(prev =>
          prev.map(n => {
            const initial = multiDragInitialPositionsRef.current.get(n.id);
            if (initial) {
              return { ...n, x: initial.x + deltaX, y: initial.y + deltaY };
            }
            return n;
          })
        );
      } else {
        setNodes(prev =>
          prev.map(n =>
            n.id === draggingNodeId
              ? { ...n, x: Math.round(currentX), y: Math.round(currentY) }
              : n
          )
        );
      }
      return;
    }

    // Group Frame Drag
    if (draggingGroupId) {
      const containerRect = canvasRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const currentX = (e.clientX - containerRect.left - pan.x) / zoom - groupDragOffsetRef.current.x;
      const currentY = (e.clientY - containerRect.top - pan.y) / zoom - groupDragOffsetRef.current.y;

      setGroupFrames(prev =>
        prev.map(g =>
          g.id === draggingGroupId
            ? { ...g, x: Math.round(currentX), y: Math.round(currentY) }
            : g
        )
      );
      return;
    }

    // Wire Drawing
    if (connectingPort) {
      const containerRect = canvasRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      setMousePos({
        x: (e.clientX - containerRect.left - pan.x) / zoom,
        y: (e.clientY - containerRect.top - pan.y) / zoom
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    if (draggingNodeId) {
      setDraggingNodeId(null);
      multiDragInitialPositionsRef.current.clear();
      pushHistory(nodes, connections, groupFrames);
    }
    if (draggingGroupId) {
      setDraggingGroupId(null);
      pushHistory(nodes, connections, groupFrames);
    }
    isMinimapDraggingRef.current = false;

    // Conclude Marquee Box Selection
    if (isMarqueeDraggingRef.current && selectionBox) {
      isMarqueeDraggingRef.current = false;
      const minX = Math.min(selectionBox.startX, selectionBox.currentX);
      const maxX = Math.max(selectionBox.startX, selectionBox.currentX);
      const minY = Math.min(selectionBox.startY, selectionBox.currentY);
      const maxY = Math.max(selectionBox.startY, selectionBox.currentY);

      if (maxX - minX > 6 || maxY - minY > 6) {
        const selected = nodes.filter(n => {
          const w = n.width || 260;
          const h = n.collapsed ? 55 : 220;
          return n.x < maxX && n.x + w > minX && n.y < maxY && n.y + h > minY;
        });
        const ids = selected.map(n => n.id);
        setSelectedNodeIds(ids);
        if (ids.length > 0) {
          setSelectedNodeId(ids[0]);
          playAudioFeedback('chime', isSoundEnabled);
          showToast(`✨ Đã khoanh chọn ${ids.length} nút!`);
        }
      }
      setSelectionBox(null);
    }
  };

  // Group Drag Start
  const handleGroupMouseDown = (e: React.MouseEvent, groupId: string) => {
    e.stopPropagation();
    setDraggingGroupId(groupId);
    const grp = groupFrames.find(g => g.id === groupId);
    if (!grp) return;
    const containerRect = canvasRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    const mouseCanvasX = (e.clientX - containerRect.left - pan.x) / zoom;
    const mouseCanvasY = (e.clientY - containerRect.top - pan.y) / zoom;
    groupDragOffsetRef.current = {
      x: mouseCanvasX - grp.x,
      y: mouseCanvasY - grp.y
    };
  };

  const handleRemoveGroupFrame = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = groupFrames.filter(g => g.id !== groupId);
    setGroupFrames(updated);
    pushHistory(nodes, connections, updated);
    playAudioFeedback('click', isSoundEnabled);
    showToast('Đã xóa khung phân vùng!');
  };

  // Node Drag Start (Single or Multi-Node)
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (contextMenu) setContextMenu(null);

    // Multi-select with Shift click
    if (e.shiftKey) {
      setSelectedNodeIds(prev => {
        if (prev.includes(nodeId)) {
          const next = prev.filter(id => id !== nodeId);
          if (selectedNodeId === nodeId) setSelectedNodeId(next[0] || null);
          return next;
        } else {
          setSelectedNodeId(nodeId);
          return [...prev, nodeId];
        }
      });
      return;
    }

    // Normal click / drag
    let currentSelection = selectedNodeIds;
    if (!selectedNodeIds.includes(nodeId)) {
      currentSelection = [nodeId];
      setSelectedNodeIds([nodeId]);
    }
    setSelectedNodeId(nodeId);
    setDraggingNodeId(nodeId);

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const containerRect = canvasRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const mouseCanvasX = (e.clientX - containerRect.left - pan.x) / zoom;
    const mouseCanvasY = (e.clientY - containerRect.top - pan.y) / zoom;

    dragOffsetRef.current = {
      x: mouseCanvasX - node.x,
      y: mouseCanvasY - node.y
    };

    // Store relative initial positions of all selected nodes for multi-drag
    const map = new Map<string, { x: number; y: number }>();
    currentSelection.forEach(id => {
      const n = nodes.find(item => item.id === id);
      if (n) map.set(id, { x: n.x, y: n.y });
    });
    multiDragInitialPositionsRef.current = map;
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedNodeIds.length > 1) {
          e.preventDefault();
          handleBatchDelete();
        } else if (selectedNodeId) {
          handleRemoveNode(selectedNodeId);
        }
      } else if (e.key === 'Escape') {
        setConnectingPort(null);
        setContextMenu(null);
        setIsAddMenuOpen(false);
        setIsSavePresetModalOpen(false);
        setIsExportDiagramModalOpen(false);
        setIsSearchOpen(false);
        setSelectedNodeIds([]);
        setSelectedNodeId(null);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (selectedNodeIds.length > 1) {
          handleBatchDuplicate();
        } else if (selectedNodeId) {
          handleDuplicateNode(selectedNodeId);
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setSelectedNodeIds(nodes.map(n => n.id));
        if (nodes.length > 0) setSelectedNodeId(nodes[0].id);
        playAudioFeedback('click', isSoundEnabled);
        showToast(`✨ Đã chọn tất cả ${nodes.length} nút!`);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeId, selectedNodeIds, nodes, connections, groupFrames, historyIndex, history, isSoundEnabled]);

  // Port Connection Logic
  const calculatePortPos = (node: StoryNode, portId: string, direction: 'in' | 'out') => {
    const nodeWidth = node.width || 260;
    const portList = direction === 'in' ? node.inputs : node.outputs;
    const portIndex = portList.findIndex(p => p.id === portId);
    const headerHeight = 44;
    const portSpacing = 28;
    const yOffset = headerHeight + 20 + (portIndex >= 0 ? portIndex * portSpacing : 0);
    const x = direction === 'in' ? node.x : node.x + nodeWidth;
    const y = node.y + yOffset;
    return { x, y };
  };

  // Wire Path Generator based on wireRoutingStyle (curved, orthogonal, straight)
  const getWirePath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    style: 'curved' | 'orthogonal' | 'straight' = wireRoutingStyle
  ): string => {
    if (style === 'straight') {
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }
    if (style === 'orthogonal') {
      const midX = (startX + endX) / 2;
      return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;
    }
    // Default smooth Bézier
    const deltaX = Math.max(40, Math.abs(endX - startX) * 0.55);
    return `M ${startX} ${startY} C ${startX + deltaX} ${startY}, ${endX - deltaX} ${endY}, ${endX} ${endY}`;
  };

  // Jump & Pan directly to a node
  const handleJumpToNode = (nodeId: string) => {
    const targetNode = nodes.find(n => n.id === nodeId);
    if (!targetNode) return;

    setSelectedNodeId(nodeId);
    const canvasWidth = canvasRef.current?.clientWidth || 800;
    const canvasHeight = canvasRef.current?.clientHeight || 600;

    setPan({
      x: Math.round(canvasWidth / 2 - (targetNode.x + (targetNode.width || 260) / 2) * zoom),
      y: Math.round(canvasHeight / 2 - (targetNode.y + 120) * zoom)
    });
    playAudioFeedback('chime', isSoundEnabled);
    showToast(`🎯 Đã định vị nút: [${targetNode.title}]!`);
    setIsSearchOpen(false);
    setNodeSearchQuery('');
  };

  const handlePortClick = (e: React.MouseEvent, node: StoryNode, port: StoryPort) => {
    e.stopPropagation();
    const pos = calculatePortPos(node, port.id, port.direction);

    // If starting a connection
    if (!connectingPort) {
      if (port.direction === 'out') {
        setConnectingPort({
          nodeId: node.id,
          portId: port.id,
          portType: port.type,
          direction: 'out',
          color: port.color,
          startX: pos.x,
          startY: pos.y
        });
        setMousePos(pos);
        playAudioFeedback('click', isSoundEnabled);
        showToast(`Đang kéo dây từ [${node.title}] ➔ Nhấp vào cổng [Vào] của nút tiếp theo`);
      } else {
        showToast('Vui lòng bắt đầu nối từ Cổng Ra (bên phải) sang Cổng Vào (bên trái)!');
      }
      return;
    }

    // If completing a connection
    if (connectingPort.direction === 'out' && port.direction === 'in') {
      // Don't connect to self
      if (connectingPort.nodeId === node.id) {
        showToast('Không thể tự nối dây vào chính nút này!');
        setConnectingPort(null);
        return;
      }

      // Check duplicate
      const exists = connections.some(
        c => c.fromNodeId === connectingPort.nodeId &&
             c.fromPortId === connectingPort.portId &&
             c.toNodeId === node.id &&
             c.toPortId === port.id
      );

      if (exists) {
        showToast('Dây nối giữa 2 cổng này đã tồn tại!');
        setConnectingPort(null);
        return;
      }

      const newConn: StoryConnection = {
        id: `conn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        fromNodeId: connectingPort.nodeId,
        fromPortId: connectingPort.portId,
        toNodeId: node.id,
        toPortId: port.id,
        color: connectingPort.color
      };

      setConnections(prev => [...prev, newConn]);
      setConnectingPort(null);
      playAudioFeedback('connect', isSoundEnabled);
      showToast(`Đã nối dây: ${connectingPort.portId} ➔ ${port.name}!`);
    } else {
      setConnectingPort(null);
    }
  };

  // Remove Connection
  const handleRemoveConnection = (connId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connId));
    playAudioFeedback('click', isSoundEnabled);
    showToast('Đã xóa dây nối!');
  };

  // Remove Node
  const handleRemoveNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.fromNodeId !== nodeId && c.toNodeId !== nodeId));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
    playAudioFeedback('click', isSoundEnabled);
    showToast('Đã xóa nút khỏi workflow!');
  };

  // Toggle Collapse Node
  const handleToggleCollapse = (nodeId: string) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, collapsed: !n.collapsed } : n));
    playAudioFeedback('click', isSoundEnabled);
  };

  // Toggle Mute Node (Bypass)
  const handleToggleMute = (nodeId: string) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, muted: !n.muted } : n));
    playAudioFeedback('click', isSoundEnabled);
    showToast('Đã chuyển đổi trạng thái Bật / Bỏ qua nút!');
  };

  // Duplicate Node
  const handleDuplicateNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const newId = `node_${Date.now()}`;
    const newNode: StoryNode = {
      ...JSON.parse(JSON.stringify(node)),
      id: newId,
      title: `${node.title} (Bản sao)`,
      x: node.x + 30,
      y: node.y + 30,
      inputs: node.inputs.map(p => ({ ...p, id: `${newId}_${p.id.split('_').slice(2).join('_')}` })),
      outputs: node.outputs.map(p => ({ ...p, id: `${newId}_${p.id.split('_').slice(2).join('_')}` }))
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newId);
    playAudioFeedback('click', isSoundEnabled);
    showToast('Đã nhân bản nút!');
  };

  // Add New Node (Supports Canvas Position)
  const handleAddNode = (type: string, customPos?: { x: number; y: number }) => {
    const id = `node_${Date.now()}`;
    const x = customPos ? customPos.x : Math.round(-pan.x / zoom + 200 + Math.random() * 80);
    const y = customPos ? customPos.y : Math.round(-pan.y / zoom + 150 + Math.random() * 80);

    let newNode: StoryNode;
    switch (type) {
      case 'character_input':
      case 'character_loader':
        newNode = createCharacterLoaderNode(id, x, y);
        break;
      case 'location_input':
      case 'location_setting':
        newNode = createLocationSettingNode(id, x, y);
        break;
      case 'calamity_ruins':
        newNode = createCalamityRuinsNode(id, x, y);
        break;
      case 'longevity_seed':
        newNode = createLongevitySeedNode(id, x, y);
        break;
      case 'battle_breakthrough':
        newNode = createBattleBreakthroughNode(id, x, y);
        break;
      case 'alchemy_catalyst':
        newNode = createAlchemyCatalystNode(id, x, y);
        break;
      case 'dao_revelation':
        newNode = createDaoRevelationNode(id, x, y);
        break;
      case 'cinematic_director':
        newNode = createCinematicDirectorNode(id, x, y);
        break;
      case 'talisman_formation':
        newNode = createTalismanFormationNode(id, x, y);
        break;
      case 'spirit_beast_summon':
        newNode = createSpiritBeastSummonNode(id, x, y);
        break;
      case 'story_prompt':
        newNode = createStoryPromptNode(id, x, y);
        break;
      case 'master_synthesis':
        newNode = createMasterSynthesisNode(id, x, y);
        break;
      case 'spatial_prose_upscaler':
        newNode = createSpatialProseUpscalerNode(id, x, y);
        break;
      case 'chapter_output':
      default:
        newNode = createChapterOutputNode(id, x, y);
        break;
    }

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(id);
    setIsAddMenuOpen(false);
    setContextMenu(null);
    playAudioFeedback('click', isSoundEnabled);
    showToast(`Đã thêm nút: [${newNode.title}]!`);
  };

  // Minimap Data Calculation
  const minimapData = useMemo(() => {
    if (nodes.length === 0) {
      return { minX: 0, minY: 0, worldWidth: 1400, worldHeight: 900, scale: 0.1, mapWidth: 190, mapHeight: 110 };
    }
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    nodes.forEach(n => {
      minX = Math.min(minX, n.x);
      maxX = Math.max(maxX, n.x + (n.width || 260));
      minY = Math.min(minY, n.y);
      maxY = Math.max(maxY, n.y + (n.collapsed ? 50 : 280));
    });
    // Margin padding
    minX -= 120;
    maxX += 120;
    minY -= 120;
    maxY += 120;

    const mapWidth = 200;
    const mapHeight = 120;
    const worldWidth = Math.max(1400, maxX - minX);
    const worldHeight = Math.max(900, maxY - minY);
    const scale = Math.min(mapWidth / worldWidth, mapHeight / worldHeight);

    return { minX, minY, worldWidth, worldHeight, scale, mapWidth, mapHeight };
  }, [nodes]);

  const handleMinimapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const targetWorldX = minimapData.minX + clickX / minimapData.scale;
    const targetWorldY = minimapData.minY + clickY / minimapData.scale;

    const canvasWidth = canvasRef.current?.clientWidth || 800;
    const canvasHeight = canvasRef.current?.clientHeight || 600;

    setPan({
      x: Math.round(canvasWidth / 2 - targetWorldX * zoom),
      y: Math.round(canvasHeight / 2 - targetWorldY * zoom)
    });
    playAudioFeedback('click', isSoundEnabled);
  };

  // Update Node Data
  const updateNodeData = (nodeId: string, key: string, value: any) => {
    setNodes(prev =>
      prev.map(n =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, [key]: value } }
          : n
      )
    );
  };

  // Smart Auto-Wire compatible nodes
  const handleAutoWire = () => {
    const masterNode = nodes.find(n => n.type === 'master_synthesis');
    const upscalerNode = nodes.find(n => n.type === 'spatial_prose_upscaler');
    const outputNode = nodes.find(n => n.type === 'chapter_output');

    const newConns: StoryConnection[] = [...connections];

    const addIfMissing = (fromN: StoryNode, fromPortId: string, toN: StoryNode, toPortId: string, color?: string) => {
      const exists = newConns.some(
        c => c.fromNodeId === fromN.id && c.toNodeId === toN.id && c.fromPortId === fromPortId && c.toPortId === toPortId
      );
      if (!exists) {
        newConns.push({
          id: `conn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          fromNodeId: fromN.id,
          fromPortId,
          toNodeId: toN.id,
          toPortId,
          color: color || '#818cf8'
        });
      }
    };

    if (masterNode) {
      const charNode = nodes.find(n => (n.type as any) === 'character_input' || (n.type as any) === 'character_loader');
      if (charNode && charNode.outputs[0] && masterNode.inputs[0]) {
        addIfMissing(charNode, charNode.outputs[0].id, masterNode, masterNode.inputs[0].id, '#818cf8');
      }
      const locNode = nodes.find(n => (n.type as any) === 'location_input' || (n.type as any) === 'location_setting');
      if (locNode && locNode.outputs[0] && masterNode.inputs[1]) {
        addIfMissing(locNode, locNode.outputs[0].id, masterNode, masterNode.inputs[1].id, '#22d3ee');
      }
      const calNode = nodes.find(n => n.type === 'calamity_ruins');
      if (calNode && calNode.outputs[0] && masterNode.inputs[2]) {
        addIfMissing(calNode, calNode.outputs[0].id, masterNode, masterNode.inputs[2].id, '#f87171');
      }
      const seedNode = nodes.find(n => n.type === 'longevity_seed');
      if (seedNode && seedNode.outputs[0] && masterNode.inputs[3]) {
        addIfMissing(seedNode, seedNode.outputs[0].id, masterNode, masterNode.inputs[3].id, '#34d399');
      }
      const battleNode = nodes.find(n => n.type === 'battle_breakthrough');
      if (battleNode && battleNode.outputs[0] && masterNode.inputs[4]) {
        addIfMissing(battleNode, battleNode.outputs[0].id, masterNode, masterNode.inputs[4].id, '#fbbf24');
      }
      const pillNode = nodes.find(n => n.type === 'alchemy_catalyst');
      if (pillNode && pillNode.outputs[0]) {
        const inPort = masterNode.inputs.find(p => p.type === 'catalyst');
        if (inPort) addIfMissing(pillNode, pillNode.outputs[0].id, masterNode, inPort.id, '#f59e0b');
      }
      const daoNode = nodes.find(n => n.type === 'dao_revelation');
      if (daoNode && daoNode.outputs[0]) {
        const inPort = masterNode.inputs.find(p => p.type === 'dao');
        if (inPort) addIfMissing(daoNode, daoNode.outputs[0].id, masterNode, inPort.id, '#ec4899');
      }
      const cameraNode = nodes.find(n => n.type === 'cinematic_director');
      if (cameraNode && cameraNode.outputs[0]) {
        const inPort = masterNode.inputs.find(p => p.type === 'camera');
        if (inPort) addIfMissing(cameraNode, cameraNode.outputs[0].id, masterNode, inPort.id, '#38bdf8');
      }
      const talismanNode = nodes.find(n => n.type === 'talisman_formation');
      if (talismanNode && talismanNode.outputs[0]) {
        const inPort = masterNode.inputs.find(p => p.type === 'talisman');
        if (inPort) addIfMissing(talismanNode, talismanNode.outputs[0].id, masterNode, inPort.id, '#06b6d4');
      }
      const beastNode = nodes.find(n => n.type === 'spirit_beast_summon');
      if (beastNode && beastNode.outputs[0]) {
        const inPort = masterNode.inputs.find(p => p.type === 'beast');
        if (inPort) addIfMissing(beastNode, beastNode.outputs[0].id, masterNode, inPort.id, '#10b981');
      }
      const promptNode = nodes.find(n => n.type === 'story_prompt');
      if (promptNode && promptNode.outputs[0]) {
        const inPort = masterNode.inputs.find(p => p.type === 'prompt') || masterNode.inputs[masterNode.inputs.length - 1];
        if (inPort) addIfMissing(promptNode, promptNode.outputs[0].id, masterNode, inPort.id, '#2dd4bf');
      }
    }

    if (masterNode && upscalerNode && masterNode.outputs[0] && upscalerNode.inputs[0]) {
      addIfMissing(masterNode, masterNode.outputs[0].id, upscalerNode, upscalerNode.inputs[0].id, '#c084fc');
    }

    if (upscalerNode && outputNode && upscalerNode.outputs[0] && outputNode.inputs[0]) {
      addIfMissing(upscalerNode, upscalerNode.outputs[0].id, outputNode, outputNode.inputs[0].id, '#5eead4');
    }

    setConnections(newConns);
    showToast('⚡ Đã tự động kết nối thông minh toàn bộ các cổng tương thích!');
  };

  // Export Workflow JSON
  const handleExportJson = () => {
    const data = {
      version: '1.0',
      title: 'Imperium Story Node Workflow',
      exportedAt: new Date().toISOString(),
      nodes,
      connections,
      zoom,
      pan
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `story_workflow_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾 Đã xuất file đồ phổ workflow .json!');
  };

  // Import Workflow JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed.nodes) && Array.isArray(parsed.connections)) {
          setNodes(parsed.nodes);
          setConnections(parsed.connections);
          if (parsed.zoom) setZoom(parsed.zoom);
          if (parsed.pan) setPan(parsed.pan);
          showToast('📂 Đã tải và khôi phục đồ phổ workflow thành công!');
        } else {
          showToast('File JSON không đúng định dạng Story Workflow!');
        }
      } catch (err: any) {
        showToast('Lỗi đọc file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  // Generate Mermaid Diagram
  const generateMermaidDiagram = () => {
    let mermaid = `graph LR\n  %% Đồ Phổ Sáng Tác Tiên Hiệp AI (ComfyUI-Style)\n`;
    mermaid += `  classDef char fill:#1e1b4b,stroke:#818cf8,stroke-width:2px,color:#e0e7ff;\n`;
    mermaid += `  classDef loc fill:#083344,stroke:#22d3ee,stroke-width:2px,color:#cffafe;\n`;
    mermaid += `  classDef cal fill:#450a0a,stroke:#f87171,stroke-width:2px,color:#fee2e2;\n`;
    mermaid += `  classDef seed fill:#064e3b,stroke:#34d399,stroke-width:2px,color:#d1fae5;\n`;
    mermaid += `  classDef battle fill:#451a03,stroke:#fbbf24,stroke-width:2px,color:#fef3c7;\n`;
    mermaid += `  classDef pill fill:#3b1d11,stroke:#f97316,stroke-width:2px,color:#ffedd5;\n`;
    mermaid += `  classDef dao fill:#3b0764,stroke:#f472b6,stroke-width:2px,color:#fdf2f8;\n`;
    mermaid += `  classDef camera fill:#0c4a6e,stroke:#38bdf8,stroke-width:2px,color:#e0f2fe;\n`;
    mermaid += `  classDef talisman fill:#083344,stroke:#06b6d4,stroke-width:2px,color:#cffafe;\n`;
    mermaid += `  classDef beast fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#d1fae5;\n`;
    mermaid += `  classDef prompt fill:#134e4a,stroke:#2dd4bf,stroke-width:2px,color:#ccfbf1;\n`;
    mermaid += `  classDef master fill:#581c87,stroke:#a855f7,stroke-width:2px,color:#faf5ff;\n`;
    mermaid += `  classDef upscaler fill:#115e59,stroke:#14b8a6,stroke-width:2px,color:#f0fdfa;\n`;
    mermaid += `  classDef output fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#ecfdf5;\n\n`;

    nodes.forEach(n => {
      const cleanTitle = n.title.replace(/"/g, "'");
      const classType = n.type.includes('character') ? 'char' :
                        n.type.includes('location') ? 'loc' :
                        n.type === 'calamity_ruins' ? 'cal' :
                        n.type === 'longevity_seed' ? 'seed' :
                        n.type === 'battle_breakthrough' ? 'battle' :
                        n.type === 'alchemy_catalyst' ? 'pill' :
                        n.type === 'dao_revelation' ? 'dao' :
                        n.type === 'cinematic_director' ? 'camera' :
                        n.type === 'talisman_formation' ? 'talisman' :
                        n.type === 'spirit_beast_summon' ? 'beast' :
                        n.type === 'story_prompt' ? 'prompt' :
                        n.type === 'master_synthesis' ? 'master' :
                        n.type === 'spatial_prose_upscaler' ? 'upscaler' : 'output';
      mermaid += `  ${n.id}["${cleanTitle}"]:::${classType}\n`;
    });

    mermaid += `\n`;
    connections.forEach(c => {
      const fromNode = nodes.find(n => n.id === c.fromNodeId);
      const toNode = nodes.find(n => n.id === c.toNodeId);
      const fromPort = fromNode?.outputs.find(p => p.id === c.fromPortId);
      const toPort = toNode?.inputs.find(p => p.id === c.toPortId);
      const portLabel = fromPort?.label || toPort?.label || '';
      mermaid += `  ${c.fromNodeId} -->|${portLabel}| ${c.toNodeId}\n`;
    });

    return mermaid;
  };

  // Generate Markdown Architecture
  const generateMarkdownArchitecture = () => {
    const currentPreset = allPresets.find(p => p.id === selectedPresetId);
    let md = `# 🌌 Kiến Trúc Đồ Phổ Sáng Tác: ${currentPreset?.name || 'Tùy Chỉnh'}\n\n`;
    md += `> **Mô tả:** ${currentPreset?.description || 'Workflow thiết kế sáng tác tiên hiệp'}\n`;
    md += `> **Thời gian:** ${new Date().toLocaleString('vi-VN')} | **Seed:** #${generationSeed} | **Thể loại:** ${genre}\n\n`;
    md += `## 📊 Tổng Quan Thông Số\n`;
    md += `- **Tổng số Node:** ${nodes.length}\n`;
    md += `- **Số đường truyền (Connections):** ${connections.length}\n`;
    md += `- **Số phân vùng (Group Frames):** ${groupFrames.length}\n\n`;

    md += `## 🧩 Danh Sách Các Nút Trong Đồ Phổ\n\n`;
    md += `| Tên Nút | Phân Loại | Trạng Thái | Chi Tiết / Thông Số Nổi Bật |\n`;
    md += `| :--- | :--- | :---: | :--- |\n`;
    nodes.forEach(n => {
      let highlight = '';
      if (n.data.characterName) highlight = `Nhân vật: ${n.data.characterName} (${n.data.realm || ''})`;
      else if (n.data.locationName) highlight = `Địa danh: ${n.data.locationName} (${n.data.region || ''})`;
      else if (n.data.seedName) highlight = `Hạt mầm: ${n.data.seedName}`;
      else if (n.data.pillName) highlight = `Đan dược: ${n.data.pillName} (${n.data.pillRank || ''})`;
      else if (n.data.daoDomain) highlight = `Đạo ngộ: ${n.data.daoDomain}`;
      else if (n.data.cameraPerspective) highlight = `Camera: ${n.data.cameraPerspective}`;
      else if (n.data.formationName) highlight = `Trận pháp: ${n.data.formationName} (${n.data.formationRank || ''})`;
      else if (n.data.beastName) highlight = `Thần thú: ${n.data.beastName} (${n.data.beastSpecies || ''})`;
      else if (n.data.narrativePacing) highlight = `Pacing: ${n.data.narrativePacing} (${n.data.wordCountTarget || 1200} chữ)`;
      else if (n.data.styleRegister) highlight = `Văn phong: ${n.data.styleRegister}`;
      else if (n.data.chapterTitle) highlight = `Tiêu đề: ${n.data.chapterTitle}`;
      else highlight = Object.keys(n.data).slice(0, 2).map(k => `${k}: ${n.data[k]}`).join(', ');

      md += `| **${n.title}** | \`${n.type}\` | ${n.muted ? '🔇 Tắt' : '✅ Bật'} | ${highlight} |\n`;
    });

    md += `\n## 🔗 Ma Trận Đường Dẫn Cáp (Wiring Connections)\n\n`;
    md += `| Nút Nguồn | Cổng Xuất (Out) | Đường Dẫn | Cổng Nhập (In) | Nút Đích |\n`;
    md += `| :--- | :--- | :---: | :--- | :--- |\n`;
    connections.forEach(c => {
      const fromN = nodes.find(n => n.id === c.fromNodeId);
      const toN = nodes.find(n => n.id === c.toNodeId);
      const fromP = fromN?.outputs.find(p => p.id === c.fromPortId);
      const toP = toN?.inputs.find(p => p.id === c.toPortId);
      md += `| ${fromN?.title || c.fromNodeId} | \`${fromP?.label || c.fromPortId}\` | ➔ | \`${toP?.label || c.toPortId}\` | ${toN?.title || c.toNodeId} |\n`;
    });

    md += `\n## 💡 Đóng Góp Dữ Liệu Vào AI Prompt\n\n`;
    nodes.forEach(n => {
      if (!n.muted) {
        md += `### ${n.title}\n`;
        md += `\`\`\`text\n${getNodePromptContribution(n)}\n\`\`\`\n\n`;
      }
    });

    return md;
  };

  // Build SVG Vector String for Diagrams, HQ PNG, and Clipboard
  const buildSvgString = (): { svgStr: string; totalW: number; totalH: number } | null => {
    if (nodes.length === 0) return null;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    nodes.forEach(n => {
      minX = Math.min(minX, n.x);
      maxX = Math.max(maxX, n.x + (n.width || 260));
      minY = Math.min(minY, n.y);
      maxY = Math.max(maxY, n.y + (n.collapsed ? 60 : 250));
    });

    groupFrames.forEach(g => {
      minX = Math.min(minX, g.x);
      maxX = Math.max(maxX, g.x + g.width);
      minY = Math.min(minY, g.y);
      maxY = Math.max(maxY, g.y + g.height);
    });

    const padding = 120;
    const originX = Math.round(minX - padding);
    const originY = Math.round(minY - padding);
    const totalW = Math.round(maxX - minX + padding * 2);
    const totalH = Math.round(maxY - minY + padding * 2);

    let svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${originX} ${originY} ${totalW} ${totalH}" width="${totalW}" height="${totalH}" style="background-color: #080b12; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">\n`;
    svgStr += `  <defs>\n`;
    svgStr += `    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">\n`;
    svgStr += `      <circle cx="20" cy="20" r="1.2" fill="rgba(255,255,255,0.08)" />\n`;
    svgStr += `    </pattern>\n`;
    svgStr += `    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">\n`;
    svgStr += `      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>\n`;
    svgStr += `    </filter>\n`;
    svgStr += `  </defs>\n\n`;

    // Grid Background
    svgStr += `  <rect x="${originX}" y="${originY}" width="${totalW}" height="${totalH}" fill="#080b12" />\n`;
    svgStr += `  <rect x="${originX}" y="${originY}" width="${totalW}" height="${totalH}" fill="url(#grid)" />\n\n`;

    // Title Header in SVG
    const presetName = allPresets.find(p => p.id === selectedPresetId)?.name || 'Workflow Đồ Phổ Sáng Tác';
    svgStr += `  <text x="${minX}" y="${minY - 50}" fill="#e2e8f0" font-size="24" font-weight="900" letter-spacing="1">TIỂU THUYẾT GIA ĐẠI TÀI AI • ĐỒ PHỔ WORKFLOW</text>\n`;
    svgStr += `  <text x="${minX}" y="${minY - 25}" fill="#94a3b8" font-size="13">Bản mẫu: ${presetName} • Tổng: ${nodes.length} Nút, ${connections.length} Dây nối • Seed: #${generationSeed}</text>\n\n`;

    // Group Frames
    groupFrames.forEach(g => {
      svgStr += `  <g id="${g.id}">\n`;
      svgStr += `    <rect x="${g.x}" y="${g.y}" width="${g.width}" height="${g.height}" rx="18" fill="${g.bgColor}" stroke="${g.color}" stroke-width="2" stroke-dasharray="6 4" stroke-opacity="0.5"/>\n`;
      svgStr += `    <rect x="${g.x}" y="${g.y}" width="${g.width}" height="32" rx="16" fill="${g.color}" fill-opacity="0.2"/>\n`;
      svgStr += `    <text x="${g.x + 16}" y="${g.y + 21}" fill="${g.color}" font-size="12" font-weight="bold">${g.title}</text>\n`;
      svgStr += `  </g>\n`;
    });

    // Connections Wires
    connections.forEach(c => {
      const fromNode = nodes.find(n => n.id === c.fromNodeId);
      const toNode = nodes.find(n => n.id === c.toNodeId);
      if (!fromNode || !toNode) return;

      const startPos = calculatePortPos(fromNode, c.fromPortId, 'out');
      const endPos = calculatePortPos(toNode, c.toPortId, 'in');
      const deltaX = Math.abs(endPos.x - startPos.x) * 0.55;
      const pathData = `M ${startPos.x} ${startPos.y} C ${startPos.x + deltaX} ${startPos.y}, ${endPos.x - deltaX} ${endPos.y}, ${endPos.x} ${endPos.y}`;
      const color = c.color || '#818cf8';

      svgStr += `  <path d="${pathData}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>\n`;
      svgStr += `  <circle cx="${startPos.x}" cy="${startPos.y}" r="4" fill="${color}" stroke="#080b12" stroke-width="2"/>\n`;
      svgStr += `  <circle cx="${endPos.x}" cy="${endPos.y}" r="4" fill="${color}" stroke="#080b12" stroke-width="2"/>\n`;
    });

    // Nodes
    nodes.forEach(n => {
      const w = n.width || 260;
      const h = n.collapsed ? 55 : 220;

      svgStr += `  <g id="${n.id}" filter="url(#shadow)">\n`;
      svgStr += `    <rect x="${n.x}" y="${n.y}" width="${w}" height="${h}" rx="16" fill="#111624" stroke="${n.color}" stroke-width="2"/>\n`;
      svgStr += `    <rect x="${n.x}" y="${n.y}" width="${w}" height="40" rx="16" fill="${n.color}" fill-opacity="0.25"/>\n`;
      svgStr += `    <text x="${n.x + 16}" y="${n.y + 25}" fill="#ffffff" font-size="12" font-weight="bold">${n.title.replace(/"/g, "'")}</text>\n`;

      if (!n.collapsed) {
        // Ports
        n.inputs.forEach((p, idx) => {
          const py = n.y + 60 + idx * 26;
          svgStr += `    <circle cx="${n.x}" cy="${py}" r="5" fill="${p.color}" stroke="#111624" stroke-width="2"/>\n`;
          svgStr += `    <text x="${n.x + 12}" y="${py + 4}" fill="#94a3b8" font-size="10">${p.name}</text>\n`;
        });

        n.outputs.forEach((p, idx) => {
          const py = n.y + 60 + idx * 26;
          svgStr += `    <circle cx="${n.x + w}" cy="${py}" r="5" fill="${p.color}" stroke="#111624" stroke-width="2"/>\n`;
          svgStr += `    <text x="${n.x + w - 12}" y="${py + 4}" fill="#94a3b8" font-size="10" text-anchor="end">${p.name}</text>\n`;
        });

        // Key Data snippet
        let snippet = n.data.characterName ? `Nhân vật: ${n.data.characterName}` :
                      n.data.locationName ? `Bối cảnh: ${n.data.locationName}` :
                      n.data.calamityType ? `Thiên tai: ${n.data.calamityType.substring(0, 30)}...` :
                      n.data.seedName ? `Mầm sống: ${n.data.seedName}` :
                      n.data.pillName ? `Đan dược: ${n.data.pillName}` :
                      n.data.daoDomain ? `Đạo cảnh: ${n.data.daoDomain}` :
                      n.data.cameraPerspective ? `Góc quay: ${n.data.cameraPerspective.substring(0, 30)}...` :
                      n.data.formationName ? `Trận pháp: ${n.data.formationName}` :
                      n.data.beastName ? `Thần thú: ${n.data.beastName}` :
                      n.data.chapterTitle ? `Tiêu đề: ${n.data.chapterTitle}` : '';

        if (snippet) {
          svgStr += `    <rect x="${n.x + 10}" y="${n.y + h - 34}" width="${w - 20}" height="24" rx="6" fill="rgba(0,0,0,0.5)"/>\n`;
          svgStr += `    <text x="${n.x + 16}" y="${n.y + h - 18}" fill="#a5b4fc" font-size="9" font-style="italic">${snippet.replace(/"/g, "'")}</text>\n`;
        }

        // Pinned Note
        if (n.userNote) {
          svgStr += `    <text x="${n.x + 16}" y="${n.y + h - 6}" fill="#f59e0b" font-size="8">📌 ${n.userNote.substring(0, 35).replace(/"/g, "'")}</text>\n`;
        }
      }

      svgStr += `  </g>\n`;
    });

    svgStr += `</svg>`;
    return { svgStr, totalW, totalH };
  };

  // Render SVG into HTML5 Canvas (for Raster PNG & Clipboard)
  const renderSvgToCanvas = async (svgStr: string, totalW: number, totalH: number, scale: number = 2): Promise<HTMLCanvasElement> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = Math.min(totalW * scale, 8192);
      canvas.height = Math.min(totalH * scale, 8192);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas 2D context không khả dụng'));
        return;
      }
      const img = new Image();
      const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      img.onload = () => {
        ctx.fillStyle = '#080b12';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };
      img.onerror = (e) => {
        URL.revokeObjectURL(url);
        reject(new Error('Không thể chuyển đổi SVG thành đối tượng hình ảnh: ' + e));
      };
      img.src = url;
    });
  };

  // Export Standalone Vector SVG Diagram
  const handleExportSvgDiagram = () => {
    const result = buildSvgString();
    if (!result) {
      showToast('Không có nút nào để xuất sơ đồ SVG!');
      return;
    }
    const blob = new Blob([result.svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `story_workflow_${Date.now()}.svg`;
    a.click();
    URL.revokeObjectURL(url);
    playAudioFeedback('chime', isSoundEnabled);
    showToast('🖼️ Đã xuất thành công file ảnh vector SVG sắc nét!');
  };

  // Export High-Resolution PNG (Raster 2K/4K)
  const handleExportPngDiagram = async (scale: number = pngResolutionScale) => {
    const result = buildSvgString();
    if (!result) {
      showToast('Không có nút nào để xuất ảnh PNG!');
      return;
    }
    try {
      setIsRenderingPng(true);
      showToast(`Đang kết xuất ảnh PNG độ phân giải ${scale}x...`);
      const canvas = await renderSvgToCanvas(result.svgStr, result.totalW, result.totalH, scale);
      canvas.toBlob((blob) => {
        setIsRenderingPng(false);
        if (!blob) {
          showToast('Lỗi tạo dữ liệu ảnh PNG');
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `story_workflow_${Date.now()}_${scale}x.png`;
        a.click();
        URL.revokeObjectURL(url);
        playAudioFeedback('chime', isSoundEnabled);
        showToast(`📸 Đã xuất file ảnh PNG (${canvas.width}x${canvas.height}) siêu nét thành công!`);
      }, 'image/png');
    } catch (err: any) {
      setIsRenderingPng(false);
      showToast('Lỗi khi xuất ảnh PNG: ' + err.message);
    }
  };

  // Copy High-Res PNG Image Directly to Clipboard
  const handleCopyPngToClipboard = async () => {
    const result = buildSvgString();
    if (!result) {
      showToast('Không có nút nào để sao chép!');
      return;
    }
    try {
      setIsRenderingPng(true);
      showToast('Đang kết xuất ảnh vào bộ nhớ tạm...');
      const canvas = await renderSvgToCanvas(result.svgStr, result.totalW, result.totalH, 2);
      canvas.toBlob(async (blob) => {
        setIsRenderingPng(false);
        if (!blob) {
          showToast('Không thể tạo dữ liệu ảnh');
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          playAudioFeedback('chime', isSoundEnabled);
          showToast('📋 Đã sao chép ảnh sơ đồ PNG vào clipboard thành công!');
        } catch {
          showToast('Trình duyệt hạn chế sao chép ảnh trực tiếp, vui lòng dùng nút Tải PNG!');
        }
      }, 'image/png');
    } catch (err: any) {
      setIsRenderingPng(false);
      showToast('Lỗi khi sao chép ảnh: ' + err.message);
    }
  };

  // Story Bible to Graph Generator
  const handleLoadFromStoryBible = () => {
    if (!activeStoryBible) {
      showToast('Chưa có hồ sơ Story Bible nào được chọn!');
      return;
    }

    const dossier = activeStoryBible.detailedDossier;
    const firstVol = dossier?.volumes?.[0];
    const firstChap = firstVol?.chapters?.[0];
    const mainChar = dossier?.protagonistProfile || (characters && characters[0]);
    const artifact = dossier?.supremeArtifacts?.[0];
    const art = dossier?.supremeCultivationArts?.[0];
    const faction = dossier?.majorFactions?.[0];
    const realm = dossier?.exclusiveRealms?.[1];

    const newNodes: StoryNode[] = [
      // Column 1: Source Nodes
      {
        ...createCharacterLoaderNode(`node_sb_char_main_${Date.now()}`, 80, 80, {
          characterName: mainChar?.name || 'Diệp Trần',
          realm: mainChar?.cultivationRealm || 'Trúc Cơ Viên Mãn',
          spiritualRoot: mainChar?.spiritRoot || 'Ngũ Hành Hỗn Độn',
          weapon: artifact?.name || 'Thái Sơ Kiếm',
          personality: mainChar?.personality || 'Quyết đoán, ẩn nhẫn, trọng tình nghĩa'
        }),
        title: mainChar ? `Nhân vật: ${mainChar.name}` : 'Nhân vật chính',
        userNote: 'Nhân vật chính nạp từ Story Bible'
      },
      {
        ...createLocationSettingNode(`node_sb_loc_${Date.now()}`, 80, 420, {
          locationName: faction?.territory || 'Thái Hư Tiên Cảnh'
        }),
        title: faction ? `Địa danh: ${faction.territory}` : 'Bối cảnh thế giới'
      },
      {
        ...createCalamityRuinsNode(`node_sb_calamity_${Date.now()}`, 80, 760, {
          calamityType: firstChap?.coreConflict || activeStoryBible.goldenFinger || 'Đại kiếp túc mệnh'
        }),
        title: 'Xung đột & Kiếp nạn'
      },

      // Column 2: Catalysts & Artifacts
      {
        ...createLongevitySeedNode(`node_sb_seed_${Date.now()}`, 420, 80, {
          seedName: artifact?.name || 'Thái Sơ Thần Ngọc',
          botanicalAnomaly: artifact?.specialPower || 'Tỏa ra vạn đạo thần quang bất tử'
        }),
        title: artifact ? `Bảo vật: ${artifact.name}` : 'Hạt Trường Sinh'
      },
      {
        ...createAlchemyCatalystNode(`node_sb_pill_${Date.now()}`, 420, 420, {
          pillName: art ? art.name : 'Cửu Chuyển Hỗn Nguyên Đan',
          pillRank: art ? art.tier : 'Cửu Phẩm Thần Đan'
        }),
        title: art ? `Công pháp: ${art.name}` : 'Thần Đan / Bí Quyết'
      },
      {
        ...createDaoRevelationNode(`node_sb_dao_${Date.now()}`, 420, 760, {
          daoDomain: realm ? realm.exclusiveDivineAbility : 'Hỗn Độn Sinh Tử Kiếm Vực'
        }),
        title: realm ? `Cảnh giới: ${realm.realmName}` : 'Giác Ngộ Đạo Cảnh'
      },

      // Column 3: Synthesis & Engine
      {
        ...createStoryPromptNode(`node_sb_prompt_${Date.now()}`, 780, 80, {
          directorIntent: `Khai triển chương: ${firstChap?.title || 'Đại chiến mở màn'}. Mục tiêu: ${firstChap?.characterObjective || 'Đoạt bảo vượt quan'}. Manh mối: ${firstChap?.foreshadowingAndClues || 'Chân tướng gia tộc'}.`
        }),
        title: 'Chỉ đạo phân cảnh (Story Bible)'
      },
      createMasterSynthesisNode(`node_sb_master_${Date.now()}`, 780, 420),

      // Column 4: Upscaler & Output
      createSpatialProseUpscalerNode(`node_sb_upscaler_${Date.now()}`, 1180, 320),
      createChapterOutputNode(`node_sb_output_${Date.now()}`, 1560, 320, {
        chapterTitle: firstChap ? `Chương ${firstChap.chapterNumber}: ${firstChap.title}` : 'Chương Mới: Thần Thông Sơ Thành',
        wordCountTarget: 2500,
        exportDestination: 'Bản thảo tiểu thuyết chính'
      })
    ];

    // Wire them
    const newConnections: StoryConnection[] = [
      { id: `conn_${Date.now()}_1`, fromNodeId: newNodes[0].id, fromPortId: newNodes[0].outputs[0].id, toNodeId: newNodes[7].id, toPortId: newNodes[7].inputs[0].id, color: '#818cf8' },
      { id: `conn_${Date.now()}_2`, fromNodeId: newNodes[1].id, fromPortId: newNodes[1].outputs[0].id, toNodeId: newNodes[7].id, toPortId: newNodes[7].inputs[1].id, color: '#22d3ee' },
      { id: `conn_${Date.now()}_3`, fromNodeId: newNodes[2].id, fromPortId: newNodes[2].outputs[0].id, toNodeId: newNodes[7].id, toPortId: newNodes[7].inputs[2].id, color: '#f87171' },
      { id: `conn_${Date.now()}_4`, fromNodeId: newNodes[3].id, fromPortId: newNodes[3].outputs[0].id, toNodeId: newNodes[7].id, toPortId: newNodes[7].inputs[3].id, color: '#34d399' },
      { id: `conn_${Date.now()}_5`, fromNodeId: newNodes[4].id, fromPortId: newNodes[4].outputs[0].id, toNodeId: newNodes[7].id, toPortId: newNodes[7].inputs[4].id, color: '#f97316' },
      { id: `conn_${Date.now()}_6`, fromNodeId: newNodes[5].id, fromPortId: newNodes[5].outputs[0].id, toNodeId: newNodes[7].id, toPortId: newNodes[7].inputs[5].id, color: '#ec4899' },
      { id: `conn_${Date.now()}_7`, fromNodeId: newNodes[6].id, fromPortId: newNodes[6].outputs[0].id, toNodeId: newNodes[7].id, toPortId: newNodes[7].inputs[6].id, color: '#2dd4bf' },
      { id: `conn_${Date.now()}_8`, fromNodeId: newNodes[7].id, fromPortId: newNodes[7].outputs[0].id, toNodeId: newNodes[8].id, toPortId: newNodes[8].inputs[0].id, color: '#c084fc' },
      { id: `conn_${Date.now()}_9`, fromNodeId: newNodes[8].id, fromPortId: newNodes[8].outputs[0].id, toNodeId: newNodes[9].id, toPortId: newNodes[9].inputs[0].id, color: '#5eead4' },
    ];

    const newGroups: StoryGroupFrame[] = [
      {
        id: `grp_${Date.now()}_1`,
        title: `Phân vùng 1: Dữ Liệu "${activeStoryBible.title}"`,
        color: '#818cf8',
        bgColor: 'rgba(99, 102, 241, 0.05)',
        x: 40,
        y: 30,
        width: 320,
        height: 1040
      },
      {
        id: `grp_${Date.now()}_2`,
        title: 'Phân vùng 2: Cơ Duyên, Công Pháp & Đại Đạo',
        color: '#34d399',
        bgColor: 'rgba(52, 211, 153, 0.05)',
        x: 380,
        y: 30,
        width: 340,
        height: 1040
      },
      {
        id: `grp_${Date.now()}_3`,
        title: 'Phân vùng 3: Chỉ Đạo & Bộ Máy Tổng Hợp AI',
        color: '#a855f7',
        bgColor: 'rgba(168, 85, 247, 0.05)',
        x: 740,
        y: 30,
        width: 380,
        height: 720
      },
      {
        id: `grp_${Date.now()}_4`,
        title: 'Phân vùng 4: Nâng Cấp Điển Tích & Bản Thảo Xuất Bản',
        color: '#10b981',
        bgColor: 'rgba(16, 185, 129, 0.05)',
        x: 1140,
        y: 260,
        width: 780,
        height: 400
      }
    ];

    setNodes(newNodes);
    setConnections(newConnections);
    setGroupFrames(newGroups);
    pushHistory(newNodes, newConnections, newGroups);
    setSelectedNodeId(newNodes[7].id);
    setSelectedNodeIds([newNodes[7].id]);
    setPan({ x: 20, y: 20 });
    setZoom(0.75);
    playAudioFeedback('chime', isSoundEnabled);
    showToast(`🌟 Đã nạp thành công toàn bộ hồ sơ Story Bible "${activeStoryBible.title}" vào đồ phổ node!`);
    setIsStoryBibleSyncModalOpen(false);
  };

  // Sync Current Chapter Title & Summary into Active Graph
  const handleSyncCurrentChapterData = () => {
    if (!currentChapter) {
      showToast('Chưa có chương nào đang được chọn trong cây tiểu thuyết!');
      return;
    }
    const newNodes = nodes.map(n => {
      if (n.type === 'chapter_output') {
        return {
          ...n,
          data: {
            ...n.data,
            chapterTitle: currentChapter.title || 'Chương hiện tại'
          }
        };
      }
      if (n.type === 'story_prompt' && currentChapter.summary) {
        return {
          ...n,
          data: {
            ...n.data,
            directorIntent: currentChapter.summary
          }
        };
      }
      return n;
    });
    setNodes(newNodes);
    pushHistory(newNodes, connections, groupFrames);
    playAudioFeedback('connect', isSoundEnabled);
    showToast(`📄 Đã nạp tiêu đề "${currentChapter.title}" và tóm tắt vào đồ phổ!`);
    setIsStoryBibleSyncModalOpen(false);
  };

  // Download Chapter Prose as Markdown File
  const handleDownloadChapterMarkdown = () => {
    if (!executionResult) return;
    const content = resultViewTab === 'raw' ? executionResult.rawProse : currentDisplayUpscaled;
    const md = `# ${currentDisplayTitle}\n\n`
      + `> Thể loại: ${genre} | Giọng văn: ${tone}\n`
      + `> Số chữ: ${currentDisplayWordCount} từ | Seed: #${executionResult.seed || generationSeed}\n\n`
      + `## Tóm tắt phân cảnh\n${activeVariant ? activeVariant.summary : executionResult.summary}\n\n`
      + `## Nội dung chi tiết\n\n${content}\n\n`
      + `---\n*Tạo bởi Siêu App Tiểu Thuyết Gia Đại Tài AI • Visual Story Workflow Studio*`;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDisplayTitle.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    playAudioFeedback('click', isSoundEnabled);
    showToast('📥 Đã xuất file Markdown của chương!');
  };

  // Direct JSON Text Import
  const handleDirectImportJson = () => {
    try {
      if (!importJsonText.trim()) {
        showToast('Vui lòng dán chuỗi JSON cấu hình vào ô văn bản!');
        return;
      }
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed.nodes) && Array.isArray(parsed.connections)) {
        setNodes(parsed.nodes);
        setConnections(parsed.connections);
        if (Array.isArray(parsed.groupFrames)) {
          setGroupFrames(parsed.groupFrames);
        }
        if (parsed.zoom) setZoom(parsed.zoom);
        if (parsed.pan) setPan(parsed.pan);
        setIsExportDiagramModalOpen(false);
        setImportJsonText('');
        playAudioFeedback('chime', isSoundEnabled);
        showToast(`📂 Đã nạp thành công đồ phổ (${parsed.nodes.length} nút, ${parsed.connections.length} dây nối)!`);
      } else {
        showToast('Chuỗi JSON không đúng định dạng Story Workflow (cần mảng nodes và connections)!');
      }
    } catch (err: any) {
      showToast('Lỗi phân tích cú pháp JSON: ' + err.message);
    }
  };

  // Run Workflow Simulation & AI Story Generation with Animated Phase Progression
  const handleRunWorkflow = async () => {
    setIsRunning(true);
    setExecutionPhase('sources');
    playAudioFeedback('hum', isSoundEnabled);
    showToast('⚡ [Giai đoạn 1/4]: Đang đọc & xử lý Bối cảnh, Nhân vật & Chiến tàn...');

    // Mark nodes as running
    setNodes(prev => prev.map(n => ({ ...n, status: 'running' })));

    const t1 = setTimeout(() => {
      setExecutionPhase('catalysts');
      showToast('🧪 [Giai đoạn 2/4]: Kích hoạt Thần dược, Đạo ngộ & Chỉ đạo góc máy điện ảnh...');
      playAudioFeedback('hum', isSoundEnabled);
    }, 1200);

    const t2 = setTimeout(() => {
      setExecutionPhase('synthesis');
      showToast('⚙️ [Giai đoạn 3/4]: Master Story Engine đang phối hợp cao trào cốt truyện...');
      playAudioFeedback('hum', isSoundEnabled);
    }, 2800);

    const t3 = setTimeout(() => {
      setExecutionPhase('upscaling');
      showToast('🎨 [Giai đoạn 4/4]: Spatial Prose Upscaler đang thăng hoa điển tích & tu từ...');
      playAudioFeedback('hum', isSoundEnabled);
    }, 4500);

    try {
      const result = await executeStoryWorkflow({
        nodes,
        connections,
        genre,
        tone,
        seed: generationSeed
      });

      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setExecutionPhase('done');
      setExecutionResult(result);
      if (result.variants && result.variants.length > 0) {
        setSelectedVariantId(result.variants[0].variantId);
      }

      // Update output nodes with result
      setNodes(prev =>
        prev.map(n => {
          if (n.type === 'chapter_output') {
            return {
              ...n,
              status: 'success',
              data: {
                ...n.data,
                generatedProse: result.upscaledProse,
                chapterTitle: result.chapterTitle,
                summary: result.summary,
                wordCount: result.wordCount,
                isReady: true
              }
            };
          }
          return { ...n, status: 'success' };
        })
      );

      playAudioFeedback('chime', isSoundEnabled);
      showToast(`✨ Workflow hoàn tất! Đã khởi tạo phân cảnh ${result.wordCount} chữ.`);
    } catch (err: any) {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setExecutionPhase('idle');
      showToast('Lỗi khi chạy workflow: ' + err.message);
      setNodes(prev => prev.map(n => ({ ...n, status: 'error' })));
    } finally {
      setIsRunning(false);
      setTimeout(() => setExecutionPhase('idle'), 4000);
    }
  };

  const selectedNode = useMemo(() => {
    return nodes.find(n => n.id === selectedNodeId) || null;
  }, [nodes, selectedNodeId]);

  const activeVariant = useMemo(() => {
    if (!executionResult?.variants || executionResult.variants.length === 0) return null;
    return executionResult.variants.find(v => v.variantId === selectedVariantId) || executionResult.variants[0];
  }, [executionResult, selectedVariantId]);

  const currentDisplayUpscaled = activeVariant ? activeVariant.prose : (executionResult?.upscaledProse || '');
  const currentDisplayTitle = activeVariant ? activeVariant.chapterTitle : (executionResult?.chapterTitle || '');
  const currentDisplayWordCount = activeVariant ? activeVariant.wordCount : (executionResult?.wordCount || 0);

  return (
    <div className={`flex flex-col h-full bg-[#080b12] text-white relative select-none overflow-hidden ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 right-6 z-50 bg-purple-950/95 border border-purple-400 text-purple-100 text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl shadow-purple-950/80 animate-fade-in flex items-center gap-2">
          <span className="animate-spin text-sm">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header & Toolbar */}
      <div className="p-3 border-b border-white/10 bg-gradient-to-r from-gray-950 via-purple-950/40 to-gray-950 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-900/60 border border-purple-400/50 flex items-center justify-center text-lg shadow-inner">
            🕸️
          </div>
          <div>
            <h2 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-amber-200 flex items-center gap-2 tracking-wide uppercase">
              ĐỒ PHỔ SÁNG TÁC WORKFLOW (NODE CANVAS STUDIO)
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-500/40 normal-case font-mono">
                ComfyUI-Style
              </span>
            </h2>
            <p className="text-[11px] text-gray-400">
              Kéo thả nút, kết nối dây Bézier truyền tải Nhân vật, Bối cảnh, Thiên tai & Hạt trường sinh vào AI Engine
            </p>
          </div>
        </div>

        {/* Preset Selector & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Workflows */}
          <div className="flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-xl border border-white/10 text-xs">
            <span className="text-gray-400 text-[11px]">📁 Mẫu:</span>
            <select
              value={selectedPresetId}
              onChange={e => handleSelectPreset(e.target.value)}
              className="bg-transparent text-purple-300 font-bold outline-none cursor-pointer max-w-[190px] truncate"
            >
              <optgroup label="🌟 Mẫu Workflow Tiêu Chuẩn">
                {PRESET_STORY_WORKFLOWS.map(p => (
                  <option key={p.id} value={p.id} className="bg-gray-900 text-white">
                    {p.name}
                  </option>
                ))}
              </optgroup>
              {userPresets.length > 0 && (
                <optgroup label="✨ Bản Mẫu Cá Nhân (Bộ Nhớ)">
                  {userPresets.map(p => (
                    <option key={p.id} value={p.id} className="bg-gray-900 text-emerald-300">
                      ★ {p.name}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            {userPresets.some(p => p.id === selectedPresetId) && (
              <button
                onClick={(e) => handleDeleteUserPreset(selectedPresetId, e)}
                className="text-red-400 hover:text-red-200 text-xs px-1"
                title="Xóa bản mẫu cá nhân này"
              >
                🗑️
              </button>
            )}
          </div>

          {/* Save Custom Preset Button */}
          <button
            onClick={() => {
              setNewPresetForm({
                name: `Đồ phổ của tôi #${userPresets.length + 1}`,
                subtitle: 'Workflow do tác giả cấu hình',
                description: 'Bộ kết nối sáng tác tùy chỉnh',
                badge: 'Tác Giả'
              });
              setIsSavePresetModalOpen(true);
            }}
            className="px-2.5 py-1.5 bg-purple-950/70 hover:bg-purple-900/90 border border-purple-500/40 text-purple-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Lưu đồ phổ hiện tại thành bản mẫu cá nhân trong trình duyệt"
          >
            <span>💾</span> Lưu Mẫu
          </button>

          {/* Auto-Layout Graph Button */}
          <button
            onClick={handleAutoLayout}
            className="px-2.5 py-1.5 bg-cyan-950/70 hover:bg-cyan-900/90 border border-cyan-500/40 text-cyan-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Tự động sắp xếp các nút thành các cột phân lớp ngăn nắp (Topological Auto-Layout)"
          >
            <span>📐</span> Sắp Xếp
          </button>

          {/* Add Node Menu */}
          <div className="relative">
            <button
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>➕</span> Thêm Nút
            </button>

            {isAddMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-gray-950 border border-gray-700 rounded-xl shadow-2xl p-2 z-50 space-y-1 text-xs">
                <div className="text-[10px] font-bold text-gray-400 uppercase px-2 py-1">Chọn loại nút cần thêm:</div>
                <button
                  onClick={() => handleAddNode('character_input')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-indigo-950/60 text-indigo-300 flex items-center gap-2"
                >
                  <span>👤</span> Nhân Vật & Đạo Hữu
                </button>
                <button
                  onClick={() => handleAddNode('location_input')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-cyan-950/60 text-cyan-300 flex items-center gap-2"
                >
                  <span>🏔️</span> Bối Cảnh & Địa Danh
                </button>
                <button
                  onClick={() => handleAddNode('calamity_ruins')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-red-950/60 text-red-300 flex items-center gap-2"
                >
                  <span>⚡</span> Thiên Tai & Chiến Tàn Phế Tích
                </button>
                <button
                  onClick={() => handleAddNode('longevity_seed')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/60 text-emerald-300 flex items-center gap-2"
                >
                  <span>🌱</span> Hạt Trường Sinh Hồi Sinh
                </button>
                <button
                  onClick={() => handleAddNode('battle_breakthrough')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-950/60 text-amber-300 flex items-center gap-2"
                >
                  <span>⚔️</span> Đại Chiến & Đột Phá Lôi Kiếp
                </button>
                <button
                  onClick={() => handleAddNode('alchemy_catalyst')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-950/60 text-amber-300 flex items-center gap-2"
                >
                  <span>🧪</span> Đan Dược & Thần Dược Xúc Tác
                </button>
                <button
                  onClick={() => handleAddNode('dao_revelation')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-pink-950/60 text-pink-300 flex items-center gap-2"
                >
                  <span>☯️</span> Đạo Ngộ & Dị Tượng Thiên Địa
                </button>
                <button
                  onClick={() => handleAddNode('cinematic_director')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-sky-950/60 text-sky-300 flex items-center gap-2"
                >
                  <span>🎬</span> Khung Hình & Góc Máy Điện Ảnh
                </button>
                <button
                  onClick={() => handleAddNode('talisman_formation')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-cyan-950/60 text-cyan-300 flex items-center gap-2"
                >
                  <span>🔯</span> Trận Pháp & Phù Lục Cấm Đoán
                </button>
                <button
                  onClick={() => handleAddNode('spirit_beast_summon')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/60 text-emerald-300 flex items-center gap-2"
                >
                  <span>🐉</span> Linh Thú & Thần Thú Giáng Thế
                </button>
                <button
                  onClick={() => handleAddNode('story_prompt')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-teal-950/60 text-teal-300 flex items-center gap-2"
                >
                  <span>📜</span> Ý Tưởng Dẫn Dắt (Prompt)
                </button>
                <button
                  onClick={() => handleAddNode('master_synthesis')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-purple-950/60 text-purple-300 flex items-center gap-2"
                >
                  <span>⚙️</span> Máy Khởi Tạo Master Engine
                </button>
                <button
                  onClick={() => handleAddNode('spatial_prose_upscaler')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-teal-950/60 text-teal-300 flex items-center gap-2"
                >
                  <span>🎨</span> Nâng Cấp Văn Phong (Upscaler)
                </button>
                <button
                  onClick={() => handleAddNode('chapter_output')}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/60 text-emerald-300 flex items-center gap-2"
                >
                  <span>📖</span> Đầu Ra Bản Thảo (Chapter Output)
                </button>
                <div className="pt-1 border-t border-white/10 mt-1">
                  <button
                    onClick={() => {
                      const newG: StoryGroupFrame = {
                        id: `group_${Date.now()}`,
                        title: `Phân Vùng #${groupFrames.length + 1}`,
                        color: '#f59e0b',
                        bgColor: 'rgba(245, 158, 11, 0.05)',
                        x: Math.round(-pan.x / zoom + 120),
                        y: Math.round(-pan.y / zoom + 100),
                        width: 400,
                        height: 380
                      };
                      setGroupFrames(prev => [...prev, newG]);
                      setIsAddMenuOpen(false);
                      playAudioFeedback('click', isSoundEnabled);
                      showToast('Đã thêm một khung phân vùng mới!');
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-950/60 text-amber-300 flex items-center gap-2"
                  >
                    <span>📦</span> Thêm Khung Phân Vùng (Group Frame)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Story Bible & Novel Chapter Bridge Button */}
          <button
            onClick={() => setIsStoryBibleSyncModalOpen(true)}
            className="px-2.5 py-1.5 bg-gradient-to-r from-amber-950/80 to-purple-950/80 hover:brightness-125 border border-amber-500/50 text-amber-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm relative"
            title="Đồng bộ hồ sơ cốt truyện chi tiết Story Bible & Chương bản thảo hiện tại vào đồ phổ node"
          >
            <span>📚</span> Đồng Bộ Story Bible
            {activeStoryBible && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          {/* Smart Auto-Wire Button */}
          <button
            onClick={handleAutoWire}
            className="px-2.5 py-1.5 bg-indigo-950/70 hover:bg-indigo-900/90 border border-indigo-500/40 text-indigo-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Tự động nối các cổng tương thích giữa Nhân vật, Bối cảnh, Thiên tai, Hạt trường sinh với Master Engine và Upscaler"
          >
            <span>⚡</span> Nối Dây
          </button>

          {/* Direct PNG Export Button */}
          <button
            onClick={() => handleExportPngDiagram(2)}
            disabled={isRenderingPng}
            className="px-2.5 py-1.5 bg-teal-950/80 hover:bg-teal-900 border border-teal-500/50 text-teal-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm disabled:opacity-50"
            title="Tải ngay ảnh sơ đồ PNG 2K độ phân giải cao"
          >
            <span>📸</span> Tải PNG
          </button>

          {/* Direct Copy Image to Clipboard */}
          <button
            onClick={handleCopyPngToClipboard}
            disabled={isRenderingPng}
            className="px-2.5 py-1.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm disabled:opacity-50"
            title="Sao chép ảnh sơ đồ PNG trực tiếp vào bộ nhớ tạm (Clipboard)"
          >
            <span>📋</span> Chép Ảnh
          </button>

          {/* Export Diagram & Architecture Modal Button */}
          <button
            onClick={() => setIsExportDiagramModalOpen(true)}
            className="px-2.5 py-1.5 bg-gradient-to-r from-pink-950/80 to-purple-950/80 hover:brightness-125 border border-pink-500/50 text-pink-200 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm"
            title="Xuất sơ đồ Mermaid, kiến trúc đồ phổ Markdown hoặc file JSON cấu hình"
          >
            <span>🖼️</span> Xuất Sơ Đồ
          </button>

          {/* Export JSON Button */}
          <button
            onClick={handleExportJson}
            className="p-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 rounded-xl text-xs transition"
            title="Xuất file cấu hình Workflow .json để lưu trữ hoặc chia sẻ"
          >
            <span>💾</span>
          </button>

          {/* Import JSON Button */}
          <label
            className="p-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 rounded-xl text-xs cursor-pointer transition flex items-center"
            title="Nạp file cấu hình Workflow .json từ máy tính"
          >
            <span>📂</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>

          {/* Undo / Redo History Controls */}
          <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl p-0.5 text-xs">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="px-2 py-1 text-gray-300 hover:text-white disabled:opacity-30 disabled:hover:text-gray-300 transition"
              title="Hoàn tác (Ctrl + Z)"
            >
              ↶
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="px-2 py-1 text-gray-300 hover:text-white disabled:opacity-30 disabled:hover:text-gray-300 transition"
              title="Làm lại (Ctrl + Y)"
            >
              ↷
            </button>
          </div>

          {/* Marquee Box Selection Toggle */}
          <button
            onClick={() => {
              const nextMode = !isMarqueeMode;
              setIsMarqueeMode(nextMode);
              playAudioFeedback('click', isSoundEnabled);
              showToast(nextMode ? 'Chế độ Chọn Khung BẬT: Kéo chuột trên canvas để khoanh chọn nhiều nút' : 'Chế độ Chọn Khung TẮT');
            }}
            className={`p-1.5 rounded-xl border text-xs transition ${
              isMarqueeMode
                ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-200 ring-1 ring-cyan-400/50'
                : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Chế độ Chọn Khung Nhiều Nút (hoặc giữ Shift khi kéo chuột)"
          >
            ⬚
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setZoom(prev => Math.max(0.4, prev - 0.1))}
              className="px-2 py-1 text-gray-300 hover:text-white"
              title="Thu nhỏ"
            >
              −
            </button>
            <span className="px-1.5 text-[11px] font-mono text-gray-400">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
              className="px-2 py-1 text-gray-300 hover:text-white"
              title="Phóng to"
            >
              +
            </button>
            <button
              onClick={() => { setZoom(0.85); setPan({ x: 30, y: 30 }); }}
              className="px-2 py-1 text-[10px] text-purple-400 hover:text-purple-200 border-l border-gray-700"
              title="Căn giữa canvas"
            >
              Căn giữa
            </button>
          </div>

          {/* Seed Input & Randomizer */}
          <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-xl border border-white/10 text-xs">
            <span className="text-gray-400 text-[11px]" title="Seed số ngẫu nhiên cho thuật toán">🎲 Seed:</span>
            <input
              type="number"
              value={generationSeed}
              onChange={e => setGenerationSeed(parseInt(e.target.value) || 100000)}
              className="w-16 bg-transparent text-amber-300 font-mono text-[11px] outline-none text-center"
            />
            <button
              onClick={() => {
                const nextSeed = Math.floor(Math.random() * 899999 + 100000);
                setGenerationSeed(nextSeed);
                playAudioFeedback('click', isSoundEnabled);
                showToast(`Đổi Seed mới: #${nextSeed}!`);
              }}
              className="text-[11px] text-gray-400 hover:text-white px-1"
              title="Đổi Seed ngẫu nhiên mới"
            >
              🔄
            </button>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              const nextState = !isSoundEnabled;
              setIsSoundEnabled(nextState);
              if (nextState) playAudioFeedback('chime', true);
            }}
            className={`p-1.5 rounded-xl border text-xs transition ${
              isSoundEnabled
                ? 'bg-purple-950/70 border-purple-500/40 text-purple-200'
                : 'bg-gray-900 border-gray-700 text-gray-500'
            }`}
            title={isSoundEnabled ? 'Âm thanh: BẬT (nhấp để tắt)' : 'Âm thanh: TẮT (nhấp để bật)'}
          >
            {isSoundEnabled ? '🔊' : '🔇'}
          </button>

          {/* Radar Minimap Toggle */}
          <button
            onClick={() => {
              setIsMinimapOpen(!isMinimapOpen);
              playAudioFeedback('click', isSoundEnabled);
            }}
            className={`p-1.5 rounded-xl border text-xs transition ${
              isMinimapOpen
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                : 'bg-gray-900 border-gray-700 text-gray-500'
            }`}
            title={isMinimapOpen ? 'Đang hiện radar đồ thị (nhấp để ẩn)' : 'Hiện radar bản đồ thu nhỏ'}
          >
            🗺️
          </button>

          {/* Wire Routing Style Toggle */}
          <div className="flex items-center bg-gray-900 border border-gray-700 rounded-xl p-0.5 text-xs" title="Kiểu dáng đường nối dây cáp">
            <button
              onClick={() => { setWireRoutingStyle('curved'); playAudioFeedback('click', isSoundEnabled); showToast('Kiểu dây: Bézier Uốn Lượn'); }}
              className={`px-1.5 py-1 rounded-lg text-xs transition ${wireRoutingStyle === 'curved' ? 'bg-purple-900/80 text-purple-200 font-bold' : 'text-gray-400 hover:text-white'}`}
              title="Dây nối Bézier uốn lượn mềm mại"
            >
              〰️
            </button>
            <button
              onClick={() => { setWireRoutingStyle('orthogonal'); playAudioFeedback('click', isSoundEnabled); showToast('Kiểu dây: Bậc Thang Vuông Góc'); }}
              className={`px-1.5 py-1 rounded-lg text-xs transition ${wireRoutingStyle === 'orthogonal' ? 'bg-cyan-900/80 text-cyan-200 font-bold' : 'text-gray-400 hover:text-white'}`}
              title="Dây nối bậc thang vuông góc (Orthogonal / Manhattan)"
            >
              📐
            </button>
            <button
              onClick={() => { setWireRoutingStyle('straight'); playAudioFeedback('click', isSoundEnabled); showToast('Kiểu dây: Đường Thẳng'); }}
              className={`px-1.5 py-1 rounded-lg text-xs transition ${wireRoutingStyle === 'straight' ? 'bg-emerald-900/80 text-emerald-200 font-bold' : 'text-gray-400 hover:text-white'}`}
              title="Dây nối đường thẳng trực tiếp"
            >
              ⚡
            </button>
          </div>

          {/* Quick Node Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-1.5 rounded-xl border text-xs transition ${
              isSearchOpen
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-200 ring-1 ring-amber-400/50'
                : 'bg-gray-900 border-gray-700 text-gray-400 hover:text-white'
            }`}
            title="Tìm kiếm & định vị nút nhanh (Ctrl + F)"
          >
            🔍
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 rounded-xl text-xs"
            title={isFullscreen ? 'Thu nhỏ cửa sổ' : 'Toàn màn hình'}
          >
            {isFullscreen ? '↙' : '⛶'}
          </button>

          {/* Master Run Button */}
          <button
            onClick={handleRunWorkflow}
            disabled={isRunning}
            className="px-4 py-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-950 transition flex items-center gap-2 ring-1 ring-purple-300"
          >
            <span className={isRunning ? 'animate-spin' : 'animate-pulse'}>
              {isRunning ? '⏳' : '▶'}
            </span>
            <span>{isRunning ? 'Đang Chạy Workflow...' : 'CHẠY WORKFLOW SÁNG TÁC'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace: Canvas & Inspector Side-by-Side */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ================= SVG & NODE GRAPH CANVAS ================= */}
        <div
          ref={canvasRef}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleCanvasContextMenu}
          className="flex-1 h-full relative overflow-hidden bg-[#0a0d16] cursor-grab active:cursor-grabbing"
          style={{
            backgroundImage: `
              radial-gradient(circle, #252e42 1px, transparent 1px),
              linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: `${30 * zoom}px ${30 * zoom}px, ${150 * zoom}px ${150 * zoom}px, ${150 * zoom}px ${150 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
        >
          {/* Instructions Overlay */}
          <div className="absolute top-3 left-3 z-10 bg-black/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-[11px] text-gray-300 flex items-center gap-3 pointer-events-none">
            <span className="flex items-center gap-1 text-purple-300 font-semibold">
              <span>🖱️</span> Giữ chuột di chuyển
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-cyan-300 font-semibold">
              <span>⚡</span> Chuột phải chèn nút nhanh
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-300 font-semibold">
              <span>🔌</span> Nối Cổng Ra (phải) ➔ Cổng Vào (trái)
            </span>
            <span>•</span>
            <span className="text-gray-400">
              Tổng: {nodes.length} Nút | {connections.length} Dây nối
            </span>
          </div>

          {/* Execution Pipeline Flow Banner (Step-by-step progress) */}
          {(isRunning || executionPhase !== 'idle') && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-black/90 backdrop-blur-md border border-purple-500/50 rounded-2xl px-4 py-2 shadow-2xl flex items-center gap-2.5 text-xs ring-1 ring-purple-400/40 animate-fade-in">
              <span className="text-sm animate-spin">⚡</span>
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span className={`px-2 py-0.5 rounded-full border transition ${
                  executionPhase === 'sources'
                    ? 'bg-indigo-900 text-indigo-200 border-indigo-400 font-bold animate-pulse'
                    : 'bg-black/50 text-gray-500 border-gray-800'
                }`}>
                  1. Nạp Bối Cảnh
                </span>
                <span className="text-gray-600">➔</span>
                <span className={`px-2 py-0.5 rounded-full border transition ${
                  executionPhase === 'catalysts'
                    ? 'bg-amber-900 text-amber-200 border-amber-400 font-bold animate-pulse'
                    : 'bg-black/50 text-gray-500 border-gray-800'
                }`}>
                  2. Thần Dược & Đạo Ngộ
                </span>
                <span className="text-gray-600">➔</span>
                <span className={`px-2 py-0.5 rounded-full border transition ${
                  executionPhase === 'synthesis'
                    ? 'bg-purple-900 text-purple-200 border-purple-400 font-bold animate-pulse'
                    : 'bg-black/50 text-gray-500 border-gray-800'
                }`}>
                  3. Master Engine
                </span>
                <span className="text-gray-600">➔</span>
                <span className={`px-2 py-0.5 rounded-full border transition ${
                  executionPhase === 'upscaling'
                    ? 'bg-teal-900 text-teal-200 border-teal-400 font-bold animate-pulse'
                    : 'bg-black/50 text-gray-500 border-gray-800'
                }`}>
                  4. Upscaler
                </span>
                <span className="text-gray-600">➔</span>
                <span className={`px-2 py-0.5 rounded-full border transition ${
                  executionPhase === 'done'
                    ? 'bg-emerald-900 text-emerald-200 border-emerald-400 font-bold'
                    : 'bg-black/50 text-gray-500 border-gray-800'
                }`}>
                  5. Hoàn Tất ✓
                </span>
              </div>
            </div>
          )}

          {/* Quick Node Search Floating Box (Ctrl+F) */}
          {isSearchOpen && (
            <div className="absolute top-12 left-3 z-30 w-80 bg-gray-950/95 backdrop-blur-md border border-amber-500/50 rounded-2xl p-3 shadow-2xl ring-1 ring-amber-400/30 animate-fade-in space-y-2">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span>🔍</span> Tìm & Định Vị Nút (Ctrl+F)
                </span>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-400 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
              <input
                autoFocus
                type="text"
                value={nodeSearchQuery}
                onChange={e => setNodeSearchQuery(e.target.value)}
                placeholder="Nhập tên nút, nhân vật, bối cảnh..."
                className="w-full bg-black/70 border border-gray-700 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-amber-400"
              />
              <div className="max-h-48 overflow-y-auto space-y-1 text-xs pr-1 custom-scrollbar">
                {nodes
                  .filter(n => {
                    if (!nodeSearchQuery.trim()) return true;
                    const q = nodeSearchQuery.toLowerCase();
                    return (
                      n.title.toLowerCase().includes(q) ||
                      n.type.toLowerCase().includes(q) ||
                      (n.data.characterName && n.data.characterName.toLowerCase().includes(q)) ||
                      (n.data.locationName && n.data.locationName.toLowerCase().includes(q)) ||
                      (n.data.formationName && n.data.formationName.toLowerCase().includes(q)) ||
                      (n.data.beastName && n.data.beastName.toLowerCase().includes(q)) ||
                      (n.data.seedName && n.data.seedName.toLowerCase().includes(q)) ||
                      (n.data.pillName && n.data.pillName.toLowerCase().includes(q)) ||
                      (n.data.daoDomain && n.data.daoDomain.toLowerCase().includes(q)) ||
                      (n.data.opponent && n.data.opponent.toLowerCase().includes(q)) ||
                      (n.userNote && n.userNote.toLowerCase().includes(q))
                    );
                  })
                  .map(n => (
                    <div
                      key={n.id}
                      onClick={() => handleJumpToNode(n.id)}
                      className="p-2 rounded-xl bg-gray-900/60 hover:bg-amber-950/50 border border-transparent hover:border-amber-500/40 cursor-pointer flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{n.icon || '📍'}</span>
                        <div className="truncate">
                          <span className="font-bold text-gray-200 group-hover:text-amber-200 block truncate">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-gray-500 block">
                            {n.categoryLabel || n.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] text-amber-400 opacity-0 group-hover:opacity-100 font-mono transition">
                        Định vị ➔
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* SVG Canvas for Wires / Connections */}
          <svg
            className="absolute inset-0 pointer-events-none w-full h-full overflow-visible"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            <defs>
              <linearGradient id="wireGradientPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="wireGradientEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Marquee Selection Rectangle */}
            {selectionBox && (
              <g pointerEvents="none">
                <rect
                  x={Math.min(selectionBox.startX, selectionBox.currentX)}
                  y={Math.min(selectionBox.startY, selectionBox.currentY)}
                  width={Math.abs(selectionBox.currentX - selectionBox.startX)}
                  height={Math.abs(selectionBox.currentY - selectionBox.startY)}
                  fill="rgba(6, 182, 212, 0.15)"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  rx="4"
                />
              </g>
            )}

            {/* Group Frames (ComfyUI-Style Group Box Containers) */}
            {groupFrames.map(group => (
              <g key={group.id} className="pointer-events-auto">
                {/* Background Box */}
                <rect
                  x={group.x}
                  y={group.y}
                  width={group.width}
                  height={group.height}
                  rx="18"
                  fill={group.bgColor}
                  stroke={group.color}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  strokeOpacity="0.4"
                />
                {/* Header Bar */}
                <rect
                  x={group.x}
                  y={group.y}
                  width={group.width}
                  height={32}
                  rx="16"
                  fill={group.color}
                  fillOpacity="0.18"
                  className="cursor-move"
                  onMouseDown={e => handleGroupMouseDown(e, group.id)}
                />
                <text
                  x={group.x + 14}
                  y={group.y + 20}
                  fill={group.color}
                  fontSize="12"
                  fontWeight="bold"
                  letterSpacing="0.5"
                  className="cursor-move select-none"
                  onMouseDown={e => handleGroupMouseDown(e, group.id)}
                >
                  {group.title}
                </text>
                {/* Remove Group Button */}
                <g
                  className="cursor-pointer opacity-60 hover:opacity-100"
                  onClick={e => handleRemoveGroupFrame(group.id, e)}
                >
                  <circle cx={group.x + group.width - 18} cy={group.y + 16} r="9" fill="#1e1b4b" stroke={group.color} strokeWidth="1" />
                  <text
                    x={group.x + group.width - 18}
                    y={group.y + 19.5}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#f43f5e"
                    fontWeight="bold"
                  >
                    ✕
                  </text>
                </g>
              </g>
            ))}

            {/* Existing Connections */}
            {connections.map(conn => {
              const fromNode = nodes.find(n => n.id === conn.fromNodeId);
              const toNode = nodes.find(n => n.id === conn.toNodeId);
              if (!fromNode || !toNode) return null;

              const startPos = calculatePortPos(fromNode, conn.fromPortId, 'out');
              const endPos = calculatePortPos(toNode, conn.toPortId, 'in');

              const pathData = getWirePath(startPos.x, startPos.y, endPos.x, endPos.y, wireRoutingStyle);

              const wireColor = conn.color || '#818cf8';
              const midX = (startPos.x + endPos.x) / 2;
              const midY = (startPos.y + endPos.y) / 2;
              const isHovered = hoveredConnId === conn.id;

              let wireDataLabel = `${fromNode.title} ➔ ${toNode.title}`;
              if (fromNode.data.characterName) wireDataLabel = `👤 ${fromNode.data.characterName} (${fromNode.data.realm || 'Phàm nhân'})`;
              else if (fromNode.data.locationName) wireDataLabel = `🏔️ ${fromNode.data.locationName}`;
              else if (fromNode.data.formationName) wireDataLabel = `🔯 ${fromNode.data.formationName}`;
              else if (fromNode.data.beastName) wireDataLabel = `🐉 ${fromNode.data.beastName}`;
              else if (fromNode.data.seedName) wireDataLabel = `🌱 ${fromNode.data.seedName}`;
              else if (fromNode.data.calamityType) wireDataLabel = `⚡ ${fromNode.data.calamityType}`;
              else if (fromNode.data.battleTechnique) wireDataLabel = `⚔️ ${fromNode.data.battleTechnique}`;
              else if (fromNode.data.pillName) wireDataLabel = `🧪 ${fromNode.data.pillName}`;
              else if (fromNode.data.daoDomain) wireDataLabel = `☯️ ${fromNode.data.daoDomain}`;
              else if (fromNode.data.cameraPerspective) wireDataLabel = `🎬 ${fromNode.data.cameraPerspective}`;
              else if (fromNode.data.promptText) wireDataLabel = `📜 ${fromNode.data.promptText}`;
              else if (fromNode.type === 'master_synthesis') wireDataLabel = `⚙️ Dữ liệu bản thảo sơ khởi`;
              else if (fromNode.type === 'spatial_prose_upscaler') wireDataLabel = `🎨 Bản thảo văn phong thăng hoa`;

              if (wireDataLabel.length > 38) {
                wireDataLabel = wireDataLabel.substring(0, 36) + '...';
              }

              return (
                <g
                  key={conn.id}
                  className="pointer-events-auto cursor-pointer group"
                  onMouseEnter={() => setHoveredConnId(conn.id)}
                  onMouseLeave={() => setHoveredConnId(null)}
                >
                  {/* Invisible thicker path for easier click / hover */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="18"
                    onClick={() => handleRemoveConnection(conn.id)}
                  />
                  {/* Background Glow */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isHovered ? '#f43f5e' : wireColor}
                    strokeWidth={isHovered ? "7" : "5"}
                    strokeOpacity={isHovered ? "0.85" : "0.3"}
                    className="transition-all"
                  />
                  {/* Active Wire */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isHovered ? '#fb7185' : wireColor}
                    strokeWidth={isHovered ? "3.5" : "2.5"}
                    strokeDasharray={isRunning ? '8 4' : 'none'}
                    className={isRunning ? 'animate-pulse' : ''}
                  />
                  {/* Start Point Dot */}
                  <circle cx={startPos.x} cy={startPos.y} r="4" fill={wireColor} />
                  {/* End Point Dot */}
                  <circle cx={endPos.x} cy={endPos.y} r="4" fill={wireColor} />

                  {/* Animated Energy Pulses along Cable */}
                  <circle r="3.5" fill="#ffffff" filter="url(#glow)">
                    <animateMotion dur={isRunning ? "1s" : "2.5s"} repeatCount="indefinite" path={pathData} />
                  </circle>
                  <circle r="2.5" fill={wireColor}>
                    <animateMotion dur={isRunning ? "1s" : "2.5s"} begin={isRunning ? "0.5s" : "1.25s"} repeatCount="indefinite" path={pathData} />
                  </circle>

                  {/* Midpoint Scissors Quick Cut Button and Live Dataflow Probe on Wire Hover */}
                  {isHovered && (
                    <g className="animate-fade-in">
                      {/* Live Dataflow Probe Tooltip */}
                      <g className="pointer-events-none select-none">
                        <rect
                          x={midX - Math.min(130, Math.max(75, wireDataLabel.length * 4.2))}
                          y={midY - 34}
                          width={Math.min(260, Math.max(150, wireDataLabel.length * 8.4))}
                          height={22}
                          rx={11}
                          fill="#080b12"
                          stroke={wireColor}
                          strokeWidth="1.5"
                          filter="url(#glow)"
                        />
                        <text
                          x={midX}
                          y={midY - 19}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="bold"
                          fill="#f8fafc"
                          className="font-mono tracking-tight"
                        >
                          {wireDataLabel}
                        </text>
                      </g>

                      {/* Quick Cut Scissors Button */}
                      <g
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveConnection(conn.id);
                        }}
                      >
                        <circle cx={midX} cy={midY} r="14" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" filter="url(#glow)" />
                        <text
                          x={midX}
                          y={midY + 4}
                          textAnchor="middle"
                          fontSize="11"
                          fill="#f43f5e"
                          className="font-bold select-none pointer-events-none"
                        >
                          ✂️
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Live Wire being dragged */}
            {connectingPort && (
              <path
                d={getWirePath(connectingPort.startX, connectingPort.startY, mousePos.x, mousePos.y, wireRoutingStyle)}
                fill="none"
                stroke={connectingPort.color}
                strokeWidth="3"
                strokeDasharray="6 3"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* HTML Nodes Container */}
          <div
            className="absolute inset-0 pointer-events-none origin-top-left"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
            }}
          >
            {nodes.map(node => {
              const isSelected = selectedNodeIds.includes(node.id) || node.id === selectedNodeId;
              const isMultiSelected = selectedNodeIds.length > 1 && selectedNodeIds.includes(node.id);
              const isActiveInPhase = isRunning && isNodeActiveInPhase(node, executionPhase);
              const nodeWidth = node.width || 260;

              return (
                <div
                  key={node.id}
                  id={node.id}
                  style={{
                    transform: `translate(${node.x}px, ${node.y}px)`,
                    width: `${nodeWidth}px`,
                    opacity: node.muted ? 0.55 : 1,
                    borderStyle: node.muted ? 'dashed' : 'solid',
                    borderColor: isActiveInPhase ? '#fbbf24' : isSelected ? node.color : 'rgba(255, 255, 255, 0.12)',
                    boxShadow: isActiveInPhase
                      ? '0 0 35px rgba(251, 191, 36, 0.85), 0 10px 20px rgba(0, 0, 0, 0.9)'
                      : isSelected
                      ? `0 0 25px ${node.color}55, 0 10px 20px rgba(0, 0, 0, 0.8)`
                      : '0 8px 16px rgba(0, 0, 0, 0.6)'
                  }}
                  onMouseDown={e => handleNodeMouseDown(e, node.id)}
                  className={`absolute pointer-events-auto rounded-2xl bg-[#111624]/95 backdrop-blur-md border transition-all cursor-move flex flex-col overflow-visible ${
                    isActiveInPhase
                      ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-[#080b12] scale-[1.02] shadow-amber-500/50'
                      : isMultiSelected
                      ? 'ring-2 ring-cyan-400/90 shadow-cyan-950/80'
                      : node.type === 'master_synthesis'
                      ? 'ring-2 ring-purple-500/50 shadow-purple-950/80'
                      : node.type === 'spatial_prose_upscaler'
                      ? 'ring-2 ring-teal-500/50 shadow-teal-950/80'
                      : ''
                  }`}
                >
                  {/* Node Header */}
                  <div
                    className={`px-3.5 py-2.5 rounded-t-2xl bg-gradient-to-r ${node.headerBg} border-b border-white/10 flex items-center justify-between gap-2`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleCollapse(node.id); }}
                        className="text-[11px] text-gray-300 hover:text-white p-0.5 rounded transition"
                        title={node.collapsed ? 'Mở rộng chi tiết nút' : 'Thu gọn nút'}
                      >
                        {node.collapsed ? '▸' : '▾'}
                      </button>
                      <span className="text-base">{node.icon}</span>
                      <div className="truncate">
                        <div className="text-xs font-black tracking-wide truncate flex items-center gap-1.5" style={{ color: node.color }}>
                          <span>{node.title}</span>
                          {node.muted && (
                            <span className="text-[8px] px-1.5 py-0.2 rounded bg-amber-950/90 text-amber-300 border border-amber-600/40 uppercase font-mono">
                              Bỏ qua
                            </span>
                          )}
                          {isActiveInPhase && (
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-200 border border-amber-400/50 font-bold font-mono animate-pulse">
                              ⚡ Đang xử lý
                            </span>
                          )}
                        </div>
                        <div className="text-[9px] text-gray-400 font-mono">
                          {node.categoryLabel}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {node.status === 'running' && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      )}
                      {node.status === 'success' && (
                        <span className="text-[10px] text-emerald-400">✓</span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleToggleMute(node.id); }}
                        className={`text-[10px] p-1 rounded transition ${node.muted ? 'text-amber-400 font-bold bg-amber-950/60' : 'text-gray-400 hover:text-white'}`}
                        title={node.muted ? 'Đang bỏ qua nút (nhấp để kích hoạt lại)' : 'Bỏ qua nút này khi chạy workflow'}
                      >
                        {node.muted ? '🔇' : '👁️'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDuplicateNode(node.id); }}
                        className="text-[10px] text-gray-400 hover:text-white p-1"
                        title="Nhân bản nút"
                      >
                        ⎘
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveNode(node.id); }}
                        className="text-[10px] text-red-400 hover:text-red-200 p-1"
                        title="Xóa nút"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Node Body with Input / Output Ports & Parameters */}
                  <div className="p-3 text-xs space-y-2 relative">
                    {/* User Sticky Note Badge */}
                    {node.userNote && (
                      <div className="p-1.5 rounded-lg bg-amber-950/70 border border-amber-500/40 text-[9.5px] text-amber-200 flex items-start gap-1">
                        <span className="text-amber-400 shrink-0">📌</span>
                        <span className="italic line-clamp-2 leading-tight">{node.userNote}</span>
                      </div>
                    )}

                    {/* Inputs on the Left, Outputs on the Right */}
                    <div className="space-y-1.5 pb-1">
                      {/* Port rows */}
                      {Math.max(node.inputs.length, node.outputs.length) > 0 && (
                        <div className="space-y-2 text-[10px]">
                          {Array.from({ length: Math.max(node.inputs.length, node.outputs.length) }).map((_, idx) => {
                            const inPort = node.inputs[idx];
                            const outPort = node.outputs[idx];

                            const isConnecting = Boolean(connectingPort);
                            const isSelf = connectingPort?.nodeId === node.id;

                            const isCompatibleIn = Boolean(
                              inPort && isConnecting && connectingPort?.direction === 'out' && !isSelf && (
                                inPort.type === connectingPort?.portType ||
                                inPort.type === 'any' ||
                                connectingPort?.portType === 'any' ||
                                (connectingPort?.portType === 'prose' && inPort.type === 'raw_prose') ||
                                (connectingPort?.portType === 'raw_prose' && inPort.type === 'prose')
                              )
                            );
                            const isIncompatibleIn = Boolean(
                              inPort && isConnecting && connectingPort?.direction === 'out' && (!isCompatibleIn || isSelf)
                            );

                            const isCompatibleOut = Boolean(
                              outPort && isConnecting && connectingPort?.direction === 'in' && !isSelf && (
                                outPort.type === connectingPort?.portType ||
                                outPort.type === 'any' ||
                                connectingPort?.portType === 'any' ||
                                (connectingPort?.portType === 'prose' && outPort.type === 'raw_prose') ||
                                (connectingPort?.portType === 'raw_prose' && outPort.type === 'prose')
                              )
                            );
                            const isIncompatibleOut = Boolean(
                              outPort && isConnecting && connectingPort?.direction === 'in' && (!isCompatibleOut || isSelf)
                            );

                            return (
                              <div key={idx} className="flex items-center justify-between gap-2 relative min-h-[22px]">
                                {/* Left Input Port */}
                                {inPort ? (
                                  <div
                                    onClick={e => handlePortClick(e, node, inPort)}
                                    className={`flex items-center gap-1.5 -ml-4 pl-1 cursor-pointer group transition-all ${
                                      isIncompatibleIn ? 'opacity-35 scale-90' : 'opacity-100'
                                    }`}
                                  >
                                    <div
                                      style={{ backgroundColor: inPort.color }}
                                      className={`w-3.5 h-3.5 rounded-full border-2 border-[#111624] group-hover:scale-125 transition-transform shadow-md ${
                                        isCompatibleIn
                                          ? 'ring-4 ring-emerald-400 ring-offset-1 ring-offset-[#111624] scale-125 animate-pulse shadow-lg shadow-emerald-500/50'
                                          : connectingPort && connectingPort.direction === 'out' && isSelf
                                          ? 'opacity-40'
                                          : ''
                                      }`}
                                      title={`[Cổng Vào] ${inPort.name} (${inPort.type})${isCompatibleIn ? ' • ✅ Tương thích với cổng đang kéo!' : ''}`}
                                    />
                                    <span className={`text-[10px] truncate max-w-[90px] transition-colors ${
                                      isCompatibleIn ? 'text-emerald-300 font-bold' : 'text-gray-300 group-hover:text-white'
                                    }`}>
                                      {inPort.name}
                                    </span>
                                  </div>
                                ) : <div />}

                                {/* Right Output Port */}
                                {outPort ? (
                                  <div
                                    onClick={e => handlePortClick(e, node, outPort)}
                                    className={`flex items-center gap-1.5 -mr-4 pr-1 ml-auto cursor-pointer group text-right transition-all ${
                                      isIncompatibleOut ? 'opacity-35 scale-90' : 'opacity-100'
                                    }`}
                                  >
                                    <span className={`text-[10px] truncate max-w-[100px] transition-colors ${
                                      isCompatibleOut ? 'text-emerald-300 font-bold' : 'text-gray-300 group-hover:text-white'
                                    }`}>
                                      {outPort.name}
                                    </span>
                                    <div
                                      style={{ backgroundColor: outPort.color }}
                                      className={`w-3.5 h-3.5 rounded-full border-2 border-[#111624] group-hover:scale-125 transition-transform shadow-md ${
                                        isCompatibleOut
                                          ? 'ring-4 ring-emerald-400 ring-offset-1 ring-offset-[#111624] scale-125 animate-pulse shadow-lg shadow-emerald-500/50'
                                          : ''
                                      }`}
                                      title={`[Cổng Ra] ${outPort.name} (${outPort.type})`}
                                    />
                                  </div>
                                ) : <div />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Compact Interactive Parameters based on node type (hidden when collapsed) */}
                    {!node.collapsed && (
                      <div className="pt-2 border-t border-white/5 space-y-1.5 text-[11px]">
                        {((node.type as string) === 'character_input' || (node.type as string) === 'character_loader') && (
                          <div className="space-y-1">
                            {characters && characters.length > 0 && (
                              <div className="mb-1">
                                <label className="text-[9px] text-indigo-400/90 font-bold block mb-0.5">👤 Nạp từ Hồ Sơ Nhân Vật:</label>
                                <select
                                  onChange={e => {
                                    const char = characters.find(c => c.name === e.target.value);
                                    if (char) {
                                      updateNodeData(node.id, 'characterName', char.name);
                                      if (char.realm) updateNodeData(node.id, 'realm', char.realm);
                                      if (char.weapon) updateNodeData(node.id, 'weapon', char.weapon);
                                      if (char.personality) updateNodeData(node.id, 'objective', `Tính cách: ${char.personality}`);
                                      playAudioFeedback('click', isSoundEnabled);
                                      showToast(`Đã nạp hồ sơ nhân vật: ${char.name}!`);
                                    }
                                  }}
                                  defaultValue=""
                                  className="w-full bg-indigo-950/70 border border-indigo-700/60 rounded px-1.5 py-0.5 text-indigo-200 text-[10px] outline-none"
                                >
                                  <option value="" disabled>-- Chọn nhân vật có sẵn ({characters.length}) --</option>
                                  {characters.map((c, i) => (
                                    <option key={i} value={c.name}>
                                      {c.name} {c.realm ? `(${c.realm})` : ''}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
                            <label className="text-[10px] text-gray-400 font-semibold block">Nhân vật:</label>
                            <input
                              type="text"
                              value={node.data.characterName || ''}
                              onChange={e => updateNodeData(node.id, 'characterName', e.target.value)}
                              className="w-full bg-black/50 border border-gray-700 rounded-lg px-2 py-1 text-indigo-200 outline-none"
                            />
                            <label className="text-[10px] text-gray-400 font-semibold block">Cảnh giới:</label>
                            <input
                              type="text"
                              value={node.data.realm || ''}
                              onChange={e => updateNodeData(node.id, 'realm', e.target.value)}
                              className="w-full bg-black/50 border border-gray-700 rounded-lg px-2 py-1 text-indigo-300 text-[10px] outline-none"
                            />
                          </div>
                        )}

                        {((node.type as string) === 'location_input' || (node.type as string) === 'location_setting') && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-gray-400 font-semibold block">Tên địa danh:</label>
                            <input
                              type="text"
                              value={node.data.locationName || ''}
                              onChange={e => updateNodeData(node.id, 'locationName', e.target.value)}
                              className="w-full bg-black/50 border border-gray-700 rounded-lg px-2 py-1 text-cyan-200 outline-none"
                            />
                            <div className="text-[10px] text-gray-400 italic line-clamp-1">
                              {node.data.region}
                            </div>
                          </div>
                        )}

                        {node.type === 'calamity_ruins' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-red-400 font-semibold block">Kiểu thảm họa / Phế tích:</label>
                            <input
                              type="text"
                              value={node.data.calamityType || ''}
                              onChange={e => updateNodeData(node.id, 'calamityType', e.target.value)}
                              className="w-full bg-black/50 border border-red-900/60 rounded-lg px-2 py-1 text-red-200 text-[10px] outline-none"
                            />
                          </div>
                        )}

                        {node.type === 'longevity_seed' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-emerald-400 font-semibold block">Hạt giống trường sinh:</label>
                            <input
                              type="text"
                              value={node.data.seedName || ''}
                              onChange={e => updateNodeData(node.id, 'seedName', e.target.value)}
                              className="w-full bg-black/50 border border-emerald-900/60 rounded-lg px-2 py-1 text-emerald-200 text-[10px] outline-none"
                            />
                            <div className="text-[10px] text-emerald-400/80 italic line-clamp-2">
                              {node.data.sproutingAura}
                            </div>
                          </div>
                        )}

                        {node.type === 'battle_breakthrough' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-amber-400 font-semibold block">Kẻ địch & Cơ duyên:</label>
                            <input
                              type="text"
                              value={node.data.opponent || ''}
                              onChange={e => updateNodeData(node.id, 'opponent', e.target.value)}
                              className="w-full bg-black/50 border border-amber-900/60 rounded-lg px-2 py-1 text-amber-200 text-[10px] outline-none"
                            />
                          </div>
                        )}

                        {node.type === 'alchemy_catalyst' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-amber-400 font-semibold block">Tên Thần Đan:</label>
                            <input
                              type="text"
                              value={node.data.pillName || ''}
                              onChange={e => updateNodeData(node.id, 'pillName', e.target.value)}
                              className="w-full bg-black/50 border border-amber-900/60 rounded-lg px-2 py-1 text-amber-200 text-[10px] outline-none"
                            />
                            <div className="text-[10px] text-amber-400/80 italic line-clamp-1">
                              {node.data.medicinalEffect}
                            </div>
                          </div>
                        )}

                        {node.type === 'dao_revelation' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-pink-400 font-semibold block">Quy Tắc Đạo Ngộ:</label>
                            <input
                              type="text"
                              value={node.data.daoDomain || ''}
                              onChange={e => updateNodeData(node.id, 'daoDomain', e.target.value)}
                              className="w-full bg-black/50 border border-pink-900/60 rounded-lg px-2 py-1 text-pink-200 text-[10px] outline-none"
                            />
                            <div className="text-[10px] text-pink-400/80 italic line-clamp-1">
                              {node.data.cosmicPhenomenon}
                            </div>
                          </div>
                        )}

                        {node.type === 'cinematic_director' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-sky-400 font-semibold block">Chỉ Đạo Góc Máy:</label>
                            <input
                              type="text"
                              value={node.data.cameraPerspective || ''}
                              onChange={e => updateNodeData(node.id, 'cameraPerspective', e.target.value)}
                              className="w-full bg-black/50 border border-sky-900/60 rounded-lg px-2 py-1 text-sky-200 text-[10px] outline-none"
                            />
                            <div className="text-[10px] text-sky-400/80 italic line-clamp-1">
                              {node.data.lightingTone}
                            </div>
                          </div>
                        )}

                        {node.type === 'talisman_formation' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-cyan-400 font-semibold block">Tên Trận Pháp / Phù Lục:</label>
                            <input
                              type="text"
                              value={node.data.formationName || ''}
                              onChange={e => updateNodeData(node.id, 'formationName', e.target.value)}
                              className="w-full bg-black/50 border border-cyan-900/60 rounded-lg px-2 py-1 text-cyan-200 text-[10px] outline-none"
                            />
                            <div className="text-[10px] text-cyan-400/80 italic line-clamp-1">
                              {node.data.formationMechanism}
                            </div>
                          </div>
                        )}

                        {node.type === 'spirit_beast_summon' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-emerald-400 font-semibold block">Tên Thần Thú / Linh Thú:</label>
                            <input
                              type="text"
                              value={node.data.beastName || ''}
                              onChange={e => updateNodeData(node.id, 'beastName', e.target.value)}
                              className="w-full bg-black/50 border border-emerald-900/60 rounded-lg px-2 py-1 text-emerald-200 text-[10px] outline-none"
                            />
                            <div className="text-[10px] text-emerald-400/80 italic line-clamp-1">
                              {node.data.beastPresence}
                            </div>
                          </div>
                        )}

                        {node.type === 'story_prompt' && (
                          <div className="space-y-1">
                            <label className="text-[10px] text-teal-400 font-semibold block">Ý tưởng dẫn dắt:</label>
                            <textarea
                              value={node.data.promptText || ''}
                              onChange={e => updateNodeData(node.id, 'promptText', e.target.value)}
                              rows={2}
                              className="w-full bg-black/50 border border-teal-900/60 rounded-lg p-1.5 text-teal-100 text-[10px] outline-none"
                            />
                          </div>
                        )}

                        {node.type === 'master_synthesis' && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-purple-300">
                              <span>Nhịp điệu:</span>
                              <span className="font-mono text-purple-200">{node.data.wordCountTarget}</span>
                            </div>
                            <div className="text-[10px] text-gray-300 bg-black/40 p-1.5 rounded border border-purple-500/20 italic">
                              {node.data.narrativePacing}
                            </div>
                          </div>
                        )}

                        {node.type === 'spatial_prose_upscaler' && (
                          <div className="space-y-1">
                            <span className="text-[10px] text-teal-300 font-semibold block">Phong cách trau chuốt:</span>
                            <div className="text-[10px] text-gray-200 bg-black/40 p-1.5 rounded border border-teal-500/20 italic">
                              {node.data.styleRegister}
                            </div>
                          </div>
                        )}

                        {node.type === 'chapter_output' && (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] font-bold text-emerald-300">
                              <span className="truncate max-w-[170px]">{node.data.chapterTitle || 'Chương Đầu Ra'}</span>
                              {node.data.wordCount ? (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-mono">
                                  {node.data.wordCount} chữ
                                </span>
                              ) : null}
                            </div>
                            {node.data.generatedProse ? (
                              <div className="space-y-1.5">
                                <div className="p-2 rounded bg-black/60 border border-emerald-500/30 text-[10px] text-gray-200 font-serif line-clamp-3 italic">
                                  {node.data.generatedProse}
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigator.clipboard.writeText(node.data.generatedProse);
                                      playAudioFeedback('click', isSoundEnabled);
                                      showToast('📋 Đã sao chép chương vào clipboard!');
                                    }}
                                    className="flex-1 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 text-[10px] font-bold rounded transition text-center"
                                  >
                                    Sao Chép
                                  </button>
                                  {onCreateChapter && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onCreateChapter(
                                          node.data.chapterTitle || 'Chương Sáng Tác Từ Workflow',
                                          node.data.generatedProse,
                                          node.data.summary || 'Chương tạo từ Node Studio'
                                        );
                                        playAudioFeedback('chime', isSoundEnabled);
                                        showToast('📜 Đã tạo thành chương mới trong cây truyện!');
                                      }}
                                      className="flex-1 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white text-[10px] font-bold rounded transition shadow-sm text-center"
                                    >
                                      + Tạo Chương
                                    </button>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="text-[10px] text-gray-500 italic text-center py-2 border border-dashed border-gray-800 rounded">
                                Nhấn Chạy Workflow để sinh chương
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Minimap Radar */}
          {isMinimapOpen && (
            <div className="absolute bottom-4 left-4 z-20 bg-gray-950/90 backdrop-blur-md border border-purple-500/30 rounded-xl p-2 shadow-2xl">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 mb-1">
                <span className="flex items-center gap-1 text-purple-300">
                  <span>🗺️</span> Radar Đồ Phổ ({nodes.length})
                </span>
                <button
                  onClick={() => setIsMinimapOpen(false)}
                  className="text-gray-500 hover:text-gray-300"
                  title="Thu gọn radar"
                >
                  ✕
                </button>
              </div>
              <svg
                width={minimapData.mapWidth}
                height={minimapData.mapHeight}
                className="bg-black/80 rounded border border-white/5 cursor-crosshair overflow-hidden select-none"
                onClick={handleMinimapClick}
                onMouseDown={(e) => {
                  isMinimapDraggingRef.current = true;
                  handleMinimapClick(e);
                }}
                onMouseMove={(e) => {
                  if (isMinimapDraggingRef.current && e.buttons === 1) {
                    handleMinimapClick(e);
                  }
                }}
              >
                {/* Mini Cables */}
                {connections.map(c => {
                  const fn = nodes.find(n => n.id === c.fromNodeId);
                  const tn = nodes.find(n => n.id === c.toNodeId);
                  if (!fn || !tn) return null;
                  const x1 = (fn.x - minimapData.minX) * minimapData.scale;
                  const y1 = (fn.y - minimapData.minY) * minimapData.scale;
                  const x2 = (tn.x - minimapData.minX) * minimapData.scale;
                  const y2 = (tn.y - minimapData.minY) * minimapData.scale;
                  return <line key={c.id} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.color || '#6366f1'} strokeWidth="1" strokeOpacity="0.4" />;
                })}
                {/* Mini Nodes */}
                {nodes.map(n => {
                  const nx = (n.x - minimapData.minX) * minimapData.scale;
                  const ny = (n.y - minimapData.minY) * minimapData.scale;
                  const nw = Math.max(8, (n.width || 260) * minimapData.scale);
                  const nh = Math.max(5, (n.collapsed ? 50 : 260) * minimapData.scale);
                  const isSelected = n.id === selectedNodeId;
                  return (
                    <rect
                      key={n.id}
                      x={nx}
                      y={ny}
                      width={nw}
                      height={nh}
                      rx="2"
                      fill={n.color}
                      opacity={n.muted ? 0.25 : (isSelected ? 1 : 0.75)}
                      stroke={isSelected ? '#ffffff' : 'none'}
                      strokeWidth="1"
                    />
                  );
                })}
                {/* Mini Viewport Rectangle */}
                {canvasRef.current && (
                  <rect
                    x={(-pan.x / zoom - minimapData.minX) * minimapData.scale}
                    y={(-pan.y / zoom - minimapData.minY) * minimapData.scale}
                    width={(canvasRef.current.clientWidth / zoom) * minimapData.scale}
                    height={(canvasRef.current.clientHeight / zoom) * minimapData.scale}
                    fill="rgba(168, 85, 247, 0.15)"
                    stroke="#c084fc"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                )}
              </svg>
              <div className="text-[9px] text-gray-500 text-center mt-1 select-none">
                Nhấp hoặc kéo trên radar để di chuyển
              </div>
            </div>
          )}

          {/* Quick Node Right-Click Context Menu */}
          {contextMenu && (
            <div
              style={{ left: Math.min(contextMenu.x, window.innerWidth - 300), top: Math.min(contextMenu.y, window.innerHeight - 380) }}
              className="fixed z-50 w-72 bg-gray-950/95 backdrop-blur-xl border border-purple-500/50 rounded-2xl shadow-2xl p-2.5 space-y-2 text-xs ring-1 ring-purple-400/30"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-[11px] font-black text-purple-300 uppercase tracking-wide flex items-center gap-1.5">
                  <span>⚡</span> Chèn Nút Nhanh (Canvas)
                </span>
                <button
                  onClick={() => setContextMenu(null)}
                  className="text-[10px] text-gray-400 hover:text-white px-1"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                placeholder="Tìm nút (thiên tai, mầm, nhân vật...)"
                value={contextMenu.searchQuery}
                onChange={e => setContextMenu({ ...contextMenu, searchQuery: e.target.value })}
                autoFocus
                className="w-full bg-black/60 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-gray-500 outline-none focus:border-purple-400"
              />
              <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
                {[
                  { type: 'character_input', label: 'Nhân Vật & Đạo Hữu', icon: '👤', color: 'text-indigo-300', bg: 'hover:bg-indigo-950/60' },
                  { type: 'location_input', label: 'Bối Cảnh & Địa Danh', icon: '🏔️', color: 'text-cyan-300', bg: 'hover:bg-cyan-950/60' },
                  { type: 'calamity_ruins', label: 'Thiên Tai & Chiến Tàn Phế Tích', icon: '⚡', color: 'text-red-300', bg: 'hover:bg-red-950/60' },
                  { type: 'longevity_seed', label: 'Hạt Trường Sinh Hồi Sinh', icon: '🌱', color: 'text-emerald-300', bg: 'hover:bg-emerald-950/60' },
                  { type: 'battle_breakthrough', label: 'Đại Chiến & Đột Phá Lôi Kiếp', icon: '⚔️', color: 'text-amber-300', bg: 'hover:bg-amber-950/60' },
                  { type: 'alchemy_catalyst', label: 'Đan Dược & Thần Dược Xúc Tác', icon: '🧪', color: 'text-amber-300', bg: 'hover:bg-amber-950/60' },
                  { type: 'dao_revelation', label: 'Đạo Ngộ & Dị Tượng Thiên Địa', icon: '☯️', color: 'text-pink-300', bg: 'hover:bg-pink-950/60' },
                  { type: 'cinematic_director', label: 'Khung Hình & Góc Máy Điện Ảnh', icon: '🎬', color: 'text-sky-300', bg: 'hover:bg-sky-950/60' },
                  { type: 'talisman_formation', label: 'Trận Pháp & Phù Lục Cấm Đoán', icon: '🔯', color: 'text-cyan-300', bg: 'hover:bg-cyan-950/60' },
                  { type: 'spirit_beast_summon', label: 'Linh Thú & Thần Thú Giáng Thế', icon: '🐉', color: 'text-emerald-300', bg: 'hover:bg-emerald-950/60' },
                  { type: 'story_prompt', label: 'Ý Tưởng Dẫn Dắt (Prompt)', icon: '📜', color: 'text-teal-300', bg: 'hover:bg-teal-950/60' },
                  { type: 'master_synthesis', label: 'Master Story Engine', icon: '⚙️', color: 'text-purple-300', bg: 'hover:bg-purple-950/60' },
                  { type: 'spatial_prose_upscaler', label: 'Spatial Prose Upscaler', icon: '🎨', color: 'text-teal-300', bg: 'hover:bg-teal-950/60' },
                  { type: 'chapter_output', label: 'Đầu Ra Bản Thảo Chương', icon: '📖', color: 'text-emerald-300', bg: 'hover:bg-emerald-950/60' },
                ]
                  .filter(item => !contextMenu.searchQuery || item.label.toLowerCase().includes(contextMenu.searchQuery.toLowerCase()))
                  .map(item => (
                    <button
                      key={item.type}
                      onClick={() => handleAddNode(item.type, { x: contextMenu.canvasX, y: contextMenu.canvasY })}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg ${item.bg} ${item.color} flex items-center justify-between transition`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">Thêm</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Floating Batch Actions Bar (when multiple nodes selected) */}
          {selectedNodeIds.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gray-950/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-2.5 text-xs ring-1 ring-cyan-400/40 animate-fade-in select-none">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5 pr-2 border-r border-white/10">
                <span>✨</span> Đã chọn {selectedNodeIds.length} nút
              </span>
              <button
                onClick={handleBatchGroup}
                className="px-2.5 py-1 rounded-xl bg-amber-950/70 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-semibold transition flex items-center gap-1"
                title="Tạo Khung Phân Vùng bao bọc các nút đã chọn"
              >
                <span>📦</span> Gom Nhóm
              </button>
              <button
                onClick={handleBatchDuplicate}
                className="px-2.5 py-1 rounded-xl bg-purple-950/70 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-semibold transition flex items-center gap-1"
                title="Nhân bản cụm nút và giữ nguyên các đường dây nối bên trong (Ctrl+D)"
              >
                <span>⎘</span> Nhân Bản Cụm
              </button>
              <button
                onClick={() => handleBatchAlign('horizontal')}
                className="px-2 py-1 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition"
                title="Căn thẳng hàng ngang theo trục Y"
              >
                ↔ Căn Ngang
              </button>
              <button
                onClick={() => handleBatchAlign('vertical')}
                className="px-2 py-1 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition"
                title="Căn thẳng hàng dọc theo trục X"
              >
                ↕ Căn Dọc
              </button>
              <button
                onClick={handleBatchToggleMute}
                className="px-2 py-1 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white transition"
                title="Bật/Tắt bỏ qua tất cả các nút đã chọn"
              >
                🔇 Mute
              </button>
              <button
                onClick={handleBatchDelete}
                className="px-2.5 py-1 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 font-semibold transition flex items-center gap-1"
                title="Xóa toàn bộ các nút đã chọn (Delete / Backspace)"
              >
                <span>🗑️</span> Xóa
              </button>
              <button
                onClick={() => { setSelectedNodeIds([]); setSelectedNodeId(null); }}
                className="text-gray-400 hover:text-white px-1.5 py-1 text-xs"
                title="Bỏ chọn (Escape)"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* ================= RIGHT INSPECTOR & OUTPUT DOSSIER ================= */}
        <div className="w-80 md:w-96 border-l border-white/10 bg-gray-950/95 backdrop-blur-md flex flex-col shrink-0 z-10 overflow-y-auto custom-scrollbar p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h3 className="text-xs font-black text-vip-gold uppercase tracking-wider flex items-center gap-1.5">
              <span>🎛️</span> BẢNG ĐIỀU KHIỂN & ĐẦU RA BẢN THẢO
            </h3>
            {executionResult && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                {executionResult.wordCount} chữ
              </span>
            )}
          </div>

          {/* Active Node Inspector */}
          {selectedNode ? (
            <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{selectedNode.icon}</span> {selectedNode.title}
                </span>
                <span className="text-[10px] font-mono text-gray-400">ID: {selectedNode.id}</span>
              </div>

              {/* Color Swatch & User Note Customizer */}
              <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-400 font-bold">🎨 Đổi Màu Viền:</span>
                  <div className="flex items-center gap-1.5">
                    {[
                      { color: '#818cf8', name: 'Lam Tím' },
                      { color: '#22d3ee', name: 'Thanh Lam' },
                      { color: '#06b6d4', name: 'Huyền Quang' },
                      { color: '#10b981', name: 'Bích Lục' },
                      { color: '#f59e0b', name: 'Hoàng Kim' },
                      { color: '#f43f5e', name: 'Xích Hỏa' },
                      { color: '#ec4899', name: 'Hồng Đạo' }
                    ].map(c => (
                      <button
                        key={c.color}
                        type="button"
                        onClick={() => {
                          setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, color: c.color } : n));
                          playAudioFeedback('click', isSoundEnabled);
                          showToast(`Đã đổi màu viền: ${c.name}!`);
                        }}
                        style={{ backgroundColor: c.color }}
                        className={`w-4 h-4 rounded-full transition-transform ${
                          selectedNode.color === c.color ? 'ring-2 ring-white scale-125' : 'hover:scale-110 opacity-70 hover:opacity-100'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                    <span>📌</span> Ghi Chú Riêng Tác Giả (Ghim trên thẻ):
                  </label>
                  <input
                    type="text"
                    value={selectedNode.userNote || ''}
                    onChange={e => {
                      const val = e.target.value;
                      setNodes(prev => prev.map(n => n.id === selectedNode.id ? { ...n, userNote: val } : n));
                    }}
                    placeholder="VD: Cần bổ sung bí bảo này ở chương sau..."
                    className="w-full bg-black/70 border border-amber-500/30 rounded-lg px-2.5 py-1 text-xs text-amber-100 placeholder-gray-600 outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {/* Quick Profile Loader for Character Node */}
                {((selectedNode.type as string) === 'character_input' || (selectedNode.type as string) === 'character_loader') && characters && characters.length > 0 && (
                  <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-500/30 space-y-1.5">
                    <span className="text-[10px] text-indigo-300 font-bold block">👤 Nạp từ Hồ Sơ Nhân Vật có sẵn:</span>
                    <div className="flex flex-wrap gap-1">
                      {characters.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'characterName', c.name);
                            if (c.realm) updateNodeData(selectedNode.id, 'realm', c.realm);
                            if (c.weapon) updateNodeData(selectedNode.id, 'weapon', c.weapon);
                            if (c.personality) updateNodeData(selectedNode.id, 'objective', `Tính cách: ${c.personality}`);
                            playAudioFeedback('click', isSoundEnabled);
                            showToast(`Đã nạp nhân vật: ${c.name}!`);
                          }}
                          className="px-2 py-1 rounded bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-400/30 text-[10px] text-indigo-200 font-semibold transition"
                        >
                          {c.name} {c.realm ? `(${c.realm})` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Presets for Calamity and Seed nodes */}
                {selectedNode.type === 'calamity_ruins' && (
                  <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/30 space-y-1.5">
                    <span className="text-[10px] text-red-300 font-bold block">⚡ Chọn mẫu thiên tai & tàn tích:</span>
                    <div className="flex flex-wrap gap-1">
                      {CALAMITY_QUICK_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'calamityType', p.type);
                            updateNodeData(selectedNode.id, 'ruinScale', p.scale);
                            updateNodeData(selectedNode.id, 'mortalTragedy', p.tragedy);
                            updateNodeData(selectedNode.id, 'poignantDetail', p.detail);
                            showToast(`Đã áp dụng: ${p.label}!`);
                          }}
                          className="px-2 py-1 rounded bg-red-900/60 hover:bg-red-800 border border-red-400/30 text-[10px] text-red-200 font-semibold transition"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedNode.type === 'longevity_seed' && (
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                    <span className="text-[10px] text-emerald-300 font-bold block">🌱 Chọn mẫu hạt trường sinh hồi sinh:</span>
                    <div className="flex flex-wrap gap-1">
                      {SEED_QUICK_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'seedName', p.name);
                            updateNodeData(selectedNode.id, 'descentGlow', p.glow);
                            updateNodeData(selectedNode.id, 'sproutingAura', p.aura);
                            updateNodeData(selectedNode.id, 'camLoEffect', p.effect);
                            showToast(`Đã áp dụng: ${p.label}!`);
                          }}
                          className="px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-400/30 text-[10px] text-emerald-200 font-semibold transition"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Presets for Alchemy Catalyst */}
                {selectedNode.type === 'alchemy_catalyst' && (
                  <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 space-y-1.5">
                    <span className="text-[10px] text-amber-300 font-bold block">🧪 Chọn mẫu thần đan xúc tác:</span>
                    <div className="flex flex-wrap gap-1">
                      {PILL_QUICK_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'pillName', p.name);
                            updateNodeData(selectedNode.id, 'pillRank', p.rank);
                            updateNodeData(selectedNode.id, 'medicinalEffect', p.effect);
                            updateNodeData(selectedNode.id, 'consumptionPhenomenon', p.phenomenon);
                            showToast(`Đã áp dụng: ${p.label}!`);
                          }}
                          className="px-2 py-1 rounded bg-amber-900/60 hover:bg-amber-800 border border-amber-400/30 text-[10px] text-amber-200 font-semibold transition"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Presets for Dao Revelation */}
                {selectedNode.type === 'dao_revelation' && (
                  <div className="p-2 rounded-lg bg-pink-950/40 border border-pink-500/30 space-y-1.5">
                    <span className="text-[10px] text-pink-300 font-bold block">☯️ Chọn mẫu đạo ngộ quy tắc:</span>
                    <div className="flex flex-wrap gap-1">
                      {DAO_QUICK_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'daoDomain', p.domain);
                            updateNodeData(selectedNode.id, 'epiphanyTrigger', p.trigger);
                            updateNodeData(selectedNode.id, 'cosmicPhenomenon', p.phenomenon);
                            updateNodeData(selectedNode.id, 'daoInsightQuote', p.quote);
                            showToast(`Đã áp dụng: ${p.label}!`);
                          }}
                          className="px-2 py-1 rounded bg-pink-900/60 hover:bg-pink-800 border border-pink-400/30 text-[10px] text-pink-200 font-semibold transition"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Presets for Cinematic Director */}
                {selectedNode.type === 'cinematic_director' && (
                  <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-500/30 space-y-1.5">
                    <span className="text-[10px] text-sky-300 font-bold block">🎬 Chọn mẫu góc máy điện ảnh:</span>
                    <div className="flex flex-wrap gap-1">
                      {CAMERA_QUICK_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'cameraPerspective', p.perspective);
                            updateNodeData(selectedNode.id, 'lightingTone', p.tone);
                            updateNodeData(selectedNode.id, 'visualRhythm', p.rhythm);
                            updateNodeData(selectedNode.id, 'soundscapeCue', p.cue);
                            showToast(`Đã áp dụng: ${p.label}!`);
                          }}
                          className="px-2 py-1 rounded bg-sky-900/60 hover:bg-sky-800 border border-sky-400/30 text-[10px] text-sky-200 font-semibold transition"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Presets for Talisman Formation */}
                {selectedNode.type === 'talisman_formation' && (
                  <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 space-y-1.5">
                    <span className="text-[10px] text-cyan-300 font-bold block">🔯 Chọn mẫu trận pháp & phù lục:</span>
                    <div className="flex flex-wrap gap-1">
                      {TALISMAN_QUICK_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'formationName', p.name);
                            updateNodeData(selectedNode.id, 'formationRank', p.rank);
                            updateNodeData(selectedNode.id, 'formationMechanism', p.mechanism);
                            updateNodeData(selectedNode.id, 'formationIncantation', p.incantation);
                            showToast(`Đã áp dụng: ${p.label}!`);
                          }}
                          className="px-2 py-1 rounded bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-400/30 text-[10px] text-cyan-200 font-semibold transition"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quick Presets for Spirit Beast Summon */}
                {selectedNode.type === 'spirit_beast_summon' && (
                  <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                    <span className="text-[10px] text-emerald-300 font-bold block">🐉 Chọn mẫu thần thú & linh thú:</span>
                    <div className="flex flex-wrap gap-1">
                      {BEAST_QUICK_PRESETS.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            updateNodeData(selectedNode.id, 'beastName', p.name);
                            updateNodeData(selectedNode.id, 'beastSpecies', p.species);
                            updateNodeData(selectedNode.id, 'beastBloodline', p.bloodline);
                            updateNodeData(selectedNode.id, 'beastPresence', p.presence);
                            showToast(`Đã áp dụng: ${p.label}!`);
                          }}
                          className="px-2 py-1 rounded bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-400/30 text-[10px] text-emerald-200 font-semibold transition"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {Object.entries(selectedNode.data).map(([k, v]) => {
                  if (typeof v === 'boolean') return null;
                  return (
                    <div key={k} className="space-y-1">
                      <label className="text-[10px] text-gray-400 font-semibold uppercase">{k}:</label>
                      {String(v).length > 60 ? (
                        <textarea
                          value={String(v)}
                          onChange={e => updateNodeData(selectedNode.id, k, e.target.value)}
                          rows={3}
                          className="w-full bg-black/60 border border-gray-700 rounded-lg p-2 text-xs text-gray-200 outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={String(v)}
                          onChange={e => updateNodeData(selectedNode.id, k, e.target.value)}
                          className="w-full bg-black/60 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs text-gray-200 outline-none"
                        />
                      )}
                    </div>
                  );
                })}

                {/* Node Prompt Contribution Preview */}
                <div className="pt-2 border-t border-white/10 space-y-1">
                  <div
                    onClick={() => setIsPromptInspectorOpen(!isPromptInspectorOpen)}
                    className="flex items-center justify-between text-[10px] font-bold text-amber-300 cursor-pointer hover:text-amber-200 transition"
                  >
                    <span className="flex items-center gap-1">
                      <span>🔍</span> Dữ Liệu Node Này Đóng Góp Vào AI:
                    </span>
                    <span>{isPromptInspectorOpen ? '▾' : '▸'}</span>
                  </div>
                  {isPromptInspectorOpen && (
                    <div className="p-2 rounded-lg bg-black/60 border border-amber-500/30 text-[10px] text-amber-100 font-mono leading-relaxed max-h-36 overflow-y-auto custom-scrollbar select-all">
                      {getNodePromptContribution(selectedNode)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 text-center text-xs text-gray-500">
              Nhấp vào một nút trên canvas để chỉnh sửa thông số chuyên sâu
            </div>
          )}

          {/* Execution Result & Chapter Insertion */}
          {executionResult ? (
            <div className="p-3.5 rounded-xl bg-gradient-to-b from-emerald-950/40 via-stone-950 to-purple-950/40 border border-emerald-500/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5 truncate max-w-[240px]">
                  <span>📖</span> {currentDisplayTitle}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  {currentDisplayWordCount} chữ
                </span>
              </div>

              {/* 3-Variant Style Selector */}
              {executionResult.variants && executionResult.variants.length > 0 && (
                <div className="space-y-1.5 p-2 rounded-xl bg-purple-950/40 border border-purple-500/30">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-purple-300 flex items-center gap-1">
                      <span>🌿</span> 3 Bản Biến Thể Phong Cách:
                    </span>
                    <span className="text-gray-400 font-mono text-[9px]">Seed #{executionResult.seed || generationSeed}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {executionResult.variants.map((v) => (
                      <button
                        key={v.variantId}
                        type="button"
                        onClick={() => {
                          setSelectedVariantId(v.variantId);
                          playAudioFeedback('click', isSoundEnabled);
                        }}
                        className={`px-1.5 py-1.5 rounded-lg text-left transition ${
                          selectedVariantId === v.variantId
                            ? 'bg-purple-800 text-white font-bold ring-1 ring-purple-400 shadow-md'
                            : 'bg-black/50 text-gray-400 hover:text-white hover:bg-black/70'
                        }`}
                      >
                        <div className="text-[10px] truncate">{v.label.split(':')[1] || v.label}</div>
                        <div className="text-[9px] text-purple-300/80 font-mono">{v.wordCount} chữ</div>
                      </button>
                    ))}
                  </div>
                  {activeVariant && (
                    <div className="text-[9px] text-purple-200/90 italic px-1 truncate">
                      • {activeVariant.toneStyle}
                    </div>
                  )}
                </div>
              )}

              {/* View Switcher Tabs */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-black/60 rounded-lg border border-white/10 text-[10px] font-bold">
                <button
                  onClick={() => setResultViewTab('upscaled')}
                  className={`py-1 rounded text-center transition ${resultViewTab === 'upscaled' ? 'bg-emerald-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  ✨ Nâng Cấp
                </button>
                <button
                  onClick={() => setResultViewTab('raw')}
                  className={`py-1 rounded text-center transition ${resultViewTab === 'raw' ? 'bg-purple-800 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  📝 Bản Thô
                </button>
                <button
                  onClick={() => setResultViewTab('compare')}
                  className={`py-1 rounded text-center transition ${resultViewTab === 'compare' ? 'bg-indigo-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  ⚖️ So Sánh
                </button>
                <button
                  onClick={() => setResultViewTab('cinematic')}
                  className={`py-1 rounded text-center transition ${resultViewTab === 'cinematic' ? 'bg-pink-800 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                >
                  🎬 Mỹ Thuật
                </button>
              </div>

              <div className="text-[10px] text-gray-400 bg-black/60 p-2 rounded-lg border border-white/5 font-mono">
                {executionResult.activePathSummary}
              </div>

              {/* Tab 1: Upscaled Prose */}
              {resultViewTab === 'upscaled' && (
                <div className="p-3 bg-black/80 rounded-xl border border-emerald-500/30 text-xs font-serif text-emerald-100 leading-relaxed max-h-80 overflow-y-auto custom-scrollbar whitespace-pre-line italic">
                  {currentDisplayUpscaled}
                </div>
              )}

              {/* Tab 2: Raw Prose */}
              {resultViewTab === 'raw' && (
                <div className="p-3 bg-black/80 rounded-xl border border-purple-500/30 text-xs font-serif text-purple-200 leading-relaxed max-h-80 overflow-y-auto custom-scrollbar whitespace-pre-line">
                  {executionResult.rawProse}
                </div>
              )}

              {/* Tab 3: Side-by-Side Compare */}
              {resultViewTab === 'compare' && (
                <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar">
                  <div className="p-2.5 rounded-lg bg-black/60 border border-purple-500/20 text-[11px] font-serif text-purple-300">
                    <span className="text-[10px] font-bold text-purple-400 uppercase block mb-1">Bản Thô Ban Đầu (Raw):</span>
                    <p className="line-clamp-6 italic">{executionResult.rawProse}</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/80 border border-emerald-500/30 text-[11px] font-serif text-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">Bản Sau Nâng Cấp Điển Tích & Văn Phong (Upscaled):</span>
                    <p className="line-clamp-6 italic">{currentDisplayUpscaled}</p>
                  </div>
                </div>
              )}

              {/* Tab 4: Cinematic Art & Audio Prompts */}
              {resultViewTab === 'cinematic' && (
                <div className="p-3 rounded-xl bg-black/80 border border-pink-500/30 space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-pink-300 uppercase block flex items-center gap-1">
                      <span>🎨</span> Prompt Hội Họa / Midjourney (Scene Visualization):
                    </span>
                    <p className="mt-1 p-2 rounded bg-black/60 border border-pink-900/40 text-[11px] font-mono text-pink-100 select-all">
                      Cinematic 8K, high detail, ancient devastated battlefield after fierce war, broken swords stuck in charred ground, an ethereal glowing emerald seed of immortality descending from heavens, divine roots spreading across ruins, flourishing spiritual lotus and green foliage bursting forth from ash, misty morning sunlight, Unreal Engine 5 render, volumetric lighting, photorealistic, masterpiece --ar 16:9
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-amber-300 uppercase block flex items-center gap-1">
                      <span>🎵</span> m Thanh & Nhạc Nền (Soundtrack / BGM):
                    </span>
                    <p className="mt-1 p-2 rounded bg-black/60 border border-amber-900/40 text-[11px] text-amber-100">
                      Giai điệu mở đầu bằng tiếng Cổ Tranh (Guzheng) trầm buồn ai oán xen tiếng gió bấc thổi qua phế tích; khi Hạt Trường Sinh chạm đất thì bùng nổ hợp âm tiếng chuông khánh thanh tịnh hòa quyện tiếng sấm sinh mệnh trầm hùng và tiếng đàn Tỳ Bà dồn dập rộn rã tái sinh.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    const textToCopy = resultViewTab === 'raw' ? executionResult.rawProse : currentDisplayUpscaled;
                    navigator.clipboard.writeText(textToCopy);
                    playAudioFeedback('click', isSoundEnabled);
                    showToast('📋 Đã sao chép phân cảnh vào bộ nhớ đệm!');
                  }}
                  className="py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs rounded-lg transition"
                >
                  📋 Sao Chép
                </button>

                {onInsertText && (
                  <button
                    onClick={() => {
                      const textToInsert = resultViewTab === 'raw' ? executionResult.rawProse : currentDisplayUpscaled;
                      onInsertText(`\n\n${textToInsert}\n\n`);
                      playAudioFeedback('connect', isSoundEnabled);
                      showToast('✍️ Đã chèn phân cảnh vào chương bản thảo!');
                    }}
                    className="py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-lg transition shadow-md shadow-emerald-950"
                  >
                    ✍️ Chèn Vào Chương
                  </button>
                )}

                {onCreateChapter && (
                  <div className="col-span-2 space-y-1.5">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          onCreateChapter(
                            currentDisplayTitle,
                            currentDisplayUpscaled,
                            activeVariant ? activeVariant.summary : executionResult.summary
                          );
                          playAudioFeedback('chime', isSoundEnabled);
                          showToast('📜 Đã tạo một chương mới trong cây tiểu thuyết!');
                        }}
                        className="py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:brightness-110 text-white font-bold text-xs rounded-xl transition shadow-md shadow-purple-950 flex items-center justify-center gap-1"
                      >
                        <span>📜</span> Tạo Chương Mới
                      </button>

                      <button
                        onClick={() => {
                          onCreateChapter(
                            currentDisplayTitle,
                            currentDisplayUpscaled,
                            activeVariant ? activeVariant.summary : executionResult.summary
                          );
                          playAudioFeedback('chime', isSoundEnabled);
                          if (onSwitchToEditor) {
                            onSwitchToEditor();
                            showToast('🚀 Đã tạo chương và mở ngay trong trình soạn thảo bản thảo!');
                          } else {
                            showToast('📜 Đã tạo chương mới thành công!');
                          }
                        }}
                        className="py-2 bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:brightness-110 text-white font-black text-xs rounded-xl transition shadow-lg shadow-pink-950 flex items-center justify-center gap-1"
                        title="Tạo chương và lập tức mở bản thảo chính để bạn tiếp tục viết và trau chuốt"
                      >
                        <span>🚀</span> Mở Ngay Bản Thảo
                      </button>
                    </div>

                    <button
                      onClick={handleDownloadChapterMarkdown}
                      className="w-full py-1.5 bg-gray-900 hover:bg-gray-800 border border-emerald-500/30 text-emerald-300 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
                      title="Xuất nội dung phân cảnh này thành file .md lưu trữ độc lập"
                    >
                      <span>📥</span> Tải File Chương (.md)
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-gray-900/30 border border-gray-800/80 text-center space-y-2">
              <span className="text-3xl">⚡</span>
              <h4 className="text-xs font-bold text-gray-300">Sẵn Sàng Chạy Workflow</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Các nút đã được kết nối theo đường truyền logic. Nhấp vào nút <strong className="text-purple-300">CHẠY WORKFLOW SÁNG TÁC</strong> ở thanh công cụ trên cùng để AI tổng hợp toàn bộ các nút thành một áng văn hoàn mỹ.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Save Custom Preset Modal */}
      {isSavePresetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-purple-500/50 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-2xl ring-1 ring-purple-400/40 animate-fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-amber-200 flex items-center gap-2 uppercase tracking-wide">
                <span>💾</span> Lưu Đồ Phổ Vào Bản Mẫu Cá Nhân
              </h3>
              <button
                onClick={() => setIsSavePresetModalOpen(false)}
                className="text-gray-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>

            <p className="text-[11px] text-gray-400">
              Lưu đồ phổ gồm <strong className="text-purple-300">{nodes.length} nút</strong>, <strong className="text-cyan-300">{connections.length} dây nối</strong> và <strong className="text-amber-300">{groupFrames.length} phân vùng</strong> vào bộ nhớ trình duyệt để mở lại bất kỳ lúc nào.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Tên Bản Mẫu:</label>
                <input
                  type="text"
                  value={newPresetForm.name}
                  onChange={e => setNewPresetForm({ ...newPresetForm, name: e.target.value })}
                  placeholder="Ví dụ: Đại Biến Tông Môn & Hồi Sinh Trăm Họ"
                  className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-300 block mb-1">Mô Tả Ngắn (Phụ Đề):</label>
                <input
                  type="text"
                  value={newPresetForm.subtitle}
                  onChange={e => setNewPresetForm({ ...newPresetForm, subtitle: e.target.value })}
                  placeholder="Ví dụ: Cao trào kịch tính, kết thúc bằng hạt trường sinh nảy mầm"
                  className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">Nhãn Huy Hiệu (Badge):</label>
                  <input
                    type="text"
                    value={newPresetForm.badge}
                    onChange={e => setNewPresetForm({ ...newPresetForm, badge: e.target.value })}
                    placeholder="Tác Giả • Huyền Huyễn"
                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">Ghi Chú Chi Tiết:</label>
                  <input
                    type="text"
                    value={newPresetForm.description}
                    onChange={e => setNewPresetForm({ ...newPresetForm, description: e.target.value })}
                    placeholder="Mục đích sử dụng đồ phổ này..."
                    className="w-full bg-black/60 border border-gray-700 rounded-xl px-3 py-2 text-white outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsSavePresetModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold transition"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleSaveCustomPreset}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black transition shadow-lg shadow-purple-950"
              >
                💾 Xác Nhận Lưu Mẫu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Diagram & Architecture Modal */}
      {isExportDiagramModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-pink-500/50 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col p-5 space-y-4 shadow-2xl ring-1 ring-pink-400/40 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-pink-900/60 border border-pink-500/50 flex items-center justify-center text-base">
                  📸
                </div>
                <div>
                  <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200 uppercase tracking-wide">
                    Xuất Sơ Đồ & Kiến Trúc Đồ Phổ (Export Studio)
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Trích xuất sơ đồ mạng lưới node thành Mermaid Diagram, Markdown, hoặc JSON cấu hình
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExportDiagramModalOpen(false)}
                className="text-gray-400 hover:text-white text-base px-2 py-1 rounded-lg hover:bg-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setExportModalTab('image')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  exportModalTab === 'image'
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>📸</span> Ảnh PNG (Raster HQ)
              </button>
              <button
                onClick={() => setExportModalTab('mermaid')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  exportModalTab === 'mermaid'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>📊</span> Sơ Đồ Mermaid
              </button>
              <button
                onClick={() => setExportModalTab('markdown')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  exportModalTab === 'markdown'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>📝</span> Markdown
              </button>
              <button
                onClick={() => setExportModalTab('json')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  exportModalTab === 'json'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>💾</span> JSON
              </button>
              <button
                onClick={() => setExportModalTab('import')}
                className={`flex-1 py-1.5 px-3 rounded-lg font-bold transition flex items-center justify-center gap-1.5 ${
                  exportModalTab === 'import'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span>📂</span> Nhập JSON
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto space-y-3 min-h-[300px] max-h-[50vh] pr-1">
              {exportModalTab === 'image' && (
                <div className="space-y-4 p-2">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-cyan-950/20 to-purple-950/40 border border-teal-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">📸</span>
                        <div>
                          <h4 className="text-xs font-bold text-teal-200">Kết Xuất Hình Ảnh Sơ Đồ Độ Nét Cao (Raster HQ)</h4>
                          <p className="text-[11px] text-gray-400">
                            Chuyển toàn bộ mạng lưới node, đường dây phát sáng và phân vùng thành ảnh PNG hoặc chép vào bộ nhớ đệm
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-teal-900/60 border border-teal-500/40 text-[10px] font-mono text-teal-300">
                        {nodes.length} Nút • {connections.length} Dây
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block">
                          Độ Phân Giải Kết Xuất (Resolution Scale):
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { scale: 1, label: '1x (FHD)' },
                            { scale: 2, label: '2x (2K HQ)' },
                            { scale: 3, label: '3x (4K Ultra)' },
                          ].map((item) => (
                            <button
                              key={item.scale}
                              type="button"
                              onClick={() => setPngResolutionScale(item.scale)}
                              className={`py-1.5 rounded-lg text-xs font-bold transition border ${
                                pngResolutionScale === item.scale
                                  ? 'bg-teal-600 border-teal-400 text-white shadow-md shadow-teal-950'
                                  : 'bg-black/40 border-gray-700 text-gray-400 hover:text-white'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block">
                          Thao Tác Nhanh:
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleExportPngDiagram(pngResolutionScale)}
                            disabled={isRenderingPng}
                            className="py-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <span>⬇️</span> Tải PNG {pngResolutionScale}x
                          </button>
                          <button
                            type="button"
                            onClick={handleCopyPngToClipboard}
                            disabled={isRenderingPng}
                            className="py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 disabled:opacity-50"
                          >
                            <span>📋</span> Sao Chép Ảnh
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-black/60 rounded-xl border border-white/5 space-y-1.5 text-xs text-gray-400">
                    <span className="font-bold text-teal-300 block">💡 Ứng dụng thực tế của ảnh sơ đồ:</span>
                    <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
                      <li>Dán trực tiếp vào thảo luận nhóm sáng tác (Discord, Zalo, Facebook) để trao đổi tình tiết.</li>
                      <li>Lưu trữ vào sổ tay bối cảnh Obsidian / Notion dưới dạng tài liệu đồ họa trực quan.</li>
                      <li>In kèm vào bìa phụ hoặc hồ sơ tác giả khi phát hành tiểu thuyết trên các nền tảng mạng.</li>
                    </ul>
                  </div>
                </div>
              )}

              {exportModalTab === 'mermaid' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Cú pháp đồ thị Mermaid.js (dán vào Notion, Obsidian, GitHub Markdown):</span>
                    <button
                      onClick={() => {
                        const code = generateMermaidDiagram();
                        navigator.clipboard.writeText(code);
                        playAudioFeedback('chime', isSoundEnabled);
                        showToast('📋 Đã sao chép mã Mermaid Diagram vào clipboard!');
                      }}
                      className="px-3 py-1 bg-pink-900/60 hover:bg-pink-800 border border-pink-500/50 text-pink-200 rounded-lg font-bold text-xs flex items-center gap-1 transition"
                    >
                      <span>📋</span> Sao Chép Mermaid
                    </button>
                  </div>
                  <pre className="p-3 bg-black/80 border border-gray-800 rounded-xl text-[11px] font-mono text-pink-300/90 whitespace-pre overflow-x-auto leading-relaxed select-all">
                    {generateMermaidDiagram()}
                  </pre>
                </div>
              )}

              {exportModalTab === 'markdown' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Tài liệu kiến trúc đồ phổ chi tiết (Node, Ports, Wiring, Prompt):</span>
                    <button
                      onClick={() => {
                        const md = generateMarkdownArchitecture();
                        navigator.clipboard.writeText(md);
                        playAudioFeedback('chime', isSoundEnabled);
                        showToast('📋 Đã sao chép tài liệu Markdown kiến trúc!');
                      }}
                      className="px-3 py-1 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/50 text-purple-200 rounded-lg font-bold text-xs flex items-center gap-1 transition"
                    >
                      <span>📋</span> Sao Chép Markdown
                    </button>
                  </div>
                  <pre className="p-3 bg-black/80 border border-gray-800 rounded-xl text-[11px] font-mono text-purple-300/90 whitespace-pre overflow-x-auto leading-relaxed max-h-[380px] select-all">
                    {generateMarkdownArchitecture()}
                  </pre>
                </div>
              )}

              {exportModalTab === 'json' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Chuỗi JSON cấu hình đầy đủ của đồ phổ hiện tại:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportJson}
                        className="px-3 py-1 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-500/50 text-indigo-200 rounded-lg font-bold text-xs flex items-center gap-1 transition"
                      >
                        <span>⬇️</span> Tải File .json
                      </button>
                      <button
                        onClick={() => {
                          const jsonStr = JSON.stringify({ nodes, connections, groupFrames, zoom, pan, seed: generationSeed }, null, 2);
                          navigator.clipboard.writeText(jsonStr);
                          playAudioFeedback('chime', isSoundEnabled);
                          showToast('📋 Đã sao chép chuỗi JSON vào clipboard!');
                        }}
                        className="px-3 py-1 bg-cyan-900/60 hover:bg-cyan-800 border border-cyan-500/50 text-cyan-200 rounded-lg font-bold text-xs flex items-center gap-1 transition"
                      >
                        <span>📋</span> Sao Chép JSON
                      </button>
                    </div>
                  </div>
                  <pre className="p-3 bg-black/80 border border-gray-800 rounded-xl text-[11px] font-mono text-cyan-300/90 whitespace-pre overflow-x-auto leading-relaxed max-h-[380px] select-all">
                    {JSON.stringify({ nodes, connections, groupFrames, zoom, pan, seed: generationSeed }, null, 2)}
                  </pre>
                </div>
              )}

              {exportModalTab === 'import' && (
                <div className="space-y-3">
                  <div className="text-xs text-gray-400">
                    Dán chuỗi JSON đã lưu trữ hoặc sao chép từ thiết bị khác để nạp toàn bộ đồ thị:
                  </div>
                  <textarea
                    rows={10}
                    value={importJsonText}
                    onChange={e => setImportJsonText(e.target.value)}
                    placeholder='Dán nội dung JSON vào đây (chứa { "nodes": [...], "connections": [...] })...'
                    className="w-full bg-black/80 border border-gray-700 rounded-xl p-3 text-xs font-mono text-amber-200 outline-none focus:border-amber-400 resize-none leading-relaxed"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        const sample = JSON.stringify({
                          nodes: nodes.slice(0, 4),
                          connections: connections.slice(0, 3),
                          groupFrames: groupFrames.slice(0, 1)
                        }, null, 2);
                        setImportJsonText(sample);
                        showToast('Đã dán mẫu thử nghiệm!');
                      }}
                      className="text-xs text-gray-400 hover:text-amber-300 underline"
                    >
                      Dán thử đồ phổ hiện tại làm mẫu
                    </button>
                    <button
                      onClick={handleDirectImportJson}
                      className="px-4 py-2 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg transition"
                    >
                      🚀 Áp Dụng Đồ Phổ Vào Canvas
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handleExportSvgDiagram}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:brightness-110 text-white text-xs font-black transition shadow-lg shadow-teal-950 flex items-center gap-1.5"
                title="Tải về file vector .svg của toàn bộ đồ thị hiện tại"
              >
                <span>🖼️</span> Tải Ảnh Vector SVG Sắc Nét
              </button>
              <button
                type="button"
                onClick={() => setIsExportDiagramModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold transition"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Bible & Novel Chapter Bridge Modal */}
      {isStoryBibleSyncModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-amber-500/50 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col p-5 space-y-4 shadow-2xl ring-1 ring-amber-400/40 animate-fade-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-900/60 border border-amber-500/50 flex items-center justify-center text-base">
                  📚
                </div>
                <div>
                  <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-purple-200 uppercase tracking-wide">
                    Cầu Nối Story Bible & Bản Thảo (Omni Story Bridge)
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Đồng bộ 2 chiều giữa Hồ sơ Cốt truyện tổng thể, Chương đang soạn thảo và Đồ phổ Workflow Node
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsStoryBibleSyncModalOpen(false)}
                className="text-gray-400 hover:text-white text-base px-2 py-1 rounded-lg hover:bg-gray-800"
              >
                ✕
              </button>
            </div>

            {/* Active Data Overview Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Active Story Bible Card */}
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                      📖 Story Bible Đang Kích Hoạt
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/80 text-purple-200 font-mono">
                      {activeStoryBible?.genre || genre}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-white truncate">
                    {activeStoryBible?.title || 'Chưa nạp Story Bible'}
                  </h4>
                  <div className="text-[10px] text-gray-400 space-y-0.5">
                    <div>• Nhân vật chính: <strong className="text-amber-300">{activeStoryBible?.protagonist || activeStoryBible?.detailedDossier?.protagonistProfile?.name || 'Chưa định nghĩa'}</strong></div>
                    <div>• Kim thủ chỉ: <span className="text-purple-200">{activeStoryBible?.goldenFinger || 'Hạt Trường Sinh'}</span></div>
                    {activeStoryBible?.detailedDossier?.volumes?.[0] && (
                      <div>• Quyển 1: <span className="text-gray-300">{activeStoryBible.detailedDossier.volumes[0].title}</span></div>
                    )}
                  </div>
                </div>

                {/* Current Selected Chapter Card */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                      📄 Chương Bản Thảo Đang Chọn
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-200 font-mono">
                      Cây truyện
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-white truncate">
                    {currentChapter?.title || 'Chưa chọn chương nào'}
                  </h4>
                  <div className="text-[10px] text-gray-400 line-clamp-3">
                    {currentChapter?.summary ? `• Tóm tắt: ${currentChapter.summary}` : '• Nhấp vào một chương ở cây cấu trúc bên trái để chọn chương cần đồng bộ'}
                  </div>
                </div>
              </div>

              {/* Action Operations */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-gray-300 block">Chọn hành động đồng bộ:</span>

                {/* Operation 1: Story Bible -> Graph */}
                <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30 hover:border-amber-400/60 transition space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🌟</span>
                      <div>
                        <h5 className="text-xs font-bold text-amber-200">
                          Nạp Đại Cương Story Bible Thành Đồ Phổ Node Trực Quan
                        </h5>
                        <p className="text-[10px] text-gray-400">
                          Tự động sinh 10 nút (Nhân vật chính, Bối cảnh môn phái, Kiếp nạn, Bảo vật, Công pháp, Cảnh giới, Chỉ đạo, Master Engine, Upscaler, Chapter Output) và nối dây thông minh
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLoadFromStoryBible}
                      disabled={!activeStoryBible}
                      className="px-3 py-2 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg transition disabled:opacity-40 shrink-0"
                    >
                      🚀 Khởi Tạo Đồ Phổ
                    </button>
                  </div>
                </div>

                {/* Operation 2: Current Chapter Sync */}
                <div className="p-3 rounded-xl bg-black/60 border border-emerald-500/30 hover:border-emerald-400/60 transition space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      <div>
                        <h5 className="text-xs font-bold text-emerald-200">
                          Nạp Tiêu Đề & Tóm Tắt Chương Đang Chọn Vào Đồ Phổ
                        </h5>
                        <p className="text-[10px] text-gray-400">
                          Cập nhật nút "Trạm Đầu Ra Chương" và "Chỉ Đạo Phân Cảnh" với thông tin của chương đang mở trong cây tiểu thuyết
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSyncCurrentChapterData}
                      disabled={!currentChapter}
                      className="px-3 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg transition disabled:opacity-40 shrink-0"
                    >
                      🔄 Đồng Bộ Chương
                    </button>
                  </div>
                </div>

                {/* Operation 3: Insert Result into Editor */}
                {executionResult && onInsertText && (
                  <div className="p-3 rounded-xl bg-black/60 border border-purple-500/30 hover:border-purple-400/60 transition space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✍️</span>
                        <div>
                          <h5 className="text-xs font-bold text-purple-200">
                            Chèn Ngay Phân Cảnh Vừa Sinh Vào Bản Thảo
                          </h5>
                          <p className="text-[10px] text-gray-400">
                            Chèn đoạn văn {currentDisplayWordCount} chữ đã qua tinh hoa nâng cấp vào chương đang soạn thảo
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const textToInsert = resultViewTab === 'raw' ? executionResult.rawProse : currentDisplayUpscaled;
                          onInsertText(`\n\n${textToInsert}\n\n`);
                          playAudioFeedback('connect', isSoundEnabled);
                          showToast('✍️ Đã chèn phân cảnh vào chương bản thảo!');
                          setIsStoryBibleSyncModalOpen(false);
                        }}
                        className="px-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 text-white font-black text-xs rounded-xl shadow-lg transition shrink-0"
                      >
                        ✍️ Chèn Văn Bản
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsStoryBibleSyncModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-bold transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
