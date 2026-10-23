import React, { useState } from 'react';
import { LoreNetworkNode, StoryVignetteItem } from '../types';
import { PRESET_LORE_NODES, PRESET_STORY_VIGNETTES } from '../data/presetOmniverseLoreNetwork';

interface LoreSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectNode?: (node: LoreNetworkNode) => void;
  onSelectVignette?: (vignette: StoryVignetteItem) => void;
  onInsertText?: (text: string) => void;
}

export const LoreSearchModal: React.FC<LoreSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectNode,
  onSelectVignette,
  onInsertText,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredNodes = PRESET_LORE_NODES.filter(n => {
    const matchesDomain = selectedDomain === 'ALL' || n.domain === selectedDomain;
    const matchesQuery =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.essenceDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesDomain && matchesQuery;
  });

  const filteredVignettes = PRESET_STORY_VIGNETTES.filter(v => {
    return (
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.vignetteProse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.loreTags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gray-950 border border-purple-500/40 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-gray-900 via-purple-950/60 to-gray-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <div>
              <h2 className="text-base font-bold text-vip-gold">TRA CỨU TOÀN THƯ TRI THỨC & TÀN ĐOẠN GIAI THOẠI</h2>
              <p className="text-[11px] text-gray-400">Tìm kiếm nhanh nhân vật, thần linh, pháp bảo, bí cảnh và các mẩu chuyện</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 flex items-center justify-center font-bold"
          >
            ✕
          </button>
        </div>

        {/* Search input & filters */}
        <div className="p-4 border-b border-white/10 bg-gray-900/40 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Nhập tên nhân vật, kiếm quyết, thần thú, bùa chú, cổ thần..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 bg-gray-900 border border-purple-500/30 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-vip-gold"
            autoFocus
          />
          <select
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-vip-gold"
          >
            <option value="ALL">Tất cả lĩnh vực</option>
            <option value="CultivationSpine">Tuyến Mạch Tu Luyện</option>
            <option value="SwordDao">Kiếm Đạo</option>
            <option value="SpellDao">Thuật Pháp</option>
            <option value="TalismanDao">Phù Lục</option>
            <option value="PantheonCosmology">Thần Phả & Vũ Trụ</option>
            <option value="Alchemy">Đan Dược</option>
            <option value="Weapons">Thần Binh</option>
            <option value="Beasts">Yêu Thú</option>
            <option value="Sects">Tông Môn</option>
            <option value="Realms">Bí Cảnh & Địa Danh</option>
            <option value="Characters">Nhân Vật</option>
          </select>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
          {/* Tri thức Nodes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
              <span>🌟</span> Nút Tri Thức ({filteredNodes.length})
            </h3>
            {filteredNodes.length === 0 ? (
              <p className="text-xs text-gray-500 italic">Không tìm thấy thực thể phù hợp.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredNodes.map(node => (
                  <div
                    key={node.id}
                    className="p-3 rounded-xl bg-gray-900/80 border border-white/5 hover:border-vip-gold/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold">
                          {node.domain}
                        </span>
                        <span className="text-xs">{node.icon}</span>
                      </div>
                      <h4 className="text-sm font-bold text-vip-gold mt-1">{node.title}</h4>
                      <p className="text-[11px] text-gray-400">{node.subtitle}</p>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2">{node.essenceDescription}</p>
                    </div>
                    <div className="flex gap-2 mt-3 pt-2 border-t border-white/5">
                      {onInsertText && (
                        <button
                          onClick={() => {
                            onInsertText(`[TRI THỨC: ${node.title}]\n- Lĩnh vực: ${node.domain}\n- Mô tả: ${node.essenceDescription}`);
                            onClose();
                          }}
                          className="px-2.5 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-[11px] font-bold"
                        >
                          Chèn vào truyện
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mẩu truyện đơn lẻ Vignettes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-pink-300 mb-2 flex items-center gap-1.5">
              <span>📖</span> Tàn Đoạn Giai Thoại & Mẩu Truyện ({filteredVignettes.length})
            </h3>
            {filteredVignettes.length === 0 ? (
              <p className="text-xs text-gray-500 italic">Không tìm thấy mẩu truyện phù hợp.</p>
            ) : (
              <div className="space-y-3">
                {filteredVignettes.map(v => (
                  <div key={v.id} className="p-4 rounded-xl bg-gray-900 border border-pink-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-pink-950 text-pink-300 font-bold uppercase">
                          {v.category} • {v.atmosphericMood}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{v.title}</h4>
                      </div>
                      {onInsertText && (
                        <button
                          onClick={() => {
                            onInsertText(`[TRÍCH ĐOẠN GIAI THOẠI: ${v.title}]\n\n${v.vignetteProse}`);
                            onClose();
                          }}
                          className="px-3 py-1 bg-pink-600 hover:bg-pink-500 text-white rounded text-xs font-bold"
                        >
                          Chèn đoạn văn này
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 italic line-clamp-3 bg-black/30 p-2.5 rounded-lg border border-white/5">
                      "{v.vignetteProse}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
