import React, { useState, useMemo } from 'react';
import {
  CharacterProfile,
  CharacterTrajectoryRoutingProfile,
  CharacterNexusRelationCategory,
  CharacterNexusRelationNode,
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
import {
  PRESET_TRAJECTORY_PROFILES,
  NEXUS_CATEGORIES_META,
  MILESTONE_TYPES_META,
  GEOGRAPHIC_TYPES_META,
  GEOGRAPHIC_STATUS_META,
  QUEST_TRIAL_CATEGORIES_META,
  KARMIC_TYPES_META,
  NEMESIS_SEVERITY_META,
  DAO_DEMON_TYPES_META,
  FACTION_AUTHORITY_META,
  ORAL_LORE_SPEAKER_META,
  TREASURE_LORE_CATEGORIES_META,
  getTrajectoryProfileForCharacter,
  computeRelationCategoryCounts,
  computeMilestoneTypeCounts,
  computeGeographicStatusCounts,
  computeGeographicTypeCounts,
  computeQuestTrialCategoryCounts,
  computeKarmicTypeCounts,
  computeNemesisSeverityCounts,
  computeDaoDemonTypeCounts,
  computeFactionAuthorityCounts,
  computeOralLoreSpeakerCounts,
  computeOralLoreTreasureCounts
} from '../data/presetCharacterTrajectoryBible';
import { generateCharacterTrajectoryRouting } from '../services/geminiService';
import { Spinner } from './Spinner';

interface CharacterTrajectoryRoutingStudioProps {
  characters: CharacterProfile[];
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
  genre?: string;
  onInsertText?: (text: string) => void;
}

export type TrajectoryTabMode =
  | 'nexusGraph'
  | 'timelineTrajectory'
  | 'questTrials'
  | 'geographicAtlas'
  | 'karmicInheritances'
  | 'nemesisFeuds'
  | 'daoHeartDemons'
  | 'factionPowers'
  | 'oralLoreSubplots'
  | 'storySnippets'
  | 'aiWeaver';

export const CharacterTrajectoryRoutingStudio: React.FC<CharacterTrajectoryRoutingStudioProps> = ({
  characters,
  onUpdateCharacters,
  genre = 'Tiên Hiệp Cổ Phong',
  onInsertText
}) => {
  // Active character
  const [selectedCharId, setSelectedCharId] = useState<string>(
    characters[0]?.id || PRESET_TRAJECTORY_PROFILES[0].characterId
  );

  // Active Tab
  const [activeTab, setActiveTab] = useState<TrajectoryTabMode>('nexusGraph');

  // Trajectory profiles state map
  const [profilesMap, setProfilesMap] = useState<Record<string, CharacterTrajectoryRoutingProfile>>(() => {
    const map: Record<string, CharacterTrajectoryRoutingProfile> = {};
    PRESET_TRAJECTORY_PROFILES.forEach((p) => {
      map[p.characterId] = p;
    });
    // Check if characters already have trajectoryProfile
    characters.forEach((c) => {
      if (c.trajectoryProfile) {
        map[c.id] = c.trajectoryProfile;
      } else if (!map[c.id]) {
        map[c.id] = getTrajectoryProfileForCharacter(c.id, c.name);
      }
    });
    return map;
  });

  // Current active character object
  const currentChar = useMemo(() => {
    return characters.find((c) => c.id === selectedCharId) || characters[0] || {
      id: selectedCharId,
      name: 'Lâm Tiêu',
      role: 'Chính diện',
      realmOrRank: 'Kim Đan Kỳ',
      sectOrFaction: 'Thái Hư Kiếm Tông',
      personality: 'Trầm tĩnh kiên định',
      appearance: 'Bạch y xuất trần',
      weaponOrAbility: 'Cửu U Kiếm',
      backstory: ''
    };
  }, [characters, selectedCharId]);

  // Current profile data
  const currentProfile = useMemo(() => {
    if (profilesMap[selectedCharId]) {
      return profilesMap[selectedCharId];
    }
    return getTrajectoryProfileForCharacter(currentChar.id, currentChar.name);
  }, [profilesMap, selectedCharId, currentChar]);

  // Filters
  const [relationCategoryFilter, setRelationCategoryFilter] = useState<string>('ALL');
  const [milestoneTypeFilter, setMilestoneTypeFilter] = useState<string>('ALL');
  const [questCategoryFilter, setQuestCategoryFilter] = useState<string>('ALL');
  const [questStatusFilter, setQuestStatusFilter] = useState<string>('ALL');
  const [questDifficultyFilter, setQuestDifficultyFilter] = useState<string>('ALL');
  const [geoStatusFilter, setGeoStatusFilter] = useState<string>('ALL');
  const [geoTypeFilter, setGeoTypeFilter] = useState<string>('ALL');
  const [karmicTypeFilter, setKarmicTypeFilter] = useState<string>('ALL');
  const [nemesisSeverityFilter, setNemesisSeverityFilter] = useState<string>('ALL');
  const [daoDemonTypeFilter, setDaoDemonTypeFilter] = useState<string>('ALL');
  const [oralLoreSpeakerFilter, setOralLoreSpeakerFilter] = useState<string>('ALL');
  const [oralLoreTreasureFilter, setOralLoreTreasureFilter] = useState<string>('ALL');
  const [snippetCategoryFilter, setSnippetCategoryFilter] = useState<string>('ALL');
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');

  // AI Generator state
  const [aiFocusPrompt, setAiFocusPrompt] = useState<string>(
    'Thiếu thời hàn vi, gia tộc bị bức hại, cha mẹ phân ly, nhặt được kiếm thai cổ xưa, thề chém nát túc địch ma đạo'
  );
  const [isGeneratingTrajectory, setIsGeneratingTrajectory] = useState<boolean>(false);

  // Modal State for adding/editing relation
  const [relationModalOpen, setRelationModalOpen] = useState<boolean>(false);
  const [editingRelationId, setEditingRelationId] = useState<string | null>(null);
  const [relCategory, setRelCategory] = useState<CharacterNexusRelationCategory>('CHA_ME');
  const [relTargetName, setRelTargetName] = useState<string>('');
  const [relTargetRole, setRelTargetRole] = useState<string>('');
  const [relIntimacy, setRelIntimacy] = useState<number>(80);
  const [relStatus, setRelStatus] = useState<CharacterNexusRelationNode['status']>('Còn Sống');
  const [relOrigin, setRelOrigin] = useState<string>('');
  const [relDynamics, setRelDynamics] = useState<string>('');
  const [relKarmic, setRelKarmic] = useState<string>('');

  // Modal State for adding/editing milestone
  const [milestoneModalOpen, setMilestoneModalOpen] = useState<boolean>(false);
  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [msTimeAnchor, setMsTimeAnchor] = useState<string>('Năm 18 tuổi');
  const [msType, setMsType] = useState<TrajectoryMilestoneType>('TU_LUYEN');
  const [msTitle, setMsTitle] = useState<string>('');
  const [msLocation, setMsLocation] = useState<string>('');
  const [msInvolved, setMsInvolved] = useState<string>('');
  const [msDescription, setMsDescription] = useState<string>('');
  const [msCultivation, setMsCultivation] = useState<string>('');
  const [msPsychological, setMsPsychological] = useState<string>('');
  const [msKarmic, setMsKarmic] = useState<string>('');
  const [msSnippet, setMsSnippet] = useState<string>('');

  // Modal State for adding/editing Quest & Trial Record
  const [questModalOpen, setQuestModalOpen] = useState<boolean>(false);
  const [editingQuestId, setEditingQuestId] = useState<string | null>(null);
  const [qtrCategory, setQtrCategory] = useState<QuestTrialCategory>('NHIEM_VU');
  const [qtrTitle, setQtrTitle] = useState<string>('');
  const [qtrStageTime, setQtrStageTime] = useState<string>('Năm 18 tuổi');
  const [qtrLocation, setQtrLocation] = useState<string>('');
  const [qtrDifficulty, setQtrDifficulty] = useState<CharacterQuestTrialRecord['dangerAndDifficulty']>('Hiểm Trở');
  const [qtrStatus, setQtrStatus] = useState<CharacterQuestTrialRecord['executionStatus']>('Đang Thực Hiện');
  const [qtrAuthority, setQtrAuthority] = useState<string>('');
  const [qtrObjectives, setQtrObjectives] = useState<string>('');
  const [qtrRewards, setQtrRewards] = useState<string>('');
  const [qtrEncounters, setQtrEncounters] = useState<string>('');
  const [qtrSnippet, setQtrSnippet] = useState<string>('');

  // Modal State for adding/editing Geographic Node
  const [geoModalOpen, setGeoModalOpen] = useState<boolean>(false);
  const [editingGeoId, setEditingGeoId] = useState<string | null>(null);
  const [geoName, setGeoName] = useState<string>('');
  const [geoType, setGeoType] = useState<GeographicLocationType>('THANH_TRI');
  const [geoStatus, setGeoStatus] = useState<GeographicTraversalStatus>('DA_TRAI_QUA');
  const [geoStage, setGeoStage] = useState<string>('Giai đoạn 1: Thuở Hàn Vi');
  const [geoRegion, setGeoRegion] = useState<string>('');
  const [geoTerrain, setGeoTerrain] = useState<string>('');
  const [geoTasks, setGeoTasks] = useState<string>('');
  const [geoConquest, setGeoConquest] = useState<string>('');
  const [geoScenery, setGeoScenery] = useState<string>('');

  // Modal State for Karmic Inheritance
  const [karmicModalOpen, setKarmicModalOpen] = useState<boolean>(false);
  const [editingKarmicId, setEditingKarmicId] = useState<string | null>(null);
  const [kiName, setKiName] = useState<string>('');
  const [kiType, setKiType] = useState<KarmicInheritanceType>('THAN_BINH_BAN_MENH');
  const [kiMilestone, setKiMilestone] = useState<string>('Năm 15 tuổi');
  const [kiGrade, setKiGrade] = useState<string>('Cực Phẩm Linh Bảo');
  const [kiAwakening, setKiAwakening] = useState<string>('Tầng 3/9 Phong Ấn');
  const [kiBond, setKiBond] = useState<CharacterKarmicInheritanceBranch['soulBondStatus']>('Tâm Huyết Tương Liên');
  const [kiAbilities, setKiAbilities] = useState<string>('Trảm Không Kiếm Khí\nHộ Thể Kiếm Cương');
  const [kiCost, setKiCost] = useState<string>('Tiêu hao một phần mười tinh huyết khi giải phong ấn');
  const [kiSnippet, setKiSnippet] = useState<string>('');

  // Modal State for Nemesis Feud
  const [nemesisModalOpen, setNemesisModalOpen] = useState<boolean>(false);
  const [editingNemesisId, setEditingNemesisId] = useState<string | null>(null);
  const [nfName, setNfName] = useState<string>('');
  const [nfFactionRank, setNfFactionRank] = useState<string>('');
  const [nfOrigin, setNfOrigin] = useState<string>('');
  const [nfSeverity, setNfSeverity] = useState<CharacterNemesisFeudBranch['feudSeverity']>('Huyết Hải Thâm Cừu');
  const [nfStatus, setNfStatus] = useState<CharacterNemesisFeudBranch['status']>('Chờ Ngày Quyết Đấu');
  const [nfClashes, setNfClashes] = useState<string>('');
  const [nfDuelCond, setNfDuelCond] = useState<string>('');
  const [nfReward, setNfReward] = useState<string>('');
  const [nfSnippet, setNfSnippet] = useState<string>('');

  // Modal State for Dao Demon
  const [daoDemonModalOpen, setDaoDemonModalOpen] = useState<boolean>(false);
  const [editingDemonId, setEditingDemonId] = useState<string | null>(null);
  const [dhdName, setDhdName] = useState<string>('');
  const [dhdType, setDhdType] = useState<CharacterDaoHeartDemonBranch['demonType']>('CHẤP_NIỆM_QUÁ_KHỨ');
  const [dhdStage, setDhdStage] = useState<string>('Đột phá Nguyên Anh Kỳ');
  const [dhdManifest, setDhdManifest] = useState<string>('');
  const [dhdMethod, setDhdMethod] = useState<string>('');
  const [dhdMastery, setDhdMastery] = useState<string>('Sinh Tử Kiếm Vực 70%');
  const [dhdState, setDhdState] = useState<CharacterDaoHeartDemonBranch['breakthroughState']>('Đã Đốn Ngộ Hoàn Toàn');
  const [dhdSnippet, setDhdSnippet] = useState<string>('');

  // Modal State for Faction Power
  const [factionModalOpen, setFactionModalOpen] = useState<boolean>(false);
  const [editingFactionId, setEditingFactionId] = useState<string | null>(null);
  const [fpName, setFpName] = useState<string>('');
  const [fpRole, setFpRole] = useState<string>('');
  const [fpAuthority, setFpAuthority] = useState<CharacterFactionPowerBranch['authorityLevel']>('Chấp Chưởng Trọng Quyền');
  const [fpTerritory, setFpTerritory] = useState<string>('');
  const [fpAllies, setFpAllies] = useState<string>('Chiến Đường\nChấp Pháp Điện');
  const [fpRivals, setFpRivals] = useState<string>('');
  const [fpLegacy, setFpLegacy] = useState<string>('');

  // Modal State for Oral Lore Subplot
  const [oralLoreModalOpen, setOralLoreModalOpen] = useState<boolean>(false);
  const [editingOralLoreId, setEditingOralLoreId] = useState<string | null>(null);
  const [olsTitle, setOlsTitle] = useState<string>('');
  const [olsSpeakerType, setOlsSpeakerType] = useState<OralLoreSpeakerType>('THUYET_THU_NHAN');
  const [olsSpeakerNameAndRole, setOlsSpeakerNameAndRole] = useState<string>('');
  const [olsNarrativeSetting, setOlsNarrativeSetting] = useState<string>('');
  const [olsRecountedEra, setOlsRecountedEra] = useState<string>('');
  const [olsTreasure, setOlsTreasure] = useState<string>('');
  const [olsTreasureCategory, setOlsTreasureCategory] = useState<OralLoreTreasureCategory>('THIEN_TAI_DIA_BAO');
  const [olsTrialSecret, setOlsTrialSecret] = useState<string>('');
  const [olsImmortalTree, setOlsImmortalTree] = useState<string>('');
  const [olsAssociatedMission, setOlsAssociatedMission] = useState<string>('');
  const [olsMissionExecutionTruth, setOlsMissionExecutionTruth] = useState<string>('');
  const [olsBreakthroughStage, setOlsBreakthroughStage] = useState<string>('');
  const [olsTribulationPhenomenon, setOlsTribulationPhenomenon] = useState<string>('');
  const [olsBreakthroughTruth, setOlsBreakthroughTruth] = useState<string>('');
  const [olsPerspectiveSummary, setOlsPerspectiveSummary] = useState<string>('');
  const [olsTruthVsRumor, setOlsTruthVsRumor] = useState<string>('');
  const [olsVividImpact, setOlsVividImpact] = useState<string>('');
  const [olsDialogueDraft, setOlsDialogueDraft] = useState<string>('');

  // Save updated profile
  const updateCurrentProfile = (newProfile: CharacterTrajectoryRoutingProfile) => {
    setProfilesMap((prev) => ({
      ...prev,
      [selectedCharId]: newProfile
    }));

    if (onUpdateCharacters) {
      const updatedList = characters.map((c) => {
        if (c.id === selectedCharId) {
          return {
            ...c,
            trajectoryProfile: newProfile
          };
        }
        return c;
      });
      onUpdateCharacters(updatedList);
    }
  };

  // Safe arrays for all branches
  const atlasList: GeographicExpeditionNode[] = useMemo(() => currentProfile.geographicAtlas || [], [currentProfile.geographicAtlas]);
  const questList: CharacterQuestTrialRecord[] = useMemo(() => currentProfile.questTrialRecords || [], [currentProfile.questTrialRecords]);
  const karmicList: CharacterKarmicInheritanceBranch[] = useMemo(() => currentProfile.karmicInheritances || [], [currentProfile.karmicInheritances]);
  const nemesisList: CharacterNemesisFeudBranch[] = useMemo(() => currentProfile.nemesisFeuds || [], [currentProfile.nemesisFeuds]);
  const daoDemonList: CharacterDaoHeartDemonBranch[] = useMemo(() => currentProfile.daoHeartDemons || [], [currentProfile.daoHeartDemons]);
  const factionList: CharacterFactionPowerBranch[] = useMemo(() => currentProfile.factionPowers || [], [currentProfile.factionPowers]);
  const oralLoreList: CharacterOralLoreSubplot[] = useMemo(() => currentProfile.oralLoreSubplots || [], [currentProfile.oralLoreSubplots]);

  // Stats
  const relationCounts = useMemo(() => computeRelationCategoryCounts(currentProfile.relations), [currentProfile.relations]);
  const milestoneCounts = useMemo(() => computeMilestoneTypeCounts(currentProfile.milestones), [currentProfile.milestones]);
  const geoStatusCounts = useMemo(() => computeGeographicStatusCounts(atlasList), [atlasList]);
  const geoTypeCounts = useMemo(() => computeGeographicTypeCounts(atlasList), [atlasList]);
  const questCategoryCounts = useMemo(() => computeQuestTrialCategoryCounts(questList), [questList]);
  const karmicCounts = useMemo(() => computeKarmicTypeCounts(karmicList), [karmicList]);
  const nemesisCounts = useMemo(() => computeNemesisSeverityCounts(nemesisList), [nemesisList]);
  const daoDemonCounts = useMemo(() => computeDaoDemonTypeCounts(daoDemonList), [daoDemonList]);
  const factionCounts = useMemo(() => computeFactionAuthorityCounts(factionList), [factionList]);
  const oralLoreCounts = useMemo(() => computeOralLoreSpeakerCounts(oralLoreList), [oralLoreList]);
  const oralLoreTreasureCounts = useMemo(() => computeOralLoreTreasureCounts(oralLoreList), [oralLoreList]);

  // Filtered Relations
  const filteredRelations = useMemo(() => {
    return currentProfile.relations.filter((r) => {
      if (relationCategoryFilter !== 'ALL' && r.category !== relationCategoryFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          r.targetName.toLowerCase().includes(q) ||
          r.targetRoleOrTitle.toLowerCase().includes(q) ||
          r.originStory.toLowerCase().includes(q) ||
          r.karmicTies.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [currentProfile.relations, relationCategoryFilter, searchFilter]);

  // Filtered Milestones
  const filteredMilestones = useMemo(() => {
    return currentProfile.milestones.filter((m) => {
      if (milestoneTypeFilter !== 'ALL' && m.type !== milestoneTypeFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          m.title.toLowerCase().includes(q) ||
          m.location.toLowerCase().includes(q) ||
          m.timeAnchor.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.involvedCharacters.some((c) => c.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [currentProfile.milestones, milestoneTypeFilter, searchFilter]);

  // Filtered Quest Trials
  const filteredQuestTrials = useMemo(() => {
    return questList.filter((q) => {
      if (questCategoryFilter !== 'ALL' && q.category !== questCategoryFilter) return false;
      if (questStatusFilter !== 'ALL' && q.executionStatus !== questStatusFilter) return false;
      if (questDifficultyFilter !== 'ALL' && q.dangerAndDifficulty !== questDifficultyFilter) return false;
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        return (
          q.title.toLowerCase().includes(query) ||
          q.locationName.toLowerCase().includes(query) ||
          q.stageTimeAnchor.toLowerCase().includes(query) ||
          q.issuingAuthorityOrContext.toLowerCase().includes(query) ||
          q.rewardsOrBreakthroughs.toLowerCase().includes(query) ||
          q.keyObjectives.some((obj) => obj.toLowerCase().includes(query))
        );
      }
      return true;
    });
  }, [questList, questCategoryFilter, questStatusFilter, questDifficultyFilter, searchFilter]);

  // Filtered Geographic Nodes
  const filteredGeographicAtlas = useMemo(() => {
    return atlasList.filter((g) => {
      if (geoStatusFilter !== 'ALL' && g.status !== geoStatusFilter) return false;
      if (geoTypeFilter !== 'ALL' && g.type !== geoTypeFilter) return false;
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        return (
          g.name.toLowerCase().includes(query) ||
          g.chronologicalStage.toLowerCase().includes(query) ||
          g.realmOrRegion.toLowerCase().includes(query) ||
          g.terrainAndAura.toLowerCase().includes(query) ||
          g.requiredTasksOrTrials.toLowerCase().includes(query) ||
          g.conquestOrLegacy.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [atlasList, geoStatusFilter, geoTypeFilter, searchFilter]);

  // Group Geographic Nodes by Chronological Stage
  const groupedGeographicAtlas = useMemo(() => {
    const groups: Record<string, GeographicExpeditionNode[]> = {};
    filteredGeographicAtlas.forEach((node) => {
      const stage = node.chronologicalStage || 'Chưa Phân Định Giai Đoạn';
      if (!groups[stage]) {
        groups[stage] = [];
      }
      groups[stage].push(node);
    });
    return groups;
  }, [filteredGeographicAtlas]);

  // Filtered Karmic Inheritances
  const filteredKarmicList = useMemo(() => {
    return karmicList.filter((k) => {
      if (karmicTypeFilter !== 'ALL' && k.type !== karmicTypeFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          k.name.toLowerCase().includes(q) ||
          k.rankOrGrade.toLowerCase().includes(q) ||
          k.specialAbilities.some((a) => a.toLowerCase().includes(q)) ||
          k.karmicCostOrBacklash.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [karmicList, karmicTypeFilter, searchFilter]);

  // Filtered Nemesis Feuds
  const filteredNemesisList = useMemo(() => {
    return nemesisList.filter((n) => {
      if (nemesisSeverityFilter !== 'ALL' && n.feudSeverity !== nemesisSeverityFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          n.nemesisName.toLowerCase().includes(q) ||
          n.nemesisFactionAndRank.toLowerCase().includes(q) ||
          n.feudOriginCause.toLowerCase().includes(q) ||
          n.destinedDuelCondition.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [nemesisList, nemesisSeverityFilter, searchFilter]);

  // Filtered Dao Demons
  const filteredDaoDemonList = useMemo(() => {
    return daoDemonList.filter((d) => {
      if (daoDemonTypeFilter !== 'ALL' && d.demonType !== daoDemonTypeFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          d.demonName.toLowerCase().includes(q) ||
          d.innerDemonManifestation.toLowerCase().includes(q) ||
          d.daoResolutionMethod.toLowerCase().includes(q) ||
          d.daoDomainMastery.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [daoDemonList, daoDemonTypeFilter, searchFilter]);

  // Filtered Oral Lore Subplots
  const filteredOralLoreList = useMemo(() => {
    return oralLoreList.filter((item) => {
      if (oralLoreSpeakerFilter !== 'ALL' && item.speakerType !== oralLoreSpeakerFilter) return false;
      const itemCat = item.treasureLoreCategory || 'GIAI_THOAI_CHUNG';
      if (oralLoreTreasureFilter !== 'ALL' && itemCat !== oralLoreTreasureFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          item.subplotTitle.toLowerCase().includes(q) ||
          item.speakerNameAndRole.toLowerCase().includes(q) ||
          item.narrativeSetting.toLowerCase().includes(q) ||
          item.recountedEraOrEvent.toLowerCase().includes(q) ||
          (item.associatedTreasureOrRealm && item.associatedTreasureOrRealm.toLowerCase().includes(q)) ||
          (item.treasureTrialSecret && item.treasureTrialSecret.toLowerCase().includes(q)) ||
          (item.immortalTreeConnection && item.immortalTreeConnection.toLowerCase().includes(q)) ||
          (item.associatedMissionOrQuest && item.associatedMissionOrQuest.toLowerCase().includes(q)) ||
          (item.missionExecutionTruth && item.missionExecutionTruth.toLowerCase().includes(q)) ||
          (item.breakthroughCultivationStage && item.breakthroughCultivationStage.toLowerCase().includes(q)) ||
          (item.tribulationOrPhenomenon && item.tribulationOrPhenomenon.toLowerCase().includes(q)) ||
          (item.breakthroughRealTruth && item.breakthroughRealTruth.toLowerCase().includes(q)) ||
          item.narrativePerspectiveSummary.toLowerCase().includes(q) ||
          item.historicalTruthVsRumor.toLowerCase().includes(q) ||
          item.characterVividImpact.toLowerCase().includes(q) ||
          item.spokenDialogueDraft.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [oralLoreList, oralLoreSpeakerFilter, oralLoreTreasureFilter, searchFilter]);

  // Unified Story & Dialogue Snippets across all character branches
  const allStorySnippets = useMemo(() => {
    const list: {
      id: string;
      category: 'ORAL_LORE' | 'MILESTONES' | 'QUESTS' | 'KARMIC' | 'DEMONS' | 'NEMESIS';
      categoryLabel: string;
      categoryIcon: string;
      categoryBadgeBg: string;
      categoryBadgeBorder: string;
      categoryBadgeText: string;
      title: string;
      timeOrSetting: string;
      speakerOrEntity?: string;
      tags?: { label: string; text: string; badgeClass: string }[];
      prose: string;
    }[] = [];

    // 1. Oral Lore Subplots (Giai Thoại Kể Lại)
    oralLoreList.forEach((ols) => {
      if (ols.spokenDialogueDraft && ols.spokenDialogueDraft.trim()) {
        const meta = ORAL_LORE_SPEAKER_META[ols.speakerType];
        const tags: { label: string; text: string; badgeClass: string }[] = [];
        if (ols.breakthroughCultivationStage) {
          tags.push({ label: '⚡ Đột Phá', text: ols.breakthroughCultivationStage, badgeClass: 'bg-yellow-950/70 border-yellow-500/40 text-yellow-300' });
        }
        if (ols.associatedMissionOrQuest) {
          tags.push({ label: '🎯 Nhiệm Vụ', text: ols.associatedMissionOrQuest, badgeClass: 'bg-amber-950/70 border-amber-500/40 text-amber-300' });
        }
        if (ols.associatedTreasureOrRealm) {
          tags.push({ label: '💎 Bảo Vật/Bí Cảnh', text: ols.associatedTreasureOrRealm, badgeClass: 'bg-teal-950/70 border-teal-500/40 text-teal-300' });
        }
        list.push({
          id: `snip_ols_${ols.id}`,
          category: 'ORAL_LORE',
          categoryLabel: 'Giai Thoại Kể Lại',
          categoryIcon: '🎙️',
          categoryBadgeBg: 'bg-amber-950/80',
          categoryBadgeBorder: 'border-amber-400/50',
          categoryBadgeText: 'text-amber-300',
          title: ols.subplotTitle,
          timeOrSetting: `${ols.recountedEraOrEvent} • ${ols.narrativeSetting}`,
          speakerOrEntity: `${meta ? meta.icon : '👤'} ${ols.speakerNameAndRole}`,
          tags,
          prose: ols.spokenDialogueDraft
        });
      }
    });

    // 2. Milestones (Niên Biểu Vận Mệnh)
    (currentProfile.milestones || []).forEach((m) => {
      if (m.novelSnippetDraft && m.novelSnippetDraft.trim()) {
        const meta = MILESTONE_TYPES_META[m.type];
        list.push({
          id: `snip_ms_${m.id}`,
          category: 'MILESTONES',
          categoryLabel: 'Niên Biểu Vận Mệnh',
          categoryIcon: '⏳',
          categoryBadgeBg: meta ? meta.badgeBg : 'bg-cyan-950/80',
          categoryBadgeBorder: meta ? meta.badgeBorder : 'border-cyan-400/50',
          categoryBadgeText: meta ? meta.badgeText : 'text-cyan-300',
          title: m.title,
          timeOrSetting: `${m.timeAnchor} • ${m.location}`,
          speakerOrEntity: meta ? meta.label : undefined,
          prose: m.novelSnippetDraft
        });
      }
    });

    // 3. Quests & Trials (Nhiệm Vụ & Bí Cảnh)
    questList.forEach((q) => {
      if (q.narrativeJournalSnippet && q.narrativeJournalSnippet.trim()) {
        list.push({
          id: `snip_q_${q.id}`,
          category: 'QUESTS',
          categoryLabel: 'Nhiệm Vụ & Bí Cảnh',
          categoryIcon: '📜',
          categoryBadgeBg: 'bg-emerald-950/80',
          categoryBadgeBorder: 'border-emerald-400/50',
          categoryBadgeText: 'text-emerald-300',
          title: q.title,
          timeOrSetting: `${q.stageTimeAnchor} • ${q.locationName}`,
          speakerOrEntity: q.issuingAuthorityOrContext,
          tags: [
            { label: 'Độ Khó', text: q.dangerAndDifficulty, badgeClass: 'bg-red-950/60 border-red-500/40 text-red-300' },
            { label: 'Trạng Thái', text: q.executionStatus, badgeClass: 'bg-blue-950/60 border-blue-500/40 text-blue-300' }
          ],
          prose: q.narrativeJournalSnippet
        });
      }
    });

    // 4. Karmic Inheritances (Cơ Duyên & Thần Binh)
    karmicList.forEach((k) => {
      if (k.novelLoreSnippet && k.novelLoreSnippet.trim()) {
        list.push({
          id: `snip_k_${k.id}`,
          category: 'KARMIC',
          categoryLabel: 'Cơ Duyên & Thần Binh',
          categoryIcon: '🌿',
          categoryBadgeBg: 'bg-purple-950/80',
          categoryBadgeBorder: 'border-purple-400/50',
          categoryBadgeText: 'text-purple-300',
          title: k.name,
          timeOrSetting: k.acquisitionMilestone,
          speakerOrEntity: `${k.rankOrGrade} • ${k.awakeningStage}`,
          prose: k.novelLoreSnippet
        });
      }
    });

    // 5. Dao Heart Demons (Tâm Ma & Đốn Ngộ)
    daoDemonList.forEach((d) => {
      if (d.enlightenmentSnippet && d.enlightenmentSnippet.trim()) {
        list.push({
          id: `snip_d_${d.id}`,
          category: 'DEMONS',
          categoryLabel: 'Tâm Ma & Đốn Ngộ',
          categoryIcon: '🧘',
          categoryBadgeBg: 'bg-indigo-950/80',
          categoryBadgeBorder: 'border-indigo-400/50',
          categoryBadgeText: 'text-indigo-300',
          title: d.demonName,
          timeOrSetting: d.triggerStage,
          speakerOrEntity: `${d.demonType} • ${d.breakthroughState}`,
          prose: d.enlightenmentSnippet
        });
      }
    });

    // 6. Nemesis Feuds (Túc Địch & Tử Chiến)
    nemesisList.forEach((n) => {
      if (n.duelSnippetDraft && n.duelSnippetDraft.trim()) {
        list.push({
          id: `snip_n_${n.id}`,
          category: 'NEMESIS',
          categoryLabel: 'Túc Địch & Tử Chiến',
          categoryIcon: '⚔️',
          categoryBadgeBg: 'bg-rose-950/80',
          categoryBadgeBorder: 'border-rose-400/50',
          categoryBadgeText: 'text-rose-300',
          title: n.nemesisName,
          timeOrSetting: n.destinedDuelCondition,
          speakerOrEntity: `${n.nemesisFactionAndRank} • ${n.feudSeverity}`,
          prose: n.duelSnippetDraft
        });
      }
    });

    return list;
  }, [oralLoreList, currentProfile.milestones, questList, karmicList, daoDemonList, nemesisList]);

  // Filtered Story Snippets
  const filteredStorySnippets = useMemo(() => {
    return allStorySnippets.filter((item) => {
      if (snippetCategoryFilter !== 'ALL' && item.category !== snippetCategoryFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.timeOrSetting.toLowerCase().includes(q) ||
          (item.speakerOrEntity && item.speakerOrEntity.toLowerCase().includes(q)) ||
          item.prose.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allStorySnippets, snippetCategoryFilter, searchFilter]);

  // Handlers for Relation
  const handleOpenAddRelation = () => {
    setEditingRelationId(null);
    setRelCategory('CHA_ME');
    setRelTargetName('');
    setRelTargetRole('');
    setRelIntimacy(85);
    setRelStatus('Còn Sống');
    setRelOrigin('');
    setRelDynamics('');
    setRelKarmic('');
    setRelationModalOpen(true);
  };

  const handleOpenEditRelation = (node: CharacterNexusRelationNode) => {
    setEditingRelationId(node.id);
    setRelCategory(node.category);
    setRelTargetName(node.targetName);
    setRelTargetRole(node.targetRoleOrTitle);
    setRelIntimacy(node.intimacyLevel);
    setRelStatus(node.status);
    setRelOrigin(node.originStory);
    setRelDynamics(node.currentDynamics);
    setRelKarmic(node.karmicTies);
    setRelationModalOpen(true);
  };

  const handleSaveRelation = () => {
    if (!relTargetName.trim()) {
      alert('Vui lòng nhập tên đối tượng!');
      return;
    }
    const newNode: CharacterNexusRelationNode = {
      id: editingRelationId || `rel_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: relCategory,
      targetName: relTargetName.trim(),
      targetRoleOrTitle: relTargetRole.trim() || 'Người liên quan',
      intimacyLevel: Number(relIntimacy),
      status: relStatus,
      originStory: relOrigin.trim(),
      currentDynamics: relDynamics.trim(),
      karmicTies: relKarmic.trim()
    };
    let updatedRelations = [...currentProfile.relations];
    if (editingRelationId) {
      updatedRelations = updatedRelations.map((r) => (r.id === editingRelationId ? newNode : r));
    } else {
      updatedRelations.push(newNode);
    }
    updateCurrentProfile({ ...currentProfile, relations: updatedRelations });
    setRelationModalOpen(false);
  };

  const handleDeleteRelation = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mối quan hệ định tuyến này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      relations: currentProfile.relations.filter((r) => r.id !== id)
    });
  };

  // Handlers for Milestone
  const handleOpenAddMilestone = () => {
    setEditingMilestoneId(null);
    setMsTimeAnchor('Năm 20 tuổi');
    setMsType('TU_LUYEN');
    setMsTitle('Đột Phá Cảnh Giới Mới');
    setMsLocation('Sơn Môn Động Phủ');
    setMsInvolved(currentChar.name);
    setMsDescription('Trải qua quá trình bế quan nghiêm ngặt, dẫn linh khí tẩy tủy phạt mao...');
    setMsCultivation('Trúc Cơ Viên Mãn -> Kết Đan Cực Phẩm');
    setMsPsychological('Đạo tâm càng thêm kiên định, thấu triệt sinh tử.');
    setMsKarmic('Bước chuyển mình then chốt để bước lên hàng ngũ cường giả.');
    setMsSnippet('Mây sấm cuồn cuộn trên đỉnh núi. Đan điền rực sáng như vầng thái dương...');
    setMilestoneModalOpen(true);
  };

  const handleOpenEditMilestone = (ms: CharacterTrajectoryMilestone) => {
    setEditingMilestoneId(ms.id);
    setMsTimeAnchor(ms.timeAnchor);
    setMsType(ms.type);
    setMsTitle(ms.title);
    setMsLocation(ms.location);
    setMsInvolved(ms.involvedCharacters.join(', '));
    setMsDescription(ms.description);
    setMsCultivation(ms.cultivationStateBeforeAndAfter);
    setMsPsychological(ms.psychologicalTransformation);
    setMsKarmic(ms.karmicEcho);
    setMsSnippet(ms.novelSnippetDraft || '');
    setMilestoneModalOpen(true);
  };

  const handleSaveMilestone = () => {
    if (!msTitle.trim()) {
      alert('Vui lòng nhập tiêu đề mốc biến cố!');
      return;
    }
    const newMs: CharacterTrajectoryMilestone = {
      id: editingMilestoneId || `ms_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timeAnchor: msTimeAnchor.trim(),
      type: msType,
      title: msTitle.trim(),
      location: msLocation.trim() || 'Chưa xác định',
      involvedCharacters: msInvolved.split(',').map((s) => s.trim()).filter(Boolean),
      description: msDescription.trim(),
      cultivationStateBeforeAndAfter: msCultivation.trim(),
      psychologicalTransformation: msPsychological.trim(),
      karmicEcho: msKarmic.trim(),
      novelSnippetDraft: msSnippet.trim()
    };
    let updatedMilestones = [...currentProfile.milestones];
    if (editingMilestoneId) {
      updatedMilestones = updatedMilestones.map((m) => (m.id === editingMilestoneId ? newMs : m));
    } else {
      updatedMilestones.push(newMs);
    }
    updateCurrentProfile({ ...currentProfile, milestones: updatedMilestones });
    setMilestoneModalOpen(false);
  };

  const handleDeleteMilestone = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mốc niên biểu này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      milestones: currentProfile.milestones.filter((m) => m.id !== id)
    });
  };

  // Handlers for Quest
  const handleOpenAddQuest = () => {
    setEditingQuestId(null);
    setQtrCategory('NHIEM_VU');
    setQtrTitle('');
    setQtrStageTime('Năm 20 tuổi');
    setQtrLocation('');
    setQtrDifficulty('Hiểm Trở');
    setQtrStatus('Đang Thực Hiện');
    setQtrAuthority('Tông Môn Chấp Pháp Điện');
    setQtrObjectives('Mục tiêu 1\nMục tiêu 2');
    setQtrRewards('Bảo vật, đan dược, đột phá tu vi');
    setQtrEncounters('Yêu thú hoặc ma tu trấn giữ');
    setQtrSnippet('');
    setQuestModalOpen(true);
  };

  const handleOpenEditQuest = (q: CharacterQuestTrialRecord) => {
    setEditingQuestId(q.id);
    setQtrCategory(q.category);
    setQtrTitle(q.title);
    setQtrStageTime(q.stageTimeAnchor);
    setQtrLocation(q.locationName);
    setQtrDifficulty(q.dangerAndDifficulty);
    setQtrStatus(q.executionStatus);
    setQtrAuthority(q.issuingAuthorityOrContext);
    setQtrObjectives(q.keyObjectives.join('\n'));
    setQtrRewards(q.rewardsOrBreakthroughs);
    setQtrEncounters(q.trialEncounters);
    setQtrSnippet(q.narrativeJournalSnippet || '');
    setQuestModalOpen(true);
  };

  const handleSaveQuest = () => {
    if (!qtrTitle.trim()) {
      alert('Vui lòng nhập tiêu đề nhiệm vụ / thí luyện / bí cảnh!');
      return;
    }
    const newQ: CharacterQuestTrialRecord = {
      id: editingQuestId || `qtr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      category: qtrCategory,
      title: qtrTitle.trim(),
      stageTimeAnchor: qtrStageTime.trim() || 'Chưa định',
      locationName: qtrLocation.trim() || 'Chưa xác định',
      dangerAndDifficulty: qtrDifficulty,
      executionStatus: qtrStatus,
      issuingAuthorityOrContext: qtrAuthority.trim(),
      keyObjectives: qtrObjectives.split('\n').map((s) => s.trim()).filter(Boolean),
      rewardsOrBreakthroughs: qtrRewards.trim(),
      trialEncounters: qtrEncounters.trim(),
      narrativeJournalSnippet: qtrSnippet.trim()
    };
    let updatedQuests = [...questList];
    if (editingQuestId) {
      updatedQuests = updatedQuests.map((q) => (q.id === editingQuestId ? newQ : q));
    } else {
      updatedQuests.push(newQ);
    }
    updateCurrentProfile({ ...currentProfile, questTrialRecords: updatedQuests });
    setQuestModalOpen(false);
  };

  const handleDeleteQuest = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa bản ghi này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      questTrialRecords: questList.filter((q) => q.id !== id)
    });
  };

  // Handlers for Geo
  const handleOpenAddGeo = () => {
    setEditingGeoId(null);
    setGeoName('');
    setGeoType('THANH_TRI');
    setGeoStatus('DA_TRAI_QUA');
    setGeoStage('Giai đoạn 1: Thuở Hàn Vi');
    setGeoRegion('Đông Vực');
    setGeoTerrain('Phồn hoa sầm uất, linh khí trung bình');
    setGeoTasks('Hoàn thành nhiệm vụ giao thương, đánh bại đối thủ');
    setGeoConquest('Chiến lợi phẩm thu hoạch hoặc danh tiếng để lại');
    setGeoScenery('');
    setGeoModalOpen(true);
  };

  const handleOpenEditGeo = (g: GeographicExpeditionNode) => {
    setEditingGeoId(g.id);
    setGeoName(g.name);
    setGeoType(g.type);
    setGeoStatus(g.status);
    setGeoStage(g.chronologicalStage);
    setGeoRegion(g.realmOrRegion);
    setGeoTerrain(g.terrainAndAura);
    setGeoTasks(g.requiredTasksOrTrials);
    setGeoConquest(g.conquestOrLegacy);
    setGeoScenery(g.novelSceneryProse || '');
    setGeoModalOpen(true);
  };

  const handleSaveGeo = () => {
    if (!geoName.trim()) {
      alert('Vui lòng nhập tên địa danh!');
      return;
    }
    const newG: GeographicExpeditionNode = {
      id: editingGeoId || `geo_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: geoName.trim(),
      type: geoType,
      status: geoStatus,
      chronologicalStage: geoStage.trim() || 'Giai đoạn chung',
      realmOrRegion: geoRegion.trim() || 'Tu Chân Giới',
      terrainAndAura: geoTerrain.trim(),
      requiredTasksOrTrials: geoTasks.trim(),
      conquestOrLegacy: geoConquest.trim(),
      novelSceneryProse: geoScenery.trim()
    };
    let updatedAtlas = [...atlasList];
    if (editingGeoId) {
      updatedAtlas = updatedAtlas.map((g) => (g.id === editingGeoId ? newG : g));
    } else {
      updatedAtlas.push(newG);
    }
    updateCurrentProfile({ ...currentProfile, geographicAtlas: updatedAtlas });
    setGeoModalOpen(false);
  };

  const handleDeleteGeo = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa địa danh này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      geographicAtlas: atlasList.filter((g) => g.id !== id)
    });
  };

  // Handlers for Karmic Inheritance
  const handleOpenAddKarmic = () => {
    setEditingKarmicId(null);
    setKiName('');
    setKiType('THAN_BINH_BAN_MENH');
    setKiMilestone('Năm 16 tuổi');
    setKiGrade('Cực Phẩm Linh Bảo');
    setKiAwakening('Tầng 3/9 Phong Ấn');
    setKiBond('Tâm Huyết Tương Liên');
    setKiAbilities('Trảm Không Kiếm Khí\nHộ Thể Kiếm Cương');
    setKiCost('Tiêu hao một phần mười tinh huyết khi giải phong ấn');
    setKiSnippet('');
    setKarmicModalOpen(true);
  };

  const handleOpenEditKarmic = (k: CharacterKarmicInheritanceBranch) => {
    setEditingKarmicId(k.id);
    setKiName(k.name);
    setKiType(k.type);
    setKiMilestone(k.acquisitionMilestone);
    setKiGrade(k.rankOrGrade);
    setKiAwakening(k.awakeningStage);
    setKiBond(k.soulBondStatus);
    setKiAbilities(k.specialAbilities.join('\n'));
    setKiCost(k.karmicCostOrBacklash);
    setKiSnippet(k.novelLoreSnippet || '');
    setKarmicModalOpen(true);
  };

  const handleSaveKarmic = () => {
    if (!kiName.trim()) {
      alert('Vui lòng nhập tên thần binh / cơ duyên!');
      return;
    }
    const newK: CharacterKarmicInheritanceBranch = {
      id: editingKarmicId || `ki_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: kiName.trim(),
      type: kiType,
      acquisitionMilestone: kiMilestone.trim() || 'Chưa rõ',
      rankOrGrade: kiGrade.trim() || 'Linh Bảo',
      awakeningStage: kiAwakening.trim() || 'Chưa thức tỉnh',
      soulBondStatus: kiBond,
      specialAbilities: kiAbilities.split('\n').map((s) => s.trim()).filter(Boolean),
      karmicCostOrBacklash: kiCost.trim(),
      novelLoreSnippet: kiSnippet.trim()
    };
    let updatedKarmic = [...karmicList];
    if (editingKarmicId) {
      updatedKarmic = updatedKarmic.map((k) => (k.id === editingKarmicId ? newK : k));
    } else {
      updatedKarmic.push(newK);
    }
    updateCurrentProfile({ ...currentProfile, karmicInheritances: updatedKarmic });
    setKarmicModalOpen(false);
  };

  const handleDeleteKarmic = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa cơ duyên này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      karmicInheritances: karmicList.filter((k) => k.id !== id)
    });
  };

  // Handlers for Nemesis Feud
  const handleOpenAddNemesis = () => {
    setEditingNemesisId(null);
    setNfName('');
    setNfFactionRank('Ma Tông - Đại Thừa Kỳ');
    setNfOrigin('');
    setNfSeverity('Huyết Hải Thâm Cừu');
    setNfStatus('Chờ Ngày Quyết Đấu');
    setNfClashes('');
    setNfDuelCond('Quyết chiến khi Ma Nguyệt che khuất Thái Dương');
    setNfReward('Đoạt lại di bảo sư môn, đột phá cảnh giới');
    setNfSnippet('');
    setNemesisModalOpen(true);
  };

  const handleOpenEditNemesis = (n: CharacterNemesisFeudBranch) => {
    setEditingNemesisId(n.id);
    setNfName(n.nemesisName);
    setNfFactionRank(n.nemesisFactionAndRank);
    setNfOrigin(n.feudOriginCause);
    setNfSeverity(n.feudSeverity);
    setNfStatus(n.status);
    setNfClashes(n.pastClashes);
    setNfDuelCond(n.destinedDuelCondition);
    setNfReward(n.feudResolutionReward);
    setNfSnippet(n.duelSnippetDraft || '');
    setNemesisModalOpen(true);
  };

  const handleSaveNemesis = () => {
    if (!nfName.trim()) {
      alert('Vui lòng nhập tên túc địch!');
      return;
    }
    const newN: CharacterNemesisFeudBranch = {
      id: editingNemesisId || `nf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      nemesisName: nfName.trim(),
      nemesisFactionAndRank: nfFactionRank.trim(),
      feudOriginCause: nfOrigin.trim(),
      feudSeverity: nfSeverity,
      status: nfStatus,
      pastClashes: nfClashes.trim(),
      destinedDuelCondition: nfDuelCond.trim(),
      feudResolutionReward: nfReward.trim(),
      duelSnippetDraft: nfSnippet.trim()
    };
    let updatedNemesis = [...nemesisList];
    if (editingNemesisId) {
      updatedNemesis = updatedNemesis.map((n) => (n.id === editingNemesisId ? newN : n));
    } else {
      updatedNemesis.push(newN);
    }
    updateCurrentProfile({ ...currentProfile, nemesisFeuds: updatedNemesis });
    setNemesisModalOpen(false);
  };

  const handleDeleteNemesis = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa túc địch này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      nemesisFeuds: nemesisList.filter((n) => n.id !== id)
    });
  };

  // Handlers for Dao Heart Demon
  const handleOpenAddDaoDemon = () => {
    setEditingDemonId(null);
    setDhdName('');
    setDhdType('CHẤP_NIỆM_QUÁ_KHỨ');
    setDhdStage('Đột phá Nguyên Anh Kỳ');
    setDhdManifest('');
    setDhdMethod('');
    setDhdMastery('Sinh Tử Kiếm Vực 70%');
    setDhdState('Đã Đốn Ngộ Hoàn Toàn');
    setDhdSnippet('');
    setDaoDemonModalOpen(true);
  };

  const handleOpenEditDaoDemon = (d: CharacterDaoHeartDemonBranch) => {
    setEditingDemonId(d.id);
    setDhdName(d.demonName);
    setDhdType(d.demonType);
    setDhdStage(d.triggerStage);
    setDhdManifest(d.innerDemonManifestation);
    setDhdMethod(d.daoResolutionMethod);
    setDhdMastery(d.daoDomainMastery);
    setDhdState(d.breakthroughState);
    setDhdSnippet(d.enlightenmentSnippet || '');
    setDaoDemonModalOpen(true);
  };

  const handleSaveDaoDemon = () => {
    if (!dhdName.trim()) {
      alert('Vui lòng nhập tên tâm ma kiếp nạn!');
      return;
    }
    const newD: CharacterDaoHeartDemonBranch = {
      id: editingDemonId || `dhd_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      demonName: dhdName.trim(),
      demonType: dhdType,
      triggerStage: dhdStage.trim(),
      innerDemonManifestation: dhdManifest.trim(),
      daoResolutionMethod: dhdMethod.trim(),
      daoDomainMastery: dhdMastery.trim(),
      breakthroughState: dhdState,
      enlightenmentSnippet: dhdSnippet.trim()
    };
    let updatedDemons = [...daoDemonList];
    if (editingDemonId) {
      updatedDemons = updatedDemons.map((d) => (d.id === editingDemonId ? newD : d));
    } else {
      updatedDemons.push(newD);
    }
    updateCurrentProfile({ ...currentProfile, daoHeartDemons: updatedDemons });
    setDaoDemonModalOpen(false);
  };

  const handleDeleteDaoDemon = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa tâm ma này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      daoHeartDemons: daoDemonList.filter((d) => d.id !== id)
    });
  };

  // Handlers for Faction Power
  const handleOpenAddFaction = () => {
    setEditingFactionId(null);
    setFpName('');
    setFpRole('Chưởng Môn / Lãnh Tụ');
    setFpAuthority('Chấp Chưởng Trọng Quyền');
    setFpTerritory('');
    setFpAllies('Chiến Đường\nChấp Pháp Điện');
    setFpRivals('');
    setFpLegacy('');
    setFactionModalOpen(true);
  };

  const handleOpenEditFaction = (f: CharacterFactionPowerBranch) => {
    setEditingFactionId(f.id);
    setFpName(f.factionName);
    setFpRole(f.characterTitleOrRole);
    setFpAuthority(f.authorityLevel);
    setFpTerritory(f.controlledTerritory);
    setFpAllies(f.alliedSubFactions.join('\n'));
    setFpRivals(f.rivalFactionForces);
    setFpLegacy(f.powerLegacyContribution);
    setFactionModalOpen(true);
  };

  const handleSaveFaction = () => {
    if (!fpName.trim()) {
      alert('Vui lòng nhập tên môn phái / thế lực!');
      return;
    }
    const newF: CharacterFactionPowerBranch = {
      id: editingFactionId || `fp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      factionName: fpName.trim(),
      characterTitleOrRole: fpRole.trim(),
      authorityLevel: fpAuthority,
      controlledTerritory: fpTerritory.trim(),
      alliedSubFactions: fpAllies.split('\n').map((s) => s.trim()).filter(Boolean),
      rivalFactionForces: fpRivals.trim(),
      powerLegacyContribution: fpLegacy.trim()
    };
    let updatedFactions = [...factionList];
    if (editingFactionId) {
      updatedFactions = updatedFactions.map((f) => (f.id === editingFactionId ? newF : f));
    } else {
      updatedFactions.push(newF);
    }
    updateCurrentProfile({ ...currentProfile, factionPowers: updatedFactions });
    setFactionModalOpen(false);
  };

  const handleDeleteFaction = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa thế lực này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      factionPowers: factionList.filter((f) => f.id !== id)
    });
  };

  // Handlers for Oral Lore
  const handleOpenAddOralLore = () => {
    setEditingOralLoreId(null);
    setOlsTitle('');
    setOlsSpeakerType('THUYET_THU_NHAN');
    setOlsSpeakerNameAndRole('Lão Thuyết Thư Nhân Triệu Cửu Công (Khách điếm Lạc Dương)');
    setOlsNarrativeSetting('Trà quán lộng gió chiều tà bên ngoài Tiên Thành Lạc Dương, tiếng thước kinh đường vang giòn');
    setOlsRecountedEra('Giai đoạn xuất sơn lập nghiệp / Trận chiến hiểm ác trong quá khứ');
    setOlsAssociatedMission('');
    setOlsMissionExecutionTruth('');
    setOlsBreakthroughStage('');
    setOlsTribulationPhenomenon('');
    setOlsBreakthroughTruth('');
    setOlsTreasure('');
    setOlsTreasureCategory('THIEN_TAI_DIA_BAO');
    setOlsTrialSecret('');
    setOlsImmortalTree('');
    setOlsPerspectiveSummary('Vừa sùng kính vừa xúc động rớt nước mắt trước ý chí sắt đá của nhân vật');
    setOlsTruthVsRumor('Sự thật cốt lõi vs Dị bản đồn thổi thêu dệt của thế gian');
    setOlsVividImpact('Chi tiết độc đáo làm nhân vật sống động (thói quen, ánh mắt, vết sẹo, nụ cười, cử chỉ)');
    setOlsDialogueDraft('');
    setOralLoreModalOpen(true);
  };

  const handleOpenEditOralLore = (item: CharacterOralLoreSubplot) => {
    setEditingOralLoreId(item.id);
    setOlsTitle(item.subplotTitle);
    setOlsSpeakerType(item.speakerType);
    setOlsSpeakerNameAndRole(item.speakerNameAndRole);
    setOlsNarrativeSetting(item.narrativeSetting);
    setOlsRecountedEra(item.recountedEraOrEvent);
    setOlsAssociatedMission(item.associatedMissionOrQuest || '');
    setOlsMissionExecutionTruth(item.missionExecutionTruth || '');
    setOlsBreakthroughStage(item.breakthroughCultivationStage || '');
    setOlsTribulationPhenomenon(item.tribulationOrPhenomenon || '');
    setOlsBreakthroughTruth(item.breakthroughRealTruth || '');
    setOlsTreasure(item.associatedTreasureOrRealm || '');
    setOlsTreasureCategory(item.treasureLoreCategory || 'THIEN_TAI_DIA_BAO');
    setOlsTrialSecret(item.treasureTrialSecret || '');
    setOlsImmortalTree(item.immortalTreeConnection || '');
    setOlsPerspectiveSummary(item.narrativePerspectiveSummary);
    setOlsTruthVsRumor(item.historicalTruthVsRumor);
    setOlsVividImpact(item.characterVividImpact);
    setOlsDialogueDraft(item.spokenDialogueDraft);
    setOralLoreModalOpen(true);
  };

  const handleSaveOralLore = () => {
    if (!olsTitle.trim()) {
      alert('Vui lòng nhập tiêu đề giai thoại / mạch chuyện phụ!');
      return;
    }
    const newOls: CharacterOralLoreSubplot = {
      id: editingOralLoreId || `ols_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      subplotTitle: olsTitle.trim(),
      speakerType: olsSpeakerType,
      speakerNameAndRole: olsSpeakerNameAndRole.trim(),
      narrativeSetting: olsNarrativeSetting.trim(),
      recountedEraOrEvent: olsRecountedEra.trim(),
      breakthroughCultivationStage: olsBreakthroughStage.trim() || undefined,
      tribulationOrPhenomenon: olsTribulationPhenomenon.trim() || undefined,
      breakthroughRealTruth: olsBreakthroughTruth.trim() || undefined,
      associatedMissionOrQuest: olsAssociatedMission.trim() || undefined,
      missionExecutionTruth: olsMissionExecutionTruth.trim() || undefined,
      associatedTreasureOrRealm: olsTreasure.trim() || undefined,
      treasureLoreCategory: olsTreasureCategory,
      treasureTrialSecret: olsTrialSecret.trim() || undefined,
      immortalTreeConnection: olsImmortalTree.trim() || undefined,
      narrativePerspectiveSummary: olsPerspectiveSummary.trim(),
      historicalTruthVsRumor: olsTruthVsRumor.trim(),
      characterVividImpact: olsVividImpact.trim(),
      spokenDialogueDraft: olsDialogueDraft.trim()
    };
    let updatedList = [...oralLoreList];
    if (editingOralLoreId) {
      updatedList = updatedList.map((item) => (item.id === editingOralLoreId ? newOls : item));
    } else {
      updatedList.push(newOls);
    }
    updateCurrentProfile({ ...currentProfile, oralLoreSubplots: updatedList });
    setOralLoreModalOpen(false);
  };

  const handleDeleteOralLore = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa giai thoại kể lại này?')) return;
    updateCurrentProfile({
      ...currentProfile,
      oralLoreSubplots: oralLoreList.filter((item) => item.id !== id)
    });
  };

  // Handle AI Generate Trajectory
  const handleAIGenerateTrajectory = async () => {
    setIsGeneratingTrajectory(true);
    try {
      const generated = await generateCharacterTrajectoryRouting({
        character: currentChar,
        genre,
        focusPrompt: aiFocusPrompt
      });
      updateCurrentProfile(generated);
      alert(`Đã dệt thành công toàn bộ Mạng lưới quan hệ, Niên biểu, Nhiệm vụ, Bản đồ địa danh và các Nhánh chuyên sâu cho ${currentChar.name}!`);
      setActiveTab('nexusGraph');
    } catch (err: any) {
      console.error(err);
      alert('Có lỗi khi tạo định tuyến: ' + (err?.message || 'Vui lòng thử lại!'));
    } finally {
      setIsGeneratingTrajectory(false);
    }
  };

  // Export full biography to draft
  const handleExportFullBiography = () => {
    if (!onInsertText) return;

    let text = `\n=======================================================\n`;
    text += `### ĐỊNH TUYẾN MẠNG LƯỚI & NIÊN BIỂU VẬN MỆNH: ${currentChar.name.toUpperCase()}\n`;
    text += `Danh hiệu: ${currentProfile.characterAlias || currentChar.pinyinOrAlias || 'Chí Tôn'}\n`;
    text += `Cảnh giới: ${currentChar.realmOrRank} | Thế lực: ${currentChar.sectOrFaction || 'Tán tu'}\n`;
    text += `Đạo tâm cốt lõi: ${currentProfile.overviewPhilosophy}\n`;
    text += `Đại thệ vận mệnh: ${currentProfile.lifeDestinyVow}\n`;
    text += `=======================================================\n\n`;

    text += `#### I. MẠNG LƯỚI QUAN HỆ & NHÂN QUẢ (10 NHÓM):\n`;
    currentProfile.relations.forEach((r, idx) => {
      const meta = NEXUS_CATEGORIES_META[r.category];
      text += `${idx + 1}. [${meta.label}] ${r.targetName} (${r.targetRoleOrTitle})\n`;
      text += `   - Trạng thái: ${r.status} | Độ thân mật: ${r.intimacyLevel}/100\n`;
      text += `   - Nguồn gốc: ${r.originStory}\n`;
      text += `   - Dây dưa hiện tại: ${r.currentDynamics}\n`;
      text += `   - Duyên nợ nhân quả: ${r.karmicTies}\n\n`;
    });

    text += `#### II. NIÊN BIỂU ĐỊNH TUYẾN CÁC MỐC VẬN MỆNH:\n`;
    currentProfile.milestones.forEach((m, idx) => {
      const meta = MILESTONE_TYPES_META[m.type];
      text += `--- Mốc ${idx + 1}: ${m.timeAnchor} • [${meta.label}] ${m.title} ---\n`;
      text += `Địa điểm: ${m.location}\n`;
      if (m.involvedCharacters?.length > 0) {
        text += `Nhân vật liên đới: ${m.involvedCharacters.join(', ')}\n`;
      }
      text += `Diễn biến: ${m.description}\n`;
      text += `Biến chuyển tu vi: ${m.cultivationStateBeforeAndAfter}\n`;
      text += `Biến chuyển tâm tính: ${m.psychologicalTransformation}\n`;
      text += `Âm vang nhân quả: ${m.karmicEcho}\n`;
      if (m.novelSnippetDraft) {
        text += `Trích đoạn văn phong: "${m.novelSnippetDraft}"\n`;
      }
      text += `\n`;
    });

    if (questList.length > 0) {
      text += `#### III. NHÁNH NHIỆM VỤ, DU NGOẠN, THÍ LUYỆN & VÀO BÍ CẢNH:\n`;
      questList.forEach((q, idx) => {
        const meta = QUEST_TRIAL_CATEGORIES_META[q.category];
        text += `${idx + 1}. [${meta.label}] ${q.title} (${q.stageTimeAnchor})\n`;
        text += `   - Địa danh: ${q.locationName} | Độ nguy hiểm: ${q.dangerAndDifficulty} | Trạng thái: ${q.executionStatus}\n`;
        text += `   - Bối cảnh/Giao phó: ${q.issuingAuthorityOrContext}\n`;
        text += `   - Mục tiêu: ${q.keyObjectives.join('; ')}\n`;
        text += `   - Thử thách/Kẻ địch: ${q.trialEncounters}\n`;
        text += `   - Phần thưởng & Đột phá: ${q.rewardsOrBreakthroughs}\n`;
        if (q.narrativeJournalSnippet) {
          text += `   - Ký sự: "${q.narrativeJournalSnippet}"\n`;
        }
        text += `\n`;
      });
    }

    if (atlasList.length > 0) {
      text += `#### IV. BẢN ĐỒ ĐỊA DANH & SƠN HÀ HÀNH TRÌNH THEO MỐC GIAI ĐOẠN:\n`;
      atlasList.forEach((g, idx) => {
        const typeMeta = GEOGRAPHIC_TYPES_META[g.type];
        const statusMeta = GEOGRAPHIC_STATUS_META[g.status];
        text += `${idx + 1}. ${g.name} [${typeMeta.label} - ${statusMeta.label}]\n`;
        text += `   - Mốc giai đoạn: ${g.chronologicalStage} | Vực: ${g.realmOrRegion}\n`;
        text += `   - Địa hình & Linh khí: ${g.terrainAndAura}\n`;
        text += `   - Nhiệm vụ bắt buộc: ${g.requiredTasksOrTrials}\n`;
        text += `   - Dấu ấn/Chiến tích: ${g.conquestOrLegacy}\n`;
        if (g.novelSceneryProse) {
          text += `   - Cảnh sắc không gian: "${g.novelSceneryProse}"\n`;
        }
        text += `\n`;
      });
    }

    if (karmicList.length > 0) {
      text += `#### V. NHÁNH CƠ DUYÊN THẦN BINH & TRUYỀN THỪA CỔ TIÊN:\n`;
      karmicList.forEach((k, idx) => {
        const meta = KARMIC_TYPES_META[k.type];
        text += `${idx + 1}. [${meta.label}] ${k.name} (${k.rankOrGrade})\n`;
        text += `   - Mốc đạt được: ${k.acquisitionMilestone} | Thức tỉnh: ${k.awakeningStage}\n`;
        text += `   - Liên kết hồn phách: ${k.soulBondStatus}\n`;
        text += `   - Thần thông: ${k.specialAbilities.join(', ')}\n`;
        text += `   - Phản phệ/Cái giá: ${k.karmicCostOrBacklash}\n\n`;
      });
    }

    if (nemesisList.length > 0) {
      text += `#### VI. NHÁNH TÚC ĐỊCH HUYẾT THÙ & QUYẾT CHIẾN SINH TỬ:\n`;
      nemesisList.forEach((n, idx) => {
        text += `${idx + 1}. Túc địch: ${n.nemesisName} (${n.nemesisFactionAndRank})\n`;
        text += `   - Cấp độ hận thù: [${n.feudSeverity}] | Trạng thái: ${n.status}\n`;
        text += `   - Nguồn gốc: ${n.feudOriginCause}\n`;
        text += `   - Các trận quá khứ: ${n.pastClashes}\n`;
        text += `   - Ước hẹn quyết chiến: ${n.destinedDuelCondition}\n`;
        text += `   - Phần thưởng diệt thù: ${n.feudResolutionReward}\n\n`;
      });
    }

    if (daoDemonList.length > 0) {
      text += `#### VII. NHÁNH TÂM MA KIẾP & GIÁC NGỘ ĐẠO TÂM:\n`;
      daoDemonList.forEach((d, idx) => {
        text += `${idx + 1}. [${d.demonType}] ${d.demonName} (${d.triggerStage})\n`;
        text += `   - Biểu hiện tâm ma: ${d.innerDemonManifestation}\n`;
        text += `   - Phương pháp phá chấp: ${d.daoResolutionMethod}\n`;
        text += `   - Đạo vực đắc chứng: ${d.daoDomainMastery} | Trạng thái: ${d.breakthroughState}\n\n`;
      });
    }

    if (factionList.length > 0) {
      text += `#### VIII. NHÁNH THẾ LỰC, BANG HỘI & LÃNH ĐỊA:\n`;
      factionList.forEach((f, idx) => {
        text += `${idx + 1}. Thế lực: ${f.factionName} | Chức vị: ${f.characterTitleOrRole} [${f.authorityLevel}]\n`;
        text += `   - Lãnh địa cai quản: ${f.controlledTerritory}\n`;
        text += `   - Đồng minh: ${f.alliedSubFactions.join(', ')}\n`;
        text += `   - Đối lập/Hiềm khích: ${f.rivalFactionForces}\n`;
        text += `   - Di sản đóng góp: ${f.powerLegacyContribution}\n\n`;
      });
    }

    if (oralLoreList.length > 0) {
      text += `#### IX. MẠCH CHUYỆN PHỤ & GIAI THOẠI TIỂU SỬ QUA LỜI TƯỜNG THUẬT (ORAL LORE & VIGNETTES):\n`;
      oralLoreList.forEach((ols, idx) => {
        const meta = ORAL_LORE_SPEAKER_META[ols.speakerType];
        text += `${idx + 1}. [${meta.label}] ${ols.subplotTitle}\n`;
        text += `   - Người kể & Thân phận: ${ols.speakerNameAndRole}\n`;
        text += `   - Bối cảnh nhắc tới: ${ols.narrativeSetting}\n`;
        text += `   - Mốc thời gian/Biến cố: ${ols.recountedEraOrEvent}\n`;
        text += `   - Góc nhìn người kể: ${ols.narrativePerspectiveSummary}\n`;
        text += `   - Sự thật vs Dị bản: ${ols.historicalTruthVsRumor}\n`;
        if (ols.breakthroughCultivationStage) {
          text += `   - Mốc đột phá cảnh giới: ⚡ ${ols.breakthroughCultivationStage}\n`;
        }
        if (ols.tribulationOrPhenomenon) {
          text += `   - Dị tượng lôi kiếp / Thiên địa: 🌀 ${ols.tribulationOrPhenomenon}\n`;
        }
        if (ols.breakthroughRealTruth) {
          text += `   - Chân tướng đột phá & Đạo tâm: ${ols.breakthroughRealTruth}\n`;
        }
        if (ols.associatedMissionOrQuest) {
          text += `   - Nhiệm vụ/Chuyến đi liên quan: 🎯 ${ols.associatedMissionOrQuest}\n`;
        }
        if (ols.missionExecutionTruth) {
          text += `   - Chân tướng thực hiện nhiệm vụ: ${ols.missionExecutionTruth}\n`;
        }
        if (ols.associatedTreasureOrRealm) {
          const catMeta = ols.treasureLoreCategory ? TREASURE_LORE_CATEGORIES_META[ols.treasureLoreCategory] : null;
          text += `   - Liên quan: [${catMeta ? catMeta.label : 'Bảo Vật / Bí Cảnh'}] ${ols.associatedTreasureOrRealm}\n`;
        }
        if (ols.treasureTrialSecret) {
          text += `   - Bí mật khảo nghiệm / Điều kiện truyền thừa: ${ols.treasureTrialSecret}\n`;
        }
        if (ols.immortalTreeConnection) {
          text += `   - Mạch kết nối Cây Trường Sinh: ${ols.immortalTreeConnection}\n`;
        }
        text += `   - Chi tiết khắc họa sống động: ${ols.characterVividImpact}\n`;
        if (ols.spokenDialogueDraft) {
          text += `   - Lời thoại/Độc thoại tường thuật:\n"${ols.spokenDialogueDraft}"\n`;
        }
        text += `\n`;
      });
    }

    onInsertText(text);
    alert('Đã xuất toàn bộ 9 chiều không gian định tuyến và giai thoại tiểu sử nhân vật vào bản thảo!');
  };

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-100 font-sans select-none overflow-hidden">
      {/* =========================================================================
          TOP CONTEXT BAR: CHARACTER SELECTOR & MASTER ACTIONS
          ========================================================================= */}
      <div className="px-6 py-3 bg-gray-900/90 border-b border-purple-500/30 flex flex-wrap items-center justify-between gap-3 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-lg shadow-md shadow-purple-900/30">
            🧭
          </div>
          <div>
            <h2 className="text-sm font-black tracking-wide text-white uppercase flex items-center gap-2">
              <span>MÔ HÌNH SƠ ĐỒ ĐỊNH TUYẾN NHÂN VẬT TOÀN DIỆN</span>
              <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full">
                9 CHIỀU ĐỊNH TUYẾN • CHUẨN ĐẠI TÔNG SƯ
              </span>
            </h2>
            <p className="text-[11px] text-gray-400">
              10 Quan hệ • Niên biểu • Nhiệm vụ bí cảnh • Địa danh • Thần binh cơ duyên • Túc địch • Tâm ma ngộ đạo • Thế lực • Giai thoại kể lại
            </p>
          </div>
        </div>

        {/* Character Switcher & Export */}
        <div className="flex items-center gap-2.5">
          <label className="text-xs text-gray-400 font-semibold">Nhân vật:</label>
          <select
            value={selectedCharId}
            onChange={(e) => setSelectedCharId(e.target.value)}
            className="bg-gray-900 text-amber-300 border border-purple-500/40 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-amber-400"
          >
            {characters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.role} • {c.realmOrRank})
              </option>
            ))}
          </select>

          {onInsertText && (
            <button
              onClick={handleExportFullBiography}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all"
              title="Xuất toàn bộ 9 chiều định tuyến và giai thoại vào truyện"
            >
              <span>📝</span> Xuất Vào Bản Thảo
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          CHARACTER PROFILE HERO BANNER
          ========================================================================= */}
      <div className="px-6 py-3.5 bg-gradient-to-r from-purple-950/40 via-gray-950/70 to-indigo-950/40 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="text-lg font-black text-white">{currentChar.name}</span>
              <span className="text-xs text-amber-300 font-mono font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                {currentProfile.characterAlias || currentChar.pinyinOrAlias || 'Kiếm Tôn'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono">
                {currentChar.realmOrRank}
              </span>
              <span className="text-xs text-cyan-300 font-medium">
                {currentChar.sectOrFaction || 'Tán tu'}
              </span>
            </div>
            <p className="text-xs text-gray-300 line-clamp-1 italic">
              ⚖️ <strong className="text-amber-200">Đạo Tâm:</strong> {currentProfile.overviewPhilosophy}
            </p>
            <p className="text-xs text-rose-300 line-clamp-1 font-medium">
              🎯 <strong className="text-rose-200">Đại Thệ Vận Mệnh:</strong> {currentProfile.lifeDestinyVow}
            </p>
          </div>

          {/* Quick Stats Badges across all 9 branches */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">QUAN HỆ</span>
              <span className="text-xs font-black text-amber-300">{currentProfile.relations.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">NIÊN BIỂU</span>
              <span className="text-xs font-black text-cyan-300">{currentProfile.milestones.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">NHIỆM VỤ</span>
              <span className="text-xs font-black text-emerald-300">{questList.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">ĐỊA DANH</span>
              <span className="text-xs font-black text-pink-300">{atlasList.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">THẦN BINH</span>
              <span className="text-xs font-black text-amber-400">{karmicList.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">TÚC ĐỊCH</span>
              <span className="text-xs font-black text-red-400">{nemesisList.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">TÂM MA</span>
              <span className="text-xs font-black text-purple-400">{daoDemonList.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">THẾ LỰC</span>
              <span className="text-xs font-black text-blue-400">{factionList.length}</span>
            </div>
            <div className="px-2.5 py-1 rounded-xl bg-gray-900/80 border border-purple-500/30 text-center">
              <span className="text-[9px] text-gray-400 block font-mono">GIAI THOẠI</span>
              <span className="text-xs font-black text-amber-300">{oralLoreList.length}</span>
            </div>

            <button
              onClick={() => setActiveTab('aiWeaver')}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white text-xs font-bold shadow-lg flex items-center gap-1 transition-all"
            >
              <span>🤖</span>
              <span>AI Dệt Tuyến</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIEW MODE TABS & ACTION BUTTONS
          ========================================================================= */}
      <div className="px-6 py-2.5 bg-gray-950/70 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('nexusGraph')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'nexusGraph'
                ? 'bg-purple-900/80 text-amber-300 border border-amber-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>🕸️</span> Mạng Lưới Quan Hệ ({currentProfile.relations.length})
          </button>

          <button
            onClick={() => setActiveTab('timelineTrajectory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'timelineTrajectory'
                ? 'bg-purple-900/80 text-cyan-300 border border-cyan-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>⏳</span> Niên Biểu ({currentProfile.milestones.length})
          </button>

          <button
            onClick={() => setActiveTab('questTrials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'questTrials'
                ? 'bg-purple-900/80 text-emerald-300 border border-emerald-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>📜</span> Nhiệm Vụ & Bí Cảnh ({questList.length})
          </button>

          <button
            onClick={() => setActiveTab('geographicAtlas')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'geographicAtlas'
                ? 'bg-purple-900/80 text-pink-300 border border-pink-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>🗺️</span> Bản Đồ Địa Danh ({atlasList.length})
          </button>

          <button
            onClick={() => setActiveTab('karmicInheritances')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'karmicInheritances'
                ? 'bg-purple-900/80 text-amber-400 border border-amber-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>🌿</span> Cơ Duyên & Thần Binh ({karmicList.length})
          </button>

          <button
            onClick={() => setActiveTab('nemesisFeuds')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'nemesisFeuds'
                ? 'bg-purple-900/80 text-red-400 border border-red-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>⚔️</span> Túc Địch & Quyết Chiến ({nemesisList.length})
          </button>

          <button
            onClick={() => setActiveTab('daoHeartDemons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'daoHeartDemons'
                ? 'bg-purple-900/80 text-purple-400 border border-purple-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>🧘</span> Tâm Ma & Ngộ Đạo ({daoDemonList.length})
          </button>

          <button
            onClick={() => setActiveTab('factionPowers')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'factionPowers'
                ? 'bg-purple-900/80 text-blue-400 border border-blue-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>👥</span> Thế Lực & Lãnh Địa ({factionList.length})
          </button>

          <button
            onClick={() => setActiveTab('oralLoreSubplots')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'oralLoreSubplots'
                ? 'bg-purple-900/80 text-amber-300 border border-amber-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>🎙️</span> Giai Thoại Kể Lại ({oralLoreList.length})
          </button>

          <button
            onClick={() => setActiveTab('storySnippets')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'storySnippets'
                ? 'bg-purple-900/80 text-purple-300 border border-purple-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>📖</span> Trích Đoạn Cảnh Tượng
          </button>

          <button
            onClick={() => setActiveTab('aiWeaver')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'aiWeaver'
                ? 'bg-purple-900/80 text-amber-300 border border-amber-400/50 shadow'
                : 'bg-gray-900/60 text-gray-400 hover:text-white'
            }`}
          >
            <span>⚡</span> Trợ Lý AI
          </button>
        </div>

        {/* Quick Add Buttons & Search */}
        <div className="flex items-center gap-2">
          {activeTab === 'nexusGraph' && (
            <button
              onClick={handleOpenAddRelation}
              className="px-3 py-1.5 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Mối Quan Hệ
            </button>
          )}

          {activeTab === 'timelineTrajectory' && (
            <button
              onClick={handleOpenAddMilestone}
              className="px-3 py-1.5 rounded-lg bg-cyan-600/90 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Mốc Niên Biểu
            </button>
          )}

          {activeTab === 'questTrials' && (
            <button
              onClick={handleOpenAddQuest}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Nhiệm Vụ / Bí Cảnh
            </button>
          )}

          {activeTab === 'geographicAtlas' && (
            <button
              onClick={handleOpenAddGeo}
              className="px-3 py-1.5 rounded-lg bg-pink-600/90 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Địa Danh
            </button>
          )}

          {activeTab === 'karmicInheritances' && (
            <button
              onClick={handleOpenAddKarmic}
              className="px-3 py-1.5 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Thần Binh / Cơ Duyên
            </button>
          )}

          {activeTab === 'nemesisFeuds' && (
            <button
              onClick={handleOpenAddNemesis}
              className="px-3 py-1.5 rounded-lg bg-red-600/90 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Túc Địch
            </button>
          )}

          {activeTab === 'daoHeartDemons' && (
            <button
              onClick={handleOpenAddDaoDemon}
              className="px-3 py-1.5 rounded-lg bg-purple-600/90 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Tâm Ma Kiếp
            </button>
          )}

          {activeTab === 'factionPowers' && (
            <button
              onClick={handleOpenAddFaction}
              className="px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Thế Lực / Lãnh Địa
            </button>
          )}

          {activeTab === 'oralLoreSubplots' && (
            <button
              onClick={handleOpenAddOralLore}
              className="px-3 py-1.5 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow transition-all"
            >
              <span>➕</span> Thêm Giai Thoại Mới
            </button>
          )}

          {/* Search Filter input */}
          <div className="relative">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Tìm kiếm mọi nhánh..."
              className="bg-gray-900 border border-gray-700 rounded-lg px-2.5 py-1 text-xs text-white placeholder-gray-500 w-44 focus:outline-none focus:border-purple-400"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-2 top-1 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTENT AREA
          ========================================================================= */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {/* ================= TAB 1: NEXUS RELATION GRAPH ================= */}
        {activeTab === 'nexusGraph' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5">
              <button
                onClick={() => setRelationCategoryFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  relationCategoryFilter === 'ALL'
                    ? 'bg-amber-500 text-gray-950 shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                Tất Cả ({currentProfile.relations.length})
              </button>

              {(Object.keys(NEXUS_CATEGORIES_META) as CharacterNexusRelationCategory[]).map((cat) => {
                const meta = NEXUS_CATEGORIES_META[cat];
                const count = relationCounts[cat] || 0;
                const isSelected = relationCategoryFilter === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setRelationCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${meta.bgClass} ${meta.textClass} border ${meta.borderClass} shadow`
                        : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.label.split('(')[0].trim()}</span>
                    <span className="font-mono text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-950/20 via-gray-950/80 to-gray-950 border border-purple-500/20 relative overflow-hidden shadow-2xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-widest">
                    MẠNG LƯỚI QUAN HỆ ĐỊNH TUYẾN 10 HẠNG MỤC
                  </span>
                  <h3 className="text-base font-black text-white">
                    Tâm Điểm Nhân Quả: <span className="text-amber-300">{currentChar.name}</span>
                  </h3>
                </div>
                <div className="text-xs text-gray-400">
                  Hiển thị <span className="text-amber-300 font-bold">{filteredRelations.length}</span> mối quan hệ tương tác
                </div>
              </div>

              {filteredRelations.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs">
                  Chưa có mối quan hệ nào thuộc danh mục này. Nhấn nút <strong>"Thêm Mối Quan Hệ"</strong> ở trên hoặc dùng <strong>"AI Dệt Tuyến"</strong> để sinh tự động!
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRelations.map((rel) => {
                    const catMeta = NEXUS_CATEGORIES_META[rel.category];
                    const isEnemy = rel.category === 'KE_THU';
                    const isFamily = ['CHA_ME', 'GIA_TOC', 'VO_DAO_LU', 'CON_CAI'].includes(rel.category);

                    return (
                      <div
                        key={rel.id}
                        className={`p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 shadow-lg flex flex-col justify-between ${
                          isEnemy
                            ? 'bg-red-950/20 border-red-500/30 hover:border-red-400'
                            : isFamily
                            ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400'
                            : 'bg-gray-900/60 border-purple-500/20 hover:border-purple-400'
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 ${catMeta.bgClass} ${catMeta.borderClass} ${catMeta.textClass}`}
                            >
                              <span>{catMeta.icon}</span>
                              <span>{catMeta.label.split('(')[0].trim()}</span>
                            </span>

                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                rel.status === 'Còn Sống'
                                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                                  : rel.status === 'Bị Giam Cầm / Phong Ấn'
                                  ? 'bg-red-950/80 text-red-300 border border-red-500/30'
                                  : 'bg-gray-800 text-gray-300'
                              }`}
                            >
                              {rel.status}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-black text-white flex items-center gap-1.5">
                              <span>{rel.targetName}</span>
                            </h4>
                            <p className="text-xs text-amber-300/90 font-medium">
                              {rel.targetRoleOrTitle}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-gray-400">
                              <span>Mức độ quan hệ:</span>
                              <span
                                className={`font-mono font-bold ${
                                  rel.intimacyLevel >= 0 ? 'text-emerald-400' : 'text-red-400'
                                }`}
                              >
                                {rel.intimacyLevel > 0 ? `+${rel.intimacyLevel}` : rel.intimacyLevel}
                              </span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  rel.intimacyLevel >= 0 ? 'bg-emerald-500' : 'bg-red-500'
                                }`}
                                style={{
                                  width: `${Math.min(100, Math.abs(rel.intimacyLevel))}%`
                                }}
                              />
                            </div>
                          </div>

                          <div className="text-[11px] text-gray-300 leading-snug">
                            <strong className="text-gray-400">Khởi nguồn:</strong> {rel.originStory}
                          </div>

                          <div className="text-[11px] text-gray-300 leading-snug">
                            <strong className="text-gray-400">Hiện trạng:</strong> {rel.currentDynamics}
                          </div>

                          <div className="text-[11px] p-2 rounded bg-black/40 border border-white/5 text-amber-200/90">
                            <strong>Duyên nợ:</strong> {rel.karmicTies}
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-1.5 pt-3 mt-3 border-t border-white/5">
                          <button
                            onClick={() => handleOpenEditRelation(rel)}
                            className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-[11px] text-gray-300 font-semibold"
                            title="Sửa"
                          >
                            ✏️ Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteRelation(rel.id)}
                            className="px-2 py-1 rounded bg-red-950 hover:bg-red-900 text-[11px] text-red-300 font-semibold"
                            title="Xóa"
                          >
                            🗑️ Xóa
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: CHRONOLOGICAL DESTINY TIMELINE ================= */}
        {activeTab === 'timelineTrajectory' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5">
              <button
                onClick={() => setMilestoneTypeFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  milestoneTypeFilter === 'ALL'
                    ? 'bg-cyan-500 text-gray-950 shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                Tất Cả Mốc ({currentProfile.milestones.length})
              </button>

              {(Object.keys(MILESTONE_TYPES_META) as TrajectoryMilestoneType[]).map((mtype) => {
                const meta = MILESTONE_TYPES_META[mtype];
                const count = milestoneCounts[mtype] || 0;
                const isSelected = milestoneTypeFilter === mtype;

                return (
                  <button
                    key={mtype}
                    onClick={() => setMilestoneTypeFilter(mtype)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} shadow`
                        : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.label}</span>
                    <span className="font-mono text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-purple-500 before:to-cyan-400">
              {filteredMilestones.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs">
                  Không tìm thấy mốc niên biểu nào. Nhấn <strong>"Thêm Mốc Niên Biểu"</strong> hoặc chạy <strong>"AI Dệt Tuyến"</strong> để kiến tạo hành trình!
                </div>
              ) : (
                filteredMilestones.map((ms) => {
                  const meta = MILESTONE_TYPES_META[ms.type];

                  return (
                    <div key={ms.id} className="relative group">
                      <div className="absolute -left-6 md:-left-8 top-1.5 w-6 h-6 rounded-full bg-gray-950 border-2 border-amber-400 flex items-center justify-center text-[10px] shadow-lg group-hover:scale-125 transition-transform z-10">
                        {meta.icon}
                      </div>

                      <div className="p-5 rounded-2xl bg-gray-950/90 border border-white/10 hover:border-purple-500/40 transition-all shadow-xl space-y-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-2.5">
                            <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-xs font-bold">
                              {ms.timeAnchor}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                            >
                              <span>{meta.icon}</span>
                              <span>{meta.label}</span>
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <span>📍</span> {ms.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditMilestone(ms)}
                              className="px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                              title="Sửa"
                            >
                              ✏️ Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteMilestone(ms.id)}
                              className="px-2 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                              title="Xóa"
                            >
                              🗑️ Xóa
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                            {ms.title}
                          </h4>
                          {ms.involvedCharacters.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[11px] text-gray-400">Nhân vật liên đới:</span>
                              {ms.involvedCharacters.map((cName, ci) => (
                                <span
                                  key={ci}
                                  className="px-2 py-0.2 rounded bg-purple-950/60 text-purple-200 border border-purple-500/30 text-[10px] font-medium"
                                >
                                  {cName}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-gray-200 leading-relaxed bg-gray-900/60 p-3 rounded-xl border border-white/5">
                          {ms.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1">
                            <strong className="text-blue-300 text-[11px] block flex items-center gap-1">
                              <span>📈</span> Biến Chuyển Cảnh Giới:
                            </strong>
                            <p className="text-gray-200 font-mono text-[11px]">
                              {ms.cultivationStateBeforeAndAfter || 'Chưa cập nhật'}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                            <strong className="text-purple-300 text-[11px] block flex items-center gap-1">
                              <span>🧠</span> Biến Chuyển Tâm Tính & Đạo Tâm:
                            </strong>
                            <p className="text-gray-200 text-[11px]">
                              {ms.psychologicalTransformation || 'Chưa cập nhật'}
                            </p>
                          </div>
                        </div>

                        {ms.karmicEcho && (
                          <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs flex items-start gap-2">
                            <span className="text-amber-400 text-sm">⚡</span>
                            <div>
                              <strong className="text-amber-300 text-[11px]">Âm Vang Nhân Quả Tương Lai:</strong>
                              <p className="text-amber-100/90 text-[11px] mt-0.5">{ms.karmicEcho}</p>
                            </div>
                          </div>
                        )}

                        {ms.novelSnippetDraft && (
                          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <strong className="text-rose-300 text-[11px] flex items-center gap-1">
                                <span>📖</span> Trích Đoạn Tiểu Thuyết Sống Động:
                              </strong>
                              {onInsertText && (
                                <button
                                  onClick={() => {
                                    onInsertText(ms.novelSnippetDraft || '');
                                    alert('Đã chèn trích đoạn tiểu thuyết vào bản thảo!');
                                  }}
                                  className="px-2.5 py-1 rounded bg-rose-700/80 hover:bg-rose-600 text-white text-[10px] font-bold transition-all shadow"
                                >
                                  📝 Chèn Vào Chương
                                </button>
                              )}
                            </div>
                            <p className="text-gray-200 italic leading-relaxed text-[11px]">
                              "{ms.novelSnippetDraft}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 3: QUESTS, TRAVELS, TRIALS & SECRET REALMS ================= */}
        {activeTab === 'questTrials' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/5">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setQuestCategoryFilter('ALL')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    questCategoryFilter === 'ALL'
                      ? 'bg-emerald-500 text-gray-950 shadow-md'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  Tất Cả ({questList.length})
                </button>

                {(Object.keys(QUEST_TRIAL_CATEGORIES_META) as QuestTrialCategory[]).map((cat) => {
                  const meta = QUEST_TRIAL_CATEGORIES_META[cat];
                  const count = questCategoryCounts[cat] || 0;
                  const isSelected = questCategoryFilter === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setQuestCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? `${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} shadow`
                          : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                      <span className="font-mono text-[10px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={questStatusFilter}
                  onChange={(e) => setQuestStatusFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded-lg px-2.5 py-1 focus:outline-none"
                >
                  <option value="ALL">Mọi Tiến Độ</option>
                  <option value="Đã Hoàn Thành">✅ Đã Hoàn Thành</option>
                  <option value="Đang Thực Hiện">📍 Đang Thực Hiện</option>
                  <option value="Cần Thực Hiện (Chờ Kích Hoạt)">⏳ Cần Thực Hiện</option>
                  <option value="Di Hận Thất Bại">☠️ Di Hận Thất Bại</option>
                </select>

                <select
                  value={questDifficultyFilter}
                  onChange={(e) => setQuestDifficultyFilter(e.target.value)}
                  className="bg-gray-900 border border-gray-700 text-gray-300 text-xs rounded-lg px-2.5 py-1 focus:outline-none"
                >
                  <option value="ALL">Mọi Độ Nguy Cấp</option>
                  <option value="Phổ Thông">Phổ Thông</option>
                  <option value="Hiểm Trở">Hiểm Trở</option>
                  <option value="Cực Nguy Cấp S">Cực Nguy Cấp S</option>
                  <option value="Thập Tử Vô Sinh SSS">Thập Tử Vô Sinh SSS</option>
                </select>
              </div>
            </div>

            {filteredQuestTrials.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs space-y-2">
                <p>Không tìm thấy nhánh nhiệm vụ, du ngoạn hoặc bí cảnh nào theo bộ lọc.</p>
                <p className="text-gray-400">
                  Nhấn <strong>"Thêm Nhiệm Vụ / Bí Cảnh"</strong> để thiết lập sự kiện mới hoặc dùng <strong>"AI Dệt Tuyến"</strong> để hệ thống tự động sinh!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredQuestTrials.map((q) => {
                  const meta = QUEST_TRIAL_CATEGORIES_META[q.category];
                  const isSSS = q.dangerAndDifficulty === 'Thập Tử Vô Sinh SSS';
                  const isDone = q.executionStatus === 'Đã Hoàn Thành';

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all shadow-xl space-y-3.5 flex flex-col justify-between ${
                        isSSS
                          ? 'bg-red-950/20 border-red-500/40 hover:border-red-400'
                          : 'bg-gray-950/90 border-white/10 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                            >
                              <span>{meta.icon}</span>
                              <span>{meta.label}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded bg-gray-900 text-amber-300 font-mono text-[11px] font-bold border border-white/5">
                              {q.stageTimeAnchor}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                                isDone
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                                  : q.executionStatus === 'Đang Thực Hiện'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                  : 'bg-blue-950 text-blue-300 border border-blue-500/40'
                              }`}
                            >
                              {q.executionStatus}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                isSSS
                                  ? 'bg-red-950 text-red-300 border border-red-500/50'
                                  : 'bg-purple-950 text-purple-300 border border-purple-500/30'
                              }`}
                            >
                              {q.dangerAndDifficulty}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-emerald-300 transition-colors">
                            {q.title}
                          </h4>
                          <p className="text-xs text-cyan-300 flex items-center gap-1 mt-0.5">
                            <span>📍</span> Địa danh: <strong>{q.locationName}</strong>
                          </p>
                        </div>

                        {q.issuingAuthorityOrContext && (
                          <div className="text-xs p-2.5 rounded-xl bg-gray-900/70 border border-white/5 text-gray-300 leading-relaxed">
                            <strong className="text-amber-300 text-[11px] block mb-0.5">🏛️ Bối Cảnh / Đơn Vị Giao Phó:</strong>
                            {q.issuingAuthorityOrContext}
                          </div>
                        )}

                        {q.keyObjectives && q.keyObjectives.length > 0 && (
                          <div className="space-y-1.5 p-3 rounded-xl bg-emerald-950/10 border border-emerald-500/20">
                            <strong className="text-emerald-300 text-[11px] block flex items-center gap-1">
                              <span>🎯</span> Các Mục Tiêu Then Chốt ({q.keyObjectives.length}):
                            </strong>
                            <ul className="space-y-1 text-xs text-gray-200">
                              {q.keyObjectives.map((obj, oi) => (
                                <li key={oi} className="flex items-start gap-1.5">
                                  <span className="text-emerald-400 font-bold">✓</span>
                                  <span>{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {q.trialEncounters && (
                          <div className="text-xs p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-200">
                            <strong className="text-red-300 text-[11px] block mb-0.5">⚔️ Đối Thủ & Hiểm Họa Chạm Trán:</strong>
                            {q.trialEncounters}
                          </div>
                        )}

                        {q.rewardsOrBreakthroughs && (
                          <div className="text-xs p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
                            <strong className="text-amber-300 text-[11px] block mb-0.5">🎁 Phần Thưởng & Đột Phá Đạt Được:</strong>
                            {q.rewardsOrBreakthroughs}
                          </div>
                        )}

                        {q.narrativeJournalSnippet && (
                          <div className="text-xs p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-gray-200 italic space-y-1.5">
                            <div className="flex items-center justify-between not-italic">
                              <strong className="text-purple-300 text-[11px]">📜 Ký Sự Hành Trình:</strong>
                              {onInsertText && (
                                <button
                                  onClick={() => {
                                    onInsertText(`[${q.stageTimeAnchor} • ${q.title}]\n"${q.narrativeJournalSnippet}"`);
                                    alert('Đã chèn ký sự vào bản thảo!');
                                  }}
                                  className="px-2 py-0.5 rounded bg-purple-800/80 hover:bg-purple-700 text-white text-[10px] font-bold transition-all"
                                >
                                  📝 Chèn Vào Chương
                                </button>
                              )}
                            </div>
                            <p>"{q.narrativeJournalSnippet}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleOpenEditQuest(q)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteQuest(q.id)}
                          className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: GEOGRAPHIC EXPEDITION ATLAS ================= */}
        {activeTab === 'geographicAtlas' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {(Object.keys(GEOGRAPHIC_STATUS_META) as GeographicTraversalStatus[]).map((st) => {
                const meta = GEOGRAPHIC_STATUS_META[st];
                const count = geoStatusCounts[st] || 0;
                const isSelected = geoStatusFilter === st;

                return (
                  <button
                    key={st}
                    onClick={() => setGeoStatusFilter(isSelected ? 'ALL' : st)}
                    className={`p-3 rounded-2xl border text-left transition-all shadow-md ${
                      isSelected
                        ? 'ring-2 ring-amber-400 bg-gray-900'
                        : 'bg-gray-950/90 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{meta.icon}</span>
                      <span className="font-mono text-lg font-black text-amber-300">{count}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-200 mt-1">{meta.label}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5">
              <button
                onClick={() => setGeoTypeFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  geoTypeFilter === 'ALL'
                    ? 'bg-pink-500 text-gray-950 shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                Mọi Loại Địa Danh ({atlasList.length})
              </button>

              {(Object.keys(GEOGRAPHIC_TYPES_META) as GeographicLocationType[]).map((gtype) => {
                const meta = GEOGRAPHIC_TYPES_META[gtype];
                const count = geoTypeCounts[gtype] || 0;
                const isSelected = geoTypeFilter === gtype;

                return (
                  <button
                    key={gtype}
                    onClick={() => setGeoTypeFilter(gtype)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} shadow`
                        : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.label}</span>
                    <span className="font-mono text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            {Object.keys(groupedGeographicAtlas).length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs space-y-2">
                <p>Chưa có địa danh nào thuộc tiêu chí lọc này.</p>
                <p className="text-gray-400">
                  Nhấn <strong>"Thêm Địa Danh"</strong> hoặc sử dụng <strong>"AI Dệt Tuyến"</strong> để sinh tự động bản đồ sơn hà toàn diện!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {(Object.entries(groupedGeographicAtlas) as [string, GeographicExpeditionNode[]][]).map(([stageName, nodes], stageIdx) => (
                  <div key={stageIdx} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 text-gray-950 font-black text-xs shadow-md">
                        {stageName}
                      </div>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-purple-500/40 via-white/10 to-transparent" />
                      <span className="text-[11px] text-gray-400 font-mono">
                        {nodes.length} Địa danh / Cứ điểm
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nodes.map((node) => {
                        const typeMeta = GEOGRAPHIC_TYPES_META[node.type];
                        const statusMeta = GEOGRAPHIC_STATUS_META[node.status];

                        return (
                          <div
                            key={node.id}
                            className="p-5 rounded-2xl bg-gray-950 border border-white/10 hover:border-pink-500/40 transition-all shadow-xl space-y-3.5 flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                                <span
                                  className={`px-2 py-0.5 rounded text-xs font-bold border flex items-center gap-1 ${typeMeta.badgeBg} ${typeMeta.badgeBorder} ${typeMeta.badgeText}`}
                                >
                                  <span>{typeMeta.icon}</span>
                                  <span>{typeMeta.label}</span>
                                </span>

                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${statusMeta.badgeClass}`}
                                >
                                  <span>{statusMeta.icon}</span>
                                  <span>{statusMeta.label}</span>
                                </span>
                              </div>

                              <div>
                                <h4 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                                  {node.name}
                                </h4>
                                <p className="text-xs text-amber-300/90 font-mono mt-0.5">
                                  🌐 Vực / Cõi: <strong>{node.realmOrRegion}</strong>
                                </p>
                              </div>

                              <div className="text-xs p-2.5 rounded-xl bg-gray-900/60 border border-white/5 text-gray-300 leading-relaxed">
                                <strong className="text-cyan-300 text-[11px] block mb-0.5">🏔️ Địa Hình & Mật Độ Linh Khí:</strong>
                                {node.terrainAndAura}
                              </div>

                              <div className="text-xs p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
                                <strong className="text-amber-300 text-[11px] block mb-0.5">⚔️ Biến Cố / Nhiệm Vụ Bắt Buộc:</strong>
                                {node.requiredTasksOrTrials}
                              </div>

                              {node.conquestOrLegacy && (
                                <div className="text-xs p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
                                  <strong className="text-emerald-300 text-[11px] block mb-0.5">🏆 Dấu Ấn & Chiến Tích Lưu Lại:</strong>
                                  {node.conquestOrLegacy}
                                </div>
                              )}

                              {node.novelSceneryProse && (
                                <div className="text-xs p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-gray-200 italic space-y-1.5">
                                  <div className="flex items-center justify-between not-italic">
                                    <strong className="text-purple-300 text-[11px]">🎨 Cảnh Sắc Không Gian & Con Người:</strong>
                                    {onInsertText && (
                                      <button
                                        onClick={() => {
                                          onInsertText(`[Cảnh sắc: ${node.name}]\n"${node.novelSceneryProse}"`);
                                          alert(`Đã chèn đoạn miêu tả cảnh sắc của ${node.name} vào bản thảo!`);
                                        }}
                                        className="px-2 py-0.5 rounded bg-pink-800/80 hover:bg-pink-700 text-white text-[10px] font-bold transition-all"
                                      >
                                        📝 Chèn Vào Chương
                                      </button>
                                    )}
                                  </div>
                                  <p>"{node.novelSceneryProse}"</p>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-white/5">
                              <button
                                onClick={() => handleOpenEditGeo(node)}
                                className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                              >
                                ✏️ Sửa
                              </button>
                              <button
                                onClick={() => handleDeleteGeo(node.id)}
                                className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                              >
                                🗑️ Xóa
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: KARMIC INHERITANCES & ARTIFACTS ================= */}
        {activeTab === 'karmicInheritances' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5">
              <button
                onClick={() => setKarmicTypeFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  karmicTypeFilter === 'ALL'
                    ? 'bg-amber-500 text-gray-950 shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                Tất Cả Cơ Duyên ({karmicList.length})
              </button>

              {(Object.keys(KARMIC_TYPES_META) as KarmicInheritanceType[]).map((ktype) => {
                const meta = KARMIC_TYPES_META[ktype];
                const count = karmicCounts[ktype] || 0;
                const isSelected = karmicTypeFilter === ktype;

                return (
                  <button
                    key={ktype}
                    onClick={() => setKarmicTypeFilter(ktype)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} shadow`
                        : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.label}</span>
                    <span className="font-mono text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            {filteredKarmicList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs space-y-2">
                <p>Chưa có cơ duyên hoặc thần binh nào trong danh mục này.</p>
                <p className="text-gray-400">
                  Nhấn <strong>"Thêm Thần Binh / Cơ Duyên"</strong> hoặc khởi chạy <strong>"AI Dệt Tuyến"</strong> để kiến tạo bảo vật viễn cổ!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredKarmicList.map((k) => {
                  const meta = KARMIC_TYPES_META[k.type];

                  return (
                    <div
                      key={k.id}
                      className="p-5 rounded-2xl bg-gray-950 border border-amber-500/30 hover:border-amber-400 transition-all shadow-xl space-y-3.5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                          >
                            <span>{meta.icon}</span>
                            <span>{meta.label}</span>
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 font-bold">
                              {k.soulBondStatus}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
                              {k.awakeningStage}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-amber-300 transition-colors">
                            {k.name}
                          </h4>
                          <p className="text-xs text-amber-300 font-mono mt-0.5">
                            ⭐ Phẩm cấp: <strong>{k.rankOrGrade}</strong> • Đạt được: <strong>{k.acquisitionMilestone}</strong>
                          </p>
                        </div>

                        {k.specialAbilities && k.specialAbilities.length > 0 && (
                          <div className="p-3 rounded-xl bg-amber-950/10 border border-amber-500/20 space-y-1">
                            <strong className="text-amber-300 text-[11px] block flex items-center gap-1">
                              <span>⚡</span> Thần Thông Năng Lực Đặc Biệt:
                            </strong>
                            <ul className="space-y-1 text-xs text-gray-200">
                              {k.specialAbilities.map((ab, abi) => (
                                <li key={abi} className="flex items-start gap-1.5">
                                  <span className="text-amber-400 font-bold">✦</span>
                                  <span>{ab}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="text-xs p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-200">
                          <strong className="text-red-300 text-[11px] block mb-0.5">⚠️ Phản Phệ & Cái Giá Nhân Quả:</strong>
                          {k.karmicCostOrBacklash}
                        </div>

                        {k.novelLoreSnippet && (
                          <div className="text-xs p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-gray-200 italic space-y-1.5">
                            <div className="flex items-center justify-between not-italic">
                              <strong className="text-purple-300 text-[11px]">📖 Điển Tích / Bảo Vật Tỏa Sáng:</strong>
                              {onInsertText && (
                                <button
                                  onClick={() => {
                                    onInsertText(`[Bảo vật: ${k.name}]\n"${k.novelLoreSnippet}"`);
                                    alert('Đã chèn điển tích bảo vật vào bản thảo!');
                                  }}
                                  className="px-2 py-0.5 rounded bg-amber-700 hover:bg-amber-600 text-white text-[10px] font-bold transition-all"
                                >
                                  📝 Chèn Vào Chương
                                </button>
                              )}
                            </div>
                            <p>"{k.novelLoreSnippet}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleOpenEditKarmic(k)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteKarmic(k.id)}
                          className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 6: NEMESIS FEUDS & DESTINED DUELS ================= */}
        {activeTab === 'nemesisFeuds' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5">
              <button
                onClick={() => setNemesisSeverityFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  nemesisSeverityFilter === 'ALL'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                Tất Cả Túc Địch ({nemesisList.length})
              </button>

              {Object.keys(NEMESIS_SEVERITY_META).map((sev) => {
                const meta = NEMESIS_SEVERITY_META[sev];
                const count = nemesisCounts[sev] || 0;
                const isSelected = nemesisSeverityFilter === sev;

                return (
                  <button
                    key={sev}
                    onClick={() => setNemesisSeverityFilter(sev)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${meta.badgeClass} shadow`
                        : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.label}</span>
                    <span className="font-mono text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            {filteredNemesisList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs space-y-2">
                <p>Không có túc địch nào trong bộ lọc này.</p>
                <p className="text-gray-400">
                  Nhấn <strong>"Thêm Túc Địch"</strong> để thiết lập đại cừu nhân hoặc dùng <strong>"AI Dệt Tuyến"</strong> để sinh đối thủ xứng tầm!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNemesisList.map((n) => {
                  const sevMeta = NEMESIS_SEVERITY_META[n.feudSeverity] || { label: n.feudSeverity, icon: '⚔️', badgeClass: 'bg-red-950 text-red-300' };

                  return (
                    <div
                      key={n.id}
                      className="p-5 rounded-2xl bg-gray-950 border border-red-500/30 hover:border-red-400 transition-all shadow-xl space-y-3.5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${sevMeta.badgeClass}`}>
                            <span>{sevMeta.icon}</span>
                            <span>{sevMeta.label}</span>
                          </span>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-900 text-amber-300 border border-white/10 font-bold">
                            {n.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-red-400 transition-colors">
                            {n.nemesisName}
                          </h4>
                          <p className="text-xs text-red-300/90 font-mono mt-0.5">
                            ☠️ Thế lực & Cảnh giới: <strong>{n.nemesisFactionAndRank}</strong>
                          </p>
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-gray-900/60 border border-white/5 text-gray-300">
                          <strong className="text-amber-300 text-[11px] block mb-0.5">🩸 Nguồn Gốc Mối Thù:</strong>
                          {n.feudOriginCause}
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-200">
                          <strong className="text-red-300 text-[11px] block mb-0.5">⚔️ Quá Khứ Chạm Trán:</strong>
                          {n.pastClashes}
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-200">
                          <strong className="text-purple-300 text-[11px] block mb-0.5">🎯 Ước Hẹn Quyết Chiến Sinh Tử:</strong>
                          {n.destinedDuelCondition}
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
                          <strong className="text-emerald-300 text-[11px] block mb-0.5">🏆 Đột Phá / Phần Thưởng Khi Diệt Thù:</strong>
                          {n.feudResolutionReward}
                        </div>

                        {n.duelSnippetDraft && (
                          <div className="text-xs p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-rose-100 italic space-y-1.5">
                            <div className="flex items-center justify-between not-italic">
                              <strong className="text-red-300 text-[11px]">🔥 Lời Thoại Đối Đầu Rực Lửa:</strong>
                              {onInsertText && (
                                <button
                                  onClick={() => {
                                    onInsertText(`[Đối đầu: ${n.nemesisName}]\n"${n.duelSnippetDraft}"`);
                                    alert('Đã chèn lời thoại quyết chiến vào bản thảo!');
                                  }}
                                  className="px-2 py-0.5 rounded bg-red-800 hover:bg-red-700 text-white text-[10px] font-bold transition-all"
                                >
                                  📝 Chèn Vào Chương
                                </button>
                              )}
                            </div>
                            <p>"{n.duelSnippetDraft}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleOpenEditNemesis(n)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteNemesis(n.id)}
                          className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: INNER DEMONS & DAO ENLIGHTENMENT ================= */}
        {activeTab === 'daoHeartDemons' && (
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5">
              <button
                onClick={() => setDaoDemonTypeFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  daoDemonTypeFilter === 'ALL'
                    ? 'bg-purple-500 text-white shadow-md'
                    : 'bg-gray-900 text-gray-400 hover:text-white'
                }`}
              >
                Tất Cả Tâm Ma ({daoDemonList.length})
              </button>

              {Object.keys(DAO_DEMON_TYPES_META).map((dtype) => {
                const meta = DAO_DEMON_TYPES_META[dtype];
                const count = daoDemonCounts[dtype] || 0;
                const isSelected = daoDemonTypeFilter === dtype;

                return (
                  <button
                    key={dtype}
                    onClick={() => setDaoDemonTypeFilter(dtype)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? `${meta.badgeClass} shadow`
                        : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{meta.icon}</span>
                    <span>{meta.label}</span>
                    <span className="font-mono text-[10px] opacity-80">({count})</span>
                  </button>
                );
              })}
            </div>

            {filteredDaoDemonList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs space-y-2">
                <p>Không có tâm ma hoặc bình cảnh nào trong bộ lọc này.</p>
                <p className="text-gray-400">
                  Nhấn <strong>"Thêm Tâm Ma Kiếp"</strong> để mô phỏng rào cản đạo tâm hoặc khởi động <strong>"AI Dệt Tuyến"</strong>!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDaoDemonList.map((d) => {
                  const meta = DAO_DEMON_TYPES_META[d.demonType] || { label: d.demonType, icon: '🧘', badgeClass: 'bg-purple-950 text-purple-300' };

                  return (
                    <div
                      key={d.id}
                      className="p-5 rounded-2xl bg-gray-950 border border-purple-500/30 hover:border-purple-400 transition-all shadow-xl space-y-3.5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${meta.badgeClass}`}>
                            <span>{meta.icon}</span>
                            <span>{meta.label}</span>
                          </span>

                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                            {d.breakthroughState}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-purple-300 transition-colors">
                            {d.demonName}
                          </h4>
                          <p className="text-xs text-purple-300/90 font-mono mt-0.5">
                            ⚡ Bộc phát tại: <strong>{d.triggerStage}</strong>
                          </p>
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-200">
                          <strong className="text-red-300 text-[11px] block mb-0.5">👹 Biểu Hiện Của Tâm Ma:</strong>
                          {d.innerDemonManifestation}
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
                          <strong className="text-emerald-300 text-[11px] block mb-0.5">💡 Phương Pháp Phá Chấp & Hóa Giải:</strong>
                          {d.daoResolutionMethod}
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
                          <strong className="text-amber-300 text-[11px] block mb-0.5">🌌 Quy Tắc Đại Đạo Đắc Chứng:</strong>
                          {d.daoDomainMastery}
                        </div>

                        {d.enlightenmentSnippet && (
                          <div className="text-xs p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-purple-100 italic space-y-1.5">
                            <div className="flex items-center justify-between not-italic">
                              <strong className="text-purple-300 text-[11px]">🕊️ Triết Lý Giác Ngộ Đạo Tâm:</strong>
                              {onInsertText && (
                                <button
                                  onClick={() => {
                                    onInsertText(`[Đốn ngộ đạo tâm: ${d.demonName}]\n"${d.enlightenmentSnippet}"`);
                                    alert('Đã chèn đoạn văn đốn ngộ vào bản thảo!');
                                  }}
                                  className="px-2 py-0.5 rounded bg-purple-800 hover:bg-purple-700 text-white text-[10px] font-bold transition-all"
                                >
                                  📝 Chèn Vào Chương
                                </button>
                              )}
                            </div>
                            <p>"{d.enlightenmentSnippet}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleOpenEditDaoDemon(d)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteDaoDemon(d.id)}
                          className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 8: FACTION INFLUENCE & REALM POLITICS ================= */}
        {activeTab === 'factionPowers' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {factionList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs space-y-2">
                <p>Chưa có thông tin thế lực hoặc môn phái nào.</p>
                <p className="text-gray-400">
                  Nhấn <strong>"Thêm Thế Lực / Lãnh Địa"</strong> để thiết lập sơn phong cai quản hoặc khởi chạy <strong>"AI Dệt Tuyến"</strong>!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {factionList.map((f) => {
                  const authMeta = FACTION_AUTHORITY_META[f.authorityLevel] || { label: f.authorityLevel, icon: '👑', badgeClass: 'bg-blue-950 text-blue-300' };

                  return (
                    <div
                      key={f.id}
                      className="p-5 rounded-2xl bg-gray-950 border border-blue-500/30 hover:border-blue-400 transition-all shadow-xl space-y-3.5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1 ${authMeta.badgeClass}`}>
                            <span>{authMeta.icon}</span>
                            <span>{authMeta.label}</span>
                          </span>

                          <span className="text-xs font-mono text-cyan-300 font-bold">
                            Chức vị: {f.characterTitleOrRole}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-blue-300 transition-colors">
                            {f.factionName}
                          </h4>
                        </div>

                        <div className="text-xs p-2.5 rounded-xl bg-gray-900/60 border border-white/5 text-gray-300">
                          <strong className="text-cyan-300 text-[11px] block mb-0.5">🏰 Lãnh Địa & Cứ Điểm Cai Quản:</strong>
                          {f.controlledTerritory}
                        </div>

                        {f.alliedSubFactions && f.alliedSubFactions.length > 0 && (
                          <div className="text-xs p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-emerald-200">
                            <strong className="text-emerald-300 text-[11px] block mb-0.5">🤝 Thế Lực Đồng Minh & Phân Đà Trung Thành:</strong>
                            {f.alliedSubFactions.join(', ')}
                          </div>
                        )}

                        {f.rivalFactionForces && (
                          <div className="text-xs p-2.5 rounded-xl bg-red-950/20 border border-red-500/20 text-red-200">
                            <strong className="text-red-300 text-[11px] block mb-0.5">⚠️ Phe Phái Đối Lập & Thế Lực Dòm Ngó:</strong>
                            {f.rivalFactionForces}
                          </div>
                        )}

                        {f.powerLegacyContribution && (
                          <div className="text-xs p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200">
                            <strong className="text-amber-300 text-[11px] block mb-0.5">🏛️ Công Tích & Di Sản Để Lại:</strong>
                            {f.powerLegacyContribution}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-end gap-1.5 pt-3 border-t border-white/5">
                        <button
                          onClick={() => handleOpenEditFaction(f)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteFaction(f.id)}
                          className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB: ORAL LORE & VIGNETTES SUBPLOTS ================= */}
        {activeTab === 'oralLoreSubplots' && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header intro & action banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-gray-950 to-purple-950/40 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎙️</span>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide">
                    MẠCH CHUYỆN PHỤ & GIAI THOẠI TIỂU SỬ QUA LỜI TƯỜNG THUẬT
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    LỜI KỂ SỐNG ĐỘNG
                  </span>
                </div>
                <p className="text-xs text-gray-300">
                  Lắng nghe tiểu sử, góc khuất và các biến cố của <strong>{currentChar.name}</strong> qua lăng kính của người kể chuyện: Thuyết thư nhân quán trà, cố nhân thuở hàn vi, bại tướng khiếp đảm, đồng môn hậu bối, tiền bối ẩn thế và thường dân thọ ân.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {onInsertText && oralLoreList.length > 0 && (
                  <button
                    onClick={() => {
                      const allDrafts = oralLoreList
                        .map(
                          (item) =>
                            `[Giai thoại: ${item.subplotTitle} - Người kể: ${item.speakerNameAndRole}]\nBối cảnh: ${item.narrativeSetting}\n"${item.spokenDialogueDraft}"`
                        )
                        .join('\n\n---\n\n');
                      onInsertText(allDrafts);
                      alert('Đã chèn toàn bộ lời tường thuật giai thoại vào bản thảo!');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                  >
                    <span>📝</span> Chèn Toàn Bộ Lời Kể
                  </button>
                )}
                <button
                  onClick={handleOpenAddOralLore}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-gray-950 text-xs font-black shadow flex items-center gap-1.5 transition-all"
                >
                  <span>➕</span> Thêm Giai Thoại Mới
                </button>
              </div>
            </div>

            {/* Filter Pills for Speaker Types */}
            <div className="space-y-2 pb-2 border-b border-white/5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-gray-400 mr-1 flex items-center gap-1">
                  <span>🎙️</span> Người kể:
                </span>
                <button
                  onClick={() => setOralLoreSpeakerFilter('ALL')}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    oralLoreSpeakerFilter === 'ALL'
                      ? 'bg-amber-500 text-gray-950 shadow-md'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  Tất Cả ({oralLoreList.length})
                </button>

                {(Object.keys(ORAL_LORE_SPEAKER_META) as OralLoreSpeakerType[]).map((stype) => {
                  const meta = ORAL_LORE_SPEAKER_META[stype];
                  const count = oralLoreCounts[stype] || 0;
                  const isSelected = oralLoreSpeakerFilter === stype;

                  return (
                    <button
                      key={stype}
                      onClick={() => setOralLoreSpeakerFilter(stype)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? `${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} shadow`
                          : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                      <span className="font-mono text-[10px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Filter Pills for Treasure / Realm / Inheritance Categories */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-teal-400 mr-1 flex items-center gap-1">
                  <span>🗝️</span> Cơ duyên & Bảo vật:
                </span>
                <button
                  onClick={() => setOralLoreTreasureFilter('ALL')}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                    oralLoreTreasureFilter === 'ALL'
                      ? 'bg-teal-500 text-gray-950 shadow-md'
                      : 'bg-gray-900 text-gray-400 hover:text-white'
                  }`}
                >
                  Tất Cả Thể Loại ({oralLoreList.length})
                </button>

                {(Object.keys(TREASURE_LORE_CATEGORIES_META) as OralLoreTreasureCategory[]).map((cat) => {
                  const meta = TREASURE_LORE_CATEGORIES_META[cat];
                  const count = oralLoreTreasureCounts[cat] || 0;
                  const isSelected = oralLoreTreasureFilter === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setOralLoreTreasureFilter(cat)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? `${meta.badgeBg} ${meta.badgeText} border ${meta.badgeBorder} shadow`
                          : 'bg-gray-900/70 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                      <span className="font-mono text-[10px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content List */}
            {filteredOralLoreList.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-gray-900/40 border border-dashed border-gray-700 text-gray-500 text-xs space-y-2">
                <p>Không có mạch chuyện phụ hay giai thoại nào trong bộ lọc này.</p>
                <p className="text-gray-400">
                  Nhấn <strong>"Thêm Giai Thoại Mới"</strong> hoặc dùng <strong>"AI Dệt Tuyến"</strong> để tự động dệt những mẩu đối thoại sống động!
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredOralLoreList.map((item) => {
                  const meta = ORAL_LORE_SPEAKER_META[item.speakerType];
                  const treasureCatMeta = item.treasureLoreCategory ? TREASURE_LORE_CATEGORIES_META[item.treasureLoreCategory] : null;

                  return (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-gray-950 border border-purple-500/30 hover:border-amber-400/50 transition-all shadow-xl space-y-4"
                    >
                      {/* Top Meta Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 ${meta.badgeBg} ${meta.badgeBorder} ${meta.badgeText}`}
                          >
                            <span>{meta.icon}</span>
                            <span>{meta.label}</span>
                          </span>

                          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                            ⏳ {item.recountedEraOrEvent}
                          </span>

                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            📍 <em>{item.narrativeSetting}</em>
                          </span>
                        </div>

                        <div className="text-xs font-medium text-cyan-300">
                          👤 Người kể: <strong>{item.speakerNameAndRole}</strong>
                        </div>
                      </div>

                      {/* Subplot Title & Associated Treasure / Mission / Realm Tags */}
                      <div className="space-y-2">
                        <h4 className="text-base font-black text-white hover:text-amber-300 transition-colors">
                          {item.subplotTitle}
                        </h4>

                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          {item.breakthroughCultivationStage && (
                            <span className="text-xs font-bold text-yellow-300 bg-yellow-950/60 px-2.5 py-0.5 rounded border border-yellow-500/40 flex items-center gap-1 shadow-sm">
                              <span>⚡ Đột Phá:</span> {item.breakthroughCultivationStage}
                            </span>
                          )}

                          {item.tribulationOrPhenomenon && (
                            <span className="text-xs font-bold text-purple-200 bg-purple-950/60 px-2.5 py-0.5 rounded border border-purple-500/40 flex items-center gap-1 shadow-sm">
                              <span>🌀 Dị Tượng:</span> {item.tribulationOrPhenomenon}
                            </span>
                          )}

                          {item.associatedMissionOrQuest && (
                            <span className="text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/40 flex items-center gap-1 shadow-sm">
                              <span>🎯 Nhiệm Vụ:</span> {item.associatedMissionOrQuest}
                            </span>
                          )}

                          {item.associatedTreasureOrRealm && (
                            <div className="flex items-center gap-1.5">
                              {treasureCatMeta && (
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold border flex items-center gap-1 ${treasureCatMeta.badgeBg} ${treasureCatMeta.badgeBorder} ${treasureCatMeta.badgeText}`}
                                >
                                  <span>{treasureCatMeta.icon}</span>
                                  <span>{treasureCatMeta.label}:</span>
                                </span>
                              )}
                              <span className="text-xs font-bold text-teal-200 bg-teal-950/40 px-2.5 py-0.5 rounded border border-teal-500/30 flex items-center gap-1">
                                <span>💎</span> {item.associatedTreasureOrRealm}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Two-Column Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                          <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[11px]">
                            <span>👁️</span>
                            <span>GÓC NHÌN & TÂM THẾ NGƯỜI KỂ:</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed italic">{item.narrativePerspectiveSummary}</p>
                        </div>

                        <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1">
                          <div className="flex items-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                            <span>⚖️</span>
                            <span>SỰ THẬT CỐT LÕI VS DỊ BẢN THẾ GIAN:</span>
                          </div>
                          <p className="text-gray-300 leading-relaxed">{item.historicalTruthVsRumor}</p>
                        </div>
                      </div>

                      {/* Breakthrough Real Truth & Dao Heart Card */}
                      {item.breakthroughRealTruth && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-yellow-950/50 via-amber-950/30 to-gray-900 border border-yellow-500/40 text-xs space-y-1 shadow-md">
                          <div className="flex items-center gap-1.5 text-yellow-300 font-bold text-[11px] uppercase tracking-wide">
                            <span className="text-sm">⚡</span>
                            <span>CHÂN TƯỚNG ĐỘT PHÁ CẢNH GIỚI & ĐẠO TÂM NIẾT BÀN:</span>
                          </div>
                          <p className="text-yellow-100/90 leading-relaxed font-sans">{item.breakthroughRealTruth}</p>
                        </div>
                      )}

                      {/* Mission Execution Truth & Biographical Connection */}
                      {item.missionExecutionTruth && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-orange-950/20 to-gray-900 border border-amber-500/40 text-xs space-y-1 shadow-md">
                          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] uppercase tracking-wide">
                            <span className="text-sm">🎯</span>
                            <span>CHÂN TƯỚNG THỰC HIỆN NHIỆM VỤ & MẠCH NỐI TIỂU SỬ VẬN MỆNH:</span>
                          </div>
                          <p className="text-amber-100/90 leading-relaxed font-sans">{item.missionExecutionTruth}</p>
                        </div>
                      )}

                      {/* Secret Trial & Inheritance Requirements */}
                      {item.treasureTrialSecret && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-teal-950/40 via-emerald-950/20 to-gray-900 border border-teal-500/30 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-teal-300 font-bold text-[11px]">
                            <span>🗝️</span>
                            <span>BÍ MẬT KHẢO NGHIỆM ĐOẠT BẢO & ĐIỀU KIỆN TIẾP NHẬN TRUYỀN THỪA:</span>
                          </div>
                          <p className="text-teal-100/90 leading-relaxed font-sans">{item.treasureTrialSecret}</p>
                        </div>
                      )}

                      {/* Immortal Tree Legend Connection Card */}
                      {item.immortalTreeConnection && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-lime-950/30 border border-emerald-400/50 text-xs space-y-1.5 shadow-lg shadow-emerald-950/40">
                          <div className="flex items-center gap-1.5 text-emerald-300 font-black text-[11px] tracking-wide uppercase">
                            <span className="text-sm">🌳</span>
                            <span>MẠCH KẾT NỐI TRUYỀN THUYẾT CÂY TRƯỜNG SINH & TIỂU SỬ VẬN MỆNH:</span>
                          </div>
                          <p className="text-emerald-100/95 leading-relaxed font-sans">{item.immortalTreeConnection}</p>
                        </div>
                      )}

                      {/* Vivid Character Impact Detail */}
                      {item.characterVividImpact && (
                        <div className="p-3 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-2 text-xs">
                          <span className="text-base leading-none">✨</span>
                          <div>
                            <strong className="text-amber-300 text-[11px] block font-bold mb-0.5">
                              CHI TIẾT KHẮC HỌA SỐNG ĐỘNG NHÂN VẬT (Thói quen, ánh mắt, cử chỉ đời thường):
                            </strong>
                            <p className="text-amber-100/90 leading-relaxed">{item.characterVividImpact}</p>
                          </div>
                        </div>
                      )}

                      {/* Spoken Dialogue Blockquote */}
                      {item.spokenDialogueDraft && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900 via-gray-900/90 to-purple-950/30 border border-purple-500/30 text-xs text-amber-100/95 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-amber-400 font-black text-[11px] flex items-center gap-1">
                              <span>🎙️</span>
                              <span>TRÍCH ĐOẠN LỜI TƯỜNG THUẬT SỐNG ĐỘNG (LỜI THOẠI TRỰC TIẾP):</span>
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item.spokenDialogueDraft);
                                  alert('Đã sao chép lời tường thuật vào khay nhớ tạm!');
                                }}
                                className="px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-[10px] font-bold transition-all"
                              >
                                📋 Sao Chép
                              </button>

                              {onInsertText && (
                                <button
                                  onClick={() => {
                                    onInsertText(
                                      `[Trích đoạn lời kể: ${item.subplotTitle} - ${item.speakerNameAndRole}]\n"${item.spokenDialogueDraft}"`
                                    );
                                    alert('Đã chèn lời kể vào chương truyện!');
                                  }}
                                  className="px-2.5 py-0.5 rounded bg-amber-600 hover:bg-amber-500 text-gray-950 text-[10px] font-black transition-all"
                                >
                                  📝 Chèn Vào Chương
                                </button>
                              )}
                            </div>
                          </div>

                          <blockquote className="border-l-2 border-amber-400/60 pl-3.5 py-0.5 text-xs text-gray-200 leading-relaxed font-serif italic">
                            "{item.spokenDialogueDraft}"
                          </blockquote>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleOpenEditOralLore(item)}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 font-bold"
                        >
                          ✏️ Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteOralLore(item.id)}
                          className="px-2.5 py-1 rounded bg-red-950 hover:bg-red-900 text-xs text-red-300 font-bold"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 9: STORY SNIPPETS & ORAL LORE GALLERY ================= */}
        {activeTab === 'storySnippets' && (
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="p-4 rounded-xl bg-gray-950/80 border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
              <div>
                <h3 className="text-sm font-black text-amber-300 uppercase flex items-center gap-2">
                  <span>📖</span>
                  <span>KHO TRÍCH ĐOẠN VĂN PHONG & LỜI KỂ GIAI THOẠI TOÀN DIỆN</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Tổng hợp {allStorySnippets.length} đoạn văn mẫu tả cảnh, đấu trí, lời chứng nhân, nhiệm vụ đoạt bảo và đột phá cảnh giới của <strong>{currentChar.name}</strong>
                </p>
              </div>

              {onInsertText && filteredStorySnippets.length > 0 && (
                <button
                  onClick={() => {
                    const allSnippetsText = filteredStorySnippets
                      .map((item) => `[${item.categoryLabel}: ${item.title} (${item.timeOrSetting})]\n"${item.prose}"`)
                      .join('\n\n---\n\n');
                    onInsertText(allSnippetsText);
                    alert(`Đã chèn ${filteredStorySnippets.length} trích đoạn được lọc vào bản thảo!`);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                >
                  <span>📝</span> Chèn {filteredStorySnippets.length} Trích Đoạn Đang Lọc
                </button>
              )}
            </div>

            {/* Filter Pills for Snippet Categories */}
            <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-white/5">
              <span className="text-[11px] font-bold text-gray-400 mr-1 flex items-center gap-1">
                <span>📑</span> Phân Loại:
              </span>
              {[
                { key: 'ALL', label: 'Tất Cả Trích Đoạn', icon: '✨', count: allStorySnippets.length },
                {
                  key: 'ORAL_LORE',
                  label: 'Giai Thoại Kể Lại',
                  icon: '🎙️',
                  count: allStorySnippets.filter((s) => s.category === 'ORAL_LORE').length
                },
                {
                  key: 'MILESTONES',
                  label: 'Niên Biểu Vận Mệnh',
                  icon: '⏳',
                  count: allStorySnippets.filter((s) => s.category === 'MILESTONES').length
                },
                {
                  key: 'QUESTS',
                  label: 'Nhiệm Vụ & Bí Cảnh',
                  icon: '📜',
                  count: allStorySnippets.filter((s) => s.category === 'QUESTS').length
                },
                {
                  key: 'KARMIC',
                  label: 'Cơ Duyên & Thần Binh',
                  icon: '🌿',
                  count: allStorySnippets.filter((s) => s.category === 'KARMIC').length
                },
                {
                  key: 'DEMONS',
                  label: 'Tâm Ma & Ngộ Đạo',
                  icon: '🧘',
                  count: allStorySnippets.filter((s) => s.category === 'DEMONS').length
                },
                {
                  key: 'NEMESIS',
                  label: 'Túc Địch & Tử Chiến',
                  icon: '⚔️',
                  count: allStorySnippets.filter((s) => s.category === 'NEMESIS').length
                }
              ].map((cat) => {
                const isSelected = snippetCategoryFilter === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSnippetCategoryFilter(cat.key)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-pink-500 text-gray-950 font-black shadow-md'
                        : 'bg-gray-900/80 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className="font-mono text-[10px] opacity-80">({cat.count})</span>
                  </button>
                );
              })}
            </div>

            {/* List of Filtered Snippets */}
            {filteredStorySnippets.length === 0 ? (
              <div className="p-8 text-center text-xs text-gray-400 bg-gray-950/60 rounded-2xl border border-dashed border-gray-800">
                Không tìm thấy trích đoạn văn phong nào phù hợp với bộ lọc này.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredStorySnippets.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-gray-950 border border-white/10 hover:border-pink-500/40 transition-all space-y-3 shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black border flex items-center gap-1 ${item.categoryBadgeBg} ${item.categoryBadgeBorder} ${item.categoryBadgeText}`}
                        >
                          <span>{item.categoryIcon}</span>
                          <span>{item.categoryLabel}</span>
                        </span>

                        <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                          {item.timeOrSetting}
                        </span>

                        <span className="text-xs font-black text-white">{item.title}</span>

                        {item.speakerOrEntity && (
                          <span className="text-[11px] text-cyan-300 font-medium">
                            • {item.speakerOrEntity}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`[${item.title}]\n"${item.prose}"`);
                            setCopiedSnippetId(item.id);
                            setTimeout(() => setCopiedSnippetId(null), 2000);
                          }}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold flex items-center gap-1 transition-all"
                        >
                          <span>{copiedSnippetId === item.id ? '✅' : '📋'}</span>
                          <span>{copiedSnippetId === item.id ? 'Đã Chép' : 'Sao Chép'}</span>
                        </button>

                        {onInsertText && (
                          <button
                            onClick={() => {
                              onInsertText(`[${item.categoryLabel}: ${item.title} (${item.timeOrSetting})]\n"${item.prose}"`);
                              alert(`Đã chèn trích đoạn "${item.title}" vào bản thảo!`);
                            }}
                            className="px-2.5 py-1 rounded bg-pink-900/60 hover:bg-pink-800 text-pink-200 border border-pink-500/30 text-xs font-bold flex items-center gap-1 transition-all"
                          >
                            <span>📝</span>
                            <span>Chèn Vào Bản Thảo</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Metadata tags if any */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        {item.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className={`text-[11px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${t.badgeClass}`}
                          >
                            <span>{t.label}:</span>
                            <span>{t.text}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Prose blockquote */}
                    <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                      <blockquote className="text-xs text-gray-200 leading-relaxed font-serif italic">
                        "{item.prose}"
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 10: AI TRAJECTORY WEAVER ================= */}
        {activeTab === 'aiWeaver' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-950/40 to-gray-950 border border-purple-500/40 shadow-2xl space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-400 font-mono font-bold uppercase tracking-wider">
                    AI DESTINY ROUTE WEAVER
                  </span>
                  <h3 className="text-base font-black text-white">
                    Kiến Tạo Tự Động 8 Chiều Không Gian Định Tuyến Cho {currentChar.name}
                  </h3>
                </div>
                <span className="text-2xl">⚡</span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Hệ thống AI sẽ phân tích hình mẫu vai trò (<strong>{currentChar.role}</strong>), cảnh giới hiện tại (<strong>{currentChar.realmOrRank}</strong>), tông môn (<strong>{currentChar.sectOrFaction || 'Tán tu'}</strong>) và cốt truyện để dệt nên:
                <br />
                • <strong>10 nhóm quan hệ:</strong> Cha mẹ, gia tộc, vợ con, bạn bè, hàng xóm, tông môn, sư huynh đệ, đệ tử, kẻ thù.
                <br />
                • <strong>Niên biểu vận mệnh:</strong> Tu luyện đột phá, cơ duyên kỳ ngộ, hội ngộ, chia ly, sứ mệnh, bước ngoặt.
                <br />
                • <strong>Nhiệm vụ & Bí cảnh:</strong> Nhiệm vụ tông môn, du ngoạn hồng trần, thí luyện đại bỉ, vào bí cảnh thượng cổ.
                <br />
                • <strong>Bản đồ địa danh:</strong> Làng mạc, thành trì, bí cảnh, sơn hải theo từng mốc giai đoạn quá khứ & tương lai.
                <br />
                • <strong>Cơ duyên & Thần binh:</strong> Thần binh bản mệnh, tàn hồn cổ tiên, dị hỏa, linh thú khế ước.
                <br />
                • <strong>Túc địch & Quyết chiến:</strong> Huyết hải thâm cừu, các lần chạm trán, ước hẹn quyết chiến sinh tử.
                <br />
                • <strong>Tâm ma & Đạo tâm:</strong> Chấp niệm quá khứ, sát tâm cuồng bạo, bình cảnh cảnh giới và phương thức phá chấp.
                <br />
                • <strong>Thế lực & Lãnh địa:</strong> Chức vị môn phái, lãnh địa cai quản, đồng minh và phe phái đối lập.
              </p>

              <div>
                <label className="block text-xs font-bold text-amber-300 mb-1.5">
                  Định Hướng Ý Tưởng & Biến Cố Chủ Đạo Của Nhân Vật:
                </label>
                <textarea
                  rows={4}
                  value={aiFocusPrompt}
                  onChange={(e) => setAiFocusPrompt(e.target.value)}
                  placeholder="Ví dụ: Thiếu niên hàn vi bị từ hôn, rơi xuống Đoạn Hồn Nhai gặp kỳ ngộ, cha mẹ bị thế gia thượng giới bắt giam, quyết tâm tu luyện kiếm đạo trả thù, đi qua các tiên thành và bí cảnh nguy hiểm..."
                  className="w-full bg-gray-900 border border-purple-500/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400 placeholder-gray-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    const preset = PRESET_TRAJECTORY_PROFILES.find((p) => p.characterId === selectedCharId);
                    if (preset) {
                      updateCurrentProfile(preset);
                      alert(`Đã nạp bộ Preset kinh điển 8 chiều định tuyến hoàn chỉnh cho "${currentChar.name}"!`);
                      setActiveTab('nexusGraph');
                    } else {
                      alert('Chưa có preset sẵn cho nhân vật này, hãy dùng nút Khởi Động AI bên phải!');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-white/10 text-xs font-bold text-gray-300 transition-all"
                >
                  📥 Nạp Lại Preset Mẫu Chuẩn
                </button>

                <button
                  disabled={isGeneratingTrajectory}
                  onClick={handleAIGenerateTrajectory}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-gray-950 font-black text-xs shadow-lg flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isGeneratingTrajectory ? (
                    <>
                      <Spinner />
                      <span>Đang Dệt Toàn Bộ 8 Chiều Định Tuyến...</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>Khởi Động Dệt Định Tuyến AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          MODALS SECTION (RELATION, MILESTONE, QUEST, GEO, KARMIC, NEMESIS, DAO, FACTION)
          ========================================================================= */}
      {/* 1. Modal Relation */}
      {relationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-purple-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-amber-300 uppercase">
                {editingRelationId ? 'Chỉnh Sửa Mối Quan Hệ' : 'Thiết Lập Mối Quan Hệ Định Tuyến Mới'}
              </h3>
              <button onClick={() => setRelationModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Phân Loại Quan Hệ (10 Nhánh):</label>
                <select
                  value={relCategory}
                  onChange={(e) => setRelCategory(e.target.value as CharacterNexusRelationCategory)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                >
                  {(Object.keys(NEXUS_CATEGORIES_META) as CharacterNexusRelationCategory[]).map((cat) => (
                    <option key={cat} value={cat}>
                      {NEXUS_CATEGORIES_META[cat].icon} {NEXUS_CATEGORIES_META[cat].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Đối Tượng:</label>
                  <input
                    type="text"
                    value={relTargetName}
                    onChange={(e) => setRelTargetName(e.target.value)}
                    placeholder="Ví dụ: Lâm Chấn Thiên, Lạc Thanh Hàn..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Vai Vế / Danh Xưng:</label>
                  <input
                    type="text"
                    value={relTargetRole}
                    onChange={(e) => setRelTargetRole(e.target.value)}
                    placeholder="Ví dụ: Phụ Thân, Đạo Lữ..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">
                    Độ Thân Mật (-100 đến +100): <span className="text-amber-300 font-bold">{relIntimacy}</span>
                  </label>
                  <input
                    type="range"
                    min="-100"
                    max="100"
                    value={relIntimacy}
                    onChange={(e) => setRelIntimacy(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Trạng Thái Sinh Mệnh:</label>
                  <select
                    value={relStatus}
                    onChange={(e) => setRelStatus(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  >
                    <option value="Còn Sống">Còn Sống</option>
                    <option value="Đã Tọa Hóa / Bỏ Mạng">Đã Tọa Hóa / Bỏ Mạng</option>
                    <option value="Mất Tích / Lưu Lạc">Mất Tích / Lưu Lạc</option>
                    <option value="Phi Thăng Thượng Giới">Phi Thăng Thượng Giới</option>
                    <option value="Bị Giam Cầm / Phong Ấn">Bị Giam Cầm / Phong Ấn</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Nguồn Gốc Mối Quan Hệ:</label>
                <textarea
                  rows={2}
                  value={relOrigin}
                  onChange={(e) => setRelOrigin(e.target.value)}
                  placeholder="Khởi nguồn duyên cớ quen biết từ bao giờ..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Tình Trạng Dây Dưa Hiện Tại:</label>
                <textarea
                  rows={2}
                  value={relDynamics}
                  onChange={(e) => setRelDynamics(e.target.value)}
                  placeholder="Hiện tại họ đang đối xử với nhau ra sao..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Mối Nợ Nhân Quả / Hứa Hẹn:</label>
                <input
                  type="text"
                  value={relKarmic}
                  onChange={(e) => setRelKarmic(e.target.value)}
                  placeholder="Món nợ ân nghĩa hoặc huyết thù cần phải giải quyết..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setRelationModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveRelation} className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow">Lưu Mối Quan Hệ</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Milestone */}
      {milestoneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-cyan-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-cyan-300 uppercase">
                {editingMilestoneId ? 'Chỉnh Sửa Mốc Niên Biểu' : 'Thêm Mốc Vận Mệnh Mới'}
              </h3>
              <button onClick={() => setMilestoneModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Mốc Thời Gian:</label>
                  <input
                    type="text"
                    value={msTimeAnchor}
                    onChange={(e) => setMsTimeAnchor(e.target.value)}
                    placeholder="Ví dụ: Năm 16 tuổi, Trăm năm sau..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Phân Loại Mốc:</label>
                  <select
                    value={msType}
                    onChange={(e) => setMsType(e.target.value as TrajectoryMilestoneType)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-cyan-300 font-bold focus:outline-none"
                  >
                    {(Object.keys(MILESTONE_TYPES_META) as TrajectoryMilestoneType[]).map((mtype) => (
                      <option key={mtype} value={mtype}>
                        {MILESTONE_TYPES_META[mtype].icon} {MILESTONE_TYPES_META[mtype].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Tiêu Đề Mốc Biến Cố:</label>
                <input
                  type="text"
                  value={msTitle}
                  onChange={(e) => setMsTitle(e.target.value)}
                  placeholder="Ví dụ: Trụy Lạc Đoạn Hồn Nhai Nhặt Được Cổ Kiếm..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Không Gian / Địa Điểm:</label>
                  <input
                    type="text"
                    value={msLocation}
                    onChange={(e) => setMsLocation(e.target.value)}
                    placeholder="Ví dụ: Đoạn Hồn Nhai, Thái Hư Môn..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Nhân Vật Liên Đới (phẩy):</label>
                  <input
                    type="text"
                    value={msInvolved}
                    onChange={(e) => setMsInvolved(e.target.value)}
                    placeholder="Ví dụ: Lạc Thanh Hàn, Thạch Phá Thiên..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Diễn Biến Chi Tiết Sự Việc:</label>
                <textarea
                  rows={3}
                  value={msDescription}
                  onChange={(e) => setMsDescription(e.target.value)}
                  placeholder="Mô tả cụ thể chuyện gì đã xảy ra, ai làm gì..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tu Vi Trước & Sau Mốc Này:</label>
                  <input
                    type="text"
                    value={msCultivation}
                    onChange={(e) => setMsCultivation(e.target.value)}
                    placeholder="Ví dụ: Luyện Khí -> Trúc Cơ Nghịch Thiên"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-blue-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Biến Chuyển Tâm Tính / Đạo Tâm:</label>
                  <input
                    type="text"
                    value={msPsychological}
                    onChange={(e) => setMsPsychological(e.target.value)}
                    placeholder="Ví dụ: Rèn đúc tâm tính lạnh lùng sát phạt..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-purple-300 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Âm Vang Nhân Quả Tương Lai:</label>
                <input
                  type="text"
                  value={msKarmic}
                  onChange={(e) => setMsKarmic(e.target.value)}
                  placeholder="Dấu ấn lâu dài tác động đến vận mệnh về sau..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Trích Đoạn Tiểu Thuyết Sống Động:</label>
                <textarea
                  rows={3}
                  value={msSnippet}
                  onChange={(e) => setMsSnippet(e.target.value)}
                  placeholder="Một đoạn văn phong miêu tả sống động khoảnh khắc này..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-rose-100 italic focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setMilestoneModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveMilestone} className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow">Lưu Mốc Niên Biểu</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Quest */}
      {questModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-emerald-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-emerald-300 uppercase">
                {editingQuestId ? 'Chỉnh Sửa Nhánh Nhiệm Vụ / Bí Cảnh' : 'Thêm Nhiệm Vụ, Thí Luyện Hoặc Bí Cảnh Mới'}
              </h3>
              <button onClick={() => setQuestModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Phân Loại:</label>
                  <select
                    value={qtrCategory}
                    onChange={(e) => setQtrCategory(e.target.value as QuestTrialCategory)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-emerald-300 font-bold focus:outline-none"
                  >
                    {(Object.keys(QUEST_TRIAL_CATEGORIES_META) as QuestTrialCategory[]).map((cat) => (
                      <option key={cat} value={cat}>
                        {QUEST_TRIAL_CATEGORIES_META[cat].icon} {QUEST_TRIAL_CATEGORIES_META[cat].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Mốc Thời Gian / Giai Đoạn:</label>
                  <input
                    type="text"
                    value={qtrStageTime}
                    onChange={(e) => setQtrStageTime(e.target.value)}
                    placeholder="Ví dụ: Năm 16 tuổi (Nhập Môn)..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Tiêu Đề Bản Ghi:</label>
                <input
                  type="text"
                  value={qtrTitle}
                  onChange={(e) => setQtrTitle(e.target.value)}
                  placeholder="Ví dụ: Thí Luyện Ngoại Môn Cửu Trọng Thiên Nhai..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Địa Danh Diễn Ra:</label>
                  <input
                    type="text"
                    value={qtrLocation}
                    onChange={(e) => setQtrLocation(e.target.value)}
                    placeholder="Ví dụ: Lôi Đài Thí Luyện..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Độ Nguy Cấp:</label>
                  <select
                    value={qtrDifficulty}
                    onChange={(e) => setQtrDifficulty(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-purple-300 font-bold focus:outline-none"
                  >
                    <option value="Phổ Thông">Phổ Thông</option>
                    <option value="Hiểm Trở">Hiểm Trở</option>
                    <option value="Cực Nguy Cấp S">Cực Nguy Cấp S</option>
                    <option value="Thập Tử Vô Sinh SSS">Thập Tử Vô Sinh SSS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tiến Độ Thực Hiện:</label>
                  <select
                    value={qtrStatus}
                    onChange={(e) => setQtrStatus(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  >
                    <option value="Đã Hoàn Thành">Đã Hoàn Thành</option>
                    <option value="Đang Thực Hiện">Đang Thực Hiện</option>
                    <option value="Cần Thực Hiện (Chờ Kích Hoạt)">Cần Thực Hiện</option>
                    <option value="Di Hận Thất Bại">Di Hận Thất Bại</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Bối Cảnh / Đơn Vị Giao Phó:</label>
                <input
                  type="text"
                  value={qtrAuthority}
                  onChange={(e) => setQtrAuthority(e.target.value)}
                  placeholder="Ví dụ: Chấp Pháp Điện ủy thác..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Các Mục Tiêu Then Chốt (Mỗi dòng một mục tiêu):</label>
                <textarea
                  rows={2}
                  value={qtrObjectives}
                  onChange={(e) => setQtrObjectives(e.target.value)}
                  placeholder="Vượt qua 900 bậc thang&#10;Đánh bại khôi lỗi kiếm trận..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none font-mono text-[11px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Kẻ Địch / Hiểm Họa:</label>
                  <input
                    type="text"
                    value={qtrEncounters}
                    onChange={(e) => setQtrEncounters(e.target.value)}
                    placeholder="Ví dụ: Ba đại Ma Tướng..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-red-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Phần Thưởng & Đột Phá:</label>
                  <input
                    type="text"
                    value={qtrRewards}
                    onChange={(e) => setQtrRewards(e.target.value)}
                    placeholder="Ví dụ: Đoạt Băng Phách Thần Tinh..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Ký Sự Hành Trình / Trích Đoạn:</label>
                <textarea
                  rows={2}
                  value={qtrSnippet}
                  onChange={(e) => setQtrSnippet(e.target.value)}
                  placeholder="Một đoạn ký sự tiểu thuyết..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-rose-100 italic focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setQuestModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveQuest} className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow">Lưu Nhánh Nhiệm Vụ</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal Geo */}
      {geoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-pink-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-pink-300 uppercase">
                {editingGeoId ? 'Chỉnh Sửa Địa Danh Sơn Hà' : 'Thêm Địa Danh & Sơn Hà Hành Trình Mới'}
              </h3>
              <button onClick={() => setGeoModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Địa Danh:</label>
                  <input
                    type="text"
                    value={geoName}
                    onChange={(e) => setGeoName(e.target.value)}
                    placeholder="Ví dụ: Thanh Thạch Thôn..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Loại Địa Danh:</label>
                  <select
                    value={geoType}
                    onChange={(e) => setGeoType(e.target.value as GeographicLocationType)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-pink-300 font-bold focus:outline-none"
                  >
                    {(Object.keys(GEOGRAPHIC_TYPES_META) as GeographicLocationType[]).map((gt) => (
                      <option key={gt} value={gt}>
                        {GEOGRAPHIC_TYPES_META[gt].icon} {GEOGRAPHIC_TYPES_META[gt].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Trạng Thái Hành Trình:</label>
                  <select
                    value={geoStatus}
                    onChange={(e) => setGeoStatus(e.target.value as GeographicTraversalStatus)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  >
                    {(Object.keys(GEOGRAPHIC_STATUS_META) as GeographicTraversalStatus[]).map((st) => (
                      <option key={st} value={st}>
                        {GEOGRAPHIC_STATUS_META[st].icon} {GEOGRAPHIC_STATUS_META[st].label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Giai Đoạn Mốc Thời Gian:</label>
                  <input
                    type="text"
                    value={geoStage}
                    onChange={(e) => setGeoStage(e.target.value)}
                    placeholder="Ví dụ: Giai đoạn 1: Thuở Hàn Vi..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Thuộc Đại Vực / Cõi Giới:</label>
                <input
                  type="text"
                  value={geoRegion}
                  onChange={(e) => setGeoRegion(e.target.value)}
                  placeholder="Ví dụ: Đông Vực • Thanh Vân Châu..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Địa Hình & Mật Độ Linh Khí:</label>
                <textarea
                  rows={2}
                  value={geoTerrain}
                  onChange={(e) => setGeoTerrain(e.target.value)}
                  placeholder="Mô tả khí hậu, phong thủy, địa mạo..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Nhiệm Vụ Bắt Buộc Tại Đây:</label>
                <textarea
                  rows={2}
                  value={geoTasks}
                  onChange={(e) => setGeoTasks(e.target.value)}
                  placeholder="Nhiệm vụ hoặc khảo nghiệm bắt buộc..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Dấu Ấn Để Lại / Chiến Tích:</label>
                <input
                  type="text"
                  value={geoConquest}
                  onChange={(e) => setGeoConquest(e.target.value)}
                  placeholder="Ví dụ: Khắc kiếm ý trên vách đá..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-emerald-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Đoạn Văn Phong Miêu Tả Cảnh Sắc:</label>
                <textarea
                  rows={2}
                  value={geoScenery}
                  onChange={(e) => setGeoScenery(e.target.value)}
                  placeholder="Trích đoạn miêu tả phong cảnh..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-rose-100 italic focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setGeoModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveGeo} className="px-5 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow">Lưu Địa Danh</button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Karmic Inheritance */}
      {karmicModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-amber-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-amber-300 uppercase">
                {editingKarmicId ? 'Chỉnh Sửa Cơ Duyên / Thần Binh' : 'Thêm Thần Binh Hoặc Cơ Duyên Mới'}
              </h3>
              <button onClick={() => setKarmicModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Cơ Duyên / Thần Binh:</label>
                  <input
                    type="text"
                    value={kiName}
                    onChange={(e) => setKiName(e.target.value)}
                    placeholder="Ví dụ: Thái Sơ Hỗn Độn Kiếm Thai..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Phân Loại:</label>
                  <select
                    value={kiType}
                    onChange={(e) => setKiType(e.target.value as KarmicInheritanceType)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                  >
                    {(Object.keys(KARMIC_TYPES_META) as KarmicInheritanceType[]).map((kt) => (
                      <option key={kt} value={kt}>
                        {KARMIC_TYPES_META[kt].icon} {KARMIC_TYPES_META[kt].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Mốc Đạt Được:</label>
                  <input
                    type="text"
                    value={kiMilestone}
                    onChange={(e) => setKiMilestone(e.target.value)}
                    placeholder="Năm 14 tuổi..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Phẩm Cấp:</label>
                  <input
                    type="text"
                    value={kiGrade}
                    onChange={(e) => setKiGrade(e.target.value)}
                    placeholder="Thượng Cổ Chí Bảo..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Thức Tỉnh:</label>
                  <input
                    type="text"
                    value={kiAwakening}
                    onChange={(e) => setKiAwakening(e.target.value)}
                    placeholder="Tầng 5/9..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Trạng Thái Kết Nối Hồn Phách:</label>
                <select
                  value={kiBond}
                  onChange={(e) => setKiBond(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-purple-300 font-bold focus:outline-none"
                >
                  <option value="Sơ Bộ Luyện Hóa">Sơ Bộ Luyện Hóa</option>
                  <option value="Tâm Huyết Tương Liên">Tâm Huyết Tương Liên</option>
                  <option value="Hợp Nhất Đạo Thân">Hợp Nhất Đạo Thân</option>
                  <option value="Khí Linh Thức Tỉnh">Khí Linh Thức Tỉnh</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Thần Thông Năng Lực (Mỗi dòng một mục):</label>
                <textarea
                  rows={2}
                  value={kiAbilities}
                  onChange={(e) => setKiAbilities(e.target.value)}
                  placeholder="Trảm Không Kiếm Khí&#10;Hộ Thể Kiếm Cương..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Phản Phệ & Cái Giá Phải Trả:</label>
                <input
                  type="text"
                  value={kiCost}
                  onChange={(e) => setKiCost(e.target.value)}
                  placeholder="Tác dụng phụ hoặc điều kiện hạn chế..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-red-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Điển Tích / Trích Đoạn Văn Phong:</label>
                <textarea
                  rows={2}
                  value={kiSnippet}
                  onChange={(e) => setKiSnippet(e.target.value)}
                  placeholder="Trích đoạn miêu tả khoảnh khắc tỏa sáng..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-rose-100 italic focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setKarmicModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveKarmic} className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow">Lưu Cơ Duyên</button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Nemesis Feud */}
      {nemesisModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-red-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-red-300 uppercase">
                {editingNemesisId ? 'Chỉnh Sửa Túc Địch' : 'Thêm Túc Địch & Ước Hẹn Quyết Chiến Mới'}
              </h3>
              <button onClick={() => setNemesisModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Túc Địch:</label>
                  <input
                    type="text"
                    value={nfName}
                    onChange={(e) => setNfName(e.target.value)}
                    placeholder="Ví dụ: Huyết Cốt Ma Tôn..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Thế Lực & Cảnh Giới:</label>
                  <input
                    type="text"
                    value={nfFactionRank}
                    onChange={(e) => setNfFactionRank(e.target.value)}
                    placeholder="Ví dụ: Vạn Ma Tông - Đại Thừa..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-red-300 font-bold focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Mức Độ Thù Hận:</label>
                  <select
                    value={nfSeverity}
                    onChange={(e) => setNfSeverity(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  >
                    <option value="Huyết Hải Thâm Cừu">Huyết Hải Thâm Cừu</option>
                    <option value="Không Đội Trời Chung">Không Đội Trời Chung</option>
                    <option value="Đạo Tâm Xung Đột">Đạo Tâm Xung Đột</option>
                    <option value="Túc Mệnh Tranh Đoạt">Túc Mệnh Tranh Đoạt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Trạng Thái Hiện Tại:</label>
                  <select
                    value={nfStatus}
                    onChange={(e) => setNfStatus(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  >
                    <option value="Chờ Ngày Quyết Đấu">Chờ Ngày Quyết Đấu</option>
                    <option value="Đang Truy Lùng">Đang Truy Lùng</option>
                    <option value="Đã Trảm Sát">Đã Trảm Sát</option>
                    <option value="Đã Hóa Giải Ân Oán">Đã Hóa Giải Ân Oán</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Nguồn Gốc Mối Thù:</label>
                <textarea
                  rows={2}
                  value={nfOrigin}
                  onChange={(e) => setNfOrigin(e.target.value)}
                  placeholder="Nguyên nhân khởi sinh thù hận..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Các Lần Chạm Trán Trong Quá Khứ:</label>
                <textarea
                  rows={2}
                  value={nfClashes}
                  onChange={(e) => setNfClashes(e.target.value)}
                  placeholder="Đã từng giao đấu ra sao, thắng bại thế nào..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Ước Hẹn Quyết Chiến:</label>
                  <input
                    type="text"
                    value={nfDuelCond}
                    onChange={(e) => setNfDuelCond(e.target.value)}
                    placeholder="Thời gian, địa điểm quyết chiến..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-purple-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Phần Thưởng Khi Diệt Thù:</label>
                  <input
                    type="text"
                    value={nfReward}
                    onChange={(e) => setNfReward(e.target.value)}
                    placeholder="Đột phá đạo tâm, đoạt bảo..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-emerald-300 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Trích Đoạn Lời Thoại Đối Đầu:</label>
                <textarea
                  rows={2}
                  value={nfSnippet}
                  onChange={(e) => setNfSnippet(e.target.value)}
                  placeholder="Lời thoại sát khí ngút trời..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-rose-100 italic focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setNemesisModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveNemesis} className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow">Lưu Túc Địch</button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal Dao Demon */}
      {daoDemonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-purple-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-purple-300 uppercase">
                {editingDemonId ? 'Chỉnh Sửa Tâm Ma Kiếp' : 'Thêm Tâm Ma Kiếp Nạn Mới'}
              </h3>
              <button onClick={() => setDaoDemonModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Tâm Ma / Chấp Niệm:</label>
                  <input
                    type="text"
                    value={dhdName}
                    onChange={(e) => setDhdName(e.target.value)}
                    placeholder="Ví dụ: Nỗi Sợ Phụ Mẫu Tiêu Vong..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Phân Loại Tâm Ma:</label>
                  <select
                    value={dhdType}
                    onChange={(e) => setDhdType(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-purple-300 font-bold focus:outline-none"
                  >
                    <option value="CHẤP_NIỆM_QUÁ_KHỨ">Chấp Niệm Quá Khứ</option>
                    <option value="SÁT_TÂM_CUỒNG_BẠO">Sát Tâm Cuồng Bạo</option>
                    <option value="BÌNH_CẢNH_CẢNH_GIỚI">Bình Cảnh Cảnh Giới</option>
                    <option value="SINH_TỬ_KIẾP_SỐ">Sinh Tử Kiếp Số</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Mốc Cảnh Giới Bộc Phát:</label>
                  <input
                    type="text"
                    value={dhdStage}
                    onChange={(e) => setDhdStage(e.target.value)}
                    placeholder="Ví dụ: Đột phá Hóa Thần..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Trạng Thái Vượt Qua:</label>
                  <select
                    value={dhdState}
                    onChange={(e) => setDhdState(e.target.value as any)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-emerald-300 font-bold focus:outline-none"
                  >
                    <option value="Đã Đốn Ngộ Hoàn Toàn">Đã Đốn Ngộ Hoàn Toàn</option>
                    <option value="Đang Giằng Co Tâm Trí">Đang Giằng Co Tâm Trí</option>
                    <option value="Chưa Vượt Qua (Nguy Cơ Phản Phệ)">Chưa Vượt Qua</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Biểu Hiện Của Tâm Ma:</label>
                <textarea
                  rows={2}
                  value={dhdManifest}
                  onChange={(e) => setDhdManifest(e.target.value)}
                  placeholder="Ảo ảnh, linh lực bốc hỏa, hành vi bất thường..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Phương Pháp Phá Chấp & Đốn Ngộ:</label>
                <textarea
                  rows={2}
                  value={dhdMethod}
                  onChange={(e) => setDhdMethod(e.target.value)}
                  placeholder="Cách thức nhân vật đối diện và vượt qua..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Quy Tắc Đại Đạo Đắc Chứng:</label>
                <input
                  type="text"
                  value={dhdMastery}
                  onChange={(e) => setDhdMastery(e.target.value)}
                  placeholder="Ví dụ: Bất Diệt Hữu Tình Kiếm Vực 90%..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-cyan-300 font-bold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Trích Đoạn Giác Ngộ Đạo Tâm:</label>
                <textarea
                  rows={2}
                  value={dhdSnippet}
                  onChange={(e) => setDhdSnippet(e.target.value)}
                  placeholder="Đoạn văn triết lý ngộ đạo..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-rose-100 italic focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setDaoDemonModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveDaoDemon} className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow">Lưu Tâm Ma</button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Modal Faction Power */}
      {factionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-blue-500/40 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-blue-300 uppercase">
                {editingFactionId ? 'Chỉnh Sửa Thế Lực / Lãnh Địa' : 'Thêm Thế Lực Hoặc Lãnh Địa Mới'}
              </h3>
              <button onClick={() => setFactionModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Thế Lực / Tông Môn:</label>
                  <input
                    type="text"
                    value={fpName}
                    onChange={(e) => setFpName(e.target.value)}
                    placeholder="Ví dụ: Thái Hư Kiếm Tông..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Chức Vị Cụ Thể:</label>
                  <input
                    type="text"
                    value={fpRole}
                    onChange={(e) => setFpRole(e.target.value)}
                    placeholder="Ví dụ: Thiếu Tông Chủ, Chưởng Môn..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-cyan-300 font-bold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Mức Độ Quyền Lực:</label>
                <select
                  value={fpAuthority}
                  onChange={(e) => setFpAuthority(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                >
                  <option value="Đệ Tử Bình Thường">Đệ Tử Ngoại Môn / Bình Thường</option>
                  <option value="Nòng Cốt / Chân Truyền">Nòng Cốt / Chân Truyền</option>
                  <option value="Chấp Chưởng Trọng Quyền">Chấp Chưởng Trọng Quyền</option>
                  <option value="Lãnh Tụ Tối Cao">Lãnh Tụ Tối Cao</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Lãnh Địa & Sơn Phong Cai Quản:</label>
                <textarea
                  rows={2}
                  value={fpTerritory}
                  onChange={(e) => setFpTerritory(e.target.value)}
                  placeholder="Tên ngọn núi, số lượng môn nhân, linh mạch..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Đồng Minh & Phân Đà Trung Thành (Mỗi dòng một mục):</label>
                <textarea
                  rows={2}
                  value={fpAllies}
                  onChange={(e) => setFpAllies(e.target.value)}
                  placeholder="Chiến Đường&#10;Chấp Pháp Điện..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Phe Phái Đối Lập & Dòm Ngó:</label>
                <input
                  type="text"
                  value={fpRivals}
                  onChange={(e) => setFpRivals(e.target.value)}
                  placeholder="Thế gia bảo thủ, trưởng lão chống đối..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-red-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Công Tích & Di Sản Đóng Góp:</label>
                <textarea
                  rows={2}
                  value={fpLegacy}
                  onChange={(e) => setFpLegacy(e.target.value)}
                  placeholder="Đại trận để lại, công pháp sáng tạo..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-emerald-200 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button onClick={() => setFactionModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold">Hủy</button>
              <button onClick={handleSaveFaction} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow">Lưu Thế Lực</button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal Oral Lore Subplot */}
      {oralLoreModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-950 border border-amber-500/40 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar animate-fade-in">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-amber-300 uppercase flex items-center gap-2">
                <span>🎙️</span>
                <span>{editingOralLoreId ? 'Chỉnh Sửa Giai Thoại Tiểu Sử Kể Lại' : 'Thiết Lập Mạch Chuyện Phụ & Giai Thoại Mới'}</span>
              </h3>
              <button onClick={() => setOralLoreModalOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tiêu Đề Mạch Chuyện Phụ / Giai Thoại:</label>
                  <input
                    type="text"
                    value={olsTitle}
                    onChange={(e) => setOlsTitle(e.target.value)}
                    placeholder="Ví dụ: Thước Gõ Trà Quán: Trận Chiến Hắc Huyết Nhai..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Nhóm Người Kể Chuyện (Speaker Type):</label>
                  <select
                    value={olsSpeakerType}
                    onChange={(e) => setOlsSpeakerType(e.target.value as OralLoreSpeakerType)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 font-bold focus:outline-none"
                  >
                    {(Object.keys(ORAL_LORE_SPEAKER_META) as OralLoreSpeakerType[]).map((stype) => (
                      <option key={stype} value={stype}>
                        {ORAL_LORE_SPEAKER_META[stype].icon} {ORAL_LORE_SPEAKER_META[stype].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Người Kể & Thân Phận Cụ Thể:</label>
                  <input
                    type="text"
                    value={olsSpeakerNameAndRole}
                    onChange={(e) => setOlsSpeakerNameAndRole(e.target.value)}
                    placeholder="Ví dụ: Lão Thuyết Thư Nhân Triệu Cửu Công (Khách điếm Lạc Dương)..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-cyan-300 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Mốc Thời Gian / Biến Cố Được Hồi Tưởng:</label>
                  <input
                    type="text"
                    value={olsRecountedEra}
                    onChange={(e) => setOlsRecountedEra(e.target.value)}
                    placeholder="Ví dụ: Năm 22 tuổi • Hậu Biến Cố Diệt Môn & Một Kiếm Đoạn Hậu..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-200 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1 font-semibold">Bối Cảnh Không Gian & Thời Điểm Nhắc Tới:</label>
                <input
                  type="text"
                  value={olsNarrativeSetting}
                  onChange={(e) => setOlsNarrativeSetting(e.target.value)}
                  placeholder="Ví dụ: Trà quán lộng gió chiều tà bên ngoài Tiên Thành, tu sĩ tụ tập uống trà nghe kể chuyện..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                />
              </div>

              {/* Treasure / Realm / Ancient Inheritance Specifics */}
              <div className="p-3.5 rounded-xl bg-gray-900/80 border border-teal-500/30 space-y-3">
                <div className="flex items-center gap-1.5 text-teal-300 font-bold text-xs uppercase">
                  <span>🌿</span>
                  <span>Liên Quan Đến Thiên Tài Địa Bảo, Bí Cảnh Hoặc Truyền Thừa Cổ Tiên:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">Phân Loại Cơ Duyên / Bảo Vật:</label>
                    <select
                      value={olsTreasureCategory}
                      onChange={(e) => setOlsTreasureCategory(e.target.value as OralLoreTreasureCategory)}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-teal-300 font-bold focus:outline-none"
                    >
                      {(Object.keys(TREASURE_LORE_CATEGORIES_META) as OralLoreTreasureCategory[]).map((cat) => (
                        <option key={cat} value={cat}>
                          {TREASURE_LORE_CATEGORIES_META[cat].icon} {TREASURE_LORE_CATEGORIES_META[cat].label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">Tên Thiên Tài Địa Bảo / Bí Cảnh / Truyền Thừa:</label>
                    <input
                      type="text"
                      value={olsTreasure}
                      onChange={(e) => setOlsTreasure(e.target.value)}
                      placeholder="Ví dụ: Cửu Diệp Hồi Hồn Thảo / Huyền Thiên Bí Cảnh / Cổ Tiên Kiếm Thai..."
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-amber-200 font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Bí Mật Khảo Nghiệm / Cái Giá Đoạt Bảo / Điều Kiện Thừa Kế:</label>
                  <textarea
                    rows={2}
                    value={olsTrialSecret}
                    onChange={(e) => setOlsTrialSecret(e.target.value)}
                    placeholder="Ví dụ: Phải vượt qua bài kiểm tra Bạt Kiếm Vấn Tâm, không động lòng tham sát phạt; hay hỏa độc thiêu đốt hồn phách..."
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none font-sans text-xs"
                  />
                </div>
                <div>
                  <label className="block text-emerald-300 mb-1 font-semibold flex items-center gap-1">
                    <span>🌳</span> Mạch Kết Nối Truyền Thuyết Cây Trường Sinh & Tiểu Sử / Đạo Tâm Nhân Vật:
                  </label>
                  <textarea
                    rows={2}
                    value={olsImmortalTree}
                    onChange={(e) => setOlsImmortalTree(e.target.value)}
                    placeholder="Ví dụ: Dâng hiến 300 năm thọ nguyên xin phiến lá Trường Sinh Diệp cứu tàn hồn ân sư; lấy nước mắt sưởi ấm mầm xanh cội rễ; lưng trần đỡ cành cây thần gãy ngăn trời sập..."
                    className="w-full bg-gray-950 border border-emerald-500/30 rounded-lg p-2 text-emerald-100 focus:outline-none font-sans text-xs"
                  />
                </div>
              </div>

              {/* Mission / Quest Execution Specifics */}
              <div className="p-3.5 rounded-xl bg-gray-900/80 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase">
                  <span>🎯</span>
                  <span>Liên Quan Đến Lần Đi Thực Hiện Nhiệm Vụ & Mạch Nối Tiểu Sử:</span>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Tên Nhiệm Vụ / Chuyến Đi Thực Hiện Nhiệm Vụ Được Nhắc Tới:</label>
                  <input
                    type="text"
                    value={olsAssociatedMission}
                    onChange={(e) => setOlsAssociatedMission(e.target.value)}
                    placeholder="Ví dụ: Huyền Thưởng Cấp S: Tiêu Diệt Hắc Phong Ma Quật / Hộ Tống Dược Đan / Thí Luyện Cửu Trọng Thiên Nhai..."
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-amber-200 font-bold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Chân Tướng Thực Hiện Nhiệm Vụ & Chi Tiết Nghịch Chuyển (Sự thật đằng sau báo cáo):</label>
                  <textarea
                    rows={2}
                    value={olsMissionExecutionTruth}
                    onChange={(e) => setOlsMissionExecutionTruth(e.target.value)}
                    placeholder="Ví dụ: Báo cáo nhiệm vụ chỉ ghi 3 chữ 'Đã hoàn thành', nhưng thực tế chàng một mình đoạn hậu, dùng kiếm gãy chống đỡ ba ngày ba đêm cho đồng đội rút lui..."
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none font-sans text-xs"
                  />
                </div>
              </div>

              {/* Cultivation Breakthrough & Tribulation Specifics */}
              <div className="p-3.5 rounded-xl bg-gray-900/80 border border-yellow-500/30 space-y-3">
                <div className="flex items-center gap-1.5 text-yellow-300 font-bold text-xs uppercase">
                  <span>⚡</span>
                  <span>Liên Quan Đến Đột Phá Cảnh Giới & Dị Tượng Thiên Kiếp:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">Mốc Cảnh Giới Đột Phá:</label>
                    <input
                      type="text"
                      value={olsBreakthroughStage}
                      onChange={(e) => setOlsBreakthroughStage(e.target.value)}
                      placeholder="Ví dụ: Trúc Cơ Viên Mãn -> Cửu Chuyển Hỗn Độn Kim Đan / Kim Đan -> Nguyên Anh..."
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-yellow-300 font-bold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">Dị Tượng Lôi Kiếp / Thiên Địa:</label>
                    <input
                      type="text"
                      value={olsTribulationPhenomenon}
                      onChange={(e) => setOlsTribulationPhenomenon(e.target.value)}
                      placeholder="Ví dụ: Cửu Trọng Tử Tiêu Thần Lôi / Băng Hoàng Niết Bàn Hà Quang / Vạn Long Triều Bái..."
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-purple-200 font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Chân Tướng Quá Trình Đột Phá & Đạo Tâm Niết Bàn (Sự thật phía sau lời đồn):</label>
                  <textarea
                    rows={2}
                    value={olsBreakthroughTruth}
                    onChange={(e) => setOlsBreakthroughTruth(e.target.value)}
                    placeholder="Ví dụ: Người ngoài tưởng uống đan dược một bước lên mây, nhưng thực tế kinh mạch đứt lìa, dùng ngọn lửa thuần dương tự thiêu thân để ngưng tụ đạo đan vô cấu..."
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none font-sans text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Góc Nhìn & Tâm Thế Người Kể (Cảm xúc, thái độ):</label>
                  <textarea
                    rows={2}
                    value={olsPerspectiveSummary}
                    onChange={(e) => setOlsPerspectiveSummary(e.target.value)}
                    placeholder="Vừa sùng kính vừa rơi lệ cảm thán, diễn đạt như chính mắt đã chứng kiến..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Đối Chiếu: Sự Thật Cốt Lõi vs Dị Bản Đồn Thổi:</label>
                  <textarea
                    rows={2}
                    value={olsTruthVsRumor}
                    onChange={(e) => setOlsTruthVsRumor(e.target.value)}
                    placeholder="Lời đồn thế gian: Sát tinh máu lạnh. Sự thật: Liều mình đỡ kiếm bảo vệ đệ tử nhỏ..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-300 mb-1 font-semibold flex items-center gap-1">
                  <span>✨</span> Chi Tiết Khắc Họa Sống Động Nhân Vật (Thói quen, ánh mắt, vết sẹo, nụ cười đời thường):
                </label>
                <textarea
                  rows={2}
                  value={olsVividImpact}
                  onChange={(e) => setOlsVividImpact(e.target.value)}
                  placeholder="Ví dụ: Thói quen vô thức đưa tay xoa nhẹ vết sẹo ngang vai trái khi ngắm tuyết; thích ăn cháo đậu hoa mộc mạc..."
                  className="w-full bg-gray-900 border border-amber-500/30 rounded-lg p-2 text-amber-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-amber-300 mb-1 font-semibold flex items-center gap-1">
                  <span>🎙️</span> Lời Thoại / Độc Thoại Người Kể Trực Tiếp (Văn phong sống động để chèn vào chương):
                </label>
                <textarea
                  rows={4}
                  value={olsDialogueDraft}
                  onChange={(e) => setOlsDialogueDraft(e.target.value)}
                  placeholder="Chư vị khách quan chớ vội tin vào những lời đồn nhảm nhí ngoài kia! Năm ấy tại Hắc Huyết Nhai..."
                  className="w-full bg-gray-900 border border-amber-500/40 rounded-lg p-3 text-white focus:outline-none font-serif text-xs leading-relaxed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setOralLoreModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 text-xs font-semibold"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveOralLore}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-gray-950 text-xs font-black shadow"
              >
                Lưu Giai Thoại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
