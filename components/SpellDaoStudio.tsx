import React, { useState } from 'react';
import { SpellDaoCanonItem, CharacterProfile } from '../types';
import { PRESET_SPELL_DAO_CANONS } from '../data/presetSpellDaoCanons';
import { simulateSpellEnlightenment } from '../services/geminiService';
import { Spinner } from './Spinner';

interface SpellDaoStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const SpellDaoStudio: React.FC<SpellDaoStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText
}) => {
  const [canons] = useState<SpellDaoCanonItem[]>(PRESET_SPELL_DAO_CANONS);
  const [selectedCanonId, setSelectedCanonId] = useState<string>(PRESET_SPELL_DAO_CANONS[0].id);
  const [selectedSpellIndex, setSelectedSpellIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'spells' | 'requirements' | 'simulation'>('spells');

  // Simulation state
  const [simCharId, setSimCharId] = useState<string>(characters[0]?.id || 'char_lingxiao');
  const [opponent, setOpponent] = useState<string>('Ma Vương Cửu U vạn năm');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const selectedCanon = canons.find(c => c.id === selectedCanonId) || canons[0];
  const selectedSpell = selectedCanon.spells[selectedSpellIndex] || selectedCanon.spells[0];

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const chosenChar = characters.find(c => c.id === simCharId);
      const res = await simulateSpellEnlightenment({
        character: chosenChar,
        spellCanon: selectedCanon,
        stance: selectedSpell,
        opponent,
        genre
      });
      setSimulationResult(res);
      setActiveTab('simulation');
    } catch (err: any) {
      alert('Lỗi mô phỏng thuật pháp: ' + err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-purple-950/40 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🔮</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 tracking-wide">
              HỆ THỐNG THUẬT PHÁP, THỦ ẤN & THẦN THÔNG
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold">
              SPELL DAO CANON
            </span>
          </div>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Ngũ Hành Thần Quang, Cửu Thiên Lôi Pháp, khẩu quyết niệm chú và thủ ấn kết xuất
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-900/90 p-1 rounded-xl border border-purple-500/30 text-xs">
          <button
            onClick={() => setActiveTab('spells')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'spells'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>📜</span> Danh Mục Thuật Pháp ({selectedCanon.spells.length})
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'requirements'
                ? 'bg-gradient-to-r from-cyan-900 to-blue-900 text-cyan-200 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🌀</span> Yêu Cầu Tu Tập
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'simulation'
                ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>⚡</span> Mô Phỏng Thi Triển
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {activeTab === 'spells' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* List */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-4 space-y-2 overflow-y-auto custom-scrollbar">
              <span className="text-[10px] font-mono uppercase text-gray-500 font-bold block mb-1">
                Các Thuật Pháp Trong Bộ:
              </span>
              {selectedCanon.spells.map((sp, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSpellIndex(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedSpellIndex === idx
                      ? 'bg-purple-950/70 border-purple-400 shadow-md ring-1 ring-purple-400/30'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-purple-400 font-bold block">{sp.tierRank}</span>
                  <h4 className="font-bold text-xs text-white">{sp.spellName}</h4>
                  <span className="text-[11px] text-pink-300 block">{sp.elementalAffinity}</span>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{sp.visualPhenomenon}</p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
              <div className="p-6 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase text-pink-400 font-bold">
                      {selectedSpell.tierRank} • {selectedSpell.elementalAffinity}
                    </span>
                    <h3 className="text-xl font-black text-vip-gold">{selectedSpell.spellName}</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('simulation')}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-xs font-bold text-white shadow-md"
                  >
                    Mô Phỏng Thi Triển Thuật Này
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-purple-300 block">Thủ Ấn Kết Xuất:</strong>
                    <p className="text-gray-300 leading-relaxed">{selectedSpell.handMudraFormula}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-amber-300 block">Khẩu Quyết Chân Ngôn:</strong>
                    <p className="text-gray-300 italic">"{selectedSpell.incantationChant}"</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-1">
                  <strong className="text-cyan-300 block">Đường Chạy Kinh Mạch (Meridian Circulation):</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedSpell.meridianCirculation}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-1">
                  <strong className="text-pink-300 block">Dị Tượng Thị Giác Khi Bùng Nổ:</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedSpell.visualPhenomenon}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-red-300 block">Quy Mô Tàn Phá:</strong>
                    <p className="text-gray-300 leading-relaxed">{selectedSpell.destructiveScale}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-emerald-300 block">Đốn Ngộ Căn Bản:</strong>
                    <p className="text-gray-300 leading-relaxed">{selectedSpell.enlightenmentInsight}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/30 text-xs">
                  <strong className="text-red-400 block mb-0.5">⚠️ Nguy hiểm phản phệ nếu thất bại:</strong>
                  <p className="text-gray-300 italic">{selectedSpell.backfireDanger}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-5 rounded-2xl bg-gray-950 border border-cyan-500/30 space-y-4 max-w-2xl mx-auto">
              <h3 className="text-base font-bold text-cyan-300">
                YÊU CẦU TU TẬP: {selectedCanon.name}
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-gray-900 border border-white/5">
                  <strong className="text-purple-300 block mb-1">1. Linh Căn & Khí Hải:</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedCanon.cultivationRequirements.spiritualAuraRequirement}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-900 border border-white/5">
                  <strong className="text-amber-300 block mb-1">2. Thần Niệm Khống Chế:</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedCanon.cultivationRequirements.mentalFocusRequirement}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-900 border border-white/5">
                  <strong className="text-pink-300 block mb-1">3. Ngộ Tính Nguyên Tố:</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedCanon.cultivationRequirements.elementalComprehension}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'simulation' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-4 rounded-xl bg-gray-900 border border-purple-500/30 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Nhân vật:</label>
                <select
                  value={simCharId}
                  onChange={e => setSimCharId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                >
                  {characters.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Đối thủ:</label>
                <input
                  type="text"
                  value={opponent}
                  onChange={e => setOpponent(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                >
                  {isSimulating ? <Spinner /> : <span>✨</span>}
                  <span>Mô Phỏng Phóng Thích Thuật Pháp</span>
                </button>
              </div>
            </div>

            {simulationResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-vip-gold/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-base font-bold text-vip-gold">PHÂN CẢNH THI TRIỂN THUẬT PHÁP</h3>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        onInsertText(simulationResult.proseSegment || simulationResult);
                        alert('Đã chèn vào chương truyện!');
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold"
                    >
                      Chèn vào truyện
                    </button>
                  )}
                </div>
                <div className="prose prose-invert max-w-none text-gray-200 text-sm md:text-base leading-relaxed font-serif whitespace-pre-line">
                  {simulationResult.proseSegment || JSON.stringify(simulationResult, null, 2)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
