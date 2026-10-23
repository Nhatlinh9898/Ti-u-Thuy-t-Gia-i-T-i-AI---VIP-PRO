import { MasterCultivationStage, NovelMasterSpinePlan } from '../types';

export const PRESET_MASTER_CULTIVATION_SPINE: MasterCultivationStage[] = [
  {
    id: 'spine_stage_1',
    stageOrder: 1,
    stageName: 'Phàm Trần Luyện Thể & Dẫn Khí (Sơ Khởi)',
    realmTierTitle: 'Phàm Nhân ➜ Thối Thể (Cửu Trọng) ➜ Luyện Khí (1-9 Tầng)',
    lifespanSpan: '80 - 150 tuổi',
    bodyTempering: {
      stageTitle: 'Bách Luyện Huyết Khí & Đồng Bì Thiết Cốt',
      meridianTransformation: 'Khai thông thập nhị chính kinh, thanh lọc độc tố phàm tục, đả thông khiếu huyệt cơ bản.',
      boneAndMarrowRefinement: 'Ngâm mình linh dược, rèn gân cốt như thép nguội, màng da cứng như da trâu chịu đao kiếm thường.',
      sensoryAura: 'Hơi thở dài dặn, khí huyết bốc lên đỉnh đầu như khói trắng, ánh mắt sáng có thần quang mỏng.'
    },
    swordDao: {
      stageTitle: 'Bách Bộ Phi Kiếm & Kiếm Mang Sơ Khởi',
      swordIntentTier: 'Kiếm Thuật Tinh Thông ➜ Kiếm Mang Nhất Xích (Thấu thiết đoạn kim)',
      flyingSwordOrBladeArt: 'Ngự kiếm trong phạm vi mười trượng, chém rụng lá cây bay trong gió.',
      combatApplication: 'Lấy khí ngự kiếm, kiếm chiêu sắc bén gọn gàng, tấn công điểm yếu tử huyệt.'
    },
    spellDao: {
      spellTier: 'Sơ Giai Ngũ Hành Pháp Thuật',
      representativeSpells: ['Hỏa Cầu Thuật', 'Phong Nhận Thuật', 'Thủy Thuẫn Thuật', 'Địa Thứ Thuật'],
      chantAndMudras: 'Kết xuất tam tự chân ngôn cùng lưỡng thủ dẫn linh ấn (mất 2-3 nhịp thở để ngưng tụ pháp lực).'
    },
    talismanDao: {
      grade: 'Nhất Phẩm Hoàng Chỉ Chu Sa Phù',
      typicalTalismans: ['Tật Phong Phù (Tăng tốc)', 'Kim Cương Phù (Hộ thể)', 'Liệt Diễm Phù (Nổ lửa)', 'Trừ Tà Phù'],
      drawingPrinciple: 'Dùng lông linh miêu dẫn chu sa hòa máu yêu thú, hạ bút liền mạch không được ngắt quãng một hơi.'
    },
    pillAndAlchemy: {
      essentialPills: ['Tẩy Tủy Đan', 'Hồi Khí Đan', 'Ích Khí Tán', 'Thối Thể Cao'],
      furnaceAndHerbRequirement: 'Đồng đỉnh phàm hỏa hoặc địa hỏa than củi; linh thảo niên đại 10 - 50 năm.'
    },
    treasureAndArmament: {
      gearTier: 'Bách Luyện Tinh Thiết Binh ➜ Hạ Phẩm Pháp Khí',
      materialsNeeded: ['Thanh Cương Thiết', 'Huyền Thiết Sa', 'Gân Lang Thú Nhất Giai']
    },
    socialAndSectLevel: {
      factionTier: 'Gia Tộc Phàm Trần ➜ Phụ Dung Ngoại Vi Tông Môn Cửu Lưu',
      hierarchyStatus: 'Tạp dịch đệ tử / Ngoại môn ký danh / Thiếu gia gia tộc suy tàn',
      territoryRealm: 'Thôn xóm, thành thị phàm trần, chân núi Tiên sơn môn phái'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Chỉ nghe truyền thuyết xa xưa về Thần Phật trong miếu hoang rách nát.',
      cosmicEpochMemory: 'Hoàn toàn không biết, xem nhật nguyệt luân chuyển là quy luật hiển nhiên của trời đất.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Kinh Mạch Bế Tắc & Huyết Khí Phản Phệ Kiếp',
      heartDemonSymptom: 'Chán nản tuyệt vọng khi bị người sỉ nhục, ám ảnh thân phận phàm nhân thấp hèn.',
      mortalityRisk: 'Đứt đoạn kinh mạch, trở thành phế nhân tàn tật suốt đời nếu cưỡng ép xung phá thất bại.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 1 ➜ Chương 40',
      narrativeRole: 'Gốc rễ xuất thân, tích lũy nội hàm, vạch mặt kẻ hèn hạ, mở ra kỳ ngộ định mệnh.',
      coreConflict: 'Gia tộc tranh đoạt tài nguyên, bị đệ tử quý tộc khinh khi chèn ép, tranh suất vào tông môn.',
      protagonistGoal: 'Sống sót khỏi mưu sát, chữa lành thương tật, tiến nhập tông môn tu tiên chân chính.',
      archetypalAntagonists: ['Gia nô ỷ thế hiếp người', 'Đường huynh ghen ghét', 'Chấp sự ngoại môn tham lam'],
      incitingIncidentTemplate: 'Nhặt được tàn ngọc/chiếc nhẫn rỉ sét trong đống đổ nát, kích hoạt huyết mạch thần bí.',
      dramaticCrucible: 'Bị đày vào mỏ quặng quỷ dị hoặc Kiếm Trủng hoang vu chịu đựng tra tấn.',
      breakthroughMomentum: 'Thời khắc tuyệt cảnh ngộ ra ý cảnh sơ khai, chém rụng đòn tập kích của kẻ địch mạnh hơn.',
      mapTransitionTrigger: 'Đoạt giải quán quân tỉ thí ngoại môn, nhận lệnh bài tiến vào nội sơn sâu thẳm.',
      sceneWritingPrompts: [
        'Đêm mưa gió rách nát trong thạch thất, máu nhỏ vào cổ ngọc kích hoạt ánh sáng huyền bí.',
        'Mũi kiếm rỉ sét đâm xuyên qua cổ họng tên chấp sự ngạo mạn trước sự ngỡ ngàng của đám đông.'
      ]
    }
  },
  {
    id: 'spine_stage_2',
    stageOrder: 2,
    stageName: 'Đúc Đạo Cơ & Khí Hải Hóa Dịch (Tiến Giai)',
    realmTierTitle: 'Trúc Cơ Kỳ (Sơ Kỳ ➜ Trung Kỳ ➜ Hậu Kỳ ➜ Viên Mãn)',
    lifespanSpan: '200 - 300 tuổi',
    bodyTempering: {
      stageTitle: 'Linh Tủy Hoán Cốt & Ngũ Tạng Lưu Quang',
      meridianTransformation: 'Linh khí khí thái ngưng kết thành giọt chất lỏng, mở rộng đan điền thành Khí Hải mênh mông.',
      boneAndMarrowRefinement: 'Tủy xương sinh ra linh huyết tinh khiết, bài trừ tạp chất tủy não, lục phủ ngũ tạng được linh dịch gột rửa.',
      sensoryAura: 'Thần thanh khí sảng, da dẻ như ngọc ấm, tỏa ra mùi linh hương nhàn nhạt.'
    },
    swordDao: {
      stageTitle: 'Kiếm Khí Như Tơ & Kiếm Cương Hộ Thể',
      swordIntentTier: 'Ngưng Cương Hóa Kiếm ➜ Kiếm Ý Nhập Môn (Trọng kiếm vô phong)',
      flyingSwordOrBladeArt: 'Ngự kiếm ngàn dặm lấy thủ cấp, kiếm quang hóa thành cầu vồng rực rỡ xé toạc tầng mây.',
      combatApplication: 'Kiếm khí dệt thành mạng nhện phong tỏa không gian, kiếm cương cứng cáp chém vỡ pháp khí.'
    },
    spellDao: {
      spellTier: 'Trung Giai Ngũ Hành & Lôi Hỏa Bí Thuật',
      representativeSpells: ['Tử Tiêu Dẫn Lôi Chú', 'Địa Hỏa Phần Thiên Trận', 'Băng Phách Huyền Khiên', 'Vạn Kiếm Quy Tông Sơ Thức'],
      chantAndMudras: 'Tụng niệm chân ngôn trong lòng kết hợp kiếm chỉ, phóng thích thuật pháp trong nửa nhịp thở.'
    },
    talismanDao: {
      grade: 'Nhị Phẩm Lam Bút Linh Bì Phù',
      typicalTalismans: ['Thiên Lôi Phù', 'Định Thân Phù', 'Độn Địa Phù', 'Ẩn Tức Huyền Phù'],
      drawingPrinciple: 'Dùng da linh thú nhị giai và huyết dịch lôi đình, quán chú thần niệm vào từng nét vẽ phù văn.'
    },
    pillAndAlchemy: {
      essentialPills: ['Trúc Cơ Đan', 'Chân Nguyên Đan', 'Tụ Linh Hoàn', 'Bồi Nguyên Đan'],
      furnaceAndHerbRequirement: 'Huyền Thiết Linh Đỉnh, dẫn xuất Địa Mạch Chân Hỏa; dược thảo trăm năm tuổi.'
    },
    treasureAndArmament: {
      gearTier: 'Trung Phẩm & Thượng Phẩm Linh Khí',
      materialsNeeded: ['Canh Kim Sa', 'Xích Đồng Tinh', 'Yêu Đan Nhị Giai Đỉnh Phong']
    },
    socialAndSectLevel: {
      factionTier: 'Tông Môn Bát Phẩm - Lục Phẩm',
      hierarchyStatus: 'Nội môn đệ tử chính thức / Chân truyền dự bị / Thủ lĩnh phân đà',
      territoryRealm: 'Núi non linh mạch tông môn, tiên phường thành thị trăm vạn người'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Cảm nhận được linh cảm thiên địa xa xăm, chạm vào bia đá cổ ngữ có khắc hình Thần Ma.',
      cosmicEpochMemory: 'Cảm ứng vi tế với mảnh vỡ tàn tích cổ đại chôn vùi dưới lòng đất.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Nhị Cửu Tiểu Lôi Kiếp hoặc Huyết Khí Nghịch Lưu Kiếp',
      heartDemonSymptom: 'Sợ hãi thọ nguyên cạn kiệt, ghen tị với thiên kiêu có bối cảnh thần thánh.',
      mortalityRisk: 'Khí hải nổ tung, đan điền rách nát, tu vi sụt giảm vĩnh viễn về Luyện Khí nếu thất bại.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 41 ➜ Chương 120',
      narrativeRole: 'Rời núi lịch luyện, thám hiểm bí cảnh thượng cổ, gây thù chuốc oán với thế lực lớn, danh chấn bát phương.',
      coreConflict: 'Tranh đoạt Trúc Cơ Đan và cơ duyên bí cảnh, bị đại gia tộc hoặc tông môn đối nghịch truy sát.',
      protagonistGoal: 'Đúc thành Thiên Đạo Trúc Cơ vô thượng, không chấp nhận Địa phẩm hay Phàm phẩm cơ sở.',
      archetypalAntagonists: ['Thiếu tông chủ ngạo mạn', 'Trưởng lão tông môn biến chất', 'Tán tu ma đạo hung ác'],
      incitingIncidentTemplate: 'Bí cảnh vạn năm mở ra, toàn bộ môn phái phái đệ tử tinh anh vào sinh tử đoạt bảo.',
      dramaticCrucible: 'Bị đồng môn phản bội đâm lén sau lưng ở vực sâu tử địa, rơi vào truyền thừa cổ xưa.',
      breakthroughMomentum: 'Dùng khí tức của Hỗn Độn để dung hợp ngũ hành, ngưng tụ giọt chân nguyên tinh khiết nhất.',
      mapTransitionTrigger: 'Bị đại năng thế lực truy nã, cưỡng ép sử dụng truyền tống trận cổ đại vượt sang đại vực khác.',
      sceneWritingPrompts: [
        'Đứng giữa đài phong lôi đón nhận tia sét giáng xuống, linh dịch trong bụng xoay tròn như lốc xoáy rực rỡ.',
        'Nhát kiếm vắt ngang chân trời xé toạc chiến hạm của kẻ truy sát trước sự kinh hãi của vạn người.'
      ]
    }
  },
  {
    id: 'spine_stage_3',
    stageOrder: 3,
    stageName: 'Ngưng Kết Kim Đan & Đại Đạo Đan Văn (Đại Thành)',
    realmTierTitle: 'Kim Đan Kỳ (Cửu Phẩm Đan ➜ Cực Phẩm Cửu Chuyển Hoàng Kim Đan)',
    lifespanSpan: '500 - 800 tuổi (Xưng hiệu Chân Nhân)',
    bodyTempering: {
      stageTitle: 'Bất Bại Kim Thân & Linh Hồn Thai Hóa',
      meridianTransformation: 'Toàn bộ khí hải cô đọng lại thành một viên Kim Đan tròn trịa lấp lánh như mặt trời nhỏ trong đan điền.',
      boneAndMarrowRefinement: 'Cốt cách chuyển sang màu vàng nhạt hoặc tử kim, đao thương bất nhập, chống chịu được dị hỏa thiêu đốt.',
      sensoryAura: 'Kim quang hộ thể tỏa ra trăm trượng, áp bức thần uy khiến tu sĩ Trúc Cơ không dám nhìn thẳng.'
    },
    swordDao: {
      stageTitle: 'Kiếm Khí Hóa Hình & Kiếm Ý Thực Thể Hóa',
      swordIntentTier: 'Đại Viên Mãn Kiếm Ý (Ý Cảnh Hóa Vực)',
      flyingSwordOrBladeArt: 'Vạn kiếm triều bái, ý niệm động một cái là ngàn vạn thanh hư kiếm hiển hóa giết địch.',
      combatApplication: 'Kiếm vực bao trùm ngàn trượng, vạn vật trong vực đều chịu sự chi phối của sát phạt kiếm đạo.'
    },
    spellDao: {
      spellTier: 'Đại Thông Thần Cấp Thuật Pháp',
      representativeSpells: ['Ngũ Hành Thần Quang Sơ Thể', 'Cửu Thiên Huyền Lôi Trận', 'Di Sơn Đảo Hải Thuật'],
      chantAndMudras: 'Thuật pháp thuấn phát bằng thần niệm, kết ấn trong nháy mắt tạo thành thiên địa dị tượng.'
    },
    talismanDao: {
      grade: 'Tam Phẩm Tử Phù & Đan Hỏa Luyện Chế',
      typicalTalismans: ['Thiên Cương Bắc Đẩu Phù', 'Tam Muội Chân Hỏa Phù', 'Vạn Kiếm Sát Trận Phù'],
      drawingPrinciple: 'Dùng bút ngọc khắc linh văn lên da yêu thú tam giai, rót Kim Đan chân hỏa vào đạo triện.'
    },
    pillAndAlchemy: {
      essentialPills: ['Kim Đan Vạn Thọ Đan', 'Cửu Chuyển Hồi Dương Đan', 'Hóa Anh Đan chuẩn bị'],
      furnaceAndHerbRequirement: 'Bảo Khí Linh Đỉnh, dẫn hỏa linh mạch sâu ba ngàn trượng; dược thảo ngàn năm.'
    },
    treasureAndArmament: {
      gearTier: 'Cực Phẩm Linh Khí ➜ Bản Mệnh Bảo Khí',
      materialsNeeded: ['Thái Ất Canh Kim', 'Bắc Hải Trầm Thiết', 'Huyền Hoàng Chi Khí']
    },
    socialAndSectLevel: {
      factionTier: 'Tông Môn Ngũ Phẩm - Tứ Phẩm',
      hierarchyStatus: 'Chấp sự đường khẩu / Trưởng lão ngoại môn / Thiếu chủ chân truyền',
      territoryRealm: 'Trấn thủ một phương thành trì, chưởng quản mỏ linh thạch ngàn dặm'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Có thể giao tiếp với tàn niệm của Thần Ma trong cổ tích, nhận được Thần Lệnh lệnh bài.',
      cosmicEpochMemory: 'Hiểu được khái niệm về Đại Kiếp Thần Ma và sự tan vỡ của giới diện thượng cổ.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Tam Cửu Thiên Kiếp (Hai mươi bảy đạo Lôi Kiếp phá hủy kim đan)',
      heartDemonSymptom: 'Tâm ma tạo thành huyễn cảnh người thân qua đời hoặc cảnh ngộ bị lăng nhục lúc hàn vi.',
      mortalityRisk: 'Đan vỡ người vong, thân thể hóa thành tro bụi nếu đạo tâm bất ổn dưới lôi đình.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 121 ➜ Chương 260',
      narrativeRole: 'Bước lên đỉnh cao của bậc trung lưu, khai tông lập phái chi nhánh, đối đầu cự đầu ma đạo, giải mã thân thế.',
      coreConflict: 'Tông môn đại chiến sinh tử, dị tộc xâm lấn, tranh đoạt quyền sở hữu đại hình linh mạch.',
      protagonistGoal: 'Ngưng tụ Cửu Chuyển Kim Đan vô hạ, vả mặt các thiên tài thượng tông kiêu ngạo.',
      archetypalAntagonists: ['Ngụy quân tử đại trưởng lão', 'Ma tu luyện huyết đan ngàn mạng', 'Cổ tộc hoàng tử'],
      incitingIncidentTemplate: 'Đại chiến tông môn nổ ra, sơn môn sụp đổ, nhân vật chính đứng ra làm trụ cột lật ngược thế cờ.',
      dramaticCrucible: 'Đối mặt với huyết sát đại trận vây hãm mười ngày mười đêm, cạn kiệt đan dược chỉ còn ý chí kiên định.',
      breakthroughMomentum: 'Đột phá giữa lôi kiếp, dùng thiên lôi tôi luyện Kim Đan thành màu hoàng kim bất tử.',
      mapTransitionTrigger: 'Phi thăng hoặc bước qua Không Gian Liệt Phùng tiến vào Cửu Châu Trung Vực rộng lớn gấp ngàn lần.',
      sceneWritingPrompts: [
        'Viên đan tròn rực rỡ bay ra khỏi đỉnh đầu, chín đạo đan văn kim sắc tỏa hào quang xua tan bóng tối mười dặm.',
        'Một kiếm chém đôi cự hạm ma tông, vạn tên đệ tử đối phương phủ phục run rẩy gọi danh hiệu Chân Nhân.'
      ]
    }
  },
  {
    id: 'spine_stage_4',
    stageOrder: 4,
    stageName: 'Phá Đan Sinh Anh & Thần Niệm Thông Thiên (Tông Sư)',
    realmTierTitle: 'Nguyên Anh Kỳ (Sơ Kỳ ➜ Hậu Kỳ ➜ Đại Viên Mãn Đạo Quân)',
    lifespanSpan: '1,500 - 3,000 tuổi',
    bodyTempering: {
      stageTitle: 'Pháp Tướng Chi Thân & Đoạt Xá Trọng Sinh Chi Lực',
      meridianTransformation: 'Kim đan nứt vỡ sinh ra một hài nhi nhỏ bằng nắm tay giống hệt nhân vật chính, ngồi xếp bằng trên đan điền.',
      boneAndMarrowRefinement: 'Thân xác hóa thành bán năng lượng thể, có thể xé rách không gian ngắn ngủi, nhục thân nát thì Nguyên Anh thoát xác bay đi.',
      sensoryAura: 'Pháp tướng hiển hóa trăm trượng sau lưng, ánh mắt mở ra có lôi đình chớp giật.'
    },
    swordDao: {
      stageTitle: 'Kiếm Đạo Tâm Linh & Hư Không Kiếm Trận',
      swordIntentTier: 'Tâm Kiếm Cảnh Giới (Kiếm tại tâm trung, cỏ cây cát đá đều là kiếm)',
      flyingSwordOrBladeArt: 'Kiếm trận Tru Tiên sơ giải, ngàn kiếm bay lượn kết thành không gian phong tỏa sinh tử.',
      combatApplication: 'Chém vào thần hồn đối phương, cách ngàn dặm chém đầu Nguyên Anh kẻ địch.'
    },
    spellDao: {
      spellTier: 'Đại Pháp Thông Thiên & Thiên Địa Quy Tắc Vận Dụng',
      representativeSpells: ['Ngũ Hành Thần Quang Hoàn Chỉnh', 'Hư Không Na Di Thuật', 'Đại La Kim Thân Trượng'],
      chantAndMudras: 'Khẩu ngậm thiên hiến, một câu nói biến thành pháp tắc áp chế vạn vật xung quanh.'
    },
    talismanDao: {
      grade: 'Tứ Phẩm Kim Sắc Hư Không Phù',
      typicalTalismans: ['Hư Không Na Di Phù', 'Trấn Ma Định Phách Phù', 'Đại Cửu Thiên Lôi Phù'],
      drawingPrinciple: 'Dùng ngón tay vẽ bùa giữa hư không, lấy linh khí trời đất làm giấy mực, bùa chú ngưng tụ không tan.'
    },
    pillAndAlchemy: {
      essentialPills: ['Cửu Khiếu Thiên Linh Đan', 'Hóa Thần Đan', 'Bất Tử Hồi Hồn Đan'],
      furnaceAndHerbRequirement: 'Cổ Đỉnh Viễn Cổ, Địa Hỏa Cửu U; linh dược ba ngàn năm tuổi.'
    },
    treasureAndArmament: {
      gearTier: 'Thông Thiên Linh Bảo / Cổ Bảo Viễn Cổ',
      materialsNeeded: ['Thái Hư Thần Thiết', 'Hỗn Độn Chi Tinh', 'Yêu Đan Yêu Vương Tứ Giai']
    },
    socialAndSectLevel: {
      factionTier: 'Tông Môn Tam Phẩm - Nhị Phẩm / Đại Vực Hùng Bá',
      hierarchyStatus: 'Thủ tọa một phong / Trưởng lão chấp pháp tối cao / Hộ quốc chân quân đế quốc',
      territoryRealm: 'Thống trị cả một châu phủ, có đệ tử môn nhân hàng vạn người'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Nghe được tiếng thì thầm của Thần Ma cổ xưa qua các vết rạn nứt không gian.',
      cosmicEpochMemory: 'Cảm nhận được bia mộ chư thần rải rác trong các giới diện cấm địa.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Lục Cửu Phong Hỏa Lôi Kiếp (Năm mươi tư đạo lôi kiếp cùng U Minh Cương Phong)',
      heartDemonSymptom: 'Nguyên Anh bị tâm ma phân hóa thành song sinh tà ác, dụ dỗ nhập ma đạo đồ sát vạn linh.',
      mortalityRisk: 'Nguyên Anh tan rã thành hư vô, vĩnh viễn không thể siêu sinh nếu tâm ma đoạt quyền kiểm soát.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 261 ➜ Chương 450',
      narrativeRole: 'Đứng vào hàng ngũ cường giả trấn áp một phương, tham gia tranh đoạt thần khí viễn cổ, mở ra đại chiến chư giới.',
      coreConflict: 'Tranh đoạt suất thăng thiên, phong ấn cổ ma sắp phá cấm, xung đột sinh tử giữa các đại thánh địa.',
      protagonistGoal: 'Bảo vệ đạo thống và tri kỷ, phá tan âm mưu phong tỏa con đường tu tiên của Thiên Thần.',
      archetypalAntagonists: ['Thánh địa Thái thượng trưởng lão', 'Cổ Ma Vương phá phong', 'Thiên Đế thần sứ'],
      incitingIncidentTemplate: 'Cấm địa Thượng Cổ Thần Mộ nứt toác, chư thiên cự đầu đồng loạt xuất quan tranh đoạt linh bảo.',
      dramaticCrucible: 'Nhục thân bị kẻ địch đánh nát, Nguyên Anh ôm bản mệnh kiếm bay vào cấm địa sinh tử ngàn năm.',
      breakthroughMomentum: 'Tái tạo nhục thân từ Hỗn Độn Linh Nê, Nguyên Anh mở mắt thức tỉnh đạo văn vĩnh cửu.',
      mapTransitionTrigger: 'Xé toạc giới bích hạ giới, phi thăng tiến nhập Trung Thiên Thế Giới hoặc Vực Ngoại Tinh Không.',
      sceneWritingPrompts: [
        'Hài nhi Nguyên Anh ngồi xếp bằng trên đài sen ngũ sắc, hé mở đôi mắt phóng ra hai luồng thần quang đâm thủng trời cao.',
        'Một tiếng quát vang rền xé nát đại trận bảo hộ hoàng thành, mười vạn đại quân quy phục trước uy danh Đạo Quân.'
      ]
    }
  },
  {
    id: 'spine_stage_5',
    stageOrder: 5,
    stageName: 'Nguyên Thần Xuất Khiếu & Thiên Địa Hợp Nhất (Cực Cảnh)',
    realmTierTitle: 'Hóa Thần Kỳ ➜ Luyện Hư Kỳ (Thiên Tôn & Đạo Tôn)',
    lifespanSpan: '5,000 - 15,000 tuổi',
    bodyTempering: {
      stageTitle: 'Thần Thể Hóa Đạo & Bất Diệt Kim Thể',
      meridianTransformation: 'Nguyên Anh lột xác thành Nguyên Thần bất diệt, có thể xuất khiếu du ngoạn cửu tiêu vạn dặm chỉ trong chớp mắt.',
      boneAndMarrowRefinement: 'Xương thịt hòa quyện cùng pháp tắc hư không, giọt máu có thể làm sống lại ngọn núi khô cằn.',
      sensoryAura: 'Thiên địa đồng thanh ca tụng khi bước đi, hoa sen vàng mọc dưới chân, mây lành che phủ mười vạn dặm.'
    },
    swordDao: {
      stageTitle: 'Kiếm Đạo Quy Tắc & Vô Ngã Kiếm Cực',
      swordIntentTier: 'Đạo Cảnh Kiếm Ý (Một kiếm sinh vạn vật, một kiếm diệt vạn pháp)',
      flyingSwordOrBladeArt: 'Kiếm không còn là kiếm hữu hình, mà là một đạo quy tắc sát phạt tối cao của trời đất.',
      combatApplication: 'Chém đứt thọ mệnh đối phương, chém đứt nhân quả ràng buộc giữa kẻ địch và gia tộc.'
    },
    spellDao: {
      spellTier: 'Đại Thần Thông Quy Tắc & Cấm Thuật Nghịch Thiên',
      representativeSpells: ['Thời Gian Tĩnh Chỉ Sơ Giai', 'Đại Hoang Phần Thiên Chỉ', 'Hỗn Độn Thần Lôi Chú'],
      chantAndMudras: 'Không cần niệm chú hay kết ấn, tâm niệm vừa động là tinh hà đổi dời.'
    },
    talismanDao: {
      grade: 'Ngũ Phẩm Thần Đạo Đạo Triện',
      typicalTalismans: ['Thời Gian Trệ Lược Phù', 'Vạn Giới Khai Thiên Phù', 'Cửu U Phong Thần Phù'],
      drawingPrinciple: 'Dùng tinh quang ngân hà và hư không pháp tắc làm chất dẫn, khắc trực tiếp vào quy tắc thiên địa.'
    },
    pillAndAlchemy: {
      essentialPills: ['Quy Tắc Ngộ Đạo Đan', 'Đại La Tụ Hồn Đan', 'Bất Diệt Trường Sinh Đan'],
      furnaceAndHerbRequirement: 'Đạo Khí Thần Đỉnh, Thái Dương Chân Hỏa; thần thảo vạn năm tuổi.'
    },
    treasureAndArmament: {
      gearTier: 'Đạo Khí / Chuẩn Đế Binh (Uẩn dưỡng khí linh độc lập)',
      materialsNeeded: ['Thái Sơ Thần Thạch', 'Long Tủy Hỗn Độn', 'Tinh Thần Thiết Vực Ngoại']
    },
    socialAndSectLevel: {
      factionTier: 'Bất Hủ Thánh Địa / Đạo Thống Thái Cổ',
      hierarchyStatus: 'Thái Thượng Lão Tổ / Khai phái tổ sư truyền kỳ / Thần hoàng cổ quốc',
      territoryRealm: 'Thống ngự cả một đại lục hoặc tinh vực bao la'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Có thể đối thoại bình đẳng với các Thượng Cổ Thần Linh đang say ngủ.',
      cosmicEpochMemory: 'Nhìn thấy vết tích trận chiến chém giết Thần Ma thời Kỷ Nguyên Hồng Hoang.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Cửu Cửu Đại Thiên Kiếp (Tám mươi mốt đạo Lôi Kiếp Tử Tiêu)',
      heartDemonSymptom: 'Tâm ma Thiên Đạo: Cảm giác hư vô cô độc của kẻ sống vạn năm nhìn người thân lần lượt qua đời.',
      mortalityRisk: 'Đạo tiêu ma vẫn, hóa thành mưa linh khí trả lại cho thiên địa nếu không vượt qua kiếp nạn.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 451 ➜ Chương 750',
      narrativeRole: 'Thống lĩnh liên minh chư thiên, nghênh chiến đại kiếp diệt thế, thám hiểm Thần Vực và di tích khai thiên.',
      coreConflict: 'Đại kiếp ma triều vạn cổ giáng lâm, quy tắc thiên địa bị bóp méo bởi hắc thủ sau màn.',
      protagonistGoal: 'Phá vỡ gông cùm tuổi thọ của thế giới, tìm kiếm con đường trường sinh chân chính cho nhân tộc.',
      archetypalAntagonists: ['Hắc thủ giấu mặt thao túng luân hồi', 'Cổ Thần tà hóa', 'Chúa tể dị giới xâm lược'],
      incitingIncidentTemplate: 'Mặt trời bị hắc ám nuốt chửng, vạn vực rên xiết, tiếng chuông cổ chung vang lên triệu tập chư tôn.',
      dramaticCrucible: 'Một mình trấn thủ cửa ải biên giới chống lại hàng triệu ma quân dị tộc để bảo vệ hậu phương.',
      breakthroughMomentum: 'Đốn ngộ ra đạo riêng của bản thân: Không thuận theo Thiên Đạo mà nghịch thiên khai sáng quy tắc mới.',
      mapTransitionTrigger: 'Bước vào Tinh Không Cổ Lộ dẫn tới Thượng Giới hoặc Tiên Vực xa xôi.',
      sceneWritingPrompts: [
        'Bước ra khỏi hư không, một bàn tay khổng lồ từ trên mây chụp xuống bóp nát thần sơn ngàn trượng của đại địch.',
        'Nguyên Thần xuất khiếu hóa thành cự nhân cao ngàn trượng đứng giữa vũ trụ nhìn ngắm các vì sao xoay vần.'
      ]
    }
  },
  {
    id: 'spine_stage_6',
    stageOrder: 6,
    stageName: 'Đạo Thể Hợp Nhất & Vạn Giới Đại Thừa (Thần Thánh)',
    realmTierTitle: 'Hợp Thể Kỳ ➜ Đại Thừa Kỳ ➜ Chuẩn Tiên / Bán Thần',
    lifespanSpan: '50,000 - 100,000 tuổi',
    bodyTempering: {
      stageTitle: 'Hỗn Độn Thần Thể & Vĩnh Hằng Bất Diệt Cốt',
      meridianTransformation: 'Nhục thân và Nguyên Thần hoàn toàn dung hợp làm một, tạo thành Hỗn Độn Đạo Thể không tì vết.',
      boneAndMarrowRefinement: 'Từng tế bào chứa đựng một thế giới nhỏ, một sợi tóc có thể chém đứt tinh tú.',
      sensoryAura: 'Quanh thân có chư thiên tinh tú xoay quanh, hào quang rực rỡ chiếu rọi ba ngàn đại thế giới.'
    },
    swordDao: {
      stageTitle: 'Trảm Tinh Thần Đạo & Kiếm Phá Cửu U',
      swordIntentTier: 'Quy Tắc Sát Phạt Tối Cao (Kiếm Khai Thiên Môn)',
      flyingSwordOrBladeArt: 'Một kiếm chém ra chia cắt âm dương, xé rách ranh giới giữa sự sống và cái chết.',
      combatApplication: 'Chém đứt quy tắc tái sinh của kẻ địch, khiến đối thủ vĩnh viễn không thể hồi sinh.'
    },
    spellDao: {
      spellTier: 'Đại La Tiên Thuật & Nghịch Chuyển Càn Khôn',
      representativeSpells: ['Hoán Chuyển Tinh Đẩu', 'Thời Gian Nghịch Lưu', 'Vạn Pháp Quy Tông Đại Diệt Tuyệt'],
      chantAndMudras: 'Ý niệm là pháp, ngôn từ là đạo luật của vũ trụ.'
    },
    talismanDao: {
      grade: 'Lục Phẩm Tiên Thiên Đạo Phù',
      typicalTalismans: ['Tiên Thiên Nhất Khí Phù', 'Luân Hồi Nghịch Chuyển Phù', 'Trấn Giới Bất Hủ Phù'],
      drawingPrinciple: 'Dùng chính huyết mạch Hỗn Độn vẽ bùa, phong ấn cả một tiểu thế giới vào trong đạo phù.'
    },
    pillAndAlchemy: {
      essentialPills: ['Cửu Chuyển Tiên Đan', 'Khai Thiên Tích Địa Hoàn', 'Niết Bàn Thần Đan'],
      furnaceAndHerbRequirement: 'Hỗn Độn Tạo Hóa Đỉnh; dược thảo từ thuở khai thiên lập địa.'
    },
    treasureAndArmament: {
      gearTier: 'Cực Đạo Đế Binh / Thần Binh Viễn Cổ',
      materialsNeeded: ['Hỗn Độn Nguyên Thạch', 'Huyền Hoàng Mẫu Khí', 'Thần Huyết Khai Thiên']
    },
    socialAndSectLevel: {
      factionTier: 'Chí Tôn Cổ Tộc / Vạn Vực Minh Chủ',
      hierarchyStatus: 'Chí Tôn Đạo Tổ / Đại Đế tái thế / Thần thoại sống giữa nhân gian',
      territoryRealm: 'Chưởng quản Cửu Thiên Thập Địa, vạn tộc triều bái dâng cống phẩm'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Kế thừa tước vị của các vị Thần Linh Viễn Cổ, nhận Thần Cách chính thức.',
      cosmicEpochMemory: 'Chứng kiến toàn bộ ký ức của Kỷ Nguyên Khai Thiên Lập Địa.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Hỗn Độn Thần Ma Hủy Diệt Kiếp & Thiên Đạo Đố Kỵ Kiếp',
      heartDemonSymptom: 'Bị ý chí Thiên Đạo xâm nhập đồng hóa, có nguy cơ đánh mất nhân tính biến thành cỗ máy vô cảm.',
      mortalityRisk: 'Bị Thiên Đạo nuốt chửng trở thành một phần của quy tắc vận hành vũ trụ.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 751 ➜ Chương 1100',
      narrativeRole: 'Đại chiến chư thần, lật đổ trật tự cũ của Thiên Đạo Thần Tộc, cứu rỗi vạn linh khỏi diệt vong.',
      coreConflict: 'Thiên Đạo giáng hạ mạt pháp diệt thế để gặt hái linh khí; chư thánh hợp sức phản kháng.',
      protagonistGoal: 'Dùng sức một người gánh vác số mệnh vạn tộc, mở ra con đường sống giữa tuyệt lộ.',
      archetypalAntagonists: ['Thiên Đạo Ý Chí biến chất', 'Chúa Tể Thần Tộc bất tử', 'Kẻ phản bội vì muốn trường sinh'],
      incitingIncidentTemplate: 'Thiên Đạo hạ sát lệnh diệt thế, hàng vạn vì sao rơi rụng, đại lục chìm trong biển máu.',
      dramaticCrucible: 'Người thân và sư hữu lần lượt hy sinh hiến tế để mở đường máu cho nhân vật chính.',
      breakthroughMomentum: 'Hợp nhất toàn bộ kiếm, thuật, phù, đan thành một thể Hỗn Độn duy nhất, một kiếm trảm phá Thiên Môn.',
      mapTransitionTrigger: 'Bước lên Đỉnh Cao Chư Thần, bước vào Thần Giới Khai Thiên.',
      sceneWritingPrompts: [
        'Đứng trên đỉnh tinh cầu vỡ vụn, một thanh trường kiếm cắm xuống chặn đứng bàn chân khổng lồ của Thiên Đạo.',
        'Hàng triệu tu sĩ quỳ lạy hát vang tên người khi ánh sáng ngũ sắc xua tan mây mù hắc ám ngàn năm.'
      ]
    }
  },
  {
    id: 'spine_stage_7',
    stageOrder: 7,
    stageName: 'Độ Kiếp Phi Thăng & Chứng Đạo Chân Tiên (Bất Hủ)',
    realmTierTitle: 'Chân Tiên ➜ Kim Tiên ➜ Tiên Vương ➜ Chuẩn Đế',
    lifespanSpan: 'Bất hủ cùng nhật nguyệt (Trừ phi bị sát hại)',
    bodyTempering: {
      stageTitle: 'Tiên Thể Bất Diệt & Vạn Kiếp Bất Hủ Chi Khí',
      meridianTransformation: 'Toàn bộ linh lực chuyển hóa thành Tiên Thiên Tiên Khí tinh khiết tuyệt đối.',
      boneAndMarrowRefinement: 'Xương thịt khắc đầy tiên văn bẩm sinh, miễn nhiễm toàn bộ pháp thuật hạ giới.',
      sensoryAura: 'Vòng hào quang Tiên Đạo lơ lửng sau gáy, chiếu sáng ba ngàn cõi giới.'
    },
    swordDao: {
      stageTitle: 'Tuyệt Đối Kiếm Đạo & Trảm Đoạn Nhân Quả',
      swordIntentTier: 'Đế Đạo Kiếm Ý (Nhất Kiếm Tuyệt Cổ Kim)',
      flyingSwordOrBladeArt: 'Kiếm xuất như sấm sét viễn cổ, xé rách thời gian, chém kẻ địch từ trong quá khứ.',
      combatApplication: 'Xóa sổ tên đối thủ khỏi dòng sông thời gian.'
    },
    spellDao: {
      spellTier: 'Khai Thiên Thần Thông',
      representativeSpells: ['Tái Tạo Tinh Hà', 'Diệt Thế Thần Quang', 'Lục Đạo Luân Hồi Chưởng'],
      chantAndMudras: 'Mỗi hơi thở sinh ra một thế giới, mỗi cái chớp mắt hủy diệt một tinh cầu.'
    },
    talismanDao: {
      grade: 'Thất Phẩm Khai Thiên Thần Phù',
      typicalTalismans: ['Thái Sơ Khởi Nguyên Phù', 'Vạn Đạo Quy Nhất Phù'],
      drawingPrinciple: 'Dùng chính căn nguyên vũ trụ dệt nên phù lục.'
    },
    pillAndAlchemy: {
      essentialPills: ['Hỗn Độn Khai Thiên Đan', 'Bất Hủ Bất Diệt Đan'],
      furnaceAndHerbRequirement: 'Thiên Địa làm đỉnh, Hỗn Độn làm hỏa.'
    },
    treasureAndArmament: {
      gearTier: 'Hồng Hoang Tiên Khí / Hỗn Độn Chí Bảo',
      materialsNeeded: ['Nguyên Thủy Thần Tinh', 'Thời Gian Tinh Sa', 'Không Gian Căn Nguyên']
    },
    socialAndSectLevel: {
      factionTier: 'Tiên Đình / Thần Quốc Tối Cao',
      hierarchyStatus: 'Tiên Đế tọa trấn / Thần Chủ vạn giới',
      territoryRealm: 'Thống trị Tiên Giới và hạ giới vô tận'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Trở thành một trong những cột trụ thần thoại của vũ trụ.',
      cosmicEpochMemory: 'Nắm giữ chiếc chìa khóa mở ra Kỷ Nguyên Sáng Thế mới.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Kỷ Nguyên Luân Hồi Kiếp',
      heartDemonSymptom: 'Áp lực giữ vững sự tồn tại của cả vũ trụ trước sự xâm lăng của Hư Không Vực Ngoại.',
      mortalityRisk: 'Hóa thành bụi trần vũ trụ nếu buông xuôi đạo tâm.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 1101 ➜ Chương 1500',
      narrativeRole: 'Tái thiết lập trật tự Tiên Giới, đối đầu với Vực Ngoại Tà Thần ngoài vũ trụ, chuẩn bị khai thiên lập địa.',
      coreConflict: 'Vực Ngoại Tà Thần ăn mòn màng bảo vệ vũ trụ, Tiên Giới đứng trước nguy cơ sụp đổ hoàn toàn.',
      protagonistGoal: 'Thống nhất toàn bộ lực lượng Tiên Giới, dẫn quân xuất chinh quét sạch ngoại địch.',
      archetypalAntagonists: ['Cổ Thần Tà Ma từ Hư Không Hắc Ám', 'Tiên Đế phản bội bán đứng vũ trụ'],
      incitingIncidentTemplate: 'Bức tường biên giới vũ trụ bị xé toạc, bóng tối vĩnh hằng tràn vào nuốt chửng hàng trăm tinh vực.',
      dramaticCrucible: 'Lãnh đạo chư tiên huyết chiến nơi Tận Cùng Hư Không, kiếm gãy đan cạn nhưng không lùi một bước.',
      breakthroughMomentum: 'Dung hợp bản thân với Tiên Đạo Căn Nguyên, trở thành Tiên Đế đầu tiên chứng đạo Hỗn Độn.',
      mapTransitionTrigger: 'Bước ra ngoài vũ trụ, tiến vào Hư Không Nguyên Thủy bao la không bờ bến.',
      sceneWritingPrompts: [
        'Tiên Đế xuất chinh, vạn kiếm hộ tống, tiếng trống trận rung chuyển cả dòng sông thời gian.',
        'Một kiếm quét qua xé toạc bóng tối vô tận, thắp sáng lại hàng triệu tinh cầu đã tắt.'
      ]
    }
  },
  {
    id: 'spine_stage_8',
    stageOrder: 8,
    stageName: 'Hỗn Độn Thái Sơ & Khai Thiên Lập Địa (Siêu Cấp Thần Thánh)',
    realmTierTitle: 'Đại La Kim Tiên ➜ Hỗn Độn Cổ Thần ➜ Sáng Thế Thần Tối Cao',
    lifespanSpan: 'Vĩnh hằng vượt trên thời gian và không gian (Vô thủy vô chung)',
    bodyTempering: {
      stageTitle: 'Hỗn Độn Nguyên Sơ Thần Thể & Vô Thượng Sáng Thế Chi Khu',
      meridianTransformation: 'Không còn kinh mạch hay khí hải, toàn thân là Hỗn Độn hư vô, có thể sinh ra vũ trụ mới từ một ý niệm.',
      boneAndMarrowRefinement: 'Vượt ra ngoài mọi định luật vật lý và quy tắc sinh tử.',
      sensoryAura: 'Là ánh sáng đầu tiên của vũ trụ, là bóng tối bao la bao bọc lấy vạn vật.'
    },
    swordDao: {
      stageTitle: 'Khai Thiên Kiếm Đạo & Nhất Kiếm Định Càn Khôn',
      swordIntentTier: 'Sáng Thế Kiếm Ý (Chém đứt Hỗn Độn, phân định Âm Dương)',
      flyingSwordOrBladeArt: 'Kiếm là chiếc rìu Khai Thiên, chém xuống tạo nên trời và đất.',
      combatApplication: 'Tái tạo hoặc xóa bỏ hoàn toàn một dòng thời gian vũ trụ.'
    },
    spellDao: {
      spellTier: 'Sáng Thế Thần Thuật & Ngôn Xuất Pháp Tùy',
      representativeSpells: ['Khai Thiên Tích Địa', 'Định Hưng Càn Khôn', 'Vạn Vật Tái Sinh'],
      chantAndMudras: 'Nói: "Cần có ánh sáng" thì vũ trụ liền có ánh sáng.'
    },
    talismanDao: {
      grade: 'Vô Tự Thiên Thư & Đạo Đức Khởi Nguyên Triện',
      typicalTalismans: ['Vô Cực Bất Diệt Đạo Phù'],
      drawingPrinciple: 'Không cần bút mực, lấy ý niệm khắc trực tiếp vào hư không nguyên sơ.'
    },
    pillAndAlchemy: {
      essentialPills: ['Sáng Thế Đại Thần Đan'],
      furnaceAndHerbRequirement: 'Hỗn Độn làm đỉnh, bản thân làm dược dẫn.'
    },
    treasureAndArmament: {
      gearTier: 'Khai Thiên Chí Bảo (Rìu Bàn Cổ, Hỗn Độn Thanh Liên)',
      materialsNeeded: ['Khí Thái Sơ', 'Ánh Sáng Khởi Nguyên']
    },
    socialAndSectLevel: {
      factionTier: 'Chúa Tể Sáng Thế',
      hierarchyStatus: 'Thần Phụ của vạn vật / Người tạo ra chư thiên thần phật',
      territoryRealm: 'Toàn bộ đa vũ trụ vô tận'
    },
    pantheonAndCosmicEcho: {
      divineInfluence: 'Là Đấng Tối Cao đứng đầu toàn bộ Thần Phả.',
      cosmicEpochMemory: 'Chính là người viết nên Kỷ Nguyên Khai Thiên Lập Địa.'
    },
    tribulationAndHeartDemon: {
      tribulationType: 'Vô Hạn Hư Vô Tịch Diệt Kiếp',
      heartDemonSymptom: 'Sự cô độc tuyệt đối của Đấng Sáng Tạo sau khi chứng kiến vạn vật sinh ra rồi diệt vong vô số lần.',
      mortalityRisk: 'Hóa thân thành quy luật của vũ trụ mới, mất đi bản ngã cá nhân.'
    },
    novelStoryBeat: {
      suggestedChapters: 'Chương 1501 ➜ Đại Kết Cục',
      narrativeRole: 'Đạt tới cảnh giới tối cao, giải quyết mâu thuẫn triết học căn bản của tác phẩm, mở ra một vũ trụ mới cho chúng sinh.',
      coreConflict: 'Sự sụp đổ tất yếu của vũ trụ cũ do quy luật nhiệt tịch; phải khai thiên lập địa tạo ra thế giới mới tràn đầy hy vọng.',
      protagonistGoal: 'Tạo nên một thế giới nơi chúng sinh tự do phát triển, không còn bị chi phối bởi các vị thần tàn bạo.',
      archetypalAntagonists: ['Hư Vô Thôn Phệ Giả (Ý chí diệt thế nguyên thủy)'],
      incitingIncidentTemplate: 'Vũ trụ cũ tan rã thành tro bụi, chỉ còn lại nhân vật chính đứng giữa Hỗn Độn hư vô mênh mông.',
      dramaticCrucible: 'Quyết định hy sinh quyền lực thống trị độc tôn để ban tặng tự do và sự sống cho muôn loài.',
      breakthroughMomentum: 'Vung thanh kiếm Hỗn Độn chém tan bóng tối, tách trời và đất, lập nên nhật nguyệt và ngàn tinh tú.',
      mapTransitionTrigger: 'Trở về hồng trần phàm gian dưới thân phận một lữ khách bình dị, mỉm cười nhìn ngắm thế giới mình đã tạo ra.',
      sceneWritingPrompts: [
        'Giữa Hỗn Độn vô biên, người giơ cao thanh kiếm, ánh sáng bùng nổ chia đôi trời đất, vạn vật bắt đầu đâm chồi.',
        'Quay đầu nhìn lại con đường vạn dặm từ cậu bé tạp dịch năm nào, người mỉm cười thả thanh kiếm vào dòng sông thời gian.'
      ]
    }
  }
];

export const PRESET_NOVEL_MASTER_SPINE_PLAN: NovelMasterSpinePlan = {
  id: 'spine_plan_default',
  novelTitle: 'HỖN ĐỘN KIẾM TÔN: VẠN CỔ KHAI THIÊN TRUYỀN',
  protagonistName: 'Lăng Tiêu',
  storyTone: 'Hùng tráng bi tráng, nhiệt huyết nghịch thiên, đấu trí thâm sâu, đốn ngộ triết lý',
  coreWorldMapProgression: 'Lạc Hà Thành (Phàm giới) ➜ Thanh Vân Tông (Bát Hoang Tiên Môn) ➜ Cửu Châu Trung Vực ➜ Tinh Không Cổ Lộ ➜ Tiên Giới Thần Vực ➜ Hỗn Độn Khởi Nguyên',
  goldenFingerOrDestiny: 'Tàn Ngọc Thần Ma ẩn giấu Hỗn Độn Tổ Căn và ký ức của Kỷ Nguyên Khai Thiên Lập Địa',
  spineStages: [
    {
      stageOrder: 1,
      stageName: 'Phàm Trần Luyện Thể & Dẫn Khí',
      chapterSpan: 'Chương 1 - Chương 40',
      mainObjective: 'Thức tỉnh Hỗn Độn Tổ Căn, báo thù gia tộc phản trắc, tiến nhập Thanh Vân Tông làm hộ kiếm đệ tử.',
      keyPlotConflict: 'Bị đường huynh đoạt bảo vật, gia nô truy sát đêm mưa, vạch trần gian lận trong khảo thí ngoại môn.',
      crossDisciplinaryCombo: 'Dùng Thối Thể Quyết kết hợp Tật Phong Phù và nhát kiếm chém rụng đầu kẻ địch.',
      divineEncounter: 'Nhặt được Tàn Ngọc Thần Ma rỉ sét trong Kiếm Trủng hoang phế.',
      breakthroughCatharsis: 'Đột phá Luyện Khí cửu tầng trước mặt toàn thể trưởng lão, tát lật mặt thiếu gia quý tộc.',
      authorWritingTips: 'Tập trung miêu tả sự cơ hàn nhẫn nhục, tạo xung đột gay gắt để khi đột phá mang lại cảm giác giải tỏa sảng khoái cực độ.'
    },
    {
      stageOrder: 2,
      stageName: 'Đúc Đạo Cơ & Khí Hải Hóa Dịch',
      chapterSpan: 'Chương 41 - Chương 120',
      mainObjective: 'Thám hiểm Huyết Sát Bí Cảnh, tìm kiếm Ngũ Hành Chi Tinh đúc thành Thiên Đạo Trúc Cơ.',
      keyPlotConflict: 'Bị đồng môn phản bội cấu kết Ma Tông vây hãm dưới đáy vực thẳm.',
      crossDisciplinaryCombo: 'Uống Bồi Nguyên Đan, kích hoạt Kim Cương Phù, thi triển Kiếm Khí Như Tơ cắt nát trận pháp.',
      divineEncounter: 'Tìm thấy bia mộ tàn tích của Cổ Thần chiến binh lưu lạc dưới lòng đất.',
      breakthroughCatharsis: 'Khí hải hóa thành biển linh dịch ngũ sắc, một kiếm chém chết thiên kiêu đệ nhất nội môn của địch tông.',
      authorWritingTips: 'Mở rộng bản đồ sang bí cảnh, tăng cường yếu tố cạm bẫy sinh tồn và tâm lý đa nghi giữa các tu sĩ.'
    },
    {
      stageOrder: 3,
      stageName: 'Ngưng Kết Kim Đan & Đại Đạo Đan Văn',
      chapterSpan: 'Chương 121 - Chương 260',
      mainObjective: 'Ngưng tụ Cửu Chuyển Hoàng Kim Đan, bảo vệ Thanh Vân Tông thoát khỏi ma triều diệt môn.',
      keyPlotConflict: 'U Minh Ma Quân mở đại trận luyện huyết, toàn bộ môn phái đứng trước nguy cơ bị diệt sạch.',
      crossDisciplinaryCombo: 'Dùng Tam Muội Chân Hỏa Phù đốt cháy ma khí, dẫn lôi kiếp vào kiếm chém đôi cự thú.',
      divineEncounter: 'Thần Niệm thức tỉnh nghe thấy tiếng gọi của Cổ Thần từ Cửu Châu Trung Vực.',
      breakthroughCatharsis: 'Viên Kim Đan chín đạo văn sáng lòa xua tan biển ma khí, vạn đệ tử bái tạ tôn xưng Kiếm Chủ.',
      authorWritingTips: 'Đây là giai đoạn bước ngoặt từ một cá nhân sang tư thế của một anh hùng bảo hộ tập thể.'
    },
    {
      stageOrder: 4,
      stageName: 'Phá Đan Sinh Anh & Thần Niệm Thông Thiên',
      chapterSpan: 'Chương 261 - Chương 450',
      mainObjective: 'Tiến vào Cửu Châu Trung Vực, thành lập Lăng Tiêu Các, đoạt thần kiếm viễn cổ.',
      keyPlotConflict: 'Bị các Thánh Địa liên minh vây hãm vì sở hữu Hỗn Độn Kiếm Thai.',
      crossDisciplinaryCombo: 'Nguyên Anh xuất khiếu ngự Không Gian Na Di Phù, thi triển Tâm Kiếm chém nát phân thân của Thánh Chủ.',
      divineEncounter: 'Khám phá Lăng Mộ Thần Ma, nhận được chiếc chìa khóa Kỷ Nguyên Khai Thiên.',
      breakthroughCatharsis: 'Hài nhi Nguyên Anh mở mắt phóng thần quang, uy áp khiến mười vạn đại quân Thánh Địa phải lùi bước.',
      authorWritingTips: 'Nâng cấp quy mô thế giới, thêm vào yếu tố gia tộc cổ xưa, đấu trí chính trị và âm mưu tầng tầng lớp lớp.'
    }
  ]
};
