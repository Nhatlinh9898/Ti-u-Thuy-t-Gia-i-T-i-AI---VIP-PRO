import {
  CharacterTrajectoryRoutingProfile,
  CharacterNexusRelationCategory,
  TrajectoryMilestoneType,
  CharacterTrajectoryMilestone,
  GeographicLocationType,
  GeographicTraversalStatus,
  GeographicExpeditionNode,
  QuestTrialCategory,
  CharacterQuestTrialRecord,
  KarmicInheritanceType,
  CharacterKarmicInheritanceBranch,
  CharacterNemesisFeudBranch,
  CharacterDaoHeartDemonBranch,
  CharacterFactionPowerBranch,
  OralLoreSpeakerType,
  OralLoreTreasureCategory,
  CharacterOralLoreSubplot
} from '../types';

// =========================================================================
// METADATA DEFINITIONS & CONFIGURATION FOR NEXUS CATEGORIES & MILESTONES
// =========================================================================

export interface NexusCategoryMeta {
  category: CharacterNexusRelationCategory;
  label: string;
  icon: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  description: string;
}

export const NEXUS_CATEGORIES_META: Record<CharacterNexusRelationCategory, NexusCategoryMeta> = {
  CHA_ME: {
    category: 'CHA_ME',
    label: 'Cha Mẹ (Phụ Mẫu)',
    icon: '👨‍👩‍👦',
    color: '#f59e0b',
    bgClass: 'bg-amber-950/40',
    borderClass: 'border-amber-500/40',
    textClass: 'text-amber-300',
    description: 'Đấng sinh thành, dưỡng phụ mẫu, công ơn nuôi dưỡng và huyết mạch cội nguồn'
  },
  GIA_TOC: {
    category: 'GIA_TOC',
    label: 'Gia Tộc (Dòng Họ / Thế Gia)',
    icon: '🏰',
    color: '#d97706',
    bgClass: 'bg-amber-900/30',
    borderClass: 'border-amber-600/40',
    textClass: 'text-amber-200',
    description: 'Tộc nhân, trưởng lão thế gia, phân gia, chi phái và trách nhiệm huyết thống'
  },
  VO_DAO_LU: {
    category: 'VO_DAO_LU',
    label: 'Vợ / Đạo Lữ (Hồng Nhan)',
    icon: '💍',
    color: '#ec4899',
    bgClass: 'bg-pink-950/40',
    borderClass: 'border-pink-500/40',
    textClass: 'text-pink-300',
    description: 'Chính thê, trắc thất, song tu đạo lữ cùng vượt sinh tử, hồng nhan tri kỷ'
  },
  CON_CAI: {
    category: 'CON_CAI',
    label: 'Con Cái (Hậu Duệ)',
    icon: '👶',
    color: '#10b981',
    bgClass: 'bg-emerald-950/40',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-300',
    description: 'Con trai, con gái, huyết mạch nối dõi, truyền nhân chân truyền huyết thống'
  },
  BAN_BE: {
    category: 'BAN_BE',
    label: 'Bạn Bè (Bằng Hữu Tri Giao)',
    icon: '🤝',
    color: '#3b82f6',
    bgClass: 'bg-blue-950/40',
    borderClass: 'border-blue-500/40',
    textClass: 'text-blue-300',
    description: 'Bằng hữu sinh tử chi giao, tri kỷ rượu nồng, bạn đồng hành trên tiên lộ'
  },
  HANG_XOM: {
    category: 'HANG_XOM',
    label: 'Hàng Xóm (Lân Lý Hàn Vi)',
    icon: '🏡',
    color: '#84cc16',
    bgClass: 'bg-lime-950/30',
    borderClass: 'border-lime-500/40',
    textClass: 'text-lime-300',
    description: 'Cố nhân thôn trang, láng giềng thuở hàn vi, ân nhân bát cháo ngày cơ hàn'
  },
  TONG_MON: {
    category: 'TONG_MON',
    label: 'Tông Môn (Môn Phái)',
    icon: '⛩️',
    color: '#8b5cf6',
    bgClass: 'bg-purple-950/40',
    borderClass: 'border-purple-500/40',
    textClass: 'text-purple-300',
    description: 'Chưởng môn, hộ pháp, quy chế môn quy, nơi nương tựa tu đạo và bảo vệ'
  },
  SU_HUYNH_DE: {
    category: 'SU_HUYNH_DE',
    label: 'Sư Huynh Đệ (Đồng Môn / Sư Tôn)',
    icon: '🥋',
    color: '#06b6d4',
    bgClass: 'bg-cyan-950/40',
    borderClass: 'border-cyan-500/40',
    textClass: 'text-cyan-300',
    description: 'Ân sư truyền đạo, đại sư huynh, tiểu sư muội, cùng chung ngọn núi luyện kiếm'
  },
  DE_TU: {
    category: 'DE_TU',
    label: 'Đệ Tử Môn Hạ (Truyền Nhân)',
    icon: '📜',
    color: '#14b8a6',
    bgClass: 'bg-teal-950/40',
    borderClass: 'border-teal-500/40',
    textClass: 'text-teal-300',
    description: 'Chân truyền đệ tử, ký danh, hậu bối kế thừa y bát và bảo vệ môn hộ'
  },
  KE_THU: {
    category: 'KE_THU',
    label: 'Kẻ Thù (Túc Địch / Huyết Cừu)',
    icon: '☠️',
    color: '#ef4444',
    bgClass: 'bg-red-950/50',
    borderClass: 'border-red-500/50',
    textClass: 'text-red-300',
    description: 'Huyết hải thâm cừu, cừu nhân diệt tộc, ma đầu túc địch, không chết không thôi'
  }
};

export interface MilestoneTypeMeta {
  type: TrajectoryMilestoneType;
  label: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export const MILESTONE_TYPES_META: Record<TrajectoryMilestoneType, MilestoneTypeMeta> = {
  TU_LUYEN: {
    type: 'TU_LUYEN',
    label: 'Mốc Tu Luyện & Đột Phá',
    icon: '🧘',
    color: '#3b82f6',
    badgeBg: 'bg-blue-950/70',
    badgeBorder: 'border-blue-500/50',
    badgeText: 'text-blue-300',
    description: 'Các thời điểm thăng cấp cảnh giới, vượt lôi kiếp, ngưng kết đan anh'
  },
  CO_DUYEN_KY_NGO: {
    type: 'CO_DUYEN_KY_NGO',
    label: 'Cơ Duyên Kỳ Ngộ',
    icon: '🌟',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/50',
    badgeText: 'text-amber-300',
    description: 'Nhặt di bảo, truyền thừa cổ tiên, rơi xuống vực sâu tìm thấy bí kíp, dị hỏa'
  },
  HOI_NGO_TUONG_PHUNG: {
    type: 'HOI_NGO_TUONG_PHUNG',
    label: 'Hội Ngộ Tương Phùng',
    icon: '🤝',
    color: '#10b981',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-300',
    description: 'Tái ngộ người thân sau trăm năm, trùng phùng đạo lữ, gặp lại bằng hữu thuở hàn vi'
  },
  CUOC_CHIA_LY: {
    type: 'CUOC_CHIA_LY',
    label: 'Cuộc Chia Ly & Mất Mát',
    icon: '💔',
    color: '#ef4444',
    badgeBg: 'bg-red-950/70',
    badgeBorder: 'border-red-500/50',
    badgeText: 'text-red-300',
    description: 'Sinh ly tử biệt, tông môn ly tán, người thân hiến tế, chia tay dấn thân tiên lộ'
  },
  SU_MENH: {
    type: 'SU_MENH',
    label: 'Sứ Mệnh & Trọng Trách',
    icon: '🎯',
    color: '#8b5cf6',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-500/50',
    badgeText: 'text-purple-300',
    description: 'Lời thề diệt ma, chấn hưng tiên tộc, gánh vác thiên mệnh, đúc lại luân hồi'
  },
  BUOC_NGOAT_THAY_DOI: {
    type: 'BUOC_NGOAT_THAY_DOI',
    label: 'Bước Ngoặt Đổi Thay',
    icon: '⚡',
    color: '#ec4899',
    badgeBg: 'bg-pink-950/70',
    badgeBorder: 'border-pink-500/50',
    badgeText: 'text-pink-300',
    description: 'Biến cố đảo lộn số phận, bị phản bội, thức tỉnh thần thể, thay đổi hoàn toàn tâm tính'
  },
  NHIEM_VU: {
    type: 'NHIEM_VU',
    label: 'Nhánh Làm Nhiệm Vụ',
    icon: '📜',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-500/50',
    badgeText: 'text-cyan-300',
    description: 'Nhiệm vụ tông môn ủy thác, trừ ma vệ đạo, lệnh truy sát hoàng triều'
  },
  DU_NGOAN: {
    type: 'DU_NGOAN',
    label: 'Du Ngoạn & Lịch Lãm',
    icon: '⛵',
    color: '#10b981',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/50',
    badgeText: 'text-emerald-300',
    description: 'Ngao du sơn hà, du lịch hồng trần, tìm kiếm linh cảm ngộ đạo, đàm đạo giang hồ'
  },
  THI_LUYEN: {
    type: 'THI_LUYEN',
    label: 'Tham Gia Thí Luyện',
    icon: '⚔️',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/50',
    badgeText: 'text-amber-300',
    description: 'Tông môn đại bỉ, lôi đài thiên kiêu, cửu trùng khảo nghiệm sinh tử'
  },
  BI_CANH: {
    type: 'BI_CANH',
    label: 'Vào Khám Phá Bí Cảnh',
    icon: '🗝️',
    color: '#8b5cf6',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-500/50',
    badgeText: 'text-purple-300',
    description: 'Động thiên phúc địa, cổ mộ di tích, cấm khu phong ấn vạn năm'
  }
};

// =========================================================================
// METADATA DEFINITIONS FOR GEOGRAPHIC EXPEDITION ATLAS
// =========================================================================

export interface GeographicTypeMeta {
  type: GeographicLocationType;
  label: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export const GEOGRAPHIC_TYPES_META: Record<GeographicLocationType, GeographicTypeMeta> = {
  LANG_MAC: {
    type: 'LANG_MAC',
    label: 'Làng Mạc & Thôn Dã',
    icon: '🏡',
    color: '#84cc16',
    badgeBg: 'bg-lime-950/60',
    badgeBorder: 'border-lime-500/40',
    badgeText: 'text-lime-300',
    description: 'Thôn trang, sơn thôn hàn vi, nơi khởi nguồn bước chân sơ tâm'
  },
  THANH_TRI: {
    type: 'THANH_TRI',
    label: 'Thành Trì & Tiên Đô',
    icon: '🏯',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/60',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    description: 'Tiên thành phồn hoa, đế đô hoàng triều, đấu giá phường thị, trấn quan biên giới'
  },
  BI_CANH_DONG_THIEN: {
    type: 'BI_CANH_DONG_THIEN',
    label: 'Bí Cảnh & Động Thiên',
    icon: '🗝️',
    color: '#a855f7',
    badgeBg: 'bg-purple-950/60',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-300',
    description: 'Thượng cổ bí cảnh, động thiên phúc địa, cổ tiên di chỉ, tuyệt cấm tử địa'
  },
  VUNG_DAT_SON_HAI: {
    type: 'VUNG_DAT_SON_HAI',
    label: 'Vùng Đất & Sơn Hải',
    icon: '🏔️',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-950/60',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-300',
    description: 'Đại vực hoang dã, vạn trượng sơn mạch, vô tận hải vực, dị giới không gian'
  },
  TONG_MON_THANH_DIA: {
    type: 'TONG_MON_THANH_DIA',
    label: 'Tông Môn & Thánh Địa',
    icon: '⛩️',
    color: '#ec4899',
    badgeBg: 'bg-pink-950/60',
    badgeBorder: 'border-pink-500/40',
    badgeText: 'text-pink-300',
    description: 'Sơn môn đại phái, hộ sơn đại trận, thánh địa truyền thừa vạn năm'
  }
};

export interface GeographicStatusMeta {
  status: GeographicTraversalStatus;
  label: string;
  icon: string;
  badgeClass: string;
}

export const GEOGRAPHIC_STATUS_META: Record<GeographicTraversalStatus, GeographicStatusMeta> = {
  DA_TRAI_QUA: {
    status: 'DA_TRAI_QUA',
    label: 'Đã Trải Qua (Dĩ Vãng)',
    icon: '✅',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
  },
  DANG_TRAI_QUA: {
    status: 'DANG_TRAI_QUA',
    label: 'Đang Trải Qua (Hiện Tại)',
    icon: '📍',
    badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/50'
  },
  CAN_TRAI_QUA: {
    status: 'CAN_TRAI_QUA',
    label: 'Cần Trải Qua (Tương Lai)',
    icon: '⏳',
    badgeClass: 'bg-blue-950/80 text-blue-300 border-blue-500/50'
  },
  MUC_TIEU_TOI_HAU: {
    status: 'MUC_TIEU_TOI_HAU',
    label: 'Mục Tiêu Tối Hậu (Chung Cực)',
    icon: '🎯',
    badgeClass: 'bg-red-950/80 text-red-300 border-red-500/50'
  }
};

// =========================================================================
// METADATA DEFINITIONS FOR QUESTS, TRAVELS, TRIALS & SECRET REALMS
// =========================================================================

export interface QuestTrialCategoryMeta {
  category: QuestTrialCategory;
  label: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export const QUEST_TRIAL_CATEGORIES_META: Record<QuestTrialCategory, QuestTrialCategoryMeta> = {
  NHIEM_VU: {
    category: 'NHIEM_VU',
    label: 'Nhánh Nhiệm Vụ',
    icon: '📜',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-300',
    description: 'Nhiệm vụ sư môn, triều đình sắc lệnh, trừ ma diệt đạo, huyền thưởng trảm yêu'
  },
  DU_NGOAN: {
    category: 'DU_NGOAN',
    label: 'Lần Du Ngoạn',
    icon: '⛵',
    color: '#10b981',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-300',
    description: 'Ngao du sơn hà, du lịch hồng trần, tìm kiếm linh cảm ngộ đạo, thuyền trôi đàm đạo'
  },
  THI_LUYEN: {
    category: 'THI_LUYEN',
    label: 'Lần Thí Luyện',
    icon: '⚔️',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    description: 'Tông môn đại bỉ, lôi đài thiên kiêu vạn vực, cửu trùng khảo nghiệm sinh tử'
  },
  VAO_BI_CANH: {
    category: 'VAO_BI_CANH',
    label: 'Lần Vào Bí Cảnh',
    icon: '🗝️',
    color: '#a855f7',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-300',
    description: 'Động thiên phúc địa, cổ tiên di tích, cấm khu phong ấn tầm bảo đoạt duyên'
  }
};

// =========================================================================
// METADATA DEFINITIONS FOR EXTENDED BRANCHES
// =========================================================================

export interface KarmicTypeMeta {
  type: KarmicInheritanceType;
  label: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export const KARMIC_TYPES_META: Record<KarmicInheritanceType, KarmicTypeMeta> = {
  THAN_BINH_BAN_MENH: {
    type: 'THAN_BINH_BAN_MENH',
    label: 'Thần Binh Bản Mệnh',
    icon: '🗡️',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    description: 'Linh bảo bản mệnh, đế kiếm viễn cổ, tiến hóa theo cảnh giới'
  },
  TRUYEN_THUA_CO_TIEN: {
    type: 'TRUYEN_THUA_CO_TIEN',
    label: 'Truyền Thừa Cổ Tiên',
    icon: '📜',
    color: '#8b5cf6',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-300',
    description: 'Tàn hồn lão tổ chỉ điểm, ngọc giản thượng cổ khai mạch'
  },
  DI_HOA_DI_LOI: {
    type: 'DI_HOA_DI_LOI',
    label: 'Dị Hỏa / Thiên Lôi',
    icon: '🔥',
    color: '#ef4444',
    badgeBg: 'bg-red-950/70',
    badgeBorder: 'border-red-500/40',
    badgeText: 'text-red-300',
    description: 'Dị hỏa thiên địa, cửu u huyền lôi, dị bảo nguyên tố'
  },
  LINH_THU_KHE_UOC: {
    type: 'LINH_THU_KHE_UOC',
    label: 'Thần Thú Khế Ước',
    icon: '🐉',
    color: '#10b981',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-300',
    description: 'Thần thú hộ mệnh, hung thú thời hoang cổ cộng sinh'
  },
  DAN_DUOC_THIEN_TAI: {
    type: 'DAN_DUOC_THIEN_TAI',
    label: 'Đạo Đan Thánh Dược',
    icon: '💊',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-300',
    description: 'Đan dược cửu chuyển nghịch thiên cải mệnh, linh căn tái sinh'
  }
};

export const NEMESIS_SEVERITY_META: Record<string, { label: string; icon: string; badgeClass: string }> = {
  'Không Đội Trời Chung': { label: 'Không Đội Trời Chung', icon: '☠️', badgeClass: 'bg-red-950 text-red-300 border-red-500/60' },
  'Huyết Hải Thâm Cừu': { label: 'Huyết Hải Thâm Cừu', icon: '🩸', badgeClass: 'bg-rose-950 text-rose-300 border-rose-500/60' },
  'Đạo Tâm Xung Đột': { label: 'Đạo Tâm Xung Đột', icon: '⚡', badgeClass: 'bg-amber-950 text-amber-300 border-amber-500/60' },
  'Túc Mệnh Tranh Đoạt': { label: 'Túc Mệnh Tranh Đoạt', icon: '🌌', badgeClass: 'bg-purple-950 text-purple-300 border-purple-500/60' }
};

export const DAO_DEMON_TYPES_META: Record<string, { label: string; icon: string; badgeClass: string }> = {
  'CHẤP_NIỆM_QUÁ_KHỨ': { label: 'Chấp Niệm Quá Khứ', icon: '⛓️', badgeClass: 'bg-purple-950 text-purple-300 border-purple-500/50' },
  'SÁT_TÂM_CUỒNG_BẠO': { label: 'Sát Tâm Cuồng Bạo', icon: '👹', badgeClass: 'bg-red-950 text-red-300 border-red-500/50' },
  'BÌNH_CẢNH_CẢNH_GIỚI': { label: 'Bình Cảnh Cảnh Giới', icon: '🧱', badgeClass: 'bg-amber-950 text-amber-300 border-amber-500/50' },
  'SINH_TỬ_KIẾP_SỐ': { label: 'Sinh Tử Kiếp Số', icon: '⚡', badgeClass: 'bg-cyan-950 text-cyan-300 border-cyan-500/50' }
};

export const FACTION_AUTHORITY_META: Record<string, { label: string; icon: string; badgeClass: string }> = {
  'Đệ Tử Bình Thường': { label: 'Đệ Tử Ngoại Môn / Bình Thường', icon: '🥋', badgeClass: 'bg-gray-800 text-gray-300' },
  'Nòng Cốt / Chân Truyền': { label: 'Nòng Cốt / Chân Truyền', icon: '⭐', badgeClass: 'bg-blue-950 text-blue-300 border-blue-500/40' },
  'Chấp Chưởng Trọng Quyền': { label: 'Chấp Chưởng Trọng Quyền', icon: '👑', badgeClass: 'bg-amber-950 text-amber-300 border-amber-500/40' },
  'Lãnh Tụ Tối Cao': { label: 'Lãnh Tụ Tối Cao', icon: '🔱', badgeClass: 'bg-purple-950 text-purple-300 border-purple-500/50' }
};

export interface OralLoreSpeakerMeta {
  type: OralLoreSpeakerType;
  label: string;
  icon: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export const ORAL_LORE_SPEAKER_META: Record<OralLoreSpeakerType, OralLoreSpeakerMeta> = {
  THUYET_THU_NHAN: {
    type: 'THUYET_THU_NHAN',
    label: 'Thuyết Thư Nhân (Quán Trà / Khách Điếm)',
    icon: '🎙️',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    description: 'Người kể chuyện giang hồ gõ thước kinh đường, truyền tụng chiến tích với sự huyền bí và hào hùng'
  },
  CO_NHAN_HAN_VI: {
    type: 'CO_NHAN_HAN_VI',
    label: 'Cố Nhân Thuở Hàn Vi',
    icon: '🌾',
    color: '#10b981',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-300',
    description: 'Láng giềng nghèo khó, phu trạm, bà lão quán cháo nhớ về đứa trẻ gầy gò năm xưa với ánh mắt kiên định'
  },
  KE_THU_SONG_SOT: {
    type: 'KE_THU_SONG_SOT',
    label: 'Bại Tướng / Kẻ Thù Sống Sót',
    icon: '⚔️',
    color: '#ef4444',
    badgeBg: 'bg-red-950/70',
    badgeBorder: 'border-red-500/40',
    badgeText: 'text-red-300',
    description: 'Đối thủ run rẩy kể lại khoảnh khắc thanh kiếm rút ra, uy áp và sự kinh hoàng không thể quên'
  },
  DONG_MON_DE_TU: {
    type: 'DONG_MON_DE_TU',
    label: 'Đồng Môn / Đệ Tử Hậu Bối',
    icon: '📜',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-300',
    description: 'Hậu bối sùng kính truyền tai nhau từng bài học, ánh mắt cô độc lúc ngắm trăng trên vách đá'
  },
  TIEN_BOI_AN_THE: {
    type: 'TIEN_BOI_AN_THE',
    label: 'Tiền Bối Đại Năng Ẩn Thế',
    icon: '🏔️',
    color: '#a855f7',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-300',
    description: 'Lão quái ngàn năm đàm đạo bên bàn cờ, cảm thán trước đạo tâm sắc bén dị thường và thiên phú nghịch mệnh'
  },
  PHUC_DU_THUONG_DAN: {
    type: 'PHUC_DU_THUONG_DAN',
    label: 'Phàm Nhân / Thường Dân Thọ Ân',
    icon: '🏮',
    color: '#ec4899',
    badgeBg: 'bg-pink-950/70',
    badgeBorder: 'border-pink-500/40',
    badgeText: 'text-pink-300',
    description: 'Người dân từng được cứu giúp lập từ đường cúng bái, truyền tụng tấm lòng nhân ái ẩn sau vẻ ngoài lạnh lùng'
  },
  TAM_BAO_GIA_BI_CANH: {
    type: 'TAM_BAO_GIA_BI_CANH',
    label: 'Tầm Bảo Giả Bí Cảnh',
    icon: '🗝️',
    color: '#14b8a6',
    badgeBg: 'bg-teal-950/70',
    badgeBorder: 'border-teal-500/40',
    badgeText: 'text-teal-300',
    description: 'Tu sĩ mạo hiểm cùng tiến vào bí cảnh chứng kiến cuộc tranh đoạt thiên tài địa bảo sinh tử nghẹt thở'
  },
  GIAM_DINH_SU_BAO_CAC: {
    type: 'GIAM_DINH_SU_BAO_CAC',
    label: 'Giám Định Sư Đấu Giá Các',
    icon: '💎',
    color: '#06b6d4',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-500/40',
    badgeText: 'text-cyan-300',
    description: 'Trưởng lão giám bảo Đấu Giá Các / Tàng Bảo Các chấn động trước lai lịch thiên tài địa bảo vô giá'
  },
  KHI_LINH_THU_HO: {
    type: 'KHI_LINH_THU_HO',
    label: 'Khí Linh / Tàn Hồn Thủ Hộ',
    icon: '🌌',
    color: '#8b5cf6',
    badgeBg: 'bg-indigo-950/70',
    badgeBorder: 'border-indigo-500/40',
    badgeText: 'text-indigo-300',
    description: 'Thực thể cổ xưa thủ hộ bí cảnh kể lại thử thách đạo tâm khi giao phó truyền thừa cổ tiên'
  },
  DONG_DOI_NHIEM_VU: {
    type: 'DONG_DOI_NHIEM_VU',
    label: 'Đồng Đội / Chấp Sự Nhiệm Vụ',
    icon: '🎯',
    color: '#f59e0b',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    description: 'Đồng đội vào sinh ra tử trong tổ đội nhiệm vụ hoặc chấp sự phát lệnh lưu giữ bí mật chiến tích'
  },
  HO_DAO_GIA_HO_KIEP: {
    type: 'HO_DAO_GIA_HO_KIEP',
    label: 'Hộ Đạo Giả / Chứng Nhân Độ Kiếp',
    icon: '⚡',
    color: '#eab308',
    badgeBg: 'bg-yellow-950/70',
    badgeBorder: 'border-yellow-500/40',
    badgeText: 'text-yellow-300',
    description: 'Hộ đạo giả hộ kiếp, trưởng lão đại trận hoặc nhân chứng chứng kiến khoảnh khắc phá quan kinh thiên động địa'
  }
};

export interface TreasureLoreCategoryMeta {
  category: OralLoreTreasureCategory;
  label: string;
  icon: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export const TREASURE_LORE_CATEGORIES_META: Record<OralLoreTreasureCategory, TreasureLoreCategoryMeta> = {
  THIEN_TAI_DIA_BAO: {
    category: 'THIEN_TAI_DIA_BAO',
    label: 'Thiên Tài Địa Bảo',
    icon: '🌿',
    badgeBg: 'bg-emerald-950/70',
    badgeBorder: 'border-emerald-500/40',
    badgeText: 'text-emerald-300',
    description: 'Thảo dược vạn năm, linh quả thánh thụ, tiên đan cửu chuyển, thần kim khoáng thạch'
  },
  BI_CANH_DONG_THIEN: {
    category: 'BI_CANH_DONG_THIEN',
    label: 'Bí Cảnh & Động Thiên',
    icon: '🗝️',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-500/40',
    badgeText: 'text-purple-300',
    description: 'Cổ tiên bí cảnh, cấm khu vẫn lạc, thượng cổ chiến trường, động thiên phúc địa'
  },
  TRUYEN_THUA_CO_TIEN: {
    category: 'TRUYEN_THUA_CO_TIEN',
    label: 'Truyền Thừa Cổ Tiên',
    icon: '📜',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-500/40',
    badgeText: 'text-amber-300',
    description: 'Tàn hồn đại đế, ngọc giản khai mạch, tiên giai công pháp, khế ước khí linh'
  },
  TRUONG_SINH_CO_THU: {
    category: 'TRUONG_SINH_CO_THU',
    label: 'Cây Trường Sinh & Thần Mộc',
    icon: '🌳',
    badgeBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-400/50',
    badgeText: 'text-emerald-300',
    description: 'Truyền thuyết Cây Trường Sinh viễn cổ, cội rễ thông thiên, giọt sương bất tử, kết mạch sinh mệnh và đại kiếp'
  },
  NHIEM_VU_BAO_VAT: {
    category: 'NHIEM_VU_BAO_VAT',
    label: 'Nhiệm Vụ Đoạt Bảo & Thí Luyện',
    icon: '🎯',
    badgeBg: 'bg-rose-950/70',
    badgeBorder: 'border-rose-500/40',
    badgeText: 'text-rose-300',
    description: 'Các chuyến thi hành nhiệm vụ tông môn, huyền thưởng giang hồ đoạt thiên tài địa bảo, giải cứu và phá cấm chế'
  },
  DOT_PHA_CANH_GIOI: {
    category: 'DOT_PHA_CANH_GIOI',
    label: 'Đột Phá Cảnh Giới & Thiên Kiếp',
    icon: '⚡',
    badgeBg: 'bg-yellow-950/70',
    badgeBorder: 'border-yellow-500/40',
    badgeText: 'text-yellow-300',
    description: 'Biến cố phá vỡ bình cảnh, độ lôi kiếp cửu trùng, luyện hóa thiên tài địa bảo để niết bàn trùng sinh'
  },
  GIAI_THOAI_CHUNG: {
    category: 'GIAI_THOAI_CHUNG',
    label: 'Giai Thoại Chung',
    icon: '✨',
    badgeBg: 'bg-blue-950/70',
    badgeBorder: 'border-blue-500/40',
    badgeText: 'text-blue-300',
    description: 'Hành trình giang hồ, chiến tích ân oán và sinh hoạt đời thường'
  }
};

// =========================================================================
// PRESET TRAJECTORY ROUTING PROFILES (MASTER REFERENCE BIBLE)
// =========================================================================

export const PRESET_TRAJECTORY_PROFILES: CharacterTrajectoryRoutingProfile[] = [
  // -----------------------------------------------------------------------
  // 1. LÂM TIÊU - TRÙNG SINH KIẾM TÔN / VÔ CỰC ĐẠO CHỦ
  // -----------------------------------------------------------------------
  {
    characterId: 'char_lam_tieu',
    characterName: 'Lâm Tiêu',
    characterAlias: 'Cửu U Kiếm Tiên / Vô Cực Đạo Chủ',
    overviewPhilosophy:
      'Đạo tâm trảm thiên nghịch mệnh, lấy tình nhập kiếm. Kiếp trước vì quá kiêu ngạo cô độc mà bị liên thủ vây hãm; kiếp này trọng tình trọng nghĩa, thề bảo hộ người thân đến hơi thở cuối cùng.',
    lifeDestinyVow:
      'Trảm sát Huyết Cốt Ma Tôn, cứu mẫu thân thoát khỏi thiên lao Thượng Giới, đúc lại Thông Thiên Tiên Lộ bảo hộ thương sinh.',
    relations: [
      {
        id: 'rel_lt_01',
        category: 'CHA_ME',
        targetName: 'Lâm Chấn Thiên',
        targetRoleOrTitle: 'Phụ Thân - Cựu Tộc Trưởng Chi Thứ Lâm Gia',
        intimacyLevel: 95,
        status: 'Còn Sống',
        originStory:
          'Từng là thiên tài của Lâm gia, vì che giấu huyết mạch dị chủng của con trai mà liều mạng chống cự trưởng lão đoàn, bị đánh phế đan điền, cam chịu lưu lạc nơi biên cảnh.',
        currentDynamics:
          'Được Lâm Tiêu dùng ngàn năm linh dược chữa lành kinh mạch, hiện an dưỡng tại Hậu Sơn Thái Hư Tông.',
        karmicTies: 'Công ơn sinh thành dưỡng dục nặng tựa Thái Sơn; lời hứa phục hồi vinh quang cho cha.'
      },
      {
        id: 'rel_lt_02',
        category: 'CHA_ME',
        targetName: 'Ninh Tố Vân',
        targetRoleOrTitle: 'Mẫu Thân - Thánh Nữ Bắc Minh Tiên Các (Thượng Giới)',
        intimacyLevel: 98,
        status: 'Bị Giam Cầm / Phong Ấn',
        originStory:
          'Thánh nữ hạ phàm cảm mến phụ thân Lâm Tiêu. Vì nghịch thiên kết hôn với phàm nhân, bà bị gia tộc Thượng Giới cưỡng chế bắt về giam cầm tại Cửu U Hàn Ngục.',
        currentDynamics:
          'Để lại cho Lâm Tiêu một khối Cổ Ngọc Tụ Linh và ký ức phong ấn; hằng đêm Lâm Tiêu đều hướng về trời cao ngưng tụ sát ý.',
        karmicTies: 'Mục tiêu tối thượng của đời tu tiên: Đăng lâm Thượng Giới, chém nát thiên lao đoàn tụ phụ mẫu.'
      },
      {
        id: 'rel_lt_03',
        category: 'GIA_TOC',
        targetName: 'Lâm gia Thanh Vân Thành',
        targetRoleOrTitle: 'Gia Tộc Bản Thổ - Trưởng Lão Đoàn & Tộc Nhân',
        intimacyLevel: -40,
        status: 'Còn Sống',
        originStory:
          'Gia tộc thế gia địa phương đầy rẫy tranh đoạt. Khi Lâm Tiêu bị phế linh căn thuở 14 tuổi, chúng ruồng bỏ hai cha con, cướp đoạt phủ đệ và đuổi ra khỏi gia phả.',
        currentDynamics:
          'Khi Lâm Tiêu quật khởi trở thành đệ nhất Chân truyền, chúng quỳ gối xin tha thứ nhưng Lâm Tiêu dứt khoát đoạn tuyệt ân oán tông tộc, chỉ bảo vệ nhánh chi thứ của cha.',
        karmicTies: 'Dứt áo ra đi, nhân quả gia tộc chấm dứt tại lôi đài tộc hội.'
      },
      {
        id: 'rel_lt_04',
        category: 'VO_DAO_LU',
        targetName: 'Lạc Thanh Hàn',
        targetRoleOrTitle: 'Chính Thê / Đạo Lữ - Băng Phách Tiên Tử Tuyết Kiếm Phong',
        intimacyLevel: 100,
        status: 'Còn Sống',
        originStory:
          'Gặp nhau tại Hàn Đàm thí luyện bí cảnh. Cả hai cùng trải qua sinh tử chống lại Yêu Vương; nàng vì chàng mà trúng hàn độc chí mạng, chàng vì nàng mà đốt máu lấy dương hỏa chữa trị.',
        currentDynamics:
          'Đã cử hành lễ song tu đạo lữ dưới sự chứng kiến của toàn thể Thái Hư Môn; cùng tâm ý tương thông hợp kiếm phá thiên hạ.',
        karmicTies: 'Thệ tử tương tùy, ba ngàn dặm tiên lộ chỉ có nàng cùng chung bước.'
      },
      {
        id: 'rel_lt_05',
        category: 'CON_CAI',
        targetName: 'Lâm Thần',
        targetRoleOrTitle: 'Hậu Duệ Đích Tử - Thiếu Kiếm Chủ Đời Kế Tiếp',
        intimacyLevel: 95,
        status: 'Còn Sống',
        originStory:
          'Sinh ra mang Hỗn Độn Băng Linh Song Thể, dị tượng trời đổ mưa sen ngọc. Lâm Tiêu hết lòng bảo bọc dạy dỗ kiếm đạo nhưng nghiêm khắc rèn luyện đạo tâm.',
        currentDynamics:
          'Đang khổ luyện tại Vấn Kiếm Đỉnh, phong thái trầm tĩnh hệt như cha năm xưa.',
        karmicTies: 'Huyết mạch truyền thừa, gửi gắm tương lai bảo hộ thương sinh.'
      },
      {
        id: 'rel_lt_06',
        category: 'BAN_BE',
        targetName: 'Thạch Phá Thiên',
        targetRoleOrTitle: 'Huynh Đệ Sinh Tử - Cuồng Thể Man Tôn',
        intimacyLevel: 90,
        status: 'Còn Sống',
        originStory:
          'Quen biết từ thời lôi đài đệ tử ngoại môn. Từng lưng dựa lưng đối đầu với ngàn đầu Huyết Lang, chia nhau giọt nước cuối cùng nơi sa mạc hoang cổ.',
        currentDynamics:
          'Lĩnh ngộ Cổ Thần Quyền Pháp, luôn là tấm khiên vững chắc nhất bảo vệ sau lưng Lâm Tiêu.',
        karmicTies: 'Ân tình huynh đệ một chén rượu sinh tử, có nạn cùng chịu.'
      },
      {
        id: 'rel_lt_07',
        category: 'HANG_XOM',
        targetName: 'Trương Đồ Tể & Vương Lão Bá',
        targetRoleOrTitle: 'Láng Giềng Thôn Đông - Thuở Thiếu Niên Hàn Vi',
        intimacyLevel: 75,
        status: 'Đã Tọa Hóa / Bỏ Mạng',
        originStory:
          'Thuở nhỏ khi cha bị phế, hai cha con sống nghèo khó ở lán cỏ góc làng. Trương đồ tể thỉnh thoảng giấu miếng thịt mỡ cho, Vương lão bá dạy cách bẫy thú rừng sống qua mùa đông giá rét.',
        currentDynamics:
          'Đã qua đời vì tuổi thọ phàm nhân; Lâm Tiêu đã xây bia mộ ngọc và ban phước trạch cho con cháu ba đời của họ vinh hoa bình an.',
        karmicTies: 'Món nợ ân nghĩa một bát cơm nguội ngày đông ấm hơn vạn viên linh đan.'
      },
      {
        id: 'rel_lt_08',
        category: 'TONG_MON',
        targetName: 'Thái Hư Kiếm Tông',
        targetRoleOrTitle: 'Chính Phái Thánh Môn Cội Nguồn - Vấn Kiếm Các',
        intimacyLevel: 85,
        status: 'Còn Sống',
        originStory:
          'Nơi Lâm Tiêu bái sư nhập đạo. Dù từng có vài trưởng lão bảo thủ nghi ngờ linh căn của chàng, nhưng đại điện Chưởng môn luôn giữ vững công đạo và bao bọc đệ tử.',
        currentDynamics:
          'Lâm Tiêu trở thành Thiếu Kiếm Tôn, gánh vác cờ xí tông môn chống lại Ma Triều.',
        karmicTies: 'Nơi khởi nguồn kiếm đạo, thề không để tông môn bị diệt như kiếp trước.'
      },
      {
        id: 'rel_lt_09',
        category: 'SU_HUYNH_DE',
        targetName: 'Vấn Kiếm Lão Nhân & Mộ Dung Kiếm',
        targetRoleOrTitle: 'Sư Tôn Khai Tâm & Đại Sư Huynh Trưởng Môn Chân Truyền',
        intimacyLevel: 92,
        status: 'Còn Sống',
        originStory:
          'Sư tôn đã truyền thụ Cửu U Kiếm Điển và truyền chân khí cứu mạng Lâm Tiêu lúc tẩu hỏa; Đại sư huynh luôn thay chàng giải quyết rắc rối thế tục.',
        currentDynamics:
          'Cùng nhau trấn giữ Thiên Ngoại Kiếm Trận, sư đồ huynh đệ đồng lòng như một khối.',
        karmicTies: 'Sư đồ tình thâm, ân sư như cha thứ hai.'
      },
      {
        id: 'rel_lt_10',
        category: 'DE_TU',
        targetName: 'Diệp Thần',
        targetRoleOrTitle: 'Đại Đệ Tử Chân Truyền - Thiên Mệnh Thiếu Niên Nghịch Tập',
        intimacyLevel: 88,
        status: 'Còn Sống',
        originStory:
          'Một thiếu niên củi mục bị từ hôn và phế kinh mạch, được Lâm Tiêu nhìn thấy hình bóng của chính mình năm xưa nên thu nhận làm chân truyền.',
        currentDynamics:
          'Được Lâm Tiêu trao cho Thái Hư Kiếm Quyết tàn thiên, đang tung hoành tại Nam Lĩnh Thí Luyện.',
        karmicTies: 'Ngọn lửa kiếm đạo được kế thừa và truyền mãi qua các thế hệ.'
      },
      {
        id: 'rel_lt_11',
        category: 'KE_THU',
        targetName: 'Huyết Cốt Ma Tôn',
        targetRoleOrTitle: 'Túc Địch Định Mệnh - Đệ Nhất Ma Tôn U Minh Vực',
        intimacyLevel: -100,
        status: 'Còn Sống',
        originStory:
          'Kẻ cầm đầu vây hãm Lâm Tiêu tại Đoạn Hồn Nhai kiếp trước, dùng vạn hồn huyết tế luyện kiếm khiến sư môn tan hoang.',
        currentDynamics:
          'Đang hồi phục thương tích tại Vô Gian Ma Uyên, ngấm ngầm cài cắm nội gián khắp các tông phái.',
        karmicTies: 'Huyết hải thâm cừu không đội trời chung, nhất định phải băm thây vạn đoạn.'
      }
    ],
    milestones: [
      {
        id: 'ms_lt_01',
        timeAnchor: 'Năm 6 tuổi',
        type: 'CUOC_CHIA_LY',
        title: 'Mẫu Thân Bị Cưỡng Bắt & Phụ Thân Phế Kinh Mạch',
        location: 'Thanh Vân Thành Ngoại Vi • Lán Thảo Dược Bên Rừng',
        involvedCharacters: ['Lâm Chấn Thiên', 'Ninh Tố Vân', 'Thần Tướng Thượng Giới'],
        description:
          'Gia tộc Thượng Giới giáng lôi đình xé rách hư không, cưỡng ép bắt mẫu thân Ninh Tố Vân trở về. Phụ thân liều chết ngăn cản bị một chưởng phế hủy đan điền. Mẫu thân trước khi đi để lại giọt lệ máu và khối cổ ngọc.',
        cultivationStateBeforeAndAfter: 'Phàm nhân phàm cốt (Chưa thức tỉnh) -> Quyết chí tu tiên',
        psychologicalTransformation:
          'Từ đứa trẻ hồn nhiên trở nên trầm lặng khác thường, trong lòng gieo xuống hạt mầm nghịch thiên cải mệnh mãnh liệt.',
        karmicEcho: 'Mối thù chia rẽ gia đình là động lực tu luyện kiên định nhất đời chàng.',
        novelSnippetDraft:
          'Sấm sét xé rách màn đêm đen đặc của Thanh Vân Thành. Đứa trẻ sáu tuổi quỳ trong vũng bùn, hai tay siết chặt nắm đất trộn lẫn máu tươi của cha mình. Nhìn bóng lưng mẫu thân biến mất trong khe nứt ngân quang chói lọi, ánh mắt cậu không có nước mắt, chỉ có ngọn lửa đen ngòm của sự thù hận và quyết tâm rực cháy...'
      },
      {
        id: 'ms_lt_02',
        timeAnchor: 'Năm 14 tuổi',
        type: 'CO_DUYEN_KY_NGO',
        title: 'Đọa Hồn Nhai Trụy Lạc & Nhặt Được Thái Sơ Kiếm Thai',
        location: 'Đoạn Hồn Nhai Đáy Vực • Vô Cực Kiếm Quật Thượng Cổ',
        involvedCharacters: ['Tàn Hồn Vô Danh Kiếm Tôn'],
        description:
          'Bị đệ tử Lâm gia hãm hại đẩy xuống Đoạn Hồn Nhai ngỡ đã thịt nát xương tan. Ngờ đâu cơ duyên đưa chàng lọt vào cổ trận động thiên, gặp được kiếm thai hỗn độn và tàn hồn truyền thừa khai thiên tịch địa.',
        cultivationStateBeforeAndAfter: 'Luyện Khí Tầng 1 (Kinh mạch tàn khuyết) -> Trúc Cơ Nghịch Thiên',
        psychologicalTransformation:
          'Hiểu rõ sự tàn khốc của nhân gian, rèn đúc nên Đạo tâm vững như sắt đá, sát phạt quả đoán.',
        karmicEcho: 'Bắt đầu con đường tu luyện Hỗn Độn Kiếm Đạo độc nhất vô nhị.',
        novelSnippetDraft:
          'Dưới đáy vực sâu ba ngàn trượng đầy khí chướng độc, thanh kiếm rỉ sét bỗng cất tiếng ngân vang thấu tận chín tầng mây. Vô vàn kiếm ý thượng cổ ùa vào kinh mạch vỡ vụn, nghiền nát phàm cốt, đúc lại chân thân Hỗn Độn Kiếm Thai rực rỡ kim quang!'
      },
      {
        id: 'ms_lt_03',
        timeAnchor: 'Năm 16 tuổi',
        type: 'TU_LUYEN',
        title: 'Nhập Môn Thái Hư & Nhất Kiếm Định Càn Khôn',
        location: 'Thái Hư Kiếm Tông • Lôi Đài Thí Luyện Ngoại Môn',
        involvedCharacters: ['Thạch Phá Thiên', 'Mộ Dung Kiếm', 'Vấn Kiếm Lão Nhân'],
        description:
          'Xuất hiện tại ngày hội bái sư Thái Hư Môn với thân phận tán tu áo gai. Một kiếm chém vỡ chín khối bia đá trắc thí, đánh bại đệ tử thế gia, kết bái huynh đệ sinh tử với Thạch Phá Thiên.',
        cultivationStateBeforeAndAfter: 'Trúc Cơ Sơ Kỳ -> Trúc Cơ Đỉnh Phong',
        psychologicalTransformation:
          'Tự tin xuất thế, tìm thấy sư môn chân chính để gửi gắm lòng trung thành.',
        karmicEcho: 'Đặt nền móng cho vị thế đệ nhất Chân truyền tương lai.',
        novelSnippetDraft:
          'Một tiếng keng vang dội khắp quảng trường ngọc bích. Thanh kiếm gỗ trong tay thiếu niên áo gai vung lên nhẹ tựa lông hồng, nhưng lại cuốn theo kiếm phong cuồn cuộn thổi bạt mười tám đệ tử thế gia, khiến toàn bộ trưởng lão trên khán đài đồng loạt đứng bật dậy!'
      },
      {
        id: 'ms_lt_04',
        timeAnchor: 'Năm 20 tuổi',
        type: 'BUOC_NGOAT_THAY_DOI',
        title: 'Băng Hỏa Sinh Tử & Định Ước Song Tu Với Lạc Thanh Hàn',
        location: 'Bắc Hoang Hàn Đàm • Cổ Băng Tiên Cung',
        involvedCharacters: ['Lạc Thanh Hàn', 'Cửu Đầu U Băng Giao'],
        description:
          'Cùng Lạc Thanh Hàn bị vây khốn trong hang ổ của Thần thú Băng Giao. Nàng bộc phát Cực Âm Hàn Độc sắp đóng băng thần hồn; Lâm Tiêu không ngần ngại thiêu đốt tinh huyết dùng Thái Dương Chân Hỏa ôm chặt nàng suốt ba ngày ba đêm để hóa giải.',
        cultivationStateBeforeAndAfter: 'Trúc Cơ Viên Mãn -> Kết Đan Cực Phẩm (Cửu Chuyển Hỗn Độn Kim Đan)',
        psychologicalTransformation:
          'Từ một kiếm khách chỉ biết sát phạt trở thành người thấu hiểu ái tình và sự bao dung; kiếm ý có thêm linh hồn.',
        karmicEcho: 'Gắn kết số mệnh hai đại thiên tài, mở ra kiếm pháp hợp bích uy chấn thiên hạ.',
        novelSnippetDraft:
          'Giữa hang động băng hàn nghìn năm, hai bóng hình hòa làm một trong ánh sáng đan xen giữa lửa đỏ và băng lam. Hơi thở giao hòa, nhịp tim đồng điệu. Nàng mở mắt nhìn chàng, khóe môi khẽ nở nụ cười hiếm hoi: "Từ nay về sau, kiếm của chàng đi đâu, mạng của Thanh Hàn theo đó..."'
      },
      {
        id: 'ms_lt_05',
        timeAnchor: 'Năm 28 tuổi',
        type: 'SU_MENH',
        title: 'Huyết Sát Ma Triều & Khắc Lời Thề Bảo Hộ Sư Môn',
        location: 'Thái Hư Kiếm Tông Hộ Sơn Đại Trận • Đoạn Kiếm Phong',
        involvedCharacters: ['Huyết Cốt Ma Tôn', 'Vấn Kiếm Lão Nhân', 'Đồng Môn Đệ Tử'],
        description:
          'Huyết Cốt Ma Tôn dẫn mười vạn ma tu vây hãm Thái Hư Môn. Lâm Tiêu đơn thương độc mã xuất kích, lập trận Tru Tiên trảm sát ba đại Ma Tướng, thề huyết tế kiếm bảo vệ toàn vẹn sư môn.',
        cultivationStateBeforeAndAfter: 'Kim Đan Hậu Kỳ -> Kim Đan Cực Cảnh (Lĩnh ngộ Kiếm Vực sơ khai)',
        psychologicalTransformation:
          'Gánh vác trọng trách bảo vệ hàng vạn sinh mạng đệ tử, trở thành linh hồn trụ cột của chính đạo.',
        karmicEcho: 'Trở thành kẻ thù số một trong danh sách tiêu diệt của Ma Giới.',
        novelSnippetDraft:
          'Gió tanh mưa máu rền rĩ. Lâm Tiêu đứng sừng sững trên đỉnh Đoạn Kiếm Phong, bạch y nhuốm đỏ máu ma tu. Mũi kiếm chỉ thẳng vào ma vân cuồn cuộn trên trời cao, thanh âm lạnh buốt truyền khắp trăm dặm: "Ai dám bước qua ranh giới này nửa bước, Lâm Tiêu ta trảm sạch cửu tộc!"'
      },
      {
        id: 'ms_lt_06',
        timeAnchor: 'Năm 80 tuổi',
        type: 'HOI_NGO_TUONG_PHUNG',
        title: 'Hội Ngộ Phụ Thân Sau Trăm Năm & Tái Thiết Chi Thứ',
        location: 'Thanh Vân Thành Ngoại Vi • Trang Viên Hậu Sơn Mới',
        involvedCharacters: ['Lâm Chấn Thiên', 'Lạc Thanh Hàn', 'Tộc Nhân Chi Thứ'],
        description:
          'Sau khi đạt Nguyên Anh Kỳ, Lâm Tiêu trở về quê hương tìm lại cha già. Trải qua bao năm tháng phân ly, hai cha con ôm chầm lấy nhau giữa mưa lệ. Chàng dâng linh dược kéo dài thọ mệnh nghìn năm cho cha.',
        cultivationStateBeforeAndAfter: 'Kim Đan Viên Mãn -> Đột Phá Nguyên Anh Đại Đạo',
        psychologicalTransformation:
          'Cởi bỏ nút thắt tâm ma sâu thẳm nhất, đạo tâm đạt đến cảnh giới vô khuyết viên mãn.',
        karmicEcho: 'Nguyên Anh viên mãn không còn tỳ vết, chuẩn bị cho đại đạo Hóa Thần.',
        novelSnippetDraft:
          'Người đàn ông tóc bạc run rẩy đánh rơi chiếc cuốc con. Nhìn bóng hình anh tuấn sừng sững trong mây hạ xuống, nước mắt lão chảy tràn trên những nếp nhăn thời gian: "Tiêu nhi... con thật sự đã trở về rồi sao?"'
      },
      {
        id: 'ms_lt_07',
        timeAnchor: 'Năm 300 tuổi',
        type: 'SU_MENH',
        title: 'Khai Tông Lập Phái & Thu Đệ Tử Thiên Mệnh Diệp Thần',
        location: 'Côn Luân Tiên Sơn • Vô Cực Kiếm Các',
        involvedCharacters: ['Diệp Thần', 'Lâm Thần', 'Chư Sơn Trưởng Lão'],
        description:
          'Lâm Tiêu lập nên Vô Cực Kiếm Các độc lập, chiêu mộ thiên hạ kiếm tu. Nhìn thấy thiếu niên Diệp Thần bị hủy hôn chịu nhục, chàng nhớ lại bản thân năm xưa và thu nhận làm đệ tử đích truyền.',
        cultivationStateBeforeAndAfter: 'Hóa Thần Viên Mãn -> Luyện Hư Cảnh Giới',
        psychologicalTransformation:
          'Từ một kiếm tu đơn độc chuyển thành tông sư truyền đạo, tầm mắt bao quát toàn bộ thương sinh thiên địa.',
        karmicEcho: 'Đào tạo nên thế hệ kiếm đạo thiên kiêu kế tiếp.',
        novelSnippetDraft:
          '"Ngươi có dám vì kiếm trong lòng mà vứt bỏ sinh tử?" Lâm Tiêu cúi nhìn thiếu niên đang quỳ gối đầy thương tích. Thiếu niên ngẩng đầu, ánh mắt lóe lên ngọn lửa bất khuất: "Đệ tử nguyện bái Kiếm Tôn làm sư phụ, dẫu thịt nát xương tan cũng không hối tiếc!"'
      },
      {
        id: 'ms_lt_08',
        timeAnchor: 'Năm 800 tuổi',
        type: 'HOI_NGO_TUONG_PHUNG',
        title: 'Phi Thăng Thượng Giới & Phá Thiên Lao Cứu Mẫu Thân',
        location: 'Bắc Minh Thần Vực • Cửu U Hắc Ngục Tối Cao',
        involvedCharacters: ['Ninh Tố Vân', 'Lạc Thanh Hàn', 'Huyết Cốt Ma Tôn', 'Thượng Giới Lão Tổ'],
        description:
          'Lâm Tiêu cùng Lạc Thanh Hàn phá toái hư không, độ kiếp phi thăng. Nhất kiếm chém đứt xiềng xích vạn năm của Cửu U Hàn Ngục, đón mẫu thân trở về trước sự kính phục kinh hoàng của toàn thể chư tiên Thượng Giới.',
        cultivationStateBeforeAndAfter: 'Đại Thừa Đỉnh Phong -> Chân Tiên Vô Cực Đạo Chủ',
        psychologicalTransformation:
          'Đạt tới cảnh giới tối cao của Tiên Đạo: Thần thông vô tận nhưng lòng son không đổi, đoàn tụ gia đình trọn vẹn.',
        karmicEcho: 'Hoàn thành lời thề suốt 800 năm của một đứa trẻ năm 6 tuổi.',
        novelSnippetDraft:
          'Một tiếng rắc vang lên như sấm sét mở cõi. Khóa vàng phong ấn nghìn trượng của Cửu U Ngục vỡ vụn thành trăm ngàn mảnh tinh tú. Giữa luồng sáng rực rỡ, Lâm Tiêu quỳ xuống trước mặt người phụ nữ tiều tụy tóc hoa râm: "Mẫu thân, hài nhi đến đón người về nhà!"'
      }
    ],
    geographicAtlas: [
      {
        id: 'geo_lt_01',
        name: 'Thanh Thạch Thôn',
        type: 'LANG_MAC',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 1: Thuở Hàn Vi (Năm 0 - 14 tuổi)',
        realmOrRegion: 'Đông Vực • Thanh Vân Châu Ngoại Vi',
        terrainAndAura: 'Thôn dã hẻo lánh dưới chân núi, linh khí mỏng manh, dân cư phàm nhân mộc mạc, khói bếp chiều tà',
        requiredTasksOrTrials: 'Cùng phụ thân thu thập thảo dược mưu sinh, chống chọi sự bắt nạt áp bức của trang chủ Lâm gia phân bộ',
        conquestOrLegacy: 'Để lại lán cỏ kỷ niệm; sau khi thành đạo lập từ đường bảo hộ thôn nhân muôn đời thái bình no ấm',
        novelSceneryProse: 'Con đường đất đỏ ngoằn ngoèo dẫn qua rặng tre già. Mỗi khi hoàng hôn buông xuống, tiếng mõ trâu lốc cốc hòa cùng tiếng cười đùa của lũ trẻ chăn trâu tạo nên bức tranh phàm trần thanh bình mà suốt đời người tu tiên khó lòng tìm lại...'
      },
      {
        id: 'geo_lt_02',
        name: 'Thanh Vân Tiên Thành',
        type: 'THANH_TRI',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 1: Thuở Hàn Vi (Năm 0 - 14 tuổi)',
        realmOrRegion: 'Đông Vực • Thanh Vân Châu Cốt Lõi',
        terrainAndAura: 'Đô thị phồn hoa sầm uất, tu sĩ Luyện Khí và phàm nhân sống đan xen, phường thị buôn bán đan dược và bùa chú tấp nập',
        requiredTasksOrTrials: 'Tham gia hội đấu giá mua Cố Bản Đan cho cha, đối đầu với chấp sự hống hách của thế gia đệ tử',
        conquestOrLegacy: 'Nhất kiếm chém đứt biển hiệu phòng đấu giá khi bị cướp đoạt bảo vật, khắc ghi danh tiếng thiếu niên cuồng kiếm',
        novelSceneryProse: 'Đèn lồng huyền lăng thắp sáng như sao sa dọc theo phố phường đá xanh. Dòng người tu sĩ áo bào phiêu dật, tiếng rao bán linh đan hạ phẩm rộn rã át cả tiếng chuông gác thành...'
      },
      {
        id: 'geo_lt_03',
        name: 'Đoạn Hồn Nhai & Cổ Kiếm Quật',
        type: 'BI_CANH_DONG_THIEN',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 1: Bước Ngoặt Trụy Lạc (Năm 14 tuổi)',
        realmOrRegion: 'Thanh Vân Cấm Địa Sâu Ba Ngàn Trượng',
        terrainAndAura: 'Vực thẳm không đáy mây mù hắc ám bao phủ, cương phong róc xương, khí độc u minh, sát khí kiếm ý viễn cổ cuộn trào',
        requiredTasksOrTrials: 'Sinh tử đào thoát khi bị đẩy xuống vực, vượt qua kiếm trận khảo nghiệm của tàn hồn Vô Danh Kiếm Tôn',
        conquestOrLegacy: 'Thức tỉnh Thái Sơ Hỗn Độn Kiếm Thai, đúc lại 108 khiếu huyệt và kinh mạch thần bí nghìn năm hiếm gặp',
        novelSceneryProse: 'Gió rít gào như tiếng khóc của vạn oan hồn. Dưới đáy vực đen đặc, những phiến đá dựng đứng như những thanh cự kiếm chém rách bầu trời, toát ra hàn quang thấu tận cốt tủy...'
      },
      {
        id: 'geo_lt_04',
        name: 'Thái Hư Kiếm Tông • Vấn Kiếm Đỉnh',
        type: 'TONG_MON_THANH_DIA',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 2: Bái Môn Nhập Đạo (Năm 15 - 25 tuổi)',
        realmOrRegion: 'Trung Châu Tiên Vực • Thái Hư Sơn Mạch',
        terrainAndAura: 'Chín chín ngọn tiên phong lơ lửng giữa biển mây, linh tuyền thác đổ như dải ngân hà, hạc trắng bay lượn, kiếm khí bàng bạc',
        requiredTasksOrTrials: 'Vượt qua chín ải lôi đài ngoại môn, bái sư Vấn Kiếm Lão Nhân, bảo vệ tông môn trước mười vạn ma triều',
        conquestOrLegacy: 'Được phong làm Thiếu Kiếm Tôn, lập tượng đá kiếm ý trên đỉnh Vấn Kiếm lưu truyền hậu thế muôn đời',
        novelSceneryProse: 'Sương sớm bao phủ các bậc thang ngọc bích dẫn lên đỉnh Vấn Kiếm. Hàng ngàn đệ tử đồng phục bạch y cùng rút kiếm, kiếm quang chói lòa như ngàn vầng thái dương đồng loạt nhô lên khỏi biển mây nghìn trượng...'
      },
      {
        id: 'geo_lt_05',
        name: 'Bắc Hoang Hàn Đàm & Cổ Băng Tiên Cung',
        type: 'BI_CANH_DONG_THIEN',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 2: Tầm Bảo & Định Duyên (Năm 20 tuổi)',
        realmOrRegion: 'Bắc Cực Hoang Dã • Băng Vực Vĩnh Cửu',
        terrainAndAura: 'Băng thiên tuyết địa âm 80 độ, mặt hồ đóng băng ngàn năm xanh ngắt, bông tuyết như lông ngỗng bay mù mịt',
        requiredTasksOrTrials: 'Săn giết Băng Hải Thần Thú Cửu Đầu Giao, giải cứu Lạc Thanh Hàn và sưởi ấm tâm mạch hóa giải hàn độc',
        conquestOrLegacy: 'Đoạt được Băng Phách Thần Tinh, hoàn thành định ước đạo lữ song tu với Băng Phách Thánh Nữ',
        novelSceneryProse: 'Không gian tĩnh lặng đến rợn người, chỉ có tiếng gió tuyết rít từng cơn qua những cột băng khổng lồ tựa tháp ngọc. Dưới đáy hồ trong suốt, những luồng hàn khí xanh lam chập chờn như ma trơi...'
      },
      {
        id: 'geo_lt_06',
        name: 'Vạn Tinh Hải Phù Không Tiên Thành',
        type: 'THANH_TRI',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 3: Tung Hoành Tứ Hải (Năm 26 - 100 tuổi)',
        realmOrRegion: 'Nam Hải Vực • Vạn Đảo Tinh Thần',
        terrainAndAura: 'Thành trì khổng lồ treo ngược giữa chín tầng trời mượn tinh lực đại trận nâng đỡ, lâu đài bằng lưu ly ngọc bích',
        requiredTasksOrTrials: 'Tham gia Đại Hội Đấu Giá Vạn Tinh, đánh bại công tử thánh địa đoạt lấy Cửu Chuyển Hoán Hồn Thảo',
        conquestOrLegacy: 'Thiết lập cứ điểm Vô Cực Thương Minh, hội ngộ bằng hữu cũ Thạch Phá Thiên',
        novelSceneryProse: 'Về đêm, cả thành trì rực sáng như một ngôi sao rơi xuống mặt biển. Từng đoàn lâu thuyền phi hành khổng lồ chở đầy bảo vật lướt êm qua các dải mây dạ quang, tiếng sáo trúc văng vẳng từ các trà lâu lơ lửng...'
      },
      {
        id: 'geo_lt_07',
        name: 'Vô Gian Ma Uyên',
        type: 'VUNG_DAT_SON_HAI',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 3: Phục Thù Ma Triều (Năm 80 tuổi)',
        realmOrRegion: 'Tây Vực Ma Cực • Khe Nứt Đáy Đất',
        terrainAndAura: 'Huyết hải cuộn sóng, bầu trời đỏ quạch ma vân, dung nham đen chảy róc rách, mùi lưu huỳnh và tanh nồng nặc',
        requiredTasksOrTrials: 'Đột phá sào huyệt Huyết Cốt Ma Tôn, phá hủy Cửu U Huyết Tế Trận, trảm sát ba đại Ma Tướng',
        conquestOrLegacy: 'Chém đứt ma nguyên của phân thân Ma Tôn, đoạt lại tàn hồn của các đồng môn tử trận',
        novelSceneryProse: 'Mặt đất nứt toác như mai rùa rỉ máu. Từng cột dung nham hắc hỏa phun trào xé rách màn sương máu đặc quánh, tiếng quỷ khóc thần gào rền rĩ suốt ngày đêm...'
      },
      {
        id: 'geo_lt_08',
        name: 'Côn Luân Tiên Sơn • Vô Cực Kiếm Các',
        type: 'TONG_MON_THANH_DIA',
        status: 'DANG_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 4: Khai Tông Lập Đạo (Năm 300 tuổi)',
        realmOrRegion: 'Đại Thiên Thế Giới • Trục Cốt Lõi',
        terrainAndAura: 'Vạn đạo linh mạch tụ hội, mây lành phủ quanh, cây bồ đề ngàn năm tỏa hương thơm thanh khiết',
        requiredTasksOrTrials: 'Chiêu mộ thiên hạ kiếm tu, truyền dạy Hỗn Độn Kiếm Kinh, rèn luyện đệ tử Diệp Thần và hậu duệ Lâm Thần',
        conquestOrLegacy: 'Trở thành đệ nhất Thánh Địa Kiếm Đạo của nhân tộc, được tôn làm Vô Cực Kiếm Tôn',
        novelSceneryProse: 'Tiếng chuông đồng cổ ngân vang lay động mây ngàn. Hàng vạn kiếm tu quỳ gối trước quảng trường Thông Thiên bái vọng bóng lưng bạch y trên đỉnh núi, kiếm ý thanh chính ngút trời...'
      },
      {
        id: 'geo_lt_09',
        name: 'Thông Thiên Tiên Lộ Cổ Quan',
        type: 'THANH_TRI',
        status: 'CAN_TRAI_QUA',
        chronologicalStage: 'Giai đoạn 5: Độ Kiếp Phi Thăng (Năm 700 - 800 tuổi)',
        realmOrRegion: 'Biên Giới Giới Diện • Hư Không Cực Địa',
        terrainAndAura: 'Cửa ải cự đại bằng đồng xanh cổ xây dựng trên các thiên thạch trôi dạt, lôi kiếp xé rách không gian hỗn loạn',
        requiredTasksOrTrials: 'Đánh bại Thần Tướng Trấn Quan của Thượng Giới, phá vỡ phong ấn ngăn cản phi thăng của Tiên Tộc',
        conquestOrLegacy: 'Khai mở lại con đường thăng tiên cho toàn thể tu sĩ nhân giới bị phong bế suốt mười vạn năm',
        novelSceneryProse: 'Cánh cổng đồng xanh cao vạn trượng sừng sững giữa hư không đen đặc đầy bão cát sao. Từng đạo tử lôi to như rồng cuốn quanh các trụ đồng, thách thức bất kỳ kẻ phàm trần nào dám ngẩng đầu dòm ngó thiên đạo...'
      },
      {
        id: 'geo_lt_10',
        name: 'Bắc Minh Thần Vực • Cửu U Hàn Ngục',
        type: 'BI_CANH_DONG_THIEN',
        status: 'MUC_TIEU_TOI_HAU',
        chronologicalStage: 'Giai đoạn 5: Chung Cực Đại Kết Cục (Năm 800 tuổi)',
        realmOrRegion: 'Thượng Thiên Tiên Giới • Vùng Đất Cổ Tộc',
        terrainAndAura: 'Xiềng xích tiên kim trói buộc hư không, hàn băng vạn cổ đông cứng cả thần niệm và quy tắc thời gian',
        requiredTasksOrTrials: 'Quyết chiến đỉnh phong với Thượng Giới Lão Tổ và Huyết Cốt Ma Tôn bản thể, xé rách thiên lao cứu mẫu thân',
        conquestOrLegacy: 'Đoàn tụ gia đình trọn vẹn, lập lại quy tắc bình đẳng cho tam giới, đắc đạo Vô Cực Đại La Kiếm Tiên',
        novelSceneryProse: 'Từng sợi xích vàng ròng khắc đầy cổ tự trói chặt những tảng thiên thạch lơ lửng. Giữa không gian u tối cùng cực, ngọn nến hồn đăng le lói của người mẹ bị giam cầm suốt tám trăm năm run rẩy trước bước chân con trai đang tới gần...'
      }
    ],
    questTrialRecords: [
      {
        id: 'qtr_lt_01',
        category: 'THI_LUYEN',
        title: 'Thí Luyện Ngoại Môn Cửu Trọng Thiên Nhai',
        stageTimeAnchor: 'Năm 16 tuổi (Nhập Môn)',
        locationName: 'Thái Hư Kiếm Tông • Lôi Đài Thí Luyện',
        dangerAndDifficulty: 'Hiểm Trở',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Quy chế sát hạch nhập môn Thái Hư Môn bắt buộc mọi đệ tử thế gia và tán tu phải trải qua',
        keyObjectives: [
          'Vượt qua 900 bậc thang trọng lực Vấn Kiếm Lĩnh',
          'Đánh bại 3 khôi lỗi kiếm trận Kim Cương',
          'Một kiếm kích phát chín đạo kiếm khí trên bia đá trắc thí'
        ],
        rewardsOrBreakthroughs: 'Phá cách trở thành Chân Truyền Đệ Tử, nhận ban thưởng Thái Hư Huyền Băng Y và Thanh Phong Kiếm',
        trialEncounters: 'Bị đệ tử Vương gia chèn ép ngáng đường, Lâm Tiêu dùng kiếm gỗ bẻ gãy đao kiếm đối phương',
        narrativeJournalSnippet: 'Gió trên đỉnh Thiên Nhai thốc vào lồng ngực. Thiếu niên áo gai bước lên bậc thang cuối cùng trước ánh mắt sững sờ của các vị phong chủ...'
      },
      {
        id: 'qtr_lt_02',
        category: 'VAO_BI_CANH',
        title: 'Thám Hiểm Thái Sơ Hỗn Độn Động Thiên',
        stageTimeAnchor: 'Năm 20 tuổi (Trúc Cơ Đỉnh Phong)',
        locationName: 'Bắc Hoang Hàn Đàm & Cổ Băng Tiên Cung',
        dangerAndDifficulty: 'Cực Nguy Cấp S',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Bí cảnh nghìn năm mới mở ra một lần, các đại thánh địa Trung Châu cùng phái thiên kiêu tiến vào tranh đoạt dị bảo',
        keyObjectives: [
          'Vượt qua Hàn Đàm Cực Băng Sát Trận',
          'Thu phục hoặc đẩy lui Cửu Đầu U Băng Giao',
          'Hóa giải hàn độc cho Lạc Thanh Hàn trước giờ Tý'
        ],
        rewardsOrBreakthroughs: 'Thu được Thái Sơ Hỗn Độn Thạch, đột phá Cửu Chuyển Kim Đan cực phẩm không tỳ vết',
        trialEncounters: 'Chạm trán sát thủ Vô Lượng Tông mai phục trong sương mù tuyết trắng',
        narrativeJournalSnippet: 'Dưới lòng hồ băng nghìn trượng, ngọn lửa thuần dương bùng cháy như ngọn đuốc hy vọng xua tan băng giá tử thần...'
      },
      {
        id: 'qtr_lt_03',
        category: 'NHIEM_VU',
        title: 'Hộ Sơn Đại Trận Tiên Phong Diệt Ma Tướng',
        stageTimeAnchor: 'Năm 28 tuổi (Kim Đan Kỳ)',
        locationName: 'Thái Hư Kiếm Tông Hộ Sơn Đại Trận • Đoạn Kiếm Phong',
        dangerAndDifficulty: 'Cực Nguy Cấp S',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Mật lệnh khẩn cấp từ Chưởng Môn khi mười vạn ma tu đánh úp sơn môn',
        keyObjectives: [
          'Trấn thủ trận nhãn Đoạn Kiếm Phong trong ba ngày ba đêm',
          'Trảm sát ba đầu Hắc Viêm Ma Tướng thống lĩnh tiền quân',
          'Bảo toàn tính mạng cho các đệ tử ngoại môn rút lui về hậu sơn'
        ],
        rewardsOrBreakthroughs: 'Được phong tặng Thiếu Kiếm Tôn, lĩnh ngộ sơ khai Vấn Kiếm Vực Cảnh',
        trialEncounters: 'Đối đầu trực diện với phân thân hư ảnh của Huyết Cốt Ma Tôn',
        narrativeJournalSnippet: 'Máu ma tu hòa cùng mưa rào xối xả. Mũi kiếm gãy cắm xuống đất đá, bạch y biến thành huyết y nhưng bước chân không hề lùi nửa tấc...'
      },
      {
        id: 'qtr_lt_04',
        category: 'DU_NGOAN',
        title: 'Ngao Du Nam Lĩnh Nếm Rượu Bách Hoa & Luận Đạo',
        stageTimeAnchor: 'Năm 50 tuổi (Kim Đan Viên Mãn)',
        locationName: 'Nam Lĩnh Thập Vạn Hoa Cốc • Bích Ba Hồ',
        dangerAndDifficulty: 'Phổ Thông',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Rời tông môn du lịch hồng trần tìm kiếm cơ duyên phá vỡ bình cảnh Nguyên Anh',
        keyObjectives: [
          'Thưởng ngoạn phong cảnh thiên nhiên, gột rửa sát khí đọng lại trong đạo tâm',
          'Đàm đạo kiếm ý cùng các ẩn sĩ cao nhân nơi thôn dã',
          'Cứu giúp nạn dịch phàm nhân tại bảy tòa thành trì phía Nam'
        ],
        rewardsOrBreakthroughs: 'Ngộ ra "Tình Kiếm Nhập Đạo", tâm ma tiêu tán, đạo tâm đạt trạng thái vô vi thông suốt',
        trialEncounters: 'Gặp gỡ một lão tiều phu gánh củi hóa ra là một vị kiếm tiên ẩn thế trao tặng ngọc giản',
        narrativeJournalSnippet: 'Thuyền con lướt nhẹ trên mặt hồ ngập tràn cánh hoa đăng. Chén rượu nồng thơm hương mai, tiếng đàn tranh văng vẳng đưa tâm hồn hòa làm một với non sông...'
      },
      {
        id: 'qtr_lt_05',
        category: 'THI_LUYEN',
        title: 'Thiên Kiêu Luận Kiếm Lôi Đài Bách Vực',
        stageTimeAnchor: 'Năm 120 tuổi (Nguyên Anh Kỳ)',
        locationName: 'Trung Châu Thánh Đô • Thiên Đạo Phong Lôi Đài',
        dangerAndDifficulty: 'Cực Nguy Cấp S',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Đại hội tranh bá nghìn năm một lần giữa chư thiên thánh địa và tiên triều cửu châu',
        keyObjectives: [
          'Đánh bại mười đại thiên kiêu đương thời trong lôi đài liên hoàn',
          'Bẻ gãy Thương Thiên Thần Binh của Thánh Tử Thái Nhất Môn',
          'Đoạt vị trí Đệ Nhất Thiên Kiêu Bảng Nhân Giới'
        ],
        rewardsOrBreakthroughs: 'Đoạt Thiên Đạo Tạo Hóa Đan, uy danh chấn động toàn bộ chín cõi trời đất',
        trialEncounters: 'Trận so kiếm kéo dài mười ngày mười đêm với Lạc Thanh Hàn trước khi cả hai cùng hợp kiếm phá trận',
        narrativeJournalSnippet: 'Hàng triệu tu sĩ nín thở dõi theo lôi đài lơ lửng giữa tầng mây. Một vạt áo trắng bay phần phật, kiếm khí quét sạch mây mù chín tầng trời...'
      },
      {
        id: 'qtr_lt_06',
        category: 'VAO_BI_CANH',
        title: 'Khai Phá Vô Thượng Cổ Kiếm Mộ Di Tích',
        stageTimeAnchor: 'Năm 500 tuổi (Hóa Thần Viên Mãn)',
        locationName: 'Tây Hoang Vẫn Tiên Cốc • Vạn Kiếm Mộ',
        dangerAndDifficulty: 'Thập Tử Vô Sinh SSS',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Lời sấm truyền viễn cổ về nơi chôn cất thanh kiếm mở cõi đầu tiên của thiên địa',
        keyObjectives: [
          'Hóa giải kiếm trận vạn năm không tắt của Thượng Cổ Chân Tiên',
          'Thuyết phục Kiếm Linh vạn năm quy thuận',
          'Dung hợp Hỗn Độn Kiếm Thai đạt tới cảnh giới Kiếm Thể Hợp Nhất'
        ],
        rewardsOrBreakthroughs: 'Đột phá Luyện Hư Cảnh Giới, lĩnh ngộ Tuyệt Đối Kiếm Vực phạm vi vạn dặm',
        trialEncounters: 'Bị ảo ảnh tà ma của chính bản thân kiếp trước quấy nhiễu suýt tẩu hỏa nhập ma',
        narrativeJournalSnippet: 'Hàng vạn thanh kiếm rỉ sét cắm trên vách đá bỗng đồng loạt run rẩy cất tiếng reo mừng, nghênh đón vị chủ nhân chân chính sau mười vạn năm chờ đợi...'
      },
      {
        id: 'qtr_lt_07',
        category: 'NHIEM_VU',
        title: 'Công Phá Cửu U Hắc Ngục Cứu Mẫu Thân (Đại Sứ Mệnh)',
        stageTimeAnchor: 'Năm 800 tuổi (Đại Thừa Đỉnh Phong)',
        locationName: 'Bắc Minh Thần Vực • Cửu U Hàn Ngục',
        dangerAndDifficulty: 'Thập Tử Vô Sinh SSS',
        executionStatus: 'Cần Thực Hiện (Chờ Kích Hoạt)',
        issuingAuthorityOrContext: 'Lời thề khắc cốt từ năm 6 tuổi khi nhìn mẫu thân bị bắt đi trong đêm giông sét',
        keyObjectives: [
          'Chém nát chín đạo xiềng xích Tiên Kim Vạn Cổ trói buộc thiên lao',
          'Đánh bại Thượng Giới Chấp Pháp Trưởng Lão Đoàn và Thần Tướng Trấn Giới',
          'Đưa mẫu thân trở về đoàn tụ cùng phụ thân tại Côn Luân Tiên Sơn'
        ],
        rewardsOrBreakthroughs: 'Độ kiếp phi thăng, đắc chứng Vô Cực Chân Tiên Đạo Quả, đạo tâm viên mãn tuyệt đối',
        trialEncounters: 'Toàn bộ cường giả Thượng Giới liên thủ vây hãm hòng bóp nghẹt nghịch đồ phàm nhân',
        narrativeJournalSnippet: 'Trước mắt là cánh cửa thiên lao rực lửa thần phạt. Chàng rút kiếm, ánh mắt sáng rực tựa sao trời: "Con đã đến rồi, không ai có thể giam cầm người thêm một khắc nào nữa!"'
      }
    ],
    karmicInheritances: [
      {
        id: 'ki_lt_01',
        name: 'Thái Sơ Hỗn Độn Kiếm Thai',
        type: 'THAN_BINH_BAN_MENH',
        acquisitionMilestone: 'Năm 14 tuổi (Đoạn Hồn Nhai)',
        rankOrGrade: 'Thượng Cổ Chí Bảo (Cấp Tiên Thiên)',
        awakeningStage: 'Tầng 7/9 Phong Ấn',
        soulBondStatus: 'Hợp Nhất Đạo Thân',
        specialAbilities: [
          'Trảm Phá Không Gian & Pháp Tắc Quy Tắc',
          'Vô Cực Kiếm Ý Bất Diệt (Tự hồi phục vết thương)',
          'Vạn Kiếm Triều Bái (Nhiếp phục kiếm khí đối phương)'
        ],
        karmicCostOrBacklash: 'Mỗi lần khai mở phong ấn tầng cao đều rút cạn tinh huyết; nếu đạo tâm dao động sẽ bị kiếm khí phản phệ đốt cháy linh hồn.',
        novelLoreSnippet: 'Một thanh kiếm phôi màu xám tro không chuôi, cắm sâu vào vách đá ngàn trượng. Khi giọt máu rơi xuống, kiếm ngân vang lên như sấm rền mở cõi, làm chấn động toàn bộ linh mạch mười vạn dặm.'
      },
      {
        id: 'ki_lt_02',
        name: 'Tàn Hồn Vô Danh Kiếm Tôn Chỉ Điểm',
        type: 'TRUYEN_THUA_CO_TIEN',
        acquisitionMilestone: 'Năm 15 tuổi (Cổ Kiếm Quật)',
        rankOrGrade: 'Chân Tiên Cấp Truyền Thừa',
        awakeningStage: 'Đã Kế Thừa 90% Y Bát',
        soulBondStatus: 'Khí Linh Thức Tỉnh',
        specialAbilities: [
          'Kiếm Đạo Nhãn Giới (Nhìn thấu sơ hở trong chiêu thức thiên hạ)',
          'Hỗn Độn Kiếm Kinh Thượng Cổ Toàn Bản',
          'Mở Rộng Thần Niệm Kiếm Vực Vạn Trượng'
        ],
        karmicCostOrBacklash: 'Gánh vác di nguyện báo thù của tiền bối đối với dị tộc thượng giới.',
        novelLoreSnippet: '"Tiểu tử, ngươi có kiếm thai nhưng tâm chưa đủ sắc bén. Hãy nhìn cho kỹ, đây mới là kiếm pháp trảm trời nghịch mệnh!" Bóng hình mờ ảo vung kiếm gỗ, xé toạc tinh hà.'
      },
      {
        id: 'ki_lt_03',
        name: 'Cửu U Hắc Viêm Dị Hỏa',
        type: 'DI_HOA_DI_LOI',
        acquisitionMilestone: 'Năm 22 tuổi (Cửu U Vực)',
        rankOrGrade: 'Thiên Địa Dị Hỏa Hạng 4',
        awakeningStage: 'Viên Mãn Dung Hợp',
        soulBondStatus: 'Tâm Huyết Tương Liên',
        specialAbilities: [
          'Thiêu rụi ma khí và nguyền rủa thần hồn',
          'Tẩy luyện tạp chất trong kiếm cốt',
          'Kết hợp kiếm quang tạo thành Hắc Viêm Kiếm Mang'
        ],
        karmicCostOrBacklash: 'Dễ khơi dậy sát ý nếu không có Băng Phách Linh Khí điều hòa.',
        novelLoreSnippet: 'Ngọn lửa đen nhánh không tỏa nhiệt lượng mà lại lạnh thấu xương, bốc cháy ngùn ngụt trên thân kiếm như nuốt chửng mọi ánh sáng xung quanh.'
      },
      {
        id: 'ki_lt_04',
        name: 'Thần Thú Côn Bằng Huyết Mạch Khế Ước',
        type: 'LINH_THU_KHE_UOC',
        acquisitionMilestone: 'Năm 80 tuổi (Bắc Hải Vực)',
        rankOrGrade: 'Thần Thú Thái Cổ',
        awakeningStage: 'Côn Hóa Thành Bằng',
        soulBondStatus: 'Tâm Huyết Tương Liên',
        specialAbilities: [
          'Phù Dao Trực Thượng Cửu Vạn Dặm (Tốc độ thuấn di cực hạn)',
          'Thôn Phệ Thiên Địa Linh Khí trợ lực chủ nhân',
          'Hộ Thể Côn Bằng Thần Vũ'
        ],
        karmicCostOrBacklash: 'Cần tiêu tốn hàng vạn viên cực phẩm linh thạch mỗi năm để bồi dưỡng.',
        novelLoreSnippet: 'Tiếng kêu ngân vang lay động mây ngàn. Đôi cánh che rợp trời như mây che mặt trời, chở Lâm Tiêu xé toạc bão tố lao thẳng vào cửu thiên.'
      }
    ],
    nemesisFeuds: [
      {
        id: 'nf_lt_01',
        nemesisName: 'Huyết Cốt Ma Tôn',
        nemesisFactionAndRank: 'Vạn Ma Cực Địa • Cựu Tộc Trưởng Ma Tộc (Đại Thừa Kỳ)',
        feudOriginCause: 'Dẫn mười vạn ma triều vây hãm Thái Hư Môn, sát hại đồng môn và bắt giữ mẫu thân làm con tin tế thần.',
        feudSeverity: 'Huyết Hải Thâm Cừu',
        status: 'Chờ Ngày Quyết Đấu',
        pastClashes: 'Lâm Tiêu đã chém đứt ba đạo phân thân ma niệm; từng bị bản thể Ma Tôn đánh trọng thương tại Đoạn Kiếm Phong năm 28 tuổi.',
        destinedDuelCondition: 'Ước hẹn quyết chiến trên đỉnh Thông Thiên Kiếm Trận khi Ma Nguyệt che khuất Thái Dương.',
        feudResolutionReward: 'Đoạt lại Cốt Hồn Châu, giải thoát mười vạn vong linh sư môn, đột phá Chân Tiên.',
        duelSnippetDraft: '"Lâm Tiêu, mối thù chém đứt phân thân của bản tôn, hôm nay sẽ lấy máu toàn bộ người thân ngươi để trả lại!" - Huyết vân cuồn cuộn vạn dặm rít gào.'
      },
      {
        id: 'nf_lt_02',
        nemesisName: 'Vương Thế Hùng',
        nemesisFactionAndRank: 'Thanh Vân Vương Gia • Đại Trưởng Lão Ngoại Phân Bộ',
        feudOriginCause: 'Ỷ thế hiếp người, tước đoạt thảo dược của phụ thân Lâm Chấn Thiên, đẩy Lâm Tiêu xuống vực Đoạn Hồn Nhai.',
        feudSeverity: 'Không Đội Trời Chung',
        status: 'Đã Trảm Sát',
        pastClashes: 'Bị Lâm Tiêu sau khi thoát khỏi vực thẳm trở về nhất kiếm trảm đầu trước mắt toàn bộ tộc nhân.',
        destinedDuelCondition: 'Đã kết thúc tại Đại Hội Trưởng Lão năm 15 tuổi.',
        feudResolutionReward: 'Lấy lại toàn bộ điền sản và vinh quang cho chi thứ phụ thân, giải trừ bóng ma tuổi thơ.',
        duelSnippetDraft: 'Kiếm quang lóe lên như tia chớp trong mưa. Đầu người rơi xuống đất cát, đôi mắt Vương Thế Hùng vẫn còn đọng lại vẻ kinh hoàng không thể tin nổi.'
      },
      {
        id: 'nf_lt_03',
        nemesisName: 'Bắc Minh Thượng Giới Chấp Pháp Trưởng Lão Đoàn',
        nemesisFactionAndRank: 'Thượng Thiên Tiên Tộc • Chấp Pháp Điện (Đại Thừa Đỉnh Phong)',
        feudOriginCause: 'Cưỡng ép bắt mẫu thân Ninh Tố Vân giam vào Cửu U Hàn Ngục, coi thường nhân tộc phàm giới như loài kiến cỏ.',
        feudSeverity: 'Túc Mệnh Tranh Đoạt',
        status: 'Đang Truy Lùng',
        pastClashes: 'Nhiều lần giáng lôi kiếp dị thường hòng bóp chết Lâm Tiêu khi đột phá cảnh giới.',
        destinedDuelCondition: 'Công phá Tiên Giới Thiên Lao tại Bắc Minh Thần Vực vào năm 800 tuổi.',
        feudResolutionReward: 'Đoàn tụ gia đình trọn vẹn, phá bỏ định kiến hà khắc giữa Tiên và Phàm.',
        duelSnippetDraft: '"Một tên phàm nhân hạ giới cũng dám ngửa mặt nhìn lên Tiên Giới sao?" - "Hôm nay, kiếm của phàm nhân này sẽ chém rách bầu trời của các ngươi!"'
      }
    ],
    daoHeartDemons: [
      {
        id: 'dhd_lt_01',
        demonName: 'Bóng Ma Bất Lực & Nỗi Sợ Chia Ly Thuở Hàn Vi',
        demonType: 'CHẤP_NIỆM_QUÁ_KHỨ',
        triggerStage: 'Đột phá Kim Đan Kỳ (Năm 20 tuổi)',
        innerDemonManifestation: 'Hiện về hình ảnh người cha thổ huyết bất lực và tiếng khóc xé lòng của mẹ trong đêm mưa sấm sét, khiến đan điền bốc cháy hỗn loạn.',
        daoResolutionMethod: 'Nhận thức rõ sức mạnh của tình thương là cội nguồn sức mạnh, không phải sự yếu đuối; dùng quyết tâm bảo hộ hóa giải ảo ảnh.',
        daoDomainMastery: 'Bất Diệt Thủ Hộ Kiếm Ý (Cấp 1)',
        breakthroughState: 'Đã Đốn Ngộ Hoàn Toàn',
        enlightenmentSnippet: 'Kiếm trong tay không phải để trốn chạy quá khứ, mà là để che chắn cho những người mình yêu thương không bao giờ phải chịu cảnh ly biệt nữa.'
      },
      {
        id: 'dhd_lt_02',
        demonName: 'Sát Nghiệp Cuồng Bạo Trụy Ma Kiếp',
        demonType: 'SÁT_TÂM_CUỒNG_BẠO',
        triggerStage: 'Hộ Sơn Huyết Chiến (Năm 28 tuổi)',
        innerDemonManifestation: 'Nhìn đồng môn ngã xuống, sát ý cuộn trào biến mắt thành huyết sắc, thần niệm suýt bị Hỗn Độn Kiếm Thai thôn phệ thành sát thần vô tri.',
        daoResolutionMethod: 'Được Lạc Thanh Hàn ôm chặt, dùng Băng Tâm Thần Chú sưởi ấm tâm hồn; nhận ra kiếm đạo có thủ có sát mới là đại đạo chí thượng.',
        daoDomainMastery: 'Sinh Tử Tình Kiếm Vực (Cấp 3 - 60%)',
        breakthroughState: 'Đã Đốn Ngộ Hoàn Toàn',
        enlightenmentSnippet: 'Một giọt nước mắt ấm áp rơi trên mu bàn tay nhuốm máu. Giữa biển lửa sát phạt, chàng buông thanh kiếm đẫm máu ôm lấy nàng, sát khí tiêu tán nhường chỗ cho bình minh rạng rỡ.'
      },
      {
        id: 'dhd_lt_03',
        demonName: 'Bình Cảnh Kiếm Đạo Tuyệt Tình vs Nhập Thế Trường Sinh',
        demonType: 'BÌNH_CẢNH_CẢNH_GIỚI',
        triggerStage: 'Đột phá Hóa Thần (Năm 300 tuổi)',
        innerDemonManifestation: 'Thiên đạo khảo nghiệm đòi hỏi phải chặt đứt tơ duyên hồng trần mới được đắc chứng trường sinh bất tử.',
        daoResolutionMethod: 'Kiên quyết bác bỏ Thiên Đạo vô tình: "Nếu trường sinh mà cô độc vô tình, thì trường sinh để làm gì?"; tự sáng lập Vô Cực Hữu Tình Kiếm Đạo.',
        daoDomainMastery: 'Vô Cực Hữu Tình Đại Đạo Kiếm Vực (Cấp Tối Cao - 95%)',
        breakthroughState: 'Đã Đốn Ngộ Hoàn Toàn',
        enlightenmentSnippet: 'Trời đất lặng im trước lời thệ nguyện. Một đóa sen kiếm bung nở giữa hư không, vừa có uy lực hủy thiên diệt địa, vừa mang sinh khí vỗ về muôn loài.'
      }
    ],
    factionPowers: [
      {
        id: 'fp_lt_01',
        factionName: 'Thái Hư Kiếm Tông',
        characterTitleOrRole: 'Thiếu Kiếm Tôn • Phong Chủ Vấn Kiếm Phong',
        authorityLevel: 'Chấp Chưởng Trọng Quyền',
        controlledTerritory: 'Vấn Kiếm Phong, ba vạn đệ tử kiếm tu, chín ngọn tiên sơn phụ thuộc',
        alliedSubFactions: ['Chiến Kiếm Đường', 'Luyện Kiếm Các', 'Đan Dược Sơn'],
        rivalFactionForces: 'Thế Gia Trưởng Lão Đoàn (từng hiềm khích thuở đầu)',
        powerLegacyContribution: 'Thiết lập Tru Ma Kiếm Trận bảo vệ sơn môn muôn đời, đào tạo hàng ngàn kiếm tu chân truyền tài ba.'
      },
      {
        id: 'fp_lt_02',
        factionName: 'Vô Cực Kiếm Các (Tự Lập Tông Môn)',
        characterTitleOrRole: 'Khai Sơn Thủy Tổ • Vô Cực Kiếm Tôn',
        authorityLevel: 'Lãnh Tụ Tối Cao',
        controlledTerritory: 'Côn Luân Tiên Sơn, 72 Động Thiên Phúc Địa',
        alliedSubFactions: ['Bắc Hoang Băng Phách Cung', 'Vạn Tinh Thương Minh', 'Nam Lĩnh Tiên Lữ Các'],
        rivalFactionForces: 'Vực Ngoại Ma Tộc, Thượng Giới Chấp Pháp Đoàn',
        powerLegacyContribution: 'Trở thành Đệ Nhất Kiếm Đạo Thánh Địa của Nhân Tộc, truyền bá Hỗn Độn Kiếm Điển miễn phí cho thiên hạ tu sĩ.'
      }
    ],
    oralLoreSubplots: [
      {
        id: 'ols_lt_01',
        subplotTitle: 'Thước Gõ Trà Quán: Trận Chiến Hắc Huyết Nhai & Chiếc Bào Y Rách Vai',
        speakerType: 'THUYET_THU_NHAN',
        speakerNameAndRole: 'Lão Thuyết Thư Nhân Triệu Cửu Công (Khách điếm Lạc Dương, 60 năm bình giang hồ)',
        narrativeSetting: 'Trà quán lộng gió chiều tà bên ngoài Tiên Thành Lạc Dương, tiếng thước kinh đường vang giòn giữa đám đông tu sĩ đang nín thở',
        recountedEraOrEvent: 'Năm 22 tuổi • Hậu Biến Cố Diệt Môn & Một Kiếm Đoạn Hậu cứu hộ tống đệ tử',
        associatedTreasureOrRealm: 'Hắc Huyết Nhai Biên Cảnh • Trảm Ma Cổ Kiếm',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Sau trận chiến, chàng dùng kiếm khí khắc sâu 108 chữ Hộ Môn Kiếm Quyết lên vách đá Hắc Huyết Nhai để lại truyền thừa phòng ngự cho người đời sau.',
        narrativePerspectiveSummary: 'Vừa sùng kính vừa rơi lệ cảm thán, diễn đạt như chính mắt lão đã đứng giữa mưa tuyết chứng kiến trận chiến',
        historicalTruthVsRumor: 'Thế gian đồn đại chàng là sát tinh máu lạnh không chớp mắt, một kiếm chém trăm đầu người không biến sắc. Nhưng sự thật cốt lõi là máu trên bào y rách vai chàng là máu của ân sư tự bạo đan điền chàng cố ghì chặt vào lòng, và suốt đêm ấy chàng run rẩy che chắn trước cửa hang cho đàn em ngủ say.',
        characterVividImpact: 'Thói quen vô thức đưa tay xoa nhẹ vết sẹo ngang vai trái mỗi khi ngắm tuyết rơi; nụ cười nhạt nhưng ánh mắt ấm áp khác hẳn vẻ mặt sát thần thiên hạ truyền tai.',
        spokenDialogueDraft: 'Chư vị khách quan chớ vội tin vào những lời đồn nhảm nhí ngoài kia! Năm ấy tại Hắc Huyết Nhai, lão hủ khi đó mới chỉ là tiểu nhị phụ trách dâng trà cho trạm dịch biên cương. Các ngươi chỉ biết Kiếm Tôn đại nhân một kiếm kinh thiên trảm sát ba đại ma đầu, nhưng có ai thấy được thiếu niên đó đã đứng suốt ba ngày ba đêm trong gió rét căm căm? Bào y chàng rách nát, tay siết chuôi kiếm đến mức máu tươi rỉ qua kẽ ngón tay nhỏ xuống tuyết trắng. Chàng chỉ khẽ nói với đám đệ tử đang khóc thét sau lưng một câu: "Đừng sợ... Còn ta ở đây, trời sập xuống cũng có kiếm này chống đỡ!"'
      },
      {
        id: 'ols_lt_02',
        subplotTitle: 'Bát Cháo Nóng Đầu Làng & Khúc Gỗ Khắc Thanh Kiếm Đào',
        speakerType: 'CO_NHAN_HAN_VI',
        speakerNameAndRole: 'Tôn Đại Nương (78 tuổi, phàm nhân thôn dã Hắc Thạch, láng giềng cũ của Lâm gia)',
        narrativeSetting: 'Bên hiên nhà tranh mộc mạc, khói bếp lam chiều bốc lên, bà lão móm mém vừa đan áo vừa kể cho đám trẻ con trong xóm nghe',
        recountedEraOrEvent: 'Thuở ấu thơ 10 - 14 tuổi • Thời kỳ Lâm Chấn Thiên bị phế đan điền, phụ tử lưu lạc bần hàn',
        associatedTreasureOrRealm: 'Hắc Thạch Lạc Thôn • Khúc Gỗ Đào Phù Chú',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Khúc gỗ đào tưởng như phàm vật nhưng lại chứa đựng một lũy kiếm ý sơ khởi tinh khiết nhất mà Lâm Tiêu vô thức truyền vào khi khắc từng nhát dao bảo vệ cha.',
        narrativePerspectiveSummary: 'Tràn ngập tình thương xót ruột thịt, coi chàng như đứa cháu hiếu thảo chịu muôn vàn oan khuất chốn trần ai',
        historicalTruthVsRumor: 'Tiên môn trưởng lão đồn ngài từ nhỏ đã mang nghịch cốt, trời sinh tính khí hung bạo ngỗ nghịch khó thuần. Sự thật là thằng bé Tiêu ngoan hiền và nhẫn nại nhất tràng, đêm nào cũng gánh củi đổi lấy tiền thuốc cho cha nằm liệt giường mà chưa từng than thở một câu.',
        characterVividImpact: 'Dù sau này đã là chí tôn cửu giới vẫn luôn giữ thói quen thích ăn cháo đậu hoa mộc mạc; chiếc túi thơm thêu hoa cúc cũ kỹ của thôn trang luôn được chàng giắt bên hông kiếm.',
        spokenDialogueDraft: 'Tội nghiệp thằng bé lắm các cháu ơi! Ngày ấy cha nó ho ra máu, cả làng sợ bị Vương gia liên lụy chẳng ai dám tới gần, chỉ có bà lén múc cho nó nửa bát cháo nguội. Thằng bé Tiêu gầy trơ cả xương, hai mắt đỏ hoe nhưng cắn chặt môi không khóc, cúi đầu tạ ơn bà ba lạy rồi mới bưng bát cháo chạy vội về cho cha. Nó còn tặng lại bà một khúc gỗ đào nó tự tay đẽo hình thanh đoản kiếm, dặn: "Bà giữ lấy, sau này có kẻ xấu ức hiếp, cháu lớn lên sẽ dùng kiếm thật bảo vệ bà!" Giờ nó thành kiếm tiên trên mây rồi, vậy mà năm ngoái thôn bị lũ lớn, vẫn là một đạo kiếm quang từ trời cao hạ xuống chặn đứng con đê dữ...'
      },
      {
        id: 'ols_lt_03',
        subplotTitle: 'Nỗi Khiếp Đảm Của Kẻ Sống Sót: Nhất Kiếm Bất Động & Giọt Lệ Đạo Tâm',
        speakerType: 'KE_THU_SONG_SOT',
        speakerNameAndRole: 'Cừu Độc Lão Nhân (Nguyên Tả Hộ Pháp U Minh Giáo, hiện phế tu ẩn dật)',
        narrativeSetting: 'Trong một tửu quán ẩm thấp dưới lòng đất Ma Vực, giọng nói khàn đặc run rẩy bên chén rượu đắng cay',
        recountedEraOrEvent: 'Năm 28 tuổi • Trận huyết chiến càn quét Vạn Ma Quật',
        associatedTreasureOrRealm: 'Vạn Ma Quật • Cửu U Ma Đỉnh & Ma Hạch Huyết Tinh',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Lâm Tiêu không thèm đoạt lấy Ma Đỉnh dù nó là chí bảo chuẩn thiên giai; chàng dùng một kiếm chém vỡ đỉnh ma giải phóng mười vạn oan hồn bị giam cầm.',
        narrativePerspectiveSummary: 'Kinh hoàng tột độ, tâm ma ám ảnh cả đời, vừa căm thù vừa bất lực tâm phục khẩu phục',
        historicalTruthVsRumor: 'Ma giới rêu rao Lâm Tiêu dùng yêu thuật tà môn và cấm khí thượng cổ đánh lén mới diệt được Giáo Chủ. Nhưng thực tế là chính đạo tâm thuần khiết không chút tà niệm và lòng từ bi của chàng đã hóa giải ma trận vạn năm.',
        characterVividImpact: 'Ánh mắt chàng lúc vung kiếm không có vẻ tàn bạo của kẻ đồ tể mà sâu thẳm tĩnh mịch như mặt hồ mùa thu; thanh kiếm sau khi chém đứt đầu ma đầu không hề vấy một giọt máu.',
        spokenDialogueDraft: 'Ngươi hỏi ta tại sao lại sợ hắn đến mức này ư? Bởi vì năm đó tại Huyết Tế Đàn, ba ngàn đệ tử của ta gào thét kết trận, Giáo Chủ triệu hoán vạn quỷ cắn nuốt... Nhưng hắn chỉ bước tới, một bước, hai bước... Không cần hộ thể linh quang, gió ma xé rách vạt áo hắn nhưng không lay động được nửa bước chân! Khoảnh khắc hắn rút kiếm, ta không nhìn thấy ánh sáng sát phạt, mà là một vầng thái dương rực rỡ như bình minh quét sạch bóng đêm. Hắn nhìn Giáo Chủ ngã xuống, khẽ thở dài: "Oan oan tương báo biết thuở nào dứt, kiếm này trảm túc nghiệp của ngươi, kiếp sau chớ làm ma tu nữa." Đó mới là điều đáng sợ nhất... Hắn không giết để hưởng lạc, hắn giết để độ hóa cõi trần!'
      },
      {
        id: 'ols_lt_04',
        subplotTitle: 'Ngọn Đèn Dầu Bên Cửa Sổ Vấn Kiếm Phong & Hũ Kẹo Mạch Nha Vụng Về',
        speakerType: 'DONG_MON_DE_TU',
        speakerNameAndRole: 'Mộc Uyển Nhi (Trưởng Lão Dược Đường Thái Hư Tông, tiểu sư muội cùng khóa)',
        narrativeSetting: 'Trên sân phơi linh dược lộng gió của Dược Phong, trò chuyện cùng đám tân đệ tử trẻ tuổi mới nhập môn',
        recountedEraOrEvent: 'Năm 17 - 25 tuổi • Giai đoạn khổ luyện gian nan từ Ngoại Môn lên Chân Truyền',
        associatedTreasureOrRealm: 'Vấn Kiếm Phong • Ngàn Cân Trọng Kiếm Thạch',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Tảng đá khảo thí từng bị chàng chém nứt thực chất là một khối Vẫn Thiết Thần Kim; chàng giấu vết nứt suốt ba năm để không làm sư phụ trách phạt đệ tử canh gác.',
        narrativePerspectiveSummary: 'Ấm áp, trìu mến, hé lộ khía cạnh vụng về, chân chất đời thường đằng sau danh xưng Kiếm Tôn vô địch',
        historicalTruthVsRumor: 'Đệ tử đời sau tưởng Lâm Sư Huynh ngày xưa là thiên tài ngút trời, ngồi thiền một đêm là đốn ngộ phi thăng, cao lãnh bất khả xâm phạm. Nhưng thực chất chàng từng luyện kiếm đến toạc rách da bàn tay, ăn cơm cháy và lén giấu kẹo dỗ dành đồng môn.',
        characterVividImpact: 'Thói quen đưa tay gãi sống mũi ngượng ngùng mỗi khi được người khác khen ngợi; tài nấu nướng dở tệ nhưng luôn xung phong nướng cá đãi mọi người sau mỗi chuyến săn linh thú.',
        spokenDialogueDraft: 'Mấy đứa đừng nghe người ta đồn thổi mà tưởng sư huynh sinh ra đã là thần tiên! Năm mười tám tuổi, huynh ấy bị phạt quét bậc thang sơn môn vì lỡ tay chém vỡ tảng đá khảo thí. Đêm nào phòng huynh ấy cũng đỏ đèn đến canh năm. Có lần ta bị phạt nhịn ăn vì làm vỡ lò đan, nửa đêm ngồi khóc thút thít, bỗng thấy một bóng người cao gầy lén đặt qua bậu cửa một bọc lá sen. Mở ra là con cá nướng cháy đen thui cùng một hũ kẹo mạch nha nhỏ xíu! Huynh ấy đứng ngoài hàng rào nói với vào: "Đừng khóc nữa, ăn kẹo cho ngọt giọng, mai ta quét bậc thang thay muội." Vị Kiếm Tôn chấn nhiếp thiên hạ của các ngươi, trong mắt ta mãi mãi là người huynh trưởng vụng về và ấm áp như thế đấy!'
      },
      {
        id: 'ols_lt_05',
        subplotTitle: 'Ván Cờ Tàn Trên Đỉnh Mây & Nhát Chém Định Lại Thiên Hà',
        speakerType: 'TIEN_BOI_AN_THE',
        speakerNameAndRole: 'Thương Khung Lão Tổ (Chuẩn Đế ngàn năm, ẩn tu tại Côn Luân Vân Đỉnh)',
        narrativeSetting: 'Bàn cờ đá rêu phong trên đỉnh phù vân mây trắng bồng bềnh, ngắm nhìn giang sơn vạn dặm cùng một vị chí hữu',
        recountedEraOrEvent: 'Năm 150 tuổi • Cuộc kỳ ngộ luận đạo đỉnh cao trước khi sáng lập Vô Cực Kiếm Các',
        associatedTreasureOrRealm: 'Côn Luân Tiên Sơn • Thông Thiên Đạo Trà & Cổ Kỳ Bàn',
        treasureLoreCategory: 'TRUYEN_THUA_CO_TIEN',
        treasureTrialSecret: 'Ván cờ này là ván cờ nghịch thiên giải thế trận diệt thế của Cổ Ma Thần; Lâm Tiêu đã hạ quân cờ thứ 108 bằng một đạo kiếm ý vô dục vô cầu làm vỡ nát thiên kiếp phong ấn.',
        narrativePerspectiveSummary: 'Thán phục, tiếc nuối vì sinh ra không cùng thời đại nhưng hân hoan vì nhân tộc có được người kế thừa vĩ đại',
        historicalTruthVsRumor: 'Thiên hạ đồn Lâm Tiêu kiêu ngạo ngút trời, vung kiếm khiêu chiến các bậc tiền bối để cướp đoạt hư danh. Thực chất chàng đến bái phỏng với tư cách vãn bối cầu đạo, lễ nghi chu toàn, dùng kiếm ý vạch ra con đường cứu vớt nhân tộc khỏi ma kiếp sắp tới.',
        characterVividImpact: 'Dáng vẻ chắp tay khom lưng 90 độ cung kính tạ ơn tiền bối dù thực lực lúc bấy giờ đã vượt xa; chén trà chàng rót luôn nâng bằng hai tay, giữ trọn đạo nghĩa.',
        spokenDialogueDraft: 'Lão phu sống ba ngàn năm, gặp qua vô số thiên kiêu tự xưng cái thế, kẻ thì ngông cuồng tự đại, kẻ thì giả tạo hư danh. Duy chỉ có tiểu tử Lâm Tiêu này khiến lão phu vừa kinh hãi vừa kính phục! Năm ấy hắn bước lên đỉnh mây của ta, tu vi đã chạm tới cảnh giới kinh thế hãi tục, nhưng chiếc áo bào thô vẫn giặt sạch sẽ, quỳ gối dâng trà thỉnh giáo ta thế nào là "Kiếm Chi Sơ Tâm". Khi ta hỏi tại sao hắn không phi thăng Tiên Giới hưởng phúc an nhàn, hắn ngước nhìn giang sơn dưới chân mà rằng: "Vãn bối sinh ra từ mảnh đất này, ăn hạt gạo của phàm trần mà lớn, ngày nào dưới kia còn tiếng than khóc của kẻ yếu, ngày đó kiếm của vãn bối chưa thể rời đi." Lời nói ấy... lão phu đến nay mỗi khi ngắm trăng vẫn thấy hổ thẹn trong lòng!'
      },
      {
        id: 'ols_lt_06',
        subplotTitle: 'Huyền Thiên Cổ Bí Cảnh: Tranh Đoạt Cửu Diệp Hồi Hồn Thảo & Nhát Kiếm Cứu Kẻ Phản Bội',
        speakerType: 'TAM_BAO_GIA_BI_CANH',
        speakerNameAndRole: 'Lôi Tam Đao (Tán tu tầm bảo giang hồ, chuyên săn lùng bí cảnh cấm địa Đông Vực)',
        narrativeSetting: 'Trại thám hiểm bên rìa Cấm Khu Hắc Phong, bên đống lửa trại bập bùng giữa rừng sâu âm u',
        recountedEraOrEvent: 'Năm 20 tuổi • Đại Biến Cố Khai Mở Huyền Thiên Cổ Bí Cảnh',
        associatedTreasureOrRealm: 'Huyền Thiên Cổ Bí Cảnh • Cửu Diệp Hồi Hồn Thảo (Thánh Dược Vạn Năm)',
        treasureLoreCategory: 'THIEN_TAI_DIA_BAO',
        treasureTrialSecret: 'Cửu Diệp Hồi Hồn Thảo mọc ngay trên miệng núi lửa Hắc Viêm, có Lục Giai Hỏa Xà canh giữ. Cứ mỗi phiến lá nở ra là hỏa độc thiêu đốt linh hồn; chàng phải dùng chính kiếm khí phong ấn kinh mạch bản thân để bảo toàn trọn vẹn dược tính cứu phụ thân.',
        narrativePerspectiveSummary: 'Vừa hổ thẹn vừa bái phục sát đất, ân hận vì từng muốn đâm lén sau lưng chàng',
        historicalTruthVsRumor: 'Thế gia rêu rao Lâm Tiêu độc chiếm thánh dược, tàn sát đồng đạo trong bí cảnh. Kỳ thực năm ấy cấm chế sụp đổ ma hỏa bùng phát, mọi người giẫm đạp lên nhau chạy trốn, chính chàng liều mạng quay lại dùng kiếm bổ đôi dòng dung nham cứu thoát ba mươi tán tu!',
        characterVividImpact: 'Vết sẹo bỏng do hỏa độc dung nham in hằn trên mu bàn tay phải; thói quen dùng đầu ngón tay khẽ sờ cánh lá thảo dược với sự nâng niu trân quý tột cùng.',
        spokenDialogueDraft: 'Các ngươi cứ tưởng đoạt được thánh dược là do may mắn hay tàn bạo cướp bóc sao? Lão Lôi ta năm đó cùng sáu tên huynh đệ kết nghĩa xông vào Huyền Thiên Cổ Bí Cảnh, lòng tham nổi lên định tập kích cướp cây Cửu Diệp Hồi Hồn Thảo trên tay hắn. Lúc con Cự Mãng Hắc Viêm quất đuôi đánh sập vòm đá, huynh đệ ta kẻ bỏ chạy người đạp lên nhau... Chỉ có hắn, cái tên thiếu niên mà bọn ta vừa chĩa đao vào, một kiếm chém bay đầu hung thú, rồi vươn bàn tay đã bị nham thạch nướng cháy khét kéo ta lên khỏi vực lửa! Hắn nhìn ta thở dốc bảo: "Cây cỏ này ta lấy để cứu mạng phụ thân ta, còn mạng của các ngươi thì hãy giữ lấy mà về với vợ con." Từ ngày đó, Lôi Tam Đao ta thề ai dám nói xấu Kiếm Tôn một lời, đao này sẽ chém kẻ đó trước!'
      },
      {
        id: 'ols_lt_07',
        subplotTitle: 'Đêm Giám Bảo Chấn Động: Cành Ngộ Đạo Trà & Khối Kiếm Thai Bọc Đất Sét',
        speakerType: 'GIAM_DINH_SU_BAO_CAC',
        speakerNameAndRole: 'Cổ Châm Đại Sư (Đại Trưởng Lão Giám Bảo Các • Vạn Bảo Tiên Thương Minh)',
        narrativeSetting: 'Mật thất ngọc thạch tầng thứ chín của Vạn Bảo Các, dưới ánh đèn minh châu dị bảo lấp lánh',
        recountedEraOrEvent: 'Năm 25 tuổi • Trước thềm Đại Hội Đấu Giá Vạn Tinh Hải',
        associatedTreasureOrRealm: 'Vạn Tinh Hải Tiên Thành • Ngộ Đạo Cổ Trà Thụ Chi & Cửu U Kiếm Thai Cổ Sơ',
        treasureLoreCategory: 'TRUYEN_THUA_CO_TIEN',
        treasureTrialSecret: 'Khối kiếm thai vốn được bọc bởi lớp đất sét Hỗn Độn Phong Ấn từ thuở Khai Thiên, người thường nhìn vào chỉ thấy như hòn đá cuội tầm thường; chỉ có đạo tâm thuần khiết và kiếm ý vô cấu mới đánh thức được Khí Linh cổ xưa đang ngủ say.',
        narrativePerspectiveSummary: 'Kính nể tột cùng, kinh ngạc trước tu dưỡng và sự thanh đạm coi thường tiền bạc của chàng',
        historicalTruthVsRumor: 'Người ngoài đồn Lâm Tiêu đem bán bảo vật trấn phái lấy linh thạch tiêu xài hoang phí. Kỳ thực chàng chỉ đem đổi cành Ngộ Đạo Trà để lấy đan dược giải độc hiếm có mang về cứu đồng môn bị ma độc xâm lấn.',
        characterVividImpact: 'Dáng vẻ bình thản mỉm cười đẩy trả lại xấp ngân phiếu trăm vạn linh thạch cực phẩm; ánh mắt say mê nhìn một khối sắt gỉ sét hơn là ngọc ngà châu báu.',
        spokenDialogueDraft: 'Lão phu giám định bảo vật khắp cửu châu sáu mươi năm, chưa từng thấy người nào kỳ lạ như Lâm thiếu hiệp! Đêm ấy hắn bước vào mật các, mang theo một cành Ngộ Đạo Trà còn vương sương sớm từ Cấm Khu Thần Ma. Vạn Bảo Các ta định giá cành trà đó đủ để mua đứt ba tòa thành trì lớn, nhưng các ngươi biết hắn đổi lấy cái gì không? Hắn chỉ lấy một viên Cửu Chuyển Hóa Ma Đan để giải độc cho một đệ tử ngoại môn tầm thường! Ta hỏi hắn có tiếc không, hắn chỉ cười: "Bảo vật thiên địa sinh ra là để cứu người, nếu giữ khư khư trên kệ ngọc mà nhìn đồng môn chết đi thì thiên tài địa bảo chẳng bằng một nắm đất cát." Nhìn bóng lưng hắn bước đi trong đêm mưa, ta mới hiểu tại sao trời đất lại chọn trao truyền thừa vô thượng cho chàng trai trẻ này!'
      },
      {
        id: 'ols_lt_08',
        subplotTitle: 'Tiếng Thở Dài Vạn Năm Của Khí Linh: Người Vượt Qua Vạn Kiếm Trủng Thượng Cổ',
        speakerType: 'KHI_LINH_THU_HO',
        speakerNameAndRole: 'Thái Sơ Khí Linh (Chân Linh thượng cổ của Hỗn Độn Vô Cực Kiếm Thai)',
        narrativeSetting: 'Trong không gian kiếm vực mông lung sương khói mây ngàn, kiếm ảnh bay lượn như dải ngân hà',
        recountedEraOrEvent: 'Năm 16 tuổi • Rơi xuống Đoạn Hồn Nhai & Đánh thức Cửu U Kiếm Thai',
        associatedTreasureOrRealm: 'Đoạn Hồn Nhai Vạn Trượng • Vạn Kiếm Trủng Thượng Cổ Bí Cảnh',
        treasureLoreCategory: 'BI_CANH_DONG_THIEN',
        treasureTrialSecret: 'Kiểm tra thứ chín trong Vạn Kiếm Trủng là "Bạt Kiếm Vấn Tâm": Người bạt kiếm phải đối mặt với ảo ảnh quyền lực thống trị thế gian hoặc sức mạnh sát phạt vô địch. Ai sinh lòng tham muốn đồ sát thiên hạ sẽ bị kiếm khí vạn cổ nghiền nát thần hồn.',
        narrativePerspectiveSummary: 'Yêu thương, bảo bọc như trưởng bối dõi theo hậu bối, kiêu hãnh vì đã chọn được kiếm chủ chân chính',
        historicalTruthVsRumor: 'Thế nhân tưởng chàng có được thần binh thượng cổ là nhờ cơ duyên nhặt được dưới vực sâu. Nhưng đâu ai biết chàng đã bò bằng mười ngón tay đẫm máu vượt qua mười vạn lưỡi kiếm rỉ sét, từ chối vương quyền ma đạo để chọn bảo vệ cha già.',
        characterVividImpact: 'Thói quen ngồi xếp bằng lau kiếm bằng chiếc khăn tay trắng cũ kỹ; lúc ngủ say trên vách đá vẫn luôn ôm chuôi kiếm vào lòng như người bạn tri kỷ.',
        spokenDialogueDraft: 'Vạn năm qua, ta nằm dưới đáy vực Đoạn Hồn Nhai lạnh lẽo, đã chứng kiến hàng ngàn thiên tài cái thế, cường giả thông thiên nhảy xuống tìm kiếm truyền thừa của chủ nhân ta. Kẻ thì xin ban cho sức mạnh trảm vạn người, kẻ thì thèm khát quyền lực xưng bá bát hoang... Tất cả bọn chúng đều bị kiếm trận chém nát thành tro bụi! Duy chỉ có đứa trẻ mười sáu tuổi gầy gò ấy, toàn thân gãy ba khúc xương, máu tươi nhuộm đỏ từng phiến đá, bò đến trước mặt ta. Ta hỏi nó: "Ngươi muốn kiếm này để làm gì?" Nó ngước đôi mắt trong veo không chút vẩn đục nhìn ta, nghẹn ngào bảo: "Kiếm linh tiền bối... ta muốn kiếm này để gánh củi không bị cướp, để phụ thân ta không phải ho ra máu nữa." Khoảnh khắc ấy, phong ấn vạn năm của ta tự động tan vỡ... Ta biết, người ta đợi vạn năm rốt cuộc đã tới!'
      },
      {
        id: 'ols_lt_09',
        subplotTitle: 'Truyền Thuyết Cây Trường Sinh Dưới Vực Tuyệt Mệnh & Chiếc Lá Phong Ấn Tàn Hồn Sư Phụ',
        speakerType: 'THUYET_THU_NHAN',
        speakerNameAndRole: 'Lão Thuyết Thư Nhân Triệu Cửu Công (Khách điếm Lạc Dương)',
        narrativeSetting: 'Bên bàn trà đông nghịt tu sĩ lúc chập tối, ánh đèn lồng hắt bóng lên bức họa Cây Trường Sinh cổ xưa treo trên vách gỗ',
        recountedEraOrEvent: 'Năm 24 tuổi • Tiến vào Cấm Khu Sinh Mệnh sau biến cố ân sư tự bạo',
        associatedTreasureOrRealm: 'Cấm Khu Sinh Mệnh Tuyệt Cảnh • Hỗn Độn Cây Trường Sinh & Trường Sinh Diệp',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret: 'Vực sâu Cấm Khu Sinh Mệnh có quy tắc "Thời Gian Nghịch Lưu & Luân Hồi Tước Đoạt". Cứ tiến một bước về phía Cây Trường Sinh thì thọ nguyên bị hao tổn một giáp (60 năm). Kẻ tham lam quả trường sinh đều biến thành bộ xương trắng trước khi chạm tới thân cây.',
        immortalTreeConnection: 'Cây Trường Sinh ngàn vạn năm qua chỉ thấy người đến cướp quả để cầu trường sinh bất tử. Nhưng Lâm Tiêu lại dâng hiến ba trăm năm thọ nguyên của bản thân làm mái tóc bạc trắng chỉ để xin đúng một phiến lá non Trường Sinh Diệp cứu lấy tàn hồn mong manh của ân sư. Cảm động trước chân tình, Cây Trường Sinh đã rụng xuống chiếc lá linh thiêng nhất, đồng thời khắc sâu Sinh Mệnh Kiếm Khí vào đan điền chàng.',
        narrativePerspectiveSummary: 'Nghẹn ngào xúc động, thán phục tấm lòng hiếu nghĩa và đạo tâm kiên định coi nhẹ cái chết của vị Kiếm Tôn',
        historicalTruthVsRumor: 'Thế gian đồn Lâm Tiêu xông vào Cấm Khu Sinh Mệnh cướp đoạt Quả Trường Sinh để trở thành Bất Tử Kiếm Thần. Sự thật là ba quả chín mọng rực rỡ tỏa hương ngay trước mắt nhưng chàng không hề liếc nhìn lấy nửa lần, chàng chỉ nhẹ nhàng hái một chiếc lá xanh, quỳ tạ cây thần ba lạy rồi quay lưng rời đi với mái tóc điểm hoa râm.',
        characterVividImpact: 'Một lọn tóc mai bạc trắng trước trán xuất hiện từ năm 24 tuổi; thói quen vô thức đặt bàn tay lên ngực áo nơi cất giữ chiếc lá ngọc phát sáng mỗi khi đứng trước gió thu.',
        spokenDialogueDraft: 'Chư vị có biết cái giá của một chiếc lá trên Cây Trường Sinh đắt đến mức nào không? Cả một vương triều, cả ngàn vạn linh thạch cực phẩm cũng không đổi được! Năm ấy tại Cấm Khu Sinh Mệnh, sương mù tử khí dày đặc đến mức nuốt chửng cả thần thức Đại Thừa kỳ. Lâm thiếu hiệp bước từng bước một, mỗi bước đi là thanh xuân chàng trôi đi như cát chảy qua kẽ tay. Khi chàng quỳ xuống trước gốc cây thần khổng lồ, toàn thân chàng đã phủ đầy tuyết sương năm tháng, mái tóc đen óng ả đã bạc trắng một nửa. Cây Trường Sinh run rẩy cành lá, tiếng thần thụ vang vọng như chuông cổ: "Ngươi cầu quả trường sinh để sống ngang trời đất ư?" Chàng chỉ nâng hai tay, ngước đôi mắt sáng trong mà thưa: "Vãn bối không cầu bất tử. Vãn bối chỉ xin một phiến lá xanh của Người để giữ lại nụ cười của ân sư..." Lời nói ấy làm rung động cả cấm khu vạn cổ!'
      },
      {
        id: 'ols_lt_10',
        subplotTitle: 'Ván Cờ Bên Gốc Cây Trường Sinh Hóa Thạch & Lời Từ Chối Chén Rượu Bất Tử',
        speakerType: 'TIEN_BOI_AN_THE',
        speakerNameAndRole: 'Thương Khung Lão Tổ (Chuẩn Đế ngàn năm tại Côn Luân Vân Đỉnh)',
        narrativeSetting: 'Bên gốc rễ hóa thạch khổng lồ của một nhánh Cây Trường Sinh thời Khai Thiên, sương sớm lãng đãng quanh bàn cờ ngọc',
        recountedEraOrEvent: 'Năm 160 tuổi • Trước thềm đại chiến Vực Ngoại Ma Tộc',
        associatedTreasureOrRealm: 'Côn Luân Tiên Giới Di Tích • Bất Tử Thần Tuyền & Rễ Hóa Thạch Cây Trường Sinh',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret: 'Uống trọn một chung Bất Tử Thần Tuyền từ rễ Cây Trường Sinh sẽ đoạn tuyệt luân hồi sinh tử, nhưng cái giá phải trả là đạo tâm hóa đá, vĩnh viễn mất đi khả năng cảm nhận niềm vui nỗi buồn của nhân gian.',
        immortalTreeConnection: 'Lâm Tiêu dùng kiếm khí tấu lên một điệu đàn "Nhân Gian Khói Lửa" bên gốc cây hóa thạch, dòng kiếm ý ẩn chứa tình yêu thương đồng bào đã làm tan chảy lớp vỏ đá vạn năm, khiến một nhánh rễ khô cằn của Cây Trường Sinh đâm chồi nảy lộc một mầm xanh biếc giữa Côn Luân.',
        narrativePerspectiveSummary: 'Vừa kính nể vừa bùi ngùi tiếc thương cho một kiếm khách chọn gánh vác nỗi đau nhân gian hơn là hưởng phúc an lạc vĩnh hằng',
        historicalTruthVsRumor: 'Người ngoài đồn Thương Khung Lão Tổ đã ban cho Lâm Tiêu một chén trường sinh dược vô thượng để chàng trường tồn bất diệt. Thực tế là Lâm Tiêu đã nâng chén ngọc lên rồi đổ xuống mảnh đất khô cằn dưới chân cội thần mộc.',
        characterVividImpact: 'Dáng vẻ tự tại phe phẩy vạt áo bào mộc mạc bên bàn cờ đá; ánh mắt chan chứa tình cảm hướng về những mái nhà tranh phàm trần xa xăm dưới chân núi.',
        spokenDialogueDraft: 'Lão phu sống ba ngàn năm bên gốc rễ Cây Trường Sinh hóa thạch này, chứng kiến không biết bao nhiêu thánh nhân gào khóc quỳ lạy chỉ mong xin một giọt Bất Tử Thần Tuyền để khỏi phải chết già. Duy chỉ có tiểu tử Lâm Tiêu này bưng chén ngọc lên ngửi một cái rồi khẽ cười. Hắn nghiêng chén đổ dòng nước trường sinh xuống đất rễ, bảo với ta: "Thương Khung tiền bối, cỏ cây có mùa đâm chồi rồi rụng lá, con người có sinh ly tử biệt mới biết quý trọng từng sát na tương phùng. Nếu vì ham sống muôn vạn năm mà phải ngồi trơ trơ như tảng đá nhìn bằng hữu người thân lần lượt ra đi, thì bất tử ấy chẳng qua là một ngục tù cô độc nhất trần gian!" Lúc hắn nói xong, gốc cây hóa thạch ba vạn năm bỗng nhiên nứt vỏ nảy ra một chiếc mầm xanh... Ta biết, đạo tâm của hắn đã vượt qua cả quy luật trường sinh của trời đất!'
      },
      {
        id: 'ols_lt_11',
        subplotTitle: 'Nhiệm Vụ Áp Tải Hắc Sa Vực: Một Mình Chặn Cửa Hang Đoạt Vạn Niên Huyết Tinh Chi & Cứu Hộ Tống Đội',
        speakerType: 'DONG_DOI_NHIEM_VU',
        speakerNameAndRole: 'Liễu Trường Phong (Đội Trưởng Tiền Trạm Chấp Sự Đường Thái Hư Môn, người từng cùng chàng vào sinh ra tử)',
        narrativeSetting: 'Bên lò sưởi than hồng của tiền đồn biên ải tuyết phủ, hai tay nâng bát trà hoa cúc nóng, mắt rưng rưng nhìn ra đèo gió hú',
        recountedEraOrEvent: 'Năm 19 tuổi (Trúc Cơ Đỉnh Phong) • Nhiệm Vụ Hộ Sơn & Áp Tải Thảo Dược Cấp S qua Hắc Sa Ma Vực',
        associatedMissionOrQuest: 'Huyền Thưởng Cấp Địa: Hộ Tống 10 Vạn Viên Tụ Linh Đan & Cây Giống Trường Sinh Thảo Qua Hắc Sa Ma Vực',
        missionExecutionTruth:
          'Hồ sơ lưu trữ tại Chấp Sự Đường chỉ vỏn vẹn một dòng mực son: "Đoàn áp tải bị phục kích, đệ tử Lâm Tiêu hộ tống thành công 100% thảo dược về căn cứ". Nhưng Liễu Trường Phong là người tận mắt chứng kiến chân tướng: Khi pháp trận phi chu bị ba trăm ma tu phá vỡ, mười hai đệ tử trẻ hoảng loạn. Chính thiếu niên áo trắng Lâm Tiêu đã giật lấy dây cương, một mình nhảy khỏi boong tàu lao xuống sa mạc, lấy kiếm khí vẽ một vòng ranh giới đỏ rực cấm địa. Chàng một mình dùng kiếm gãy chống đỡ vạn mũi Hắc Sa Độc Tiễn suốt năm canh giờ để phi chu bay đi. Khi đoàn cứu viện tới, chàng đang tựa lưng vào vách đá, tự tay dùng kiếm hỏa nướng rát vết thương để khử độc, môi khô nứt nẻ nhưng câu đầu tiên chàng hỏi là: "Cây giống Trường Sinh Thảo trên thuyền có rụng mất chiếc lá nào không?"',
        associatedTreasureOrRealm: 'Hắc Sa Ma Vực Cấm Địa • Vạn Niên Huyết Tinh Chi & Giống Cây Thần Mộc Trường Sinh',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret:
          'Cây giống thần mộc và Huyết Tinh Chi phải được nuôi dưỡng bằng linh khí thuần dương trong lúc di chuyển; nếu thiếu linh khí sẽ khô héo trong chớp mắt. Lâm Tiêu đã không ngần ngại trích xuất đan điền tinh huyết của chính mình truyền vào bầu đất để giữ cho mầm cây luôn xanh tươi suốt dọc đường.',
        immortalTreeConnection:
          'Chính nhánh mầm Cây Trường Sinh được Lâm Tiêu bảo toàn bằng cả tính mạng trong chuyến nhiệm vụ này sau đó đã được ươm mầm tại Hậu Sơn Thái Hư Tông, tạo nên một vùng linh khí bất diệt che chở cho hàng ngàn đệ tử nghèo khó không bị ma khí xâm thực.',
        narrativePerspectiveSummary:
          'Sùng kính và biết ơn trọn đời, xem Lâm Tiêu như ân nhân tái sinh không chỉ của bản thân mà của toàn thể anh em đội áp tải',
        historicalTruthVsRumor:
          'Ngoại giới đồn Lâm Tiêu tham công đoạt vị, muốn lập đại công trước mặt Chưởng Môn nên liều mạng làm liều. Sự thật là toàn bộ linh thạch tiền thưởng nhiệm vụ mười vạn viên cực phẩm chàng không lấy một cắc, mà chia đều cho gia quyến ba đệ tử bị thương tật trong đội.',
        characterVividImpact:
          'Vết sẹo bỏng do hỏa độc đốt khử độc in hình cánh sen lửa trên bả vai trái; thói quen mỗi khi nhận thù lao nhiệm vụ luôn lẳng lặng trích ra một nửa gửi vào quỹ dưỡng lão của các tạp dịch già yếu.',
        spokenDialogueDraft:
          'Mấy đứa tân đệ tử các ngươi nhìn bảng phong thần chỉ thấy tên Lâm Sư Huynh đứng đầu bảng nhiệm vụ cấp S, các ngươi tưởng làm nhiệm vụ là vẻ vang cưỡi mây ngắm cảnh chắc? Năm ấy tại Hắc Sa Vực, cát vàng nuốt chửng ánh mặt trời, ma tu vây kín như kiến cỏ. Ta là đội trưởng mà chân tay run lẩy bẩy buông cả đao. Chính Lâm sư đệ lúc đó mới mười chín tuổi, bạch y rách nát thấm đẫm cát bụi, đã vỗ vai ta cười bảo: "Liễu huynh đệ, huynh lái thuyền đưa các sư đệ về trước đi, ở đây để ta lo." Rồi đệ ấy nhảy thẳng vào giữa bầy ma tu! Khi bọn ta quay lại ứng cứu, đệ ấy đang ngồi bên xác con đầu lĩnh ma thú, tay áo cháy xém, tự dùng mũi đoản kiếm nung đỏ cạy từng đầu mũi tên độc găm vào xương sườn... Đệ ấy không khóc, không rên một tiếng, chỉ ngước nhìn ta nhe răng cười: "Huynh đệ, thảo dược bình an là tốt rồi, đưa ta bầu nước uống đỡ khát nào!" Vị Kiếm Tôn vô địch của các ngươi... là bò lên từ những vũng máu nhiệm vụ như thế đấy!'
      },
      {
        id: 'ols_lt_12',
        subplotTitle: 'Nhiệm Vụ Đáy Băng Đàm: Đoạt Thái Sơ Hỗn Độn Thạch & Chiếc Áo Bào Đẫm Máu Sưởi Ấm Đạo Lữ',
        speakerType: 'DONG_MON_DE_TU',
        speakerNameAndRole: 'Khương Nhược Thủy (Chấp Sự Trưởng Lão Tiếp Nhận Nhiệm Vụ • Tàng Bảo Các Thái Hư Môn)',
        narrativeSetting: 'Bên bàn ngọc kiểm kê chiến lợi phẩm nhiệm vụ của Tàng Bảo Các, ngắm nhìn khối Thái Sơ Thạch rực sáng',
        recountedEraOrEvent: 'Năm 20 tuổi • Hoàn thành Nhiệm Vụ Thí Luyện Cấp Tối Mật Thái Sơ Hỗn Độn Động Thiên',
        associatedMissionOrQuest: 'Nhiệm Vụ Thí Luyện Cấp Tối Mật: Khám Phá Thái Sơ Hỗn Độn Động Thiên & Đoạt Thái Sơ Thạch Dưới Đáy Đàm',
        missionExecutionTruth:
          'Báo cáo sát hạch ghi: "Đệ tử Lâm Tiêu nộp đủ Thái Sơ Hỗn Độn Thạch thượng phẩm và Giao Châu Cửu Đầu Băng Giao, đạt điểm tuyệt đối". Nhưng Khương Nhược Thủy nhớ rõ lúc chàng giao nộp: Toàn thân chàng đông cứng như một pho tượng đá, các khớp ngón tay tím tái rớm máu vì áp suất hàn đàm nghìn trượng. Chàng một mình đánh gục Cửu Đầu Băng Giao nhưng không lấy yêu đan cho bản thân mà dâng trọn linh dược cho Lạc Thanh Hàn để cứu nàng khỏi tử kiếp hàn độc.',
        associatedTreasureOrRealm: 'Thái Sơ Hỗn Độn Động Thiên • Thái Sơ Hỗn Độn Thạch & Cửu Đầu Băng Giao Châu',
        treasureLoreCategory: 'BI_CANH_DONG_THIEN',
        treasureTrialSecret:
          'Muốn tiếp cận khối Thái Sơ Thạch dưới đáy động thiên phải vượt qua Băng Hồn Sát Trận; mỗi bước đi sẽ kích hoạt ký ức kiếp nạn đau khổ nhất trong đời người tu sĩ, nếu sinh lòng oán hận sẽ bị hàn băng đông vỡ linh hồn.',
        immortalTreeConnection:
          'Khối Thái Sơ Thạch này hấp thụ linh khí viễn cổ từ cội rễ Cây Trường Sinh ngầm dưới lòng đất Bắc Hoang, chứa đựng quy tắc tạo hóa giúp Lâm Tiêu sau này đúc thành Cửu Chuyển Hỗn Độn Kim Đan hoàn mỹ.',
        narrativePerspectiveSummary:
          'Kính nể đức tính khiêm nhường và tình cảm sâu nặng son sắt, không màng hư danh lợi lộc của chàng',
        historicalTruthVsRumor:
          'Thiên hạ đồn Lâm Tiêu ỷ mạnh cướp công của đồng môn trong bí cảnh để độc chiếm thần vật kết đan. Thực tế là chàng nhường toàn bộ chiến lợi phẩm quý giá nhất cho người khác, chỉ giữ lại một mảnh đá vụn làm kỷ niệm.',
        characterVividImpact:
          'Thói quen luôn nhẹ nhàng hà hơi sưởi ấm bàn tay trước khi chạm vào ngọc giản nhiệm vụ; nụ cười thanh thản khi biết người thương đã bình an qua cơn nguy kịch.',
        spokenDialogueDraft:
          'Hôm đó tại Tàng Bảo Các, ta là người trực tiếp nhận bàn giao chiến lợi phẩm từ tay Lâm Tiêu. Vừa chạm vào khối Thái Sơ Thạch, ta đã giật mình vì đá lạnh đến mức làm nứt cả bàn ngọc! Vậy mà các ngươi có biết chàng thiếu niên đó bước vào trong tình trạng nào không? Áo bào trắng của hắn bị vuốt Băng Giao xé rách tả tơi, nhuộm đỏ máu tươi đã đông cứng thành những vệt đá đỏ sẫm. Ta bảo hắn ngồi xuống để ta gọi đan sư băng bó, hắn chỉ xua tay cười yếu ớt: "Đa tạ trưởng lão, đệ tử không sao. Mau đem viên Giao Châu này sang Băng Dược Phong cứu nàng ấy... Nàng ấy chịu lạnh giỏi hơn ta nhưng độc phát tác rồi, chậm một khắc là nguy hiểm." Nói xong hắn ngã gục ngay bậc cửa! Một người vì đạo lữ, vì nhiệm vụ mà coi nhẹ cả tính mạng bản thân như thế, làm sao mà không trở thành Kiếm Tôn đứng đầu thiên hạ cho được!'
      },
      {
        id: 'ols_lt_13',
        subplotTitle: 'Đột Phá Kim Đan Cực Cảnh: Cửu Trọng Tử Tiêu Lôi Kiếp & Nhất Kiếm Chỉ Trời Ngưng Hỗn Độn Đan',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Vấn Kiếm Lão Nhân (Thái Thượng Trưởng Lão Hộ Kiếp • Thái Hư Kiếm Tông)',
        narrativeSetting: 'Bên bờ vực Vấn Kiếm Nhai sau cơn lôi kiếp, ngắm nhìn vệt sét nứt toác kéo dài trăm dặm trên sườn núi đá hoa cương',
        recountedEraOrEvent: 'Năm 20 tuổi (Trúc Cơ Đỉnh Phong -> Kết Đan Kỳ) • Biến Cố Đột Phá Cửu Chuyển Hỗn Độn Kim Đan',
        breakthroughCultivationStage: 'Trúc Cơ Viên Mãn -> Kết Đan Cực Phẩm (Cửu Chuyển Hỗn Độn Kim Đan)',
        tribulationOrPhenomenon: 'Cửu Trọng Tử Tiêu Thần Lôi & Vạn Kiếm Tề Minh Dị Tượng bao trùm ngàn dặm Đông Vực',
        breakthroughRealTruth:
          'Người đời đồn Lâm Tiêu nuốt được Thái Sơ Hỗn Độn Thạch nên dễ dàng kết đan không tốn sức. Nhưng Vấn Kiếm Lão Nhân - người lập trận hộ kiếp - tận mắt chứng kiến sự thật kinh hoàng: Để đúc thành Hỗn Độn Kim Đan nghịch thiên không tỳ vết, chàng đã từ chối dùng Lôi Đình Hộ Phù. Khi đạo lôi kiếp thứ chín giáng xuống xé rách đan điền thành chín mảnh, chàng đã dùng chính kiếm ý thuần dương và tinh huyết thiêu đốt thần hồn để nung chảy chín mảnh vỡ, ép chúng hợp nhất thành viên kim đan màu xám tro hỗn độn. Khi kết đan thành công, toàn thân chàng cháy đen, máu ứa ra từ bảy khiếu, nhưng đôi mắt sáng rực tựa sao trời, tay vẫn siết chặt chuôi kiếm chỉ thẳng vào lôi vân trên chín tầng trời.',
        associatedTreasureOrRealm: 'Bắc Hoang Hàn Đàm • Thái Sơ Hỗn Độn Thạch & Tử Tiêu Thần Lôi Bí Cảnh',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Cửu Chuyển Kim Đan nghịch lại ý trời, mỗi vòng xoay chuyển trong đan điền sẽ tạo ra lôi hỏa thiêu đốt kinh mạch; người tu luyện phải sở hữu kiếm cốt bất khuất và đạo tâm không sợ cái chết mới không bị nổ tung đan điền trong tích tắc.',
        immortalTreeConnection:
          'Khi đan điền chàng suýt vỡ nát dưới đòn sét thứ chín, phiến lá Cây Trường Sinh ngậm trong miệng đã phóng thích một giọt mộc dịch tinh khiết vá lành kinh mạch trong tích tắc, giúp chàng niết bàn thành công và kết nối sinh mệnh với cội rễ thông thiên.',
        narrativePerspectiveSummary:
          'Kinh ngạc thán phục, vừa run sợ vừa tự hào vì nhân tộc đã sinh ra một kiếm đạo quái kiệt ngàn năm có một',
        historicalTruthVsRumor:
          'Ngoại giới đồn Lâm Tiêu dùng yêu thuật hoặc cấm dược tà môn mới dẫn phát dị tượng Tử Tiêu Lôi Kiếp. Thực tế là đạo tâm nghịch thiên và kiếm ý vô cấu của chàng đã chọc giận quy tắc thiên đạo, buộc trời phải hạ lôi phạt tiêu diệt.',
        characterVividImpact:
          'Vết sẹo lôi hỏa hình lưỡi kiếm nhỏ in mờ nơi mi tâm; thói quen mỗi khi trời nổi giông bão đều đứng lặng trên mỏm đá ngắm lôi điện với ánh mắt bình thản như nhìn cố nhân.',
        spokenDialogueDraft:
          'Lão phu tu kiếm hai ngàn năm, hộ pháp cho không biết bao nhiêu thiên kiêu kết đan độ kiếp, kẻ nào cũng run như cầy sấy trong pháp trận hộ thân! Duy chỉ có tiểu tử Lâm Tiêu này khiến lão phu vừa chết lặng vừa run rẩy. Hắn đá văng ba đạo hộ thân ngọc phù ra ngoài, một mình khoác áo thô đứng giữa đỉnh núi! Khi đạo Tử Tiêu Lôi thứ chín giáng xuống to như cột chống trời, đan điền hắn nứt toác, máu phun nhuộm đỏ vách đá... Vậy mà hắn không cúi đầu! Hắn gầm lên vung kiếm chém ngược lên trời, thanh âm xé toạc sấm sét: "Đạo này do ta định, trời dám cản ta, ta trảm cả trời!" Khoảnh khắc viên Kim Đan màu xám tro ngưng tụ, vạn thanh kiếm rỉ sét của cả Thái Hư Tông đồng loạt bay lên cắm quanh người hắn bái lạy... Lão phu biết, kiếm đạo của nhân tộc từ nay đã có người gánh vác!'
      },
      {
        id: 'ols_lt_14',
        subplotTitle: 'Hóa Phàm Lịch Kiếp: Ba Mươi Năm Làm Thợ Đóng Giày Chốn Hồng Trần & Đốn Ngộ Hóa Thần Kiếm Ý',
        speakerType: 'CO_NHAN_HAN_VI',
        speakerNameAndRole: 'Lý Thiết Đầu (Thợ rèn già láng giềng phố cổ Lạc Dương, bạn uống rượu bình dân suốt 30 năm)',
        narrativeSetting: 'Bên hiên quán nước trà bình dân ở ngõ Hẻm Cũ Lạc Dương, tay gõ nhẹ vào chiếc đế giày da cũ sờn',
        recountedEraOrEvent: 'Năm 120 - 150 tuổi • Giai đoạn phong bế toàn bộ tu vi Hóa Phàm Đốn Ngộ Đột Phá Hóa Thần',
        breakthroughCultivationStage: 'Nguyên Anh Viên Mãn -> Hóa Thần Cảnh Giới (Lĩnh Ngộ Sinh Tử Luân Hồi Kiếm Vực)',
        tribulationOrPhenomenon: 'Hóa Phàm Ba Mươi Năm Không Một Tia Linh Khí; Ngày Đốn Ngộ Kiếm Ý Quét Sạch Mây Mù Cửu Thiên Không Gây Tiếng Động',
        breakthroughRealTruth:
          'Tu chân giới đồn Lâm Tiêu bế quan ba mươi năm trong cấm địa bí mật của tông môn, nuốt hàng ngàn viên Hóa Thần Đan mới đột phá. Nhưng Lý Thiết Đầu - người hàng xóm cùng ngõ - nhớ rõ: Chàng thợ đóng giày tên "A Tiêu" hiền lành sống cạnh nhà suốt ba mươi năm, ngày ngày dùng dùi sắt khâu từng đường kim mũi chỉ cho phu xe, bà bán rau. Chàng sống trọn kiếp phàm nhân, trải qua sinh lão bệnh tử của hàng xóm, thấu hiểu nỗi đau và niềm vui trần thế. Vào một buổi chiều tà tuyết rơi, khi tiễn đưa một cụ già phu xe qua đời, A Tiêu buông chiếc dùi sắt, ngước nhìn hoa tuyết bay mà ngộ ra "Kiếm chi chân ý tại nhân gian". Khoảnh khắc ấy, không cần đan dược, không cần lôi kiếp hung bạo, ngàn dặm mây mù tự tan, chàng bước lên mây trở thành Hóa Thần Kiếm Tôn vô khuyết.',
        associatedTreasureOrRealm: 'Lạc Dương Phố Cổ • Chiếc Dùi Sắt Đóng Giày & Hóa Phàm Đạo Quả Cổ Tiên',
        treasureLoreCategory: 'TRUYEN_THUA_CO_TIEN',
        treasureTrialSecret:
          'Hóa Phàm là cửa ải nguy hiểm nhất của Hóa Thần: Người tu phải phong ấn hoàn toàn ký ức tu sĩ và linh lực, nếu trong ba mươi năm bị cám dỗ hoặc chết như người phàm thì nguyên thần sẽ tiêu tán vĩnh viễn không thể hồi phục.',
        narrativePerspectiveSummary:
          'Xúc động bùi ngùi nhớ về người bạn tri kỷ xóm lao động, tự hào vì hiểu được tâm hồn cao đẹp của một vị thần tiên',
        historicalTruthVsRumor:
          'Người đời tưởng các vị Kiếm Tôn sinh ra đã cao ngạo xa cách cõi trần, ngồi trên mây uống rượu ngọc. Kỳ thực cảnh giới Hóa Thần của chàng được đúc kết từ từng hạt gạo, giọt mồ hôi và nỗi đau của những người nghèo khổ chốn nhân gian.',
        characterVividImpact:
          'Dáng vẻ khom lưng tỉ mỉ gọt từng miếng da bò; nụ cười hiền từ khi trao đôi giày ấm cho đứa trẻ nghèo đi chân đất giữa mùa đông giá rét.',
        spokenDialogueDraft:
          'Cái gì mà Kiếm Tôn hô mưa gọi gió chứ? Ba mươi năm trời hắn ngồi ngay cạnh lò rèn của ta, cúi đầu khâu từng chiếc giày rách cho đám phu xe bọn ta đây này! Tay hắn chai sần, mùa đông rét buốt hắn cũng chỉ xoa hai bàn tay vào nhau hơ nhờ lửa than của ta rồi cười hiền khô: "Bác Lý, uống chén rượu đế cho ấm bụng." Đến ngày ông lão phu xe đầu ngõ qua đời, hắn đứng tiễn quan tài ra đồng, nhìn từng bông tuyết rơi xuống mộ đất... Bỗng nhiên hắn buông chiếc dùi sắt xuống, trên người hắn không có sấm sét, không có cuồng phong, nhưng mây mù xám xịt trên trời Lạc Dương bỗng nứt toác ra thành một luồng ánh sáng vàng rực rỡ! Hắn quay lại vái chào ta một lạy rồi nhẹ nhàng bay lên trời... Ta đứng ngây người làm rơi cả búa sắt. Lúc đó ta mới hiểu: Thần tiên chân chính không phải là kẻ biết bay, mà là kẻ biết thương lấy từng hạt bụi của trần gian!'
      },
      {
        id: 'ols_lt_15',
        subplotTitle: 'Đột Phá Cửu Phẩm Hỗn Độn Nguyên Anh: Trận Đạo Kiếp Cửu Trọng Tại Vạn Kiếm Trủng & Hóa Thần Kiếm Thai Bất Diệt',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Huyền Kiếm Tôn Giả (Đại Trưởng Lão Chấp Pháp Hộ Đạo • Thái Hư Kiếm Tông)',
        narrativeSetting: 'Trên mỏm đá nhô ra giữa tầng mây lôi điện Vấn Kiếm Đài, gió rít từng cơn thổi tung mái tóc bạc phơ của vị lão giả',
        recountedEraOrEvent: 'Năm 45 tuổi (Kim Đan Viên Mãn -> Nguyên Anh Cực Cảnh) • Phá quan đúc thành Cửu Phẩm Hỗn Độn Kiếm Thai Nguyên Anh',
        breakthroughCultivationStage: 'Kim Đan Viên Mãn -> Cửu Phẩm Hỗn Độn Nguyên Anh (Vô Thượng Kiếm Thai Thể)',
        tribulationOrPhenomenon: 'Hỗn Độn Cửu Tiêu Diệt Thế Lôi & Vạn Cổ Kiếm Hồn Từ Vạn Kiếm Trủng Đồng Loạt Phục Bái Dưới Mây Đen',
        breakthroughRealTruth:
          'Các tông môn đồn đại Lâm Tiêu nuốt Tiên Thiên Đạo Đan thượng cổ mới ngưng kết được Cửu Phẩm Nguyên Anh không một tia tạp chất. Huyền Kiếm Tôn Giả - người duy nhất đứng bên ngoài kết giới hộ pháp - thuật lại: Khi đan điền chàng nứt toác để thai nghén Nguyên Anh, chín luồng Hỗn Độn Diệt Kiếp Lôi giáng xuống không phải tôi luyện mà là muốn hủy diệt triệt để nghịch đạo. Chàng không dùng Tiên Hộ Trận, mà mở toang tâm thần nghênh đón lôi phạt, để sấm sét bổ dọc đan điền. Thần hồn của chàng bị xé làm ngàn mảnh trong biển lôi hỏa; chính ý chí muốn bảo hộ người thân và một phiến lá Cây Trường Sinh ngậm trong miệng đã tỏa ra sinh mệnh lục quang gắn kết ngàn mảnh vỡ thần hồn thành một thanh kiếm nhỏ màu xám tro - Hỗn Độn Kiếm Thai Nguyên Anh bất diệt.',
        associatedTreasureOrRealm: 'Vạn Kiếm Trủng Thượng Cổ • Hỗn Độn Kiếm Phách & Nhánh Rễ Cây Trường Sinh Viễn Cổ',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm Vấn Kiếm Bạt Hồn: Khi Nguyên Anh thành hình, vạn kiếm tàn hồn thời thượng cổ sẽ tràn vào thức hải khảo hạch sát niệm. Nếu người tu sĩ có một tia tà niệm muốn đồ sát thiên hạ hay nô dịch chúng sinh, vạn kiếm tàn hồn sẽ lập tức nổ tung hủy diệt thức hải.',
        immortalTreeConnection:
          'Phiến lá Cây Trường Sinh chàng từng đổi bằng ba trăm năm thọ nguyên năm 24 tuổi đã hóa thành một đóa hoa sen sinh mệnh bao bọc lấy Nguyên Anh, giúp kiếm khí sắc bén vô song của chàng vĩnh viễn không bao giờ làm tổn thương sinh linh lương thiện và có khả năng niết bàn sau những lần trọng thương tưởng chết.',
        narrativePerspectiveSummary:
          'Kính sợ như nhìn thấy một kỳ tích sống, thán phục sự chịu đựng phi nhân loại và đạo tâm kiên định đến mức làm trời đất cũng phải khuất phục',
        historicalTruthVsRumor:
          'Người đời tưởng các thiên tài đột phá Nguyên Anh êm thấm trong động phủ xa hoa, hương trầm nghi ngút. Chân tướng là đài độ kiếp của chàng biến thành hố sâu trăm trượng, đá tan chảy thành dung nham, và chàng bước ra từ vũng máu với nụ cười thanh thản.',
        characterVividImpact:
          'Vết sẹo kiếm lôi màu lam tím hình lưỡi gươm sau gáy; thói quen mỗi khi đốn ngộ đều lặng lẽ đưa tay xoa nhẹ phiến lá ngọc Cây Trường Sinh trước ngực áo như lắng nghe nhịp thở của muôn loài.',
        spokenDialogueDraft:
          'Lão phu tu kiếm hơn ngàn năm, chứng kiến bao nhiêu Nguyên Anh thiên tài, kẻ nào độ kiếp xong cũng bơ phờ kiệt quệ, vội vã nuốt đan dược tĩnh dưỡng. Nhưng các ngươi có biết Lâm Tiêu năm ấy độ Nguyên Anh kiếp thế nào không? Chín đạo Hỗn Độn Lôi giáng xuống, đan điền hắn vỡ vụn ra thành trăm mảnh! Máu hắn phun ướt đẫm cả đài đá vạn năm! Lão phu toan vung kiếm phá kết giới xông vào cứu, thì hắn hét lên giữa bão sấm: "Huyền Kiếm tiền bối chớ vào! Kiếm này không gãy, thân này không tàn, lôi kiếp này chỉ là đá mài kiếm cho ta mà thôi!" Hắn dùng ngón tay đẫm máu vẽ kiếm quyết trong không trung, ép chín đạo sấm sét cuộn tròn lại rèn thành thanh Nguyên Anh kiếm thai! Khi mây tan, hắn đứng giữa hố dung nham cháy đỏ, áo rách tả tơi, miệng ngậm chiếc lá Trường Sinh Diệp tỏa hào quang xanh biếc, quay sang nhìn lão phu cười sảng khoái: "Tiền bối, lôi kiếp này gội rửa đan điền thật sảng khoái!" Ta đứng nhìn mà râu tóc run rẩy... Kiếm tu như thế, hỏi sao vạn cổ không ai bì kịp!'
      },
      {
        id: 'ols_lt_16',
        subplotTitle: 'Đột Phá Độ Kiếp Chuẩn Đế: Vạn Đạo Quy Nhất Dưới Tán Cây Trường Sinh & Nhất Niệm Trảm Ma Kiếp Cứu Thương Sinh',
        speakerType: 'KE_THU_SONG_SOT',
        speakerNameAndRole: 'Huyết Sát Ma Tôn (Thống Lĩnh Ma Quân Sống Sót • Kẻ Thù Bại Dưới Mũi Kiếm Lâm Tiêu)',
        narrativeSetting: 'Trong mật thất ngục tối tàn tạ sâu dưới lòng đất, toàn thân quấn xích sắt, mắt run rẩy nhìn ánh hoàng hôn lọt qua khe cửa',
        recountedEraOrEvent: 'Năm 300 tuổi (Hợp Thể Viên Mãn -> Độ Kiếp Chuẩn Đế) • Đại Chiến Thần Ma & Phá Quan Dưới Tán Cây Trường Sinh',
        breakthroughCultivationStage: 'Hợp Thể Viên Mãn -> Độ Kiếp Chuẩn Đế (Hỗn Độn Kiếm Đế Bất Tử Thể)',
        tribulationOrPhenomenon: 'Cửu Cửu Quy Nhất Diệt Thế Ma Lôi Kiếp & Dị Tượng Cây Trường Sinh Bung Nở Tán Lá Xanh Mười Vạn Dặm Bao Bọc Càn Khôn',
        breakthroughRealTruth:
          'Ma giới rêu rao rằng Lâm Tiêu luyện hóa hàng triệu ma hồn để tế kiếm mới bước qua ngưỡng cửa Chuẩn Đế. Huyết Sát Ma Tôn - kẻ trực tiếp chỉ huy trận vây hãm - run rẩy nhớ lại sự thật: Khi chín chín tám mốt đạo Diệt Thế Ma Lôi giáng xuống với sức công phá hủy diệt toàn bộ cõi Đông Vực, Lâm Tiêu đã không bạt kiếm chém giết ma tộc để đoạt hồn. Chàng cắm chuôi kiếm Hỗn Độn xuống đất, dang hai tay ôm lấy cội rễ Cây Trường Sinh, dùng chính nhục thân và thần hồn gánh chịu 100% lôi kiếp hủy diệt. Máu của chàng rơi xuống đất nở thành những đóa sen sinh mệnh màu vàng rực rỡ, thanh tẩy toàn bộ ma khí độc hại. Chàng ngộ ra "Đại Ái Kiếm Đạo" - dùng kiếm để bao bọc che chở chứ không phải đồ sát, bước lên cảnh giới Kiếm Đế vô địch thiên hạ.',
        associatedTreasureOrRealm: 'Khai Thiên Di Tích Tuyệt Cảnh • Vạn Cổ Cây Trường Sinh Hạch Tâm & Hỗn Độn Vô Cực Kiếm Thai',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Trường Sinh Diệt Tình": Thiên đạo viễn cổ yêu cầu người muốn thành Đế phải chặt đứt thất tình lục dục, xem chúng sinh vạn vật như rơm rác. Lâm Tiêu kiên quyết từ chối thiên mệnh máu lạnh, tuyên bố: "Đạo của ta sinh ra từ nhân gian khói lửa, nếu thành Đế mà quên đi cội nguồn bằng hữu đồng đạo thì Đế vị này chẳng đáng một xu!"',
        immortalTreeConnection:
          'Cây Trường Sinh Khai Thiên rung động trước đại nguyện vị tha của chàng đã thả xuống một giọt Bất Tử Thần Lộ tinh khiết ngưng tụ vào mi tâm chàng thành ấn ký Trường Sinh Kiếm Văn màu ngọc bích, ban cho chàng sinh mệnh lực vô cùng vô tận, vĩnh viễn không bao giờ cạn kiệt linh lực trong chiến đấu.',
        narrativePerspectiveSummary:
          'Kinh hoàng tột độ xen lẫn sự sùng kính tuyệt đối từ một kẻ thù từng thề lấy mạng chàng, thừa nhận sự chênh lệch vĩ đại về nhân cách và cảnh giới',
        historicalTruthVsRumor:
          'Ma tộc rêu rao chàng là đồ tể tàn sát sinh linh. Kỳ thực chính nhờ nhát kiếm và thân thể chàng gánh đỡ lôi kiếp mà hàng triệu sinh linh hai giới Ma - Tiên mới không bị thiên lôi diệt thế nghiền thành tro bụi.',
        characterVividImpact:
          'Vết sẹo lôi hỏa hình cành Cây Trường Sinh mọc rễ ngay giữa ngực áo chàng; thói quen mỗi khi thắng trận đại thắng đều đứng lặng trước gió thu, cúi đầu rót một chung rượu nóng tạ ơn đất trời và tưởng nhớ những người đã ngã xuống.',
        spokenDialogueDraft:
          'Các ngươi không thể hiểu được cảm giác kinh hoàng đó đâu... Năm ấy tại Khai Thiên Di Tích, ba mươi vạn ma quân của ta vây kín hắn, trời giáng Diệt Thế Lôi to như cả dãy núi đổ ụp xuống đầu tất cả chúng ta! Ta tưởng chết chắc rồi! Nhưng các ngươi biết Lâm Tiêu đã làm gì không? Hắn không trảm ta, hắn cắm kiếm xuống đất, dang hai tay gánh trọn vạn đạo lôi điện! Sét đánh nát da thịt hắn, máu hắn tuôn như suối... vậy mà hắn ngước mặt lên trời cười rạng rỡ! Từng giọt máu hắn rơi xuống đất biến thành hoa sen xanh, ma khí trong người ta bị ánh sáng ấy hóa giải sạch trơn! Hắn quay sang nhìn ta, ánh mắt trong veo không một gợn sát khí, bảo rằng: "Sống sót mà quay về đi... trần gian này sinh mệnh nào cũng đáng quý, đừng chém giết vô ích nữa." Khoảnh khắc đó, Huyết Sát ta biết... cả đời này Ma tộc vĩnh viễn không bao giờ thắng nổi người đàn ông đó!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 2. LẠC THANH HÀN - BĂNG PHÁCH TIÊN TỬ / BĂNG HOÀNG THÁNH NỮ
  // -----------------------------------------------------------------------
  {
    characterId: 'char_lac_thanh_han',
    characterName: 'Lạc Thanh Hàn',
    characterAlias: 'Băng Phách Tiên Tử / Băng Hoàng Thần Nữ',
    overviewPhilosophy:
      'Lấy băng tâm ngưng tụ kiếm cốt, trước lạnh lùng xa cách ngàn dặm, sau vì đạo lữ mà dốc cạn chân tình. Nhất niệm tình thâm, vạn kiếp bất hối.',
    lifeDestinyVow:
      'Áp chế cực âm hàn độc, thức tỉnh trọn vẹn Cực Âm Băng Hoàng Thể, cùng Lâm Tiêu bước lên đỉnh phong Tiên Giới.',
    relations: [
      {
        id: 'rel_lth_01',
        category: 'CHA_ME',
        targetName: 'Lạc Huyền Cơ & Mộ Dung Lan',
        targetRoleOrTitle: 'Phụ Mẫu - Tộc Trưởng Lạc Gia Bắc Hoang',
        intimacyLevel: 70,
        status: 'Còn Sống',
        originStory:
          'Gia tộc vì lợi ích liên hôn từng muốn ép nàng gả cho Thánh Tử Vô Lượng Tông; nàng rút kiếm tự cắt vạt áo đoạn tuyệt ép hôn, một mình bái nhập Thái Hư Tông.',
        currentDynamics:
          'Sau khi nàng cùng Lâm Tiêu trở thành cường giả cửu cảnh, Lạc gia kính sợ nhận lỗi và tôn sùng nàng làm Tối Cao Trưởng Lão.',
        karmicTies: 'Huyết mạch sinh thành nhưng ân đoạn nghĩa tuyệt đối với mưu đồ gia tộc.'
      },
      {
        id: 'rel_lth_02',
        category: 'VO_DAO_LU',
        targetName: 'Lâm Tiêu',
        targetRoleOrTitle: 'Đạo Lữ Đồng Tâm - Thiếu Kiếm Tôn Thái Hư Môn',
        intimacyLevel: 100,
        status: 'Còn Sống',
        originStory:
          'Được Lâm Tiêu cứu mạng bằng dương hỏa trong lúc bộc phát hàn độc tại Hàn Đàm. Chàng là người duy nhất nhìn thấu sự yếu đuối sau vỏ bọc băng giá của nàng.',
        currentDynamics:
          'Cùng song tu hợp bích Băng Hỏa Cửu Trọng Kiếm Trận, không rời không bỏ.',
        karmicTies: 'Mệnh cách tương giao, đạo tâm tương liên.'
      },
      {
        id: 'rel_lth_03',
        category: 'CON_CAI',
        targetName: 'Lâm Thần',
        targetRoleOrTitle: 'Nhi Tử - Kế Thừa Băng Hỏa Kiếm Thể',
        intimacyLevel: 98,
        status: 'Còn Sống',
        originStory:
          'Kết tinh tình yêu sâu đậm giữa hai đại thiên kiêu. Nàng dồn hết tâm huyết luyện chế bảo y bảo hộ con.',
        currentDynamics:
          'Dạy dỗ con trai đạo lý làm người và sự kiên trì trong kiếm đạo.',
        karmicTies: 'Tình mẫu tử thiêng liêng.'
      },
      {
        id: 'rel_lth_04',
        category: 'SU_HUYNH_DE',
        targetName: 'Tuyết Kiếm Chân Nhân',
        targetRoleOrTitle: 'Ân Sư - Đỉnh Chủ Tuyết Kiếm Phong',
        intimacyLevel: 90,
        status: 'Còn Sống',
        originStory:
          'Người đã thu nhận nàng khi nàng lưu lạc rời bỏ gia tộc, truyền dạy toàn bộ Tuyết Ảnh Kiếm Quyết.',
        currentDynamics:
          'Tuyết Kiếm Chân Nhân luôn ủng hộ nàng trong mọi quyết định, xem nàng như con gái ruột.',
        karmicTies: 'Ân sư tái tạo sinh mệnh tu đạo.'
      },
      {
        id: 'rel_lth_05',
        category: 'KE_THU',
        targetName: 'Vô Lượng Thánh Tử',
        targetRoleOrTitle: 'Kẻ Cầu Hôn Bị Cự Tuyệt & Ám Hại Sau Lưng',
        intimacyLevel: -85,
        status: 'Đã Tọa Hóa / Bỏ Mạng',
        originStory:
          'Kẻ thù căm ghét vì bị nàng từ hôn, nhiều lần hạ độc và thuê sát thủ ma đạo chặn đường mưu sát.',
        currentDynamics:
          'Đã bị Lạc Thanh Hàn một kiếm trảm thủ tại Bí Cảnh Thiên Phong.',
        karmicTies: 'Nợ máu trả bằng máu, kết liễu nhân quả.'
      }
    ],
    milestones: [
      {
        id: 'ms_lth_01',
        timeAnchor: 'Năm 10 tuổi',
        type: 'BUOC_NGOAT_THAY_DOI',
        title: 'Thức Tỉnh Cực Âm Băng Hoàng Thể & Băng Phong Trăm Dặm',
        location: 'Bắc Hoang Tuyết Lĩnh • Lạc Gia Cổ Trạch',
        involvedCharacters: ['Lạc Huyền Cơ', 'Mộ Dung Lan'],
        description:
          'Đột ngột thức tỉnh thể chất thần bí, biến toàn bộ hồ nước và cây cỏ trong vòng trăm dặm thành băng tuyết vĩnh cửu. Nàng chịu nỗi đau đớn xé rách kinh mạch vì hàn khí.',
        cultivationStateBeforeAndAfter: 'Phàm cốt -> Băng Hoàng Linh Thể Bẩm Sinh',
        psychologicalTransformation:
          'Bắt đầu tự cô lập bản thân vì sợ làm tổn thương người khác; tính cách trở nên thanh lãnh kiệm lời.',
        karmicEcho: 'Thể chất nghịch thiên nhưng mang theo kiếp nạn hàn độc tích tụ.',
        novelSnippetDraft:
          'Đêm rằm tháng Chạp, một tiếng phượng hót thanh thúy xé tan giá lạnh Bắc Hoang. Đứa bé gái mười tuổi ngồi co ro giữa tâm bão tuyết, thân thể bao phủ bởi tầng băng tinh trong suốt lấp lánh như ngọc...'
      },
      {
        id: 'ms_lth_02',
        timeAnchor: 'Năm 17 tuổi',
        type: 'CUOC_CHIA_LY',
        title: 'Cắt Áo Đoạn Hôn & Thoát Ly Gia Tộc Nhập Tuyết Kiếm Phong',
        location: 'Lạc Gia Nghị Sự Điện',
        involvedCharacters: ['Lạc Huyền Cơ', 'Vô Lượng Tông Sứ Giả'],
        description:
          'Trước sức ép hôn sự của phụ thân và sứ giả Vô Lượng Tông, nàng rút đoản kiếm cắt đứt vạt áo lam, thề bỏ lại tất cả của cải để tự thân tìm kiếm tiên lộ.',
        cultivationStateBeforeAndAfter: 'Luyện Khí Tầng 9 -> Trúc Cơ Độc Hành',
        psychologicalTransformation:
          'Quyết đoán kiên cường, thà chết không chịu để kẻ khác định đoạt số mệnh.',
        karmicEcho: 'Bái nhập Tuyết Kiếm Phong Thái Hư Môn, mở ra chương mới cuộc đời.',
        novelSnippetDraft:
          'Mảnh lụa lam lướt qua lưỡi kiếm sắc lẹm rơi xuống sàn ngọc. Nàng quay lưng bước đi trong gió tuyết, bóng hình đơn bạc nhưng lưng thẳng tắp như kiếm: "Lạc gia ban cho Thanh Hàn mạng sống, ta trả lại toàn bộ linh tài. Từ nay về sau, đường ai nấy đi!"'
      },
      {
        id: 'ms_lth_03',
        timeAnchor: 'Năm 20 tuổi',
        type: 'HOI_NGO_TUONG_PHUNG',
        title: 'Tương Phùng Hàn Đàm & Được Hóa Giải Tử Kiếp',
        location: 'Bắc Hoang Hàn Đàm Đáy Sâu',
        involvedCharacters: ['Lâm Tiêu'],
        description:
          'Gặp Lâm Tiêu trong lúc cùng đường bí lối trúng độc của Băng Giao. Sự chân thành và hơi ấm của chàng đã sưởi ấm tâm hồn băng giá ngàn năm của nàng.',
        cultivationStateBeforeAndAfter: 'Trúc Cơ Trung Kỳ -> Kim Đan Kỳ',
        psychologicalTransformation:
          'Tâm hồn mở cửa đón nhận tình yêu, tìm thấy tri kỷ sẵn sàng cùng chia sẻ sinh tử.',
        karmicEcho: 'Định ước duyên phận ngàn kiếp.',
        novelSnippetDraft:
          'Bàn tay ấm nóng của chàng nắm chặt lấy những ngón tay đang đông cứng thành đá của nàng. Một dòng nhiệt lưu thuần dương tràn vào kinh mạch, mang theo thanh âm trầm ấm: "Có ta ở đây, dù Diêm Vương đích thân đến cũng không cướp được nàng đi!"'
      }
    ],
    oralLoreSubplots: [
      {
        id: 'ols_lth_01',
        subplotTitle: 'Cực Âm Huyền Băng Uyên: Một Thân Đoạt Vạn Niên Băng Phách Tủy & Vết Nứt Cổ Đỉnh',
        speakerType: 'TAM_BAO_GIA_BI_CANH',
        speakerNameAndRole: 'Phong Lôi Tán Nhân (Tu sĩ tầm bảo bí cảnh Bắc Hoang, 40 năm kinh nghiệm sinh tử)',
        narrativeSetting: 'Bên đống lửa bập bùng trong một hang động tuyết lạnh giá, gió bão gầm rú ngoài vách đá',
        recountedEraOrEvent: 'Năm 21 tuổi • Đại biến cố thâm nhập Cấm Khu Huyền Băng Uyên tìm kiếm thánh dược hóa giải độc tính',
        associatedTreasureOrRealm: 'Cực Âm Huyền Băng Uyên • Vạn Niên Băng Phách Tủy (Tiên Vật Cực Âm Bậc Nhất)',
        treasureLoreCategory: 'THIEN_TAI_DIA_BAO',
        treasureTrialSecret: 'Vạn Niên Băng Phách Tủy nằm sâu trong lòng khối hàn băng vạn năm có Thái Cổ Hàn Long tàn hồn trấn thủ. Người tiếp cận sẽ bị hàn khí phong ấn lục phủ ngũ tạng; Lạc Thanh Hàn chấp nhận để hàn độc ngưng đọng dòng máu, chỉ giữ một tia linh thức duy nhất để rút thanh bảo tủy cứu người.',
        narrativePerspectiveSummary: 'Vừa kính sợ vừa rùng mình khi nhớ lại ánh mắt kiên định không hề chớp trước cái lạnh tuyệt vọng của nàng',
        historicalTruthVsRumor: 'Người đời đồn nàng vô tình lãnh khốc, cậy tài hái sạch bảo tủy rồi bỏ mặc đồng đạo chết cóng dưới vực. Sự thật là chính nàng đã dùng một chưởng đẩy bay phi chu của ba mươi tu sĩ thoát khỏi miệng rồng trước khi tự mình rơi xuống vực sâu lấy tủy.',
        characterVividImpact: 'Chiếc trâm ngọc cài tóc khắc hình băng liên bị mẻ một góc do va vào vuốt rồng; thói quen lặng lẽ đứng quay lưng về phía gió bão để cản tuyết cho người sau lưng.',
        spokenDialogueDraft: 'Các ngươi nhìn nàng thanh tao như tiên nữ giáng trần, chứ có ai thấy cảnh nàng một thân một mình đối đầu với Hàn Long vạn năm dưới đáy vực không? Cái lạnh ở đó khiến thần thức vừa phóng ra đã đông cứng thành vụn băng! Khi con rồng quét đuôi làm sập cửa động, nàng không hề nao núng, lấy thân mình chắn trước luồng hàn khí cực độ để bọn ta kịp leo lên dây thừng. Nàng giơ bàn tay đã đông cứng trắng bệch cầm lấy khối Băng Phách Tủy, nói với bọn ta một câu lạnh tanh nhưng cứu mạng tất cả: "Đi mau! Đừng để sự hy sinh của ta thành vô nghĩa!" Cả đời Phong Lôi ta ngạo mạn, nhưng trước Lạc Tiên Tử, ta chỉ có thể quỳ gối bái phục!'
      },
      {
        id: 'ols_lth_02',
        subplotTitle: 'Tiếng Khóc Trong Hầm Băng & Chiếc Áo Choàng Dệt Từ Sợi Cước Tuyết Tằm',
        speakerType: 'CO_NHAN_HAN_VI',
        speakerNameAndRole: 'Mục Ma Ma (82 tuổi, lão bộc giặt giũ tại Lạc Gia Cổ Trạch, người chứng kiến tuổi thơ nàng)',
        narrativeSetting: 'Trong một góc phòng giặt cũ kỹ bên ngoài dinh thự Bắc Hoang, tay xoa những khớp ngón tay sưng đỏ vì nước lạnh',
        recountedEraOrEvent: 'Năm 10 - 15 tuổi • Thời kỳ bị gia tộc giam lỏng tại Băng Lao vì thể chất dị thường',
        associatedTreasureOrRealm: 'Lạc Gia Băng Hầm • Tuyết Tằm Băng Ti (Dị Bảo Dệt Bào Hộ Thân)',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Lạc gia thu gom Tuyết Tằm Băng Ti để cống nạp cho thế lực lớn; tiểu thư lén giữ lại những sợi tằm vụn bị vứt bỏ, dùng ngón tay rớm máu dệt thành chiếc khăn choàng giữ ấm cho một chú chim sẻ non bị rơi vào hầm băng.',
        narrativePerspectiveSummary: 'Đầy xót xa, thương cảm đứa trẻ sinh ra trong gia tộc danh gia vọng tộc nhưng phải chịu sự ghẻ lạnh vô tình',
        historicalTruthVsRumor: 'Gia tộc rêu rao nàng từ nhỏ đã tính tình quái gở, tâm địa độc ác khắc chết linh thú trong nhà. Thực chất đám trưởng lão sợ thể chất Băng Hoàng của nàng bộc phát mất kiểm soát nên khóa chặt nàng dưới hầm tối, ép nàng ngày đêm chịu trận.',
        characterVividImpact: 'Thói quen luôn nhẹ nhàng vuốt ve những chiếc lông chim nhỏ rụng trên đường; ánh mắt dịu dàng khôn xiết khi nhìn thấy sinh linh yếu ớt được cứu sống.',
        spokenDialogueDraft: 'Tiểu thư Thanh Hàn của ta khổ tâm lắm các người ơi! Mười hai tuổi đầu, con nhà người ta được ăn ngon mặc ấm, còn tiểu thư bị nhốt dưới hầm đá lạnh thấu xương. Cứ mỗi lần hàn độc phát tác là tiểu thư cắn chặt vạt áo đến bật máu chứ không bao giờ khóc lóc van xin ai một câu. Có một lần bà già này lén đem cho tiểu thư củ khoai nóng, bước vào thì thấy tiểu thư đang ngồi co ro, trong lòng ôm một con chim sẻ ướt sũng. Tiểu thư cười với ta, giọng run bần bật: "Ma Ma đừng sợ... con chim này lạnh quá, con đang dùng Tuyết Tằm ti ủ ấm cho nó, lát nữa nó khỏe con sẽ thả nó bay về trời cao..." Một đứa trẻ nhân hậu như thế, hỏi sao trời cao không rủ lòng thương cho nàng đắc đạo thành tiên!'
      },
      {
        id: 'ols_lth_03',
        subplotTitle: 'Băng Hoàng Thần Điện Di Tích: Tiếng Phượng Hót Đánh Thức Cổ Băng Linh Châu',
        speakerType: 'KHI_LINH_THU_HO',
        speakerNameAndRole: 'Cửu Thiên Băng Phượng Khí Linh (Chân Linh thượng cổ phong ấn tại Thần Điện Tuyết Phong)',
        narrativeSetting: 'Bên trong hư không băng tinh tráng lệ, ngàn vạn cột băng lấp lánh phản chiếu tiên quang',
        recountedEraOrEvent: 'Năm 23 tuổi • Vượt qua cửu trọng thí luyện của Băng Hoàng Cổ Điện',
        associatedTreasureOrRealm: 'Băng Hoàng Thần Điện Thượng Cổ • Băng Phách Thần Châu & Băng Hoàng Đạo Điển',
        treasureLoreCategory: 'TRUYEN_THUA_CO_TIEN',
        treasureTrialSecret: 'Khảo nghiệm tối thượng "Băng Tâm Tuyệt Tình": Khí linh yêu cầu người kế thừa phải chặt đứt trần duyên, nuốt Tuyệt Tình Đan để hóa thân thành thần linh băng giá tuyệt đối. Lạc Thanh Hàn một kiếm chém vỡ viên đan, kiên quyết giữ trọn tình cảm với đạo lữ Lâm Tiêu.',
        narrativePerspectiveSummary: 'Kinh ngạc thán phục, từ chỗ xem thường phàm nhân đến kính trọng đạo tâm sắt son của nàng',
        historicalTruthVsRumor: 'Bắc Hoang đồn rằng nàng cướp được truyền thừa là nhờ huyết mạch thuần túy bẩm sinh. Kỳ thực chính việc nàng dám chống lại ý chỉ của Thần Linh, chọn con đường "Tình Đạo Hóa Băng" mới là chìa khóa mở ra đạo điển chân chính.',
        characterVividImpact: 'Ánh mắt kiên định không hề dao động khi nhìn thẳng vào Chân Linh vĩ đại; giọt nước mắt rơi xuống hóa thành viên băng tinh thuần khiết nhất ngàn năm.',
        spokenDialogueDraft: 'Ta là Băng Phượng canh giữ thần điện ba vạn năm, từng chứng kiến vô số kỳ tài Bắc Hoang dâng hiến linh hồn để đổi lấy sức mạnh vô thượng. Khi ta đưa cho nha đầu đó Băng Hoàng Thần Châu và bảo nàng phải chặt đứt sợi tơ hồng trần với tên thiếu niên kiếm tu kia, các ngươi biết nàng đã làm gì không? Nàng không ngần ngại rút kiếm chỉ thẳng vào mi tâm của ta! Nàng bảo: "Nếu sức mạnh vô thượng này bắt ta phải quên đi người đã sưởi ấm mạng sống cho ta, thì Băng Hoàng truyền thừa này chẳng khác gì rác rưởi!" Lời nói ấy làm rung chuyển cả chín tầng thần điện! Nàng đã dùng chính chân tình để chứng minh cho ta thấy: Băng tuyết không phải là sự chết chóc vô cảm, mà là sự bảo bọc kiên cường nhất thế gian!'
      },
      {
        id: 'ols_lth_04',
        subplotTitle: 'Đấu Giá Các Rung Chuyển: Trả Lại Thiên Niên Băng Diễm Tuyết Liên Cứu Đạo Lữ',
        speakerType: 'GIAM_DINH_SU_BAO_CAC',
        speakerNameAndRole: 'Trần Huyền Trọng (Đại Giám Bảo Sư • Thiên Tinh Đấu Giá Các Bắc Vực)',
        narrativeSetting: 'Phòng giám định ngọc bích sang trọng thơm ngát hương trầm, nhìn xuống hội trường đấu giá nhộn nhịp',
        recountedEraOrEvent: 'Năm 25 tuổi • Trước đại chiến Huyết Ma Giáo Càn Quét',
        associatedTreasureOrRealm: 'Cực Bắc Tuyết Sơn Cấm Khu • Thiên Niên Băng Diễm Tuyết Liên',
        treasureLoreCategory: 'BI_CANH_DONG_THIEN',
        treasureTrialSecret: 'Thiên Niên Băng Diễm Tuyết Liên nở trên đỉnh cấm khu ngập tràn gió xoáy hư không. Người muốn hái phải dung hợp hai luồng hàn - nhiệt cực đoan vào trong đan điền, nếu sơ sảy sẽ tẩu hỏa nhập ma tan biến thành tro bụi.',
        narrativePerspectiveSummary: 'Trầm trồ kinh ngạc trước khí phách của một nữ tử dám từ bỏ hàng triệu linh thạch vì người mình yêu',
        historicalTruthVsRumor: 'Thiên hạ đồn Lạc Tiên Tử mang hoa tuyết liên đến bán đấu giá để thu về linh thạch mua tiên khí hộ thân. Kỳ thực nàng đem đổi lấy ngọn Cửu Chuyển Liệt Hỏa Đan chỉ để cứu sống Lâm Tiêu đang hôn mê sâu vì trúng ma độc.',
        characterVividImpact: 'Đôi môi tái nhợt vì phong hàn nhưng nụ cười khẽ nở trên môi khi ôm chặt bình đan dược vào lòng; chiếc áo choàng màu lam bạc phất phơ trong gió như cánh phượng hoàng.',
        spokenDialogueDraft: 'Lão phu hành nghề giám bảo năm mươi năm, chưa từng thấy nữ tử nào si tình và can trường như Lạc Tiên Tử! Đêm ấy tuyết rơi ngập nóc nhà, nàng ôm theo đóa Băng Diễm Tuyết Liên còn rực lửa và băng sương xông thẳng vào sảnh giám định. Ta định giá đóa hoa đó đáng giá ba trăm vạn linh thạch cực phẩm, có thể mua được một tòa thành trì! Nhưng nàng nắm chặt tay ta gằn giọng: "Ta không cần linh thạch! Các ngươi có Cửu Chuyển Liệt Hỏa Đan không? Đổi hết cho ta!" Khi cầm được viên đan dược cứu mạng đạo lữ, nàng quay người lao vút vào trong bão tuyết mà không ngoái lại nhìn kho tàng châu báu lấy nửa lần. Khí phách ấy, nam nhi trong thiên hạ có mấy ai sánh bằng?'
      },
      {
        id: 'ols_lth_05',
        subplotTitle: 'Mảnh Vỏ Cây Trường Sinh Giữa Băng Uyên & Nước Mắt Đánh Thức Cội Rễ Viễn Cổ',
        speakerType: 'KHI_LINH_THU_HO',
        speakerNameAndRole: 'Mộc Linh Thụ Hồn (Thủ Hộ Chân Linh của nhánh rễ Cây Trường Sinh Bắc Cực)',
        narrativeSetting: 'Trong không gian u huyền sâu ba vạn trượng dưới tầng băng cổ đại Cực Bắc, những nhánh rễ khổng lồ của Cây Trường Sinh phát ra ánh sáng ngọc bích',
        recountedEraOrEvent: 'Năm 19 tuổi • Lạc bước vào Tuyệt Địa Băng Uyên trong cơn bộc phát hàn độc thập tử nhất sinh',
        associatedTreasureOrRealm: 'Bắc Cực Vạn Niên Băng Uyên • Nhánh Rễ Cây Trường Sinh & Sinh Mệnh Băng Tủy',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret: 'Nhánh rễ Cây Trường Sinh tại Bắc Cực bị cổ ma tàn hồn ăn mòn suốt vạn năm, người tiếp cận sẽ bị ma khí tước đoạt lục căn. Muốn đánh thức dòng nhựa sống trường sinh, người đó phải lấy đạo tâm thanh sạch gánh chịu ma độc thay cho cội rễ thần mộc.',
        immortalTreeConnection: 'Lạc Thanh Hàn thân thể gần như đông cứng vì Băng Hoàng hàn độc, nhưng khi nhìn thấy cội rễ Cây Trường Sinh đang khô héo rỉ máu đen, nàng đã không chút do dự dùng kiếm ý hút toàn bộ ma khí độc hại vào người mình. Nước mắt của nàng rơi trên mầm non đã làm tan chảy băng giá vạn năm, khiến Cây Trường Sinh kết duyên mệnh mạch, ban cho nàng một giọt "Bất Tử Mộc Tủy" cứu sống đan điền.',
        narrativePerspectiveSummary: 'Kính cẩn bái phục trước tâm hồn thánh thiện không màng sống chết của thiếu nữ, tôn nàng làm Thánh Nữ Thủ Hộ Cây Trường Sinh',
        historicalTruthVsRumor: 'Thế nhân thêu dệt Lạc Thanh Hàn dùng tà thuật băng phong hút cạn sinh mệnh thần thụ để kéo dài mạng sống. Kỳ thực chính nhờ máu tim và kiếm khí thanh tịnh của nàng mà cội rễ Cây Trường Sinh phương Bắc mới không bị ma hóa thành Ma Thụ diệt thế.',
        characterVividImpact: 'Chiếc vòng đeo tay tết bằng một sợi rễ non màu xanh ngọc của Cây Trường Sinh luôn tỏa ra sinh khí ấm áp; mỗi khi nàng vung kiếm, hoa tuyết rơi xuống nở bung thành những cánh hoa trường sinh trắng muốt làm dịu đi sát khí giang hồ.',
        spokenDialogueDraft: 'Vạn năm trước Thần Ma Đại Kiếp, một nhánh rễ chính của Cây Trường Sinh bị đánh gãy rơi xuống Băng Uyên này, bị hắc ám ma niệm gặm nhấm đến kiệt quệ. Lão hủ là khí linh bất lực nhìn thần mộc chết dần chết mòn... Cho đến ngày cô gái mười chín tuổi ấy rơi xuống! Toàn thân nàng lạnh ngắt như băng đá, hơi thở chỉ còn thoi thóp, vậy mà khi nhìn thấy vết thương rỉ máu của Cây Trường Sinh, nàng lại ôm lấy thân cây thì thầm: "Cây thần ơi... người cũng đau đớn như ta sao?" Rồi nàng rút Băng Hoàng Kiếm tự rạch cổ tay, dùng kiếm khí thanh tẩy độc tố cho rễ cây! Máu tươi của nàng nhỏ xuống, cành khô bỗng đâm chồi nảy lộc... Giây phút đó ta hiểu rằng, Cây Trường Sinh trường tồn không phải vì nó có phép màu bất tử, mà vì trên thế gian này luôn có những sinh mệnh sẵn sàng xả thân vì vạn vật như nàng!'
      },
      {
        id: 'ols_lth_06',
        subplotTitle: 'Nhiệm Vụ Cực Băng Uyên: Áo Choàng Băng Tằm Trao Lại Cho Sư Muội & Nhát Kiếm Đóng Băng Miệng Vực Cứu Đội',
        speakerType: 'DONG_DOI_NHIEM_VU',
        speakerNameAndRole: 'Diệp Thính Vũ (Sư muội đồng môn đi cùng tổ đội nhiệm vụ • Băng Phách Tiên Cung)',
        narrativeSetting: 'Bên khung cửi dệt lụa ngọc băng tuyết của Băng Dược Phong, những giọt lệ khẽ rơi xuống mặt vải trắng muốt',
        recountedEraOrEvent: 'Năm 21 tuổi (Kết Đan Kỳ) • Nhiệm Vụ Tông Môn Cấp Địa: Thu Thập Tuyết Hồn Huyền Tinh & Trấn Áp Băng Quỷ Vương',
        associatedMissionOrQuest: 'Nhiệm Vụ Tông Môn Cấp Địa: Thám Hiểm Cực Âm Băng Uyên & Trấn Áp Băng Quỷ Vương',
        missionExecutionTruth:
          'Hồ sơ tông môn khen thưởng lưu tại Chấp Pháp Điện: "Tổ đội hoàn thành xuất sắc nhiệm vụ cấp Địa, Lạc Thanh Hàn công tích trác tuyệt mang về ba khối Tuyết Hồn Huyền Tinh". Nhưng Diệp Thính Vũ cả đời không quên được sự thật đêm hôm ấy: Lúc bão tuyết lở chôn vùi lối thoát hiểm, Băng Quỷ Vương gào thét phun hàn độc đóng băng đan điền của năm đệ tử, chính Lạc sư tỷ - người bình thường không bao giờ nói quá ba câu - đã cởi chiếc Tuyết Tằm Băng Bào độc nhất vô nhị khoác lên người Thính Vũ. Nàng một thân áo mỏng đứng chắn trước luồng hàn độc của quỷ vương suốt ba ngày ba đêm, mũi kiếm run lên vì buốt giá nhưng không lùi nửa bước, dùng Băng Hoàng Kiếm Khí chém đứt hang đá để đồng môn rút lui an toàn.',
        associatedTreasureOrRealm: 'Cực Âm Băng Uyên • Tuyết Hồn Huyền Tinh & Hàn Tủy Thạch',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret:
          'Băng Quỷ Vương nắm giữ hạch tâm hàn mạch; muốn lấy Tuyết Hồn Huyền Tinh mà không làm nứt vỡ thì phải dùng hàn khí bản mệnh ngưng tụ chậm rãi suốt ba mươi sáu canh giờ, nếu tâm trí có một tia tư lợi thì hàn độc sẽ lập tức nổ tung thiêu hủy nguyên thần.',
        immortalTreeConnection:
          'Trong lúc đối đầu quỷ vương dưới đáy vực, nhánh rễ Cây Trường Sinh trong tiềm thức đã cộng hưởng với Băng Hoàng Kiếm Ý của Lạc Thanh Hàn, giải phóng một luồng sinh khí thanh khiết xua tan tử khí u ám, bảo vệ nguyên thần cho toàn đội.',
        narrativePerspectiveSummary:
          'Sùng kính và yêu thương trọn đời, xem Lạc sư tỷ như người chị ruột thịt bảo bọc, căm phẫn trước những lời thêu dệt ác ý của thế gia Bắc Hoang',
        historicalTruthVsRumor:
          'Bắc Hoang đồn nàng kiêu kỳ xa cách, coi mạng đệ tử đồng môn như cỏ rác để đạt được chiến tích. Thực tế là sau nhiệm vụ, nàng đã thức trắng năm đêm bên giường bệnh dùng linh lực Băng Hoàng sưởi ấm kinh mạch cứu sống từng đệ tử bị thương tật.',
        characterVividImpact:
          'Dáng vẻ khẽ cau mày rồi dịu dàng lấy tay vuốt lại lọn tóc rối cho sư muội; thói quen mỗi khi tuyết rơi đầu mùa đều đứng một mình nơi mỏm đá ngắm về phương Nam với ánh mắt mong ngóng.',
        spokenDialogueDraft:
          'Ai bảo sư tỷ ta lạnh lùng vô cảm? Các ngươi có ở dưới đáy Băng Uyên năm ấy đâu mà biết! Bão tuyết xé rách linh quang phòng ngự, ta sợ hãi khóc nấc lên tưởng chết chắc rồi. Chính sư tỷ đã cởi chiếc áo choàng duy nhất che ấm cho ta, rồi một mình cầm kiếm lao vào bão tuyết đối đầu với con Quỷ Vương khổng lồ! Suốt ba ngày ba đêm, tiếng kiếm ngân vang rền rĩ giữa hang tối... Khi cửa hang mở ra, sư tỷ bước ra, toàn thân nhuộm đỏ máu của hung thú và máu của chính mình, môi tái nhợt vì lạnh. Sư tỷ đưa ba khối Huyền Tinh vào tay ta rồi ngã vào lòng ta thốt lên: "Muội không sao chứ? Mau về thôi, nơi này lạnh lắm..." Một người tỷ tỷ như thế, ta nguyện cả đời này lấy mạng bảo vệ danh dự của người!'
      },
      {
        id: 'ols_lth_07',
        subplotTitle: 'Nhiệm Vụ Thảo Phạt Huyết Ma Cốc: Giữ Lại Một Cánh Băng Diễm Liên Gửi Vào Phong Thư Phương Nam',
        speakerType: 'GIAM_DINH_SU_BAO_CAC',
        speakerNameAndRole: 'Cố Thiên Hà (Trưởng Lão Chấp Pháp & Giám Bảo Hội • Liên Minh Cửu Đại Tông Môn)',
        narrativeSetting: 'Đại điện nghị sự nguy nga tráng lệ của Minh Chủ Các, ánh nến lung linh phản chiếu cuốn sổ ghi chép công tích liên minh',
        recountedEraOrEvent: 'Năm 24 tuổi (Kim Đan Đỉnh Phong) • Nhiệm Vụ Liên Quân Chính Đạo: Thảo Phạt Huyết Ma Cốc & Thu Hồi Thánh Dược',
        associatedMissionOrQuest: 'Nhiệm Vụ Liên Quân Chính Đạo Cấp S: Tiêu Diệt Huyết Ma Cốc & Thu Hồi Cửu Trọng Băng Diễm Tuyết Liên',
        missionExecutionTruth:
          'Hội đồng Minh Chủ tuyên dương nàng là Nữ Kiêu Hùng số một của Bắc Hoang, thu hồi trọn vẹn chín đóa Băng Diễm Tuyết Liên quý giá nghìn năm. Nhưng Cố Thiên Hà là người tiếp nhận bàn giao: Nàng nộp đủ chín đóa liên hoa không thiếu một cánh, từ chối nhận trăm vạn linh thạch thù lao và danh hiệu Minh Chủ Hậu Bồi. Nàng chỉ khẽ thưa: "Thanh Hàn chỉ xin các vị trưởng lão cho phép ta giữ lại một mảnh cánh hoa nhỏ xíu đã rụng trong lúc trảm ma." Rồi trước ánh mắt ngỡ ngàng của các đại năng cửu phái, nàng cẩn thận ép cánh hoa vào giữa phong thư gửi về Vô Cực Kiếm Các phương Nam.',
        associatedTreasureOrRealm: 'Huyết Ma Cốc Trận Địa • Cửu Trọng Băng Diễm Tuyết Liên & Cổ Tiên Phù Điêu',
        treasureLoreCategory: 'THIEN_TAI_DIA_BAO',
        treasureTrialSecret:
          'Băng Diễm Tuyết Liên hấp thụ cả thiên địa dị hỏa và huyền băng vạn cổ, chỉ có người sở hữu Băng Hoàng Thể kết hợp với đạo tâm chí tình mới hái được mà không bị hỏa độc thiêu cháy tim gan.',
        immortalTreeConnection:
          'Cánh hoa Băng Diễm Tuyết Liên mang theo một giọt sương sinh mệnh tinh khiết từ thuở Khai Thiên, tượng trưng cho lời thề sinh tử tương phùng giữa hai tâm hồn cô độc giữa dòng đời tu tiên trắc trở.',
        narrativePerspectiveSummary:
          'Xúc động bùi ngùi trước vẻ đẹp cao khiết và tình cảm trong sáng như pha lê của nàng giữa chốn giang hồ đầy toan tính vụ lợi',
        historicalTruthVsRumor:
          'Người ta đồn nàng lập công lớn để tranh giành chức vị Minh Chủ Tông Môn. Kỳ thực nàng chỉ muốn chuyến đi thực hiện nhiệm vụ này sớm kết thúc để có thể trở về bên cạnh người tri kỷ.',
        characterVividImpact:
          'Nụ cười e ấp hiếm hoi hé nở trên môi khi cẩn thận dán kín phong thư; chiếc ngọc bội hình thanh kiếm nhỏ luôn được nàng nâng niu trước ngực áo.',
        spokenDialogueDraft:
          'Lão phu ngồi ở vị trí Chấp Pháp Trưởng Lão bốn mươi năm, gặp qua hàng ngàn thiên tài nhận thưởng nhiệm vụ, kẻ thì đòi thêm linh thạch cực phẩm, kẻ thì xin ban tặng tiên giai công pháp hay tước vị cao quý. Duy chỉ có Lạc nha đầu này khiến cả hội đồng lão quái chúng ta phải lặng người! Nàng chém chết Ma Tướng, dâng lên chín đóa Tuyết Liên vô giá, rồi lắc đầu từ chối hết mọi ban thưởng. Nàng chỉ ngước đôi mắt sáng trong xin đúng một cánh hoa rơi vãi để ép vào thư. Ta hỏi nàng gửi cho ai, má nàng hơi ửng hồng, khẽ đáp: "Gửi cho một người ở Vô Cực Phong... chàng thích ngửi hương tuyết liên lúc luyện kiếm." Nhìn bóng nàng bay vút đi trong gió tuyết, ta mới hiểu: Đạo tâm vô địch không phải là lãnh khốc vô tình, mà là một tấm chân tình son sắt không gì lay chuyển nổi!'
      },
      {
        id: 'ols_lth_08',
        subplotTitle: 'Đột Phá Hóa Thần Băng Hoàng Niết Bàn: Dị Tượng Tuyết Vũ Cửu Thiên & Lời Thề Bất Diệt',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Băng Hư Cung Chủ (Thái Thượng Sư Tôn Hộ Kiếp • Băng Phách Tiên Các)',
        narrativeSetting: 'Bên đài tuyết ngọc cửu trọng phong tỏa nghìn dặm Bắc Cực, gió tuyết đã ngừng thổi để lộ vòm trời thanh tịnh',
        recountedEraOrEvent: 'Năm 180 tuổi • Biến cố độ kiếp phá quan Hóa Thần Kỳ & Thức Tỉnh Chân Thể Băng Hoàng',
        breakthroughCultivationStage: 'Nguyên Anh Viên Mãn -> Hóa Thần Kỳ (Băng Hoàng Cửu Biến Thần Đạo)',
        tribulationOrPhenomenon: 'Thái Cổ Băng Phượng Hư Ảnh Vạn Trượng & Tuyết Vũ Chín Tầng Trời Đóng Băng Thiên Lôi',
        breakthroughRealTruth:
          'Bắc Hoang đồn rằng Lạc Thanh Hàn uống Băng Hoàng Thần Đan do thượng giới ban cho nên mới nhẹ nhàng bước vào Hóa Thần. Nhưng Sư Tôn của nàng nhớ lại đêm kinh hoàng đó: Khi đạo Băng Hàn Lôi Kiếp thứ bảy giáng xuống, hàn độc thể chất và lôi hỏa tương khắc bộc phát làm vỡ nát chín đại linh mạch chính. Cơ thể nàng đứng trước bờ vực nổ tung tan biến. Sư tôn toan ra tay cưỡng chế giải cứu dù biết nàng sẽ thành phế nhân. Nhưng chính lúc đó, nàng đã dùng một giọt Bất Tử Mộc Tủy của Cây Trường Sinh ngậm dưới lưỡi dẫn đường, kiên cường lấy kiếm ý Băng Hoàng tự tay khâu nối lại từng tấc kinh mạch đứt đoạn. Nàng không chặt đứt hồng trần tình ái như các tiền bối ép buộc, mà dùng chính hơi ấm tình yêu làm ngọn lửa sưởi ấm Băng Hoàng Thể, tạo nên dị tượng tuyết rơi hóa hoa sen chấn động chín cõi.',
        associatedTreasureOrRealm: 'Bắc Cực Vạn Niên Băng Uyên • Bất Tử Mộc Tủy Của Cây Trường Sinh & Băng Hoàng Thần Châu',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Cửa ải Hóa Thần yêu cầu người tu phải chặt đứt trần duyên phàm tình để đạt tới Tuyệt Tình Băng Tâm. Nàng thà chịu lôi kiếp xé rách kinh mạch gấp mười lần cũng quyết không từ bỏ lời thề với đạo lữ, dùng chân tình thuần khiết nghịch chuyển tâm ma.',
        immortalTreeConnection:
          'Giọt Mộc Tủy Cây Trường Sinh tích tụ trong đan điền đã hòa cùng dòng máu Băng Hoàng, biến thể chất của nàng thành "Trường Sinh Băng Hoàng Thể" có khả năng tự phục hồi thương tổn linh hồn vĩnh cửu.',
        narrativePerspectiveSummary:
          'Bàng hoàng kính nể, thấu hiểu rằng tình cảm chân chính không phải là gánh nặng của tu đạo mà là nguồn sức mạnh tối thượng',
        historicalTruthVsRumor:
          'Thế gia rêu rao nàng phản nghịch sư môn, làm loạn lôi đài. Thực tế nàng đã chứng minh cho cả Tiên Các thấy: Con đường tình đạo của nàng mạnh mẽ hơn bất kỳ công pháp tuyệt tình nào.',
        characterVividImpact:
          'Chiếc vòng ngọc Cây Trường Sinh trên cổ tay lóe sáng màu ngọc bích; nụ cười rạng rỡ như ánh bình minh sau khi bước ra khỏi vùng lôi kiếp đổ nát.',
        spokenDialogueDraft:
          'Năm đó ta là người lập trận hộ kiếp cho Thanh Hàn, chính tay ta đã đặt trước mặt nó viên Tuyệt Tình Đan và bảo nó: "Nuốt vào đi con, chặt đứt tình duyên với tiểu tử kiếm tu kia thì mới mong sống sót qua lôi kiếp Hóa Thần!" Vậy mà các ngươi biết con bé đó làm gì không? Nó lấy mũi kiếm hất viên đan rơi xuống vực tuyết! Khi sét đánh gãy sáu khúc xương sườn, toàn thân đẫm máu, nó vẫn đứng thẳng lưng cười bảo ta: "Sư tôn, nếu con đường thành tiên bắt con phải trở thành một tảng băng không biết yêu thương, thì tiên đạo này con không cần!" Rồi nó nuốt giọt Mộc Tủy Cây Trường Sinh, một kiếm chém tan mây đen lôi kiếp... Ta sống bốn ngàn năm, lúc đó mới hiểu ra ta đã sai lầm cả đời!'
      },
      {
        id: 'ols_lth_09',
        subplotTitle: 'Đột Phá Cực Cảnh Cửu U Kim Đan: Hàn Đàm Niết Bàn & Dị Tượng Băng Hoàng Thần Dực Đóng Băng Thiên Lôi',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Huyền Nguyệt Thái Thượng Trưởng Lão (Trưởng Lão Hộ Mạch • Băng Phách Tiên Các)',
        narrativeSetting: 'Bên bờ Tuyệt Nhai Cực Bắc nơi từng diễn ra trận độ kiếp rung chuyển địa mạch Bắc Hoang, sương giá còn vương trên tà áo lam',
        recountedEraOrEvent: 'Năm 18 tuổi (Trúc Cơ Viên Mãn -> Cửu Chuyển Cực Âm Kim Đan) • Giai đoạn bị giam cầm tại Cực Âm Hàn Đàm & Niết Bàn Kết Đan',
        breakthroughCultivationStage: 'Trúc Cơ Viên Mãn -> Cực Cảnh Cửu U Băng Hoàng Kim Đan (Thái Âm Thần Thể Khởi Phát)',
        tribulationOrPhenomenon: 'Cửu Trọng Huyền Âm Thần Lôi & Dị Tượng Băng Hoàng Vỗ Cánh Phủ Tuyết Ngàn Dặm Đóng Băng Cả Tia Sét',
        breakthroughRealTruth:
          'Gia tộc Bắc Hoang rêu rao rằng nàng dùng đan dược cấm kỵ của tổ tông để cưỡng ép kết đan. Huyền Nguyệt Trưởng Lão là người âm thầm theo dõi toàn bộ sự việc: Nàng bị các trưởng lão ích kỷ giam dưới đáy hàn đàm nghìn trượng để làm vật tế kích hoạt trận pháp. Trong đêm trăng tròn cực âm, hàn độc bộc phát xé nát kinh mạch, lôi kiếp trên trời đồng thời giáng xuống muốn tiêu diệt thể chất dị số. Nàng không cầu xin gia tộc cứu giúp, mà cởi bỏ trâm cài, đứng giữa dòng hàn tuyền buốt thấu xương tủy, tự dùng băng kiếm rạch nát lòng bàn tay, lấy nhiệt huyết làm môi giới dẫn dắt giọt sương sinh mệnh từ sợi rễ Cây Trường Sinh do Lâm Tiêu tặng hòa vào đan điền. Dòng sinh khí ấm áp của cây thần đã dung hợp cùng cực âm hàn khí, ngưng kết thành viên Cửu U Kim Đan trong suốt như pha lê với chín đạo phượng văn lấp lánh.',
        associatedTreasureOrRealm: 'Cực Bắc Tuyệt Địa Băng Đàm • Cửu U Băng Phách Tủy & Rễ Non Cây Trường Sinh Viễn Cổ',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm Tuyệt Mạch Vấn Tình: Khi Băng Hoàng Kim Đan thành hình, hàn khí cực hạn sẽ thử thách tâm hồn; nếu để nỗi hận thù gia tộc nuốt chửng thì sẽ hóa thành Ma Hoàng khát máu. Nàng đã lấy tình yêu thương và lời hứa với người thương để sưởi ấm tâm hồn, giữ trọn sự thanh sạch của đạo tâm.',
        immortalTreeConnection:
          'Sợi rễ Cây Trường Sinh nàng đeo nơi cổ tay đã hấp thụ một nửa hàn lôi hủy diệt, đồng thời truyền dẫn sinh mệnh lực bất tận của thần mộc vào đan điền, biến Băng Hoàng Thể của nàng thành thể chất "Băng Sinh Mộc Trưởng", băng giá mà tràn đầy sinh cơ bảo bọc muôn loài.',
        narrativePerspectiveSummary:
          'Xót xa trước sự tàn nhẫn của gia tộc đối với nàng, đồng thời kinh ngạc trước ý chí kiên trinh và đạo tâm vô cấu của Băng Hoàng Thánh Nữ',
        historicalTruthVsRumor:
          'Kẻ thù đồn nàng là ma nữ lãnh khốc bị trời phạt lôi kiếp. Thực tế dị tượng Băng Hoàng giương cánh đóng băng tia sét là minh chứng cho việc nàng đã dùng chính sự thuần khiết của bản thân để thuần hóa thiên đạo hung bạo.',
        characterVividImpact:
          'Một lọn tóc mai chuyển sang màu ánh bạc lấp lánh như sương mai; thói quen dùng mu bàn tay chạm nhẹ vào cổ tay nơi sợi rễ Cây Trường Sinh quấn quanh mỗi khi trời trở lạnh.',
        spokenDialogueDraft:
          'Lão thân tu luyện bảy trăm năm tại Bắc Hoang, chưa từng thấy đứa trẻ nào phải chịu đau đớn cùng cực như con bé Thanh Hàn đêm hôm đó! Các trưởng lão Lạc gia vì tư lợi đã nhốt con bé dưới đáy hàn đàm sâu ngàn trượng, khóa chặt ba mươi sáu đại huyệt đạo! Sét đánh xuống ầm ầm xé toạc màn đêm tuyết phủ, nước trong đàm bắn tung tóe đóng băng thành ngàn mũi giáo nhọn đâm xuyên qua da thịt con bé... Vậy mà nó không rên lấy nửa lời! Con bé nâng bàn tay rớm máu đang siết chặt chiếc vòng rễ Cây Trường Sinh nhỏ bé do tiểu tử Lâm Tiêu tặng, nước mắt rơi xuống hóa thành ngọc băng. Con bé thì thào giữa bão lôi: "Ta không thể chết... chàng còn đang đợi ta ở phương Nam..." Khoảnh khắc nó kết thành Cửu U Kim Đan, hư ảnh Băng Hoàng vạn trượng từ sau lưng nó bay vút lên trời, một tiếng phượng hót thanh tao đóng băng toàn bộ chín đạo sét khổng lồ giữa không trung! Ta đứng trên bờ vực chết lặng vì kinh ngạc... Lạc gia bọn họ mù mắt rồi, bọn họ đã vứt bỏ báu vật vĩ đại nhất của đất trời!'
      },
      {
        id: 'ols_lth_10',
        subplotTitle: 'Đột Phá Độ Kiếp Chuẩn Đế: Băng Hoàng Niết Bàn Cửu Biến & Dung Hợp Trái Tim Cây Trường Sinh Giữa Bão Tuyết Đại Kiếp',
        speakerType: 'PHUC_DU_THUONG_DAN',
        speakerNameAndRole: 'Mộc Linh Vân (Nữ Tu Luyện Đan Từng Được Lạc Tiên Tử Cứu Sống Khỏi Thảm Họa Diệt Tông)',
        narrativeSetting: 'Bên chiếc lò đan nhỏ thơm ngát hương tuyết liên thảo mộc, tay vuốt ve nhánh hoa băng tinh không bao giờ tàn trên bàn đá',
        recountedEraOrEvent: 'Năm 280 tuổi (Hợp Thể Đỉnh Phong -> Độ Kiếp Chuẩn Đế) • Đại Lôi Kiếp Cửu U Băng Hoàng Niết Bàn',
        breakthroughCultivationStage: 'Hợp Thể Đỉnh Phong -> Độ Kiếp Chuẩn Đế (Cửu Thiên Băng Hoàng Chí Tôn Thể)',
        tribulationOrPhenomenon: 'Thái Cổ Cửu U Hàn Lôi Kiếp & Dị Tượng Hoa Tuyết Nở Rộ Khắp Chín Tầng Mây Cùng Tiếng Phượng Hót Đại Thiên',
        breakthroughRealTruth:
          'Giang hồ đồn Lạc Tiên Tử vì muốn trường sinh bất tử nên đã nuốt chửng linh phách của hàn thú viễn cổ khiến vạn sinh linh chết cóng. Mộc Linh Vân - người được nàng cứu sống năm xưa - nghẹn ngào thuật lại sự thật: Khi chín tầng hàn lôi mang theo quy tắc hủy diệt giáng xuống đóng băng toàn bộ vùng trời Bắc Cực, kinh mạch nàng rạn nứt đứng trước bờ vực tan biến. Giữa ranh giới sinh tử, đóa hoa tuyết ngậm sương từ nhánh non Cây Trường Sinh do Lâm Tiêu gửi đến từ phương xa đã hòa quyện vào tâm mạch nàng. Nàng không dùng hàn khí tiêu diệt sinh mệnh, mà chuyển hóa băng tuyết thành "Băng Phách Dưỡng Mộc", dùng một thân máu phượng cứu sống ngàn dặm cỏ cây Bắc Cực bị đóng băng vạn năm, đốn ngộ Niết Bàn Đạo Quả vô thượng.',
        associatedTreasureOrRealm: 'Cực Bắc Huyền Băng Thần Điện • Trái Tim Cây Trường Sinh & Băng Hoàng Tiên Cốt',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Băng Hồn Tuyệt Tức": Nhục thân phải trải qua chín lần đông cứng rồi tan chảy trong lôi kiếp; nếu tâm có một tia sợ hãi cái chết sẽ vỡ vụn thành bột tuyết. Nàng nghĩ đến nụ cười của đạo lữ và lời hứa hẹn ngày tương phùng nơi đỉnh Tiên Giới, mỉm cười vượt qua lôi kiếp.',
        immortalTreeConnection:
          'Dòng mộc tủy Cây Trường Sinh kết hợp cùng huyết mạch Băng Hoàng tạo nên "Trường Sinh Băng Phách Chi Tâm", khiến nàng trở thành nữ tôn duy nhất của Bắc Hoang có khả năng dùng băng tuyết để hồi sinh sinh linh thay vì sát phạt tuyệt diệt.',
        narrativePerspectiveSummary:
          'Trào dâng lòng biết ơn vô hạn, tôn kính Lạc Thanh Hàn như vị Bồ Tát tuyết trắng che chở cho những phận người nhỏ bé',
        historicalTruthVsRumor:
          'Thế gian sợ hãi vẻ đẹp băng giá xa cách của nàng. Thực chất đằng sau lớp băng ấy là một trái tim tràn ngập tình yêu thương và sự hy sinh cao cả nhất trần gian.',
        characterVividImpact:
          'Vạt áo lụa xanh biếc viền bạc thêu hình cành lá trường sinh; nụ cười dịu dàng như hoa nở mùa xuân khi đưa tay đón lấy bông tuyết đầu mùa.',
        spokenDialogueDraft:
          'Cả thiên hạ này đồn đại nàng lạnh lùng tàn nhẫn, nhưng đối với đám tu sĩ yếu thế chúng ta, nàng là vị cứu tinh tái sinh! Năm ấy tại Băng Điện, lôi kiếp đánh sập cả ngọn núi, đất đá vụn nát như mưa tuyết. Đệ tử tông môn bỏ chạy tán loạn, chỉ có ta bị kẹt dưới chân lò đan sắp nổ. Giữa biển sấm sét xé toạc trời đất, nàng từ trên trời hạ xuống, thân thể đầy máu vì đang độ kiếp Hóa Thần Chuẩn Đế, nhưng nàng lấy thân mình che chắn cho chiếc lò đan của ta! Nàng quay lại nhìn ta, nở nụ cười hiền hậu: "Đừng sợ, có ta ở đây rồi." Rồi nàng dung hợp đóa hoa Cây Trường Sinh, một chưởng đẩy lùi cả tầng lôi vân! Sau ngày hôm đó, khắp vùng đất tuyết chết chóc bỗng mọc lên hàng ngàn thảm cỏ xanh biếc... Các ngươi nói xem, một người như thế mà bảo là ma nữ vô tình sao?'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 3. THẠCH PHÁ THIÊN - CUỒNG THỂ MAN TÔN / HOANG CỔ CHIẾN THẦN
  // -----------------------------------------------------------------------
  {
    characterId: 'char_thach_pha_thien',
    characterName: 'Thạch Phá Thiên',
    characterAlias: 'Cuồng Thể Man Tôn / Hoang Cổ Chiến Thần',
    overviewPhilosophy:
      'Lấy quyền phá đạo, hào sảng trượng nghĩa. Một lời đã hứa nặng tựa vạn cân, vì bằng hữu có thể đấm nát hư không.',
    lifeDestinyVow:
      'Bảo vệ bộ tộc Man Hoang, rèn đúc Thần Ma Bá Thể, cùng huynh đệ Lâm Tiêu đạp bằng Ma Giới.',
    relations: [
      {
        id: 'rel_tpt_01',
        category: 'CHA_ME',
        targetName: 'Thạch Thiết Sơn & A Mẫu Thảo',
        targetRoleOrTitle: 'Phụ Thân Thợ Săn & Người Mẹ Hiền Bộ Lạc Hoang Dã',
        intimacyLevel: 96,
        status: 'Đã Tọa Hóa / Bỏ Mạng',
        originStory:
          'Cha mẹ là những thợ săn chân chất của bộ lạc Thạch Sơn, từng chống chọi bầy thú dữ để bảo vệ chàng lúc nhỏ.',
        currentDynamics:
          'Mất trong đợt Thú Triều năm chàng 18 tuổi; chàng luôn mang theo chiếc nanh sói của cha bên ngực.',
        karmicTies: 'Khao khát trở nên mạnh mẽ vô địch để không bao giờ bất lực nhìn người thân mất đi.'
      },
      {
        id: 'rel_tpt_02',
        category: 'BAN_BE',
        targetName: 'Lâm Tiêu',
        targetRoleOrTitle: 'Huynh Đệ Sinh Tử Kết Nghĩa - Kiếm Tôn',
        intimacyLevel: 98,
        status: 'Còn Sống',
        originStory:
          'Gặp nhau trên lôi đài; đánh nhau một trận tơi bời rồi cùng uống rượu kết nghĩa huynh đệ dưới trăng rằm.',
        currentDynamics:
          'Luôn sát cánh bên nhau, Lâm Tiêu dùng kiếm công phá, Thạch Phá Thiên dùng quyền trấn thủ.',
        karmicTies: 'Lời thề kết nghĩa sinh tử không rời.'
      },
      {
        id: 'rel_tpt_03',
        category: 'KE_THU',
        targetName: 'Xích Viêm Ma Tướng',
        targetRoleOrTitle: 'Kẻ Dẫn Thú Triều Tàn Phá Quê Hương',
        intimacyLevel: -95,
        status: 'Đã Tọa Hóa / Bỏ Mạng',
        originStory:
          'Thống lĩnh ma đạo xua đuổi bầy thú phá nát buôn làng Thạch Sơn năm xưa.',
        currentDynamics:
          'Đã bị Thạch Phá Thiên tự tay đấm vỡ nát ma khu trong trận chiến Hắc Phong Cốc.',
        karmicTies: 'Đã rửa sạch huyết thù cho bộ tộc.'
      }
    ],
    milestones: [
      {
        id: 'ms_tpt_01',
        timeAnchor: 'Năm 12 tuổi',
        type: 'CO_DUYEN_KY_NGO',
        title: 'Ăn Nhầm Thái Cổ Huyết Quả & Thức Tỉnh Hoang Cổ Bá Thể',
        location: 'Thập Vạn Đại Sơn • Cổ Huyệt Động',
        involvedCharacters: ['Thạch Thiết Sơn'],
        description:
          'Lạc vào hang động cổ khi đi săn, vô tình nuốt phải một quả chu quả máu chín mọng, chịu nỗi đau rạn nứt da thịt nhưng kích hoạt Hoang Cổ Bá Thể ngàn năm hiếm gặp.',
        cultivationStateBeforeAndAfter: 'Phàm nhân lực điền -> Luyện Thể Tầng 5 Bẩm Sinh',
        psychologicalTransformation:
          'Khám phá ra sức mạnh thể xác phi thường, say mê rèn luyện quyền pháp.',
        karmicEcho: 'Bắt đầu con đường thể tu bách chiến bất bại.',
        novelSnippetDraft:
          'Cả cơ thể thiếu niên đỏ rực như than hồng. Mỗi tấc cơ bắp cuồn cuộn như sắt nguội vừa tôi, một quyền vung ra khiến tảng đá ngàn cân vỡ vụn làm đôi!'
      },
      {
        id: 'ms_tpt_02',
        timeAnchor: 'Năm 18 tuổi',
        type: 'CUOC_CHIA_LY',
        title: 'Thú Triều Huyết Tẩy Bộ Lạc & Cơn Thịnh Nộ Của Thần Ma',
        location: 'Thạch Sơn Bộ Lạc',
        involvedCharacters: ['Thạch Thiết Sơn', 'Xích Viêm Ma Tướng'],
        description:
          'Thú triều ma đạo ập đến tàn sát bộ lạc. Nhìn thấy cha mẹ ngã xuống, Thạch Phá Thiên cuồng nộ bạo phát bá thể, một thân một mình tay không đấm chết ba trăm con ma thú.',
        cultivationStateBeforeAndAfter: 'Luyện Thể Viên Mãn -> Đột Phá Thông Huyền Bá Thể',
        psychologicalTransformation:
          'Khắc sâu nỗi đau mất mát, quyết tâm gia nhập tiên môn tìm kiếm sức mạnh đỉnh cao.',
        karmicEcho: 'Dấn thân rời khỏi đại sơn, gặp gỡ Lâm Tiêu tại Thái Hư Môn.',
        novelSnippetDraft:
          'Tiếng gầm thét bi thương chấn động rừng già. Toàn thân nhuộm đỏ máu thú và máu người thân, chàng thanh niên bẻ gãy sừng con cự thú, thề với trời cao sẽ khiến ma tộc đền mạng!'
      }
    ],
    oralLoreSubplots: [
      {
        id: 'ols_tpt_01',
        subplotTitle: 'Thái Cổ Huyết Trì: Nuốt Quả Thần Cây & Nắm Đấm Đập Nát Cấm Giới Thạch Môn',
        speakerType: 'TAM_BAO_GIA_BI_CANH',
        speakerNameAndRole: 'Bắc Đao Lục Quái (Tán tu thám hiểm chuyên săn lùng cổ mộ Thập Vạn Đại Sơn)',
        narrativeSetting: 'Trong quán rượu ven rừng già Ma Thú, cạn bát rượu mạnh rồi đập bàn bồi hồi kể lại',
        recountedEraOrEvent: 'Năm 12 tuổi • Lạc vào Cổ Huyệt Động Thập Vạn Đại Sơn lúc hái thuốc cho mẹ',
        associatedTreasureOrRealm: 'Thập Vạn Đại Sơn Cổ Huyệt • Thái Cổ Huyết Quả (Thánh Dược Luyện Thể Viễn Cổ)',
        treasureLoreCategory: 'THIEN_TAI_DIA_BAO',
        treasureTrialSecret: 'Thái Cổ Huyết Quả chứa cuồng bạo khí tức của Thần Ma cổ xưa, tu sĩ bình thường nuốt vào sẽ bạo thể mà chết trong tích tắc; Thạch Phá Thiên chịu đựng 81 đợt lôi hỏa rạn nứt gân cốt, dùng ý chí cứu mẹ kiên cường dung hợp trọn vẹn dược lực.',
        narrativePerspectiveSummary: 'Kinh hãi trước sức chịu đựng phi nhân loại và ý chí như đá tảng của một đứa trẻ mười hai tuổi',
        historicalTruthVsRumor: 'Người ngoài đồn Thạch Phá Thiên ăn nhầm yêu đan ma thú nên hóa thành quái vật khát máu. Sự thật là đứa trẻ đó nuốt huyết quả chỉ vì quá đói và muốn có sức lực đào sâm núi chữa bệnh cho mẹ, dù toàn thân nứt toác chảy máu vẫn không buông giỏ thuốc.',
        characterVividImpact: 'Thói quen dùng nắm đấm to bè gãi đầu cười hề hề ngượng nghịu; mỗi khi đói bụng là có thể ăn liền một lúc mười bát cơm đầy với thịt nướng.',
        spokenDialogueDraft: 'Bọn ta tìm kiếm Thái Cổ Cổ Động suốt ba mươi năm, vừa mở được phong ấn thạch môn thì thấy một thằng bé con toàn thân đỏ rực như cục than hồng! Toàn thân nó nứt toác như đồ gốm vỡ, máu tươi rỉ ra từng giọt bốc khói nghi ngút. Bọn ta tưởng nó sắp nổ tung chết chắc, nào ngờ nó gầm lên một tiếng như rồng gầm cọp rống, một đấm giáng thẳng xuống đất làm nứt toác cả đáy động mười trượng! Nó bò dậy, hai mắt đỏ rực nhìn giỏ thuốc bên cạnh, lẩm bẩm: "A Mẫu... con tìm được thuốc cho mẹ rồi..." Lúc đó ta mới hiểu, trên đời này có những kẻ sinh ra để làm Thần Ma, không phải vì họ tàn nhẫn, mà vì trái tim họ chứa đựng tình thương quá lớn lao!'
      },
      {
        id: 'ols_tpt_02',
        subplotTitle: 'Bá Vương Lăng Mộ Thượng Cổ: Khảo Nghiệm Quyền Ý Không Tranh & Cánh Bướm Trên Bia Đá',
        speakerType: 'KHI_LINH_THU_HO',
        speakerNameAndRole: 'Hoang Cổ Chiến Hồn (Thủ hộ tàn linh của Bá Vương Thần Điện)',
        narrativeSetting: 'Bên trong võ đài đá cổ xưa ngập tràn vết tích rìu chém kiếm đâm từ vạn năm trước',
        recountedEraOrEvent: 'Năm 22 tuổi • Tiến vào Thượng Cổ Man Hoang Thần Điện cầu đạo',
        associatedTreasureOrRealm: 'Bá Vương Cổ Điện Bí Cảnh • Hoang Cổ Bá Vương Quyền Điển & Cửu Chuyển Man Thần Cốt',
        treasureLoreCategory: 'TRUYEN_THUA_CO_TIEN',
        treasureTrialSecret: 'Bia đá khảo nghiệm "Bất Sát Chi Quyền": Muốn kế thừa quyền điển viễn cổ, thí sinh phải tung ra toàn lực một quyền đủ sức xé nứt núi đồi, nhưng khi kình phong chạm vào bia đá không được làm kinh động đến một con bướm trắng đang đậu bên trên. Thạch Phá Thiên đốn ngộ đạo lý "Quyền dĩ chỉ qua, cương nhu tịnh tế".',
        narrativePerspectiveSummary: 'Kính phục từ tận đáy linh hồn, tìm thấy truyền nhân đích thực sau vạn năm cô độc chờ đợi',
        historicalTruthVsRumor: 'Man tộc đồn Thạch Phá Thiên dùng man lực đập vỡ lăng mộ cướp đoạt truyền thừa. Thực tế là chàng đã quỳ gối trước bia mộ ba ngày ba đêm, dùng sự tĩnh lặng của đạo tâm để hòa nhịp cùng chiến hồn tiên tổ.',
        characterVividImpact: 'Chiếc vòng đeo tay bện bằng dây thừng gai và đá sỏi thô sơ mà phụ thân để lại; bàn tay to lớn có thể bóp nát thần binh nhưng khi nâng cánh bướm lại nhẹ nhàng như làn gió.',
        spokenDialogueDraft: 'Vạn năm qua, hàng ngàn Man Vương cái thế đến đây khoe khoang cơ bắp và nắm đấm sát phạt, kẻ nào cũng muốn đấm nát trời đất để xưng hùng xưng bá... Ta đều đuổi hết! Duy chỉ có tiểu tử Thạch Phá Thiên này khiến lão phu rơi lệ. Nó đứng trước bia đá của chủ nhân ta, cơ bắp cuồn cuộn như núi lửa chực phun trào, một quyền vung ra mang theo sức mạnh lay trời chuyển đất... Nhưng khi quyền đầu chỉ còn cách phiến đá một phân, kình phong ngàn cân bỗng nhiên hóa thành một làn gió xuân ấm áp. Con bướm trắng đang ngủ trên vách đá khẽ đập cánh, đậu ngay lên mu bàn tay đầy vết sẹo của nó! Nó nhìn ta gãi đầu bảo: "Chiến hồn tiền bối, nắm đấm sinh ra là để bảo vệ kẻ yếu, đâu phải để giẫm đạp lên sinh linh!" Khoảnh khắc đó, ta biết chủ nhân ta có thể yên nghỉ được rồi!'
      },
      {
        id: 'ols_tpt_03',
        subplotTitle: 'Vác Khối Thái Cổ Long Huyết Thần Kim & Bát Rượu Đổi Bảo Vật',
        speakerType: 'GIAM_DINH_SU_BAO_CAC',
        speakerNameAndRole: 'Bạch Vạn Kim (Tổng Quản Sự • Vạn Bảo Tiên Thương Minh Chi Nhánh Nam Cương)',
        narrativeSetting: 'Bên bàn tính vàng ròng sáng loáng trong phòng tiếp khách VIP của thương minh',
        recountedEraOrEvent: 'Năm 26 tuổi • Sau trận càn quét Vạn Long Sào cứu thoát đệ tử tiên môn',
        associatedTreasureOrRealm: 'Vạn Long Sào Di Tích • Thái Cổ Long Huyết Thần Kim (Khối Quặng Vạn Cân)',
        treasureLoreCategory: 'BI_CANH_DONG_THIEN',
        treasureTrialSecret: 'Khối Long Huyết Thần Kim nặng ba vạn sáu ngàn cân, nằm sâu dưới dòng nham thạch sôi sục của tổ rồng lửa. Người mang vác phải dùng da thịt trần chống chịu nhiệt độ ngàn độ C vượt qua 500 dặm hoang mạc lửa cháy.',
        narrativePerspectiveSummary: 'Vừa kinh ngạc vừa nể phục tính cách hào sảng, không màng tiền tài danh vọng của một thể tu chân chính',
        historicalTruthVsRumor: 'Giang hồ đồn Thạch Phá Thiên tống tiền thương minh một trăm vạn linh thạch mới chịu giao khối thần kim. Sự thật là chàng vác khối đá khổng lồ đến chỉ để đổi lấy mười hũ rượu Thiết Cốt Tửu đãi huynh đệ và chữa thương cho đám đệ tử bị bỏng.',
        characterVividImpact: 'Hai bờ vai hằn sâu vết chai sạn cháy đen vì vác đá nặng; nụ cười sảng khoái vang dội như chuông đồng khi ngửa cổ tu sạch cả bầu rượu ngon.',
        spokenDialogueDraft: 'Các ngươi có tin được không? Giữa trưa nắng gắt Nam Cương, cả tòa thành bỗng dưng rung chuyển như động đất cấp mười! Ta hốt hoảng chạy ra cửa thì thấy một gã khổng lồ lưng trần, cơ bắp cuồn cuộn gân xanh như rễ cây cổ thụ, một mình vác trên vai khối Thái Cổ Long Huyết Thần Kim to như gian nhà! Hắn ném cái "rầm" xuống sân làm nát vụn phiến đá hoa cương, rồi lau mồ hôi cười ha hả: "Bạch lão bản! Khối sắt này đổi được mấy hũ rượu Thiết Cốt Tửu thế?" Ta bảo khối thần kim này đủ để mua cả trăm hũ rượu gia truyền cùng mười vạn linh thạch thượng phẩm, hắn chỉ xua tay: "Thôi thôi! Lấy rượu ngon với thuốc trị bỏng cho đệ tử Thái Hư Môn là được rồi, giữ nhiều tiền thối rắm mệt người!" Khí phách hào sảng ấy, trên đời này tìm đâu ra người thứ hai?'
      },
      {
        id: 'ols_tpt_04',
        subplotTitle: 'Bát Canh Rau Rừng Của Chú Thợ Rèn: Chiếc Búa Sắt Gãy Cán & Tấm Lòng Đứa Trẻ Lực Điền',
        speakerType: 'CO_NHAN_HAN_VI',
        speakerNameAndRole: 'A Nham Thúc (68 tuổi, thợ rèn già bản làng Thạch Sơn, người dạy chàng cầm búa)',
        narrativeSetting: 'Bên lò rèn than hồng tí tách tia lửa, tay gõ nhẹ vào chiếc đe sắt rỉ sét đã mòn vẹt',
        recountedEraOrEvent: 'Năm 14 - 17 tuổi • Thuở thiếu thời gánh sắt phụ việc rèn nông cụ cho bộ tộc',
        associatedTreasureOrRealm: 'Thạch Sơn Thiết Quáng • Ô Thiết Cổ Khoáng',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret: 'Những thanh đoản đao chàng rèn thời niên thiếu tuy làm từ sắt thô nhưng chứa đựng sự nhẫn nại và tâm tính chính trực; chàng từng dùng tay không bẻ gãy lưỡi đao khi phát hiện có kẻ dùng nó đi cướp bóc.',
        narrativePerspectiveSummary: 'Tự hào, xúc động khôn xiết khi đứa cháu thợ rèn nghèo năm nào nay đã thành Hoang Cổ Chiến Thần vang danh thiên hạ',
        historicalTruthVsRumor: 'Người ngoài tưởng Thạch Phá Thiên từ nhỏ đã là tên côn đồ hiếu chiến thích đập phá. Thực chất thằng bé Phá Thiên hiền lành nhất bản, cả ngày chỉ biết quai búa đóng cày cuốc giúp bà con nghèo mà không lấy một đồng công sá.',
        characterVividImpact: 'Thói quen ngồi xổm bên hiên nhà húp xì xụp bát canh rau rừng mẹ nấu; bàn tay to lớn đầy sẹo bỏng rèn sắt nhưng lúc nào cũng cẩn thận nhặt từng mảnh sắt vụn để tránh làm trẻ con dẫm phải.',
        spokenDialogueDraft: 'Thằng bé Phá Thiên ấy à? Năm mười lăm tuổi nó đã vác nổi tảng đá năm trăm cân giúp dân làng đắp đê ngăn lũ dữ! Chiếc búa tạ của ta nặng bốn mươi cân, người lớn quai mười nhát đã bở hơi tai, vậy mà nó quai liền một nghìn nhát sắt đỏ mà miệng vẫn hát vang bài ca săn thú của bộ tộc. Xong việc, ta bưng cho nó bát canh rau rừng nguội ngắt với củ sắn lùi, nó ăn ngon lành rồi cười toe toét: "A Nham Thúc! Sau này cháu lớn lên thành đại hiệp, cháu sẽ rèn cho thúc một cái đe bằng vàng ròng!" Giờ nó thành Chiến Thần trên mây trên gió rồi, vậy mà hôm nọ đoàn thương buôn về làng, chuyển cho ta một cỗ đe sắt thượng hạng rèn từ Vẫn Thiết Thần Kim, kèm theo bức thư nguệch ngoạc: "Cháu gửi thúc rèn cày cuốc cho dân làng đỡ mệt." Đọc xong ta khóc ròng cả đêm các cháu ạ!'
      },
      {
        id: 'ols_tpt_05',
        subplotTitle: 'Cột Chống Trời Man Hoang: Lưng Trần Đỡ Cành Gãy Của Cây Trường Sinh Ngăn Trời Sập',
        speakerType: 'TAM_BAO_GIA_BI_CANH',
        speakerNameAndRole: 'Lão Tán Tu Cửu Chỉ Thần Đao (Tầm bảo giả 70 năm xông pha di tích Thần Khư)',
        narrativeSetting: 'Trong túp lều bạt rách nát giữa hoang mạc Thần Khư gió cát gầm rú, tay mân mê thanh tàn đao cong vênh vì dư chấn sụp đổ',
        recountedEraOrEvent: 'Năm 27 tuổi • Đại biến cố Vực Ngoại Ma Tộc tập kích bẻ gãy nhánh Cây Trường Sinh chống trời',
        associatedTreasureOrRealm: 'Đại Hoang Thần Khư Di Tích • Cành Thần Gãy Của Cây Trường Sinh (Kình Thiên Thần Mộc)',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret: 'Cành Cây Trường Sinh chống đỡ thiên địa bị ma lôi đánh gãy nặng ba mươi vạn cân rơi xuống từ chín tầng mây, mang theo thiên đạo áp chế nghiền nát thân thể thần ma.',
        immortalTreeConnection: 'Khi cành thần gãy đổ sắp đè bẹp mười vạn thường dân bộ lạc dưới chân núi, Thạch Phá Thiên gầm lên rung trời lở đất, lấy thân thể phàm trần lao vào tâm bão. Chàng dùng hai vai và sống lưng trần gánh lấy thân cây thần suốt bảy ngày bảy đêm không ngủ, máu đỏ tươi nhuộm đẫm vỏ cây. Nhựa sống màu lục bích của Cây Trường Sinh cảm động đã dung hòa vào tủy sống, ban cho chàng "Bất Diệt Trường Sinh Bá Thể Văn" ngàn kiếp không bao giờ sụp đổ.',
        narrativePerspectiveSummary: 'Kinh hoàng tột độ trước sức mạnh thể xác và ý chí hy sinh lay chuyển càn khôn của một thể tu chân chính',
        historicalTruthVsRumor: 'Ma tộc rêu rao Thạch Phá Thiên đã bị cành Cây Trường Sinh đè gãy xương sống biến thành phế nhân. Sự thật là sau bảy ngày đêm cắn răng chịu đựng, chàng đã tự tay cắm rễ cành thần mộc sâu mười trượng xuống lòng đất, khiến cây thần hồi sinh che chở cho cả Nam Cương.',
        characterVividImpact: 'Vết sẹo lồi rực ánh lục kim hình cành lá Cây Trường Sinh in hằn nổi rõ dọc theo sống lưng rộng lớn; thói quen mỗi khi đi qua rừng già đều ôm lấy thân cổ thụ vỗ nhẹ ba cái như chào hỏi cố nhân.',
        spokenDialogueDraft: 'Trời ơi chư vị không thể tưởng tượng được cảnh tượng ngày hôm ấy đâu! Bầu trời Đại Hoang đen kịt như mực, cành Cây Trường Sinh to như dãy núi từ trên mây đổ sập xuống, mặt đất rung chuyển nứt toác ngàn dặm! Hàng vạn người khóc lóc bỏ chạy, còn thằng khùng Thạch Phá Thiên thì từ dưới mặt đất nhảy vọt lên đón đầu! Tiếng xương khớp nó kêu răn rắc vang dội khắp chiến trường, máu từ miệng nó phun ra đỏ rực cành lá. Nó đứng đó, hai chân lún sâu ba thước vào đá tảng, hai tay giơ cao gánh lấy bầu trời, gầm lên giữa cơn lôi kiếp: "Lũ ma tộc chúng mày nghe cho rõ: Ngày nào Thạch Phá Thiên tao còn thở, ngày đó trời không thể sập xuống đầu dân làng tao!" Bảy ngày bảy đêm... nó đứng bất động như một bức tượng đồng giữa gió bão! Khoảnh khắc nhựa sống Cây Trường Sinh thẩm thấu vào lưng nó, cả người nó tỏa ra ánh sáng xanh biếc vô địch thiên hạ... Đó không phải là người phàm nữa rồi, đó là Chiến Thần đích thực của nhân tộc!'
      },
      {
        id: 'ols_tpt_06',
        subplotTitle: 'Nhiệm Vụ Khai Thông Cổ Sơn Đạo: Hai Tay Đỡ Sập Hầm Cứu Hai Trăm Phu Mỏ & Khối Long Huyết Thần Kim',
        speakerType: 'DONG_DOI_NHIEM_VU',
        speakerNameAndRole: 'Lôi Bá Thiên (Đội Trưởng Tiền Phong Khai Sơn Phá Thạch • Bộ Tộc Man Hoang)',
        narrativeSetting: 'Bên mỏm đá cheo leo của Hắc Nham Lĩnh, tay cầm thanh cuốc sắt sứt mẻ gõ nhịp chan chát vào vách đá',
        recountedEraOrEvent: 'Năm 20 tuổi (Trúc Cơ Cực Cảnh) • Nhiệm Vụ Khai Sơn & Thăm Dò Cổ Khoáng Cấp Địa',
        associatedMissionOrQuest: 'Nhiệm Vụ Bộ Tộc: Khai Thông Cổ Sơn Đạo & Thăm Dò Mạch Thái Cổ Long Huyết Thần Kim',
        missionExecutionTruth:
          'Báo cáo quân vụ chỉ ghi nhận ngắn gọn: "Hoàn tất khai thông ba mươi dặm sơn đạo, đoạt được ba mươi cân quặng Long Huyết Thần Kim thô". Nhưng Lôi Bá Thiên nghẹn ngào kể lại sự thật: Mạch ngầm sụp đổ bất ngờ chôn vùi hai trăm phu mỏ phàm nhân trong khói độc ngột ngạt. Trưởng lão toan bỏ mặc để bảo toàn đệ tử tu sĩ, chỉ có Thạch Phá Thiên gầm lên xông thẳng vào bóng tối. Chàng dùng hai bờ vai trần và tấm lưng thịt nát xương tan làm cột trụ chống đỡ vòm đá nặng hàng chục vạn cân suốt ba canh giờ liền, máu tươi chảy ròng ròng từ hai khóe mắt và khớp gối, kiên quyết không gục ngã cho đến khi người phu mỏ cuối cùng được dìu ra ngoài an toàn.',
        associatedTreasureOrRealm: 'Hắc Nham Cổ Sơn Đạo • Thái Cổ Long Huyết Thần Kim & Man Thần Tích Huyết',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret:
          'Long Huyết Thần Kim nằm giữa tổ kiến độc ngàn năm; chàng phải dùng chính máu cánh tay mình nhử bầy kiến độc ra khỏi cửa hang để đồng đội tiến vào khai thác an toàn.',
        immortalTreeConnection:
          'Mùi máu tươi thuần phác của chàng vô tình đánh thức một hạt giống Cây Trường Sinh ngủ vùi dưới lòng đất sâu, mọc lên một nhành cây xanh biếc tỏa hương thơm thanh khiết giải độc cho toàn bộ phu mỏ bị thương.',
        narrativePerspectiveSummary:
          'Cảm kích và coi Thạch Phá Thiên như vị thần hộ mệnh sống của toàn thể phu mỏ và người lao dịch khốn cùng chốn biên thùy',
        historicalTruthVsRumor:
          'Ngoại giới rêu rao Thạch Phá Thiên là kẻ khát máu hung hãn chỉ biết đánh đấm tàn phá. Thực tế chàng là người rơi nước mắt đầu tiên khi thấy một cụ già phu mỏ được cứu sống đoàn tụ cùng gia đình.',
        characterVividImpact:
          'Hai bả vai chai sần thành những mảng sừng dày cộp do gánh đá sập; thói quen luôn xé nửa cái bánh bao khô nhường cho con nít phu mỏ trước khi ăn phần của mình.',
        spokenDialogueDraft:
          'Bọn công tử tiên môn các ngươi chỉ biết ngồi trên lầu cao ngắm cảnh, chứ có biết mùi đá sập hầm mỏ kinh hoàng thế nào không? Năm ấy tại Hắc Nham Lĩnh, đá tảng vạn cân từ trên nóc hang đổ ụp xuống, hai trăm mạng phu mỏ bọn ta khóc thét chờ chết ngạt. Đúng lúc đó, một bóng người cao lớn như ngọn núi xông vào, hai tay giơ thẳng lên trời đội lấy cả tảng đá khổng lồ! Đó là Thạch Phá Thiên! Tiếng gân cốt nó kêu răng rắc rợn người, máu từ bả vai tuôn xối xả làm ướt sũng mặt đá. Nó gầm lên rung chuyển hang tối: "Đi mau! Bò ra ngoài mau! Đừng để ý đến tao!" Nó đứng chịu trận suốt ba canh giờ, chân lún sâu vào bùn đá... Khi người cuối cùng bò ra khỏi cửa hang, vòm đá sập tan tành chôn vùi nó dưới đáy sâu. Bọn ta phát điên đào bới đất đá suốt một đêm, lôi nó lên thì thấy nó vẫn còn thở, tay nó vẫn đang che chắn cho một khối quặng Thần Kim để đem về chia tiền thuốc cho anh em! Thằng bé đó... mạng của hai trăm gia đình bọn ta là do nó dùng xương máu đổi về!'
      },
      {
        id: 'ols_tpt_07',
        subplotTitle: 'Nhiệm Vụ Thí Luyện Hoang Cổ Thần Mộc: Lấy Thân Làm Bia Chắn Lôi Kiếp Đoạt Mộc Tủy Cứu Nghĩa Phụ',
        speakerType: 'DONG_DOI_NHIEM_VU',
        speakerNameAndRole: 'Bàn Thạch Lão Nhân (Lão Dược Sư 90 tuổi của Bộ Tộc Thạch Sơn, người đồng hành hái thuốc)',
        narrativeSetting: 'Bên chõng tre trước sân nhà sàn phơi đầy lá thuốc Nam Cương, tay cầm chiếc bình ngọc rỗng đựng thần dược năm xưa',
        recountedEraOrEvent: 'Năm 23 tuổi • Nhiệm Vụ Thí Luyện Sinh Tử: Tìm Kiếm Trường Sinh Mộc Tủy Cứu Đan Điền Nghĩa Phụ',
        associatedMissionOrQuest: 'Nhiệm Vụ Khảo Nghiệm Hoang Cổ: Đột Nhập Thần Mộc Bí Cảnh Đoạt Bất Tử Mộc Tủy',
        missionExecutionTruth:
          'Hồ sơ nhiệm vụ ghi nhận: "Thạch Phá Thiên mang về trọn vẹn ba giọt Bất Tử Mộc Tủy, cứu sống lão tộc trưởng". Nhưng Bàn Thạch Lão Nhân kể lại sự thật rúng động: Tại tâm chấn lôi đình của bí cảnh, sét đánh cháy xém da thịt. Phá Thiên bị Lôi Bạo Hùng vồ rách bụng, nhưng hai bàn tay chàng vẫn nắm chặt chiếc bình ngọc cuộn tròn trong lồng ngực để sét không làm vỡ bình ngọc. Khi trở về, da chàng đen thui như khúc gỗ cháy, chỉ có chiếc bình ngọc trong ngực là nguyên vẹn lấp lánh tiên quang.',
        associatedTreasureOrRealm: 'Hoang Cổ Thần Mộc Bí Cảnh • Bất Tử Mộc Tủy Của Cây Trường Sinh & Lôi Bạo Thú Đan',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret:
          'Cây Trường Sinh Thần Mộc yêu cầu người lấy mộc tủy phải dâng hiến một nửa sinh mệnh lực tinh khiết; Phá Thiên không hề đắn đo tự bẻ gãy một xương sườn bản mệnh dung nạp sấm sét để đổi lấy ba giọt linh dịch thần mộc cứu cha.',
        immortalTreeConnection:
          'Dòng nhựa sống Cây Trường Sinh cảm ứng được tấm lòng đại hiếu đã tự động chữa lành vết thương lôi kiếp, tạo nên những đường gân xanh thần bí trên khắp cánh tay chàng, mở ra cảnh giới Thần Ma Bất Hoại Thể.',
        narrativePerspectiveSummary:
          'Kính phục vô bờ bến tấm lòng hiếu đạo và ý chí sắt đá không khuất phục của chàng thiếu niên Man Tộc',
        historicalTruthVsRumor:
          'Kẻ thù đồn chàng nuốt trọn tiên quả để tăng cường công lực cho bản thân. Sự thật là ba giọt mộc tủy chàng không dám nếm dù chỉ nửa giọt, đem nhỏ hết vào miệng nghĩa phụ đang nằm hấp hối.',
        characterVividImpact:
          'Vết sẹo sét đánh hình tia chớp đỏ rực từ ngực lan xuống rốn; nụ cười chất phác ngượng ngùng khi được người già xoa đầu khen ngợi.',
        spokenDialogueDraft:
          'Lão già này theo hầu các đời tộc trưởng gần một thế kỷ, chưa từng thấy đứa trẻ nào hiếu thuận và can trường như thằng Phá Thiên! Đêm ấy trên đỉnh Lôi Phong của bí cảnh, sấm sét giáng xuống như thác lũ, đất trời nứt toác. Con gấu lôi khổng lồ tát một cú xé rách cả mảng thịt sườn của nó, máu phun ra xối xả. Vậy mà nó không thèm đánh lại, nó dùng cả thân mình cuộn tròn lại che chở cho chiếc bình ngọc đựng ba giọt nhựa Cây Trường Sinh! Nó thều thào với ta: "Bàn Thạch Thúc... giữ lấy bình ngọc này... mang về cứu phụ thân... con cản con gấu này lại..." Khi ta mang người đến tiếp viện, nó đã đấm chết tươi con hung thú, nhưng toàn thân nó cháy đen như than củi, hai hàm răng vẫn cắn chặt vạt áo để giữ ấm chiếc bình thuốc. Một đứa con có tấm lòng vàng như thế, trời đất nào nỡ phụ nó!'
      },
      {
        id: 'ols_tpt_08',
        subplotTitle: 'Đột Phá Đoán Thể Kim Đan: Lôi Hỏa Luyện Thần Cốt & Hai Tay Bẻ Gãy Tám Mươi Mốt Đạo Hoang Kiếp Lôi',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Man Thần Đại Tế Ty Cổ Mộc (Trưởng Lão Hộ Đàn Thạch Tộc • Người Canh Giữ Lửa Thiêng)',
        narrativeSetting: 'Bên ngọn đuốc rực lửa trên Tế Đàn Man Cốt ngàn trượng, tiếng trống da thú âm vang dội vào vách núi hiểm trở',
        recountedEraOrEvent: 'Năm 19 tuổi (Trúc Cơ Cực Cảnh -> Đoán Thể Kim Đan) • Đại Lôi Kiếp Hoang Cổ Tôi Luyện Nhục Thân',
        breakthroughCultivationStage: 'Trúc Cơ Cực Cảnh -> Đoán Thể Kim Đan (Cửu Chuyển Man Thần Cốt Viên Mãn)',
        tribulationOrPhenomenon: 'Địa Hỏa Cửu Trùng Trào Dâng & 81 Đạo Tử Tiêu Hoang Kiếp Lôi Bổ Toác Ngọn Núi Man Hoang',
        breakthroughRealTruth:
          'Kẻ thù trong man tộc đồn Thạch Phá Thiên lén trộm máu thiêng của tổ tiên uống vào mới đúc thành Kim Thân. Đại Tế Ty Cổ Mộc là người tận mắt chứng kiến chàng bước lên tế đàn: Không có đan dược hộ mạch, không có bùa chú che chắn. Chàng lột trần thân trên, dùng hai bàn tay không đón đỡ từng luồng sét giáng xuống từ tầng mây đen đặc. Da thịt chàng bị nung đỏ như sắt trong lò rèn, xương sườn gãy làm ba đoạn, nhưng chàng không hề lùi nửa bước. Chàng dùng chính dòng máu nóng và sự kiên định muốn che chở cho người già và trẻ nhỏ trong bộ lạc để ép 81 tia lôi hỏa thấm sâu vào tủy sống, rèn đúc nên Cửu Chuyển Man Thần Cốt bất hoại.',
        associatedTreasureOrRealm: 'Man Hoang Tế Đàn Di Tích • Thái Cổ Long Huyết Thần Kim & Hóa Thạch Rễ Cây Trường Sinh',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm Vạn Búa Rèn Thân: Thể tu độ Kim Đan kiếp phải chịu đựng đau đớn gấp mười lần đạo tu, lôi hỏa thâm nhập vào từng lỗ chân lông nghiền nát độc tố. Nếu sinh lòng sợ hãi buông xuôi, toàn bộ nhục thân sẽ hóa thành tro bụi trong một cái chớp mắt.',
        immortalTreeConnection:
          'Gốc rễ hóa thạch Cây Trường Sinh vạn năm dưới lòng tế đàn rung chuyển khi cảm ứng được dòng máu chí thành thuần khiết của chàng, giải phóng một luồng sinh khí lục bích mộc nguyên, kết hợp cùng lôi hỏa tôi luyện nên kinh mạch trường tồn bất diệt.',
        narrativePerspectiveSummary:
          'Tự hào đến rơi nước mắt, tôn sùng chàng như sự tái sinh của Man Thần Thượng Cổ bảo hộ tộc nhân',
        historicalTruthVsRumor:
          'Người đời tưởng thể tu chỉ là những kẻ dốt nát lấy thịt đè người. Kỳ thực quá trình đột phá của chàng là sự giao hòa tuyệt mỹ giữa ý chí tinh thần bất khuất và quy luật sinh diệt của thiên địa.',
        characterVividImpact:
          'Vết sẹo lôi hỏa chằng chịt in hình vảy rồng trên khắp hai cánh tay và lồng ngực; thói quen dẫm mạnh chân xuống đất để kiểm tra độ vững chắc của mặt đất trước khi bước vào lôi đài.',
        spokenDialogueDraft:
          'Các ngươi tưởng thằng bé Phá Thiên tự nhiên mà có nắm đấm đập vỡ bảo khí sao? Năm ấy trên Tế Đàn Man Cốt, tám mươi mốt đạo Hoang Lôi giáng xuống dữ dội đến mức các bô lão trong tộc đều phải quỳ rạp xuống đất cầu xin trời tha tội. Duy chỉ có thằng bé mười chín tuổi ấy cởi trần đứng sừng sững giữa biển lửa sét! Từng tia sét to như cột nhà quất vào lưng nó, máu tóe ra rồi lập tức bị lửa thiêu khô thành tro! Nó gầm lên như mãnh thú thức giấc, hai bàn tay thô ráp giơ lên trời túm lấy tia sét thứ tám mươi mốt bẻ gãy làm đôi! Tiếng xương nó kêu rôm rốp rợn người... Khi khói tan, nó đứng sừng sững như một ngọn tháp đồng, toàn thân ánh lên sắc vàng kim bất hoại, nó quay lại nhìn đám trẻ con trong bản đang khóc thét, nhe hàm răng trắng bóng cười khà khà: "Đừng khóc nữa các em... trời đánh không chết tao đâu, từ nay tao bảo vệ bản làng!" Lão già này sống trăm tuổi, nhìn cảnh đó mà nước mắt ròng ròng!'
      },
      {
        id: 'ols_tpt_09',
        subplotTitle: 'Đột Phá Hóa Thần Hoang Cổ Bá Thể: Nhất Quyền Đấm Vỡ Diệt Thế Hắc Lôi Che Chở Mười Vạn Dân Làng',
        speakerType: 'TIEN_BOI_AN_THE',
        speakerNameAndRole: 'Thương Minh Lão Quái (Đại Năng Ẩn Thế Ba Ngàn Năm • Côn Luân Vân Giới)',
        narrativeSetting: 'Bên mỏm đá ngắm sao hoang vu của Côn Luân, nhấp ngụm rượu đắng ngắm nhìn dải ranh giới Nam Cương',
        recountedEraOrEvent: 'Năm 140 tuổi • Đột Phá Hóa Thần Kỳ (Hoang Cổ Bá Thể Cực Cảnh)',
        breakthroughCultivationStage: 'Nguyên Anh Đỉnh Phong -> Hóa Thần Man Tôn (Hoang Cổ Bá Thể Đại Thành)',
        tribulationOrPhenomenon: 'Diệt Thế Hỗn Độn Hắc Lôi & Vạn Dặm Bão Cát Nam Hoang Gầm Rú Đảo Điên Càn Khôn',
        breakthroughRealTruth:
          'Giang hồ loan truyền Thạch Phá Thiên tẩu hỏa nhập ma, hóa thành ma thần điên loạn tàn phá non sông khi phá quan Hóa Thần. Thương Minh Lão Quái là người đứng trên mây chứng kiến tất cả: Thiên kiếp Hóa Thần của chàng quá đỗi nghịch thiên, mây đen cuồn cuộn bao trùm cả thung lũng nơi mười vạn phàm nhân đang sinh sống. Nếu chàng lùi bước né tránh, lôi kiếp sẽ san bằng cả thung lũng thành tro bụi. Chàng không ngần ngại lao thẳng lên chín tầng mây đón đầu lôi phạt. Hai cánh tay chàng rách toạc da thịt, ngực bị đâm thủng một lỗ lớn sâu hoắm, nhưng chàng đã tung ra Cửu Chuyển Hoang Cổ Thần Quyền đấm tan nát tâm chấn của lôi vân diệt thế, bảo toàn từng tấc đất và mạng sống của người dân.',
        associatedTreasureOrRealm: 'Nam Hoang Cấm Địa Thần Khư • Kình Thiên Cành Cây Trường Sinh & Thái Cổ Man Vương Thạch Trạc',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm Vạn Trọng Thối Tủy: Thần thể Hóa Thần phải đón nhận sự thanh trừng của quy tắc thiên đạo; nếu tâm sinh tà niệm ích kỷ, hắc lôi sẽ ăn mòn thần hồn thành cát bụi.',
        immortalTreeConnection:
          'Cành Cây Trường Sinh chàng từng dùng sống lưng gánh đỡ năm xưa đã bung tỏa hào quang xanh ngọc bích từ lòng đất, đâm chồi ngàn vạn cành lá sinh mệnh che chắn cho thần hồn chàng, giúp nhục thân chàng tái tạo trong chớp mắt thành Bất Diệt Trường Sinh Bá Thể.',
        narrativePerspectiveSummary:
          'Kính nể sát đất trước một thể tu vĩ đại sẵn sàng lấy thân mình làm khiên chắn cho nhân gian',
        historicalTruthVsRumor:
          'Thế gian sợ hãi sức mạnh phá hoại của chàng, gọi chàng là Cuồng Thể Man Tôn khát máu. Kỳ thực mỗi vết sẹo trên người chàng đều là một tấm huân chương cứu mạng hàng vạn sinh linh.',
        characterVividImpact:
          'Vết sẹo tròn xuyên qua bả vai trái do hắc lôi thiêu đốt luôn phát ra ánh sáng xanh ấm áp; thói quen dùng bàn tay to bè vuốt ve cành cây non ven đường mỗi khi hoàn thành trận chiến.',
        spokenDialogueDraft:
          'Lão quái ta sống ba ngàn năm trên đỉnh Côn Luân, xem thường lũ tu sĩ miệng lưỡi đạo mạo nhưng hễ gặp thiên kiếp là co đầu rút cổ! Cho đến cái ngày Thạch Phá Thiên đột phá Hóa Thần ở Nam Cương! Đám mây đen Diệt Thế Hắc Lôi dày đặc hàng trăm dặm, đè nặng xuống đầu mười vạn phàm nhân dưới thung lũng... Đổi lại là kẻ khác, bọn chúng đã phi hành nghìn dặm tìm chỗ hoang vu mà trốn rồi! Nhưng thằng ngốc họ Thạch ấy thì sao? Nó đứng dưới đất gầm lên rung chuyển núi non, đạp nứt mặt đất vọt thẳng lên trời! Hai tay nó rỉ máu, nó dùng chính quả đấm trần của mình đấm vỡ từng đạo sấm sét đen ngòm! Khi đạo hắc lôi cuối cùng đánh thủng bả vai nó, nó vẫn không lùi, nó gầm lên một tiếng xé toạc cả tầng mây đen, để ánh mặt trời rực rỡ chiếu rọi xuống thung lũng bình an! Lúc cành Cây Trường Sinh nở hoa trên vết thương của nó, ta bưng bầu rượu lên ngửa mặt cười to: Nhân gian có một tên ngốc như thế này, quả là phúc lớn của trời đất!'
      },
      {
        id: 'ols_tpt_10',
        subplotTitle: 'Đột Phá Độ Kiếp Hoang Cổ Thần Tôn: Luyện Hóa Thần Mộc Chi Cốt & Quyền Kình Xé Rách Cửu Trọng Diệt Thế Kiếp',
        speakerType: 'TAM_BAO_GIA_BI_CANH',
        speakerNameAndRole: 'Hắc Phong Lão Tán Tu (Tầm Bảo Giả 120 Năm Săn Lùng Cấm Khu Thần Ma • Chứng Nhân Nam Hoang)',
        narrativeSetting: 'Bên đống lửa tàn giữa sa mạc đá đỏ Nam Cương, ngước nhìn khoảng trời trong vắt không một gợn mây sau đại kiếp',
        recountedEraOrEvent: 'Năm 290 tuổi (Hợp Thể Viên Mãn -> Độ Kiếp Chuẩn Đế) • Đại Lôi Kiếp Hoang Cổ Thần Thể Đại Viên Mãn',
        breakthroughCultivationStage: 'Hợp Thể Viên Mãn -> Độ Kiếp Kỳ (Hoang Cổ Thần Ma Bất Hoại Chi Thân)',
        tribulationOrPhenomenon: 'Thiên Địa Hỗn Độn Ngũ Hành Lôi Kiếp & Dị Tượng Đại Địa Nứt Ra Thành Cội Rễ Cây Trường Sinh Khổng Lồ Nâng Đỡ Bầu Trời',
        breakthroughRealTruth:
          'Giang hồ đồn Thạch Phá Thiên đào trộm lăng mộ Cổ Thần, hút cạn tinh huyết tiên tổ mới đạt tới cảnh giới Thần Tôn vô địch. Hắc Phong Lão Tán Tu - người ẩn nấp dưới vách đá chứng kiến - khẳng định: Năm ấy ngũ hành lôi kiếp giáng xuống muốn xóa sổ huyết mạch thể tu. Thạch Phá Thiên bị sét đánh nát toàn bộ lục phủ ngũ tạng, xương cốt gãy vụn thành bột. Nhưng trong khoảnh khắc sinh tử, thân thể chàng hòa làm một với cội rễ Cây Trường Sinh cắm sâu dưới lòng đất Nam Cương. Chàng gầm lên tiếng gầm chấn động chư thiên, dùng hai cánh tay máu thịt tự bẻ gãy từng đạo ngũ hành thần lôi nhét vào ngực rèn lại tim gan, đúc nên "Bất Tử Man Thần Nhục Thân".',
        associatedTreasureOrRealm: 'Cổ Thần Di Tích Vạn Trượng Đáy Vực • Bất Tử Thần Mộc Cốt & Cửu Chuyển Man Thần Đỉnh',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Bất Diệt Ý Chí": Nhục thân phải bị thiêu rụi thành tro ba lần rồi tự tái sinh trong lôi hỏa; nếu ý chí lung lay nửa điểm thì hồn phách sẽ vĩnh viễn tan biến vào hư vô.',
        immortalTreeConnection:
          'Cây Trường Sinh viễn cổ đã ban tặng đoạn xương lõi "Thần Mộc Chi Tủy" hợp nhất vào cột sống của chàng, biến tấm lưng chàng thành bức tường thành vĩnh cửu không một lực lượng nào của thiên ma có thể lay chuyển.',
        narrativePerspectiveSummary:
          'Bàng hoàng kính phục ý chí bất khuất không gì bẻ gãy nổi của người chiến binh man tộc bình dị',
        historicalTruthVsRumor:
          'Kẻ thù rêu rao chàng là quái vật dị loại do ma quỷ sinh ra. Kỳ thực sự tái sinh của chàng là món quà thiêng liêng đất mẹ và Cây Trường Sinh ban tặng cho một tâm hồn trượng nghĩa.',
        characterVividImpact:
          'Vết sẹo hình cội rễ cổ thụ rực ánh hoàng kim chạy dọc từ gáy xuống tận thắt lưng; thói quen ngồi bệt xuống đất vỗ đùi cười sảng khoái và chia sẻ phần lương khô của mình cho bất kỳ ai đi ngang qua.',
        spokenDialogueDraft:
          'Lão già này săn lùng bảo vật ở cấm khu Nam Cương hơn một trăm năm, từng thấy bao nhiêu đại năng bị sét đánh thành tro bụi! Duy chỉ có Thạch Phá Thiên này là kẻ điên cuồng nhất ta từng gặp! Ngũ Hành Thần Lôi giáng xuống, xé toạc ngực nó, lòi cả xương trắng... Vậy mà nó không ngã! Nó chống hai tay xuống đất gầm lên, rễ Cây Trường Sinh từ dưới lòng đất trồi lên quấn lấy chân nó truyền nhựa sống, nó đưa tay giật đứt từng tia sét ngũ sắc nhét thẳng vào lồng ngực tự thiêu đốt vết thương! Khi trời quang mây tạnh, nó bước ra từ đống tro tàn, cơ thể ánh lên sắc đồng cổ bóng loáng bất hoại... Nó thấy ta đang trốn trong hốc đá run bần bật, nó không giết ta, mà đi tới ném cho ta một miếng thịt khô nướng, cười ha hả: "Lão tiền bối, đừng sợ! Lôi kiếp hết rồi, ra sưởi nắng với cháu đi!" Ta cầm miếng thịt mà tay run lẩy bẩy... Đó mới là Chiến Thần chân chính của thiên hạ!'
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 4. TẦN VÔ ĐẠO - HỖN NGUYÊN ĐẠO TỬ / BẤT BẠI CHIẾN THẦN
  // -----------------------------------------------------------------------
  {
    characterId: 'char_tan_vo_dao',
    characterName: 'Tần Vô Đạo',
    characterAlias: 'Hỗn Nguyên Đạo Tử / Bất Bại Chiến Thần',
    overviewPhilosophy:
      'Duy ngã độc tôn, dĩ đao phá vạn pháp. Đời người tu sĩ ngắn ngủi, nếu không thể quang minh chính đại chiến đấu cùng địch thủ xứng tầm thì trường sinh ngàn năm cũng chỉ là ngục tù cô quạnh.',
    lifeDestinyVow:
      'Dùng Hoang Cổ Trấn Ma Đao đánh bại Lâm Tiêu bằng thực lực tuyệt đối, thanh trừng ma đạo, đúc thành Hoang Cổ Bất Bại Thánh Thể.',
    relations: [
      {
        id: 'rel_tvd_01',
        category: 'CHA_ME',
        targetName: 'Tần Thiên Đao',
        targetRoleOrTitle: 'Phụ Thân • Tông Chủ Vạn Kiếm Quy Tông (Đại Thừa Kỳ Đỉnh Phong)',
        intimacyLevel: 88,
        status: 'Còn Sống',
        originStory:
          'Nghiêm phụ thiết huyết, từ nhỏ đã rèn giũa Tần Vô Đạo bằng roi sắt và lôi điện để tôi luyện Hoang Cổ Thánh Thể. Miệng luôn mắng nhi tử ngông cuồng nhưng trong lòng tự hào khôn xiết.',
        currentDynamics:
          'Thường xuyên bàn luận quân cơ và chiến thuật đối phó Ma tộc; mong mỏi nhi tử sớm kế vị chức vị Minh Chủ.',
        karmicTies: 'Huyết thống truyền thừa Bá Đao Quyết; trách nhiệm gánh vác cơ nghiệp ngàn năm của tông môn.'
      },
      {
        id: 'rel_tvd_02',
        category: 'VO_DAO_LU',
        targetName: 'Liễu Tố Tố',
        targetRoleOrTitle: 'Tiểu Sư Muội • Thánh Nữ Đan Các Vạn Kiếm Quy Tông',
        intimacyLevel: 92,
        status: 'Còn Sống',
        originStory:
          'Thanh mai trúc mã cùng lớn lên từ thuở nhỏ. Nàng từng liều mạng lao vào biển lửa cấm khu để hái thuốc chữa trị vết thương Thánh Thể cho chàng.',
        currentDynamics:
          'Luôn chuẩn bị sẵn rượu ngon và đan dược bồi bổ mỗi khi chàng trở về sau những trận chiến ác liệt.',
        karmicTies: 'Sợi tơ hồng âm thầm bện chặt; lời thề bảo hộ nàng trọn kiếp bình an.'
      },
      {
        id: 'rel_tvd_03',
        category: 'KE_THU',
        targetName: 'Lâm Tiêu',
        targetRoleOrTitle: 'Túc Địch Tri Kỷ • Thiên Kiếm Chí Tôn',
        intimacyLevel: 85,
        status: 'Còn Sống',
        originStory:
          'Gặp nhau tại Đại Hội Thiên Kiêu ba mươi sáu châu, giao đấu ba ngày ba đêm bất phân thắng bại, xem nhau như tấm gương phản chiếu đạo tâm của bản thân.',
        currentDynamics:
          'Vừa là đối thủ cạnh tranh ngôi vị đệ nhất thiên hạ, vừa là đồng đạo kề vai sát cánh chống lại Vực Ngoại Ma Tộc.',
        karmicTies: 'Đao Kiếm Tranh Phong; giao ước quyết đấu đỉnh cao nơi Tiên Giới.'
      },
      {
        id: 'rel_tvd_04',
        category: 'SU_HUYNH_DE',
        targetName: 'Huyền Canh Lão Tổ',
        targetRoleOrTitle: 'Sư Bá Hộ Đạo • Bậc Thầy Đúc Đao Thượng Cổ',
        intimacyLevel: 90,
        status: 'Còn Sống',
        originStory:
          'Người đích thân rèn đúc Hoang Cổ Trấn Ma Đao và truyền thụ cho Tần Vô Đạo tâm pháp "Canh Kim Phá Giới".',
        currentDynamics:
          'Chăm sóc và bảo dưỡng đao khí cho chàng trước mỗi chuyến xuất chinh.',
        karmicTies: 'Ân sư chỉ điểm đạo lộ; bảo vật tương truyền.'
      }
    ],
    milestones: [
      {
        id: 'ms_tvd_01',
        timeAnchor: 'Năm 5 tuổi',
        title: 'Thức Tỉnh Hoang Cổ Thánh Thể & Nhất Quyền Nứt Vỡ Kiếm Bia',
        type: 'TU_LUYEN',
        location: 'Vạn Kiếm Quy Tông • Thánh Thể Tế Đài',
        involvedCharacters: ['Tần Thiên Đao', 'Huyền Canh Lão Tổ'],
        description: 'Thức tỉnh thể chất viễn cổ, linh quang hoàng kim bốc lên ngàn trượng, một quyền làm rạn nứt bia đá vạn năm.',
        cultivationStateBeforeAndAfter: 'Phàm cốt chưa khai mở -> Thức tỉnh Hoang Cổ Thánh Thể Đệ Nhất Trọng',
        psychologicalTransformation: 'Ý thức được sức mạnh và dòng máu bá đạo chảy trong huyết quản, kiêu hãnh tự tin.',
        karmicEcho: 'Được định danh là truyền nhân vĩ đại nhất của Vạn Kiếm Quy Tông.',
        novelSnippetDraft:
          'Năm lên năm tuổi, hài đồng họ Tần đứng trước bia đá ngàn năm của tổ tông, cả người tỏa ra ánh kim quang chói lòa như một vầng thái dương nhỏ. Nó siết chặt nắm đấm bé xíu giáng thẳng vào mặt đá, tiếng nổ long trời lở đất vang lên xé toạc mây mù, kiếm bia nứt toác một đường dài ba trượng. Chư vị trưởng lão sững sờ đánh rơi chén trà, đồng loạt thốt lên: "Hoang Cổ Thánh Thể xuất thế, thiên hạ này từ nay có chúa tể rồi!"'
      },
      {
        id: 'ms_tvd_02',
        timeAnchor: 'Năm 17 tuổi',
        title: 'Lôi Đao Nhai Độ Kiếp: Tám Mươi Mốt Đạo Canh Kim Lôi Tôi Luyện Kim Đan',
        type: 'TU_LUYEN',
        location: 'Bá Đao Sơn Trang • Lôi Đao Nhai',
        involvedCharacters: ['Huyền Canh Lão Tổ', 'Liễu Tố Tố'],
        description: 'Vượt qua Cửu Cửu Canh Kim Thần Lôi, dung hợp sát khí ngàn năm đúc thành Cửu Chuyển Hoang Cổ Kim Đan.',
        cultivationStateBeforeAndAfter: 'Trúc Cơ Viên Mãn -> Cửu Chuyển Hoang Cổ Canh Kim Kim Đan',
        psychologicalTransformation: 'Rèn luyện ý chí bách chiến bách thắng, không chịu khuất phục trước bất kỳ uy lực thiên địa nào.',
        karmicEcho: 'Tạo nên truyền kỳ độ kiếp không cần trận bàn hộ thân chấn động ba mươi sáu châu.',
        novelSnippetDraft:
          'Gió bão gầm rú trên đỉnh Lôi Đao Nhai, tám mươi mốt đạo sấm sét vàng óng như những con rồng lửa xé toạc bầu trời bổ xuống đầu thiếu niên áo đỏ. Tần Vô Đạo ngửa mặt cười to, một tay cầm đao chỉ trời, một tay đón sét nung đỏ lồng ngực. Tiếng đao ngân vang rền rĩ át cả tiếng sấm, viên Kim Đan màu hoàng kim rực rỡ từ đan điền bay vút lên hấp thu trọn vẹn lôi kiếp, mở ra con đường bá đạo vô tiền khoáng hậu.'
      },
      {
        id: 'ms_tvd_03',
        timeAnchor: 'Năm 23 tuổi',
        title: 'Đại Hội Thiên Kiêu: Đao Kiếm Tương Phùng Cùng Lâm Tiêu',
        type: 'BUOC_NGOAT_THAY_DOI',
        location: 'Trung Châu • Thông Thiên Chiến Đài',
        involvedCharacters: ['Lâm Tiêu', 'Lạc Thanh Hàn', 'Tần Thiên Đao'],
        description: 'Trận đại chiến kinh thiên động địa với Lâm Tiêu, đao kiếm chạm nhau chấn động tam giới, kết nên mối giao tình tri kỷ kỳ lạ.',
        cultivationStateBeforeAndAfter: 'Kim Đan Đỉnh Phong -> Lĩnh ngộ Canh Kim Bá Đao Ý Cảnh Viên Mãn',
        psychologicalTransformation: 'Thoát khỏi tâm lý ngạo mạn cô độc, nhận ra thế gian vẫn có đối thủ xứng tầm để khao khát vượt qua.',
        karmicEcho: 'Mở ra mối duyên nợ Đao Kiếm Song Tuyệt che chở nhân tộc.',
        novelSnippetDraft:
          'Trên đài Thông Thiên ngàn trượng, Hoang Cổ Trấn Ma Đao và Cửu U Kiếm giao nhau tóe lửa xé rách không gian ba trượng. Tần Vô Đạo vạt áo rách tả tơi, khóe môi rỉ máu nhưng ánh mắt sáng rực như đuốc, nhìn chằm chằm thiếu niên bạch y đối diện mà cười ha hả: "Lâm Tiêu! Ba mươi sáu châu này toàn lũ phế vật nhu nhược, chỉ có kiếm của ngươi mới xứng mài đao cho Tần Vô Đạo ta! Chén rượu này ta mời ngươi, kiếp này không phân cao thấp, quyết không ngừng nghỉ!"'
      }
    ],
    geographicAtlas: [
      {
        id: 'geo_tvd_01',
        name: 'Vạn Kiếm Quy Tông Cổ Nhai',
        type: 'TONG_MON_THANH_DIA',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Thuở thiếu thời đến trưởng thành',
        realmOrRegion: 'Đông Vực Kiếm Châu',
        terrainAndAura: 'Dãy núi đá dựng đứng hình thanh kiếm chọc trời, mây trắng vờn quanh, sát khí canh kim bốc lên ngùn ngụt.',
        requiredTasksOrTrials: 'Rèn luyện Hoang Cổ Thánh Thể, tu tập Bá Đao Quyết, lãnh đạo đệ tử xuất chinh.',
        conquestOrLegacy: 'Được tôn xưng là Đệ Nhất Đạo Tử, người kế thừa ngai vàng tông môn.'
      },
      {
        id: 'geo_tvd_02',
        name: 'Hắc Phong Hẻm Cấm Địa',
        type: 'BI_CANH_DONG_THIEN',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Năm 21 tuổi',
        realmOrRegion: 'Biên giới Tây Hoang',
        terrainAndAura: 'Vực sâu ngàn trượng đầy gió độc hắc ám, ma ưng làm tổ, vách đá sắc như dao cạo.',
        requiredTasksOrTrials: 'Trảm sát Cửu Đầu Ma Ưng đoạt Thái Sơ Canh Kim, cứu thoát năm mươi đệ tử.',
        conquestOrLegacy: 'Để lại vết chém dài mười dặm chia đôi thung lũng, được gọi là "Vô Đạo Trảm Gian Hẻm".'
      }
    ],
    questTrialRecords: [
      {
        id: 'qtr_tvd_01',
        category: 'NHIEM_VU',
        title: 'Huyền Thưởng Cấp SSS: Trấn Áp Cửu Đầu Ma Ưng & Thu Hồi Thái Sơ Canh Kim',
        stageTimeAnchor: 'Năm 21 tuổi',
        locationName: 'Hắc Phong Hẻm Ma Vực',
        dangerAndDifficulty: 'Cực Nguy Cấp S',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Trưởng Lão Đoàn Liên Minh Chính Đạo',
        keyObjectives: [
          'Tiêu diệt Cửu Đầu Ma Ưng đầu lĩnh cấp sáu',
          'Đoạt lại khối khoáng thạch Thái Sơ Canh Kim thượng cổ',
          'Bảo toàn tính mạng cho đội ngũ năm mươi đệ tử'
        ],
        rewardsOrBreakthroughs: 'Nhận được Thái Sơ Canh Kim đúc thành chuôi đao; đột phá Thánh Thể Đệ Lục Biến.',
        trialEncounters: 'Chạm trán phục kích của mười hai Ma Tướng U Minh Giáo.',
        narrativeJournalSnippet:
          'Máu nhuộm đỏ vách đá Hắc Phong Hẻm suốt ba ngày bão gió. Tần Vô Đạo một thân áo bào đỏ rách nát, tay cầm đao gãy chống đứng giữa xác ma thú chất cao như núi, quay lưng che chở cho năm mươi đệ tử run rẩy, gằn giọng từng tiếng: "Chừng nào đao của ta chưa gãy, lũ ma quỷ các ngươi đừng hòng bước qua nửa bước!"'
      }
    ],
    karmicInheritances: [
      {
        id: 'ki_tvd_01',
        name: 'Hoang Cổ Trấn Ma Đao',
        type: 'THAN_BINH_BAN_MENH',
        acquisitionMilestone: 'Năm 12 tuổi • Vạn Kiếm Trủng Bí Cảnh',
        rankOrGrade: 'Cực Phẩm Thông Thiên Linh Bảo',
        awakeningStage: 'Tầng 7/9 Phong Ấn',
        soulBondStatus: 'Tâm Huyết Tương Liên',
        specialAbilities: [
          'Trảm Không Phá Giới: Nhát đao chém đứt kết giới không gian',
          'Canh Kim Sát Vực: Tỏa ra sát khí áp chế 50% uy lực công pháp đối phương',
          'Thánh Thể Cộng Hưởng: Tăng gấp ba lần sức mạnh thể xác khi máu nhuộm chuôi đao'
        ],
        karmicCostOrBacklash: 'Mỗi lần xuất đao toàn lực sẽ tiêu hao một lượng lớn khí huyết bản mệnh.',
        novelLoreSnippet:
          'Thanh đao đen tuyền nặng tám ngàn cân cắm sâu vào vách đá ngàn năm, lưỡi đao khắc hình rồng uốn lượn rỉ máu đỏ tươi. Khi bàn tay thiếu niên Tần Vô Đạo chạm vào chuôi đao, tiếng rồng gầm vang dội chấn động cõi trời, sát khí xông thẳng lên chín tầng mây.'
      },
      {
        id: 'ki_tvd_02',
        name: 'Chuôi Đao Chế Tác Từ Cành Cây Trường Sinh Hóa Thạch',
        type: 'DAN_DUOC_THIEN_TAI',
        acquisitionMilestone: 'Năm 18 tuổi • Côn Luân Di Tích',
        rankOrGrade: 'Thần Mộc Tiên Khí Tàn Khuyết',
        awakeningStage: 'Hoàn Toàn Dung Hợp',
        soulBondStatus: 'Hợp Nhất Đạo Thân',
        specialAbilities: [
          'Trấn Áp Tâm Ma: Giữ cho tâm trí luôn thanh tỉnh giữa sát trận cuồng bạo',
          'Sinh Mệnh Hồi Phục: Tự động khâu nối kinh mạch bị đứt gãy sau mỗi trận chiến'
        ],
        karmicCostOrBacklash: 'Không có tác dụng phụ; liên kết chặt chẽ với mệnh mạch thần mộc.',
        novelLoreSnippet:
          'Chuôi đao làm từ cành Cây Trường Sinh hóa thạch màu xanh rêu cổ kính, mỗi khi chàng vung đao chém giết, chuôi đao lại tỏa ra một làn sinh khí ấm áp dịu dàng, giữ cho đạo tâm của chàng không bị sát khí ma đạo nuốt chửng.'
      }
    ],
    nemesisFeuds: [
      {
        id: 'nf_tvd_01',
        nemesisName: 'Huyết Cốt Ma Tôn',
        nemesisFactionAndRank: 'U Minh Giáo • Luyện Hư Kỳ Lão Ma',
        feudOriginCause: 'Huyết Cốt Ma Tôn tập kích đồ sát ba ngàn đệ tử Vạn Kiếm Quy Tông và đánh trọng thương Liễu Tố Tố.',
        feudSeverity: 'Huyết Hải Thâm Cừu',
        status: 'Chờ Ngày Quyết Đấu',
        pastClashes: 'Từng giao đấu tại U Minh Cốc, chém đứt một cánh tay của Ma Tôn nhưng bị ma độc đẩy lùi.',
        destinedDuelCondition: 'Đại Chiến Thần Ma tại Đoạn Hồn Nhai',
        feudResolutionReward: 'Rửa sạch mối thù tông môn, đốn ngộ Vô Thượng Bá Đao Đạo.',
        duelSnippetDraft:
          'Tần Vô Đạo siết chặt chuôi đao, gân xanh nổi cuồn cuộn trên trán, ánh mắt rực lửa hận thù nhìn về phía cấm địa ma giáo: "Huyết Cốt lão ma! Món nợ máu của ba ngàn đệ tử và vết thương của nàng ấy, Tần Vô Đạo ta sẽ dùng một đao chém đứt đầu ngươi để tạ lỗi cùng tiên tổ!"'
      }
    ],
    daoHeartDemons: [
      {
        id: 'dhd_tvd_01',
        demonName: 'Chấp Niệm Bách Chiến Bất Bại & Nỗi Sợ Thất Bại',
        demonType: 'BÌNH_CẢNH_CẢNH_GIỚI',
        triggerStage: 'Đột phá Hóa Thần Cảnh Giới',
        innerDemonManifestation: 'Trong tâm trí luôn hiện ra viễn cảnh bị đối thủ đánh bại, đao gãy người vong.',
        daoResolutionMethod: 'Buông bỏ danh xưng bất bại hão huyền, thấu hiểu ý nghĩa của việc chiến đấu vì bảo vệ thay vì vì danh vọng.',
        daoDomainMastery: 'Bá Đao Chi Vực 80%',
        breakthroughState: 'Đã Đốn Ngộ Hoàn Toàn',
        enlightenmentSnippet:
          'Dưới cội Cây Trường Sinh ngàn năm, Tần Vô Đạo buông thanh đao xuống đất, ngồi xếp bằng ngắm nhìn cánh hoa rơi trong gió. Chàng khẽ cười tự giễu: "Ta chấp niệm bất bại cả đời, hóa ra kẻ thù lớn nhất không phải là Lâm Tiêu, mà là sự kiêu ngạo của chính bản thân mình. Đao sinh ra là để bảo hộ nhân gian, đâu phải để chứng minh ta giỏi hơn kẻ khác!" Khoảnh khắc ấy, tâm ma tan biến, cảnh giới Hóa Thần khai mở.'
      }
    ],
    factionPowers: [
      {
        id: 'fp_tvd_01',
        factionName: 'Vạn Kiếm Quy Tông',
        characterTitleOrRole: 'Đệ Nhất Đạo Tử • Thống Lĩnh Chiến Đường',
        authorityLevel: 'Chấp Chưởng Trọng Quyền',
        controlledTerritory: 'Bá Đao Sơn Phong & Mười Hai Kiếm Doanh Biên Ải',
        alliedSubFactions: ['Chiến Đường', 'Đan Các', 'Chấp Pháp Doanh'],
        rivalFactionForces: 'Thế lực bảo thủ của Nhị Trưởng Lão cấu kết ma đạo dòm ngó chức vị Tông Chủ.',
        powerLegacyContribution: 'Xây dựng phòng tuyến biên cương vững chắc ngăn chặn ma tộc xâm lăng suốt một trăm năm.'
      }
    ],
    oralLoreSubplots: [
      {
        id: 'ols_tvd_01',
        subplotTitle: 'Bát Trà Lạnh Của Thuyết Thư Nhân: Đạo Tử Bất Bại & Nụ Cười Trước Đối Thủ Tri Kỷ Lâm Tiêu',
        speakerType: 'THUYET_THU_NHAN',
        speakerNameAndRole: 'Lão Thuyết Thư Nhân Triệu Cửu Công (Khách điếm Lạc Dương)',
        narrativeSetting: 'Bên góc trà quán hoàng hôn Lạc Dương, ánh nến lung linh soi bóng thanh đao gỗ treo trên vách',
        recountedEraOrEvent: 'Năm 23 tuổi • Sau trận đại chiến bất phân thắng bại tại Đại Hội Thiên Kiêu',
        associatedTreasureOrRealm: 'Thông Thiên Chiến Đài • Hoang Cổ Trấn Ma Đao & Cửu U Kiếm Thai',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret:
          'Thông Thiên Chiến Đài có cấm chế nghiền nát linh lực; hai vị thiên kiêu chỉ dùng thuần túy đao ý và kiếm ý đối kháng suốt ba ngày đêm, khiến mặt đài nứt toác ngàn đường.',
        narrativePerspectiveSummary:
          'Kính nể và say mê trước khí phách hào sảng, trọng nghĩa khinh tài của bậc kiêu hùng đao đạo',
        historicalTruthVsRumor:
          'Thế gian đồn Tần Vô Đạo thua trận căm ghét Lâm Tiêu, thề không đội trời chung. Sự thật là sau trận đấu, chính Tần Vô Đạo đã tự tay xách hai bầu rượu ngon tìm đến phòng trọ của Lâm Tiêu, cùng nhau uống cạn dưới trăng sáng và kết làm tri kỷ sinh tử.',
        characterVividImpact:
          'Thói quen ngửa cổ uống cạn bầu rượu lạnh rồi tiện tay ném vỡ vỏ bầu; nụ cười kiêu hùng ngạo nghễ để lộ hàm răng trắng bóng sau mỗi lần đao chạm kiếm.',
        spokenDialogueDraft:
          'Chư vị có biết trên đời này tìm được một kẻ thù xứng tầm khó đến mức nào không? Năm ấy sau trận quyết chiến Thông Thiên Đài, cả thiên hạ ai cũng tưởng Tần Vô Đạo sẽ phát điên vì không thể thắng nổi Lâm Tiêu. Nhưng lão già này tận mắt thấy đêm hôm đó, hắn khoác chiếc áo choàng đỏ rách tơi tả, tay xách hai vò rượu Thiết Cốt Tửu đạp cửa xông vào phòng Lâm Tiêu! Hắn ném một vò vào lòng Lâm Kiếm Tôn rồi cười sảng khoái: "Tiểu tử họ Lâm! Kiếm của ngươi chém rách áo ta ba chỗ, đao của ta cũng gọt mất lọn tóc của ngươi! Đêm nay uống rượu, ngày mai chúng ta cùng nhau đi trảm ma tộc!" Các ngươi thấy đó, bậc kiêu hùng chân chính là như thế đấy, thắng bại là chuyện nhỏ, tìm được tri kỷ giữa dòng đời mới là đại sự!'
      },
      {
        id: 'ols_tvd_02',
        subplotTitle: 'Lời Thú Nhận Của Bại Tướng Ma Tông: Nhát Đao Không Có Sát Ý & Nhành Cây Trường Sinh Trên Chuôi Đao',
        speakerType: 'KE_THU_SONG_SOT',
        speakerNameAndRole: 'Hắc Lôi Ma Tướng (Tướng tiên phong Ma tộc từng bị Tần Vô Đạo chém gãy song đao)',
        narrativeSetting: 'Trong hang đá tăm tối ẩm ướt, ôm hai cánh tay cụt run rẩy mỗi khi trời nổi gió bão',
        recountedEraOrEvent: 'Năm 25 tuổi • Trận huyết chiến cản hậu tại Cổ Sơn Nhai',
        associatedTreasureOrRealm: 'Cổ Sơn Cấm Địa • Nhánh Cây Trường Sinh Hóa Thạch Trên Chuôi Đao',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret:
          'Cành Cây Trường Sinh hóa thạch trên chuôi đao có linh tính; nếu người cầm đao động sát niệm tàn sát kẻ vô tội, chuôi đao sẽ bùng phát mộc gai đâm thủng lòng bàn tay.',
        immortalTreeConnection:
          'Tần Vô Đạo khắc ghi lời dạy của cội rễ Cây Trường Sinh viễn cổ: "Đao là hung khí, tâm là Phật đà". Chàng dùng nhánh thần mộc hóa thạch chế thành chuôi đao để tự nhắc nhở bản thân không bao giờ được lạm sát sinh linh vô tội.',
        narrativePerspectiveSummary:
          'Kinh hãi trước uy lực nhát đao nhưng tâm phục khẩu phục trước nhân cách cao thượng của đối thủ',
        historicalTruthVsRumor:
          'Ma giới rêu rao Tần Vô Đạo là hung thần khát máu chặt đầu vạn người. Thực tế nhát đao của chàng năm ấy chỉ chém gãy song đao và đánh vỡ giáp trụ, cố ý chừa lại một con đường sống cho tàn quân ma tộc quay đầu.',
        characterVividImpact:
          'Vết sẹo chém dài xéo ngang bả vai trái; ánh mắt sắc lẹm như chim ưng nhưng khi thu đao vào bao lại bình thản tự tại như mặt nước hồ thu.',
        spokenDialogueDraft:
          'Cả đời ta kiêu ngạo tung hoành Ma giới, chưa từng sợ bất kỳ ai... cho đến khi đối mặt với Tần Vô Đạo! Nhát đao của hắn vung ra mang theo kình phong xé rách cả vách núi, ánh sáng hoàng kim chói mắt đến mức làm ta mù tạm thời! Ta nhắm mắt chờ đầu rơi xuống đất... Nhưng cái "keng" chói tai vang lên, hắn chỉ chém gãy đôi song đao bản mệnh của ta! Ta mở mắt ra run rẩy hỏi: "Tại sao không giết ta?" Hắn nhìn ta bằng đôi mắt rực lửa, chỉ vào nhánh cành Cây Trường Sinh hóa thạch màu xanh rêu trên chuôi đao, lạnh lùng bảo: "Đao của Tần Vô Đạo ta sinh ra để trảm kẻ ác đồ sát thường dân, không thèm chém một kẻ đã mất vũ khí như ngươi! Cút về bảo với Huyết Cốt Ma Tôn, ngày nào ta còn sống, ngày đó Ma tộc đừng hòng bước qua sơn hà!" Khí phách ấy... khiến một tên ma tướng như ta cũng phải cúi đầu quỳ lạy!'
      },
      {
        id: 'ols_tvd_03',
        subplotTitle: 'Chiếc Áo Choàng Đỏ Của Sư Muội: Cơn Bộc Phát Thánh Thể & Giọt Sương Cây Trường Sinh Cứu Mạng',
        speakerType: 'CO_NHAN_HAN_VI',
        speakerNameAndRole: 'Liễu Tố Tố (Tiểu Sư Muội • Thánh Nữ Đan Các Vạn Kiếm Quy Tông)',
        narrativeSetting: 'Bên vườn thảo dược thơm ngát sau núi, tay cẩn thận khâu lại đường chỉ bị sứt trên chiếc áo choàng đỏ',
        recountedEraOrEvent: 'Năm 16 tuổi • Giai đoạn Hoang Cổ Thánh Thể phản phệ kinh mạch thập tử nhất sinh',
        associatedTreasureOrRealm: 'Côn Luân Cổ Động • Giọt Sương Cây Trường Sinh Viễn Cổ',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret:
          'Thánh Thể phản phệ sinh ra Canh Kim Hỏa Độc thiêu đốt ngũ tạng; chỉ có nước mắt thanh khiết kết hợp cùng giọt sương Cây Trường Sinh mới có thể làm dịu cơn thịnh nộ của huyết mạch cổ xưa.',
        immortalTreeConnection:
          'Chính Tần Vô Đạo đã lặn lội ba vạn dặm trèo lên đỉnh Côn Luân, quỳ trước gốc Cây Trường Sinh hóa thạch suốt bảy ngày bảy đêm xin đúng một giọt sương sinh mệnh để về cứu chữa đan điền cho sư muội; nhưng khi sư muội phát hiện chàng suýt chết vì hỏa độc, nàng đã lén nhỏ giọt sương ấy vào tim chàng để cứu chàng qua cơn nguy kịch.',
        narrativePerspectiveSummary:
          'Ngập tràn yêu thương và lòng biết ơn sâu sắc, thấu hiểu trái tim ấm áp son sắt ẩn sau vẻ ngoài sắt đá của sư huynh',
        historicalTruthVsRumor:
          'Người ngoài tưởng Tần Vô Đạo chỉ biết đến đao kiếm vô tình, không màng nhi nữ tình trường. Kỳ thực chiếc áo choàng đỏ chàng luôn khoác trên người suốt ba trăm năm chính là chiếc áo nàng tự tay dệt tặng chàng năm mười sáu tuổi.',
        characterVividImpact:
          'Thói quen luôn vô thức đưa tay kéo vạt áo choàng đỏ che trước ngực mỗi khi gió lạnh thổi qua; ánh mắt dịu dàng hiếm hoi chỉ xuất hiện khi nhìn thấy bóng dáng nàng bên vườn thuốc.',
        spokenDialogueDraft:
          'Mọi người chỉ thấy huynh ấy trên chiến trường oai phong lẫm liệt, một đao chém tan vạn quân, chứ có ai biết huynh ấy từng chịu đựng những gì đâu? Năm mười sáu tuổi, Hoang Cổ Thánh Thể của huynh ấy phát tác, da thịt nứt toác chảy máu như suối, đau đớn đến mức cắn nát cả khăn tay. Vậy mà khi ta bưng bát thuốc vào, huynh ấy vội vã lau sạch máu trên mặt, cười gượng với ta: "Tố Tố muội đừng sợ... ta chỉ đang luyện công thôi, một lát là khỏe ngay ấy mà." Rồi huynh ấy đưa cho ta giọt sương Cây Trường Sinh huynh ấy liều mạng xin về, bắt ta phải uống để trị bệnh phong hàn... Một người sư huynh ngốc nghếch luôn nhận hết đau đớn về mình như thế, cả đời này Liễu Tố Tố ta nguyện làm cái bóng đi sau lưng người!'
      },
      {
        id: 'ols_tvd_04',
        subplotTitle: 'Nhiệm Vụ Hắc Phong Hẻm: Một Đao Xé Đôi Hẻm Núi Cứu Năm Mươi Đệ Tử & Đoạt Thái Sơ Canh Kim',
        speakerType: 'DONG_DOI_NHIEM_VU',
        speakerNameAndRole: 'Lâm Báo (Đội Phó Tiên Phong Chiến Đường • Người Sống Sót Sau Trận Hắc Phong Hẻm)',
        narrativeSetting: 'Bên đài luyện binh rực lửa của Vạn Kiếm Quy Tông, tay lau chùi vết sẹo đao trên cán kích sắt',
        recountedEraOrEvent: 'Năm 21 tuổi • Nhiệm Vụ Tông Môn Cấp SSS Thu Hồi Thái Sơ Canh Kim',
        associatedMissionOrQuest: 'Nhiệm Vụ Huyền Thưởng Cấp SSS: Tiêu Diệt Cửu Đầu Ma Ưng & Thu Hồi Thái Sơ Canh Kim',
        missionExecutionTruth:
          'Báo cáo chiến sự gửi về tông môn chỉ ghi: "Đoàn áp tải hoàn thành nhiệm vụ xuất sắc, Tần Vô Đạo trảm đầu Ma Ưng đoạt thần kim". Nhưng Lâm Báo không thể nào quên: Khi mười hai Ma Tướng U Minh Giáo phục kích vây hãm năm mươi đệ tử trẻ trong hẻm núi cụt, đất đá sạt lở chôn vùi lối thoát hiểm. Chính Tần Vô Đạo đã gầm lên xé rách áo ngoài, một thân đẫm máu vung Hoang Cổ Trấn Ma Đao thi triển tuyệt kỹ "Bá Đao Khai Sơn". Một đao chém toạc dãy núi dài mười dặm mở ra con đường sống cho đồng đội! Chàng một mình ở lại đoạn hậu suốt ba ngày ba đêm, chém chết tươi sáu Ma Tướng, toàn thân găm mười chín mũi tên độc nhưng vẫn đứng sừng sững như một pho tượng thần bảo vệ khối Thái Sơ Canh Kim.',
        associatedTreasureOrRealm: 'Hắc Phong Hẻm Ma Vực • Thái Sơ Canh Kim Thần Thạch & Vô Đạo Trảm Gian Hẻm',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret:
          'Khối Thái Sơ Canh Kim tỏa ra sát khí xé rách kinh mạch phàm nhân; Tần Vô Đạo đã dùng chính lồng ngực thịt nát xương tan của mình để ôm lấy khối đá suốt dọc đường về nhằm ngăn chặn sát khí làm tổn thương đệ tử đi cùng.',
        immortalTreeConnection:
          'Hương thơm thanh khiết từ chuôi đao Cây Trường Sinh đã bảo vệ tâm trí chàng không bị độc tố của mũi tên ma làm mê muội, giúp chàng duy trì sinh mệnh lực đến khi viện quân tiếp cận.',
        narrativePerspectiveSummary:
          'Tôn sùng Tần Vô Đạo như vị thần bảo hộ vô địch của Chiến Đường, sẵn sàng vì chàng xông pha vào biển lửa',
        historicalTruthVsRumor:
          'Ngoại giới đồn Tần Vô Đạo hiếu sát thích tranh công với trưởng lão. Kỳ thực toàn bộ công tích và linh thạch ban thưởng nhiệm vụ năm mươi vạn viên chàng đem chia hết cho gia đình các đệ tử bị thương tật.',
        characterVividImpact:
          'Mười chín vết sẹo tròn do tên độc găm vào lưng và ngực; thói quen mỗi khi tập trận đều đích thân kiểm tra độ sắc bén của vũ khí cho từng binh sĩ.',
        spokenDialogueDraft:
          'Năm ấy ở Hắc Phong Hẻm, mười hai tên Ma Tướng vây kín bọn ta, đá núi sập xuống bít kín cửa hang! Bọn ta tuyệt vọng ôm nhau khóc, nghĩ rằng phen này bỏ mạng nơi đất khách quê người rồi. Đúng lúc đó, Đạo Tử bước lên phía trước, quay lưng lại nhìn bọn ta cười gằn: "Khóc cái gì mà khóc! Có Tần Vô Đạo ở đây, trời sập cũng có đao của ta chống đỡ!" Rồi huynh ấy vung đao lên! Trời ơi... một nhát đao chém rách toạc cả dãy núi đá vạn năm, ánh kim quang xé tan bóng tối mở ra lối thoát! Huynh ấy hét lên: "Chạy mau! Ta ở lại đoạn hậu!" Suốt ba ngày ba đêm tiếng đao rền rĩ trong hẻm núi... Khi bọn ta mang trưởng lão đến tiếp viện, huynh ấy đang ngồi trên xác con Ma Ưng khổng lồ, toàn thân đẫm máu đen của độc tiễn, vậy mà miệng vẫn ngậm cọng cỏ cười bảo: "Đến muộn thế, làm ta chờ uống rượu mỏi cả cổ!" Người thủ lĩnh như thế, bọn ta không liều mạng theo thì theo ai?'
      },
      {
        id: 'ols_tvd_05',
        subplotTitle: 'Đột Phá Hoang Cổ Thánh Thể Kim Đan: Cửu Trọng Canh Kim Thần Lôi & Nhát Đao Chém Nứt Lôi Vân',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Huyền Canh Lão Tổ (Thái Thượng Hộ Đạo Trưởng Lão • Vạn Kiếm Quy Tông)',
        narrativeSetting: 'Bên vách đá Lôi Đao Nhai còn in sâu những vết sét cháy xém ngàn năm, tay nâng tách trà đắng',
        recountedEraOrEvent: 'Năm 17 tuổi • Đại Lôi Kiếp Kết Đan Cực Cảnh Của Hoang Cổ Thánh Thể',
        breakthroughCultivationStage: 'Trúc Cơ Viên Mãn -> Cửu Chuyển Hoang Cổ Canh Kim Kim Đan',
        tribulationOrPhenomenon: 'Cửu Trọng Canh Kim Kiếp Lôi & Kim Sắc Cự Long Dị Tượng Xé Rách Tầng Mây Cửu Thiên',
        breakthroughRealTruth:
          'Các thế gia Bắc Hoang rêu rao rằng Tần Vô Đạo uống tiên đan của tổ tông mới đúc thành Kim Đan hoàn mỹ. Huyền Canh Lão Tổ - người trực tiếp hộ trận - kể lại sự thật rúng động: Khi tám mươi mốt đạo Canh Kim Thần Lôi to như cột đình giáng xuống muốn tiêu diệt thể chất Thánh Thể nghịch thiên, Tần Vô Đạo đã đá văng ba đạo hộ thân trận bàn. Chàng cởi trần đứng trên mỏm đá nhọn, dùng da thịt trần đón đỡ từng tia sét. Mỗi đạo sét đánh xuống làm xương chàng gãy vụn, nhưng chàng dùng chính đao ý bất khuất ép từng tia sét nung chảy các tạp chất trong tủy sống. Đến đạo sét thứ tám mươi mốt, chàng gầm lên một tiếng, vung Hoang Cổ Trấn Ma Đao chém ngược lên trời, xé đôi đám mây lôi kiếp thành hai nửa, viên Kim Đan hoàng kim ngưng tụ rực rỡ như một mặt trời thứ hai.',
        associatedTreasureOrRealm: 'Lôi Đao Nhai Di Tích • Thái Cổ Canh Kim Lôi Trì & Hoang Cổ Kim Đan',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm Canh Kim Thối Cốt: Sát khí lôi đình sắc bén như hàng vạn mũi dao cạo gọt tủy sống; nếu người tu có một tia dao động sợ hãi cái chết thì toàn bộ kinh mạch sẽ bị sát khí chém nát thành tro bụi.',
        immortalTreeConnection:
          'Nhựa sống Cây Trường Sinh ngấm trong chuôi đao đã kịp thời giải phóng sinh khí mộc nguyên thanh khiết, trung hòa sát khí cực đoan của Canh Kim Lôi, giúp chàng đạt tới cảnh giới "Cương Nhu Tịnh Tế" hoàn mỹ.',
        narrativePerspectiveSummary:
          'Kinh ngạc thán phục ý chí sắt đá và khí phách kiêu hùng ngút trời của người đệ tử chân truyền',
        historicalTruthVsRumor:
          'Người đời tưởng chàng sinh ra đã mang mệnh bất bại êm đềm. Chân tướng là mỗi tấc xương thịt của chàng đều được tôi luyện từ những đòn sét tử thần đau đớn đến tận cùng.',
        characterVividImpact:
          'Vết sẹo lôi hỏa hình lưỡi đao kéo dài từ bả vai trái xuống tận thắt lưng; thói quen dậm mạnh gót chân xuống đất tạo tiếng vang dội trước khi rút đao.',
        spokenDialogueDraft:
          'Lão phu tu đao sáu trăm năm, hộ kiếp cho không biết bao nhiêu thiên kiêu, kẻ nào thấy lôi kiếp cũng mặt cắt không còn hột máu! Duy chỉ có tiểu tử Tần Vô Đạo này làm lão phu vừa đứng tim vừa rơi nước mắt! Hắn đạp văng trận bàn hộ mệnh, đứng trần trùng trục giữa mỏm đá! Khi đạo sét thứ tám mươi mốt giáng xuống muốn đập nát đầu hắn, máu từ miệng hắn phun ra nhuộm đỏ cả vách đá, vậy mà hắn gầm lên cười sảng khoái: "Trời muốn diệt ta ư? Một đao này của ta chém cả trời!" Hắn vung đao chém ngược lên trời, chém tan nát lôi vân! Khoảnh khắc viên Kim Đan màu vàng rực rỡ bay ra, vạn thanh bảo đao của cả tông môn đồng loạt bay lên cắm quanh người hắn bái lạy... Lão phu biết, từ nay về sau đao đạo của nhân tộc đã có một vị Chiến Thần bất khả chiến bại!'
      },
      {
        id: 'ols_tvd_06',
        subplotTitle: 'Đột Phá Hóa Thần Bá Đao Cực Cảnh: Đốn Ngộ "Đao Dĩ Hộ Đạo" Dưới Nhánh Cây Trường Sinh Cổ',
        speakerType: 'TIEN_BOI_AN_THE',
        speakerNameAndRole: 'Bá Đao Tuyệt Khách (Đại Năng Ẩn Thế Ngàn Năm • Núi Côn Luân)',
        narrativeSetting: 'Bên gốc Cây Trường Sinh hóa thạch rêu phong cổ kính trên đỉnh Côn Luân, nhấp ngụm rượu đắng ngắm trời chiều',
        recountedEraOrEvent: 'Năm 150 tuổi • Biến cố độ kiếp phá quan Hóa Thần Cảnh Giới',
        breakthroughCultivationStage: 'Nguyên Anh Đỉnh Phong -> Hóa Thần Kỳ (Bá Đao Vô Ngã Chi Vực)',
        tribulationOrPhenomenon: 'Hỗn Độn Canh Kim Ma Kiếp Lôi & Vạn Dặm Bão Cát Hoàng Kim Bao Phủ Côn Luân Không Một Tiếng Động',
        breakthroughRealTruth:
          'Giang hồ loan truyền Tần Vô Đạo vì muốn đột phá Hóa Thần đã chém giết đồng đạo để cướp đoạt Hóa Thần Đan. Bá Đao Tuyệt Khách - người chứng kiến chàng bế quan suốt ba mươi năm trên đỉnh Côn Luân - lắc đầu cười: Chàng không dùng một viên đan dược nào, chàng ngồi xếp bằng dưới gốc Cây Trường Sinh hóa thạch, buông bỏ đao kiếm, ngày ngày ngắm nhìn những mầm cây non đâm chồi nảy lộc. Chàng nhận ra rằng: Đao thuật tối cao không phải là chém giết vô địch, mà là dùng đao để bảo hộ sự sống và hòa bình cho muôn loài. Ngày chàng đốn ngộ, lôi kiếp trên trời tự động tan biến thành những hạt mưa ánh kim tưới mát cho ngàn dặm cỏ cây cằn cỗi.',
        associatedTreasureOrRealm: 'Côn Luân Tiên Cảnh • Gốc Cây Trường Sinh Hóa Thạch & Bá Đao Đạo Quả',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Trảm Đoạn Vô Địch Chấp": Người tu Bá Đao phải tự tay chém vỡ ảo ảnh ngạo nghễ của chính mình trong thức hải; nếu không buông bỏ được hư danh bất bại sẽ bị đao ý tự cắn xé nát thần hồn.',
        immortalTreeConnection:
          'Gốc Cây Trường Sinh hóa thạch đã nở ra một đóa hoa xanh ngọc bích ngay trên chuôi đao của chàng trong ngày chàng đốn ngộ, đánh dấu sự hòa nhập giữa quy tắc sinh mệnh viễn cổ và Canh Kim Bá Đao Đạo.',
        narrativePerspectiveSummary:
          'Khâm phục sâu sắc sự chuyển hóa vĩ đại trong đạo tâm từ một đao khách hiếu sát trở thành một bậc thánh nhân hộ đạo',
        historicalTruthVsRumor:
          'Người đời chỉ biết đến một Tần Vô Đạo cuồng ngạo bách chiến bách thắng. Kỳ thực cảnh giới Hóa Thần của chàng là sự kết tinh của lòng trắc ẩn và sự bao dung vô lượng đối với sinh linh.',
        characterVividImpact:
          'Ánh mắt trầm tĩnh thâm sâu không còn sát khí bốc đồng thuở thiếu thời; nụ cười thanh thản khi nhẹ nhàng nâng một chiếc lá Cây Trường Sinh rụng xuống lòng bàn tay.',
        spokenDialogueDraft:
          'Lão phu ngồi bên gốc Cây Trường Sinh hóa thạch này ngàn năm, đã thấy hàng ngàn đao khách đến đây múa đao khoe khoang sức mạnh chém đứt núi sông... Ta đều đuổi đi hết! Duy chỉ có tiểu tử Tần Vô Đạo này khiến ta phải cúi đầu nể phục. Hắn ngồi bất động ba mươi năm, đao cắm xuống đất rỉ sét phủ đầy rêu phong. Đến một buổi chiều thu, khi một con chim sẻ non rơi từ cành cây thần xuống đất, hắn đưa hai bàn tay đầy vết sẹo nâng con chim sẻ lên, khẽ mỉm cười: "Đao của ta... từ nay về sau chỉ vung lên để bảo vệ sinh linh non nớt này mà thôi." Khoảnh khắc đó, trên người hắn không có sát khí ngút trời, nhưng cả bầu trời Côn Luân bỗng bừng sáng kim quang rực rỡ! Một đóa hoa Cây Trường Sinh nở bung ngay trên mũi đao của hắn... Ta biết, hắn đã bước vào cảnh giới Hóa Thần vô địch mà không cần vấy bẩn một giọt máu!'
      },
      {
        id: 'ols_tvd_07',
        subplotTitle: 'Đột Phá Độ Kiếp Chuẩn Đế: Một Đao Khai Thiên Phá Hắc Ma Lôi Bảo Vệ Tông Môn',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Tần Thiên Đao (Phụ Thân • Tông Chủ Vạn Kiếm Quy Tông)',
        narrativeSetting: 'Trên đỉnh tháp cao nhất của Vạn Kiếm Quy Tông, nhìn ra vệt nứt không gian còn rực sáng kim quang giữa trời',
        recountedEraOrEvent: 'Năm 290 tuổi • Trận Độ Kiếp Chuẩn Đế & Đại Chiến Vực Ngoại Ma Tộc',
        breakthroughCultivationStage: 'Hợp Thể Đỉnh Phong -> Độ Kiếp Chuẩn Đế (Hoang Cổ Bá Đao Thánh Tôn)',
        tribulationOrPhenomenon: 'Hắc Ma Lôi Kiếp Cửu Trọng Diệt Cảnh & Vạn Đao Đồng Minh Chấn Động Ba Mươi Sáu Châu',
        breakthroughRealTruth:
          'Ma giới rêu rao Tần Vô Đạo dùng bí thuật hy sinh tông môn để vượt qua lôi kiếp Chuẩn Đế. Phụ thân chàng - người đứng cạnh chàng lúc độ kiếp - nghẹn ngào thuật lại: Khi ma lôi diệt thế giáng xuống nhắm thẳng vào đại trận phòng hộ nơi trăm vạn đệ tử và phàm nhân đang ẩn nấp, phụ thân toan lấy thân mình che chở cho con trai. Nhưng Tần Vô Đạo đã đẩy phụ thân ra sau lưng, một mình bay vút lên đỉnh trời. Chàng gầm lên tiếng gầm lay động càn khôn, dung hợp Hoang Cổ Thánh Thể và mộc nguyên Cây Trường Sinh, vung ra nhát đao mạnh nhất trong lịch sử: "Khai Thiên Bá Đao"! Nhát đao chém đứt chín đạo hắc ma lôi, xé toạc màn đêm đen đặc đưa ánh bình minh trở lại với đất trời.',
        associatedTreasureOrRealm: 'Vạn Kiếm Quy Tông Đỉnh Trời • Hoang Cổ Bá Đao & Trái Tim Thần Mộc',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Tâm Dữ Đao Đồng Nhất": Khi độ kiếp Chuẩn Đế, người tu phải hòa tan toàn bộ nhục thân và linh hồn vào thanh đao; nếu tâm có một tia tư lợi thì đao sẽ gãy và linh hồn sẽ tiêu tán vĩnh viễn.',
        immortalTreeConnection:
          'Chuôi đao Cây Trường Sinh đã phóng thích dòng sinh mệnh lực thuần khiết nhất, tái tạo nhục thân cho chàng ngay trong cơn bão sét, giúp chàng bước lên ngôi vị Chuẩn Đế với thể chất bất tử bất diệt.',
        narrativePerspectiveSummary:
          'Người cha tự hào trào dâng nước mắt, khẳng định nhi tử đã vượt xa tiền nhân và trở thành cột trụ vững chắc nhất của nhân tộc',
        historicalTruthVsRumor:
          'Kẻ thù sợ hãi gọi chàng là Đao Ma cuồng bạo. Kỳ thực nhát đao xé trời của chàng là biểu tượng cao quý nhất của tinh thần xả thân vì tông môn và gia đình.',
        characterVividImpact:
          'Vết sẹo lôi hỏa rực sáng vàng kim sau lưng hình đôi cánh phượng hoàng; nụ cười rạng rỡ quay lại vái chào phụ thân trước khi đón nhận ánh hào quang Chuẩn Đế.',
        spokenDialogueDraft:
          'Cả đời làm cha của ta chưa bao giờ thấy cảnh tượng nào hùng vĩ và bi tráng như đêm hôm ấy! Ma lôi đen ngòm to như dãy núi đổ ụp xuống đầu Vạn Kiếm Quy Tông, ta đã chuẩn bị sẵn sàng tự bạo nguyên thần để che chở cho tông môn. Nhưng Vô Đạo... đứa con trai bướng bỉnh của ta đã một tay đẩy ta ra sau lưng! Nó nhìn ta cười, giọng vang dội như chuông đồng: "Phụ thân! Người đã bảo vệ con ba trăm năm rồi, hôm nay để con bảo vệ người và tông môn!" Rồi nó một mình cầm đao lao thẳng vào tâm bão sấm sét! Nhát đao ấy... trời đất ơi, nhát đao ấy xé toạc màn đêm dài ngàn dặm, chém tan nát chín đạo hắc ma lôi! Khi ánh sáng vàng rực rỡ buông xuống, nó đứng trên mây, áo choàng đỏ tung bay trong gió, quay lại chắp tay vái chào ta... Ta đứng nhìn con trai mình bước lên hàng Chuẩn Đế mà nước mắt tuôn rơi ròng ròng!'
      }
    ]
  },
  {
    characterId: 'char_huyet_cot_ma_ton',
    characterName: 'Huyết Cốt Ma Tôn',
    characterAlias: 'Tiêu Diệt Thiên / Vạn Thi Lão Tổ / Cửu U Huyết Đế',
    overviewPhilosophy:
      'Thiên địa bất nhân dĩ vạn vật vi sô cẩu. Thế gian đã coi ta là ma, ta liền lấy máu nhuộm đỏ cả vạn dặm càn khôn này để rửa sạch nỗi oan khiên ngàn năm!',
    lifeDestinyVow:
      'Huyết tế thập đại tông môn ngụy quân tử, chiếm đoạt trái tim Cây Trường Sinh hóa thành Hắc Ám Ma Mộc, ngự trị tối cao trên cửu trùng thiên địa.',
    relations: [
      {
        id: 'rel_hcmt_01',
        category: 'GIA_TOC',
        targetName: 'Tiêu Nhược Lan',
        targetRoleOrTitle: 'Tiểu Muội Đã Mất Thuở Hàn Vi',
        intimacyLevel: 99,
        status: 'Đã Tọa Hóa / Bỏ Mạng',
        originStory:
          'Ngàn năm trước, khi Tiêu gia bị vu oan tàng trữ tà vật, tiểu muội vì che giấu cho hắn mà bị chính đạo trưởng lão một chưởng đánh chết trước mắt hắn.',
        currentDynamics:
          'Mỗi đêm trăng tròn, Ma Tôn đều đứng cô độc trên đỉnh Ma Cung, vuốt ve mảnh ngọc bội vỡ hình hoa sen dính máu của nàng.',
        karmicTies: 'Chấp niệm sâu sắc nhất trần đời, ranh giới duy nhất ngăn hắn không biến thành một cỗ máy cuồng sát vô tri.'
      },
      {
        id: 'rel_hcmt_02',
        category: 'TONG_MON',
        targetName: 'Thiên Đạo Minh Cổ Tông Chủ',
        targetRoleOrTitle: 'Cố Sư Tôn Đã Phản Bội & Đoạt Tủy',
        intimacyLevel: -100,
        status: 'Bị Giam Cầm / Phong Ấn',
        originStory:
          'Kẻ từng là ân sư mà hắn hết mực kính trọng, lại chính là người tự tay mổ xẻ lấy đi Thiên Sinh Chí Tôn Cốt của hắn rồi đẩy hắn xuống Vạn Trượng Huyết Uyên.',
        currentDynamics:
          'Đã bị Ma Tôn lột da rút gân, giam cầm tàn hồn trong Cửu Sát Huyết Hồn Tràng chịu cực hình thiêu đốt ngàn năm.',
        karmicTies: 'Nguồn cơn của mọi hận thù; biến thiếu niên chính đạo thành đệ nhất ma đầu chấn động cổ kim.'
      },
      {
        id: 'rel_hcmt_03',
        category: 'KE_THU',
        targetName: 'Lâm Tiêu',
        targetRoleOrTitle: 'Cửu U Kiếm Tiên / Khí Vận Chi Tử',
        intimacyLevel: -90,
        status: 'Còn Sống',
        originStory:
          'Lâm Tiêu sở hữu Thái Sơ Hỗn Độn Kiếm Ý và ánh sáng nguyên bản của Cây Trường Sinh, chính là khắc tinh tuyệt đối của Huyết Ma Thể.',
        currentDynamics:
          'Liên tục bố trí sát cục, phái ma tướng truy sát nhưng luôn bị Lâm Tiêu phá giải và nghịch chuyển cơ duyên.',
        karmicTies: 'Trận chiến định mệnh quyết định số phận sinh tử của nhân tộc và ma vực.'
      },
      {
        id: 'rel_hcmt_04',
        category: 'DE_TU',
        targetName: 'Huyết Sát Ma Tướng',
        targetRoleOrTitle: 'Đệ Nhất Cận Vệ & Hộ Pháp Cửu U',
        intimacyLevel: 85,
        status: 'Còn Sống',
        originStory:
          'Từng là một tán tu bị chính đạo truy cùng đuổi tận, được Ma Tôn cứu thoát từ lò luyện đan và ban cho bí pháp Huyết Ảnh.',
        currentDynamics:
          'Chấp chưởng mười vạn ma binh Cửu Sát Cung, sẵn sàng xả thân ngăn cản kiếm quang của Lâm Tiêu.',
        karmicTies: 'Cánh tay đắc lực phụ trách các cuộc hành quyết và huyết tế tế đàn.'
      }
    ],
    milestones: [
      {
        id: 'ms_hcmt_01',
        timeAnchor: 'Năm 22 tuổi',
        title: 'Bị Đoạt Chí Tôn Cốt & Đọa Lạc Vạn Trượng Huyết Uyên',
        type: 'BUOC_NGOAT_THAY_DOI',
        location: 'Đoạn Thiên Nhai • Vạn Thi Ma Uyên',
        involvedCharacters: ['Thiên Đạo Minh Cổ Tông Chủ', 'Tiêu Nhược Lan'],
        description: 'Bị sư môn phản bội mổ cướp cốt tủy, gia tộc bị diệt môn, thân tàn ma dại rơi xuống đáy vực sâu ngàn trượng nơi rễ Ma Mộc ngự trị.',
        cultivationStateBeforeAndAfter: 'Thiên Kiêu Trúc Cơ Đỉnh Phong -> Kinh mạch đứt đoạn, rơi vào bờ vực tử vong',
        psychologicalTransformation: 'Đạo tâm chính nghĩa hoàn toàn sụp đổ, sinh ra nỗi oán hận thấu tận cửu u đối với trời đất và thế gian đạo mạo.',
        karmicEcho: 'Khai sinh ra ma đầu kinh hoàng nhất trong lịch sử tu tiên giới.',
        novelSnippetDraft:
          'Dưới đáy Vạn Thi Huyết Uyên tăm tối không một tia sáng, thiếu niên họ Tiêu nằm thoi thóp giữa đống xương trắng rợn người, lồng ngực toác ra một lỗ hổng đẫm máu nơi chí tôn cốt từng ngự trị. Hắn cắn chặt môi đến bật máu tươi, hai mắt rực lên ngọn lửa oán hận điên cuồng: "Trời cao không có mắt! Chính đạo các ngươi đạo mạo gian tà... Nếu ta không chết, kiếp này ta thề sẽ dùng biển máu này dìm chết toàn bộ tông môn các ngươi!" Đột nhiên, từ trong lòng đất sâu, một nhánh rễ cây đen ngòm tỏa ra mùi hương ma quái quấn chặt lấy ngực hắn, đâm thẳng vào tim...'
      },
      {
        id: 'ms_hcmt_02',
        timeAnchor: 'Năm 180 tuổi',
        title: 'Hóa Thần Ma Kiếp: Thôn Phệ Vạn Thi & Huyết Mộc Trùng Sinh',
        type: 'TU_LUYEN',
        location: 'Vạn Thi Huyết Uyên • Hắc Ám Thần Mộc Chi Nhai',
        involvedCharacters: ['Huyết Sát Ma Tướng'],
        description: 'Dung hợp rễ đen Ma Mộc, ngưng kết Cửu U Huyết Thể Hóa Thần, một chưởng xé toạc phong ấn ma uyên trở lại nhân gian.',
        cultivationStateBeforeAndAfter: 'Nguyên Anh Hậu Kỳ -> Hóa Thần Sơ Kỳ (Cửu U Huyết Ma Thể)',
        psychologicalTransformation: 'Xem sinh mạng nhân gian như cỏ rác, hoàn toàn thoát ly khỏi nhân tính phàm tục, chỉ còn lại ý niệm báo thù và thống trị.',
        karmicEcho: 'Bắt đầu thời kỳ Hắc Ám Huyết Triều kéo dài ba trăm năm kinh hoàng.',
        novelSnippetDraft:
          'Hắc lôi xé rách vòm trời ma uyên suốt bảy bảy bốn mươi chín ngày đêm. Giữa biển máu sôi sùng sục, một bóng người gầy guộc rách rưới bay vút lên không trung. Xung quanh hắn, chín con rồng máu khổng lồ gầm thét quấn quanh thân thể bằng xương trắng ma quái. Hắn giơ bàn tay đen nhánh chỉ lên trời, cười the the rợn tóc gáy: "Hóa Thần thì đã sao? Trời phạt ta thì ta nghịch trời! Trăm năm nếm mật nằm gai dưới đáy vực sâu này, hôm nay Tiêu Diệt Thiên ta trở lại đòi nợ máu!"'
      },
      {
        id: 'ms_hcmt_03',
        timeAnchor: 'Năm 800 tuổi',
        title: 'Độ Kiếp Luyện Hư Kỳ: Hóa Thân Ba Vạn Sáu Ngàn Huyết Tích Diệt Tam Đại Thái Thượng',
        type: 'TU_LUYEN',
        location: 'Trung Châu • Đoạn Ma Bình Nguyên',
        involvedCharacters: ['Cổ Tông Chủ Cũ', 'Tam Đại Thái Thượng Trưởng Lão'],
        description: 'Vượt qua Luyện Hư Thiên Kiếp giữa trận vây khốn của chính đạo, dùng bí thuật phân thân huyết hải đồ sát sạch kẻ thù năm xưa.',
        cultivationStateBeforeAndAfter: 'Hóa Thần Đỉnh Phong -> Luyện Hư Sơ Kỳ (Vạn Hồn Bất Diệt)',
        psychologicalTransformation: 'Trả xong huyết cừu cá nhân, bắt đầu mưu toan lớn hơn: nghịch chuyển quy tắc của Cây Trường Sinh để đạt cảnh giới Bất Hủ Vĩnh Hằng.',
        karmicEcho: 'Tiêu diệt hoàn toàn cự đầu tông môn cũ, thành lập U Minh Huyết Hải Giáo xưng bá một phương.',
        novelSnippetDraft:
          'Trên bình nguyên Đoạn Ma, tam đại cường giả Luyện Hư đồng loạt xuất thủ hòng trấn sát Ma Tôn dưới lôi kiếp. Nhưng giữa lúc lôi đình hủy diệt giáng xuống, Ma Tôn bỗng nhiên nổ tung thành ba vạn sáu ngàn giọt máu đỏ tươi! Mỗi giọt máu biến thành một ma ảnh dữ tợn xuyên thủng đan điền của các đại tu sĩ. Tiếng thét xé lòng vang vọng khắp mười dặm, khi giọt máu cuối cùng ngưng tụ lại trên hư không, Ma Tôn mặc hắc bào đứng ngạo nghễ, dưới chân là ba bộ hài cốt khô héo của những kẻ từng định đoạt số phận hắn ngàn năm trước.'
      }
    ],
    geographicAtlas: [
      {
        id: 'geo_hcmt_01',
        name: 'Vạn Thi Huyết Uyên Cửu U Ma Điện',
        type: 'BI_CANH_DONG_THIEN',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Ngàn năm tu luyện phục thù',
        realmOrRegion: 'Nam Hoang Cực Âm Ma Cực',
        terrainAndAura: 'Biển máu vô tận bốc mùi tanh tưởi, xương cốt trôi dạt như cù lao, sấm sét màu máu rạch ngang trời tối tăm mù mịt.',
        requiredTasksOrTrials: 'Luyện hóa vạn hồn ma khí, phong ấn tàn hồn kẻ thù vào cột tế ma, tôi luyện Ma Đao.',
        conquestOrLegacy: 'Đại bản doanh bất khả xâm phạm của U Minh Giáo, nơi chôn vùi hàng vạn anh hùng chính đạo.'
      },
      {
        id: 'geo_hcmt_02',
        name: 'Hắc Ngục Thần Mộc Ma Nhai',
        type: 'BI_CANH_DONG_THIEN',
        status: 'DANG_TRAI_QUA',
        chronologicalStage: 'Hiện tại • Giai đoạn chuẩn bị Đại Tế Huyết Trận',
        realmOrRegion: 'Đáy sâu vết nứt không gian Côn Luân',
        terrainAndAura: 'Nhánh rễ sâu nhất của Cây Trường Sinh bị ma khí ngàn năm xâm thực biến thành màu tím đen ma quái, tiết ra mủ độc sinh mệnh rực lửa.',
        requiredTasksOrTrials: 'Dùng máu của mười vạn sinh linh tưới vào rễ ma mộc để kích thích quả Huyết Thần Mộc chín muồi.',
        conquestOrLegacy: 'Tâm điểm của cuộc chiến quyết định vận mệnh tam giới giữa phe Chính - Ma.'
      }
    ],
    questTrialRecords: [
      {
        id: 'qtr_hcmt_01',
        category: 'VAO_BI_CANH',
        title: 'Bí Cảnh Huyết Tế: Đoạt Lấy Cành Thần Mộc Hóa Ma Từ Cổ Tiên Di Tích',
        stageTimeAnchor: 'Năm 350 tuổi',
        locationName: 'Thái Cổ Tiên Ma Chiến Trường',
        dangerAndDifficulty: 'Thập Tử Vô Sinh SSS',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Huyết Uyên Ma Linh Dẫn Dụ',
        keyObjectives: [
          'Vượt qua chín tầng cấm chế kiếm trận viễn cổ',
          'Đoạt lấy đoạn Cành Thần Mộc nhiễm máu Thần Ma hóa thạch',
          'Tẩy trừ kiếm ý phong ấn bằng máu của trăm tu sĩ Nguyên Anh'
        ],
        rewardsOrBreakthroughs: 'Thu được cành Cây Trường Sinh biến dị đúc thành cán Vạn Hồn Tế Ma Đao, thực lực tăng vọt gấp năm lần.',
        trialEncounters: 'Giao chiến ác liệt với tàn hồn Tiên Tôn thủ hộ; bị kiếm khí thuần dương thiêu cháy nửa thân thể.',
        narrativeJournalSnippet:
          'Dưới cấm chế Tiên Ma nghìn trượng, nửa thân thể Ma Tôn đã bị tiên quang thiêu cháy lộ cả xương sườn trắng hếu. Hắn nghiến răng ken két, dùng bàn tay bốc khói chộp chặt lấy cành cây cổ thụ đen ngòm, điên cuồng gầm lên: "Tiên đạo muốn diệt ta, Ma đạo muốn nuốt ta! Vậy ta sẽ biến Cây Trường Sinh này thành Ma Thụ của riêng ta!"'
      }
    ],
    karmicInheritances: [
      {
        id: 'ki_hcmt_01',
        name: 'Vạn Hồn Tế Ma Đao & Cửu Sát Huyết Hồn Tràng',
        type: 'THAN_BINH_BAN_MENH',
        acquisitionMilestone: 'Năm 350 tuổi • Cổ Tiên Di Tích',
        rankOrGrade: 'Thượng Cổ Ma Binh Cực Phẩm',
        awakeningStage: 'Tầng 9/9 Phong Ấn',
        soulBondStatus: 'Tâm Huyết Tương Liên',
        specialAbilities: [
          'Vạn Oán Xâm Hồn: Mỗi nhát đao chém ra mang theo tiếng khóc than của mười vạn oan hồn',
          'Huyết Tinh Đoạt Mệnh: Hút cạn tinh huyết đối phương trong chớp mắt',
          'Đoạn Thần Trảm Niệm: Làm đứt đoạn thần niệm và pháp thuật của đối thủ'
        ],
        karmicCostOrBacklash: 'Mỗi đêm trăng rằm, mười vạn oán hồn sẽ cắn xé thức hải đòi máu; nếu không có huyết tế sẽ bị phản phệ nổ tung đan điền.',
        novelLoreSnippet:
          'Thanh Ma Đao tỏa ra hắc khí ngùn ngụt, chuôi đao uốn từ cành Thần Mộc hóa ma rỉ máu tanh nồng. Khi Ma Tôn vung đao, trời đất tối sầm, tiếng quỷ khóc thần gào xé nát cửu trùng thiên địa.'
      },
      {
        id: 'ki_hcmt_02',
        name: 'Ma Hóa Thần Mộc Huyết Hạch',
        type: 'DAN_DUOC_THIEN_TAI',
        acquisitionMilestone: 'Năm 800 tuổi • Ma Uyên Đáy Sâu',
        rankOrGrade: 'Cấm Kỵ Nghịch Thiên Dị Bảo',
        awakeningStage: 'Hoàn Toàn Dung Hợp',
        soulBondStatus: 'Hợp Nhất Đạo Thân',
        specialAbilities: [
          'Sinh Mệnh Bất Diệt: Chỉ cần một giọt máu còn vương trên rễ ma mộc là có thể niết bàn trùng sinh',
          'Huyết Khí Vô Biên: Cung cấp sinh mệnh lực bất tận trong đại chiến'
        ],
        karmicCostOrBacklash: 'Kỵ tuyệt đối với Hỗn Độn Kiếm Ý và ánh sáng mặt trời chí dương của Cây Trường Sinh nguyên sơ.',
        novelLoreSnippet:
          'Quả tim Ma Tôn đập thình thịch giữa lồng ngực bằng xương trắng, bao bọc bởi hàng ngàn rễ cây ma mộc tí hon màu tím sẫm, liên tục bơm máu đen nuôi sống nhục thân bất tử.'
      }
    ],
    nemesisFeuds: [
      {
        id: 'nf_hcmt_01',
        nemesisName: 'Lâm Tiêu',
        nemesisFactionAndRank: 'Thái Hư Kiếm Tông • Khí Vận Chi Tử',
        feudOriginCause: 'Lâm Tiêu mang Thái Sơ Hỗn Độn Kiếm Thể, là khắc tinh tuyệt đối có thể chém đứt rễ Ma Thụ và tiêu diệt hạt nhân bất tử.',
        feudSeverity: 'Không Đội Trời Chung',
        status: 'Chờ Ngày Quyết Đấu',
        pastClashes: 'Nhiều lần va chạm tại Bí Cảnh Đoạn Hồn Nhai và Côn Luân Tiên Uyên.',
        destinedDuelCondition: 'Trận chiến sinh tử tối hậu tại chân Cây Trường Sinh Thần Cổ',
        feudResolutionReward: 'Thôn phệ Hỗn Độn Linh Căn để bước lên Đại Thừa Cảnh Giới',
        duelSnippetDraft:
          'Huyết Cốt Ma Tôn đứng trên đài sen máu, hốc mắt rực quỷ hỏa nhìn xuống thiếu niên bạch y: "Lâm Tiêu! Thái Sơ Hỗn Độn Kiếm của ngươi có thể chém đứt núi sông, nhưng liệu có chém đứt được biển máu oan khiên của mười vạn sinh linh này không?"'
      },
      {
        id: 'nf_hcmt_02',
        nemesisName: 'Cổ Phong Đạo Nhân',
        nemesisFactionAndRank: 'Thái Hư Kiếm Tông • Hóa Thần Hậu Kỳ Ẩn Kiếm',
        feudOriginCause: 'Ba trăm năm trước tại Loạn Ma Đảo, Cổ Phong Đạo Nhân từng dùng một kiếm từ hồ lô rượu chém đứt ba cánh tay ma pháp của hắn, làm chậm tiến độ đột phá ba trăm năm.',
        feudSeverity: 'Huyết Hải Thâm Cừu',
        status: 'Chờ Ngày Quyết Đấu',
        pastClashes: 'Đại chiến Loạn Ma Đảo; vết sẹo kiếm quang thanh phong trên ngực áo chưa bao giờ lành.',
        destinedDuelCondition: 'Đại Chiến Thái Hư Kiếm Trủng',
        feudResolutionReward: 'San bằng Kiếm Trủng, dùng hồ lô rượu của Cổ Phong làm chén đựng máu',
        duelSnippetDraft:
          'Huyết Cốt Ma Tôn chạm tay vào vết sẹo dài trước ngực, nghiến răng ken két: "Lão già say họ Cổ! Ba trăm năm trước ngươi chém ta một kiếm, ba trăm năm sau ta sẽ lấy tro cốt Kiếm Tông làm phân bón cho Ma Mộc của ta!"'
      }
    ],
    daoHeartDemons: [
      {
        id: 'dhd_hcmt_01',
        demonName: 'Vết Thương Chí Tôn Cốt & Ánh Mắt Tuyệt Vọng Của Tiểu Muội',
        demonType: 'CHẤP_NIỆM_QUÁ_KHỨ',
        triggerStage: 'Mỗi khi ngửi thấy mùi hoa sen nở rộ hoặc nhìn thấy hài đồng ngây thơ trong các thị trấn chính đạo',
        innerDemonManifestation: 'Lồng ngực nhói đau như bị dao khắc tủy, hai mắt ứa máu đỏ ngầu, vừa cuồng bạo muốn tàn sát vừa rơi nước mắt tuyệt vọng.',
        daoResolutionMethod: 'Không thể hóa giải; biến thành nguồn sức mạnh hủy diệt đen tối nhất thề huyết tế chư thiên vạn giới.',
        daoDomainMastery: 'Cửu U Huyết Ma Lĩnh Vực 95%',
        breakthroughState: 'Đang Giằng Co Tâm Trí',
        enlightenmentSnippet:
          'Hắn nhận ra bản thân vĩnh viễn không thể quay lại làm thiếu niên thuần khiết năm xưa nữa. Nhưng nếu thế gian này bất công, hắn sẽ dùng biển máu này để rửa sạch mọi dối trá đạo mạo!'
      },
      {
        id: 'dhd_hcmt_02',
        demonName: 'Cơn Ác Mộng Cây Trường Sinh Tịnh Hóa',
        demonType: 'SINH_TỬ_KIẾP_SỐ',
        triggerStage: 'Tiếp xúc với kiếm khí Hỗn Độn hoặc linh thảo thuần dương Cực Phẩm',
        innerDemonManifestation: 'Nguyên thần run rẩy sợ hãi bị ánh sáng thanh khiết thiêu rụi toàn bộ ma tính, biến thành tro bụi hư vô.',
        daoResolutionMethod: 'Cố gắng dùng máu của mười vạn sinh linh để nhuộm đen hoàn toàn Cây Trường Sinh hòng dập tắt nỗi sợ.',
        daoDomainMastery: 'Ma Hóa Sinh Mệnh Đạo 88%',
        breakthroughState: 'Chưa Vượt Qua (Nguy Cơ Phản Phệ)',
        enlightenmentSnippet:
          'Kẻ mang ma tâm tột cùng lại chính là kẻ khát khao sự cứu rỗi và ánh sáng nhất.'
      }
    ],
    factionPowers: [
      {
        id: 'fp_hcmt_01',
        factionName: 'U Minh Huyết Hải Giáo & Cửu Sát Cung',
        characterTitleOrRole: 'Giáo Chủ Tối Cao / Vạn Ma Tôn Chủ',
        authorityLevel: 'Lãnh Tụ Tối Cao',
        controlledTerritory: 'Vạn Thi Huyết Uyên & Ba Mươi Tòa Ma Sơn Nam Hoang',
        alliedSubFactions: ['Vạn Độc Môn', 'Cốt Ma Tông', 'Âm Sát Các'],
        rivalFactionForces: 'Thái Hư Kiếm Tông, Vạn Kiếm Quy Tông, Côn Luân Tiên Minh',
        powerLegacyContribution: 'Xây dựng nên đại bản doanh bất khả xâm phạm của ma đạo, uy hiếp ba mươi sáu châu suốt ngàn năm.'
      }
    ],
    oralLoreSubplots: [
      {
        id: 'ols_hcmt_01',
        subplotTitle: 'Đêm Huyết Ma Hóa Thần & Vạn Trượng Rễ Cây Trường Sinh Hóa Đen Dưới Ma Uyên',
        speakerType: 'THUYET_THU_NHAN',
        speakerNameAndRole: 'Bạch Đầu Mù Thuyết Thư (Trà quán Tàn Dạ • Biên giới Ma Vực Côn Luân)',
        narrativeSetting: 'Trong quán trà rách nát ngập khói thuốc rơm ven vực sâu, bên ngoài gió rít như tiếng ma nữ khóc hờn',
        recountedEraOrEvent: 'Cách đây một ngàn năm • Đêm Tiêu Diệt Thiên thức tỉnh Ma Tôn Thể',
        breakthroughCultivationStage: 'Nguyên Anh Đỉnh Phong -> Hóa Thần Kỳ (Cửu U Ma Tôn Thể)',
        tribulationOrPhenomenon: 'Huyết Vũ Ba Mươi Ngày & Rễ Cây Thần Rỉ Mủ Tím Đen',
        breakthroughRealTruth:
          'Chính đạo sử sách ghi lại rằng Tiêu Diệt Thiên tẩu hỏa nhập ma do tu luyện tà pháp. Nhưng lão thuyết thư mù gõ quạt run lẩy bẩy kể: Đêm đó hắn bị vứt xác xuống đáy vực sau khi bị móc xương. Nhưng dưới đáy vực không phải là chốn vô sinh, mà là nơi rễ sâu nhất của Cây Trường Sinh ngự trị! Khi máu uất hận của hắn chạm vào rễ cây, mộc linh viễn cổ cảm ứng được nỗi oan khiên ngập trời, đã không giết hắn mà mở ra một khe nứt ma hóa. Hắn gào thét nuốt trọn giọt mủ đen đầu tiên của Cây Thần biến dị, từ một thiếu niên trói gà không chặt bước thẳng lên Hóa Thần cảnh giới giữa cơn mưa máu đỏ trời!',
        associatedTreasureOrRealm: 'Vạn Thi Huyết Uyên Đáy Vực • Gốc Rễ Hắc Ám Cây Trường Sinh',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret:
          'Khảo nghiệm "Tâm Đoạn Vạn Niệm": Để tiếp nhận mộc tủy hắc ám của Cây Trường Sinh, người độ kiếp phải tự tay bóp nát ký ức hạnh phúc nhất của đời mình; nếu còn vương vấn một tia ấm áp phàm trần sẽ bị ma hỏa thiêu thành tro rụi.',
        immortalTreeConnection:
          'Đây là nhánh rễ duy nhất của Cây Trường Sinh hấp thu sát khí của vạn cổ chiến trường, trở thành đối cực âm dương của cây thần trên thượng giới.',
        narrativePerspectiveSummary:
          'Vừa kinh hãi vừa thương cảm cho một thiên kiêu tuyệt đỉnh bị sự tàn nhẫn của chính đạo bức bách đọa lạc thành ma',
        historicalTruthVsRumor:
          'Thiên hạ đồn hắn là ác ma trời sinh khát máu. Sự thật là hắn được sinh ra từ chính bóng tối và lòng tham của những kẻ tự xưng là danh môn chính phái.',
        characterVividImpact:
          'Hốc mắt rỗng rực quỷ hỏa xanh; trên cổ tay luôn quấn dải lụa rách màu hồng phấn dính vệt máu khô của tiểu muội.',
        spokenDialogueDraft:
          'Các vị khách quan đừng vội run rẩy khi nghe thấy bốn chữ Huyết Cốt Ma Tôn... Lão già mù này năm xưa từng là thư đồng chép sử cho Thiên Đạo Minh. Đêm đó, chính mắt đôi mắt mù này nhìn thấy Tiêu Diệt Thiên bị mổ xẻ lấy đi Chí Tôn Cốt rồi ném xuống vực Đoạn Thiên! Máu hắn chảy thành suối róc rách ngấm sâu xuống mười vạn trượng đất... Các ngươi có biết dưới đáy vực ấy có gì không? Đó là nơi chùm rễ cổ xưa nhất của Cây Trường Sinh đang ngủ yên! Cây thần ngàn năm không động đậy, vậy mà đêm ấy run rẩy kịch liệt, một dòng mủ đen sì tanh tưởi rỉ ra từ vết nứt cổ mộc, quấn chặt lấy ngực đứa trẻ rách rưới ấy... Cơn mưa máu đổ xuống ba mươi sáu châu suốt một tháng ròng! Khi hắn đạp trên chín con rồng máu bay lên, hắn đã không còn là người nữa rồi... nhưng ai là kẻ đã đẩy hắn vào miệng ma thù đó chứ?!'
      },
      {
        id: 'ols_hcmt_02',
        subplotTitle: 'Vết Đao Rỉ Máu Năm Xưa: Nỗi Khiếp Sợ Của Vị Trưởng Lão Chính Đạo Sống Sót',
        speakerType: 'KE_THU_SONG_SOT',
        speakerNameAndRole: 'Huyền Âm Đạo Nhân (Cựu Trưởng Lão Thanh Vân Kiếm Phái • Cụt Hai Chân)',
        narrativeSetting: 'Trong mật thất u tối giăng đầy phù chú trấn tà, toàn thân run rẩy mỗi khi nhìn vào bóng tối',
        recountedEraOrEvent: 'Bảy trăm năm trước • Trận Huyết Tẩy Thanh Vân Môn Báo Thù',
        associatedTreasureOrRealm: 'Thanh Vân Phong Đại Điện • Vạn Hồn Tế Ma Đao',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret:
          'Lưỡi đao Ma Tôn rèn từ cành rễ Cây Trường Sinh hóa thạch có khả năng ghi nhớ oán niệm; mỗi vết chém sẽ khiến vết thương không bao giờ khép miệng suốt ngàn năm.',
        immortalTreeConnection:
          'Đao khí mang theo mùi hương tanh nồng của nhựa cây thần bị ma hóa, đối nghịch hoàn toàn với hương thanh khiết của hoa Cây Trường Sinh.',
        narrativePerspectiveSummary:
          'Sự hối hận muộn màng và nỗi ám ảnh tột cùng trước sức mạnh hủy diệt không thể ngăn cản của Ma Tôn',
        historicalTruthVsRumor:
          'Thanh Vân Môn rêu rao bị ma đạo tàn sát vô cớ; thực chất chính là môn phái năm xưa đã hùa theo âm mưu vu oan diệt tộc Tiêu thị.',
        characterVividImpact:
          'Dáng đi lơ lửng không chạm đất, vạt áo bào đen bay trong gió rỉ ra từng giọt máu tươi; bước chân đi tới đâu, thềm đá cẩm thạch hóa thành tro đen tới đó.',
        spokenDialogueDraft:
          'Đừng... đừng nhắc đến cái tên đó trước mặt ta! Bảy trăm năm rồi, hai cái ống chân cụt này của ta vẫn còn đau buốt mỗi khi trời trở lạnh! Các ngươi có biết thanh đao trong tay hắn trông như thế nào không? Nó không phải đao kim loại bình thường... Chuôi đao của hắn được uốn từ một cành cây gồ ghề đen nhánh, cành cây ấy cứ cựa quậy như có tim đập! Hắn đứng trước mặt chưởng môn sư huynh ta, không nói một lời oán trách, chỉ khẽ vung tay áo... Vụt một tiếng, một luồng hắc phong cuốn theo ngàn tiếng gào thét của oan hồn ập tới! Cả tòa đại điện ngàn năm biến thành bình địa trong chớp mắt! Hắn nhìn ta bằng đôi mắt rực quỷ hỏa xanh biếc, lạnh lùng nói: "Ta tha cho ngươi cái mạng này, để ngươi sống mà kể lại cho hậu thế nghe... giá phải trả khi đụng đến một sợi tóc của người Tiêu gia!"'
      },
      {
        id: 'ols_hcmt_03',
        subplotTitle: 'Mảnh Ngọc Bội Nứt Nẻ & Nước Mắt Ma Đầu Dưới Đêm Trăng Rằm',
        speakerType: 'PHUC_DU_THUONG_DAN',
        speakerNameAndRole: 'A Man (Lão Nô Già Quét Rác Điện Cửu U • Thoát Chết Nhờ Tín Vật Cũ)',
        narrativeSetting: 'Bên góc thềm đá phủ rêu xanh của Ma Cung, tay ôm chổi tre kể chuyện thì thầm',
        recountedEraOrEvent: 'Đêm Rằm Tháng Bảy ba mươi năm trước • Bí Mật Lặng Lẽ Của Ma Tôn',
        associatedTreasureOrRealm: 'Cửu U Ma Điện Hậu Hoa Viên • Ngọc Bội Hoa Sen Nứt',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret:
          'Dưới đáy Ma Điện có một mảnh đất nhỏ duy nhất không dính máu, nơi Ma Tôn chôn giấu chiếc yếm nhỏ và chuỗi ngọc bội của muội muội.',
        immortalTreeConnection:
          'Trên nấm mồ cô độc ấy, Ma Tôn đã dùng tinh huyết của mình nuôi dưỡng một nhánh hoa nhỏ mọc ra từ mầm non Cây Trường Sinh để mong nàng được luân hồi.',
        narrativePerspectiveSummary:
          'Góc nhìn đầy nhân tính và cảm động, hé lộ rằng sâu trong trái tim tàn ác nhất vẫn còn một góc khuất yêu thương chưa bao giờ nguội tắt',
        historicalTruthVsRumor:
          'Người đời nghĩ Ma Tôn là quỷ dữ không biết đau đớn hay rơi lệ; nhưng kẻ hầu già lại chứng kiến hắn quỳ gối khóc thầm trong đêm vắng.',
        characterVividImpact:
          'Bàn tay khô gầy run rẩy khi chạm vào mảnh ngọc vỡ; khóe môi mím chặt cố kìm nén tiếng nấc nghẹn giữa đêm khuya tịch mịch.',
        spokenDialogueDraft:
          'Lão già này sống được ở cái chốn địa ngục Cửu U này ba mươi năm qua, không phải nhờ võ công cái thế, mà là nhờ một chiếc ngọc bội rơm rác nhặt được ngoài bãi tha ma... Đêm hôm đó là rằm tháng bảy, Ma Tôn bộc phát cuồng loạn chém chết hàng chục thị vệ. Lão sợ quá ngã lăn ra đất, sợi dây chuyền trên cổ đứt phán, chiếc ngọc bội hoa sen vỡ đôi rơi ngay trước mũi hài thêu xà cốt của ngài. Ta cứ ngỡ mình tan xương nát thịt rồi... Nhưng không! Lưỡi đao bén ngót dừng lại cách trán ta chỉ nửa tấc! Ma Tôn sững sờ nhìn chiếc ngọc bội dưới đất. Bàn tay ngài run rẩy... đúng thế, bàn tay từng bóp nát đầu Luyện Hư đại tu sĩ lại run lẩy bẩy như đứa trẻ! Ngài nhặt miếng ngọc lên, khẽ thì thầm: "Nhược Lan... là muội sao? Muội về trách đại ca biến thành ma quỷ rồi phải không?" Đêm đó, ngài ngồi tựa lưng vào gốc cột đá suốt canh năm, từng giọt nước mắt đỏ quạch rỉ ra từ hốc mắt ngài rơi lã chã xuống mảnh ngọc vỡ... Hóa ra, Ma Tôn cũng biết đau lòng các ngươi ạ.'
      },
      {
        id: 'ols_hcmt_04',
        subplotTitle: 'Khí Linh Thức Tỉnh Kể Về Lần Ma Tôn Trảm Cành Thần Mộc & Bị Linh Hỏa Thiêu Thân',
        speakerType: 'KHI_LINH_THU_HO',
        speakerNameAndRole: 'U Minh Đao Linh (Khí Linh Của Vạn Hồn Tế Ma Đao)',
        narrativeSetting: 'Trong làn sương mù đỏ sẫm bên trong lõi không gian của thanh Ma Đao thượng cổ',
        recountedEraOrEvent: 'Năm trăm năm trước • Chuyến Đột Kích Thần Cổ Cấm Địa Tìm Cây Trường Sinh',
        associatedTreasureOrRealm: 'Côn Luân Tiên Giới Di Tích • Cây Trường Sinh Nguyên Bản',
        treasureLoreCategory: 'TRUYEN_THUA_CO_TIEN',
        treasureTrialSecret:
          'Khảo nghiệm "Thánh Diệt Tà Ma": Cây Trường Sinh nguyên sơ tỏa ra vạn trượng hào quang chí dương; bất kỳ ai mang tà niệm chạm vào sẽ bị hỏa thiêu đốt sạch kinh mạch từ trong ra ngoài.',
        immortalTreeConnection:
          'Ma Tôn toan chặt đứt thân Cây Trường Sinh để luyện hóa làm ma khí tối thượng, nhưng bị kiếm ý tổ phụ và linh quang của Cây Thần phản phệ thiêu rụi ba ngàn sợi tóc bạc.',
        narrativePerspectiveSummary:
          'Khí linh vừa khiếp đảm trước sự điên cuồng liều lĩnh của chủ nhân, vừa thừa nhận uy lực chí cao vô thượng của Cây Thần nguyên bản',
        historicalTruthVsRumor:
          'Ma giáo tung tin Ma Tôn đã chế ngự được Cây Trường Sinh; kỳ thực hắn suýt mất mạng và phải trốn chạy trong nhục nhã.',
        characterVividImpact:
          'Vết bỏng thánh quang vĩnh viễn trên nửa khuôn mặt Ma Tôn khiến hắn phải luôn dùng hắc bào che kín dung nhan.',
        spokenDialogueDraft:
          'Ta là linh hồn của lưỡi đao này, theo chủ nhân suốt năm trăm năm chinh chiến, uống máu vạn người... nhưng chưa bao giờ ta thấy ngài cận kề cái chết như ngày xông vào cấm địa Côn Luân! Lúc nhìn thấy Cây Trường Sinh sừng sững chọc trời, toàn thân rực sáng như vầng thái dương xanh biếc, chủ nhân đã gầm lên điên dại: "Cây thần cứu thế sao không cứu muội muội ta?! Để ta chém gãy ngươi!" Ngài vung ta lên, chém ra nhát đao mạnh nhất đời ngài! Nhưng ôi thôi... ngay khi mũi đao vừa chạm vào vỏ cây, một luồng kim quang thuần dương bộc phát như ngàn vạn mũi tên thánh! Ta gãy nát ba tấc, còn chủ nhân bị ngọn lửa thanh khiết thiêu đốt cháy rụi ba ngàn sợi tóc bạc, nửa khuôn mặt rụng từng mảng thịt! Ngài ngã quỵ xuống đất, ói ra ngụm máu đen, nhưng vẫn nghiến răng cười to: "Một ngày nào đó... ta sẽ mang máu của cả thế gian này về tưới ướt rễ ngươi, biến ngươi thành ma mộc của riêng ta!"'
      },
      {
        id: 'ols_hcmt_05',
        subplotTitle: 'Sinh Tử Giữa Vực Sâu: Tầm Bảo Gia Trốn Thoát Khỏi Huyết Ngục Ma Thụ',
        speakerType: 'TAM_BAO_GIA_BI_CANH',
        speakerNameAndRole: 'Lục Thất Đoạt Bảo (Thủ Lĩnh Phái Tầm Long Môn • Tán Tu Trung Châu)',
        narrativeSetting: 'Tại Chợ Đen Vô Pháp Thành, vừa đếm từng thỏi linh thạch vừa kể lại chuyến đi bão táp',
        recountedEraOrEvent: 'Năm năm trước • Nhiệm Vụ Đột Nhập Trộm Mủ Rễ Thần Mộc Biến Dị',
        associatedTreasureOrRealm: 'Đáy Sâu Hắc Ngục • Nhánh Rễ Ma Thụ Rỉ Mủ Tím',
        treasureLoreCategory: 'BI_CANH_DONG_THIEN',
        treasureTrialSecret:
          'Khu vực rễ ma mộc được bao bọc bởi "Mê Hồn Huyết Sương"; kẻ hít phải sẽ tự móc mắt xé tai vì ảo ảnh tội lỗi trong quá khứ.',
        immortalTreeConnection:
          'Mủ rễ cây bị ma hóa có thể dùng để kéo dài tuổi thọ cho ma tu thêm ngàn năm nhưng biến cơ thể thành nửa người nửa mộc quái dị.',
        narrativePerspectiveSummary:
          'Tán tu tham lam suýt bỏ mạng, cảnh báo hậu nhân không bao giờ được bén mảng đến vùng cấm địa của Ma Tôn',
        historicalTruthVsRumor:
          'Lời đồn đáy Huyết Uyên có tiên dược cải tử hoàn sinh; thực chất là bẫy rập nuôi dưỡng rễ cây ma quái của Ma Tôn.',
        characterVividImpact:
          'Ánh mắt quỷ dị của Ma Tôn nhìn xuyên qua màn sương máu như hai ngọn đèn dầu lay lắt giữa tha ma bãi địa.',
        spokenDialogueDraft:
          'Mười anh em đội Tầm Long của ta tiến vào khe nứt Côn Luân, chỉ có một mình ta bò ra ngoài được nhờ cái ngọc phù tổ truyền này! Các ngươi nghĩ ở đó có tiên thảo trường sinh sao? Toàn là dối trá! Dưới đó là một cái rễ cây khổng lồ to bằng cả quả núi, đen sì như than cháy, cắm ngập trong hồ máu tươi sôi ùng ục! Mỗi khi rễ cây thở, hồ máu lại dâng trào cuốn phăng xương thịt. Đột nhiên Ma Tôn từ trong thân cây bước ra, người ngài khô đét như xác ướp, rễ cây nhỏ đâm chi chít qua các đốt ngón tay ngài... Ngài chỉ liếc mắt nhìn bọn ta một cái, bảy huynh đệ của ta lập tức ôm đầu gào thét rồi tự tay bóp nát yết hầu của chính mình! Ta sợ vãi linh hồn nhảy bừa vào dòng dung nham mới sống sót... Đừng dại dột nghe lời dụ dỗ đi tìm Cây Trường Sinh dưới đáy vực đó, đó là cái bẫy của quỷ dữ!'
      },
      {
        id: 'ols_hcmt_06',
        subplotTitle: 'Đột Phá Hóa Thần Kỳ: Thôn Phệ Vạn Ma & Cửu Trọng Huyết Lôi Dưới Rễ Thần Mộc',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Huyết Sát Lão Ma (Đệ Nhất Hộ Pháp Ma Uyên)',
        narrativeSetting: 'Dưới chân tế đài ma lôi ngàn năm, nơi vách đá còn hằn sâu vết nứt hình tia chớp đỏ rực',
        recountedEraOrEvent: 'Tám trăm năm trước • Trận Độ Kiếp Hóa Thần Kinh Thiên Động Địa',
        breakthroughCultivationStage: 'Nguyên Anh Viên Mãn -> Hóa Thần Sơ Kỳ (Vạn Hồn Ma Thể)',
        tribulationOrPhenomenon: 'Huyết Lôi Cửu Trọng & Vạn Quỷ Khiếu Thiên Chấn Động Ma Uyên',
        breakthroughRealTruth:
          'Khác với lôi kiếp chính đạo cần thanh tịnh đốn ngộ, lôi kiếp Ma Tôn là sự va chạm tột cùng giữa oán khí nhân gian và thiên lôi hủy diệt. Ma Tôn không dùng trận pháp phòng hộ mà trực tiếp mở toang đan điền, dẫn sấm sét đỏ ngầu vào ngực nung cháy rễ ma mộc, ép sinh mệnh lực viễn cổ hòa làm một với hồn phách.',
        associatedTreasureOrRealm: 'Tế Đài Ma Uyên • Huyết Hạch Thần Mộc Tối Cổ',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Tâm Ma Thao Thiết": Người tu phải chịu đựng mười vạn ác quỷ xâu xé thần hồn trong bảy ngày; nếu tâm niệm dao động sẽ bị biến thành bãi phân ma.',
        immortalTreeConnection:
          'Chùm rễ Cây Trường Sinh hút trọn lôi kiếp dư thừa chuyển hóa thành hắc ám mộc dịch, ban cho Ma Tôn nhục thân kim cương ma cốt.',
        narrativePerspectiveSummary:
          'Lòng sùng kính tuyệt đối và cuồng tín của thuộc hạ ma đạo trước ý chí sinh tồn phi phàm của Ma Tôn',
        historicalTruthVsRumor:
          'Người đời bảo hắn nhờ cắn nuốt đồng bọn mà thăng cấp; thực chất hắn đã một mình gánh đỡ trọn vẹn sự phẫn nộ của Thiên Đạo bằng chính da thịt mình.',
        characterVividImpact:
          'Lồng ngực mở toang để lộ quả tim đỏ thẫm quấn rễ cây đang đập thình thịch; tiếng cười vang như sấm dội át cả sấm sét.',
        spokenDialogueDraft:
          'Lão phu đứng bảo hộ cho Giáo Chủ đêm ấy, cả đời này không bao giờ quên được cảnh tượng ấy! Chín đạo huyết lôi to như trụ trời giáng xuống đỉnh đầu Ma Điện, áp lực đè bẹp cả vách núi đá vạn năm. Giáo Chủ lúc đó toàn thân đẫm máu, kinh mạch nứt toác, nhưng ngài không hề lùi nửa bước! Ngài ngửa mặt lên trời cười vang như điên dại: "Đến đi! Thiên Đạo giáng sét diệt ta, chứng tỏ Thiên Đạo sợ ta!" Ngài dang hai tay, chủ động hút trọn chín đạo lôi đình vào lồng ngực. Rễ cây ma mộc từ trong tim ngài bung nở như những con rắn đen, nuốt chửng sấm sét rồi biến thành giáp trụ bao bọc lấy xương cốt ngài! Khi lôi vân tan đi, ngài đứng đó sừng sững như một ngọn ma sơn bất diệt... Khoảnh khắc ấy, lão phu và mười vạn ma binh quỳ rạp xuống đất, tôn xưng ngài là chúa tể duy nhất của Ma Giới!'
      },
      {
        id: 'ols_hcmt_07',
        subplotTitle: 'Đột Phá Luyện Hư Kỳ: Ba Vạn Sáu Ngàn Huyết Tích Trùng Sinh Qua Lôi Kiếp Diệt Hồn',
        speakerType: 'TIEN_BOI_AN_THE',
        speakerNameAndRole: 'Thiên Đạo Tàn Hồn (Bị Phong Ấn Trong Cửu Sát Huyết Hồn Tràng)',
        narrativeSetting: 'Trong ngọn lửa u minh lập lòe của cây tràng hạt hồn phách, giọng nói u uất thì thào vang vọng',
        recountedEraOrEvent: 'Bốn trăm năm trước • Trận Độ Kiếp Luyện Hư Cực Nguy',
        breakthroughCultivationStage: 'Hóa Thần Đỉnh Phong -> Luyện Hư Kỳ (Bất Hủ Huyết Thể)',
        tribulationOrPhenomenon: 'Hỗn Độn Diệt Thế Kiếp Lôi & Huyết Hải Trùng Sinh',
        breakthroughRealTruth:
          'Lôi kiếp Luyện Hư Kỳ của tà ma là kiếp nạn tuyệt diệt: Thiên Đạo muốn xóa sổ hoàn toàn dấu vết linh hồn. Nhưng Ma Tôn đã dung hợp bí pháp Cây Trường Sinh "Nhất Diệp Nhất Khô Vinh" (Một Lá Một Tái Sinh). Khi lôi kiếp xé nát nhục thân, hắn phân tán thành ba vạn sáu ngàn giọt máu ký sinh vào từng chiếc lá khô của Cây Thần; khi lôi kiếp đi qua, giọt máu cuối cùng tái tạo lại toàn bộ thần hồn và tu vi!',
        associatedTreasureOrRealm: 'Huyết Hải Chi Cực • Ba Vạn Sáu Ngàn Huyết Nhãn',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Tán Hồn Quy Nhất": Thần niệm phải kiểm soát đồng thời ba vạn sáu ngàn phân thân mà không bị phân liệt phát điên; một giọt máu mất kiểm soát là vĩnh viễn tàn phế.',
        immortalTreeConnection:
          'Quy tắc tái sinh vô tận của Cây Trường Sinh đã bị Ma Tôn giải mã và đảo ngược thành thần thông tà ác bậc nhất.',
        narrativePerspectiveSummary:
          'Kẻ thù ngàn năm dù hận thù nhưng cũng phải rùng mình thừa nhận tài trí nghịch thiên và sự quật cường đáng sợ của Ma Tôn',
        historicalTruthVsRumor:
          'Thiên hạ tưởng Ma Tôn đã chết dưới lôi kiếp Luyện Hư bốn trăm năm trước; thực tế hắn dùng cái chết giả để tái sinh với uy lực gấp mười lần.',
        characterVividImpact:
          'Từng giọt máu hội tụ thành hình người, ánh mắt lạnh như băng giá ngàn năm không một gợn sóng cảm xúc.',
        spokenDialogueDraft:
          'Ta là kẻ thù của hắn, ta bị hắn giam cầm tàn hồn trong chiếc tràng hạt này suốt bốn trăm năm chịu lửa thiêu đốt... Ta hận hắn thấu xương tủy! Nhưng hỏi ta có sợ hắn không? Ta sợ đến run rẩy cả linh hồn! Bốn trăm năm trước, khi Hỗn Độn Diệt Thế Lôi giáng xuống, nhục thân của hắn nổ tung thành tro bụi ngay trước mắt ta. Ta đã reo hò vui sướng, tưởng rằng trời cao cuối cùng đã diệt trừ tên ác ma này! Nhưng các ngươi có biết điều gì xảy ra tiếp theo không? Ba vạn sáu ngàn giọt máu của hắn không hề biến mất... Chúng bay lượn trên không trung như bầy đom đóm đỏ, mỗi giọt máu đều mang khuôn mặt lạnh lùng của hắn! Rồi từ hư không, một nhánh rễ Cây Trường Sinh vươn ra hút trọn bầy đom đóm ấy vào lòng. Khi ánh sáng xanh đen bùng nổ, hắn bước ra nguyên vẹn, bước chân hạ xuống rung chuyển cả tam giới... Ta biết, thế gian này không còn ai có thể giết chết hắn bằng sức mạnh thông thường được nữa rồi!'
      }
    ]
  },
  {
    characterId: 'char_co_phong_dao_nhan',
    characterName: 'Cổ Phong Đạo Nhân',
    characterAlias: 'Túy Tửu Kiếm Ông / Bất Hủ Ẩn Kiếm / Túy Kiếm Tiên Tôn',
    overviewPhilosophy:
      'Người say ý không say, kiếm xuất tựa cuồng phong. Hồng trần vạn dặm một bầu rượu, sinh tử càn khôn một kiếm tiêu!',
    lifeDestinyVow:
      'Thủ hộ Mầm Non Cây Trường Sinh tại Kiếm Trủng, tìm kiếm truyền nhân chân chính thừa kế Hỗn Độn Kiếm Đạo để bảo hộ nhân tộc trước ngày ma kiếp tái lâm.',
    relations: [
      {
        id: 'rel_cp_01',
        category: 'DE_TU',
        targetName: 'Lâm Tiêu',
        targetRoleOrTitle: 'Đồ Nhi Chân Truyền Đích Tử',
        intimacyLevel: 98,
        status: 'Còn Sống',
        originStory:
          'Nhìn thấy khí chất quật cường và linh căn Hỗn Độn của Lâm Tiêu khi thiếu niên này quét lá tại Kiếm Trủng, nhận ra đây là người hữu duyên ngàn năm chờ đợi.',
        currentDynamics:
          'Bên ngoài giả vờ say khướt mắng mỏ, bên trong âm thầm truyền dạy Túy Tiên Kiếm Pháp và dùng đan dược tuyệt phẩm tẩy kinh phạt tủy cho đồ nhi.',
        karmicTies: 'Người hộ đạo vững chãi nhất của Lâm Tiêu trên con đường nghịch thiên cải mệnh.'
      },
      {
        id: 'rel_cp_02',
        category: 'TONG_MON',
        targetName: 'Thái Hư Chưởng Môn (Huyền Kiếm Chân Nhân)',
        targetRoleOrTitle: 'Sư Đệ Đương Nhiệm Chưởng Môn',
        intimacyLevel: 88,
        status: 'Còn Sống',
        originStory:
          'Cùng lớn lên dưới mái Thái Hư Tông, Cổ Phong từng nhường lại ngôi vị Chưởng Môn cho sư đệ để lui về Kiếm Trủng chuyên tâm ngộ đạo và thủ hộ cây thần.',
        currentDynamics:
          'Mỗi khi tông môn gặp nguy nan tày đình, Chưởng Môn đều phải kính cẩn bước vào Kiếm Trủng dâng lên vò rượu ngàn năm để xin ý kiến.',
        karmicTies: 'Cột trụ tinh thần và thanh kiếm trấn sơn vô hình của Thái Hư Tông.'
      },
      {
        id: 'rel_cp_03',
        category: 'VO_DAO_LU',
        targetName: 'Thanh Huyên Tiên Tử',
        targetRoleOrTitle: 'Đạo Lữ Đã Khuất Cách Đây Ba Trăm Năm',
        intimacyLevel: 99,
        status: 'Đã Tọa Hóa / Bỏ Mạng',
        originStory:
          'Trong trận đại chiến Loạn Ma Đảo, nàng đã lấy thân mình đỡ một đòn Ma Hồn Chưởng của Huyết Cốt Ma Tôn để bảo vệ Cổ Phong và mầm cây thần.',
        currentDynamics:
          'Cổ Phong uống rượu suốt ba trăm năm không phải vì nghiện rượu, mà để mượn men say gặp lại bóng hình nàng trong cõi mộng ảo.',
        karmicTies: 'Căn nguyên khiến ông không bao giờ chịu bước chân ra khỏi Thái Hư Kiếm Trủng.'
      },
      {
        id: 'rel_cp_04',
        category: 'KE_THU',
        targetName: 'Huyết Cốt Ma Tôn',
        targetRoleOrTitle: 'Cựu Địch Ngàn Năm',
        intimacyLevel: -99,
        status: 'Còn Sống',
        originStory:
          'Kẻ đầu sỏ gây ra thảm kịch Loạn Ma Đảo; từng bị Cổ Phong một kiếm chém đứt ba cánh tay ma pháp.',
        currentDynamics:
          'Luôn theo dõi mọi động tĩnh của Ma Giáo, biết trước ngày quyết chiến sinh tử sắp sửa diễn ra.',
        karmicTies: 'Trận kiếm chung cuộc sẽ kết thúc món nợ ba trăm năm.'
      }
    ],
    milestones: [
      {
        id: 'ms_cp_01',
        timeAnchor: 'Năm 16 tuổi',
        title: 'Túy Tửu Ngộ Kiếm: Một Đêm Sáng Tạo Túy Tiên Tam Thập Lục Thức',
        type: 'CO_DUYEN_KY_NGO',
        location: 'Thái Hư Hậu Sơn • Túy Tiên Nhai',
        involvedCharacters: ['Thanh Huyên Tiên Tử'],
        description: 'Uống cạn ba vò rượu bách thảo dưới trăng rằm, múa kiếm trên mép vực sâu, dung hợp tự nhiên phong lôi sáng tạo nên kiếm quyết độc nhất vô nhị.',
        cultivationStateBeforeAndAfter: 'Trúc Cơ Trung Kỳ -> Trúc Cơ Viên Mãn (Lĩnh ngộ Kiếm Ý Nhập Hóa)',
        psychologicalTransformation: 'Thoát khỏi sự gò bó của giáo điều môn quy, tìm ra bản ngã phóng khoáng tự do của kiếm đạo.',
        karmicEcho: 'Bắt đầu danh xưng Túy Tửu Kiếm Khách vang danh tứ hải.',
        novelSnippetDraft:
          'Đêm trăng tròn sáng vằng vặc trên đỉnh Túy Tiên Nhai, thiếu niên họ Cổ chân bước lảo đảo bên bờ vực thẳm ngàn trượng, tay cầm bầu rượu tu ừng ực. Hắn vứt vỏ bầu xuống vực, tiện tay bẻ một cành trúc khô vung lên giữa hư không! Gió núi bỗng ngừng thổi, mây trời bỗng ngưng trôi... Từng đường kiếm mềm mại như nước chảy mây trôi nhưng ẩn chứa sát lực xé rách càn khôn. Ba mươi sáu thức kiếm múa xong, vách đá dựng đứng sau lưng hắn đã hằn sâu ba mươi sáu câu thơ kiếm khí rực sáng suốt ngàn năm!'
      },
      {
        id: 'ms_cp_02',
        timeAnchor: 'Năm 260 tuổi',
        title: 'Đại Chiến Loạn Ma Đảo: Nhất Kiếm Đoạn Ma Hải & Thủ Hộ Mầm Thần Mộc',
        type: 'BUOC_NGOAT_THAY_DOI',
        location: 'Nam Hải • Loạn Ma Đảo Di Tích',
        involvedCharacters: ['Thanh Huyên Tiên Tử', 'Huyết Cốt Ma Tôn'],
        description: 'Một mình chặn đứng ba vạn ma đồ, chém đứt ba tay ma tướng của Ma Tôn, bảo vệ mầm non non nớt của Cây Trường Sinh đưa về Kiếm Trủng.',
        cultivationStateBeforeAndAfter: 'Nguyên Anh Viên Mãn -> Bước vào Hóa Thần Cảnh Giới',
        psychologicalTransformation: 'Đau đớn tột cùng khi mất đi thê tử, từ bỏ danh lợi hồng trần, lui về Kiếm Trủng làm kẻ gác cổng say xỉn.',
        karmicEcho: 'Bảo toàn được hạt giống sinh mệnh duy nhất của Cây Trường Sinh cho thế gian.',
        novelSnippetDraft:
          'Máu nhuộm đỏ ba ngàn dặm sóng biển Nam Hải. Cổ Phong ôm thi thể lạnh ngắt của Thanh Huyên trong lòng, nước mắt chảy ngược vào tim. Trước mặt hắn, ba vạn ma đồ gào thét bao vây như bầy kền kền đói. Hắn nhẹ nhàng đặt nàng xuống bên gốc mầm non xanh biếc của Cây Trường Sinh, rồi chậm rãi đứng dậy, rút thanh kiếm rỉ sét từ trong hồ lô rượu tím ra. Khoảnh khắc thanh kiếm rời vỏ, cả bầu trời sụp đổ trong một tiếng sấm rền! Một vệt kiếm quang màu xanh ngọc bích xé toạc biển khơi chia đôi hải vực làm hai nửa... Ba vạn ma đồ hóa thành tro bụi trong một nhịp thở!'
      },
      {
        id: 'ms_cp_03',
        timeAnchor: 'Năm 550 tuổi',
        title: 'Chỉ Điểm Lâm Tiêu: Khai Mở Hỗn Độn Kiếm Ý Đệ Tam Trọng',
        type: 'SU_MENH',
        location: 'Thái Hư Kiếm Trủng • Vấn Kiếm Thạch',
        involvedCharacters: ['Lâm Tiêu'],
        description: 'Dùng một chén rượu trắng và cành liễu khô đánh tan tâm ma của Lâm Tiêu, truyền thụ chân ý "Vô Kiếm Thắng Hữu Kiếm".',
        cultivationStateBeforeAndAfter: 'Hóa Thần Hậu Kỳ (Đạo Tâm Viên Mãn Phản Phác Quy Chân)',
        psychologicalTransformation: 'Tìm thấy người thừa kế xứng đáng, tâm nguyện ngàn năm được giải tỏa, sẵn sàng nghênh đón chung cuộc.',
        karmicEcho: 'Giúp Lâm Tiêu bước lên đỉnh phong Kiếm Đạo, chuẩn bị cho trận quyết chiến Ma Tôn.',
        novelSnippetDraft:
          'Lâm Tiêu quỳ trước bia đá Kiếm Trủng, tâm ma cuồng bạo làm run rẩy Cửu U Kiếm. Lão già say khướt ngáy khò khò trên tảng đá bỗng mở một con mắt lờ đờ, tiện tay búng một giọt rượu từ đầu ngón tay vào giữa trán thiếu niên. "Bốp!" một tiếng thanh thúy, toàn bộ kiếm khí cuồng bạo tan biến như bọt nước. Lão cười hì hì: "Tiểu tử ngốc! Kiếm không phải để khoe khoang sát khí, kiếm là để bảo vệ những gì ngươi trân quý nhất! Nhìn mầm cây nhỏ dưới chân ngươi xem... nó mềm yếu thế đấy, nhưng đá tảng ngàn cân cũng không cản nổi nó vươn lên đón nắng mai!"'
      }
    ],
    geographicAtlas: [
      {
        id: 'geo_cp_01',
        name: 'Thái Hư Kiếm Trủng Hậu Sơn',
        type: 'TONG_MON_THANH_DIA',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Ba trăm năm ẩn dật',
        realmOrRegion: 'Đông Vực Thái Hư Phong',
        terrainAndAura: 'Thung lũng ngập tràn vạn thanh kiếm cổ cắm trên đá rêu phong, kiếm khí ngưng kết thành sương mù mờ ảo, yên tĩnh tịch mịch.',
        requiredTasksOrTrials: 'Thủ hộ mầm non Cây Trường Sinh gieo dưới lòng đất, thanh lọc tà niệm cho đệ tử nhập môn.',
        conquestOrLegacy: 'Nơi tôn nghiêm nhất tông môn, cấm địa bất khả xâm phạm.'
      },
      {
        id: 'geo_cp_02',
        name: 'Loạn Ma Đảo Nam Hải Cổ Giới',
        type: 'BI_CANH_DONG_THIEN',
        status: 'DA_TRAI_QUA',
        chronologicalStage: 'Năm 260 tuổi • Thời kỳ hoàng kim kiếm đạo',
        realmOrRegion: 'Nam Hoang Vạn Đảo Hải Vực',
        terrainAndAura: 'Quần đảo chìm trong bão tố sấm sét và sương mù ma quái, đá ngầm sắc nhọn, đáy biển là di tích cổ mộ Thần Ma.',
        requiredTasksOrTrials: 'Trảm ma hộ đạo, phong ấn thông đạo Ma Uyên, đoạt mầm Cây Trường Sinh.',
        conquestOrLegacy: 'Để lại vệt kiếm trảm chia đôi biển khơi ngàn dặm vẫn còn lưu lại kiếm ý sau ba trăm năm.'
      }
    ],
    questTrialRecords: [
      {
        id: 'qtr_cp_01',
        category: 'NHIEM_VU',
        title: 'Cơ Mật Tuyệt Đỉnh: Cứu Viện Mầm Non Cây Trường Sinh Từ Huyết Uyên',
        stageTimeAnchor: 'Năm 258 tuổi',
        locationName: 'Nam Hải Loạn Ma Đảo',
        dangerAndDifficulty: 'Thập Tử Vô Sinh SSS',
        executionStatus: 'Đã Hoàn Thành',
        issuingAuthorityOrContext: 'Mật Lệnh Tổ Sư Khai Tông Thái Hư',
        keyObjectives: [
          'Đột nhập sào huyệt Ma Tôn đoạt lại hạt giống Cây Trường Sinh bị cướp',
          'Bảo toàn tính mạng cho đội ngũ hộ pháp Thái Hư',
          'Phong ấn lối ra U Minh Huyết Hải'
        ],
        rewardsOrBreakthroughs: 'Mang mầm cây thần về trồng tại Kiếm Trủng; đốn ngộ Hóa Thần Kiếm Ý.',
        trialEncounters: 'Trận chiến sinh tử với phân thân Luyện Hư của Huyết Cốt Ma Tôn; thê tử tử trận.',
        narrativeJournalSnippet:
          'Đêm ấy mưa máu rơi xối xả làm nhòe mắt ta. Nàng trút hơi thở cuối cùng trong vòng tay ta, chỉ khẽ bảo: "Phong ca... mang mầm cây này về... nhân gian cần ánh sáng của nó." Ta gật đầu, máu và nước mắt hòa vào hồ lô rượu, một kiếm chém tan màn đêm đen đặc!'
      }
    ],
    karmicInheritances: [
      {
        id: 'ki_cp_01',
        name: 'Dưỡng Linh Tửu Tiên Hồ & Bất Hủ Ẩn Kiếm',
        type: 'THAN_BINH_BAN_MENH',
        acquisitionMilestone: 'Năm 260 tuổi • Kiếm Trủng',
        rankOrGrade: 'Tiên Phẩm Cổ Khí Vô Thượng',
        awakeningStage: 'Tầng 9/9 Phong Ấn',
        soulBondStatus: 'Tâm Huyết Tương Liên',
        specialAbilities: [
          'Tửu Khí Trường Sinh: Rượu trong hồ không bao giờ cạn, trị lành vết thương đạo cơ',
          'Bất Hủ Kiếm Minh: Bộc phát kiếm quang trảm sát cự đầu Luyện Hư'
        ],
        karmicCostOrBacklash: 'Mỗi khi rút kiếm ra khỏi hồ lô, ký ức bi thương về người vợ đã khuất lại ùa về cắn xé tâm can.',
        novelLoreSnippet:
          'Chiếc hồ lô tím bóng loáng phát ra tiếng kiếm reo trầm hùng như tiếng rồng ngâm dưới đáy biển sâu, mỗi ngụm rượu rót ra hóa thành kiếm khí vô song.'
      },
      {
        id: 'ki_cp_02',
        name: 'Thần Mộc Chi Nha (Mầm Non Cây Trường Sinh Đang Lớn)',
        type: 'TRUYEN_THUA_CO_TIEN',
        acquisitionMilestone: 'Năm 260 tuổi • Loạn Ma Đảo',
        rankOrGrade: 'Thái Cổ Thần Vật Đệ Nhất',
        awakeningStage: 'Mầm Non Đang Lớn',
        soulBondStatus: 'Hợp Nhất Đạo Thân',
        specialAbilities: [
          'Mộc Khí Thanh Lạc: Tỏa ra sinh mệnh mộc khí thanh lọc ma chướng',
          'Ngộ Đạo Tốc Độ: Giúp toàn bộ đệ tử Kiếm Tông gia tăng tốc độ ngộ kiếm gấp mười lần'
        ],
        karmicCostOrBacklash: 'Mùi hương thần mộc thu hút sự thèm khát điên cuồng của toàn bộ ma đầu Ma Giới.',
        novelLoreSnippet:
          'Dưới đáy Kiếm Trủng sâu ba trượng, một mầm cây non xanh biếc tỏa ánh hào quang ngọc bích êm dịu, vươn chồi đón nhận từng giọt rượu thơm của lão kiếm tiên.'
      }
    ],
    nemesisFeuds: [
      {
        id: 'nf_cp_01',
        nemesisName: 'Huyết Cốt Ma Tôn',
        nemesisFactionAndRank: 'U Minh Huyết Hải Giáo • Luyện Hư Sơ Kỳ Lão Ma',
        feudOriginCause: 'Thù giết thê tử ba trăm năm trước và âm mưu tàn phá mầm non Cây Trường Sinh.',
        feudSeverity: 'Huyết Hải Thâm Cừu',
        status: 'Chờ Ngày Quyết Đấu',
        pastClashes: 'Đao kiếm tương phùng tại Loạn Ma Đảo; vết sẹo trên ngực áo chưa bao giờ lành.',
        destinedDuelCondition: 'Đại Chiến Côn Luân chung cuộc',
        feudResolutionReward: 'Dốc cạn chén rượu cuối cùng kết thúc món nợ ba trăm năm, đốn ngộ Vô Thượng Kiếm Đạo',
        duelSnippetDraft:
          'Cổ Phong Đạo Nhân tháo hồ lô rượu bên hông, ngửa cổ uống một hơi cạn sạch rồi ném vỡ tan tành trên đá: "Huyết Cốt! Món nợ Loạn Ma Đảo năm xưa, hôm nay lão già này dùng một mạng đổi một mạng với ngươi!"'
      }
    ],
    daoHeartDemons: [
      {
        id: 'dhd_cp_01',
        demonName: 'Nỗi Day Dứt Không Thể Cứu Sống Thê Tử',
        demonType: 'CHẤP_NIỆM_QUÁ_KHỨ',
        triggerStage: 'Mỗi khi ngửi thấy mùi hoa đào nở mùa xuân hoặc nhìn thấy đạo lữ trẻ tuổi bên nhau',
        innerDemonManifestation: 'Lặng lẽ ngồi tựa bia mộ vô danh uống rượu một mình từ chập tối đến rạng sáng, kiếm minh trong hồ lô run rẩy bi thương.',
        daoResolutionMethod: 'Hóa nỗi đau thành sức mạnh bảo hộ thế hệ trẻ và mầm non Cây Trường Sinh.',
        daoDomainMastery: 'Túy Tiên Tự Nhiên Kiếm Vực 95%',
        breakthroughState: 'Đã Đốn Ngộ Hoàn Toàn',
        enlightenmentSnippet:
          'Chết đi không phải là kết thúc; bảo vệ những người còn sống mới là cách tưởng nhớ nàng trọn vẹn nhất.'
      }
    ],
    factionPowers: [
      {
        id: 'fp_cp_01',
        factionName: 'Thái Hư Kiếm Tông',
        characterTitleOrRole: 'Thái Thượng Kiếm Tôn Thủ Hộ Giả',
        authorityLevel: 'Chấp Chưởng Trọng Quyền',
        controlledTerritory: 'Thái Hư Kiếm Trủng Hậu Sơn',
        alliedSubFactions: ['Vạn Kiếm Quy Tông', 'Dao Trì Tiên Cung'],
        rivalFactionForces: 'U Minh Huyết Hải Giáo, Cốt Ma Tông',
        powerLegacyContribution: 'Đích thân bình định Loạn Ma Đảo, khai sơn lập trận Kiếm Trủng bảo vệ nền móng tông môn ba trăm năm.'
      }
    ],
    oralLoreSubplots: [
      {
        id: 'ols_cp_01',
        subplotTitle: 'Đêm Thiếu Niên Say Rượu Ngộ Kiếm: Túy Tiên Nhất Thức Trảm Phong Đao',
        speakerType: 'CO_NHAN_HAN_VI',
        speakerNameAndRole: 'Lão Trương Đầu (Chưởng Quầy Quán Rượu Cố Hương Dưới Chân Thái Hư Phong)',
        narrativeSetting: 'Bên chiếc bàn gỗ thông lau sạch bóng, tay rót bát rượu nếp đục thơm lừng',
        recountedEraOrEvent: 'Năm trăm năm trước • Thuở Cổ Phong còn là đệ tử ngoại môn nghèo rớt mồng tơi',
        breakthroughCultivationStage: 'Trúc Cơ Sơ Kỳ -> Trúc Cơ Viên Mãn (Lĩnh ngộ Kiếm Ý Túy Tiên)',
        tribulationOrPhenomenon: 'Gió Núi Tụ Khí & Vệt Kiếm Khắc Ba Mươi Sáu Vần Thơ',
        breakthroughRealTruth:
          'Người đời nghĩ Cổ Phong sinh ra đã là kiếm tiên cái thế; chỉ có lão chưởng quầy biết thiếu niên năm ấy không có linh thạch mua đan dược, chỉ biết mua rượu cặn uống để quên đi sự khinh miệt của môn phái. Trong một đêm say túy lúy dưới trăng, hắn ngộ ra quy tắc vô vi của trời đất, dùng cành củi gãy đánh tan ba mươi tên thảo khấu cướp làng!',
        associatedTreasureOrRealm: 'Quán Rượu Dưới Chân Núi • Bầu Rượu Cũ Rách',
        treasureLoreCategory: 'GIAI_THOAI_CHUNG',
        treasureTrialSecret:
          'Túy Kiếm không có chiêu số cố định; người ngộ đạo phải buông bỏ mọi toan tính lý trí, để kiếm khí trôi theo bản năng tự nhiên thuần khiết nhất.',
        immortalTreeConnection:
          'Chính cành củi khô hắn nhặt ven suối năm ấy rơi xuống từ một nhánh Cây Trường Sinh trôi dạt từ thượng nguồn tiên cảnh.',
        narrativePerspectiveSummary:
          'Tình cảm mộc mạc ấm áp của người phàm phu chứng kiến sự trỗi dậy của một bậc chí tôn từ chốn hàn vi',
        historicalTruthVsRumor:
          'Tông môn ghi chép hắn bế quan ngộ đạo bảy năm; sự thật hắn chỉ uống rượu ba ngày ba đêm rồi đứng dậy vung kiếm thành tài.',
        characterVividImpact:
          'Nụ cười răng khểnh hào sảng thuở thiếu niên; dáng đi xiêu vẹo nhưng thanh kiếm tre chưa bao giờ chệch hướng nửa tấc.',
        spokenDialogueDraft:
          'Cái thằng nhóc Cổ Phong ấy à? Trời ơi, năm trăm năm trước nó nghèo rớt mồng tơi, toàn sang quán ta nợ rượu! Nó bảo: "Bác Trương, cho cháu chịu vò rượu bách thảo, sau này cháu thành kiếm tiên cháu đền bác bằng mười mâm vàng!" Ta mắng nó viển vông nhưng vẫn múc cho nó một bát đầy. Đêm hôm đó, lũ cướp núi tràn vào thôn đốt nhà giết người, làng xóm chạy tán loạn. Thằng nhóc ấy một tay ôm vò rượu, một tay cầm khúc củi thông cháy dở từ bếp lò của ta bước ra... Nó say lướt khướt, vừa ngâm thơ vừa múa khúc củi giữa trời đêm! Các ngươi có tin được không? Khúc củi thông bén lửa ấy vung ra những vệt sáng xanh biếc như rồng lượn, ba mươi tên cướp ngã rạp xuống đất rụng sạch vũ khí mà không chết một ai! Sáng hôm sau, trên vách đá đầu làng hằn sâu một bài thơ kiếm khí sáng rực... Từ đó, ta biết đứa trẻ say xỉn này chính là trích tiên giáng thế!'
      },
      {
        id: 'ols_cp_02',
        subplotTitle: 'Lão Say Quét Lá Kiếm Trủng & Nhát Kiếm Chẻ Đôi Thiên Thạch Cứu Tông Môn',
        speakerType: 'DONG_MON_DE_TU',
        speakerNameAndRole: 'Lý Tiểu Đao (Đệ Tử Trực Ban Tàng Thư Các Kiếm Trủng)',
        narrativeSetting: 'Bên đống lá rụng vàng rực trước cổng Kiếm Trủng, mắt tròn xoe thán phục',
        recountedEraOrEvent: 'Mười năm trước • Cơn Mưa Thiên Thạch Ngoại Vực Đột Kích',
        associatedTreasureOrRealm: 'Thái Hư Kiếm Trủng • Bia Đá Vấn Kiếm',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret:
          'Hồ lô rượu của Cổ Phong chính là trận nhãn phong ấn của cả Thái Hư Kiếm Trủng; chỉ cần mở nắp là vạn kiếm đồng minh.',
        immortalTreeConnection:
          'Mầm non Cây Trường Sinh dưới lòng đất Kiếm Trủng đã phóng ra sinh mệnh hộ trướng kết hợp với kiếm ý của Cổ Phong để tiêu trừ lôi hỏa thiên thạch.',
        narrativePerspectiveSummary:
          'Đệ tử trẻ tuổi bàng hoàng nhận ra kẻ ăn mày quét rác rách rưới hàng ngày lại chính là thần hộ mệnh tối cao của môn phái',
        historicalTruthVsRumor:
          'Toàn tông môn tung hô Chưởng Môn kích hoạt hộ tông đại trận; chỉ có tiểu đệ tử này biết chính lão say đã một kiếm cứu vớt vạn sinh linh.',
        characterVividImpact:
          'Mùi rượu nếp thơm nồng tỏa ra từ vạt áo vá chằng chịt; đôi mắt nhắm nghiền như ngủ say nhưng bàn tay vung chổi vững như bàn thạch.',
        spokenDialogueDraft:
          'Ta thề với trời đất, chuyện này mười năm trước chỉ có một mình ta nhìn thấy! Hôm đó ta bị phạt quét sân Kiếm Trủng, thấy lão Cổ Phong nằm ngáy khò khò trên tảng đá rêu, ruồi bâu quanh hồ lô rượu. Ta còn định lấy chổi đuổi ruồi cho lão... Đột nhiên, một quả thiên thạch khổng lồ bốc cháy rừng rực từ trên trời rơi thẳng xuống đầu ngọn núi chính Thái Hư! Cả tông môn gào thét kinh hoàng, các vị trưởng lão tuyệt vọng bay lên kích hoạt kết giới nhưng vỡ vụn như gương rơi. Ngay khoảnh khắc ngàn cân treo sợi tóc, lão già say khướt ấy bỗng khẽ tặc lưỡi: "Ồn ào quá, làm hỏng giấc ngủ trưa của ta..." Lão không thèm đứng dậy, chỉ tiện tay rút cái nút bấc của hồ lô rượu tím ra rồi búng nhẹ một cái! Vút! Một tia kiếm quang màu trắng mảnh như sợi tóc bay vút lên trời xanh! Các ngươi có tin được không? Quả thiên thạch to như ngọn núi bị chẻ đôi ngọt xớt thành hai nửa bay lệch sang hai bên vực sâu rồi nổ tung! Xong xuôi, lão đậy nút bấc lại, ngáy tiếp một hơi dài... Lúc đó ta quỳ sụp xuống đất, biết mình vừa được diện kiến Đệ Nhất Kiếm Tôn ẩn thế!'
      },
      {
        id: 'ols_cp_03',
        subplotTitle: 'Bảo Vệ Mầm Thần Mộc 300 Năm: Thần Thú Thanh Hạc Kể Chuyện Xưa',
        speakerType: 'KHI_LINH_THU_HO',
        speakerNameAndRole: 'Bạch Hạc Chân Nhân (Thần Thú Thanh Phong Linh Hạc Hóa Hình)',
        narrativeSetting: 'Trên cành thông cổ thụ ngàn năm vươn ra mép vực, ánh mắt thâm trầm nhìn mây trôi',
        recountedEraOrEvent: 'Ba trăm năm trước • Đêm Đưa Mầm Thần Mộc Về Kiếm Trủng',
        associatedTreasureOrRealm: 'Túy Tiên Thạch Dưới Lòng Đất • Mầm Non Cây Trường Sinh',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret:
          'Mầm Cây Trường Sinh cần được tưới bằng nước suối tinh khiết hòa với kiếm ý thuần chính không vướng sát khí; nếu có một tia tham lam mầm cây sẽ lập tức héo tàn.',
        immortalTreeConnection:
          'Cổ Phong đã dùng chính ba trăm năm tu vi và hơi ấm rượu nồng của mình để sưởi ấm cho mầm cây thần sống sót qua mùa đông ma kiếp.',
        narrativePerspectiveSummary:
          'Linh thú đồng hành cảm phục sự hy sinh thầm lặng và tấm lòng từ bi vô lượng của chủ nhân',
        historicalTruthVsRumor:
          'Thiên hạ đồn Cổ Phong chán đời điên loạn; sự thật ông giam mình dưới đáy Kiếm Trủng để âm thầm nuôi dưỡng hy vọng tái sinh duy nhất của nhân gian.',
        characterVividImpact:
          'Những sợi tóc bạc trắng phất phơ trong gió lạnh; bàn tay nâng niu mầm cây xanh bé nhỏ như nâng niu giọt máu của thê tử đã khuất.',
        spokenDialogueDraft:
          'Ta đã bay theo người suốt bốn trăm năm, từ thuở người còn là thiếu niên áo trắng tung hoành thiên hạ cho đến khi râu tóc bạc phơ... Đêm ba trăm năm trước sau khi Thanh Huyên cô nương nhắm mắt, người ôm mầm Cây Trường Sinh bé xíu chỉ bằng ngón tay út này bay về Kiếm Trủng. Người đào một cái hố sâu ba trượng dưới lòng đất, cẩn thận đặt mầm cây vào rồi nhỏ ba giọt máu từ đầu tim mình xuống tưới ướt rễ cây. Người thì thào: "Huyên nhi... nàng yên nghỉ đi. Ta sẽ ở lại đây, chừng nào cái mầm cây này chưa lớn thành đại thụ che chở cho nhân gian, Cổ Phong ta quyết không rời nửa bước!" Ba trăm năm qua, người giả vờ say xỉn cho thế gian chê cười, nhưng đêm nào người cũng ngồi thiền bên mầm cây, dùng kiếm ý gọt giũa từng phiến lá non... Cây thần này lớn lên được, là nhờ uống nước mắt và chân tình của người đấy!'
      },
      {
        id: 'ols_cp_04',
        subplotTitle: 'Đột Phá Nguyên Anh: Đạp Rượu Vượt Cửu Trọng Phong Lôi Trên Đỉnh Túy Nguyệt',
        speakerType: 'TIEN_BOI_AN_THE',
        speakerNameAndRole: 'Lão Tẩu Bán Trà (Cố Nhân Đồng Niên • Tán Tu Bách Tuế)',
        narrativeSetting: 'Bên bếp than củi nổ lách tách trong đêm sương mù giăng kín lối',
        recountedEraOrEvent: 'Bốn trăm năm trước • Đêm Độ Kiếp Nguyên Anh Độc Nhất Vô Nhị',
        breakthroughCultivationStage: 'Kim Đan Đỉnh Phong -> Nguyên Anh Kỳ (Túy Linh Kiếm Anh)',
        tribulationOrPhenomenon: 'Phong Lôi Hỗn Hợp Kiếp & Mưa Rượu Hương Ngạt Ngào Mười Dặm',
        breakthroughRealTruth:
          'Khi thiên lôi giáng xuống, tu sĩ khác lập trận phòng thủ, còn Cổ Phong thì ngửa cổ đón lôi đình rót thẳng vào hồ lô rượu để ủ thành "Lôi Đình Túy Tiên Tửu". Nguyên Anh của ông ngưng tụ thành hình một kiếm đồng tí hon tay cầm bầu rượu cưỡi trên thanh phong lướt gió!',
        associatedTreasureOrRealm: 'Túy Nguyệt Đỉnh • Lôi Hỏa Kiếm Đàn',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Tâm Như Hư Không": Phải dung nạp được sức mạnh hủy diệt của sấm sét mà không để tâm sinh lòng sợ hãi hay oán hận.',
        immortalTreeConnection:
          'Cành khô Cây Trường Sinh ngâm trong hồ lô rượu đã hấp thu lôi kiếp để nảy ra chồi non màu ngọc bích đầu tiên.',
        narrativePerspectiveSummary:
          'Sự kinh ngạc và khâm phục cách độ kiếp tiêu dao tự tại chưa từng thấy trong thiên hạ',
        historicalTruthVsRumor:
          'Môn phái sợ hãi tưởng ông bị sét đánh tan xác; nào ngờ ông say khướt hát vang giữa biển sét.',
        characterVividImpact:
          'Vừa uống rượu vừa ca vang bài thơ Độc Hành Thiên Hạ; sấm sét đánh vào người chỉ làm bốc lên hơi rượu thơm ngào ngạt.',
        spokenDialogueDraft:
          'Ta tận mắt thấy hắn độ kiếp Nguyên Anh bốn trăm năm trước trên đỉnh Túy Nguyệt! Bầu trời đêm đen kịt sấm sét gào thét như muốn xé toạc quả núi. Cả bọn ta nấp trong hang đá run như cầy sấy. Thế mà Cổ Phong... hắn cởi phanh vạt áo ngực, nhảy tót lên đỉnh tảng đá nhọn nhất, giơ cái hồ lô rượu lên trời mà gầm to: "Thiên Đạo lão nhi! Ngươi đánh sét yếu thế à? Đánh mạnh lên để ta mượn lôi hỏa nấu rượu xem nào!" Ầm một tiếng long trời lở đất, một cột sét tím to bằng cái cột đình giáng thẳng vào hồ lô của hắn! Hắn không những không chết mà còn ngửa mặt uống một ngụm lớn rồi cười sằng sặc: "Rượu ngon! Rượu sấm sét cay nồng đã đời lắm!" Mùi rượu thơm ngát lan tỏa khắp mười dặm, khi mây tan, trên đỉnh đầu hắn hiện ra một tiểu kiếm đồng tí hon đang cười toe toét... Cả thiên hạ này chỉ có một mình hắn dám biến lôi kiếp thành món đồ nhắm rượu mà thôi!'
      },
      {
        id: 'ols_cp_05',
        subplotTitle: 'Đột Phá Hóa Thần: Một Kiếm Phản Phác Quy Chân & Giọt Mật Hoa Cây Trường Sinh',
        speakerType: 'DONG_DOI_NHIEM_VU',
        speakerNameAndRole: 'Huyền Kiếm Chân Nhân (Đương Đại Chưởng Môn Thái Hư Kiếm Tông)',
        narrativeSetting: 'Trong Tông Chủ Đại Điện trang nghiêm, nhìn về hướng Kiếm Trủng với ánh mắt tôn kính tột cùng',
        recountedEraOrEvent: 'Hai trăm năm trước • Đêm Cổ Phong bước vào Hóa Thần Cảnh Giới',
        breakthroughCultivationStage: 'Nguyên Anh Viên Mãn -> Hóa Thần Kỳ (Bất Hủ Ẩn Kiếm Thần Thông)',
        tribulationOrPhenomenon: 'Vạn Kiếm Tề Minh Bái Hướng Kiếm Trủng & Hoa Thần Mộc Nở Rộ Giữa Đêm',
        breakthroughRealTruth:
          'Hóa Thần của Cổ Phong không có dị tượng hủy diệt long trời lở đất. Đêm đó, vạn thanh kiếm trên toàn bộ ba mươi sáu ngọn núi của Thái Hư Tông đồng loạt rung lên ngân nga khúc nhạc bình an. Từ dưới lòng đất Kiếm Trủng, mầm non Cây Trường Sinh bỗng nở ra một đóa hoa trắng muốt đầu tiên, nhỏ một giọt mật hoa trong vắt vào chén rượu của ông, giúp ông hoàn thành bước chuyển hóa Phản Phác Quy Chân.',
        associatedTreasureOrRealm: 'Kiếm Trủng Tâm Ma Đàn • Đóa Hoa Thần Mộc Bạch Ngọc',
        treasureLoreCategory: 'DOT_PHA_CANH_GIOI',
        treasureTrialSecret:
          'Khảo nghiệm "Tịch Mịch Chi Đạo": Người tu phải chấp nhận sự cô độc ngàn năm, quên đi vinh quang cá nhân để trở thành cái bóng bảo vệ môn phái.',
        immortalTreeConnection:
          'Đóa hoa Cây Trường Sinh nở rộ là sự công nhận tối cao của Mộc Linh viễn cổ đối với tấm lòng nhân hậu của Cổ Phong.',
        narrativePerspectiveSummary:
          'Người đứng đầu tông môn cúi đầu kính phục sư huynh, coi ông là linh hồn bất tử của toàn phái',
        historicalTruthVsRumor:
          'Thiên hạ đồn Cổ Phong tu vi đã thoái hóa; Chưởng Môn biết rõ sư huynh đã đạt tới cảnh giới Kiếm Đạo Hóa Thần Viên Mãn không đối thủ.',
        characterVividImpact:
          'Thần thái an nhiên tĩnh lặng như mặt hồ không gợn sóng; thanh kiếm rỉ sét cắm xuống đất biến thành một nhành liễu biếc.',
        spokenDialogueDraft:
          'Năm đó ta vừa tiếp quản chức Chưởng Môn, trong lòng còn nhiều băn khoăn bất an. Đêm hôm ấy, thanh Thái Hư Bảo Kiếm đeo bên hông ta bỗng tự động rời vỏ, bay lượn trên không trung rồi hướng mũi kiếm cúi chào về phía Kiếm Trủng! Ta vội vã chạy lên đỉnh núi nhìn sang... Cả Kiếm Trủng ngập tràn trong ánh sáng xanh ngọc bích dịu mát. Cổ Phong sư huynh ngồi trên phiến đá rêu, trước mặt là một đóa hoa trắng muốt nở bung từ mầm non Cây Trường Sinh. Một giọt mật hoa nhỏ xuống chén rượu thô sơ của huynh ấy. Huynh ấy nâng chén lên nhấp một ngụm, mỉm cười nói: "Tiểu sư đệ, làm chưởng môn thì phải học cách bao dung như biển lớn. Kiếm sắc đến mấy chém đá cũng mòn, chỉ có lòng từ bi mới trường tồn cùng càn khôn." Khoảnh khắc đó, trên người huynh ấy không còn một tia kiếm khí sắc bén nào, nhưng ta biết... huynh ấy đã hóa thành thanh kiếm vĩ đại nhất của đất trời!'
      },
      {
        id: 'ols_cp_06',
        subplotTitle: 'Bí Mật Đao Kiếm Tương Phùng: Lần Chỉ Điểm Tần Vô Đạo Thuở Thiếu Niên',
        speakerType: 'HO_DAO_GIA_HO_KIEP',
        speakerNameAndRole: 'Huyền Canh Lão Tổ (Thái Thượng Vạn Kiếm Quy Tông)',
        narrativeSetting: 'Bên bàn cờ đá trên đỉnh Lôi Đao Sơn, tay vuốt chòm râu bạc nhớ lại cố nhân',
        recountedEraOrEvent: 'Mười lăm năm trước • Chuyến Du Ngoạn Hồng Trần Của Cổ Phong',
        associatedTreasureOrRealm: 'Bá Đao Cổ Nhai • Chuôi Đao Cây Trường Sinh',
        treasureLoreCategory: 'NHIEM_VU_BAO_VAT',
        treasureTrialSecret:
          'Chính Cổ Phong là người đã trao tặng mảnh gỗ Cây Trường Sinh hóa thạch cho Vạn Kiếm Quy Tông để rèn thành chuôi Hoang Cổ Trấn Ma Đao cho Tần Vô Đạo.',
        immortalTreeConnection:
          'Nhìn thấy khí phách của Tần Vô Đạo, Cổ Phong đã gieo duyên mộc nguyên để sau này Đao Kiếm có thể hợp bích chống lại Ma Tộc.',
        narrativePerspectiveSummary:
          'Đại tông sư đao đạo thán phục tầm nhìn xa trông rộng của kiếm tiên tiền bối',
        historicalTruthVsRumor:
          'Người ngoài tưởng hai đại tông môn thù địch tranh giành ngôi vị đệ nhất; kỳ thực hai vị thái thượng sớm đã liên thủ bố cục ngàn năm.',
        characterVividImpact:
          'Ánh mắt thấu suốt thế cục; vỗ vai Tần Vô Đạo thuở thiếu thời khuyên răn về giới hạn của cuồng bạo.',
        spokenDialogueDraft:
          'Vô Đạo nó ngông cuồng bách chiến bách thắng, ai nói nó cũng không nghe, duy chỉ có một lần nó phải cúi đầu nhận thua tâm phục khẩu phục! Đó là năm nó mười lăm tuổi, vác đao chặn cổng Thái Hư Tông đòi khiêu chiến. Một lão già say xỉn mặc áo rách từ Kiếm Trủng lảo đảo bước ra, cầm cành đào khô khẽ gõ vào sống đao của Vô Đạo ba cái. "Keng! Keng! Keng!" Ba tiếng gõ nhẹ như gió thoảng, vậy mà cánh tay mang Hoang Cổ Thánh Thể của Vô Đạo tê dại đánh rơi đao xuống đất! Lão già ném cho nó một khúc gỗ đen ngòm, cười khà khà: "Tiểu tử có chí khí! Lấy khúc gỗ này về đúc chuôi đao đi, nhớ lấy: đao càng bén thì tâm càng phải tĩnh, nếu không đao sẽ chém đứt chính tay ngươi!" Sau này ta mới biết khúc gỗ đó chính là Cành Cây Trường Sinh hóa thạch... Tầm nhìn và ân tình của Cổ Phong đạo huynh đối với đao môn chúng ta, trời cao biển rộng cũng không sánh bằng!'
      },
      {
        id: 'ols_cp_07',
        subplotTitle: 'Lời Dặn Dò Cho Lâm Tiêu: Chân Tướng Cây Trường Sinh & Đạo Tâm Bất Hủ',
        speakerType: 'DONG_MON_DE_TU',
        speakerNameAndRole: 'Lâm Tiêu (Thuật Lại Ký Ức Sư Tôn Đêm Xuất Chinh)',
        narrativeSetting: 'Trước cửa Kiếm Trủng tịch mịch, tay cầm Cửu U Kiếm nhớ lại lời dặn của sư phụ',
        recountedEraOrEvent: 'Đêm trước trận Đại Chiến Ma Uyên Côn Luân',
        breakthroughCultivationStage: 'Chỉ Điểm Hỗn Độn Kiếm Ý Đệ Tứ Trọng (Vô Cực Trảm Thiên)',
        associatedTreasureOrRealm: 'Cây Trường Sinh Đang Lớn Dưới Kiếm Trủng',
        treasureLoreCategory: 'TRUONG_SINH_CO_THU',
        treasureTrialSecret:
          'Muốn đánh bại Huyết Cốt Ma Tôn, không phải dùng sức mạnh nghiền nát, mà phải dùng mộc linh thanh khiết của Cây Trường Sinh để thức tỉnh phần nhân tính còn sót lại và tịnh hóa oán niệm ngàn năm.',
        immortalTreeConnection:
          'Cổ Phong đã trao trọn vẹn quyền thủ hộ Cây Trường Sinh cho Lâm Tiêu trước khi bước vào trận chiến quyết tử.',
        narrativePerspectiveSummary:
          'Lòng biết ơn và sự kính yêu vô hạn của nhân vật chính đối với người thầy đã dẫn dắt mình thoát khỏi bóng tối kiếp trước',
        historicalTruthVsRumor:
          'Người đời xem Cổ Phong là một kẻ kỳ dị hết thời; đối với Lâm Tiêu, sư tôn là ngọn hải đăng soi sáng con đường tu đạo.',
        characterVividImpact:
          'Vệt sẹo kiếm trên ngực áo sư phụ; ánh mắt ấm áp đầy tin tưởng khi trao hồ lô rượu cho đồ nhi trước lúc lên đường.',
        spokenDialogueDraft:
          'Đêm trước khi ta lên đường tới Côn Luân quyết chiến với Huyết Cốt Ma Tôn, sư phụ gọi ta vào Kiếm Trủng. Người không dặn dò kiếm chiêu nào mới, chỉ bảo ta cùng người ngồi uống cạn chén rượu cặn dưới bóng cây non xanh biếc. Người nhìn ta, đôi mắt già nua lấp lánh ánh sao: "Tiêu nhi... kiếp trước ngươi sống vì thù hận, kiếp này ngươi sống vì bảo vệ. Cây Trường Sinh này không phải là bí quyết sống lâu bất tử, mà là lời nhắc nhở rằng sinh mệnh chỉ thực sự vĩnh cửu khi ngươi biết xả thân vì người khác. Nếu sư phụ có ngã xuống trong trận này, ngươi đừng khóc... Hãy mang tro cốt của ta rắc dưới gốc cây này, để ta được nghe tiếng kiếm reo của ngươi qua ngàn vạn năm sau!" Lời dặn ấy... ta khắc cốt ghi tâm suốt cả đời này!'
      }
    ]
  }
];

// =========================================================================
// HELPER UTILITY FUNCTIONS FOR TRAJECTORY DATA & STATS
// =========================================================================

export function getTrajectoryProfileForCharacter(
  charId: string,
  charName?: string
): CharacterTrajectoryRoutingProfile {
  const found = PRESET_TRAJECTORY_PROFILES.find(
    (p) => p.characterId === charId || (charName && p.characterName.toLowerCase() === charName.toLowerCase())
  );
  if (found) return found;

  // Create clean initial profile for unknown characters
  return {
    characterId: charId,
    characterName: charName || 'Nhân Vật Mới',
    characterAlias: 'Tán Tu Bí Ẩn',
    overviewPhilosophy: 'Đạo tâm cầu trường sinh, nghịch cảnh tôi luyện ý chí vững vàng.',
    lifeDestinyVow: 'Vượt qua chư thiên kiếp nạn, bảo hộ đạo tâm bất diệt.',
    relations: [],
    milestones: [],
    geographicAtlas: [],
    questTrialRecords: []
  };
}

export function computeRelationCategoryCounts(relations: CharacterTrajectoryRoutingProfile['relations']): Record<CharacterNexusRelationCategory, number> {
  const initial: Record<CharacterNexusRelationCategory, number> = {
    CHA_ME: 0,
    GIA_TOC: 0,
    VO_DAO_LU: 0,
    CON_CAI: 0,
    BAN_BE: 0,
    HANG_XOM: 0,
    TONG_MON: 0,
    SU_HUYNH_DE: 0,
    DE_TU: 0,
    KE_THU: 0
  };
  relations.forEach((rel) => {
    if (initial[rel.category] !== undefined) {
      initial[rel.category]++;
    }
  });
  return initial;
}

export function computeMilestoneTypeCounts(milestones: CharacterTrajectoryRoutingProfile['milestones']): Record<TrajectoryMilestoneType, number> {
  const initial: Record<TrajectoryMilestoneType, number> = {
    TU_LUYEN: 0,
    CO_DUYEN_KY_NGO: 0,
    HOI_NGO_TUONG_PHUNG: 0,
    CUOC_CHIA_LY: 0,
    SU_MENH: 0,
    BUOC_NGOAT_THAY_DOI: 0,
    NHIEM_VU: 0,
    DU_NGOAN: 0,
    THI_LUYEN: 0,
    BI_CANH: 0
  };
  milestones.forEach((ms) => {
    if (initial[ms.type] !== undefined) {
      initial[ms.type]++;
    }
  });
  return initial;
}

export function computeGeographicStatusCounts(atlas: GeographicExpeditionNode[] = []): Record<GeographicTraversalStatus, number> {
  const initial: Record<GeographicTraversalStatus, number> = {
    DA_TRAI_QUA: 0,
    DANG_TRAI_QUA: 0,
    CAN_TRAI_QUA: 0,
    MUC_TIEU_TOI_HAU: 0
  };
  atlas.forEach((node) => {
    if (initial[node.status] !== undefined) {
      initial[node.status]++;
    }
  });
  return initial;
}

export function computeGeographicTypeCounts(atlas: GeographicExpeditionNode[] = []): Record<GeographicLocationType, number> {
  const initial: Record<GeographicLocationType, number> = {
    LANG_MAC: 0,
    THANH_TRI: 0,
    BI_CANH_DONG_THIEN: 0,
    VUNG_DAT_SON_HAI: 0,
    TONG_MON_THANH_DIA: 0
  };
  atlas.forEach((node) => {
    if (initial[node.type] !== undefined) {
      initial[node.type]++;
    }
  });
  return initial;
}

export function computeQuestTrialCategoryCounts(records: CharacterQuestTrialRecord[] = []): Record<QuestTrialCategory, number> {
  const initial: Record<QuestTrialCategory, number> = {
    NHIEM_VU: 0,
    DU_NGOAN: 0,
    THI_LUYEN: 0,
    VAO_BI_CANH: 0
  };
  records.forEach((rec) => {
    if (initial[rec.category] !== undefined) {
      initial[rec.category]++;
    }
  });
  return initial;
}

export function computeKarmicTypeCounts(records: CharacterKarmicInheritanceBranch[] = []): Record<KarmicInheritanceType, number> {
  const initial: Record<KarmicInheritanceType, number> = {
    THAN_BINH_BAN_MENH: 0,
    TRUYEN_THUA_CO_TIEN: 0,
    DI_HOA_DI_LOI: 0,
    LINH_THU_KHE_UOC: 0,
    DAN_DUOC_THIEN_TAI: 0
  };
  records.forEach((rec) => {
    if (initial[rec.type] !== undefined) {
      initial[rec.type]++;
    }
  });
  return initial;
}

export function computeNemesisSeverityCounts(records: CharacterNemesisFeudBranch[] = []): Record<string, number> {
  const initial: Record<string, number> = {
    'Không Đội Trời Chung': 0,
    'Huyết Hải Thâm Cừu': 0,
    'Đạo Tâm Xung Đột': 0,
    'Túc Mệnh Tranh Đoạt': 0
  };
  records.forEach((rec) => {
    if (initial[rec.feudSeverity] !== undefined) {
      initial[rec.feudSeverity]++;
    }
  });
  return initial;
}

export function computeDaoDemonTypeCounts(records: CharacterDaoHeartDemonBranch[] = []): Record<string, number> {
  const initial: Record<string, number> = {
    'CHẤP_NIỆM_QUÁ_KHỨ': 0,
    'SÁT_TÂM_CUỒNG_BẠO': 0,
    'BÌNH_CẢNH_CẢNH_GIỚI': 0,
    'SINH_TỬ_KIẾP_SỐ': 0
  };
  records.forEach((rec) => {
    if (initial[rec.demonType] !== undefined) {
      initial[rec.demonType]++;
    }
  });
  return initial;
}

export function computeFactionAuthorityCounts(records: CharacterFactionPowerBranch[] = []): Record<string, number> {
  const initial: Record<string, number> = {
    'Đệ Tử Bình Thường': 0,
    'Nòng Cốt / Chân Truyền': 0,
    'Chấp Chưởng Trọng Quyền': 0,
    'Lãnh Tụ Tối Cao': 0
  };
  records.forEach((rec) => {
    if (initial[rec.authorityLevel] !== undefined) {
      initial[rec.authorityLevel]++;
    }
  });
  return initial;
}

export function computeOralLoreSpeakerCounts(records: CharacterOralLoreSubplot[] = []): Record<OralLoreSpeakerType, number> {
  const initial: Record<OralLoreSpeakerType, number> = {
    THUYET_THU_NHAN: 0,
    CO_NHAN_HAN_VI: 0,
    KE_THU_SONG_SOT: 0,
    DONG_MON_DE_TU: 0,
    TIEN_BOI_AN_THE: 0,
    PHUC_DU_THUONG_DAN: 0,
    TAM_BAO_GIA_BI_CANH: 0,
    GIAM_DINH_SU_BAO_CAC: 0,
    KHI_LINH_THU_HO: 0,
    DONG_DOI_NHIEM_VU: 0,
    HO_DAO_GIA_HO_KIEP: 0
  };
  records.forEach((rec) => {
    if (initial[rec.speakerType] !== undefined) {
      initial[rec.speakerType]++;
    }
  });
  return initial;
}

export function computeOralLoreTreasureCounts(records: CharacterOralLoreSubplot[] = []): Record<OralLoreTreasureCategory, number> {
  const initial: Record<OralLoreTreasureCategory, number> = {
    THIEN_TAI_DIA_BAO: 0,
    BI_CANH_DONG_THIEN: 0,
    TRUYEN_THUA_CO_TIEN: 0,
    TRUONG_SINH_CO_THU: 0,
    NHIEM_VU_BAO_VAT: 0,
    DOT_PHA_CANH_GIOI: 0,
    GIAI_THOAI_CHUNG: 0
  };
  records.forEach((rec) => {
    const cat = rec.treasureLoreCategory || 'GIAI_THOAI_CHUNG';
    if (initial[cat] !== undefined) {
      initial[cat]++;
    }
  });
  return initial;
}


