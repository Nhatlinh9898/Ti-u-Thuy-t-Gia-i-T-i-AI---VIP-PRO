// =========================================================================
// TIÊU DAO THI HỌA SƠN THỦY BẢO ĐIỂN (GIANG HỒ HỮU TÌNH TOÀN TẬP)
// Kho tàng bối cảnh: Sông nước hữu tình, trăng thanh gió mát, rượu ngon thịt béo,
// mỹ nhân tri kỷ, anh hùng hào kiệt, huynh đệ bốn bể, hợp đàn thổi sáo ngâm thơ.
// =========================================================================

export interface PoeticSceneryScene {
  id: string;
  title: string;
  alias: string;
  theme:
    | 'Du Thuyền Giang Hà'
    | 'Vọng Nguyệt Đỉnh Núi'
    | 'Đình Đài Hoa Lạc'
    | 'Tuyết Dạ Đun Trà'
    | 'Đầm Sen Trăng Rằm'
    | 'Suối Rừng Ẩn Dật'
    | 'Lễ Hội Thả Hoa Đăng'
    | 'Lễ Hội Đèn Khổng Minh'
    | 'Lễ Hội Giao Mùa Nghênh Xuân'
    | 'Lễ Hội Giao Mùa Lập Hạ'
    | 'Lễ Hội Giao Mùa Lập Thu'
    | 'Lễ Hội Giao Mùa Lập Đông'
    | 'Lễ Hội Nguyên Tiêu Phố Cổ'
    | 'Lễ Hội Thất Tịch Nguyện Ước'
    | 'Lãng Mạn Uyên Ương'
    | 'Hẹn Hò Phố Hội'
    | 'Tiên Lữ Đồng Hành'
    | 'Tuyết Dạ Tương Tư';
  skyAndAirborne?: {
    celestialPhenomena: string; // Cảnh tượng trên bầu trời: Mưa sao băng, trăng rằm, dải Ngân Hà, pháo hoa nở bung...
    aerialMotion: string;       // Sự chuyển động trên không: Cánh hoa rơi lả tả, đom đóm dập dờn, hoa đăng lơ lửng, tiên hạc rẽ mây...
  };
  crowdAndPassersby?: {
    crowdAtmosphere: string;    // Dòng người qua lại: Tài tử giai nhân trẩy hội, lữ khách vội vã, người bán hàng rong, tiếng huyên náo...
    contrastWithCouple: string; // Tương phản với đôi lứa: Giữa biển người xô bồ, hai người chỉ có nhau trong mắt, thời gian như ngưng đọng...
  };
  coupleRomanceFocus?: {
    tenderMoments: string;      // Cử chỉ ngọt ngào: Nắm tay dạo bước, cùng che ô dầu, gạt bông tuyết trên mi, cài trâm ngọc...
    unspokenGaze: string;       // Ánh mắt tình tứ & nhịp đập con tim: Nụ cười e ấp, ánh mắt chan chứa tình ý, thề ước khắc cốt ghi tâm...
  };
  festivalRituals?: {
    ritualName: string;          // Tên nghi thức tế lễ / thả đăng / nghênh mùa
    stepByStep: string[];        // Các bước cử hành nghi thức
    wishInscriptions: string[];  // Câu liễn, ước nguyện đề trên đèn hoa đăng hoặc đèn Khổng Minh
    culturalMeaning: string;     // Ý nghĩa tâm linh, cầu phúc, nghĩa khí hoặc tình duyên
  };
  timeAndAtmosphere: {
    timeOfDay: string;       // Thời khắc: Đêm rằm thu thảo, hoàng hôn tà dương, chạng vạng...
    weatherAndSeason: string; // Tiết trời: Gió mát hiu hiu, sương mỏng như lụa, hoa mai bay lất phất...
    lightingAndSpace: string; // Ánh sáng & Không gian: Ánh trăng dát bạc đáy nước, đèn lồng đỏ ấm cúng...
  };
  sceneryDescription: string; // Mô tả cảnh vật thiên nhiên chi tiết
  wineAndFeast: {
    wines: string[];          // Các loại quỳnh tương ngọc dịch, rượu quý
    delicacies: string[];     // Mỹ vị sơn hào, thịt nướng thơm lừng
    tableSetting: string;     // Bố trí bàn tiệc, chén ngọc, đỉnh trầm hương
  };
  companionsAndRomance: {
    heroes: string;           // Khí chất anh hùng, hào kiệt tứ hải
    beauties: string;         // Dung nhan, cốt cách mỹ nhân giai lệ
    brotherhoodBond: string;  // Tình cảm huynh đệ bốn bể (tứ hải giai huynh đệ)
  };
  musicAndPoetry: {
    instruments: string;      // Nhạc cụ: Cổ cầm, sáo trúc, tiêu huyền, đàn tỳ bà
    harmonyVibe: string;      // Âm điệu hợp tấu: Tiếng đàn réo rắt quyện tiếng sáo phiêu bồng
    originalPoem: string;     // Bài thơ tứ tuyệt hoặc trường thi ngâm vịnh
  };
  sensoryDetails: {
    visual: string;           // Thị giác
    auditory: string;         // Thính giác
    olfactory: string;        // Khứu giác (hương rượu, hương hoa, khói trầm)
    gustatory: string;        // Vị giác (vị rượu cay ngọt, thịt nướng giòn rụm)
    tactile: string;          // Xúc giác (gió lạnh khẽ lay vạt áo, hơi ấm chén rượu)
  };
  masterProseExcerpt: string; // Đoạn văn mẫu miêu tả hoàn chỉnh, trau chuốt từng câu chữ
}

export const PRESET_POETIC_SCENES: PoeticSceneryScene[] = [
  {
    id: 'scene_01_ha_thuyen_vong_nguyet',
    title: 'Họa Thuyền Dạ Bạc • Trường Giang Vọng Nguyệt',
    alias: 'Du Thuyền Tiêu Dao Giữa Sóng Nước Mênh Mông',
    theme: 'Du Thuyền Giang Hà',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm rằm tháng Tám, giờ Tý canh ba, trăng sáng vằng vặc treo giữa đỉnh trời',
      weatherAndSeason: 'Gió thu hiu hiu thổi gợn sóng biếc, sương khói mờ ảo giăng mắc mạn thuyền',
      lightingAndSpace: 'Mặt nước sông rộng ba dặm dát một dải bạc lấp lánh như lụa tiên, hai ngọn lầu đèn bọc lụa đỏ tỏa ánh sáng ấm áp phản chiếu đáy sóng'
    },
    sceneryDescription: 'Chiếc du thuyền chạm trổ hoa văn rồng cuộn bằng gỗ tử đàn lững lờ trôi giữa dòng Trường Giang. Xa xa hai bên bờ, rặng liễu rủ bóng thướt tha hòa cùng bóng núi trập trùng mờ ảo dưới ánh trăng thu. Làn nước trong vắt phản chiếu trăng tròn đáy nước, khiến người ta ngỡ như thuyền đang bồng bềnh lướt đi giữa dải Ngân Hà vô tận.',
    wineAndFeast: {
      wines: ['Cửu Chuyển Bách Hoa Lộ ủ ba mươi năm', 'Trúc Diệp Thanh đượm hương lá non', 'Bạch Ngọc Quỳnh Tương cay nồng ngọt hậu'],
      delicacies: ['Cá anh vũ hấp lá sen hồ Tây ngọt lịm', 'Thịt hươu tuyết nướng than hồng ướp mật ong rừng', 'Thịt ngỗng trời quay giòn rụm chấm muối tiêu hoa tiêu', 'Bánh quế hoa ướp sương mai mềm mịn tan đầu lưỡi'],
      tableSetting: 'Bàn gỗ mun khảm xà cừ đặt giữa boong thuyền, chén ngọc lưu ly phát sáng trong đêm, đỉnh trầm hương đồng hun hình hạc ngậm sen tỏa làn khói lam uốn lượn'
    },
    companionsAndRomance: {
      heroes: 'Bạch y kiếm khách vạt áo bay phần phật trước gió lộng, mi mục như kiếm, khí phách ngạo nghễ xem nhẹ sinh tử hồng trần; cùng các hào kiệt tứ hải vung chén sảng khoái.',
      beauties: 'Tuyệt sắc giai nhân khoác áo lụa mỏng màu nguyệt bạch, tóc mây cài trâm ngọc bích, đôi mắt long lanh tựa hồ thu, khóe môi mỉm cười khuynh thành khuynh quốc.',
      brotherhoodBond: 'Bốn phương tao ngộ, sinh tử có nhau. Những người anh em từ phương trời xa lạ uống cạn chén rượu thề, buông bỏ mọi danh lợi toan tính, chỉ còn lại tấm chân tình sáng tựa vầng trăng rằm.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Cổ Cầm bảy dây bằng gỗ cây ngô đồng và Ống Tiêu Trúc ngọc bích chín đốt',
      harmonyVibe: 'Tiếng đàn réo rắt trong trẻo tựa tiếng suối ngọc reo nơi hẻm núi, tiếng tiêu trầm bổng phiêu dật như tiếng rồng ngâm giữa chín tầng trời; âm điệu quyện vào tiếng sóng nước vỗ mạn thuyền nhịp nhàng.',
      originalPoem: `Trường giang nhất diệp mộc chu khinh,
Minh nguyệt như sương dạ lãng thanh.
Đối tửu hoan ca tiếu thiên hạ,
Hào kiệt giai nhân tứ hải tình.`
    },
    sensoryDetails: {
      visual: 'Trăng vằng vặc rọi từng vảy sóng vàng, tà áo trắng bay lộng giữa trời đêm, gò má ửng hồng vì men say của giai nhân.',
      auditory: 'Tiếng đàn cổ cầm trong trẻo hòa cùng tiếng tiêu réo rắt, tiếng rượu rót róc rách vào chén ngọc, tiếng cười hào sảng vang vọng mặt sông.',
      olfactory: 'Hương rượu Bách Hoa nồng nàn quyện với mùi thơm lừng của thịt hươu nướng than và hương sen thoang thoảng theo gió đưa.',
      gustatory: 'Vị rượu đầu môi cay tê sảng khoái rồi chuyển sang ngọt lành ấm áp nơi cuống họng; miếng thịt giòn tan đậm đà vị ngọt tự nhiên của núi rừng.',
      tactile: 'Làn gió thu mát rượi thổi qua da thịt xua tan mọi mỏi mệt trần thế, chén rượu ngọc mát lạnh nơi đầu ngón tay.'
    },
    masterProseExcerpt: `Đêm rằm tháng Tám, sương khói Trường Giang mờ ảo tựa cõi bồng lai.

Chiếc họa thuyền gỗ tử đàn khẽ rẽ sóng lướt đi giữa lòng sông mênh mông, để lại phía sau một vệt bọt nước lấp lánh ánh lân tinh. Trên bầu trời cao vời vợi, vầng trăng tròn vành vạnh như một chiếc đĩa ngọc khổng lồ, tỏa ánh hào quang dát bạc xuống khắp mặt nước phẳng lặng như tờ.

Trên boong thuyền lộng gió, chiếc bàn gỗ mun đã bày sẵn yến tiệc thịnh soạn. Bốn hũ rượu Bách Hoa Lộ thượng hạng vừa khui nắp, hương thơm nồng nàn ngào ngạt lập tức bay xa theo gió, quyện cùng mùi thịt hươu nướng than hồng béo ngậy đang xèo xèo nhỏ giọt trên đĩa đồng.

"Ha ha ha! Đời người có được mấy lần gặp gỡ dưới bóng trăng thanh thế này? Nào các vị huynh đệ, đêm nay không say không về!" 

Tiêu Cảnh nâng chén lưu ly tràn trề sóng sánh, hướng về phía các hảo hữu tứ phương cười vang sảng khoái. Bên cạnh chàng, Liễu Tố Y trong tà áo lụa màu nguyệt bạch mỉm cười dịu dàng, đôi bàn tay ngọc ngà nhẹ nhàng lướt trên bảy dây đàn Cổ Cầm. Từng thanh âm trong trẻo như hạt châu rơi trên mâm ngọc vang lên, lập tức được nối tiếp bởi tiếng sáo trúc thanh tao thoát tục của Mặc Thương Lãng từ mũi thuyền.

Tiếng đàn hòa cùng tiếng sáo, tiếng hát hào sảng quyện với tiếng sóng nước rì rào vỗ mạn thuyền. Khắp đất trời non nước lúc này dường như chỉ còn lại men rượu say nồng, tình huynh đệ sắt son và nụ cười khuynh thành của giai nhân bên ánh trăng ngàn năm bất tử.`
  },
  {
    id: 'scene_02_tuyet_da_dun_tra_nuong_thit',
    title: 'Đình Núi Tuyết Dạ • Nướng Thịt Đun Trà Lãm Mai',
    alias: 'Đêm Đông Tuyết Rơi Nướng Thịt Sưởi Lửa Ấm Áp',
    theme: 'Tuyết Dạ Đun Trà',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm đông rét mướt, tuyết đầu mùa rơi lất phất dày đặc ngoài đình',
      weatherAndSeason: 'Gió bấc rít nhẹ qua rặng thông già, không khí lạnh buốt nhưng trong đình ấm áp như mùa xuân',
      lightingAndSpace: 'Lò than hồng rực tí tách lửa hoa, ánh lửa bập bùng hắt lên những bông tuyết trắng muốt đậu trên cành hồng mai'
    },
    sceneryDescription: 'Một ngôi cổ đình bát giác tọa lạc trên đỉnh vách đá cheo leo, bốn bề tuyết trắng phủ ngập cây cỏ rừng tùng. Bên ngoài tuyết rơi trắng xóa trời đất, bên trong đình lò than đỏ rực xua tan cái lạnh thấu xương. Cành hoa mai đỏ thắm vươn vào mép đình, đọng những giọt tuyết tan trong veo lấp lánh.',
    wineAndFeast: {
      wines: ['Hỏa Thiêu Luyện Hầu Tửu (rượu đốt ấm tỳ vị)', 'Bạch Hạc Thiền Trà pha bằng nước tuyết tan trên cánh hoa mai', 'Hồng Nham Thiêu Tửu'],
      delicacies: ['Thịt bò tuyết nướng giòn trên vỉ đá núi lửa', 'Thịt lợn rừng bản ướp hạt mắc khén và ớt nướng', 'Nồi lẩu nấm tùng nhung linh chi nước hầm xương hươu sôi ùng ục', 'Củ ấu nướng tro thơm lừng ngọt bùi'],
      tableSetting: 'Lò gốm đất nung lửa than củi thông nổ lách tách, ấm đồng cổ đun nước tuyết bốc khói nghi ngút, đĩa gốm hoa lam mộc mạc đậm chất giang hồ'
    },
    companionsAndRomance: {
      heroes: 'Đại hán phương Bắc cởi trần một bên vai lộ cơ bắp cuồn cuộn ngồi vỗ đùi cười lớn; kiếm khách trẻ tuổi ôm kiếm tựa cột đình mỉm cười trầm ngâm.',
      beauties: 'Thiếu nữ khoác áo choàng lông cáo đỏ thắm rực rỡ như đóa phù dung giữa tuyết trắng, đôi má hồng hào vì hơi ấm lò than, chăm chú nướng từng miếng thịt cho người thương.',
      brotherhoodBond: 'Bên ngoài trời đất lạnh lẽo bao nhiêu thì trong đình nghĩa khí huynh đệ lại nồng ấm bấy nhiêu; cùng chia nhau từng hớp rượu ấm, từng miếng thịt thơm, sinh tử không màng.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Tỳ Bà bốn dây và Khúc Sáo Trúc thô mộc sơn đen',
      harmonyVibe: 'Khúc ca hào sảng biên ải kết hợp giai điệu du dương ấm áp xua tan đêm đông băng giá.',
      originalPoem: `Lục nghĩ tân bôi tửu,
Hồng nê tiểu hỏa lô.
Vãn lai thiên dục tuyết,
Năng ẩm nhất bôi vô?`
    },
    sensoryDetails: {
      visual: 'Bông tuyết trắng muốt bay lượn ngoài màn đêm tương phản rực rỡ với ánh lửa than đỏ rực và sắc đỏ của hoa mai.',
      auditory: 'Tiếng than củi thông nổ tí tách, tiếng nước trà sôi sùng sục trong ấm đồng, tiếng chạm chén hào sảng vang xa.',
      olfactory: 'Mùi khói than thông thơm ngát quyện với mùi thịt bò nướng xèo xèo và hương trà thanh khiết của hoa mai.',
      gustatory: 'Ngụm rượu ấm nồng trôi xuống bụng xua tan cái rét tê tái, cắn miếng thịt nướng mọng nước béo ngậy thơm lừng.',
      tactile: 'Cảm giác buốt lạnh trên đầu ngón tay khi chạm vào bông tuyết tan rồi lập tức được sưởi ấm bên miệng chén trà nóng hổi.'
    },
    masterProseExcerpt: `Tuyết đầu mùa rơi dày đặc khắp đỉnh Vạn Kiếm Phong, nhuộm trắng xóa cả một vùng non xanh nước biếc.

Bên trong Vọng Mai Đình, chiếc lò đất nung đỏ rực than củi thông đang nổ lách tách từng đóa hoa lửa ấm áp. Giữa cái rét cắt da cắt thịt của mùa đông phương Bắc, mùi thịt bò tuyết nướng vỉ đá xèo xèo tỏa hương thơm ngào ngạt khắp đình. 

"Rượu Hỏa Thiêu thơm quá! Nước tuyết mai đun trong ấm đồng cũng đã sôi rồi!" 

Nàng thiếu nữ khoác áo choàng lông cáo đỏ thắm khẽ reo lên, gò má ửng hồng vì hơi ấm lò than. Nàng dùng đũa trúc gắp miếng thịt nướng vàng ruộm óng ánh mỡ đặt vào đĩa sứ của Tiêu Cảnh, ánh mắt chan chứa yêu thương.

"Hảo tửu! Hảo nhục!" 

Người huynh đệ kết nghĩa vỗ mạnh lên bàn đá hoa cương, tu một ngụm rượu lớn rồi cười ha hả: "Bên ngoài tuyết lớn ngàn dặm, giang hồ chém giết tranh giành hư danh. Chi bằng nơi đây có lò than ấm, có thịt ngon rượu cay, có huynh đệ và hồng nhan cùng cạn chén, thì dẫu làm hoàng đế chín tầng mây cũng chẳng đổi được khoảnh khắc này!"`
  },
  {
    id: 'scene_03_dam_sen_vong_nguyet_cam_tieu',
    title: 'Bích Đàm Vọng Nguyệt • Hà Hương Hợp Cầm Tiêu',
    alias: 'Thuyền Thơ Giữa Đầm Sen Trăng Thanh Gió Mát',
    theme: 'Đầm Sen Trăng Rằm',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm trăng đầu hạ, sương đêm buông xuống mặt đầm tĩnh mịch',
      weatherAndSeason: 'Gió nhẹ thổi qua đầm sen mang theo hơi nước mát lành và hương hoa dịu ngọt',
      lightingAndSpace: 'Ngàn mẫu hoa sen trắng muốt nở rộ dưới ánh trăng bàng bạc, đom đóm lập lòe bay lượn như muôn vì sao sa'
    },
    sceneryDescription: 'Hồ sen Bích Ba rộng ngàn mẫu, lá sen xanh mướt trải dài tít tắp chạm đến tận chân trời. Giữa đầm, những đóa sen trắng ngọc và hồng phai vươn cao trong sương đêm. Thuyền nan nhỏ trôi nhẹ nhàng len lỏi qua từng vòm lá sen xòe rộng như chiếc lọng xanh che chở không gian thoát tục.',
    wineAndFeast: {
      wines: ['Hà Diệp Thanh (rượu ủ trong búp sen tươi)', 'Liên Hoa Ngọc Lộ Đan Tửu', 'Bạch Mai Tửu'],
      delicacies: ['Hạt sen tươi bóc vỏ ngọt bùi thanh mát', 'Ngó sen xào tôm nõn giòn sần sật', 'Thịt chim trĩ hấp lá sen giữ trọn vị ngọt tự nhiên', 'Chè yến hoa sen ướp đường phèn tuyết'],
      tableSetting: 'Mâm đồng lót lá sen tươi, chén rượu tạc từ ngọc bích xanh mướt, một ngọn nến sáp thơm đặt trong lồng kính che gió'
    },
    companionsAndRomance: {
      heroes: 'Kiếm khách phong lưu thả kiếm bên mạn thuyền, gối đầu ngắm trời sao, miệng ngậm cọng cỏ lưu ly, tiêu sái tự tại.',
      beauties: 'Thần tiên tỷ tỷ thanh tao thoát tục tựa Hằng Nga giáng trần, ngón tay thon thả gảy khúc Cầm khúc Thanh Bình Điệu, tà váy ngọc lay động theo từng nhịp sóng.',
      brotherhoodBond: 'Bằng hữu thâm giao chỉ cần một ánh mắt là thấu hiểu tâm can, im lặng cùng thưởng trăng mà tình nghĩa tựa thái sơn.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Dao Cầm và Tiêu Trúc ngọc',
      harmonyVibe: 'Giai điệu thanh nhã, u hoài như tiếng thì thầm của gió với hoa, khiến vạn vật trong đầm sen đều lặng đi lắng nghe.',
      originalPoem: `Bích ba thiên mẫu liên hoa khai,
Nguyệt sắc như ngân dạ dạ lai.
Cầm tiêu hợp tấu thanh trần niệm,
Bất tố thần tiên tố thử tài.`
    },
    sensoryDetails: {
      visual: 'Hàng ngàn đóa sen trắng ngọc nở bung dưới trăng, ánh đom đóm dập dờn quanh mạn thuyền như rải kim tuyến.',
      auditory: 'Tiếng giọt sương đêm rơi tí tách từ lá sen xuống mặt nước phẳng lặng, tiếng đàn cầm thánh thót ngân vang giữa không gian tĩnh mịch.',
      olfactory: 'Hương thơm thanh tao dịu ngọt của bạt ngàn hoa sen quyện cùng mùi men rượu ủ trong búp sen ngây ngất lòng người.',
      gustatory: 'Vị ngọt thanh mát của hạt sen non giòn ngọt, ngụm rượu Hà Diệp mát lạnh giải tỏa mọi ưu phiền u uất.',
      tactile: 'Cảm giác mát rượi của sương đêm đọng trên mu bàn tay, làn gió đầm sen mơn man mái tóc thề.'
    },
    masterProseExcerpt: `Hồ Bích Ba mười dặm ngát hương sen.

Đêm hạ thanh vắng, trăng sáng như gương rọi bóng muôn ngàn đóa sen trắng muốt đang e ấp hé nở. Chiếc thuyền nan nhẹ nhàng rẽ lá sen trôi lững lờ vào tận sâu trong đầm. Xung quanh, hàng vạn cánh sen đón ánh trăng lung linh huyền ảo, lũ đom đóm lập lòe bay lượn như đưa người lạc vào chốn Dao Trì tiên cảnh.

Đặt trên chiếc mâm phủ lá sen tươi là hũ rượu Hà Diệp vừa lấy từ trong búp sen đại thụ. Rót rượu ra chén ngọc bích, sắc rượu xanh óng ánh như ngọc phỉ thúy, hương thơm ngào ngạt lan tỏa khắp mặt hồ.

"Keng..."

Tiếng đàn Dao Cầm khẽ cất lên. Tố Y ngồi xếp bằng ở mũi thuyền, ngón tay thon dài gảy nhẹ vào dây cung lụa. Tiếng đàn thanh thoát, êm ả như dòng suối nguồn chảy qua khe đá rêu phong. Ngồi tựa mạn thuyền, Tiêu Cảnh đưa ống ngọc tiêu lên môi, hòa nhịp thổi theo. 

Tiếng đàn tiếng tiêu quyện lấy nhau, bổng trầm nhịp nhàng lúc thì như đôi bướm vờn hoa sen, lúc lại như mây nước trôi vô định giữa trời đêm. Giữa đất trời bao la, hương sen phảng phất, chén rượu thơm nồng, người cùng tri kỷ hòa khúc tiêu dao, cõi phàm trần bụi bặm dường như đã lùi xa vạn dặm ngoài kia.`
  },
  {
    id: 'scene_04_dinh_nui_hoa_lac_ngam_tho',
    title: 'Đào Hoa Tiên Ổ • Phong Đỉnh Đối Ẩm Phóng Cuồng',
    alias: 'Đỉnh Núi Hoa Rơi Uống Rượu Ngâm Thơ Luận Anh Hùng',
    theme: 'Đình Đài Hoa Lạc',
    timeAndAtmosphere: {
      timeOfDay: 'Buổi chiều tà hoàng hôn chuyển sang chạng vạng, mây đỏ rực rỡ như ráng gấm',
      weatherAndSeason: 'Mùa xuân ấm áp, gió xuân thổi tung ngàn cánh hoa đào đỏ thắm rơi như mưa hoa',
      lightingAndSpace: 'Ánh tà dương nhuộm vàng vách núi đá dựng đứng, nhìn xuống biển mây cuồn cuộn dưới chân như tiên cảnh'
    },
    sceneryDescription: 'Một khu rừng đào ngàn năm nở rộ trên đỉnh núi Cô Vân, hoa đào rơi phủ kín mặt đất thành tấm thảm hồng nhung. Giữa rừng có một đình đá hoa cương cổ kính, bốn bề gió thổi lồng lộng, phóng tầm mắt thấy non sông cẩm tú vạn dặm mờ ảo trong sương chiều.',
    wineAndFeast: {
      wines: ['Đào Hoa Lạc Linh Tửu (rượu chôn dưới gốc đào 50 năm)', 'Túy Sinh Mộng Tử', 'Thanh Phong Tửu'],
      delicacies: ['Thịt bê non thui rơm cuốn bánh tráng rau rừng', 'Gà đồi bọc đất sét nướng củi đào thơm ngát', 'Thịt lợn mọi xông khói treo gác bếp', 'Mật ong rừng ngâm hoa đào tráng miệng'],
      tableSetting: 'Chiếu cói trải trên phiến đá phẳng phủ đầy cánh hoa rơi, vò rượu đất nung đập vỡ niêm phong bùn đất, chén lớn bát to uống rượu hào sảng'
    },
    companionsAndRomance: {
      heroes: 'Các bậc hào kiệt giang hồ cởi bỏ áo giáp gươm giáo, đầu đội nón lá, áo vải thô, đối ẩm cười đùa xem giang sơn như một ván cờ nhàn.',
      beauties: 'Nữ hiệp hào sảng tay cầm bầu rượu, tóc bay lòa xòa trước trán, uống rượu không thua đấng mày râu, nụ cười rạng rỡ như nắng mai.',
      brotherhoodBond: 'Lời hứa son sắt của những bậc trượng phu: Dẫu sau này mỗi người một ngả, kẻ làm hoàng đế người làm thứ dân, hễ nhớ nhau là quay về đỉnh núi này cạn một vò rượu đào.'
    },
    musicAndPoetry: {
      instruments: 'Trống da trâu gõ nhịp và khúc ngâm thơ hào sảng',
      harmonyVibe: 'Âm hưởng hào hùng, phóng khoáng, cuồng nhiệt ngập tràn hào khí giang hồ.',
      originalPoem: `Đào hoa ổ lý đào hoa tiên,
Đào hoa tiên nhân chủng đào thụ.
Cửu bôi bất túy nhân tự túy,
Tiếu khán thiên hạ vạn niên hưng.`
    },
    sensoryDetails: {
      visual: 'Cánh hoa đào hồng thắm rơi lả tả xuống tóc, vạt áo và mặt rượu sóng sánh màu hổ phách dưới ánh hoàng hôn dát vàng.',
      auditory: 'Tiếng vỗ bàn hát vang khúc ngâm giang hồ, tiếng gió núi rít qua rặng đá, tiếng cười giòn giã át cả tiếng sấm xa.',
      olfactory: 'Hương hoa đào ngọt ngào ngây ngất quyện với hương bùn đất và mùi rượu nếp cái hoa vàng nồng đậm xộc vào mũi.',
      gustatory: 'Vị rượu đậm đà ngọt hậu làm nóng bừng lồng ngực, miếng gà nướng củi đào thơm ngậy béo bùi giòn rụm.',
      tactile: 'Cánh hoa đào mềm như nhung khẽ lướt qua gò má ấm nồng men say, gió xuân mát rượi thổi tung tà áo.'
    },
    masterProseExcerpt: `Hoàng hôn buông xuống đỉnh Cô Vân, ráng chiều dát một màu đỏ ối lên biển mây cuồn cuộn dưới chân vực.

Gió xuân thổi qua, rừng đào cổ thụ trút xuống một trận mưa hoa rực rỡ. Hàng vạn cánh hoa đào hồng thắm lả tả bay trong không trung, rơi đậu lên mái tóc, lên bờ vai và rơi cả vào trong những vò rượu lớn đang mở nắp.

"Bốp!" 

Tiêu Cảnh vung chưởng đập vỡ lớp bùn phong của vò Đào Hoa Lạc ngũ thập niên. Một làn hương rượu ngào ngạt như mật ngọt lập tức bay thốc ra, khiến ba quân tướng sĩ đứng quanh đều phải hít sâu một hơi thèm thuồng. Chàng rót rượu tràn trề ra những chiếc bát sành lớn, rượu màu hổ phách sóng sánh phản chiếu ánh chiều tà.

"Huynh đệ bốn bể đều là người một nhà! Giang hồ đao kiếm vô tình, hôm nay có duyên tương ngộ nơi Đào Hoa Ổ, hãy cạn chén này vì giang sơn và bằng hữu!"

Tiếng bát sành va vào nhau giòn tan. Những bậc anh hùng hảo hán ngửa cổ uống cạn một hơi, rượu chảy tràn qua khóe miệng ướt đẫm vạt áo thô. Tiếng cười vang dội khắp đỉnh núi, át cả tiếng gió gầm, hòa cùng những cánh hoa đào tung bay lộng lẫy giữa trời chiều biên ải.`
  },
  {
    id: 'scene_05_lam_tuyen_thanh_tich_am_thao',
    title: 'Thanh Khê U Cốc • Tùng Thạch Đối Tửu Tri Âm',
    alias: 'Suối Rừng Ẩn Dật Uống Rượu Nướng Cá Nghe Suối Reo',
    theme: 'Suối Rừng Ẩn Dật',
    timeAndAtmosphere: {
      timeOfDay: 'Buổi sớm mai khi ánh nắng đầu tiên xuyên qua kẽ lá rừng già, sương sớm long lanh',
      weatherAndSeason: 'Tiết trời thanh mát trong lành, tiếng chim hót véo von đón bình minh',
      lightingAndSpace: 'Những vạt nắng vàng như sợi tơ lấp lánh rọi xuống dòng suối trong vắt nhìn thấu tận đáy sỏi cuội'
    },
    sceneryDescription: 'Một thung lũng nguyên sinh ẩn sâu trong núi thẳm, có dòng suối ngọc róc rách chảy qua bãi đá cuội tròn nhẵn. Rặng tùng cổ thụ ngàn năm xòe tán che mát cả một vùng. Thác nước nhỏ đổ xuống hồ nước trong veo như mắt mèo, bầy cá suối tung tăng bơi lội dưới bóng hoa rừng rơi.',
    wineAndFeast: {
      wines: ['Linh Tuyền Thạch Nhũ Tửu (ủ bằng nước suối nguồn)', 'Bích Ngọc Tửu', 'Hầu Nhi Tửu hái từ hang khỉ'],
      delicacies: ['Cá suối nướng than củi kẹp thanh tre thơm phức', 'Măng rừng nướng chấm muối ớt rừng hạt tiêu', 'Rau dớn xào tỏi suối giòn ngọt', 'Nấm hương rừng nấu canh thịt gà suối ngọt lịm'],
      tableSetting: 'Phiến đá cuội phẳng phiu làm bàn, ống tre tươi làm cốc uống rượu, đĩa đan bằng lá dong rừng tươi xanh mát mắt'
    },
    companionsAndRomance: {
      heroes: 'Ẩn sĩ đại tài từng danh chấn thiên hạ nay quy ẩn nơi sơn lâm, râu tóc bạc phơ nhưng mắt sáng quắc như sao, ung dung thong thả buông cần câu cá.',
      beauties: 'Thiếu nữ sơn cước ngây thơ thuần khiết, chân trần lội suối cười giòn tan, tóc cài hoa dại thơm ngát.',
      brotherhoodBond: 'Tình tri kỷ vong niên không câu nệ tuổi tác xuất thân; cùng ngồi bên bờ suối đàm đạo về nhân sinh, kiếm đạo và lẽ huyền vi của trời đất.'
    },
    musicAndPoetry: {
      instruments: 'Khúc sáo trúc ngắn mộc mạc và tiếng gõ nhịp của hòn sỏi vào đá cuội',
      harmonyVibe: 'Thanh bình, êm ả, hòa nhập trọn vẹn vào tiếng róc rách của nước suối và tiếng chim rừng líu lo.',
      originalPoem: `Minh nguyệt tùng gian chiếu,
Thanh tuyền thạch thượng lưu.
Trúc huyên quy hoán nữ,
Liên động hạ ngư chu.`
    },
    sensoryDetails: {
      visual: 'Dòng nước suối trong leo lẻo soi rõ từng viên sỏi ngũ sắc, ánh nắng sớm xuyên qua tàn cây tạo thành những luồng sáng lung linh.',
      auditory: 'Tiếng suối reo róc rách vui tai, tiếng chim rừng gọi bạn ríu rít, tiếng củi khô nổ tí tách êm đềm.',
      olfactory: 'Mùi nhựa thông thơm ngát thoang thoảng trong gió sớm quyện cùng mùi cá suối nướng chín vàng trên than hồng.',
      gustatory: 'Thịt cá suối ngọt lịm chắc nịch không một chút tanh, ngụm rượu suối thanh mát như nước cam lộ thấm đẫm tâm can.',
      tactile: 'Làn nước suối mát lạnh mơn man bàn chân trần, phiến đá cuội mịn màng ấm áp dưới ánh nắng sớm mai.'
    },
    masterProseExcerpt: `Nắng sớm ban mai rải những vạt vàng óng ả qua tán lá tùng xanh ngắt, soi rọi xuống dòng suối trong vắt nhìn thấy rõ từng viên sỏi cuội ngũ sắc đáy dòng.

Trên phiến đá tảng phẳng phiu giữa lòng suối, một chiếc vỉ nẹp tre đang kẹp những con cá suối béo tròn nướng trên bếp than củi thơm lừng. Mỡ cá xèo xèo nhỏ giọt xuống tro hồng bốc lên một mùi thơm ngậy kích thích mọi giác quan.

"Cá suối chín rồi! Mau uống ngụm Linh Tuyền Tửu này đi!" 

Lão ẩn sĩ cười hề hề, mở nắp ống tre đựng rượu ủ bằng thạch nhũ suối nguồn. Rượu rót ra chén tre tươi, thơm nồng mùi thảo mộc thiên nhiên hoang dã. 

Tiêu Cảnh ngửa đầu nhấp một ngụm. Rượu vừa trôi qua cổ họng, một luồng thanh khí mát lạnh lập tức lan tỏa khắp kinh mạch, quét sạch mọi bụi bặm, toan tính và sát khí nơi sa trường đẫm máu. Chàng thở dài một hơi khoan khoái, dựa lưng vào gốc tùng già ngàn năm, nhắm mắt lắng nghe tiếng suối reo rì rào hòa cùng tiếng sáo trúc thanh tao của người tri kỷ. Khoảnh khắc ấy, vạn dặm giang sơn cùng ngai vàng quyền lực dường như chỉ là giấc mộng thoảng qua.`
  },
  {
    id: 'scene_06_hoa_dang_thuy_dien',
    title: 'Vạn Đăng Lưu Thủy • Tần Hoài Hoa Đăng Dạ Hội',
    alias: 'Đêm Hội Thả Đèn Hoa Đăng Trôi Dạt Sông Nước',
    theme: 'Lễ Hội Thả Hoa Đăng',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm Trung Thu hoặc Thất Tịch, giờ Tuất chớm canh một, bầu trời đêm tím thẫm đọng ánh sao',
      weatherAndSeason: 'Gió thu mơn man mặt nước lụa, không khí mát dịu, sương mỏng lượn lờ ven bến đò',
      lightingAndSpace: 'Mười dặm sông Tần Hoài bừng sáng rực rỡ bởi hàng vạn đóa đèn hoa đăng giấy ngũ sắc, ánh nến lung linh trôi bồng bềnh tựa dải Ngân Hà rớt xuống trần gian'
    },
    sceneryDescription: 'Hai bên bờ sông là những dãy lầu son gác tía treo đèn lồng đỏ rực, cầu đá uốn cong như cầu vồng bắc qua dòng nước biếc. Hàng vạn chiếc đèn hoa đăng xếp hình hoa sen bằng giấy hồng, giấy vàng mang theo ngọn nến nhỏ lập lòe trôi lững lờ theo dòng nước xuôi về phía biển. Thuyền hoa kết lụa thêu tơ rẽ sóng nhẹ nhàng, tiếng mái chèo khua nước hòa cùng tiếng cười nói rộn rã của tài tử giai nhân.',
    wineAndFeast: {
      wines: ['Quế Hoa Đông Nhưỡng Tửu (rượu ủ hoa quế mùa thu)', 'Hương La Quỳnh Dịch', 'Ngọc Lộ Băng Thiêu'],
      delicacies: ['Bánh trung thu nhân hạt sen trứng muối nướng vàng ruộm', 'Vịt quay mật ong Kim Lăng da giòn bóng bẩy', 'Thịt xông khói áp chảo cuốn củ năng ngọt thanh', 'Kẹo chỉ tơ đường kéo sợi phủ mè rang'],
      tableSetting: 'Bàn gỗ sơn then đặt trên mũi thuyền hoa, khay bạc đựng nến thơm chạm hoa mai, lẵng hoa tươi phủ vải lụa đỏ gấm điều'
    },
    companionsAndRomance: {
      heroes: 'Kiếm khách hào hoa buông lơi tay kiếm, cúi người thắp sáng ngọn nến hoa đăng trao cho mỹ nhân; ánh mắt kiên định dịu dàng nhìn phản chiếu trong đáy mắt nàng.',
      beauties: 'Thiếu nữ e ấp đôi gò má ửng hồng dưới ánh nến lung linh, tà áo lụa thêu hoa quế mềm mại, chắp hai tay thành kính thả chiếc đèn hoa sen xuống nước nguyện ước bách niên giai lão.',
      brotherhoodBond: 'Huynh đệ bốn phương cùng tụ hội trên mũi thuyền lớn, nâng vò rượu hoa quế chạm nhau chan chát, cầu chúc cho thiên hạ thái bình, núi sông yên ấm.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Tỳ Bà gảy khúc Phượng Cầu Hoàng và Đàn Tranh mười sáu dây thanh thoát',
      harmonyVibe: 'Âm điệu du dương, tình tứ, nhộn nhịp mà đượm vẻ lãng mạn thi vị ngập tràn hơi thở nhân gian.',
      originalPoem: `Thập lý Tần Hoài hoa đăng hỏa,
Vạn đóa liên đăng thủy thượng phù.
Kỳ nguyện lưỡng tình giai vĩnh kết,
Bất phụ thanh xuân dạ nguyệt chu.`
    },
    sensoryDetails: {
      visual: 'Mặt sông đỏ rực ánh nến vàng cam bồng bềnh, pháo hoa nổ bung trên trời đêm nở thành những đóa hoa lửa rực rỡ soi bóng giai nhân.',
      auditory: 'Tiếng đàn tỳ bà thánh thót reo vui, tiếng nước vỗ bì bõm mạn thuyền, tiếng reo hò hân hoan của dòng người xem hội hai bên bờ.',
      olfactory: 'Mùi sáp ong cháy thơm dịu quyện với hương hoa quế thoang thoảng trong gió thu và mùi bánh nướng thơm lừng.',
      gustatory: 'Vị ngọt thanh dịu ngọt của rượu Quế Hoa đọng nơi đầu lưỡi, miếng bánh nướng mềm dẻo thơm bùi béo ngậy.',
      tactile: 'Cảm giác ấm nóng của ngọn nến hoa đăng trên lòng bàn tay, làn gió thu mát rượi thổi qua làn tóc mai.'
    },
    masterProseExcerpt: `Đêm hội Hoa Đăng, mười dặm sông Tần Hoài rực sáng như ban ngày.

Từ trên cầu đá nhìn xuống, mặt nước phẳng lặng như tấm gương khổng lồ phản chiếu hàng vạn đóa đèn hoa sen bằng giấy ngũ sắc đang lững lờ trôi theo con nước. Mỗi ngọn hoa đăng mang theo một ngọn nến nhỏ lập lòe, chở đi ngàn vạn lời nguyện ước bình an và duyên phận lứa đôi, biến dòng sông thành một dải Ngân Hà bừng sáng giữa nhân gian.

Chiếc thuyền hoa kết lụa đỏ của Tiêu Cảnh rẽ sóng nhẹ nhàng lướt qua giữa muôn ngàn đóa đăng hoa. 

"Chàng xem kìa! Chiếc hoa đăng hình hoa sen tuyết của chúng ta trôi xa nhất rồi!"

Tố Y khẽ reo lên, đôi mắt long lanh ngập tràn niềm vui sướng. Nàng khoác chiếc áo choàng màu hồng phấn, hai má ửng hồng phản chiếu ánh nến bập bùng, đẹp tựa trăng rằm. Tiêu Cảnh mỉm cười, một tay ôm lấy bờ vai mềm mại của nàng, tay kia nâng chén rượu Quế Hoa thơm nồng ngước nhìn pháo hoa đang nổ bung rực rỡ trên bầu trời đêm.

Tiếng đàn tỳ bà từ khoang thuyền cất lên réo rắt, hòa cùng tiếng hò reo mừng hội của bách tính hai bên bờ sông. Trong khoảnh khắc hoa đăng rợp nước, pháo hoa rợp trời ấy, những mệt mỏi tranh đoạt giang sơn dường như tan biến thành mây khói, chỉ còn lại sự ấm áp chân thành của tình yêu và nghĩa khí ngàn thu.`
  },
  {
    id: 'scene_07_thien_dang_khong_minh',
    title: 'Thiên Cung Tinh Hỏa • Vạn Trượng Khổng Minh Thiên Đăng Tiệc',
    alias: 'Lễ Hội Thả Đèn Khổng Minh Bay Rợp Trời Đêm',
    theme: 'Lễ Hội Đèn Khổng Minh',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm Thượng Nguyên rằm tháng Giêng, giờ Hợi canh hai, trời cao gió lộng trăng tròn vằng vặc',
      weatherAndSeason: 'Gió xuân nhẹ nhàng nâng cánh đèn lướt bay, bầu trời đêm trong vắt không một áng mây',
      lightingAndSpace: 'Từ đỉnh thành trì cao ngàn trượng, mười vạn chiếc đèn Khổng Minh vàng rực như muôn vạn vì sao từ từ bay lên không trung, thắp sáng cả vòm trời vô tận'
    },
    sceneryDescription: 'Trên đỉnh lầu thành cổ kính nhìn xuống toàn cảnh kinh đô sầm uất. Hàng vạn bách tính cùng tu sĩ khoác lễ phục tề tựu. Những chiếc đèn Khổng Minh đan bằng nan tre dán giấy bản bôi sáp ong được châm lửa tim dầu, từ từ căng phồng khí nóng rồi nhẹ nhàng nhấc mình bay bổng lên trời cao. Từng chùm từng cụm đèn kết thành những dòng sông lửa vàng ấm áp trôi lững lờ hướng về phía Cửu Trùng Thiên.',
    wineAndFeast: {
      wines: ['Cửu Thiên Tinh Hà Tửu (rượu lấp lánh bụi vàng)', 'Xuân Phong Nhưỡng', 'Bạch Ngọc Trúc Diệp'],
      delicacies: ['Bò tơ nướng nguyên con tẩm ướp linh thảo thơm nức', 'Bánh nếp nướng mật mía ngọt lịm', 'Xôi ngũ sắc đồ hoa hồi dẻo thơm', 'Trái cây tuyết sơn ướp đường sương mai'],
      tableSetting: 'Bàn tiệc ngọc thạch trải dọc tường thành, vò rượu cổ quấn dây đỏ, đĩa đồng nướng thịt than hoa cháy bập bùng'
    },
    companionsAndRomance: {
      heroes: 'Bậc đại trượng phu đứng sừng sững trên đỉnh tường thành, áo choàng chiến bào bay phần phật, cùng các tướng sĩ nâng đèn cầu cho đất nước thái bình thịnh trị.',
      beauties: 'Giai nhân thanh tú viết từng dòng chữ nắn nót lên thân đèn giấy: "Nguyện người nơi phương xa bình an vô sự, bách niên giai lão", ánh mắt chan chứa tình cảm dịu dàng.',
      brotherhoodBond: 'Những người anh em vào sinh ra tử cùng nắm chung một chiếc đèn Khổng Minh khổng lồ, đồng thanh hô vang lời thề kết nghĩa trước khi thả tay để đèn bay vút lên trời xanh.'
    },
    musicAndPoetry: {
      instruments: 'Trống đồng cổ gõ nhịp trầm hùng hòa cùng khúc Tiêu ngọc thanh cao',
      harmonyVibe: 'Hùng tráng, bao la, rung động tâm can, gợi cảm giác siêu thoát vươn tới trời cao vô tận.',
      originalPoem: `Vạn trượng thiên đăng thướng bích tiêu,
Tinh hà dạ sắc dạ phiêu diêu.
Bằng hữu cộng ẩm thanh phong tửu,
Nguyện đắc giang sơn vĩnh bất điêu.`
    },
    sensoryDetails: {
      visual: 'Biển đèn Khổng Minh vàng rực rỡ như vạn đốm lửa tiên bay lơ lửng giữa trời đêm đen thẫm, chiếu sáng từng gương mặt rạng rỡ nụ cười.',
      auditory: 'Tiếng thở phào reo mừng khi chiếc đèn bay vút lên cao, tiếng trống đồng gõ nhịp hào hùng vang vọng khắp thành lũy.',
      olfactory: 'Mùi giấy bản thơm mùi dầu thông và sáp ong nóng quyện với mùi thịt bò nướng than hoa thơm lừng.',
      gustatory: 'Vị rượu Tinh Hà cay ngọt tê rần đầu lưỡi, ngụm rượu ấm nồng làm rực sáng huyết mạch giữa đêm xuân mát lạnh.',
      tactile: 'Hơi nóng ấm áp tỏa ra từ buồng đốt chiếc đèn Khổng Minh truyền vào hai bàn tay đang nâng niu giữ mép đèn.'
    },
    masterProseExcerpt: `Trên đỉnh lầu thành Bắc Lương Quan, gió xuân lồng lộng thổi qua những dải cờ lệnh đỏ thắm.

Đúng giờ Hợi canh hai, một tiếng chiêng đồng ngân vang rền rĩ. Liền sau đó, từ chân thành cho tới khắp các ngõ ngách trong kinh kỳ, hàng vạn ngọn lửa nhỏ đồng loạt bừng sáng bên trong những chiếc đèn Khổng Minh.

"Thả đèn! Nghênh thiên phúc!"

Theo hiệu lệnh của Tiêu Cảnh, mười vạn cánh tay đồng loạt buông ra. Hàng vạn chiếc đèn Khổng Minh căng tròn khí nóng, chậm rãi bay bổng lên không trung. Ban đầu chỉ như những đốm đom đóm vàng rực lập lòe, nhưng chỉ chớp mắt sau, cả bầu trời đêm đen thẫm đã bị nhuộm thành một biển tinh hà vàng óng rực rỡ vô tiền khoáng hậu.

"Đẹp quá... Tựa như ngàn vạn ngôi sao đang bay ngược về trời!" Tố Y ngước nhìn bầu trời sao nhân tạo, khóe mắt lấp lánh ánh lệ cảm động.

Tiêu Cảnh siết chặt bàn tay nàng, cùng ngắm nhìn chiếc thiên đăng thêu chữ "Đại Càn Vĩnh Bình" đang dẫn đầu bay vút lên chín tầng mây. Phía sau chàng, ba ngàn tướng sĩ cùng các huynh đệ kết nghĩa đồng loạt nâng vò rượu sành, tiếng chạm vò rộn rã hòa cùng tiếng reo hò vang chuyển đất trời. Đêm ấy, ngọn lửa của niềm hy vọng và lời thề non nước đã thắp sáng cả cõi giang sơn hiểm trở.`
  },
  {
    id: 'scene_08_giao_mua_nghenh_xuan',
    title: 'Tứ Thì Hồi Xuân • Lập Xuân Nghênh Phúc Đại Điển',
    alias: 'Lễ Hội Giao Mùa Đông Tàn Xuân Tới Đốt Pháo Uống Rượu Nghênh Xuân',
    theme: 'Lễ Hội Giao Mùa Nghênh Xuân',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm giao thừa lập xuân, thời khắc đất trời chuyển giao giữa mùa đông giá lạnh và mùa xuân ấm áp',
      weatherAndSeason: 'Băng tuyết trên mái ngói bắt đầu tan róc rách, gió đông dần nhường chỗ cho gió xuân phơi phới mang hơi ấm đất trời',
      lightingAndSpace: 'Khắp ngõ phố làng quê chăng đèn lồng đỏ, câu đối đỏ dán khắp cửa nhà, pháo trúc nổ giòn giã tỏa khói thuốc súng bảng lảng xua đuổi tà khí'
    },
    sceneryDescription: 'Khu quảng trường trung tâm của cổ thành chật ních người qua lại du xuân. Những cành đào rừng cành mai tuyết hé nụ chúm chím đón xuân sang. Giữa sân dựng cây nêu cao vút treo chuông gió bằng ngọc và cờ ngũ sắc. Bếp lửa đại đồng đỏ rực đun nồi bánh chưng, bánh nếp thơm lừng khói nghi ngút, già trẻ gái trai đều diện quần áo mới rực rỡ.',
    wineAndFeast: {
      wines: ['Đồ Tô Tửu (rượu thuốc trừ tà nghênh xuân)', 'Giao Lạc Tửu', 'Ngũ Cốc Bách Hoa Nhưỡng'],
      delicacies: ['Bánh xuân (Xuân Bính) cuốn rau mầm tươi non giòn ngọt', 'Thịt lợn bản quay giòn bì thơm phức', 'Canh gà hầm nấm linh chi hồi xuân', 'Mứt gừng, mứt sen trần đường phèn cay ngọt'],
      tableSetting: 'Bàn gỗ mộc phủ vải gấm hoa đào, khay mứt ngũ sắc sơn son thiếp vàng, bình gốm cắm cành đào bích nở rộ'
    },
    companionsAndRomance: {
      heroes: 'Các bậc anh hùng cởi bỏ chiến bào đẫm máu, cùng nhau nâng chén rượu Đồ Tô chúc thọ cha mẹ, chúc bằng hữu năm mới võ vận hưng long, kiếm đạo tinh tiến.',
      beauties: 'Thiếu nữ thắt dải lụa đỏ may mắn quanh cổ tay người yêu, trao túi thơm thêu hình uyên ương đón xuân mới.',
      brotherhoodBond: 'Huynh đệ ngồi quây quần quanh bếp than hồng bập bùng, ôn lại những trận chiến sinh tử trong năm qua, cùng chia nhau miếng bánh xuân ấm áp.'
    },
    musicAndPoetry: {
      instruments: 'Trống sấm rộn rã múa lân sư rồng hòa cùng tiếng khèn bè và đàn nguyệt',
      harmonyVibe: 'Rộn ràng, náo nức, tràn trề sinh khí tái sinh của đất trời vạn vật bước vào mùa xuân mới.',
      originalPoem: `Bạo trúc nhất thanh trừ cựu tuế,
Xuân phong tống noãn nhập Đồ Tô.
Thiên môn vạn hộ đồng giai tiết,
Tổng bả tân đào hoán cựu phù.`
    },
    sensoryDetails: {
      visual: 'Màu đỏ rực rỡ của câu đối, lồng đèn và xác pháo hồng rải kín lối đi, cánh hoa đào hé nở rạng rỡ trong nắng xuân.',
      auditory: 'Tiếng pháo nổ đì đẹt giòn tan xua tà khí, tiếng trống múa lân rộn rã, tiếng chúc tụng cười đùa vang khắp hang cùng ngõ hẻm.',
      olfactory: 'Mùi thuốc pháo nồng ấm quyện cùng mùi hương trầm ngào ngạt và mùi nếp mới đồ xôi ngọt ngào.',
      gustatory: 'Vị cay nồng ấm áp của rượu Đồ Tô làm bừng tỉnh kinh mạch, vị ngọt bùi của mứt gừng và bánh xuân giòn tan.',
      tactile: 'Cảm giác hơi ấm gió xuân mơn man xua đi cái rét cóng của mùa đông, tà áo mới mềm mại trên làn da.'
    },
    masterProseExcerpt: `Tiếng pháo nổ giòn giã vang lên xua tan đi màn đêm đông lạnh giá cuối cùng của năm cũ.

Thời khắc lập xuân đã điểm. Gió xuân ấm áp thổi về, làm tan đi những mẩu băng tuyết cuối cùng đọng trên mái ngói cong vút của Tử Thần Điện. Dưới sân quảng trường, bếp lửa đại đồng rực sáng, khói thơm từ nồi bánh nếp ngào ngạt bay tỏa khắp không gian hòa cùng sắc đỏ thắm của ngàn vạn cành đào rừng đang thi nhau bung nở.

"Cạn chén rượu Đồ Tô, tống cựu nghênh tân! Chúc bách tính muôn dân ấm no, chúc huynh đệ biên cương trọn đời bình an!"

Tiêu Cảnh đứng giữa các tướng sĩ và huynh đệ bằng hữu, ngửa cổ uống cạn chén rượu thuốc thơm nồng. Rượu vào đến đâu, khí ấm tràn lan tới đó, xua sạch mọi hàn khí tích tụ nơi chiến trường tuyết phủ. 

Bên cạnh, Tố Y khẽ mỉm cười dịu dàng, buộc dải lụa đỏ bình an vào đốc kiếm của chàng. Tiếng trống múa lân sư rồng vang lên rộn rã, tiếng trẻ thơ reo hò nhặt xác pháo hồng rải kín mặt đất. Sau bao năm chinh chiến phong ba, mùa xuân của thái bình thịnh trị cuối cùng đã thực sự trở về trên mảnh đất giang sơn gấm vóc này.`
  },
  {
    id: 'scene_09_nguyen_tieu_pho_co',
    title: 'Thượng Nguyên Dạ Thị • Huyên Náo Hoa Đăng Đố Thi Hội',
    alias: 'Đêm Rằm Nguyên Tiêu Phố Cổ Đèn Hoa Rực Rỡ Đố Thơ Ghép Chữ',
    theme: 'Lễ Hội Nguyên Tiêu Phố Cổ',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm rằm tháng Giêng (Tết Thượng Nguyên), giờ Tuất canh một, đèn đuốc sáng trưng không phân biệt ngày đêm',
      weatherAndSeason: 'Trời xuân thanh dịu, gió mơn man tà áo, trăng tròn đầu năm vằng vặc sáng trong',
      lightingAndSpace: 'Phố cổ ngàn năm giăng kín đèn lồng bát giác, đèn kéo quân, đèn hoa sen sáng rực như ban ngày, biển người chen chúc du xuân'
    },
    sceneryDescription: 'Khu phố cổ phồn hoa kéo dài mười dặm bên bờ kênh ngọc. Hàng ngàn gian hàng bày bán đồ thủ công, kẹo hồ lô đỏ mọng, mặt nạ tuồng cổ. Dưới mỗi chiếc đèn lồng treo một dải lụa đỏ ghi những câu đố chữ, câu đối thi ca. Các văn nhân mặc khách vung quạt tranh tài, giai nhân che quạt cười duyên, trẻ nhỏ chạy nhảy tay cầm đèn lồng cá chép hóa rồng.',
    wineAndFeast: {
      wines: ['Nguyên Tiêu Thược Dược Tửu', 'Bạch Ngọc Thiềm Thừ Tửu', 'Lê Hoa Xuân'],
      delicacies: ['Bánh trôi nước Nguyên Tiêu nhân vừng đen chan nước đường gừng thơm phức', 'Kẹo hồ lô ngào đường óng ánh đỏ rực', 'Thịt xiên nướng hạt thì là xông khói thơm phức', 'Trà hoa cúc mật ong tuyết nhĩ'],
      tableSetting: 'Quán trà ven đường mái hiên cổ kính, bàn trà gỗ mộc kê sát lan can nhìn xuống dòng người trẩy hội'
    },
    companionsAndRomance: {
      heroes: 'Kiếm khách phong lưu giải nhanh câu đố hóc búa nhất giành lấy chiếc lồng đèn thỏ ngọc tinh xảo nhất tặng cho người thương.',
      beauties: 'Tuyệt sắc giai nhân khoác áo lông nhung màu tuyết trắng, cầm chiếc đèn lồng hoa đăng rảo bước giữa dòng người, quay đầu lại mỉm cười với chàng giữa ánh đèn hoa rực rỡ.',
      brotherhoodBond: 'Bằng hữu cùng nhau dạo chợ đêm, trêu đùa thi nhau đoán câu đố, cược nhau bằng những bát bánh trôi nước ngọt ngào ấm áp.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Tranh hòa cùng sáo tiêu và tiếng trống mõ gõ nhịp đố thơ',
      harmonyVibe: 'Rộn rã, duyên dáng, tràn đầy tình ý lãng mạn và phong nhã của chốn kinh kỳ hoa lệ.',
      originalPoem: `Đông phong dạ phóng hoa thiên thụ,
Cánh xuy lạc, tinh như vũ.
Chúng lý tầm tha thiên bách độ,
Mạc nhiên hồi thủ,
Na nhân khước tại, đăng hỏa lan san xứ.`
    },
    sensoryDetails: {
      visual: 'Biển đèn lồng lung linh đủ màu sắc đỏ, vàng, lục, lam; bóng dáng người thương quay đầu mỉm cười giữa ánh đèn hoa rực rỡ.',
      auditory: 'Tiếng ngâm thơ đối chữ vang lên từng tràng tán thưởng, tiếng cười giòn giã của thiếu nữ, tiếng rao hàng ngọt ngào của các bà quán trà.',
      olfactory: 'Mùi nước đường gừng cay ngọt bốc khói nghi ngút quyện với mùi đường mạch nha của kẹo hồ lô và hương phấn son thoang thoảng.',
      gustatory: 'Cắn vỡ viên bánh trôi nước mềm dẻo, nhân vừng đen thơm bùi ngọt lịm tan chảy nơi đầu lưỡi cùng vị cay ấm của nước gừng.',
      tactile: 'Cảm giác ấm áp khi nắm lấy bàn tay thon nhỏ của nàng dạo bước giữa dòng người đông đúc chen vai sát cánh.'
    },
    masterProseExcerpt: `Đêm rằm Nguyên Tiêu, khắp thành Lạc Dương đèn hoa sáng rực như ban ngày.

Gió đông thổi qua tựa hồ ngàn cây đơm hoa lửa. Từng dãy đèn kéo quân tinh xảo xoay tròn theo bóng nến, vẽ nên muôn hình vạn trạng các tích cổ tiên hiệp. Khắp mười dặm phố cổ, biển người chen chúc nhau du xuân trẩy hội, tiếng trống mõ, tiếng đàn tranh cùng những tràng cười đố thơ rộn rã khắp các quán trà ven đường.

Dưới giàn đèn lồng bát giác đỏ thắm treo câu đố chữ của Hội Văn Nhân, Tiêu Cảnh chỉ liếc mắt nhìn một cái liền khẽ cười, vung bút lông viết nhanh bốn chữ đáp án lên dải lụa đỏ.

"Hay! Tuyệt diệu! Vị công tử này tài hoa hơn người!" 

Chủ quán đèn tấm tắc khen ngợi, trân trọng trao chiếc lồng đèn ngọc thỏ tinh xảo nhất đêm hội cho chàng. Tiêu Cảnh đón lấy chiếc đèn, mỉm cười quay sang trao tận tay Tố Y. 

Nàng e ấp nâng chiếc đèn lồng thỏ ngọc, khóe mắt cong cong như vầng trăng khuyết, nụ cười rạng rỡ khuynh thành khuynh quốc khiến cả biển đèn hoa xung quanh cũng phải lu mờ sắc thắm.

Giữa chốn bụi trần huyên náo ngàn vạn người lướt qua nhau, tìm kiếm trăm ngàn lần trong cõi mộng, chỉ cần một lần quay đầu nhìn lại, thấy bóng hình người tri kỷ đang đứng đợi nơi ánh đèn lung linh bập bùng... khoảnh khắc ấy đã đủ làm ấm lòng cả một kiếp nhân sinh.`
  },
  {
    id: 'scene_10_van_dang_quy_hai_bien_cuong',
    title: 'Thương Hải Triều Sinh • Vạn Đăng Quy Hải Kỳ An Điển',
    alias: 'Đêm Thả Đèn Hoa Đăng Cửa Biển Triều Dâng Rực Rỡ Sóng Vàng',
    theme: 'Lễ Hội Thả Hoa Đăng',
    festivalRituals: {
      ritualName: 'Hải Thần Tế Điển & Vạn Đăng Quy Hải',
      stepByStep: [
        'Đốt ba ngọn lửa đại phong hỏa đài bên vách đá hải môn để triệu tập vạn dân',
        'Tưới một chén rượu Hải Long Tửu xuống mép sóng làm lễ tạ ơn biển cả che chở',
        'Viết lời tưởng niệm tướng sĩ tử trận và ước nguyện thái bình vào dải giấy ngũ sắc lót trong đèn hoa sen gỗ',
        'Châm tim nến tẩm dầu cá voi không tắt trước gió bão rồi đồng loạt đẩy đèn xuôi theo ngọn triều rút về biển lớn'
      ],
      wishInscriptions: [
        'Nguyện hải ba bình tức, chiến cốt quy hương',
        'Vạn dặm sóng yên, thuyền về bến đỗ bình an',
        'Hải nạp bách xuyên, đắc chí tứ hải quy tâm'
      ],
      culturalMeaning: 'Nghi thức kết hợp giữa lòng biết ơn biển cả, tưởng nhớ anh hùng hộ quốc và cầu nguyện một năm sóng yên biển lặng cho ngư dân và hải quân.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm rằm tháng Bảy (Lễ Trung Nguyên - Xá Tội Vong Nhân), giờ Hợi, thủy triều bắt đầu dâng cao chạm mép đá rồi từ từ rút về đại dương',
      weatherAndSeason: 'Gió biển thổi phần phật mang theo vị mặn nồng khoan khoái, bầu trời xanh đen thăm thẳm điểm xuyết dải Ngân Hà vắt ngang',
      lightingAndSpace: 'Cửa biển rộng ba dặm bừng sáng lung linh bởi hàng vạn chiếc đèn hoa sen làm bằng gỗ bách và vỏ ốc ngũ sắc, ánh lửa bập bùng dập dềnh theo từng con sóng cuộn trôi xa'
    },
    sceneryDescription: 'Một vịnh biển hình bán nguyệt được bao bọc bởi hai dãy núi đá hoa cương sừng sững như hai bức tường thành tự nhiên. Phía trên bờ cát trắng mịn, hàng chục đống lửa trại lớn cháy rừng rực tỏa than hồng ấm áp. Dưới mặt nước, con sóng biển màu ngọc bích nâng niu từng chiếc hoa đăng trôi dần ra khơi xa, tạo thành một vệt sáng vàng cam kéo dài tít tắp đến tận đường chân trời huyền bí.',
    wineAndFeast: {
      wines: ['Hải Phong Thiêu Tửu (rượu chưng cất từ men biển cay nồng)', 'Long Tiên Quỳnh Tương', 'Bạch Lộ Thiêu'],
      delicacies: [
        'Mực một nắng nướng than hoa thơm lừng xé chấm tương ớt cay xè',
        'Sò huyết nướng mỡ hành đậu phộng béo ngậy ngọt lịm',
        'Cua biển hấp bia gừng thịt chắc nịch gạch vàng ươm',
        'Cháo bào ngư hải sâm nóng hổi rắc tiêu sọ và hành hoa'
      ],
      tableSetting: 'Chiếu cói trải trên bãi cát mịn sát mép sóng, chén sành thô mộc uống rượu tràn trề, vỏ ốc biển dùng làm đĩa đựng gia vị'
    },
    companionsAndRomance: {
      heroes: 'Những chiến tướng thủy quân áo giáp còn vương vết chém, dầm mưa dãi nắng phong sương, nâng vò rượu hướng ra biển lớn cúi đầu tri ân vong linh đồng đội; khí phách trầm hùng kiên định.',
      beauties: 'Nữ tử miền duyên hải tết tóc dài duyên dáng cài vỏ ốc ngũ sắc, đôi mắt đen láy phản chiếu ánh lửa trại, cất giọng hát bài ca biển cả thiết tha rung động lòng người.',
      brotherhoodBond: 'Những người lính cùng nhau uống chung một vò rượu, khoác vai nhau hát vang khúc quân hành giữa tiếng sóng gầm; tình huynh đệ tôi luyện qua máu lửa bão tố vững như bàn thạch.'
    },
    musicAndPoetry: {
      instruments: 'Tù và vỏ ốc biển thổi trầm hùng hòa cùng tiếng đàn Nguyệt và trống da trăn',
      harmonyVibe: 'Hùng tráng, bao la, da diết, vừa mang nỗi bi tráng tưởng niệm vừa tràn đầy niềm hy vọng phục sinh.',
      originalPoem: `Thương hải mang mang vạn đăng phù,
Triều thanh dạ dạ tiếu phong lưu.
Tráng sĩ nhất khứ an xã tắc,
Trường lưu minh nguyệt chiếu thiên thu.`
    },
    sensoryDetails: {
      visual: 'Biển hoa đăng vàng rực dập dềnh trên sóng nước đen nhánh, tàn lửa trại bay lất phất vào trời đêm lấp lánh như ngàn đốm sao rơi.',
      auditory: 'Tiếng sóng biển gầm vang rì rào đều đặn, tiếng tù và ngân dài bi tráng, tiếng củi đước nổ lách tách trong đống lửa.',
      olfactory: 'Vị mặn mòi nồng nàn của gió biển hòa lẫn mùi khói đước thơm dịu và mùi mực nướng ngào ngạt kích thích vị giác.',
      gustatory: 'Ngụm rượu Hải Phong Thiêu cay nồng làm nóng ran toàn bộ lồng ngực, vị ngọt đậm đà của thịt sò huyết nướng tươi rói.',
      tactile: 'Cát biển mịn màng mát lạnh luồn qua kẽ ngón chân trần, hơi ấm hừng hực tỏa ra từ đống lửa trại xua tan gió biển se lạnh.'
    },
    masterProseExcerpt: `Đêm Trung Nguyên, triều cường dâng cao nơi cửa biển Long Hống.
    
Gió biển thổi phần phật làm bay tung mái tóc phong trần của Tiêu Cảnh. Dưới chân chàng, bờ cát trắng trải dài tít tắp đang sáng rực bởi hàng chục đống lửa củi đước đỏ rực. Đúng giờ Hợi, khi tiếng tù và bằng vỏ ốc ngàn năm vang lên một hồi dài trầm hùng xuyên thấu màn đêm, hàng vạn chiến sĩ thủy binh cùng ngư dân duyên hải đồng loạt quỳ gối bên mép sóng.

"Hồn thiêng sông núi, chiến sĩ vị quốc vong thân... Xin theo ngọn đăng hoa này trở về với đất mẹ bình yên!"

Tiêu Cảnh nâng chén rượu Hải Phong Thiêu tưới một vòng cung xuống con sóng đầu tiên, rồi nhẹ nhàng đặt chiếc hoa đăng bằng gỗ bách hình chiến thuyền xuống mặt nước. Chiếc đèn chở theo ngọn nến dầu cá voi cháy rừng rực rẽ sóng trôi đi. Liền sau đó, vạn đóa hoa đăng lung linh ngũ sắc đồng loạt được thả xuống. 

Con triều rút nhẹ, đưa hàng vạn ngọn lửa nhỏ bồng bềnh dập dềnh trôi ra đại dương bao la. Trong phút chốc, cả mặt biển đen thẳm ngút ngàn đã hóa thành một dải ngân hà lấp lánh sóng vàng. Phía sau chàng, tiếng đàn nguyệt cất lên réo rắt bên đống lửa, mùi mực nướng thơm lừng bay theo gió quyện cùng tiếng cười sảng khoái của những người lính biên thùy sau chuỗi ngày sinh tử. Sóng biển dẫu bạc đầu, tráng chí vẫn ngút trời cao.`
  },
  {
    id: 'scene_11_that_tich_song_lien_hoa_dang',
    title: 'Thất Tịch Ngân Hà • Song Liên Hoa Đăng Nguyện Ước Dạ',
    alias: 'Đêm Mùng Bảy Tháng Bảy Thả Đèn Uyên Ương Cầu Duyên Bách Niên',
    theme: 'Lễ Hội Thất Tịch Nguyện Ước',
    festivalRituals: {
      ritualName: 'Khất Xảo Tế Nguyệt & Song Liên Thả Đăng',
      stepByStep: [
        'Bày bàn tế Ngưu Lang Chức Nữ dưới bóng trăng với đĩa bánh Xảo Quả và kim chỉ ngũ sắc',
        'Đôi lứa buộc dải tơ hồng kết tóc vào cán đèn hoa sen kép (Song Liên Đăng)',
        'Cùng nhau cầm bút lông chấm mực nhũ vàng ghi lời thề son sắt vào cánh hoa sen giấy',
        'Đồng tâm thả đèn xuống dòng suối Uyên Ương, ngắm hai chiếc đèn gắn chặt không rời trôi qua cầu Ô Thước'
      ],
      wishInscriptions: [
        'Tại thiên nguyện tác bỉ dực điểu, tại địa nguyện vi liên lý chi',
        'Nguyện đắc nhất nhân tâm, bạch thủ bất tương ly',
        'Sơn vô lăng, thiên địa hợp, nãi cảm dữ quân tuyệt'
      ],
      culturalMeaning: 'Lễ hội tình duyên linh thiêng bậc nhất, nơi người trần cầu xin sự khéo léo đảm đang (khất xảo) và ước nguyện tình yêu thủy chung son sắt bền chặt qua ngàn kiếp luân hồi.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm mùng bảy tháng Bảy âm lịch, canh hai, sương thu lãng đãng, dải Ngân Hà vắt ngang bầu trời đêm trong vắt không một gợn mây',
      weatherAndSeason: 'Gió thu se lạnh thoang thoảng, những hạt mưa ngâu lất phất như giọt lệ tương tư rồi dứt hẳn để lộ bầu trời đầy sao',
      lightingAndSpace: 'Dòng suối Bích Khê uốn lượn dưới chân cầu đá Nguyệt Kiều bừng sáng bởi những cặp đèn hoa đăng đôi kết bằng lụa hồng và nến thơm hoa nhài'
    },
    sceneryDescription: 'Một khu hoa viên cổ kính ven hồ nước biếc, giàn hoa tử đằng tím ngắt rủ bóng xuống mặt cầu đá uốn cong. Trên mặt nước lững lờ trôi từng cặp đèn "Song Sinh Liên Hoa" – hai đóa sen dính liền nhau bằng một dải lụa đỏ buộc chỉ vàng. Ánh nến ấm áp phản chiếu trên làn nước thu trong vắt, in bóng hàng liễu rủ và vầng trăng khuyết lấp lánh như trâm cài đầu của tiên nữ giáng trần.',
    wineAndFeast: {
      wines: ['Hạnh Hoa Lộ Tửu ủ với mật ong hoa rừng', 'Đào Yêu Túy', 'Bách Niên Hảo Hợp Tửu'],
      delicacies: [
        'Bánh Xảo Quả giòn xốp tạo hình hoa bướm uyên ương',
        'Chè hạt sen long nhãn tuyết nhĩ thanh mát ngọt dịu',
        'Vịt tiềm hạt sen nước dừa thơm bùi ngậy béo',
        'Đĩa quả tươi mùa thu: đào tiên, hồng đỏ, nho tím phủ phấn trắng'
      ],
      tableSetting: 'Bàn gỗ hương lau sạch bóng đặt dưới giàn hoa tử đằng, lư trầm nhỏ xông hương hoa cúc và đàn hương êm dịu, chén ngọc khắc hình đôi chim uyên ương vờn sóng'
    },
    companionsAndRomance: {
      heroes: 'Kiếm khách lừng danh thiên hạ thu lại toàn bộ kiếm khí lạnh lùng, ánh mắt chỉ còn lại nét dịu dàng vô hạn khi ngắm nhìn người con gái đã cùng mình trải qua trăm trận sinh tử.',
      beauties: 'Tuyệt đại giai nhân e ấp trong tà áo lụa mỏng màu hoa đào, tay nâng chiếc đèn hoa sen đôi, khẽ chớp đôi hàng mi rợp bóng nước mắt hạnh phúc, miệng mỉm cười khuynh thành.',
      brotherhoodBond: 'Bằng hữu giang hồ đứng trên cầu đá nâng chén chúc phúc cho đôi lứa tri kỷ, tiếng cười hào sảng xua đi nỗi bi hoan ly tán của thế gian.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Tranh mười sáu dây kết hợp cùng Sáo Trúc ngân nga khúc Trường Tương Tư',
      harmonyVibe: 'Tình tứ, ngọt ngào, sâu lắng, vừa có nỗi nhớ nhung da diết của Ngưu Lang Chức Nữ vừa chan chứa niềm tin bách niên giai lão.',
      originalPoem: `Thất tịch thiên nhai khán chức nữ,
Ngân hà nhất dải chiếu uyên ương.
Song đăng cộng độ bích khê thủy,
Bạch thủ đồng tâm vĩnh bất thương.`
    },
    sensoryDetails: {
      visual: 'Cặp đèn sen kép tỏa ánh sáng hồng dịu dàng trôi sát vào nhau trên dòng suối biếc, dải lụa đỏ mềm mại nổi bồng bềnh giữa những gợn sóng tơ.',
      auditory: 'Tiếng đàn tranh thánh thót như giọt mưa ngâu rơi trên phiến lá, tiếng thì thầm thề ước ngọt ngào của đôi tình nhân bên mạn cầu.',
      olfactory: 'Hương thơm ngọt lịm của rượu Hạnh Hoa ngào ngạt hòa cùng hương hoa tử đằng thoang thoảng trong làn gió thu se lạnh.',
      gustatory: 'Cắn miếng bánh Xảo Quả giòn tan ngọt bùi nơi đầu lưỡi, hớp ngụm rượu đào ngọt mát sưởi ấm tâm can.',
      tactile: 'Bàn tay chàng nắm lấy bàn tay mềm mại mát lạnh của nàng, truyền qua hơi ấm nồng nàn của một lời thề trọn kiếp không rời.'
    },
    masterProseExcerpt: `Đêm Thất Tịch, mưa ngâu vừa dứt, bầu trời đêm Lạc Thủy trong vắt tựa như một tấm ngọc bích khổng lồ.

Trên cây cầu đá chạm trổ hình chim Ô Thước, Liễu Tố Y khoác chiếc áo lụa màu cánh đào mỏng nhẹ như cánh ve, mái tóc mây khẽ bay lòa xòa theo làn gió thu lành lạnh. Nàng nâng trên tay đóa "Song Sinh Liên Đăng" – hai đóa hoa sen bằng lụa hồng thắm được gắn chặt vào nhau bằng một dải tơ hồng thêu chỉ kim tuyến.

"Tiêu lang... trên đóa sen bên tả thiếp đã viết tên chàng, đóa bên hữu đã viết tên thiếp." Nàng ngước nhìn chàng, đôi mắt long lanh tựa hồ thu chứa chan muôn ngàn tình ý.

Tiêu Cảnh mỉm cười, cầm lấy ngọn nến thơm thắp sáng tim đèn. Ánh lửa bừng lên, soi rõ dòng chữ mạ vàng nắn nót trên cánh sen: *'Nguyện đắc nhất nhân tâm, bạch thủ bất tương ly'*. Chàng nhẹ nhàng cùng nàng cúi xuống mép suối, đặt chiếc đèn hoa xuống mặt nước phẳng lặng.

Kỳ diệu thay, con nước cuốn chiếc hoa đăng đôi rẽ sóng trôi đi, hai đóa sen dập dềnh quấn quýt lấy nhau không rời nửa tấc, lướt qua dưới vòm cầu đá rực rỡ ánh nến. Tiêu Cảnh vươn tay ôm trọn bờ vai thon nhỏ của nàng vào lòng, ngẩng đầu ngắm dải Ngân Hà thăm thẳm ngút ngàn trên cao. Giữa dòng đời đao quang kiếm ảnh đầy máu lửa, có được một bóng hình tri kỷ để hẹn thề dưới trăng thu, đời này kiếp này chàng còn mong cầu chi hơn nữa?`
  },
  {
    id: 'scene_12_hoang_thanh_ngu_ha_hoa_dang',
    title: 'Ngự Hà Kim Thủy • Hoàng Thành Thượng Uyển Bách Hoa Đăng',
    alias: 'Đêm Hội Thả Đèn Hoàng Cung Ngự Hà Rực Rỡ Gấm Hoa Quý Tộc',
    theme: 'Lễ Hội Thả Hoa Đăng',
    festivalRituals: {
      ritualName: 'Kim Thủy Ngự Hà Hoa Đăng Điển',
      stepByStep: [
        'Tiếng đại hồng chung trên Lầu Chuông gióng lên chín hồi báo hiệu khai hội ngự uyển',
        'Hoàng gia cùng đại thần và danh tướng biên cương rót rượu Ngự Lộ vào chén lưu ly cử hành lễ xướng ca',
        'Thả những chiếc đèn lồng hình thuyền rồng, kỳ lân và chim phượng hoàng thếp vàng dát ngọc xuống dòng Kim Thủy Hà',
        'Thưởng thức khúc nhạc cung đình Bát Âm và ngắm pháo hoa ngũ sắc nở rộ trên nền Tử Cấm Thành'
      ],
      wishInscriptions: [
        'Quốc thái dân an, phong điều vũ thuận',
        'Vạn thọ vô cương, xã tắc trường tồn',
        'Tướng sĩ khải hoàn, giang sơn cẩm tú'
      ],
      culturalMeaning: 'Nghi lễ mang tầm vóc đế vương quý tộc, dung hòa giữa vẻ hoa lệ cung đình và tấm lòng tri ân tướng sĩ công thần gìn giữ non sông.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm hội Hoa Triêu (Sinh nhật trăm hoa), giờ Tuất, hoàng hôn tím thẫm vừa buông nhường chỗ cho hàng ngàn ngọn nến cung đình bừng sáng',
      weatherAndSeason: 'Tiết trời giữa xuân ấm áp, trăm hoa đua nở ngát hương khắp Thượng Uyển, gió đông phơi phới lay động rèm the',
      lightingAndSpace: 'Dòng Ngự Hà lát đá ngọc bích chảy quanh các cung điện nguy nga rực sáng lộng lẫy, hàng ngàn chiếc đèn cung đình lục giác nổi bồng bềnh như kho tàng châu báu di động'
    },
    sceneryDescription: 'Khu Thượng Uyển ngự hoa viên tráng lệ bậc nhất thiên triều. Cây cầu Cửu Long bằng ngọc trắng bắc ngang dòng sông Kim Thủy trong vắt. Hai bên bờ sông, hoa mẫu đơn đỏ thắm, hoa hải đường và đào bích nở rộ dưới ánh đèn lồng lụa đỏ thêu rồng phượng. Những chiếc đèn thả nước ở đây được chế tác cầu kỳ bằng giấy hoa tiên tráng sáp thơm, hình đóa mẫu đơn hoàng gia và chiến thuyền dát vàng lộng lẫy.',
    wineAndFeast: {
      wines: ['Cung Đình Ngự Lộ Tửu ủ sáu mươi năm', 'Mẫu Đơn Tiên Nhưỡng', 'Bạch Ngọc Thiêu'],
      delicacies: [
        'Yến sào chưng đường phèn tuyết giáp thượng hạng',
        'Bào ngư Nam Hải hầm nấm linh chi ngàn năm',
        'Thịt nai nướng thảo mộc hoàng gia chấm muối hoa tiêu',
        'Bánh điểm tâm tạo hình thỏ ngọc và hoa sen tinh xảo tan ngay trong miệng'
      ],
      tableSetting: 'Bàn tiệc gỗ trắc khảm vàng ròng, chén dĩa bằng ngọc bích Hòa Điền và bạc nguyên chất khắc hình hoa sen, đỉnh đồng đúc thời thượng cổ tỏa hương long diên hương quý phái'
    },
    companionsAndRomance: {
      heroes: 'Các tướng soái khải hoàn trở về trong bộ lễ phục thêu gấm, phong thái oai phong lẫm liệt, đàm tiếu cùng các bậc hiền thần, xem thường hư danh quyền quý.',
      beauties: 'Công chúa cành vàng lá ngọc cùng các tài nữ trâm anh thế phiệt, dung nhan diễm lệ kiêu sa trong y phục dạ hội lộng lẫy, khóe mắt liếc nhìn người anh hùng chiến trận với vẻ ngưỡng mộ sâu sắc.',
      brotherhoodBond: 'Tình bằng hữu quân thần chí cốt, cởi mở chén thù chén tạc, không phân chia sang hèn đẳng cấp trước cái đẹp bất tận của non sông.'
    },
    musicAndPoetry: {
      instruments: 'Dàn Biên Chung (chuông đồng cổ) hòa tấu cùng Đàn Tranh và Tiêu Cung Đình',
      harmonyVibe: 'Uy nghiêm, tráng lệ, thanh tao, đậm phong thái thịnh thế vương triều thái bình thịnh trị.',
      originalPoem: `Ngự hà kim thủy dạ đăng huy,
Cửu long kiều thượng phượng hoàng phi.
Kim tiêu nhất ẩm quân thần túy,
Cẩm tú giang sơn tịnh nhật quy.`
    },
    sensoryDetails: {
      visual: 'Mặt nước sông ngọc phản chiếu ánh vàng ròng của những chiếc thuyền rồng hoa đăng, pháo hoa nở bung trên mái ngói lưu ly vàng rực của Tử Thần Điện.',
      auditory: 'Tiếng chuông đồng Biên Chung ngân vang trong vắt ngân dài, tiếng nước sông róc rách luồn qua chân cầu ngọc.',
      olfactory: 'Mùi hương long diên hương vương giả quý phái hòa lẫn mùi thơm ngọt ngào của ngàn đóa mẫu đơn nở rộ trong đêm.',
      gustatory: 'Vị ngọt thanh tao thoát tục của ngụm rượu Ngự Lộ như giọt sương trời ban, vị ngọt bùi béo ngậy của yến sào hầm thảo dược.',
      tactile: 'Chiếc chén ngọc Hòa Điền trơn bóng mát rượi trong lòng bàn tay, tà áo gấm thêu kim tuyến mềm mại mơn man da thịt.'
    },
    masterProseExcerpt: `Đêm Hoa Triêu, cả Hoàng Thành ngập tràn trong biển gấm hoa lộng lẫy.

Dòng sông Kim Thủy uốn lượn quanh chân Tử Cấm Thành bỗng chốc hóa thành một dòng sông ánh sáng rực rỡ vàng son. Hàng ngàn chiếc đèn cung đình lục giác khảm xà cừ và những đóa hoa đăng mẫu đơn thếp vàng được thả từ thượng nguồn Ngự Hoa Viên, lững lờ trôi qua dưới vòm cầu Cửu Long bằng ngọc trắng muốt.

Trên đài cao Quan Nguyệt Lâu, chén rượu Ngự Lộ bằng ngọc lưu ly của Tiêu Cảnh phản chiếu muôn ngàn đóa pháo hoa đang đồng loạt nở rộ trên nền trời đêm tím thẫm. 

"Tướng quân vạn dặm bình định biên cương, hôm nay khải hoàn hồi triều, trẫm cùng khanh cạn chén này vì muôn dân xã tắc!" Hoàng đế đích thân nâng chén chúc mừng chàng.

Tiêu Cảnh khẽ mỉm cười, cung kính nâng chén đáp lễ rồi ngước nhìn ra ngoài ban công lộng gió. Dưới kia, giữa dòng người rực rỡ xiêm y dạ hội của chốn kinh kỳ, Liễu Tố Y trong tà áo gấm thêu chim phượng hoàng khẽ quay đầu lại, hướng về chàng nâng chiếc đèn hoa đăng sen vàng trên tay. Nụ cười dịu dàng kiều diễm của nàng giữa muôn ngọn đèn cung đình bỗng làm sáng bừng cả cõi giang sơn gấm vóc, khiến mọi vinh hoa phú quý của ngai vàng chín tầng cũng đều trở nên nhỏ bé trước khoảnh khắc tương ngộ này.`
  },
  {
    id: 'scene_13_tien_tong_van_dang_luan_dao',
    title: 'Thần Sơn Vân Hải • Tiên Tông Vạn Đăng Đắc Đạo Tiệc',
    alias: 'Đêm Thả Đèn Khổng Minh Phù Văn Trên Đỉnh Núi Mây Thần Tiên Luận Đạo',
    theme: 'Lễ Hội Đèn Khổng Minh',
    festivalRituals: {
      ritualName: 'Đăng Tiên Phù Điển & Vạn Đăng Triều Thiên',
      stepByStep: [
        'Khai mở trận pháp Hộ Sơn trên đỉnh Tuyệt Vân Phong, để lộ bầu trời ngập tràn tinh tú',
        'Các đệ tử và trưởng lão dùng ngón tay vận chuyển chân khí khắc Linh Phù Bình An lên thân đèn Khổng Minh lụa trắng',
        'Châm ngọn Linh Hỏa Thuần Dương vào đan dược đốt khí bên trong đáy đèn',
        'Đồng loạt thả tay, điều khiển phi kiếm bay lượn hộ tống vạn ngọn thiên đăng bay xuyên qua tầng mây lên cõi Hư Không'
      ],
      wishInscriptions: [
        'Đạo tâm vĩnh cố, phi thăng cửu thiên',
        'Kiếm phá hư không, vạn kiếp bất diệt',
        'Tông môn trường thịnh, phúc trạch vạn niên'
      ],
      culturalMeaning: 'Nghi lễ đỉnh cao của giới tu chân tiên hiệp, tượng trưng cho sự giải thoát khỏi trần tục, hướng đạo tâm về cảnh giới đại đạo chí tôn vô thượng.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm tiết Đông Chí, giờ Tý, thời khắc âm cực sinh dương, sao Bắc Đẩu tỏa ánh sáng xanh biếc rực rỡ nhất trong năm',
      weatherAndSeason: 'Không khí thanh khiết tuyệt đối không vướng bụi trần, gió tiên thổi bồng bềnh đưa biển mây cuồn cuộn dưới chân núi như sóng thần trắng muốt',
      lightingAndSpace: 'Đỉnh núi cao chín vạn trượng vượt lên trên biển mây, mười vạn chiếc đèn Khổng Minh tỏa ánh hào quang bảy sắc lập lòe bay vút lên dải Ngân Hà'
    },
    sceneryDescription: 'Đỉnh Tuyệt Vân Phong phẳng phiu như được một nhát kiếm thần gọt giũa từ thời khai thiên lập địa. Xung quanh là biển mây trắng bồng bềnh cuộn trôi dưới ánh trăng vằng vặc. Những chiếc đèn Khổng Minh ở đây không dùng giấy thường mà làm bằng tơ tằm băng tàm ngàn năm, bên trên có khắc những đường vân phù chú phát sáng rực rỡ. Hàng ngàn tiên nhân, kiếm tu khoác đạo bào phiêu dật ngồi xếp bằng trên mây, nâng hồ lô rượu tiên ngắm đèn bay lên trời cao.',
    wineAndFeast: {
      wines: ['Cửu Chuyển Hoàn Hồn Tiên Dịch', 'Thần Nông Linh Tửu ủ từ trăm loại linh thảo', 'Băng Phách Dao Trì Tửu'],
      delicacies: [
        'Thịt Yêu Thú Long Bò cạp nướng than gỗ đào thơm ngào ngạt',
        'Quả Bích Đào ngàn năm ăn vào tăng trăm năm tuổi thọ',
        'Nấm Linh Chi ngọc nướng mật ong huyền thiên',
        'Trà Ngộ Đạo pha từ nước suối Cửu Tuyền bốc khói hình rồng phượng'
      ],
      tableSetting: 'Bàn ngọc thạch thiên nhiên lơ lửng giữa hư không, hồ lô rượu tạc từ tử ngọc phát sáng, lư hương bằng đồng cổ tỏa làn khói tiên xanh biếc'
    },
    companionsAndRomance: {
      heroes: 'Các bậc Kiếm Tiên áo trắng tóc đen bay phần phật, vung tay gọi phi kiếm hóa thành cầu vồng rực rỡ hộ tống thiên đăng; ánh mắt siêu phàm thoát tục nhìn thấu thiên cơ.',
      beauties: 'Tiên tử thánh khiết như tuyết đầu mùa, dung mạo tuyệt trần không vướng bụi trần, ngón tay ngọc gảy khúc đàn tiên làm cho cả vạn ngọn đèn đồng loạt tỏa sáng rực rỡ.',
      brotherhoodBond: 'Tình đạo lữ và huynh đệ đồng môn cùng chia sẻ con đường tu tiên đầy gian nan hiểm trở, hẹn thề cùng nhau vượt qua thiên kiếp phi thăng thượng giới.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Không Hầu tiên gia hòa cùng Tiêu Ngọc Thiên Âm',
      harmonyVibe: 'Hư ảo, phiêu dật, thoát tục, rung động linh hồn như tiếng gọi từ cõi vĩnh hằng xa xăm.',
      originalPoem: `Cửu vạn lý cao đăng tuyệt phong,
Vạn đăng phi thướng bích hà trung.
Đạo tâm bất cải phong vân biến,
Nhất kiếm tiếu ngạo cửu trùng thiên.`
    },
    sensoryDetails: {
      visual: 'Biển mây trắng xóa cuộn sóng dưới chân, phía trên là biển đèn Khổng Minh phát sáng ngũ sắc bay thành hàng dài nối liền đất trời và ngân hà.',
      auditory: 'Tiếng phi kiếm xé gió ngân nga như tiếng rồng gầm trầm bổng, tiếng đàn tiên thánh thót làm tan chảy cả không gian băng giá.',
      olfactory: 'Mùi hương thanh khiết của linh thảo ngàn năm quyện với hương thơm kỳ diệu của rượu ngộ đạo làm thông suốt trăm mạch.',
      gustatory: 'Ngụm rượu tiên mát lạnh ngọt lịm tan chảy trên đầu lưỡi biến thành dòng nhiệt lưu cuồn cuộn chảy khắp đan điền.',
      tactile: 'Cảm giác bồng bềnh khi ngồi xếp bằng giữa hư không, làn gió tiên mát rượi thổi qua từng lỗ chân lông mang lại cảm giác nhẹ bẫng như muốn bay lên.'
    },
    masterProseExcerpt: `Trên đỉnh Tuyệt Vân Phong, vạn trượng biển mây bồng bềnh cuộn sóng dưới ánh trăng đêm Đông Chí.

Tiêu Cảnh đứng trên mỏm đá ngọc chĩa thẳng ra khoảng không vô tận. Chàng phất nhẹ tay áo rộng, một luồng chân khí thuần dương ấm áp lập tức truyền vào đáy chiếc đèn Khổng Minh khổng lồ dệt bằng tơ băng tàm. Chiếc đèn bừng sáng ánh hào quang xanh ngọc, từng nét phù văn cổ xưa khắc trên thân đèn chuyển động lấp lánh như có linh tính.

"Khởi đăng!" 

Tiếng quát thanh tao của chưởng môn vang vọng khắp đỉnh núi. Tức thì, mười vạn đệ tử tiên tông đồng loạt buông tay. Hàng vạn chiếc đèn Khổng Minh mang theo linh hỏa bừng bừng từ từ nhấc mình bay bổng lên trời cao. 

Hàng ngàn thanh phi kiếm lấp lánh kiếm quang xanh đỏ lập tức bay vút ra, xoay quanh tạo thành một vòng xoáy tinh hà rực rỡ hộ tống biển đèn bay xuyên qua tầng mây xanh, hướng thẳng tới chín tầng trời vô tận.

Bên cạnh chàng, Tố Y khoác bộ tiên bào màu nguyệt bạch, tay khẽ lướt trên phím đàn Không Hầu. Tiếng đàn du dương vang vọng giữa biển mây, hòa cùng ánh sáng lung linh của vạn ngọn thiên đăng soi rọi gương mặt thanh tú thoát tục của nàng. Trong khoảnh khắc ấy, con đường tu tiên cô độc và gian nan ngàn năm bỗng trở nên tươi đẹp biết bao, khi trên đỉnh mây ngàn có bóng hình người tri kỷ cùng ngắm biển sao rơi.`
  },
  {
    id: 'scene_14_bien_cuong_khong_minh_dinh_chien',
    title: 'Phong Hỏa Tức Diệt • Biên Ải Thiên Đăng Tạ Ân Dạ',
    alias: 'Đêm Đình Chiến Biên Cương Thả Đèn Khổng Minh Tưởng Niệm Hòa Bình',
    theme: 'Lễ Hội Đèn Khổng Minh',
    festivalRituals: {
      ritualName: 'Hòa Nhung Kỳ An & Thiên Đăng Vọng Hương',
      stepByStep: [
        'Hai bên quân đội cắm giáo mác và đao kiếm xuống tuyết trắng, tuyên bố đêm đình chiến',
        'Nhóm những đống lửa lớn dọc theo chiến hào hoang phế để sưởi ấm cho tướng sĩ hai phương',
        'Tướng lĩnh hai bên cùng chia sẻ bánh lương khô và chuyền tay nhau vò rượu nóng',
        'Cùng nhau thắp sáng hàng vạn chiếc đèn Khổng Minh dán giấy thô đỏ rực, thả bay lên trời tuyết biên ải để cầu cho hồn tử sĩ tìm đường về quê hương'
      ],
      wishInscriptions: [
        'Chiến hỏa vĩnh tức, thiên hạ thái bình',
        'Hồn hề quy lai, cố hương tuyết trắng',
        'Đao kiếm hóa nông cụ, bách tính an cư'
      ],
      culturalMeaning: 'Nghi lễ mang tính nhân văn sâu sắc tột bậc, xóa bỏ hận thù chiến tranh giữa hai chiến tuyến, tôn vinh sinh mệnh và khát vọng hòa bình của muôn triệu con người.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm rằm tháng Chạp (Lễ Chạp Tạ Niên), giờ Hợi canh ba, trăng tròn chiếu rọi khắp quan ải biên thùy tuyết trắng',
      weatherAndSeason: 'Gió bấc thổi nhẹ mang theo những bông tuyết rơi lả tả, cái lạnh cắt da nhưng không khí tràn ngập sự ấm áp của tình người sau trận chiến',
      lightingAndSpace: 'Dọc theo bức tường thành cổ kính dài trăm dặm, hàng ngạn ngọn lửa trại đỏ rực bập bùng soi bóng tuyết trắng, hàng vạn chiếc đèn Khổng Minh đỏ thắm từ từ bay lên phủ kín bầu trời'
    },
    sceneryDescription: 'Nhạn Môn Quan cổ kính phủ đầy tuyết trắng xóa. Nơi đây từng là chiến trường đẫm máu vừa trải qua mười năm khói lửa. Nhưng đêm nay, không có tiếng gươm đao va chạm, chỉ có sự tĩnh lặng thiêng liêng. Dưới chân thành, binh sĩ hai bên chiến tuyến ngồi quây quần bên đống lửa, chia nhau từng miếng thịt cừu nướng và vò rượu mạnh. Trên nền trời tuyết đen thẫm, hàng vạn chiếc đèn Khổng Minh đỏ rực bay lên như muôn đốm lửa sưởi ấm cho linh hồn những người đã ngã xuống.',
    wineAndFeast: {
      wines: ['Hỏa Liệt Thiêu Tửu (rượu biên ải đốt cổ họng cay xè)', 'Liêu Đông Lão Nhưỡng', 'Bắc Phong Bạch Can'],
      delicacies: [
        'Cừu nguyên con nướng than hồng rắc hạt thì là và ớt bột thơm ngát',
        'Bánh nang nướng giòn rụm chấm nước sốt mỡ cừu nóng hổi',
        'Thịt bò khô xé sợi nhắm rượu',
        'Canh củ cải hầm xương tủy nóng hổi bốc khói nghi ngút'
      ],
      tableSetting: 'Những tấm khiên gỗ lớn cắm trên tuyết dùng làm bàn tiệc mộc mạc, vò rượu đất nung đập vỡ nắp, bát sành to bản sứt mẻ mang đậm dấu ấn phong trần chiến trường'
    },
    companionsAndRomance: {
      heroes: 'Các dũng sĩ biên cương vết sẹo chằng chịt trên mặt, ánh mắt kiên cường nhưng đượm buồn thương nhớ mẹ già nơi quê nhà xa xôi; nâng chén rượu mời kẻ từng là đối thủ bên kia chiến tuyến.',
      beauties: 'Nữ quân y tóc búi gọn gàng trong tấm áo choàng len ấm, dịu dàng băng bó vết thương cũ cho các chiến sĩ, trao cho họ những chiếc bánh nướng còn nóng hổi.',
      brotherhoodBond: 'Tình huynh đệ vượt qua lằn ranh bạn thù; nhận ra rằng dưới lớp chiến bào rách nát, ai ai cũng chỉ là những người con mong mỏi ngày thái bình trở về bên mái ấm gia đình.'
    },
    musicAndPoetry: {
      instruments: 'Khèn lá biên ải da diết hòa cùng Tiếng Đàn Tỳ Bà lưng ngựa thô mộc',
      harmonyVibe: 'Bi tráng, u uất, sâu lắng mà ấm áp lạ kỳ, làm mềm lòng những trái tim sắt đá nhất.',
      originalPoem: `Nhạn Môn quan ngoại tuyết hoa phi,
Đình chiến kim tiêu tửu mãn bôi.
Vạn chích thiên đăng quy cố quốc,
Bạch đầu chinh phụ vọng quân quy.`
    },
    sensoryDetails: {
      visual: 'Màu đỏ thắm của hàng vạn chiếc đèn Khổng Minh nổi bật rực rỡ trên nền tuyết trắng tinh khôi và bầu trời đêm đen nhánh.',
      auditory: 'Tiếng thở dài nhẹ nhõm, tiếng vò rượu cụng vào nhau chan chát, tiếng khèn lá véo von nức nở vang vọng qua các hẻm núi tuyết.',
      olfactory: 'Mùi thịt cừu nướng xèo xèo thơm phức hòa lẫn mùi thuốc súng tàn phai và mùi rượu bốc hơi cay nồng.',
      gustatory: 'Ngụm rượu Hỏa Liệt cay xè xộc thẳng lên mũi làm ấm bừng lồng ngực đang run rẩy vì cái lạnh biên thùy.',
      tactile: 'Cảm giác bông tuyết mát lạnh rơi tan trên trán trong khi hai bàn tay đang ôm trọn chiếc bát sành đựng canh nóng thơm lừng.'
    },
    masterProseExcerpt: `Đêm rằm tháng Chạp, chiến hỏa mười năm nơi Nhạn Môn Quan rốt cuộc đã tắt.

Tuyết rơi lất phất phủ trắng những cọc tiêu và chiến hào hoang phế. Bên dưới chân thành, hàng trăm đống lửa trại được nhóm lên đỏ rực. Tiêu Cảnh khoác chiếc áo choàng lông sói bạc đứng bên ngọn lửa lớn, tay cầm vò Hỏa Liệt Thiêu Tửu đưa sang cho viên đại tướng của địch quân đối diện. Hai người nhìn nhau thật lâu, rồi cùng ngửa cổ uống một hơi cạn sạch, tiếng cười sảng khoái vang vọng giữa màn đêm buốt giá.

"Khởi đăng!" 

Một tiếng hô trầm vang cất lên. Dọc theo chiến tuyến dài mười dặm, ba vạn chiến sĩ của cả hai bên đồng loạt buông tay. 

Hàng vạn chiếc thiên đăng dán giấy đỏ thắm, chở theo tim nến cháy rừng rực, từ từ bay vút lên bầu trời biên cương phủ tuyết. Những chiếc đèn đỏ rực rỡ như hàng vạn trái tim nồng ấm bay xuyên qua màn tuyết rơi lả tả, hướng về phương nam – nơi có quê nhà, có mẹ già và người vợ hiền đang mòn mỏi ngóng trông.

Tiếng khèn lá da diết cất lên từ một góc chiến hào, hòa cùng tiếng đàn tỳ bà gảy khúc tiễn biệt. Những người lính dạn dày sương gió, từng chém giết không chớp mắt nơi sa trường, lúc này đây khóe mắt đều ươn ướt lệ nhòa. Đêm nay, không còn kẻ thắng người bại, chỉ còn lại ngọn lửa của khát vọng hòa bình thắp sáng cả bầu trời non sông cẩm tú.`
  },
  {
    id: 'scene_15_nam_cuong_mieu_trai_khong_minh',
    title: 'Nam Cương Dạ Nguyệt • Miêu Trại Vạn Thiên Đăng Kỳ Phúc',
    alias: 'Đêm Hội Thả Đèn Khổng Minh Bản Trại Nam Cương Rộn Rã Vòng Bạc Rượu Cần',
    theme: 'Lễ Hội Đèn Khổng Minh',
    festivalRituals: {
      ritualName: 'Vu Nữ Khấn Thần & Miêu Lĩnh Thiên Đăng Hội',
      stepByStep: [
        'Vu Nữ tối cao nhảy vũ điệu Thần Điểu bên đống lửa thiêng trung tâm bản trại',
        'Dùng rượu cần men lá rưới quanh các cột gỗ thần để tạ ơn Thần Rừng che chở',
        'Nam nữ thanh niên nắm tay nhau hát đối đáp các làn điệu dân ca sơn cước',
        'Cùng nhau thắp sáng những chiếc đèn Khổng Minh đan nan tre phết sáp ong rừng, vẽ hoa văn bướm lửa rồi thả bay lượn trên thung lũng sương mù'
      ],
      wishInscriptions: [
        'Mùa màng bội thu, ngô lúa đầy bồ',
        'Tình chàng ý thiếp bền như đá núi',
        'Tai ương tan biến, bản làng bình an'
      ],
      culturalMeaning: 'Lễ hội mang đậm sắc màu thần bí hoang dã của các bộ tộc Nam Cương, cầu nguyện tình yêu tự do và sự phồn thịnh ấm no của núi rừng.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm hội Hoa Sơn (Mùa xuân Nam Cương), giờ Tuất, sương mây lãng đãng quanh sườn núi, trăng non như chiếc liềm bạc treo trên ngọn tre',
      weatherAndSeason: 'Gió rừng mát rượi thoang thoảng mùi hoa đỗ quyên và hương thảo mộc hoang dã, không khí ấm áp trong lành',
      lightingAndSpace: 'Bản trại nhà sàn gỗ cheo leo bên sườn núi được thắp sáng bởi hàng trăm bó đuốc nhựa thông và đống lửa trại khổng lồ giữa quảng trường'
    },
    sceneryDescription: 'Một bản trại cổ kính của người Miêu tộc nép mình bên thung lũng đá tai mèo hùng vĩ. Hàng trăm ngôi nhà sàn mái lá bằng gỗ pơ-mu san sát nhau. Giữa sân bản, ngọn lửa trại bốc cao hàng trượng. Hàng ngàn chiếc đèn Khổng Minh vẽ hoa văn bùa chú rực rỡ sắc màu được thả từ các chòi ngắm cảnh trên vách đá, bay lơ lửng giữa biển sương mù thung lũng như đàn bướm lửa khổng lồ.',
    wineAndFeast: {
      wines: ['Rượu Cần Men Lá Rừng ngọt thơm êm dịu', 'Trúc Ống Tửu chôn trong thân tre tươi', 'Bách Thảo Lộ'],
      delicacies: [
        'Thịt lợn bản gác bếp nướng than hồng thơm nức mũi mùi mắc khén',
        'Cá suối nướng kẹp thanh nứa chấm muối ớt hột',
        'Xôi nếp ngũ sắc dẻo thơm ngào ngạt',
        'Măng đắng luộc chấm chẩm chéo cay tê lưỡi'
      ],
      tableSetting: 'Mâm đan bằng mây tre lót lá chuối rừng tươi xanh mướt, chén uống rượu làm bằng sừng trâu chạm khắc hoa văn cổ xảo diệu'
    },
    companionsAndRomance: {
      heroes: 'Khách lữ hành giang hồ cởi mở hòa mình vào điệu múa xòe hoa của dân bản, cùng các tráng sĩ miền sơn cước thi tài đấu vật và uống rượu cần.',
      beauties: 'Thiếu nữ Miêu tộc đội mũ bạc xập xình chuỗi hạt, áo thêu thổ cẩm rực rỡ muôn màu, đôi mắt cười lúng liếng trao ống hút rượu cần cho người thương.',
      brotherhoodBond: 'Tình bằng hữu mộc mạc chân thành nơi núi rừng hoang dã; ai đến đây cũng là khách quý, cùng say một chén rượu men lá là thành anh em ruột thịt.'
    },
    musicAndPoetry: {
      instruments: 'Khèn Bè lảnh lót hòa cùng Tiếng Sáo Mèo véo von và tiếng chiêng đồng',
      harmonyVibe: 'Rộn ràng, hoang dã, ngập tràn sức sống mãnh liệt của thiên nhiên đại ngàn nguyên sơ.',
      originalPoem: `Nam Cương dạ nguyệt tỏa vân nham,
Miêu trại thiên đăng chiếu bích đàm.
Khèn xướng tình ca thanh lạc lãng,
Trùng trùng điệp điệp túy giang nam.`
    },
    sensoryDetails: {
      visual: 'Váy áo thổ cẩm ngũ sắc xoay tròn trong điệu múa bên ánh lửa bập bùng, vòng bạc trên cổ thiếu nữ lấp lánh phản chiếu ngọn đèn Khổng Minh bay lượn.',
      auditory: 'Tiếng khèn bè rộn rã lúc bổng lúc trầm gọi bạn tình, tiếng vòng bạc leng keng vui tai theo từng nhịp bước nhảy, tiếng chiêng đồng rộn rã.',
      olfactory: 'Mùi nhựa thông cháy thơm ngát quyện với mùi thịt hun khói gác bếp và mùi men rượu cần ngọt ngào ngây ngất.',
      gustatory: 'Vị rượu cần ngọt lịm như nước suối đầu nguồn thấm vào cuống họng mang lại cảm giác ngà ngà say say ngây ngất.',
      tactile: 'Cảm giác ấm nồng của bàn tay thiếu nữ miền sơn cước khi kéo chàng vào vòng múa xòe hoa bên bếp lửa.'
    },
    masterProseExcerpt: `Đêm hội Hoa Sơn, tiếng khèn bè rộn rã đánh thức cả thung lũng đá Nam Cương.

Giữa sân bản người Miêu, ngọn lửa trại bằng củi thông cháy bốc cao ngùn ngụt, soi rọi hàng trăm cô gái bản trong trang phục thổ cẩm rực rỡ. Tiếng vòng bạc, kiềng bạc trên cổ áo họ leng keng nhịp nhàng theo từng bước múa xòe hoa uyển chuyển quanh ché rượu cần lớn.

"Tiêu đại ca! Cùng thiếp thả ngọn Bướm Lửa Thiên Đăng này đi!" 

Nàng sơn nữ với đôi mắt biếc cười giòn tan, kéo tay Tiêu Cảnh bước lên chòi gỗ nhô ra giữa vách đá cheo leo. Chiếc đèn Khổng Minh đan bằng nan tre dán giấy bản bôi sáp ong rừng được vẽ hình đôi bướm lửa quấn quýt. Khi tim đèn bắt đầu bốc hơi nóng, hai người cùng nhẹ buông tay.

Chiếc đèn từ từ nhấc mình bay bổng lên trời đêm, lướt qua màn sương mỏng giăng mắc quanh sườn núi. Phía sau, hàng trăm chiếc thiên đăng từ các nóc nhà sàn gỗ cũng đồng loạt bay vút lên, nhuộm đỏ rực cả bầu trời thung lũng mây ngàn. 

Tiếng sáo Mèo véo von lảnh lót cất lên như lời tự tình ngọt ngào của đại ngàn hoang dã. Tiêu Cảnh nâng chén rượu sừng trâu thơm nồng, uống cạn một hơi giữa tiếng reo hò rộn rã của dân bản. Giang hồ dẫu hiểm ác muôn trùng, nhưng khi đặt chân tới mảnh đất này, men say tình người đã xua tan đi tất cả âu lo bụi trần.`
  },
  {
    id: 'scene_16_giao_mua_lap_ha_thien_thanh',
    title: 'Lập Hạ Thiền Thanh • Đầm Sen Hương Trà Trừ Thử Tiệc',
    alias: 'Lễ Hội Giao Mùa Xuân Sang Hạ Đón Gió Nam Mát Lành Trừ Thử Yến',
    theme: 'Lễ Hội Giao Mùa Lập Hạ',
    festivalRituals: {
      ritualName: 'Nghênh Hạ Nghinh Lương & Thưởng Liên Yến',
      stepByStep: [
        'Dùng lá sen tươi gói đá lạnh lấy từ hầm băng đông để ướp rượu quý',
        'Cắt những búp hoa sen chớm nở đầu mùa hãm với trà búp tuyết sơn',
        'Treo chuông gió bằng tre trúc dưới mái hiên thủy tạ để đón luồng gió nam đầu tiên xua tan cái oi bức',
        'Nâng chén rượu Trúc Diệp thanh mát chúc tụng mùa màng đơm hoa kết trái và chí lớn vươn xa'
      ],
      wishInscriptions: [
        'Tâm tĩnh tự nhiên lương, hạ nhật trường an',
        'Hạc minh cửu cao, thanh phong từ lai',
        'Sen nở đắc đạo, bách nghiệp hanh thông'
      ],
      culturalMeaning: 'Thời khắc đất trời chuyển từ sự e ấp của mùa xuân sang sự bừng nở rực rỡ của mùa hạ; nhắc nhở con người giữ tâm thế thanh tịnh, mát lành trước những thử thách bão bùng.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Buổi chiều tà ngày Lập Hạ chuyển sang hoàng hôn tím ngắt, tiếng ve sầu đầu mùa râm ran trên rặng liễu biếc',
      weatherAndSeason: 'Gió nam mát rượi thổi qua mặt hồ xua tan hơi nóng oi ả ban ngày, mang theo hơi nước mát rượi và hương sen tinh khiết',
      lightingAndSpace: 'Thủy tạ giữa hồ sen rộng trăm mẫu, ánh hoàng hôn vàng cam dát lóng lánh trên từng phiến lá sen xanh mướt như ngọc bích'
    },
    sceneryDescription: 'Một ngôi thủy tạ bằng gỗ lim bốn mặt để trống tọa lạc giữa đầm sen bạt ngàn. Dưới làn gió nam hiu hiu, những chiếc lá sen khổng lồ xòe rộng như chiếc dù ngọc đung đưa theo nhịp sóng. Những đóa hoa sen đầu mùa hé nở để lộ nhụy vàng óng ả thơm ngát. Xa xa, rặng liễu rủ bóng xuống mặt nước trong vắt, bầy cá chép đỏ tung tăng bơi lội dưới chân đình.',
    wineAndFeast: {
      wines: ['Trúc Diệp Thanh Băng Trấn (rượu ướp đá hầm đông)', 'Thanh Mai Lộ Tửu', 'Hà Diệp Bạch Tửu'],
      delicacies: [
        'Gỏi ngó sen tôm sông giòn sần sật thanh mát',
        'Gà hấp lá sen giữ trọn vị ngọt thơm tự nhiên',
        'Chè hạt sen đậu xanh ướp hoa nhài để lạnh',
        'Quả vải thiều tươi bóc vỏ trắng ngần mọng nước'
      ],
      tableSetting: 'Bàn trúc bóng loáng kê sát lan can hồ, đĩa gốm hoa dong xanh mát mắt, chén thủy tinh trong suốt đựng đá ướp rượu hoa sen'
    },
    companionsAndRomance: {
      heroes: 'Kiếm khách mặc áo vải gai mỏng màu thiên thanh, phe phẩy chiếc quạt xếp lông hạc, phong thái nhàn nhã ung dung luận bàn thế sự giang hồ.',
      beauties: 'Giai nhân bận áo lụa mỏng màu ngọc bích, mái tóc búi lỏng cài cành hoa sen trắng e ấp, bàn tay thon thả bóc từng hạt sen tươi đưa cho người thương.',
      brotherhoodBond: 'Bằng hữu cùng nhau gác đao kiếm vào góc đình, đối ẩm thanh tao, chia sẻ những tâm sự thầm kín giữa không gian thanh tịnh không vướng bụi trần.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Cổ Tranh gảy khúc Thanh Bình Lạc hòa cùng tiếng ve sầu và tiếng sáo trúc thanh tao',
      harmonyVibe: 'Thanh thoát, dịu êm, mát lành, mang lại sự bình an tuyệt đối cho tâm hồn sau chuỗi ngày bôn ba.',
      originalPoem: `Lập hạ sơ nghinh nam diện phong,
Lục hà thiên mẫu bích ba trung.
Thanh mai chử tửu tri âm thoại,
Tâm tĩnh hà tu trần thế hồng.`
    },
    sensoryDetails: {
      visual: 'Sắc xanh ngọc bạt ngàn của đầm sen trải dài tít tắp, điểm xuyết những đóa sen hồng phấn e ấp dưới ánh ráng chiều tím vàng.',
      auditory: 'Tiếng ve sầu râm ran đầu mùa hòa cùng tiếng nước chảy róc rách qua cống dẫn và tiếng đàn tranh thanh tao.',
      olfactory: 'Hương thơm ngọt ngào thanh khiết của hoa sen mới nở quyện với mùi lá trúc non và hương trà ướp sương mai.',
      gustatory: 'Ngụm rượu Trúc Diệp ướp lạnh trôi qua cuống họng mát rượi sảng khoái, vị ngọt bùi thanh tao của hạt sen tươi.',
      tactile: 'Làn gió nam mát rượi thổi qua làn áo lụa mỏng làm dịu đi cái nóng oi ả, chạm tay vào phiến lá sen mát rượi đọng giọt nước tròn xoe.'
    },
    masterProseExcerpt: `Hoàng hôn ngày Lập Hạ buông xuống Thính Vũ Thủy Tạ giữa đầm sen Bích Ba.

Cơn gió nam mát rượi đầu tiên của mùa hạ thổi về, cuốn trôi đi cái nóng bức oi ả của ngày chuyển mùa. Mặt đầm rộng trăm mẫu bỗng gợn lên từng đợt sóng xanh biếc, làm hàng ngàn phiến lá sen khổng lồ đung đưa rì rào như muôn ngàn cánh quạt ngọc bích đang vẫy chào tiết trời mới.

"Rượu Trúc Diệp ướp đá hầm sen này mát lắm, chàng mau uống một ngụm đi!"

Liễu Tố Y trong tà áo lụa màu thiên thanh mỉm cười thanh nhã, rót dòng rượu màu xanh lục óng ánh vào chiếc chén lưu ly trong suốt. Hơi lạnh từ chén rượu bốc lên mờ mờ, đọng lại những giọt nước lấm tấm bên ngoài thành chén. Nàng khẽ đưa tay bóc một búp sen non, lấy hạt sen ngọc trắng muốt đặt vào lòng bàn tay chàng.

Tiêu Cảnh nhấp một ngụm rượu ướp lạnh. Vị cay ngọt thanh khiết lập tức lan tỏa từ đầu lưỡi xuống tận đáy lòng, mang lại cảm giác sảng khoái vô biên. 

Bên ngoài hiên thủy tạ, tiếng ve sầu chớm hạ bắt đầu cất lên râm ran từ rặng liễu cổ thụ, hòa cùng tiếng đàn cổ tranh thánh thót của người tri kỷ. Chàng phe phẩy chiếc quạt lông hạc, phóng tầm mắt ngắm những đóa sen hồng đầu mùa đang e ấp vươn mình trong làn sương chiều tím ngắt. Đời người như mộng thoảng, tìm được một chốn thanh lương giữa cõi hồng trần náo nhiệt để cùng tri kỷ thưởng rượu ngắm sen, ấy mới thực là cảnh giới tiêu dao tột cùng.`
  },
  {
    id: 'scene_17_giao_mua_lap_thu_ngo_dong',
    title: 'Lập Thu Nhất Diệp • Kim Phong Ngọc Lộ Đón Gió Mát',
    alias: 'Lễ Hội Giao Mùa Hạ Sang Thu Lá Ngô Đồng Rơi Đón Gió Heo May Uống Rượu Quế Hoa',
    theme: 'Lễ Hội Giao Mùa Lập Thu',
    festivalRituals: {
      ritualName: 'Lãm Thu Thưởng Cúc & Nhất Diệp Lạc Điển',
      stepByStep: [
        'Quan sát chiếc lá ngô đồng đầu tiên rụng xuống sân đá báo hiệu tiết trời sang thu',
        'Khui hũ rượu Quế Hoa chôn dưới gốc cây hoàng lan tròn một năm',
        'Bày bàn tiệc thưởng trăng thu với đĩa cua đồng hấp gừng giấm và hoa cúc vàng',
        'Cắt giấy đỏ hình lá phong ghi những bài thơ cảm khái thời gian rồi thả bay theo ngọn gió heo may'
      ],
      wishInscriptions: [
        'Kim phong ngọc lộ nhất tương phùng, tiện thắng khước nhân gian vô số',
        'Thu thủy cộng trường thiên nhất sắc, nhân thọ niên phong',
        'Gió thu mang tin lành, tri kỷ mãi trùng phùng'
      ],
      culturalMeaning: 'Thời khắc giao chuyển đầy thi vị và hoài niệm; tôn vinh vẻ đẹp lắng đọng, chín chắn của đời người và sự trân quý từng phút giây hội ngộ giữa chốn nhân gian phù thế.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm Lập Thu, giờ Tuất canh một, vầng trăng thu vừa nhú lên từ đỉnh núi phía đông, chiếu ánh sáng vàng óng ả như mật ngọt',
      weatherAndSeason: 'Làn gió heo may se lạnh đầu tiên tràn về làm xao xuyến lòng người, sương thu mỏng manh giăng mắc cành cây ngọn cỏ',
      lightingAndSpace: 'Một ngôi đình cổ mái rêu phong bên bờ suối rải đầy lá ngô đồng vàng rực rỡ dưới ánh trăng rằm trong veo'
    },
    sceneryDescription: 'Một khu vườn cổ thụ với rặng ngô đồng và phong lá đỏ rực rỡ. Chiếc lá ngô đồng màu vàng hổ phách khẽ chao liệng trong không trung rồi nhẹ nhàng đáp xuống phiến đá hoa cương bên bàn tiệc. Dưới ánh trăng thu trong vắt, mặt hồ phẳng lặng như gương soi bóng hàng phong đỏ thắm. Làn gió thu mang theo hương hoa quế thoang thoảng khắp các ngõ ngách khu vườn.',
    wineAndFeast: {
      wines: ['Quế Hoa Hoàng Tửu đun ấm', 'Thu Thủy Ngọc Dịch', 'Bạch Cúc Trúc Diệp'],
      delicacies: [
        'Cua hồ hấp lá tía tô chấm giấm gừng thơm cay',
        'Thịt vịt nướng mật ong hoa quế giòn bì ngọt thịt',
        'Xôi cốm hạt sen dẻo thơm ngào ngạt hương lúa mới',
        'Bánh dẻo nhân đậu xanh hạt dưa thanh ngọt'
      ],
      tableSetting: 'Bàn đá hoa cương xám nhẵn bóng, ấm gốm Nghi Hưng màu chu sa đun rượu trên bếp than củi nhỏ, đĩa sứ hoa lam đựng cua hấp vàng ươm'
    },
    companionsAndRomance: {
      heroes: 'Bậc hào kiệt dạn dày phong sương khoác thêm tấm áo choàng mỏng, tay nâng chén hoàng tửu nóng hổi, ánh mắt thâm trầm nhìn lá rụng cảm khái thế sự thăng trầm.',
      beauties: 'Hồng nhan tri kỷ khoác chiếc khăn choàng lụa tơ tằm thêu hoa cúc vàng, nét mặt dịu dàng đượm vẻ ưu tư thi vị, khẽ ngân nga câu thơ đón gió thu sang.',
      brotherhoodBond: 'Những người anh em từng kề vai sát cánh qua năm tháng, nhìn mái tóc bằng hữu đã điểm sợi bạc, càng thêm trân trọng tình nghĩa sắt son không bao giờ đổi dời.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Tỳ Bà gảy khúc Bình Sa Lạc Nhạn kết hợp Tiêu Trúc ngân vang trầm ấm',
      harmonyVibe: 'U hoài, lắng đọng, thanh tao, đậm chất trữ tình và triết lý nhân sinh sâu sắc.',
      originalPoem: `Nhất diệp ngô đồng lạc,
Thiên hạ tận tri thu.
Kim phong nghinh dạ nguyệt,
Đối tửu giải thiên sầu.`
    },
    sensoryDetails: {
      visual: 'Lá phong đỏ và lá ngô đồng vàng rực rỡ lả tả rơi trên mặt nước hồ thu dát bạc dưới ánh trăng rằm vàng óng.',
      auditory: 'Tiếng lá khô xào xạc theo từng cơn gió heo may lướt qua sân, tiếng nước suối thu róc rách trong vắt, tiếng đàn tỳ bà trầm bổng.',
      olfactory: 'Hương hoa quế ngọt lịm bay xa ngàn thước quyện với mùi thơm cay ấm của gừng tươi và hương rượu nếp cái hoa vàng nồng đượm.',
      gustatory: 'Thịt cua ngọt bùi béo ngậy chấm giấm gừng chua cay ấm bụng, hớp ngụm rượu Quế Hoa ấm nóng làm xua tan ngay ngọn gió thu se lạnh.',
      tactile: 'Cảm giác se lạnh của làn gió heo may thổi qua gáy, được xoa dịu tức thì bởi hơi ấm lan tỏa từ chén rượu gốm trong lòng bàn tay.'
    },
    masterProseExcerpt: `Đêm Lập Thu, một làn gió heo may se lạnh khẽ lướt qua mái hiên Ngô Đồng Các.

"Xào xạc..."

Một chiếc lá ngô đồng khổng lồ màu vàng hổ phách chao liệng ba vòng giữa không trung, rồi nhẹ nhàng đáp xuống mép chén rượu của Tiêu Cảnh. Chàng khẽ giật mình ngước nhìn lên tán cây. Cả một vòm trời lá ngô đồng đã bắt đầu ngả sang sắc vàng óng ả, báo hiệu mùa thu tao nhã đã thực sự trở về trên đất trời non nước.

"Một chiếc lá rụng, thiên hạ biết thu sang..."

Liễu Tố Y khẽ mỉm cười, dùng kẹp tre gắp một con cua hồ vừa hấp chín vàng ươm đặt vào đĩa của chàng. Hương gừng tía tô bốc lên thơm ngát, hòa cùng làn khói ấm nghi ngút từ chiếc ấm gốm Nghi Hưng đang hâm nóng bình rượu Quế Hoa trên lò than nhỏ.

Tiêu Cảnh nâng chén rượu ấm nóng, uống cạn một ngụm. Men rượu Quế Hoa ngọt dịu, nồng nàn lan tỏa khắp các đường kinh mạch, xua tan đi cái se lạnh đầu mùa. 

Phía trước đình, vầng trăng thu vằng vặc treo lơ lửng trên mặt hồ phẳng lặng như gương. Chàng với lấy ống tiêu ngọc trên bàn, thổi lên khúc "Bình Sa Lạc Nhạn". Tiếng tiêu trầm ấm ngân vang giữa đêm thu tĩnh mịch, hòa cùng tiếng lá rụng xào xạc và nụ cười ấm áp của người tri kỷ. Mùa hè oi ả đã qua, mùa thu êm đềm đã tới, dẫu dòng đời có trôi dạt về đâu, chỉ cần trong tim còn giữ được một chén rượu ấm và một bóng hình tri kỷ, thì mùa thu nào cũng là mùa thu tuyệt mỹ nhất.`
  },
  {
    id: 'scene_18_giao_mua_lap_dong_hong_lo',
    title: 'Lập Đông Sơ Hàn • Bách Thú Hồng Lô Ôn Tửu Yến',
    alias: 'Lễ Hội Giao Mùa Thu Sang Đông Đốt Lò Lửa Đá Nấu Nồi Lẩu Thịt Rừng Uống Rượu Nóng',
    theme: 'Lễ Hội Giao Mùa Lập Đông',
    festivalRituals: {
      ritualName: 'Hồng Lô Tụ Nghĩa & Trừ Hàn Ôn Tửu Điển',
      stepByStep: [
        'Dùng búa đá gõ vào tảng băng mỏng đầu tiên trên mặt hồ để làm lễ tiễn mùa thu',
        'Châm ngọn lửa lớn vào lò đá đại đồng giữa sân, đốt bằng củi thông già và than đá ngàn năm',
        'Treo nồi đồng khổng lồ hầm thịt thú rừng cùng đẳng sâm, đương quy và kỷ tử bốc khói ngùn ngụt',
        'Mỗi huynh đệ khoác một tấm áo lông cừu, cầm bát sành cùng nhau uống cạn bát Lão Tửu nóng hổi thề trọn đời đồng sinh cộng tử'
      ],
      wishInscriptions: [
        'Hàn phong bất đổng trượng phu chí, hồng lô ôn tửu chiếu can đằng',
        'Đồng cam cộng khổ, sinh tử tương tùy',
        'Tuyết lớn ngàn dặm, lửa lòng không tắt'
      ],
      culturalMeaning: 'Nghi thức kết liên nghĩa khí cao đẹp trước khi mùa đông khắc nghiệt tràn về; khẳng định rằng ngọn lửa của tình huynh đệ và lý tưởng sẽ thiêu rụi mọi băng giá của thế gian.'
    },
    timeAndAtmosphere: {
      timeOfDay: 'Đêm Lập Đông, giờ Hợi canh hai, đợt gió bấc đầu mùa rít qua các khe núi, sương muối phủ trắng xóa cành cây ngọn cỏ',
      weatherAndSeason: 'Không khí lạnh buốt giá tê tái, mặt hồ bắt đầu đóng một lớp băng mỏng manh trong suốt, nhưng xung quanh lò lửa ấm áp như mùa xuân',
      lightingAndSpace: 'Giữa sân một trang trại đá kiên cố trên lưng chừng núi tuyết, lò lửa đá khổng lồ đỏ rực than hồng tỏa ánh sáng ấm áp chiếu rọi những gương mặt rạng rỡ'
    },
    sceneryDescription: 'Một tiền đồn hoặc sơn trang bằng đá hộc kiên cố sừng sững giữa rặng thông già. Bên ngoài tường đá, gió bấc gầm rít cuốn theo những hạt sương băng lạnh buốt. Nhưng trong sân trong, một chiếc lò đá đại đồng khổng lồ đang bốc lửa đỏ rực. Chiếc nồi đồng ba chân lớn bằng cái nong đang sôi sùng sục nước hầm xương hươu và thảo mộc, tỏa ra làn khói thơm phức làm mờ cả ánh sao đêm.',
    wineAndFeast: {
      wines: ['Hồng Nham Lão Tửu (rượu ủ đất sét nung đỏ rực)', 'Thiêu Đao Tử nồng độ cực cao', 'Bách Thảo Ôn Kinh Tửu'],
      delicacies: [
        'Thịt bò tuyết và thịt hoẵng rừng thái mỏng nhúng nồi lẩu thảo mộc',
        'Đùi dê nướng than hồng ướp ớt khô cay nồng giòn rụm',
        'Khoai lang mật và hạt dẻ nướng tro thơm lừng ngọt bùi',
        'Cơm lam nướng ống nứa dẻo thơm ngào ngạt mùi nhựa tre'
      ],
      tableSetting: 'Những khúc gỗ thông lớn làm ghế ngồi quây tròn quanh lò lửa đá, bát sành to bản dày cùi giữ nhiệt, thìa múc bằng sừng thú cổ xưa'
    },
    companionsAndRomance: {
      heroes: 'Những đại trượng phu vạm vỡ cởi bớt lớp áo giáp nặng nề, để lộ những vết sẹo chiến tích oai hùng, nâng bát rượu lớn cười vang hào sảng giữa trời đông lạnh giá.',
      beauties: 'Nữ hiệp hào sảng khoác áo lông hồ ly trắng muốt, đôi gò má ửng hồng vì men rượu và hơi nóng lò than, tay thoăn thoắt gắp từng miếng thịt nhúng vào bát cho người thương.',
      brotherhoodBond: 'Tình cảm keo sơn gắn bó vào sinh ra tử; cùng chia nhau một ngụm rượu nóng, một miếng thịt thơm, thách thức cả mùa đông băng giá ngàn dặm.'
    },
    musicAndPoetry: {
      instruments: 'Trống da hổ gõ nhịp trầm hùng hòa cùng Tiếng Hát Chiến Ca của mười vạn tráng sĩ',
      harmonyVibe: 'Hào hùng, nhiệt huyết, cuồng nhiệt, sục sôi ngọn lửa chiến đấu và tình anh em thiết thạch.',
      originalPoem: `Lập đông phong khởi bạch vân hàn,
Hồng lô ôn tửu ẩm thiên can.
Sinh tử đồng chu bằng hữu tại,
Tiếu khán thiên hạ vạn trùng nan.`
    },
    sensoryDetails: {
      visual: 'Ngọn lửa đỏ rực nhảy múa trong lò đá khổng lồ, đối lập gay gắt với màn sương băng trắng xóa và bóng tối đen đặc ngoài tường thành.',
      auditory: 'Tiếng nước lẩu sôi ùng ục trong nồi đồng, tiếng củi thông nổ đôm đốp bắn ra những hoa lửa ấm áp, tiếng cười nói hào sảng rền vang.',
      olfactory: 'Mùi thịt nướng xèo xèo thơm ngậy quyện với hương thơm nồng đậm của đương quy, kỷ tử và mùi rượu hâm nóng bốc khói cay nồng.',
      gustatory: 'Cắn miếng thịt nhúng mềm ngọt mọng nước chấm tương ớt cay xè, hớp ngụm Thiêu Đao Tử nóng hổi như một dòng lửa ấm chảy tràn lồng ngực.',
      tactile: 'Cái rét buốt tê tái bên ngoài lưng áo hoàn toàn bị xua tan bởi hơi nóng hừng hực phả vào mặt từ lò lửa đá đại đồng.'
    },
    masterProseExcerpt: `Đêm Lập Đông, trận gió bấc đầu mùa rít gầm qua đỉnh Thiết Lĩnh, làm đóng băng từng ngọn cỏ cành cây bên ngoài bức tường đá sơn trang.

Nhưng trong sân sau của Thiết Huyết Bảo, một chiếc lò đá đại đồng khổng lồ đang rực sáng như mặt trời nhỏ. Củi thông khô cháy nổ lách tách, tỏa ra làn khói thơm dịu và hơi nóng hừng hực xua tan đi cái lạnh thấu xương của đêm đông biên ải.

Ở giữa lò, chiếc nồi đồng ba chân lớn đang sôi sùng sục nước hầm xương hươu và linh thảo ngàn năm, bốc lên những cuộn khói thơm ngào ngạt kích thích mọi tỳ vị.

"Ha ha ha! Lập đông rồi! Mùa đông đến thì đã sao? Có lò than đỏ, có thịt thơm rượu nóng, huynh đệ ta sợ gì gió tuyết ngàn dặm!"

Một vị đại hán râu hùm vỗ mạnh lên vai Tiêu Cảnh, ngửa cổ nốc cạn một bát Thiêu Đao Tử nóng rực. Tiêu Cảnh bật cười sảng khoái, cũng nâng bát sành lớn cụng mạnh vào bát của người huynh đệ kết nghĩa. Tiếng sành va vào nhau giòn tan, rượu bắn tung tóe vào tro hồng bốc lên một làn khói thơm cay xè mắt.

Bên cạnh chàng, Tố Y khoác chiếc áo choàng lông hồ ly trắng tinh khôi, đôi má ửng hồng dưới ánh lửa bập bùng. Nàng dùng đũa bạc gắp miếng thịt hoẵng nhúng chín tới đặt vào bát của chàng, ánh mắt dịu dàng như làn suối xuân xua tan mọi băng giá.

Xung quanh họ, hàng chục bậc hảo hán giang hồ đang cùng nhau xẻ thịt, chuyền rượu, hát vang khúc tráng ca biên thùy. Ngoài kia, tuyết đông bắt đầu rơi trắng xóa cả một góc trời, nhưng trong lòng mỗi người tráng sĩ, ngọn lửa của tình huynh đệ và niềm tin son sắt đã thắp sáng một mùa đông ấm áp vô bờ.`
  },
  {
    id: 'scene_19_pho_hoi_chap_thu_dinh_tinh',
    title: 'Kim Thị Dạ Du • Ô Thước Kiều Đầu Chấp Thủ Định Tình',
    alias: 'Đêm Phố Cổ Chen Chúc Giữa Biển Người, Nắm Tay Người Thương Dưới Mưa Pháo Hoa',
    theme: 'Hẹn Hò Phố Hội',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm rằm tháng Giêng (Tết Thượng Nguyên), giờ Tuất canh một, đèn đuốc kinh kỳ bừng sáng như ban ngày',
      weatherAndSeason: 'Tiết trời đầu xuân dịu êm, gió thoảng hơi mát mơn man tà áo lụa, sương xuân mỏng manh giăng mắc cành liễu non',
      lightingAndSpace: 'Phố cổ Kim Lăng dài mười dặm dọc hai bờ Tần Hoài giăng kín đèn lồng đỏ, ánh đèn bừng sáng hắt bóng vàng cam lung linh xuống mặt nước sóng sánh'
    },
    sceneryDescription: 'Một khu phố cổ phồn hoa bậc nhất thiên hạ. Cây cầu đá vòm Ô Thước Kiều uốn cong như dải lụa bắc ngang dòng sông biếc. Hai bên bờ sông là những lầu gác ba tầng mái ngói cong vút, rèm the phất phơ, lồng đèn bát giác đỏ thắm treo san sát. Dưới chân cầu, thuyền hoa kết hoa sen lướt nhẹ, để lại những vệt sóng lăn tăn óng ánh. Các quầy hàng ven đường bày kẹo hồ lô đỏ mọng, mặt nạ tuồng gốm men lam, quạt the thêu hoa đào và những giàn câu đố chữ dán dải lụa đỏ bay phấp phới.',
    skyAndAirborne: {
      celestialPhenomena: 'Vầng trăng rằm đầu năm tròn vành vạnh như đĩa bạch ngọc treo giữa đỉnh trời tím thẫm; từng chùm pháo hoa ngũ sắc nở bung liên tiếp xé toạc màn đêm, rơi xuống như những đóa hoa mẫu đơn lửa rực rỡ lấp lánh bụi kim tuyến.',
      aerialMotion: 'Hàng ngàn chiếc đèn Khổng Minh vàng rực như muôn vạn đốm đom đóm thần tiên từ từ bay lượn trên không trung; gió xuân nhẹ thổi cuốn theo những cánh hoa mai trắng muốt từ các hoa viên ven sông bay lả tả lướt qua vai áo người trẩy hội.'
    },
    crowdAndPassersby: {
      crowdAtmosphere: 'Biển người như nêm, tài tử văn nhân phe phẩy quạt ngâm thơ, giai nhân đài các che quạt the e ấp cười đùa, trẻ thơ tay cầm đèn lồng cá chép đuổi nhau chạy nhảy ríu rít; tiếng rao hàng kẹo đường gừng, tiếng trống mõ đố thơ và tiếng đàn tranh rộn rã khắp hang cùng ngõ hẻm.',
      contrastWithCouple: 'Giữa biển người đông đúc chen vai sát cánh xô bồ của chốn kinh kỳ huyên náo, hai người bước đi thật chậm. Dòng người tựa như dòng nước lũ cuồn cuộn lướt qua hai bên, nhưng ở giữa tâm bão phồn hoa ấy, thời gian như ngưng đọng lại thành một ốc đảo bình yên tuyệt đối, thế gian vạn người dường như đều mờ nhòa đi, chỉ còn lại ánh mắt và hơi thở của người đối diện.'
    },
    coupleRomanceFocus: {
      tenderMoments: 'Khi một đoàn múa lân sư rồng rầm rộ ùa tới khiến dòng người chen lấn, chàng nhanh chóng nghiêng người chắn chở phía trước nàng, rồi nhẹ nhàng luồn bàn tay thô ráp ấm áp của mình nắm trọn lấy những ngón tay mềm mại mát lạnh của nàng, kéo vào trong ống tay áo choàng gấm để sưởi ấm. Chàng dừng lại bên quán trâm ngọc, tự tay chọn một chiếc trâm cài hoa đào bằng ngọc phỉ thúy khẽ cài lên làn tóc mây của nàng.',
      unspokenGaze: 'Nàng e lệ ngước nhìn chàng, đôi gò má ửng hồng phản chiếu ánh đèn lồng đỏ rực, khóe môi hé nụ cười ngọt ngào khuynh thành; bốn mắt nhìn nhau chan chứa tình ý không cần cất lời, bàn tay nhỏ khẽ siết chặt lấy tay chàng như thề ước trọn kiếp không buông.'
    },
    wineAndFeast: {
      wines: ['Lê Hoa Xuân ngọt dịu', 'Nguyên Tiêu Thược Dược Tửu'],
      delicacies: ['Bánh trôi nước hoa nhài ngọt bùi', 'Kẹo hồ lô ngào đường óng ánh', 'Thịt xiên nướng thảo mộc thơm nức mũi', 'Bánh quế hoa ướp mật ong'],
      tableSetting: 'Bàn trà gỗ mộc kê sát lan can quán trà ven cầu, ấm gốm Nghi Hưng bốc khói nghi ngút, đĩa men ngọc đựng kẹo ngọt'
    },
    companionsAndRomance: {
      heroes: 'Bậc kiếm khách oai phong từng bạt kiếm định phong vân nơi sa trường, nay thu hết sát khí, ánh mắt ngập tràn vẻ dịu dàng chở che vô bờ bến.',
      beauties: 'Tuyệt sắc mỹ nhân khoác áo lông hồ ly trắng tinh khôi, đôi mắt biếc tựa hồ thu long lanh phản chiếu ánh trăng rằm và ánh hoa đăng lung linh.',
      brotherhoodBond: 'Tình yêu đôi lứa hòa cùng lời chúc phúc thầm lặng của bằng hữu bốn phương đang thưởng rượu trên lầu cao.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Tranh mười sáu dây kết hợp sáo trúc ngắn và tiếng chuông đồng gió',
      harmonyVibe: 'Rộn ràng, tình tứ, ngọt ngào, ngân vang nhịp đập rộn rã của mối tình đầu trong sáng giữa chốn nhân gian khói lửa.',
      originalPoem: `Đông phong dạ phóng hoa thiên thụ,
Chúng lý tầm tha bách độ hồi.
Mạc nhiên hồi thủ đăng hoa xứ,
Chấp thủ giai nhân tiếu nhan khai.`
    },
    sensoryDetails: {
      visual: 'Biển đèn lồng đỏ rực, pháo hoa nổ bung trên trời đêm lấp lánh phản chiếu trong đôi mắt đen láy ngập tràn yêu thương của nàng.',
      auditory: 'Tiếng cười giòn giã của trẻ thơ, tiếng pháo nổ đì đẹt giòn tan hòa cùng tiếng thì thầm dịu ngọt bên tai: "Đừng buông tay ta nhé".',
      olfactory: 'Mùi đường mạch nha thơm ngọt ngào của kẹo hồ lô quyện với mùi hương phấn thơm hoa nhài thoang thoảng trên mái tóc nàng.',
      gustatory: 'Cắn viên bánh trôi nước mềm dẻo nhân vừng đen ngọt lịm tan chảy nơi đầu lưỡi cùng vị cay ấm của nước gừng.',
      tactile: 'Cảm giác mềm mại, ấm áp khi các ngón tay đan chặt vào nhau trong tay áo choàng, truyền qua từng nhịp đập thổn thức của con tim.'
    },
    masterProseExcerpt: `Đêm Thượng Nguyên, phố cổ Kim Lăng ngập tràn trong biển hoa đăng rực rỡ mười dặm không dứt.

Tiếng trống múa lân sư rồng rộn rã vang lên từ đầu phố, kéo theo một làn sóng người du xuân trẩy hội cuồn cuộn đổ về phía Ô Thước Kiều. Tài tử giai nhân chen vai sát cánh, tiếng cười nói trêu đùa, tiếng rao hàng kẹo hồ lô ngọt lịm cùng những dải lụa đỏ đố thơ bay phấp phới dưới ánh đèn lồng bát giác đỏ thắm.

"A..."

Một tốp thiếu niên chạy đùa xô tới, khiến Liễu Tố Y khẽ chao đảo. Nhanh như chớp, cánh tay rắn chắc của Tiêu Cảnh vươn ra, vòng qua ôm trọn lấy bờ vai thon nhỏ của nàng kéo sát vào ngực mình, dùng tấm lưng rộng vững chãi che chắn cho nàng khỏi dòng người xô đẩy.

Giữa biển người huyên náo cuồn cuộn như thác lũ ấy, chàng nhẹ nhàng cầm lấy bàn tay nhỏ nhắn mát lạnh của nàng, từng ngón tay chậm rãi đan chặt vào nhau rồi luồn sâu vào trong tay áo choàng lông cừu ấm áp.

Tố Y giật mình ngước nhìn lên. Dưới ánh sáng vàng cam ấm áp của ngàn ngọn lồng đèn phố thị, gương mặt cương nghị phong trần của người anh hùng từng vào sinh ra tử nơi sa trường lúc này chỉ còn lại nét dịu dàng vô hạn. 

"Đông người lắm, nắm chặt tay ta, đừng để lạc mất nhau." Giọng chàng trầm ấm vang lên bên tai nàng, dịu dàng hơn cả làn gió xuân đầu mùa.

Đúng lúc ấy, trên nền trời đêm tím thẫm, hàng chục chùm pháo hoa ngũ sắc đồng loạt nổ bung. Từng đóa hoa lửa rực rỡ xòe rộng soi sáng khắp vòm trời, rọi bóng hai người trên mặt cầu đá rêu phong. Hàng ngàn chiếc thiên đăng vàng rực từ từ bay lơ lửng giữa không trung, mang theo muôn vạn lời nguyện ước bình an bay về phía trời cao.

Nàng khẽ cúi đầu, hai má ửng hồng e ấp như đóa hải đường ngậm sương mai, bàn tay nhỏ nhắn càng siết chặt lấy bàn tay chàng. Giữa chốn hồng trần cuồn cuộn ngàn vạn người lướt qua nhau như bèo nước, tìm kiếm trăm ngàn lần trong cõi mộng, giờ phút này chỉ cần được nắm lấy bàn tay này cùng đi đến trọn kiếp, thì dẫu ngoài kia có bao nhiêu phong ba bão táp cũng chẳng thể nào chạm tới được sự bình yên nơi đáy mắt hai người.`
  },
  {
    id: 'scene_20_tuyet_mai_che_o_dong_hanh',
    title: 'Tuyết Mai Tán Bộ • Đoạn Kiều Tương Khán Tịch Mịch Xuân',
    alias: 'Cùng Che Một Chiếc Ô Dầu Bước Đi Giữa Rừng Mai Tuyết Rơi Lặng Lẽ',
    theme: 'Tuyết Dạ Tương Tư',
    timeAndAtmosphere: {
      timeOfDay: 'Chiều muộn chạng vạng chuyển sang đêm tối, tuyết đầu mùa rơi lả tả phủ trắng khắp không gian',
      weatherAndSeason: 'Gió bấc thổi nhẹ làm cành mai rung rinh, không khí lạnh buốt giá nhưng trong veo, tĩnh lặng đến mức nghe được tiếng tuyết rơi',
      lightingAndSpace: 'Con đường đá men theo bờ Tây Hồ vắng vẻ, ráng chiều màu lam tím nhạt dần, ánh trăng non bạc nhú lên rọi sáng nền tuyết trắng tinh khôi'
    },
    sceneryDescription: 'Cây cầu đá Đoạn Kiều phủ đầy tuyết trắng xóa. Men theo bờ hồ là một rừng hồng mai cổ thụ ngàn năm đang thi nhau bung nở những đóa hoa đỏ thắm kiêu hãnh giữa trời đông. Mặt hồ Tây phẳng lặng như tấm gương băng khổng lồ, in bóng những chiếc thuyền nan rẽ tuyết neo đậu ven rặng liễu gầy guộc. Những nhánh hoa mai đỏ thắm vươn dài qua bức tường phủ đầy tuyết, đọng lại những giọt sương băng trong suốt lấp lánh.',
    skyAndAirborne: {
      celestialPhenomena: 'Bầu trời mùa đông màu xám bạc thăm thẳm, vầng trăng khuyết như chiếc lưỡi liềm ngọc nhô lên từ rặng núi xa, tỏa ánh hào quang mát lạnh soi rọi từng bông tuyết.',
      aerialMotion: 'Những bông tuyết lớn mịn màng như lông ngỗng chầm chậm xoay tròn rơi xuống từ trời cao; làn gió lạnh thỉnh thoảng thổi xoáy làm những cánh hoa mai đỏ thắm bứt khỏi cành bay lượn trên không trung, quyện chặt cùng bông tuyết trắng muốt tạo thành một màn vũ điệu "Hồng Mai Tuyết Vũ" mê hồn.'
    },
    crowdAndPassersby: {
      crowdAtmosphere: 'Không gian vắng vẻ thanh tịch của ngày đông giá buốt. Thỉnh thoảng mới có một lão tiều phu mặc áo tơi vội vã gánh củi bước nhanh về làng, hoặc một chiếc xe ngựa quý tộc che rèm kín mít lăn bánh lộc cộc để lại hai vệt hằn sâu trên nền tuyết; bên góc đường, một quán trà nhỏ mái tranh đang bốc khói nghi ngút, vài vị khách lữ hành dừng chân hơ tay bên bếp lửa.',
      contrastWithCouple: 'Trong khi mọi người đều hối hả trốn chạy cái rét để tìm về mái ấm, hai người lại thong thả bước đi bên nhau dưới một chiếc ô giấy dầu. Khoảng cách giữa họ thật gần, hơi thở ấm áp phả ra làn khói trắng hòa quyện vào nhau, sự lạnh lẽo tê buốt của vạn dặm non sông tuyết phủ hoàn toàn bị ngăn cách bên ngoài vành ô, chỉ còn lại sự ấm áp ngọt ngào lan tỏa trong từng bước chân.'
    },
    coupleRomanceFocus: {
      tenderMoments: 'Chiếc ô giấy dầu vẽ cành trúc xanh luôn được chàng nghiêng hẳn sang phía nàng để che chắn từng hạt tuyết, khiến một bên vai áo choàng của chàng đã phủ đầy tuyết trắng mà chàng không hề hay biết. Chàng khẽ dừng bước, đưa những ngón tay ấm áp cẩn thận gạt đi một bông tuyết đọng trên hàng mi cong vút của nàng; nàng khẽ co ro nép sát vào ngực chàng, hai bàn tay áp vào má chàng để sưởi ấm cho chàng.',
      unspokenGaze: 'Ánh mắt hai người chạm nhau trong tĩnh lặng, sâu thẳm như làn nước hồ thu; nụ cười thoáng hiện trên khóe môi cùng ánh mắt long lanh thay cho vạn lời hẹn ước: *"Cùng người bước đi trong tuyết trắng, dẫu không ước hẹn cũng đã cùng nhau đi đến lúc bạc đầu"*.'
    },
    wineAndFeast: {
      wines: ['Hồng Nê Luyện Hầu Tửu đun ấm', 'Bạch Mai Tuyết Trà'],
      delicacies: ['Hạt dẻ nướng mật thơm bùi', 'Bánh nếp nướng tro ngọt lịm', 'Củ ấu luộc nóng hổi', 'Mứt gừng cay ấm'],
      tableSetting: 'Quầy quán trà ven hồ với lò than đỏ tí tách, chiếc ấm đồng đun nước tuyết mai xèo xèo bốc khói'
    },
    companionsAndRomance: {
      heroes: 'Bậc nam nhi trượng phu từng coi thường sinh tử, giờ đây chỉ lo một cơn gió lạnh làm người con gái mình yêu bị cảm lạnh; cử chỉ ân cần tỉ mỉ đến từng chi tiết.',
      beauties: 'Thiếu nữ tuyệt sắc khoác áo choàng đỏ thắm viền lông cáo trắng như đóa mẫu đơn rực rỡ giữa tuyết băng; ánh mắt đong đầy sự tin cậy và ấm áp.',
      brotherhoodBond: 'Sự bình yên thầm lặng nơi tâm hồn, nơi tình yêu trở thành bến đỗ bình yên nhất sau chuỗi ngày bôn ba giang hồ.'
    },
    musicAndPoetry: {
      instruments: 'Khúc Sáo Trúc ngân nga trong trẻo hòa cùng tiếng tuyết rơi lộp độp trên mặt ô dầu',
      harmonyVibe: 'U tĩnh, thanh thuần, ngọt ngào, êm ả như dòng suối nguồn chảy dưới lớp băng đông.',
      originalPoem: `Đoạn kiều tàn tuyết lạc mai hoa,
Đồng tán tương tùy mộng nhập hà.
Bất ngữ ôn nhu thâm ý tại,
Bạch đầu tịnh bộ tiếu phong ba.`
    },
    sensoryDetails: {
      visual: 'Màu đỏ thắm của hoa mai và tà áo choàng nổi bật rực rỡ trên nền tuyết trắng tinh khôi; ánh mắt lấp lánh như sao dưới tán ô giấy dầu.',
      auditory: 'Tiếng tuyết rơi khẽ xào xạc trên mặt dù giấy dầu, tiếng bước chân giẫm lạo xạo trên lớp tuyết xốp, tiếng thở nhịp nhàng ấm áp.',
      olfactory: 'Hương mai rừng thanh khiết ngào ngạt quyện với mùi giấy dầu dầu thông và mùi hạt dẻ nướng thơm lừng từ xa đưa lại.',
      gustatory: 'Vị ngọt bùi béo ngậy của hạt dẻ nướng nóng hổi vừa bóc vỏ, ngụm trà nóng pha nước tuyết mai ngọt lành ấm áp.',
      tactile: 'Cảm giác buốt lạnh trên chóp mũi và gò má lập tức tan biến khi được chạm vào bàn tay ấm áp và bờ vai vững chãi của chàng.'
    },
    masterProseExcerpt: `Tuyết đầu mùa bắt đầu rơi dày đặc trên Đoạn Kiều ven bờ Tây Hồ.

Cả đất trời chìm vào một màu trắng xóa tĩnh mịch. Dưới chân cầu, những nhánh hồng mai ngàn năm đang kiêu hãnh bung nở những đóa hoa đỏ thắm như những giọt máu tươi đọng trên tuyết ngọc. Gió bấc thổi qua, cuốn theo những cánh hoa mai đỏ thắm bay lượn giữa không trung, nhảy múa cùng muôn ngàn bông tuyết trắng muốt.

Tiêu Cảnh cầm chiếc ô giấy dầu vẽ cành trúc xanh, nghiêng hẳn cán ô về phía Liễu Tố Y. Một bên vai áo chàng đã bị tuyết phủ trắng xóa tự bao giờ, nhưng chàng chẳng hề bận tâm, ánh mắt chàng chỉ dõi theo từng bước chân nhỏ nhắn của nàng trên nền tuyết xốp.

"Tiêu lang, vai chàng ướt hết tuyết rồi kìa!" 

Tố Y khẽ thốt lên xót xa. Nàng dừng bước, vươn hai bàn tay thon nhỏ phủi sạch lớp tuyết đọng trên vai chàng, rồi áp hai lòng bàn tay mềm mại vào gò má phong trần của chàng để truyền hơi ấm.

Tiêu Cảnh mỉm cười dịu dàng. Chàng nắm lấy đôi bàn tay nhỏ đang run rẩy vì lạnh của nàng, kéo sát nàng vào lòng mình dưới vành ô hẹp. Chiếc ô giấy dầu nhỏ bé bỗng chốc trở thành cả một thế giới ấm áp, che chắn đi mọi giá lạnh của mùa đông vạn dặm ngoài kia.

Chàng nhẹ nhàng đưa tay gạt đi một bông tuyết vừa đậu trên hàng mi cong vút của nàng. Bốn mắt nhìn nhau đắm đuối. Giữa không gian tĩnh lặng không một bóng người, chỉ có tiếng tuyết rơi khẽ khàng trên mặt ô dầu và tiếng nhịp tim hai người đập rộn rã hòa làm một. 

Phía sau lưng họ, hai hàng dấu chân song song in sâu trên nền tuyết trắng tinh khôi, kéo dài mãi về phía rừng mai đỏ thắm. Người đời thường bảo, nếu có thể cùng người mình yêu bước đi dưới tuyết lớn, thì chẳng cần ước hẹn cũng đã cùng nhau đi trọn đến lúc bạc đầu.`
  },
  {
    id: 'scene_21_tien_lu_ngam_sao_phi_kiem',
    title: 'Thần Sơn Tinh Hà • Song Kiếm Phi Hành Lạc Cửu Thiên',
    alias: 'Ngồi Cùng Phi Kiếm Giữa Biển Mây Đêm Ngắm Mưa Sao Băng Ngân Hà',
    theme: 'Tiên Lữ Đồng Hành',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm khuya thanh vắng giờ Tý, khi vạn vật trần gian đều chìm vào giấc ngủ sâu tĩnh mịch',
      weatherAndSeason: 'Không khí trên chín tầng mây thanh khiết tuyệt đối, gió tiên lồng lộng thổi mát rượi, không một hạt bụi trần',
      lightingAndSpace: 'Đỉnh Côn Lôn ngàn trượng hoặc khoảng không vô tận trên biển mây, dải Ngân Hà rực sáng như dải lụa kim cương vắt ngang vòm trời'
    },
    sceneryDescription: 'Một mỏm đá ngọc "Vọng Tinh Đài" nhô ra giữa không trung của dãy núi thần tiên, hoặc một thanh cự phi kiếm dài ba trượng phát ra kiếm quang xanh biếc lơ lửng giữa tầng mây lộng gió. Dưới chân là biển mây trắng muốt cuộn trào như sóng thần tiên cảnh dưới ánh trăng. Xung quanh, những cây cổ tùng ngậm linh khí phát ra ánh lân tinh mờ ảo, hoa tuyết liên nở rộ trên vách đá tỏa hương ngạt ngào.',
    skyAndAirborne: {
      celestialPhenomena: 'Cơn mưa sao băng (Thiên Tinh Lạc Vũ) kỳ vĩ chưa từng có; hàng trăm vệt sáng bạc xé toạc màn đêm sâu thẳm, vạch nên những đường cong lấp lánh nối liền các chòm sao; dải Ngân Hà bừng sáng rực rỡ như một dòng sông châu báu vô tận.',
      aerialMotion: 'Thanh phi kiếm lướt êm ru xé tan màn sương mỏng, từng dải linh quang ngũ sắc uốn lượn sau đuôi kiếm; đàn tiên hạc trắng muốt từ các động tiên bay lượn vòng quanh, cất tiếng hót thanh tao vọng khắp chín tầng trời.'
    },
    crowdAndPassersby: {
      crowdAtmosphere: 'Từ độ cao chín vạn dặm phóng tầm mắt nhìn xuống trần thế, kinh đô hoa lệ và các vương quốc phàm trần chỉ còn là những đốm sáng li ti như tổ kiến; mọi sự tranh giành quyền lực, đấu đá ân oán và danh lợi bụi bặm đều chìm vào hư vô.',
      contrastWithCouple: 'Sự tương phản tột cùng giữa cõi phàm trần ồn ào nhỏ bé với sự bao la vĩnh cửu của trời đất và tình yêu son sắt của hai người; đứng trên đỉnh cao nhất của thiên địa, họ nhận ra điều quý giá nhất của đời tu tiên không phải là trường sinh bất tử, mà là có người cùng mình ngắm nhìn vạn dặm tinh hà.'
    },
    coupleRomanceFocus: {
      tenderMoments: 'Chàng cởi chiếc áo choàng lông vũ tiên gia khoác lên vai nàng, rồi ngồi xếp bằng phía sau, hai tay vòng qua người nàng giữ lấy đốc kiếm; nàng tựa lưng hoàn toàn vào lồng ngực ấm áp của chàng, ngước đầu ngắm sao băng rơi; chàng cúi xuống khẽ đặt một nụ hôn dịu ngọt lên vầng trán thanh tú của nàng.',
      unspokenGaze: 'Khi một ngôi sao băng cực lớn tỏa ánh hào quang bảy sắc xé ngang bầu trời, hai người cùng nhắm mắt đan tay nguyện ước; ánh mắt mở ra tràn ngập niềm tin bất diệt vào đạo tâm và tình lữ kiếp kiếp không rời.'
    },
    wineAndFeast: {
      wines: ['Cửu Thiên Tinh Hà Lộ Tửu', 'Dao Trì Ngọc Dịch'],
      delicacies: ['Quả Bích Đào ngàn năm ngọt lịm', 'Mật ong tuyết sơn thanh khiết', 'Bánh linh thảo đan sa', 'Trà tuyết liên bốc khói hình hạc'],
      tableSetting: 'Chiếc khay ngọc tử thạch đặt ngay trên thân kiếm phi hành, hai chiếc chén tạc từ ngọc lưu ly phát sáng'
    },
    companionsAndRomance: {
      heroes: 'Bậc kiếm tôn ngạo nghễ thiên hạ, kiếm khí tung hoành tam giới, nhưng trước mặt người yêu lại cẩn trọng nâng niu từng sợi tóc, ánh mắt ngập tràn tình yêu thương tha thiết.',
      beauties: 'Thần tiên tỷ tỷ thanh tao thoát tục, áo tiên bồng bềnh như mây, tựa vào người thương với sự an tâm tuyệt đối.',
      brotherhoodBond: 'Tình đạo lữ chí cao vô thượng, cùng nhau vượt qua thiên kiếp, cùng nhau phi thăng cửu thiên.'
    },
    musicAndPoetry: {
      instruments: 'Tiêu Ngọc Thiên Âm hòa cùng tiếng ngân vang của kiếm khí rồng ngâm',
      harmonyVibe: 'Bao la, huyền ảo, rung động tâm linh, đưa linh hồn bay bổng hòa nhập vào vũ trụ vô tận.',
      originalPoem: `Ngự kiếm phi thăng cửu vạn lý,
Tinh hà dạ sắc chiếu giai nhân.
Trần gian vạn sự như mộng ảo,
Bất phụ thương thiên bất phụ quân.`
    },
    sensoryDetails: {
      visual: 'Mưa sao băng rực rỡ xé toạc màn đêm xanh thẳm, ánh kiếm quang xanh biếc soi rõ gương mặt thanh tú thoát tục của người tri kỷ.',
      auditory: 'Tiếng gió tiên rít nhẹ êm đềm bên tai, tiếng kiếm ngân vang trầm bổng, tiếng thì thầm thề ước dịu dàng giữa trời sao.',
      olfactory: 'Hương thơm thanh khiết của hoa tuyết liên quyện với mùi trầm hương thoang thoảng trên tà áo tiên bào.',
      gustatory: 'Vị ngọt mát như giọt sương mai của quả Bích Đào, ngụm rượu Tinh Hà làm ấm bừng toàn bộ kinh mạch và đan điền.',
      tactile: 'Cảm giác lướt đi êm ái giữa không trung bao la, lồng ngực vững chãi và hơi ấm nồng nàn của chàng bao bọc lấy nàng.'
    },
    masterProseExcerpt: `Thanh Bản Mệnh Phi Kiếm tỏa ánh kiếm quang xanh biếc rẽ mây lướt đi giữa chín tầng trời lộng gió.

Dưới chân Tiêu Cảnh và Liễu Tố Y, biển mây cuộn sóng bồng bềnh trắng muốt như dải ngân hà thứ hai của đất trời. Từ độ cao vạn trượng này nhìn xuống, cõi hồng trần trần thế với kinh thành hoa lệ và những cuộc tranh đoạt quyền lực đẫm máu chỉ còn là những đốm sáng li ti mờ nhạt như cát bụi.

Đúng lúc ấy, trên vòm trời đêm đen thẳm thăm thẳm, một tiếng nổ nhỏ vang lên tựa như chuông bạc cõi tiên. Cơn mưa sao băng rực rỡ nhất ngàn năm bắt đầu rơi xuống.

Hàng trăm vệt sáng bạc liên tiếp vạch qua bầu trời, kéo theo những dải đuôi kim tuyến lấp lánh nối liền từ chân trời này sang chân trời khác. Cả vòm trời đêm bừng sáng rực rỡ như một ngày hội hoa đăng của các bậc thần tiên thượng cổ.

Tiêu Cảnh khoác chiếc áo choàng lông vũ ấm áp quanh bờ vai Tố Y, rồi từ phía sau nhẹ nhàng ôm trọn lấy nàng vào lòng. Nàng khẽ ngả đầu tựa vào bờ vai chàng, đôi mắt biếc long lanh phản chiếu muôn ngàn vì tinh tú đang rơi lả tả.

"Tiêu lang... Chàng có tin vào lời ước dưới mưa sao băng không?" Nàng khẽ thì thầm, giọng nói thanh tao như tiếng ngọc khánh rơi trên mâm vàng.

"Ta tin." Tiêu Cảnh mỉm cười, siết chặt bàn tay nàng: "Nhưng ta không ước giang sơn vạn dặm, cũng không ước trường sinh bất lão. Ta chỉ ước rằng dẫu trải qua trăm kiếp luân hồi, ngàn năm dâu bể, mỗi lần ngẩng đầu nhìn lên trời sao, người đứng bên cạnh ta vẫn mãi mãi là nàng."

Dưới cơn mưa sao băng rực rỡ muôn màu xé toạc màn đêm, chàng khẽ cúi đầu, đặt một nụ hôn dịu ngọt lên vầng trán thanh tú của nàng. Giữa cõi vũ trụ bao la vô tận ấy, thời gian như ngưng đọng lại thành vĩnh hằng, minh chứng cho một mối tình khắc cốt ghi tâm vượt qua mọi giới hạn của luân hồi sinh tử.`
  },
  {
    id: 'scene_22_thuyen_hoa_mua_xuan_giang_nam',
    title: 'Giang Nam Yên Vũ • Thuyền Hoa Nghe Mưa Đốt Trầm Đối Ẩm',
    alias: 'Khoang Thuyền Hoa Mưa Xuân Giang Nam Lắng Nghe Tiếng Mưa Rơi Tự Tình',
    theme: 'Lãng Mạn Uyên Ương',
    timeAndAtmosphere: {
      timeOfDay: 'Đêm mưa xuân thanh vắng, giờ Hợi, không gian bảng lảng sương khói mờ nhân ảnh',
      weatherAndSeason: 'Mưa xuân rả rích dịu dàng như sợi tơ trời, gió nam hiu hiu mang theo hơi ẩm ngọt ngào của chồi non lộc biếc',
      lightingAndSpace: 'Chiếc thuyền hoa mành trúc thả trôi trên sông Cô Tô, ánh đèn lồng lụa đỏ hắt bóng ấm áp qua rèm the mỏng manh'
    },
    sceneryDescription: 'Dòng sông Cô Tô êm đềm chảy xuyên qua lòng phố cổ Giang Nam. Hai bên bờ là những dãy nhà tường trắng mái ngói xám rêu phong san sát nhau, bậc đá rêu xanh dẫn thẳng xuống mép nước. Mưa xuân giăng mắc như một tấm màn voan mỏng bao trùm cả thành phố. Dưới ánh đèn lồng đỏ treo dưới mái hiên, những giọt mưa rớt xuống mặt sông tạo thành muôn ngàn vòng tròn sóng biếc lan tỏa êm đềm.',
    skyAndAirborne: {
      celestialPhenomena: 'Bầu trời đêm mưa xuân mờ ảo như một bức tranh thủy mặc đẫm mực tàu; ánh trăng mờ ẩn hiện sau màn mây xám bạc tạo nên thứ ánh sáng huyền ảo liêu trai.',
      aerialMotion: 'Những hạt mưa xuân mỏng nhẹ như tơ tằm bay lượn xiên xiên trong gió đêm; từng đàn chim én chao lượn tìm chỗ trú dưới mái ngói cong vút; làn khói lam chiều từ các bếp lò cổ kính bay là là trên mặt sông hòa vào màn mưa bụi.'
    },
    crowdAndPassersby: {
      crowdAtmosphere: 'Dòng người trên bờ vội vã rảo bước qua những cây cầu đá uốn cong, tay cầm ô giấy dầu hoa đào hoa mai; những chiếc thuyền chở rượu xuôi dòng với tiếng mái chèo khua nước bì bõm; cô gái dệt lụa gánh thúng tre bước nhanh về ngõ nhỏ rêu phong.',
      contrastWithCouple: 'Bên ngoài mưa gió lạnh lùng và dòng người hối hả lướt qua, bên trong khoang thuyền hoa lại ấm áp như một chốn bồng lai biệt lập. Mùi khói trầm an tức thơm dịu, ánh đèn vàng ấm áp và tiếng đàn tỳ bà thánh thót biến chiếc thuyền thành một thế giới chỉ thuộc về hai tâm hồn đồng điệu.'
    },
    coupleRomanceFocus: {
      tenderMoments: 'Khi nàng bước vào khoang thuyền với mái tóc vương lấm tấm những giọt mưa xuân, chàng ân cần lấy chiếc khăn lụa mềm nhẹ nhàng lau khô từng sợi tóc mai cho nàng; nàng mỉm cười dịu dàng, tự tay rót chén rượu Thanh Mai ấm nồng đưa tận tay chàng; hai người ngồi sát bên cửa sổ mành trúc, cùng ngắm nhìn mưa rơi ngoài sông.',
      unspokenGaze: 'Ánh mắt nàng nhìn chàng chan chứa sự e ấp và tin cậy; khi chàng khẽ đặt tay lên bàn tay nàng trên phím đàn, hai người đều cảm nhận được dòng nhiệt lưu ấm áp chảy tràn khắp lồng ngực; nụ cười bẽn lẽn của nàng làm bừng sáng cả khoang thuyền mờ ảo.'
    },
    wineAndFeast: {
      wines: ['Thanh Mai Tửu đun ấm với gừng tươi', 'Giang Nam Bích Loa Trà'],
      delicacies: ['Bánh định thắng dẻo thơm màu hồng đào', 'Thịt lợn Đông Pha hầm nhừ thơm ngậy', 'Cá hồ chiên giòn sốt chua ngọt', 'Kẹo mạch nha rắc hoa quế'],
      tableSetting: 'Bàn gỗ tử đàn nhỏ kê sát mạn thuyền, đỉnh đồng đốt trầm hương hình đóa sen hé nở, bình hoa sứ cắm cành hoa đào ngậm sương'
    },
    companionsAndRomance: {
      heroes: 'Bậc kiếm khách phong trần gác kiếm bên mạn thuyền, cởi bỏ áo tơi, đắm mình trong sự thanh bình và dịu dàng tuyệt đối bên người tri kỷ.',
      beauties: 'Giai nhân Giang Nam da trắng như tuyết, nét đẹp đằm thắm dịu dàng như nước mùa thu, ngón tay ngọc lướt trên dây đàn tỳ bà gảy khúc ca ân ái.',
      brotherhoodBond: 'Lời hứa son sắt trọn đời bên nhau, xem nhẹ vinh hoa phú quý nơi đô hội, chỉ mong cùng người chèo một chiếc thuyền nan phiêu dạt giang hồ.'
    },
    musicAndPoetry: {
      instruments: 'Đàn Tỳ Bà gảy khúc Giang Nam Xuân Vũ hòa cùng tiếng mưa rơi trên mái thuyền',
      harmonyVibe: 'Tình tứ, sâu lắng, êm đềm, đượm chút phong vị hoài cổ và lãng mạn vô biên của miền sông nước.',
      originalPoem: `Giang Nam yên vũ dạ mông lung,
Họa phảng huân hương tửu mãn trung.
Kính thính vũ thanh tương đối tiếu,
Bất từ trường tác thử quy ông.`
    },
    sensoryDetails: {
      visual: 'Ánh nến vàng ấm áp phản chiếu lên mái tóc ướt mưa của nàng, những giọt mưa xuân nối nhau rơi tí tách trên mặt nước sông mờ ảo khói sương.',
      auditory: 'Tiếng mưa rơi tí tách đều đặn trên mui thuyền nan, tiếng đàn tỳ bà ngân vang trầm ấm, tiếng thở dài khoan khoái khi tựa vào vai nhau.',
      olfactory: 'Mùi hương trầm an tức thơm ngọt quyện với mùi men rượu Thanh Mai nóng hổi và mùi đất ẩm sau cơn mưa xuân.',
      gustatory: 'Vị chua ngọt thanh nhã của rượu Thanh Mai đun nóng làm ấm ran cổ họng, miếng bánh định thắng mềm dẻo ngọt bùi.',
      tactile: 'Chiếc khăn lụa mềm mại lướt trên làn da mát lạnh, hơi ấm từ chén rượu và bàn tay người thương sưởi ấm toàn bộ tâm can.'
    },
    masterProseExcerpt: `Mưa xuân Giang Nam rả rích rơi suốt đêm trên dòng sông Cô Tô.

Màn sương mưa mỏng manh giăng mắc như tơ lụa, bao trùm lên những mái ngói rêu phong và những cây cầu đá cổ kính hai bên bờ sông. Trên mặt nước phẳng lặng, chiếc thuyền hoa mành trúc của Tiêu Cảnh lững lờ trôi theo con nước, để lại phía sau một vệt sóng biếc mờ ảo.

Bên ngoài, gió đêm lạnh lùng cuốn theo những hạt mưa bụi bay xiên xiên, thỉnh thoảng có vài người khách lữ hành vội vã cầm ô giấy dầu rảo bước trên cầu đá. Nhưng bên trong khoang thuyền, chiếc đỉnh đồng nhỏ đang tỏa ra làn khói trầm hương thơm ngọt dịu dàng, xua tan đi tất cả ẩm ướt và lạnh giá của đêm xuân.

Tiêu Cảnh cầm chiếc khăn lụa khô, ân cần ngồi xuống bên cạnh Liễu Tố Y. Chàng cẩn thận lau từng giọt mưa li ti còn đọng trên mái tóc mây và gò má trắng ngần mịn màng của nàng. 

Cảm nhận được sự dịu dàng nâng niu của chàng, Tố Y khẽ mỉm cười, đôi mắt đẹp tựa hồ thu cong cong như vầng trăng non. Nàng bưng chén rượu Thanh Mai vừa hâm nóng trên lò than nhỏ, nâng lên tận môi chàng:

"Tiêu lang, uống ngụm rượu ấm này đi kẻo lạnh."

Tiêu Cảnh đón lấy chén rượu, khẽ chạm tay vào những ngón tay thon nhỏ mát lạnh của nàng rồi uống cạn một hơi. Vị rượu thanh ngọt nồng ấm lập tức lan tỏa khắp lồng ngực. Chàng đặt chén xuống, nhẹ nhàng ôm lấy bờ vai mềm mại của nàng, cùng nàng nhìn qua khung cửa sổ mành trúc ra ngoài màn mưa giăng mắc.

Tố Y ôm cây đàn tỳ bà vào lòng, ngón tay ngọc khẽ gảy lên một khúc điệu êm ái. Tiếng đàn thánh thót hòa cùng tiếng mưa rơi tí tách trên mui thuyền, tiếng nước vỗ êm đềm vào mạn gỗ. Giữa chốn giang hồ đao quang kiếm ảnh, có được một đêm mưa xuân tĩnh lặng bên người tri kỷ, nghe tiếng mưa rơi, uống chén rượu ấm, đời người tu tiên hay hành hiệp trượng nghĩa cũng chỉ mong cầu đến khoảnh khắc tiêu dao thanh tịnh này mà thôi.`
  }
];

// =========================================================================
// HELPER ARRAYS & FESTIVAL CONSTANTS FOR SCENERY GENERATION & PROMPT INJECTION
// =========================================================================

export const FESTIVAL_WISH_INSCRIPTIONS = [
  'Nguyện đắc nhất nhân tâm, bạch thủ bất tương ly (Ước nguyện tình yêu son sắt)',
  'Nguyện giang sơn vô chiến hỏa, thiên hạ bách tính trường an (Ước nguyện hòa bình muôn thu)',
  'Tứ hải giai huynh đệ, phong vũ cộng tương tùy (Ước nguyện tình huynh đệ bền lâu)',
  'Nguyện ngô kiếm thông thiên địa, phù dao trực thướng cửu vạn lý (Ước nguyện chí lớn tu tiên)',
  'Tại thiên nguyện tác bỉ dực điểu, tại địa nguyện vi liên lý chi (Thề nguyền lứa đôi)',
  'Bạo trúc nhất thanh trừ cựu tuế, xuân phong tống noãn nhập Đồ Tô (Tống cựu nghênh xuân)',
  'Đạo tâm vĩnh cố, kiếm phá hư không, vạn kiếp bất diệt (Đắc đạo trường sinh)',
  'Hàn phong bất đổng trượng phu chí, hồng lô ôn tửu chiếu can đằng (Nghĩa khí hồng lô)'
];

export const FESTIVAL_SPECIAL_EFFECTS = [
  'Vạn đóa hoa đăng trôi dạt sóng biếc, thắp sáng mặt sông thành dải Ngân Hà rực rỡ chốn nhân gian.',
  'Biển đèn Khổng Minh vàng rực như muôn vạn vì sao bay ngược lên chín tầng mây thấu tận trời xanh.',
  'Tiếng pháo nổ giòn giã rải xác hồng khắp ngõ phố, khói thuốc pháo nồng ấm xua tan tà khí năm cũ.',
  'Lò đá đại đồng bốc lửa hồng rực rỡ xua tan trận gió bấc đầu mùa giá buốt.',
  'Lá ngô đồng vàng rực khẽ liệng xuống chén rượu Quế Hoa ấm nóng báo hiệu mùa thu tao nhã.',
  'Đá lạnh ướp rượu Trúc Diệp xanh ngắt giữa đầm sen bạt ngàn đón ngọn gió nam lập hạ.',
  'Tù và vỏ ốc biển ngân vang trầm hùng hộ tống vạn đóa đăng sen gỗ xuôi theo ngọn triều rút về đại dương.'
];

