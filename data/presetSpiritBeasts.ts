import { SpiritBeastItem, BeastTamingMethod, BeastEcologyTerritory } from '../types';

export const PRESET_SPIRIT_BEASTS: SpiritBeastItem[] = [
  // 1. Phàm Thú / Dã Thú
  {
    id: 'beast_tuyet_dia_lang',
    name: 'Tuyết Phong Ngân Lang',
    species: 'Dã Thú Bắc Cực Chủng',
    bloodlineTier: 'Phàm Thú / Dã Thú (Chưa Khai Trí)',
    realmTier: 'Nhất Giai (Sơ Khai Luyện Khí)',
    element: 'Băng Hàn & Phong',
    habitat: 'Tuyết Sơn vạn trượng vùng Cực Bắc',
    appearance: 'Lông trắng muốt hòa vào tuyết, mắt xanh ngọc bích, răng nanh sắc như dao găm.',
    innateAbilities: [
      { name: 'Tuyết Ẩn', description: 'Ẩn mình hoàn toàn trong bão tuyết, không phát ra tiếng động.' },
      { name: 'Băng Trảo', description: 'Móng vuốt phủ lớp băng cứng xé toạc da thịt con mồi.' }
    ],
    combatRole: 'Tiên Phong Cận Chiến',
    temperament: 'Hung hãn theo bầy đàn, phục tùng kẻ mạnh nhất.',
    contractType: 'Chủ Nô Linh Khế (Nắm Giữ Mệnh Hồn / Tuyệt Đối Phục Tùng)',
    evolutionPath: 'Ăn Băng Tinh Thảo kết hợp tôi luyện trong bão tuyết để tiến hóa thành Băng Phách Yêu Lang.',
    backstory: 'Loài dã thú bản địa vùng cực hàn, thường được các đệ tử ngoại môn thuần hóa làm tọa kỵ trinh sát.'
  },

  // 2. Linh Thú / Yêu Thú Thường
  {
    id: 'beast_xich_diem_ho',
    name: 'Xích Diễm Ma Hổ',
    species: 'Liệt Diễm Thú Hệ',
    bloodlineTier: 'Linh Thú / Yêu Thú Thường (Hạ - Trung - Thượng Phẩm)',
    realmTier: 'Nhị Giai (Thông Linh Trúc Cơ)',
    element: 'Liệt Hỏa & Cuồng Bạo',
    habitat: 'Khu rừng quanh miệng núi lửa đang hoạt động',
    appearance: 'Thân dài hai trượng, bộ lông vằn đỏ rực như than hồng cháy dở, đuôi như roi sắt bốc lửa.',
    innateAbilities: [
      { name: 'Liệt Diễm Phún Phác', description: 'Phun ra cột lửa dài mười trượng thiêu rụi cây cối và kẻ thù.' },
      { name: 'Hổ Khiếu Chấn Hồn', description: 'Tiếng gầm thét làm tê liệt thần thức tu sĩ cấp thấp trong ba nhịp thở.' }
    ],
    combatRole: 'Tiên Phong Cận Chiến',
    temperament: 'Bá đạo cuồng bạo, thích săn mồi đơn độc.',
    contractType: 'Bình Đẳng Huyết Khế (Cùng Sinh Cùng Tử / Chia Sẻ Tu Vi)',
    evolutionPath: 'Nuốt Địa Tâm Chân Hỏa Chi để đột phá Tam Giai ngưng tụ Yêu Đan.',
    backstory: 'Chúa tể một phương trong Hỏa Diễm Sơn Mạch, được một vị tán tu thu phục sau trận chiến sinh tử.'
  },

  // 3. Biến Dị Yêu Thú / Dị Chủng Thượng Cổ
  {
    id: 'beast_tu_tieu_loi_bao',
    name: 'Tử Tiêu Ma Lôi Báo',
    species: 'Lôi Đình Biến Dị Chủng',
    bloodlineTier: 'Biến Dị Yêu Thú / Dị Chủng Thượng Cổ',
    realmTier: 'Tam Giai (Ngưng Đan Kết Tinh)',
    element: 'Tử Tiêu Thần Lôi & Tốc Độ Cực Hạn',
    habitat: 'Vách đá Lôi Phong Hẻm quanh năm sét đánh',
    appearance: 'Thân hình thon dài dẻo dai, lông đen nhánh phát ra ánh sét tím ma mị, mắt như hai đốm lôi hỏa.',
    innateAbilities: [
      { name: 'Tử Tiêu Lôi Thiểm', description: 'Thuấn di tốc độ cực hạn trong phạm vi trăm trượng như tia sét tím.' },
      { name: 'Diệt Ma Lôi Trảo', description: 'Móng vuốt ngưng tụ lôi đình phá hủy cương khí hộ thể đối phương.' }
    ],
    combatRole: 'Trinh Sát & Ảo Thuật',
    temperament: 'Lạnh lùng, cảnh giác cao độ nhưng cực kỳ trung thành với người cứu mạng nó.',
    contractType: 'Bình Đẳng Huyết Khế (Cùng Sinh Cùng Tử / Chia Sẻ Tu Vi)',
    evolutionPath: 'Nuốt Lôi Tinh Chi Tủy và Hóa Hình Đan để độ kiếp hóa thành Lôi Miêu Thiếu Nữ.',
    backstory: 'Được nhân vật chính cứu thoát khỏi lồng sắt đấu thú trường của Tiên Thương Hội.'
  },

  // 4. Vương Huyết Yêu Thú (Hậu Duệ Thần Thú / Giao Long)
  {
    id: 'beast_bich_hai_giao_long',
    name: 'Bích Hải Mặc Giao Long',
    species: 'Chân Long Hậu Duệ (Giao Long Tộc)',
    bloodlineTier: 'Vương Huyết Yêu Thú (Hậu Duệ Thần Thú / Giao Long / Phượng Điểu)',
    realmTier: 'Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)',
    element: 'Bích Thủy & Chân Long Uy Áp',
    habitat: 'Đáy Vực Thâm Uyên Bắc Hải',
    appearance: 'Dài ba mươi trượng, vảy đen ánh lam cứng như bảo khí, trên đầu mọc một sừng rồng nhọn hoắt, râu rồng lượn sóng.',
    innateAbilities: [
      { name: 'Giao Long Thao Thiên', description: 'Triệu hồi đại hồng thủy nhấn chìm cả một tông môn thành quách.' },
      { name: 'Long Tức Băng Phong', description: 'Hơi thở rồng đông cứng ngàn dặm mặt biển.' },
      { name: 'Long Lân Hộ Thể', description: 'Phản chấn 50% sát thương đao kiếm pháp bảo.' }
    ],
    combatRole: 'Hộ Vệ & Khiên Chắn',
    temperament: 'Kiêu ngạo, coi thường phàm nhân, chỉ khuất phục trước chân long huyết mạch hoặc cường giả đại năng.',
    contractType: 'Cộng Sinh Huyết Mạch (Dung Hợp Thần Thông / Nhân Thú Hợp Nhất)',
    evolutionPath: 'Vượt qua Cửu Cửu Thiên Kiếp lột xác bỏ sừng mọc hai sừng Chân Long hóa thành Ngũ Trảo Kim Long.',
    backstory: 'Hộ quốc linh thú ngàn năm của Đại Càn Tiên Triều, phong ấn một nửa huyết mạch cổ.'
  },
  {
    id: 'beast_cuu_vi_thien_ho',
    name: 'Cửu Vĩ Linh Hồ',
    species: 'Thượng Cổ Linh Hồ Vương Tộc',
    bloodlineTier: 'Vương Huyết Yêu Thú (Hậu Duệ Thần Thú / Giao Long / Phượng Điểu)',
    realmTier: 'Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)',
    element: 'Huyễn Cảnh & Thần Niệm',
    habitat: 'Thanh Khâu Bí Cảnh hoa đào nở rộ',
    appearance: 'Bộ lông trắng tuyết không một hạt bụi, chín chiếc đuôi bồng bềnh như mây, mắt đa tình huyễn hoặc.',
    innateAbilities: [
      { name: 'Thanh Khâu Huyễn Giới', description: 'Kéo thần thức kẻ thù vào mộng cảnh vĩnh hằng không thể thoát.' },
      { name: 'Cửu Mệnh Hộ Thân', description: 'Có thể hy sinh một đuôi để thế mạng khi bị đòn chí mạng.' }
    ],
    combatRole: 'Trinh Sát & Ảo Thuật',
    temperament: 'Thông minh tuyệt đỉnh, giảo hoạt nhưng trọng ân nghĩa thâm sâu.',
    contractType: 'Bình Đẳng Huyết Khế (Cùng Sinh Cùng Tử / Chia Sẻ Tu Vi)',
    evolutionPath: 'Ngộ đạo dưới Bồ Đề Thụ ngàn năm để hóa hình thành Tuyệt Sắc Yêu Tiên.',
    backstory: 'Linh hồ mồ côi được nhân vật chính chia sẻ linh đan cứu sống từ nhỏ.'
  },

  // 5. Thuần Huyết Thần Thú (Tứ Linh & Côn Bằng)
  {
    id: 'beast_thai_co_con_bang',
    name: 'Thái Cổ Côn Bằng',
    species: 'Thần Thú Tối Cao (Bắc Minh Ngư / Cửu Thiên Bằng)',
    bloodlineTier: 'Thuần Huyết Thần Thú (Tứ Linh: Long - Hổ - Tước - Vũ / Côn Bằng / Kỳ Lân)',
    realmTier: 'Lục Giai / Thất Giai (Yêu Hoàng Thống Lĩnh - Luyện Hư / Hợp Thể)',
    element: 'Không Gian & Phong Thủy Lưỡng Cực',
    habitat: 'Hư Không Vô Tận & Biển Bắc Minh',
    appearance: 'Dưới nước hóa làm Côn to ngàn dặm như hòn đảo di động; bay lên trời hóa làm Bằng cánh rợp trời xanh, vỗ cánh một cái bay chín vạn dặm.',
    innateAbilities: [
      { name: 'Côn Bằng Cửu Biến', description: 'Xuyên toa không gian, phá vỡ mọi cấm chế trận pháp giới vực.' },
      { name: 'Âm Dương Thôn Thiên', description: 'Miệng há ra nuốt chửng cả hòn đảo và vạn cân linh khí.' }
    ],
    combatRole: 'Tọa Kỵ Phi Hành',
    temperament: 'Hùng vĩ bao la, siêu nhiên thế ngoại, không màng phàm trần thế tục.',
    contractType: 'Hộ Tông / Hộ Đạo Thần Thú Khế (Thủ Hộ Viễn Cổ)',
    evolutionPath: 'Lĩnh ngộ Khởi Nguyên Hỗn Độn để đạt đến cảnh giới Hỗn Độn Thần Linh.',
    backstory: 'Trấn thủ giới bích của Nhân Tộc từ thời Thượng Cổ Phong Thần, ký kết khế ước cùng Hộ Đạo Giả.'
  },
  {
    id: 'beast_bat_tu_hoa_phung',
    name: 'Bất Tử Chu Tước Thần Điểu',
    species: 'Tứ Đại Thần Thú (Hỏa Chi Thánh Linh)',
    bloodlineTier: 'Thuần Huyết Thần Thú (Tứ Linh: Long - Hổ - Tước - Vũ / Côn Bằng / Kỳ Lân)',
    realmTier: 'Ngũ Giai (Yêu Vương Hoàn Toàn Hóa Người - Hóa Thần)',
    element: 'Nam Minh Ly Hỏa & Bất Tử Niết Bàn',
    habitat: 'Đỉnh núi lửa Bất Tử Ngô Đồng Thụ',
    appearance: 'Bộ lông rực lửa bảy màu phát sáng ngút trời, đuôi phụng dài uyển chuyển, vương miện hoàng gia tỏa ánh kim quang.',
    innateAbilities: [
      { name: 'Nam Minh Ly Hỏa', description: 'Ngọn lửa thần thánh không thể dập tắt bằng nước thường, thiêu đốt cả nguyên thần.' },
      { name: 'Niết Bàn Trùng Sinh', description: 'Khi chết tự đốt cháy thành quả cầu lửa rồi tái sinh trong tro tàn với tu vi cao hơn.' }
    ],
    combatRole: 'Pháp Thuật Oanh Tạc',
    temperament: 'Cao quý thanh khiết, chỉ đậu trên cây ngô đồng, chỉ uống nước cam lộ.',
    contractType: 'Cộng Sinh Huyết Mạch (Dung Hợp Thần Thông / Nhân Thú Hợp Nhất)',
    evolutionPath: 'Dung hợp Thái Sơ Chân Hỏa đạt cảnh giới Chân Linh Thái Cổ.',
    backstory: 'Tàn hồn thần điểu ngủ say trong quả trứng phượng hoàng, được chân hỏa của nhân vật chính đánh thức.'
  },

  // 6. Hồng Hoang Hung Thú & Hỗn Độn Ma Thú
  {
    id: 'beast_thao_thiet_hung_thu',
    name: 'Thôn Thiên Thao Thiết',
    species: 'Tứ Đại Hung Thú Hồng Hoang',
    bloodlineTier: 'Hồng Hoang Hung Thú / Hỗn Độn Ma Thú (Thao Thiết / Cùng Kỳ / Hỗn Độn)',
    realmTier: 'Bát Giai / Cửu Giai (Yêu Đế / Yêu Thần Cực Đạo - Đại Thừa / Độ Kiếp)',
    element: 'Thôn Phệ Quy Tắc & Hỗn Độn Hắc Ám',
    habitat: 'Hư Không Quy Khư đáy cùng của vũ trụ',
    appearance: 'Đầu to mắt dưới nách, răng nanh như kiếm sắc, bụng như hắc động vô đáy nuốt chửng ánh sáng.',
    innateAbilities: [
      { name: 'Thôn Thiên Phệ Địa', description: 'Nuốt chửng mặt trời, mặt trăng, pháp bảo, linh đan và tu vi của đối thủ chuyển hóa thành bản thân.' },
      { name: 'Hung Sát Uy Áp', description: 'Uy áp tuyệt đối khiến vạn thú quỳ lạy run rẩy không dám ngẩng đầu.' }
    ],
    combatRole: 'Tiên Phong Cận Chiến',
    temperament: 'Tham lam khát máu vô tận, không bao giờ biết no, tính tình cổ quái tàn bạo.',
    contractType: 'Chủ Nô Linh Khế (Nắm Giữ Mệnh Hồn / Tuyệt Đối Phục Tùng)',
    evolutionPath: 'Đỉnh cao hỗn độn hung thần, vạn cổ bất diệt.',
    backstory: 'Bị Cổ Đế dùng chín cây xích sắt Thần Kim phong ấn dưới đáy Hắc Uyên mười vạn năm.'
  }
];

export const PRESET_TAMING_METHODS: BeastTamingMethod[] = [
  {
    id: 'tame_binh_dang_huyet_khe',
    name: 'Bình Đẳng Huyết Khế Thuật',
    contractType: 'Bình Đẳng Huyết Khế (Cùng Sinh Cùng Tử / Chia Sẻ Tu Vi)',
    description: 'Hai bên tự nguyện trao đổi một giọt Bản Mệnh Tinh Huyết, cùng đọc cổ chú thiên địa làm chứng. Linh thú và chủ nhân có địa vị ngang hàng, cùng chia sẻ thọ nguyên và cảm nhận tâm linh.',
    ritualSteps: [
      'Hai bên đứng trong Vạn Linh Trận pháp, thanh tẩy tâm thần.',
      'Mỗi bên trích xuất một giọt tâm đầu huyết ngưng tụ giữa không trung.',
      'Dùng chân khí vẽ nên Đạo Văn Khế Ước hòa quyện hai giọt máu vào nhau.',
      'Mỗi bên nuốt ngược giọt máu đã dung hợp vào đan điền.',
      'Thiên địa quy tắc giáng hạ linh quang xác lập khế ước vĩnh cửu.'
    ],
    requiredItems: ['Định Hồn Đan', 'Vạn Linh Hương', 'Ngọc Trận Bàn'],
    prosAndCons: {
      pros: 'Độ trung thành tuyệt đối 100%, có thể chia sẻ linh lực chiến đấu vượt cấp, không bao giờ bị phản phệ cắn trả.',
      cons: 'Nếu một bên tử trận, bên còn lại sẽ bị trọng thương hoặc giảm thọ mệnh tương ứng.',
      backfireDanger: 'Nếu ép buộc ký kết khi thú chưa phục, khế ước sẽ nổ tung làm nứt vỡ thần hồn cả hai.'
    }
  },
  {
    id: 'tame_chu_no_linh_khe',
    name: 'Ngự Thú Tông Cưỡng Chế Nô Dịch Ấn',
    contractType: 'Chủ Nô Linh Khế (Nắm Giữ Mệnh Hồn / Tuyệt Đối Phục Tùng)',
    description: 'Dùng thần thức cường đại ép bức yêu thú giao ra một tia Mệnh Hồn Chân Linh, phong ấn vào Ngự Thú Bài hoặc Thần Niệm Hải. Chỉ cần chủ nhân nhất niệm, yêu thú lập tức hồn phi phách tán.',
    ritualSteps: [
      'Dùng đại trận hoặc vũ lực đánh trọng thương, trấn áp yêu thú khuất phục.',
      'Thi triển Tác Hồn Trảo cưỡng chế rút một tia mệnh hồn từ mi tâm yêu thú.',
      'Khắc Mệnh Hồn Ấn Ký vào Ngự Thú Lệnh Bài.',
      'Khóa xích tinh thần vào thức hải của yêu thú.'
    ],
    requiredItems: ['Ngự Thú Lệnh Bài', 'Tỏa Hồn Thiết Xích', 'Định Thần Phù'],
    prosAndCons: {
      pros: 'Tuyệt đối phục tùng mệnh lệnh, có thể ra lệnh làm vật chắn bia đỡ đạn hoặc tự bạo.',
      cons: 'Linh thú mang lòng oán hận, không thể phát huy 100% tiềm năng, tốc độ tu luyện chậm chạp.',
      backfireDanger: 'Nếu thần thức chủ nhân bị suy yếu hoặc yêu thú đột phá cảnh giới cao hơn, nó sẽ lập tức cắn trả đoạt xá chủ nhân.'
    }
  },
  {
    id: 'tame_cong_sinh_huyet_mach',
    name: 'Cộng Sinh Huyết Mạch Dung Hợp Quyết',
    contractType: 'Cộng Sinh Huyết Mạch (Dung Hợp Thần Thông / Nhân Thú Hợp Nhất)',
    description: 'Chí cao ngự thú thuật của Yêu Thần Tông: Chủ nhân và thú sủng hòa quyện huyết mạch, chủ nhân có thể thi triển thần thông của linh thú (mọc cánh rồng, móng hổ, lôi đình), linh thú mượn đan điền chủ nhân đẩy nhanh tốc độ hóa hình.',
    ritualSteps: [
      'Ngâm mình trong Dược Tuyền bách thảo cùng linh thú suốt 49 ngày.',
      'Khai mở huyệt đạo liên kết kinh mạch nhân - thú đồng điệu.',
      'Hoán đổi 30% huyết mạch tinh hoa tạo thành Huyết Mạch Ôn Đan.',
      'Kích hoạt trạng thái Nhân Thú Hợp Nhất đầu tiên.'
    ],
    requiredItems: ['Hóa Huyết Linh Đan', 'Thượng Cổ Huyết Trì', 'Long Huyết Chi'],
    prosAndCons: {
      pros: 'Chiến lực bùng nổ gấp bội, nhân vật chính có thể biến thân chiến đấu nửa người nửa thú bá đạo.',
      cons: 'Đòi hỏi sự đồng điệu tâm hồn cực cao, quá trình dung hợp đau đớn như róc xương bẻ tủy.',
      backfireDanger: 'Dễ bị thú tính áp chế nhân tính dẫn đến hóa dã thú cuồng loạn mất tự chủ.'
    }
  },
  {
    id: 'tame_ho_tong_minh_uoc',
    name: 'Vạn Cổ Hộ Tông Thần Thú Minh Ước',
    contractType: 'Hộ Tông / Hộ Đạo Thần Thú Khế (Thủ Hộ Viễn Cổ)',
    description: 'Minh ước trang trọng giữa tông môn tối thượng và Thần Thú viễn cổ; tông môn phụng dưỡng linh dược thiên tài địa bảo hàng năm, Thần Thú trấn thủ sơn môn qua vạn kiếp, khi tông môn đứng trước nguy cơ diệt vong sẽ ra tay hủy diệt địch nhân.',
    ritualSteps: [
      'Toàn thể Chưởng Môn, Thái Thượng Trưởng Lão tề tựu trước Tế Thiên Thần Đài.',
      'Dâng lên 99 đóa Vạn Niên Tuyết Liên và huyết nhục yêu thú thượng cổ làm tế lễ.',
      'Khắc họa Hộ Sơn Thần Thú Đại Trận nối liền với địa mạch sơn môn.',
      'Thần Thú lưu lại một đạo Linh Niệm trên Thần Thú Lệnh Bài của tông môn.'
    ],
    requiredItems: ['Thần Thú Tế Văn Cổ Quyển', 'Cửu Phẩm Hộ Mệnh Đan', 'Địa Mạch Tinh Thạch'],
    prosAndCons: {
      pros: 'Mang lại sự bảo hộ tuyệt đối trước các đại thế lực xâm lược, tăng uy danh tông môn chấn nhiếp chư thiên.',
      cons: 'Tiêu tốn nguồn tài nguyên linh thảo linh đan khổng lồ của tông môn mỗi giáp (60 năm).',
      backfireDanger: 'Nếu tông môn thất hứa hoặc sa sút không đủ cung phụng, Thần Thú sẽ rời đi hoặc trừng phạt sơn môn.'
    }
  }
];

export const PRESET_ECOLOGY_TERRITORIES: BeastEcologyTerritory[] = [
  {
    id: 'eco_thap_van_dai_son',
    name: 'Thập Vạn Đại Sơn',
    dangerLevel: 'Tuyệt Cấm Chi Vực',
    dominantSpecies: 'Yêu Lang, Hắc Hùng, Kim Sí Đại Bằng, Cổ Xà',
    landscapeDescription: 'Dãy núi trập trùng mười vạn ngọn, quanh năm mây mù độc chướng dày đặc che khuất ánh mặt trời, cây cổ thụ nghìn trượng đan xen nhau thành biển rừng u tối.',
    naturalResources: 'Cửu Diệp Hồi Hồn Thảo, Ngàn Năm Huyết Sâm, Quặng Thạch Thái Ất Canh Kim',
    legendOrMystery: 'Tương truyền sâu trong tâm sơn có Yêu Đế Cổ Mộ phong ấn Thượng Cổ Ma Viên, tu sĩ dưới Nguyên Anh Kỳ tiến vào cửu tử nhất sinh.'
  },
  {
    id: 'eco_bac_hai_tham_uyen',
    name: 'Bắc Hải Thâm Uyên',
    dangerLevel: 'Tử Địa',
    dominantSpecies: 'Bích Thủy Giao Long, Cự Kình Bắc Minh, Băng Tinh Thủy Quái',
    landscapeDescription: 'Vùng biển băng giá vạn trượng quanh năm bão tuyết gầm thét, mặt biển nổi những tảng băng trôi ngàn năm, đáy vực tối đen như mực chứa đầy xoáy nước nuốt chửng hư không.',
    naturalResources: 'Vạn Niên Huyền Băng Tinh, Long Tủy Chi Dịch, Dạ Minh Thần Châu',
    legendOrMystery: 'Nơi sinh sống của Thái Cổ Côn Bằng thời hồng hoang, dưới đáy biển có khe nứt dẫn thẳng xuống Cửu U U Minh Giới.'
  },
  {
    id: 'eco_van_yeu_coc',
    name: 'Vạn Yêu Cốc',
    dangerLevel: 'Tuyệt Cấm Chi Vực',
    dominantSpecies: 'Cửu Vĩ Linh Hồ, Thiên Yêu Lang Tộc, Ma Hổ Vương',
    landscapeDescription: 'Hẻm núi khổng lồ bị chém bởi một nhát kiếm của thần linh thời cổ, hoa đào vạn năm nở rộ trong sương khói mộng ảo, yêu khí ngưng tụ thành cầu vồng mờ ảo.',
    naturalResources: 'Thanh Khâu Linh Nhũ, Huyễn Thần Hoa, Bồ Đề Tâm Quả',
    legendOrMystery: 'Thủ phủ của Yêu Tộc có Thập Đại Yêu Vương trấn thủ, nghiêm cấm tu sĩ nhân tộc đặt chân nếu không có Yêu Vương Lệnh Bài.'
  },
  {
    id: 'eco_lac_nhat_sam_lam',
    name: 'Lạc Nhật Sâm Lâm',
    dangerLevel: 'Nguy Hiểm',
    dominantSpecies: 'Độc Giác Linh Lộc, U Hồn Điệp, Phong Linh Thú',
    landscapeDescription: 'Khu rừng nguyên sinh bạt ngàn nơi ánh hoàng hôn đỏ rực buông xuống không bao giờ tắt, suối linh tuyền trong vắt róc rách chảy qua những thảm rêu phát quang.',
    naturalResources: 'Linh Tuyền Cam Lộ, Tẩy Tủy Hoa, Phong Lôi Mộc',
    legendOrMystery: 'Nơi bắt đầu cho các đệ tử tông môn rèn luyện, nhưng càng vào sâu cây cối càng biết ăn thịt người.'
  },
  {
    id: 'eco_hoa_diem_son',
    name: 'Hỏa Diễm Sơn Mạch',
    dangerLevel: 'Tử Địa',
    dominantSpecies: 'Hỏa Tinh Cự Mãng, Xích Diễm Sư Tử, Hỏa Phụng Tàn Hồn',
    landscapeDescription: 'Vùng đất dung nham sôi sùng sục, tám trăm dặm không một ngọn cỏ, cột lửa phụt thẳng lên trời tạo thành biển lửa bất diệt.',
    naturalResources: 'Địa Tâm Hỏa Chi, Liệt Diễm Thần Sa, Niết Bàn Hỏa Tinh',
    legendOrMystery: 'Tương truyền do một mảnh lò luyện đan của Thái Thượng Lão Quân thời Khai Thiên rơi xuống trần gian tạo thành.'
  }
];
