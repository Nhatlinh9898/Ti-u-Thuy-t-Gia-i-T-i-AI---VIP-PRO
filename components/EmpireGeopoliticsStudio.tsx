import React, { useState } from 'react';
import { NationItem } from '../types';
import { PRESET_NATIONS } from '../data/presetNations';

interface EmpireGeopoliticsStudioProps {
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const EmpireGeopoliticsStudio: React.FC<EmpireGeopoliticsStudioProps> = ({ genre = 'Tiên Hiệp', onInsertText }) => {
  const [nations] = useState<NationItem[]>(PRESET_NATIONS);
  const [selectedNationId, setSelectedNationId] = useState<string>(PRESET_NATIONS[0].id);

  const selectedNation = nations.find(n => n.id === selectedNationId) || nations[0];

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-amber-950/40 to-gray-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">👑</span>
          <h2 className="text-base font-bold text-amber-300">QUỐC GIA, TIÊN TRIỀU & ĐỊA CHÍNH TRỊ</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <div className="p-6 rounded-2xl bg-gray-950 border border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">{selectedNation.canonicalTitle}</span>
              <h3 className="text-xl font-black text-vip-gold">{selectedNation.name}</h3>
            </div>
            {onInsertText && (
              <button
                onClick={() => {
                  onInsertText(`[TIÊN TRIỀU: ${selectedNation.name}]\n- Kinh đô: ${selectedNation.capitalCity}\n- Thánh Hoàng: ${selectedNation.sovereignRuler.name} (${selectedNation.sovereignRuler.realm})\n- Trấn quốc thần khí: ${selectedNation.nationalHeritageTreasure}`);
                  alert('Đã chèn thông tin Tiên Triều vào truyện!');
                }}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold"
              >
                Chèn vào truyện
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
              <strong className="text-amber-300 block">Kinh Đô & Thần Thành:</strong>
              <p className="text-gray-300">{selectedNation.capitalCity}</p>
            </div>
            <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
              <strong className="text-cyan-300 block">Trấn Quốc Thần Khí:</strong>
              <p className="text-gray-300">{selectedNation.nationalHeritageTreasure}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-1">
            <strong className="text-purple-300 block">Tư Tưởng Trị Quốc:</strong>
            <p className="text-gray-300 leading-relaxed">{selectedNation.governancePhilosophy}</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 text-xs space-y-1">
            <strong className="text-pink-300 block">Tổng Quan Bang Giao:</strong>
            <p className="text-gray-300 leading-relaxed">{selectedNation.diplomaticOverview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
