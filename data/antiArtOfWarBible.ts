// =========================================================================
// CỬU TÔNG NGHỊCH CHIẾN PHÁ TRẬN BÍ THƯ (VẠN TRẬN TƯƠNG KHẮC TOÀN THƯ)
// Bộ Binh Pháp Tương Khắc — Bí kíp chuyên dụng để Khống Chế, Hóa Giải,
// Đột Phá và Tiêu Diệt Binh Pháp & Quân Đội ĐẠI CÀN TIÊN TRIỀU
// =========================================================================

export interface AntiBattleFormation {
  id: string;
  name: string;
  alias: string;
  countersTarget: string; // Tên trận của Đại Càn mà trận này sinh ra để tiêu diệt
  category: 'Triệt Hạ Tiên Phong' | 'Phá Thuẫn Đập Mai' | 'Phá Lưới Giải Khốn' | 'Đoạt Mạng Hậu Quân' | 'Nghịch Chuyển Kỳ Môn' | 'Du Kích Tương Khắc';
  symbol: string;
  corePhilosophy: string;
  diagramText: string;
  stepByStepManeuvers: {
    phase1: string; // Giai đoạn Dụ Bẫy / Khử Đà
    phase2: string; // Giai đoạn Bẻ Khớp / Chia Cắt
    phase3: string; // Giai đoạn Tiêu Diệt / Trảm Thủ
  };
  disruptionTechniques: {
    signalJamming: string;  // Cách làm loạn trống chiêng cờ hiệu của Đại Càn
    psychologicalWar: string; // Tâm lý chiến đánh sụp Binh Huyết
    antiMechanicTrap: string; // Cách vô hiệu hóa cơ quan nỏ pháo
  };
  specializedUnits: string[];
  optimalTerrain: string[];
  keyTurningPoint: string; // Thời khắc mấu chốt xoay chuyển cục diện
  battleExcerpt: string;   // Trích đoạn văn học miêu tả phá trận chân thực
}

export interface AntiTroopBranch {
  id: string;
  name: string;
  alias: string;
  preysUpon: string; // Binh chủng Đại Càn bị săn lùng (vd: Long Kỵ, Huyền Giáp Thuẫn, Thần Nỏ)
  icon: string;
  lethalWeaponry: string[];
  counterTactics: string[];
  psychologicalEdge: string;
  terrainExploitation: string;
  proseExcerpt: string;
}

export interface AntiDestinyDoctrine {
  id: string;
  title: string;
  category: 'Nghịch Long Đoạt Vận' | 'Hủ Binh Chi Khí' | 'Thiên Ma Nhiễu Hồn' | 'Đoạn Tuyến Tuyệt Lương';
  concept: string;
  practicalMethods: string[];
  counterEmpireVulnerability: string;
  narrativeClimax: string;
}

// -------------------------------------------------------------------------
// 1. THẬP NHỊ ĐẠI PHÁ TRẬN NGHỊCH PHÁP (TƯƠNG KHẮC 12 ĐẠI TRẬN ĐẠI CÀN)
// -------------------------------------------------------------------------
export const MASTER_ANTI_BATTLE_FORMATIONS: AntiBattleFormation[] = [
  {
    id: 'anti_phong_thi',
    name: 'Địa Hãm Thao Thiết Trận (Trận Sình Lầy Nuốt Mũi Tên)',
    alias: 'Đoạn Tiễn Bạt Nhĩ • Phá Phong Thỉ Khắc Tinh',
    countersTarget: 'Phong Thỉ Trận (Trận Mũi Tên Gió của Tiêu Cảnh)',
    category: 'Triệt Hạ Tiên Phong',
    symbol: '🕳️',
    corePhilosophy: 'Mũi tên càng sắc, cắm vào bùn lầy sâu càng mau gãy. Không lấy cứng chọi cứng với ba ngàn kỵ binh đang phi nước đại, mà dùng đất trũng cự mã ngầm triệt tiêu hoàn toàn quán tính, sau đó khép hàm ếch bẻ gãy đầu nhọn.',
    diagramText: `
          [ĐẠI CÀN PHONG THỈ LAO XUỐNG]
                      ▼▼▼
        ══════════ [BÃI CHÔNG NGẦM & ĐỊA LÔI] ══════════
           ╲                                       ╱
     [Cánh Trái: Trảm Mã Đội]              [Cánh Phải: Câu Liêm Đội]
           ╲                                       ╱
            └───▶ [BỤNG THAO THIẾT: BÙN LẦY SỤT LÚN] ◀───┘
                      ▲▲▲
           [Khóa Chân & Ném Hỏa Du Thiêu Cháy]
    `,
    stepByStepManeuvers: {
      phase1: 'Vờ dàn hàng phòng ngự mỏng manh, cắm cờ giả nhử mũi nhọn Phong Thỉ của Tiêu Cảnh lao hết tốc lực vào trục chính diện.',
      phase2: 'Khi vó ngựa chạm vệt đất son, kích hoạt Địa Hãm Phù khiến 50 trượng bình nguyên sụt lún thành đầm lầy ngập gối, ngựa gãy chân lật nhào, quán tính tự xé toác hàng ngũ Tiên Triều.',
      phase3: 'Hai cánh giấu quân trồi lên từ hào rãnh, dùng Câu Liêm Thương giật ngã các kỵ sĩ mang giáp nặng, ném bình dầu thiêu rụi soái kỳ ở trung tâm.'
    },
    disruptionTechniques: {
      signalJamming: 'Dùng tù và đồng pha tạp âm cực đại phát ra tần số rền rĩ giả tiếng rồng ngâm, làm ngựa chiến Phong Lôi hoảng loạn hất văng kỵ sĩ.',
      psychologicalWar: 'Bêu đầu các thám mã bắt được dọc đường, rải truyền đơn vạch trần triều đình bỏ đói gia quyến binh sĩ ở kinh kỳ.',
      antiMechanicTrap: 'Rải Đinh Tam Giác Móc Ngược (Địa Gai Phá Móng) và dây chão bện gân thú tẩm nhựa dính quấn chặt xích liên hoàn của chiến xa.'
    },
    specializedUnits: ['Trảm Mã Đoản Đao Đội', 'Địa Khâu Độn Thổ Quân', 'Hỏa Du Nỏ Tiễn Sĩ'],
    optimalTerrain: ['Đất cát pha bùn', 'Cửa thung lũng dốc thoai thoải', 'Khu vực lòng hồ cạn'],
    keyTurningPoint: 'Khoảnh khắc kỵ binh tiên phong của Đại Càn bị ghìm chân trong bùn, không thể tiến cũng không thể quay đầu để lấy đà.',
    battleExcerpt: `Tiếng vó ngựa của Long Kỵ Tiên Triều tựa sấm sét xé toạc chân trời, Phong Thỉ Trận lao vun vút như một mũi tên xé toạc màn sương. Tướng Tiên Triều gầm vang tưởng chừng một kích sẽ xuyên thủng phòng tuyến tông môn.

Thế nhưng, khi mũi nhọn thép chạm tới bãi cỏ xanh, mặt đất bỗng rung chuyển dữ dội! Hàng ngàn Địa Hãm Linh Phù chôn sâu ba thước đồng loạt bốc khói đen đặc, biến nền đất rắn đanh thành một bãi đầm lầy sôi sục sâu hoắm. 

\"RẮC! HÍ PHÍ...!\" 

Hàng trăm chiến mã hí vang kinh hoàng, hai chân trước lún sâu tới ức, theo quán tính lộn nhào về phía trước đè nát kỵ sĩ phía dưới. Hàng ngàn thớt ngựa phía sau không kịp hãm đà đâm sầm vào nhau, mũi tên thép kiêu hãnh bỗng chốc gãy vụn thành từng mảnh vụn hỗn loạn. 

Từ hai bên sườn đất trũng, hàng ngàn hắc y nhân trồi lên từ lòng đất như âm binh, câu liêm sáng quắc móc thẳng vào cổ họng kỵ binh Đại Càn, biến bãi chiến trường thành nấm mồ chôn vùi nhuệ khí của phế Thái Tử!`
  },
  {
    id: 'anti_hac_duc',
    name: 'Song Long Toán Dực Trận (Trận Hai Rồng Xé Cánh Hạc)',
    alias: 'Phá Dực Trảm Chuỳ • Tuyệt Diệt Vòng Vây',
    countersTarget: 'Hạc Dực Trận (Trận Cánh Hạc Du Hồi)',
    category: 'Triệt Hạ Tiên Phong',
    symbol: '🐉',
    corePhilosophy: 'Biết rõ Hạc Dực dùng trung quân giả vờ yếu để dụ ta vào giữa rồi hai cánh khép lại, ta tuyệt đối không tiến vào bụng bẫy. Thay vào đó, chia đại quân thành hai mũi nhọn uy lực tột cùng (Song Long) đánh vỗ mặt vào hai khớp nối gốc cánh hạc trước khi chúng kịp dang rộng.',
    diagramText: `
          [Cánh Trái Hạc Dực]              [Cánh Phải Hạc Dực]
                 ╲                               ╱
                  ▲                             ▲
                   ╲                           ╱
          ═══════ [KHỚP NỐI GỐC CÁNH BỊ ĐÁNH SẬP] ═══════
                    ▲                         ▲
              [Rồng 1: Xuyên Phá]       [Rồng 2: Xuyên Phá]
                    │                         │
                    └──────── [TRUNG QUÂN ĐỨNG YÊN] ───────┘
    `,
    stepByStepManeuvers: {
      phase1: 'Quan sát trung quân Tiên Triều vờ lùi bước, đại quân giả vờ đuổi theo nhưng dừng lại ở cự ly 150 bước, tuyệt đối không bước qua lằn ranh tử địa.',
      phase2: 'Bất ngờ bắn pháo sáng chia đôi lực lượng thành hai khối Thiết Kỵ Song Long, bỏ qua hoàn toàn trung quân, lao thẳng vào hai sườn khớp gốc cánh hạc.',
      phase3: 'Đập nát lực lượng liên lạc và soái kỳ chuyển lệnh ở gốc cánh; khiến hai đầu mút cánh hạc bị cô lập ngoài xa không có lệnh rút, trở thành miếng mồi bị tiêu diệt từng bộ phận.'
    },
    disruptionTechniques: {
      signalJamming: 'Bắn hàng loạt Hỏa Tiễn Mù Mịt che khuất cờ Thanh Long và Bạch Hổ của Tiên Triều, khiến hai cánh không thấy cờ hiệu để khép lại đúng nhịp.',
      psychologicalWar: 'Dùng tiếng chiêng đồng giả nhịp thu quân của Đại Càn, đánh lừa các cánh quân Tiên Triều tưởng có lệnh triệt thoái.',
      antiMechanicTrap: 'Ném Hủ Cốt Axit vào các khớp nối xe nỏ cơ quan ở hai sườn.'
    },
    specializedUnits: ['Song Kiếm Du Kỵ Binh', 'Thiết Cước Phá Trận Tử Sĩ', 'Lôi Quang Thuẫn Binh'],
    optimalTerrain: ['Địa hình lòng máng mở rộng', 'Đồng cỏ có gò đồi thấp chia cắt tầm nhìn'],
    keyTurningPoint: 'Khi hai mũi giáo Song Long đâm xuyên khớp nối, biến thế bao vây của Tiên Triều thành thế bị chia cắt làm ba khúc cô lập.',
    battleExcerpt: `Tiêu Cảnh giăng Hạc Dực Trận, cố ý để trung quân lùi dần ba mươi bước dụ đối phương xông vào tử địa. Thế nhưng, vị thống soái liên minh tông môn cười khẩy không hề trúng kế.

\"Hạc Dực chỉ mạnh ở hai đầu mút khi khép lại, nhưng điểm yếu chết người nằm ở khớp cánh nối với trung quân! Song Long Xuất Hải, đâm vào hai nách giặc cho ta!\"

Hai vạn tinh binh tông môn không hề tiến thẳng một bước nào vào lòng túi. Họ đột ngột tách làm hai dòng thác sắt đen ngòm, xé gió lao chếch sang hai bên góc bốn mươi lăm độ. Tiếng kiếm rít xé toạc không gian. Cú đâm chí mạng giáng thẳng vào chỗ tiếp giáp mỏng manh nhất giữa cự thuẫn trung quân và kỵ binh hai cánh của Đại Càn. 

Máu bắn tung tóe nhuộm đỏ soái kỳ. Đôi cánh hạc chưa kịp xòe ra đã bị chặt đứt lìa khỏi thân mình; hai cánh Tiên Triều bơ vơ giữa đồng trống, bị kẹp giữa hai làn hỏa lực tiêu diệt sạch trơn!`
  },
  {
    id: 'anti_ngu_lan',
    name: 'Chích Nhiệt Lôi Viêm Trận (Trận Nung Vảy Thiêu Thân)',
    alias: 'Hủy Diệt Vảy Rồng • Nhiệt Lôi Phá Ngư Lân',
    countersTarget: 'Ngư Lân Trận (Trận Vảy Cá Kháng Tiên Thuật của Đại Càn)',
    category: 'Phá Thuẫn Đập Mai',
    symbol: '🔥',
    corePhilosophy: 'Ngư Lân Trận dùng hàng trăm khối khiên nhỏ so le để phân tán ngoại lực chưởng phong. Điểm yếu của nó là sự co cụm và khoảng trống 1 trượng giữa các vảy. Thay vì đánh đơn điểm, ta dùng Dầu Hỏa Địa Cốt kết hợp Cuồng Phong Thuật thổi luồng lửa nghìn độ vào các khe hở, biến vảy thép thành lò nung thiêu sống quân sĩ bên trong.',
    diagramText: `
        [GIÓ THUẬN HƯỚNG BỐC LỬA] ════════════════════════▶
             [Bình Dầu Địa Hỏa Nổ Tung Giữa Các Khe Vảy]
          [Vảy 1: Bị Nung Đỏ]  ──  [Vảy 2: Ngạt Khói Độc]
          [Vảy 3: Hỗn Loạn]    ──  [Vảy 4: Dẫm Đạp Lên Nhau]
        ══════════════════════════════════════════════════
        [Trường Thương Đâm Xuyên Qua Làn Khói Mù Mịt]
    `,
    stepByStepManeuvers: {
      phase1: 'Dùng Phong Sư tu sĩ tạo cuồng phong cấp tám thổi thẳng vào mặt trận Ngư Lân của Tiên Triều.',
      phase2: 'Dùng cơ quan nỏ bắn hàng ngàn bình gốm chứa Địa Cốt Hỏa Du vào các khoảng trống 1 trượng giữa các khối vảy cá.',
      phase3: 'Phóng Liệt Diễm Phù kích nổ biển lửa, thép bách luyện dẫn nhiệt cực nhanh làm binh sĩ Tiên Triều bị bỏng tay buộc phải vứt khiên, phá vỡ cấu trúc tương trợ.'
    },
    disruptionTechniques: {
      signalJamming: 'Khói đen kịt của dầu hỏa che kín bầu trời, khiến cờ Bát Quái ngũ sắc của Tiên Triều hoàn toàn mất tác dụng chỉ huy.',
      psychologicalWar: 'Tiếng rên xiết vì bỏng rát lan truyền giữa các khối vảy cá đập tan ý chí sắt đá của quân đội phàm nhân.',
      antiMechanicTrap: 'Nhiệt độ cực cao làm chảy keo dính và dây gân trên các cây nỏ liên châu giấu trong kẽ khiên.'
    },
    specializedUnits: ['Hỏa Long Liệp Khí Doanh', 'Ngự Phong Vu Tộc', 'Trọng Chùy Hóa Giáp Sĩ'],
    optimalTerrain: ['Đồng cỏ khô hanh', 'Trước hẻm núi gió hút một chiều'],
    keyTurningPoint: 'Khi những tấm cự thuẫn huyền thiết bị nung đỏ rực như than hồng, binh sĩ Đại Càn không thể cầm nắm được nữa.',
    battleExcerpt: `Các khối vảy cá của Đại Càn trượt vào nhau nhịp nhàng, vững như bàn thạch hứng chịu đợt oanh tạc đầu tiên. Thế nhưng nụ cười trên môi các tướng lĩnh Tiên Triều vụt tắt khi mùi dầu nồng nặc bốc lên theo chiều gió.

\"Gió nổi rồi! Phóng hỏa!\"

Một ngàn bình gốm Địa Hỏa vỡ tung giữa các khe hở của Ngư Lân Trận. Ngọn lửa màu lam bùng cháy dữ dội theo luồng cuồng phong, liếm láp qua từng tấm khiên thép. Huyền Thiết tuy cứng cỏi nhưng lại dẫn nhiệt kinh người! Chỉ sau mười hơi thở, hàng vạn tấm khiên đã đỏ rực như vừa rút ra từ lò rèn. Khói độc cay xè luồn qua khe giáp khiến binh sĩ ngạt thở, da thịt dính chặt vào kim loại cháy khét lẹt. 

Bức tường vảy cá kiên cố tan rã trong tiếng la hét kinh hoàng; trật tự sắt thép sụp đổ khi binh sĩ cuống cuồng giật bỏ giáp trụ để cứu lấy mạng sống!`
  },
  {
    id: 'anti_bat_quai_cuu_cung',
    name: 'Hỗn Độn Khai Thiên Đục Tâm Trận (Trận Đục Thẳng Trung Cung)',
    alias: 'Phá Mê Hồn • Đạp Sinh Định Tử Phá Cửu Cung',
    countersTarget: 'Bát Quái Cửu Cung Trận (Trận Mê Cung Cơ Quan của Tiêu Cảnh)',
    category: 'Nghịch Chuyển Kỳ Môn',
    symbol: '⚡',
    corePhilosophy: 'Kẻ bày Bát Quái luôn muốn đối phương lạc vào Cửa Sinh, Cửa Tử, Cửa Thương mà tiêu hao sinh lực. Bí quyết phá Bát Quái là: \"Bất kiến Bát Môn, duy đả Trung Cực\" — Không thèm nhìn tám cửa, dùng Địa Chấn Cự Chuỳ và Lôi Cổ oanh tạc đục thẳng một đường máu xuyên tâm đến Soái Đài trung tâm.',
    diagramText: `
          [Cửa Khảm]     [Cửa Càn]     [Cửa Cấn]
                 ╲           │           ╱
                  ╲          │          ╱
          ══════════ [MŨI ĐỤC THÉP XUYÊN THẲNG] ══════════▶ [SOÁI ĐÀI]
                  ╱          │          ╲
                 ╱           │           ╲
          [Cửa Ly]       [Cửa Khôn]    [Cửa Đoài]
    `,
    stepByStepManeuvers: {
      phase1: 'Bịt tai toàn quân bằng sáp ong pha chu sa để miễn nhiễm với tiếng chiêng trống mê hồn của trận địa.',
      phase2: 'Bỏ qua toàn bộ các lối rẽ và cờ hiệu dẫn dụ ở các cửa Sinh, Kinh, Khai; tập hợp 50 cỗ Thiết Bọc Phá Trận Xa (Đầu Dê Bằng Thép) đâm sập các bức tường chòi quan sát.',
      phase3: 'Đánh sập chiếc chòi quan sát cao nhất ở Trung Cung Soái Đài, bắt sống hoặc trảm sát Trận Sư chỉ huy điều khiển trận bàn.'
    },
    disruptionTechniques: {
      signalJamming: 'Sử dụng Lôi Thần Đại Cổ đập nhịp cuồng loạn lấn át hoàn toàn 8 hồi trống Bát Quái của Tiên Triều, khiến các cửa không biết xoay chuyển hướng nào.',
      psychologicalWar: 'Bắn pháo sáng rực rỡ chỉ thẳng vị trí soái đài trung tâm, phơi bày điểm yếu cốt lõi cho toàn quân thấy.',
      antiMechanicTrap: 'Dùng nam châm cực mạnh (Huyền Từ Thạch) ném vào lòng trận làm kẹt cứng các bánh răng và con quay cơ quan đổi vị.'
    },
    specializedUnits: ['Phá Thiết Xung Kích Doanh', 'Địa Tạng Trận Sư Phá Nhãn', 'Tử Sĩ Điếc Đoạt Kỳ'],
    optimalTerrain: ['Khu vực bằng phẳng có sương mù nhân tạo', 'Thung lũng phế tích'],
    keyTurningPoint: 'Khi chiếc chòi quan sát trung tâm bị xe húc đổ sập, toàn bộ mê cung Bát Quái mất phương hướng và tự dẫm đạp lên nhau.',
    battleExcerpt: `Giữa làn sương mù dày đặc của Bát Quái Trận, tiếng trống lúc trầm lúc bổng vang lên như ma quái dụ dỗ quân địch tiến vào cửa Tử. 

Thế nhưng, đạo quân phá trận không hề quay đầu tìm lối. Toàn bộ binh sĩ đã dùng sáp ong bịt kín hai tai, mắt chỉ nhìn chăm chăm vào la bàn Phong Thủy trên tay vị đại trận sư.

\"Đừng nhìn tám cửa! Nhắm thẳng hướng chính Nam mười một độ, tông sập Soái Đài!\"

Năm mươi cỗ xe thiết giáp bịt thép dày nửa thước đồng loạt gầm rú lao thẳng. Những chiếc chòi gỗ cơ quan tinh xảo của Tiêu Cảnh bị húc gãy vụn như que củi khô. Bẫy chông dưới đất bị bánh xe thép nghiền nát thành bột. Một đường máu thẳng tắp được mở ra giữa mê cung huyền ảo. Khi chiếc Soái Kỳ màu hoàng kim trên chòi trung tâm gãy gập dưới lưỡi tầm sét, cả đại trận ngàn người bỗng chốc mất đi khối óc, tan rã như một bức tranh cát bị cuốn trôi!`
  },
  {
    id: 'anti_nhan_hanh',
    name: 'Bạt Phong Mông Sa Trận (Trận Bão Cát Bẻ Cánh Nhạn)',
    alias: 'Mù Mịt Phong Sa • Thiết Quy Hóa Nỏ Tiễn',
    countersTarget: 'Nhạn Hành Trận (Trận Đàn Nhạn Giăng Cung Vạn Tiễn Tề Phát)',
    category: 'Phá Thuẫn Đập Mai',
    symbol: '🌪️',
    corePhilosophy: 'Cung nỏ tầm xa dựa hoàn toàn vào thị giác và quỹ đạo parabol trong không khí tĩnh. Bằng cách tạo ra Màn Mù Phong Sa dày đặc kết hợp Xe Khiên Rùa Vát Nghiêng 45 độ, mọi mũi tên bắn ra đều bị gạt trượt ra ngoài và nỏ thủ Đại Càn hoàn toàn mất mục tiêu ngắm bắn.',
    diagramText: `
          [MƯA TÊN NHẠN HÀNH RƠI XUỐNG]
                 ╲    ╲    ╲    ╲
            ╱    ╱    ╱    ╱    ╱  (Bị mái khiên nghiêng 45° hất văng)
          ┌───────────────────────────┐
          │  [HÀNG XE KHIÊN THÉP QUY GIÁP]  │ ◀─── BÃO CÁT CHE MẮT XẠ THỦ
          └───────────────────────────┘
                      ▲▲▲
          [Khinh Binh Luồn Dưới Xe Áp Sát Cắt Dây Nỏ]
    `,
    stepByStepManeuvers: {
      phase1: 'Đốt bột ớt cay và thảo dược tạo khói dày đặc theo chiều gió ngược hướng bắn của Nhạn Hành Trận, làm cay mắt nỏ thủ khiến họ không thể ngắm bắn.',
      phase2: 'Đẩy hàng trăm chiếc Thiết Quy Xa (xe bọc da trâu quét hắc ín nghiêng góc) tiến lên chậm rãi hứng trọn các đợt mưa tên không hề tổn hại.',
      phase3: 'Khi cự ly thu hẹp còn ba mươi bước, nỏ thủ Đại Càn đang loay hoay nạp tiễn, hàng ngàn đao phủ từ gầm xe phóng ra chém đứt dây cung và cắt cổ xạ thủ.'
    },
    disruptionTechniques: {
      signalJamming: 'Tạo tiếng rít chói tai của còi gió lấn át nhịp trống \"Cắc - Tùng\" của Nhạn Hành Trận, làm rối loạn nhịp giương cung và buông dây.',
      psychologicalWar: 'Hò reo chế giễu sau mỗi đợt tên rơi vào mai rùa vô hại, làm nỏ thủ Tiên Triều hoang mang tiêu phí cạn kiệt kho tên dự trữ.',
      antiMechanicTrap: 'Ném Lưới Móc Sắt giật tung các cọc chống khiên của tổ ba người bên phía Đại Càn.'
    },
    specializedUnits: ['Thiết Quy Xa Đội', 'Yên Vụ Đao Thủ', 'Mãnh Hổ Trảm Đao Binh'],
    optimalTerrain: ['Đất cát bụi bặm', 'Đoạn đường dốc ngược lên đồi'],
    keyTurningPoint: 'Khi kho tên của Nhạn Hành Trận cạn kiệt sau mười đợt bắn vô vọng vào các phiến giáp vát nghiêng.',
    battleExcerpt: `\"Bắn!\" — Tiếng hô chấn động từ dàn nỏ Nhạn Hành của Tiêu Cảnh vừa vang lên, một vạn mũi tên thép đã rít gào xé gió bay vút lên không trung.

Nhưng đối thủ của họ không phải là những tấm thân trần trụi. Từ phía đối diện, một cơn lốc mù mịt bột đá vôi và hắc yên cuồn cuộn thổi ngược trở lại, che kín tầm nhìn của hàng ngàn thiện xạ. Ngay sau đó là tiếng \"KENG! KENG! ROẠC!\" chát chúa vang lên không ngớt.

Một vạn mũi tên cắm phập vào những chiếc mai rùa bằng thép vát nghiêng bốn mươi lăm độ trượt dài bay ra ngoài khoảng không vô hại. Năm đợt... mười đợt tên rải ra chỉ cắm đầy mặt đất! 

Khi ống tên của binh sĩ Tiên Triều trống rỗng, màn khói bỗng rẽ đôi. Hàng ngàn lưỡi trảm mã đao sáng loáng từ gầm xe lao vút ra như đàn báo đói; các nỏ thủ Tiên Triều chưa kịp rút đoản đao phòng thân đã bị chém gục tại chỗ, đàn nhạn kiêu hãnh gãy cánh rụng rơi tan tác!`
  },
  {
    id: 'anti_vien_phuong',
    name: 'Cửu Tinh Đoạn Thủy Phần Thi Trận (Trận Vây Hãm Chết Ngạt)',
    alias: 'Huyền Vũ Nạo Giáp • Tuyệt Thủy Phần Thi',
    countersTarget: 'Viên Trận & Phương Trận (Trận Vòng Tròn Khép Kín Huyền Vũ Bất Hoại)',
    category: 'Phá Thuẫn Đập Mai',
    symbol: '⛓️',
    corePhilosophy: 'Phương Trận 360 độ phòng thủ kiên cố như mai rùa, nhưng tử huyệt lớn nhất là BẤT ĐỘNG và TIÊU PHÍ NƯỚC UỐNG. Tuyệt đối không đánh vỗ mặt vào rừng chông thép; hãy đào hào sâu ba vòng vây kín, cắt đứt long mạch nguồn nước ngầm, thả bọ độc và khói lưu huỳnh từ trên gió, biến khối sắt kiên cố thành nấm mồ tự chôn mình.',
    diagramText: `
          ══════════ [HÀO SÂU 3 TRƯỢNG CẮT NGUỒN NƯỚC] ══════════
               │                                            │
               │    ┌──────────────────────────────────┐    │
          [KHÓI ĐỘC]│    [PHƯƠNG TRẬN HUYỀN VŨ BỊ VÂY] │[ĐÁ LỬA]
          LƯU HUỲNH │    [Binh Sĩ Khát Khô & Say Nắng] │BẮN VÀO
               │    └──────────────────────────────────┘    │
               │                                            │
          ══════════ [CUNG NỎ BẮN TỈA KẺ MỞ ĐƯỜNG MÁU] ══════════
    `,
    stepByStepManeuvers: {
      phase1: 'Rút lui giả vờ thua chạy để Phương Trận co cụm thành một khối hộp sắt bất động tại bãi đất trống.',
      phase2: 'Bố trí công binh đào chiến hào tròn sâu ba trượng cách trận địa 200 bước, rải bẫy chông ngăn địch phá vây; phái kỳ binh chặn mọi con suối và giếng nước xung quanh.',
      phase3: 'Dùng máy bắn đá quăng các tảng đá lửa và bình lưu huỳnh cháy âm ỉ vào lòng Phương Trận, nung nóng không khí bên trong khiến binh sĩ chết ngạt và say nắng.'
    },
    disruptionTechniques: {
      signalJamming: 'Tung tin đồn giả mạo bằng loa đồng: viện binh của Đại Càn đã bị tiêu diệt sạch, triều đình đã bỏ rơi cánh quân này.',
      psychologicalWar: 'Nướng thịt dê và đổ rượu thơm xuôi chiều gió về phía quân địch đang đói khát kiệt quệ sau ba ngày đêm cố thủ.',
      antiMechanicTrap: 'Dùng nỏ công thành bắn dây xích có ngạnh móc vào các tấm cự thuẫn ngoài cùng rồi dùng đàn trâu mộng kéo giật tung bức tường khiên.'
    },
    specializedUnits: ['Đoạn Thủy Công Binh', 'Hỏa Thạch Trọng Pháo Đội', 'Mãng Xà Độc Tiễn Doanh'],
    optimalTerrain: ['Đồng khô nắng cháy', 'Vùng đất khô hạn không có sông suối', 'Bình nguyên đá sỏi'],
    keyTurningPoint: 'Sau 48 canh giờ bị cắt nước dưới trời nắng gắt, giáp trụ nặng nề trở thành gánh nặng ngàn cân đè bẹp sức chịu đựng của phàm nhân.',
    battleExcerpt: `Ba ngàn Thiết Giáp Trọng Thuẫn của Tiêu Cảnh khóa chốt liên hoàn, dựng thành một khối Phương Trận sừng sững như pháo đài thép. Bất kỳ đợt kỵ binh nào lao vào cũng chỉ để lại xác chết trước rừng giáo nhọn.

Thế nhưng, quân liên minh không thèm tấn công nữa. Họ thong thả lui ra ngoài hai trăm bước, đào một vòng hào sâu ngập đầu người bao quanh pháo đài thép. Con suối duy nhất chảy qua thung lũng bị chặn dòng và đổ đầy bột thuốc độc.

Mặt trời trên đỉnh đầu thiêu đốt như muốn nung chảy đá sỏi. Trong chiếc hộp sắt kín mít, nhiệt độ bốc lên ngùn ngụt như một cái chõ đồ xôi khổng lồ. Binh sĩ Đại Càn mồ hôi tuôn như tắm, cổ họng khô khốc nứt nẻ chảy máu, giáp sắt nặng trăm cân giờ đây như ngọn núi đè gãy sống lưng. 

Từng người lính kiệt sức ngã gục ngay dưới chân khiên mà không cần một mũi tên nào bắn trúng. Tòa thành bất khả xâm phạm sụp đổ từ bên trong bởi sự ngột ngạt và khát cháy tột cùng!`
  },
  {
    id: 'anti_toa_long',
    name: 'Cửu Tiêu Ảo Hóa Lôi Đình Trận (Trận Lừa Xích Đánh Đỉnh)',
    alias: 'Hóa Ảnh Tru Cọc • Phá Tỏa Long Trận',
    countersTarget: 'Cửu Châu Tỏa Long Trận (Trận Dùng Xích Sắt & Cọc Đồng Bắt Tu Sĩ)',
    category: 'Phá Lưới Giải Khốn',
    symbol: '⚡',
    corePhilosophy: 'Tỏa Long Trận dựa vào 9 Cọc Phá Linh đóng xuống đất và lưới xích sắt dính máu chó mực để dập tắt linh khí tu sĩ khi họ hạ thấp độ cao. Cách phá là: Dùng Phân Thân Huyễn Ảnh mang linh thạch giả rơi xuống mồi nhử cho địch quăng hết xích, còn bản thể ngự kiếm ở độ cao chín tầng mây dùng Thiên Lôi dẫn nổ 9 cọc đồng từ trên không trung.',
    diagramText: `
          ☁️ ☁️ ☁️ [TU SĨ NGỰ KIẾN TRÊN CHÍN TẦNG MÂY (NGOÀI TẦM NỎ)]
                 │
                 ▼ [THIÊN LÔI & THIÊN THẠCH ĐÁNH THẲNG XUỐNG CỌC ĐỒNG]
                 │
          ═══════╪════════════════════════════════════════════════
                 │
          [ẢO ẢNH GIẢ RƠI XUỐNG DỤ ĐỊCH QUĂNG LƯỚI]
                 ▼
          [ĐẠI CÀN: 9 Cọc Đồng Hút Nhầm Ảo Ảnh & Bị Quả Báo Lôi Nổ Tung]
    `,
    stepByStepManeuvers: {
      phase1: 'Thả 9 con Bù Nhìn Linh Hạc gắn đá linh thạch cấp thấp lao xuống tầm thấp ba trượng nhử tướng sĩ Tiên Triều tưởng là tu sĩ chân chính.',
      phase2: 'Chờ quân Đại Càn kích hoạt hết huyết sát và phóng toàn bộ 9 sợi xích khóa chặt lấy bù nhìn giả.',
      phase3: 'Từ trên tầng mây thứ chín, tu sĩ bản thể tế xuất Cửu Thiên Dẫn Lôi Kiếm, phóng thẳng chín đạo sấm sét vào chín cọc đồng thau; cọc đồng dẫn sét nổ tung làm chết cháy toàn bộ tráng sĩ đang nắm giữ đầu xích sắt.'
    },
    disruptionTechniques: {
      signalJamming: 'Rải Bụi Huỳnh Quang chói lóa làm mù mắt các nỏ thủ Phá Linh ngắm bắn dưới mặt đất.',
      psychologicalWar: 'Truyền âm ngàn dặm làm chấn động tâm can: \"Chư thần trên trời bất tử, phàm nhân vọng tưởng khóa rồng chỉ rước lấy họa tru di!\"',
      antiMechanicTrap: 'Dùng Bùa Ăn Mòn Kim Loại (Thiên Cốt Hủ Thực Thủy) nhỏ giọt từ trên mây làm mục nát các mắt xích sắt ngâm máu.'
    },
    specializedUnits: ['Huyễn Ảnh Phù Sư', 'Ngự Lôi Kiếm Tu', 'Thiên Phong Thao Khí Sĩ'],
    optimalTerrain: ['Đỉnh núi cao thoáng đãng', 'Quảng trường trống trải không có mái che'],
    keyTurningPoint: 'Khoảnh khắc sấm sét từ mây xanh đánh thẳng vào chín cọc đồng biến vũ khí khóa linh thành chiếc bẫy tự sát dẫn lôi giật chết quân Tiên Triều.',
    battleExcerpt: `Chín chiếc cọc đồng của Tỏa Long Trận cắm phập xuống đất, hào quang màu máu đỏ rực bốc lên bao trùm bóng dáng một tu sĩ áo trắng đang ngự kiếm hạ xuống.

\"Quăng xích! Khóa đan điền!\" — Tướng lĩnh Đại Càn gầm lên đắc thắng.

Chín sợi xích sắt khổng lồ rít lên quấn chặt lấy thân ảnh áo trắng. Nhưng nụ cười của họ lập tức đông cứng khi thân ảnh kia tan biến thành một làn khói trắng — đó chỉ là một con hạc giấy phù phép!

\"Khốn kiếp! Là ảo ảnh! Mau buông xích...!\"

Tiếng hét chưa dứt thì từ trên tầng mây cao vạn trượng, một đạo lôi đình màu tím thẫm to như cột đình giáng thẳng xuống đất. Chín chiếc cọc đồng thau trở thành vật dẫn sét hoàn hảo nhất trần đời! Điện quang rực sáng xé toạc võng mạc, truyền thẳng qua chín sợi xích sắt nung chảy trong chớp mắt. Ba ngàn tráng sĩ lực lưỡng đang giữ xích bị dòng điện vạn volt xé rách kinh mạch, cháy thành than đen gục ngã la liệt trên mặt đất nứt toác!`
  },
  {
    id: 'anti_phong_hong',
    name: 'Địa Long Xuyên Sơn Bạt Hỏa Trận (Trận Độn Thổ Cướp Pháo)',
    alias: 'Độn Địa Diệt Pháo • Bạt Nòng Đoạt Hỏa',
    countersTarget: 'Phong Hống Phá Thiên Trận (Trận 50 Cỗ Chấn Thiên Phá Linh Cự Pháo)',
    category: 'Đoạt Mạng Hậu Quân',
    symbol: '🧨',
    corePhilosophy: 'Đại pháo cơ quan uy lực kinh thiên động địa nhưng CỰC KỲ NẶNG NỀ và DỄ PHẢN PHỆ KHI NỔ KHO ĐẠN. Không thể cho bộ binh xung kích đối diện nòng pháo; giải pháp tuyệt đối là: Dùng Chuột Độn Thổ và Địa Sát Thích Khách đào đường ngầm luồn thẳng xuống đáy trận địa pháo, kích nổ kho thuốc súng từ dưới lòng đất.',
    diagramText: `
          [NÒNG PHÁO TIÊN TRIỀU HƯỚNG VỀ PHÍA TRƯỚC BẮN OANH TẠC]
                 ▲    ▲    ▲    ▲
          ════════════════════════════════════════════════
          [ĐỊA ĐẠO NGẦM ĐÀO SÂU DƯỚI CHÂN TRẬN ĐỊA PHÁO]
                 │
                 ▼ [KÍCH NỔ KHO THUỐC SÚNG & ĐẠN PHÙ TỪ BÊN DƯỚI]
          ════════════════════════════════════════════════
          [Toàn Bộ 50 Cỗ Pháo Bị Hất Văng Xuống Hố Sụt Lún]
    `,
    stepByStepManeuvers: {
      phase1: 'Xây dựng trận địa phòng ngự giả ở cự ly năm dặm để thu hút tầm ngắm của năm mươi cỗ cự pháo xả đạn.',
      phase2: 'Đội Độn Địa Quân dùng Xuyên Sơn Giáp và Thổ Độn Phù bí mật đào hầm ngầm luồn dưới lòng đất, tiến sát ngay dưới chân kho đạn dược và bệ đỡ pháo.',
      phase3: 'Đục thủng đáy hầm chứa thuốc súng, rải Cát Bụi Dị Hỏa kích nổ hàng ngàn hòm đạn dược lôi hỏa; tạo ra chuỗi nổ dây chuyền hất tung toàn bộ trận địa pháo lên trời.'
    },
    disruptionTechniques: {
      signalJamming: 'Bắn Mực Khói Đen bao phủ toàn bộ kính ngắm thiên cơ của pháo thủ, khiến họ bắn trượt mục tiêu hàng dặm.',
      psychologicalWar: 'Gieo rắc tin đồn nòng pháo đúc bằng sắt vụn dễ nổ nòng (tạc膛) làm pháo thủ run tay không dám giật dây lôi hỏa.',
      antiMechanicTrap: 'Ném Hạt Cát Kim Cương siêu nhỏ vào các rãnh xoắn và trục quay góc bắn làm kẹt cứng bánh răng cơ quan.'
    },
    specializedUnits: ['Địa Xuyên Xuyên Sơn Doanh', 'Hỏa Lôi Cảm Tử Thích Khách', 'Ngự Thổ Vu Tộc'],
    optimalTerrain: ['Đất đồi tơi xốp dễ đào hầm', 'Khu vực bãi đá có khe nứt tự nhiên'],
    keyTurningPoint: 'Khi kho đạn dược của Tiên Triều bị nổ ngược từ bên trong, tiếng nổ san bằng toàn bộ hậu quân pháo binh trong một cột lửa khổng lồ.',
    battleExcerpt: `Năm mươi cỗ Chấn Thiên Phá Linh Cự Pháo của Tiêu Cảnh đang gầm vang như sấm dậy, từng quả cầu lửa hủy diệt dội xuống làm sụp đổ các ngọn đồi phía xa. Các pháo thủ hò reo phấn khích, liên tục lau nòng nạp đạn thạch bích.

Đột nhiên, mặt đất dưới chân kho đạn dự trữ rung lên bần bật. 

\"Phụt! Phụt!\"

Hàng chục chiếc móng vuốt thép sắc nhọn xé toạc lớp đất đá trồi lên. Trước khi đội vệ binh kịp rút gươm, mười mấy bóng đen mặc áo da chuột trũi đã ném những ống lôi hỏa đang cháy đỏ rực vào thẳng giữa hàng trăm thùng thuốc nổ huyền thiết!

\"ẦM ẦM ẦM ẦM ẦM...!\"

Một tiếng nổ long trời lở đất vang lên xé rách không gian! Một cột lửa hình nấm cao hàng trăm trượng bốc thẳng lên trời xanh. Năm mươi cỗ cự pháo nặng vạn cân bị sóng xung kích hất tung lên không trung như những món đồ chơi trẻ con rồi rơi vỡ tan tành. Niềm tự hào cơ quan hỏa khí của Tiên Triều biến thành một biển lửa thiêu rụi chính hậu phương của họ!`
  },
  {
    id: 'anti_long_xa',
    name: 'Đoạn Khúc Trảm Xà Khóa Khớp Trận (Trận Đóng Cọc Chặt Khúc Rắn)',
    alias: 'Thốn Đoạn Trường Xà • Phá Long Xà Uyển Chuyển',
    countersTarget: 'Long Xà Lượn Sóng Trận (Trận Di Chuyển Uốn Lượn Luân Phiên)',
    category: 'Triệt Hạ Tiên Phong',
    symbol: '🐍',
    corePhilosophy: 'Trận hình dài ngoằng uốn lượn như rắn có ưu thế đánh đầu thì đuôi ứng cứu, đánh đuôi thì đầu quấn lại. Điểm yếu là RẤT DỄ BỊ CHIA CẮT TẠI CÁC KHÚC EO. Bằng cách chôn hàng cọc thép liên hoàn chặn ngang lưng rắn, chia cắt thân rắn thành ba đoạn cô lập rồi bao vây bóp chết từng đoạn một.',
    diagramText: `
          [ĐẦU RẮN] ─── [KHÚC EO 1] ─── [BỤNG RẮN] ─── [KHÚC EO 2] ─── [ĐUÔI RẮN]
                            │                             │
                      [CỌC THÉP ĐÓNG PHẬP]          [CỌC THÉP ĐÓNG PHẬP]
                            │                             │
               ▼▼▼ VÂY ĐÁNH ĐẦU           ▼▼▼ VÂY ĐÁNH BỤNG          ▼▼▼ VÂY ĐÁNH ĐUÔI
    `,
    stepByStepManeuvers: {
      phase1: 'Dùng một đội khinh binh khiêu chiến đầu rắn rồi bỏ chạy vào hẻm đá hẹp để kéo dài thân rắn ra tối đa.',
      phase2: 'Khi thân rắn bị kéo căng, hạ các rào cọc gỗ sắt nặng ngàn cân từ hai bên vách núi chặn đứng hai điểm thắt lưng rắn.',
      phase3: 'Đầu rắn không quay lại được, đuôi rắn không tiến lên được; tập trung quân số gấp ba lần nghiền nát từng khúc cô lập.'
    },
    disruptionTechniques: {
      signalJamming: 'Chặt đứt đường truyền cờ lệnh chạy dọc thân rắn bằng các cung thủ bắn tỉa phục kích trên cây.',
      psychologicalWar: 'Hô to: \"Đầu rắn đã bị chém rơi! Bụng rắn mau đầu hàng để giữ mạng!\"',
      antiMechanicTrap: 'Rải Dầu Trơn dọc đường di chuyển khiến hàng quân uốn lượn bị trượt ngã dồn toa đè lên nhau.'
    },
    specializedUnits: ['Trảm Đoạn Thiết Kích Doanh', 'Thần Nỏ Phục Kích Tầm Cao', 'Thiết Trụ Tráng Sĩ'],
    optimalTerrain: ['Đoạn đường hẻm núi quanh co', 'Đường đèo độc đạo ven sông'],
    keyTurningPoint: 'Khi hai khối cọc thép sập xuống chia cắt đội hình Tiên Triều thành ba cụm không thể nhìn thấy nhau.',
    battleExcerpt: `Long Xà Trận của Đại Càn uốn lượn qua khe núi như một con cự mãng khổng lồ, vảy thép lấp lánh đe dọa quân thù. Thế nhưng khi đầu rắn vừa chui qua khúc ngoặt, một tiếng nổ long trời phát ra từ vách đá.

Hai khối cự thạch nặng vạn cân cùng hàng trăm cọc sắt khổng lồ rơi ầm ầm từ trên đỉnh đèo xuống, cắm phập vào giữa khúc eo đội hình!

Con rắn dài ngoằng bỗng chốc bị chặt đứt làm ba đoạn. Đầu rắn muốn quay lại cứu viện nhưng trước mặt là một bức tường đá chặn kín; đuôi rắn phía sau hoảng loạn dẫm đạp lên nhau vì không có soái kỳ dẫn dắt. Quân phục kích từ trên hai sườn núi dội mưa tên và đá lửa xuống khúc bụng rắn đang mắc kẹt; con quái thú kiêu dũng bị xẻ thịt từng mảnh trong tuyệt vọng!`
  },
  {
    id: 'anti_cuu_khuc',
    name: 'Đoạt Mạch Chuyển Lưu Độc Sa Trận (Trận Độc Hóa Dòng Sông)',
    alias: 'Huyết Sa Nghịch Dòng • Phá Cửu Khúc Hoàng Hà',
    countersTarget: 'Cửu Khúc Hoàng Hà Tiên Trận (Trận Sa Bàn Phong Thủy của Tiêu Cảnh)',
    category: 'Nghịch Chuyển Kỳ Môn',
    symbol: '🌊',
    corePhilosophy: 'Cửu Khúc Hoàng Hà dựa vào dòng chảy tự nhiên và thế đất phong thủy của 9 khúc sông để vùi dập sinh lực địch. Bí quyết hóa giải là: Đóng cọc ô uế (Hắc Huyết Đinh) tại thượng nguồn long mạch, đổ tro xác yêu thú và chu sa độc làm biến đổi dòng chảy phong thủy thành nguồn ô trọc phản phệ ngược lại người lập trận.',
    diagramText: `
          [THƯỢNG NGUỒN LONG MẠCH] ──▶ ĐÓNG CỌC Ô UẾ (HẮC HUYẾT ĐINH)
                     │
                     ▼ [DÒNG NƯỚC BIẾN THÀNH HUYẾT ĐỘC NGHỊCH CHUYỂN]
                     │
          [CỬU KHÚC TRẬN BÀN CỦA ĐẠI CÀN BỊ PHẢN PHỆ NỔ TUNG]
                     │
          [Quân Sĩ Tiên Triều Trúng Khí Độc Thổ Huyết Hàng Loạt]
    `,
    stepByStepManeuvers: {
      phase1: 'Tìm ra huyệt nhãn thủy mạch thượng nguồn cấp nước cho trận địa Cửu Khúc.',
      phase2: 'Bí mật cắm chín cây Hắc Huyết Ma Đinh tẩm độc xác cổ thi xuống đáy nguồn.',
      phase3: 'Dòng nước vàng óng của Hoàng Hà biến thành dòng máu đen ngòm; khi Tiêu Cảnh vận chuyển trận bàn, khí ô uế xộc thẳng vào tâm mạch khiến trận bàn nổ tung.'
    },
    disruptionTechniques: {
      signalJamming: 'Dùng chuông đồng Ô Hồn làm biến dạng sóng âm cộng hưởng của dòng nước.',
      psychologicalWar: 'Tung tin rồng thiêng dưới sông đã chết vì giận dữ trước sự bạo ngược của Tiên Triều.',
      antiMechanicTrap: 'Thả gỗ trôi sông bọc đinh sắt làm kẹt các guồng nước cơ quan nâng hạ cống xả nước.'
    },
    specializedUnits: ['U Hồn Độc Sĩ', 'Thủy Quỷ Ám Sát Doanh', 'Địa Mạch Phong Thủy Sư Tà Đạo'],
    optimalTerrain: ['Lòng sông nhiều thác ghềnh', 'Vùng châu thổ có mạch nước ngầm lộ thiên'],
    keyTurningPoint: 'Thời điểm dòng nước Hoàng Hà đổi sang màu đen tím, trận bàn của các trận sư Đại Càn rạn nứt vì khí sát phản phệ.',
    battleExcerpt: `Tiêu Cảnh đứng trên bờ đê, tay xoay trận bàn định dẫn dòng nước lũ cuồn cuộn của chín khúc sông nhấn chìm đại quân tông môn. 

Bỗng nhiên, mặt nước sủi bọt ùng ục như chảo dầu sôi. Một mùi tanh hôi nồng nặc bốc lên ngút trời. Dòng nước phù sa vàng óng bỗng chốc đổi sang màu tím đen tanh tưởi! 

\"RẮC!\" 

Chiếc trận bàn bằng ngọc thạch trên tay Tiêu Cảnh nứt toác một đường dài, máu tươi từ khe nứt trào ra làm bỏng rát lòng bàn tay hắn. Hóa ra thượng nguồn long mạch đã bị kẻ địch đóng chín cây Hắc Đinh ô uế! Dòng sông cuồng nộ không còn nghe theo hiệu lệnh của Tiên Triều nữa mà quay đầu cuốn trôi hàng loạt trại lính biên ải; đại trận ngàn năm phút chốc biến thành tai ương tự giáng xuống đầu mình!`
  },
  {
    id: 'anti_luc_hop',
    name: 'Bạt Môn Phá Giác Cuồng Bạo Trận (Trận Đập Góc Xé Lưới)',
    alias: 'Điểm Phá Lục Diện • Khắc Tinh Lục Hợp',
    countersTarget: 'Lục Hợp Khóa Ma Trận (Trận Lồng Sắt Sáu Mặt Bắt Đại Ma Đầu)',
    category: 'Phá Lưới Giải Khốn',
    symbol: '📦',
    corePhilosophy: 'Lục Hợp Trận khóa sáu hướng: Đông, Tây, Nam, Bắc, Thiên, Địa. Để duy trì sự cân bằng của sáu mặt, khí lực phải chia đều. Điểm yếu là: NẾU TẬP TRUNG 100% HỎA LỰC VÀO DUY NHẤT MỘT GÓC NHỌN (Giao điểm giữa ba mặt), cấu trúc lồng sắt sẽ bị xé toạc do mất cân bằng lực nội tại.',
    diagramText: `
                 [MẶT THIÊN: TRỜI]
               ╱         │         ╲
      [MẶT BẮC] ─── ▶ [ĐẬP NÁT GÓC TÂY BẮC] ◀ ─── [MẶT ĐÔNG]
               ╲         │         ╱
                 [MẶT ĐỊA: ĐẤT]
        ══════════════════════════════════════════════
        (Chỉ đập duy nhất một đỉnh nhọn, toàn bộ 6 mặt sụp đổ dây chuyền)
    `,
    stepByStepManeuvers: {
      phase1: 'Thu mình lại giữa tâm lồng, tạo ảo giác đang bị kiềm tỏa hoàn toàn để địch buông lỏng cảnh giác.',
      phase2: 'Bất ngờ dồn toàn bộ khí huyết và pháp bảo công kích cực đại vào đúng điểm giao giữa mặt Bắc và góc Tây mặt Đất.',
      phase3: 'Khi góc Tây Bắc bị thủng một lỗ, hiệu ứng dây chuyền làm đứt gãy dòng chảy trận pháp của năm mặt còn lại, lồng sắt vỡ tan thành trăm mảnh.'
    },
    disruptionTechniques: {
      signalJamming: 'Phát ra âm thanh siêu trầm phá vỡ sự đồng bộ nhịp thở giữa các trận binh ở sáu mặt.',
      psychologicalWar: 'Chế giễu sự gò bó của lồng sắt, kích động tướng chỉ huy mặt Bắc nôn nóng khép chặt sớm tạo sơ hở.',
      antiMechanicTrap: 'Dùng Khí Phá Phong đóng chốt vào các khe khớp nối ngăn sáu mặt liên kết với nhau.'
    },
    specializedUnits: ['Đoạt Cực Trọng Kích Doanh', 'Kỳ Môn Toái Giác Sĩ', 'Thiên Ma Cảm Tử Binh'],
    optimalTerrain: ['Hẻm núi dốc đứng', 'Khoảng không gian hẹp'],
    keyTurningPoint: 'Khi góc Tây Bắc vỡ tung, năm mặt còn lại bị lực đàn hồi văng ngược đè bẹp chính quân đội Tiên Triều.',
    battleExcerpt: `Sáu bức tường khiên ánh sáng của Lục Hợp Trận từ sáu phương từ từ khép lại, biến không gian xung quanh vị ma vương thành một chiếc hộp tử thần không có lối thoát. Các trận sư Đại Càn mồ hôi đầm đìa, dốc cạn chân khí duy trì sự kiên cố của chiếc lồng.

Nhưng vị thống soái ma tộc không hề vùng vẫy tứ phía. Hắn nhắm nghiền mắt, dồn toàn bộ ma khí cuồn cuộn vào mũi kích đen nhánh trên tay. 

\"Phá cho ta! Điểm Tây Bắc!\"

Một tiếng gầm rống chấn động càn khôn! Toàn bộ sức mạnh hủy diệt không phân tán mà cô đọng thành một điểm sáng bằng hạt đậu giáng thẳng vào khớp nối góc Tây Bắc chiếc lồng. 

\"XOẢNG!\" 

Chiếc lồng ánh sáng nứt toác như thủy tinh vỡ vụn. Lực phản chấn kinh hoàng hất văng hàng ngàn trận binh của sáu mặt trận lộn nhào trên không, máu phun như mưa; chiếc lồng sắt kiêu hãnh của Đại Càn tan thành mây khói chỉ sau một đòn tập trung duy nhất!`
  },
  {
    id: 'anti_thien_tinh',
    name: 'Tán Vân Chiêu Nguyệt Ẩn Hình Trận (Trận Mây Mù Bịt Mắt Sao)',
    alias: 'Hắc Dạ Già Thiên • Phá Thập Bát Tinh Trận',
    countersTarget: 'Thập Bát Tinh Trận (Trận Dẫn Lực Tinh Tú Ban Đêm của Tiêu Cảnh)',
    category: 'Nghịch Chuyển Kỳ Môn',
    symbol: '🌑',
    corePhilosophy: 'Tinh tú trận chỉ phát huy sức mạnh khi nhìn thấy trời đêm và ánh sao Bắc Đẩu. Bí thuật khắc chế: Tế xuất U Minh Ma Vân che kín vòm trời mười dặm, biến đêm sao sáng thành đêm tối đen như mực không một tia sáng lọt qua, cắt đứt hoàn toàn nguồn tiếp năng lượng từ các vì tinh tú.',
    diagramText: `
          ✨ ✨ ✨ [ÁNH SAO BẮC ĐẨU TRÊN TRỜI CAO]
          ════════════════════════════════════════════════
          ☁️ ☁️ ☁️ [MÀN MÂY ĐEN U MINH MA VÂN CHE KÍN BẦU TRỜI]
          ════════════════════════════════════════════════
          [ĐẠI CÀN: TRẬN BÀN TINH TÚ MẤT TÍN HIỆU TẮT LỊM]
                      ▼▼▼
          [TẬP KÍCH ĐÊM TỐI VÀO DOANH TRẠI MẤT ĐÈN TRỜI]
    `,
    stepByStepManeuvers: {
      phase1: 'Đốt cỏ Hắc Dạ Thảo kết hợp với trận pháp Già Thiên tạo ra tầng mây đen dày đặc che lấp hoàn toàn bầu trời đêm.',
      phase2: 'Khi ánh sao bị ngắt quãng, trận bàn Thập Bát Tinh Đồ của Tiêu Cảnh lập tức mất liên lạc và tắt ngúm ánh sáng.',
      phase3: 'Tận dụng bóng đêm mù mịt, tung sát thủ mang kính nhìn đêm bằng mắt mèo tập kích vào lều trung tâm chỉ huy.'
    },
    disruptionTechniques: {
      signalJamming: 'Bắn các quả cầu huỳnh quang giả mạo các chòm sao làm các trận sư Tiên Triều tính toán sai lệch góc độ phong thủy.',
      psychologicalWar: 'Thổi sáo U Hồn ai oán trong đêm đen làm quân sĩ Tiên Triều hoảng loạn mất ngủ.',
      antiMechanicTrap: 'Dội nước bùn vào các gương phản chiếu tinh quang đặt trên các đài quan sát sao.'
    },
    specializedUnits: ['Dạ Hành U Linh Doanh', 'Già Thiên Thuật Sĩ', 'Miêu Nhãn Thích Khách'],
    optimalTerrain: ['Đêm không trăng', 'Thung lũng kín gió giữ mây'],
    keyTurningPoint: 'Thời điểm màn mây đen che kín chòm sao Thiên Xu, nguồn năng lượng ánh sáng của Tiên Triều tắt lịm hoàn toàn.',
    battleExcerpt: `Màn đêm buông xuống, mười tám cột ánh sáng bạc từ chòm sao Bắc Đẩu đang rót xuống trận địa Đại Càn biến doanh trại của họ sáng rực như ban ngày. Tiêu Cảnh mỉm cười tự tin chờ đợi kẻ thù sa lưới.

Bỗng nhiên, từ bốn phương tám hướng, những làn khói đen kịt như mực tàu cuộn trào bốc lên. Khói bay tới đâu, ánh trăng sao bị nuốt chửng tới đó. Chỉ trong ba khắc, cả bầu trời biến thành một chiếc vung nồi đen kịt úp sụp xuống trần gian.

Mười tám cột sáng tinh tú lập tức chập chờn rồi lịm tắt! Trận bàn trên tay các học sĩ Tiên Triều trở nên đen ngòm nguội lạnh. 

\"Không nhìn thấy sao trời! Trận pháp mất linh rồi!\" — Tiếng la hoảng hốt vang lên. 

Bóng tối dày đặc như chực bóp nghẹt từng người. Trong màn đêm đen nhánh ấy, hàng ngàn cặp mắt xanh lét của thích khách dạ hành đã xuất hiện ngay sát mép lều, những lưỡi dao tẩm độc lạnh ngắt bắt đầu công việc gặt hái sinh mạng trong thinh lặng rợn người!`
  },
  {
    id: 'anti_cuu_tieu_loi',
    name: 'Tị Lôi Dẫn Điện Quy Thổ Trận (Trận Kim Châm Hút Sét Về Đất)',
    alias: 'Hóa Lôi Nhập Địa • Triệt Tiêu Lôi Bạo',
    countersTarget: 'Cửu Tiêu Lôi Đình Phá Ma Trận (Trận Triệu Hồi Sấm Sét Oanh Tạc Ma Binh)',
    category: 'Phá Lưới Giải Khốn',
    symbol: '⚡',
    corePhilosophy: 'Sấm sét tuy hung hãn nhưng bản tính tự nhiên là luôn tìm đường dẫn ngắn nhất có điện trở thấp nhất để truyền xuống đất. Thay vì giương khiên đỡ sét để bị giật chết, ta cắm hàng ngàn cọc đồng nhọn bọc than chì xuống đất (Kim Châm Dẫn Lôi), biến sấm sét của Tiên Triều thành luồng điện vô hại tiêu tán trong lòng đất.',
    diagramText: `
          ⚡ ⚡ ⚡ [LÔI BẠO TỪ TRÊN MÂY GIÁNG XUỐNG CÙNG LÚC]
                 │        │        │
                 ▼        ▼        ▼
          [RỪNG CỌC ĐỒNG THAN CHÌ CẮM SÂU XUỐNG ĐẤT]
                 │        │        │
          ═══════╧════════╧════════╧══════════════════════
          [DÒNG ĐIỆN TIÊU TÁN HOÀN TOÀN TRONG LÒNG ĐẤT]
                 ▼
          (Quân đội phía sau cọc đồng an toàn tuyệt đối xung phong)
    `,
    stepByStepManeuvers: {
      phase1: 'Quan sát mây đen tích điện của trận lôi bão Tiên Triều, nhanh chóng cắm mạng lưới cọc đồng nối dây xích sắt xuống rãnh than ẩm.',
      phase2: 'Binh sĩ khoác áo tơi bằng da thú khô quét dầu (chất cách điện tuyệt đối) đứng nép phía sau mạng lưới dẫn sét.',
      phase3: 'Khi sấm sét dội xuống bị cọc đồng hút cạn, quân Tiên Triều vừa cạn kiệt chân khí sau đợt tế lôi; lập tức tràn lên tiêu diệt trận địa pháp sư địch.'
    },
    disruptionTechniques: {
      signalJamming: 'Tạo khói than chì phân tán điện tích trong không khí, làm giảm 70% điện áp sét đánh.',
      psychologicalWar: 'Đứng hiên ngang giữa sấm sét không hề hấn gì, làm pháp sư Tiên Triều kinh hồn bạt vía tưởng địch có thân kim cương bất hoại.',
      antiMechanicTrap: 'Bắn tên bọc dây đồng móc vào bệ phóng lôi phù của địch làm sét đánh ngược trở lại người điều khiển.'
    },
    specializedUnits: ['Tị Lôi Kim Châm Quân', 'Da Thú Cách Điện Vệ', 'Tru Lôi Phản Kích Kỵ Binh'],
    optimalTerrain: ['Đỉnh đồi trọc', 'Bãi đất trống có độ ẩm cao'],
    keyTurningPoint: 'Khi đạo sét thứ chín giáng xuống bị cọc đồng nuốt chửng xuống lòng đất mà không làm chết một tên lính nào.',
    battleExcerpt: `Mây đen cuồn cuộn vần vũ, chín đạo thiên lôi tím ngắt từ trận đồ Cửu Tiêu của Tiêu Cảnh rít gào bổ xuống đầu liên minh tông môn. Tiếng sấm nổ vang trời khiến đất đá vỡ vụn, uy lực tưởng chừng có thể san bằng một quả núi.

Thế nhưng, giữa bãi chiến trường, hàng ngàn cây cọc đồng bọc than chì đã được cắm sâu xuống đất từ bao giờ. 

\"XOẸT! ĐÙNG!\"

Những luồng sét hủy diệt vừa lao xuống khỏi tầng mây liền bị hút cong quỹ đạo, cắm phập thẳng vào đầu những chiếc cọc kim loại rồi truyền rào rào xuống lòng đất sâu hun hút. Mặt đất bốc khói xì xèo, nhưng hàng vạn chiến sĩ khoác áo da thú khô đứng phía sau vẫn bình an vô sự!

Nhìn thấy đại chiêu dốc cạn linh thạch ngàn năm của mình bị hóa giải nhẹ nhàng như không, các trận sư Tiên Triều mặt cắt không còn một giọt máu. Chưa kịp hồi sức, cánh cửa thép mở toang, bão kỵ binh địch đã lao tới gặt phăng những cái đầu đang ngơ ngác!`
  }
];

// -------------------------------------------------------------------------
// 2. BINH CHỦNG TƯƠNG KHẮC (THỢ SĂN BINH CHỦNG ĐẠI CÀN)
// -------------------------------------------------------------------------
export const MASTER_ANTI_TROOP_BRANCHES: AntiTroopBranch[] = [
  {
    id: 'anti_huyen_giap',
    name: 'Trảm Mã Câu Liêm & Phá Giáp Trọng Chùy Doanh',
    alias: 'Thợ Săn Huyền Giáp • Khắc Tinh Cự Thuẫn',
    preysUpon: 'Huyền Giáp Trọng Thuẫn Doanh của Tiên Triều',
    icon: '🪓',
    lethalWeaponry: [
      'Câu Liêm Thương 7 thước có móc câu ngược giật khiên giật chân.',
      'Bát Giác Trọng Chùy bằng gang nặng 80 cân đập móp lồng ngực xuyên giáp sắt.',
      'Dây Thừng Kéo Khiên gắn mỏ neo ba chấu ném bằng nỏ.',
      'Bình Dầu Hỏa Địa Cốt nung nóng giáp sắt.'
    ],
    counterTactics: [
      'Không dùng đao kiếm chém vào mặt khiên vô ích; dùng mỏ neo quăng vào mép khiên rồi 5 người cùng giật mạnh mở toang hàng ngũ.',
      'Vung trọng chùy đập vào đầu gối và khớp tay của lính khiên khiến họ gãy xương buông tay.',
      'Đổ bùn trơn vào chỗ đứng của lính khiên làm họ mất điểm tựa trụ chân.'
    ],
    psychologicalEdge: 'Tiếng sắt thép vỡ vụn dưới sức nặng của búa tạ gieo rắc nỗi kinh hoàng cho những kẻ tưởng mình bất tử sau tấm khiên.',
    terrainExploitation: 'Dụ lính khiên nặng nề vào vùng đất trũng ngập bùn hoặc bãi đá gập ghềnh khiến họ chậm chạp như rùa cạn.',
    proseExcerpt: 'Tấm cự thuẫn huyền thiết dày ba tấc từng đỡ được mười phát tên bỗng rung lên bần bật dưới cú bổ sấm sét của cây Bát Giác Trọng Chùy. Kim loại móp méo lõm sâu vào trong, đè gãy nát xương sườn người lính phía sau. Chưa kịp ngã xuống, một chiếc câu liêm sắc nhọn đã móc vào cổ chân giật ngược, kéo lê người khổng lồ giáp sắt vào giữa bầy đao phủ!'
  },
  {
    id: 'anti_long_ky',
    name: 'Phược Kỵ Địa Lôi & Trảm Tiết Cự Mã Doanh',
    alias: 'Thợ Săn Phong Lôi Kỵ • Địa Ngục Của Ngựa Chiến',
    preysUpon: 'Phong Lôi Long Kỵ Doanh của Đại Càn',
    icon: '⛓️',
    lethalWeaponry: [
      'Địa Gai Tam Giác bốn ngạnh tẩm độc dơi làm thối móng ngựa.',
      'Dây chão bện gân tê giác (Bàn Mã Tác) kéo căng cao một thước giấu trong cỏ.',
      'Nỏ Bắn Lưới Sắt gắn chì nặng quấn chặt bốn vó ngựa.',
      'Ống Phun Bột Vôi Cay mù mắt chiến mã.'
    ],
    counterTactics: [
      'Giăng Bàn Mã Tác chéo góc ba mươi độ; khi Long Kỵ lao tới tốc độ cao, vấp dây chão sẽ lộn nhào gãy cổ hàng loạt.',
      'Rải hàng vạn đinh tam giác trên đường rút lui; ngựa chiến giẫm phải đinh sẽ quỵ ngã hất văng kỵ sĩ.',
      'Bắn bột vôi cay xuôi chiều gió làm ngựa phát điên hí lồng quay đầu dẫm đạp quân mình.'
    ],
    psychologicalEdge: 'Biến tốc độ phi nước đại — niềm tự hào lớn nhất của kỵ binh — thành chính lưỡi dao chặt đứt mạng sống của họ khi lộn nhào.',
    terrainExploitation: 'Khu rừng thưa có nhiều rễ cây ngoằn ngoèo và bờ ruộng bậc thang ngăn cản việc xếp hàng ngang phi nước đại.',
    proseExcerpt: 'Ba ngàn thiết kỵ lao đi trong tiếng gầm thét kiêu hãnh bỗng chốc rơi vào địa ngục trần gian. Vệt dây chão bện gân thú căng lên sát mặt đất chỉ trong nháy mắt đã quét qua hàng trăm cặp chân ngựa. Tiếng xương gãy răng rắc vang lên ghê rợn, những con chiến mã nặng ngàn cân lộn nhào trên không rồi đập sầm xuống đất, đè nát các kỵ sĩ mang giáp nặng trong biển máu tanh bưởi!'
  },
  {
    id: 'anti_than_no',
    name: 'Hắc Điệp Mông Diện & Độn Sa Trảm Thủ Doanh',
    alias: 'Thợ Săn Thần Nỏ • Ác Mộng Cận Chiến',
    preysUpon: 'Thần Cơ Xạ Doanh & Nỏ Liên Châu của Tiên Triều',
    icon: '🥷',
    lethalWeaponry: [
      'Áo Choàng Ngụy Trang Hắc Điệp hòa lẫn vào bóng đêm và khói bụi.',
      'Khinh Khiên Nghiêng góc 45 độ bọc da trâu hắt văng nỏ tiễn.',
      'Lựu Đạn Khói Mù tẩm ớt cay và hạt tiêu.',
      'Song Đoản Kiếm Liêm Đao chuyên cận chiến cắt cổ.'
    ],
    counterTactics: [
      'Tuyệt đối không đứng thành hàng ngũ làm bia tập bắn; di chuyển zíc-zắc phân tán với cự ly mười bước một người.',
      'Lợi dụng màn đêm hoặc phóng hỏa mù khép lại cự ly 100 bước an toàn mà không bị phát hiện.',
      'Khi đã lọt vào cự ly 5 bước: Nỏ liên châu trở thành thanh củi vô dụng cồng kềnh; lập tức dùng song kiếm chém rụng tay nỏ thủ.'
    ],
    psychologicalEdge: 'Nỏ thủ luôn quen với cảm giác giết người từ xa; khi kẻ thù bất ngờ trồi lên kề dao sát cổ, họ hoảng loạn tột cùng.',
    terrainExploitation: 'Rừng lau sậy rậm rạp, hào rãnh ngoằn ngoèo, ngõ ngách chật hẹp trong thành.',
    proseExcerpt: 'Dàn nỏ thủ Tiên Triều đang miệt mài nạp tiễn, mắt hướng về phía bình nguyên trống trải. Bỗng một bóng đen trồi lên ngay từ rãnh đất dưới chân người đội trưởng. Trước khi hắn kịp kêu lên một tiếng, lưỡi dao cong sắc lẹm đã rạch một đường êm ru qua cổ họng. Khói mù bùng lên, hàng trăm sát thủ áo đen lướt đi như những bóng ma giữa hàng ngũ xạ thủ, biến cỗ máy bắn tên uy lực thành một bãi xác không kịp giương cung!'
  },
  {
    id: 'anti_pha_phao',
    name: 'Xuyên Sơn Độn Địa & Tạc Đạn Dẫn Lôi Doanh',
    alias: 'Thợ Săn Đại Pháo • Sát Thủ Nổ Ngược',
    preysUpon: 'Thần Hỏa Pháo Binh & Cơ Quan Phá Trận của Đại Càn',
    icon: '🧨',
    lethalWeaponry: [
      'Xuyên Sơn Móng Vuốt thép đục xuyên đá và rễ cây.',
      'Ống Thở Tre Trúc dài ba trượng luồn dưới lòng đất.',
      'Lôi Hỏa Cầu kích nổ hẹn giờ bằng ngòi dây cháy chậm.',
      'Cát Kim Cương siêu mịn làm kẹt bánh răng cơ quan.'
    ],
    counterTactics: [
      'Đào hầm ngầm hình chữ Chi luồn dưới chân trận địa pháo, tránh sự phát hiện của lính tuần tra.',
      'Đục thủng sàn gỗ kho đạn, nhét cát kim cương vào nòng pháo đang nóng khiến pháo nổ toác nòng khi khai hỏa.',
      'Châm ngòi lôi hỏa cầu vào đống thuốc súng rồi rút lui êm thấm bằng đường ngầm.'
    ],
    psychologicalEdge: 'Nỗi sợ hãi vô hình từ lòng đất khiến các pháo thủ Đại Càn nhìn đâu cũng thấy nguy cơ nổ tung.',
    terrainExploitation: 'Đất phù sa xốp, hang động caster tự nhiên dưới chân sơn môn.',
    proseExcerpt: 'Một tiếng \"cạch\" nhỏ vang lên dưới gầm cỗ pháo nặng vạn cân. Người pháo thủ vừa cúi xuống nhìn qua khe ván thì một bàn tay đầy bùn đất đã thò lên nắm chặt lấy cổ chân hắn lôi tuột xuống hố! Vài hơi thở sau, khói lửa xì ra từ thùng đạn dược dự trữ. Một tiếng nổ chói tai vang lên, toàn bộ trận địa pháo biến thành một hố sụt lún rực lửa chôn vùi vạn cân thép vụn!'
  }
];

// -------------------------------------------------------------------------
// 3. NGHỊCH LONG ĐOẠT VẬN & PHÁ GIẢI BINH HUYẾT
// -------------------------------------------------------------------------
export const MASTER_ANTI_DESTINY_DOCTRINES: AntiDestinyDoctrine[] = [
  {
    id: 'doc_o_ue_dia_mach',
    title: 'Hắc Huyết Đinh Đoạn Tuyệt Quốc Vận',
    category: 'Nghịch Long Đoạt Vận',
    concept: 'Tiêu Cảnh mượn Quốc Vận Hoàng Long để nâng cao cảnh giới quân đội. Điểm yếu chết người: Quốc Vận gắn liền với ĐỊA MẠCH NÚI SÔNG. Bằng cách đóng các cọc chu sa đen và tro xương tử sĩ vào 7 huyệt đạo phong thủy của chín châu, dòng chảy hoàng long sẽ bị nhiễm độc, biến khí vận bảo hộ thành tà khí phản phệ khiến Tiêu Cảnh thổ huyết.',
    practicalMethods: [
      'Tìm kiếm Long Nhãn tại Bắc Lương và Cửu Châu theo cổ thư phong thủy.',
      'Đóng Hắc Huyết Đinh dài bảy thước đúc bằng đồng đen pha máu súc vật xuống huyệt mạch.',
      'Làm ô uế nguồn nước thánh của hoàng gia bằng xác yêu ma ngàn năm.',
      'Khi Hoàng Long bị thương, toàn bộ Binh Huyết của tướng sĩ Đại Càn sẽ lập tức đông cứng mất linh nghiệm.'
    ],
    counterEmpireVulnerability: 'Tiêu Cảnh phụ thuộc hoàn toàn vào Cửu Châu Long Mạch Đồ; một khi long mạch bị nghẽn, thần ngọc sẽ tự nứt.',
    narrativeClimax: 'Giữa trận quyết chiến, Tiêu Cảnh vừa giơ kiếm triệu hồi Hoàng Long thì một tiếng rên rỉ thảm thiết vang lên từ lòng đất. Rồng vàng hóa thành rồng đen phun máu đen ngòm, đẩy quân vương vào cảnh tẩu hỏa nhập ma!'
  },
  {
    id: 'doc_hu_binh_huyet',
    title: 'Cửu U Lãnh Cốt Tán (Làm Nguội Binh Huyết)',
    category: 'Hủ Binh Chi Khí',
    concept: 'Phàm nhân Tiên Triều dùng Binh Huyết sôi sục để chấn động thần thức tu sĩ. Thuốc độc Cửu U Lãnh Cốt Tán được đốt xuôi chiều gió, mang tính hàn cực âm xâm nhập vào lỗ chân lông, làm nhiệt huyết trong tim hạ xuống dưới điểm đóng băng, dập tắt ngọn lửa dũng cảm trong chớp mắt.',
    practicalMethods: [
      'Chế tạo bột băng tằm ngàn năm kết hợp cỏ độc Hàn Băng.',
      'Dùng ống bễ khổng lồ thổi bột độc tạo thành sương mù giá buốt bao trùm trận địa.',
      'Huyết dịch binh sĩ bị đông đặc làm tay chân run rẩy, không thể cầm nổi vũ khí nặng.',
      'Sát khí tan biến, linh áp của tu sĩ tông môn lập tức đè bẹp nhuệ khí quân phàm nhân.'
    ],
    counterEmpireVulnerability: 'Binh Huyết cần nhiệt độ cơ thể và ý chí cuồng bạo để duy trì; khi bị hạ thân nhiệt, thể xác phàm nhân sẽ mất hết sức mạnh.',
    narrativeClimax: 'Mười vạn tráng sĩ Tiên Triều đang gầm vang sát khí bỗng thấy lồng ngực lạnh toát như ngâm trong hầm băng. Tiếng gầm nghẹn lại nơi cổ họng, gươm giáo rơi loảng xoảng trên nền tuyết lạnh!'
  },
  {
    id: 'doc_tam_ma_loan_quan',
    title: 'Tứ Diện Tiên Ca Đoạt Hồn Khúc',
    category: 'Thiên Ma Nhiễu Hồn',
    concept: 'Binh sĩ Đại Càn tuy kỷ luật thép nhưng đều là con người bằng xương bằng thịt, có cha mẹ già và vợ dại nơi quê nhà. Dùng tiếng sáo ai oán của thân nhân hòa cùng Thiên Ma Huyễn Âm thổi trong đêm tối vây quanh doanh trại, khơi gợi nỗi nhớ quê và vạch trần cái chết vô nghĩa vì tham vọng của hoàng gia.',
    practicalMethods: [
      'Tìm kiếm gia quyến các tù binh biên ải, ghi lại những lời dặn dò đẫm nước mắt.',
      'Dùng ngọc truyền âm khuếch đại bài ca ai oán vang vọng bốn bề doanh trại Tiên Triều suốt đêm dài.',
      'Rải truyền đơn hứa hẹn thả tự do và cấp mười mẫu ruộng màu mỡ cho kẻ nào buông vũ khí.',
      'Tướng sĩ trong đêm nghe tiếng khóc quê nhà, rỉ tai nhau đào ngũ trốn khỏi doanh trại.'
    ],
    counterEmpireVulnerability: 'Kỷ luật Thiết Huyết Thập Bát Quy quá tàn bạo; càng chém giết càng đẩy binh lính đến bờ vực nổi loạn phản kháng.',
    narrativeClimax: 'Một đêm nghe tiếng sáo Sở vang lên bốn bề, sáng hôm sau Tiêu Cảnh tỉnh dậy thấy ba ngàn thiết kỵ đã vứt lại khôi giáp trốn về quê hương, doanh trại tiêu điều không đánh mà tan!'
  },
  {
    id: 'doc_doan_tuyen_tuyet_luong',
    title: 'Hỏa Thiêu Ô Sào Tuyệt Căn Thuật',
    category: 'Đoạn Tuyến Tuyệt Lương',
    concept: 'Đại quân mười vạn người mỗi ngày tiêu tốn ngàn cỗ xe lương và hàng vạn cân cỏ khô cho chiến mã. Thay vì đâm đầu vào đại trận kiên cố, phái kỵ binh cơ động vòng qua biên giới đốt phá toàn bộ các kho dự trữ và chặn đánh đoàn xe vận tải trên đèo hiểm trở.',
    practicalMethods: [
      'Cho thám tử trà trộn vào đoàn vận lương để biết chính xác lộ trình và mật khẩu.',
      'Dùng Hỏa Điệp Phù kích nổ đồng loạt mười kho thóc lớn nhất của Tiên Triều trong một đêm.',
      'Rải chất độc vào các đồng cỏ chăn thả ngựa chiến Phong Lôi.',
      'Đại quân không có gạo ăn trong ba ngày ắt sẽ tự loạn, quân lính giết ngựa ăn thịt rồi tan rã.'
    ],
    counterEmpireVulnerability: 'Đại quân phàm nhân không thể nhịn ăn như tu sĩ Tịch Cốc; một hạt gạo thiếu là một vạn mũi gươm cùn.',
    narrativeClimax: 'Nhìn thấy cột khói đen bốc lên từ kho lương Ô Sào sau lưng, mười vạn quân Tiên Triều chết lặng. Bụng đói cồn cào, tiếng gươm rơi báo hiệu hồi kết của một chiến dịch viễn chinh ngông cuồng!'
  }
];

// -------------------------------------------------------------------------
// 4. TOÀN VĂN BỘ BINH THƯ NGHỊCH PHÁ (BẢN VĂN BIA CỔ TOÀN THƯ)
// -------------------------------------------------------------------------
export const MASTER_ANTI_ART_OF_WAR_FULL_TREATISE = `
# CỬU TÔNG NGHỊCH CHIẾN PHÁ TRẬN BÍ THƯ (VẠN TRẬN TƯƠNG KHẮC TOÀN THƯ)
### *Bản Mật Truyền Phá Giải Binh Pháp Đại Càn Tiên Triều Của Liên Minh Cửu Đại Tông Môn*

---

### LỜI NÓI ĐẦU: ĐẠO TƯƠNG SINH TƯƠNG KHẮC
Thiên hạ không có trận pháp nào là vĩnh cửu bất bại, cũng như không có tấm khiên nào không thể xuyên thủng. 

Đại Càn Tiên Triều cậy vào Binh Huyết cương mãnh, Long Mạch thần phù, nỏ liên châu dầy đặc và hỏa pháo cơ quan ngập trời mà coi thường tiên môn, chém giết tu sĩ, lập nên uy quyền sắt máu. Kẻ phàm nhân ngông cuồng tưởng rằng kỷ luật thép và cơ quan xảo quyệt có thể nghịch thiên phạt tiên!

Nhưng vạn vật sinh ra đều bị chế ngự bởi vòng tròn tương khắc:
- **Cương quá ắt dễ gãy**: Mũi tên Phong Thỉ lao nhanh nhất thì khi cắm vào đầm lầy sụt lún sẽ gãy tan tành trước tiên.
- **Dầy quá ắt sinh ngạt**: Phương Trận mai rùa khép kín 360 độ thì chỉ cần cắt nước ba ngày sẽ tự biến thành lò nung thiêu sống quân mình.
- **Nặng quá ắt vụng về**: Đại pháo năm mươi cỗ uy lực ngút trời nhưng quay nòng chậm chạp, chỉ cần một đường hầm chuột trũi dưới lòng đất là nổ tan xác toàn bộ.
- **Huyết quá ắt dễ nguội**: Sát khí binh lính dựa vào lửa dũng cảm, chỉ cần một làn sương buốt Cửu U là đông đặc kinh mạch.

Bộ sách này gồm Bảy Thiên Bí Truyền, ghi chép tường tận từng tử huyệt của Tiên Triều Binh Pháp. Kẻ nắm được bộ thư này, dẫu chỉ có một vạn tàn binh cũng có thể bẻ gãy mười vạn thiết kỵ của phế Thái Tử Tiêu Cảnh!

---

### THIÊN THỨ NHẤT: BẺ GÃY MŨI TÊN & XÉ TOẠC CÁNH HẠC
*(Khắc chế Phong Thỉ Trận và Hạc Dực Trận)*

1. **Phá Phong Thỉ**:
   - Khi thấy bụi cuốn mù mịt báo hiệu ba ngàn thiết kỵ Đại Càn xếp hình mũi tên lao tới, TUYỆT ĐỐI không cho bộ binh dàn hàng ngang đỡ đòn. Đó là lấy trứng chọi đá.
   - Hãy lùi lại, trải rộng Địa Gai Tam Giác và kích hoạt Địa Hãm Phù biến năm mươi bước trước mặt thành đầm lầy.
   - Mũi tên thép khi lao vào bùn lầy sẽ bị khử sạch quán tính. Hai cánh khép lại dùng Câu Liêm Thương móc chân ngựa, vung Bát Giác Trọng Chùy đập nát đầu gối kỵ sĩ. Mũi tên mất đà chỉ là đống sắt vụn chờ chết!

2. **Phá Hạc Dực**:
   - Khi thấy trung quân Tiên Triều yếu ớt lùi dần dụ dỗ, đó là mồi nhử của Hạc Dực Trận. Đừng bao giờ dại dột xông vào bụng túi!
   - Hãy chia đại quân thành hai dòng thác Song Long, dồn 100% tốc lực đâm thẳng vào hai khớp nối gốc cánh hạc. Khớp cánh là nơi mỏng manh nhất, nơi cự thuẫn và kỵ binh chuyển giao quyền chỉ huy.
   - Bẻ gãy khớp nối, cánh hạc đứt lìa khỏi thân; vòng vây chưa kịp khép lại đã biến thành thảm họa bị chia cắt tan hoang.

---

### THIÊN THỨ HAI: LÀM NUNG VẢY THÉP & ĐỤC THỦNG MAI RÙA
*(Khắc chế Ngư Lân Trận và Phương Trận)*

1. **Phá Ngư Lân**:
   - Đừng dùng kiếm khí chém vào vảy cá; vảy cá sẽ trượt sang bên phân tán lực chém.
   - Hãy đợi gió thuận chiều, phóng hỏa tiễn mang bình dầu Địa Cốt vào các khoảng hở một trượng giữa các khối vảy. Thép bách luyện dẫn nhiệt cực nhanh; ngọn lửa cuồng phong sẽ biến từng cụm khiên thành chảo lửa rang thịt người lính. Bị bỏng rát và ngạt khói, hàng vảy cá sẽ tự động vỡ vụn dẫm đạp lên nhau chạy trốn.

2. **Phá Phương Trận (Huyền Vũ)**:
   - Thấy địch dựng hộp sắt tròn kiên cố, chớ tốn tên bắn vào rừng khiên.
   - Hãy lập tức đào hào ba vòng cách hai trăm bước, biến thế phòng thủ của địch thành nhà tù giam giữ chính họ. Cắt đứt nguồn suối, thả độc khói từ trên gió, nướng thịt dê xuôi chiều gió trêu tức quân địch đang đói khát. 
   - Sau ba ngày đêm phơi nắng không giọt nước, người khổng lồ giáp sắt sẽ tự quỵ ngã vì say nắng và kiệt sức mà không tốn một mũi tên!

---

### THIÊN THỨ BA: ĐẬP NÁT CỬU CUNG & BẺ GÃY ĐÀN NHẠN
*(Khắc chế Bát Quái Cửu Cung và Nhạn Hành Trận)*

1. **Phá Bát Quái Mê Hồn**:
   - Không được tìm hiểu tám cửa Sinh Tử của địch; càng suy tính càng sa vào bẫy tâm lý.
   - Bịt tai bằng sáp ong để không nghe tiếng trống mê hoặc. Dùng xe thiết giáp bịt thép đầu dê đâm thẳng một đường máu từ ngoài vào tâm đài chỉ huy. 
   - Đánh sập đài quan sát ở Trung Cung, bắt sống Trận Sư, mê cung tám cửa sẽ tự động trở thành bãi tha ma vô hồn.

2. **Phá Nhạn Hành (Vạn Tiễn)**:
   - Dùng xe mai rùa bọc da trâu vát nghiêng góc bốn mươi lăm độ tiến lên; mọi mũi tên nổ của Nhạn Hành Trận bắn trúng mái nghiêng đều trượt văng ra ngoài.
   - Đốt bột ớt cay xuôi chiều gió làm cay mắt nỏ thủ khiến họ bắn mù mịt. 
   - Đợi địch bắn hết mười đợt tên cạn sạch ống tiễn, phóng đao phủ từ gầm xe ra áp sát chặt đứt cổ xạ thủ trước khi họ kịp rút đoản đao.

---

### THIÊN THỨ TƯ: GIẢI PHÓNG PHI KIẾM & HỦY DIỆT CỰ PHÁO
*(Khắc chế Cửu Châu Tỏa Long và Phong Hống Phá Thiên)*

1. **Phá Tỏa Long (Khóa Tu Sĩ)**:
   - Đừng bao giờ bay thấp dưới mười trượng khi thấy trận địa cọc đồng của Đại Càn.
   - Thả hạc giấy phân thân mang linh thạch giả rơi xuống dụ quân địch tung xích sắt bắt lầm. 
   - Khi chín sợi xích quấn chặt bù nhìn, từ trên tầng mây thứ chín dẫn thiên lôi giáng thẳng xuống cọc đồng; dòng điện vạn trượng sẽ thiêu rụi toàn bộ tráng sĩ đang giữ đầu xích sắt thành tro bụi.

2. **Phá Đại Pháo Cơ Quan**:
   - Năm mươi cỗ cự pháo chỉ biết bắn về phía trước và rất sợ đất sụt lún.
   - Dùng đội ngũ chuột độn thổ đào hầm ngầm luồn thẳng xuống kho chứa thuốc súng dưới chân trận địa pháo. 
   - Kích nổ từ đáy hầm, tạo chuỗi nổ dây chuyền hất tung toàn bộ nòng pháo vạn cân lên trời, biến niềm kiêu hãnh của Tiêu Cảnh thành nấm mồ lửa tự thiêu chính mình.

---

### THIÊN THỨ NĂM: ĐOẠT MẠCH PHONG THỦY & NGHỊCH CHUYỂN HOÀNG LONG
*(Khắc chế Cốt Lõi Khí Vận Tiên Triều)*

1. **Long Mạch Phản Phệ**:
   - Tiên Triều mạnh nhờ Quốc Vận Hoàng Long. Nhưng rồng ngự trên đất, đất ô uế thì rồng hóa tà.
   - Đóng Hắc Huyết Đinh tẩm tro cốt yêu ma xuống chín huyệt đạo long mạch chín châu. Khí u uế bốc lên làm Hoàng Long quằn quại, thần ngọc của Tiêu Cảnh rạn nứt, chân long khí biến thành độc khí xộc thẳng vào tâm can quân vương.

2. **Làm Nguội Binh Huyết**:
   - Binh Huyết là ngọn lửa cuồng nộ của phàm nhân. Đốt Cửu U Lãnh Cốt Tán theo gió tạo màn sương buốt giá âm hàn. 
   - Nhiệt độ hạ xuống, máu tráng sĩ đông đặc, ngọn lửa dũng cảm vụt tắt, thể xác phàm nhân run rẩy buông gươm đầu hàng trước uy áp thiên địa.

---

### THIÊN THỨ SÁU: CHIẾN THUẬT DU KÍCH & CẮT ĐỨT CUỐNG RỐN LƯƠNG THẢO
*(Khắc chế Đạo Quân Đông Đảo Viễn Chinh)*

- Quân đông mười vạn là một con quái vật tham ăn. Mỗi ngày tiêu tốn trăm cỗ xe lương.
- Tránh đối đầu trực diện với chủ lực Tiên Triều; chia nhỏ thành hàng trăm đội khinh binh ngày đêm phục kích các con đường hiểm trở dẫn vào hậu phương.
- Đốt kho lương Ô Sào, hạ độc giếng nước ven đường, rải đinh ba ngạnh làm thối móng xe vận tải.
- Không có cơm ăn trong năm ngày, mười vạn thiết kỵ sẽ biến thành mười vạn kẻ đói khát giết hại lẫn nhau giành giật miếng ăn; cỗ máy chiến tranh tự sụp đổ không cần một trận huyết chiến!

---

### THIÊN THỨ BẢY: LỜI RĂN CHO CÁC THỐNG SOÁI NGHỊCH TIÊN
- \"Thắng trận không tại gươm sắc, thắng trận tại biết rõ chỗ yếu của đối phương.\"
- Tiêu Cảnh là bậc kỳ tài quân sự, nhưng sự ngạo mạn của một phế thái tử khao khát chứng minh mình là tử huyệt lớn nhất của hắn.
- Dụ hắn kiêu ngạo, nhử hắn dốc toàn lực vào mũi nhọn Phong Thỉ, rồi khép đầm lầy nghiền nát giấc mơ đế vương của hắn dưới bùn sâu Bắc Lương!
`;
