import { LocationItem, GrottoDwellingItem, SecretRealmItem } from '../types';

export const PRESET_LOCATIONS: LocationItem[] = [
  // 1. Phàm Trần & Tu Tiên Gia Tộc Lĩnh Địa (Nhất - Nhị Phẩm)
  {
    id: 'loc_thanh_nguu_tran',
    name: 'Thanh Ngưu Trấn & Thúy Vân Phong',
    tier: 'Phàm Trần Kỳ Cảnh (Hồng Trần Khí Mỏng)',
    category: 'Sơn Mạch Nguyên Sinh',
    spiritEnergyDensity: 'Linh khí loãng bằng 1/10 tông môn, lẫn tạp chất hồng trần yên hỏa',
    terrainAndWeather: 'Đồi núi trập trùng bao quanh thung lũng nông trại, suối trong róc rách, bốn mùa ôn hòa',
    dominantForces: 'Lý Thị Tu Tiên Gia Tộc (Trúc Cơ Lão Tổ)',
    naturalTreasures: ['Bách Niên Dã Sơn Sâm', 'Thanh Linh Thảo', 'Hạ Phẩm Tinh Thiết Sa'],
    dangerLevel: 'An Toàn',
    description: 'Vùng đất khởi đầu thanh bình nơi giáp ranh giữa thế tục và giới tu tiên. Nơi sản sinh nhiều hạt giống linh căn sơ khai.',
    loreAndHistory: 'Tương truyền 800 năm trước có một vị Thanh Ngưu Đạo Nhân cỡi trâu qua đây gieo xuống một luồng trọc khí linh mạch.'
  },
  {
    id: 'loc_hac_hac_dam',
    name: 'Hắc Hạc Đàm & Thính Tùng Cốc',
    tier: 'Tu Chân Sơn Mạch & Linh Địa (Nhất - Tam Phẩm)',
    category: 'Sơn Mạch Nguyên Sinh',
    spiritEnergyDensity: 'Linh khí gấp 3 lần phàm trần, tụ hội tại lòng hồ nước sâu',
    terrainAndWeather: 'Rừng thông già ngút ngàn, đầm nước sâu hun hút quanh năm sương mù lượn lờ',
    dominantForces: 'Tán Tu Liên Minh & Hắc Hạc Nhất Tộc',
    naturalTreasures: ['Hắc Thủy Huyền Trĩ', 'Bích Ba Ngân Ngư', 'Thính Tùng Chi'],
    dangerLevel: 'Nguy Hiểm Cấp B',
    description: 'Địa bàn tụ họp của các tán tu Luyện Khí Kỳ trao đổi đan dược và săn bắt thủy thú sơ cấp.',
    loreAndHistory: 'Dưới đáy đầm tương truyền có động phủ của một vị Trúc Cơ tiền bối tọa hóa thời kỳ trước.'
  },

  // 2. Tu Chân Sơn Mạch & Linh Địa Tông Môn (Tam Phẩm - Tứ Phẩm)
  {
    id: 'loc_lac_van_son_mach',
    name: 'Lạc Vân Sơn Mạch (Thất Phong Tụ Khí)',
    tier: 'Tu Chân Sơn Mạch & Linh Địa (Nhất - Tam Phẩm)',
    category: 'Sơn Mạch Nguyên Sinh',
    spiritEnergyDensity: 'Gấp 15 lần phàm trần, linh khí ngưng tụ thành dải lụa mây bảy màu bao phủ đỉnh núi',
    terrainAndWeather: 'Bảy ngọn linh phong cao vút xuyên tầng mây, vách đá dựng đứng, tùng bách ngàn năm',
    dominantForces: 'Lạc Vân Kiếm Tông (Tam đại Kim Đan Trưởng Lão tọa trấn)',
    naturalTreasures: ['Lạc Vân Linh Chi', 'Tử Vân Tinh Thạch', 'Địa Hỏa Xích Thạch'],
    dangerLevel: 'Nguy Hiểm Cấp B',
    description: 'Tổ đình của nhiều tông môn bậc trung, sở hữu 7 đầu linh mạch loại ba giao hội tạo thế Thất Tinh Triều Củng.',
    loreAndHistory: 'Từng là nơi Kiếm Tổ Lạc Vân hạ phàm chém rụng một viên thiên thạch, mảnh vỡ hóa thành Thất Phong.'
  },
  {
    id: 'loc_u_hoa_coc',
    name: 'U Hỏa Quỷ Cốc & Lôi Đình Hạp',
    tier: 'Tu Chân Sơn Mạch & Linh Địa (Nhất - Tam Phẩm)',
    category: 'Hiểm Địa Cấm Khu',
    spiritEnergyDensity: 'Âm hỏa cùng lôi sát giao thoa, linh khí cuồng bạo dị thường khó trực tiếp thổ nạp',
    terrainAndWeather: 'Hẻm núi nứt toác sâu ngàn trượng, khe nứt bốc lên ngọn lửa màu lục lam, sấm chớp rền vang trên vách đá',
    dominantForces: 'Lôi Hỏa Tông & Độc Cô Ma Tán',
    naturalTreasures: ['Địa Sát U Hỏa Chủng', 'Lôi Kích Mộc', 'U Minh Âm Thiết'],
    dangerLevel: 'Nguy Hiểm Cấp A',
    description: 'Nơi rèn luyện thể phách và thu thập lôi hỏa chi tinh lý tưởng của tu sĩ Luyện Khí đại viên mãn và Trúc Cơ.',
    loreAndHistory: 'Trận đại chiến giữa Lôi Tôn và Diễm Ma thời cổ tạo nên vết nứt địa mạch vĩnh hằng không khép miệng.'
  },

  // 3. Danh Sơn Đại Xuyên & Thánh Địa Tông Môn (Tứ - Lục Phẩm)
  {
    id: 'loc_con_lon_son',
    name: 'Côn Lôn Thần Sơn Mạch',
    tier: 'Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)',
    category: 'Sơn Mạch Nguyên Sinh',
    spiritEnergyDensity: 'Gấp 50 lần phàm trần, linh vũ quanh năm, mây tía phủ đầy, linh tuyền chảy tràn',
    terrainAndWeather: 'Vạn ngọn núi tuyết vắt ngang trời, thác nước linh tuyền đổ từ tầng mây, ngàn tầng phù vân',
    dominantForces: 'Côn Lôn Ngọc Hư Cung (Hóa Thần Lão Tổ tọa trấn), Yêu Vương Hạc Tộc',
    naturalTreasures: ['Vạn Niên Tuyết Liên', 'Côn Lôn Huyền Băng Tinh', 'Thiên Niên Tùng Chi', 'Đạo Hạnh Linh Quả'],
    dangerLevel: 'Nguy Hiểm Cấp A',
    description: 'Tổ mạch của đại lục phương Đông, tương truyền từng là nơi Thượng Cổ Chân Tiên đặt chân xuống hồng trần giảng đạo.',
    loreAndHistory: 'Vào thời Khai Thiên, một mảnh tàn ngọc hỗn độn rơi xuống nơi này tạo thành rốn linh mạch bất tử ngàn đời.'
  },
  {
    id: 'loc_dao_tri_than_phong',
    name: 'Dao Trì Tiên Phong & Vạn Kiếp Lôi Hải',
    tier: 'Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)',
    category: 'Thánh Địa Tông Môn',
    spiritEnergyDensity: 'Linh khí thuần khiết cực điểm hóa thành sương mù mờ ảo, hương hoa ngàn dặm không tan',
    terrainAndWeather: 'Hồ nước ngọc bích lơ lửng trên đỉnh mây, cung điện lưu ly khảm ngọc, thác hoa sen rủ xuống cửu tiêu',
    dominantForces: 'Dao Trì Tiên Cung & Thái Ất Tiên Môn',
    naturalTreasures: ['Dao Trì Bất Lão Tuyền', 'Cửu Diệp Ngọc Thảo', 'Thiên Lôi Tinh Kim'],
    dangerLevel: 'Nguy Hiểm Cấp A',
    description: 'Đệ nhất thánh địa của nữ tu tiên giới, nơi bảo lưu nguồn linh tuyền hồi sinh kinh mạch thượng thặng.',
    loreAndHistory: 'Tương truyền Vương Mẫu thượng giới từng lưu lại một giọt tiên lộ tạo nên đầm Dao Trì huyền thoại.'
  },

  // 4. Thượng Cổ Cấm Sơn & Ma Hải Hung Địa (Thất - Bát Phẩm)
  {
    id: 'loc_doan_hon_uyen',
    name: 'Đoạn Hồn Uyên & Bạch Cốt Thảo Nguyên',
    tier: 'Vô Sinh Cấm Khu & Thâm Uyên Hung Địa (Thất - Cửu Phẩm)',
    category: 'Hiểm Địa Cấm Khu',
    spiritEnergyDensity: 'Ma sát u ám ngút trời, âm khí thấu xương ăn mòn hộ thể linh khí của tu sĩ dưới Nguyên Anh',
    terrainAndWeather: 'Vực sâu hun hút vô tận, cỏ bạc màu mọc trên tro cốt sinh linh viễn cổ, cuồng phong hú rít như quỷ khóc',
    dominantForces: 'Bạch Cốt Dạ Xoa Vương (Ngũ Giai Hóa Hình Yêu Hoàng), Vô Cực Ma Môn',
    naturalTreasures: ['Vạn Niên Huyết Tinh Thạch', 'Đoạn Hồn Thảo', 'Ma Tôn Tàn Cốt'],
    dangerLevel: 'Cực Nguy Cấp S',
    description: 'Vùng đất cấm kỵ nơi chôn cùi vạn ức sinh linh trong trận hạo kiếp cổ xưa. Người đi vào dễ bị ma niệm xâm lấn đoạt xá.',
    loreAndHistory: 'Thời Tiên Ma đại chiến, trăm vạn tu sĩ và yêu ma đồng quy vu tận tại đây, oán khí vạn năm ngưng đọng không tan.'
  },
  {
    id: 'loc_u_minh_hai',
    name: 'U Minh Ma Hải & Quy Khư',
    tier: 'Vô Sinh Cấm Khu & Thâm Uyên Hung Địa (Thất - Cửu Phẩm)',
    category: 'Hải Vực Thâm Uyên',
    spiritEnergyDensity: 'Hắc thủy ma khí ngút trời, chân khí tu sĩ vừa xuất khiếu liền bị nước biển ăn mòn nuốt chửng',
    terrainAndWeather: 'Sóng đen ngập trời vạn trượng, sấm sét đen xé toạc màn đêm vĩnh hằng, lốc xoáy Quy Khư hút cạn vạn vật',
    dominantForces: 'Cửu U Ma Tôn, Vực Ngoại Hải Yêu Cổ Xa',
    naturalTreasures: ['U Minh Hắc Liên', 'Hoàng Tuyền Chân Thủy', 'Thiên Ma Cốt', 'Dạ Quang Huyền Châu'],
    dangerLevel: 'Thập Tử Vô Sinh SSS',
    description: 'Nơi kết thúc của vạn dòng nước trên thế gian, ranh giới chia cắt cõi sống và cõi chết.',
    loreAndHistory: 'Thời Tiên Ma đại chiến, máu của Ma Thần viễn cổ nhuộm đen cả vùng biển này.'
  },

  // 5. Vô Sinh Cấm Khu & Thái Cổ Thần Vực (Tiên Phẩm Vô Thượng)
  {
    id: 'loc_tang_tien_coc',
    name: 'Táng Tiên Cốc & Luân Hồi Nhai',
    tier: 'Thái Cổ Thần Vực & Tiên Giới Di Lạc (Tiên Phẩm Vô Thượng)',
    category: 'Hư Không Vực Ngoại',
    spiritEnergyDensity: 'Quy tắc thiên đạo vỡ vụn, Tiên Khí cổ xưa trộn lẫn Hư Không Loạn Lưu xé rách pháp thân',
    terrainAndWeather: 'Vách đá lơ lửng không trọng lực, dòng sông thời gian phản chiếu tiền kiếp, mây đỏ nhuốm máu tiên nhân',
    dominantForces: 'Cấm Khu Chi Chủ (Chí Tôn Tàn Hồn Cổ Đại)',
    naturalTreasures: ['Tiên Nhân Hóa Đạo Tinh', 'Luân Hồi Thảo', 'Đế Binh Tàn Phiến', 'Thái Sơ Mệnh Cách Thạch'],
    dangerLevel: 'Thập Tử Vô Sinh SSS',
    description: 'Mộ địa của chư tiên thời thái cổ. Nơi ngay cả Đại Thừa Kỳ đại năng bước vào cũng thập tử vô sinh.',
    loreAndHistory: 'Khi Thiên Đạo sơ khai bị đánh vỡ, một vị Chân Tiên chí cao đã lấy thân chôn vùi tại đây để phong ấn vực ngoại thiên ma.'
  },
  {
    id: 'loc_tinh_khong_co_lo',
    name: 'Tinh Không Cổ Lộ & Chư Thiên Đoạn Nhai',
    tier: 'Thái Cổ Thần Vực & Tiên Giới Di Lạc (Tiên Phẩm Vô Thượng)',
    category: 'Hư Không Vực Ngoại',
    spiritEnergyDensity: 'Tinh Thần Chi Lực tinh thuần cực độ xen kẽ với Không Gian Liệt Phùng chí tử',
    terrainAndWeather: 'Con đường đá lát giữa các vì sao trôi nổi, thiên thạch bốc cháy, hố đen nuốt chửng ánh sáng vạn năm',
    dominantForces: 'Thủ Lộ Nhân Hư Không Tộc, Cổ Thần Hậu Duệ',
    naturalTreasures: ['Tinh Hạch Cực Phẩm', 'Không Gian Tinh Thạch', 'Hỗn Độn Nguyên Dịch'],
    dangerLevel: 'Thập Tử Vô Sinh SSS',
    description: 'Con đường cổ xưa xuyên qua các vì sao nối liền Nhân Gian Giới với Thượng Giới Tiên Vực.',
    loreAndHistory: 'Con đường do Cổ Đế khai phá cách đây trăm vạn năm nhằm đưa nhân tộc tìm kiếm con đường trường sinh bất tử.'
  }
];

export const PRESET_GROTTOS: GrottoDwellingItem[] = [
  // 1. Hạ Phẩm Thạch Động (Luyện Khí / Tán Tu)
  {
    id: 'grotto_bich_thach',
    name: 'Bích Thạch Tĩnh Tu Động',
    tier: 'Hạ Phẩm Thạch Động (Luyện Khí / Tán Tu)',
    locationName: 'Vách đá phía nam Thúy Vân Phong, Thanh Ngưu Trấn',
    spiritVeinType: 'Nhất Phẩm Tàn Khuyết Thạch Mạch',
    timeDilationRate: '1:1 (Thời gian bình thường)',
    chambers: [
      { name: 'Thạch Tĩnh Thất', purpose: 'Đả tọa thổ nạp chân khí', features: 'Giường đá mài nhẵn, bồ đoàn bện từ cỏ linh thanh, vách đá dán 4 lá Tụ Khí Phù' },
      { name: 'Thô Sơ Trữ Vật Hốc', purpose: 'Cất giữ đan dược và bùa chú', features: 'Hộp gỗ đào phong ấn linh khí, vò rượu linh tuyền nhỏ' }
    ],
    defensiveArrays: 'Cự Phong Huyễn Vụ Sơ Trận (Ngăn người phàm và dã thú lạc bước)',
    specialFacilities: ['Mạch nước ngầm róc rách thanh khiết', 'Bàn đá mài binh khí'],
    description: 'Hang đá tự nhiên được một tu sĩ Luyện Khí khai phá, tuy thô sơ nhưng yên tĩnh, cách ly khói lửa hồng trần.'
  },

  // 2. Trung Phẩm Linh Động (Trúc Cơ / Nội Môn Đệ Tử)
  {
    id: 'grotto_thanh_phong',
    name: 'Thanh Phong Đan Hỏa Linh Động',
    tier: 'Trung Phẩm Linh Động (Trúc Cơ / Nội Môn)',
    locationName: 'Lưng chừng Kiếm Hà Phong, Lạc Vân Sơn Mạch',
    spiritVeinType: 'Nhị Phẩm Phong Mộc Song Thuộc Tính Linh Mạch',
    timeDilationRate: '1:1 (Thời gian chuẩn)',
    chambers: [
      { name: 'Ngưng Khí Tĩnh Thất', purpose: 'Bế quan đột phá cảnh giới', features: 'Sàn lát Thanh Ngũ Ngọc, Tụ Linh Trận bàn cấp 2' },
      { name: 'Địa Hỏa Đan Thất', purpose: 'Luyện chế Trúc Cơ Đan và Linh Đan', features: 'Dẫn một nhánh Địa Hỏa Chân Viêm từ khe núi, lò luyện đồng xanh' },
      { name: 'Linh Thảo Tiểu Viên', purpose: 'Trồng thảo dược trăm năm', features: 'Nửa mẫu linh điền dẫn suối sương mai tưới tắm' }
    ],
    defensiveArrays: 'Mậu Thổ Khốn Ma Trận kết hợp Phong Nhận Hộ Động Trận',
    specialFacilities: ['Linh Điền nửa mẫu trồng Thanh Linh Thảo', 'Bể nuôi Bích Ba Ngân Ngư bổ sung tinh huyết'],
    description: 'Động phủ tiêu chuẩn của đệ tử nội môn tông môn, đầy đủ chức năng tu luyện, luyện đan và nuôi trồng cơ bản.'
  },

  // 3. Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)
  {
    id: 'grotto_tu_tieu',
    name: 'Tử Tiêu Lôi Hỏa Chân Nhân Động Phủ',
    tier: 'Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)',
    locationName: 'Đỉnh Lôi Hỏa Nhai, Côn Lôn Sơn Mạch',
    spiritVeinType: 'Tam Phẩm Thượng Giai Địa Hỏa & Lôi Đình Chi Mạch',
    timeDilationRate: '1:1.2 (Linh khí nén nhẹ giúp định thần nhanh hơn 20%)',
    chambers: [
      { name: 'Tử Tiêu Ngộ Đạo Điện', purpose: 'Tham ngộ thiên địa pháp tắc', features: 'Vách đá khảm Tử Lôi Tinh Sa, hương định thần ngàn năm an định tâm ma' },
      { name: 'Thiên Hỏa Luyện Khí Các', purpose: 'Đúc bản mệnh phi kiếm', features: 'Lô đúc đồng đỏ Địa Hỏa Cực Phẩm, dẫn lôi kiếp trên trời thối hỏa' },
      { name: 'Bách Thảo Dược Điền', purpose: 'Ươm mầm linh dược 500 năm', features: 'Hai mẫu dược thổ màu mỡ, trận pháp tụ linh khí hệ mộc' },
      { name: 'Linh Thú Trì Hoàn', purpose: 'Nơi thú sủng nghỉ ngơi dưỡng thương', features: 'Hồ nước ấm địa nhiệt giàu khoáng chất nuôi Lôi Điểu' }
    ],
    defensiveArrays: 'Cửu Cung Bát Quái Tử Lôi Cấm Chế (Kim Đan đỉnh phong công kích 3 ngày không phá)',
    specialFacilities: ['Hồ Linh Dịch tẩy tủy phạt mao', 'Khôi lỗi thị đồng quét dọn tự động'],
    description: 'Động phủ của Kim Đan Chân Nhân tọa trấn một phương linh phong, có khả năng tự động chống đỡ lôi kiếp nhỏ.'
  },

  // 4. Cực Phẩm Đạo Quân Động Thiên (Nguyên Anh / Hóa Thần)
  {
    id: 'grotto_thuong_khung',
    name: 'Thương Khung Vân Hải Tiên Đảo',
    tier: 'Cực Phẩm Đạo Quân Động Thiên (Nguyên Anh / Hóa Thần)',
    locationName: 'Lơ lửng trên tầng mây thứ chín của Côn Lôn Tiên Cung',
    spiritVeinType: 'Tứ Phẩm Thiên Linh Khí Mạch Tinh Khiết Hóa Dịch',
    timeDilationRate: '1:2 (1 ngày bên ngoài = 2 ngày tĩnh tu bên trong)',
    chambers: [
      { name: 'Vân Hải Vấn Đạo Các', purpose: 'Hóa Thần ngộ đạo lĩnh ngộ thiên ý', features: 'Đài quan sát các vì sao, gương Bát Quái thông thiên chiếu rọi âm dương' },
      { name: 'Cực Phẩm Đan Thất', purpose: 'Luyện chế Ngũ Giai Thông Thiên Đan', features: 'Lò luyện Long Phượng Bảo Đỉnh, lửa Tam Muội Chân Hỏa bất diệt' },
      { name: 'Bản Mệnh Khí Lô Các', purpose: 'Nuôi dưỡng Thông Thiên Linh Bảo', features: 'Bể nung Canh Kim Chi Khí dung hợp nguyên lực' },
      { name: 'Vạn Niên Dược Cảnh', purpose: 'Trồng tiên thảo ngàn năm', features: 'Mười mẫu đất Thần Nông Ngọc Thổ, có linh vụ ngưng tụ thành mưa rào tưới đẫm' }
    ],
    defensiveArrays: 'Thập Tuyệt Hư Không Hộ Sơn Trận & Tru Tiên Kiếm Trận Hư Ảnh',
    specialFacilities: ['Hòn đảo bay lơ lửng bằng Phù Không Thạch', 'Hai tôn Ngũ Giai Chiến Khôi thủ môn', 'Suối nguồn Linh Dịch trường tồn'],
    description: 'Động phủ đảo bay độc lập trôi giữa biển mây, linh khí đậm đặc như mưa bụi, nơi cư ngụ của Đạo Quân cự phách.'
  },

  // 5. Thái Cổ Tiên Phủ / Giới Tử Động Thiên (Luyện Hư / Hợp Thể / Đại Thừa)
  {
    id: 'grotto_thai_hu',
    name: 'Thái Hư Giới Tử Tiên Phủ',
    tier: 'Thái Cổ Tiên Phủ / Giới Tử Động Thiên (Luyện Hư / Hợp Thể / Đại Thừa)',
    locationName: 'Ẩn giấu trong hạt cát hư không dưới chân Côn Lôn Sơn',
    spiritVeinType: 'Cực Phẩm Hỗn Độn Ngũ Hành Linh Mạch Hoàn Chỉnh',
    timeDilationRate: '1:10 (1 ngày bên ngoài = 10 ngày trong động thiên)',
    chambers: [
      { name: 'Ngộ Đạo Tĩnh Thất', purpose: 'Bế quan đột phá cảnh giới chí cao', features: 'Tường khắc Bát Quái trận đồ viễn cổ, trầm hương định thần vạn năm' },
      { name: 'Luyện Đan Tiên Các', purpose: 'Luyện chế cửu chuyển tiên đan', features: 'Dẫn trực tiếp Địa Mạch Chân Hỏa từ tâm trái đất, đan đỉnh cửu long' },
      { name: 'Luyện Khí Thần Lô', purpose: 'Rèn đúc Tiên Khí & Đạo Binh', features: 'Trận pháp tôi luyện Cửu Thiên Lôi Kiếp tự động' },
      { name: 'Thái Hư Tàng Kinh Lâu', purpose: 'Lưu trữ vạn quyển đạo tàng', features: 'Giá ngọc bích ghi khắc ngọc giản bất hoại' }
    ],
    defensiveArrays: 'Lưỡng Nghi Vi Trần Đại Trận kết hợp Hư Không Ẩn Nặc Cổ Thuật',
    specialFacilities: ['Linh Dược Viên trăm mẫu sinh trưởng gấp 10 lần', 'Hồ Tẩy Tủy Tinh Tuyền', 'Khí Linh động phủ Đạo Đồng thông minh'],
    description: 'Động phủ do Đại Thừa Kỳ Tiên Đế để lại cho người hữu duyên, nén không gian ngàn dặm vào giới tử, tự tạo một phương tiểu thế giới.'
  },

  // 6. Hỗn Độn Thần Cung / Vạn Cổ Tiên Điện (Chân Tiên Cực Đạo)
  {
    id: 'grotto_hon_don_cung',
    name: 'Hỗn Độn Khởi Nguyên Thần Cung',
    tier: 'Hỗn Độn Thần Cung / Vạn Cổ Tiên Điện (Chân Tiên Cực Đạo)',
    locationName: 'Trôi nổi tại điểm giao thoa giữa Tiên Giới và Hư Không Thái Sơ',
    spiritVeinType: 'Tiên Thiên Hỗn Độn Tổ Khí & Bất Diệt Tiên Mạch',
    timeDilationRate: '1:30 (1 ngày bên ngoài = 1 tháng bên trong)',
    chambers: [
      { name: 'Khởi Nguyên Đế Tọa', purpose: 'Chứng đạo Hỗn Độn Chân Tiên', features: 'Ngai vàng bằng Hỗn Độn Thạch, bao quanh bởi dải ngân hà thu nhỏ' },
      { name: 'Bất Tử Tiên Dược Uyển', purpose: 'Bảo tồn tiên dược cải tử hoàn sinh', features: 'Trường Sinh Thần Thụ kết quả 1 vạn năm 1 lần, Bất Tử Tuyền Thủy' },
      { name: 'Tạo Hóa Luyện Binh Trì', purpose: 'Dưỡng sinh Cực Đạo Đế Binh', features: 'Hồ nước ngập tràn Hỗn Độn Chân Hỏa và Tiên Tắc Phù Văn' }
    ],
    defensiveArrays: 'Vạn Cổ Bất Diệt Cổ Tiên Trận (Chân Tiên hạ phàm cũng không thể công phá)',
    specialFacilities: ['Quy tắc thời gian độc lập tối cao', 'Vườn thú thần thoại Thanh Long Bạch Hổ túc trực hầu cận', 'Khí Linh Tiên Cung có tu vi Chuẩn Đế'],
    description: 'Thần cung tối thượng từ thuở khai thiên lập địa, chứa đựng bí mật trường sinh bất tử và con đường thành Thần.'
  }
];

export const PRESET_SECRET_REALMS: SecretRealmItem[] = [
  // 1. Hạ Phẩm Thí Luyện Bí Cảnh (Trúc Cơ / Ngũ Hành)
  {
    id: 'realm_huyet_sac_thi_luyen',
    name: 'Huyết Sắc Thí Luyện Cổ Lâm',
    tier: 'Hạ Phẩm Thí Luyện Bí Cảnh (Trúc Cơ / Ngũ Hành)',
    element: 'Mộc & Huyết Sát',
    recommendedRealm: 'Luyện Khí Viên Mãn -> Trúc Cơ Kỳ',
    openingCycle: '5 năm mở ra một lần vào tiết Trung Thu',
    entryRestrictions: 'Chỉ tu sĩ dưới 30 tuổi và tu vi Luyện Khí Kỳ mới có thể tiến vào; cảnh giới cao hơn bị cấm chế nghiền nát',
    guardianBeasts: ['Nhị Giai Thiết Giáp Hùng', 'Bách Độc Chu Chúa', 'Huyết Ảnh Báo'],
    trialsAndHazards: ['Mê Hồn Độc Vụ', 'Đầm lầy nuốt xác Chân Ma', 'Đồng môn chém giết cướp đoạt Trúc Cơ Đan'],
    ultimateTreasures: ['Thiên Linh Thảo (Nguyên liệu luyện Trúc Cơ Đan)', 'Địa Cốt Hoa', 'Mảnh ngọc giản tàn khuyết'],
    survivalRate: 'Khoảng 40% (60% đệ tử ngã xuống do chém giết lẫn nhau)',
    environmentDescription: 'Rừng rậm nguyên sinh bao phủ bởi lớp sương mù đỏ sẫm như máu, cây cối cổ thụ ngàn năm cao chọc trời, lá sắc như dao cạo.',
    backstory: 'Thí luyện trường do Thất Đại Tông Môn liên thủ quản lý từ ngàn năm trước để tuyển chọn những đệ tử sinh tồn xuất sắc nhất.'
  },
  {
    id: 'realm_ngu_hanh_hap_coc',
    name: 'Ngũ Hành Tụ Linh Hạp Cốc',
    tier: 'Hạ Phẩm Thí Luyện Bí Cảnh (Trúc Cơ / Ngũ Hành)',
    element: 'Ngũ Hành Toàn Thuộc Tính',
    recommendedRealm: 'Luyện Khí Tầng 9 -> Trúc Cơ Trung Kỳ',
    openingCycle: '10 năm mở cửa một lần trong vòng 7 ngày',
    entryRestrictions: 'Yêu cầu mang theo Ngũ Hành Lệnh Bài để qua cửa truyền tống',
    guardianBeasts: ['Ngũ Sắc Linh Lộc', 'Kim Tinh Thạch Viên', 'Hàn Đàm Cự Mãng'],
    trialsAndHazards: ['Ngũ Hành Trọng Lực Trận', 'Ảo Cảnh Tâm Ma', 'Hỏa Diễm Phong Bạo bùng phát ngẫu nhiên'],
    ultimateTreasures: ['Ngũ Hành Tụ Khí Châu', 'Thái Ất Canh Kim Tinh Sa', 'Ất Mộc Trường Sinh Chi'],
    survivalRate: '75% (Tương đối an toàn, mang tính khảo hạch là chính)',
    environmentDescription: 'Thung lũng kỳ ảo chia làm năm khu vực: Rừng kim loại sắc nhọn, rừng cổ thụ sinh sôi, hồ băng tuyết, biển lửa dung nham, và vách núi đá vàng.',
    backstory: 'Vườn thuốc và nơi thử kiếm của một vị Trúc Cơ Hậu Kỳ đại năng tọa hóa để lại cho hậu thế tông môn.'
  },

  // 2. Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)
  {
    id: 'realm_thien_kiem_co_phai',
    name: 'Thiên Kiếm Cổ Phái Phế Tích',
    tier: 'Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)',
    element: 'Kim & Kiếm Ý',
    recommendedRealm: 'Trúc Cơ Viên Mãn -> Kim Đan Hậu Kỳ',
    openingCycle: '30 năm mở một lần khi sấm sét đánh trúng Kiếm Bi',
    entryRestrictions: 'Người vào phải lĩnh ngộ Kiếm Ý sơ cấp hoặc sở hữu Kim Đan sơ kỳ trở lên',
    guardianBeasts: ['Tam Giai Kiếm Cốt Khôi Lỗi', 'Hư Không Phệ Kiếm Nghĩ', 'Huyền Thiết Thao Thiết Thú'],
    trialsAndHazards: ['Vạn Kiếm Sát Trận tàn lưu', 'Vết nứt không gian kiếm khí', 'Khôi lỗi đại quân thức tỉnh'],
    ultimateTreasures: ['Thiên Kiếm Đạo Điển Tàn Quyển', 'Cực Phẩm Linh Kiếm Thai', 'Kiếm Hồn Tinh Túy'],
    survivalRate: 'Khoảng 35% (Rất nhiều kiếm tu bị kiếm khí tàn sát)',
    environmentDescription: 'Một tòa cổ thành tông môn lơ lửng trên không trung đã vỡ làm ba nửa, hàng ngàn thanh kiếm rỉ sét cắm trên vách đá tỏa ra hàn quang rợn ngườ.',
    backstory: 'Tông môn đệ nhất kiếm đạo cách đây ba ngàn năm bị thiên phạt diệt môn trong một đêm, để lại vô số kiếm điển vô giá.'
  },
  {
    id: 'realm_huyen_bang_u_coc',
    name: 'Huyền Băng U Cốc Ma Tích',
    tier: 'Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)',
    element: 'Cực Âm Hàn Băng & Ma Khí',
    recommendedRealm: 'Kim Đan Sơ Kỳ -> Kim Đan Viên Mãn',
    openingCycle: '50 năm một lần khi trăng rằm tháng Chạp đóng băng',
    entryRestrictions: 'Cần uống Liệt Hỏa Đan hoặc có thần thông chống chịu Cực Âm Chân Hàn',
    guardianBeasts: ['Tứ Giai Băng Phách Cự Hùng', 'Tuyết Vực Dạ Xoa', 'Hàn Tủy Độc Hạt'],
    trialsAndHazards: ['Huyền Băng Đống Hồn Khí', 'Băng Nứt Địa Tầng', 'Ma Thần Huyễn Âm'],
    ultimateTreasures: ['Huyền Băng Vạn Niên Tủy', 'Cửu U Hắc Băng Quyết', 'Thiên Hàn Ngọc Tủy'],
    survivalRate: '45% (Nhiều tu sĩ bị đông cứng thành tượng đá vĩnh viễn)',
    environmentDescription: 'Hẻm núi băng giá vĩnh cửu sâu vạn trượng, các trụ băng xanh biếc giam giữ thi thể các ma tu cổ đại vẫn còn nguyên vẹn y phục.',
    backstory: 'Nơi đại năng Băng Phách Tiên Tử dùng tính mạng đóng băng Ma Tôn Cực Âm ba vạn năm trước.'
  },

  // 3. Thượng Phẩm Hư Không Mảnh Vỡ (Nguyên Anh / Hóa Thần)
  {
    id: 'realm_hu_khong_loan_vuc',
    name: 'Hư Không Loạn Vực & Di Lạc Thần Sơn',
    tier: 'Thượng Phẩm Hư Không Mảnh Vỡ (Nguyên Anh / Hóa Thần)',
    element: 'Không Gian & Lôi Đình',
    recommendedRealm: 'Nguyên Anh Kỳ -> Hóa Thần Kỳ',
    openingCycle: '100 năm một lần khi kẽ nứt không gian ổn định trong 1 tháng',
    entryRestrictions: 'Yêu cầu tu sĩ phải ngưng tụ Nguyên Anh hoặc có Hư Không Định Giới La Bàn',
    guardianBeasts: ['Ngũ Giai Hư Không Thú Vương', 'Lôi Tinh Cự Viên', 'Thôn Hồn Ma Bức'],
    trialsAndHazards: ['Hư Không Loạn Lưu Cắt Xé Nhục Thân', 'Lỗ Đen Không Gian Nuốt Chửng', 'Thời Gian Nghịch Lưu Bẫy'],
    ultimateTreasures: ['Không Gian Tinh Hạch', 'Định Giới Thần Châu', 'Hóa Anh Đan Dược Tài Thượng Cổ'],
    survivalRate: 'Dưới 25% (Hơn ba phần tư Nguyên Anh lão quái bỏ mạng)',
    environmentDescription: 'Mảnh vỡ đại lục trôi nổi giữa bóng tối vô tận, mặt đất nghiêng ngả, các khối đá bay lượn không trọng lực xen lẫn sấm sét màu tím xé toạc không gian.',
    backstory: 'Mảnh vỡ của một Thượng Cổ Giới Diện bị phá hủy trong trận đại kiếp, trôi dạt vào kẽ nứt hư không của đại lục.'
  },

  // 4. Tuyệt Thế Cổ Tiên Ma Chiến Trường (Luyện Hư / Hợp Thể)
  {
    id: 'realm_tien_ma_chien_truong',
    name: 'Tiên Ma Cổ Chiến Trường & Đoạn Kiếm Phong',
    tier: 'Tuyệt Thế Cổ Tiên Ma Chiến Trường (Luyện Hư / Hợp Thể)',
    element: 'Hỗn Loạn Sát Khí & Tiên Ma Nhị Khí',
    recommendedRealm: 'Hóa Thần Viên Mãn -> Hợp Thể Kỳ',
    openingCycle: '300 năm mở một lần khi Thất Tinh Liên Châu chiếu sáng',
    entryRestrictions: 'Chỉ đại năng có Pháp Thân kiên cố và Thần Hồn bất hoại mới có thể chịu nổi áp lực sát khí',
    guardianBeasts: ['Lục Giai Bất Diệt Cổ Ma Tàn Ảnh', 'Tiên Thi Chiến Tướng', 'Huyết Hồn Khôi Lỗi'],
    trialsAndHazards: ['Ma Khí Ăn Mòn Đạo Tâm', 'Kiếm Khí Viễn Cổ Cắt Xé Pháp Thân', 'Vạn Kiếp Luân Hồi Trận Tàn Dư'],
    ultimateTreasures: ['Tiên Nhân Tàn Cốt', 'Đoạn Kiếm Tiên Khí', 'Bất Tử Tiên Đan Tàn Phương', 'Ma Đạo Cổ Kinh'],
    survivalRate: 'Dưới 15% (Chỉ những cự phách lão làng mới hy vọng sống sót mang bảo vật trở về)',
    environmentDescription: 'Chiến trường hoang tàn ngút ngàn, xương trắng chất cao như núi, những thanh trường kiếm vạn trượng cắm ngập vào lòng đất, trời đỏ rực như máu.',
    backstory: 'Trận quyết chiến sinh tử giữa Chân Tiên hạ giới và Ma Giới Chúa Tể cách đây mười vạn năm khiến một phương thiên địa nát vụn.'
  },

  // 5. Thái Sơ Hỗn Độn Vực / Tiên Thiên Thần Vực (Đại Thừa / Chân Tiên)
  {
    id: 'realm_thai_so_di_tich',
    name: 'Thái Sơ Hỗn Độn Di Tích & Đạo Khởi Nguyên Hải',
    tier: 'Thái Sơ Hỗn Độn Vực / Tiên Thiên Thần Vực (Đại Thừa / Chân Tiên)',
    element: 'Hỗn Độn & Thái Sơ Đạo Quy Tắc',
    recommendedRealm: 'Hợp Thể Đỉnh Phong -> Đại Thừa & Chuẩn Tiên',
    openingCycle: '1000 năm hoặc khi Dị Tượng Thiên Đạo xuất hiện (Thiên Vị Quy Nhất)',
    entryRestrictions: 'Yêu cầu tu sĩ phải có Đạo Tâm Vô Vi và nắm giữ ít nhất một tia Tiên Thiên Chi Khí',
    guardianBeasts: ['Thái Cổ Hỗn Độn Thao Thiết Chân Thân', 'Thời Gian Cự Côn', 'Khởi Nguyên Thần Long'],
    trialsAndHazards: ['Hỗn Độn Đồng Hóa (Biến nhục thân thành hư vô)', 'Đạo Kiếp Thần Lôi Vô Thượng', 'Vô Tận Tâm Ma Nghiệt Duyên'],
    ultimateTreasures: ['Thái Sơ Chân Khí', 'Khởi Nguyên Đạo Quả', 'Phi Thăng Tiên Duyên', 'Bất Diệt Tiên Binh'],
    survivalRate: 'Dưới 5% (Cơ duyên phi thăng hoặc vạn kiếp bất phục hóa thành tro bụi)',
    environmentDescription: 'Không gian hư vô nguyên thủy mờ mịt ánh sáng ngọc bích, các ngôi sao vừa mới sinh ra trôi dạt trong biển sương mù hỗn độn, dòng sông quy tắc chảy róc rách giữa hư không.',
    backstory: 'Nơi thai nghén ra Thiên Đạo trước khi thế giới được khai sinh, ẩn chứa bí mật cao nhất về nguồn gốc vũ trụ và trường sinh bất tử.'
  }
];
