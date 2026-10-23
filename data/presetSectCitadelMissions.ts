import { SectItem, QuestItem } from '../types';

export const PRESET_SECTS: SectItem[] = [
  {
    id: 'sect_thanh_van',
    name: 'Thanh Vân Tông',
    camp: 'Chính Đạo (Orthodox / Tiên Môn)',
    grade: 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá)',
    headquarters: 'Thanh Vân Thập Bát Phong (Lơ lửng trên biển mây Nam Hoang)',
    founderAndLegacy: 'Thanh Vân Kiếm Tổ khai sơn ba vạn năm trước, để lại kiếm tích trên Kiếm Phong.',
    leadership: {
      patriarch: 'Thanh Hư Đạo Quân (Hóa Thần Sơ Kỳ)',
      sectMaster: 'Cố Thiên Thu (Nguyên Anh Đỉnh Phong)',
      lawEnforcementElder: 'Thiết Diện Chân Nhân (Nguyên Anh Hậu Kỳ)',
      discipleCount: 'Ngoại môn mười vạn, Nội môn ba ngàn, Chân truyền ba mươi sáu người'
    },
    heritageScriptures: [
      { name: 'Thanh Vân Kiếm Điển', grade: 'Địa Giai Thượng Phẩm', summary: 'Bộ kiếm pháp lấy sự thanh thoát phiêu dật làm chủ đạo.' }
    ],
    sacredArtifacts: [
      { name: 'Thanh Hư Kiếm', rank: 'Thông Thiên Linh Bảo', power: 'Chém rách bầu trời ngàn trượng, áp chế yêu ma.' }
    ],
    guardianArray: {
      name: 'Thanh Vân Cửu Cung Tru Ma Đại Trận',
      tier: 'Tứ Phẩm Hộ Tông Đại Trận',
      powerDescription: 'Hút linh khí từ mười tám ngọn núi phong tỏa không gian, diệt sát cường giả Nguyên Anh.'
    },
    specialties: ['Luyện kiếm', 'Thuần dưỡng linh hạc', 'Chế tác phù lục truyền tin'],
    rulesAndPrecepts: ['Không được đồng môn tàn sát lẫn nhau', 'Không được cấu kết ma đạo', 'Tôn sư trọng đạo'],
    politicalStance: {
      allies: ['Bắc Hải Tiên Cung', 'Đại Càn Tiên Triều'],
      bitterEnemies: ['U Minh Ma Tông', 'Huyết Sát Môn'],
      currentCrisis: 'Tài nguyên linh mạch dưới đáy núi đang cạn kiệt, Ma Tông chuẩn bị xâm lăng.'
    },
    description: 'Một trong ba tông môn kiếm đạo lớn nhất Nam Hoang, biểu tượng của chính đạo lâu đời nhưng bên trong bắt đầu nảy sinh mâu thuẫn phe phái.'
  }
];

export const PRESET_QUESTS: QuestItem[] = [
  {
    id: 'quest_1',
    title: 'Tru Diệt Huyết Sát Đạo Tặc & Thu Thập Lôi Đình Thảo',
    questLine: 'Trảm Yêu Trừ Ma Tuyến (Demon Hunting Bounty Line)',
    rankGrade: 'Huyền Giai / Cấp C (Nhiệm vụ Tinh Anh: Trúc Cơ)',
    issuerLocationOrSect: 'Bảng Nhiệm Vụ Ngoại Môn Thanh Vân Tông',
    requiredRealm: 'Luyện Khí tầng 8 trở lên hoặc Trúc Cơ sơ kỳ',
    timeLimit: 'Mười lăm ngày',
    dangerFactor: 'Đạo tặc có ma khí mai phục và yêu thú nhị giai bảo hộ',
    missionObjectives: ['Tiêu diệt thủ lĩnh Huyết Sát Đạo Tặc', 'Thu thập 10 cây Lôi Đình Thảo trên Hắc Phong Lĩnh'],
    targetAntagonistOrObstacle: 'Hắc Phong Song Sát (Tu sĩ ma đạo tàn nhẫn)',
    rewards: {
      sectContributionPoints: '500 điểm cống hiến',
      spiritStones: '1,000 Hạ Phẩm Linh Thạch',
      pillsOrArtifacts: '3 viên Hồi Khí Đan trung phẩm',
      reputationGain: 'Tăng uy tín trong đệ tử ngoại môn',
      specialAccess: 'Được vào Tàng Kinh Các tầng 2 chọn công pháp'
    },
    failurePenalty: 'Trừ 200 điểm cống hiến và cấm nhận nhiệm vụ trong ba tháng',
    hiddenPlotHook: 'Hắc Phong Song Sát thực chất là nội gián nhận lệnh của một vị chấp sự nội môn để diệt trừ các đệ tử thiên tài.'
  }
];
