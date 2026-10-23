import { SpellDaoCanonItem } from '../types';

export const PRESET_SPELL_DAO_CANONS: SpellDaoCanonItem[] = [
  {
    id: 'canon_ngu_hanh_than_quang',
    name: 'Đại Diễn Ngũ Hành Thần Thông Kinh',
    affinity: 'Ngũ Hành Toàn Hệ (Kim - Mộc - Thủy - Hỏa - Thổ)',
    gradeLevel: 'Đạo Thống Đế Kinh',
    originAndLineage: 'Bắt nguồn từ Khổng Tước Thần Thú thời Kỷ Nguyên Hồng Hoang, hoàn thiện bởi Ngũ Hành Đạo Tổ.',
    corePrinciple: 'Ngũ hành tương sinh tương khắc, vạn vật trong trời đất không nằm ngoài ngũ hành. Dùng ngũ hành để bao trùm, vạn vật đều có thể bị thu nạp hoặc phá hủy.',
    cultivationRequirements: {
      spiritualAuraRequirement: 'Yêu cầu Ngũ Hành Căn Cơ hoặc có ngũ hành kỳ vật bổ trợ',
      mentalFocusRequirement: 'Thần niệm phân hóa ngũ sắc, khống chế năm luồng linh lực cùng lúc không xung đột',
      elementalComprehension: 'Thấu hiểu bản chất sinh khắc của đại đạo ngũ hành'
    },
    spells: [
      {
        orderNumber: 1,
        spellName: 'Ngũ Hành Tụ Linh Khiên (Thủ Ấn Pháp)',
        tierRank: 'Nhị Giai Trung Phẩm',
        elementalAffinity: 'Thổ - Thủy - Mộc Hợp Nhất',
        handMudraFormula: 'Hữu thủ kết Bạt Sơn Ấn, tả thủ kết Bích Ba Ấn, đan chéo mười ngón tay trước ngực.',
        incantationChant: 'Địa sinh linh căn, thủy nhuận vạn vật, mộc lộc trường sinh, hộ ngã chân thân!',
        meridianCirculation: 'Linh lực từ Đan Điền chia làm ba nhánh chạy qua Túc Thái Âm Tỳ Kinh, Túc Thiếu Âm Thận Kinh và Can Kinh.',
        visualPhenomenon: 'Trước ngực hiện ra một vòng xoáy quang khiên ba màu lục - lam - hoàng xoay tròn với tốc độ cực cao.',
        destructiveScale: 'Phòng ngự 360 độ, chịu được đòn công kích dồn dập của ba tu sĩ Trúc Cơ đỉnh phong.',
        enlightenmentInsight: 'Độ cứng không phải do sức mạnh, mà do sự mềm dẻo luân chuyển của nước và đất.',
        backfireDanger: 'Nếu bị đòn tấn công hệ Kim cực mạnh phá vỡ sẽ làm chấn động lục phủ ngũ tạng.'
      },
      {
        orderNumber: 2,
        spellName: 'Xích Viêm Liệt Thiên Trận (Phần Thiên Diệt Sát)',
        tierRank: 'Tam Giai Thượng Phẩm',
        elementalAffinity: 'Hỏa Hệ Biến Dị (Địa Mạch Chân Hỏa)',
        handMudraFormula: 'Lưỡng thủ giơ cao bấm Cửu Long Liệt Diễm Ấn, ngón cái kẹp chặt chuôi linh kiếm.',
        incantationChant: 'Cửu Thiên Huyền Hỏa, địa mạch liệt viêm, phần tẫn tà ma, vạn kiếp bất tồn!',
        meridianCirculation: 'Hỏa linh lực dồn dập bốc lên đỉnh đầu qua Đốc Mạch, phun trào qua mười đầu ngón tay.',
        visualPhenomenon: 'Bầu trời chuyển sang màu đỏ rực như máu, chín con rồng lửa dài trăm trượng từ trên mây lao xuống quét sạch mặt đất.',
        destructiveScale: 'Thiêu rụi một ngọn núi đá ngàn trượng thành nham thạch nóng chảy trong vòng mười nhịp thở.',
        enlightenmentInsight: 'Lửa không chỉ để hủy diệt, mà là quá trình thanh lọc cặn bã để niết bàn sinh sôi.',
        backfireDanger: 'Dễ bị hỏa độc xâm nhập tâm mạch gây cuồng loạn mất trí nếu không có đan dược áp chế.'
      },
      {
        orderNumber: 3,
        spellName: 'Ngũ Hành Thần Quang Vô Hạ (Vạn Pháp Tịch Diệt)',
        tierRank: 'Cực Đạo Thần Cấp',
        elementalAffinity: 'Ngũ Hành Hỗn Hợp Viên Mãn',
        handMudraFormula: 'Hai bàn tay xòe ra thành hình nan quạt, năm ngón tay tỏa ra năm luồng ánh sáng: Thanh, Hoàng, Xích, Hắc, Bạch.',
        incantationChant: 'Ngũ hành lưu chuyển, thiên địa quy nguyên. Vạn vật chi pháp, giai quy thần quang!',
        meridianCirculation: 'Toàn bộ kinh mạch cơ thể đồng loạt cộng hưởng như đàn cầm, chân nguyên chuyển hóa thành thần quang vô sắc.',
        visualPhenomenon: 'Năm dải lụa thần quang ngũ sắc quét ngang qua chiến trường, quét tới đâu là binh khí, pháp bảo và pháp thuật của kẻ địch biến mất tới đó.',
        destructiveScale: 'Không vật gì không quét, không bảo vật gì không rơi; tước bỏ toàn bộ trang bị và phong tỏa pháp lực kẻ địch.',
        enlightenmentInsight: 'Sức mạnh lớn nhất của ngũ hành là sự đồng hóa vạn vật trở về trạng thái nguyên sơ.',
        backfireDanger: 'Đòi hỏi tiêu hao lượng thần thức khổng lồ, nếu quá sức sẽ khiến linh hồn rơi vào trạng thái chết lâm sàng ba ngày.'
      }
    ],
    authorNotes: 'Là bộ thuật pháp tuyệt kỹ trấn phái kinh điển của thể loại Tiên Hiệp, tạo cảm giác vô địch tuyệt đối khi thi triển đòn quét Ngũ Hành Thần Quang.'
  },
  {
    id: 'canon_tu_tieu_loi_phap',
    name: 'Cửu Thiên Tử Tiêu Thần Lôi Quyết',
    affinity: 'Lôi Đình Thiên Kiếp',
    gradeLevel: 'Thiên Giai Tuyệt Phẩm',
    originAndLineage: 'Do Thần Lôi Đạo Tôn sáng tạo khi chứng kiến Thiên Kiếp diệt thế tại Lôi Trì Viễn Cổ.',
    corePrinciple: 'Lôi đình là ý chí chấp pháp của Thiên Đạo, cương trực chí dương, chuyên khắc chế yêu ma quỷ quái và tà linh u minh.',
    cultivationRequirements: {
      spiritualAuraRequirement: 'Tu sĩ có Lôi Linh Căn hoặc đã từng bị sét đánh mà không chết',
      mentalFocusRequirement: 'Đạo tâm cương trực, không làm điều tà ác trái với lương tri',
      elementalComprehension: 'Cảm nhận được nhịp đập của điện tích trong tầng mây bão'
    },
    spells: [
      {
        orderNumber: 1,
        spellName: 'Tử Tiêu Chưởng Tâm Lôi',
        tierRank: 'Nhất Giai Đỉnh Phong',
        elementalAffinity: 'Thuần Dương Lôi Đình',
        handMudraFormula: 'Hữu thủ nắm chặt thành quyền rồi bất ngờ xòe ra, ngón giữa chỉ thẳng đối thủ.',
        incantationChant: 'Lôi công trợ ngã, hạo nhiên chính khí, phá tà!',
        meridianCirculation: 'Lôi khí ngưng tụ trong lòng bàn tay qua Thiếu Dương Tam Tiêu Kinh.',
        visualPhenomenon: 'Một quả cầu sét màu tím to bằng miệng bát nổ tung trên lòng bàn tay với tiếng nổ như sấm sét xé toạc màng nhĩ.',
        destructiveScale: 'Đánh bay tu sĩ cùng cấp, phá hủy tức thì mọi loại âm hồn và cương thi hạ phẩm.',
        enlightenmentInsight: 'Tốc độ của sấm sét là tốc độ của ý niệm.',
        backfireDanger: 'Lòng bàn tay bị bỏng rát nếu không có linh lực hộ bì vững chắc.'
      }
    ],
    authorNotes: 'Rất thích hợp cho các trận chiến đối đầu với ma tu tà ác, tạo ra cảm giác chính nghĩa áp đảo.'
  }
];
