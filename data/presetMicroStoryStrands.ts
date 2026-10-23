import { MicroStoryStrand } from '../types';

export const PRESET_MICRO_STORY_STRANDS: MicroStoryStrand[] = [
  {
    id: 'micro_strand_1',
    title: 'Phường Thị Nhặt Được Tàn Phiến Đoản Kiếm Rỉ Sét',
    category: 'micro_treasure',
    scope: 'single_scene',
    parentSpineStageId: 'spine_stage_1',
    localTrigger: 'Cần tìm một phôi kiếm sắt rẻ tiền tại khu chợ đồ cũ chân núi để luyện tập 13 thức kiếm đạo nhập môn.',
    protagonistMotivation: 'Túi tiền phàm trần cạn kiệt, không đủ 50 linh thạch mua linh kiếm mới, buộc phải tìm phôi sắt nặng để rèn cổ tay.',
    immediateObstacle: 'Lão chủ sạp đồ cũ gian manh khinh người nghèo, đòi giá cắt cổ 15 toái ngân cho đống sắt vụn.',
    tacticalResolution: 'Giả vờ chê bai thanh kiếm rỉ sét, chọn mua một thanh đao cùn với giá 10 toái ngân rồi ép lão tặng kèm khúc sắt gỉ làm đồ khuyến mãi; sau đó dùng rượu thuốc gột rửa lớp rỉ, phát hiện 3 chữ cổ "Thái Ất Tàn".',
    tangibleReward: 'Thái Ất Tàn Kiếm Phôi (Chứa đựng 1 tia Canh Kim Sát Khí viễn cổ ẩn giấu bên trong lõi sắt).',
    anchorHookToMainPlot: 'Tia Canh Kim này chính là mầm mống bản nguyên giúp nhân vật chính ngộ ra Canh Kim Kiếm Ý sơ khai khi xung kích Trúc Cơ.',
    associatedNpcName: 'Tề Lão Tam (Chủ sạp phế liệu phường thị)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Ghé Sạp Đồ Cũ & Cảm Ứng Bất Thường',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Đi giữa phường thị huyên náo, bước chân khựng lại khi đan điền khẽ rung lên trước một thanh đoản kiếm rỉ sét cắm xiêu vẹo trong sọt phế liệu.',
        sceneDraftSnippet: 'Khói lò rèn và tiếng mặc cả ồn ào tràn ngập con ngõ Hắc Thạch. Hắn dừng bước trước sọt đồ nát của lão Tề. Giữa đống lưỡi cày gãy và chảo gang thủng, một thanh sắt gỉ dài hơn thước bỗng khiến một tia khí tức nơi đan điền hắn khẽ nhói lên như kim châm.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Đấu Trí Mặc Cả & Dương Đông Kích Tây',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Không để lộ ánh mắt thèm muốn, hắn nâng thanh đao gỉ bên cạnh lên săm soi rồi mới hờ hững đòi lấy thêm thanh kiếm sắt làm cọc gõ thử.',
        sceneDraftSnippet: '"Mười toái ngân cho thanh đao chặt củi này? Lão Tề, ngài chém người còn ngọt hơn đao đấy." Hắn cười nhạt, tay mân mê sống đao, tiện tay rút khúc sắt gỉ bên cạnh quơ quơ: "Bù thêm thanh sắt này để ta về làm đòn bẩy, bằng không ta qua sạp Lý đồ tể."'
      },
      {
        beatOrder: 3,
        beatTitle: 'Rửa Rỉ Sét & Phát Lộ Canh Kim',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Đêm về mật thất, dùng cồn thuốc tẩy sạch lớp bùn đất, một luồng sát khí Canh Kim lạnh buốt bắn ra làm đứt đôi sợi tóc bay lơ lửng.',
        sceneDraftSnippet: 'Rượu thuốc sôi sùng sục trên ngọn đèn dầu. Khi lớp rỉ sét màu nâu đen bong tróc, lộ ra thân kiếm màu xám tro với ba chữ triện "Thái Ất Tàn". Một tia hàn quang lóe lên trong đêm tối, bức tường đá sau lưng hắn khẽ nứt ra một vệt sâu như sợi chỉ.'
      }
    ],
    readyToInsertProseSnippet: 'Đêm khuya thanh vắng, ngọn đèn dầu trong căn phòng đệ tử ngoại môn chập chờn theo gió bấc. Hắn đặt thanh sắt gỉ vừa đổi được với giá mười toái ngân lên bàn đá, dùng mảnh vải thô tẩm rượu thuốc cẩn thận chà xát từng tấc một. Bụi gỉ rơi lả tả như vảy cá chết. Đột nhiên, "keng" một tiếng ngâm khẽ như tiếng hạc kêu giữa trời đông, một sợi kim quang sắc bén từ thân kiếm bắn vọt ra, xé toạc màn đêm rồi ghim sâu ba tấc vào vách đá hoa cương! Hắn nín thở, ngón tay run rẩy chạm vào ba chữ cổ chìm sâu dưới gờ kiếm: "Thái Ất Tàn". Hắn biết, con đường kiếm đạo gian nan của mình từ nay đã có một hạt giống vô giá.'
  },
  {
    id: 'micro_strand_2',
    title: 'Chấp Sự Ngoại Môn Khấu Trừ Nguyệt Hoa Đan',
    category: 'vendetta_local',
    scope: 'short_episode',
    parentSpineStageId: 'spine_stage_1',
    localTrigger: 'Ngày đầu tháng nhận bổng lộc đan dược tu luyện tại Ngoại Vụ Điện của tông môn.',
    protagonistMotivation: 'Đang ở ngưỡng cửa Luyện Khí Tầng 6, cần gấp 3 viên Nguyệt Hoa Đan để tẩy trừ cặn bã trong kinh mạch.',
    immediateObstacle: 'Triệu Chấp Sự ỷ thế có cháu trai là đệ tử nội môn, cố tình khấu trừ đan dược của đệ tử hàn môn, ép hắn phải làm cu li gánh nước ba tháng.',
    tacticalResolution: 'Trích dẫn chính xác điều 7 khoản 3 của Thiết Luật Tông Môn, ép Triệu Chấp Sự phải thượng đài so tài quyền cước; dùng bộ pháp linh hoạt làm gã vấp ngã rồi điểm huyệt trước mặt trăm đệ tử.',
    tangibleReward: 'Lấy lại 3 viên đan dược bị cướp + 50 linh thạch tiền bồi thường danh dự từ túi riêng của Triệu Chấp Sự.',
    anchorHookToMainPlot: 'Triệu Chấp Sự sinh lòng oán hận thấu xương, sau này câu kết với Ma Giáo nội gián để phục kích Main trong Lạc Nhật Cốc.',
    associatedNpcName: 'Triệu Quý (Chấp sự phân phát đan dược Ngoại Vụ Điện)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Lời Lăng Mạ Tại Bàn Phát Đan',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Chiếc khay đan bị gạt phắt đi, Triệu Quý cười nhạo tư chất phàm căn của hắn và ném ra một viên phế đan nứt nẻ.',
        sceneDraftSnippet: '"Một tên ngũ linh căn tạp dịch mà cũng đòi Nguyệt Hoa Đan thượng phẩm? Cầm viên đan cháy này rồi xách thùng lên Hậu Sơn gánh nước trăm gánh đi!" Triệu Quý hất hàm, khay đồng rung lên chan chát giữa tiếng cười nhạo của đám đệ tử nịnh hót chung quanh.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Chiếu Soi Môn Quy & Đấu Pháp Đài',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Hắn không giận dữ chửi bới mà lấy Thiết Lệnh Tông Quy ra đọc vang, đẩy Triệu Quý vào thế bất nghĩa buộc phải nhận lời khiêu chiến đồng cấp.',
        sceneDraftSnippet: '"Tông quy điều thứ bảy: Kẻ tự ý cắt xén khẩu phần tu luyện của đồng môn, phạt roi lôi đài hoặc chấp nhận khiêu chiến quyền cước!" Tiếng nói của hắn sang sảng như chuông đồng, vang vọng khắp đại điện khiến nụ cười trên mặt Triệu Quý lập tức cứng đờ.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Phản Khách Vi Chủ & Thu Hoạch Chiến Lợi',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Trên lôi đài, hắn né tránh đòn công mãnh liệt rồi một cước gạt chân, điểm trúng huyệt Khí Xung khiến Triệu Quý quỳ sụp ôm bụng van xin.',
        sceneDraftSnippet: 'Thân hình hắn lướt đi như gió thoảng qua kẽ lá. Nắm đấm nặng nề của Triệu Quý đánh vào khoảng không. Đúng khoảnh khắc gã lỡ đà, hai ngón tay hắn như mũi dùi thép điểm thẳng vào huyệt Khí Xung. "Bịch!" Triệu Quý quỳ sụp xuống sàn gỗ, mồ hôi hột tuôn như tắm.'
      }
    ],
    readyToInsertProseSnippet: 'Bầu không khí trong Ngoại Vụ Điện bỗng chốc im phăng phắc như tờ. Triệu Quý ôm chặt lấy bụng, sắc mặt trắng bệch quỳ gối dưới chân hắn, không tài nào ngẩng đầu lên nổi trước ánh mắt của hàng trăm đệ tử chung quanh. Hắn từ tốn cúi người, tháo chiếc túi gấm chứa đủ ba viên Nguyệt Hoa Đan nguyên vẹn trên bàn, lại tiện tay giật luôn túi trữ vật bên hông Triệu Quý. "Theo quy định lôi đài, kẻ thua cuộc bồi thường năm mươi linh thạch tổn thất tinh thần. Đa tạ Triệu chấp sự đã chỉ giáo." Hắn mỉm cười nhạt, xoay người sải bước rời khỏi đại điện giữa những ánh mắt kinh ngạc xen lẫn kiêng dè.'
  },
  {
    id: 'micro_strand_3',
    title: 'Cứu Hồ Ly Con Mắc Bẫy Dưới Khe Suối Lạc Nguyệt',
    category: 'serendipitous_encounter',
    scope: 'single_scene',
    parentSpineStageId: 'spine_stage_2',
    localTrigger: 'Đi tuần tra ranh giới rừng trúc sau núi, nghe thấy tiếng rên rỉ yếu ớt dưới khe suối.',
    protagonistMotivation: 'Tìm kiếm rễ cây Hàn Sương Thảo mọc ven suối để chuẩn bị cho đợt luyện đan tối nay.',
    immediateObstacle: 'Chiếc bẫy Phệ Hồn Tỏa bằng thép đen có độc gặm nhấm kinh mạch, nếu dùng lực mạnh phá bẫy sẽ kích nổ cơ quan làm nát chân thú.',
    tacticalResolution: 'Dùng ngân châm chọc thủng then chốt cơ quan, vận dụng một tia mộc linh lực ôn dưỡng cầm máu và giải trừ độc tính cho tiểu hồ ly.',
    tangibleReward: 'Tiểu hồ ly nhả ra một viên Băng Lam Dạ Minh Châu; để lại một vết bớt hình hoa sen ba cánh bảo hộ trên mu bàn tay.',
    anchorHookToMainPlot: 'Vết bớt hoa sen này sau này cứu mạng hắn khi đối mặt với Yêu Vương Lôi Đình tại Vạn Thú Lĩnh, biến thế tử thù thành minh hữu.',
    associatedNpcName: 'Bạch Linh Nhi (Hóa thân sơ sinh của Cửu Vĩ Thiên Hồ)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Tiếng Kêu Dưới Màn Sương',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Tiếng suối róc rách xen lẫn tiếng thở dốc tuyệt vọng của một sinh linh nhỏ bé giữa bãi đá rêu phong.',
        sceneDraftSnippet: 'Bọt nước suối Lạc Nguyệt bắn lên mát lạnh. Dưới tán lá dương xỉ rậm rạp, một con hồ ly lông trắng như tuyết đang quằn quại, chiếc chân sau bị chiếc kẹp sắt đen ngòm ngoạm sâu hoắm, máu đỏ tươi nhuộm thắm phiến đá xanh.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Gỡ Bẫy Bằng Ngân Châm',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Tiểu hồ ly gầm gừ muốn cắn, nhưng ánh mắt kiên định dịu dàng của hắn khiến nó dần buông lỏng cảnh giác.',
        sceneDraftSnippet: '"Đừng cựa quậy, răng thép có ngạnh độc đấy." Hắn nhẹ giọng trấn an, rút ra ba cây ngân châm điểm vào các huyệt cầm máu quanh đùi con thú, rồi cẩn thận luồn dây thép bẩy lẫy lò xo.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Minh Châu Báo Ân & Ấn Ký Bí Ẩn',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Sau khi được băng bó, tiểu hồ ly dụi đầu vào lòng bàn tay hắn, nhả ra một viên ngọc phát sáng rồi biến mất vào rừng sâu.',
        sceneDraftSnippet: '"Cạch", chiếc bẫy bật tung. Con hồ ly trắng liếm nhẹ vết thương, đôi mắt tím biếc nhìn hắn thật sâu rồi nhả ra một viên ngọc màu băng lam mát rượi. Khi nó nhảy vọt vào bụi rậm, mu bàn tay hắn khẽ nóng ran, hiện lên một đóa sen ba cánh lấp lánh.'
      }
    ],
    readyToInsertProseSnippet: 'Viên Dạ Minh Châu to bằng quả trứng chim bồ câu nằm gọn trong lòng bàn tay hắn, tỏa ra luồng hàn khí êm dịu xua tan toàn bộ cảm giác mệt mỏi trong kinh mạch. Phía xa, bóng hình con hồ ly trắng nhỏ nhắn dừng lại trên mỏm đá phủ đầy rêu, quay đầu nhìn hắn một lần cuối rồi phóng vút vào màn sương mờ ảo của rừng già. Hắn nhìn lại mu bàn tay mình, vết bớt hoa sen ba cánh mờ nhạt như ẩn như hiện dưới ánh trăng. "Một sinh linh thật kỳ lạ..." Hắn thì thầm, cất viên minh châu vào túi trữ vật, trong lòng dâng lên một dự cảm rằng nhân duyên này tuyệt đối chưa dừng lại ở đây.'
  },
  {
    id: 'micro_strand_4',
    title: 'Dạ Bán Thí Kiếm Bắn Nổ Tảng Đá Thiên Thạch',
    category: 'technique_experiment',
    scope: 'single_scene',
    parentSpineStageId: 'spine_stage_2',
    localTrigger: 'Sau khi bế quan đột phá Trúc Cơ Trung Kỳ, chân khí tràn đầy khó ngủ lúc nửa đêm.',
    protagonistMotivation: 'Muốn kiểm tra uy lực thực tế của chiêu thức mới "Luyện Kiếm Thành Ti" trước ngày thi đấu tông môn.',
    immediateObstacle: 'Kiếm khí quá sắc bén nếu chém bừa bãi sẽ làm kinh động đại trận hộ sơn và lính tuần tra.',
    tacticalResolution: 'Lên Vấn Kiếm Nhai bỏ hoang nơi có hòn đá Thiên Thạch đen ngàn năm trơ trọi, nén ép kiếm khí thành một sợi tơ mỏng như sợi tóc rồi bắn thủng tâm đá.',
    tangibleReward: 'Tảng đá nứt đôi, để lộ một hộp ngọc cổ giấu bên trong chứa cuốn bí kíp tàn quyển "Tật Phong Vô Ảnh Bộ".',
    anchorHookToMainPlot: 'Nhờ có bộ pháp vô ảnh này, hắn né tránh được đòn sát thủ tất sát của U Minh Các trong chuyến đi bí cảnh sau này.',
    associatedNpcName: 'Không có (Phân cảnh độc hành ngộ đạo)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Đêm Lạnh Đỉnh Vấn Kiếm',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Gió đêm rít từng cơn trên đỉnh vách đá chênh vênh, ánh trăng vằng vặc chiếu rọi tảng đá thiên thạch đen sừng sững.',
        sceneDraftSnippet: 'Gió lộng phần phật vạt áo xanh. Hắn đứng trên đỉnh Vấn Kiếm Nhai, hít sâu một hơi khí lạnh thấu xương. Trước mặt hắn, tảng hắc thạch cao hơn trượng lừng lững như một con cự thú ngủ say hàng vạn năm.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Nén Kiếm Khí Thành Sợi Tơ',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Hai ngón tay chập lại thành kiếm chỉ, linh lực trong đan điền cuộn trào rồi bị nén lại thành một điểm sáng nhỏ li ti.',
        sceneDraftSnippet: 'Chân khí cuồn cuộn đổ dồn về đầu ngón trỏ. Hắn nén lại, lại nén tiếp... Từ một đạo kiếm khí rộng ba thước dần thu nhỏ lại bằng ngón tay, rồi mảnh như sợi tơ tằm màu bạc lấp lánh sắc lạnh.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Xuyên Thủng Hắc Thạch & Cơ Duyên Bất Ngờ',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Sợi tơ kiếm xuyên thủng tảng đá không một tiếng động, tảng đá nứt đôi để lộ cơ duyên tiền nhân phong ấn ngàn năm.',
        sceneDraftSnippet: '"Vút!" Không có tiếng nổ long trời lở đất, chỉ có một tiếng xé gió cực khẽ. Tảng hắc thạch cứng hơn huyền thiết bỗng xuất hiện một lỗ thủng nhẵn thín như gương, rồi "rắc" một tiếng, tách làm đôi để lộ một chiếc hộp ngọc đóng đầy rêu phong.'
      }
    ],
    readyToInsertProseSnippet: 'Tảng hắc thạch ngàn năm nứt toác sang hai bên, để lộ một hốc đá vuông vức ngay chính giữa tâm thạch. Một chiếc hộp ngọc cổ xưa viền vàng phong kín bằng một lá bùa phù triện đã mục nát nằm yên vị bên trong. Hắn tiến lại gần, dùng đầu ngón tay khẽ chạm vào nắp hộp. Nắp ngọc trượt ra, một mùi hương trầm dịu nhẹ thoang thoảng bay lên cùng tấm lụa da thú ghi bốn chữ cổ: "Tật Phong Vô Ảnh Bộ". Hắn nhìn xuống hai ngón tay kiếm chỉ vẫn còn vương lại một tia kiếm ý mỏng manh, nở nụ cười thỏa mãn: "Thì ra tiền nhân năm xưa cũng từng đứng ở nơi này thí kiếm và lưu lại truyền thừa cho kẻ hữu duyên."'
  },
  {
    id: 'micro_strand_5',
    title: 'Nghe Lén Mật Đàm Sau Rừng Trúc Nửa Đêm',
    category: 'infiltration_recon',
    scope: 'short_episode',
    parentSpineStageId: 'spine_stage_2',
    localTrigger: 'Đi hứng sương mai tinh khiết để chuẩn bị luyện chế Trúc Cơ Đan lúc canh ba.',
    protagonistMotivation: 'Tránh xa mọi sự chú ý để thu thập sương sớm trên ngọn trúc tím quý hiếm.',
    immediateObstacle: 'Vô tình chạm trán Nhị Sư Huynh cùng một hắc y nhân che mặt đang trao đổi mật thư ngay trong cấm viên.',
    tacticalResolution: 'Nuốt Liễm Tức Đan, chôn mình dưới đống lá trúc mục ẩm ướt, dùng ống trúc rỗng làm loa thính âm nghe trọn vẹn âm mưu mà không phóng thần thức.',
    tangibleReward: 'Biết trước kế hoạch rải phấn Dẫn Ma Hương vào lều trại đệ tử trong ngày đại hội săn bắn sắp tới.',
    anchorHookToMainPlot: 'Nhờ thông tin này, Main chuẩn bị sẵn túi thơm Giải Ma Tán, lật ngược thế cờ biến cái bẫy của Nhị Sư Huynh thành bằng chứng phản tông.',
    associatedNpcName: 'Tống Nhân Kiệt (Nhị sư huynh nội môn)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Bóng Đen Dưới Rừng Trúc',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Đang hứng từng giọt sương mai, bỗng nghe thấy tiếng bước chân cực nhẹ và tà khí ma đạo thoảng qua trong gió.',
        sceneDraftSnippet: 'Từng giọt sương trong veo rơi tí tách vào bình ngọc. Bỗng sống lưng hắn lạnh toát khi ngửi thấy mùi tanh nồng đặc trưng của huyết ma công phảng phất qua rặng trúc.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Liễm Tức Quy Tức Dưới Lớp Bùn',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Hắn nín thở, nhét viên Liễm Tức Đan vào miệng, lăn người vào vũng lá mục không để phát ra một tiếng động.',
        sceneDraftSnippet: 'Hắn nằm im bất động như khúc gỗ mục dưới lớp lá ẩm ướt. Tiếng bước chân dừng lại cách hắn chưa đầy năm thước. Hắn áp sát ống trúc rỗng vào tai, cẩn thận hứng lấy từng câu chữ thì thầm.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Âm Mưu Lộ Tẩy & Rút Lui An Toàn',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Ghi nhớ tường tận vị trí cất giấu túi Dẫn Ma Hương, đợi hai kẻ gian rời đi mới bí mật thoát thân.',
        sceneDraftSnippet: '"Nhớ kỹ, giờ Tý đêm săn bắn, rải bột này quanh lều của tiểu tử họ Lâm..." Tiếng cười gằn quen thuộc của Tống Nhân Kiệt vang lên. Hắn siết chặt nắm tay trong bùn, ánh mắt lóe lên tia sáng lạnh lẽo.'
      }
    ],
    readyToInsertProseSnippet: 'Mãi đến khi hai bóng đen biến mất hoàn toàn vào màn đêm thăm thẳm, tiếng côn trùng trong rừng trúc mới rả rích cất tiếng trở lại. Hắn từ từ trồi lên khỏi đống lá mục, rũ bỏ bùn đất trên người, sắc mặt trầm như nước mùa thu. "Tống Nhân Kiệt... ngươi muốn mượn tay bầy ma thú xé xác ta trong đêm săn bắn sao?" Hắn siết chặt chiếc bình ngọc hứng sương mai, khóe môi khẽ nhếch lên một nụ cười lạnh: "Đã như vậy, ta sẽ để ngươi tự mình nếm thử mùi vị của đàn thú cuồng nộ."'
  },
  {
    id: 'micro_strand_6',
    title: 'Đổ Thạch Phường Thị & Nhãn Lực Khai Thiên',
    category: 'black_market_gamble',
    scope: 'short_episode',
    parentSpineStageId: 'spine_stage_2',
    localTrigger: 'Cần tìm kiếm quặng sắt thiên thạch để bồi bổ cho kiếm thai đang đói khát linh tính.',
    protagonistMotivation: 'Kiếm thai cắn nuốt hết linh quặng thông thường, cần một khối quặng dị chủng có tính Canh Kim cực cao.',
    immediateObstacle: 'Thiếu gia thế gia họ Tào kiêu ngạo bao trọn gian hàng thạch quặng, khinh thường tán tu, ép hắn cược 500 linh thạch.',
    tacticalResolution: 'Vận chuyển một tia kiếm đồng nhìn thấu độ đậm nhạt của sát khí Canh Kim xuyên qua lớp vỏ đá xám xịt mà không bị cấm chế thạch bì cắn trả.',
    tangibleReward: 'Cắt ra một viên "Thái Cổ Canh Kim Tinh Anh" cỡ nắm tay, thắng trọn 500 linh thạch tiền cược của thiếu gia họ Tào.',
    anchorHookToMainPlot: 'Khối Canh Kim Tinh Anh này giúp bản mệnh phi kiếm tiến hóa trực tiếp lên hàng Trung Phẩm Linh Khí.',
    associatedNpcName: 'Tào Tử Phong (Công tử Tào gia Tiên Thành)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Lời Thách Thức Bên Bàn Cược Đá',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Tại sạp đổ thạch lớn nhất phường thị, Tào Tử Phong hất hàm chế giễu xuất thân nghèo hèn của hắn trước đám đông.',
        sceneDraftSnippet: '"Một tên đệ tử ngoại môn nghèo kiết xác cũng dám mó vào đá quặng Thiên Vực? Ngươi có nổi năm trăm linh thạch để đền không?" Tào Tử Phong vung quạt ngọc, ném ra một túi linh thạch sáng rực xuống bàn cược.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Vận Kiếm Đồng Soi Thấu Quặng Thô',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Hắn bỏ qua những khối đá lấp lánh linh quang giả tạo, dùng đồng thuật nhìn thẳng vào tảng đá xù xì góc bàn.',
        sceneDraftSnippet: 'Trong đáy mắt hắn lóe lên một tia sáng vàng hình chữ thập cực nhỏ. Qua lớp vỏ đá phong hóa dày cộp, một khối ánh sáng vàng kim chói lọi như mặt trời tí hon đang tỏa ra luồng sát khí kinh người.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Khai Đao Thiết Thạch & Kim Quang Ngút Trời',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Lưỡi đao cắt đá lướt qua, kim quang rực rỡ bộc phát khiến toàn trường chấn động, mặt Tào Tử Phong xám ngoét.',
        sceneDraftSnippet: '"Xoẹt!" Lớp đá ngoài rơi xuống. Một luồng Canh Kim chi khí sắc bén như gươm tuốt khỏi vỏ phóng thẳng lên trời ba trượng! "Trời ơi! Canh Kim Tinh Anh thuần khiết trăm năm hiếm gặp!" Cả sạp đồ thạch ồ lên kinh hãi.'
      }
    ],
    readyToInsertProseSnippet: 'Cả phường thị đổ thạch lặng ngắt như tờ, chỉ còn lại tiếng hít khí lạnh thấu tim của hàng trăm tu sĩ đứng xem. Khối Canh Kim Tinh Anh cỡ nắm tay tỏa ra ánh sáng hoàng kim rực rỡ, chiếu rọi khuôn mặt méo mó không còn giọt máu của Tào Tử Phong. Hắn từ tốn thu khối quặng vô giá vào tay áo, rồi đưa tay gom trọn túi năm trăm linh thạch tiền cược trên bàn đá. "Tào công tử quả nhiên phóng khoáng. Năm trăm linh thạch này, tại hạ xin nhận." Hắn gật đầu chào nhạt rồi quay lưng bước đi, để lại sau lưng tiếng nghiến răng ken két của kẻ bại trận.'
  },
  {
    id: 'micro_strand_7',
    title: 'Ký Ức Tiệm Bánh Bao & Chút Hơi Ấm Phàm Nhân',
    category: 'dao_heart_tribulation',
    scope: 'single_scene',
    parentSpineStageId: 'spine_stage_3',
    localTrigger: 'Đứng trước ngưỡng cửa xung kích Nguyên Anh, tâm ma kiếp số trỗi dậy từ những ký ức hàn vi thời thơ ấu.',
    protagonistMotivation: 'Tìm kiếm sự cân bằng tuyệt đối trong đạo tâm, giải tỏa nút thắt "vô tình tu tiên" để nghênh tiếp lôi kiếp.',
    immediateObstacle: 'Tâm ma dẫn dụ hắn cắt đứt toàn bộ thất tình lục dục, nếu thuận theo sẽ biến thành kẻ vô cảm mất đi nhân tính.',
    tacticalResolution: 'Rời núi trở về thị trấn phàm trần năm xưa, ngồi ăn một bát hoành thánh nóng hổi bên lề đường, ngộ ra "Hữu Tình Đạo".',
    tangibleReward: 'Đạo tâm viên mãn vô khuyết, lĩnh ngộ cảnh giới "Thiên Nhân Hợp Nhất", giảm 90% sát thương từ Tâm Ma Lôi Kiếp.',
    anchorHookToMainPlot: 'Đạo tâm vững như bàn thạch này giúp hắn phá tan Cửu U Ảo Mộng Trận của Ma Tôn trong đại chiến Nguyên Anh.',
    associatedNpcName: 'Bà Lão Bán Bánh Bao (Ký ức phàm trần)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Gió Tuyết Thị Trấn Cũ',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Tuyết rơi trắng xóa con phố nhỏ phàm trần, hắn trút bỏ tiên y, khoác áo vải thô bước đi giữa dòng người tấp nập.',
        sceneDraftSnippet: 'Tuyết đầu mùa lất phất rơi trên mái ngói rêu phong. Rời xa tiên sơn lộng lẫy đầy tranh đoạt, mùi củi cháy và tiếng rao đêm của thị trấn phàm trần bỗng khiến bước chân hắn dừng lại.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Bát Hoành Thánh Nóng Ven Đường',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Ngồi bên gánh hàng rong ven đường, bà lão tóc bạc đưa cho hắn bát bánh bao nóng hổi như mười năm trước.',
        sceneDraftSnippet: '"Tiểu tử, trời lạnh thế này ăn bát canh cho ấm bụng." Bát hoành thánh nghi ngút khói đặt trước mặt. Hắn bưng bát nước dùng ấm nóng, từng ký ức đói rét năm xưa bỗng hòa tan thành một dòng nước ấm chảy qua lồng ngực.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Đốn Ngộ Đạo Tâm Hữu Tình',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Thấu hiểu rằng tu tiên không phải để hóa đá trái tim, mà là để bảo vệ hơi ấm này; linh đài sáng tỏ như gương sen.',
        sceneDraftSnippet: 'Hắn mỉm cười, đặt lại một thỏi bạc nhỏ rồi đứng dậy. Đan điền hắn khẽ rung chuyển, Kim Đan Cửu Chuyển bỗng nứt ra một đóa hoa sen thanh tịnh, tâm ma gào thét tan biến như bọt nước.'
      }
    ],
    readyToInsertProseSnippet: 'Tuyết vẫn rơi trắng xóa con ngõ nhỏ, nhưng trong lồng ngực hắn giờ đây là một ngọn lửa ấm áp và thuần khiết vô ngần. Hắn bước từng bước vững chãi trên nền tuyết xốp, mỗi bước chân đều khiến linh lực trong kinh mạch lưu chuyển trôi chảy hơn bao giờ hết. Đạo tâm không còn vướng bận, tâm ma tan biến không tì vết. Hắn ngẩng đầu nhìn lên trời xanh bao la, ánh mắt kiên định và thanh thản lạ kỳ: "Đạo của ta là Hữu Tình Đạo. Ta tu kiếm, không phải để đoạn tuyệt hồng trần, mà là để kiếm này đủ sắc bén chở che cho những người ta yêu thương."'
  },
  {
    id: 'micro_strand_8',
    title: 'Linh Thú Heo Rừng Húc Đổ Vườn Dược Liệu',
    category: 'sect_daily_slice',
    scope: 'single_scene',
    parentSpineStageId: 'spine_stage_1',
    localTrigger: 'Tiểu sư muội Lạc Tiểu Vũ hớt hải chạy sang cầu cứu vì lỡ làm sổng con Thiết Bì Linh Trư của Đại Trưởng Lão.',
    protagonistMotivation: 'Bảo vệ tiểu sư muội khỏi bị trách phạt và giải cứu những luống dược liệu quý sắp bị giẫm nát.',
    immediateObstacle: 'Con linh trư tam giai da dày như giáp sắt, đang phát cuồng ủi tung đất đá trong vườn Băng Tâm Thảo.',
    tacticalResolution: 'Ném quả Túy Linh Quả ngâm rượu dụ con thú ăn, sau đó dùng bộ pháp luồn ra sau gáy điểm vào huyệt Phong Trì làm nó ngủ say.',
    tangibleReward: 'Tiểu sư muội tặng một lọ Bạch Ngọc Linh Cao gia truyền + thu được một đống phân linh trư tam giai làm phân bón thượng phẩm.',
    anchorHookToMainPlot: 'Tạo dựng mối quan hệ tin cậy sâu sắc với Tiểu Vũ, mở ra sự hậu thuẫn ngầm của Đại Trưởng Lão.',
    associatedNpcName: 'Lạc Tiểu Vũ (Tiểu sư muội ngây thơ)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Tiếng Hét Trong Vườn Dược Thảo',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Tiểu Vũ vừa chạy vừa khóc gọi tên hắn giữa tiếng gầm rú và tiếng đổ gãy của cọc rào vườn thuốc.',
        sceneDraftSnippet: '"Lâm sư huynh cứu muội với! Con Hắc Bì Trư của sư tôn phát điên rồi!" Tiếng khóc thất thanh của Tiểu Vũ vừa dứt thì một bóng đen to như con trâu rừng đã ủi sập cánh cổng gỗ.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Dương Đông Kích Tây Dụ Mồi Say',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Hắn ném quả Túy Linh Quả thơm nức mũi vào miệng heo rừng để làm chậm bước chân hung hãn của nó.',
        sceneDraftSnippet: 'Con heo rừng khịt mũi, mùi thơm ngào ngạt của linh quả ngâm rượu khiến đôi mắt đỏ ngầu của nó khẽ đảo quanh. Nó há ngoác cái mồm đầy răng nanh táp gọn quả rượu.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Điểm Huyệt Sau Gáy & Thu Phục Êm Đẹp',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Tận dụng giây phút say mềm của con thú, hắn tung người đạp lên lưng nó, điểm huyệt khiến nó ngã lăn ra ngáy o o.',
        sceneDraftSnippet: 'Thân ảnh hắn bay vút lên như cánh én, hai ngón tay rót đầy kình lực gõ chuẩn xác vào sau gáy heo. "Ầm!" Con thú khổng lồ bốn chân mềm nhũn, ngã vật ra đất ngáy khò khò như sấm.'
      }
    ],
    readyToInsertProseSnippet: 'Nhìn con heo rừng to kềnh càng đang nằm phơi bụng ngáy vang như sấm giữa đống lá thuốc rơi vãi, Tiểu Vũ lấy tay che miệng vừa cười vừa lau nước mắt. "Lâm sư huynh, huynh giỏi quá! Suýt nữa thì sư tôn lột da muội rồi." Nàng rụt rè móc từ trong túi áo ra một chiếc lọ ngọc nhỏ xíu dúi vào tay hắn: "Đây là Bạch Ngọc Linh Cao trị thương gia truyền của muội, huynh giữ lấy dùng nhé." Hắn phì cười xoa đầu tiểu sư muội, đưa mắt nhìn con thú béo múp míp đang say mèm: "Lần sau chăm thú nhớ cho nó ăn no trước, bằng không có ngày nó ủi sập cả động phủ của sư tôn đấy."'
  },
  {
    id: 'micro_strand_9',
    title: 'Thử Nghiệm Thủy Luyện Thuật Biến Dị Phế Đan',
    category: 'technique_experiment',
    scope: 'short_episode',
    parentSpineStageId: 'spine_stage_2',
    localTrigger: 'Mua được một mớ phế đan bị khét cháy với giá rẻ 5 linh thạch ngoài chợ đen.',
    protagonistMotivation: 'Muốn kiểm chứng giả thuyết cổ tịch: Thủy luyện có thể bóc tách độc tố mà không phá vỡ dược tính cốt lõi.',
    immediateObstacle: 'Phế đan có dược tính cực kỳ bất ổn định, nếu nhiệt độ nước thay đổi đột ngột sẽ lập tức phát nổ tạc lò.',
    tacticalResolution: 'Ngâm đan trong nước suối Hàn Tuyền, dùng Canh Kim Kiếm Khí gọt tỉa lớp cháy xém rồi dùng Chân Hỏa ôn dưỡng đảo ngược chu kỳ.',
    tangibleReward: 'Chiết xuất thành công 3 giọt Băng Phách Linh Dịch thuần khiết tương đương đan dược ngũ giai.',
    anchorHookToMainPlot: 'Linh dịch này giúp đạo lữ Lạc Thanh Hàn áp chế thể chất hàn độc bộc phát trong đêm đại tuyết sau này.',
    associatedNpcName: 'Không có (Thử nghiệm đan đạo mật thất)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Lô Phế Đan Khét Đen',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Những viên đan dược méo mó đen xì bốc mùi khét lẹt được đặt trên đĩa sứ trong mật thất.',
        sceneDraftSnippet: 'Năm viên phế đan đen như than củi nằm im lìm trên đĩa. Người khác nhìn vào chỉ thấy rác rưởi, nhưng thần thức của hắn lại cảm nhận được ba tia linh lực băng hàn đang giãy giụa dưới lớp vỏ cháy.'
      },
      {
        beatOrder: 2,
        beatTitle: 'Thủy Hỏa Giao Thoa Dưới Đáy Đỉnh',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Nước suối lạnh và ngọn lửa nhỏ đối chọi gay gắt, lò luyện đan rung bần bật đòi phát nổ.',
        sceneDraftSnippet: 'Bọt nước trong đỉnh sôi sùng sục. Nắp đỉnh rung lên bần bật như muốn bung ra. Trán hắn lấm tấm mồ hôi, hai tay không ngừng biến ảo pháp ấn duy trì sự cân bằng mong manh giữa âm và dương.'
      },
      {
        beatOrder: 3,
        beatTitle: 'Ngưng Tụ Ba Giọt Linh Dịch Tuyệt Phẩm',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Lớp cặn bã tan biến hoàn toàn, ba giọt linh dịch xanh biếc lơ lửng giữa không trung tỏa hương thơm thanh mát.',
        sceneDraftSnippet: '"Tách!" Lớp vỏ than cháy vỡ vụn rơi xuống đáy đỉnh. Giữa làn khói trắng mát lạnh, ba giọt ngọc bích óng ánh bay bổng lên không trung, tỏa ra ánh sáng băng lam thuần khiết không chút tạp chất.'
      }
    ],
    readyToInsertProseSnippet: 'Mùi khét lẹt trong mật thất hoàn toàn bị thay thế bởi một mùi hương hoa sen thanh tao mát lạnh đến tận tâm can. Ba giọt Băng Phách Linh Dịch trong vắt như sương sớm lơ lửng trên đầu ngón tay hắn, tỏa ra luồng hàn khí tinh thuần làm đông cứng cả không khí chung quanh. Hắn cẩn thận lấy ra một chiếc lọ bạch ngọc thu lấy ba giọt linh dịch quý giá. "Thành công rồi... Phương pháp Thủy Luyện Nghịch Chuyển này hoàn toàn có thể biến phế liệu thành bảo vật." Nghĩ đến Lạc Thanh Hàn thường xuyên bị hàn độc hành hạ mỗi đêm trăng rằm, ánh mắt hắn bất giác ấm áp lạ thường.'
  },
  {
    id: 'micro_strand_10',
    title: 'Tửu Quán Tương Phùng Tiền Bối Say Rượu',
    category: 'serendipitous_encounter',
    scope: 'single_scene',
    parentSpineStageId: 'spine_stage_2',
    localTrigger: 'Ngồi uống rượu giải sầu tại quán nhỏ chân núi Tiên Thành sau một ngày dài tu luyện bí pháp bế tắc.',
    protagonistMotivation: 'Muốn thả lỏng tâm trí sau khi thử kiếm thất bại liên tiếp ba mươi lần.',
    immediateObstacle: 'Một lão già say khướt bẩn thỉu rách rưới bị tiểu nhị hắt hủi xua đuổi, người chung quanh bĩu môi khinh miệt.',
    tacticalResolution: 'Chủ động mời lão vào bàn mình, gọi bình Bích Lạc Xuân đắt nhất quán và lắng nghe lão lảm nhảm về kiếm đạo mà không hề tỏ vẻ chê bai.',
    tangibleReward: 'Lão già chấm rượu vẽ một đường kiếm trên mặt bàn gỗ, dạy hắn bí quyết "Nhất Kiếm Phá Vạn Pháp".',
    anchorHookToMainPlot: 'Lão già chính là Tửu Kiếm Tiên ẩn thế - người sau này xuất hiện chém rách mây trời giải cứu hắn trong trận phục kích Ma Triều.',
    associatedNpcName: 'Túy Điệp Tiên Ông (Tửu Kiếm Tiên ẩn thế)',
    beats: [
      {
        beatOrder: 1,
        beatTitle: 'Gã Say Bị Đuổi & Bát Rượu Nghĩa Hiệp',
        narrativeFunction: 'inciting_incident',
        sceneSummary: 'Lão già rách rưới bị đẩy ngã trước cửa quán, hắn vươn tay đỡ lấy và mời lão cùng ngồi.',
        sceneDraftSnippet: '"Cút đi lão ăn mày hôi hám!" Tiếng tiểu nhị quát tháo vang lên giữa quán rượu. Hắn đưa tay đỡ lấy cánh tay gầy guộc của lão già: "Tiểu nhị, mang lên đây thêm một vò Bích Lạc Xuân và hai chiếc bát lớn."'
      },
      {
        beatOrder: 2,
        beatTitle: 'Rượu Vào Lời Ra & Chuyện Đời Viển Vông',
        narrativeFunction: 'rising_friction',
        sceneSummary: 'Lão già tu ừng ực bát rượu ngon, lảm nhảm những câu ca kỳ quái về kiếm khí và vầng trăng đáy nước.',
        sceneDraftSnippet: '"Rượu ngon! Rượu ngon lắm tiểu tử!" Lão già quẹt râu lấm lem, cười hề hề nhìn hắn: "Kiếm của ngươi quá nặng, nặng vì mang theo quá nhiều sát khí... Kiếm đạo chân chính, phải như giọt rượu chảy vào cổ họng, thanh thoát vô hình."'
      },
      {
        beatOrder: 3,
        beatTitle: 'Chấm Rượu Vẽ Kiếm & Ý Cảnh Kinh Thiên',
        narrativeFunction: 'micro_climax',
        sceneSummary: 'Ngón tay lão nhúng vào bát rượu quẹt ngang mặt bàn gỗ, một đạo kiếm ý vô hình khắc sâu vào linh hồn hắn.',
        sceneDraftSnippet: 'Lão nhúng ngón tay cáu bẩn vào bát rượu, tiện tay gạch một đường ngoằn ngoèo trên mặt bàn gỗ trăn. "Ong!" Đột nhiên trong mắt hắn, đường nước rượu bình thường bỗng biến thành một dải ngân hà kiếm khí rực rỡ xé toạc càn khôn!'
      }
    ],
    readyToInsertProseSnippet: 'Khi hắn bừng tỉnh khỏi cơn chấn động của dải ngân hà kiếm ý, chiếc ghế đối diện đã trống trơn từ bao giờ. Trên mặt bàn gỗ, vệt nước rượu hình đường kiếm ngoằn ngoèo đã bốc hơi khô ráo, nhưng sâu trong thớ gỗ lại hằn lên một vệt kiếm ngân sâu nửa đốt ngón tay, trơn láng như được mài bằng gương ngọc. Trong không khí chỉ còn vương lại một câu hát say khướt vọng lại từ xa xăm: "Trời đất say, ta say... Một kiếm định càn khôn giữa cõi mộng..." Hắn nhìn vò rượu cạn đáy, trịnh trọng chắp tay hướng về phía chân trời vái một lạy sâu sắc.'
  }
];
