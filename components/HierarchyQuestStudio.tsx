import React, { useState } from 'react';
import { QuestItem } from '../types';
import { PRESET_QUESTS } from '../data/presetSectCitadelMissions';

interface HierarchyQuestStudioProps {
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const HierarchyQuestStudio: React.FC<HierarchyQuestStudioProps> = ({ genre = 'Tiên Hiệp', onInsertText }) => {
  const [quests] = useState<QuestItem[]>(PRESET_QUESTS);
  const [selectedQuestId, setSelectedQuestId] = useState<string>(PRESET_QUESTS[0]?.id || '');

  const selectedQuest = quests.find(q => q.id === selectedQuestId) || quests[0];

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-rose-950/40 to-gray-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">📜</span>
          <div>
            <h2 className="text-base font-bold text-rose-300">NHIỆM VỤ TÔNG MÔN, THÀNH THÀNH & THÁM HIỂM</h2>
            <p className="text-[11px] text-gray-400">Hệ thống bảng vàng treo thưởng, trảm yêu trừ ma và thăng cấp đệ tử</p>
          </div>
        </div>
      </div>

      {/* Select Quest Tabs */}
      <div className="px-4 py-2 border-b border-white/10 bg-gray-900/60 flex items-center gap-2 overflow-x-auto custom-scrollbar">
        {quests.map(q => (
          <button
            key={q.id}
            onClick={() => setSelectedQuestId(q.id)}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold transition-all ${
              selectedQuest.id === q.id
                ? 'bg-gradient-to-r from-red-800 to-rose-800 text-vip-gold border border-vip-gold/40 shadow-sm'
                : 'bg-gray-800/80 text-gray-400 hover:text-white'
            }`}
          >
            {q.title}
          </button>
        ))}
      </div>

      {/* Quest Details */}
      {selectedQuest && (
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gray-950 border border-rose-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-mono uppercase text-red-400 font-bold px-2 py-0.5 rounded bg-red-950/80">
                    Phẩm cấp: {selectedQuest.rankGrade}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/80">
                    Tu vi yêu cầu: {selectedQuest.requiredRealm}
                  </span>
                </div>
                <h3 className="text-xl font-black text-vip-gold mt-1">{selectedQuest.title}</h3>
                <p className="text-xs text-gray-400">Nơi phát hành: {selectedQuest.issuerLocationOrSect} • Thời hạn: {selectedQuest.timeLimit}</p>
              </div>
              {onInsertText && (
                <button
                  onClick={() => {
                    onInsertText(`[NHIỆM VỤ: ${selectedQuest.title} - Cấp ${selectedQuest.rankGrade}]\n- Nơi tiếp nhận: ${selectedQuest.issuerLocationOrSect}\n- Mục tiêu: ${selectedQuest.missionObjectives.join('; ')}\n- Đối thủ: ${selectedQuest.targetAntagonistOrObstacle}\n- Phần thưởng: Điểm cống hiến: ${selectedQuest.rewards.sectContributionPoints || '0'}, Linh thạch: ${selectedQuest.rewards.spiritStones}, Đan dược/Bảo vật: ${selectedQuest.rewards.pillsOrArtifacts}\n- Hình phạt thất bại: ${selectedQuest.failurePenalty}`);
                    alert('Đã chèn nhiệm vụ vào truyện!');
                  }}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 rounded text-xs font-bold"
                >
                  Chèn vào truyện
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-2">
                <span className="text-red-300 font-bold">Mục Tiêu Nhiệm Vụ:</span>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {selectedQuest.missionObjectives.map((obj, idx) => (
                    <li key={idx}>{obj}</li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-white/5">
                  <span className="text-gray-400">Mục tiêu cản trở:</span>
                  <p className="text-red-300 font-semibold">{selectedQuest.targetAntagonistOrObstacle}</p>
                </div>
              </div>

              <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-2">
                <span className="text-amber-300 font-bold">Phần Thưởng Hậu Hĩnh:</span>
                {selectedQuest.rewards.sectContributionPoints && (
                  <p className="text-gray-300">• Điểm cống hiến môn phái: <span className="text-amber-300 font-bold">{selectedQuest.rewards.sectContributionPoints}</span></p>
                )}
                <p className="text-gray-300">• Linh thạch ban thưởng: <span className="text-emerald-300 font-bold">{selectedQuest.rewards.spiritStones}</span></p>
                <p className="text-gray-300">• Pháp bảo / Đan dược: <span className="text-vip-gold font-bold">{selectedQuest.rewards.pillsOrArtifacts}</span></p>
                <p className="text-gray-400">• Uy danh gia tăng: {selectedQuest.rewards.reputationGain}</p>
              </div>
            </div>

            <div className="p-3 bg-gray-900/40 rounded-xl text-xs space-y-1">
              <span className="text-purple-400 font-bold">Mầm Mống Tình Tiết Ẩn (Plot Hook):</span>
              <p className="text-purple-200">{selectedQuest.hiddenPlotHook}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
