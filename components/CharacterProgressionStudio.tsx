import React, { useState } from 'react';
import {
  CharacterProfile,
  ProgressionStage,
  PowerTierSystem,
  PowerTierLevel
} from '../types';
import {
  PRESET_POWER_TIER_SYSTEMS,
  DEFAULT_CHARACTER_ROADMAPS
} from '../data/presetPowerTiers';
import {
  generatePowerTierSystem,
  generateCharacterRoadmap,
  generateTierEncyclopedia
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface CharacterProgressionStudioProps {
  characters: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
}

export const CharacterProgressionStudio: React.FC<CharacterProgressionStudioProps> = ({
  characters,
  genre = 'Tiên Hiệp Cổ Phong',
  onInsertText,
  onUpdateCharacters
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'roadmap' | 'powerTiers' | 'encyclopedia' | 'aiGenerator'>('roadmap');

  // Selected Character for Roadmap
  const [selectedCharId, setSelectedCharId] = useState<string>(characters[0]?.id || 'char_lingxiao');
  
  // Power Systems State
  const [systems, setSystems] = useState<PowerTierSystem[]>(PRESET_POWER_TIER_SYSTEMS);
  const [selectedSystemId, setSelectedSystemId] = useState<string>(PRESET_POWER_TIER_SYSTEMS[0].id);

  // Character Roadmaps State
  const [roadmaps, setRoadmaps] = useState<{ [charId: string]: ProgressionStage[] }>({
    char_lingxiao: DEFAULT_CHARACTER_ROADMAPS[0].stages,
  });

  // Level selection in Power Tiers tab
  const [selectedLevelNum, setSelectedLevelNum] = useState<number>(1);

  // Encyclopedia Category Filter in tab 3
  const [encycloCategory, setEncycloCategory] = useState<'all' | 'cultivation' | 'breakthrough' | 'encounters' | 'pills' | 'weapons' | 'techniques'>('all');

  // AI System Generation State
  const [aiSystemGenre, setAiSystemGenre] = useState<string>(genre);
  const [aiSystemIdea, setAiSystemIdea] = useState<string>('Tu Chân Cơ Giới Hóa kết hợp Bát Môn Độn Giáp');
  const [aiSystemTierCount, setAiSystemTierCount] = useState<number>(7);
  const [isGeneratingSystem, setIsGeneratingSystem] = useState<boolean>(false);

  // AI Character Roadmap Generation State
  const [aiRoadmapGoal, setAiRoadmapGoal] = useState<string>('Nghịch thiên cầu đạo, đoạt lại linh căn, chém sát ma đạo cự phách');
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);

  // AI Tier Encyclopedia Generation State
  const [isGeneratingTierCompendium, setIsGeneratingTierCompendium] = useState<boolean>(false);
  const [generatingLevelNum, setGeneratingLevelNum] = useState<number | null>(null);
  const [customItemModalOpen, setCustomItemModalOpen] = useState<boolean>(false);
  const [customItemLevel, setCustomItemLevel] = useState<number>(1);
  const [customItemType, setCustomItemType] = useState<'pill' | 'weapon' | 'technique' | 'encounter'>('pill');
  const [customItemPrompt, setCustomItemPrompt] = useState<string>('');
  const [isGeneratingCustomItem, setIsGeneratingCustomItem] = useState<boolean>(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedChar = characters.find(c => c.id === selectedCharId) || characters[0];
  const selectedSystem = systems.find(s => s.id === selectedSystemId) || systems[0];
  const currentStages: ProgressionStage[] = roadmaps[selectedCharId] || DEFAULT_CHARACTER_ROADMAPS[0].stages;

  const currentLevel: PowerTierLevel = selectedSystem.levels.find(l => l.level === selectedLevelNum) || selectedSystem.levels[0];

  // Handle AI Generate Power System
  const handleGenerateSystem = async () => {
    setIsGeneratingSystem(true);
    try {
      const res = await generatePowerTierSystem({
        genre: aiSystemGenre,
        systemIdea: aiSystemIdea,
        tierCount: aiSystemTierCount
      });
      if (res) {
        setSystems(prev => [res, ...prev]);
        setSelectedSystemId(res.id);
        setActiveTab('powerTiers');
        alert(`Đã kiến tạo thành công Hệ Thống Cảnh Giới: "${res.name}"!`);
      }
    } catch (err: any) {
      alert('Lỗi kiến tạo hệ thống: ' + err.message);
    } finally {
      setIsGeneratingSystem(false);
    }
  };

  // Handle AI Generate Character Roadmap
  const handleGenerateRoadmap = async () => {
    if (!selectedChar) return;
    setIsGeneratingRoadmap(true);
    try {
      const res = await generateCharacterRoadmap({
        character: selectedChar,
        system: selectedSystem,
        genre: genre,
        customGoal: aiRoadmapGoal
      });
      if (res && res.stages) {
        setRoadmaps(prev => ({
          ...prev,
          [selectedChar.id]: res.stages
        }));
        setActiveTab('roadmap');
        alert(`Đã lập thành công Sơ Đồ Lộ Trình Tiến Hóa cho nhân vật "${selectedChar.name}"!`);
      }
    } catch (err: any) {
      alert('Lỗi tạo lộ trình: ' + err.message);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  // Handle AI Generate Compendium for a Level
  const handleGenerateTierCompendium = async (lvl: PowerTierLevel) => {
    setIsGeneratingTierCompendium(true);
    setGeneratingLevelNum(lvl.level);
    try {
      const comp = await generateTierEncyclopedia({
        levelName: lvl.name,
        subStages: lvl.subStages,
        systemName: selectedSystem.name,
        genre: selectedSystem.genre || genre,
        customIdea: ''
      });

      if (comp) {
        setSystems(prev => prev.map(s => {
          if (s.id !== selectedSystem.id) return s;
          return {
            ...s,
            levels: s.levels.map(l => {
              if (l.level !== lvl.level) return l;
              return {
                ...l,
                cultivationMethod: comp.cultivationMethod || l.cultivationMethod,
                breakthroughRitual: comp.breakthroughRitual || l.breakthroughRitual,
                fortuitousEncounters: [...(l.fortuitousEncounters || []), ...(comp.fortuitousEncounters || [])],
                pillsAndElixirs: [...(l.pillsAndElixirs || []), ...(comp.pillsAndElixirs || [])],
                weaponsAndArtifacts: [...(l.weaponsAndArtifacts || []), ...(comp.weaponsAndArtifacts || [])],
                techniquesAndMartialArts: [...(l.techniquesAndMartialArts || []), ...(comp.techniquesAndMartialArts || [])],
              };
            })
          };
        }));
        alert(`Đã biên soạn thành công toàn bộ kho báu, đan dược, bí tịch và cơ duyên cho cấp "${lvl.name}"!`);
      }
    } catch (err: any) {
      alert('Lỗi biên soạn: ' + err.message);
    } finally {
      setIsGeneratingTierCompendium(false);
      setGeneratingLevelNum(null);
    }
  };

  // Handle adding custom item to a level
  const handleAddCustomItem = async () => {
    if (!customItemPrompt.trim()) {
      alert('Vui lòng nhập ý tưởng bảo vật / công pháp!');
      return;
    }
    setIsGeneratingCustomItem(true);
    try {
      const comp = await generateTierEncyclopedia({
        levelName: currentLevel.name,
        subStages: currentLevel.subStages,
        systemName: selectedSystem.name,
        genre: selectedSystem.genre || genre,
        customIdea: `Tập trung sâu vào ${customItemType}: ${customItemPrompt}`
      });

      if (comp) {
        setSystems(prev => prev.map(s => {
          if (s.id !== selectedSystem.id) return s;
          return {
            ...s,
            levels: s.levels.map(l => {
              if (l.level !== customItemLevel) return l;
              if (customItemType === 'pill' && comp.pillsAndElixirs?.[0]) {
                return { ...l, pillsAndElixirs: [comp.pillsAndElixirs[0], ...(l.pillsAndElixirs || [])] };
              }
              if (customItemType === 'weapon' && comp.weaponsAndArtifacts?.[0]) {
                return { ...l, weaponsAndArtifacts: [comp.weaponsAndArtifacts[0], ...(l.weaponsAndArtifacts || [])] };
              }
              if (customItemType === 'technique' && comp.techniquesAndMartialArts?.[0]) {
                return { ...l, techniquesAndMartialArts: [comp.techniquesAndMartialArts[0], ...(l.techniquesAndMartialArts || [])] };
              }
              if (customItemType === 'encounter' && comp.fortuitousEncounters?.[0]) {
                return { ...l, fortuitousEncounters: [comp.fortuitousEncounters[0], ...(l.fortuitousEncounters || [])] };
              }
              return l;
            })
          };
        }));
        setCustomItemModalOpen(false);
        setCustomItemPrompt('');
        alert(`Đã thêm thành công vào Tạng Kinh Các / Bảo Khố!`);
      }
    } catch (err: any) {
      alert('Lỗi: ' + err.message);
    } finally {
      setIsGeneratingCustomItem(false);
    }
  };

  // Quick insertion helpers
  const handleInsertSingleItem = (title: string, content: string) => {
    if (!onInsertText) return;
    onInsertText(`\n\n[BẢO KHỐ & TẠNG KINH CÁC: ${title}]\n${content}\n`);
    alert(`Đã chèn "${title}" vào chương truyện!`);
  };
  const handleInsertRoadmapToNovel = () => {
    if (!onInsertText || !selectedChar) return;
    const stagesText = currentStages.map((s, idx) => 
      `### GIAI ĐOẠN ${idx + 1}: ${s.phaseName} [${s.characterRealm}]\n` +
      `- Khoảng chương: ${s.storyChapterRange}\n` +
      `- Biến cố mấu chốt (Catalyst): ${s.milestoneEvent}\n` +
      `- Năng lực thức tỉnh: ${s.abilityUnlocked}\n` +
      `- Chuyển biến tâm lý: ${s.psychologicalArc}\n` +
      `- Bình cảnh / Đại kiếp: ${s.bottleneckOrTribulation}\n`
    ).join('\n');

    const fullText = `\n\n════════════════════════════════════════════════════════\n` +
      `⚜️ SƠ ĐỒ LỘ TRÌNH TIẾN HÓA NHÂN VẬT: ${selectedChar.name} (${selectedChar.role}) ⚜️\n` +
      `Hệ thống tiêu chuẩn: ${selectedSystem.name}\n` +
      `Cảnh giới hiện tại: ${selectedChar.realmOrRank}\n` +
      `════════════════════════════════════════════════════════\n\n` +
      stagesText;

    onInsertText(fullText);
    alert(`Đã chèn toàn bộ lộ trình tiến hóa của "${selectedChar.name}" vào chương truyện!`);
  };

  const handleInsertSingleStage = (stage: ProgressionStage) => {
    if (!onInsertText || !selectedChar) return;
    const stageText = `\n\n[GIAI ĐOẠN PHÁT TRIỂN: ${stage.phaseName} (${stage.characterRealm}) - ${stage.storyChapterRange}]\n` +
      `• Biến cố bước ngoặt: ${stage.milestoneEvent}\n` +
      `• Công pháp & Tuyệt kỹ mới: ${stage.abilityUnlocked}\n` +
      `• Đạo tâm & Tâm lý: ${stage.psychologicalArc}\n` +
      `• Thử thách định mệnh: ${stage.bottleneckOrTribulation}\n`;
    onInsertText(stageText);
    alert(`Đã chèn Giai đoạn "${stage.phaseName}" vào truyện!`);
  };

  const handleInsertTierDetails = (lvl: PowerTierLevel) => {
    if (!onInsertText) return;
    const text = `\n\n[QUY CHUẨN CẢNH GIỚI: ${lvl.name} - HỆ THỐNG ${selectedSystem.name}]\n` +
      `- Phân tầng: ${lvl.subStages}\n` +
      `- Biến đổi thể chất & đan điền: ${lvl.description}\n` +
      `- Điều kiện đột phá: ${lvl.breakthroughCondition}\n` +
      `- Uy lực thực chiến: ${lvl.combatPower}\n` +
      (lvl.cultivationMethod ? `- Phương pháp vận hành: ${lvl.cultivationMethod}\n` : '') +
      (lvl.breakthroughRitual ? `- Nghi thức đột phá: ${lvl.breakthroughRitual.requirements} (Hiểm nguy: ${lvl.breakthroughRitual.danger})\n` : '');

    onInsertText(text);
    alert(`Đã chèn Quy chuẩn cảnh giới "${lvl.name}" vào truyện!`);
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Studio Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-purple-950/60 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 tracking-wide">
              SƠ ĐỒ PHÁT TRIỂN & HỆ THỐNG CẢNH GIỚI TIÊU CHUẨN VIP
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold">
              PROGRESSION & TIER SYSTEM
            </span>
          </div>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Quy chuẩn cấp bậc, trình độ, đại bách khoa tu luyện và trục thời gian phát triển nhân vật theo chương
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1.5 bg-gray-900/90 p-1 rounded-xl border border-purple-500/30 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'roadmap'
                ? 'bg-gradient-to-r from-purple-800 to-pink-700 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🗺️</span> Sơ Đồ Lộ Trình Nhân Vật
          </button>
          <button
            onClick={() => setActiveTab('powerTiers')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'powerTiers'
                ? 'bg-gradient-to-r from-amber-800 to-yellow-700 text-amber-200 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>🏛️</span> Hệ Thống Cảnh Giới
          </button>
          <button
            onClick={() => setActiveTab('encyclopedia')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'encyclopedia'
                ? 'bg-gradient-to-r from-emerald-800 to-teal-700 text-emerald-200 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>📖</span> Đại Bách Khoa Cấp Bậc
          </button>
          <button
            onClick={() => setActiveTab('aiGenerator')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'aiGenerator'
                ? 'bg-gradient-to-r from-pink-800 to-rose-700 text-rose-200 shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span>⚡</span> Kiến Tạo AI
          </button>
        </div>
      </div>

      {/* Sub Header / Control Bar */}
      <div className="px-4 py-2 border-b border-white/10 bg-gray-950/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Character selector if in roadmap */}
        {activeTab === 'roadmap' && (
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar flex-1">
            <span className="text-gray-400 font-semibold whitespace-nowrap">Chọn nhân vật:</span>
            {characters.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCharId(c.id)}
                className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold transition-all ${
                  selectedChar?.id === c.id
                    ? 'bg-gradient-to-r from-purple-800 to-pink-800 text-vip-gold border border-vip-gold/40 shadow-sm'
                    : 'bg-gray-800/80 text-gray-400 hover:text-white'
                }`}
              >
                {c.name} ({c.role})
              </button>
            ))}
          </div>
        )}

        {/* System selector if in powerTiers or encyclopedia */}
        {(activeTab === 'powerTiers' || activeTab === 'encyclopedia') && (
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar flex-1">
            <span className="text-gray-400 font-semibold whitespace-nowrap">Hệ thống chuẩn:</span>
            {systems.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedSystemId(s.id)}
                className={`px-3 py-1 rounded text-xs whitespace-nowrap font-bold transition-all ${
                  selectedSystem.id === s.id
                    ? 'bg-gradient-to-r from-amber-800 to-yellow-800 text-vip-gold border border-vip-gold/40 shadow-sm'
                    : 'bg-gray-800/80 text-gray-400 hover:text-white'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        )}

        {/* Global actions */}
        <div className="flex items-center gap-2 ml-auto">
          {activeTab === 'roadmap' && (
            <button
              onClick={handleInsertRoadmapToNovel}
              className="px-3 py-1 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 rounded text-xs font-bold text-white shadow-sm flex items-center gap-1"
            >
              <span>📥</span> Chèn Toàn Bộ Lộ Trình Vào Truyện
            </button>
          )}
          {activeTab === 'powerTiers' && (
            <button
              onClick={() => handleInsertTierDetails(currentLevel)}
              className="px-3 py-1 bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 rounded text-xs font-bold text-white shadow-sm flex items-center gap-1"
            >
              <span>📥</span> Chèn Cảnh Giới Này Vào Truyện
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {/* ================= TAB 1: SƠ ĐỒ LỘ TRÌNH TIẾN HÓA NHÂN VẬT ================= */}
        {activeTab === 'roadmap' && selectedChar && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Character Summary Hero Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-950 via-purple-950/40 to-gray-950 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-900/60 text-purple-300 font-bold uppercase">
                    {selectedChar.role}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-900/60 text-amber-300 font-bold font-mono">
                    {selectedChar.realmOrRank}
                  </span>
                  <span className="text-xs text-gray-400">
                    Hệ thống: {selectedSystem.name}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-vip-gold tracking-wide">
                  {selectedChar.name}
                </h3>
                <p className="text-xs text-gray-300 max-w-2xl mt-1 leading-relaxed">
                  {selectedChar.backstory || 'Thiếu niên mang theo nghịch thiên cơ duyên, bước lên con đường tu đạo trải qua ngàn vạn sinh tử.'}
                </p>
              </div>

              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => {
                    if (onUpdateCharacters) {
                      const updated = characters.map(c => 
                        c.id === selectedChar.id ? { ...c, realmOrRank: currentStages[currentStages.length - 1]?.characterRealm || c.realmOrRank } : c
                      );
                      onUpdateCharacters(updated);
                      alert(`Đã đồng bộ cảnh giới "${currentStages[currentStages.length - 1]?.characterRealm}" vào hồ sơ nhân vật ${selectedChar.name}!`);
                    }
                  }}
                  className="px-3.5 py-1.5 bg-gray-900 hover:bg-gray-800 border border-purple-500/40 rounded-xl text-xs font-bold text-purple-200 transition-all text-center"
                >
                  🔄 Đồng Bộ Cảnh Giới Đỉnh Phong
                </button>
                <button
                  onClick={() => setActiveTab('aiGenerator')}
                  className="px-3.5 py-1.5 bg-purple-800/60 hover:bg-purple-700/60 border border-purple-500/60 rounded-xl text-xs font-bold text-pink-200 transition-all text-center"
                >
                  ✨ AI Tái Lập Sơ Đồ Riêng
                </button>
              </div>
            </div>

            {/* Timeline Milestones Roadmap Ladder */}
            <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-pink-500 before:to-amber-500 md:before:left-8">
              {currentStages.map((st, idx) => (
                <div key={st.id || idx} className="relative pl-12 md:pl-16">
                  {/* Timeline Badge Node */}
                  <div className="absolute left-3.5 md:left-5 top-4 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-tr from-purple-700 to-pink-600 border-2 border-white flex items-center justify-center font-black text-xs text-white shadow-lg">
                    {idx + 1}
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-950/90 border border-purple-500/20 hover:border-purple-500/50 transition-all shadow-md space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                      <div>
                        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-500/30">
                          {st.storyChapterRange}
                        </span>
                        <span className="ml-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                          {st.characterRealm}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 font-bold">Giai đoạn {idx + 1} / {currentStages.length}</span>
                        <button
                          onClick={() => handleInsertSingleStage(st)}
                          className="px-2.5 py-1 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 rounded text-[11px] font-bold text-purple-200 transition-all"
                        >
                          📥 Chèn vào chương
                        </button>
                      </div>
                    </div>

                    <h4 className="text-base font-black text-white flex items-center gap-2">
                      <span className="text-pink-400">⚡</span>
                      {st.phaseName}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <span>💥</span> Biến cố kích hoạt (Catalyst):
                        </span>
                        <p className="text-gray-200 leading-relaxed">{st.milestoneEvent}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span>✨</span> Năng lực & Tuyệt kỹ mới:
                        </span>
                        <p className="text-emerald-200 leading-relaxed">{st.abilityUnlocked}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                        <span className="text-purple-400 font-bold flex items-center gap-1">
                          <span>🧠</span> Đạo tâm & Chuyển biến tâm lý:
                        </span>
                        <p className="text-purple-200 leading-relaxed">{st.psychologicalArc}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-gray-900/80 border border-white/5 space-y-1">
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <span>⚠️</span> Bình cảnh nan giải & Đại kiếp:
                        </span>
                        <p className="text-rose-200 leading-relaxed">{st.bottleneckOrTribulation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: QUY CHUẨN CẢNH GIỚI TIÊU CHUẨN ================= */}
        {activeTab === 'powerTiers' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* System Info Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-gray-950 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase bg-amber-950/80 px-2 py-0.5 rounded">
                  {selectedSystem.genre}
                </span>
                <h3 className="text-xl font-black text-vip-gold mt-1">{selectedSystem.name}</h3>
                <p className="text-xs text-gray-300 mt-1 max-w-3xl leading-relaxed">{selectedSystem.description}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs text-gray-400">Quy mô hệ thống:</span>
                <p className="text-lg font-black text-white">{selectedSystem.levels.length} Đại Cảnh Giới</p>
              </div>
            </div>

            {/* Levels Navigation Bar */}
            <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
              {selectedSystem.levels.map(lvl => (
                <button
                  key={lvl.level}
                  onClick={() => setSelectedLevelNum(lvl.level)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    selectedLevelNum === lvl.level
                      ? 'bg-gradient-to-r from-amber-800 to-yellow-800 text-vip-gold border-vip-gold shadow-lg shadow-amber-950/50'
                      : 'bg-gray-900/80 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-[10px]">
                    {lvl.level}
                  </span>
                  <span>{lvl.name}</span>
                </button>
              ))}
            </div>

            {/* Current Level Details Card */}
            {currentLevel && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-amber-500/30 space-y-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
                        Cấp {currentLevel.level} / {selectedSystem.levels.length}
                      </span>
                      <span className="text-xs text-emerald-400 font-bold">
                        {currentLevel.subStages}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-vip-gold mt-1.5">{currentLevel.name}</h2>
                  </div>

                  <button
                    onClick={() => handleInsertTierDetails(currentLevel)}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 rounded-xl text-xs font-bold text-gray-950 shadow-md flex items-center gap-1.5"
                  >
                    <span>📥</span> Chèn Vào Bản Thảo Chương
                  </button>
                </div>

                {/* 2-Column Specs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/70 border border-white/5 space-y-2">
                    <span className="text-amber-300 font-bold flex items-center gap-1.5 text-sm">
                      <span>🧬</span> Biến Đổi Thể Chất, Khí Hải & Thọ Mệnh:
                    </span>
                    <p className="text-gray-200 leading-relaxed">{currentLevel.description}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/70 border border-white/5 space-y-2">
                    <span className="text-rose-300 font-bold flex items-center gap-1.5 text-sm">
                      <span>⚔️</span> Uy Lực Thực Chiến & Sức Tàn Phá:
                    </span>
                    <p className="text-gray-200 leading-relaxed">{currentLevel.combatPower}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/70 border border-white/5 space-y-2">
                    <span className="text-purple-300 font-bold flex items-center gap-1.5 text-sm">
                      <span>🧘‍♂️</span> Phương Pháp Vận Hành Chu Thiên & Thổ Nạp:
                    </span>
                    <p className="text-gray-200 leading-relaxed">
                      {currentLevel.cultivationMethod || 'Hấp thu thiên địa nguyên khí thông qua kinh mạch đại chu thiên, đả tọa luyện hóa tạp chất mỗi ngày.'}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/70 border border-white/5 space-y-2">
                    <span className="text-emerald-300 font-bold flex items-center gap-1.5 text-sm">
                      <span>🗝️</span> Điều Kiện Cần Đột Phá:
                    </span>
                    <p className="text-gray-200 leading-relaxed">{currentLevel.breakthroughCondition}</p>
                  </div>
                </div>

                {/* Ritual Breakthrough details if available */}
                {currentLevel.breakthroughRitual && (
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 space-y-2 text-xs">
                    <span className="text-pink-300 font-bold flex items-center gap-1.5 text-sm">
                      <span>⚡</span> Nghi Thức Đột Phá & Hiểm Nguy Sinh Tử:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      <div>
                        <span className="text-gray-400">Yêu cầu bảo vật / trận pháp:</span>
                        <p className="text-purple-200 font-semibold mt-0.5">{currentLevel.breakthroughRitual.requirements}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Nguy cơ thiên kiếp / tâm ma:</span>
                        <p className="text-rose-300 font-semibold mt-0.5">{currentLevel.breakthroughRitual.danger}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Địa điểm lý tưởng:</span>
                        <p className="text-amber-200 font-semibold mt-0.5">{currentLevel.breakthroughRitual.ritualPlace}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: ĐẠI BÁCH KHOA CẤP BẬC (TẠNG KINH CÁC & BẢO KHỐ) ================= */}
        {activeTab === 'encyclopedia' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setEncycloCategory('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    encycloCategory === 'all' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Tất Cả
                </button>
                <button
                  onClick={() => setEncycloCategory('cultivation')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    encycloCategory === 'cultivation' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  🧘‍♂️ Phương Pháp & Nghi Thức
                </button>
                <button
                  onClick={() => setEncycloCategory('encounters')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    encycloCategory === 'encounters' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  🍀 Cơ Duyên Bí Cảnh
                </button>
                <button
                  onClick={() => setEncycloCategory('pills')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    encycloCategory === 'pills' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  💊 Đan Dược & Linh Thảo
                </button>
                <button
                  onClick={() => setEncycloCategory('weapons')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    encycloCategory === 'weapons' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  ⚔️ Binh Khí & Pháp Bảo
                </button>
                <button
                  onClick={() => setEncycloCategory('techniques')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    encycloCategory === 'techniques' ? 'bg-emerald-700 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  📜 Công Pháp Tuyệt Kỹ
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Tìm đan dược, bí tịch, vũ khí..."
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none w-52 focus:border-emerald-500"
                />
                <button
                  onClick={() => {
                    setCustomItemLevel(selectedLevelNum);
                    setCustomItemModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-md whitespace-nowrap"
                >
                  <span>✨</span> Thêm Bảo Vật / Bí Tịch
                </button>
              </div>
            </div>

            {/* Encyclopedia Grid of Levels */}
            <div className="space-y-6">
              {selectedSystem.levels
                .filter(lvl => {
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase();
                  const matchName = lvl.name.toLowerCase().includes(q);
                  const matchPills = lvl.pillsAndElixirs?.some(p => p.name.toLowerCase().includes(q) || p.effects.toLowerCase().includes(q));
                  const matchWeapons = lvl.weaponsAndArtifacts?.some(w => w.name.toLowerCase().includes(q) || w.effects.toLowerCase().includes(q));
                  const matchTechniques = lvl.techniquesAndMartialArts?.some(t => t.name.toLowerCase().includes(q) || t.effects.toLowerCase().includes(q));
                  const matchEncounters = lvl.fortuitousEncounters?.some(fe => fe.name.toLowerCase().includes(q) || fe.description.toLowerCase().includes(q));
                  return matchName || matchPills || matchWeapons || matchTechniques || matchEncounters;
                })
                .map(lvl => (
                <div key={lvl.level} className="p-5 rounded-2xl bg-gray-950 border border-white/10 space-y-4 shadow-xl hover:border-emerald-500/30 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded">
                          Cấp {lvl.level} / {selectedSystem.levels.length}
                        </span>
                        <span className="text-xs text-emerald-400 font-semibold">{lvl.subStages}</span>
                      </div>
                      <h3 className="text-xl font-black text-vip-gold mt-1">{lvl.name}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleGenerateTierCompendium(lvl)}
                        disabled={isGeneratingTierCompendium && generatingLevelNum === lvl.level}
                        className="px-3 py-1.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-md transition-all"
                      >
                        {isGeneratingTierCompendium && generatingLevelNum === lvl.level ? <Spinner /> : <span>⚡</span>}
                        <span>AI Biên Soạn Toàn Bộ Cho Cấp Này</span>
                      </button>

                      <button
                        onClick={() => handleInsertTierDetails(lvl)}
                        className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <span>📥</span> Chèn Tóm Tắt Cấp Này
                      </button>
                    </div>
                  </div>

                  {/* 1. Cultivation Method & Breakthrough Ritual */}
                  {(encycloCategory === 'all' || encycloCategory === 'cultivation') && (
                    <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 text-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 text-sm">
                          <span>🧘‍♂️</span> Phương Pháp Vận Hành Chu Thiên & Nghi Thức Đột Phá:
                        </span>
                        <button
                          onClick={() => handleInsertSingleItem(
                            `Phương Pháp Tu Luyện & Đột Phá: ${lvl.name}`,
                            `• Vận hành chu thiên: ${lvl.cultivationMethod || 'Đang cập nhật'}\n` +
                            (lvl.breakthroughRitual ? `• Điều kiện cần: ${lvl.breakthroughRitual.requirements}\n• Hiểm nguy thiên kiếp: ${lvl.breakthroughRitual.danger}\n• Địa điểm lý tưởng: ${lvl.breakthroughRitual.ritualPlace}` : '')
                          )}
                          className="text-[11px] text-purple-400 hover:text-purple-200 underline"
                        >
                          📥 Chèn vào truyện
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-gray-950/60 border border-white/5 space-y-1">
                          <strong className="text-purple-300">Vận hành chu thiên & Thổ nạp:</strong>
                          <p className="text-gray-300 leading-relaxed">
                            {lvl.cultivationMethod || 'Đả tọa giờ Tý và Ngọ, vận chuyển đại chu thiên thanh lọc tạp chất, bồi tụ khí hải.'}
                          </p>
                        </div>

                        {lvl.breakthroughRitual && (
                          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/20 space-y-1">
                            <strong className="text-pink-300">Nghi thức & Hiểm nguy sinh tử:</strong>
                            <p className="text-gray-300">
                              <span className="text-gray-400">Yêu cầu: </span>{lvl.breakthroughRitual.requirements}
                            </p>
                            <p className="text-gray-300">
                              <span className="text-rose-400">Hiểm nguy: </span>{lvl.breakthroughRitual.danger}
                            </p>
                            <p className="text-gray-400 text-[11px]">
                              <span>Địa điểm: </span>{lvl.breakthroughRitual.ritualPlace}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 2. Pills and Elixirs */}
                  {(encycloCategory === 'all' || encycloCategory === 'pills') && lvl.pillsAndElixirs && lvl.pillsAndElixirs.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <span>💊</span> Đan Dược & Linh Thảo Trọng Yếu:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lvl.pillsAndElixirs
                          .filter(p => !searchQuery.trim() || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.effects.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((p, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-gray-900/60 border border-emerald-500/20 text-xs space-y-1.5 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center">
                                <strong className="text-emerald-300 text-sm">{p.name}</strong>
                                <span className="text-[10px] text-amber-400 font-mono px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 font-bold">
                                  {p.rank}
                                </span>
                              </div>
                              <p className="text-gray-300 mt-1 leading-relaxed">{p.effects}</p>
                              {p.ingredients && (
                                <p className="text-gray-500 text-[11px] mt-1">Dược liệu: {p.ingredients}</p>
                              )}
                            </div>
                            <div className="pt-2 border-t border-white/5 flex justify-end">
                              <button
                                onClick={() => handleInsertSingleItem(`Đan Dược: ${p.name} (${p.rank})`, `• Dược hiệu: ${p.effects}\n• Thành phần: ${p.ingredients || 'Linh dược quý hiếm'}`)}
                                className="text-[11px] text-emerald-400 hover:text-emerald-200 flex items-center gap-1 font-semibold"
                              >
                                <span>📥</span> Chèn vào chương
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Fortuitous Encounters */}
                  {(encycloCategory === 'all' || encycloCategory === 'encounters') && lvl.fortuitousEncounters && lvl.fortuitousEncounters.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <span>🍀</span> Cơ Duyên Kỳ Ngộ & Bí Cảnh:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lvl.fortuitousEncounters
                          .filter(fe => !searchQuery.trim() || fe.name.toLowerCase().includes(searchQuery.toLowerCase()) || fe.description.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((fe, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-gray-900/60 border border-amber-500/20 text-xs space-y-1.5 flex flex-col justify-between">
                            <div>
                              <strong className="text-amber-300 text-sm">{fe.name}</strong>
                              <p className="text-gray-300 mt-1 leading-relaxed">{fe.description}</p>
                              <div className="pt-1.5 text-[11px] flex flex-col gap-0.5">
                                <span className="text-emerald-300 font-semibold">✨ Cơ duyên: {fe.opportunity}</span>
                                <span className="text-rose-400 font-semibold">⚠️ Cạm bẫy: {fe.danger}</span>
                              </div>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex justify-end">
                              <button
                                onClick={() => handleInsertSingleItem(`Cơ Duyên: ${fe.name}`, `• Miêu tả: ${fe.description}\n• Cơ duyên: ${fe.opportunity}\n• Hiểm nguy: ${fe.danger}`)}
                                className="text-[11px] text-amber-400 hover:text-amber-200 flex items-center gap-1 font-semibold"
                              >
                                <span>📥</span> Chèn vào chương
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 4. Weapons & Artifacts */}
                  {(encycloCategory === 'all' || encycloCategory === 'weapons') && lvl.weaponsAndArtifacts && lvl.weaponsAndArtifacts.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                        <span>⚔️</span> Binh Khí & Pháp Bảo Tiêu Biểu:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lvl.weaponsAndArtifacts
                          .filter(w => !searchQuery.trim() || w.name.toLowerCase().includes(searchQuery.toLowerCase()) || w.effects.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((w, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-gray-900/60 border border-cyan-500/20 text-xs space-y-1.5 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center">
                                <strong className="text-cyan-300 text-sm">{w.name}</strong>
                                <span className="text-[10px] text-amber-400 font-mono px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 font-bold">
                                  {w.rank}
                                </span>
                              </div>
                              <p className="text-gray-300 mt-1 leading-relaxed">{w.effects}</p>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex justify-end">
                              <button
                                onClick={() => handleInsertSingleItem(`Pháp Bảo: ${w.name} (${w.rank})`, `• Uy lực & Cấm chế: ${w.effects}`)}
                                className="text-[11px] text-cyan-400 hover:text-cyan-200 flex items-center gap-1 font-semibold"
                              >
                                <span>📥</span> Chèn vào chương
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. Techniques & Martial Arts */}
                  {(encycloCategory === 'all' || encycloCategory === 'techniques') && lvl.techniquesAndMartialArts && lvl.techniquesAndMartialArts.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                        <span>📜</span> Công Pháp & Sát Chiêu Tuyệt Kỹ:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {lvl.techniquesAndMartialArts
                          .filter(t => !searchQuery.trim() || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.effects.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((t, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-gray-900/60 border border-purple-500/20 text-xs space-y-1.5 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center">
                                <strong className="text-purple-300 text-sm">{t.name}</strong>
                                <span className="text-[10px] text-amber-400 font-mono px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 font-bold">
                                  {t.rank}
                                </span>
                              </div>
                              <p className="text-gray-300 mt-1 leading-relaxed">{t.effects}</p>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex justify-end">
                              <button
                                onClick={() => handleInsertSingleItem(`Tuyệt Kỹ: ${t.name} (${t.rank})`, `• Nguyên lý & Sát chiêu: ${t.effects}`)}
                                className="text-[11px] text-purple-400 hover:text-purple-200 flex items-center gap-1 font-semibold"
                              >
                                <span>📥</span> Chèn vào chương
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal for adding custom item */}
            {customItemModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-gray-950 border border-purple-500/40 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✨</span>
                      <h3 className="text-base font-bold text-vip-gold">TẠO BẢO VẬT / CÔNG PHÁP RIÊNG LẺ BẰNG AI</h3>
                    </div>
                    <button
                      onClick={() => setCustomItemModalOpen(false)}
                      className="text-gray-400 hover:text-white font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-gray-400 mb-1 font-semibold">Cảnh giới áp dụng:</label>
                      <select
                        value={customItemLevel}
                        onChange={e => setCustomItemLevel(parseInt(e.target.value))}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none"
                      >
                        {selectedSystem.levels.map(l => (
                          <option key={l.level} value={l.level}>
                            Cấp {l.level}: {l.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1 font-semibold">Loại hình:</label>
                      <select
                        value={customItemType}
                        onChange={e => setCustomItemType(e.target.value as any)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none"
                      >
                        <option value="pill">💊 Đan Dược / Linh Thảo</option>
                        <option value="weapon">⚔️ Binh Khí / Pháp Bảo</option>
                        <option value="technique">📜 Công Pháp / Sát Chiêu</option>
                        <option value="encounter">🍀 Cơ Duyên / Bí Cảnh</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1 font-semibold">Ý tưởng của bạn:</label>
                      <textarea
                        rows={3}
                        value={customItemPrompt}
                        onChange={e => setCustomItemPrompt(e.target.value)}
                        placeholder="VD: Kiếm rèn từ răng Hắc Long ngàn năm, tỏa lôi hỏa; hoặc Đan dược chữa lành thần hồn bị rách toạc..."
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setCustomItemModalOpen(false)}
                      className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-xs font-bold"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      onClick={handleAddCustomItem}
                      disabled={isGeneratingCustomItem}
                      className="flex-1 py-2.5 bg-gradient-to-r from-purple-700 to-pink-600 hover:brightness-110 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-md"
                    >
                      {isGeneratingCustomItem ? <Spinner /> : <span>✨</span>}
                      <span>AI Tạo & Đưa Vào Bảo Khố</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: KIẾN TẠO AI RIÊNG BIỆT ================= */}
        {activeTab === 'aiGenerator' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Box 1: Custom Power Tier System by AI */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 border border-purple-500/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h3 className="text-base font-bold text-purple-300">KIẾN TẠO HỆ THỐNG CẢNH GIỚI ĐỘC QUYỀN BẰNG AI</h3>
                  <p className="text-xs text-gray-400">Tự do sáng tạo hệ thống tu chân độc lạ cho thế giới tiểu thuyết của bạn</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Thể loại tác phẩm:</label>
                  <input
                    type="text"
                    value={aiSystemGenre}
                    onChange={e => setAiSystemGenre(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Số lượng đại cảnh giới (5 - 10):</label>
                  <input
                    type="number"
                    min={5}
                    max={10}
                    value={aiSystemTierCount}
                    onChange={e => setAiSystemTierCount(parseInt(e.target.value) || 7)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1 font-semibold">Ý tưởng độc quyền cốt lõi:</label>
                  <textarea
                    rows={3}
                    value={aiSystemIdea}
                    onChange={e => setAiSystemIdea(e.target.value)}
                    placeholder="VD: Hệ thống tu chân cơ giới hóa, dùng linh thạch làm nhiên liệu hạt nhân; hoặc Bát Môn Giáp Thần Thể..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateSystem}
                disabled={isGeneratingSystem}
                className="w-full py-3 bg-gradient-to-r from-purple-700 via-pink-600 to-amber-600 hover:brightness-110 disabled:opacity-50 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {isGeneratingSystem ? <Spinner /> : <span>✨</span>}
                <span>KIẾN TẠO HỆ THỐNG CẢNH GIỚI MỚI</span>
              </button>
            </div>

            {/* Box 2: Custom Character Progression Roadmap by AI */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-pink-950/30 to-gray-950 border border-pink-500/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🗺️</span>
                <div>
                  <h3 className="text-base font-bold text-pink-300">LẬP SƠ ĐỒ LỘ TRÌNH PHÁT TRIỂN NHÂN VẬT THEO CHƯƠNG</h3>
                  <p className="text-xs text-gray-400">Phân kỳ 5 - 6 giai đoạn bước ngoặt, đốn ngộ và đại kiếp cho nhân vật</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Nhân vật áp dụng:</label>
                  <select
                    value={selectedCharId}
                    onChange={e => setSelectedCharId(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none"
                  >
                    {characters.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.role} - {c.realmOrRank})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-semibold">Hệ thống cấp bậc áp dụng:</label>
                  <select
                    value={selectedSystemId}
                    onChange={e => setSelectedSystemId(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none"
                  >
                    {systems.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1 font-semibold">Mục tiêu & Định hướng hành trình số phận:</label>
                  <textarea
                    rows={3}
                    value={aiRoadmapGoal}
                    onChange={e => setAiRoadmapGoal(e.target.value)}
                    placeholder="VD: Bắt đầu từ phế vật báo thù gia tộc, từng bước nhập ma rồi lại hóa phật cứu rỗi thương sinh..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white outline-none resize-none"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateRoadmap}
                disabled={isGeneratingRoadmap}
                className="w-full py-3 bg-gradient-to-r from-pink-700 via-purple-600 to-indigo-600 hover:brightness-110 disabled:opacity-50 rounded-xl font-bold text-xs text-white shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {isGeneratingRoadmap ? <Spinner /> : <span>🚀</span>}
                <span>LẬP SƠ ĐỒ LỘ TRÌNH PHÁT TRIỂN RIÊNG CHO NHÂN VẬT</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
