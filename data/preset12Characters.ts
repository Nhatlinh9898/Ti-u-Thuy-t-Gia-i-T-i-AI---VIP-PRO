import { CharacterProfile } from '../types';

export const PRESET_12_CHARACTERS: CharacterProfile[] = [
  // 1. Lâm Tiêu (Chính diện / Khí Vận Chi Tử)
  {
    id: 'char_lam_tieu',
    name: 'Lâm Tiêu',
    pinyinOrAlias: 'Cửu U Kiếm Tiên / Vô Cực Đạo Chủ',
    role: 'Chính diện',
    gender: 'Nam',
    age: '21 tuổi (Kiếp trước 800 tuổi)',
    realmOrRank: 'Kim Đan Kỳ (Viên Mãn)',
    sectOrFaction: 'Thái Hư Kiếm Tông & Vô Cực Kiếm Các',
    factionPosition: 'Chân Truyền Đệ Nhất / Thiếu Kiếm Tôn',
    spiritualRoots: 'Hỗn Độn Khai Thiên Căn (Vô Cực Tổ Căn) - Thuần Khiết 100%',
    spiritualRootDetail: {
      countCategory: 'Hỗn Độn Khai Thiên Căn (Vô Cực Tổ Căn)',
      grade: 'Thần Cấp Hỗn Độn Tổ Căn (Nghịch Thiên Hỗn Độn)',
      rootName: 'Thái Sơ Hỗn Độn Vô Cực Linh Căn',
      elements: [
        { element: 'Hỗn Độn', purity: 100, color: '#a855f7', description: 'Bản nguyên hỗn độn diễn sinh vạn vật' },
        { element: 'Kim', purity: 98, color: '#facc15', description: 'Canh Kim Sát Lực chém đứt nhân quả' },
        { element: 'Hỏa', purity: 95, color: '#f87171', description: 'Tam Muội Chân Hỏa thiêu đốt ma chướng' }
      ],
      cultivationSpeedMultiplier: 'x15 lần khi đắm chìm trong Kiếm Ý Hỗn Độn',
      specialAuraEffect: 'Khi rút kiếm, sau lưng hiện ra chín đóa Hỗn Độn Thanh Liên trấn áp thiên địa'
    },
    mentalAttributes: {
      soulRealm: 'Nguyên Thần Pháp Tướng (Nguyên Anh - Phạm vi 10 - 50 dặm)',
      soulPowerPoints: 9800,
      perceptionRange: '35 dặm thần thức bao phủ',
      daoHeartType: 'Vạn Kiếp Bất Diệt Đạo Tâm / Trảm Thiên Bạt Kiếm',
      daoHeartStability: 99,
      comprehensionTier: 'Nghịch Thiên Yêu Nghiệt / Độc Đoán Vạn Cổ',
      comprehensionScore: 99,
      innerDemonResistance: 95
    },
    talents: [
      {
        id: 'tal_lamtieu_1',
        name: 'Trùng Sinh Ma Tôn Ký Ức',
        tier: 'Cấm Kỵ / Nghịch Thiên Cấp',
        category: 'Ý Cảnh / Chiến Đấu Thần Thông',
        description: 'Mang trọn vẹn 800 năm kinh nghiệm sinh tử, am hiểu tường tận nhược điểm của vạn môn công pháp trên đời.',
        combatBuffEffect: 'Miễn nhiễm 80% ảo thuật và thần niệm áp chế, tăng 200% tỷ lệ đòn đánh trúng điểm yếu'
      },
      {
        id: 'tal_lamtieu_2',
        name: 'Vô Cực Kiếm Đồng',
        tier: 'Thần Cấp',
        category: 'Đồng Thuật / Nhãn Giới',
        description: 'Đồng tử hóa kiếm trận quang, nhìn thấu quỹ đạo linh lực và khí vận của đối phương.',
        combatBuffEffect: 'Đoán trước chiêu thức trước 3 nhịp thở, sát thương chí mạng tăng 150%'
      }
    ],
    specialPhysique: 'Thái Sơ Hỗn Độn Thể (Đại Thành)',
    destinyFate: 'Kim Sắc Cực Phẩm (Đại Khí Vận / Thiên Mệnh Sở Quy)',
    personality: 'Trầm tĩnh quyết đoán, ân oán phân minh, ngoài lạnh trong nóng, sát phạt quả đoán với kẻ thù nhưng hết lòng bảo vệ người bên cạnh.',
    appearance: 'Bạch y viền bạc thanh nhã, mắt đen sâu thẳm như hồ băng nghìn trượng, phong thái xuất trần như tiên nhân trích thế, kiếm khí vô hình lượn quanh vạt áo.',
    weaponOrAbility: 'Cửu U Trảm Tiên Kiếm & Thái Sơ Hỗn Độn Kiếm Kinh',
    natalArtifact: 'Trấn Thiên Tru Ma Kiếm Thai',
    bondedBeast: 'Thái Cổ Lôi Đình Long Viên (Tứ giai trung kỳ)',
    grottoDwelling: 'Thái Hư Hậu Sơn Vấn Kiếm Đỉnh Thạch Các',
    fatalFlawOrTaboo: 'Tâm nguyện bảo hộ hồng nhan và thân nhân quá lớn; không cho phép bất kỳ ai xúc phạm tông môn cố thổ.',
    currentObjective: 'Đoạt Cửu Chuyển Hóa Thần Đan, rửa sạch oan khuất kiếp trước và tiêu diệt Huyết Cốt Ma Tôn.',
    backstory: 'Kiếp trước là Cửu U Ma Tôn kinh tài tuyệt diễm bị thập đại tông môn liên thủ vây hãm tại Đoạn Hồn Nhai. Trùng sinh trở về thời niên thiếu, quyết tâm tu luyện Hỗn Độn Kiếm Đạo chính thống, nghịch thiên cải mệnh cứu vớt những người từng bỏ mạng vì mình.',
    avatarUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60'
  },

  // 2. Lạc Thanh Hàn (Hồng nhan / Đạo lữ)
  {
    id: 'char_lac_thanh_han',
    name: 'Lạc Thanh Hàn',
    pinyinOrAlias: 'Băng Phách Tiên Tử / Cửu Thiên Kiếm Nữ',
    role: 'Hồng nhan/Tri kỷ',
    gender: 'Nữ',
    age: '20 tuổi',
    realmOrRank: 'Kim Đan Kỳ (Trung Kỳ)',
    sectOrFaction: 'Thái Hư Kiếm Tông (Tuyết Kiếm Phong)',
    factionPosition: 'Tuyết Kiếm Phong Đại Sư Tỷ / Đương Đại Thánh Nữ',
    spiritualRoots: 'Cực Âm Băng Phách Thiên Linh Căn (Thuần Khiết 100%)',
    spiritualRootDetail: {
      countCategory: 'Đơn Linh Căn (1 Căn - Thuần Khiết / Thiên Linh Căn)',
      grade: 'Thiên Linh Căn (100% Thuần Khiết Đơn Hệ)',
      rootName: 'Huyền Minh Cực Băng Thiên Linh Căn',
      elements: [
        { element: 'Băng', purity: 100, color: '#38bdf8', description: 'Hàn khí đóng băng linh lực và không gian' }
      ],
      cultivationSpeedMultiplier: 'x10 lần trong điều kiện băng thiên tuyết địa',
      specialAuraEffect: 'Mỗi bước chân nở ra hoa sen băng tuyết, bán kính ba trượng hoa tuyết bay lượn'
    },
    mentalAttributes: {
      soulRealm: 'Du Thần / Thần Niệm Tơ (Kim Đan - Phạm vi 1 - 5 dặm)',
      soulPowerPoints: 6200,
      perceptionRange: '8 dặm băng hàn cảm ứng',
      daoHeartType: 'Băng Tâm Ngọc Cốt / Nhất Niệm Tình Thâm',
      daoHeartStability: 94,
      comprehensionTier: 'Tuyệt Đỉnh Thiên Kiêu',
      comprehensionScore: 92,
      innerDemonResistance: 88
    },
    talents: [
      {
        id: 'tal_thanhhan_1',
        name: 'Hàn Sương Cấm Vực',
        tier: 'Thánh Cấp',
        category: 'Ý Cảnh / Chiến Đấu Thần Thông',
        description: 'Tỏa ra lĩnh vực băng sương tuyệt đối, giảm 50% tốc độ di chuyển và ngưng kết linh lực của kẻ địch.',
        combatBuffEffect: 'Đóng băng đòn đánh công kích tầm xa, phòng ngự băng giáp tăng 180%'
      }
    ],
    specialPhysique: 'Cực Âm Băng Hoàng Thể (Thức tỉnh 80%)',
    destinyFate: 'Tử Sắc Thượng Phẩm (Thiên Kiêu Xuất Thế / Nghịch Mệnh Tố Thiên)',
    personality: 'Thanh lãnh cao nhã, kiệm lời như ngọc, đối xử thế gian xa cách nhưng trước mặt đạo lữ lại dịu dàng hiền thục, sẵn sàng hy sinh tính mạng.',
    appearance: 'Băng lam liên y lộng lẫy, da trắng tựa tuyết đầu mùa, tóc dài đen nhánh chấm gót, mi thanh mục tú, phong thái tựa tiên nữ trên Nguyệt Cung.',
    weaponOrAbility: 'Tuyết Phách Hàn Quang Kiếm & Cửu U Tuyết Ảnh Kiếm Quyết',
    natalArtifact: 'Băng Hoàng Tụ Linh Trâm',
    bondedBeast: 'Băng Tinh Tuyết Điêu (Tam giai đỉnh phong)',
    grottoDwelling: 'Tuyết Kiếm Phong Đỉnh Hàn Băng Ngọc Động',
    fatalFlawOrTaboo: 'Đạo tâm gắn liền với sự an nguy của Lâm Tiêu; khi thể chất bộc phát cực âm hàn độc cần thuần dương linh lực áp chế.',
    currentObjective: 'Tìm kiếm Băng Hoàng Niết Bàn Chi Thảo để viên mãn thể chất, kề vai tác chiến cùng Lâm Tiêu.',
    backstory: 'Sinh ra trong gia tộc cổ xưa canh giữ cực bắc hàn uyên. Từ nhỏ đã mang Băng Hoàng Thể bị gia tộc ép liên hôn cùng thế gia Trung Châu. Được sư tôn mang về Thái Hư Tông, sau đó kết duyên sinh tử cùng Lâm Tiêu trong chuyến thám hiểm U Minh Cổ Địa.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60'
  },

  // 3. Tần Vô Đạo (Đối thủ truyền kiếp)
  {
    id: 'char_tan_vo_dao',
    name: 'Tần Vô Đạo',
    pinyinOrAlias: 'Hỗn Nguyên Đạo Tử / Bất Bại Chiến Thần',
    role: 'Đối thủ',
    gender: 'Nam',
    age: '23 tuổi',
    realmOrRank: 'Kim Đan Kỳ (Đỉnh Phong)',
    sectOrFaction: 'Vạn Kiếm Quy Tông',
    factionPosition: 'Thiếu Tông Chủ / Đệ Nhất Đạo Tử',
    spiritualRoots: 'Canh Kim Cực Đạo Thiên Linh Căn (Thuần Khiết 99%)',
    spiritualRootDetail: {
      countCategory: 'Đơn Linh Căn (1 Căn - Thuần Khiết / Thiên Linh Căn)',
      grade: 'Thiên Linh Căn (100% Thuần Khiết Đơn Hệ)',
      rootName: 'Hoang Cổ Canh Kim Bá Kiếm Căn',
      elements: [
        { element: 'Kim', purity: 99, color: '#eab308', description: 'Canh Kim phá toái vạn pháp chi lực' }
      ],
      cultivationSpeedMultiplier: 'x12 lần khi hấp thu sát khí chiến trường',
      specialAuraEffect: 'Khí thế bốc lên như kim sắc cự kiếm xé rách mây trời'
    },
    mentalAttributes: {
      soulRealm: 'Du Thần / Thần Niệm Tơ (Kim Đan - Phạm vi 1 - 5 dặm)',
      soulPowerPoints: 7500,
      perceptionRange: '15 dặm sát lục khí cơ',
      daoHeartType: 'Vô Địch Chiến Ý / Duy Ngã Độc Tôn',
      daoHeartStability: 96,
      comprehensionTier: 'Kinh Thế Hãi Tục',
      comprehensionScore: 94,
      innerDemonResistance: 89
    },
    talents: [
      {
        id: 'tal_tanvodao_1',
        name: 'Hoang Cổ Thánh Thể Thần Lực',
        tier: 'Thần Cấp',
        category: 'Cốt Cách / Kinh Mạch Bẩm Sinh',
        description: 'Nhục thân cứng rắn ngang thần binh pháp bảo, một quyền có thể đánh nát sơn hà không cần pháp thuật.',
        combatBuffEffect: 'Sức mạnh vật lý x500%, miễn nhiễm sát thương kim hệ dưới cấp bậc'
      }
    ],
    specialPhysique: 'Hoang Cổ Thánh Thể (Thành tựu Kim Cương Bất Hoại)',
    destinyFate: 'Tử Sắc Thượng Phẩm (Thiên Kiêu Xuất Thế / Nghịch Mệnh Tố Thiên)',
    personality: 'Kiêu hùng chính khí nhưng cuồng ngạo vô biên, khát khao chiến đấu cùng đối thủ mạnh nhất, khinh bỉ tiểu nhân quỷ kế.',
    appearance: 'Kim sắc chiến giáp chói lọi, tóc dài đỏ rực tung bay, thân hình cao lớn uy vũ tựa thiên thần giáng thế, ánh mắt sắc như đại đao.',
    weaponOrAbility: 'Hoang Cổ Trấn Ma Đao & Vô Thượng Bá Đao Quyết',
    natalArtifact: 'Bá Hoàng Trấn Nhạc Đỉnh',
    bondedBeast: 'Hoàng Kim Huyết Tích (Tam giai hậu kỳ)',
    grottoDwelling: 'Vạn Kiếm Đỉnh Chiến Thiên Điện',
    fatalFlawOrTaboo: 'Dễ rơi vào thế cuồng chiến bất chấp tính mạng; thà chết trận chứ quyết không lùi một bước.',
    currentObjective: 'Đánh bại Lâm Tiêu trong Đại Hội Tông Môn Thiên Kiêu để chứng minh Vô Địch Đạo.',
    backstory: 'Con trai duy nhất của Vạn Kiếm Tông Chủ, sinh ra đã mang dị tượng Kim Long quấn thân. Từ nhỏ đã vô địch cùng thế hệ khắp ba mươi sáu châu, xem Lâm Tiêu là viên đá mài kiếm duy nhất xứng tầm trong đời.',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60'
  },

  // 4. Huyết Cốt Ma Tôn (Đại phản diện)
  {
    id: 'char_huyet_cot_ma_ton',
    name: 'Huyết Cốt Ma Tôn',
    pinyinOrAlias: 'Tiêu Diệt Thiên / Vạn Thi Lão Tổ',
    role: 'Phản diện',
    gender: 'Nam',
    age: '1200 tuổi',
    realmOrRank: 'Luyện Hư Kỳ (Sơ Kỳ)',
    sectOrFaction: 'U Minh Huyết Hải Giáo & Cửu Sát Cung',
    factionPosition: 'Giáo Chủ / Vạn Ma Tối Cao Tôn Chủ',
    spiritualRoots: 'Cực Âm U Minh Huyết Cốt Căn',
    spiritualRootDetail: {
      countCategory: 'Dị Linh Căn (Biến Dị Lôi - Băng - Phong - Ám - Quang)',
      grade: 'Tiên Phẩm Dị Chủng Căn (Biến Dị Cực Hạn)',
      rootName: 'Huyết Hải Vạn Thi Thao Thiết Căn',
      elements: [
        { element: 'Huyết', purity: 98, color: '#dc2626', description: 'Hấp thu huyết tinh sinh linh để tăng tiến cảnh giới' },
        { element: 'Ám', purity: 96, color: '#1e1b4b', description: 'U minh sương mù ăn mòn linh hồn' }
      ],
      cultivationSpeedMultiplier: 'x20 lần khi cử hành Đại Tế Huyết Trận triệu linh',
      specialAuraEffect: 'Nơi bước qua cây cỏ héo tàn, mặt đất rỉ máu tanh nồng'
    },
    mentalAttributes: {
      soulRealm: 'Bất Diệt Hồn Quang (Hóa Thần / Luyện Hư - Vạn dặm bao phủ)',
      soulPowerPoints: 24000,
      perceptionRange: 'Ngàn dặm huyết tế cảm ứng',
      daoHeartType: 'Diệt Thế Ma Tâm / Duy Ngã Tồn Tại',
      daoHeartStability: 98,
      comprehensionTier: 'Lão Ma Quỷ Đạo / Thiên Mưu Tận Tính',
      comprehensionScore: 95,
      innerDemonResistance: 100
    },
    talents: [
      {
        id: 'tal_huyetcot_1',
        name: 'Huyết Ma Phân Thân Hóa Thần',
        tier: 'Cấm Kỵ / Nghịch Thiên Cấp',
        category: 'Thôn Phệ / Sinh Mệnh Cơ Năng',
        description: 'Hóa thân thành ba vạn sáu ngàn giọt máu; chỉ cần một giọt máu còn tồn tại liền có thể tái sinh.',
        combatBuffEffect: 'Bất tử bất diệt trong Huyết Hải Lĩnh Vực, hồi phục sinh mệnh tức thì'
      }
    ],
    specialPhysique: 'Cửu U Huyết Ma Thể (Viên Mãn)',
    destinyFate: 'Xích Sắc Sát Tinh (Sát Phá Lang / Huyết Hải Hận Cừu)',
    personality: 'Tàn nhẫn vô nhân tính, mưu sâu kế độc, coi vạn ức sinh linh như cỏ rác huyết tế, kiên nhẫn ẩn nhẫn suốt ngàn năm chờ cơ hội.',
    appearance: 'Hắc bào thêu long xà màu máu, mặt khô gầy như đầu lâu bọc da, hốc mắt rực hai ngọn U Minh Quỷ Hỏa xanh biếc ghê rợn.',
    weaponOrAbility: 'Cửu Sát Huyết Hồn Tràng & Vạn Hồn Tế Ma Đao',
    natalArtifact: 'Huyết Hải Vạn Độc Châu',
    bondedBeast: 'Cửu Đầu U Minh Huyết Mãng (Ngũ giai đỉnh phong)',
    grottoDwelling: 'Vạn Thi Huyết Uyên Cửu U Ma Điện',
    fatalFlawOrTaboo: 'Sợ hãi Chí Dương Cửu Thiên Lôi Kiếp và Hỗn Độn Kiếm Ý khắc chế linh hồn cốt tủy.',
    currentObjective: 'Huyết tế mười tòa đại thành Trung Châu để phá vỡ phong ấn Thiên Đạo bước lên Hợp Thể Kỳ.',
    backstory: 'Vốn là thiên tài chính đạo ngàn năm trước, bị tông môn hãm hại đẩy xuống Ma Uyên. Hấp thụ huyết hải thi cốt ma ma hóa hình, đồ sát sạch môn phái năm xưa rồi lập ra Huyết Hải Giáo thao túng toàn bộ bóng tối tu tiên giới.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60'
  },

  // 5. Cổ Phong Đạo Nhân (Sư phụ / Tiền bối)
  {
    id: 'char_co_phong_dao_nhan',
    name: 'Cổ Phong Đạo Nhân',
    pinyinOrAlias: 'Túy Tửu Kiếm Ông / Bất Hủ Ẩn Kiếm',
    role: 'Sư phụ/Tiền bối',
    gender: 'Nam',
    age: '560 tuổi',
    realmOrRank: 'Hóa Thần Kỳ (Hậu Kỳ)',
    sectOrFaction: 'Thái Hư Kiếm Tông (Kiếm Trủng Tàng Thư Các)',
    factionPosition: 'Thủ Hộ Giả / Thái Thượng Trưởng Lão Ẩn Danh',
    spiritualRoots: 'Thanh Hư Phong Linh Căn & Canh Kim Cổ Căn',
    spiritualRootDetail: {
      countCategory: 'Song Linh Căn (2 Căn - Tương Sinh / Tương Khắc)',
      grade: 'Cực Phẩm Linh Căn (Thuần độ 86% - 95%)',
      rootName: 'Hư Không Phong Kim Song Cực Căn',
      elements: [
        { element: 'Phong', purity: 95, color: '#2dd4bf', description: 'Tự do phóng khoáng, biến ảo khôn lường' },
        { element: 'Kim', purity: 92, color: '#facc15', description: 'Trảm ma kiếm sát cổ điển' }
      ],
      cultivationSpeedMultiplier: 'x8 lần khi say sưa ngâm thơ uống rượu',
      specialAuraEffect: 'Hồ lô rượu bên hông phát ra kiếm minh du dương chấn nhiếp ma chướng'
    },
    mentalAttributes: {
      soulRealm: 'Nguyên Thần Pháp Tướng (Nguyên Anh - Phạm vi 10 - 50 dặm)',
      soulPowerPoints: 16500,
      perceptionRange: '50 dặm gió thổi kiếm ngâm',
      daoHeartType: 'Tự Nhiên Vô Vi / Túy Lý Càn Khôn',
      daoHeartStability: 97,
      comprehensionTier: 'Lão Đạo Phản Phác Quy Chân',
      comprehensionScore: 96,
      innerDemonResistance: 96
    },
    talents: [
      {
        id: 'tal_cophong_1',
        name: 'Túy Tiên Kiếm Ý Tam Thập Lục Thức',
        tier: 'Thánh Cấp',
        category: 'Ý Cảnh / Chiến Đấu Thần Thông',
        description: 'Kiếm chiêu xuất ra vô hình vô tướng, người say nhưng kiếm không say, hóa giải mọi đòn đánh uy lực lớn.',
        combatBuffEffect: 'Né tránh 75% đòn công kích diện rộng, phản kích kiếm khí gấp đôi'
      }
    ],
    specialPhysique: 'Hư Linh Kiếm Khiếu Thể (Ẩn giấu)',
    destinyFate: 'Lam Sắc Trung Phẩm (Cơ Duyên Bất Phàm / Hộ Đạo Phúc Trạch)',
    personality: 'Hài hước xuề xòa, thích uống rượu ngon ngắm trăng, thấu suốt sự đời, nhìn như kẻ say ngủ gật nhưng thời khắc nguy nan ra tay một kiếm định giang sơn.',
    appearance: 'Lão giả mặc áo vải vá nhiều mảnh, râu tóc bạc phơ rối bời, tay luôn ôm một chiếc hồ lô rượu tím bóng láng, đôi mắt tinh anh lấp lánh như sao đêm.',
    weaponOrAbility: 'Cửu Tiêu Tửu Hồ Kiếm & Nhất Kiếm Phá Vạn Pháp',
    natalArtifact: 'Dưỡng Linh Tửu Tiên Hồ',
    bondedBeast: 'Thanh Phong Linh Hạc (Tứ giai trung kỳ)',
    grottoDwelling: 'Thái Hư Kiếm Trủng Hậu Sơn Túy Tiên Thạch',
    fatalFlawOrTaboo: 'Năm xưa từng thất bại trong đại kiếp nạn khiến đồ nhi ái mộ chết thảm, từ đó thề không bao giờ bước ra khỏi Kiếm Tông trừ khi gặp kẻ kế thừa chân chính.',
    currentObjective: 'Chỉ điểm Lâm Tiêu lĩnh ngộ tầng thứ ba của Hỗn Độn Kiếm Ý và bảo hộ đệ tử khỏi móng vuốt Ma Tông.',
    backstory: 'Từng là đệ nhất kiếm đạo thiên tài của Thái Hư Tông cách đây ba trăm năm. Một mình một kiếm bình định Loạn Ma Đảo, sau đó chán nản cảnh tranh quyền đoạt lợi nên giả điên giả say ẩn mình trong Kiếm Trủng chọn người hữu duyên.',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60'
  },

  // 6. Dạ Sát (Nội gián / Điệp viên)
  {
    id: 'char_da_sat',
    name: 'Dạ Sát',
    pinyinOrAlias: 'Hắc Điệp / Ảnh Nhẫn',
    role: 'Nội gián / Điệp viên',
    gender: 'Nữ',
    age: '22 tuổi',
    realmOrRank: 'Trúc Cơ Kỳ (Hậu Kỳ)',
    sectOrFaction: 'Thái Hư Kiếm Tông (Thực chất thuộc Thiên Cơ Các / Ma Môn Huyết Sát Các)',
    factionPosition: 'Hộ Kiếm Đường Chấp Sự kiêm Ám Tuyến Ngầm',
    spiritualRoots: 'Hắc Ám Ảnh Dực Dị Linh Căn',
    spiritualRootDetail: {
      countCategory: 'Dị Linh Căn (Biến Dị Lôi - Băng - Phong - Ám - Quang)',
      grade: 'Thượng Phẩm Linh Căn (Thuần độ 66% - 85%)',
      rootName: 'Hư Vô Dạ Ảnh Thao Quang Căn',
      elements: [
        { element: 'Ám', purity: 88, color: '#312e81', description: 'Ẩn nấp trong bóng tối hoàn toàn không lộ khí tức' }
      ],
      cultivationSpeedMultiplier: 'x6 lần trong bóng đêm và sương mù',
      specialAuraEffect: 'Bước chân không để lại dấu vết hay gợn sóng linh khí'
    },
    mentalAttributes: {
      soulRealm: 'Du Thần / Thần Niệm Tơ (Kim Đan - Phạm vi 1 - 5 dặm)',
      soulPowerPoints: 5100,
      perceptionRange: '6 dặm phạm vi thám thính',
      daoHeartType: 'Trầm Mặc Như Băng / Khát Vọng Tự Do',
      daoHeartStability: 89,
      comprehensionTier: 'Mật Thám Đỉnh Cấp',
      comprehensionScore: 88,
      innerDemonResistance: 85
    },
    talents: [
      {
        id: 'tal_dasat_1',
        name: 'Hóa Ảnh Vô Ngân Thuật',
        tier: 'Địa Cấp',
        category: 'Thời Không / Quy Tắc Khai Thiên',
        description: 'Hòa tan nhục thân vào bóng tối trong 30 nhịp thở, tránh được mọi sự dò xét của thần thức Nguyên Anh trở xuống.',
        combatBuffEffect: 'Khó bị khóa mục tiêu, ám sát bạo kích x250%'
      }
    ],
    specialPhysique: 'Huyễn Ảnh Hư Không Thể (Sơ cấp)',
    destinyFate: 'Lục Sắc Thường Phẩm (Bình Phàm Hữu Phúc)',
    personality: 'Cẩn trọng đa nghi, ít nói, nội tâm giằng xé giữa lòng trung thành ép buộc và sự ngưỡng mộ chính nghĩa của Lâm Tiêu.',
    appearance: 'Áo dạ hành bó sát màu tím đen phác họa thân hình thon thả uyển chuyển, khuôn mặt luôn đeo khăn voan đen mỏng chỉ lộ đôi mắt sắc sảo u uất.',
    weaponOrAbility: 'Tử Ảnh Song Đoản Nhận & U Minh Ẩn Khí Quyết',
    natalArtifact: 'Mẫu Tử Truyền Âm Huyết Điệp',
    bondedBeast: 'Vô Thanh Dạ Bức (Nhị giai đỉnh phong)',
    grottoDwelling: 'Thái Hư Kiếm Tông Ngầm Dưới Lòng Vấn Kiếm Nhai',
    fatalFlawOrTaboo: 'Bị Ma Tông gieo rắc Phệ Hồn Huyết Cổ vào đan điền; định kỳ mỗi tháng phải uống giải dược nếu không sẽ vỡ tim mà chết.',
    currentObjective: 'Thu thập kiếm phổ của Thái Hư Tông đồng thời tìm cơ hội xin Lâm Tiêu giải trừ Huyết Cổ.',
    backstory: 'Vốn là cô nhi được Huyết Sát Các nhặt về huấn luyện từ thuở nhỏ. Sau 10 năm vượt qua sinh tử đấu trường được cài cắm vào Thái Hư Kiếm Tông làm tai mắt, liên tục truyền tin tình báo cơ mật.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60'
  },

  // 7. Mộ Dung Tuyết (Thế gia thiên kiêu / Kiêu ngạo)
  {
    id: 'char_mo_dung_tuyet',
    name: 'Mộ Dung Tuyết',
    pinyinOrAlias: 'Càn Khôn Kiếm Thiếu / Tử Tiêu Đạo Tử',
    role: 'Đối thủ',
    gender: 'Nam',
    age: '22 tuổi',
    realmOrRank: 'Kim Đan Kỳ (Sơ Kỳ)',
    sectOrFaction: 'Mộ Dung Cổ Thế Gia & Càn Khôn Đạo Viện',
    factionPosition: 'Đích Hệ Thiếu Chủ',
    spiritualRoots: 'Tử Tiêu Thần Lôi Dị Linh Căn',
    spiritualRootDetail: {
      countCategory: 'Dị Linh Căn (Biến Dị Lôi - Băng - Phong - Ám - Quang)',
      grade: 'Cực Phẩm Linh Căn (Thuần độ 86% - 95%)',
      rootName: 'Tử Tiêu Diệt Ma Lôi Căn',
      elements: [
        { element: 'Lôi', purity: 94, color: '#a855f7', description: 'Lôi đình phá hủy vạn ma cuồng bạo' }
      ],
      cultivationSpeedMultiplier: 'x9 lần trong ngày dông bão sấm sét',
      specialAuraEffect: 'Toàn thân phóng điện quang màu tím lách tách xé rách không khí'
    },
    mentalAttributes: {
      soulRealm: 'Du Thần / Thần Niệm Tơ (Kim Đan - Phạm vi 1 - 5 dặm)',
      soulPowerPoints: 5800,
      perceptionRange: '7 dặm lôi đình cảm ứng',
      daoHeartType: 'Thế Gia Chí Tôn / Cuồng Ngạo Bất Khuất',
      daoHeartStability: 88,
      comprehensionTier: 'Thế Gia Đại Tài',
      comprehensionScore: 90,
      innerDemonResistance: 82
    },
    talents: [
      {
        id: 'tal_modung_1',
        name: 'Tử Tiêu Lôi Giới',
        tier: 'Thánh Cấp',
        category: 'Ý Cảnh / Chiến Đấu Thần Thông',
        description: 'Triệu hoán lôi vân ngàn trượng giáng sấm sét hủy diệt đối phương.',
        combatBuffEffect: 'Sát thương lôi hệ x200%, gây choáng kẻ địch trong 2 nhịp thở'
      }
    ],
    specialPhysique: 'Hỗn Nguyên Lôi Linh Thể',
    destinyFate: 'Tử Sắc Thượng Phẩm (Thiên Kiêu Xuất Thế / Nghịch Mệnh Tố Thiên)',
    personality: 'Xuất thân cao quý, tính tình kiêu ngạo tự phụ, coi thường tán tu và đệ tử xuất thân bần hàn, nhưng giữ lời hứa và trọng quy củ danh môn.',
    appearance: 'Cẩm bào tơ tằm màu tím thêu hoa văn sấm sét bằng chỉ vàng, ngọc bội rực rỡ bên hông, quạt ngọc xếp trong tay, khí chất vương giả cao sang.',
    weaponOrAbility: 'Cửu Lôi Hóa Long Kiếm & Tử Tiêu Phạt Tội Lôi Quyết',
    natalArtifact: 'Lôi Thần Trấn Giới Ấn',
    bondedBeast: 'Tử Lôi Điêu (Tam giai trung kỳ)',
    grottoDwelling: 'Mộ Dung Sơn Trang Cửu Lôi Thần Các',
    fatalFlawOrTaboo: 'Quá sĩ diện và xem trọng vinh quang gia tộc; không chấp nhận nổi thất bại trước kẻ có xuất thân thấp hèn hơn mình.',
    currentObjective: 'Đoạt được vị trí thủ khoa Đạo Viện Thí Luyện để thừa kế chức Gia Chủ Mộ Dung Gia.',
    backstory: 'Sinh ra tại Mộ Dung Gia - một trong tứ đại thế gia thống trị phía Đông. Từ nhỏ ngậm thìa vàng, tiêu hao hàng triệu linh thạch cực phẩm và đan dược thượng hạng để tạo nền tảng vô địch.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60'
  },

  // 8. Dược Lão Đầu (Bách nghệ phụ trợ / Luyện Đan Đại Sư)
  {
    id: 'char_duoc_lao_dau',
    name: 'Cổ Đan Sinh (Dược Lão)',
    pinyinOrAlias: 'Thần Nông Nhất Mạch / Vạn Dược Dược Tôn',
    role: 'Hỗ trợ',
    gender: 'Nam',
    age: '420 tuổi',
    realmOrRank: 'Nguyên Anh Kỳ (Sơ Kỳ)',
    sectOrFaction: 'Đan Đỉnh Tông & Tán Tu Minh',
    factionPosition: 'Cổ Dược Đường Đường Chủ kiêm Lục Phẩm Đan Sư',
    spiritualRoots: 'Mộc Hỏa Song Sinh Ất Mộc Thuần Hỏa Căn',
    spiritualRootDetail: {
      countCategory: 'Song Linh Căn (2 Căn - Tương Sinh / Tương Khắc)',
      grade: 'Thượng Phẩm Linh Căn (Thuần độ 66% - 85%)',
      rootName: 'Thần Nông Mộc Hỏa Đan Đạo Căn',
      elements: [
        { element: 'Mộc', purity: 92, color: '#4ade80', description: 'Ất Mộc sinh linh ôn dưỡng linh dược' },
        { element: 'Hỏa', purity: 94, color: '#ef4444', description: 'Địa Tâm Thanh Liên Hỏa nung luyện đan hoàn' }
      ],
      cultivationSpeedMultiplier: 'x7 lần khi ngồi cạnh lò luyện đan thần cấp',
      specialAuraEffect: 'Mùi thơm thảo dược thoang thoảng mười dặm, hít vào khoan khoái tinh thần'
    },
    mentalAttributes: {
      soulRealm: 'Nguyên Thần Pháp Tướng (Nguyên Anh - Phạm vi 10 - 50 dặm)',
      soulPowerPoints: 14000,
      perceptionRange: '20 dặm dược tính vi quan cảm ứng',
      daoHeartType: 'Tế Thế Cứu Nhân / Đan Đạo Nhất Tâm',
      daoHeartStability: 95,
      comprehensionTier: 'Đan Đạo Tông Sư',
      comprehensionScore: 95,
      innerDemonResistance: 90
    },
    talents: [
      {
        id: 'tal_duoclao_1',
        name: 'Thần Nông Biện Dược Thần Nhãn',
        tier: 'Thánh Cấp',
        category: 'Bách Nghệ Kỳ Tài (Đan / Phù / Trận / Khí / Ngự Thú)',
        description: 'Chỉ cần ngửi hoặc nếm qua là biết ngay dược tính, độc tính và phương pháp hóa giải của bất kỳ độc dược thế gian.',
        combatBuffEffect: 'Kháng 99% mọi loại độc tố dưới bát phẩm, trị thương tốc độ x300%'
      }
    ],
    specialPhysique: 'Bách Thảo Bất Độc Thể',
    destinyFate: 'Lam Sắc Trung Phẩm (Cơ Duyên Bất Phàm / Hộ Đạo Phúc Trạch)',
    personality: 'Say mê nghiên cứu đan đạo tới mức quên ăn quên ngủ, tính khí lập dị, hay càu nhàu nhưng cực kỳ trung thành và sẵn lòng dốc hết gia tài cứu người hữu duyên.',
    appearance: 'Lão nhân râu tóc hoa râm bù xù, mặt dính bụi than từ lò đan, áo choàng màu xám bốc mùi thuốc đắng, thắt lưng treo hàng chục bình ngọc đan dược các loại.',
    weaponOrAbility: 'Cửu Long Dược Vương Đỉnh & Tam Muội Chân Hỏa',
    natalArtifact: 'Thần Nông Dược Điển Tàn Quyển',
    bondedBeast: 'Tầm Dược Linh Chồn (Nhị giai đỉnh phong)',
    grottoDwelling: 'Thập Vạn Đại Sơn Vạn Dược Cốc Đan Phòng',
    fatalFlawOrTaboo: 'Chiến lực trực tiếp không bằng tu sĩ chiến đấu cùng giai; cực kỳ căm ghét những kẻ phá hủy linh thảo quý hiếm.',
    currentObjective: 'Luyện chế thành công Thất Phẩm Phá Ách Đan để phục hồi linh mạch cho huynh đệ tri kỷ.',
    backstory: 'Từng là đại trưởng lão Đan Đỉnh Tông danh chấn thiên hạ, do bất đồng quan điểm khi tông môn dùng máu trẻ em luyện đan tà đạo nên đã đánh vỡ lò đan tông môn trốn thoát ra ngoài sống ẩn dật.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60'
  },

  // 9. Minh Hà Thủy Tổ (Ẩn thế lão tổ / Cổ ma đoạt xá)
  {
    id: 'char_minh_ha_thuy_to',
    name: 'Minh Hà Thủy Tổ',
    pinyinOrAlias: 'U Minh Lão Quái / Huyết Hải Chí Tôn',
    role: 'Ẩn thế lão tổ',
    gender: 'Nam',
    age: '3500 tuổi',
    realmOrRank: 'Đại Thừa Kỳ (Chuẩn Tiên Đỉnh Phong)',
    sectOrFaction: 'Thượng Cổ Ma Giới & Minh Hà Đạo Thống',
    factionPosition: 'Khai Sơn Thủy Tổ Thượng Cổ',
    spiritualRoots: 'Hỗn Độn U Minh Huyết Sát Căn',
    spiritualRootDetail: {
      countCategory: 'Hỗn Độn Khai Thiên Căn (Vô Cực Tổ Căn)',
      grade: 'Thần Cấp Hỗn Độn Tổ Căn (Nghịch Thiên Hỗn Độn)',
      rootName: 'Thái Cổ Minh Hà Ma Tổ Huyết Căn',
      elements: [
        { element: 'Huyết', purity: 100, color: '#991b1b', description: 'Huyết hải sinh linh bất diệt' },
        { element: 'Hỗn Độn', purity: 98, color: '#4c1d95', description: 'Hỗn độn nguyên sơ ma ý' }
      ],
      cultivationSpeedMultiplier: 'x25 lần khi hấp thu tinh huyết chư thiên',
      specialAuraEffect: 'Sau lưng hiện ra biển máu đỏ thẫm cuộn trào ngập trời, vạn quỷ gào thét'
    },
    mentalAttributes: {
      soulRealm: 'Chân Linh Thái Cổ / Tiên Hồn Cực Cảnh (Xuyên toa giới diện)',
      soulPowerPoints: 85000,
      perceptionRange: 'Bao phủ cả một tiểu thế giới',
      daoHeartType: 'Vạn Cổ Hóa Trần / Bất Hủ Ma Niệm',
      daoHeartStability: 100,
      comprehensionTier: 'Thái Cổ Lão Quái / Thấu Triệt Thiên Cơ',
      comprehensionScore: 100,
      innerDemonResistance: 100
    },
    talents: [
      {
        id: 'tal_minhha_1',
        name: 'Minh Hà Đoạt Xá Chuyển Sinh Quyết',
        tier: 'Cấm Kỵ / Nghịch Thiên Cấp',
        category: 'Cốt Cách / Kinh Mạch Bẩm Sinh',
        description: 'Tàn hồn bất diệt, có thể ký sinh vào ngọc giản hoặc bảo vật thượng cổ chờ đợi thân xác hoàn hảo để đoạt xá.',
        combatBuffEffect: 'Đoạt xá thành công kế thừa trọn vẹn tu vi thể chất của thân xác mới'
      }
    ],
    specialPhysique: 'Hỗn Độn Minh Hà Bất Diệt Thể',
    destinyFate: 'Xích Sắc Sát Tinh (Sát Phá Lang / Huyết Hải Hận Cừu)',
    personality: 'Thâm hiểm khó lường, sống qua nhiều kỷ nguyên nên coi vạn vật như quân cờ, không từ thủ đoạn để trường sinh bất tử.',
    appearance: 'Hình bóng hư ảo lúc ẩn lúc hiện trong hắc vụ, đôi mắt đỏ ngầu như hai vầng trăng máu chiếu rọi bóng đêm vô tận.',
    weaponOrAbility: 'A Tu La Song Kiếm (Nguyên Đồ & A Tỳ) & Huyết Hải Vô Nhai Đại Trận',
    natalArtifact: 'Thập Nhị Phẩm Nghiệp Hỏa Hồng Liên',
    bondedBeast: 'Hồng Hoang Huyết Sí Hắc Văn Hạt (Lục giai đỉnh phong)',
    grottoDwelling: 'Thâm Uyên Giới Cốt Ma Vương Tọa',
    fatalFlawOrTaboo: 'Bị Thiên Đạo Quy Tắc áp chế, nếu bộc lộ toàn bộ uy năng sẽ dẫn phát Tiên Kiếp Hủy Diệt.',
    currentObjective: 'Tìm kiếm thân xác mang Thần Cấp Hỗn Độn Thể để hoàn tất đoạt xá phi thăng Tiên Giới.',
    backstory: 'Thượng cổ cự ma tồn tại từ thời khai thiên lập địa. Trong trận Thần Ma Đại Chiến bị chúng tiên phong ấn dưới đáy U Minh Cổ Nhai. Trải qua ba ngàn năm rốt cuộc thoát ra một tia tàn hồn rình rập săn mồi.',
    avatarUrl: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=500&auto=format&fit=crop&q=60'
  },

  // 10. Diệp Thần (Khí vận chi tử / Bị khinh bỉ vươn lên)
  {
    id: 'char_diep_than',
    name: 'Diệp Thần',
    pinyinOrAlias: 'Bất Khuất Kiếm Cuồng / Hoang Cổ Thần Vương',
    role: 'Chính diện',
    gender: 'Nam',
    age: '18 tuổi',
    realmOrRank: 'Trúc Cơ Kỳ (Sơ Kỳ)',
    sectOrFaction: 'Thanh Vân Tông (Tạp Dịch Viện)',
    factionPosition: 'Hậu Sơn Tạp Dịch kiêm Thợ Đốn Củi',
    spiritualRoots: 'Ngũ Hành Phế Căn biến dị thành Ngũ Hành Luân Hồi Căn',
    spiritualRootDetail: {
      countCategory: 'Ngũ Hành Tạp Căn (5 Căn - Phế Căn Phàm Giới / Đồng Thể Thượng Cổ)',
      grade: 'Thần Cấp Hỗn Độn Tổ Căn (Nghịch Thiên Hỗn Độn)',
      rootName: 'Ngũ Hành Luân Hồi Hỗn Độn Căn',
      elements: [
        { element: 'Kim', purity: 80, color: '#facc15' },
        { element: 'Mộc', purity: 80, color: '#4ade80' },
        { element: 'Thủy', purity: 80, color: '#38bdf8' },
        { element: 'Hỏa', purity: 80, color: '#f87171' },
        { element: 'Thổ', purity: 80, color: '#fb923c' }
      ],
      cultivationSpeedMultiplier: 'x10 lần khi mở khóa phong ấn chiếc nhẫn đen',
      specialAuraEffect: 'Năm đạo linh quang luân chuyển không ngừng như bánh xe thái cực'
    },
    mentalAttributes: {
      soulRealm: 'Uẩn Thần (Luyện Khí / Trúc Cơ - Phạm vi 50 - 300 mét)',
      soulPowerPoints: 2800,
      perceptionRange: '800 mét thần niệm',
      daoHeartType: 'Ba Mươi Năm Hà Đông Ba Mươi Năm Hà Tây / Bất Khuất',
      daoHeartStability: 98,
      comprehensionTier: 'Đại Khí Vãn Thành',
      comprehensionScore: 92,
      innerDemonResistance: 96
    },
    talents: [
      {
        id: 'tal_diepthan_1',
        name: 'Hắc Giới Lão Tổ Tùy Thân',
        tier: 'Cấm Kỵ / Nghịch Thiên Cấp',
        category: 'Bách Nghệ Kỳ Tài (Đan / Phù / Trận / Khí / Ngự Thú)',
        description: 'Bên trong chiếc nhẫn đen có ẩn chứa tàn hồn của một vị Tiên Giới Dược Tôn chỉ điểm tu luyện.',
        combatBuffEffect: 'Có thể mượn linh lực của lão tổ bạo phát tăng 3 cảnh giới nhỏ trong nguy cấp'
      }
    ],
    specialPhysique: 'Hoang Cổ Bất Diệt Kinh Mạch',
    destinyFate: 'Kim Sắc Cực Phẩm (Đại Khí Vận / Thiên Mệnh Sở Quy)',
    personality: 'Ý chí sắt đá, chịu thương chịu khó, thù dai như đỉa đói nhưng ân nghĩa khắc sâu, câu cửa miệng: "Ba mươi năm Hà Đông, ba mươi năm Hà Tây, đừng khinh thiếu niên nghèo!".',
    appearance: 'Thanh niên mặc áo gai thô rách vá, vóc dáng gầy gò nhưng cơ bắp săn chắc rắn rỏi, ánh mắt rực lửa không chịu khuất phục trước số phận.',
    weaponOrAbility: 'Huyền Thiết Đoản Đao & Bát Hoang Phá Thiên Quyền',
    natalArtifact: 'Hắc Sắc Cổ Giới (Nhẫn đen thần bí)',
    bondedBeast: 'Tiểu Viêm Thú (Nhất giai biến dị)',
    grottoDwelling: 'Thanh Vân Tông Tạp Dịch Khởi Sơn Động',
    fatalFlawOrTaboo: 'Dễ bị kích động khi bị kẻ khác sỉ nhục gia đình hoặc vị hôn thê từ hôn.',
    currentObjective: 'Ba năm sau thượng sơn đánh bại thiên kiêu của Vân Lam Tông để rửa sạch nhục từ hôn.',
    backstory: 'Thiếu gia của một tiểu gia tộc biên thùy. Năm mười bốn tuổi linh lực bỗng nhiên biến mất bí ẩn, bị vị hôn thê tới tận cửa hủy hôn sỉ nhục. Sau đó phát hiện linh lực bị chiếc nhẫn cổ đen hút đi, thức tỉnh tàn hồn đại năng mở ra con đường nghịch tập.',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60'
  },

  // 11. Tô Mị Nhi (Yêu tộc mị hoặc / Hồng nhan tri kỷ)
  {
    id: 'char_to_mi_nhi',
    name: 'Tô Mị Nhi',
    pinyinOrAlias: 'Cửu Vĩ Thiên Hồ / Vạn Yêu Thánh Nữ',
    role: 'Hồng nhan/Tri kỷ',
    gender: 'Nữ',
    age: '180 tuổi (Dung mạo thiếu nữ 18)',
    realmOrRank: 'Kim Đan Kỳ (Hậu Kỳ)',
    sectOrFaction: 'Vạn Yêu Thánh Thành (Thiên Hồ Cổ Tộc)',
    factionPosition: 'Hồ Tộc Thiếu Chủ kiêm Thánh Nữ Đương Đại',
    spiritualRoots: 'Huyễn Vực Mị Tâm Yêu Linh Căn',
    spiritualRootDetail: {
      countCategory: 'Dị Linh Căn (Biến Dị Lôi - Băng - Phong - Ám - Quang)',
      grade: 'Cực Phẩm Linh Căn (Thuần độ 86% - 95%)',
      rootName: 'Cửu Vĩ Huyễn Quang Thiên Yêu Căn',
      elements: [
        { element: 'Quang', purity: 92, color: '#f59e0b', description: 'Huyễn quang mê hoặc nhân tâm' },
        { element: 'Hỏa', purity: 90, color: '#f97316', description: 'Hồ Tiên Yêu Hỏa thiêu rụi thần niệm' }
      ],
      cultivationSpeedMultiplier: 'x11 lần dưới ánh trăng rằm thái âm',
      specialAuraEffect: 'Hương thơm xạ hương mê hoặc lòng người, sau lưng thấp thoáng chín cái đuôi hồ ly mờ ảo'
    },
    mentalAttributes: {
      soulRealm: 'Du Thần / Thần Niệm Tơ (Kim Đan - Phạm vi 1 - 5 dặm)',
      soulPowerPoints: 7800,
      perceptionRange: '12 dặm mị thuật cảm ứng',
      daoHeartType: 'Hồ Tiên Nhất Mộng / Trọng Tình Trọng Nghĩa',
      daoHeartStability: 91,
      comprehensionTier: 'Thiên Sinh Linh Tuệ',
      comprehensionScore: 93,
      innerDemonResistance: 86
    },
    talents: [
      {
        id: 'tal_tominhi_1',
        name: 'Cửu Vĩ Huyễn Đồng Mị Thuật',
        tier: 'Thánh Cấp',
        category: 'Đồng Thuật / Nhãn Giới',
        description: 'Chỉ cần một ánh mắt liền khiến tu sĩ cùng giai chìm vào ảo cảnh hồng trần không thể tự thoát.',
        combatBuffEffect: 'Khống chế tuyệt đối kẻ địch trong 5 nhịp thở, miễn nhiễm đòn sát thương tinh thần'
      }
    ],
    specialPhysique: 'Thiên Hồ Linh Lung Thể',
    destinyFate: 'Tử Sắc Thượng Phẩm (Thiên Kiêu Xuất Thế / Nghịch Mệnh Tố Thiên)',
    personality: 'Yêu kiều mị hoặc, nửa cười nửa giỡn, thông minh giảo hoạt như cáo nhưng chân thành trọng tình, đối xử với kẻ thù thì ra tay tàn nhẫn không chút lưu tình.',
    appearance: 'Hồng y đào hoa lụa mỏng quyến rũ, đôi mắt hồ ly ươn ướt đa tình, khóe môi luôn nở nụ cười câu hồn đoạt phách, dáng đi uyển chuyển thướt tha.',
    weaponOrAbility: 'Thiên Hồ Mị Cốt Phiến & Yêu Hỏa Phệ Hồn Quyết',
    natalArtifact: 'Linh Lung Huyễn Vực Linh Đang',
    bondedBeast: 'Bạch Nguyệt Hồ (Tam giai đỉnh phong)',
    grottoDwelling: 'Vạn Yêu Sơn Thiên Hồ Cung Nguyệt Dạ Các',
    fatalFlawOrTaboo: 'Cứ mỗi 100 năm phải trải qua một lần Thiên Kiếp Thoát Thai Hoán Cốt, trong 7 ngày đó linh lực bị phong ấn trở về dạng cáo trắng nhỏ.',
    currentObjective: 'Liên kết cùng các tông môn chính đạo để bảo vệ Yêu Giới khỏi họa diệt tộc trước âm mưu Ma Tông.',
    backstory: 'Thánh nữ của Thiên Hồ Tộc, trong một lần lẻn ra ngoài nhân giới dạo chơi bị tu sĩ săn thú vây bắt trọng thương. Được nhân vật chính cứu giúp và chăm sóc khi hóa thành cáo nhỏ, từ đó khắc cốt ghi tâm mối tình tri kỷ.',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60'
  },

  // 12. Triệu Vô Cực (Phản đồ / Hắc hóa huynh đệ)
  {
    id: 'char_trieu_vo_cuc',
    name: 'Triệu Vô Cực',
    pinyinOrAlias: 'U Hồn Kiếm Quỷ / Bạt Kiếm Vô Tình',
    role: 'Phản diện',
    gender: 'Nam',
    age: '21 tuổi',
    realmOrRank: 'Kim Đan Kỳ (Sơ Kỳ)',
    sectOrFaction: 'Thái Hư Kiếm Tông (Trước kia) / Ma Kiếm Môn (Hiện tại)',
    factionPosition: 'Ma Kiếm Phục Hận Sứ',
    spiritualRoots: 'Hắc Kim Sát Linh Căn',
    spiritualRootDetail: {
      countCategory: 'Dị Linh Căn (Biến Dị Lôi - Băng - Phong - Ám - Quang)',
      grade: 'Thượng Phẩm Linh Căn (Thuần độ 66% - 85%)',
      rootName: 'Hắc Ám Oán Sát Kiếm Căn',
      elements: [
        { element: 'Kim', purity: 89, color: '#eab308' },
        { element: 'Ám', purity: 91, color: '#1e1b4b' }
      ],
      cultivationSpeedMultiplier: 'x8 lần khi nuốt chửng linh hồn đồng môn',
      specialAuraEffect: 'Kiếm khí toát ra tiếng khóc oán hận thê lương của linh hồn bị giết'
    },
    mentalAttributes: {
      soulRealm: 'Du Thần / Thần Niệm Tơ (Kim Đan - Phạm vi 1 - 5 dặm)',
      soulPowerPoints: 5400,
      perceptionRange: '5 dặm sát niệm',
      daoHeartType: 'Đố Kỵ Cuồng Si / Ma Đạo Hủy Diệt',
      daoHeartStability: 75,
      comprehensionTier: 'Cực Đoan Ma Kiếm',
      comprehensionScore: 86,
      innerDemonResistance: 40
    },
    talents: [
      {
        id: 'tal_trieuvocuc_1',
        name: 'Oán Hồn Kiếm Trận Phệ Tâm',
        tier: 'Địa Cấp',
        category: 'Ý Cảnh / Chiến Đấu Thần Thông',
        description: 'Dẫn dụ oán khí của kẻ bị giết ngưng tụ thành kiếm sát, đánh thẳng vào tâm ma của đối thủ.',
        combatBuffEffect: 'Gây hiệu ứng rạn nứt đạo tâm đối phương, hút 20% sinh lực kẻ địch'
      }
    ],
    specialPhysique: 'Oán Sát Ma Thể',
    destinyFate: 'Hắc Sắc Kiếp Số (Cửu Tử Nhất Sinh / Vận Xui Tận Mạng)',
    personality: 'Ghen ăn tức ở, đố kỵ hẹp hòi, nội tâm tự ti sâu sắc che giấu dưới vẻ mặt tươi cười, sẵn sàng đâm dao sau lưng huynh đệ tốt nhất vì một quyển kiếm phổ.',
    appearance: 'Khuôn mặt tuấn tú nhưng tái nhợt méo mó vì hận thù, khóe mắt giật giật, luôn mặc áo choàng xám rách rưới che giấu ma kiếm rỉ máu.',
    weaponOrAbility: 'Oán Hồn Ma Kiếm & U Minh Bạt Kiếm Thuật',
    natalArtifact: 'Phệ Hồn Huyết Cốt Châu',
    bondedBeast: 'Huyết Dạ Ô Nha (Nhị giai)',
    grottoDwelling: 'Vô Danh Loạn Táng Cương Hắc Động',
    fatalFlawOrTaboo: 'Đạo tâm cực kỳ mong manh dễ sụp đổ khi bị nhắc lại quá khứ bần hàn hèn kém thuở thiếu thời.',
    currentObjective: 'Ám sát Lâm Tiêu để cướp đoạt danh hiệu Đệ Nhất Kiếm Tử và bảo vật Thái Sơ.',
    backstory: 'Từng là huynh đệ đồng sinh cộng tử với Lâm Tiêu lúc mới nhập môn. Vì chứng kiến Lâm Tiêu liên tục nhận được kỳ ngộ và sự ưu ái của tông môn, lòng đố kỵ bùng phát đã hạ độc Lâm Tiêu trong mật cảnh rồi đào tẩu sang Ma Kiếm Môn, dâng hiến linh hồn cho ma đạo.',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60'
  }
];
