import { SpiritCrystalItem, NaturalTreasureItem, AncientArtifactItem } from '../types';

export const PRESET_SPIRIT_CRYSTALS: SpiritCrystalItem[] = [
  {
    id: 'crystal_cuc_pham_hon_don',
    name: 'Hỗn Độn Linh Tinh Thạch',
    grade: 'Cực Phẩm Linh Tinh / Linh Tủy',
    attribute: 'Hỗn Độn & Thái Sơ Vô Tính',
    appearance: 'Hình lăng trụ trong suốt, bên trong cuộn trào sương mù ngũ sắc chuyển động không ngừng.',
    energyPurity: '99.9% thuần khiết, không chứa bất kỳ tạp chất nào, có thể hấp thu trực tiếp không cần lọc.',
    marketValue: '1 viên = 10,000 viên Thượng Phẩm Linh Thạch (Thường vô giá, chỉ đổi bảo vật ngang hàng).',
    primaryUses: ['Mắt trận Hộ Tông Đại Trận', 'Đột phá cảnh giới Nguyên Anh / Hóa Thần', 'Luyện chế Đạo Khí'],
    miningLocation: 'Rốn long mạch sâu mười vạn trượng dưới đáy Côn Lôn Sơn Cấm Địa.',
    rarityAndDanger: 'Cực kỳ hiếm hoi, nơi khai thác có Yêu Vương Bát Giai canh giữ.',
    novelEffects: 'Gây ra cuộc tranh đoạt đẫm máu giữa các đại thánh địa trong buổi đấu giá bảo vật.'
  }
];

export const PRESET_NATURAL_TREASURES: NaturalTreasureItem[] = [
  {
    id: 'treasure_cuu_diep_thao',
    name: 'Cửu Diệp Hồi Hồn Thảo',
    category: 'Linh Dược & Thần Thảo (Hấp thu tinh hoa nhật nguyệt)',
    tier: 'Tứ - Lục Giai (Đại Vực Trọng Bảo)',
    growthYears: 'Ba ngàn năm nở một lá, chín lá tương đương hai vạn bảy ngàn năm.',
    naturalPhenomenon: 'Hào quang bảy màu tỏa sáng trong đêm, tỏa ra mùi hương thoang thoảng cách xa ba mươi dặm.',
    guardianMonster: 'Thất Thải Độc Mãng tứ giai đỉnh phong ẩn nấp dưới gốc rễ.',
    collectionMethod: 'Phải dùng xẻng ngọc trắng và hộp ngọc hàn băng để hái, không được chạm tay trần.',
    miraculousEffect: 'Cứu sống người chỉ còn một hơi thở, hồi sinh thần hồn bị đánh tan rã, tái tạo kinh mạch đứt gãy.',
    sideEffectsOrDangers: 'Dược lực quá mạnh, nếu người phàm uống vào sẽ bị bạo thể nổ tung.',
    legendaryOrigin: 'Tương truyền do giọt nước mắt của Cổ Thần rơi xuống vùng đầm lầy sinh ra.'
  }
];

export const PRESET_ANCIENT_ARTIFACTS: AncientArtifactItem[] = [
  {
    id: 'artifact_tan_ngoc_hon_don',
    name: 'Hỗn Độn Thần Ma Tàn Ngọc',
    originalName: 'Khai Thiên Kỷ Nguyên Khởi Nguyên Ngọc Tỷ',
    era: 'Thái Cổ Hồng Hoang (Thời kỳ Khai Thiên Lập Địa)',
    state: 'Tàn Khuyết / Bị Phong Ấn (Chưa thức tỉnh, nhìn như đá rỉ sét)',
    appearance: 'Một mảnh ngọc vỡ bằng bàn tay màu xám xịt, góc cạnh sứt mẻ, phủ một lớp rỉ sét màu máu khô.',
    unsealingCondition: 'Phải nhỏ máu của người sở hữu Hỗn Độn Tổ Căn và hấp thu khí tức của Thiên Kiếp.',
    spiritEntity: {
      hasSpirit: true,
      spiritName: 'Tiểu Hỗn Độn (Thương Lão Tàn Hồn)',
      spiritPersonality: 'Uyên bác, kiêu ngạo nhưng tận tâm chỉ điểm nhân vật chính khi gặp hiểm cảnh sinh tử.'
    },
    ancientSecretOrTechnique: 'Ẩn giấu trọn bộ công pháp Thái Sơ Hỗn Độn Kiếm Quyết và bản đồ kho báu Thần Mộ.',
    activePower: 'Khi kích hoạt có thể diễn hóa vạn vật, làm chậm thời gian tu luyện gấp mười lần.',
    backstoryAndDestruction: 'Vốn là chí bảo trấn áp vũ trụ thời khai thiên, bị vỡ nát trong trận đại chiến với ba ngàn Ma Thần.'
  }
];
