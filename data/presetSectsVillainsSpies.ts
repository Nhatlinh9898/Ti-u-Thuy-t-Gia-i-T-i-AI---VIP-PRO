import { SectItem, VillainItem, SpyItem } from '../types';

export const PRESET_SECTS_ALL: SectItem[] = [
  // 1. Thái Hư Kiếm Tông (Chính Đạo - Bất Hủ Thánh Địa)
  {
    id: 'sect_thai_hu_kiem_tong',
    name: 'Thái Hư Kiếm Tông • Vạn Cổ Kiếm Đạo Thánh Địa',
    camp: 'Chính Đạo (Orthodox / Tiên Môn)',
    grade: 'Bất Hủ Thánh Địa & Đạo Thống Thái Cổ (Đại Thừa Tiên Khí / Trấn Giới Vĩnh Hằng)',
    headquarters: 'Thái Hư Thông Thiên Sơn Điệp (Chín vạn trượng lơ lửng giữa Tinh Hà)',
    founderAndLegacy: 'Khai sơn bởi Thái Hư Kiếm Tiên từ thời Hoang Cổ. Tông môn lưu giữ vách đá "Vạn Kiếm Quy Tông Bia" uẩn dưỡng 3.000 đạo Kiếm Ý chí cao.',
    leadership: {
      patriarch: 'Thái Hư Kiếm Thánh (Đại Thừa Hậu Kỳ • Bế quan tại Kiếm Trủng)',
      sectMaster: 'Lạc Vô Nhai (Độ Kiếp Sơ Kỳ • Nhất Kiếm Đoạn Giang Hà)',
      lawEnforcementElder: 'Thiết Kiếm Chân Nhân (Hợp Thể Đỉnh Phong • Chấp pháp như sấm sét)',
      discipleCount: 'Ngoại môn 30 vạn, Nội môn 8 ngàn, Chân truyền 108 kiếm tử'
    },
    heritageScriptures: [
      { name: 'Thái Hư Hỗn Độn Kiếm Kinh', grade: 'Tiên Phẩm Cổ Kinh', summary: 'Diễn hóa hư không quy nhất, xuất kiếm xuyên toa thứ nguyên chém vỡ nguyên thần đối phương.' },
      { name: 'Tru Ma Thất Tuyệt Trảm', grade: 'Thiên Giai Cực Phẩm', summary: 'Chuyên khắc chế ma khí và yêu niệm, sát khí ngập trời kinh động quỷ thần.' }
    ],
    sacredArtifacts: [
      { name: 'Thái Hư Tru Tiên Kiếm (Tiên Khí Trấn Giới)', rank: 'Thái Cổ Tiên Khí', power: 'Khí linh ngủ say vạn năm, một khi xuất thế trảm toái nhật nguyệt tinh thần.' },
      { name: 'Cửu Diệu Kiếm Hạp', rank: 'Cực Phẩm Cổ Bảo', power: 'Chứa 9 thanh phi kiếm thượng phẩm thiên giai, bố trí cửu khúc kiếm trận đồ sát yêu ma.' }
    ],
    guardianArray: {
      name: 'Vạn Kiếm Quy Tông Tru Ma Hộ Sơn Đại Trận',
      tier: 'Cực Phẩm Thánh Cấp Hộ Tông Trận',
      powerDescription: 'Huy động mười vạn kiếm khí từ địa mạch, hình thành kiếm cương hộ tráo bán kính vạn dặm, ngăn cản toàn bộ công kích dưới cấp Độ Kiếp.'
    },
    specialties: ['Luyện kiếm thai bổn mệnh', 'Kiếm ý thối thể', 'Vạn Kiếm Đồ lục sát phạt'],
    rulesAndPrecepts: ['Kiếm tâm thông minh, bất khuất bất nạo', 'Tuyệt đối bất dung ma tu yêu nghiệt', 'Đồng môn tương tàn phế bỏ toàn bộ tu vi trục xuất'],
    politicalStance: {
      allies: ['Cửu Thiên Huyền Nữ Cung', 'Đại Bi Bát Nhã Tự', 'Hạo Nhiên Chính Khí Thư Viện'],
      bitterEnemies: ['Thiên Ma Cung', 'Huyết Hải Ma Tông', 'Âm Sát Quỷ Vương Tông'],
      currentCrisis: 'Kiếm Trủng dị động, một cỗ thượng cổ kiếm ma phong ấn dưới đáy tông môn có dấu hiệu thức tỉnh rạn nứt.'
    },
    description: 'Ngọn cờ đầu của Tiên Minh Chính Đạo Trung Châu, thế lực kiếm tu số một đại lục với uy danh hiển hách chấn nhiếp lục giới.'
  },

  // 2. Cửu Thiên Huyền Nữ Cung (Chính Đạo - Nhị Phẩm/Nhất Phẩm)
  {
    id: 'sect_cuu_thien_huyen_nu',
    name: 'Cửu Thiên Huyền Nữ Cung • Tuyệt Hàn Thánh Cung',
    camp: 'Chính Đạo (Orthodox / Tiên Môn)',
    grade: 'Nhị Phẩm - Nhất Phẩm Tông Môn (Đỉnh Cấp Cự Phách / Luyện Hư & Hợp Thể)',
    headquarters: 'Băng Phách Ngọc Phong (Đỉnh Cực Bắc Tuyết Sơn quanh năm mây mù)',
    founderAndLegacy: 'Do Huyền Nữ Thượng Tiên truyền lại đạo thống, chỉ thu nạp nữ đệ tử có Băng Phách Linh Căn hoặc Cửu Âm Tuyệt Mạch.',
    leadership: {
      patriarch: 'Băng Phách Tiên Mẫu (Hợp Thể Hậu Kỳ)',
      sectMaster: 'Lãnh Nguyệt Tiên Tử (Hợp Thể Sơ Kỳ)',
      lawEnforcementElder: 'Tuyết Diễm Chân Nhân (Luyện Hư Đỉnh Phong)',
      discipleCount: 'Nội môn 3 ngàn tiên cô, Chân truyền 12 Thánh Nữ'
    },
    heritageScriptures: [
      { name: 'Cửu Thiên Huyền Băng Quyết', grade: 'Thiên Giai Thượng Phẩm', summary: 'Đóng băng kinh mạch kẻ thù trong nháy mắt, tu luyện thân thể Băng Tâm Ngọc Cốt.' },
      { name: 'Nguyệt Luân Vô Cực Tâm Pháp', grade: 'Thiên Giai Trung Phẩm', summary: 'Hấp thụ thái âm tinh hoa rèn luyện thần thức, tịnh hóa tâm ma.' }
    ],
    sacredArtifacts: [
      { name: 'Thái Âm Lưu Ly Kính', rank: 'Bán Tiên Khí', power: 'Chiếu rọi ngàn dặm đóng băng không gian, phá trừ mọi huyễn thuật giả tạo.' }
    ],
    guardianArray: {
      name: 'Thập Nhị Cửu Thiên Băng Phách Đại Trận',
      tier: 'Nhất Phẩm Tuyệt Hàn Đại Trận',
      powerDescription: 'Hàn khí ngưng tụ biến vạn dặm xung quanh thành tuyệt địa vĩnh hằng, sinh linh bước vào tức khắc đông cứng huyết mạch.'
    },
    specialties: ['Luyện chế Cực Hàn Đan', 'Băng Phách Thần Châm', 'Tịnh hóa tâm ma ô uế'],
    rulesAndPrecepts: ['Giữ gìn băng tâm ngọc khiết', 'Nghiêm cấm tư thông với ma đạo tà nhân', 'Bảo vệ phụ nữ và phàm nhân cô thế'],
    politicalStance: {
      allies: ['Thái Hư Kiếm Tông', 'Đan Đỉnh Tiên Các'],
      bitterEnemies: ['Hợp Hoan Môn', 'Âm Sát Quỷ Vương Tông'],
      currentCrisis: 'Băng tủy linh tuyền dưới đáy cung có dấu hiệu khô kiệt, hàn mạch suy yếu đe dọa cảnh giới toàn bộ trưởng lão.'
    },
    description: 'Thánh địa thanh tịnh nổi danh khắp thiên hạ, vừa lạnh lùng xa cách nhưng cũng là bức tường thành kiên cố chống lại ma triều phương Bắc.'
  },

  // 3. Đại Bi Bát Nhã Tự (Chính Đạo - Nhị Phẩm/Nhất Phẩm)
  {
    id: 'sect_dai_bi_bat_nha',
    name: 'Đại Bi Bát Nhã Tự • Vạn Phật Thiền Tông',
    camp: 'Chính Đạo (Orthodox / Tiên Môn)',
    grade: 'Nhị Phẩm - Nhất Phẩm Tông Môn (Đỉnh Cấp Cự Phách / Luyện Hư & Hợp Thể)',
    headquarters: 'Bồ Đề Tu Di Sơn (Tây Mạc Phật Quốc)',
    founderAndLegacy: 'Nơi khởi nguồn của Phật Môn Tây Mạc, lưu giữ Xá Lợi của Cổ Phật Thích Ca và 8 vạn 4 ngàn pho tượng La Hán hộ pháp.',
    leadership: {
      patriarch: 'Không Kiến Thần Tăng (Hợp Thể Viên Mãn)',
      sectMaster: 'Tuệ Năng Phương Trượng (Hợp Thể Sơ Kỳ)',
      lawEnforcementElder: 'Giác Viễn Giới Luật Viện Thủ Tọa (Luyện Hư Viên Mãn)',
      discipleCount: 'Năm vạn tăng lữ, tám trăm La Hán hộ tự'
    },
    heritageScriptures: [
      { name: 'Kim Cương Bất Hoại Thần Công', grade: 'Thiên Giai Cực Phẩm', summary: 'Nhục thân hóa thành lưu ly kim thân, đao thương bất nhập, vạn độc bất xâm.' },
      { name: 'Đại Bi Chú Phổ Độ Khúc', grade: 'Thiên Giai Trung Phẩm', summary: 'Phật âm thanh tịnh hóa giải sát niệm, độ hóa oán linh và tà ma ma niệm.' }
    ],
    sacredArtifacts: [
      { name: 'Hàng Ma Cửu Hoàn Thiền Trượng', rank: 'Thông Thiên Linh Bảo Đỉnh Cấp', power: 'Khắc chín đạo Phật gia chân ngôn, chấn động một tiếng xé toạc ma chướng vạn dặm.' }
    ],
    guardianArray: {
      name: 'Vạn Phật Triều Tông Kim Cương Đại Trận',
      tier: 'Nhất Phẩm Phật Quang Hộ Trận',
      powerDescription: 'Chiếu rọi phật quang vàng rực, ma vật bước vào da thịt rỉ khói thối rữa, hoàn toàn áp chế tà ma.'
    },
    specialties: ['Phật Môn Kim Thân', 'Độ hóa oán linh', 'Phù văn Giác Ngộ phong ma'],
    rulesAndPrecepts: ['Từ bi hỷ xả', 'Cấm sát sinh vô cớ', 'Trừ ma vệ đạo là bổn phận tối thượng'],
    politicalStance: {
      allies: ['Hạo Nhiên Chính Khí Thư Viện', 'Thái Hư Kiếm Tông'],
      bitterEnemies: ['Cửu U Luyện Thi Tông', 'Huyết Hải Ma Tông'],
      currentCrisis: 'Ma đầu phong ấn dưới Trấn Ma Tháp tầng 18 không ngừng chấn động phá hủy phù văn bảo hộ.'
    },
    description: 'Thánh địa phật môn uy nghiêm đệ nhất cõi tu chân, ngọn hải đăng tâm linh cứu rỗi trăm họ khi ma đạo hoành hành.'
  },

  // 4. Hạo Nhiên Chính Khí Thư Viện (Chính Đạo - Tứ Phẩm/Tam Phẩm)
  {
    id: 'sect_hao_nhien_thu_vien',
    name: 'Hạo Nhiên Chính Khí Thư Viện • Nho Môn Thánh Điện',
    camp: 'Chính Đạo (Orthodox / Tiên Môn)',
    grade: 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)',
    headquarters: 'Văn Khúc Nhai • Xuân Thu Các (Đại Nho Thần Châu)',
    founderAndLegacy: 'Nơi Nho gia tu luyện Hạo Nhiên Chính Khí bằng kinh thi và bút nghiên, lấy lời nói làm pháp tắc, lấy đạo đức làm kiếm sắc.',
    leadership: {
      patriarch: 'Văn Thánh Lão Phu Tử (Hóa Thần Viên Mãn)',
      sectMaster: 'Cố Tử Kính Viện Trưởng (Hóa Thần Trung Kỳ)',
      lawEnforcementElder: 'Mạnh Nghiêm Trực Tiên Sinh (Nguyên Anh Đỉnh Phong)',
      discipleCount: 'Ba vạn Nho sinh tiến sĩ, năm trăm Hàn Lâm viện sĩ'
    },
    heritageScriptures: [
      { name: 'Ngôn Xuất Pháp Tùy Thần Thông Điển', grade: 'Địa Giai Cực Phẩm', summary: 'Mở miệng nói một câu "Cấm" định thân kẻ thù, nói "Tru" trời giáng sấm sét.' },
      { name: 'Hạo Nhiên Kinh Thế Ca', grade: 'Địa Giai Thượng Phẩm', summary: 'Ngâm thơ trừ yêu, tiếng đọc sách xua tan mây mù tà ác vạn dặm.' }
    ],
    sacredArtifacts: [
      { name: 'Xuân Thu Trảm Ma Bút', rank: 'Thông Thiên Cổ Bảo', power: 'Bút viết định tội danh, hạ một nét phán sinh tử quân vương và đại yêu.' }
    ],
    guardianArray: {
      name: 'Bát Trận Đồ Tứ Thư Ngũ Kinh Đại Trận',
      tier: 'Nhị Phẩm Nho Phong Đại Trận',
      powerDescription: 'Hóa hư không thành trang sách thánh hiền, vây hãm yêu ma vào vòng luân hồi đạo lý không lối thoát.'
    },
    specialties: ['Khẩu tru bút phạt', 'Bình định tà linh bằng thi từ', 'Khai trí cho phàm nhân'],
    rulesAndPrecepts: ['Tu thân tề gia trị quốc bình thiên hạ', 'Chính khí hạo nhiên bất cận tà dâm', 'Thà gãy bút không bẻ cong đạo nghĩa'],
    politicalStance: {
      allies: ['Đại Càn Tiên Triều', 'Thái Hư Kiếm Tông', 'Đại Bi Bát Nhã Tự'],
      bitterEnemies: ['Tà Cổ Môn', 'Âm Sát Quỷ Vương Tông'],
      currentCrisis: 'Bị các thế lực hoàng triều lôi kéo vào tranh đoạt ngôi vị đế vương, đứng trước nguy cơ phân hóa nội bộ tư tưởng.'
    },
    description: 'Thế lực đặc biệt nhất tu chân giới, dùng nghiên bút và chính khí tranh phong với thần tiên đao kiếm.'
  },

  // 5. Thiên Ma Cung (Ma Đạo - Bất Hủ Thánh Địa)
  {
    id: 'sect_thien_ma_cung',
    name: 'Thiên Ma Cung • Cực Đạo Ma Thống Thánh Vực',
    camp: 'Ma Đạo & Tà Tu (Demonic / Tà Phái)',
    grade: 'Bất Hủ Thánh Địa & Đạo Thống Thái Cổ (Đại Thừa Tiên Khí / Trấn Giới Vĩnh Hằng)',
    headquarters: 'Thiên Ma Cổ Uyên (Hố sâu vạn trượng đáy Hắc Ám Đại Lục)',
    founderAndLegacy: 'Thủy tổ Thượng Cổ Chân Ma khai lập, tôn sùng quy luật cá lớn nuốt cá bé, cường giả vi tôn tuyệt đối.',
    leadership: {
      patriarch: 'Cửu U Thiên Ma Hoàng (Đại Thừa Hậu Kỳ • Chấn cổ thước kim)',
      sectMaster: 'Dạ Vô Nhai (Độ Kiếp Trung Kỳ • Thôn Thiên Ma Công)',
      lawEnforcementElder: 'Hình Ngục Ma Tôn (Hợp Thể Đỉnh Phong • Trừng phạt đệ tử phản bội bằng Lục Dục Ma Lôi)',
      discipleCount: 'Ngoại môn trăm vạn ma đồ, Nội môn hai vạn, Mười tám Ma Tử'
    },
    heritageScriptures: [
      { name: 'Thôn Thiên Ma Công Bổn Điển', grade: 'Tiên Phẩm Cổ Ma Quyết', summary: 'Nuốt chửng linh khí, tu vi, thậm chí thiên kiêu bổn nguyên của người khác để đột phá cảnh giới.' },
      { name: 'Lục Dục Thiên Ma Chân Kinh', grade: 'Thiên Giai Cực Phẩm', summary: 'Khống chế thất tình lục dục kẻ địch, khiến đối phương tẩu hỏa nhập ma tự sát.' }
    ],
    sacredArtifacts: [
      { name: 'Thôn Thiên Ma Đỉnh (Cổ Ma Tiên Khí)', rank: 'Thái Cổ Ma Khí', power: 'Luyện hóa cả một tòa tiên thành thành ma huyết tinh hoa chỉ trong một canh giờ.' }
    ],
    guardianArray: {
      name: 'Lục Dục Thiên Ma Tru Tiên Cổ Trận',
      tier: 'Cực Phẩm Ma Đạo Trấn Giới Trận',
      powerDescription: 'Kêu gọi ngàn vạn thiên ma tà niệm giáng trần, ô uế pháp bảo và đạo tâm của bất kỳ tu sĩ chính đạo nào xâm phạm.'
    },
    specialties: ['Hấp tinh luyện cốt', 'Luyện chế Thiên Ma Khôi Lỗi', 'Ma Hỏa Phần Thiên chi thuật'],
    rulesAndPrecepts: ['Kẻ yếu là sâu kiến, cường giả nắm giữ thiên lý', 'Không phản nghịch Ma Hoàng', 'Thua cuộc trong khiêu chiến nội bộ đồng nghĩa với cái chết'],
    politicalStance: {
      allies: ['Huyết Hải Ma Tông', 'Cửu U Luyện Thi Tông'],
      bitterEnemies: ['Thái Hư Kiếm Tông', 'Đại Bi Bát Nhã Tự'],
      currentCrisis: 'Các Ma Tử đang ngấm ngầm tàn sát lẫn nhau nhằm tranh đoạt suất tế đàn kế thừa ngai vị Ma Hoàng.'
    },
    description: 'Bá chủ ma đạo uy áp toàn cõi Cửu Châu, tàn nhẫn và tham vọng nhưng sở hữu sức mạnh hủy thiên diệt địa.'
  },

  // 6. Huyết Hải Ma Tông (Ma Đạo - Nhị Phẩm/Nhất Phẩm)
  {
    id: 'sect_huyet_hai_ma_tong',
    name: 'Huyết Hải Ma Tông • Cửu U Vạn Linh Huyết Đạo',
    camp: 'Ma Đạo & Tà Tu (Demonic / Tà Phái)',
    grade: 'Nhị Phẩm - Nhất Phẩm Tông Môn (Đỉnh Cấp Cự Phách / Luyện Hư & Hợp Thể)',
    headquarters: 'Tu La Huyết Đầm (Vùng đầm lầy máu đỏ lòm Nam Hoang)',
    founderAndLegacy: 'Huyết Hà Lão Tổ khai môn từ một giọt máu của Thần Ma viễn cổ, tông môn xây trên dòng sông máu không bao giờ cạn.',
    leadership: {
      patriarch: 'Huyết Hà Lão Tổ (Hợp Thể Đỉnh Phong)',
      sectMaster: 'Huyết Lệ Ma Tôn (Luyện Hư Viên Mãn)',
      lawEnforcementElder: 'Thực Huyết Thượng Nhân (Luyện Hư Hậu Kỳ)',
      discipleCount: 'Năm mươi vạn huyết đồ, ba trăm Huyết Thần Tử'
    },
    heritageScriptures: [
      { name: 'Cửu U Huyết Thần Kinh', grade: 'Thiên Giai Thượng Phẩm', summary: 'Tu luyện thành 48.000 Huyết Thần Tử, máu chưa cạn thì người không chết.' },
      { name: 'Vạn Linh Huyết Tế Đại Pháp', grade: 'Thiên Giai Trung Phẩm', summary: 'Hiến tế trăm vạn sinh linh rút lấy tinh huyết thăng cấp tu vi thần tốc.' }
    ],
    sacredArtifacts: [
      { name: 'Hóa Huyết Thần Đao', rank: 'Thông Thiên Ma Bảo', power: 'Chém trúng một vệt xước, toàn thân địch thủ hóa thành vũng máu loãng.' }
    ],
    guardianArray: {
      name: 'Cửu U Huyết Hải Vạn Sát Hộ Trận',
      tier: 'Nhất Phẩm Huyết Trận',
      powerDescription: 'Huyết lãng ngập trời ăn mòn phi kiếm hộ thân và linh lực của kẻ xâm phạm trong tích tắc.'
    },
    specialties: ['Hóa Huyết độn thuật', 'Luyện Huyết Phách Châu', 'Tụ linh huyết trận'],
    rulesAndPrecepts: ['Huyết tế đúng hạn', 'Tuyệt đối phục tùng thủ lĩnh phân đàn', 'Kẻ để lộ hành tung bị đày vào Huyết Trì vạn năm'],
    politicalStance: {
      allies: ['Thiên Ma Cung'],
      bitterEnemies: ['Thái Hư Kiếm Tông', 'Đại Bi Bát Nhã Tự'],
      currentCrisis: 'Bị Tiên Minh liên quân bao vây truy quét sau vụ đồ sát Huyết Tế ba tòa phàm nhân cổ thành.'
    },
    description: 'Thế lực ma đạo tàn nhẫn khét tiếng với khả năng sinh tồn ngoan cường cùng các bí thuật rút máu người đoạt đạo quả.'
  },

  // 7. Âm Sát Quỷ Vương Tông (Ma Đạo - Tứ Phẩm/Tam Phẩm)
  {
    id: 'sect_am_sat_quy_vuong',
    name: 'Âm Sát Quỷ Vương Tông • Ngự Quỷ Minh Điện',
    camp: 'Ma Đạo & Tà Tu (Demonic / Tà Phái)',
    grade: 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)',
    headquarters: 'Vạn Quỷ Hạp Cốc (Âm khí bao phủ quanh năm không thấy ánh mặt trời)',
    founderAndLegacy: 'Thành lập bởi Quỷ Vương Chân Nhân từ thời Loạn Cổ, chuyên thu gom oan hồn chiến trường và tế luyện Quỷ Đan.',
    leadership: {
      patriarch: 'U Minh Quỷ Mẫu (Hóa Thần Đỉnh Phong)',
      sectMaster: 'Diêm La Quỷ Quân (Hóa Thần Sơ Kỳ)',
      lawEnforcementElder: 'Bạch Cốt Đạo Nhân (Nguyên Anh Viên Mãn)',
      discipleCount: 'Tám vạn quỷ tu, nuôi dưỡng ba trăm vạn lệ quỷ'
    },
    heritageScriptures: [
      { name: 'Bách Quỷ Dạ Hành Lục', grade: 'Địa Giai Cực Phẩm', summary: 'Hiệu triệu bầy quỷ cắn nuốt hồn phách kẻ địch, thân hình ẩn nấp trong âm ảnh.' },
      { name: 'Cửu U Minh Hỏa Quyết', grade: 'Địa Giai Thượng Phẩm', summary: 'Ngọn lửa xám lạnh lẽo chuyên thiêu đốt nguyên thần, nước không thể dập tắt.' }
    ],
    sacredArtifacts: [
      { name: 'Vạn Quỷ Phiên', rank: 'Cực Phẩm Linh Bảo', power: 'Giải phóng hàng vạn ác quỷ che kín bầu trời, nuốt trọn sinh khí một vùng.' }
    ],
    guardianArray: {
      name: 'Vạn Quỷ Khiếu Thiên Tuyệt Hồn Trận',
      tier: 'Nhị Phẩm Âm Hộ Trận',
      powerDescription: 'Tiếng quỷ khóc thấu tâm can làm tan vỡ đạo tâm đối phương ngay khi tiếp cận phạm vi hộ sơn.'
    },
    specialties: ['Ngự quỷ thối linh', 'Luyện Hồn Tinh Thạch', 'Âm Minh Quỷ Bộ độn thuật'],
    rulesAndPrecepts: ['Không được để quỷ sủng cắn ngược lại chủ nhân', 'Cống nạp oán hồn đúng kỳ hạn', 'Kẻ yếu nhường xác cho lệ quỷ thượng vị'],
    politicalStance: {
      allies: ['Cửu U Luyện Thi Tông'],
      bitterEnemies: ['Thái Hư Kiếm Tông', 'Cửu Thiên Huyền Nữ Cung'],
      currentCrisis: 'Oán khí trong Vạn Quỷ Trũng vượt tầm kiểm soát, có nguy cơ bùng phát thành đợt Quỷ Triều quét sạch tông môn.'
    },
    description: 'Thế lực âm u chuyên sử dụng oan hồn quỷ quái, là nỗi khiếp sợ của các tán tu và đệ tử trẻ tuổi khi đi đêm.'
  },

  // 8. Thiên Yêu Đế Đình (Yêu Tộc - Bất Hủ Thánh Địa)
  {
    id: 'sect_thien_yeu_de_dinh',
    name: 'Thiên Yêu Đế Đình • Vạn Tộc Vương Quyền Thần Triều',
    camp: 'Yêu Tộc & Dị Tộc (Monster & Alien Clan)',
    grade: 'Bất Hủ Thánh Địa & Đạo Thống Thái Cổ (Đại Thừa Tiên Khí / Trấn Giới Vĩnh Hằng)',
    headquarters: 'Đế Đô Bất Chu Sơn Điệp (Cốt lõi Yêu Giới Hoang Dã)',
    founderAndLegacy: 'Thống nhất toàn bộ yêu tộc bởi Thái Cổ Yêu Hoàng. Nơi đây quy tụ huyết mạch thuần chủng của Long Tộc, Cửu Vĩ Thiên Hồ và Kim Ô.',
    leadership: {
      patriarch: 'Thái Hư Cổ Long Hoàng (Đại Thừa Viên Mãn • Yêu Đế)',
      sectMaster: 'Cửu Vĩ Thiên Hồ Yêu Hậu (Độ Kiếp Hậu Kỳ)',
      lawEnforcementElder: 'Thiên Bằng Chiến Tôn (Hợp Thể Đỉnh Phong)',
      discipleCount: 'Trăm vạn yêu binh yêu tướng, Mười hai Thần Thú Vương Tộc'
    },
    heritageScriptures: [
      { name: 'Vạn Yêu Bổn Nguyên Đế Kinh', grade: 'Tiên Phẩm Yêu Kinh', summary: 'Khai mở tiềm năng huyết mạch thần thú viễn cổ, hóa thân cự thú che trời rách đất.' },
      { name: 'Thần Thú Thôn Thiên Quyết', grade: 'Thiên Giai Cực Phẩm', summary: 'Cắn nuốt linh sơn khoáng mạch thối luyện yêu thể kim cương bất hoại.' }
    ],
    sacredArtifacts: [
      { name: 'Vạn Yêu Huyết Kỳ (Thái Cổ Đế Binh)', rank: 'Thái Cổ Đế Binh', power: 'Hiệu triệu vạn ức yêu thú khắp Cửu Châu phát động Thú Triều hủy diệt thế giới.' }
    ],
    guardianArray: {
      name: 'Thập Nhị Đô Thiên Yêu Thần Cổ Trận',
      tier: 'Cực Phẩm Yêu Thần Hộ Trận',
      powerDescription: 'Hóa thân hư ảnh 12 vị yêu thần viễn cổ bao bọc Đế Đô, mỗi bước chân chấn động rạn nứt hư không.'
    },
    specialties: ['Hóa hình chi thuật đỉnh cao', 'Chiến đấu bằng thể phách viễn cổ', 'Luyện Huyết Tổ Đan'],
    rulesAndPrecepts: ['Huyết mạch là tối cao, thú vương nắm quyền sinh sát', 'Cấm nội chiến tàn sát đồng tộc khi nhân tộc uy hiếp', 'Kẻ phản nghịch bị rút cạn tủy xương'],
    politicalStance: {
      allies: ['Kim Bằng Thần Tộc', 'Man Hoang Thú Tộc'],
      bitterEnemies: ['Tiên Minh Nhân Tộc', 'Thái Hư Kiếm Tông'],
      currentCrisis: 'Tranh chấp ngôi vị Thái Tử Yêu Hoàng giữa Long Tộc đại hoàng tử và Thiên Hồ tộc thánh tử.'
    },
    description: 'Thế lực vĩ đại nhất cõi yêu thú, đối trọng lịch sử hàng triệu năm của toàn thể Nhân Tộc Cửu Châu.'
  },

  // 9. Kim Bằng Thần Tộc (Yêu Tộc - Nhị Phẩm/Nhất Phẩm)
  {
    id: 'sect_kim_bang_than_toc',
    name: 'Kim Bằng Thần Tộc • Cực Tốc Liệt Không Vương Tộc',
    camp: 'Yêu Tộc & Dị Tộc (Monster & Alien Clan)',
    grade: 'Nhị Phẩm - Nhất Phẩm Tông Môn (Đỉnh Cấp Cự Phách / Luyện Hư & Hợp Thể)',
    headquarters: 'Kim Sí Phong Điệp (Vực đá gió lốc tầng mây thứ chín)',
    founderAndLegacy: 'Hậu duệ thuần chủng của Thái Cổ Đại Bằng Kim Sí Điểu, nổi danh với tốc độ đệ nhất thiên hạ và móng vuốt xé nát long xà.',
    leadership: {
      patriarch: 'Liệt Không Bằng Hoàng (Hợp Thể Hậu Kỳ)',
      sectMaster: 'Kim Sí Thiếu Chủ (Luyện Hư Đỉnh Phong)',
      lawEnforcementElder: 'Thiết Vũ Tôn Giả (Luyện Hư Hậu Kỳ)',
      discipleCount: 'Năm ngàn thuần huyết tộc nhân, ba vạn điểu tộc phụ thuộc'
    },
    heritageScriptures: [
      { name: 'Đại Bằng Phù Dao Cửu Vạn Lý', grade: 'Thiên Giai Cực Phẩm', summary: 'Thần thông tốc độ cực hạn, một cái vỗ cánh vượt qua chín vạn dặm hư không.' }
    ],
    sacredArtifacts: [
      { name: 'Kim Sí Thần Lông Vũ Kiếm', rank: 'Thông Thiên Thần Khí', power: 'Đúc từ lông vũ rụng của Thủy Tổ Kim Bằng, chém rách mọi kết giới không gian.' }
    ],
    guardianArray: {
      name: 'Liệt Không Cương Phong Hộ Sơn Trận',
      tier: 'Nhất Phẩm Không Gian Đại Trận',
      powerDescription: 'Gió lốc xé toạc không gian xung quanh núi, phi thuyền hay thần thông bay qua lập tức bị nghiền nát.'
    },
    specialties: ['Không gian thuấn di', 'Cực tốc ám sát', 'Kim Cương Điểu Trảo phá giáp'],
    rulesAndPrecepts: ['Kiêu hãnh bất khuất', 'Không chịu làm thú cưỡi cho nhân tộc dưới mọi hình thức', 'Kẻ làm nhục tộc danh phải bị phanh thây'],
    politicalStance: {
      allies: ['Thiên Yêu Đế Đình'],
      bitterEnemies: ['Long Tộc Cổ Uyên', 'Ngự Thú Tông'],
      currentCrisis: 'Xích mích truyền kiếp với Long Tộc bùng nổ thành chiến sự cục bộ tại vùng biên giới Cực Nam.'
    },
    description: 'Thần tộc kiêu ngạo với tốc độ vô song, khắc tinh truyền kiếp của xà tộc và long tộc.'
  },

  // 10. Tán Tu Thiên Minh (Trung Lập - Tứ Phẩm/Tam Phẩm)
  {
    id: 'sect_tan_tu_thien_minh',
    name: 'Tán Tu Thiên Minh • Vạn Tán Đồng Tâm Minh',
    camp: 'Trung Lập & Tán Tu Minh (Neutral & Rogue Alliance)',
    grade: 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)',
    headquarters: 'Tự Do Chi Thành • Vô Định Đảo (Biển Đông)',
    founderAndLegacy: 'Do các cao thủ tán tu kiệt xuất cùng liên kết tạo dựng để tự vệ trước sự chèn ép của các đại tông môn danh gia vọng tộc.',
    leadership: {
      patriarch: 'Tiêu Diêu Lão Tổ (Hóa Thần Hậu Kỳ • Tán Tu)',
      sectMaster: 'Thần Cơ Chân Nhân (Hóa Thần Sơ Kỳ)',
      lawEnforcementElder: 'Thiết Diện Tán Sĩ (Nguyên Anh Viên Mãn)',
      discipleCount: 'Hơn hai trăm vạn tán tu hội viên trên khắp các châu phủ'
    },
    heritageScriptures: [
      { name: 'Bách Gia Tạp Học Thần Thông Lục', grade: 'Địa Giai Thượng Phẩm', summary: 'Tổng hợp hàng ngàn tuyệt kỹ tàn khuyết của tán tu biến thành sát chiêu thực chiến hiểm hóc.' }
    ],
    sacredArtifacts: [
      { name: 'Thiên Minh Lệnh Bài (Cực Phẩm Linh Bảo)', rank: 'Cực Phẩm Linh Bảo', power: 'Hiệu triệu tán tu phụ cận chi viện khi gặp nguy hiểm, ghi nhận điểm tích lũy đổi tài nguyên.' }
    ],
    guardianArray: {
      name: 'Vạn Lưu Quy Hải Hộ Đảo Đại Trận',
      tier: 'Nhị Phẩm Phòng Ngự Trận',
      powerDescription: 'Hòa quyện linh lực từ hàng vạn tu sĩ cùng phòng ngự, địch nhân càng đông thì trận pháp càng kiên cố.'
    },
    specialties: ['Giao thương tự do', 'Săn bắt yêu thú dã ngoại', 'Tin tức giang hồ đa chiều'],
    rulesAndPrecepts: ['Tương thân tương ái', 'Không cướp bóc lẫn nhau trong thành', 'Không ép buộc phụng sự'],
    politicalStance: {
      allies: ['Vạn Bảo Thương Minh', 'Thiên Cơ Các'],
      bitterEnemies: ['Các tông môn hà khắc bóc lột quặng mỏ'],
      currentCrisis: 'Bị thế lực ma đạo xâm nhập ngầm thao túng thị trường chợ đen và bắt cóc tán tu luyện đan.'
    },
    description: 'Ngôi nhà chung của hàng triệu tu sĩ không môn phái, tuy tổ chức lỏng lẻo nhưng tiềm lực nhân số kinh hoàng.'
  },

  // 11. Đan Đỉnh Tiên Các (Trung Lập - Tứ Phẩm/Tam Phẩm)
  {
    id: 'sect_dan_dinh_tien_cac',
    name: 'Đan Đỉnh Tiên Các • Dược Đạo Đệ Nhất Tông',
    camp: 'Trung Lập & Tán Tu Minh (Neutral & Rogue Alliance)',
    grade: 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)',
    headquarters: 'Linh Dược Cốc (Hẻm núi phì nhiêu tràn ngập dược hương)',
    founderAndLegacy: 'Tông môn chuyên nghiên cứu luyện đan dược lớn nhất lục địa, cung cấp 70% đan dược cứu mạng và đột phá cho tu sĩ các phe.',
    leadership: {
      patriarch: 'Dược Hoàng Cổ Tôn (Hóa Thần Viên Mãn • Cửu Phẩm Đan Sư)',
      sectMaster: 'Thanh Mộc Chân Nhân (Hóa Thần Sơ Kỳ)',
      lawEnforcementElder: 'Liệt Diễm Tôn Giả (Nguyên Anh Đỉnh Phong)',
      discipleCount: 'Năm vạn đan sư học đồ, ba ngàn Đại Đan Sư'
    },
    heritageScriptures: [
      { name: 'Thần Nông Bách Thảo Đan Kinh', grade: 'Thiên Giai Thượng Phẩm', summary: 'Chỉ dẫn tinh vi về 10 vạn loài linh dược và bí quyết khống hỏa luyện đan tuyệt đỉnh.' }
    ],
    sacredArtifacts: [
      { name: 'Cửu Long Ly Hỏa Đỉnh', rank: 'Bán Tiên Khí Đan Lò', power: 'Tự động hấp thu linh khí thiên địa nâng cấp đan dược thành Cực Phẩm Đan có đan vân.' }
    ],
    guardianArray: {
      name: 'Vạn Dược Mê Tung Diễm Trận',
      tier: 'Nhị Phẩm Ảo Hỏa Trận',
      powerDescription: 'Phát tán dược vụ gây ảo giác và thiêu rụi kẻ địch bằng linh hỏa hộ sơn đa sắc.'
    },
    specialties: ['Luyện đan dược cứu tử hoàn sinh', 'Trồng cấy linh dược quý hiếm', 'Khống chế dị hỏa'],
    rulesAndPrecepts: ['Đan sư giữ tâm trung lập', 'Không thiên vị Chính Ma khi cứu chữa nạn nhân', 'Cấm tiết lộ đan phương mật truyền'],
    politicalStance: {
      allies: ['Tất cả các đại phái (nhờ cung ứng đan dược)'],
      bitterEnemies: ['Hắc Đan Phái', 'Đạo tặc dược liệu'],
      currentCrisis: 'Một gốc Thái Cổ Hóa Hình Thần Thảo trong cấm viên sắp thành thục, thu hút dã tâm cướp đoạt của nhiều lão quái vật.'
    },
    description: 'Tông môn được kính trọng nhất khắp các giới, không ai muốn đắc tội đan sư nắm giữ tính mạng của chính mình.'
  },

  // 12. Thiên Cơ Các (Trung Lập - Nhị Phẩm/Nhất Phẩm)
  {
    id: 'sect_thien_co_cac',
    name: 'Thiên Cơ Các • Lục Giới Tình Báo & Vọng Khí Thánh Môn',
    camp: 'Trung Lập & Tán Tu Minh (Neutral & Rogue Alliance)',
    grade: 'Nhị Phẩm - Nhất Phẩm Tông Môn (Đỉnh Cấp Cự Phách / Luyện Hư & Hợp Thể)',
    headquarters: 'Thiên Cơ Vọng Tinh Đài (Lơ lửng trên tầng bình lưu ngắm nhìn vận mệnh thiên hạ)',
    founderAndLegacy: 'Thành lập bởi Thiên Cơ Lão Nhân, chuyên suy diễn thiên cơ số mệnh, phát hành Bảng Xếp Hạng Thiên Kiêu và Bảng Thần Binh.',
    leadership: {
      patriarch: 'Thiên Cơ Thần Toán (Hợp Thể Đỉnh Phong • Bế quan suy diễn đại kiếp)',
      sectMaster: 'Gia Cát Huyền Cơ (Luyện Hư Viên Mãn)',
      lawEnforcementElder: 'Ám Ảnh Các Chủ (Luyện Hư Sơ Kỳ)',
      discipleCount: 'Ngàn vạn thám tử rải rác khắp phố phường, tửu quán, hoàng cung và tông môn'
    },
    heritageScriptures: [
      { name: 'Thiên Cơ Diễn Toán Thần Thuật', grade: 'Thiên Giai Cực Phẩm', summary: 'Dò xét khí vận, bói toán cát hung, nhìn thấu điểm yếu và quá khứ của cường giả.' }
    ],
    sacredArtifacts: [
      { name: 'Hà Đồ Lạc Thư Mô Phỏng Bàn', rank: 'Bán Tiên Khí', power: 'Chiếu rọi toàn bộ biến động nhân quả và khí vận của lục đại châu phủ.' }
    ],
    guardianArray: {
      name: 'Hư Không Mê Thiên Ẩn Cơ Trận',
      tier: 'Nhất Phẩm Huyễn Bí Đại Trận',
      powerDescription: 'Xóa sạch mọi dấu vết của tổng đàn khỏi thiên cơ bát quái, đối thủ dù mạnh đến đâu cũng không thể định vị.'
    },
    specialties: ['Mua bán thông tin mật', 'Xếp hạng thiên tài lục giới', 'Bói toán tránh né thiên kiếp'],
    rulesAndPrecepts: ['Không can thiệp vào xung đột giữa các thế lực', 'Bảo mật tuyệt đối danh tính người mua tin', 'Chỉ bán sự thật'],
    politicalStance: {
      allies: ['Khách hàng khắp thiên hạ'],
      bitterEnemies: ['Những kẻ mưu đồ bí mật bị bại lộ'],
      currentCrisis: 'Bị phát hiện một phân đà bị thế lực bí ẩn thảm sát diệt khẩu để che giấu một bí mật chấn động thiên cổ.'
    },
    description: 'Thế lực nắm rõ mọi ngóc ngách của tu chân giới, lời đồn rằng không một bí mật nào có thể qua mắt Thiên Cơ Các.'
  },

  // 13. Khương Gia Hoang Cổ Thế Gia (Ẩn Thế Cổ Tộc - Bất Hủ Thánh Địa)
  {
    id: 'sect_khuong_gia_hoang_co',
    name: 'Khương Gia Hoang Cổ Thế Gia • Đại Đế Đế Thống Huyết Mạch',
    camp: 'Ẩn Thế Cổ Tộc & Cấm Địa Thế Lực (Ancient Clans & Forbidden Zones)',
    grade: 'Bất Hủ Thánh Địa & Đạo Thống Thái Cổ (Đại Thừa Tiên Khí / Trấn Giới Vĩnh Hằng)',
    headquarters: 'Hằng Vũ Thần Thành • Khương Thị Cổ Giới',
    founderAndLegacy: 'Gia tộc truyền thừa huyết mạch của Hằng Vũ Đại Đế thời Hoang Cổ, sở hữu Trấn Thế Đế Binh và Cực Đạo Đế Kinh độc tôn vạn cổ.',
    leadership: {
      patriarch: 'Khương Thái Hư Lão Tổ (Đại Thừa Hậu Kỳ • Tuyệt thế thần vương)',
      sectMaster: 'Khương Đạo Lâm Gia Chủ (Độ Kiếp Sơ Kỳ)',
      lawEnforcementElder: 'Khương Vân Chấp Pháp Thần Trưởng Lão (Hợp Thể Viên Mãn)',
      discipleCount: 'Tộc nhân hơn mười vạn, Cổ Đế Vệ ba ngàn tinh anh'
    },
    heritageScriptures: [
      { name: 'Hằng Vũ Kinh Bổn Điển', grade: 'Đại Đế Cực Đạo Cổ Kinh', summary: 'Diễn hóa Hằng Vũ Xích Thần Lô, thiêu đốt thương khung, tái sinh từ niết bàn chi hỏa.' }
    ],
    sacredArtifacts: [
      { name: 'Hằng Vũ Thần Lô (Cực Đạo Đế Binh)', rank: 'Cực Đạo Đế Binh', power: 'Khí tức đế uy trấn áp Cửu Thiên Thập Địa, một kích phá tan một đại vực.' }
    ],
    guardianArray: {
      name: 'Thái Cổ Đế Văn Phong Giới Trận',
      tier: 'Cực Phẩm Cổ Đế Trận Pháp',
      powerDescription: 'Khắc họa bằng chính đế văn của Hằng Vũ Đại Đế, bất khả xâm phạm trước mọi đại năng hạ giới.'
    },
    specialties: ['Đế huyết thối thể', 'Thần Vương Tịnh Thổ dị tượng', 'Thuật luyện đúc Đế Binh'],
    rulesAndPrecepts: ['Giữ gìn tôn nghiêm gia tộc Đại Đế', 'Không tùy tiện rời khỏi Cổ Giới gây hoang mang nhân gian', 'Kẻ làm nhục huyết mạch tru di tam tộc'],
    politicalStance: {
      allies: ['Cơ Gia Cổ Tộc', 'Dao Trì Thánh Địa'],
      bitterEnemies: ['Thái Cổ Sinh Linh Cấm Vực', 'Thiên Ma Cung'],
      currentCrisis: 'Thần Vương Lão Tổ thọ nguyên gần cạn kiệt, các cấm khu sinh linh bắt đầu rục rịch dòm ngó Đế Binh.'
    },
    description: 'Gia tộc cổ xưa sừng sững qua hàng triệu năm thăng trầm, biểu tượng của sự kiêu hãnh và bất khả chiến bại.'
  },

  // 14. Bất Tử Sơn Di Tộc (Ẩn Thế Cổ Tộc / Cấm Địa - Bất Hủ)
  {
    id: 'sect_bat_tu_son',
    name: 'Bất Tử Sơn Cấm Khu Thần Tộc • Hắc Ám Cổ Tộc',
    camp: 'Ẩn Thế Cổ Tộc & Cấm Địa Thế Lực (Ancient Clans & Forbidden Zones)',
    grade: 'Bất Hủ Thánh Địa & Đạo Thống Thái Cổ (Đại Thừa Tiên Khí / Trấn Giới Vĩnh Hằng)',
    headquarters: 'Bất Tử Sơn Vô Sinh Giới (Cấm sơn đen tuyền ngập tràn sương độc thời gian)',
    founderAndLegacy: 'Nơi ngủ say của các Chí Tôn viễn cổ tự chém đạo hạnh để cầu trường sinh, là một trong Thất Đại Sinh Mệnh Cấm Khu kinh hoàng nhất.',
    leadership: {
      patriarch: 'Bất Tử Cổ Hoàng Tàn Hồn (Chí Tôn Viễn Cổ)',
      sectMaster: 'Cổ Đao Chí Tôn (Đại Thừa Viên Mãn)',
      lawEnforcementElder: 'Thạch Hoàng Hộ Vệ (Hợp Thể Đỉnh Phong)',
      discipleCount: 'Cấm Khu sinh linh vài trăm, Cổ Ma Hóa Thân vạn tôn'
    },
    heritageScriptures: [
      { name: 'Bất Tử Thần Dược Dưỡng Mệnh Quyết', grade: 'Cấm Thuật Cổ Kinh', summary: 'Hút cạn sinh mệnh khí của đại lục để duy trì sự sống qua hàng kỷ nguyên.' }
    ],
    sacredArtifacts: [
      { name: 'Ngộ Đạo Cổ Trà Thụ (Thái Cổ Thần Thụ)', rank: 'Thần Thụ Nghịch Thiên', power: 'Mỗi lá trà chứa đựng một đạo quy tắc thiên địa hoàn chỉnh, uống vào ngộ đạo tức thì.' }
    ],
    guardianArray: {
      name: 'Bất Tử Tuyệt Mệnh Cực Đạo Trận',
      tier: 'Cực Phẩm Cấm Khu Trận',
      powerDescription: 'Hút cạn tuổi thọ của bất kỳ ai đặt chân vào: một bước giảm mười năm thọ nguyên, mười bước hóa thành tro bụi.'
    },
    specialties: ['Trường sinh cấm thuật', 'Hắc ám phát động náo loạn', 'Linh hồn phong ấn trong thần thạch'],
    rulesAndPrecepts: ['Kẻ xâm phạm chết không có chỗ chôn', 'Không được đánh thức Chí Tôn khi chưa đến thời cơ đại biến', 'Gom góp huyết thực dâng lên thần thạch'],
    politicalStance: {
      allies: ['Thần Khư', 'Luân Hồi Hải'],
      bitterEnemies: ['Tất cả Đại Đế nhân tộc', 'Thái Hư Kiếm Tông', 'Khương Gia'],
      currentCrisis: 'Bị Đế Khí phong ấn vạn năm qua sắp vỡ vụn, chuẩn bị phát động Hắc Ám Náo Loạn càn quét đại lục để thu thập thọ nguyên.'
    },
    description: 'Cấm địa thần bí và rùng rợn nhất tu chân giới, mỗi lần xuất thế là một hồi tai kiếp diệt chủng của toàn cõi nhân gian.'
  }
];

// ================= 6 PHẢN DIỆN KINH ĐIỂN MẪU (VILLAINS) =================
export const PRESET_VILLAINS_ALL: VillainItem[] = [
  // 1. Ngụy Quân Tử / Đạo Mạo Nhân Quân
  {
    id: 'villain_co_thanh_ha',
    name: 'Cố Thanh Hà',
    title: 'Lăng Vân Quân Tử • Tông Môn Chấp Pháp Trưởng Lão',
    category: 'Ngụy Quân Tử / Đạo Mạo Nhân Quân',
    cultivationRealm: 'Nguyên Anh Hậu Kỳ (Giả trang Trúc Cơ đại viên mãn)',
    sectAffiliation: 'Thanh Vân Tông (Nội Môn Chấp Pháp Đường)',
    publicFacade: 'Luôn mặc áo trắng phiêu dật, nói lời nhân nghĩa lễ trí, xả thân cứu giúp đệ tử phàm tục, được vạn người xưng tụng là hình mẫu bậc chính nhân quân tử.',
    trueDarkNature: 'Lòng dạ hiểm độc như rắn rết, âm thầm bắt cóc các đệ tử có thể chất đặc biệt để rút lấy máu đầu tim luyện Huyết Đan kéo dài thọ nguyên.',
    deadlySchemes: [
      'Gài bẫy vu oan nhân vật chính cấu kết với ma đạo nhằm chiếm đoạt bảo vật gia truyền.',
      'Dùng quy củ môn phái ép các trưởng lão khác trao quyền kiểm soát linh tuyền nội môn.'
    ],
    fatalWeakness: 'Rất sợ bị bóc trần bộ mặt giả tạo trước toàn thể đệ tử; luôn bộc lộ sơ hở khi đứng trước vách đá khảo nghiệm tâm ma.',
    signatureViciousMove: 'Cửu Khúc Đoạt Hồn Châm (Bắn lén sau lưng không để lại dấu vết ma khí)',
    nemesisGrudge: 'Ghen ghét thiên phú nghịch thiên của nhân vật chính và căm hận vì phụ thân nhân vật chính từng từ chối gả nữ nhi cho hắn.'
  },

  // 2. Tuyệt Thế Kiêu Hùng / Ma Đầu Quyết Đoán
  {
    id: 'villain_huyet_le_ma_hoang',
    name: 'Huyết Lệ Ma Hoàng',
    title: 'Vạn Huyết Đồ Tể • Bá Chủ Huyết Hải',
    category: 'Tuyệt Thế Kiêu Hùng / Ma Đầu Quyết Đoán',
    cultivationRealm: 'Luyện Hư Đỉnh Phong (Chuẩn bị đột phá Hợp Thể)',
    sectAffiliation: 'Huyết Hải Ma Tông (Đương Kim Tông Chủ)',
    publicFacade: 'Công khai tuyên bố theo ma đạo, không thèm ngụy trang che đậy hành tung, sát phạt vô tình nhưng giữ trọn lời hứa đã nói ra.',
    trueDarkNature: 'Coi vạn vật là sâu kiến, vì đại đạo của bản thân sẵn sàng hy sinh toàn bộ môn đồ; thủ đoạn tàn độc nhưng có tầm nhìn chiến lược kinh người.',
    deadlySchemes: [
      'Bày mưu liên kết ba chi nhánh ma môn tấn công đánh sập linh mạch Thái Hư Kiếm Tông.',
      'Lợi dụng Tiên Minh đại hội để phóng thích Hóa Huyết Thần Sa độc sát toàn bộ tân tú chính phái.'
    ],
    fatalWeakness: 'Đạo tâm quá mức ngạo mạn, khinh thường đối thủ có tu vi thấp hơn mình dẫn đến coi thường biến số nhân vật chính.',
    signatureViciousMove: 'Vạn Kiếp Huyết Hải Thôn Thiên Thủ (Bàn tay máu bao trùm trăm dặm nghiền nát tất cả)',
    nemesisGrudge: 'Nhân vật chính từng phá hủy phân đàn huyết tế quan trọng nhất của hắn khiến đại kế thăng cấp bị chậm trễ một trăm năm.'
  },

  // 3. Cuồng Ngạo Thiên Kiêu / Nhị Thế Tổ
  {
    id: 'villain_bac_cung_tuyet',
    name: 'Bắc Cung Tuyệt',
    title: 'Tiểu Bá Vương • Cửu Tiêu Thiếu Chủ',
    category: 'Cuồng Ngạo Thiên Kiêu / Nhị Thế Tổ',
    cultivationRealm: 'Kim Đan Hậu Kỳ (Đắp bằng đan dược và linh dược thượng phẩm)',
    sectAffiliation: 'Cửu Tiêu Thần Tông (Con trai độc nhất của Thái Thượng Trưởng Lão)',
    publicFacade: 'Mặc hoàng kim chiến giáp, cưỡi Kim Sí Linh Điểu, đi đâu cũng có hai vị Hóa Thần hộ đạo giả đi kèm bảo bọc.',
    trueDarkNature: 'Xem mạng người như cỏ rác, quen thói cướp đoạt nữ tu và bảo vật của kẻ yếu, ai dám nhìn thẳng mặt hắn đều bị khoét mắt phế tu vi.',
    deadlySchemes: [
      'Thuê sát thủ Thiên Cơ Các mai phục nhân vật chính tại bí cảnh thí luyện.',
      'Dùng thế lực phụ thân ép buộc gia tộc nhân vật chính phải cống nạp cơ nghiệp ngàn năm.'
    ],
    fatalWeakness: 'Tâm tính yếu ớt thiếu tôi luyện thực chiến, một khi Hộ Đạo Giả bị ngăn chặn sẽ hoảng loạn mất kiểm soát.',
    signatureViciousMove: 'Cửu Lôi Diệt Tuyệt Thần Phù (Lấy phù lục bảo mệnh của phụ thân ra ném bừa bãi)',
    nemesisGrudge: 'Bị nhân vật chính đánh bại trước mặt thanh mai trúc mã và vạn người tại hội đấu giá tiên thành.'
  },

  // 4. Lão Ma Đầu Đoạt Xá / Lão Quái Vật Phục Sinh
  {
    id: 'villain_cuu_u_lao_ma',
    name: 'Cửu U Lão Ma',
    title: 'Minh Hà Thủy Tổ • Tàn Hồn Vạn Năm',
    category: 'Lão Ma Đầu Đoạt Xá / Lão Quái Vật Phục Sinh',
    cultivationRealm: 'Nguyên Thần Thể (Nguyên bản Hợp Thể Hậu Kỳ, hiện cư ngụ trong ngọc bội)',
    sectAffiliation: 'Thượng Cổ Ma Tông (Đã bị tiêu diệt vạn năm trước)',
    publicFacade: 'Ban đầu giả vờ làm "Lão Gia Gia" hiền từ trong di vật truyền thừa, tận tình chỉ điểm công pháp giúp đỡ nhân vật chính hoặc tiểu đệ.',
    trueDarkNature: 'Tâm cơ thâm trầm tột bực, tất cả công pháp hắn truyền thụ đều ngầm gài sẵn cấm chế đoạt xá, chỉ chờ ký chủ đạt tới cảnh giới hoàn mỹ sẽ nuốt chửng linh hồn.',
    deadlySchemes: [
      'Dẫn dắt ký chủ vào hang ổ tử địa để ép cạn kiệt tinh thần lực, tạo thời cơ xuất hồn đoạt xá.',
      'Gieo rắc mối hận thù giữa ký chủ và các danh môn chính phái để cô lập con mồi hoàn toàn.'
    ],
    fatalWeakness: 'Nguyên thần tàn khuyết cực kỳ sợ hãi Lôi Kiếp Chí Dương và Thần Hồn Đan Lửa Chân Hỏa.',
    signatureViciousMove: 'Cửu U Đoạt Phách Khôi Lỗi Ấn (Khóa chặt thức hải bóp nghẹt thần hồn)',
    nemesisGrudge: 'Thèm khát nhục thân Bất Diệt Hoang Thể của nhân vật chính để tái sinh đỉnh phong.'
  },

  // 5. Hắc Hóa Huynh Đệ / Phản Bội Tri Kỷ
  {
    id: 'villain_diep_mac_tran',
    name: 'Diệp Mặc Trần',
    title: 'Phần Tâm Kiếm Khách • Đọa Lạc Ma Kiếm',
    category: 'Hắc Hóa Huynh Đệ / Phản Bội Tri Kỷ',
    cultivationRealm: 'Nguyên Anh Sơ Kỳ (Tu luyện Tà Kiếm Quyết)',
    sectAffiliation: 'Vốn là Đại Sư Huynh Thanh Vân Tông, nay đầu nhập Ma Đạo',
    publicFacade: 'Từng là huynh đệ vào sinh ra tử, cùng nhân vật chính chia sẻ từng mẩu lương khô và đan dược thưở hàn vi.',
    trueDarkNature: 'Lòng đố kỵ gặm nhấm tâm can khi thấy nhân vật chính liên tục vượt mặt mình và được sư muội yêu mến; sẵn sàng đâm kiếm sau lưng đồng đội.',
    deadlySchemes: [
      'Bán đứng lộ trình hành quân của tông môn cho ma tu đổi lấy một cuốn Tà Kiếm Bí Tịch.',
      'Lợi dụng sự tin tưởng của nhân vật chính để hạ độc vào rượu chúc mừng chiến thắng.'
    ],
    fatalWeakness: 'Tận sâu thấu đáy lòng vẫn còn vương vấn ký ức tình huynh đệ xưa, dễ bị dao động tâm lý trong khoảnh khắc quyết định.',
    signatureViciousMove: 'Phần Tâm Tuyệt Tình Nhất Kiếm (Xuất kiếm từ góc độ thân mật nhất phản bội đồng đội)',
    nemesisGrudge: 'Tự ti và ám ảnh tâm ma: "Nếu không có ngươi, ta mới là thiên chi kiêu tử của thiên hạ!".'
  },

  // 6. Cuồng Tín Đồ / Cấm Thuật Si Mê
  {
    id: 'villain_huyet_y_vu_chuc',
    name: 'Huyết Y Vu Chúc',
    title: 'Tế Thế Ma Tăng • Sinh Mệnh Phục Sinh Giả',
    category: 'Cuồng Tín Đồ / Cấm Thuật Si Mê',
    cultivationRealm: 'Hóa Thần Sơ Kỳ',
    sectAffiliation: 'Thượng Cổ Vu Tộc Tàn Dư',
    publicFacade: 'Vẻ ngoài khắc khổ, ăn chay niệm phật, luôn miệng thương xót nhân gian lầm than.',
    trueDarkNature: 'Vì hồi sinh đạo lữ đã qua đời ba ngàn năm trước mà sẵn sàng luyện hóa cả trăm tòa thành trì thành Huyết Đan Phục Sinh; tin rằng mọi tội ác đều đáng giá.',
    deadlySchemes: [
      'Bố trí Vạn Hồn Tụ Linh Trận dưới đáy thủ đô đế quốc, chờ thời khắc nhật thực sẽ kích hoạt đồ sát mười vạn người.',
      'Lừa gạt các đệ tử trẻ tuổi hiến tế linh hồn với lời hứa sẽ đưa họ đến cõi cực lạc.'
    ],
    fatalWeakness: 'Thi hài đạo lữ đang bảo quản trong băng quan chính là tử huyệt; nếu băng quan bị uy hiếp hắn sẽ phát điên mất hết lý trí.',
    signatureViciousMove: 'U Hồn Hồi Sinh Huyết Chú (Biến sinh mạng người sống thành chất dẫn hồi sinh)',
    nemesisGrudge: 'Nhân vật chính vô tình phá vỡ một trong chín trận nhãn hồi sinh khiến đạo lữ hắn tan biến thêm một phần hồn phách.'
  }
];

// ================= 6 ĐIỆP VIÊN & NỘI GIÁN MẪU (SPIES) =================
export const PRESET_SPIES_ALL: SpyItem[] = [
  // 1. Điệp Viên Ma Đạo Trà Trộn Tiên Môn
  {
    id: 'spy_lieu_vo_song',
    name: 'Liễu Vô Song',
    disguisedRole: 'Ngoại Môn Dược Sư • Nhu Mì Đệ Tử',
    actualLoyalty: 'Thiên Ma Cung (Ám Dạ Ma Vệ)',
    infiltratedSect: 'Thái Hư Kiếm Tông',
    category: 'Điệp Viên Ma Đạo Trà Trộn Tiên Môn',
    missionObjective: 'Đánh cắp trận đồ bố phòng Kiếm Trủng và hạ độc làm suy yếu kiếm ý Thái Thượng Trưởng Lão.',
    camouflageTechnique: 'Ẩn Ma Ngọc Phù kết hợp Băng Tâm Thanh Khiết Đan che giấu hoàn toàn ma niệm, hiển thị linh căn Mộc Hệ nhu hòa.',
    secretTokenOrSignal: 'Thả bồ câu tuyết mang vòng ngọc đen tại chân núi sau ngày rằm hàng tháng.',
    exposureRiskLevel: 'Trung Bình (Bắt đầu bị Chấp Pháp Đường nghi ngờ vì thường xuyên lảng vãng gần cấm địa)',
    innerConflict: 'Được các sư huynh muội chính phái đối đãi chân thành, dần nảy sinh tình cảm và ghê tởm nhiệm vụ tàn sát của ma giáo.',
    fatalFlaw: 'Mỗi khi ngửi thấy mùi máu tanh nồng thì ma nhãn dưới trán sẽ co giật để lộ khí tức tà dị.'
  },

  // 2. Trinh Sát Tiên Minh Nằm Vùng Ma Giáo
  {
    id: 'spy_tram_mac',
    name: 'Trầm Mặc',
    disguisedRole: 'Huyết Sát Đàn Chủ • Đao Phủ Sát Nhân',
    actualLoyalty: 'Chính Đạo Tiên Minh Mật Vụ Ty',
    infiltratedSect: 'Huyết Hải Ma Tông',
    category: 'Trinh Sát Tiên Minh Nằm Vùng Ma Giáo',
    missionObjective: 'Thu thập danh sách nội gián ma đạo cài cắm trong các đại phái và thời điểm phát động huyết tế.',
    camouflageTechnique: 'Cố ý tự hủy một phần kinh mạch để tu luyện Tàn Thi Khí, uống rượu máu để hòa nhập với ma đồ.',
    secretTokenOrSignal: 'Khắc vết đao hình hoa sen ngược trên tường các khách điếm chỉ định của Thiên Cơ Các.',
    exposureRiskLevel: 'Rất Cao (Vừa bị Huyết Lệ Ma Hoàng thử thách ép giết một gia đình tu sĩ chính đạo để chứng minh lòng trung)',
    innerConflict: 'Phải giả vờ tàn ác giết người vô tội để bảo vệ vỏ bọc, ngày đêm bị cắn rứt lương tâm và sợ hãi biến thành ác ma thật sự.',
    fatalFlaw: 'Vẫn giữ thói quen niệm Vãng Sinh Chú trong lòng sau khi kết liễu kẻ thù.'
  },

  // 3. Song Diện Gián Điệp (Double Agent)
  {
    id: 'spy_han_lanh_nguyet',
    name: 'Hàn Lãnh Nguyệt',
    disguisedRole: 'Thánh Nữ Dự Bị kiêm Ngoại Giao Sứ',
    actualLoyalty: 'Chỉ trung thành với lợi ích cá nhân & Thiên Cơ Các',
    infiltratedSect: 'Đồng thời bán tin cho cả Thái Hư Kiếm Tông và Thiên Ma Cung',
    category: 'Song Diện Gián Điệp (Double Agent)',
    missionObjective: 'Kích động xung đột toàn diện giữa Chính và Ma để trục lợi từ thị trường buôn bán bảo vật và đan dược.',
    camouflageTechnique: 'Thiên Biến Vạn Hóa Diện Cụ thượng cổ, có thể biến đổi cả giọng nói, linh căn và cốt cách.',
    secretTokenOrSignal: 'Sử dụng hồ điệp linh ảnh truyền âm tự hủy sau ba giây.',
    exposureRiskLevel: 'Cực Độ Nguy Hiểm (Cả hai bên bắt đầu phát hiện thông tin bị rò rỉ trùng khớp kỳ lạ)',
    innerConflict: 'Sống trong sự cô độc tột cùng, không dám tin tưởng bất kỳ ai và luôn chuẩn bị sẵn đường lui đào tẩu khỏi Cửu Châu.',
    fatalFlaw: 'Để lộ thói quen vuốt lọn tóc mai bên trái mỗi khi nói dối hoặc căng thẳng tột độ.'
  },

  // 4. Tử Sĩ Cài Cắm Từ Nhỏ
  {
    id: 'spy_tieu_tat_phong',
    name: 'Tiêu Tật Phong',
    disguisedRole: 'Thân Truyền Đệ Tử của Chưởng Môn',
    actualLoyalty: 'Hoang Cổ Cấm Địa Thần Tộc',
    infiltratedSect: 'Đại Bi Bát Nhã Tự',
    category: 'Tử Sĩ Cài Cắm Từ Nhỏ',
    missionObjective: 'Chờ đợi hiệu lệnh thiên cổ để mở cửa Trấn Ma Tháp giải thoát Thượng Cổ Tà Hoàng.',
    camouflageTechnique: 'Được tẩy não và phong ấn ký ức từ khi 3 tuổi, chỉ thức tỉnh khi nghe đoạn mật chú đặc thù.',
    secretTokenOrSignal: 'Đốt cây hương đen làm từ xương Dạ Xoa dưới ánh trăng máu.',
    exposureRiskLevel: 'Thấp (Được Chưởng Môn vô cùng tin yêu và dự kiến truyền lại y bát)',
    innerConflict: 'Sau khi ký ức thức tỉnh, hắn đau đớn nhận ra vị sư phụ nuôi nấng mình chính là người hắn phải tự tay ám sát.',
    fatalFlaw: 'Một vết bớt hình vuốt rồng đen ở sau gáy sẽ rực sáng khi đến gần di vật trấn áp ma vật.'
  },

  // 5. Bị Khống Chế Hồn Phách
  {
    id: 'spy_mac_van_ky',
    name: 'Mạc Vấn Kỳ',
    disguisedRole: 'Tàng Kinh Các Thủ Hộ Trưởng Lão',
    actualLoyalty: 'Âm Sát Quỷ Vương Tông (Bị gieo Phệ Hồn Cổ Trùng)',
    infiltratedSect: 'Cửu Thiên Huyền Nữ Cung',
    category: 'Bị Khống Chế Hồn Phách',
    missionObjective: 'Sao chép bí tịch Thập Nhị Cửu Thiên Băng Phách Trận và cung cấp sơ đồ tuần tra ban đêm.',
    camouflageTechnique: 'Bản thân hắn không hề muốn phản bội; chỉ khi cổ trùng trong não phát tác hắn mới mất ý thức và hành động như con rối.',
    secretTokenOrSignal: 'Gửi mật thư giấu trong bụng cá tuyết đem bán cho các phường thị dưới chân núi.',
    exposureRiskLevel: 'Trung Bình (Đồng môn nhận thấy tính khí hắn thất thường, hay mất trí nhớ cục bộ)',
    innerConflict: 'Mỗi lần tỉnh lại sau cơn khống chế, hắn kinh hoàng nhìn thấy bằng chứng tội lỗi của chính mình nhưng không dám thú nhận vì sợ cổ trùng cắn nát não.',
    fatalFlaw: 'Đồng tử mắt sẽ chuyển sang màu xanh lục ma quái mỗi khi bị cổ trùng chiếm quyền điều khiển.'
  },

  // 6. Mật Thám Thiên Cơ Các
  {
    id: 'spy_to_thanh_tuyet',
    name: 'Tô Thanh Tuyết',
    disguisedRole: 'Tú Bà Đệ Nhất Kỹ Viện Tiên Thành',
    actualLoyalty: 'Thiên Cơ Các (Ám Dạ Vọng Khí Ty)',
    infiltratedSect: 'Tiên Lạc Phường • Vạn Bảo Tiên Thành',
    category: 'Điệp Viên Thu Thập Tình Báo Tự Do',
    missionObjective: 'Thu thập bí mật đời tư, thâm thù ân oán và tu vi ẩn giấu của các đại lão khi họ lui tới uống rượu hưởng lạc.',
    camouflageTechnique: 'Mê Hồn Đàn Hương và Cầm Âm Vấn Tâm Thuật, khiến người nghe vô thức thổ lộ bí mật sâu kín nhất.',
    secretTokenOrSignal: 'Ghi chép bằng mật mã bát quái trên quạt xếp lụa trắng.',
    exposureRiskLevel: 'Thấp (Được xem là chốn phong lưu không ai nghi ngờ có thám tử cấp cao)',
    innerConflict: 'Nhìn thấu mọi sự giả tạo và dơ bẩn của tu chân giới, sinh lòng chán ghét hồng trần muốn quy ẩn sơn lâm.',
    fatalFlaw: 'Cực kỳ nhạy cảm với mùi chu sa, ngửi thấy sẽ hắt hơi liên tục làm gián đoạn tiếng đàn mê hồn.'
  }
];
