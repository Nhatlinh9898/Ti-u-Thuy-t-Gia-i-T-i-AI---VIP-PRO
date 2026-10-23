import { PillRecipe, AlchemyCauldron, HerbGuide } from '../types';

export const PRESET_PILL_RECIPES: PillRecipe[] = [
  // 1. Đột Phá Cảnh Giới
  {
    id: 'pill_truc_co_dan',
    name: 'Cực Phẩm Trúc Cơ Đan',
    rank: 'Nhị Phẩm Linh Đan (Viên Mãn)',
    category: 'Đột Phá Cảnh Giới',
    mainHerbs: [
      { name: 'Trúc Cơ Thảo', ageRequirement: '300 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Khai thông kinh lạc và kiến tạo đan điền đạo cơ' },
      { name: 'Bách Niên Linh Nhũ', ageRequirement: '100 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Bồi dưỡng linh dịch thuần khiết' },
      { name: 'Ngưng Huyết Chi', ageRequirement: '200 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Ổn định huyết khí, tránh kinh mạch rạn nứt' },
      { name: 'Thanh Linh Hoa', ageRequirement: '50 năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Dẫn khí tức thanh lương chạy vòng chu thiên' }
    ],
    effects: 'Gia tăng 95% cơ hội Trúc Cơ thành công, mở rộng đan điền gấp ba lần, đúc nên Thiên Đạo Trúc Cơ vô hạ.',
    refiningKeynotes: 'Lúc trích xuất thảo dược dùng Vũ Hỏa nhanh, khi dung hợp dược dịch hạ lửa thành Văn Hỏa, dùng thần thức khóa chặt dược lực tránh bay hơi.',
    fireControl: 'Văn hỏa ôn dưỡng 7 ngày, vũ hỏa thu đan 3 canh giờ.',
    pillAroma: 'Hương thơm như lan rừng nở rộ ngào ngạt, hít vào một hơi làm kinh mạch toàn thân thư thái.',
    phenomenon: 'Phòng luyện đan tỏa ra sương mù xanh biếc, trên nắp đỉnh ngưng tụ ba đóa linh vân nhỏ.',
    sideEffects: 'Người có đan điền tàn khuyết uống vào có thể bị trướng đau kinh mạch dữ dội trong ba canh giờ.',
    drugResistance: 'Chỉ hiệu quả cao nhất ở 3 viên đầu tiên, uống nhiều đan độc tích tụ.'
  },
  {
    id: 'pill_nguyen_anh_hoa_than',
    name: 'Cửu Khiếu Hóa Thần Đan',
    rank: 'Tứ Phẩm Thần Đan',
    category: 'Đột Phá Cảnh Giới',
    mainHerbs: [
      { name: 'Hóa Thần Chi', ageRequirement: '2000 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Hóa thai thành thần, phá vỡ gông cùm nhục thân' },
      { name: 'Thiên Hồn Tinh Hoa', ageRequirement: '1000 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Ngưng tụ thần niệm pháp tướng' },
      { name: 'Tử Tiêu Lôi Tinh Thạch', ageRequirement: '800 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Dùng lôi tính áp chế tạp chất trong hồn phách' },
      { name: 'Ngũ Hành Tố Khí Đằng', ageRequirement: '600 năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Liên kết ngũ hành kinh mạch tương sinh' }
    ],
    effects: 'Giúp tu sĩ Nguyên Anh Viên Mãn phá vỡ bình cảnh bước vào Hóa Thần Kỳ, ngưng tụ Hóa Thần Pháp Tướng, tăng 80% tỷ lệ đột phá.',
    refiningKeynotes: 'Bắt buộc dẫn dắt Thiên Lôi Kiếp lúc thành đan để tôi luyện chín khiếu trên viên đan.',
    fireControl: 'Dùng Dị Hỏa dung hợp, mượn lôi đình thiên kiếp thay thế vũ hỏa phong đỉnh.',
    pillAroma: 'Hương thanh khiết uy nghiêm, mang theo lôi đình uy áp nhàn nhạt chấn nhiếp ma tà.',
    phenomenon: 'Mây sấm sét tím sẫm tụ lại đỉnh núi, chín đạo lôi đình đánh xuống đan đỉnh không nát.',
    sideEffects: 'Nếu tâm cảnh không vững dễ sinh tâm ma lúc dược lực phá vỡ thần thức.',
    drugResistance: 'Mỗi đại cảnh giới chỉ được dùng 1 viên duy nhất.'
  },

  // 2. Tẩy Tủy Phạt Mao
  {
    id: 'pill_tay_tuy_phat_mao',
    name: 'Thái Hư Tẩy Tủy Tịnh Thân Đan',
    rank: 'Tam Phẩm Thượng Phẩm',
    category: 'Tẩy Tủy Phạt Mao',
    mainHerbs: [
      { name: 'Tẩy Tủy Kim Liên', ageRequirement: '800 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Róc xương phạt tủy, bài tiết cặn bã tiên thiên' },
      { name: 'Huyền Băng Linh Dịch', ageRequirement: '500 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Làm dịu cơn sốt cực nhiệt trong tủy' },
      { name: 'Đại Địa Huyết Sâm', ageRequirement: '600 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Bổ sung khí huyết thiếu hụt tức thì' },
      { name: 'Thông Mạch Đằng', ageRequirement: '300 năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Khai thông 108 kỳ kinh bát mạch' }
    ],
    effects: 'Thanh lọc toàn bộ tạp chất trong tủy xương và kinh mạch, nâng cấp phẩm chất linh căn, đúc tạo Tiên Thiên Ngọc Cốt.',
    refiningKeynotes: 'Nấu dược dịch ở nhiệt độ cực cao trong 7 ngày rồi dùng hàn khí ngâm lạnh đột ngột để giữ độ tinh khiết.',
    fireControl: 'Hỏa diễm cực nhiệt chuyển lạnh đột ngột (Âm Dương giao hỏa).',
    pillAroma: 'Mùi thảo dược nồng đậm xen lẫn vị ngọt ngào băng lãnh.',
    phenomenon: 'Xung quanh lò kết thành một lớp băng sương trắng xóa nhưng phát ra ánh kim sắc ấm áp.',
    sideEffects: 'Toàn thân bài tiết ra chất nhờn đen hôi thối, đau đớn như bị ngàn mũi dao róc xương trong 12 canh giờ.',
    drugResistance: 'Chỉ có tác dụng 1 lần duy nhất trong đời tu sĩ.'
  },
  {
    id: 'pill_bang_co_ngoc_cot',
    name: 'Băng Cơ Ngọc Cốt Đan',
    rank: 'Tứ Phẩm Cực Phẩm',
    category: 'Tẩy Tủy Phạt Mao',
    mainHerbs: [
      { name: 'Vạn Niên Tuyết Liên', ageRequirement: '1200 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Tôi luyện da thịt trắng như ngọc, bất xâm hàn nhiệt' },
      { name: 'Huyền Quy Giáp Phấn', ageRequirement: '800 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Tăng cường mật độ xương và độ dẻo dai' },
      { name: 'Bách Hoa Ngọc Nhũ', ageRequirement: '300 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Giữ ẩm và tránh hoại tử mô cơ' },
      { name: 'Băng Tinh Thảo', ageRequirement: '400 năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Dẫn hàn khí thuần khiết vào sâu tủy sống' }
    ],
    effects: 'Chuyển hóa phàm thể thành Băng Cơ Ngọc Cốt, tăng 300% khả năng chống đỡ đao kiếm ngoại lực và độc chướng.',
    refiningKeynotes: 'Phải luyện chế trong đỉnh bằng băng ngọc, tuyệt đối không để hỏa khí bám vào dược dịch.',
    fireControl: 'Thủy luyện băng diễm hoặc Cực Âm Chi Hỏa.',
    pillAroma: 'Thanh khiết mát lạnh thấu xương, ngửi một hơi tâm thần thanh tịnh.',
    phenomenon: 'Hơi sương mờ ảo bao phủ, kết tụ thành hình dạng chim phượng hoàng tuyết bay lượn.',
    sideEffects: 'Cơ thể bị đông cứng tạm thời trong 3 ngày, tim đập chậm lại như chết giả.',
    drugResistance: 'Dùng tối đa 2 viên.'
  },

  // 3. Chữa Thương & Hồi Hồn
  {
    id: 'pill_cuu_chuyen_hoi_hon',
    name: 'Cửu Chuyển Hoàn Hồn Tục Mệnh Đan',
    rank: 'Lục Phẩm Tiên Đan (Cực Phẩm)',
    category: 'Chữa Thương & Hồi Hồn',
    mainHerbs: [
      { name: 'Cửu Diệp Hồi Hồn Thảo', ageRequirement: '3000 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Khóa chặt tam hồn thất phách, kéo người từ cõi chết trở về' },
      { name: 'Hoàng Tuyền Bích Lạc Quả', ageRequirement: '1500 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Chặn đứng tử khí U Minh, đảo ngược sinh tử' },
      { name: 'Long Tủy Linh Tinh', ageRequirement: '5000 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Tái tạo phủ tạng và xương cốt tan nát' },
      { name: 'Thái Cực Âm Dương Dịch', ageRequirement: 'Ngàn năm ngưng tụ', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Cân bằng sinh mệnh chi khí luân chuyển' }
    ],
    effects: 'Dù nhục thân vỡ nát, chỉ cần còn một tia tàn niệm cũng có thể tụ hồn tái sinh, khôi phục 100% sinh mệnh lực và đan điền.',
    refiningKeynotes: 'Cần Lục Phẩm Đan Đỉnh trở lên, trải qua Chín Chuyển Lôi Kiếp tôi luyện đan văn.',
    fireControl: 'Chín lần thay đổi Văn Hỏa - Vũ Hỏa theo quy luật Cửu Cung.',
    pillAroma: 'Xung thiên đan khí hóa thành cầu vồng chín sắc, mùi hương lan xa trăm dặm khiến hoa cỏ khô héo hồi sinh.',
    phenomenon: 'Bầu trời xuất hiện vòng xoáy sinh tử Luân Hồi, đan khí biến thành hoa sen ngũ sắc đỡ lấy đỉnh lò.',
    sideEffects: 'Uống vào sẽ rơi vào trạng thái ngủ say 49 ngày để hồn phách tái cấu trúc hoàn toàn.',
    drugResistance: 'Không bị kháng thuốc.'
  },

  // 4. Bạo Phát Tiềm Năng
  {
    id: 'pill_niet_ban_bat_diet',
    name: 'Niết Bàn Bất Diệt Đế Đan',
    rank: 'Bát Phẩm Thần Đan (Viễn Cổ)',
    category: 'Bạo Phát Tiềm Năng',
    mainHerbs: [
      { name: 'Bất Tử Phụng Huyết Tinh', ageRequirement: 'Thái Cổ truyền thừa', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Kích phát năng lượng Niết Bàn tái sinh vô tận' },
      { name: 'Thái Hư Hỗn Độn Quả', ageRequirement: '5000 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Bùng nổ tiềm năng thần thức và pháp lực gấp 10 lần' },
      { name: 'Kỳ Lân Kiếp Giáp Phấn', ageRequirement: '3000 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Bảo vệ kinh mạch không bị xé rách do quá tải' },
      { name: 'Thiên Đạo Vận Luật Chi', ageRequirement: 'Ngàn năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Đồng hóa dược lực với quy tắc vũ trụ' }
    ],
    effects: 'Trong 3 canh giờ gia tăng 1000% chiến lực, thân thể có được đặc tính Niết Bàn không thể bị hủy diệt bởi đòn đánh dưới cảnh giới Đế Cấp.',
    refiningKeynotes: 'Cần Dị Hỏa bài danh top 3 cùng Đạo Khí đỉnh lô, chịu đựng 81 đạo Hỗn Độn Thần Lôi.',
    fireControl: 'Cực Hỏa Phần Thiên không ngừng nghỉ suốt 49 ngày.',
    pillAroma: 'Mùi hương gay gắt như lửa thiêu đốt nhưng thấm sâu vào linh hồn.',
    phenomenon: 'Hư ảnh Hỏa Phượng Hoàng che rợp trời đất, đan đỉnh hóa thành màu đỏ rực trong suốt như lưu ly.',
    sideEffects: 'Sau khi hết hiệu lực rơi vào suy yếu cực độ trong 3 năm, tu vi tạm thời tụt 1 đại cảnh giới.',
    drugResistance: 'Chỉ được dùng trong tình huống sinh tử tồn vong.'
  },
  {
    id: 'pill_cuong_huyet_chien_dan',
    name: 'Cuồng Huyết Chiến Ma Đan',
    rank: 'Tam Phẩm Độc Môn Ma Đan',
    category: 'Bạo Phát Tiềm Năng',
    mainHerbs: [
      { name: 'Huyết Sát Yêu Thảo', ageRequirement: '600 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Kích thích tủy sống sinh huyết sát cuồng bạo' },
      { name: 'Bạo Liệt Hỏa Tinh Thạch', ageRequirement: '400 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Đốt cháy chân khí gia tốc tốc độ di chuyển' },
      { name: 'Tử Tâm Ma Hoa', ageRequirement: '500 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Tê liệt cảm giác đau đớn' },
      { name: 'Huyết Dẫn Đằng', ageRequirement: '200 năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Bơm máu trực tiếp vào trái tim' }
    ],
    effects: 'Tăng 300% sức mạnh công kích nhục thân và tốc độ ra đòn, hoàn toàn miễn nhiễm với đau đớn trong 1 canh giờ.',
    refiningKeynotes: 'Huyết tế 3 giọt máu tươi lúc ngưng đan để kích hoạt sát khí.',
    fireControl: 'Dùng tà hỏa hoặc ma hỏa uẩn dưỡng.',
    pillAroma: 'Mùi tanh ngọt của máu xen lẫn mùi tiêu sát ngùn ngụt.',
    phenomenon: 'Khói đỏ bốc lên cuồn cuộn có hình đầu lâu ma quỷ gầm thét.',
    sideEffects: 'Dễ mất lý trí hóa điên cuồng, sau khi thuốc tan thì kinh mạch rạn nứt nôn ra máu.',
    drugResistance: 'Dùng quá 3 viên sẽ tẩu hỏa nhập ma hoàn toàn.'
  },

  // 5. Thọ Mệnh Duyên Thọ & Độc Đan
  {
    id: 'pill_van_tho_truong_sinh',
    name: 'Vạn Thọ Vô Cương Tiên Đan',
    rank: 'Ngũ Phẩm Thọ Đan',
    category: 'Thọ Mệnh Duyên Thọ',
    mainHerbs: [
      { name: 'Trường Sinh Thần Thụ Quả', ageRequirement: '3000 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Bổ sung thọ nguyên sinh cơ nguyên thủy' },
      { name: 'Quy Giáp Vạn Niên Tủy', ageRequirement: '2000 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Làm chậm tốc độ suy lão của tế bào' },
      { name: 'Thanh Mộc Tinh Hoa', ageRequirement: '1000 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Hòa hoãn dòng chảy sinh mệnh êm ả' },
      { name: 'Sinh Mệnh Chi Tuyền', ageRequirement: 'Linh tuyền cổ tích', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Thấm nhuần vào đan điền ngũ tạng' }
    ],
    effects: 'Gia tăng trực tiếp 800 năm thọ mệnh nguyên dương, phục hồi dung nhan thời trẻ tuổi.',
    refiningKeynotes: 'Luyện chế tuyệt đối không được sinh khói khét, đan khí thoát ra phải gom trọn vào bình ngọc.',
    fireControl: 'Văn Hỏa liên tục suốt 36 ngày đêm.',
    pillAroma: 'Thanh thuần dịu ngọt như mật ong rừng ngàn năm.',
    phenomenon: 'Hạc tiên bay lượn trên đan phòng, mây lành phủ kín bảo tháp.',
    sideEffects: 'Không có tác dụng phụ xấu.',
    drugResistance: 'Viên thứ nhất tăng 800 năm, viên thứ hai tăng 300 năm, viên thứ ba vô hiệu.'
  },
  {
    id: 'pill_that_huyen_tuyet_menh',
    name: 'Thất Huyễn Đoạt Phách Độc Đan',
    rank: 'Tứ Phẩm Kỳ Độc',
    category: 'Độc Đan & Ảo Giác',
    mainHerbs: [
      { name: 'Thất Thải Huyễn Thần Nấm', ageRequirement: '800 năm', role: 'Quân Dược (Chủ đạo)', spiritualProperty: 'Khiến thần thức rơi vào 7 tầng ác mộng ảo ảnh vô tận' },
      { name: 'U Minh Đoạt Hồn Cỏ', ageRequirement: '600 năm', role: 'Thần Dược (Bổ trợ)', spiritualProperty: 'Ăn mòn nguyên thần tu sĩ' },
      { name: 'Hủ Cốt Linh Đằng', ageRequirement: '400 năm', role: 'Tá Dược (Hòa hoãn)', spiritualProperty: 'Hóa lỏng xương cốt trong âm thầm' },
      { name: 'Vô Thanh Lạc Diệp', ageRequirement: '200 năm', role: 'Sứ Dược (Dẫn mạch)', spiritualProperty: 'Không màu không mùi, tan biến vào không khí' }
    ],
    effects: 'Kẻ trúng độc sẽ rơi vào huyễn cảnh tâm ma kinh hoàng, trong vòng 7 khắc nguyên thần tự tan rã mà chết trong nụ cười.',
    refiningKeynotes: 'Đan sư phải ngậm giải độc châu và phong bế ngũ quan khi mở lò.',
    fireControl: 'Âm hỏa lạnh thấu xương luyện chế dưới bóng tối.',
    pillAroma: 'Tuyệt đối không mùi không vị, hòa tan trong linh trà hay linh khí không thể phát hiện.',
    phenomenon: 'Khói độc có màu 7 sắc cầu vồng mê hoặc lòng người lượn quanh lò.',
    sideEffects: 'Độc tính cực mạnh, chạm vào da thịt cũng có thể bị nhiễm độc nhẹ.',
    drugResistance: 'Không áp dụng.'
  }
];

export const PRESET_CAULDRONS: AlchemyCauldron[] = [
  {
    id: 'cauldron_cuu_long_xich_diem',
    name: 'Cửu Long Xích Diễm Đan Đỉnh',
    rank: 'Cổ Đỉnh',
    materials: 'Xích Đồng Ngàn Năm kết hợp Long Cốt Thượng Cổ & Vực Ngoại Hắc Thiết',
    features: 'Tự động điều tiết áp suất nội đỉnh, khắc Bát Quái Cửu Cung Trận, giảm 65% nguy cơ nổ lò (tạc đỉnh), uẩn dưỡng linh tính cho đan dược.',
    fireVentDesign: 'Cửu Long Phun Lửa tại 9 cửa Bát Quái, có thể tiếp nạp đồng thời cả Địa Mạch Chân Hỏa và Thiên Địa Dị Hỏa.',
    craftingMethod: 'Do Đan Đạo Chí Tôn khai sáng cùng Thần Khí Tông rèn đúc dưới đáy dung nham núi lửa Thái Cổ.',
    cauldronSoul: 'Xích Hỏa Long Linh thức tỉnh, gầm vang báo hiệu thời khắc giao chuyển Văn Hỏa - Vũ Hỏa.',
    forgingSteps: [
      'Bước 1: Nung chảy phôi Xích Đồng và Long Cốt dưới Địa Tâm Hỏa suốt 81 ngày',
      'Bước 2: Dập khuôn thân đỉnh tròn trịa, chạm khắc 108 đạo Cửu Cung Phù Văn tụ hỏa',
      'Bước 3: Bố trí Cửu Long Phun Lửa tại các hỏa nhãn để phân luồng khí áp',
      'Bước 4: Tôi luyện qua Vạn Niên Huyền Băng Dịch để định hình linh tính',
      'Bước 5: Nhỏ máu Long Huyết thượng cổ làm lễ Huyết Tế đánh thức Đỉnh Linh'
    ]
  },
  {
    id: 'cauldron_than_nong_bach_thao',
    name: 'Thần Nông Bách Thảo Lô',
    rank: 'Thần Khí Viễn Cổ',
    materials: 'Thái Sơ Thần Mộc & Ngũ Sắc Thần Thổ hoá thạch',
    features: 'Lò luyện mang sinh cơ bất diệt, có thể giữ lại 100% linh tính thảo dược, tự động thanh lọc đan độc và cặn bã.',
    fireVentDesign: 'Thất Tinh Tụ Hỏa Trận, lửa đi qua rễ Thần Mộc được lọc thành ngọn lửa ôn hòa thuần khiết.',
    craftingMethod: 'Vật báu truyền thừa từ thời Thượng Cổ Thần Nông Thị thị tộc.',
    cauldronSoul: 'Bách Thảo Tiên Đồng phù trợ kiểm soát dược tính.',
    forgingSteps: [
      'Bước 1: Đốn lấy rễ cây Thần Mộc ngàn trượng sinh trưởng từ thuở Khai Thiên',
      'Bước 2: Dùng Ngũ Sắc Thần Thổ bọc kín hun đúc qua Tam Muội Chân Hỏa',
      'Bước 3: Khắc họa vạn chủng thảo dược đồ án lên thành lò',
      'Bước 4: Đón nhận 49 đạo Thái Sơ Hỗn Độn Kiếp Lôi rèn luyện',
      'Bước 5: Thần Nông chân huyết điểm nhãn khai quang'
    ]
  },
  {
    id: 'cauldron_hon_don_thon_thien',
    name: 'Hỗn Độn Thôn Thiên Đỉnh',
    rank: 'Đạo Khí',
    materials: 'Hỗn Độn Huyền Thiết & Không Gian Tinh Thạch',
    features: 'Bên trong ẩn chứa không gian động thiên độc lập, có thể luyện chế cùng lúc vạn viên tiên đan hoặc nuốt chửng Dị Hỏa thiên địa.',
    fireVentDesign: 'Hỗn Độn Hắc Động Hỏa Nhãn, tự sinh lực hút điều hòa nhiệt lượng vạn vật.',
    craftingMethod: 'Do Ma Tiên Cổ Đại đúc nên trong khe nứt hư không.',
    cauldronSoul: 'Thôn Thiên Ma Thú tàn hồn bảo hộ đỉnh lò không vỡ.',
    forgingSteps: [
      'Bước 1: Bắt giữ một mảnh vụn thiên thạch Hư Không trôi dạt ngàn năm',
      'Bước 2: Dùng Hỗn Độn Chi Hỏa tôi luyện thành hình bát giác cổ kính',
      'Bước 3: Khắc ấn Không Gian Giới Phù mở rộng dung tích bên trong',
      'Bước 4: Ngâm trong Hư Không Loạn Lưu suốt 100 năm',
      'Bước 5: Khế ước linh hồn cùng Đan Ma Đại Tông Sư'
    ]
  },
  {
    id: 'cauldron_bang_phach_huyen_ngoc',
    name: 'Băng Phách Huyền Ngọc Đỉnh',
    rank: 'Bảo Khí',
    materials: 'Vạn Niên Huyền Băng Ngọc khai thác dưới đáy Bắc Minh Hải',
    features: 'Chuyên dụng luyện chế đan dược hàn tính, đan dược chữa thương và độc đan ảo giác, không sợ nhiệt lượng làm biến chất linh thảo mỏng manh.',
    fireVentDesign: 'Âm Dương Lưỡng Cực Khẩu, ngoài nóng rực rỡ trong lạnh thấu xương.',
    craftingMethod: 'Băng Phách Tiên Tông độc quyền rèn đúc truyền qua các thế hệ chưởng môn.',
    cauldronSoul: 'Tuyết Tinh Hồ linh tính hỗ trợ ngưng tụ đan vân.',
    forgingSteps: [
      'Bước 1: Khai thác ngọc băng nguyên khối dưới đáy biển sâu vạn trượng',
      'Bước 2: Đẽo gọt bằng đao kiếm Canh Kim tránh nứt vỡ mạch ngọc',
      'Bước 3: Bố trí Cực Âm Hóa Linh Phù Trận',
      'Bước 4: Tôi luyện qua Bắc Cực Băng Tuyền',
      'Bước 5: Điểm hóa linh thức bằng Băng Tâm Quyết'
    ]
  }
];

export const PRESET_HERB_GUIDES: HerbGuide[] = [
  {
    id: 'herb_cuu_diep_thao',
    name: 'Cửu Diệp Hồi Hồn Thảo',
    rarity: 'Cực Hiếm (Thiên Phẩm)',
    appearance: 'Cây cỏ chín lá phát ra ánh huỳnh quang xanh biếc, mỗi phiến lá mang một đường vân hồn phách chuyển động như sóng nước.',
    habitat: 'Vách đá tử địa bên bờ sông Hoàng Tuyền hoặc khe vực sâu vạn trượng quanh năm sương mù độc chướng bao phủ.',
    gatheringTool: 'Bắt buộc dùng Ngọc Thiềm Xẻng mài từ Phỉ Thúy hoặc dao sừng hươu tuyết, tuyệt đối không dùng đồ kim loại (sẽ làm bay mất 90% linh khí).',
    guardianBeast: 'Cửu U U Hồn Mãng (Yêu Thú Lục Giai ẩn nấp trong vách đá).',
    soilType: 'Cốt Hôi U Thổ (Đất màu đen pha tro xương cường giả cổ xưa).',
    wateringSource: 'Sương sớm ngưng tụ từ âm khí tinh khiết hoặc Cam Lộ Linh Tuyền.',
    ageAcceleration: 'Tưới bằng Bách Niên Linh Nhũ kết hợp Thất Tinh Tụ Linh Trận, rút ngắn 10 năm sinh trưởng mỗi tháng.',
    preservation: 'Bảo quản trong Hộp Ngọc Vạn Niên Trầm Hương dán bùa phong ấn, giữ trọn 100% linh khí suốt ngàn năm.'
  },
  {
    id: 'herb_thai_at_kim_lien',
    name: 'Thái Ất Canh Kim Sen',
    rarity: 'Hiếm (Địa Phẩm Thượng Giai)',
    appearance: 'Bông sen bằng kim loại vàng óng, cánh sen sắc bén như phi kiếm, phát ra kiếm khí vù vù cắt đứt cỏ rác xung quanh.',
    habitat: 'Mọc giữa hồ dung nham kim loại nóng chảy dưới lòng mỏ quặng Thái Ất Canh Kim.',
    gatheringTool: 'Dùng kẹp gỗ Trầm Hương ngâm nước hàn băng hoặc kéo bằng Canh Kim Băng Ngọc để cắt cuống hoa.',
    guardianBeast: 'Kim Giáp Tê Ngưu Tứ Giai da dày thịt béo canh giữ ngày đêm.',
    soilType: 'Quặng Thạch Cực Dương & Bụi kim loại ngàn năm.',
    wateringSource: 'Dung nham quặng sắt nóng chảy giàu kim nguyên tố.',
    ageAcceleration: 'Hấp thụ kiếm ý của tu sĩ Kiếm Tông đả tọa bồi bổ.',
    preservation: 'Đựng trong hũ Tử Sa phong ấn Canh Kim Kiếm Trận.'
  },
  {
    id: 'herb_thien_nien_tuyet_lien',
    name: 'Vạn Niên Tuyết Liên Hoa',
    rarity: 'Tuyệt Phẩm Băng Hàn (Thánh Phẩm)',
    appearance: 'Đài hoa trắng muốt trong suốt như pha lê, cánh hoa vương những hạt tuyết không bao giờ tan chảy.',
    habitat: 'Đỉnh núi tuyết Côn Lôn cao ba vạn trượng, nơi cuồng phong bão tuyết gầm thét không ngừng.',
    gatheringTool: 'Dùng găng tay tơ tằm băng tuyết hái vào đúng khoảnh khắc tia nắng đầu tiên của ngày chạm vào đài hoa.',
    guardianBeast: 'Tuyết Lang Băng Tinh Ngũ Giai tốc độ như tia chớp trắng.',
    soilType: 'Băng Tinh Hàn Thổ ngàn năm không tan.',
    wateringSource: 'Nước tuyết tan từ dòng sông băng cổ đại.',
    ageAcceleration: 'Chôn Linh Thạch Cực Phẩm hệ Băng dưới gốc cây.',
    preservation: 'Đặt trong Hộp Ngọc Huyền Băng phong ấn Băng Tinh Trận.'
  },
  {
    id: 'herb_dia_tam_hoa_chi',
    name: 'Địa Tâm Hỏa Chi',
    rarity: 'Hiếm (Địa Phẩm)',
    appearance: 'Nấm linh chi đỏ rực như than hồng cháy dở, tỏa nhiệt lượng làm méo mó không gian xung quanh.',
    habitat: 'Bên trong mạch đá dung nham núi lửa đang hoạt động sâu hàng ngàn trượng.',
    gatheringTool: 'Dùng xẻng làm từ xương Yêu Thú thuộc tính Thủy để cách ly nhiệt lượng.',
    guardianBeast: 'Hỏa Tinh Cự Mãng Tứ Giai bơi lội trong nham thạch.',
    soilType: 'Tro bụi nham thạch núi lửa giàu hỏa linh khí.',
    wateringSource: 'Địa Mạch Chân Dịch nóng đỏ.',
    ageAcceleration: 'Dẫn trực tiếp hỏa mạch chân hỏa hun đúc rễ nấm.',
    preservation: 'Bảo quản trong đỉnh gốm nung phong ấn phù chú Hỏa Diễm để giữ nhiệt.'
  }
];
