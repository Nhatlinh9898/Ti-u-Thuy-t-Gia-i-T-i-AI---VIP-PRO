import {
  NeuralWeightMatrix,
  LearnedNarrativeAxiom,
  NeuralInferenceRecord,
  NeuralSelfLearningState
} from '../types';

export const INITIAL_NEURAL_WEIGHTS: NeuralWeightMatrix = {
  causalityRigor: 0.89,
  surpriseFactor: 0.84,
  emotionalDepth: 0.86,
  proseSophistication: 0.92,
  worldConsistency: 0.94,
  tensionMomentum: 0.88
};

export const PRESET_LEARNED_AXIOMS: LearnedNarrativeAxiom[] = [
  {
    id: 'axiom_01_combat_causality',
    category: 'CAUSALITY',
    ruleSummary: 'Khắc Chế Cường Địch Bằng Chuỗi 3 Mắt Xích Địa Lợi - Điểm Mù - Khí Cơ Cài Cắm',
    detailedInsight: 'Khi nhân vật chính vượt cấp đối đầu cường giả, không dùng buff sức mạnh bất chợt mà bắt buộc phải thông qua chuỗi 3 mắt xích: (1) Khai thác điểm mù hoặc khuyết tật công pháp của địch thủ -> (2) Đánh đổi tiêu hao linh bảo/tổn thương bản thân để tạo khe hở 1 tích tắc -> (3) Đòn trảm sát bằng đòn bẩy phù trận hoặc cấm chế đã cài cắm ngầm từ các chương trước. Độc giả đánh giá độ thỏa mãn tăng 47% so với chiến thắng đột ngột.',
    weight: 1.65,
    sourceInferenceId: 'inf_preset_01',
    timesApplied: 14,
    effectivenessRating: 4.9,
    status: 'CORE_PRINCIPLE',
    learnedAtEpoch: 1
  },
  {
    id: 'axiom_02_villain_depth',
    category: 'CHARACTER_PSYCHOLOGY',
    ruleSummary: 'Tam Trọng Nghịch Lý Tâm Lý Phản Diện: Bi Kịch Chủng Tộc & Động Cơ Chính Đáng',
    detailedInsight: 'Kẻ thù nguy hiểm nhất không phải là kẻ điên loạn tàn sát vô cớ, mà là kẻ mang lý tưởng cứu rỗi đồng tộc hoặc bảo vệ gia tộc nhưng đi ngược lại trật tự chính đạo. Sự suy diễn chứng minh: Khi kẻ thù có một nỗi đau nguyên bản và một lập trường đạo đức không thể thỏa hiệp, xung đột giữa hai nhân vật sẽ nâng tầm từ thù oán cá nhân thành cuộc va chạm của hai hệ tư tưởng lớn.',
    weight: 1.58,
    sourceInferenceId: 'inf_preset_02',
    timesApplied: 11,
    effectivenessRating: 4.95,
    status: 'CORE_PRINCIPLE',
    learnedAtEpoch: 2
  },
  {
    id: 'axiom_03_karmic_rebound',
    category: 'CAUSALITY',
    ruleSummary: 'Định Luật Bảo Toàn Nghiệp Lực: Mọi Kỳ Ngộ Đều Mang Theo Mầm Mống Tai Ương Tương Ứng',
    detailedInsight: 'Mỗi món tuyệt thế linh bảo, cổ đan hay tàn kiếm đoạt được từ bí cảnh bắt buộc phải mang theo một cái giá tiềm tàng: hoặc là phong ấn tà niệm của cự ma viễn cổ, hoặc là ấn ký truy hồn mà gia tộc đối địch có thể phát giác sau 5-10 chương. Không bao giờ cho nhân vật chính hưởng thụ kỳ ngộ êm thấm 100%, tạo ra đòn bẩy liên kết tự nhiên cho đại kiếp nạn tiếp theo.',
    weight: 1.42,
    sourceInferenceId: 'inf_preset_01',
    timesApplied: 9,
    effectivenessRating: 4.8,
    status: 'ACTIVE',
    learnedAtEpoch: 2
  },
  {
    id: 'axiom_04_dialogue_subtext',
    category: 'LITERARY_TONE',
    ruleSummary: 'Văn Thể Ẩn Ngữ Trong Đối Thoại Tiên Gia: Nhã Nhặn Bề Ngoài, Sát Khí Ngầm Dưới Đáy',
    detailedInsight: 'Trong các buổi hội ngộ giữa các trưởng lão hoặc sứ giả thế lực, đối thoại tránh dùng từ ngữ chửi bới thô tục thô thiển. Thay vào đó, sử dụng các điển tích cổ đạo, danh xưng nghi thức, ẩn dụ chén trà nguội hay hoa tàn để ngầm ra tối hậu thư. Lực căng tâm lý đạt cực đại khi lời nói nhẹ nhàng mà ánh mắt và thần thức đã va chạm rung chuyển không gian.',
    weight: 1.35,
    sourceInferenceId: 'inf_preset_03',
    timesApplied: 18,
    effectivenessRating: 4.85,
    status: 'ACTIVE',
    learnedAtEpoch: 3
  },
  {
    id: 'axiom_05_tension_oscillation',
    category: 'PLOT_PACING',
    ruleSummary: 'Quy Tắc Nhịp Thở Âm Dương: Xen Kẽ Tĩnh Tọa Trầm Lắng Sau Bão Táp Sinh Tử',
    detailedInsight: 'Sau một phân cảnh đại chiến sinh tử, mạng thần kinh phát hiện nếu tiếp tục nhồi nhét trận chiến thứ hai ngay lập tức sẽ khiến độc giả bị trơ cảm xúc. Hệ thống tự động học được việc chèn 1 trường đoạn chiêm nghiệm: hong khô vạt áo bên đống lửa, nhấp ngụm linh tửu, nhìn ngắm tuyết rơi bên ngoài sơn động để lắng đọng nội tâm và gia tăng tình bạn hữu.',
    weight: 1.50,
    sourceInferenceId: 'inf_preset_02',
    timesApplied: 16,
    effectivenessRating: 4.9,
    status: 'CORE_PRINCIPLE',
    learnedAtEpoch: 3
  },
  {
    id: 'axiom_06_twist_foreshadowing',
    category: 'SUBVERSION',
    ruleSummary: 'Quy Tắc Bước Ngoặt 3 Lớp: Dấu Vết Mờ -> Ngộ Nhận Giả -> Chân Tướng Nghẹt Thở',
    detailedInsight: 'Để tạo một bước ngoặt cốt truyện thần bút, không tạo ra tình tiết từ hư vô. Mạng nơ-ron rút ra công thức: Ở 3 chương trước cài 1 chi tiết tưởng như ngẫu nhiên (mùi khói thuốc, một vết sẹo cũ, hoặc một chiếc ấn chương kỳ lạ). Đến bước ngoặt, dẫn dắt độc giả ngộ nhận một kẻ vô tội, trước khi để chi tiết ngẫu nhiên kia giải mã chân tướng thực sự của kẻ giấu mặt.',
    weight: 1.72,
    sourceInferenceId: 'inf_preset_03',
    timesApplied: 8,
    effectivenessRating: 5.0,
    status: 'CORE_PRINCIPLE',
    learnedAtEpoch: 4
  }
];

export const PRESET_INFERENCE_RECORDS: NeuralInferenceRecord[] = [
  {
    id: 'inf_preset_01',
    timestamp: '2026-10-15 08:30',
    epoch: 3,
    sourceChapterTitle: 'Chương 18: Dạ Thám Hắc Huyết Đàm & Kiếm Khí Trảm Mãng',
    inferenceType: 'PLOT_TWIST',
    inputContext: 'Lâm Tiêu một mình tiến vào Hắc Huyết Đàm tìm kiếm Cửu Diệp Huyền Băng Thảo để giải độc hàn khí cho tiểu sư muội. Tại đáy đầm, hắn bất ngờ phát hiện xích sắt phong ấn Thất Tinh Huyền Mãng đã bị chặt đứt bởi một kiếm pháp vô cùng quen thuộc của bản môn.',
    deductionChain: [
      {
        stepOrder: 1,
        layerName: 'Lớp Nhận Thức Tín Hiệu & Vết Tích Vật Lý',
        observation: 'Vết chém trên hàn thiết huyền xích bằng phẳng như gương, còn vương lại chút tàn dư của Lôi Đình Kiếm Khí bát phẩm.',
        inference: 'Đây là độc môn tuyệt kỹ "Lôi Ảnh Phá Thiên Kiếm", trong toàn bộ Vô Cực Tông hiện tại chỉ có Đại Trưởng Lão và Đại Sư Huynh Tống Triệt nắm giữ.',
        confidenceScore: 94,
        activatedSynapses: ['Lôi Đình Kiếm Ý', 'Bản Môn Bí Kỹ', 'Hàn Thiết Trảm Ngân']
      },
      {
        stepOrder: 2,
        layerName: 'Lớp Phân Tích Động Cơ Ngầm & Lợi Ích Cốt Lõi',
        observation: 'Thất Tinh Huyền Mãng không hề phát cuồng tàn sát đệ tử tuần tra, mà canh giữ một lối đi bí mật thông thẳng xuống cấm địa Tông Môn.',
        inference: 'Kẻ thả mãng xà không muốn tiêu diệt tông môn, mà lợi dụng sự hỗn loạn để che mắt Hộ Tông Trận Pháp, đưa một phái đoàn bí mật vào Cấm Địa khai quật Long Mạch.',
        confidenceScore: 91,
        activatedSynapses: ['Bẫy Dương Đông Kích Tây', 'Long Mạch Tông Môn', 'Phản Đồ Thâm Tàng']
      },
      {
        stepOrder: 3,
        layerName: 'Lớp Dự Phóng Cánh Bướm & Bước Ngoặt Cục Diện',
        observation: 'Cửu Diệp Huyền Băng Thảo dưới đáy đầm thực chất là mồi nhử được cố tình để lại nhằm lừa Lâm Tiêu xuất hiện làm kẻ thế mạng.',
        inference: 'Nếu Lâm Tiêu hái thuốc và rời đi ngay, hắn sẽ lập tức rơi vào trận phục kích của Chấp Pháp Đường do Tống Triệt chỉ huy, bị khép tội tư thông Ma Giáo thả hung thú phá tông!',
        confidenceScore: 96,
        activatedSynapses: ['Trận Giả Giăng Bẫy', 'Gắp Lửa Bỏ Tay Người', 'Nghịch Chuyển Phản Kích']
      }
    ],
    coreRevelation: 'Vụ án Thất Tinh Huyền Mãng vượt ngục không phải sự cố ngẫu nhiên, mà là cái bẫy hoàn hảo hai tầng: vừa phong tỏa đường vào Cấm Địa, vừa chuẩn bị sẵn tội danh phản đồ để thanh trừng Lâm Tiêu.',
    butterflyForecast: 'Lâm Tiêu quyết định không ngắt thuốc ngay mà dùng bí thuật "Huyễn Ảnh Phù" tạo phân thân giả, đồng thời âm thầm lặn sâu vào huyệt đạo mãng xà để bắt quả tang kẻ đang thao túng trận pháp.',
    narrativeExpansionOutline: [
      'Hồi 1: Tương Kế Tựu Kế - Lâm Tiêu dùng tàn ảnh hái thảo dược, kích hoạt bẫy của quân địch ở bề mặt đầm.',
      'Hồi 2: Chân Tướng Dưới Đáy Đầm - Bắt gặp hắc y nhân đang cắm Trấn Hồn Đinh vào mắt trận Long Mạch, để lộ ngọc bội Chấp Pháp Đường.',
      'Hồi 3: Bẻ Gãy Bố Cục - Thay vì đối đầu trực diện, Lâm Tiêu đảo ngược dòng chảy linh tuyền, khiến âm mưu phản đồ bại lộ ngay trước mặt Chưởng Môn đang ngự kiếm đến ứng cứu.'
    ],
    synthesizedProseDraft: `Dưới đáy Hắc Huyết Đàm, làn nước lạnh lẽo tựa như vạn mũi kim châm thấu vào từng tấc da thịt.

Lâm Tiêu khẽ nghiêng ngọn hàn kiếm trong tay. Ánh kiếm mờ nhạt rọi sáng đoạn xích sắt đen kịt đang đứt lìa dưới đáy bùn lầy. Một vết cắt sắc lẹm, mịn màng như gương, vương vấn một tia lôi quang tím biếc nhạt nhòa nhưng bá đạo khôn cùng.

"Lôi Ảnh Phá Thiên Kiếm..." 

Đồng tử Lâm Tiêu co rút lại. Kiếm ý này, hắn đã từng thấy trên Lôi Đài Phong Vân ba năm trước. Lúc đó, chính Đại Sư Huynh Tống Triệt đã dùng một chiêu này chấn nhiếp toàn thể đệ tử nội môn. 

Bọt khí lăn tăn nổi lên giữa màn nước u ám. Một cơn ớn lạnh không xuất phát từ hàn khí, mà bò dọc theo sống lưng hắn. Thất Tinh Huyền Mãng hung hãn nuốt chửng linh hồn lại có thể lặng lẽ biến mất không để lại một tiếng gầm? Cây Cửu Diệp Huyền Băng Thảo kia rực rỡ tỏa hương giữa vùng đầm lầy chết chóc, giống như một miếng mồi thơm tho đặt sẵn trên lưỡi câu giấu kín.

"Tống Triệt... Ngươi không chỉ muốn thả xà thú dẫn dụ Hộ Tông Đại Trận chuyển hướng, mà còn muốn mượn tay Chấp Pháp Đường để biến ta thành con cờ thí mạng?"

Khóe môi Lâm Tiêu khẽ nhếch lên một nụ cười lạnh lùng, kiếm ý trong đan điền khẽ chấn động nhưng tuyệt nhiên không phát tiết ra ngoài một tia linh khí. Hắn búng ngón tay, một tấm bùa ẩn thân bằng da chồn màu xám tro hóa thành làn khói mỏng hòa tan vào dòng nước. Trò chơi này, kẻ đặt bẫy chưa chắc đã là thợ săn cuối cùng.`,
    confidenceIndex: 95,
    authorRating: 5,
    authorCritique: 'Suy diễn cực kỳ xuất sắc và chặt chẽ! Biến một cảnh hái thuốc thông thường thành một màn đấu trí chính trị nội bộ tông môn gay cấn.',
    selfLearningInsights: [
      'Quy tắc biến bẫy của địch thành sân khấu phản đòn của ta.',
      'Cài cắm kiếm ý thân thuộc của đồng môn tạo cảm giác phản bội và bi tráng.'
    ],
    appliedAxiomIds: ['axiom_01_combat_causality', 'axiom_06_twist_foreshadowing'],
    isReinforced: true
  },
  {
    id: 'inf_preset_02',
    timestamp: '2026-10-15 09:15',
    epoch: 3,
    sourceChapterTitle: 'Chương 27: Trà Đình Dưới Mưa & Khẩu Khí Thiên Cơ Cốc',
    inferenceType: 'LATENT_MOTIVE',
    inputContext: 'Tại đình nghỉ chân Hồi Tiên Lĩnh, sứ giả Thiên Cơ Cốc - Bạch Vũ Thiền chủ động dừng xe ngựa mời Lâm Tiêu uống một chén Ngộ Đạo Trà. Nàng ta bề ngoài muốn kết giao minh hữu, nhưng lại cố tình nhắc đến cái chết bí ẩn của phụ thân Lâm Tiêu mười năm trước.',
    deductionChain: [
      {
        stepOrder: 1,
        layerName: 'Lớp Tâm Lý Học Đối Thoại & Động Thái Phi Ngôn Ngữ',
        observation: 'Bạch Vũ Thiền tay rót trà nhưng mắt ba lần liếc nhìn về phía chiếc nhẫn đồng rỉ sét trên ngón trỏ của Lâm Tiêu.',
        inference: 'Nàng ta không quan tâm Lâm Tiêu tu vi cao bao nhiêu, mục tiêu thực sự là kiểm tra xem di vật của cố gia chủ Lâm gia có còn phản ứng với ngọc phù Thiên Cơ Cốc hay không.',
        confidenceScore: 92,
        activatedSynapses: ['Ngôn Ngữ Cơ Thể', 'Di Vật Cổ Gia', 'Thăm Dò Huyết Mạch']
      },
      {
        stepOrder: 2,
        layerName: 'Lớp Suy Luận Bàn Cờ Thế Lực & Mâu Thuẫn Ẩn',
        observation: 'Thiên Cơ Cốc luôn giữ thế trung lập trong cuộc chiến giữa Tam Đại Cổ Tộc, nhưng gần đây lại gấp rút chiêu mộ các tán tu kiếm đạo.',
        inference: 'Thiên Cơ Trận Pháp của cốc chủ đang gặp nguy cơ sụp đổ do thiếu một chìa khóa Hỗn Độn Kiếm Cốt; bọn họ nghi ngờ Lâm Tiêu thừa hưởng thể chất cấm kỵ này từ phụ thân.',
        confidenceScore: 95,
        activatedSynapses: ['Hỗn Độn Kiếm Cốt', 'Thế Lực Trung Lập', 'Tính Toán Bắt Cóc Hoặc Hợp Tác']
      }
    ],
    coreRevelation: 'Bạch Vũ Thiền bề ngoài ôn nhu hữu hảo, nhưng thực chất đang thực hiện sứ mệnh trắc nghiệm xem Lâm Tiêu là "Đồng Minh Tiềm Năng" hay là "Linh Dược Hình Người" để tế luyện đại trận giải cứu tông chủ.',
    butterflyForecast: 'Nếu Lâm Tiêu bộc lộ toàn bộ kiếm ý, hắn sẽ rơi vào tầm ngắm của sát thủ Thiên Cơ Cốc; nếu hắn giả vờ đần độn yếu ớt, Bạch Vũ Thiền sẽ hủy bỏ bảo hộ và để mặc cho gia tộc địch thủ hạ sát.',
    narrativeExpansionOutline: [
      'Hồi 1: Đấu Trí Chén Trà - Lâm Tiêu dùng triết lý tu kiếm ẩn giấu sắc sảo để giữ Bạch Vũ Thiền trong trạng thái hoài nghi, nửa tin nửa ngờ.',
      'Hồi 2: Thỏa Hiệp Có Điều Kiện - Trao đổi thông tin về cổ tích viễn phương nhưng giữ kín bí mật về chiếc nhẫn đồng.',
      'Hồi 3: Cài Lại Gián Điệp - Lâm Tiêu tinh tế để lại một đầu mối giả nhằm hướng sự chú ý của Thiên Cơ Cốc sang kẻ thù Tống Triệt.'
    ],
    synthesizedProseDraft: `Mưa đầu thu rả rích dội xuống mái ngói đình rêu phong, làm bốc lên một làn hơi sương lành lạnh giữa lưng chừng đèo.

Bạch Vũ Thiền khẽ nâng ấm tử sa, dòng nước trà vàng óng như mật ong chảy róc rách vào hai chiếc chén ngọc bích. Khói trà bốc lên nghi ngút, mang theo hương sen thanh tao thoang thoảng làm dịu đi mùi máu tanh còn vương trên chiến bào của Lâm Tiêu.

"Trà này tên là 'Vong Ưu', hái từ đỉnh Cô Vân ngàn năm tuyết phủ." Nàng mỉm cười, đôi mắt trong veo như làn nước mùa thu khẽ chớp: "Nghe đồn năm xưa Lâm Lão Tiên Sinh lúc còn tại thế, mỗi lần ghé Thiên Cơ Cốc đều cùng gia sư phẩm thứ trà này thâu đêm. Đáng tiếc... người xưa đã khuất, cảnh cũ đổi thay."

Lâm Tiêu ngồi ngay ngắn đối diện, hai tay nâng chén trà nhưng không hề nhấp môi. 

Ánh mắt hắn dừng lại nơi cổ tay ngọc ngà của nữ tử đối diện. Nơi đó, một chiếc vòng ngọc thanh âm đang khẽ rung động với tần số cực nhỏ, mỗi nhịp rung đều đồng điệu kỳ lạ với huyết mạch đang chảy trong lồng ngực hắn.

Hắn cười nhạt, thanh âm bình thản không chút gợn sóng: "Bạch cô nương quá lời rồi. Phụ thân ta chỉ là một kiếm tu thô kệch, quanh năm bầu bạn cùng gió cát nơi biên thùy, làm sao có diễm phúc hiểu được phong vị trà đạo cao nhã của quý cốc? Thứ mà người để lại cho tại hạ, ngoài thanh kiếm cùn này ra... cũng chỉ có vài khoản nợ ân oán chưa trả mà thôi."

Bạch Vũ Thiền khựng lại nửa nhịp, ngón tay ngọc siết nhẹ quai ấm. Nụ cười trên môi nàng vẫn dịu dàng, nhưng một tia tinh mang sắc lạnh tựa hàn băng đã vụt lóe trong đáy mắt sâu thẳm.`,
    confidenceIndex: 94,
    authorRating: 5,
    authorCritique: 'Đối thoại xuất sắc, câu từ tao nhã nhưng áp lực tâm lý cực kỳ nặng đô! Phản ánh đúng chuẩn phong thái Tiên gia thượng lưu.',
    selfLearningInsights: [
      'Quy tắc dùng đối thoại ngoại cảnh để che giấu cuộc thăm dò sinh tử.',
      'Chi tiết đạo cụ phụ trợ (chiếc vòng rung động) làm tăng tính thuyết phục của suy diễn.'
    ],
    appliedAxiomIds: ['axiom_02_villain_depth', 'axiom_04_dialogue_subtext'],
    isReinforced: true
  }
];

export const INITIAL_NEURAL_LEARNING_STATE: NeuralSelfLearningState = {
  currentEpoch: 4,
  totalInferencesRun: 28,
  qualityScoreAvg: 4.88,
  learningRate: 0.12,
  weights: INITIAL_NEURAL_WEIGHTS,
  activeAxioms: PRESET_LEARNED_AXIOMS,
  inferenceRecords: PRESET_INFERENCE_RECORDS,
  evolutionLog: [
    {
      epoch: 1,
      timestamp: 'Khởi thủy mạng thần kinh',
      trigger: 'Huấn luyện cơ bản mạng lan truyền xuôi',
      qualityGain: 0.45,
      summary: 'Khởi tạo nơ-ron nhận thức nhân quả và thiết lập quy tắc khắc chế cường địch 3 mắt xích.'
    },
    {
      epoch: 2,
      timestamp: 'Đợt học tập sâu 02',
      trigger: 'Hồi quy phân tích 12 mẫu xung đột phản diện',
      qualityGain: 0.32,
      summary: 'Tự học tam trọng nghịch lý tâm lý phản diện và định luật bảo toàn nghiệp lực linh bảo.'
    },
    {
      epoch: 3,
      timestamp: 'Đợt tối ưu hóa bút lực 03',
      trigger: 'Đánh giá phản hồi độc giả về nhịp truyện',
      qualityGain: 0.28,
      summary: 'Tích hợp quy tắc nhịp thở âm dương tĩnh - động và nghệ thuật văn thể ẩn ngữ trong đối thoại tiên hiệp.'
    },
    {
      epoch: 4,
      timestamp: 'Tích hợp quy luật bước ngoặt 04',
      trigger: 'Tự động rút trích tiên đề từ các suy diễn phá án',
      qualityGain: 0.19,
      summary: 'Thẩm thấu quy tắc bước ngoặt 3 lớp (dấu vết mờ -> ngộ nhận giả -> chân tướng rung động).'
    }
  ]
};
