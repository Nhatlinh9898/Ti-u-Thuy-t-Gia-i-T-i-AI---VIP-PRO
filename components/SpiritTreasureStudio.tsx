import React, { useState } from 'react';
import { SpiritCrystalItem, NaturalTreasureItem, AncientArtifactItem } from '../types';
import { PRESET_SPIRIT_CRYSTALS, PRESET_NATURAL_TREASURES, PRESET_ANCIENT_ARTIFACTS } from '../data/presetTreasures';

interface SpiritTreasureStudioProps {
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const SpiritTreasureStudio: React.FC<SpiritTreasureStudioProps> = ({ genre = 'Tiên Hiệp', onInsertText }) => {
  const [activeTab, setActiveTab] = useState<'crystals' | 'natural' | 'artifacts'>('crystals');
  const [selectedId, setSelectedId] = useState<string>(PRESET_SPIRIT_CRYSTALS[0].id);

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-amber-950/40 to-gray-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💎</span>
          <div>
            <h2 className="text-base font-bold text-amber-300">LINH TINH, THIÊN TÀI ĐỊA BẢO & CỔ KHÍ</h2>
            <p className="text-[11px] text-gray-400">Kho bảo vật trời đất, khoáng thạch, linh tủy và thần khí thái cổ</p>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="px-4 pt-3 flex gap-2 border-b border-white/10 bg-gray-900/50">
        <button
          onClick={() => {
            setActiveTab('crystals');
            setSelectedId(PRESET_SPIRIT_CRYSTALS[0].id);
          }}
          className={`px-3 py-1.5 rounded-t-lg text-xs font-bold border-b-2 ${
            activeTab === 'crystals'
              ? 'border-amber-400 text-amber-300 bg-amber-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          💎 Linh Tinh & Thạch ({PRESET_SPIRIT_CRYSTALS.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('natural');
            setSelectedId(PRESET_NATURAL_TREASURES[0].id);
          }}
          className={`px-3 py-1.5 rounded-t-lg text-xs font-bold border-b-2 ${
            activeTab === 'natural'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🌿 Thiên Tài Địa Bảo ({PRESET_NATURAL_TREASURES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('artifacts');
            setSelectedId(PRESET_ANCIENT_ARTIFACTS[0].id);
          }}
          className={`px-3 py-1.5 rounded-t-lg text-xs font-bold border-b-2 ${
            activeTab === 'artifacts'
              ? 'border-purple-400 text-purple-300 bg-purple-950/40'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          🏺 Cổ Khí Viễn Cổ ({PRESET_ANCIENT_ARTIFACTS.length})
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {activeTab === 'crystals' && (
          <div className="space-y-4">
            {PRESET_SPIRIT_CRYSTALS.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-gray-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-950/80">
                      {c.grade}
                    </span>
                    <h3 className="text-base font-bold text-vip-gold mt-1">{c.name}</h3>
                  </div>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        onInsertText(`[BẢO VẬT: ${c.name} - ${c.grade}]\n- Thuộc tính: ${c.attribute}\n- Độ tinh thuần: ${c.energyPurity}\n- Giá trị: ${c.marketValue}\n- Khai thác tại: ${c.miningLocation}\n- Tác dụng: ${c.primaryUses.join(', ')}`);
                        alert('Đã chèn bảo vật vào truyện!');
                      }}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-500 rounded text-xs font-bold"
                    >
                      Chèn vào truyện
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Hình thái bên ngoài:</span>
                    <p className="text-gray-200 mt-0.5">{c.appearance}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Độ thuần khiết năng lượng:</span>
                    <p className="text-amber-200 mt-0.5">{c.energyPurity}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Nơi khai thác & Độ nguy hiểm:</span>
                    <p className="text-gray-300 mt-0.5">{c.miningLocation} - {c.rarityAndDanger}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Ứng dụng chủ đạo:</span>
                    <ul className="list-disc list-inside text-gray-300 mt-0.5">
                      {c.primaryUses.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'natural' && (
          <div className="space-y-4">
            {PRESET_NATURAL_TREASURES.map(t => (
              <div key={t.id} className="p-4 rounded-xl bg-gray-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/80">
                      {t.tier} • {t.growthYears}
                    </span>
                    <h3 className="text-base font-bold text-emerald-300 mt-1">{t.name}</h3>
                  </div>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        onInsertText(`[THIÊN TÀI ĐỊA BẢO: ${t.name}]\n- Phẩm giai: ${t.tier} (${t.growthYears})\n- Linh thú hộ vệ: ${t.guardianMonster}\n- Thần hiệu: ${t.miraculousEffect}\n- Tác dụng phụ/Nguy cơ: ${t.sideEffectsOrDangers}`);
                        alert('Đã chèn địa bảo vào truyện!');
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 rounded text-xs font-bold"
                    >
                      Chèn vào truyện
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Thú hộ vệ:</span>
                    <p className="text-red-300 mt-0.5">{t.guardianMonster}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Cách thu hái:</span>
                    <p className="text-gray-200 mt-0.5">{t.collectionMethod}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-emerald-400 font-semibold">Công hiệu thần kỳ:</span>
                    <p className="text-emerald-200 mt-0.5">{t.miraculousEffect}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'artifacts' && (
          <div className="space-y-4">
            {PRESET_ANCIENT_ARTIFACTS.map(a => (
              <div key={a.id} className="p-4 rounded-xl bg-gray-950 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-purple-400 font-bold px-2 py-0.5 rounded bg-purple-950/80">
                      {a.era} • {a.state}
                    </span>
                    <h3 className="text-base font-bold text-vip-gold mt-1">{a.name}</h3>
                  </div>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        onInsertText(`[CỔ VẬT VIỄN CỔ: ${a.name}]\n- Niên đại: ${a.era} (${a.state})\n- Khí linh: ${a.spiritEntity.hasSpirit ? `${a.spiritEntity.spiritName} (${a.spiritEntity.spiritPersonality})` : 'Chưa thức tỉnh'}\n- Uy lực: ${a.activePower}\n- Điều kiện giải phong: ${a.unsealingCondition}`);
                        alert('Đã chèn cổ vật vào truyện!');
                      }}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded text-xs font-bold"
                    >
                      Chèn vào truyện
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Khí Linh thức tỉnh:</span>
                    <p className="text-purple-300 mt-0.5">
                      {a.spiritEntity.hasSpirit ? `${a.spiritEntity.spiritName} - ${a.spiritEntity.spiritPersonality}` : 'Chưa có khí linh'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Điều kiện giải ấn:</span>
                    <p className="text-amber-300 mt-0.5">{a.unsealingCondition}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-400">Uy lực kích hoạt:</span>
                    <p className="text-gray-200 mt-0.5">{a.activePower}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-400">Lai lịch & Sự tích:</span>
                    <p className="text-gray-400 mt-0.5">{a.backstoryAndDestruction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
