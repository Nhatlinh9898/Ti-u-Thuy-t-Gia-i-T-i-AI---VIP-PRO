import { LoreNetworkNode, LoreNetworkEdge, StoryVignetteItem } from '../types';

// =========================================================================
// PRESET: MẠNG LƯỚI TRI THỨC TOÀN CẢNH (OMNIVERSE LORE SYNAPTIC NODES)
// =========================================================================

export const PRESET_LORE_NODES: LoreNetworkNode[] = [
  // 1. Tuyến Mạch Cảnh Giới
  {
    id: 'node_spine_truc_co',
    domain: 'CultivationSpine',
    title: 'Trúc Cơ Kỳ (Đúc Đạo Cơ)',
    subtitle: 'Khí Hải Hóa Dịch & Linh Tủy Hoán Cốt',
    tags: ['Cảnh Giới', 'Đạo Cơ', 'Khí Hải', 'Linh Dịch'],
    essenceDescription: 'Giai đoạn then chốt từ phàm nhân lột xác thành tu sĩ chính quy, đan điền hóa thành biển linh dịch mênh mông.',
    stageLevel: 'Cấp 2 / Đại Cảnh Giới',
    powerScore: 85,
    icon: '🌀',
    color: '#06b6d4'
  },
  {
    id: 'node_spine_kim_dan',
    domain: 'CultivationSpine',
    title: 'Kim Đan Kỳ (Cửu Chuyển Đan)',
    subtitle: 'Ngưng Kết Kim Đan & Đan Văn Chiếu Rọi',
    tags: ['Cảnh Giới', 'Kim Đan', 'Chân Nhân', 'Đan Văn'],
    essenceDescription: 'Khí hải cô đọng lại thành viên đan tròn trịa lấp lánh như mặt trời nhỏ, thọ mệnh tăng vọt lên 800 năm.',
    stageLevel: 'Cấp 3 / Đại Cảnh Giới',
    powerScore: 92,
    icon: '☀️',
    color: '#eab308'
  },

  // 2. Kiếm Đạo
  {
    id: 'node_sword_nhat_diem_han_quang',
    domain: 'SwordDao',
    title: 'Nhất Điểm Hàn Quang (Thấu Thiết Thức)',
    subtitle: 'Thái Sơ Hỗn Độn Kiếm Quyết - Nhất Thức',
    tags: ['Kiếm Đạo', 'Kiếm Mang', 'Sát Phạt', 'Thấu Thiết'],
    essenceDescription: 'Ngưng tụ toàn bộ khí tức Canh Kim vào một điểm nơi đầu mũi kiếm, đâm thủng giáp sắt và màng hộ thể như chém bùn.',
    stageLevel: 'Nhập Môn / Thực Chiến',
    powerScore: 78,
    icon: '🗡️',
    color: '#38bdf8'
  },
  {
    id: 'node_sword_van_kiem_trieu_tong',
    domain: 'SwordDao',
    title: 'Vạn Kiếm Triều Tông (Ý Cảnh Hóa Vực)',
    subtitle: 'Thái Sơ Hỗn Độn Kiếm Quyết - Tam Thức',
    tags: ['Kiếm Đạo', 'Kiếm Vực', 'Vạn Kiếm', 'Đại Viên Mãn'],
    essenceDescription: 'Kiếm vực bao trùm ngàn trượng, vạn thanh kiếm vô hình mọc lên từ hư không quy phục mệnh lệnh người sử dụng.',
    stageLevel: 'Đại Viên Mãn / Ý Cảnh',
    powerScore: 95,
    icon: '⚔️',
    color: '#818cf8'
  },

  // 3. Thuật Pháp
  {
    id: 'node_spell_ngu_hanh_than_quang',
    domain: 'SpellDao',
    title: 'Ngũ Hành Thần Quang Vô Hạ',
    subtitle: 'Đại Diễn Ngũ Hành Thần Thông',
    tags: ['Thuật Pháp', 'Ngũ Hành', 'Thần Quang', 'Tịch Diệt'],
    essenceDescription: 'Năm dải lụa thần quang ngũ sắc quét ngang qua chiến trường, không vật gì không quét, không bảo vật gì không rơi.',
    stageLevel: 'Cực Đạo Thần Cấp',
    powerScore: 98,
    icon: '🔮',
    color: '#c084fc'
  },
  {
    id: 'node_spell_tu_tieu_chuong_tam_loi',
    domain: 'SpellDao',
    title: 'Tử Tiêu Chưởng Tâm Lôi',
    subtitle: 'Cửu Thiên Tử Tiêu Thần Lôi',
    tags: ['Thuật Pháp', 'Lôi Đình', 'Thuần Dương', 'Trừ Tà'],
    essenceDescription: 'Quả cầu sét màu tím bùng nổ trên lòng bàn tay với tiếng sấm rền vang xé toạc màng nhĩ, chuyên khắc chế âm hồn.',
    stageLevel: 'Sơ Giai Đỉnh Phong',
    powerScore: 75,
    icon: '⚡',
    color: '#a855f7'
  },

  // 4. Phù Lục
  {
    id: 'node_talisman_cuu_thien_than_loi',
    domain: 'TalismanDao',
    title: 'Cửu Thiên Thần Lôi Tru Ma Phù',
    subtitle: 'Thái Thượng Phù Lục - Tử Phù',
    tags: ['Phù Lục', 'Lôi Phù', 'Tử Phù', 'Sát Phạt'],
    essenceDescription: 'Vẽ bằng máu tim Hắc Lôi Báo và chu sa ngàn năm, ném ra triệu hoán chín tia sét tím giáng xuống thiêu rụi ba mươi trượng.',
    stageLevel: 'Tam Phẩm Thượng Giai',
    powerScore: 84,
    icon: '📜',
    color: '#f59e0b'
  },
  {
    id: 'node_talisman_thai_hu_na_di',
    domain: 'TalismanDao',
    title: 'Thái Hư Na Di Phù',
    subtitle: 'Hư Không Độn Phù Kim Sắc',
    tags: ['Phù Lục', 'Không Gian', 'Na Di', 'Sinh Tồn'],
    essenceDescription: 'Bóp nát tấm bùa lụa bạc xé rách không gian đưa người thoát hiểm mười vạn dặm ngoài tầm truy sát.',
    stageLevel: 'Tứ Phẩm Cực Giai',
    powerScore: 89,
    icon: '✨',
    color: '#ec4899'
  },

  // 5. Thần Phả & Vũ Trụ
  {
    id: 'node_deity_ban_co',
    domain: 'PantheonCosmology',
    title: 'Bàn Cổ Khai Thiên Thần',
    subtitle: 'Thái Sơ Nguyên Thủy Khai Thiên Đại Tôn',
    tags: ['Thần Linh', 'Khai Thiên', 'Hỗn Độn', 'Cổ Thần'],
    essenceDescription: 'Đấng dùng rìu chém tan bóng tối, tách Trời Đất, thân xác hóa thành nhật nguyệt núi sông và vạn linh.',
    stageLevel: 'Nguyên Sơ Cổ Thần',
    powerScore: 100,
    icon: '🌌',
    color: '#fbbf24'
  },
  {
    id: 'node_epoch_hong_hoang',
    domain: 'PantheonCosmology',
    title: 'Kỷ Nguyên Hồng Hoang (Thần Ma Tranh Bá)',
    subtitle: 'Đại Chiến Vu Yêu & Cột Trời Bất Chu Gãy',
    tags: ['Kỷ Nguyên', 'Hồng Hoang', 'Thần Ma', 'Biến Cố'],
    essenceDescription: 'Thời kỳ chư thần va chạm khiến đất trời nghiêng ngả, để lại vô số chiến trường cổ mộ chôn vùi bảo vật vô giá.',
    stageLevel: 'Kỷ Nguyên Cổ Đại',
    powerScore: 96,
    icon: '🌋',
    color: '#ef4444'
  },

  // 6. Đan Dược & Dược Thảo
  {
    id: 'node_treasure_cuu_diep_thao',
    domain: 'Alchemy',
    title: 'Cửu Diệp Hồi Hồn Thảo',
    subtitle: 'Linh Dược Tái Sinh Thần Hồn',
    tags: ['Linh Dược', 'Hồi Hồn', 'Tái Sinh', 'Thần Thảo'],
    essenceDescription: 'Ba ngàn năm nở một lá, cứu sống người chỉ còn một hơi thở, tái tạo kinh mạch đứt gãy và chữa lành thần hồn.',
    stageLevel: 'Ngũ Giai Thần Dược',
    powerScore: 88,
    icon: '🌿',
    color: '#22c55e'
  },

  // 7. Binh Khí & Cổ Vật
  {
    id: 'node_artifact_tan_ngoc_hon_don',
    domain: 'Weapons',
    title: 'Hỗn Độn Thần Ma Tàn Ngọc',
    subtitle: 'Khai Thiên Kỷ Nguyên Khởi Nguyên Ngọc Tỷ',
    tags: ['Cổ Vật', 'Bàn Tay Vàng', 'Tàn Hồn', 'Hỗn Độn'],
    essenceDescription: 'Mảnh ngọc rỉ sét che giấu khí linh Thương Lão, có khả năng làm chậm thời gian tu luyện và chứa đựng kiếm phổ vô thượng.',
    stageLevel: 'Thái Cổ Hồng Hoang',
    powerScore: 99,
    icon: '💎',
    color: '#a855f7'
  },

  // 8. Tông Môn & Thế Lực
  {
    id: 'node_sect_thanh_van',
    domain: 'Sects',
    title: 'Thanh Vân Tông',
    subtitle: 'Thanh Vân Thập Bát Phong (Nam Hoang)',
    tags: ['Tông Môn', 'Kiếm Tông', 'Chính Đạo', 'Sơn Môn'],
    essenceDescription: 'Tông môn kiếm đạo cổ kính ba vạn năm, nơi nhân vật chính xuất phát từ đệ tử tạp dịch Kiếm Trủng.',
    stageLevel: 'Tam Phẩm Tông Môn',
    powerScore: 82,
    icon: '⛩️',
    color: '#3b82f6'
  },

  // 9. Quốc Gia & Tiên Triều
  {
    id: 'node_nation_dai_can',
    domain: 'Nations',
    title: 'Đại Càn Tiên Triều',
    subtitle: 'Vạn Cổ Thiên Đô (Thần Triều Chí Tôn)',
    tags: ['Quốc Gia', 'Tiên Triều', 'Thánh Hoàng', 'Quân Đoàn'],
    essenceDescription: 'Đế quốc tu chân mười vạn năm thống trị Cửu Châu, sở hữu quân đoàn trăm vạn tu sĩ và chiến hạm phù không.',
    stageLevel: 'Thần Triều Cửu Châu',
    powerScore: 94,
    icon: '👑',
    color: '#f59e0b'
  },

  // 10. Nhân Vật
  {
    id: 'node_char_lingxiao',
    domain: 'Characters',
    title: 'Lăng Tiêu',
    subtitle: 'Hỗn Độn Kiếm Chủ (Nhân Vật Chính)',
    tags: ['Nhân Vật', 'Hỗn Độn Căn', 'Kiếm Tu', 'Nghịch Thiên'],
    essenceDescription: 'Thiếu niên mang Hỗn Độn Tổ Căn từng bị coi là phế vật, tính cách kiên định, thấu tình đạt lý, nghịch thiên cầu đạo.',
    stageLevel: 'Trúc Cơ Kỳ Đỉnh Phong',
    powerScore: 86,
    icon: '👤',
    color: '#6366f1'
  },

  // 11. Địa Danh & Hiểm Địa
  {
    id: 'node_realm_hac_long_uyen',
    domain: 'Realms',
    title: 'Hắc Long Uyên (Vực Sâu Rồng Đen)',
    subtitle: 'Hiểm Địa Sinh Tử Nam Hoang',
    tags: ['Địa Danh', 'Bí Cảnh', 'Cấm Khu', 'Long Khí'],
    essenceDescription: 'Vực sâu ngàn trượng chôn vùi xương rồng cổ đại, sương độc quanh năm, bên dưới ẩn giấu huyệt mộ kiếm tu viễn cổ.',
    stageLevel: 'Cực Nguy Cấp S',
    powerScore: 87,
    icon: '🏞️',
    color: '#64748b'
  },

  // 12. Mẩu Truyện Đơn Lẻ (Story Vignette)
  {
    id: 'node_vignette_tho_ren_mu',
    domain: 'StoryVignette',
    title: 'Tàn Đoạn: Thợ Rèn Mù Bên Bờ Hoàng Hà',
    subtitle: 'Giai thoại về thanh kiếm rỉ sét đâm xuyên mai rùa cổ',
    tags: ['Mẩu Truyện', 'Giai Thoại', 'Kiếm Trủng', 'Kỳ Ngộ'],
    essenceDescription: 'Câu chuyện một lão thợ rèn mù râu tóc bạc phơ đêm nào cũng gõ búa dưới trăng, trong lò không đỏ lửa mà phát ra tiếng rồng ngâm.',
    stageLevel: 'Mẩu Truyện Giai Thoại',
    powerScore: 79,
    icon: '📖',
    color: '#f43f5e'
  }
];

// =========================================================================
// PRESET: LIÊN KẾT NHÂN QUẢ ĐA MẢNG (SYNAPTIC LORE RELATIONSHIP EDGES)
// =========================================================================

export const PRESET_LORE_EDGES: LoreNetworkEdge[] = [
  {
    id: 'edge_1',
    sourceId: 'node_char_lingxiao',
    targetId: 'node_artifact_tan_ngoc_hon_don',
    relation: 'inherits',
    label: 'Kế Thừa Định Mệnh',
    narrativeCausality: 'Lăng Tiêu tình cờ nhỏ máu vào tàn ngọc rỉ sét trong Kiếm Trủng, kích hoạt khí linh Thương Lão và mở ra công pháp Thái Sơ.'
  },
  {
    id: 'edge_2',
    sourceId: 'node_artifact_tan_ngoc_hon_don',
    targetId: 'node_sword_nhat_diem_han_quang',
    relation: 'causes',
    label: 'Truyền Thừa Khai Mở',
    narrativeCausality: 'Khí linh trong tàn ngọc điểm hóa cho nhân vật chính chiêu thức "Nhất Điểm Hàn Quang" để phá giải đòn vây khốn của kẻ thù.'
  },
  {
    id: 'edge_3',
    sourceId: 'node_char_lingxiao',
    targetId: 'node_spine_truc_co',
    relation: 'requires',
    label: 'Đột Phá Cảnh Giới',
    narrativeCausality: 'Để chịu đựng được uy lực của kiếm quyết và cứu sống muội muội, Lăng Tiêu bắt buộc phải phá cảnh Trúc Cơ viên mãn.'
  },
  {
    id: 'edge_4',
    sourceId: 'node_spine_truc_co',
    targetId: 'node_treasure_cuu_diep_thao',
    relation: 'requires',
    label: 'Dược Dẫn Đột Phá',
    narrativeCausality: 'Thiên Đạo Trúc Cơ yêu cầu Cửu Diệp Hồi Hồn Thảo để làm dịu kinh mạch cuộn trào dưới sức ép của ngũ hành linh dịch.'
  },
  {
    id: 'edge_5',
    sourceId: 'node_treasure_cuu_diep_thao',
    targetId: 'node_realm_hac_long_uyen',
    relation: 'conceals',
    label: 'Nơi Cư Ngụ Hiểm Hóc',
    narrativeCausality: 'Cây thần thảo chỉ mọc tại vách đá ngàn trượng nơi Hắc Long Uyên giao thoa với long mạch cổ xưa.'
  },
  {
    id: 'edge_6',
    sourceId: 'node_vignette_tho_ren_mu',
    targetId: 'node_sword_nhat_diem_han_quang',
    relation: 'enhances',
    label: 'Gợi Ý Đốn Ngộ',
    narrativeCausality: 'Lời thì thầm của lão thợ rèn mù về "nhát búa vô thanh" tình cờ trùng khớp với khẩu quyết Nhất Điểm Hàn Quang.'
  },
  {
    id: 'edge_7',
    sourceId: 'node_talisman_cuu_thien_than_loi',
    targetId: 'node_spell_tu_tieu_chuong_tam_loi',
    relation: 'enhances',
    label: 'Lôi Hỏa Cộng Hưởng',
    narrativeCausality: 'Kích hoạt phù lục kết hợp phóng xuất Chưởng Tâm Lôi tạo ra bão sét Tử Tiêu gấp mười lần uy lực thông thường.'
  },
  {
    id: 'edge_8',
    sourceId: 'node_artifact_tan_ngoc_hon_don',
    targetId: 'node_deity_ban_co',
    relation: 'inherits',
    label: 'Khai Thiên Di Vật',
    narrativeCausality: 'Tàn ngọc thực chất là một góc của ngọc ấn mà Bàn Cổ Thần nắm giữ khi chém tan Hỗn Độn phân định càn khôn.'
  },
  {
    id: 'edge_9',
    sourceId: 'node_sect_thanh_van',
    targetId: 'node_nation_dai_can',
    relation: 'opposes',
    label: 'Ngấm Ngầm Cạnh Tranh',
    narrativeCausality: 'Đại Càn Tiên Triều muốn thu nạp Thanh Vân Tông làm quân viện, trong khi tông môn kiên quyết giữ vững vị thế độc lập.'
  }
];

// =========================================================================
// PRESET: KHO MẪU TRUYỆN ĐƠN LẺ / TÀN ĐOẠN GIAI THOẠI (STORY VIGNETTES)
// =========================================================================

export const PRESET_STORY_VIGNETTES: StoryVignetteItem[] = [
  {
    id: 'vignette_1',
    title: 'Giai Thoại: Lão Thợ Rèn Mù & Nhát Búa Vô Thanh',
    category: 'GiaiThoaiDanGian',
    loreTags: ['Thợ Rèn', 'Kiếm Thai', 'Hàn Quang', 'Hồng Trần'],
    linkedDomains: ['SwordDao', 'Weapons', 'Characters'],
    recommendedRealm: 'Luyện Khí ➜ Trúc Cơ',
    atmosphericMood: 'U tối bí ẩn',
    vignetteProse: `Dưới chân đèo Lạc Hà có một quán rèn cũ nát mái tranh rách bươm. Người chủ lò rèn là một lão già mù hai mắt lõm sâu, nhưng bàn tay gầy gò chai sạn như sắt nguội chưa từng gõ lệch một nhát búa nào. 

Đêm ấy mưa như trút nước, sấm chớp rạch ngang trời. Một thiếu niên áo vải ướt sũng bước vào trú mưa, bên hông đeo thanh sắt vụn gỉ sét không chuôi. Lão mù không ngẩng đầu, chỉ buông một câu khô khốc:
— "Kiếm của ngươi đang khóc. Nó thèm máu kẻ thù, nhưng chủ nhân nó lại đang sợ hãi."
Thiếu niên sững người. Lão già vung búa xuống đe sắt — một nhát búa không phát ra nửa tiếng động, nhưng tro tàn trong lò rèn bất ngờ bay ngược lên trời, tụ lại thành hình một mũi kiếm bạc lơ lửng giữa làn mưa.
— "Đâm kiếm không phải bằng cánh tay, mà bằng nhịp thở khi tim ngươi ngừng đập."`,
    plotSeedsAndSecrets: [
      'Lão thợ rèn mù thực chất là kiếm thánh danh chấn Cửu Châu ba trăm năm trước bế quan mai danh ẩn tích.',
      'Thanh sắt gỉ của thiếu niên thực chất là Kiếm Thai phong ấn bằng chín đạo huyết chú.',
      'Kẻ thù đang truy sát thiếu niên đang bủa vây quanh quán rèn trong đêm mưa.'
    ],
    naturalHookQuestions: [
      'Tại sao nhát búa lại không phát ra âm thanh?',
      'Lão mù có nhận ra thân thế của thiếu niên hay chỉ tình cờ hội ngộ?'
    ],
    authorWeavingTips: 'Dùng làm phân cảnh dẫn nhập cho nhân vật chính đốn ngộ chiêu thức kiếm đạo đầu tiên khi đang bế tắc và bị kẻ địch bủa vây.'
  },
  {
    id: 'vignette_2',
    title: 'Tàn Đoạn: Nhật Ký Thợ Mỏ Dưới Đáy Hắc Long Uyên',
    category: 'TanDoanBiCanh',
    loreTags: ['Thợ Mỏ', 'Linh Thạch', 'Hắc Long', 'Bí Cảnh'],
    linkedDomains: ['Realms', 'Alchemy', 'Beasts'],
    recommendedRealm: 'Trúc Cơ ➜ Kim Đan',
    atmosphericMood: 'Kinh hoàng rùng rợn',
    vignetteProse: `Mẩu giấy da cừu cháy sém tìm thấy trong hốc đá mỏ quặng sâu ba ngàn trượng:

"Ngày thứ mười bảy bị vùi lấp. Linh thạch cạn kiệt, đèn dầu đã tắt từ hôm qua. Chúng tôi nghe thấy tiếng thở dài phát ra từ mạch khoáng bên dưới. Không phải tiếng gió... đó là tiếng vảy rồng cọ xát vào đá tảng ngàn năm. 

Trần đại ca không chịu nổi cơn khát, đã liều mình uống nước rỉ ra từ rễ một nhánh cỏ màu tím bảy lá mọc cạnh xương sọ khổng lồ. Nửa canh giờ sau, mắt huynh ấy chuyển sang màu hoàng kim, da thịt mọc vảy đen nhánh rồi tự tay xé toạc ngực áo lao vào bóng tối... Đừng ai xuống đây nữa. Dưới này không phải mỏ linh thạch, mà là mồ chôn một con rồng chưa chết hẳn..."`,
    plotSeedsAndSecrets: [
      'Nhánh cỏ bảy lá chính là Cửu Diệp Hồi Hồn Thảo mọc nhờ hấp thụ long tủy.',
      'Con rồng đen dưới đáy vực đang tìm kiếm người mang thể chất đặc biệt để đoạt xá tái sinh.',
      'Mỏ quặng bị sập là do âm mưu của trưởng lão muốn chôn vùi sự thật về cổ tích rồng thiêng.'
    ],
    naturalHookQuestions: [
      'Điều gì đã biến thợ mỏ thành quái vật vảy đen?',
      'Ai là người cố tình niêm phong lối ra của hầm mỏ?'
    ],
    authorWeavingTips: 'Lồng ghép vào thời điểm nhân vật chính nhận nhiệm vụ tông môn đi tìm linh dược hoặc điều tra vụ mất tích kỳ bí dưới lòng đất.'
  },
  {
    id: 'vignette_3',
    title: 'Bí Văn: Bát Trà Nóng Ở Ma Phong Khách Điếm',
    category: 'GiaiThoaiDanGian',
    loreTags: ['Khách Điếm', 'Tán Tu', 'Ma Đạo', 'Tử Phù'],
    linkedDomains: ['TalismanDao', 'Sects', 'Characters'],
    recommendedRealm: 'Luyện Khí ➜ Trúc Cơ',
    atmosphericMood: 'Nhiệt huyết kịch tính',
    vignetteProse: `Giữa hoang mạc gió cát mịt mù, Ma Phong Khách Điếm đứng trơ trọi như một cái bóng ma quái. Bên trong quán, ba mươi tên tán tu mặt đầy sẹo đang im phăng phắc nhìn về phía góc bàn nơi một thiếu nữ mặc áo đỏ đang chậm rãi rót trà.

Cửa quán bật mở rầm một tiếng. Bảy tên tu sĩ mặc đạo bào màu máu ùa vào, đao kiếm loang lổ vết máu tươi:
— "Giao hết Trúc Cơ Đan và bản đồ bí cảnh ra đây, bằng không bổn tọa tắm máu cả cái quán này!"
Thiếu nữ áo đỏ vẫn thong thả nhấp ngụm trà nóng, ngón tay trỏ khẽ gõ nhẹ xuống mặt bàn gỗ ba tiếng "cốc, cốc, cốc".
Dưới mỗi chiếc ghế của bảy tên ma tu, một đạo hoàng chỉ phù văn màu tím bỗng bốc cháy bừng bừng. Sấm sét tử sắc từ dưới sàn gỗ bắn thẳng lên như cọc nhọn đâm xuyên qua đan điền của chúng trước khi đao kiếm kịp vung lên nửa tấc.
— "Trà còn chưa nguội, đừng làm bẩn sàn nhà của ta." — Thiếu nữ thản nhiên nói.`,
    plotSeedsAndSecrets: [
      'Thiếu nữ áo đỏ là đệ tử đào tẩu của một tông môn phù lục cổ xưa.',
      'Dưới sàn khách điếm đã được bố trí sẵn một tòa Cửu Thiên Lôi Phù đại trận từ trước.',
      'Bản đồ trong tay nàng chỉ dẫn tới di tích của một vị Thần Linh viễn cổ.'
    ],
    naturalHookQuestions: [
      'Làm thế nào phù lục kích hoạt mà không cần niệm chú?',
      'Thân phận thật sự của nữ chủ quán khách điếm là ai?'
    ],
    authorWeavingTips: 'Sử dụng làm tình huống tao ngộ ngẫu nhiên trên đường di chuyển giữa hai bản đồ, tạo điểm nhấn cho hệ thống Phù Lục tác chiến chớp nhoáng.'
  },
  {
    id: 'vignette_4',
    title: 'Ký Ức Tàn Hồn: Trận Chiến Trên Biển Mây Cửu Châu',
    category: 'TruyenThuyetLaoQuai',
    loreTags: ['Tàn Hồn', 'Khai Thiên', 'Ngũ Hành', 'Tiên Đế'],
    linkedDomains: ['PantheonCosmology', 'SpellDao', 'CultivationSpine'],
    recommendedRealm: 'Kim Đan ➜ Hóa Thần',
    atmosphericMood: 'Bi tráng bi thương',
    vignetteProse: `Ký ức mơ hồ lóe lên trong đầu khi thần niệm chạm vào vết rạn nứt của chiếc gương đồng:

"Đó là ngày bầu trời vỡ ra làm ba mảnh. Chín vạn chiến thuyền của Cửu Châu Tiên Triều xếp thành hình cánh chim bằng lơ lửng trên biển mây cuồn cuộn. Đứng đầu hạm đội là vị Tiên Đế mặc hoàng bào rách rưới, tay cầm ngọc ấn đã nứt làm đôi.

Phía đối diện, từ trong vết nứt không gian đen ngòm, hàng vạn bàn tay khổng lồ của Cổ Ma Vương vươn ra xé nát màng bảo vệ thế giới như xé giấy.
— 'Bệ hạ, trận đồ phòng ngự đã sụp đổ, chư vị trưởng lão đều đã đền nợ nước!'
Vị Tiên Đế nhìn xuống chúng sinh đang quỳ lạy dưới hạ giới, ánh mắt không hề dao động. Người tháo chiếc vòng ngũ sắc trên cổ tay ném vào tâm trận:
— 'Ta dùng thọ mệnh mười vạn năm và máu tim của dòng dõi đế vương, phong ấn khe nứt này thêm ba ngàn năm. Hậu nhân Cửu Châu, ngày ta trở lại cũng là ngày trời đất đổi dời...'"`,
    plotSeedsAndSecrets: [
      'Vị Tiên Đế trong ký ức chính là tổ tiên của hoàng tộc Đại Càn Tiên Triều.',
      'Chiếc vòng ngũ sắc chính là nguồn gốc của pháp thuật Ngũ Hành Thần Quang thất truyền.',
      'Thời hạn ba ngàn năm phong ấn sắp hết, báo hiệu đại kiếp diệt thế chuẩn bị ập đến.'
    ],
    naturalHookQuestions: [
      'Ai là kẻ đã đục thủng bức tường ngăn cách Cổ Ma?',
      'Tại sao ký ức này lại xuất hiện trong bảo vật của nhân vật chính?'
    ],
    authorWeavingTips: 'Rất đắt giá cho giai đoạn nhân vật chính đạt cảnh giới Kim Đan / Nguyên Anh, bắt đầu tiếp xúc với bí mật tầm vóc vũ trụ và gánh vác sứ mệnh cứu thế.'
  }
];
