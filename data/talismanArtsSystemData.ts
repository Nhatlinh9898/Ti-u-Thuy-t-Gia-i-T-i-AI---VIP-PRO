import {
  TalismanDrawingMethod,
  TalismanTechniqueRank,
  TalismanStanceTechnique,
  TalismanMethodItem
} from '../types';

// ================= 1. CÁC TRƯỜNG PHÁI & PHƯƠNG THỨC VẼ PHÙ LỤC =================
export const TALISMAN_DRAWING_METHODS: TalismanDrawingMethod[] = [
  {
    id: 'method_chi_hu_diem_phu',
    name: 'Chỉ Hư Điểm Phù (Hư Không Lạc Bút)',
    schoolName: 'Hư Không Phù Tông & Tiêu Dao Kiếm Phù Phái',
    speedRating: 'Cực Tốc (Niệm Khởi)',
    carrierMedium: 'Thiên Địa Hư Không (Không khí & Linh áp xung quanh)',
    essenceMechanism: 'Dùng đầu ngón tay dẫn xuất chân nguyên ngưng tụ thành kim sắc/tử sắc linh tơ, vạch thẳng vào hư không. Khí kình nén chặt kết cấu không gian tạm thời làm giấy, lấy linh lực làm mực, kết ấn trong 0.1 giây.',
    executionDynamics: 'Thân hình thoắt ẩn thoắt hiện, bước chân lướt theo Lăng Ba Độn Pháp. Tay áo phất nhẹ, ngón trỏ và ngón giữa khép lại như kiếm chỉ, vung vẽ liên tục giữa chiến trường, tức khắc phóng ra phù trận oanh tạc mục tiêu.',
    prosAndCons: {
      advantages: 'Thi triển cực nhanh trong nháy mắt, không cần chuẩn bị bàn thờ giấy mực, bất ngờ trở tay không kịp.',
      disadvantages: 'Thời gian duy trì phù chú ngắn (chỉ vài hơi thở), tiêu hao thần thức và chân nguyên gấp 3 lần bình thường.'
    },
    enlightenmentKey: 'Ngộ được "Chân Không Bất Không" — khoảng không gian giữa hai kẻ địch không hề rỗng tuếch mà chứa đầy nguyên khí vô tận.',
    famousPractitioners: 'Kiếm Phù Tôn Giả Lạc Cửu Trần, Vô Ảnh Phù Tiên Linh Huyên'
  },
  {
    id: 'method_dan_dien_uan_phu',
    name: 'Đan Điền Uẩn Phù (Bản Mệnh Phù Đạo)',
    schoolName: 'Thái Thượng Đan Điền Cực Đạo Môn',
    speedRating: 'Tức Khắc (Vô Thời Gian)',
    carrierMedium: 'Tử Phủ Đan Điền & Kim Đan/Nguyên Anh Bản Mệnh',
    essenceMechanism: 'Khắc sâu đạo văn trực tiếp vào Kim Đan hoặc bề mặt Nguyên Anh. Mỗi ngày dùng Chân Hỏa và Thần Thức tôi luyện nuôi dưỡng qua hàng chục năm. Khi đối địch, chỉ cần tâm niệm vừa động là Bản Mệnh Phù bộc phát với 100% linh hồn đồng bộ.',
    executionDynamics: 'Bất động như bàn thạch, song mục khép hờ. Trong đan điền, kim đan xoay tròn với tốc độ cực hạn, ánh sáng đạo văn chiếu rọi qua kinh mạch phóng ra ngoài cơ thể tạo thành hộ thể thần quang hoặc chấn sát đại phù.',
    prosAndCons: {
      advantages: 'Uy lực hủy thiên diệt địa, tâm ý tương thông, không thể bị kẻ địch ngắt quãng chiêu thức hay tước đoạt khí cụ.',
      disadvantages: 'Nếu phù lục bị tổn hại nặng nề trong giao tranh, bản thể sẽ bị phản phệ kinh mạch, linh hồn rạn nứt.'
    },
    enlightenmentKey: 'Ngộ được "Thân như vũ trụ, tâm như phù đảm" — lấy chính sinh mệnh của mình làm cội nguồn tối thượng của đạo phù.',
    famousPractitioners: 'Thái Huyền Tông Chủ Triệu Hư Vô, Cổ Thần Phù Tướng Diệp Mặc'
  },
  {
    id: 'method_huyet_tinh_khac_phu',
    name: 'Huyết Tinh Khắc Phù (Huyết Sát Triện Thuật)',
    schoolName: 'U Minh Huyết Hải Ma Tông & Thượng Cổ Man Hoang Vu Tộc',
    speedRating: 'Nhanh (Thực Chiến)',
    carrierMedium: 'Tinh Huyết Đầu Tim, Bạch Cốt Linh Thú, Hoặc Khắc Lên Da Thịt Thần Thể',
    essenceMechanism: 'Dùng tinh huyết chứa đựng linh hồn ấn ký của bản thân hoặc máu tim yêu thú viễn cổ làm mực. Dùng đầu ngón tay xé rách đầu quả tim hoặc cắn rách đầu lưỡi, lấy huyết khí dẫn động hung sát lệ khí của trời đất.',
    executionDynamics: 'Ánh mắt đỏ rực như ma thần, tiếng gầm gừ vang vọng chấn động huyết mạch. Ngón tay như lưỡi dao rạch máu vẽ phù lên lòng bàn tay hoặc tấm khiên xương, huyết quang rực cháy ngập trời.',
    prosAndCons: {
      advantages: 'Sát thương cực kỳ hung hãn, bạo kích gấp 5 lần thông thường, có thể phá giải hộ thể cương khí và phong ấn cổ xưa.',
      disadvantages: 'Tổn hao thọ nguyên và nguyên khí tinh huyết, nếu ý chí không vững sẽ bị ma niệm cắn trả đến điên loạn.'
    },
    enlightenmentKey: 'Ngộ được "Huyết giả khí chi mẫu" — nhận ra sinh tử sát phạt nằm trọn trong sự bùng nổ của một giọt chân huyết.',
    famousPractitioners: 'Huyết Dạ Ma Tôn Lãnh Vô Tình, Vu Ma Đại Trưởng Lão Cốt U'
  },
  {
    id: 'method_chu_sa_dan_nghi',
    name: 'Chu Sa Đàn Nghi Phù (Chính Thống Đạo Môn Tế Nghi)',
    schoolName: 'Chính Nhất Đạo Phù Tông & Mao Sơn Chân Truyền',
    speedRating: 'Chậm (Chuẩn Tế)',
    carrierMedium: 'Thiên Niên Hoàng Chỉ, Linh Lộc Bì, Chu Sa Linh Dịch, Ngọc Thạch Bài',
    essenceMechanism: 'Dựng Tam Đàn Cửu Trượng, trai giới ba ngày, thắp hương Thanh Đàn tịnh hóa uế khí. Cầu viện tinh tú chư thần, dùng bút lông Lôi Kích Mộc dẫn thiên cương chính khí kết tinh hoàn mỹ vào tờ bùa.',
    executionDynamics: 'Mặc đạo bào Bát Quái, chân đạp Đạp Cương Đẩu Bộ, tay trái kết Tam Thanh Ấn, tay phải múa bút như rồng cuộn. Thần thái trang nghiêm uy nghi, mỗi hơi thở điều hòa cùng nhịp đập thiên địa linh mạch.',
    prosAndCons: {
      advantages: 'Bùa có độ ổn định hoàn hảo 100%, bảo lưu uy lực hàng ngàn năm không suy suyển, khả năng phong ấn trấn áp quỷ ma vĩnh cửu.',
      disadvantages: 'Thời gian chuẩn bị cầu kỳ lâu dài, không thể ứng biến vẽ ngay giữa chiến trường hỗn chiến.'
    },
    enlightenmentKey: 'Ngộ được "Thiên Nhân Tương Cảm" — dẹp bỏ hoàn toàn cái tôi phàm tục để trở thành chiếc cầu nối thuần khiết cho ý chí Trời Đất.',
    famousPractitioners: 'Trương Thiên Sư, Huyền Chân Tử, Thái Ất Đạo Nhân'
  },
  {
    id: 'method_than_niem_vo_anh',
    name: 'Thần Niệm Vô Ảnh Phù (Vi Mô Khắc Không Phù)',
    schoolName: 'Vô Cực Linh Huyễn Cung & Thái Hư Ẩn Tông',
    speedRating: 'Cực Tốc (Niệm Khởi)',
    carrierMedium: 'Sóng Dao Động Thần Thức & Kẽ Nứt Vi Mô Không Gian',
    essenceMechanism: 'Tách thần thức thành hàng triệu sợi tơ siêu vi (Thần Niệm Vi Châm), âm thầm khắc các đạo triện vô hình vào không gian xung quanh đối thủ mà không hề tạo ra bất kỳ tiếng động hay luồng linh áp nào.',
    executionDynamics: 'Người thi triển đứng chắp tay sau lưng, ánh mắt thâm trầm như nước giếng cổ. Không hề nâng tay vung bút, chỉ có thần thức tầng tầng lớp lớp vô hình đan kết như mạng nhện bủa vây không gian 100 trượng.',
    prosAndCons: {
      advantages: 'Hoàn toàn vô hình vô thanh, đối thủ không thể phát giác cho đến khi ngòi nổ phát tác, công thủ toàn diện.',
      disadvantages: 'Đòi hỏi thần thức hùng hậu ngang tầm Nguyên Anh hoặc Hóa Thần, nếu bị thần thức đối phương áp chế sẽ lập tức tan biến.'
    },
    enlightenmentKey: 'Ngộ được "Đại Âm Hy Thanh, Đại Tượng Vô Hình" — những thứ uy lực nhất thế gian thường phẳng lặng và ẩn sâu vô tích.',
    famousPractitioners: 'Ảo Mộng Thiên Tôn Cơ Dao, Vô Trần Thượng Nhân'
  },
  {
    id: 'method_thien_loi_dan_but',
    name: 'Thiên Lôi Dẫn Bút Phù (Cương Lôi Phù Đạo)',
    schoolName: 'Cửu Thiên Thần Lôi Tông & Thần Tiêu Lôi Phù Môn',
    speedRating: 'Nhanh (Thực Chiến)',
    carrierMedium: 'Tử Chỉ Thần Lôi, Vảy Lôi Long, Cốt Bút Lôi Kích Mộc Vạn Năm',
    essenceMechanism: 'Dùng bút Lôi Kích Mộc chỉ thẳng lên bầu trời dẫn mây đen tụ hội, câu thông thiên kiếp cửu thiên thần lôi. Rót tia sét cuồng bạo làm mực vẽ, bắt giữ ý chí sấm sét giam cầm vào trung tâm phù đảm.',
    executionDynamics: 'Đứng trên đỉnh núi cao hoặc lôi vân cuồn cuộn, tóc tai bay múa loạn xạ trong gió bão. Một bước đạp vỡ đá núi, hét vang Lôi Quyết Chân Ngôn, thân thể phát ra điện quang tím biếc xẹt ngang ngọn bút.',
    prosAndCons: {
      advantages: 'Uy lực hủy diệt bạt sơn cửu thiên, khắc chế 100% các loại tà ma, cương thi, yêu khí và âm hồn u minh.',
      disadvantages: 'Cực kỳ nguy hiểm, nếu không khống chế được lôi đình sẽ bị sét đánh tan xác ngay tại trận (Lôi Phệ).'
    },
    enlightenmentKey: 'Ngộ được "Lôi Đình Giả, Thiên Địa Chi Xu Nữu" — sấm sét vừa là sự trừng phạt sát phạt, vừa là mầm mống khai sinh vạn vật.',
    famousPractitioners: 'Lôi Phạt Tôn Giả Mặc Thần Quân, Cửu Thiên Huyền Nữ Đạo Đồng'
  },
  {
    id: 'method_van_vat_tu_nhien',
    name: 'Vạn Vật Tự Nhiên Thần Phù (Hóa Cảnh Thần Thánh)',
    schoolName: 'Hỗn Độn Đạo Nguyên Cực Tông & Khởi Nguyên Thần Tộc',
    speedRating: 'Tức Khắc (Vô Thời Gian)',
    carrierMedium: 'Nhật Nguyệt Tinh Thần, Cây Cỏ Hoa Lá, Gió Mưa Bão Cát, Càn Khôn Vũ Trụ',
    essenceMechanism: 'Đạt tới cảnh giới Thần Thánh tối cao: Không còn giấy, mực, bút, thần đàn. Một chiếc lá rơi, một hạt cát bay, một giọt sương mai đều có thể biến thành một đạo Thần Phù phong ấn chư thiên.',
    executionDynamics: 'Chỉ cần một cái thở dài, một nụ cười, hay một bước chân nhẹ nhàng trên mặt nước. Cả trời đất đồng loạt rung động, mây gió tự động sắp xếp thành văn tự thần thánh chiếu rọi cửu giới.',
    prosAndCons: {
      advantages: 'Vô hạn vô cùng, hòa làm một với Đại Đạo, không bao giờ cạn kiệt linh lực, có thể tái tạo thế giới hoặc đảo ngược luân hồi.',
      disadvantages: 'Chỉ có cảnh giới Thần Cực Đại La Kim Tiên hoặc Thần Thánh mới có thể thi triển mà không bị Đạo Hóa (hòa tan vào vũ trụ).'
    },
    enlightenmentKey: 'Ngộ được "Đạo Pháp Tự Nhiên, Vạn Cổ Quy Nhất" — thân ta chính là phù, trời đất chính là bùa, vạn vật giai vi Đạo.',
    famousPractitioners: 'Thái Thượng Đạo Tổ, Hồng Mông Phù Tôn'
  }
];

// ================= 2. BỘ PHÁP, VẬN KHÍ & CHIÊU THỨC THI TRIỂN VẼ PHÙ =================
export const TALISMAN_STANCE_TECHNIQUES: TalismanStanceTechnique[] = [
  {
    id: 'stance_khoi_son_diem_nhan',
    name: 'Linh Điểm Khởi Sơn (Khai Bút Chiêu)',
    category: 'Khai Bút',
    rankLevel: 'Sơ Cấp',
    poeticTitle: 'Nhất Trọng Khởi Bút Sơn Hà Động, Linh Huyệt Khai Quang Nhận Càn Khôn',
    footworkMovement: 'Tọa Thiền Trụ Trụ Tọa hoặc Đinh Tự Bộ vững như bàn thạch, gót chân dán chặt vào mặt đất để tiếp nhận địa khí.',
    handSealAndGrip: 'Thủ ấn "Chính Phong Bút Trụ": Ba ngón cái, trỏ, giữa kẹp chặt quản bút thẳng đứng 90 độ, ngón áp út đỡ nhẹ.',
    brushTrajectory: 'Đầu bút giơ cao 3 tấc, bất ngờ bổ xuống như giọt nước rơi tự do, dừng lại cách mặt giấy đúng 1 sợi tóc trước khi điểm mạnh xuống.',
    meridianQiOperation: 'Khí từ Đan Điền dâng lên Đốc Mạch qua Mệnh Môn huyệt, dồn vào cánh tay phải, nén chặt tại Lao Cung huyệt rồi bộc phát qua đầu bút.',
    incantationSound: 'Hô âm "KHỞI!" trầm đục như chuông đồng ngàn năm vang đáy cốc.',
    tacticalCombatUsage: 'Mở cửa ngõ linh lực cho toàn bộ tấm bùa, kích hoạt linh giác bản thân kết nối với nguyên khí xung quanh.',
    visualAuraDescription: 'Đầu ngọn bút bốc lên một luồng khói trắng ngà tinh khiết, mặt đất dưới chân rung nhẹ, bụi đất văng ra thành vòng tròn đồng tâm.'
  },
  {
    id: 'stance_long_xa_bien_vu',
    name: 'Long Xà Biến Vũ (Họa Mạch Chiêu)',
    category: 'Họa Mạch',
    rankLevel: 'Trung Cấp',
    poeticTitle: 'Bút Tẩu Long Xà Đằng Vạn Lý, Cương Khí Hồi Toàn Độn Cửu Cung',
    footworkMovement: 'Đạp Cương Đẩu Bộ: Chân trái bước tới ô Khảm Thủy, chân phải xoay góc 45 độ giẫm vào ô Ly Hỏa theo hình số 8 vô tận.',
    handSealAndGrip: 'Thế cầm "Trắc Phong Hoành Tẩu": Bút nghiêng 60 độ, cổ tay linh hoạt xoay chuyển không một góc chết.',
    brushTrajectory: 'Đường nét uốn lượn liên miên bất tuyệt, khi thì sắc bén như kiếm chém, khi thì mềm mại như dải lụa bay trong gió bão.',
    meridianQiOperation: 'Chân nguyên chia thành hai luồng Âm Dương luân phiên chạy qua Thiếu Âm Tâm Kinh và Thiếu Dương Đởm Kinh, điều phối nhiệt độ và áp suất mực vẽ.',
    incantationSound: 'Mật niệm "Cấp Cấp Như Luật Lệnh, Tứ Tượng Hóa Thần Triện".',
    tacticalCombatUsage: 'Vẽ khung xương chính (Phù Khung) chứa đựng ngũ hành nguyên tố, ngăn chặn sát khí kẻ địch xâm nhập phá bùa.',
    visualAuraDescription: 'Nét mực chu sa rực sáng ánh lửa vàng kim, tiếng gió rít như tiếng rồng gầm rắn lượn quanh đầu bút.'
  },
  {
    id: 'stance_bac_dau_dinh_phach',
    name: 'Bắc Đẩu Định Phách (Điểm Nhãn Khóa Cương)',
    category: 'Điểm Nhãn',
    rankLevel: 'Trung Cấp',
    poeticTitle: 'Thất Tinh Khóa Trận Phong Tà Mị, Tử Vi Chính Tọa Phách Thần Quy',
    footworkMovement: 'Bắc Đẩu Thất Bộ: Lần lượt giẫm 7 bước chân dứt khoát trên đất cát theo đúng hình chòm sao Bắc Đẩu.',
    handSealAndGrip: 'Tay trái bắt "Tam Thanh Chỉ" chỉ lên trời, tay phải vung bút chấm thần tốc 7 điểm.',
    brushTrajectory: 'Bút chấm 7 nhịp liên tiếp trong 0.2 giây: Tham Lang, Cự Môn, Lộc Tồn, Văn Khúc, Liêm Trinh, Vũ Khúc, Phá Quân.',
    meridianQiOperation: 'Hút linh khí từ Bách Hội huyệt (đỉnh đầu) truyền thẳng xuống ngón tay trỏ, mỗi điểm ấn nén một giọt thần thức tinh hoa.',
    incantationSound: 'Quát lớn: "ĐẨU! PHÁCH! TRẦN! TỎA!".',
    tacticalCombatUsage: 'Khóa chặt nguồn năng lượng trong phù đảm không bị rò rỉ ra ngoài, đồng thời định vị linh hồn kẻ địch để bùa tự tìm mục tiêu.',
    visualAuraDescription: 'Bảy đốm sáng màu xanh lam rực rỡ lóe lên trên mặt bùa, nối lại với nhau bằng những sợi dây xích ánh sáng li ti.'
  },
  {
    id: 'stance_hu_khong_tu_loi',
    name: 'Hư Không Tụ Lôi (Quán Thần Chiêu)',
    category: 'Họa Mạch',
    rankLevel: 'Cao Cấp',
    poeticTitle: 'Ngọc Chỉ Điểm Phá Tầng Vân Ám, Cửu Thiên Tử Khí Hóa Thần Lôi',
    footworkMovement: 'Lăng Không Hư Độn: Nhảy vọt lên không trung 3 trượng, hai chân bắt chéo đạp lên hư không linh áp.',
    handSealAndGrip: 'Kiếm Chỉ Hư Không: Hai ngón tay bốc lên tử lôi hồ quang, không cần quản bút vật lý.',
    brushTrajectory: 'Vạch một đường rạch hình tia chớp zíc-zắc xé toạc không gian phía trước mặt, để lại vệt nứt màu tím đen phát ra sấm nổ.',
    meridianQiOperation: 'Kích hoạt Lôi Trì trong lồng ngực, dẫn chân lôi chạy dọc kinh mạch cánh tay làm da thịt ánh lên sắc tím.',
    incantationSound: 'Gầm vang âm sấm: "OÃNG - HUYNH - PHÁT - TRẢM!".',
    tacticalCombatUsage: 'Rót uy lực sấm sét hủy diệt vào bùa chú, tăng khả năng công phá giáp trụ và khắc chế tuyệt đối quỷ ma.',
    visualAuraDescription: 'Sấm sét tím đen từ tầng mây giáng xuống nối liền với ngón tay người vẽ, tiếng sấm nổ đinh tai nhức óc.'
  },
  {
    id: 'stance_bat_hoang_diep_trien',
    name: 'Bát Hoang Điệp Triện (Bộc Phù Chiêu)',
    category: 'Bộc Phù',
    rankLevel: 'Đỉnh Giai',
    poeticTitle: 'Tụ Lý Càn Khôn Vạn Phù Lạc, Bát Phương Hỏa Trận Diệt Cuồng Ma',
    footworkMovement: 'Cửu Cung Toàn Phong Bộ: Thân pháp xoay tròn 360 độ cực nhanh tạo thành bức tường lốc xoáy quanh bản thân.',
    handSealAndGrip: 'Song Thủ Tán Hoa Ấn: Mười đầu ngón tay búng liên hoàn như mưa hoa đào rơi mùa xuân.',
    brushTrajectory: 'Phất tay áo tung ra 360 tấm phù lục bay vòng quanh cơ thể theo quỹ đạo Bát Quái trận đồ, liên kết với nhau bằng tia sáng.',
    meridianQiOperation: 'Chân nguyên từ Đan Điền phát tán ra toàn bộ 108 khiếu huyệt trên thân thể, tạo thành một mạng lưới cộng hưởng nguyên khí.',
    incantationSound: 'Niệm thần chú tốc độ cao: "Càn Khôn Hóa Trận, Vạn Triện Quy Nhất, NỔ!".',
    tacticalCombatUsage: 'Kích nổ liên hoàn tạo thành bão lửa hoặc sóng xung kích hủy diệt toàn bộ quân địch trong bán kính trăm trượng.',
    visualAuraDescription: 'Bầu trời rực sáng chói lòa như có hàng trăm mặt trời mọc cùng lúc, sóng nhiệt cuộn trào quét sạch chướng ngại.'
  },
  {
    id: 'stance_luan_hoi_nghich_chuyen',
    name: 'Luân Hồi Nghịch Chuyển Thần Bút (Tuyệt Sát & Hóa Thần)',
    category: 'Tuyệt Sát',
    rankLevel: 'Thần Thánh',
    poeticTitle: 'Nhất Bút Đoạn Tuyệt Nhân Quả Lộ, Thái Hư Nghịch Chuyển Định Càn Khôn',
    footworkMovement: 'Vô Hành Vô Tướng Bộ: Đứng yên giữa dòng sông thời gian, chân không chạm đất, thân không vướng trần.',
    handSealAndGrip: 'Đạo Cực Hỗn Độn Ấn: Bàn tay mở ra nắm trọn hư vô, đầu ngón tay nhỏ ra một giọt Hỗn Độn Chi Nguyên.',
    brushTrajectory: 'Vẽ ngược lại toàn bộ quỹ đạo của đối phương: Nét vẽ đi từ tương lai lùi về quá khứ, xóa bỏ đòn đánh của địch thủ.',
    meridianQiOperation: 'Vận hành vượt ra ngoài 12 chính kinh, hòa nhập trực tiếp vào dòng chảy Thời Gian Pháp Tắc và Nhân Quả Luật.',
    incantationSound: 'Một lời thì thầm vô thanh: "Tịch... Diệt... Sinh... Khởi...".',
    tacticalCombatUsage: 'Nghịch chuyển sát chiêu của đối phương biến thành linh khí tự chữa lành, hoặc xóa bỏ sự tồn tại của kẻ địch khỏi thực tại.',
    visualAuraDescription: 'Không gian xung quanh biến thành màu đen trắng tĩnh lặng, thời gian ngưng đọng, vạn vật đảo chiều quay ngược lại.'
  }
];

// ================= 3. HỆ THỐNG 6 CẤP BẬC PHÙ LỤC THUẬT PHÁP HOÀN CHỈNH =================
export const TALISMAN_TECHNIQUE_RANKS: TalismanTechniqueRank[] = [
  {
    id: 'rank_so_cap_hoang_chi',
    tierNumber: 1,
    tierName: 'Sơ Cấp',
    masteryTitle: 'Hoàng Chỉ Phù Sư (Nhập Môn Tụ Khí)',
    cultivationRealmReq: 'Luyện Khí Kỳ (Tầng 1 - 3)',
    trainingAndTempering: 'Treo quả cân chì 5 cân ở cổ tay, vẽ 10,000 nét ngang dọc cơ bản trên cát mịn mỗi ngày sao cho độ dày không lệch 1 sợi tóc. Ngồi thiền định trước ngọn nến trong phòng kín 4 canh giờ để rèn luyện tâm không dao động trước gió lay.',
    enlightenmentEpiphany: 'Đốn ngộ "Linh Khí Nhập Bút": Khoảnh khắc nhận ra ngòi bút lông chồn không phải là vật chết mà là phần nối dài của kinh mạch, một sợi chân khí đầu tiên hòa quyện vào màu đỏ của chu sa.',
    meridianCapacity: 'Kinh mạch mỏng manh, chỉ có thể rót khí đứt đoạn ngắt quãng, mỗi ngày chỉ vẽ được 3-5 tấm bùa sơ cấp là kiệt sức.',
    stances: [TALISMAN_STANCE_TECHNIQUES[0]],
    sampleTalismans: [
      {
        orderNumber: 1,
        talismanName: 'Thanh Phong Tật Hành Phù',
        gradeLevel: 'Nhất Phẩm Hạ Giai (Hoàng Chỉ)',
        brushMovementScripture: 'Ba nét cong thuận chiều gió, một nét móc nhọn hướng về phía trước như cánh chim én lướt sóng.',
        cinnabarAndInkRecipe: 'Chu sa phàm tục hòa cùng mật rùa nước ngọt và nước suối đầu nguồn.',
        talismanPaperType: 'Giấy hoàng bì làm từ rơm nếp ngâm nước vôi trong 100 ngày.',
        incantationAndSealFormula: 'Thanh phong nhập thể, sải bước ngàn dặm, cấp cấp như luật lệnh!',
        qiInjectionMechanism: 'Rót 10% chân khí Luyện Khí Kỳ vào phù đảm hình gió xoáy.',
        activationTrigger: 'Dán lên hai bắp chân trước khi chạy trốn.',
        effectMagnitude: 'Tăng tốc độ di chuyển lên gấp đôi trong thời gian nửa canh giờ, thân nhẹ như chim én.',
        enlightenmentInsight: 'Độ lỏng của mực phải vừa đủ, quá đặc sẽ tắc linh khí, quá loãng sẽ tan phù văn.',
        backfireRisk: 'Nếu rách bùa khi chạy sẽ bị vấp ngã trật khớp cổ chân.'
      },
      {
        orderNumber: 2,
        talismanName: 'Kim Cương Hộ Giáp Phù',
        gradeLevel: 'Nhất Phẩm Trung Giai (Hoàng Chỉ)',
        brushMovementScripture: 'Khung vuông tứ chính biểu thị Đất, ở giữa vẽ ký tự "Kim" với ba nét dập mạnh như búa tạ giáng xuống đe sắt.',
        cinnabarAndInkRecipe: 'Bột đá thạch anh nghiền mịn hòa với chu sa và máu gà trống thiến nuôi ba năm.',
        talismanPaperType: 'Giấy vỏ cây sồi ngàn năm quét một lớp mỡ gấu bảo quản.',
        incantationAndSealFormula: 'Thiên địa huyền tông, vạn khí bản căn, kim quang tốc hiện, phúc hộ ngô thân!',
        qiInjectionMechanism: 'Dồn khí thổ hệ từ đan điền qua lòng bàn tay ấn mạnh vào bốn góc giấy bùa.',
        activationTrigger: 'Vỗ mạnh tấm bùa vào ngực áo.',
        effectMagnitude: 'Ngưng tụ một lớp màng ánh sáng vàng nhạt bao quanh cơ thể, ngăn chặn đao kiếm phàm trần và tên bắn trong 15 phút.',
        enlightenmentInsight: 'Tâm ý phải kiên định như tảng đá thì lớp màng phòng ngự mới không bị thủng.',
        backfireRisk: 'Nếu chân khí không thuần, lớp giáp sẽ vỡ vụn ngay khi chịu một đòn chém nặng.'
      }
    ],
    backfireRisk: 'Mực nổ tóe tung làm cháy xém lông mày và ngón tay nếu rót khí quá vội vàng.'
  },
  {
    id: 'rank_trung_cap_huyen_mac',
    tierNumber: 2,
    tierName: 'Trung Cấp',
    masteryTitle: 'Linh Mặc Phù Sư (Ngũ Hành Hóa Triện)',
    cultivationRealmReq: 'Luyện Khí Tầng 7 - Trúc Cơ Kỳ',
    trainingAndTempering: 'Luyện bước chân "Đạp Cương Đẩu Bộ" trên 49 cọc gỗ hoa mai cắm trên vách đá cheo leo. Tập vẽ phù trong lúc đang chạy nước rút hoặc né tránh cung tên của đồng môn bắn tới.',
    enlightenmentEpiphany: 'Đốn ngộ "Ngũ Hành Sinh Khắc": Hiểu được cách mượn Kim sinh Thủy, Thủy dưỡng Mộc ngay trên đầu ngọn bút, làm cho sức mạnh của bùa tự nhân bản lên gấp bội mà không tốn nhiều chân nguyên của bản thân.',
    meridianCapacity: 'Kinh mạch đã được đả thông 8 mạch kỳ kinh, chân nguyên lưu chuyển như suối chảy, có thể duy trì vẽ liên tục 20-30 đạo phù.',
    stances: [TALISMAN_STANCE_TECHNIQUES[1], TALISMAN_STANCE_TECHNIQUES[2]],
    sampleTalismans: [
      {
        orderNumber: 3,
        talismanName: 'Xích Viêm Liệt Hỏa Phù',
        gradeLevel: 'Nhị Phẩm Thượng Giai (Linh Phù)',
        brushMovementScripture: 'Khởi bút bằng ba hình ngọn lửa tam muội xoắn ốc, kết thúc bằng một nét quét ngang như biển lửa quét qua đồng cỏ khô.',
        cinnabarAndInkRecipe: 'Hỏa diễm thạch nghiền vụn hòa cùng máu Xích Hỏa Hạt nhị giai và linh tuyền sôi sục dưới núi lửa.',
        talismanPaperType: 'Da bụng của Hỏa Mãng nhị giai phơi khô dưới nắng gắt trưa hè.',
        incantationAndSealFormula: 'Nam Phương Bính Đinh Hỏa, vạn trượng liệt diễm phần tà ma, phần!',
        qiInjectionMechanism: 'Dẫn xuất chân hỏa trong đan điền dung hợp vào đường vân bùa chú.',
        activationTrigger: 'Kẹp giữa hai ngón tay búng mạnh về phía quân địch.',
        effectMagnitude: 'Bắn ra một quả cầu lửa đường kính một trượng phát nổ thiêu rụi mục tiêu trong phạm vi mười trượng.',
        enlightenmentInsight: 'Cần duy trì ngọn lửa nội tâm hừng hực nhưng lý trí phải lạnh như băng tuyết.',
        backfireRisk: 'Chân hỏa bốc ngược thiêu rụi kinh mạch cánh tay nếu ngọn bút dừng lại nửa chừng.'
      },
      {
        orderNumber: 4,
        talismanName: 'Huyền Băng Đống Thổ Phù',
        gradeLevel: 'Nhị Phẩm Cực Giai (Linh Phù)',
        brushMovementScripture: 'Nét bút gãy khúc như tinh thể bông tuyết lục giác đan cài, hạ bút dứt khoát như băng nứt.',
        cinnabarAndInkRecipe: 'Băng tủy vạn năm hòa cùng ngân chu sa và nước mắt Tuyết Yêu nhị giai.',
        talismanPaperType: 'Vỏ cây Băng Sam sinh trưởng ở vùng cực bắc lạnh giá.',
        incantationAndSealFormula: 'Bắc Phương Nhâm Quý Thủy, ngưng hàn kết băng, phong tỏa vạn dặm!',
        qiInjectionMechanism: 'Dồn hàn khí âm nhu vào phù nhãn để tạo lõi nhiệt độ âm tuyệt đối.',
        activationTrigger: 'Ném xuống mặt đất dưới chân đối thủ.',
        effectMagnitude: 'Mặt đất trong phạm vi hai mươi trượng lập tức đóng băng dày một thước, làm tê liệt bước chân kẻ thù trong 10 hơi thở.',
        enlightenmentInsight: 'Hàn khí không phải là triệt tiêu sinh mệnh, mà là sự ngưng đọng tạm thời của thời gian và không gian.',
        backfireRisk: 'Hàn độc xâm nhập ngón tay làm hoại tử nếu không kịp thời vận chuyển dương khí giải trừ.'
      }
    ],
    backfireRisk: 'Bùa nổ ngược làm tê liệt kinh mạch cánh tay trong ba ngày nếu ngũ hành bị xung khắc.'
  },
  {
    id: 'rank_cao_cap_tu_trien',
    tierNumber: 3,
    tierName: 'Cao Cấp',
    masteryTitle: 'Tử Triện Phù Vương (Lôi Đình Quán Thần)',
    cultivationRealmReq: 'Trúc Cơ Đại Viên Mãn - Kim Đan Kỳ',
    trainingAndTempering: 'Ngồi thiền trên đỉnh núi cao giữa giông bão sấm sét, dùng ngực trần đón nhận lôi điện để rèn luyện ý chí. Dùng ngọn lửa Tam Muội Chân Hỏa tôi luyện bút Lôi Kích Mộc ngàn năm, phân tách thần thức thành hai luồng độc lập.',
    enlightenmentEpiphany: 'Đốn ngộ "Thiên Lôi Nhập Hồn": Nhận ra sấm sét là nhịp tim của vũ trụ. Người vẽ phù không tạo ra sấm sét mà chỉ mượn thiên uy làm sứ giả giáng đòn trừng phạt.',
    meridianCapacity: 'Kinh mạch đã được tôi luyện dẻo dai như gân rồng, chịu được dòng điện cao thế và áp lực chân hỏa cuồng bạo.',
    stances: [TALISMAN_STANCE_TECHNIQUES[3]],
    sampleTalismans: [
      {
        orderNumber: 5,
        talismanName: 'Cửu Thiên Thần Lôi Tru Ma Phù',
        gradeLevel: 'Tam Phẩm Thượng Giai (Tử Phù)',
        brushMovementScripture: 'Khởi bút như rồng bay phượng múa, hạ bút như sét đánh ngang trời, ba nét ngang biểu thị Tam Thanh, một nét sổ thẳng đâm xuyên Cửu U.',
        cinnabarAndInkRecipe: 'Chu sa ngàn năm hòa với máu tim Hắc Lôi Báo tam giai và ba giọt linh dịch Lôi Trì.',
        talismanPaperType: 'Hoàng bì giấy da linh lộc tam giai ngâm rượu linh tuyền phơi dưới trăng rằm.',
        incantationAndSealFormula: 'Thái Thượng Lão Quân cấp cấp như luật lệnh, lôi đình giáng thế, sát phạt vô xá!',
        qiInjectionMechanism: 'Dồn 70% chân nguyên qua đầu bút lông rùa, rót tia lôi điện vào mắt phù (Phù Đảm).',
        activationTrigger: 'Kẹp giữa hai ngón tay trỏ và giữa, ném ra phía trước và hô to chữ "Trảm".',
        effectMagnitude: 'Triệu hoán chín tia sấm sét màu tím từ tầng mây giáng xuống thiêu rụi khu vực phạm vi ba mươi trượng.',
        enlightenmentInsight: 'Nét bút không được ngắt quãng; bút dừng là thần tán, bùa sẽ biến thành giấy vụn.',
        backfireRisk: 'Nếu phù đảm không vững, sấm sét sẽ nổ tung ngay trên tay người vẽ.'
      },
      {
        orderNumber: 6,
        talismanName: 'Thái Hư Na Di Phù (Hư Không Độn Phù)',
        gradeLevel: 'Tứ Phẩm Cực Giai (Kim Sắc Đạo Phù)',
        brushMovementScripture: 'Vẽ chín vòng tròn đồng tâm đan xen nhau tạo thành mê cung không gian, lấy ký tự Càn Khôn làm tâm điểm.',
        cinnabarAndInkRecipe: 'Bột Không Gian Giới Thạch nghiền nhỏ hòa cùng ngân sa và máu Không Gian Chuột tứ giai.',
        talismanPaperType: 'Tằm tơ Hư Không Băng Tằm dệt thành tấm lụa mỏng màu bạc.',
        incantationAndSealFormula: 'Hư không vô ảnh, càn khôn dịch chuyển, vạn dặm trong gang tấc, cấp độ!',
        qiInjectionMechanism: 'Dẫn xuất pháp tắc không gian vào đường viền phù văn để tạo ra lực kéo không gian.',
        activationTrigger: 'Bóp nát tấm bùa trong lòng bàn tay khi gặp nguy hiểm chí mạng.',
        effectMagnitude: 'Xé toạc không gian tức thì đưa người sử dụng dịch chuyển ngẫu nhiên mười vạn dặm ngoài tầm truy sát.',
        enlightenmentInsight: 'Hiểu được bản chất tương đối của khoảng cách trong vũ trụ.',
        backfireRisk: 'Có xác suất 1% bị kẹt trong khe nứt không gian nếu đối phương có bảo vật khóa chặt hư không.'
      }
    ],
    backfireRisk: 'Thiên Lôi đánh trúng đỉnh đầu gây đứt đoạn 3 sợi kinh mạch chính nếu phân tâm khi khai bút.'
  },
  {
    id: 'rank_dinh_giai_kim_dao',
    tierNumber: 4,
    tierName: 'Đỉnh Giai',
    masteryTitle: 'Kim Đạo Tông Sư (Chỉ Hư Lạc Bút - Bản Mệnh Khắc Hồn)',
    cultivationRealmReq: 'Nguyên Anh Kỳ',
    trainingAndTempering: 'Luyện thần thức ngưng tụ thành hàng vạn sợi kim châm siêu vi. Lấy Tử Phủ Đan Điền làm lò ấp, dùng Chân Hỏa Nguyên Anh thiêu đốt khắc phù văn trực tiếp lên Bản Mệnh Pháp Bảo và Linh Hồn Ấn Ký. Vượt qua 3 đợt tâm ma khảo nghiệm.',
    enlightenmentEpiphany: 'Đốn ngộ "Vô Bút Chi Cảnh": "Bút bản vô hình, tâm chi sở hướng". Thấu hiểu rằng vật chất chỉ là vỏ bọc tạm bợ, linh hồn và ý chí mới là chiếc bút sắc bén nhất có thể khắc họa lên trật tự thế giới.',
    meridianCapacity: 'Nguyên Anh xuất khiếu, thần thức có thể bao trùm bán kính ngàn dặm, chân nguyên cuồn cuộn như biển lớn không bao giờ cạn kiệt.',
    stances: [TALISMAN_STANCE_TECHNIQUES[4]],
    sampleTalismans: [
      {
        orderNumber: 7,
        talismanName: 'Càn Khôn Trấn Nhạc Đại Đạo Phù',
        gradeLevel: 'Tứ Phẩm Đỉnh Giai (Kim Sắc Đạo Triện)',
        brushMovementScripture: 'Hư không vạch mười hai đạo kim quang tạo thành hình tháp chín tầng trấn áp cửu u long mạch.',
        cinnabarAndInkRecipe: 'Bột Vàng Ròng Tinh Khiết hòa với Máu Tim Kỳ Lân ngũ giai và Linh Tuyền Địa Mạch.',
        talismanPaperType: 'Tấm ngọc bích nguyên khối cắt mỏng như tờ giấy mạ vàng viền bạc.',
        incantationAndSealFormula: 'Càn khôn định vị, ngũ nhạc trấn thiên, yêu ma quỷ quái, vĩnh thế bất năng phiên!',
        qiInjectionMechanism: 'Rót toàn bộ thần thức Nguyên Anh vào trung tâm tháp trấn áp.',
        activationTrigger: 'Ném ngọc phù lên bầu trời hóa thành ngọn núi vàng khổng lồ giáng xuống.',
        effectMagnitude: 'Trấn áp hoàn toàn một đại yêu Nguyên Anh kỳ dưới chân núi vàng trong 100 năm.',
        enlightenmentInsight: 'Độ nặng của bùa không nằm ở ngọn núi mà nằm ở sự vững chãi của đạo tâm người thi triển.',
        backfireRisk: 'Nếu ý chí lung lay, ngọn núi sẽ sụp đổ đè nén ngược lại Nguyên Anh của bản thân.'
      }
    ],
    backfireRisk: 'Tâm ma phản phệ làm rạn nứt Nguyên Anh nếu cưỡng ép khắc phù vượt cấp.'
  },
  {
    id: 'rank_sieu_cap_hu_khong',
    tierNumber: 5,
    tierName: 'Siêu Cấp',
    masteryTitle: 'Hư Không Phù Thánh (Vạn Phù Quy Tông - Phong Thiên Tỏa Địa)',
    cultivationRealmReq: 'Hóa Thần Kỳ - Luyện Hư Kỳ',
    trainingAndTempering: 'Phiêu bạt trong các vết nứt không gian vũ trụ và bão tố hư không hàng trăm năm. Chịu đựng sức ép nghiền nát của thời không loạn lưu để rèn luyện thần hồn bất diệt. Luyện tập phân tách một ý niệm thành 10,000 đạo phù văn đồng thời xuất hiện.',
    enlightenmentEpiphany: 'Đốn ngộ "Vạn Vật Quy Hư, Hư Sinh Vạn Phù": Nhìn thấu vũ trụ này chính là một tấm bùa khổng lồ do Tạo Hóa vẽ nên. Mọi tinh cầu, dòng sông, ngọn núi đều là những nét bút của Thiên Đạo.',
    meridianCapacity: 'Hòa tan kinh mạch vào hư không, cơ thể trở thành một phần của quy tắc không gian, tùy ý mượn lực của cả một tiểu thế giới.',
    stances: [TALISMAN_STANCE_TECHNIQUES[4], TALISMAN_STANCE_TECHNIQUES[5]],
    sampleTalismans: [
      {
        orderNumber: 8,
        talismanName: 'Bát Hoang Liệt Không Phong Giới Phù',
        gradeLevel: 'Lục Phẩm Thánh Giai (Hư Không Thánh Triện)',
        brushMovementScripture: 'Không cần bàn thờ bút mực, mười ngón tay đan chéo vào nhau trong hư không kéo ra hàng triệu sợi tơ bạc phong tỏa không gian.',
        cinnabarAndInkRecipe: 'Không Gian Bản Nguyên Tinh Thạch hóa lỏng hòa cùng Thần Niệm Tinh Hoa.',
        talismanPaperType: 'Bức màn không gian của chính cõi giới đang đứng.',
        incantationAndSealFormula: 'Bát Hoang Cấm Đoán, Thời Không Đình Trệ, Vạn Đạo Phong Tuyệt!',
        qiInjectionMechanism: 'Dẫn xuất quy tắc không gian cô lập toàn bộ khu vực thành một chiếc lồng độc lập với vũ trụ.',
        activationTrigger: 'Nắm chặt bàn tay bóp nghẹt không gian.',
        effectMagnitude: 'Đóng băng hoàn toàn không gian và thời gian trong phạm vi vạn dặm, giam cầm vạn quân địch thủ.',
        enlightenmentInsight: 'Không gian không phải là khoảng cách, không gian là ý niệm.',
        backfireRisk: 'Có nguy cơ bị hư không bão tố cuốn trôi nếu không thu hồi phù kịp thời.'
      }
    ],
    backfireRisk: 'Bị hư không quy tắc phản phệ lưu đày vào kẽ nứt thời không vĩnh viễn.'
  },
  {
    id: 'rank_than_thanh_hon_don',
    tierNumber: 6,
    tierName: 'Thần Thánh',
    masteryTitle: 'Hỗn Độn Phù Thần (Đạo Cực Vô Thượng - Khai Thiên Bút)',
    cultivationRealmReq: 'Hợp Thể - Đại Thừa - Độ Kiếp / Tiên Nhân Thần Cực',
    trainingAndTempering: 'Tĩnh tọa qua các kỷ nguyên sinh diệt của vũ trụ. Chứng kiến sự hình thành của Thái Sơ, Thái Cực và sự lụi tàn của hàng vạn nền văn minh tu chân. Tôi luyện Hỗn Độn Chi Khí thành Thần Bút tối thượng.',
    enlightenmentEpiphany: 'Đốn ngộ "Hỗn Độn Nhất Điểm Khai Thiên Tịch Địa": Đạo sinh Nhất, Nhất sinh Nhị, Nhị sinh Tam, Tam sinh Vạn Vật. Một nét bút hạ xuống là vũ trụ sinh ra; một nét bút thu về là vạn vật tịch diệt trở về hư vô.',
    meridianCapacity: 'Vượt ra ngoài mọi giới hạn kinh mạch và thân xác phàm trần. Thân thể là vũ trụ, ý niệm là thiên đạo.',
    stances: [TALISMAN_STANCE_TECHNIQUES[5]],
    sampleTalismans: [
      {
        orderNumber: 9,
        talismanName: 'Khai Thiên Tích Địa Vô Tự Thần Phù',
        gradeLevel: 'Thất Phẩm Khởi Nguyên (Vô Thượng Thần Triện)',
        brushMovementScripture: 'Không dùng bút hữu hình, lấy ngón tay chấm vào hư không vẽ nên những đạo ngân nguyên thủy của vũ trụ.',
        cinnabarAndInkRecipe: 'Hỗn Độn Chi Tinh hòa cùng máu tim của chính người tu luyện.',
        talismanPaperType: 'Bầu trời và mặt đất chính là tờ giấy bùa.',
        incantationAndSealFormula: 'Đạo Pháp Tự Nhiên, Vạn Cổ Quy Nhất, Khai!',
        qiInjectionMechanism: 'Hòa tan toàn bộ ý chí và đạo tâm vào không gian xung quanh.',
        activationTrigger: 'Một cái phất tay nhẹ nhàng giải phóng phong ấn vũ trụ.',
        effectMagnitude: 'Tái tạo trật tự không gian, phong ấn toàn bộ một tiểu thế giới hoặc hồi sinh hàng triệu sinh linh.',
        enlightenmentInsight: 'Đỉnh cao của phù lục là không còn phù lục, mà vạn vật trời đất đều là một đạo bùa tự nhiên.',
        backfireRisk: 'Không có tác dụng phụ nếu tâm cảnh đã đạt tới Đại La Kim Tiên.'
      },
      {
        orderNumber: 10,
        talismanName: 'Nghịch Chuyển Nhân Quả Luân Hồi Ấn',
        gradeLevel: 'Bát Phẩm Cực Trí (Đạo Cực Thần Triện)',
        brushMovementScripture: 'Vẽ ngược lại dòng chảy của thời gian và nhân quả, biến cái đã chết thành sống, biến họa thành phúc.',
        cinnabarAndInkRecipe: 'Ánh sáng của Ngôi Sao Đầu Tiên hòa với Nước Mắt Của Thần Sáng Thế.',
        talismanPaperType: 'Cuộn Giấy Thời Không Của Đạo Tổ.',
        incantationAndSealFormula: 'Nhân quả bất đoạn, luân hồi tái sinh, quá khứ hiện tại vị lai quy nhất!',
        qiInjectionMechanism: 'Tiêu hao một lượng lớn công đức tích lũy qua ngàn kiếp.',
        activationTrigger: 'Một ý niệm xót thương cho chúng sinh lầm than.',
        effectMagnitude: 'Đảo ngược kết quả của một trận đại chiến thế kỷ, cứu sống toàn bộ tông môn đã diệt vong trong quá khứ.',
        enlightenmentInsight: 'Muốn nghịch chuyển nhân quả, trước hết phải hiểu rõ giá trị của sự chấp nhận định mệnh.',
        backfireRisk: 'Gánh chịu thiên lôi nhân quả của cả thiên hà nếu lạm dụng vì tư lợi cá nhân.'
      }
    ],
    backfireRisk: 'Gánh chịu Thiên Phạt Quy Tắc nếu làm đảo lộn dòng chảy sinh mệnh của cả một kỷ nguyên.'
  }
];
