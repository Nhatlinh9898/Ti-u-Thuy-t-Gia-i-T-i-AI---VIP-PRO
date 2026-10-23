import { SectPositionDetail } from '../types';

export const PRESET_11_SECT_POSITIONS: SectPositionDetail[] = [
  // 1. Tạp Dịch Đệ Tử
  {
    id: 'pos_tap_dich',
    rankName: 'Tạp Dịch Đệ Tử (Lao Dịch Sơn Môn)',
    tier: 'Cấp 1 - Đáy Tháp Môn Phái',
    levelNumber: 1,
    requiredCultivationRealm: 'Phàm nhân khai mạch / Luyện Khí tầng 1 - 3',
    scopeOfAuthority: 'Không có quyền hạn môn phái. Chỉ được phép hoạt động tại các khu vực hậu cần, dược điền ngoại vi, trù phòng và chuồng linh thú.',
    keyResponsibilities: [
      'Quét dọn vạn bậc thang đá Thông Thiên Sơn môn mỗi sáng sớm trước khi mặt trời mọc',
      'Tưới tắm linh tuyền và bón phân cho Dược Điền linh thảo hạ phẩm',
      'Đốn củi Thiết Mộc ngàn năm và nấu cơm linh mễ tại Hậu Cần Trù Đường',
      'Chăm sóc, dọn chuồng và tắm rửa cho Linh Thú tọa kỵ sơ giai'
    ],
    resourceMonthlyStipend: '1-3 Hạ Phẩm Linh Thạch, 1 viên Tụ Khí Tán thứ phẩm, 1 bao Linh Mễ phàm phẩm',
    stipendDetails: {
      spiritStones: '1-3 khối Hạ Phẩm Linh Thạch',
      pills: '1 viên Tụ Khí Tán (Dược cặn thứ phẩm)',
      meritPoints: '10 điểm cống hiến lao dịch',
      specialPrivileges: 'Được vào thính phòng nghe giảng pháp chung 1 lần/tháng tại Quảng Trường Ngoại Môn'
    },
    residenceArea: 'Khu nhà tranh tập thể dột nát dưới chân núi Hắc Nham, chung phòng 8-12 người, linh khí mỏng manh ngang ngửa phàm trần.',
    advancementCriteria: 'Đột phá Luyện Khí tầng 4 trong vòng 3 năm và vượt qua kỳ Khảo Hạch Thí Luyện Ngoại Môn (Leo Thông Thiên Thang trong 3 canh giờ hoặc nộp 1000 điểm cống hiến lao dịch).',
    clothingAndToken: 'Áo vải gai thô màu xám tro không có thêu phù văn; Lệnh bài bằng gỗ lê đen khắc chữ "Tạp".',
    tokenAndRobes: {
      tokenMaterial: 'Hắc Lê Mộc (Gỗ lê đen thô sơ)',
      robeColor: 'Màu xám tro / Vải thô đơn giản',
      insignia: 'Biểu tượng Búa Đốn Củi và Thảo Diệp đan chéo'
    },
    commonInternalCrimes: 'Ăn trộm linh quả trong vườn, lén lút tu luyện công pháp cấm, trốn việc lao dịch, ẩu đả tranh giành cơm linh mễ.',
    disciplinePenalty: 'Đánh 50 roi Phạt Thần Tiên, giam giữ tại Hắc Thiết Lao 3 tháng hoặc phế bỏ tu vi trục xuất khỏi sơn môn.',
    promotionCeremonyNarrative: 'Quỳ nhận thanh bào trước tượng tổ sư tại quảng trường dưới chân núi, giao nộp lệnh bài gỗ đen để đổi lấy Lệnh Bài Thanh Đồng Ngoại Môn, chính thức bước một chân vào tiên đồ.'
  },

  // 2. Ngoại Môn Đệ Tử
  {
    id: 'pos_ngoai_mon',
    rankName: 'Ngoại Môn Đệ Tử (Sơ Bộ Tiên Lộ)',
    tier: 'Cấp 2 - Môn Nhân Chính Thức',
    levelNumber: 2,
    requiredCultivationRealm: 'Luyện Khí tầng 4 - tầng 9',
    scopeOfAuthority: 'Được tự do đi lại trong Ngoại Vi Sơn Môn, được vào Tàng Kinh Các tầng 1, được nhận nhiệm vụ treo thưởng cấp Hoàng/Huyền tại Bảng Nhiệm Vụ.',
    keyResponsibilities: [
      'Tuần tra và canh gác ranh giới hộ sơn ngoại vi, ngăn chặn dã thú và tán tu xâm phạm',
      'Lĩnh ngộ công pháp Hoàng Giai cơ bản tại Thính Đạo Đường ngoại môn',
      'Tiếp nhận nhiệm vụ thu thập thảo dược và trừ tà phàm trần để tích lũy cống hiến môn phái',
      'Tham gia Đại Hội Tỷ Võ Ngoại Môn diễn ra hàng năm'
    ],
    resourceMonthlyStipend: '10-20 Hạ Phẩm Linh Thạch, 2 viên Bổ Khí Đan hạ phẩm, quyền đổi công pháp Hoàng giai',
    stipendDetails: {
      spiritStones: '15 khối Hạ Phẩm Linh Thạch',
      pills: '2 viên Bổ Khí Đan hạ phẩm, 1 viên Chỉ Huyết Sinh Cơ Cao',
      meritPoints: '50 điểm cống hiến môn phái',
      specialPrivileges: 'Mỗi tháng được mượn 1 cuốn bí tịch Hoàng Giai tầng 1 Tàng Kinh Các trong 7 ngày'
    },
    residenceArea: 'Đình viện tứ hợp viện chân núi Thanh Phong, mỗi viện 4 người có sân luyện kiếm riêng, nồng độ linh khí gấp đôi phàm giới.',
    advancementCriteria: 'Đột phá Trúc Cơ Kỳ hoặc đoạt Top 10 trong Đại Tỷ Võ Ngoại Môn hàng năm; vượt qua khảo nghiệm Trúc Cơ Thí Luyện Cổ Động.',
    clothingAndToken: 'Đạo bào thanh sam màu xanh nhạt có viền trắng mỏng; Lệnh bài bằng Thanh Đồng khắc tên và bản mệnh linh căn.',
    tokenAndRobes: {
      tokenMaterial: 'Thanh Đồng cổ (Khắc phù trận trừ tà vi mô)',
      robeColor: 'Thanh y sam lam nhạt (Vải gai dệt tơ tằm)',
      insignia: 'Huy hiệu Mây Bay và Thần Kiếm sơ khai'
    },
    commonInternalCrimes: 'Tư thông với tán tu gian thương buôn lậu đan dược môn phái, bỏ trốn khi làm nhiệm vụ diệt ma, che giấu chiến lợi phẩm không nộp tông môn.',
    disciplinePenalty: 'Bị giáng chức về Tạp Dịch Đệ Tử trong 1 năm, tịch thu toàn bộ điểm cống hiến và cấm bước vào Tàng Kinh Các.',
    promotionCeremonyNarrative: 'Được Chấp Sự dẫn độ bay lên Thập Bát Phong, tắm gội tại Tẩy Trần Trì, thay bạch sắc nguyệt bào và nhận túi trữ vật nội môn trước mặt Phong Chủ.'
  },

  // 3. Nội Môn Đệ Tử
  {
    id: 'pos_noi_mon',
    rankName: 'Nội Môn Đệ Tử (Trụ Cột Tông Môn)',
    tier: 'Cấp 3 - Tinh Anh Đệ Tử',
    levelNumber: 3,
    requiredCultivationRealm: 'Trúc Cơ Sơ Kỳ đến Trúc Cơ Viên Mãn',
    scopeOfAuthority: 'Được phân bổ chính thức về một trong các Phong chính, sở hữu Động Phủ độc lập, được ra vào Tàng Kinh Các tầng 2 (Công pháp Huyền Giai), được quyền chỉ huy đệ tử ngoại môn làm nhiệm vụ.',
    keyResponsibilities: [
      'Tu luyện công pháp bí truyền của ngọn Phong trực thuộc (Kiếm Phong, Đan Phong, Trận Phong, v.v.)',
      'Đại diện tông môn tham gia các chiến dịch tiêu diệt ma sào quy mô vừa hoặc thám hiểm Bí Cảnh',
      'Hướng dẫn và chỉ điểm cho đệ tử ngoại môn tại Diễn Võ Đường',
      'Trực luân phiên vận hành và cung cấp linh lực cho Hộ Sơn Trận Nhãn phụ'
    ],
    resourceMonthlyStipend: '100-200 Hạ Phẩm Linh Thạch (hoặc 1 Trung Phẩm Linh Thạch), 3 viên Trúc Cơ Đan / Ngưng Khí Hoàn, 1 thanh Phi Kiếm hạ phẩm',
    stipendDetails: {
      spiritStones: '1 Trung Phẩm Linh Thạch + 50 Hạ Phẩm Linh Thạch',
      pills: '3 viên Dưỡng Nguyên Đan trung phẩm, 1 bình Bách Thảo Thanh Tâm Lộ',
      meritPoints: '300 điểm cống hiến môn phái',
      specialPrivileges: 'Được vào Đan Phòng và Khí Phường thuê lò luyện đan/luyện khí miễn phí 2 lần/tháng'
    },
    residenceArea: 'Động phủ độc lập tại sườn núi Thập Bát Phong, có Tụ Linh Trận cấp 1 phong tỏa cửa động, linh tuyền nhỏ và linh khí gấp 5 lần phàm giới.',
    advancementCriteria: 'Kết xuất Kim Đan (bất kể phẩm cấp), được một vị Trưởng Lão hoặc Phong Chủ nhìn trúng nhận làm đồ đệ nhập thất; hoặc đánh bại Chân Truyền Đệ Tử trong Lôi Đài Đoạt Vị.',
    clothingAndToken: 'Đạo bào nguyệt bạch trắng tuyết thêu chỉ bạc lấp lánh; Lệnh bài làm từ Hàn Ngọc Băng Tinh có khắc linh thức bản mệnh.',
    tokenAndRobes: {
      tokenMaterial: 'Hàn Ngọc Băng Tinh (Kết nối trực tiếp Hồn Bài trong Tông Miếu)',
      robeColor: 'Nguyệt bạch sắc (Trắng như ánh trăng) thêu hoa văn chỉ bạc',
      insignia: 'Biểu tượng Linh Phong chân truyền và Ngũ Hành Đạo Trận'
    },
    commonInternalCrimes: 'Tàn sát đồng môn đoạt bảo trong bí cảnh, tu luyện bí pháp ma công tà đạo, phản bội ngọn Phong của mình để đầu quân phe phái đối địch.',
    disciplinePenalty: 'Bị trục xuất vào Tư Quá Nhai sám hối 10 năm, phong ấn 80% kinh mạch hoặc tước đoạt động phủ.',
    promotionCeremonyNarrative: 'Tiếng chuông Cửu Tiêu Chấn Thiên vang lên 9 hồi, đích thân Phong Chủ trao Tử Kim Ngọc Phù và ban thưởng Bản Mệnh Đạo Bào tại Thái Cực Điện.'
  },

  // 4. Chân Truyền Đệ Tử
  {
    id: 'pos_chan_truyen',
    rankName: 'Chân Truyền Đệ Tử (Hạt Giống Kế Thừa)',
    tier: 'Cấp 4 - Hạt Giống Đạo Thống',
    levelNumber: 4,
    requiredCultivationRealm: 'Kim Đan Sơ Kỳ đến Kim Đan Hậu Kỳ',
    scopeOfAuthority: 'Được bái một vị Đại Trưởng Lão hoặc Thủ Tọa làm Ân Sư nhập thất, được tiếp cận Tàng Kinh Các tầng 3 (Công pháp Địa Giai), quyền lực cao hơn Chấp Sự bình thường, sở hữu quyền miễn trừ điều tra sơ cấp.',
    keyResponsibilities: [
      'Thừa kế y bát và bí pháp trấn phong của sư tôn trực tiếp chỉ dạy',
      'Đại diện tông môn tham gia Luận Đạo Đại Hội Toàn Cực hoặc Bí Cảnh Thiên Kiêu Đoạt Bảo',
      'Hộ đạo cho tông môn khi có chiến sự khẩn cấp, làm mũi nhọn đột phá đội hình địch',
      'Giám sát đệ tử nội môn và có quyền báo cáo trực tiếp lên Trưởng Lão Đoàn'
    ],
    resourceMonthlyStipend: '10 Trung Phẩm Linh Thạch, 2 viên Kim Đan Phục Nguyên Đan thượng phẩm, 500 điểm cống hiến, tài nguyên đan thảo không giới hạn từ sư tôn',
    stipendDetails: {
      spiritStones: '15 khối Trung Phẩm Linh Thạch',
      pills: '2 viên Cố Bản Bồi Nguyên Đan cực phẩm, 1 viên Tị Lôi Phù thượng phẩm',
      meritPoints: '1,000 điểm cống hiến môn phái',
      specialPrivileges: 'Tự do ra vào cấm địa Dược Viên và mượn Đạo Khí tông môn khi xuất chinh'
    },
    residenceArea: 'Đỉnh phong riêng biệt giữa biển mây hoặc Động Thiên Phúc Địa độc chiếm sơn đầu, có Tụ Linh Trận cấp 3, suối ngọc linh dịch và 4-6 đệ tử hầu cận.',
    advancementCriteria: 'Đột phá Kim Đan Viên Mãn / Nguyên Anh Sơ Kỳ, chiến lực vô địch cùng thế hệ, đánh bại toàn bộ đối thủ trong Đại Điển Tuyển Chọn Thánh Tử / Đại Sư Huynh.',
    clothingAndToken: 'Tử kim cẩm bào thêu rồng phượng bằng sợi tơ thiên tằm; Lệnh bài làm từ Ô Kim Hỗn Hợp Tử Ngọc có linh khí hộ thể.',
    tokenAndRobes: {
      tokenMaterial: 'Tử Dương Huyết Ngọc viền Ô Kim Viễn Cổ',
      robeColor: 'Tử kim sắc (Tím hoàng gia viền vàng óng ánh)',
      insignia: 'Phù văn Thái Cổ Khai Thiên và Dấu Ấn Bản Mệnh Tông Chủ'
    },
    commonInternalCrimes: 'Kiêu ngạo làm bậy xem mạng đệ tử cấp dưới như cỏ rác, tư thông tin tình báo với Thánh Địa đối địch, đánh cắp bí mật cấm thuật môn phái.',
    disciplinePenalty: 'Bị phế bỏ thân phận Chân Truyền, giam lỏng tại Trấn Ma Tháp hoặc phế truất linh căn nếu phản bội.',
    promotionCeremonyNarrative: 'Quỳ nhận Kiếm Lệnh Chân Truyền trước Hồn Bia Liệt Tổ, giọt máu đầu tim nhỏ vào Khí Vận Đỉnh, danh xưng được khắc vĩnh viễn vào Kim Thư Tông Tộc.'
  },

  // 5. Thủ Tọa Đệ Tử / Đại Sư Huynh
  {
    id: 'pos_thu_toa_de_tu',
    rankName: 'Thủ Tọa Đệ Tử / Đại Sư Huynh (Thiên Kiêu Trấn Phái)',
    tier: 'Cấp 5 - Đệ Nhất Thiên Kiêu',
    levelNumber: 5,
    requiredCultivationRealm: 'Kim Đan Đỉnh Phong / Nửa Bước Nguyên Anh / Nguyên Anh Sơ Kỳ',
    scopeOfAuthority: 'Đứng đầu toàn bộ đệ tử môn phái (Thánh Tử / Thiếu Tông Chủ dự bị). Nắm quyền điều động toàn bộ đệ tử tham chiến, quyền ngang hàng Chấp Sự Trưởng Lão, có quyền trảm trước tấu sau đối với đệ tử vi phạm môn quy.',
    keyResponsibilities: [
      'Lĩnh binh chỉ huy toàn bộ đệ tử xuất chinh trong các cuộc đại chiến tông môn',
      'Đại diện cho tôn nghiêm và thể diện của môn phái trước các đại giáo thiên hạ',
      'Trấn áp mọi sự bất phục trong nội bộ đệ tử, giữ gìn đạo tâm đoàn kết của môn phái',
      'Chuẩn bị tâm thế và thực lực để kế thừa ngôi vị Chưởng Môn đời tiếp theo'
    ],
    resourceMonthlyStipend: '1 Cực Phẩm Linh Thạch (hoặc 50 Trung Phẩm), Linh Đan Độ Kiếp, Pháp Bảo Thượng Phẩm Bổn Mệnh, tài nguyên tu luyện cấp độ Trưởng Lão',
    stipendDetails: {
      spiritStones: '1 khối Cực Phẩm Linh Thạch + 100 Trung Phẩm Linh Thạch',
      pills: '3 viên Hóa Anh Đan chuẩn bị phá cảnh, 1 giọt Cửu Thiên Linh Nhũ',
      meritPoints: '3,000 điểm cống hiến môn phái',
      specialPrivileges: 'Được quyền triệu tập Đệ Tử Hội Nghị và sử dụng Hộ Thần Thuật của Thái Thượng Lão Tổ 1 lần'
    },
    residenceArea: 'Thánh Tử Phong độc lập cao nhất Thập Bát Phong, linh khí ngưng tụ thành giọt mưa linh dịch, có Hộ Vệ Đội 12 tu sĩ Trúc Cơ túc trực.',
    advancementCriteria: 'Đột phá Nguyên Anh Kỳ thành công, thông qua Khảo Hạch Đạo Tâm Thiên Ma và được Chưởng Môn ban phong làm Chấp Lệnh Trưởng Lão hoặc Thiếu Tông Chủ.',
    clothingAndToken: 'Huyền Long Bào thêu tinh vân cửu thiên bằng chỉ vàng rực rỡ; Lệnh bài bằng Cửu Thiên Vẫn Thiết khảm Long Châu.',
    tokenAndRobes: {
      tokenMaterial: 'Cửu Thiên Vẫn Thiết khảm Hóa Long Thần Châu',
      robeColor: 'Huyền Hoàng Đạo Bào (Đen tuyền điểm vàng ánh kim)',
      insignia: 'Long Đằng Vân Tiêu và Thái Hư Thần Ấn uy nghi'
    },
    commonInternalCrimes: 'Lạm quyền kết bè phái mưu đồ soán vị Chưởng Môn sớm, bức hại các đệ tử thiên tài mới nổi vì sợ bị cướp ngôi vị trí, ma hóa đạo tâm do áp lực.',
    disciplinePenalty: 'Bị tước bỏ vị trí Thánh Tử, giam cầm dưới Cửu U Hàn Đàm nghìn năm hoặc phế bỏ tu vi nếu gây họa diệt môn.',
    promotionCeremonyNarrative: 'Toàn thể mười vạn đệ tử đồng thanh quỳ bái hô vang tôn hiệu, Chưởng Môn trao Kiếm Trấn Phái và vương miện ngọc đạo tại Quảng Trường Thiên Đạo.'
  },

  // 6. Chấp Sự Đường Khẩu
  {
    id: 'pos_chap_su',
    rankName: 'Chấp Sự Đường Khẩu (Chấp Sự Viện / Trưởng Ban Quản Lý)',
    tier: 'Cấp 6 - Quan Chức Sự Vụ',
    levelNumber: 6,
    requiredCultivationRealm: 'Kim Đan Sơ Kỳ đến Kim Đan Hậu Kỳ',
    scopeOfAuthority: 'Chưởng quản cụ thể một cơ quan đầu não sự vụ: Chấp Pháp Đường, Dược Điền Đường, Bách Bảo Đường, Khảo Hạch Viện, Ngoại Vụ Ty. Nắm giữ tài chính, kho đan dược và phân phát nhiệm vụ.',
    keyResponsibilities: [
      'Quản lý sổ sách xuất nhập linh thạch, đan dược, tài nguyên của tông môn',
      'Tổ chức và giám sát các kỳ thi khảo hạch đệ tử định kỳ',
      'Điều tra và bắt giữ đệ tử vi phạm môn quy giao cho Chấp Pháp Trưởng Lão xét xử',
      'Dẫn đoàn giao dịch thương mại với các Tiên Thành và Tán Tu Minh'
    ],
    resourceMonthlyStipend: '30 Trung Phẩm Linh Thạch, bổng lộc quản lý từ ngân khố đường khẩu, tỷ lệ trích hoa hồng nhiệm vụ môn phái',
    stipendDetails: {
      spiritStones: '30 khối Trung Phẩm Linh Thạch',
      pills: '5 viên Dưỡng Đan Đan, 2 viên Giải Độc Thanh Huyết Đan',
      meritPoints: '2,000 điểm cống hiến quản trị',
      specialPrivileges: 'Được quyền ký duyệt cấp phát tài nguyên cho đệ tử dưới quyền hạn ngạch 500 linh thạch'
    },
    residenceArea: 'Đình đài phủ đệ trang nghiêm nằm liền kề các nha môn sự vụ, có đầy đủ người hầu và thị vệ hộ tống.',
    advancementCriteria: 'Cống hiến 50 năm sự vụ không sai sót, tích lũy đủ 10 vạn điểm cống hiến tông môn, hoặc đột phá Nguyên Anh Kỳ để thăng lên Trưởng Lão Ngoại Vụ.',
    clothingAndToken: 'Quan bào màu lam đậm viền đồng thau nghiêm trang; Lệnh bài Ô Mộc nạm đồng khắc ấn triện đường khẩu quản lý.',
    tokenAndRobes: {
      tokenMaterial: 'Thiết Bích Ô Mộc nạm Bách Luyện Đồng Thau',
      robeColor: 'Thâm Lam Sắc (Xanh thẫm chững chạc)',
      insignia: 'Biểu tượng Bút Nghiệp, Cân Công Lý và Ngọc Tỷ sự vụ'
    },
    commonInternalCrimes: 'Tham ô linh thạch ngân khố, ăn hối lộ để nâng điểm khảo hạch đệ tử, gian lận phân phát đan dược kém chất lượng cho đệ tử ngoại môn.',
    disciplinePenalty: 'Tịch thu toàn bộ gia tài, phế truất chức vụ đày đi khai thác mỏ linh thạch biên cương 30 năm.',
    promotionCeremonyNarrative: 'Được Đại Trưởng Lão ký duyệt thư bổ nhiệm, đóng dấu son Tông Môn Ngọc Tỷ và trao Chấp Sự Quan Ấn tại Nghị Sự Điện.'
  },

  // 7. Trưởng Lão Chấp Pháp / Công Pháp / Ngoại Vụ
  {
    id: 'pos_truong_lao_tam_vien',
    rankName: 'Trưởng Lão Chấp Pháp / Công Pháp / Ngoại Vụ (Tam Đại Cự Đầu)',
    tier: 'Cấp 7 - Trưởng Lão Đoàn Cốt Lõi',
    levelNumber: 7,
    requiredCultivationRealm: 'Nguyên Anh Sơ Kỳ đến Nguyên Anh Đỉnh Phong',
    scopeOfAuthority: 'Nắm quyền sinh sát tối thượng đối với toàn bộ đệ tử và chấp sự. Chưởng quản Tàng Kinh Các tầng 4 (Công pháp Thiên Giai), có quyền phủ quyết quyết định của Chấp Sự, chỉ chịu trách nhiệm trước Chưởng Môn và Thủ Tọa.',
    keyResponsibilities: [
      'Chấp Pháp Trưởng Lão: Phán xét tử hình, phế tu vi hoặc đày ải môn đồ phạm trọng tội',
      'Công Pháp Trưởng Lão: Trông coi Tàng Kinh Các, truyền thụ bí kíp Thiên Giai và chỉ điểm tu vi cho Chân Truyền',
      'Ngoại Vụ Trưởng Lão: Đại diện tông môn thiết lập bang giao, ký kết hiệp ước hòa bình hoặc tuyên chiến',
      'Tham gia Trưởng Lão Hội Nghị để biểu quyết các vận mệnh sinh tử của tông môn'
    ],
    resourceMonthlyStipend: '100 Trung Phẩm Linh Thạch (hoặc 2 Cực Phẩm), Đan dược Nguyên Anh cực phẩm, quyền sử dụng Thần Binh tông môn khi lâm trận',
    stipendDetails: {
      spiritStones: '3 khối Cực Phẩm Linh Thạch + 200 Trung Phẩm',
      pills: '3 viên Nguyên Anh Bổ Phách Đan, 1 viên Cửu Chuyển Hồi Hồn Đan',
      meritPoints: '10,000 điểm cống hiến đại trưởng lão',
      specialPrivileges: 'Tự do mượn đọc toàn bộ điển tịch dưới cấp Thần Thoại trong Tàng Kinh Các'
    },
    residenceArea: 'Trưởng Lão Điện nguy nga ngự trị trên các đỉnh núi hiểm trở lơ lửng, có Hộ Sơn Tiểu Trận cấp 4 bảo vệ, thị đồng và đệ tử bái kiến phải quỳ từ chân dốc.',
    advancementCriteria: 'Đột phá Hóa Thần Kỳ, tạo lập đại công lao cứu nguy tông môn khỏi họa diệt vong, được các Phong suy tôn làm Phong Chủ / Thủ Tọa Độc Lập.',
    clothingAndToken: 'Hồng y đại bào hoặc Hắc huyết chấp pháp bào thêu sấm sét lôi đình; Lệnh bài Vạn Niên Huyền Thiết khắc Bát Quái Cực Đạo Ấn.',
    tokenAndRobes: {
      tokenMaterial: 'Vạn Niên Trấn Hồn Thần Thiết (Phát ra uy áp Nguyên Anh nhiếp hồn)',
      robeColor: 'Xích Huyết Trực Đạo hoặc Mặc Hắc Lôi Điện Bào',
      insignia: 'Lôi Đình Phán Quan Kiếm và Thần Thú Trảm Gian Triện'
    },
    commonInternalCrimes: 'Bao che cho đồ đệ thân tín giết người đoạt bảo, kết bè phái ép Chưởng Môn thoái vị, âm thầm luyện chế ma huyết đan bằng máu đệ tử.',
    disciplinePenalty: 'Bị tước bỏ đạo hiệu, giam giữ tại Trấn Ma Đỉnh vạn trượng dưới đáy vực sâu hoặc bị hủy diệt Nguyên Thần nếu phản nghịch.',
    promotionCeremonyNarrative: 'Thắp một ngọn Hồn Đăng bất diệt tại Đền Thờ Tổ Sư, nhận Chuông Hộ Mệnh Nguyên Anh và Lệnh Bài Trưởng Lão trước Trưởng Lão Viện.'
  },

  // 8. Thủ Tọa Các Phong / Đường Chủ
  {
    id: 'pos_thu_toa_cac_phong',
    rankName: 'Thủ Tọa Các Phong / Đường Chủ (Hóa Thần Cự Phách)',
    tier: 'Cấp 8 - Lãnh Chúa Độc Lập Của Phong',
    levelNumber: 8,
    requiredCultivationRealm: 'Hóa Thần Sơ Kỳ đến Hóa Thần Viên Mãn',
    scopeOfAuthority: 'Bá chủ tuyệt đối của một ngọn núi độc lập (Kiếm Phong, Đan Phong, Phù Phong, Lôi Phong...). Nắm toàn quyền sinh sát, tài chính, truyền thừa và tuyển chọn đệ tử của cả một Phong.',
    keyResponsibilities: [
      'Trấn giữ phong ấn của Phong Sơn và điều phối linh mạch cung ứng cho toàn môn phái',
      'Đích thân dạy dỗ hạt giống Thánh Tử và các Chân Truyền Đệ Tử ưu tú nhất',
      'Đóng vai trò chiến lược gia tối cao khi đối đầu với Ma Tông hoặc Dị Tộc xâm lược',
      'Nắm giữ một mắt trận cốt lõi trong Hộ Sơn Tru Ma Đại Trận'
    ],
    resourceMonthlyStipend: '10 Cực Phẩm Linh Thạch, Vạn Niên Linh Dược, 1 giọt Chân Long / Phượng Hoàng Huyết, tài nguyên độc quyền do ngọn Phong khai thác',
    stipendDetails: {
      spiritStones: '10 khối Cực Phẩm Linh Thạch',
      pills: '1 viên Hóa Thần Tụ Phách Đan, 2 bình Vạn Niên Thạch Nhũ',
      meritPoints: 'Không giới hạn hạn ngạch Phong Sơn',
      specialPrivileges: 'Được quyền bổ nhiệm toàn bộ Chấp Sự và ban phong chức vị nội môn trong Phong của mình'
    },
    residenceArea: 'Cung điện Thái Cổ tọa lạc trên đỉnh Phong Sơn cao vạn trượng xé rách tầng mây, mây ngũ sắc lượn lờ quanh năm, thần thú thủ hộ canh cửa.',
    advancementCriteria: 'Đột phá Luyện Hư Kỳ, lĩnh ngộ pháp tắc không gian, được Chưởng Môn và Thái Thượng Hội Nghị đề cử làm Phó Chưởng Môn hoặc Đại Trưởng Lão.',
    clothingAndToken: 'Ngũ Hành Tiên Y đan dệt từ lông thần thú và thiên tằm; Lệnh bài Phong Chủ đúc bằng Thái Cổ Huyền Ngọc phát ra linh quang chói lọi.',
    tokenAndRobes: {
      tokenMaterial: 'Thái Cổ Ngũ Sắc Thần Ngọc (Chứa một đạo thần niệm phòng hộ cấp Hóa Thần)',
      robeColor: 'Theo thuộc tính Phong: Kim Sắc (Kiếm Phong), Xích Hồng (Đan Phong), Thanh Lam (Trận Phong)',
      insignia: 'Biểu tượng Ngọn Sơn Trấn Thế và Thần Thông Phong Môn'
    },
    commonInternalCrimes: 'Tự ý phát động chiến tranh cục bộ với tông môn khác, âm mưu tách ngọn Phong ra thành lập tông môn độc lập, biển thủ linh mạch chung.',
    disciplinePenalty: 'Bị phong ấn tu vi 500 năm tại Hắc Uyên Cấm Địa, chuyển giao quyền thủ tọa cho sư đệ.',
    promotionCeremonyNarrative: 'Thần quang chiếu rọi chín vạn dặm, toàn thể tu sĩ trong Phong quỳ rạp bái kiến tân Phong Chủ, chuông đồng ngân vang liên tục 81 tiếng.'
  },

  // 9. Phó Chưởng Môn / Đại Trưởng Lão
  {
    id: 'pos_pho_chuong_mon',
    rankName: 'Phó Chưởng Môn / Đại Trưởng Lão (Trấn Phái Cường Giả)',
    tier: 'Cấp 9 - Quyền Lực Đỉnh Cao',
    levelNumber: 9,
    requiredCultivationRealm: 'Luyện Hư Sơ Kỳ đến Luyện Hư Đỉnh Phong',
    scopeOfAuthority: 'Nhân vật quyền lực thứ hai trong tông môn. Nắm giữ một nửa mảnh Hộ Sơn Đại Trận Phù và phân nửa Binh Phù điều động đạo binh môn phái. Quyền nhiếp chính khi Chưởng Môn bế quan hoặc tử trận.',
    keyResponsibilities: [
      'Điều hành toàn bộ sự vụ tông môn khi Chưởng Môn bế quan đột phá',
      'Trực tiếp quản lý và huấn luyện Tông Môn Đạo Binh Cấm Vệ (Đội quân tu sĩ tinh nhuệ nhất)',
      'Thương thảo và ký kết liên minh sinh tử với các Bất Hủ Thánh Địa khác',
      'Đảm bảo sự cân bằng quyền lực giữa các Phong và xử lý khủng hoảng nội bộ lớn'
    ],
    resourceMonthlyStipend: '30 Cực Phẩm Linh Thạch, Khí Hóa Đan Dược, tài nguyên bảo khố cấp Thiên Giai, được sử dụng Tiên Khí Tàn Phiến để ngộ đạo',
    stipendDetails: {
      spiritStones: '30 khối Cực Phẩm Linh Thạch',
      pills: '3 viên Luyện Hư Hoàn Linh Đan, 1 viên Tị Kiếp Thần Đan',
      meritPoints: 'Toàn quyền điều động tài chính tông môn',
      specialPrivileges: 'Được quyền phát lệnh triệu tập Trưởng Lão Đoàn khẩn cấp và kích hoạt Hộ Sơn Trận cấp độ 2'
    },
    residenceArea: 'Thần Đô Tiên Đảo lơ lửng trên không trung nhìn xuống toàn bộ Thập Bát Phong, có Thông Thiên Tinh Trận nối liền với Tinh Không.',
    advancementCriteria: 'Đột phá Hợp Thể Kỳ, có uy vọng áp đảo toàn môn phái và được Thái Thượng Lão Tổ chỉ định truyền thụ Chưởng Môn Ngọc Tỷ.',
    clothingAndToken: 'Cửu Phượng Hỗn Nguyên Đạo Bào hoặc Càn Khôn Tiên Cẩm; Nắm giữ Bán Bộ Hộ Tông Trận Phù và Binh Phù bằng Long Cốt.',
    tokenAndRobes: {
      tokenMaterial: 'Thái Cổ Long Cốt mạ Vàng Ròng và Ngọc Phù Hộ Trận',
      robeColor: 'Tử Cực Hỗn Độn Sắc (Tím thẫm pha đen vũ trụ)',
      insignia: 'Biểu tượng Nhật Nguyệt Đồng Huy và Càn Khôn Trấn Phù'
    },
    commonInternalCrimes: 'Mưu sát Chưởng Môn để đoạt vị, ngầm bán nửa mảnh trận đồ Hộ Sơn Trận cho ngoại địch, thao túng đạo binh tạo phản.',
    disciplinePenalty: 'Bị Thái Thượng Lão Tổ đích thân xuất thủ trấn sát, hồn phi phách tán diệt trừ vĩnh viễn khỏi lục đạo luân hồi.',
    promotionCeremonyNarrative: 'Nhận Bán Bộ Trận Phù trước hàng vạn đệ tử và trưởng lão, tuyên thệ bảo vệ sự trường tồn của đạo thống cho đến giọt máu cuối cùng.'
  },

  // 10. Chưởng Môn / Tông Chủ
  {
    id: 'pos_chuong_mon',
    rankName: 'Chưởng Môn / Tông Chủ (Nhất Môn Chi Chủ)',
    tier: 'Cấp 10 - Lãnh Tụ Tuyệt Đối',
    levelNumber: 10,
    requiredCultivationRealm: 'Hợp Thể Sơ Kỳ đến Hợp Thể Viên Mãn',
    scopeOfAuthority: 'Chưởng quản toàn bộ vận mệnh, sinh tử và khí vận của tông môn. Nắm giữ Chưởng Môn Ngọc Tỷ, Trấn Tông Tiên Khí và toàn quyền kích hoạt Hộ Sơn Đại Trận ở trạng thái Cực Hạn Tru Ma.',
    keyResponsibilities: [
      'Gánh vác Khí Vận Kim Long của tông môn, định đoạt hướng đi chiến lược của toàn phái',
      'Tuyên chiến hoặc ký hòa ước sinh tử với các siêu cấp thế lực và ma triều lục giới',
      'Đích thân chủ trì Lễ Tế Thiên Bái Tổ và Đại Điển Tuyển Chọn Thánh Tử',
      'Cầu viện Thái Thượng Lão Tổ xuất thế khi gặp nguy cơ diệt môn tuyệt diệt'
    ],
    resourceMonthlyStipend: 'Toàn quyền sử dụng quốc khố tông môn, Khí Vận Chi Lực gia trì tu vi gấp 10 lần, vô số Tiên Tinh và Cực Phẩm Thần Đan',
    stipendDetails: {
      spiritStones: '100 khối Cực Phẩm Linh Thạch / Tiên Tinh Thượng Cổ',
      pills: 'Đan dược Hợp Thể và Độ Kiếp không giới hạn hạn mức',
      meritPoints: 'Chủ nhân tối cao của hệ thống cống hiến',
      specialPrivileges: 'Quyền kích hoạt Vạn Kiếm Quy Tông / Trận Pháp Tự Bạo và kết nối Thần Thức với Thái Thượng Lão Tổ'
    },
    residenceArea: 'Thái Hư Vô Cực Điện nguy nga nhất trên đỉnh Thiên Trụ Phong, hội tụ toàn bộ long mạch của cửu vạn dặm sơn hà.',
    advancementCriteria: 'Đột phá Đại Thừa / Độ Kiếp Kỳ, nhường ngôi Chưởng Môn cho Phó Chưởng Môn hoặc Thánh Tử, lui về Cấm Địa bế quan nhập tịch Thái Thượng Trưởng Lão.',
    clothingAndToken: 'Đế Vương Tiên Bào thêu Cửu Trảo Kim Long và Bát Hoang Tinh Đồ; Nắm giữ Thái Hư Tông Chủ Ngọc Tỷ và Trấn Tông Kiếm.',
    tokenAndRobes: {
      tokenMaterial: 'Vạn Cổ Hỗn Độn Thần Ngọc khắc Tông Chủ Ấn Triện',
      robeColor: 'Cực Dương Kim Sắc hoàng kim rực rỡ như vầng thái dương',
      insignia: 'Cửu Trảo Kim Long quấn quanh Thái Cổ Khai Thiên Đỉnh'
    },
    commonInternalCrimes: 'Đưa môn phái vào cảnh diệt vong vì dục vọng cá nhân, làm tổn hại Khí Vận Kim Long, phản bội Đạo Thống Thượng Cổ.',
    disciplinePenalty: 'Bị toàn thể Trưởng Lão và Thái Thượng Hội Phế truất ngôi vị, phế bỏ tu vi hoặc trục xuất khỏi tông tịch.',
    promotionCeremonyNarrative: 'Đại điển Đăng Cơ Chưởng Môn kinh động toàn càn khôn, Khí Vận Kim Long gầm thét trên tầng mây, vạn quốc tiên triều và các thánh địa gửi lễ vật chúc mừng dài ngàn dặm.'
  },

  // 11. Thái Thượng Lão Tổ
  {
    id: 'pos_thai_thuong_lao_to',
    rankName: 'Thái Thượng Lão Tổ (Trấn Giới Cổ Thần / Đạo Tổ Đình)',
    tier: 'Cấp 11 - Bất Hủ Thần Thoại',
    levelNumber: 11,
    requiredCultivationRealm: 'Đại Thừa Kỳ / Độ Kiếp Kỳ / Bán Bộ Chân Tiên',
    scopeOfAuthority: 'Đấng tối cao bảo hộ môn phái. Không can dự vào sự vụ hành chính thường nhật nhưng lời nói là Thiên Chỉ tối thượng. Chỉ xuất quan khi tông môn đối mặt với đại nạn diệt môn hoặc thời khắc Tiên Giới hàng lâm.',
    keyResponsibilities: [
      'Trấn áp cấm địa cấm kỵ và các phong ấn Thần Ma cổ xưa dưới đáy tông môn',
      'Bế quan tìm kiếm thời cơ độ Cửu Trọng Thiên Kiếp phi thăng Tiên Giới',
      'Đóng vai trò vũ khí hạt nhân răn đe toàn càn khôn, chỉ cần hơi thở tồn tại thì không kẻ nào dám phạm sơn môn',
      'Chỉ điểm đại đạo sinh tử cho Chưởng Môn trong thời khắc bế tắc sinh tử'
    ],
    resourceMonthlyStipend: 'Hấp thu trực tiếp Tinh Không Thần Tinh và Bản Nguyên Thiên Đạo, không cần tiêu hao tài nguyên phàm tục.',
    stipendDetails: {
      spiritStones: 'Tiên Tinh thuần khiết do Tiên Giới thẩm thấu xuống',
      pills: 'Tiên Phẩm Cổ Đan lưu lại từ kỷ nguyên trước',
      meritPoints: 'Đấng sáng tạo quy tắc môn phái',
      specialPrivileges: 'Có thể hủy diệt hoặc tái lập lại toàn bộ tông môn trong một ý niệm'
    },
    residenceArea: 'Thái Cổ Bí Cảnh / Tổ Đình Cấm Sơn phong ấn cách biệt với thế gian, trôi nổi giữa khe nứt hư không và dòng chảy thời gian.',
    advancementCriteria: 'Phi thăng Tiên Giới trở thành Chân Tiên Vĩnh Hằng hoặc Hóa Đạo dung nhập vào thiên địa càn khôn.',
    clothingAndToken: 'Đạo bào mộc mạc như phàm nhân lão ông nhưng toát ra Đạo Vận vô tận; Trong tay chỉ cầm một cành liễu hoặc cây phất trần cổ.',
    tokenAndRobes: {
      tokenMaterial: 'Hỗn Độn Khai Thiên Thần Thạch thô mộc',
      robeColor: 'Bạch sắc phiêu dật hoặc Phàm bố cổ phong không tì vết',
      insignia: 'Không cần huy hiệu; dung mạo chính là biểu tượng đại diện cho Đạo'
    },
    commonInternalCrimes: 'Gần như không có; ngoại trừ trường hợp Đọa Ma đoạt xá hậu bối đệ tử để kéo dài thọ mệnh (tâm ma đoạt xá).',
    disciplinePenalty: 'Bị Thiên Đạo Lôi Kiếp tru diệt hoặc bị các Đạo Hữu Chân Tiên liên thủ phong ấn vĩnh viễn.',
    promotionCeremonyNarrative: 'Xuất quan một bước khiến vạn dặm linh hoa nở rộ, nhật nguyệt đình trệ, Chưởng Môn cùng mười vạn môn nhân quỳ mọp sát đất nghênh đón Cổ Thần xuất thế.'
  }
];
