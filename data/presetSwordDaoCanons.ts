import { SwordDaoCanonItem } from '../types';

export const PRESET_SWORD_DAO_CANONS: SwordDaoCanonItem[] = [
  // 1. THÁI CỔ TRU TIÊN KIẾM QUYẾT (THẦN THÁNH CHÍ TÔN - BÁ KIẾM TRẢM THIÊN)
  {
    id: 'canon_thai_co_tru_tien',
    name: 'Thái Cổ Tru Tiên Kiếm Quyết (Bá Kiếm Trảm Thiên)',
    philosophy: 'Thiên địa vi lô, sát phạt vi đạo! Kiếm vô tình, tâm vô hối, nhất kiếm xuất thế thiên địa kinh, cửu kiếm quy nhất vạn cổ diệt. Chém thần tru ma nghịch thiên cải mệnh.',
    gradeLevel: 'Thần Thánh Chí Tôn (Cực Đạo Bá Kiếm)',
    swordRankRequirements: 'Luyện Khí sơ nhập đến Thần Cấp Siêu Thoát, yêu cầu Sát Phạt Kiếm Tâm, ngộ tính Đốn Ngộ Thông Thiên',
    originAndCreator: 'Do Thái Cổ Kiếm Tổ ngộ đạo giữa Hỗn Độn Khai Thiên, lấy sát khí của bốn ngàn vạn Ma Thần đúc thành chín thức kiếm đồ trấn áp vũ trụ.',
    coreSwordIntent: 'Tru Tiên Bá Kiếm Ý — Sát phạt tuyệt đối, ngưng tụ sát khí thành kiếm cương phá tan mọi xiềng xích quy tắc.',
    absoluteSwordDomain: 'Tru Tiên Tuyệt Hủy Kiếm Vực (Bán kính vạn dặm vạn kiếm thần phục, lôi đình sát phạt bao phủ càn khôn)',
    trainingRegimen: {
      basicConditioning: 'Mỗi ngày rút kiếm mười vạn lần dưới thác nước vạn trượng tại Kiếm Nhai, ngâm cánh tay trong nước thuốc Hàn Tủy Canh Kim.',
      heartTestingTrial: 'Ngồi xếp bằng trong Kiếm Trủng ba ngàn ngày, chịu đựng vạn thanh kiếm cổ thét gào đòi mạng mà đạo tâm không dao động.',
      swordEnergyAwakening: 'Dẫn khí huyết dung hợp Canh Kim Chi Khí và Lôi Đình sát khí, ngưng tụ một giọt Sát Phạt Kiếm Tủy tại đan điền.'
    },
    stances: [
      // Thức 1 (Luyện Khí)
      {
        orderNumber: 1,
        stanceName: 'Đệ Nhất Thức: Nhất Điểm Hàn Quang (Kiếm Khí Ly Thể)',
        intentLevel: '1. Sơ Nhập Kiếm Khí (Luyện Khí - Kiếm Khí Ly Thể)',
        mantraOrIncantation: 'Rút kiếm đoạn phong tuyết, điểm chỉ toái hàn tinh. Kiếm xuất như kinh lôi, chớp mắt lấy mạng người.',
        qiMovementPath: 'Khí từ Đan Điền trào dâng, qua Khí Hải men theo Thủ Thái Âm Phế Kinh, nén chặt tại Thiếu Thương huyệt rồi phóng thẳng ra đầu mũi kiếm.',
        footworkAndKinetic: 'Thập Tự Bạt Kiếm Bộ: Chân trước 3 phần chịu lực, chân sau 7 phần dồn đà, xoay hông 45 độ bật đà tựa lò xo nén.',
        physicalMovementAndFootwork: 'Trọng tâm hạ thấp một tấc, cổ tay rung lắc nhẹ tạo lực xoắn, kiếm rút ra theo đường thẳng tuyệt đối không dư ảnh.',
        swordFormMechanics: 'Đâm thẳng chính diện (Thích kiếm) kết hợp xoay cổ tay góc 15 độ, tạo luồng xoáy chân không xé rách không khí.',
        visualPhenomenon: 'Mũi kiếm ngưng tụ điểm sáng bạc sắc bén tựa giọt sương mai, phát ra tiếng rít xé gió rợn người.',
        offensiveLethality: 'Đâm thủng màng hộ thể Luyện Khí tầng 9 và khôi giáp Huyền Thiết trong phạm vi ba trượng chỉ trong một phần mười cái chớp mắt.',
        defensiveVersatility: 'Dùng điểm phá diện, đâm thẳng vào tâm chấn đòn công kích của kẻ thù để triệt tiêu toàn bộ lực chấn động.',
        hardcoreTrainingMethod: 'Treo đồng tiền cách xa ba trượng, mỗi ngày rút kiếm đâm xuyên qua lỗ tròn đồng tiền 5.000 lần.',
        enlightenmentKey: 'Ngộ chữ "Khoái" (Nhanh): Khi tốc độ vượt qua phản xạ của mắt thường, kiếm khí tự động hóa thành sát chiêu đoạt mạng.',
        fatalFlawIfRushed: 'Nếu khí huyết chưa thông suốt mà cưỡng ép phát lực, kinh mạch ngón tay trỏ sẽ bị nứt toác chảy máu.'
      },
      // Thức 2 (Trúc Cơ)
      {
        orderNumber: 2,
        stanceName: 'Đệ Nhị Thức: Cuồng Lôi Đoạn Nhạc (Kiếm Phong Như Vũ)',
        intentLevel: '2. Kiếm Khí Tung Hoành (Trúc Cơ - Kiếm Phong Như Vũ)',
        mantraOrIncantation: 'Phong lôi cuộn sóng kiếm cương khai, ba thước thanh phong trảm thiên đài. Vạn mã tề bôn sơn nhạc toái.',
        qiMovementPath: 'Linh lực Trúc Cơ sôi trào từ Đan Điền, qua Đốc Mạch dâng lên Đại Chùy huyệt, phân chia thành hai luồng rót vào hai cánh tay.',
        footworkAndKinetic: 'Du Long Hoán Ảnh Bộ: Bước chân đan chéo ziczac, thân hình thoắt ẩn thoắt hiện tạo thành ba đạo tàn ảnh bao vây mục tiêu.',
        physicalMovementAndFootwork: 'Thân hình xoay tròn nửa vòng, vung kiếm quét ngang 180 độ, kết hợp đè kiếm chém xéo từ vai trái xuống hông phải.',
        swordFormMechanics: 'Chém quét liên hoàn (Liêu kiếm & Tảo kiếm), cổ tay chuyển hướng liên tục duy trì kiếm cương dài ba thước không đứt đoạn.',
        visualPhenomenon: 'Kiếm cương bộc phát màu lam đậm kèm theo tia chớp sấm sét nổ lách tách, tạo thành cơn lốc kiếm khí cuộn tròn.',
        offensiveLethality: 'Quét sạch đội hình kẻ địch, chặt đứt cây cổ thụ trăm năm và chém nát khiên chắn phòng hộ của tu sĩ Trúc Cơ.',
        defensiveVersatility: 'Kiếm phong xoay tròn hình thành bức tường gió áp suất cao, đánh bật toàn bộ tiễn tiễn và ám khí bay tới.',
        hardcoreTrainingMethod: 'Đứng giữa rừng trúc đang rung lắc trong cơn bão, vung kiếm chém đứt lá trúc rơi mà không làm gãy thân trúc.',
        enlightenmentKey: 'Ngộ chữ "Cương" (Mạnh mẽ): Kiếm cương không chỉ sắc mà phải có sức nặng tựa nghìn cân sấm sét giáng lâm.',
        fatalFlawIfRushed: 'Hao tổn chân nguyên quá nhanh, dễ bị kiệt sức nếu để đối thủ kéo dài trận đấu.'
      },
      // Thức 3 (Kim Đan)
      {
        orderNumber: 3,
        stanceName: 'Đệ Tam Thức: Bách Bộ Phi Kiếm (Ngự Kiếm Phi Không)',
        intentLevel: '3. Kiếm Mang Hóa Hình (Kim Đan - Ngự Kiếm Phi Không)',
        mantraOrIncantation: 'Tâm niệm nhất động phi kiếm xuất, ngàn dặm lấy đầu tựa hái hoa. Kiếm quang phân hóa ba mươi sáu, bện lưới tru ma vạn trượng xa.',
        qiMovementPath: 'Kim Đan trong đan điền xoay tròn, phóng xuất Thần Thức Chân Khí qua Bách Hội huyệt, kết nối trực tiếp với linh tính chuôi kiếm.',
        footworkAndKinetic: 'Lăng Không Hư Bộ: Chân đạp không khí mượn lực linh áp, thân thể lơ lửng trên không trung ba trượng.',
        physicalMovementAndFootwork: 'Hai tay chắp sau lưng hoặc bắt Kiếm Quyết (Ngón trỏ và ngón giữa dựng thẳng), chỉ đâu kiếm bay đến đó.',
        swordFormMechanics: 'Phân hóa kiếm quang (Phân kiếm quyết): Một kiếm phân thành 36 đạo kiếm ảnh thật giả khó lường, đan thành Kiếm Trận.',
        visualPhenomenon: 'Bầu trời rực sáng 36 vệt cầu vồng chói lòa, phi kiếm bay lượn như rồng bạc xé toạc tầng mây.',
        offensiveLethality: 'Tru sát kẻ thù từ khoảng cách trăm dặm, giảo sát toàn bộ sinh lực của tu sĩ Kim Đan trong kiếm trận.',
        defensiveVersatility: '36 đạo kiếm quang tự động kết thành Bát Quái Kiếm Trận xoay tròn quanh người kiếm chủ, ngăn cản mọi đòn đánh lén.',
        hardcoreTrainingMethod: 'Điều khiển phi kiếm xuyên qua 108 vòng đồng lơ lửng giữa thác nước mà không chạm vào mép vòng.',
        enlightenmentKey: 'Ngộ chữ "Ý" (Tâm ý): Kiếm không cần tay cầm, chỉ cần ý niệm đến đâu thì kiếm mang đã chém tới đó.',
        fatalFlawIfRushed: 'Thần thức bị phân tán nếu đối thủ sử dụng bí thuật chấn hồn, có thể làm phi kiếm mất kiểm soát rơi xuống đất.'
      },
      // Thức 4 (Nguyên Anh)
      {
        orderNumber: 4,
        stanceName: 'Đệ Tứ Thức: Ý Tại Kiếm Tiên (Vô Ảnh Kiếm Ý)',
        intentLevel: '4. Kiếm Ý Sơ Thành (Nguyên Anh - Ý Tại Kiếm Tiên)',
        mantraOrIncantation: 'Vô kiếm vô hình ý vô song, nhất mâu trảm phá vạn trùng phong. Nhãn trung hàm sát Nguyên Thần toái.',
        qiMovementPath: 'Nguyên Anh trong thức hải mở mắt, triệu hoán Kiếm Ý Hồn Lực rót thẳng vào mi tâm và đôi mắt thần quang.',
        footworkAndKinetic: 'Súc Địa Thành Thốn: Bước một bước vượt qua trăm trượng khoảng cách, thân pháp vượt ngoài quy tắc thị giác.',
        physicalMovementAndFootwork: 'Đứng yên bất động, chỉ cần một ánh mắt sắc lạnh hoặc một ngón tay khẽ nâng lên là kiếm ý đã xuất hiện.',
        swordFormMechanics: 'Kiếm Ý Hóa Hình: Không cần rút thanh kiếm trên lưng, sát ý vô hình ngưng tụ trực tiếp bên trong cơ thể kẻ địch.',
        visualPhenomenon: 'Không khí xung quanh rung lên từng đợt sóng vô hình, hư ảnh một thanh Cự Kiếm cổ xưa mờ ảo hiện sau lưng.',
        offensiveLethality: 'Bỏ qua toàn bộ giáp trụ vật lý, chém thẳng vào Nguyên Thần và Đạo Tâm của đối thủ khiến kẻ địch thất khiếu chảy máu.',
        defensiveVersatility: 'Áp chế đạo tâm đối thủ bằng Kiếm Ý Chấn Nhiếp, làm đối phương run rẩy không thể thi triển pháp thuật.',
        hardcoreTrainingMethod: 'Ngồi thiền trước vách đá dựng đứng, dùng ánh mắt khắc chữ "Kiếm" sâu ba tấc vào thạch bích.',
        enlightenmentKey: 'Ngộ chữ "Thần" (Thần niệm): Kiếm hữu hình có thể gãy, nhưng Kiếm Ý trong tâm thì bất diệt vĩnh hằng.',
        fatalFlawIfRushed: 'Tiêu hao hồn lực cực lớn, nếu ý chí kém hơn đối thủ dễ bị thần hồn phản phệ chảy máu mắt.'
      },
      // Thức 5 (Hóa Thần)
      {
        orderNumber: 5,
        stanceName: 'Đệ Ngũ Thức: Vạn Vật Vi Kiếm (Nhân Kiếm Hợp Nhất)',
        intentLevel: '5. Kiếm Tâm Thông Minh (Hóa Thần - Nhân Kiếm Hợp Nhất)',
        mantraOrIncantation: 'Thảo mộc trúc thạch giai vi kiếm, phong vân sương tuyết tẫn sát cơ. Vạn vật đồng quy thiên địa biến.',
        qiMovementPath: 'Linh lực dung hợp cùng thiên địa quy tắc, đả thông 365 khiếu huyệt chu thiên hòa vào nhịp thở của tự nhiên.',
        footworkAndKinetic: 'Ngự Phong Đạp Hư Bộ: Hòa tan thân hình vào gió bão, không để lại bất kỳ khí tức hay quỹ đạo di chuyển nào.',
        physicalMovementAndFootwork: 'Cầm cọng cỏ dại hoặc giọt nước trên đầu ngón tay, nhẹ nhàng búng ra với phong thái trích tiên phiêu dật.',
        swordFormMechanics: 'Đồng Hóa Quy Tắc: Gán kiếm ý sắc bén vào bất kỳ vật thể nào xung quanh — lá cây, giọt mưa, hạt cát đều hóa Thần Binh.',
        visualPhenomenon: 'Hàng triệu chiếc lá rụng hoặc giọt mưa trong bán kính mười dặm đồng loạt phát sáng lấp lánh như rừng kiếm.',
        offensiveLethality: 'Một cọng cỏ chém gãy Đạo Khí thượng phẩm, một giọt sương mai xuyên thủng hộ thể cương khí của tu sĩ Hóa Thần.',
        defensiveVersatility: 'Mượn linh khí của cỏ cây sông núi xung quanh tạo thành kết giới phòng ngự tự nhiên vô cùng bền vững.',
        hardcoreTrainingMethod: 'Cầm một cọng cỏ mềm chém đứt tảng đá hoa cương ngàn cân mà cọng cỏ không bị dập nát.',
        enlightenmentKey: 'Ngộ chữ "Dung" (Dung hợp): Trời đất là kiếm bao la, lòng ta là chuôi kiếm; vạn vật thế gian đều nghe lệnh ta sát phạt.',
        fatalFlawIfRushed: 'Dễ bị hòa tan thần thức vào thiên địa nếu đạo tâm không đủ kiên định giữ vững bản ngã cá nhân.'
      },
      // Thức 6 (Luyện Hư)
      {
        orderNumber: 6,
        stanceName: 'Đệ Lục Thức: Trảm Toái Hư Không (Kiếm Hồn Bất Diệt)',
        intentLevel: '6. Kiếm Hồn Bất Diệt (Luyện Hư - Trảm Phá Hư Không)',
        mantraOrIncantation: 'Phá toái hư không kiếm ảnh lưu, thứ nguyên cái khe trảm vương hầu. Vô biên không gian giai đoạn diệt.',
        qiMovementPath: 'Luyện Hư Đạo Thể dung hợp Hư Không Quy Tắc, vận chuyển Không Gian Chi Lực qua đan điền tụ lại nơi mũi kiếm.',
        footworkAndKinetic: 'Không Gian Thuấn Di: Bước chân xuyên qua kẽ nứt thứ nguyên, xuất hiện ngay sau lưng đối thủ không hề có khoảng cách.',
        physicalMovementAndFootwork: 'Vung kiếm chém một đường vòng cung đơn giản, mũi kiếm khẽ rung làm rạn nứt không gian ba thước.',
        swordFormMechanics: 'Không Gian Liệt Kiếm: Mũi kiếm rạch mở một vết nứt không gian đen kịt, nuốt chửng toàn bộ đòn đánh và phản kích đối thủ.',
        visualPhenomenon: 'Vệt kiếm quang xé rách bầu trời để lộ vết nứt không gian màu đen sâu thẳm, tiếng sấm nổ vang rền từ cõi hư vô.',
        offensiveLethality: 'Chém đứt kẻ địch từ trong không gian thứ nguyên, đối thủ dù trốn trong bí cảnh hay linh bảo phòng ngự cũng bị chém đứt.',
        defensiveVersatility: 'Mở vết nứt không gian ngay trước mặt để nuốt trọn mọi sát chiêu và bảo vật công kích của địch vào cõi hư vô.',
        hardcoreTrainingMethod: 'Chém kiếm vào khe nứt không gian dữ dội tại Vực Ngoại Loạn Lưu mỗi ngày một ngàn lần.',
        enlightenmentKey: 'Ngộ chữ "Phá" (Phá vỡ): Không gian chỉ là bức màn mỏng manh, một kiếm sắc bén đủ sức xé toạc màn che hư ảo.',
        fatalFlawIfRushed: 'Dễ bị dòng chảy loạn lưu không gian cắn trả cắt đứt cánh tay nếu chưa thuần thục kiểm soát vết nứt.'
      },
      // Thức 7 (Hợp Thể)
      {
        orderNumber: 7,
        stanceName: 'Đệ Thất Thức: Tru Tiên Tuyệt Hủy Kiếm Vực (Kiếm Vực Tuyệt Đối)',
        intentLevel: '7. Kiếm Vực Tuyệt Đối (Hợp Thể - Thân Hóa Kiếm Giới)',
        mantraOrIncantation: 'Thân hóa Kiếm Giới càn khôn định, vạn dặm hồng hoang thính kiếm minh. Sát phạt tru tiên vạn pháp diệt.',
        qiMovementPath: 'Hợp Thể Pháp Tướng dung hợp hoàn toàn với Kiếm Thai, giải phóng một trăm vạn đạo kiếm khí từ toàn bộ lỗ chân lông.',
        footworkAndKinetic: 'Kiếm Vực Trấn Thế Bộ: Đứng vững như cột chống trời, chân đạp Kiếm Đồ khổng lồ lan rộng vạn dặm.',
        physicalMovementAndFootwork: 'Hai tay dang rộng nâng lên cao, toàn bộ thân xác tỏa ra ánh sáng chói lọi hóa thành cội nguồn của vạn kiếm.',
        swordFormMechanics: 'Khai Mở Kiếm Vực: Thiết lập một thế giới độc lập, trong phạm vi Kiếm Vực toàn bộ quy tắc đều do Kiếm Chủ định đoạt.',
        visualPhenomenon: 'Vạn dặm xung quanh biến thành biển kiếm màu máu rực lửa, hàng triệu thanh thần kiếm cắm ngược từ trời xuống đất.',
        offensiveLethality: 'Hàng triệu thanh sát kiếm cùng lúc công kích, nghiền nát thân xác và linh hồn của hàng vạn quân đoàn địch trong nháy mắt.',
        defensiveVersatility: 'Trong Kiếm Vực, kẻ địch bị giảm 80% tốc độ và tu vi, còn Kiếm Chủ được bất tử miễn là Kiếm Vực chưa sụp đổ.',
        hardcoreTrainingMethod: 'Ngồi thiền giữa tâm bão sấm sét, dùng kiếm khí bao bọc trọn vẹn một ngọn núi lớn trong mười năm.',
        enlightenmentKey: 'Ngộ chữ "Giới" (Thế giới): Tự ta tạo ra một thế giới kiếm đạo, nơi đó ta là chúa tể tuyệt đối, thần ma phải quỳ bái.',
        fatalFlawIfRushed: 'Nếu đối thủ có sức mạnh vượt trội phá vỡ Kiếm Vực từ bên ngoài, Kiếm Chủ sẽ bị phản phệ nôn ra máu tổn thương căn cơ.'
      },
      // Thức 8 (Đại Thừa)
      {
        orderNumber: 8,
        stanceName: 'Đệ Bát Thức: Nhất Kiếm Phá Vạn Pháp (Cực Đạo Kiếm Thần)',
        intentLevel: '8. Nhất Kiếm Phá Vạn Pháp (Đại Thừa - Cực Đạo Kiếm Thần)',
        mantraOrIncantation: 'Vạn pháp quy tông kiếm quy nhất, âm dương ngũ hành giai tận diệt. Bất hủ thần thông đương nhất kiếm.',
        qiMovementPath: 'Ngưng tụ toàn bộ Đại Thừa Chân Lực, Pháp Tắc Chi Lực và Sát Khí vạn kiếp vào duy nhất một điểm nơi mũi kiếm.',
        footworkAndKinetic: 'Bất Động Như Sơn Bộ: Không cần né tránh, không cần di chuyển; chỉ tiến lên một bước duy nhất đạp vỡ hư không.',
        physicalMovementAndFootwork: 'Cực giản quy chân — chỉ là một cú đâm thẳng hoặc chém xuống mộc mạc không chứa bất kỳ hoa mỹ thừa thãi nào.',
        swordFormMechanics: 'Quy Nhất Cực Đạo: Bẻ gãy toàn bộ cấu trúc quy tắc của đối phương, phá vỡ liên kết nguyên tử và linh lực của đối thủ.',
        visualPhenomenon: 'Không có kiếm quang rực rỡ, chỉ có một vệt sáng trắng mỏng như sợi tóc lướt qua, nhưng kéo theo sự sụp đổ của trời đất.',
        offensiveLethality: 'Đâm xuyên mọi loại Tiên Khí phòng ngự, phá giải mọi đại trận hộ tông và chém chết đại năng Đại Thừa trong một chiêu.',
        defensiveVersatility: 'Đường kiếm chém ra hủy diệt toàn bộ pháp thuật, nguyền rủa, độc tố và cấm chế nhắm vào bản thân.',
        hardcoreTrainingMethod: 'Chém kiếm vào dòng chảy thời gian, tìm điểm ngưng đọng của vạn vật để xuất kiếm chuẩn xác từng sát na.',
        enlightenmentKey: 'Ngộ chữ "Nhất" (Duy nhất): Thiên hạ vạn pháp thiên biến vạn hóa, ta chỉ cần một kiếm này là đủ san bằng tất cả.',
        fatalFlawIfRushed: 'Đòi hỏi sự tập trung tuyệt đối của linh hồn, nếu dao động một tia nghi ngờ kiếm chiêu sẽ mất đi uy lực vô địch.'
      },
      // Thức 9 (Thần Cấp)
      {
        orderNumber: 9,
        stanceName: 'Đệ Cửu Thức: Thiên Đạo Vô Kiếm (Thần Thánh Siêu Thoát)',
        intentLevel: '9. Thần Thánh Siêu Thoát • Thiên Đạo Vô Kiếm (Thần Cấp - Vô Kiếm Thắng Hữu Kiếm)',
        mantraOrIncantation: 'Vô kiếm thắng hữu kiếm, vô hình thắng hữu hình. Nhất niệm khai thiên địa, nhất niệm tịch vạn cổ.',
        qiMovementPath: 'Siêu thoát khỏi kinh mạch và đan điền phàm tục, Thần Niệm hòa làm một với Đại Đạo Hỗn Độn vĩnh hằng.',
        footworkAndKinetic: 'Siêu Thoát Luân Hồi: Hiện diện ở mọi nơi trong vũ trụ cùng một lúc, vượt ngoài khái niệm thời gian và không gian.',
        physicalMovementAndFootwork: 'Tự tại như mây khói, trong tay không có kiếm, trong tâm cũng không có kiếm; thân thể chính là Đạo, ý chí chính là Kiếm.',
        swordFormMechanics: 'Vô Kiếm Chi Kiếm: Một ý niệm sinh ra kiếm đạo quy tắc mới, một ý niệm xóa sổ toàn bộ kỷ nguyên tồn tại của kẻ thù.',
        visualPhenomenon: 'Ánh sáng Hỗn Độn tinh khôi chiếu rọi tam thiên đại thế giới, hoa sen đại đạo nở rộ khắp bầu trời vũ trụ vô tận.',
        offensiveLethality: 'Xóa bỏ sự tồn tại của đối thủ khỏi dòng thời gian quá khứ, hiện tại và tương lai — vĩnh viễn không thể luân hồi chuyển kiếp.',
        defensiveVersatility: 'Bất tử bất diệt, siêu việt nhân quả nghiệp báo, thiên kiếp và luân hồi không thể chạm tới gót chân.',
        hardcoreTrainingMethod: 'Trải qua chín vạn kiếp luân hồi phàm trần, cảm nhận sinh lão bệnh tử và hỷ nộ ái ố để giác ngộ bản chất của Hư Vô.',
        enlightenmentKey: 'Ngộ chữ "Không" (Trống rỗng): Buông bỏ thanh kiếm mới thực sự nắm giữ kiếm đạo tối cao; không có kiếm mới là thanh kiếm sắc bén nhất.',
        fatalFlawIfRushed: 'Gần như không có nhược điểm, ngoại trừ việc nếu lòng còn vướng bận trần duyên sẽ bị vướng lại ở ranh giới giữa Thần và Phàm.'
      }
    ],
    authorWritingNotes: 'Đây là bộ kiếm pháp hoàn chỉnh 9 tầng cảnh giới từ Luyện Khí đến Thần Cấp. Tác giả nên cho nhân vật chính lĩnh ngộ từng thức theo từng đại cảnh giới để tạo cảm giác tiến trình thăng tiến rõ rệt và bùng nổ cảm xúc.'
  },

  // 2. THANH LIÊN KIẾM CA (THIÊN GIAI - HUYỄN KIẾM VÔ HÌNH)
  {
    id: 'canon_thanh_lien_kiem_ca',
    name: 'Thanh Liên Kiếm Ca (Huyễn Kiếm Thi Tiên)',
    philosophy: 'Đại đạo như thanh liên, xuất bùn mà chẳng nhiễm. Lấy thơ làm kiếm khí, lấy rượu đúc kiếm tâm; thanh thoát phiêu dật giữa cõi hồng trần.',
    gradeLevel: 'Thiên Giai Tuyệt Thế (Tiên Phẩm Thi Kiếm)',
    swordRankRequirements: 'Tu sĩ có Phong hoặc Mộc Linh Căn, tâm hồn khoáng đạt phiêu dật, yêu thích thi ca và tự do.',
    originAndCreator: 'Sáng lập bởi Thanh Liên Cư Sĩ — Trích Tiên Kiếm Hiệp ngàn năm trước sau một đêm say rượu ngắm trăng bên hồ sen ngọc.',
    coreSwordIntent: 'Thanh Liên Huyễn Ảnh Kiếm Ý — Biến ảo khôn lường, kiếm khí phiêu dật như thơ ca nhưng sát cơ ẩn sâu dưới cánh sen.',
    absoluteSwordDomain: 'Thập Lý Thanh Liên Kiếm Vực (Mười dặm nở rộ hoa sen kiếm khí màu xanh ngọc bích, thơm ngát nhưng sát phạt vô song)',
    trainingRegimen: {
      basicConditioning: 'Mỗi ngày múa kiếm trên búp sen non giữa hồ nước sâu mà không làm cánh sen lay động.',
      heartTestingTrial: 'Uống cạn bầu rượu dưới ánh trăng rằm, ngâm một bài thơ và xuất một đường kiếm chém rụng bóng trăng trên mặt nước.',
      swordEnergyAwakening: 'Hấp thu mộc linh thanh khí và sương mai tinh khiết vào đan điền, ngưng tụ Thanh Liên Kiếm Mầm.'
    },
    stances: [
      // Thức 1
      {
        orderNumber: 1,
        stanceName: 'Đệ Nhất Thức: Nhất Diệp Cô Chu (Kiếm Khí Ly Thể)',
        intentLevel: '1. Sơ Nhập Kiếm Khí (Luyện Khí - Kiếm Khí Ly Thể)',
        mantraOrIncantation: 'Nhất diệp cô chu độ hàn giang, thanh y phiêu dật kiếm mang khai. Gió thoảng qua rèm bóng người biến.',
        qiMovementPath: 'Thanh Mộc Chân Khí từ Can Kinh men theo kinh mạch nhẹ nhàng rót vào đốc kiếm, phân bố đều theo sống kiếm mỏng.',
        footworkAndKinetic: 'Phiêu Miểu Thân Pháp: Trọng tâm nhẹ như lông vũ, bước chân lướt nhẹ trên mặt nước tựa lá sen trôi.',
        physicalMovementAndFootwork: 'Cổ tay xoay tròn nhẹ nhàng như nét bút lông viết chữ thảo, kiếm vung lên tạo hình cánh sen bay lượn.',
        swordFormMechanics: 'Chém lướt gợn sóng (Phất kiếm), mũi kiếm vạch nên một đường cong thanh thoát tựa cánh ve.',
        visualPhenomenon: 'Vệt kiếm quang màu xanh ngọc bích mờ ảo bay ra, thoang thoảng hương sen thanh khiết giữa gió lạnh.',
        offensiveLethality: 'Cắt đứt động mạch cổ hoặc cổ tay của đối thủ từ xa ba bước mà kẻ địch chỉ cảm thấy một làn gió mát thoảng qua.',
        defensiveVersatility: 'Vệt kiếm khí xanh ngọc uốn lượn làm chệch hướng đao kiếm nặng nề của đối phương.',
        hardcoreTrainingMethod: 'Múa kiếm trên mặt hồ sen phẳng lặng, tập luyện sao cho mũi kiếm không làm gợn một vòng sóng nước.',
        enlightenmentKey: 'Ngộ chữ "Nhu" (Mềm mại): Lấy nhu thắng cương, kiếm khí nhẹ nhàng như làn gió xuân nhưng sắc ngọt khôn cùng.',
        fatalFlawIfRushed: 'Thiếu hụt lực bộc phát nếu đối đầu trực diện với những vũ khí nặng nề như búa tạ hoặc đại đao.'
      },
      // Thức 2
      {
        orderNumber: 2,
        stanceName: 'Đệ Nhị Thức: Nguyệt Hạ Độc Trạc (Kiếm Phong Như Vũ)',
        intentLevel: '2. Kiếm Khí Tung Hoành (Trúc Cơ - Kiếm Phong Như Vũ)',
        mantraOrIncantation: 'Cử bôi chúc minh nguyệt, đối ảnh thành tam nhân. Kiếm quang hóa nguyệt sắc, phân ảnh diệt quần ma.',
        qiMovementPath: 'Linh lực Trúc Cơ dồi dào luân chuyển qua mười hai đường kinh lạc, phóng xuất kiếm cương hình trăng lưỡi liềm.',
        footworkAndKinetic: 'Túy Tiên Bộ: Bước đi ngả nghiêng như người say rượu, nhưng biến ảo bất ngờ khiến kẻ địch không đoán được phương hướng.',
        physicalMovementAndFootwork: 'Một tay cầm bầu rượu, một tay múa kiếm; thân hình ngửa ra sau né đòn rồi phản kích bằng cú chém ngược từ dưới lên.',
        swordFormMechanics: 'Huyễn chiêu liên hoàn: Đổi kiếm giữa hai tay trong chớp mắt, biến chiêu hư thực liên miên không dứt.',
        visualPhenomenon: 'Kiếm cương màu ánh trăng bàng bạc chiếu sáng đêm đen, xung quanh xuất hiện ba tàn ảnh đang đối ẩm múa kiếm.',
        offensiveLethality: 'Kiếm khí trăng khuyết chém đứt hộ giáp và phong tỏa toàn bộ huyệt đạo trọng yếu của đối phương.',
        defensiveVersatility: 'Thân hình ngả nghiêng né tránh mọi đòn công kích thẳng, kiếm cương xoay vòng bảo hộ quanh thân.',
        hardcoreTrainingMethod: 'Uống rượu ngà ngà say rồi luyện kiếm trong đêm trăng, chém trúng từng giọt rượu hắt lên không trung.',
        enlightenmentKey: 'Ngộ chữ "Huyễn" (Biến ảo): Say trong kiếm nhưng tỉnh trong tâm; bề ngoài lảo đảo nhưng kiếm phong chuẩn xác từng tấc.',
        fatalFlawIfRushed: 'Nếu tâm không tỉnh táo thực sự dễ bị rượu làm loạn kinh mạch, bước hụt chân ngã té.'
      },
      // Thức 3
      {
        orderNumber: 3,
        stanceName: 'Đệ Tam Thức: Bích Ba Lãng Uyển (Ngự Kiếm Phi Không)',
        intentLevel: '3. Kiếm Mang Hóa Hình (Kim Đan - Ngự Kiếm Phi Không)',
        mantraOrIncantation: 'Sóng biếc dập dờn ngự phi kiếm, vạn dặm giang hà nhất sát na. Thanh Liên nở rộ ngút trời mây.',
        qiMovementPath: 'Kim Đan Mộc Hệ vận hành, phóng thích chân nguyên thanh tịnh điều khiển phi kiếm bay lượn như cá lội dưới nước.',
        footworkAndKinetic: 'Đạp Lãng Phi Hành: Đứng vững trên mũi phi kiếm, đạp gió rẽ sóng bay vút lên chín tầng mây.',
        physicalMovementAndFootwork: 'Hai tay áo bay phần phật, kiếm quyết chỉ tay tạo thành những vòng xoáy hoa sen kiếm khí bay lượn.',
        swordFormMechanics: 'Phân hóa kiếm hoàn: Thanh Liên phi kiếm phân tách thành 72 cánh sen kiếm quang sắc nhọn tựa dao cạo.',
        visualPhenomenon: 'Một đóa hoa sen khổng lồ màu ngọc bích bung nở giữa không trung, mỗi cánh sen là một đường phi kiếm chém phá.',
        offensiveLethality: '72 cánh sen kiếm quang bao vây kẻ thù từ mọi hướng, giảo sát đối phương thành trăm mảnh trong nháy mắt.',
        defensiveVersatility: 'Các cánh sen khép lại tạo thành Búp Sen Bảo Hộ kiên cố, ngăn chặn đòn sấm sét và hỏa diễm công kích.',
        hardcoreTrainingMethod: 'Điều khiển phi kiếm vớt từng chiếc lá sen khô trôi trên dòng nước lũ cuồn cuộn.',
        enlightenmentKey: 'Ngộ chữ "Linh" (Linh hoạt): Phi kiếm như linh ngư, tự do tự tại bơi lượn trong biển trời bao la.',
        fatalFlawIfRushed: 'Tiêu hao nhiều linh lực để duy trì hình dạng đóa sen nếu kẻ địch kéo dài thời gian bao vây.'
      },
      // Thức 4
      {
        orderNumber: 4,
        stanceName: 'Đệ Tứ Thức: Ngâm Thi Đoạn Nhạc (Ý Tại Kiếm Tiên)',
        intentLevel: '4. Kiếm Ý Sơ Thành (Nguyên Anh - Ý Tại Kiếm Tiên)',
        mantraOrIncantation: 'Một câu thơ ngâm non sông nứt, một chữ kiếm đề quỷ thần kinh. Lời thơ chưa dứt mạng đã đoạn.',
        qiMovementPath: 'Nguyên Anh cất tiếng ngâm thơ trong thức hải, sóng âm đạo vận kết hợp cùng Kiếm Ý chấn động không gian.',
        footworkAndKinetic: 'Văn Nhân Du Bộ: Chắp tay sau lưng cất bước ung dung tựa như thi sĩ dạo cảnh ngắm hoa.',
        physicalMovementAndFootwork: 'Không cần chạm vào kiếm; mở miệng đọc một câu thơ, kiếm ý liền ngưng tụ từ từng âm tiết phát ra.',
        swordFormMechanics: 'Âm Thanh Hóa Kiếm: Lấy sóng âm và ý niệm thi ca làm phương tiện dẫn truyền kiếm ý sát phạt vô hình.',
        visualPhenomenon: 'Từng chữ Hán cổ phát sáng bay lượn giữa không trung, mỗi nét bút đều chứa đựng kiếm khí chém nứt đất đá.',
        offensiveLethality: 'Sóng âm kiếm ý đâm xuyên thẳng vào màng nhĩ và thức hải của đối thủ, bóp nát thần niệm Nguyên Anh của kẻ thù.',
        defensiveVersatility: 'Tiếng ngâm thơ tạo thành bức tường Đạo Vận tịnh hóa toàn bộ ma niệm và tà thuật nguyền rủa.',
        hardcoreTrainingMethod: 'Vừa uống rượu ngâm thơ vừa dùng tiếng nói chấn vỡ từng chiếc cốc ngọc xếp thành hàng cách mười trượng.',
        enlightenmentKey: 'Ngộ chữ "Thi" (Thơ ca): Thơ là tiếng lòng của trời đất, khi kiếm ý hòa vào thi ca thì không có bức tường nào ngăn cản nổi.',
        fatalFlawIfRushed: 'Dễ bị đứt hơi khản giọng nếu gặp phải kẻ địch có bí thuật phong bế âm thanh.'
      },
      // Thức 5
      {
        orderNumber: 5,
        stanceName: 'Đệ Ngũ Thức: Thanh Liên Thổ Nhị (Nhân Kiếm Hợp Nhất)',
        intentLevel: '5. Kiếm Tâm Thông Minh (Hóa Thần - Nhân Kiếm Hợp Nhất)',
        mantraOrIncantation: 'Đài sen hé nhụy thiên cơ lộ, một giọt sương mai trảm trích tiên. Vạn vật đồng hoa quy cực lạc.',
        qiMovementPath: 'Linh lực Hóa Thần ngưng tụ thành giọt Sinh Mệnh Tinh Hoa tại đan điền, chuyển hóa thành Thanh Liên Kiếm Tâm thuần khiết.',
        footworkAndKinetic: 'Bộ Bộ Sinh Liên: Mỗi bước chân bước ra đều nở rộ một đóa sen ngọc nâng đỡ bàn chân lơ lửng giữa hư không.',
        physicalMovementAndFootwork: 'Hai tay nâng một đóa sen vô hình trước ngực, cánh sen khẽ hé lộ một giọt sương mai rực sáng.',
        swordFormMechanics: 'Búng tay xuất kiếm: Giọt sương mai bắn ra với vận tốc ánh sáng, xuyên thủng mọi phòng ngự mà không gây tiếng động.',
        visualPhenomenon: 'Không gian ngập tràn ánh sáng thanh khiết, ngàn vạn búp sen nở rộ, tiếng chuông gió du dương vang vọng đất trời.',
        offensiveLethality: 'Xuyên thủng tim và thần đan của đối thủ trong im lặng tuyệt đối, kẻ địch chết đi với nụ cười thanh thản trên môi.',
        defensiveVersatility: 'Hoa sen nở rộ tịnh hóa mọi sát khí và độc tố xung quanh, biến chiến trường thành tiên cảnh thanh tịnh.',
        hardcoreTrainingMethod: 'Ngồi kiết già trên đài sen suốt bảy bảy bốn mươi chín ngày đêm, ngưng tụ giọt Kiếm Tâm tinh khiết nhất.',
        enlightenmentKey: 'Ngộ chữ "Tịnh" (Thanh tịnh): Sát phạt không phải là hận thù, mà là sự tịnh hóa để linh hồn đối phương được siêu thoát.',
        fatalFlawIfRushed: 'Lòng từ bi quá lớn có thể khiến nhát kiếm thiếu đi sự dứt khoát quyết liệt vào thời khắc sinh tử.'
      },
      // Thức 6
      {
        orderNumber: 6,
        stanceName: 'Đệ Lục Thức: Túy Ngọa Tinh Hà (Kiếm Hồn Bất Diệt)',
        intentLevel: '6. Kiếm Hồn Bất Diệt (Luyện Hư - Trảm Phá Hư Không)',
        mantraOrIncantation: 'Say nằm dải ngân hà nhìn cõi thế, vung kiếm xé rách vạn trùng thiên. Thứ nguyên không gian như trang giấy.',
        qiMovementPath: 'Luyện Hư Kiếm Hồn dung hợp tinh tú chi lực, dẫn truyền qua Nhâm Đốc nhị mạch xé rách vách ngăn không gian.',
        footworkAndKinetic: 'Tinh Không Mê Tung Bộ: Bước chân đạp lên các vì tinh tú lấp lánh trong hư không, xuyên qua nhiều chiều không gian.',
        physicalMovementAndFootwork: 'Tư thế nằm nghiêng uống rượu ung dung, cánh tay vung kiếm ngược về phía sau chém rách bầu trời.',
        swordFormMechanics: 'Không Gian Thi Kiếm: Kiếm quang rạch mở bầu trời đêm thành dải Ngân Hà rực rỡ, nhấn chìm đối thủ vào vực sâu thứ nguyên.',
        visualPhenomenon: 'Bầu trời xuất hiện một dòng sông sao màu xanh biếc chảy xiết, hoa sen sao băng rơi rụng như mưa rào.',
        offensiveLethality: 'Cuốn trôi kẻ địch vào vết nứt không gian tinh tú, nghiền nát thân xác bằng áp suất thứ nguyên dữ dội.',
        defensiveVersatility: 'Ẩn thân vào dải Ngân Hà thứ nguyên, kẻ địch ở thế giới thực hoàn toàn không thể chạm tới thân thể.',
        hardcoreTrainingMethod: 'Ngồi ngắm sao đêm trên đỉnh núi tuyết vạn trượng, dùng kiếm khí vẽ nên chòm sao Bắc Đẩu trên bầu trời.',
        enlightenmentKey: 'Ngộ chữ "Khoáng" (Khoáng đạt): Tầm mắt mở rộng ra cả vũ trụ tinh hà, thì mọi ân oán phàm trần đều nhỏ bé như hạt bụi.',
        fatalFlawIfRushed: 'Nếu tinh thần quá bay bổng dễ bị lạc lối trong dòng chảy thời không không tìm được đường về.'
      },
      // Thức 7
      {
        orderNumber: 7,
        stanceName: 'Đệ Thất Thức: Thập Lý Thanh Liên Kiếm Vực (Kiếm Vực Tuyệt Đối)',
        intentLevel: '7. Kiếm Vực Tuyệt Đối (Hợp Thể - Thân Hóa Kiếm Giới)',
        mantraOrIncantation: 'Thập lý thanh liên thiên hạ biến, vạn trượng kiếm khí hóa ngọc liên. Trong vực ta là tiên nhân độc tôn.',
        qiMovementPath: 'Hợp Thể Kiếm Thể giải phóng toàn bộ đạo vận, hình thành kết giới Thanh Liên bao trùm bán kính mười dặm sơn hà.',
        footworkAndKinetic: 'Thanh Liên Tiên Vực Trấn Thế: Đứng xếp bằng giữa đóa cự liên trung tâm, điều phối vạn vật trong cõi Kiếm Vực.',
        physicalMovementAndFootwork: 'Cánh tay khẽ phất tà áo lam, toàn bộ đóa sen trong mười dặm đồng loạt vung cánh phóng kiếm mang.',
        swordFormMechanics: 'Đồng Bộ Kiếm Vực: Mỗi đóa sen trong mười dặm đều là một trạm chuyển tiếp kiếm khí, triệu hoán bão kiếm liên hoàn.',
        visualPhenomenon: 'Mười dặm đất trời hóa thành đầm sen ngọc bích rực rỡ, hương sen ngào ngạt che giấu hàng ức đạo sát kiếm vô hình.',
        offensiveLethality: 'Bóp nghẹt và giảo sát toàn bộ sinh linh đối địch trong phạm vi mười dặm, biến quân đoàn địch thành phân bón nuôi sen.',
        defensiveVersatility: 'Tuyệt đối phong tỏa không gian, ngăn chặn đối thủ xé rách hư không tẩu thoát hoặc dùng độn thuật đào tẩu.',
        hardcoreTrainingMethod: 'Bế quan trong đầm sen mười năm, hòa tan từng sợi thần thức vào từng rễ sen dưới đáy bùn lầy.',
        enlightenmentKey: 'Ngộ chữ "Sinh" (Sinh sôi): Đầm sen sinh sôi không ngừng, kiếm ý vì thế mà tuần hoàn bất tận không bao giờ cạn kiệt.',
        fatalFlawIfRushed: 'Tiêu hao lượng lớn sinh mệnh lực nếu bị đối thủ cường đại dùng hỏa diễm cực độ thiêu đốt đầm sen.'
      },
      // Thức 8
      {
        orderNumber: 8,
        stanceName: 'Đệ Bát Thức: Nhất Kiếm Bất Nhiễm (Cực Đạo Kiếm Thần)',
        intentLevel: '8. Nhất Kiếm Phá Vạn Pháp (Đại Thừa - Cực Đạo Kiếm Thần)',
        mantraOrIncantation: 'Xuất ứ nê nhi bất nhiễm, trọc thế giai túy ngã độc tỉnh. Nhất kiếm trảm toái vạn trượng trần ai.',
        qiMovementPath: 'Đại Thừa Chân Nguyên tịnh hóa đến mức tuyệt đối thuần khiết, không vướng một hạt bụi trần, tụ lại nơi mũi kiếm.',
        footworkAndKinetic: 'Tiên Phong Đạo Cốt Bộ: Đi lại thong dong như dạo bước hoa viên, không dính một hạt bụi đất.',
        physicalMovementAndFootwork: 'Chỉ là một đường kiếm vung ngang chém qua màn sương mù, nhẹ nhàng tựa như gạt đi giọt sương trên lá.',
        swordFormMechanics: 'Tịnh Hóa Vạn Pháp: Chém tan mọi ma chướng, ô uế, tà độc và thần thông cấm kỵ của kẻ thù thành mây khói hư vô.',
        visualPhenomenon: 'Một đạo kiếm quang xanh ngọc trong suốt quét qua, gột rửa toàn bộ bầu trời tăm tối trở nên trong vắt như gương.',
        offensiveLethality: 'Phá vỡ mọi phòng ngự ma đạo, chém đứt sinh mệnh của ma đầu vạn năm mà không để lại một vết máu vấy bẩn lên lưỡi kiếm.',
        defensiveVersatility: 'Miễn nhiễm với mọi loại độc dược, nguyền rủa và ảo thuật ma đạo trên thế gian.',
        hardcoreTrainingMethod: 'Ngồi dưới đầm bùn lầy hôi thối trong ba năm, luyện sao cho thân thể và thanh kiếm khi bước ra vẫn trắng tinh không tì vết.',
        enlightenmentKey: 'Ngộ chữ "Khiết" (Thanh khiết): Giữ vững bản tâm trong sạch giữa chốn hồng trần ô trọc, kiếm tâm mới đạt tới cảnh giới vô địch.',
        fatalFlawIfRushed: 'Khó lòng thi triển nếu trong tâm còn nảy sinh lòng tham lam, đố kỵ hoặc tà niệm trần tục.'
      },
      // Thức 9
      {
        orderNumber: 9,
        stanceName: 'Đệ Cửu Thức: Hỗn Độn Thanh Liên (Thần Thánh Siêu Thoát)',
        intentLevel: '9. Thần Thánh Siêu Thoát • Thiên Đạo Vô Kiếm (Thần Cấp - Vô Kiếm Thắng Hữu Kiếm)',
        mantraOrIncantation: 'Hỗn Độn sơ khai sinh Thanh Liên, ba ngàn đại đạo giai quy nhất. Nhất niệm hóa thế giới, nhất kiếm định càn khôn.',
        qiMovementPath: 'Siêu thoát khỏi mọi định luật vũ trụ, linh hồn dung hợp cùng Hỗn Độn Thanh Liên nguyên thủy thời Bàn Cổ khai thiên.',
        footworkAndKinetic: 'Đại Đạo Quy Chân: Đứng trên đỉnh vũ trụ càn khôn, bao quát muôn vàn tinh cầu thế giới trong một cái liếc mắt.',
        physicalMovementAndFootwork: 'Mỉm cười không nói, tay cầm một đóa Hỗn Độn Thanh Liên ba mươi sáu cánh, nhẹ nhàng tung lên trời cao.',
        swordFormMechanics: 'Khai Thiên Tái Tạo: Không chỉ có sát phạt, mà còn có năng lực tái tạo lại toàn bộ vũ trụ và sinh linh sau cơn hủy diệt.',
        visualPhenomenon: 'Hỗn Độn Thanh Liên khổng lồ bao trùm cả dải Ngân Hà, tỏa ra ánh sáng rực rỡ khai sinh ra các vì sao mới.',
        offensiveLethality: 'Tịch diệt toàn bộ ma thần và ác niệm của cả một kỷ nguyên vũ trụ chỉ trong một cái chớp mắt nhẹ nhàng.',
        defensiveVersatility: 'Vĩnh hằng bất diệt cùng vũ trụ, trường tồn sánh ngang thời gian và không gian vĩnh cửu.',
        hardcoreTrainingMethod: 'Chứng kiến sự sinh ra và diệt vong của trăm vạn thế giới trong dòng sông thời gian để đốn ngộ bản nguyên Khởi Nguyên.',
        enlightenmentKey: 'Ngộ chữ "Đạo" (Thiên Đạo Tự Nhiên): Kiếm tối thượng không phải để giết chóc, mà là để bảo vệ sự sinh sôi trường tồn của vạn vật vũ trụ.',
        fatalFlawIfRushed: 'Yêu cầu tâm cảnh phải đạt đến cảnh giới vô tư vô ngã, nếu còn vướng bận ích kỷ cá nhân sẽ lập tức bị đại đạo đào thải.'
      }
    ],
    authorWritingNotes: 'Đây là bộ thi kiếm thanh tao thoát tục, cực kỳ thích hợp cho các nhân vật lãng tử kiếm khách, tiêu sái phong lưu hoặc kiếm tiên áo trắng uống rượu hành hiệp trượng nghĩa.'
  }
];
