import { NovelConfig, NovelNode, NodeType, CharacterProfile } from '../types';

// =========================================================================
// KIẾN TRÚC DỮ LIỆU HỒ SƠ CỐT TRUYỆN CHI TIẾT (STORY BIBLE DOSSIER)
// =========================================================================

export interface StoryBibleChapterDetail {
  id: string;
  chapterNumber: number;
  title: string;
  summary: string;
  coreConflict: string;
  characterObjective: string;
  foreshadowingAndClues: string;
  lootOrBreakthrough: string;
  proseDraftSample: string;
}

export interface StoryBibleVolumeDetail {
  id: string;
  volumeNumber: number;
  title: string;
  summary: string;
  realmFocus: string;
  mainFactionsClash: string;
  chapters: StoryBibleChapterDetail[];
}

export interface StoryBibleFactionDetail {
  id: string;
  name: string;
  type: string;
  leader: string;
  territory: string;
  doctrine: string;
  relationshipWithProtagonist: string;
  hiddenSecret: string;
}

export interface StoryBibleRealmDetail {
  level: number;
  realmName: string;
  stages: string;
  breakthroughPhenomenon: string;
  daoRiskAndBottleneck: string;
  exclusiveDivineAbility: string;
}

export interface StoryBibleDetailedDossier {
  grandTitle: string;
  storyPhilosophy: string;
  protagonistProfile: CharacterProfile;
  majorCharacters: CharacterProfile[];
  exclusiveRealms: StoryBibleRealmDetail[];
  supremeCultivationArts: Array<{
    name: string;
    tier: string;
    description: string;
    layersSummary: string;
    forbiddenMove: string;
  }>;
  supremeArtifacts: Array<{
    name: string;
    rank: string;
    origin: string;
    specialPower: string;
  }>;
  majorFactions: StoryBibleFactionDetail[];
  volumes: StoryBibleVolumeDetail[];
  subStoryTrajectories: Array<{
    title: string;
    type: string;
    hook: string;
    convergencePoint: string;
  }>;
}

export interface MasterPresetStoryBundle {
  id: string;
  title: string;
  tagline: string;
  genre: string;
  badge: string;
  badgeColor: string;
  summary: string;
  protagonist: string;
  goldenFinger: string;
  config: NovelConfig;
  tree: NovelNode;
  characters?: CharacterProfile[];
  detailedBible?: StoryBibleDetailedDossier;
}

// =========================================================================
// BỘ CỐT TRUYỆN 1: VẠN CỔ HỖN ĐỘN KIẾM TÔN
// (Chính Đạo Nghịch Chuyển • Kiếm Đạo Cổ Phong • Trảm Phạt Chư Tiên)
// =========================================================================

export const KIEM_TON_CHARACTERS: CharacterProfile[] = [
  {
    id: 'char_lam_tieu_master',
    name: 'Lâm Tiêu',
    pinyinOrAlias: 'Vấn Kiếm Tán Nhân / Hỗn Độn Kiếm Tôn',
    role: 'Chính diện',
    gender: 'Nam',
    age: '18 tuổi (Khởi đầu) -> 35 tuổi (Chung cuộc)',
    realmOrRank: 'Luyện Khí Tầng 3 (Khởi đầu) -> Hỗn Độn Kiếm Tiên (Chung cuộc)',
    sectOrFaction: 'Vấn Kiếm Tông (Ngoại Môn) -> Vô Sinh Cấm Các -> Nhân Đạo Tiên Minh',
    factionPosition: 'Đệ tử ngoại môn bần hàn -> Kiếm Minh Minh Chủ',
    spiritualRoots: 'Hỗn Độn Vô Cực Tổ Căn (Ban đầu bị phong ấn ngỡ là Phế Căn)',
    spiritualRootDetail: {
      countCategory: 'Hỗn Độn Khai Thiên Căn (Vô Cực Tổ Căn)',
      grade: 'Thần Cấp Hỗn Độn Tổ Căn (Nghịch Thiên Hỗn Độn)',
      rootName: 'Thái Sơ Hỗn Độn Tổ Căn',
      elements: [
        { element: 'Hỗn Độn', purity: 100, color: '#a855f7', description: 'Bản nguyên hỗn độn đồng hóa vạn khí' },
        { element: 'Kim', purity: 98, color: '#facc15', description: 'Canh Kim Sát Khí chém đứt nhân quả' }
      ],
      cultivationSpeedMultiplier: 'x12 lần khi ngộ kiếm ý trong nghịch cảnh'
    },
    mentalAttributes: {
      soulRealm: 'Nguyên Thần Pháp Tướng',
      soulPowerPoints: 9500,
      perceptionRange: '30 dặm',
      daoHeartType: 'Bất Diệt Kiếm Tâm / Nghịch Mệnh Trảm Thiên',
      daoHeartStability: 98,
      comprehensionTier: 'Nghịch Thiên Yêu Nghiệt',
      comprehensionScore: 99,
      innerDemonResistance: 96
    },
    personality: 'Trầm mặc ít lời, kiên định như thiết thạch, ân oán phân minh. Không mù quáng tin vào giáo điều chính đạo, xem trọng tình nghĩa và lời hứa hơn danh gia vọng tộc.',
    appearance: 'Bạch y mộc mạc viền chỉ xám, dáng người gầy nhưng thẳng tắp như trường kiếm cắm giữa trời tuyết. Mắt sáng như sao băng, sau lưng mang tàn kiếm quấn vải gai.',
    weaponOrAbility: 'Cổ Thiết Kiếm Thô Sơ -> Cửu U Trảm Tiên Kiếm & Hỗn Độn Khai Thiên Kiếm Quyết',
    destinyFate: 'Kim Sắc Cực Phẩm (Đại Khí Vận Nghịch Thiên)',
    backstory: 'Con trai duy nhất của một chấp sự ngoại môn đã qua đời bí ẩn tại Ma Uyên. Bị Vương gia hãm hại cướp ngọc bội gia truyền và đẩy xuống Vực Đoạn Hồn. Thức tỉnh tàn ngọc Thái Cổ mở ra con đường kiếm đạo nghịch thiên.'
  },
  {
    id: 'char_khuong_tuyet_nhu',
    name: 'Khương Tuyết Nhu',
    pinyinOrAlias: 'Phiêu Miểu Tuyết Cơ / Băng Phách Kiếm Linh',
    role: 'Chính diện',
    gender: 'Nữ',
    age: '19 tuổi',
    realmOrRank: 'Trúc Cơ Đỉnh Phong -> Kim Đan Tam Phẩm',
    sectOrFaction: 'Phiêu Miểu Tiên Cung',
    factionPosition: 'Đương Đại Thánh Nữ',
    spiritualRoots: 'Cực Âm Băng Phách Thiên Linh Căn (Thuần Khiết 100%)',
    personality: 'Thanh lãnh cao ngạo nhưng nội tâm thiện lương, căm ghét thói giả nhân giả nghĩa của các trưởng lão thánh địa. Sau khi được Lâm Tiêu cứu tại Vô Sinh Cấm Khu đã âm thầm tương trợ hắn.',
    appearance: 'Thân vận lam sa tuyết vũ, da trắng như ngọc, tóc dài chấm gót tỏa hương tuyết liên thoang thoảng. Tay cầm Băng Tinh Trảm Nguyệt Kiếm.',
    weaponOrAbility: 'Băng Tinh Trảm Nguyệt Kiếm & Thái Hư Huyền Băng Quyết',
    destinyFate: 'Tử Sắc Đỉnh Phong',
    backstory: 'Thánh Nữ Phiêu Miểu Tiên Cung mang định mệnh phải gả cho Đệ Nhất Thiên Kiêu Thái Nhất Môn để liên hôn chính trị, thực chất là làm đỉnh lô cho lão tổ Thượng Giới hút linh khí.'
  },
  {
    id: 'char_co_kiem_ton',
    name: 'Cổ Kiếm Tôn (Kiếm Lão)',
    pinyinOrAlias: 'Vạn Kiếm Đạo Nhân / Kiếm Hồn Thái Cổ',
    role: 'Chính diện',
    gender: 'Nam',
    age: 'Tồn tại hơn mười vạn năm (Tàn hồn)',
    realmOrRank: 'Tàn Thần Tiên Cảnh (Thực lực phục hồi theo tu vi Lâm Tiêu)',
    sectOrFaction: 'Thái Cổ Kiếm Các (Đã thất truyền)',
    factionPosition: 'Hộ Đạo Giả trong Hỗn Độn Tàn Ngọc',
    spiritualRoots: 'Hỗn Độn Kiếm Phách',
    personality: 'Khắt khe, nghiêm cẩn trong kiếm đạo, cay độc trong lời nói nhưng chân thành bao bọc truyền nhân. Ôm mối thù vạn năm với Thượng Giới Tiên Tộc.',
    appearance: 'Một lão già mờ ảo râu tóc bạc phơ hiện ra từ làn sương xám của mảnh tàn ngọc, quanh thân vờn quanh muôn vàn hư kiếm.',
    weaponOrAbility: 'Tru Tiên Kiếm Trận Tàn Đồ & Khai Thiên Nhất Kiếm Thần Niệm',
    destinyFate: 'Thần Thoại Kim Sắc',
    backstory: 'Chủ nhân của Thái Cổ Kiếm Các mười vạn năm trước, từng dẫn dắt tu sĩ nhân gian chém đứt Tiên Môn nhưng bị chư thần thượng giới hợp lực trấn áp tiêu diệt môn phái, tàn hồn phong ấn trong ngọc thạch.'
  },
  {
    id: 'char_vuong_hao',
    name: 'Vương Hạo',
    pinyinOrAlias: 'Huyết Kiếm Lang Quân / Vương Nhị Thiếu',
    role: 'Phản diện',
    gender: 'Nam',
    age: '20 tuổi',
    realmOrRank: 'Luyện Khí Tầng 8 -> Trúc Cơ Giả Lập',
    sectOrFaction: 'Vấn Kiếm Tông (Vương Thị Gia Tộc)',
    factionPosition: 'Đích tử Chấp Pháp Đường Trưởng Lão',
    spiritualRoots: 'Hỏa Kim Song Linh Căn (Dị Hóa Sát Hỏa)',
    personality: 'Hẹp hòi, tàn nhẫn, ỷ thế hiếp người, đố kỵ với bất kỳ ai có tài năng hơn mình. Coi phàm nhân và đệ tử bần hàn như sâu bọ.',
    appearance: 'Mặc gấm bào thêu kim tuyến xa hoa, mắt xếch gian trá, trên môi luôn nở nụ cười khinh bạc.',
    weaponOrAbility: 'Xích Huyết Kiếm & Phá Lãng Kiếm Pháp (Dùng đan dược nâng cấp ép duyên)',
    destinyFate: 'Thanh Sắc Tàn Bại',
    backstory: 'Được cha là Trưởng Lão Vương Thiên Cừu nuông chiều, chuyên cướp đoạt tài nguyên của đệ tử ngoại môn. Kẻ trực tiếp ra lệnh đánh gãy xương Lâm Tiêu và cướp ngọc bội gia truyền.'
  },
  {
    id: 'char_vuong_thien_cuu',
    name: 'Vương Thiên Cừu',
    pinyinOrAlias: 'Thiết Thủ Diêm La / Vương Chấp Pháp',
    role: 'Phản diện',
    gender: 'Nam',
    age: '120 tuổi',
    realmOrRank: 'Kim Đan Sơ Kỳ (Trưởng Lão Vấn Kiếm Tông)',
    sectOrFaction: 'Vấn Kiếm Tông Chấp Pháp Đường',
    factionPosition: 'Chấp Pháp Đại Trưởng Lão Ngoại Sơn',
    spiritualRoots: 'Canh Kim Chân Linh Căn',
    personality: 'Thâm hiểm, tàn độc, ngụy trang dưới vẻ mặt công chính nghiêm minh nhưng ngấm ngầm bán vị trí bí cảnh và ăn hối lộ đan dược.',
    appearance: 'Mặt vuông râu dài, sắc mặt xanh mét, áo choàng chấp pháp đen mun thêu hình hổ ngậm kiếm uy nghiêm đáng sợ.',
    weaponOrAbility: 'Cửu Khâu Đoạt Mệnh Trảo & Âm Lôi Kiếm Trận',
    destinyFate: 'Tử Sắc Sa Hóa',
    backstory: 'Kẻ chủ mưu năm xưa hãm hại phụ thân Lâm Tiêu tại Ma Uyên nhằm chiếm đoạt bản đồ mật thám, che giấu cho việc Vương gia lén lút giao dịch vật tư cấm cùng Ma Đạo.'
  },
  {
    id: 'char_ly_tam_cuu',
    name: 'Lý Tam Cửu',
    pinyinOrAlias: 'Cửu Gia / Quỷ Thủ Thương Khách',
    role: 'Đồng minh',
    gender: 'Nam',
    age: '55 tuổi',
    realmOrRank: 'Trúc Cơ Trung Kỳ (Thực lực ẩn giấu)',
    sectOrFaction: 'U Minh Hắc Thị & Thiên Nhĩ Lâu',
    factionPosition: 'Chưởng quỹ Hiệu Thuốc Vô Danh / Đầu Mối Tình Báo Ngầm',
    spiritualRoots: 'Mộc Thổ Tạp Căn',
    personality: 'Khôn ngoan, sành sỏi thế sự, trọng chữ tín trong kinh doanh. Coi Lâm Tiêu là khoản đầu tư lớn nhất đời mình.',
    appearance: 'Dáng người mập mạp mặc áo chẽn xám giản dị, tay luôn cầm bàn tính ngọc bằng xương thú, mắt híp lại cười tươi như Phật Di Lặc.',
    weaponOrAbility: 'Truyền Âm Phù Trận Cơ Quan & Mê Hồn Hóa Cốt Tán',
    destinyFate: 'Hoàng Kim Hộ Mệnh',
    backstory: 'Từng là nội môn đệ tử của một đan phái bị diệt vong, trốn vào hắc thị mở mạng lưới thu mua linh thảo và buôn tin tức cho tán tu bần hàn.'
  },
  {
    id: 'char_huyen_than_tien_su',
    name: 'Tiên Sứ Huyền Thần',
    pinyinOrAlias: 'Thượng Giới Chấp Pháp Giả / Hạo Thiên Sứ Giả',
    role: 'Phản diện chính',
    gender: 'Nam',
    age: 'Hơn ba ngàn tuổi',
    realmOrRank: 'Đại Thừa Cảnh / Tiên Nhân Phân Thần',
    sectOrFaction: 'Thượng Giới Hạo Thiên Tiên Đình',
    factionPosition: 'Đại Biểu Giám Sát Cửu Châu Hạ Giới',
    spiritualRoots: 'Thần Tộc Quang Diệu Căn',
    personality: 'Tuyệt đối ngạo mạn, vô tình lãnh khốc, coi toàn bộ tu sĩ hạ giới như bầy sâu bọ chăn nuôi để thu hoạch hương hỏa và linh hồn.',
    appearance: 'Đầu đội mũ miện bằng lưu ly ngũ sắc, thân khoác tiên bào dệt bằng tinh quang ngân hà, hai mắt phát ra kim quang thiêu đốt linh hồn.',
    weaponOrAbility: 'Hạo Thiên Thần Chỉ & Tinh Môn Khai Thiên Kích',
    destinyFate: 'Chí Tôn Thần Tộc',
    backstory: 'Kẻ đứng sau kiểm soát kết giới Tinh Môn ngăn cấm tu sĩ hạ giới phi thăng, định kỳ phát động Ma Uyên để tẩy rửa hạ giới và cướp đoạt tinh hoa nhân gian.'
  }
];

export const KIEM_TON_DETAILED_DOSSIER: StoryBibleDetailedDossier = {
  grandTitle: 'VẠN CỔ HỖN ĐỘN KIẾM TÔN',
  storyPhilosophy: 'Trời đất lấy tu sĩ làm sâu bọ, Thượng Giới lấy Cửu Châu làm chuồng chăn nuôi. Đạo không vì kẻ mạnh mà tồn tại, kiếm không vì thần tiên mà cúi đầu. Lấy kiếm tâm phàm trần trảm phá xiềng xích nô dịch vạn cổ.',
  protagonistProfile: KIEM_TON_CHARACTERS[0],
  majorCharacters: KIEM_TON_CHARACTERS,
  exclusiveRealms: [
    {
      level: 1,
      realmName: 'Luyện Khí Kỳ (1 - 9 Tầng)',
      stages: 'Sơ Kỳ (1-3) -> Trung Kỳ (4-6) -> Hậu Kỳ (7-8) -> Viên Mãn (Tầng 9)',
      breakthroughPhenomenon: 'Kinh mạch phát sáng, bài xuất hắc cấu đan điền, kiếm khí sơ khai ngưng tụ đầu ngón tay.',
      daoRiskAndBottleneck: 'Đan độc tích tụ gây bế tắc huyệt đạo; Lâm Tiêu dùng Hỗn Độn Khí tinh lọc đan độc hoàn mỹ.',
      exclusiveDivineAbility: 'Kiếm Khí Ly Thể: Bắn ra kiếm mang thuần khiết trảm kim đoạn ngọc ngoài mười trượng.'
    },
    {
      level: 2,
      realmName: 'Trúc Cơ Kỳ (Hạ Phẩm -> Thiên Phẩm)',
      stages: 'Sơ Kỳ (Đạo Cơ Thành Hình) -> Trung Kỳ (Địa Mạch Hòa Nhập) -> Hậu Kỳ (Cửu Luân Đài Sen)',
      breakthroughPhenomenon: 'Khí hải hóa thành hồ linh dịch, trên đỉnh đầu hiện đài sen hỗn độn chín tầng.',
      daoRiskAndBottleneck: 'Đạo cơ rạn nứt nếu tâm chí không vững; Lâm Tiêu nuốt trọn Ngũ Hành Linh Vật đúc Thiên Phẩm Đạo Cơ độc nhất.',
      exclusiveDivineAbility: 'Ngự Kiếm Phi Hành & Kiếm Khí Hóa Hình (Ngưng kiếm thành tường hộ thể vô ngại).'
    },
    {
      level: 3,
      realmName: 'Kim Đan Kỳ (Cửu Phẩm Hỗn Độn Đan)',
      stages: 'Hạ Tam Phẩm -> Trung Tam Phẩm -> Thượng Tam Phẩm -> Cực Phẩm Vô Thượng',
      breakthroughPhenomenon: 'Đan lôi chín đạo giáng xuống, Kim Đan xoay tròn như vầng thái dương hỗn độn.',
      daoRiskAndBottleneck: 'Cửu Trọng Lôi Kiếp thiêu đốt thân thể; cần tôi luyện kiếm cốt để không bị tan biến.',
      exclusiveDivineAbility: 'Kiếm Vực Sơ Thành: Trong vòng trăm trượng vạn vật đều biến thành kiếm ý sát thương.'
    },
    {
      level: 4,
      realmName: 'Nguyên Anh Kỳ (Hỗn Độn Kiếm Anh)',
      stages: 'Ngưng Anh -> Anh Biến -> Xuất Khiếu Đỉnh Phong',
      breakthroughPhenomenon: 'Kim đan nứt vỡ, một đứa trẻ bằng kiếm quang thuần khiết đạp toái hư không bay ra.',
      daoRiskAndBottleneck: 'Tâm Ma Hoang Tưởng cắn xé nguyên thần; Kiếm Lão hộ trì đạo tâm bất diệt.',
      exclusiveDivineAbility: 'Nguyên Anh Xuất Khiếu: Nguyên anh du ngoạn vạn dặm trảm đầu địch thủ chỉ trong một niệm.'
    },
    {
      level: 5,
      realmName: 'Hóa Thần Kỳ (Chân Nhất Kiếm Tôn)',
      stages: 'Hóa Thần Sơ Kỳ -> Dung Hợp Thiên Địa -> Đại Thừa Chuẩn Tiên',
      breakthroughPhenomenon: 'Thiên địa rung chuyển, tinh hà hiện rõ giữa ban ngày, vạn kiếm cửu châu đồng loạt nghiêng mình quỳ bái.',
      daoRiskAndBottleneck: 'Đồng hóa cùng thiên đạo vô tình; giữ lại chấp niệm phàm nhân để nghịch thiên.',
      exclusiveDivineAbility: 'Vạn Cổ Quy Nhất: Một kiếm chém rách thời không, trảm đoạn nhân quả số mệnh.'
    }
  ],
  supremeCultivationArts: [
    {
      name: 'Thái Sơ Hỗn Độn Kiếm Kinh',
      tier: 'Thần Cấp Vô Thượng (Cấm Thuật Thái Cổ)',
      description: 'Công pháp trấn phái mười vạn năm trước của Thái Cổ Kiếm Các, lấy hỗn độn làm gốc, dung nạp vạn đạo sát phạt.',
      layersSummary: 'Gồm 9 tầng: Tầng 1-3 Tinh Lọc Kiếm Ý; Tầng 4-6 Khai Mở Kiếm Cốt; Tầng 7-9 Chém Đứt Vận Mệnh Tiên Giới.',
      forbiddenMove: 'Khai Thiên Nhất Kiếm: Đốt cháy tuổi thọ chém rách ranh giới giữa hạ giới và thượng giới.'
    },
    {
      name: 'Vô Sinh Bộ Pháp',
      tier: 'Thiên Giai Thượng Phẩm',
      description: 'Bộ pháp huyền ảo bước đi trên hư ảnh kiếm quang, bước một bước như dời non lấp biển.',
      layersSummary: 'Hư Bộ -> Đạp Kiếm -> Súc Địa Thành Thốn -> Xuyên Toa Hư Không.',
      forbiddenMove: 'Sát Na Kiếm Ảnh: Tạo ra chín tàn ảnh đồng thời ra chiêu từ chín hướng chí mạng.'
    }
  ],
  supremeArtifacts: [
    {
      name: 'Hỗn Độn Tàn Ngọc',
      rank: 'Thái Cổ Hồng Hoang Chí Bảo',
      origin: 'Mảnh vỡ của Thiên Đạo Thạch sơ khai rơi xuống nhân gian thuở khai thiên lập địa.',
      specialPower: 'Tinh lọc 100% tạp chất linh đan, diễn giải sơ hở công pháp địch nhân, nuôi dưỡng tàn hồn Cổ Kiếm Tôn.'
    },
    {
      name: 'Cửu U Trảm Tiên Kiếm',
      rank: 'Cực Đạo Đế Binh',
      origin: 'Đúc từ Huyền Thiết Cửu U và máu rồng Thái Cổ, từng nhuốm máu ba ngàn chân tiên.',
      specialPower: 'Khắc chế hoàn toàn linh quang phòng ngự của tu sĩ tiên tộc, hút kiếm ý kẻ bại trận để tiến hóa.'
    }
  ],
  majorFactions: [
    {
      id: 'fac_van_kiem_tong',
      name: 'Vấn Kiếm Tông',
      type: 'Chính Đạo Môn Phái (Ngũ Đại Tông Môn)',
      leader: 'Chưởng Môn Phong Vô Nhai & Vương Gia Chấp Pháp Đường',
      territory: 'Thanh Châu • Vấn Kiếm Sơn Mạch',
      doctrine: 'Bề ngoài đề cao kiếm đạo thuần khiết, bên trong bị các thế gia lũng đoạn bóc lột đệ tử nghèo.',
      relationshipWithProtagonist: 'Tông môn khởi đầu, vừa là nơi nuôi dưỡng vừa là kẻ thù cần thanh trừng sâu mọt.',
      hiddenSecret: 'Cổ Kiếm Trũng của tông môn thực chất là nơi giam giữ một nhánh rễ của Ma Uyên.'
    },
    {
      id: 'fac_phieu_mieu_cung',
      name: 'Phiêu Miểu Tiên Cung',
      type: 'Thánh Địa Thượng Cổ',
      leader: 'Thánh Mẫu Huyền Nguyệt',
      territory: 'Tuyết Vực Băng Sơn • Thiên Trì Đỉnh',
      doctrine: 'Tu luyện Thái Thượng Vong Tình, chỉ thu nhận nữ tử có thể chất đặc thù.',
      relationshipWithProtagonist: 'Ban đầu đối địch ngăn cấm, sau trở thành đồng minh vì Thánh Nữ Khương Tuyết Nhu.',
      hiddenSecret: 'Tổ sư lập phái từng là tình nhân của Cổ Kiếm Tôn mười vạn năm trước.'
    },
    {
      id: 'fac_thien_nhi_lau',
      name: 'Thiên Nhĩ Lâu & U Minh Hắc Thị',
      type: 'Tán Tu Thương Hội & Mạng Lưới Tình Báo Ngầm',
      leader: 'Lý Tam Cửu & Tổng Đà Chủ Vô Ảnh',
      territory: 'Trải dài khắp các thành trì dưới lòng đất Cửu Châu',
      doctrine: 'Tiền bạc và chân tướng là trên hết, không phục tùng bất kỳ tông môn hay tiên triều nào.',
      relationshipWithProtagonist: 'Đồng minh bí mật cung cấp dược liệu hiếm và tin tức cơ mật.',
      hiddenSecret: 'Sở hữu mạng lưới cơ quan truyền tin nhanh hơn cả phi kiếm truyền thư mười lần.'
    },
    {
      id: 'fac_hao_thien_tien_dinh',
      name: 'Hạo Thiên Tiên Đình (Thượng Giới)',
      type: 'Thượng Giới Thần Vực',
      leader: 'Hạo Thiên Thần Đế & Chư Đại Tiên Sứ',
      territory: 'Thượng Giới Tinh Cung • Cửu Thiên Chi Thượng',
      doctrine: 'Cửu Châu hạ giới là linh điền nuôi sâu, định kỳ hạ giới gặt hái linh căn và tinh hoa.',
      relationshipWithProtagonist: 'Thù địch sinh tử, mục tiêu chung cuộc cần lật đổ.',
      hiddenSecret: 'Thần Đế Thượng Giới đã thọ nguyên khô cạn, cần hút sinh khí của toàn bộ hạ giới để kéo dài mạng sống.'
    }
  ],
  volumes: [
    {
      id: 'vol_kt_1',
      volumeNumber: 1,
      title: 'Quyển 1: Vấn Kiếm Thiếu Niên • Ngoại Môn Trảm Mãng',
      summary: 'Giai đoạn Luyện Khí Kỳ. Khởi đầu từ thiếu niên bần hàn bị đệ tử thế gia hãm hại đẩy xuống vực sâu, thức tỉnh Hỗn Độn Tàn Ngọc và Kiếm Lão, từng bước nhẫn nhục phản sát kẻ thù, lập uy tại ngoại môn.',
      realmFocus: 'Luyện Khí Tầng 1 đến Tầng 9',
      mainFactionsClash: 'Lâm Tiêu vs Vương Gia Chấp Pháp Đường (Vương Hạo, Vương Thiên Cừu)',
      chapters: [
        {
          id: 'chap_kt_1',
          chapterNumber: 1,
          title: 'Chương 1: Đêm Mưa Đoạt Mệnh, Hỗn Độn Ngọc Thức Tỉnh',
          summary: 'Lâm Tiêu bị Vương Hạo cùng đồng bọn cướp ngọc bội gia truyền và đánh gãy xương đẩy xuống Vực Đoạn Hồn. Giọt máu tâm đầu kích hoạt mảnh tàn ngọc cổ xưa ẩn giấu.',
          coreConflict: 'Sinh tử gang tấc giữa kẻ yếu thế bị tước đoạt toàn bộ và kẻ quyền thế ngạo mạn.',
          characterObjective: 'Sống sót khỏi cú rơi vạn trượng và nắm bắt lấy cơ duyên nghịch thiên vừa thức tỉnh.',
          foreshadowingAndClues: 'Mảnh tàn ngọc vốn do phụ thân để lại, có khắc ấn ký của Thái Cổ Kiếm Các mười vạn năm trước.',
          lootOrBreakthrough: 'Thức tỉnh Hỗn Độn Tàn Ngọc, hấp thụ Hỗn Độn Chi Khí, nối liền kinh mạch gãy, đột phá Luyện Khí Tầng 5.',
          proseDraftSample: `Mưa như trút nước xuống vách đá Đoạn Hồn Sơn.

Mùi máu tanh nồng quyện với bùn đất nhão nhoét xộc thẳng vào mũi. Lâm Tiêu nằm sấp trên tảng đá lởm chởm, lồng ngực phập phồng yếu ớt, từng đường kinh mạch trong cơ thể như bị thiêu đốt bởi một luồng hắc ám chưởng lực tàn độc.

"Lâm Tiêu, đừng trách thiếu gia ta thủ đoạn độc ác. Muốn trách thì hãy trách phụ thân ngươi đã chết mà vẫn để lại chiếc Hắc Ngọc Cổ Bội chướng mắt này."

Tiếng cười lạnh lùng vang lên bên trên vách đá. Vương Hạo — đích tử của Vương gia Chấp Pháp Đường — khẽ tung hứng miếng ngọc bội vừa giật khỏi cổ Lâm Tiêu, khóe môi nhếch lên một nụ cười khinh miệt. Phía sau hắn, hai gã ngoại môn đệ tử áo xám đồng loạt rút đoản đao, ánh mắt lạnh lẽo như nhìn một xác chết.

"Ngọc... trả lại cho ta..." Lâm Tiêu cắn chặt răng, móng tay cắm sâu vào khe đá đến bật máu.

"Trả lại? Đồ phế vật Luyện Khí tầng ba như ngươi cũng xứng giữ bảo vật này sao?" Vương Hạo cười nhạt, vung chân đạp thẳng vào bờ vai gãy của Lâm Tiêu: "Xuống Hoàng Tuyền mà đòi phụ thân ngươi đi!"

Một tiếng rạn nứt giòn tan vang lên. Thân hình gầy gò của Lâm Tiêu như chiếc lá rách tả tơi rơi thẳng xuống màn sương mù dày đặc của Vực Đoạn Hồn. Gió rít bên tai như tiếng quỷ khóc. Nhưng trong khoảnh khắc cận kề cái chết, giọt máu đỏ tươi rơi vào mảnh ngọc vụn giấu kín trong cổ áo.

[Keng! Hỗn Độn Đạo Chủng cảm ứng được ý chí nghịch thiên... Phong ấn Thái Cổ ngàn vạn năm chính thức thức tỉnh!]

Một đạo kiếm quang xám tro bùng nổ, xé toạc màn đêm tăm tối!`
        },
        {
          id: 'chap_kt_2',
          chapterNumber: 2,
          title: 'Chương 2: Đáy Vực Tàn Kiếm, Nhất Khí Trảm Cự Mãng',
          summary: 'Dưới đáy vực sâu, Lâm Tiêu diện kiến tàn thần của Kiếm Lão, nhận khẩu quyết Thái Sơ Hỗn Độn Kiếm Kinh và dùng cành cây làm kiếm trảm sát Huyết Giác Mãng nhị giai.',
          coreConflict: 'Lâm Tiêu tay không đối đầu mãng xà khổng lồ hung tàn canh giữ linh dược.',
          characterObjective: 'Khống chế kiếm ý sơ khai của bản thân để sinh tồn và đoạt nội đan chữa thương.',
          foreshadowingAndClues: 'Dưới đáy vực có dấu vết chiến trận thượng cổ, hài cốt kiếm tu cắm kiếm trấn áp ma mạch.',
          lootOrBreakthrough: 'Thu được Tam Diệp U Lan (ngàn năm), nội đan nhị giai và một thanh Cổ Thiết Kiếm rỉ sét.',
          proseDraftSample: `Dưới đáy Đoạn Hồn Vực sương độc lượn lờ như mây đen, mùi tanh tưởi bốc lên nồng nặc.

Một con cự mãng dài hơn mười trượng, vảy đỏ như máu, đầu mọc một sừng nhọn hoắt đang uốn lượn quanh gốc thảo dược phát ra lam quang mờ ảo. Đó chính là Huyết Giác Mãng nhị giai tương đương tu sĩ Luyện Khí viên mãn!

"Tiểu tử, ngươi sợ sao?" Trong thức hải, giọng nói khàn khàn già nua của Kiếm Lão vang lên mang theo vài phần giễu cợt: "Nếu sợ thì cứ ngoan ngoãn nằm chờ chết, kiếm đạo của lão phu không truyền cho kẻ nhát gan."

"Sợ?"

Lâm Tiêu khẽ nhếch môi, ánh mắt lạnh lẽo như băng đao. Hắn cúi người nhặt một cành cây khô dưới chân. Dưới sự vận hành của Thái Sơ Hỗn Độn Quyết, luồng khí tức xám tro từ đan điền chảy tràn ra đầu cành cây, khiến cành củi mục bỗng chốc cứng rắn sắc bén hơn cả bảo kiếm trăm lần tôi luyện!

"Xì xì!" Con cự mãng gầm lên một tiếng long trời lở đất, thân hình đồ sộ như một cỗ xe sắt lao thẳng về phía Lâm Tiêu, miệng to như chậu máu cắn xuống!

Lâm Tiêu không lùi nửa bước. Hắn bước chếch sang trái một bước huyền ảo, thân hình tựa như ngọn gió thoảng lướt qua kẽ răng nanh của mãng xà. Cành cây trong tay vung lên một đường vòng cung tuyệt mỹ chém thẳng vào mắt trái yêu thú.

"Phập!"

Máu đen phun trào. Tiếng rít đau đớn vang vọng khắp đáy vực, mở đầu cho cuộc trỗi dậy của một kiếm tu nghịch thiên.`
        },
        {
          id: 'chap_kt_3',
          chapterNumber: 3,
          title: 'Chương 3: Sinh Tử Lôi Đài, Một Chiêu Phế Kẻ Thù',
          summary: 'Lâm Tiêu trở lại ngoại môn đúng ngày kiểm tra định kỳ. Vương Hạo đang ngạo nghễ khoe mẽ trên lôi đài thì Lâm Tiêu bước lên, một chiêu bẻ gãy đan điền kẻ hãm hại mình.',
          coreConflict: 'Sự khinh miệt của toàn bộ đệ tử thế gia đối diện với đòn phản công chớp nhoáng của Lâm Tiêu.',
          characterObjective: 'Đòi lại công đạo, công khai tuyên chiến với quyền lực bất công của Vương gia Chấp Pháp Đường.',
          foreshadowingAndClues: 'Vương Thiên Cừu ngồi trên khán đài lộ sát ý, bắt đầu nghi ngờ xuất xứ của kiếm chiêu Lâm Tiêu.',
          lootOrBreakthrough: 'Đoạt lại Hắc Ngọc Cổ Bội, lấy túi trữ vật của Vương Hạo (chứa 500 linh thạch hạ phẩm và lệnh bài thông hành bí cảnh).',
          proseDraftSample: `Ngoại môn diễn võ trường, tiếng reo hò ầm ĩ như sấm dậy.

Vương Hạo đứng chắp tay trên lôi đài đá hoa cương, cằm hất cao, áo bào tung bay theo gió. Dưới chân hắn là ba đệ tử bần hàn bị đánh hộc máu bất tỉnh.

"Còn ai không phục nữa không? Lũ giun dế ngoại môn các ngươi sinh ra đã định sẵn làm nô bộc cho thế gia chúng ta!" Vương Hạo cười lớn đầy đắc ý.

"Ta không phục."

Một giọng nói bình thản nhưng lạnh buốt như băng tuyết từ bậc thang đá truyền tới.

Đám đông tự động tẽ ra hai bên. Một thiếu niên mặc áo vải thô rách rưới, tóc đen buộc lỏng sau gáy, sau lưng vác một thanh kiếm sắt rỉ sét chậm rãi bước lên lôi đài. Từng bước chân hắn đặt xuống như có tiếng kiếm ngân vang vọng sâu trong tâm can mọi người.

"Lâm... Lâm Tiêu? Ngươi... ngươi chưa chết?" Vương Hạo giật bắn mình, nụ cười trên mặt cứng đờ, đáy mắt hiện lên tia hoảng loạn tột độ. Rõ ràng chính tay hắn đã đánh gãy xương Lâm Tiêu ném xuống Đoạn Hồn Vực!

"Nhờ phúc của ngươi, Diêm Vương không dám nhận mạng ta."

Lâm Tiêu dừng bước cách Vương Hạo mười trượng, thanh kiếm rỉ trong tay khẽ nâng lên ngang ngực:

"Rút kiếm của ngươi ra. Hôm nay trên lôi đài sinh tử này, hoặc ngươi chết, hoặc ta phế ngươi!"`
        },
        {
          id: 'chap_kt_4',
          chapterNumber: 4,
          title: 'Chương 4: Hắc Thị Kết Giao, Mạng Lưới Mật Thám Xuất Hiện',
          summary: 'Sau chiến thắng, Lâm Tiêu bị Vương gia phong tỏa đan dược. Hắn cải trang tiến vào U Minh Chợ Đen, kết giao với Lý Tam Cửu và phát hiện manh mối gián điệp của thế gia.',
          coreConflict: 'Sự vây ép kinh tế, tài nguyên của tông môn đối với Lâm Tiêu buộc hắn phải tìm kiếm con đường sinh tồn ngoài quy củ.',
          characterObjective: 'Bán da mãng xà để đổi lấy lò luyện đan và thiết lập kênh buôn bán dược liệu độc lập.',
          foreshadowingAndClues: 'Lý Tam Cửu nhận ra dấu vết đao pháp đặc biệt trên da mãng, nhắc nhở Lâm Tiêu về bí cảnh Vô Sinh Cấm Khu sắp mở.',
          lootOrBreakthrough: 'Đổi được một chiếc Lô Luyện Đan Bách Thảo hạ phẩm, ba mươi phần linh thảo Luyện Khí Đan và thông tin mật về phân bố yêu thú cấm khu.',
          proseDraftSample: `Ngõ Hắc Thạch, góc tối tăm nhất của U Minh Chợ Đen.

Lâm Tiêu trùm áo choàng đen kịt bước vào hiệu thuốc Vô Danh. Mùi thảo dược khô nồng nặc xen lẫn mùi lưu huỳnh xộc thẳng vào mũi. Đằng sau quầy gỗ mục nát, một người đàn ông mập mạp đang thoăn thoắt gảy bàn tính ngọc, khóe mắt híp lại quan sát từng cử chỉ của khách nhân.

"Khách quan muốn mua đan hay bán dược?" Lý Tam Cửu ngẩng đầu, nụ cười thương nhân nở trên môi nhưng ánh mắt sắc như dao cau.

Lâm Tiêu không nói một lời, vung tay ném tấm da mãng xà nguyên vẹn dài tám trượng lên mặt bàn. Tấm vảy đỏ rực phát ra linh áp nhàn nhạt khiến ngọn đèn dầu trên bàn bỗng chao đảo.

Bàn tính ngọc trong tay Lý Tam Cửu bỗng nhiên khựng lại.

"Huyết Giác Mãng nhị giai đỉnh phong... vết chém duy nhất ở ngay dưới yết hầu, một kiếm đoạt mạng, không làm tổn hại một tấc da nào!" Lý Tam Cửu vuốt ve tấm vảy rắn, mắt sáng rực lên: "Tiểu huynh đệ, kiếm pháp này của ngươi e rằng ngay cả kiếm tu nội môn cũng chưa chắc thi triển được!"

"Bao nhiêu linh thạch?" Lâm Tiêu lạnh nhạt hỏi.

"Nếu chỉ tính linh thạch thì quá dung tục." Lý Tam Cửu ghé sát lại, hạ giọng bí hiểm: "Lão phu biết ngươi là ai. Ngươi vừa đắc tội với Vương Thiên Cừu, bọn chúng đã ra lệnh cấm chỉ các tiệm thuốc bán Trúc Cơ Đan cho ngươi. Ngươi cần lão phu, và lão phu... cần một thanh kiếm sắc bén như ngươi!"`
        }
      ]
    },
    {
      id: 'vol_kt_2',
      volumeNumber: 2,
      title: 'Quyển 2: Vô Sinh Cấm Khu • Đúc Thiên Phẩm Đạo Cơ',
      summary: 'Giai đoạn Trúc Cơ Kỳ. Đại hội thí luyện bí cảnh Vô Sinh Cấm Khu mở ra. Lâm Tiêu bị đệ tử thế gia liên thủ mai phục tại Vạn Kiếm Trũng, hắn nghịch chuyển thế trận, dung hợp Ngũ Hành Linh Vật và cứu giúp Thánh Nữ Khương Tuyết Nhu.',
      realmFocus: 'Trúc Cơ Kỳ Sơ Kỳ đến Viên Mãn (Thiên Phẩm Đạo Cơ)',
      mainFactionsClash: 'Lâm Tiêu vs Liên Minh Thế Gia Vấn Kiếm Tông & Quái Thú Cấm Khu',
      chapters: [
        {
          id: 'chap_kt_5',
          chapterNumber: 5,
          title: 'Chương 5: Vô Sinh Bí Cảnh, Tàn Kiếm Tỉnh Giấc Trùng Trùng',
          summary: 'Bí cảnh mở ra. Hàng trăm đệ tử tiến vào Vạn Kiếm Trũng. Nhóm sát thủ do Vương Thiên Cừu phái đến phong tỏa lối thoát nhằm diệt khẩu Lâm Tiêu.',
          coreConflict: 'Tình thế một chọi mười giữa đầm lầy cấm địa đầy rẫy sát trận cổ xưa.',
          characterObjective: 'Dẫn dắt kẻ thù vào trận địa kiếm khí tàn khuyết để tiêu hao sinh lực địch.',
          foreshadowingAndClues: 'Cổ Kiếm Trũng rung động mỗi khi Lâm Tiêu tới gần, báo hiệu một thanh thần kiếm cổ xưa sắp xuất thế.',
          lootOrBreakthrough: 'Tìm thấy gốc Canh Kim Thảo ngàn năm và một phiến tàn phù Địa Sát.',
          proseDraftSample: `Bầu trời Vô Sinh Cấm Khu một màu tím xám ảm đạm như ngày tận thế.

Hàng ngàn thanh tàn kiếm gỉ sét cắm la liệt trên sườn đồi khô cằn. Gió thổi qua khe đá phát ra tiếng rít như vạn linh hồn than khóc. Lâm Tiêu đứng trên một mỏm đá cao, hai mắt khép hờ, cảm nhận luồng kiếm ý u uất tích tụ suốt mười vạn năm qua.

"Lâm Tiêu! Ngươi quả nhiên trốn ở đây!"

Tiếng quát lạnh lùng xé toạc không gian. Tám bóng người mặc hắc y chấp pháp đồng loạt xuất hiện từ ba hướng, trên tay cầm Tỏa Linh Câu và Phá Khí Nỏ nhắm thẳng vào tim Lâm Tiêu.

Kẻ dẫn đầu là Vương Bưu — đường huynh của Vương Hạo, một kẻ đã Trúc Cơ nửa bước.

"Trưởng lão có lệnh, mang đầu Lâm Tiêu về thưởng mười vạn linh thạch và một viên Thiên Hỏa Đan!" Vương Bưu cười gằn, vung tay: "Bắn!"

Hàng chục mũi tên nỏ tẩm kịch độc xé rách không khí bay tới. Nhưng Lâm Tiêu không hề né tránh. Hắn đưa tay chạm nhẹ vào một thanh kiếm sắt cắm sâu trong lòng đất cạnh chân.

"Ong ——!"

Một tiếng kiếm ngâm vang dội chín tầng mây. Toàn bộ hàng ngàn thanh tàn kiếm trên sườn đồi bỗng nhiên rung lên bần bật, đồng loạt bay lên không trung hóa thành một cơn bão kiếm sắt bao bọc lấy thân hình Lâm Tiêu!`
        },
        {
          id: 'chap_kt_6',
          chapterNumber: 6,
          title: 'Chương 6: Địa Mạch Nổi Loạn, Nghịch Chuyển Ngũ Hành Trận',
          summary: 'Kẻ thù kích hoạt Âm Hỏa Phá Địa Trận hòng chôn sống Lâm Tiêu trong hang động. Lâm Tiêu dùng bàn tính trận bàn hắc thị cải tạo trận nhãn, dẫn trọn địa mạch linh khí vào thân thể.',
          coreConflict: 'Trận pháp bạo tạc sụp đổ đe dọa chôn vùi toàn bộ sinh mệnh trong bí cảnh.',
          characterObjective: 'Chuyển hóa năng lượng hủy diệt của ngũ hành trận pháp thành tài nguyên đột phá.',
          foreshadowingAndClues: 'Phát hiện phù triện của Ma Uyên trà trộn trong vật tư của chấp pháp môn phái.',
          lootOrBreakthrough: 'Dung hợp trọn vẹn năm đạo ngũ hành linh mạch, chuẩn bị đúc thành Thiên Phẩm Đạo Cơ.',
          proseDraftSample: `Đất rung núi chuyển. Những tảng đá ngàn cân từ trần hang ầm ầm rơi xuống, khói bụi bốc lên mù mịt.

Ngọn lửa hắc ám của Âm Hỏa Trận bùng cháy dữ dội, thiêu đốt không khí đến ngột ngạt. Vương Bưu cùng lũ đệ tử chấp pháp đã khóa chặt cửa đá bên ngoài, cười vang trong tiếng đá sập: "Lâm Tiêu! Hưởng thụ tư vị bị lửa thiêu nung thành tro bụi đi!"

Bên trong hang động, Lâm Tiêu khoanh chân ngồi xếp bằng giữa tâm bão năng lượng. Nhiệt độ xung quanh có thể làm chảy sắt thép, nhưng quanh thân hắn lại bao bọc một quầng sáng màu xám tro tĩnh lặng tuyệt đối.

"Tiểu tử, cơ hội tới rồi!" Tiếng Kiếm Lão vang lên dồn dập: "Lũ ngu xuẩn đó dùng Ngũ Hành Trận để giết ngươi, nhưng chúng không biết Hỗn Độn vốn là mẹ đẻ của Ngũ Hành! Vận hành tầng thứ ba Kiếm Kinh, hút trọn địa mạch cho ta!"

Lâm Tiêu mở mắt. Hai con ngươi hắn biến thành hai vòng xoáy sâu thẳm.

Hắn giơ hai tay lên, một đạo kiếm chỉ vẽ ra một đồ hình âm dương hỗn độn giữa hư không. Toàn bộ ngọn lửa âm hỏa cuồng bạo và linh khí địa mạch bỗng nhiên như tìm thấy cửa biển, điên cuồng ùa vào huyệt đạo của Lâm Tiêu!`
        },
        {
          id: 'chap_kt_7',
          chapterNumber: 7,
          title: 'Chương 7: Băng Phách Gặp Gỡ, Trảm Ma Cứu Thánh Nữ',
          summary: 'Gặp gỡ Khương Tuyết Nhu đang bị ma thú vây hãm tại Thiên Trì cấm khu. Lâm Tiêu xuất kiếm tương trợ, hai người hợp lực phá hủy tế đàn ma tu bí mật.',
          coreConflict: 'Cuộc chạm trán giữa một tán kiếm tu áo vải và thiên chi kiêu nữ băng thanh ngọc khiết.',
          characterObjective: 'Hợp tác tiêu diệt Ma Tướng thủ hộ tế đàn và cứu chữa hàn độc cho Khương Tuyết Nhu.',
          foreshadowingAndClues: 'Khương Tuyết Nhu tiết lộ hôn ước gượng ép cùng Thái Nhất Môn và âm mưu của Thượng Giới.',
          lootOrBreakthrough: 'Nhận được nửa khối Băng Hồn Ngọc Tinh từ Khương Tuyết Nhu và sự tín nhiệm sâu sắc.',
          proseDraftSample: `Mặt hồ Thiên Trì phủ kín một lớp băng dày.

Một thiếu nữ áo lam đang quỳ trên băng tuyết, khóe môi rỉ máu đỏ tươi, quanh thân là sương lạnh trắng xóa chống đỡ trước vuốt quỷ của ba con Hắc Giáp Ma Viên. Dù bị thương nặng, phong thái thanh tao thoát tục của Khương Tuyết Nhu vẫn khiến người ta phải nín thở.

"Thánh Nữ Phiêu Miểu Cung... máu của ngươi chính là vật phẩm tế lễ ngon nhất cho Ma Tôn đại nhân!" Tiếng cười khàn đặc của tên ma tu áo choàng đen vang lên.

Một móng vuốt đen nhánh xé gió lao xuống đỉnh đầu Khương Tuyết Nhu!

Nàng khẽ nhắm mắt, bàn tay cầm kiếm run rẩy nhưng không hề cúi đầu.

"Xoẹt ——!"

Một đạo kiếm quang màu bạc xé toạc màn sương tuyết với tốc độ không tưởng. Móng vuốt ma thú chưa kịp chạm vào tóc thiếu nữ đã bị chém đứt lìa bay lên không trung, máu đen bắn tung tóe trên nền tuyết trắng.

Khương Tuyết Nhu bàng hoàng mở mắt.

Trước mặt nàng, một bóng lưng thiếu niên mặc áo thô phiêu dật chắn ngang giữa trời tuyết. Thanh kiếm sắt trong tay hắn khẽ rung lên róc rách giọt máu đen rơi xuống tuyết tan.

"Người của Phiêu Miểu Tiên Cung cũng chật vật thế này sao?" Lâm Tiêu quay đầu lại, đôi mắt thâm sâu nhìn nàng bình thản hỏi.`
        },
        {
          id: 'chap_kt_8',
          chapterNumber: 8,
          title: 'Chương 8: Đúc Thành Thiên Phẩm Đạo Cơ, Chém Đầu Gián Điệp',
          summary: 'Tại đỉnh Vạn Kiếm Sơn của cấm khu, Lâm Tiêu dẫn dắt linh khí ngũ hành đúc thành Thiên Phẩm Cửu Đài Sen Đạo Cơ độc nhất vô nhị. Trở về xuất quan, chém đầu kẻ phản bội trước sự kinh hoàng của chấp pháp đường.',
          coreConflict: 'Đột phá đạo cơ tối thượng phá vỡ quy luật ngàn năm của hạ giới.',
          characterObjective: 'Hoàn tất bước ngoặt từ phàm nhân Luyện Khí thành Trúc Cơ Đại Năng thực thụ.',
          foreshadowingAndClues: 'Dị tượng cửu đài sen chiếu rọi vạn dặm khiến các lão tổ Kim Đan kinh động.',
          lootOrBreakthrough: 'Đột phá Trúc Cơ Thiên Phẩm thành công, thăng cấp Đệ Tử Chân Truyền Vấn Kiếm Tông.',
          proseDraftSample: `Trên đỉnh Vạn Kiếm Sơn, mây ngũ sắc cuộn trào ngập trời.

Dưới sự chứng kiến của Khương Tuyết Nhu, khí hải đan điền của Lâm Tiêu bỗng nhiên bùng nổ kim quang vạn trượng. Một tòa đài sen chín tầng mang màu sắc hỗn độn xám bạc từ từ ngưng kết vững chãi giữa linh hải.

Đạo cơ thành hình!

Không phải Hạ Phẩm một tầng, không phải Trung Phẩm ba tầng, cũng chẳng phải Thượng Phẩm sáu tầng của các thiên tài thế gia... mà là Thiên Phẩm Cửu Luân Đạo Cơ chỉ xuất hiện trong thần thoại Thái Cổ!

"Ầm!"

Lâm Tiêu mở mắt. Uy áp Trúc Cơ bùng nổ quét ngang cả ngọn núi, hất văng sỏi đá.

Cùng lúc đó, Vương Bưu đang đứng chờ ngoài cửa cấm khu định vu oan cho Lâm Tiêu. Cửa bí cảnh mở toang, Lâm Tiêu bước ra với bước chân vững như bàn thạch. Không đợi Vương Bưu kịp mở miệng ngụy biện, kiếm quang lóe lên!

Một cái đầu lâu bay vút lên trời cao.

Lâm Tiêu thu kiếm vào vỏ, ánh mắt nhìn thẳng về phía đỉnh núi Chấp Pháp Viện nơi Vương Thiên Cừu đang ngự tọa:

"Chấp Pháp Đường... kẻ tiếp theo sẽ là ngươi!"`
        }
      ]
    },
    {
      id: 'vol_kt_3',
      volumeNumber: 3,
      title: 'Quyển 3: Vạn Kiếm Đỉnh • Bách Tông Luận Kiếm',
      summary: 'Giai đoạn Kim Đan Kỳ. Đại hội tỉ thí giữa 99 tông môn tại Vạn Kiếm Đỉnh. Nơi các mạch nhánh tình báo, thương hội và kiếm phách cùng hội tụ. Lâm Tiêu độc đấu thiên kiều, vạch trần chân tướng Cổ Kiếm Bia là trận nhãn hút sinh khí của Tiên Giới.',
      realmFocus: 'Kim Đan Kỳ (Cửu Phẩm Hỗn Độn Kim Đan)',
      mainFactionsClash: 'Lâm Tiêu vs Đệ Nhất Thiên Tài Thái Nhất Môn & Bí Mật Cổ Kiếm Bia',
      chapters: [
        {
          id: 'chap_kt_9',
          chapterNumber: 9,
          title: 'Chương 9: Vạn Kiếm Đỉnh Quy Tụ Cửu Đại Môn Phái',
          summary: 'Các đại thiên kiêu khắp ngũ châu tề tựu. Thế lực hắc thị của Lâm Tiêu âm thầm thao túng tỷ lệ cá cược và thông tin điểm yếu đối thủ.',
          coreConflict: 'Cuộc chiến tâm lý và sự chèn ép của các đại môn phái cổ xưa đối với kiếm tu bần hàn.',
          characterObjective: 'Dẫn dắt phân nhánh Vấn Kiếm Tông bước lên đấu trường lớn nhất Cửu Châu.',
          foreshadowingAndClues: 'Cổ Kiếm Bia tỏa ra huyết quang nhạt vào ban đêm, hút linh khí của các tu sĩ thất bại.',
          lootOrBreakthrough: 'Thu thập hồ sơ điểm yếu của mười đại thiên kiêu từ Thiên Nhĩ Lâu.',
          proseDraftSample: `Vạn Kiếm Đỉnh cắm thẳng vào tầng mây chín tầng trời.

Một thanh cự kiếm bằng đá hoa cương dài vạn trượng dựng đứng giữa quảng trường, xung quanh là chín mươi chín lôi đài trôi nổi giữa không trung bằng linh thạch phù trận. Cờ xí của các đại tông môn phần phật tung bay trong gió lốc.

"Đó chính là Lâm Tiêu của Vấn Kiếm Tông sao? Nghe nói hắn dùng Thiên Phẩm Đạo Cơ chém liền ba vị Trúc Cơ chấp sự?"

"Hừ, chỉ là một tên tán tu gặp may nhặt được tàn bí kíp. Đứng trước mặt Triệu Vô Cực của Thái Nhất Môn, hắn ngay cả một chiêu cũng không đỡ nổi!"

Những tiếng bàn tán xôn xao vang lên không ngớt.

Lâm Tiêu mặc thanh y giản dị, chắp tay đứng trên lôi đài số bảy. Bên cạnh hắn, Lý Tam Cửu đóng vai tùy tùng đang lén lút ghi chép sổ sách: "Lâm huynh đệ, tỷ lệ cược ngươi thua trận chung kết đã lên tới một ăn năm mươi. Toàn bộ tài sản của Thiên Nhĩ Lâu đã đặt cược vào ngươi!"

Lâm Tiêu khẽ nhếch môi: "Vậy thì chuẩn bị kho chứa linh thạch đi."`
        },
        {
          id: 'chap_kt_10',
          chapterNumber: 10,
          title: 'Chương 10: Độc Đấu Thiên Kiêu, Hỗn Độn Kiếm Ý Trấn Quần Hùng',
          summary: 'Trận bán kết với Kiếm Tử của Cửu Tiêu Kiếm Phái. Đối thủ dùng kiếm trận liên hoàn biến hóa khôn lường nhưng bị kiếm ý thuần phác của Lâm Tiêu bẻ gãy.',
          coreConflict: 'Va chạm nảy lửa giữa kiếm chiêu hoa mỹ truyền thừa ngàn năm và kiếm đạo thực chiến sinh tử.',
          characterObjective: 'Đánh bại Kiếm Tử mà không để lộ át chủ bài Hỗn Độn Kiếm Kinh.',
          foreshadowingAndClues: 'Kiếm Tử nhận ra kiếm ý của Lâm Tiêu có nét tương đồng với tổ sư khai sơn đã biến mất.',
          lootOrBreakthrough: 'Thấu hiểu tầng thứ tư của kiếm đạo: "Trọng Kiếm Vô Phong, Đại Xảo Bất Công".',
          proseDraftSample: `Trên lôi đài phù không, gió kiếm rít gào như sấm nổ.

Kiếm Tử Cửu Tiêu thân vận tử y thêu chín con rồng vàng, trên đầu lơ lửng chín thanh phi kiếm lưu ly sáng chói. Từng thanh kiếm đều là Linh Bảo Thượng Phẩm, tản ra uy áp xé toạc hư không!

"Lâm Tiêu, kiếm của ngươi không xứng để chạm vào Cửu Tiêu Phi Kiếm của ta!" Kiếm Tử quát lớn, kiếm chỉ vung lên: "Cửu Kiếm Liên Châu, Phá Thiên Diệt Địa!"

Chín đạo kiếm quang đan xen thành một mạng lưới tử lôi khổng lồ giáng xuống đầu Lâm Tiêu như trời sập.

Khán giả trên khán đài đồng loạt nín thở kêu lên kinh hãi.

Nhưng giữa cơn bão lôi kiếm rợp trời, Lâm Tiêu chỉ bước tới một bước. Hắn cầm thanh cổ kiếm rỉ sét, vung ra một nhát kiếm thẳng tắp đơn giản nhất của người mới học kiếm.

"Keng ——!"

Không có hoa mỹ, không có lôi quang rực rỡ. Chỉ có một tiếng ngân vang trầm đục như chuông đồng ngàn năm gõ vào đáy lòng.

Mạng lưới chín thanh phi kiếm lưu ly bỗng nhiên đông cứng giữa không trung, rồi đồng loạt gãy đôi rơi lả tả xuống sàn đấu!`
        },
        {
          id: 'chap_kt_11',
          chapterNumber: 11,
          title: 'Chương 11: Chung Kết Huyết Chiến, Bẻ Gãy Tiên Thiên Linh Bảo',
          summary: 'Trận chung kết định mệnh với Triệu Vô Cực của Thái Nhất Môn. Triệu Vô Cực lén sử dụng cấm khí Thượng Giới hòng tiêu diệt Lâm Tiêu, buộc Lâm Tiêu giải phóng Hỗn Độn Kiếm Vực.',
          coreConflict: 'Đối đầu trực diện với thế lực được Thượng Giới bí mật bảo trợ.',
          characterObjective: 'Đoạt quán quân Thiên Kiêu Bảng và bảo vệ danh dự của tu sĩ hạ giới.',
          foreshadowingAndClues: 'Cấm khí của Triệu Vô Cực để lộ ấn ký của Tiên Sứ Huyền Thần.',
          lootOrBreakthrough: 'Hấp thụ cấm khí, ngưng kết Cửu Phẩm Hỗn Độn Kim Đan ngay trên đỉnh lôi đài.',
          proseDraftSample: `Lôi đài trung tâm nứt toác từng mảng lớn dưới áp lực kinh hoàng.

Triệu Vô Cực mắt đỏ ngầu, khóe miệng chảy máu điên cuồng. Trong tay hắn xuất hiện một chiếc gương đồng cổ kính tỏa ra tiên quang rực rỡ nhưng mang theo tử khí nồng nặc — Tiên Thiên Linh Bảo Hạo Thiên Kính!

"Chết đi cho ta! Một con giun dế bần hàn như ngươi dám cướp vị trí đệ nhất của ta?" Triệu Vô Cực gầm lên, kích hoạt toàn bộ tiên quang bắn thẳng về phía Lâm Tiêu.

Ánh sáng đi qua đâu, hư không bị thiêu rụi thành lỗ đen đến đó.

"Lâm Tiêu, mau né đi!" Dưới khán đài, Khương Tuyết Nhu thất thanh kêu lên, bàn tay siết chặt đến bật máu.

Nhưng Lâm Tiêu không né. Hắn nhắm nghiền hai mắt.

"Oanh ——!"

Từ sâu trong đan điền, viên kim đan màu xám tro xoay tròn với tốc độ cực hạn. Một luồng kiếm vực hỗn độn vô hình lan tỏa ra trăm trượng, biến toàn bộ không gian xung quanh thành một vùng thái sơ tĩnh lặng.

Lâm Tiêu mở mắt, rút kiếm chém ra một đường kiếm thẳng:

"Hỗn Độn Khai Thiên!"

"Rắc!"

Chiếc gương đồng Thần Tiên vỡ vụn làm đôi giữa tiếng thét kinh hoàng của toàn thể trưởng lão Thái Nhất Môn!`
        },
        {
          id: 'chap_kt_12',
          chapterNumber: 12,
          title: 'Chương 12: Chân Tướng Cổ Kiếm Bia, Tuyên Chiến Cùng Tiên Giới',
          summary: 'Đoạt quán quân nhưng Lâm Tiêu phát hiện Cổ Kiếm Bia khắc tên thiên kiêu thực chất là trận pháp hút cạn thọ nguyên của tu sĩ để dâng lên Thượng Giới. Hắn công khai vung kiếm chém nứt tấm bia vàng, chính thức trở thành kẻ phản nghịch của thiên đạo giả tạo.',
          coreConflict: 'Sự thật tàn khốc về sự nô dịch của Thượng Giới bị phơi bày trước toàn thể tu sĩ Cửu Châu.',
          characterObjective: 'Phá hủy trận nhãn hút thọ nguyên và rút lui an toàn cùng đồng minh.',
          foreshadowingAndClues: 'Tiên Sứ Thượng Giới giáng phân thần cảnh cáo, phong ấn Ma Uyên bắt đầu rạn nứt.',
          lootOrBreakthrough: 'Thu được Thái Cổ Kiếm Tâm Tàn Phiến ẩn bên trong Cổ Kiếm Bia, uy chấn thiên hạ.',
          proseDraftSample: `Ánh hoàng hôn nhuộm đỏ đỉnh Vạn Kiếm.

Tất cả tu sĩ đang reo hò chúc mừng tân vương Thiên Kiêu Bảng, chuẩn bị chứng kiến Lâm Tiêu khắc tên mình lên Cổ Kiếm Bia ngàn năm vinh quang.

Lâm Tiêu bước từng bước lên đài tế. Hắn nhìn tấm bia vàng lấp lánh chữ cổ, đôi mắt bỗng nhiên rực sáng lên đồ hình hoa sen xám.

Dưới cái nhìn của Hỗn Độn Thần Nhãn, bên trong tấm bia vàng lộng lẫy kia không phải là phúc trạch thiên đạo... mà là hàng triệu sợi xích máu đang hút cạn sinh cơ của các thiên tài đời trước, dẫn thẳng lên cánh cổng Tinh Môn trên bầu trời!

"Ngươi còn chờ gì nữa? Khắc tên vào đi để hưởng tiên duyên!" Vị đại trưởng lão Thái Nhất Môn giục giã, trong mắt lóe lên vẻ quỷ quyệt.

Lâm Tiêu khẽ cười. Hắn giơ cao thanh Cổ Thiết Kiếm.

"Keng ——!"

Không phải khắc tên. Một kiếm kinh thiên động địa chém thẳng vào giữa Cổ Kiếm Bia!

Một vết nứt khổng lồ xé rách tấm bia vàng, máu đen tanh tưởi từ trong bia trào ra như suối trước sự kinh hoàng tột độ của hàng vạn người.

Lâm Tiêu đứng trên mảnh vỡ của tấm bia, kiếm chỉ thẳng lên bầu trời mây đen vần vũ:

"Lấy thiên kiêu hạ giới làm đỉnh lô chăn nuôi... Tiên Giới của các ngươi, hôm nay Lâm Tiêu ta chính thức tuyên chiến!"`
        }
      ]
    },
    {
      id: 'vol_kt_4',
      volumeNumber: 4,
      title: 'Quyển 4: Ma Uyên Phá Cấm • Hợp Lưu Cửu Châu Tiên Triều',
      summary: 'Giai đoạn Nguyên Anh Kỳ. Phong ấn U Minh Ma Uyên tan vỡ do Thượng Giới cố tình giải trừ nhằm tẩy sạch Cửu Châu. Lâm Tiêu bung ra toàn bộ kho vũ khí cơ quan, liên kết các chi nhánh đồng minh hắc thị và tiên triều thành lập Hạo Nhiên Tiên Minh, đột phá Nguyên Anh ngay giữa ma triều.',
      realmFocus: 'Nguyên Anh Kỳ (Hỗn Độn Kiếm Anh Xuất Thế)',
      mainFactionsClash: 'Hạo Nhiên Tiên Minh (Lâm Tiêu) vs Mười Vạn Ma Binh & Trưởng Lão Phản Đồ',
      chapters: [
        {
          id: 'chap_kt_13',
          chapterNumber: 13,
          title: 'Chương 13: Mười Vạn Ma Binh Phá Cấm, Tiền Tuyến Nguy Khốn',
          summary: 'Bầu trời Thanh Châu rách toạc, ma triều ngập trời nuốt chửng biên cương. Chư đại tông môn thế gia hèn nhát phong tỏa sơn môn bỏ mặc hàng triệu phàm nhân.',
          coreConflict: 'Sự ích kỷ thối nát của các môn phái truyền thống đối lập với tinh thần xả thân vì nhân đạo.',
          characterObjective: 'Lập phòng tuyến tại Nhạn Môn Quan ngăn chặn bước tiến của ma quân cứu vãn bách tính.',
          foreshadowingAndClues: 'Ma Quân mang theo quân kỳ có khắc gia huy của Vương gia và Thái Nhất Môn.',
          lootOrBreakthrough: 'Thu phục ba ngàn tán tu và lập nên đội ngũ Kiếm Vệ đầu tiên.',
          proseDraftSample: `Bầu trời phía tây Cửu Châu biến thành một màu đỏ thẫm như máu đặc.

Tiếng gầm rú man dại của hàng vạn con Dực Ma Thú xé rách màng nhĩ. Từng cột khói đen bốc lên từ các thành trì phàm nhân. Tại Vấn Kiếm Tông và Thái Nhất Môn, các đại hộ sơn trận đồng loạt đóng chặt, môn nhân co cụm trên núi cao khoanh tay đứng nhìn thảm cảnh bên dưới.

"Bọn họ... bỏ rơi chúng ta rồi..." Lão thành chủ Nhạn Môn Quan run rẩy nhìn đại quân ma tộc đen kịt như sóng thần tràn tới.

Đúng lúc tuyệt vọng nhất, trên không trung bỗng vang lên tiếng nỏ cơ quan rền vang như sấm sét!

Mười chiếc chiến thuyền cơ quan khổng lồ bọc thép của Thiên Nhĩ Lâu xé gió bay tới. Trên mũi thuyền đầu tiên, Lâm Tiêu đứng sừng sững trong gió bão, áo choàng phần phật tung bay:

"Các tông môn bỏ rơi các ngươi, nhưng Nhân Đạo Tiên Minh ta không bỏ rơi bất kỳ ai! Toàn quân rút kiếm, nghênh chiến!"`
        },
        {
          id: 'chap_kt_14',
          chapterNumber: 14,
          title: 'Chương 14: Mạng Lưới Thiên Nhĩ Xuất Trận, Nỏ Thần Phá Trận',
          summary: 'Lý Tam Cửu mở toàn bộ kho tàng vũ khí bí mật. Lâm Tiêu bố trí đại trận liên hoàn kết hợp phù lục và cơ quan, bắn hạ Thống Lĩnh Yêu Ma.',
          coreConflict: 'Cuộc chiến phòng thủ khốc liệt giữa công nghệ cơ quan phù trận và ma khí man rợ.',
          characterObjective: 'Bảo toàn phòng tuyến Nhạn Môn Quan chờ thời cơ phản công.',
          foreshadowingAndClues: 'Phát hiện ma quân bị một loại ký sinh trùng khống chế từ Thượng Giới.',
          lootOrBreakthrough: 'Thu hoạch mười vạn ma hạch để luyện hóa tinh hoa sát khí.',
          proseDraftSample: `Tiếng nỏ thần liên châu bắn ra như mưa rào ánh sáng.

Hàng vạn mũi tiễn nỏ mang theo Lôi Hỏa Phù cắm phập vào đội hình tiền phong ma quân, nổ tung thành những quả cầu lửa khổng lồ soi sáng màn đêm tăm tối. Lý Tam Cửu đứng trên tháp quan sát, tay cầm cờ lệnh vung lia lịa:

"Tiểu tử mau nạp lôi đan! Đừng tiếc của, hôm nay bắn nát lũ ma súc sinh này cho lão tử!"

Giữa trận địa hỗn loạn, Lâm Tiêu như một bóng ma lướt đi giữa bầy ma vật. Mỗi nhát kiếm vung ra đều mang theo kiếm ý hỗn độn tinh thuần, chém đứt đầu các tướng lĩnh ma quân trong chớp mắt. Uy danh của hắn truyền khắp tiền tuyến, biến Nhạn Môn Quan thành bức tường thành bất khả xâm phạm.`
        },
        {
          id: 'chap_kt_15',
          chapterNumber: 15,
          title: 'Chương 15: Đột Phá Nguyên Anh Ngay Giữa Ma Bão',
          summary: 'Bị ba vị Ma Tôn Nguyên Anh vây hãm tại trung tâm ma triều. Lâm Tiêu mượn sát khí ngập trời để tôi luyện thần hồn, ngưng tụ Hỗn Độn Kiếm Anh, nhất kiếm trảm tam tôn.',
          coreConflict: 'Vượt qua lôi kiếp Nguyên Anh ngay trong vòng vây của kẻ thù hùng mạnh.',
          characterObjective: 'Dung hợp kiếm ý và ma sát thành kiếm anh hoàn mỹ, lật ngược hoàn toàn cục diện chiến tranh.',
          foreshadowingAndClues: 'Cổ Kiếm Lão thức tỉnh hoàn toàn ý thức, chỉ điểm Lâm Tiêu phong ấn gốc Ma Uyên.',
          lootOrBreakthrough: 'Đột phá Nguyên Anh Sơ Kỳ, thức tỉnh thần thông "Nguyên Anh Phân Kiếm Thuật".',
          proseDraftSample: `Sấm sét màu tím đen giáng xuống như mưa rào từ chín tầng mây.

Lâm Tiêu đứng giữa vòng vây của ba vị Ma Tôn cao ngút trời. Cả ba kẻ đều có thực lực Nguyên Anh trung kỳ, ma khí cuồn cuộn làm biến dạng cả không gian.

"Tiểu tử, ngươi định độ kiếp ngay trước mặt chúng ta sao? Thật là tự tìm đường chết!" Một gã Ma Tôn cười gằn, vung trảo quỷ chém xuống.

"Tự tìm đường chết là các ngươi."

Lâm Tiêu khẽ ngẩng đầu. Kim đan trong đan điền hắn rạn nứt thành từng mảnh nhỏ, giải phóng một nguồn năng lượng hỗn độn vô biên.

"Ầm!"

Một đứa trẻ bằng kiếm quang thuần khiết từ đỉnh đầu Lâm Tiêu bay vút lên trời. Kiếm Anh mở mắt, hai tay nắm lấy hai thanh kiếm lôi kiếp, quét ngang một vòng:

"Vạn Kiếm Triều Tông!"

Một đạo kiếm triều xé toạc bầu trời ma vụ. Cả ba vị Ma Tôn đồng loạt cứng đờ giữa không trung, rồi nổ tung thành tro bụi trước ánh mắt bàng hoàng của mười vạn đại quân!`
        },
        {
          id: 'chap_kt_16',
          chapterNumber: 16,
          title: 'Chương 16: Thống Nhất Cửu Châu, Lập Hạo Nhiên Tiên Minh',
          summary: 'Sau chiến thắng ma triều, Lâm Tiêu dẫn đại quân tiến vào giải tán các môn phái hèn nhát, bắt các thế gia giao nộp kho tài nguyên, chính thức thành lập Hạo Nhiên Tiên Minh chuẩn bị phạt thiên.',
          coreConflict: 'Cải cách triệt để trật tự tu chân mục nát của Cửu Châu.',
          characterObjective: 'Tập hợp toàn bộ lực lượng tinh hoa của nhân gian chuẩn bị cho trận chiến chung cực.',
          foreshadowingAndClues: 'Khương Tuyết Nhu mang theo toàn bộ Phiêu Miểu Tiên Cung gia nhập Tiên Minh.',
          lootOrBreakthrough: 'Được tôn xưng là Hạo Nhiên Kiếm Tôn, thống lĩnh trăm vạn tu sĩ nhân đạo.',
          proseDraftSample: `Trên đỉnh Linh Sơn Vấn Kiếm Tông, cờ hiệu của Tiên Minh phấp phới tung bay.

Vương Thiên Cừu cùng các trưởng lão thế gia quỳ rạp dưới thềm đá, sắc mặt xám như tro tàn. Trước mặt bọn họ, Lâm Tiêu ngồi trên ghế minh chủ, bên cạnh là Khương Tuyết Nhu thanh tú thoát tục và Lý Tam Cửu tươi cười rạng rỡ.

"Vương Thiên Cừu, ngươi cấu kết cùng Ma Uyên, hãm hại đồng môn, ăn bớt quân lương... Hôm nay trước mặt toàn thể tu sĩ Cửu Châu, ngươi còn lời gì để nói?" Lâm Tiêu lạnh nhạt hỏi.

"Minh chủ tha mạng... lão phu chỉ là bị Thượng Giới bức bách..."

"Bị bức bách không phải lý do để ngươi biến bách tính thành sâu bọ."

Lâm Tiêu khẽ phất tay áo. Một đạo kiếm khí lướt qua phế bỏ hoàn toàn tu vi của Vương Thiên Cừu, ném vào hầm mỏ sám hối. Lâm Tiêu đứng dậy, nhìn xuống trăm vạn đệ tử bên dưới:

"Từ nay về sau, Cửu Châu không còn tông môn phân biệt, chỉ có Nhân Đạo Tiên Minh! Mục tiêu tiếp theo của chúng ta: Bắn sập Tinh Môn!"`
        }
      ]
    },
    {
      id: 'vol_kt_5',
      volumeNumber: 5,
      title: 'Quyển 5: Tinh Môn Khai Mở • Thí Thần Nghịch Thiên',
      summary: 'Giai đoạn Hóa Thần Kỳ & Phi Thăng Chung Cực. Tiên Sứ Thượng Giới giáng Tinh Môn Cổ Trận bắt hạ giới giao nộp trăm vạn đỉnh lô. Lâm Tiêu dẫn dắt toàn thể nhân gian phạt thiên, quyết chiến với Tiên Sứ Huyền Thần, một kiếm chém rách xiềng xích nô dịch vạn cổ mở ra kỷ nguyên bình đẳng.',
      realmFocus: 'Hóa Thần Kỳ Đỉnh Phong -> Hỗn Độn Kiếm Tiên',
      mainFactionsClash: 'Hạo Nhiên Tiên Minh vs Hạo Thiên Tiên Đình & Tiên Sứ Huyền Thần',
      chapters: [
        {
          id: 'chap_kt_17',
          chapterNumber: 17,
          title: 'Chương 17: Tinh Môn Chiếu Chỉ, Bắt Trăm Vạn Nô Lệ',
          summary: 'Cánh cổng Tinh Môn khổng lồ mở ra giữa bầu trời Cửu Châu. Tiên Sứ Huyền Thần giáng chiếu chỉ bắt Cửu Châu dâng nộp trăm vạn đồng nam đồng nữ làm đỉnh lô luyện đan trường sinh.',
          coreConflict: 'Áp bức tuyệt đối của Thượng Giới đối với sự phản kháng của nhân gian.',
          characterObjective: 'Công khai xé rách thánh chỉ Tiên Giới, khơi dậy ý chí quật khởi của toàn thể nhân loại.',
          foreshadowingAndClues: 'Cổ Kiếm Lão nhận ra Huyền Thần chính là kẻ đã phản bội đâm lén mình mười vạn năm trước.',
          lootOrBreakthrough: 'Thức tỉnh trọn vẹn Hỗn Độn Kiếm Cốt, chuẩn bị bước vào Hóa Thần Cực Cảnh.',
          proseDraftSample: `Cánh cổng Tinh Môn rộng vạn dặm như một vết rách khổng lồ trên bầu trời.

Ánh sáng vàng rực rỡ nhưng lạnh lẽo chiếu rọi khắp non sông. Tiên Sứ Huyền Thần đứng trên cỗ xe rồng chín đầu lơ lửng giữa tầng mây, giọng nói vang dội như sấm sét:

"Lũ sâu bọ hạ giới nghe chiếu! Trong vòng ba ngày, giao nộp trăm vạn đồng nam đồng nữ có linh căn làm đỉnh lô dâng lên Tiên Đình, bằng không ta sẽ giáng thiên lôi diệt thế, biến Cửu Châu thành bình địa!"

Hàng triệu người run rẩy quỳ sụp dưới đất trong nỗi kinh hoàng vô tận.

Đúng lúc đó, một đạo bạch y bay vút lên trời cao, đạp trên ngọn gió kiếm nghênh đón tiên uy.

Lâm Tiêu đưa tay chụp lấy cuộn thánh chỉ bằng vàng trôi nổi giữa không trung, dùng hai tay xé rách làm đôi trước mặt Tiên Sứ!

"Hạ giới không phải chuồng nuôi của các ngươi! Muốn nô lệ? Hãy hỏi thanh kiếm trong tay ta trước!"`
        },
        {
          id: 'chap_kt_18',
          chapterNumber: 18,
          title: 'Chương 18: Đại Pháo Cơ Quan Nhắm Thẳng Tiên Môn',
          summary: 'Liên minh phàm nhân và tu sĩ đưa một ngàn cỗ Thần Nỏ và Trận Pháo lên đỉnh núi cao, đồng loạt nổ súng bắn phá cánh cổng Tinh Môn, làm rung chuyển Tiên Giới.',
          coreConflict: 'Sức mạnh tập thể của nhân loại đoàn kết đối chọi với uy quyền cá nhân của thần tiên.',
          characterObjective: 'Bắn hạ cỗ xe rồng và phá vỡ kết giới bảo vệ của Tiên Sứ.',
          foreshadowingAndClues: 'Khương Tuyết Nhu dẫn đầu trận pháp Băng Phách đóng băng đường rút lui của tiên quân.',
          lootOrBreakthrough: 'Đánh tan đội tiên vệ đầu tiên, đoạt lấy mười cỗ Tiên Giáp Thượng Giới.',
          proseDraftSample: `Khói thuốc súng và linh quang ngũ sắc che kín mặt trời.

"Bắn ——!"

Tiếng hô vang dội của Lâm Tiêu vừa dứt, một ngàn cỗ Trận Pháo Cơ Quan đồng loạt gầm thét. Hàng ngàn cột sáng hủy diệt bắn thẳng lên bầu trời, xé toạc đội hình tiên quân Thượng Giới. Những con rồng kéo xe gầm rống đau đớn rơi rụng từ trên mây.

Tiên Sứ Huyền Thần lần đầu tiên biến sắc mặt: "Lũ sâu bọ này... làm sao có thể tạo ra loại binh khí này?"

"Ngươi gọi chúng ta là sâu bọ, vậy hôm nay hãy xem sâu bọ cắn chết thần tiên thế nào!"

Lâm Tiêu cùng Khương Tuyết Nhu dẫn đầu hàng vạn kiếm tu đạp mây xông thẳng vào cánh cổng Tinh Môn!`
        },
        {
          id: 'chap_kt_19',
          chapterNumber: 19,
          title: 'Chương 19: Kiếm Hồn Hợp Thể, Trảm Sát Huyền Thần',
          summary: 'Trận quyết chiến sinh tử trên Tinh Môn. Huyền Thần thi triển cấm thuật Tiên Đạo biến thành Cự Thần ngàn trượng. Cổ Kiếm Lão hy sinh tàn hồn dung hợp vào thanh kiếm của Lâm Tiêu để tung đòn trừng phạt phản đồ.',
          coreConflict: 'Trận chiến ân oán kéo dài mười vạn năm giữa hai thế hệ kiếm tu và kẻ phản bội.',
          characterObjective: 'Chém chết Tiên Sứ Huyền Thần và cứu lấy linh hồn sư phụ.',
          foreshadowingAndClues: 'Kiếm Lão để lại tâm nguyện cuối cùng: "Hãy mở ra con đường mà ai cũng có thể tự do tu tiên".',
          lootOrBreakthrough: 'Đột phá Hóa Thần Viên Mãn, hấp thu trọn vẹn Tiên Lực Thượng Cổ.',
          proseDraftSample: `Hư không Tinh Môn nứt vỡ từng mảng lớn như thủy tinh vỡ.

Tiên Sứ Huyền Thần biến thành một pho tượng thần khổng lồ bằng vàng rực rỡ, bàn tay to như ngọn núi đập xuống đầu Lâm Tiêu: "Chết đi! Dưới chân Tiên Đạo, hết thảy đều là hư vô!"

"Lâm Tiêu, nhận lấy truyền thừa cuối cùng của ta!"

Bóng hình Kiếm Lão từ Hỗn Độn Tàn Ngọc bay vút ra, mỉm cười thanh thản rồi hóa thành một luồng ánh sáng chói lọi hòa quyện vào thanh Cổ Thiết Kiếm trong tay Lâm Tiêu.

Thanh kiếm sắt gỉ sét bỗng nhiên bong tróc toàn bộ lớp vỏ cũ kỹ, để lộ thân kiếm sáng lấp lánh như ngàn vạn vì sao!

"Sư phụ..." Lâm Tiêu rơi một giọt lệ, nhưng ánh mắt kiên định hơn bao giờ hết.

Hắn vung kiếm chém lên:

"Thái Sơ Nhất Kiếm • Trảm Thần!"

Một đạo kiếm quang dài vạn dặm xé toạc vũ trụ, chém đứt lìa cánh tay vàng của Cự Thần, đâm thẳng vào tim Tiên Sứ Huyền Thần giữa tiếng thét kinh hoàng muôn trượng!`
        },
        {
          id: 'chap_kt_20',
          chapterNumber: 20,
          title: 'Chương 20: Vạn Cổ Nhất Kiếm, Mở Ra Kỷ Nguyên Bình Đẳng',
          summary: 'Đánh sập hoàn toàn cánh cổng Tinh Môn nô dịch, giải phóng linh khí thượng giới đổ xuống nhân gian. Lâm Tiêu cùng Khương Tuyết Nhu đứng trên đỉnh mây, thiết lập trật tự mới cho Cửu Châu vạn cổ trường tồn.',
          coreConflict: 'Tái thiết trật tự thế giới sau khi chế độ thần quyền sụp đổ.',
          characterObjective: 'Khóa chặt vĩnh viễn con đường bóc lột của Thượng Giới, mở ra thời đại tự do cho muôn loài.',
          foreshadowingAndClues: 'Tàn ngọc biến thành một hạt giống thế giới mới nảy mầm trong tim Lâm Tiêu.',
          lootOrBreakthrough: 'Thành tựu Hỗn Độn Kiếm Tôn Vạn Cổ, danh xưng lưu truyền muôn đời.',
          proseDraftSample: `Ánh bình minh vàng rực rỡ lần đầu tiên sau mười vạn năm chiếu rọi khắp chín châu sơn hà.

Cánh cổng Tinh Môn xiềng xích đã tan thành mây khói, linh khí thuần khiết của vũ trụ như dòng thác đổ xuống tắm mát muôn cây nội cỏ nhân gian. Những vết thương chiến tranh dần khép lại dưới nụ cười rạng rỡ của muôn dân.

Trên đỉnh Đoạn Hồn Sơn — nơi cuộc hành trình bắt đầu từ đêm mưa năm ấy — Lâm Tiêu đứng tựa kiếm trong gió lộng.

Khương Tuyết Nhu nhẹ nhàng bước tới bên cạnh, bàn tay mềm mại khẽ nắm lấy tay hắn: "Lâm Tiêu, chàng đã làm được rồi. Từ nay về sau, nhân gian không còn ai phải làm nô lệ nữa."

Lâm Tiêu mỉm cười, nhìn về phía chân trời vô tận nơi ánh dương đang bừng sáng:

"Kiếm đạo của ta sinh ra từ bùn đất, cuối cùng cũng đã trả lại tự do cho đất trời."

Một thanh kiếm cắm giữa trời đất, vạn cổ thái bình!`
        }
      ]
    }
  ],
  subStoryTrajectories: [
    {
      title: 'Mạch Nhánh Hắc Thị & Cơ Quan Đan Dược (Lý Tam Cửu)',
      type: 'Kinh Tế & Tình Báo',
      hook: 'Lâm Tiêu lén cung cấp da mãng và công thức cổ để Lý Tam Cửu xây dựng thương hội ngầm cạnh tranh với thế gia.',
      convergencePoint: 'Quyển 4 (Chương 14): Đem toàn bộ hạm đội cơ quan và nỏ thần chi viện cho Nhạn Môn Quan.'
    },
    {
      title: 'Mạch Nhánh Băng Phách Tiên Duyên (Khương Tuyết Nhu)',
      type: 'Tình Cảm & Đồng Minh',
      hook: 'Cứu Thánh Nữ tại Thiên Trì, phát hiện bí mật hôn ước đỉnh lô của Thái Nhất Môn.',
      convergencePoint: 'Quyển 3 (Chương 11) & Quyển 5: Phiêu Miểu Cung đứng về phía Lâm Tiêu lật đổ Thượng Giới.'
    },
    {
      title: 'Mạch Nhánh Phản Đồ Vương Gia (Vương Thiên Cừu)',
      type: 'Thù Hận & Đấu Trí',
      hook: 'Manh mối gián điệp và âm mưu cướp bóc đan dược tại ngoại môn dẫn tới vụ ám sát phụ thân năm xưa.',
      convergencePoint: 'Quyển 4 (Chương 16): Lâm Tiêu thanh trừng toàn bộ phe cánh Vương gia trước thềm phạt thiên.'
    }
  ]
};

export const PRESET_MASTER_NOVEL_CONFIG: NovelConfig = {
  genre: 'Tiên Hiệp Cổ Phong',
  tone: 'Hùng tráng bi tráng, huyền bí sâu sắc, đấu trí nghẹt thở, nhiệt huyết nghịch thiên',
  pov: 'Ngôi thứ ba (Toàn tri có giới hạn, theo sát góc nhìn Lâm Tiêu)',
  setting: 'Cửu Châu Thần Vực, thời đại Ma Uyên sắp phá cấm và Cửu Đại Thánh Địa ngấm ngầm cấu kết cùng Thượng Giới Tiên Tộc',
  mainCharacter: 'Lâm Tiêu - Đệ tử ngoại môn Vấn Kiếm Tông, mang Hỗn Độn Tàn Ngọc và Đạo Tâm Bất Diệt',
  plotIdea: 'Một thiếu niên ngoại môn bị thế gia hãm hại cướp đoạt ngọc bội gia truyền, trong lúc hấp hối nơi vách đá đã thức tỉnh Hỗn Độn Tàn Ngọc thời Thái Cổ. Không cam lòng làm con cờ cho tông môn bảo thủ, hắn vừa tu kiếm ý thuần khiết, vừa ngấm ngầm kết giao cùng tán tu hắc thị, khai quật long mạch cổ xưa. Từng bước biến các mạch nhánh rời rạc thành mạng lưới nhân quả khổng lồ, lật đổ âm mưu nuốt chửng thế giới của Thượng Giới Tiên Sứ và mở ra kỷ nguyên bình đẳng cho nhân đạo vạn cổ.',
  worldRules: 'Hệ thống tu chân chuẩn mực 8 tầng: Luyện Khí (1-9 tầng), Trúc Cơ (Sơ-Hậu), Kim Đan (Cửu Phẩm), Nguyên Anh, Hóa Thần, Luyện Hư, Hợp Thể, Đại Thừa Chân Tiên. Kết hợp chặt chẽ cùng Đan Đạo, Phù Lục, Trận Pháp và Binh Khí Cơ Quan.'
};

export const PRESET_MASTER_NOVEL_TREE: NovelNode = {
  id: 'node_root_van_co_kiem_ton',
  type: NodeType.NOVEL,
  title: 'VẠN CỔ HỖN ĐỘN KIẾM TÔN',
  summary: 'Bộ thiên tiểu thuyết Tiên Hiệp Cổ Phong kinh điển 5 quyển 20 chương chi tiết về cuộc đời nghịch thiên của Lâm Tiêu từ đệ tử ngoại môn bần hàn đến Chúa Tể Vạn Giới.',
  content: '',
  isExpanded: true,
  children: KIEM_TON_DETAILED_DOSSIER.volumes.map(vol => ({
    id: vol.id,
    type: NodeType.PART,
    title: vol.title,
    summary: vol.summary,
    content: '',
    isExpanded: true,
    children: vol.chapters.map(chap => ({
      id: chap.id,
      type: NodeType.CHAPTER,
      title: chap.title,
      summary: chap.summary,
      content: chap.proseDraftSample,
      children: []
    }))
  }))
};


// =========================================================================
// BỘ CỐT TRUYỆN 2: CỬU U MA TÔN: VẠN CỔ HUYẾT THỆ
// (Ma Đạo Hắc Ám • Sát Phạt Quả Đoán • Trùng Sinh Trảm Ngụy Quân Tử)
// =========================================================================

export const MA_TON_CHARACTERS: CharacterProfile[] = [
  {
    id: 'char_da_cuu_u_master',
    name: 'Dạ Cửu U',
    pinyinOrAlias: 'Cửu U Ma Hoàng / Huyết Ngục Chi Chủ',
    role: 'Chính diện',
    gender: 'Nam',
    age: 'Kiếp trước mười vạn tuổi -> Trùng sinh thân xác thiếu niên 17 tuổi',
    realmOrRank: 'Thối Cốt Nô Lệ (Khởi đầu) -> Thái Cổ Thôn Thiên Ma Thần (Chung cuộc)',
    sectOrFaction: 'Hắc Thiết Quặng Mỏ -> Bắc Hải Ma Minh -> Cửu U Ma Đình',
    factionPosition: 'Phu mỏ đào quặng -> Ma Đạo Tối Cao Chí Tôn',
    spiritualRoots: 'Cửu U Thôn Thiên Căn (Hắc Ám • Huyết Ma • Lôi Sát)',
    spiritualRootDetail: {
      countCategory: 'Dị Linh Căn (Biến Dị Lôi - Băng - Phong - Ám - Quang)',
      grade: 'Thần Cấp Hỗn Độn Tổ Căn (Nghịch Thiên Hỗn Độn)',
      rootName: 'Thái Cổ Cửu U Thôn Thiên Ma Căn',
      elements: [
        { element: 'Ám', purity: 100, color: '#18181b', description: 'Bóng tối vĩnh hằng thôn phệ vạn vật' },
        { element: 'Huyết', purity: 99, color: '#dc2626', description: 'Luyện huyết quy nguyên, bất tử bất diệt' }
      ],
      cultivationSpeedMultiplier: 'x15 lần khi tắm mình trong huyết sát chiến trường'
    },
    mentalAttributes: {
      soulRealm: 'Chân Linh Thái Cổ / Tiên Hồn Cực Cảnh',
      soulPowerPoints: 9999,
      perceptionRange: '50 dặm',
      daoHeartType: 'Vạn Kiếp Ma Tâm / Sát Lục Lập Đạo',
      daoHeartStability: 100,
      comprehensionTier: 'Độc Đoán Vạn Cổ',
      comprehensionScore: 100,
      innerDemonResistance: 100
    },
    personality: 'Lãnh khốc vô tình với kẻ thù, sát phạt dứt khoát, đa mưu túc trí. Căm ghét thói đạo đức giả của môn phái chính phái. Tuy là ma tu nhưng giữ lời hứa son sắt với những kẻ chân thành phục vụ mình.',
    appearance: 'Thân hình cao gầy, tóc đen dài bay trong gió lạnh, đồng tử màu huyết sắc sâu thẳm như hố đen. Quanh thân thoang thoảng mùi hoa bỉ ngạn và sương máu lạnh lẽo.',
    weaponOrAbility: 'Cửu U Huyết Ngục Bàn & Thí Thần Ma Đao',
    destinyFate: 'Hắc Kim Sắc Cực Phẩm (Nghịch Thiên Ma Khí Vận)',
    backstory: 'Tuyệt đại Ma Hoàng từng thống trị Cửu U, bị đại đồ đệ Ma La Cừu liên thủ cùng bảy vị Ngụy Quân Tử của Thái Nhất Thánh Địa đầu độc ám hại. Tàn hồn nhập vào thân xác một thiếu niên nô lệ bị đánh chết trong hầm mỏ Hắc Thiết Lĩnh.'
  },
  {
    id: 'char_luc_man_dinh',
    name: 'Lục Mạn Đình',
    pinyinOrAlias: 'Xích Luyện Ma Nữ / Mạn Đình Thánh Nữ',
    role: 'Chính diện',
    gender: 'Nữ',
    age: '20 tuổi',
    realmOrRank: 'Ngưng Sát Kỳ (Trúc Cơ) -> Huyết Ma Đan',
    sectOrFaction: 'Vô Tâm Ma Các',
    factionPosition: 'Các Chủ Đích Nữ',
    spiritualRoots: 'Cửu Âm Tuyệt Mạch (Dị biến Huyết Lân)',
    personality: 'Thông minh giảo hoạt, kiêu sa quyến rũ nhưng tàn nhẫn với kẻ đắc tội. Sẵn sàng hy sinh tất cả để trả thù cho gia tộc bị chính phái đồ sát.',
    appearance: 'Mặc hồng y bó sát tôn lên đường cong tuyệt mỹ, cổ đeo vòng bạc khắc ma văn, tay cầm roi da gai xương Bạch Cốt Biên.',
    weaponOrAbility: 'Bạch Cốt Nhiếp Hồn Biên & Cửu Âm Hóa Cốt Quyết',
    destinyFate: 'Huyết Hồng Sắc Đỉnh Phong',
    backstory: 'Gia tộc nàng bị Thái Nhất Môn lấy danh nghĩa diệt ma để tàn sát cướp đoạt mỏ linh thạch. Trốn ra Bắc Hải tìm kiếm cơ hội báo thù, tình cờ gặp gỡ và quy phục Dạ Cửu U.'
  },
  {
    id: 'char_ma_la_cuu',
    name: 'Ma La Cừu',
    pinyinOrAlias: 'Đồ Sư Ma Tôn / Ngụy Ma Hoàng',
    role: 'Phản diện',
    gender: 'Nam',
    age: 'Hơn tám ngàn tuổi',
    realmOrRank: 'Vạn Kiếp Ma Anh Đỉnh Phong (Nguyên Anh Đỉnh Phong)',
    sectOrFaction: 'Tân Cửu U Ma Điện',
    factionPosition: 'Kẻ Thoán Đoạt Ngai Vàng Ma Hoàng',
    spiritualRoots: 'U Minh Hóa Hồn Căn',
    personality: 'Tham lam vô độ, nham hiểm xảo quyệt, phản bội sư phụ vì muốn chiếm đoạt Cửu U Huyết Ngục Bàn.',
    appearance: 'Ngồi trên ngai vàng đầu lâu, mặc ma giáp vảy rồng đen óng, gương mặt tuấn tú nhưng tà khí ngút trời.',
    weaponOrAbility: 'Phệ Hồn Ma Thương & Vạn Cốt Huyết Hải Trận',
    destinyFate: 'Hắc Sắc Sa Hóa',
    backstory: 'Đại đệ tử từng được Dạ Cửu U dốc lòng truyền thụ công pháp. Bị Thái Hư Thượng Nhân mua chuộc, hạ độc Cửu U Đoạn Hồn Tán vào rượu mừng của sư phụ.'
  },
  {
    id: 'char_thai_hu_thuong_nhan',
    name: 'Thái Hư Thượng Nhân',
    pinyinOrAlias: 'Thái Nhất Thánh Chủ / Đại Đức Chân Quân',
    role: 'Phản diện',
    gender: 'Nam',
    age: 'Hơn năm ngàn tuổi',
    realmOrRank: 'Chuẩn Tiên / Hóa Thần Viên Mãn',
    sectOrFaction: 'Thái Nhất Thánh Địa',
    factionPosition: 'Thánh Chủ Chí Cao',
    spiritualRoots: 'Hạo Nhiên Thuần Dương Căn (Đạo đức giả ngụy trang)',
    personality: 'Đầu sỏ ngụy quân tử điển hình, miệng tụng kinh từ bi cứu thế nhưng sau lưng biến hàng vạn phàm nhân thành phu mỏ đào bới tài nguyên dâng lên Thượng Giới.',
    appearance: 'Râu tóc bạc phơ, mặc đạo bào tiên hạc trắng muốt, cầm phất trần bạch ngọc, toàn thân phát ra ánh sáng thánh thiện chói lòa.',
    weaponOrAbility: 'Thái Hư Hỗn Nguyên Chung & Đại Đạo Tẩy Não Quyết',
    destinyFate: 'Kim Cương Ngụy Thiện',
    backstory: 'Kẻ lên kế hoạch liên thủ ám toán Dạ Cửu U vạn năm trước nhằm cướp đoạt mỏ linh thạch Cửu U, đồng thời biến vùng đất ma đạo thành trại lao dịch bí mật.'
  },
  {
    id: 'char_trieu_buu',
    name: 'Triệu Bưu (Chấp Sự Mỏ)',
    pinyinOrAlias: 'Bạo Hổ Chấp Sự / Roi Sắt Đồ Tể',
    role: 'Phản diện',
    gender: 'Nam',
    age: '42 tuổi',
    realmOrRank: 'Luyện Huyết Tầng 6 (Luyện Khí Trung Kỳ)',
    sectOrFaction: 'Hắc Thiết Quặng Mỏ Chấp Pháp Đội',
    factionPosition: 'Đội Trưởng Giám Sát Phu Mỏ',
    spiritualRoots: 'Thổ Thiết Tạp Căn',
    personality: 'Hung bạo tàn nhẫn, thích hành hạ đánh đập nô lệ để tìm kiếm khoái cảm quyền lực.',
    appearance: 'Thân hình lực lưỡng béo múp, mặt đầy sẹo ngang dọc, tay luôn lăm lăm ngọn roi sắt nạm gai dính máu.',
    weaponOrAbility: 'Thiết Gai Huyết Biên & Man Ngưu Phá Cốt Quyền',
    destinyFate: 'Xám Tro Tàn Liệt',
    backstory: 'Kẻ trực tiếp quất roi đánh chết thân xác thiếu niên nô lệ trước khi Dạ Cửu U trùng sinh nhập vào.'
  },
  {
    id: 'char_moc_lao_dau',
    name: 'Mộc Lão Đầu',
    pinyinOrAlias: 'Quỷ Phủ Thần Tượng / Thiết Cốt Tán Nhân',
    role: 'Đồng minh',
    gender: 'Nam',
    age: '85 tuổi (Ẩn thế)',
    realmOrRank: 'Trúc Cơ Kỳ (Đan điền bị phế một nửa)',
    sectOrFaction: 'Ẩn Tu Phu Mỏ Hắc Thiết',
    factionPosition: 'Lão Thợ Đúc Quặng / Sư Phụ Kỹ Thuật Binh Khí',
    spiritualRoots: 'Địa Hỏa Canh Kim Song Căn',
    personality: 'Lầm lì ít nói, chịu đựng nhục nhã suốt ba mươi năm trong mỏ đá để chờ thời cơ trả thù môn phái chính đạo.',
    appearance: 'Lưng còng rạp xuống, hai mắt bị mù một bên, bàn tay khô quắt sần sùi với các vết bỏng rèn sắt chằng chịt.',
    weaponOrAbility: 'Hắc Thiết Luyện Binh Thuật & Tàng Phong Trận',
    destinyFate: 'Thiết Huyết Hộ Pháp',
    backstory: 'Từng là đại tông sư rèn binh của một danh môn bị Thái Nhất Thánh Địa tiêu diệt cướp bản vẽ thần binh, bị chặt gãy kinh mạch giam vào hầm mỏ.'
  },
  {
    id: 'char_tieu_lanh_suong',
    name: 'Tiêu Lãnh Sương',
    pinyinOrAlias: 'Thanh Phong Kiếm Tiên / Kiếm Viện Chân Truyền',
    role: 'Kỳ phùng địch thủ / Chuyển hóa đồng minh',
    gender: 'Nữ',
    age: '22 tuổi',
    realmOrRank: 'Kim Đan Sơ Kỳ (Chính Đạo Kiếm Tu)',
    sectOrFaction: 'Thái Nhất Thánh Địa Kiếm Các',
    factionPosition: 'Chân Truyền Đệ Tử Kiếm Các',
    spiritualRoots: 'Thanh Phong Canh Kim Kiếm Căn',
    personality: 'Chính trực kiên định, tin tưởng mù quáng vào công lý của tông môn cho đến khi tận mắt chứng kiến trại tập trung nô lệ của Thánh Chủ.',
    appearance: 'Bạch y thanh lãnh, lưng mang song kiếm Thanh Phong, ánh mắt trong veo nghiêm nghị không gợn chút bụi trần.',
    weaponOrAbility: 'Song Kiếm Thanh Phong Minh Nguyệt & Thái Nhất Kiếm Điển',
    destinyFate: 'Tử Sắc Kiếm Tiên',
    backstory: 'Được phái đến áp giải phu mỏ bạo động, tại đây đối đầu kịch liệt cùng Dạ Cửu U nhưng dần bị hắn vạch trần bộ mặt ghê tởm của sư tôn mình.'
  }
];

export const MA_TON_DETAILED_DOSSIER: StoryBibleDetailedDossier = {
  grandTitle: 'CỬU U MA TÔN: VẠN CỔ HUYẾT THỆ',
  storyPhilosophy: 'Nhân gian xưng tụng chính đạo, nhưng chính đạo lấy xương tủy phàm nhân đúc thành bậc thang trường sinh. Nếu từ bi của các ngươi là lột da uống máu muôn dân, thì ma đạo của ta sẽ dùng sát phạt để san bằng ngụy thiện, lập lại trật tự máu và thép!',
  protagonistProfile: MA_TON_CHARACTERS[0],
  majorCharacters: MA_TON_CHARACTERS,
  exclusiveRealms: [
    {
      level: 1,
      realmName: 'Thối Cốt & Luyện Huyết Kỳ',
      stages: 'Thiết Cốt -> Đồng Bì -> Ngưng Huyết Chín Vòng',
      breakthroughPhenomenon: 'Huyết khí sôi trào đỏ rực, tiếng tim đập như sấm rền trong lồng ngực, bài xuất tạp chất thấu xương.',
      daoRiskAndBottleneck: 'Bị huyết khí thiêu đốt kinh mạch tẩu hỏa nhập ma; Dạ Cửu U dùng Huyết Ngục Bàn điều áp tuyệt đối.',
      exclusiveDivineAbility: 'Huyết Dịch Hóa Khí: Hút cạn huyết khí kẻ địch bị thương để hồi phục thương thế bản thân lập tức.'
    },
    {
      level: 2,
      realmName: 'Ngưng Sát Kỳ (Tu La Đạo Cơ)',
      stages: 'Địa Sát -> Thiên Sát -> Cửu U Ma Cơ Chín Vòng',
      breakthroughPhenomenon: 'Sau lưng hiện ra hư ảnh Ma Thần ba đầu sáu tay cao mười trượng gầm thét xé toạc mây trời.',
      daoRiskAndBottleneck: 'Sát khí xâm lấn thức hải biến thành kẻ cuồng sát mất trí; đạo tâm kiếp trước của Ma Hoàng đè bẹp sát khí.',
      exclusiveDivineAbility: 'Tu La Sát Vực: Làm giảm 30% tốc độ di chuyển và công kích của toàn bộ đối thủ xung quanh.'
    },
    {
      level: 3,
      realmName: 'Huyết Ma Đan Kỳ (Vạn Cổ Hắc Đan)',
      stages: 'Hắc Đan Tam Chuyển -> Lục Chuyển -> Cửu Chuyển Cực Đạo',
      breakthroughPhenomenon: 'Kim đan đen nhánh như mực xoay tròn giữa ngực, bắn ra chín đạo huyết lôi đánh lui thiên kiếp.',
      daoRiskAndBottleneck: 'Thiên Đạo Lôi Phạt giáng đòn hủy diệt; dùng Thí Thần Ma Đao chém đứt lôi kiếp ép nuốt sấm sét.',
      exclusiveDivineAbility: 'Ma Đồng Thấu Thị: Nhìn thấu điểm yếu đan điền và quỹ đạo linh lực của đối thủ trong nháy mắt.'
    },
    {
      level: 4,
      realmName: 'Vạn Kiếp Ma Anh Kỳ',
      stages: 'Anh Biến -> Thôn Phệ Hóa Thần -> Cửu U Ma Thể',
      breakthroughPhenomenon: 'Ma Anh ba đầu xuất thế, một tay cầm đao, một tay nâng Huyết Ngục Bàn, ma uy phủ kín vạn dặm hải vực.',
      daoRiskAndBottleneck: 'Đồ đệ phản bội và chính đạo liên thủ đánh lén; tương kế tựu kế chôn sống quân địch trong biển máu.',
      exclusiveDivineAbility: 'Huyết Hải Vô Biên: Biến thân xác thành huyết vụ bất tử, miễn nhiễm 90% sát thương vật lý.'
    },
    {
      level: 5,
      realmName: 'Thái Cổ Thôn Thiên Ma Thần',
      stages: 'Ma Thần Chi Thể -> Thôn Thiên Phệ Địa -> Chí Tôn Tự Do',
      breakthroughPhenomenon: 'Cửu Thiên rung chuyển, cánh cổng Tiên Đình rạn nứt, huyết diễm thiêu đốt ngọn cờ ngụy đạo chư thần.',
      daoRiskAndBottleneck: 'Thiên Đạo Ý Chí tự thân phủ quyết; một đao chém đứt xiềng xích quy luật tự lập thiên đạo mới.',
      exclusiveDivineAbility: 'Vạn Cổ Huyết Thệ: Một đao chém ra, toàn bộ kẻ mang dã tâm ngụy thiện đều bị vỡ đan điền đền tội.'
    }
  ],
  supremeCultivationArts: [
    {
      name: 'Cửu U Thôn Thiên Sát Điển',
      tier: 'Cấm Kỵ Ma Công Thái Cổ',
      description: 'Công pháp độc quyền do Dạ Cửu U sáng tạo từ thuở sơ khai, lấy sát phạt luyện đạo, thôn phệ ma khí và thiên địa sát lực thành thực lực thuần khiết.',
      layersSummary: '9 Trọng: Luyện Thể Phá Xiềng -> Ngưng Sát Đúc Cơ -> Luyện Huyết Hóa Đan -> Ma Anh Xuất Khiếu -> Thôn Thiên Diệt Thần.',
      forbiddenMove: 'Cửu U Nhất Kích: Đốt cháy vạn đạo huyết sát chém rách bầu trời và phá hủy đại trận hộ sơn.'
    },
    {
      name: 'Huyết Ngục Luyện Hồn Quyết',
      tier: 'Thần Giai Trung Phẩm',
      description: 'Giam giữ linh hồn kẻ thù gian ác vào Huyết Ngục Bàn để tra khảo bí mật và luyện hóa thành chiến linh hộ pháp.',
      layersSummary: 'Nhiếp Hồn -> Luyện Phách -> Tác Trận -> Vạn Hồn Tề Xuất.',
      forbiddenMove: 'Tu La Luyện Ngục: Mở ra cánh cổng Huyết Ngục nuốt chửng toàn bộ chiến trường vào bóng tối vô tận.'
    }
  ],
  supremeArtifacts: [
    {
      name: 'Cửu U Huyết Ngục Bàn',
      rank: 'Thái Cổ Hồng Hoang Ma Bảo',
      origin: 'Bản mệnh ma khí của Dạ Cửu U ngưng tụ từ ngàn vạn oán niệm của những kẻ bị áp bức dưới nhân gian.',
      specialPower: 'Thôn phệ sát khí tự động chữa lành cơ thể, chứa đựng kho tàng ký ức vạn năm, giải trừ mọi loại cấm chế tông môn.'
    },
    {
      name: 'Thí Thần Ma Đao',
      rank: 'Cực Đạo Ma Binh',
      origin: 'Rèn từ Hắc Thiết Thần Quặng dưới đáy U Minh Ma Vực, từng chém đầu mười tám vị Thần Tướng Tiên Đình.',
      specialPower: 'Đao khí mang theo ngọn lửa huyết sát ăn mòn linh khí đối thủ, chém trúng một vết thương là máu chảy không ngừng.'
    }
  ],
  majorFactions: [
    {
      id: 'fac_thai_nhat_thanh_dia',
      name: 'Thái Nhất Thánh Địa',
      type: 'Chính Đạo Chí Tôn (Đầu sỏ ngụy quân tử)',
      leader: 'Thái Hư Thượng Nhân',
      territory: 'Trung Châu • Hạo Thiên Sơn Đỉnh',
      doctrine: 'Bề ngoài hô hào diệt ma trừ tà bảo vệ bách tính, bên trong bóc lột cùng cực, buôn bán nô lệ tu chân.',
      relationshipWithProtagonist: 'Kẻ thù diệt môn kiếp trước, đích ngắm chính cần thanh trừng.',
      hiddenSecret: 'Toàn bộ tu vi của Thánh Chủ đều dựa vào việc hút linh căn của các thiên tài bần hàn bị vu oan là ma tu.'
    },
    {
      id: 'fac_hac_thiet_linh',
      name: 'Hắc Thiết Quặng Mỏ Liên Minh',
      type: 'Trại Tập Trung Nô Lệ Mỏ',
      leader: 'Chấp Sự Trưởng Triệu Bưu & Quân Đội Canh Giữ',
      territory: 'Dãy Núi Hắc Thiết Lĩnh biên cương sâu ba ngàn trượng',
      doctrine: 'Vắt kiệt sức lao động của phu mỏ đến chết để khai thác Hắc Thiết Tinh cung cấp cho Thánh Địa đúc giáp.',
      relationshipWithProtagonist: 'Nơi trùng sinh khởi đầu, căn cứ địa đầu tiên được giải phóng.',
      hiddenSecret: 'Dưới đáy mỏ chôn giấu phong ấn của một thanh Thí Thần Cổ Ma Kích.'
    },
    {
      id: 'fac_bac_hai_ma_minh',
      name: 'Bắc Hải Ma Minh (Mười Tám Hòn Đảo Huyết Hải)',
      type: 'Ma Đạo Phân Tán',
      leader: 'Huyết Cốt Lão Quái & Lục Mạn Đình (Vô Tâm Các)',
      territory: 'Bắc Hải Băng Phong Ma Vực',
      doctrine: 'Kẻ mạnh làm vua, cá lớn nuốt cá bé, hỗn loạn vô trật tự cho đến khi Dạ Cửu U xuất hiện thống nhất.',
      relationshipWithProtagonist: 'Thần phục sau khi bị Dạ Cửu U dùng vũ lực và uy danh Ma Hoàng trấn áp.',
      hiddenSecret: 'Nắm giữ hạm đội tàu ngầm ma đạo có thể vượt qua kết giới lôi kiếp của Cửu Châu.'
    }
  ],
  volumes: [
    {
      id: 'vol_mt_1',
      volumeNumber: 1,
      title: 'Quyển 1: Hắc Thiết Huyết Nộ • Nô Lệ Trùng Sinh',
      summary: 'Giai đoạn Thối Cốt & Luyện Huyết. Dạ Cửu U mở mắt trong thân xác thiếu niên nô lệ bị đánh chết nơi hầm mỏ tăm tối sâu ba ngàn trượng. Thức tỉnh Cửu U Huyết Ngục Bàn, hắn dẫn đầu vạn phu mỏ bạo động trong đêm bão tuyết, một cuốc đập nát đầu lũ chấp sự tàn bạo, san bằng trại giam và vũ trang cho đội quân nô bộc.',
      realmFocus: 'Thối Cốt Tầng 1 đến Luyện Huyết Chín Vòng',
      mainFactionsClash: 'Dạ Cửu U & Vạn Phu Mỏ vs Chấp Pháp Quân Hắc Thiết Lĩnh (Triệu Bưu)',
      chapters: [
        {
          id: 'chap_mt_1',
          chapterNumber: 1,
          title: 'Chương 1: Trùng Sinh Trong Hầm Mỏ, Huyết Ngục Bàn Thức Tỉnh',
          summary: 'Dạ Cửu U mở mắt giữa đống xác chết hôi thối dưới đáy mỏ Hắc Thiết Lĩnh. Ngọn roi sắt của chấp sự Triệu Bưu quất xuống bị hắn bắt chặt bằng tay không. Huyết Ngục Bàn dung hợp giọt máu oán hận khởi động thần năng thôn phệ.',
          coreConflict: 'Sự chênh lệch giữa thân xác suy nhược của thiếu niên nô lệ và ý chí bá vương bất tử của Ma Hoàng.',
          characterObjective: 'Hút cạn huyết khí kẻ thù để hồi sinh lục phủ ngũ tạng và đúc lại ma cốt.',
          foreshadowingAndClues: 'Phát hiện phù hiệu Thái Nhất Thánh Địa trên ngực áo của gã chấp sự tàn bạo.',
          lootOrBreakthrough: 'Thức tỉnh Cửu U Huyết Ngục Bàn, đột phá Luyện Huyết Tầng 3 trong nháy mắt.',
          proseDraftSample: `Hắc Thiết Lĩnh, hầm mỏ sâu ba ngàn trượng dưới lòng đất.

Không khí ngột ngạt quánh đặc mùi lưu huỳnh khét lẹt và máu tanh của những kẻ phu mỏ kiệt sức mà chết. Xác người chất đống ở góc hang tối tăm như những khúc gỗ mục.

"Bốp!"

Một ngọn roi sắt nạm gai xé rách không khí, quất thẳng vào lưng một thiếu niên gầy trơ xương đang nằm co quắp trên đống quặng sắc nhọn.

"Dậy! Đồ súc sinh lười biếng! Hôm nay không đào đủ ba khối Hắc Thiết Tinh, lão tử lột da ngươi ném cho quỷ khuyển ăn!"

Gã chấp sự Triệu Bưu mặc áo bào hoa mỹ của Thanh Vân Môn cười gằn, trên tay hắn cầm ngọn roi dính đầy thịt vụn. Xung quanh, hàng trăm người phu mỏ cúi gằm mặt run rẩy, ánh mắt chết chóc không còn chút thần sắc của sự sống.

Nhưng ngay khoảnh khắc ngọn roi thứ hai chuẩn bị quất xuống, bàn tay khẳng khiu nhuốm đầy bùn máu của thiếu niên bỗng nhiên đưa lên giữa không trung.

"Bắt!"

Năm ngón tay mảnh dẻ như cành củi khô bóp chặt lấy đầu ngọn roi gai sắt. Mũi gai đâm vào lòng bàn tay tóe máu, nhưng thiếu niên không hề run rẩy lấy một phân.

Hắn từ từ ngẩng đầu lên.

Đó là một đôi mắt... hoàn toàn không thuộc về nhân loại. Đồng tử đen thẳm như hai hố đen vũ trụ, nơi sâu thẳm nhất cuộn trào ngọn lửa huyết sắc lạnh lẽo thấu tận xương tủy.

[Keng! Cửu U Huyết Ngục Bàn cảm ứng được oán niệm ngập trời... Thôn Phệ Thần Năng mở khóa!]

"Ngươi... ngươi dám cản roi của lão tử?" Triệu Bưu giật mạnh roi nhưng ngọn roi như bị một ngọn núi cổ khóa chặt, không nhúc nhích được nửa phân.

"Thanh Vân Môn? Chính đạo thánh địa?"

Dạ Cửu U khẽ nhếch môi, giọng nói trầm đục khàn đặc nhưng mang theo uy áp đế vương khiến toàn bộ hầm mỏ bỗng nhiên rơi vào băng giá:

"Bổn tọa tung hoành Cửu U vạn năm, ngay cả Thiên Đế cũng phải nhường ba bước... Một con chó giữ hầm như ngươi, cũng xứng vung roi trước mặt ta sao?"

"Rắc!"

Dạ Cửu U khẽ vặn cổ tay, ngọn roi sắt cứng rắn đứt vụn thành từng đoạn. Trong tiếng hét kinh hoàng của gã chấp sự, một đạo huyết quang xé toạc màn đêm!`
        },
        {
          id: 'chap_mt_2',
          chapterNumber: 2,
          title: 'Chương 2: Luyện Khí Dưới Đáy Mỏ, Một Cuốc Đập Nát Chấp Sự',
          summary: 'Dạ Cửu U dùng Thôn Huyết Nghịch Chuyển Quyết hút cạn tu vi của Triệu Bưu, đột phá một mạch lên Luyện Huyết Tầng 7. Hắn bước lên đài quặng, giơ cao cuốc sắt kêu gọi vạn phu mỏ bạo động.',
          coreConflict: 'Phá vỡ xiềng xích sợ hãi tích tụ hàng chục năm của đám nô lệ bần cùng.',
          characterObjective: 'Tiêu diệt toàn bộ đội giám sát tầng một và thu thập vũ khí, đan dược cho thuộc hạ.',
          foreshadowingAndClues: 'Mộc Lão Đầu trong góc mỏ nhận ra thủ pháp bóp nát roi sắt của Ma Hoàng thuở xưa.',
          lootOrBreakthrough: 'Thu được túi trữ vật của Triệu Bưu, 300 viên Tẩy Tủy Đan và danh sách gián điệp của mỏ.',
          proseDraftSample: `Máu của Triệu Bưu chảy tràn trên mặt quặng đen nhánh.

Dạ Cửu U đứng giữa vũng máu, lồng ngực gầy gò phập phồng dữ dội khi dòng năng lượng cuồn cuộn rót thẳng vào đan điền. Từng thớ thịt, từng khúc xương gãy kêu lên răng rắc khi được ma khí tôi luyện thành Đồng Bì Thiết Cốt.

Hắn cúi người nhặt cây cuốc chim bằng quặng thép đặc biệt nặng trăm cân lên, vung tay ném thẳng về phía tên giám thị thứ hai đang hoảng hốt bỏ chạy.

"Phập!" Chiếc cuốc cắm sâu vào lồng ngực gã giám thị ghim chặt hắn vào vách đá.

Toàn bộ hang mỏ rơi vào sự im lặng chết chóc. Hàng trăm phu mỏ trừng trừng mắt nhìn thiếu niên vừa một tay giết liền hai tên ác bá chấp pháp.

Dạ Cửu U bước lên tảng đá quặng cao nhất, ánh mắt đỏ rực quét qua đám người đang run rẩy:

"Các ngươi muốn tiếp tục làm súc sinh chờ chết ở đây, hay muốn cầm cuốc lên cùng ta đập nát lũ ngụy quân tử ngoài kia để giành lại mạng sống?"

Trong góc hang, một lão già chột mắt run rẩy quỳ sụp xuống: "Ma Hoàng... người đã trở lại rồi!"`
        },
        {
          id: 'chap_mt_3',
          chapterNumber: 3,
          title: 'Chương 3: Hắc Dạ Bạo Động, Dẫn Dắt Vạn Nô Binh Phá Trại',
          summary: 'Đêm bão tuyết mù mịt, một vạn phu mỏ vũ trang bằng quặng nhọn và huyết phù đồng loạt phá tung cửa mỏ xông lên mặt đất. Dạ Cửu U một người một đao tắm máu toàn bộ trại lính canh giữ.',
          coreConflict: 'Trận huyết chiến giáp lá cà giữa quân đội chính quy trang bị giáp trụ và biển người nô lệ giận dữ.',
          characterObjective: 'Đánh chiếm kho lương thực, kho vũ khí và mở cổng thành giải thoát toàn bộ mười vạn nô bộc.',
          foreshadowingAndClues: 'Tìm thấy lệnh bài bí mật của Thái Nhất Môn yêu cầu nung chảy một vạn phu mỏ để lấy tinh huyết.',
          lootOrBreakthrough: 'Vũ trang hoàn chỉnh cho đội quân Tu La Nô Binh, đột phá Luyện Huyết Viên Mãn.',
          proseDraftSample: `Bão tuyết phương Bắc gầm thét dữ dội bao trùm toàn bộ Hắc Thiết Lĩnh.

Trên tường thành doanh trại chấp pháp, ngọn lửa đuốc bị gió thổi chập chờn. Viên tướng chỉ huy đang nâng chén rượu ấm thì bỗng nghe thấy tiếng đất rung chuyển ầm ầm từ lòng núi.

"Ầm ——!"

Cánh cổng sắt nặng vạn cân dẫn xuống đáy mỏ bỗng nhiên nổ tung thành trăm mảnh sắt vụn!

Từ trong bóng tối vô tận, hàng ngàn bóng người mắt đỏ ngầu, tay cầm cuốc sắt và đòn gẩy gầm thét lao ra như sóng thần đỏ thẫm. Dẫn đầu đoàn quân là một bóng áo đen gầy gò cầm thanh mã tấu rỉ sét. Mỗi bước chân Dạ Cửu U lướt qua, đầu lâu của lính canh bay rợp trời tuyết trắng.

"Bạo động! Nô lệ bạo động rồi! Mau bắn tên!" Tiếng gào thét hoảng loạn bị tiếng vó ngựa và tiếng đao kiếm xé toạc.

Dạ Cửu U đạp trên thi thể viên chỉ huy, cờ máu tung bay phần phật trong bão tuyết:

"Đêm nay, Hắc Thiết Lĩnh không còn nô lệ! Máu của các ngươi đổ xuống, ngày mai giang sơn này sẽ đổi chủ!"`
        },
        {
          id: 'chap_mt_4',
          chapterNumber: 4,
          title: 'Chương 4: Rèn Đúc Ma Đao, Rút Lui Về Phía Biển Bắc',
          summary: 'Mộc Lão Đầu dốc cạn bản lĩnh rèn cho Dạ Cửu U thanh Thí Thần Ma Đao phôi thai. Dạ Cửu U bố trí nghi binh lừa gạt viện binh chính đạo, dẫn dắt đại quân xuyên qua hẻm núi tiến ra Bắc Hải.',
          coreConflict: 'Cuộc đào thoát nghẹt thở trước sự truy kích của ba ngàn kỵ binh thiết giáp chính phái.',
          characterObjective: 'Bảo toàn lực lượng nòng cốt và tiếp cận bờ biển để hội quân cùng ma đạo.',
          foreshadowingAndClues: 'Tiêu Lãnh Sương dẫn đầu đội truy kích bắt đầu nghi ngờ sự thật sau khi nhìn thấy đống xương khô nô lệ.',
          lootOrBreakthrough: 'Sở hữu thanh Thí Thần Ma Đao (phôi thai bậc 1) và lòng trung thành tuyệt đối của vạn thuộc hạ.',
          proseDraftSample: `Lò rèn dã chiến rực lửa đỏ thắm giữa hẻm núi tuyết.

Mộc Lão Đầu quai búa liên hồi, từng giọt mồ hôi rơi xuống đe sắt bốc khói xèo xèo. Dạ Cửu U đứng bên cạnh, vạch cổ tay để một dòng máu đỏ thẫm nhỏ thẳng vào thân đao đang đỏ rực.

"Xì ——!"

Một đạo ma lôi màu đen nhánh từ thân đao phóng thẳng lên tầng mây. Thanh đao dài bốn thước, lưỡi uốn cong như trăng khuyết, sống đao khắc chín đạo huyết văn khát máu — Thí Thần Ma Đao chính thức xuất thế!

"Đao tốt!" Dạ Cửu U nắm lấy chuôi đao, cảm nhận dòng sát khí cuồn cuộn tương thông với linh hồn.

Phía sau hẻm núi, tiếng tù và truy kích của kỵ binh Thái Nhất Môn đã vang lên sát nút.

Dạ Cửu U xoay người, vung đao chém ra một nhát ngang sườn núi.

"Oanh!" Một trận lở tuyết kinh thiên động địa đổ ụp xuống chôn vùi hoàn toàn con đường truy kích. Hắn quay đầu nhìn về phía biển Bắc Hải xa xăm nơi sóng gió đen kịt đang cuộn trào:

"Tiến ra biển! Nơi đó mới là thiên đường của ma đạo!"`
        }
      ]
    },
    {
      id: 'vol_mt_2',
      volumeNumber: 2,
      title: 'Quyển 2: Bắc Hải Ma Đảo • Tu La Đạo Cơ',
      summary: 'Giai đoạn Ngưng Sát Kỳ (Trúc Cơ). Thoát khỏi vòng vây chính đạo, tiến ra mười tám hòn đảo ma đạo Bắc Hải. Nơi đây các bang phái ma tu tranh giành tàn sát lẫn nhau. Dạ Cửu U dùng sát phạt thiết lập lại quy củ, giải cứu Lục Mạn Đình, nuốt trọn hạch tâm ma thú đáy biển đúc thành Cửu U Ma Cơ chín vòng vô thượng.',
      realmFocus: 'Ngưng Sát Kỳ (Tu La Đạo Cơ Chín Vòng)',
      mainFactionsClash: 'Dạ Cửu U vs Huyết Cốt Lão Quái & Quái Thú Bắc Hải',
      chapters: [
        {
          id: 'chap_mt_5',
          chapterNumber: 5,
          title: 'Chương 5: Huyết Cốt Đảo Huyết Đấu, Một Mình Trảm Ngũ Thập Cường Địch',
          summary: 'Vừa đặt chân lên Huyết Cốt Đảo, Dạ Cửu U bị năm mươi tên đầu sỏ ma tu vây ráp đòi nộp cống nạp và bắt giữ thuộc hạ làm thức ăn. Dạ Cửu U một đao chém sạch năm mươi thủ lĩnh ma tặc.',
          coreConflict: 'Quy luật rừng rú của ma đạo: Kẻ yếu là thức ăn, kẻ mạnh là chúa tể.',
          characterObjective: 'Dùng thủ đoạn tàn khốc nhất để trấn áp toàn bộ ác nhân trên đảo trong một trận chiến duy nhất.',
          foreshadowingAndClues: 'Tên đầu sỏ trước khi chết tiết lộ Vô Tâm Các của Lục Mạn Đình đang bị vây hãm tại Huyết Lăng.',
          lootOrBreakthrough: 'Thu nạp toàn bộ ma hạch của năm mươi tên cường đạo, ngưng tụ Địa Sát tầng thứ ba.',
          proseDraftSample: `Bờ cát Huyết Cốt Đảo một màu xám xịt tanh nồng.

Năm mươi tên ma tu râu ria xồm xoàm, toàn thân xăm ma văn kỳ quái, tay cầm đầu lâu và đoản đao cười ha hả vây kín đoàn người của Dạ Cửu U:

"Ở đâu ra một lũ ăn mày rách rưới thế này? Nộp toàn bộ nữ nhân và quặng sắt ra đây, sau đó tự chặt hai tay thì lão tử tha cho một mạng!"

Tên đầu lĩnh chột mắt tiến lên vung chùy gai định đập vào đầu Dạ Cửu U.

"Xoẹt!"

Ánh đao đen nhánh lóe lên nhanh như một tia chớp giữa trời quang.

Cái đầu của tên đầu lĩnh chột mắt bay vút lên cao, nụ cười trên môi hắn thậm chí còn chưa kịp tắt thì máu từ cổ đã phun lên như suối nước nóng!

Dạ Cửu U bước qua xác chết không thèm nhìn lấy một lần. Hắn tra đao vào vỏ, giọng nói lạnh lẽo vang khắp bờ biển:

"Ai muốn cống nạp nữa? Bước lên đây."

Bốn mươi chín tên ma tu còn lại đồng loạt tái mét mặt, chân run rẩy không bước nổi nửa bước!`
        },
        {
          id: 'chap_mt_6',
          chapterNumber: 6,
          title: 'Chương 6: Cứu Xích Luyện Ma Nữ, Thu Phục Vô Tâm Các',
          summary: 'Dạ Cửu U đột nhập Huyết Lăng cứu Lục Mạn Đình đang bị trúng Cửu Âm Hàn Độc sắp chết. Hắn dùng Cửu U Huyết Ngục Bàn hút độc cứu mạng nàng, Lục Mạn Đình dâng trọn hạm đội Vô Tâm Các quy phục.',
          coreConflict: 'Cứu chữa thể chất cấm kỵ nguy hiểm đến tính mạng của cả hai người.',
          characterObjective: 'Hóa giải hàn độc cho Lục Mạn Đình và thu nạp mạng lưới hạm đội biển Bắc Hải.',
          foreshadowingAndClues: 'Lục Mạn Đình trao cho Dạ Cửu U bản đồ hải đồ dẫn tới huyệt mộ Ma Kích Thôn Thiên.',
          lootOrBreakthrough: 'Hấp thụ Cửu Âm Hàn Khí tôi luyện đan điền, đột phá Ngưng Sát tầng 6.',
          proseDraftSample: `Trong hang đá Huyết Lăng, từng giọt nước lạnh buốt rơi tí tách.

Lục Mạn Đình nằm co quắp trên phiến đá đen, môi tím tái, toàn thân phủ một lớp sương băng mỏng. Cửu Âm Tuyệt Mạch phát tác như ngàn vạn mũi kim đâm vào tim nàng.

"Đừng chạm vào ta... hàn độc này sẽ làm đông cứng máu của ngươi..." Nàng thều thào khi nhìn thấy Dạ Cửu U bước tới.

Dạ Cửu U không trả lời. Hắn ngồi xuống, bàn tay đặt thẳng lên đan điền nàng.

Một luồng xoáy đen kịt xuất hiện giữa lòng bàn tay hắn. Toàn bộ sương băng và khí độc màu tím thẫm từ cơ thể Lục Mạn Đình bỗng nhiên bị hút cạn vào Huyết Ngục Bàn như suối chảy về biển lớn!

Sắc mặt Lục Mạn Đình dần hồng hào trở lại. Nàng mở to đôi mắt long lanh nhìn người đàn ông trước mặt, cảm nhận được một cỗ uy áp ma đạo vĩ đại mà nàng chưa từng thấy ở bất kỳ ai:

"Ngươi... ngươi rốt cuộc là ai?"

"Từ hôm nay, ngươi là người của bổn tọa. Mạng của ngươi do ta nắm giữ, cừu hận của ngươi... ta sẽ đòi lại bằng máu của Thái Nhất Môn!"`
        },
        {
          id: 'chap_mt_7',
          chapterNumber: 7,
          title: 'Chương 7: Thâm Hải Đoạt Kích, Chém Giảo Long Bắc Hải',
          summary: 'Dạ Cửu U lặn xuống đáy vực biển sâu ba ngàn trượng nơi Giảo Long ngàn năm canh giữ Thí Thần Cổ Ma Kích. Một trận ác chiến dưới đáy biển nổ ra, Dạ Cửu U bẻ gãy sừng rồng đoạt lấy ma kích.',
          coreConflict: 'Chiến đấu dưới áp lực nước kinh hoàng và đối đầu cự thú viễn cổ.',
          characterObjective: 'Thu phục ma khí bản mệnh kiếp trước bị phong ấn dưới đáy biển.',
          foreshadowingAndClues: 'Ma Kích thức tỉnh truyền âm nhận chủ, báo cho Dạ Cửu U biết Ma La Cừu đã liên minh cùng Thái Nhất Môn.',
          lootOrBreakthrough: 'Đoạt được Thí Thần Cổ Ma Kích, uống máu long đan đột phá Ngưng Sát tầng 9.',
          proseDraftSample: `Đáy biển Bắc Hải tối đen như mực, áp lực nước có thể nghiền nát sắt thép thành cám vụn.

Một con hắc sắc Giảo Long dài trăm trượng đang quấn chặt lấy một cây kích sắt cắm sâu vào đá ngầm. Đôi mắt đỏ ngầu như hai ngọn đèn lồng trừng trừng nhìn kẻ xâm nhập nhỏ bé.

"Ầm!" Giảo Long vung đuôi quất ra một cơn lốc xoáy ngầm xé toạc đáy biển.

Dạ Cửu U không hề lùi bước. Quanh thân hắn bùng nổ chín vòng ma khí màu mực, tay cầm Thí Thần Ma Đao chém thẳng vào mắt cự thú!

"Rống ——!"

Máu rồng nhuộm đen cả một vùng biển sâu. Dạ Cửu U đạp lên đầu rồng, một tay nắm lấy cán cây ma kích cắm trên đá ngầm rút mạnh lên.

Một tiếng sấm nổ vang dội từ đáy biển vọng lên bầu trời!

Cây Thí Thần Ma Kích gỉ sét bỗng nhiên tỏa ra hắc diễm thiêu đốt cả dòng nước biển, ngoan ngoãn thu nhỏ lại nằm gọn trong lòng bàn tay Ma Hoàng!`
        },
        {
          id: 'chap_mt_8',
          chapterNumber: 8,
          title: 'Chương 8: Luyện Hóa Ma Khí, Đúc Thành Cửu U Ma Cơ Chín Vòng',
          summary: 'Tại đỉnh núi Huyết Hỏa Đảo, Dạ Cửu U dung hợp toàn bộ sát khí biển Bắc và máu rồng, đúc thành Cửu U Ma Cơ chín vòng hoàn mỹ. Toàn bộ mười tám hòn đảo ma đạo chấn động quỳ phục tôn xưng tân minh chủ.',
          coreConflict: 'Đột phá đạo cơ ma đạo tối thượng chịu sự giáng phạt của lôi kiếp đen.',
          characterObjective: 'Hoàn tất bước nhảy vọt thực lực để sẵn sàng phản công Cửu Châu lục địa.',
          foreshadowingAndClues: 'Thái Nhất Thánh Địa nhận tin báo bạo động, phát lệnh Phục Ma Đại Hội.',
          lootOrBreakthrough: 'Thành tựu Cửu U Ma Cơ Chín Vòng, thống nhất Bắc Hải Ma Minh mười vạn giáo chúng.',
          proseDraftSample: `Trên đỉnh Huyết Hỏa Đảo, nham thạch sôi trào hòa quyện với sóng biển gầm rú.

Dạ Cửu U ngồi xếp bằng giữa tâm bão lôi kiếp đen nhánh. Sau lưng hắn, một hư ảnh Ma Thần khổng lồ ba đầu sáu tay ngưng tụ chân thực đến từng chiếc vảy giáp. Chín vòng hào quang ma khí đen rực xoay tròn quanh đan điền như chín bánh xe vận mệnh!

"Rắc rắc!"

Đạo cơ hoàn tất!

Khí tức uy áp bùng nổ quét ngang hàng ngàn dặm hải vực. Toàn bộ yêu thú và tu sĩ trên mười tám hòn đảo đều cảm thấy linh hồn mình run rẩy, bất giác quỳ sụp xuống hướng về phía ngọn núi lửa:

"Cung nghênh Minh Chủ xuất quan! Ma Đình vạn cổ bất diệt!"

Lục Mạn Đình quỳ ở hàng đầu tiên, ngước nhìn bóng hình uy nghi như thần ma giữa trời giông bão, khóe môi nở nụ cười rạng rỡ: "Thái Nhất Môn, ngày tàn của các ngươi tới rồi!"`
        }
      ]
    },
    {
      id: 'vol_mt_3',
      volumeNumber: 3,
      title: 'Quyển 3: Ngụy Chính Phục Ma • Lật Mặt Thánh Địa',
      summary: 'Giai đoạn Huyết Ma Đan Kỳ (Kim Đan). Thái Nhất Thánh Địa tổ chức Phục Ma Đại Hội tại Huyết Cốc hòng tàn sát toàn bộ tán tu và ma đạo phản kháng. Dạ Cửu U tương kế tựu kế, dẫn quân đột kích lôi đài, bẻ gãy thánh kiếm, vạch trần chân tướng các phòng thí nghiệm đỉnh lô rút linh căn của Thái Hư Thượng Nhân trước vạn người, ngưng tụ Vạn Cổ Hắc Đan trấn áp quần hùng.',
      realmFocus: 'Huyết Ma Đan Kỳ (Kim Đan Cực Phẩm Cửu Chuyển)',
      mainFactionsClash: 'Bắc Hải Ma Minh (Dạ Cửu U) vs Thái Nhất Thánh Địa & Liên Minh Chính Phái',
      chapters: [
        {
          id: 'chap_mt_9',
          chapterNumber: 9,
          title: 'Chương 9: Huyết Cốc Hội Bách Phái, Cạm Bẫy Phục Ma Đài',
          summary: 'Thái Nhất Môn dựng đài Phục Ma giam giữ năm trăm phu mỏ làm con tin dụ Dạ Cửu U xuất hiện. Dạ Cửu U một mình bước vào thung lũng giữa muôn trùng cạm bẫy trận pháp.',
          coreConflict: 'Tình thế một mình đối đầu liên minh trăm môn phái chính đạo giăng lưới phục kích.',
          characterObjective: 'Giải cứu con tin và dụ toàn bộ các thủ lĩnh ngụy thiện vào tầm ngắm sát phạt.',
          foreshadowingAndClues: 'Tiêu Lãnh Sương được giao trọng trách canh giữ con tin nhưng ngấm ngầm nới lỏng xiềng xích.',
          lootOrBreakthrough: 'Dùng Huyết Ngục Bàn vô hiệu hóa toàn bộ trận nhãn cấm chế của Huyết Cốc.',
          proseDraftSample: `Huyết Cốc, vách đá dựng đứng như hai lưỡi đao khổng lồ kẹp chặt lấy trời mây.

Năm trăm người phu mỏ bị xích sắt trói chặt trên cọc gỗ giữa thung lũng, dưới chân họ là củi khô tẩm dầu hỏa chuẩn bị thiêu sống. Trên khán đài cao ngất, hàng trăm chưởng môn danh môn chính phái áo bào chỉnh tề, nhấp trà cười nói như đang xem một buổi diễn trò.

"Dạ Cửu U, nếu ngươi không xuất hiện trong ba nhịp thở, lũ nô lệ này sẽ biến thành tro bụi!" Tiếng đại trưởng lão Thái Nhất Môn vang vọng khắp thung lũng.

"Cần gì ba nhịp thở?"

Một giọng nói lạnh buốt như từ cõi âm ty vang lên ngay sau lưng lão trưởng lão!

"Phập!"

Một bàn tay đen nhánh mang theo huyết diễm đâm xuyên qua lồng ngực gã trưởng lão, bóp nát trái tim đang đập của hắn trước sự bàng hoàng tột độ của toàn thể quan khách!`
        },
        {
          id: 'chap_mt_10',
          chapterNumber: 10,
          title: 'Chương 10: Bẻ Gãy Thánh Kiếm, Vạch Trần Bộ Mặt Giả Dối',
          summary: 'Chân Truyền Đệ Nhất của Kiếm Các rút Thánh Kiếm xông tới quyết chiến. Dạ Cửu U đưa hai ngón tay kẹp gãy kiếm báu, phơi bày độc dược và ma cốt giấu bên trong thân kiếm chính phái.',
          coreConflict: 'Trận luận kiếm và luận đạo giữa luân thường đạo lý giả hiệu và chân lý sát phạt.',
          characterObjective: 'Đập tan hoàn toàn biểu tượng đạo đức của Thái Nhất Môn trước con mắt chứng kiến của vạn tu sĩ.',
          foreshadowingAndClues: 'Tiêu Lãnh Sương bàng hoàng nhận ra thánh kiếm sư phụ ban tặng thực chất là ma cụ hút máu.',
          lootOrBreakthrough: 'Thu phục niềm tin của Tiêu Lãnh Sương và các đệ tử chính trực.',
          proseDraftSample: `Chân Truyền Kiếm Tử vung thánh kiếm sáng rực kim quang chém xuống: "Ma đầu nhận lấy cái chết! Kiếm này của ta đại diện cho chính nghĩa thiên đạo!"

Dạ Cửu U đứng yên bất động.

Khi mũi kiếm chỉ còn cách trán một phân, hắn thò hai ngón tay ra kẹp chặt lấy thân kiếm như gọng kìm sắt.

"Keng ——!" Kim quang tắt lịm.

"Cái gì? Tay không bắt kiếm?" Toàn trường ồ lên kinh hãi.

"Chính nghĩa thiên đạo của ngươi... chính là thứ này sao?"

Dạ Cửu U cười lạnh, hai ngón tay khẽ vặn. Thanh thánh kiếm vỡ vụn làm đôi. Từ trong ruột kiếm rỗng toác, một dòng máu đen hôi thối cùng hàng ngàn con ký sinh trùng bò lổm ngổm ra ngoài, phát ra mùi tanh tưởi ghê tởm!

"Đây là Huyết Cốt Độc mà môn phái các ngươi chuyên dùng để khống chế đệ tử! Nhìn cho rõ đi, ai mới là ma, ai mới là quỷ!"`
        },
        {
          id: 'chap_mt_11',
          chapterNumber: 11,
          title: 'Chương 11: Ngưng Kết Vạn Cổ Hắc Kim Đan, Diệt Trưởng Lão Đoàn',
          summary: 'Năm vị Nguyên Anh trưởng lão thẹn quá hóa giận liên thủ phát động Hỗn Nguyên Trận hòng diệt khẩu toàn bộ người trong cốc. Dạ Cửu U dẫn dắt thiên kiếp giáng xuống, ngưng kết Vạn Cổ Hắc Kim Đan, một chưởng đánh tan trưởng lão đoàn.',
          coreConflict: 'Sinh tử đối đầu giữa thực lực Kim Đan nghịch thiên và sự áp chế cảnh giới của năm vị Nguyên Anh.',
          characterObjective: 'Đột phá Kim Đan Cực Phẩm ngay trong trận chiến và trảm sát đầu sỏ tội ác.',
          foreshadowingAndClues: 'Thái Hư Thượng Nhân từ xa gửi thần niệm cảnh cáo, hé lộ tung tích của Ma La Cừu.',
          lootOrBreakthrough: 'Đột phá Kim Đan Cực Phẩm (Cửu Chuyển Hắc Đan), thu giữ năm chiếc túi trữ vật Nguyên Anh.',
          proseDraftSample: `Thiên kiếp lôi đình giáng xuống như thác đổ nhuộm đen cả thung lũng Huyết Cốc.

Năm vị Nguyên Anh trưởng lão vây quanh Dạ Cửu U, sắc mặt dữ tợn: "Hôm nay tuyệt đối không thể để tên ma đầu này sống sót rời khỏi đây! Kết trận!"

Dạ Cửu U cười vang giữa sấm sét. Đan điền hắn xoay chuyển điên cuồng, hút trọn tia lôi kiếp đen nhánh vào cơ thể. Một viên kim đan màu mực sáng lấp lánh như ngọc thạch bay ra khỏi miệng hắn, tỏa ra uy áp khiến hư không nứt toác!

"Các ngươi nghĩ Nguyên Anh là có thể đè bẹp bổn tọa sao?"

Dạ Cửu U vung Thí Thần Ma Đao chém ra một vòng tròn máu:

"Tu La Trảm Tiên!"

Một đạo đao mang huyết sắc dài ngàn trượng quét ngang. Cả năm vị Nguyên Anh trưởng lão đồng loạt bị chém đứt ngang lưng, máu nhuộm đỏ cả vách đá Huyết Cốc!`
        },
        {
          id: 'chap_mt_12',
          chapterNumber: 12,
          title: 'Chương 12: Đại Bại Chính Đạo, Mở Đường Về Cửu U',
          summary: 'Quần hùng chính phái tan tác chạy tháo thân. Dạ Cửu U tha mạng cho Tiêu Lãnh Sương và các đệ tử lầm đường, dẫn dắt đại quân ma đạo khải hoàn trở về, chuẩn bị mở cổng U Minh đoạt lại ngai vàng Ma Hoàng.',
          coreConflict: 'Xử lý các tù binh chính đạo và phân định rõ ranh giới giữa trả thù và tàn sát vô cớ.',
          characterObjective: 'Thu phục nhân tâm thiên hạ, biến cuộc khởi nghĩa thành phong trào giải phóng toàn Cửu Châu.',
          foreshadowingAndClues: 'Tiêu Lãnh Sương tuyên bố rời khỏi Thái Nhất Thánh Địa để đi tìm chân lý.',
          lootOrBreakthrough: 'Danh tiếng Ma Tôn chấn động khắp năm châu bốn biển, vạn tán tu lũ lượt xin gia nhập.',
          proseDraftSample: `Khói lửa chiến trận dần lắng xuống giữa đống đổ nát của Huyết Cốc.

Tiêu Lãnh Sương quỳ trên đất, thanh kiếm gãy nằm bên cạnh, ánh mắt phức tạp nhìn người đàn ông áo đen đang bước tới: "Tại sao không giết ta? Ta là người của Thái Nhất Môn."

Dạ Cửu U dừng bước, cúi nhìn nàng bằng ánh mắt thâm sâu không đáy:

"Kiếm của ngươi chưa từng nhuốm máu kẻ vô tội. Ta giết kẻ ngụy thiện, không giết người có kiếm tâm trong sạch. Cầm kiếm của ngươi lên, trở về xem sư tôn của ngươi đang làm gì với hàng triệu bách tính ngoài kia đi."

Hắn quay lưng bước đi, áo choàng ma đạo phần phật trong gió sớm:

"Lục Mạn Đình, truyền lệnh toàn quân: Tiến về U Minh Ma Cung, thanh lý môn hộ!"`
        }
      ]
    },
    {
      id: 'vol_mt_4',
      volumeNumber: 4,
      title: 'Quyển 4: Ma Uyên Khởi Nghĩa • Thống Nhất U Minh',
      summary: 'Giai đoạn Vạn Kiếp Ma Anh Kỳ (Nguyên Anh). Dạ Cửu U dẫn dắt hạm đội ma đạo tiến thẳng vào U Minh Ma Uyên, nơi đồ đệ phản bội Ma La Cừu đang ngự tọa trên Ma Hoàng Thần Tọa. Trận huyết chiến phản sư diệt môn nổ ra giữa hai thế hệ Ma Tôn. Dạ Cửu U thu hồi thần tọa, trảm sát phản đồ, thành lập Cửu U Ma Đình với kỷ luật nghiêm minh.',
      realmFocus: 'Vạn Kiếp Ma Anh Kỳ (Nguyên Anh Đỉnh Phong)',
      mainFactionsClash: 'Cửu U Ma Đình (Dạ Cửu U) vs Ngụy Ma Hoàng (Ma La Cừu) & Viện Binh Tiên Tộc',
      chapters: [
        {
          id: 'chap_mt_13',
          chapterNumber: 13,
          title: 'Chương 13: Trở Lại Ma Điện, Cố Nhân Nay Là Đồ Phản',
          summary: 'Hạm đội ma đạo đáp xuống Ma Hoàng Cổ Thành. Nhìn thấy cung điện cũ bị Ma La Cừu biến thành nơi hưởng lạc đồi trụy và cung phụng tượng vàng Thái Hư Thượng Nhân, sát khí của Dạ Cửu U bùng nổ tột đỉnh.',
          coreConflict: 'Cơn thịnh nộ của bậc thầy khi chứng kiến di sản ngàn năm bị môn đồ làm ô uế.',
          characterObjective: 'San bằng hệ thống phòng ngự ngoại vi của Ma Điện.',
          foreshadowingAndClues: 'Ma La Cừu đã bí mật luyện chế Huyết Hồn Đan dâng nộp cho Thượng Giới.',
          lootOrBreakthrough: 'Phá hủy tượng vàng ngụy đạo, thu hồi kho tàng binh khí cổ xưa.',
          proseDraftSample: `U Minh Ma Cung sừng sững giữa biển dung nham đỏ thẫm.

Dạ Cửu U đứng trên mũi chiến hạm, nhìn vào đại điện nguy nga nơi từng là nơi hắn truyền đạo cho muôn ma. Giờ đây, trên đỉnh điện thờ sừng sững một pho tượng vàng của Thái Hư Thượng Nhân — kẻ thù truyền kiếp của ma giới!

"Sư phụ tốt của ta... ngươi dạy chúng ta không chịu cúi đầu trước thần tiên, nhưng cúi đầu trước bọn chúng mới có đan dược để ăn, mới có trường sinh để hưởng!"

Tiếng cười ngạo mạn của Ma La Cừu từ trong điện truyền ra. Hắn mặc long bào đen dát vàng, tay ôm hai tà nữ, ánh mắt nhìn Dạ Cửu U đầy vẻ trêu ngươi.

Dạ Cửu U siết chặt chuôi Thí Thần Ma Đao, giọng nói bình thản đến rợn người:

"Năm xưa ta nhặt ngươi từ đống rác về, dạy ngươi cầm đao chém kẻ bất lương. Hôm nay, ta sẽ tự tay lấy lại thanh đao ấy."`
        },
        {
          id: 'chap_mt_14',
          chapterNumber: 14,
          title: 'Chương 14: Đồ Sư Phản Cốt, Ma La Cừu Đền Tội',
          summary: 'Trận đại chiến đỉnh cao giữa hai thế hệ Ma Tôn trên đỉnh Ma Điện. Ma La Cừu thi triển công pháp sư phụ dạy nhưng bị Dạ Cửu U khắc chế hoàn hảo từng đường đao, một nhát chém đứt đầu kẻ phản bội tế cờ.',
          coreConflict: 'Cuộc đọ sức giữa kẻ học lỏm công pháp và người sáng tạo ra nguồn gốc công pháp.',
          characterObjective: 'Thanh lý môn hộ, đòi lại công lý cho linh hồn kiếp trước.',
          foreshadowingAndClues: 'Ma La Cừu trước khi chết kích hoạt cấm chế tự bạo kết nối với Tiên Đình Thượng Giới.',
          lootOrBreakthrough: 'Đoạt lại Ma Hoàng Thần Tọa và bảo vật trấn môn Cửu U Ma Ấn.',
          proseDraftSample: `Đao quang và thương ảnh va chạm làm rách toạc cả vòm trời dung nham.

Ma La Cừu vung Phệ Hồn Ma Thương đâm ra ngàn vạn bóng thương quỷ khốc: "Dạ Cửu U! Thân xác phàm nhân này của ngươi làm sao chịu nổi ba chiêu Cửu U Thương Quyết của ta?"

"Ngươi quên rồi sao?"

Thân hình Dạ Cửu U như làn khói mờ ảo lướt qua kẽ mũi thương hiểm hóc nhất: "Toàn bộ mười tám thức Cửu U Thương Quyết... đều là do ta sáng tạo khi ngươi còn chưa ra đời!"

"Xoẹt!"

Lưỡi Thí Thần Ma Đao vung lên một góc độ quỷ quyệt không tưởng, cắt đứt cán ma thương, lướt ngang qua cổ họng Ma La Cừu.

Đầu lâu của gã Ngụy Ma Hoàng bay vút lên không trung, rơi bộp xuống bậc thềm Ma Điện.

Dạ Cửu U chậm rãi bước lên ngai vàng đầu lâu quen thuộc, quay người ngồi xuống, đặt thanh ma đao lên đùi:

"Kẻ phản nghịch đã đền tội. Kẻ nào còn muốn thử sức?"

Hàng vạn ma quân bên dưới đồng loạt quỳ rạp sát đất, tiếng hô vang dội rung chuyển cả Cửu U: "Cung nghênh Ma Hoàng quy vị!"`
        },
        {
          id: 'chap_mt_15',
          chapterNumber: 15,
          title: 'Chương 15: Thiết Lập Ma Đình, Kỷ Luật Sắt Đá',
          summary: 'Dạ Cửu U ban bố Mười Điều Thiết Luật của Ma Đình: Cấm tàn sát phàm nhân vô tội, cấm cướp bóc kẻ yếu, lấy sát phạt làm đao bảo vệ kẻ bần hàn. Thành lập liên minh quân sự thống nhất Cửu U.',
          coreConflict: 'Cải tạo bản tính hỗn loạn vô tổ chức của giới ma tu thành một đội quân kỷ luật.',
          characterObjective: 'Xây dựng hậu phương vững chắc chuẩn bị đại chiến với chư thần Thượng Giới.',
          foreshadowingAndClues: 'Tiêu Lãnh Sương cùng một nhóm đệ tử chính đạo ly khai mang theo bản đồ phòng thủ Thái Nhất Môn tới xin gia nhập.',
          lootOrBreakthrough: 'Đột phá Vạn Kiếp Ma Anh Viên Mãn, ngưng tụ Ma Thể Bất Tử.',
          proseDraftSample: `Trước đại điện Ma Đình, mười tấm bia thép khổng lồ được dựng lên sừng sững.

Dạ Cửu U đứng trên cao, giọng nói truyền khắp vạn dặm:

"Từ nay về sau, kẻ nào xưng danh Ma Đình mà ức hiếp phàm nhân, cướp bóc người cô thế, trảm không tha! Kẻ nào phản bội đồng đội, trảm không tha! Ma đạo của chúng ta không phải là súc sinh cuồng sát, mà là lưỡi đao trảm phạt lũ ngụy quân tử trên cao!"

Dưới đài, Lục Mạn Đình và Tiêu Lãnh Sương đứng cạnh nhau — một ma nữ quyến rũ, một kiếm tiên thanh tao — đồng loạt rút kiếm hướng về phía Dạ Cửu U:

"Chúng ta thề chết tuân theo thiết luật Ma Hoàng!"`
        },
        {
          id: 'chap_mt_16',
          chapterNumber: 16,
          title: 'Chương 16: Chiến Hạm Rời Bến, Tổng Tấn Công Thái Nhất Môn',
          summary: 'Mười vạn chiến hạm bọc thép của Ma Đình cất cánh bay về phía Trung Châu. Chiến dịch lật đổ trung tâm quyền lực ngụy thiện chính thức bắt đầu.',
          coreConflict: 'Sự đối đầu quy mô chiến tranh toàn diện giữa hai nền văn minh tu chân.',
          characterObjective: 'Bao vây Thái Nhất Sơn và giải thoát toàn bộ phu mỏ nô lệ trên lục địa.',
          foreshadowingAndClues: 'Thái Hư Thượng Nhân mở cấm địa dâng tế phẩm triệu hồi Thiên Đạo Giám Sát Giả.',
          lootOrBreakthrough: 'Thu được toàn bộ linh mạch phương Bắc tiếp tế cho quân đội.',
          proseDraftSample: `Mười vạn chiến hạm ma đạo đen kịt che kín cả bầu trời Trung Châu.

Khói đen cuộn trào cùng tiếng trống trận ầm ầm như sấm rền. Người dân trên khắp lục địa ngước nhìn lên không trung, không phải thấy nỗi kinh hoàng... mà thấy những biểu ngữ đỏ thẫm tung bay: "San bằng ngụy thánh địa, giải phóng muôn dân!"

Dạ Cửu U đứng ở đầu chiến hạm soái hạm, tay chỉ thẳng về phía ngọn núi linh sơn rực rỡ của Thái Nhất Môn cách đó trăm dặm:

"Thái Hư lão tặc! Món nợ máu vạn năm trước, hôm nay bổn tọa tới đòi cả vốn lẫn lời!"`
        }
      ]
    },
    {
      id: 'vol_mt_5',
      volumeNumber: 5,
      title: 'Quyển 5: Thí Thần Đoạt Giới • Đạp Toái Tiên Đình',
      summary: 'Giai đoạn Thái Cổ Thôn Thiên Ma Thần. Thái Hư Thượng Nhân triệu hồi Thiên Đạo Giám Sát Giả giáng đòn hủy diệt thế gian. Dạ Cửu U dẫn dắt chúng sinh phạt thiên, một đao chém vỡ Thái Hư Hỗn Nguyên Chung, bóp nát đầu kẻ thù truyền kiếp, vung Cửu U Thí Thần Đao chém toái Thiên Môn, giải phóng toàn cõi nhân gian khỏi kiếp nạn làm đỉnh lô chăn nuôi.',
      realmFocus: 'Thái Cổ Thôn Thiên Ma Thần (Chí Tôn Vô Thượng)',
      mainFactionsClash: 'Cửu U Ma Đình vs Thái Hư Thượng Nhân & Thiên Đạo Giám Sát Giả',
      chapters: [
        {
          id: 'chap_mt_17',
          chapterNumber: 17,
          title: 'Chương 17: San Bằng Hạo Thiên Sơn, Đại Pháo Phá Hộ Trận',
          summary: 'Đại quân Ma Đình vây kín Hạo Thiên Sơn. Mộc Lão Đầu chỉ huy đại pháo nã nát đại trận ngàn năm của Thái Nhất Môn, san bằng các cung điện xa hoa.',
          coreConflict: 'Đập tan pháo đài phòng thủ kiên cố nhất của danh môn chính phái.',
          characterObjective: 'Tiến thẳng vào chính điện bắt giữ đầu sỏ Thái Hư Thượng Nhân.',
          foreshadowingAndClues: 'Phát hiện căn hầm bí mật dưới núi giam giữ mười vạn thiếu niên đang bị hút sinh khí.',
          lootOrBreakthrough: 'Phá hủy trận pháp hút linh căn của môn phái.',
          proseDraftSample: `Khói lửa ngập trời thiêu rụi ngọn núi thiêng Hạo Thiên.

Những cung điện bằng vàng ngọc sụp đổ ầm ầm dưới hỏa lực pháo kích không ngừng nghỉ của Ma Đình. Các đệ tử kiêu ngạo của Thái Nhất Môn bấy lâu nay hoảng loạn tháo chạy như bầy kiến vỡ tổ.

Tiêu Lãnh Sương dẫn kiếm đội tiến vào giải thoát hàng ngàn thiếu niên đang bị xích trong hầm tối. Nhìn thấy cảnh tượng rùng rợn đó, nàng rớt nước mắt vung kiếm chém nát bia phong hiệu của sư môn:

"Đây chính là cái gọi là từ bi cứu thế của các ngươi sao? Thật là ghê tởm!"`
        },
        {
          id: 'chap_mt_18',
          chapterNumber: 18,
          title: 'Chương 18: Bóp Nát Thái Hư, Trảm Đầu Ngụy Quân Tử',
          summary: 'Dạ Cửu U đối đầu trực diện Thái Hư Thượng Nhân. Thái Hư dùng pháp bảo tối thượng chống cự nhưng bị Dạ Cửu U tay không bóp nát chuông thần, một đao chém đứt đầu kẻ thù báo thù kiếp trước.',
          coreConflict: 'Trận chiến quyết định ân oán vạn năm giữa hai vị cự đầu.',
          characterObjective: 'Hủy diệt kẻ cầm đầu ngụy thiện giải trừ mối thù sâu nặng.',
          foreshadowingAndClues: 'Thái Hư trước khi chết mở cánh cổng Tiên Môn triệu hồi Giám Sát Giả giáng thế.',
          lootOrBreakthrough: 'Nuốt trọn linh lực thuần dương của Thái Hư, đột phá bước vào cảnh giới Ma Thần.',
          proseDraftSample: `Trên đài cao chính điện, Thái Hư Thượng Nhân tóc tai rũ rượi, gõ vang Thái Hư Hỗn Nguyên Chung tạo ra sóng âm xé toạc hư không:

"Dạ Cửu U! Ngươi là ma! Thiên đạo sẽ không tha thứ cho ngươi!"

"Thiên đạo không tha thứ cho ta? Vậy ta sẽ chém nát cái thiên đạo thối nát đó!"

Dạ Cửu U xông tới giữa sóng âm bão tố. Hắn vung tay chộp lấy chiếc chuông đồng ngàn năm tuổi, năm ngón tay ghim sâu vào thân chuông kim loại.

"Rắc rắc —— Oanh!" Chiếc chuông thần nổ tung thành trăm mảnh sắt vụn!

Không để đối phương kịp lùi bước, lưỡi Thí Thần Ma Đao đã kề sát cổ họng Thái Hư Thượng Nhân.

"Vạn năm trước ngươi bỏ độc ám toán ta... hôm nay, nợ máu trả bằng máu!"

Một vệt máu đỏ thẫm xé toạc không gian, đầu lâu của gã Thánh Chủ ngụy thiện lăn lông lốc dưới chân Ma Hoàng!`
        },
        {
          id: 'chap_mt_19',
          chapterNumber: 19,
          title: 'Chương 19: Thiên Đạo Giám Sát Giáng Lâm, Cả Nước Phạt Thiên',
          summary: 'Thiên Đạo Giám Sát Giả từ Thượng Giới giáng lôi phạt diệt thế hòng tiêu diệt toàn bộ sinh linh phản nghịch. Dạ Cửu U dẫn dắt chúng sinh đồng lòng đứng lên phạt thiên.',
          coreConflict: 'Đối đầu với thực thể siêu nhiên đại diện cho quy tắc vận hành áp bức vạn cổ.',
          characterObjective: 'Tập hợp ý chí của hàng triệu phàm nhân và ma tu để chém đứt xiềng xích lôi phạt.',
          foreshadowingAndClues: 'Huyết Ngục Bàn mở khóa hình thái chung cực: Thôn Thiên Chi Nhãn.',
          lootOrBreakthrough: 'Đột phá Thái Cổ Thôn Thiên Ma Thần Cực Cảnh.',
          proseDraftSample: `Bầu trời rách toạc để lộ một con mắt khổng lồ vô tình màu trắng bạc — Thiên Đạo Giám Sát Giả!

Hàng ngàn tia lôi kiếp hủy diệt giáng xuống nhân gian nhằm xóa sổ toàn bộ nền văn minh.

"Quỳ xuống phục tùng, hoặc biến thành tro bụi!" Tiếng nói vô cảm vang vọng trong tâm trí của mọi sinh linh.

Dưới lôi kiếp kinh hoàng, Dạ Cửu U đạp gió bay vút lên đỉnh trời cao nhất, áo choàng nhuộm máu tung bay trong bão tố:

"Muốn chúng ta quỳ? Nhân gian này đã quỳ mười vạn năm quá đủ rồi!"

Phía sau hắn, hàng triệu tu sĩ và phàm nhân đồng loạt ngẩng cao đầu rút kiếm, ý chí nghịch thiên ngưng tụ thành một cột sáng đỏ rực chiếu thẳng lên tầng mây:

"Phạt Thiên! Phạt Thiên!"`
        },
        {
          id: 'chap_mt_20',
          chapterNumber: 20,
          title: 'Chương 20: Vạn Cổ Huyết Đao, Trảm Toái Thiên Môn Khai Kỷ Nguyên Mới',
          summary: 'Dạ Cửu U giải phóng toàn bộ thần năng Thôn Thiên, vung Thí Thần Ma Đao chém vỡ con mắt Thiên Đạo và phá nát cánh cổng Tiên Đình. Bầu trời tự do mở ra, muôn dân được làm chủ vận mệnh của chính mình.',
          coreConflict: 'Đòn đánh chung cuộc chấm dứt kỷ nguyên nô dịch vạn năm.',
          characterObjective: 'Giải phóng toàn cõi nhân gian và lập lại trật tự công bằng vĩnh cửu.',
          foreshadowingAndClues: 'Dạ Cửu U ngồi trên đỉnh trời ngắm nhìn giang sơn thanh bình, nụ cười thanh thản lần đầu hé lộ.',
          lootOrBreakthrough: 'Đạt tới cảnh giới Tự Do Tối Cao, muôn đời tôn xưng Vạn Cổ Ma Tôn.',
          proseDraftSample: `Một đao chém rách bầu trời!

Ánh sáng huyết diễm của Cửu U Thí Thần Đao bùng nổ như một vầng thái dương mới giữa vũ trụ tăm tối. Con mắt Thiên Đạo vỡ vụn làm đôi, cánh cổng Tiên Đình nô dịch sụp đổ thành cát bụi tinh hà.

Mưa máu dần tan, nhường chỗ cho ánh nắng ấm áp rạng ngời chiếu rọi khắp vạn dặm sơn hà.

Trên đỉnh trời cao nhất, Dạ Cửu U ngồi tựa vào thân đao, tay nâng bầu rượu ngọc uống một hơi cạn sạch. Lục Mạn Đình và Tiêu Lãnh Sương đứng bên cạnh, mỉm cười nhìn xuống nhân gian nơi tiếng reo hò tự do vang vọng khắp bốn biển.

"Ma Hoàng, người đã trả thù xong rồi, giờ người muốn đi đâu?" Lục Mạn Đình khẽ hỏi.

Dạ Cửu U nhìn về phía chân trời vô tận, khẽ nhếch môi cười vang:

"Đi đâu sao? Giang sơn này tự do rộng lớn, nơi nào có kẻ ỷ mạnh hiếp yếu... nơi đó sẽ có đao của Dạ Cửu U ta!"

Tiếng cười hào sảng vang vọng giữa tinh hà bất tận!`
        }
      ]
    }
  ],
  subStoryTrajectories: [
    {
      title: 'Mạch Nhánh Phu Mỏ Bạo Động & Rèn Đúc Thần Khí (Mộc Lão Đầu)',
      type: 'Binh Khí & Quân Sự',
      hook: 'Tập hợp các phu mỏ thợ rèn bị phế tu vi chế tạo đại pháo cơ quan và ma đao đặc biệt.',
      convergencePoint: 'Quyển 4 & Quyển 5: Đại pháo của Mộc Lão Đầu bắn nát hộ sơn trận Thái Nhất Môn.'
    },
    {
      title: 'Mạch Nhánh Ma Nữ Báo Thù & Hạm Đội Biển Bắc (Lục Mạn Đình)',
      type: 'Tình Cảm & Hạm Đội Thâm Hải',
      hook: 'Hóa giải Cửu Âm Hàn Độc, thu phục Vô Tâm Các, xây dựng hải quân vượt biển.',
      convergencePoint: 'Quyển 3 & Quyển 4: Dẫn hạm đội ma đạo đổ bộ Trung Châu đánh úp hậu phương chính phái.'
    },
    {
      title: 'Mạch Nhánh Kiếm Tiên Giác Ngộ (Tiêu Lãnh Sương)',
      type: 'Đấu Trí & Đạo Tâm Phản Phược',
      hook: 'Từ kẻ thù chính đạo được phái đi săn đuổi Dạ Cửu U dần nhìn thấy sự thật giả dối của sư tôn.',
      convergencePoint: 'Quyển 3 (Chương 12) & Quyển 5: Cắt tóc đoạn nghĩa cùng danh môn, gia nhập Ma Đình.'
    }
  ]
};

export const PRESET_MA_DAO_NOVEL_CONFIG: NovelConfig = {
  genre: 'Huyền Huyễn Kỳ Ảo',
  tone: 'Lãnh khốc tàn khốc, đấu trí đa mưu, sát phạt quả đoán, nghịch cảnh quật khởi',
  pov: 'Ngôi thứ ba (Lạnh lùng sắc bén, theo sát góc nhìn Dạ Cửu U)',
  setting: 'U Minh Ma Vực & Hắc Thiết Hạp Cốc — Nơi chính đạo đạo đức giả biến hàng triệu phàm nhân thành nô lệ đào linh thạch',
  mainCharacter: 'Dạ Cửu U - Tiền thân là Ma Hoàng vạn năm bị đệ tử phản bội, trùng sinh thành thiếu niên nô lệ mang Cửu U Huyết Ngục Bàn',
  plotIdea: 'Tuyệt đại Ma Hoàng Dạ Cửu U bị bảy vị Ngụy Quân Tử của Thái Nhất Thánh Địa và đại đồ đệ liên thủ ám hại, thân tử đạo tiêu nhưng tàn hồn nhập vào thi thể một thiếu niên nô lệ nơi hầm mỏ Hắc Thiết Lĩnh. Thức tỉnh Cửu U Huyết Ngục Bàn, hắn dùng máu tươi của lũ giám sát tham tàn để đúc lại đạo cơ ma đạo. Không màng quy củ giả dối của thế gian, Dạ Cửu U từng bước thu phục tàn bộ ma giáo, dùng sát lục để lập lại công bằng, biến Huyết Hải thành lưỡi đao trảm phạt toàn bộ chư thần ngụy đạo.',
  worldRules: 'Tu luyện theo Ma Đạo Sát Lục: Thối Cốt -> Luyện Huyết -> Ngưng Sát (Trúc Cơ) -> Huyết Ma Đan (Kim Đan) -> Vạn Kiếp Ma Anh -> Cửu U Ma Thần -> Thái Cổ Thôn Thiên.'
};

export const PRESET_MA_DAO_NOVEL_TREE: NovelNode = {
  id: 'node_root_cuu_u_ma_ton',
  type: NodeType.NOVEL,
  title: 'CỬU U MA TÔN: VẠN CỔ HUYẾT THỆ',
  summary: 'Bộ thiên tiểu thuyết Ma Đạo hắc ám hoành tráng 5 quyển 20 chương chi tiết về sự trỗi dậy của một Ma Hoàng trùng sinh, dùng sát lục phá nát bộ mặt giả dối của chính đạo.',
  content: '',
  isExpanded: true,
  children: MA_TON_DETAILED_DOSSIER.volumes.map(vol => ({
    id: vol.id,
    type: NodeType.PART,
    title: vol.title,
    summary: vol.summary,
    content: '',
    isExpanded: true,
    children: vol.chapters.map(chap => ({
      id: chap.id,
      type: NodeType.CHAPTER,
      title: chap.title,
      summary: chap.summary,
      content: chap.proseDraftSample,
      children: []
    }))
  }))
};


// =========================================================================
// BỘ CỐT TRUYỆN 3: ĐẠI CÀN TIÊN TRIỀU: CỬU LONG KHAI QUỐC LỤC (Hoàng Đạo Tiên Triều)
// (5 Quyển • 10 Hồi / Phần Lớn • 20 Chương • 40+ Mục Chi Tiết)
// =========================================================================
export {
  PRESET_TIEN_TRIEU_NOVEL_CONFIG,
  PRESET_TIEN_TRIEU_NOVEL_TREE,
  TIEN_TRIEU_CHARACTERS,
  TIEN_TRIEU_DETAILED_DOSSIER
} from './presetTienTrieuBible';
import {
  PRESET_TIEN_TRIEU_NOVEL_CONFIG,
  PRESET_TIEN_TRIEU_NOVEL_TREE,
  TIEN_TRIEU_CHARACTERS,
  TIEN_TRIEU_DETAILED_DOSSIER
} from './presetTienTrieuBible';

// =========================================================================
// DANH SÁCH BỘ CỐT TRUYỆN MẪU DÀNH CHO BỘ CHỌN
// =========================================================================
export const ALL_MASTER_PRESET_STORIES: MasterPresetStoryBundle[] = [
  {
    id: 'story_kiem_ton',
    title: 'Vạn Cổ Hỗn Độn Kiếm Tôn',
    tagline: 'Chính Đạo Nghịch Chuyển • Kiếm Đạo Hỗn Độn (5 Quyển • 20 Chương)',
    genre: 'Tiên Hiệp Cổ Phong',
    badge: 'Kiếm Tu • Hỗn Độn',
    badgeColor: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
    summary: 'Thiếu niên ngoại môn thức tỉnh Hỗn Độn Tàn Ngọc, dùng kiếm ý thuần khiết và bách nghệ lật đổ sự thống trị giả tạo của Cửu Đại Thánh Địa. Chi tiết 5 quyển 20 chương, dàn 7 nhân vật, công pháp và phục bút.',
    protagonist: 'Lâm Tiêu (Kiếm Tâm Thông Minh • Ý Chí Kiên Định)',
    goldenFinger: 'Hỗn Độn Tàn Ngọc (Phân giải đan độc, tinh lọc kiếm ý, chứa tàn hồn Kiếm Lão)',
    config: PRESET_MASTER_NOVEL_CONFIG,
    tree: PRESET_MASTER_NOVEL_TREE,
    characters: KIEM_TON_CHARACTERS,
    detailedBible: KIEM_TON_DETAILED_DOSSIER
  },
  {
    id: 'story_ma_ton',
    title: 'Cửu U Ma Tôn: Vạn Cổ Huyết Thệ',
    tagline: 'Ma Đạo Hắc Ám • Sát Phạt Trùng Sinh (5 Quyển • 20 Chương)',
    genre: 'Huyền Huyễn Kỳ Ảo',
    badge: 'Ma Đạo • Trùng Sinh',
    badgeColor: 'bg-red-950/60 border-red-500/40 text-red-300',
    summary: 'Ma Hoàng trùng sinh vào thân xác thiếu niên nô lệ mỏ khoáng, dùng Cửu U Huyết Ngục Bàn sát phạt phá nát bộ mặt đạo đức giả của ngụy quân tử. Chi tiết 5 quyển 20 chương, dàn 7 nhân vật ma đạo, ma khí và phục bút.',
    protagonist: 'Dạ Cửu U (Lãnh Khốc Bá Liệt • Đa Mưu Túc Trí)',
    goldenFinger: 'Cửu U Huyết Ngục Bàn (Thôn phệ sát khí, luyện hóa ma hạch, Ma Nhãn Thấu Thị)',
    config: PRESET_MA_DAO_NOVEL_CONFIG,
    tree: PRESET_MA_DAO_NOVEL_TREE,
    characters: MA_TON_CHARACTERS,
    detailedBible: MA_TON_DETAILED_DOSSIER
  },
  {
    id: 'story_tien_trieu',
    title: 'Đại Càn Tiên Triều: Cửu Long Khai Quốc Lục',
    tagline: 'Hoàng Đạo Tiên Triều • Khai Quốc Tranh Bá (5 Quyển • 10 Hồi • 20 Chương • 40 Mục)',
    genre: 'Kiếm Hiệp Kỳ Tình',
    badge: 'Tiên Triều • Quân Sự',
    badgeColor: 'bg-yellow-950/60 border-yellow-500/40 text-yellow-300',
    summary: 'Phế Thái Tử lưu đày biên cương thức tỉnh Long Mạch Đồ, dùng thiết huyết quân đội và nỏ thần cơ quan san bằng thế lực tông môn cát cứ. Phân chia chi tiết 5 quyển, 10 hồi phần lớn, 20 chương, 40 phân cảnh mục tiết, dàn 7 nhân vật quân tướng, công pháp và cơ quan bí lục.',
    protagonist: 'Tiêu Cảnh (Đế Vương Uy Nghi • Tầm Nhìn Chiến Lược)',
    goldenFinger: 'Long Mạch Cửu Châu Thần Ngọc (Quốc vận gia trì, Hoàng Long Hộ Thể)',
    config: PRESET_TIEN_TRIEU_NOVEL_CONFIG,
    tree: PRESET_TIEN_TRIEU_NOVEL_TREE,
    characters: TIEN_TRIEU_CHARACTERS,
    detailedBible: TIEN_TRIEU_DETAILED_DOSSIER
  }
];
