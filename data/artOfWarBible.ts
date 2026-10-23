// =========================================================================
// ĐẠI CÀN TIÊN TRIỀU BINH PHÁP TOÀN THƯ (VẠN TRẬN CHI ĐẠO)
// Tinh hoa quân sự: Bày Binh Bố Trận, Biến Hóa Trận Pháp, Luyện Quân,
// Binh Chủng, Tác Chiến Địa Hình và Tùy Cơ Ứng Biến Phá Trận
// =========================================================================

export interface BattleFormation {
  id: string;
  name: string;
  alias: string;
  category: 'Công Kích Mãnh Liệt' | 'Phòng Ngự Bất Hoại' | 'Vu Hồi Bao Vây' | 'Kỳ Môn Tiên Trận' | 'Phục Kích Du Kích';
  diagramText: string;
  symbol: string;
  corePhilosophy: string;
  deploymentRules: string[];
  movementAndManeuvers: string[];
  signalCommands: {
    drum: string;    // Hiệu lệnh trống sấm
    flag: string;    // Cờ hiệu
    gong: string;    // Chiêng đồng
    flare: string;   // Hỏa tiễn / Pháo sáng
  };
  suitableTroops: string[];
  suitableTerrain: string[];
  strongAgainst: string[];
  weakAgainst: string[];
  counterManeuver: string; // Cách phá hoặc đối phó khi địch dùng trận này
  battleProseSample: string; // Văn mẫu miêu tả chiến trận
}

export interface TroopBranch {
  id: string;
  name: string;
  category: 'Bộ Binh Trọng Giáp' | 'Khinh Binh Tiên Phong' | 'Kỵ Binh Thiết Giáp' | 'Nỏ Cơ Quan Xạ Kích' | 'Phù Văn Trận Binh' | 'Cơ Quan Phá Trận' | 'Trinh Sát Du Kỵ' | 'Chiến Thú Đột Kích';
  icon: string;
  role: string;
  standardEquipment: string[];
  trainingDisciplines: string[];
  advantages: string[];
  weaknesses: string[];
  terrainMastery: {
    ideal: string;
    harsh: string;
  };
  battlefieldMotto: string;
  synergyWith: string;
  proseExcerpt: string;
}

export interface TrainingDoctrine {
  id: string;
  title: string;
  category: 'Quân Quy Thập Bát Lệnh' | 'Binh Huyết Khí Phách' | 'Hiệp Đồng Chiến Thuật' | 'Tâm Lý Chiến & Chống Pháp Thuật';
  principle: string;
  detailMethods: string[];
  historicalPrecedent: string;
  narrativeImpact: string;
}

export interface TerrainTactic {
  id: string;
  terrainName: string;
  icon: string;
  nature: string;
  tacticalAdvantage: string;
  fatalDisadvantages: string[];
  recommendedFormations: string[];
  favoredTroops: string[];
  disfavoredTroops: string[];
  ambushOpportunities: string;
  proseSceneTip: string;
}

export interface CounterFormationRule {
  id: string;
  enemyStance: string;
  enemyThreat: string;
  counterFormationName: string;
  tacticalAction: string;
  decisivePhase: string;
  counterIllustration: string;
}

// -------------------------------------------------------------------------
// 1. DANH SÁCH 12 ĐẠI CHIẾN TRẬN KINH ĐIỂN
// -------------------------------------------------------------------------
export const MASTER_BATTLE_FORMATIONS: BattleFormation[] = [
  {
    id: 'tran_phong_thi',
    name: 'Phong Thỉ Trận (Trận Mũi Tên Gió)',
    alias: 'Tiên Triều Đột Xung Phá Trận',
    category: 'Công Kích Mãnh Liệt',
    symbol: '🏹',
    diagramText: `
          ▲ [Mũi Đột Kích: Long Kỵ Thiết Binh / Tiên Phong]
         ▲ ▲ [Hai Cánh Xuyên Thấu: Trọng Giáp Kỵ Doanh]
        ▲   ▲ [Hộ Vệ Mạn Sườn: Trường Thương Bộ Tốt]
       ■ ■ ■ ■ [Trung Quân Soái Kỳ & Thần Nỏ Bắn Cản Bước]
          ▼ [Hậu Vệ: Cơ Quan Chiến Xa]
    `,
    corePhilosophy: 'Tập trung toàn bộ sức mạnh vào một mũi nhọn duy nhất như mũi tên xé gió, nghiền nát trung tâm chỉ huy địch trong nháy mắt.',
    deploymentRules: [
      'Tiên phong chọn 500 chiến tướng quả cảm nhất, khoác Huyền Thiết Khôi Giáp, cầm Phá Giáp Trọng Kích.',
      'Cánh trái và cánh phải xếp so le hình chữ V nhọn, khoảng cách giữa các kỵ sĩ là 3 thước để giữ đà phi nước đại.',
      'Soái kỳ nằm ở 1/3 trục sau, nỏ liên châu bố trí ngay sau mũi nhọn để liên tục xả tên rải đường trước khi giáp lá cà.',
      'Tuyệt đối không dừng lại giữa chừng; toàn bộ lực lượng phải dồn sức quán tính đẩy về phía trước.'
    ],
    movementAndManeuvers: [
      'Khi tiếp cận 300 bước: Toàn trận bắn một loạt Nỏ Phá Linh tạo lỗ hổng trên khiên thuẫn địch.',
      'Khi tiếp cận 100 bước: Mũi nhọn hạ trường kích, tăng tốc tối đa, hò hét rung chuyển núi sông đè bẹp nhuệ khí địch.',
      'Sau khi xuyên thủng hàng tiền quân địch: Hai cánh chữ V lập tức bẻ ngoặt sang hai bên để xé rách sườn đối phương, mở đường cho trung quân tràn vào.'
    ],
    signalCommands: {
      drum: 'Trống Cửu Lôi liên hồi ba tiếng dài năm tiếng dồn — Toàn quân dốc sức xung phong!',
      flag: 'Soái kỳ chữ Xích Hồng chỉ thẳng phía trước không hạ xuống.',
      gong: 'Không dùng chiêng khi tấn công (nghiêm cấm thối lui, nghe tiếng trống chỉ có tiến).',
      flare: 'Hỏa tiễn màu đỏ thắm bắn thẳng lên trời chỉ điểm mục tiêu cần phá vỡ.'
    },
    suitableTroops: ['Long Kỵ Thiết Mã', 'Tiên Phong Cảm Tử Quân', 'Huyền Giáp Thương Binh'],
    suitableTerrain: ['Bình nguyên bằng phẳng', 'Đồng bằng cỏ khô', 'Thung lũng rộng lớn'],
    strongAgainst: ['Phương Trận chậm chạp', 'Hàng ngũ địch đang hành quân', 'Quân địch chia cắt rời rạc'],
    weakAgainst: ['Hẻm núi hẹp', 'Bãi cọc cự mã liên hoàn', 'Hạc Dực Trận vu hồi bao vây'],
    counterManeuver: 'Dùng cự mã chôn ngầm cản đà tiến, sau đó khép hai cánh Hạc Dực kẹp chặt mạn sườn, biến mũi tên thành cá nằm trên thớt.',
    battleProseSample: `Tiếng tù và bằng sừng rồng rền vang xé toạc sương mù buổi sớm. Tiêu Cảnh vung kiếm lệnh: \"Bày Phong Thỉ Trận! Nhắm thẳng soái trướng Vấn Tiên Tông mà đâm!\"

Ngay tức khắc, ba ngàn thiết kỵ khóa xích sắt liên hoàn, biến thành một mũi tên thép khổng lồ lao vun vút trên bình nguyên. Đất đá dưới móng ngựa rung chuyển như động đất. Hàng ngàn mũi giáo dài sáng lóa chĩa thẳng về phía trước, ánh thép lạnh lẽo cắt đứt gió rít. Khi khoảng cách chỉ còn trăm bước, một vạn mũi thần nỏ từ lưng ngựa đồng loạt phóng lên trời, tạo thành một cơn mưa thép đen kịt che lấp mặt trời rồi cắm phầm phập xuống đầu trận tuyến địch. Trước khi tu sĩ địch kịp ngự kiếm hoàn hồn, mũi tên thép đã xuyên thủng vạn lớp thuẫn giáp, nghiền nát trận tiền trong biển máu!`
  },
  {
    id: 'tran_hac_duc',
    name: 'Hạc Dực Trận (Trận Cánh Hạc Du Hồi)',
    alias: 'Cửu Thiên Hạc Dực Triệt Để Vây Khốn',
    category: 'Vu Hồi Bao Vây',
    symbol: '🦢',
    diagramText: `
    [Tả Dực Kỵ Binh] ◀──────────┐      ┌──────────▶ [Hữu Dực Kỵ Binh]
          ╲                     │      │                     ╱
           ▲ ▲                 ■ ■ ■ ■                 ▲ ▲
            ╲                 [Trung Quân]              ╱
             ──────▶ [Túi Đựng: Bẫy Địch Vào Giữa] ◀─────
    `,
    corePhilosophy: 'Trung quân vờ yếu ớt dụ địch tiến sâu, hai cánh xòe rộng như cánh hạc từ từ khép lại, tạo thành vòng vây sắt thắt nút cổ chai.',
    deploymentRules: [
      'Trung quân bố trí lực lượng phòng thủ kiên cường (Trọng Bộ Binh cự thuẫn) nhưng biểu hiện nao núng để dụ địch.',
      'Hai cánh là kỵ binh cơ động cao và xạ thủ tinh nhuệ giấu sau rặng cây hoặc địa hình khuất.',
      'Chiều dài sải cánh phải gấp 3 lần bề rộng mặt trận địch để đảm bảo bao bọc trọn vẹn hai sườn.',
      'Khóa đuôi: Một đội cơ động nhỏ phục sẵn phía sau điểm nút để bịt kín đường rút lui khi cánh hạc khép lại.'
    ],
    movementAndManeuvers: [
      'Giai đoạn 1 (Dụ mồi): Trung quân chống trả kịch liệt rồi từ từ lùi có trật tự 50 bước.',
      'Giai đoạn 2 (Xòe cánh): Khi địch say máu đuổi theo lọt vào lòng cung, trống sấm đổi nhịp, hai cánh kỵ binh phi nhanh ép sát.',
      'Giai đoạn 3 (Bóp nghẹt): Hai đầu cánh hạc chạm nhau phía sau lưng địch, nỏ thần từ 4 phía bắn dồn vào tâm bão.'
    ],
    signalCommands: {
      drum: 'Trống đánh nhịp đôi ngắt quãng lúc lui, sau đó chuyển sang nhịp Cuồng Phong khi khép cánh.',
      flag: 'Hai cờ Thanh Long (trái) và Bạch Hổ (phải) đồng loạt vẫy ngang khép góc 90 độ.',
      gong: 'Chiêng gõ một tiếng dài khi vòng vây đã khép kín hoàn toàn.',
      flare: 'Hai phát pháo hoa xanh lam phóng lên từ hai cánh báo hiệu đã khóa chặt sườn.'
    },
    suitableTroops: ['Trọng Thuẫn Doanh', 'Thần Cơ Nỏ Binh', 'Thiết Kỵ Tốc Hành'],
    suitableTerrain: ['Địa hình lòng chảo', 'Bình nguyên có hai đồi thoải bao bọc', 'Bãi bồi ven sông'],
    strongAgainst: ['Quân địch ngạo mạn chỉ thích đột kích thẳng', 'Phong Thỉ Trận', 'Quân tiên phong đơn độc'],
    weakAgainst: ['Địch phát hiện bẫy và tập trung hỏa lực phá vỡ một cánh', 'Địa hình rừng rậm quá dày cản kỵ binh'],
    counterManeuver: 'Nếu bị lọt vào bụng Hạc Dực, không được hoảng loạn tản ra; phải lập tức tập trung toàn bộ binh lực đánh sụp một góc cánh hạc mỏng nhất để thoát hiểm.',
    battleProseSample: `Quân tiên phong của giặc reo hò ầm ĩ khi thấy trung quân của Tiêu Cảnh chật vật lùi bước. Chúng tưởng thắng lợi đã nằm trong tầm tay, điên cuồng thúc quân xông thẳng vào khoảng trống.

Thế nhưng, ngay khoảnh khắc tên tướng địch bước qua vệt đá son đánh dấu, một tiếng tù và cao vút xé toạc thinh không! Từ hai bên cánh đồi, hai dải lụa đen cuồn cuộn xuất hiện — đó là hai cánh Long Kỵ giáp đen vút ra như đôi cánh hạc khổng lồ đang sà xuống con mồi. Cánh trái quét qua cắt đứt đoàn vận lương, cánh phải ép chặt sườn kỵ binh giặc. Trong nháy mắt, mười vạn quân giặc thấy bầu trời tối sầm lại bởi vòng vây khép kín; bốn bề chỉ còn lại tiếng cung nỏ rít gào và ánh thép lạnh tanh của lưới vây trùng điệp!`
  },
  {
    id: 'tran_ngu_lan',
    name: 'Ngư Lân Trận (Trận Vảy Cá)',
    alias: 'Vạn Tầng Lớp Xếp • Kháng Tiên Thuật Chi Trận',
    category: 'Phòng Ngự Bất Hoại',
    symbol: '🐟',
    diagramText: `
          [Đội 1: Thuẫn]     [Đội 2: Thuẫn]     [Đội 3: Thuẫn]
             [Đội 4: Nỏ]        [Đội 5: Nỏ]        [Đội 6: Nỏ]
          [Đội 7: Thương]    [Đội 8: Thương]    [Đội 9: Thương]
             [Đội 10: Linh]     [Đội 11: Soái]     [Đội 12: Kỵ]
    `,
    corePhilosophy: 'Chia nhỏ quân đoàn thành hàng trăm phân đội hình lục giác so le đan xen như vảy cá. Một vảy bị vỡ, vảy sau lập tức trượt lên trám chỗ, không bao giờ bị tiêu diệt hàng loạt bởi pháp thuật diện rộng.',
    deploymentRules: [
      'Mỗi đơn vị \"Vảy Cá\" gồm 50 binh sĩ (20 cự thuẫn, 15 trường thương, 15 thần nỏ), có tiểu tướng chỉ huy độc lập.',
      'Khoảng cách giữa các khối vảy là 1 trượng, tạo luồng thông khí và lối cơ động tráo đổi quân lính mỏi mệt.',
      'Trận nhãn đặt các tấm Trấn Linh Phù giúp triệt tiêu linh áp của đại trận địch.',
      'Bộ chỉ huy có thể xoay chuyển từng vảy cá như xoay khớp vảy rồng, lấy nhu thắng cương.'
    ],
    movementAndManeuvers: [
      'Khi địch đánh búa bổ vào mặt trận: Khối vảy trước hấp thu chấn động rồi dạt sang hai bên, để lộ khối vảy nỏ phía sau bắn cận chiến cực mạnh.',
      'Tiến thoái như sóng dạt: Hàng trước đánh 1 khắc mệt mỏi thì rút lùi theo khe hở, hàng sau lập tức trượt lên thay thế liên tục không gián đoạn.'
    ],
    signalCommands: {
      drum: 'Trống đập nhịp 3-3-3 đều đặn như nhịp tim, giữ vững bước chân không rối loạn.',
      flag: 'Cờ Bát Quái ngũ sắc liên tục nhấp nhô theo hình sóng biển.',
      gong: 'Chiêng gõ dồn dập mỗi khi cần xoay chuyển khối vảy đổi hướng phòng ngự.',
      flare: 'Hỏa tiễn vàng rải đều ba phương báo hiệu củng cố toàn tuyến.'
    },
    suitableTroops: ['Trọng Bộ Binh', 'Liên Hoàn Cự Thuẫn', 'Nỏ Thần Cơ Động'],
    suitableTerrain: ['Bình nguyên gồ ghề', 'Đồng lầy cạn', 'Mặt trận chính diện rộng lớn'],
    strongAgainst: ['Pháp thuật nổ diện rộng của tu sĩ', 'Kỵ binh xung kích không có chiều sâu', 'Cự thú càn quét'],
    weakAgainst: ['Hỏa công quy mô lớn xuôi chiều gió', 'Đoàn xe ủi nặng (Trùng Sa) phá vỡ khoảng trống giữa các vảy'],
    counterManeuver: 'Phóng hỏa mù và phóng hỏa tiễn liên hoàn để đốt cháy không gian liên kết giữa các cụm vảy.',
    battleProseSample: `Đối diện với chưởng phong ngập trời của ba vị Kim Đan trưởng lão, quân đội phàm nhân không hề tán loạn. 

\"Kết Ngư Lân Trận! Trấn Linh Thạch hạ thổ!\" — Hiệu lệnh vang lên. 

Hàng vạn tấm thuẫn thép lập tức trượt vào nhau theo hình vảy rồng lấp lánh. Khi một đạo kiếm khí khổng lồ xé toạc một góc trận địa làm mười mấy tấm khiên vỡ nát, khối vảy thứ hai lập tức trượt sang trám kín khe hở chỉ trong nửa nhịp thở. Chưởng phong va vào trận địa vảy cá liền bị phân tán lực ép ra bốn phương tám hướng như nước đổ đầu vịt. Quân địch dốc cạn linh lực vẫn thấy bức tường vảy thép sừng sững không suy suyển, từng mũi nỏ từ khe vảy cá lạnh lùng nhắm thẳng tim kẻ thù!`
  },
  {
    id: 'tran_bat_quai_cuu_cung',
    name: 'Bát Quái Cửu Cung Trận (Trận Mê Hồn Đoạt Mệnh)',
    alias: 'Thần Cơ Biến Huyễn Cổ Đạo Trận',
    category: 'Kỳ Môn Tiên Trận',
    symbol: '☯️',
    diagramText: `
       [Càn: Trời]      [Khảm: Nước]      [Cấn: Núi]
            ╲                 │                 ╱
       [Chấn: Sấm]  ─── [TRUNG CUNG: SOÁI] ─── [Tốn: Gió]
            ╱                 │                 ╲
       [Ly: Lửa]        [Khôn: Đất]       [Đoài: Đầm]
    `,
    corePhilosophy: 'Vận dụng 8 phương vị phối hợp với Cửu Cung cơ quan và linh thạch trận pháp. Biến chiến trường thành một mê cung sống; địch vào cửa Sinh hóa Tử, vào cửa Tử hóa Không.',
    deploymentRules: [
      'Chia 8 doanh trại tương ứng 8 cửa: Hưu, Sinh, Thương, Đỗ, Cảnh, Tử, Kinh, Khai.',
      'Ở giữa mỗi cửa dựng chòi cơ quan cao 3 trượng, treo gương phản quang và cờ ảo ảnh đánh lừa thị giác.',
      'Bố trí địa lôi ngầm, bẫy sập và lưới đinh tẩm dược mê ở cửa Tử và cửa Thương.',
      'Trung Cung điều khiển toàn bộ bằng 8 hồi trống trận khác nhau, chuyển dịch cửa Sinh Tử theo giờ.'
    ],
    movementAndManeuvers: [
      'Càn Khôn đảo vị: Khi địch công vào Càn (Tây Bắc), cửa này mở rộng đón địch, đồng thời Khảm (Bắc) và Cấn (Đông Bắc) khép lại sau lưng.',
      'Biến Huyễn Luân Chuyển: Toàn quân không cố định một vị trí mà liên tục di chuyển vòng quanh tâm theo chiều kim đồng hồ, biến kẻ địch thành người mù quay cuồng giữa sương khói.'
    ],
    signalCommands: {
      drum: 'Trống Bát Quái gõ theo nhịp Âm Dương (trầm bổng luân phiên, khi thong thả khi như sấm giật).',
      flag: 'Cờ Bát Quái đồ xoay tròn trên đỉnh đài quan sát trung tâm.',
      gong: 'Chiêng ngân nga kéo dài tạo tiếng vang cộng hưởng gây nhiễu loạn thần thức.',
      flare: 'Pháo khói ngũ sắc bắn ra che kín tầm nhìn chiến trường.'
    },
    suitableTroops: ['Phù Trận Sư', 'Kỳ Môn Cơ Quan Doanh', 'Khinh Giáp Kiếm Sĩ'],
    suitableTerrain: ['Thung lũng có sương mù', 'Bình nguyên nhiều gò đống', 'Khu phế tích cổ thành'],
    strongAgainst: ['Quân địch cậy đông hung hãn', 'Yêu thú bầy đàn mất kiểm soát', 'Kỵ binh thiếu kiên nhẫn'],
    weakAgainst: ['Cao thủ Nguyên Anh nhìn thấu trận nhãn từ trên không', 'Hỏa pháo hủy diệt san bằng địa hình'],
    counterManeuver: 'Muốn phá Bát Quái Trận phải tìm ra vị trí Soái Đài Trung Cung, tập trung binh lực đánh thẳng vào cửa Cảnh hoặc Khai từ hướng mặt trời mọc.',
    battleProseSample: `Năm vạn đại quân Tiên Tông ngạo nghễ tiến vào trận địa Bát Quái của Tiêu Cảnh, nhưng chỉ sau ba khắc, sương mù dày đặc nổi lên che khuất trời đất. 

Chúng nhìn thấy cửa Khai rộng mở tưởng là lối thoát, liền ùa nhau chạy tới, nào ngờ vừa bước qua làn khói, mặt đất nứt toác để lộ ngàn mũi chông thép tẩm phá linh dược! Tiếng la hét thấu tận mây xanh. Quay đầu nhìn lại, lối cũ đã biến thành một bức tường khiên đồng đồ sộ từ cửa Tử trồi lên. Trận pháp như một cối xay khổng lồ, tiếng trống từ hư không vang vọng khiến tâm thần binh lính giặc điên loạn, tự chém giết lẫn nhau trong cơn cuồng loạn u uất.`
  },
  {
    id: 'tran_nhan_hanh',
    name: 'Nhạn Hành Trận (Trận Đàn Nhạn Giăng Cung)',
    alias: 'Vạn Tiễn Tề Phát • Hỏa Lực Tuyệt Đối',
    category: 'Công Kích Mãnh Liệt',
    symbol: '🪶',
    diagramText: `
                  ▲ [Soái Kỳ Tiêu Điểm Xạ Kích]
                ▲   ▲
              ▲       ▲
            ▲           ▲ [Đôi Cánh Giăng Ngang Hàng Ngàn Cây Nỏ]
          ■               ■ [Bộ Binh Khiên Lùn Chắn Chân]
    `,
    corePhilosophy: 'Dàn quân so le theo hình đàn chim nhạn bay chéo, tối đa hóa mật độ hỏa lực tầm xa. Toàn bộ cung nỏ đều có góc bắn không bị đồng đội cản trở.',
    deploymentRules: [
      'Xếp thành từng bậc thang so le tiến lên, binh sĩ hàng trước ngồi quỳ, hàng sau đứng thẳng.',
      'Cứ 3 người tạo thành 1 tổ xạ kích: 1 người nâng cự thuẫn che tên, 1 người kéo nỏ liên châu, 1 người nạp tiễn.',
      'Hai đầu cánh hơi vểnh về phía trước để tạo góc bắn chéo chữ X thiêu đốt mục tiêu ở trung tâm.',
      'Tuyệt đối cấm bộ binh xung phong chắn ngang tầm mắt của dàn cung nỏ.'
    ],
    movementAndManeuvers: [
      'Hành tiến bằng bước dồn: Toàn đội đồng loạt bước 3 bước, dừng, bắn 1 loạt, sau đó tiếp tục bước 3 bước.',
      'Chuyển đổi góc bắn: Cờ lệnh phất góc nào, toàn bộ mũi tên tập trung quét sạch góc đó trong 3 hơi thở.'
    ],
    signalCommands: {
      drum: 'Nhịp trống đanh, dứt khoát: Cắc - Tùng! Cắc là giương cung, Tùng là buông dây!',
      flag: 'Cờ Chu Tước đỏ rực nâng cao hạ xuống dứt khoát theo từng đợt bắn.',
      gong: 'Chiêng reo liên tục báo hiệu nạp độc tiễn hoặc hỏa tiễn phá trận.',
      flare: 'Hỏa tiễn màu cam bắn theo quỹ đạo parabol dẫn hướng cho toàn quân.'
    },
    suitableTroops: ['Thần Cơ Xạ Doanh', 'Liên Châu Nỏ Thủ', 'Hỏa Khí Phá Pháp Đội'],
    suitableTerrain: ['Sườn đồi thoai thoải nhìn xuống', 'Bờ hào thành lũy', 'Khoảng đất trống trước ải'],
    strongAgainst: ['Bộ binh chậm chạp', 'Yêu thú bầy đàn quy mô lớn', 'Hàng ngũ địch co cụm'],
    weakAgainst: ['Thiết kỵ đột kích tốc độ cao từ sườn', 'Thời tiết mưa bão làm ướt dây cung'],
    counterManeuver: 'Dùng xe khiên thép đẩy lên che chắn hoặc cử khinh kỵ vòng ra sau lưng đánh úp khi cung nỏ đang mải bắn phía trước.',
    battleProseSample: `Trên đỉnh dốc Ải Bắc Lương, vạn quân Tiêu Cảnh giăng ra một thế trận Nhạn Hành dài tới năm dặm. Nhìn từ xa, hàng ngũ uyển chuyển như một đàn nhạn thép khổng lồ đang sải cánh đón gió bão.

\"Bắn!\" — Tiếng hô như sấm dậy.

Một tiếng rít kinh hoàng vang lên cùng lúc từ năm ngàn cỗ nỏ liên châu. Bầu trời bỗng chốc tối sầm lại. Những mũi tên thép nung đỏ xé gió bay vút theo hình cánh cung rồi rơi xối xả xuống đầu mười vạn yêu binh đang tràn qua thung lũng. Máu nhuộm đỏ đồng cỏ, từng mảng yêu ma ngã rạ như cỏ lúa bị gặt. Không một con thú nào có thể tiến lại gần trong phạm vi ba trăm bước; Nhạn Hành Trận đã biến mặt đất phía trước thành vùng đất chết không bóng người sống sót!`
  },
  {
    id: 'tran_vien_phuong',
    name: 'Viên Trận & Phương Trận (Trận Vòng Tròn & Trận Hộp Sắt)',
    alias: 'Huyền Vũ Bất Tử • Phòng Ngự Trùng Điệp',
    category: 'Phòng Ngự Bất Hoại',
    symbol: '🛡️',
    diagramText: `
          ┌───────────────────────────────────┐
          │   [Cự Thuẫn Khóa Xích Ngoài Cùng]   │
          │   [Trường Thương Ba Trượng Chĩa Ra]  │
          │   [Nỏ Thần Bắn Xoay Vòng Bên Trong]  │
          │         ★ [SOÁI KỲ & THƯƠNG BINH]   │
          └───────────────────────────────────┘
    `,
    corePhilosophy: 'Khép kín 360 độ không góc chết như mai rùa Huyền Vũ. Dù địch tấn công từ bất kỳ hướng nào, chúng cũng chỉ đâm đầu vào bức tường thép gai góc.',
    deploymentRules: [
      'Hàng ngoài cùng là Thiết Giáp Trọng Thuẫn, chân khiên cắm sâu 1 thước xuống đất, khóa chốt xích lại với nhau.',
      'Hàng thứ hai luồn giáo dài 2 trượng qua khe thuẫn chếch 45 độ đón kỵ binh.',
      'Hàng thứ ba là nỏ thủ và xạ thủ linh tiễn bắn cầu vồng ra ngoài.',
      'Tâm trận là nơi dự trữ đạn dược, cứu thương và lực lượng kỵ binh tinh nhuệ chờ cơ hội phá vây phản kích.'
    ],
    movementAndManeuvers: [
      'Cố thủ bất động: Khi bị bao vây tứ phía, giữ vững vị trí không manh động.',
      'Bánh xe lăn thép: Khi cần di chuyển, toàn bộ khối tròn xoay chậm rãi theo nhịp trống, vừa đi vừa duy trì lớp khiên ngoài không một kẽ hở.'
    ],
    signalCommands: {
      drum: 'Nhịp trống đập chậm, trầm hùng như tiếng bước chân của cự thú ngàn năm.',
      flag: 'Cờ Huyền Vũ đen tuyền cắm kiên cố ở tâm trận, không lay chuyển.',
      gong: 'Chiêng gõ dập liên tục 3 tiếng khi địch tập trung công kích vào một hướng.',
      flare: 'Pháo sáng trắng bắn thẳng đứng cầu cứu hoặc báo hiệu toàn trận kiên thủ.'
    },
    suitableTroops: ['Trọng Thuẫn Doanh', 'Huyền Giáp Thương Binh', 'Nỏ Thủ'],
    suitableTerrain: ['Bị địch bao vây ở bãi trống', 'Sa mạc cát bụi', 'Nơi bằng phẳng không điểm tựa'],
    strongAgainst: ['Kỵ binh cơ động bao vây', 'Du kích tập kích tứ phía', 'Quân địch đông gấp bội'],
    weakAgainst: ['Máy bắn đá và đại pháo tầm xa oanh tạc', 'Bị cắt đứt nguồn nước lâu ngày'],
    counterManeuver: 'Bao vây phong tỏa nguồn nước, dùng máy ném đá và hỏa công thiêu đốt từ xa thay vì xông vào đánh giáp lá cà.',
    battleProseSample: `Bị mười vạn kỵ binh Mãng Tộc bao vây giữa hoang mạc, ba ngàn quân của Tiêu Cảnh lập tức thu gom xe chiến mã, khóa chốt liên hoàn dựng thành một tòa Phương Trận kiên cố như pháo đài bằng sắt.

Kỵ binh địch hú hét man rợ, phóng ngựa lao tới như cuồng phong thác lũ. Nhưng khi chỉ còn mười bước, hàng ngàn ngọn giáo dài sắc nhọn đồng loạt đâm xuyên qua khe khiên thép, tạo thành một rừng chông rực lửa. Ngựa giặc bị đâm toác ngực ngã chổng vó, đè bẹp những tên phía sau. Hàng rào thuẫn giáp của Phương Trận vẫn đứng trơ trơ như vách núi trước sóng thần; từng mũi tên thép từ lòng trận lạnh lùng tỉa rụng từng tên tướng giặc lăm le áp sát!`
  },
  {
    id: 'tran_toa_long',
    name: 'Cửu Châu Tỏa Long Trận (Trận Xích Sắt Khóa Tu Sĩ)',
    alias: 'Tru Tiên Khóa Khí Trận',
    category: 'Kỳ Môn Tiên Trận',
    symbol: '⛓️',
    diagramText: `
              [Đài Trấn Ma] ────────── [Cọc Phá Linh]
                    │   ╲             ╱   │
                    │     [LƯỚI HUYẾT]    │
                    │   ╱   [MỤC TIÊU] ╲   │
              [Cọc Phá Linh] ────────── [Đài Trấn Ma]
    `,
    corePhilosophy: 'Chuyên dụng để phàm nhân vây khốn và trảm sát tu sĩ Kim Đan, Nguyên Anh. Dùng huyết sát quân đội và trận bàn phá linh dập tắt linh khí của đối phương.',
    deploymentRules: [
      'Đóng 9 chiếc Cọc Phá Linh bằng đồng thau đen xuống 9 huyệt vị địa mạch.',
      'Sử dụng lưới xích sắt ngâm máu chó mực và tro linh phù bện chặt, do 100 tráng sĩ lực lưỡng kéo căng.',
      'Trận binh đồng thanh hô vang quân hiệu; mười vạn tiếng hô hợp nhất sinh ra Khí Sát Binh Huyết xé rách linh quang hộ thể.',
      'Chuẩn bị 50 cây Trọng Nỏ Phá Thiên ngắm bắn đồng loạt vào đan điền mục tiêu.'
    ],
    movementAndManeuvers: [
      'Vây hãm: Khi tu sĩ hạ cánh xuống hoặc bay thấp dưới 10 trượng, 9 cọc phá linh lập tức kích hoạt hút cạn linh khí xung quanh.',
      'Quăng lưới: Tứ phía quăng lưới xích sắt đan xen, đè ép tu vi của tu sĩ xuống ngang hàng phàm nhân.',
      'Tru sát: Trọng nỏ khai hỏa kết liễu trước khi tu sĩ kịp vận dụng bí thuật đào tẩu.'
    ],
    signalCommands: {
      drum: 'Trống Huyết Sát bọc da yêu thú thúc dồn dập khiến kinh mạch địch chấn động.',
      flag: 'Cờ chữ Sát màu máu đỏ thẫm phất chéo.',
      gong: 'Chiêng Phá Linh đánh vang dội làm nhiễu loạn thần niệm ngự kiếm.',
      flare: 'Hỏa tiễn tím phóng lên làm mù mắt tu sĩ trong thoáng chốc.'
    },
    suitableTroops: ['Binh Sát Thiết Vệ', 'Thần Nỏ Phá Linh Doanh', 'Tráng Sĩ Kéo Xích'],
    suitableTerrain: ['Sơn cốc kín gió', 'Quảng trường tông môn', 'Trước cổng thành cổ'],
    strongAgainst: ['Tu sĩ ngạo mạn đơn thương độc mã', 'Phi kiếm cao thủ', 'Yêu vương hóa hình'],
    weakAgainst: ['Quân đội thông thường số lượng lớn tràn vào giải cứu', 'Khoảng không gian trên mây quá cao'],
    counterManeuver: 'Không bao giờ hạ cánh xuống trận địa; dùng linh phù bay cao trên trời oanh tạc phá hủy 9 cọc đồng trước.',
    battleProseSample: `Vị Kim Đan trưởng lão ngạo nghễ ngự trên phi kiếm, cười khẩy nhìn ngàn phàm nhân bên dưới: \"Lũ sâu kiến các ngươi cũng dám cản bản tọa?\"

Tiêu Cảnh lạnh lùng giơ tay: \"Tỏa Long Trận! Khởi!\"

\"ẦM!\" Chín chiếc cọc đồng thau đóng phập xuống đất, hào quang màu máu bốc lên nghi ngút biến bầu trời thành một chiếc lồng giam đỏ rực. Linh khí quanh thân vị trưởng lão bỗng chốc đông cứng, phi kiếm dưới chân run rẩy mất kiểm soát rơi thẳng xuống đất! 

Chưa kịp hiểu chuyện gì xảy ra, chín sợi xích sắt to như bắp đùi đã từ bốn phương tám hướng lao vút tới quấn chặt tứ chi và đan điền hắn. Huyết sát của ba ngàn chiến sĩ kết thành một con Huyết Long gầm vang ép chặt thần thức của hắn. \"Trước luật pháp Đại Càn, Kim Đan cũng phải quỳ!\" — Một tiếng gầm vang lên, tiễn thần xuyên tim, kết liễu ngàn năm tu vi của một kẻ ngông cuồng!`
  },
  {
    id: 'tran_phong_hong',
    name: 'Phong Hống Phá Thiên Trận (Trận Gầm Gió Hỏa Pháo)',
    alias: 'Cơ Quan Oanh Tạc Diệt Môn Trận',
    category: 'Công Kích Mãnh Liệt',
    symbol: '💥',
    diagramText: `
          [Trận Tiền: Nỏ Rào Chắn] ── [Cơ Quan Chiến Xa Hộ Vệ]
                    │
          [Hàng Trung: 50 Cỗ Chấn Thiên Phá Linh Cự Pháo]
                    │
          [Hậu Trận: Đạn Dược Băng Hỏa & Phù Văn Tiếp Năng]
    `,
    corePhilosophy: 'Dùng ưu thế hỏa khí cơ quan áp đảo tuyệt đối, bắn nát mọi thành trì và sơn môn từ cự ly ngoài tầm mắt trước khi bộ binh tiến vào dọn dẹp.',
    deploymentRules: [
      'Bố trí đại pháo theo hàng ngang bậc thang, mỗi cỗ pháo cách nhau 5 trượng để tránh nổ dây chuyền.',
      'Cần 4 pháo thủ cho một cỗ: 1 người chỉnh kính ngắm thiên cơ, 2 người nạp đạn thạch bích, 1 người kích hoạt lôi phù.',
      'Bố trí hào nước sâu và rào cự mã phía trước bảo vệ trận địa pháo khỏi kỵ binh cảm tử của địch.',
      'Luôn có một đội kỵ binh tinh nhuệ phục sẵn hai bên cánh để ngăn địch đánh úp vào sườn trận địa pháo.'
    ],
    movementAndManeuvers: [
      'Bắn theo đợt luân phiên: 25 cỗ bắn, 25 cỗ nạp đạn, giữ hỏa lực liên tục không ngừng nghỉ.',
      'Chuyển làn hỏa lực: Khi pháo hiệu đổi màu, nâng góc bắn thêm 10 độ để dồn lửa vào sâu trong hậu phương địch.'
    ],
    signalCommands: {
      drum: 'Trống thúc một tiếng sấm vang báo lệnh nạp đạn; ba tiếng dồn báo khai hỏa!',
      flag: 'Cờ Hỏa Long đỏ thẫm vung thẳng về phía mục tiêu.',
      gong: 'Chiêng gõ gấp khi súng pháo bị quá nhiệt cần đổ nước lạnh làm nguội nòng.',
      flare: 'Đạn khói đen chỉ điểm tọa độ cần san bằng.'
    },
    suitableTroops: ['Thần Hỏa Pháo Binh', 'Cơ Quan Binh', 'Trọng Giáp Hộ Vệ Doanh'],
    suitableTerrain: ['Đỉnh đồi cao', 'Khoảng đất trống nhìn ra sơn môn địch', 'Bờ hào đối diện cổng thành'],
    strongAgainst: ['Hộ sơn đại trận cố định', 'Thành trì kiên cố', 'Đội hình bộ binh co cụm đông đảo'],
    weakAgainst: ['Khinh kỵ binh tập kích nhanh trong đêm', 'Sát thủ ẩn thân độn thổ'],
    counterManeuver: 'Cử thích khách hoặc kỵ binh bay liều chết lao vào phá hủy kho thuốc súng và nòng pháo trước khi trận địa kịp khai hỏa.',
    battleProseSample: `Trước cổng sơn môn ngàn năm của Vấn Tiên Tông, năm mươi cỗ Chấn Thiên Cự Pháo xếp hàng uy nghi như đàn cự thú thời cổ đại. Nòng pháo bằng huyền thiết đen bóng khắc đầy lôi phù lấp lánh ánh lam.

Tiêu Cảnh giơ cao bảo kiếm: \"Bắn tan đại trận! Để chư tiên biết phàm nhân cũng có thể nghịch thiên!\"

\"ĐÙNG! ĐÙNG! ĐÙNG!\"

Năm mươi tiếng sấm sét đồng loạt nổ tung làm đất trời rung chuyển dữ dội. Năm mươi luồng cầu lửa bọc lôi điện lao vút qua khoảng không mười dặm, đâm sầm vào màn quang tráo hộ sơn ngàn năm. Màn bảo vệ vốn được xưng tụng là 'Vạn Kiếp Bất Diệt' nứt toác như vỏ trứng gà rồi vỡ tan tành thành triệu mảnh ánh sáng lấp lánh. Khói lửa cuồn cuộn bốc cao trăm trượng, san bằng toàn bộ cổng chào cẩm thạch kiêu ngạo thành bình địa!`
  }
];

// -------------------------------------------------------------------------
// 2. CÁC BINH CHỦNG TINH NHUỆ CỦA TIÊN TRIỀU
// -------------------------------------------------------------------------
export const MASTER_TROOP_BRANCHES: TroopBranch[] = [
  {
    id: 'binh_huyen_giap_thuẫn',
    name: 'Huyền Giáp Trọng Thuẫn Doanh (Cự Thuẫn Bất Hoại)',
    category: 'Bộ Binh Trọng Giáp',
    icon: '🛡️',
    role: 'Bức tường thép sống của quân đội. Chuyên trách chặn đứng các đợt xung kích bão táp của kỵ binh và yêu thú, bảo vệ nỏ thủ phía sau.',
    standardEquipment: [
      'Cự Thuẫn Huyền Thiết nặng 120 cân, có chốt liên kết khóa xích.',
      'Trường thương ba trượng mũi xẻ rãnh máu xuyên thấu giáp.',
      'Áo giáp vảy cá ba lớp (gỗ lim, da yêu thú, thép bách luyện).',
      'Đoản đao trảm mã phòng thân khi cận chiến giáp lá cà.'
    ],
    trainingDisciplines: [
      'Gánh tạ 200 cân leo núi mỗi sớm để rèn đôi chân vững như rễ tùng cổ thụ.',
      'Khổ luyện bài tập \"Bất Động Như Sơn\": Đứng im chịu đòn lao của bò mộng mà không chớp mắt.',
      'Kỹ thuật phối hợp khiên - thương: Một khiên che chắn, ba ngọn thương từ khe hở đồng loạt đâm xuyên tim đối thủ.'
    ],
    advantages: ['Phòng ngự chính diện vô địch', 'Kháng chấn động mạnh', 'Không bao giờ tan vỡ trước kỵ binh'],
    weaknesses: ['Di chuyển chậm chạp', 'Dễ mỏi mệt khi hành quân viễn chinh xa', 'Dễ bị hỏa công đốt cháy khi đứng co cụm'],
    terrainMastery: {
      ideal: 'Cửa ải hẹp, cầu phao độc đạo, mặt trận phòng ngự cố định.',
      harsh: 'Bãi lầy bùn sâu ngập gối làm kẹt giáp sắt nặng nề.'
    },
    battlefieldMotto: 'Khiên còn người còn, khiên vỡ lấy thân lấp lỗ hổng!',
    synergyWith: 'Thần Cơ Nỏ Binh — Thuẫn che mưa tên, Nỏ gặt mạng giặc.',
    proseExcerpt: 'Một ngàn tấm khiên thép nặng nề cắm phập xuống bùn đất, xích sắt rổn rảng khóa chặt thành một khối đá tảng duy nhất. Dù yêu lang lao vào cắn xé gãy cả nanh, bức tường thép vẫn lạnh tanh không một vết rạn nứt.'
  },
  {
    id: 'binh_phong_loi_long_ky',
    name: 'Phong Lôi Long Kỵ Doanh (Thiết Mã Trảm Tiên)',
    category: 'Kỵ Binh Thiết Giáp',
    icon: '🐎',
    role: 'Mũi khoan thép xuyên thủng mọi hàng ngũ địch. Chuyên trách vu hồi đánh úp mạn sườn, truy sát tướng soái và cắt đứt đường lương thảo.',
    standardEquipment: [
      'Chiến mã lai huyết Yêu Thú Huyết Hãn, bờm rực lửa, móng bọc thép.',
      'Mạch Đao hai lưỡi chém đứt cả người lẫn ngựa giặc.',
      'Cung ngắn cưỡi ngựa bắn tên xuyên giáp.',
      'Giáp nhẹ linh hoạt bọc khớp chân tay.'
    ],
    trainingDisciplines: [
      'Cưỡi ngựa bắn bia di động ở cự ly trăm bước trong đêm đen.',
      'Rèn kỹ năng ngả người sát lưng ngựa né kiếm khí của tu sĩ.',
      'Binh sĩ và chiến mã ăn chung ngủ chung, tâm ý tương thông như một thể.'
    ],
    advantages: ['Tốc độ di chuyển thần tốc', 'Sức tàn phá kinh hoàng khi xung trận', 'Linh hoạt biến đổi trận hình'],
    weaknesses: ['Sợ bãi cọc cự mã chôn ngầm', 'Dễ trúng bẫy đầm lầy và hố chông', 'Tiêu hao lương thảo nuôi ngựa rất lớn'],
    terrainMastery: {
      ideal: 'Bình nguyên bao la, thảo nguyên cỏ thấp, đồi thoải rộng.',
      harsh: 'Rừng rậm chằng chịt dây leo và hẻm núi đá lởm chởm gập ghềnh.'
    },
    battlefieldMotto: 'Vó ngựa đi qua, cỏ cây không mọc, sơn hà quy phục!',
    synergyWith: 'Bộ Binh Cản Bước — Bộ binh giữ chân địch, Kỵ binh xé toạc sau lưng.',
    proseExcerpt: 'Tiếng móng sắt dồn dập rền vang như sấm sét xé tan màn đêm. Ba ngàn Long Kỵ phủ áo choàng đen lao vụt qua như cơn lốc xoáy, lưỡi Mạch Đao vung lên vẽ thành vệt trăng khuyết đẫm máu trong ánh tà dương.'
  },
  {
    id: 'binh_than_co_no_doanh',
    name: 'Thần Cơ Nỏ Binh (Liên Châu Xạ Tiễn Doanh)',
    category: 'Nỏ Cơ Quan Xạ Kích',
    icon: '🎯',
    role: 'Nắm giữ hỏa lực sát thương tầm xa chủ lực. Có khả năng bắn liên hoàn mười mũi tên không cần giương dây thủ công, phá vỡ hộ thể chân khí.',
    standardEquipment: [
      'Gia Cát Thần Nỏ cải tiến: Hộp tên chứa 12 mũi tiễn phá linh.',
      'Mũi tên bọc bạc khắc phù văn phá giáp, tẩm độc tê liệt kinh mạch.',
      'Kính ngắm cự ly bằng pha lê thiên cơ.',
      'Dao găm ngắn và lựu đạn khói phòng thân khi bị áp sát.'
    ],
    trainingDisciplines: [
      'Tập nạp đạn mù mắt: Bịt mắt thay hộp tên trong 3 tiếng thở.',
      'Luyện ngắm bắn giọt nước rơi từ cành cây để giữ tay vững như bàn thạch.',
      'Hiệp đồng xạ kích ba hàng luân chuyển: Hàng 1 bắn, hàng 2 chuẩn bị, hàng 3 nạp đạn.'
    ],
    advantages: ['Mật độ hỏa lực cực dày đặc', 'Sát thương xuyên giáp cao từ xa', 'Người mới tập 3 tháng đã có thể hạ cao thủ'],
    weaknesses: ['Hết tên là vô dụng', 'Cận chiến rất yếu ớt', 'Sợ trời mưa làm ẩm dây gân nỏ'],
    terrainMastery: {
      ideal: 'Mặt thành cao, sườn núi nhìn xuống hẻm, boong thuyền lớn.',
      harsh: 'Sương mù dày đặc không nhìn thấy mục tiêu ngoài mười bước.'
    },
    battlefieldMotto: 'Tên bay ngợp trời, thần tiên rơi lệ, vạn dặm không bóng chim!',
    synergyWith: 'Trọng Thuẫn Doanh — Đứng sau khiên thép ung dung xả tiễn.',
    proseExcerpt: 'Tiếng \"Cạch... Vút!\" vang lên khô khốc thành từng tràng dài vô tận. Một vạn mũi tên thép đen ngòm bay rợp trời như bầy châu chấu đói, cắm phập xuống trận địa địch rào rào như mưa rào mùa hạ.'
  },
  {
    id: 'binh_linh_van_tran_binh',
    name: 'Linh Văn Trận Binh (Phù Trận Sư Quân Doanh)',
    category: 'Phù Văn Trận Binh',
    icon: '📜',
    role: 'Hỗ trợ chiến thuật và phong tỏa linh lực. Chuyên vẽ đại trận trên quy mô chiến trường, giải trừ cấm chế của tu sĩ địch và cường hóa vũ khí phe ta.',
    standardEquipment: [
      'Trận Bàn khắc cửu cung bát quái bằng ngọc huyền vũ.',
      'Cờ lệnh vẽ phù chu sa ngũ hành.',
      'Túi trữ trữ linh thạch và bình mực máu linh thú dẫn linh.',
      'Thanh kiếm gỉ trừ tà dẫn lôi.'
    ],
    trainingDisciplines: [
      'Ghi nhớ 360 loại biến hóa trận pháp địa mạch trong lòng bàn tay.',
      'Vẽ bùa dưới mưa gió và tiếng gầm thét chiến trận mà tâm không động.',
      'Cách cắm cọc trận nhãn chỉ trong một khắc để dựng rào chắn cản địch.'
    ],
    advantages: ['Khống chế diện rộng xuất sắc', 'Vô hiệu hóa pháp bảo của tu sĩ', 'Tạo ra ảo cảnh che giấu quân đội'],
    weaknesses: ['Cần thời gian chuẩn bị trận địa', 'Thân thể yếu ớt trước đòn tấn công vật lý', 'Tiêu hao nhiều linh tài đắt đỏ'],
    terrainMastery: {
      ideal: 'Nơi có linh mạch ngầm giao nhau, phế tích cổ trận, hang động hẹp.',
      harsh: 'Vùng đất cằn cỗi tuyệt linh không có địa khí để mượn sức.'
    },
    battlefieldMotto: 'Lấy đất làm giấy, lấy kiếm làm bút, giam cầm càn khôn!',
    synergyWith: 'Binh Hỏa Pháo — Cường hóa sức nổ lôi hỏa cho từng quả đạn pháo.',
    proseExcerpt: 'Trận kỳ cắm xuống, mặt đất lập tức phát ra những luồng sáng xanh biếc đan xen như mạng nhện khổng lồ. Hàng vạn thanh phi kiếm của tu sĩ giặc vừa bay vào không phận liền run rẩy rồi cắm phầm phập xuống đất vì mất hết linh tính.'
  },
  {
    id: 'binh_huyet_dao_cam_tu',
    name: 'Huyết Đao Cảm Tử Đội (Phá Cửa Khai Phong Quân)',
    category: 'Khinh Binh Tiên Phong',
    icon: '🩸',
    role: 'Đội quân tử sĩ không màng mạng sống. Dùng để phá vỡ bế tắc chiến trường, ôm bom lôi hỏa đục thủng cổng thành hoặc lao vào chém rách soái kỳ địch.',
    standardEquipment: [
      'Bá Đao thép đen chém sắt như chém bùn.',
      'Gói Lôi Hỏa Phá Cấm đeo trước ngực sẵn sàng tự bộc.',
      'Uống Binh Huyết Tẩy Tủy Dịch để vô cảm với đau đớn trong 1 canh giờ.',
      'Khôi giáp nhẹ đan bằng mây gai chống ám khí.'
    ],
    trainingDisciplines: [
      'Luyện ý chí: Nhìn chằm chằm vào cái chết mà không chùn bước.',
      'Kỹ thuật chém áp sát: Bỏ qua phòng thủ, một đao đổi mạng lấy đầu tướng giặc.',
      'Tốc độ bứt phá cự ly ngắn: Lao 50 bước trong vòng 3 nhịp thở dưới làn mưa tên.'
    ],
    advantages: ['Nhuệ khí cực kỳ hung hãn làm quân địch khiếp vía', 'Sát thương bộc phát cực mạnh', 'Không sợ chết, miễn nhiễm ảo giác'],
    weaknesses: ['Tỷ lệ thương vong cực cao', 'Không duy trì được trận chiến giằng co kéo dài', 'Thiếu khả năng phòng ngự tầm xa'],
    terrainMastery: {
      ideal: 'Chiến hào hẹp, cổng thành vỡ, cầu treo giằng co, đồi dốc dốc đứng.',
      harsh: 'Khoảng đất trống mênh mông bị nỏ thần đối phương bắn rỉa từ xa.'
    },
    battlefieldMotto: 'Bước lên không lùi, đầu rơi máu chảy quyết phá trận tiền!',
    synergyWith: 'Phong Thỉ Trận — Đóng vai trò là đầu nhọn của mũi tên thép.',
    proseExcerpt: 'Năm trăm dũng sĩ cởi trần khoác áo choàng đỏ, trán buộc khăn điều, vung thanh đao lớn lao thẳng vào miệng hùm. Tiếng đao chém thịt ngọt xớt hòa lẫn tiếng gầm rung chuyển màng nhĩ, mở toang một con đường máu giữa rừng quân giặc.'
  }
];

// -------------------------------------------------------------------------
// 3. THIẾT HUYẾT QUÂN QUY & LUYỆN QUÂN PHÁP
// -------------------------------------------------------------------------
export const MASTER_TRAINING_DOCTRINES: TrainingDoctrine[] = [
  {
    id: 'quy_thap_bat_tram',
    title: 'Thiết Huyết Thập Bát Quy (Mười Tám Điều Lệnh Trảm)',
    category: 'Quân Quy Thập Bát Lệnh',
    principle: 'Kỷ luật là linh hồn của quân đội. Quân pháp vô tình, dẫu là hoàng thân quốc thích phạm lỗi cũng cùng tội với thứ dân.',
    detailMethods: [
      'Nghe tiếng trống không tiến, nghe tiếng chiêng không lui: Trảm!',
      'Làm trễ hạn quân cơ quá nửa khắc làm lỡ thời cơ tác chiến: Trảm!',
      'Gieo rắc tin đồn hoang mang, bàn lùi việc triều chính làm lung lay lòng quân: Trảm!',
      'Cướp đoạt một đồng bạc, một cọng rơm của bách tính nơi đóng quân: Trảm!',
      'Bỏ rơi đồng đội khi lâm trận, tự ý đào tẩu khỏi hàng ngũ: Trảm cả nhà!',
      'Tướng soái say rượu trong quân doanh, bỏ bê việc canh phòng ban đêm: Trảm tướng thế mạng phó tướng!'
    ],
    historicalPrecedent: 'Tiêu Cảnh từng xử trảm chính biểu đệ của mình ngay trước ba quân khi người này đến trễ nửa khắc trong chiến dịch Tuyết Lương Quan, từ đó mười vạn tướng sĩ răm rắp tuân lệnh.',
    narrativeImpact: 'Tạo nên không khí kỷ luật thép, uy nghiêm đến nghẹt thở cho phe nhân vật chính; đối lập hoàn toàn với sự hỗn loạn buông thả của các tông môn.'
  },
  {
    id: 'luyen_binh_huyet_khi',
    title: 'Binh Huyết Đồng Tâm Pháp (Huyết Khí Trừ Tà Luyện Quân)',
    category: 'Binh Huyết Khí Phách',
    principle: 'Vạn người một lòng, huyết khí bốc lên ngút trời tạo thành sát khí thực thể, phàm nhân có thể ép quỳ tu sĩ.',
    detailMethods: [
      'Uống canh Thảo Mộc Tẩy Tủy đun cùng sừng yêu thú và rượu mạnh mỗi đêm rằm.',
      'Đồng thanh hô vang chiến khẩu: Mỗi ngày 1 canh giờ tập luyện tiếng hô vang rền như sấm rền để dung hợp khí tức.',
      'Huấn luyện chịu đòn: Đứng dưới thác nước băng giá chịu đựng dòng nước xiết dội xuống đầu để rèn luyện ý chí sắt đá.',
      'Kết nối Huyết Trận: Khi lâm trận, vết thương của một người kích thích nộ khí của vạn người, ngưng tụ Binh Sát Hoàng Long che chở toàn quân khỏi huyễn thuật.'
    ],
    historicalPrecedent: 'Ba ngàn thiết kỵ ở Bắc Lương đã dùng huyết sát tập thể đè bẹp thần thức của một vị Kim Đan Yêu Vương khiến gã không thể vận chuyển chân nguyên mà bị chém chết dưới chân ngựa.',
    narrativeImpact: 'Giải thích hợp lý và thuyết phục cho việc làm thế nào quân đội phàm nhân có thể đối kháng và đánh thắng tu sĩ tiên tông ngạo mạn.'
  },
  {
    id: 'luyen_hiep_dong_binh_chung',
    title: 'Ngũ Hành Tương Khắc Hiệp Đồng Diễn Võ',
    category: 'Hiệp Đồng Chiến Thuật',
    principle: 'Không có binh chủng nào vô địch, chỉ có sự phối hợp ăn ý không kẽ hở mới tạo nên đoàn quân bách chiến bách thắng.',
    detailMethods: [
      'Bài tập \"Thuẫn Ngã Nỏ Tiến\": Khi thuẫn giáp tiến ba bước, nỏ thủ lập tức bước so le sang khe hở xả tên rải thảm.',
      'Bài tập \"Kỵ Bộ Đan Xen\": Kỵ binh giả vờ rút lui nhử địch đuổi theo, vừa qua khỏi bụi cây thì Bộ Binh trọng thuẫn lập tức sập bẫy khóa chặt.',
      'Nhìn cờ đoán ý: Luyện tập trong bão tuyết và đêm tối chỉ nhìn ánh lửa và màu cờ để biến trận từ Nhạn Hành sang Phương Trận trong vòng 60 tiếng thở.'
    ],
    historicalPrecedent: 'Chiến dịch Đột Kích Vấn Tiên Phong: Sự hiệp đồng chuẩn xác từng giây giữa Nỏ Binh và Kỵ Binh đã tiêu diệt năm ngàn kiếm tu trong thung lũng chỉ sau một canh giờ.',
    narrativeImpact: 'Tạo ra những phân cảnh chiến thuật đỉnh cao, mang đậm tính trí tuệ và đấu trí quân sự chân thực.'
  }
];

// -------------------------------------------------------------------------
// 4. BÍ QUYẾT TÁC CHIẾN THEO CÁC ĐỊA HÌNH
// -------------------------------------------------------------------------
export const MASTER_TERRAIN_TACTICS: TerrainTactic[] = [
  {
    id: 'dia_hinh_binh_nguyen',
    terrainName: 'Bình Nguyên Thảo Dã (Đồng Bằng Bằng Phẳng)',
    icon: '🌾',
    nature: 'Tầm nhìn bao la vạn dặm, không có vật cản, địa thế mở rộng bốn phương.',
    tacticalAdvantage: 'Thuận lợi nhất cho kỵ binh đột kích tốc độ cao và triển khai đại trận quy mô lớn như Phong Thỉ Trận hay Hạc Dực Trận.',
    fatalDisadvantages: [
      'Không có nơi ẩn nấp, dễ bị hỏa tiễn và nỏ thần tầm xa bắn tỉa bao phủ.',
      'Hai bên sườn hoàn toàn trơ trọi, dễ bị kỵ binh địch vu hồi cắt đứt hậu phương.'
    ],
    recommendedFormations: ['Phong Thỉ Trận (Đột kích xuyên tâm)', 'Hạc Dực Trận (Bao vây hai cánh)', 'Nhạn Hành Trận (Xạ kích tập trung)'],
    favoredTroops: ['Long Kỵ Thiết Binh', 'Thần Cơ Nỏ Binh'],
    disfavoredTroops: ['Bộ binh khiên nặng di chuyển chậm'],
    ambushOpportunities: 'Lợi dụng thời tiết sương mù sáng sớm hoặc dùng bẫy hố chông đào ngầm phủ cỏ khô trên mặt đất.',
    proseSceneTip: 'Tập trung miêu tả sự rền vang của móng ngựa rung chuyển thảo nguyên, bụi mù bốc cao vạn trượng che lấp ánh mặt trời.'
  },
  {
    id: 'dia_hinh_son_coc',
    terrainName: 'Sơn Cốc Hiểm Quan (Hẻm Núi Độc Đạo)',
    icon: '⛰️',
    nature: 'Hai bên vách đá dựng đứng cheo leo, ở giữa chỉ có một con đường mòn nhỏ hẹp vừa hai cỗ xe đi qua.',
    tacticalAdvantage: 'Nhất phu đương quan, vạn phu mạc khai! Rất thích hợp để lấy ít địch nhiều, phục kích tiêu diệt lực lượng vượt trội.',
    fatalDisadvantages: [
      'Nếu bị chặn đứng hai đầu thì không lối thoát thân, biến thành hòm chôn sống.',
      'Dễ bị đá lăn, cây gỗ cháy và đất lở từ trên đỉnh vách núi dội xuống đầu.'
    ],
    recommendedFormations: ['Ngư Lân Trận hẹp', 'Bát Quái Phục Kích Trận', 'Thuẫn Giáp Khóa Hẻm'],
    favoredTroops: ['Huyền Giáp Trọng Thuẫn', 'Nỏ Binh phục kích trên cao', 'Phù Trận Sư'],
    disfavoredTroops: ['Thiết Kỵ (không có không gian lấy đà, ngựa trở thành bia ngắm)'],
    ambushOpportunities: 'Giấu quân trên vách đá hai bên, giả thua nhử toàn bộ tiền quân và lương thảo giặc vào bụng hẻm rồi cho nổ sập hai đầu.',
    proseSceneTip: 'Miêu tả sự ngột ngạt, tiếng đá lăn ầm ầm từ vách núi cao, tiếng la hét tuyệt vọng vang vọng giữa vách đá hẹp không đường trốn chạy.'
  },
  {
    id: 'dia_hinh_dam_lay',
    terrainName: 'Đầm Lầy Thủy Quái (Đầm Nước & Rừng Sậy)',
    icon: '🛶',
    nature: 'Mặt đất bùn lầy lún sâu, sương mù độc hại bốc lên quanh năm, lau sậy rậm rạp che khuất tầm nhìn.',
    tacticalAdvantage: 'Triệt tiêu hoàn toàn sức mạnh của kỵ binh giáp nặng và chiến xa hạng nặng.',
    fatalDisadvantages: [
      'Binh sĩ mặc giáp sắt dễ bị sa lầy chìm nghỉm.',
      'Khí độc làm suy giảm thể lực và hao hụt quân số do bệnh tật dịch tả.'
    ],
    recommendedFormations: ['Du Kích Tản Khai Trận', 'Thuyền Chiến Liên Hoàn', 'Bát Quái Ảo Ảnh'],
    favoredTroops: ['Khinh Binh Tiên Phong mang giày cỏ nhẹ', 'Nỏ nhẹ tẩm độc', 'Chiến thuyền đáy bằng'],
    disfavoredTroops: ['Trọng Bộ Binh Huyền Giáp', 'Long Kỵ Thiết Mã'],
    ambushOpportunities: 'Ngâm mình dưới nước lau sậy thở qua ống trúc rỗng, bất ngờ chém chân lính giặc khi chúng lội qua vũng lầy.',
    proseSceneTip: 'Khắc họa sự rình rập chết chóc, mặt nước phẳng lặng bỗng chốc sủi bọt máu tươi, tiếng rít của độc tiễn xé rách sương mù dày đặc.'
  },
  {
    id: 'dia_hinh_thanh_tri',
    terrainName: 'Kiên Thành Quan Ải (Thành Cao Hào Sâu)',
    icon: '🏯',
    nature: 'Tường thành bằng đá hoa cương ngâm nước vôi cao mười trượng, rãnh hào sâu chứa chông nhọn, trận pháp hộ thành bao bọc.',
    tacticalAdvantage: 'Bên thủ có ưu thế địa hình tuyệt đối, dễ dàng đổ dầu sôi, thả đá tảng và bắn tên từ trên cao.',
    fatalDisadvantages: [
      'Bên công phải tốn gấp 5 lần quân số và chịu thương vong ghê gớm nếu đánh vỗ mặt.',
      'Bên thủ nếu bị vây kín ba tháng sẽ cạn kiệt lương thảo nước ngọt.'
    ],
    recommendedFormations: ['Phong Hống Pháo Trận (Bên Công)', 'Phương Trận Kiên Thủ (Bên Thủ)'],
    favoredTroops: ['Chấn Thiên Cự Pháo', 'Tiên Phong Cảm Tử Quân leo thang', 'Nỏ Binh phòng ngự'],
    disfavoredTroops: ['Kỵ binh xung kích không thể vượt qua tường đá'],
    ambushOpportunities: 'Đào địa đạo ngầm xuyên lòng đất chui vào giếng nước trong thành mở toang cửa ải từ bên trong.',
    proseSceneTip: 'Khắc họa cảnh tượng dầu sôi lửa bỏng, thang mây đổ sập, tiếng va đập long trời lở đất của chày phá thành và màn mưa tên đỏ lửa.'
  }
];

// -------------------------------------------------------------------------
// 5. CẨM NANG KHẮC CHẾ TRẬN THẾ ĐỐI PHƯƠNG
// -------------------------------------------------------------------------
export const MASTER_COUNTER_FORMATION_RULES: CounterFormationRule[] = [
  {
    id: 'counter_thiet_ky_xung_phong',
    enemyStance: 'Địch dùng Thiết Kỵ dốc toàn lực xung kích vỗ mặt',
    enemyThreat: 'Sức ép quán tính cực lớn, dễ dẫm nát hàng tiền quân trong vài giây.',
    counterFormationName: 'Cự Mã Càn Khôn + Nhạn Hành Xạ Tiễn',
    tacticalAction: 'Chôn cọc cự mã nghiêng 45 độ, hàng trước thụp cự thuẫn cắm chông, hàng nỏ phía sau ngắm bắn vào chân ngựa thay vì người.',
    decisivePhase: 'Khi hàng ngựa đầu tiên ngã nhào tạo thành chướng ngại vật cản trở đoàn ngựa phía sau, hai cánh kỵ binh ta mới bất ngờ xuất kích chém tạt sườn.',
    counterIllustration: 'Khiên Cắm Đất ➔ Chông Đâm Chân Ngựa ➔ Cung Nỏ Xả Rải Thảm ➔ Hai Cánh Xuất Kích Chém Đứt Đuôi'
  },
  {
    id: 'counter_tu_si_ngu_kiem',
    enemyStance: 'Địch dùng Kiếm Tu Tiên Tông ngự không oanh tạc kiếm khí từ trên trời',
    enemyThreat: 'Đánh từ trên cao xuống, phàm nhân khó với tới, kiếm khí nổ tung diện rộng.',
    counterFormationName: 'Cửu Châu Tỏa Long Trận + Phá Không Thần Nỏ',
    tacticalAction: 'Kích hoạt cọc phá linh làm đông đặc linh khí trong phạm vi 1 dặm, giương các tấm lưới xích ngâm huyết sát để chặn kiếm quang.',
    decisivePhase: 'Ngay khi phi kiếm của địch bị linh sát làm chậm lại, mười cỗ nỏ ngắm thẳng vào chân khí hộ thể bắn tiễn phá ma, ép tu sĩ rơi xuống đất cận chiến.',
    counterIllustration: 'Khí Sát Làm Đục Thần Thức ➔ Lưới Huyết Ngăn Kiếm Quang ➔ Trọng Nỏ Bắn Rụng Tu Sĩ Xuống Đất'
  },
  {
    id: 'counter_thu_trieu_cu_thu',
    enemyStance: 'Địch xua hàng vạn Yêu Thú cự thú khổng lồ càn quét',
    enemyThreat: 'Sức mạnh cơ bắp khủng khiếp, da dày thịt béo kháng tên thông thường, bản tính điên cuồng.',
    counterFormationName: 'Hỏa Trận Liên Hoàn + Cơ Quan Pháo Oanh',
    tacticalAction: 'Dẫn dụ thú triều vào bãi dầu hỏa chôn sẵn, khai hỏa pháo hoa băng nổ tạo âm thanh sấm sét làm kinh sợ thú tính.',
    decisivePhase: 'Thú hoảng loạn quay đầu giẫm đạp lên nhau và đè bẹp chính đội hình chỉ huy của đối phương.',
    counterIllustration: 'Bãi Lửa Ngăn Bước ➔ Pháo Sấm Gây Kinh Hoàng ➔ Thú Triều Quay Đầu Giẫm Đạp Phe Địch'
  },
  {
    id: 'counter_co_thu_phuong_tran',
    enemyStance: 'Địch co cụm thành Phương Trận mai rùa cố thủ kiên cố không chịu ra',
    enemyThreat: 'Phòng ngự không góc chết, tấn công trực diện sẽ chịu tổn thất nặng nề.',
    counterFormationName: 'Điệu Hổ Ly Sơn + Thập Diện Mai Phục',
    tacticalAction: 'Không đánh vào mai rùa. Bắn hỏa tiễn thiêu đốt kho lương tiếp tế của chúng, vờ rút quân để lại xe của cải vàng bạc giả mạo.',
    decisivePhase: 'Khi quân địch thấy ta rút lui tưởng bở hé cửa trận ra cướp đoạt, lập tức tung kỵ binh vu hồi đánh sụp cửa trận chưa kịp đóng lại.',
    counterIllustration: 'Vây Mà Không Đánh ➔ Cắt Lương Đốt Nước ➔ Dụ Mồi Rời Khỏi Trận ➔ Chém Gục Khi Đang Di Chuyển'
  }
];

// -------------------------------------------------------------------------
// 6. NGUYÊN BẢN VĂN TỰ TOÀN THƯ (ĐẠI CÀN TIÊN TRIỀU BINH PHÁP)
// -------------------------------------------------------------------------
export const MASTER_ART_OF_WAR_FULL_TREATISE = `
# ĐẠI CÀN TIÊN TRIỀU BINH PHÁP TOÀN THƯ (VẠN TRẬN QUY TÔNG)
*Trước tác: Thái Tử Tiêu Cảnh & Lão Tướng Triệu Chấn*
*Bí truyền quân sự phàm nhân nghịch phạt tiên môn, khai sáng vạn năm thịnh thế*

---

### THIÊN THỨ NHẤT: BÀY BINH BỐ TRẬN CHI ĐẠO
Binh pháp có câu: \"Binh vô thường thế, thủy vô thường hình\". Người cầm quân giỏi như người bơi thuyền thuận dòng, biết lấy thế đất, thế người mà dựng trận.

1. **Khẩu quyết bố trận**:
   - Tiên phong như dao nhọn: Phải chọn kẻ dũng mãnh nhất, vũ khí sắc bén nhất, thế tiến không gì cản nổi.
   - Trung quân như rễ núi: Phải vững chãi, quy tụ soái kỳ và các đại trận bàn cấm chế, là điểm tựa tinh thần của muôn quân.
   - Hai cánh như đại bàng: Phải cơ động linh hoạt, vừa có thể xòe rộng bao vây địch, vừa có thể khép chặt hộ vệ mạng sườn.
   - Hậu quân như đuôi rồng: Phòng ngừa tập kích sau lưng, bảo đảm thông suốt đường vận lương và cứu viện.

2. **Quy luật cự ly**:
   - Khoảng cách giữa các bộ tốt là một sải tay để vung gươm không vướng víu.
   - Khoảng cách giữa các kỵ sĩ là ba trượng để không vướng móng ngựa khi chuyển hướng đột ngột.
   - Khoảng cách giữa trận tiền và nỏ doanh là năm mươi bước — vừa đủ tầm bắn cầu vồng mà không sợ tên rơi vào đầu quân mình.

---

### THIÊN THỨ HAI: DI CHUYỂN & BIẾN HÓA CHI THUẬT
Trận pháp chết là tử trận, trận pháp sống mới là thần trận. Đặt một thế trận ra mà không biết chuyển dịch thì chỉ là miếng thịt béo cho kẻ thù xâu xé.

1. **Kỳ — Chính tương sinh**:
   - Dùng Chính binh để đỡ đòn, dùng Kỳ binh để quyết định thắng bại.
   - Địch thấy ta bày trận Nhạn Hành tưởng ta chỉ biết bắn tên, nào ngờ hai cánh đột nhiên rút kiếm biến thành Phong Thỉ đâm thấu tim sườn.
2. **Hiệu lệnh bốn cõi**:
   - **Trống**: Là khí phách. Trống thúc một hồi là chuẩn bị; trống dồn ba hồi là tiến; trống Cuồng Lôi là liều chết xung phong.
   - **Chiêng**: Là kiềm chế. Tiếng chiêng vang lên dẫu kiếm đã kề cổ giặc cũng phải thu đao quay đầu, giữ vững cự ly hàng ngũ.
   - **Cờ ngũ sắc**: Là mắt thần. Cờ đỏ chỉ hướng nam, cờ đen chỉ hướng bắc, cờ vàng đứng yên tại chỗ, cờ phất tròn là biến trận vòng cung.
   - **Hỏa tiễn**: Là thông điệp đường xa. Một phát là phát hiện địch; hai phát là cầu viện; ba phát là thiêu hủy toàn bộ trận địa cùng chết với địch.

---

### THIÊN THỨ BA: RÈN QUÂN VÀ THIẾT HUYẾT QUÂN QUY
Quân đông mà không rèn thì chỉ là bia tập bắn; tướng giỏi mà không có kỷ luật thì chỉ là phường lục lâm thảo khấu.

1. **Thiết Huyết Thập Bát Quy**:
   - Kẻ chùn bước khi nghe trống: Trảm!
   - Kẻ huyên náo trong đêm tối làm lộ quân cơ: Trảm!
   - Kẻ cậy mạnh khinh địch tự ý xuất kích: Trảm!
   - Kẻ cướp bóc một hạt thóc của dân làng biên ải: Trảm bêu đầu trước cửa thành!
2. **Tôi luyện Binh Huyết**:
   - Phàm nhân muốn thắng tu sĩ, thân thể phải cứng hơn thép bách luyện.
   - Cho binh sĩ tắm trong dược dịch sừng thú, ăn thịt yêu ma để bồi bổ huyết khí.
   - Khi mười vạn tráng sĩ cùng gầm lên một tiếng sát khí, linh áp của trời đất cũng phải rạn nứt, khiến phi kiếm tu sĩ run rẩy không dám bay gần!

---

### THIÊN THỨ TƯ: VẬN DỤNG CÁC LOẠI QUÂN BINH CHỦNG
Trời sinh muôn vật ắt có tương khắc. Không có binh chủng nào vô dụng, chỉ có tướng soái không biết dùng người.

- **Thuẫn Binh**: Đứng đầu ngọn sóng, là cha mẹ chở che tính mạng cho toàn quân.
- **Nỏ Binh**: Là lưỡi hái tử thần vô hình, giữ khoảng cách một trăm bước gặt mạng tướng giặc.
- **Long Kỵ**: Là tia chớp giữa trời quang, xuất hiện nơi hiểm yếu nhất, biến bế tắc thành thắng lợi.
- **Trận Sư**: Là trí tuệ của đất trời, mượn sức núi sông phong ấn pháp thuật huyền môn.
- **Cơ Quan Hỏa Pháo**: Là tiếng sấm thịnh nộ của phàm nhân, đập tan ảo tưởng trường sinh của các tông môn lộng quyền!

---

### THIÊN THỨ NĂM: TÁC CHIẾN THEO ĐỊA HÌNH
Đất có đất lành, đất dữ; núi có núi sống, núi chết. Kẻ biết dùng đất thì nắm chắc bảy phần thắng trong tay.

1. **Bình nguyên**: Dụng Kỵ binh làm tiên phong, Nỏ binh làm đôi cánh, lấy thế sấm sét đè bẹp đối phương.
2. **Sơn cốc hiểm trở**: Cấm kỵ kỵ binh; dùng Thuẫn Binh chốt giữ cửa ải, cho tử sĩ leo vách đá lăn đá đốt lửa tiêu diệt giặc trong lòng máng.
3. **Đầm lầy hoang dã**: Khinh binh áo cỏ, độc tiễn phục kích, dụ địch mặc giáp nặng sa lầy rồi thong thả bắt sống.
4. **Kiên thành hiểm yếu**: Trong thành dựa vào nỏ lớn và đá lửa; ngoài thành dùng hỏa pháo cơ quan bắn phá từng thước tường bao, không đánh vỗ mặt liều lĩnh.

---

### THIÊN THỨ SÁU: TÙY CƠ PHÁ TRẬN — THỰC CHIẾN BIẾN THÔNG
Địch biến ta biến, địch đứng ta di, địch động ta tĩnh. 

- Thấy giặc ngạo mạn ngự kiếm: Chớ hoảng loạn giương cung bắn bừa; hãy nhử chúng xuống thấp rồi dùng Cửu Châu Tỏa Long Trận xích cổ lôi xuống bùn nhơ.
- Thấy kỵ binh giặc cuồn cuộn: Chớ đem thịt nát đỡ móng sắt; hãy chôn cọc cự mã, rải đinh ba góc, đợi chúng gãy chân nhào lộn mới vung trường thương đâm xuyên yết hầu.
- Thấy địch đông mà ta ít: Bày Bát Quái Mê Hồn, đốt lửa giả làm vạn quân, đêm gõ thanh la làm giặc thức trắng đêm mỏi mệt rồi bất ngờ đánh úp lúc rạng đông!
`;

// =========================================================================
// RE-EXPORT BỘ BINH THƯ TƯƠNG KHẮC & THỦY LỤC HIỂM ĐỊA BINH PHÁP
// =========================================================================
export * from './antiArtOfWarBible';
export * from './amphibiousArtOfWarBible';

