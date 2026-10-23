import React, { useState } from 'react';
import {
  SwordDaoCanonItem,
  SwordDaoStance,
  CharacterProfile,
  SwordEnlightenmentSimulation,
} from '../types';
import { PRESET_SWORD_DAO_CANONS } from '../data/presetSwordDaoCanons';
import {
  simulateSwordEnlightenment,
  generateSwordCanon,
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface SwordDaoStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
}

type StudioTab = 'stances' | 'regimen' | 'simulation' | 'generator';

export const SwordDaoStudio: React.FC<SwordDaoStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText,
  onUpdateCharacters,
}) => {
  const [canons, setCanons] = useState<SwordDaoCanonItem[]>(PRESET_SWORD_DAO_CANONS);
  const [selectedCanonId, setSelectedCanonId] = useState<string>(PRESET_SWORD_DAO_CANONS[0]?.id || '');
  const [selectedStanceIndex, setSelectedStanceIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<StudioTab>('stances');

  // Simulation state
  const [simCharId, setSimCharId] = useState<string>(characters[0]?.id || '');
  const [opponent, setOpponent] = useState<string>('Huyết Cốt Ma Tôn cầm Cửu U Huyết Thần Đao');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<SwordEnlightenmentSimulation | null>(null);

  // Character Assignment state
  const [assignCharId, setAssignCharId] = useState<string>(characters[0]?.id || '');

  // AI Generator state
  const [genCanonName, setGenCanonName] = useState<string>('Vạn Cổ Tru Tiên Bá Kiếm Quyết');
  const [genPhilosophy, setGenPhilosophy] = useState<string>(
    'Bá kiếm sát phạt vạn cổ, lấy sát ngăn sát, nhất kiếm phá vạn pháp trảm toái thiên đạo'
  );
  const [isGeneratingCanon, setIsGeneratingCanon] = useState<boolean>(false);

  const selectedCanon = canons.find((c) => c.id === selectedCanonId) || canons[0];
  const selectedStance: SwordDaoStance =
    selectedCanon.stances[selectedStanceIndex] || selectedCanon.stances[0];
  const selectedSimChar = characters.find((c) => c.id === simCharId) || characters[0];

  // Handle Simulate Enlightenment
  const handleSimulate = async () => {
    setIsSimulating(true);
    setSimulationResult(null);
    try {
      const res = await simulateSwordEnlightenment({
        character: selectedSimChar,
        swordCanon: selectedCanon,
        stance: selectedStance,
        opponent,
        genre,
      });
      setSimulationResult(res);
      setActiveTab('simulation');
    } catch (err: any) {
      alert('Lỗi mô phỏng kiếm đạo: ' + err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  // Handle Assign Canon to Character
  const handleAssignCanonToCharacter = () => {
    if (!onUpdateCharacters || !assignCharId) return;
    const targetChar = characters.find((c) => c.id === assignCharId);
    if (!targetChar) return;

    const updated = characters.map((c) => {
      if (c.id === assignCharId) {
        return {
          ...c,
          weaponOrAbility: `${selectedCanon.name} (${selectedStance.stanceName})`,
          natalArtifact: c.natalArtifact || 'Bản Mệnh Thanh Phong Kiếm',
          backstory: `${c.backstory}\n\n[Truyền Thừa Kiếm Đạo]: Tu luyện ${selectedCanon.name}, sở trường tuyệt kỹ ${selectedStance.stanceName}.`,
        };
      }
      return c;
    });

    onUpdateCharacters(updated);
    alert(`Đã trao truyền bộ kiếm "${selectedCanon.name}" cho kiếm tu ${targetChar.name}!`);
  };

  // Handle AI Generate New Canon
  const handleGenerateCanon = async () => {
    setIsGeneratingCanon(true);
    try {
      const res = await generateSwordCanon({
        name: genCanonName,
        philosophy: genPhilosophy,
        genre,
      });
      if (res) {
        setCanons((prev) => [res, ...prev]);
        setSelectedCanonId(res.id);
        setSelectedStanceIndex(0);
        setActiveTab('stances');
        alert(`Đã kiến tạo thành công bộ kiếm đạo: "${res.name}" với 9 chiêu thức!`);
      }
    } catch (err: any) {
      alert('Lỗi tạo kiếm đạo: ' + err.message);
    } finally {
      setIsGeneratingCanon(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-cyan-500/20 bg-gradient-to-r from-gray-950 via-cyan-950/40 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🗡️</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 tracking-wide">
              HỆ THỐNG KIẾM ĐẠO CHÍ TÔN & DIỄN VÕ CHIÊU THỨC
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
              SWORD DAO MASTER STUDIO
            </span>
          </div>
          <p className="text-xs text-cyan-300/80 mt-0.5">
            Phân tầng 9 cảnh giới từ Kiếm Khí sơ khai đến Thiên Đạo Vô Kiếm • Đầy đủ 8 yếu tố chi tiết cho từng chiêu
          </p>
        </div>

        {/* Subtabs Bar */}
        <div className="flex items-center gap-1.5 bg-gray-900/90 p-1 rounded-xl border border-cyan-500/30 text-xs self-start md:self-auto">
          <button
            onClick={() => setActiveTab('stances')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'stances'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>⚔️</span> Cửu Trọng Chiêu Thức ({selectedCanon.stances.length})
          </button>
          <button
            onClick={() => setActiveTab('regimen')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'regimen'
                ? 'bg-gradient-to-r from-purple-900 to-indigo-900 text-purple-200 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🧘</span> Cách Thức Khổ Luyện
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'simulation'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>✨</span> Diễn Võ & Đốn Ngộ AI
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🔮</span> Sáng Tạo Kiếm Đạo
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* ================= TAB 1: CỬU TRỌNG CHIÊU THỨC ================= */}
        {activeTab === 'stances' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Left: Canon Switcher & 9-Stance Ladder */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-3 space-y-3 overflow-y-auto custom-scrollbar shrink-0">
              {/* Select Canon dropdown */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-gray-400 font-bold block">
                  Chọn Bộ Kiếm Pháp ({canons.length}):
                </span>
                <select
                  value={selectedCanonId}
                  onChange={(e) => {
                    setSelectedCanonId(e.target.value);
                    setSelectedStanceIndex(0);
                  }}
                  className="w-full bg-gray-900 border border-cyan-500/30 rounded-xl p-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
                >
                  {canons.map((cn) => (
                    <option key={cn.id} value={cn.id}>
                      {cn.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 9 Stances Ladder */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-vip-gold font-bold flex items-center justify-between">
                  <span>9 Cảnh Giới Tiến Hóa:</span>
                  <span>{selectedCanon.stances.length} Thức</span>
                </span>
                {selectedCanon.stances.map((st, idx) => {
                  const isSelected = selectedStanceIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedStanceIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/50 border-cyan-400 shadow-md ring-1 ring-cyan-400/40'
                          : 'bg-gray-900/60 border-white/5 hover:border-white/20 hover:bg-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800/40">
                          Thức {st.orderNumber}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono line-clamp-1">
                          {st.intentLevel.split('(')[0]?.trim()}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-white mt-1 line-clamp-1">
                        {st.stanceName}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1 leading-snug">
                        {st.mantraOrIncantation || st.visualPhenomenon}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed 8-Element Stance Breakdown */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
              {/* Canon Header Summary */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-cyan-500/30 shadow-xl space-y-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                      {selectedCanon.gradeLevel}
                    </span>
                    <h3 className="text-xl font-black text-vip-gold mt-1">{selectedCanon.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <strong>Tổ sư sáng lập:</strong> {selectedCanon.originAndCreator}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveTab('simulation')}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1"
                    >
                      <span>✨</span> Diễn Võ Bằng AI
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          const content = `
=== [BỘ KIẾM ĐẠO: ${selectedCanon.name.toUpperCase()}] ===
- Phẩm Cấp: ${selectedCanon.gradeLevel}
- Triết Lý Cốt Lõi: ${selectedCanon.philosophy}
- Ý Cảnh Kiếm Đạo: ${selectedCanon.coreSwordIntent}
- Kiếm Vực Tuyệt Đối: ${selectedCanon.absoluteSwordDomain || 'Chưa mở'}
- Chiêu Thức Hiện Tại: ${selectedStance.stanceName} (${selectedStance.intentLevel})
  + Khẩu quyết: ${selectedStance.mantraOrIncantation || 'Vô hình'}
  + Vận hành kinh mạch: ${selectedStance.qiMovementPath}
  + Thân pháp & Bộ pháp: ${selectedStance.footworkAndKinetic || selectedStance.physicalMovementAndFootwork}
  + Cơ chế động tác: ${selectedStance.swordFormMechanics || 'Đâm thẳng'}
  + Dị tượng kiếm quang: ${selectedStance.visualPhenomenon}
  + Sát phạt thực chiến: ${selectedStance.offensiveLethality}
  + Phương pháp khổ luyện: ${selectedStance.hardcoreTrainingMethod || 'Khổ công'}
  + Chìa khóa đốn ngộ: ${selectedStance.enlightenmentKey}
======================================================
`;
                          onInsertText(content.trim());
                          alert(`Đã chèn chiêu thức "${selectedStance.stanceName}" vào bản thảo!`);
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1"
                      >
                        <span>📝</span> Chèn Vào Truyện
                      </button>
                    )}
                  </div>
                </div>

                {/* Philosophy & Domain */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-gray-900/80 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-cyan-300 flex items-center gap-1">
                      <span>💡</span> Triết Lý Kiếm Đạo:
                    </strong>
                    <p className="text-gray-300 italic leading-relaxed">{selectedCanon.philosophy}</p>
                  </div>
                  <div className="p-3 bg-gray-900/80 rounded-xl border border-white/5 space-y-1">
                    <strong className="text-purple-300 flex items-center gap-1">
                      <span>🌌</span> Tuyệt Đối Kiếm Vực:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedCanon.absoluteSwordDomain || 'Chưa định danh'}
                    </p>
                  </div>
                </div>

                {/* Character Assignment Bar */}
                <div className="p-3.5 bg-black/60 rounded-xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div>
                    <strong className="text-white block font-bold">
                      👤 Trao Truyền Kiếm Đạo Cho Kiếm Tu (Nhân Vật):
                    </strong>
                    <span className="text-[11px] text-gray-400">
                      Gắn bộ kiếm và chiêu thức sở trường vào hồ sơ nhân vật
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={assignCharId}
                      onChange={(e) => setAssignCharId(e.target.value)}
                      className="bg-gray-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      {characters.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.realmOrRank})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAssignCanonToCharacter}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow whitespace-nowrap"
                    >
                      Trao Truyền
                    </button>
                  </div>
                </div>
              </div>

              {/* Stance Detail: Full 8 Elements */}
              <div className="p-6 rounded-2xl bg-gray-950/90 border border-cyan-500/30 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800/40">
                      {selectedStance.intentLevel}
                    </span>
                    <h3 className="text-xl font-black text-vip-gold mt-1.5">
                      {selectedStance.stanceName}
                    </h3>
                  </div>
                </div>

                {/* 1. Khẩu Quyết Tâm Pháp */}
                {selectedStance.mantraOrIncantation && (
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-1">
                    <strong className="text-cyan-300 flex items-center gap-1.5 font-bold">
                      <span>📜</span> 1. Khẩu Quyết Tâm Pháp & Ý Niệm Kiếm Chiêu:
                    </strong>
                    <p className="text-cyan-100 font-serif italic text-sm leading-relaxed pl-5">
                      "{selectedStance.mantraOrIncantation}"
                    </p>
                  </div>
                )}

                {/* 2 & 3. Vận Hành Kinh Mạch & Bộ Pháp Thân Pháp */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1.5">
                    <strong className="text-cyan-300 flex items-center gap-1.5 font-bold">
                      <span>🌀</span> 2. Vận Hành Kinh Mạch & Chu Thiên Chân Khí:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{selectedStance.qiMovementPath}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1.5">
                    <strong className="text-amber-300 flex items-center gap-1.5 font-bold">
                      <span>👣</span> 3. Bộ Pháp & Thân Pháp Di Chuyển (Footwork & Kinetic):
                    </strong>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedStance.footworkAndKinetic || selectedStance.physicalMovementAndFootwork}
                    </p>
                  </div>
                </div>

                {/* 4 & 5. Cơ Chế Động Tác Kiếm & Dị Tượng Kiếm Quang */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1.5">
                    <strong className="text-blue-300 flex items-center gap-1.5 font-bold">
                      <span>⚔️</span> 4. Cơ Chế Động Tác Kiếm (Sword Form Mechanics):
                    </strong>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedStance.swordFormMechanics || selectedStance.physicalMovementAndFootwork}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1.5">
                    <strong className="text-sky-300 flex items-center gap-1.5 font-bold">
                      <span>✨</span> 5. Dị Tượng Kiếm Quang (Visual Phenomenon):
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{selectedStance.visualPhenomenon}</p>
                  </div>
                </div>

                {/* 6. Ứng Dụng Sát Phạt Thực Chiến */}
                <div className="p-4 rounded-xl bg-gray-900/80 border border-red-500/20 text-xs space-y-2">
                  <strong className="text-red-300 flex items-center gap-1.5 font-bold">
                    <span>🩸</span> 6. Ứng Dụng Sát Phạt & Uy Lực Thực Chiến:
                  </strong>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-2">
                    <p className="text-gray-300">
                      <strong>Tấn công / Trảm sát:</strong> {selectedStance.offensiveLethality}
                    </p>
                    <p className="text-gray-300">
                      <strong>Phòng ngự / Hộ thể:</strong> {selectedStance.defensiveVersatility}
                    </p>
                  </div>
                </div>

                {/* 7 & 8. Khổ Luyện & Đốn Ngộ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 space-y-1.5">
                    <strong className="text-purple-300 flex items-center gap-1.5 font-bold">
                      <span>🏋️</span> 7. Phương Pháp Rèn Luyện Khổ Công:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedStance.hardcoreTrainingMethod ||
                        'Mỗi ngày vung kiếm mười vạn lần dưới thác nước, tập trung toàn bộ tâm trí.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-emerald-500/20 space-y-1.5">
                    <strong className="text-emerald-300 flex items-center gap-1.5 font-bold">
                      <span>💡</span> 8. Chìa Khóa Đốn Ngộ Kiếm Đạo:
                    </strong>
                    <p className="text-gray-300 leading-relaxed">{selectedStance.enlightenmentKey}</p>
                  </div>
                </div>

                {/* Fatal Flaw Warning */}
                {selectedStance.fatalFlawIfRushed && (
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-xs">
                    <strong className="text-red-400 block mb-0.5">⚠️ Sơ hở chí mạng nếu luyện vội vã:</strong>
                    <p className="text-gray-300 italic">{selectedStance.fatalFlawIfRushed}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: CÁCH THỨC KHỔ LUYỆN ================= */}
        {activeTab === 'regimen' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-5 max-w-3xl mx-auto shadow-xl">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="text-2xl">🧘</span>
                <div>
                  <h3 className="text-base font-bold text-purple-300">
                    CÁCH THỨC RÈN LUYỆN & KHẢO THỬ ĐẠO TÂM KIẾM TU
                  </h3>
                  <p className="text-xs text-gray-400">
                    Hệ thống bài tập thể chất, thử thách đạo tâm và ngưng tụ kiếm khí của {selectedCanon.name}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-gray-900/80 border border-cyan-500/20 space-y-1.5">
                  <strong className="text-cyan-300 text-sm flex items-center gap-1.5 font-bold">
                    <span>1.</span> Rèn Luyện Thể Lực & Căn Cơ Cơ Bản:
                  </strong>
                  <p className="text-gray-300 leading-relaxed text-xs">
                    {selectedCanon.trainingRegimen.basicConditioning}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-amber-500/20 space-y-1.5">
                  <strong className="text-amber-300 text-sm flex items-center gap-1.5 font-bold">
                    <span>2.</span> Thử Thách Đạo Tâm & Vấn Kiếm Sát Cảnh:
                  </strong>
                  <p className="text-gray-300 leading-relaxed text-xs">
                    {selectedCanon.trainingRegimen.heartTestingTrial}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-pink-500/20 space-y-1.5">
                  <strong className="text-pink-300 text-sm flex items-center gap-1.5 font-bold">
                    <span>3.</span> Thức Tỉnh Kiếm Khí & Ngưng Tụ Sát Phạt Ý Cảnh:
                  </strong>
                  <p className="text-gray-300 leading-relaxed text-xs">
                    {selectedCanon.trainingRegimen.swordEnergyAwakening}
                  </p>
                </div>

                {selectedCanon.authorWritingNotes && (
                  <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1">
                    <strong className="text-amber-300 flex items-center gap-1.5 font-bold">
                      <span>✍️</span> Lời Khuyên Sáng Tác Cho Tác Giả:
                    </strong>
                    <p className="text-gray-300 leading-relaxed italic">
                      {selectedCanon.authorWritingNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: DIỄN VÕ & ĐỐN NGỘ BẰNG AI ================= */}
        {activeTab === 'simulation' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Setup Panel */}
              <div className="p-6 rounded-2xl bg-gray-950/90 border border-cyan-500/30 shadow-xl space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h3 className="text-base font-bold text-vip-gold">
                      MÔ PHỎNG DIỄN VÕ, ĐỐN NGỘ & SÁT ĐỊCH BẰNG AI
                    </h3>
                    <p className="text-xs text-gray-400">
                      Chọn nhân vật, chiêu thức muốn thi triển, nhập tên kẻ thù hoặc tình thế nguy hiểm
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="text-gray-300 font-bold block">1. Nhân Vật Xuất Kiếm:</label>
                    <select
                      value={simCharId}
                      onChange={(e) => setSimCharId(e.target.value)}
                      className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {characters.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.realmOrRank})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-300 font-bold block">2. Chiêu Thức Thi Triển:</label>
                    <select
                      value={selectedStanceIndex}
                      onChange={(e) => setSelectedStanceIndex(parseInt(e.target.value, 10))}
                      className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {selectedCanon.stances.map((st, idx) => (
                        <option key={idx} value={idx}>
                          Thức {st.orderNumber}: {st.stanceName} ({st.intentLevel.split('(')[0]?.trim()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="text-rose-300 font-bold block">
                    3. Đối Thủ Hoặc Tình Thế Ngàn Cân Treo Sợi Tóc:
                  </label>
                  <input
                    type="text"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                    placeholder="VD: Huyết Cốt Ma Tôn đang vung đao bổ xuống, mười vạn ma binh bao vây..."
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-rose-400"
                  />
                </div>

                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSimulating ? (
                    <>
                      <Spinner />
                      <span>ĐANG MÔ PHỎNG ĐỐN NGỘ VÀ TRẢM SÁT KẺ ĐỊCH...</span>
                    </>
                  ) : (
                    <>
                      <span>🗡️</span>
                      <span>KÍCH HOẠT MÔ PHỎNG DIỄN VÕ & ĐỐN NGỘ BẰNG AI</span>
                    </>
                  )}
                </button>
              </div>

              {/* Simulation Result Display */}
              {simulationResult && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-black border border-cyan-500/40 shadow-2xl space-y-5 animate-fadeIn">
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-white/10 gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40">
                        ĐỐN NGỘ THÀNH CÔNG • TRẢM ĐỊCH ĐỊNH SINH TỬ
                      </span>
                      <h3 className="text-xl font-black text-vip-gold mt-1">
                        {simulationResult.characterName} ➔ Thi Triển {simulationResult.stanceName}
                      </h3>
                      <p className="text-xs text-gray-400">
                        Bộ kiếm: {simulationResult.canonName} | Đối thủ: {simulationResult.opponentName}
                      </p>
                    </div>

                    {onInsertText && (
                      <button
                        onClick={() => {
                          onInsertText(
                            `[PHÂN ĐOẠN ĐỐN NGỘ KIẾM ĐẠO: ${simulationResult.characterName} - ${simulationResult.stanceName}]\n` +
                            `- Bộ kiếm: ${simulationResult.canonName}\n` +
                            `- Tình thế nguy nan: ${simulationResult.crisisTrigger}\n` +
                            `- Đốn ngộ kiếm ý: ${simulationResult.innerComprehension}\n` +
                            `- Vận khí & Bộ pháp: ${simulationResult.qiAndSwordExecution}\n\n` +
                            `${simulationResult.proseSegment}`
                          );
                          alert('Đã chèn đại cảnh đốn ngộ kiếm đạo vào bản thảo truyện!');
                        }}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                      >
                        <span>📝</span> Chèn Vào Truyện
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                      <strong className="text-rose-300">Khủng Hoảng Sinh Tử:</strong>
                      <p className="text-gray-300 leading-relaxed">{simulationResult.crisisTrigger}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                      <strong className="text-cyan-300">Khoảnh Khắc Đốn Ngộ:</strong>
                      <p className="text-gray-300 leading-relaxed">{simulationResult.innerComprehension}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                      <strong className="text-blue-300">Vận Khí & Thân Pháp:</strong>
                      <p className="text-gray-300 leading-relaxed">{simulationResult.qiAndSwordExecution}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                      <strong className="text-purple-300">Dị Tượng Kiếm Quang:</strong>
                      <p className="text-gray-300 leading-relaxed">{simulationResult.environmentalDestruction}</p>
                    </div>
                  </div>

                  {/* Prose Segment */}
                  <div className="p-5 rounded-2xl bg-black/60 border border-cyan-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">📜</span>
                        <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                          Trích Đoạn Văn Xuôi Tiểu Thuyết (750 - 1000 từ)
                        </h4>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(simulationResult.proseSegment);
                          alert('Đã sao chép trích đoạn vào khay nhớ tạm!');
                        }}
                        className="text-[11px] text-gray-400 hover:text-white underline cursor-pointer"
                      >
                        Sao chép văn bản
                      </button>
                    </div>
                    <div className="p-4 bg-gray-950/80 rounded-xl border border-white/5 max-h-80 overflow-y-auto custom-scrollbar">
                      <p className="text-gray-200 leading-relaxed text-xs whitespace-pre-line font-serif">
                        {simulationResult.proseSegment}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: SÁNG TẠO BỘ KIẾM ĐẠO MỚI BẰNG AI ================= */}
        {activeTab === 'generator' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gray-950/90 border border-amber-500/30 shadow-xl space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="text-2xl">🔮</span>
                <div>
                  <h3 className="text-base font-bold text-vip-gold">SÁNG TẠO BỘ KIẾM ĐẠO MỚI BẰNG AI</h3>
                  <p className="text-xs text-gray-400">
                    Nhập tên và triết lý (Bá kiếm, Khoái kiếm, Huyễn kiếm, Ngự kiếm...) để AI kiến tạo trọn vẹn 9 chiêu thức
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold block">Tên Bộ Kiếm Pháp:</label>
                  <input
                    type="text"
                    value={genCanonName}
                    onChange={(e) => setGenCanonName(e.target.value)}
                    placeholder="VD: Cửu U Trảm Tiên Kiếm Quyết..."
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-amber-300 font-bold block">Triết Lý & Trường Phái Kiếm Đạo:</label>
                  <textarea
                    rows={4}
                    value={genPhilosophy}
                    onChange={(e) => setGenPhilosophy(e.target.value)}
                    placeholder="VD: Trường phái Khoái Kiếm cực hạn, lấy một kiếm phá vạn pháp, không để lại dấu vết..."
                    className="w-full bg-gray-900 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleGenerateCanon}
                  disabled={isGeneratingCanon}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isGeneratingCanon ? (
                    <>
                      <Spinner />
                      <span>ĐANG KIẾN TẠO TRỌN VẸN 9 CHIÊU THỨC KIẾM ĐẠO...</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      <span>KHỞI TẠO BỘ KIẾM ĐẠO MỚI VÀ LƯU VÀO KHO</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
