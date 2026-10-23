// =========================================================================
// THIÊN TAI ĐỊA BIẾN & CHIẾN TÀN PHẾ TÍCH BẢO ĐIỂN
// (Bảo Điển Miêu Tả Cảnh Vật Hoang Tàn, Chiến Tranh, Thiên Tai & Đổ Nát Thành Trì)
// Cảnh hoang tàn sau cuộc chiến, làng mạc gặp hạn hán ngập lụt, thành trì sụp đổ & cháy nổ
// =========================================================================

export type DisasterRuinsCategory =
  | 'HOANG_TAN_CHIEN_TRUONG'   // Cảnh Hoang Tàn Sau Cuộc Chiến
  | 'LANG_MAC_HAN_HAN'         // Cảnh Làng Mạc Thiên Tai - Hạn Hán Khốc Liệt
  | 'LANG_MAC_NGAP_LUT'        // Cảnh Làng Mạc Thiên Tai - Ngập Lụt Hồng Thủy
  | 'THANH_TRI_SUP_DO'         // Cảnh Tòa Thành Sụp Đổ & Trận Pháp Vỡ Vụn
  | 'THANH_TRI_CHAY_NO'        // Cảnh Tòa Thành Cháy Nổ & Biển Lửa Rực Trời
  | 'TRUONG_SINH_HOI_SINH';    // Cảnh Hồi Sinh Khi Hạt Cây Trường Sinh Rơi Xuống & Nẩy Mầm

export interface LongevitySeedRevival {
  seedName: string; // Tên hạt giống trường sinh (Thái Cổ Trường Sinh Thần Chủng, Bất Lão Tiên Chủng...)
  descentPhenomenon: string; // Khung cảnh hạt giống hạ thế: rạch thủng mây mù, ánh sáng bích lục, tiên âm đại đạo
  momentOfTouchingGround: string; // Khoảnh khắc chạm đất: rạch tan tử khí, sóng gợn sinh mệnh lan tỏa muôn dặm
  rootingAndPurification: string; // Rễ thần mộc đan cài, hút độc tố, hàn gắn vết nứt, hóa giải sát khí, dập tắt lửa ma, lọc nước lũ
  sproutingAndCanopyBloom: string; // Chồi non vươn lên thành Cổ Mộc ngàn trượng, lá ngọc xanh biếc, hoa quả trường sinh, mưa cam lộ
  revivedSensoryAtmosphere: {
    visual: string; // Ánh sáng bích ngọc dìu dịu, hoa linh lan nở rộ, hư ảnh thần thụ tỏa rạng
    auditory: string; // Tiếng suối róc rách, chim tiên thánh thót, khúc nhạc đại đạo an bình
    olfactory: string; // Hương gỗ trầm thanh khiết, thảo mộc ngào ngạt, mùi sương mai ngọt ngào
    tactile: string; // Gió xuân ấm áp mơn man, sinh khí dạt dào làm lành vết thương
  };
  mortalAndSurvivorMiracle: string; // Kỳ tích với phàm nhân: thương tật lành lặn, cây khô đâm chồi, tiếng cười vui mừng rơi nước mắt
  masterRevivalProseExcerpt: string; // Trích đoạn văn phong tác gia miêu tả cảnh hồi sinh tuyệt mỹ, chấn động đất trời
  readyToInsertRevivalSnippet: string; // Đoạn văn ngắn súc tích sẵn sàng chèn ngay vào bản thảo
}

export interface DisasterRuinsScene {
  id: string;
  title: string;
  alias: string;
  category: DisasterRuinsCategory;
  categoryLabel: string;
  categoryBadgeBg: string;
  categoryBadgeBorder: string;
  categoryBadgeText: string;
  categoryIcon: string;
  locationName: string;
  realmOrRegion: string;
  timeAndAtmosphere: {
    timeOfDay: string;
    weatherAndSky: string;
    lightingAndVisibility: string;
    residualEnergyOrAura: string;
  };
  sceneryDescription: string;
  destructiveScale: {
    rubbleAndRuins: string;
    fallenLandmarks: string;
    weaponsOrDebris: string;
  };
  humanAndMortalTragedy: {
    survivorsPlight: string;
    silhouettesAndEchoes: string;
    poignantDetail: string;
  };
  sensoryDetails: {
    visual: string;
    auditory: string;
    olfactory: string;
    tactile: string;
    emotionalAtmosphere: string;
  };
  authorPlotHooks: string[];
  masterProseExcerpt: string;
  readyToInsertProseSnippet: string;
  longevitySeedRevival?: LongevitySeedRevival;
}

export const PRESET_DISASTER_RUINS_SCENES: DisasterRuinsScene[] = [
  // =========================================================================
  // 1. CẢNH HOANG TÀN SAU CUỘC CHIẾN (CHIẾN TRƯỜNG, ĐOẠN HỒN, KHÍ HUYẾT TÀN)
  // =========================================================================
  {
    id: 'drs_war_01_doan_hon_nhai',
    title: 'Đoạn Hồn Cổ Nhai • Khói Lạnh Tro Tàn Sau Trận Huyết Chiến Vạn Người',
    alias: 'Chiến Địa Vạn Cốt Khô & Binh Khí Rỉ Máu',
    category: 'HOANG_TAN_CHIEN_TRUONG',
    categoryLabel: 'Hoang Tàn Sau Cuộc Chiến',
    categoryBadgeBg: 'bg-red-950/80',
    categoryBadgeBorder: 'border-red-500/50',
    categoryBadgeText: 'text-red-300',
    categoryIcon: '⚔️',
    locationName: 'Đoạn Hồn Cổ Nhai',
    realmOrRegion: 'Biên giới Tây Hoang • Cổ Chiến Trường Vạn Năm',
    timeAndAtmosphere: {
      timeOfDay: 'Hoàng hôn tà dương đỏ quạch như máu đọng, nhá nhem tối',
      weatherAndSky: 'Mây xám nặng trĩu sà sát đỉnh núi, gió bấc gào rít từng cơn lạnh thấu xương',
      lightingAndVisibility: 'Ánh tà dương le lói phản chiếu trên vũng máu đông và lưỡi đao mẻ, khói đen lượn lờ cản trở tầm nhìn',
      residualEnergyOrAura: 'Kiếm khí tàn dư cắt nát không khí tạo thành những tiếng rít u u, sát khí đặc quánh làm nghẹt thở'
    },
    sceneryDescription:
      'Trải dài suốt mười dặm hẻm núi Đoạn Hồn Nhai chỉ còn trơ trọi một màu đen của đất cháy và màu xám của tro tàn. Hàng ngàn thanh gươm giáo gãy vụn cắm nghiêng ngả trên sườn đá lởm chởm, rỉ sét nhuộm đỏ từng phiến đá tai mèo. Xác chiến xa lật nghiêng bốc khói âm ỉ, những lá cờ rách tả tơi dính máu bay phần phật trong gió lạnh như những cánh tay ma quái quẫy đạp trong tuyệt vọng. Đàn quạ đen hàng trăm con lượn vòng trên nền trời xám xịt, chốc chốc lại sà xuống mổ vào những tấm khiên vỡ, tiếng kêu thảm thiết xé toạc màn đêm tịch mịch.',
    destructiveScale: {
      rubbleAndRuins: 'Vách núi hai bên bị thần thông chém đứt từng mảng lớn, đá tảng ngổn ngang lấp kín lối mòn độc đạo',
      fallenLandmarks: 'Bia đá cổ ngàn năm khắc chữ "Trấn Ma Quan" bị một đao chém vỡ làm ba mảnh, ngập trong bùn máu',
      weaponsOrDebris: 'Vạn thanh binh khí gãy vụn, mũi tên cắm dày đặc như lông nhím trên các thân cây khô cháy sém'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Vài binh sĩ thương tật cụt tay lết đi tìm đồng đội giữa đống xác tử sĩ, tiếng rên rỉ yếu ớt chìm nghỉm trong tiếng gió hú',
      silhouettesAndEchoes: 'Bóng dáng một lão tướng già cụt chân ngồi tựa lưng vào bánh xe gãy, tay ôm chặt ngọn giáo gãy mắt nhắm nghiền như đã hóa đá',
      poignantDetail: 'Một chiếc giày cỏ trẻ con dính máu rơi vãi bên mép vực, cạnh một chiếc túi lương khô chưa kịp mở'
    },
    sensoryDetails: {
      visual: 'Sắc đỏ thẫm của máu khô hòa lẫn sắc đen tro tàn; bóng quạ đen chao liệng giữa hoàng hôn lạnh lẽo',
      auditory: 'Tiếng cờ rách phần phật trong gió bấc; tiếng quạ kêu bi thảm; tiếng kim loại rỉ sét va đập tanh tách',
      olfactory: 'Mùi tanh nồng của huyết nhục cháy sém quyện với mùi lưu huỳnh và khói khét của lôi hỏa đạn',
      tactile: 'Không khí lạnh buốt da gà nhưng mặt đất dưới chân vẫn âm ỉ tỏa ra hơi nóng bỏng rát của lửa tàn',
      emotionalAtmosphere: 'Bi tráng, thê lương, hoang hoải đến tận cùng tâm can, cảm giác về sự vô thường của kiếp người giữa vòng xoáy chiến tranh'
    },
    authorPlotHooks: [
      'Nhân vật chính bước vào chiến trường sau khi trận chiến đã kết thúc, nhặt được di vật của cố nhân.',
      'Đạo tâm nhân vật rung động dữ dội khi chứng kiến cái giá đẫm máu của cuộc tranh giành quyền lực giữa các tông môn.',
      'Phát hiện một tu sĩ hấp hối nắm giữ bí mật cơ mật hoặc ngọc giản truyền thừa trước lúc lâm chung.'
    ],
    masterProseExcerpt:
      'Gió hoàng hôn quét qua Đoạn Hồn Nhai mang theo hơi lạnh buốt giá và mùi tanh nồng xộc thẳng vào sống mũi. Mười dặm hẻm núi giờ đây phẳng lặng như một nấm mồ tập thể khổng lồ. Mặt đất bị thần thông nung chảy rồi đông kết lại thành lớp xỉ than đen đúa lởm chởm, nơi hàng vạn mũi tên và giáo gãy cắm chi chít như bãi chông sau cơn bão lửa. Tấm đại kỳ của Huyền Thiên Tông rách nát chỉ còn trơ lại nửa chữ "Thiên", run rẩy bay phần phật trên xác một cỗ chiến xa đã vỡ vụn. Không còn tiếng gươm đao va chạm, không còn tiếng gầm thét kinh thiên động địa của các bậc đại năng, chốn này chỉ còn lại tiếng quạ đen rền rĩ trên vách đá và tiếng thở dốc đứt quãng của những kẻ tàn phế đang lết đi trong vô vọng. Bước chân người đạp lên đống tro than nghe lạo xạo rợn người, như thể mỗi tấc đất dưới chân đều đang run rẩy thở ra những oán niệm ngàn năm chưa kịp tan biến.',
    readyToInsertProseSnippet:
      'Khói độc và tro than vẫn lượn lờ bốc lên từ lòng hẻm Đoạn Hồn Nhai, nhuộm hoàng hôn thành một vệt máu bầm rợn ngợp. Khắp nơi là binh khí gãy nát cắm ngập trên đất cháy, vạt cờ rách phần phật trong cơn gió bấc lạnh buốt xương tủy. Tiếng quạ kêu từng hồi thê lương át cả tiếng rên rỉ yếu ớt của những kẻ sống sót giữa đống thi hài ngổn ngang.'
  },
  {
    id: 'drs_war_02_binh_nguyen_than_ma',
    title: 'Bình Nguyên Thần Ma • Vực Nứt Ngàn Trượng Sau Cuộc Tương Tàn Thập Đại Tông Môn',
    alias: 'Hố Sâu Kiếm Khí & Dòng Sông Máu Chảy Ngược',
    category: 'HOANG_TAN_CHIEN_TRUONG',
    categoryLabel: 'Hoang Tàn Sau Cuộc Chiến',
    categoryBadgeBg: 'bg-red-950/80',
    categoryBadgeBorder: 'border-red-500/50',
    categoryBadgeText: 'text-red-300',
    categoryIcon: '⚔️',
    locationName: 'Bình Nguyên Thần Ma',
    realmOrRegion: 'Trung Châu • Ranh giới Thần Châu & Ma Giới',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm tối mù mịt không trăng sao, gió lốc cuộn cát đá rào rào',
      weatherAndSky: 'Bầu trời bị xé rách thành những vệt nứt không gian lấp loáng tia sét tím ma quái',
      lightingAndVisibility: 'Chỉ có ánh sáng lân tinh xanh biếc của linh hồn phiêu bạt và tàn lửa le lói',
      residualEnergyOrAura: 'Linh lực ngũ hành bị đảo lộn hoàn toàn, sấm sét và lửa ma chập chờn bốc lên từ mặt đất'
    },
    sceneryDescription:
      'Cả một bình nguyên phì nhiêu rộng trăm dặm nay biến thành một bình địa loang lổ những hố sâu hun hút do chưởng ấn và kiếm mang khổng lồ khoét sâu xuống lòng đất. Dòng sông Thanh Hà thơ mộng ngày nào giờ đã bị chặn đứng, nước sông hòa lẫn máu đặc sệt biến thành dòng bùn đỏ quạch tanh hôi cuồn cuộn chảy qua những bãi xác ngựa chiến và yêu thú khổng lồ ngã gục. Những bộ giáp trụ bằng huyền thiết nát vụn như vỏ trứng, tàn tích trận pháp phòng ngự rạn nứt phát ra tiếng kêu răng rắc trong đêm tịch mịch.',
    destructiveScale: {
      rubbleAndRuins: 'Vực thẳm sâu ba trăm trượng chia đôi bình nguyên thành hai nửa do một kiếm khai thiên chém ra',
      fallenLandmarks: 'Đài phong ấn cổ kính bằng bạch ngọc ngàn năm vỡ tan thành tro bụi trắng xóa phủ kín mặt đất',
      weaponsOrDebris: 'Xác thú cưỡi khổng lồ to như ngọn đồi nằm la liệt, xương trắng lộ ra dưới bầu trời đêm u tối'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những đệ tử trẻ tuổi run rẩy tụm lại bên ngọn lửa tàn, ánh mắt đờ đẫn mất đi linh hồn sau khi chứng kiến sư tôn tự bạo',
      silhouettesAndEchoes: 'Bóng ma linh hồn lang thang trên bãi chiến trường, thì thào gọi tên môn phái đã bị xóa sổ',
      poignantDetail: 'Một mảnh ngọc bội khắc hình đôi chim uyên ương vỡ đôi nằm vùi trong bùn nhão dính máu khô'
    },
    sensoryDetails: {
      visual: 'Những hố đen sâu hoắm bốc khói tím; xác thú cưỡi khổng lồ đổ rạp như những rặng núi con',
      auditory: 'Tiếng gió rít qua các kẽ nứt không gian nghe như tiếng ma khóc; tiếng nước sông máu ùng ục chảy',
      olfactory: 'Mùi khét lẹt của da lông thú cháy quyện với mùi tanh tưởi của đầm lầy máu',
      tactile: 'Cát đá sắc nhọn cứa vào da thịt; không khí nén lại nặng nề như có bàn tay vô hình bóp nghẹt lồng ngực',
      emotionalAtmosphere: 'Sợ hãi tột cùng, trống rỗng và kinh hoàng trước sức tàn phá hủy diệt của tu vi thượng tầng'
    },
    authorPlotHooks: [
      'Thu hồi tàn khí của một tông môn cổ đã tuyệt diệt giữa bãi chiến trường.',
      'Đối mặt với oán linh và ma thú biến dị sinh ra từ sát khí chiến trường.',
      'Nhân vật chính cảm ngộ được quy tắc Hủy Diệt và Tái Sinh từ đống tro tàn.'
    ],
    masterProseExcerpt:
      'Bình nguyên Thần Ma trong đêm tối tựa như một mảnh vỡ hoang phế của cõi u minh rơi xuống nhân gian. Một rãnh nứt sâu hun hút kéo dài từ chân trời này sang chân trời khác, mép vực cháy đen nham nhở bởi kiếm khí thuần dương còn sót lại. Dưới đáy rãnh, dòng sông máu đỏ sẫm đặc quánh chảy lững lờ, phản chiếu những tia chớp tím ma quái chốc chốc lại rạch ngang vòm trời vỡ vụn. Giáp trụ nát bươm, phi kiếm gãy đôi, thi thể của những con ma ưng khổng lồ sải cánh ba mươi trượng gục chết bên xác chiến xa đổ nát... Tất cả đều bất động dưới làn gió độc mang theo vị tanh nồng nhức óc. Không ai có thể nhận ra nơi đây từng là cánh đồng cỏ xanh mướt ngút ngàn, bởi dưới sức mạnh nghiền nát của cuộc đại chiến, ngay cả sinh linh nhỏ bé nhất như ngọn cỏ cọng rêu cũng đã bị thiêu đốt thành tro bụi hư vô.',
    readyToInsertProseSnippet:
      'Mặt đất nứt toác thành những vực sâu ngàn trượng bốc khói tím ma quái, dòng sông cuộn trào sắc máu đỏ thẫm lững lờ trôi qua xác yêu thú chất cao như đồi. Giữa màn đêm u uất, kiếm khí tàn dư vẫn rít lên từng hồi xé rách không gian, để lại một chốn hoang tàn rợn ngợp không một bóng cây ngọn cỏ sống sót.'
  },

  // =========================================================================
  // 2. CẢNH LÀNG MẠC THIÊN TAI - HẠN HÁN KHỐC LIỆT
  // =========================================================================
  {
    id: 'drs_drought_01_hoang_thon_dat_nut',
    title: 'Bạch Thạch Làng Quê • Đại Hạn Hán Nghìn Ngày Đất Nứt Chân Chim',
    alias: 'Giếng Cạn Trơ Đáy Bùn & Cánh Đồng Tro Trấu',
    category: 'LANG_MAC_HAN_HAN',
    categoryLabel: 'Làng Mạc Thiên Tai - Hạn Hán',
    categoryBadgeBg: 'bg-amber-950/80',
    categoryBadgeBorder: 'border-amber-500/50',
    categoryBadgeText: 'text-amber-300',
    categoryIcon: '☀️',
    locationName: 'Bạch Thạch Thôn',
    realmOrRegion: 'Đông Vực Cận Hải • Châu Thổ Sông Hoàng Long',
    timeAndAtmosphere: {
      timeOfDay: 'Chính ngọ, mặt trời như khối cầu lửa nung đỏ giữa đỉnh đầu không một bóng mây',
      weatherAndSky: 'Bầu trời trắng bệch chói lóa, không khí khô khốc bốc lên từng đợt sóng nhiệt làm méo mó cảnh vật',
      lightingAndVisibility: 'Ánh nắng gay gắt chói chang đến nhức mắt, không có lấy một góc râm mát',
      residualEnergyOrAura: 'Hỏa độc thiên địa tích tụ ngàn ngày, linh khí thủy hệ hoàn toàn cạn kiệt biến mất'
    },
    sceneryDescription:
      'Mặt đất làng Bạch Thạch nứt toác thành từng ô vuông nham nhở như mai rùa, những kẽ nứt sâu tới vài trượng nuốt chửng cả những gốc rạ khô khốc. Cây đa cổ thụ đầu làng từng rợp bóng mát năm trăm năm nay trơ trọi những cành khẳng khiu xám xịt như những bàn tay khô héo đang giơ lên trời van xin một giọt sương mai. Giếng làng sâu mười trượng chỉ còn trơ lại lớp bùn đáy nứt nẻ đóng vảy trắng bệch, chiếc gàu gỗ rơi vỡ nát dưới đáy khô. Những mái nhà tranh xiêu vẹo vì gió nóng thổi bạt, vách đất nứt toác từng mảng để lộ ra bộ khung sườn tre ọp ẹp.',
    destructiveScale: {
      rubbleAndRuins: 'Những bức tường đất nện của các căn nhà bỏ hoang nứt vỡ sụp đổ từng mảng xuống lòng đường ngập bụi',
      fallenLandmarks: 'Miếu Thổ Địa đầu thôn mái ngói vỡ vụn, tượng thần trơ mắt nhìn cánh đồng khô cằn trơ trọi',
      weaponsOrDebris: 'Những chiếc cày, bừa gỗ vứt chỏng chơ bên bờ ruộng nứt nẻ, mục nát dưới ánh nắng chang chang'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những người già và trẻ nhỏ gầy trơ xương quấn giẻ rách ngồi thẫn thờ dưới hiên nhà, môi nứt nẻ bật máu tươi vì khát',
      silhouettesAndEchoes: 'Bóng dáng một phụ nữ bế đứa con đỏ hỏn đi gõ cửa từng nhà xin từng giọt nước cặn trong vô vọng',
      poignantDetail: 'Đám trẻ con dùng ngón tay bới đất tìm những cọng cỏ héo úa nhét vào miệng nhai lấy vị chát ngắt'
    },
    sensoryDetails: {
      visual: 'Màu vàng cháy của đất nứt, màu trắng bệch của bầu trời không mây; làn không khí gợn sóng vì nhiệt độ quá cao',
      auditory: 'Tiếng ve kêu râm ran đinh tai nhức óc; tiếng đất nứt răng rắc dưới chân; tiếng thở dài bất lực của người già',
      olfactory: 'Mùi đất khét nồng nặc; mùi cỏ rạ cháy nắng; mùi ngột ngạt không một hơi gió mát',
      tactile: 'Cát bụi bỏng rát phả vào mặt; cổ họng khô rát như có than hồng thiêu đốt',
      emotionalAtmosphere: 'Tuyệt vọng, khô kiệt, bất lực trước sự tàn nhẫn vô tình của đất trời tự nhiên'
    },
    authorPlotHooks: [
      'Nhân vật chính đi ngang qua ngôi làng, động lòng trắc ẩn thi triển thần thông Hô Phong Hoán Vũ cứu hạn cho bách tính.',
      'Phát hiện nguyên nhân hạn hán không phải do thiên tai mà do yêu thú Hỏa hệ hoặc tà tu tế luyện ma bảo hút cạn linh tuyền.',
      'Gặp gỡ một đứa trẻ mang thiên tư dị bẩm sống sót kiên cường qua nạn hạn hán, thu nhận làm đệ tử.'
    ],
    masterProseExcerpt:
      'Không khí giữa trưa tại thôn Bạch Thạch đặc quánh lại như thể đang bị nung trong một chiếc lò luyện đan khổng lồ. Mặt trời treo lơ lửng trên đỉnh đầu như một con mắt rực lửa trừng trừng nhìn xuống trần gian vô tình. Dưới chân người, mặt đất đồng ruộng nứt toác thành từng rãnh sâu hoắm, đất sét khô quắt lại giòn rụm đến mức chỉ cần dẫm nhẹ cũng vỡ vụn thành lớp bụi vàng mù mịt. Cây đa cổ thụ từng che mát cho mười thế hệ dân làng nay trơ trọi không còn một chiếc lá xanh, những cành cây khẳng khiu vươn lên nền trời trắng bệch như tiếng kêu cứu câm lặng. Chiếc giếng đá ở ngã ba đường trơ đáy từ ba tháng trước, đáy giếng chỉ còn lại lớp vảy bùn nứt nẻ và vài mảnh sành vỡ. Dưới hiên một mái tranh rách nát, một bà lão lưng còng ôm lấy đứa cháu nhỏ da bọc xương, hai bàn tay khô héo như cành củi nhẹ nhàng xoa lên đôi môi nứt nẻ bật máu của đứa bé. Tiếng gió nóng thổi qua những kẽ vách đất nghe khô khốc và thê lương, cuốn theo nỗi tuyệt vọng không lời của những sinh linh đang chết dần chết mòn trong cơn khát nghìn ngày.',
    readyToInsertProseSnippet:
      'Mặt đất đồng ruộng nứt toác từng rãnh sâu như chân chim, cây cỏ héo rũ cháy sém dưới cái nắng thiêu đốt của trưa hè không một gợn mây. Chiếc giếng làng cạn khô trơ đáy bùn trắng bệch, mái tranh xiêu vẹo ngột ngạt trong làn gió nóng cuốn bụi vàng rát buốt, người dân gầy trơ xương thẫn thờ nhìn trời tìm kiếm một bóng mây cứu rỗi.'
  },
  {
    id: 'drs_drought_02_kho_hanh_ha_luu',
    title: 'Hạ Lưu Dòng Sông Chết • Lòng Sông Trơ Sỏi Trắng & Đàn Gia Súc Gục Ngã',
    alias: 'Sông Cạn Trơ Xương Cá & Cát Nóng Cháy Lưng',
    category: 'LANG_MAC_HAN_HAN',
    categoryLabel: 'Làng Mạc Thiên Tai - Hạn Hán',
    categoryBadgeBg: 'bg-amber-950/80',
    categoryBadgeBorder: 'border-amber-500/50',
    categoryBadgeText: 'text-amber-300',
    categoryIcon: '☀️',
    locationName: 'Lưu Thủy Khê Cổ Độ',
    realmOrRegion: 'Nam Hoang • Vùng đệm Tiên Triều Đại Ngu',
    timeAndAtmosphere: {
      timeOfDay: 'Chiều tà xế bóng, nắng quái đỏ au rọi xuống bãi sỏi trắng xóa',
      weatherAndSky: 'Trời hanh khô không một giọt sương, gió lốc nhỏ cuốn cát bụi bay mù mịt',
      lightingAndVisibility: 'Ánh tà dương vàng vọt kéo dài những cái bóng đổ dài cô độc trên lòng sông cạn',
      residualEnergyOrAura: 'Đất đai mất đi toàn bộ sinh khí, cỏ dại ven bờ chết khô chuyển sang màu tro xám'
    },
    sceneryDescription:
      'Con sông lớn từng chảy cuồn cuộn qua ba mươi dặm đồng bằng nay biến thành một dải sỏi trắng bỏng rát trải dài vô tận. Lòng sông nứt nẻ trơ trọi những bộ xương cá trắng hếu và xác những chiếc thuyền nan úp sấp nứt toác dưới nắng trời. Hai bên bờ sông, từng đàn gia súc trâu bò chết khô nằm rải rác bên những vũng bùn đen ngòm cặn bã cuối cùng. Người dân từ các xóm chài kéo nhau bồng bế dắt díu bỏ làng mà đi, dấu chân lê dài trên cát nóng tạo thành những vệt rãnh thê lương.',
    destructiveScale: {
      rubbleAndRuins: 'Bến đò cổ kính trơ trọi cọc gỗ mục nát, cầu tre bắc ngang lòng sông gãy gục cắm xuống cát',
      fallenLandmarks: 'Trạm thủy đình từng là nơi dừng chân của tàu thuyền nay biến thành chòi canh rách nát phủ đầy bụi cát',
      weaponsOrDebris: 'Những chiếc lưới đánh cá khô giòn rách nát vướng víu trên các mô đá nhô lên giữa lòng sông'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Từng đoàn người đói khát lê từng bước chân nặng nề rời bỏ quê hương, ánh mắt đục ngầu vô định',
      silhouettesAndEchoes: 'Một lão nông quỳ bên xác con trâu già gắn bó suốt hai mươi năm, hai tay ôm mặt khóc không ra tiếng',
      poignantDetail: 'Một bát gốm mẻ đựng vài giọt nước đục ngầu được người mẹ cẩn thận giấu trong vạt áo che chở cho con nhỏ'
    },
    sensoryDetails: {
      visual: 'Dải sỏi đá trắng lóa chói mắt; xác thuyền bè mục nát úp sấp như mai rùa chết khô',
      auditory: 'Tiếng bước chân lê lết trên sỏi sạn lạo xạo; tiếng gió thổi vi vu qua xác thuyền rỗng',
      olfactory: 'Mùi tanh hôi của bùn chết và xác súc vật phân hủy dưới nắng gắt',
      tactile: 'Sỏi đá dưới chân nóng rực như than hồng, xuyên qua lớp đế giày rách',
      emotionalAtmosphere: 'Ly tán, mất mát, xót xa trước cảnh tượng quê hương biến thành đất chết hoang tàn'
    },
    authorPlotHooks: [
      'Nhân vật chính phát hiện dòng sông bị phong ấn ở thượng nguồn bởi một con ác giao đang độ kiếp.',
      'Cứu giúp đoàn người tị nạn khỏi đám thổ phỉ và thú dữ thừa cơ cướp bóc.',
      'Đào sâu xuống lòng sông tìm thấy mạch nước ngầm cổ xưa chứa đựng cơ duyên linh tuyền viễn cổ.'
    ],
    masterProseExcerpt:
      'Dòng sông Lưu Thủy từng một thời là bầu sữa ngọt ngào nuôi sống hàng vạn cư dân ven bờ, giờ đây chỉ còn là một vệt sẹo dài trắng lóa cắt ngang mặt đất khô cằn. Nước đã rút cạn từ lâu, để lại lòng sông trơ trọi những tầng sỏi đá bị nắng nung nóng đến bỏng rát. Xác những con thuyền gỗ nằm nghiêng ngả, thân thuyền nứt toác từng kẽ dài như những bộ xương khô của loài thủy quái bị phơi xác giữa sa mạc. Dưới đáy một vũng nước tù đọng đen ngòm nhỏ bằng cái nong, hàng trăm con cá chết phơi bụng trắng xóa bốc lên mùi tanh nồng ngột ngạt. Từng đoàn người dân làng lam lũ, quần áo rách rưới, lưng gùi tài sản mọn mằn đang lê bước đi dọc theo mép bờ sông cạn. Dấu chân họ in sâu trên cát nóng rồi nhanh chóng bị những cơn gió lốc cuốn cát xóa nhòa, tựa như số phận mỏng manh của họ trôi dạt giữa cõi hồng trần vô định.',
    readyToInsertProseSnippet:
      'Con sông lớn ngày nào giờ chỉ còn là dải sỏi trắng bỏng rát trơ trọi xác thuyền mục nát và bùn đen cạn đáy. Từng đàn gia súc gục chết bên bờ đất nứt nẻ, dòng người tị nạn bồng bế nhau lê bước trong buổi hoàng hôn vàng vọt, bỏ lại sau lưng ngôi làng chài hoang tàn không còn một giọt nước.'
  },

  // =========================================================================
  // 3. CẢNH LÀNG MẠC THIÊN TAI - NGẬP LỤT HỒNG THỦY & LŨ QUÉT
  // =========================================================================
  {
    id: 'drs_flood_01_hong_thuy_cuon_troi',
    title: 'Thanh Khê Làng Quê • Đêm Lũ Quét Hồng Thủy Đỏ Ngầu Trút Xuống',
    alias: 'Sóng Lũ Cuốn Mái Tranh & Tiếng Gào Khóc Xé Trời',
    category: 'LANG_MAC_NGAP_LUT',
    categoryLabel: 'Làng Mạc Thiên Tai - Ngập Lụt Hồng Thủy',
    categoryBadgeBg: 'bg-blue-950/80',
    categoryBadgeBorder: 'border-blue-500/50',
    categoryBadgeText: 'text-blue-300',
    categoryIcon: '🌊',
    locationName: 'Thanh Khê Thôn',
    realmOrRegion: 'Bắc Hoang Sơn Cước • Thung Lũng Cửu Long Khê',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm khuya canh ba, sấm sét xé toạc bầu trời đen kịt mù mịt',
      weatherAndSky: 'Mưa như trút nước trắng xóa cả đất trời, cuồng phong gầm rú quật gãy cây cối',
      lightingAndVisibility: 'Ánh chớp lòa sáng rực trong khoảnh khắc soi rõ dòng nước lũ đục ngầu cuộn sóng dữ',
      residualEnergyOrAura: 'Thủy khí cuồng bạo tràn ngập đất trời, áp lực từ thiên tai đè nặng không gian'
    },
    sceneryDescription:
      'Dòng nước lũ từ thượng nguồn dãy núi ầm ầm đổ sập xuống thung lũng như một đàn thủy quái hung tợn xổng chuồng. Nước đỏ ngầu phù sa và bùn đất cuộn sóng cao hơn một trượng, cuốn phăng toàn bộ hàng rào, chuồng trại và những nếp nhà tranh vách đất ven suối. Mái nhà lá, chum vại, cối xay và thân cây bật gốc trôi dập dềnh xoay tít giữa dòng nước xiết. Khắp nơi vang lên tiếng nước gầm réo ghê rợn hòa cùng tiếng sấm sét đùng đoàng xé tai, nhấn chìm toàn bộ ngôi làng trù phú trong một biển nước mênh mông cuồng nộ.',
    destructiveScale: {
      rubbleAndRuins: 'Hơn nửa số nhà trong thôn bị nước lũ xô đổ hoàn toàn, chỉ còn trơ lại nền đất bùn lầy thụt lún',
      fallenLandmarks: 'Chiếc cầu đá kiên cố trăm năm bắc qua suối bị lũ cuốn sập mố cầu, đá tảng lăn lông lốc theo dòng nước',
      weaponsOrDebris: 'Cây cối bật gốc trôi dạt ngổn ngang, bùn non phủ dày nửa thước sau khi nước quét qua'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Dân làng chen chúc co cụm trên ngọn đồi đất cao nhất thôn, dầm mình trong mưa lạnh run bần bật',
      silhouettesAndEchoes: 'Tiếng thét xé lòng của người mẹ khi thấy bàn tay đứa con tuột khỏi tay mình bị dòng nước xoáy cuốn đi',
      poignantDetail: 'Một con chó nhà trung thành bơi theo chiếc nôi em bé trôi dập dềnh giữa dòng nước xiết mù mịt'
    },
    sensoryDetails: {
      visual: 'Biển nước màu nâu đỏ cuộn sóng ngập ngụa; ánh chớp trắng lóe lên từng đợt soi rọi cảnh hoang tàn',
      auditory: 'Tiếng nước lũ gầm thét như tiếng rồng gầm; tiếng sấm nổ vang trời; tiếng gào khóc gọi người thân tuyệt vọng',
      olfactory: 'Mùi tanh tưởi nồng nặc của bùn non, cỏ cây thối rữa và nước mưa buốt giá',
      tactile: 'Mưa quất rát mặt như roi da; nước lũ lạnh buốt cắt da cắt thịt dâng lên từng tấc',
      emotionalAtmosphere: 'Kinh hoàng, hoảng loạn, mong manh tột cùng của sinh mạng con người trước cơn thịnh nộ của tự nhiên'
    },
    authorPlotHooks: [
      'Nhân vật chính kịp thời xuất hiện, dùng pháp bảo hoặc kiếm khí chém đôi dòng lũ cứu nguy cho trăm sinh mạng.',
      'Phát hiện trận lũ quét do giao long phá đê hoặc đại năng tà đạo dẫn nước dìm chết thường dân để luyện huyết đan.',
      'Cứu sống những người trôi dạt trên sông và nhận được sự tôn sùng, đền đáp bằng một tấm bản đồ cổ bí mật.'
    ],
    masterProseExcerpt:
      'Đêm đen như mực bỗng bị xé toạc bởi một tiếng nổ long trời lở đất từ thượng nguồn rặng núi cao. Không một lời cảnh báo, dòng hồng thủy đỏ ngầu bùn đất tựa như ngàn vạn con mãnh thú hung tợn ập xuống thung lũng Thanh Khê. Nước lũ cuộn thành những con sóng cao cả trượng, gầm réo điên cuồng ủi phăng chiếc cầu đá trăm năm chỉ trong một cái chớp mắt. Những nếp nhà tranh ven suối vỡ vụn như những chiếc hộp giấy mỏng manh, mái rạ, cột gỗ và chum vại bị cuốn phăng xoay tròn giữa dòng nước xoáy cuồn cuộn. Ánh chớp trắng lóa rạch ngang vòm trời mưa xối xả, soi rõ những bóng người ướt sũng đang ôm chặt lấy ngọn cây cao gào khóc trong tuyệt vọng. Tiếng nước gầm gào át cả tiếng kêu cứu xé lòng, nhấn chìm toàn bộ ngôi làng bình yên dưới đáy biển bùn lạnh lẽo chỉ trong gang tấc.',
    readyToInsertProseSnippet:
      'Dòng nước lũ đỏ ngầu từ thượng nguồn ầm ầm trút xuống như thác đổ, cuốn phăng mái tranh, cây cối và cầu đá vào dòng nước xoáy hung hãn. Dưới cơn mưa như trút nước và ánh chớp rạch ngang trời đêm, cả ngôi làng chìm trong biển nước đục ngầu, vang vọng tiếng gào khóc thảm thiết của những người dân trèo lên ngọn cây tìm đường sống.'
  },
  {
    id: 'drs_flood_02_dong_bang_ngap_lut',
    title: 'Hồ Lạc Thủy Ngoại Vi • Cánh Đồng Trù Phú Biến Thành Đầm Lầy Chìm Trong Biển Nước',
    alias: 'Mái Đình Nhô Khỏi Mặt Nước & Đoàn Bè Cứu Nạn',
    category: 'LANG_MAC_NGAP_LUT',
    categoryLabel: 'Làng Mạc Thiên Tai - Ngập Lụt Hồng Thủy',
    categoryBadgeBg: 'bg-blue-950/80',
    categoryBadgeBorder: 'border-blue-500/50',
    categoryBadgeText: 'text-blue-300',
    categoryIcon: '🌊',
    locationName: 'Lạc Thủy Bình Nguyên',
    realmOrRegion: 'Đông Vực • Châu Thổ Sông Thương Long',
    timeAndAtmosphere: {
      timeOfDay: 'Rạng sáng âm u mịt mù sương nước, bầu trời xám xịt không thấy ánh mặt trời',
      weatherAndSky: 'Mưa phùn rả rích kéo dài không ngớt, gió lạnh căm căm thổi gợn sóng đục',
      lightingAndVisibility: 'Ánh sáng mờ nhạt lạnh lẽo, tầm nhìn bị sương mù và hơi nước che khuất chỉ còn vài chục thước',
      residualEnergyOrAura: 'Âm hàn thủy khí ngưng kết dày đặc, sinh khí mục ruỗng bốc lên từ đồng ruộng ngập úng'
    },
    sceneryDescription:
      'Cả một vùng đồng bằng trù phú từng ngập tràn sắc vàng của lúa chín nay biến thành một biển nước đục ngầu mênh mông không thấy bờ bến. Chỉ còn những ngọn cây cổ thụ và chóp mái đình làng nhô lên khỏi mặt nước như những hòn đảo cô độc giữa đại dương bùn đất. Những chiếc bè nứa chắp vá tạm bợ chở người già, trẻ nhỏ và vài con gà vịt dập dềnh trôi trong mưa lạnh. Xác lúa mì, rơm rạ mục nát nổi lềnh bềnh trên mặt nước bốc mùi chua nồng, cảnh tượng hoang tàn và ảm đạm bao trùm khắp ngàn dặm giang sơn.',
    destructiveScale: {
      rubbleAndRuins: 'Hàng ngàn mẫu ruộng lúa bị ngập sâu dưới nước hai trượng, toàn bộ vụ mùa mất trắng',
      fallenLandmarks: 'Đình làng cổ kính chạm rồng mạ bạc chỉ còn trơ nóc mái cong rêu phong nhô lên mặt nước',
      weaponsOrDebris: 'Những chiếc cối xay đá, hàng rào tre mục nát trôi dạt tấp vào các gò đất cao'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những gia đình đói lả ngồi túm tụm trên bè nứa, chia nhau từng mẩu bánh khô ẩm ướt mốc meo',
      silhouettesAndEchoes: 'Bóng dáng một ông lão chèo chiếc thuyền nan đi tìm lại ngôi mộ của tổ tiên đã chìm sâu dưới lòng nước',
      poignantDetail: 'Một manh chiếu rách bọc thi thể một hài nhi chết vì lạnh được thả trôi lững lờ theo dòng nước buốt'
    },
    sensoryDetails: {
      visual: 'Mặt nước phẳng lặng đục ngầu bao la bát ngát; những mái nhà nhô lên trơ trọi như nấm mồ nổi',
      auditory: 'Tiếng mưa rơi rả rích trên mặt nước lộp độp; tiếng mái chèo khua nước nặng nhọc; tiếng ho hen của người già',
      olfactory: 'Mùi rơm rạ thối rữa ngâm nước lâu ngày; mùi tanh nồng của bùn lầy và rong rêu mục',
      tactile: 'Cảm giác ẩm ướt buốt giá ngấm vào từng thớ thịt; quần áo dính chặt vào người lạnh ngắt',
      emotionalAtmosphere: 'Ảm đạm, bi thương, dai dẳng và xót xa trước kiếp nạn đói nghèo sau lũ'
    },
    authorPlotHooks: [
      'Dịch bệnh bùng phát sau lũ lụt, nhân vật chính luyện chế đan dược quy mô lớn cứu độ trăm họ lập công đức.',
      'Tu sĩ tà phái lợi dụng lúc dân tình hoảng loạn để thu gom oan hồn luyện chế Vạn Hồn Phiên.',
      'Dưới đáy vùng đất ngập lụt vô tình để lộ cửa vào một tòa thủy cung thượng cổ bị phong ấn.'
    ],
    masterProseExcerpt:
      'Mưa rả rích suốt bảy ngày đêm đã biến toàn bộ châu thổ Lạc Thủy thành một biển nước hoang vu không bờ bến. Đứng từ trên gò đất cao nhìn xuống, cảnh tượng trước mắt khiến người ta phải se sắt lòng: những đồng lúa bát ngát ngày nào giờ đây chìm sâu dưới hai trượng nước đục ngầu, chỉ còn lại những ngọn tre uốn cong và chóp mái ngói rêu phong của ngôi đình làng nhô lên thoi thóp. Mặt nước mênh mang trôi dạt rơm rạ mục nát và những mảnh ván thuyền vỡ. Giữa màn sương mù xám xịt buốt giá, vài chiếc bè nứa kết vội chở những người đàn bà quấn khăn rách ôm con nhỏ đang lững lờ trôi dạt tìm nơi trú ẩn. Không có tiếng gào thét hoảng loạn như đêm lũ quét, nơi đây chỉ còn lại sự im lìm tê tái của nỗi tuyệt vọng kéo dài, khi miếng cơm manh áo của cả một năm ròng đã vĩnh viễn tan biến dưới lòng nước lạnh lùng.',
    readyToInsertProseSnippet:
      'Đồng ruộng bao la chìm sâu dưới biển nước đục ngầu mênh mông, chỉ còn chóp mái đình làng nhô lên thoi thóp giữa làn mưa phùn buốt giá. Những chiếc bè nứa kết tạm chở người già trẻ nhỏ dập dềnh trôi trong sương mù ảm đạm, rơm rạ mục nát nổi lềnh bềnh nhuốm một màu thê lương lạnh lẽo.'
  },

  // =========================================================================
  // 4. CẢNH CÁC TÒA THÀNH BỊ SỤP ĐỔ
  // =========================================================================
  {
    id: 'drs_city_collapse_01_thanh_tri_sup_do',
    title: 'Thương Lăng Cổ Thành • Tường Thành Vạn Trượng Sụp Đổ Như Cát Lở & Phá Trận',
    alias: 'Hắc Thạch Đổ Nát & Bụi Mù Che Kín Nhật Nguyệt',
    category: 'THANH_TRI_SUP_DO',
    categoryLabel: 'Thành Trì Sụp Đổ & Phá Trận',
    categoryBadgeBg: 'bg-stone-950/80',
    categoryBadgeBorder: 'border-stone-500/50',
    categoryBadgeText: 'text-stone-300',
    categoryIcon: '🏛️',
    locationName: 'Thương Lăng Hùng Thành',
    realmOrRegion: 'Trung Châu • Tiên Triều Trấn Cổ Biên Cảnh',
    timeAndAtmosphere: {
      timeOfDay: 'Buổi chiều muộn, bụi đất mù mịt biến trời xanh thành màu vàng đất u ám',
      weatherAndSky: 'Sóng xung kích thần thông thổi bạt mây trời, bầu trời chấn động từng đợt rền vang',
      lightingAndVisibility: 'Bụi đất dày đặc che khuất mặt trời, tầm nhìn chỉ còn vài bước chân trong đống gạch đá',
      residualEnergyOrAura: 'Đại trận hộ thành vỡ vụn phóng thích luồng linh lực hỗn loạn làm nổ tung mặt đất'
    },
    sceneryDescription:
      'Bức tường thành vạn trượng bằng đá hắc huyền thạch từng đứng vững ba ngàn năm trước mưa bom bão đạn, nay nứt toác từng đường dài ngoằng như mạng nhện rồi ầm ầm đổ sập xuống như núi lở cát trôi. Khối đá nặng ngàn cân lăn lông lốc đè bẹp những dãy phố phồn hoa bên dưới, bụi đá bốc lên cuồn cuộn thành cây nấm khổng lồ cao vút che lấp cả ánh dương quang. Màn sáng phòng ngự màu vàng kim của hộ thành đại trận vỡ nát thành từng ức mảnh lưu ly sắc nhọn rơi lả tả như cơn mưa thiên thạch, cắt đứt lầu son gác tía thành trăm mảnh vụn.',
    destructiveScale: {
      rubbleAndRuins: 'Đoạn tường thành dài mười dặm đổ sụp thành đống xà bần cao như đồi đá chắn ngang cổng chính',
      fallenLandmarks: 'Tòa Vọng Lâu chín tầng trên cổng thành nghiêng ngả rồi đổ ụp xuống quảng trường vỡ nát tan tành',
      weaponsOrDebris: 'Những khẩu đại pháo lôi đình ngàn cân bị chôn vùi dưới đống đá vụn, nòng pháo cong queo bốc khói'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Bách tính và tu sĩ cấp thấp hoảng loạn tháo chạy giẫm đạp lên nhau, tiếng la hét thất thanh chìm trong tiếng sụp đổ đinh tai',
      silhouettesAndEchoes: 'Một đội thủ vệ áo giáp rách nát cố gắng dùng tay không đào bới đống đá hộc hòng cứu vị thống lĩnh bị vùi lấp bên dưới',
      poignantDetail: 'Một cánh cổng thành bằng đồng thau nặng mười vạn cân gãy đôi cắm ngập vào lòng đất, đè nát một quầy bán đồ chơi trẻ thơ'
    },
    sensoryDetails: {
      visual: 'Khói bụi mù mịt vàng đục; những mảng tường khổng lồ đổ sập như thác đá; mảnh vỡ trận pháp lấp lánh rơi rụng',
      auditory: 'Tiếng ầm ầm rung chuyển đất trời của tường thành sụp đổ; tiếng nổ giòn giã của kết giới tan vỡ; tiếng la hét hỗn loạn',
      olfactory: 'Mùi bụi đá vôi nồng nặc nghẹt thở xộc vào phổi; mùi khét của ma sát đá tảng',
      tactile: 'Mặt đất rung chuyển dữ dội như động đất cấp mười; đá vụn bay rát mặt',
      emotionalAtmosphere: 'Sụp đổ hoàn toàn, tuyệt vọng tột cùng khi pháo đài bất khả xâm phạm sụp đổ trong chốc lát'
    },
    authorPlotHooks: [
      'Tường thành sụp đổ để lộ ra một thông đạo ngầm cổ xưa chứa kho báu của hoàng triều tiền triều.',
      'Nhân vật chính nhân lúc hỗn loạn đột nhập vào phủ Thành Chủ đoạt lấy ấn tín trận pháp.',
      'Đứng ra trấn áp hỗn loạn, dùng thân thể gánh đỡ mảnh tường sụp cứu sống hàng trăm bá tánh vô tội.'
    ],
    masterProseExcerpt:
      'Một tiếng rạn nứt trầm đục tựa như tiếng xương sống của đại địa gãy đôi vang lên từ chân bức tường thành Thương Lăng. Trong mắt hàng vạn tu sĩ và bách tính đang kinh hoàng ngước nhìn, bức tường hắc thạch cao trăm trượng từng sừng sững ba ngàn năm bắt đầu rạn nứt thành những đường rãnh sâu hoắm. Rồi chỉ trong một nhịp thở, cả một đoạn thành dài mười dặm ầm ầm đổ sập xuống như một trận tuyết lở khổng lồ bằng đá tảng! Đất trời rung chuyển dữ dội, bụi đá dày đặc bốc lên cuồn cuộn như cơn bão cát nuốt chửng toàn bộ ánh sáng mặt trời. Cùng lúc đó, đại trận hộ thành màu kim sắc phát ra tiếng kêu thấu trời rồi vỡ vụn thành hàng triệu mảnh linh quang lấp lánh rơi xuống như mưa sao băng tàn khốc. Lầu son gác tía, phố xá phồn hoa ngàn năm xây dựng chỉ trong chớp mắt đã biến thành một bãi xà bần hoang tàn ngổn ngang dưới lớp bụi mù mịt cay xè.',
    readyToInsertProseSnippet:
      'Bức tường thành hắc thạch vạn trượng nứt toác rồi ầm ầm đổ sụp như núi lở, cuốn theo những khối đá ngàn cân đè bẹp phố xá bên dưới. Đại trận hộ thành vỡ tan thành triệu mảnh lưu ly rơi rụng như mưa thiên thạch giữa làn bụi đá cuồn cuộn che lấp nhật nguyệt, biến tòa cổ thành phồn hoa thành đống đổ nát hoang tàn.'
  },
  {
    id: 'drs_city_collapse_02_cung_dien_sup_do',
    title: 'Thái Cổ Kim Loan Điện • Cung Điện Ngàn Năm Sụp Đổ Dưới Dư Chấn Thần Thông',
    alias: 'Cột Rồng Gãy Đôi & Ngói Lưu Ly Vỡ Vụn',
    category: 'THANH_TRI_SUP_DO',
    categoryLabel: 'Thành Trì Sụp Đổ & Phá Trận',
    categoryBadgeBg: 'bg-stone-950/80',
    categoryBadgeBorder: 'border-stone-500/50',
    categoryBadgeText: 'text-stone-300',
    categoryIcon: '🏛️',
    locationName: 'Kim Loan Thần Điện',
    realmOrRegion: 'Đế Đô Hoàng Triều • Trung Tâm Quyền Lực Cửu Châu',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm đen gió bão, ánh chớp rạch ngang trời soi bóng điện các nghiêng ngả',
      weatherAndSky: 'Mây đen vần vũ như xoáy nước khổng lồ, gió lốc cuốn ngói đá bay rào rào',
      lightingAndVisibility: 'Ánh lân quang từ trận pháp vỡ vụn lập lòe trong bóng tối mịt mùng',
      residualEnergyOrAura: 'Khí tức Hóa Thần đại năng va chạm để lại những vết nứt không gian đen ngòm rít gào'
    },
    sceneryDescription:
      'Tòa đại điện nguy nga tráng lệ bậc nhất thiên hạ, nơi ngự trị của chín mươi chín đời hoàng đế, nay đang oằn mình sụp đổ dưới dư chấn của trận quyết đấu kinh thiên. Tám cột trụ bằng vàng ròng chạm rồng ngậm ngọc bích to ba người ôm bị kiếm khí chém đứt ngang lưng, gãy gập xuống kéo theo toàn bộ mái vòm nạm ngọc lưu ly sụp đổ tan tành. Những bức bích họa cổ, ngai vàng khảm cửu long châu ngọc vỡ nát dưới đống xà nhà cháy dở. Sàn điện lát ngọc bích vỡ vụn thành trăm ngàn mảnh sắc nhọn, trơ trọi những hố sụt lún sâu hoắm khạc ra khói đen kịt.',
    destructiveScale: {
      rubbleAndRuins: 'Toàn bộ quần thể hoàng cung ngàn gian sụp đổ quá nửa, chỉ còn trơ trọi những bức tường lửng cháy sém',
      fallenLandmarks: 'Ngai vàng Chí Tôn biểu tượng cho quyền lực hoàng đạo bị một đao chém đôi nằm nghiêng giữa đống gạch vụn',
      weaponsOrDebris: 'Những đỉnh đồng hun trầm hương khổng lồ bị lật đổ lăn lóc, tro than và tàn hương vương vãi khắp nơi'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Cung nữ, thái giám và cấm vệ quân chạy tán loạn trong tiếng gào thét, dẫm đạp lên những mảnh ngói lưu ly sắc nhọn',
      silhouettesAndEchoes: 'Vị lão hoàng đế mất nước đầu tóc rũ rượi quỳ trước ngai vàng gãy đôi, cười điên dại giữa đống đổ nát',
      poignantDetail: 'Một chiếc vương miện khảm ngọc minh châu rơi vãi dưới gót giày của những kẻ cướp phá hoàng cung'
    },
    sensoryDetails: {
      visual: 'Màu vàng kim của ngói vỡ hòa lẫn tro đen xám xịt; những cột trụ khổng lồ nghiêng đổ chéo ngang màn đêm',
      auditory: 'Tiếng gỗ quý gãy răng rắc giòn giã; tiếng ngói lưu ly vỡ vụn như mưa rơi; tiếng chuông cảnh báo ngân vang lần cuối rồi tắt lịm',
      olfactory: 'Mùi gỗ tử đàn và long diên hương cháy khét quyện với mùi bụi đá nồng nặc',
      tactile: 'Mảnh ngói lưu ly sắc lẹm găm vào da thịt; sức ép không khí nóng rát từ các vết nứt không gian',
      emotionalAtmosphere: 'Sự sụp đổ của một triều đại huy hoàng, cảm giác bẽ bàng trước sự mong manh của quyền lực phàm trần'
    },
    authorPlotHooks: [
      'Thu hồi quốc bảo trấn quốc ngàn năm trước khi toàn bộ cung điện sụp đổ hoàn toàn.',
      'Truy bắt hoàng tộc tẩu thoát qua mật đạo ngầm dưới chân ngai vàng.',
      'Cảm ngộ được chân lý về sự suy vong tất yếu của vương quyền thế gian để hoàn thiện Đạo Tâm.'
    ],
    masterProseExcerpt:
      'Một vệt kiếm quang xé rách màn đêm đen đặc giáng thẳng xuống nóc điện Kim Loan, bổ đôi vòm mái ngọc lưu ly cao trăm trượng làm hai nửa. Tiếng gầm rú của xà gồ gỗ thiết mộc nứt toác vang lên rợn người khi tám cây cột rồng bằng đồng mạ vàng lần lượt gãy gục. Cả một tòa cung điện biểu tượng cho vương quyền ngàn năm nghiêng ngả rồi đổ sập trong một tiếng nổ kinh thiên động địa, dìm chết toàn bộ vẻ uy nghiêm tráng lệ dưới đống gạch đá ngổn ngang. Bụi vàng và tro hương bốc lên mù mịt giữa cơn mưa bão cuồng nộ. Chiếc ngai vàng Cửu Long nứt làm đôi nằm trơ trọi giữa đống xà nhà đổ gãy, bên cạnh là chiếc ngọc tỷ truyền quốc vỡ góc vùi sâu trong bùn đất, minh chứng cho sự chấm dứt của một vương triều đã từng thống trị thiên hạ suốt ba ngàn năm.',
    readyToInsertProseSnippet:
      'Kiếm khí chém đứt những cột rồng mạ vàng khổng lồ, kéo sụp toàn bộ mái vòm ngọc lưu ly của hoàng cung hoa lệ. Gạch ngói rơi vỡ như mưa giữa màn đêm mịt mù, ngai vàng ngàn năm gãy đôi vùi sâu trong đống xà nhà cháy sém, chôn vùi sự uy nghiêm của một vương triều dưới lớp tro tàn đổ nát.'
  },

  // =========================================================================
  // 5. CẢNH CÁC TÒA THÀNH BỊ CHÁY NỔ
  // =========================================================================
  {
    id: 'drs_city_fire_01_bien_lua_do_ruc',
    title: 'Hắc Thị Đô Hội • Biển Lửa Rực Trời & Kho Thuốc Nổ Lôi Hỏa Phát Nổ',
    alias: 'Lửa Thiêu Lầu Gác & Tro Than Bay Rợp Tinh Không',
    category: 'THANH_TRI_CHAY_NO',
    categoryLabel: 'Thành Trì Cháy Nổ & Biển Lửa',
    categoryBadgeBg: 'bg-orange-950/80',
    categoryBadgeBorder: 'border-orange-500/50',
    categoryBadgeText: 'text-orange-300',
    categoryIcon: '🔥',
    locationName: 'Vô Pháp Hắc Thị Thành',
    realmOrRegion: 'Tam Giác Hỗn Loạn • Giới Hạn Ma Tông',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm sâu canh ba, biển lửa thắp sáng cả bầu trời đêm rực rỡ như ban ngày',
      weatherAndSky: 'Khói đen kịt cuồn cuộn bốc lên che khuất các vì sao, tàn lửa bay rợp trời như bão tuyết đỏ',
      lightingAndVisibility: 'Ánh lửa đỏ rực bập bùng soi rõ từng ngóc ngách hỗn loạn, nhiệt độ không khí tăng cao bỏng rát',
      residualEnergyOrAura: 'Hỏa linh khí cuồng bạo mất kiểm soát, ma hỏa tím đen bốc cháy không thể dập tắt bằng nước'
    },
    sceneryDescription:
      'Cả một khu đô hội sầm uất chìm trong biển lửa đỏ rực ngút trời. Những dãy phường thị bằng gỗ quý ngàn năm bắt lửa nhanh như bùi nhùi, ngọn lửa hung hãn liếm láp từ mái nhà này sang mái nhà khác tạo thành bức tường lửa cao tới mười trượng. Đột nhiên, kho tàng trữ Lôi Hỏa Đạn và linh dược ở trung tâm thành phát nổ liên hoàn! Một cột lửa khổng lồ hình nấm bốc vút lên trời cao kèm theo sóng xung kích quét sạch ba dãy phố xung quanh thành bình địa. Tro than và tàn lửa bay rợp trời, tiếng xà gồ cháy tanh tách hòa cùng tiếng nổ chấn động màng nhĩ.',
    destructiveScale: {
      rubbleAndRuins: 'Hơn hai phần ba diện tích thành trì hóa thành biển than hồng âm ỉ cháy, công trình kiên cố nứt toác',
      fallenLandmarks: 'Tháp Đấu Giá cao ba mươi tầng bốc cháy như một ngọn đuốc khổng lồ giữa trời đêm rồi gãy gục',
      weaponsOrDebris: 'Những mảnh đồng đạn pháo và pháp bảo vỡ bắn tung tóe găm sâu vào các bức tường đá xung quanh'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Dòng người tu sĩ và phàm nhân tháo chạy tán loạn tìm đường thoát thân qua các cổng thành hẹp nghẹt thở',
      silhouettesAndEchoes: 'Những bóng người mang lửa trên người lao ra khỏi các tửu lầu bốc cháy, gào thét rồi ngã gục xuống đường',
      poignantDetail: 'Một thương nhân giàu có ôm chặt rương linh thạch cháy dở thà chết trong lửa chứ không buông tay'
    },
    sensoryDetails: {
      visual: 'Biển lửa rực đỏ cam hòa lẫn khói đen kịt; tàn lửa bay lượn như đàn đom đóm ma quái',
      auditory: 'Tiếng nổ đinh tai nhức óc của kho lôi hỏa; tiếng gỗ nổ tanh tách rợn người; tiếng gào thét thất thanh của đám đông',
      olfactory: 'Mùi khét lẹt nồng nặc của gỗ, vải vóc, dầu hỏa và da thịt cháy sém',
      tactile: 'Sức nóng khủng khiếp phả vào mặt làm cháy sém râu tóc; không khí bỏng rát nghẹt thở',
      emotionalAtmosphere: 'Hỗn loạn, cuồng loạn, rực lửa và hủy diệt hoàn toàn trật tự của một thành trì tự do'
    },
    authorPlotHooks: [
      'Nhân vật chính nhân cơ hội cháy nổ hỗn loạn đột nhập kho chứa đồ quý đoạt lấy dị hỏa hoặc thánh đan.',
      'Truy đuổi kẻ phóng hỏa chủ mưu qua các mái nhà đang bốc cháy dữ dội.',
      'Thi triển Thủy hệ đại thần thông dập tắt ngọn ma hỏa cứu nguy cho hàng vạn sinh linh vô tội.'
    ],
    masterProseExcerpt:
      'Đêm đen của thành Vô Pháp đã vĩnh viễn bị xóa sổ, thay vào đó là một địa ngục trần gian rực lửa đỏ thẫm đến nghẹt thở. Ngọn lửa hung tàn bốc lên từ bốn phía nội thành, cuốn theo gió lớn liếm láp từng dãy lầu gác bằng gỗ mun quý giá, biến cả đô hội thành một chảo dầu khổng lồ đang sôi sục. Bỗng nhiên, một tiếng nổ long trời lở đất vang lên từ kho đạn dược Lôi Hỏa Môn! Mặt đất rung chuyển dữ dội như muốn lật úp, một cột lửa đỏ rực cuộn theo đất đá xé toạc màn đêm bắn vút lên cao hàng trăm trượng, sóng xung kích quét phăng mọi công trình kiên cố trong bán kính một dặm thành tro bụi trắng xóa. Trên nền trời đen kịt ngập tràn khói độc, hàng triệu tàn lửa đỏ au bay rợp như một cơn bão tuyết ma quái. Tiếng xà nhà gãy răng rắc, tiếng kim loại nóng chảy tí tách hòa vào tiếng gào thét kinh hoàng của hàng ngàn sinh linh đang tuyệt vọng tháo chạy giữa biển lửa ngút ngàn.',
    readyToInsertProseSnippet:
      'Biển lửa đỏ rực cuồn cuộn nuốt chửng từng dãy lầu gác hoa lệ, thắp sáng màn đêm bằng một màu cam chết chóc. Kho lôi hỏa phát nổ liên hoàn tạo nên những cột lửa khổng lồ xé toạc vòm trời, sóng xung kích san phẳng phố xá thành tro tàn trong tiếng gào thét hỗn loạn và cơn mưa tàn lửa bay mù mịt.'
  },
  {
    id: 'drs_city_fire_02_ma_hoa_thieu_thanh',
    title: 'U Minh Ma Thành • Ma Hỏa Tím Đen Thiêu Rụi Cổ Trấn & Dầu Lửa Lênh Láng',
    alias: 'Lửa Ma Quỷ Không Tắt & Tro Đen Phủ Mờ Giang Sơn',
    category: 'THANH_TRI_CHAY_NO',
    categoryLabel: 'Thành Trì Cháy Nổ & Biển Lửa',
    categoryBadgeBg: 'bg-orange-950/80',
    categoryBadgeBorder: 'border-orange-500/50',
    categoryBadgeText: 'text-orange-300',
    categoryIcon: '🔥',
    locationName: 'U Minh Cổ Thành',
    realmOrRegion: 'Nam Hoang • Vực Thẳm Vạn Thi Huyết Hải',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm tàn canh năm, lửa tím đen bập bùng chiếu rọi những bộ xương trắng',
      weatherAndSky: 'Sương mù ma quái hòa cùng khói dầu đặc quánh bốc mùi tanh tưởi',
      lightingAndVisibility: 'Ánh lửa ma quái màu lam tím lập lòe không tỏa nhiệt ấm mà mang hơi lạnh rợn tóc gáy',
      residualEnergyOrAura: 'Âm hỏa ăn mòn linh hồn, nước dập vào chỉ làm ngọn lửa bùng lên dữ dội hơn'
    },
    sceneryDescription:
      'Khắp nội thành U Minh Cổ Thành bốc cháy bởi thứ ngọn lửa kỳ dị màu tím đen - U Minh Ma Hỏa. Ngọn lửa không tỏa ra hơi nóng rực rỡ mà bốc lên khí lạnh thấu xương, ăn mòn từ đá tảng, gạch ngói cho tới linh hồn của những kẻ xấu số. Dầu lửa ma đạo chảy tràn trên các con kênh và rãnh thoát nước, biến hệ thống đường thủy của thành phố thành những dòng sông lửa tím uốn lượn rợn người. Từng dãy tháp lâu bằng xương thú và gỗ mục đổ sụp trong tiếng nổ u u kỳ quái, tro đen rơi lả tả phủ một lớp dày như tuyết chết chóc.',
    destructiveScale: {
      rubbleAndRuins: 'Các tòa tế đài và ma điện nguy nga bị ma hỏa thiêu rụi chỉ còn trơ lại khung xương đen đúa',
      fallenLandmarks: 'Cột trụ tế trời bằng xương rồng ngàn năm bị nổ tung gãy làm nhiều khúc nằm chắn ngang đường lộ',
      weaponsOrDebris: 'Những chiếc kiệu ma, xe tang bằng đồng đen bốc cháy ngùn ngụt trôi dạt ven các dòng kênh lửa'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những tà tu trúng phải ma hỏa lăn lộn trên đất gào thét khi ngọn lửa ăn sâu vào tận thần hồn không thể dập tắt',
      silhouettesAndEchoes: 'Bóng dáng những bóng ma oan hồn bay lượn trên ngọn lửa, cất tiếng ca ai oán rợn tóc gáy',
      poignantDetail: 'Một con quạ ma bị cháy trụi lông cố gắng vỗ cánh bay lên rồi rơi thẳng vào dòng dầu lửa sôi sùng sục'
    },
    sensoryDetails: {
      visual: 'Ánh lửa màu tím biếc và lam sẫm nhảy múa trên nền đêm đen kịt; tro đen phủ kín mặt đất',
      auditory: 'Tiếng lửa cháy không nổ lách tách mà phát ra tiếng rít gào như ngàn ma nữ khóc than; tiếng sụp đổ rầm rập',
      olfactory: 'Mùi dầu hỏa khét nồng hòa lẫn mùi lưu huỳnh và mùi âm khí thối rữa của bãi tha ma',
      tactile: 'Cảm giác buốt giá tê dại da thịt khi đứng gần ngọn lửa ma quái; không khí lạnh ngắt như hầm băng',
      emotionalAtmosphere: 'Kinh dị, rùng rợn, ma mị và tuyệt vọng trước ngọn lửa địa ngục hủy diệt vạn vật'
    },
    authorPlotHooks: [
      'Thuần phục và thu thập một đóa U Minh Ma Hỏa bản nguyên làm dị hỏa bản mệnh.',
      'Giải cứu những người bị ma hỏa phong ấn nguyên thần trước khi bị thiêu rụi hoàn toàn.',
      'Tìm ra kẻ đã phản bội kích hoạt hỏa trận diệt thành để vạch trần âm mưu của Ma Tôn.'
    ],
    masterProseExcerpt:
      'Cổ thành U Minh trong đêm nay không chìm trong bóng tối, mà bị bao phủ bởi một thứ ánh sáng ma quái khiến bất kỳ ai nhìn thấy cũng phải rùng mình sởn gai ốc. Ngọn lửa màu lam tím lạnh lẽo bốc lên từ khắp các mái ngói và bờ tường đá, bập bùng nhảy múa như những bóng ma đói khát đang chực chờ nuốt chửng thế gian. Dầu lửa ma đạo từ các kho ngầm vỡ toạc chảy tràn lênh láng khắp các con phố, biến những rãnh nước thành những con rắn lửa tím trườn bò khắp ngóc ngách. Kỳ lạ thay, đứng trước ngọn lửa ngút trời ấy, người ta không cảm thấy hơi nóng bỏng rát, mà chỉ thấy một luồng âm khí buốt thấu tận xương tủy phả vào mặt. Những ngôi tháp cổ bằng xương dần dần rạn nứt rồi đổ sụp với âm thanh trầm đục, thả vào không trung hàng triệu đốm lân tinh tím biếc bay lơ lửng giữa màn sương đen kịt, để lại một chốn hoang tàn chết chóc không còn một giọt sinh khí tồn tại.',
    readyToInsertProseSnippet:
      'Ngọn ma hỏa màu tím đen ma quái bốc cháy ngùn ngụt khắp các lầu gác cổ kính, tỏa ra hơi lạnh thấu xương ăn mòn gạch đá và linh hồn. Dầu lửa tràn lênh láng biến phố xá thành những dòng sông lửa u minh uốn lượn, xà gồ đổ sập phát ra tiếng rít ai oán như ngàn vạn oan hồn đang than khóc giữa tro tàn buốt giá.'
  },

  // =========================================================================
  // 6. CẢNH HỒI SINH KHI HẠT CÂY TRƯỜNG SINH RƠI XUỐNG & NẨY MẦM (TRUONG_SINH_HOI_SINH)
  // =========================================================================
  {
    id: 'drs_revival_01_chien_truong',
    title: 'Chiến Trường Tái Sinh • Hạt Trường Sinh Rơi Vào Vực Kiếm, Vạn Binh Khí Nở Hoa Linh Chi',
    alias: 'Bất Lão Tiên Chủng Giáng Thế & Cổ Chiến Địa Hóa Thần Lâm',
    category: 'TRUONG_SINH_HOI_SINH',
    categoryLabel: 'Hạt Trường Sinh Hồi Sinh',
    categoryBadgeBg: 'bg-emerald-950/80',
    categoryBadgeBorder: 'border-emerald-500/50',
    categoryBadgeText: 'text-emerald-300',
    categoryIcon: '🌱',
    locationName: 'Đoạn Hồn Cổ Nhai • Tây Hoang',
    realmOrRegion: 'Biên giới Tây Hoang • Cổ Chiến Trường Hóa Tiên Cảnh',
    timeAndAtmosphere: {
      timeOfDay: 'Khoảnh khắc rạng đông khi tia nắng đầu tiên xuyên thủng mây xám tử khí',
      weatherAndSky: 'Mây đen tan biến, vòm trời ánh lên sắc xanh bích ngọc thuần khiết, cầu vồng thất sắc vắt ngang hai bờ vực thẳm',
      lightingAndVisibility: 'Hào quang ngọc bích tỏa rạng từ hạt thần mộc, chiếu sáng từng ngóc ngách u tối mười dặm hẻm núi',
      residualEnergyOrAura: 'Sát khí đẫm máu bị tinh lọc triệt để thành Thái Sơ Sinh Mệnh Chi Khí, sương mù cam lộ thơm ngát bay là là mặt đất'
    },
    sceneryDescription:
      'Giữa chốn Đoạn Hồn Nhai ngập tràn tro tàn và xác chiến xa đổ nát, một hạt giống màu xanh biếc óng ánh rơi từ chín tầng mây xuống. Vừa chạm mặt đất cháy sém, một vòng sóng gợn sinh mệnh màu bích ngọc bùng nổ, rễ cây như những sợi tơ ngọc đâm sâu xuống lòng đất nứt nẻ. Từ nơi hạt giống chạm đất, một mầm non vươn mình lớn nhanh như thổi, chỉ sau vài hơi thở đã hóa thành Cổ Mộc ngàn trượng chọc thủng vòm trời. Hàng ngàn thanh gươm giáo rỉ sét cắm trên sườn đá bỗng đâm chồi những dây leo bích ngọc, từ mỗi lưỡi đao mẻ nở bung những đóa hoa Cửu Diệp Linh Chi tỏa hương thơm ngát. Đàn quạ đen kêu thảm thiết ngày nào được thần quang bao phủ, rũ bỏ tử khí biến thành Thanh Loan thần điểu rực rỡ lượn quanh tán thụ. Đất cháy đen hóa thành thảm cỏ xanh mướt trải dài, từng giọt sương mai trường sinh nhỏ xuống cứu sống những thương binh hấp hối.',
    destructiveScale: {
      rubbleAndRuins: 'Vách đá nứt vỡ bị rễ thần thụ ôm trọn và hàn gắn lại thành những khối bích thạch óng ánh kiên cố',
      fallenLandmarks: 'Bia đá "Trấn Ma Quan" vỡ vụn được dây leo quấn chặt, chữ cổ phát sáng ánh hoàng kim hộ trì cương thổ',
      weaponsOrDebris: 'Vạn thanh đao kiếm gãy vụn biến thành gốc cho linh hoa dị thảo bám rễ, sát khí chuyển thành tiên vận'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những binh sĩ thương tật cùng cực bỗng thấy vết thương khép miệng thần kỳ, khí huyết hồi sinh, ngửa mặt rơi nước mắt mừng rỡ',
      silhouettesAndEchoes: 'Lão tướng tóc bạc cụt chân buông ngọn giáo gãy, quỳ rạp dưới chân thần mộc chắp tay cảm tạ tạo hóa khai sinh',
      poignantDetail: 'Bên chiếc giày cỏ trẻ con vương máu năm xưa, một đóa Mẫu Đơn Trường Sinh trắng ngần lặng lẽ bung nở cánh ngọc tỏa hương'
    },
    sensoryDetails: {
      visual: 'Sắc xanh ngọc bích rực rỡ lấn át toàn bộ tro tàn đen đúa; hoa linh chi nở bung trên lưỡi kiếm rỉ sét lấp lánh giọt sương mai',
      auditory: 'Tiếng suối nguồn ngầm vỡ òa tuôn chảy róc rách; tiếng chim Thanh Loan ca hót thanh thản xua tan tiếng gió hú thê lương',
      olfactory: 'Mùi máu tanh và khét nồng của lưu huỳnh biến mất, thay bằng hương gỗ trầm thanh tao và mùi phấn hoa thanh khiết ngạt ngào',
      tactile: 'Làn gió xuân ấm áp như bàn tay từ mẫu mơn man da thịt; khí tức sinh mệnh rót vào kinh mạch xua tan cơn buốt giá thấu xương',
      emotionalAtmosphere: 'Chấn động tâm can, cứu rỗi tuyệt đỉnh, linh hồn được gột rửa thanh tịnh như vừa bước qua luân hồi sinh tử'
    },
    authorPlotHooks: [
      'Nhân vật chính gieo hạt giống trường sinh nhặt được từ di tích viễn cổ, chấn động cả Thần Châu khi tái sinh cổ chiến địa.',
      'Sự hồi sinh của thần mộc đánh thức một vị lão tổ Chân Tiên bị phong ấn dưới đáy Đoạn Hồn Nhai suốt mười vạn năm.',
      'Các đại tông môn kéo đến tranh đoạt thần lâm mới sinh, buộc nhân vật chính phải đứng ra bảo vệ mầm sống trường sinh.'
    ],
    masterProseExcerpt:
      'Khi hạt giống màu bích lục từ trên lòng bàn tay rơi xuống lòng hẻm Đoạn Hồn Nhai, cả không gian dường như ngưng đọng trong một tích tắc. Không có tiếng nổ long trời lở đất, chỉ có một tiếng "tách" thanh thúy như giọt sương rơi trên mặt hồ tĩnh lặng. Thế nhưng ngay sau đó, một quầng sáng màu ngọc bích dịu mát từ lòng đất bùng tỏa ra bốn phương tám hướng. Lớp đất cháy đen đúa nứt nẻ bỗng run rẩy rồi mềm mại trở lại, vạn sợi rễ thần như những mạch máu sinh mệnh màu hoàng kim luồn lách qua từng kẽ đá, ôm trọn lấy hàng vạn mũi giáo gãy đao tàn. Trong sự bàng hoàng đến nghẹt thở của những kẻ sống sót, từ một mầm non nhỏ bé hé nở, một thân đại thụ vươn cao với tốc độ thần thánh, đâm toạc khói độc xám xịt để chạm tới tầng mây xanh biếc. Tán lá ngọc bích xòe rộng mười dặm như chiếc lọng tiên che chở cho cả hẻm núi. Hàng vạn đóa linh hoa trắng ngần bung nở ngay trên các lưỡi đao rỉ máu, từng giọt cam lộ thơm ngát rơi xuống tí tách làm lành mọi vết thương rách nát. Chiến địa vạn cốt khô trong chớp mắt biến thành Thần Lâm Bất Lão, nơi tử khí lụi tàn nhường chỗ cho sinh cơ vĩnh hằng.',
    readyToInsertProseSnippet:
      'Hạt cây trường sinh vừa chạm đất cháy, một luồng ánh sáng ngọc bích đã bùng nổ cuốn phăng tử khí mười dặm chiến trường. Mầm non đâm toạc xỉ than vươn cao thành đại thụ ngàn trượng, rễ cây đan cài hàn gắn vách núi nứt toác, vạn thanh đao kiếm gỉ sét bỗng trổ hoa linh chi thơm ngát. Mưa cam lộ rải xuống làm lành mọi thương tích, biến nấm mồ vạn người thành tiên cảnh trần gian.',
    longevitySeedRevival: {
      seedName: 'Thái Cổ Trường Sinh Thần Chủng',
      descentPhenomenon: 'Hạt giống lấp lánh như viên phỉ thúy rơi từ cửu thiên, vệt sáng xanh biếc xé tan mây đen và khói độc chiến trường.',
      momentOfTouchingGround: 'Chạm xuống xỉ than, vòng sóng chấn động sinh mệnh lan tỏa mười dặm, tiếng sấm đại đạo ngân vang thanh lọc oán khí.',
      rootingAndPurification: 'Rễ thần mộc quấn quanh đao kiếm gãy vụn, hút cạn sát khí và huyết độc, biến sắt rỉ thành cành nhánh nở hoa linh chi.',
      sproutingAndCanopyBloom: 'Chồi non nhú lên hóa đại thụ ngàn trượng, tán lá bích ngọc tỏa sáng như trăng rằm, nhỏ mưa cam lộ hồi sinh sinh linh.',
      revivedSensoryAtmosphere: {
        visual: 'Ánh ngọc bích tràn ngập hẻm núi, vạn hoa linh chi nở bung trên binh khí rỉ sét, bướm tiên dập dờn bay lượn.',
        auditory: 'Tiếng suối nguồn róc rách tuôn trào, khúc ca Thanh Loan trong trẻo thay thế tiếng quạ rên rỉ.',
        olfactory: 'Mùi tanh nồng nhục cốt biến mất hoàn toàn, thay bằng hương gỗ trường sinh thanh khiết ngạt ngào.',
        tactile: 'Khí ấm áp mơn man làn da, linh khí dạt dào thẩm thấu vào lỗ chân lông chữa lành mọi đau đớn.'
      },
      mortalAndSurvivorMiracle: 'Binh sĩ cụt tay chân bỗng thấy da thịt sinh sôi hồi phục, tử sĩ hấp hối bừng tỉnh, quỳ lạy thần thụ rơi lệ tri ân.',
      masterRevivalProseExcerpt: 'Hạt giống trường sinh rơi xuống đất chết, đại thụ ngàn trượng bừng nở giữa tro tàn. Vạn mũi giáo gãy đâm chồi linh chi, mưa cam lộ nhỏ xuống biến chiến trường Đoạn Hồn Nhai thành thánh địa bất lão muôn đời.',
      readyToInsertRevivalSnippet: 'Ánh sáng ngọc bích từ hạt trường sinh bùng nổ, quét sạch sát khí mười dặm Đoạn Hồn Nhai. Cây thần vươn cao rợp bóng, hoa cỏ nở rộ trên từng tấc đất cháy, biến địa ngục chiến tranh thành cõi bồng lai sinh mệnh.'
    }
  },
  {
    id: 'drs_revival_02_han_han',
    title: 'Làng Mạc Hạn Hán Tái Sinh • Hạt Trường Sinh Rơi Vào Giếng Cạn, Cửu Tuyền Phun Mưa Cam Lộ',
    alias: 'Hạn Địa Khai Tiên Tuyền & Ruộng Đồng Hóa Biển Lúa Vàng Bất Tử',
    category: 'TRUONG_SINH_HOI_SINH',
    categoryLabel: 'Hạt Trường Sinh Hồi Sinh',
    categoryBadgeBg: 'bg-emerald-950/80',
    categoryBadgeBorder: 'border-emerald-500/50',
    categoryBadgeText: 'text-emerald-300',
    categoryIcon: '🌱',
    locationName: 'Hoàng Hôn Thôn • Hạ Lưu Lạc Sa Hà',
    realmOrRegion: 'Đại Lục Trung Thổ • Vùng Đất Hạn Hán Ngàn Năm Hồi Sinh',
    timeAndAtmosphere: {
      timeOfDay: 'Chính ngọ giữa cái nắng gay gắt nhất bỗng chốc hóa thành tiết trời thanh lương mát rượi',
      weatherAndSky: 'Mặt trời đỏ rực bị một đám mây thần bích lục che phủ, gió xuân mát lành thổi qua làm dịu đi cái nóng cháy da',
      lightingAndVisibility: 'Ánh sáng màu xanh ngọc bích dịu dàng thay thế ánh nắng chói chang, sương tiên lấp lánh phản chiếu ngũ sắc',
      residualEnergyOrAura: 'Khí nóng khô khốc bị triệt tiêu, linh khí hệ Mộc và Thủy cuồn cuộn dâng tràn làm không khí ngọt ngào như sương mật'
    },
    sceneryDescription:
      'Giữa lòng giếng cạn trơ đáy nứt nẻ của Hoàng Hôn Thôn, nơi dân làng từng tuyệt vọng bới tìm từng giọt bùn, một hạt mầm xanh biếc phát sáng rơi xuống từ hư không. Khi hạt chạm vào đáy giếng khô, một tiếng nổ trầm đục "Ùng ùng" vang lên từ lòng đất mẹ. Đáy giếng vỡ toạc, một cột nước suối trong vắt như ngọc lỏng phun vút lên cao hàng chục trượng, hóa thành cơn mưa rào cam lộ mát rượi trút xuống toàn bộ thôn trang. Đất ruộng nứt nẻ như mai rùa kêu răng rắc rồi tự động khép miệng, vết nứt liền lại phẳng phiu như tấm lụa xanh. Từ lòng đất, một cây Thần Mộc Trường Sinh tỏa hào quang xanh ngắt mọc vút lên đầu thôn, rễ cây đâm ngang dọc dẫn nước tiên đi khắp các kênh mương rãnh nước. Hàng trăm mẫu ruộng khô cằn chỉ trong chớp mắt nhú lên những mầm lúa thần Bất Tử Mạch, lớn nhanh trông thấy rồi trổ bông vàng óng ả trĩu hạt. Cây cổ thụ khô cháy bên đình làng bỗng đâm chồi nảy lộc, hoa đào hoa mai nở rực rỡ trái mùa.',
    destructiveScale: {
      rubbleAndRuins: 'Hàng ngàn vết nứt sâu hoắm trên đồng ruộng được rễ ngọc và bùn tiên lấp đầy, đất đai hóa thành thổ nhưỡng phì nhiêu',
      fallenLandmarks: 'Giếng làng đổ nát hóa thành Tiên Tuyền Bảo Trì bằng ngọc thạch, nước ngọt mát bốn mùa không bao giờ cạn',
      weaponsOrDebris: 'Cày cuốc mục nát cắm trên đồng khô được dây thường xuân bao phủ, nở những chùm quả trường sinh ngọt lịm'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Người già, trẻ nhỏ khô khát ngửa mặt đón từng giọt mưa cam lộ, cơn khát cháy họng biến mất, da dẻ hồng hào khỏe khoắn trở lại',
      silhouettesAndEchoes: 'Từng đoàn dân làng dìu nhau ra đồng, quỳ phục trên thảm cỏ xanh mướt, tiếng khóc nghẹn ngào hóa thành tiếng reo hò dậy đất',
      poignantDetail: 'Đứa trẻ sơ sinh từng khát sữa lả đi nay nhoẻn miệng cười giòn tan, ngón tay nhỏ xíu chạm vào cánh hoa linh lan vừa nở bên thềm'
    },
    sensoryDetails: {
      visual: 'Sắc vàng khô khốc của cát bụi bị thay thế bằng màu xanh biếc ngút ngàn của đồng lúa và màu trắng muốt của hoa đào tiên',
      auditory: 'Tiếng sấm xuân êm dịu; tiếng nước suối ùng ục tuôn trào; tiếng cười nói reo vang rộn rã khắp thôn xóm',
      olfactory: 'Mùi đất ẩm nồng nàn sau cơn mưa tiên; mùi lúa chín ngọt ngào và hương hoa thanh khiết sảng khoái',
      tactile: 'Những hạt mưa cam lộ mát rượi mơn man làn da khô ráp; không khí trong lành tràn ngập lồng ngực',
      emotionalAtmosphere: 'Hạnh phúc vỡ òa, tràn trề hi vọng, niềm hân hoan tột cùng khi sinh mệnh được hồi sinh từ cõi chết'
    },
    authorPlotHooks: [
      'Dòng Tiên Tuyền phun lên từ giếng làng biến Hoàng Hôn Thôn thành điểm dừng chân của các bậc tiên nhân vân du.',
      'Bách tính tôn sùng nhân vật chính như vị Cứu Thế Thần Nông tái thế, lập đền thờ phụng ngàn năm.',
      'Hạt gạo thần Bất Tử Mạch có công dụng kéo dài tuổi thọ cho người phàm và bổ sung linh lực cho tu sĩ cấp thấp.'
    ],
    masterProseExcerpt:
      'Hạt mầm trường sinh lấp lánh rơi vào lòng giếng cạn như một giọt nước mắt của trời xanh ban phát xuống trần gian đau khổ. Trong khoảnh khắc nó chạm vào lớp bùn khô nẻ ở đáy giếng, một luồng sinh khí màu bích ngọc cuồn cuộn thức giấc từ cửu tuyền. Tiếng nước reo vang như tiếng trống trận khải hoàn, cột nước tiên mát rượi phun vọt lên tận trời mây rồi tỏa ra thành triệu hạt mưa cam lộ lấp lánh như bụi kim cương. Mưa rơi tới đâu, đất cằn hồi sinh tới đó. Những rãnh nứt toác mai rùa sâu hoắm kêu rắc rắc rồi liền lại trong nháy mắt, từ lòng đất trồi lên những mầm lúa thần vàng óng ả trĩu hạt. Cây khô đầu làng bung nở trăm ngàn nụ hoa ngọc, hương thơm ngào ngạt lan tỏa mười dặm đường thôn. Cụ già chống gậy run run hứng lấy giọt nước ngọt lành rơi trên đầu lưỡi, nghẹn ngào bật khóc: "Trời cứu làng ta rồi! Thần tích sống lại rồi!". Cả một vùng hoang mạc chết chóc trong phút chốc biến thành vựa lúa tiên cảnh trù phú thanh bình bậc nhất thế gian.',
    readyToInsertProseSnippet:
      'Hạt trường sinh rơi xuống đáy giếng cạn, lập tức khai thông cửu tuyền, phun lên cột nước cam lộ mát ngọt tưới đẫm đất cằn. Những vết nứt nẻ mai rùa khép lại tức thì, đồng ruộng bừng lên thảm lúa vàng thần thánh trĩu hạt, hoa lá đâm chồi rực rỡ, cứu sống ngàn hộ dân thoát khỏi thảm cảnh khô hạn diệt vong.',
    longevitySeedRevival: {
      seedName: 'Thần Nông Tạo Hóa Tiên Chủng',
      descentPhenomenon: 'Hạt giống tỏa ánh hào quang ngọc bích êm dịu, vẽ nên một đường cong hoàn mỹ rơi thẳng vào giếng cạn giữa trưa hè bỏng rát.',
      momentOfTouchingGround: 'Chạm đáy giếng khô, mạch ngầm cửu tuyền thức tỉnh, cột nước ngọt lành phun cao ba mươi trượng làm dịu mát đất trời.',
      rootingAndPurification: 'Rễ thần mọc xuyên lòng đất, hàn gắn các rãnh nứt nẻ mai rùa, biến đất cát cằn cỗi thành bùn tiên màu mỡ.',
      sproutingAndCanopyBloom: 'Cây thần nhú mầm hóa đại thụ che rợp đầu thôn, đồng khô trổ đầy lúa Bất Tử Mạch vàng óng chỉ sau một tuần trà.',
      revivedSensoryAtmosphere: {
        visual: 'Màu vàng rực rỡ của cánh đồng lúa chín hòa cùng màu xanh mướt mát của cây cối và cầu vồng ngũ sắc bên giếng tiên.',
        auditory: 'Tiếng nước phun xối xả reo vui; tiếng trẻ con cười đùa tắm mưa cam lộ.',
        olfactory: 'Mùi hương ngào ngạt của lúa chín quyện với mùi đất tươi xốp và phấn hoa thanh mát.',
        tactile: 'Cảm giác mát lạnh tê người xua tan cơn khát thiêu đốt, da dẻ nứt nẻ lành lặn mịn màng.'
      },
      mortalAndSurvivorMiracle: 'Bách tính quỳ rạp ôm lấy nhau trong nước mắt, những người kiệt sức vì khát đứng bật dậy reo hò mừng rỡ.',
      masterRevivalProseExcerpt: 'Một hạt giống gieo xuống giếng cạn, ngàn dặm đất khô hóa biển lúa thần. Mưa cam lộ gột rửa kiếp nạn hạn hán, mang lại sự sống vĩnh hằng cho thôn xóm bên bờ tuyệt diệt.',
      readyToInsertRevivalSnippet: 'Từ giếng cạn nứt nẻ, hạt mầm trường sinh gọi về mạch nước cửu tuyền ngọt mát. Đất nứt khép miệng, đồng khô hóa biển lúa vàng trĩu hạt, cứu vớt bách tính thoát khỏi cơn đại hạn lịch sử.'
    }
  },
  {
    id: 'drs_revival_03_ngap_lut',
    title: 'Làng Mạc Ngập Lụt Tái Sinh • Hạt Trường Sinh Cắm Rễ Trấn Thủy Ma, Hồng Thủy Hóa Bích Ba Liên Trì',
    alias: 'Kình Thiên Thần Mộc Trấn Thủy & Lũ Lụt Hóa Đầm Sen Tiên Thanh Khiết',
    category: 'TRUONG_SINH_HOI_SINH',
    categoryLabel: 'Hạt Trường Sinh Hồi Sinh',
    categoryBadgeBg: 'bg-emerald-950/80',
    categoryBadgeBorder: 'border-emerald-500/50',
    categoryBadgeText: 'text-emerald-300',
    categoryIcon: '🌱',
    locationName: 'Vân Khê Cổ Thôn • Thung Lũng Cửu Khúc Hà',
    realmOrRegion: 'Đông Hải Lưu Vực • Vùng Trũng Hồng Thủy Tái Sinh',
    timeAndAtmosphere: {
      timeOfDay: 'Hoàng hôn sau cơn giông bão, mây mù tản mác nhường chỗ cho ráng chiều ngũ sắc diễm lệ',
      weatherAndSky: 'Mưa bão sấm sét lập tức ngừng hẳn, gió lốc cuồng nộ hóa thành ngọn gió hiu hiu thanh mát thổi gợn sóng biếc',
      lightingAndVisibility: 'Mặt nước phản chiếu ánh tà dương lấp lánh như dát vàng dát bạc, hoa sen phát sáng lấp lánh trong đêm',
      residualEnergyOrAura: 'Thủy sát bạo tẩu bị rễ mộc hấp thu toàn bộ, chuyển hóa thành linh khí hệ Mộc dịu dàng an định'
    },
    sceneryDescription:
      'Giữa lúc dòng nước lũ đỏ ngầu đang gầm thét cuồn cuộn cuốn trôi nhà cửa và chực nuốt chửng ngọn cổ thụ nơi dân làng đang bám víu, một hạt mầm xanh biếc phát ra âm thanh như tiếng chuông ngân rơi thẳng vào tâm xoáy nước hung tợn nhất. Khoảnh khắc chạm nước, dòng nước xoáy bỗng khựng lại. Từ đáy thung lũng, một gốc thần mộc khổng lồ cắm sâu hàng ngàn thước rễ cái xuống lòng đất đá, vươn cao lên khỏi mặt nước năm mươi trượng, xòe tán lá bích ngọc rộng mênh mông như chiếc mai rùa khổng lồ che chở toàn bộ xóm làng. Vô vàn rễ phụ như những cánh tay mềm mại đan dệt vào nhau, nhẹ nhàng đỡ lấy những chiếc bè mảng và mái nhà tranh trôi dạt đưa vào bờ an toàn. Kỳ diệu hơn cả, rễ cây hút cạn bùn đỏ và khí độc, lọc toàn bộ dòng nước lũ ô trọc thành một mặt hồ nước trong veo nhìn thấu từng viên sỏi trắng. Trên mặt hồ, hàng vạn đóa Cửu Phẩm Thanh Liên nở bung tỏa hương thơm ngát, biến bãi lũ quét thảm khốc thành hồ sen tiên cảnh tuyệt mỹ.',
    destructiveScale: {
      rubbleAndRuins: 'Bùn lầy ngập ngụa được rễ cây lọc sạch và bồi đắp thành dải đê xanh kiên cố trồng đầy liễu rủ trường sinh',
      fallenLandmarks: 'Những nhịp cầu gỗ bị lũ đánh sập được rễ thần mộc vươn sang hai bờ kết nối thành cây cầu rễ cây tự nhiên vững như bàn thạch',
      weaponsOrDebris: 'Rác rưởi và thân cây mục trôi giạt bị sinh mệnh chi hỏa đốt thành tro tẩm bổ cho hoa sen khoe sắc'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những người kiệt sức run rẩy trên ngọn cây được rễ mộc nhẹ nhàng đỡ xuống mặt đất khô ráo, thân thể ấm áp trở lại',
      silhouettesAndEchoes: 'Các gia đình thất tán trôi dạt trên bè mảng được dòng nước êm đềm đưa về sum họp bên gốc đại thụ',
      poignantDetail: 'Một con nai nhỏ mắc kẹt giữa xoáy nước được một đóa sen khổng lồ nâng bổng lên, nhảy tung tăng vào bờ rừng xanh mướt'
    },
    sensoryDetails: {
      visual: 'Màu nước đỏ ngầu biến thành màu xanh ngọc bích trong vắt; vạn đóa sen hồng phấn và bạch liên thanh khiết nở rộ',
      auditory: 'Tiếng nước lũ gầm thét hung tợn biến thành tiếng sóng vỗ rì rào êm ả bên bờ trúc; tiếng chim hót líu lo rộn rã',
      olfactory: 'Mùi bùn tanh hôi và uế khí tan biến, thay bằng hương sen thanh tao ngào ngạt ngấm sâu vào tâm can',
      tactile: 'Cảm giác ướt lạnh run rẩy được thay thế bằng làn hơi ấm nồng nàn tỏa ra từ thân thần mộc trường sinh',
      emotionalAtmosphere: 'Thanh bình, thoát tục, trút bỏ mọi âu lo kinh hoàng trước cơn cuồng nộ của thủy ma'
    },
    authorPlotHooks: [
      'Gốc thần mộc trấn thủy trở thành nơi khai tông lập phái của một tông môn tu đạo lấy đức hiếu sinh làm đầu.',
      'Hạt sen Cửu Phẩm Thanh Liên nở trên hồ có tác dụng tẩy tủy phạt cốt, ngưng tụ băng tâm thanh tịnh cho tu sĩ.',
      'Thủy mạch dưới lòng hồ liên thông với Thủy Tinh Cung cổ đại, mở ra cơ duyên truyền thừa của Long Tộc viễn cổ.'
    ],
    masterProseExcerpt:
      'Dòng lũ đỏ ngầu như con mãng xà hung bạo đang chực nuốt chửng những tia hi vọng cuối cùng của người dân Vân Khê Thôn. Đúng lúc sinh tử mong manh ấy, hạt mầm Bất Lão Tiên Chủng rơi xuống tâm xoáy nước. Âm thanh thánh thót như khúc nhạc tiên vang lên làm mặt nước sôi sục bỗng phẳng lặng như gương. Từ đáy vực thẳm, một thân mộc màu ngọc bích vươn vút lên trời cao, ngàn vạn rễ thần đan cài vào nhau như lưới trời nâng bổng những mái nhà tranh và bè mảng trôi giạt vào bờ đá an toàn. Chỉ trong vài nhịp thở, dòng nước đục ngầu cuồn cuộn bị thanh lọc thành làn nước ngọc trong vắt nhìn thấu tận đáy. Hàng vạn đóa sen ngọc bích đua nhau nở rộ trên mặt sóng êm đềm, tỏa ra làn hương thanh tao thơm ngát đất trời. Bờ sông xói lở hóa thành lũy tre xanh mướt kiên cố, chở che xóm làng khỏi muôn trùng sóng gió ngàn năm.',
    readyToInsertProseSnippet:
      'Hạt mầm trường sinh đáp xuống giữa xoáy nước lũ, chồi non vươn lên thành Cổ Mộc ngàn trượng cắm rễ trấn áp thủy ma. Dòng lũ đỏ ngầu lập tức hóa thành hồ nước bích ngọc trong veo rực rỡ vạn đóa sen tiên, nâng đỡ những mái nhà trôi dạt trở về bến đỗ bình yên.',
    longevitySeedRevival: {
      seedName: 'Kình Thiên Trấn Thủy Tiên Chủng',
      descentPhenomenon: 'Hạt giống giáng thế mang theo luồng sáng bích ngọc lộng lẫy, lao thẳng xuống tâm xoáy nước đỏ ngầu đang gầm thét.',
      momentOfTouchingGround: 'Chạm mặt nước xiết, sóng dữ lập tức ngưng đọng, một vòng trận văn hình hoa sen khổng lồ tỏa rạng dưới đáy sông.',
      rootingAndPurification: 'Rễ mộc đâm sâu ngàn trượng chặn đứng lũ quét, lọc sạch phù sa và độc tố, biến dòng nước ô trọc thành ngọc dịch trong vắt.',
      sproutingAndCanopyBloom: 'Thần mộc vươn cao năm mươi trượng, tán lá xanh mướt che chắn xóm làng, trên mặt nước nở bung biển sen Cửu Phẩm Thanh Liên.',
      revivedSensoryAtmosphere: {
        visual: 'Hồ nước trong veo soi bóng mây trời ngũ sắc, hoa sen hồng phấn dập dềnh trên làn sóng biếc êm ả.',
        auditory: 'Tiếng sóng nước gầm rú biến thành tiếng rì rào êm dịu; tiếng cá quẫy đuôi đớp bọt sen.',
        olfactory: 'Mùi bùn tanh nồng biến mất hoàn toàn, nhường chỗ cho hương sen ngào ngạt thanh khiết lan xa mười dặm.',
        tactile: 'Hơi ấm từ thân mộc sưởi ấm thân thể ướt sũng của dân làng, làm tan biến cái lạnh buốt giá thấu xương.'
      },
      mortalAndSurvivorMiracle: 'Những đứa trẻ bám ngọn cây được rễ mộc nhẹ nhàng đưa xuống đất, dân làng ôm lấy nhau khóc cười trong hồ sen tiên cảnh.',
      masterRevivalProseExcerpt: 'Hạt trường sinh rơi xuống dòng lũ dữ, biến kiếp nạn hồng thủy thành kỳ quan đầm sen bất lão. Cây thần đứng sừng sững trấn giữ giang sơn, mang lại an bình muôn đời cho thung lũng Vân Khê.',
      readyToInsertRevivalSnippet: 'Giữa cơn hồng thủy gầm thét, hạt cây trường sinh giáng thế cắm rễ trấn áp cuồng lưu. Nước đục hóa hồ sen biếc ngọc, rễ cây nâng đỡ người bị nạn vào bờ, biến bãi lũ hoang tàn thành thánh địa thanh bình.'
    }
  },
  {
    id: 'drs_revival_04_thanh_tri_sup_do',
    title: 'Thành Trì Đổ Nát Tái Sinh • Hạt Trường Sinh Mọc Xuyên Gạch Vụn, Thần Mộc Dựng Tường Thành Bích Ngọc',
    alias: 'Hóa Thạch Thành Tiên Mộc & Cổ Trận Phục Hưng Dưới Tán Đại Thụ',
    category: 'TRUONG_SINH_HOI_SINH',
    categoryLabel: 'Hạt Trường Sinh Hồi Sinh',
    categoryBadgeBg: 'bg-emerald-950/80',
    categoryBadgeBorder: 'border-emerald-500/50',
    categoryBadgeText: 'text-emerald-300',
    categoryIcon: '🌱',
    locationName: 'Thiên Khuyết Cổ Thành • Trấn Ma Cương',
    realmOrRegion: 'Trung Châu • Cổ Thành Đổ Nát Tái Sinh Thành Thánh Địa',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm trăng thanh gió mát, ánh trăng hòa cùng ánh sáng ngọc bích từ các bức tường thành phát sáng',
      weatherAndSky: 'Bụi đất che trời tan biến hoàn toàn, để lộ vòm trời đầy sao lấp lánh như dát kim cương',
      lightingAndVisibility: 'Khắp các ngõ phố đổ nát bừng sáng bởi những chiếc lá ngọc phát quang dịu mắt, tầm nhìn sáng rõ như ban ngày',
      residualEnergyOrAura: 'Khí tức pháp trận tan vỡ được tái cấu trúc thành một vòng đại trận Thần Mộc Trường Tồn vĩnh cửu'
    },
    sceneryDescription:
      'Giữa đống gạch đá đổ nát ngổn ngang của Thiên Khuyết Cổ Thành, nơi tường thành vạn trượng từng đổ sụp như cát lở, một hạt giống màu bích ngọc lấp lánh nhẹ nhàng đáp xuống chính giữa quảng trường trung tâm. Vừa chạm vào đống gạch vỡ, một tiếng rắc rắc thanh tao vang lên. Từ hạt giống, một cây mầm xanh biếc vươn lên, hóa thành thân cổ thụ khổng lồ to như ngọn núi sừng sững giữa lòng thành. Vô số nhánh rễ và dây leo Thần Thoại Bất Lão Đằng vươn dài hàng chục dặm, len lỏi qua từng tảng đá hắc thạch đổ nát. Dây leo phát lực kéo các khối tường thành sụp đổ ghép lại với nhau chuẩn xác từng thớ đá, đồng thời phủ lên bề mặt đá một lớp ngọc xanh biếc bóng loáng cứng hơn huyền thiết. Cổng thành vỡ vụn được tái tạo bằng hai thân mộc đan chéo vững chãi như bàn thạch. Trận pháp hộ thành xưa kia vỡ vụn nay được hoa văn thần mộc tái tạo, hàng triệu chiếc lá ngọc phát sáng kết thành một vòm bảo hộ lục bảo lấp lánh trên không trung.',
    destructiveScale: {
      rubbleAndRuins: 'Đống gạch vụn và xà gồ gãy nát được rễ cây nâng bổng, ghép lại thành các cung điện gác tía bằng ngọc mộc tự nhiên',
      fallenLandmarks: 'Trụ đá hộ thành ngàn năm được dây leo ôm trọn và dựng đứng trở lại, đỉnh trụ nở một đóa hoa sen ngọc phát sáng rọi khắp kinh thành',
      weaponsOrDebris: 'Đất đá vụn vỡ dưới chân hóa thành những phiến đá xanh mướt mát bằng phẳng rải dọc các đại lộ'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những người dân bị vùi lấp dưới đống đổ nát được rễ cây nhẹ nhàng nâng lên khỏi hang hốc, vết thương trên da thịt lành lặn thần kỳ',
      silhouettesAndEchoes: 'Tướng sĩ giữ thành từng thề sống chết với thành trì nay quỳ rạp dưới bóng thần mộc, giọt nước mắt kiêu hãnh lăn dài trên má',
      poignantDetail: 'Một bức tượng cổ của vị anh hùng giữ thành bị sập đầu nay được dây leo kết thành chiếc vòng hoa nguyệt quế trang nghiêm ngự trên đỉnh'
    },
    sensoryDetails: {
      visual: 'Màu xám xịt của đá đổ biến thành màu xanh lục bảo lộng lẫy; vòm bảo hộ ánh sáng xanh bao trùm toàn bộ kinh thành trăm dặm',
      auditory: 'Tiếng đá lở ầm ầm nhường chỗ cho tiếng lá cây reo xào xạc như khúc ca khải hoàn; tiếng chim hót ríu rít trên ngọn tháp',
      olfactory: 'Mùi bụi đất nồng nặc biến mất, thay vào đó là hương thơm mát lạnh của nhựa cây trường sinh và hoa ngọc lan dịu ngọt',
      tactile: 'Chạm tay vào tường thành không còn thấy sần sùi lạnh lẽo mà cảm nhận được độ bóng mịn như ngọc và hơi ấm sinh mệnh dạt dào',
      emotionalAtmosphere: 'Hùng tráng, uy nghiêm, tráng lệ và kiêu hãnh tột cùng khi một biểu tượng văn minh trỗi dậy từ hoang tàn'
    },
    authorPlotHooks: [
      'Thiên Khuyết Thành sau khi tái sinh trở thành đệ nhất Thánh Địa Bất Tử Mộc, thu hút vạn tông triều bái.',
      'Lá của thần thụ trung tâm thành phố có thể dùng để luyện chế Cửu Chuyển Hoàn Hồn Đan nghịch thiên cải mệnh.',
      'Nhân vật chính trở thành vị Thành Chủ đầu tiên của Tân Thiên Khuyết Thành, nắm giữ quyền kiểm soát đại trận thần mộc.'
    ],
    masterProseExcerpt:
      'Hạt trường sinh rơi xuống giữa đống gạch vụn của cổng thành Thiên Khuyết như một nét bút thần chấm phá giữa bức tranh hoang phế. Đất đá dưới chân chuyển động rào rào, hàng triệu sợi dây leo màu phỉ thúy vươn ra từ lòng đất, như những bàn tay thần linh khéo léo nâng từng phiến đá hắc thạch vạn cân ghép lại về vị trí cũ. Tường thành đổ sụp bỗng chốc được tái tạo, nhưng không còn là màu đen u tối của đá thạch, mà đã hóa thành một bức tường thành ngọc bích sừng sững chọc trời tỏa sáng rực rỡ dưới trăng thanh. Từ trung tâm thành phố, một cây Cổ Mộc ngàn trượng vươn cao đỡ lấy vòm trời, hàng triệu chiếc lá ngọc rung rinh phát ra những chuỗi âm thanh trong trẻo như chuông gió tiên giới, kết thành một màn chắn quang minh bất khả xâm phạm. Thành trì từng bị san phẳng nay tái sinh trong hình hài một kỳ quan vĩ đại chưa từng có trong lịch sử tu chân.',
    readyToInsertProseSnippet:
      'Hạt cây trường sinh cắm rễ vào đống gạch đá vụn nát, dây leo tiên đan dệt nâng bổng tường thành đổ sập ghép lại nguyên vẹn như ngọc bích. Thần mộc ngàn trượng vươn cao che chở kinh thành, tái sinh đại trận hộ quốc kiên cố gấp mười lần thủa xưa.',
    longevitySeedRevival: {
      seedName: 'Bất Lão Tiên Đằng Thần Chủng',
      descentPhenomenon: 'Hạt giống giáng thế mang theo luồng sáng hoàng kim và bích lục đan xen, vẽ nên những đạo văn thần bí trên vòm trời đổ nát.',
      momentOfTouchingGround: 'Chạm vào đống gạch vụn, một làn sóng địa chấn êm dịu lan tỏa, kéo các mảng tường thành nứt vỡ tự động khép lại.',
      rootingAndPurification: 'Rễ cây và dây leo tiên mộc đan cài xuyên qua các khối đá, kéo lầu gác sập đổ đứng thẳng dậy và hóa ngọc toàn bộ kiến trúc.',
      sproutingAndCanopyBloom: 'Cổ mộc ngàn trượng trỗi dậy giữa trung tâm, lá ngọc phát sáng kết thành vòm đại trận hộ thành bất hoại.',
      revivedSensoryAtmosphere: {
        visual: 'Tường thành hóa ngọc bích phát quang rực rỡ, lầu gác đan xen hoa lá trường sinh tráng lệ như cung điện thượng giới.',
        auditory: 'Tiếng lá reo như tiếng ngọc khánh vang vọng; tiếng chuông đồng trên tháp ngân nga khúc thái bình.',
        olfactory: 'Hương thơm của gỗ trầm ngàn năm quyện với hương ngọc lan ngào ngạt lan tỏa khắp phố phường.',
        tactile: 'Mặt đá bóng mịn và ấm áp; không khí tràn ngập sinh khí khiến người ta bước đi nhẹ nhàng như bay.'
      },
      mortalAndSurvivorMiracle: 'Bách tính được rễ mộc nâng ra khỏi đống đổ nát lành lặn không một vết xước, quỳ lạy trước bức tường thành ngọc bích mới sinh.',
      masterRevivalProseExcerpt: 'Một hạt trường sinh gieo xuống phế tích, biến đống gạch vụn Thiên Khuyết thành kỳ quan ngọc mộc muôn đời. Tường thành vươn cao, thần trận phục sinh, biểu tượng hùng cường trỗi dậy từ cõi chết.',
      readyToInsertRevivalSnippet: 'Từ đống hoang tàn gạch vụn, hạt trường sinh đâm chồi kéo các phiến tường thành đổ nát đứng dậy hóa thành ngọc bích kiên cố. Thần mộc chọc trời tỏa sáng rực rỡ, phục hưng tòa thành tráng lệ hơn muôn phần thủa trước.'
    }
  },
  {
    id: 'drs_revival_05_thanh_tri_chay_no',
    title: 'Biển Lửa Tro Tàn Tái Sinh • Hạt Trường Sinh Dập Tắt Ma Hỏa, Cổ Kinh Tái Sinh Dưới Tán Mộc Ngàn Trượng',
    alias: 'Băng Tinh Ngọc Diệp Tức Ma Hỏa & Kinh Đô Tái Sinh Từ Biển Lửa',
    category: 'TRUONG_SINH_HOI_SINH',
    categoryLabel: 'Hạt Trường Sinh Hồi Sinh',
    categoryBadgeBg: 'bg-emerald-950/80',
    categoryBadgeBorder: 'border-emerald-500/50',
    categoryBadgeText: 'text-emerald-300',
    categoryIcon: '🌱',
    locationName: 'Đại Viêm Cổ Kinh • U Minh Hỏa Trường',
    realmOrRegion: 'Nam Hoang • Kinh Đô Cháy Rụi Hóa Thành Tiên Cảnh',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm tối mù mịt được thắp sáng bởi ánh hào quang ngọc bích mát lạnh thay thế biển lửa rực đỏ',
      weatherAndSky: 'Cột khói đen mù mịt bị gió tiên thổi bạt, bầu trời trở lại vẻ trong vắt với ngàn vạn vì sao lấp lánh',
      lightingAndVisibility: 'Ánh sáng êm dịu như ngọc thạch xua tan ánh lửa ma quái tím đen, soi rọi từng mái ngói cổ kính vừa tái sinh',
      residualEnergyOrAura: 'Hỏa độc và ma sát bị dập tắt và hấp thụ làm dưỡng chất sinh trưởng, để lại một luồng sinh khí thanh khiết vô ngần'
    },
    sceneryDescription:
      'Giữa lòng Đại Viêm Cổ Kinh đang chìm trong biển lửa ngút trời và ma hỏa tím đen thiêu rụi vạn vật, một hạt giống màu xanh ngọc bích rơi thẳng vào tâm chấn ngọn lửa cháy dữ dội nhất. Khoảnh khắc chạm đất, một đóa sen ngọc bích bằng tinh thể băng tinh từ hạt giống bung nở, xoay tròn lơ lửng trên không trung. Một luồng sóng khí mát lạnh tỏa ra ba trăm dặm, đi tới đâu ngọn lửa hung hãn tắt ngấm tới đó. Đống tro tàn nóng bỏng bốc khói đen tức thì nguội ngắt rồi biến thành lớp đất mùn tơi xốp ngát hương phù sa. Từ tâm đóa sen, một cây Thần Mộc Bất Lão vươn vút lên trời xanh, tán lá sum sê rộng mười dặm bao trùm cả hoàng cung và phố xá. Những cột gỗ và xà nhà cháy sém đâm chồi những dây leo hoa tường vi và hoa quỳnh tiên trắng muốt, che lấp mọi vết tích thiêu rụi. Tàn lửa lơ lửng giữa không trung bỗng biến thành hàng triệu đốm đom đóm xanh lấp lánh như sao sa. Đàn phượng hoàng và thần điểu từ phương xa bay về đậu trên cành mộc cất tiếng hót khai sinh thời đại mới.',
    destructiveScale: {
      rubbleAndRuins: 'Các tòa cung điện cháy đen được phủ một lớp rêu tiên mềm mại như thảm nhung và hoa thơm nở rộ quanh năm',
      fallenLandmarks: 'Tháp chuông hoàng gia bị thiêu rụi được thân cây đại thụ quấn quanh tạo thành tháp chuông sống bằng gỗ ngọc',
      weaponsOrDebris: 'Xỉ than và mảnh vỡ lôi hỏa đạn biến thành những viên sỏi ngọc lấp lánh rải trên các con đường ngõ phố'
    },
    humanAndMortalTragedy: {
      survivorsPlight: 'Những người bị bỏng nặng và ngạt khói ngã quỵ trên đường bỗng hít thở được luồng không khí thanh mát, vết bỏng dịu đi và lành lặn ngay tức khắc',
      silhouettesAndEchoes: 'Bách tính chạy trốn giặc giã đứng sững lại giữa phố, ngỡ ngàng ngắm nhìn biển lửa biến mất nhường chỗ cho rừng hoa tiên rực rỡ',
      poignantDetail: 'Một con chim sẻ nhỏ bị cháy xém lông rơi bên vệ đường bỗng đâm chồi lông vũ óng ả ngũ sắc, vỗ cánh hót vang rồi bay vút lên tán cây thần'
    },
    sensoryDetails: {
      visual: 'Sắc đỏ rực và tím đen của biển lửa hoàn toàn bị thay thế bởi sắc xanh ngọc bích êm đềm và sắc trắng tinh khôi của hoa tiên',
      auditory: 'Tiếng nổ rầm trời và tiếng lửa gào thét biến mất, thay bằng tiếng suối mát tuôn róc rách và tiếng chim tiên hót ca thanh bình',
      olfactory: 'Mùi khét lẹt nồng nặc và mùi lưu huỳnh biến thành hương hoa quỳnh dịu ngọt và hương thông trầm thanh khiết',
      tactile: 'Cơn nóng như thiêu như đốt biến thành luồng gió mát mơn man, dễ chịu như đang đắm mình trong dòng suối tiên đầu xuân',
      emotionalAtmosphere: 'Kỳ diệu, giải thoát, thanh thản và tôn kính vô biên trước phép màu cải tử hoàn sinh của tự nhiên'
    },
    authorPlotHooks: [
      'Gỗ của cây thần mộc mọc từ đống tro tàn có khả năng miễn nhiễm với vạn hỏa và ma chướng trong thiên hạ.',
      'Sự tái sinh kỳ diệu này khiến vị Ma Hoàng đã phóng hỏa diệt thành phải khiếp đảm trước sinh mệnh đại đạo mà lui binh.',
      'Kinh thành sau khi tái sinh được đổi tên thành Trường Sinh Kinh, trở thành trung tâm giao thương đan dược lớn nhất lục địa.'
    ],
    masterProseExcerpt:
      'Biển lửa đỏ rực và ngọn ma hỏa tím đen đang chực nuốt chửng những dấu tích văn minh cuối cùng của Đại Viêm Cổ Kinh. Đúng lúc ấy, một hạt giống nhỏ bé như hạt ngọc bích rơi xuống từ đỉnh trời giáng thế. Không một ngọn lửa nào có thể thiêu rụi nó; trái lại, khi hạt giống chạm vào lòng đất tro tàn, một đóa sen băng tinh ngọc bích bung nở xoay tròn lộng lẫy. Một luồng sinh khí mát rượi quét qua mười dặm phố xá, ngọn lửa hung hãn tức thì lụi tàn như gặp phải khắc tinh thiên cổ. Từ lòng đất cháy sém, một cây Bất Lão Thần Mộc vươn cao ngút ngàn, xòe tán lá ngọc xum xuê che phủ cả kinh thành. Vết cháy đen trên các cung điện được phủ kín bởi ngàn vạn đóa hoa tường vi ngọc bích, tàn lửa bay rợp trời biến thành hàng triệu đốm lân tinh xanh dịu dàng. Giữa không gian tịch mịch sau cơn đại kiếp, tiếng chim thần cất lên khúc nhạc thái bình, thắp lại ngọn lửa hi vọng cho muôn triệu con người vừa bước qua cửa tử.',
    readyToInsertProseSnippet:
      'Hạt trường sinh rơi thẳng vào biển lửa đang thiêu rụi kinh thành, hóa thành đóa sen băng ngọc bích dập tắt hoàn toàn ma hỏa dữ dội. Thần mộc ngàn trượng vươn cao từ tro tàn, biến phố xá cháy rụi thành rừng hoa tiên rực rỡ, tàn lửa biến thành triệu đốm sao xanh thanh bình.',
    longevitySeedRevival: {
      seedName: 'Tạo Hóa Băng Diệp Tiên Chủng',
      descentPhenomenon: 'Hạt giống lơ lửng giáng thế giữa màn khói đen đặc quánh, tỏa ánh sáng xanh băng tuyết xé toạc màn đêm rực lửa.',
      momentOfTouchingGround: 'Chạm xuống nền tro than đỏ rực, một đóa sen ngọc bích bung nở, dập tắt ngọn lửa hung tợn trong chớp mắt.',
      rootingAndPurification: 'Rễ cây hấp thụ toàn bộ tàn dư hỏa độc và tro tàn làm dưỡng chất, làm mát nền đất đá đang sôi sục.',
      sproutingAndCanopyBloom: 'Cổ mộc vươn cao mười dặm, lá ngọc che chở cung điện, hoa quỳnh tiên nở rộ phủ kín mọi vết tích cháy sém.',
      revivedSensoryAtmosphere: {
        visual: 'Ánh xanh ngọc bích dịu mắt thay thế biển lửa hung tàn; hoa trắng nở rộ khắp phố xá; đom đóm xanh bay rợp trời.',
        auditory: 'Tiếng lửa rít biến thành tiếng suối tiên reo vui; tiếng chim thần hót ríu rít giữa cành cây cao.',
        olfactory: 'Mùi khét lẹt biến mất, thay bằng hương hoa tường vi và ngọc lan thanh khiết sảng khoái.',
        tactile: 'Không khí mát rượi như đầu thu, làn gió xua tan hơi nóng bỏng rát, làm dịu vết bỏng trên da thịt người dân.'
      },
      mortalAndSurvivorMiracle: 'Bách tính ngã quỵ vì ngạt khói bỗng tỉnh lại khỏe khoắn, ngỡ ngàng rơi lệ trước kỳ tích kinh đô tái sinh từ tro tàn.',
      masterRevivalProseExcerpt: 'Hạt trường sinh dập tắt biển lửa ma hỏa, khai sinh cổ kinh từ lớp xỉ than hoang tàn. Thần mộc ngàn trượng vươn cao, đưa kinh đô bước vào thời đại thái bình thịnh thế vĩnh hằng.',
      readyToInsertRevivalSnippet: 'Từ tâm chấn biển lửa hung tàn, hạt giống trường sinh nẩy mầm dập tắt ma hỏa và tro tàn. Thần mộc chọc trời tỏa bóng mát mười dặm, phủ kín vết cháy bằng hoa tiên rực rỡ, hồi sinh đô thành từ cõi chết.'
    }
  }
];

// Helper functions for category metadata & filtering
export interface DisasterRuinsCategoryMeta {
  category: DisasterRuinsCategory;
  label: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export const DISASTER_RUINS_CATEGORIES_META: Record<DisasterRuinsCategory, DisasterRuinsCategoryMeta> = {
  HOANG_TAN_CHIEN_TRUONG: {
    category: 'HOANG_TAN_CHIEN_TRUONG',
    label: 'Hoang Tàn Sau Cuộc Chiến',
    icon: '⚔️',
    color: '#ef4444',
    badgeBg: 'bg-red-950/80',
    badgeBorder: 'border-red-500/50',
    badgeText: 'text-red-300',
    description: 'Chiến trường vạn cổ hoang tàn, binh khí rỉ sét, xác xe gãy vụn, quạ đen kêu thảm thiết và khói tàn linh lực'
  },
  LANG_MAC_HAN_HAN: {
    category: 'LANG_MAC_HAN_HAN',
    label: 'Làng Mạc Thiên Tai - Hạn Hán',
    icon: '☀️',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/80',
    badgeBorder: 'border-amber-500/50',
    badgeText: 'text-amber-300',
    description: 'Đất nứt toác chân chim, giếng cạn trơ bùn khô, lúa cháy sém, người dân bới rễ cây, gió nóng bỏng rát'
  },
  LANG_MAC_NGAP_LUT: {
    category: 'LANG_MAC_NGAP_LUT',
    label: 'Làng Mạc Thiên Tai - Ngập Lụt',
    icon: '🌊',
    color: '#38bdf8',
    badgeBg: 'bg-blue-950/80',
    badgeBorder: 'border-blue-500/50',
    badgeText: 'text-blue-300',
    description: 'Nước lũ cuộn trào đỏ ngầu, mái tranh dập dềnh trôi dạt, mưa bão mịt mù, tiếng gào khóc trên ngọn cổ thụ'
  },
  THANH_TRI_SUP_DO: {
    category: 'THANH_TRI_SUP_DO',
    label: 'Thành Trì Sụp Đổ & Phá Trận',
    icon: '🏛️',
    color: '#a8a29e',
    badgeBg: 'bg-stone-950/80',
    badgeBorder: 'border-stone-500/50',
    badgeText: 'text-stone-300',
    description: 'Tường thành vạn trượng đổ ụp như cát lở, trận pháp hộ thành nứt vỡ như lưu ly, lầu gác sập đổ, bụi đất che nhật nguyệt'
  },
  THANH_TRI_CHAY_NO: {
    category: 'THANH_TRI_CHAY_NO',
    label: 'Thành Trì Cháy Nổ & Biển Lửa',
    icon: '🔥',
    color: '#f97316',
    badgeBg: 'bg-orange-950/80',
    badgeBorder: 'border-orange-500/50',
    badgeText: 'text-orange-300',
    description: 'Biển lửa thiêu rụi phố xá, kho lôi hỏa phát nổ kinh hoàng, ma hỏa tím đen bốc cháy, tro than bay rợp trời'
  },
  TRUONG_SINH_HOI_SINH: {
    category: 'TRUONG_SINH_HOI_SINH',
    label: 'Hạt Trường Sinh Hồi Sinh',
    icon: '🌱',
    color: '#10b981',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-300',
    description: 'Hạt cây trường sinh rơi xuống đất chết, đâm chồi nẩy lộc, đại thụ ngàn trượng hồi sinh vạn vật từ tro tàn, hạn hán, lũ lụt và gạch vụn'
  }
};

export function getDisasterRuinsSceneById(id: string): DisasterRuinsScene | undefined {
  return PRESET_DISASTER_RUINS_SCENES.find(s => s.id === id);
}

export function filterDisasterRuinsScenes(
  category: string = 'all',
  searchQuery: string = ''
): DisasterRuinsScene[] {
  return PRESET_DISASTER_RUINS_SCENES.filter(s => {
    const matchesCategory = category === 'all' || s.category === category;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.alias.toLowerCase().includes(q) ||
      s.locationName.toLowerCase().includes(q) ||
      s.realmOrRegion.toLowerCase().includes(q) ||
      s.sceneryDescription.toLowerCase().includes(q) ||
      s.masterProseExcerpt.toLowerCase().includes(q)
    );
  });
}
