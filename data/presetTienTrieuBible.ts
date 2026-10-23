import { NovelConfig, NovelNode, NodeType, CharacterProfile } from '../types';
import {
  StoryBibleDetailedDossier,
  StoryBibleVolumeDetail,
  StoryBibleChapterDetail
} from './presetMasterNovelBible';

// =========================================================================
// BỘ NHÂN VẬT HOÀNG ĐẠO TIÊN TRIỀU (TIÊU CẢNH & QUÂN THẦN ĐẠI CÀN)
// =========================================================================

export const TIEN_TRIEU_CHARACTERS: CharacterProfile[] = [
  {
    id: 'char_tieu_canh',
    name: 'Tiêu Cảnh',
    pinyinOrAlias: 'Bắc Lương Vương / Cửu Long Thánh Hoàng',
    role: 'Chính diện',
    gender: 'Nam',
    age: '20 tuổi (Khởi đầu) -> 38 tuổi (Khai quốc thăng thiên)',
    realmOrRank: 'Binh Huyết Đệ Nhất Trọng (Khởi đầu) -> Vạn Cổ Thánh Hoàng (Chung cuộc)',
    sectOrFaction: 'Bắc Lương Thiết Kỵ -> Đại Càn Tiên Triều (Thái Tử -> Khai Quốc Hoàng Đế)',
    factionPosition: 'Phế Thái Tử Bắc Lương -> Vạn Cổ Chí Tôn Thánh Hoàng',
    spiritualRoots: 'Cửu Châu Long Mạch Chí Tôn Thể (Vạn Dân Khí Vận Chi Thể)',
    spiritualRootDetail: {
      countCategory: 'Hoàng Đạo Cửu Long Khí Vận Chi Căn',
      grade: 'Thần Cấp Tiên Triều Khai Thiên Căn',
      rootName: 'Cửu Châu Xã Tắc Kim Long Căn',
      elements: [
        { element: 'Khí Vận', purity: 100, color: '#eab308', description: 'Quốc vận gia trì, vạn dân đồng lòng sinh ra lực lượng vô địch' },
        { element: 'Canh Kim Sát', purity: 96, color: '#f59e0b', description: 'Sát khí chiến trường tôi luyện qua vạn trận chém yêu trừ ma' }
      ],
      cultivationSpeedMultiplier: 'Tăng theo số lượng bách tính an cư và lãnh thổ quy phục (x10 -> x100)'
    },
    mentalAttributes: {
      soulRealm: 'Hoàng Cực Đế Hồn',
      soulPowerPoints: 9900,
      perceptionRange: 'Toàn bộ cương thổ Đại Càn (khi Cửu Đỉnh kích hoạt)',
      daoHeartType: 'Đế Vương Chi Tâm / Vị Quốc Vị Dân',
      daoHeartStability: 100,
      comprehensionTier: 'Hoàng Đạo Thánh Triết',
      comprehensionScore: 98,
      innerDemonResistance: 99
    },
    personality: 'Khí phách uy nghiêm, mưu lược sâu như biển, thương dân như con nhưng với kẻ thù thì thiết huyết vô tình. Không tin vào lời hứa huyền hoặc của chư tiên, chỉ tin vào thực lực quân đội, pháp luật nghiêm minh và hạnh phúc của muôn dân.',
    appearance: 'Thân hình cao lớn khôi ngô, mày kiếm mắt phượng, ánh nhìn sắc lẹm như thần đao. Mặc huyền giáp khảm hoa văn Kim Long, khoác chiến bào đỏ thắm rách mép vì đao kiếm chiến trường.',
    weaponOrAbility: 'Cửu Long Thiên Mệnh Đao, Trấn Quốc Thần Đỉnh, Chấn Thiên Phá Linh Cự Pháo',
    destinyFate: 'Tử Vi Đế Tinh Chi Mệnh (Cửu Châu Đồng Tôn)',
    backstory: 'Vốn là Đích Thái Tử của Đại Càn, thông minh cơ trí, chủ trương thu hồi quyền lực từ các tông môn để cứu giúp dân nghèo. Hắn bị tam hoàng huynh Tiêu Húc cấu kết với Vấn Tiên Tông hạ độc vu hãm mưu phản, tước đoạt hoàng vị và đày ải đến Bắc Lương Phong Tuyết Quan. Tại ngôi miếu hoang thờ Cửu Đỉnh, máu hắn vô tình kích hoạt Cửu Châu Long Mạch Thần Ngọc, mở ra con đường tu luyện dựa vào Hoàng Đạo Quốc Vận.'
  },
  {
    id: 'char_tham_mo_van',
    name: 'Thẩm Mộ Vân',
    pinyinOrAlias: 'Thiên Cơ Các Chủ / Mặc Môn Thánh Nữ',
    role: 'Chính diện',
    gender: 'Nữ',
    age: '19 tuổi -> 35 tuổi',
    realmOrRank: 'Cơ Quan Đại Tông Sư (Chiến Tướng Viên Mãn -> Hoàng Cực)',
    sectOrFaction: 'Mặc Môn Cơ Quan Sơn -> Bắc Lương Quân Sư Phủ',
    factionPosition: 'Thủ lĩnh Mặc Gia tàn dư -> Đại Càn Hộ Quốc Quân Sư kiêm Công Bộ Thượng Thư',
    personality: 'Thông tuệ tuyệt đỉnh, trầm tĩnh sắc sảo, đam mê cơ quan thuật và khoa kỹ trận pháp. Ghét cay ghét đắng các tu sĩ ích kỷ chỉ biết gom góp tài nguyên tu luyện cá nhân.',
    appearance: 'Thanh nhã thoát tục, búi tóc đơn giản bằng trâm cơ quan gỗ đàn hương, tay luôn đeo găng da cừu giấu kim châm phá linh trận và bàn tính ngọc.',
    weaponOrAbility: 'Cửu Cung Thần Cơ Bàn, Nỏ Thần Phá Tiên, Bát Môn Khôi Lỗi Chiến Giáp',
    destinyFate: 'Thiên Cơ Trí Tinh (Hộ Quốc Lương Thần)',
    backstory: 'Hậu duệ cuối cùng của Mặc Gia Cơ Quan Môn bị Vấn Tiên Tông tàn sát vì chế tạo vũ khí cho người phàm. Nàng trốn đến Bắc Lương ẩn thân, sau khi chứng kiến chí hướng vĩ đại của Tiêu Cảnh đã dốc lòng phụ tá hắn rèn đúc cơ quan chiến trận.'
  },
  {
    id: 'char_trieu_chan',
    name: 'Triệu Chấn',
    pinyinOrAlias: 'Bắc Lương Mãnh Hổ / Đoạn Tí Chiến Thần',
    role: 'Chính diện',
    gender: 'Nam',
    age: '52 tuổi',
    realmOrRank: 'Binh Huyết Cực Hạn -> Chiến Tướng Cửu Trọng (Ngưng tụ Binh Sát Hổ Hồn)',
    sectOrFaction: 'Bắc Lương Biên Quân -> Đại Càn Binh Bộ Đại Tướng Quân',
    factionPosition: 'Bắc Lương Tổng Binh -> Trấn Quốc Thượng Tướng Quân',
    personality: 'Cương trực, trung thành tận tụy, xem binh sĩ như con ruột, không sợ cường quyền tiên môn.',
    appearance: 'Râu hùm hàm én, mất cánh tay trái trong trận huyết chiến với lang tộc, trên mặt có ba vết sẹo kiếm sâu hoắm, tay phải cầm Phá Quân Trọng Thương.',
    weaponOrAbility: 'Hắc Thiết Phá Quân Thương, Vạn Nhân Huyết Sát Quân Trận',
    destinyFate: 'Thất Sát Chiến Tướng',
    backstory: 'Lão tướng trấn thủ Bắc Lương ba mươi năm, chứng kiến bao đồng đội chết đói vì bị tu sĩ khấu trừ quân lương. Khi Tiêu Cảnh đến, ông quỳ rạp dưới chân Thái Tử, đem ba ngàn thiết kỵ tàn binh giao phó.'
  },
  {
    id: 'char_lanh_vo_nhai',
    name: 'Lãnh Vô Nhai',
    pinyinOrAlias: 'Vấn Tiên Kiếm Tổ / Đoạt Mạch Lão Quái',
    role: 'Phản diện',
    gender: 'Nam',
    age: '800 tuổi',
    realmOrRank: 'Nguyên Anh Đỉnh Phong -> Bán Bộ Hóa Thần',
    sectOrFaction: 'Vấn Tiên Tông (Đệ Nhất Tiên Môn Đại Càn)',
    factionPosition: 'Thái Thượng Trưởng Lão / Kẻ thao túng hoàng triều',
    personality: 'Ngạo mạn, coi phàm nhân như kiến cỏ sâu bọ, coi giang sơn xã tắc chỉ là linh điền nuôi dưỡng thọ mệnh cho bản thân.',
    appearance: 'Tóc trắng xõa dài, đạo bào thêu kiếm đồ lăng nhăng, mắt lóe u quang xám xịt, tay cầm Đoạt Vận Trấn Linh Kiếm.',
    weaponOrAbility: 'Cửu U Hút Linh Trận, Vạn Kiếm Quy Tông, Đoạt Mạch Cổ Đinh',
    destinyFate: 'Đoạt Mệnh Kiêu Hùng (Tà Đạo Thao Túng)',
    backstory: 'Tám trăm năm trước phát hiện ra bí mật Cửu Châu Long Mạch, đã lén cắm chín cây Trấn Linh Đinh vào lòng đất chín châu để hút cạn quốc vận Đại Càn nuôi dưỡng tu vi trường sinh cho riêng mình.'
  },
  {
    id: 'char_tieu_huc',
    name: 'Tiêu Húc',
    pinyinOrAlias: 'Càn Nguyên Ngụy Đế / Búp Bê Hoàng Đế',
    role: 'Phản diện',
    gender: 'Nam',
    age: '24 tuổi',
    realmOrRank: 'Kim Đan Sơ Kỳ (Dùng đan dược cưỡng ép thăng cấp)',
    sectOrFaction: 'Đại Càn Hoàng Tộc (Hoàng Cung Kinh Đô)',
    factionPosition: 'Ngụy Đế kế vị sau khi hãm hại Tiêu Cảnh',
    personality: 'Ganh ghét hẹp hòi, đa nghi tàn bạo, cam tâm làm con rối cho Vấn Tiên Tông để ngồi vững trên ngai vàng.',
    appearance: 'Mặt trắng không râu, ánh mắt hèn hạ trốn tránh, long bào khoác trên người rộng thùng thình lố lăng.',
    weaponOrAbility: 'Ngụy Long Kiếm, Hóa Cốt Hủ Linh Độc',
    destinyFate: 'Khôi Lỗi Hôn Quân',
    backstory: 'Hoàng huynh thứ ba của Tiêu Cảnh, luôn ghen ghét với tài năng và sự kính trọng của muôn dân dành cho Tiêu Cảnh. Cấu kết với Lãnh Vô Nhai để hạ độc cha già, cướp đoạt thánh chỉ phế truất Tiêu Cảnh.'
  },
  {
    id: 'char_da_sat',
    name: 'Dạ Sát Yêu Vương',
    pinyinOrAlias: 'Thôn Thiên Huyết Lang / Vạn Yêu Lĩnh Chi Chủ',
    role: 'Trung lập',
    gender: 'Nam',
    age: '600 tuổi',
    realmOrRank: 'Yêu Vương Cảnh (Tương đương Kim Đan Hậu Kỳ)',
    sectOrFaction: 'Thiên Yêu Cổ Lĩnh',
    factionPosition: 'Thủ lĩnh liên minh Yêu Tộc phương Bắc',
    personality: 'Hung hãn khát máu nhưng trọng danh dự và kẻ mạnh, căm thù các tu sĩ bắt con cháu yêu tộc luyện đan.',
    appearance: 'Đầu sói thân người cao hai trượng, khoác áo lông huyết lang, móng vuốt đen nhánh xé toạc huyền thiết.',
    weaponOrAbility: 'Thiên Lang Phệ Nguyệt Trảo, Huyết Hải Cuồng Triều',
    destinyFate: 'Lang Tộc Bá Vương',
    backstory: 'Bị Vấn Tiên Tông phong ấn lừa gạt hàng trăm năm. Sau khi bị Tiêu Cảnh đánh bại trên chiến trường bằng quân trận kỷ luật, đã kính phục nghĩa khí và ký hiệp ước đồng minh Phàm - Yêu.'
  },
  {
    id: 'char_mo_dung_cam',
    name: 'Mộ Dung Cẩm',
    pinyinOrAlias: 'Cửu Châu Kim Thiềm / Vạn Bảo Lâu Tổng Lâu Chủ',
    role: 'Trung lập',
    gender: 'Nữ',
    age: '26 tuổi',
    realmOrRank: 'Chiến Tướng Trung Kỳ (Ẩn giấu thực lực Trúc Cơ Viên Mãn)',
    sectOrFaction: 'Vạn Bảo Lâu Thương Hội',
    factionPosition: 'Thiên Hạ Đệ Nhất Gian Thương & Thủ Lĩnh Mạng Lưới Điệp Báo',
    personality: 'Thực dụng, thấy lợi sáng mắt nhưng có tầm nhìn thiên hạ phi thường. Nắm giữ mạch máu kinh tế ngầm của toàn bộ chín châu.',
    appearance: 'Xinh đẹp kiều diễm, áo lụa hoa sen vàng kim, tay cầm quạt chuông ngọc khẽ phe phẩy, nụ cười ẩn giấu vạn mưu mô.',
    weaponOrAbility: 'Cửu Bảo Lưu Ly Thuẫn, Ngân Huyết Phi Châm, Vạn Dặm Truyền Âm Đĩa',
    destinyFate: 'Thương Đạo Kỳ Nữ',
    backstory: 'Ban đầu chỉ coi Tiêu Cảnh là một mối làm ăn mạo hiểm, nhưng sau khi thấy Bắc Lương quật khởi đã đem toàn bộ sản nghiệp và mạng lưới tình báo chín châu đặt cược vào Tiêu Cảnh.'
  }
];

// =========================================================================
// HỒ SƠ CHI TIẾT ĐẠI CÀN TIÊN TRIỀU (STORY BIBLE DOSSIER)
// =========================================================================

export const TIEN_TRIEU_DETAILED_DOSSIER: StoryBibleDetailedDossier = {
  grandTitle: 'ĐẠI CÀN TIÊN TRIỀU: CỬU LONG KHAI QUỐC LỤC',
  storyPhilosophy: 'Trời đất sinh ra vạn vật nuôi người, không có tiên thần nào sinh ra đã đứng trên đầu trăm họ. Giang sơn này do muôn dân cày cấy đổ máu bảo vệ, thì quốc vận và linh khí phải phụng sự muôn dân!',
  protagonistProfile: TIEN_TRIEU_CHARACTERS[0],
  majorCharacters: TIEN_TRIEU_CHARACTERS,
  exclusiveRealms: [
    {
      level: 1,
      realmName: 'Binh Huyết Kỳ (Quân Dân Đồng Tu)',
      stages: 'Sơ Kỳ (Luyện Bì) -> Trung Kỳ (Đoán Cốt) -> Hậu Kỳ (Binh Sát Thành Khí) -> Viên Mãn',
      breakthroughPhenomenon: 'Huyết khí ngưng tụ thành chiến kỳ đỏ rực, da thịt đao thương phàm tục không thể đâm thủng.',
      daoRiskAndBottleneck: 'Nếu lòng quân tan rã hoặc tướng soái hèn nhát, Binh Sát sẽ phản phệ làm đứt kinh mạch.',
      exclusiveDivineAbility: 'Binh Sát Hộ Thể (Miễn nhiễm linh áp của tu sĩ Luyện Khí / Trúc Cơ sơ kỳ)'
    },
    {
      level: 2,
      realmName: 'Chiến Tướng Kỳ (Khí Phách Hóa Cương • Trúc Cơ Tiên Triều)',
      stages: 'Hạ Vị Tướng -> Trung Vị Tướng -> Thượng Vị Tướng -> Đại Tướng Quân Vị',
      breakthroughPhenomenon: 'Chiến ý ngút trời hóa thành dị tượng Hổ Báo gầm vang, chỉ huy vạn quân hô ứng như một cơ thể.',
      daoRiskAndBottleneck: 'Bẫy tâm lý chiến và trận đồ huyễn thuật của tiên môn dễ làm rối loạn quân cơ.',
      exclusiveDivineAbility: 'Vạn Quân Đồng Lực (Tập hợp sát khí của ba ngàn binh sĩ chém ra một kích phá nát linh thuẫn)'
    },
    {
      level: 3,
      realmName: 'Long Hồn Kỳ (Khai Mở Địa Mạch • Kim Đan Quốc Vận)',
      stages: 'Địa Long -> Giang Sơn Long -> Trấn Quốc Long -> Chân Long Viên Mãn',
      breakthroughPhenomenon: 'Kim Long hư ảnh dài trăm trượng uốn lượn trên bầu trời thành trì, đất đai màu mỡ sinh sôi.',
      daoRiskAndBottleneck: 'Cọc phong thủy Trấn Linh Đinh của các tông môn đâm sâu vào long huyệt gây đau đớn dữ dội.',
      exclusiveDivineAbility: 'Hoàng Long Trảm Kiếm (Chém gãy tiên kiếm và phong ấn pháp bảo của tu sĩ Kim Đan)'
    },
    {
      level: 4,
      realmName: 'Hoàng Cực Chân Thân (Nguyên Anh Tiên Triều • Khẩu Xuất Pháp Tùy)',
      stages: 'Huyền Hoàng Thân -> Xã Tắc Thân -> Cửu Châu Thân -> Thánh Đức Thần Thân',
      breakthroughPhenomenon: 'Hoàng đế khoác áo bào nhật nguyệt tinh thần, lời nói ra thành thiên luật trừng phạt phản nghịch.',
      daoRiskAndBottleneck: 'Gánh chịu nhân quả và đau khổ của hàng triệu bách tính nếu đất nước gặp thiên tai chiến loạn.',
      exclusiveDivineAbility: 'Cửu Châu Thần Vực (Trong cương thổ quốc gia, tu sĩ tông môn bị phong ấn 50% tu vi)'
    },
    {
      level: 5,
      realmName: 'Vạn Cổ Thánh Hoàng (Hóa Thần Khai Quốc • Toàn Cương Thổ Thăng Thiên)',
      stages: 'Định Đỉnh -> Lập Giới -> Khai Thiên -> Bất Diệt Tiên Triều',
      breakthroughPhenomenon: 'Chín cỗ Thần Đỉnh chiếu rọi hư không, kéo theo toàn bộ núi sông làng mạc bay lên tiên giới ngạo thị chư thần.',
      daoRiskAndBottleneck: 'Thiên đạo thiên kiếp của Thượng Giới giáng xuống Lôi Phạt diệt quốc vì dám đưa phàm nhân thăng thiên.',
      exclusiveDivineAbility: 'Cửu Đỉnh Trấn Thiên (Đập tan thiên kiếp, bắt chư thiên tiên phật phải quỳ lạy trước pháp luật Tiên Triều)'
    }
  ],
  supremeCultivationArts: [
    {
      name: 'Cửu Long Thiên Mệnh Kinh',
      tier: 'Thần Cấp Hoàng Đạo Công Pháp',
      description: 'Công pháp khai quốc độc nhất vô nhị do Tiêu Cảnh lĩnh ngộ từ Long Mạch Thần Ngọc, tu luyện bằng lòng dân và quốc vận thay vì linh thạch.',
      layersSummary: 'Tầng 1-3: Đúc Binh Huyết Quân Hồn. Tầng 4-6: Triệu hoán Chân Long trấn áp chín châu. Tầng 7-9: Đúc Thần Đỉnh phi thăng.',
      forbiddenMove: 'Cửu Long Nghịch Trảm (Dồn toàn bộ khí vận chín châu vào một nhát chém chém đứt đầu thượng giới tiên nhân)'
    },
    {
      name: 'Mặc Gia Thần Cơ Huyền Thuật',
      tier: 'Thánh Phẩm Cơ Quan & Trận Đạo',
      description: 'Hệ thống chế tạo vũ khí cơ quan của Thẩm Mộ Vân, biến quặng sắt và địa hỏa thành vũ khí hủy diệt hộ sơn đại trận.',
      layersSummary: 'Khí Hóa Cơ Quan -> Phá Linh Nỏ Trận -> Địa Hỏa Cự Pháo -> Cửu Cung Khôi Lỗi Quân Đoàn.',
      forbiddenMove: 'Vạn Pháo Tề Minh (Ngàn khẩu cự pháo bắn cùng lúc làm sụp đổ hoàn toàn một ngọn linh sơn tông môn)'
    }
  ],
  supremeArtifacts: [
    {
      name: 'Cửu Châu Long Mạch Thần Ngọc',
      rank: 'Thái Cổ Khởi Nguyên Thần Vật',
      origin: 'Mảnh ngọc trung tâm của địa mạch Cửu Châu từ thời hồng hoang để lại',
      specialPower: 'Cảm ứng vị trí long mạch, định vị cọc phong thủy trấn linh của kẻ thù, chuyển hóa lòng dân thành linh lực bất tận'
    },
    {
      name: 'Khai Quốc Cửu Đỉnh',
      rank: 'Tiên Thiên Chí Bảo Thần Triều',
      origin: 'Do Tiêu Cảnh gom toàn bộ binh khí của trăm tông môn bại trận nung chảy đúc thành tại Bắc Lương',
      specialPower: 'Trấn áp khí vận chín châu, phong ấn mọi ma khí và yêu thuật trong phạm vi trăm vạn dặm'
    },
    {
      name: 'Chấn Thiên Phá Linh Cự Pháo',
      rank: 'Cơ Quan Thần Binh Cực Phẩm',
      origin: 'Tuyệt tác của Mặc Gia Cơ Quan Môn và Bắc Lương Thiết Xưởng',
      specialPower: 'Bắn ra đạn địa hỏa phá linh năng, một phát bắn có thể xé rách hộ sơn kết giới của tông môn thượng đẳng'
    }
  ],
  majorFactions: [
    {
      id: 'fac_bac_luong',
      name: 'Bắc Lương Thiết Kỵ & Tiên Triều Nghĩa Quân',
      type: 'Quân đội hoàng triều cải cách',
      leader: 'Tiêu Cảnh & Triệu Chấn',
      territory: 'Bắc Lương Phong Tuyết Quan -> Toàn bộ Chín Châu Đại Càn',
      doctrine: 'Binh dân như một, kỷ luật sắt thép, kiếm đao bảo vệ bách tính, không quỳ trước thần tiên',
      relationshipWithProtagonist: 'Lực lượng nòng cốt trung thành tuyệt đối',
      hiddenSecret: 'Sở hữu hầm mỏ Hắc Kim ngầm và bản vẽ cơ quan tối mật của Mặc Gia'
    },
    {
      id: 'fac_van_tien_tong',
      name: 'Vấn Tiên Tông & Tam Đại Cát Cứ Tiên Môn',
      type: 'Tông môn tu tiên thế gia lộng quyền',
      leader: 'Lãnh Vô Nhai',
      territory: 'Vấn Tiên Linh Sơn, U Châu, Thanh Châu',
      doctrine: 'Phàm nhân như cỏ rác, trời đất chỉ sinh ra để tu sĩ cầu trường sinh thọ khảo',
      relationshipWithProtagonist: 'Kẻ thù sinh tử không đội trời chung',
      hiddenSecret: 'Cắm Trấn Linh Đinh hút cạn nguyên khí đất nước để chuyển hóa thành Tiên Đan cho lão tổ'
    },
    {
      id: 'fac_thien_yeu_linh',
      name: 'Vạn Yêu Cổ Lĩnh',
      type: 'Yêu tộc liên minh phương Bắc',
      leader: 'Dạ Sát Yêu Vương',
      territory: 'Băng Nguyên Hoang Mạc & Thập Vạn Đại Sơn',
      doctrine: 'Cá lớn nuốt cá bé, bảo vệ lãnh thổ cổ xưa của giống loài',
      relationshipWithProtagonist: 'Từ kẻ thù biên ải biến thành minh hữu đồng minh',
      hiddenSecret: 'Bị tông môn lừa gạt lấy máu yêu thú hàng trăm năm để luyện đan'
    }
  ],
  volumes: [],
  subStoryTrajectories: [
    {
      title: 'Mối Tình Cơ Quan & Đế Vương (Tiêu Cảnh - Thẩm Mộ Vân)',
      type: 'Tình cảm mưu lược sâu sắc',
      hook: 'Nữ tử cơ quan lạnh lùng gặp phế hoàng tử đầy chí lớn trong bão tuyết biên cương',
      convergencePoint: 'Cùng đứng trên đài Thiên Đàn đúc Cửu Đỉnh xưng đế'
    },
    {
      title: 'Huyết Hải Thâm Cừu Của Mặc Gia',
      type: 'Báo thù chính đạo',
      hook: 'Lần theo dấu tích các cỗ xe khôi lỗi bị tàn sát năm xưa dẫn tới kho tàng bí mật của Mặc Môn',
      convergencePoint: 'Phá hủy cấm địa Vấn Tiên Tông, rửa sạch nỗi oan cho Mặc Gia'
    }
  ]
};

// =========================================================================
// BỘ CÂY CỐT TRUYỆN ĐA TẦNG CHI TIẾT (PRESET_TIEN_TRIEU_NOVEL_TREE)
// Cấu trúc phân cấp hoàn chỉnh:
// NOVEL (Đại Càn Tiên Triều)
//   ├── PART (5 Quyển: Quyển 1 -> Quyển 5)
//   │     ├── ACT (Các Hồi / Phần lớn)
//   │     │     ├── CHAPTER (Các Chương cụ thể)
//   │     │     │     ├── SECTION (Các Mục / Phân cảnh tình tiết)
// =========================================================================

export const PRESET_TIEN_TRIEU_NOVEL_CONFIG: NovelConfig = {
  genre: 'Kiếm Hiệp Kỳ Tình',
  tone: 'Uy nghi hoàng đế, mưu lược chính trị thâm sâu, khí thế hào hùng, khai quốc tranh bá, bi tráng dạt dào',
  pov: 'Ngôi thứ ba (Đế vương bá khí, theo sát Thái Tử Tiêu Cảnh)',
  setting: 'Đại Càn Cổ Quốc thời kỳ suy vi — Các đại tông môn cát cứ lộng quyền hút cạn linh mạch, yêu tộc biên cương xâm lấn, triều đình mục ruỗng.',
  mainCharacter: 'Tiêu Cảnh - Phế Thái Tử bị lưu đày biên ải, thức tỉnh Cửu Châu Long Mạch Thần Ngọc',
  plotIdea: 'Phế Thái Tử Tiêu Cảnh bị hoàng huynh vu hãm đày ra biên cương cằn cỗi. Tại đây, hắn thức tỉnh Cửu Châu Long Mạch Đồ, phát hiện các tông môn ngàn năm qua đang lén lút cắm cọc phong thủy hút cạn sinh khí của đất nước. Tiêu Cảnh cởi hoàng bào khoác chiến giáp, cùng ba ngàn thiết kỵ đổ máu giữ yên biên thùy. Hắn dùng khoa kỹ cơ quan khí hóa, nỏ thần liên châu và luật pháp nghiêm minh đánh tan yêu tộc, ép tông môn phục tùng, thống nhất chín châu lập nên Đại Càn Tiên Triều bất diệt.',
  worldRules: 'Tu luyện mượn Quốc Vận Hoàng Long: Binh Huyết -> Chiến Tướng (Trúc Cơ) -> Long Hồn (Kim Đan) -> Hoàng Cực Chân Thân (Nguyên Anh) -> Thánh Hoàng (Hóa Thần).'
};

export const PRESET_TIEN_TRIEU_NOVEL_TREE: NovelNode = {
  id: 'node_root_dai_can_tien_trieu',
  type: NodeType.NOVEL,
  title: 'ĐẠI CÀN TIÊN TRIỀU: CỬU LONG KHAI QUỐC LỤC',
  summary: 'Thiên sử thi Tiên Triều hoành tráng về một phế hoàng tử dùng thiết huyết quân đội, vũ khí cơ quan và long mạch khí vận thống nhất giang sơn chín châu, đúc Cửu Đỉnh bắt chư tiên quỳ phục, đưa cả nước phi thăng.',
  content: 'Sơn hà chín châu, vạn dân gào thét dưới gót giày của chư tiên tông môn. Hôm nay, một phế hoàng tử khoác chiến giáp, dựng cờ Tiên Triều giữa gió tuyết biên thùy!',
  isExpanded: true,
  children: [
    // -----------------------------------------------------------------------
    // QUYỂN 1: BIÊN THÙY THIẾT HUYẾT • KHỞI TỬ HỒI SINH
    // -----------------------------------------------------------------------
    {
      id: 'vol_trieu_1_bien_ai',
      type: NodeType.PART,
      title: 'Quyển 1: Biên Thùy Thiết Huyết • Khởi Tử Hồi Sinh',
      summary: 'Giai đoạn Binh Huyết Kỳ. Phế Thái Tử Tiêu Cảnh bị lưu đày Bắc Lương Phong Tuyết Quan, thức tỉnh Cửu Châu Long Mạch Đồ, rèn luyện ba ngàn tàn binh thiết kỵ, đánh bại yêu tộc dạ tập.',
      content: 'Mở đầu cuộc đời lưu đày đầy uất hận nhưng quật khởi phi thường của Tiêu Cảnh nơi biên cương lạnh giá.',
      isExpanded: true,
      children: [
        // HỒI 1
        {
          id: 'act_trieu_1_1',
          type: NodeType.ACT,
          title: 'Hồi 1: Chiếu Đày Biên Ải • Thức Tỉnh Cổ Đồ',
          summary: 'Tiêu Cảnh nhận chiếu lưu đày, diện kiến tàn quân Bắc Lương đói rét, kích hoạt Cửu Châu Long Mạch Thần Ngọc trong cổ miếu.',
          content: 'Khởi đầu từ đáy cùng của tuyệt vọng, biến uất hận thành ngọn lửa phục sinh.',
          isExpanded: true,
          children: [
            // CHƯƠNG 1
            {
              id: 'chap_trieu_1_bien_quan',
              type: NodeType.CHAPTER,
              title: 'Chương 1: Chiếu Chỉ Đày Ải, Long Mạch Cổ Đồ Hiển Linh',
              summary: 'Tiêu Cảnh nhận chiếu lưu đày nơi ải Bắc Lương lạnh giá. Tại cổ miếu đổ nát, hắn nhỏ máu kích hoạt Cửu Châu Long Mạch Đồ.',
              content: `Bắc Lương Phong Tuyết Quan, gió lạnh cắt da cắt thịt.

Tiêu Cảnh đứng trên bờ tường thành nứt nẻ, khoác chiếc áo choàng rách rưới bạc màu. Trong tay hắn là một cuộn giấy vàng đã bị rách góc — thánh chỉ phế truất ngôi vị Thái Tử và đày ải hắn ra biên ải vĩnh viễn không được về kinh.

"Điện hạ, quân lương tháng này của Bắc Lương Quan lại bị Vấn Tiên Tông khấu trừ tám phần. Binh sĩ trong thành đã ba ngày chỉ ăn cháo loãng..." Lão tướng già cụt một tay quỳ sụp dưới chân hắn, giọng nghẹn ngào trong gió tuyết.

Tiêu Cảnh không đáp. Hắn nhìn xuống thành trì xơ xác nơi mười vạn bách tính đang run rẩy vì đói rét, rồi lại ngước nhìn ngọn linh sơn của Vấn Tiên Tông cách đó trăm dặm — nơi cung điện nguy nga rực rỡ, linh khí cuồn cuộn như mây ngũ sắc.

"Khấu trừ tám phần sao? Các tông môn hút cạn tủy của bách tính để cầu trường sinh... Hôm nay, bản vương sẽ lấy lại từng giọt khí vận của sơn hà này!"`,
              children: [
                {
                  id: 'sec_trieu_1_1_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Phong Tuyết Biên Thành, Cháo Loãng Nuôi Tàn Binh',
                  summary: 'Khung cảnh Bắc Lương hoang tàn, mười vạn dân đói rét và nỗi uất nghẹn của ba ngàn lão binh biên phòng.',
                  content: 'Bão tuyết gào thét bên ngoài Phong Tuyết Quan. Trong nồi quân dụng chỉ có nước sôi nấu cùng rễ cỏ dại. Triệu Chấn run rẩy bưng bát nước lõng bõng dâng lên Tiêu Cảnh.',
                  children: []
                },
                {
                  id: 'sec_trieu_1_1_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Cổ Miếu Huyết Tế, Cửu Châu Long Đồ Khai Mở',
                  summary: 'Tiêu Cảnh bước vào cổ miếu thờ Cửu Đỉnh hoang tàn, giọt máu rơi trên bệ đá đánh thức ngọc tỷ thái cổ.',
                  content: 'Bệ đá rung chuyển dữ dội. Một luồng kim quang từ lòng đất bốc thẳng lên đỉnh đầu Tiêu Cảnh. Cửu Châu Long Mạch Đồ hiện ra trong tâm thức, soi tỏ chín long huyệt đang bị đinh hắc ám phong tỏa.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 2
            {
              id: 'chap_trieu_2_ren_long_ky',
              type: NodeType.CHAPTER,
              title: 'Chương 2: Luyện Khí Binh Trận, Ba Ngàn Thiết Kỵ Rửa Tủy',
              summary: 'Dùng Long Khí tẩy tủy cho ba ngàn binh sĩ, chế tạo nỏ cơ quan bắn thủng linh quang tu sĩ, binh sát ngưng tụ thành chiến kỳ.',
              content: `Sân tập bắn Bắc Lương vang rền tiếng hò hét. Ba ngàn thiết kỵ ngồi xếp bằng theo trận thế Cửu Cung. 

Tiêu Cảnh đứng trên kỳ đài, vận chuyển Cửu Long Thiên Mệnh Kinh. Luồng kim khí thuần khiết từ long mạch ngầm rót thẳng vào đan điền từng người lính. Mùi máu tanh và độc tố lưu cữu trong cơ thể họ bị trục xuất ra ngoài, khí huyết sôi trào như dung nham.

"Huyết khí của các ngươi không phải là tro bụi! Nó là tường đồng vách sắt của sơn hà này!" Tiêu Cảnh vung kiếm chém đứt tảng cự thạch trước mặt. Ba ngàn binh sĩ đồng thanh gầm vang, Binh Sát bốc lên nhuộm đỏ bầu trời tuyết trắng.`,
              children: [
                {
                  id: 'sec_trieu_1_2_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Tẩy Tủy Phạt Mao, Khai Mở Binh Huyết Trọng Đầu',
                  summary: 'Ba ngàn thương binh Bắc Lương được tái tạo kinh mạch, sức mạnh tăng vọt tương đương Luyện Khí viên mãn.',
                  content: 'Những vết sẹo cũ lành lại, cánh tay cụt của Triệu Chấn mọc ra mầm thịt bao bọc bởi sát khí màu đỏ sẫm. Quân đội phàm nhân bắt đầu biến đổi kỳ diệu.',
                  children: []
                },
                {
                  id: 'sec_trieu_1_2_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Thiết Giáp Cải Tạo, Nỏ Thần Phá Tiên Xuất Lò',
                  summary: 'Thẩm Mộ Vân gia nhập quân doanh, lắp ráp năm trăm cỗ liên châu thần nỏ đầu tiên tẩm chu sa phá linh khí.',
                  content: 'Thẩm Mộ Vân bước ra từ lò rèn với gương mặt lấm lem than đá. Chiếc nỏ thần bằng thép đen trong tay nàng bắn ra một phát xuyên thủng bia đá dày ba thước cách xa trăm trượng.',
                  children: []
                }
              ]
            }
          ]
        },
        // HỒI 2
        {
          id: 'act_trieu_1_2',
          type: NodeType.ACT,
          title: 'Hồi 2: Yêu Triều Xâm Lấn • Nhất Chiến Định Biên Cương',
          summary: 'Dạ Sát Yêu Vương thống lĩnh mười vạn lang tộc tấn công Bắc Lương, Tiêu Cảnh dùng chiến thuật liên hoàn cơ quan và Binh Sát trảm sát Yêu Tướng.',
          content: 'Trận đánh sinh tử quyết định sự tồn vong của Bắc Lương Quan trước biển dã thú đói khát.',
          isExpanded: true,
          children: [
            // CHƯƠNG 3
            {
              id: 'chap_trieu_3_lang_toc',
              type: NodeType.CHAPTER,
              title: 'Chương 3: Huyết Nguyệt Dạ Tập, Cửu Liên Thần Nỏ Bắn Hạ Lang Vương',
              summary: 'Mười vạn yêu lang tràn qua sông băng, Tiêu Cảnh bình tĩnh chỉ huy trận địa nỏ thần và địa hỏa mai phục tiêu diệt tiên phong địch.',
              content: `Mặt trăng trên đỉnh Phong Tuyết Quan nhuộm một màu đỏ như máu.

Tiếng sói tru rợn tóc gáy vang lên từ bốn phương tám hướng. Mười vạn con Thiết Giáp Lang mắt xanh lè lao qua dòng sông băng như thủy triều đen ngòm. Trên lưng một con Cự Lang đầu đàn, Lang Tướng Kim Đan nhe nanh cười man dại: "Hôm nay, thịt của mười vạn người phàm ở Bắc Lương sẽ lót dạ cho con cháu ta!"

"Bắn!" Tiêu Cảnh lạnh lùng hạ cờ lệnh.

Hàng ngàn mũi tên nỏ phá linh mang theo lửa địa hỏa rít lên xé gió. Trong nháy mắt, màn đêm bị chiếu sáng rực rỡ bởi những chùm pháo hoa hủy diệt!`,
              children: [
                {
                  id: 'sec_trieu_1_3_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Mưa Tên Xuyên Giáp, Bẫy Địa Hỏa Chôn Vùi Tiên Phong',
                  summary: 'Địa hỏa bùng nổ làm tan băng sông biên giới, nhấn chìm ba vạn yêu lang xuống dòng nước băng giá.',
                  content: 'Tiếng nổ đinh tai nhức óc làm rung chuyển cả ngọn núi. Băng vỡ toác thành từng mảng lớn, dòng nước cuốn trôi hàng ngàn xác yêu thú.',
                  children: []
                },
                {
                  id: 'sec_trieu_1_3_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Trọng Thương Trảm Tướng, Binh Huyết Ép Lùi Yêu Khí',
                  summary: 'Triệu Chấn dẫn đầu năm trăm kỵ binh cảm tử đâm thẳng vào trung quân, Tiêu Cảnh vung kiếm chém đứt đầu Lang Tướng.',
                  content: 'Đầu sói khổng lồ rơi lăn lốc dưới chân ngựa Tiêu Cảnh. Cả bầy yêu ma ngưng bặt tiếng gầm, bàng hoàng nhìn vị phế hoàng tử đang tắm trong ánh kim quang hoàng long.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 4
            {
              id: 'chap_trieu_4_thu_cuong',
              type: NodeType.CHAPTER,
              title: 'Chương 4: Thu Phục Yêu Lĩnh, Tuyên Thệ Biên Cương Bất Diệt',
              summary: 'Dạ Sát Yêu Vương đích thân đến đàm phán, Tiêu Cảnh dùng ân uy song hành buộc Yêu Tộc ký hiệp ước không xâm phạm, thu về vô số quặng sắt bí mật.',
              content: `Dạ Sát Yêu Vương đứng sừng sững giữa gió tuyết, nhìn vào ba ngàn binh sĩ phàm nhân đang đứng thẳng hàng ngay ngắn, không một ai chớp mắt trước uy áp Yêu Vương.

"Ngươi là hoàng tử loài người đầu tiên không dùng yêu thú để tế đàn luyện đan." Yêu Vương gầm gừ trầm thấp.

Tiêu Cảnh tra kiếm vào vỏ: "Bắc Lương cần quặng sắt để rèn cày cuốc và súng đạn, các ngươi cần muối và lương thực. Từ hôm nay, biên giới này mở chợ giao thương. Kẻ nào vi phạm luật pháp, dù là người hay yêu, đều trảm!"`,
              children: [
                {
                  id: 'sec_trieu_1_4_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Đàm Phán Giữa Bão Tuyết, Hiệp Ước Bắc Lương Ra Đời',
                  summary: 'Bản hiệp ước lịch sử giữa phàm nhân và yêu tộc chấm dứt ba trăm năm chiến tranh đổ máu vô nghĩa.',
                  content: 'Hai bên cùng cắt máu ăn thề. Lần đầu tiên trong lịch sử Đại Càn, biên cương phương Bắc có được sự bình yên thực sự.',
                  children: []
                },
                {
                  id: 'sec_trieu_1_4_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Lập Lò Rèn Khổng Lồ, Chuẩn Bị Chiến Dịch Phạt Tiên',
                  summary: 'Quặng Hắc Kim từ Yêu Lĩnh đổ về Bắc Lương, khói lò rèn đỏ rực thâu đêm suốt sáng chuẩn bị cho cuộc đụng độ với Vấn Tiên Tông.',
                  content: 'Mười vạn người dân cùng chung tay đập búa kéo bễ. Tiếng kim loại va chạm vang lên như bản anh hùng ca quật khởi.',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // QUYỂN 2: CƠ QUAN PHẠT TIÊN • ÉP TÔNG MÔN PHỤC LUẬT
    // -----------------------------------------------------------------------
    {
      id: 'vol_trieu_2_phat_tien',
      type: NodeType.PART,
      title: 'Quyển 2: Cơ Quan Phạt Tiên • Ép Tông Môn Phục Luật',
      summary: 'Giai đoạn Chiến Tướng Kỳ. Đúc thành Chấn Thiên Phá Linh Cự Pháo, tuyên chiến với sự bóc lột của các đại tiên môn, đại phá hộ sơn đại trận Vấn Tiên Tông, ép chưởng môn quỳ lạy nhận quan chức Tiên Triều.',
      content: 'Cuộc đối đầu toàn diện giữa pháp luật phàm nhân và quyền uy siêu nhiên của các tu sĩ tự xưng thần tiên.',
      isExpanded: true,
      children: [
        // HỒI 1
        {
          id: 'act_trieu_2_1',
          type: NodeType.ACT,
          title: 'Hồi 1: Rèn Đúc Phá Linh Pháo • Tuyên Đọc Hịch Phạt Tiên',
          summary: 'Thẩm Mộ Vân hoàn tất cỗ đại pháo cơ quan đầu tiên, sứ giả Vấn Tiên Tông đến đòi cống nạp bị Tiêu Cảnh xử trảm.',
          content: 'Tuyên chiến công khai với thế lực tông môn thống trị ngàn năm.',
          isExpanded: true,
          children: [
            // CHƯƠNG 5
            {
              id: 'chap_trieu_5_khai_khoang',
              type: NodeType.CHAPTER,
              title: 'Chương 5: Nữ Sư Cơ Quan Thần Kỹ, Chấn Thiên Cự Pháo Xuất Sơn',
              summary: 'Thẩm Mộ Vân kết hợp trận pháp phù triện và khoa kỹ cơ quan đúc thành mười cỗ đại pháo phá linh có thể bắn nổ kết giới Kim Đan.',
              content: `Bên trong hầm ngầm của Bắc Lương Thiết Xưởng, một cỗ cự thú bằng đồng đen và huyền thiết lừng lững hiện ra. Thân pháo dài năm trượng, nòng pháo khắc chìm ba mươi sáu tầng lôi phù.

"Điện hạ, đây là Chấn Thiên Phá Linh Pháo." Thẩm Mộ Vân khẽ lau mồ hôi trên trán, ánh mắt rực sáng niềm kiêu hãnh: "Một phát bắn này tích tụ địa hỏa nguyên thạch, đủ sức nghiền nát hộ sơn đại trận của bất kỳ tông môn nào dưới tam phẩm!"

Tiêu Cảnh vuốt ve thân pháo lạnh buốt, cảm nhận được nhịp đập của sắt thép và ý chí phàm nhân: "Tốt lắm! Có thứ này, chư tiên không thể trốn trong mây mà cười nhạo trần gian nữa rồi!"`,
              children: [
                {
                  id: 'sec_trieu_2_5_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Mặc Môn Bí Khóa, Khai Mở Thần Cơ Lôi Đạn',
                  summary: 'Quy trình chế tạo đạn phá linh chứa chu sa và khoáng thạch triệt tiêu linh lực.',
                  content: 'Những viên đạn pháo tròn trịa đen bóng được vận chuyển cẩn thận trên các xe đẩy đệm lò xo.',
                  children: []
                },
                {
                  id: 'sec_trieu_2_5_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Bắn Thử Bên Vực Sâu, Một Đòn Xuyên Thủng Núi Đá',
                  summary: 'Phát bắn thử nghiệm đầu tiên làm sụp đổ một ngọn đồi đá vôi cách xa năm dặm, làm kinh động toàn bộ trinh sát tiên môn.',
                  content: 'Khói thuốc súng màu xanh lam bốc lên cuồn cuộn. Ngọn núi đối diện nổ tung thành hàng triệu mảnh đá vụn.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 6
            {
              id: 'chap_trieu_6_hich_van',
              type: NodeType.CHAPTER,
              title: 'Chương 6: Hịch Văn Phạt Tiên, Trảm Sứ Tế Cờ Khởi Nghĩa',
              summary: 'Chấp sự Vấn Tiên Tông đến đòi nộp cống nữ và quân lương, Tiêu Cảnh luận tội ba mươi sáu tội ác của tông môn rồi chém đầu sứ giả.',
              content: `Chấp sự Vấn Tiên Tông — một tu sĩ Trúc Cơ trung kỳ — ngạo nghễ bước vào sảnh nghị sự, mũi hếch lên trời: "Tiêu Cảnh! Ngươi chỉ là một phế thái tử bị ruồng bỏ, dám giữ lại quân lương của Bắc Lương? Mau nộp đủ mười vạn thạch lương và năm ngàn thiếu nữ cho sơn môn, bằng không tông môn chỉ cần một chiếu thư là ngươi mất đầu!"

Tiêu Cảnh ngồi trên đại điện, ánh mắt lạnh như băng giá ngàn năm. Hắn cầm lên một cuộn lụa đỏ thắm:

"Vấn Tiên Tông chiếm ba mươi vạn dặm ruộng tốt không nộp thuế, bắt bách tính làm nô lệ đào mỏ, lén cắm cọc phong thủy hút cạn linh khí quốc gia... Ba mươi sáu tội trạng này, ngươi có nhận không?"

"Ha ha! Lũ kiến cỏ các ngươi cũng đòi định tội tiên nhân sao?" Chấp sự cười vang.

"Xoẹt!" Một đạo đao quang lóe lên. Triệu Chấn vung đao chém đứt đầu gã chấp sự ngay tại chỗ. Máu đỏ bắn tung tóe lên bức đại đồ Cửu Châu!`,
              children: [
                {
                  id: 'sec_trieu_2_6_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Tuyên Đọc Hịch Cứu Quốc, Lòng Dân Sôi Sục',
                  summary: 'Bài hịch văn vạch trần bộ mặt giả dối của tu sĩ được dán khắp các ngõ ngách, bách tính rơi lệ xin tòng quân.',
                  content: 'Từng câu từng chữ trong hịch văn như nhát búa nện vào xiềng xích nô dịch ngàn năm của người dân.',
                  children: []
                },
                {
                  id: 'sec_trieu_2_6_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Xuất Binh Vây Núi, Thiết Kỵ Kéo Pháo Lên Đỉnh Đèo',
                  summary: 'Một vạn quân Bắc Lương cùng ba mươi cỗ cự pháo tiến quân trong đêm vây kín chân núi Vấn Tiên Tông.',
                  content: 'Tiếng xích sắt kéo pháo rền vang trên vách đá. Các đệ tử canh gác trên núi hoảng loạn đánh chuông báo động.',
                  children: []
                }
              ]
            }
          ]
        },
        // HỒI 2
        {
          id: 'act_trieu_2_2',
          type: NodeType.ACT,
          title: 'Hồi 2: Đại Pháo Vây Sơn • Phá Vỡ Vấn Tiên Tông',
          summary: 'Pháo kích san bằng ba mươi sáu ngọn linh phong, bắt sống chưởng môn, sung công kho tàng và chia đất cho dân cày.',
          content: 'Giây phút lịch sử khi thần quyền tu sĩ sụp đổ trước sức mạnh đoàn kết của phàm nhân.',
          isExpanded: true,
          children: [
            // CHƯƠNG 7
            {
              id: 'chap_trieu_7_phao_kich',
              type: NodeType.CHAPTER,
              title: 'Chương 7: Ngàn Cỗ Pháo Gầm Vang, San Bằng Hộ Sơn Đại Trận',
              summary: 'Trận chiến chấn động Cửu Châu: Ba mươi cỗ thần pháo bắn liên tục ba ngày đêm phá nát kết giới ngàn năm của Vấn Tiên Tông.',
              content: `Trên đỉnh Vấn Tiên Phong, Lãnh Vô Nhai cùng mười hai vị trưởng lão Kim Đan đang ngạo nghễ ngắm nhìn đại quân phàm nhân dưới chân núi: "Lũ giun dế ngu xuẩn, hộ sơn đại trận của bổn tông do tiên nhân Thượng Giới ban tặng, dù các ngươi đánh một trăm năm cũng không xước nổi một góc!"

Lời còn chưa dứt, Tiêu Cảnh dưới chân núi đã vung cờ lệnh màu vàng:

"Bắn liên hoàn!"

"Ầm! Ầm! Ầm!"

Ba mươi cỗ Chấn Thiên Pháo đồng loạt khai hỏa. Ba mươi vệt sáng đỏ rực mang theo năng lượng hủy diệt cắm thẳng vào tâm nhãn đại trận. Kết giới hộ sơn lóe lên dữ dội rồi nứt toác như vỏ trứng gà, tiếng nổ xé toạc mây trời khiến toàn bộ đỉnh núi rung chuyển nghiêng ngả!`,
              children: [
                {
                  id: 'sec_trieu_2_7_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Trận Nhãn Nổ Tung, Trưởng Lão Hộc Máu Rơi Xuống Mây',
                  summary: 'Năng lượng phá linh phản phệ khiến mười hai trưởng lão điều khiển trận pháp đứt kinh mạch rơi khỏi phi kiếm.',
                  content: 'Từng vị tiên phong đạo cốt trước đây giờ mặt mày xám ngoét, la hét tháo chạy như bầy ong vỡ tổ.',
                  children: []
                },
                {
                  id: 'sec_trieu_2_7_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Bộ Binh Xung Phong, Chiếm Đóng Ba Mươi Sáu Điện Thờ',
                  summary: 'Thiết kỵ Bắc Lương đạp đổ cổng đá ngàn năm, áp giải toàn bộ đệ tử tông môn ra trước pháp đình.',
                  content: 'Lần đầu tiên gót giày của binh sĩ phàm nhân bước lên những viên gạch ngọc trắng của tiên giới cấm địa.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 8
            {
              id: 'chap_trieu_8_lap_luat',
              type: NodeType.CHAPTER,
              title: 'Chương 8: Lập Luật Phạt Tu Sĩ, Thu Hồi Ba Mươi Vạn Dặm Linh Điền',
              summary: 'Tiêu Cảnh ban hành "Đại Càn Tiên Luật", buộc tu sĩ phải đóng thuế, tuân thủ pháp đình và cấm tự ý sát hại phàm nhân.',
              content: `Trước quảng trường ngọc bích của Vấn Tiên Tông, Tiêu Cảnh ngồi trên chiến xa uy nghi, nhìn xuống hàng ngàn tu sĩ đang quỳ rạp dưới đất:

"Từ hôm nay, không còn kẻ nào được tự xưng là thần tiên đứng ngoài vòng pháp luật! Tu sĩ giết phàm nhân thì phải đền mạng, tông môn giữ ruộng đất thì phải nộp thuế. Kẻ nào bất tuân, xử trảm cả dòng tộc!"

Bản "Đại Càn Tiên Luật" bằng đồng thau được đóng cọc cắm sâu vào tâm quảng trường. Ba mươi vạn dặm ruộng tốt bị tông môn chiếm đóng được chia đều cho những gia đình nghèo khổ.`,
              children: [
                {
                  id: 'sec_trieu_2_8_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Mở Kho Lương Cứu Đói, Bách Tính Đồng Thanh Tung Hô',
                  summary: 'Hàng triệu bao gạo và dược liệu cất giấu trong kho tông môn được chở về cứu tế cho các tỉnh nạn đói.',
                  content: 'Tiếng khóc cảm kích của những người mẹ nghèo vang vọng khắp sườn đồi, khí vận hoàng long lại bùng lên mãnh liệt.',
                  children: []
                },
                {
                  id: 'sec_trieu_2_8_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Nhổ Cọc Trấn Linh Đầu Tiên, Long Mạch U Châu Thức Tỉnh',
                  summary: 'Tiêu Cảnh đích thân kéo chiếc đinh đen cắm sâu dưới lòng đất, giải thoát cho rồng thiêng U Châu.',
                  content: 'Một tiếng rồng ngâm từ lòng đất vang dội chín tầng trời. Đất đai khô cằn bỗng chốc đâm chồi nảy lộc xanh tươi.',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // QUYỂN 3: TRẬN ĐỒ CỬU CHÂU • CHÉM GÃY TIÊN MẠCH
    // -----------------------------------------------------------------------
    {
      id: 'vol_trieu_3_long_hon',
      type: NodeType.PART,
      title: 'Quyển 3: Trận Đồ Cửu Châu • Chém Gãy Tiên Mạch',
      summary: 'Giai đoạn Long Hồn Kỳ. Thập Đại Tiên Minh liên thủ phản phệ, Tiêu Cảnh dẫn quân khai mở long mạch ba châu lớn, ngưng tụ Long Hồn Hoàng Kim Đan, chém tan mười đại trưởng lão tại Lạc Nhạn Hạp.',
      content: 'Giai đoạn bành trướng lực lượng và giải phóng các vùng đất bị phong ấn khí vận trên toàn cương thổ.',
      isExpanded: true,
      children: [
        // HỒI 1
        {
          id: 'act_trieu_3_1',
          type: NodeType.ACT,
          title: 'Hồi 1: Khai Mở Địa Mạch • Đột Phá Long Hồn',
          summary: 'Hành trình nhổ chín cây Trấn Linh Đinh tại ba châu phương Bắc, Tiêu Cảnh dung hợp khí vận ngưng tụ Kim Long Hộ Thể.',
          content: 'Quá trình đột phá cảnh giới kinh thiên động địa dựa trên lòng dân quy thuận.',
          isExpanded: true,
          children: [
            // CHƯƠNG 9
            {
              id: 'chap_trieu_9_dia_mach',
              type: NodeType.CHAPTER,
              title: 'Chương 9: Bí Mật Ngàn Năm Vạch Trần, Nhổ Cọc Trấn Linh Đinh',
              summary: 'Phát hiện âm mưu của Thượng Giới dùng chín cây đinh ma quái hút sinh khí Đại Càn để đúc thành Vạn Thọ Đan cho tiên nhân.',
              content: `Dưới đáy sâu của vực sâu Hắc Thủy, Tiêu Cảnh cùng Thẩm Mộ Vân nhìn thấy một cây cột sắt đen kịt cao trăm trượng, quấn quanh bởi hàng ngàn sợi xích máu nối liền với chín ngọn núi xung quanh.

"Cây đinh này... nó đang hút linh khí của cả U Châu và chuyển về Thượng Giới!" Thẩm Mộ Vân run rẩy khi giải mã những cổ tự trên thân đinh.

Tiêu Cảnh rút Cửu Long Thiên Mệnh Đao, ánh mắt tràn ngập sát khí: "Hóa ra tai ương hạn hán và dịch bệnh ngàn năm qua của muôn dân không phải do ý trời... mà là do lũ tiên nhân bẩn thỉu này sắp đặt! Chém!"`,
              children: [
                {
                  id: 'sec_trieu_3_9_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Cắt Đứt Xiềng Xích Máu, Địa Hỏa Phun Trào',
                  summary: 'Ba ngàn thiết kỵ dùng nỏ thần phá linh bắn đứt từng mắt xích phong ấn.',
                  content: 'Máu đen rỉ ra từ thân đinh bốc mùi hôi thối, chứng tích cho tội ác ngàn năm của các tiên tông.',
                  children: []
                },
                {
                  id: 'sec_trieu_3_9_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Hoàng Long Thức Giấc, Khí Vận Gia Trì Thân Thể',
                  summary: 'Con rồng vàng thứ hai bay ra khỏi lòng đất, quấn quanh thân Tiêu Cảnh giúp hắn đúc thành Long Hồn Kim Đan.',
                  content: 'Toàn thân Tiêu Cảnh tỏa sáng như vầng thái dương giữa trưa hè, uy áp đế vương khiến vạn vật phải phủ phục.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 10
            {
              id: 'chap_trieu_10_hop_minh',
              type: NodeType.CHAPTER,
              title: 'Chương 10: Thập Đại Tiên Môn Lập Minh, Chiến Vân Vần Vũ Bắc Cương',
              summary: 'Mười tông môn lớn hoảng sợ trước sự trỗi dậy của Bắc Lương, liên kết thành lập "Trừ Ma Phạt Dân Minh" chuẩn bị phản công.',
              content: `Tại Kim Đính Sơn, mười vị chưởng môn đại tông môn tụ hội. Trên bàn là chiếu thư giả mạo của ngụy đế Tiêu Húc tuyên bố Tiêu Cảnh là yêu ma phản nghịch cần tru diệt.

"Phàm nhân dám cầm vũ khí chống lại tiên đạo, đây là nghịch thiên! Nếu không giết Tiêu Cảnh, ngàn năm hương hỏa của các phái chúng ta sẽ tan thành mây khói!" Một vị lão tổ Kim Đan hậu kỳ đập bàn hét lớn.

Năm vạn đệ tử tiên môn cùng vô số trận bàn pháp bảo bắt đầu chuyển bánh hướng về phía thung lũng Lạc Nhạn Hạp.`,
              children: [
                {
                  id: 'sec_trieu_3_10_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Mạng Lưới Điệp Báo Mộ Dung Cẩm Kịp Thời Báo Tin',
                  summary: 'Nữ thương nhân kiêm gián điệp Mộ Dung Cẩm mang bản đồ hành quân của liên minh tiên môn đến trao cho Tiêu Cảnh.',
                  content: 'Mộ Dung Cẩm phe phẩy quạt ngọc: "Điện hạ, lần này ta cược cả tính mạng và sản nghiệp vào người rồi đấy."',
                  children: []
                },
                {
                  id: 'sec_trieu_3_10_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Bày Thập Diện Mai Phục Nơi Hẻm Núi Lạc Nhạn',
                  summary: 'Thẩm Mộ Vân chôn sẵn một ngàn quả lôi đạn cơ quan dọc theo hẻm núi hiểm trở.',
                  content: 'Mặt đất hẻm núi tĩnh lặng như tờ, nhưng bên dưới là mạng lưới thuốc súng và trận pháp hủy diệt chết chóc.',
                  children: []
                }
              ]
            }
          ]
        },
        // HỒI 2
        {
          id: 'act_trieu_3_2',
          type: NodeType.ACT,
          title: 'Hồi 2: Huyết Chiến Lạc Nhạn • Chém Tan Tiên Minh',
          summary: 'Năm vạn tiên binh sa vào bẫy mai phục cơ quan, Tiêu Cảnh xuất kích chém mười vị trưởng lão Kim Đan, mở toang con đường tiến về kinh đô.',
          content: 'Trận đại thắng mang tính bước ngoặt đập tan hoàn toàn ưu thế quân sự của các tông môn.',
          isExpanded: true,
          children: [
            // CHƯƠNG 11
            {
              id: 'chap_trieu_11_lac_nhan',
              type: NodeType.CHAPTER,
              title: 'Chương 11: Lôi Hỏa Ngập Hẻm Núi, Năm Vạn Tiên Binh Sa Lầy',
              summary: 'Quân đội tông môn bị dụ vào hẻm núi Lạc Nhạn, ngàn quả lôi đạn đồng loạt kích nổ biến hẻm đá thành biển lửa.',
              content: `Khi năm vạn đệ tử tiên môn rực rỡ pháp quang bước vào trung tâm hẻm núi, tiếng tù và của Bắc Lương bỗng vang lên từ vách đá cheo leo.

"Bùm! Bùm! Bùm!"

Cả hẻm núi dài hai mươi dặm bỗng chốc biến thành hỏa ngục. Lôi đạn phá linh nổ tung làm tan rã toàn bộ phi kiếm và khiên chắn linh quang. Đệ tử tông môn khóc than chạy loạn, giẫm đạp lên nhau mà chết.`,
              children: [
                {
                  id: 'sec_trieu_3_11_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Khóa Chặt Cửa Hẻm, Nỏ Thần Bắn Tỉa Tinh Anh',
                  summary: 'Ba ngàn thần nỏ thủ Bắc Lương chiếm lĩnh điểm cao, tiêu diệt các tu sĩ cố gắng bay lên trốn thoát.',
                  content: 'Không một mũi tên nào bắn trượt. Từng tên tu sĩ kiêu ngạo rơi rụng như chim trúng đạn.',
                  children: []
                },
                {
                  id: 'sec_trieu_3_11_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Yêu Tộc Hiệp Trợ, Khóa Chặt Đường Lui Hậu Phương',
                  summary: 'Dạ Sát Yêu Vương dẫn dắt bầy sói chặn đứng đường rút lui của tàn quân tiên môn.',
                  content: 'Tiếng sói tru vang rền giữa biển lửa. Mưu lược liên minh Phàm - Yêu của Tiêu Cảnh phát huy uy lực tột đỉnh.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 12
            {
              id: 'chap_trieu_12_tram_truong_lao',
              type: NodeType.CHAPTER,
              title: 'Chương 12: Độc Đấu Mười Đại Trưởng Lão, Long Hồn Xé Rách Mây Trắng',
              summary: 'Mười vị trưởng lão Kim Đan liều mạng vây công Tiêu Cảnh, Tiêu Cảnh triệu hoán Hoàng Long Hộ Thể nhất đao trảm sát toàn bộ.',
              content: `Mười vị trưởng lão Kim Đan mắt đỏ ngầu, đồng loạt kết thành Thập Tuyệt Kiếm Trận nhắm thẳng vào tim Tiêu Cảnh.

Tiêu Cảnh đứng giữa chiến trường, trường đao chỉ trời: "Các ngươi tu tiên ngàn năm chỉ để làm giun dế bóc lột đồng loại. Hôm nay trẫm thay muôn dân chín châu, phán các ngươi trảm lập quyết!"

"Gầm ——!"

Một con Chân Long màu hoàng kim từ thiên linh cái của Tiêu Cảnh bay vút lên trời cao, vuốt rồng xé toạc kiếm trận. Đao quang quét qua, mười chiếc đầu lâu trưởng lão đồng loạt rơi rụng! Toàn bộ năm vạn tàn quân tiên môn quỳ rạp xin hàng!`,
              children: [
                {
                  id: 'sec_trieu_3_12_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Bẻ Gãy Thập Tuyệt Trận, Uy Lực Chân Long Áp Đảo',
                  summary: 'Sức mạnh của Long Hồn Kim Đan vượt xa Kim Đan thông thường nhờ được hàng triệu con tim tiếp sức.',
                  content: 'Khí tức đế vương quét sạch tà khí trên bầu trời, mở ra ánh nắng rực rỡ sau chuỗi ngày tăm tối.',
                  children: []
                },
                {
                  id: 'sec_trieu_3_12_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Thu Phục Hàng Binh, Chuẩn Bị Chiến Dịch Nam Hạ',
                  summary: 'Tha chết cho các đệ tử bị lừa gạt, cải tổ họ thành lực lượng xây dựng công trình thủy lợi và đúc pháo cho Tiên Triều.',
                  content: 'Nước mắt hối hận của các đệ tử trẻ tuổi. Con đường tiến về Hoàng Thành Càn Nguyên đã hoàn toàn rộng mở.',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // QUYỂN 4: THIẾT KỴ NAM HẠ • THANH TRỪNG HOÀNG TRIỀU
    // -----------------------------------------------------------------------
    {
      id: 'vol_trieu_4_hoang_cuc',
      type: NodeType.PART,
      title: 'Quyển 4: Thiết Kỵ Nam Hạ • Thanh Trừng Hoàng Triều',
      summary: 'Giai đoạn Hoàng Cực Chân Thân. Tiêu Cảnh công bố "Xuất Sư Biểu" rung chuyển thiên hạ, đại quân vượt Hoàng Hà giải phóng mười tỉnh, tiến thẳng vào kinh đô lật đổ ngụy đế Tiêu Húc, đột phá cảnh giới Hoàng Cực.',
      content: 'Chiến dịch giải phóng dân tộc vĩ đại, quét sạch tầng lớp quý tộc thối nát và quan lại sâu mọt bán nước.',
      isExpanded: true,
      children: [
        // HỒI 1
        {
          id: 'act_trieu_4_1',
          type: NodeType.ACT,
          title: 'Hồi 1: Cờ Vàng Vượt Hoàng Hà • Mười Tỉnh Hưởng Ứng',
          summary: 'Bản Xuất Sư Biểu làm rung chuyển giang sơn, quan lại các châu mở toang cổng thành đón quân Tiêu Cảnh, phá ải Hổ Lao Quan.',
          content: 'Khí thế như chẻ tre của đội quân chính nghĩa được toàn dân ủng hộ.',
          isExpanded: true,
          children: [
            // CHƯƠNG 13
            {
              id: 'chap_trieu_13_xuat_su',
              type: NodeType.CHAPTER,
              title: 'Chương 13: Xuất Sư Biểu Rung Chuyển Thiên Hạ, Giang Sơn Đón Chủ',
              summary: 'Bản tuyên ngôn chính trị bất hủ của Tiêu Cảnh khiến lòng dân cả nước đồng loạt khởi nghĩa lật đổ quan lại sâu mọt.',
              content: `Bên bờ sông Hoàng Hà sóng cuộn trào dâng, Tiêu Cảnh đọc vang bản Xuất Sư Biểu:

"Trẫm vâng mệnh trời, thuận lòng dân, dấy nghĩa binh từ Bắc Lương quét sạch gian tà. Không vì ngai vàng riêng tư, chỉ vì chén cơm của bách tính, vì sự bình yên của non sông chín châu!"

Tiếng hò reo của mười vạn đại quân hòa cùng tiếng sóng Hoàng Hà vang dội ngàn dặm. Trong vòng bảy ngày, tám mươi tòa thành trì dọc bờ sông đồng loạt hạ cờ ngụy triều, cắm lên cờ rồng Tiên Triều đón đại quân!`,
              children: [
                {
                  id: 'sec_trieu_4_13_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Quan Lại Cởi Mão Đầu Hàng, Mở Cổng Không Đánh Mà Thắng',
                  summary: 'Nhiều tổng đốc nhận ra chân mệnh thiên tử, chủ động bắt trói tham quan dâng thành quy phục.',
                  content: 'Các bô lão trong thành dâng trà bánh đón chào những người lính Bắc Lương kỷ luật như sắt.',
                  children: []
                },
                {
                  id: 'sec_trieu_4_13_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Cấm Vệ Quân Đào Ngũ, Ngụy Đế Trong Cung Hoảng Loạn',
                  summary: 'Tin thất trận liên tiếp bay về kinh đô khiến Tiêu Húc run rẩy trốn dưới gầm ngai vàng.',
                  content: 'Triều đình mục ruỗng tan rã từ bên trong, quan lại nhốn nháo gom vàng bạc tìm đường chạy trốn.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 14
            {
              id: 'chap_trieu_14_ho_lao',
              type: NodeType.CHAPTER,
              title: 'Chương 14: Đột Phá Hổ Lao Quan, Phá Vỡ Chiến Xa Cơ Quan Cổ Đại',
              summary: 'Trận đánh lớn cuối cùng trước cửa ngõ kinh đô: Tiêu Cảnh dùng mưu trí phá tan mười vạn cấm quân được trang bị cơ quan cổ của hoàng tộc.',
              content: `Hổ Lao Quan vách đá dựng đứng ngàn trượng, là cửa ngõ hiểm trở nhất bảo vệ kinh đô.

Tướng giữ ải là đại tướng quân trung thành của ngụy đế, điều khiển một trăm cỗ Cơ Quan Cự Thú bằng đồng thau phun lửa phong tỏa con đường độc đạo.

"Thẩm Mộ Vân, xem bản lĩnh của ngươi rồi!" Tiêu Cảnh chỉ tay.

Thẩm Mộ Vân mỉm cười, giơ bàn tính ngọc bấm nhanh như chớp. Hàng trăm con bồ câu cơ quan mang theo bột từ thạch bay vào khe hở của cự thú, làm đoản mạch toàn bộ hệ thống bánh răng! Những cỗ máy khổng lồ bỗng chốc tê liệt đứng im bất động!`,
              children: [
                {
                  id: 'sec_trieu_4_14_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Vô Hiệu Hóa Cơ Quan, Triệu Chấn Phá Cổng Ải',
                  summary: 'Triệu Chấn vác cọc gỗ bọc thép đâm thủng cổng thành Hổ Lao Quan.',
                  content: 'Tiếng rạn nứt vang trời, cánh cổng kiên cố nhất lịch sử Đại Càn chính thức sụp đổ.',
                  children: []
                },
                {
                  id: 'sec_trieu_4_14_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Bắt Sống Thống Soái Cấm Quân, Thu Hồi Toàn Bộ Vũ Khí',
                  summary: 'Tiêu Cảnh tha mạng cho tướng bại trận, thuyết phục ông quay súng bảo vệ muôn dân.',
                  content: 'Tướng giữ ải quỳ gối rơi lệ thề trung thành với chân mệnh đế vương.',
                  children: []
                }
              ]
            }
          ]
        },
        // HỒI 2
        {
          id: 'act_trieu_4_2',
          type: NodeType.ACT,
          title: 'Hồi 2: Kinh Đô Quyết Đấu • Trảm Ngụy Đế Thái Miếu',
          summary: 'Bao vây hoàng thành, đập tan âm mưu rước ma tu Thượng Giới của Tiêu Húc, luận tội trước Thái Miếu và đột phá Hoàng Cực Chân Thân.',
          content: 'Giây phút thanh lọc triều đình, đòi lại công lý cho người cha quá cố và hàng triệu oan hồn.',
          isExpanded: true,
          children: [
            // CHƯƠNG 15
            {
              id: 'chap_trieu_15_cong_thanh',
              type: NodeType.CHAPTER,
              title: 'Chương 15: Kinh Đô Biến Sắc, Ngụy Đế Rước Ma Nhập Thất',
              summary: 'Trong cơn tuyệt vọng, Tiêu Húc mở cửa cấm địa hoàng cung kích hoạt Ma Trận hiến tế một triệu dân kinh đô cho lão quái Thượng Giới.',
              content: `Bầu trời kinh đô Đại Càn bỗng biến thành một xoáy mây đen kịt mùi tanh tưởi.

Tiêu Húc đứng trên tường thành hoàng cung, tay cầm chén rượu độc, mặt méo mó điên cuồng: "Tiêu Cảnh! Ngươi muốn ngôi vị hoàng đế sao? Ta sẽ biến cả kinh thành này thành địa ngục ma quỷ cho ngươi hưởng thụ!"

Một cỗ quan tài máu khổng lồ từ lòng đất trồi lên, tà khí Nguyên Anh tỏa ra đè bẹp cả không gian.

"Chỉ bằng thứ tà ma ngoại đạo này mà đòi ngăn trẫm sao?" Tiêu Cảnh từ trên lưng Kim Long bước xuống hư không, mỗi bước đi tạo nên những đóa hoa sen vàng rực rỡ đẩy lùi tà khí!`,
              children: [
                {
                  id: 'sec_trieu_4_15_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Phá Nát Ma Trận, Cứu Thoát Một Triệu Dân Thành',
                  summary: 'Thẩm Mộ Vân cùng các pháp sư Tiên Triều đảo ngược dòng năng lượng cứu thoát bách tính.',
                  content: 'Những người dân kinh đô quỳ sụp dưới chân thành lạy tạ vị cứu tinh.',
                  children: []
                },
                {
                  id: 'sec_trieu_4_15_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Đập Tan Quan Tài Máu, Trảm Ma Tu Thượng Giới',
                  summary: 'Tiêu Cảnh dùng Cửu Long Thiên Mệnh Đao chém nát phân thân ma tu Nguyên Anh.',
                  content: 'Tiếng thét thảm thiết của ma đầu tan biến vào hư không, phá vỡ sợi dây thao túng cuối cùng của Thượng Giới.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 16
            {
              id: 'chap_trieu_16_thai_mieu',
              type: NodeType.CHAPTER,
              title: 'Chương 16: Luận Tội Trước Thái Miếu, Đột Phá Hoàng Cực Chân Thân',
              summary: 'Tiêu Cảnh bắt sống Tiêu Húc trước bài vị tổ tiên, vạch trần tội ác giết cha cướp ngôi, thu hồi Truyền Quốc Ngọc Tỷ.',
              content: `Trước linh vị của Tiên Đế và liệt tổ liệt tông trong Thái Miếu, Tiêu Húc bị ấn quỳ rạp dưới sàn đá lạnh.

"Ngươi giết phụ hoàng bằng Hóa Cốt Độc, vu oan cho ta, bán đứng giang sơn cho tông môn... Tội trạng của ngươi, trời không dung đất không tha!" Tiêu Cảnh cất giọng sang sảng.

Thanh bảo kiếm hoàng gia chém xuống, chấm dứt triều đại hủ bại của ngụy đế. 

Cùng lúc đó, chín con rồng vàng từ chín châu đồng loạt bay về kinh đô tụ hội vào thân thể Tiêu Cảnh. Thân thể hắn biến đổi thành Hoàng Cực Chân Thân rực rỡ ngút trời, lời hắn nói ra biến thành thiên luật vang vọng khắp cõi bờ!`,
              children: [
                {
                  id: 'sec_trieu_4_16_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Truyền Quốc Ngọc Tỷ Quy Vị, Khí Vận Hợp Nhất',
                  summary: 'Miếng ngọc tỷ ngàn năm tự động bay vào tay Tiêu Cảnh, phát ra âm thanh thánh thót như chuông trời.',
                  content: 'Chín đạo long mạch của non sông Đại Càn chính thức kết nối lại thành một thể thống nhất hoàn hảo.',
                  children: []
                },
                {
                  id: 'sec_trieu_4_16_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Đại Xá Thiên Hạ, Chuẩn Bị Lễ Khai Quốc Thần Triều',
                  summary: 'Tiêu Cảnh ban lệnh miễn thuế ba năm cho toàn dân, dốc toàn lực đúc Cửu Đỉnh Trấn Thiên.',
                  content: 'Niềm vui ngập tràn từ ngõ nhỏ làng quê đến kinh thành hoa lệ.',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    },

    // -----------------------------------------------------------------------
    // QUYỂN 5: CỬU ĐỈNH TRẤN THIÊN • THẦN TRIỀU PHI THĂNG
    // -----------------------------------------------------------------------
    {
      id: 'vol_trieu_5_thanh_hoang',
      type: NodeType.PART,
      title: 'Quyển 5: Cửu Đỉnh Trấn Thiên • Thần Triều Phi Thăng',
      summary: 'Giai đoạn Vạn Cổ Thánh Hoàng. Đúc thành chín cỗ Khai Quốc Thần Đỉnh từ binh khí nung chảy của các tông môn, nghênh chiến Thượng Giới Tiên Sứ, đánh tan Thiên Kiếp Diệt Quốc, đưa toàn bộ lãnh thổ phàm nhân phi thăng ngạo thị chư thiên.',
      content: 'Chương cao trào chung cuộc tráng lệ nhất, hiện thực hóa ước mơ vĩ đại: Phàm - Tiên bình đẳng, cả nước thăng thiên.',
      isExpanded: true,
      children: [
        // HỒI 1
        {
          id: 'act_trieu_5_1',
          type: NodeType.ACT,
          title: 'Hồi 1: Đúc Đỉnh Trấn Giang Sơn • Nghênh Chiến Tiên Sứ',
          summary: 'Thu gom hàng vạn tấn binh khí tiên môn đúc Cửu Đỉnh, khắc tên hàng triệu thường dân, đối đầu tối hậu thư của Tiên Giới.',
          content: 'Ý chí bất khuất của một dân tộc thà chết vinh còn hơn sống nhục làm nô lệ thần tiên.',
          isExpanded: true,
          children: [
            // CHƯƠNG 17
            {
              id: 'chap_trieu_17_duc_dinh',
              type: NodeType.CHAPTER,
              title: 'Chương 17: Vạn Lò Rèn Nung Chảy Tiên Kiếm, Đúc Chín Cỗ Thần Đỉnh',
              summary: 'Hàng ngàn chiếc lò rèn khổng lồ bên bờ sông nung chảy toàn bộ pháp bảo và kiếm của các tông môn bại trận để đúc Cửu Đỉnh.',
              content: `Bên ngoài kinh thành, một vạn chiếc lò cao rực lửa suốt bốn mươi chín ngày đêm. Hàng núi phi kiếm, giáp ngọc của các tu sĩ kiêu ngạo xưa kia giờ đây tan chảy thành dòng dung nham bằng đồng và sắt thép sáng rực.

Tiêu Cảnh đứng trên đài cao, cầm chiếc bay đồng đích thân khắc lên thân đỉnh đầu tiên:

"Chiếc đỉnh này mang tên Ung Châu Đỉnh. Trên đó không khắc công tích của hoàng đế, mà khắc tên của mười vạn binh sĩ và thường dân đã ngã xuống vì nền độc lập của đất nước!"

Hàng triệu người dân đứng xung quanh bật khóc nức nở, tiếng hô vang "Thánh Hoàng vạn tuế" làm rúng động cả trời đất!`,
              children: [
                {
                  id: 'sec_trieu_5_17_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Máu Vạn Dân Hòa Vào Đồng Đỏ, Thần Đỉnh Linh Hóa',
                  summary: 'Ý chí cộng đồng mạnh mẽ biến chín cỗ đỉnh phàm tục thành Tiên Thiên Chí Bảo vô song.',
                  content: 'Từng cỗ đỉnh phát ra tiếng chuông ngân vang tự nhiên, trấn áp mọi tà niệm trong lòng người.',
                  children: []
                },
                {
                  id: 'sec_trieu_5_17_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Bố Trí Cửu Đỉnh Vào Chín Đại Long Huyệt',
                  summary: 'Chín cỗ đỉnh được các đội ngũ chiến mã và khôi lỗi kéo về trấn thủ chín vùng cương vực.',
                  content: 'Mạng lưới bảo vệ tuyệt đối của Tiên Triều chính thức khép kín.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 18
            {
              id: 'chap_trieu_18_tien_su',
              type: NodeType.CHAPTER,
              title: 'Chương 18: Thượng Giới Tiên Sứ Giáng Lâm, Bắt Tiên Triều Quỳ Phục',
              summary: 'Ba vị Tiên Sứ Hóa Thần từ Thượng Giới bước ra từ cổng trời, mang theo thánh chỉ bắt Tiêu Cảnh đập đỉnh đầu hàng.',
              content: `Cổng trời Thượng Giới mở toang giữa thanh thiên bạch nhật. Ba bóng người khoác áo bào trắng viền vàng kim, tỏa ra uy áp Hóa Thần kinh hoàng đè nát núi non.

"Phàm nhân hạ giới to gan! Lũ giun dế các ngươi dám đúc đỉnh xưng Tiên Triều, dám cướp đoạt hương hỏa của Thần Minh?" Kẻ dẫn đầu cầm cuộn thiên thư thét lớn: "Tiêu Cảnh mau quỳ xuống nhận tội, dâng Cửu Đỉnh lên Tiên Giới, bằng không Lôi Kiếp Diệt Tộc sẽ giáng xuống trong chớp mắt!"

Toàn thể bá quan văn võ run rẩy trước uy áp thần thánh. Nhưng Tiêu Cảnh vẫn đứng thẳng tắp, tay nắm chuôi đao, ngẩng cao đầu cười vang:

"Trẫm thống lĩnh muôn dân, dựng nước bằng máu và mồ hôi của trăm họ, chứ không xin xỏ lũ thần tiên đạo đức giả các ngươi! Muốn Cửu Đỉnh sao? Hãy bước qua xác ba mươi triệu dân Đại Càn này đã!"`,
              children: [
                {
                  id: 'sec_trieu_5_18_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Rút Kiếm Chỉ Trời, Lời Thề Bất Khuất Trước Cổng Trời',
                  summary: 'Toàn bộ quân dân Đại Càn đồng loạt rút vũ khí hướng lên trời cao thể hiện ý chí quyết tử.',
                  content: 'Tiếng thét "Không quỳ! Không hàng!" của ba mươi triệu con người tạo thành luồng sóng âm thanh hất văng cả mây mù.',
                  children: []
                },
                {
                  id: 'sec_trieu_5_18_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Bắn Phát Pháo Đầu Tiên Lên Tiên Giới',
                  summary: 'Tiêu Cảnh ra lệnh cho Chấn Thiên Cự Pháo bắn thẳng vào cổng trời, mở màn cuộc chiến với Thượng Giới.',
                  content: 'Viên đạn phá linh nổ tung làm sứt mẻ một góc cổng trời ngọc bích, khiến Tiên Sứ tức giận đến run người.',
                  children: []
                }
              ]
            }
          ]
        },
        // HỒI 2
        {
          id: 'act_trieu_5_2',
          type: NodeType.ACT,
          title: 'Hồi 2: Đại Khai Quốc • Toàn Cương Thổ Phi Thăng',
          summary: 'Cửu Đỉnh phá tan Thiên Kiếp Diệt Tộc, Tiêu Cảnh trảm sát Tiên Sứ Hóa Thần, nâng toàn bộ cương vực Đại Càn thăng thiên ngạo thị tinh không.',
          content: 'Chương kết huy hoàng tráng lệ mở ra kỷ nguyên mới cho nhân loại.',
          isExpanded: true,
          children: [
            // CHƯƠNG 19
            {
              id: 'chap_trieu_19_pha_thien_kiep',
              type: NodeType.CHAPTER,
              title: 'Chương 19: Cửu Đỉnh Phá Thiên Kiếp, Trảm Tiên Sứ Trước Bàn Dân',
              summary: 'Lôi kiếp hủy diệt giáng xuống, Cửu Đỉnh hấp thụ trọn vẹn sấm sét chuyển hóa thành nguyên khí, Tiêu Cảnh đột phá Vạn Cổ Thánh Hoàng trảm sát kẻ thù.',
              content: `Hàng vạn tia sét màu tím than như những con rồng lửa từ cổng trời bổ xuống mặt đất Đại Càn hòng biến cả quốc gia thành bình địa.

"Cửu Đỉnh Khởi Động!"

Tiêu Cảnh giơ cao ngọc ấn. Chín cỗ Thần Đỉnh từ chín phương bay lên giữa không trung, tạo thành một chiếc lồng bát quái khổng lồ bao bọc lấy toàn bộ cương thổ. Lôi kiếp khủng khiếp đánh vào thân đỉnh bỗng chốc bị chuyển hóa thành những hạt mưa linh khí ngũ sắc tưới mát ruộng đồng!

Tiêu Cảnh bay vút lên chín tầng mây, Cửu Long Thiên Mệnh Đao chém ra một nhát chém kinh thiên động địa. Ba vị Tiên Sứ Hóa Thần chưa kịp trở tay đã bị đao quang xé nát thân thể rơi rụng xuống đất!`,
              children: [
                {
                  id: 'sec_trieu_5_19_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Chuyển Hóa Thiên Kiếp Thành Mưa Linh Đan',
                  summary: 'Người dân tắm trong mưa linh khí, bệnh tật tiêu tan, thọ mệnh tăng thêm trăm tuổi.',
                  content: 'Một kỳ tích chưa từng có trong lịch sử tu tiên thế giới.',
                  children: []
                },
                {
                  id: 'sec_trieu_5_19_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Cổng Trời Vỡ Vụn, Tiên Giới Bàng Hoàng Hoảng Sợ',
                  summary: 'Sức mạnh quật khởi của một quốc gia phàm nhân khiến các đại giáo Thượng Giới phải kinh hãi đóng chặt cửa tiên giới.',
                  content: 'Thời thế đã đảo chiều, phàm nhân không còn là thức ăn hay nô lệ cho chư tiên nữa.',
                  children: []
                }
              ]
            },
            // CHƯƠNG 20
            {
              id: 'chap_trieu_20_phi_thang',
              type: NodeType.CHAPTER,
              title: 'Chương 20: Đại Càn Đăng Cơ, Cả Nước Thăng Thiên Ngạo Thị Tinh Không',
              summary: 'Lễ đăng cơ Vạn Cổ Thánh Hoàng trên đài Thiên Đàn, Cửu Đỉnh nâng toàn bộ núi non, thành trì và hàng triệu con người bay lên trời cao, lập nên Bất Diệt Tiên Triều.',
              content: `Trên đỉnh Thiên Đàn nguy nga sừng sững, Tiêu Cảnh mặc long bào thêu nhật nguyệt, đầu đội mũ miện cửu lưu, nắm tay Thẩm Mộ Vân bước lên đỉnh cao danh vọng.

Dưới chân hắn, ba ngàn dũng sĩ Bắc Lương nay đã thành Tiên Tướng áo giáp sáng ngời. Xa hơn nữa là hàng triệu bách tính đang hân hoan ca hát.

"Hôm nay, trẫm tuyên bố: Đại Càn Tiên Triều chính thức thành lập! Giang sơn này, từ nay thuộc về muôn dân!"

Tiêu Cảnh vung tay áo. 

"Ầm ——!"

Một tiếng nổ êm dịu vang lên. Toàn bộ cương thổ chín châu, núi non sông ngòi, nhà cửa ruộng vườn bỗng nhiên nhẹ bẫng bay lên khỏi mặt đất, xuyên qua mây mù, tiến thẳng vào dải ngân hà bao la ngạo thị vạn giới!

Một kỷ nguyên mới — Kỷ nguyên của Nhân Đạo Tiên Triều trường tồn bất diệt — chính thức bắt đầu!`,
              children: [
                {
                  id: 'sec_trieu_5_20_1',
                  type: NodeType.SECTION,
                  title: 'Mục 1: Phong Thưởng Trăm Quan, Khắc Tên Liệt Sĩ Lên Ngân Hà',
                  summary: 'Triệu Chấn, Thẩm Mộ Vân, Mộ Dung Cẩm và toàn thể tướng sĩ được phong chức vị thần triều, vinh quang vạn cổ.',
                  content: 'Những giọt nước mắt hạnh phúc lăn dài trên gò má của người lính già.',
                  children: []
                },
                {
                  id: 'sec_trieu_5_20_2',
                  type: NodeType.SECTION,
                  title: 'Mục 2: Tầm Nhìn Vô Tận Giữa Các Vì Sao, Khai Mở Tân Kỷ Nguyên',
                  summary: 'Tiên Triều Đại Càn sừng sững giữa các vì sao, sẵn sàng bảo vệ nhân đạo trước mọi hiểm họa vũ trụ.',
                  content: 'Ánh mắt Tiêu Cảnh nhìn về phía chân trời vô tận, nơi những thế giới mới đang chờ đợi bước chân khai hoang của Đại Càn!',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
