// =========================================================================
// CỬU CHÂU THỦY LỤC HIỂM ĐỊA THẦN CƠ BINH PHÁP (GIANG SƠN HIỂM TRỞ TOÀN THƯ)
// Bộ Binh Pháp Chuyên Trị: Thủy Chiến, Vùng Sông Núi Đan Xen, Hẻm Vực Sâu,
// Rừng Rậm Đầm Lầy, Ghềnh Thác Hiểm Nguy & Thủy Lục Hiệp Đồng Tác Chiến.
// =========================================================================

export interface AmphibiousFormation {
  id: string;
  name: string;
  alias: string;
  terrainType: 'Sông Lớn Thủy Vực' | 'Hẻm Núi Vực Sâu' | 'Sơn Lâm Đầm Lầy' | 'Ghềnh Thác Thượng Nguồn' | 'Sông Núi Đan Xen' | 'Cửa Biển Sương Mù' | 'Sông Nước Đầm Lầy Chằng Chịt';
  diagramText: string;
  symbol: string;
  corePhilosophy: string;
  tacticalPrinciples: string[];
  formationMovement: {
    advance: string;
    retreat: string;
    flanking: string;
    ambushTrigger: string;
  };
  signalCommands: {
    waterHorn: string;    // Tù và vỏ ốc biển / Tù và sừng trâu vang đáy sông
    coloredSmoke: string; // Khói mù ngũ sắc ven bờ rừng
    mastFlag: string;     // Cờ đuôi nheo cột buồm chính
    flameBeacon: string;  // Đuốc hiệu sườn núi / Hỏa đăng trôi sông
  };
  troopSynergy: string[];
  weatherAndWaterCondition: string;
  fatalMistakes: string[];
  narrativeBattleExcerpt: string;
}

export interface AmphibiousTroopBranch {
  id: string;
  name: string;
  category: 'Thủy Quân Chiến Hạm' | 'Thủy Quỷ Đoạt Hạm' | 'Sơn Nhai Khinh Binh' | 'Mãng Lâm Thiện Xạ' | 'Cơ Quan Thằng Kiều' | 'Khinh Chu Tiên Phong';
  icon: string;
  specialty: string;
  standardEquipment: string[];
  survivalAndMovementSkills: string[];
  combatStrengths: string[];
  combatWeaknesses: string[];
  terrainMastery: string;
  unitMotto: string;
  proseExcerpt: string;
}

export interface HybridTerrainManual {
  id: string;
  name: string;
  topography: string;
  weatherHazards: string;
  tacticalKeypoints: string[];
  ambushFormations: string[];
  disastrousTraps: string[];
  logisticsRules: string[];
  historicalClassicBattle: string;
}

export interface WaterMountainDrillRule {
  id: string;
  title: string;
  category: 'Thập Bát Thủy Lệnh' | 'Tam Phòng Lãm Bí' | 'Vượt Vực Đu Dây' | 'Phòng Ngự Đầm Lầy Độc Khí';
  teaching: string;
  practicalDrill: string[];
  warningVerse: string;
}

// =========================================================================
// 12 ĐẠI THỦY LỤC HIỂM ĐỊA CHIẾN TRẬN
// =========================================================================
export const MASTER_AMPHIBIOUS_FORMATIONS: AmphibiousFormation[] = [
  {
    id: 'amp_form_01_giao_long',
    name: 'Giao Long Xuất Hải • Thủy Hỏa Liên Hoàn Trận',
    alias: 'Thủy Hỏa Xích Sắt Cự Hạm Trận',
    terrainType: 'Sông Lớn Thủy Vực',
    symbol: '🐉🔥',
    diagramText: `
  [Bờ Trái: Cung Thần]  ~~~~ DÒNG SÔNG LỚN ~~~~  [Bờ Phải: Pháo Binh]
          \\                                      /
     ┌─────┴────────────────────────────────────┴─────┐
     │ [Tiên Phong: Thuyền Nhẹ Đao Khiên Nhử Địch]     │
     │                      ▼                         │
     │ [Trung Quân: 3 Hàng Lâu Thuyền Khóa Xích Sắt]  │
     │       [Đầu Rồng Phun Hỏa Dầu Linh Khí]         │
     │                      ▼                         │
     │ [Cánh Tả: Mông Xung] ── [Cánh Hữu: Mông Xung]  │
     │                      ▼                         │
     │ [Hậu Quân: Thuyền Lương & Thủy Quỷ Lặn Cắt Neo]│
     └────────────────────────────────────────────────┘
    `,
    corePhilosophy: 'Lấy thuyền lớn làm thành trì nổi, xích sắt liên kết giữ thăng bằng vượt sóng to gió lớn. Đầu thuyền trang bị đầu rồng phun hỏa du đặc chế bén lửa trên mặt nước, biến lòng sông thành biển lửa dìm xác vạn thuyền giặc.',
    tacticalPrinciples: [
      'Gió xuôi thì bung buồm phóng hỏa tiễn, gió ngược thì thả neo sắt cố định góc phòng thủ liên hoàn.',
      'Hai bên bờ sông phải bố trí bộ binh khống chế cao điểm, không cho hỏa lực từ trên vách núi bắn xuống nóc thuyền.',
      'Xích sắt nối thuyền phải có chốt ngàm tháo nhanh cơ quan, gặp nguy hiểm hỏa công có thể lập tức tách rời từng chiếc.'
    ],
    formationMovement: {
      advance: 'Chiến hạm giăng ngang hình bán nguyệt, trống sấm giục liên hồi, vừa bắn đá vừa phun hỏa dầu rẽ sóng tiến tới.',
      retreat: 'Hai cánh Mông Xung cơ động áp sát che chắn, Lâu Thuyền hạ buồm lùi chậm, thả chông gỗ gai nổi cản tàu giặc truy kích.',
      flanking: 'Thuyền nhẹ độc mộc lách qua lau sậy hai bên bờ luồn ra sau lưng hạm đội đối phương đánh úp.',
      ambushTrigger: 'Khi hạm đội địch lọt vào ngã ba sông có dòng nước xoáy, thuyền chỉ huy kéo cờ đỏ bắn pháo sáng phóng hỏa.'
    },
    signalCommands: {
      waterHorn: 'Hồi tù và dài 3 tiếng ngân vang: Toàn quân giương buồm xung kích.',
      coloredSmoke: 'Khói đỏ bốc lên từ soái hạm: Phun hỏa du thiêu rụi chiến hạm địch.',
      mastFlag: 'Cờ đuôi nheo xanh rủ xuống nửa cột buồm: Hạ mỏ neo, khóa xích phòng ngự.',
      flameBeacon: 'Hỏa đăng vàng trôi lờ lững mặt sông: Báo hiệu đáy sông có cọc ngầm cấm tiến.'
    },
    troopSynergy: ['Thao Thiết Lâu Thuyền Thủy Quân', 'Xích Lân Độc Mộc Tiên Phong', 'Khinh Binh Phóng Hỏa'],
    weatherAndWaterCondition: 'Thích hợp mặt sông rộng từ ba trăm trượng trở lên, nước sâu, gió mùa thổi theo hướng có lợi.',
    fatalMistakes: [
      'Bị địch dùng thuyền cảm tử xuôi gió phóng hỏa khi chưa kịp tháo chốt xích liên kết.',
      'Hai bên bờ núi bị địch chiếm lĩnh dùng máy bắn đá tảng từ trên cao đập nát nóc hạm đội.'
    ],
    narrativeBattleExcerpt: `Mặt nước Trường Giang sóng cuộn đỏ ngầu dưới ánh tà dương. Tiêu Cảnh đứng trên kỳ hạm Cửu Long, chiếc áo bào đen phần phật theo gió lộng. Chàng rút kiếm lệnh chém mạnh vào không trung: "Bày Giao Long Xuất Hải Trận! Thả chốt xích, nổi trống lôi thần!"

Tức thì, ba mươi cỗ Lâu Thuyền khổng lồ như những tòa thành trì nổi rầm rầm khóa ngàm sắt vào nhau. Đầu thuyền đúc hình rồng đồng há miệng đỏ rực, hàng trăm vòi phun dầu hỏa linh thạch phụt ra tia lửa dài cả trăm trượng, thiêu rụi toàn bộ chiến thuyền gỗ của địch trong tiếng kêu la thấu trời.`
  },
  {
    id: 'amp_form_02_hem_nui_vuc_sau',
    name: 'Hạp Cốc Lạc Thạch • Tuyệt Bích Đoạt Mệnh Trận',
    alias: 'Hẻm Núi Vực Sâu Mai Phục Trận',
    terrainType: 'Hẻm Núi Vực Sâu',
    symbol: '🧗‍♂️🪨',
    diagramText: `
  [VÁCH ĐỨNG BỜ TẢ: 300 Trượng]              [VÁCH ĐỨNG BỜ HỮU: 300 Trượng]
   │ 🪨 Thợ Đá Cạy Tảng Lớn │                │ 🪨 Đá Lăn & Cây Gỗ Ngàn Năm│
   │ 🏹 Cung Nỏ Ngắm Thẳng  │                │ 🕳️ Thùng Dầu Hỏa Đợi Lệnh  │
   └───────────┬────────────┘                └───────────┬────────────────┘
               │           [VỰC SÂU THĂM THẲM]            │
               ▼                                         ▼
      ~~~~~~~~~~~~~~~~~~ DÒNG SÔNG HẸP NƯỚC XIẾT ~~~~~~~~~~~~~~~~~~
               ►►► ĐOÀN QUÂN ĐỊCH BỊ BỊT HAI ĐẦU HẺM NÚI ◄◄◄
    `,
    corePhilosophy: 'Dụ địch vào hẻm núi vực sâu kẹp giữa hai vách đá dựng đứng ngàn trượng có dòng sông siết chảy qua. Bịt kín hai đầu hẻm bằng đá sập và thân cây gỗ, sau đó từ trên đỉnh vách đá xả mưa tên, đá tảng và dầu sôi xuống tiêu diệt toàn bộ sinh lực địch.',
    tacticalPrinciples: [
      'Cấm tuyệt đối không phát ra tiếng động, khói bếp trên đỉnh vách núi trước giờ phục kích.',
      'Phải đo đạc chuẩn xác khúc hẹp nhất của hẻm vực để đặt điểm chặn đầu và khóa đuôi.',
      'Dưới đáy vực phải cắt đứt mọi lối leo trèo bằng cách gọt nhẵn vách đá và bôi mỡ trơn.'
    ],
    formationMovement: {
      advance: 'Không chủ động tiến quân; dùng một toán quân nhỏ vờ thua bỏ chạy nhử đại quân địch lọt thỏm vào lòng hẻm.',
      retreat: 'Không có đường lui cho địch; quân ta trên đỉnh vách đá cố thủ vững chắc bằng khiên sắt.',
      flanking: 'Đội trèo vách núi (Sơn Nhai Binh) đu dây luồn qua sau lưng các chòi canh địch cắt đứt tiếp ứng.',
      ambushTrigger: 'Khi soái kỳ địch đi qua cột mốc tảng đá hình đầu voi, người chỉ huy trên vách núi đẩy tảng đá hoa tiêu rơi xuống nước.'
    },
    signalCommands: {
      waterHorn: 'Một tiếng tù và ngắn từ khe núi: Chuẩn bị châm ngòi đá sập.',
      coloredSmoke: 'Không dùng khói (tránh lộ địa điểm mai phục trên vách).',
      mastFlag: 'Lá cờ đen vẫy mạnh ba lần trên mỏm đá cao nhất: Toàn bộ đá tảng trút xuống!',
      flameBeacon: 'Bắn một mũi tên lửa cắm thẳng vào thuyền giữa dòng: Đồng loạt xả tiễn.'
    },
    troopSynergy: ['Sơn Nhai Khinh Binh', 'Mãng Lâm Thiện Xạ', 'Công Binh Nổ Mìn Cơ Quan'],
    weatherAndWaterCondition: 'Thời điểm trời sương mù dày đặc che khuất đỉnh núi hoặc lúc chập tối chạng vạng.',
    fatalMistakes: [
      'Chặn đầu quá sớm khi trung quân địch chưa vào hết hẻm núi, khiến hậu quân địch kịp quay đầu chạy thoát.',
      'Bị trinh sát địch phát hiện dây thừng và giàn giáo gài đá trên đỉnh vách núi.'
    ],
    narrativeBattleExcerpt: `Hẻm Quỷ Cốc sâu nghìn trượng, dòng Hắc Thủy bên dưới gầm thét như dã thú đói mồi. Quân tiên phong của Vấn Tiên Tông ngạo nghễ lướt thuyền qua khúc quanh hẹp nhất, đinh ninh địa thế này không ai có thể đuổi kịp.

Bỗng nhiên, một tiếng nổ long trời lở đất vang lên trên vách đá mờ sương. Tảng đá hoa tiêu nặng vạn cân rớt thẳng xuống, đè nát chiếc thuyền dẫn đầu tóe nước ngập trời. Tiếp đó, từ hai bên bờ vách đứng sừng sững, hàng ngàn tảng đá tẩm hỏa dược, thân gỗ gai khổng lồ ào ào lao xuống như mưa thiên thạch, chôn vùi toàn bộ hạm đội địch dưới đáy vực thẳm.`
  },
  {
    id: 'amp_form_03_thuy_kich_quyet_de',
    name: 'Thất Tinh Đoạn Lưu • Thủy Kích Quyết Đê Trận',
    alias: 'Thủy Công Cuồng Lũ Phá Địch Trận',
    terrainType: 'Ghềnh Thác Thượng Nguồn',
    symbol: '🌊⚡',
    diagramText: `
  [THƯỢNG DU: Đập Đất Cát Đắp Chặn Dòng Tích Lũy Nước Lũ]
         ║║║║║║ (Nước dâng cao 5 trượng trong 3 ngày) ║║║║║║
         ═════════════ ĐẬP CƠ QUAN PHÁ CHỐT ═════════════
                            │ (Mở chốt)
                            ▼
    ~~~~~~~~~~~~~~~~ CƠN LŨ BẠC ĐẦU QUÉT SẠCH ~~~~~~~~~~~~~~~~
                            ▼
       [HẠ DU: Vùng Sông Cạn Khô Khiến Địch Chủ Quan Cắm Trại]
       [             Đoàn Quân Địch Bị Cuốn Trôi            ]
    `,
    corePhilosophy: 'Thuận theo đạo của nước. Ở thượng nguồn hẹp đắp bao cát thân cây ngăn dòng tạo hồ chứa khổng lồ. Nhử địch đóng trại hoặc băng qua lòng sông cạn kiệt ở hạ du, đến giờ Tý rút then cơ quan phá đập xả lũ cuốn phăng trăm vạn hùng binh.',
    tacticalPrinciples: [
      'Phải tính toán thời gian dòng nước lũ chảy từ thượng du xuống hạ du chuẩn xác đến từng tuần nhang.',
      'Phải có trinh sát bí mật theo dõi trại địch ven sông, báo hiệu bằng gương phản chiếu ánh trăng.',
      'Quân ta phải rút toàn bộ lên các đồi đất cao ráo, đóng sẵn thuyền bè để chèo ra bắt sống tàn binh trôi dạt.'
    ],
    formationMovement: {
      advance: 'Chỉ triển khai thuyền nhẹ cứu hộ và lượm bắt chiến lợi phẩm sau khi cơn lũ đã quét qua.',
      retreat: 'Không áp dụng; nếu đập vỡ sớm phải lập tức phát pháo hiệu báo toàn quân chạy lên núi.',
      flanking: 'Kỵ binh nhẹ mai phục sẵn trên hai bên bờ cao, đón đầu những toán địch sống sót bò lên bờ.',
      ambushTrigger: 'Đoàn quân địch qua được nửa sông, xe lương lún lầy kêu réo om sòm.'
    },
    signalCommands: {
      waterHorn: 'Tiếng tù và bằng sừng trâu cổ vang rền 1 hồi dài: Rút then cơ quan xả đập!',
      coloredSmoke: 'Khói vàng bay lên đỉnh đồi: Toàn quân lui lên gò cao tránh lũ.',
      mastFlag: 'Cờ tam giác viền sóng nước phất dọc: Chuẩn bị thuyền cứu hộ bắt sống tù binh.',
      flameBeacon: 'Đốt 3 đống lửa thành hình tam giác nơi gò đất: Điểm tập kết an toàn.'
    },
    troopSynergy: ['Cơ Quan Thằng Kiều Công Binh', 'Thao Thiết Lâu Thuyền Thủy Quân', 'Kỵ Binh Đón Bắt'],
    weatherAndWaterCondition: 'Mùa mưa lũ thượng nguồn hoặc sau những cơn mưa dầm dề nhiều ngày ở đầu nguồn con suối.',
    fatalMistakes: [
      'Đập đất đắp không chắc chắn, bị vỡ non khi đại quân địch chưa vào bẫy làm phản tác dụng dìm chính quân mình.',
      'Gặp đợt hạn hán bất ngờ, lượng nước tích tụ không đủ sức cuốn trôi thuyền chiến kiên cố của đối phương.'
    ],
    narrativeBattleExcerpt: `Màn đêm buông xuống trên bãi bồi sông Xích Thủy. Quân tướng địch thấy khúc sông cạn trơ đáy cát, mừng rỡ hạ lệnh vạn thiết kỵ lội nước qua sông trong đêm để tập kích kinh thành.

Đúng lúc nửa số quân địch đang bì bõm giữa bùn lầy, từ phía thượng nguồn bỗng truyền đến tiếng ầm ầm như vạn thớt voi gầm thét xé rách màn đêm. 

"Nước lũ! Nước lũ từ đâu tràn về thế này?!" Tướng giặc tái mặt hét lên.

Chưa kịp dứt lời, một bức tường nước cao ba trượng trắng xóa cuồn cuộn gầm thét ập tới, nghiền nát chiến mã, cuốn phăng hàng ngũ thiết giáp như lá rụng mùa thu. Trên ngọn đồi cao, Tiêu Cảnh lặng lẽ nhìn dòng nước bạc cuốn sạch quân thù, tay áo bay lộng giữa trời giông gió.`
  },
  {
    id: 'amp_form_04_mang_lam_doc_vu',
    name: 'Thủy Mộc Song Sát • Mãng Lâm Độc Vụ Trận',
    alias: 'Rừng Rậm Đầm Lầy Sương Mù Bẫy Trận',
    terrainType: 'Sơn Lâm Đầm Lầy',
    symbol: '🌲☠️',
    diagramText: `
  [RỪNG NGUYÊN SINH NGẬP NƯỚC: Cây Đước Cổ Thụ, Dây Leo Chằng Chịt]
     │ 🏹 Thiện Xạ Trốn Trên Tàng Cây Cổ Thụ (Ngậm Tên Tẩm Độc)   │
     │ 🌿 Dưới Nước Cắm Chông Ngầm Tẩm Độc Đầm Lầy             │
     │ 🌫️ Sương Mù Độc Khí Do Hoa Đầm Lầy Thở Ra Ban Mai       │
     └─────────────────────────┬───────────────────────────────┘
                               ▼
        ~~~~~~~~~~~~~~~~~ ĐẦM NƯỚC BÙN LẦY ~~~~~~~~~~~~~~~~~
     ◄◄◄ Thuyền Giặc Mắc Cạn Vào Rễ Cây, Lính Nhảy Xuống Lún Đến Bẹn ►►►
    `,
    corePhilosophy: 'Tận dụng địa hình rừng rậm ngập nước nguyên sinh, sương mù có chứa chướng khí tự nhiên. Địch bước vào sẽ mất phương hướng, thuyền vướng rễ cây ngầm, lính rơi xuống bùn lầy lún sâu, sau đó bị xạ thủ bắn tên độc tỉa từng tên.',
    tacticalPrinciples: [
      'Toàn quân ta phải uống thuốc giải chướng khí luyện từ rễ cây ô đầu và cỏ thanh tâm trước khi vào trận.',
      'Dẫn đường bằng dây thừng mây chìm dưới nước, lính nắm dây mà di chuyển, địch không biết sẽ sa vào đầm lún.',
      'Không dùng đuốc hay lửa lớn tránh bén khí mê-tan dưới đầm lầy phát nổ ngoài ý muốn.'
    ],
    formationMovement: {
      advance: 'Di chuyển bằng thuyền độc mộc đáy phẳng không phát ra tiếng động, luồn lách qua các hốc rễ cây.',
      retreat: 'Tản mát vào sương mù dày đặc; mỗi nhánh quân chỉ cần trèo lên tán cây là biến mất hoàn toàn.',
      flanking: 'Đội thiện xạ thoắt ẩn thoắt hiện nhảy chuyền từ cành cây này sang cành cây khác bao vây bốn phía.',
      ambushTrigger: 'Khi quân địch lạc đường kêu la hỗn loạn, thuyền đi đầu va phải rễ cây cổ thụ có treo chuông đồng ngầm.'
    },
    signalCommands: {
      waterHorn: 'Thổi ống tiêu giả tiếng chim bìm bịp kêu ba tiếng ngắn: Khép vòng vây.',
      coloredSmoke: 'Bắn pháo sương mù xanh lục: Thả độc phấn hoa bách độc xuôi theo chiều gió.',
      mastFlag: 'Rung cành cây có buộc dải vải đỏ: Lệnh cho các xạ thủ đồng loạt bắn xuyên táo.',
      flameBeacon: 'Không dùng lửa.'
    },
    troopSynergy: ['Mãng Lâm Thiện Xạ', 'Xích Lân Độc Mộc Tiên Phong', 'Thủy Quỷ Đoạt Hạm'],
    weatherAndWaterCondition: 'Buổi sáng sớm khi chướng khí đầm lầy bốc lên dày đặc nhất, tầm nhìn dưới năm bước chân.',
    fatalMistakes: [
      'Gặp gió lớn thổi tan sương mù làm lộ vị trí các xạ thủ mai phục trên cây.',
      'Địch mang theo gương đồng chiếu yêu hoặc pháp bảo gió lốc thổi bạt độc vụ.'
    ],
    narrativeBattleExcerpt: `Sương mù xanh nhờ nhợ bao phủ khu rừng đước ngàn năm tĩnh mịch như cõi âm ty. Binh lính tông môn bì bõm lội nước, bùn đen ngập đến đầu gối, mỗi bước nhấc chân nặng như chì.

"Soái... soái hạm không nhúc nhích được nữa, chân vịt vướng chặt vào rễ cây ngầm rồi!" Một tên lính hoảng hốt kêu lên.

Đúng lúc đó, từ trên vòm lá rậm rạp cao ba chục trượng, một tiếng chim bìm bịp rùng rợn vang lên. Hàng trăm mũi nỏ ngắn màu đen tuyền xé toạc màn sương rơi xuống. Mũi tên tẩm nọc rắn lục chỉ cần sượt qua da thịt liền khiến đối phương sùi bọt mép ngã quỵ xuống đầm bùn, không kịp kêu một tiếng nào.`
  },
  {
    id: 'amp_form_05_phi_thang_doat_hap',
    name: 'Bát Nhai Phục Kỵ • Phi Thằng Vượt Vực Trận',
    alias: 'Hẻm Vực Sâu Cáp Treo Thần Binh Kích',
    terrainType: 'Hẻm Núi Vực Sâu',
    symbol: '⛓️🦅',
    diagramText: `
  [ĐỈNH NÚI TẢ] ••••• CÁP SẮT CĂNG NGANG VỰC SÂU 500 TRƯỢNG ••••• [ĐỈNH NÚI HỮU]
       │                          │                          │
       ▼                          ▼                          ▼
  [Binh Sĩ Đu Ròng Rọc]   [Thả Thùng Đựng Hỏa Khí]    [Xạ Thủ Treo Dây Bắn Tỉa]
       │                          │                          │
       ▼                          ▼                          ▼
  ~~~~~~~~~~~~~~~~~~~~ ĐÁY VỰC: TRẠI ĐỊCH AN TỌA CHỦ QUAN ~~~~~~~~~~~~~~~~~~~~
    `,
    corePhilosophy: 'Tận dụng hẻm vực sâu thăm thẳm ngỡ như chim trời không bay lọt. Quân ta dùng nỏ thần bắn dây cáp sắt bọc da bò căng ngang hai vách núi, ban đêm lính đu ròng rọc bay qua khoảng không lơ lửng, thả hỏa cầu và nhảy dù rơi thẳng vào trung tâm trướng địch.',
    tacticalPrinciples: [
      'Cáp sắt phải được bọc vải nỉ tẩm dầu cá để khi ròng rọc trượt qua không phát ra tiếng rít kim loại.',
      'Lính đổ bộ bằng dây cáp phải là những tay leo núi thượng thặng, chân mang đinh thép, dao găm ngậm miệng.',
      'Khi đổ bộ xuống phải lập tức phóng hỏa kho lương và chuồng chiến thú để tạo cảnh hỗn loạn cực độ.'
    ],
    formationMovement: {
      advance: 'Trượt cáp đồng loạt từ đỉnh núi cao xuống đỉnh núi thấp, lơ lửng giữa lưng chừng trời đổ bộ.',
      retreat: 'Sử dụng ròng rọc kéo ngược bằng sức tời ngầm hoặc tản vào các hang động ngầm khoét trong lòng vách đá.',
      flanking: 'Một cánh quân leo dây rủ thẳng đứng từ trên trời rơi xuống nóc lều soái trướng đối phương.',
      ambushTrigger: 'Đúng canh ba lúc địch say ngủ, tín hiệu lửa đóm lập lòe bên sườn núi phát hỏa.'
    },
    signalCommands: {
      waterHorn: 'Tiếng tù và giả tiếng đại bàng kêu thét xé màn đêm: Đồng loạt phóng cáp.',
      coloredSmoke: 'Không dùng khói.',
      mastFlag: 'Đèn lồng da dê che ba mặt, để hở một tia sáng xanh về hướng đỉnh đối diện.',
      flameBeacon: 'Một quả cầu lửa rực sáng rơi từ đỉnh núi xuống đáy vực: Tổng tiến công!'
    },
    troopSynergy: ['Sơn Nhai Khinh Binh', 'Cơ Quan Thằng Kiều', 'Mãng Lâm Thiện Xạ'],
    weatherAndWaterCondition: 'Đêm tối không trăng sao, gió nhẹ thổi xuôi theo chiều trượt của dây cáp.',
    fatalMistakes: [
      'Gió núi giật mạnh thổi đứt cáp hoặc làm rung lắc dữ dội khiến binh sĩ rơi xuống vực thẳm vỡ nát.',
      'Lửa cháy làm lộ sợi cáp khiến quân địch dưới đất dùng tiễn lửa bắn cháy điểm neo cáp bên bờ vực.'
    ],
    narrativeBattleExcerpt: `Vực Đoạn Hồn sâu thăm thẳm nghìn trượng, ban đêm gió hú từng cơn rợn người. Quân địch đóng trại dưới đáy thung lũng bằng phẳng, bốn bề vách đá bao quanh, ung dung cho rằng đây là pháo đài tự nhiên bất khả xâm phạm.

Bỗng nhiên trên không trung tĩnh mịch, những bóng đen như loài dơi khổng lồ lướt nhanh vun vút trên sợi cáp sắt căng giữa hai đỉnh núi. Không một tiếng bước chân, không một tiếng động cơ. 

"Vù! Vù!" 

Hàng trăm quả cầu cơ quan chứa đầy linh hỏa rơi chuẩn xác xuống nóc lều tổng hành dinh. Lửa bốc cao ngút trời soi rõ hàng trăm tráng sĩ mình mặc giáp lông thú đang thoăn thoắt trượt dây rơi xuống đất, trường kiếm tuốt khỏi vỏ vung lên ánh lạnh thấu xương.`
  },
  {
    id: 'amp_form_06_quy_boi_thuy_trai',
    name: 'Quy Bối Thủy Trại • Thiết Bích Phù Đồn Trận',
    alias: 'Pháo Đài Nổi Mai Rùa Khóa Sông',
    terrainType: 'Sông Núi Đan Xen',
    symbol: '🐢🛡️',
    diagramText: `
  [BỜ BẮC: Núi Đá Dựng Đứng]                         [BỜ NAM: Rừng Già Âm U]
            \\                                                /
    ═════════ ĐỒN NỔI MAI RÙA (3 TẦNG KHIÊN SẮT GHÉP MỘNG) ═════════
    │  [Tầng 1: Đáy Thuyền Bọc Sắt Chống Thợ Lặn Khoan Đáy]         │
    │  [Tầng 2: Cửa Châu Mai Cho 300 Cung Nỏ Bắn Ngang Mặt Nước]     │
    │  [Tầng 3: Tháp Bắn Đá & Máy Bắn Pháo Hỏa Tiễn Toàn Cảnh]       │
    ═════════════════════════════════════════════════════════════════
          ~~~~~~~~ DÒNG SÔNG BỊ CHẶN ĐỨNG HOÀN TOÀN ~~~~~~~~
    `,
    corePhilosophy: 'Đóng đại doanh trại nổi ghép mộng hình mai rùa kiên cố ngay tại khúc quanh hiểm trở giao nhau giữa sông và chân núi. Vỏ ngoài phủ ba lớp sắt và da trâu ướt chống tên lửa, bên trong trang bị nỏ liên hoàn bắn bốn phương tám hướng.',
    tacticalPrinciples: [
      'Đáy đồn nổi phải thả hàng chục quả cầu sắt có gai nhọn (Thiết Tật Lê) xuống đáy sông để ngăn thợ lặn tiếp cận.',
      'Hai đầu đồn nổi nối chặt vào hai mỏm đá bên bờ bằng dây xích ngầm đường kính nửa thước.',
      'Dự trữ đủ lương thực, nước ngọt và tên nỏ trên đồn nổi đủ tác chiến độc lập trong ba tháng ròng.'
    ],
    formationMovement: {
      advance: 'Là thế trận phòng ngự cố định chặn sông; khi cần tấn công sẽ mở cửa sập phóng các xuồng nhỏ lao ra truy quét.',
      retreat: 'Không lùi; nếu bị áp đảo sẽ giật chốt tự hủy làm chìm chiến đồn chặn kín luồng lạch làm tắc nghẽn sông vĩnh viễn.',
      flanking: 'Phối hợp với các ụ pháo đặt giấu trong các hang đá hai bên sườn núi bắn tạt sườn thuyền địch.',
      ambushTrigger: 'Khi hạm đội địch liều mạng lao vào đâm húc mai rùa sắt.'
    },
    signalCommands: {
      waterHorn: 'Ba tiếng tù và đồng vang dội: Toàn bộ cửa châu mai mở toang, phóng tiễn!',
      coloredSmoke: 'Khói trắng bay lên từ tháp chỉ huy: Bổ sung hỏa dược cho các tầng dưới.',
      mastFlag: 'Lá cờ thêu hình Huyền Vũ màu đen cắm trên nóc tháp: Thế trận bất khả xâm phạm.',
      flameBeacon: 'Đèn lồng đỏ treo ở cửa cống: Mở cổng ngầm cho thủy quỷ xuất kích.'
    },
    troopSynergy: ['Thao Thiết Lâu Thuyền Thủy Quân', 'Bộ Binh Nỏ Cơ Quan', 'Thủy Quỷ Đoạt Hạm'],
    weatherAndWaterCondition: 'Mọi thời tiết; đặc biệt kiên cố trước mưa bão, sóng lớn và thủy triều dâng cao.',
    fatalMistakes: [
      'Không kiểm tra độ mài mòn của xích neo đá bên bờ, bị lũ cuốn trôi đồn nổi dạt vào bãi cạn.',
      'Bị địch dùng thợ lặn thả thuốc nổ công phá mộng ghép dưới nước khi sơ hở.'
    ],
    narrativeBattleExcerpt: `Tại ngã ba sông Hắc Long, nơi dòng nước rẽ vào khe núi hiểm trở, một pháo đài nổi màu đen sừng sững án ngữ mặt nước như một con cự thú mai rùa thời thượng cổ. Hàng chục chiến hạm của quân phiến loạn lao tới với tốc độ kinh hoàng, định dùng mũi nhọn bọc thép đâm thủng trại nổi.

"KENG! XOẢNG!"

Mũi chiến hạm địch vỡ vụn khi va phải lớp vỏ sắt dày ba tấc của mai rùa. Liền sau đó, hàng trăm tấm cửa sắt hai bên thân đồn nổi đồng loạt mở toang. Hàng ngàn mũi tên nỏ xé gió bay ra đan thành lưới thép dày đặc, biến mặt sông thành một lò sát sinh rực lửa.`
  },
  {
    id: 'amp_form_07_chu_tuoc_lieu_nguyen',
    name: 'Chu Tước Liêu Nguyên • Giang Diện Hỏa Công Trận',
    alias: 'Thủy Thượng Hỏa Thuyền Phá Doanh Trận',
    terrainType: 'Sông Lớn Thủy Vực',
    symbol: '🔥🦅',
    diagramText: `
  [HƯỚNG GIÓ MÙA THỔI MẠNH XUÔI DÒNG SÔNG] ════════════════════════►►►
         ┌────────────────────────────────────────────────────────┐
         │ [50 Chiếc Thuyền Nhẹ Chở Đầy Cỏ Khô Tẩm Linh Dầu Rắn]   │
         │          (Mũi thuyền cắm đinh móc câu bám dính)        │
         │                         ▼                              │
         │ [Lính Châm Lửa Rồi Nhảy Xuống Nước Bơi Về Sau]         │
         │                         ▼                              │
         │  ~~~~~~~~ BIỂN LỬA CUỒN CUỘN LAO VÀO THỦY TRẠI ĐỊCH ~  │
         └────────────────────────────────────────────────────────┘
    `,
    corePhilosophy: 'Lợi dụng thời tiết gió mùa đông bắc hoặc gió xuôi dòng cực mạnh. Chuẩn bị hàng chục thuyền nhẹ chở đầy rơm rạ khô tẩm mỡ trăn và linh thạch hỏa hệ. Thuyền lao vào trại giặc cắm móc câu sắt giữ chặt thân tàu địch rồi bốc cháy ngút trời.',
    tacticalPrinciples: [
      'Phải xem thiên văn, bấm chuẩn giờ hướng gió đổi chiều tuyệt đối không được sơ suất.',
      'Mũi thuyền hỏa công phải rèn những ngạnh sắt nhọn hoắt chĩa ra ngoài, khi húc vào thuyền địch sẽ găm chặt không thể gỡ ra.',
      'Quân nhảy dù và thuyền phóng hỏa phải có thuyền độc mộc nhỏ theo sau để vớt người kịp thời.'
    ],
    formationMovement: {
      advance: 'Thuyền hỏa công căng hết buồm xuôi gió lao đi như tên bắn, dàn hàng ngang bao trùm toàn bộ mặt sông.',
      retreat: 'Người chèo lái châm ngòi hỏa pháo rồi nhảy xuống nước có phao da dê bơi về phía sau hội quân.',
      flanking: 'Chiến hạm chủ lực đi sau cánh lửa mười trượng, nã đạn pháo bắn vào những kẻ đang nhảy sông trốn cháy.',
      ambushTrigger: 'Khi gió giật cấp tám thổi thẳng vào cửa trại nổi của đối phương.'
    },
    signalCommands: {
      waterHorn: 'Tiếng tù và xé tai rít lên: Châm ngòi hỏa thiêu toàn bộ mặt sông!',
      coloredSmoke: 'Khói đen mù mịt bốc cao: Địch đã cháy rụi, tam quân tiến kích.',
      mastFlag: 'Kéo lá cờ Chu Tước đỏ thắm lên đỉnh cột buồm.',
      flameBeacon: 'Bắn 7 mũi tên lửa liên hoàn lên trời báo hiệu bắt đầu phóng hỏa.'
    },
    troopSynergy: ['Khinh Chu Tiên Phong', 'Thao Thiết Lâu Thuyền Thủy Quân', 'Xạ Thủ Bắn Tiễn Lửa'],
    weatherAndWaterCondition: 'Gió mùa thổi mạnh cấp sáu trở lên, nước sông chảy xiết xuôi về phía căn cứ đối phương.',
    fatalMistakes: [
      'Gió đột ngột đổi chiều ngược lại thiêu rụi chính hạm đội nhà.',
      'Bị địch dùng thuyền bọc sắt đẩy dạt thuyền hỏa công dạt vào bờ lau sậy trống trải.'
    ],
    narrativeBattleExcerpt: `Gió mùa Đông Bắc rít gào từng cơn như tiếng ma khóc qua mặt nước Đầm Vân Mộng. Thủy trại của liên minh tông môn kéo dài mười dặm, chiến thuyền san sát nhau kết thành lũy nổi.

Đột nhiên từ thượng nguồn, năm mươi bóng thuyền lướt điên cuồng theo ngọn gió bão. Đến khi chỉ còn cách trăm bước, những người lái thuyền đồng loạt châm đuốc ném vào khoang rơm tẩm dầu rồi phóng mình xuống nước.

"OÀNH!"

Năm mươi cột lửa đỏ rực bốc cao hàng chục trượng, biến thành năm mươi con rồng lửa xé toạc màn đêm. Những chiếc móc câu sắt cắm phập vào vỏ thuyền địch giữ chặt không buông. Trong chốc lát, mười dặm thủy trại biến thành một biển lửa thiêu rụi trời đất, tiếng kêu khóc vang dội cả vùng giang sơn hiểm trở.`
  },
  {
    id: 'amp_form_08_u_minh_tiem_thuy',
    name: 'U Minh Tiềm Thủy • Thủy Quỷ Đoạt Hạm Trận',
    alias: 'Đáy Nước Phục Kích Đục Thuyền Đoạt Soái Trận',
    terrainType: 'Sông Núi Đan Xen',
    symbol: '🔱🤿',
    diagramText: `
  [MẶT NƯỚC: Sương Mù Dày Đặc, Hạm Đội Địch Không Thấy Động Tĩnh]
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  [DƯỚI ĐÁY SÔNG: 500 Dũng Sĩ Thủy Quỷ Ngậm Ống Sậy, Mình Bôi Dầu Rái Cá]
        │              │                 │                │
     [Khoan Sắt]  [Cắt Dây Neo]   [Cắm Phù Nổ Hẹn Giờ]  [Phóng Phi Tiêu]
        │              │                 │                │
        ▼              ▼                 ▼                ▼
     ◄◄◄ Thuyền Địch Lủng Đáy Nước Tràn Vào, Trôi Dạt Tự Va Nhau Vỡ Nát ►►►
    `,
    corePhilosophy: 'Đưa đội quân thủy quỷ lặn sâu dưới đáy nước, ngậm ống sậy rỗng để thở, mình bôi dầu rái cá chống rét buốt. Nhân lúc đêm tối hoặc sương mù dày đặc lặn tiếp cận hạm đội địch, đục thủng đáy thuyền, cắt đứt dây mỏ neo khiến tàu địch va vào nhau chìm nghỉm.',
    tacticalPrinciples: [
      'Mỗi thủy quỷ phải mang theo dùi sắt ba cạnh và búa gỗ có bọc da để gõ không phát ra tiếng kim loại dội vang.',
      'Cắt dây mỏ neo theo thứ tự thuyền thượng lưu trước để thuyền tự trôi xuôi dòng đâm vào các thuyền phía sau.',
      'Trên bờ phải có người gõ nhịp mõ tre giả tiếng gõ mạn thuyền đánh cá để định hướng cho người dưới nước bơi về.'
    ],
    formationMovement: {
      advance: 'Bơi lặn ngầm theo đội hình bậc thang dưới đáy sông, tuyệt đối không nổi đầu lên khỏi mặt nước.',
      retreat: 'Men theo rong rêu và các hốc đá ngầm ven bờ lủi vào các bụi lau rậm rạp.',
      flanking: 'Một toán nhỏ trèo lên dây bánh lái bò lên boong tàu ám sát hoa tiêu và tướng giữ cờ lệnh.',
      ambushTrigger: 'Khi tiếng mõ tre đổi nhịp gõ từ chậm sang liên hồi ba tiếng một nhịp.'
    },
    signalCommands: {
      waterHorn: 'Gõ ba tiếng vào mạn thuyền dưới đáy nước (sóng âm truyền trong nước cực xa).',
      coloredSmoke: 'Không dùng khói.',
      mastFlag: 'Thả phao gỗ sơn dạ quang màu xanh lục nổi lập lờ trên mặt nước làm mốc tụ quân.',
      flameBeacon: 'Không dùng lửa.'
    },
    troopSynergy: ['Thủy Quỷ Đoạt Hạm', 'Xích Lân Độc Mộc Tiên Phong'],
    weatherAndWaterCondition: 'Đêm tối có sương mù giăng kín hoặc lúc trời đổ mưa dầm, mặt nước gợn sóng che giấu bọt thở.',
    fatalMistakes: [
      'Địch thả dầu cay hoặc vôi sống xuống lòng sông làm mù mắt và nghẹt thở toàn bộ thủy quỷ.',
      'Nước sông quá trong và cạn khiến bóng người dưới đáy nước bị lính gác trên boong phát hiện.'
    ],
    narrativeBattleExcerpt: `Mặt nước phẳng lặng như tờ, chỉ có màn sương lạnh buốt bao trùm hạm đội mười vạn quân Tiên Môn đang thả neo giữa dòng. Trên boong tàu, lính canh tựa giáo ngáp dài, không hề hay biết dưới đáy sông sâu thẳm, năm trăm bóng đen đang thoăn thoắt lướt đi như những con rái cá khổng lồ.

Họ áp sát đáy những chiếc chiến hạm to lớn nhất. Dùi sắt ba cạnh xoay tít, nhẹ nhàng khoét sâu vào những thớ gỗ ngâm nước. 

"Rắc... rắc... roạt!"

Nước sông lạnh buốt như tên bắn ùa vào khoang chứa hàng ngàn hòm tên nỏ. Cùng lúc đó, những chiếc rìu bén ngót vung lên chặt đứt phăng dây thừng mỏ neo to bằng bắp chân. Không còn neo giữ, chiếc soái hạm trôi dạt vô định rồi đâm sầm vào chiến thuyền hộ vệ bên cạnh trong sự kinh hoàng tột độ của tướng sĩ địch.`
  },
  {
    id: 'amp_form_09_thien_cuong_toa_long',
    name: 'Thiên Cương Tỏa Long • Giang Khẩu Thiết Sách Trận',
    alias: 'Xích Sắt Ngầm Khóa Cửa Sông Cắt Hậu Vận Trận',
    terrainType: 'Sông Núi Đan Xen',
    symbol: '⛓️🔒',
    diagramText: `
  [VÁCH ĐÁ TẢ NGẠN: Ròng Rọc Khổng Lồ]          [VÁCH ĐÁ HỮU NGẠN: Trục Tời Cơ Quan]
            \\                                                /
    ═════════ DÂY XÍCH SẮT NGẦM CHÌM DƯỚI ĐÁY SÔNG 5 THƯỚC ═════════
          [Khi Hạm Đội Địch Đi Qua Nửa Quân -> Quay Trục Tời]
                            ▼
    ═════════ XÍCH SẮT KÉO CĂNG LÊN KHỎI MẶT NƯỚC 3 THƯỚC ═════════
         ◄◄◄ TÀU ĐỊCH BỊ BẬT NGỬA HOẶC VỠ ĐÔI MẠN THUYỀN ►►►
    `,
    corePhilosophy: 'Đúc xích sắt khổng lồ mắt xích to như vòng tay người lớn chìm ngầm dưới đáy sông ở cửa ngõ hiểm yếu. Khi tàu địch đi qua, hai bên vách đá cho trâu và máy tời cơ quan kéo căng xích lên khỏi mặt nước, nhấc bổng lật úp hoặc chẻ đôi chiến thuyền địch.',
    tacticalPrinciples: [
      'Xích sắt phải được thả chìm dưới nước có phao chìm định vị, ngày thường thuyền đánh cá đi qua không hề vướng.',
      'Hai đầu xích phải đóng cọc sắt sâu vào vách đá hoa cương ngàn năm, gia cố bằng chì nóng chảy đúc liền khối.',
      'Sau khi xích kéo lên khóa chặt lối thoát, hỏa lực từ hai bên bờ lập tức bắn dập đầu đối phương.'
    ],
    formationMovement: {
      advance: 'Phục kích tại chỗ; lùa đàn thuyền nhỏ nhử địch đuổi theo vượt qua vị trí xích ngầm.',
      retreat: 'Hạ xích ngầm cho thuyền ta rút lui an toàn, sau đó kéo căng xích lại chặn đứng quân địch truy kích.',
      flanking: 'Bố trí hai đội quân cơ quan trên đỉnh núi hai bên bảo vệ trục tời xích sắt không bị địch cướp phá.',
      ambushTrigger: 'Thuyền trung quân của tướng giặc vượt qua khỏi vạch xích đúng mười trượng.'
    },
    signalCommands: {
      waterHorn: 'Tù và sừng tê giác vang lên một tràng dài xé toạc mây mù: Quay trục tời kéo xích!',
      coloredSmoke: 'Khói tím tỏa ra từ mỏm đá tả ngạn: Xích đã kéo căng, toàn quân tấn công.',
      mastFlag: 'Lá cờ thêu xích sắt vàng rực giương cao.',
      flameBeacon: 'Đốt đuốc sáng rực dọc theo hai bờ sông soi rõ mặt nước.'
    },
    troopSynergy: ['Cơ Quan Thằng Kiều', 'Bộ Binh Trọng Giáp Giữ Cọc', 'Mãng Lâm Thiện Xạ'],
    weatherAndWaterCondition: 'Địa hình khúc sông hẹp có hai bên là vách đá dựng đứng, nước chảy xiết.',
    fatalMistakes: [
      'Xích kéo lên quá sớm khiến hạm đội địch kịp dừng lại quay đầu tháo chạy.',
      'Trục tời bị kẹt gãy do lực cản quá lớn từ tàu bọc thép hạng nặng của địch lao tới với tốc độ cao.'
    ],
    narrativeBattleExcerpt: `Khúc ải Bạch Đằng Thủy Môn gió rít từng hồi. Mười chiếc thuyền chiến bọc thép của phản quân lướt đi ngạo nghễ, tướng địch cười lớn: "Chân trời góc biển này, ai dám cản bước đường của bản tọa!"

Lời vừa dứt, từ sâu thẳm dưới lòng sông bỗng vang lên tiếng xích sắt ma sát nghiến rợn người. 

"RẦM! RẮC!"

Một sợi xích sắt to bằng thân cây cổ thụ từ từ nhô lên khỏi mặt nước, kéo căng như dây cung thần. Chiếc thuyền bọc thép đi đầu đang lao nhanh với vận tốc kinh hồn va phải xích sắt, phần mũi tàu lập tức bị nhấc bổng lên không trung rồi lật ngửa đập xuống nước vỡ tan tành. Những chiếc phía sau không kịp hãm đà, xô vào nhau vỡ nát thành từng mảnh vụn trôi lững lờ trên mặt sông.`
  },
  {
    id: 'amp_form_10_bach_vien_xuyen_nhai',
    name: 'Bạch Viên Xuyên Nhai • Vách Đá Độn Kỵ Trận',
    alias: 'Leo Núi Đu Vách Tập Kích Sau Lưng Địch',
    terrainType: 'Sông Núi Đan Xen',
    symbol: '🐒⛰️',
    diagramText: `
  [VÁCH ĐÁ HOA CƯƠNG DỰNG ĐỨNG 90 ĐỘ CAO 400 TRƯỢNG]
       ▲
       │ [Chiến Binh Đeo Vuốt Sắt, Ngậm Đao Nhẹ Nhàng Bám Đá Leo Lên]
       │ [Khoét Lỗ Đóng Đinh Thép Mở Đường Cho Hậu Quân]
       │
  [ĐỈNH NÚI: HẬU CỨ CỦA ĐỊCH NƠI KHÔNG BỐ TRÍ PHÒNG THỦ VÌ QUÁ DỰNG]
       ▼
  ◄◄◄ Đột Kích Bất Ngờ Từ Vách Sau Bắt Sống Thống Soái Địch ►►►
    `,
    corePhilosophy: 'Chọn vách đá dựng đứng nhất mà đối phương tin rằng "chim trời không đậu nổi, vượn khỉ chịu quay đầu" nên không hề phòng bị. Tuyển chọn cảm tử quân leo vách núi bằng vuốt sắt và dây thừng mây, trèo lên đỉnh núi đánh úp sau lưng trướng địch.',
    tacticalPrinciples: [
      'Mỗi người lính leo núi chỉ mang theo vũ khí ngắn, thuốc nổ nhẹ và lương khô đủ ăn trong ba ngày.',
      'Nếu lỡ sẩy chân rơi xuống vực, tuyệt đối cấm không được la hét kinh động đến toàn đội.',
      'Lên đến đỉnh phải chiếm ngay kho phát tín hiệu của địch trước khi mở cổng trại cho đại quân xông vào.'
    ],
    formationMovement: {
      advance: 'Leo vách đá theo hình răng lược so le, người trước đóng đinh thép thả dây cho người sau bám lên.',
      retreat: 'Dùng dây thừng tuột dốc nhanh chóng tụt xuống các kẽ nứt hang đá ẩn nấp.',
      flanking: 'Vòng qua sườn núi hiểm phía sau lưng kho lương hoặc chuồng chiến thú của địch.',
      ambushTrigger: 'Khi cả toán trèo lên đủ trăm người gom lại trước cửa soái trướng.'
    },
    signalCommands: {
      waterHorn: 'Không dùng tù và.',
      coloredSmoke: 'Không dùng khói.',
      mastFlag: 'Vẫy khăn trắng trên mỏm đá ba lần báo hiệu đã chiếm lĩnh đỉnh cao.',
      flameBeacon: 'Châm ba đốm lửa nhỏ che kín lòng bàn tay báo hiệu cho đại quân dưới chân núi tiến công.'
    },
    troopSynergy: ['Sơn Nhai Khinh Binh', 'Mãng Lâm Thiện Xạ'],
    weatherAndWaterCondition: 'Đêm tối có sương mù bám vách đá hoặc ngày trời mưa lâm thâm làm dịu tiếng đóng đinh vào đá.',
    fatalMistakes: [
      'Đá mục bị lở làm tuột dây cả hàng binh sĩ rơi xuống vực sâu.',
      'Bị chó săn hoặc linh thú canh gác của địch đánh hơi thấy mùi mồ hôi trên vách núi.'
    ],
    narrativeBattleExcerpt: `Vách đá Thiên Đao dựng đứng chín mươi độ, trơn nhẵn như bị thần kiếm gọt bằng. Trên đỉnh núi, doanh trại của phe địch canh phòng cẩn mật mặt trước, nhưng mặt sau quay ra vực thẳm thì không có lấy một tên lính gác.

Trong đêm tối đen như mực, ba trăm tráng sĩ mặc giáp da thú đen tuyền như những con vượn rừng thoăn thoắt bám vào từng khe nứt nhỏ nhất của phiến đá hoa cương. Đôi vuốt thép cắm phập vào vách đá không một tiếng động. 

Chỉ sau nửa canh giờ, ba trăm bóng đen đã nhẹ nhàng đáp xuống sau lưng soái trướng. Lưỡi dao găm sắc lẹm kề sát cổ họng tên tướng địch khi hắn vẫn còn đang mải mê thưởng rượu mừng thắng trận.`
  },
  {
    id: 'amp_form_11_thap_dien_son_lam_ha',
    name: 'Tam Thủy Cửu Sơn • Thập Diện Hợp Kích Trận',
    alias: 'Thủy - Sơn - Lâm Ba Mặt Ép Chết Quân Thù Trận',
    terrainType: 'Sông Núi Đan Xen',
    symbol: '🏞️⚔️',
    diagramText: `
         [ĐỈNH NÚI CAO: Bắn Nỏ Liên Châu Ép Xuống Rừng]
                            │
                            ▼
     [RỪNG GIÀ VEN SÔNG: Kỵ Binh Phục Sẵn, Xạ Thủ Bắn Tỉa]
                            │
                            ▼
     ~~~~~~~~~~~~~~~~ DÒNG SÔNG NƯỚC SÂU ~~~~~~~~~~~~~~~~
     [DƯỚI NƯỚC: Hạm Đội Thuyền Chiến Giăng Hàng Ngang Đón Lõng]
    `,
    corePhilosophy: 'Thế trận đại tổng hợp hoàn hảo cho vùng địa hình sông núi xen kẽ rừng rậm. Sơn quân chiếm cao điểm khống chế sườn đồi, Lâm quân ẩn mình trong rừng già xua đuổi địch, Thủy quân phong tỏa dòng sông phía dưới. Ba mặt hợp vây, dồn quân địch vào thế "tiến thoái lưỡng nan, trên trời mưa tên, dưới nước thuyền vây".',
    tacticalPrinciples: [
      'Phải có hệ thống cờ hiệu và khói tín hiệu hiệp đồng chặt chẽ giữa ba lực lượng Thủy - Sơn - Lâm.',
      'Không đánh dồn dập một chỗ mà luân phiên bắn phá: Địch trèo lên núi thì đá lăn xuống, địch chạy vào rừng thì trúng tên độc, địch nhảy xuống sông thì thuyền xông ra chém giết.',
      'Để chừa một lối thoát giả dẫn thẳng vào vùng đầm lầy chết không lối thoát.'
    ],
    formationMovement: {
      advance: 'Thủy - Sơn - Lâm cùng lúc siết chặt vòng vây theo hình trăng khuyết hướng về phía lòng chảo.',
      retreat: 'Sơn quân lùi lên đỉnh hiểm trở, Thủy quân lui ra giữa dòng nước sâu, Lâm quân tản vào bụi rậm.',
      flanking: 'Đội khinh chu lách qua các con lạch nhỏ cắt đứt đường rút lui duy nhất của đối phương.',
      ambushTrigger: 'Địch bị dồn vào bãi bồi giữa khúc quanh sông và chân núi.'
    },
    signalCommands: {
      waterHorn: 'Tiếng tù và phối hợp: Sơn quân thổi tiếng trầm, Thủy quân thổi tiếng bổng hòa nhịp vang dội.',
      coloredSmoke: 'Ba cột khói đỏ - xanh - vàng bốc lên cùng lúc từ ba hướng.',
      mastFlag: 'Soái kỳ ngũ sắc cắm trên đỉnh gò cao nhất lộng gió.',
      flameBeacon: 'Hỏa tiễn bắn hình vòng cung rực sáng bầu trời nối liền từ đỉnh núi xuống mặt sông.'
    },
    troopSynergy: ['Thao Thiết Lâu Thuyền Thủy Quân', 'Sơn Nhai Khinh Binh', 'Mãng Lâm Thiện Xạ', 'Xích Lân Độc Mộc'],
    weatherAndWaterCondition: 'Thời tiết ban ngày trời quang mây tạnh để hiệu lệnh cờ và khói truyền đi thông suốt.',
    fatalMistakes: [
      'Một trong ba cánh quân đến trễ giờ ước hẹn khiến vòng vây bị thủng tạo lối thoát cho địch.',
      'Quân ta tranh giành chiến lợi phẩm giữa bộ binh và thủy quân làm rối loạn đội ngũ.'
    ],
    narrativeBattleExcerpt: `Thung lũng Tam Xuyên bấy giờ biến thành một cái bẫy khổng lồ. Mười vạn tinh binh của địch hốt hoảng nhận ra họ đã lọt thỏm vào trung tâm trận đồ.

Ngước lên đỉnh núi: Hàng ngàn lá cờ Tiên Triều tung bay rợp trời, đá tảng và nỏ cơ quan đã chực sẵn.
Nhìn vào cánh rừng: Tiếng dây cung bật tanh tách trong bóng tối, mũi tên độc bay ra vun vút không ngớt.
Nhìn xuống dòng sông: Trăm chiến thuyền Lâu Thuyền giáp sắt đã xếp hàng ngang khóa chặt lòng sông, nòng đại pháo đen ngòm đồng loạt chĩa thẳng vào họ.

"Hàng thì sống, chống thì chết!" Tiếng thét của Tiêu Cảnh vang vọng từ trên đỉnh núi, dội vào vách đá ngân nga như sấm truyền, khiến vạn quân giặc run rẩy quỳ rạp buông vũ khí xin hàng.`
  },
  {
    id: 'amp_form_12_me_hon_thuy_khon',
    name: 'Cửu Khúc U Lan • Mê Hồn Thủy Khốn Trận',
    alias: 'Sông Mê Lộ Trận • Vạn Lạch Bát Quái Thủy Kê',
    terrainType: 'Sông Nước Đầm Lầy Chằng Chịt',
    symbol: '🌀🧭',
    diagramText: `
  [VÙNG ĐẤT NGẬP NƯỚC: HÀNG TRĂM CON LẠCH NHỎ ĐAN XEN CHỒNG CHÉO]
         ┌────────────────────────────────────────────────────────┐
         │ Lau Sậy Cao Hơn Đầu Người, Che Khuất Mọi Tầm Nhìn      │
         │           ▼                                            │
         │ Cắm Cọc Gỗ Đổi Hướng Dòng Nước Biến Lối Ra Thành Ngõ Cụt│
         │           ▼                                            │
         │ Thuyền Địch Đi Vòng Tròn Suốt Ba Ngày Ba Đêm Cạn Lương │
         │           ▼                                            │
         │ Binh Sĩ Đói Khát Rối Loạn Tự Giẫm Đạp Lên Nhau         │
         └────────────────────────────────────────────────────────┘
    `,
    corePhilosophy: 'Tận dụng vùng hạ lưu sông có hàng trăm con rạch đan xen chằng chịt, lau sậy rậm rạp cao hai trượng che khuất nhật nguyệt. Cắm cọc đá tạo dòng xoáy nhân tạo, tháo dỡ các biển báo tự nhiên khiến la bàn và định vị linh khí mất tác dụng, giam cầm hạm đội địch đến kiệt quệ.',
    tacticalPrinciples: [
      'Mỗi hoa tiêu của quân ta phải thuộc lòng bản đồ thủy mạch 81 nhánh sông như lòng bàn tay.',
      'Cắt cử các tổ nhỏ dùng chiêng đồng và đèn lồng dẫn dụ thuyền địch rẽ vào các nhánh sông cụt có bãi cạn.',
      'Chặn các ngả nước ngọt trong đầm lầy, bỏ rễ cây lá ngón vào các vũng nước ngọt khiến địch trúng độc.'
    ],
    formationMovement: {
      advance: 'Di chuyển bằng xuồng ba lá lướt nhẹ trên mặt bèo tấm, chia cắt từng cụm thuyền địch lẻ loi.',
      retreat: 'Lặn vào rừng lau sậy rậm rạp; chỉ mười bước chân là biến mất không dấu vết.',
      flanking: 'Bao vây từ các lạch nhánh phía sau khi địch đã mắc cạn vào bãi lầy.',
      ambushTrigger: 'Khi thuyền chỉ huy của địch quay lại điểm xuất phát lần thứ ba trong tuyệt vọng.'
    },
    signalCommands: {
      waterHorn: 'Tiếng tù và bằng vỏ ốc bươu thổi ngắt quãng mô phỏng tiếng ếch nhái kêu đêm.',
      coloredSmoke: 'Đốt khói mù bằng cây cỏ mục làm sương giả mịt mù che mất phương hướng sao trời.',
      mastFlag: 'Không dùng cờ (ẩn mình trong lau sậy).',
      flameBeacon: 'Treo đèn lồng xanh lập lòe ở đầu các nhánh sông cụt nhử địch đâm đầu vào.'
    },
    troopSynergy: ['Xích Lân Độc Mộc Tiên Phong', 'Thủy Quỷ Đoạt Hạm', 'Mãng Lâm Thiện Xạ'],
    weatherAndWaterCondition: 'Thời điểm thủy triều rút xuống nhanh để lộ các bãi bồi sình lầy hiểm hóc.',
    fatalMistakes: [
      'Bị địch dùng hỏa lực đốt cháy toàn bộ đầm lau sậy làm tan biến mê hồn trận.',
      'Hoa tiêu của quân ta lạc đường dẫn nhầm đại quân vào bãi cạn của chính mình.'
    ],
    narrativeBattleExcerpt: `Mười vạn thủy binh địch tiến vào Đầm Lạc Hồn đã ba ngày ba đêm. Trước mắt họ chỉ là bạt ngàn lau sậy trắng xóa cao lút đầu người, con lạch nào trông cũng giống hệt nhau. 

Chiếc kim la bàn chỉ phương hướng cứ quay tít mù mịt vì từ trường của mỏ linh thạch dưới đáy đầm. Nước uống đã cạn, lương thực mốc meo, binh lính hoảng loạn nhìn nhau trong tuyệt vọng.

"Chúng ta lại quay về cái cây cổ thụ gãy cành này lần thứ tư rồi!" Tên hoa tiêu địch ôm đầu quỳ sụp xuống sàn thuyền khóc nấc lên.

Đúng lúc đó, từ trong bụi lau rậm rạp bốn phía, hàng trăm chiếc xuồng độc mộc nhẹ như lông hồng rẽ bèo lướt tới. Những tay nỏ nạp sẵn tiễn độc giương lên lạnh lùng, kết liễu một đạo quân hùng mạnh mà không cần tốn một giọt máu của tướng sĩ Tiên Triều.`
  }
];

// =========================================================================
// 6 BINH CHỦNG THỦY LỤC - SƠN LÂM TÁC CHIẾN ĐẶC THÙ
// =========================================================================
export const MASTER_AMPHIBIOUS_TROOPS: AmphibiousTroopBranch[] = [
  {
    id: 'amp_troop_01_lau_thuyen',
    name: 'Thao Thiết Lâu Thuyền Thủy Quân',
    category: 'Thủy Quân Chiến Hạm',
    icon: '🚢',
    specialty: 'Thành lũy di động trên mặt sông lớn, hỏa lực hạng nặng và chỉ huy trung quân',
    standardEquipment: [
      'Chiến hạm 3 tầng gỗ Thiết Mộc ngâm dầu ngàn năm chống mối mọt và lửa',
      'Đầu rồng bọc đồng đúc nòng phun Hỏa Du Linh Thạch tầm xa 80 trượng',
      'Máy bắn đá tảng đôi bên mạn thuyền nạp linh đạn phá chấn',
      'Hệ thống nỏ liên châu 50 rãnh ngắm bắn ngang mặt nước'
    ],
    survivalAndMovementSkills: [
      'Kỹ năng giữ thăng bằng chiến đấu trên sóng cấp 7',
      'Thao tác khóa ngàm xích sắt và tháo nhanh cơ quan khi gặp hiểm cảnh',
      'Vận hành guồng đạp nước tăng tốc đột ngột khi vượt ghềnh cạn'
    ],
    combatStrengths: [
      'Phòng ngự kiên cố vô song, áp đảo hoàn toàn các loại thuyền gỗ thông thường',
      'Khả năng khống chế diện rộng trên mặt sông lớn',
      'Làm trung tâm tiếp vận lương thảo và trạm cứu thương nổi'
    ],
    combatWeaknesses: [
      'Thân tàu nặng nề, xoay trở chậm chạp trong các lạch sông hẹp',
      'Dễ bị mắc cạn khi thủy triều rút bất ngờ hoặc qua ghềnh đá ngầm',
      'Mục tiêu khổng lồ cho các máy bắn đá từ đỉnh vách núi dội xuống'
    ],
    terrainMastery: 'Thích hợp mặt nước rộng, sông sâu trên 3 trượng, không có chướng ngại vật ngầm.',
    unitMotto: 'Thiết Hạm Như Sơn • Giang Hà Bất Bại',
    proseExcerpt: 'Mỗi cỗ Lâu Thuyền tựa như một ngọn kim tự tháp sắt đen rẽ sóng tiến tới. Tiếng trống thúc trận từ tầng ba dội xuống rầm rập như sấm sét, nòng pháo đầu rồng phun ra dòng nham thạch linh hỏa thiêu rụi mọi chướng ngại vật cản đường.'
  },
  {
    id: 'amp_troop_02_thuy_quy',
    name: 'U Minh Thủy Quỷ Tiềm Long Doanh',
    category: 'Thủy Quỷ Đoạt Hạm',
    icon: '🔱',
    specialty: 'Lặn sâu đáy sông đục thuyền, cắt neo, đặt bom phù văn và bắt cóc tướng địch',
    standardEquipment: [
      'Áo lặn da cá sấu đầm lầy chống nước lạnh và gai cọc ngầm',
      'Ống thở sậy ngọc thông khí trên mặt nước ngụy trang hình bèo bọt',
      'Dùi sắt ba cạnh, búa gỗ bọc da nỉ giảm chấn âm thanh',
      'Chủy thủ ngậm miệng và ống phóng phi tiêu nước tẩm độc rết'
    ],
    survivalAndMovementSkills: [
      'Nhịn thở dưới nước lạnh suốt ba tuần nhang không cần nổi lên',
      'Bơi ngược dòng nước xiết bằng kỹ thuật uốn lượn mình rái cá',
      'Lắng nghe sóng âm dưới nước để xác định chính xác vị trí chân vịt và bánh lái địch'
    ],
    combatStrengths: [
      'Hoàn toàn vô hình đối với lính canh trên boong tàu',
      'Chi phí thấp nhưng có thể phá hủy chiến hạm vạn cân trong gang tấc',
      'Gây tâm lý hoảng loạn kinh hoàng cho thủy binh đối phương'
    ],
    combatWeaknesses: [
      'Cực kỳ yếu ớt khi bị ép lên bờ giao chiến giáp lá cà với kỵ binh',
      'Dễ bị tiêu diệt hàng loạt nếu địch rải vôi bột hoặc dầu cay xuống lòng sông',
      'Không chịu nổi các đợt chấn động của sóng xung kích từ linh phù nổ dưới nước'
    ],
    terrainMastery: 'Bậc thầy dưới lòng sông sâu, ghềnh đá ngầm, vùng chân cầu và cửa cống thủy trại.',
    unitMotto: 'Thâm Thủy Tiềm Long • Đục Thuyền Đoạt Mệnh',
    proseExcerpt: 'Dưới lòng sông tối tăm lạnh buốt, những bóng ma thủy quỷ lướt đi thoăn thoắt không để lại một gợn sóng. Đôi tay thép ghì chặt mũi dùi ba cạnh xoay tít, chỉ một lát sau đáy thuyền kiên cố của địch đã vỡ toác thành lỗ hổng khổng lồ.'
  },
  {
    id: 'amp_troop_03_son_nhai',
    name: 'Bạch Hạc Tiễu Phong Sơn Nhai Khinh Binh',
    category: 'Sơn Nhai Khinh Binh',
    icon: '🧗',
    specialty: 'Leo vách đá dựng đứng, đu dây vượt vực thẳm ngàn trượng, tập kích từ trên trời rơi xuống',
    standardEquipment: [
      'Đôi vuốt thép hợp kim gắn lòng bàn tay và mũi giày bám đá hoa cương',
      'Dây thừng bện từ tơ tằm băng tuyết và ruột thú dẻo dai chịu lực ngàn cân',
      'Cánh dù da dơi gấp gọn sau lưng dùng nhảy dù từ mỏm đá cao',
      'Cung ngắn gấp cơ quan và đao găm cong chém gần'
    ],
    survivalAndMovementSkills: [
      'Treo mình trên vách đá ngủ suốt đêm chỉ bằng một sợi dây neo',
      'Đọc hướng gió núi và nhận biết đá mục đá lở trong nháy mắt',
      'Lợi dụng tiếng rít của gió để át tiếng đóng đinh thép vào đá'
    ],
    combatStrengths: [
      'Xuất hiện ở những vị trí đối phương cho là bất khả thi',
      'Chiếm lĩnh các cao điểm khống chế toàn bộ chiến trường thung lũng',
      'Tốc độ cơ động vượt địa hình đồi núi nhanh gấp ba lần kỵ binh thông thường'
    ],
    combatWeaknesses: [
      'Giáp trụ mỏng manh, không chịu được mưa tên diện rộng',
      'Nếu bị cắt đứt dây cáp trên không trung sẽ cầm chắc cái chết',
      'Trang bị nhẹ không thể đối đầu trực diện với bộ binh trọng giáp dàn hàng'
    ],
    terrainMastery: 'Bá chủ các vách núi cheo leo, hẻm vực sâu thăm thẳm, vách đá dựng đứng 90 độ.',
    unitMotto: 'Vực Thẳm Như Bằng Phẳng • Tuyệt Bích Hóa Thang Mây',
    proseExcerpt: 'Như loài chim ưng núi lượn quanh đỉnh mây, các dũng sĩ Sơn Nhai Khinh Binh buông mình lao vút qua hẻm vực thăm thẳm. Đôi cánh dù da dơi xòe ra nhẹ nhàng đáp xuống sau lưng quân thù trong sự ngỡ ngàng tột độ.'
  },
  {
    id: 'amp_troop_04_mang_lam',
    name: 'U Ảnh Tầm Mộc Thiện Xạ Doanh',
    category: 'Mãng Lâm Thiện Xạ',
    icon: '🏹',
    specialty: 'Ẩn mình trên tán cây cổ thụ rừng già, ngụy trang sương mù bắn tỉa tướng địch',
    standardEquipment: [
      'Trường nỏ rèn từ gân rồng đất và gỗ lim ngàn năm, bắn êm không tiếng động',
      'Mũi tên tre tẩm nọc rắn hổ mang chúa và nọc cóc tía rừng sâu',
      'Áo ngụy trang kết từ rêu phong và lá mục đổi màu theo vỏ cây',
      'Gương thu phóng tầm nhìn nhìn xuyên qua màn sương sớm'
    ],
    survivalAndMovementSkills: [
      'Chuyền từ cành cây này sang cành cây khác cách mười trượng không chạm đất',
      'Bất động ngụy trang suốt 12 canh giờ không chớp mắt',
      'Nhận biết độc thảo, bắt rắn lấy nọc ngay giữa rừng rậm nhiệt đới'
    ],
    combatStrengths: [
      'Tầm bắn cực xa và độ chuẩn xác bắn trúng mắt địch ở khoảng cách 150 bước',
      'Kẻ thù ngã xuống mà không hề hay biết mũi tên bay tới từ hướng nào',
      'Bảo vệ sườn và hậu phương hoàn hảo cho đại quân trong rừng rậm'
    ],
    combatWeaknesses: [
      'Bị hỏa công thiêu rừng là mất hoàn toàn nơi ẩn nấp',
      'Hết tên nỏ là giảm 80% sức chiến đấu',
      'Gặp địa hình trống trải đồng bằng sẽ bị kỵ binh truy sát tiêu diệt nhanh chóng'
    ],
    terrainMastery: 'Rừng nguyên sinh ngập mặn, rừng rậm nhiệt đới, đầm lầy cây cổ thụ rậm rạp.',
    unitMotto: 'Thân Hòa Vào Vỏ Cây • Tên Bay Đoạt Hồn Phách',
    proseExcerpt: 'Trên cành cây đước phủ đầy rêu xanh, một bóng người hòa làm một với thân cây ngàn năm. Dây cung nhẹ buông, mũi tiễn đen tuyền xé toạc màn sương mù cắm phập vào yết hầu tên chưởng môn địch, máu độc loang ra đen thẫm trước khi xác hắn kịp ngã xuống sàn thuyền.'
  },
  {
    id: 'amp_troop_05_cong_binh_thang_kieu',
    name: 'Lỗ Ban Khôi Giáp Thằng Kiều Công Binh',
    category: 'Cơ Quan Thằng Kiều',
    icon: '🛠️',
    specialty: 'Bắc cầu phao thần tốc qua sông dữ, bắn cáp thép qua vực sâu, đắp đập ngăn lũ xả dòng',
    standardEquipment: [
      'Nỏ khổng lồ bắn cáp thép có gắn mũi khoan tự găm vào vách đá',
      'Thùng phao nổi da thú bơm hơi cơ quan ghép mộng làm mặt cầu',
      'Cưa ngọc cắt gỗ sắt và búa đóng cọc ròng rọc tự động',
      'Bao tải đất sét chống thấm và thuốc nổ phá đập hẹn giờ'
    ],
    survivalAndMovementSkills: [
      'Bắc một cây cầu phao chịu tải mười vạn quân qua sông trong vòng hai canh giờ',
      'Đo lưu tốc dòng chảy và dự báo chính xác đỉnh lũ con nước',
      'Thiết kế trục tời cơ quan nâng vạn cân bằng sức kéo của một con trâu'
    ],
    combatStrengths: [
      'Biến địa hình hiểm trở chết chóc thành đường bằng cho đại quân hành tiến',
      'Khả năng xoay chuyển chiến cục bằng các công trình thủy lợi - địa chất thần tốc',
      'Phá hủy công sự cầu cống của địch trong chớp mắt'
    ],
    combatWeaknesses: [
      'Chậm chạp khi mang vác nhiều khí tài nặng nề',
      'Cần có lực lượng chiến đấu hộ vệ nghiêm ngặt khi đang thi công trận địa',
      'Rất dễ bị tổn thương nếu bị kỵ binh địch tập kích bất ngờ'
    ],
    terrainMastery: 'Bậc thầy tại các bến sông nước xiết, bờ vực gãy khúc, hẻm núi đứt đoạn.',
    unitMotto: 'Nước Ngăn Ta Đắp Cầu • Núi Chặn Ta Khoét Đá',
    proseExcerpt: 'Chỉ trong vòng nửa canh giờ giữa đêm giông bão, ba trăm cỗ nỏ thép đồng loạt phát hỏa găm hàng trăm sợi cáp bạc qua hẻm núi sâu nghìn trượng. Những tấm ván gỗ mộng sắt lướt trên cáp như thoi đưa, dựng nên một con đường thông thiên cho vạn thiết kỵ Tiên Triều vượt vực.'
  },
  {
    id: 'amp_troop_06_xich_lan_doc_moc',
    name: 'Xích Lân Độc Mộc Tiên Phong Kỵ',
    category: 'Khinh Chu Tiên Phong',
    icon: '🛶',
    specialty: 'Xuồng độc mộc đáy cạn lướt ghềnh thác hiểm trở, tiếp cận bãi cạn và truy sát tàn binh',
    standardEquipment: [
      'Thuyền độc mộc khoét từ thân cây cổ thụ nhẹ như bèo, bọc da rái cá trơn nhẵn',
      'Mái chèo hai đầu gắn lưỡi liềm chém đầu người dưới nước',
      'Khiên mây tẩm dầu nhẹ nổi trên mặt nước che chắn tên nỏ',
      'Hỏa hồ lô chứa dầu bén cháy bùng khi quăng lên thuyền đối phương'
    ],
    survivalAndMovementSkills: [
      'Lướt thuyền qua ghềnh thác đá lởm chởm mà không hề lật úp',
      'Khi gặp cạn một người có thể vác thuyền chạy bộ qua bãi cát',
      'Chiến đấu cận chiến bằng mái chèo và đao ngắn ngay trên lòng thuyền chòng chành'
    ],
    combatStrengths: [
      'Tốc độ cơ động trên sông lạch nhỏ nhanh nhất toàn quân',
      'Luồn lách vào những nơi chiến hạm to lớn không thể tiến vào',
      'Tác chiến du kích ban đêm gây quấy rối tiêu hao sinh lực địch cực mạnh'
    ],
    combatWeaknesses: [
      'Không chịu nổi một đòn trực diện từ máy bắn đá hoặc nỏ lớn của lâu thuyền',
      'Sức chứa ít, chỉ chở được 3 đến 5 dũng sĩ trên mỗi thuyền',
      'Không thể tác chiến giữa biển khơi có sóng cồn ngập đầu'
    ],
    terrainMastery: 'Suối cạn, ghềnh thác hiểm trở, rừng ngập mặn đầm bèo và kênh rạch nhỏ hẹp.',
    unitMotto: 'Lướt Sóng Như Tên Bay • Vượt Ghềnh Không Lật Đắm',
    proseExcerpt: 'Như đàn cá lượn giữa làn thác cuộn trắng xóa, hàng trăm chiếc thuyền độc mộc lướt đi vun vút qua những mỏm đá ngầm lởm chởm. Tiếng reo hò dậy sóng, những mái chèo vung lên chém tan bọt nước, áp sát bãi bồi tiêu diệt tàn quân địch.'
  }
];

// =========================================================================
// CÁC QUY TẮC ĐỊA HÌNH SÔNG NÚI RỪNG VỰC (HYBRID TERRAIN DOCTRINE)
// =========================================================================
export const MASTER_HYBRID_TERRAIN_TACTICS: HybridTerrainManual[] = [
  {
    id: 'terr_amp_01_hem_vuc_song_ngam',
    name: 'Hạp Cốc Hắc Uyên (Hẻm Vực Sâu Có Sông Chảy Giữa)',
    topography: 'Hai bên là vách núi đá vôi dựng đứng cao 200 - 500 trượng, lòng hẹp chỉ 10 - 30 trượng, dưới đáy là dòng sông chảy xiết nhiều đá ngầm.',
    weatherHazards: 'Gió lốc xoáy hút gió theo hẻm núi; sương mù dày đặc che khuất ánh sáng mặt trời; đá lở bất ngờ sau mưa giông.',
    tacticalKeypoints: [
      'Chiếm giữ đỉnh vách núi là nắm 9 phần thắng, kẻ ở dưới đáy sông rơi vào thế cá nằm trên thớt.',
      'Bố trí điểm chặn hai đầu hẻm bằng xích sắt hoặc đá sập cơ quan.',
      'Sử dụng ròng rọc và cáp treo để vận chuyển khí tài qua lại giữa hai đỉnh vách.'
    ],
    ambushFormations: ['Hạp Cốc Lạc Thạch • Tuyệt Bích Đoạt Mệnh Trận', 'Bát Nhai Phục Kỵ • Phi Thằng Vượt Vực Trận'],
    disastrousTraps: [
      'Thả bè gỗ tẩm dầu cháy bùng xuôi theo dòng nước xiết đâm vào hạm đội địch.',
      'Lăn đá tảng ngàn cân từ trên đỉnh núi đè bẹp thuyền bè đi bên dưới.'
    ],
    logisticsRules: [
      'Không vận chuyển lương thực bằng thuyền qua hẻm núi vào ban đêm vì đá ngầm.',
      'Lập kho lương trên các hang động tự nhiên khoét giữa lưng chừng vách đá.'
    ],
    historicalClassicBattle: 'Trận Phục Kích Hắc Long Hạp: Tiêu Cảnh dùng 300 dũng sĩ trên vách đá diệt 3 vạn quân tiên phong của Vấn Tiên Tông mà không mất một binh một tốt.'
  },
  {
    id: 'terr_amp_02_song_nui_dan_xen',
    name: 'Tam Xuyên Cửu Lĩnh (Vùng Đồi Núi Xen Kẽ Sông Lạch)',
    topography: 'Cứ cách ba dặm núi lại có một khúc sông uốn lượn; rừng rậm bạt ngàn bao phủ các thung lũng lòng chảo.',
    weatherHazards: 'Độ ẩm cực cao làm ẩm mốc dây cung và hỏa dược; lũ quét tràn về sau những cơn mưa rừng bất chợt; chướng khí ban mai.',
    tacticalKeypoints: [
      'Thiết lập mạng lưới liên lạc còi hiệu và khói màu giữa các trạm quan sát trên đỉnh đồi.',
      'Bộ binh và thủy quân phải tác chiến bọc lót nhịp nhàng theo nguyên tắc: Thuyền đi dưới sông, bộ binh bám theo hai bờ núi yểm trợ.',
      'Chiếm giữ các bến đò sang sông và các hốc rạch ngầm che giấu thuyền bè.'
    ],
    ambushFormations: ['Tam Thủy Cửu Sơn • Thập Diện Hợp Kích Trận', 'Giao Long Xuất Hải • Thủy Hỏa Liên Hoàn Trận'],
    disastrousTraps: [
      'Cắm cọc nhọn vát xiên dưới các bến sông cát mịn nhử kỵ binh địch phi ngựa xuống sa lầy.',
      'Đốt rừng già đầu gió ép địch phải nhảy xuống sông nơi thủy quân đang giăng lưới bắt sống.'
    ],
    logisticsRules: [
      'Dùng thuyền độc mộc nhỏ vận chuyển lương thảo men theo các con lạch nhỏ an toàn hơn đường bộ gập ghềnh.',
      'Đóng móng sắt cho lừa ngựa leo dốc núi ẩm ướt.'
    ],
    historicalClassicBattle: 'Trận Khai Quốc Bình Định Lĩnh Nam: Ba ngàn Long Kỵ kết hợp hai trăm thuyền chiến quét sạch yêu tộc sơn cốc trong mười ngày.'
  },
  {
    id: 'terr_amp_03_dam_lay_mang_lam',
    name: 'Vân Mộng Mãng Đầm (Rừng Rậm Ngập Nước Đầm Lầy Độc)',
    topography: 'Vùng đất ngập mặn bùn lầy lún sâu, rễ cây đước chằng chịt như mạng nhện, hàng ngàn lạch nước không có bờ cõi rõ ràng.',
    weatherHazards: 'Khí mê-tan bốc lên từ bùn lầy dễ gây ảo giác; muỗi rừng mang mầm bệnh sốt rét; nước độc uống vào loét ruột.',
    tacticalKeypoints: [
      'Cấm tuyệt đối mang giáp sắt nặng nề; toàn quân đổi sang giáp mây tẩm dầu nhẹ nổi trên nước.',
      'Phải có người dẫn đường bản địa am hiểu từng lối mòn ngầm dưới bùn.',
      'Đóng quân trên các bè gỗ nổi neo vào thân cây cổ thụ thay vì cắm trại trên mặt đất bùn.'
    ],
    ambushFormations: ['Thủy Mộc Song Sát • Mãng Lâm Độc Vụ Trận', 'Cửu Khúc U Lan • Mê Hồn Thủy Khốn Trận'],
    disastrousTraps: [
      'Bẫy chông ngầm tẩm nọc rắn rải đều quanh các gốc cây cổ thụ.',
      'Hố bùn lún nhân tạo ngụy trang bằng bèo tấm và cành cây khô.'
    ],
    logisticsRules: [
      'Mỗi ngày binh sĩ phải uống một bát canh gừng tỏi và bôi mỡ trăn khắp người phòng độc trùng.',
      'Bọc kín bao lương bằng ba lớp da dê quét hắc ín chống ngấm nước thối rữa.'
    ],
    historicalClassicBattle: 'Trận Vây Hãm Vạn Độc Tông: Tiêu Cảnh dẫn quân luồn rừng đầm lầy suốt nửa tháng tiêu diệt sào huyệt tà phái.'
  },
  {
    id: 'terr_amp_04_ghenh_thac_thuong_nguon',
    name: 'Lôi Đình Hiển Than (Ghềnh Thác Thượng Nguồn Nước Xiết)',
    topography: 'Độ dốc lòng sông lớn, đá hoa cương lởm chởm như bãi chông, sóng bạc đầu cuồn cuộn gầm thét, hai bên bờ là vách đá dốc đứng.',
    weatherHazards: 'Lũ ống đổ về trong nháy mắt; gió giật ngược dòng; đá lăn từ sườn núi dốc.',
    tacticalKeypoints: [
      'Nắm quyền khống chế các con đập tự nhiên và nhân tạo ở thượng nguồn con thác.',
      'Chỉ sử dụng thuyền độc mộc chuyên dụng và bè mảng kết bằng cây nứa già dẻo dai.',
      'Bố trí công binh đo lưu lượng nước từng canh giờ để dự báo thời điểm xả lũ nhân tạo.'
    ],
    ambushFormations: ['Thất Tinh Đoạn Lưu • Thủy Kích Quyết Đê Trận', 'Bạch Viên Xuyên Nhai • Vách Đá Độn Kỵ Trận'],
    disastrousTraps: [
      'Đắp đập chặn nước rồi phá hủy đúng lúc địch đang vượt thác.',
      'Thả các cây gỗ lớn gắn chông sắt từ thượng nguồn lao xuống đâm thủng thuyền địch.'
    ],
    logisticsRules: [
      'Vận chuyển lương thực ngược dòng bằng đường kéo cáp tời men theo vách núi.',
      'Nghiêm cấm binh sĩ bơi lội hoặc tắm giặt nơi chân ghềnh thác hiểm trở.'
    ],
    historicalClassicBattle: 'Trận Thủy Tiệt Thác Lôi Ba: Quân Tiên Triều phá đập dìm chết năm vạn yêu quân lang tộc dưới lòng sông bạc đầu.'
  }
];

// =========================================================================
// THỦY LỤC HUẤN LUYỆN QUÂN QUY & TAM PHÒNG BÍ TRUYỀN
// =========================================================================
export const MASTER_WATER_MOUNTAIN_RULES: WaterMountainDrillRule[] = [
  {
    id: 'rule_amp_01_thap_bat_lenh',
    title: 'Thập Bát Thủy Lệnh • Quân Quy Tác Chiến Mặt Nước',
    category: 'Thập Bát Thủy Lệnh',
    teaching: 'Tác chiến mặt nước lấy tính mạng trên thuyền làm gốc. Thuyền chìm là quân tan, thuyền vững là trận thắng. Mười tám điều răn nghiêm khắc giữ vững kỷ luật trên sóng gió.',
    practicalDrill: [
      'Điều 1: Kẻ nào thấy gió đổi chiều mà không báo, chém! Kẻ nào ngủ gật khi cầm lái bánh lái, chém!',
      'Điều 2: Lên thuyền cấm tuyệt đối mang giày sắt nặng; tất cả phải đi chân đất hoặc mang giày cói bám mạn gỗ.',
      'Điều 3: Khi thuyền trúng tiễn lửa, đội dập lửa phải lập tức phủ mền ướt dập tắt ngay, kẻ nào bỏ vị trí nhảy sông tự cứu thân, chém!',
      'Điều 4: Thuyền đi ban đêm cấm bật lửa, cấm ho khan, mái chèo phải bọc vải giảm âm khi lướt qua vùng địch.'
    ],
    warningVerse: 'Sóng cả không kinh tâm mới đặng • Thuyền nghiêng chẳng sợ mới thành danh • Trống sấm một hồi xao mặt nước • Thủy quân Tiên Quốc định giang thành.'
  },
  {
    id: 'rule_amp_02_tam_phong',
    title: 'Tam Phòng Thần Thư: Phòng Lũ - Phòng Độc - Phòng Lở Núi',
    category: 'Tam Phòng Lãm Bí',
    teaching: 'Vào vùng sông núi rậm rạp có vực sâu, ba đại họa tự nhiên có thể giết chết vạn quân trong nháy mắt mà không cần bóng một tên giặc. Người làm tướng phải hiểu rõ ba điều phòng bị này.',
    practicalDrill: [
      'Phòng Lũ Bất Ngờ: Đóng trại ven sông cấm cắm cọc dưới mực nước dâng của cỏ bờ sông; thấy nước bỗng nhiên cạn bất thường hoặc nổi nhiều cành lá mục lập tức rút quân lên đồi cao trong vòng một tuần nhang.',
      'Phòng Độc Chướng Khí: Vào rừng sâu trước giờ Thìn phải đốt cành cây ngải cứu xua tan sương lạnh; cấm ăn nấm sặc sỡ và cá lạ bụng trắng nổi trên mặt đầm.',
      'Phòng Núi Lở Đất Nứt: Cấm đóng quân dưới chân vách đá dựng đứng có nhiều vết nứt mới nứt toác sau mưa lớn; cấm đốt lửa sưởi ấm sát vách đá vôi làm nứt đá rơi xuống.'
    ],
    warningVerse: 'Nước cạn bất thường ắt có lũ • Sương lam dày đặc giấu độc sâu • Vách núi nứt rạn đừng nương náu • Ba điều ghi nhớ vạn quân an.'
  },
  {
    id: 'rule_amp_03_vuot_vuc',
    title: 'Phi Thằng Vượt Vực Thần Kỹ: Đu Dây Giữa Trời',
    category: 'Vượt Vực Đu Dây',
    teaching: 'Phương pháp rèn luyện cho binh sĩ không sợ độ cao, đu mình qua hẻm núi sâu ngàn trượng bằng cáp treo và ròng rọc cơ quan.',
    practicalDrill: [
      'Tập luyện bước 1: Đi trên dây cáp đơn căng ngang mặt đất cao 1 trượng có nệm rơm bên dưới suốt 30 ngày.',
      'Tập luyện bước 2: Đeo tạ hai mươi cân trượt ròng rọc từ trên cây cao xuống đất điều khiển tốc độ bằng tay phanh bọc da bò.',
      'Tập luyện bước 3: Đu dây ban đêm trong tiếng gió rít giả tạo, học cách bắn cung khi thân mình đang lơ lửng giữa không trung.'
    ],
    warningVerse: 'Mắt nhìn thẳng phía trước chẳng nhìn sâu • Tim vững như đá hoa cương đầu • Dây cáp trong tay đường thông thiên • Bay qua hẻm thẳm chém vương hầu.'
  },
  {
    id: 'rule_amp_04_dam_lay_doc',
    title: 'Bách Độc Bất Xâm: Bí Quyết Sinh Tồn Đầm Lầy Độc Thủy',
    category: 'Phòng Ngự Đầm Lầy Độc Khí',
    teaching: 'Đầm lầy rừng ngập mặn là mồ chôn của những đạo quân ngạo mạn. Muốn sống sót và chiến thắng phải biết hòa mình vào bùn đất và độc thảo.',
    practicalDrill: [
      'Mỗi buổi sớm tắm nước lá tràm pha phèn chua để da săn chắc chống đỉa và côn trùng cắn.',
      'Luyện kỹ năng nhận biết bùn lún: Cầm gậy tre dài ba trượng chọc thử phía trước trước khi đặt chân bước tiếp.',
      'Cách nấu nước bùn thành nước ngọt uống được bằng ba lớp cát, than củi và lá dong rừng.'
    ],
    warningVerse: 'Bùn đen bôi mặt giấu tung tích • Độc vụ quanh thân hóa khiên che • Đầm lầy vạn dặm là đất mẹ • Nuốt chửng quân thù chẳng vết xe.'
  }
];

// =========================================================================
// TOÀN VĂN BINH THƯ CỔ: «CỬU CHÂU THỦY LỤC HIỂM ĐỊA THẦN CƠ BINH PHÁP»
// =========================================================================
export const MASTER_AMPHIBIOUS_FULL_TREATISE = `
================================================================================
CỬU CHÂU THỦY LỤC HIỂM ĐỊA THẦN CƠ BINH PHÁP (GIANG SƠN HIỂM TRỞ TOÀN THƯ)
Tác giả: Khai Quốc Thánh Hoàng Tiêu Cảnh & Đại Càn Thủy Sư Đô Đốc
Lưu trữ tại: Cửu Long Thiên Các • Binh Bộ Thượng Thư Bí Điện
================================================================================

THIÊN THỨ NHẤT: THỦY TƯỢNG & ĐỊA HIỂM CHI ĐẠO
Binh pháp có câu: "Binh vô thường thế, thủy vô thường hình."
Đạo dùng binh trên sông núi, hẻm vực sâu thăm thẳm và rừng rậm đầm lầy khác xa với chốn bình nguyên rộng rãi. Nơi bình nguyên, lấy thế trận ngang dọc, lấy kỵ binh làm mũi nhọn, lấy chiến xa làm bức tường thành. Nhưng bước chân vào chốn giang sơn hiểm trở, nghìn dặm non xanh nước biếc đan xen:
- Một ngọn núi cao có thể nuốt trọn mười vạn quân bằng đá rơi thác đổ.
- Một khúc sông hẹp có thể bẻ gãy hạm đội nghìn thuyền bằng xích sắt ngầm.
- Một cánh rừng ngập nước đầy chướng khí có thể làm tiêu ma ý chí của những bậc kiêu hùng.

Kẻ làm tướng giỏi thủy lục tác chiến, trước phải nhìn trời xem gió mùa, dưới phải đo dòng nước xiết, giữa phải thấu hiểu lòng đất lòng rừng. Không ỷ vào sức mạnh của binh đông, chỉ nương theo thế hiểm của thiên nhiên mà chuyển hóa thành lưỡi đao đoạt mệnh đối phương.

THIÊN THỨ HAI: LỤC ĐẠI NGUYÊN TẮC TÁC CHIẾN SÔNG NÚI HẺM VỰC
1. "Chiếm Sơn Khống Hà": 
Núi và sông luôn đi liền với nhau. Đánh trên sông mà không chiếm sườn núi hai bên, ắt có ngày bị đá tảng từ trên trời giáng xuống vỡ tan thuyền bè. Đánh trên núi mà không khóa cửa sông phía dưới, ắt giặc sẽ dùng thuyền chở lương chi viện hoặc men theo dòng nước mà chạy thoát.

2. "Dĩ Khinh Phá Trọng": 
Nơi sông hẹp lạch cạn, rễ cây chằng chịt, chiến hạm khổng lồ vạn cân chẳng bằng một chiếc thuyền độc mộc lướt trên bùn. Lấy thuyền nhẹ linh hoạt như thoi đưa, chia cắt những chiếc thuyền lớn cồng kềnh, dùng tiễn lửa và độc tiễn tiêu diệt từng bộ phận.

3. "Thủy Hỏa Tương Dung": 
Ai bảo nước với lửa chẳng đội trời chung? Trên mặt sông nước xiết, dùng hỏa công là độc địa bậc nhất. Lợi dụng sức nước chảy xiết đưa thuyền lửa lao điên cuồng vào trại giặc; linh dầu nổi trên mặt nước bén lửa tạo thành biển lửa nổi giữa dòng sông, biến thủy trại thành hỏa ngục.

4. "Bạch Viên Nhập Nhai":
Đứng trước hẻm vực sâu thăm thẳm ngàn trượng, người phàm đều cho rằng đó là vực chết không đáy. Nhưng bậc đại tướng cơ quan lại xem đó là thang mây lên trời. Dùng cáp thép nối liền hai bờ vực, dùng vuốt sắt bám đá hoa cương, đưa quân lên tận trời xanh giáng đòn sấm sét sau lưng địch.

5. "Đoạn Lưu Thủy Kích":
Nước chảy hiền hòa nhưng khi giận dữ có thể bạt núi xới rừng. Biết đắp đập tích nước ở thượng du, nhử địch vào bãi cạn hạ du rồi phá đập, đó là phép mượn sức trời đất để chém đầu vạn tướng mà không tốn một mũi tên.

6. "Độn Lâm Mê Vụ":
Rừng già đầm lầy đầy chướng khí chết người, nhưng nếu biết uống thuốc giải, bôi bùn ngụy trang, thì rừng già chính là người mẹ che chở quân ta. Biến mỗi cành cây thành một vị xạ thủ, biến mỗi bụi rêu thành một mũi găm, khiến kẻ thù bước vào như bước vào địa ngục vô môn.

THIÊN THỨ BA: PHƯƠNG PHÁP RÈN LUYỆN THỦY QUÂN & KHINH BINH VƯỢT NÚI
Quân lính nơi biên ải Tiên Triều trước khi ra trận thủy lục phải trải qua ba năm thao luyện khắt khe:
- Một năm luyện bơi lặn: Mùa đông giá rét phải lặn ngụp dưới dòng sông đóng băng, tập nhịn thở suốt hai tuần nhang ngậm ống sậy dưới đáy nước.
- Một năm luyện trèo vách: Mang giáp da trèo vách đá thẳng đứng, tay không bám khe nứt, chân đạp mỏm đá nhọn, ngã không sợ, cao không chóng mặt.
- Một năm luyện phối hợp Thủy - Lục: Đêm nghe tiếng tù và ốc biển mà biết hướng rẽ buồm, nhìn khói mù ven rừng mà biết điểm mai phục, bắn cung trúng hồng tâm ngay cả khi sàn thuyền đang chòng chành giữa cơn sóng cuộn.

THIÊN THỨ TƯ: LỜI CỦA THÁNH HOÀNG TIÊU CẢNH
"Giang sơn này do trời đất tạo nên, non sông này có linh hồn khí vận.
Kẻ nào chỉ cậy vào binh hùng tướng mạnh, ỷ vào pháp bảo tiên tông mà dám coi thường sông núi hiểm trở, kẻ đó ắt sẽ bị sông vùi xác, bị núi đè xương, bị rừng nuốt hồn.
Học được bộ binh pháp này, lấy nước làm áo giáp, lấy núi làm thành lũy, lấy vực sâu làm cạm bẫy, lấy rừng già làm quân tiên phong. Bấy giờ trong thiên hạ, không một con sông nào có thể ngăn bước tiến, không một hẻm núi nào có thể cản vó ngựa của Đại Càn Tiên Triều!"
================================================================================
`;
