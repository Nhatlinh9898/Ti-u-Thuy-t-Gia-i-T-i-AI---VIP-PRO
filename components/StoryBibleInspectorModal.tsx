import React, { useState } from 'react';
import {
  ALL_MASTER_PRESET_STORIES,
  MasterPresetStoryBundle,
  StoryBibleVolumeDetail,
  StoryBibleChapterDetail
} from '../data/presetMasterNovelBible';

interface StoryBibleInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadStory: (story: MasterPresetStoryBundle) => void;
  onInsertText: (text: string) => void;
}

type InspectorSubTab = 'chapters' | 'characters' | 'cultivation' | 'factions' | 'subplots';

export const StoryBibleInspectorModal: React.FC<StoryBibleInspectorModalProps> = ({
  isOpen,
  onClose,
  onLoadStory,
  onInsertText
}) => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('story_kiem_ton');
  const [activeTab, setActiveTab] = useState<InspectorSubTab>('chapters');
  const [selectedVolumeIndex, setSelectedVolumeIndex] = useState<number>(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<number>(0);
  const [copiedState, setCopiedState] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentStory = ALL_MASTER_PRESET_STORIES.find(s => s.id === selectedStoryId) || ALL_MASTER_PRESET_STORIES[0];
  const dossier = currentStory.detailedBible;
  const currentVolume: StoryBibleVolumeDetail | undefined = dossier?.volumes?.[selectedVolumeIndex];
  const currentChapter: StoryBibleChapterDetail | undefined = currentVolume?.chapters?.[selectedChapterIndex];

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedState(label);
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleExportMarkdownBible = () => {
    if (!dossier) return;
    let md = `# HỒ SƠ BỘ CỐT TRUYỆN: ${dossier.grandTitle}\n\n`;
    md += `**Thể loại**: ${currentStory.genre}\n`;
    md += `**Khẩu hiệu**: ${currentStory.tagline}\n`;
    md += `**Triết lý nghệ thuật**: ${dossier.storyPhilosophy}\n\n`;

    md += `## 1. DÀN NHÂN VẬT TRỌNG YẾU\n`;
    dossier.majorCharacters.forEach(c => {
      md += `### ${c.name} (${c.pinyinOrAlias || ''}) - ${c.role}\n`;
      md += `- **Cảnh giới**: ${c.realmOrRank}\n`;
      md += `- **Thế lực**: ${c.sectOrFaction || 'Tán tu'} (${c.factionPosition || ''})\n`;
      md += `- **Linh căn / Thể chất**: ${c.spiritualRoots || 'Chưa rõ'}\n`;
      md += `- **Tính cách**: ${c.personality}\n`;
      md += `- **Binh khí / Tuyệt kỹ**: ${c.weaponOrAbility}\n`;
      md += `- **Lai lịch**: ${c.backstory}\n\n`;
    });

    md += `## 2. HỆ THỐNG CẢNH GIỚI\n`;
    dossier.exclusiveRealms.forEach(r => {
      md += `### ${r.realmName}\n`;
      md += `- Phân kỳ: ${r.stages}\n`;
      md += `- Dị tượng: ${r.breakthroughPhenomenon}\n`;
      md += `- Nguy cơ: ${r.daoRiskAndBottleneck}\n`;
      md += `- Thần thông: ${r.exclusiveDivineAbility}\n\n`;
    });

    md += `## 3. CẤU TRÚC 5 QUYỂN & CÁC CHƯƠNG CHI TIẾT\n`;
    dossier.volumes.forEach(vol => {
      md += `### ${vol.title}\n`;
      md += `*Tóm tắt quyển*: ${vol.summary}\n`;
      md += `*Cảnh giới trọng tâm*: ${vol.realmFocus}\n\n`;
      vol.chapters.forEach(ch => {
        md += `#### ${ch.title}\n`;
        md += `- Tóm tắt: ${ch.summary}\n`;
        md += `- Xung đột: ${ch.coreConflict}\n`;
        md += `- Mục tiêu: ${ch.characterObjective}\n`;
        md += `- Phục bút: ${ch.foreshadowingAndClues}\n`;
        md += `- Chiến lợi phẩm: ${ch.lootOrBreakthrough}\n\n`;
      });
    });

    handleCopyText(md, 'Toàn bộ hồ sơ Markdown');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-6xl bg-[#090d16] border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col h-[94vh] overflow-hidden text-xs text-gray-200">
        
        {/* TOP BAR: STORY SELECTOR & HEADER */}
        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-gray-950 via-[#111625] to-gray-950 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">📜</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Chi Tiết Hồ Sơ Cốt Truyện Kinh Điển
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  AI Story Bible v2.0
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                Bộ khung tiểu thuyết hoàn chỉnh 5 quyển 20 chương, nhân vật, cảnh giới và mạch nhánh sẵn sàng cho AI viết tiếp
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdownBible}
              className="px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1.5 text-xs"
              title="Sao chép toàn bộ hồ sơ cốt truyện dưới dạng Markdown"
            >
              <span>{copiedState === 'Toàn bộ hồ sơ Markdown' ? '✅' : '📋'}</span>
              <span>{copiedState === 'Toàn bộ hồ sơ Markdown' ? 'Đã Sao Chép!' : 'Xuất Markdown'}</span>
            </button>
            <button
              onClick={() => onLoadStory(currentStory)}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white font-bold transition-all shadow-md border border-amber-400/40 flex items-center gap-1.5 text-xs hover:scale-[1.02]"
            >
              <span>⚡</span>
              <span>Nạp Bộ Này Vào Hệ Thống AI</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg text-sm font-bold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* STORY BUNDLE SWITCHER PILLS */}
        <div className="px-4 py-2.5 bg-black/40 border-b border-white/5 flex flex-wrap items-center gap-2 shrink-0">
          <span className="text-[11px] font-semibold text-gray-400 mr-1">CHỌN BỘ CỐT TRUYỆN:</span>
          {ALL_MASTER_PRESET_STORIES.map(story => {
            const isSelected = story.id === selectedStoryId;
            return (
              <button
                key={story.id}
                onClick={() => {
                  setSelectedStoryId(story.id);
                  setSelectedVolumeIndex(0);
                  setSelectedChapterIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? `${story.badgeColor} shadow-lg shadow-amber-950/40 ring-1 ring-amber-400/50 scale-[1.02]`
                    : 'bg-gray-900/60 border-white/10 text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                <span>{story.id === 'story_kiem_ton' ? '⚔️' : story.id === 'story_ma_ton' ? '🩸' : '👑'}</span>
                <span>{story.title}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/40 text-gray-300 font-mono">
                  {story.detailedBible ? '5 Quyển • 20 Chương' : '3 Quyển'}
                </span>
              </button>
            );
          })}
        </div>

        {/* NAVIGATION SUB-TABS */}
        <div className="px-4 bg-gray-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto py-1.5 custom-scrollbar">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'chapters'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>📚</span>
              <span>Cấu Trúc 5 Quyển & 20 Chương ({dossier?.volumes?.reduce((acc, v) => acc + v.chapters.length, 0) || 0} Chương)</span>
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'characters'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>👥</span>
              <span>Dàn Nhân Vật Trọng Yếu ({dossier?.majorCharacters?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('cultivation')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'cultivation'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>⚡</span>
              <span>Cảnh Giới & Tuyệt Kỹ Độc Quyền</span>
            </button>
            <button
              onClick={() => setActiveTab('factions')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'factions'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🗺️</span>
              <span>Thế Lực & Cấm Địa ({dossier?.majorFactions?.length || 0})</span>
            </button>
            <button
              onClick={() => setActiveTab('subplots')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'subplots'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>🌿</span>
              <span>Mạch Nhánh Hợp Lưu ({dossier?.subStoryTrajectories?.length || 0})</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-gray-400 font-mono">
            <span className="text-amber-400">Nhân vật:</span> {currentStory.protagonist}
          </div>
        </div>

        {/* MAIN BODY AREA */}
        <div className="flex-1 overflow-hidden p-4">
          
          {/* TAB 1: 5 VOLUMES & 20 CHAPTERS INSPECTOR */}
          {activeTab === 'chapters' && (
            <div className="h-full flex flex-col md:flex-row gap-4 overflow-hidden">
              
              {/* LEFT COLUMN: VOLUMES & CHAPTERS ACCORDION */}
              <div className="w-full md:w-80 shrink-0 flex flex-col bg-gray-950/80 border border-white/10 rounded-xl overflow-hidden">
                <div className="p-3 border-b border-white/10 bg-black/40 flex items-center justify-between">
                  <span className="font-bold text-white text-xs flex items-center gap-1.5">
                    <span>📖</span> Danh Sách 5 Quyển
                  </span>
                  <span className="text-[10px] text-amber-400 font-mono">20 Chương Chi Tiết</span>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                  {dossier?.volumes?.map((vol, vIdx) => {
                    const isVolSelected = vIdx === selectedVolumeIndex;
                    return (
                      <div key={vol.id} className="rounded-lg border border-white/5 overflow-hidden bg-gray-900/40">
                        <button
                          onClick={() => {
                            setSelectedVolumeIndex(vIdx);
                            setSelectedChapterIndex(0);
                          }}
                          className={`w-full p-2.5 text-left transition-all flex items-center justify-between ${
                            isVolSelected
                              ? 'bg-amber-950/40 border-l-4 border-l-amber-500 text-amber-200 font-bold'
                              : 'hover:bg-white/5 text-gray-300'
                          }`}
                        >
                          <div className="truncate pr-1">
                            <div className="text-[11px] truncate">{vol.title}</div>
                            <div className="text-[10px] text-gray-400 font-mono truncate">{vol.realmFocus}</div>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-gray-400 font-mono shrink-0">
                            {vol.chapters.length} chương
                          </span>
                        </button>

                        {/* Chapter List under Selected Volume */}
                        {isVolSelected && (
                          <div className="p-1.5 space-y-1 bg-black/50 border-t border-white/5">
                            {vol.chapters.map((ch, chIdx) => {
                              const isChapSelected = chIdx === selectedChapterIndex;
                              return (
                                <button
                                  key={ch.id}
                                  onClick={() => setSelectedChapterIndex(chIdx)}
                                  className={`w-full p-2 rounded text-left text-[11px] transition-all flex items-center justify-between ${
                                    isChapSelected
                                      ? 'bg-amber-500/20 text-white font-semibold border border-amber-500/40 pl-3'
                                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                                  }`}
                                >
                                  <span className="truncate pr-2">
                                    {ch.title}
                                  </span>
                                  {isChapSelected && <span className="text-amber-400 text-xs shrink-0">▶</span>}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {currentVolume && (
                  <div className="p-2.5 border-t border-white/10 bg-black/60 text-[10px] text-gray-400">
                    <span className="text-amber-300 font-semibold">Thế lực giao tranh:</span>{' '}
                    <span className="line-clamp-2">{currentVolume.mainFactionsClash}</span>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: DETAILED CHAPTER BLUEPRINT & PROSE DRAFT */}
              <div className="flex-1 flex flex-col bg-gray-950/90 border border-white/10 rounded-xl overflow-hidden">
                {currentChapter ? (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    
                    {/* Chapter Header Card */}
                    <div className="p-4 border-b border-white/10 bg-gradient-to-r from-amber-950/30 via-gray-900 to-gray-950 flex flex-wrap items-center justify-between gap-3 shrink-0">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                            Chương {currentChapter.chapterNumber}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {currentVolume?.title.split('•')[0]}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1">
                          {currentChapter.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyText(currentChapter.proseDraftSample, `Đoạn văn ${currentChapter.title}`)}
                          className="px-2.5 py-1 rounded bg-gray-900 hover:bg-gray-800 border border-white/10 text-gray-300 hover:text-white transition-all flex items-center gap-1 text-[11px]"
                        >
                          <span>{copiedState === `Đoạn văn ${currentChapter.title}` ? '✅' : '📋'}</span>
                          <span>Chép Văn Mẫu</span>
                        </button>
                        <button
                          onClick={() => {
                            onInsertText(currentChapter.proseDraftSample);
                            alert(`Đã đưa bản thảo "${currentChapter.title}" vào trình soạn thảo chính!`);
                          }}
                          className="px-3 py-1 rounded bg-amber-600/80 hover:bg-amber-500 text-white font-bold transition-all border border-amber-400/40 text-[11px] flex items-center gap-1 shadow-sm"
                        >
                          <span>✨</span>
                          <span>Đưa Vào Soạn Thảo</span>
                        </button>
                      </div>
                    </div>

                    {/* Chapter Details Grid & Prose */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                      
                      {/* Summary Box */}
                      <div className="p-3.5 rounded-xl bg-gray-900/60 border border-white/5 space-y-1">
                        <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                          Tóm Tắt Biến Cố & Diễn Biến Cốt Truyện
                        </div>
                        <p className="text-xs text-gray-200 leading-relaxed">
                          {currentChapter.summary}
                        </p>
                      </div>

                      {/* 4 Core Pillars of Chapter */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
                          <div className="flex items-center gap-1.5 text-red-300 font-bold text-[11px]">
                            <span>⚔️</span>
                            <span>Xung Đột Cốt Lõi (Core Conflict)</span>
                          </div>
                          <p className="text-[11px] text-gray-300 leading-relaxed">
                            {currentChapter.coreConflict}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1">
                          <div className="flex items-center gap-1.5 text-blue-300 font-bold text-[11px]">
                            <span>🎯</span>
                            <span>Mục Tiêu Nhân Vật (Character Objective)</span>
                          </div>
                          <p className="text-[11px] text-gray-300 leading-relaxed">
                            {currentChapter.characterObjective}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-1">
                          <div className="flex items-center gap-1.5 text-purple-300 font-bold text-[11px]">
                            <span>🔍</span>
                            <span>Manh Mối & Phục Bút (Foreshadowing)</span>
                          </div>
                          <p className="text-[11px] text-gray-300 leading-relaxed">
                            {currentChapter.foreshadowingAndClues}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px]">
                            <span>💎</span>
                            <span>Chiến Lợi Phẩm / Đột Phá (Breakthrough)</span>
                          </div>
                          <p className="text-[11px] text-gray-300 leading-relaxed">
                            {currentChapter.lootOrBreakthrough}
                          </p>
                        </div>
                      </div>

                      {/* Prose Draft Sample Box */}
                      <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                            <span>✍️</span>
                            <span>Trích Đoạn Văn Xuôi Chuẩn Cổ Phong / Ma Đạo Mẫu</span>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">
                            {currentChapter.proseDraftSample.length} ký tự
                          </span>
                        </div>
                        <div className="p-3 bg-gray-950/90 rounded-lg border border-white/5 font-serif text-[12px] text-gray-200 leading-loose whitespace-pre-line max-h-72 overflow-y-auto custom-scrollbar select-text">
                          {currentChapter.proseDraftSample}
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Chọn một chương để xem chi tiết
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CHARACTER DOSSIER */}
          {activeTab === 'characters' && (
            <div className="h-full overflow-y-auto custom-scrollbar pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dossier?.majorCharacters.map(char => (
                  <div
                    key={char.id}
                    className="p-4 rounded-xl bg-gray-950/80 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-3 group shadow-lg"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                            {char.name}
                          </h4>
                          <div className="text-[10px] text-gray-400 italic">
                            {char.pinyinOrAlias}
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold border ${
                          char.role === 'Chính diện'
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                            : char.role === 'Phản diện'
                            ? 'bg-red-950/60 border-red-500/40 text-red-300'
                            : 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                        }`}>
                          {char.role}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5 text-[11px]">
                        <div>
                          <span className="text-gray-400 font-semibold">Cảnh giới:</span>{' '}
                          <span className="text-amber-300 font-mono">{char.realmOrRank}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-semibold">Thế lực:</span>{' '}
                          <span className="text-gray-300">{char.sectOrFaction} ({char.factionPosition})</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-semibold">Linh căn / Khí tức:</span>{' '}
                          <span className="text-purple-300">{char.spiritualRoots}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 font-semibold">Binh khí / Tuyệt chiêu:</span>{' '}
                          <span className="text-cyan-300">{char.weaponOrAbility}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Tính Cách:</div>
                        <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-2">
                          {char.personality}
                        </p>
                      </div>

                      <div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Bối Cảnh & Quá Khứ:</div>
                        <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-3">
                          {char.backstory}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-400">
                      <span className="font-mono text-amber-400/80">Khí vận: {char.destinyFate}</span>
                      <button
                        onClick={() => handleCopyText(JSON.stringify(char, null, 2), `Hồ sơ ${char.name}`)}
                        className="hover:text-white transition-colors"
                        title="Sao chép hồ sơ JSON"
                      >
                        📋 Sao chép
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CULTIVATION REALMS & SUPREME ARTS */}
          {activeTab === 'cultivation' && (
            <div className="h-full overflow-y-auto custom-scrollbar pr-1 space-y-5">
              
              {/* Cultivation Hierarchy */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <span className="text-base">⚡</span>
                  <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Hệ Thống Cảnh Giới Đột Phá Độc Quyền
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dossier?.exclusiveRealms.map(r => (
                    <div key={r.level} className="p-3.5 rounded-xl bg-gray-950/80 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-[10px]">
                            {r.level}
                          </span>
                          {r.realmName}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{r.stages}</span>
                      </div>

                      <div className="space-y-1.5 text-[11px] pt-1">
                        <div>
                          <span className="text-amber-400 font-semibold">✨ Dị tượng phá cảnh:</span>{' '}
                          <span className="text-gray-300">{r.breakthroughPhenomenon}</span>
                        </div>
                        <div>
                          <span className="text-red-400 font-semibold">⚠️ Nguy cơ & Nút thắt:</span>{' '}
                          <span className="text-gray-300">{r.daoRiskAndBottleneck}</span>
                        </div>
                        <div>
                          <span className="text-cyan-400 font-semibold">🌀 Thần thông độc quyền:</span>{' '}
                          <span className="text-cyan-200">{r.exclusiveDivineAbility}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supreme Cultivation Arts & Artifacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* Supreme Arts */}
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-xs border-b border-purple-500/20 pb-2">
                    <span>📜</span>
                    <span>Đại Công Pháp Trấn Thế</span>
                  </div>
                  {dossier?.supremeCultivationArts.map((art, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{art.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-500/30">
                          {art.tier}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">{art.description}</p>
                      <div className="text-[10px] text-gray-400">
                        <span className="text-amber-400">Tầng thứ:</span> {art.layersSummary}
                      </div>
                      <div className="text-[10px] text-red-300 font-medium">
                        <span className="text-red-400">Tuyệt kỹ cấm kỵ:</span> {art.forbiddenMove}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Supreme Artifacts */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs border-b border-amber-500/20 pb-2">
                    <span>🗡️</span>
                    <span>Pháp Bảo & Binh Khí Chí Tôn</span>
                  </div>
                  {dossier?.supremeArtifacts.map((art, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{art.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-900/50 text-amber-300 border border-amber-500/30">
                          {art.rank}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        <span className="text-gray-300 font-semibold">Nguồn gốc:</span> {art.origin}
                      </div>
                      <div className="text-[11px] text-amber-200/90 leading-relaxed">
                        <span className="text-amber-400 font-semibold">Uy năng đặc dị:</span> {art.specialPower}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: FACTIONS & FORBIDDEN TERRITORIES */}
          {activeTab === 'factions' && (
            <div className="h-full overflow-y-auto custom-scrollbar pr-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dossier?.majorFactions.map(fac => (
                  <div
                    key={fac.id}
                    className="p-4 rounded-xl bg-gray-950/80 border border-white/10 hover:border-amber-400/30 transition-all space-y-2.5 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white">{fac.name}</h4>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                          Lãnh tụ: <span className="text-amber-300">{fac.leader}</span> • Địa bàn: {fac.territory}
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-gray-900 border border-white/10 text-gray-300 shrink-0 font-medium">
                        {fac.type}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px]">
                      <div>
                        <span className="text-gray-400 font-semibold">Tôn chỉ thế lực:</span>{' '}
                        <span className="text-gray-300">{fac.doctrine}</span>
                      </div>
                      <div>
                        <span className="text-amber-400 font-semibold">Quan hệ với nhân vật chính:</span>{' '}
                        <span className="text-white font-medium">{fac.relationshipWithProtagonist}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 text-[11px]">
                      <span className="text-red-400 font-bold">Bí mật giấu kín:</span>{' '}
                      <span className="text-red-200/90">{fac.hiddenSecret}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SUBPLOT NEXUSES */}
          {activeTab === 'subplots' && (
            <div className="h-full overflow-y-auto custom-scrollbar pr-1 space-y-4">
              <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl text-xs text-amber-200/90 leading-relaxed flex items-center gap-2">
                <span className="text-lg">🌿</span>
                <span>
                  Các mạch truyện nhánh dưới đây đã được kết nối mật thiết với từng hồi trong 5 Quyển chính. Khi sáng tác, tác giả có thể chuyển qua tab <strong>"🌿 Phân Nhánh"</strong> để tạo tình tiết phụ hoặc kích hoạt hợp lưu về mạch chính!
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dossier?.subStoryTrajectories.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gray-950/80 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between space-y-3 shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-purple-900/40 border border-purple-500/30 text-purple-300 font-bold">
                          {sub.type}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">Nhánh #{idx + 1}</span>
                      </div>

                      <h4 className="text-xs font-bold text-white leading-snug">
                        {sub.title}
                      </h4>

                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px]">
                        <span className="text-gray-400 font-semibold">Tình tiết khơi mào (Hook):</span>
                        <p className="text-gray-300 leading-relaxed">{sub.hook}</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[11px]">
                      <span className="text-emerald-400 font-bold">Điểm hợp lưu mạch chính:</span>{' '}
                      <p className="text-emerald-200/90 mt-0.5 leading-relaxed">{sub.convergencePoint}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="p-3.5 bg-black/70 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <span className="text-amber-400 font-bold">Đang xem:</span> {currentStory.title}
            <span className="text-gray-600">|</span>
            <span>{currentStory.genre}</span>
            <span className="text-gray-600">|</span>
            <span className="text-emerald-300 font-mono">{dossier?.volumes?.length || 5} Quyển • 20 Chương</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-white/10 text-gray-300 text-xs transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => onLoadStory(currentStory)}
              className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-md border border-amber-300/40 flex items-center gap-1.5 transition-all hover:scale-[1.02]"
            >
              <span>⚡</span>
              <span>Nạp Toàn Bộ Vào AI Studio</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
