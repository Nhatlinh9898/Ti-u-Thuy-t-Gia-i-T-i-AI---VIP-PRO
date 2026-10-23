import { PowerTierSystem, FortuitousEncounter, PillOrHerb } from '../types';

export const PRESET_POWER_TIER_SYSTEMS: PowerTierSystem[] = [
  {
    id: 'system_tien_hiep_cuu_trong',
    name: 'Cửu Trọng Tiên Đạo Hệ Thống (Tiên Hiệp Cổ Điển)',
    genre: 'Tiên Hiệp Cổ Phong',
    description: 'Hệ thống tu chân chính tông gồm 9 đại cảnh giới tiêu chuẩn của Đạo môn, từ luyện tinh hóa khí đến ngưng tụ tiên thể phi thăng đại thiên thế giới.',
    levels: [
      {
        level: 1,
        name: 'Luyện Khí Kỳ (Tầng 1 - 9)',
        subStages: 'Sơ kỳ (1-3) • Trung kỳ (4-6) • Hậu kỳ (7-8) • Đại viên mãn (Tầng 9)',
        description: 'Dẫn khí nhập thể, đả thông thập nhị chính kinh, tích tụ chân khí khí thái trong đan điền, thọ mệnh tăng nhẹ lên 120-150 tuổi.',
        breakthroughCondition: 'Thổ nạp thiên địa linh khí, dùng Tụ Khí Đan hoặc Tẩy Tủy Đan thanh lọc cặn bã kinh mạch, khai mở kỳ kinh bát mạch.',
        combatPower: 'Khí kình ngoại phóng trăm bước, bách bộ xuyên dương, ngự sử sơ giai phù lục và kiếm pháp phàm tục đỉnh cao.',
        cultivationMethod: 'Đả tọa giờ Tý và giờ Ngọ, hướng về phía đông đón nhận đệ nhất lũ tử khí mặt trời mọc, dẫn linh khí qua Đốc Mạch xuống Đan Điền.',
        breakthroughRitual: {
          requirements: 'Tẩy Tủy Đan cực phẩm, 50 khối hạ phẩm linh thạch, thanh tĩnh linh tuyền.',
          danger: 'Kinh mạch bế tắc dẫn đến huyết khí nghịch lưu, hộc máu thổ huyết.',
          ritualPlace: 'Tụ Linh Thạch Thất hoặc dưới chân thác nước có linh khí hội tụ.'
        },
        fortuitousEncounters: [
          {
            name: 'Bí Cảnh Lạc Long Động Khảo Nghiệm',
            description: 'Động phủ tàn phế của tiền bối Trúc Cơ để lại hộp ngọc chứa kiếm quyết sơ giai.',
            opportunity: 'Thu được Thanh Sương Kiếm hạ phẩm pháp khí cùng ba bình Bồi Nguyên Đan.',
            danger: 'Bầy Thiết Giáp Lang nhất giai canh giữ cửa động.'
          },
          {
            name: 'Linh Tuyền Thạch Nhũ Trăm Năm',
            description: 'Giọt ngọc tủy kết tinh trong hang đá vôi cổ kính ngàn năm.',
            opportunity: 'Tẩy rửa tạp chất nhục thân, trực tiếp thăng cấp 2 tầng Luyện Khí.',
            danger: 'Âm phong thấu xương dễ gây tê liệt kinh mạch nếu vội vã uống nhiều.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_1', name: 'Tụ Khí Đan', rank: 'Nhất Phẩm', effects: 'Gia tốc hấp thu linh khí gấp 3 lần trong 6 canh giờ', ingredients: 'Ngưng Khí Thảo, Linh Tuyền Thủy' },
          { id: 'pill_2', name: 'Tẩy Tủy Đan', rank: 'Nhất Phẩm Cực Phẩm', effects: 'Bài trừ độc tố phàm trần, mở rộng kinh mạch', ingredients: 'Bách Niên Linh Chi, Huyết Tham' }
        ],
        weaponsAndArtifacts: [
          { name: 'Thanh Cương Đoản Kiếm', rank: 'Hạ Phẩm Linh Khí', effects: 'Chém sắt như chém bùn, dẫn xuất kiếm khí ba tấc' },
          { name: 'Hộ Thân Ngọc Bội Thanh Vân', rank: 'Hạ Phẩm Pháp Bảo', effects: 'Tự động kích hoạt màn chắn linh khí cản ba đòn hiểm' }
        ],
        techniquesAndMartialArts: [
          { name: 'Thanh Vân Dẫn Khí Quyết', rank: 'Hoàng Giai Thượng Phẩm', effects: 'Tâm pháp nhập môn điều tức khí huyết vững chắc' },
          { name: 'Bách Bộ Đoạt Hồn Thân Pháp', rank: 'Hoàng Giai Trung Phẩm', effects: 'Di chuyển thoăn thoắt lướt như cơn gió nhẹ' }
        ]
      },
      {
        level: 2,
        name: 'Trúc Cơ Kỳ (Đúc Đạo Cơ)',
        subStages: 'Sơ kỳ (Hóa Dịch) • Trung kỳ (Khí Hải) • Hậu kỳ (Ngưng Tinh) • Viên mãn (Đạo Cơ Đỉnh)',
        description: 'Khí thái chân khí áp súc hóa thành chất lỏng linh dịch, mở ra Khí Hải đan điền mênh mông, thọ mệnh 200 - 300 tuổi, chính thức bước vào tiên lộ thoát phàm thai.',
        breakthroughCondition: 'Cần Trúc Cơ Đan hộ mệnh, phá vỡ bích chướng đan điền, chịu đựng đau đớn tủy dịch tái sinh. Phân thành: Phàm Phẩm, Địa Phẩm và Thiên Đạo Trúc Cơ.',
        combatPower: 'Ngự kiếm phi hành ngàn dặm, phóng xuất kiếm cương xé toạc sắt thép, thuật pháp uy lực hủy diệt cả một sơn trang.',
        cultivationMethod: 'Vận hành đại chu thiên 36 vòng mỗi ngày, dẫn địa hỏa hoặc hàn băng chi khí tôi luyện linh dịch trong Khí Hải.',
        breakthroughRitual: {
          requirements: 'Thiên Hóa Trúc Cơ Đan hoặc Ngũ Hành Tinh Hoa dịch, tụ linh đại trận hộ đạo.',
          danger: 'Khí hải nổ tung nếu chân khí không đủ độ tinh thuần, tu vi rớt vĩnh viễn về Luyện Khí.',
          ritualPlace: 'Đỉnh Linh Sơn ngàn trượng hoặc Huyết Mạch Ôn Tuyền môn phái.'
        },
        fortuitousEncounters: [
          {
            name: 'Di Tích Cổ Tiên Kiếm Trủng',
            description: 'Vạn thanh tàn kiếm thượng cổ cắm trên vách đá ngàn năm sinh ra kiếm ý tàn dư.',
            opportunity: 'Cảm ngộ Sơ Khởi Kiếm Ý, thu phục một thanh Bản Mệnh Kiếm Thai.',
            danger: 'Kiếm sát vô hình cứa rách hồn phách nếu đạo tâm dao động.'
          },
          {
            name: 'Động Phủ Ngũ Hành Tinh Quả Thụ',
            description: 'Cây thiêng hấp thu linh khí ngũ hành kết tinh thành linh quả ngũ sắc quý hiếm.',
            opportunity: 'Ăn quả ngũ hành đúc thành Ngũ Hành Hỗn Độn Đạo Cơ viên mãn.',
            danger: 'Trận pháp huyễn trận cổ đại bao vây, ảo ảnh làm mê muội thần trí.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_3', name: 'Thiên Đạo Trúc Cơ Đan', rank: 'Nhị Phẩm Cực Phẩm', effects: 'Đúc nên Cửu Phẩm Thiên Đạo Cơ, không một tia tạp chất', ingredients: 'Thiên Tâm Hoa 300 năm, Yêu Đan Nhị Giai' },
          { id: 'pill_3b', name: 'Hộ Mạch Bồi Nguyên Cao', rank: 'Nhị Phẩm Thượng Thừa', effects: 'Bảo vệ kinh mạch trước áp lực linh dịch cuồn cuộn', ingredients: 'Huyết Long Đằng, Tuyết Sơn Tinh Nhũ' }
        ],
        weaponsAndArtifacts: [
          { name: 'Xích Viêm Phi Kiếm', rank: 'Trung Phẩm Linh Khí', effects: 'Ngự không phi hành thần tốc, chém ra biển lửa ngập trời' },
          { name: 'Huyền Quy Hộ Tâm Kính', rank: 'Trung Phẩm Linh Khí', effects: 'Phản hồi 30% sát thương đòn đánh vật lý và pháp thuật' }
        ],
        techniquesAndMartialArts: [
          { name: 'Hư Không Ngự Kiếm Thuật', rank: 'Huyền Giai Hạ Phẩm', effects: 'Cách không điều khiển phi kiếm trảm thủ cấp kẻ thù' },
          { name: 'Quy Nguyên Nhất Khí Thuẫn', rank: 'Huyền Giai Trung Phẩm', effects: 'Ngưng kết khí cương thành mai rùa huyền vũ phòng ngự' }
        ]
      },
      {
        level: 3,
        name: 'Kim Đan Kỳ (Kết Đan Chân Nhân)',
        subStages: 'Hạ Phẩm Kim Đan (1-3 Văn) • Trung Phẩm (4-6 Văn) • Thượng Phẩm (7-8 Văn) • Cửu Chuyển Chí Tôn Hoàng Kim Đan',
        description: 'Linh dịch trong khí hải cô đọng ngưng tụ thành một viên nội đan hoàng kim tròn đầy bất hoại. Thọ mệnh 500 - 800 tuổi, xưng hào Chân Nhân, trấn áp một phương.',
        breakthroughCondition: 'Đón nhận Tam Cửu Thiên Kiếp (27 đạo lôi đình), đốt cháy tâm ma huyễn cảnh, ngưng tụ đạo ngân thiên địa lên mặt Kim Đan.',
        combatPower: 'Một kích san bằng đỉnh núi, thần thức bao phủ năm mươi dặm, chân thân lướt đi trong mây lôi điện, Kim Đan chân hỏa thiêu rụi pháp bảo.',
        cultivationMethod: 'Dùng Tam Muội Chân Hỏa ngày đêm tôi luyện bề mặt Kim Đan, khắc ghi thiên địa đạo văn vào đan văn cửu chuyển.',
        breakthroughRitual: {
          requirements: 'Kim Đan Hóa Cảnh Đan, Bát Quái Tụ Lôi Trận, hộ thân cổ bảo.',
          danger: 'Lôi kiếp giáng xuống nát đan điền, tâm ma hóa thành người thân kéo vào vực thẳm mê muội.',
          ritualPlace: 'Đài Đoạt Lôi trên đỉnh núi cô độc giữa biển mây hoang dã.'
        },
        fortuitousEncounters: [
          {
            name: 'Động Thiên Cổ Tu Sĩ Tọa Hóa',
            description: 'Hài cốt Kim Đan đại năng nghìn năm trước vẫn nguyên vẹn tỏa kim quang.',
            opportunity: 'Thừa kế Cổ Bảo Bát Hoang Kính cùng một quyển kiếm kinh thất truyền.',
            danger: 'Tàn hồn đoạt xá rình rập trong mi tâm hài cốt.'
          },
          {
            name: 'Bồ Đề Ngộ Đạo Nhai',
            description: 'Vách núi in dấu vết chưởng lực của tiên nhân viễn cổ để lại đạo ngân trường tồn.',
            opportunity: 'Ngộ ra chân ý Kim Đan Cửu Chuyển, ngưng tụ thêm 2 đạo văn sắc nét.',
            danger: 'Đạo áp đè nặng làm vỡ nát thần thức nếu cưỡng cầu nhìn quá lâu.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_4', name: 'Cửu Chuyển Kim Đan Hoàn', rank: 'Tam Phẩm Thần Phẩm', effects: 'Gia tăng 60% xác suất ngưng kết Kim Đan cửu phẩm văn', ingredients: 'Kim Tủy Chi, Long Huyết Đằng ngàn năm' },
          { id: 'pill_4b', name: 'Ngưng Hồn Tụ Đan Tán', rank: 'Tam Phẩm Thượng Thừa', effects: 'Định trụ thần hồn không bị lôi kiếp chấn kinh', ingredients: 'An Thần Mộc, U Hồn Thảo' }
        ],
        weaponsAndArtifacts: [
          { name: 'Bắc Đẩu Huyền Quang Kiếm', rank: 'Thượng Phẩm Bảo Khí', effects: 'Hấp thu tinh hoa thất tinh, chém ra lôi đình tinh tú' },
          { name: 'Tử Kim Bát Quái Lò', rank: 'Cực Phẩm Bảo Khí', effects: 'Uẩn dưỡng linh hỏa, có thể thu nạp và trấn áp cường địch' }
        ],
        techniquesAndMartialArts: [
          { name: 'Vạn Kiếm Quy Tông Trảm', rank: 'Địa Giai Trung Phẩm', effects: 'Hóa thân vạn thanh kim kiếm phong tỏa càn khôn' },
          { name: 'Kim Cang Bất Hoại Thân', rank: 'Địa Giai Hạ Phẩm', effects: 'Kim Đan chân khí mạ vàng toàn thân, đao thương bất nhập' }
        ]
      },
      {
        level: 4,
        name: 'Nguyên Anh Kỳ (Đạo Quân Tông Sư)',
        subStages: 'Sơ kỳ (Phá Đan) • Trung kỳ (Xuất Khiếu) • Hậu kỳ (Đại Viên Mãn Đạo Quân)',
        description: 'Kim đan nứt vỡ sinh ra một linh hài Nguyên Anh ngồi xếp bằng, thần niệm có thể rời thể du ngoạn càn khôn. Thọ mệnh 1.500 - 3.000 tuổi, xưng hiệu Chân Quân / Đạo Quân.',
        breakthroughCondition: 'Vượt qua Lục Cửu Thiên Kiếp (54 đạo lôi đình) kết hợp Cửu U Âm Hỏa thiêu hồn, Nguyên Anh đoạt thiên địa tạo hóa sinh sôi.',
        combatPower: 'Xé rách không gian na di vạn dặm, thân xác hủy hoại Nguyên Anh vẫn đoạt xá trùng sinh, dời non lấp biển, biến ảo pháp tướng ngàn trượng.',
        cultivationMethod: 'Thần du thái hư, hấp thu nhật nguyệt tinh hoa trực tiếp vào Nguyên Anh thông qua Nê Hoàn Cung đỉnh đầu.',
        breakthroughRitual: {
          requirements: 'Hóa Anh Đan thượng phẩm, Cửu Thiên Tức Nhưỡng bảo hộ thần hồn, đại trận che giấu thiên cơ.',
          danger: 'Phong hỏa đại kiếp thổi tắt linh hồn anh hài, biến thành thây ma mất đi thần thức.',
          ritualPlace: 'Địa mạch sâu vạn trượng dưới lòng đất hoặc hòn đảo biệt lập giữa biển bão.'
        },
        fortuitousEncounters: [
          {
            name: 'Thần Ma Chiến Trường Thượng Cổ Vết Nứt',
            description: 'Không gian vết rách hé lộ tàn tích cung điện của chư thần đã ngã xuống.',
            opportunity: 'Thu được Thông Thiên Linh Bảo tàn phiến và bí pháp Nguyên Thần phân thân.',
            danger: 'Vực Ngoại Tà Ma mai phục trong sương mù hư không.'
          },
          {
            name: 'Cổ Đỉnh Thái Sơ Trong Hư Không Bão Cát',
            description: 'Chiếc đỉnh rỉ sét trôi dạt vô định giữa không gian loạn lưu mang theo tử khí sơ khai.',
            opportunity: 'Thâu lượm một luồng Hỗn Độn Chân Hỏa dung nhập bản mệnh thần thông.',
            danger: 'Vòng xoáy không gian nuốt chửng nghiền nát Nguyên Anh.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_5', name: 'Hóa Anh Đan', rank: 'Tứ Phẩm Tuyệt Thế', effects: 'Bảo hộ thần hồn khi Kim Đan vỡ vụn hóa hình Nguyên Anh', ingredients: 'Cửu Khiếu Thiên Linh Sâm, Vạn Niên Thạch Nhũ' },
          { id: 'pill_5b', name: 'Đoạt Mệnh Tái Sinh Hoàn', rank: 'Tứ Phẩm Cực Phẩm', effects: 'Lập tức chữa lành Nguyên Anh bị rách toạc', ingredients: 'Hồi Hồn Thần Chi, Yêu Vương Tủy Dịch' }
        ],
        weaponsAndArtifacts: [
          { name: 'Trấn Ma Khảm Linh Kiếm', rank: 'Cực Phẩm Linh Bảo', effects: 'Chấn nhiếp tà ma, một kiếm chém diệt thần hồn' },
          { name: 'Cửu Long Ly Hỏa Tráo', rank: 'Thông Thiên Linh Bảo', effects: 'Phóng ra chín đầu rồng lửa thiêu rụi vạn trượng địch trận' }
        ],
        techniquesAndMartialArts: [
          { name: 'Hư Không Na Di Đại Na Di Pháp', rank: 'Địa Giai Cực Phẩm', effects: 'Chớp mắt biến mất xuất hiện cách xa mười vạn dặm' },
          { name: 'Nguyên Thần Trảm Hồn Kiếm Quyết', rank: 'Thiên Giai Hạ Phẩm', effects: 'Ngưng tụ thần niệm thành lưỡi kiếm vô hình trảm thẳng đan điền đối thủ' }
        ]
      },
      {
        level: 5,
        name: 'Hóa Thần Kỳ (Thiên Tôn / Thần Quân)',
        subStages: 'Sơ kỳ (Ý Cảnh Hóa Thần) • Trung kỳ (Lĩnh Vực) • Hậu kỳ (Thần Thông Viên Mãn)',
        description: 'Nguyên Anh cùng nhục thân dung hợp làm một thể năng lượng siêu phàm, lĩnh ngộ một tia quy tắc thiên địa ý cảnh. Thọ mệnh 5.000 - 8.000 tuổi, xưng hào Thần Quân / Thiên Tôn.',
        breakthroughCondition: 'Hóa Phàm Lịch Luyện: Phải nhập thế làm phàm nhân trải nghiệm sinh lão bệnh tử trăm năm để đốn ngộ Chân Ý quy tắc.',
        combatPower: 'Một ý niệm đông cứng thời không trăm trượng, mở ra Thần Thông Lĩnh Vực vô địch, hô phong hoán vũ, một kích hủy diệt cả một vương triều.',
        cultivationMethod: 'Quan sát nhân gian luân hồi, nuôi dưỡng Ý Cảnh thành Thực Thể Quy Tắc (Sinh Tử, Luân Hồi, Kiếm Ý, Lôi Đình).',
        breakthroughRitual: {
          requirements: 'Hóa Thần Đan cửu phẩm, hạt giống Ý Cảnh viên mãn, cắt đứt phàm trần duyên nợ.',
          danger: 'Mê muội trong hồng trần huyễn cảnh, quên mất thân phận tu sĩ mà chết già như phàm nhân.',
          ritualPlace: 'Một góc phố thị phàm trần bình yên hoặc miếu hoang rêu phong nơi cố hương.'
        },
        fortuitousEncounters: [
          {
            name: 'Ngộ Đạo Dưới Tàng Cây Bồ Đề Thượng Cổ',
            description: 'Cổ thụ ba vạn năm tuổi tỏa ra Phật quang và Đạo vận nguyên thủy.',
            opportunity: 'Đột phá Hóa Thần ý cảnh trong một giấc mộng trăm năm.',
            danger: 'Tâm ma tạo thành chấp niệm vĩnh viễn không thể tỉnh dậy.'
          },
          {
            name: 'Thiên Đạo Vết Khắc Tại Luân Hồi Nhai',
            description: 'Vách đá nơi giao nhau giữa cõi âm dương in dấu luân hồi đạo tắc.',
            opportunity: 'Cảm ngộ được Sinh Tử Luân Hồi Quy Tắc sơ khởi.',
            danger: 'Tử khí xâm nhập tủy cốt làm thọ nguyên cạn kiệt nhanh chóng.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_6', name: 'Vấn Đạo Hóa Thần Đan', rank: 'Ngũ Phẩm Đạo Đan', effects: 'Giúp thần hồn câu thông thiên địa đại đạo quy tắc', ingredients: 'Ngộ Đạo Trà Thụ Diệp, Bồ Đề Tử' },
          { id: 'pill_6b', name: 'Tịnh Tâm Lưu Ly Dịch', rank: 'Ngũ Phẩm Thượng Thừa', effects: 'Thanh tẩy tạp niệm hồng trần, củng cố đạo tâm ý cảnh', ingredients: 'Thất Tinh Hàn Tuyền, Băng Tâm Tuyết Liên' }
        ],
        weaponsAndArtifacts: [
          { name: 'Cửu U Huyết Ma Phiến', rank: 'Thông Thiên Linh Bảo', effects: 'Quạt ra gió U Minh đóng băng vạn dặm sinh linh' },
          { name: 'Hạo Thiên Thần Kính', rank: 'Đạo Khí Chuẩn Đế', effects: 'Soi rọi chân thân hư ảo, phá giải mọi cấm chế thiên địa' }
        ],
        techniquesAndMartialArts: [
          { name: 'Sinh Tử Luân Hồi Ý Cảnh Vực', rank: 'Thiên Giai Hạ Phẩm', effects: 'Trong lĩnh vực tước đoạt thọ nguyên của kẻ thù' },
          { name: 'Định Thân Trảm Thần Thuật', rank: 'Thiên Giai Trung Phẩm', effects: 'Một lời nói định trụ thời gian nửa khắc để sát địch' }
        ]
      },
      {
        level: 6,
        name: 'Luyện Hư & Hợp Thể Kỳ (Đại Năng Hùng Bá)',
        subStages: 'Luyện Hư (Hư Thực Biến Ảo) ➜ Hợp Thể (Thân Hồn Hợp Nhất)',
        description: 'Luyện Hư hóa thực, phản phác quy chân; Hợp Thể dung hòa pháp tướng cùng thiên địa vĩ lực. Thọ mệnh vượt trên hai vạn tuổi, là lão tổ trấn phái tối cao của đại giáo cửu thiên.',
        breakthroughCondition: 'Chịu đựng Cửu Cửu Thiên Kiếp xé rách nhục thân, dùng lực lượng Hư Không tôi luyện pháp thể thần ma.',
        combatPower: 'Tay bắt tinh tú, chân đạp cửu u, một bước vượt qua đại lục, sáng tạo tiểu thế giới động thiên độc lập trong tay áo.',
        cultivationMethod: 'Ngồi xếp bằng trong không gian loạn lưu hấp thu Hỗn Độn sơ khí, rèn luyện pháp thể bất hoại.',
        breakthroughRitual: {
          requirements: 'Hợp Thể Đan Thánh Phẩm, Thái Hư Thần Thiết hộ mạch, tinh túy thế giới.',
          danger: 'Bị hư không loạn lưu xé nát thành từng mảnh bụi trần vô phương ngưng tụ.',
          ritualPlace: 'Vực sâu hư không biên giới giữa các đại lục Cửu Châu.'
        },
        fortuitousEncounters: [
          {
            name: 'Mảnh Vỡ Thế Giới Thượng Cổ Rơi Xuống',
            description: 'Một góc đại lục tiên giới trôi dạt chứa đầy thiên tài địa bảo tuyệt chủng.',
            opportunity: 'Thu phục Dị Hỏa bài danh tiền tam cùng Tiên Thiên Linh Bảo.',
            danger: 'Cấm chế tiên đạo thượng cổ tự động kích hoạt hủy diệt mọi sinh mệnh.'
          },
          {
            name: 'Tổ Long Huyết Trì Trong Hư Không',
            description: 'Vũng máu tươi của thượng cổ Thái Cổ Chân Long còn rực cháy ánh hoàng kim.',
            opportunity: 'Tắm gội Tổ Long Huyết, đúc thành Vạn Kiếp Chân Long Thần Thể.',
            danger: 'Long uy nghiền nát ý thức nếu không có ý chí kiên định như sắt đá.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_7', name: 'Thái Hư Hợp Thể Đan', rank: 'Lục Phẩm Thánh Đan', effects: 'Dung hợp Nguyên Thần và Thể Phách đạt đến cảnh giới Kim Cang Bất Hoại', ingredients: 'Thái Hư Hoa vạn năm, Chân Long Chi Huyết' },
          { id: 'pill_7b', name: 'Hư Không Phá Giới Đan', rank: 'Lục Phẩm Thần Đan', effects: 'Gia tăng khả năng định vị tọa độ thế giới khi xuyên không', ingredients: 'Tinh Hà Sa, Giới Không Tinh Thạch' }
        ],
        weaponsAndArtifacts: [
          { name: 'Thái Ất Canh Kim Trấn Thiên Kiếm', rank: 'Bán Bộ Tiên Bảo', effects: 'Khai sơn phá hải, một kiếm chém đứt màng không gian' },
          { name: 'Sơn Hà Xã Tắc Tiểu Đồ', rank: 'Cổ Đạo Khí', effects: 'Nhốt cả triệu dặm non sông vào bức tranh thu nhỏ' }
        ],
        techniquesAndMartialArts: [
          { name: 'Tụ Lý Càn Khôn Đại Thuật', rank: 'Thiên Giai Thượng Phẩm', effects: 'Thu cả một tòa thành trì vào trong vạt áo' },
          { name: 'Bát Hoang Diệt Tuyệt Đại Chưởng', rank: 'Thiên Giai Cực Phẩm', effects: 'Một chưởng khổng lồ in hằn dấu ấn trên mặt đất vạn trượng' }
        ]
      },
      {
        level: 7,
        name: 'Đại Thừa & Độ Kiếp Kỳ (Bán Tiên Chí Tôn)',
        subStages: 'Đại Thừa Viên Mãn (Viên Mãn Đạo Quả) ➜ Độ Kiếp Cửu Trọng (Chờ Đợi Tiên Môn)',
        description: 'Đạo quả viên mãn không tì vết, chuẩn bị đối diện với Tiên Kiếp phi thăng. Thọ mệnh ngang cùng thiên địa, được vạn tộc tôn xưng là Chuẩn Tiên / Đạo Tổ tại nhân gian.',
        breakthroughCondition: 'Độ qua Cửu Cửu Đại Thiên Kiếp (81 đạo Tử Tiêu Thần Lôi), gột rửa toàn bộ phàm khí trong cơ thể thành Tiên Khí thuần khiết.',
        combatPower: 'Được phép câu thông tiên giới pháp tắc, một lời nói ra biến thành quy luật vũ trụ, một chưởng hủy diệt cả một tinh cầu.',
        cultivationMethod: 'Tế bái đại đạo thiên địa, thanh tẩy nhân quả nghiệp chướng hồng trần, chuyển hóa kinh mạch thành Tiên Mạch.',
        breakthroughRitual: {
          requirements: 'Hóa Tiên Trì linh dịch, Vô Thượng Công Đức Kim Thân, Tiên Thiên Hộ Kiếp Thuẫn.',
          danger: 'Tử Tiêu Diệt Thế Lôi Kiếp đánh tan hồn phách thành tro bụi, tan biến khỏi tam giới luân hồi.',
          ritualPlace: 'Thông Thiên Phong — nơi tiếp giáp gần nhất với Tiên Giới Chi Môn.'
        },
        fortuitousEncounters: [
          {
            name: 'Tiên Giới Chi Môn Hé Mở Hư Ảnh',
            description: 'Cửa trời hé mở tỏa ra Tiên Khí tiên hương nồng đậm khiến cây cỏ hóa tinh.',
            opportunity: 'Hấp thu một luồng Tiên Thiên Tiên Khí đúc thành Bán Tiên Chi Thân.',
            danger: 'Tiên Thiên Pháp Tắc nghiền ép nếu tu vi chưa đạt độ viên mãn tối thượng.'
          },
          {
            name: 'Đài Đoạt Vận Mệnh Của Tiên Thiên Đạo Tổ',
            description: 'Bệ đá cổ khắc đầy tiên văn ghi chép quỹ đạo vận hành của số phận tam giới.',
            opportunity: 'Lĩnh ngộ một tia Vận Mệnh Chi Lực, né tránh được một đòn chí tử.',
            danger: 'Thiên đạo phản phệ lập tức giáng lôi phạt nặng nề.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_8', name: 'Độ Kiếp Thần Đan', rank: 'Thất Phẩm Tiên Đan', effects: 'Chống đỡ 3 đợt lôi kiếp mạnh nhất của Tử Tiêu Thần Lôi', ingredients: 'Tiên Thiên Ngũ Hành Quả, Tiên Dịch Linh Tuyền' },
          { id: 'pill_8b', name: 'Cửu Khiếu Hóa Tiên Tủy', rank: 'Thất Phẩm Tiên Phẩm', effects: 'Chuyển hóa 100% phàm cốt thành Tiên Thể bất hoại', ingredients: 'Hóa Tiên Thạch Nhũ, Tiên Linh Chi' }
        ],
        weaponsAndArtifacts: [
          { name: 'Khai Thiên Bích Địa Ấn', rank: 'Tiên Khí Phẩm Giai', effects: 'Uy lực trấn áp cả một phương giới diện' },
          { name: 'Cửu U Trấn Hồn Chung', rank: 'Tiên Binh Viễn Cổ', effects: 'Tiếng chuông ngân rung chuyển hư không tam giới, định trụ tiên ma' }
        ],
        techniquesAndMartialArts: [
          { name: 'Thái Thượng Vong Tình Khai Thiên Kiếm', rank: 'Tiên Giai Hạ Phẩm', effects: 'Kiếm ý không vướng trần ai, chém đứt nhân quả túc mệnh' },
          { name: 'Ngũ Hành Đại Độn Thiên Thuật', rank: 'Tiên Giai Trung Phẩm', effects: 'Hóa thân thành bất kỳ nguyên tố nào trong ngũ hành không dấu vết' }
        ]
      },
      {
        level: 8,
        name: 'Phi Thăng Chân Tiên (Đạo Tổ Bất Hủ)',
        subStages: 'Địa Tiên • Thiên Tiên • Kim Tiên (Bất Hủ) • Tiên Vương • Tiên Đế Đạo Tổ',
        description: 'Bước qua Tiên Môn tắm trong Hóa Tiên Trì, đúc thành Tiên Thể vĩnh hằng bất tử. Siêu thoát khỏi lục đạo luân hồi, sống cùng nhật nguyệt, vĩnh hằng không mục nát.',
        breakthroughCondition: 'Tiên Giới Chi Môn hoàn toàn mở ra, kim quang tiếp dẫn chiếu rọi, đúc nên Tiên Cách và Đại Đạo Thần Văn.',
        combatPower: 'Xoay chuyển dòng thời gian, đảo ngược nhân quả, sáng tạo ra các thế giới hạ giới, một ý niệm cứu sống hoặc tiêu diệt hàng tỷ sinh linh.',
        cultivationMethod: 'Lĩnh ngộ 3.000 Đại Đạo của vũ trụ nguyên sơ, dung hợp bản thân làm một với cội nguồn sáng thế.',
        breakthroughRitual: {
          requirements: 'Đại Đạo Viên Mãn, vô khiếm khuyết tâm ma, tiếp dẫn tiên quang tắm rửa toàn thân.',
          danger: 'Vực Ngoại Cổ Ma chặn đường tại Thiên Môn cướp đoạt Tiên Quả.',
          ritualPlace: 'Đăng Tiên Thai cổ xưa ngự trị giữa biển sao tinh hà.'
        },
        fortuitousEncounters: [
          {
            name: 'Hỗn Độn Thanh Liên Nở Rộ Giữa Vũ Trụ',
            description: 'Bông sen xanh khởi thủy từ thời Bàn Cổ khai thiên lập địa hé nở cánh sen.',
            opportunity: 'Nuốt trọn Hạt Sen Sáng Thế, trở thành Tiên Đế Chúa Tể chư thiên vạn giới.',
            danger: 'Quy luật Hỗn Độn đồng hóa bản ngã thành hư vô vĩnh hằng.'
          },
          {
            name: 'Cội Nguồn Thời Gian Trường Hà Chi Nhánh',
            description: 'Dòng sông thời gian lấp lánh cát tinh tú chảy xiết giữa hư vô vô biên.',
            opportunity: 'Vớt một giọt Thời Gian Tinh Sa, nắm giữ bí mật đảo ngược quá khứ.',
            danger: 'Sóng thời gian cuốn trôi ký ức và tuổi thọ vô tận.'
          }
        ],
        pillsAndElixirs: [
          { id: 'pill_9', name: 'Cửu Chuyển Hỗn Độn Bất Tử Đan', rank: 'Thần Phẩm Vô Thượng', effects: 'Tái tạo thần hồn ngay cả khi bị xóa sổ khỏi lịch sử thời gian', ingredients: 'Khí Thái Sơ Khai Thiên, Hỗn Độn Chi Thủy' },
          { id: 'pill_9b', name: 'Vạn Cổ Trường Sinh Tiên Lộ', rank: 'Chí Tôn Thần Phẩm', effects: 'Ban cho một phàm nhân thọ mệnh ngang bằng với cả một vũ trụ', ingredients: 'Bất Lão Tuyền, Tinh Hà Bản Nguyên' }
        ],
        weaponsAndArtifacts: [
          { name: 'Hỗn Độn Khai Thiên Kiếm', rank: 'Sáng Thế Thần Binh', effects: 'Chém đứt hỗn độn phân định âm dương lập nên vũ trụ mới' },
          { name: 'Thái Hư Luân Hồi Kính', rank: 'Chí Tôn Hỗn Độn Khí', effects: 'Tái tạo lại luân hồi sáu cõi, phục sinh người chết từ dòng thời gian' }
        ],
        techniquesAndMartialArts: [
          { name: 'Ngôn Xuất Pháp Tùy Thần Thuật', rank: 'Sáng Thế Thần Giai', effects: 'Nói vật gì sinh ra vật đó, định đoạt số phận của vạn vật' },
          { name: 'Đại Đạo Bất Diệt Luân Hồi Công', rank: 'Vô Thượng Cấm Kỵ', effects: 'Dù thân xác và linh hồn tan biến vẫn tự động tái sinh tại điểm khởi đầu' }
        ]
      }
    ]
  },
  {
    id: 'system_dau_khi_thap_giai',
    name: 'Đấu Khí Thập Giai Hệ Thống (Huyền Huyễn Kỳ Ảo)',
    genre: 'Huyền Huyễn Kỳ Ảo',
    description: 'Hệ thống tu luyện Đấu Khí trứ danh với 10 giai vị kinh điển, từ rèn luyện Đấu Chi Khí đến khi ngưng tụ Đấu Đế Chi Thân phá toái hư không.',
    levels: [
      {
        level: 1,
        name: 'Đấu Giả & Đấu Sư (1 - 9 Tinh)',
        subStages: 'Đấu Chi Khí (1-9 Đoạn) ➜ Đấu Giả (Tụ Khí Hóa Khí Xoáy) ➜ Đấu Sư (Đấu Khí Hóa Dịch Khí Hạt)',
        description: 'Tụ khí thành vòng xoáy trong đan điền, đấu khí ngoại phóng bọc quanh thân thể, bắt đầu tu luyện Đấu Kỹ công kích.',
        breakthroughCondition: 'Tụ Khí Tán trợ giúp ngưng tụ Khí Xoáy 100% không vỡ vụn.',
        combatPower: 'Một đấm vỡ nát tảng đá ngàn cân, thân thủ linh hoạt như báo gấm, đấu khí bao bọc vũ khí gia tăng sát thương bén ngót.',
        cultivationMethod: 'Vận chuyển công pháp hút nạp thiên địa đấu khí vào kinh mạch, ngưng luyện tạp chất thành đấu khí thuần tịnh.',
        breakthroughRitual: {
          requirements: 'Tụ Khí Tán nhị phẩm, mật thất thanh tĩnh.',
          danger: 'Khí xoáy nổ tung gây phế bỏ kinh mạch nếu tâm thần bất định.',
          ritualPlace: 'Đan phòng hoặc tĩnh thất gia tộc.'
        },
        fortuitousEncounters: [
          {
            name: 'Động Quật Của Dược Tông Cường Giả',
            description: 'Động phủ bí mật bên vách núi cheo leo chứa dược đỉnh và sách cổ.',
            opportunity: 'Thu được Trữ Vật Giới Chỉ chứa Tụ Khí Tán và đấu kỹ Hoàng Giai đỉnh cấp.',
            danger: 'Độc xà canh giữ cửa động.'
          }
        ],
        pillsAndElixirs: [
          { id: 'dk_pill_1', name: 'Tụ Khí Tán', rank: 'Nhị Phẩm', effects: 'Gia tăng 100% xác suất ngưng tụ Đấu Khí Xoáy thăng cấp Đấu Giả', ingredients: 'Mặc Diệp Liên, Tụ Khí Thảo' },
          { id: 'dk_pill_2', name: 'Hộ Mạch Đan', rank: 'Nhị Phẩm', effects: 'Bảo vệ kinh mạch khi đấu khí bạo phát', ingredients: 'Huyết Sâm, Hoạt Huyết Chi' }
        ],
        weaponsAndArtifacts: [
          { name: 'Huyền Thiết Đoản Nhận', rank: 'Linh Khí Nhất Giai', effects: 'Dẫn truyền đấu khí tăng 20% độ sắc bén' }
        ],
        techniquesAndMartialArts: [
          { name: 'Bát Cực Băng (Đấu Kỹ Cận Chiến)', rank: 'Huyền Giai Cao Cấp', effects: 'Ẩn giấu 8 tầng ám kình bộc phát nội tạng' }
        ]
      },
      {
        level: 2,
        name: 'Đại Đấu Sư & Đấu Linh (Đấu Khí Hóa Giáp)',
        subStages: 'Đại Đấu Sư (Đấu Khí Ngưng Tinh Hạt) ➜ Đấu Linh (Đấu Khí Ngưng Tụ Thể Rắn Tinh Thể)',
        description: 'Đấu khí hóa thành bộ chiến giáp kiên cố bao bọc bên ngoài cơ thể, đao thương phàm tục bất nhập, uy áp khiến kẻ yếu nghẹt thở.',
        breakthroughCondition: 'Thôn phệ Tam Văn Thanh Linh Đan hoặc linh dược tôi cốt, nén chặt đấu khí dịch thái thành thể rắn.',
        combatPower: 'Đấu Khí Hóa Giáp chống đỡ bộc phá kinh hoàng, đấu khí phóng ra ngoài như lưỡi đao sắc bén chém đứt cây cổ thụ.',
        cultivationMethod: 'Rèn luyện cơ bắp dưới áp lực thác nước ngàn trượng kết hợp hấp thu linh thạch năng lượng cuồn cuộn.',
        breakthroughRitual: {
          requirements: 'Tam Văn Thanh Linh Đan, đầm lầy hàn băng giảm nhiệt.',
          danger: 'Năng lượng bạo liệt đốt cháy kinh mạch.',
          ritualPlace: 'Băng đầm hoặc động băng sâu dưới lòng đất.'
        },
        fortuitousEncounters: [
          {
            name: 'Hồ Nham Thạch Dưới Lòng Đất Già Nam',
            description: 'Vùng nham thạch cuồn cuộn chứa hỏa độc nồng đậm và dấu vết Dị Hỏa.',
            opportunity: 'Thu được Địa Tâm Liên Tử gia tăng tu vi Đại Đấu Sư thần tốc.',
            danger: 'Song Đầu Hỏa Linh Xà tứ giai tấn công.'
          }
        ],
        pillsAndElixirs: [
          { id: 'dk_pill_3', name: 'Tam Văn Thanh Linh Đan', rank: 'Tứ Phẩm', effects: 'Gia tăng cấp bậc Đấu Sư / Đại Đấu Sư thần tốc', ingredients: 'Thanh Linh Quả ba văn, Hỏa Tinh Tảo' }
        ],
        weaponsAndArtifacts: [
          { name: 'Huyền Trọng Xích', rank: 'Cổ Binh Kỳ Khí', effects: 'Ức chế đấu khí giúp tu luyện gia tốc gấp bội' }
        ],
        techniquesAndMartialArts: [
          { name: 'Diễm Phân Phệ Lãng Xích', rank: 'Địa Giai Trung Cấp', effects: 'Một xích chém ra biển lửa chia cắt dòng sông' }
        ]
      },
      {
        level: 3,
        name: 'Đấu Vương & Đấu Hoàng (Đấu Khí Hóa Dực)',
        subStages: 'Đấu Vương (Đấu Khí Hóa Cánh Bay Lượn) ➜ Đấu Hoàng (Đấu Khí Dực Hóa Thực Thể, Điều Động Thiên Địa Năng Lượng)',
        description: 'Đấu khí sau lưng ngưng tụ thành đôi cánh rực rỡ xé toạc không gian phi hành tốc độ âm thanh, là cường giả xưng bá một đế quốc hùng mạnh.',
        breakthroughCondition: 'Hoàng Cực Đan hoặc Đấu Vương Đan, đốn ngộ cách điều động thiên địa năng lượng xung quanh hỗ trợ.',
        combatPower: 'Phi thiên độn địa, một đòn Đấu Kỹ Địa Giai san phẳng cả một quân đoàn vạn binh mã, dời non lấp biển.',
        cultivationMethod: 'Ngồi thiền trên đỉnh mây đón gió bão, dẫn xuất năng lượng thiên địa dung hợp vào cánh đấu khí.',
        breakthroughRitual: {
          requirements: 'Hoàng Cực Đan lục phẩm, tụ linh trận phong vân.',
          danger: 'Hóa dực thất bại đấu khí phản phệ rơi từ trên cao.',
          ritualPlace: 'Đỉnh phong Tuyết Sơn đón gió ngàn.'
        },
        fortuitousEncounters: [
          {
            name: 'Sa Mạc Tháp Qua Nhĩ Dị Hỏa Manh Mối',
            description: 'Vùng cát nóng rực nơi Xà Nhân Tộc sinh sống che giấu Thanh Liên Địa Tâm Hỏa.',
            opportunity: 'Thôn phệ Dị Hỏa thăng cấp Đấu Hoàng và tiến hóa công pháp.',
            danger: 'Mỹ Đỗ Toa Nữ Vương và cuồng phong cát cháy.'
          }
        ],
        pillsAndElixirs: [
          { id: 'dk_pill_4', name: 'Hoàng Cực Đan', rank: 'Lục Phẩm', effects: 'Nâng cao 1-2 tinh tu vi cho cường giả Đấu Hoàng', ingredients: 'Long Tu Thảo, Hạt Sen Địa Tâm' }
        ],
        weaponsAndArtifacts: [
          { name: 'Xà Cốt Đao', rank: 'Lục Phẩm Bảo Binh', effects: 'Phóng ra xà lôi kịch độc làm đông cứng đấu khí đối thủ' }
        ],
        techniquesAndMartialArts: [
          { name: 'Phật Nộ Hỏa Liên', rank: 'Đấu Kỹ Tự Sáng Tạo', effects: 'Dung hợp nhiều loại hỏa diễm bạo phát uy lực hủy thiên diệt địa' }
        ]
      },
      {
        level: 4,
        name: 'Đấu Tông (Khống Chế Không Gian Chi Lực)',
        subStages: '1 Tinh ➜ 9 Tinh Đấu Tông Đỉnh Phong',
        description: 'Không cần cánh đấu khí vẫn có thể bước đi trên không trung như dạo chơi trên mặt đất, chưởng khống một tia không gian lực lượng vô hình.',
        breakthroughCondition: 'Phá Tông Đan hộ thể, lĩnh ngộ không gian tỏa định và không gian vặn vẹo.',
        combatPower: 'Không gian tỏa định khiến đối thủ đông cứng không thể nhúc nhích, một chưởng xé rách không gian tạo thành hắc động hút cạn sinh mệnh.',
        cultivationMethod: 'Cảm nhận không gian quy tắc ba động, dùng không gian lực lượng rèn luyện lục phủ ngũ tạng.',
        breakthroughRitual: {
          requirements: 'Phá Tông Đan thất phẩm, kết giới không gian hộ pháp.',
          danger: 'Bị không gian kẽ hở cắn nuốt chân thân.',
          ritualPlace: 'Hư không thông đạo tĩnh lặng.'
        },
        fortuitousEncounters: [
          {
            name: 'Thiên Cực Động Phủ Tại Trung Châu',
            description: 'Tàn tích động phủ của tiền bối Đấu Tôn lưu lại di sản và đấu kỹ cao giai.',
            opportunity: 'Thu được Phi Hành Đấu Kỹ Thiên Giai và Cốt Linh Lãnh Hỏa.',
            danger: 'Hồn Điện Hộ Pháp mai phục đoạt hồn.'
          }
        ],
        pillsAndElixirs: [
          { id: 'dk_pill_5', name: 'Phá Tông Đan', rank: 'Thất Phẩm', effects: 'Gia tăng tỷ lệ đột phá bình cảnh Đấu Hoàng lên Đấu Tông', ingredients: 'Không Gian Thạch, Hồn Anh Quả' }
        ],
        weaponsAndArtifacts: [
          { name: 'Hồn Tỏa Tỏa Hồn Liên', rank: 'Thất Phẩm Khí Bảo', effects: 'Chuyên khắc chế và câu hồn phách linh hồn thể' }
        ],
        techniquesAndMartialArts: [
          { name: 'Không Gian Khóa Định Thuật', rank: 'Đấu Kỹ Thiên Bẩm', effects: 'Khóa chặt tọa độ không gian giam giữ đối thủ' }
        ]
      },
      {
        level: 5,
        name: 'Đấu Tôn (Không Gian Không Tông & Vực)',
        subStages: '1 Tinh ➜ 9 Tinh ➜ Cửu Chuyển Đấu Tôn (Chín lần niết bàn sinh tử)',
        description: 'Bàn tay nắm chặt có thể bóp nát không gian thành từng mảnh vụn, xé rách không gian tạo thành Không Gian Thông Đạo di chuyển triệu dặm.',
        breakthroughCondition: 'Trải qua Cửu Chuyển thối luyện, mỗi lần chuyển đổi đấu khí tinh khiết tăng lên gấp bội phần.',
        combatPower: 'Dời chuyển sơn hà, tự tạo Không Gian Trùng Điệp giam cầm kẻ địch, đấu kỹ Thiên Giai bùng nổ hủy diệt ngàn dặm hoang mạc.',
        cultivationMethod: 'Bế quan trong không gian phong bạo vô tận, hấp thu năng lượng không gian vào xương tủy.',
        breakthroughRitual: {
          requirements: 'Tôn Cực Đan, Cửu Chuyển Kim Đan dịch.',
          danger: 'Cửu chuyển niết bàn sinh tử kiếp thiêu rụi kinh mạch.',
          ritualPlace: 'Tâm nham thạch đáy biển sâu hoặc sơn cốc phong bế.'
        },
        fortuitousEncounters: [
          {
            name: 'Thú Trủng Viễn Cổ Di Tích',
            description: 'Khu mộ chôn cất các hung thú viễn cổ từ thời hồng hoang.',
            opportunity: 'Thôn phệ Tinh Huyết Thiên Yêu Hoàng và Viễn Cổ Đấu Kỹ.',
            danger: 'Oán niệm hung thú thức tỉnh.'
          }
        ],
        pillsAndElixirs: [
          { id: 'dk_pill_6', name: 'Bồ Đề Hóa Thể Diệp Đan', rank: 'Bát Phẩm Nhất Sắc', effects: 'Thanh lọc đấu khí giúp quá trình Cửu Chuyển Đấu Tôn viên mãn', ingredients: 'Bồ Đề Diệp, Thiên Huyễn Thảo' }
        ],
        weaponsAndArtifacts: [
          { name: 'Cổ Đỉnh Vạn Thú', rank: 'Bát Phẩm Dược Đỉnh', effects: 'Đỉnh phong luyện đan và trấn áp cường địch không gian' }
        ],
        techniquesAndMartialArts: [
          { name: 'Đại Hư Không Trảm', rank: 'Địa Giai Đỉnh Phong', effects: 'Xé rách một vệt không gian đen dài vạn trượng chém đôi chiến trường' }
        ]
      },
      {
        level: 6,
        name: 'Bán Thánh & Đấu Thánh (Cải Tạo Sơn Hà)',
        subStages: 'Bán Thánh ➜ Đấu Thánh (1-9 Tinh: Sơ kỳ, Trung kỳ, Hậu kỳ)',
        description: 'Thoát thai hoán cốt, một giọt máu của Đấu Thánh có thể làm sống lại cây cỏ trăm năm hoặc giết chết một vị Đấu Hoàng. Khai mở tự thân Tiểu Thế Giới Động Phủ.',
        breakthroughCondition: 'Bồ Đề Đan, Bồ Đề Hóa Thể Diệp, ngộ đạo chín kiếp dưới gốc Bồ Đề Cổ Thụ.',
        combatPower: 'Một ngón tay xuyên thủng đại lục, xé toạc thương khung mở ra Đấu Thánh Giới, sinh diệt chỉ trong một ý niệm.',
        cultivationMethod: 'Dung hợp thiên địa dị hỏa hoặc lôi đình viễn cổ, mở rộng giới diện động thiên tự thân.',
        breakthroughRitual: {
          requirements: 'Bồ Đề Đan cửu phẩm, Bồ Đề Cổ Thụ tham ngộ.',
          danger: 'Luân hồi bách thế ma chướng nếu không thể thức tỉnh.',
          ritualPlace: 'Gốc cây Bồ Đề Thượng Cổ tại Mãng Hoang Cổ Kỷ.'
        },
        fortuitousEncounters: [
          {
            name: 'Đà Xá Cổ Đế Động Phủ Khảo Nghiệm',
            description: 'Động phủ của vị Đấu Đế cuối cùng ẩn giấu dưới đáy nham thạch ngàn vạn dặm.',
            opportunity: 'Thu được Đế Phẩm Ấu Đan và Dị Hỏa Quảng Trường.',
            danger: 'Chúc Khôn Thái Hư Cổ Long trấn giữ.'
          }
        ],
        pillsAndElixirs: [
          { id: 'dk_pill_7', name: 'Bồ Đề Đan', rank: 'Cửu Phẩm Bảo Đan', effects: 'Gia tăng 50% cơ hội trùng kích thành công Bán Thánh / Đấu Thánh', ingredients: 'Bồ Đề Tử, Cổ Thụ Tâm Dịch' }
        ],
        weaponsAndArtifacts: [
          { name: 'Thiên Yêu Tru Ma Kích', rank: 'Đấu Thánh Binh Khí', effects: 'Chứa tinh huyết Thiên Yêu Hoàng, một kích xé toạc thương khung' }
        ],
        techniquesAndMartialArts: [
          { name: 'Hoàng Tuyền Chỉ & Hoàng Tuyền Chưởng', rank: 'Thiên Giai Trung Cấp', effects: 'Ngưng tụ hoàng tuyền chi thủy tước đoạt sinh mạng' }
        ]
      },
      {
        level: 7,
        name: 'Đấu Đế (Chí Tôn Vô Thượng)',
        subStages: 'Đấu Đế Cực Cảnh (Phá Toái Hư Không)',
        description: 'Hấp thu Khí Nguyên Thủy Khởi Nguyên, huyết mạch kích hoạt ban phúc trạch cho toàn bộ hậu duệ tộc nhân thăng cấp Đấu Thánh. Là thần linh tối cao duy nhất.',
        breakthroughCondition: 'Đế Phẩm Ấu Đan hoặc Bản Nguyên Đấu Đế Thừa Kế cùng Khí Nguyên Thủy bí ẩn của vũ trụ.',
        combatPower: 'Đấu Đế Thân Thể cao vạn trượng vượt qua tầng mây, một chưởng tái tạo lại cả một đại lục, xé rách vị diện tiến vào Đại Thiên Thế Giới.',
        cultivationMethod: 'Dung hợp 22 loại Dị Hỏa thành Hỗn Độn Đế Hỏa hoặc luyện hóa toàn bộ căn nguyên của một vị diện.',
        breakthroughRitual: {
          requirements: 'Đế Phẩm Kim Đan, Khí Nguyên Thủy, Hỗn Độn Chân Hỏa.',
          danger: 'Thân xác hóa thành tro bụi nếu không chịu nổi uy áp của quy luật vũ trụ.',
          ritualPlace: 'Đỉnh Cổ Đế Quảng Trường giữa hư không.'
        },
        fortuitousEncounters: [
          {
            name: 'Đại Thiên Thế Giới Vị Diện Kẽ Nứt',
            description: 'Cửa ngõ dẫn ra thế giới mênh mông vượt trên cả Đấu Khí Đại Lục.',
            opportunity: 'Hấp thu Linh Lực cao cấp tiến vào cảnh giới Chí Tôn.',
            danger: 'Vị diện phong bạo cắt đứt mọi sinh cơ.'
          }
        ],
        pillsAndElixirs: [
          { id: 'dk_pill_8', name: 'Đế Phẩm Kim Đan', rank: 'Đế Phẩm Thần Đan', effects: 'Trực tiếp đúc nên Đấu Đế Chi Thân bất tử', ingredients: 'Khí Nguyên Thủy, Bản Nguyên Vị Diện' }
        ],
        weaponsAndArtifacts: [
          { name: 'Dị Hỏa Hằng Cổ Xích', rank: 'Đế Binh Viễn Cổ', effects: 'Hội tụ sức mạnh của 22 loại Dị Hỏa trấn áp vạn giới' }
        ],
        techniquesAndMartialArts: [
          { name: 'Dị Hỏa Quảng Trường Lĩnh Vực', rank: 'Thiên Giai Viên Mãn Đỉnh Cao', effects: 'Thiêu đốt toàn bộ vị diện thành biển lửa vĩnh hằng' }
        ]
      }
    ]
  },
  {
    id: 'system_vu_tru_di_nang_sci_fi',
    name: 'Vũ Trụ Dị Năng & Cơ Giáp Thăng Giai (Khoa Huyễn / Cyberpunk)',
    genre: 'Khoa Học Viễn Tưởng (Sci-Fi)',
    description: 'Hệ thống tiến hóa gien sinh học kết hợp công nghệ lượng tử nano và cơ giáp hạt nhân từ phàm nhân cấp E đến Chúa Tể Vũ Trụ cấp Tinh Hệ.',
    levels: [
      {
        level: 1,
        name: 'Chiến Binh Cấp E & D (Cường Hóa Gien)',
        subStages: 'Cấp E (Phá vỡ giới hạn cơ bắp) ➜ Cấp D (Kích hoạt Tinh Thần Lực sơ cấp)',
        description: 'Tiêm huyết thanh gien tiến hóa, mật độ xương tăng gấp 5 lần, phản xạ gấp 10 lần vận động viên đỉnh cao, điều khiển ngoại giáp exoskeletons.',
        breakthroughCondition: 'Đột biến gien liều cao kết hợp thuốc giải trừ độc tính sinh học.',
        combatPower: 'Đấm xuyên tường bê tông cốt thép, một mình cận chiến quét sạch một tiểu đội lính đặc nhiệm trang bị súng laser hạng nặng.',
        cultivationMethod: 'Luyện tập thể lực cường độ cao trong phòng trọng lực nhân tạo gấp 3 lần Trái Đất kết hợp truyền dinh dưỡng tế bào.',
        breakthroughRitual: {
          requirements: 'Huyết thanh cường hóa gien Titan bậc 1, buồng sốc điện lượng tử.',
          danger: 'Tế bào tự phân rã hoặc trụy tim do quá tải.',
          ritualPlace: 'Phòng thí nghiệm sinh học ngầm dưới lòng đất.'
        },
        fortuitousEncounters: [
          {
            name: 'Mảnh Vỡ Vệ Tinh Trinh Sát Cổ Rơi Xuống Vùng Hoang Dã',
            description: 'Vệ tinh quân sự rớt trong rừng rậm chứa chip dữ liệu công nghệ cao.',
            opportunity: 'Giải mã được thuật toán huấn luyện phản xạ cơ bắp tối tân.',
            danger: 'Dị thú đột biến phóng xạ lảng vảng xung quanh.'
          }
        ],
        pillsAndElixirs: [
          { id: 'scifi_1', name: 'Ống Tiêm Dung Dịch Tiến Hóa Titan Alpha', rank: 'Dược Phẩm Cấp D', effects: 'Kích hoạt 15% chuỗi xoắn gien tiềm ẩn, tái tạo cơ bắp', ingredients: 'Chiết xuất tủy thú biến dị, nano enzym' }
        ],
        weaponsAndArtifacts: [
          { name: 'Ngoại Giáp Khung Xương Thép Vonfram', rank: 'Trang Bị Cấp D', effects: 'Gia tăng sức nâng lên 3 tấn, tích hợp súng vi sóng' }
        ],
        techniquesAndMartialArts: [
          { name: 'Thuật Chiến Đấu Cận Thần Kinh Lượng Tử', rank: 'Kỹ Năng Cấp D', effects: 'Dự đoán đường đạn đối phương trước 0.3 giây' }
        ]
      },
      {
        level: 2,
        name: 'Dị Năng Cấp C & B (Nguyên Tố & Động Năng Siêu Phàm)',
        subStages: 'Cấp C (Phát xuất nguyên tố Lửa/Sấm/Băng) ➜ Cấp B (Bay lượn & Thao túng từ trường)',
        description: 'Mở khóa chuỗi xoắn gien thứ 4, tạo ra trường năng lượng sinh học bao bọc cơ thể, kết nối thần kinh trực tiếp với Chiến Giáp Cơ Khí Siêu Âm.',
        breakthroughCondition: 'Lò phản ứng năng lượng lượng tử dung hợp sinh học cấy ghép vào lồng ngực.',
        combatPower: 'Bắn ra chùm tia plasma nhiệt hạch, bay với vận tốc Mach 5, một mình phá hủy một pháo đài bay chiến lược.',
        cultivationMethod: 'Đồng hóa sóng não với trường điện từ tự nhiên, dẫn truyền năng lượng hạt nhân mini vào tế bào sinh học.',
        breakthroughRitual: {
          requirements: 'Lõi pin nhiệt hạch siêu nén, dung dịch điện giải nano bạc.',
          danger: 'Bỏng bức xạ hạt nhân toàn phần và hoại tử tế bào thần kinh.',
          ritualPlace: 'Lò phản ứng nhiệt hạch thử nghiệm đã ngừng hoạt động.'
        },
        fortuitousEncounters: [
          {
            name: 'Xác Tàu Thám Hiểm Không Gian Người Ngoài Hành Tinh',
            description: 'Phi thuyền cổ xưa chôn sâu dưới băng vĩnh cửu Nam Cực.',
            opportunity: 'Tích hợp động cơ đẩy phản vật chất mini vào chiến giáp cá nhân.',
            danger: 'Hệ thống phòng thủ AI tự động kích hoạt vũ khí hủy diệt.'
          }
        ],
        pillsAndElixirs: [
          { id: 'scifi_2', name: 'Viên Uống Nano Sinh Học Tái Tạo Lõi Tế Bào', rank: 'Dược Liệu Cấp B', effects: 'Chống độc bức xạ phóng xạ và tái sinh tế bào bị phá hủy', ingredients: 'Hạt nano carbon, chiết xuất rêu sao Hỏa' }
        ],
        weaponsAndArtifacts: [
          { name: 'Chiến Giáp Cơ Khí Siêu Thanh Ảo Ảnh', rank: 'Vũ Khí Cấp B', effects: 'Gia tốc Mach 5, tàng hình quang học và lá chắn năng lượng' }
        ],
        techniquesAndMartialArts: [
          { name: 'Trường Thao Túng Điện Từ Sinh Học', rank: 'Dị Năng Cấp B', effects: 'Làm tê liệt toàn bộ thiết bị điện tử trong bán kính 5km' }
        ]
      },
      {
        level: 3,
        name: 'Siêu Phàm Cấp A & S (Chiến Thần Diệt Hạm)',
        subStages: 'Cấp A (Cấp Thảm Họa Thiên Tai) ➜ Cấp S (Cấp Diệt Thành / Diệt Hạm Đội)',
        description: 'Cơ thể chuyển hóa thành nửa năng lượng thể, có thể sinh tồn trần trụi ngoài khoảng không vũ trụ chân không không cần bình dưỡng khí.',
        breakthroughCondition: 'Đốt cháy hạt nhân gien siêu việt, đồng hóa linh hồn với máy tính sinh học lượng tử.',
        combatPower: 'Một quyền đấm vỡ tàu chiến hạm không gian dài 3.000 mét, triệu hồi bão từ trường hủy diệt toàn bộ mạng lưới điện tử của một châu lục.',
        cultivationMethod: 'Thiền định trong chân không vũ trụ, hấp thu bão mặt trời và tia vũ trụ năng lượng cao.',
        breakthroughRitual: {
          requirements: 'Tinh thể năng lượng siêu chiều, ma trận điều áp trường lực.',
          danger: 'Ý thức bị phân rã thành các hạt photon vô định giữa vũ trụ.',
          ritualPlace: 'Trạm không gian quỹ đạo đồng bộ gần mặt trời.'
        },
        fortuitousEncounters: [
          {
            name: 'Thiên Thạch Chứa Khoáng Thạch Siêu Chiều Rơi Xuống Mặt Trăng',
            description: 'Mảnh thiên thạch phát ra ánh sáng tím bí ẩn bẻ cong không gian xung quanh.',
            opportunity: 'Hấp thu năng lượng siêu chiều đột phá cấp S thần tốc.',
            danger: 'Vùng dị thường trọng lực xé nát cơ thể.'
          }
        ],
        pillsAndElixirs: [
          { id: 'scifi_3', name: 'Huyết Thanh Siêu Việt Không Thời Gian', rank: 'Dược Phẩm Cấp S', effects: 'Đẩy tốc độ tư duy não bộ lên tiệm cận vận tốc ánh sáng', ingredients: 'Tinh thể pha lê không gian, dịch tủy sinh vật tinh vân' }
        ],
        weaponsAndArtifacts: [
          { name: 'Pháo Năng Lượng Phản Vật Chất Cầm Tay', rank: 'Vũ Khí Cấp S', effects: 'Bắn ra chùm tia xóa sổ mọi vật chất trong bán kính tiếp xúc' }
        ],
        techniquesAndMartialArts: [
          { name: 'Bão Từ Sinh Học Hủy Hạm Đội', rank: 'Kỹ Năng Cấp S', effects: 'Phóng ra làn sóng xung kích nghiền nát vỏ tàu mẹ bọc giáp dày' }
        ]
      },
      {
        level: 4,
        name: 'Hành Tinh Cấp (Planet Tier / Thần Chiến Binh)',
        subStages: 'Hành Tinh Sơ Kỳ ➜ Đỉnh Phong (Lực Trường Vệ Tinh)',
        description: 'Trường lực sinh học tương đương với từ trường của một hành tinh độc lập, có thể lực hút kéo các thiên thạch nhỏ lệch khỏi quỹ đạo.',
        breakthroughCondition: 'Luyện hóa Lõi Năng Lượng Địa Cầu hoặc Hạch Tinh của một hành tinh chết.',
        combatPower: 'Đấm nứt bề mặt mặt trăng, năng lượng bộc phát thiêu rụi toàn bộ bầu khí quyển nếu không kiềm chế.',
        cultivationMethod: 'Dùng ý thức bao trùm toàn bộ hành tinh, đồng điệu nhịp thở sinh học với dòng dung nham lõi đất.',
        breakthroughRitual: {
          requirements: 'Lõi hạch hành tinh đã nguội lạnh, máy gia tốc hạt cỡ đại lục.',
          danger: 'Nổ tung vỏ hành tinh kéo theo bản thân bị chôn vùi.',
          ritualPlace: 'Tâm lõi dung nham trung tâm hành tinh.'
        },
        fortuitousEncounters: [
          {
            name: 'Cổng Dịch Chuyển Sao Siêu Văn Minh Bị Bỏ Hoang',
            description: 'Cổng vòng xuyến bằng vật chất tối đường kính 100km quay quanh sao Mộc.',
            opportunity: 'Kết nối mạng lưới tri thức văn minh cấp 3 toàn ngân hà.',
            danger: 'Lỗ sâu không ổn định hút vào chiều không gian chết.'
          }
        ],
        pillsAndElixirs: [
          { id: 'scifi_4', name: 'Dịch Năng Lượng Lõi Sao Tinh Khiết', rank: 'Bảo Dược Hành Tinh', effects: 'Gia tăng dung lượng năng lượng sinh học lên quy mô cấp lục địa', ingredients: 'Dung nham lõi sao, tinh chất trường hấp dẫn' }
        ],
        weaponsAndArtifacts: [
          { name: 'Chiến Giáp Hành Tinh Thái Thần Cổ', rank: 'Thần Khí Khoa Huyễn', effects: 'Khai mở trường lực phòng ngự bao phủ toàn bộ vệ tinh tự nhiên' }
        ],
        techniquesAndMartialArts: [
          { name: 'Định Luật Hấp Dẫn Sụp Đổ', rank: 'Chiêu Thức Hành Tinh', effects: 'Gia tăng trọng lực cục bộ gấp 10.000 lần nghiền nát quân đoàn địch' }
        ]
      },
      {
        level: 5,
        name: 'Hằng Tinh Cấp & Vũ Trụ Cấp (Cosmic Sovereign)',
        subStages: 'Hằng Tinh Cấp (Hấp thu ánh sáng Mặt Trời) ➜ Tinh Hệ Cấp ➜ Vũ Trụ Chúa Tể',
        description: 'Bản thân là một mặt trời di động hoặc một lỗ đen mini, kiểm soát quy luật hấp dẫn và thời gian giãn nở tương đối tính.',
        breakthroughCondition: 'Thôn phệ một ngôi sao siêu tân tinh đang phát nổ, đúc nên Cơ Thể Hạt Cơ Bản Bất Diệt.',
        combatPower: 'Tạo ra lỗ đen nuốt chửng hạm đội liên sao ngàn vạn tàu mẹ, bẻ cong không thời gian vượt qua hố sâu giun đến góc vũ trụ khác.',
        cultivationMethod: 'Trực tiếp bơi lặn trong quầng nhật hoa của ngôi sao mẹ, hấp thụ phản ứng nhiệt hạch vô tận.',
        breakthroughRitual: {
          requirements: 'Sao siêu tân tinh phát nổ, ý thức phân thân quy mô tinh hệ.',
          danger: 'Bị lỗ đen vĩnh hằng nuốt chửng bản ngã.',
          ritualPlace: 'Tâm vụ nổ Siêu Tân Tinh rực rỡ.'
        },
        fortuitousEncounters: [
          {
            name: 'Trái Tim Vũ Trụ Khởi Nguyên Đốm Sáng',
            description: 'Điểm kỳ dị nguyên thủy còn sót lại sau vụ nổ Big Bang.',
            opportunity: 'Đồng hóa quy luật vật lý của toàn thể vũ trụ, trở thành Đấng Sáng Tạo.',
            danger: 'Tan biến hoàn toàn vào chân không vĩnh hằng.'
          }
        ],
        pillsAndElixirs: [
          { id: 'scifi_5', name: 'Giọt Bản Nguyên Vật Chất Tối Nguyên Thủy', rank: 'Thần Phẩm Vũ Trụ', effects: 'Bất tử trước mọi hình thức phá hủy nhiệt động lực học', ingredients: 'Năng lượng tối tinh khiết, hạt boson Higgs' }
        ],
        weaponsAndArtifacts: [
          { name: 'Lưỡi Kiếm Bẻ Cong Không Thời Gian', rank: 'Chí Bảo Vũ Trụ', effects: 'Cắt đứt dòng thời gian cục bộ, xóa sổ mục tiêu khỏi thực tại' }
        ],
        techniquesAndMartialArts: [
          { name: 'Vũ Trụ Kỳ Dị Sụp Đổ Điểm Hắc Động', rank: 'Tuyệt Tuyệt Chiêu Vũ Trụ', effects: 'Tạo ra lỗ đen mini nghiền nát mọi hạm đội và tinh cầu thù địch' }
        ]
      }
    ]
  }
];

export const DEFAULT_CHARACTER_ROADMAPS = [
  {
    characterId: 'char_lingxiao',
    characterName: 'Lăng Tiêu',
    systemName: 'Cửu Trọng Tiên Đạo Hệ Thống',
    overallArcSummary: 'Từ thiếu gia sa sút bị đoạt linh căn trở thành Đạo Tổ Bất Hủ khai thiên lập địa, nghịch chuyển số mệnh chúng sinh.',
    stages: [
      {
        id: 'stage_1',
        order: 1,
        phaseName: 'Khởi đầu: Thiếu Niên Xuất Thân • Phế Căn Quật Khởi',
        characterRealm: 'Luyện Khí Tầng 1 - 9',
        storyChapterRange: 'Chương 1 - Chương 35',
        milestoneEvent: 'Bị gia tộc trục xuất trong đêm mưa giông, nhặt được Tàn Ngọc Thần Ma rỉ sét trong Kiếm Trủng hoang phế.',
        abilityUnlocked: 'Thức tỉnh Hỗn Độn Bất Diệt Tổ Căn, nhìn thấu sơ hở công pháp qua Vô Cực Kiếm Đồng.',
        psychologicalArc: 'Tự ti u uất chuyển sang kiên nghị sắt đá, cắn răng nhẫn nhục, quyết tâm vấn đỉnh tiên lộ để bảo vệ muội muội.',
        bottleneckOrTribulation: 'Bị đường huynh cùng chấp sự ngoại môn hãm hại, kinh mạch bế tắc suýt chết vì độc hàn băng.'
      },
      {
        id: 'stage_2',
        order: 2,
        phaseName: 'Nhập Tông: Đúc Đạo Cơ Vô Thượng • Danh Chấn Tứ Tọa',
        characterRealm: 'Trúc Cơ Kỳ (Thiên Đạo Trúc Cơ)',
        storyChapterRange: 'Chương 36 - Chương 110',
        milestoneEvent: 'Vượt qua huyết hải bí cảnh, một mình trảm sát ba đại đệ tử Ma Tông, ngưng tụ Cửu Phẩm Thiên Đạo Cơ.',
        abilityUnlocked: 'Kiếm Khí Như Tơ, Hư Không Ngự Kiếm Thuật, đan điền hóa thành Khí Hải Ngũ Sắc.',
        psychologicalArc: 'Tự tin quyết đoán, bắt đầu nuôi chí lớn, phân định rõ ràng ân oán thị phi trong chốn tu tiên cá lớn nuốt cá bé.',
        bottleneckOrTribulation: 'Bị tông môn cự đầu chèn ép bắt giao nộp cơ duyên bí cảnh, đạo tâm lung lay trước cám dỗ danh vọng.'
      },
      {
        id: 'stage_3',
        order: 3,
        phaseName: 'Trưởng Thành: Cửu Chuyển Hoàng Kim Đan • Kiếm Trảm Cự Ma',
        characterRealm: 'Kim Đan Kỳ (Cửu Chuyển Cực Phẩm)',
        storyChapterRange: 'Chương 111 - Chương 280',
        milestoneEvent: 'Tông môn bị đại quân U Minh Ma Tông vây hãm, đột phá Kim Đan giữa lôi kiếp, một kiếm chém đôi cự hạm ma đầu.',
        abilityUnlocked: 'Đại Viên Mãn Kiếm Ý Lĩnh Vực, Tam Muội Kim Đan Chân Hỏa, triệu hồi vạn kiếm triều bái.',
        psychologicalArc: 'Uy nghi lãnh đạm của bậc tông sư, từ người được bảo bọc trở thành cây đại thụ che chở cho toàn thể tông môn.',
        bottleneckOrTribulation: 'Tam Cửu Thiên Kiếp hủy diệt, tâm ma hiện về hình ảnh cha mẹ bị sát hại đẫm máu lúc hàn vi.'
      },
      {
        id: 'stage_4',
        order: 4,
        phaseName: 'Tông Sư: Phá Đan Sinh Anh • Xưng Hùng Cửu Châu',
        characterRealm: 'Nguyên Anh Kỳ (Đạo Quân Tông Sư)',
        storyChapterRange: 'Chương 281 - Chương 520',
        milestoneEvent: 'Tiến nhập Cửu Châu Trung Vực, thành lập Lăng Tiêu Kiếm Các, đối đầu với các Thánh Địa viễn cổ.',
        abilityUnlocked: 'Tâm Kiếm cảnh giới (Cỏ cây cát đá đều là kiếm), Hư Không Na Di Thuật, Nguyên Anh đoạt thiên địa tạo hóa.',
        psychologicalArc: 'Nhìn thấu sự hư vô của quyền lực trần thế, ngộ ra quy luật nhân quả túc mệnh, gánh vác đại cục thiên hạ.',
        bottleneckOrTribulation: 'Lục Cửu Phong Hỏa Kiếp, bị ba vị Nguyên Anh hậu kỳ vây sát trong bão cát tử địa.'
      },
      {
        id: 'stage_5',
        order: 5,
        phaseName: 'Chí Tôn: Hóa Thần Nhập Thế • Cải Tạo Sơn Hà',
        characterRealm: 'Hóa Thần Kỳ ➜ Luyện Hư & Hợp Thể',
        storyChapterRange: 'Chương 521 - Chương 950',
        milestoneEvent: 'Hóa phàm trăm năm làm người thợ rèn bình dị ở nhân gian, ngộ ra Sinh Tử Quy Tắc và Luân Hồi Ý Cảnh.',
        abilityUnlocked: 'Thần Thông Lĩnh Vực Vô Địch, Tụ Lý Càn Khôn, một ý niệm đóng băng thời gian trăm dặm.',
        psychologicalArc: 'Đạo tâm đại từ đại bi, thấu tỏ sinh tử phàm trần, siêu thoát khỏi tư thù cá nhân hướng đến thương sinh vạn vật.',
        bottleneckOrTribulation: 'Hư Không Loạn Lưu xé rách pháp thể, nguy cơ đồng hóa với thiên địa đạo tắc mất đi ý thức.'
      },
      {
        id: 'stage_6',
        order: 6,
        phaseName: 'Đỉnh Phong: Bất Hủ Khai Thiên • Sáng Thế Đạo Tổ',
        characterRealm: 'Đại Thừa Độ Kiếp ➜ Phi Thăng Chân Tiên ➜ Sáng Thế Thần',
        storyChapterRange: 'Chương 951 - Đại Kết Cục',
        milestoneEvent: 'Độ qua Tử Tiêu Diệt Thế Kiếp, bước qua Tiên Giới Chi Môn, dùng Hỗn Độn Kiếm khai thiên lập địa lập ra vũ trụ mới.',
        abilityUnlocked: 'Ngôn Xuất Pháp Tùy, Nghịch Chuyển Nhân Quả Thời Gian, Hỗn Độn Bất Tử Thần Thể.',
        psychologicalArc: 'Vô thượng tự tại, quay đầu mỉm cười nhìn lại con đường vạn dặm từ cậu bé tạp dịch năm nào, buông bỏ chấp niệm trở về bình dị.',
        bottleneckOrTribulation: 'Vô Hạn Hư Vô Tịch Diệt Kiếp và sự cô độc tuyệt đối của Đấng Sáng Tạo đứng trên đỉnh cao vạn cổ.'
      }
    ]
  }
];
