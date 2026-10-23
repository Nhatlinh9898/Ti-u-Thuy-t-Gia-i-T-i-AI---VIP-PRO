// =========================================================================
// DIỄN VÕ TU LUYỆN BẢO ĐIỂN (VÕ ĐẠO THẦN CƠ TOÀN THƯ)
// Kho tàng bối cảnh & phân cảnh chuyên sâu: Luyện Tập Võ Công, Công Pháp,
// Xạ Thuật (Cung Pháp), Thương Pháp (Kích Pháp), Luyện Thể & Thổ Nạp.
// Mô tả chi tiết từng tầng không gian, thời gian, kỹ thuật kình lực và tương tác tự nhiên.
// =========================================================================

export interface MartialTrainingScene {
  id: string;
  title: string;
  alias: string;
  category: 'Luyện Cung' | 'Luyện Thương' | 'Luyện Võ Công' | 'Luyện Công Pháp';
  weaponOrDiscipline: string; // Tên vũ khí hoặc tuyệt kỹ (Vạn Thạch Thần Cung, Bát Hoang Thương, Cương Quyền, v.v.)
  spaceAndTime: {
    timeOfDay: string;          // Thời khắc trong ngày: Rạng đông giờ Mão, chính ngọ giờ Ngọ, đêm khuya giờ Tý...
    seasonAndWeather: string;   // Tiết trời: Gió bấc tuyết rơi, mưa bão sấm sét, nắng chang chang thiêu đốt...
    locationAndAtmosphere: string; // Không gian & khí quyển: Chân thác nước ngàn trượng, đỉnh vách đá dựng đứng, rừng trúc u cốc...
  };
  trainingMotions: {
    stanceAndForm: string;      // Bộ pháp, mã bộ, thế đứng, phân bổ trọng tâm
    forceAndQiExecution: string;// Cách phát lực: Cương kình, thốn kình, kình lực xoắn ốc, chân khí lưu chuyển qua kinh mạch
    breathAndMentalFocus: string;// Hơi thở điều tức, định tâm, khẩu quyết tâm pháp, thần niệm khóa chặt
  };
  environmentalInteractions: string; // Tương tác với môi trường: Bọt nước thác bị chẻ đôi, lá rụng bị đâm trúng gân, tên xuyên tâm bia...
  sensoryDetails: {
    visual: string;   // Thị giác: Cơ bắp cuồn cuộn, mồ hôi đọng trên trán, tà áo bay phần phật, tia lửa lóe lên...
    auditory: string; // Thính giác: Tiếng dây cung bật tanh tách, tiếng thương xé gió rít gầm, tiếng thở trầm...
    tactile: string;  // Xúc giác: Cán gỗ ma sát nóng rát lòng bàn tay, lực giật dây cung cắt da, gió buốt...
    olfactory: string;// Khứu giác: Mùi mồ hôi mặn mòi, mùi thép nguội, mùi rêu ẩm ướt, khói trầm...
    gustatory: string;// Vị giác: Vị mặn của mồ hôi chảy vào môi, vị ngọt mát của ngụm nước suối sau buổi tập...
  };
  masterProseExcerpt: string; // Đoạn văn mẫu miêu tả hoàn chỉnh chất lượng văn học tuyệt tác
}

export const PRESET_MARTIAL_TRAINING_SCENES: MartialTrainingScene[] = [
  // =======================================================================
  // I. LUYỆN CUNG & XẠ THUẬT (ARCHERY TRAINING)
  // =======================================================================
  {
    id: 'train_bow_01_tuyet_dinh_xa_dieu',
    title: 'Hàn Phong Đoán Xạ • Tuyết Đỉnh Khai Cung Xạ Điêu',
    alias: 'Đứng Trên Đỉnh Núi Bão Tuyết Canh Ba Kéo Trọng Cung Ngàn Cân Bắn Chim Ưng',
    category: 'Luyện Cung',
    weaponOrDiscipline: 'Hắc Thiết Thần Cung ba ngàn cân lực & Thiết Vũ Tiễn tẩm dầu thông',
    spaceAndTime: {
      timeOfDay: 'Đêm khuya canh ba giờ Tý, trăng khuyết mờ ảo sau tầng mây tuyết xám bạc',
      seasonAndWeather: 'Đêm đông rét mướt cực độ, gió bấc gầm thét từng cơn giật tung bụi tuyết trắng xóa mù mịt',
      locationAndAtmosphere: 'Mỏm đá "Ưng Chủy Nham" nhô ra giữa vực thẳm sâu vạn trượng trên đỉnh Tuyết Lĩnh hoang vu'
    },
    trainingMotions: {
      stanceAndForm: 'Hai chân đứng thế Trung Bình Tấn vững chãi như rễ tùng cổ thụ cắm sâu vào đá tảng phủ băng tuyết; hai vai mở rộng ngang bằng, lưng thẳng như ngọn thương cắm trời.',
      forceAndQiExecution: 'Chân khí từ đan điền dồn xuống huyệt Dũng Tuyền bám chặt lấy đá, rồi theo xương sống truyền lên hai cánh tay; cánh tay trái đẩy cung như đẩy núi, cánh tay phải kéo dây như kéo trăng rằm, kình lực phát ra từ eo và lưng tạo thành một thể thống nhất.',
      breathAndMentalFocus: 'Hơi thở chầm chậm lắng xuống đáy đan điền, mắt nhắm hờ để tâm linh thay thế thị giác; khóa chặt quỹ đạo bay của con ưng tuyết giữa luồng gió lốc mù mịt.'
    },
    environmentalInteractions: 'Mỗi lần dây cung rung lên phát ra tiếng nổ đanh gọn "Băng!", luồng kình phong xé toạc màn tuyết rơi tạo thành một đường hầm chân không dài hàng chục trượng; mũi thiết tiễn bắn xuyên qua tâm bia đá dày nửa thước cắm sâu ngập tận đuôi tên.',
    sensoryDetails: {
      visual: 'Gân xanh trên mu bàn tay và cánh tay chàng nổi cuồn cuộn như những con trăn nhỏ, mồ hôi từ trán chảy xuống chóp mũi lập tức đóng thành hạt băng nhỏ li ti.',
      auditory: 'Tiếng gió rít qua khe núi hú dài ghê rợn, tiếng dây cung bằng gân rồng bật tanh tách giòn giã át cả tiếng gió bão.',
      tactile: 'Cán cung bằng gỗ dâu rừng lạnh buốt như băng cắt vào da thịt, nhưng ở lòng bàn tay lại tỏa ra nhiệt lượng nóng rực do chân khí cuồn cuộn.',
      olfactory: 'Mùi lạnh tanh của tuyết băng quyện với mùi hăng nồng của dầu thông quét trên thân tiễn.',
      gustatory: 'Vị mằn mặn của giọt mồ hôi lẫn hơi nước tuyết tan chảy vào khóe môi khô nứt nẻ.'
    },
    masterProseExcerpt: `Đêm canh ba trên đỉnh Ưng Chủy Nham, gió bấc gầm thét như vạn con thú dữ đói mồi.

Tuyết rơi mù mịt che khuất cả ánh trăng khuyết mờ ảo. Giữa mỏm đá chênh vênh ngàn trượng chực sụp đổ bất cứ lúc nào, Tiêu Cảnh mình trần đứng thế trung bình tấn, hai bàn chân cắm ngập vào lớp băng dày như hai chiếc cọc sắt cắm sâu vào lòng núi.

Cả thân hình chàng căng tràn như một bức tượng đồng đen bóng. Chàng nâng chiếc Hắc Thiết Cung nặng ba ngàn cân bằng cánh tay trái cứng cáp, tay phải rút một mũi Thiết Vũ Tiễn kẹp chặt vào dây cung bện bằng gân rồng cổ thụ.

"Hô..."

Chàng thở ra một làn khói trắng dài như dải lụa. Toàn bộ tạp niệm trong đầu chàng lập tức biến mất, nhịp tim chậm dần, chỉ còn lại tiếng gió gầm và một bóng đen của con thiết ưng đang chao liệng giữa màn bão tuyết xa tít ngoài trăm trượng.

Cánh tay chàng phát lực! Bắp thịt cuộn lên rắn chắc như sắt nguội, sống lưng uốn cong truyền lực lên vai. Cánh cung ngàn cân từ từ bị kéo căng thành một vầng trăng tròn vành vạnh.

"Buông!"

"Băng!"

Một tiếng nổ đanh thép vang lên xé toạc không gian. Dây cung bật mạnh làm tuyết bụi xung quanh chàng bắn tung tóe thành một làn sóng sương mù hình phễu. Mũi tên xé gió lao vút đi với tốc độ kinh hồn, vạch một đường hầm chân không xuyên thẳng qua màn bão tuyết mù mịt, cắm ngập vào giữa tâm bia đá cách đó ba trăm bước. 

Tảng đá dày nửa thước nổ tung thành muôn mảnh vụn. Tiêu Cảnh thở phào một hơi dài, buông lỏng ngón tay đang rỉ một giọt máu tươi, nhưng ánh mắt chàng sáng quắc tựa như hai vì sao băng rực cháy giữa trời đông băng giá.`
  },
  {
    id: 'train_bow_02_sa_mac_truc_nhat',
    title: 'Liệt Dương Xạ Thuật • Đại Mạc Hoàng Hôn Liên Châu Tiễn',
    alias: 'Hoàng Hôn Sa Mạc Nắng Gắt Cát Bay Kéo Cung Bắn Liên Châu Tam Tiễn',
    category: 'Luyện Cung',
    weaponOrDiscipline: 'Kim Giác Thần Cung & Xích Đồng Linh Tiễn',
    spaceAndTime: {
      timeOfDay: 'Buổi chiều tà hoàng hôn chuyển sang chạng vạng, ánh tà dương đỏ ối rọi rực trời đất',
      seasonAndWeather: 'Gió sa mạc cuốn theo những cơn lốc cát vàng mù mịt, nhiệt độ chuyển từ thiêu đốt sang se lạnh',
      locationAndAtmosphere: 'Cồn cát khổng lồ cao hàng trăm trượng giữa lòng đại sa mạc Cực Bắc mênh mông vô tận'
    },
    trainingMotions: {
      stanceAndForm: 'Bộ pháp thoăn thoắt di chuyển trên cát lún không để lại dấu chân sâu, vừa chạy nghiêng người vừa giương cung ngắm bắn (Kỵ Xạ Bộ Pháp).',
      forceAndQiExecution: 'Chân khí Hỏa hệ kích phát dọc kinh lạc Tam Âm Tam Dương ở cánh tay, truyền vào thân tên tạo thành ngọn lửa bao bọc mũi tên nhọn hoắt.',
      breathAndMentalFocus: 'Khẩu quyết "Tâm Nhược Chỉ Thủy, Tiễn Khí Như Hồng"; bắn liên tiếp ba mũi tên trong vòng một nhịp thở mà không cần nhìn bằng mắt thường.'
    },
    environmentalInteractions: 'Ba mũi tên bay theo ba đường cong khác nhau rồi cùng lúc bắn trúng một chiếc bình gốm treo trên cành cây khô cách xa hai trăm bộ, làm chiếc bình nổ tung thành cát bụi bốc cháy.',
    sensoryDetails: {
      visual: 'Ánh tà dương dát một màu đỏ rực như máu lên vạt áo chiến bào rách mép, ba vệt lửa đỏ bay vun vút giữa bầu trời cát vàng cuồn cuộn.',
      auditory: 'Tiếng dây cung bật liên hồi "Pằng! Pằng! Pằng!" đanh gọn như tiếng roi da quất vào không khí, tiếng gió sa mạc gầm gừ.',
      tactile: 'Cát nóng táp vào mặt rát bỏng, đầu ngón tay kéo dây cung bị ma sát đến mức bốc lên mùi da khét nhẹ.',
      olfactory: 'Mùi cát khô rang dưới nắng gắt quyện với mùi lưu huỳnh từ mũi tên lửa cháy xèo xèo.',
      gustatory: 'Cổ họng khô khát cháy bỏng, hạt cát lạo xạo trên kẽ răng.'
    },
    masterProseExcerpt: `Hoàng hôn buông xuống đại sa mạc Huyết Sa, nhuộm đỏ rực từng đợt sóng cát vàng cuồn cuộn.

Gió sa mạc gầm rít cuốn theo từng đám bụi mù mịt táp rát cả da mặt. Trên đỉnh cồn cát dốc đứng, bóng dáng Tiêu Cảnh thoăn thoắt lướt đi trên mặt cát mịn như một con linh miêu săn mồi, bước chân chàng nhẹ bẫng đến mức cát lún cũng chẳng kịp giữ lại dấu chân.

"Vút!"

Chàng đột ngột xoay người một trăm tám mươi độ trên không, bàn tay thoăn thoắt vươn ra sau lưng rút ba mũi Xích Đồng Tiễn đặt cùng lúc lên rãnh Kim Giác Cung. Chân khí nóng rực từ đan điền chàng bùng nổ, truyền thẳng vào thân tên khiến ba mũi tên bốc cháy thành ba ngọn lửa đỏ rực.

"Pằng! Pằng! Pằng!"

Ba tiếng dây cung nổ vang liên tiếp như tiếng sấm nổ ngang tai. Ba vệt lửa đỏ xé tan màn bụi cát bay mù mịt, vẽ nên ba đường cong kỳ diệu giữa không trung rồi cùng một tích tắc găm thẳng vào chiếc bình gốm treo lơ lửng trên cành cây khô cách đó hai trăm bộ.

"Oanh!"

Chiếc bình gốm nổ tung thành trăm mảnh gốm vụn bốc cháy ngùn ngụt rơi lả tả xuống cát nóng. Tiêu Cảnh tiếp đất nhẹ nhàng trên bờ cát lún, lồng ngực phập phồng thở dốc, mồ hôi ướt đẫm tấm áo vải thô. Chàng nhìn ngắm vầng tà dương đỏ rực đang từ từ chìm xuống đường chân trời xa xăm, khóe môi khẽ nhếch lên một nụ cười ngạo nghễ.`
  },

  // =======================================================================
  // II. LUYỆN THƯƠNG & BÁ KHÍ KÍCH PHÁP (SPEAR / LANCE TRAINING)
  // =======================================================================
  {
    id: 'train_spear_01_thac_lu_nghich_thuy',
    title: 'Nghịch Thủy Phá Lãng • Chân Thác Nghìn Trượng Đoán Thương',
    alias: 'Đứng Giữa Dòng Thác Đổ Ầm Ầm Vung Thương Đâm Nát Bọt Nước Ngược Dòng',
    category: 'Luyện Thương',
    weaponOrDiscipline: 'Bá Vương Huyền Thiết Thương nặng chín trăm cân & Thập Tam Thức Bạo Long Thương',
    spaceAndTime: {
      timeOfDay: 'Sáng sớm tinh mơ giờ Dần chuyển sang giờ Mão, sương mai mờ mịt bao trùm hẻm núi',
      seasonAndWeather: 'Mùa hè mùa nước lũ, dòng nước đầu nguồn cuồn cuộn đổ về mang theo ngàn cân áp lực',
      locationAndAtmosphere: 'Chân thác nước Long Đầu đổ từ vách núi cao ba trăm trượng xuống vực sâu thăm thẳm'
    },
    trainingMotions: {
      stanceAndForm: 'Hai chân đứng hình chữ Đinh trên phiến đá trơn trượt phủ đầy rêu xanh giữa dòng nước xiết, trọng tâm hạ thấp dồn xuống gót chân.',
      forceAndQiExecution: 'Kình lực bắt đầu từ ngón chân cái, truyền qua đầu gối, xoay hông, mở vai, dồn toàn bộ sức mạnh vào mũi thương đâm thẳng ra; phát ra "Thương Kình Xoắn Ốc" xoáy nát dòng nước.',
      breathAndMentalFocus: 'Hít sâu nén khí vào bụng dưới, khi đâm thương hét lên một tiếng sấm sét "Sát!" để phóng xuất toàn bộ uy lực tiềm tàng.'
    },
    environmentalInteractions: 'Hàng ngàn tấn nước từ trên đỉnh thác dội thẳng xuống đầu, nhưng mũi thương đâm ra tạo thành một cột khí hình nón đẩy ngược dòng nước đổ ngược lên trời cao ba thước.',
    sensoryDetails: {
      visual: 'Bọt nước trắng xóa bắn tung tóe mù mịt như mưa rào, cơ bắp lưng và cánh tay chàng bóng nhẫy dưới làn nước lạnh, từng đường gân nổi rõ như dây thừng.',
      auditory: 'Tiếng thác đổ ầm ầm như vạn cỗ xe đồng nghiền nát đá tảng, tiếng mũi thương xé gió rít lên chói tai "Vù vù vù".',
      tactile: 'Áp lực ngàn cân của dòng nước dội vào vai lưng nặng như mang núi đá, cán thương bằng gỗ thiết mộc ma sát trơn tuột đòi hỏi lực nắm cực lớn.',
      olfactory: 'Mùi rêu đá ướt át nồng nàn quyện với hơi nước khoáng thanh mát của núi rừng hoang dã.',
      gustatory: 'Vị nước suối mát lạnh ngọt lịm bắn vào khóe miệng xua tan đi cơn nóng bức trong kinh mạch.'
    },
    masterProseExcerpt: `Dưới chân thác Long Đầu, hàng vạn tấn nước từ vách đá dựng đứng ba trăm trượng đang điên cuồng dội xuống lòng vực như một con rồng trắng gầm thét long trời lở đất.

Giữa dòng nước xiết cuồn cuộn bọt trắng xóa, Tiêu Cảnh mình trần đứng sừng sững trên một tảng đá trơn nhẵn phủ đầy rêu xanh. Nước thác đập chan chát vào bờ vai vạm vỡ của chàng, chảy tràn qua những vết sẹo chiến tích phong trần.

Trên hai tay chàng, chiếc Huyền Thiết Thương dài một trượng hai, nặng chín trăm cân đang rung lên bần bật.

"Một ngàn ba trăm lẻ một!"

"Hự!"

Tiêu Cảnh hét lớn một tiếng, cánh tay gân guốc phát lực dữ dội. Chàng xoay hông, mũi thương đen nhánh chớp mắt đâm vút ra phía trước. Mũi thương xoay tròn với tốc độ kinh hoàng, tạo nên một luồng kình phong hình phễu xoắn ốc xé toạc màn nước dội xuống.

"Oanh!"

Một tiếng nổ vang dội giữa lòng thác. Dòng nước khổng lồ đổ từ trên cao bỗng chốc bị nhát thương của chàng đâm đứt đoạn, bọt nước bắn tung tóe ngược lên trời cao ba thước để lộ ra khoảng không trống rỗng trong chớp mắt.

"Chưa đủ! Còn chậm nửa khắc!"

Chàng nghiến răng, thu thương về ngang hông rồi lại đâm ra nhát thứ hai, thứ ba... Mũi thương đâm ra liên hoàn như hoa lê nở rộ giữa màn mưa thác. Nước bão dẫu mạnh, cũng không ngăn nổi ngọn lửa ý chí sục sôi đang tôi luyện nên một bậc Bá Thương lừng danh thiên hạ.`
  },
  {
    id: 'train_spear_02_phong_dinh_doan_nhai',
    title: 'Liệt Phong Tảo Thạch • Tuyệt Bích Phong Đỉnh Luyện Thương Ý',
    alias: 'Đứng Trên Đỉnh Vách Đá Gió Cuộn Vung Thương Quét Nát Cương Phong Đâm Gân Lá',
    category: 'Luyện Thương',
    weaponOrDiscipline: 'Ngân Long Du Thân Thương & Bát Hoang Liệt Phong Thương Quyết',
    spaceAndTime: {
      timeOfDay: 'Chiều tà khi ráng đỏ nhuộm tím các tầng mây cuồn cuộn dưới chân vực',
      seasonAndWeather: 'Gió thu gào rít lồng lộng, không khí loãng và khô lạnh trên độ cao ngàn trượng',
      locationAndAtmosphere: 'Mỏm đá phẳng như lưỡi kiếm chém ngang trên đỉnh Tuyệt Kiếm Phong hoang vu'
    },
    trainingMotions: {
      stanceAndForm: 'Thân hình uyển chuyển như rồng lượn, bước chân lướt theo Lục Hợp Bát Quái Bộ, thương và người hòa làm một.',
      forceAndQiExecution: 'Chân khí ngưng tụ thành một tấc mũi nhọn vô hình nơi đầu thương (Thương Mang), phát ra tiếng rít xé rách không gian.',
      breathAndMentalFocus: 'Khẩu quyết "Thương Nhược Du Long, Khí Quán Trường Hồng"; ý niệm hợp nhất với gió trời, mượn gió để gia tăng tốc độ xuất thương.'
    },
    environmentalInteractions: 'Hàng ngàn chiếc lá ngô đồng vàng bị gió cuốn bay ngang qua đỉnh núi đều bị mũi thương chàng đâm thủng chính xác từng đường gân lá mà không làm rách mép lá.',
    sensoryDetails: {
      visual: 'Mũi thương bạc phát ra ánh hào quang chói lòa như ngàn con đốm bạc bay lượn, vạt áo bào tung bay phần phật trước gió lộng.',
      auditory: 'Tiếng cán thương vung chém gió rít lên "Vút! Vút!" như tiếng rồng ngâm, tiếng sỏi đá vỡ vụn dưới chân.',
      tactile: 'Cán thương đàn hồi uốn cong như cánh cung rồi bật thẳng lại truyền lực rung chuyển vào hai khớp cổ tay.',
      olfactory: 'Mùi đá hoa cương vỡ vụn bốc mùi khét nhẹ của ma sát kình lực.',
      gustatory: 'Cảm giác khô khan nơi cuống họng khi hít thở bầu không khí loãng trên đỉnh mây.'
    },
    masterProseExcerpt: `Hoàng hôn nhuộm đỏ rực đỉnh Tuyệt Kiếm Phong. Gió núi gầm rít như muốn cuốn phăng vạn vật xuống đáy vực sâu muôn trượng.

Đứng trên mỏm đá phẳng chênh vênh giữa biển mây, Tiêu Cảnh tay cầm Ngân Long Thương đứng im lìm như hóa đá. Gió thổi tung mái tóc đen dài và vạt áo bào phần phật, nhưng thân hình chàng vẫn vững như bàn thạch.

Bỗng nhiên, một cơn gió lốc cuốn theo hàng trăm chiếc lá ngô đồng vàng rực từ thung lũng bay thốc lên đỉnh núi.

"Xoạt!"

Ngân Long Thương trên tay chàng đột ngột chuyển động! Thân hình chàng hóa thành một vệt tàn ảnh mờ ảo, cán thương bạc uốn cong thành một dải cầu vồng sáng lóa. Mũi thương đâm, quét, điểm, đập... liên hoàn biến hóa khôn lường tựa như một con rồng bạc đang vùng vẫy giữa biển mây.

"Keng! Keng! Keng!"

Mũi thương đâm ra nhanh đến mức mắt thường không thể phân biệt. Mỗi một nhát thương đâm ra đều chuẩn xác xuyên qua cuống của một chiếc lá ngô đồng đang bay lộn xộn trong gió lốc. Khi chàng thu thương đứng thẳng người, hàng chục chiếc lá ngô đồng vàng xâu thành một chuỗi trên mũi thương, từng chiếc một đều bị đâm thủng đúng gân lá trung tâm mà mép lá không hề rách nát.

Ánh tà dương rọi xuống mũi thương bạc lấp lánh, phản chiếu ánh mắt sắc bén như chim ưng của chàng. Đó không còn chỉ là chiêu thức võ công đơn thuần, mà đã bắt đầu chạm tới cánh cửa huyền vi của Thương Ý cảnh giới.`
  },

  // =======================================================================
  // III. LUYỆN VÕ CÔNG & QUYỀN CƯỚC LUYỆN THỂ (MARTIAL ARTS / BODY TEMPERING)
  // =======================================================================
  {
    id: 'train_fist_01_dung_nham_thoi_cot',
    title: 'Hỏa Luyện Kim Cương • Nham Đầm Độc Tọa Đấm Nát Dung Nham',
    alias: 'Giữa Trưa Nắng Gắt Miệng Núi Lửa Luyện Cương Quyền Đấm Vỡ Cự Thạch',
    category: 'Luyện Võ Công',
    weaponOrDiscipline: 'Bách Luyện Kim Cang Quyền & Thốn Kình Phá Cốt Quyết',
    spaceAndTime: {
      timeOfDay: 'Chính ngọ giờ Ngọ, mặt trời đứng bóng nhiệt hỏa đỉnh thịnh nhất trong ngày',
      seasonAndWeather: 'Mùa hè khô hạn gay gắt, không khí bốc khói mờ mờ vì hơi nóng bỏng rát',
      locationAndAtmosphere: 'Miệng ngọn núi lửa đang âm ỉ sủi bọt dung nham đỏ rực sền sệt'
    },
    trainingMotions: {
      stanceAndForm: 'Mã bộ trầm hùng, hai bàn chân cắm chặt xuống nền đá bazan đen bóng, hai nắm đấm thu về ngang sườn ngực.',
      forceAndQiExecution: 'Chân khí cuồn cuộn như dòng nham thạch nóng bỏng chảy dọc theo kinh mạch cánh tay; kình lực phát ra trong cự ly một tấc (Thốn Kình) nổ vang như sấm sét.',
      breathAndMentalFocus: 'Khẩu quyết "Ngoại Luyện Cân Cốt Bì, Nội Luyện Nhất Hỗn Khí"; chịu đựng sức nóng thiêu đốt da thịt để tôi luyện gân cốt kim cang.'
    },
    environmentalInteractions: 'Mỗi cú đấm vung ra không chạm vào tảng đá nhưng kình phong thấu cốt đã làm nứt toác phiến đá hoa cương dày ba thước thành trăm mảnh vụn.',
    sensoryDetails: {
      visual: 'Làn khói trắng bốc lên nghi ngút từ da thịt đỏ ửng như sắt nung của chàng, mồ hôi vừa túa ra lập tức bốc hơi xèo xèo.',
      auditory: 'Tiếng nắm đấm xé gió nổ đôm đốp "Phanh! Phanh!" như tiếng pháo cối nổ giòn giã giữa lòng núi lửa.',
      tactile: 'Hơi nóng hừng hực phả vào mặt cay xè, các đốt ngón tay chai sần cứng như thép nguội va đập đau rát nhưng tràn đầy sức mạnh.',
      olfactory: 'Mùi lưu huỳnh nồng nặc cháy khét quyện với mùi đá nung nóng bốc hơi.',
      gustatory: 'Miệng đắng ngắt vì hít phải khí nóng khô khan của nham thạch.'
    },
    masterProseExcerpt: `Chính ngọ, miệng núi lửa Hỏa Diệm Sơn như một chiếc lò bát quái khổng lồ đang sục sôi nham thạch đỏ rực.

Không khí nóng bỏng bốc lên ngùn ngụt làm méo mó cả không gian xung quanh. Giữa những phiến đá bazan đen nhánh nóng ran, Tiêu Cảnh chỉ mặc một chiếc khố thô, thân hình cuồn cuộn cơ bắp đỏ rực như một thỏi thép vừa vớt ra từ bể lửa.

Mồ hôi chàng tuôn ra như tắm, nhưng vừa chảy tới ngực đã bị hơi nóng thiêu đốt bốc thành làn khói trắng nghi ngút.

"Cương cực sinh nhu, nhu cực hóa kình!"

Chàng khẽ gầm lên một tiếng, lồng ngực phập phồng co thắt. Bàn chân phải dậm mạnh xuống nền đá làm mặt đất rung chuyển một nhịp. Nắm đấm phải của chàng từ bên sườn phóng vút ra phía trước, dừng lại cách bề mặt tảng đá hoa cương dày ba thước đúng một tấc.

"Thốn Kình! Phá!"

"Oanh!"

Một tiếng nổ trầm đục vang lên từ sâu bên trong lòng đá. Dù nắm đấm của chàng không hề chạm vào tảng đá, nhưng luồng kình lực xoắn ốc vô hình đã xuyên thấu qua lớp vỏ ngoài, đánh nát vụn toàn bộ kết cấu bên trong tảng đá. 

Vài tích tắc sau, tảng đá khổng lồ bỗng phát ra những tiếng răng rắc giòn giã rồi sụp đổ tan tành thành một đống bột đá mịn màng. Tiêu Cảnh thở phào một hơi dài mang theo hơi nóng rực, hai bàn tay chàng siết chặt lại, cảm nhận rõ từng thớ cơ và đốt xương đã được tôi luyện cứng rắn như kim cương bất hoại.`
  },
  {
    id: 'train_fist_02_han_dam_bang_phach',
    title: 'Hàn Băng Thấu Cốt • Cửu U Hàn Đàm Luyện Thân Cốt',
    alias: 'Đêm Đông Rét Mướt Ngâm Mình Dưới Hồ Băng Vận Kình Lực Đả Khai Huyệt Đạo',
    category: 'Luyện Võ Công',
    weaponOrDiscipline: 'Huyền Băng Đoán Thể Quyết & Du Thân Cầm Nã Thủ',
    spaceAndTime: {
      timeOfDay: 'Đêm khuya canh ba giờ Tý, trăng tròn chiếu rọi khắp mặt hồ đóng băng',
      seasonAndWeather: 'Đêm đông rét buốt giá tê tái, gió bấc thổi qua làm đông cứng cả hơi thở',
      locationAndAtmosphere: 'Hồ nước ngầm ngàn năm Hàn Đàm sâu thăm thẳm ẩn dưới lòng hang động băng tuyết'
    },
    trainingMotions: {
      stanceAndForm: 'Ngồi xếp bằng trên phiến băng trôi giữa lòng hồ, hai tay kết ấn Băng Phách, xương sống dựng thẳng tắp.',
      forceAndQiExecution: 'Chân khí từ đan điền vận hành ngược chiều dòng hàn khí thẩm thấu vào da thịt, dùng nội lực ép hàn độc ra ngoài đầu ngón tay.',
      breathAndMentalFocus: 'Khẩu quyết "Tâm Tĩnh Như Băng, Khí Trầm Đan Điền"; chịu đựng cảm giác đau đớn như ngàn vạn mũi kim châm vào xương tủy.'
    },
    environmentalInteractions: 'Hơi ấm từ thân thể chàng tỏa ra làm tan chảy lớp băng dày một thước xung quanh phiến đá, tạo thành một vòng xoáy nước ấm bốc khói mờ ảo giữa hồ băng lạnh ngắt.',
    sensoryDetails: {
      visual: 'Lớp sương băng phủ trắng xóa trên lông mày và mái tóc chàng, nhưng lồng ngực lại phát ra ánh sáng đỏ nhạt của khí huyết cuộn trào.',
      auditory: 'Tiếng băng nứt răng rắc dưới áp lực kình khí, tiếng nhịp tim đập trầm hùng vang vọng trong hang động tĩnh mịch.',
      tactile: 'Cảm giác buốt giá tê dại da thịt ban đầu dần chuyển thành cảm giác nóng ran ngứa ngáy khi kinh mạch được đả thông.',
      olfactory: 'Mùi nước băng nguyên sinh tinh khiết thanh tao không vướng bụi trần.',
      gustatory: 'Cổ họng ngọt mát thanh khiết sau khi nuốt từng ngụm hàn khí đã được tinh lọc.'
    },
    masterProseExcerpt: `Đêm khuya canh ba trong lòng Hàn Đàm Động, giá rét buốt lạnh thấu xương tủy.

Mặt hồ nước ngầm đã đóng một lớp băng dày trong suốt như ngọc. Nhưng ở chính giữa hồ, trên một phiến băng trôi nổi, Tiêu Cảnh đang ngồi xếp bằng bất động như một bức tượng băng. Hàn khí ngàn năm từ dưới đáy đầm bốc lên từng luồng khói trắng xóa, bao phủ lấy toàn bộ thân thể chàng.

Từng giọt sương băng đọng lại trên lông mày, mi mắt và mái tóc dài của chàng. Đôi môi chàng thâm tím lại vì lạnh, các khớp xương run lên bần bật.

"Vận khí! Không được phân tâm!"

Một giọng nói kiên định vang lên trong tâm trí chàng. Tiêu Cảnh cắn chặt răng, kích phát giọt tinh huyết thuần dương nơi đáy tim. Luồng khí ấm nóng lập tức bùng nổ, chảy tràn vào mười hai đường kinh chính và tám mạch kỳ kinh, điên cuồng đối kháng với luồng hàn độc đang xâm nhập vào tủy sống.

"Răng rắc!"

Tiếng xương cốt trong cơ thể chàng chuyển động nổ lách tách như tiếng đậu rang. Hơi nóng hừng hực từ lỗ chân lông chàng tỏa ra, làm lớp sương băng bám trên da thịt lập tức tan biến thành hơi nước. Mặt băng dày một thước xung quanh phiến đá chàng ngồi bỗng chốc rạn nứt thành muôn ngàn tia mạng nhện rồi tan chảy thành một vòng nước biếc bốc khói nghi ngút.

Chàng mở bừng đôi mắt, hai tia tinh quang lóe lên trong bóng tối như hai lưỡi kiếm sắc bén. Sau một đêm ngâm mình trong hàn đàm, thể phách của chàng đã hoàn toàn thoát thai hoán cốt, dẻo dai và bền bỉ hơn gấp mười lần trước kia.`
  },

  // =======================================================================
  // IV. LUYỆN CÔNG PHÁP & THỔ NẠP CHU THIÊN (CULTIVATION TECHNIQUES & QI)
  // =======================================================================
  {
    id: 'train_cultivation_01_tu_khi_dong_lai',
    title: 'Tử Khí Đông Lai • Nhật Xuất Tiên Phong Thổ Nạp Đại Điển',
    alias: 'Rạng Đông Giờ Mão Ngồi Xếp Bằng Đỉnh Núi Hít Thở Tiên Thiên Tử Khí',
    category: 'Luyện Công Pháp',
    weaponOrDiscipline: 'Hỗn Độn Thái Sơ Thổ Nạp Quyết & Đại Chu Thiên Kinh Mạch Vận Chuyển',
    spaceAndTime: {
      timeOfDay: 'Khoảnh khắc rạng đông giờ Mão, khi vầng thái dương vừa nhú lên một nửa nơi đường chân trời phía đông',
      seasonAndWeather: 'Tiết trời lập xuân trong lành mát rượi, sương sớm long lanh đọng trên ngọn cỏ',
      locationAndAtmosphere: 'Mỏm đá ngọc "Triều Dương Đài" cao vút trên đỉnh Cô Phong ngắm vạn dặm non sông cẩm tú'
    },
    trainingMotions: {
      stanceAndForm: 'Ngồi kiết già thế hoa sen, ngũ tâm triều thiên (hai lòng bàn tay, hai lòng bàn chân và đỉnh đầu hướng lên trời), thả lỏng toàn bộ cơ bắp.',
      forceAndQiExecution: 'Mở rộng ba trăm sáu mươi lăm huyệt đạo toàn thân, hút luồng tử khí màu tím mỏng manh từ ánh mặt trời mọc vào huyệt Bách Hội trên đỉnh đầu, dẫn xuống Đan Điền.',
      breathAndMentalFocus: 'Khẩu quyết "Thổ Cố Nạp Tân, Thiên Nhân Hợp Nhất"; hơi thở dài và sâu, một lần hít vào thở ra kéo dài đúng chín mươi chín nhịp đập tim.'
    },
    environmentalInteractions: 'Một luồng khí tím mờ ảo dài ba trượng từ chân trời phía đông tụ lại quanh người chàng như một chiếc kén tằm phát sáng, cỏ cây xung quanh bỗng chốc đâm chồi nẩy lộc xanh tươi.',
    sensoryDetails: {
      visual: 'Ánh nắng ban mai dát vàng lên tà áo đạo bào màu trắng, vầng hào quang tím nhạt xoay tròn sau gáy chàng như vầng nhật nguyệt thu nhỏ.',
      auditory: 'Tiếng chim rừng líu lo hót mừng bình minh từ xa xăm, tiếng chân khí chảy róc rách trong kinh mạch như tiếng suối ngọc reo.',
      tactile: 'Cảm giác ấm áp êm dịu lan tỏa từ đỉnh đầu xuống tận các đầu ngón chân, cơ thể nhẹ bẫng như muốn bay bổng lên mây.',
      olfactory: 'Hương thơm thanh khiết ngọt ngào của sương mai quyện với mùi nhựa thông non ngào ngạt.',
      gustatory: 'Miệng sinh tân dịch ngọt lịm như nước cam lộ ngấm vào cuống họng.'
    },
    masterProseExcerpt: `Giờ Mão, vầng thái dương đỏ ối vừa hé rạng nơi chân trời phía đông, xé toạc màn sương mù dày đặc bao phủ khắp chín tầng non xanh.

Trên mỏm đá ngọc Triều Dương Đài cao vút trên đỉnh Cô Phong, Tiêu Cảnh ngồi xếp bằng theo thế ngũ tâm triều thiên. Tà áo đạo bào màu nguyệt bạch của chàng khẽ bay lướt thướt theo làn gió sớm trong lành.

Đúng khoảnh khắc tia nắng đầu tiên chiếu rọi nhân gian, một dải hào quang màu tím mỏng manh như sợi tơ trời – Tiên Thiên Tử Khí – từ phương đông bỗng chốc vạch không bay tới.

"Hít..."

Tiêu Cảnh khẽ hé mở cánh môi, hít sâu một hơi dài. 

Sợi tử khí huyền diệu kia lập tức bị hút vào qua đường mũi chàng, lướt qua huyệt Thiên Môn rồi theo Đốc Mạch chảy thẳng xuống Đan Điền. Luồng khí tức ấm áp vô biên tràn ngập khắp kinh mạch, quét sạch mọi tạp chất và sát khí u uất tích tụ nơi sa trường.

Chân khí trong cơ thể chàng bắt đầu vận chuyển theo quỹ đạo Đại Chu Thiên. Từng vòng, từng vòng một xoay chuyển nhịp nhàng như nhật nguyệt tuần hoàn. Sau lưng chàng, một luồng hào quang tím nhạt hình bát quái từ từ hiện rõ, tỏa ra ánh sáng ấm áp bao bọc lấy cả mỏm đá ngọc. 

Cỏ dại mọc quanh phiến đá nhờ hấp thụ linh khí tản mạn bỗng chốc đâm chồi nẩy lộc, nở bung những đóa hoa trắng muốt ngát hương. Khi chàng từ từ mở mắt, đồng tử chàng đã ánh lên sắc tím huyền bí, thần quang nội liễm, cả thân hình tỏa ra phong thái ung dung thoát tục của bậc đại tông sư đắc đạo.`
  },
  {
    id: 'train_cultivation_02_loi_dinh_pha_canh',
    title: 'Cửu Thiên Dẫn Lôi • Lôi Đình Phá Bình Cảnh Đan Điền',
    alias: 'Đêm Bão Giông Sấm Sét Rền Trời Đứng Trên Đỉnh Núi Dẫn Thiên Lôi Đột Phá Đại Cảnh Giới',
    category: 'Luyện Công Pháp',
    weaponOrDiscipline: 'Cửu Tiêu Lôi Đình Hóa Kiếp Quyết & Phá Cảnh Kim Đan',
    spaceAndTime: {
      timeOfDay: 'Đêm khuya giông bão sấm chớp giật liên hồi, mây đen cuồn cuộn ép sát đỉnh núi',
      seasonAndWeather: 'Mưa bão cuồng phong sấm sét xé toạc màn đêm, không khí tích điện tanh nồng mùi ozone',
      locationAndAtmosphere: 'Đỉnh Lôi Nhai trơ trọi toàn đá đen bị sét đánh cháy xém ngàn năm'
    },
    trainingMotions: {
      stanceAndForm: 'Đứng sừng sững hai tay giơ thẳng lên trời như hai cột thu lôi, toàn thân thả lỏng không một chút e sợ.',
      forceAndQiExecution: 'Chân khí ngưng tụ thành một vòng xoáy lôi điện trong đan điền, chủ động câu thông với từ trường sấm sét trên chín tầng mây.',
      breathAndMentalFocus: 'Khẩu quyết "Lấy Thân Hóa Lôi, Lấy Lôi Phá Kiếp"; tinh thần tập trung cao độ để dung hợp sấm sét thiên địa vào căn cơ tu vi.'
    },
    environmentalInteractions: 'Một tia sét bạc khổng lồ từ trên trời đánh thẳng vào đỉnh đầu chàng, truyền xuống đất làm nổ tung phiến đá xung quanh thành hố sâu ba trượng.',
    sensoryDetails: {
      visual: 'Tia chớp bạc chói lòa làm bừng sáng cả một vùng trời đêm, những tia điện xanh tím nhảy múa lách tách trên da thịt chàng.',
      auditory: 'Tiếng sấm nổ vang rền rĩ long trời lở đất ngay sát đỉnh đầu, tiếng điện tích xèo xèo chói tai.',
      tactile: 'Cảm giác đau đớn tê dại như hàng triệu mũi kim nung đỏ châm vào từng tế bào, nhưng ngay sau đó là cảm giác khoan khoái bùng nổ sức mạnh vô hạn.',
      olfactory: 'Mùi khét lẹt của đá bị sét đánh quyện với mùi ozone nồng nặc trong không khí.',
      gustatory: 'Vị tanh nồng của ngụm máu tươi trào lên khóe miệng rồi bị nuốt ngược trở lại.'
    },
    masterProseExcerpt: `Đêm giông bão trên đỉnh Lôi Nhai, mây đen cuồn cuộn kéo đến như muốn đè sụp cả ngọn núi cao ngàn trượng.

Cuồng phong gầm rít cuốn theo cát đá bay rát mặt. Giữa đỉnh núi trơ trọi toàn những tảng đá đen cháy xém vì sấm sét ngàn năm, Tiêu Cảnh đứng sừng sững, hai tay giơ thẳng lên trời cao như muốn nghênh đón cơn thịnh nộ của thiên địa.

"Ầm... Ầm... Ầm!"

Từng đợt sấm sét rền vang long trời lở đất. Điện tích trong không khí dày đặc đến mức mái tóc đen của chàng dựng ngược lên, phát ra những tia lửa xanh lách tách. Trong đan điền chàng, viên Kim Đan đang xoay tròn điên cuồng, bề mặt xuất hiện những vết rạn nứt chằng chịt chuẩn bị cho thời khắc phá kén hóa bướm.

"Tới đi! Thiên Lôi cẩu tặc!"

Chàng ngửa mặt lên trời gầm vang một tiếng hào sảng.

"OANH!"

Đúng khoảnh khắc ấy, một tia chớp bạc khổng lồ to bằng thân cây cổ thụ từ trên chín tầng mây đen giáng thẳng xuống, đánh trúng vào đỉnh đầu Tiêu Cảnh!

Cả không gian bừng sáng lóa mắt. Luồng lôi đình cuồng bạo xông thẳng vào cơ thể chàng, phá hủy từng thớ thịt kinh mạch rồi lập tức tái tạo lại dưới sức mạnh của Lôi Đình Hóa Kiếp Quyết. Đan điền chàng bùng nổ một tiếng sấm rền rĩ, lớp vỏ Kim Đan vỡ vụn, một luồng sinh khí màu vàng kim rực rỡ thoát ra, ngưng tụ thành một hình hài Nguyên Anh tí hon đang ngồi xếp bằng tỏa ánh hào quang bảy sắc.

Mưa giông bắt đầu trút xuống xối xả. Giữa hố sâu ba trượng bị sấm sét nung chảy thành thủy tinh, Tiêu Cảnh ngạo nghễ đứng thẳng người, ngửa đầu đón nhận dòng nước mưa mát lạnh. Bình cảnh đã phá, đại đạo đã thành, từ nay về sau, trời đất bao la không còn gì có thể ngăn trở bước chân chàng được nữa.`
  },
  // =======================================================================
  // I. LUYỆN CUNG & XẠ THUẬT (TIẾP TỤC - EXPANDED ARCHERY SCENES)
  // =======================================================================
  {
    id: 'train_bow_03_nguyet_ha_truc_lam_am_xa',
    title: 'Nguyệt Dạ Thính Phong • Tiêu Tương Trúc Lâm Bế Mục Xạ Tiễn',
    alias: 'Đêm Khuya Canh Ba Đứng Đầu Ngọn Trúc Nhắm Mắt Lắng Nghe Tiếng Gió Bắn Xuyên Ba Chiếc Lá Đang Rơi',
    category: 'Luyện Cung',
    weaponOrDiscipline: 'Lục Ngọc Bích Trúc Cung dẻo dai bách chiết & Vũ Linh Tiễn không đuôi lông chim ưng',
    spaceAndTime: {
      timeOfDay: 'Đêm khuya thanh vắng canh ba giờ Hợi, vầng trăng rằm tháng bảy vằng vặc rọi qua kẽ lá trúc u minh',
      seasonAndWeather: 'Đêm đầu thu gió heo may thổi nhè nhẹ, sương lạnh mỏng manh giăng mắc khắp ngọn trúc, không gian tịch mịch tuyệt đối',
      locationAndAtmosphere: 'Đỉnh ngọn trúc cao mười trượng giữa rừng trúc Tiêu Tương bạt ngàn ngàn mẫu, thân trúc uốn lượn chòng chành theo từng ngọn gió'
    },
    trainingMotions: {
      stanceAndForm: 'Thế Độc Hạc Tê Chi (đứng một chân trên ngọn trúc đung đưa), mũi chân chỉ chạm nhẹ vào đọt măng trúc mềm mà thân trúc không hề gãy; hạ bàn nhẹ bẫng tựa lông hồng.',
      forceAndQiExecution: 'Mộc hệ chân khí nhu hòa lưu chuyển qua Thiếu Dương Tam Tiêu Kinh, kình lực kéo cung êm ru không một tiếng rít; dẫn dắt tiễn ý hòa nhập vào luồng gió tự nhiên, tiễn xuất vô thanh vô tức.',
      breathAndMentalFocus: 'Khẩu quyết "Bế Nhãn Thính Phong, Vô Cung Hữu Tiễn"; nhắm nghiền hai mắt, dùng thần niệm bao trùm mười trượng xung quanh, cảm nhận quỹ đạo chao đảo của từng chiếc lá trúc rơi trong gió.'
    },
    environmentalInteractions: 'Mũi tên bắn ra trong tĩnh lặng tuyệt đối, xuyên qua ba chiếc lá trúc đang lượn vòng rơi giữa không trung, ghim chặt chiếc lá thứ ba vào thân cây cổ thụ cách xa năm mươi bước mà không làm đứt một cọng gân lá.',
    sensoryDetails: {
      visual: 'Ánh trăng bàng bạc phủ lên gương mặt thanh tú tĩnh lặng như hồ nước mùa thu, tà áo xanh hòa lẫn vào màu xanh thẫm của rừng trúc đêm huyền bí.',
      auditory: 'Tiếng sương đêm rơi tí tách "Tách... tách" trên phiến lá trúc, tiếng gió rì rào như tiếng tiêu ai oán từ ngàn năm vọng lại.',
      tactile: 'Cảm giác chòng chành bồng bềnh dưới gót chân như đang cưỡi trên sóng biển xanh biếc, thân cung ngọc mát rượi trơn nhẵn êm ái.',
      olfactory: 'Hương thơm thanh khiết thoang thoảng của nhựa trúc non quyện với hơi sương ẩm ướt đầu thu.',
      gustatory: 'Vị ngọt thanh tao của giọt sương mai đọng trên khóe môi sau một đêm tĩnh tọa.'
    },
    masterProseExcerpt: `Đêm canh ba trong rừng trúc Tiêu Tương, ánh trăng rằm tháng bảy dát một lớp bạc lạnh lẽo lên muôn ngọn trúc xanh ngút ngàn.

Gió thu hiu hắt thổi qua làm cả biển trúc xào xạc nghiêng ngả như những con sóng biếc. Trên đỉnh một ngọn trúc cao hơn mười trượng uốn cong chênh vênh trước gió, Tiêu Cảnh chỉ đứng bằng một mũi chân độc nhất. Thân hình chàng nhẹ bẫng như một cánh hồng, đung đưa theo từng nhịp thở của ngọn gió đêm mà không làm gãy dập một nhánh măng non.

Đôi mắt chàng nhắm nghiền, hai hàng mi đen dài khẽ rung rinh. 

Trên tay trái chàng, chiếc Lục Ngọc Cung bằng tre ngọc nghìn năm ánh lên sắc xanh biếc huyền ảo. Chàng từ từ đưa tay ra sau gáy, rút một mũi Vũ Linh Tiễn không có lông đuôi kẹp vào dây cung. Không có tiếng gân cung kéo căng rít rống dữ dội, tất cả diễn ra trong sự tĩnh lặng đến rợn người.

"Xào xạc..."

Một cơn gió thoảng qua, làm ba chiếc lá trúc vàng úa khẽ lìa cành, chao liệng giữa không trung theo quỹ đạo ngoằn ngoèo hỗn loạn.

Chính khoảnh khắc ấy, mí mắt Tiêu Cảnh vẫn không hề mở ra. Bàn tay phải chàng khẽ buông!

"Vút!"

Không có tiếng sấm nổ long trời, chỉ có một luồng gió xoáy cực nhẹ xé rách màn sương đêm. Mũi tên ngọc hòa vào luồng gió thu, bay theo một đường cong kỳ diệu tựa như một con linh xà xé gió. Mũi tên lướt qua khoảng không, chuẩn xác xuyên thủng tâm điểm của cả ba chiếc lá trúc đang rơi lộn xộn rồi ghim chặt chiếc lá thứ ba vào thân cây cổ thụ cách đó năm mươi bước.

Khi chàng mở mắt ra, ba chiếc lá vẫn còn nguyên vẹn gân lá, chỉ có cuống lá bị mũi tên đóng đinh vào thân gỗ lim dày. Tiêu Cảnh hít sâu một hơi khí mát của rừng trúc đầu thu, khóe môi khẽ nở một nụ cười an nhiên: Xạ thuật của chàng rốt cuộc đã bước vào cảnh giới Nghe Gió Định Tiễn.`
  },
  {
    id: 'train_bow_04_trieu_tich_hai_trieu_nghich_xa',
    title: 'Nộ Lãng Phá Triều • Vạn Lý Thương Hải Kình Cốt Xạ Tiễn',
    alias: 'Rạng Đông Cửa Biển Triều Dâng Đứng Trước Sóng Dữ Kéo Thần Cung Cốt Cá Voi Bắn Nát Đầu Sóng Bạc',
    category: 'Luyện Cung',
    weaponOrDiscipline: 'Kình Cốt Thần Cung chế tác từ xương sống Cự Kình ngàn năm & Trọng Lân Xuyên Ba Tiễn',
    spaceAndTime: {
      timeOfDay: 'Rạng đông giờ Mão, mặt trời vừa nhô lên một nửa khỏi ngọn sóng biển đông, chiếu rọi những tia nắng đỏ ối như máu',
      seasonAndWeather: 'Tiết Lập Thu nước triều dâng cuồn cuộn, gió mùa đông bắc rít từng cơn mang theo ngàn cân hơi nước mặn chát',
      locationAndAtmosphere: 'Bãi đá ngầm Hắc Long Tiêu sừng sững nhô ra giữa cửa biển, nơi từng đợt sóng thần cao ba trượng dồn dập vỗ vào vách đá tung bọt trắng xóa'
    },
    trainingMotions: {
      stanceAndForm: 'Thế Bá Vương Định Hải Tấn, hai chân cắm ngập vào cát lún và vỏ hàu sắc nhọn, gối chùng lưng thẳng, trọng tâm bất động trước sức giật của ngọn sóng thần đánh ngang hông.',
      forceAndQiExecution: 'Khí trầm đan điền, dẫn kình từ đại địa truyền lên gót chân, eo xoay như trục bánh xe, hai cánh tay bộc phát vạn cân cự lực; mũi tên tụ hội cuồng phong xoáy tròn như mũi khoan phá sóng.',
      breathAndMentalFocus: 'Hít sâu khí mặn của biển cả, tiếng gầm "Phá Hải!" đồng bộ với khoảnh khắc ngọn sóng thần cao ba trượng vừa vươn đến đỉnh điểm chuẩn bị ụp xuống.'
    },
    environmentalInteractions: 'Mũi tên xé toạc màn nước biển dày đặc, đục thủng một lỗ hổng đường kính nửa trượng xuyên qua giữa lòng con sóng thần, làm con sóng khổng lồ sụp đổ sang hai bên trước khi chạm tới bờ đá.',
    sensoryDetails: {
      visual: 'Bọt biển trắng xóa bay ngợp trời như tuyết lở, ánh bình minh nhuộm đỏ rực thân hình vạm vỡ đẫm nước muối và mũi tên bạc lấp lánh ánh kim.',
      auditory: 'Tiếng sóng gầm gào như vạn con bò rừng húc vào vách đá, tiếng dây cung bằng gân rồng biển bật lên trầm đục "Oành!" tựa tiếng đại pháo khai hỏa.',
      tactile: 'Nước biển lạnh buốt rát bỏng tát mạnh vào mặt mũi, ngón tay kéo dây cung bị ma sát tóe lửa trong nước.',
      olfactory: 'Mùi tanh nồng mằn mặn đặc trưng của rong biển sâu và nước triều dâng cuồn cuộn.',
      gustatory: 'Vị chát mặn chát chúa của muối biển đọng nơi đầu lưỡi và khóe môi nứt nẻ.'
    },
    masterProseExcerpt: `Giờ Mão bên bờ đông Hải Giác, vầng thái dương đỏ quạch vừa trồi lên khỏi mặt biển mênh mông, nhuộm cả bầu trời và đại dương thành một chảo máu đỏ rực.

Nước triều đầu thu gầm thét cuồng nộ. Từng con sóng bạc đầu cao tới ba trượng cuốn theo cát đá điên cuồng ập vào bãi đá ngầm Hắc Long Tiêu, phát ra những tiếng nổ long trời lở đất. Giữa bọt sóng tung tóe trắng xóa cao ngập đầu người, Tiêu Cảnh đứng sừng sững như một ngọn hải đăng bằng đồng đen.

Hai bàn chân chàng cắm sâu vào khe đá ngầm sắc nhọn đầy vỏ hàu, máu rỉ ra hòa lẫn vào dòng nước mặn buốt giá nhưng cơ thể chàng vẫn vững như bàn thạch.

Trước mặt chàng, một bức tường nước khổng lồ cao bốn trượng đang ngùn ngụt dâng lên, che khuất cả ánh mặt trời đỏ ối, chực nghiền nát thân hình chàng thành trăm mảnh vụn.

"Mở!"

Tiêu Cảnh rít lên một tiếng sấm sét. Chàng nâng chiếc Kình Cốt Thần Cung nặng năm ngàn cân chế từ xương sống cự thú biển sâu, cánh tay phải gân guốc kéo căng dây cung bện bằng gân rồng biển. Từng thớ cơ bắp trên vai chàng nổi cộm lên như đá tạc, tiếng xương cốt rền rĩ khớp nối.

"BÙNG!"

Dây cung bật mạnh làm nước biển dưới chân chàng nổ tung thành một hố sâu khô cạn trong chớp mắt. Mũi Trọng Lân Tiễn rít lên một tràng âm thanh chói tai, mang theo luồng kình lực xoáy ốc kinh thiên động địa lao thẳng vào giữa bụng ngọn sóng thần!

"OANH LIỆT!"

Một cảnh tượng kinh tâm động phách diễn ra: Mũi tên bắn xuyên qua bức tường nước biển dày hàng trượng, tạo ra một đường hầm chân không tròn vành vạnh. Áp lực kinh hoàng xé rách ngọn sóng thần từ bên trong, khiến con sóng khổng lồ nổ tung thành muôn triệu giọt nước li ti bay ngược lên trời cao. 

Nước biển trút xuống như trút nước rào rào. Giữa làn mưa biển mặn chát, Tiêu Cảnh ngạo nghễ đứng thẳng lưng, ngực trần đón nhận làn gió biển lồng lộng, ánh mắt sáng rực tựa thần tướng trấn giữ biển đông.`
  },

  // =======================================================================
  // II. LUYỆN THƯƠNG & BÁ KHÍ KÍCH PHÁP (TIẾP TỤC - EXPANDED SPEAR SCENES)
  // =======================================================================
  {
    id: 'train_spear_03_lam_nham_hoang_hon_tuyet_sat',
    title: 'Phong Tuyết Điên Cuồng • Thiết Lĩnh Băng Nhai Bá Vương Thương',
    alias: 'Nửa Đêm Bão Tuyết Gió Bấc Gào Rít Đứng Trên Vách Băng Múa Thương Cuốn Thành Bão Tuyết Ngàn Cân',
    category: 'Luyện Thương',
    weaponOrDiscipline: 'Xích Tiêu Huyết Long Thương nặng tám trăm cân, cán rèn từ gỗ Thiết Lê cổ thụ ngâm máu rồng',
    spaceAndTime: {
      timeOfDay: 'Nửa đêm giờ Tý chuyển sang giờ Sửu, trăng non lẩn khuất sau màn mây xám nặng trĩu',
      seasonAndWeather: 'Tiết Đại Hàn rét buốt âm ba mươi độ, gió bấc giật từng cơn cấp mười hai làm gãy đổ cả cây rừng',
      locationAndAtmosphere: 'Đỉnh Tuyệt Tình Nhai trơ trọi toàn băng đá xanh biếc, bốn bề là vực thẳm đen ngòm không đáy'
    },
    trainingMotions: {
      stanceAndForm: 'Bộ pháp cuồng bạo nhưng vững chắc tựa Thái Sơn, xoay chuyển liên hoàn theo "Bát Hoang Liệt Phong Bộ", gót chân dẫm nát lớp băng kết tảng phát ra tiếng rền rĩ.',
      forceAndQiExecution: 'Thuần Dương Khí Kình nóng rực bốc lên từ đan điền, truyền vào thân thương khiến cán thương đỏ rực như than hồng; thương kình quét ra mang theo cuồng phong cuốn tuyết bay vòng quanh thành bức tường rồng tuyết.',
      breathAndMentalFocus: 'Khẩu quyết "Dĩ Nhiệt Trừ Hàn, Thương Xuất Đoán Phách"; tiếng thở rít qua kẽ răng như tiếng rồng gầm trong hang tối.'
    },
    environmentalInteractions: 'Luồng thương phong quét qua làm đông cứng cả không gian rồi bùng nổ, quét sạch lớp tuyết dày ba thước xung quanh trong phạm vi mười trượng, để lộ ra nền đá cổ thụ đen bóng bốc khói nghi ngút.',
    sensoryDetails: {
      visual: 'Cán thương đỏ rực trong đêm tối vạch nên những vệt sáng đỏ rực ngoạn mục, tuyết trắng chạm vào thân thương lập tức bốc hơi thành khói trắng mù mịt.',
      auditory: 'Tiếng xé gió rít lên chói tai như tiếng quỷ khóc thần sầu, tiếng băng đá vỡ vụn dưới sức ép kình phong.',
      tactile: 'Da thịt nóng rực đối chọi gay gắt với cái lạnh cắt da của bão tuyết, cán thương ma sát nóng ran lòng bàn tay.',
      olfactory: 'Mùi tuyết băng khô lạnh quyện với mùi gỗ thiêu cháy của cán thương tẩm dầu thuốc ngàn năm.',
      gustatory: 'Hơi thở bốc khói có vị ngọt lợ của chân khí thuần dương đang sôi trào cuồn cuộn.'
    },
    masterProseExcerpt: `Đêm Đại Hàn trên đỉnh Tuyệt Tình Nhai, gió bấc gầm rít như tiếng tru tréo của vạn oan hồn sa trường.

Băng tuyết đóng dày hàng thước biến mỏm núi đá thành một khối ngọc bích trơn trượt chết chóc, chỉ cần sẩy một bước là rơi xuống vực sâu muôn trượng tan xương nát thịt. Thế nhưng giữa cõi hàn băng tuyệt địa ấy, một bóng người đang điên cuồng vung thương!

"Vù! Vù! Vù!"

Chiếc Xích Tiêu Huyết Long Thương nặng tám trăm cân trên tay Tiêu Cảnh hóa thành một dải lụa lửa đỏ rực xé toạc màn đêm u tối. Thuần Dương Chân Khí cuồn cuộn từ đan điền chàng bốc lên ngùn ngụt, biến cán thương bằng gỗ Thiết Lê đen nhánh thành một thanh hỏa xà đỏ rực phát sáng rực rỡ.

Chàng dậm mạnh chân! Băng đá dưới chân nổ tung "Rắc rắc!", bắn thành muôn ngàn mảnh vụn. Thân hình chàng xoay tròn, ngọn thương quét ngang theo thế "Hoành Tảo Thiên Quân".

"RỐNG!"

Một tiếng rồng ngâm trầm đục vang dội giữa thinh không. Kình lực nóng bỏng từ mũi thương phóng xuất ra cuốn theo hàng ngàn cân tuyết trắng bay vòng quanh thân thể chàng, tạo thành một cơn lốc rồng tuyết khổng lồ cao tới mười trượng. Bất kỳ bông tuyết nào bay vào tầm thương đều lập tức bị nhiệt độ thiêu đốt bốc thành làn hơi nước trắng xóa.

"Phá!"

Tiêu Cảnh hét lớn một tiếng, mũi thương bất thần đâm thẳng xuống nền băng đá. Kình lực Thuần Dương bùng nổ như núi lửa phun trào, quét sạch toàn bộ lớp băng tuyết dày ba thước trong phạm vi mười trượng, làm lộ ra mặt đá hoa cương đen nhánh bốc khói nghi ngút. Chàng thu thương đứng sừng sững giữa trời đông, toàn thân tỏa ra làn hơi nước trắng mờ tựa như hỏa thần giáng thế.`
  },
  {
    id: 'train_spear_04_tam_thien_hoa_vu_phien_dao',
    title: 'Lạc Anh Phất Trần • Thập Lý Đào Lâm Điểm Nhụy Thương',
    alias: 'Chiều Tà Tiết Thanh Minh Rừng Đào Rụng Hoa Vung Thương Đâm Nát Cuống Của Ngàn Cánh Hoa Đang Rơi Mà Cánh Hoa Không Rách',
    category: 'Luyện Thương',
    weaponOrDiscipline: 'Bạch Ngọc Toái Tinh Thương dài một trượng, mũi thương rèn bằng ngọc thạch nghìn năm thanh thoát',
    spaceAndTime: {
      timeOfDay: 'Chiều muộn chạng vạng hoàng hôn tiết Thanh Minh, ánh chiều tà nhuộm hồng rực cả một góc trời phía tây',
      seasonAndWeather: 'Mưa bụi mùa xuân lất phất bay dịu dàng, làn gió đông nam ấm áp lay động cành đào',
      locationAndAtmosphere: 'Thung lũng "Lạc Anh Cốc" bạt ngàn mười dặm hoa đào nở rộ, hàng vạn cánh hoa đào phấn hồng đang mùa rụng lả tả như một cơn mưa hoa'
    },
    trainingMotions: {
      stanceAndForm: 'Thế Di Khinh Bộ uyển chuyển như múa lụa, thân hình xoay tròn nhẹ nhàng thanh thoát tựa hồ như một chiếc lá đào lượn trong gió.',
      forceAndQiExecution: 'Nhu kình thấu triệt, đầu thương rung lên với tần số cực cao tạo thành mười tám đóa hoa thương hư ảo; kình lực thu phát tự nhiên, mũi thương chạm vào cánh hoa chỉ đâm rụng cuống hoa mà tuyệt đối không làm rách một cánh hoa mỏng.',
      breathAndMentalFocus: 'Tâm cảnh tĩnh lặng không một gợn sóng, "Ý tại thương tiên, thương tùy tâm động"; thần niệm hòa cùng từng giọt mưa bụi và cánh hoa bay.'
    },
    environmentalInteractions: 'Hàng ngàn cánh hoa đào đang rơi lộn xộn trong không trung bỗng bị luồng khí xoáy nhu hòa của mũi thương hút lại, xoay tròn theo mũi thương tạo thành một vòng xoáy hoa hồng rực rỡ trước khi nhẹ nhàng hạ xuống mặt đất thành một hình bát quái hoàn mỹ.',
    sensoryDetails: {
      visual: 'Cánh hoa đào bay ngợp trời phủ kín tà áo nguyệt bạch, mũi thương ngọc trắng phát ra ánh sáng lung linh như sao sa.',
      auditory: 'Tiếng mũi thương vung lên khẽ reo "U u..." êm ái như tiếng ngâm vịnh của người xưa, tiếng mưa bụi tí tách rơi trên cành đào.',
      tactile: 'Làn mưa bụi mát lạnh mơn man trên gò má, cán thương ngọc mát lạnh trơn tru êm ái trong tay.',
      olfactory: 'Hương hoa đào nồng nàn ngạt ngào quyện với mùi đất ướt mùa xuân sau cơn mưa.',
      gustatory: 'Vị ngọt thanh của cánh hoa đào vô tình rơi chạm vào khóe môi.'
    },
    masterProseExcerpt: `Hoàng hôn buông lơi trên thung lũng Lạc Anh Cốc, mười dặm hoa đào nở rộ chìm trong làn mưa bụi mùa xuân lất phất mơ màng.

Gió đông nam thổi qua từng cơn dìu dịu, cuốn theo hàng vạn cánh hoa đào phớt hồng rụng lả tả tựa như một cơn mưa tuyết màu hồng ngọc. Dưới tán cổ đào trăm năm, một bóng hình áo trắng phiêu dật đang múa thương giữa biển hoa rơi.

Đó là Tiêu Cảnh với chiếc Bạch Ngọc Toái Tinh Thương trên tay. Khác hẳn với sự cuồng bạo xé nát dòng thác hay bão tuyết, thương pháp lúc này của chàng nhu hòa như nước chảy mây trôi.

"Soạt... Soạt..."

Cán thương ngọc uốn lượn mềm mại như một dải lụa trắng. Mũi thương rung lên bần bật, hóa thành mười tám đóa hoa thương hư ảo lập lòe giữa không trung. Mỗi một nhát thương đâm ra đều chuẩn xác điểm trúng cuống hoa của từng cánh đào đang xoay tròn trong gió.

Điều kỳ diệu là, mũi thương sắc nhọn chém sắt như chém bùn kia chạm vào cánh hoa mỏng manh lại êm ái như gió xuân lướt nhẹ. Cánh hoa không hề rách nát dù chỉ một góc nhỏ, mà chỉ bị kình phong nhu hòa dẫn dắt, bám theo quỹ đạo của mũi thương bay lượn vòng quanh.

"Vù... U..."

Tiếng thương ngâm êm ái vang vọng trong thung lũng tịch mịch. Hàng ngàn cánh hoa đào bay lộn xộn bỗng chốc bị thương ý của chàng quy tụ lại, tạo thành một con rồng hoa hồng phấn khổng lồ dài ba trượng uốn lượn quanh thân chàng.

Khi Tiêu Cảnh thu thương đứng thẳng người, mũi thương khẽ rung lên một nhịp cuối cùng, con rồng hoa đào nhẹ nhàng tản ra, rơi lả tả xuống mặt cỏ ẩm ướt xếp thành một trận đồ Bát Quái hoàn mỹ không tì vết. Chàng đưa tay đón lấy một cánh hoa rơi trên bờ vai áo, ánh mắt trầm lắng như giếng cổ: Bá Đạo dễ luyện, Vương Đạo khó tìm, nhưng Nhu Đạo Dung Hợp mới chính là đỉnh cao của Thương Ý chân chính.`
  },

  // =======================================================================
  // III. LUYỆN VÕ CÔNG & QUYỀN CƯỚC (TIẾP TỤC - EXPANDED MARTIAL ARTS SCENES)
  // =======================================================================
  {
    id: 'train_fist_03_co_tham_tram_thuy_cuoc',
    title: 'Trầm Uyên Áp Lực • Cửu U Vạn Trượng Luyện Thủy Kình Cước',
    alias: 'Lặn Xuống Đáy Vực Nước Sâu Ngàn Trượng Chịu Đựng Áp Lực Thủy Triều Tung Cước Rẽ Sóng Ngầm',
    category: 'Luyện Võ Công',
    weaponOrDiscipline: 'Hỗn Nguyên Phách Lãng Cước & Bá Thể Kim Cang Quyền (Quyền Cước Luyện Thể)',
    spaceAndTime: {
      timeOfDay: 'Giờ Thìn ban mai, khi ánh sáng mặt trời chỉ le lói chiếu qua tầng nước mặt rồi tan biến vào bóng tối sâu thẳm',
      seasonAndWeather: 'Dưới đáy vực nước ngầm sâu muôn trượng không có mưa nắng bốn mùa, chỉ có dòng nước lạnh buốt và áp lực nước kinh hoàng đè nặng',
      locationAndAtmosphere: 'Đáy vực sâu "U Minh Đàm" sâu ngàn trượng, bốn bề là vách đá dựng đứng đen sì phủ đầy rong rêu cổ đại và những dòng xoáy ngầm cuồn cuộn'
    },
    trainingMotions: {
      stanceAndForm: 'Đứng thế Đạp Lãng Tấn trên tảng đá ngầm dưới đáy nước, hai chân bám chặt vào đá như mỏ neo, thân hình nghiêng về phía trước chống lại lực đẩy của nước.',
      forceAndQiExecution: 'Chân khí nén chặt trong từng tế bào để chống lại áp lực nước ép dẹp lồng ngực; bộc phát cước kình từ gót chân, mỗi cú đá phá toạc dòng nước ngầm tạo thành một luồng xoáy chân không dài mười trượng.',
      breathAndMentalFocus: 'Vận dụng "Bế Khí Quy Tức Đại Pháp", ngừng thở hoàn toàn bằng phổi, chuyển sang hô hấp bằng da thịt và đan điền; tâm thần tập trung chống lại ảo giác ngạt thở và bóng tối cô độc.'
    },
    environmentalInteractions: 'Cú đá tung ra làm dòng nước ngầm rẽ sang hai bên tạo thành một đường hầm không khí ngắn ngủi dưới đáy vực, áp lực nước khổng lồ bị đẩy lùi phát ra tiếng rền rĩ dưới lòng đất.',
    sensoryDetails: {
      visual: 'Bọt khí li ti cuộn trào quanh bắp chân cuồn cuộn, ánh mắt sáng rực trong bóng tối đáy vực như hai viên dạ minh châu.',
      auditory: 'Tiếng nước ép trầm đục ù ù bên tai như tiếng sấm dội từ ngàn dặm xa, tiếng tim đập chậm rãi nhưng vang dội trong lồng ngực.',
      tactile: 'Áp lực nước nặng hàng vạn cân ép chặt vào lồng ngực và da thịt như bị kẹp giữa hai tảng đá lớn, da thịt căng tức đau đớn.',
      olfactory: 'Không khí trong đan điền tuần hoàn không mùi, nhưng cảm nhận được vị thanh khiết của linh khí nước ngầm.',
      gustatory: 'Vị tanh nhạt của một tia máu nhỏ rỉ ra từ kẽ răng do áp lực nước khổng lồ.'
    },
    masterProseExcerpt: `Dưới đáy vực sâu U Minh Đàm ngàn trượng, bóng tối đen đặc như mực nuốt chửng mọi ánh sáng trần gian.

Áp lực thủy áp ở độ sâu này khủng khiếp đến mức có thể bóp nát một cỗ xe đồng dày ba tấc thành một cục sắt vụn trong nháy mắt. Làn nước lạnh như băng ngàn năm thẩm thấu qua da thịt, chèn ép từng xương sườn và lá phổi.

Nhưng ở chính nơi tử địa ấy, Tiêu Cảnh đang đứng trần mình trên một mỏm đá ngầm trơn trượt. 

Hai mắt chàng mở to, đồng tử ánh lên hai đốm sáng màu vàng kim lấp lánh như hai viên dạ minh châu soi tỏ vùng nước tăm tối xung quanh. Chàng đã bế khí tuyệt đối hơn sáu canh giờ, toàn bộ kinh mạch vận hành theo Quy Tức Pháp, mượn áp lực khổng lồ của ngàn tầng nước để tôi luyện từng thớ cơ bắp và màng xương.

"Ầm..."

Một dòng xoáy ngầm cuồng bạo từ khe vực đá đen ập tới với sức mạnh của ngàn con trâu rừng hung hãn.

Tiêu Cảnh không lùi nửa bước! Bàn chân trái chàng cắm chặt vào đá ngầm làm phiến đá nứt toác, chân phải quét ngang một vòng tròn hoàn mỹ trong lòng nước đặc quánh.

"Phách Lãng Thức!"

Bắp chân chàng căng cứng như một chiếc cung sắt vung ra. Kình lực từ đan điền dồn xuống gót chân bùng nổ, phá toạc màn nước dày đặc! Một đường hầm chân không dài hơn mười trượng bỗng chốc hình thành giữa đáy vực, đẩy lùi hàng vạn tấn nước sang hai bên, phát ra tiếng nổ trầm đục rền vang như địa chấn.

Dòng xoáy ngầm khổng lồ bị cú đá của chàng chém đứt đoạn, bọt khí li ti sôi sục bốc lên như hàng ngàn chuỗi ngọc trai. Tiêu Cảnh thu chân đứng thẳng, ngực phập phồng co bóp hấp thu linh khí trong nước. Dưới áp lực ngàn cân của vực sâu, thể phách chàng đã chính thức đúc thành Bất Hoại Thủy Cang Thân.`
  },
  {
    id: 'train_fist_04_loi_hoa_tram_chuong',
    title: 'Phiên Vân Phúc Thủ • Đoạn Phong Nhai Ngự Cự Thạch Chưởng',
    alias: 'Chiều Tà Bão Nổi Vách Núi Lở Đứng Đón Từng Tảng Đá Rơi Từ Ngàn Trượng Vung Chưởng Đánh Nát Giữa Không',
    category: 'Luyện Võ Công',
    weaponOrDiscipline: 'Đại Bi Thiên Thủ Chưởng & Phong Vân Biến Ảo Bộ (Không Thủ Luyện Võ)',
    spaceAndTime: {
      timeOfDay: 'Hoàng hôn nhập nhoạng giờ Thân chuyển sang Dậu, mây đen cuồn cuộn che khuất vầng tà dương đỏ quạch',
      seasonAndWeather: 'Trận mưa đá bất ngờ đổ xuống từ trên trời, gió lốc xoáy giật cuốn cát đá rát mặt',
      locationAndAtmosphere: 'Chân vách núi dựng đứng "Đoạn Phong Nhai", nơi những khối đá hoa cương nặng hàng ngàn cân thường xuyên sụt lở rơi thẳng từ đỉnh núi cao xuống'
    },
    trainingMotions: {
      stanceAndForm: 'Thân pháp thoăn thoắt di chuyển theo Bộ Pháp Du Thân, hai tay nâng lên buông lỏng như mây trôi nhưng ẩn chứa ngàn cân lực nén.',
      forceAndQiExecution: 'Hóa giải cương kình thành nhu kình rồi bộc phát thốn kình; mượn lực đà rơi của tảng đá ngàn cân để dẫn dắt, sau đó vung chưởng bồi thêm kình lực xoắn ốc chấn nát lõi đá từ bên trong.',
      breathAndMentalFocus: 'Khẩu quyết "Nhất Động Nhất Tĩnh, Dĩ Nhu Chế Cương"; ánh mắt khóa chặt từng khối cự thạch đang lao xuống với vận tốc xé gió.'
    },
    environmentalInteractions: 'Tảng đá nặng năm trăm cân rơi từ độ cao trăm trượng xuống bị lòng bàn tay chàng đón lấy xoay tròn một vòng rồi vỡ tung thành bột đá trắng xóa bay mù mịt theo gió lốc.',
    sensoryDetails: {
      visual: 'Bột đá bay trắng xóa như sương mù quanh thân hình, hai bàn tay chàng phát ra ánh hào quang hoàng kim lấp lánh như dát vàng.',
      auditory: 'Tiếng đá rơi rít gió "U... u...", tiếng chưởng phong va chạm nổ bùng "BÙNG!" trầm đục như tiếng trống trận.',
      tactile: 'Lực va đập ngàn cân truyền qua lòng bàn tay làm chấn động từng khớp xương, nhưng kinh mạch đàn hồi hóa giải nhẹ nhàng.',
      olfactory: 'Mùi đá hoa cương vỡ vụn bốc mùi khét nồng đặc trưng vì ma sát cực độ.',
      gustatory: 'Bụi đá lạo xạo dính trên môi khô, vị khoáng chất nồng đượm.'
    },
    masterProseExcerpt: `Hoàng hôn xám xịt phủ bóng đen đe dọa lên vách núi dựng đứng Đoạn Phong Nhai.

Một trận giông lốc mùa hạ ập tới, sấm sét xé rách bầu trời và mưa đá bắt đầu trút xuống ràn rạt. Trên đỉnh vách núi cao ngút ngàn, từng khối đá hoa cương khổng lồ bị gió bão và nước xói mòn bắt đầu rạn nứt, đổ ầm ầm xuống chân vực như một trận mưa thiên thạch.

Dưới chân vách đá nguy hiểm chết người ấy, Tiêu Cảnh hai tay áo phấp phới, đứng bất động với hai bàn tay buông thõng tự nhiên.

"Ầm!"

Một tảng đá hoa cương to bằng gian nhà lá, nặng ít nhất bảy trăm cân rít gió lao thẳng xuống đầu chàng với tốc độ xé gió rợn người!

Tiêu Cảnh không né! Ánh mắt chàng sáng rực, chân bước một bước chéo theo thế Vân Thủ. Hai bàn tay chàng từ từ đưa lên, đón lấy mặt dưới của tảng đá đang lao xuống với vận tốc kinh hoàng.

"Hóa!"

Lòng bàn tay chàng vừa chạm vào tảng đá, toàn bộ kình lực cuồng bạo của khối đá dường như rơi vào một đầm lầy vô tận. Thân hình Tiêu Cảnh xoay tròn nửa vòng, mượn lực tá lực, chuyển hướng rơi của tảng đá từ thẳng đứng thành đường tròn xoay quanh thân mình.

"Phá!"

Khi tảng đá xoay đến vị trí ngang ngực, bàn tay phải của chàng đột ngột phát lực Thốn Kình! Một luồng chưởng lực xoắn ốc màu hoàng kim như một mũi khoan vô hình đánh thẳng vào tâm điểm tảng đá.

"OANH!"

Một tiếng nổ đanh giòn vang lên. Tảng đá nặng bảy trăm cân bỗng chốc vỡ vụn từ bên trong, biến thành hàng vạn mảnh sỏi nhỏ và bụi đá trắng xóa bay mù mịt trong gió lốc. Tiêu Cảnh nhẹ nhàng thu chưởng về trước ngực, vạt áo trắng không vướng một hạt bụi, thần thái ung dung tự tại giữa cơn mưa đá cuồng nộ của đất trời.`
  },

  // =======================================================================
  // IV. LUYỆN CÔNG PHÁP & THỔ NẠP CHU THIÊN (TIẾP TỤC - EXPANDED CULTIVATION SCENES)
  // =======================================================================
  {
    id: 'train_cultivation_03_tinh_hai_thien_tam_quy_nguyen',
    title: 'Hạo Hãn Tinh Không • Càn Khôn Đài Thần Niệm Tẩy Tủy',
    alias: 'Đêm Hè Không Trăng Giờ Tý Đứng Đỉnh Núi Ngẩng Nhìn Dải Ngân Hà Dẫn Tinh Thần Lực Tẩy Rửa Kinh Mạch',
    category: 'Luyện Công Pháp',
    weaponOrDiscipline: 'Cửu Chuyển Tinh Thần Quyết & Thái Hư Tinh Tú Thổ Nạp Pháp',
    spaceAndTime: {
      timeOfDay: 'Đêm khuya thanh vắng canh ba giờ Tý, bầu trời đêm không một gợn mây, không có trăng, tối thẫm nhưng rực rỡ muôn triệu vì sao',
      seasonAndWeather: 'Tiết trời giữa mùa hè khô ráo, gió mát trên cao thổi lồng lộng, không khí loãng và trong vắt nhìn thấy rõ dải Ngân Hà vắt ngang bầu trời',
      locationAndAtmosphere: 'Đỉnh đài đá ngọc "Càn Khôn Đài" nhô cao vượt trên biển mây của ngọn núi Thiên Trụ Sơn, nơi tiếp giáp gần nhất với bầu trời sao'
    },
    trainingMotions: {
      stanceAndForm: 'Ngồi kiết già thế hoa sen, hai tay kết ấn Tinh Thần Ấn trước ngực, đầu ngửa về phía trời đêm, sống lưng thẳng tắp như cột chống trời.',
      forceAndQiExecution: 'Mở rộng thần thức câu thông với chòm sao Bắc Đẩu và chòm sao Tử Vi; dẫn từng tia ánh sáng tinh tú màu xanh lam mỏng manh từ trên vũ trụ rơi xuống đỉnh đầu, thẩm thấu vào tủy xương để tẩy trừ trần cặn.',
      breathAndMentalFocus: 'Hơi thở nhẹ nhàng tựa hồ như có như không, nhịp tim đồng điệu với nhịp nhấp nháy của các vì sao trên dải Ngân Hà; thần hồn xuất khiếu lướt đi giữa biển sao bao la.'
    },
    environmentalInteractions: 'Xung quanh đài đá xuất hiện hàng ngàn đốm sáng tinh tú màu xanh lam lơ lửng, tạo thành một tiểu vũ trụ thu nhỏ bao bọc lấy thân thể chàng, không gian xung quanh như bị bẻ cong nhẹ.',
    sensoryDetails: {
      visual: 'Dải Ngân Hà sáng rực rỡ trên đỉnh đầu như một dòng sông bạc khổng lồ, những vệt sáng tinh quang xanh biếc lấp lánh chảy dài trên da thịt chàng.',
      auditory: 'Tiếng gió đêm thì thào như lời thì thầm của vũ trụ từ ngàn xưa, không gian tĩnh lặng đến mức nghe được tiếng tinh tú chuyển dịch.',
      tactile: 'Cảm giác mát lạnh êm ái như được tắm mình trong dòng suối bạc, tủy xương ngứa ran dễ chịu khi được tái tạo.',
      olfactory: 'Hương thơm thanh khiết của không khí loãng trên đỉnh mây quyện với mùi đá ngọc nghìn năm.',
      gustatory: 'Miệng sinh tân dịch ngọt mát như sương ngọc tiên thiên ngấm vào cuống họng.'
    },
    masterProseExcerpt: `Đêm canh ba không trăng trên đỉnh Càn Khôn Đài, biển mây dưới chân lững lờ trôi như dải lụa xám bạc.

Ngước mắt nhìn lên, cả vòm trời đêm đen thẳm trong vắt như một tấm nhung huyền khổng lồ đính hàng ức triệu viên kim cương lấp lánh. Dải Ngân Hà rực rỡ vắt ngang qua đỉnh đầu, tỏa ra thứ ánh sáng huyền bí của cội nguồn vũ trụ từ thuở hồng hoang.

Tiêu Cảnh ngồi xếp bằng trên phiến đá ngọc, hai tay kết ấn Tinh Thần Ấn đặt trước đan điền. Tà áo màu nguyệt bạch của chàng khẽ lay động theo làn gió đêm mát rượi.

"Tâm như hư không, dung nạp vạn tinh."

Chàng khẽ nhắm mắt, mở rộng thức hải vươn xa hàng vạn dặm lên chín tầng mây xanh. Trong tâm thức chàng, chòm sao Bắc Đẩu bảy ngôi bỗng chốc phát sáng rực rỡ, phát ra từng dải ngân quang màu xanh lam mỏng manh rủ xuống tựa hồ như những sợi tơ trời óng ánh.

"Vù..."

Từng sợi tinh quang xanh biếc từ trên vũ trụ xa xăm hạ xuống, lướt qua đỉnh đầu Tiêu Cảnh rồi rót thẳng vào huyệt Bách Hội. Luồng năng lượng tinh khiết mát lạnh như dòng suối ngọc chảy tràn qua từng tấc tủy xương, gột rửa đi mọi tạp chất ô trọc và vết nứt kinh mạch còn sót lại sau những trận huyết chiến sinh tử.

Xung quanh thân thể chàng, hàng ngàn đốm sáng tinh tú nhỏ li ti bỗng từ từ hiện ra, xoay tròn theo quỹ đạo Thiên Can Địa Chi, biến đài đá thành một tiểu tinh hà thu nhỏ lung linh huyền ảo. 

Khi chàng từ từ mở mắt, trong đáy mắt chàng như ẩn chứa cả một dải Ngân Hà đang xoay chuyển tuần hoàn. Thần niệm chàng đã vượt qua ranh giới phàm trần, chạm tay vào sự huyền vi bất tận của tinh không đại đạo.`
  },
  {
    id: 'train_cultivation_04_tuyet_bich_phan_tam_ngo_dao',
    title: 'Bồ Đề Nhất Niệm • U Cốc Bích Động Diện Bích Ngộ Đạo',
    alias: 'Rạng Đông Mùa Xuân Trong Hang Đá Tĩnh Mịch Ngồi Mười Năm Nhìn Vách Đá Khai Thông Bế Tắc Đốn Ngộ Đại Đạo',
    category: 'Luyện Công Pháp',
    weaponOrDiscipline: 'Vô Vi Tự Nhiên Tâm Pháp & Thái Sơ Khai Thiên Quyết',
    spaceAndTime: {
      timeOfDay: 'Khoảnh khắc rạng đông tranh sáng tranh tối giờ Dần, những tia nắng mai đầu tiên của mùa xuân chiếu rọi qua cửa hang đá',
      seasonAndWeather: 'Tiết Lập Xuân ấm áp bắt đầu xua tan cái giá lạnh mùa đông, rêu phong đâm chồi xanh mướt trên vách đá ẩm ướt',
      locationAndAtmosphere: 'Hang đá sâu "Ngộ Đạo Động" bên trong hẻm núi u tịch ngàn năm, nơi chỉ có tiếng giọt nước nhỏ trên thạch nhũ và vách đá phẳng nhẵn như gương'
    },
    trainingMotions: {
      stanceAndForm: 'Ngồi xếp bằng tĩnh tọa bất động suốt nhiều tháng ngày, lớp bụi thời gian và mạng nhện giăng mắc trên vai áo mà thân thể không hề lay chuyển dù chỉ nửa tấc.',
      forceAndQiExecution: 'Toàn bộ chân khí thu liễm về hư vô, kinh mạch ngừng vận chuyển cưỡng cầu, để chân khí tự nhiên lưu chuyển theo lẽ tuần hoàn sinh diệt của trời đất; một tia linh quang bỗng bừng sáng nơi nê hoàn cung.',
      breathAndMentalFocus: 'Khẩu quyết "Tâm như gương sáng, không vướng bụi trần; vạn pháp giai không, nhất niệm hóa sinh"; đốn ngộ lẽ huyền vi của thiên đạo sau chuỗi ngày bế quan khổ tu.'
    },
    environmentalInteractions: 'Đúng khoảnh khắc đốn ngộ, luồng khí vô hình từ thân thể chàng tỏa ra làm mạng nhện và bụi bặm tan biến thành mây khói, vách đá phía trước xuất hiện những đường vân phát sáng như chữ cổ thiên thư.',
    sensoryDetails: {
      visual: 'Ánh sáng bình minh rọi vào cửa động chiếu sáng hạt bụi li ti nhảy múa, ánh mắt mở ra trong vắt sâu thẳm như chứa đựng cả càn khôn vũ trụ.',
      auditory: 'Tiếng giọt nước "Tõm... tõm..." rơi xuống hồ đá trong hang vang vọng thanh thoát, tiếng hoa đào nở bên ngoài cửa động khẽ tách cánh.',
      tactile: 'Toàn thân nhẹ bẫng tựa như làn khói, mọi bế tắc đau nhức trong xương tủy biến mất hoàn toàn, thay bằng cảm giác an nhiên tự tại.',
      olfactory: 'Mùi đất ẩm sau cơn mưa xuân và mùi rêu đá xanh tươi mát lành ngập tràn khoang mũi.',
      gustatory: 'Cảm giác thanh tịnh không vướng bận mùi vị phàm trần.'
    },
    masterProseExcerpt: `Giờ Dần sớm mai tiết Lập Xuân, những tia nắng ấm áp đầu tiên của năm mới khẽ lách qua cửa hang Ngộ Đạo Động sâu thẳm trong hẻm núi.

Trong hang đá tịch mịch, Tiêu Cảnh đã ngồi diện bích suốt ba năm ròng rã. Bụi trần phủ một lớp dày trên mái tóc dài buông xõa, mạng nhện giăng từ vai áo chàng sang phiến đá bên cạnh. Chàng bất động như một tảng đá nghìn năm, nhịp thở dường như đã tắt hẳn, mạch đập ngưng lại tựa hồ đã tịch diệt.

Thế nhưng trong thức hải của chàng, một cuộc lột xác kinh thiên động địa đang âm thầm diễn ra.

Suốt ba năm qua, chàng đã buông bỏ mọi tham vọng thắng thua, buông bỏ chấp niệm về cảnh giới cao thấp. Chân khí không còn bị ép buộc vận chuyển theo những vòng chu thiên gò bó, mà thuận theo lẽ tự nhiên, như mây trôi giữa trời xanh, như nước chảy về chỗ trũng.

"Tõm..."

Một giọt nước từ thạch nhũ trên vòm hang khẽ rơi xuống mặt hồ đá phẳng lặng, làm gợn lên một vòng sóng biếc lăn tăn.

Chính khoảnh khắc ấy! Một tia sáng bỗng lóe lên nơi Nê Hoàn Cung của chàng.

"Vạn pháp quy nhất, nhất quy hà xứ?"

"Nhất niệm sinh, vạn vật hóa!"

Tiêu Cảnh bỗng thở ra một hơi dài thanh thản. Đôi mắt chàng từ từ mở ra. Lớp bụi bặm và mạng nhện giăng trên vai áo lập tức bị một luồng kình khí nhu hòa vô hình đánh tan thành mây khói. 

Vách đá nhẵn thín phía trước mặt chàng bỗng phát ra ánh sáng vàng kim lung linh, từng đường vân đá tự nhiên bỗng hiện rõ lên như một bức tranh Thiên Đạo Đồ huyền diệu. Toàn bộ kinh mạch từng bị bế tắc bấy lâu nay bỗng chốc tự động đả thông, chân khí dồi dào vô tận tựa hồ biển lớn đón nhận vạn nhánh sông.

Chàng mỉm cười đứng dậy, bước ra cửa hang đón nhận làn gió xuân ấm áp. Ba năm diện bích, một sớm đốn ngộ, từ nay về sau, tâm cảnh chàng đã vĩnh viễn siêu thoát ngoài cõi hồng trần.`
  }
];

// =========================================================================
// HELPER ARRAYS & TRAINING PRESETS FOR PROMPT INJECTION & AI GENERATION
// =========================================================================

export const MARTIAL_DISCIPLINES_LIST = [
  { id: 'bow', label: '🏹 Xạ Thuật & Cung Pháp', count: 4, icon: '🏹' },
  { id: 'spear', label: '🔱 Thương Pháp & Kích Pháp', count: 4, icon: '🔱' },
  { id: 'fist', label: '🥋 Luyện Thể & Quyền Cước', count: 4, icon: '🥋' },
  { id: 'cultivation', label: '🧘 Công Pháp & Thổ Nạp Chu Thiên', count: 4, icon: '🧘' }
];

export const TRAINING_FORCE_EXPRESSIONS = [
  'Thốn kình phát lực nổ vang như sấm sét trong gang tấc',
  'Thương kình xoắn ốc xé toạc màn nước dội ngược dòng thác',
  'Tiễn khí phá không vẽ nên đường hầm chân không dài trăm trượng',
  'Cương kình thấu cốt đấm vỡ nát kết cấu đá tảng từ bên trong',
  'Bế nhãn thính phong, tiễn khí nhu hòa đâm thủng cuống lá đang rơi',
  'Kình cốt khai cung bắn nát bụng sóng thần dâng trào cửa biển',
  'Thuần dương khí kình bốc cháy thân thương quét sạch bão tuyết mười trượng',
  'Bạch ngọc thương rung hoa thương điểm nhụy đào hoa không rách cánh',
  'Trầm uyên vạn trượng vận cước kình rẽ sóng ngầm dưới đáy nước',
  'Phiên vân phúc thủ mượn lực tá lực chấn nát cự thạch rơi từ ngàn trượng',
  'Hấp thu tinh thần lực dải Ngân Hà tẩy tủy hoán cốt đỉnh Càn Khôn Đài',
  'Chân khí đại chu thiên tuần hoàn như nhật nguyệt vận chuyển',
  'Dẫn thiên lôi tôi luyện kinh mạch đan điền phá vỡ bình cảnh',
  'Diện bích ngộ đạo nhất niệm sinh vạn pháp khai thông huyền khiếu'
];

export const TRAINING_ENVIRONMENT_PRESETS = [
  'Đứng thế trung bình tấn trên mỏm đá chênh vênh giữa bão tuyết gầm thét',
  'Chân thác nước nghìn trượng nước lũ cuồn cuộn đổ ầm ầm long trời lở đất',
  'Hoàng hôn sa mạc cát vàng bay mù mịt nắng gắt thiêu đốt',
  'Đỉnh vách đá mây ngàn gió lốc cuốn lá ngô đồng bay lượn',
  'Đứng đầu ngọn trúc Tiêu Tương chao đảo theo gió đêm canh ba trăng rằm',
  'Bãi đá ngầm cửa biển rạng đông sóng thần cao ba trượng dồn dập vỗ bờ',
  'Đỉnh núi băng giá rét buốt âm ba mươi độ nửa đêm gió bấc giật cấp mười hai',
  'Thung lũng mười dặm hoa đào rụng như mưa hoa chiều tà tiết Thanh Minh',
  'Miệng núi lửa dung nham sủi bọt đỏ rực hơi nóng thiêu đốt',
  'Đêm khuya hồ băng tĩnh mịch ngâm mình dưới dòng nước buốt giá',
  'Đáy vực sâu ngàn trượng bóng tối dày đặc và áp lực thủy áp khổng lồ',
  'Chân vách núi Đoạn Phong Nhai đón cự thạch rơi trong cơn giông mưa đá',
  'Đỉnh Càn Khôn Đài đêm hè không trăng ngước nhìn dải Ngân Hà rực rỡ',
  'Hang đá u tịch ngàn năm tiếng giọt nước nhỏ thạch nhũ tiết Lập Xuân',
  'Rạng đông giờ Mão đỉnh núi cao đón nhận luồng tiên thiên tử khí',
  'Đêm giông bão sấm sét xé toạc trời đêm đứng trên đỉnh Lôi Nhai'
];

