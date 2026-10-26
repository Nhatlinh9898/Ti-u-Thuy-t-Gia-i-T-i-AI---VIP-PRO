// =========================================================================
// HỆ THỐNG KIẾN TRÚC DỮ LIỆU TOÀN DIỆN TIỂU THUYẾT GIA ĐẠI TÀI VIP PRO
// (TIÊN HIỆP, HUYỀN HUYỄN, KIẾM ĐẠO, THẦN THOẠI & DỆT TRUYỆN TỰ NHIÊN)
// =========================================================================

export enum NodeType {
  NOVEL = 'Tiểu thuyết',
  PART = 'Phần',
  CHAPTER = 'Chương',
  ACT = 'Hồi',
  SECTION = 'Mục',
  SCENE = 'Phân cảnh'
}

export interface NovelNode {
  id: string;
  type: NodeType;
  title: string;
  summary?: string;
  content?: string;
  children: NovelNode[];
  isExpanded?: boolean;
  characters?: string[];
  keyEvents?: string[];
  notes?: string;
  coverImage?: string;
  audioNarrationUrl?: string;
  musicThemeUrl?: string;
  videoTrailerUrl?: string;
  status?: 'draft' | 'in_progress' | 'completed';
}

export interface NovelConfig {
  genre: string;
  tone: string;
  pov: string; // Point of View
  setting: string;
  plotIdea: string;
  mainCharacter: string;
  worldRules?: string;
  targetLength?: string;
}

export interface PillOrHerb {
  id: string;
  name: string;
  rank: string;
  effects: string;
  ingredients: string;
}

// Alchemy & Herbalism System Types
export type PillCategory =
  | 'Đột Phá Cảnh Giới'
  | 'Tẩy Tủy Phạt Mao'
  | 'Chữa Thương & Hồi Hồn'
  | 'Bạo Phát Tiềm Năng'
  | 'Gia Tăng Tu Vi'
  | 'Thọ Mệnh Duyên Thọ'
  | 'Độc Đan & Ảo Giác';

export interface PillRecipe {
  id: string;
  name: string;
  rank: string;
  category: PillCategory;
  mainHerbs: Array<{
    name: string;
    ageRequirement: string;
    role: 'Quân Dược (Chủ đạo)' | 'Thần Dược (Bổ trợ)' | 'Tá Dược (Hòa hoãn)' | 'Sứ Dược (Dẫn mạch)';
    spiritualProperty?: string;
  }>;
  effects: string;
  refiningKeynotes: string;
  fireControl: string; // Văn hỏa, Vũ hỏa, chuyển đổi hỏa hầu
  pillAroma: string;
  phenomenon: string; // Dị tượng khi xuất đan (mây ngũ sắc, đan hà, hương thơm vạn dặm...)
  sideEffects: string;
  drugResistance?: string; // Kháng đan & hạn mức dùng
}

export interface AlchemyCauldron {
  id: string;
  name: string;
  rank: 'Phàm Khí' | 'Linh Khí' | 'Bảo Khí' | 'Cổ Đỉnh' | 'Đạo Khí' | 'Thần Khí Viễn Cổ';
  materials: string;
  features: string;
  fireVentDesign: string; // Hỏa nhãn & trận pháp
  craftingMethod: string;
  forgingSteps?: string[]; // Quy trình đúc lò từng bước
  cauldronSoul?: string; // Khí linh hoặc linh tính của đỉnh
}

export interface HerbGuide {
  id: string;
  name: string;
  rarity: string;
  appearance: string;
  habitat: string; // Địa hình hiểm trở
  gatheringTool: string; // Dụng cụ chuyên dụng không dùng kim khí
  guardianBeast: string; // Yêu thú / Ma thú thủ hộ
  soilType: string; // Linh thổ trồng trọt
  wateringSource: string; // Nguồn nước tưới tiêu
  ageAcceleration: string; // Gia tốc sinh trưởng
  preservation: string; // Bí quyết bảo quản 100% linh khí
}

export interface AlchemySimulation {
  pillName: string;
  cauldronName: string;
  flameType: string;
  alchemistLevel?: string;
  processNarrative: string;
  pillTribulation: string;
  finalPillQuality: string;
  pillVeins?: string; // Số lượng đan vân / đan văn
  extractedEssence?: string; // Chiết xuất linh dịch
  cauldronExplosionRisk?: string; // Nguy cơ tạc đỉnh & cách hóa giải
}

export type WeaponCategory =
  | 'Kiếm (Phi Kiếm / Trọng Kiếm)'
  | 'Đao (Bá Đao / Trảm Ma Đao)'
  | 'Thương / Kích / Mâu (Trường Thương)'
  | 'Cung / Tiễn / Nỏ'
  | 'Quyền Thao / Chiến Giáp / Hộ Thể'
  | 'Trọng Binh (Chùy / Phủ / Côn Bổng)'
  | 'Kỳ Môn / Pháp Bảo (Chuông / Gương / Tháp / Quạt / Cầm)'
  | 'Ám Khí & Châm Bí Thuật';

export type WeaponRank =
  | 'Phàm Binh (Phàm Thiết Bách Luyện)'
  | 'Linh Khí (Hạ - Trung - Thượng - Cực Phẩm)'
  | 'Bảo Khí (Có Linh Quang / Biến Đổi Kích Thước)'
  | 'Thông Thiên Linh Bảo / Cổ Bảo'
  | 'Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)'
  | 'Cực Đạo Đế Binh / Thần Binh Viễn Cổ'
  | 'Hồng Hoang Tiên Khí / Hỗn Độn Chí Bảo';

export interface WeaponTierItem {
  id: string;
  name: string;
  category: WeaponCategory | string;
  rank: WeaponRank | string;
  materials: string;
  spiritSoul: string;
  inscribedArrays: string;
  combatPowerEffect: string;
  evolutionPath: string;
  ultimateTechnique: string;
  backstory: string;
  assignedCharacterId?: string;
}

export interface WeaponEvolutionResult {
  originalWeapon: string;
  catalystMaterial: string;
  evolvedName: string;
  evolvedRank: string;
  forgingProcess: string;
  spiritAwakening: string;
  newAbilities: string;
}

export type ForgingCategory =
  | 'Hỏa Luyện Chính Tông (Chân Hỏa / Lò Rèn Thần Bí)'
  | 'Thủy Luyện Hàn Băng (Cực Âm Bạt Thối Thuật)'
  | 'Bản Mệnh Đan Điền Ôn Dưỡng (Kiếm Thai Tự Dưỡng)'
  | 'Ma Đạo Huyết Tế / Định Linh (Sát Phạt Thần Binh)'
  | 'Cửu Thiên Lôi Kiếp Đúc Binh (Dẫn Lôi Tôi Cốt)'
  | 'Thần Niệm Hư Không Tố Khí (Ý Niệm Vi Viễn Cổ)';

export interface ForgingMethod {
  id: string;
  name: string;
  category: ForgingCategory | string;
  description: string;
  suitableRanks: string[];
  requiredFurnaceOrFlame: string;
  coreSteps: string[];
  secretTechnique: string;
  prosAndCons: {
    pros: string;
    cons: string;
    danger: string;
  };
  recommendedMaterials: string[];
}

export interface ForgingSimulation {
  weaponName: string;
  targetRank: string;
  methodUsed: string;
  materialsList: string[];
  flameOrFurnace: string;
  craftingNarrative: string;
  tribulationOrPhenomenon: string;
  finalStats: {
    gradeAchieved: string;
    specialEffects: string[];
    spiritSoulBorn: string;
    ultimateSkill: string;
  };
  authorNotes: string;
}

export interface FortuitousEncounter {
  id?: string;
  name: string;
  description: string;
  opportunity: string;
  danger: string;
}

export type ElementalType =
  | 'Kim (Canh Kim / Sát Phạt)'
  | 'Mộc (Ất Mộc / Trường Sinh)'
  | 'Thủy (Bích Thủy / Triều Dâng)'
  | 'Hỏa (Liệt Diễm / Dị Hỏa)'
  | 'Thổ (Đại Địa / Sơn Nhạc)'
  | 'Lôi (Thiên Kiếp / Tử Tiêu)'
  | 'Phong (Tật Phong / Cuồng Phong)'
  | 'Băng (Băng Hàn / Cực Âm)'
  | 'Âm Dương & Thái Cực'
  | 'Thôn Phệ & Hắc Ám'
  | 'Không Gian & Thời Gian'
  | 'Huyết Mạch & Thần Thú'
  | 'Hỗn Độn & Thái Sơ';

export type TechniqueSchoolType =
  | 'Tâm Pháp Nội Công'
  | 'Luyện Thể Ngoại Công'
  | 'Thân Pháp Bộ Pháp'
  | 'Kiếm Pháp / Đao Quyết Sát Phạt'
  | 'Thần Hồn & Huyễn Thuật Bí Pháp'
  | 'Phụ Tu (Đan / Trận / Phù / Khí)';

export interface ManualLayer {
  layerNumber: number;
  name: string;
  requirements: string;
  effects: string;
  cultivationMethod: string;
}

export interface ElementalCultivationManual {
  id: string;
  name: string;
  element: ElementalType;
  school: TechniqueSchoolType;
  rank: 'Hoàng Giai' | 'Huyền Giai' | 'Địa Giai' | 'Thiên Giai' | 'Thần Giai / Cấm Kỵ';
  origin: string;
  entryRequirements: string;
  corePhilosophy: string;
  chantMnemonic?: string;
  meridianRoute?: string;
  compatibilities?: string;
  layers: ManualLayer[];
  ultimateMoves: Array<{ name: string; description: string; drawback: string }>;
}

export interface TechniqueFusionResult {
  id: string;
  parentNames: string[];
  fusedName: string;
  fusedElement: string;
  fusedSchool: string;
  fusedRank: string;
  fusionPrinciple: string;
  uniquePhenomenon: string;
  corePhilosophy: string;
  chantMnemonic?: string;
  proseNarrative?: string;
  layers: ManualLayer[];
  ultimateMoves: Array<{ name: string; description: string; drawback: string }>;
}

export interface CatalyzedBreakthrough {
  id: string;
  title: string;
  characterName: string;
  targetRealm: string;
  catalystType:
    | 'Kỳ Chân Dị Bảo'
    | 'Pháp Khí Bản Mệnh'
    | 'Bí Cảnh / Tàn Hồn Truyền Thừa'
    | 'Thiên Lôi Tôi Thể'
    | 'Tử Địa Niết Bàn (Sinh Tử Quan)';
  catalystName: string;
  ritualPlace: string;
  breakthroughProcess: string;
  dangerAndPain: string;
  breakthroughMutation: string;
  proseSegment?: string;
}

export interface PowerTierLevel {
  level: number;
  name: string;
  subStages: string;
  description: string;
  breakthroughCondition: string;
  combatPower: string;
  cultivationMethod?: string;
  breakthroughRitual?: {
    requirements: string;
    danger: string;
    ritualPlace: string;
  };
  fortuitousEncounters?: FortuitousEncounter[];
  pillsAndElixirs?: PillOrHerb[];
  weaponsAndArtifacts?: any[];
  techniquesAndMartialArts?: any[];
}

export interface PowerTierSystem {
  id: string;
  name: string;
  genre: string;
  description: string;
  levels: PowerTierLevel[];
}

export interface ProgressionStage {
  id: string;
  order: number;
  phaseName: string;
  characterRealm: string;
  storyChapterRange: string;
  milestoneEvent: string;
  abilityUnlocked: string;
  psychologicalArc: string;
  bottleneckOrTribulation: string;
}

export interface CharacterRoadmap {
  characterId: string;
  characterName: string;
  systemName: string;
  overallArcSummary: string;
  stages: ProgressionStage[];
}

export type CharacterRole =
  | 'Chính diện'
  | 'Phản diện'
  | 'Sư phụ/Tiền bối'
  | 'Hồng nhan/Tri kỷ'
  | 'Đối thủ'
  | 'Hỗ trợ'
  | 'Nội gián / Điệp viên'
  | 'Ẩn thế lão tổ'
  | 'Nhân vật phụ then chốt'
  | 'Thương nhân / Hắc thị'
  | 'Mật thám / Tình báo viên'
  | 'Chấp sự / Ngoại môn đệ tử'
  | 'Tán tu / Thợ săn ma thú'
  | 'Cổ nhân / Tàn hồn';

export type DestinyFateRank =
  | 'Kim Sắc Cực Phẩm (Đại Khí Vận / Thiên Mệnh Sở Quy)'
  | 'Tử Sắc Thượng Phẩm (Thiên Kiêu Xuất Thế / Nghịch Mệnh Tố Thiên)'
  | 'Lam Sắc Trung Phẩm (Cơ Duyên Bất Phàm / Hộ Đạo Phúc Trạch)'
  | 'Lục Sắc Thường Phẩm (Bình Phàm Hữu Phúc)'
  | 'Xích Sắc Sát Tinh (Sát Phá Lang / Huyết Hải Hận Cừu)'
  | 'Hắc Sắc Kiếp Số (Cửu Tử Nhất Sinh / Vận Xui Tận Mạng)';

// ================= CHARACTER NEXUS & TRAJECTORY ROUTING GRAPH TYPES =================
// Mô hình sơ đồ định tuyến mạng lưới nhân vật (Cha mẹ, gia tộc, bạn bè, con cái, vợ, hàng xóm, tông môn, sư huynh đệ, đệ tử, kẻ thù)
// Và Niên biểu vận mệnh (Mốc tu luyện, cơ duyên kỳ ngộ, hội ngộ tương phùng, chia ly, sứ mệnh, bước ngoặt cuộc đời)

export type CharacterNexusRelationCategory =
  | 'CHA_ME' // Cha Mẹ (Phụ Mẫu / Dưỡng Phụ Mẫu)
  | 'GIA_TOC' // Gia Tộc (Dòng họ / Tộc nhân / Thế gia / Chi phái / Tổ tiên)
  | 'VO_DAO_LU' // Vợ / Thê Thiếp / Đạo Lữ Song Tu / Hồng Nhan
  | 'CON_CAI' // Con Cái / Hậu Duệ / Huyết Mạch Nối Dõi
  | 'BAN_BE' // Bạn Bè / Bằng Hữu Tri Giao / Huynh Đệ Sinh Tử
  | 'HANG_XOM' // Hàng Xóm / Láng Giềng Hàn Vi / Cố Nhân Thôn Trang
  | 'TONG_MON' // Tông Môn / Chưởng Môn / Trưởng Lão / Phái Môn
  | 'SU_HUYNH_DE' // Sư Tôn / Sư Huynh Đệ / Sư Tỷ Muội / Đồng Môn
  | 'DE_TU' // Đệ Tử Môn Hạ / Chân Truyền / Ký Danh / Hộ Đạo Giả
  | 'KE_THU'; // Kẻ Thù Truyền Kiếp / Huyết Cừu / Túc Địch Định Mệnh

export interface CharacterNexusRelationNode {
  id: string;
  category: CharacterNexusRelationCategory;
  categoryLabel?: string;
  targetName: string;
  targetRoleOrTitle: string; // Vai vế / Danh xưng / Chức vị
  intimacyLevel: number; // Mức độ thân mật / ân oán (-100 cực thù đến +100 thệ tử tương tùy)
  status: 'Còn Sống' | 'Đã Tọa Hóa / Bỏ Mạng' | 'Mất Tích / Lưu Lạc' | 'Phi Thăng Thượng Giới' | 'Bị Giam Cầm / Phong Ấn';
  originStory: string; // Nguồn gốc mối quan hệ (Bắt đầu từ đâu)
  currentDynamics: string; // Tình trạng quan hệ / Dây dưa hiện tại
  karmicTies: string; // Mối nợ nhân quả / Hứa hẹn / Ân oán
  icon?: string;
  colorTheme?: string;
}

export type TrajectoryMilestoneType =
  | 'TU_LUYEN' // Mốc Thời Gian Tu Luyện & Đột Phá Cảnh Giới
  | 'CO_DUYEN_KY_NGO' // Cơ Duyên Kỳ Ngộ (Dị bảo, truyền thừa cổ, thần thú, đan dược)
  | 'HOI_NGO_TUONG_PHUNG' // Cuộc Hội Ngộ Tương Phùng (Tái ngộ người thân, tri kỷ, bằng hữu)
  | 'CUOC_CHIA_LY' // Cuộc Chia Ly (Sinh ly tử biệt, tông môn ly tán, hiến tế, lưu lạc)
  | 'SU_MENH' // Sứ Mệnh (Gánh vác đại nghiệp, lời thề phục thù, cứu thế)
  | 'BUOC_NGOAT_THAY_DOI' // Bước Ngoặt Cuộc Đời (Biến cố thay đổi hoàn toàn tính cách / số mệnh)
  | 'NHIEM_VU' // Nhánh Làm Nhiệm Vụ (Tông môn ủy thác, triều đình, trừ yêu diệt ma)
  | 'DU_NGOAN' // Lần Du Ngoạn (Ngao du sơn hà, du lịch hồng trần, lịch lãm giang hồ)
  | 'THI_LUYEN' // Lần Tham Gia Thí Luyện (Tông môn đại bỉ, lôi đài vạn kiêu, cửu trùng khảo nghiệm)
  | 'BI_CANH'; // Lần Vào Bí Cảnh (Động thiên phúc địa, cổ mộ tàn tích, cấm khu tranh đoạt)

export interface CharacterTrajectoryMilestone {
  id: string;
  timeAnchor: string; // Mốc thời gian (vd: "Năm 6 tuổi", "Năm 16 tuổi", "Kỷ nguyên 300 năm sau kiếp nạn"...)
  type: TrajectoryMilestoneType;
  title: string;
  location: string; // Không gian & Địa điểm diễn ra
  involvedCharacters: string[]; // Các nhân vật liên đới (cha mẹ, bằng hữu, kẻ thù...)
  description: string; // Diễn biến chi tiết sự việc
  cultivationStateBeforeAndAfter: string; // Tu vi trước và sau mốc này
  psychologicalTransformation: string; // Biến chuyển tâm tính / đạo tâm của nhân vật
  karmicEcho: string; // Âm vang nhân quả / Dấu ấn định hình tương lai
  novelSnippetDraft?: string; // Đoạn trích dẫn miêu tả theo phong cách tiểu thuyết
}

// ================= GEOGRAPHIC EXPEDITION ATLAS ACCORDING TO TIMELINE =================
// Bản đồ địa danh: Làng mạc, thành trì, vùng đất, bí cảnh đã trải qua và cần trải qua theo từng mốc giai đoạn

export type GeographicLocationType =
  | 'LANG_MAC' // Làng mạc, thôn dã, sơn thôn hàn vi
  | 'THANH_TRI' // Thành trì, tiên thành phồn hoa, đế đô, pháo đài trấn quan, phường thị
  | 'BI_CANH_DONG_THIEN' // Bí cảnh, động thiên phúc địa, cổ mộ tàn tích, cấm địa
  | 'VUNG_DAT_SON_HAI' // Vùng đất, sơn mạch hoang dã, hoang mạc, đại vực, hải vực thâm uyên
  | 'TONG_MON_THANH_DIA'; // Sơn môn môn phái, thánh địa tiên tông, hoàng triều cung điện

export type GeographicTraversalStatus =
  | 'DA_TRAI_QUA' // Đã trải qua / In dấu chân / Đã chinh phục trong quá khứ
  | 'DANG_TRAI_QUA' // Đang trải qua / Hiện diện tại giai đoạn thời gian này
  | 'CAN_TRAI_QUA' // Cần trải qua / Điểm đến bắt buộc phải đi trong tương lai
  | 'MUC_TIEU_TOI_HAU'; // Mục tiêu tối hậu phải vượt qua / Đích đến chiến trường chung cực

export interface GeographicExpeditionNode {
  id: string;
  name: string; // Tên địa danh (ví dụ: Thanh Thạch Thôn, Thanh Vân Tiên Thành, Đoạn Hồn Nhai, Cổ Tiên Phủ...)
  type: GeographicLocationType;
  status: GeographicTraversalStatus;
  chronologicalStage: string; // Giai đoạn mốc thời gian (vd: "Giai đoạn 1: Thuở Hàn Vi (0-14 tuổi)", "Giai đoạn 2: Bái Môn Nhập Đạo (15-25 tuổi)"...)
  realmOrRegion: string; // Thuộc đại vực, cõi giới hoặc quốc gia nào
  terrainAndAura: string; // Địa hình, khí hậu, mật độ linh khí
  requiredTasksOrTrials: string; // Nhiệm vụ hoặc biến cố bắt buộc phải thực hiện tại đây
  conquestOrLegacy: string; // Dấu ấn để lại hoặc chiến lợi phẩm thu được
  novelSceneryProse?: string; // Đoạn văn miêu tả cảnh sắc, không gian và dòng người qua lại
}

// ================= QUESTS, TRAVELS, TRIALS & SECRET REALMS =================
// Các nhánh nhiệm vụ, du ngoạn, thí luyện, vào bí cảnh theo lộ trình vận mệnh

export type QuestTrialCategory =
  | 'NHIEM_VU' // Nhánh Làm Nhiệm Vụ (Tông môn ủy thác, triều đình sắc lệnh, huyền thưởng sát thủ)
  | 'DU_NGOAN' // Lần Du Ngoạn (Ngao du sơn hà, du lịch hồng trần, lịch lãm tứ hải, đàm đạo)
  | 'THI_LUYEN' // Lần Tham Gia Thí Luyện (Đại bỉ nhập môn, lôi đài thiên kiêu, cửu trùng khảo nghiệm)
  | 'VAO_BI_CANH'; // Lần Vào Bí Cảnh (Khám phá động thiên, đoạt di bảo, phá giải thượng cổ trận pháp)

export interface CharacterQuestTrialRecord {
  id: string;
  category: QuestTrialCategory;
  title: string; // Tiêu đề nhiệm vụ / chuyến du ngoạn / thí luyện / bí cảnh
  stageTimeAnchor: string; // Giai đoạn / Mốc thời gian thực hiện
  locationName: string; // Địa danh diễn ra
  dangerAndDifficulty: 'Phổ Thông' | 'Hiểm Trở' | 'Cực Nguy Cấp S' | 'Thập Tử Vô Sinh SSS';
  executionStatus: 'Đã Hoàn Thành' | 'Đang Thực Hiện' | 'Cần Thực Hiện (Chờ Kích Hoạt)' | 'Di Hận Thất Bại';
  issuingAuthorityOrContext: string; // Đơn vị giao phó hoặc nguyên nhân khởi xướng
  keyObjectives: string[]; // Các mục tiêu then chốt cần hoàn tất
  rewardsOrBreakthroughs: string; // Phần thưởng, công pháp, bảo vật hoặc đột phá cảnh giới
  trialEncounters: string; // Đối thủ chạm trán hoặc hiểm họa đối mặt
  narrativeJournalSnippet?: string; // Ký sự hành trình / trích đoạn tiểu thuyết
}

// ================= NEW EXTENDED CHARACTER BRANCH TYPES =================

// 1. NHÁNH CƠ DUYÊN KỲ NGỘ, THẦN BINH & TRUYỀN THỪA CỔ ĐẠI
export type KarmicInheritanceType =
  | 'THAN_BINH_BAN_MENH' // Thần Binh Bản Mệnh / Linh Bảo Thượng Cổ
  | 'TRUYEN_THUA_CO_TIEN' // Truyền Thừa Cổ Tiên / Tàn Hồn Lão Tổ Chỉ Điểm
  | 'DI_HOA_DI_LOI' // Dị Hỏa / Thiên Lôi / Huyền Thủy / Dị Chủng Thiên Địa
  | 'LINH_THU_KHE_UOC' // Thần Thú / Thượng Cổ Hung Thú Khế Ước Hộ Mệnh
  | 'DAN_DUOC_THIEN_TAI'; // Đạo Đan / Thánh Dược Nghịch Thiên Cải Mệnh

export interface CharacterKarmicInheritanceBranch {
  id: string;
  name: string; // Tên cơ duyên / bảo vật (ví dụ: Cửu U Kiếm Thai, Tàn Hồn Kiếm Tôn, Thái Sơ Chân Hỏa)
  type: KarmicInheritanceType;
  acquisitionMilestone: string; // Mốc thời gian & địa điểm đạt được (vd: Năm 14 tuổi - Đoạn Hồn Nhai)
  rankOrGrade: string; // Cấp bậc (vd: Cực Phẩm Linh Bảo, Thượng Cổ Chí Bảo, Tiên Khí Tàn Khuyết)
  awakeningStage: string; // Tiến độ thức tỉnh / phong ấn giải khai (vd: Tầng 3/9 Phong Ấn)
  soulBondStatus: 'Sơ Bộ Luyện Hóa' | 'Tâm Huyết Tương Liên' | 'Hợp Nhất Đạo Thân' | 'Khí Linh Thức Tỉnh';
  specialAbilities: string[]; // Các thần thông năng lực đặc biệt mang lại
  karmicCostOrBacklash: string; // Cái giá phải trả / Tác dụng phụ / Trách nhiệm nhân quả kèm theo
  novelLoreSnippet?: string; // Đoạn văn miêu tả khoảnh khắc tỏa sáng / điển tích
}

// 2. NHÁNH TÚC ĐỊCH HUYẾT THÙ & QUYẾT CHIẾN ĐỊNH MỆNH
export interface CharacterNemesisFeudBranch {
  id: string;
  nemesisName: string; // Tên kẻ thù (vd: Huyết Cốt Ma Tôn, Vương Thế Hùng)
  nemesisFactionAndRank: string; // Thế lực & Cảnh giới túc địch (vd: Vạn Ma Tông - Hóa Thần Viên Mãn)
  feudOriginCause: string; // Nguồn gốc ân oán (Diệt môn, cướp đoạt chí bảo, bức hại thân nhân)
  feudSeverity: 'Không Đội Trời Chung' | 'Huyết Hải Thâm Cừu' | 'Đạo Tâm Xung Đột' | 'Túc Mệnh Tranh Đoạt';
  status: 'Đang Truy Lùng' | 'Chờ Ngày Quyết Đấu' | 'Đã Trảm Sát' | 'Đã Hóa Giải Ân Oán';
  pastClashes: string; // Các lần chạm trán trong quá khứ và kết quả
  destinedDuelCondition: string; // Thời gian & Địa điểm ước hẹn quyết chiến sinh tử
  feudResolutionReward: string; // Đột phá đạo tâm / phần thưởng thu được khi kết thúc ân oán
  duelSnippetDraft?: string; // Đoạn văn đối đầu rực lửa sát khí
}

// 3. NHÁNH TÂM MA KIẾP NẠN, BÌNH CẢNH & GIÁC NGỘ ĐẠO TÂM
export interface CharacterDaoHeartDemonBranch {
  id: string;
  demonName: string; // Tên tâm ma / chấp niệm (vd: Nỗi Sợ Phụ Mẫu Tiêu Vong, Sát Nghiệp Cuồng Bạo, Bình Cảnh Hóa Thần)
  demonType: 'CHẤP_NIỆM_QUÁ_KHỨ' | 'SÁT_TÂM_CUỒNG_BẠO' | 'BÌNH_CẢNH_CẢNH_GIỚI' | 'SINH_TỬ_KIẾP_SỐ';
  triggerStage: string; // Mốc cảnh giới bộc phát (vd: Đột Phá Hóa Thần, Lôi Kiếp Cửu Trọng)
  innerDemonManifestation: string; // Biểu hiện của tâm ma (Ảo ảnh, kinh mạch hỗn loạn, đạo tâm lung lay)
  daoResolutionMethod: string; // Phương pháp hóa giải / Phá chấp (Hóa phàm lịch kiếp, buông bỏ thù hận, ngộ đạo)
  daoDomainMastery: string; // Quy tắc đại đạo đắc chứng sau khi vượt qua (vd: Sinh Tử Kiếm Vực 85%)
  breakthroughState: 'Chưa Vượt Qua (Nguy Cơ Phản Phệ)' | 'Đang Giằng Co Tâm Trí' | 'Đã Đốn Ngộ Hoàn Toàn';
  enlightenmentSnippet?: string; // Trích đoạn giác ngộ đạo tâm đầy triết lý
}

// 4. NHÁNH THẾ LỰC, CHỨC VỊ TÔNG MÔN & QUYỀN LỰC BANG HỘI
export interface CharacterFactionPowerBranch {
  id: string;
  factionName: string; // Tên thế lực / bang phái / tiên triều (vd: Thái Hư Kiếm Tông, Vô Cực Minh)
  characterTitleOrRole: string; // Chức vị hiện tại (vd: Thiếu Tông Chủ, Chưởng Môn, Thái Thượng Minh Chủ)
  authorityLevel: 'Đệ Tử Bình Thường' | 'Nòng Cốt / Chân Truyền' | 'Chấp Chưởng Trọng Quyền' | 'Lãnh Tụ Tối Cao';
  controlledTerritory: string; // Lãnh địa, sơn phong, linh mạch hoặc thành trì cai quản
  alliedSubFactions: string[]; // Các phân đà, gia tộc liên minh trung thành
  rivalFactionForces: string; // Phe phái đối lập, trưởng lão bảo thủ hoặc thế lực thù địch dòm ngó
  powerLegacyContribution: string; // Công tích xây dựng / di sản để lại cho thế lực
}

// 5. MẠCH CHUYỆN PHỤ & GIAI THOẠI TIỂU SỬ QUA LỜI TƯỜNG THUẬT / NHẮC TỚI
export type OralLoreSpeakerType =
  | 'THUYET_THU_NHAN' // Thuyết thư nhân quán trà / người kể chuyện giang hồ
  | 'CO_NHAN_HAN_VI' // Cố nhân láng giềng / người thân thuộc thuở hàn vi
  | 'KE_THU_SONG_SOT' // Kẻ thù sống sót / bại tướng nhắc về với sự run sợ
  | 'DONG_MON_DE_TU' // Đồng môn / đệ tử hậu bối sùng kính truyền tai
  | 'TIEN_BOI_AN_THE' // Tiền bối đại năng ẩn thế đánh giá / tiếc nuối
  | 'PHUC_DU_THUONG_DAN' // Phàm nhân / tu sĩ yếu thế từng được cứu mạng
  | 'TAM_BAO_GIA_BI_CANH' // Tầm bảo giả / tu sĩ cùng thám hiểm bí cảnh chứng kiến tranh đoạt thiên tài địa bảo
  | 'GIAM_DINH_SU_BAO_CAC' // Giám định sư / trưởng lão Đấu Giá Các / Tàng Bảo Các thẩm định bảo vật
  | 'KHI_LINH_THU_HO' // Khí linh thủ hộ bí cảnh / cổ thần tàn hồn trao truyền thừa
  | 'DONG_DOI_NHIEM_VU' // Đồng đội thi hành nhiệm vụ / Chấp sự phát lệnh / Đồng đạo liên quân sinh tử
  | 'HO_DAO_GIA_HO_KIEP'; // Hộ đạo giả hộ kiếp / Trưởng lão hộ trận / Chứng nhân đài độ kiếp chấn động

export type OralLoreTreasureCategory =
  | 'THIEN_TAI_DIA_BAO' // Thảo dược vạn năm, linh quả, tiên đan, khoáng thạch thần kim
  | 'BI_CANH_DONG_THIEN' // Cổ tiên bí cảnh, cấm khu di tích, động thiên phúc địa
  | 'TRUYEN_THUA_CO_TIEN' // Tàn hồn đế tôn, ngọc giản khai mạch, đạo điển bí truyền
  | 'TRUONG_SINH_CO_THU' // Truyền thuyết Cây Trường Sinh / Thần Mộc Bất Tử / Kết mạch sinh mệnh nhân vật
  | 'NHIEM_VU_BAO_VAT' // Nhiệm vụ đoạt bảo / Phạt trảm thủ hộ thú / Thí luyện tông môn tìm linh vật
  | 'DOT_PHA_CANH_GIOI' // Đột phá cảnh giới / Độ kiếp phá quan / Dị tượng thiên kiếp & Niết bàn trùng sinh
  | 'GIAI_THOAI_CHUNG'; // Giai thoại cuộc đời tổng quát

export interface CharacterOralLoreSubplot {
  id: string;
  subplotTitle: string; // Tiêu đề mạch chuyện phụ / Giai thoại
  speakerType: OralLoreSpeakerType;
  speakerNameAndRole: string; // Người kể chuyện & Thân phận
  narrativeSetting: string; // Bối cảnh không gian & thời điểm nhắc tới
  recountedEraOrEvent: string; // Mốc tiểu sử / biến cố được hồi tưởng
  breakthroughCultivationStage?: string; // Mốc cảnh giới đột phá (Vd: Trúc Cơ Viên Mãn -> Cửu Chuyển Hỗn Độn Kim Đan, Kim Đan -> Nguyên Anh...)
  tribulationOrPhenomenon?: string; // Dị tượng thiên địa, lôi kiếp cửu trùng hoặc khảo nghiệm tâm ma khi phá quan
  breakthroughRealTruth?: string; // Chân tướng quá trình đột phá (cái giá thịt nát xương tan, sự đốn ngộ đạo tâm, tương trợ của thiên tài địa bảo/Cây Trường Sinh)
  associatedMissionOrQuest?: string; // Tên nhiệm vụ / chuyến đi thực hiện nhiệm vụ được nhắc tới (Vd: Huyền thưởng cấp S trảm Hắc Lôi Mãng, Hộ tống thánh dược...)
  missionExecutionTruth?: string; // Chân tướng & diễn biến thực tế khi thực hiện nhiệm vụ (chiến thuật, sự cơ trí, cái giá trả giá, sự hy sinh vì đồng đội)
  associatedTreasureOrRealm?: string; // Tên Thiên Tài Địa Bảo / Bí Cảnh / Truyền Thừa liên quan
  treasureLoreCategory?: OralLoreTreasureCategory; // Phân loại chuyên sâu về bảo vật/bí cảnh/truyền thừa
  treasureTrialSecret?: string; // Bí mật khảo nghiệm hoặc cái giá khi đoạt bảo vật / nhận truyền thừa
  immortalTreeConnection?: string; // Mạch kết nối Truyền thuyết Cây Trường Sinh & Sinh mệnh/Đạo tâm nhân vật
  narrativePerspectiveSummary: string; // Tóm tắt góc nhìn của người kể
  historicalTruthVsRumor: string; // Đối chiếu: Sự thật cốt lõi vs Dị bản thêu dệt truyền miệng
  characterVividImpact: string; // Chi tiết làm nhân vật sống động (thói quen, ánh mắt, vết sẹo, nụ cười)
  spokenDialogueDraft: string; // Lời thoại / Độc thoại tường thuật sống động để chèn vào chương
}

export interface CharacterTrajectoryRoutingProfile {
  characterId: string;
  characterName: string;
  characterAlias?: string;
  overviewPhilosophy: string; // Đạo tâm & Lý tưởng chi phối vận mệnh
  lifeDestinyVow: string; // Đại thệ / Sứ mệnh tối thượng
  relations: CharacterNexusRelationNode[];
  milestones: CharacterTrajectoryMilestone[];
  geographicAtlas?: GeographicExpeditionNode[];
  questTrialRecords?: CharacterQuestTrialRecord[];
  karmicInheritances?: CharacterKarmicInheritanceBranch[];
  nemesisFeuds?: CharacterNemesisFeudBranch[];
  daoHeartDemons?: CharacterDaoHeartDemonBranch[];
  factionPowers?: CharacterFactionPowerBranch[];
  oralLoreSubplots?: CharacterOralLoreSubplot[];
}

export interface CharacterRelationship {
  targetCharacterId: string;
  targetCharacterName: string;
  relationType:
    | 'Sư Đồ (Thầy - Trò)'
    | 'Đạo Lữ (Bạn đời tu tiên)'
    | 'Tri Kỷ Hồng Nhan'
    | 'Huynh Đệ Sinh Tử'
    | 'Kẻ Thù Truyền Kiếp / Huyết Cừu'
    | 'Chủ Tớ / Khế Ước Mệnh Hồn'
    | 'Đồng Môn / Cạnh Tranh'
    | 'Nội Gián Giám Sát / Đề Phòng'
    | string;
  description: string;
}

export interface CharacterEncounterSimulationResult {
  character1Name: string;
  character2Name: string;
  encounterType: string;
  location: string;
  contextNarrative: string;
  dialogueExchange: Array<{ speaker: string; line: string; expression: string }>;
  combatOrActionClimax: string;
  resolutionAndImpact: string;
  novelSnippet: string;
}

// ================= SPIRITUAL ROOTS & INNATE TALENTS & MENTAL ATTRIBUTES =================
export type SpiritualRootCountCategory =
  | 'Đơn Linh Căn (1 Căn - Thuần Khiết / Thiên Linh Căn)'
  | 'Song Linh Căn (2 Căn - Tương Sinh / Tương Khắc)'
  | 'Tam Linh Căn (3 Căn - Phổ Thông Tu Sĩ)'
  | 'Tứ Linh Căn (4 Căn - Tạp Linh Căn Gian Nan)'
  | 'Ngũ Hành Tạp Căn (5 Căn - Phế Căn Phàm Giới / Đồng Thể Thượng Cổ)'
  | 'Dị Linh Căn (Biến Dị Lôi - Băng - Phong - Ám - Quang)'
  | 'Hỗn Độn Khai Thiên Căn (Vô Cực Tổ Căn)'
  | 'Vô Linh Căn (Phàm Căn Liệt Đẳng)';

export type SpiritualRootGrade =
  | 'Phế Căn Liệt Đẳng (Thuần độ < 25%)'
  | 'Hạ Phẩm Linh Căn (Thuần độ 25% - 45%)'
  | 'Trung Phẩm Linh Căn (Thuần độ 46% - 65%)'
  | 'Thượng Phẩm Linh Căn (Thuần độ 66% - 85%)'
  | 'Cực Phẩm Linh Căn (Thuần độ 86% - 95%)'
  | 'Thiên Linh Căn (100% Thuần Khiết Đơn Hệ)'
  | 'Tiên Phẩm Dị Chủng Căn (Biến Dị Cực Hạn)'
  | 'Thần Cấp Hỗn Độn Tổ Căn (Nghịch Thiên Hỗn Độn)';

export interface SpiritualRootElement {
  element: 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ' | 'Lôi' | 'Băng' | 'Phong' | 'Quang' | 'Ám' | 'Hư Không' | 'Huyết' | 'Độc' | 'Hỗn Độn' | string;
  purity: number; // 10 -> 100%
  color?: string;
  description?: string;
}

export interface SpiritualRootDetail {
  countCategory: SpiritualRootCountCategory | string;
  grade: SpiritualRootGrade | string;
  rootName: string;
  elements: SpiritualRootElement[];
  cultivationSpeedMultiplier: string;
  awakeningStage?: string;
  specialAuraEffect?: string;
}

export type SoulRealmTier =
  | 'Phàm Hồn (Phàm nhân - Phạm vi 5 mét)'
  | 'Uẩn Thần (Luyện Khí / Trúc Cơ - Phạm vi 50 - 300 mét)'
  | 'Du Thần / Thần Niệm Tơ (Kim Đan - Phạm vi 1 - 5 dặm)'
  | 'Nguyên Thần Pháp Tướng (Nguyên Anh - Phạm vi 10 - 50 dặm)'
  | 'Bất Diệt Hồn Quang (Hóa Thần / Luyện Hư - Vạn dặm bao phủ)'
  | 'Chân Linh Thái Cổ / Tiên Hồn Cực Cảnh (Xuyên toa giới diện)';

export interface MentalSoulAttributes {
  soulRealm: SoulRealmTier | string;
  soulPowerPoints: number;
  perceptionRange: string;
  daoHeartType: string;
  daoHeartStability: number;
  comprehensionTier: string;
  comprehensionScore: number;
  innerDemonResistance: number;
  innerDemonState?: string;
}

export type CharacterTalentTier =
  | 'Hoàng Cấp'
  | 'Huyền Cấp'
  | 'Địa Cấp'
  | 'Thiên Cấp'
  | 'Thánh Cấp'
  | 'Thần Cấp'
  | 'Cấm Kỵ / Nghịch Thiên Cấp';

export type CharacterTalentCategory =
  | 'Đồng Thuật / Nhãn Giới'
  | 'Cốt Cách / Kinh Mạch Bẩm Sinh'
  | 'Bách Nghệ Kỳ Tài (Đan / Phù / Trận / Khí / Ngự Thú)'
  | 'Ý Cảnh / Chiến Đấu Thần Thông'
  | 'Thôn Phệ / Sinh Mệnh Cơ Năng'
  | 'Thời Không / Quy Tắc Khai Thiên';

export interface CharacterTalent {
  id: string;
  name: string;
  tier: CharacterTalentTier | string;
  category: CharacterTalentCategory | string;
  description: string;
  combatBuffEffect: string;
}

export interface SpiritualRootAppraisalResult {
  testingCeremonyNarrative: string;
  appraisalConclusion: string;
  updatedSpiritualRootDetail: SpiritualRootDetail;
  updatedMentalAttributes: MentalSoulAttributes;
  awakenedTalents: CharacterTalent[];
}

export interface CharacterProfile {
  id: string;
  name: string;
  pinyinOrAlias?: string;
  role: CharacterRole | string;
  gender?: 'Nam' | 'Nữ' | 'Phi nhân tộc / Vô tính' | string;
  age?: string;
  realmOrRank: string;
  sectOrFaction?: string;
  factionPosition?: string;
  spiritualRoots?: string;
  spiritualRootDetail?: SpiritualRootDetail;
  mentalAttributes?: MentalSoulAttributes;
  talents?: CharacterTalent[];
  specialPhysique?: string;
  destinyFate?: DestinyFateRank | string;
  personality: string;
  appearance: string;
  weaponOrAbility: string;
  natalArtifact?: string;
  bondedBeast?: string;
  grottoDwelling?: string;
  fatalFlawOrTaboo?: string;
  currentObjective?: string;
  relationships?: CharacterRelationship[];
  backstory: string;
  avatarUrl?: string;
  progressionRoadmap?: CharacterRoadmap;
  chronicleClues?: CharacterChronicleClue[];
  trajectoryProfile?: CharacterTrajectoryRoutingProfile;
}

// ================= MULTI-PERSPECTIVE & CHRONICLE CLUE MATRIX =================
// Dữ kiện nhân vật phụ tại các thời điểm - vị trí (đồng thời / dị thời) liên kết cốt chính

export type ChronoSyncMode =
  | 'simultaneous' // Đồng thời (Xảy ra song song cùng lúc với hành động của Main ở phương xa)
  | 'asynchronous_past' // Dị thời tiền sử (Xảy ra trước đó vài ngày, vài tháng, hoặc trăm năm trước)
  | 'asynchronous_future_planted'; // Dị thời tương lai / Điềm báo ngầm gieo mầm đón đầu

export type ChronicleClueType =
  | 'physical_evidence' // Vật chứng hữu hình (Tàn khuyết phù triện, ngọc bài tông môn, mảnh giáp rỉ máu, độc dược)
  | 'intel_rumor' // Lời đồn hắc thị / Mật báo tình báo đình / Truyền âm mật phù
  | 'anomaly_witness' // Nhân chứng dị tượng thiên địa (Khí tức ma đạo, lôi kiếp bất thường, dị bảo xuất thế)
  | 'economic_fluctuation' // Biến động thị trường / Thu gom linh tài lạ thường / Giá đan dược đột biến
  | 'combat_residue' // Dấu vết chiến trường tàn lưu (Kiếm ý khắc vách núi, thi cốt bị rút sạch tủy, vết cháy hắc hỏa)
  | 'identity_leak' // Sơ hở thân phận (Khẩu âm ngoại vực, thói quen bí thuật cấm kỵ, ấn ký ẩn sau gáy)
  | 'ancient_records'; // Ngọc giản tàn diệp / Bia đá khảo cổ / Di thư bí mật

export interface CharacterChronicleClue {
  id: string;
  characterId: string; // ID nhân vật phụ
  characterName: string;
  characterRoleTag?: string; // Vai trò nhân vật (ví dụ: Chưởng quỹ đan phường, Thám tử tình báo, Tán tu thợ săn)
  locationName: string; // Vị trí địa lý (ví dụ: Thanh Vân Lạc Nhật Cốc, Hắc Thị Đáy Giếng, Vạn Kiếm Nhai)
  timeAnchor: string; // Mốc thời gian (ví dụ: "Giờ Tý đêm rằm trước ngày đại điển 3 hôm", "Năm thứ 120 trước đại kiếp")
  syncMode: ChronoSyncMode; // Đồng thời hay dị thời
  surfaceAppearance: string; // Hiện tượng bề ngoài / Vỏ bọc ngụy trang (Người ngoài nhìn thấy gì - giả tượng)
  secretTruth: string; // Chân tướng ngầm (Sự thật thực tế diễn ra sau lưng mà nhân vật này đã làm/chứng kiến)
  clueType: ChronicleClueType;
  clueArtifactOrProof: string; // Manh mối / Vật chứng có thể thu thập (Vật thể cụ thể hoặc ghi chép ngọc giản)
  linkedPlotHook: string; // Móc xích cốt truyện chính (Nhân vật chính thu hoạch và kết nối thông tin gì)
  triangulationPartners?: string[]; // Gợi ý các nhân vật/manh mối khác có thể đối chiếu (A + B => Chân tướng)
  authorWritingTip?: string; // Gợi ý cách viết phân cảnh cho tác giả
}

export interface ClueTriangulationResult {
  investigationTitle: string;
  charactersInvolved: string[];
  locationsSpan: string[];
  timelineReconstruction: string;
  theHiddenTruth: string; // Chân tướng kinh hoàng được xâu chuỗi từ các mảnh ghép rời rạc
  mainCharacterDiscoveryBeat: string; // Khoảnh khắc nhân vật chính xâu chuỗi thông tin (Aha moment)
  storyImpactAndDramaticPayoff: string; // Tác động bước ngoặt tới mạch truyện chính
  sceneDraftPrompt: string; // Đoạn trích dẫn hoặc mẫu văn phân cảnh tiểu thuyết
}

export interface ClueTriangulationConfig {
  selectedClueIds: string[];
  mainCharacterGoal: string;
  investigationContext: string;
  discoveryStyle: 'deductive_reasoning' | 'sudden_enlightenment' | 'interrogation_breakthrough' | 'accidental_overlap';
}

export interface VoiceConfig {
  enabled: boolean;
  voiceURI: string | null;
  rate: number;
  pitch: number;
  aiVoice?: string;
}

// ================= SPIRIT BEAST & DEMON BEAST SYSTEM TYPES =================
export type BeastBloodlineTier =
  | 'Phàm Thú / Dã Thú (Chưa Khai Trí)'
  | 'Linh Thú / Yêu Thú Thường (Hạ - Trung - Thượng Phẩm)'
  | 'Biến Dị Yêu Thú / Dị Chủng Thượng Cổ'
  | 'Vương Huyết Yêu Thú (Hậu Duệ Thần Thú / Giao Long / Phượng Điểu)'
  | 'Thuần Huyết Thần Thú (Tứ Linh: Long - Hổ - Tước - Vũ / Côn Bằng / Kỳ Lân)'
  | 'Hồng Hoang Hung Thú / Hỗn Độn Ma Thú (Thao Thiết / Cùng Kỳ / Hỗn Độn)';

export type BeastRealmTier =
  | 'Nhất Giai (Sơ Khai Luyện Khí)'
  | 'Nhị Giai (Thông Linh Trúc Cơ)'
  | 'Tam Giai (Ngưng Đan Kết Tinh)'
  | 'Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)'
  | 'Ngũ Giai (Yêu Vương Hoàn Toàn Hóa Người - Hóa Thần)'
  | 'Lục Giai / Thất Giai (Yêu Hoàng Thống Lĩnh - Luyện Hư / Hợp Thể)'
  | 'Bát Giai / Cửu Giai (Yêu Đế / Yêu Thần Cực Đạo - Đại Thừa / Độ Kiếp)'
  | 'Chân Linh Thái Cổ / Thần Thú Khai Thiên';

export type BeastContractType =
  | 'Bình Đẳng Huyết Khế (Cùng Sinh Cùng Tử / Chia Sẻ Tu Vi)'
  | 'Chủ Nô Linh Khế (Nắm Giữ Mệnh Hồn / Tuyệt Đối Phục Tùng)'
  | 'Cộng Sinh Huyết Mạch (Dung Hợp Thần Thông / Nhân Thú Hợp Nhất)'
  | 'Hộ Tông / Hộ Đạo Thần Thú Khế (Thủ Hộ Viễn Cổ)';

export interface SpiritBeastItem {
  id: string;
  name: string;
  species: string;
  bloodlineTier: BeastBloodlineTier | string;
  realmTier: BeastRealmTier | string;
  element: string;
  habitat: string;
  appearance: string;
  innateAbilities: Array<{
    name: string;
    description: string;
  }>;
  combatRole: 'Tiên Phong Cận Chiến' | 'Pháp Thuật Oanh Tạc' | 'Tọa Kỵ Phi Hành' | 'Trinh Sát & Ảo Thuật' | 'Hộ Vệ & Khiên Chắn' | 'Trị Liệu & Tầm Bảo';
  temperament: string;
  contractType?: BeastContractType | string;
  assignedCharacterId?: string;
  evolutionPath: string;
  backstory: string;
}

export interface BeastEvolutionSimulation {
  beastName: string;
  originalRealm: string;
  targetRealm: string;
  catalyst: string;
  evolutionNarrative: string;
  humanoidAppearance?: string;
  newAbilitiesUnlocked: string[];
  powerSurgeDescription: string;
  authorNotes: string;
}

export interface BeastTamingMethod {
  id: string;
  name: string;
  contractType: BeastContractType | string;
  description: string;
  ritualSteps: string[];
  requiredItems: string[];
  prosAndCons: {
    pros: string;
    cons: string;
    backfireDanger: string;
  };
}

export interface BeastTamingSimulationResult {
  beastName: string;
  beastRank: string;
  strategyUsed: string;
  contractFormed: string;
  captureNarrative: string;
  contractSealingMoment: string;
  bondStrength: string;
  battleStorySegment: string;
  authorWritingTips: string;
}

export interface BeastNurtureSimulationResult {
  beastName: string;
  feedingRegimen: string;
  trainingProcess: string;
  physicalTransformation: string;
  bloodlinePurityIncrease: string;
  newlyAwakenedSkill: {
    name: string;
    description: string;
  };
  loyaltyMilestone: string;
  novelSnippet: string;
}

export interface BeastEcologyTerritory {
  id: string;
  name: string;
  dangerLevel: 'Nguy Hiểm' | 'Tử Địa' | 'Tuyệt Cấm Chi Vực' | 'Thượng Cổ Di Tích';
  dominantSpecies: string;
  landscapeDescription: string;
  naturalResources: string; // Kỳ trân dị bảo, thảo dược, khoáng thạch
  legendOrMystery: string; // Truyền thuyết hoặc hiểm họa cấm chế
}

// ================= REALM LOCATIONS & GROTTO DWELLINGS =================
export type LocationTier =
  | 'Phàm Trần Kỳ Cảnh (Hồng Trần Khí Mỏng)'
  | 'Tu Chân Sơn Mạch & Linh Địa (Nhất - Tam Phẩm)'
  | 'Thánh Địa Tông Môn & Cấm Sơn (Tứ - Lục Phẩm)'
  | 'Vô Sinh Cấm Khu & Thâm Uyên Hung Địa (Thất - Cửu Phẩm)'
  | 'Thái Cổ Thần Vực & Tiên Giới Di Lạc (Tiên Phẩm Vô Thượng)';

export interface LocationItem {
  id: string;
  name: string;
  tier: LocationTier | string;
  category: 'Thánh Địa Tông Môn' | 'Hiểm Địa Cấm Khu' | 'Thành Thị Phồn Hoa' | 'Sơn Mạch Nguyên Sinh' | 'Hải Vực Thâm Uyên' | 'Hư Không Vực Ngoại';
  spiritEnergyDensity: string;
  terrainAndWeather: string;
  dominantForces: string;
  naturalTreasures: string[];
  dangerLevel: 'An Toàn' | 'Nguy Hiểm Cấp B' | 'Nguy Hiểm Cấp A' | 'Cực Nguy Cấp S' | 'Thập Tử Vô Sinh SSS';
  description: string;
  loreAndHistory: string;
}

export type GrottoTier =
  | 'Hạ Phẩm Thạch Động (Luyện Khí / Tán Tu)'
  | 'Trung Phẩm Linh Động (Trúc Cơ / Nội Môn)'
  | 'Thượng Phẩm Chân Nhân Động Phủ (Kim Đan Kỳ)'
  | 'Cực Phẩm Đạo Quân Động Thiên (Nguyên Anh / Hóa Thần)'
  | 'Thái Cổ Tiên Phủ / Giới Tử Động Thiên (Luyện Hư / Hợp Thể / Đại Thừa)'
  | 'Hỗn Độn Thần Cung / Vạn Cổ Tiên Điện (Chân Tiên Cực Đạo)';

export interface GrottoDwellingItem {
  id: string;
  name: string;
  tier: GrottoTier | string;
  locationName: string;
  spiritVeinType: string;
  timeDilationRate: string;
  chambers: Array<{
    name: string;
    purpose: string;
    features: string;
  }>;
  defensiveArrays: string;
  specialFacilities: string[];
  assignedCharacterId?: string;
  description: string;
}

export type SecretRealmTier =
  | 'Hạ Phẩm Thí Luyện Bí Cảnh (Trúc Cơ / Ngũ Hành)'
  | 'Trung Phẩm Cổ Phái Di Tích (Kim Đan / Đại Trận)'
  | 'Thượng Phẩm Hư Không Mảnh Vỡ (Nguyên Anh / Hóa Thần)'
  | 'Tuyệt Thế Cổ Tiên Ma Chiến Trường (Luyện Hư / Hợp Thể)'
  | 'Thái Sơ Hỗn Độn Vực / Tiên Thiên Thần Vực (Đại Thừa / Chân Tiên)';

export interface SecretRealmItem {
  id: string;
  name: string;
  tier: SecretRealmTier | string;
  element?: string;
  recommendedRealm?: string;
  openingCycle: string;
  entryRestrictions: string;
  guardianBeasts?: string[];
  trialsAndHazards: string[];
  ultimateTreasures: string[];
  survivalRate: string;
  environmentDescription: string;
  backstory: string;
}

export interface SecretRealmExplorationResult {
  characterName: string;
  realmName: string;
  goal: string;
  encounterNarrative: string;
  trialOvercome: string;
  treasureLooted: string;
  breakthroughOrInjury: string;
  authorPlotHooks: string;
}

export interface GrottoCultivationSimulationResult {
  characterName: string;
  grottoName: string;
  cultivationYears: string;
  externalTimeElapsed: string;
  breakthroughStage: string;
  pillOrTreasureUsed: string;
  enlightenmentInsight: string;
  tribulationPhenomenon: string;
  proseNarrative: string;
}

export type CitadelTier =
  | 'Phàm Trần Hùng Thành (Cấp 1 - Phàm nhân / Hoàng triều đế chế)'
  | 'Hạ Phẩm Tiên Thành & Tán Tu Phường Thị (Cấp 2 - Luyện Khí / Trúc Cơ)'
  | 'Trung Phẩm Cổ Thành & Châu Phủ Đô Hội (Cấp 3 - Kim Đan Kỳ)'
  | 'Thượng Phẩm Thần Thành & Đại Vực Cốt Lõi (Cấp 4 - Nguyên Anh / Hóa Thần)'
  | 'Cực Phẩm Phù Không Thành & Trấn Giới Cổ Quan (Cấp 5 - Luyện Hư / Hợp Thể)'
  | 'Thần Thoại Tiên Đô & Thái Cổ Thiên Thành (Cấp 6 - Đại Thừa / Chân Tiên)';

export type CitadelCategory =
  | 'Đấu Giá & Mậu Dịch Đô Hội'
  | 'Biên Giới Trấn Quan & Pháo Đài Chiến Tranh'
  | 'Lăng Không Phù Không Tiên Đô'
  | 'Hoàng Triều Đế Đô Khí Vận'
  | 'Tán Tu Thánh Địa Tự Do'
  | 'Hải Để Tiên Thành'
  | 'Hắc Thị & Ma Đạo Ẩn Thành'
  | 'Thái Cổ Thiên Đình Tiên Cung';

export interface CitadelItem {
  id: string;
  name: string;
  tier: CitadelTier | string;
  category: CitadelCategory | string;
  locationRegion: string;
  population: string;
  defensiveArray: {
    name: string;
    tier: string;
    features: string;
    maintenanceCost: string;
  };
  rulingFaction: {
    name: string;
    leaderName: string;
    realmLevel: string;
    stance: string;
  };
  keyDistricts: Array<{ name: string; type: string; description: string }>;
  lawsAndTaboos: string[];
  entryFeeAndTaxes: string;
  specialResources: string[];
  description: string;
  historyAndLegends: string;
}

export interface CitadelEventSimulationResult {
  citadelName: string;
  characterName: string;
  eventType: string;
  goal: string;
  situationOverview: string;
  defenseDeployment: string;
  characterActionAndBattle: string;
  dramaticClimax: string;
  outcomeAndCasualties: string;
  rewardsAndReputation: string;
  authorPlotHooks: string;
  chapterStorySegment: string;
}

// ================= SECT, FACTION, VILLAIN & SPY SYSTEM TYPES =================
export type SectCamp =
  | 'Chính Đạo (Orthodox / Tiên Môn)'
  | 'Ma Đạo & Tà Tu (Demonic / Tà Phái)'
  | 'Yêu Tộc & Dị Tộc (Monster & Alien Clan)'
  | 'Trung Lập & Tán Tu Minh (Neutral & Rogue Alliance)'
  | 'Ẩn Thế Cổ Tộc & Cấm Địa Thế Lực (Ancient Clans & Forbidden Zones)';

export type SectGrade =
  | 'Bát Phẩm - Thất Phẩm (Sơn Đầu Bang Phái / Hương Trấn Thế Lực)'
  | 'Lục Phẩm - Ngũ Phẩm (Châu Phủ Trung Môn / Kim Đan Tọa Trấn)'
  | 'Tứ Phẩm - Tam Phẩm (Đại Vực Hùng Bá / Nguyên Anh & Hóa Thần)'
  | 'Nhị Phẩm - Nhất Phẩm Tông Môn (Đỉnh Cấp Cự Phách / Luyện Hư & Hợp Thể)'
  | 'Bất Hủ Thánh Địa & Đạo Thống Thái Cổ (Đại Thừa Tiên Khí / Trấn Giới Vĩnh Hằng)';

export interface SectItem {
  id: string;
  name: string;
  camp: SectCamp | string;
  grade: SectGrade | string;
  headquarters: string;
  founderAndLegacy: string;
  leadership: {
    patriarch: string;
    sectMaster: string;
    lawEnforcementElder: string;
    discipleCount: string;
  };
  heritageScriptures: {
    name: string;
    grade: string;
    summary: string;
  }[];
  sacredArtifacts: {
    name: string;
    rank: string;
    power: string;
  }[];
  guardianArray: {
    name: string;
    tier: string;
    powerDescription: string;
  };
  specialties: string[];
  rulesAndPrecepts: string[];
  politicalStance: {
    allies: string[];
    bitterEnemies: string[];
    currentCrisis: string;
  };
  description: string;
}

export interface VillainItem {
  id: string;
  name: string;
  title: string;
  category: string;
  cultivationRealm: string;
  sectAffiliation: string;
  publicFacade: string;
  trueDarkNature: string;
  deadlySchemes: string[];
  fatalWeakness: string;
  signatureViciousMove: string;
  nemesisGrudge: string;
}

export interface SpyItem {
  id: string;
  name: string;
  disguisedRole: string;
  actualLoyalty: string;
  infiltratedSect: string;
  category: string;
  missionObjective: string;
  camouflageTechnique: string;
  secretTokenOrSignal: string;
  exposureRiskLevel: string;
  innerConflict: string;
  fatalFlaw: string;
}

export interface FactionConflictSimulationResult {
  scenarioTitle: string;
  scenarioType: string;
  sectName: string;
  spyOrVillainName: string;
  protagonistName: string;
  situationOverview: string;
  thePlotScheme: string;
  turningPointAndBetrayal: string;
  battleActionClimax: string;
  resolutionAndCasualties: string;
  authorPlotHooks: string[];
  novelSceneSnippet: string;
}

// ================= SPIRIT CRYSTALS, TREASURES & ARTIFACTS =================
export interface SpiritCrystalItem {
  id: string;
  name: string;
  grade: string;
  attribute: string;
  appearance: string;
  energyPurity: string;
  marketValue: string;
  primaryUses: string[];
  miningLocation: string;
  rarityAndDanger: string;
  novelEffects: string;
}

export interface NaturalTreasureItem {
  id: string;
  name: string;
  category: string;
  tier: string;
  growthYears: string;
  naturalPhenomenon: string;
  guardianMonster: string;
  collectionMethod: string;
  miraculousEffect: string;
  sideEffectsOrDangers: string;
  legendaryOrigin: string;
}

export interface AncientArtifactItem {
  id: string;
  name: string;
  originalName: string;
  era: string;
  state: string;
  appearance: string;
  unsealingCondition: string;
  spiritEntity: {
    hasSpirit: boolean;
    spiritName?: string;
    spiritPersonality?: string;
  };
  ancientSecretOrTechnique: string;
  activePower: string;
  backstoryAndDestruction: string;
  assignedCharacterId?: string;
}

export interface TreasureAppraisalSimulation {
  treasureName: string;
  itemType: 'Tinh Thạch' | 'Thiên Tài Địa Bảo' | 'Cổ Vật Viễn Cổ';
  appraiserName: string;
  originalAppearance: string;
  appraisalProcess: string;
  awakeningPhenomenon: string;
  trueIdentityRevealed: string;
  estimatedValueAndImpact: string;
  authorPlotSnippet: string;
}

export interface SectPositionDetail {
  id: string;
  rankName: string;
  tier: string;
  levelNumber?: number;
  requiredCultivationRealm?: string;
  scopeOfAuthority: string;
  keyResponsibilities?: string[];
  resourceMonthlyStipend: string;
  stipendDetails?: {
    spiritStones: string;
    pills: string;
    meritPoints?: string;
    specialPrivileges?: string;
  };
  residenceArea: string;
  advancementCriteria: string;
  clothingAndToken: string;
  tokenAndRobes?: {
    tokenMaterial: string;
    robeColor: string;
    insignia: string;
  };
  commonInternalCrimes: string;
  disciplinePenalty?: string;
  promotionCeremonyNarrative?: string;
}

export interface CitadelPositionDetail {
  id: string;
  rankName: string;
  tier: string;
  powerAndJurisdiction: string;
  remunerationAndPrivileges: string;
  garrisonPost: string;
  promotionRequirement: string;
  insigniaAndUniform: string;
}

export interface QuestItem {
  id: string;
  title: string;
  questLine: string;
  rankGrade: string;
  issuerLocationOrSect: string;
  requiredRealm: string;
  timeLimit: string;
  dangerFactor: string;
  missionObjectives: string[];
  targetAntagonistOrObstacle: string;
  rewards: {
    sectContributionPoints?: string;
    spiritStones: string;
    pillsOrArtifacts: string;
    reputationGain: string;
    specialAccess?: string;
  };
  failurePenalty: string;
  hiddenPlotHook: string;
}

export interface QuestMissionExecutionSimulation {
  missionTitle: string;
  characterName: string;
  characterInitialPosition: string;
  questRank: string;
  departureAndPreparation: string;
  unforeseenCrisis: string;
  tacticalBreakthrough: string;
  missionOutcome: string;
  sectOrCitadelPromotion: {
    promotedToRank: string;
    newPrivileges: string;
    publicReaction: string;
  };
  chapterStorySegment: string;
}

// ================= IMPERIAL NATIONS & GEOPOLITICS =================
export interface NationItem {
  id: string;
  name: string;
  canonicalTitle: string;
  tier: string;
  flagAndImperialEmblem: string;
  capitalCity: string;
  sovereignRuler: {
    title: string;
    name: string;
    realm: string;
    reignMotto: string;
  };
  governancePhilosophy: string;
  territoryAndGeography: string;
  nationalHeritageTreasure: string;
  nationalGuardianArray: string;
  allies: string[];
  hostileEnemies: string[];
  tributaryVassals: string[];
  internalCrises: string[];
  diplomaticOverview: string;
  description: string;
}

export interface NationDiplomaticSimulation {
  scenarioTitle: string;
  simulationType: string;
  initiatorNation: string;
  targetNation: string;
  diplomaticContext: string;
  negotiationOrConfrontation: string;
  turningPointOrSecretDeal: string;
  outcomeAndConsequences: string;
  authorPlotHooks: string[];
  novelProseSegment: string;
}

// ================= SUPREME CULTIVATION SYSTEMS =================
export interface SupremeCultivationTier {
  tierNumber: number;
  tierName: string;
  subStages: string[];
  realmEssence: string;
  physicalManifestation: string;
  spiritualVeinOperation: string;
  breakthroughPhenomenon: string;
  mortalLifespan: string;
  combatAura: string;
  tabooAndDemonDanger: string;
}

export interface SupremeCultivationMethodItem {
  id: string;
  name: string;
  path: 'Luyện Thể Ngoại Công' | 'Luyện Khí Nội Công' | 'Thần Ma Song Tu' | 'Hỗn Độn Nguyên Sơ' | 'Kiếm Tu Thuần Đạo' | 'Tà Ma Ma Tu';
  gradeLevel: 'Phàm Giai Cực Hạn' | 'Linh Giai Bách Luyện' | 'Địa Giai Huyền Diệu' | 'Thiên Giai Tuyệt Thế' | 'Đạo Thống Đế Kinh' | 'Hồng Hoang Bất Hủ' | 'Hỗn Độn Khai Thiên';
  originAndHeritage: string;
  corePhilosophy: string;
  bodyTransformationMechanism: string;
  energyCircuitRoute: string;
  innateSecretAbilities: Array<{
    name: string;
    tierRequired: string;
    description: string;
  }>;
  requiredCatalysts: string[];
  tiers: SupremeCultivationTier[];
  authorWritingTips: string[];
}

export interface CultivationBreakthroughSimulation {
  characterName: string;
  methodName: string;
  fromTier: string;
  toTier: string;
  catalystsUsed: string[];
  environmentalAtmosphere: string;
  breakthroughProcess: string;
  tribulationPhenomenon: string;
  innerDemonEncounter: string;
  physicalTransformationDetails: string;
  ultimatePowerBurst: string;
  authorProseSnippet: string;
}

// ================= SWORD DAO SYSTEM TYPES =================
export interface SwordDaoStance {
  orderNumber: number;
  stanceName: string;
  intentLevel: string;
  mantraOrIncantation?: string;
  qiMovementPath: string;
  footworkAndKinetic?: string;
  physicalMovementAndFootwork: string;
  swordFormMechanics?: string;
  visualPhenomenon: string;
  offensiveLethality: string;
  defensiveVersatility: string;
  hardcoreTrainingMethod?: string;
  enlightenmentKey: string;
  fatalFlawIfRushed: string;
}

export interface SwordDaoCanonItem {
  id: string;
  name: string;
  philosophy: string;
  gradeLevel: string;
  swordRankRequirements: string;
  originAndCreator: string;
  coreSwordIntent: string;
  absoluteSwordDomain?: string;
  trainingRegimen: {
    basicConditioning: string;
    heartTestingTrial: string;
    swordEnergyAwakening: string;
  };
  stances: SwordDaoStance[];
  authorWritingNotes: string;
}

export interface SwordEnlightenmentSimulation {
  characterName: string;
  canonName: string;
  stanceName: string;
  opponentName?: string;
  crisisTrigger: string;
  innerComprehension: string;
  qiAndSwordExecution: string;
  environmentalDestruction: string;
  climacticStrikingMoment: string;
  proseSegment: string;
}

// ================= SPELL DAO & MUDRAS =================
export interface SpellStance {
  orderNumber: number;
  spellName: string;
  tierRank: string;
  elementalAffinity: string;
  handMudraFormula: string;
  incantationChant: string;
  meridianCirculation: string;
  visualPhenomenon: string;
  destructiveScale: string;
  enlightenmentInsight: string;
  backfireDanger: string;
}

export interface SpellDaoCanonItem {
  id: string;
  name: string;
  affinity: string;
  gradeLevel: string;
  originAndLineage: string;
  corePrinciple: string;
  cultivationRequirements: {
    spiritualAuraRequirement: string;
    mentalFocusRequirement: string;
    elementalComprehension: string;
  };
  spells: SpellStance[];
  authorNotes: string;
}

export interface SpellEnlightenmentSimulation {
  characterName: string;
  canonName: string;
  spellName: string;
  opponentName?: string;
  crisisContext: string;
  mudraAndChantProcess: string;
  elementalGathering: string;
  spellDetonation: string;
  dramaticConsequences: string;
  proseSegment: string;
}

// ================= TALISMAN DAO & RUNES =================
export interface TalismanMethodItem {
  orderNumber: number;
  talismanName: string;
  gradeLevel: string;
  brushMovementScripture: string;
  cinnabarAndInkRecipe: string;
  talismanPaperType: string;
  incantationAndSealFormula: string;
  qiInjectionMechanism: string;
  activationTrigger: string;
  effectMagnitude: string;
  enlightenmentInsight: string;
  backfireRisk: string;
}

export interface TalismanDaoCanonItem {
  id: string;
  name: string;
  branchCategory: string;
  gradeLevel: string;
  originAndLineage: string;
  fundamentalPhilosophy: string;
  craftingSanctuaryRules: {
    altarPreparation: string;
    mentalStillnessRequirement: string;
    auspiciousTiming: string;
  };
  talismans: TalismanMethodItem[];
  authorNotes: string;
}

// Chiêu thức thi triển vẽ phù & bộ pháp động tác
export interface TalismanStanceTechnique {
  id: string;
  name: string;
  category: 'Khai Bút' | 'Họa Mạch' | 'Điểm Nhãn' | 'Định Hình' | 'Bộc Phù' | 'Tuyệt Sát';
  rankLevel: 'Sơ Cấp' | 'Trung Cấp' | 'Cao Cấp' | 'Đỉnh Giai' | 'Siêu Cấp' | 'Thần Thánh';
  poeticTitle: string;
  footworkMovement: string;        // Bộ pháp di chuyển (Đạp Cương Đẩu Bộ, Cửu Cung Bát Quái...)
  handSealAndGrip: string;         // Thủ ấn & thế cầm bút (Chính Phong, Trắc Phong, Điểm Chỉ...)
  brushTrajectory: string;         // Đường nét & quỹ đạo nét bút
  meridianQiOperation: string;     // Vận hành kinh mạch & huyệt vị (Đan Điền, Đốc Mạch, Lao Cung...)
  incantationSound: string;        // Khẩu quyết chân ngôn & âm ba
  tacticalCombatUsage: string;     // Ứng dụng thực chiến (Công, Thủ, Phong Tỏa, Na Di...)
  visualAuraDescription: string;   // Mô tả hình ảnh & dị tượng khi phát chiêu
}

// Các phương thức vẽ phù lục (Drawing Modalities & Schools)
export interface TalismanDrawingMethod {
  id: string;
  name: string;
  schoolName: string;
  speedRating: 'Chậm (Chuẩn Tế)' | 'Nhanh (Thực Chiến)' | 'Cực Tốc (Niệm Khởi)' | 'Tức Khắc (Vô Thời Gian)';
  carrierMedium: string;           // Chất liệu môi giới (Hoàng Chỉ, Da Yêu Thú, Hư Không, Huyết Tinh...)
  essenceMechanism: string;        // Cơ chế vận hành cốt lõi
  executionDynamics: string;       // Cách thức triển khai & vận động
  prosAndCons: {
    advantages: string;
    disadvantages: string;
  };
  enlightenmentKey: string;        // Bí quyết đốn ngộ của phương pháp này
  famousPractitioners: string;
}

// Cấp bậc thuật pháp phù lục (Cultivation Tiers from Low to Supreme & Divine)
export interface TalismanTechniqueRank {
  id: string;
  tierNumber: number;
  tierName: 'Sơ Cấp' | 'Trung Cấp' | 'Cao Cấp' | 'Đỉnh Giai' | 'Siêu Cấp' | 'Thần Thánh';
  masteryTitle: string;            // Hoàng Chỉ Phù Sư -> Hỗn Độn Phù Thần
  cultivationRealmReq: string;     // Cảnh giới yêu cầu
  trainingAndTempering: string;    // Quá trình rèn luyện gian khổ
  enlightenmentEpiphany: string;   // Ngộ tính & đốn ngộ đột phá
  meridianCapacity: string;        // Sức chịu đựng kinh mạch & thần thức
  stances: TalismanStanceTechnique[];
  sampleTalismans: TalismanMethodItem[];
  backfireRisk: string;            // Hậu quả khi thất bại / phản phệ
}

export interface TalismanEnlightenmentSimulation {
  characterName: string;
  talismanCanonName: string;
  talismanName: string;
  opponentName?: string;
  drawingContext: string;
  brushTechniqueAndSoulFocus: string;
  runeGlowAndHeavenlyEcho: string;
  talismanDetonationOrDefense: string;
  battlefieldShockwave: string;
  proseSegment: string;
}


// ================= DIVINE PANTHEON & COSMOLOGY =================
export interface DivineEntity {
  id: string;
  name: string;
  trueDivineTitle: string;
  tier: 'Nguyên Sơ Cổ Thần' | 'Khai Thiên Tích Địa Thần' | 'Đại Đạo Hóa Thân' | 'Thiên Đế Vô Thượng' | 'Thượng Cổ Thần Linh' | 'Ma Thần Viễn Cổ' | 'Hư Không Ngoại Thần';
  pantheonFaction: 'Hỗn Độn Cổ Tộc' | 'Thiên Đạo Thần Tộc' | 'Hồng Hoang Chư Tiên' | 'U Minh Ma Thần' | 'Vực Ngoại Tà Thần' | 'Nhân Đạo Thần Thánh';
  cosmicDomain: string;
  primordialArtifact: string;
  originStory: string;
  divineFormAndAura: string;
  worshipCultOrTaboos: string;
  activeInfluenceOnMortalRealm: string;
  epochEraActive: string;
  backstoryAndFall: string;
}

export interface CosmologicalEpochEvent {
  id: string;
  epochName: string;
  eventTitle: string;
  timelineOrder: number;
  cosmicAgeDuration: string;
  initiatorDeities: string[];
  cosmicGenesisPhenomenon: string;
  cataclysmicClimax: string;
  cosmicShiftOutcome: string;
  legacyVestigesInMortalRealm: string;
  authorNarrativeHooks: string[];
}

export interface DivineChronicleSimulation {
  characterName?: string;
  deityName: string;
  epochEventName: string;
  sceneType: 'CreationGenesis' | 'DivineBattle' | 'TombAwakening' | 'GodhoodInheritance';
  cosmicAtmosphere: string;
  divineClashOrManifestation: string;
  mortalOrHeroInteraction: string;
  proseScene: string;
  novelHooks: string[];
}

// ================= MASTER CULTIVATION SPINE & NOVEL NARRATIVE ANCHOR =================
export interface MasterCultivationStage {
  id: string;
  stageOrder: number;
  stageName: string;
  realmTierTitle: string;
  lifespanSpan: string;

  bodyTempering: {
    stageTitle: string;
    meridianTransformation: string;
    boneAndMarrowRefinement: string;
    sensoryAura: string;
  };
  swordDao: {
    stageTitle: string;
    swordIntentTier: string;
    flyingSwordOrBladeArt: string;
    combatApplication: string;
  };
  spellDao: {
    spellTier: string;
    representativeSpells: string[];
    chantAndMudras: string;
  };
  talismanDao: {
    grade: string;
    typicalTalismans: string[];
    drawingPrinciple: string;
  };
  pillAndAlchemy: {
    essentialPills: string[];
    furnaceAndHerbRequirement: string;
  };
  treasureAndArmament: {
    gearTier: string;
    materialsNeeded: string[];
  };
  socialAndSectLevel: {
    factionTier: string;
    hierarchyStatus: string;
    territoryRealm: string;
  };
  pantheonAndCosmicEcho: {
    divineInfluence: string;
    cosmicEpochMemory: string;
  };
  tribulationAndHeartDemon: {
    tribulationType: string;
    heartDemonSymptom: string;
    mortalityRisk: string;
  };

  novelStoryBeat: {
    suggestedChapters: string;
    narrativeRole: string;
    coreConflict: string;
    protagonistGoal: string;
    archetypalAntagonists: string[];
    incitingIncidentTemplate: string;
    dramaticCrucible: string;
    breakthroughMomentum: string;
    mapTransitionTrigger: string;
    sceneWritingPrompts: string[];
  };
}

export interface NovelMasterSpinePlan {
  id: string;
  novelTitle: string;
  protagonistName: string;
  storyTone: string;
  coreWorldMapProgression: string;
  goldenFingerOrDestiny: string;
  spineStages: Array<{
    stageOrder: number;
    stageName: string;
    chapterSpan: string;
    mainObjective: string;
    keyPlotConflict: string;
    crossDisciplinaryCombo: string;
    divineEncounter: string;
    breakthroughCatharsis: string;
    authorWritingTips: string;
  }>;
}

export interface SpineSceneDraftResult {
  sceneTitle: string;
  stageName: string;
  characterName: string;
  environmentalStakes: string;
  disciplinesManifested: {
    bodyTemperingAction: string;
    swordTechniqueAction: string;
    spellCastingAction: string;
    talismanActivation: string;
    pillConsumption: string;
  };
  tribulationClimax: string;
  novelProseScene: string;
  authorFollowupHooks: string[];
}

// =========================================================================
// MẠNG LƯỚI KẾT NỐI ĐA MẢNG & KHO MẪU TRUYỆN ĐƠN LẺ / BỘ DỆT TRUYỆN TỰ NHIÊN
// (OMNIVERSE SYNAPTIC LORE NETWORK, STANDALONE STORY VIGNETTES & NATURAL NOVEL WEAVER)
// =========================================================================

export type LoreDomain =
  | 'CultivationSpine'    // Tuyến Mạch Cảnh Giới
  | 'SwordDao'            // Kiếm Đạo
  | 'SpellDao'            // Thuật Pháp
  | 'TalismanDao'         // Phù Lục
  | 'PantheonCosmology'   // Thần Phả & Vũ Trụ
  | 'Alchemy'             // Đan Dược
  | 'Weapons'             // Binh Khí / Pháp Bảo
  | 'Beasts'              // Yêu Thú / Linh Thú
  | 'Sects'               // Tông Môn / Ma Đạo
  | 'Nations'             // Tiên Triều / Quốc Gia
  | 'Characters'          // Nhân Vật / Linh Căn
  | 'Realms'              // Địa Danh / Bí Cảnh
  | 'StoryVignette';      // Mẩu Truyện Đơn Lẻ / Tàn Đoạn Giai Thoại

export type RelationType =
  | 'causes'              // Dẫn tới / Khởi phát
  | 'requires'            // Yêu cầu điều kiện
  | 'enhances'            // Tương hỗ bổ trợ
  | 'opposes'             // Khắc chế / Tử địch
  | 'inherits'            // Kế thừa di vật / truyền thừa
  | 'conceals'            // Ẩn giấu bí mật
  | 'awakens'             // Thức tỉnh tiềm năng / dị tượng
  | 'drops';              // Rơi ra cơ duyên / chiến lợi phẩm

export interface LoreNetworkNode {
  id: string;
  domain: LoreDomain;
  title: string;
  subtitle: string;
  tags: string[];
  essenceDescription: string;
  stageLevel?: string;
  powerScore?: number;
  icon: string;
  color: string;
  metadata?: Record<string, any>;
}

export interface LoreNetworkEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relation: RelationType;
  label: string;
  narrativeCausality: string; // Giải thích mạch nhân quả tự nhiên liên kết 2 nút này
}

// MẪU TRUYỆN ĐƠN LẺ / TÀN ĐOẠN GIAI THOẠI (STANDALONE STORY VIGNETTES & LORE SEEDS)
export type VignetteCategory =
  | 'GiaiThoaiDanGian'      // Lời đồn quán rượu / Giai thoại hồng trần
  | 'TanDoanBiCanh'        // Trích đoạn nhật ký thám hiểm bí cảnh vỡ vụn
  | 'GiaoTranhBatNgo'      // Mẩu phục kích / Đụng độ ngẫu nhiên
  | 'TruyenThuyetLaoQuai'  // Ký ức tàn hồn lão quái ngàn năm
  | 'NgoNghiengDuyenPhan'  // Kỳ ngộ nhặt bảo / Cơ duyên éo le
  | 'NhanTinhTheThai'      // Tranh đoạt phản trắc / Tình sâu nghĩa nặng
  | 'DiTuongThienKiep'     // Biến cố thiên tai dị tượng giáng thế
  | 'BiMatTongMon';        // Thâm cung bí sử môn phái

export interface StoryVignetteItem {
  id: string;
  title: string;
  category: VignetteCategory;
  loreTags: string[];
  linkedDomains: LoreDomain[];
  recommendedRealm: string;
  atmosphericMood: 'U tối bí ẩn' | 'Nhiệt huyết kịch tính' | 'Hài hước cơ duyên' | 'Bi tráng bi thương' | 'Nhẹ nhàng thanh thoát' | 'Kinh hoàng rùng rợn';
  vignetteProse: string;       // Đoạn trích truyện đơn lẻ 250 - 600 từ hoàn chỉnh, có nhân vật, tình huống, cảm xúc
  plotSeedsAndSecrets: string[]; // Các hạt mầm tình tiết có thể nảy mầm để mở rộng truyện
  naturalHookQuestions: string[]; // Các câu hỏi kích thích trí tưởng tượng ("Tại sao kiếm lại rỉ?", "Ai đã phản bội?")
  authorWeavingTips: string;   // Hướng dẫn tác giả ghép mẩu truyện này vào mạch chính một cách tự nhiên
}

// KẾT QUẢ DỆT TRUYỆN TỰ NHIÊN (NATURAL NOVEL WEAVE RESULT)
export interface NaturalStoryWeaveResult {
  chapterSceneTitle: string;
  selectedNodesUsed: Array<{
    nodeId: string;
    title: string;
    domain: LoreDomain;
    wovenRole: string; // Vai trò được lồng ghép trong phân cảnh
  }>;
  organicCausalChain: string;   // Phân tích chuỗi nhân quả tự nhiên: Tại sao các yếu tố này xuất hiện cùng nhau hợp lý
  narrativePacing: {
    incitingBeat: string;       // Điểm khởi đầu tự nhiên (không gượng ép)
    risingComplication: string; // Xung đột leo thang
    climaxEncounter: string;    // Đỉnh điểm chạm trán đa mảng
    lingeringAftermath: string; // Dư ba để lại mở sang chương mới
  };
  wovenProseStory: string;      // Áng văn xuôi tiểu thuyết liền mạch, giàu hình ảnh, sống động (1000 - 2000 từ)
  naturalFollowupPaths: Array<{
    directionTitle: string;
    plotHook: string;
  }>;
}

export interface MasterCreationPipelineConfig {
  characterId: string;
  customCharacterName?: string;
  spiritualRoot?: string;
  sectPositionId: string;
  sectName: string;
  spineStageId: string;
  cultivationMethodId: string;
  swordCanonId: string;
  swordStanceIndex: number;
  spellCanonId: string;
  spellIndex: number;
  talismanCanonId: string;
  talismanIndex: number;
  narrativeSetting: string;
  opponentOrObstacle: string;
  primaryConflict: string;
  narrativePacing: 'dramatic_climax' | 'breakthrough_tribulation' | 'strategic_duel' | 'sect_intrigue' | 'full_chapter';
  wordCountTarget: 'compact' | 'standard' | 'epic_chapter';
  literaryTone: string;
  subplotArcId?: string;
  subplotArcRole?: 'plant_seed' | 'harvest_payoff' | 'mention_echo';
}

export interface MasterCreationPipelineResult {
  pipelineTitle: string;
  characterFullSummary: string;
  sectStandingSummary: string;
  cultivationCircuitSummary: string;
  martialTrinitySummary: string;
  subplotIntertwinedSummary?: string;
  sceneDynamics: {
    settingAtmosphere: string;
    stakesAndMotivation: string;
    tacticalChoreography: string;
  };
  wovenProse: string;
  plotContinuationHooks: string[];
  chapterOutlineSuggested: Array<{ act: string; description: string }>;
}

export type SubplotForeshadowType = 
  | 'relic_token'        // Tàn vật, di bảo, ngọc bội, chìa khóa tàn khuyết
  | 'bloodline_debt'     // Ân oán gia tộc, huyết cừu phàm trần, duyên phận kiếp trước
  | 'sect_conspiracy'    // Nội gián, bí mật tông môn, quặng mỏ dị thường
  | 'anomaly_phenomenon' // Dị tượng thiên địa, sấm sét dị biến, tiếng chuông hư không
  | 'cipher_rhyme'       // Ca dao trẻ con, cổ tự tàn quyển, khẩu quyết điên khùng
  | 'forbidden_ruin'     // Cấm địa bí cảnh, di cốt đại năng, phong ấn rạn nứt
  | 'destined_npc';      // Nhân vật quái dị qua đường, đệ tử tạp dịch bí ẩn, khất cái tiên nhân

export interface SubplotArcItem {
  id: string;
  title: string;
  deceptiveFacade: string;          // Vỏ bọc tầm thường ban đầu (Tưởng là...)
  foreshadowType: SubplotForeshadowType;
  plantedStageId: string;           // Tầng phát sinh / gieo hạt
  plantedStageName: string;
  payoffStageId: string;            // Tầng thu hoạch / bùng nổ nhân quả
  payoffStageName: string;
  coreClueDetail: string;           // Dữ kiện ngầm cốt lõi (Manh mối giấu kín)
  mainPlotCatalystEffect: string;   // Tác dụng mắt xích thúc đẩy mạch chính liền mạch
  associatedCharactersOrFactions: string;
  seedScenePromptSnippet: string;   // Đoạn văn gieo hạt mẫu để lồng vào chương
  payoffScenePromptSnippet: string; // Đoạn văn bùng nổ nhân quả mẫu khi tới tầng bộc phát
  status?: 'dormant' | 'planted' | 'growing' | 'paid_off';
}

export interface SubplotGenerationConfig {
  plantedStageId: string;
  payoffStageId: string;
  coreKeywordOrItem: string;
  initialDeceptiveSetting: string;
  genre: string;
  protagonistName: string;
}

export interface SubplotGenerationResult {
  arc: SubplotArcItem;
  narrativeIntegrationTips: string[];
}

// ================= MICRO-STORY STRANDS & EPISODIC SUB-ARCS =================
// Các mạch truyện phân nhánh nhỏ hơn mạch chính (nhánh vi mô cục bộ, 1-3 hồi)

export type MicroArcCategory =
  | 'vendetta_local'          // Ân oán cục bộ / Trừng phạt tiểu nhân ngáng đường
  | 'micro_treasure'          // Tầm bảo vi mô / Nhặt đồ phế phẩm ở phường thị
  | 'serendipitous_encounter' // Kỳ ngộ duyên phận / Cứu nguy đền ơn tình cờ
  | 'technique_experiment'    // Thử nghiệm dị năng / Đột phá đan đạo dị biến
  | 'infiltration_recon'      // Dọ thám cơ mật / Trinh sát mật đạo
  | 'dao_heart_tribulation'   // Khảo nghiệm đạo tâm / Ký ức phàm trần
  | 'black_market_gamble'     // Đổ thạch đấu giá / Cược mạng hắc thị
  | 'sect_daily_slice';       // Sinh hoạt môn phái / Linh thú gây họa / Đời thường tu chân

export type MicroArcScope =
  | 'single_scene'     // 1 Phân cảnh nhanh gọn (Micro-Beat: 500-1000 chữ)
  | 'short_episode'    // 1 Chương trọn vẹn (Episodic: 1500-2500 chữ)
  | 'mini_arc_multi';  // Chuỗi 2-3 chương gắn kết (Multi-chapter: 3000-5000 chữ)

export interface MicroArcBranchBeat {
  beatOrder: number;
  beatTitle: string;
  narrativeFunction: 'inciting_incident' | 'rising_friction' | 'micro_climax' | 'resolution_harvest';
  sceneSummary: string;
  sceneDraftSnippet: string; // Đoạn văn mẫu gợi ý cho tác giả
}

export interface MicroStoryStrand {
  id: string;
  title: string;                               // Tên tiểu mạch truyện
  category: MicroArcCategory;                  // Thể loại vi mạch
  scope: MicroArcScope;                        // Quy mô độ dài
  parentSpineStageId?: string;                 // Thuộc cảnh giới / giai đoạn nào của mạch chính
  parentSubplotArcId?: string;                 // Hoặc gắn kết với nhánh phụ nào
  localTrigger: string;                        // Cơ duyên / Tình huống kích hoạt cục bộ
  protagonistMotivation: string;              // Động cơ tức thời của Main
  immediateObstacle: string;                   // Chướng ngại / Đối thủ trước mắt
  tacticalResolution: string;                  // Cách Main xử lý sắc sảo
  tangibleReward: string;                      // Chiến lợi phẩm hữu hình thu được
  anchorHookToMainPlot: string;                // Điểm neo kết nối ngược về Mạch Chính
  associatedNpcName: string;                   // Nhân vật phụ trực tiếp tham gia
  beats: MicroArcBranchBeat[];                 // 3-4 nhịp phát triển của nhánh nhỏ
  readyToInsertProseSnippet: string;           // Văn bản hoàn chỉnh sẵn sàng 1-Click chèn vào truyện
}

export interface MicroArcGenerationConfig {
  protagonistName: string;
  category: MicroArcCategory;
  scope: MicroArcScope;
  localSetting: string;
  immediateNeedOrTrouble: string;
  parentSpineStageId?: string;
  genre: string;
}

export interface MicroArcGenerationResult {
  strand: MicroStoryStrand;
  writingTechniqueTips: string[];
}

// =========================================================================
// PHƯƠNG HƯỚNG PHÁT TRIỂN & MẠCH NHÁNH LIÊN KẾT MẠCH CHÍNH
// (NARRATIVE TRAJECTORIES & BRANCH CONVERGENCE NEXUS)
// =========================================================================

export type TrajectoryArchetype =
  | 'orthodox_sect'          // Chính Đạo Tiên Sơn • Tông Môn Khai Tổ
  | 'deviant_asura'          // Ma Đạo Sát Phạt • Huyết Nhận Nghịch Thiên
  | 'rogue_polymath'         // Tán Tu Bách Nghệ • Ẩn Nhẫn Hắc Thị Phú Gia
  | 'imperial_sovereign'     // Tiên Triều Hoàng Đạo • Khai Quốc Tranh Bá
  | 'primordial_ancient'     // Viễn Cổ Thần Ma • Khảo Cổ Tầm Bí
  | 'hermit_vagabond';       // Tiêu Dao Hồng Trần • Trích Tiên Trò Chuyện Sơn Hà

export type BranchArcDomain =
  | 'allied_faction'         // Đồng Minh & Phe Phái Cùng Tiến
  | 'nemesis_opposition'     // Kình Địch & Đối Kháng Hệ Thống
  | 'calamity_crisis'        // Khủng Hoảng Thế Giới & Ma Triều
  | 'lineage_destiny'        // Thân Thế & Nhân Quả Cội Nguồn
  | 'forbidden_inheritance'; // Truyền Thừa Cấm Kỵ & Khảo Nghiệm

export interface TrajectoryMilestone {
  stageId: string;           // Liên kết tới spine_stage_1 ... spine_stage_8
  milestoneTitle: string;
  narrativeDilemma: string;  // Ngã rẽ tiến thoái lưỡng nan của nhân vật
  chosenDirectionPayoff: string; // Kết quả lựa chọn theo hướng này
  unlockedPowerOrFaction: string; // Quyền lực hoặc thần thông mở khóa
}

export interface BranchStoryArc {
  id: string;
  trajectoryId: TrajectoryArchetype;
  title: string;
  domain: BranchArcDomain;
  initiatingStageId: string;       // Bắt đầu từ cảnh giới nào của mạch chính
  convergingStageId: string;       // Hội tụ về cảnh giới nào của mạch chính
  narrativeHook: string;           // Điểm phát sinh mạch nhánh
  progressionPhases: Array<{
    phaseOrder: number;
    phaseTitle: string;
    eventsSummary: string;
  }>;
  convergencePointDescription: string; // Cách mạch nhánh này đâm thẳng vào đại chiến/biến cố mạch chính
  catalystRewardOrStakes: string;  // Chiến lợi phẩm hoặc cái giá phải trả khi hội tụ
  sampleProseSnippet: string;      // Đoạn văn mẫu khi mạch nhánh giao cắt với mạch chính
}

export interface BranchConvergenceNexus {
  id: string;
  nexusName: string;
  targetSpineStageId: string;       // Cảnh giới hội tụ của Master Spine
  targetSpineStageTitle: string;
  macroCosmicEvent: string;        // Đại biến cố vũ trụ / thế giới quy tụ các nhánh
  convergingBranchesSummary: string; // Tóm tắt cách các phương hướng gặp nhau
  dramaticCatharsis: string;       // Cao trào cảm xúc giải phóng
  exemplaryConvergencePrompt: string;
}

export interface NarrativeTrajectory {
  id: TrajectoryArchetype;
  name: string;
  badgeTitle: string;
  icon: string;
  colorScheme: {
    primary: string;
    badgeBg: string;
    border: string;
    gradient: string;
  };
  cultivationPhilosophy: string;   // Triết lý tu luyện cốt lõi
  protagonistArchetype: string;    // Khuôn mẫu nhân vật chính
  coreConflicts: string[];         // Mâu thuẫn trung tâm
  worldImpact: string;             // Tác động thay đổi cục diện thế giới
  milestones: TrajectoryMilestone[];
  branchArcIds: string[];
}

export interface TrajectoryConvergenceSimulationConfig {
  trajectoryId: TrajectoryArchetype;
  selectedBranchArcIds: string[];
  nexusId: string;
  protagonistName: string;
  climacticTone: string;
  genre: string;
}

export interface TrajectoryConvergenceSimulationResult {
  convergenceTitle: string;
  trajectoryAdopted: string;
  branchesIntertwined: string[];
  nexusStageLinked: string;
  grandSynthesisNarrative: string; // Bức tranh toàn cảnh khi các mạch nhánh hợp lưu về Mạch Chính
  climacticClashScene: string;     // Phân cảnh đại chiến / đối đầu cao trào
  aftermathAndSpineElevation: string; // Bàn đạp đưa Main đột phá lên tầng cảnh giới tiếp theo
  readyChapterDraftSnippet: string; // Trích đoạn tiểu thuyết hoàn chỉnh chuẩn bị chèn vào bản thảo
}

export enum GeneratorMode {
  STRUCTURE = 'STRUCTURE',
  CONTINUE = 'CONTINUE',
  SUMMARIZE = 'SUMMARIZE',
  TITLE = 'TITLE',
  ENDING = 'ENDING',
  INTRO_STORYTELLER = 'INTRO_STORYTELLER',
  OPTIONS = 'OPTIONS',
  DIALOGUE = 'DIALOGUE',
  FIGHT_SCENE = 'FIGHT_SCENE',
  EXPAND = 'EXPAND',
  CRITIQUE = 'CRITIQUE'
}

// =========================================================================
// KIẾN TRÚC VẬN DỤNG HỒ SƠ CỐT TRUYỆN & ĐA BỘ DỮ LIỆU MẪU ĐỂ VIẾT TRUYỆN (OMNI-DATASET STORYTELLING)
// =========================================================================

export interface OmniDatasetSelection {
  weapons?: string[];
  treasures?: string[];
  locations?: string[];
  sectsAndEnemies?: string[];
  cultivationRealms?: string[];
  swordCanons?: string[];
  spellCanons?: string[];
  talismanCanons?: string[];
  alchemyPills?: string[];
  spiritBeasts?: string[];
  subplotsAndClues?: string[];
  artOfWarFormations?: string[];
  poeticScenes?: string[];
  martialTraining?: string[];
  physicalDuels?: string[];
}

export interface StoryBibleChapterContext {
  bibleTitle?: string;
  volumeTitle?: string;
  volumeConflict?: string;
  chapterTitle?: string;
  conflict?: string;
  characterObjective?: string;
  foreshadowing?: string;
  lootBreakthrough?: string;
  sampleProse?: string;
}

export interface OmniStoryGenerationParams {
  node: NovelNode;
  context: string;
  mode: string;
  customInstruction: string;
  currentDraft: string;
  characters?: CharacterProfile[];
  storyBibleChapter?: StoryBibleChapterContext;
  omniDatasets?: OmniDatasetSelection;
  wordCountTarget?: number;
  literaryTone?: string;
}

// =========================================================================
// MẠNG THẦN KINH SUY DIỄN & TỰ HỌC NÂNG CAO CHẤT LƯỢNG NỘI DUNG
// (NEURAL NARRATIVE INFERENCE & REINFORCED SELF-LEARNING ENGINE)
// =========================================================================

export type NeuralInferenceType =
  | 'PLOT_TWIST'          // Bước ngoặt bất ngờ & Khủng hoảng cục diện
  | 'LATENT_MOTIVE'        // Động cơ ngầm & Bẫy tâm lý nhân vật
  | 'BUTTERFLY_EFFECT'     // Hiệu ứng cánh bướm & Diễn biến nhân quả dài hạn
  | 'HIDDEN_TRUTH'         // Chân tướng cổ xưa & Cơ duyên bí mật
  | 'STRATEGIC_GAMBIT'     // Bố cục mưu lược & Nghịch chuyển thế trận
  | 'COSMIC_ESCALATION';   // Nâng tầm quy mô mâu thuẫn & Trật tự giới vực

export interface NeuralWeightMatrix {
  causalityRigor: number;          // Độ chặt chẽ nhân quả (0.0 - 1.0)
  surpriseFactor: number;          // Độ bất ngờ & Đột phá (0.0 - 1.0)
  emotionalDepth: number;          // Chiều sâu tâm lý & Triết lý nội tâm (0.0 - 1.0)
  proseSophistication: number;     // Bút lực văn phong & Điển nhã (0.0 - 1.0)
  worldConsistency: number;        // Tính nhất quán thiết lập thế giới (0.0 - 1.0)
  tensionMomentum: number;         // Nhịp điệu căng thẳng cao trào (0.0 - 1.0)
}

export interface LearnedNarrativeAxiom {
  id: string;
  category: 'CAUSALITY' | 'CHARACTER_PSYCHOLOGY' | 'PLOT_PACING' | 'LITERARY_TONE' | 'SUBVERSION';
  ruleSummary: string;             // Tóm tắt quy luật đã tự học
  detailedInsight: string;         // Phân tích chiều sâu & Bài học kinh nghiệm
  weight: number;                  // Trọng số nơ-ron liên kết (0.1 - 2.0)
  sourceInferenceId?: string;      // ID suy diễn nguồn tạo ra bài học này
  timesApplied: number;            // Số lần đã kích hoạt trong các chu kỳ sau
  effectivenessRating: number;     // Điểm đánh giá hiệu quả (1 - 5)
  status: 'ACTIVE' | 'ARCHIVED' | 'CORE_PRINCIPLE';
  learnedAtEpoch: number;
}

export interface NeuralDeductionStep {
  stepOrder: number;
  layerName: string;               // Tên lớp thần kinh (ví dụ: 'Lớp Nhận Thức Tín Hiệu', 'Lớp Động Cơ Ẩn', 'Lớp Cánh Bướm Tương Lai')
  observation: string;             // Tín hiệu quan sát từ bối cảnh & manh mối
  inference: string;               // Phân tích suy luận nơ-ron
  confidenceScore: number;         // Độ tin cậy (0 - 100%)
  activatedSynapses: string[];     // Các nơ-ron/khái niệm được kích hoạt
}

export interface NeuralInferenceRecord {
  id: string;
  timestamp: string;
  epoch: number;
  sourceChapterTitle: string;
  inferenceType: NeuralInferenceType;
  inputContext: string;
  deductionChain: NeuralDeductionStep[];
  coreRevelation: string;          // Phát hiện cốt lõi / Điểm bùng nổ
  butterflyForecast: string;       // Dự báo phản ứng dây chuyền tiếp theo
  narrativeExpansionOutline: string[]; // Khung sườn phân hồi phát triển tiếp diễn
  synthesizedProseDraft: string;   // Trích đoạn văn học mẫu đỉnh cao tạo ra từ suy diễn
  confidenceIndex: number;         // Điểm số tin cậy tổng thể (%)
  authorRating?: number;           // Đánh giá của tác giả (1 - 5 sao)
  authorCritique?: string;         // Bình luận / phản hồi của tác giả để huấn luyện
  selfLearningInsights?: string[]; // Quy tắc/Bài học đã tự chiết xuất từ suy diễn này
  appliedAxiomIds: string[];       // Các quy luật đã dùng làm tham chiếu khi suy diễn
  isReinforced: boolean;           // Đã chạy lan truyền ngược (Backpropagation) cập nhật trọng số
}

export interface NeuralSelfLearningState {
  currentEpoch: number;
  totalInferencesRun: number;
  qualityScoreAvg: number;
  learningRate: number;            // Tốc độ học (0.01 - 0.5)
  weights: NeuralWeightMatrix;
  activeAxioms: LearnedNarrativeAxiom[];
  inferenceRecords: NeuralInferenceRecord[];
  evolutionLog: Array<{
    epoch: number;
    timestamp: string;
    trigger: string;
    qualityGain: number;
    summary: string;
  }>;
}

export interface NeuralInferenceRunParams {
  inferenceType: NeuralInferenceType;
  context: string;
  currentChapterTitle?: string;
  protagonistName?: string;
  unresolvedClues?: string[];
  activeWeights: NeuralWeightMatrix;
  learnedAxioms: LearnedNarrativeAxiom[];
  learningEpoch: number;
  customDeductionFocus?: string;
  genre?: string;
}

export interface NeuralSelfLearnFeedbackParams {
  recordId: string;
  rating: number;
  critique: string;
  currentWeights: NeuralWeightMatrix;
  existingAxioms: LearnedNarrativeAxiom[];
  epoch: number;
}

// =========================================================================
// NODE-BASED VISUAL STORY WORKFLOW TYPES (COMFYUI / GRAPH PIPELINE)
// =========================================================================

export type StoryNodeType =
  | 'character_loader'          // Node Nhân Vật & Đạo Hữu
  | 'location_setting'          // Node Bối Cảnh, Động Phủ & Bí Cảnh
  | 'calamity_ruins'            // Node Thiên Tai & Chiến Tàn Phế Tích
  | 'longevity_seed'            // Node Hạt Trường Sinh Hồi Sinh & Nẩy Mầm
  | 'battle_breakthrough'       // Node Đại Chiến & Đột Phá Lôi Kiếp
  | 'alchemy_catalyst'          // Node Đan Dược & Thần Dược Xúc Tác
  | 'dao_revelation'            // Node Đạo Ngộ & Dị Tượng Thiên Địa
  | 'cinematic_director'        // Node Đạo Diễn Khung Hình Điện Ảnh
  | 'talisman_formation'        // Node Trận Pháp & Phù Lục Hộ Thể / Phong Tỏa
  | 'spirit_beast_summon'       // Node Linh Thú & Thần Thú Giáng Thế
  | 'story_prompt'              // Node Ý Tưởng & Phục Bút
  | 'master_synthesis'          // Node Máy Khởi Tạo Phân Cảnh (Master Engine)
  | 'spatial_prose_upscaler'    // Node Nâng Cấp Văn Phong & Điển Tích
  | 'chapter_output';           // Node Đầu Ra Bản Thảo & Chèn Truyện

export type StoryPortDataType =
  | 'character'
  | 'location'
  | 'calamity'
  | 'miracle'
  | 'conflict'
  | 'catalyst'
  | 'dao'
  | 'camera'
  | 'talisman'
  | 'beast'
  | 'prompt'
  | 'raw_prose'
  | 'upscaled_prose'
  | 'any';

export interface StoryPort {
  id: string;
  name: string;
  type: StoryPortDataType;
  direction: 'in' | 'out';
  color: string;
}

export interface StoryNode {
  id: string;
  type: StoryNodeType;
  title: string;
  categoryLabel: string;
  icon: string;
  x: number;
  y: number;
  width?: number;
  color: string;
  headerBg: string;
  inputs: StoryPort[];
  outputs: StoryPort[];
  data: Record<string, any>;
  status?: 'idle' | 'running' | 'success' | 'error';
  collapsed?: boolean;
  muted?: boolean;
  userNote?: string;
}

export interface StoryConnection {
  id: string;
  fromNodeId: string;
  fromPortId: string;
  toNodeId: string;
  toPortId: string;
  color?: string;
}

export interface StoryGroupFrame {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface StoryWorkflowPreset {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  badge: string;
  nodes: StoryNode[];
  connections: StoryConnection[];
  groups?: StoryGroupFrame[];
}

export interface StoryWorkflowVariant {
  variantId: string;
  label: string;
  toneStyle: string;
  chapterTitle: string;
  prose: string;
  summary: string;
  wordCount: number;
  seed: number;
}

export interface StoryWorkflowExecutionResult {
  rawProse: string;
  upscaledProse: string;
  chapterTitle: string;
  summary: string;
  wordCount: number;
  activePathSummary: string;
  seed?: number;
  variants?: StoryWorkflowVariant[];
  connectedElements: {
    characters: string[];
    locations: string[];
    calamities: string[];
    miracles: string[];
    conflicts: string[];
    pills?: string[];
    daoAxioms?: string[];
    cinematics?: string[];
    talismans?: string[];
    beasts?: string[];
  };
}