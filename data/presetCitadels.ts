import { CitadelItem } from '../types';

export const PRESET_CITADELS: CitadelItem[] = [
  // 1. Vạn Bảo Tiên Thành (Thượng Phẩm Thần Thành - Cấp 4)
  {
    id: 'citadel_van_bao',
    name: 'Vạn Bảo Tiên Thành • Đệ Nhất Đấu Giá Đô Hội',
    tier: 'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4 - Nguyên Anh / Hóa Thần)',
    category: 'Đấu Giá & Mậu Dịch Đô Hội',
    locationRegion: 'Trung Thổ Thần Châu • Bình Nguyên Thiên Kim',
    population: 'Hơn 12.000.000 tu sĩ & phàm nhân ưu tú',
    defensiveArray: {
      name: 'Bát Hoang Cửu Diệu Kim Cương Trận (Bát Phẩm Thần Trận)',
      tier: 'Bát Phẩm Thượng Thừa',
      features: 'Hấp thu kim linh chi khí ngàn dặm tạo thành 9 lớp màng bảo hộ kim sắc bất hoại, phản chấn 50% uy lực công kích của Hóa Thần đỉnh phong.',
      maintenanceCost: '100.000 Thượng Phẩm Linh Thạch mỗi ngày',
    },
    rulingFaction: {
      name: 'Cửu Châu Vạn Bảo Thương Minh (Chấp Chưởng Hội)',
      leaderName: 'Kim Đỉnh Chân Quân (Thẩm Vạn Sơn)',
      realmLevel: 'Hóa Thần Kỳ Hậu Kỳ',
      stance: 'Tuyệt Đối Trung Lập • Chỉ Trọng Lợi Ích & Trật Tự Mậu Dịch',
    },
    keyDistricts: [
      {
        name: 'Chí Bảo Đấu Giá Thiên Các',
        type: 'Đại Đấu Giá Các 99 Tầng',
        description: 'Tòa bảo tháp cao 99 tầng đúc bằng Lưu Ly Vàng Ròng, nơi định kỳ 3 năm một lần tổ chức Vạn Giới Đấu Giá Đại Hội quy tụ chí bảo thần thông khắp cửu châu.',
      },
      {
        name: 'Sinh Tử Tuyệt Nghệ Đài',
        type: 'Lôi Đài Tranh Chấp Công Khai',
        description: 'Nơi duy nhất trong thành cho phép quyết đấu ân oán. Ký giấy sinh tử, bật trận pháp ngăn cách, tuyệt đối cấm tư đấu ngoài lôi đài.',
      },
      {
        name: 'Linh Đan Bảo Khí Phố Đông',
        type: 'Phường Thị Mậu Dịch Cấp Cao',
        description: 'Dài ba mươi dặm, quy tụ hàng ngàn thương phô danh tiếng cung ứng đan dược từ Nhất phẩm tới Cực phẩm, pháp bảo và phù lục.',
      },
      {
        name: 'Lâm Thời Động Phủ Khu Tây',
        type: 'Khu Động Phủ Cho Thuê',
        description: 'Động phủ khảm Tụ Linh Trận tứ phẩm cho thuê theo ngày/tháng, trang bị cấm chế bảo mật danh tính tuyệt đối cho khách đấu giá.',
      },
    ],
    lawsAndTaboos: [
      'Nghiêm cấm thi triển linh lực hoặc tư đấu ngoài khu vực Sinh Tử Tuyệt Nghệ Đài (Vi phạm phế bỏ tu vi, tịch thu toàn bộ tài sản).',
      'Cấm ngự kiếm/ngự không phi hành ở độ cao dưới 300 trượng trong nội thành.',
      'Mọi giao dịch trên 1.000 Thượng Phẩm Linh Thạch bắt buộc chịu thuế mậu dịch 3% cho Thương Minh.',
    ],
    entryFeeAndTaxes: 'Phí nhập thành: 10 Trung Phẩm Linh Thạch/người (Miễn phí cho tu sĩ từ Nguyên Anh Kỳ trở lên).',
    specialResources: [
      'Khoáng mạch Linh Thạch Thượng Phẩm ngầm cung ứng linh khí dồi dào',
      'Đại Sưu Tầm Phù Vân Đỉnh — giám định mọi dị bảo thiên hạ',
      'Kênh thông thương truyền tống trận nối liền 108 đại tiên thành',
    ],
    description: 'Thần thành thương mại bậc nhất Trung Châu, ánh đèn bất dạ thành sáng rực vạn dặm. Nơi đây tiền tài linh thạch thông thiên, vạn tộc hội tụ, không phân biệt chính tà miễn tuân thủ thiết luật.',
    historyAndLegends: 'Được dựng nên từ 15.000 năm trước bởi 7 vị Cổ Đại Hóa Thần Thương Nhân. Tương truyền dưới lòng đất thành trấn áp một đầu Thao Thiết Thần Thú để thu hút vạn phương tài bảo quy tụ.',
  },

  // 2. Đoạn Giới Cổ Quan (Cực Phẩm Phù Không Thành - Cấp 5)
  {
    id: 'citadel_doan_gioi',
    name: 'Đoạn Giới Cổ Quan • Vạn Tộc Trấn Yêu Cương',
    tier: 'Cực Phẩm Phù Không Thành & Trấn Giới Cổ Quan (Cấp 5 - Luyện Hư / Hợp Thể)',
    category: 'Biên Giới Trấn Quan & Pháo Đài Chiến Tranh',
    locationRegion: 'Tây Bắc Hoang Mạc • Ranh Giới Thập Vạn Đại Sơn',
    population: 'Khoảng 3.500.000 tu sĩ chiến sĩ & thợ rèn linh khí',
    defensiveArray: {
      name: 'Vạn Cổ Huyết Đồ Trấn Ngục Trận (Cửu Phẩm Hộ Cương Cấm Trận)',
      tier: 'Cửu Phẩm Cực Hạn Sát Trận',
      features: 'Được khắc trên vách tường đá ngàn trượng, kích hoạt Huyết Sát Thiên Cương trảm sát mọi Yêu Vương từ Ngũ Giai trở lên xâm phạm.',
      maintenanceCost: 'Máu của Yêu Thú vạn đầu kết hợp Linh Tinh Thượng Cổ',
    },
    rulingFaction: {
      name: 'Trấn Yêu Tiên Minh (Thiết Huyết Quân Đoàn)',
      leaderName: 'Đoạn Thiên Kiếm Tôn (Mạc Vấn Thiên)',
      realmLevel: 'Luyện Hư Kỳ Viên Mãn',
      stance: 'Thiết Huyết Quân Quy • Tử Chiến Tuyệt Không Lùi Bước',
    },
    keyDistricts: [
      {
        name: 'Trấn Thiên Ma Năng Cung Vĩ Đài',
        type: 'Thao Trường Pháo Đài Trận Địa',
        description: 'Bố trí 360 cỗ Chấn Thiên Ma Năng Pháo rèn từ Vẫn Thiết Thiên Ngoại, mỗi phát bắn nổ tan xác một đầu Tứ Giai Yêu Thú.',
      },
      {
        name: 'Liệp Yêu Chiến Công Nhiệm Vụ Điện',
        type: 'Trung Tâm Quân Công & Thưởng Phạt',
        description: 'Nơi tiếp nhận đầu mối thú triều, đổi nội đan và xác thú lấy Chiến Công Điểm, công pháp bí truyền cùng binh khí sát phạt.',
      },
      {
        name: 'Huyết Dực Khôi Phục Quân Doanh',
        type: 'Khu Quân Trại & Trị Thương Khẩn Cấp',
        description: 'Tập hợp các Dược Sư và Đan Sư hàng đầu túc trực cứu chữa tu sĩ tàn phế kinh mạch sau các đợt thú triều ác liệt.',
      },
      {
        name: 'Thiên Ngoại Vẫn Thiết Luyện Binh Phường',
        type: 'Đại Hỏa Lò Rèn Binh Khí Sát Phạt',
        description: 'Nung chảy hung khí từ xương yêu thú và vẫn thiết để chế tạo chiến giáp, phá giáp tiễn cho tiền tuyến.',
      },
    ],
    lawsAndTaboos: [
      'Quân lệnh như sơn: Hễ có báo động thú triều, mọi tu sĩ trong thành bắt buộc tiếp nhận lệnh điều động tác chiến.',
      'Tuyệt đối cấm buôn bán vũ khí, phù lục phòng ngự cho Yêu Tộc hoặc nội gián ma đạo (Phát hiện trảm lập quyết, tru diệt tam tộc).',
      'Cấm gây hấn nội bộ gây tổn thất nhân lực biên phòng.',
    ],
    entryFeeAndTaxes: 'Phí nhập thành: Miễn phí nếu xuất trình Huy Hiệu Liệp Yêu Sư; kẻ lạ nộp 50 Trung Phẩm Linh Thạch hoặc 10 Yêu Đan.',
    specialResources: [
      'Vách thành đúc từ Thiên Ngoại Vẫn Thiết cao ngàn trượng không thể phá vỡ',
      'Kho tàng nội đan hung thú dồi dào nhất nhân giới',
      'Huyết Sát Thối Thể Trì giúp tu sĩ tôi luyện thể phách bất hoại',
    ],
    description: 'Chiến lũy trấn ải Tây Bắc ngăn cách Nhân tộc và Thập Vạn Đại Sơn Yêu Tộc. Khói lửa chiến tranh chưa từng tắt suốt mười vạn năm, ngập tràn sát khí và ý chí quật cường.',
    historyAndLegends: 'Tương truyền vào kỷ nguyên Thượng Cổ Thú Triều, 3 vị Nhân Tộc Cổ Tiên đã hóa đạo tại hẻm núi này, ngưng kết thân xác thành bức tường thành sừng sững bảo hộ nhân gian.',
  },

  // 3. Cửu Tiêu Phù Không Thần Thành (Cực Phẩm Phù Không Thành - Cấp 5)
  {
    id: 'citadel_cuu_tieu',
    name: 'Cửu Tiêu Phù Không Thần Thành • Lăng Không Tiên Đô',
    tier: 'Cực Phẩm Phù Không Thành & Trấn Giới Cổ Quan (Cấp 5 - Luyện Hư / Hợp Thể)',
    category: 'Lăng Không Phù Không Tiên Đô',
    locationRegion: 'Bắc Hoang Thượng Không • Tầng Mây Cửu Trọng',
    population: 'Khoảng 2.000.000 đại năng tiên gia & đệ tử tinh anh',
    defensiveArray: {
      name: 'Cửu Thiên Tinh Thần Huyền Vũ Trận (Thập Phẩm Tiên Thiên Linh Trận)',
      tier: 'Thập Phẩm Thần Thông Tiên Trận',
      features: 'Dẫn tinh quang 28 chòm sao thiên văn bao bọc thành trì, tự động tàng hình trong tầng mây lôi kiếp và phản kích bằng Tinh Lôi.',
      maintenanceCost: 'Hấp thụ trực tiếp Tinh Thần Chi Lực từ vũ trụ bao la',
    },
    rulingFaction: {
      name: 'Cửu Tiêu Vân Các Tiên Tông',
      leaderName: 'Thái Hư Vân Chủ (Bạch Hạc Chân Tiên)',
      realmLevel: 'Hợp Thể Kỳ Sơ Kỳ',
      stance: 'Chính Đạo Thanh Cao • Tiên Phong Đạo Cốt Xuất Trần',
    },
    keyDistricts: [
      {
        name: 'Lăng Không Phi Cảng',
        type: 'Bến Đỗ Phi Thuyền Xuyên Giới',
        description: 'Bến đỗ kỳ vĩ cho hàng trăm chiếc Vân Chu, Hư Không Chiến Hạm cỡ lớn kết nối các châu lục và giới diện lân cận.',
      },
      {
        name: 'Trích Tinh Lâu',
        type: 'Đài Quan Sát Tinh Tượng & Đạo Pháp',
        description: 'Tòa lâu đài chạm mây nơi các đại năng bói toán thiên cơ, luận bàn đại đạo và ngộ tính thiên địa quy tắc.',
      },
      {
        name: 'Vân Vụ Tụ Khí Động Thiên Khách Điếm',
        type: 'Nơi Bế Quan Nghỉ Ngơi Cao Cấp',
        description: 'Nhà trọ dựng trên mây ngũ sắc, phòng ốc ngập tràn linh khí tinh khiết không vướng bụi trần.',
      },
    ],
    lawsAndTaboos: [
      'Cấm bay vượt qua độ cao của Lăng Tiêu Chính Điện nơi Vân Chủ tọa trấn.',
      'Tuyệt đối cấm mang uế khí, ma cốt hoặc sát khí nồng đậm vào nội thành làm ô uế Tinh Thần Linh Mạch.',
    ],
    entryFeeAndTaxes: 'Phí nhập thành: Cần Phi Hành Lệnh Bài Cửu Tiêu hoặc nộp 100 Thượng Phẩm Linh Thạch.',
    specialResources: [
      'Bản nguyên Lôi Trì trên tầng mây luyện thể và độ kiếp',
      'Thiên Ngoại Tinh Thiết và Cửu Thiên Huyền Băng ngưng kết tự nhiên',
      'Vân Mẫu Linh Trà ngàn năm tăng trưởng thần thức',
    ],
    description: 'Thành trì lơ lửng trên tầng mây thứ chín, phiêu dạt tự do khắp bầu trời lục địa. Nơi ở của các bậc tiên nhân thoát tục xa rời phân tranh phàm trần.',
    historyAndLegends: 'Nguyên là một mảnh vỡ lục địa Tiên Giới rơi xuống hạ giới, được Cửu Tiêu Thủy Tổ luyện hóa trận pháp động lực nâng bổng lên chín tầng mây.',
  },

  // 4. Đại Yến Cổ Kinh (Phàm Trần Hùng Thành - Cấp 1)
  {
    id: 'citadel_dai_yen',
    name: 'Đại Yến Cổ Kinh • Hoàng Triều Đế Đô Khí Vận',
    tier: 'Phàm Trần Hùng Thành (Cấp 1 - Phàm nhân / Hoàng triều đế chế)',
    category: 'Hoàng Triều Đế Đô Khí Vận',
    locationRegion: 'Đông Hoang • Trung Tâm Bình Nguyên Phì Nhiêu',
    population: 'Khoảng 25.000.000 lê dân bá tánh & hoàng gia võ tướng',
    defensiveArray: {
      name: 'Cửu Long Khí Vận Hộ Quốc Trận (Hoàng Triều Long Mạch Trận)',
      tier: 'Lục Phẩm Khí Vận Thần Trận',
      features: 'Ngưng tụ khí vận vạn dân và long mạch tổ tiên, áp chế 30% đến 50% tu vi pháp thuật của tu sĩ ngoại lai dám đại náo đế đô.',
      maintenanceCost: 'Quốc khố hương hỏa và thuế khóa triệu dân Đại Yến',
    },
    rulingFaction: {
      name: 'Đại Yến Hoàng Tộc (Vũ Văn Thị)',
      leaderName: 'Đại Yến Hoàng Đế (Vũ Văn Hạo Thiên)',
      realmLevel: 'Võ Đạo Nhân Hoàng (Tương đương Kim Đan Viên Mãn)',
      stance: 'Hoàng Quyền Tối Thượng • Quân Pháp Như Sơn',
    },
    keyDistricts: [
      {
        name: 'Tử Cấm Hoàng Thành',
        type: 'Trung Tâm Quyền Lực & Cung Điện',
        description: 'Quần thể cung điện dát vàng tráng lệ, ngự tọa ngai vàng Cửu Long, cấm vệ quân Tiên Thiên cảnh canh gác trùng trùng.',
      },
      {
        name: 'Khâm Thiên Giám Tiên Sư Các',
        type: 'Cơ Quan Tiên Tu Phụng Sự Triều Đình',
        description: 'Nơi triều đình chiêu mộ tán tu làm Quốc Sư, phụng sự hoàng đế trừ yêu diệt ma bảo vệ xã tắc.',
      },
      {
        name: 'Kinh Đô Đông Tây Lưỡng Thị',
        type: 'Khu Thương Mại Sầm Uất Phàm Trần',
        description: 'Chợ buôn bán tơ lụa, ngọc ngà, võ học bí kíp phàm trần cùng vài sạp hàng đan dược thứ phẩm cho võ lâm cao thủ.',
      },
    ],
    lawsAndTaboos: [
      'Tu sĩ vào thành không được cậy pháp lực sát hại phàm nhân lương thiện (Kích hoạt Khí Vận Long Trận xử trảm).',
      'Mọi tu sĩ cảnh giới từ Trúc Cơ trở lên bắt buộc đăng ký thân phận tại Khâm Thiên Giám.',
    ],
    entryFeeAndTaxes: 'Phí nhập thành: 5 văn tiền đồng hoặc 1 bạc vụn; tu sĩ tiên gia được miễn phí qua cửa Tiên Môn.',
    specialResources: [
      'Cửu Long Khí Vận Tổ Mạch giúp bồi dưỡng Chân Long Thiên Tử',
      'Đại Nộ Đao Binh Doanh — đội quân phàm nhân trang bị linh khí tiễn',
      'Thư viện Tàng Thư Các chứa vạn quyển điển tịch lịch sử cổ đại',
    ],
    description: 'Kinh đô phồn hoa tráng lệ nhất thế giới phàm trần, nơi giao thoa giữa quyền lực thế tục và bóng dáng tiên tu ẩn hiện.',
    historyAndLegends: 'Trải qua 800 năm thịnh trị của triều đại Đại Yến, được lập quốc sau khi đánh đuổi Hắc Vu Ma Quốc khỏi Trung Nguyên.',
  },

  // 5. Thanh Mộc Tiên Thành (Hạ Phẩm Tiên Thành - Cấp 2)
  {
    id: 'citadel_thanh_mok',
    name: 'Thanh Mộc Tiên Thành • Tán Tu Thánh Địa Tự Do',
    tier: 'Hạ Phẩm Tiên Thành & Tán Tu Phường Thị (Cấp 2 - Luyện Khí / Trúc Cơ)',
    category: 'Tán Tu Thánh Địa Tự Do',
    locationRegion: 'Nam Hoang • Rìa Ngoài Vạn Yêu Sâm Lâm',
    population: 'Khoảng 800.000 tán tu giang hồ & linh nông',
    defensiveArray: {
      name: 'Thập Nhị Mộc Linh Tụ Khí Trận (Tứ Phẩm Tự Nhiên Trận)',
      tier: 'Tứ Phẩm Tự Nhiên Trận',
      features: 'Hòa quyện vào rễ cây ngàn năm, sinh sôi dây leo gai góc phòng ngự và thanh tẩy độc chướng lam sơn.',
      maintenanceCost: 'Thảo mộc linh dịch và 500 Hạ Phẩm Linh Thạch mỗi tháng',
    },
    rulingFaction: {
      name: 'Tán Tu Đồng Minh Trưởng Lão Hội',
      leaderName: 'Thanh Mộc Lão Nhân',
      realmLevel: 'Trúc Cơ Kỳ Đỉnh Phong',
      stance: 'Tự Do • Tương Trợ Tán Tu Yếu Thế • Dĩ Hòa Vi Quý',
    },
    keyDistricts: [
      {
        name: 'Chợ Phiên Thảo Dược Bình Minh',
        type: 'Thị Trường Thảo Dược Sơ Khai',
        description: 'Chợ tự do họp vào lúc tảng sáng, nơi các thợ hái thuốc bán thảo dược tươi vừa thu hoạch từ rừng sâu với giá mềm.',
      },
      {
        name: 'Tán Tu Trà Quán & Tình Báo Điểm',
        type: 'Nơi Giao Lưu & Thu Thập Tin Đồn',
        description: 'Quán trà náo nhiệt nơi tu sĩ trao đổi tin tức động phủ hoang phế, lập tổ đội săn yêu thú và giải tỏa căng thẳng.',
      },
      {
        name: 'Động Thụ Cư Xá Cho Thuê',
        type: 'Chỗ Ở Giá Rẻ Cho Người Mới',
        description: 'Các khoang rỗng được khoét trên thân cây đại thụ ngàn năm làm nơi nghỉ chân giá rẻ cho tu sĩ Luyện Khí Kỳ.',
      },
    ],
    lawsAndTaboos: [
      'Không được ỷ mạnh hiếp yếu hoặc ép giá thợ hái thuốc phàm trần và tiểu tu sĩ.',
      'Cấm phóng hỏa làm tổn hại thần mộc bảo hộ thành phố.',
    ],
    entryFeeAndTaxes: 'Phí nhập thành: 1 Khối Hạ Phẩm Linh Thạch (Ở lại tối đa 7 ngày).',
    specialResources: [
      'Ất Mộc Tinh Khí dồi dào chữa lành ám tật nội thương',
      'Đất trồng Linh Điền màu mỡ cho thảo dược một đến hai trăm năm',
      'Cung cấp mật ong Phong Lôi và quả linh mộc giải độc',
    ],
    description: 'Thành phố mộc mạc dựng tự nhiên từ thân và rễ của những cây cổ thụ ngàn năm. Mái nhà che mưa chắn gió cho những kẻ không môn không phái chật vật trên con đường tu tiên.',
    historyAndLegends: 'Nguyên là nơi ẩn cư của một tu sĩ Trúc Cơ già nhân hậu, dần dần thu hút những kẻ cùng cảnh ngộ tạo thành đô thị sầm uất.',
  },

  // 6. Thủy Tinh Long Thành (Trung Phẩm Cổ Thành - Cấp 3)
  {
    id: 'citadel_thuy_tinh',
    name: 'Thủy Tinh Long Thành • Thâm Hải Tiên Cung',
    tier: 'Trung Phẩm Cổ Thành & Châu Phủ Đô Hội (Cấp 3 - Kim Đan Kỳ)',
    category: 'Hải Để Tiên Thành',
    locationRegion: 'Đông Hải Vạn Trượng Hải Uyên',
    population: 'Khoảng 1.500.000 Giao Nhân, Long Tộc bàng chi & Hải Tu',
    defensiveArray: {
      name: 'Tị Thủy Cửu Tiêu Long Tức Đại Trận (Thất Phẩm Thủy Hệ Trận)',
      tier: 'Thất Phẩm Hộ Cung Trận',
      features: 'Ngăn cách áp lực nước biển vạn trượng, tạo không gian hô hấp tự nhiên và triệu hồi thủy long hộ thể khi có địch tập kích.',
      maintenanceCost: 'Thủy Linh Châu ngàn năm & Long Tức Châu',
    },
    rulingFaction: {
      name: 'Đông Hải Thủy Tinh Cung (Giao Long Tộc)',
      leaderName: 'Ngao Quảng Hà (Giao Long Vương)',
      realmLevel: 'Kim Đan Kỳ Đại Viên Mãn (Sắp Hóa Giao Long Thần Thú)',
      stance: 'Kiêu Ngạo • Bảo Hộ Hải Tộc • Hòa Hảo Với Đất Liền Có Điều Kiện',
    },
    keyDistricts: [
      {
        name: 'Hải Để San Hô Ngọc Thị',
        type: 'Thị Trường Châu Báu & Dị Thảo Dưới Nước',
        description: 'Các gian hàng làm bằng san hô đỏ rực, buôn bán San Hô Vạn Năm, Dạ Minh Châu, Mặc Lân Sa và vảy cá giao long.',
      },
      {
        name: 'Trân Châu Thủy Tinh Cung Điện',
        type: 'Vương Phủ & Nghị Sự Đại Sảnh',
        description: 'Tòa cung điện lộng lẫy tạc từ Thủy Tinh Nguyên Khối ngàn năm, tỏa ánh sáng lam ngọc mê hoặc dưới đáy biển sâu.',
      },
    ],
    lawsAndTaboos: [
      'Tu sĩ đất liền vào thành bắt buộc đeo Tị Thủy Phù hoặc ngậm Định Hải Châu do cung thành cấp phát.',
      'Tuyệt đối cấm đánh bắt hoặc sát hại Giao Nhân tộc làm nô lệ.',
    ],
    entryFeeAndTaxes: 'Phí nhập thành: 5 Trung Phẩm Linh Thạch hoặc 1 viên Trân Châu Hải Để.',
    specialResources: [
      'Hàn Băng Thủy Tinh Quặng Mỏ dưới đáy vực sâu',
      'Nước mắt Giao Nhân hóa thành ngọc trường thọ diên mệnh',
      'Hải Linh Thú thuần hóa làm thú cưỡi bơi lội siêu tốc',
    ],
    description: 'Thành trì tráng lệ lung linh dưới đáy biển xanh thẳm, được bao bọc bởi màng nước lam quang huyền ảo, nơi hội tụ trù phú của hải dương vạn dặm.',
    historyAndLegends: 'Được dựng nên từ thời Cổ Long Thần Chiến, khi một giọt máu của Thượng Cổ Chân Long rơi xuống tạo thành long mạch đại dương.',
  },

  // 7. U Đô Cửu U (Thượng Phẩm Thần Thành - Cấp 4)
  {
    id: 'citadel_u_do',
    name: 'U Đô Cửu U • Hắc Thị Ma Thành Vô Pháp',
    tier: 'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4 - Nguyên Anh / Hóa Thần)',
    category: 'Hắc Thị & Ma Đạo Ẩn Thành',
    locationRegion: 'Địa Để Vạn Trượng • Minh Giới Tiếp Giáp Khe Nứt',
    population: 'Khoảng 4.000.000 ma tu, sát thủ, tội phạm bị truy nã',
    defensiveArray: {
      name: 'Cửu U Huyết Sát Hóa Cốt Trận (Bát Phẩm Ma Trận)',
      tier: 'Bát Phẩm Âm Sát Tuyệt Trận',
      features: 'Màn sương đen độc sát bao phủ, tu sĩ chính đạo bước vào bị ăn mòn linh lực và hộ thể cương khí, biến hài cốt kẻ địch thành sát khí nuôi trận.',
      maintenanceCost: 'Huyết khí và linh hồn tà tu hiến tế',
    },
    rulingFaction: {
      name: 'Ám Dạ Thập Nhị Diêm La Hội',
      leaderName: 'U Minh Ma Quân (Tạ Bất Quy)',
      realmLevel: 'Nguyên Anh Kỳ Đỉnh Phong',
      stance: 'Ma Đạo Độc Tôn • Nắm Đấm Là Chân Lý • Tiền & Máu Quyết Định',
    },
    keyDistricts: [
      {
        name: 'Tử Vong Đấu Thú Ngục',
        type: 'Đấu Trường Sinh Tử Đẫm Máu',
        description: 'Nơi các tù nhân, ma thú và nô lệ giác đấu tàn khốc mỗi đêm phục vụ cá cược hàng triệu linh thạch đen.',
      },
      {
        name: 'Vô Ảnh Sát Thủ Lâu',
        type: 'Đầu Mối Thuê Sát Thủ & Mua Chuộc Mạng Sống',
        description: 'Nhận ám sát từ chưởng môn danh môn chính phái tới đệ tử thiên kiêu, chỉ cần trả đủ giá.',
      },
      {
        name: 'Hắc Thị Rửa Đồ & Cấm Dược Khu',
        type: 'Chợ Đen Bán Hàng Trộm Cắp & Độc Đan',
        description: 'Nơi tiêu thụ bảo vật cướp bóc, công pháp cấm kỵ tà ma và độc dược diệt môn không hỏi nguồn gốc.',
      },
    ],
    lawsAndTaboos: [
      'Luật duy nhất: Kẻ yếu không có quyền lên tiếng. Kẻ chết trong ngõ tối không ai điều tra.',
      'Không được làm gián đoạn các phiên đấu giá lớn của Diêm La Hội dưới hình phạt lột da rút gân.',
    ],
    entryFeeAndTaxes: 'Phí nhập thành: 20 Khối Trung Phẩm Linh Thạch hoặc giao nộp 1 mạng người chứng minh ma tính.',
    specialResources: [
      'Cửu U Hoàng Tuyền Thủy luyện đan độc và tẩy kiếm ma',
      'Âm Dương Đoạt Mệnh Đan trác tuyệt cứu mạng ma đạo',
      'Động quỷ u minh rèn luyện sát khí và tâm ma',
    ],
    description: 'Thủ phủ ngầm không thấy ánh mặt trời của giới ma đạo âm sát. Nơi trú ẩn an toàn nhất cho những kẻ bị toàn thiên hạ chính đạo phát lệnh truy nã.',
    historyAndLegends: 'Hình thành từ vết nứt đứt gãy sau trận chiến Tiên Ma đại kiếp 3 vạn năm trước, tích tụ oán khí vô số cường giả ngã xuống.',
  },

  // 8. Bất Lạc Thiên Đình (Thần Thoại Tiên Đô - Cấp 6)
  {
    id: 'citadel_bat_lac',
    name: 'Bất Lạc Thiên Đình • Thái Cổ Tiên Đô Vĩnh Hằng',
    tier: 'Thần Thoại Tiên Đô & Thái Cổ Thiên Thành (Cấp 6 - Đại Thừa / Chân Tiên)',
    category: 'Thái Cổ Thiên Đình Tiên Cung',
    locationRegion: 'Tam Thập Tam Thiên • Thái Vi Tiên Vực Tối Cao',
    population: 'Vô số Tiên Tướng, Tiên Quan & Tán Tiên Thượng Giới',
    defensiveArray: {
      name: 'Chu Thiên Tinh Đẩu Vạn Kiếp Bất Diệt Trận (Hỗn Độn Tiên Thiên Trận)',
      tier: 'Hỗn Độn Cực Đạo Trận',
      features: 'Mượn uy năng của thái dương và thái âm cùng 365 vì sao chính, trấn áp chư thiên vạn giới, Đại Thừa kỳ công kích cũng chỉ như muối bỏ biển.',
      maintenanceCost: 'Hỗn Độn Khí Vận & Tiên Giới Bản Nguyên',
    },
    rulingFaction: {
      name: 'Thái Vi Thiên Đế Cung',
      leaderName: 'Hạo Thiên Tiên Đế',
      realmLevel: 'Chân Tiên Cảnh Giới Vô Thượng',
      stance: 'Chúa Tể Càn Khôn • Chấp Chưởng Thiên Đạo Quy Tắc',
    },
    keyDistricts: [
      {
        name: 'Nam Thiên Môn',
        type: 'Cổng Trời Trấn Giới Tối Cao',
        description: 'Hai cột trụ bạch ngọc dát vàng ngàn trượng chọc thủng tầng mây, Chiếu Yêu Kính treo cao soi thấu bản thể vạn vật.',
      },
      {
        name: 'Lăng Tiêu Bảo Điện',
        type: 'Nghị Sự Cung Điện Của Tiên Đế',
        description: 'Nơi Thiên Đế ngự giá, ban bố thiên điều pháp dụ, triệu tập tiên ban chư thần quản lý chư thiên vạn giới.',
      },
      {
        name: 'Bàn Đào Tiên Uyển',
        type: 'Vườn Tiên Dược Diên Thọ Vĩnh Cửu',
        description: 'Trồng cây Bàn Đào 9.000 năm chín một lần, một quả ăn vào thọ dữ thiên tề, sánh ngang nhật nguyệt.',
      },
    ],
    lawsAndTaboos: [
      'Phàm nhân hoặc tu sĩ chưa độ kiếp thành tiên không thể bước qua Nam Thiên Môn (Bị thiên lôi đánh thành tro bụi).',
      'Vi phạm Thiên Quy sẽ bị đày vào Trảm Tiên Đài trảm đi tiên cốt.',
    ],
    entryFeeAndTaxes: 'Chỉ đón tiếp cường giả sở hữu Tiên Tịch hoặc nhận Thiên Đế Triệu Hoán.',
    specialResources: [
      'Tiên Khí nguyên chất cô đọng thay thế hoàn toàn linh khí trần tục',
      'Bàn Đào Thần Quả và Cửu Chuyển Kim Đan khởi tử hồi sinh',
      'Hóa Tiên Trì gột rửa phàm thai thối biến thành tiên khu',
    ],
    description: 'Thái Cổ Tiên Đô tối thượng lơ lửng trên mây tím của Tam Thập Tam Thiên. Biểu tượng tối cao cho đỉnh phong của con đường tu chân đăng phong tạo cực.',
    historyAndLegends: 'Trải qua vô lượng lượng kiếp, tồn tại từ thời điểm khai thiên lập địa khi Bàn Cổ Thần phân tách âm dương.',
  },
];
