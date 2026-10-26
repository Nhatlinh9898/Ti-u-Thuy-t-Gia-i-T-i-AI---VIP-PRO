import React, { useState, useEffect } from 'react';
import { NovelConfig, NovelNode, NodeType, CharacterProfile } from './types';
import {
  generateStructure,
  generateContent,
  generateSummary,
  generateEnding,
  generateIntroOptions
} from './services/geminiService';
import { TreeRenderer } from './components/TreeRenderer';
import { VoiceStudio } from './components/VoiceStudio';
import { AiAssistantChat } from './components/AiAssistantChat';
import { CharacterStudio } from './components/CharacterStudio';
import { OmniverseLoreNetworkStudio } from './components/OmniverseLoreNetworkStudio';
import { MasterCultivationSpineStudio } from './components/MasterCultivationSpineStudio';
import { DivinePantheonStudio } from './components/DivinePantheonStudio';
import { SwordDaoStudio } from './components/SwordDaoStudio';
import { SpellDaoStudio } from './components/SpellDaoStudio';
import { TalismanDaoStudio } from './components/TalismanDaoStudio';
import { SupremeCultivationStudio } from './components/SupremeCultivationStudio';
import { AlchemyStudio } from './components/AlchemyStudio';
import { WeaponArsenalStudio } from './components/WeaponArsenalStudio';
import { SpiritBeastStudio } from './components/SpiritBeastStudio';
import { EmpireGeopoliticsStudio } from './components/EmpireGeopoliticsStudio';
import { SpiritTreasureStudio } from './components/SpiritTreasureStudio';
import { SectFactionStudio } from './components/SectFactionStudio';
import { HierarchyQuestStudio } from './components/HierarchyQuestStudio';
import { RealmLocationStudio } from './components/RealmLocationStudio';
import { CitadelStudio } from './components/CitadelStudio';
import { ElementalManualsStudio } from './components/ElementalManualsStudio';
import { CharacterProgressionStudio } from './components/CharacterProgressionStudio';
import { LoreSearchModal } from './components/LoreSearchModal';
import { VisualAndAudioStudio } from './components/VisualAndAudioStudio';
import { UnifiedCreationPipelineStudio } from './components/UnifiedCreationPipelineStudio';
import { SubplotArcsStudio } from './components/SubplotArcsStudio';
import { DEFAULT_CHARACTERS } from './data/defaultCharacters';
import {
  ALL_MASTER_PRESET_STORIES,
  MasterPresetStoryBundle,
  PRESET_MASTER_NOVEL_CONFIG,
  PRESET_MASTER_NOVEL_TREE
} from './data/presetMasterNovelBible';
import { StoryBibleInspectorModal } from './components/StoryBibleInspectorModal';
import { OmniDatasetWritingStudio } from './components/OmniDatasetWritingStudio';
import { NeuralInferenceLearningStudio } from './components/NeuralInferenceLearningStudio';
import { ArtOfWarStudio } from './components/ArtOfWarStudio';
import { MartialTrainingStudio } from './components/MartialTrainingStudio';
import { CharacterTrajectoryRoutingStudio } from './components/CharacterTrajectoryRoutingStudio';
import { VisualStoryNodeWorkflowStudio } from './components/VisualStoryNodeWorkflowStudio';
import { Spinner } from './components/Spinner';

export default function App() {
  const [config, setConfig] = useState<NovelConfig>({
    genre: 'Tiên Hiệp Cổ Phong',
    tone: 'Hùng tráng bi tráng, nhiệt huyết',
    pov: 'Ngôi thứ ba (Toàn tri)',
    setting: 'Cửu Châu Thần Vực, thời đại Tiên Ma đại chiến',
    mainCharacter: 'Lăng Tiêu - Mang Hỗn Độn Tổ Căn',
    plotIdea: 'Một phàm nhân thiếu niên từng bước nghịch thiên tu đạo, nắm giữ Hỗn Độn Tàn Ngọc và Thái Sơ Kiếm Quyết, vạch trần âm mưu của Thiên Đạo Thần Tộc và khai thiên lập địa.',
    worldRules: 'Tu luyện từ Thối Thể, Luyện Khí, Trúc Cơ, Kim Đan, Nguyên Anh, Hóa Thần đến Đại La Chân Tiên.'
  });

  const [treeData, setTreeData] = useState<NovelNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<NovelNode | null>(null);
  const [characters, setCharacters] = useState<CharacterProfile[]>(DEFAULT_CHARACTERS);
  const [loading, setLoading] = useState(false);
  const [writingMode, setWritingMode] = useState<string>('CONTINUE');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedOptions, setGeneratedOptions] = useState<Array<{ style: string; text: string }>>([]);

  // Active Story Bible State
  const [activeStoryBible, setActiveStoryBible] = useState<MasterPresetStoryBundle | null>(
    ALL_MASTER_PRESET_STORIES[0]
  );
  const [isOmniStudioOpen, setIsOmniStudioOpen] = useState<boolean>(true);

  // Right Drawer Tab State (Default to Visual Story Node Workflow Studio)
  const [rightPanelTab, setRightPanelTab] = useState<
    'nodeWorkflow' | 'neural' | 'omniWeaver' | 'martialTraining' | 'trajectoryRouting' | 'pipeline' | 'subplots' | 'omniverse' | 'masterSpine' | 'pantheon' | 'swords' | 'spells' | 'talismans' | 'cultivation' | 'alchemy' | 'weapons' | 'beasts' | 'treasures' | 'sects' | 'quests' | 'geopolitics' | 'artOfWar' | 'locations' | 'citadels' | 'manuals' | 'progression' | 'media' | 'characters' | 'chat' | 'voice'
  >('nodeWorkflow');

  const [isRightPanelExpanded, setIsRightPanelExpanded] = useState(true);
  const [isLoreSearchOpen, setIsLoreSearchOpen] = useState(false);
  const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>('Đã lưu');

  // Load saved novel from LocalStorage on mount
  useEffect(() => {
    try {
      const savedTree = localStorage.getItem('imperium_novel_tree');
      const savedConfig = localStorage.getItem('imperium_novel_config');
      const savedChars = localStorage.getItem('imperium_novel_chars');

      if (savedTree) {
        const parsed = JSON.parse(savedTree);
        setTreeData(parsed);
        setSelectedNode(parsed);
      }
      if (savedConfig) setConfig(JSON.parse(savedConfig));
      if (savedChars) {
        const parsed = JSON.parse(savedChars);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCharacters(parsed);
        }
      }
    } catch (e) {
      console.warn('Lỗi đọc dữ liệu lưu trữ:', e);
    }
  }, []);

  // Save to LocalStorage when treeData, config, or characters change
  useEffect(() => {
    if (treeData) {
      localStorage.setItem('imperium_novel_tree', JSON.stringify(treeData));
      localStorage.setItem('imperium_novel_config', JSON.stringify(config));
      localStorage.setItem('imperium_novel_chars', JSON.stringify(characters));
      setAutoSaveStatus('Đã tự động lưu ' + new Date().toLocaleTimeString());
    }
  }, [treeData, config, characters]);

  // Helpers to update tree recursively
  const updateNodeInTree = (
    root: NovelNode,
    targetId: string,
    updater: (n: NovelNode) => NovelNode
  ): NovelNode => {
    if (root.id === targetId) return updater(root);
    return {
      ...root,
      children: root.children.map((c) => updateNodeInTree(c, targetId, updater)),
    };
  };

  const deleteNodeInTree = (root: NovelNode, targetId: string): NovelNode | null => {
    if (root.id === targetId) return null;
    return {
      ...root,
      children: root.children
        .filter((c) => c.id !== targetId)
        .map((c) => deleteNodeInTree(c, targetId)!)
        .filter(Boolean),
    };
  };

  const addChildNode = (parentNodeId: string) => {
    if (!treeData) return;
    const newChild: NovelNode = {
      id: 'node_' + Math.random().toString(36).substring(2, 9),
      type: NodeType.CHAPTER,
      title: 'Chương mới - Chưa đặt tên',
      summary: 'Mô tả tóm tắt phân cảnh này...',
      content: '',
      children: [],
      isExpanded: true,
    };

    const updated = updateNodeInTree(treeData, parentNodeId, (n) => ({
      ...n,
      children: [...n.children, newChild],
      isExpanded: true,
    }));
    setTreeData(updated);
    setSelectedNode(newChild);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!treeData) return;
    const updated = deleteNodeInTree(treeData, nodeId);
    setTreeData(updated);
    if (selectedNode?.id === nodeId) {
      setSelectedNode(updated);
    }
  };

  // Calculate statistics
  const countWordsInTree = (node: NovelNode | null): number => {
    if (!node) return 0;
    const currentCount = (node.content || '').trim().split(/\s+/).filter(Boolean).length;
    const childrenCount = (node.children || []).reduce((acc, c) => acc + countWordsInTree(c), 0);
    return currentCount + childrenCount;
  };

  const countChapters = (node: NovelNode | null): number => {
    if (!node) return 0;
    const isChap = node.type === NodeType.CHAPTER ? 1 : 0;
    const childrenCount = (node.children || []).reduce((acc, c) => acc + countChapters(c), 0);
    return isChap + childrenCount;
  };

  const totalWords = countWordsInTree(treeData);
  const totalChapters = countChapters(treeData);
  const currentChapterWords = (selectedNode?.content || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Novel Generation Handlers
  const handleGenerateStructure = async () => {
    if (!config.plotIdea.trim()) {
      alert('Vui lòng nhập ý tưởng cốt lõi của tác phẩm!');
      return;
    }
    setLoading(true);
    try {
      const root = await generateStructure(config);
      setTreeData(root);
      setSelectedNode(root);
    } catch (e: any) {
      alert('Lỗi khi tạo cấu trúc: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadPresetStory = (story: MasterPresetStoryBundle) => {
    setConfig(story.config);
    setTreeData(story.tree);
    setActiveStoryBible(story);
    if (story.characters && story.characters.length > 0) {
      setCharacters(story.characters);
    }
    const firstChapter = story.tree.children[0]?.children[0] || story.tree;
    setSelectedNode(firstChapter);
    setIsPresetModalOpen(false);
    const chapterCount = story.tree.children.reduce((acc, vol) => acc + (vol.children?.length || 0), 0);
    alert(`Đã nạp thành công bộ cốt truyện chi tiết: "${story.title}"!\n• Thể loại: ${story.genre}\n• Quy mô: ${story.tree.children.length} Quyển • ${chapterCount} Chương chi tiết\n• Dàn nhân vật: Đồng bộ ${story.characters?.length || 0} nhân vật trọng yếu vào Studio\n• Nhân vật chính: ${story.protagonist}\n• Kim thủ chỉ: ${story.goldenFinger}`);
  };

  const handleLoadMasterPresetNovel = () => {
    handleLoadPresetStory(ALL_MASTER_PRESET_STORIES[0]);
  };

  const handleGenerateContent = async (mode: string = writingMode) => {
    if (!selectedNode || !treeData) return;
    setLoading(true);
    try {
      const content = await generateContent(
        selectedNode,
        config.plotIdea,
        mode,
        customPrompt,
        selectedNode.content || '',
        characters
      );

      const delimiter = selectedNode.content ? '\n\n' : '';
      const newText = (selectedNode.content || '') + delimiter + content;

      const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({
        ...n,
        content: newText,
      }));
      setTreeData(updatedTree);
      setSelectedNode({ ...selectedNode, content: newText });
      setCustomPrompt('');
    } catch (e: any) {
      alert('Lỗi sinh nội dung: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!selectedNode?.content || !treeData) {
      alert('Chưa có nội dung chương để tóm tắt!');
      return;
    }
    setLoading(true);
    try {
      const data = await generateSummary(selectedNode.content);
      const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({
        ...n,
        summary: data.summary,
        keyEvents: data.keyEvents,
      }));
      setTreeData(updatedTree);
      setSelectedNode({
        ...selectedNode,
        summary: data.summary,
        keyEvents: data.keyEvents,
      });
    } catch (e: any) {
      alert('Lỗi tóm tắt: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEnding = async () => {
    if (!selectedNode || !treeData) return;
    setLoading(true);
    try {
      const { ending, transition } = await generateEnding(selectedNode);
      const textToAdd = `\n\n--- KẾT THÚC CAO TRÀO ---\n${ending}\n\n>>> DẪN CHUYỆN MỞ ĐẦU CHƯƠNG MỚI: ${transition}`;
      const newText = (selectedNode.content || '') + textToAdd;
      const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({
        ...n,
        content: newText,
      }));
      setTreeData(updatedTree);
      setSelectedNode({ ...selectedNode, content: newText });
    } catch (e: any) {
      alert('Lỗi tạo đoạn kết: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIntro = async () => {
    setLoading(true);
    try {
      const opts = await generateIntroOptions(config.tone, config.genre, config.plotIdea);
      setGeneratedOptions(opts);
    } catch (e: any) {
      alert('Lỗi tạo dẫn nhập: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const applyOption = (optText: string) => {
    if (!selectedNode || !treeData) return;
    const delimiter = selectedNode.content ? '\n\n' : '';
    const newText = (selectedNode.content || '') + delimiter + optText;
    const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({
      ...n,
      content: newText,
    }));
    setTreeData(updatedTree);
    setSelectedNode({ ...selectedNode, content: newText });
    setGeneratedOptions([]);
  };

  const toggleNode = (id: string) => {
    if (!treeData) return;
    setTreeData(
      updateNodeInTree(treeData, id, (n) => ({ ...n, isExpanded: !n.isExpanded }))
    );
  };

  const exportEntireNovel = () => {
    if (!treeData) return;
    let fullText = `# ${treeData.title}\n`;
    fullText += `Thể loại: ${config.genre} | Giọng văn: ${config.tone}\n`;
    fullText += `Bối cảnh: ${config.setting}\n`;
    fullText += `Nhân vật chính: ${config.mainCharacter}\n\n`;
    fullText += `TÓM TẮT TÁC PHẨM:\n${treeData.summary || config.plotIdea}\n\n`;
    fullText += `==============================================\n\n`;

    const traverse = (node: NovelNode, level: number) => {
      const indent = '#'.repeat(Math.min(level + 1, 5));
      fullText += `${indent} ${node.type.toUpperCase()}: ${node.title}\n\n`;
      if (node.summary) fullText += `*Tóm tắt: ${node.summary}*\n\n`;
      if (node.content) fullText += `${node.content}\n\n`;
      fullText += `----------------------------------------------\n\n`;
      if (node.children) {
        node.children.forEach((c) => traverse(c, level + 1));
      }
    };

    if (treeData.children) {
      treeData.children.forEach((c) => traverse(c, 1));
    }

    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${treeData.title || 'TieuThuyet'}_ToanTap.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportProjectJson = () => {
    const backup = {
      config,
      treeData,
      characters,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DuAn_${treeData?.title || 'TieuThuyet'}_Backup.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProjectJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.treeData) setTreeData(parsed.treeData);
        if (parsed.config) setConfig(parsed.config);
        if (parsed.characters) setCharacters(parsed.characters);
        setSelectedNode(parsed.treeData);
        alert('Đã khôi phục toàn bộ dự án thành công!');
      } catch (err: any) {
        alert('Lỗi đọc file JSON dự án: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleInsertTextToEditor = (textToInsert: string) => {
    if (!selectedNode || !treeData) {
      alert('Vui lòng chọn một chương trong sơ đồ cấu trúc bên trái trước khi chèn!');
      return;
    }
    const delimiter = selectedNode.content ? '\n\n' : '';
    const newText = (selectedNode.content || '') + delimiter + textToInsert;
    const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({
      ...n,
      content: newText,
    }));
    setTreeData(updatedTree);
    setSelectedNode({ ...selectedNode, content: newText });
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-white font-sans flex flex-col selection:bg-vip-purple selection:text-vip-gold">
      {/* --- HEADER VIP PRO --- */}
      <header className="bg-gradient-to-r from-gray-950 via-[#180929] to-gray-950 border-b border-purple-500/20 px-6 py-4 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/15 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vip-gold/10 border border-vip-gold/30 text-vip-gold text-[10px] font-mono tracking-widest uppercase mb-1.5 shadow-sm">
            <span>⚜️</span> IMPERIUM 32.0 • SIÊU TRÍ TUỆ VĂN HỌC VIỆT NAM <span>⚜️</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-vip-gold via-white to-pink-300 drop-shadow-[0_0_25px_rgba(255,215,0,0.45)] mb-1">
            SIÊU APP VIP PRO
          </h1>
          <p className="text-purple-300/80 text-xs md:text-sm uppercase tracking-[0.35em] font-bold">
            HỆ THỐNG KIẾN TẠO TIỂU THUYẾT AI ĐỈNH CAO
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs text-gray-300 bg-gray-900/80 border border-purple-500/20 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="flex items-center gap-1.5 text-vip-gold font-semibold">
              <span>📖</span> Tổng số từ: <strong className="font-mono text-white">{totalWords.toLocaleString()}</strong> từ
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1.5 text-purple-300">
              <span>📑</span> Quy mô: <strong className="font-mono text-white">{totalChapters}</strong> chương
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span>⏱️</span> Thời gian đọc: <strong className="font-mono text-white">{Math.ceil(totalWords / 250)}</strong> phút
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-[11px] text-gray-400 italic">{autoSaveStatus}</span>
          </div>

          {/* Quick Header Tools Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <button
              onClick={() => {
                setRightPanelTab('nodeWorkflow');
                setIsRightPanelExpanded(true);
              }}
              className="px-4 py-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-xl shadow-purple-950/90 ring-2 ring-teal-300 flex items-center gap-1.5 transition-all animate-pulse"
              title="Workflow Đồ Phổ Node ComfyUI: Kết nối Cảnh Hoang Tàn, Hạt Trường Sinh Hồi Sinh, Nâng Cấp Văn Phong"
            >
              <span>🕸️</span> Workflow Đồ Phổ Node (ComfyUI)
            </button>
            <button
              onClick={() => {
                setRightPanelTab('omniWeaver');
                setIsRightPanelExpanded(true);
              }}
              className="px-4 py-1.5 bg-gradient-to-r from-amber-500 via-pink-600 to-purple-600 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-xl shadow-purple-950/80 ring-2 ring-amber-300 flex items-center gap-1.5 transition-all"
            >
              <span>⚡</span> Vận Dụng Cốt Truyện & Dữ Liệu Mẫu
            </button>
            <button
              onClick={() => {
                setRightPanelTab('omniverse');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-purple-950/60 ring-1 ring-pink-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>🌐</span> Mạng Lưới & Dệt Truyện Tự Nhiên
            </button>
            <button
              onClick={() => {
                setRightPanelTab('progression');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-purple-700 via-pink-700 to-amber-600 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-purple-950/60 ring-1 ring-purple-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>📈</span> Sơ Đồ Cấp Bậc & Tiến Hóa
            </button>
            <button
              onClick={() => {
                setRightPanelTab('manuals');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>📚</span> Tạng Kinh Các & Dung Hợp
            </button>
            <button
              onClick={() => {
                setRightPanelTab('alchemy');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-emerald-950/60 ring-1 ring-emerald-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>🧪</span> Đan Đạo & Thảo Dược
            </button>
            <button
              onClick={() => {
                setRightPanelTab('beasts');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-700 via-cyan-700 to-emerald-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-teal-950/60 ring-1 ring-teal-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>🐾</span> Linh Thú & Ngự Thú
            </button>
            <button
              onClick={() => {
                setRightPanelTab('locations');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-700 via-sky-700 to-indigo-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-cyan-950/60 ring-1 ring-cyan-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>🗺️</span> Bí Cảnh & Động Phủ
            </button>
            <button
              onClick={() => {
                setRightPanelTab('citadels');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-amber-950/60 ring-1 ring-amber-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>🏯</span> Thành Trì & Tiên Đô
            </button>
            <button
              onClick={() => {
                setRightPanelTab('sects');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-700 via-purple-700 to-rose-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-indigo-950/60 ring-1 ring-indigo-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>⛩️</span> Tông Môn & Thế Lực
            </button>
            <button
              onClick={() => {
                setRightPanelTab('pipeline');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 via-purple-600 to-cyan-500 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-purple-950/80 ring-2 ring-amber-300 flex items-center gap-1.5 transition-all animate-pulse"
            >
              <span>🌊</span> Luồng Sáng Tác Toàn Diện
            </button>
            <button
              onClick={() => {
                setRightPanelTab('subplots');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-purple-950/80 ring-1 ring-purple-300 flex items-center gap-1.5 transition-all"
            >
              <span>🌿</span> Phân Nhánh & Tiểu Mạch
            </button>
            <button
              onClick={() => {
                setRightPanelTab('characters');
                setIsRightPanelExpanded(true);
              }}
              className="px-3.5 py-1.5 bg-gradient-to-r from-purple-700 via-pink-700 to-amber-700 hover:brightness-110 text-white font-black text-xs rounded-lg shadow-lg shadow-purple-950/60 ring-1 ring-purple-400/50 flex items-center gap-1.5 transition-all"
            >
              <span>👤</span> Nhân Vật & Manh Mối Thời-Không
            </button>
            <button
              onClick={() => {
                setRightPanelTab('masterSpine');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-amber-950/90 via-purple-950/90 to-indigo-950/90 hover:from-amber-900 hover:to-indigo-900 border border-amber-400 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>🌀</span> Tuyến Mạch & Cốt Lõi
            </button>
            <button
              onClick={() => {
                setRightPanelTab('pantheon');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-purple-950/90 via-amber-950/80 to-slate-900 hover:from-purple-900 hover:to-amber-900 border border-amber-400/70 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>🌌</span> Thần Phả & Khai Thiên
            </button>
            <button
              onClick={() => {
                setRightPanelTab('swords');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-cyan-950/80 via-blue-900/80 to-indigo-900/80 hover:from-cyan-900 hover:to-blue-800 border border-cyan-400/60 rounded-lg text-xs font-bold text-cyan-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>🗡️</span> Kiếm Đạo Chí Tôn
            </button>
            <button
              onClick={() => {
                setRightPanelTab('spells');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-purple-950/80 via-indigo-900/80 to-slate-900/80 hover:from-purple-900 hover:to-indigo-800 border border-purple-400/60 rounded-lg text-xs font-bold text-purple-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>🔮</span> Thuật Pháp & Thần Thông
            </button>
            <button
              onClick={() => {
                setRightPanelTab('talismans');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-amber-950/80 via-yellow-900/80 to-slate-900/80 hover:from-amber-900 hover:to-yellow-800 border border-amber-400/60 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>📜</span> Phù Lục & Đạo Triện
            </button>
            <button
              onClick={() => {
                setRightPanelTab('cultivation');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-red-900/80 via-amber-800/80 to-yellow-800/80 hover:from-red-800 hover:to-amber-700 border border-amber-400/60 rounded-lg text-xs font-bold text-amber-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>🔥</span> Tu Pháp Luyện Thể
            </button>
            <button
              onClick={() => {
                setRightPanelTab('characters');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 hover:from-purple-800 hover:to-indigo-800 border border-purple-500/50 rounded-lg text-xs font-semibold text-purple-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>👤</span> Nhân Vật & Linh Căn
            </button>
            <button
              onClick={() => {
                setRightPanelTab('chat');
                setIsRightPanelExpanded(true);
              }}
              className="px-3 py-1 bg-gradient-to-r from-pink-900/70 to-purple-900/70 hover:from-pink-800 hover:to-purple-800 border border-pink-500/50 rounded-lg text-xs font-semibold text-pink-200 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>💬</span> Cố Vấn Văn Học AI
            </button>
            <button
              onClick={() => setIsLoreSearchOpen(true)}
              className="px-3 py-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 border border-yellow-300 rounded-lg text-xs font-bold text-gray-950 flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>🔍</span> Tra Cứu Toàn Thư
            </button>
            <button
              onClick={exportEntireNovel}
              disabled={!treeData}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 border border-gray-600 rounded-lg text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-all"
            >
              <span>📥</span> Xuất .md
            </button>
            <button
              onClick={exportProjectJson}
              disabled={!treeData}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 border border-gray-600 rounded-lg text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-all"
            >
              <span>💾</span> Sao lưu
            </button>
            <label className="px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-xs font-semibold text-gray-200 flex items-center gap-1.5 cursor-pointer transition-all">
              <span>📂</span> Phục hồi
              <input type="file" accept=".json" onChange={importProjectJson} className="hidden" />
            </label>
          </div>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR - NOVEL SETTINGS & TREE STRUCTURE */}
        <div className="w-80 md:w-96 border-r border-white/10 flex flex-col bg-gray-950/80 backdrop-blur-md">
          {!treeData ? (
            <div className="p-5 overflow-y-auto custom-scrollbar h-full space-y-4">
              <div className="border-b border-vip-gold/30 pb-2">
                <h2 className="text-base font-bold text-vip-gold flex items-center gap-2">
                  <span>🏛️</span> KHỞI TẠO THẾ GIỚI TIỂU THUYẾT
                </h2>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">THỂ LOẠI (GENRE)</label>
                <select
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
                  value={config.genre}
                  onChange={(e) => setConfig({ ...config, genre: e.target.value })}
                >
                  {['Tiên Hiệp Cổ Phong', 'Kiếm Hiệp Kỳ Tình', 'Huyền Huyễn Kỳ Ảo', 'Khoa Học Viễn Tưởng (Sci-Fi)', 'Đô Thị Siêu Năng'].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">GIỌNG VĂN (TONE)</label>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
                  value={config.tone}
                  onChange={(e) => setConfig({ ...config, tone: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">BỐI CẢNH THẾ GIỚI</label>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
                  value={config.setting}
                  onChange={(e) => setConfig({ ...config, setting: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">NHÂN VẬT CHÍNH</label>
                <input
                  type="text"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
                  value={config.mainCharacter}
                  onChange={(e) => setConfig({ ...config, mainCharacter: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-400 mb-1">Ý TƯỞNG CỐT LÕI (CORE IDEA)</label>
                <textarea
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white h-28"
                  value={config.plotIdea}
                  onChange={(e) => setConfig({ ...config, plotIdea: e.target.value })}
                />
              </div>

              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/40 via-purple-950/40 to-indigo-950/40 border border-amber-500/40 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                    <span>⚡</span>
                    <span>Kho 3 Bộ Cốt Truyện Kinh Điển</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono">Sẵn Có</span>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed">
                  Lựa chọn nhanh một trong 3 thiên tiểu thuyết hoàn chỉnh (bối cảnh, 5 quyển, nhân vật, kim thủ chỉ và văn bản mở đầu).
                </p>

                <div className="space-y-1.5">
                  {ALL_MASTER_PRESET_STORIES.map(story => (
                    <button
                      key={story.id}
                      type="button"
                      onClick={() => handleLoadPresetStory(story)}
                      className="w-full p-2 bg-gray-900/80 hover:bg-gray-800 border border-white/10 hover:border-amber-400/50 rounded-lg text-left transition-all flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="text-xs font-bold text-white group-hover:text-amber-300 truncate">
                          {story.title}
                        </div>
                        <div className="text-[10px] text-gray-400 truncate">
                          {story.tagline}
                        </div>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded border whitespace-nowrap shrink-0 ${story.badgeColor}`}>
                        {story.badge.split('•')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsPresetModalOpen(true)}
                  className="w-full py-1.5 text-center text-xs font-semibold text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all"
                >
                  🔍 Xem Chi Tiết 3 Bộ Cốt Truyện →
                </button>
              </div>

              <button
                onClick={handleGenerateStructure}
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-vip-purple via-pink-600 to-amber-500 rounded-xl font-black text-xs text-white shadow-lg shadow-purple-900/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Spinner /> : '🚀 HOẶC TỰ SINH CẤU TRÚC BẰNG AI'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="p-3 border-b border-white/10 flex items-center justify-between bg-gray-900/50">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-vip-gold">🌲</span>
                  <span className="font-bold text-xs text-vip-gold truncate">{treeData.title}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPresetModalOpen(true)}
                    className="text-[11px] px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-900/60 transition-all font-medium"
                    title="Mở kho 3 bộ cốt truyện mẫu để đổi cốt truyện"
                  >
                    ⚡ Đổi Cốt Truyện
                  </button>
                  <button
                    onClick={() => addChildNode(treeData.id)}
                    className="text-[11px] px-2 py-0.5 rounded bg-purple-900/40 border border-purple-500/30 text-purple-200 hover:text-white"
                  >
                    + Thêm
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Làm lại sẽ xóa sơ đồ hiện tại. Tiếp tục?')) {
                        setTreeData(null);
                        setSelectedNode(null);
                      }
                    }}
                    className="text-[11px] text-gray-400 hover:text-red-400"
                  >
                    Làm mới
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <TreeRenderer
                  node={treeData}
                  selectedId={selectedNode?.id || null}
                  onSelect={setSelectedNode}
                  onToggle={toggleNode}
                  onAddChild={addChildNode}
                  onDeleteNode={handleDeleteNode}
                />
              </div>

              <div className="p-2.5 border-t border-white/10 bg-gray-900/80 text-[11px] text-gray-400 flex justify-between items-center">
                <span className="truncate">Bối cảnh: {config.genre}</span>
                <span className="font-mono text-purple-300">{totalChapters} chương</span>
              </div>
            </div>
          )}
        </div>

        {/* CENTER AREA - WORKSPACE & WRITING SUITE */}
        <div className="flex-1 flex flex-col bg-[#0b0f19] relative overflow-hidden">
          {selectedNode ? (
            <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden relative z-10 space-y-3">
              {/* Node Title & Quick Word Count Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-500/30">
                    {selectedNode.type}
                  </span>
                  <input
                    type="text"
                    value={selectedNode.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      const updatedTree = updateNodeInTree(treeData!, selectedNode.id, (n) => ({
                        ...n,
                        title: newTitle,
                      }));
                      setTreeData(updatedTree);
                      setSelectedNode({ ...selectedNode, title: newTitle });
                    }}
                    className="bg-transparent font-black text-lg md:text-xl text-vip-gold outline-none flex-1 truncate"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <select
                    value={selectedNode.status || 'draft'}
                    onChange={(e) => {
                      const newStatus = e.target.value as any;
                      const updatedTree = updateNodeInTree(treeData!, selectedNode.id, (n) => ({
                        ...n,
                        status: newStatus,
                      }));
                      setTreeData(updatedTree);
                      setSelectedNode({ ...selectedNode, status: newStatus });
                    }}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold border outline-none ${
                      selectedNode.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : selectedNode.status === 'in_progress'
                        ? 'bg-amber-950 text-amber-300 border-amber-500/40'
                        : 'bg-gray-800 text-gray-300 border-gray-600'
                    }`}
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="in_progress">Đang viết</option>
                    <option value="completed">Hoàn thành</option>
                  </select>

                  <span className="text-gray-400 font-mono">
                    Chương này: <strong className="text-white">{currentChapterWords}</strong> từ
                  </span>
                </div>
              </div>

              {/* Node Summary */}
              <div className="bg-gray-900/60 p-2.5 rounded-xl border border-white/5">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span className="font-semibold text-purple-300">Định hướng & Tóm tắt phân cảnh:</span>
                  <button onClick={handleSummarize} disabled={loading} className="text-pink-400 hover:underline">
                    ⚡ Tự động tóm tắt từ nội dung
                  </button>
                </div>
                <textarea
                  value={selectedNode.summary || ''}
                  onChange={(e) => {
                    const newSum = e.target.value;
                    const updatedTree = updateNodeInTree(treeData!, selectedNode.id, (n) => ({
                      ...n,
                      summary: newSum,
                    }));
                    setTreeData(updatedTree);
                    setSelectedNode({ ...selectedNode, summary: newSum });
                  }}
                  rows={2}
                  className="w-full bg-black/40 border border-gray-800 rounded-lg p-2 text-xs text-gray-300 outline-none resize-none"
                  placeholder="Ghi chú diễn biến chính của chương..."
                />
              </div>

              {/* Omni-Dataset Story Writing Engine Accordion */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-cyan-950/80 border border-vip-gold/40 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <div>
                      <span className="text-xs font-black text-vip-gold">
                        Vận Dụng Hồ Sơ Cốt Truyện & 15+ Kho Dữ Liệu Mẫu Sáng Tác
                      </span>
                      <span className="text-[10px] text-gray-300 ml-2 hidden sm:inline">
                        {activeStoryBible ? activeStoryBible.title : 'Đại Cương Cốt Truyện Kinh Điển'} • Đồng bộ đại cương & đa kho dữ liệu mẫu
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsOmniStudioOpen(!isOmniStudioOpen)}
                      className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-950 font-black text-xs rounded-lg hover:brightness-110 transition-all flex items-center gap-1 shadow cursor-pointer"
                    >
                      <span>{isOmniStudioOpen ? 'Thu gọn ▲' : 'Mở Trung Tâm Vận Dụng ▼'}</span>
                    </button>
                  </div>
                </div>

                {isOmniStudioOpen && (
                  <OmniDatasetWritingStudio
                    selectedNode={selectedNode}
                    plotIdea={config.plotIdea}
                    characters={characters}
                    activeStoryBible={activeStoryBible}
                    onSelectStoryBible={(b) => setActiveStoryBible(b)}
                    onInsertText={handleInsertTextToEditor}
                    onUpdateContent={(newContent) => {
                      const updatedTree = updateNodeInTree(treeData!, selectedNode.id, (n) => ({
                        ...n,
                        content: newContent,
                      }));
                      setTreeData(updatedTree);
                      setSelectedNode({ ...selectedNode, content: newContent });
                    }}
                  />
                )}
              </div>

              {/* Chapter Prose Editor */}
              <div className="flex-1 relative flex flex-col min-h-0 bg-gray-950/90 rounded-2xl border border-purple-500/20 overflow-hidden shadow-inner">
                <textarea
                  value={selectedNode.content || ''}
                  onChange={(e) => {
                    const newContent = e.target.value;
                    const updatedTree = updateNodeInTree(treeData!, selectedNode.id, (n) => ({
                      ...n,
                      content: newContent,
                    }));
                    setTreeData(updatedTree);
                    setSelectedNode({ ...selectedNode, content: newContent });
                  }}
                  placeholder="Nội dung chương văn học ở đây. Bạn có thể tự viết hoặc dùng AI bên dưới để sinh tiếp..."
                  className="flex-1 w-full p-4 md:p-6 bg-transparent text-gray-100 font-serif text-sm md:text-base leading-relaxed outline-none resize-none custom-scrollbar"
                />
              </div>

              {/* AI Writer Action Bar */}
              <div className="p-3 bg-gray-900/80 rounded-2xl border border-purple-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <select
                    value={writingMode}
                    onChange={(e) => setWritingMode(e.target.value)}
                    className="bg-gray-950 border border-purple-500/40 rounded-xl px-3 py-2 text-xs text-vip-gold outline-none font-bold"
                  >
                    <option value="CONTINUE">✍️ Viết Tiếp Mạch Truyện</option>
                    <option value="FIGHT_SCENE">⚔️ Đại Chiến & Đấu Pháp</option>
                    <option value="DIALOGUE">🗣️ Đối Thoại Căng Thẳng</option>
                    <option value="EXPAND">📖 Mở Rộng Miêu Tả Cảnh</option>
                  </select>

                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Chỉ đạo riêng cho phân đoạn này (tùy chọn)..."
                    className="flex-1 min-w-[200px] bg-gray-950 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleGenerateContent(writingMode)}
                    disabled={loading}
                    className="px-5 py-2 bg-gradient-to-r from-vip-purple via-pink-600 to-amber-500 hover:brightness-110 disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
                  >
                    {loading ? <Spinner /> : <span>⚡</span>}
                    <span>SINH VĂN HỌC AI</span>
                  </button>

                  <button
                    onClick={() => {
                      setRightPanelTab('pipeline');
                      setIsRightPanelExpanded(true);
                    }}
                    className="px-3.5 py-2 bg-gradient-to-r from-amber-950 via-purple-950 to-cyan-950 hover:brightness-125 border border-amber-400/80 text-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                    title="Mở Luồng Sáng Tác Toàn Diện kết nối Linh Căn, Tông Môn, Tuyến Mạch và Tam Đạo"
                  >
                    <span>🌊</span> Nối Mạch Sáng Tác
                  </button>

                  <button
                    onClick={handleEnding}
                    disabled={loading}
                    className="px-3.5 py-2 bg-purple-950 hover:bg-purple-900 border border-purple-500/40 rounded-xl text-xs font-semibold text-purple-200"
                    title="Viết đoạn kết cao trào cho chương này"
                  >
                    🏁 Kết Chương
                  </button>

                  <button
                    onClick={handleIntro}
                    disabled={loading}
                    className="px-3.5 py-2 bg-indigo-950 hover:bg-indigo-900 border border-indigo-500/40 rounded-xl text-xs font-semibold text-indigo-200"
                    title="Gợi ý mở đầu hấp dẫn"
                  >
                    💡 Dẫn Nhập
                  </button>
                </div>
              </div>

              {/* Generated Intro Options if available */}
              {generatedOptions.length > 0 && (
                <div className="p-3 bg-gray-900/90 rounded-xl border border-vip-gold/40 space-y-2">
                  <span className="text-xs font-bold text-vip-gold block">
                    Chọn một đoạn dẫn nhập đắt giá để đưa vào chương:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {generatedOptions.map((opt, idx) => (
                      <div
                        key={idx}
                        onClick={() => applyOption(opt.text)}
                        className="p-2.5 rounded-lg bg-black/60 border border-gray-700 hover:border-vip-gold cursor-pointer text-xs space-y-1 transition-all"
                      >
                        <strong className="text-purple-300 block">{opt.style}</strong>
                        <p className="text-gray-300 line-clamp-3">{opt.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-500 space-y-3">
              <span className="text-5xl">📖</span>
              <h3 className="text-lg font-bold text-gray-300">Chưa Chọn Phân Cảnh Để Soạn Thảo</h3>
              <p className="text-xs max-w-md">
                Hãy khởi tạo cấu trúc thế giới ở bảng bên trái hoặc chọn một chương trong danh sách để bắt đầu dệt nên áng văn tiên hiệp đỉnh cao.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT DRAWER - EXPANDABLE STUDIO & OMNIVERSE NETWORK */}
        <div
          className={`border-l border-white/10 flex flex-col bg-gray-950/90 backdrop-blur-md transition-all duration-300 ${
            isRightPanelExpanded ? 'w-[45rem] md:w-[50rem]' : 'w-12'
          }`}
        >
          {/* Header & Toggle */}
          <div className="p-3 border-b border-white/10 flex items-center justify-between bg-gray-900/70">
            {isRightPanelExpanded && (
              <div className="flex items-center gap-2 truncate">
                <span className="text-lg">
                  {rightPanelTab === 'omniverse' && '🌐'}
                  {rightPanelTab === 'masterSpine' && '🌀'}
                  {rightPanelTab === 'pantheon' && '🌌'}
                  {rightPanelTab === 'swords' && '🗡️'}
                  {rightPanelTab === 'spells' && '🔮'}
                  {rightPanelTab === 'talismans' && '📜'}
                  {rightPanelTab === 'cultivation' && '🔥'}
                  {rightPanelTab === 'alchemy' && '🌿'}
                  {rightPanelTab === 'weapons' && '⚔️'}
                  {rightPanelTab === 'beasts' && '🐉'}
                  {rightPanelTab === 'treasures' && '💎'}
                  {rightPanelTab === 'sects' && '⛩️'}
                  {rightPanelTab === 'quests' && '🎯'}
                  {rightPanelTab === 'geopolitics' && '👑'}
                  {rightPanelTab === 'locations' && '🗺️'}
                  {rightPanelTab === 'manuals' && '📚'}
                  {rightPanelTab === 'progression' && '📈'}
                  {rightPanelTab === 'media' && '🎬'}
                  {rightPanelTab === 'characters' && '👤'}
                  {rightPanelTab === 'chat' && '💬'}
                  {rightPanelTab === 'voice' && '🎙️'}
                </span>
                <span className="font-bold text-xs text-vip-gold truncate">
                  {rightPanelTab === 'omniverse' && 'Mạng Lưới Tri Thức & Dệt Truyện Tự Nhiên'}
                  {rightPanelTab === 'masterSpine' && 'Tuyến Mạch Tu Luyện & Cốt Lõi Tác Phẩm'}
                  {rightPanelTab === 'pantheon' && 'Hệ Thống Tra Cứu Thần Phả & Vũ Trụ'}
                  {rightPanelTab === 'swords' && 'Kiếm Đạo Chí Tôn & Chiêu Thức'}
                  {rightPanelTab === 'spells' && 'Thuật Pháp, Thủ Ấn & Thần Thông'}
                  {rightPanelTab === 'omniWeaver' && '⚡ Vận Dụng Cốt Truyện & 15+ Kho Dữ Liệu Mẫu Viết Truyện'}
                  {rightPanelTab === 'talismans' && 'Phù Lục, Đạo Triện & Vẽ Bùa'}
                  {rightPanelTab === 'cultivation' && 'Tu Pháp Luyện Thể Đến Siêu Cấp'}
                  {rightPanelTab === 'alchemy' && 'Đan Đạo, Dược Thảo & Luyện Đan'}
                  {rightPanelTab === 'weapons' && 'Luyện Khí Sư & Thần Binh Các'}
                  {rightPanelTab === 'beasts' && 'Ngự Thú Sư, Dị Thú & Tiến Hóa'}
                  {rightPanelTab === 'treasures' && 'Linh Tinh, Thiên Tài Địa Bảo & Cổ Khí'}
                  {rightPanelTab === 'sects' && 'Tông Môn, Thánh Địa & Đại Phái'}
                  {rightPanelTab === 'quests' && 'Nhiệm Vụ Tông Môn & Bảng Vàng'}
                  {rightPanelTab === 'geopolitics' && 'Tiên Triều, Đế Quốc & Địa Chính Trị'}
                  {rightPanelTab === 'locations' && 'Địa Danh, Động Thiên & Bí Cảnh'}
                  {rightPanelTab === 'manuals' && 'Tổng Bộ Công Pháp & Nguyên Tố'}
                  {rightPanelTab === 'progression' && 'Lộ Trình Phát Triển Nhân Vật'}
                  {rightPanelTab === 'media' && 'Thị Giác, Nhạc Nền & Trailer'}
                  {rightPanelTab === 'characters' && 'Hồ Sơ Nhân Vật & Linh Căn'}
                  {rightPanelTab === 'chat' && 'Cố Vấn Văn Học AI Siêu Cấp'}
                  {rightPanelTab === 'voice' && 'Voice Studio Pro'}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsRightPanelExpanded(!isRightPanelExpanded)}
              className="px-2 py-1 bg-purple-950 border border-purple-500/40 rounded-lg text-xs font-bold text-purple-200 hover:text-white ml-auto"
            >
              {isRightPanelExpanded ? '⇤ Thu gọn' : '⛶ Mở'}
            </button>
          </div>

          {isRightPanelExpanded && (
            <>
              {/* Tab Navigation Ribbon */}
              <div className="p-1.5 border-b border-white/10 bg-gray-900/40 grid grid-cols-4 sm:grid-cols-8 gap-1 text-[10px]">
                <button
                  onClick={() => setRightPanelTab('nodeWorkflow')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'nodeWorkflow'
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 text-white shadow ring-1 ring-teal-300 font-black'
                      : 'bg-indigo-950/40 text-teal-300 hover:text-white border border-teal-500/30'
                  }`}
                  title="Workflow Đồ Phổ Node ComfyUI Sáng Tác Kết Nối Nhân Vật, Bối Cảnh, Thiên Tai & Hồi Sinh"
                >
                  <span>🕸️</span> Workflow
                </button>
                <button
                  onClick={() => setRightPanelTab('neural')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'neural'
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow ring-1 ring-purple-300 font-black'
                      : 'bg-purple-950/40 text-purple-200 hover:text-white border border-purple-500/30'
                  }`}
                  title="Mạng Thần Kinh Suy Diễn & Tự Học Nâng Cao Chất Lượng Nội Dung"
                >
                  <span>🧠</span> Thần Kinh
                </button>
                <button
                  onClick={() => setRightPanelTab('omniWeaver')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'omniWeaver'
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-gray-950 shadow ring-1 ring-amber-300 font-black'
                      : 'bg-amber-950/40 text-amber-300 hover:text-white border border-amber-500/30'
                  }`}
                  title="Vận Dụng Toàn Bộ Cốt Truyện & Kho Dữ Liệu Mẫu Viết Truyện"
                >
                  <span>⚡</span> Vận Dụng Mẫu
                </button>
                <button
                  onClick={() => setRightPanelTab('pipeline')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'pipeline'
                      ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow ring-1 ring-amber-300'
                      : 'bg-gray-800/60 text-amber-200 hover:text-white'
                  }`}
                >
                  <span>🌊</span> Luồng Sáng Tác
                </button>
                <button
                  onClick={() => setRightPanelTab('subplots')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'subplots'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow ring-1 ring-purple-300'
                      : 'bg-gray-800/60 text-purple-300 hover:text-white'
                  }`}
                >
                  <span>🌿</span> Phân Nhánh
                </button>
                <button
                  onClick={() => setRightPanelTab('omniverse')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'omniverse'
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🌐</span> Dệt Truyện
                </button>
                <button
                  onClick={() => setRightPanelTab('masterSpine')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'masterSpine'
                      ? 'bg-gradient-to-r from-amber-900 to-yellow-900 text-amber-200 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🌀</span> Tuyến Mạch
                </button>
                <button
                  onClick={() => setRightPanelTab('pantheon')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'pantheon'
                      ? 'bg-gradient-to-r from-purple-900 to-amber-900 text-amber-200 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🌌</span> Thần Phả
                </button>
                <button
                  onClick={() => setRightPanelTab('swords')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'swords'
                      ? 'bg-cyan-900 text-cyan-200 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🗡️</span> Kiếm Đạo
                </button>
                <button
                  onClick={() => setRightPanelTab('spells')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'spells'
                      ? 'bg-purple-900 text-purple-200 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🔮</span> Thuật Pháp
                </button>
                <button
                  onClick={() => setRightPanelTab('talismans')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'talismans'
                      ? 'bg-amber-950 text-amber-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>📜</span> Phù Lục
                </button>
                <button
                  onClick={() => setRightPanelTab('cultivation')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'cultivation'
                      ? 'bg-red-950 text-red-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🔥</span> Luyện Thể
                </button>

                <button
                  onClick={() => setRightPanelTab('alchemy')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'alchemy'
                      ? 'bg-emerald-950 text-emerald-300 shadow ring-1 ring-emerald-500/50'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🧪</span> Đan Đạo
                </button>
                <button
                  onClick={() => setRightPanelTab('weapons')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'weapons'
                      ? 'bg-orange-950 text-orange-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>⚔️</span> Luyện Khí
                </button>
                <button
                  onClick={() => setRightPanelTab('beasts')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'beasts'
                      ? 'bg-teal-950 text-teal-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🐉</span> Ngự Thú
                </button>
                <button
                  onClick={() => setRightPanelTab('treasures')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'treasures'
                      ? 'bg-amber-950 text-amber-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>💎</span> Bảo Vật
                </button>
                <button
                  onClick={() => setRightPanelTab('sects')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'sects'
                      ? 'bg-indigo-950 text-indigo-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>⛩️</span> Tông Môn
                </button>
                <button
                  onClick={() => setRightPanelTab('quests')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'quests'
                      ? 'bg-rose-950 text-rose-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🎯</span> Nhiệm Vụ
                </button>
                <button
                  onClick={() => setRightPanelTab('geopolitics')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'geopolitics'
                      ? 'bg-yellow-950 text-yellow-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>👑</span> Tiên Triều
                </button>
                <button
                  onClick={() => setRightPanelTab('artOfWar')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'artOfWar'
                      ? 'bg-red-950 text-amber-300 shadow ring-1 ring-red-500/50'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                  title="Đại Càn Tiên Triều Binh Pháp • 12 Đại Trận • Rèn Quân • Binh Chủng • Địa Hình & Khắc Chế"
                >
                  <span>⚔️</span> Binh Pháp
                </button>
                <button
                  onClick={() => setRightPanelTab('martialTraining')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'martialTraining'
                      ? 'bg-amber-950 text-amber-300 shadow ring-1 ring-amber-500/50'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                  title="Diễn Võ Khổ Luyện • Cung • Thương • Võ Công • Công Pháp"
                >
                  <span>🥋</span> Diễn Võ
                </button>
                <button
                  onClick={() => setRightPanelTab('locations')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'locations'
                      ? 'bg-cyan-950 text-cyan-300 shadow ring-1 ring-cyan-500/50'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                  title="Địa Danh • Động Phủ • Bí Cảnh"
                >
                  <span>🗺️</span> Bí Cảnh
                </button>
                <button
                  onClick={() => setRightPanelTab('citadels')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'citadels'
                      ? 'bg-amber-950 text-amber-300 shadow ring-1 ring-amber-500/50'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                  title="Thành Trì • Tiên Đô • Phù Không Cổ Quan"
                >
                  <span>🏯</span> Thành Trì
                </button>
                <button
                  onClick={() => setRightPanelTab('manuals')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'manuals'
                      ? 'bg-emerald-950 text-emerald-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>📚</span> Công Pháp
                </button>
                <button
                  onClick={() => setRightPanelTab('progression')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'progression'
                      ? 'bg-purple-950 text-purple-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>📈</span> Lộ Trình
                </button>
                <button
                  onClick={() => setRightPanelTab('media')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'media'
                      ? 'bg-pink-950 text-pink-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🎬</span> Đa Phương Tiện
                </button>
                <button
                  onClick={() => setRightPanelTab('trajectoryRouting')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'trajectoryRouting'
                      ? 'bg-amber-950 text-amber-300 shadow ring-1 ring-amber-400/50'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                  title="Sơ Đồ Định Tuyến Mạng Lưới Nhân Vật (Cha mẹ, gia tộc, vợ, con, bạn bè, hàng xóm, tông môn, sư huynh đệ, đệ tử, kẻ thù) & Niên Biểu Vận Mệnh"
                >
                  <span>🧭</span> Định Tuyến
                </button>
                <button
                  onClick={() => setRightPanelTab('characters')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'characters'
                      ? 'bg-purple-950 text-vip-gold shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>👤</span> Nhân Vật
                </button>
                <button
                  onClick={() => setRightPanelTab('chat')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'chat'
                      ? 'bg-pink-950 text-pink-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>💬</span> Cố Vấn
                </button>
                <button
                  onClick={() => setRightPanelTab('voice')}
                  className={`py-1.5 rounded flex items-center justify-center gap-1 font-bold ${
                    rightPanelTab === 'voice'
                      ? 'bg-indigo-950 text-indigo-300 shadow'
                      : 'bg-gray-800/60 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>🎙️</span> Giọng Đọc
                </button>
              </div>

              {/* Tab Render Area */}
              <div className="flex-1 overflow-hidden">
                {rightPanelTab === 'nodeWorkflow' && (
                  <VisualStoryNodeWorkflowStudio
                    characters={characters}
                    genre={config.genre}
                    tone={config.tone}
                    onInsertText={handleInsertTextToEditor}
                    onCreateChapter={(title, content, summary) => {
                      if (!treeData) {
                        const newRoot: NovelNode = {
                          id: 'node_' + Math.random().toString(36).substring(2, 9),
                          type: NodeType.CHAPTER,
                          title,
                          content,
                          summary,
                          status: 'in_progress',
                          children: [],
                          isExpanded: true
                        };
                        setTreeData(newRoot);
                        setSelectedNode(newRoot);
                        return;
                      }
                      const newChapter: NovelNode = {
                        id: 'node_' + Math.random().toString(36).substring(2, 9),
                        type: NodeType.CHAPTER,
                        title,
                        content,
                        summary,
                        status: 'in_progress',
                        children: [],
                        isExpanded: true
                      };
                      const updatedTree = {
                        ...treeData,
                        children: [...treeData.children, newChapter]
                      };
                      setTreeData(updatedTree);
                      setSelectedNode(newChapter);
                    }}
                    onSwitchToEditor={() => {
                      setIsRightPanelExpanded(false);
                    }}
                    activeStoryBible={activeStoryBible}
                    currentChapter={selectedNode}
                  />
                )}
                {rightPanelTab === 'neural' && (
                  <NeuralInferenceLearningStudio
                    selectedNode={selectedNode}
                    characters={characters}
                    plotIdea={config.plotIdea}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                    onCreateChapter={(title, content, summary) => {
                      if (!treeData) {
                        const newRoot: NovelNode = {
                          id: 'node_' + Math.random().toString(36).substring(2, 9),
                          type: NodeType.CHAPTER,
                          title,
                          content,
                          summary,
                          status: 'in_progress',
                          children: [],
                          isExpanded: true
                        };
                        setTreeData(newRoot);
                        setSelectedNode(newRoot);
                        return;
                      }
                      const newChapter: NovelNode = {
                        id: 'node_' + Math.random().toString(36).substring(2, 9),
                        type: NodeType.CHAPTER,
                        title,
                        content,
                        summary,
                        status: 'in_progress',
                        children: [],
                        isExpanded: true
                      };
                      const updatedTree = {
                        ...treeData,
                        children: [...treeData.children, newChapter]
                      };
                      setTreeData(updatedTree);
                      setSelectedNode(newChapter);
                    }}
                  />
                )}
                {rightPanelTab === 'pipeline' && (
                  <UnifiedCreationPipelineStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                    onCreateChapter={(title, content, summary) => {
                      if (!treeData) {
                        const newRoot: NovelNode = {
                          id: 'node_' + Math.random().toString(36).substring(2, 9),
                          type: NodeType.CHAPTER,
                          title,
                          content,
                          summary,
                          status: 'in_progress',
                          children: [],
                          isExpanded: true
                        };
                        setTreeData(newRoot);
                        setSelectedNode(newRoot);
                        return;
                      }
                      const newChapter: NovelNode = {
                        id: 'node_' + Math.random().toString(36).substring(2, 9),
                        type: NodeType.CHAPTER,
                        title,
                        content,
                        summary,
                        status: 'in_progress',
                        children: [],
                        isExpanded: true
                      };
                      const updatedTree = {
                        ...treeData,
                        children: [...treeData.children, newChapter]
                      };
                      setTreeData(updatedTree);
                      setSelectedNode(newChapter);
                    }}
                  />
                )}
                {rightPanelTab === 'subplots' && (
                  <SubplotArcsStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                    onCreateChapter={(title, content, summary) => {
                      if (!treeData) {
                        const newRoot: NovelNode = {
                          id: 'node_' + Math.random().toString(36).substring(2, 9),
                          type: NodeType.CHAPTER,
                          title,
                          content,
                          summary,
                          status: 'in_progress',
                          children: [],
                          isExpanded: true
                        };
                        setTreeData(newRoot);
                        setSelectedNode(newRoot);
                        return;
                      }
                      const newChapter: NovelNode = {
                        id: 'node_' + Math.random().toString(36).substring(2, 9),
                        type: NodeType.CHAPTER,
                        title,
                        content,
                        summary,
                        status: 'in_progress',
                        children: [],
                        isExpanded: true
                      };
                      const updatedTree = {
                        ...treeData,
                        children: [...treeData.children, newChapter]
                      };
                      setTreeData(updatedTree);
                      setSelectedNode(newChapter);
                    }}
                  />
                )}
                {rightPanelTab === 'omniWeaver' && (
                  <OmniDatasetWritingStudio
                    selectedNode={selectedNode}
                    plotIdea={config.plotIdea}
                    characters={characters}
                    activeStoryBible={activeStoryBible}
                    onSelectStoryBible={(b) => setActiveStoryBible(b)}
                    onInsertText={handleInsertTextToEditor}
                    onNavigateToNeural={() => setRightPanelTab('neural')}
                    onUpdateContent={(newContent) => {
                      if (!selectedNode || !treeData) return;
                      const updatedTree = updateNodeInTree(treeData, selectedNode.id, (n) => ({
                        ...n,
                        content: newContent,
                      }));
                      setTreeData(updatedTree);
                      setSelectedNode({ ...selectedNode, content: newContent });
                    }}
                  />
                )}
                {rightPanelTab === 'omniverse' && (
                  <OmniverseLoreNetworkStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'masterSpine' && (
                  <MasterCultivationSpineStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'pantheon' && (
                  <DivinePantheonStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'swords' && (
                  <SwordDaoStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                    onUpdateCharacters={setCharacters}
                  />
                )}
                {rightPanelTab === 'spells' && (
                  <SpellDaoStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'talismans' && (
                  <TalismanDaoStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'cultivation' && (
                  <SupremeCultivationStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                    onUpdateCharacters={setCharacters}
                  />
                )}
                {rightPanelTab === 'alchemy' && (
                  <AlchemyStudio
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'weapons' && (
                  <WeaponArsenalStudio
                    genre={config.genre}
                    characters={characters}
                    onUpdateCharacters={setCharacters}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'beasts' && (
                  <SpiritBeastStudio
                    genre={config.genre}
                    characters={characters}
                    onUpdateCharacters={setCharacters}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'treasures' && (
                  <SpiritTreasureStudio
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'sects' && (
                  <SectFactionStudio
                    genre={config.genre}
                    characters={characters}
                    onUpdateCharacters={setCharacters}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'quests' && (
                  <HierarchyQuestStudio
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'geopolitics' && (
                  <EmpireGeopoliticsStudio
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'artOfWar' && (
                  <ArtOfWarStudio
                    selectedNode={selectedNode}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'martialTraining' && (
                  <MartialTrainingStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'locations' && (
                  <RealmLocationStudio
                    genre={config.genre}
                    characters={characters}
                    onUpdateCharacters={setCharacters}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'citadels' && (
                  <CitadelStudio
                    genre={config.genre}
                    characters={characters}
                    onUpdateCharacters={setCharacters}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'manuals' && (
                  <ElementalManualsStudio
                    genre={config.genre}
                    characters={characters}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'progression' && (
                  <CharacterProgressionStudio
                    characters={characters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                    onUpdateCharacters={setCharacters}
                  />
                )}
                {rightPanelTab === 'media' && (
                  <VisualAndAudioStudio
                    node={selectedNode}
                    onUpdateNode={(updated) => {
                      setSelectedNode(updated);
                      if (treeData) {
                        const updateTree = (n: NovelNode): NovelNode => {
                          if (n.id === updated.id) return updated;
                          return { ...n, children: n.children.map(updateTree) };
                        };
                        setTreeData(updateTree(treeData));
                      }
                    }}
                  />
                )}
                {rightPanelTab === 'trajectoryRouting' && (
                  <CharacterTrajectoryRoutingStudio
                    characters={characters}
                    onUpdateCharacters={setCharacters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'characters' && (
                  <CharacterStudio
                    characters={characters}
                    onUpdateCharacters={setCharacters}
                    genre={config.genre}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'chat' && (
                  <AiAssistantChat
                    context={{ config, currentChapter: selectedNode }}
                    onInsertText={handleInsertTextToEditor}
                  />
                )}
                {rightPanelTab === 'voice' && (
                  <div className="p-4 overflow-y-auto h-full">
                    <VoiceStudio text={selectedNode?.content || ''} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tra cứu toàn thư Modal */}
      <LoreSearchModal
        isOpen={isLoreSearchOpen}
        onClose={() => setIsLoreSearchOpen(false)}
        onInsertText={handleInsertTextToEditor}
      />

      {/* Kho Bộ Cốt Truyện Kinh Điển Sẵn Dùng - Deep Story Bible Inspector Modal */}
      <StoryBibleInspectorModal
        isOpen={isPresetModalOpen}
        onClose={() => setIsPresetModalOpen(false)}
        onLoadStory={handleLoadPresetStory}
        onInsertText={handleInsertTextToEditor}
      />
    </div>
  );
}
