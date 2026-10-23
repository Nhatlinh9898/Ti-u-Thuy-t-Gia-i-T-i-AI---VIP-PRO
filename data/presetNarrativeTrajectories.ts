import {
  NarrativeTrajectory,
  BranchStoryArc,
  BranchConvergenceNexus
} from '../types';

export const PRESET_NARRATIVE_TRAJECTORIES: NarrativeTrajectory[] = [
  {
    id: 'orthodox_sect',
    name: 'Chính Đạo Tiên Sơn • Tông Môn Khai Tổ',
    badgeTitle: 'Chính Khí Hạo Nhiên & Lãnh Đạo Tiên Môn',
    icon: '🏔️',
    colorScheme: {
      primary: 'text-amber-400',
      badgeBg: 'bg-amber-950/40 text-amber-300 border-amber-500/30',
      border: 'border-amber-500/40',
      gradient: 'from-amber-600 via-yellow-600 to-orange-600'
    },
    cultivationPhilosophy:
      'Lấy thiên địa chính khí làm căn cơ, tôn sư trọng đạo, mượn sức tông môn bảo vệ bình sinh phàm trần. Từ đệ tử ngoại môn từng bước leo lên chưởng môn, chấn hưng đại phái nghìn năm.',
    protagonistArchetype: 'Kiếm Tâm Thông Minh • Ý Chí Kiên Định • Đại Trượng Phu Trọng Nghĩa Khinh Tài',
    coreConflicts: [
      'Đấu tranh quyền lực giữa các phong mạch nội môn và trưởng lão bảo thủ',
      'Xung đột đạo lý: Hy sinh một cá nhân cứu vạn chúng hay giữ trọn sơ tâm',
      'Đại chiến với Ma Đạo xâm lấn và phản đồ bán đứng tông môn'
    ],
    worldImpact:
      'Tái lập trật tự Tiên Giới, thống nhất các tông môn phân tán thành Hạo Nhiên Tiên Minh, xây dựng hộ giới đại trận vững như bàn thạch.',
    branchArcIds: ['arc_branch_sect_rebellion', 'arc_branch_righteous_sword_sanctum'],
    milestones: [
      {
        stageId: 'spine_stage_1',
        milestoneTitle: 'Vượt Qua Đào Thải Ngoại Môn',
        narrativeDilemma: 'Bị thế gia đệ tử chèn ép đoạt lấy đan điền linh dịch; nhẫn nhục tích lũy hay rút kiếm quyết tử nơi đài chấp pháp?',
        chosenDirectionPayoff: 'Được Phong Chủ chú ý nhờ kiếm ý thuần khiết, phá cách nhập Nội Môn Vấn Kiếm Phong.',
        unlockedPowerOrFaction: 'Thập Tam Thức Vấn Kiếm Quyết & Danh hiệu Đệ Nhất Ngoại Môn'
      },
      {
        stageId: 'spine_stage_2',
        milestoneTitle: 'Trấn Áp Linh Mạch Nổi Loạn',
        narrativeDilemma: 'Linh mạch phong ấn có dấu hiệu nứt vỡ; dẫn khí tự thân vá trận hay rút lui bảo toàn đạo cơ?',
        chosenDirectionPayoff: 'Nhận được tán thành của Linh Sơn Địa Mạch Hồn, đúc thành Thiên Phẩm Đạo Cơ độc nhất vô nhị.',
        unlockedPowerOrFaction: 'Địa Mạch Kim Thân & Quyền triệu hoán trận pháp hộ sơn cấp 2'
      },
      {
        stageId: 'spine_stage_3',
        milestoneTitle: 'Lãnh Đạo Bách Tông Luận Kiếm',
        narrativeDilemma: 'Các đại phái khác cấu kết dìm ép đệ tử bản môn; độc chiến quần hùng hay liên hoành thỏa hiệp?',
        chosenDirectionPayoff: 'Nhất kiếm trấn nhiếp cửu đại môn phái, đoạt quán quân Thiên Kiêu Bảng, danh chấn Thanh Châu.',
        unlockedPowerOrFaction: 'Thiên Cương Kiếm Ý Đại Thành & Quyền chấp chưởng Chấp Pháp Đường'
      },
      {
        stageId: 'spine_stage_4',
        milestoneTitle: 'Ngăn Ngừa Nộ Triều Ma Đạo',
        narrativeDilemma: 'Tông môn bị nội ứng phá đại trận từ bên trong; cứu chưởng môn trúng độc hay độc thủ phong tỏa cứ điểm?',
        chosenDirectionPayoff: 'Chém đầu nội gián Nguyên Anh, tiếp quản trận nhãn, chấn hưng sĩ khí cứu vãn môn phái trước bờ diệt vong.',
        unlockedPowerOrFaction: 'Chân Nhân Hộ Tông & Binh phù Bách Môn Liên Minh'
      },
      {
        stageId: 'spine_stage_5',
        milestoneTitle: 'Khai Tông Lập Phái • Tiên Minh Minh Chủ',
        narrativeDilemma: 'Tiên Giới giáng chỉ ép tông môn làm bia đỡ đạn; quy phục phụng chỉ hay lập riêng Tiên Minh chống lại thiên mệnh?',
        chosenDirectionPayoff: 'Thiết lập Vạn Cổ Tiên Minh, chư đại tông tôn làm minh chủ, bình định vạn dặm sơn hà.',
        unlockedPowerOrFaction: 'Hạo Nhiên Giới Ấn & Đại Trận Hộ Giới Cửu Tiêu'
      }
    ]
  },
  {
    id: 'deviant_asura',
    name: 'Ma Đạo Sát Phạt • Huyết Nhận Nghịch Thiên',
    badgeTitle: 'Nghịch Thiên Thôn Phệ & Huyết Đồ Tu La',
    icon: '🩸',
    colorScheme: {
      primary: 'text-red-400',
      badgeBg: 'bg-red-950/40 text-red-300 border-red-500/30',
      border: 'border-red-500/40',
      gradient: 'from-red-600 via-rose-700 to-purple-900'
    },
    cultivationPhilosophy:
      'Thiên Đạo bất nhân dĩ vạn vật vi sô cẩu. Tu vi chân chính chỉ đúc từ sinh tử chém giết, nuốt trọn ma hạch và ngưng luyện Huyết Ngục Tu La, phá vỡ mọi quy củ dối trá của chính phái.',
    protagonistArchetype: 'Lãnh Khốc Bá Liệt • Sát Phạt Quyết Đoán • Không Vướng Bận Nhân Tình Giả Tạo',
    coreConflicts: [
      'Cuộc truy sát của toàn bộ chính đạo ngũ châu và các thánh địa cổ xưa',
      'Sự cắn trả của Tu La Ma Huyết và khảo nghiệm ma tâm cắn nuốt lý trí',
      'Phản trảm các Ma Tôn ngàn năm muốn dùng nhân vật chính làm đỉnh lô đoạt xá'
    ],
    worldImpact:
      'Lật đổ sự thống trị giả tạo của các Thánh Địa giả nhân giả nghĩa, tái định hình cán cân sinh tử, biến nhân vật chính thành Ma Hoàng khiến vạn giới khiếp sợ.',
    branchArcIds: ['arc_branch_blood_altar', 'arc_branch_abyssal_slaughter'],
    milestones: [
      {
        stageId: 'spine_stage_1',
        milestoneTitle: 'Huyết Tẩy Cừu Gia Đoạt Ma Thạch',
        narrativeDilemma: 'Gia tộc bị diệt môn, kẻ thù đang tận hưởng vinh hoa; đi báo quan chờ luật pháp xử lý hay tự chém giết tắm máu trả thù?',
        chosenDirectionPayoff: 'Một đêm huyết tẩy ba trăm mạng kẻ thù, thức tỉnh Sát Lục Huyết Nhãn, chính thức bước vào Ma Đạo.',
        unlockedPowerOrFaction: 'Thôn Thiên Ma Công Tầng 1 & Ma Khí Hộ Thể'
      },
      {
        stageId: 'spine_stage_2',
        milestoneTitle: 'Phản Sát Đội Săn Ma Của Thánh Địa',
        narrativeDilemma: 'Bị năm đại trưởng lão giả tạo vây hãm trong Huyết Cốt Cốc; đầu hàng làm nô hay dẫn độc vụ hủy diệt?',
        chosenDirectionPayoff: 'Kích nổ âm sát huyệt, chôn sống toàn bộ địch nhân, đoạt lấy kim đan toái phiến để đúc Ma Cơ.',
        unlockedPowerOrFaction: 'Cửu U Huyết Nhận & Ma Đồng Thấu Thị'
      },
      {
        stageId: 'spine_stage_3',
        milestoneTitle: 'Chém Ma Tôn Phản Phệ Đoạt Ma Vị',
        narrativeDilemma: 'Sư phụ ma giáo muốn đoạt xá thân xác; dâng hiến linh hồn hay lập bẫy cắn nuốt ngược lại ma hồn?',
        chosenDirectionPayoff: 'Thi triển Ma Hồn Nghịch Chuyển, nuốt trọn ngàn năm ma công của sư phụ, trở thành tân chúa tể Hắc Ám Cốc.',
        unlockedPowerOrFaction: 'Tu La Vạn Cốt Kiếm & Hắc Huyết Ma Vực'
      },
      {
        stageId: 'spine_stage_4',
        milestoneTitle: 'Huyết Hải Giáng Lâm Đồ Sát Ma Triều',
        narrativeDilemma: 'Ma Uyên bùng nổ hung thú muốn nuốt chửng chúng sinh; bỏ mặc thiên hạ hay lấy độc trị độc nuốt trọn ma triều?',
        chosenDirectionPayoff: 'Đơn thương độc mã mở Huyết Hải nuốt trọn mười vạn ma binh, lấy sát chứng đạo Nguyên Anh Huyết Ma.',
        unlockedPowerOrFaction: 'Chân Thân Huyết Ma Vô Thượng & Uy áp vạn ma quy phục'
      },
      {
        stageId: 'spine_stage_5',
        milestoneTitle: 'Nghịch Thiên Đạp Toái Tiên Điện',
        narrativeDilemma: 'Thượng giới chư thiên giáng lôi kiếp hủy diệt ma đạo; quỳ phục nhận phạt hay vung ma đao trảm thiên?',
        chosenDirectionPayoff: 'Chém đứt Lôi Trì Thần Phạt, ép Thần Tướng quỳ lạy, tuyên bố Ma Hoàng Độc Tôn ngàn đời.',
        unlockedPowerOrFaction: 'Thí Thần Ma Đao Vô Cực & Hỗn Độn Ma Vực'
      }
    ]
  },
  {
    id: 'rogue_polymath',
    name: 'Tán Tu Bách Nghệ • Ẩn Nhẫn Hắc Thị Phú Gia',
    badgeTitle: 'Đan Phù Trận Khí • Vạn Giới Tài Phiệt',
    icon: '🪙',
    colorScheme: {
      primary: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30',
      border: 'border-emerald-500/40',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700'
    },
    cultivationPhilosophy:
      'Tu tiên không phải chỉ có chém chém giết giết, tu tiên là nhân tình thế thái, là nguồn tài nguyên dồi dào. Thành thạo Đan, Phù, Trận, Khí, dùng của cải thao túng chiến cuộc, ngấm ngầm làm ông trùm đứng sau vạn cổ thế lực.',
    protagonistArchetype: 'Trầm Ổn Lão Luyện • Đa Mưu Túc Trí • Không Bao Giờ Ra Mặt Mà Thao Túng Tất Cả',
    coreConflicts: [
      'Bị các đại tông môn lũng đoạn đan dược linh thạch chèn ép',
      'Cuộc chiến tình báo và đấu giá tàn khốc giữa các thế lực hắc thị ngầm',
      'Thu thập tàn phương đan pháp và trận đồ thái cổ bị tứ đại gia tộc phong tỏa'
    ],
    worldImpact:
      'Thiết lập mạng lưới Thiên Bảo Thương Hội trải rộng khắp chín châu mười cõi, nắm giữ huyết mạch kinh tế tu chân giới, điều động tài nguyên lật đổ bất kỳ môn phái nào.',
    branchArcIds: ['arc_branch_clandestine_pavilion', 'arc_branch_talisman_alchemy_heist'],
    milestones: [
      {
        stageId: 'spine_stage_1',
        milestoneTitle: 'Độc Quyền Thu Mua Dược Liệu Hắc Thị',
        narrativeDilemma: 'Các đại thương hội ép giá tán tu bèo bọt; bán rẻ cầu an hay âm thầm chế tạo lò luyện đan mini tự cung tự cấp?',
        chosenDirectionPayoff: 'Luyện chế ra Nhất Phẩm Tụ Khí Đan biến dị độ thuần khiết 99%, thu hút toàn bộ tán tu đến hợp tác.',
        unlockedPowerOrFaction: 'Thương Hiệu Đan Dược U Linh & Tích lũy 10 vạn hạ phẩm linh thạch'
      },
      {
        stageId: 'spine_stage_2',
        milestoneTitle: 'Chế Tạo Cơ Quan Khí Hóa Khảm Trận',
        narrativeDilemma: 'Cần vượt qua thí luyện bí cảnh nhưng linh căn kém cỏi; liều mạng xông trận hay dùng trăm con rối cơ quan rải phù nổ?',
        chosenDirectionPayoff: 'Dùng chiến thuật cơ quan đại trận quét sạch hung thú, không tốn một giọt máu nhặt trọn cổ bảo.',
        unlockedPowerOrFaction: 'Bách Biến Khôi Lỗi Thuật & Thiên Cơ Trận Bàn Cấp 3'
      },
      {
        stageId: 'spine_stage_3',
        milestoneTitle: 'Kích Hoạt Thiên Đấu Đấu Giá Hội',
        narrativeDilemma: 'Đại tông môn muốn cướp tàn đồ thái cổ; công khai phản kháng hay khuấy động cuộc chiến giá giữa các lão quái vật?',
        chosenDirectionPayoff: 'Đẩy giá tàn đồ lên 5 triệu linh thạch, ngấm ngầm đổi lấy Ngũ Hành Linh Tinh thượng phẩm đúc Kim Đan Vô Lượng.',
        unlockedPowerOrFaction: 'Hội Viên Chí Tôn Thiên Bảo Lâu & Nhập Hồn Phù Trận'
      },
      {
        stageId: 'spine_stage_4',
        milestoneTitle: 'Vũ Trang Hóa Toàn Diện Liên Minh Tán Tu',
        narrativeDilemma: 'Tông môn áp bức đòi tịch thu tài sản tán tu; chạy trốn ẩn dật hay đứng sau tài trợ vũ trang cho liên minh kháng cự?',
        chosenDirectionPayoff: 'Cung cấp 10.000 bộ giáp phù lục và lôi châu công phá, khiến liên minh tông môn phải cúi đầu đàm phán.',
        unlockedPowerOrFaction: 'Minh Chủ Ngầm Của Vạn Giới Tán Tu Đồng Minh'
      },
      {
        stageId: 'spine_stage_5',
        milestoneTitle: 'Tài Phiệt Thần Giới • Mua Trọn Thiên Mệnh',
        narrativeDilemma: 'Tiên Tộc trên trời áp thuế linh thạch diệt tộc; chịu kiếp nô lệ hay dùng của cải mua chuộc toàn bộ Tiên Binh phản nghịch?',
        chosenDirectionPayoff: 'Lũng đoạn mạch linh thạch hạ giới, khiến chư tiên phải hạ mình đàm phán mượn vốn tu luyện.',
        unlockedPowerOrFaction: 'Thiên Đạo Vạn Thông Kim Ngân Giới Ấn'
      }
    ]
  },
  {
    id: 'imperial_sovereign',
    name: 'Tiên Triều Hoàng Đạo • Khai Quốc Tranh Bá',
    badgeTitle: 'Hoàng Long Khí Vận & Tiên Triều Thống Nhất',
    icon: '👑',
    colorScheme: {
      primary: 'text-yellow-400',
      badgeBg: 'bg-yellow-950/40 text-yellow-300 border-yellow-500/30',
      border: 'border-yellow-500/40',
      gradient: 'from-amber-500 via-yellow-500 to-amber-700'
    },
    cultivationPhilosophy:
      'Thiên hạ mạc phi vương thổ, suất thổ chi tân mạc phi vương thần. Mượn quốc gia khí vận và ức vạn thần dân tụ thành Hoàng Long Bất Tử Thân, phong thần ban tước, biến tông môn thành thần tử phục vụ lê dân.',
    protagonistArchetype: 'Đế Vương Bá Khí • Tầm Nhìn Chiến Lược • Uy Nghi Thiên Hạ',
    coreConflicts: [
      'Thế lực tông môn ngạo mạn xem thường phàm nhân và luật pháp vương triều',
      'Nội loạn hoàng tộc, tranh giành long mạch và ngọc tỷ trấn quốc',
      'Đại chiến biên cương với các dị tộc yêu ma lăm le thôn tính lãnh thổ'
    ],
    worldImpact:
      'Dẹp tan chế độ phong kiến tông môn cát cứ, thiết lập Đại Càn Tiên Triều vạn năm bất diệt, mở ra kỷ nguyên Phàm - Tiên bình đẳng dưới luật pháp.',
    branchArcIds: ['arc_branch_ancient_dragon_vein', 'arc_branch_imperial_tribute_crisis'],
    milestones: [
      {
        stageId: 'spine_stage_1',
        milestoneTitle: 'Thu Phục Biên Quan Chiến Tướng',
        narrativeDilemma: 'Hoàng tử bị đày ải biên thùy hoang vu; than khóc số phận hay cởi chiến bào cùng binh sĩ đổ máu chém giặc?',
        chosenDirectionPayoff: 'Quy tụ lòng quân, đúc kết Quân Hồn Sát Khí ngưng luyện Khí Huyết Chân Long.',
        unlockedPowerOrFaction: 'Cửu Long Quyết Tầng 1 & Ba ngàn Thiết Huyết Long Kỵ'
      },
      {
        stageId: 'spine_stage_2',
        milestoneTitle: 'Khơi Thông Long Mạch Tổ Quốc',
        narrativeDilemma: 'Long mạch bị đại phái cắm cọc trấn áp cướp đoạt khí vận; nhượng bộ hòa hoãn hay nhổ cọc tuyên chiến tông môn?',
        chosenDirectionPayoff: 'Phá vỡ trấn áp, Long Khí rót vào đan điền, đúc thành Hoàng Cực Đạo Cơ hùng mạnh.',
        unlockedPowerOrFaction: 'Chân Long Hộ Thể & Quyền ban sắc phong thổ địa sơn thần'
      },
      {
        stageId: 'spine_stage_3',
        milestoneTitle: 'Đoạt Lại Hoàng Vị • Đăng Cơ Xưng Đế',
        narrativeDilemma: 'Hoàng huynh cấu kết yêu tộc tạo phản kinh thành; thoái nhượng chia đôi đất nước hay dẫn quân vây hãm quét sạch phản nghịch?',
        chosenDirectionPayoff: 'Đăng cơ xưng Hoàng Đế, chém đầu yêu vương, triệu hoán Cửu Đỉnh Trấn Quốc.',
        unlockedPowerOrFaction: 'Truyền Quốc Ngọc Tỷ Khí Vận Thần Thông & Hoàng Triều Lực Lượng'
      },
      {
        stageId: 'spine_stage_4',
        milestoneTitle: 'Chiến Dịch Phạt Tiên • Ép Tông Môn Phục Luật',
        narrativeDilemma: 'Các đại tông môn bất tuân thuế pháp giết hại quan lại; tha thứ cầu hòa hay phát động đại quân vây núi ép quy phục?',
        chosenDirectionPayoff: 'Đại phá Cửu Đại Tông Môn, buộc các chưởng môn phải mặc quan phục quỳ lạy nhận sắc phong dưới trướng Tiên Triều.',
        unlockedPowerOrFaction: 'Bảng Phong Thần Tiên Triều & Long Mạch Cửu Châu Liên Khí'
      },
      {
        stageId: 'spine_stage_5',
        milestoneTitle: 'Thăng Hoa Cửu Châu Thành Thần Triều Bất Diệt',
        narrativeDilemma: 'Giới Ngoại Thần Ma muốn xóa sổ cõi phàm; hy sinh một nửa đất đai hay nâng toàn bộ lãnh thổ phi thăng?',
        chosenDirectionPayoff: 'Cả nước thăng thiên, biến vạn dặm sơn hà thành Vô Thượng Thần Triều ngạo thị tinh không.',
        unlockedPowerOrFaction: 'Vạn Cổ Đế Hoàng Quyền Năng Vô Thượng'
      }
    ]
  },
  {
    id: 'primordial_ancient',
    name: 'Viễn Cổ Thần Ma • Khảo Cổ Tầm Bí',
    badgeTitle: 'Thái Cổ Tàn Hồn & Bí Ẩn Vạn Kiếp',
    icon: '🌌',
    colorScheme: {
      primary: 'text-purple-400',
      badgeBg: 'bg-purple-950/40 text-purple-300 border-purple-500/30',
      border: 'border-purple-500/40',
      gradient: 'from-purple-700 via-indigo-700 to-slate-900'
    },
    cultivationPhilosophy:
      'Tu tiên hiện tại chỉ là thứ da lông dị biến do thế hệ sau suy thoái. Căn nguyên chân chính nằm ở tàn tích Thái Cổ Hỗn Độn và Thần Ma tiền kỷ nguyên. Khai quật cấm khu, giải mã cổ ngữ, kế thừa thần cách.',
    protagonistArchetype: 'Uyên Bác Bí Hiểm • Khảo Cổ Cuồng Nhân • Thần Cách Thức Tỉnh',
    coreConflicts: [
      'Những nguyền rủa vô hình từ thi hài thần ma viễn cổ khi khai quật cấm địa',
      'Sự săn lùng của Chấp Pháp Thần Tộc che giấu chân tướng vụ sụp đổ kỷ nguyên',
      'Đấu tranh nội tâm giữa nhân tính phàm trần và thần tính lạnh lùng thức tỉnh'
    ],
    worldImpact:
      'Khôi phục lại lịch sử bị xóa bỏ của vũ trụ, mở ra con đường tu luyện Thái Cổ Thần Thông đã tuyệt tích hàng ức năm.',
    branchArcIds: ['arc_branch_forgotten_god_tomb', 'arc_branch_primordial_cipher_curse'],
    milestones: [
      {
        stageId: 'spine_stage_1',
        milestoneTitle: 'Giải Mã Tàn Thạch Ca Dao Điên Loạn',
        narrativeDilemma: 'Mọi người cho rằng đó là hòn đá điên gây tẩu hỏa nhập ma; vứt bỏ an toàn hay lắng nghe tiếng thì thầm viễn cổ?',
        chosenDirectionPayoff: 'Khai mở Thần Thức Thấu Thị, học được Đại Đạo Cổ Ngữ vượt qua toàn bộ giới hạn công pháp hiện đại.',
        unlockedPowerOrFaction: 'Thái Cổ Thần Văn Nhãn & Thần Ma Khí Tức Ẩn Nấp'
      },
      {
        stageId: 'spine_stage_2',
        milestoneTitle: 'Khai Quật Lăng Cực Bắc Phong Ấn Thần Cốt',
        narrativeDilemma: 'Cổ thi tản phát chướng khí diệt hồn; dừng lại thối lui hay dùng bí thuật luyện hóa một đoạn Thần Cốt?',
        chosenDirectionPayoff: 'Dung hợp ngón tay Cổ Thần, lực lượng bộc phát phá toái quy tắc ngũ hành phàm tục.',
        unlockedPowerOrFaction: 'Thần Ma Cốt Cách & Miễn nhiễm 50% ngũ hành thuật pháp'
      },
      {
        stageId: 'spine_stage_3',
        milestoneTitle: 'Thức Tỉnh Ký Ức Tiền Kỷ Nguyên',
        narrativeDilemma: 'Ảo giác hàng ức năm ùa về dọa vỡ đạo tâm; chống cự cố thủ bản ngã hay dung nạp hồng hoang ký ức?',
        chosenDirectionPayoff: 'Kết hợp Kim Đan với Hỗn Độn Đạo Chủng, đúc thành Vạn Cổ Hỗn Độn Đan Vô Khuyết.',
        unlockedPowerOrFaction: 'Khai Thiên Nhãn Quang & Khả năng đọc cấm chế vạn năm'
      },
      {
        stageId: 'spine_stage_4',
        milestoneTitle: 'Vạch Trần Dối Trá Thiên Đạo Vực Ngoại',
        narrativeDilemma: 'Phát hiện Thiên Đạo hiện tại là do một con ký sinh trùng vũ trụ nuốt trần thế tạo thành; im lặng an thân hay truyền bá chân tướng?',
        chosenDirectionPayoff: 'Thức tỉnh sự phản kháng của các cường giả cổ xưa ngủ vùi, thành lập Liên Minh Khảo Cổ Thí Thần.',
        unlockedPowerOrFaction: 'Trấn Ma Thần Bút & Trận Đồ Phong Thần Phản Kỷ Nguyên'
      },
      {
        stageId: 'spine_stage_5',
        milestoneTitle: 'Tái Tạo Thần Vực Khai Thiên Hỗn Độn',
        narrativeDilemma: 'Vũ trụ chuẩn bị rơi vào tịch diệt luân hồi; buông xuôi chờ chết hay châm ngòi ngọn lửa Khai Thiên?',
        chosenDirectionPayoff: 'Tái sinh Thái Cổ Thần Vực, tự hóa thân thành Đạo Tổ Vô Thượng khai sáng tân vũ trụ.',
        unlockedPowerOrFaction: 'Hỗn Độn Sơ Khởi Quyền Năng'
      }
    ]
  },
  {
    id: 'hermit_vagabond',
    name: 'Tiêu Dao Hồng Trần • Trích Tiên Trò Chuyện Sơn Hà',
    badgeTitle: 'Vô Ưu Vô Vi • Hồng Trần Ngộ Đạo',
    icon: '🍃',
    colorScheme: {
      primary: 'text-cyan-400',
      badgeBg: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30',
      border: 'border-cyan-500/40',
      gradient: 'from-cyan-600 via-sky-600 to-blue-700'
    },
    cultivationPhilosophy:
      'Đại đạo chí giản, đạo pháp tự nhiên. Không màng tranh quyền đoạt lợi, ngắm hoa nở hoa tàn, uống chén trà đắng cùng kẻ phàm phu, bắt chước tiếng chim hót mà ngộ ra chí lý kiếm ý. Càng buông bỏ tham sân si, tu vi càng dâng trào tự tại.',
    protagonistArchetype: 'Tiêu Diêu Khoáng Đạt • Hài Hước Duyên Dáng • Đạo Tâm Bất Động Như Sơn',
    coreConflicts: [
      'Bị cuốn vào ân oán của các thế lực tham lam khi đang ngao du hưởng ngoạn',
      'Sự can nhiễu của những kẻ tự xưng đại năng muốn ép nhân vật chính nhập thế',
      'Khảo nghiệm sinh lão bệnh tử của phàm nhân bằng hữu mà bản thân không thể can thiệp bừa bãi'
    ],
    worldImpact:
      'Gieo rắc thiện duyên khắp nhân gian, truyền thụ đạo pháp cho những kẻ nghèo khổ vô danh, để lại truyền thuyết về một kiếm tiên phong lưu đạp mây mà đi.',
    branchArcIds: ['arc_branch_wandering_cloud_tea', 'arc_branch_mortal_wine_epiphany'],
    milestones: [
      {
        stageId: 'spine_stage_1',
        milestoneTitle: 'Chén Rượu Đục Nơi Lữ Quán Ven Sông',
        narrativeDilemma: 'Tu sĩ tông môn cậy mạnh đánh đập lão ngư dân; rút kiếm chém giết ồn ào hay một chén rượu lay tỉnh tâm trí?',
        chosenDirectionPayoff: 'Dùng một cọng rơm hóa kiếm khí chém đứt vũ khí tu sĩ, ngộ ra Nhập Thế Kiếm Ý đầu tiên.',
        unlockedPowerOrFaction: 'Tiêu Dao Du Thân Pháp & Tâm Cảnh Vô Ngại'
      },
      {
        stageId: 'spine_stage_2',
        milestoneTitle: 'Mười Năm Trồng Liễu Ngắm Sóng Vỗ',
        narrativeDilemma: 'Cơ hội đoạt bảo vật Trúc Cơ trong sơn động hiểm ác; tranh giành sứt đầu mẻ trán hay tĩnh tâm ngồi ngắm lá rụng?',
        chosenDirectionPayoff: 'Không tranh mà được, địa khí tự quy tụ, kết xuất Tự Nhiên Đạo Cơ tinh thuần tuyệt phẩm.',
        unlockedPowerOrFaction: 'Xuân Phong Hóa Vũ Thuật Tối Thượng & Thần Thức Hòa Hợp Sơn Hà'
      },
      {
        stageId: 'spine_stage_3',
        milestoneTitle: 'Gảy Đàn Giải Trừ Oán Khí Hai Bang Phái',
        narrativeDilemma: 'Hai môn phái huyết chiến ngàn mạng bên hồ sen; khoanh tay đứng nhìn hay gảy một khúc tiêu dao hóa giải huyết cừu?',
        chosenDirectionPayoff: 'Một khúc đàn khiến vạn kiếm quy phục, hai phái tỉnh ngộ bắt tay hòa giải, đạo đức kim quang chiếu rọi.',
        unlockedPowerOrFaction: 'Thanh Phong Minh Nguyệt Kiếm Cầm & Kim Đan Bất Nhiễm Trần'
      },
      {
        stageId: 'spine_stage_4',
        milestoneTitle: 'Trò Chuyện Cùng Diêm La Dưới Hoàng Tuyền',
        narrativeDilemma: 'Bằng hữu phàm nhân trăm tuổi qua đời; cướp hồn nghịch thiên hay theo chân xuống U Minh tiễn biệt một chén trà?',
        chosenDirectionPayoff: 'U Minh Quỷ Vương kính nể tặng U Minh Linh Tửu, hiểu rõ Luân Hồi Sinh Tử ngưng tụ Nguyên Anh Tiêu Diêu.',
        unlockedPowerOrFaction: 'Sinh Tử Luân Hồi Nhãn & Bộ Pháp Đạp Hư Không'
      },
      {
        stageId: 'spine_stage_5',
        milestoneTitle: 'Cười Nói Giữa Lôi Kiếp Diệt Thế',
        narrativeDilemma: 'Cửu Trọng Thiên Kiếp hủy diệt giáng xuống; căng thẳng liều mạng chống đỡ hay ngửa đầu uống rượu mời sấm sét?',
        chosenDirectionPayoff: 'Lôi đình hóa thành tiên dịch gội rửa thần hồn, nhẹ nhàng đạp mây phi thăng không vướng bụi trần.',
        unlockedPowerOrFaction: 'Thái Hư Trích Tiên Cảnh Giới Đỉnh Phong'
      }
    ]
  }
];

export const PRESET_BRANCH_STORY_ARCS: BranchStoryArc[] = [
  {
    id: 'arc_branch_sect_rebellion',
    trajectoryId: 'orthodox_sect',
    title: 'Chiến Dịch Phục Thù & Thống Nhất Ngoại Sơn',
    domain: 'allied_faction',
    initiatingStageId: 'spine_stage_1',
    convergingStageId: 'spine_stage_3',
    narrativeHook:
      'Sau khi bị tiểu nhân bẫy vào ngục tối ngoại môn, nhân vật chính liên minh với các đệ tử bần hàn bị áp bức, thành lập "Thiết Kiếm Minh" ngấm ngầm chống lại gia tộc lộng quyền.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Mật Thất Ngưng Tụ Lực Lượng',
        eventsSummary: 'Bí mật phân phối tụ khí đan độ tinh khiết cao, huấn luyện kiếm trận phối hợp cho 50 huynh đệ ngoại môn nghèo khó.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Bẻ Gãy Tay Chân Chấp Pháp Viện',
        eventsSummary: 'Tại đại hội kiểm tra hàng tháng, phơi bày chứng cứ tham nhũng của trưởng lão Chấp Pháp, hạ đo ván đệ nhất thiên tài ngoại môn.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Đại Hợp Lưu Luận Kiếm',
        eventsSummary: 'Đưa toàn bộ thành viên Thiết Kiếm Minh tiến thẳng vào Nội Môn, trở thành rường cột mới của Vấn Kiếm Tông.'
      }
    ],
    convergencePointDescription:
      'Tại đại hội Bách Môn Luận Kiếm (Kim Đan Kỳ), khi môn phái bị kẻ thù ngoại đạo vây hãm mưu đồ tiêu diệt thế hệ trẻ, lực lượng Thiết Kiếm Minh năm xưa xuất hiện với tư cách tinh anh chấp pháp, kết trận Hạo Nhiên cứu nguy toàn tông môn.',
    catalystRewardOrStakes: 'Đoạt được Cổ Kiếm Lệnh của Chưởng Môn tiền nhiệm, mở khóa bí mật địa mạch cấm sơn.',
    sampleProseSnippet:
      'Gió lạnh rít gào qua đỉnh Vấn Kiếm. Lâm Tiêu tay cầm thanh thiết kiếm đã mẻ ba chỗ, sau lưng hắn là bốn mươi chín đệ tử áo lam ánh mắt rực lửa. Trưởng lão chấp pháp run rẩy chỉ tay: "Các ngươi... bọn sâu bọ này định tạo phản sao?". Lâm Tiêu mỉm cười nhàn nhạt: "Không phải tạo phản, mà là quét sạch đám mục ruỗng các người, trả lại sự trong sạch cho Vấn Kiếm Tiên Phong!"'
  },
  {
    id: 'arc_branch_righteous_sword_sanctum',
    trajectoryId: 'orthodox_sect',
    title: 'Khảo Nghiệm Vạn Kiếm Trũng & Kiếm Hồn Thượng Cổ',
    domain: 'forbidden_inheritance',
    initiatingStageId: 'spine_stage_2',
    convergingStageId: 'spine_stage_4',
    narrativeHook:
      'Phát hiện trong khe nứt của cấm địa Vạn Kiếm Trũng có tiếng than khóc của vạn thanh tàn kiếm bị phong ấn từ trận chiến vạn năm trước.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Bước Vào Huyết Kiếm Vực',
        eventsSummary: 'Chịu đựng vạn đạo kiếm ý cắt xé kinh mạch, tìm kiếm thanh kiếm rỉ sét đầu tiên có linh tính.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Cộng Hưởng Cùng Tàn Hồn Tiên Tướng',
        eventsSummary: 'Được Kiếm Linh ngàn năm thử thách tâm tính, truyền thụ bí quyết rèn kiếm bằng máu tâm đầu.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Rút Kiếm Phá Cấm',
        eventsSummary: 'Rút thanh Cổ Kiếm Trấn Nhãn, giải thoát cho linh hồn của ngàn vị kiếm tu thời cổ đại.'
      }
    ],
    convergencePointDescription:
      'Khi Ma Uyên xâm lấn tông môn ở cảnh giới Nguyên Anh, vạn thanh tàn kiếm từ cấm địa bay vút lên bầu trời nghênh chiến, che chở cho nhân vật chính thi triển thức thứ mười bốn Vấn Kiếm diệt ma.',
    catalystRewardOrStakes: 'Sở hữu Kiếm Hồn Viễn Cổ Trấn Sơn, kiếm ý tăng vọt lên cảnh giới Kiếm Phách.',
    sampleProseSnippet:
      'Ầm một tiếng rền vang, mặt đất Vạn Kiếm Trũng nứt toác. Một đạo xích hồng kiếm quang phá thổ bay lên, lượn quanh Lâm Tiêu ba vòng như đứa trẻ tìm thấy người thân sau ngàn năm lưu lạc. Cổ ngữ trên thân kiếm bùng cháy: "Nguyện cùng quân trảm thiên hạ bất bình!"'
  },
  {
    id: 'arc_branch_blood_altar',
    trajectoryId: 'deviant_asura',
    title: 'Huyết Tế Trấn Ma Uyên & Khảo Nghiệm Ma Hạch',
    domain: 'nemesis_opposition',
    initiatingStageId: 'spine_stage_2',
    convergingStageId: 'spine_stage_4',
    narrativeHook:
      'Rơi xuống vực sâu hắc ám do bị đồng môn phản bội, nhân vật chính phát hiện một huyết tế đàn cổ xưa ngưng tụ tinh hoa của ba ngàn tu la chiến binh.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Luyện Hóa Ma Khí Đáy Vực',
        eventsSummary: 'Chịu đựng nỗi đau xé rách linh căn, dùng ma hạch thay thế đan điền bị vỡ, hồi sinh từ cõi chết.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Săn Lùng Ma Thú U Minh',
        eventsSummary: 'Một mình chém giết hàng trăm đầu cốt dực ma long, ngưng tụ giọt Huyết Tinh Thủy tổ tiên đầu tiên.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Đạp Toái Huyết Đàn Đoạt Vị',
        eventsSummary: 'Bóp nát tàn hồn của huyết tế chủ nhân, biến vực sâu thành vương quốc săn bắn cá nhân.'
      }
    ],
    convergencePointDescription:
      'Khi chiến trường Nguyên Anh bùng nổ, nhân vật chính từ Ma Uyên phá không trở về mang theo vạn trượng huyết vụ, một tay bóp chết kẻ phản bội năm xưa trước ánh mắt kinh hoàng của chư vị chưởng môn.',
    catalystRewardOrStakes: 'Thần thông Tu La Bất Diệt Khí Thể & Đao Ý Thí Thần.',
    sampleProseSnippet:
      'Huyết sắc cuồn cuộn ngút trời. Lâm Tiêu chậm rãi bước ra từ trong khe nứt địa ngục, mái tóc đen hóa thành một màu đỏ thẫm như máu tươi. Kẻ phản bội năm xưa nay đã là Kim Đan viên mãn, bỗng thấy hai chân mình mềm nhũn quỳ rụp xuống đất: "Ngươi... ngươi còn chưa chết?!". Lâm Tiêu không đáp, chỉ vung tay, một đạo huyết quang lóe lên chém đứt đầu đối phương trong chớp mắt.'
  },
  {
    id: 'arc_branch_abyssal_slaughter',
    trajectoryId: 'deviant_asura',
    title: 'Chiến Dịch Đồ Sát Thập Bát Thí Luyện Ma Đảo',
    domain: 'calamity_crisis',
    initiatingStageId: 'spine_stage_3',
    convergingStageId: 'spine_stage_5',
    narrativeHook:
      'Tham gia cuộc huyết đấu sinh tồn trên mười tám hòn đảo ma đạo ngoài khơi xa, nơi chỉ có một kẻ sống sót duy nhất được phong Ma Quân.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Cô Độc Giữa Quần Lang',
        eventsSummary: 'Bị năm mươi ma tu liên thủ vây ráp; bày huyết vụ trận phản sát từng tên trong đêm bão.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Đoạt Lấy Ma Hải Cổ Binh',
        eventsSummary: 'Lặn xuống rãnh biển vạn trượng đoạt lấy Ma Kích Thôn Thiên từ thi hài Cổ Cự Ma.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Vạn Ma Phục Tùng',
        eventsSummary: 'Đứng trên đỉnh đầu lâu cự thú, ép tất cả ma đảo đầu hàng tôn làm Ma Đế.'
      }
    ],
    convergencePointDescription:
      'Mạch truyện hợp lưu tại biến cố Hóa Thần Tinh Cung: khi Thượng Giới Tiên Binh hạ phàm thanh trừng cõi hạ giới, vạn chiếc ma hạm từ biển sâu dẫn đầu bởi nhân vật chính xuất hiện phản công chém giết tiên thần.',
    catalystRewardOrStakes: 'Toàn quyền điều động hạm đội Huyết Ma Đảo & Đệ Nhất Ma Binh.',
    sampleProseSnippet:
      'Tiếng tù và từ xương rồng rúc lên xé toạc màn sương mù u ám của Bắc Hải. Mười vạn ma tu áo đen đồng loạt quỳ rạp trên boong chiến hạm khổng lồ: "Bái kiến Ma Quân! Nguyện vì quân chủ san bằng Tiên Giới!"'
  },
  {
    id: 'arc_branch_clandestine_pavilion',
    trajectoryId: 'rogue_polymath',
    title: 'Mạng Lưới Thiên Nhĩ Lâu & Lũng Đoạn Đan Phường',
    domain: 'allied_faction',
    initiatingStageId: 'spine_stage_2',
    convergingStageId: 'spine_stage_4',
    narrativeHook:
      'Ngấm ngầm tài trợ cho một tiểu khất cái có thiên phú nghe ngóng tin tức, dần dần dựng nên hệ thống tình báo "Thiên Nhĩ Lâu" bao phủ khắp các ngõ ngách tu chân thành.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Rải Mạng Lưới Trà Quán & Hắc Thị',
        eventsSummary: 'Cài cắm người vào các đan phường, dược điếm và trà lầu để thu thập bí mật giao dịch của các đại tông.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Kích Hoạt Cuộc Chiến Dược Liệu',
        eventsSummary: 'Găm giữ mười ngàn gốc Hóa Lôi Thảo, khiến giá thảo dược tăng vọt gấp hai mươi lần trước mùa kiếp nạn.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Nắm Thóp Các Đại Trưởng Lão',
        eventsSummary: 'Nắm giữ chứng cứ tư thông và hối lộ của các nhân vật cộm cán, biến họ thành con cờ ngầm.'
      }
    ],
    convergencePointDescription:
      'Trong cuộc đại loạn tranh đoạt Nguyên Anh Đan, nhân vật chính không cần rút kiếm mà chỉ cần một mảnh ngọc giản ghi chép sổ nợ đã ép ba đại thế lực phải tự hủy hoại lẫn nhau nhường bảo vật.',
    catalystRewardOrStakes: 'Kho báu trăm triệu linh thạch & Hệ thống tình báo ngầm số một thiên hạ.',
    sampleProseSnippet:
      'Lâm Tiêu ngồi trong phòng riêng gác hai lầu Vọng Nguyệt, nhấp một ngụm trà Tuyết Đỉnh, mỉm cười đẩy tấm ngọc giản qua mặt bàn: "Vương chưởng quầy, số sổ sách mười năm trước ngài giấu sau gạch lát đan thất... tại hạ vô tình sao chép được một bản. Ngài xem, lô Cửu Chuyển Hóa Linh Thảo này, có thể bán cho ta giá một thành không?"'
  },
  {
    id: 'arc_branch_talisman_alchemy_heist',
    trajectoryId: 'rogue_polymath',
    title: 'Vụ Cướp Kho Bảo Thiên Cơ Các & Đột Phá Đan Lộ',
    domain: 'forbidden_inheritance',
    initiatingStageId: 'spine_stage_3',
    convergingStageId: 'spine_stage_5',
    narrativeHook:
      'Phát hiện trong kho ngầm của Thiên Cơ Các cất giấu lò luyện đan thất truyền "Bát Quái Cửu Dương Lô" của Thái Thượng Đạo Tổ.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Chế Tạo Phù Điệp Tàng Hình Thâm Nhập',
        eventsSummary: 'Nghiên cứu loại phù lục dung hợp không gian, lẻn qua mười tám tầng trận pháp kiểm soát không gây động tĩnh.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Tráo Lò Thật Lấy Lò Giả Bằng Khôi Lỗi',
        eventsSummary: 'Dùng bù nhìn cơ quan sao chép hoàn hảo hình dạng, trộm lò thật ngay trước mũi các đại năng canh gác.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Luyện Thành Thần Đan Vực Ngoại',
        eventsSummary: 'Khai hỏa lò thần, luyện ra tuyệt phẩm đan dược có đan lôi dị tượng dẫn đường phi thăng.'
      }
    ],
    convergencePointDescription:
      'Hội tụ vào thời điểm Hóa Thần Đột Phá: nhân vật chính dùng chính chiếc lò thần cướp được luyện hóa thiên kiếp thành thần đan hỗ trợ bước lên Hóa Thần một cách êm thấm vô hại.',
    catalystRewardOrStakes: 'Bát Quái Cửu Dương Thần Lô & Thuật Luyện Đan Vô Thượng.',
    sampleProseSnippet:
      'Kho báu ngầm sâu ngàn trượng im phăng phắc. Một hạt bụi nhỏ bay qua mắt tên thủ vệ Hóa Thần mà không hề bị phát giác. Hạt bụi rơi xuống chiếc lò đồng cổ kính, bỗng nhiên không gian méo mó khẽ khàng, chiếc lò thần biến mất, thay vào đó là một khối đá rỗng vẽ đầy phù văn hài hước: "Đa tạ các hạ đã cất giữ hộ bấy lâu nay!"'
  },
  {
    id: 'arc_branch_ancient_dragon_vein',
    trajectoryId: 'imperial_sovereign',
    title: 'Long Mạch Cửu Châu & Bí Ẩn Ngọc Tỷ Mất Tích',
    domain: 'lineage_destiny',
    initiatingStageId: 'spine_stage_2',
    convergingStageId: 'spine_stage_4',
    narrativeHook:
      'Theo chỉ dẫn của bức địa đồ rách nát từ phàm trần hoàng cung, nhân vật chính lần theo dấu vết chín con rồng đất bị cổ trận giam giữ dưới đáy các ngọn núi lớn.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Giải Phóng Bạch Long Đầm Lầy',
        eventsSummary: 'Hạ sát yêu xà chiếm cứ mắt rồng, phóng thích một đạo long khí thuần phác nhập vào huyết mạch.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Đoạt Ngọc Tỷ Trấn Hồn Từ Cổ Mộ',
        eventsSummary: 'Vượt qua bẫy cơ quan của tiên hoàng mộ địa, thu hồi ngọc tỷ trấn quốc thiếu một góc.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Hợp Nhất Cửu Long Khí Vận',
        eventsSummary: 'Đứng trên đỉnh núi cao nhất Thanh Châu, phát động Hoàng Cực Chân Long Quyết thức tỉnh toàn bộ địa mạch.'
      }
    ],
    convergencePointDescription:
      'Tại đại chiến Nguyên Anh Ma Triều, chín con kim long từ dưới lòng đất đồng loạt lao lên bầu trời tạo thành bức tường thành khí vận bảo vệ hàng triệu báng tánh, nâng bệ đỡ đưa nhân vật chính lên ngôi Hoàng Đế Tiên Triều.',
    catalystRewardOrStakes: 'Hoàng Long Bất Tử Kim Thân & Toàn quyền điều động địa mạch khí vận.',
    sampleProseSnippet:
      'Một tiếng rồng ngâm vang vọng xé toạc tầng mây. Dưới chân Lâm Tiêu, toàn bộ chín dãy núi lớn của Thanh Châu cùng lúc phát sáng rực rỡ như chín con cự long đang cựa mình thức giấc sau giấc ngủ vạn năm. Khí vận vàng kim cuồn cuộn tụ về long bào trên người hắn, uy nghiêm lấn át cả chư vị thần tiên.'
  },
  {
    id: 'arc_branch_imperial_tribute_crisis',
    trajectoryId: 'imperial_sovereign',
    title: 'Khủng Hoảng Cống Phẩm Tiên Triều & Binh Biến Biên Thùy',
    domain: 'nemesis_opposition',
    initiatingStageId: 'spine_stage_3',
    convergingStageId: 'spine_stage_5',
    narrativeHook:
      'Thượng Giới Tiên Sứ hạ phàm đòi triều đình cống nộp một ngàn hài đồng đồng nam đồng nữ để luyện đan; nhân vật chính phẫn nộ xé rách chiếu chỉ tiên thần chém đầu sứ giả.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Trảm Sứ Lập Thề Tuyên Chiến Tiên Môn',
        eventsSummary: 'Tại điện Kim Loan, chém đầu tiên sứ ngạo mạn, treo đầu lên cổng thành tuyên cáo nhân đạo bất diệt.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Luyện Binh Trận Vạn Dân Đồng Tâm',
        eventsSummary: 'Đem đạo pháp phổ cập cho bách tính, chế tạo nỏ thần bắn xuyên hộ thể linh quang của tu sĩ.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Vây Hãm Đội Phạt Tiên Giới',
        eventsSummary: 'Dùng nỏ thần cơ quan và quân trận long kỵ đánh tan ba vạn thiên binh thiên tướng hạ phàm trừng phạt.'
      }
    ],
    convergencePointDescription:
      'Khi bước vào cảnh giới Hóa Thần, thay vì một mình phi thăng chịu làm nô lệ tiên đình, nhân vật chính dẫn dắt toàn thể quân đội tiên triều phá vỡ thiên môn xông thẳng lên Tiên Giới định đoạt lại công bằng.',
    catalystRewardOrStakes: 'Nhân Đạo Thánh Hoàng Ấn & Sự kính ngưỡng của ức vạn phàm dân.',
    sampleProseSnippet:
      'Tiên Sứ gào thét: "Lũ phàm nhân sâu bọ, các ngươi dám nghịch thiên sao?". Lâm Tiêu giẫm nát ngực đối phương, giọng nói truyền khắp cửu châu: "Nếu trời lấy bách tính làm súc sinh luyện đan, vậy thì trẫm hôm nay sẽ trảm trời!"'
  },
  {
    id: 'arc_branch_forgotten_god_tomb',
    trajectoryId: 'primordial_ancient',
    title: 'Lăng Mộ Tinh Thần & Di Ngôn Thần Ma Bị Lãng Quên',
    domain: 'forbidden_inheritance',
    initiatingStageId: 'spine_stage_3',
    convergingStageId: 'spine_stage_5',
    narrativeHook:
      'Lần theo các vì sao đổi ngôi, tìm thấy một ngôi mộ trôi nổi giữa không gian hư không cất giữ thi thể của một vị Cổ Thần cao vạn trượng.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Vượt Qua Vành Đai Tinh Bụi Nguyền Rủa',
        eventsSummary: 'Né tránh các mảnh vỡ thiên thạch mang theo oán niệm thần ma, tiến vào trong lỗ tai của cự thần.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Khai Quật Tim Cổ Thần Vẫn Còn Đập',
        eventsSummary: 'Phát hiện trái tim khổng lồ như một quả núi vẫn đập từng nhịp mười năm một lần, nhỏ ra thần huyết tinh khiết.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Lắng Nghe Di Ngôn Tịch Diệt',
        eventsSummary: 'Tiếp nhận thông điệp cảnh báo về thảm họa "Thiên Đạo Trọng Khải" sắp nuốt chửng toàn bộ sinh linh.'
      }
    ],
    convergencePointDescription:
      'Tại thời khắc mấu chốt Hóa Thần đối đầu với Thần Sứ Thượng Giới, thi hài Cổ Thần tỉnh lại theo lời hiệu triệu của nhân vật chính, vung một chưởng đập nát Thần Điện Thượng Giới.',
    catalystRewardOrStakes: 'Thần Thể Hỗn Độn Tinh Thần & Di vật Cổ Thần Chi Nhãn.',
    sampleProseSnippet:
      'Giữa khoảng không tối đen như mực của vũ trụ, một bàn tay khổng lồ bằng đá xám từ từ cử động. Lâm Tiêu đứng trên đầu ngón tay trỏ của vị thần, ánh mắt ánh lên ngọn lửa màu tím: "Ngủ vạn kiếp rồi, tiền bối... đã đến lúc chúng ta tính sổ với những kẻ phản bội năm xưa!"'
  },
  {
    id: 'arc_branch_primordial_cipher_curse',
    trajectoryId: 'primordial_ancient',
    title: 'Giải Nguyền Cổ Thần Phù & Lời Nguyền Huyết Mạch',
    domain: 'calamity_crisis',
    initiatingStageId: 'spine_stage_1',
    convergingStageId: 'spine_stage_3',
    narrativeHook:
      'Phát hiện trong vết bớt sau lưng có ẩn chứa một phong ấn Thái Cổ đang dần phát tác đe dọa thiêu đốt tuổi thọ.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Truy Tìm Nguồn Gốc Cổ Văn',
        eventsSummary: 'Đột nhập tàng kinh các cấm địa để so sánh mẫu tự với văn bia mười vạn năm trước.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Thu Thập Tam Đại Hỗn Độn Thảo',
        eventsSummary: 'Băng qua đầm lầy độc dược thu thập linh thảo dung hòa ngọn lửa nguyền rủa.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Biến Nguyền Rủa Thành Thần Thông',
        eventsSummary: 'Luyện hóa nguyền rủa thành Hỗn Độn Bất Diệt Viêm, đốt cháy mọi thuật pháp ngũ hành.'
      }
    ],
    convergencePointDescription:
      'Tại đại hội Kim Đan Luận Kiếm, khi bị địch nhân dùng sát chiêu độc môn ám hại, ngọn lửa nguyền rủa bùng lên nuốt trọn toàn bộ sát chiêu khiến đối thủ kinh hoàng nhận thua.',
    catalystRewardOrStakes: 'Hỗn Độn Thần Hỏa & Huyết Mạch Thần Ma Tinh Thuần.',
    sampleProseSnippet:
      'Một luồng hắc diễm bùng phát từ sau lưng Lâm Tiêu hóa thành hư ảnh một vị thần ma ba đầu sáu tay ngửa mặt thét gào. Toàn bộ phi kiếm của đối thủ khi chạm vào ngọn lửa đều hóa thành tro tàn trong nháy mắt.'
  },
  {
    id: 'arc_branch_wandering_cloud_tea',
    trajectoryId: 'hermit_vagabond',
    title: 'Quán Trà Vong Xuyên & Đạo Tâm Phàm Nhân',
    domain: 'allied_faction',
    initiatingStageId: 'spine_stage_2',
    convergingStageId: 'spine_stage_4',
    narrativeHook:
      'Mở một quán trà nhỏ ven đường hoàng hôn, đón tiếp những kẻ lữ hành mệt mỏi, đổi lấy những câu chuyện trần thế chân thực nhất.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Nấu Trà Đón Khách Hồng Trần',
        eventsSummary: 'Dùng nước suối đầu nguồn và lá trà dại pha nên chén trà gột rửa phiền muộn cho phàm nhân.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Chỉ Điểm Kiếm Khách Hết Thời',
        eventsSummary: 'Khuyên giải một vị đệ nhất kiếm khách phàm trần buông bỏ thù hận, đổi lại được tặng bức họa phong cảnh hữu thần.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Ngộ Ra Nhân Đạo Chân Ý',
        eventsSummary: 'Từ sự bình dị của cuộc sống phàm nhân mà nhận ra quy luật sinh tử luân hồi của đại đạo.'
      }
    ],
    convergencePointDescription:
      'Khi đối mặt với Tâm Ma Kiếp ở ngưỡng cửa Nguyên Anh, bức tranh phong cảnh năm xưa và hàng ngàn câu chuyện phàm nhân biến thành dòng suối thanh mát gột sạch tâm ma, giúp đột phá nhẹ nhàng như một giấc mộng trưa.',
    catalystRewardOrStakes: 'Thanh Tịnh Đạo Tâm & Khả năng miễn nhiễm hoàn toàn với ảo thuật và tâm ma.',
    sampleProseSnippet:
      '"Trà đắng lúc đầu, ngọt hậu về sau." Lâm Tiêu rót một chén trà nóng cho gã đao khách giang hồ đang run rẩy vì lạnh: "Kiếm trên tay ngươi quá nặng, không phải vì sắt thép, mà vì chấp niệm của ngươi. Uống xong chén này, hãy ném nó xuống sông đi."'
  },
  {
    id: 'arc_branch_mortal_wine_epiphany',
    trajectoryId: 'hermit_vagabond',
    title: 'Hồ Lô Rượu Trăm Năm & Tiên Kiếm Tiêu Dao',
    domain: 'forbidden_inheritance',
    initiatingStageId: 'spine_stage_3',
    convergingStageId: 'spine_stage_5',
    narrativeHook:
      'Nhặt được một chiếc hồ lô rượu cũ mèm của một lão ăn mày say xỉn bên gốc đa ngàn năm, bên trong chứa đựng một giọt rượu ngưng đọng thời gian.',
    progressionPhases: [
      {
        phaseOrder: 1,
        phaseTitle: 'Ủ Rượu Bằng Linh Quả Trăm Năm',
        eventsSummary: 'Mỗi lần đi qua một ngọn núi lại hái một trái linh quả ném vào hồ lô ủ men.'
      },
      {
        phaseOrder: 2,
        phaseTitle: 'Say Rượu Múa Kiếm Trên Đỉnh Mây',
        eventsSummary: 'Dưới ánh trăng rằm uống cạn nửa bầu rượu, vô thức vung kiếm chém đứt thác nước đảo ngược dòng chảy.'
      },
      {
        phaseOrder: 3,
        phaseTitle: 'Trở Thành Trích Tiên Trong Mắt Thế Gian',
        eventsSummary: 'Người đời truyền tai nhau về một kiếm tiên chỉ say mà không chết, một kiếm dẹp yên hải tặc yêu quái.'
      }
    ],
    convergencePointDescription:
      'Tại cuộc vây hãm của chư đại năng Hóa Thần, nhân vật chính ngửa cổ uống cạn giọt rượu cuối cùng, thi triển Túy Tiên Tuyệt Kiếm chém tan hư không, cười lớn đạp mây rời đi khiến đối thủ ngơ ngác.',
    catalystRewardOrStakes: 'Túy Tiên Kiếm Quyết & Hồ Lô Càn Khôn Chứa Sơn Hà.',
    sampleProseSnippet:
      'Gió thổi lay động tà áo trắng rách mép. Lâm Tiêu loạng choạng bước đi trên không trung như say như tỉnh, tay cầm hồ lô gỗ, tay kia cầm cành liễu khô. Trước mặt hắn là mười vị đại năng đằng đằng sát khí. Hắn bỗng cười vang: "Trời không cho ta uống rượu ngon, ta trảm trời! Đất không cho ta ngủ yên giấc, ta chém đất!"'
  }
];

export const PRESET_BRANCH_CONVERGENCE_NEXUSES: BranchConvergenceNexus[] = [
  {
    id: 'nexus_kim_dan_great_assembly',
    nexusName: 'Đại Hội Vạn Kiếm & Bách Môn Thí Kiếm',
    targetSpineStageId: 'spine_stage_3',
    targetSpineStageTitle: 'Kim Đan Kỳ • Kết Đan Hoàn Mỹ',
    macroCosmicEvent:
      'Trăm năm một lần, chín mươi chín đại tông môn cử tinh anh tề tựu tại Vạn Kiếm Đỉnh thi triển thần thông. Cổ Kiếm Bia hạ thế ban thưởng Tiên Thiên Linh Bảo.',
    convergingBranchesSummary:
      'Các mạch nhánh phục thù ngoại môn, nguyền rủa cổ thần, lũng đoạn dược liệu và kiếm ý tiêu dao cùng lúc va chạm tại lôi đài, hé lộ chân tướng về âm mưu của các lão tổ phía sau đại hội.',
    dramaticCatharsis:
      'Bùng nổ trận chiến đỉnh cao, nhân vật chính chứng minh đạo lộ độc nhất của mình, quét sạch định kiến và bước lên đài vinh quang với Kim Đan hoàn mỹ vô khuyết.',
    exemplaryConvergencePrompt:
      'Viết phân cảnh Lâm Tiêu bước lên đài chung kết Vạn Kiếm Đại Hội, đối đầu với thiên tài đệ nhất Thánh Địa. Các manh mối về dược liệu bị đầu độc và kiếm trận cổ xưa đồng loạt kích hoạt, Lâm Tiêu lật ngược tình thế ngoạn mục.'
  },
  {
    id: 'nexus_nguyen_anh_ma_trieu',
    nexusName: 'Đại Họa Ma Uyên Khai Mở & Bách Môn Nguy Khốn',
    targetSpineStageId: 'spine_stage_4',
    targetSpineStageTitle: 'Nguyên Anh Kỳ • Phá Toái Hư Không',
    macroCosmicEvent:
      'Phong ấn vạn năm của U Minh Ma Uyên bị phá vỡ hoàn toàn, ma khí cuồn cuộn nuốt chửng ba quận chín huyện, các đại phái hoảng loạn chia rẽ.',
    convergingBranchesSummary:
      'Mạch nhánh Tu La Huyết Hải, Long Mạch Tiên Triều, Mạng Lưới Thiên Nhĩ Lâu và Quán Trà Vong Xuyên gặp nhau tại tiền tuyến: một bên là quân đội, một bên là tình báo và một bên là ma đạo phản sát cùng nhau chặn đứng ma triều.',
    dramaticCatharsis:
      'Giải tỏa toàn bộ mâu thuẫn chính - tà, nhân vật chính đột phá Nguyên Anh ngay giữa tâm bão ma triều, dùng đạo lực dung hợp cứu vớt vạn dặm sơn hà.',
    exemplaryConvergencePrompt:
      'Viết cảnh tiền tuyến Ma Uyên nứt vỡ, mười vạn ma binh tràn ra. Giữa lúc tông môn sắp sụp đổ, các thế lực ngầm mà Lâm Tiêu dày công bồi dưỡng từ các nhánh truyện phụ đồng loạt xuất hiện ứng cứu.'
  },
  {
    id: 'nexus_hoa_than_cosmic_stargate',
    nexusName: 'Tinh Vực Cổ Trận Khởi Động & Phi Thăng Vực Ngoại',
    targetSpineStageId: 'spine_stage_5',
    targetSpineStageTitle: 'Hóa Thần Kỳ • Thần Thông Quảng Đại',
    macroCosmicEvent:
      'Hư không nứt toác, Tiên Sứ Thượng Giới giáng lâm cùng Tinh Môn Cổ Trận, chuẩn bị chọn lựa các hạt giống làm tế phẩm phi thăng.',
    convergingBranchesSummary:
      'Tất cả các phương hướng: Tiên Triều quật khởi, Ma Hoàng độc tôn, Tán Tu cướp lò thần và Cổ Thần thức tỉnh cùng hội tụ tại Tinh Môn để thực hiện cuộc nổi dậy lịch sử chống lại quy tắc bóc lột của Thượng Giới.',
    dramaticCatharsis:
      'Không quỳ lạy nhận sắc phong nô lệ, nhân vật chính cùng liên minh các nhánh truyện lật đổ thần quyền thượng giới, mở ra cánh cổng phi thăng tự do cho toàn thế giới.',
    exemplaryConvergencePrompt:
      'Viết phân cảnh Tinh Môn rực sáng trên bầu trời đêm, Tiên Sứ đứng trên xe rồng ngạo nghễ nhìn xuống. Lâm Tiêu dẫn đầu các đại năng từ các nhánh truyện khác nhau rút binh khí chỉ thẳng lên trời.'
  },
  {
    id: 'nexus_luyen_hu_void_tribulation',
    nexusName: 'Hư Không Cổ Thần Thức Tỉnh & Tranh Đoạt Giới Nguyên',
    targetSpineStageId: 'spine_stage_6',
    targetSpineStageTitle: 'Luyện Hư Kỳ • Hóa Thân Thiên Địa',
    macroCosmicEvent:
      'Giới Nguyên của đại lục cạn kiệt, các Hư Không Hung Thú viễn cổ từ ngoài rìa vũ trụ đổ bộ, đe dọa biến toàn bộ tiểu thế giới thành hư vô.',
    convergingBranchesSummary:
      'Mọi nhân quả gieo rắc từ thuở Luyện Khí hội tụ: di vật cổ thần, mạng lưới kinh tế vạn giới, kiếm phách thượng cổ và đạo tâm bất diệt dung hợp làm một để đúc thành Giới Chủ Thần Vị.',
    dramaticCatharsis:
      'Sự thăng hoa tột cùng của nhân vật chính từ một đệ tử bình thường thành Chúa Tể Thế Giới bảo bọc toàn bộ nhân vật phụ và chúng sinh.',
    exemplaryConvergencePrompt:
      'Viết phân cảnh Lâm Tiêu dung hợp Giới Nguyên, toàn bộ ký ức và nhân duyên từ các nhân vật phụ dọc theo hành trình tu tiên hiện về tiếp thêm sức mạnh cho hắn một kích trảm diệt Hư Không Thú.'
  }
];
