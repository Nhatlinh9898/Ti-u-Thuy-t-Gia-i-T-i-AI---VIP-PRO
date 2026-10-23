import React, { useState, useMemo } from 'react';
import {
  NovelNode,
  CharacterProfile,
  NeuralInferenceType,
  NeuralWeightMatrix,
  LearnedNarrativeAxiom,
  NeuralInferenceRecord,
  NeuralSelfLearningState
} from '../types';
import {
  INITIAL_NEURAL_WEIGHTS,
  PRESET_LEARNED_AXIOMS,
  PRESET_INFERENCE_RECORDS,
  INITIAL_NEURAL_LEARNING_STATE
} from '../data/presetNeuralLearningEngine';
import {
  runNeuralNarrativeInference,
  trainNeuralEpochAndSelfLearn
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface NeuralInferenceLearningStudioProps {
  selectedNode: NovelNode | null;
  characters?: CharacterProfile[];
  plotIdea?: string;
  genre?: string;
  onInsertText: (text: string) => void;
  onCreateChapter?: (title: string, content: string, summary: string) => void;
}

const INFERENCE_TYPE_CONFIG: Record<NeuralInferenceType, { label: string; icon: string; desc: string; badgeColor: string }> = {
  PLOT_TWIST: {
    label: 'Bước Ngoặt Bất Ngờ',
    icon: '⚡',
    desc: 'Suy diễn nghịch lý ẩn giấu, bẻ gãy dự đoán bề mặt và tạo bước ngoặt chấn động.',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  LATENT_MOTIVE: {
    label: 'Động Cơ Ngầm & Bẫy Tâm Lý',
    icon: '🎭',
    desc: 'Bóc tách tính toán lợi ích sâu kín, ý đồ ngụy trang và mâu thuẫn nội tâm nhân vật.',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40'
  },
  BUTTERFLY_EFFECT: {
    label: 'Hiệu Ứng Cánh Bướm',
    icon: '🦋',
    desc: 'Dự phóng chuỗi phản ứng dây chuyền dài hạn từ một chi tiết vi mô trong chương.',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
  },
  HIDDEN_TRUTH: {
    label: 'Chân Tướng Cổ Xưa',
    icon: '📜',
    desc: 'Khai mở bí mật phong ấn, nguồn gốc thần bí hoặc chân tướng ân oán tiền kiếp.',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  },
  STRATEGIC_GAMBIT: {
    label: 'Bố Cục Mưu Lược',
    icon: '♟️',
    desc: 'Suy diễn thế cờ đối kháng, kế sách tương kế tựu kế và đòn bẩy nghịch chuyển.',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  },
  COSMIC_ESCALATION: {
    label: 'Nâng Tầm Cục Diện',
    icon: '🌌',
    desc: 'Mở rộng quy mô xung đột từ môn phái lên cấp độ giới vực, chư thiên vạn tộc.',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
  }
};

export const NeuralInferenceLearningStudio: React.FC<NeuralInferenceLearningStudioProps> = ({
  selectedNode,
  characters = [],
  plotIdea = '',
  genre = 'Tiên Hiệp',
  onInsertText,
  onCreateChapter
}) => {
  // Master Learning State
  const [learningState, setLearningState] = useState<NeuralSelfLearningState>(() => {
    try {
      const saved = localStorage.getItem('novel_neural_learning_state');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved neural learning state:', e);
    }
    return INITIAL_NEURAL_LEARNING_STATE;
  });

  // Current Active Studio Tab
  const [activeTab, setActiveTab] = useState<'inference' | 'memoryBank' | 'weightsArchitecture' | 'history'>('inference');

  // Input Configuration for Inference
  const [inferenceType, setInferenceType] = useState<NeuralInferenceType>('PLOT_TWIST');
  const [contextSource, setContextSource] = useState<'chapter' | 'custom'>('chapter');
  const [customContext, setCustomContext] = useState<string>('');
  const [customDeductionFocus, setCustomDeductionFocus] = useState<string>('Suy diễn điểm mù của đối thủ và tạo bước ngoặt đảo ngược thế trận');
  const [unresolvedCluesInput, setUnresolvedCluesInput] = useState<string>('Kiếm ý lạ trên phế tích, Mùi đàn hương trong trà thất, Chiếc nhẫn đồng rỉ sét');

  // Execution & AI State
  const [isInferring, setIsInferring] = useState<boolean>(false);
  const [isTrainingEpoch, setIsTrainingEpoch] = useState<boolean>(false);
  const [activeRecord, setActiveRecord] = useState<NeuralInferenceRecord | null>(
    learningState.inferenceRecords[0] || null
  );

  // Author Rating & Feedback State for the Active Record
  const [userRating, setUserRating] = useState<number>(5);
  const [userCritique, setUserCritique] = useState<string>('');
  const [feedbackSuccessNotice, setFeedbackSuccessNotice] = useState<string | null>(null);

  // Axiom Filter State
  const [axiomFilterCategory, setAxiomFilterCategory] = useState<string>('ALL');

  // Save to localStorage whenever learningState changes
  const updateLearningState = (updater: (prev: NeuralSelfLearningState) => NeuralSelfLearningState) => {
    setLearningState(prev => {
      const next = updater(prev);
      try {
        localStorage.setItem('novel_neural_learning_state', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save neural learning state to storage:', e);
      }
      return next;
    });
  };

  // Derive Current Input Context
  const effectiveContext = useMemo(() => {
    if (contextSource === 'chapter' && selectedNode) {
      return `Chương: "${selectedNode.title}"\nTóm tắt: ${selectedNode.summary || 'Chưa có tóm tắt'}\nTrích đoạn nội dung:\n${(selectedNode.content || '').slice(0, 1200)}`;
    }
    if (customContext.trim()) {
      return customContext;
    }
    return plotIdea || 'Nhân vật chính bước vào đại hội tỷ võ môn phái, phát hiện một âm mưu gián điệp nhắm vào long mạch.';
  }, [contextSource, selectedNode, customContext, plotIdea]);

  // Main Inference Action (Forward Pass)
  const handleExecuteInference = async () => {
    setIsInferring(true);
    setFeedbackSuccessNotice(null);
    try {
      const clues = unresolvedCluesInput.split(',').map(c => c.trim()).filter(Boolean);
      const protagonist = characters[0]?.name || 'Lâm Tiêu';

      const resultRecord = await runNeuralNarrativeInference({
        inferenceType,
        context: effectiveContext,
        currentChapterTitle: selectedNode?.title || 'Tình Huống Truyện',
        protagonistName: protagonist,
        unresolvedClues: clues,
        activeWeights: learningState.weights,
        learnedAxioms: learningState.activeAxioms.filter(a => a.status !== 'ARCHIVED'),
        learningEpoch: learningState.currentEpoch,
        customDeductionFocus,
        genre
      });

      setActiveRecord(resultRecord);
      setUserRating(5);
      setUserCritique('');

      // Add to records and bump usage of applied axioms
      updateLearningState(prev => {
        const updatedAxioms = prev.activeAxioms.map(ax => {
          if (resultRecord.appliedAxiomIds?.includes(ax.id)) {
            return { ...ax, timesApplied: ax.timesApplied + 1 };
          }
          return ax;
        });

        return {
          ...prev,
          totalInferencesRun: prev.totalInferencesRun + 1,
          activeAxioms: updatedAxioms,
          inferenceRecords: [resultRecord, ...prev.inferenceRecords]
        };
      });
    } catch (err: any) {
      alert('Không thể thực hiện suy diễn mạng nơ-ron: ' + (err.message || 'Lỗi kết nối'));
    } finally {
      setIsInferring(false);
    }
  };

  // Backpropagation & Reinforcement (Tự Học Dựa Vào Đánh Giá & Suy Diễn)
  const handleReinforceAndLearn = () => {
    if (!activeRecord) return;

    const ratingDelta = (userRating - 3) * 0.05; // -0.1 to +0.1
    const newWeights: NeuralWeightMatrix = {
      causalityRigor: Math.min(0.99, Math.max(0.5, learningState.weights.causalityRigor + ratingDelta * 0.8)),
      surpriseFactor: Math.min(0.99, Math.max(0.5, learningState.weights.surpriseFactor + (inferenceType === 'PLOT_TWIST' ? ratingDelta : 0.02))),
      emotionalDepth: Math.min(0.99, Math.max(0.5, learningState.weights.emotionalDepth + (inferenceType === 'LATENT_MOTIVE' ? ratingDelta : 0.01))),
      proseSophistication: Math.min(0.99, Math.max(0.5, learningState.weights.proseSophistication + ratingDelta * 0.5)),
      worldConsistency: Math.min(0.99, Math.max(0.5, learningState.weights.worldConsistency + ratingDelta * 0.6)),
      tensionMomentum: Math.min(0.99, Math.max(0.5, learningState.weights.tensionMomentum + ratingDelta * 0.7))
    };

    // Extract any new axiom if rating is 4 or 5 and critique exists
    let newlyExtractedAxiom: LearnedNarrativeAxiom | null = null;
    if (userRating >= 4 && userCritique.trim()) {
      newlyExtractedAxiom = {
        id: `axiom_custom_${Date.now()}`,
        category: inferenceType === 'PLOT_TWIST' ? 'SUBVERSION' : inferenceType === 'LATENT_MOTIVE' ? 'CHARACTER_PSYCHOLOGY' : 'CAUSALITY',
        ruleSummary: `Bài Học Tác Giả (${activeRecord.inferenceType}): ${userCritique.slice(0, 70)}...`,
        detailedInsight: `Được đúc rút từ suy diễn [${activeRecord.sourceChapterTitle}]: ${userCritique}`,
        weight: 1.5,
        sourceInferenceId: activeRecord.id,
        timesApplied: 1,
        effectivenessRating: userRating,
        status: 'ACTIVE',
        learnedAtEpoch: learningState.currentEpoch
      };
    }

    updateLearningState(prev => {
      const updatedRecords = prev.inferenceRecords.map(r => {
        if (r.id === activeRecord.id) {
          return {
            ...r,
            authorRating: userRating,
            authorCritique: userCritique,
            isReinforced: true
          };
        }
        return r;
      });

      const updatedAxioms = newlyExtractedAxiom
        ? [newlyExtractedAxiom, ...prev.activeAxioms]
        : prev.activeAxioms;

      // Recompute average quality score
      const rated = updatedRecords.filter(r => r.authorRating);
      const avg = rated.length > 0
        ? Number((rated.reduce((s, r) => s + (r.authorRating || 0), 0) / rated.length).toFixed(2))
        : prev.qualityScoreAvg;

      return {
        ...prev,
        weights: newWeights,
        activeAxioms: updatedAxioms,
        qualityScoreAvg: avg,
        inferenceRecords: updatedRecords
      };
    });

    setActiveRecord(prev => prev ? {
      ...prev,
      authorRating: userRating,
      authorCritique: userCritique,
      isReinforced: true
    } : null);

    setFeedbackSuccessNotice('✅ Lan truyền ngược hoàn tất! Trọng số nơ-ron đã được tinh chỉnh & Quy tắc đã lưu vào ngân hàng tự học.');
    setTimeout(() => setFeedbackSuccessNotice(null), 4000);
  };

  // Run Epoch Training (Meta-Reflection across all historical inferences)
  const handleRunEpochLearning = async () => {
    setIsTrainingEpoch(true);
    try {
      const result = await trainNeuralEpochAndSelfLearn(
        learningState.inferenceRecords,
        learningState.activeAxioms,
        learningState.currentEpoch
      );

      updateLearningState(prev => {
        const nextEpoch = prev.currentEpoch + 1;
        const newAxioms = [...result.newAxioms, ...prev.activeAxioms];
        const newQuality = Math.min(5.0, Number((prev.qualityScoreAvg + (result.qualityBoost || 0.15)).toFixed(2)));

        return {
          ...prev,
          currentEpoch: nextEpoch,
          qualityScoreAvg: newQuality,
          activeAxioms: newAxioms,
          evolutionLog: [
            {
              epoch: nextEpoch,
              timestamp: new Date().toLocaleTimeString('vi-VN') + ' - ' + new Date().toLocaleDateString('vi-VN'),
              trigger: `Chu kỳ học tập Epoch ${nextEpoch}`,
              qualityGain: result.qualityBoost || 0.2,
              summary: result.summary || 'Đã hồi quy toàn bộ dữ liệu suy diễn và tinh chỉnh trọng số liên kết nơ-ron.'
            },
            ...prev.evolutionLog
          ]
        };
      });

      alert(`🎉 Đã hoàn tất huấn luyện Epoch ${learningState.currentEpoch + 1}!\n${result.summary}`);
    } catch (err: any) {
      alert('Không thể chạy chu kỳ tự học: ' + (err.message || 'Lỗi mạng'));
    } finally {
      setIsTrainingEpoch(false);
    }
  };

  // Filtered Axioms
  const filteredAxioms = useMemo(() => {
    if (axiomFilterCategory === 'ALL') return learningState.activeAxioms;
    return learningState.activeAxioms.filter(a => a.category === axiomFilterCategory);
  }, [learningState.activeAxioms, axiomFilterCategory]);

  return (
    <div className="flex flex-col h-full bg-gray-950 text-gray-100 font-sans overflow-hidden">
      {/* Studio Top Header */}
      <div className="p-3 bg-gradient-to-r from-gray-950 via-purple-950/40 to-gray-950 border-b border-purple-500/30 flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[1.5px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center text-lg">
              🧠
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 bg-clip-text text-transparent">
                MẠNG THẦN KINH SUY DIỄN & TỰ HỌC
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 border border-purple-500/40 font-bold">
                Epoch {learningState.currentEpoch}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Suy diễn logic đa tầng • Dự phóng phản ứng dây chuyền • Tự học & Nâng cao chất lượng qua phản hồi
            </p>
          </div>
        </div>

        {/* Global Key Metrics Badges */}
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-lg bg-gray-900/80 border border-purple-500/30 text-right">
            <div className="text-[9px] text-gray-400 font-medium">Chỉ Số Bút Lực (NQI)</div>
            <div className="text-xs font-bold text-amber-300 flex items-center justify-end gap-1">
              <span>⭐</span> {learningState.qualityScoreAvg.toFixed(2)} / 5.0
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-gray-900/80 border border-indigo-500/30 text-right">
            <div className="text-[9px] text-gray-400 font-medium">Quy Tắc Đã Tự Học</div>
            <div className="text-xs font-bold text-indigo-300 flex items-center justify-end gap-1">
              <span>📜</span> {learningState.activeAxioms.length} Tiên Đề
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-gray-900/80 border border-pink-500/30 text-right">
            <div className="text-[9px] text-gray-400 font-medium">Lượt Suy Diễn</div>
            <div className="text-xs font-bold text-pink-300 flex items-center justify-end gap-1">
              <span>⚡</span> {learningState.totalInferencesRun} Lần
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Ribbon */}
      <div className="px-3 pt-2 bg-gray-900/60 border-b border-gray-800 flex items-center justify-between gap-1 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('inference')}
            className={`px-3 py-1.5 rounded-t-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'inference'
                ? 'bg-purple-950 text-purple-200 border-t-2 border-purple-400 shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <span>🔮</span> Suy Diễn & Phát Triển
          </button>
          <button
            onClick={() => setActiveTab('memoryBank')}
            className={`px-3 py-1.5 rounded-t-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'memoryBank'
                ? 'bg-indigo-950 text-indigo-200 border-t-2 border-indigo-400 shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <span>🧬</span> Ngân Hàng Tự Học ({learningState.activeAxioms.length})
          </button>
          <button
            onClick={() => setActiveTab('weightsArchitecture')}
            className={`px-3 py-1.5 rounded-t-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'weightsArchitecture'
                ? 'bg-pink-950 text-pink-200 border-t-2 border-pink-400 shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <span>🎛️</span> Trọng Số & Kiến Trúc Nơ-ron
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-t-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'history'
                ? 'bg-gray-900 text-amber-200 border-t-2 border-amber-400 shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
            }`}
          >
            <span>📜</span> Lịch Sử Suy Diễn ({learningState.inferenceRecords.length})
          </button>
        </div>

        {/* Global Self-Learning Epoch Trigger */}
        <button
          onClick={handleRunEpochLearning}
          disabled={isTrainingEpoch}
          className="mb-1 px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-gray-950 font-black shadow flex items-center gap-1.5 disabled:opacity-50 transition"
          title="Chạy hồi quy phân tích các suy diễn đã tạo để tự nâng cao toàn diện chất lượng nội dung"
        >
          {isTrainingEpoch ? <Spinner size="sm" /> : <span>🔄</span>}
          <span>Huấn Luyện Epoch Mới</span>
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* ========================================================================= */}
        {/* TAB 1: SUY DIỄN & PHÁT TRIỂN NỘI DUNG */}
        {/* ========================================================================= */}
        {activeTab === 'inference' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Control Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-3">
              {/* Context Source Selector */}
              <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-gray-300 flex items-center gap-1">
                    <span>🎯</span> Nguồn Dữ Liệu Đầu Vào
                  </span>
                  <div className="flex items-center gap-1 bg-gray-950 p-0.5 rounded-md border border-gray-800 text-[11px]">
                    <button
                      onClick={() => setContextSource('chapter')}
                      className={`px-2 py-0.5 rounded ${contextSource === 'chapter' ? 'bg-purple-800 text-white font-bold' : 'text-gray-400'}`}
                    >
                      Từ Chương Chọn
                    </button>
                    <button
                      onClick={() => setContextSource('custom')}
                      className={`px-2 py-0.5 rounded ${contextSource === 'custom' ? 'bg-purple-800 text-white font-bold' : 'text-gray-400'}`}
                    >
                      Nhập Tùy Ý
                    </button>
                  </div>
                </div>

                {contextSource === 'chapter' ? (
                  <div className="p-2.5 rounded-lg bg-gray-950 border border-purple-500/20 text-xs">
                    {selectedNode ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-purple-300 font-bold">
                          <span>📖</span> {selectedNode.title}
                        </div>
                        <p className="text-[11px] text-gray-400 line-clamp-2">
                          {selectedNode.summary || 'Chưa có tóm tắt. Mạng nơ-ron sẽ đọc nội dung bản thảo của chương này.'}
                        </p>
                      </div>
                    ) : (
                      <div className="text-amber-400/90 flex items-center gap-1.5">
                        <span>⚠️</span> Chưa chọn chương trên cây cốt truyện. Mạng nơ-ron sẽ dùng ý tưởng thế giới mặc định hoặc bạn có thể chuyển sang "Nhập Tùy Ý".
                      </div>
                    )}
                  </div>
                ) : (
                  <textarea
                    value={customContext}
                    onChange={e => setCustomContext(e.target.value)}
                    placeholder="Mô tả phân cảnh, xung đột hoặc tình thế hiện tại cần mạng nơ-ron suy diễn..."
                    className="w-full h-24 p-2 bg-gray-950 border border-gray-800 rounded-lg text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500"
                  />
                )}
              </div>

              {/* Inference Type Selection */}
              <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-2">
                <div className="text-xs font-bold text-gray-300 flex items-center gap-1">
                  <span>🧠</span> Mục Tiêu Suy Diễn & Lan Truyền
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {(Object.keys(INFERENCE_TYPE_CONFIG) as NeuralInferenceType[]).map(typeKey => {
                    const item = INFERENCE_TYPE_CONFIG[typeKey];
                    const isSelected = inferenceType === typeKey;
                    return (
                      <button
                        key={typeKey}
                        onClick={() => setInferenceType(typeKey)}
                        className={`p-2 rounded-lg text-left transition-all border ${
                          isSelected
                            ? 'bg-purple-950/80 border-purple-400 ring-1 ring-purple-400/50 shadow-md'
                            : 'bg-gray-950/80 border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-0.5">
                          <span>{item.icon}</span> {item.label}
                        </div>
                        <p className="text-[10px] text-gray-400 line-clamp-1">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unresolved Clues & Latency Input */}
              <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-2">
                <div className="text-xs font-bold text-gray-300 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <span>🔍</span> Manh Mối Cài Cắm / Điểm Bất Thường
                  </span>
                  <span className="text-[10px] text-gray-400 font-normal">Ngăn cách bởi dấu phẩy</span>
                </div>
                <input
                  type="text"
                  value={unresolvedCluesInput}
                  onChange={e => setUnresolvedCluesInput(e.target.value)}
                  placeholder="Ví dụ: Vết kiếm khí lạ, Mùi thuốc lá, Ánh mắt của trưởng lão..."
                  className="w-full p-2 bg-gray-950 border border-gray-800 rounded-lg text-xs text-cyan-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Custom Deduction Focus */}
              <div className="p-3 rounded-xl bg-gray-900/70 border border-gray-800 space-y-2">
                <div className="text-xs font-bold text-gray-300 flex items-center gap-1">
                  <span>🎯</span> Trọng Tâm Suy Diễn Cụ Thể
                </div>
                <input
                  type="text"
                  value={customDeductionFocus}
                  onChange={e => setCustomDeductionFocus(e.target.value)}
                  placeholder="Ví dụ: Vạch trần chân tướng nội gián hoặc tìm cách phá giải tuyệt trận..."
                  className="w-full p-2 bg-gray-950 border border-gray-800 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Active Synaptic Rules Overview */}
              <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs space-y-2">
                <div className="flex items-center justify-between text-purple-300 font-bold">
                  <span className="flex items-center gap-1">
                    <span>⚡</span> Quy Luật Sáng Tác Được Kích Hoạt
                  </span>
                  <span className="text-[10px] text-purple-400">
                    {learningState.activeAxioms.filter(a => a.status !== 'ARCHIVED').length} Tiên đề
                  </span>
                </div>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {learningState.activeAxioms.filter(a => a.status === 'CORE_PRINCIPLE').map(a => (
                    <div key={a.id} className="text-[11px] p-1.5 rounded bg-gray-900/80 border border-purple-500/30 flex items-center justify-between">
                      <span className="text-gray-300 line-clamp-1">{a.ruleSummary}</span>
                      <span className="text-amber-400 font-mono font-bold text-[10px] ml-1 shrink-0">W: {a.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Launch Button */}
              <button
                onClick={handleExecuteInference}
                disabled={isInferring}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white font-black text-sm shadow-xl shadow-purple-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isInferring ? (
                  <>
                    <Spinner size="sm" />
                    <span>Mạng Nơ-ron Đang Lan Truyền Xuôi & Suy Diễn 3 Tầng...</span>
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    <span>KÍCH HOẠT SUY DIỄN & PHÁT TRIỂN NỘI DUNG</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Display Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {activeRecord ? (
                <div className="space-y-4">
                  {/* Deduction Header Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/40 via-gray-900 to-gray-950 border border-purple-500/40 shadow-xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-800 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${INFERENCE_TYPE_CONFIG[activeRecord.inferenceType]?.badgeColor || 'bg-purple-900 text-purple-200'}`}>
                          {INFERENCE_TYPE_CONFIG[activeRecord.inferenceType]?.icon} {INFERENCE_TYPE_CONFIG[activeRecord.inferenceType]?.label}
                        </span>
                        <span className="text-xs text-gray-400">
                          {activeRecord.sourceChapterTitle} • {activeRecord.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                          Độ tin cậy: {activeRecord.confidenceIndex}%
                        </span>
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                          Epoch {activeRecord.epoch}
                        </span>
                      </div>
                    </div>

                    {/* Core Revelation Banner */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/60 via-purple-950/40 to-gray-950 border border-amber-500/40">
                      <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-1">
                        <span>💥</span> PHÁT HIỆN CỐT LÕI / ĐIỂM BÙNG NỔ SUY DIỄN:
                      </div>
                      <p className="text-xs text-gray-100 font-medium leading-relaxed">
                        {activeRecord.coreRevelation}
                      </p>
                    </div>

                    {/* Butterfly Effect Forecast */}
                    <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                      <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 mb-1">
                        <span>🦋</span> DỰ BÁO HIỆU ỨNG CÁNH BƯỚM & PHẢN ỨNG DÂY CHUYỀN:
                      </div>
                      <p className="text-xs text-cyan-100/90 leading-relaxed">
                        {activeRecord.butterflyForecast}
                      </p>
                    </div>
                  </div>

                  {/* 3-Layer Deduction Steps Graph */}
                  <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-3">
                    <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span>🧬</span> QUY TRÌNH LAN TRUYỀN QUA 3 LỚP THẦN KINH
                      </span>
                      <span className="text-[11px] text-gray-400">Tự động đối chiếu quy luật đã học</span>
                    </div>

                    <div className="space-y-2.5">
                      {activeRecord.deductionChain.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-gray-950/90 border border-gray-800 hover:border-purple-500/40 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-purple-900/80 text-purple-200 flex items-center justify-center text-[10px] font-mono">
                                {step.stepOrder}
                              </span>
                              {step.layerName}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                              Độ tin cậy: {step.confidenceScore}%
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded bg-gray-900/50 border border-gray-800/80">
                              <div className="text-[10px] text-gray-400 mb-0.5 font-semibold">Tín Hiệu / Quan Sát:</div>
                              <p className="text-gray-300 text-[11px]">{step.observation}</p>
                            </div>
                            <div className="p-2 rounded bg-purple-950/20 border border-purple-500/20">
                              <div className="text-[10px] text-purple-300 mb-0.5 font-semibold">Suy Diễn Nơ-ron:</div>
                              <p className="text-purple-100 text-[11px] font-medium">{step.inference}</p>
                            </div>
                          </div>

                          {/* Synapse Tags */}
                          {step.activatedSynapses && step.activatedSynapses.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1 pt-1">
                              <span className="text-[10px] text-gray-500 font-mono">Synapses:</span>
                              {step.activatedSynapses.map((syn, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-gray-900 text-purple-300 border border-purple-500/30 font-medium"
                                >
                                  #{syn}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Narrative Expansion Outline */}
                  <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🌱</span> DÀN Ý PHÁT TRIỂN TIẾP DIỄN CỐT TRUYỆN:
                    </div>
                    <div className="space-y-1.5">
                      {activeRecord.narrativeExpansionOutline.map((beat, bIdx) => (
                        <div key={bIdx} className="p-2 rounded-lg bg-gray-950 border border-gray-800/80 text-xs text-gray-200 flex items-start gap-2">
                          <span className="text-amber-400 font-bold font-mono">Hồi {bIdx + 1}:</span>
                          <span className="leading-relaxed">{beat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Synthesized Prose Snippet */}
                  <div className="p-4 rounded-xl bg-gradient-to-b from-gray-900 to-gray-950 border border-purple-500/40 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                        <span>✍️</span> TRÍCH ĐOẠN VĂN HỌC MẪU ĐỈNH CAO (TỪ KẾT QUẢ SUY DIỄN)
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(activeRecord.synthesizedProseDraft);
                            alert('Đã sao chép đoạn văn mẫu!');
                          }}
                          className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition"
                        >
                          📋 Sao Chép
                        </button>
                        <button
                          onClick={() => {
                            onInsertText(activeRecord.synthesizedProseDraft);
                            alert('Đã chèn đoạn văn vào bản thảo chương hiện tại!');
                          }}
                          className="px-2.5 py-1 rounded bg-purple-800 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center gap-1 shadow"
                        >
                          <span>✍️</span> Chèn Vào Bản Thảo
                        </button>
                        {onCreateChapter && (
                          <button
                            onClick={() => {
                              const newTitle = `Hồi Diễn: ${activeRecord.coreRevelation.slice(0, 30)}...`;
                              onCreateChapter(
                                newTitle,
                                activeRecord.synthesizedProseDraft,
                                activeRecord.coreRevelation
                              );
                              alert('Đã tạo một chương mới trên cây cốt truyện từ suy diễn này!');
                            }}
                            className="px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1 shadow"
                          >
                            <span>🌱</span> Tạo Chương Mới
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-gray-950 border border-gray-800 text-xs text-gray-200 leading-relaxed font-serif whitespace-pre-line max-h-72 overflow-y-auto">
                      {activeRecord.synthesizedProseDraft}
                    </div>
                  </div>

                  {/* REINFORCEMENT & SELF-LEARNING INTERFACE (Huấn Luyện Tự Học) */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-gray-950 border border-indigo-500/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                        <span>🔁</span> HUẤN LUYỆN LAN TRUYỀN NGƯỢC & TỰ HỌC (REINFORCEMENT)
                      </div>
                      <span className="text-[10px] text-gray-400">
                        Đánh giá của bạn sẽ cập nhật trọng số nơ-ron và bổ sung quy tắc cho các lần suy diễn sau
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-950/70 p-3 rounded-lg border border-gray-800">
                      {/* Star Rating */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-300 font-semibold">Chất lượng suy diễn:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              onClick={() => setUserRating(star)}
                              className={`text-lg transition ${star <= userRating ? 'text-amber-400 scale-110' : 'text-gray-600 hover:text-gray-400'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-mono font-bold text-amber-300 ml-1">
                          {userRating === 5 ? 'Thần Bút (Xuất sắc)' : userRating === 4 ? 'Chặt Chẽ (Khá)' : userRating === 3 ? 'Bình Thường' : 'Cần Chỉnh Sửa'}
                        </span>
                      </div>

                      {/* Reinforce Button */}
                      <button
                        onClick={handleReinforceAndLearn}
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
                      >
                        <span>🧬</span> Cập Nhật Trọng Số & Rút Kinh Nghiệm
                      </button>
                    </div>

                    {/* Author Critique Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-gray-400 font-medium">
                        Bài học / Nhận xét của tác giả (Nếu có, hệ thống sẽ tự động đúc rút thành Tiên Đề mới):
                      </label>
                      <input
                        type="text"
                        value={userCritique}
                        onChange={e => setUserCritique(e.target.value)}
                        placeholder="Ví dụ: Cực kỳ thích chi tiết chén trà; lần sau khi đàm đạo với phản diện nên thêm cử chỉ ánh mắt..."
                        className="w-full p-2 bg-gray-950 border border-gray-800 rounded-lg text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {feedbackSuccessNotice && (
                      <div className="p-2 rounded bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 font-medium animate-pulse">
                        {feedbackSuccessNotice}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center rounded-xl bg-gray-900/40 border border-dashed border-gray-800 space-y-3">
                  <div className="text-4xl">🔮</div>
                  <h3 className="text-base font-bold text-gray-300">Chưa kích hoạt lượt suy diễn nào</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto">
                    Chọn loại suy diễn ở cột bên trái và bấm nút "KÍCH HOẠT SUY DIỄN & PHÁT TRIỂN NỘI DUNG" để mạng nơ-ron thực hiện lan truyền qua 3 tầng phân tích.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: NGÂN HÀNG BỘ NHỚ NƠ-RON & CÁC QUY TẮC ĐÃ TỰ HỌC */}
        {/* ========================================================================= */}
        {activeTab === 'memoryBank' && (
          <div className="space-y-4">
            {/* Header Description & Filter */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/50 via-gray-900 to-gray-950 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-indigo-200 flex items-center gap-1.5">
                  <span>🧬</span> NGÂN HÀNG TIÊN ĐỀ NGHỆ THUẬT SÁNG TÁC ĐÃ TỰ HỌC
                </h3>
                <p className="text-xs text-gray-400">
                  Đây là các quy luật do mạng thần kinh tự động trích xuất và tối ưu hóa qua từng chu kỳ huấn luyện (Epoch) từ những lần suy diễn thành công.
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                {['ALL', 'CAUSALITY', 'CHARACTER_PSYCHOLOGY', 'PLOT_PACING', 'LITERARY_TONE', 'SUBVERSION'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setAxiomFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                      axiomFilterCategory === cat
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-gray-900 text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat === 'ALL' ? 'Tất Cả' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Axiom Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAxioms.map(axiom => (
                <div
                  key={axiom.id}
                  className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/30 font-bold">
                        {axiom.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-300 text-xs font-bold">
                        <span>⭐</span> {axiom.effectivenessRating.toFixed(1)}
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-gray-100 leading-snug">
                      {axiom.ruleSummary}
                    </h4>

                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {axiom.detailedInsight}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[10px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <span>Epoch {axiom.learnedAtEpoch}</span> • <span>Đã áp dụng: {axiom.timesApplied} lần</span>
                    </span>
                    <span className="font-mono font-bold text-amber-400">
                      Trọng số: {axiom.weight.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Evolution Log of the Neural Network */}
            <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-3">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span>📈</span> NHẬT KÝ TIẾN HÓA MẠNG THẦN KINH QUA CÁC THẾ HỆ (EPOCHS)
              </div>
              <div className="space-y-2">
                {learningState.evolutionLog.map((log, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-gray-950 border border-gray-800 flex flex-wrap items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 text-[10px]">
                        Epoch {log.epoch}
                      </span>
                      <span className="text-gray-300 font-semibold">{log.trigger}</span>
                      <span className="text-gray-500 text-[11px]">({log.timestamp})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-[11px] text-gray-400 max-w-md line-clamp-1">{log.summary}</p>
                      <span className="text-emerald-400 font-mono font-bold text-[11px]">
                        +{log.qualityGain} Q-Boost
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TRỌNG SỐ & KIẾN TRÚC MẠNG NƠ-RON */}
        {/* ========================================================================= */}
        {activeTab === 'weightsArchitecture' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-gray-950 border border-pink-500/30 space-y-2">
              <h3 className="text-sm font-bold text-pink-200 flex items-center gap-1.5">
                <span>🎛️</span> MA TRẬN TRỌNG SỐ LIÊN KẾT NƠ-RON (SYNAPSE WEIGHT MATRIX)
              </h3>
              <p className="text-xs text-gray-400">
                Mỗi tham số điều khiển mức độ ưu tiên của các lớp nơ-ron trong quá trình lan truyền xuôi. Trọng số tự động thích ứng sau mỗi lần bạn đánh giá bản ghi suy diễn.
              </p>
            </div>

            {/* Sliders / Visual Weight Gauges */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  key: 'causalityRigor',
                  label: 'Độ Chặt Chẽ Nhân Quả',
                  desc: 'Loại bỏ tình tiết buff vô lý, ràng buộc chuỗi nguyên nhân - kết quả thép.',
                  color: 'from-blue-600 to-indigo-600',
                  val: learningState.weights.causalityRigor
                },
                {
                  key: 'surpriseFactor',
                  label: 'Yếu Tố Bất Ngờ & Đột Phá',
                  desc: 'Tạo bước ngoặt lật ngược tình thế ngoài dự đoán của người đọc.',
                  color: 'from-amber-500 to-yellow-500',
                  val: learningState.weights.surpriseFactor
                },
                {
                  key: 'emotionalDepth',
                  label: 'Chiều Sâu Tâm Lý & Triết Lý',
                  desc: 'Bóc tách động cơ ngầm, bi kịch nội tâm và sự giằng xé đạo đức.',
                  color: 'from-purple-600 to-pink-600',
                  val: learningState.weights.emotionalDepth
                },
                {
                  key: 'proseSophistication',
                  label: 'Bút Lực Văn Phong Điển Nhã',
                  desc: 'Từ ngữ hàm súc, giàu hình tượng, nhịp văn biến hóa theo bối cảnh.',
                  color: 'from-emerald-600 to-teal-600',
                  val: learningState.weights.proseSophistication
                },
                {
                  key: 'worldConsistency',
                  label: 'Nhất Quán Thiết Lập Thế Giới',
                  desc: 'Tuân thủ nghiêm ngặt cấp bậc tu vi, quy tắc địa lý và trật tự linh lực.',
                  color: 'from-cyan-600 to-blue-600',
                  val: learningState.weights.worldConsistency
                },
                {
                  key: 'tensionMomentum',
                  label: 'Nhịp Điệu Căng Thẳng Cao Trào',
                  desc: 'Điều tiết nhịp thở câu chuyện, dồn nén mâu thuẫn đến điểm nổ.',
                  color: 'from-rose-600 to-red-600',
                  val: learningState.weights.tensionMomentum
                }
              ].map(gauge => (
                <div key={gauge.key} className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-200">{gauge.label}</span>
                    <span className="font-mono font-bold text-amber-300 text-xs">
                      {(gauge.val * 100).toFixed(0)}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-gray-950 overflow-hidden border border-gray-800">
                    <div
                      className={`h-full bg-gradient-to-r ${gauge.color} transition-all duration-500`}
                      style={{ width: `${gauge.val * 100}%` }}
                    />
                  </div>

                  <p className="text-[10px] text-gray-400 leading-relaxed">{gauge.desc}</p>
                </div>
              ))}
            </div>

            {/* Neural Topology Diagram Preview */}
            <div className="p-4 rounded-xl bg-gray-900/60 border border-gray-800 space-y-3">
              <div className="text-xs font-bold text-purple-300 flex items-center justify-between">
                <span>🌐 SƠ ĐỒ TOPO MẠNG NƠ-RON LAN TRUYỀN XUÔI & NGƯỢC</span>
                <span className="text-[10px] text-gray-400">Kiến trúc 3 Lớp Ẩn (Tri-Layer Hidden Causality)</span>
              </div>

              <div className="p-4 rounded-xl bg-gray-950 border border-purple-500/20 grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 rounded-lg bg-gray-900/80 border border-gray-800 space-y-1">
                  <div className="font-bold text-cyan-300">Lớp Nhận Thức</div>
                  <div className="text-[10px] text-gray-400">Sensory Inputs</div>
                  <div className="text-[11px] text-gray-300">Manh Mối • Tín Vật • Mâu Thuẫn Bề Mặt</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-900/80 border border-gray-800 space-y-1">
                  <div className="font-bold text-purple-300">Lớp Nhân Quả Ẩn</div>
                  <div className="text-[10px] text-gray-400">Latent Causality</div>
                  <div className="text-[11px] text-gray-300">Động Cơ Ngầm • Bẫy Tâm Lý • Bàn Cờ Lợi Ích</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-900/80 border border-gray-800 space-y-1">
                  <div className="font-bold text-pink-300">Lớp Cánh Bướm</div>
                  <div className="text-[10px] text-gray-400">Domino Projection</div>
                  <div className="text-[11px] text-gray-300">Dự Báo Hệ Quả • Bước Ngoặt Biến Số</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-900/80 border border-amber-500/40 space-y-1">
                  <div className="font-bold text-amber-300">Lớp Kiến Tạo Đầu Ra</div>
                  <div className="text-[10px] text-amber-400/80">Prose Synthesis</div>
                  <div className="text-[11px] text-gray-200">Bản Thảo Hoàn Chỉnh • Dàn Ý Phân Hồi</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: LỊCH SỬ SUY DIỄN & HỒI QUY */}
        {/* ========================================================================= */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-200">
                Toàn bộ {learningState.inferenceRecords.length} Bản Ghi Suy Diễn Đã Lưu Trữ
              </span>
              <span className="text-[11px] text-gray-400">
                Bấm vào một bản ghi để xem chi tiết hoặc chèn lại vào bản thảo
              </span>
            </div>

            <div className="space-y-2">
              {learningState.inferenceRecords.map(rec => (
                <div
                  key={rec.id}
                  onClick={() => {
                    setActiveRecord(rec);
                    setActiveTab('inference');
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-2 ${
                    activeRecord?.id === rec.id
                      ? 'bg-purple-950/60 border-purple-400 shadow-md'
                      : 'bg-gray-900/80 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${INFERENCE_TYPE_CONFIG[rec.inferenceType]?.badgeColor || 'bg-gray-800 text-gray-300'}`}>
                        {INFERENCE_TYPE_CONFIG[rec.inferenceType]?.icon} {INFERENCE_TYPE_CONFIG[rec.inferenceType]?.label}
                      </span>
                      <span className="text-xs font-bold text-gray-200">{rec.sourceChapterTitle}</span>
                      <span className="text-[10px] text-gray-400">Epoch {rec.epoch} • {rec.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-300 line-clamp-1">{rec.coreRevelation}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {rec.authorRating && (
                      <span className="text-amber-400 font-bold">
                        {'★'.repeat(rec.authorRating)}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-gray-950 text-purple-300 border border-purple-500/30 text-[11px] font-mono">
                      {rec.confidenceIndex}% tin cậy
                    </span>
                    <button className="px-2.5 py-1 rounded bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-xs font-bold">
                      Xem Chi Tiết ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
