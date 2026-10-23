import React, { useState } from 'react';
import {
  SubplotArcItem,
  SubplotForeshadowType,
  SubplotGenerationConfig,
  SubplotGenerationResult,
  MicroStoryStrand,
  MicroArcCategory,
  MicroArcScope,
  MicroArcGenerationConfig,
  MicroArcGenerationResult,
  CharacterProfile,
  NarrativeTrajectory,
  TrajectoryArchetype,
  BranchStoryArc,
  BranchArcDomain,
  BranchConvergenceNexus,
  TrajectoryConvergenceSimulationConfig,
  TrajectoryConvergenceSimulationResult
} from '../types';
import { PRESET_SUBPLOT_ARCS } from '../data/presetSubplotArcs';
import { PRESET_MICRO_STORY_STRANDS } from '../data/presetMicroStoryStrands';
import { PRESET_MASTER_CULTIVATION_SPINE } from '../data/presetMasterCultivationSpine';
import {
  PRESET_NARRATIVE_TRAJECTORIES,
  PRESET_BRANCH_STORY_ARCS,
  PRESET_BRANCH_CONVERGENCE_NEXUSES
} from '../data/presetNarrativeTrajectories';
import {
  generateSubplotArc,
  generateMicroStoryStrand,
  simulateTrajectoryConvergence,
  generateBranchStoryArc
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface SubplotArcsStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText: (text: string) => void;
  onCreateChapter?: (title: string, content: string, summary: string) => void;
}

const TYPE_CONFIG: Record<SubplotForeshadowType, { label: string; icon: string; color: string; badgeBg: string }> = {
  relic_token: {
    label: 'Di Bảo / Tàn Vật',
    icon: '🏺',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-950/40 border-amber-500/30 text-amber-300'
  },
  bloodline_debt: {
    label: 'Huyết Mạch & Ân Oán',
    icon: '🩸',
    color: 'text-red-400',
    badgeBg: 'bg-red-950/40 border-red-500/30 text-red-300'
  },
  sect_conspiracy: {
    label: 'Môn Phái & Gián Điệp',
    icon: '🕵️',
    color: 'text-purple-400',
    badgeBg: 'bg-purple-950/40 border-purple-500/30 text-purple-300'
  },
  anomaly_phenomenon: {
    label: 'Dị Tượng Thiên Địa',
    icon: '⚡',
    color: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300'
  },
  cipher_rhyme: {
    label: 'Cổ Ngữ & Ca Dao Điên',
    icon: '📜',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
  },
  forbidden_ruin: {
    label: 'Cấm Địa & Phong Ấn',
    icon: '⛩️',
    color: 'text-orange-400',
    badgeBg: 'bg-orange-950/40 border-orange-500/30 text-orange-300'
  },
  destined_npc: {
    label: 'Dị Nhân / Duyên Phận',
    icon: '🧙',
    color: 'text-indigo-400',
    badgeBg: 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
  }
};

const STATUS_CONFIG: Record<string, { label: string; badge: string }> = {
  dormant: { label: 'Chờ Xuất Hiện', badge: 'bg-gray-800 text-gray-400 border-gray-700' },
  planted: { label: 'Đã Gieo Mầm', badge: 'bg-amber-900/60 text-amber-300 border-amber-600/50' },
  growing: { label: 'Đang Nảy Nở', badge: 'bg-blue-900/60 text-blue-300 border-blue-600/50' },
  paid_off: { label: 'Đã Thu Hoạch', badge: 'bg-emerald-900/60 text-emerald-300 border-emerald-600/50' }
};

const MICRO_CATEGORY_CONFIG: Record<MicroArcCategory, { label: string; icon: string; color: string; badgeBg: string }> = {
  vendetta_local: {
    label: 'Ân Oán Cục Bộ / Phản Sát',
    icon: '⚔️',
    color: 'text-red-400',
    badgeBg: 'bg-red-950/40 border-red-500/30 text-red-300'
  },
  micro_treasure: {
    label: 'Tầm Bảo Vi Mô / Nhặt Đồ Phế Phẩm',
    icon: '🏺',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-950/40 border-amber-500/30 text-amber-300'
  },
  serendipitous_encounter: {
    label: 'Kỳ Ngộ Duyên Phận / Đền Ơn',
    icon: '✨',
    color: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-300'
  },
  technique_experiment: {
    label: 'Thử Nghiệm Dị Năng / Đột Phá',
    icon: '🧪',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
  },
  infiltration_recon: {
    label: 'Dọ Thám Cơ Mật / Trinh Sát',
    icon: '🕵️',
    color: 'text-purple-400',
    badgeBg: 'bg-purple-950/40 border-purple-500/30 text-purple-300'
  },
  dao_heart_tribulation: {
    label: 'Khảo Nghiệm Đạo Tâm / Ký Ức',
    icon: '🧘',
    color: 'text-blue-400',
    badgeBg: 'bg-blue-950/40 border-blue-500/30 text-blue-300'
  },
  black_market_gamble: {
    label: 'Đổ Thạch / Cược Mạng Hắc Thị',
    icon: '🎲',
    color: 'text-orange-400',
    badgeBg: 'bg-orange-950/40 border-orange-500/30 text-orange-300'
  },
  sect_daily_slice: {
    label: 'Sinh Hoạt Môn Phái / Đời Thường',
    icon: '🍵',
    color: 'text-pink-400',
    badgeBg: 'bg-pink-950/40 border-pink-500/30 text-pink-300'
  }
};

const SCOPE_CONFIG: Record<MicroArcScope, { label: string; badge: string }> = {
  single_scene: { label: '1 Phân Cảnh (500-1000 chữ)', badge: 'bg-indigo-900/50 text-indigo-300 border-indigo-500/40' },
  short_episode: { label: '1 Chương Ngắn (1500-2500 chữ)', badge: 'bg-purple-900/50 text-purple-300 border-purple-500/40' },
  mini_arc_multi: { label: 'Chuỗi 2-3 Chương (3000-5000 chữ)', badge: 'bg-amber-900/50 text-amber-300 border-amber-500/40' }
};

const BRANCH_DOMAIN_CONFIG: Record<BranchArcDomain, { label: string; icon: string; badge: string }> = {
  allied_faction: { label: 'Đồng Minh & Phe Phái', icon: '🤝', badge: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30' },
  nemesis_opposition: { label: 'Kình Địch & Đối Kháng', icon: '⚔️', badge: 'bg-red-950/40 text-red-300 border-red-500/30' },
  calamity_crisis: { label: 'Khủng Hoảng Ma Triều', icon: '🌋', badge: 'bg-purple-950/40 text-purple-300 border-purple-500/30' },
  lineage_destiny: { label: 'Thân Thế & Long Mạch', icon: '👑', badge: 'bg-yellow-950/40 text-yellow-300 border-yellow-500/30' },
  forbidden_inheritance: { label: 'Truyền Thừa Cấm Kỵ', icon: '📜', badge: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30' },
};

export const SubplotArcsStudio: React.FC<SubplotArcsStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp Cổ Phong',
  onInsertText,
  onCreateChapter
}) => {
  // View mode switcher: Micro-Story Strands vs Medium Subplots vs Narrative Trajectories & Nexus
  const [viewMode, setViewMode] = useState<'micro_strands' | 'medium_subplots' | 'trajectories_nexus'>('micro_strands');

  // Medium Subplots State
  const [arcs, setArcs] = useState<SubplotArcItem[]>(PRESET_SUBPLOT_ARCS);
  const [selectedArcId, setSelectedArcId] = useState<string>(PRESET_SUBPLOT_ARCS[0]?.id || '');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPlantedStage, setFilterPlantedStage] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Micro-Story Strands State (Nhánh Nhỏ Hơn Mạch Chính)
  const [microStrands, setMicroStrands] = useState<MicroStoryStrand[]>(PRESET_MICRO_STORY_STRANDS);
  const [selectedStrandId, setSelectedStrandId] = useState<string>(PRESET_MICRO_STORY_STRANDS[0]?.id || '');
  const [filterMicroCategory, setFilterMicroCategory] = useState<string>('all');
  const [filterMicroScope, setFilterMicroScope] = useState<string>('all');
  const [filterMicroStage, setFilterMicroStage] = useState<string>('all');
  const [searchMicroQuery, setSearchMicroQuery] = useState<string>('');

  // Narrative Trajectories & Branch Convergence State (Phương Hướng Phát Triển & Mạch Nhánh Hợp Lưu)
  const [trajectories] = useState<NarrativeTrajectory[]>(PRESET_NARRATIVE_TRAJECTORIES);
  const [selectedTrajectoryId, setSelectedTrajectoryId] = useState<TrajectoryArchetype>('orthodox_sect');
  const [branchArcs, setBranchArcs] = useState<BranchStoryArc[]>(PRESET_BRANCH_STORY_ARCS);
  const [selectedBranchArcId, setSelectedBranchArcId] = useState<string>(PRESET_BRANCH_STORY_ARCS[0]?.id || '');
  const [selectedBranchArcIdsForConvergence, setSelectedBranchArcIdsForConvergence] = useState<string[]>([
    'arc_branch_sect_rebellion',
    'arc_branch_righteous_sword_sanctum'
  ]);
  const [nexuses] = useState<BranchConvergenceNexus[]>(PRESET_BRANCH_CONVERGENCE_NEXUSES);
  const [selectedNexusId, setSelectedNexusId] = useState<string>(PRESET_BRANCH_CONVERGENCE_NEXUSES[0]?.id || '');
  const [filterBranchDomain, setFilterBranchDomain] = useState<string>('all');
  const [filterBranchInitiatingStage, setFilterBranchInitiatingStage] = useState<string>('all');
  const [searchBranchQuery, setSearchBranchQuery] = useState<string>('');

  // AI Convergence Simulation State
  const [climacticTone, setClimacticTone] = useState<string>('Bi tráng hùng vĩ, cao trào cảm xúc bùng nổ, nghịch cảnh phản sát');
  const [isSimulatingConvergence, setIsSimulatingConvergence] = useState(false);
  const [convergenceResult, setConvergenceResult] = useState<TrajectoryConvergenceSimulationResult | null>(null);

  // Custom Branch Story Arc Generator Modal State
  const [isBranchGenOpen, setIsBranchGenOpen] = useState(false);
  const [branchGenDomain, setBranchGenDomain] = useState<BranchArcDomain>('allied_faction');
  const [branchGenInitiatingStage, setBranchGenInitiatingStage] = useState('spine_stage_1');
  const [branchGenConvergingStage, setBranchGenConvergingStage] = useState('spine_stage_3');
  const [branchGenHook, setBranchGenHook] = useState('Bị thế gia chèn ép nơi ngoại môn, liên minh với các đệ tử nghèo khó thành lập thế lực ngầm');
  const [isBranchGenerating, setIsBranchGenerating] = useState(false);
  const [branchGenResult, setBranchGenResult] = useState<{ arc: BranchStoryArc; narrativeTips: string[] } | null>(null);

  const [copiedTip, setCopiedTip] = useState<string | null>(null);

  // AI Generator Modal state (Subplot)
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [genKeyword, setGenKeyword] = useState('Chiếc nhẫn rỉ sét nhặt được trong hang sói');
  const [genSetting, setGenSetting] = useState('Khu rừng ven biên giới phàm trần');
  const [genPlantedStageId, setGenPlantedStageId] = useState('spine_stage_1');
  const [genPayoffStageId, setGenPayoffStageId] = useState('spine_stage_3');
  const [genProtagonist, setGenProtagonist] = useState(characters[0]?.name || 'Lăng Tiêu');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<SubplotGenerationResult | null>(null);

  // AI Generator Modal state (Micro-Strand)
  const [isMicroGenOpen, setIsMicroGenOpen] = useState(false);
  const [microGenProtagonist, setMicroGenProtagonist] = useState(characters[0]?.name || 'Lâm Tiêu');
  const [microGenCategory, setMicroGenCategory] = useState<MicroArcCategory>('vendetta_local');
  const [microGenScope, setMicroGenScope] = useState<MicroArcScope>('single_scene');
  const [microGenSetting, setMicroGenSetting] = useState('Khu chợ đen ngoại môn / Chân núi Vấn Kiếm');
  const [microGenTrouble, setMicroGenTrouble] = useState('Bị chấp sự ngáng đường khấu trừ đan dược, cần tìm cách phản sát đoạt lại');
  const [microGenStageId, setMicroGenStageId] = useState('spine_stage_1');
  const [isMicroGenerating, setIsMicroGenerating] = useState(false);
  const [microGenResult, setMicroGenResult] = useState<MicroArcGenerationResult | null>(null);

  const selectedArc = arcs.find(a => a.id === selectedArcId) || arcs[0];
  const selectedStrand = microStrands.find(s => s.id === selectedStrandId) || microStrands[0];
  const selectedTrajectory = trajectories.find(t => t.id === selectedTrajectoryId) || trajectories[0];
  const selectedBranchArc = branchArcs.find(b => b.id === selectedBranchArcId) || branchArcs[0];
  const selectedNexus = nexuses.find(n => n.id === selectedNexusId) || nexuses[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTip(label);
    setTimeout(() => setCopiedTip(null), 2500);
  };

  const handleToggleStatus = (id: string) => {
    setArcs(prev => prev.map(a => {
      if (a.id !== id) return a;
      const order: Array<'dormant' | 'planted' | 'growing' | 'paid_off'> = ['dormant', 'planted', 'growing', 'paid_off'];
      const currentIndex = order.indexOf(a.status || 'dormant');
      const nextStatus = order[(currentIndex + 1) % order.length];
      return { ...a, status: nextStatus };
    }));
  };

  const handleRunGenerator = async () => {
    setIsGenerating(true);
    setGeneratedResult(null);
    try {
      const plantedStageObj = PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === genPlantedStageId);
      const payoffStageObj = PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === genPayoffStageId);

      const config: SubplotGenerationConfig = {
        plantedStageId: genPlantedStageId,
        payoffStageId: genPayoffStageId,
        coreKeywordOrItem: genKeyword,
        initialDeceptiveSetting: genSetting,
        genre,
        protagonistName: genProtagonist
      };

      const result = await generateSubplotArc(config);

      if (!result.arc.plantedStageName && plantedStageObj) {
        result.arc.plantedStageName = plantedStageObj.stageName;
      }
      if (!result.arc.payoffStageName && payoffStageObj) {
        result.arc.payoffStageName = payoffStageObj.stageName;
      }

      setGeneratedResult(result);
    } catch (e: any) {
      console.error(e);
      alert('Lỗi tạo nhánh phụ: ' + (e.message || 'Vui lòng thử lại'));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddGeneratedArc = () => {
    if (!generatedResult) return;
    setArcs(prev => [generatedResult.arc, ...prev]);
    setSelectedArcId(generatedResult.arc.id);
    setIsGeneratorOpen(false);
    setGeneratedResult(null);
  };

  // Run AI Generator for Micro-Story Strand
  const handleRunMicroGenerator = async () => {
    setIsMicroGenerating(true);
    setMicroGenResult(null);
    try {
      const config: MicroArcGenerationConfig = {
        protagonistName: microGenProtagonist,
        category: microGenCategory,
        scope: microGenScope,
        localSetting: microGenSetting,
        immediateNeedOrTrouble: microGenTrouble,
        parentSpineStageId: microGenStageId,
        genre
      };

      const result = await generateMicroStoryStrand(config);
      setMicroGenResult(result);
    } catch (e: any) {
      console.error(e);
      alert('Lỗi tạo tiểu mạch: ' + (e.message || 'Vui lòng thử lại'));
    } finally {
      setIsMicroGenerating(false);
    }
  };

  const handleAddGeneratedMicroStrand = () => {
    if (!microGenResult) return;
    setMicroStrands(prev => [microGenResult.strand, ...prev]);
    setSelectedStrandId(microGenResult.strand.id);
    setIsMicroGenOpen(false);
    setMicroGenResult(null);
  };

  const filteredArcs = arcs.filter(arc => {
    if (filterType !== 'all' && arc.foreshadowType !== filterType) return false;
    if (filterPlantedStage !== 'all' && arc.plantedStageId !== filterPlantedStage) return false;
    if (filterStatus !== 'all' && (arc.status || 'dormant') !== filterStatus) return false;
    return true;
  });

  const filteredMicroStrands = microStrands.filter(s => {
    if (filterMicroCategory !== 'all' && s.category !== filterMicroCategory) return false;
    if (filterMicroScope !== 'all' && s.scope !== filterMicroScope) return false;
    if (filterMicroStage !== 'all' && s.parentSpineStageId !== filterMicroStage) return false;
    if (searchMicroQuery.trim()) {
      const q = searchMicroQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.localTrigger.toLowerCase().includes(q) ||
        s.tangibleReward.toLowerCase().includes(q) ||
        s.anchorHookToMainPlot.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handlers for Narrative Trajectories & Branch Convergence
  const handleToggleBranchConvergence = (id: string) => {
    setSelectedBranchArcIdsForConvergence(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRunTrajectoryConvergence = async () => {
    if (selectedBranchArcIdsForConvergence.length === 0) {
      alert('Vui lòng chọn ít nhất 1 mạch nhánh để hợp lưu về Mạch Chính!');
      return;
    }
    setIsSimulatingConvergence(true);
    setConvergenceResult(null);
    try {
      const selectedBranches = branchArcs.filter(b => selectedBranchArcIdsForConvergence.includes(b.id));
      const config: TrajectoryConvergenceSimulationConfig = {
        trajectoryId: selectedTrajectoryId,
        selectedBranchArcIds: selectedBranchArcIdsForConvergence,
        nexusId: selectedNexusId,
        protagonistName: characters[0]?.name || 'Lâm Tiêu',
        climacticTone,
        genre
      };
      const res = await simulateTrajectoryConvergence(config, selectedTrajectory.name, selectedBranches, selectedNexus);
      setConvergenceResult(res);
    } catch (e: any) {
      console.error(e);
      alert('Lỗi kích hoạt hợp lưu: ' + (e.message || 'Vui lòng thử lại'));
    } finally {
      setIsSimulatingConvergence(false);
    }
  };

  const handleRunBranchGenerator = async () => {
    setIsBranchGenerating(true);
    setBranchGenResult(null);
    try {
      const res = await generateBranchStoryArc({
        trajectoryId: selectedTrajectoryId,
        trajectoryName: selectedTrajectory.name,
        domain: branchGenDomain,
        initiatingStageId: branchGenInitiatingStage,
        convergingStageId: branchGenConvergingStage,
        narrativeHook: branchGenHook,
        genre,
        protagonistName: characters[0]?.name || 'Lâm Tiêu'
      });
      setBranchGenResult(res);
    } catch (e: any) {
      console.error(e);
      alert('Lỗi tạo mạch nhánh: ' + (e.message || 'Vui lòng thử lại'));
    } finally {
      setIsBranchGenerating(false);
    }
  };

  const handleAddGeneratedBranchArc = () => {
    if (!branchGenResult) return;
    setBranchArcs(prev => [branchGenResult.arc, ...prev]);
    setSelectedBranchArcId(branchGenResult.arc.id);
    if (!selectedBranchArcIdsForConvergence.includes(branchGenResult.arc.id)) {
      setSelectedBranchArcIdsForConvergence(prev => [...prev, branchGenResult.arc.id]);
    }
    setIsBranchGenOpen(false);
    setBranchGenResult(null);
  };

  const filteredBranchArcs = branchArcs.filter(b => {
    if (b.trajectoryId !== selectedTrajectoryId) return false;
    if (filterBranchDomain !== 'all' && b.domain !== filterBranchDomain) return false;
    if (filterBranchInitiatingStage !== 'all' && b.initiatingStageId !== filterBranchInitiatingStage) return false;
    if (searchBranchQuery.trim()) {
      const q = searchBranchQuery.toLowerCase();
      return (
        b.title.toLowerCase().includes(q) ||
        b.narrativeHook.toLowerCase().includes(q) ||
        b.convergencePointDescription.toLowerCase().includes(q) ||
        b.catalystRewardOrStakes.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-gray-950 text-gray-100 overflow-hidden font-sans">
      {/* Header Banner */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-gray-900 via-indigo-950/70 to-purple-950/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <h2 className="text-base font-bold bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Hệ Thống Phân Nhánh Mạch Truyện & Phương Hướng Phát Triển
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Cấu Trúc Đa Tầng
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Các phương hướng phát triển chiến lược, các mạch nhánh độc lập và cơ chế hợp lưu bùng nổ ngược về cốt truyện chính
          </p>
        </div>

        {/* Action Controls & AI Generator Buttons */}
        <div className="flex items-center gap-2">
          {viewMode === 'micro_strands' ? (
            <button
              onClick={() => setIsMicroGenOpen(true)}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-950/50 border border-emerald-400/30 transition-all hover:scale-[1.02]"
            >
              <span>⚡</span> Tạo Tiểu Mạch Mới Bằng AI
            </button>
          ) : viewMode === 'medium_subplots' ? (
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-950/50 border border-purple-400/30 transition-all hover:scale-[1.02]"
            >
              <span>✨</span> Tạo Nhánh Phụ Mới Bằng AI
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBranchGenOpen(true)}
                className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-amber-950/50 border border-amber-400/30 transition-all hover:scale-[1.02]"
              >
                <span>➕</span> Thêm Mạch Nhánh Mới (AI)
              </button>
              <button
                onClick={handleRunTrajectoryConvergence}
                disabled={isSimulatingConvergence}
                className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-950/60 border border-pink-400/30 transition-all hover:scale-[1.03] disabled:opacity-50"
              >
                {isSimulatingConvergence ? (
                  <>
                    <Spinner />
                    <span>Đang Hợp Lưu...</span>
                  </>
                ) : (
                  <>
                    <span>🌌</span>
                    <span>Kích Hoạt Hợp Lưu Về Mạch Chính</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="px-4 pt-2 bg-gray-900/90 border-b border-white/10 flex items-center gap-2 text-xs shrink-0 overflow-x-auto">
        <button
          onClick={() => setViewMode('trajectories_nexus')}
          className={`px-4 py-2 rounded-t-lg font-bold flex items-center gap-2 transition-all border-t border-x shrink-0 ${
            viewMode === 'trajectories_nexus'
              ? 'bg-gray-950 text-amber-300 border-amber-500/50 border-b-transparent shadow'
              : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
          }`}
        >
          <span>🗺️</span>
          <span>Phương Hướng Phát Triển & Mạch Nhánh Hợp Lưu</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono">
            {branchArcs.length}
          </span>
        </button>

        <button
          onClick={() => setViewMode('micro_strands')}
          className={`px-4 py-2 rounded-t-lg font-bold flex items-center gap-2 transition-all border-t border-x shrink-0 ${
            viewMode === 'micro_strands'
              ? 'bg-gray-950 text-emerald-300 border-emerald-500/50 border-b-transparent shadow'
              : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
          }`}
        >
          <span>🌿</span>
          <span>Tiểu Mạch Truyện Vi Mô (1–3 Hồi)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
            {microStrands.length}
          </span>
        </button>

        <button
          onClick={() => setViewMode('medium_subplots')}
          className={`px-4 py-2 rounded-t-lg font-bold flex items-center gap-2 transition-all border-t border-x shrink-0 ${
            viewMode === 'medium_subplots'
              ? 'bg-gray-950 text-indigo-300 border-indigo-500/50 border-b-transparent shadow'
              : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
          }`}
        >
          <span>🧶</span>
          <span>Nhánh Mạch Chuyện Phụ (Subplots Tầm Trung)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
            {arcs.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: MICRO-STORY STRANDS (NHÁNH NHỎ HƠN MẠCH CHÍNH) */}
      {/* ========================================================================= */}
      {viewMode === 'micro_strands' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Stats & Filter Bar for Micro Strands */}
          <div className="px-4 py-2.5 bg-gray-900/70 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm tiểu mạch..."
                  value={searchMicroQuery}
                  onChange={e => setSearchMicroQuery(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-md pl-7 pr-2 py-1 text-gray-200 text-xs w-44 focus:outline-none focus:border-emerald-500"
                />
                <span className="absolute left-2 top-1.5 text-gray-400 text-xs">🔍</span>
              </div>

              <select
                value={filterMicroCategory}
                onChange={e => setFilterMicroCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả thể loại vi mạch</option>
                {Object.entries(MICRO_CATEGORY_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>

              <select
                value={filterMicroScope}
                onChange={e => setFilterMicroScope(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả quy mô độ dài</option>
                {Object.entries(SCOPE_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>

              <select
                value={filterMicroStage}
                onChange={e => setFilterMicroStage(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-200 text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả cảnh giới liên kết</option>
                {PRESET_MASTER_CULTIVATION_SPINE.map(s => (
                  <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-gray-400 font-mono text-[11px]">
              <span>Hiển thị: <strong className="text-emerald-400">{filteredMicroStrands.length}</strong> / {microStrands.length} tiểu mạch</span>
            </div>
          </div>

          {/* Micro Strands Split Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Micro Strands List */}
            <div className="w-80 md:w-96 border-r border-white/10 bg-gray-900/40 flex flex-col shrink-0 overflow-y-auto p-3 space-y-2.5">
              {filteredMicroStrands.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  Không tìm thấy tiểu mạch truyện phù hợp.
                </div>
              ) : (
                filteredMicroStrands.map(strand => {
                  const catCfg = MICRO_CATEGORY_CONFIG[strand.category] || MICRO_CATEGORY_CONFIG.vendetta_local;
                  const isSelected = strand.id === selectedStrand.id;
                  const parentStage = PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === strand.parentSpineStageId);

                  return (
                    <div
                      key={strand.id}
                      onClick={() => setSelectedStrandId(strand.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-950/70 via-gray-900 to-gray-900 border-emerald-500/70 shadow-md ring-1 ring-emerald-400/40'
                          : 'bg-gray-900/60 border-white/5 hover:border-white/20 hover:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catCfg.badgeBg} flex items-center gap-1`}>
                          <span>{catCfg.icon}</span>
                          <span>{catCfg.label.split('/')[0]}</span>
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {strand.scope === 'single_scene' ? '1 Cảnh' : strand.scope === 'short_episode' ? '1 Chương' : '2-3 Chương'}
                        </span>
                      </div>

                      <h3 className={`font-bold text-sm mb-1.5 line-clamp-1 ${isSelected ? 'text-emerald-200' : 'text-gray-200'}`}>
                        {strand.title}
                      </h3>

                      <p className="text-gray-400 text-[11px] line-clamp-2 mb-2 leading-relaxed italic">
                        🎯 {strand.localTrigger}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-white/5">
                        <span className="text-amber-400 font-semibold truncate max-w-[170px]">
                          💎 {strand.tangibleReward}
                        </span>
                        {parentStage && (
                          <span className="text-indigo-300 font-mono shrink-0">
                            Cấp {parentStage.stageOrder}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Micro Strand Inspector */}
            {selectedStrand && (
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950">
                {/* Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-gray-900 border border-emerald-500/40 shadow-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{MICRO_CATEGORY_CONFIG[selectedStrand.category]?.icon || '🌿'}</span>
                      <h2 className="text-lg font-bold text-white">
                        {selectedStrand.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${SCOPE_CONFIG[selectedStrand.scope]?.badge || ''}`}>
                        {SCOPE_CONFIG[selectedStrand.scope]?.label || selectedStrand.scope}
                      </span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${MICRO_CATEGORY_CONFIG[selectedStrand.category]?.badgeBg || ''}`}>
                        {MICRO_CATEGORY_CONFIG[selectedStrand.category]?.label || selectedStrand.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 pt-1 border-t border-white/10">
                    <span>👤 Nhân vật tương tác: <strong className="text-amber-300">{selectedStrand.associatedNpcName}</strong></span>
                    {selectedStrand.parentSpineStageId && (
                      <span>🌀 Cảnh giới liên kết: <strong className="text-indigo-300">
                        {PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === selectedStrand.parentSpineStageId)?.stageName || selectedStrand.parentSpineStageId}
                      </strong></span>
                    )}
                  </div>
                </div>

                {/* 4 Pillars Grid: Trigger, Obstacle, Resolution, Reward */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Local Trigger & Motivation */}
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <span>🎯</span>
                      <span>1. Cơ Duyên Kích Hoạt & Động Cơ Trước Mắt:</span>
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {selectedStrand.localTrigger}
                    </p>
                    <div className="pt-2 border-t border-white/5 text-[11px] text-gray-400">
                      <strong className="text-emerald-300">Nhu cầu cấp bách:</strong> {selectedStrand.protagonistMotivation}
                    </div>
                  </div>

                  {/* Immediate Obstacle */}
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-red-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase tracking-wider">
                      <span>🚧</span>
                      <span>2. Chướng Ngại / Tiểu Nhân Ngáng Đường:</span>
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      {selectedStrand.immediateObstacle}
                    </p>
                  </div>

                  {/* Tactical Resolution */}
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-cyan-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                      <span>💡</span>
                      <span>3. Biện Pháp Xử Lý Sắc Bén Của Main:</span>
                    </div>
                    <p className="text-xs text-cyan-100/90 leading-relaxed">
                      {selectedStrand.tacticalResolution}
                    </p>
                  </div>

                  {/* Tangible Reward */}
                  <div className="p-4 rounded-xl bg-gray-900/90 border border-amber-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <span>💎</span>
                      <span>4. Chiến Lợi Phẩm Hữu Hình Đạt Được:</span>
                    </div>
                    <p className="text-xs text-amber-200 font-semibold leading-relaxed">
                      {selectedStrand.tangibleReward}
                    </p>
                  </div>
                </div>

                {/* Anchor Hook to Main Plot (Grand Link) */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-gray-900 border border-indigo-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                    <span>⚓</span>
                    <span>ĐIỂM NEO KẾT NỐI NGƯỢC VỀ MẠCH CHÍNH (ANCHOR HOOK TO GRAND SPINE):</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    {selectedStrand.anchorHookToMainPlot}
                  </p>
                </div>

                {/* Narrative Beats Timeline (3-4 Steps) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <span>🎬</span>
                    <span>Cấu Trúc Các Nhịp Kịch Bản Cục Bộ (Episodic Beats Timeline)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedStrand.beats.map(beat => (
                      <div key={beat.beatOrder} className="p-3.5 rounded-xl bg-gray-900/80 border border-white/10 space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                            <span className="font-mono px-1.5 py-0.5 rounded bg-gray-800 text-emerald-400 font-bold">
                              Nhịp {beat.beatOrder}
                            </span>
                            <span className="italic text-gray-500">
                              {beat.narrativeFunction === 'inciting_incident' ? 'Khởi Phát' : beat.narrativeFunction === 'rising_friction' ? 'Cao Trào Cục Bộ' : 'Giải Quyết'}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-amber-200 mb-1">
                            {beat.beatTitle}
                          </h4>
                          <p className="text-[11px] text-gray-300 leading-relaxed">
                            {beat.sceneSummary}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/5">
                          <p className="text-[11px] text-gray-400 italic line-clamp-3 font-serif">
                            "{beat.sceneDraftSnippet}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ready to Insert Prose Snippet */}
                <div className="p-4 rounded-2xl bg-gray-900/90 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        📜 Đoạn Văn Mẫu Sẵn Sàng Chèn Vào Bản Thảo
                      </span>
                      <span className="text-[10px] text-gray-400">
                        (~300-450 chữ)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(selectedStrand.readyToInsertProseSnippet, 'copied_strand_prose')}
                        className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded text-xs flex items-center gap-1 transition-all"
                      >
                        {copiedTip === 'copied_strand_prose' ? '✓ Đã Chép' : '📋 Chép Đoạn Văn'}
                      </button>

                      <button
                        onClick={() => {
                          onInsertText(`\n\n### ${selectedStrand.title}\n${selectedStrand.readyToInsertProseSnippet}\n`);
                          alert('Đã chèn tiểu mạch truyện vào bản thảo thành công!');
                        }}
                        className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded text-xs font-bold shadow flex items-center gap-1 transition-all"
                      >
                        <span>📝</span> Chèn Vào Trình Soạn Thảo
                      </button>

                      {onCreateChapter && (
                        <button
                          onClick={() => {
                            onCreateChapter(
                              selectedStrand.title,
                              selectedStrand.readyToInsertProseSnippet,
                              `Tiểu mạch cục bộ: ${selectedStrand.localTrigger} - Đạt được: ${selectedStrand.tangibleReward}`
                            );
                            alert('Đã tạo thành một chương mới!');
                          }}
                          className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-bold shadow flex items-center gap-1 transition-all"
                        >
                          <span>📖</span> Tạo Chương Mới
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-serif whitespace-pre-line italic bg-black/40 p-4 rounded-xl border border-white/5">
                    {selectedStrand.readyToInsertProseSnippet}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: MEDIUM SUBPLOTS (NHÁNH PHỤ TẦM TRUNG & PHỤC BÚT ĐAN CÀI) */}
      {/* ========================================================================= */}
      {viewMode === 'medium_subplots' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Stats & Filter Bar for Subplots */}
          <div className="px-4 py-2.5 bg-gray-900/80 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-gray-400 font-medium shrink-0">Lọc theo:</span>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="all">Tất cả thể loại phục bút</option>
                {Object.entries(TYPE_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.icon} {v.label}</option>
                ))}
              </select>

              <select
                value={filterPlantedStage}
                onChange={e => setFilterPlantedStage(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="all">Tất cả tầng gieo hạt</option>
                {PRESET_MASTER_CULTIVATION_SPINE.map(s => (
                  <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-200 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="all">Tất cả trạng thái</option>
                {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3 text-gray-400 font-mono text-[11px]">
              <span>Tổng số: <strong className="text-amber-400">{arcs.length}</strong> nhánh</span>
              <span>•</span>
              <span>Đã gieo mầm: <strong className="text-emerald-400">{arcs.filter(a => a.status === 'planted' || a.status === 'growing').length}</strong></span>
              <span>•</span>
              <span>Đã thu hoạch: <strong className="text-indigo-400">{arcs.filter(a => a.status === 'paid_off').length}</strong></span>
            </div>
          </div>

          {/* Subplots Split Layout */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Arc List */}
            <div className="w-80 md:w-96 border-r border-white/10 bg-gray-900/40 flex flex-col shrink-0 overflow-y-auto p-3 space-y-2.5">
              {filteredArcs.length === 0 ? (
                <div className="p-8 text-center text-gray-500 text-xs">
                  Không tìm thấy nhánh phụ phù hợp với bộ lọc.
                </div>
              ) : (
                filteredArcs.map(arc => {
                  const typeCfg = TYPE_CONFIG[arc.foreshadowType] || TYPE_CONFIG.relic_token;
                  const statusCfg = STATUS_CONFIG[arc.status || 'dormant'] || STATUS_CONFIG.dormant;
                  const isSelected = arc.id === selectedArc.id;

                  return (
                    <div
                      key={arc.id}
                      onClick={() => setSelectedArcId(arc.id)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-950/70 via-gray-900 to-gray-900 border-purple-500/70 shadow-md ring-1 ring-purple-400/40'
                          : 'bg-gray-900/60 border-white/5 hover:border-white/20 hover:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${typeCfg.badgeBg} flex items-center gap-1`}>
                          <span>{typeCfg.icon}</span>
                          <span>{typeCfg.label}</span>
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(arc.id);
                          }}
                          className={`text-[10px] px-2 py-0.5 rounded border transition-all ${statusCfg.badge}`}
                          title="Click để đổi trạng thái"
                        >
                          {statusCfg.label}
                        </button>
                      </div>

                      <h3 className={`font-bold text-sm mb-1.5 line-clamp-1 ${isSelected ? 'text-amber-200' : 'text-gray-200'}`}>
                        {arc.title}
                      </h3>

                      <p className="text-gray-400 text-[11px] line-clamp-2 mb-2 leading-relaxed italic">
                        🎭 {arc.deceptiveFacade}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1.5 border-t border-white/5">
                        <span className="text-indigo-400 font-semibold truncate max-w-[140px]">
                          🌱 {arc.plantedStageName.split('(')[0]}
                        </span>
                        <span>➔</span>
                        <span className="text-emerald-400 font-semibold truncate max-w-[140px]">
                          💥 {arc.payoffStageName.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Subplot Inspector */}
            {selectedArc && (
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5 bg-gradient-to-b from-gray-950 via-gray-900/30 to-gray-950">
                {/* Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-gray-900 border border-purple-500/40 shadow-xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{TYPE_CONFIG[selectedArc.foreshadowType]?.icon || '📜'}</span>
                      <h2 className="text-lg font-bold text-white">
                        {selectedArc.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${TYPE_CONFIG[selectedArc.foreshadowType]?.badgeBg || ''}`}>
                        {TYPE_CONFIG[selectedArc.foreshadowType]?.label || selectedArc.foreshadowType}
                      </span>
                      <button
                        onClick={() => handleToggleStatus(selectedArc.id)}
                        className={`text-xs px-3 py-0.5 rounded-full border font-bold ${STATUS_CONFIG[selectedArc.status || 'dormant']?.badge || ''}`}
                      >
                        {STATUS_CONFIG[selectedArc.status || 'dormant']?.label} (Đổi)
                      </button>
                    </div>
                  </div>

                  {/* Cultivation Bridge */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
                      <div>
                        <span className="text-gray-400 text-[10px] block">GIAI ĐOẠN GIEO MẦM (SEED)</span>
                        <strong className="text-indigo-300">{selectedArc.plantedStageName}</strong>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center text-gray-500">
                      <span>━━━━━ Nuôi dưỡng phục bút ━━━━━➔</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <div>
                        <span className="text-gray-400 text-[10px] block">GIAI ĐOẠN THU HOẠCH (PAYOFF)</span>
                        <strong className="text-emerald-300">{selectedArc.payoffStageName}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-amber-500/20 space-y-1.5">
                    <span className="text-amber-400 font-bold uppercase tracking-wider block text-[11px]">
                      🎭 1. Vỏ Bọc Tầm Thường (Facade):
                    </span>
                    <p className="text-gray-300 leading-relaxed italic">
                      "{selectedArc.deceptiveFacade}"
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-purple-500/20 space-y-1.5">
                    <span className="text-purple-400 font-bold uppercase tracking-wider block text-[11px]">
                      🗝️ 2. Dữ Kiện Ngầm Cốt Lõi (Core Clue):
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedArc.coreClueDetail}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-emerald-500/20 space-y-1.5">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[11px]">
                      ⚡ 3. Xúc Tác Mạch Chính (Grand Catalyst):
                    </span>
                    <p className="text-emerald-200/90 leading-relaxed">
                      {selectedArc.mainPlotCatalystEffect}
                    </p>
                  </div>
                </div>

                {/* Associated Entities */}
                {selectedArc.associatedCharactersOrFactions && (
                  <div className="p-3 rounded-xl bg-gray-900/50 border border-white/5 flex items-center gap-2 text-xs">
                    <span className="text-gray-400 font-medium shrink-0">👥 Thực thể liên đới:</span>
                    <span className="text-indigo-300 font-semibold">{selectedArc.associatedCharactersOrFactions}</span>
                  </div>
                )}

                {/* Scene Snippets */}
                <div className="space-y-4">
                  {/* Seed snippet */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-400 font-bold text-xs">🌱 Phân Cảnh Gieo Mầm Mẫu:</span>
                        <span className="text-[10px] text-gray-400">({selectedArc.plantedStageName.split('(')[0]})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(selectedArc.seedScenePromptSnippet, 'seed_copied')}
                          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-[11px] transition-all"
                        >
                          {copiedTip === 'seed_copied' ? '✓ Đã chép' : '📋 Sao chép'}
                        </button>
                        <button
                          onClick={() => {
                            onInsertText(`\n\n[Nhánh Phụ: ${selectedArc.title} - Phân Cảnh Gieo Mầm]\n${selectedArc.seedScenePromptSnippet}\n`);
                            alert('Đã chèn phân cảnh gieo mầm vào chương truyện!');
                          }}
                          className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-bold transition-all"
                        >
                          1-Click Chèn Vào Truyện
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-serif italic bg-black/30 p-3 rounded-lg border border-white/5">
                      {selectedArc.seedScenePromptSnippet}
                    </p>
                  </div>

                  {/* Payoff snippet */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold text-xs">💥 Phân Cảnh Bùng Nổ Nhân Quả Mẫu:</span>
                        <span className="text-[10px] text-gray-400">({selectedArc.payoffStageName.split('(')[0]})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(selectedArc.payoffScenePromptSnippet, 'payoff_copied')}
                          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-[11px] transition-all"
                        >
                          {copiedTip === 'payoff_copied' ? '✓ Đã chép' : '📋 Sao chép'}
                        </button>
                        <button
                          onClick={() => {
                            onInsertText(`\n\n[Nhánh Phụ: ${selectedArc.title} - Phân Cảnh Bùng Nổ Nhân Quả]\n${selectedArc.payoffScenePromptSnippet}\n`);
                            alert('Đã chèn phân cảnh bùng nổ vào chương truyện!');
                          }}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] font-bold transition-all"
                        >
                          1-Click Chèn Vào Truyện
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed font-serif italic bg-black/30 p-3 rounded-lg border border-white/5">
                      {selectedArc.payoffScenePromptSnippet}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 3: NARRATIVE TRAJECTORIES & BRANCH CONVERGENCE NEXUS (PHƯƠNG HƯỚNG PHÁT TRIỂN & MẠCH NHÁNH HỢP LƯU) */}
      {/* ========================================================================= */}
      {viewMode === 'trajectories_nexus' && (
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar p-4 space-y-6">
          {/* Section 1: Trajectory Archetype Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🗺️</span>
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  1. Chọn Phương Hướng Phát Triển Chủ Đạo (Narrative Trajectories)
                </h3>
              </div>
              <span className="text-xs text-gray-400">
                Định hình triết lý tu luyện, mâu thuẫn trung tâm và phong cách của nhân vật chính
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {trajectories.map(traj => {
                const isSelected = traj.id === selectedTrajectoryId;
                return (
                  <div
                    key={traj.id}
                    onClick={() => {
                      setSelectedTrajectoryId(traj.id);
                      const relatedArc = branchArcs.find(b => b.trajectoryId === traj.id);
                      if (relatedArc) {
                        setSelectedBranchArcId(relatedArc.id);
                        if (!selectedBranchArcIdsForConvergence.includes(relatedArc.id)) {
                          setSelectedBranchArcIdsForConvergence([relatedArc.id]);
                        }
                      }
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? `bg-gray-900/90 ${traj.colorScheme.border} ring-2 ring-amber-400/40 shadow-xl`
                        : 'bg-gray-900/40 border-white/5 hover:border-white/20 hover:bg-gray-900/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{traj.icon}</span>
                          <div>
                            <h4 className={`text-xs font-bold ${traj.colorScheme.primary}`}>
                              {traj.name}
                            </h4>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {traj.badgeTitle}
                            </span>
                          </div>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                            Đang Chọn
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                        {traj.cultivationPhilosophy}
                      </p>

                      <div className="text-[10px] text-gray-400 space-y-0.5 bg-black/30 p-2 rounded-lg border border-white/5">
                        <div className="text-gray-300 font-medium">🎭 Khuôn mẫu: <span className="text-amber-200/90">{traj.protagonistArchetype}</span></div>
                        <div className="text-gray-400">⚔️ Xung đột: {traj.coreConflicts[0]}</div>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                      <span className="text-gray-400">
                        {branchArcs.filter(b => b.trajectoryId === traj.id).length} Mạch nhánh liên kết
                      </span>
                      <span className={`font-semibold ${isSelected ? 'text-amber-300' : 'text-gray-400'}`}>
                        {isSelected ? '✓ Đang kích hoạt' : 'Bấm để kích hoạt →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Milestone Roadmap along Master Cultivation Spine */}
          <div className="p-4 rounded-2xl bg-gray-900/70 border border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedTrajectory.icon}</span>
                <h4 className="text-xs font-bold text-amber-200">
                  Lộ Trình Cột Mốc Phương Hướng: <span className="text-white">{selectedTrajectory.name}</span>
                </h4>
              </div>
              <span className="text-[11px] text-gray-400">
                Neo theo 5 cảnh giới cốt lõi của Tuyến Mạch Cảnh Giới
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {selectedTrajectory.milestones.map((m, idx) => {
                const spineStage = PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === m.stageId);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gray-950/70 border border-white/5 flex flex-col justify-between space-y-2 hover:border-amber-500/30 transition-all text-xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 font-bold">
                          Cấp {idx + 1}: {spineStage?.stageName.split('(')[0] || `Tầng ${idx + 1}`}
                        </span>
                      </div>
                      <h5 className="font-bold text-gray-200 text-[11px] leading-tight">
                        {m.milestoneTitle}
                      </h5>
                      <p className="text-[10px] text-gray-400 italic leading-snug">
                        ⚡ <strong>Nan giải:</strong> {m.narrativeDilemma}
                      </p>
                    </div>

                    <div className="p-2 rounded bg-amber-950/20 border border-amber-500/20 text-[10px] space-y-1">
                      <div className="text-amber-200 font-medium">🎁 <strong>Kết quả:</strong> {m.chosenDirectionPayoff}</div>
                      <div className="text-emerald-300">🔓 <strong>Mở khóa:</strong> {m.unlockedPowerOrFaction}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Split Pane for Branch Story Arcs (Left) and Detail + Convergence Engine (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Column: Branch Story Arcs List (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-3 rounded-xl bg-gray-900/80 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">🌿</span>
                    <h4 className="font-bold text-gray-200 text-xs">
                      Mạch Nhánh Độc Lập ({filteredBranchArcs.length})
                    </h4>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    Đã chọn hợp lưu: <strong className="text-pink-400">{selectedBranchArcIdsForConvergence.length}</strong>
                  </span>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <select
                    value={filterBranchDomain}
                    onChange={e => setFilterBranchDomain(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Tất cả lĩnh vực nhánh</option>
                    {Object.entries(BRANCH_DOMAIN_CONFIG).map(([k, v]) => (
                      <option key={k} value={k}>{v.icon} {v.label}</option>
                    ))}
                  </select>

                  <select
                    value={filterBranchInitiatingStage}
                    onChange={e => setFilterBranchInitiatingStage(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Tất cả cảnh giới khởi phát</option>
                    {PRESET_MASTER_CULTIVATION_SPINE.slice(0, 5).map(s => (
                      <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Tìm kiếm mạch nhánh..."
                    value={searchBranchQuery}
                    onChange={e => setSearchBranchQuery(e.target.value)}
                    className="w-full bg-gray-800/80 border border-gray-700 rounded pl-7 pr-2 py-1 text-gray-200 text-[11px] focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute left-2 top-1.5 text-gray-400 text-xs">🔍</span>
                </div>
              </div>

              {/* Branch Cards List */}
              <div className="space-y-2.5 max-h-[750px] overflow-y-auto custom-scrollbar pr-1">
                {filteredBranchArcs.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl text-xs space-y-2">
                    <p>Chưa có mạch nhánh nào thỏa bộ lọc.</p>
                    <button
                      onClick={() => setIsBranchGenOpen(true)}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-xs font-semibold"
                    >
                      + Tạo Mạch Nhánh Mới Ngay
                    </button>
                  </div>
                ) : (
                  filteredBranchArcs.map(branch => {
                    const isSelected = branch.id === selectedBranchArcId;
                    const isCheckedForConvergence = selectedBranchArcIdsForConvergence.includes(branch.id);
                    const domainCfg = BRANCH_DOMAIN_CONFIG[branch.domain] || BRANCH_DOMAIN_CONFIG.allied_faction;
                    const initStage = PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === branch.initiatingStageId);
                    const convStage = PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === branch.convergingStageId);

                    return (
                      <div
                        key={branch.id}
                        onClick={() => setSelectedBranchArcId(branch.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer space-y-2 ${
                          isSelected
                            ? 'bg-gray-900 border-amber-500/60 ring-1 ring-amber-400/30 shadow-md'
                            : 'bg-gray-900/40 border-white/5 hover:border-white/15 hover:bg-gray-900/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isCheckedForConvergence}
                              onChange={e => {
                                e.stopPropagation();
                                handleToggleBranchConvergence(branch.id);
                              }}
                              className="rounded border-gray-700 bg-gray-800 text-amber-500 focus:ring-0 cursor-pointer w-4 h-4"
                              title="Tích chọn để cùng hợp lưu về Mạch Chính"
                            />
                            <h5 className="font-bold text-gray-200 text-xs hover:text-amber-300">
                              {branch.title}
                            </h5>
                          </div>

                          <span className={`text-[10px] px-2 py-0.5 rounded-full border whitespace-nowrap ${domainCfg.badge}`}>
                            {domainCfg.icon} {domainCfg.label.split('&')[0]}
                          </span>
                        </div>

                        <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                          {branch.narrativeHook}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-white/5 pt-2">
                          <div className="flex items-center gap-1 font-mono">
                            <span className="text-amber-300/80">{initStage?.stageName.split('(')[0] || 'Khởi'}</span>
                            <span>➔</span>
                            <span className="text-emerald-300/90 font-bold">{convStage?.stageName.split('(')[0] || 'Hội Tụ'}</span>
                          </div>

                          <span className="text-gray-400">
                            {branch.progressionPhases?.length || 3} Giai đoạn
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Selected Arc Details & Multi-Branch Convergence Engine (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Card 1: Selected Branch Arc Details */}
              {selectedBranchArc && (
                <div className="p-4 rounded-2xl bg-gray-900/90 border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌿</span>
                        <h4 className="text-sm font-bold text-amber-200">
                          {selectedBranchArc.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded text-[10px] border ${BRANCH_DOMAIN_CONFIG[selectedBranchArc.domain]?.badge || 'text-gray-300'}`}>
                          {BRANCH_DOMAIN_CONFIG[selectedBranchArc.domain]?.icon} {BRANCH_DOMAIN_CONFIG[selectedBranchArc.domain]?.label}
                        </span>
                        <span className="text-gray-400 font-mono text-[11px]">
                          Khởi phát: <strong>{PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === selectedBranchArc.initiatingStageId)?.stageName.split('(')[0]}</strong> ➔ Hợp lưu: <strong>{PRESET_MASTER_CULTIVATION_SPINE.find(s => s.id === selectedBranchArc.convergingStageId)?.stageName.split('(')[0]}</strong>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleBranchConvergence(selectedBranchArc.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                        selectedBranchArcIdsForConvergence.includes(selectedBranchArc.id)
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                          : 'bg-gray-800 text-gray-300 border-gray-700 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      <span>{selectedBranchArcIdsForConvergence.includes(selectedBranchArc.id) ? '✓ Đang Trong Hàng Đợi Hợp Lưu' : '+ Chọn Để Hợp Lưu'}</span>
                    </button>
                  </div>

                  {/* Hook */}
                  <div className="p-3 rounded-xl bg-gray-950/70 border border-white/5 space-y-1 text-xs">
                    <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] block">
                      ⚡ Điểm Khởi Sinh Mạch Nhánh (Narrative Hook):
                    </span>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedBranchArc.narrativeHook}
                    </p>
                  </div>

                  {/* 3 Progression Phases */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-300 block uppercase tracking-wider">
                      🌊 3 Giai Đoạn Phát Triển Độc Lập Của Nhánh:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      {selectedBranchArc.progressionPhases.map((phase, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-gray-950/90 border border-white/5 space-y-1 text-xs"
                        >
                          <div className="flex items-center gap-1.5 text-indigo-300 font-bold text-[11px]">
                            <span>Hồi {phase.phaseOrder}:</span>
                            <span>{phase.phaseTitle}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            {phase.eventsSummary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Convergence Point & Stakes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                      <span className="text-purple-300 font-bold block text-[10px] uppercase">
                        🎯 Điểm Hợp Lưu Đâm Vào Mạch Chính:
                      </span>
                      <p className="text-gray-300 text-[11px] leading-relaxed">
                        {selectedBranchArc.convergencePointDescription}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                      <span className="text-emerald-300 font-bold block text-[10px] uppercase">
                        🎁 Chiến Lợi Phẩm / Cái Giá Khi Hội Tụ:
                      </span>
                      <p className="text-emerald-200/90 text-[11px] leading-relaxed">
                        {selectedBranchArc.catalystRewardOrStakes}
                      </p>
                    </div>
                  </div>

                  {/* Sample Prose Snippet */}
                  <div className="p-3.5 rounded-xl bg-gray-950 border border-indigo-500/30 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                      <span className="text-indigo-300 font-bold">
                        📜 Đoạn Văn Mẫu Khi Giao Cắt Với Mạch Chính:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(selectedBranchArc.sampleProseSnippet, 'branch_copied')}
                          className="px-2 py-0.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-[10px] transition-all"
                        >
                          {copiedTip === 'branch_copied' ? '✓ Đã chép' : '📋 Sao chép'}
                        </button>
                        <button
                          onClick={() => {
                            onInsertText(`\n\n[Mạch Nhánh: ${selectedBranchArc.title} - Giao Cắt Mạch Chính]\n${selectedBranchArc.sampleProseSnippet}\n`);
                            alert('Đã chèn trích đoạn mạch nhánh vào bản thảo!');
                          }}
                          className="px-2.5 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold transition-all"
                        >
                          1-Click Chèn
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-300 font-serif italic leading-relaxed">
                      "{selectedBranchArc.sampleProseSnippet}"
                    </p>
                  </div>
                </div>
              )}

              {/* Card 2: CONVERGENCE NEXUS & MULTI-BRANCH SYNCHRONIZATION ENGINE */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-950 border border-purple-500/40 shadow-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl animate-pulse">🌌</span>
                    <div>
                      <h4 className="text-sm font-bold bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                        Trung Tâm Hợp Lưu Mạch Nhánh & Tạo Cao Trào Hội Tụ
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        Xâu chuỗi các mạch nhánh rời rạc thành bước ngoặt chấn động thúc đẩy Mạch Chính đột phá cảnh giới
                      </p>
                    </div>
                  </div>
                </div>

                {/* Configuration Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-300 font-bold block text-[11px]">
                      🎯 Điểm Giao Thoa Mạch Truyện (Convergence Nexus):
                    </label>
                    <select
                      value={selectedNexusId}
                      onChange={e => setSelectedNexusId(e.target.value)}
                      className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-2.5 py-1.5 text-amber-200 text-xs focus:outline-none focus:border-purple-400"
                    >
                      {nexuses.map(n => (
                        <option key={n.id} value={n.id}>
                          {n.targetSpineStageTitle.split('•')[0]} — {n.nexusName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-bold block text-[11px]">
                      🎭 Tông Giọng Cao Trào (Climactic Tone):
                    </label>
                    <input
                      type="text"
                      value={climacticTone}
                      onChange={e => setClimacticTone(e.target.value)}
                      className="w-full bg-gray-800 border border-purple-500/30 rounded-lg px-2.5 py-1.5 text-gray-200 text-xs focus:outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                {/* Nexus Details Banner */}
                {selectedNexus && (
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-purple-300 font-bold">
                      <span>⚡ Đại biến cố: {selectedNexus.macroCosmicEvent}</span>
                      <span className="text-[10px] text-amber-300 font-mono">({selectedNexus.targetSpineStageTitle})</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {selectedNexus.convergingBranchesSummary}
                    </p>
                  </div>
                )}

                {/* Selected Branches Chips */}
                <div className="space-y-1.5 text-xs">
                  <span className="text-gray-300 font-semibold block text-[11px]">
                    🌾 Các mạch nhánh sẽ được hợp lưu ({selectedBranchArcIdsForConvergence.length} nhánh):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedBranchArcIdsForConvergence.map(id => {
                      const branch = branchArcs.find(b => b.id === id);
                      if (!branch) return null;
                      return (
                        <span
                          key={id}
                          className="px-2.5 py-1 rounded-lg bg-purple-900/50 border border-purple-400/30 text-purple-200 text-[11px] font-medium flex items-center gap-1.5"
                        >
                          <span>🌿</span>
                          <span>{branch.title}</span>
                          <button
                            onClick={() => handleToggleBranchConvergence(id)}
                            className="hover:text-red-400 ml-1 font-bold text-xs"
                            title="Bỏ chọn"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Simulation Action Button */}
                <div className="pt-2">
                  <button
                    onClick={handleRunTrajectoryConvergence}
                    disabled={isSimulatingConvergence || selectedBranchArcIdsForConvergence.length === 0}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:via-pink-500 hover:to-amber-500 text-white rounded-xl font-bold text-xs tracking-wide shadow-xl shadow-purple-950/70 border border-pink-400/40 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSimulatingConvergence ? (
                      <>
                        <Spinner />
                        <span>Đang Hợp Lưu & Tính Toán Nhân Quả Cao Trào Bằng AI...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base">🌌</span>
                        <span>XÂU CHUỖI HỢP LƯU VỀ MẠCH CHÍNH & TẠO CAO TRÀO BÙNG NỔ</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulation Result Area */}
                {convergenceResult && (
                  <div className="mt-4 p-4 rounded-xl bg-gray-950 border border-pink-500/40 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-pink-400 tracking-wider">
                          Kết Quả Đại Hợp Lưu Hoàn Hảo
                        </span>
                        <h4 className="text-sm font-bold text-amber-300">
                          {convergenceResult.convergenceTitle}
                        </h4>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-500/30">
                        {convergenceResult.nexusStageLinked}
                      </span>
                    </div>

                    {/* Synthesis Narrative */}
                    <div className="p-3.5 rounded-xl bg-gray-900/90 border border-amber-500/20 space-y-1.5 text-xs">
                      <span className="text-amber-400 font-bold uppercase tracking-wider block text-[10px]">
                        🌐 1. Bức Tranh Toàn Cảnh Mạch Nhân Quả (Grand Synthesis):
                      </span>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {convergenceResult.grandSynthesisNarrative}
                      </p>
                    </div>

                    {/* Climactic Clash */}
                    <div className="p-3.5 rounded-xl bg-gray-900/90 border border-red-500/20 space-y-1.5 text-xs">
                      <span className="text-red-400 font-bold uppercase tracking-wider block text-[10px]">
                        ⚔️ 2. Phân Cảnh Đại Chiến / Cao Trào Nghẹt Thở (Climactic Clash):
                      </span>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {convergenceResult.climacticClashScene}
                      </p>
                    </div>

                    {/* Aftermath & Elevation */}
                    <div className="p-3.5 rounded-xl bg-gray-900/90 border border-emerald-500/20 space-y-1.5 text-xs">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[10px]">
                        🚀 3. Hậu Quả & Bàn Đạp Đột Phá Mạch Chính (Spine Elevation):
                      </span>
                      <p className="text-emerald-200/90 leading-relaxed">
                        {convergenceResult.aftermathAndSpineElevation}
                      </p>
                    </div>

                    {/* Ready Chapter Draft Snippet */}
                    <div className="p-4 rounded-xl bg-gray-900/90 border border-pink-500/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-pink-300 font-bold">
                          📖 Trích Đoạn Chương Hoàn Chỉnh Sẵn Sàng Vào Truyện:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleCopy(convergenceResult.readyChapterDraftSnippet, 'conv_draft_copied')}
                            className="px-2.5 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded text-xs transition-all"
                          >
                            {copiedTip === 'conv_draft_copied' ? '✓ Đã chép' : '📋 Sao chép'}
                          </button>
                          <button
                            onClick={() => {
                              onInsertText(`\n\n[Đại Hợp Lưu: ${convergenceResult.convergenceTitle}]\n${convergenceResult.readyChapterDraftSnippet}\n`);
                              alert('Đã chèn trích đoạn đại hợp lưu vào chương truyện!');
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white rounded text-xs font-bold transition-all shadow"
                          >
                            1-Click Chèn
                          </button>
                          {onCreateChapter && (
                            <button
                              onClick={() => {
                                onCreateChapter(
                                  convergenceResult.convergenceTitle,
                                  convergenceResult.readyChapterDraftSnippet,
                                  convergenceResult.grandSynthesisNarrative.slice(0, 200) + '...'
                                );
                                alert('Đã tạo chương mới từ phân đoạn đại hợp lưu!');
                              }}
                              className="px-3 py-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded text-xs font-bold transition-all shadow"
                            >
                              + Tạo Chương Mới
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-200 font-serif leading-relaxed whitespace-pre-line bg-black/40 p-3 rounded-lg border border-white/5">
                        {convergenceResult.readyChapterDraftSnippet}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AI GENERATOR MODAL: CUSTOM BRANCH STORY ARC (MẠCH NHÁNH MỚI BẰNG AI) */}
      {/* ========================================================================= */}
      {isBranchGenOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-gray-900 border border-amber-500/40 rounded-2xl shadow-2xl p-6 text-xs space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">➕</span>
                <h3 className="text-base font-bold text-amber-300">
                  Tạo Mạch Nhánh Mới Liên Kết Mạch Chính Bằng AI
                </h3>
              </div>
              <button
                onClick={() => setIsBranchGenOpen(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-400 text-xs">
              Mạch nhánh sẽ phát triển độc lập theo 3 hồi, mang lại tài nguyên, thế lực và cuối cùng hội tụ về Mạch Chính ở cảnh giới đã chọn.
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block text-xs">
                    Lĩnh vực mạch nhánh:
                  </label>
                  <select
                    value={branchGenDomain}
                    onChange={e => setBranchGenDomain(e.target.value as BranchArcDomain)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-amber-500"
                  >
                    {Object.entries(BRANCH_DOMAIN_CONFIG).map(([k, v]) => (
                      <option key={k} value={k}>{v.icon} {v.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block text-xs">
                    Phương hướng phát triển áp dụng:
                  </label>
                  <div className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-amber-300 font-bold">
                    {selectedTrajectory.name}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block text-xs">
                    Cảnh giới khởi phát (Tách nhánh):
                  </label>
                  <select
                    value={branchGenInitiatingStage}
                    onChange={e => setBranchGenInitiatingStage(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-amber-500"
                  >
                    {PRESET_MASTER_CULTIVATION_SPINE.slice(0, 4).map(s => (
                      <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-300 font-semibold block text-xs">
                    Cảnh giới hội tụ (Đâm về Mạch Chính):
                  </label>
                  <select
                    value={branchGenConvergingStage}
                    onChange={e => setBranchGenConvergingStage(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-amber-500"
                  >
                    {PRESET_MASTER_CULTIVATION_SPINE.slice(1, 6).map(s => (
                      <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold block text-xs">
                  Ý tưởng khởi nguyên / Điểm rẽ nhánh (Narrative Hook):
                </label>
                <textarea
                  rows={3}
                  value={branchGenHook}
                  onChange={e => setBranchGenHook(e.target.value)}
                  placeholder="Ví dụ: Bị trưởng lão nghi ngờ, ngấm ngầm cấu kết với thương hội hắc thị để thu mua bảo vật..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-gray-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsBranchGenOpen(false)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-semibold"
                >
                  Hủy
                </button>
                <button
                  onClick={handleRunBranchGenerator}
                  disabled={isBranchGenerating}
                  className="px-5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-lg font-bold shadow-md flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isBranchGenerating ? (
                    <>
                      <Spinner />
                      <span>Đang Sáng Tạo Mạch Nhánh...</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>Khởi Tạo Mạch Nhánh Bằng AI</span>
                    </>
                  )}
                </button>
              </div>

              {branchGenResult && (
                <div className="mt-4 p-4 rounded-xl bg-gray-950 border border-amber-500/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-amber-300 text-sm">
                      {branchGenResult.arc.title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                      {BRANCH_DOMAIN_CONFIG[branchGenResult.arc.domain]?.label}
                    </span>
                  </div>

                  <p className="text-gray-300">
                    ⚡ <strong>Khởi nguyên:</strong> {branchGenResult.arc.narrativeHook}
                  </p>
                  <p className="text-purple-300">
                    🎯 <strong>Hội tụ về mạch chính:</strong> {branchGenResult.arc.convergencePointDescription}
                  </p>
                  <p className="text-emerald-300">
                    🎁 <strong>Chiến lợi phẩm:</strong> {branchGenResult.arc.catalystRewardOrStakes}
                  </p>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={handleAddGeneratedBranchArc}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs shadow-md"
                    >
                      ✓ Thêm Vào Danh Sách Mạch Nhánh
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AI GENERATOR MODAL: MICRO-STORY STRAND (TIỂU MẠCH TRUYỆN VI MÔ) */}
      {/* ========================================================================= */}
      {isMicroGenOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-gray-900 border border-emerald-500/40 rounded-2xl shadow-2xl p-6 text-xs space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <h3 className="text-base font-bold text-emerald-300">
                  AI Sáng Tạo Tiểu Mạch Truyện Vi Mô (Nhỏ Hơn Mạch Chính)
                </h3>
              </div>
              <button
                onClick={() => setIsMicroGenOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-400 leading-relaxed text-[11px]">
              Tạo ra một nhánh sự kiện nhỏ (1 phân cảnh hoặc 1 chương ngắn) nảy sinh trong cuộc sống tu chân: trả thù cục bộ, nhặt đồ rác ở chợ đen, thử nghiệm dị năng, hay kỳ ngộ duyên phận. Nhánh nhỏ này sẽ mang lại chiến lợi phẩm và neo mắt xích cho đại kiếp sau này.
            </p>

            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Nhân Vật Chính:</label>
                  <input
                    type="text"
                    value={microGenProtagonist}
                    onChange={e => setMicroGenProtagonist(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Cảnh Giới Mạch Chính Gắn Liền:</label>
                  <select
                    value={microGenStageId}
                    onChange={e => setMicroGenStageId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {PRESET_MASTER_CULTIVATION_SPINE.map(s => (
                      <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Thể Loại Vi Mạch:</label>
                  <select
                    value={microGenCategory}
                    onChange={e => setMicroGenCategory(e.target.value as any)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {Object.entries(MICRO_CATEGORY_CONFIG).map(([k, v]) => (
                      <option key={k} value={k}>{v.icon} {v.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Quy Mô Độ Dài:</label>
                  <select
                    value={microGenScope}
                    onChange={e => setMicroGenScope(e.target.value as any)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {Object.entries(SCOPE_CONFIG).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Địa Điểm / Bối Cảnh Diễn Ra:</label>
                <input
                  type="text"
                  value={microGenSetting}
                  onChange={e => setMicroGenSetting(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Ví dụ: Khu chợ đen ngoại môn / Chân núi Vấn Kiếm / Khe suối Lạc Nguyệt..."
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Vấn Đề Phát Sinh / Nhu Cầu Trước Mắt:</label>
                <textarea
                  rows={2}
                  value={microGenTrouble}
                  onChange={e => setMicroGenTrouble(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Ví dụ: Bị chấp sự ngáng đường khấu trừ đan dược / Cần kiếm tiền gấp mua lò luyện đan cũ..."
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleRunMicroGenerator}
                disabled={isMicroGenerating}
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 disabled:opacity-50 transition-all"
              >
                {isMicroGenerating ? (
                  <>
                    <Spinner />
                    <span>AI Đang Tính Toán Nhịp Độ & Chiến Lợi Phẩm Cục Bộ...</span>
                  </>
                ) : (
                  <>
                    <span>⚡</span> Sáng Tạo Tiểu Mạch Truyện Ngay
                  </>
                )}
              </button>
            </div>

            {/* Generated Micro Strand Preview */}
            {microGenResult && (
              <div className="mt-4 p-4 rounded-xl bg-gray-950 border border-emerald-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-emerald-300 text-sm">
                    {microGenResult.strand.title}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/30">
                    {MICRO_CATEGORY_CONFIG[microGenResult.strand.category]?.label || 'Tiểu Mạch'}
                  </span>
                </div>

                <p className="text-gray-300">
                  🎯 <strong>Kích hoạt:</strong> {microGenResult.strand.localTrigger}
                </p>
                <p className="text-cyan-300">
                  💡 <strong>Cách xử lý:</strong> {microGenResult.strand.tacticalResolution}
                </p>
                <p className="text-amber-300">
                  💎 <strong>Chiến lợi phẩm:</strong> {microGenResult.strand.tangibleReward}
                </p>
                <p className="text-indigo-300">
                  ⚓ <strong>Neo Mạch Chính:</strong> {microGenResult.strand.anchorHookToMainPlot}
                </p>

                {microGenResult.writingTechniqueTips && microGenResult.writingTechniqueTips.length > 0 && (
                  <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      💡 Lời Khuyên Thủ Pháp Kể Chuyện:
                    </span>
                    {microGenResult.writingTechniqueTips.map((tip, idx) => (
                      <p key={idx} className="text-[11px] text-gray-300">• {tip}</p>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={handleAddGeneratedMicroStrand}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shadow-md"
                  >
                    ✓ Thêm Vào Danh Sách Tiểu Mạch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* AI GENERATOR MODAL: MEDIUM SUBPLOT ARC */}
      {/* ========================================================================= */}
      {isGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-gray-900 border border-purple-500/40 rounded-2xl shadow-2xl p-6 text-xs space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <h3 className="text-base font-bold text-amber-300">
                  AI Thiết Kế Nhánh Phụ & Phục Bút Đan Cài
                </h3>
              </div>
              <button
                onClick={() => setIsGeneratorOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-md"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-400 leading-relaxed text-[11px]">
              Tự động xây dựng một nhánh chuyện phụ với vỏ bọc tầm thường ban đầu, liên kết liền mạch giữa tầng gieo mầm và tầng bùng nổ nhân quả.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-300 font-bold mb-1">Nhân Vật Chính:</label>
                <input
                  type="text"
                  value={genProtagonist}
                  onChange={e => setGenProtagonist(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Vật Phẩm / Tàn Vật / Từ Khóa Trọng Tâm:</label>
                <input
                  type="text"
                  value={genKeyword}
                  onChange={e => setGenKeyword(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="Ví dụ: Miếng ngọc bội mẻ, Chiếc nhẫn rỉ sét, Bài ca dao quái đản..."
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">Bối Cảnh Xuất Hiện Ban Đầu (Giả Tượng):</label>
                <input
                  type="text"
                  value={genSetting}
                  onChange={e => setGenSetting(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                  placeholder="Ví dụ: Đống rác chân núi, tiệm cầm đồ cũ phàm trần..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-bold mb-1">Tầng Gieo Hạt (Planted Stage):</label>
                  <select
                    value={genPlantedStageId}
                    onChange={e => setGenPlantedStageId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {PRESET_MASTER_CULTIVATION_SPINE.map(s => (
                      <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-bold mb-1">Tầng Bùng Nổ Nhân Quả (Payoff Stage):</label>
                  <select
                    value={genPayoffStageId}
                    onChange={e => setGenPayoffStageId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    {PRESET_MASTER_CULTIVATION_SPINE.map(s => (
                      <option key={s.id} value={s.id}>Cấp {s.stageOrder}: {s.stageName.split('(')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleRunGenerator}
                  disabled={isGenerating}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 disabled:opacity-50 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <Spinner />
                      <span>AI Đang Tính Toán Chuỗi Nhân Quả & Phục Bút...</span>
                    </>
                  ) : (
                    <>
                      <span>🔮</span> Sinh Nhánh Phụ & Phục Bút Đan Cài Ngay
                    </>
                  )}
                </button>
              </div>

              {generatedResult && (
                <div className="mt-4 p-4 rounded-xl bg-gray-950 border border-purple-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-amber-300 text-sm">
                      {generatedResult.arc.title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
                      {TYPE_CONFIG[generatedResult.arc.foreshadowType]?.label || 'Phục Bút'}
                    </span>
                  </div>

                  <p className="text-gray-300 italic">
                    🎭 <strong>Vỏ bọc:</strong> {generatedResult.arc.deceptiveFacade}
                  </p>
                  <p className="text-gray-300">
                    🗝️ <strong>Manh mối ngầm:</strong> {generatedResult.arc.coreClueDetail}
                  </p>
                  <p className="text-emerald-300">
                    ⚡ <strong>Xúc tác mạch chính:</strong> {generatedResult.arc.mainPlotCatalystEffect}
                  </p>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={handleAddGeneratedArc}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs shadow-md"
                    >
                      ✓ Thêm Vào Danh Sách Nhánh Phụ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
