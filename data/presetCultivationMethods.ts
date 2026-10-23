import { SupremeCultivationMethodItem } from '../types';

export const PRESET_CULTIVATION_METHODS: SupremeCultivationMethodItem[] = [
  // 1. Cửu Chuyển Huyền Công (Bất Diệt Thể Đạo - Luyện Thể Ngoại Công)
  {
    id: 'method_cuu_chuyen_huyen_cong',
    name: 'Cửu Chuyển Huyền Công (Bất Diệt Thể Đạo)',
    path: 'Luyện Thể Ngoại Công',
    gradeLevel: 'Hồng Hoang Bất Hủ',
    originAndHeritage: 'Kế thừa trực tiếp từ giọt Tinh Huyết Khai Thiên của Bàn Cổ Chân Thần, lưu truyền tại Vu Tộc Thượng Cổ qua chín vạn kiếp.',
    corePhilosophy: 'Lấy thân thể làm lò luyện, lấy thiên địa vạn vật làm than củi, chín lần lột xác biến nhục thân phàm tục thành vĩnh hằng bất diệt, lấy lực chứng đạo.',
    bodyTransformationMechanism: 'Hấp thu sát khí, lôi kiếp và địa hỏa để bẻ gãy rồi tái tạo lại từng sợi gân, thớ thịt, tủy xương và màng tế bào thành Thần Ma Chiến Thể.',
    energyCircuitRoute: 'Khí huyết không chảy trong kinh mạch thông thường mà thấm nhuần trực tiếp vào màng tế bào, tủy não và 365 khiếu huyệt chu thiên.',
    innateSecretAbilities: [
      {
        name: 'Đồng Bì Kim Cốt Quyết',
        tierRequired: 'Chuyển Thứ Nhất (Luyện Khí / Thối Thể)',
        description: 'Đao kiếm phàm tục chém vào chỉ tóe tia lửa, miễn nhiễm ngoại lực chấn động sơ cấp.'
      },
      {
        name: 'Bất Hoại Pháp Thân',
        tierRequired: 'Chuyển Thứ Ba (Kim Đan Kỳ)',
        description: 'Miễn dịch 50% sát thương ngũ hành linh thuật, nhục thân cứng hơn Huyền Thiết Thần Sa.'
      },
      {
        name: 'Pháp Thiên Tượng Địa',
        tierRequired: 'Chuyển Thứ Tư (Nguyên Anh Kỳ)',
        description: 'Thân thể hóa to ngàn trượng, sức mạnh tăng vọt trăm lần, một cước đạp nát núi non sông hồ.'
      },
      {
        name: 'Tích Huyết Trọng Sinh',
        tierRequired: 'Chuyển Thứ Bảy (Đại Thừa Kỳ)',
        description: 'Chỉ cần còn lại một giọt máu đầu tim là có thể tái tạo lại hoàn toàn nhục thân nguyên vẹn trong chớp mắt.'
      },
      {
        name: 'Bất Diệt Khai Thiên Thể',
        tierRequired: 'Chuyển Thứ Chín (Hỗn Độn Chân Thần)',
        description: 'Thân xác sánh ngang Hỗn Độn Chí Bảo, tay không xé rách thời không, một quyền phá vỡ càn khôn vạn giới.'
      }
    ],
    requiredCatalysts: [
      'Vạn Niên Canh Kim Thần Sa',
      'Long Tủy Thái Cổ Chân Long',
      'Cửu U Minh Hỏa & Thái Dương Chân Hỏa',
      'Lôi Trì Chi Thủy (Thiên Kiếp Chi Lôi)'
    ],
    tiers: [
      {
        tierNumber: 1,
        tierName: 'Đệ Nhất Chuyển: Đồng Bì Thiết Cốt',
        subStages: ['Sơ Cương', 'Thiết Cốt', 'Đồng Bì Viên Mãn'],
        realmEssence: 'Da thịt dẻo dai như đồng nguội, gân cốt cứng như thép bách luyện.',
        physicalManifestation: 'Da ánh lên màu đồng cổ bóng loáng, đao kiếm phàm tục chém vào chỉ vang lên tiếng keng keng tóe lửa.',
        spiritualVeinOperation: 'Khí huyết cuồn cuộn như tiếng sông chảy xiết trong lồng ngực, tiếng tim đập trầm hùng như trống trận.',
        breakthroughPhenomenon: 'Toàn thân bốc khói đỏ rực, bài trừ hắc sắc độc tố qua lỗ chân lông, tạo nên tiếng nổ rền giòn giã.',
        mortalLifespan: '200 tuổi',
        combatAura: 'Khí tức trầm hùng tựa gấu dữ hung bạo rình mồi.',
        tabooAndDemonDanger: 'Dễ bị khô kiệt tủy sống nếu thiếu linh dược bổ khí huyết trong quá trình tôi luyện.'
      },
      {
        tierNumber: 2,
        tierName: 'Đệ Nhị Chuyển: Ngân Tủy Ngọc Cốt',
        subStages: ['Ngọc Cốt Hóa Sinh', 'Ngân Tủy Lưu Kim', 'Luyện Huyết Như Hồng'],
        realmEssence: 'Tủy xương chuyển sang màu bạc sáng, xương khớp trong suốt không tì vết như bạch ngọc hàn băng.',
        physicalManifestation: 'Trọng lượng cơ thể nặng gấp mười lần người thường dù dáng vóc vẫn thanh mảnh phiêu dật.',
        spiritualVeinOperation: 'Mỗi cú đấm phát ra tiếng nổ sấm rền trong không khí xé toạc chân không.',
        breakthroughPhenomenon: 'Tiếng xương kêu lách cách như ngọc vỡ rồi lành lại trong tích tắc, hào quang trắng bạc bao phủ toàn thân.',
        mortalLifespan: '500 tuổi',
        combatAura: 'Áp lực khí áp khiến đối thủ cùng cấp khó thở, linh khí xung quanh tự động né tránh.',
        tabooAndDemonDanger: 'Đau đớn như bị vạn con kiến cắn tủy não, dễ phát điên nếu ý chí đạo tâm không vững vàng.'
      },
      {
        tierNumber: 3,
        tierName: 'Đệ Tam Chuyển: Kim Cương Bất Hoại',
        subStages: ['Kim Thân Tố Hình', 'Ngũ Tạng Lưu Ly', 'Lục Phủ Thần Tàng'],
        realmEssence: 'Ngũ tạng lục phủ ngưng kết thành lưu ly kim quang, máu chuyển sang sắc vàng kim óng ánh.',
        physicalManifestation: 'Toàn thân bộc phát kim quang rực rỡ, linh khí chấn động khiến bụi trần không thể bám vào da thịt.',
        spiritualVeinOperation: 'Khí huyết như sóng thần gầm thét, tự động hình thành kim cương cương khí hộ thể ngoài ba thước.',
        breakthroughPhenomenon: 'Hư không ngưng tụ dị tượng Kim Thân La Hán và Thần Ma cự thú gầm vang chín tầng trời.',
        mortalLifespan: '1,200 tuổi',
        combatAura: 'Kim quang chói mắt như vầng thái dương hạ phàm, chấn nhiếp ma tà yêu quỷ.',
        tabooAndDemonDanger: 'Cực Dương Quá Thịnh dễ sinh Tâm Hỏa phần thân, cần âm hàn linh dịch trung hòa cân bằng.'
      },
      {
        tierNumber: 4,
        tierName: 'Đệ Tứ Chuyển: Pháp Thiên Tượng Địa',
        subStages: ['Hóa Thần Chi Thể', 'Cự Nhân Chiến Hồn', 'Ngàn Trượng Pháp Thân'],
        realmEssence: 'Nhục thân dung hợp với hư không càn khôn, có thể tùy ý biến hóa kích thước từ hạt bụi đến ngọn núi khổng lồ.',
        physicalManifestation: 'Thân cao ngàn trượng, chân đạp cửu tuyền, đầu đội ngân hà, tay nắm lôi đình tinh tú.',
        spiritualVeinOperation: 'Hơi thở hóa thành cuồng phong bão táp, ánh mắt phóng ra thần lôi chém đứt sơn mạch.',
        breakthroughPhenomenon: 'Mây đen sấm sét cuồn cuộn vạn dặm, mặt đất nứt toác giải phóng địa hỏa dung nham chào đón Thần Ma xuất thế.',
        mortalLifespan: '3,000 tuổi',
        combatAura: 'Uy áp tuyệt đối khiến vạn linh quỳ rạp, không gian xung quanh vặn vẹo rạn nứt.',
        tabooAndDemonDanger: 'Thiên Đạo ghen ghét hạ Cửu U Hắc Lôi Kiếp, nếu không chịu nổi sẽ biến thành tro bụi hư vô.'
      },
      {
        tierNumber: 5,
        tierName: 'Đệ Ngũ Chuyển: Thái Sơ Thần Ma Thể',
        subStages: ['Quy Khư Tinh Thể', 'Hỗn Độn Huyết Mạch', 'Vạn Kiếp Bất Diệt'],
        realmEssence: 'Nhục thân siêu thoát khỏi quy tắc ngũ hành, nắm giữ thần lực nghiền nát tinh cầu.',
        physicalManifestation: 'Da thịt khắc sâu Hỗn Độn Thần Văn cổ xưa, mỗi một lỗ chân lông đều nuốt nhả tinh hoa tinh tú.',
        spiritualVeinOperation: 'Tự thân trở thành một tiểu vũ trụ độc lập, sinh sôi nảy nở linh lực vô tận không bao giờ cạn kiệt.',
        breakthroughPhenomenon: 'Hỗn Độn khí tức tràn ngập, ngưng tụ hư ảnh Thái Cổ Cự Thần một búa khai thiên tích địa.',
        mortalLifespan: '10,000 tuổi (Sánh ngang trường sinh)',
        combatAura: 'Khí thế Hồng Hoang mênh mông như biển cả vô tận, áp chế toàn bộ pháp bảo dưới cấp Tiên Khí.',
        tabooAndDemonDanger: 'Hỗn Độn Ma Niệm xâm lấn thần thức, nếu đánh mất nhân tính sẽ hóa thành Thao Thiết hung thú thị sát.'
      }
    ],
    authorWritingTips: [
      'Miêu tả chi tiết quá trình chịu đựng đau đớn khi tôi luyện thể xác để tôn vinh ý chí sắt đá phi thường của nhân vật chính.',
      'Tạo điểm nhấn bằng những pha tay không đỡ lấy bảo kiếm hoặc thần binh của kẻ địch khiến đối thủ kinh hoàng trợn tròn mắt.',
      'Nhấn mạnh lượng tiêu hao tài nguyên khổng lồ (ăn thịt yêu thú ngàn năm, tắm trong lôi trì) để tạo động lực săn tìm cơ duyên.'
    ]
  },

  // 2. Thái Sơ Hỗn Độn Quyết (Vạn Đạo Quy Nhất - Hỗn Độn Nguyên Sơ)
  {
    id: 'method_thai_so_hon_don',
    name: 'Thái Sơ Hỗn Độn Quyết (Vạn Đạo Quy Nhất)',
    path: 'Hỗn Độn Nguyên Sơ',
    gradeLevel: 'Hỗn Độn Khai Thiên',
    originAndHeritage: 'Bí điển khai thiên được khắc trên một mảnh Tàn Ngọc Thần Bí trôi dạt từ vùng đất Hư Vô trước khi vũ trụ hình thành.',
    corePhilosophy: 'Đạo sinh nhất, nhất sinh nhị, nhị sinh tam, tam sinh vạn vật. Ngược dòng tu luyện vạn đạo quy nhất, đồng hóa mọi loại linh khí thành Hỗn Độn Chi Khí.',
    bodyTransformationMechanism: 'Dung hợp toàn bộ linh căn (Kim Mộc Thủy Hỏa Thổ Lôi Phong Băng) thành một luồng Hỗn Độn Chân Hỏa tôi luyện đan điền.',
    energyCircuitRoute: 'Chu thiên luân chuyển hình xoắn ốc ngược chiều kim đồng hồ, đan điền hóa thành một Hắc Động Vô Hạn nuốt chửng năng lượng.',
    innateSecretAbilities: [
      {
        name: 'Hỗn Độn Thôn Phệ Quyết',
        tierRequired: 'Tầng 1 (Luyện Khí)',
        description: 'Nuốt chửng linh khí của mọi thuộc tính mà không sợ xung khắc, tốc độ hấp thu gấp 10 lần thường nhân.'
      },
      {
        name: 'Hỗn Độn Đồng Hóa Giới',
        tierRequired: 'Tầng 3 (Kim Đan)',
        description: 'Tạo màn chắn đồng hóa đòn tấn công của đối phương thành linh lực bản thân bổ sung cho đan điền.'
      },
      {
        name: 'Vạn Pháp Quy Hư Kiếm',
        tierRequired: 'Tầng 4 (Nguyên Anh)',
        description: 'Chém ra một đạo Hỗn Độn Kiếm Mang phá vỡ mọi cấm chế trận pháp và phòng ngự ngũ hành.'
      },
      {
        name: 'Khai Thiên Tích Địa Thần Quang',
        tierRequired: 'Tầng 5 (Hóa Thần)',
        description: 'Phóng ra một đạo xám trắng thần quang diễn hóa nhật nguyệt sơn hà, giam cầm và tiêu diệt nguyên thần địch thủ.'
      }
    ],
    requiredCatalysts: [
      'Hỗn Độn Tàn Ngọc / Hỗn Độn Thần Thạch',
      'Ngũ Hành Bản Nguyên Tinh Phách',
      'Thái Cổ Hồng Mông Khí',
      'Âm Dương Nhị Khí Bình'
    ],
    tiers: [
      {
        tierNumber: 1,
        tierName: 'Tầng Thứ Nhất: Hỗn Độn Khí Căn',
        subStages: ['Dung Khí', 'Hóa Hư', 'Quy Nhất Đan Điền'],
        realmEssence: 'Chuyển hóa toàn bộ linh lực phàm tục thành một tia Hỗn Độn Chân Khí màu xám bạc.',
        physicalManifestation: 'Khí tức mơ hồ mông lung như làn sương mờ, người ngoài dùng thần thức thăm dò chỉ thấy một vùng đen tối hư vô.',
        spiritualVeinOperation: 'Kinh mạch giãn nở gấp ba lần bình thường để chịu đựng dòng chảy năng lượng cuồng bạo.',
        breakthroughPhenomenon: 'Linh khí đất trời trong bán kính mười dặm điên cuồng xoáy tròn tạo thành phễu lốc xoáy rót vào đan điền.',
        mortalLifespan: '250 tuổi',
        combatAura: 'Khí tức kỳ bí khó lường, không có bất kỳ thuộc tính ngũ hành cố định nào.',
        tabooAndDemonDanger: 'Nếu các thuộc tính linh căn không cân bằng, đan điền dễ bị nổ tung do xung đột nguyên tố.'
      },
      {
        tierNumber: 2,
        tierName: 'Tầng Thứ Hai: Ngũ Hành Hóa Hỗn Độn',
        subStages: ['Ngũ Khí Triều Nguyên', 'Âm Dương Bác Tạp', 'Hỗn Nguyên Đạo Thai'],
        realmEssence: 'Ngũ hành tương sinh tương khắc bị ép buộc hợp nhất, sinh ra Hỗn Độn Đạo Cơ.',
        physicalManifestation: 'Đôi mắt biến đổi: mắt trái hóa thành mặt trời rực lửa, mắt phải hóa thành mặt trăng băng giá, mi tâm hiện phù văn Thái Cực xám.',
        spiritualVeinOperation: 'Linh lực luân chuyển liên tục không cần chủ động vận công, tự động thổ nạp tinh hoa nhật nguyệt suốt ngày đêm.',
        breakthroughPhenomenon: 'Hoa sen ngũ sắc nở rộ dưới chân rồi tan biến thành một đám mây xám nguyên thủy.',
        mortalLifespan: '600 tuổi',
        combatAura: 'Áp lực mông lung vô hình khiến các đạo pháp thông thường của đối thủ bị giảm 30% uy lực.',
        tabooAndDemonDanger: 'Gặp Ngũ Hành Thiên Kiếp oanh tạc cùng lúc, đòi hỏi bản lĩnh điều phối linh lực siêu việt.'
      },
      {
        tierNumber: 3,
        tierName: 'Tầng Thứ Ba: Hỗn Độn Kim Đan',
        subStages: ['Hắc Động Đan Phôi', 'Hỗn Độn Cửu Chuyển', 'Vạn Đạo Thần Văn'],
        realmEssence: 'Kim Đan không mang sắc vàng kim thông thường mà đen nhánh như hắc động sâu thẳm, bề mặt lấp lánh cửu sắc thần văn.',
        physicalManifestation: 'Mỗi cử chỉ đều mang theo lực hút vô hình, bụi cây lá rụng xung quanh tự động bay quanh cơ thể theo quỹ đạo.',
        spiritualVeinOperation: 'Dung tích đan điền gấp mười lần Kim Đan đồng cấp, thi triển pháp thuật uy lực vô biên mà không sợ cạn kiệt.',
        breakthroughPhenomenon: 'Bầu trời xuất hiện dị tượng Tinh Không Tàn Phá và Hỗn Độn Thần Thụ đâm chồi nảy lộc.',
        mortalLifespan: '1,500 tuổi',
        combatAura: 'Thâm trầm tựa vũ trụ đêm đen, khiến đối thủ cảm giác bản thân nhỏ bé như hạt cát.',
        tabooAndDemonDanger: 'Lực hút Hắc Động mất kiểm soát có thể nuốt chửng luôn cả kinh mạch và linh hồn của bản thân.'
      },
      {
        tierNumber: 4,
        tierName: 'Tầng Thứ Tư: Hỗn Độn Nguyên Anh (Khai Thiên Anh Hài)',
        subStages: ['Phá Toái Hư Không', 'Thái Sơ Đạo Thể', 'Chân Linh Thần Tướng'],
        realmEssence: 'Nguyên Anh ôm một viên Hỗn Độn Châu trong lòng ngực, ngồi xếp bằng trên tòa sen Hỗn Độn chín cánh.',
        physicalManifestation: 'Nguyên Thần xuất khiếu có thể ngao du tinh không, miễn nhiễm hoàn toàn với các loại huyễn thuật và độc sát.',
        spiritualVeinOperation: 'Có thể mượn lực của Hư Không để di chuyển tức thời (Thuấn Di) cách xa ngàn dặm trong nháy mắt.',
        breakthroughPhenomenon: 'Chín đạo Hỗn Độn Thần Lôi xé rách hư không giáng xuống nhưng bị Nguyên Anh nuốt trọn vào bụng.',
        mortalLifespan: '4,000 tuổi',
        combatAura: 'Khí thế cao thượng như thần linh sáng tạo thế giới hạ phàm nhìn ngắm chúng sinh phàm trần.',
        tabooAndDemonDanger: 'Tâm Ma Hư Vô dụ dỗ nhân vật chính hóa đạo tan biến vào cõi hư vô tịch mịch.'
      }
    ],
    authorWritingTips: [
      'Tập trung miêu tả sự kinh ngạc tột độ của đối thủ khi tuyệt kỹ sát chiêu mạnh nhất của chúng bị đan điền Hỗn Độn nuốt chửng nhẹ nhàng.',
      'Sử dụng các hình tượng vũ trụ, tinh tú, hắc động và thái sơ để tăng tính hoành tráng, kỳ vĩ cho những phân cảnh thi triển chiêu thức.'
    ]
  },

  // 3. Đại Lực Thần Ma Luyện Thể Kinh (Thần Ma Song Tu)
  {
    id: 'method_dai_luc_than_ma',
    name: 'Đại Lực Thần Ma Luyện Thể Kinh (Thần Ma Trấn Giới)',
    path: 'Thần Ma Song Tu',
    gradeLevel: 'Đạo Thống Đế Kinh',
    originAndHeritage: 'Khai sáng bởi Viễn Cổ Thần Ma Ma Thần Xi Vưu kết hợp với bí pháp luyện hồn của Cổ Vu Tộc, khắc trên mười hai cây Đô Thiên Thần Ma Kỳ.',
    corePhilosophy: 'Trong cơ thể con người ẩn chứa 84.000 hạt vi mô Thần Ma ngủ say. Đánh thức từng hạt vi mô để nắm giữ sức mạnh nhổ núi dời sông, chém thần diệt ma.',
    bodyTransformationMechanism: 'Dùng sát khí chiến trường và máu tươi dị thú tôi luyện huyết mạch, ngưng tụ Thần Ma Văn trên lưng và ngực.',
    energyCircuitRoute: 'Khí huyết chạy song song với Ma Khí u uất, hợp nhất tại Thần Đình Huyệt và Mệnh Môn Huyệt.',
    innateSecretAbilities: [
      {
        name: 'Thần Ma Chi Lực',
        tierRequired: 'Tầng 1 (Luyện Thể)',
        description: 'Tăng vọt sức mạnh vật lý lên gấp mười lần, một cú đấm đánh vỡ tảng đá ngàn cân.'
      },
      {
        name: 'Tam Đầu Lục Tí',
        tierRequired: 'Tầng 3 (Kim Đan)',
        description: 'Hóa sinh ba đầu sáu tay, mỗi tay cầm một món thần binh sát phạt tứ phương không góc chết.'
      },
      {
        name: 'Đô Thiên Ma Ảnh Hộ Thân',
        tierRequired: 'Tầng 4 (Nguyên Anh)',
        description: 'Triệu hoán hư ảnh Viễn Cổ Thần Ma cao trăm trượng che chở, kháng lại toàn bộ đòn công kích linh hồn.'
      }
    ],
    requiredCatalysts: ['Ma Huyết Thượng Cổ', 'Vạn Tướng Sát Khí', 'Thiên Lôi Tôi Thể Đan', 'Huyết Tinh Quả'],
    tiers: [
      {
        tierNumber: 1,
        tierName: 'Tầng Thứ Nhất: Đánh Thức 100 Hạt Vi Mô',
        subStages: ['Khai Khí Huyết', 'Bác Man Lực', 'Thần Lực Sơ Khai'],
        realmEssence: 'Đánh thức 100 hạt tế bào Thần Ma, sức mạnh đạt đến cảnh giới Một Long Một Tượng.',
        physicalManifestation: 'Bắp thịt cuồn cuộn như sắt nguội, mỗi bước đi làm mặt đất rung chuyển lún sâu.',
        spiritualVeinOperation: 'Khí huyết đỏ rực bốc lên trên đỉnh đầu tạo thành một cột khói Lang Yên cao mười trượng.',
        breakthroughPhenomenon: 'Tiếng gầm Thần Ma vang vọng trong huyết quản, chấn vỡ đá sỏi xung quanh mười thước.',
        mortalLifespan: '220 tuổi',
        combatAura: 'Sát khí cuồng bạo bức người như ác thú thời tiền sử.',
        tabooAndDemonDanger: 'Dễ bị sát khí thao túng tâm trí rơi vào trạng thái cuồng sát mất kiểm soát.'
      },
      {
        tierNumber: 2,
        tierName: 'Tầng Thứ Hai: Đánh Thức 1.000 Hạt Vi Mô (Cự Lực Thần Binh)',
        subStages: ['Ngưng Huyết Hóa Đao', 'Ma Lực Quán Thể', 'Kim Cang Ma Nhục'],
        realmEssence: 'Sức mạnh đạt đến Mười Rồng Mười Voi, tay không bẻ gãy linh khí thượng phẩm.',
        physicalManifestation: 'Trên lưng xuất hiện hình xăm Thần Ma mở mắt đỏ rực như máu, da dẻ chuyển sang màu đồng đen rắn rỏi.',
        spiritualVeinOperation: 'Khí huyết và ma khí dung hợp tạo thành Huyết Sát Cương Khí bảo vệ toàn thân.',
        breakthroughPhenomenon: 'Dị tượng ngàn con voi thần và trăm con giao long gầm thét trong hư không.',
        mortalLifespan: '550 tuổi',
        combatAura: 'Khí thế hung hãn áp đảo, chỉ một cái trừng mắt cũng khiến kẻ địch khiếp đảm lùi bước.',
        tabooAndDemonDanger: 'Đau đớn như bị bẻ gãy toàn bộ xương khớp trong cơ thể rồi ghép lại từng mảnh.'
      },
      {
        tierNumber: 3,
        tierName: 'Tầng Thứ Ba: Tam Đầu Lục Tí Thần Ma Thân',
        subStages: ['Ma Đồng Thức Tỉnh', 'Đa Tí Hóa Hình', 'Chiến Thần Đỉnh Phong'],
        realmEssence: 'Huyễn hóa bản tôn thành hình thái Chiến Thần Thượng Cổ với ba đầu sáu tay uy phong lẫm liệt.',
        physicalManifestation: 'Thân hình cao ba trượng, ba khuôn mặt biểu lộ Hỷ - Nộ - Sát, sáu cánh tay vung thần binh như cối xay thịt.',
        spiritualVeinOperation: 'Kinh mạch phân nhánh sáu luồng cực đại, cung cấp linh lực dồi dào cho sáu cánh tay cùng lúc.',
        breakthroughPhenomenon: 'Trời đất biến sắc, mây máu bao phủ cả một vùng chân trời, tiếng kèn xung trận viễn cổ rền vang.',
        mortalLifespan: '1,400 tuổi',
        combatAura: 'Sát khí ngút trời làm đóng băng mặt hồ, cây cỏ xung quanh khô héo ngay lập tức.',
        tabooAndDemonDanger: 'Tâm Ma kích động lòng thèm khát máu tươi, cần đan dược thanh tâm định thần hỗ trợ.'
      }
    ],
    authorWritingTips: [
      'Khai thác những trận đánh cận chiến tay đôi đẫm máu nghẹt thở, lấy thịt đè người, bẻ gãy vũ khí đối thủ bằng tay không.',
      'Tập trung khắc họa ý chí chiến đấu quật cường: càng bị thương thì sức mạnh bộc phát càng khủng khiếp.'
    ]
  },

  // 4. Tru Tiên Kiếm Quyết (Kiếm Tu Thuần Đạo)
  {
    id: 'method_tru_tien_kiem_quyet',
    name: 'Tru Tiên Tứ Kiếm Thông Thiên Kiếm Quyết',
    path: 'Kiếm Tu Thuần Đạo',
    gradeLevel: 'Hồng Hoang Bất Hủ',
    originAndHeritage: 'Bí truyền sát phạt số một Hồng Hoang do Thông Thiên Giáo Chủ lưu lại, ẩn chứa kiếm ý của Tru Tiên, Lục Tiên, Hãm Tiên, Tuyệt Tiên.',
    corePhilosophy: 'Một kiếm phá vạn pháp! Không cần phòng ngự, không cần linh dược, chỉ lấy một tấm kiếm tâm sắc bén chém rách nhật nguyệt càn khôn.',
    bodyTransformationMechanism: 'Biến toàn bộ kinh mạch và đan điền thành Lò Đúc Kiếm, nuôi dưỡng một thanh Kiếm Thai bản mệnh bằng sát khí và thần niệm.',
    energyCircuitRoute: 'Kiếm khí chạy thẳng qua Đốc Mạch xông thẳng lên Thiên Môn, xuất kiếm qua đầu ngón tay hoặc ánh mắt.',
    innateSecretAbilities: [
      {
        name: 'Vạn Kiếm Quy Tông',
        tierRequired: 'Tầng 2 (Trúc Cơ)',
        description: 'Triệu hoán vạn thanh phi kiếm của đối thủ quy phục, hóa thành biển kiếm vây sát kẻ thù.'
      },
      {
        name: 'Tru Tiên Kiếm Khí',
        tierRequired: 'Tầng 3 (Kim Đan)',
        description: 'Kiếm khí đỏ rực ngàn trượng chém vỡ hư không, chuyên khắc chế và đồ sát tiên ma.'
      },
      {
        name: 'Kiếm Vực Tru Ma',
        tierRequired: 'Tầng 4 (Nguyên Anh)',
        description: 'Mở ra một vùng kiếm vực tuyệt đối, trong phạm vi trăm dặm vạn vật đều hóa thành kiếm khí sát phạt.'
      }
    ],
    requiredCatalysts: ['Canh Kim Chi Tinh', 'Vạn Kiếm Chi Huyết', 'Kiếm Trủng Tàn Hồn', 'Cửu Thiên Vẫn Thiết'],
    tiers: [
      {
        tierNumber: 1,
        tierName: 'Tầng Thứ Nhất: Kiếm Khí Ngưng Mang',
        subStages: ['Luyện Kiếm Thai', 'Kiếm Ý Nhập Thể', 'Xuất Kiếm Đoạn Lưu'],
        realmEssence: 'Khí tức ngưng tụ thành kiếm mang vô hình, mỗi sợi tóc đều có thể chém đứt ngọn cỏ.',
        physicalManifestation: 'Ánh mắt sắc lẹm như kiếm phong, người thường nhìn thẳng vào sẽ cảm thấy đau nhói như bị kim châm.',
        spiritualVeinOperation: 'Linh lực chuyển hóa hoàn toàn thành Canh Kim Kiếm Khí sắc nhọn rít gào trong huyết mạch.',
        breakthroughPhenomenon: 'Hàng ngàn cành cây ngọn cỏ xung quanh tự động hướng ngọn về phía nhân vật chính như đang bái kiến Kiếm Chủ.',
        mortalLifespan: '200 tuổi',
        combatAura: 'Lạnh lẽo sắc bén đến rợn người, kiếm minh ong ong trong bán kính trăm trượng.',
        tabooAndDemonDanger: 'Kiếm khí quá sắc nhọn dễ tự làm rách kinh mạch nếu kiếm tâm không thuần khiết.'
      },
      {
        tierNumber: 2,
        tierName: 'Tầng Thứ Hai: Bản Mệnh Kiếm Thai',
        subStages: ['Đúc Kiếm Hồn', 'Kiếm Thể Hợp Nhất', 'Vạn Kiếm Triều Bái'],
        realmEssence: 'Đan điền kết tụ một thanh Tiên Kiếm bản mệnh trong suốt, người và kiếm hòa làm một thể.',
        physicalManifestation: 'Toàn thân phát ra tiếng kiếm minh du dương, bước đi nhẹ tênh như lướt trên mũi kiếm.',
        spiritualVeinOperation: 'Kiếm thai tự động nuốt nhả tinh hoa kim thạch, không cần ăn uống ngũ cốc phàm trần.',
        breakthroughPhenomenon: 'Bầu trời rực sáng một đạo kiếm quang chọc thủng tầng mây, chấn động kiếm khí ngàn dặm.',
        mortalLifespan: '500 tuổi',
        combatAura: 'Khí thế hiên ngang bất khuất, thà gãy chứ không chịu uốn cong trước bất kỳ uy áp nào.',
        tabooAndDemonDanger: 'Kiếm Tâm Chấn Động nếu gặp thất bại lớn trong tỷ võ, có nguy cơ gãy kiếm phế bỏ tu vi.'
      },
      {
        tierNumber: 3,
        tierName: 'Tầng Thứ Ba: Tru Tiên Kiếm Ý',
        subStages: ['Lục Ma Kiếm Ý', 'Tuyệt Tiên Sát Trận', 'Nhất Kiếm Quy Chân'],
        realmEssence: 'Lĩnh ngộ sát phạt đệ nhất kiếm ý, một kiếm xuất ra mang theo tử khí tuyệt diệt sinh linh.',
        physicalManifestation: 'Sau lưng hiện ra hư ảnh bốn thanh cự kiếm cắm thẳng vào đất trời, kiếm mang đỏ rực nhuộm kín vòm trời.',
        spiritualVeinOperation: 'Kiếm ý kết hợp với thần niệm, ý niệm đến đâu kiếm quang chém đứt không gian đến đó.',
        breakthroughPhenomenon: 'Không gian xung quanh rạn nứt thành vô số vết cắt màu đen sâu thẳm.',
        mortalLifespan: '1,300 tuổi',
        combatAura: 'Sát khí thuần túy không chứa tạp niệm, làm tê liệt thần hồn của đối thủ cùng cấp.',
        tabooAndDemonDanger: 'Dễ bị sát khí Tru Tiên phản phệ biến thành cỗ máy chỉ biết chém giết không cảm xúc.'
      }
    ],
    authorWritingTips: [
      'Miêu tả những pha xuất kiếm chớp nhoáng: kẻ địch chưa kịp nhìn thấy kiếm rút ra thì đầu đã rơi xuống đất.',
      'Khắc họa khí chất cô độc, thanh cao, ngạo nghễ của người kiếm tu: chỉ có thanh kiếm là tri kỷ duy nhất trên đời.'
    ]
  },

  // 5. Cửu U Minh Vương Trấn Ngục Điển (Tà Ma Ma Tu)
  {
    id: 'method_cuu_u_minh_vuong',
    name: 'Cửu U Minh Vương Trấn Ngục Điển',
    path: 'Tà Ma Ma Tu',
    gradeLevel: 'Thiên Giai Tuyệt Thế',
    originAndHeritage: 'Kế thừa từ U Minh Giáo Chủ dưới mười tám tầng địa ngục, chuyên luyện hóa oan hồn, quỷ khí và thi khí.',
    corePhilosophy: 'Trời bất công thì ta nghịch trời! Lấy vạn linh làm phân bón, lấy cõi chết làm suối nguồn sinh lực bất tử.',
    bodyTransformationMechanism: 'Ngưng tụ Cửu U Quỷ Khí biến thân thể thành U Minh Ma Thể, không sợ độc tố, không đau đớn, tự lành vết thương cực nhanh.',
    energyCircuitRoute: 'Khí chạy ngược từ Dũng Tuyền Huyệt dưới lòng bàn chân hút âm khí từ lòng đất lên đỉnh đầu.',
    innateSecretAbilities: [
      {
        name: 'Vạn Quỷ Phệ Hồn Phiên',
        tierRequired: 'Tầng 2 (Trúc Cơ)',
        description: 'Triệu hoán vạn quỷ lệ hồn cắn xé nguyên thần đối phương, gây ra ảo giác đau đớn cùng cực.'
      },
      {
        name: 'Minh Vương Hóa Thân',
        tierRequired: 'Tầng 4 (Nguyên Anh)',
        description: 'Hóa thành U Minh Ma Thần cao mười trượng, chưởng quản sinh tử sổ bộ của linh hồn dưới trướng.'
      }
    ],
    requiredCatalysts: ['Vạn Niên Âm Hồn Thảo', 'Cửu U Hoàng Tuyền Thủy', 'Thi Vương Tâm Tinh', 'Oan Hồn Thần Sa'],
    tiers: [
      {
        tierNumber: 1,
        tierName: 'Tầng Thứ Nhất: Dẫn Âm Nhập Mạch',
        subStages: ['Tụ Âm Khí', 'Luyện Quỷ Đồng', 'Thi Ma Bì'],
        realmEssence: 'Thanh lọc khí dương, dung nạp hàn khí cõi âm làm nguồn sống.',
        physicalManifestation: 'Da dẻ trắng bệch như xác ướp nhưng dẻo dai khó đứt, móng tay dài ra màu đen tím.',
        spiritualVeinOperation: 'Máu chảy chậm lại, nhiệt độ cơ thể lạnh giá như băng đá nghìn năm.',
        breakthroughPhenomenon: 'Nhiệt độ phòng giảm mạnh, sương giá phủ kín mặt sàn kèm theo tiếng than khóc ai oán rợn người.',
        mortalLifespan: '250 tuổi',
        combatAura: 'Âm u quỷ dị, mang theo mùi tử khí của nghĩa địa cổ xưa.',
        tabooAndDemonDanger: 'Dễ bị vạn quỷ cắn trả nuốt chửng linh hồn nếu thần thức suy yếu.'
      },
      {
        tierNumber: 2,
        tierName: 'Tầng Thứ Hai: Cửu U Huyết Hải',
        subStages: ['Ngưng Huyết Hà', 'U Minh Ma Hạt', 'Vạn Quỷ Quy Tông'],
        realmEssence: 'Biến đan điền thành một hồ máu U Minh sâu không thấy đáy.',
        physicalManifestation: 'Đôi mắt rực lên ánh sáng màu đỏ máu và tím than, bước đi để lại dấu chân bốc khói đen.',
        spiritualVeinOperation: 'Âm hỏa bốc cháy âm ỉ bên trong xương tủy, tàn phá nhưng đồng thời tái tạo tế bào bất tử.',
        breakthroughPhenomenon: 'Mây đen ma vụ cuồn cuộn che lấp mặt trời, tiếng quỷ gào thét vang rền cả một ngọn núi.',
        mortalLifespan: '600 tuổi',
        combatAura: 'Lạnh lẽo thấu xương, áp chế đạo tâm của những tu sĩ có ý chí yếu đuối.',
        tabooAndDemonDanger: 'Tâm Ma Huyết Nhục cám dỗ giết chóc phàm nhân để gia tăng tu vi nhanh chóng.'
      }
    ],
    authorWritingTips: [
      'Miêu tả sự tàn nhẫn, lạnh lùng nhưng đầy toan tính của ma tu, không phải điên cuồng vô nghĩa mà có mục tiêu sinh tồn rõ rệt.',
      'Tạo nên sự đối lập gay gắt giữa chính đạo ngụy quân tử và ma tu chân thật để tạo chiều sâu triết lý cho câu chuyện.'
    ]
  }
];
