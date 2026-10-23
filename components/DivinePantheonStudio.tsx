import React, { useState } from 'react';
import { DivineEntity, CosmologicalEpochEvent, CharacterProfile } from '../types';
import { PRESET_DIVINE_ENTITIES, PRESET_COSMIC_EPOCHS } from '../data/presetPantheonCosmology';
import { simulateDivineChronicle } from '../services/geminiService';
import { Spinner } from './Spinner';

interface DivinePantheonStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const DivinePantheonStudio: React.FC<DivinePantheonStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText
}) => {
  const [deities] = useState<DivineEntity[]>(PRESET_DIVINE_ENTITIES);
  const [epochs] = useState<CosmologicalEpochEvent[]>(PRESET_COSMIC_EPOCHS);
  const [selectedDeityId, setSelectedDeityId] = useState<string>(PRESET_DIVINE_ENTITIES[0].id);
  const [selectedEpochId, setSelectedEpochId] = useState<string>(PRESET_COSMIC_EPOCHS[0].id);
  const [activeTab, setActiveTab] = useState<'deities' | 'epochs' | 'simulation'>('deities');

  // Simulation state
  const [simCharId, setSimCharId] = useState<string>(characters[0]?.id || 'char_lingxiao');
  const [sceneType, setSceneType] = useState<'CreationGenesis' | 'DivineBattle' | 'TombAwakening' | 'GodhoodInheritance'>('TombAwakening');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const selectedDeity = deities.find(d => d.id === selectedDeityId) || deities[0];
  const selectedEpoch = epochs.find(e => e.id === selectedEpochId) || epochs[0];

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const chosenChar = characters.find(c => c.id === simCharId);
      const res = await simulateDivineChronicle({
        character: chosenChar,
        deity: selectedDeity,
        epoch: selectedEpoch,
        sceneType,
        genre
      });
      setSimulationResult(res);
      setActiveTab('simulation');
    } catch (err: any) {
      alert('Lỗi mô phỏng thần tích: ' + err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-purple-950/60 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌌</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300 tracking-wide">
              HỆ THỐNG TRA CỨU THẦN PHẢ & VŨ TRỤ HỒNG HOANG
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-vip-gold/20 text-vip-gold border border-vip-gold/40 font-mono font-bold">
              DIVINE PANTHEON
            </span>
          </div>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Ghi chép các thực thể Thần Linh, nguồn gốc vũ trụ và các sự kiện Khai Thiên Lập Địa
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-gray-900/90 p-1 rounded-xl border border-purple-500/30 text-xs">
          <button
            onClick={() => setActiveTab('deities')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'deities'
                ? 'bg-gradient-to-r from-vip-purple to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>👑</span> Chư Thần ({deities.length})
          </button>
          <button
            onClick={() => setActiveTab('epochs')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'epochs'
                ? 'bg-gradient-to-r from-amber-900 to-yellow-900 text-amber-200 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>⏳</span> Kỷ Nguyên Vũ Trụ ({epochs.length})
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'simulation'
                ? 'bg-gradient-to-r from-cyan-900 to-blue-900 text-cyan-200 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>⚡</span> Thần Tích & Kế Thừa
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {activeTab === 'deities' && (
          <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* List */}
            <div className="w-full md:w-80 border-r border-white/10 bg-gray-950/80 p-4 space-y-2 overflow-y-auto custom-scrollbar">
              {deities.map(d => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDeityId(d.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedDeityId === d.id
                      ? 'bg-purple-950/70 border-amber-400 shadow-md ring-1 ring-amber-400/30'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <span className="text-[10px] font-mono text-pink-400 font-bold block">{d.tier}</span>
                  <h4 className="font-bold text-xs text-white">{d.name}</h4>
                  <span className="text-[11px] text-amber-300 block">{d.trueDivineTitle}</span>
                  <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{d.cosmicDomain}</p>
                </div>
              ))}
            </div>

            {/* Details */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
              <div className="p-6 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono uppercase text-pink-400 font-bold">
                      {selectedDeity.pantheonFaction} • {selectedDeity.tier}
                    </span>
                    <h3 className="text-xl font-black text-vip-gold">{selectedDeity.name}</h3>
                    <span className="text-xs text-amber-300 italic">{selectedDeity.trueDivineTitle}</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('simulation')}
                    className="px-4 py-2 bg-gradient-to-r from-vip-purple to-pink-600 rounded-xl text-xs font-bold text-white shadow-md"
                  >
                    Mô Phỏng Thần Tích
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-amber-300 block">Quyền Năng & Lĩnh Vực Vũ Trụ:</strong>
                    <p className="text-gray-300">{selectedDeity.cosmicDomain}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                    <strong className="text-cyan-300 block">Chí Bảo Khai Thiên:</strong>
                    <p className="text-gray-300">{selectedDeity.primordialArtifact}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-2">
                  <strong className="text-purple-300 block">Thần Tướng & Pháp Thân:</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedDeity.divineFormAndAura}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-2">
                  <strong className="text-pink-300 block">Nguồn Gốc Khởi Nguyên:</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedDeity.originStory}</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-2">
                  <strong className="text-yellow-300 block">Dấu Ấn Chi Phối Nhân Gian Hiện Tại:</strong>
                  <p className="text-gray-300 leading-relaxed">{selectedDeity.activeInfluenceOnMortalRealm}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'epochs' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {epochs.map(ep => (
                <div
                  key={ep.id}
                  className="p-5 rounded-2xl bg-gray-950 border border-amber-500/30 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h4 className="font-black text-sm text-amber-300">{ep.epochName}</h4>
                    <span className="text-xs font-mono text-gray-400">{ep.cosmicAgeDuration}</span>
                  </div>
                  <h5 className="font-bold text-xs text-white">{ep.eventTitle}</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">{ep.cosmicGenesisPhenomenon}</p>

                  <div className="p-3 rounded-xl bg-gray-900 border border-white/5 text-xs space-y-1">
                    <strong className="text-pink-300 block">Cao trào hủy diệt:</strong>
                    <p className="text-gray-400">{ep.cataclysmicClimax}</p>
                  </div>

                  <div className="text-xs space-y-1">
                    <strong className="text-cyan-300 block">Di vật còn lưu lại tại nhân gian:</strong>
                    <p className="text-gray-300">{ep.legacyVestigesInMortalRealm}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'simulation' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="p-4 rounded-xl bg-gray-900 border border-purple-500/30 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Thần linh:</label>
                <select
                  value={selectedDeityId}
                  onChange={e => setSelectedDeityId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                >
                  {deities.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Dạng phân cảnh:</label>
                <select
                  value={sceneType}
                  onChange={e => setSceneType(e.target.value as any)}
                  className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-white"
                >
                  <option value="TombAwakening">Khai mở mộ phần Thần Linh</option>
                  <option value="GodhoodInheritance">Kế thừa Thần Cách viễn cổ</option>
                  <option value="DivineBattle">Thần Ma va chạm diệt thế</option>
                  <option value="CreationGenesis">Khai Thiên Lập Địa nguyên thủy</option>
                </select>
              </div>

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

              <div className="md:col-span-3 flex justify-end">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-5 py-2 bg-gradient-to-r from-vip-purple to-pink-600 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-1.5"
                >
                  {isSimulating ? <Spinner /> : <span>✨</span>}
                  <span>Mô Phỏng Viết Phân Cảnh Thần Tích</span>
                </button>
              </div>
            </div>

            {simulationResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-vip-gold/30 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-base font-bold text-vip-gold">PHÂN CẢNH THẦN TÍCH HOÀN CHỈNH</h3>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        onInsertText(simulationResult.proseScene || simulationResult);
                        alert('Đã chèn vào chương truyện!');
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold"
                    >
                      Chèn vào truyện
                    </button>
                  )}
                </div>
                <div className="prose prose-invert max-w-none text-gray-200 text-sm md:text-base leading-relaxed font-serif whitespace-pre-line">
                  {simulationResult.proseScene || JSON.stringify(simulationResult, null, 2)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
