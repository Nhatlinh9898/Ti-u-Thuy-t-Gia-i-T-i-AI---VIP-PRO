import React, { useState } from 'react';
import {
  TalismanDaoCanonItem,
  CharacterProfile,
  TalismanDrawingMethod,
  TalismanTechniqueRank,
  TalismanStanceTechnique,
  TalismanMethodItem
} from '../types';
import { PRESET_TALISMAN_DAO_CANONS } from '../data/presetTalismanDaoCanons';
import {
  TALISMAN_DRAWING_METHODS,
  TALISMAN_TECHNIQUE_RANKS,
  TALISMAN_STANCE_TECHNIQUES
} from '../data/talismanArtsSystemData';
import { simulateTalismanEnlightenment } from '../services/geminiService';
import { Spinner } from './Spinner';

interface TalismanDaoStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const TalismanDaoStudio: React.FC<TalismanDaoStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText
}) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'methods' | 'stances' | 'ranks' | 'visualizer' | 'canons' | 'altar' | 'simulation'
  >('methods');

  // Canons state
  const [canons] = useState<TalismanDaoCanonItem[]>(PRESET_TALISMAN_DAO_CANONS);
  const [selectedCanonId, setSelectedCanonId] = useState<string>(PRESET_TALISMAN_DAO_CANONS[0].id);
  const [selectedTalismanIndex, setSelectedTalismanIndex] = useState<number>(0);

  // Drawing Methods state
  const [selectedMethodId, setSelectedMethodId] = useState<string>(TALISMAN_DRAWING_METHODS[0].id);

  // Stances state
  const [selectedStanceId, setSelectedStanceId] = useState<string>(TALISMAN_STANCE_TECHNIQUES[0].id);

  // Ranks state
  const [selectedRankTier, setSelectedRankTier] = useState<number>(1);
  const [enlightenmentEpiphanyText, setEnlightenmentEpiphanyText] = useState<string | null>(null);

  // Interactive Visualizer state
  const [visualizerPhase, setVisualizerPhase] = useState<number>(1); // 1: Khởi Bút, 2: Họa Mạch, 3: Điểm Nhãn, 4: Quán Khí, 5: Kích Nổ
  const [visualizerAuraColor, setVisualizerAuraColor] = useState<'gold' | 'purple' | 'red' | 'cyan' | 'green'>('gold');
  const [isAnimatingStroke, setIsAnimatingStroke] = useState<boolean>(false);

  // Simulation state
  const [simCharId, setSimCharId] = useState<string>(characters[0]?.id || 'char_lingxiao');
  const [opponent, setOpponent] = useState<string>('Thủ lĩnh Yêu Thú Tứ Giai bao vây tại Hắc Phong Cốc');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const selectedCanon = canons.find(c => c.id === selectedCanonId) || canons[0];
  const selectedTalisman = selectedCanon.talismans[selectedTalismanIndex] || selectedCanon.talismans[0];
  const selectedDrawingMethod = TALISMAN_DRAWING_METHODS.find(m => m.id === selectedMethodId) || TALISMAN_DRAWING_METHODS[0];
  const selectedStance = TALISMAN_STANCE_TECHNIQUES.find(s => s.id === selectedStanceId) || TALISMAN_STANCE_TECHNIQUES[0];
  const selectedRank = TALISMAN_TECHNIQUE_RANKS.find(r => r.tierNumber === selectedRankTier) || TALISMAN_TECHNIQUE_RANKS[0];

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const chosenChar = characters.find(c => c.id === simCharId);
      const res = await simulateTalismanEnlightenment({
        character: chosenChar,
        talismanCanon: selectedCanon,
        method: selectedTalisman,
        drawingMethod: selectedDrawingMethod,
        techniqueRank: selectedRank,
        stance: selectedStance,
        opponent,
        genre
      });
      setSimulationResult(res);
      setActiveTab('simulation');
    } catch (err: any) {
      alert('Lỗi mô phỏng phù lục: ' + err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleTriggerEpiphany = (rank: TalismanTechniqueRank) => {
    setEnlightenmentEpiphanyText(
      `✨ [ĐỐN NGỘ THÀNH CÔNG - CẢNH GIỚI ĐỘT PHÁ]:\n` +
      `Tâm cảnh rung chuyển dữ dội! Trong khoảnh khắc đối mặt sinh tử, linh đài sáng rực:\n` +
      `"${rank.enlightenmentEpiphany}"\n\n` +
      `Toàn bộ 108 khiếu huyệt mở toang, chân nguyên tuôn trào như thác lũ. ` +
      `Từ nay về sau, khi chấp bút hạ nét, ${rank.stances[0]?.name || 'chiêu thức'} đã đạt tới cảnh giới thông huyền!`
    );
  };

  const getAuraColorClass = (color: string) => {
    switch (color) {
      case 'purple':
        return 'from-purple-500 via-fuchsia-400 to-indigo-600 border-purple-400 text-purple-300';
      case 'red':
        return 'from-red-600 via-rose-500 to-amber-700 border-red-500 text-red-300';
      case 'cyan':
        return 'from-cyan-400 via-teal-300 to-blue-600 border-cyan-400 text-cyan-300';
      case 'green':
        return 'from-emerald-400 via-teal-400 to-green-600 border-emerald-400 text-emerald-300';
      default:
        return 'from-amber-400 via-yellow-300 to-orange-500 border-amber-400 text-amber-300';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-amber-950/40 to-gray-950 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📜</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 tracking-wide">
              PHÙ ĐẠO HUYỀN BÍ PHÁP ĐIỂN & THUẬT PHÁP VẼ BÙA
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
              GRAND TALISMAN DAO SYSTEM
            </span>
          </div>
          <p className="text-xs text-amber-300/80 mt-0.5">
            Trường phái vẽ phù, bộ pháp vận khí Đạp Cương Đẩu Bộ, 6 cấp bậc tu luyện & đốn ngộ từ phàm nhân tới thần thánh
          </p>
        </div>

        {/* Tab Navigation Ribbon */}
        <div className="flex items-center flex-wrap gap-1 bg-gray-900/90 p-1 rounded-xl border border-purple-500/30 text-xs">
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'methods'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🔮</span> Trường Phái Vẽ Phù
          </button>
          <button
            onClick={() => setActiveTab('stances')}
            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'stances'
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🥋</span> Chiêu Thức & Bộ Pháp
          </button>
          <button
            onClick={() => setActiveTab('ranks')}
            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'ranks'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>⚡</span> 6 Cấp Bậc & Đốn Ngộ
          </button>
          <button
            onClick={() => setActiveTab('visualizer')}
            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'visualizer'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🖌️</span> Vận Khí & Bút Pháp
          </button>
          <button
            onClick={() => setActiveTab('canons')}
            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'canons'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>📜</span> Phù Điển Cổ Đại
          </button>
          <button
            onClick={() => setActiveTab('altar')}
            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'altar'
                ? 'bg-gradient-to-r from-pink-800 to-rose-800 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🏮</span> Đàn Tế & Hoàng Đạo
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
              activeTab === 'simulation'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>✨</span> Mô Phỏng Thực Chiến AI
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* ================= TAB 1: CÁC PHƯƠNG PHÁP VẼ PHÙ LỤC ================= */}
        {activeTab === 'methods' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left list of methods */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-3 space-y-2 overflow-y-auto custom-scrollbar">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">
                7 ĐẠI PHƯƠNG PHÁP VẼ BÙA CHÍNH TÔNG & MA ĐẠO:
              </span>
              {TALISMAN_DRAWING_METHODS.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethodId(method.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedMethodId === method.id
                      ? 'bg-amber-950/70 border-amber-400 shadow-md ring-1 ring-amber-400/30'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                      {method.speedRating}
                    </span>
                  </div>
                  <h4 className="font-bold text-xs text-white mt-1.5">{method.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">{method.schoolName}</p>
                </div>
              ))}
            </div>

            {/* Right details of selected method */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
              <div className="p-5 rounded-2xl bg-gray-950/90 border border-amber-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                      {selectedDrawingMethod.schoolName}
                    </span>
                    <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400">
                      {selectedDrawingMethod.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedStanceId(TALISMAN_STANCE_TECHNIQUES[0].id);
                        setActiveTab('stances');
                      }}
                      className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300"
                    >
                      Xem Chiêu Thức Tương Ứng
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          const note = `【PHƯƠNG THỨC VẼ PHÙ: ${selectedDrawingMethod.name}】\n` +
                            `• Môn phái: ${selectedDrawingMethod.schoolName}\n` +
                            `• Tốc độ: ${selectedDrawingMethod.speedRating}\n` +
                            `• Chất liệu môi giới: ${selectedDrawingMethod.carrierMedium}\n` +
                            `• Cơ chế cốt lõi: ${selectedDrawingMethod.essenceMechanism}\n` +
                            `• Thân pháp vận hành: ${selectedDrawingMethod.executionDynamics}\n` +
                            `• Chìa khóa đốn ngộ: "${selectedDrawingMethod.enlightenmentKey}"`;
                          onInsertText(note);
                          alert('Đã chèn mô tả phương pháp vẽ vào bản thảo!');
                        }}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 rounded-xl text-xs font-bold text-white shadow"
                      >
                        Chèn vào truyện
                      </button>
                    )}
                  </div>
                </div>

                {/* Core Mechanism & Carrier */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1.5">
                      <span>📜</span> Môi Giới & Chất Liệu Vật Mang:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{selectedDrawingMethod.carrierMedium}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                    <strong className="text-yellow-300 flex items-center gap-1.5">
                      <span>⚡</span> Tốc Độ Thi Triển Chiến Trường:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{selectedDrawingMethod.speedRating}</p>
                  </div>
                </div>

                {/* Essence Mechanism */}
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10 text-xs space-y-1">
                  <strong className="text-cyan-300 block font-bold">
                    Cơ Chế Vận Hành Nguyên Khí & Đạo Ngân:
                  </strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedDrawingMethod.essenceMechanism}</p>
                </div>

                {/* Dynamics */}
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10 text-xs space-y-1">
                  <strong className="text-orange-300 block font-bold">
                    Thân Pháp Di Chuyển & Cử Động Khi Thi Triển:
                  </strong>
                  <p className="text-gray-300 leading-relaxed">{selectedDrawingMethod.executionDynamics}</p>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                    <strong className="text-emerald-300 flex items-center gap-1">
                      <span>✅</span> Ưu thế đột xuất:
                    </strong>
                    <p className="text-emerald-100/90 leading-relaxed">{selectedDrawingMethod.prosAndCons.advantages}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1">
                    <strong className="text-rose-300 flex items-center gap-1">
                      <span>⚠️</span> Nhược điểm & Hạn chế:
                    </strong>
                    <p className="text-rose-100/90 leading-relaxed">{selectedDrawingMethod.prosAndCons.disadvantages}</p>
                  </div>
                </div>

                {/* Enlightenment Key & Practitioners */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">💡</span>
                    <strong className="text-purple-300 text-sm">Chìa Khóa Đốn Ngộ (Enlightenment Key):</strong>
                  </div>
                  <p className="text-purple-100 italic text-sm leading-relaxed">
                    "{selectedDrawingMethod.enlightenmentKey}"
                  </p>
                  <div className="pt-2 border-t border-purple-500/20 text-gray-400 text-[11px]">
                    <strong>Nhân vật tiêu biểu áp dụng:</strong> {selectedDrawingMethod.famousPractitioners}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CHIÊU THỨC & BỘ PHÁP DI CHUYỂN ================= */}
        {activeTab === 'stances' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left list of stances */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-3 space-y-2 overflow-y-auto custom-scrollbar">
              <span className="text-[10px] font-mono uppercase text-orange-400 font-bold block mb-1">
                BỘ THUẬT PHÁP CHIÊU THỨC & THỦ ẤN:
              </span>
              {TALISMAN_STANCE_TECHNIQUES.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStanceId(st.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedStanceId === st.id
                      ? 'bg-orange-950/70 border-orange-400 shadow-md ring-1 ring-orange-400/30'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">
                      {st.category}
                    </span>
                    <span className="text-gray-400">{st.rankLevel}</span>
                  </div>
                  <h4 className="font-bold text-xs text-white mt-1.5">{st.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 italic">{st.poeticTitle}</p>
                </div>
              ))}
            </div>

            {/* Right details of selected stance */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
              <div className="p-5 rounded-2xl bg-gray-950/90 border border-orange-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-bold">
                        {selectedStance.category}
                      </span>
                      <span className="text-xs text-gray-400">Yêu cầu cảnh giới: {selectedStance.rankLevel}</span>
                    </div>
                    <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 mt-1">
                      {selectedStance.name}
                    </h3>
                    <p className="text-xs text-amber-200/90 italic mt-0.5">"{selectedStance.poeticTitle}"</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTab('visualizer');
                      }}
                      className="px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-orange-500/40 rounded-xl text-xs font-bold text-orange-300"
                    >
                      Mô Phỏng Nét Bút
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          const note = `【CHIÊU THỨC VẼ PHÙ: ${selectedStance.name}】\n` +
                            `• Khẩu quyết: ${selectedStance.poeticTitle}\n` +
                            `• Bộ pháp di chuyển: ${selectedStance.footworkMovement}\n` +
                            `• Thủ ấn & cầm bút: ${selectedStance.handSealAndGrip}\n` +
                            `• Vận hành kinh mạch: ${selectedStance.meridianQiOperation}\n` +
                            `• Quỹ đạo nét bút: ${selectedStance.brushTrajectory}\n` +
                            `• Chân ngôn âm ba: "${selectedStance.incantationSound}"\n` +
                            `• Ứng dụng thực chiến: ${selectedStance.tacticalCombatUsage}\n` +
                            `• Dị tượng thị giác: ${selectedStance.visualAuraDescription}`;
                          onInsertText(note);
                          alert('Đã chèn chi tiết chiêu thức vào bản thảo!');
                        }}
                        className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 rounded-xl text-xs font-bold text-white shadow"
                      >
                        Chèn vào truyện
                      </button>
                    )}
                  </div>
                </div>

                {/* Footwork & Hand Seal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-white/5 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1.5 font-bold">
                      <span>👣</span> Bộ Pháp Di Chuyển (Footwork Movement):
                    </strong>
                    <p className="text-gray-300 leading-relaxed text-sm">{selectedStance.footworkMovement}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-white/5 space-y-1">
                    <strong className="text-orange-300 flex items-center gap-1.5 font-bold">
                      <span>✋</span> Thủ Ấn & Thế Cầm Bút (Hand Seal & Grip):
                    </strong>
                    <p className="text-gray-300 leading-relaxed text-sm">{selectedStance.handSealAndGrip}</p>
                  </div>
                </div>

                {/* Meridian Qi Operation */}
                <div className="p-4 rounded-xl bg-gray-900/90 border border-cyan-500/30 text-xs space-y-1">
                  <strong className="text-cyan-300 flex items-center gap-1.5 font-bold text-sm">
                    <span>⚡</span> Vận Hành Kinh Mạch & Huyệt Vị (Meridian Qi Flow):
                  </strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedStance.meridianQiOperation}</p>
                </div>

                {/* Brush Trajectory */}
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/10 text-xs space-y-1">
                  <strong className="text-yellow-300 flex items-center gap-1.5 font-bold">
                    <span>🖌️</span> Quỹ Đạo Nét Bút (Brush Trajectory):
                  </strong>
                  <p className="text-gray-300 leading-relaxed">{selectedStance.brushTrajectory}</p>
                </div>

                {/* Incantation & Combat Usage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-purple-500/20 space-y-1">
                    <strong className="text-purple-300 flex items-center gap-1.5 font-bold">
                      <span>🗣️</span> Khẩu Quyết Chân Ngôn & Âm Ba:
                    </strong>
                    <p className="text-purple-200 italic font-mono text-sm">{selectedStance.incantationSound}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-900/90 border border-white/5 space-y-1">
                    <strong className="text-red-300 flex items-center gap-1.5 font-bold">
                      <span>⚔️</span> Ứng Dụng Chiến Thuật Thực Chiến:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{selectedStance.tacticalCombatUsage}</p>
                  </div>
                </div>

                {/* Visual Aura */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-gray-900 to-amber-950/40 border border-amber-500/30 text-xs space-y-1">
                  <strong className="text-amber-300 flex items-center gap-1.5 font-bold">
                    <span>🌟</span> Dị Tượng Thị Giác & Sóng Xung Kích:
                  </strong>
                  <p className="text-gray-200 leading-relaxed">{selectedStance.visualAuraDescription}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: HỆ THỐNG 6 CẤP BẬC & ĐỐN NGỘ ================= */}
        {activeTab === 'ranks' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
            {/* Tier Selector Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {TALISMAN_TECHNIQUE_RANKS.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRankTier(r.tierNumber);
                    setEnlightenmentEpiphanyText(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedRankTier === r.tierNumber
                      ? 'bg-purple-950/80 border-purple-400 shadow-lg ring-1 ring-purple-400/50'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold block mb-1">
                    BẬC {r.tierNumber}: {r.tierName}
                  </span>
                  <h4 className="font-bold text-xs text-white line-clamp-1">{r.masteryTitle}</h4>
                  <span className="text-[10px] text-gray-400 block mt-1 line-clamp-1">{r.cultivationRealmReq}</span>
                </button>
              ))}
            </div>

            {/* Rank Details Card */}
            <div className="p-6 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                      CẤP BẬC {selectedRank.tierNumber}: {selectedRank.tierName}
                    </span>
                    <span className="text-xs text-amber-300">Cảnh giới: {selectedRank.cultivationRealmReq}</span>
                  </div>
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-200 mt-1">
                    {selectedRank.masteryTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTriggerEpiphany(selectedRank)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 rounded-xl text-xs font-bold text-white shadow-lg flex items-center gap-1.5 transition-all"
                  >
                    <span>⚡</span> Kích Hoạt Đốn Ngộ Đột Phá!
                  </button>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        const note = `【HỆ THỐNG CẤP BẬC PHÙ ĐẠO: ${selectedRank.tierName} - ${selectedRank.masteryTitle}】\n` +
                          `• Cảnh giới tu vi yêu cầu: ${selectedRank.cultivationRealmReq}\n` +
                          `• Khổ luyện & Rèn giũa: ${selectedRank.trainingAndTempering}\n` +
                          `• Cơ duyên đốn ngộ: "${selectedRank.enlightenmentEpiphany}"\n` +
                          `• Sức chứa kinh mạch: ${selectedRank.meridianCapacity}\n` +
                          `• Hậu quả phản phệ: ${selectedRank.backfireRisk}`;
                        onInsertText(note);
                        alert('Đã chèn nội dung cấp bậc vào bản thảo!');
                      }}
                      className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-purple-500/40 rounded-xl text-xs font-bold text-purple-300"
                    >
                      Chèn vào truyện
                    </button>
                  )}
                </div>
              </div>

              {/* Epiphany Alert Banner if triggered */}
              {enlightenmentEpiphanyText && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/80 via-pink-950/70 to-amber-950/80 border border-purple-400 shadow-xl space-y-2 animate-fadeIn">
                  <h4 className="text-sm font-bold text-vip-gold flex items-center gap-2">
                    <span>🌟</span> ĐỐN NGỘ TÂM CẢNH BỘT PHÁT!
                  </h4>
                  <p className="text-xs text-purple-100 whitespace-pre-line leading-relaxed font-serif">
                    {enlightenmentEpiphanyText}
                  </p>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        onInsertText(enlightenmentEpiphanyText);
                        alert('Đã chèn phân cảnh đốn ngộ vào chương truyện!');
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-[11px] font-bold text-white"
                    >
                      Chèn phân cảnh đốn ngộ này vào truyện
                    </button>
                  )}
                </div>
              )}

              {/* Training and Epiphany description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-900/90 border border-white/5 space-y-1.5">
                  <strong className="text-amber-300 flex items-center gap-1.5 text-sm font-bold">
                    <span>🔨</span> Quá Trình Rèn Luyện & Khổ Tu (Tempering):
                  </strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedRank.trainingAndTempering}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-900/90 border border-purple-500/20 space-y-1.5">
                  <strong className="text-purple-300 flex items-center gap-1.5 text-sm font-bold">
                    <span>💡</span> Bí Quyết & Cơ Duyên Đốn Ngộ (Epiphany Insight):
                  </strong>
                  <p className="text-purple-100 italic leading-relaxed text-sm">
                    "{selectedRank.enlightenmentEpiphany}"
                  </p>
                </div>
              </div>

              {/* Meridian and Backfire */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-900/90 border border-cyan-500/20 space-y-1">
                  <strong className="text-cyan-300 flex items-center gap-1 font-bold">
                    <span>🌊</span> Sức Chịu Đựng Kinh Mạch & Thần Thức:
                  </strong>
                  <p className="text-gray-300 leading-relaxed">{selectedRank.meridianCapacity}</p>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-1">
                  <strong className="text-rose-400 flex items-center gap-1 font-bold">
                    <span>⚠️</span> Hậu Quả Thất Bại & Phản Phệ Kinh Mạch:
                  </strong>
                  <p className="text-rose-200/90 leading-relaxed">{selectedRank.backfireRisk}</p>
                </div>
              </div>

              {/* Sample Talismans of this rank */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-gray-400 font-bold">
                  Các Đạo Phù Tiêu Biểu Trong Cấp Bậc Này:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedRank.sampleTalismans.map((tl, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-gray-900/80 border border-white/5 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400 font-bold">{tl.gradeLevel}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">{tl.talismanName}</h5>
                      <p className="text-gray-300 text-[11px] leading-relaxed">{tl.effectMagnitude}</p>
                      <div className="pt-2 border-t border-white/5 text-[10px] text-gray-400 italic">
                        <strong>Công thức mực:</strong> {tl.cinnabarAndInkRecipe}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: MÔ PHỎNG NÉT BÚT TRỰC QUAN & VẬN KHÍ ================= */}
        {activeTab === 'visualizer' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Canvas Panel (7 cols) */}
              <div className="lg:col-span-7 flex flex-col space-y-4">
                <div className="p-4 rounded-2xl bg-gray-950 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                        INTERACTIVE TALISMAN RUNE WORKSHOP
                      </span>
                      <h3 className="text-base font-bold text-vip-gold">
                        MÔ PHỎNG QUỸ ĐẠO BÚT PHONG & VẬN KHÍ THỰC CHIẾN
                      </h3>
                    </div>

                    {/* Aura Color Picker */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setVisualizerAuraColor('gold')}
                        className={`w-6 h-6 rounded-full bg-amber-400 border ${
                          visualizerAuraColor === 'gold' ? 'ring-2 ring-white scale-110' : 'opacity-60'
                        }`}
                        title="Kim Sắc Đại Đạo"
                      />
                      <button
                        onClick={() => setVisualizerAuraColor('purple')}
                        className={`w-6 h-6 rounded-full bg-purple-500 border ${
                          visualizerAuraColor === 'purple' ? 'ring-2 ring-white scale-110' : 'opacity-60'
                        }`}
                        title="Tử Lôi Phá Ma"
                      />
                      <button
                        onClick={() => setVisualizerAuraColor('red')}
                        className={`w-6 h-6 rounded-full bg-rose-600 border ${
                          visualizerAuraColor === 'red' ? 'ring-2 ring-white scale-110' : 'opacity-60'
                        }`}
                        title="Huyết Sát Ma Triện"
                      />
                      <button
                        onClick={() => setVisualizerAuraColor('cyan')}
                        className={`w-6 h-6 rounded-full bg-cyan-400 border ${
                          visualizerAuraColor === 'cyan' ? 'ring-2 ring-white scale-110' : 'opacity-60'
                        }`}
                        title="Hư Không Băng Phù"
                      />
                    </div>
                  </div>

                  {/* The Talisman Visualizer Canvas Box */}
                  <div className="relative w-full aspect-[4/5] max-h-[460px] mx-auto rounded-xl bg-gradient-to-b from-amber-950/20 via-gray-950 to-gray-950 border-2 border-amber-500/40 p-4 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
                    {/* Background Talisman Paper Texture */}
                    <div className="absolute inset-4 rounded-lg border-2 border-dashed border-amber-600/40 pointer-events-none flex flex-col justify-between p-3 opacity-80">
                      <div className="flex justify-between text-[10px] text-amber-500/60 font-mono">
                        <span>CÀN ☰</span>
                        <span>TAM THANH ĐẠO ẤN</span>
                        <span>KHÔN ☷</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-amber-500/60 font-mono">
                        <span>LY ☲</span>
                        <span>CẤP CẤP NHƯ LUẬT LỆNH</span>
                        <span>KHẢM ☵</span>
                      </div>
                    </div>

                    {/* Dynamic SVG Talisman Rune Graph */}
                    <svg
                      viewBox="0 0 300 400"
                      className="w-full h-full max-w-[280px] drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                    >
                      {/* Outer Talisman Frame (Phù Khung) */}
                      <rect
                        x="30"
                        y="20"
                        width="240"
                        height="360"
                        rx="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className={getAuraColorClass(visualizerAuraColor)}
                      />

                      {/* Header Arch (Phù Đầu) */}
                      <path
                        d="M 50 60 Q 150 25 250 60"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className={getAuraColorClass(visualizerAuraColor)}
                      />

                      {/* Three Supreme Dots (Tam Thanh Nhãn) */}
                      <circle cx="110" cy="55" r="4" fill="#fbbf24" className="animate-ping" />
                      <circle cx="150" cy="45" r="5" fill="#f59e0b" />
                      <circle cx="190" cy="55" r="4" fill="#fbbf24" className="animate-ping" />

                      {/* Big Dipper 7 Stars (Thất Tinh Bắc Đẩu Trận Nhãn) */}
                      {visualizerPhase >= 3 && (
                        <g className="transition-all duration-700">
                          <polyline
                            points="80,100 110,120 140,115 165,140 200,135 220,165 240,155"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="2"
                            strokeDasharray="4"
                          />
                          <circle cx="80" cy="100" r="4" fill="#38bdf8" />
                          <circle cx="110" cy="120" r="4" fill="#38bdf8" />
                          <circle cx="140" cy="115" r="4" fill="#38bdf8" />
                          <circle cx="165" cy="140" r="4" fill="#38bdf8" />
                          <circle cx="200" cy="135" r="4" fill="#38bdf8" />
                          <circle cx="220" cy="165" r="4" fill="#38bdf8" />
                          <circle cx="240" cy="155" r="5" fill="#e0f2fe" className="animate-pulse" />
                        </g>
                      )}

                      {/* Main Rune Body Curves (Long Xà Họa Mạch) */}
                      {visualizerPhase >= 2 && (
                        <path
                          d="M 150 90 Q 70 150 150 190 T 150 280 Q 230 310 150 340"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          className={`${getAuraColorClass(visualizerAuraColor)} ${
                            isAnimatingStroke ? 'animate-pulse' : ''
                          }`}
                        />
                      )}

                      {/* Central Heart Core (Phù Đảm) */}
                      {visualizerPhase >= 4 && (
                        <g>
                          <circle
                            cx="150"
                            cy="210"
                            r="28"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="3"
                            className="animate-spin"
                            style={{ transformOrigin: '150px 210px', animationDuration: '6s' }}
                          />
                          <text
                            x="150"
                            y="218"
                            textAnchor="middle"
                            fill="#fef08a"
                            fontSize="24"
                            fontWeight="bold"
                            fontFamily="serif"
                          >
                            雷
                          </text>
                        </g>
                      )}

                      {/* Footer Tail (Phù Cước) */}
                      {visualizerPhase >= 5 && (
                        <g>
                          <path
                            d="M 110 330 L 150 365 L 190 330"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="4"
                            strokeLinecap="round"
                          />
                          <line x1="150" y1="365" x2="150" y2="385" stroke="#ef4444" strokeWidth="4" />
                        </g>
                      )}
                    </svg>

                    {/* Step Phase Indicator Overlay */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between bg-gray-950/90 px-3 py-1.5 rounded-lg border border-white/10 text-[11px]">
                      <span className="text-gray-400">Giai đoạn vẽ:</span>
                      <span className="font-bold text-amber-300">
                        {visualizerPhase === 1 && 'Giai Đoạn 1: Khởi Bút (Điểm Nhãn Tam Thanh)'}
                        {visualizerPhase === 2 && 'Giai Đoạn 2: Họa Mạch (Long Xà Du Cương)'}
                        {visualizerPhase === 3 && 'Giai Đoạn 3: Bắc Đẩu (Khóa Trận Thất Tinh)'}
                        {visualizerPhase === 4 && 'Giai Đoạn 4: Quán Thần (Ngưng Tụ Phù Đảm)'}
                        {visualizerPhase === 5 && 'Giai Đoạn 5: Định Hình & Sẵn Sàng Kích Nổ!'}
                      </span>
                    </div>
                  </div>

                  {/* Phase Stepper Buttons */}
                  <div className="flex items-center justify-between gap-1 pt-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <button
                        key={step}
                        onClick={() => {
                          setVisualizerPhase(step);
                          setIsAnimatingStroke(true);
                          setTimeout(() => setIsAnimatingStroke(false), 800);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          visualizerPhase === step
                            ? 'bg-amber-600 text-white shadow-md'
                            : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                        }`}
                      >
                        Bước {step}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Meridian Route & Execution Breakdown (5 cols) */}
              <div className="lg:col-span-5 flex flex-col space-y-4">
                <div className="p-5 rounded-2xl bg-gray-950 border border-cyan-500/30 space-y-4">
                  <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>⚡</span> SƠ ĐỒ VẬN HÀNH KINH MẠCH & BỘ PHÁP
                  </h4>

                  <div className="space-y-3 text-xs">
                    {/* Meridian node 1 */}
                    <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-cyan-400 font-bold">
                        <span>1. Khí Hải Đan Điền (Linh Lực Khởi Nguyên)</span>
                        <span className="font-mono text-[10px]">Tụ Khí</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-[11px]">
                        Nén chân nguyên ở hạ đan điền, hô hấp quy tức, kích hoạt ngũ hành linh căn truyền khí hướng thượng.
                      </p>
                    </div>

                    {/* Meridian node 2 */}
                    <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-cyan-400 font-bold">
                        <span>2. Đốc Mạch ➔ Mệnh Môn ➔ Đại Chùy</span>
                        <span className="font-mono text-[10px]">Thăng Hoa</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-[11px]">
                        Luồng khí chạy dọc cột sống lên đỉnh gáy, kích thích thần thức xuất khiếu định vị tọa độ trời đất.
                      </p>
                    </div>

                    {/* Meridian node 3 */}
                    <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-cyan-400 font-bold">
                        <span>3. Khúc Trì Huyệt ➔ Lao Cung (Lòng Bàn Tay)</span>
                        <span className="font-mono text-[10px]">Nén Khí</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-[11px]">
                        Dồn vào cánh tay phải, nén áp suất chân khí cực cao tại huyệt Lao Cung để điều khiển độ đậm nhạt của nét mực.
                      </p>
                    </div>

                    {/* Meridian node 4 */}
                    <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                      <div className="flex items-center justify-between text-cyan-400 font-bold">
                        <span>4. Thiếu Thương / Trung Xung ➔ Ngọn Bút</span>
                        <span className="font-mono text-[10px]">Khai Bút</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-[11px]">
                        Phóng linh tơ qua đầu ngón tay hoặc ngòi bút lông, hòa quyện chu sa khắc sâu đạo ngân vào vật mang.
                      </p>
                    </div>
                  </div>

                  {/* Footwork Step */}
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs space-y-1">
                    <strong className="text-amber-300 block font-bold">
                      👣 Đạp Cương Đẩu Bộ (Cửu Cung Vũ Bộ):
                    </strong>
                    <p className="text-gray-300 leading-relaxed text-[11px]">
                      Chân trái đạp ô Khảm, chân phải bước ô Ly. Thân thể nghiêng 30 độ né đòn công kích của kẻ thù trong khi tay áo vẫn vung bút ổn định như bàn thạch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: ĐẠO PHÙ TIÊU BIỂU & PHÙ ĐIỂN CỔ ĐẠI ================= */}
        {activeTab === 'canons' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Canon Selection and Talisman List */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-3 space-y-3 overflow-y-auto custom-scrollbar">
              <div>
                <label className="text-[10px] font-mono uppercase text-gray-400 font-bold block mb-1">
                  Chọn Bộ Phù Điển Truyền Thừa:
                </label>
                <select
                  value={selectedCanonId}
                  onChange={(e) => {
                    setSelectedCanonId(e.target.value);
                    setSelectedTalismanIndex(0);
                  }}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-white"
                >
                  {canons.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block pt-2 border-t border-white/10">
                Các Đạo Bùa Trong Phù Điển ({selectedCanon.talismans.length}):
              </span>
              <div className="space-y-1.5">
                {selectedCanon.talismans.map((tl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedTalismanIndex(idx)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedTalismanIndex === idx
                        ? 'bg-amber-950/70 border-amber-400 shadow-md ring-1 ring-amber-400/30'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-amber-400 font-bold block">{tl.gradeLevel}</span>
                    <h4 className="font-bold text-xs text-white">{tl.talismanName}</h4>
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{tl.effectMagnitude}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Talisman Details */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
              <div className="p-5 rounded-2xl bg-gray-950/90 border border-amber-500/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                      {selectedTalisman.gradeLevel}
                    </span>
                    <h3 className="text-xl font-black text-vip-gold">{selectedTalisman.talismanName}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('simulation')}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl text-xs font-bold text-white shadow-md"
                    >
                      Mô Phỏng Kích Nổ Phù Này
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          const note = `【ĐẠO PHÙ: ${selectedTalisman.talismanName}】\n` +
                            `• Phẩm giai: ${selectedTalisman.gradeLevel}\n` +
                            `• Bút pháp: ${selectedTalisman.brushMovementScripture}\n` +
                            `• Mực & Chu sa: ${selectedTalisman.cinnabarAndInkRecipe}\n` +
                            `• Giấy bùa: ${selectedTalisman.talismanPaperType}\n` +
                            `• Chú ngữ: "${selectedTalisman.incantationAndSealFormula}"\n` +
                            `• Quán khí: ${selectedTalisman.qiInjectionMechanism}\n` +
                            `• Ngòi nổ: ${selectedTalisman.activationTrigger}\n` +
                            `• Uy lực: ${selectedTalisman.effectMagnitude}\n` +
                            `• Đốn ngộ: "${selectedTalisman.enlightenmentInsight}"\n` +
                            `• Phản phệ: ${selectedTalisman.backfireRisk}`;
                          onInsertText(note);
                          alert('Đã chèn đạo phù vào bản thảo!');
                        }}
                        className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300"
                      >
                        Chèn vào truyện
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-1">
                  <strong className="text-amber-300 block">Quy Tắc Chấp Bút (Brush Movement):</strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedTalisman.brushMovementScripture}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-red-300 block">Công Thức Chu Sa & Mực Vẽ:</strong>
                    <p className="text-gray-300 leading-relaxed">{selectedTalisman.cinnabarAndInkRecipe}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-yellow-300 block">Chất Liệu Giấy Bùa:</strong>
                    <p className="text-gray-300 leading-relaxed">{selectedTalisman.talismanPaperType}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-1">
                  <strong className="text-pink-300 block">Chú Ngữ Khởi Phù & Thủ Ấn Định Hình:</strong>
                  <p className="text-gray-300 italic text-sm">"{selectedTalisman.incantationAndSealFormula}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-cyan-300 block">Cơ Chế Quán Chú Linh Khí:</strong>
                    <p className="text-gray-300 leading-relaxed">{selectedTalisman.qiInjectionMechanism}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-orange-300 block">Ngòi Nổ Kích Hoạt (Activation):</strong>
                    <p className="text-gray-300 leading-relaxed">{selectedTalisman.activationTrigger}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-1">
                  <strong className="text-emerald-300 block font-bold">Quy Mô Uy Lực & Tác Động:</strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedTalisman.effectMagnitude}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-xs">
                  <strong className="text-red-400 block mb-0.5">⚠️ Rủi ro phát nổ ngược (Backfire):</strong>
                  <p className="text-gray-300 italic">{selectedTalisman.backfireRisk}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 6: QUY TẮC ĐÀN TẾ & GIỜ HOÀNG ĐẠO ================= */}
        {activeTab === 'altar' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950 border border-amber-500/30 space-y-5 max-w-3xl mx-auto">
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
                  SANCTUARY RITUALS & AUSPICIOUS TIMING
                </span>
                <h3 className="text-lg font-black text-vip-gold">
                  QUY TẮC THIẾT LẬP ĐÀN TẾ, TRAI GIỚI & GIỜ HOÀNG ĐẠO
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                  <strong className="text-amber-300 block text-sm mb-1">1. Chuẩn Bị Đàn Tế & Ngũ Hành:</strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedCanon.craftingSanctuaryRules.altarPreparation}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                  <strong className="text-cyan-300 block text-sm mb-1">2. Tĩnh Tâm, Tẩy Trần & Trai Giới:</strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedCanon.craftingSanctuaryRules.mentalStillnessRequirement}</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                  <strong className="text-pink-300 block text-sm mb-1">3. Thời Khắc Khởi Bút (Giờ Hoàng Đạo):</strong>
                  <p className="text-gray-300 leading-relaxed text-sm">{selectedCanon.craftingSanctuaryRules.auspiciousTiming}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900 to-amber-950/50 border border-amber-500/30 text-xs">
                <strong className="text-vip-gold block mb-1">Triết Lý Cốt Lõi Của Bộ Phù Điển Này:</strong>
                <p className="text-gray-200 italic font-serif leading-relaxed">
                  "{selectedCanon.fundamentalPhilosophy}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: MÔ PHỎNG THỰC CHIẾN & SINH VĂN AI ================= */}
        {activeTab === 'simulation' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-5 rounded-2xl bg-gray-900 border border-amber-500/30 space-y-4">
              <div className="border-b border-white/10 pb-2">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wide">
                  CẤU HÌNH THỰC CHIẾN: CHẤP BÚT, BỘ PHÁP, ĐỐN NGỘ & OANH TẠC
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1">Nhân vật:</label>
                  <select
                    value={simCharId}
                    onChange={(e) => setSimCharId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {characters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.realm || 'Trúc Cơ'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Trường phái vẽ:</label>
                  <select
                    value={selectedMethodId}
                    onChange={(e) => setSelectedMethodId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {TALISMAN_DRAWING_METHODS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Chiêu thức thi triển:</label>
                  <select
                    value={selectedStanceId}
                    onChange={(e) => setSelectedStanceId(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {TALISMAN_STANCE_TECHNIQUES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Cấp bậc thuật pháp:</label>
                  <select
                    value={selectedRankTier}
                    onChange={(e) => setSelectedRankTier(Number(e.target.value))}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white"
                  >
                    {TALISMAN_TECHNIQUE_RANKS.map((r) => (
                      <option key={r.id} value={r.tierNumber}>
                        Bậc {r.tierNumber}: {r.tierName} - {r.masteryTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-gray-400 mb-1">Tình thế chiến trường / Đối thủ:</label>
                  <input
                    type="text"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleSimulate}
                    disabled={isSimulating}
                    className="w-full py-2 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 rounded-lg text-xs font-bold text-white shadow-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {isSimulating ? <Spinner /> : <span>✨</span>}
                    <span>Mô Phỏng & Sinh Phân Cảnh AI</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Simulation Results Display */}
            {simulationResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-vip-gold/40 space-y-5 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-400 font-bold block">
                      AI PROSE GENERATION READY
                    </span>
                    <h3 className="text-lg font-black text-vip-gold">
                      PHÂN CẢNH CHẤP BÚT, BỘ PHÁP ĐỐN NGỘ & BỘC PHÙ THỰC CHIẾN
                    </h3>
                  </div>

                  {onInsertText && (
                    <button
                      onClick={() => {
                        const contentToInsert =
                          typeof simulationResult === 'string'
                            ? simulationResult
                            : simulationResult.proseSegment || JSON.stringify(simulationResult, null, 2);
                        onInsertText(contentToInsert);
                        alert('Đã chèn toàn bộ phân cảnh chiến đấu vào tiểu thuyết!');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow flex items-center gap-1"
                    >
                      <span>📥</span> Chèn Vào Chương Truyện
                    </button>
                  )}
                </div>

                {/* Structured Breakdown Cards if available */}
                {simulationResult.brushTechniqueAndSoulFocus && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-gray-900 border border-orange-500/20 space-y-1">
                      <strong className="text-orange-300 block font-bold">
                        1. Thân Pháp, Bộ Pháp & Vận Khí Lao Cung:
                      </strong>
                      <p className="text-gray-300 leading-relaxed">
                        {simulationResult.brushTechniqueAndSoulFocus}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-gray-900 border border-purple-500/20 space-y-1">
                      <strong className="text-purple-300 block font-bold">
                        2. Đạo Văn Thành Hình & Dị Tượng Đốn Ngộ:
                      </strong>
                      <p className="text-gray-300 leading-relaxed">
                        {simulationResult.runeGlowAndHeavenlyEcho}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-gray-900 border border-red-500/20 space-y-1">
                      <strong className="text-red-300 block font-bold">
                        3. Khẩu Quyết & Bộc Nổ Phù Lục:
                      </strong>
                      <p className="text-gray-300 leading-relaxed">
                        {simulationResult.talismanDetonationOrDefense}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-gray-900 border border-cyan-500/20 space-y-1">
                      <strong className="text-cyan-300 block font-bold">
                        4. Dư Chấn Chiến Trường & Cục Diện:
                      </strong>
                      <p className="text-gray-300 leading-relaxed">
                        {simulationResult.battlefieldShockwave}
                      </p>
                    </div>
                  </div>
                )}

                {/* Full Prose Section */}
                <div className="p-5 rounded-xl bg-gray-900/90 border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">
                    Đoạn Văn Tiểu Thuyết (Novel Prose Segment):
                  </span>
                  <div className="prose prose-invert max-w-none text-gray-100 text-sm md:text-base leading-relaxed font-serif whitespace-pre-line">
                    {simulationResult.proseSegment || JSON.stringify(simulationResult, null, 2)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
