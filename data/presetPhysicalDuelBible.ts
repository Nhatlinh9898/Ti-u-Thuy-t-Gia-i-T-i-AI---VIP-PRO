// =========================================================================
// VÕ ĐẠO THƯ HÙNG BẢO ĐIỂN (VẬT LÝ CHIẾN TRƯỜNG & BIỆN GIẢI CHIÊU THỨC)
// Kho tàng phân cảnh giao đấu đối kháng chuyên sâu giữa các nhân vật:
// Mô tả chiêu thức, diễn giải bản chất kỹ thuật & lực học của từng đối thủ,
// Không gian, thời gian và tác động vật lý chi tiết lên môi trường xung quanh
// (Sóng xung kích, áp suất chân không, truyền động năng, biến dạng nhiệt...).
// =========================================================================

export interface CombatantProfile {
  name: string;
  factionAndTitle: string;        // Môn phái, danh xưng (Đại Càn Trấn Bắc Hầu, Vân Tiêu Kiếm Thánh...)
  cultivationStage: string;       // Cảnh giới tu vi / thể phách (Kim Đan Đỉnh Phong, Bá Thể Tầng 7...)
  weaponAndDiscipline: string;    // Vũ khí & Tuyệt kỹ võ công
  combatStanceAndWeight: string;  // Thế đứng, phân bổ trọng tâm, bộ pháp chuẩn bị
}

export interface TechniqueClashExchange {
  roundIndex: number;
  roundTitle: string; // Tên hiệp đấu (ví dụ: "Hiệp 1: Thí Thám Kiếm Phong • Phá Không Nhất Tuyến")
  combatantA: {
    moveName: string;           // Tên chiêu thức
    tacticalIntent: string;     // Ý đồ chiến thuật
    kineticExecution: string;   // Quỹ đạo kình lực, góc xuất chiêu, gia tốc
    techniqueExegesis: string;  // Diễn giải bản chất chiêu thức: dẫn khí kinh lạc, cơ chế giải phẫu cơ bắp
  };
  combatantB: {
    moveName: string;           // Tên chiêu phản đòn / hóa giải
    counterTactics?: string;    // Chiến thuật khắc chế
    tacticalIntent?: string;    // Ý đồ chiến thuật phản công
    kineticExecution: string;   // Quỹ đạo đón đỡ, chuyển hướng xung lượng
    techniqueExegesis: string;  // Diễn giải cơ chế phá chiêu: triệt tiêu đà, mượn lực tá lực, điểm yếu
  };
  collisionNexus: string;       // Điểm giao nhau giữa hai luồng vũ khí / kình lực
  physicsImpactDetail: {
    shockwaveAndAirCompression: string;     // Sóng xung kích, chèn ép áp suất, nổ âm thanh
    kineticTransferThroughMedium: string;   // Động năng truyền qua địa hình, nứt vỡ đá, xé toạc đất
    thermodynamicsAndFriction: string;      // Nhiệt năng, ma sát, bốc hơi nước, ion hóa
    structuralDamageToEnvironment: string;  // Phá hủy cụ thể địa hình xung quanh
  };
}

export interface PhysicalDuelScene {
  id: string;
  title: string;
  alias: string;
  category:
    | 'Kiếm Đạo Đỉnh Phong'
    | 'Thương Đao Huyết Thư'
    | 'Quyền Cước Thối Thể'
    | 'Tiên Ma Thần Thông'
    | 'Cung Xạ Nghịch Tập'
    | 'Trọng Binh Phá Giáp';
  spaceAndTime: {
    timeOfDay: string;                      // Hoàng hôn, canh ba giờ Tý, rạng đông giờ Mão, chính ngọ...
    seasonAndWeather: string;               // Tiết trời: Bão tuyết lạnh giá, sấm giông cuồng phong, nắng gắt...
    locationAndTerrain: string;             // Địa điểm: Cầu đá cổ trên vực thẳm, bãi đầm lầy, miệng núi lửa...
    atmosphericPressureAndQiField: string;  // Khí áp, từ trường chân khí, độ đậm đặc của không khí
  };
  combatantA: CombatantProfile;
  combatantB: CombatantProfile;
  exchanges: TechniqueClashExchange[];
  physicsMechanicsSummary: string; // Tóm tắt các nguyên lý vật lý cốt lõi chi phối trận đánh
  masterProseExcerpt: string;     // Trích đoạn văn mẫu hoàn chỉnh chất lượng văn học tuyệt đỉnh
}

export const PRESET_PHYSICAL_DUEL_SCENES: PhysicalDuelScene[] = [
  // =======================================================================
  // 1. KIẾM ĐẠO ĐỈNH PHONG: TRỌNG KIẾM vs LINH KIẾM TRÊN CẦU ĐÁ VỰC THẲM
  // =======================================================================
  {
    id: 'duel_01_co_phong_doan_kieu_kiem_thanh',
    title: 'Kiếm Phách Đoạn Kiều • Thái Sơ Trọng Kiếm vs Thu Thủy Linh Kiếm',
    alias: 'Hoàng Hôn Trên Cầu Đá Vực Thẳm Vạn Trượng Hai Đại Kiếm Tông Khai Kiếm Sóng Xung Kích Vỡ Đá',
    category: 'Kiếm Đạo Đỉnh Phong',
    spaceAndTime: {
      timeOfDay: 'Chiều tà giờ Dậu, vầng tà dương đỏ quạch như giọt máu rủ xuống sau rặng núi sắc nhọn',
      seasonAndWeather: 'Đầu đông gió bấc gầm rít từng cơn lạnh buốt, độ ẩm không khí thấp khiến các bề mặt khô giòn',
      locationAndTerrain: 'Cây cầu đá cổ vòm cong "Đoạn Long Kiều" bắc qua hẻm vực sâu muôn trượng, vách đá dựng đứng nhẵn thín',
      atmosphericPressureAndQiField: 'Kiếm ý hai bên bức tỏa làm khí áp giảm đột ngột, gió lốc xoáy quanh cầu, không khí tích điện nhẹ khiến lông tơ dựng đứng'
    },
    combatantA: {
      name: 'Tiêu Cảnh',
      factionAndTitle: 'Đại Càn Trấn Bắc Hầu • Vô Song Thể Tu',
      cultivationStage: 'Kim Đan Hậu Kỳ • Thối Cốt Bá Thể Đệ Bát Trọng',
      weaponAndDiscipline: 'Thái Cổ Hỗn Độn Trọng Kiếm nặng một ngàn hai trăm cân, lưỡi cùn không sắc',
      combatStanceAndWeight: 'Trung Bình Tấn hạ thấp trọng tâm, hai bàn chân khóa cứng vào mặt đá cổ, hai tay ghìm đốc kiếm ngang hông, sống lưng cong như cánh cung ngàn cân tích lũy thế năng đàn hồi.'
    },
    combatantB: {
      name: 'Lăng Phong',
      factionAndTitle: 'Thái Hư Kiếm Tông • Vân Tiêu Kiếm Thánh',
      cultivationStage: 'Kim Đan Đỉnh Phong • Thu Thủy Kiếm Ý Đại Viên Mãn',
      weaponAndDiscipline: 'Thu Thủy Hàn Quang Kiếm chế từ ngọc thạch nghìn năm, dẻo dai như dải lụa, lưỡi mỏng bằng một phần mười sợi tóc',
      combatStanceAndWeight: 'Hư Bộ Lướt Sóng, mũi chân phải chỉ chạm nhẹ vào gờ đá, thân hình bồng bềnh dập dờn theo từng ngọn gió lốc, kiếm chúc xuống đất góc ba mươi độ.'
    },
    exchanges: [
      {
        roundIndex: 1,
        roundTitle: 'Khai Mạc: Siêu Thanh Đâm Tới vs Trầm Kình Phản Lực',
        combatantA: {
          moveName: 'Thái Sơ Hám Sơn • Hoành Kiếm Phong Lôi',
          tacticalIntent: 'Dùng khối lượng cực đại và diện tích bề mặt kiếm lớn để chặn đứng đường kiếm sắc bén, mượn phản lực chấn nát cổ tay đối phương.',
          kineticExecution: 'Gia tốc thanh trọng kiếm 1.200 cân từ vận tốc 0 lên 80m/s trong vòng 0.05 giây, vung ngang góc 45 độ đón đầu mũi linh kiếm.',
          techniqueExegesis: 'Chân khí từ huyệt Dũng Tuyền bùng nổ, truyền qua xương sống đại chu thiên vào hai bắp tay, tận dụng lực đòn bẩy của đốc kiếm dài hai thước tạo mô-men xoắn khổng lồ.'
        },
        combatantB: {
          moveName: 'Thiên Ngoại Phi Tiên • Thu Thủy Nhất Tuyến',
          tacticalIntent: 'Bỏ qua phòng ngự, tập trung toàn bộ động năng vào một điểm tiếp xúc cực nhỏ để xuyên thủng kình phong bảo hộ.',
          kineticExecution: 'Thân hình vượt bức tường âm thanh (Mach 1.2), lưỡi kiếm rung động tần số cao 12.000 Hz tạo hiệu ứng sóng cắt siêu âm.',
          techniqueExegesis: 'Thu Thủy Chân Khí nén thành sợi tơ mỏng manh dẫn dọc theo sống kiếm, triệt tiêu ma sát không khí phía trước đầu kiếm tạo vùng chân không cục bộ.'
        },
        collisionNexus: 'Mũi kiếm Thu Thủy đâm trúng chính diện tâm bản thanh Thái Cổ Trọng Kiếm cách gờ kiếm ba tấc.',
        physicsImpactDetail: {
          shockwaveAndAirCompression: 'Một vụ nổ sóng âm hình nón (Mach Cone) bùng phát tại điểm tiếp xúc; không khí bị nén tức thời phát ra tiếng nổ "OANH!" đanh chói tai, sóng xung kích quét sạch màn sương mù trong bán kính năm mươi trượng.',
          kineticTransferThroughMedium: 'Động năng va chạm truyền thẳng qua thân Tiêu Cảnh xuống hai bàn chân, làm phiến đá hoa cương cổ dày hai thước dưới chân chàng nứt toác thành hàng vạn đường nứt mạng nhện, đá dăm bắn ngược lên không trung.',
          thermodynamicsAndFriction: 'Tần số rung cực cao của kiếm Thu Thủy ma sát với kim loại đen làm điểm tiếp xúc phát sáng đỏ rực hơn 1.000°C, tia lửa trắng bạc bắn tung tóe như pháo hoa.',
          structuralDamageToEnvironment: 'Hai bên lan can cầu đá cổ bị sóng xung kích thổi bay rơi thẳng xuống đáy vực sâu muôn trượng, không khí quanh điểm va chạm méo mó do chênh lệch mật độ nhiệt.'
        }
      }
    ],
    physicsMechanicsSummary: 'Cuộc đụng độ giữa Định Luật Bảo Toàn Động Lượng (khối lượng cực đại gia tốc cao) và Cơ Học Biến Dạng Sóng Âm (tần số dao động vi mô tập trung diện tích nhỏ). Sóng xung kích phân tán năng lượng qua môi trường rắn và khí quyển.',
    masterProseExcerpt: `Hoàng hôn buông ráng đỏ thẫm như chảo máu trên đỉnh Đoạn Long Kiều.

Gió đông gào rít qua hẻm vực hun hút ngàn trượng, làm những sợi dây xích rỉ sét đung đưa phát ra tiếng kim loại va đập ghê rợn. Giữa thân cầu đá trơ trọi, hai bóng người đứng đối diện nhau cách nhau đúng ba mươi bước.

Một bên là Tiêu Cảnh, thân hình vạm vỡ như tượng đồng đen, hai bàn chân cắm ngập vào mặt đá nứt nẻ. Thanh Thái Cổ Trọng Kiếm nặng ngàn hai trăm cân trong tay chàng ghìm ngang hông, không khí xung quanh thân kiếm dường như bị khối lượng đặc quánh của nó làm bẻ cong ánh sáng.

Phía đối diện, Lăng Phong tà áo trắng bay lướt thướt trước gió lốc, mũi chân chỉ điểm nhẹ trên gờ đá mòn. Thanh Thu Thủy Kiếm trong tay y trong suốt như một dải nước hồ mùa thu, nhưng mũi kiếm đang rung lên với tần số rợn người, phát ra tiếng vo ve trầm đục tựa muôn ngàn con ong độc xé gió.

"Keng!"

Không có bất kỳ lời mở đầu thừa thãi nào. Lăng Phong chuyển động! Thân hình y biến mất tại chỗ, chỉ để lại một vệt tàn ảnh trắng xóa. Không khí bị xé toạc ra một đường hầm chân không dài ba mươi bước khi y vượt qua vận tốc âm thanh trong nháy mắt. Mũi Thu Thủy Kiếm nén toàn bộ kình lực thành một điểm sáng trắng chói lòa, đâm thẳng vào mi tâm Tiêu Cảnh!

"Mở cho ta!"

Tiêu Cảnh gầm lên một tiếng sấm sét. Đôi chân chàng phát lực dậm mạnh làm hai tảng đá cổ nát vụn. Bắp tay chàng cuộn lên rắn chắc như sắt nguội, thanh trọng kiếm khổng lồ vung ngang thành một dải bán nguyệt đen kịt!

"OANH LIỆT!"

Mũi kiếm nhọn hoắt va chạm thẳng vào tâm bản trọng kiếm. 

Một quầng sáng trắng bạc bùng nổ chói lòa. Sóng xung kích hình nón tức khắc quét bay toàn bộ sương gió xung quanh. Áp lực nén khí khủng khiếp ép mặt đá cầu nứt toác thành muôn triệu mảnh vụn, lan can hai bên cầu sụp đổ ầm ầm rơi thẳng xuống vực sâu muôn trượng. 

Tại điểm chạm nhau, ma sát cực độ nung đỏ rực mặt thép đen, những tia lửa plasma bắn ra rát bỏng mặt mũi. Lăng Phong bị phản lực ngàn cân chấn dội bật ngược ra sau ba trượng, mũi chân cày nát mặt đá; trong khi Tiêu Cảnh hai chân lún sâu nửa thước vào lòng cầu, lồng ngực phập phồng co thắt, ánh mắt rực lửa sát khí nhìn chằm chằm vào đối thủ.`
  },

  // =======================================================================
  // 2. THƯƠNG ĐAO HUYẾT THƯ: BÁ LONG THƯƠNG vs MA ĐAO NHIỆT ĐỘ CAO
  // =======================================================================
  {
    id: 'duel_02_hac_thuy_dam_hoang_thuong_dao',
    title: 'Nộ Hải Liệt Diễm • Cửu U Bá Long Thương vs Huyết Nguyệt Trảm Ma Đao',
    alias: 'Đêm Bão Mưa Giông Đầm Lầy Sóng Xoáy Nước Lạnh Đụng Độ Lưỡi Đao Nung Chảy Đá Nổ Hơi Nước',
    category: 'Thương Đao Huyết Thư',
    spaceAndTime: {
      timeOfDay: 'Đêm khuya canh ba giờ Tý, bóng tối dày đặc bị xé rách liên hồi bởi những tia chớp bạc',
      seasonAndWeather: 'Mưa bão mùa hạ trút nước xối xả, gió giật cấp mười một, sấm sét gầm vang long trời lở đất',
      locationAndTerrain: 'Bãi đầm lầy Hắc Thủy ngập ngụa bùn đen và nước ngập đến bắp chân, xung quanh là những gốc cổ thụ ngàn năm rễ trồi chằng chịt',
      atmosphericPressureAndQiField: 'Hơi nước bão hòa cực độ kết hợp với nhiệt khí tỏa ra từ ma đao tạo nên luồng sương mù nóng rực bao phủ trận địa'
    },
    combatantA: {
      name: 'Sở Cuồng Nhân',
      factionAndTitle: 'Bá Đạo Thương Tông • Bắc Cương Đệ Nhất Thương',
      cultivationStage: 'Kim Đan Hậu Kỳ • Thần Lực Thiên Sinh',
      weaponAndDiscipline: 'Bá Long Huyền Thiết Thương dài một trượng ba, nặng chín trăm cân, cán rèn bằng gỗ Thiết Lê ngâm dầu quạ',
      combatStanceAndWeight: 'Mã Bộ Trầm Chu, hai chân bám sâu vào lớp bùn lầy, thân thương xoay ngang trước ngực, kẹp cán thương dưới nách để tận dụng lực toàn thân.'
    },
    combatantB: {
      name: 'Lệ Vô Nhai',
      factionAndTitle: 'Huyết Sát Ma Tông • Đoạt Mệnh Ma Đao',
      cultivationStage: 'Kim Đan Hậu Kỳ • Ma Hỏa Quán Thể',
      weaponAndDiscipline: 'Huyết Nguyệt Ma Đao rèn bằng vẫn thạch đỏ, lưỡi đao có rãnh dẫn máu, có khả năng kích phát nhiệt lượng 1.500°C',
      combatStanceAndWeight: 'Nghịch Nhận Thao Đao Thức, khom người sát mặt nước bùn, đao giấu sau lưng, chân bước trượt nhẹ trên bùn lầy như loài bò sát săn mồi.'
    },
    exchanges: [
      {
        roundIndex: 1,
        roundTitle: 'Kích Chiến: Thủy Kình Xoắn Ốc vs Nhiệt Đao Chém Nước Bốc Hơi',
        combatantA: {
          moveName: 'Bá Long Bôn Triều • Toàn Kình Thấu Tâm',
          tacticalIntent: 'Dùng chuyển động xoay tròn của cán thương để cuốn nước mưa thành tấm khiên thủy lực, đâm xuyên qua đường chém của đao.',
          kineticExecution: 'Cán thương xoay 720 độ quanh trục dọc trong 0.1 giây, mũi thương biến thành mũi khoan cơ học tốc độ cao cuốn theo lớp nước mưa dày đặc.',
          techniqueExegesis: 'Chân khí Thủy hệ kích phát dọc mười hai kinh lạc, lợi dụng sức căng bề mặt của nước mưa để tạo lớp xoáy thủy động lực học bảo vệ thân thương.'
        },
        combatantB: {
          moveName: 'Huyết Nguyệt Liệt Nham • Bạt Đao Phách Lãng',
          tacticalIntent: 'Dùng nhiệt lượng cực cao làm bốc hơi khiên nước, chém nghiêng góc ba mươi độ cắt đứt khớp nối cổ tay người cầm thương.',
          kineticExecution: 'Lưỡi đao chém chéo từ dưới lên với vận tốc 95m/s, bề mặt kim loại phát nhiệt đỏ rực nung chảy các giọt mưa trước khi chúng kịp chạm vào đao.',
          techniqueExegesis: 'Huyết Hỏa Chân Khí bùng nổ qua huyệt Lao Cung, nén nhiệt lượng vào mép lưỡi đao dày nửa milimet, tạo ra sóng nhiệt bức xạ ion hóa.'
        },
        collisionNexus: 'Lưỡi đao chém trúng cạnh mũi thương đang xoay tròn giữa màn mưa rào xối xả.',
        physicsImpactDetail: {
          shockwaveAndAirCompression: 'Sự tiếp xúc giữa nhiệt độ 1.500°C và khối nước lạnh gây ra hiện tượng Giãn Nở Nhiệt Đột Ngột (Steam Explosion), tạo tiếng nổ đanh "ĐÙNG!" hất văng hai người sang hai bên.',
          kineticTransferThroughMedium: 'Áp lực nổ truyền xuống lớp bùn lầy đáy đầm, thổi bay toàn bộ bùn nước trong bán kính mười trượng, để lộ ra nền sỏi đá đáy đầm khô khốc bốc khói nghi ngút.',
          thermodynamicsAndFriction: 'Hơi nước áp suất cao bốc lên nghi ngút làm mù mịt tầm nhìn, các giọt nước mưa xung quanh bị ion hóa phát ra ánh sáng đỏ nhạt ma quái.',
          structuralDamageToEnvironment: 'Cây cổ thụ ba người ôm cách đó bảy trượng bị sóng chấn động phạt ngang thân gãy đổ ầm ầm xuống đầm lầy, bùn đen bắn tung tóe lên tận ngọn cây cao.'
        }
      }
    ],
    physicsMechanicsSummary: 'Hiện tượng Giãn Nở Nhiệt Hơi Nước Cực Đại (Steam Explosion) khi nhiệt năng tập trung gặp môi trường chất lỏng áp suất cao, chuyển hóa nhiệt năng thành động năng cơ học phân tán.',
    masterProseExcerpt: `Mưa bão gầm thét như trút nước xuống đầm lầy Hắc Thủy.

Từng đợt sấm sét rạch ngang bầu trời đêm, soi tỏ hai bóng ma đang ghìm nhau giữa bùn đen ngập đến gối. Nước mưa tuôn ràn rạt qua vạt áo rách tơi tả, nhưng cả Sở Cuồng Nhân và Lệ Vô Nhai đều không hề chớp mắt.

"Chết đi!"

Lệ Vô Nhai gầm lên, thanh Huyết Nguyệt Ma Đao sau lưng y bỗng chốc phát sáng rực rực như một thanh sắt nung trong lò rèn. Nhiệt lượng kinh hoàng từ lưỡi đao bốc lên làm nước mưa rơi trúng đao bốc hơi xèo xèo thành từng làn khói trắng. Y lướt đi trên mặt bùn như một vệt lửa đỏ, chém nghiêng một nhát đao xé toạc màn đêm!

Đáp lại đòn chém ấy, Sở Cuồng Nhân xoay hông, hai bàn tay vạm vỡ siết chặt cán thương chín trăm cân. 

"Vù! Vù! Vù!"

Chiếc Huyền Thiết Thương xoay tròn với tốc độ kinh hồn, biến thành một chiếc mũi khoan kim loại khổng lồ. Toàn bộ lượng nước mưa xung quanh bị lực ly tâm hút vào, tạo thành một vòi rồng nước xoáy tròn bao bọc quanh mũi thương sáng quắc.

"BÙNG!"

Lưỡi đao rực lửa chém trúng cạnh mũi thương xoáy nước.

Ngay khoảnh khắc tiếp xúc, nhiệt độ ngàn độ của ma đao gặp khối nước lạnh buốt lập tức gây ra một vụ nổ hơi nước kinh thiên động địa!

Một tiếng nổ như sấm sét nổ ngay sát mặt đất. Lớp bùn lầy dày ba thước trong phạm vi mười trượng bỗng chốc bị luồng sóng xung kích nhiệt thổi bay sạch sẽ, để lộ ra nền đá cuội đen nhánh dưới đáy đầm bốc khói ngùn ngụt. Một thân cây cổ thụ gần đó bị kình phong phạt ngang thân, gãy răng rắc rồi đổ ầm xuống nước.

Hai thân hình bị phản lực cực đại hất văng lùi lại năm trượng, chân cày nát lớp bùn sũng nước. Khói nước mịt mù che khuất tầm mắt, chỉ còn lại tiếng thở dốc trầm đục và hai ánh mắt đỏ ngầu sát khí đang bùng cháy giữa đêm mưa bão.`
  },

  // =======================================================================
  // 3. QUYỀN CƯỚC THỐI THỂ: THỐN KÌNH NỨT ĐÁ vs HÓA CỐT NHU KÌNH
  // =======================================================================
  {
    id: 'duel_03_nham_dong_thoi_the_thon_kinh',
    title: 'Cương Nhu Băng Liệt • Bách Luyện Kim Cang Quyền vs Cửu U Hóa Cốt Chưởng',
    alias: 'Giữa Trưa Nắng Gắt Hang Nham Thạch Phát Lực Trong Một Tấc Động Năng Xuyên Thấu Rung Chuyển Địa Tầng',
    category: 'Quyền Cước Thối Thể',
    spaceAndTime: {
      timeOfDay: 'Chính ngọ giờ Ngọ, ánh nắng thẳng đứng chiếu qua các khe nứt trần hang tạo thành những cột sáng bụi vàng',
      seasonAndWeather: 'Mùa hè khô hạn thiêu đốt, nhiệt độ trong hang động ngầm lên tới 65°C, không khí nồng nặc mùi lưu huỳnh',
      locationAndTerrain: 'Hang động đá hoa cương "Cự Nham Động", trần hang treo hàng ngàn cột thạch nhũ sắc nhọn, nền hang là đá tảng bazan cứng như thép',
      atmosphericPressureAndQiField: 'Nhiệt độ cao làm không khí giãn nở loãng, oxy khan hiếm khiến tim đập nhanh gấp đôi, áp lực kình khí nén chặt trong không gian kín'
    },
    combatantA: {
      name: 'Thích Viên',
      factionAndTitle: 'Kim Cang Thiền Viện • Kim Thân La Hán',
      cultivationStage: 'Thối Thể Đệ Thập Trọng • Kim Cang Bất Hoại',
      weaponAndDiscipline: 'Bách Luyện Kim Thân Quyền, nắm đấm chai sạn như búa tạ đồng, chuyên về Thốn Kình phá cốt',
      combatStanceAndWeight: 'Mã Bộ Thiết Thung, hai bàn chân cắm chặt xuống nền đá bazan sâu ba phân, ngực ưỡn lưng thẳng, nắm đấm thu về sát sườn ngực nén kình.'
    },
    combatantB: {
      name: 'Hắc Sát Ma Tôn',
      factionAndTitle: 'U Minh Ma Giáo • Vô Cốt Chưởng Môn',
      cultivationStage: 'Thối Thể Cực Hạn • Linh Xà Nhu Cốt Thân',
      weaponAndDiscipline: 'Cửu U Hóa Cốt Chưởng, các khớp xương có thể tháo rời và uốn cong 360 độ, chuyên về hấp thụ và chuyển hướng động năng',
      combatStanceAndWeight: 'Xà Hành Hư Bộ, thân hình lắc lư mềm dẻo như không xương, trọng tâm di chuyển liên tục giữa gót chân và mũi chân.'
    },
    exchanges: [
      {
        roundIndex: 1,
        roundTitle: 'Cận Thân Giác Lực: Thốn Kình Khai Sơn vs Nhu Đạo Hấp Kình Phân Tán',
        combatantA: {
          moveName: 'Kim Cang Thốn Kình • Phá Cốt Hám Địa',
          tacticalIntent: 'Thu hẹp cự ly xuống dưới một gang tay, phóng xuất toàn bộ động năng tích lũy trong tích tắc để đối phương không kịp chuyển dời cơ thể.',
          kineticExecution: 'Nắm đấm chỉ di chuyển quãng đường 3cm (1 inch) nhưng đạt vận tốc 45m/s trong 0.008 giây, gia tốc cực hạn tạo xung lực ngàn cân.',
          techniqueExegesis: 'Vận chuyển chân khí qua ba trăm sáu mươi khối cơ bắp, khóa chặt các khớp cổ tay và khuỷu tay thành một khối cứng vững truyền xung lượng trực tiếp từ gót chân lên đầu ngón tay.'
        },
        combatantB: {
          moveName: 'Linh Xà Triền Thân • Cửu Khúc Hóa Kình',
          tacticalIntent: 'Dùng độ trễ đàn hồi của các thớ cơ và khớp xương lỏng để kéo dài thời gian va chạm, dẫn truyền động năng đối thủ xuống nền đất dưới chân.',
          kineticExecution: 'Lòng bàn tay uốn cong bọc lấy nắm đấm, thân mình xoay theo đường xoắn ốc ốc sên lùi nửa bước chuyển hướng lực nén.',
          techniqueExegesis: 'Âm Nhu Chân Khí làm mềm các màng bao cơ bắp, biến lồng ngực và cánh tay thành một hệ thống giảm chấn thủy lực tự nhiên.'
        },
        collisionNexus: 'Nắm đấm vàng ánh kim của Thích Viên đấm thẳng vào lòng bàn tay mềm như bông của Hắc Sát Ma Tôn cách ngực nửa tấc.',
        physicsImpactDetail: {
          shockwaveAndAirCompression: 'Sóng nén thủy lực trong không khí kín nổ tung "BÙNG!" trầm đục như bom nổ trong hầm ngầm, màng nhĩ hai người rung lên bần bật.',
          kineticTransferThroughMedium: 'Động năng không bị triệt tiêu mà bị Hắc Sát dẫn truyền qua cột sống xuống chân; nền đá bazan dày ba thước dưới chân y nổ tung thành một hố phễu sâu hai thước, đá tảng vỡ vụn như bột cám.',
          thermodynamicsAndFriction: 'Cọ xát kình khí cực mạnh làm bốc khói đen khét lẹt từ lòng bàn tay hai bên, vải áo rách toạc vì áp lực khí nén.',
          structuralDamageToEnvironment: 'Sóng chấn động dội lên trần hang làm hàng trăm cột thạch nhũ nặng hàng tấn gãy lìa, rơi ầm ầm xuống như mưa chông đá cắm ngập vào mặt đất.'
        }
      }
    ],
    physicsMechanicsSummary: 'Nguyên lý Xung Lực Động Lượng F = Δp/Δt (thời gian va chạm cực ngắn sinh lực cực đại) đối kháng với Cơ Học Hấp Thụ Năng Lượng Đàn Hồi (kéo dài thời gian va chạm để phân tán ứng suất cơ học).',
    masterProseExcerpt: `Giữa trưa nắng gắt thiêu đốt, hang Cự Nham như một chiếc lò nung đá ngột ngạt đến nghẹt thở.

Ánh mặt trời gay gắt rọi qua những khe nứt trần hang, chiếu rọi hai bóng người trần trùng trục đang áp sát nhau chỉ trong gang tấc. Mồ hôi nhỏ tong tong từ lồng ngực cuộn múi cơ bắp, rơi xuống nền đá nóng ran lập tức bốc hơi xèo xèo.

"Chịu một quyền của ta!"

Thích Viên hét lớn một tiếng, bước một bước chấn động lòng hang. 

Khoảng cách giữa hai người lúc này chỉ còn vẻn vẹn một gang tay! Không cần lấy đà vung tay ra xa, nắm đấm phải màu vàng kim của Thích Viên từ bên hông bất thần phóng ra phía trước. Đúng một tấc cự ly! 

"Thốn Kình!"

Toàn bộ sức mạnh của ba trăm sáu mươi khối cơ bắp và chân khí Kim Cang dồn tụ lại trong một tích tắc bằng một phần trăm cái chớp mắt. Nắm đấm chàng như một mũi kích sắt xé toạc không khí, nổ tung một tiếng trầm đục!

Hắc Sát Ma Tôn biến sắc, nhưng y không lùi. Đôi bàn tay y mềm nhũn như không có xương cốt, uốn lượn như một con linh xà bọc lấy đầu nắm đấm của Thích Viên. Y xoay hông, uốn cong cột sống, dùng toàn bộ cơ thể làm một chiếc lò xo giảm xóc khổng lồ dẫn truyền luồng kình lực khủng khiếp kia xuống hai bàn chân.

"OANH!"

Động năng ngàn cân không hề biến mất! Nền đá bazan đen nhánh dưới chân Hắc Sát bỗng chốc phát ra tiếng răng rắc rợn người rồi nổ tung thành một hố sâu hoắm rộng ba trượng. Đá tảng nứt toác, văng lên tung tóe như đạn pháo.

Sóng chấn động dội ngược lên trần hang cao mười trượng. Hàng chục cột thạch nhũ khổng lồ nặng hàng tấn bị lực rung chấn làm gãy lìa, rào rào rơi thẳng xuống đất như một trận mưa tên đá chết chóc. Hai người gầm lên, vừa đối quyền vừa né tránh thạch nhũ rơi, tạo nên một trận thư hùng long trời lở đất giữa lòng núi sâu.`
  },

  // =======================================================================
  // 4. TIÊN MA THẦN THÔNG: BĂNG PHÁCH vs PHẦN THIÊN SỐC NHIỆT VỠ NỨT
  // =======================================================================
  {
    id: 'duel_04_bang_hoa_cuc_canh_bao_tac',
    title: 'Hàn Diễm Sốc Nhiệt • Cửu U Băng Phách vs Phần Thiên Ma Viêm',
    alias: 'Rạng Đông Mặt Hồ Băng Sốc Nhiệt Đột Ngột Đá Nổ Tung Thành Cát Mây Nấm Hơi Nước Siêu Thanh',
    category: 'Tiên Ma Thần Thông',
    spaceAndTime: {
      timeOfDay: 'Rạng đông giờ Dần chuyển sang Mão, sương mai mờ ảo bao phủ mặt hồ',
      seasonAndWeather: 'Tiết Giao Mùa đông xuân, mặt hồ đóng một lớp băng mỏng, nhiệt độ dao động quanh điểm đông đá 0°C',
      locationAndTerrain: 'Mặt hồ ngọc "Hàn Đàm" rộng ngàn mẫu, đáy hồ có mạch nước ngầm băng giá, bao quanh bởi rừng phong lá đỏ',
      atmosphericPressureAndQiField: 'Chênh lệch nhiệt độ cục bộ lên tới hơn một ngàn độ C khiến luồng gió lốc xoáy liên tục hình thành, áp suất biến thiên dữ dội'
    },
    combatantA: {
      name: 'Diệp Băng Tâm',
      factionAndTitle: 'Tuyết Nguyệt Cung • Băng Phách Tiên Tử',
      cultivationStage: 'Kim Đan Đỉnh Phong • Huyền Âm Tuyệt Mạch',
      weaponAndDiscipline: 'Hàn Ngọc Băng Tinh Kiếm & Cửu Hàn Băng Phong Quyết, có khả năng hạ nhiệt độ xuống âm 120°C tức thời',
      combatStanceAndWeight: 'Đạp Băng Lăng Ba, thân hình lướt trên lớp băng mỏng mà không làm rạn nứt mặt băng, kiếm phong chỉ xuống đáy nước.'
    },
    combatantB: {
      name: 'Viêm Liệt',
      factionAndTitle: 'Phần Thiên Ma Giáo • Xích Viêm Ma Quân',
      cultivationStage: 'Kim Đan Đỉnh Phong • Đại Nhật Ma Thể',
      weaponAndDiscipline: 'Phần Thiên Ma Luân & Cửu U Ma Diễm Pháp, có khả năng kích phát nhiệt lượng 1.800°C đốt cháy không khí',
      combatStanceAndWeight: 'Hỏa Thần Ngưng Trệ, lơ lửng cách mặt băng ba thước, nhiệt khí dưới chân làm băng tan chảy bốc hơi thành cột sương mù liên tục.'
    },
    exchanges: [
      {
        roundIndex: 1,
        roundTitle: 'Đại Hạn Cực Cảnh: Âm Hàn Kết Tinh vs Hỏa Diễm Bạo Phát',
        combatantA: {
          moveName: 'Cửu Hàn Lãnh Kính • Vạn Tinh Băng Phách',
          tacticalIntent: 'Đóng băng tức thời phân tử nước trong không khí để khóa chặt chuyển động của Phần Thiên Ma Luân.',
          kineticExecution: 'Phóng ra luồng hàn khí âm 120°C với vận tốc sóng áp suất 330m/s, kết tinh hơi nước thành hàng triệu lưỡi phi đao lục giác sắc bén.',
          techniqueExegesis: 'Ngưng tụ Huyền Âm Chân Khí tại huyệt Đản Trung, đảo ngược chiều chuyển động nhiệt phân tử, hấp thu toàn bộ nhiệt lượng môi trường vào hư vô.'
        },
        combatantB: {
          moveName: 'Ma Viêm Phần Hải • Liệt Nhật Bạo Tạc',
          tacticalIntent: 'Giải phóng năng lượng nhiệt hạch hạt ma lửa để phá hủy kết cấu băng tinh, tạo sóng nhiệt nung chảy đối phương.',
          kineticExecution: 'Phần Thiên Ma Luân quay với vận tốc 10.000 vòng/phút, phun ra quả cầu lửa nén đặc mật độ cao đường kính ba trượng.',
          techniqueExegesis: 'Kích hoạt Thuần Dương Ma Huyết trong tim, ép các hạt lửa ma quái va đập hỗn loạn tạo ra phản ứng nhiệt hạch bốc cháy khí quyển.'
        },
        collisionNexus: 'Quả cầu lửa 1.800°C đâm thẳng vào bức tường băng tinh âm 120°C cách mặt nước hồ năm thước.',
        physicsImpactDetail: {
          shockwaveAndAirCompression: 'Hiện tượng Sốc Nhiệt Cực Đoan (Thermal Shock Explosion) xé rách không gian, tạo ra tiếng nổ siêu thanh "OANH OANH!" xé toạc màng nhĩ.',
          kineticTransferThroughMedium: 'Mặt băng hồ dày một thước trong phạm vi một dặm tức khắc nứt toác thành muôn triệu khối băng vụn, nước hồ dưới đáy bị luồng khí nén đẩy lùi tạo thành một hố sâu khô cạn giữa lòng hồ.',
          thermodynamicsAndFriction: 'Sự chênh lệch gần 2.000°C trong một phần ngàn giây khiến đá tảng ven hồ bị co giãn nhiệt đột ngột, nổ tung thành bụi cát mịn màng không còn nguyên vẹn khối đá.',
          structuralDamageToEnvironment: 'Cột hơi nước áp suất cao hình nấm khổng lồ bốc cao năm mươi trượng lên bầu trời rạng đông, rừng phong ven hồ bị sóng nhiệt thiêu rụi rồi lại bị hơi lạnh đóng băng thành rừng cây băng đỏ kỳ dị.'
        }
      }
    ],
    physicsMechanicsSummary: 'Hiện tượng Sốc Nhiệt Cực Đoan (Extreme Thermal Shock) và Hiệu Ứng Leidenfrost khi hai trạng thái nhiệt độ đối lập cực hạn tiếp xúc tức thời, sinh ra ứng suất nhiệt vượt quá giới hạn bền của vật chất.',
    masterProseExcerpt: `Rạng đông trên mặt hồ Hàn Đàm, một nửa mặt nước đóng băng trắng xóa, một nửa lại đang sôi sục đỏ rực như máu.

Diệp Băng Tâm tà áo trắng như tuyết, thanh Hàn Ngọc Kiếm chỉ xuống mặt hồ. Nhiệt độ xung quanh nàng hạ thấp đến mức từng giọt sương mai vừa rơi xuống đã hóa thành những hạt ngọc băng nhỏ tí tách rơi rụng.

Cách nàng năm mươi bước, Viêm Liệt lơ lửng trên không trung như một vầng mặt trời đen. Chiếc Phần Thiên Ma Luân trong tay y rực cháy ngùn ngụt, hơi nóng bỏng rát phả ra làm không khí méo mó biến dạng.

"Băng diệt!"

"Phần thiên!"

Hai tiếng thét cùng lúc vang lên. 

Từ mũi kiếm Diệp Băng Tâm, một luồng hàn khí âm trăm độ phóng xuất ra, biến toàn bộ hơi nước trên mặt hồ thành hàng triệu mũi kim băng trong suốt rít gió lao đi. 

Cùng tích tắc ấy, Viêm Liệt vung mạnh Ma Luân! Một quả cầu lửa nén đặc đỏ quạch mang nhiệt lượng ngàn độ nổ bùng ra, thiêu cháy cả dưỡng khí trong không gian lao thẳng về phía trước.

"OANH LIỆT ĐỊA THIÊN!"

Khoảnh khắc khối băng âm trăm độ đâm sầm vào khối lửa ngàn độ, một hiện tượng sốc nhiệt khủng khiếp chưa từng có bùng nổ giữa lòng hồ!

Mặt băng dày một thước nứt toác "Răng rắc!" rồi nổ tung thành muôn triệu mảnh vụn. Hơi nước bốc lên với tốc độ siêu thanh tạo thành một cột khói hình nấm khổng lồ cao tới năm mươi trượng che khuất cả ánh bình minh. 

Những tảng đá hoa cương ven hồ do bị lạnh buốt rồi lập tức bị nung nóng trong một phần ngàn giây, toàn bộ kết cấu phân tử bị phá hủy, nổ bung thành từng đám bụi cát mịn màng bay mù mịt. Nước hồ dạt sang hai bên để lộ ra lòng bùn đáy hồ khô khốc bị nung chảy thành thủy tinh sáng bóng dưới ánh tà dương.`
  },

  // =======================================================================
  // 5. CUNG XẠ NGHỊCH TẬP: SIÊU THANH NỎ vs TRỌNG TIỄN HẺM NÚI KHÍ ĐỘNG HỌC
  // =======================================================================
  {
    id: 'duel_05_liet_phong_hem_nui_sieu_thanh',
    title: 'Khí Động Siêu Thanh • Tru Thần Cơ Quan Nỏ vs Kình Cốt Xuyên Vân Tiễn',
    alias: 'Hẻm Núi Gió Hút Hiệu Ứng Khí Động Học Hai Mũi Tên Vượt Âm Đâm Nhau Nổ Đạn Hoa Cải',
    category: 'Cung Xạ Nghịch Tập',
    spaceAndTime: {
      timeOfDay: 'Chiều muộn chạng vạng, ánh nắng vàng vọt le lói chiếu qua khe núi hẹp',
      seasonAndWeather: 'Gió thu gào rít qua khe hẹp tạo nên tiếng hú dài ghê rợn, nhiệt độ hạ nhanh chóng',
      locationAndTerrain: 'Hẻm núi dựng đứng "Hô Phong Hạp", hai vách đá cao ngàn trượng chỉ cách nhau ba mươi trượng tạo thành đường hầm gió tự nhiên',
      atmosphericPressureAndQiField: 'Hiệu ứng Venturi làm tốc độ gió tăng gấp bốn lần, áp suất khí quyển giảm mạnh hút bụi cát bay cuồn cuộn'
    },
    combatantA: {
      name: 'Phong Hàn',
      factionAndTitle: 'Ám Khí Thiên Môn • Thần Nỏ Dạ Điêu',
      cultivationStage: 'Kim Đan Trung Kỳ • Thần Niệm Khóa Mục Tiêu',
      weaponAndDiscipline: 'Tru Thần Nỏ Cơ Quan chế tác bằng thép thiên thạch, bắn tiễn tốc độ Mach 2 (680m/s)',
      combatStanceAndWeight: 'Ẩn Nham Khai Nỏ Thức, nửa quỳ sau mỏm đá, tay giữ báng nỏ cố định bằng dây da quấn chặt vào cẳng tay.'
    },
    combatantB: {
      name: 'Tiêu Cảnh',
      factionAndTitle: 'Đại Càn Trấn Bắc Hầu • Bá Vương Thần Xạ',
      cultivationStage: 'Kim Đan Hậu Kỳ • Thần Nhãn Thông Thiên',
      weaponAndDiscipline: 'Kình Cốt Thần Cung nặng năm ngàn cân & Thiết Trọng Tiễn nặng mười hai cân',
      combatStanceAndWeight: 'Trung Bình Tấn ngược hướng gió, thân hình nghiêng góc mười lăm độ chống lại sức hút của luồng gió lốc hẻm núi.'
    },
    exchanges: [
      {
        roundIndex: 1,
        roundTitle: 'Tuyệt Điểm Tiễn Phong: Đầu Mũi Tên Đâm Đầu Mũi Tên Vận Tốc Siêu Thanh',
        combatantA: {
          moveName: 'Toái Hồn Xuyên Tâm Nỏ • Siêu Thanh Điểm Xạ',
          tacticalIntent: 'Lợi dụng luồng gió nén trong hẻm núi để gia tốc mũi tên thép lên Mach 2, bắn trúng tim đối thủ trước khi tiếng nổ truyền tới.',
          kineticExecution: 'Cò nỏ bật lẫy cơ quan giải phóng thế năng đàn hồi của tám lá thép lò xo, mũi tên lao đi với vận tốc 680m/s.',
          techniqueExegesis: 'Thần niệm khóa chặt chuyển động thở của Tiêu Cảnh, tính toán độ lệch gió do hiệu ứng Coriolis trong hẻm núi hẹp.'
        },
        combatantB: {
          moveName: 'Xuyên Vân Định Hải Tiễn • Kình Khí Quy Nhất',
          tacticalIntent: 'Không né tránh, bắn một mũi trọng tiễn nặng mười hai cân đánh thẳng vào đầu mũi tên đối phương để phá nát cơ quan nỏ.',
          kineticExecution: 'Kéo căng dây cung bằng gân rồng biển, mũi tên bay đi ở tốc độ Mach 1.8 nhưng mang động năng khổng lồ gấp năm lần tiễn nỏ.',
          techniqueExegesis: 'Dẫn dắt Khí Quy Tắc đan điền bao bọc mũi tên thành một khối khí động học hình phễu xé toạc luồng gió ngược chiều.'
        },
        collisionNexus: 'Hai đầu mũi tên bằng thép siêu cứng đâm chính xác vào nhau giữa không trung cách Tiêu Cảnh năm mươi bước.',
        physicsImpactDetail: {
          shockwaveAndAirCompression: 'Hai vật thể bay siêu thanh va chạm trực diện tạo nên một quả cầu sóng xung kích hình cầu phát nổ "ĐÙNG!" chấn động hẻm núi.',
          kineticTransferThroughMedium: 'Mũi nỏ nhẹ hơn bị động năng khổng lồ của trọng tiễn ép bẹp dúm thành hình nấm rồi nổ tung thành hàng ngàn mảnh kim loại sắc nhọn bay tứ tán.',
          thermodynamicsAndFriction: 'Ma sát cực mạnh với không khí và lực nén biến dạng sinh nhiệt nung đỏ các mảnh kim loại vụn, tạo thành vệt sáng chói lòa trong bóng chiều tà.',
          structuralDamageToEnvironment: 'Hàng ngàn mảnh kim loại vụn bay với vận tốc đạn bắn găm sâu vào hai vách đá hẻm núi dày ba tấc, làm đá vụn rơi lả tả như mưa đạn hoa cải.'
        }
      }
    ],
    physicsMechanicsSummary: 'Khí Động Học Siêu Thanh (Supersonic Aerodynamics), Hiệu Ứng Venturi trong ống hẹp và Động Năng Va Chạm Trực Diện E = 1/2 mv² (vật thể khối lượng lớn áp đảo vật thể khối lượng nhỏ ở vận tốc tương đương).',
    masterProseExcerpt: `Gió rít gầm điên cuồng qua hẻm núi Hô Phong Hạp.

Hai vách núi đá hoa cương dựng đứng cao ngút ngàn ép sát lại gần nhau, biến cả hẻm núi thành một đường hầm gió khổng lồ hút cát đá bay rát mặt. Giữa không gian chật hẹp và hiểm trở ấy, sát khí đã cô đọng thành băng giá.

Cách nhau một trăm bước, Phong Hàn nấp sau mỏm đá, ngón trỏ đặt nhẹ trên cò thanh Tru Thần Nỏ bằng thép thiên thạch. 

"Tách!"

Cò nỏ khẽ bật! Một tiếng nổ xé gió chói tai vang lên khi mũi tên nỏ vượt bức tường âm thanh, vạch một đường hầm chân không mờ ảo giữa hẻm núi, lao vút đi với vận tốc Mach 2 kinh hồn!

Nhưng đối diện y, Tiêu Cảnh đã giương cung từ trước. Chàng không cần nhìn bằng mắt thường, thần niệm chàng đã bắt trọn từng gợn sóng rung động của không khí.

"Băng!"

Dây cung bằng gân rồng biển bật mạnh! Mũi trọng tiễn nặng mười hai cân xé toạc luồng gió ngược chiều, mang theo động năng bạo liệt lao thẳng nghênh đón.

Một phần mười giây sau!

Chính giữa không trung hẻm núi, hai mũi tên bằng thép cứng không hề lệch một milimet, đầu nhọn đâm chính xác vào đầu nhọn của nhau!

"OANH ĐÙNG!"

Một tiếng nổ chấn động long trời lở đất giữa hai vách đá. Quả cầu sóng xung kích siêu thanh bùng nổ hất văng cát đá mù mịt. Mũi tên nỏ nhẹ hơn lập tức bị động năng khổng lồ của trọng tiễn ép bẹp dúm rồi nổ tung thành hàng vạn mảnh kim loại vụn đỏ rực như đạn hoa cải, găm sâu vào vách đá hai bên sâu ba tấc.

Mũi trọng tiễn của Tiêu Cảnh tuy bị cản lại nhưng dư lực vẫn xé toạc mỏm đá che chắn của Phong Hàn, hất văng gã thợ săn ám khí lộn nhào ba vòng, ôm cánh tay gãy rỉ máu trong nỗi kinh hoàng tột độ.`
  },

  // =======================================================================
  // 6. KIẾM TRỌNG BINH: THẤT TINH KIẾM vs PHÁ THIÊN CHÙY CỘNG HƯỞNG CƠ HỌC
  // =======================================================================
  {
    id: 'duel_06_ngan_ha_lac_nhat_doat_phach',
    title: 'Cộng Hưởng Đoạn Kình • Thất Tinh Điểm Huyệt Kiếm vs Hỗn Nguyên Phá Thiên Chùy',
    alias: 'Đêm Trăng Sao Đỉnh Càn Khôn Mũi Kiếm Điểm 7 Nhịp Tần Số Gây Cộng Hưởng Cơ Học Bẻ Gãy Chùy Ngàn Cân',
    category: 'Trọng Binh Phá Giáp',
    spaceAndTime: {
      timeOfDay: 'Đêm khuya canh ba giờ Tý, trăng tròn vằng vặc chiếu sáng như ban ngày',
      seasonAndWeather: 'Mùa thu trời quang mây tạnh, không khí loãng và trong vắt trên đỉnh núi cao ba ngàn trượng',
      locationAndTerrain: 'Đài đá tròn "Càn Khôn Đài" bằng đá ngọc thạch phẳng nhẵn như mặt gương soi bóng sao trời',
      atmosphericPressureAndQiField: 'Trường trọng lực ổn định, không gian tĩnh mịch tuyệt đối khuếch đại mọi âm thanh va chạm kim loại'
    },
    combatantA: {
      name: 'Bùi Mẫn',
      factionAndTitle: 'Thất Tinh Kiếm Các • Tinh Hà Kiếm Khách',
      cultivationStage: 'Kim Đan Hậu Kỳ • Thấu Triệt Kiếm Ý',
      weaponAndDiscipline: 'Thất Tinh Tinh Quang Kiếm nặng ba cân, lưỡi kiếm rèn bằng đá thiên thạch xanh biếc phát quang',
      combatStanceAndWeight: 'Hạc Lập Đỉnh Môn Thức, mũi kiếm rung nhẹ theo nhịp đập của tim, thân hình thanh thoát tựa hồ không trọng lượng.'
    },
    combatantB: {
      name: 'Lôi Đột',
      factionAndTitle: 'Cự Linh Chiến Môn • Sơn Nhạc Thần Tướng',
      cultivationStage: 'Kim Đan Hậu Kỳ • Cự Linh Thần Lực',
      weaponAndDiscipline: 'Hỗn Nguyên Phá Thiên Chùy nặng một ngàn hai trăm cân, cán thép đặc dài chín thước, đầu chùy to như vò rượu',
      combatStanceAndWeight: 'Bàn Thạch Thung, hai bàn chân bẹt rộng ngang vai, hai tay nắm chặt cán thép, xoay tròn chùy sắt tạo đà quán tính khổng lồ.'
    },
    exchanges: [
      {
        roundIndex: 1,
        roundTitle: 'Kỹ Thuật Khắc Chế: Điểm Chấn Tần Số Phá Hủy Mô-Men Quán Tính',
        combatantA: {
          moveName: 'Thất Tinh Lạc Dịch • Cộng Hưởng Toái Kình',
          tacticalIntent: 'Không dùng lực đối lực, đâm liên tiếp bảy mũi kiếm vào bảy điểm nút dao động trên vành chùy để tạo hiện tượng cộng hưởng cơ học phá hủy cấu trúc.',
          kineticExecution: 'Mũi kiếm đâm ra với tần số đồng pha với nhịp quay của chiếc chùy, lực mỗi đòn chỉ ba mươi cân nhưng trùng với tần số riêng f₀ của khối thép.',
          techniqueExegesis: 'Vận dụng Thất Tinh Kiếm Khí truyền sóng siêu âm vi mô vào bên trong mạng tinh thể thép nguội, phá vỡ liên kết nguyên tử kim loại.'
        },
        combatantB: {
          moveName: 'Thiên Cân Trụy Địa • Hỗn Nguyên Cuồng Phong',
          tacticalIntent: 'Dùng mô-men động lượng cực đại của khối thép 1.200 cân xoay tròn nghiền nát thân kiếm và nội tạng đối phương.',
          kineticExecution: 'Vận tốc góc của đầu chùy đạt 25 rad/s, động năng quay lên tới hàng chục ngàn Joules tạo lực hút chân không phía trước chùy.',
          techniqueExegesis: 'Dồn toàn bộ Cự Linh Chân Khí vào xương bả vai và cánh tay để duy trì quán tính quay không thể cản phá.'
        },
        collisionNexus: 'Mũi kiếm chạm bảy nhịp liên tiếp vào gờ thép tròn của đầu chùy đang xoay tròn điên cuồng.',
        physicsImpactDetail: {
          shockwaveAndAirCompression: 'Tiếng rít chói tai "Keng... Keng... OANG!" phát ra với cao độ tăng dần do hiện tượng cộng hưởng âm học, không khí quanh chiếc chùy gợn sóng dao động mắt thường thấy rõ.',
          kineticTransferThroughMedium: 'Sóng ứng suất cơ học phản hồi chạy dọc theo cán thép truyền thẳng vào hai cánh tay Lôi Đột, làm vỡ nát các mao mạch máu dưới da, cánh tay y tê liệt hoàn toàn.',
          thermodynamicsAndFriction: 'Năng lượng cộng hưởng làm chiếc chùy sắt rung lên dữ dội đến mức phát nóng đỏ rực từ bên trong lõi thép, các đường rạn nứt vi mô lan nhanh như mạng nhện.',
          structuralDamageToEnvironment: 'Chiếc chùy ngàn cân mất kiểm soát trượt văng khỏi tay cự tướng, cắm phập xuống đài ngọc sâu ba thước làm nứt toác đài đá thành hai nửa hoàn hảo.'
        }
      }
    ],
    physicsMechanicsSummary: 'Hiện tượng Cộng Hưởng Cơ Học (Mechanical Resonance): khi tần số kích thích ngoại lực f bằng tần số dao động riêng f₀ của vật thể, biên độ dao động đạt cực đại dẫn đến phá hủy cấu trúc vật liệu (Catastrophic Structural Failure).',
    masterProseExcerpt: `Đêm trăng tròn trên đỉnh Càn Khôn Đài, đài đá ngọc thạch sáng trong vắt soi bóng ngàn vì sao tinh tú.

Lôi Đột thân hình cao lớn như một tòa tháp sắt, hai cánh tay gân guốc siết chặt cán thanh Hỗn Nguyên Phá Thiên Chùy nặng một ngàn hai trăm cân. Y bắt đầu xoay chùy!

"VÙ! VÙ! VÙ!"

Khối sắt khổng lồ to như vò rượu xoay tròn quanh thân y với vận tốc kinh hồn, xé toạc không gian tạo nên một cơn lốc hút cát đá bay cuồn cuộn. Quán tính động lượng khủng khiếp đến mức dường như không một lực lượng nào trên thế gian có thể chặn đứng được đường chùy ấy.

"Đến đây! Tiểu tử họ Bùi!" Lôi Đột gầm vang.

Bùi Mẫn đứng trên mũi kiếm thanh Thất Tinh Kiếm mảnh mai nhẹ như cánh chuồn chuồn. Ánh mắt chàng tĩnh lặng như mặt hồ không một gợn sóng.

Chàng không lùi, cũng không lấy cương chọi cương. 

"Đinh... đinh... đinh... đinh... đinh... đinh... ĐOÀNG!"

Thân hình Bùi Mẫn hóa thành một dải tàn ảnh xanh biếc. Trong chớp mắt, mũi kiếm chàng điểm chuẩn xác bảy nhát liên tiếp vào đúng bảy điểm nút dao động trên vành chiếc chùy sắt đang xoay tròn tít mù.

Mỗi nhát kiếm nhẹ như chuồn chuồn chấm nước, nhưng tần số đâm ra lại trùng khớp hoàn hảo với tần số rung dao động riêng của khối thép nghìn cân!

Hiện tượng cộng hưởng cơ học lập tức bùng nổ!

Chiếc chùy sắt một ngàn hai trăm cân bỗng phát ra tiếng rít chói tai rợn óc. Toàn bộ khối kim loại rung bần bật với biên độ cực đại, nhiệt độ lõi chùy tăng vọt làm bề mặt thép rạn nứt chằng chịt như mạng nhện.

"Á!"

Lôi Đột rú lên một tiếng đau đớn tột cùng khi sóng chấn động cộng hưởng chạy dọc cán thép xé toạc toàn bộ cơ bắp và mạch máu hai cánh tay y. Chiếc chùy sắt tuột khỏi tay, bay vút ra xa cắm phập xuống đài ngọc thạch ngập sâu ba thước, làm phiến đá ngọc ngàn năm nứt đôi phát ra tiếng nổ rền vang giữa trời đêm tịch mịch.`
  }
];

// =========================================================================
// HELPER ARRAYS & DUEL CONSTANTS FOR PROMPT INJECTION & AI GENERATION
// =========================================================================

export const DUEL_CATEGORIES_LIST = [
  { id: 'all', label: 'Tất Cả Thư Hùng', count: 6, icon: '⚡' },
  { id: 'Kiếm Đạo Đỉnh Phong', label: '🗡️ Kiếm Đạo Đỉnh Phong', count: 1, icon: '🗡️' },
  { id: 'Thương Đao Huyết Thư', label: '🔱 Thương Đao Huyết Thư', count: 1, icon: '🔱' },
  { id: 'Quyền Cước Thối Thể', label: '🥋 Quyền Cước Thối Thể', count: 1, icon: '🥋' },
  { id: 'Tiên Ma Thần Thông', label: '🔥 Tiên Ma Băng Hỏa', count: 1, icon: '🔥' },
  { id: 'Cung Xạ Nghịch Tập', label: '🏹 Cung Xạ Siêu Thanh', count: 1, icon: '🏹' },
  { id: 'Trọng Binh Phá Giáp', label: '⚒️ Trọng Binh Phá Giáp', count: 1, icon: '⚒️' }
];

export const PHYSICS_IMPACT_PRINCIPLES = [
  {
    principle: 'Sóng Xung Kích & Nón Âm Thanh (Mach Cone)',
    desc: 'Khi vũ khí hoặc thân pháp vượt tốc độ âm thanh (Mach 1+), không khí bị nén tức thời tạo sóng xung kích nổ âm thanh xé toạc màng nhĩ và thổi bay mọi vật thể xung quanh.'
  },
  {
    principle: 'Truyền Động Năng Qua Môi Trường Rắn (Kinetic Shock Propagation)',
    desc: 'Động năng từ chiêu thức không bị triệt tiêu mà truyền qua cơ thể xuống nền đá hoa cương/đất đai, tạo hố phễu và vết nứt vi mô mạng nhện.'
  },
  {
    principle: 'Sốc Nhiệt & Giãn Nở Đột Ngột (Extreme Thermal Shock & Steam Explosion)',
    desc: 'Khi hàn khí âm hàng trăm độ gặp chân hỏa ngàn độ trong tích tắc, vật chất xung quanh bị co giãn nhiệt phá hủy liên kết phân tử nổ tung thành cát bụi.'
  },
  {
    principle: 'Cộng Hưởng Cơ Học Phá Hủy Cấu Trúc (Mechanical Resonance Failure)',
    desc: 'Kình lực điểm xạ ở tần số trùng với tần số riêng f₀ của vũ khí đối phương, khuếch đại biên độ rung chấn làm nứt gãy kim loại nặng ngàn cân.'
  },
  {
    principle: 'Khí Động Học Bernoulli & Hiệu Ứng Venturi',
    desc: 'Chênh lệch áp suất trong không gian hẹp hẻm núi hay đường xoáy kiếm khí hút và bẻ cong quỹ đạo đường đạn tiễn khí.'
  }
];
