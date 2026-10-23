import { WeaponTierItem, ForgingMethod } from '../types';

export const PRESET_WEAPON_TIERS: WeaponTierItem[] = [
  // 1. Phàm Binh (Phàm Thiết Bách Luyện)
  {
    id: 'weapon_thanh_phong_kiem',
    name: 'Thanh Phong Bách Luyện Kiếm',
    category: 'Kiếm (Phi Kiếm / Trọng Kiếm)',
    rank: 'Phàm Binh (Phàm Thiết Bách Luyện)',
    materials: 'Trăm lần tôi luyện từ Vân Mẫu Tinh Thiết & Than củi ngàn năm',
    spiritSoul: 'Chưa sinh linh tính (Chỉ có sát khí lạnh lẽo thuần khiết của đao kiếm)',
    inscribedArrays: 'Chưa có trận pháp phù văn',
    combatPowerEffect: 'Sắc bén chém sắt như chém bùn, cắt đứt giáp sắt phàm trần, tăng tốc độ xuất kiếm sơ nhập.',
    evolutionPath: 'Ngâm trong Linh Tuyền Cam Lộ kết hợp khắc họa Dẫn Khí Phù để thăng phẩm thành Linh Khí.',
    ultimateTechnique: 'Thanh Phong Tam Điệp Lãng (Ba kiếm liên hoàn)',
    backstory: 'Thanh kiếm khởi đầu của thiếu niên tu sĩ khi vừa bước chân vào con đường tầm tiên cầu đạo.'
  },

  // 2. Linh Khí (Hạ - Trung - Thượng - Cực Phẩm)
  {
    id: 'weapon_bich_thuy_tram_nguyet_dao',
    name: 'Bích Thủy Trảm Nguyệt Đao',
    category: 'Đao (Bá Đao / Trảm Ma Đao)',
    rank: 'Linh Khí (Hạ - Trung - Thượng - Cực Phẩm)',
    materials: 'Hải Để Hàn Thiết kết hợp Vảy Bích Thủy Linh Xà',
    spiritSoul: 'Linh xà hư ảnh ẩn hiện khi dẫn chân khí',
    inscribedArrays: 'Tam Trọng Nhu Thủy Tụ Khí Trận, Phong Duệ Phù',
    combatPowerEffect: 'Dẫn đạo chân khí phát ra đao mang dài mười trượng, nhát đao mang theo sóng thần áp bức.',
    evolutionPath: 'Dung hợp Bát Hoang Liệt Diễm Tinh Sa để tiến hóa thành Bảo Khí biến ảo kích thước.',
    ultimateTechnique: 'Bích Hải Triều Sinh Nhất Đao Trảm',
    backstory: 'Đao của Đao Khách danh chấn Đông Hải, từng chém đứt ba con yêu thú đầm lầy.'
  },

  // 3. Bảo Khí (Có Linh Quang / Biến Đổi Kích Thước)
  {
    id: 'weapon_bat_hoang_liet_diem_thuong',
    name: 'Bát Hoang Liệt Diễm Thương',
    category: 'Thương / Kích / Mâu (Trường Thương)',
    rank: 'Bảo Khí (Có Linh Quang / Biến Đổi Kích Thước)',
    materials: 'Thiên Hỏa Tinh Đồng, Vảy Xích Giao Long & Lõi Thần Mộc Hỏa Hệ',
    spiritSoul: 'Xích Giao Linh Tính sơ khai (Có thể gầm vang khi đối đầu yêu thú)',
    inscribedArrays: 'Liệt Hỏa Bát Quái Trận, Cự Hóa Như Ý Phù Ấn',
    combatPowerEffect: 'Phóng to thu nhỏ tự do từ một tấc đến ba trượng, mũi thương bắn ra bão lửa thiêu rụi phòng ngự đối phương.',
    evolutionPath: 'Tắm mình trong Lôi Kiếp và máu Chân Long để tiến hóa thành Thông Thiên Cổ Bảo.',
    ultimateTechnique: 'Bát Hoang Liệt Hỏa Toàn Phong Kích',
    backstory: 'Chiến thương của Chấn Viễn Đại Tướng Quân thời cổ, theo chủ nhân tung hoành trăm vạn chiến trường.'
  },

  // 4. Thông Thiên Linh Bảo / Cổ Bảo
  {
    id: 'weapon_hon_thien_thai_cuc_chung',
    name: 'Hỗn Thiên Thái Cực Cổ Chung',
    category: 'Kỳ Môn / Pháp Bảo (Chuông / Gương / Tháp / Quạt / Cầm)',
    rank: 'Thông Thiên Linh Bảo / Cổ Bảo',
    materials: 'Huyền Hoàng Mẫu Khí & Vạn Niên Đồng Xanh khai quật từ Cổ Mộ',
    spiritSoul: 'Thái Cực Âm Dương Song Ngư Khí Linh (Biết tự động bảo vệ chủ nhân)',
    inscribedArrays: 'Cổ Đạo Ngân, Bát Quái Định Không Đại Trận, Vạn Kiếp Bất Diệt Phù',
    combatPowerEffect: 'Tiếng chuông vang lên định trụ càn khôn không gian trong ngàn dặm, chuông úp xuống tạo lồng chắn kim cang bất hoại.',
    evolutionPath: 'Dung hợp Thái Sơ Chân Khí để thức tỉnh thành Đạo Khí uẩn dưỡng Khí Linh độc lập.',
    ultimateTechnique: 'Hỗn Thiên Trấn Thế Âm Ba',
    backstory: 'Di vật từ chiến trường Thần Ma viễn cổ khai quật được dưới đáy Vực Sâu Vạn Trượng.'
  },
  {
    id: 'weapon_xa_nhat_than_cung',
    name: 'Xạ Nhật Lạc Tinh Thần Cung',
    category: 'Cung / Tiễn / Nỏ',
    rank: 'Thông Thiên Linh Bảo / Cổ Bảo',
    materials: 'Gân rồng Thái Cổ & Thân cây Phù Tang Hỏa Mộc',
    spiritSoul: 'Kim Ô Hỏa Điểu tàn hồn',
    inscribedArrays: 'Chín đạo Xuyên Hư Phá Giới Trận',
    combatPowerEffect: 'Không cần tên thật, chỉ cần kéo dây cung sẽ tự ngưng tụ Tiên Thiên Chân Hỏa Tiễn bắn xuyên thủng hộ sơn trận pháp.',
    evolutionPath: 'Hấp thu thêm Tinh Thần Sa để thăng phẩm Đạo Khí.',
    ultimateTechnique: 'Cửu Tiễn Lạc Nhật Diệt Hồn Xạ',
    backstory: 'Cây cung từng bắn rơi chín vầng mặt trời hung tàn thời Thượng Cổ Hồng Hoang.'
  },

  // 5. Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh Độc Lập)
  {
    id: 'weapon_tu_tieu_loi_tru_ma_kiem',
    name: 'Tử Tiêu Thần Lôi Tru Ma Kiếm',
    category: 'Kiếm (Phi Kiếm / Trọng Kiếm)',
    rank: 'Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)',
    materials: 'Tử Tiêu Thần Thiết ngàn năm, Lôi Tinh Chi Tủy & Chân Long Cốt',
    spiritSoul: 'Khí Linh Tử Tiêu Kiếm Đồng (Hình hài hài đồng áo tím, có trí tuệ cao, tự ngự kiếm sát địch)',
    inscribedArrays: 'Cửu Trọng Thiên Lôi Diệt Ma Đại Trận, Đạo Ngân Lôi Quy Tắc',
    combatPowerEffect: 'Triệu hồi Cửu Trọng Thiên Kiếp Lôi Đình, kiếm khí tung hoành ngàn dặm, tự động xuất vỏ chém rụng đầu lâu ma đầu.',
    evolutionPath: 'Chịu đựng 81 đạo Hỗn Độn Kiếp Lôi để thăng hoa thành Cực Đạo Đế Binh.',
    ultimateTechnique: 'Tử Tiêu Vạn Kiếm Quy Tông Lôi Kiếp Trận',
    backstory: 'Bản mệnh thần kiếm của Kiếm Tông Chưởng Môn đời thứ nhất, trấn áp Ma Uyên suốt vạn năm.'
  },
  {
    id: 'weapon_u_minh_tram_ma_dao',
    name: 'U Minh Cửu U Trảm Ma Đao',
    category: 'Đao (Bá Đao / Trảm Ma Đao)',
    rank: 'Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)',
    materials: 'Hoàng Tuyền Hắc Thiết, Thiên Ma Huyết Tinh, Ma Long Nghịch Lân',
    spiritSoul: 'Hắc Long Ma Linh cuồng bạo, hóa thân thành rồng đen khổng lồ gầm thét',
    inscribedArrays: 'Thất Tinh Huyết Ma Trận, Hấp Hồn Đoạt Phách Phù',
    combatPowerEffect: 'Mỗi đòn chém kèm theo U Minh Ma Diễm ăn mòn kinh mạch, chém đứt sinh mệnh lực đối phương.',
    evolutionPath: 'Chém giết 1000 đầu Ma Tướng để đao linh tiến hóa thành Cực Đạo Đế Binh.',
    ultimateTechnique: 'Cửu Trọng Ma Sát Bá Đao',
    backstory: 'Bảo đao của Ma Tôn thượng cổ lưu lạc trong Quy Khư, chỉ người có sát khí ngút trời mới có thể rút đao.'
  },

  // 6. Cực Đạo Đế Binh / Thần Binh Viễn Cổ
  {
    id: 'weapon_hoang_thien_ba_dao',
    name: 'Hoang Thiên Trảm Tiên Bá Đao',
    category: 'Đao (Bá Đao / Trảm Ma Đao)',
    rank: 'Cực Đạo Đế Binh / Thần Binh Viễn Cổ',
    materials: 'Hoang Cổ Huyền Kim, Chân Long Cốt & Thiên Ngoại Vẫn Thiết',
    spiritSoul: 'Bá Long Khí Linh cuồng bạo, thức tỉnh Cực Đạo Đế Văn sát phạt trấn áp vạn cổ',
    inscribedArrays: 'Thái Cổ Đế Văn Đại Trận, Trảm Tiên Liệt Không Quyết',
    combatPowerEffect: 'Nhất đao trảm tinh thần, chém đôi ngân hà, uy áp đế uy khiến vạn tộc cúi đầu quỳ lạy.',
    evolutionPath: 'Hấp thu Hỗn Độn Căn Nguyên để siêu thoát thành Hỗn Độn Chí Bảo.',
    ultimateTechnique: 'Hoang Thiên Tuyệt Sát: Nhất Đao Trảm Thiên',
    backstory: 'Chí bảo tùy thân của Hoang Thiên Cổ Đế, từng một đao chém đứt đường lui của chư thần dị giới.'
  },
  {
    id: 'weapon_long_lan_bat_diet_giap',
    name: 'Thái Hư Long Lân Chiến Giáp',
    category: 'Quyền Thao / Chiến Giáp / Hộ Thể',
    rank: 'Cực Đạo Đế Binh / Thần Binh Viễn Cổ',
    materials: 'Ba ngàn phiến vảy Tổ Long dát cùng Hỗn Độn Tinh Kim',
    spiritSoul: 'Tổ Long Hộ Thể Khí Linh (Bất tử bất diệt)',
    inscribedArrays: 'Bất Động Minh Vương Trận, Chư Thiên Vạn Giới Giới Bích Phù',
    combatPowerEffect: 'Miễn nhiễm 99% sát thương vật lý và ma pháp, phản hồi 50% uy lực công kích lên kẻ tấn công.',
    evolutionPath: 'Dung hợp thêm Long Tủy Thái Cổ để đạt cấp Hồng Hoang.',
    ultimateTechnique: 'Vạn Cổ Bất Diệt Long Thể Chấn',
    backstory: 'Bộ chiến giáp của Chiến Thần Viễn Cổ mặc khi độc chiến mười vị Đại Đế dị vực.'
  },

  // 7. Hồng Hoang Tiên Khí / Hỗn Độn Chí Bảo
  {
    id: 'weapon_thai_so_khai_thien_phu',
    name: 'Thái Sơ Khai Thiên Phủ',
    category: 'Trọng Binh (Chùy / Phủ / Côn Bổng)',
    rank: 'Hồng Hoang Tiên Khí / Hỗn Độn Chí Bảo',
    materials: 'Hỗn Độn Thần Thiết sinh ra trước khi vũ trụ hình thành',
    spiritSoul: 'Khai Thiên Khí Linh (Đại biểu cho ý chí sơ khai của Vũ Trụ)',
    inscribedArrays: 'Khởi Nguyên Hỗn Độn Đạo Văn, Phá Diệt Vạn Pháp Thần Ngân',
    combatPowerEffect: 'Chém rách Hỗn Độn, tái lập càn khôn âm dương, siêu thoát khỏi ngũ hành quy luật.',
    evolutionPath: 'Đỉnh cao tối thượng của vũ trụ, vạn cổ duy nhất không thể tiến hóa thêm.',
    ultimateTechnique: 'Khai Thiên Tịch Địa: Tái Lập Càn Khôn',
    backstory: 'Thần rìu khai thiên mở cõi thuở sơ khai của vũ trụ, uy năng vô hạn bất khả tư nghị.'
  },
  {
    id: 'weapon_bang_phach_ngan_cham',
    name: 'Băng Phách Lạc Hồn Ngân Châm',
    category: 'Ám Khí & Châm Bí Thuật',
    rank: 'Thông Thiên Linh Bảo / Cổ Bảo',
    materials: 'Vạn Niên Huyền Băng Tinh & Thất Thải Độc Mãng Xương',
    spiritSoul: 'Băng Phách Xà Tinh',
    inscribedArrays: 'Vô Thanh Vô Tức Trận, Phong Huyết Đoạt Mệnh Phù',
    combatPowerEffect: 'Bắn ra không màu không tiếng động, xuyên thủng mọi hộ thể linh quang, đóng băng kinh mạch đối thủ tức thì.',
    evolutionPath: 'Tẩm U Minh Hàn Độc để thăng cấp Chuẩn Đế Binh.',
    ultimateTechnique: 'Bạo Vũ Băng Phách Đoạt Phách Lạc',
    backstory: 'Ám khí độc môn tuyệt tích ngàn năm của U Minh Cốc bí phái.'
  }
];

export const PRESET_FORGING_METHODS: ForgingMethod[] = [
  {
    id: 'method_cuu_thien_loi_kiep',
    name: 'Cửu Thiên Lôi Kiếp Đúc Binh Thuật',
    category: 'Cửu Thiên Lôi Kiếp Đúc Binh (Dẫn Lôi Tôi Cốt)',
    description: 'Dẫn dắt trực tiếp sấm sét của thiên lôi giáng xuống đe rèn để ép hết tạp chất trong thần kim, khắc ấn lôi văn tự nhiên vào cốt khí.',
    suitableRanks: ['Bảo Khí', 'Thông Thiên Linh Bảo', 'Đạo Khí', 'Cực Đạo Đế Binh'],
    requiredFurnaceOrFlame: 'Đài Dẫn Lôi trên đỉnh núi tuyết kết hợp Lôi Trì Viễn Cổ',
    coreSteps: [
      'Nấu chảy thần kim trong Địa Hỏa Lò Đỉnh trong 49 ngày.',
      'Dẫn lôi tiệp hạ phẩm đánh vào phôi kiếm để sơ bộ định hình.',
      'Nhúng phôi kiếm vào Linh Nhũ Tuyền để tôi luyện đột ngột.',
      'Dẫn Tam Cửu Thiên Kiếp trút xuống để đánh thức linh tính của kim loại.',
      'Khắc họa trận pháp và phong ấn thần niệm của khí linh.'
    ],
    secretTechnique: 'Cửu Lôi Khải Phong Ấn: Dùng tia sét tím cuối cùng điểm nhãn cho khí linh xuất thế.',
    prosAndCons: {
      pros: 'Binh khí sinh ra mang lôi tính chí dương, phá tan mọi tà pháp, độ cứng cáp và sắc bén vô song.',
      cons: 'Đòi hỏi người rèn phải có tu vi thể phách cực cao để chịu được dư chấn sấm sét.',
      danger: 'Nếu không khống chế được lôi kiếp sẽ dẫn đến nổ đài rèn, người và bảo vật cùng tan thành mây khói.'
    },
    recommendedMaterials: ['Thái Ất Canh Kim', 'Lôi Tinh Thạch', 'Vạn Niên Lôi Kích Mộc', 'Chân Long Huyết']
  },
  {
    id: 'method_hoa_luyen_chinh_tong',
    name: 'Thái Cổ Chân Hỏa Đan Điền Uẩn Khí Thuật',
    category: 'Bản Mệnh Đan Điền Ôn Dưỡng (Kiếm Thai Tự Dưỡng)',
    description: 'Lấy đan điền làm lò rèn, dùng bản mệnh chân hỏa và tinh huyết ngày đêm ôn dưỡng kiếm thai từ thuở sơ khai.',
    suitableRanks: ['Linh Khí', 'Bảo Khí', 'Thông Thiên Linh Bảo', 'Đạo Khí'],
    requiredFurnaceOrFlame: 'Khí Hải Đan Điền và Bản Mệnh Chân Hỏa',
    coreSteps: [
      'Dùng thần thức tinh thuần mài dũa kiếm phôi nhỏ như hạt gạo.',
      'Đưa kiếm phôi vào khí hải đan điền, tắm mình trong linh dịch.',
      'Mỗi ngày nhỏ một giọt tâm đầu huyết để hòa quyện tâm linh.',
      'Khi đột phá đại cảnh giới, kiếm thai hấp thu thiên địa linh khí cùng tiến hóa.'
    ],
    secretTechnique: 'Huyết Kiếm Đồng Nguyên Quyết: Người còn kiếm còn, người mất kiếm gãy, đạt tới cảnh giới Nhân Kiếm Hợp Nhất.',
    prosAndCons: {
      pros: 'Độ phối hợp tuyệt đối 100%, có thể điều khiển chỉ bằng một ý niệm, uy lực gia tăng theo tu vi người sở hữu.',
      cons: 'Mất nhiều năm tháng ôn dưỡng, tốc độ tăng tiến chậm ở giai đoạn đầu.',
      danger: 'Nếu kiếm bị đối thủ đánh gãy, bản thân chủ nhân sẽ bị phản phệ nứt đan điền hoặc tổn thọ mệnh.'
    },
    recommendedMaterials: ['Hỗn Độn Tàn Ngọc', 'Canh Kim Sa', 'Huyền Thiết Tinh', 'Tâm Đầu Huyết']
  },
  {
    id: 'method_ma_dao_huyet_te',
    name: 'Ma Đạo Huyết Tế Định Linh Thuật',
    category: 'Ma Đạo Huyết Tế / Định Linh (Sát Phạt Thần Binh)',
    description: 'Dùng máu của vạn đầu yêu thú hoặc tàn hồn cường giả hiến tế cho thân kiếm lúc vừa rèn xong để kích hoạt sát khí tuyệt đối.',
    suitableRanks: ['Bảo Khí', 'Thông Thiên Linh Bảo', 'Đạo Khí'],
    requiredFurnaceOrFlame: 'Huyết Trì U Minh & Ma Diễm Lô',
    coreSteps: [
      'Đúc phôi bằng Hắc Thiết và Xương Ma Thú.',
      'Ngâm phôi kiếm trong Huyết Trì 81 ngày.',
      'Chém giết ma thú lấy hồn phách cưỡng ép phong ấn vào thân vũ khí.',
      'Khắc họa Huyết Sát Ma Phù.'
    ],
    secretTechnique: 'Ma Hồn Đoạt Phách: Đao kiếm tự sinh khát máu, chém trúng là hút cạn tinh huyết.',
    prosAndCons: {
      pros: 'Sát lực bạo phát cực nhanh, có thể vượt cấp chém địch.',
      cons: 'Khí linh dễ cắn trả phản phệ nếu chủ nhân tâm cảnh suy yếu.',
      danger: 'Dễ bị sát khí ăn mòn tâm trí hóa ma cuồng loạn.'
    },
    recommendedMaterials: ['Hoàng Tuyền Hắc Thiết', 'Yêu Thú Nội Đan', 'Ma Tôn Chi Huyết']
  }
];
