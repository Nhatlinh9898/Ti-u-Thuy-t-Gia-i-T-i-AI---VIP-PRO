import React, { useState } from 'react';
import {
  CharacterProfile,
  CharacterRole,
  DestinyFateRank,
  SpiritualRootDetail,
  MentalSoulAttributes,
  CharacterTalent,
  CharacterRelationship,
  CharacterEncounterSimulationResult,
  SpiritualRootAppraisalResult,
  CharacterChronicleClue,
  ChronoSyncMode,
  ChronicleClueType,
  ClueTriangulationResult,
  ClueTriangulationConfig
} from '../types';
import { PRESET_12_CHARACTERS } from '../data/preset12Characters';
import { PRESET_CHRONICLE_CLUES } from '../data/presetChronicleClues';
import {
  generateCharacter,
  appraiseSpiritualRoots,
  simulateCharacterEncounter,
  triangulateChronicleClues,
  generateChronicleClue
} from '../services/geminiService';
import { Spinner } from './Spinner';
import { CharacterTrajectoryRoutingStudio } from './CharacterTrajectoryRoutingStudio';

interface CharacterStudioProps {
  characters: CharacterProfile[];
  onUpdateCharacters: (chars: CharacterProfile[]) => void;
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const CharacterStudio: React.FC<CharacterStudioProps> = ({
  characters,
  onUpdateCharacters,
  genre = 'Tiên Hiệp',
  onInsertText,
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<
    'roster' | 'creator' | 'spiritualAppraisal' | 'relationships' | 'trajectoryRouting' | 'encounterSim' | 'chronicleClues'
  >('roster');

  // Selected Character
  const [selectedCharId, setSelectedCharId] = useState<string>(
    characters[0]?.id || PRESET_12_CHARACTERS[0].id
  );

  // Chronicle Clues state (Ma Trận Manh Mối Thời-Không Đa Tuyến)
  const [chronicleCluesList, setChronicleCluesList] = useState<CharacterChronicleClue[]>(PRESET_CHRONICLE_CLUES);
  const [clueSearchQuery, setClueSearchQuery] = useState<string>('');
  const [clueTimeFilter, setClueTimeFilter] = useState<string>('ALL');
  const [clueTypeFilter, setClueTypeFilter] = useState<string>('ALL');
  const [clueCharFilter, setClueCharFilter] = useState<string>('ALL');
  const [selectedClueIdsForTriangulation, setSelectedClueIdsForTriangulation] = useState<string[]>([
    'clue_chronicle_1',
    'clue_chronicle_2'
  ]);
  const [investigationContext, setInvestigationContext] = useState<string>(
    'Ngoại môn xảy ra biến cố mất cắp đan dược và bí kíp, một đệ tử chết bất minh dưới vực sâu trước ngày đại điển'
  );
  const [investigationGoal, setInvestigationGoal] = useState<string>(
    'Tìm ra kẻ đứng sau hạ độc và tiếp tay cho hắc y nhân đột nhập tàng kinh các'
  );
  const [discoveryStyle, setDiscoveryStyle] = useState<
    'deductive_reasoning' | 'sudden_enlightenment' | 'interrogation_breakthrough' | 'accidental_overlap'
  >('deductive_reasoning');
  const [isTriangulating, setIsTriangulating] = useState<boolean>(false);
  const [triangulationResult, setTriangulationResult] = useState<ClueTriangulationResult | null>(null);

  // New Clue Generation State
  const [isGeneratingClue, setIsGeneratingClue] = useState<boolean>(false);
  const [showAddClueModal, setShowAddClueModal] = useState<boolean>(false);
  const [newClueCharName, setNewClueCharName] = useState<string>('Lý Tam Cửu');
  const [newClueRole, setNewClueRole] = useState<string>('Thương nhân / Hắc thị');
  const [newClueLocation, setNewClueLocation] = useState<string>('Chợ Đen U Minh Cốc');
  const [newClueSyncMode, setNewClueSyncMode] = useState<ChronoSyncMode>('simultaneous');

  // Filters for Roster tab
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [destinyFilter, setDestinyFilter] = useState<string>('ALL');

  // Encounter simulation state
  const [simChar1Id, setSimChar1Id] = useState<string>(
    characters[0]?.id || PRESET_12_CHARACTERS[0].id
  );
  const [simChar2Id, setSimChar2Id] = useState<string>(
    characters[1]?.id || PRESET_12_CHARACTERS[1]?.id || ''
  );
  const [encounterType, setEncounterType] = useState<string>(
    'Đấu Trí & Đấu Khí Tranh Đoạt Duyên'
  );
  const [encounterLocation, setEncounterLocation] = useState<string>(
    'Thái Cổ Cấm Địa • Đoạn Hồn Nhai'
  );
  const [encounterPrompt, setEncounterPrompt] = useState<string>(
    'Tranh đoạt đóa Cửu Diệp Hỗn Độn Thảo, đối thoại sắc bén, kiếm khí va chạm'
  );
  const [isSimulatingEncounter, setIsSimulatingEncounter] = useState<boolean>(false);
  const [encounterResult, setEncounterResult] =
    useState<CharacterEncounterSimulationResult | null>(null);

  // Spiritual root appraisal state
  const [ceremonyType, setCeremonyType] = useState<string>(
    'Đại Điển Trắc Căn Khai Sơn Tông Môn'
  );
  const [examinerName, setExaminerName] = useState<string>(
    'Chưởng Môn Chân Nhân & Thủ Tọa Chấp Pháp'
  );
  const [isAppraising, setIsAppraising] = useState<boolean>(false);
  const [appraisalResult, setAppraisalResult] =
    useState<SpiritualRootAppraisalResult | null>(null);

  // Relationship editor state
  const [newRelTargetId, setNewRelTargetId] = useState<string>('');
  const [newRelType, setNewRelType] = useState<string>('Huynh Đệ Sinh Tử');
  const [newRelDesc, setNewRelDesc] = useState<string>('');

  // AI Generator state in tab 2
  const [aiName, setAiName] = useState<string>('');
  const [aiRole, setAiRole] = useState<string>('Chính diện');
  const [aiRealm, setAiRealm] = useState<string>('Kim Đan Kỳ');
  const [aiTheme, setAiTheme] = useState<string>('Nghịch thiên tu đạo, đan đạo song tu');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  // Helper to get active character
  const selectedChar =
    characters.find((c) => c.id === selectedCharId) ||
    PRESET_12_CHARACTERS.find((c) => c.id === selectedCharId) ||
    characters[0] ||
    PRESET_12_CHARACTERS[0];

  // Filtered roster
  const filteredCharacters = characters.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      (c.pinyinOrAlias && c.pinyinOrAlias.toLowerCase().includes(q)) ||
      (c.sectOrFaction && c.sectOrFaction.toLowerCase().includes(q)) ||
      (c.specialPhysique && c.specialPhysique.toLowerCase().includes(q)) ||
      (c.spiritualRoots && c.spiritualRoots.toLowerCase().includes(q));

    const matchRole = roleFilter === 'ALL' || c.role === roleFilter;
    const matchDestiny =
      destinyFilter === 'ALL' || (c.destinyFate && c.destinyFate.includes(destinyFilter));

    return matchSearch && matchRole && matchDestiny;
  });

  // Load preset roster if empty
  const handleLoadFullPresets = () => {
    const existingIds = new Set(characters.map((c) => c.id));
    const merged = [...characters];
    PRESET_12_CHARACTERS.forEach((preset) => {
      if (!existingIds.has(preset.id)) {
        merged.push(preset);
      }
    });
    onUpdateCharacters(merged);
    alert('Đã cập nhật đủ 12 Đại Nhân Vật Mẫu Tiêu Biểu vào danh sách!');
  };

  // AI Generate Character
  const handleGenerateCustomChar = async () => {
    setIsGeneratingAi(true);
    try {
      const promptRole = `${aiRole} - Cảnh giới ${aiRealm}`;
      const newChar = await generateCharacter(genre, promptRole, `${aiTheme}. Tên gợi ý: ${aiName || 'Tùy chọn'}`);
      
      const fullChar: CharacterProfile = {
        ...newChar,
        id: 'char_' + Date.now().toString(36),
        name: aiName.trim() || newChar.name,
        role: aiRole,
        realmOrRank: aiRealm,
        destinyFate: 'Kim Sắc Cực Phẩm (Đại Khí Vận / Thiên Mệnh Sở Quy)',
        specialPhysique: 'Tiên Thiên Đạo Thể',
        spiritualRoots: 'Hỗn Độn Ngũ Hành Linh Căn',
      };

      const updated = [fullChar, ...characters];
      onUpdateCharacters(updated);
      setSelectedCharId(fullChar.id);
      setActiveTab('roster');
      alert(`Đã tạo thành công nhân vật: ${fullChar.name}!`);
    } catch (err: any) {
      alert('Lỗi tạo nhân vật: ' + err.message);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Trigger Spiritual Appraisal
  const handleAppraiseRoots = async () => {
    if (!selectedChar) return;
    setIsAppraising(true);
    try {
      const result = await appraiseSpiritualRoots({
        character: selectedChar,
        ceremonyType,
        examiner: examinerName,
        genre,
      });
      setAppraisalResult(result);

      // Auto update character with new details
      const updatedChars = characters.map((c) => {
        if (c.id === selectedChar.id) {
          return {
            ...c,
            spiritualRootDetail: result.updatedSpiritualRootDetail,
            mentalAttributes: result.updatedMentalAttributes,
            talents: [
              ...(c.talents || []),
              ...result.awakenedTalents.filter(
                (at) => !(c.talents || []).some((t) => t.name === at.name)
              ),
            ],
            spiritualRoots: `${result.updatedSpiritualRootDetail.rootName} (${result.updatedSpiritualRootDetail.grade})`,
          };
        }
        return c;
      });
      onUpdateCharacters(updatedChars);
    } catch (err: any) {
      alert('Lỗi trắc thí linh căn: ' + err.message);
    } finally {
      setIsAppraising(false);
    }
  };

  // Trigger Encounter Simulation
  const handleSimulateEncounter = async () => {
    const char1 = characters.find((c) => c.id === simChar1Id);
    const char2 = characters.find((c) => c.id === simChar2Id);
    if (!char1 || !char2) {
      alert('Vui lòng chọn đủ hai nhân vật để mô phỏng kỳ ngộ!');
      return;
    }
    if (char1.id === char2.id) {
      alert('Hai nhân vật phải khác nhau!');
      return;
    }

    setIsSimulatingEncounter(true);
    try {
      const result = await simulateCharacterEncounter({
        character1: char1,
        character2: char2,
        encounterType,
        location: encounterLocation,
        userPrompt: encounterPrompt,
        genre,
      });
      setEncounterResult(result);
    } catch (err: any) {
      alert('Lỗi mô phỏng tao ngộ: ' + err.message);
    } finally {
      setIsSimulatingEncounter(false);
    }
  };

  // Add Relationship
  const handleAddRelationship = () => {
    if (!selectedChar || !newRelTargetId) {
      alert('Vui lòng chọn nhân vật mục tiêu liên kết!');
      return;
    }
    const targetChar = characters.find((c) => c.id === newRelTargetId);
    if (!targetChar) return;

    const newRel: CharacterRelationship = {
      targetCharacterId: targetChar.id,
      targetCharacterName: targetChar.name,
      relationType: newRelType as any,
      description:
        newRelDesc || `Mối quan hệ ${newRelType} giữa ${selectedChar.name} và ${targetChar.name}.`,
    };

    const existingRels = selectedChar.relationships || [];
    const updatedRels = [
      ...existingRels.filter((r) => r.targetCharacterId !== targetChar.id),
      newRel,
    ];

    const updatedChars = characters.map((c) => {
      if (c.id === selectedChar.id) {
        return { ...c, relationships: updatedRels };
      }
      return c;
    });

    onUpdateCharacters(updatedChars);
    setNewRelDesc('');
    alert(`Đã thêm mối quan hệ với ${targetChar.name}!`);
  };

  // Chronicle Clue Handlers
  const handleToggleClueSelection = (id: string) => {
    if (selectedClueIdsForTriangulation.includes(id)) {
      setSelectedClueIdsForTriangulation(selectedClueIdsForTriangulation.filter((cid) => cid !== id));
    } else {
      if (selectedClueIdsForTriangulation.length >= 5) {
        alert('Tối đa nên đối chiếu cùng lúc 5 manh mối để đảm bảo suy luận sắc nét nhất!');
        return;
      }
      setSelectedClueIdsForTriangulation([...selectedClueIdsForTriangulation, id]);
    }
  };

  const handleTriangulateClues = async () => {
    const selectedClues = chronicleCluesList.filter((c) =>
      selectedClueIdsForTriangulation.includes(c.id)
    );
    if (selectedClues.length < 2) {
      alert('Vui lòng tích chọn ít nhất 2 manh mối/dữ kiện để tiến hành đối chiếu xâu chuỗi!');
      return;
    }
    setIsTriangulating(true);
    try {
      const res = await triangulateChronicleClues(
        selectedClues,
        {
          selectedClueIds: selectedClueIdsForTriangulation,
          mainCharacterGoal: investigationGoal,
          investigationContext,
          discoveryStyle,
        },
        selectedChar?.name || 'Lâm Tiêu'
      );
      setTriangulationResult(res);
    } catch (err: any) {
      alert('Lỗi khi xâu chuỗi manh mối: ' + err.message);
    } finally {
      setIsTriangulating(false);
    }
  };

  const handleGenerateClueForChar = async () => {
    setIsGeneratingClue(true);
    try {
      const res = await generateChronicleClue({
        characterName: newClueCharName || selectedChar?.name || 'Lý Tam Cửu',
        characterRole: newClueRole,
        locationName: newClueLocation,
        syncMode: newClueSyncMode,
        genre,
        protagonistName: selectedChar?.name || 'Lâm Tiêu',
      });
      setChronicleCluesList([res, ...chronicleCluesList]);
      if (!selectedClueIdsForTriangulation.includes(res.id)) {
        setSelectedClueIdsForTriangulation([...selectedClueIdsForTriangulation, res.id]);
      }
      setShowAddClueModal(false);
      alert(`Đã tạo thành công manh mối thời-không mới cho ${res.characterName}!`);
    } catch (err: any) {
      alert('Lỗi tạo manh mối: ' + err.message);
    } finally {
      setIsGeneratingClue(false);
    }
  };

  const handleDeleteClue = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa manh mối này?')) {
      setChronicleCluesList(chronicleCluesList.filter((c) => c.id !== id));
      setSelectedClueIdsForTriangulation(selectedClueIdsForTriangulation.filter((cid) => cid !== id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050811] text-gray-100 font-sans select-none">
      {/* Top Banner / Navigation Header */}
      <div className="px-5 py-3.5 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-purple-950/40 to-gray-950 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl animate-pulse">👤</span>
            <h2 className="text-base md:text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-amber-300 uppercase">
              HỆ THỐNG QUẢN LÝ & MÔ PHỎNG NHÂN VẬT CHUYÊN SÂU
            </h2>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold">
              12 ĐẠI NHÂN VẬT & LINH CĂN
            </span>
          </div>
          <p className="text-xs text-purple-300/80 mt-0.5">
            Thiết kế nhân vật, linh căn ngũ hành, đạo tâm, thiên phú, mạng lưới quan hệ và mô phỏng tao ngộ đối đầu
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadFullPresets}
            className="px-3 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            title="Đồng bộ lại đủ 12 Đại Nhân Vật Mẫu Tiêu Biểu"
          >
            <span>📜</span>
            <span>Nạp 12 Nhân Vật Mẫu</span>
          </button>
        </div>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex border-b border-white/10 bg-gray-950/80 px-4 pt-2 gap-1 overflow-x-auto shrink-0 custom-scrollbar">
        <button
          onClick={() => setActiveTab('roster')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
            activeTab === 'roster'
              ? 'bg-purple-950/80 text-amber-300 border-purple-500/50 border-b-transparent shadow-lg'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>👥</span>
          <span>Bách Tiên Phả (Danh Sách {characters.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('creator')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
            activeTab === 'creator'
              ? 'bg-purple-950/80 text-amber-300 border-purple-500/50 border-b-transparent shadow-lg'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>✨</span>
          <span>Kiến Tạo Nhân Vật Bằng AI</span>
        </button>

        <button
          onClick={() => setActiveTab('spiritualAppraisal')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
            activeTab === 'spiritualAppraisal'
              ? 'bg-purple-950/80 text-amber-300 border-purple-500/50 border-b-transparent shadow-lg'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>🔮</span>
          <span>Trắc Thí Linh Căn & Đạo Cốt</span>
        </button>

        <button
          onClick={() => setActiveTab('relationships')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
            activeTab === 'relationships'
              ? 'bg-purple-950/80 text-amber-300 border-purple-500/50 border-b-transparent shadow-lg'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>🕸️</span>
          <span>Mạng Lưới Quan Hệ & Nhân Quả</span>
        </button>

        <button
          onClick={() => setActiveTab('trajectoryRouting')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
            activeTab === 'trajectoryRouting'
              ? 'bg-gradient-to-r from-amber-950/90 via-purple-950 to-indigo-950 text-amber-300 border-amber-500/50 border-b-transparent shadow-lg'
              : 'text-amber-400/90 border-transparent hover:text-amber-200 hover:bg-white/5'
          }`}
        >
          <span>🧭</span>
          <span>Định Tuyến Vận Mệnh (10 Nhánh & Niên Biểu)</span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono font-bold">
            NEW
          </span>
        </button>

        <button
          onClick={() => setActiveTab('encounterSim')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
            activeTab === 'encounterSim'
              ? 'bg-purple-950/80 text-amber-300 border-purple-500/50 border-b-transparent shadow-lg'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>⚔️</span>
          <span>Mô Phỏng Tao Ngộ & Đối Đầu</span>
        </button>

        <button
          onClick={() => setActiveTab('chronicleClues')}
          className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 border-t border-x ${
            activeTab === 'chronicleClues'
              ? 'bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 text-amber-300 border-indigo-500/50 border-b-transparent shadow-lg'
              : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-white/5'
          }`}
        >
          <span>🧩</span>
          <span>Ma Trận Manh Mối Thời-Không</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-mono">
            Đa Tuyến ({chronicleCluesList.length})
          </span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* ================= TAB 1: ROSTER & DETAIL VIEW ================= */}
        {activeTab === 'roster' && (
          <>
            {/* Sidebar List with Filters */}
            <div className="w-full md:w-80 lg:w-96 border-r border-white/10 bg-gray-950/90 flex flex-col shrink-0 overflow-hidden">
              {/* Filter controls */}
              <div className="p-3 border-b border-white/10 space-y-2 bg-gray-900/60">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên, đạo hiệu, tông môn, thể chất..."
                    className="w-full bg-gray-950 border border-purple-500/30 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-2 text-gray-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-gray-400 block mb-0.5 font-semibold">Vai Trò:</span>
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded p-1 text-purple-200 focus:outline-none"
                    >
                      <option value="ALL">Tất Cả Vai Trò</option>
                      <option value="Chính diện">Chính Diện</option>
                      <option value="Hồng nhan/Tri kỷ">Hồng Nhan / Tri Kỷ</option>
                      <option value="Đối thủ">Đối Thủ</option>
                      <option value="Phản diện">Phản Diện</option>
                      <option value="Sư phụ/Tiền bối">Sư Phụ / Tiền Bối</option>
                      <option value="Nội gián / Điệp viên">Nội Gián / Điệp Viên</option>
                      <option value="Hỗ trợ">Hỗ Trợ</option>
                      <option value="Ẩn thế lão tổ">Ẩn Thế Lão Tổ</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-gray-400 block mb-0.5 font-semibold">Mệnh Cách:</span>
                    <select
                      value={destinyFilter}
                      onChange={(e) => setDestinyFilter(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded p-1 text-amber-200 focus:outline-none"
                    >
                      <option value="ALL">Tất Cả Khí Vận</option>
                      <option value="Kim Sắc">Kim Sắc (Cực Phẩm)</option>
                      <option value="Tử Sắc">Tử Sắc (Thượng Phẩm)</option>
                      <option value="Lam Sắc">Lam Sắc (Trung Phẩm)</option>
                      <option value="Lục Sắc">Lục Sắc (Thường Phẩm)</option>
                      <option value="Xích Sắc">Xích Sắc (Sát Tinh)</option>
                      <option value="Hắc Sắc">Hắc Sắc (Kiếp Số)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Roster Character Cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
                {filteredCharacters.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 text-xs">
                    Không tìm thấy nhân vật phù hợp bộ lọc.
                  </div>
                ) : (
                  filteredCharacters.map((c) => {
                    const isSelected = selectedChar?.id === c.id;
                    const isGolden = c.destinyFate?.includes('Kim Sắc');
                    const isPurple = c.destinyFate?.includes('Tử Sắc');
                    const isRed = c.destinyFate?.includes('Xích Sắc');
                    const isBlack = c.destinyFate?.includes('Hắc Sắc');

                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCharId(c.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer relative overflow-hidden group ${
                          isSelected
                            ? 'bg-purple-950/80 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                            : 'bg-gray-900/70 border-white/5 hover:border-purple-500/40 hover:bg-gray-900'
                        }`}
                      >
                        {/* Top Indicator */}
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                              {c.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 font-mono">
                              {c.role}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-amber-400 font-semibold">
                            {c.realmOrRank}
                          </span>
                        </div>

                        {c.pinyinOrAlias && (
                          <div className="text-[11px] text-amber-300/80 italic line-clamp-1 mb-1">
                            {c.pinyinOrAlias}
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                          <span className="truncate max-w-[150px]">{c.sectOrFaction || 'Tán tu'}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded font-mono ${
                              isGolden
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : isPurple
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                : isRed
                                ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                                : isBlack
                                ? 'bg-gray-800 text-gray-300 border border-gray-600'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {c.destinyFate ? c.destinyFate.split(' ')[0] : 'Phổ thông'}
                          </span>
                        </div>

                        {c.specialPhysique && (
                          <div className="text-[10px] text-cyan-300/80 mt-1 truncate">
                            ⚡ {c.specialPhysique}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Main Detail Panel */}
            {selectedChar ? (
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5 bg-[#070a14]">
                {/* Header Profile Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-950 via-purple-950/50 to-gray-950 border border-purple-500/30 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 relative z-10">
                    <div className="flex items-start gap-4">
                      {/* Avatar preview */}
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-amber-400/60 overflow-hidden shadow-lg shrink-0 bg-gray-900 relative">
                        {selectedChar.avatarUrl ? (
                          <img
                            src={selectedChar.avatarUrl}
                            alt={selectedChar.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">
                            👤
                          </div>
                        )}
                        <span className="absolute bottom-1 right-1 text-[9px] px-1 py-0.5 rounded bg-black/80 text-amber-300 font-mono font-bold">
                          {selectedChar.gender || 'Nam'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl md:text-2xl font-black text-amber-300 tracking-wide">
                            {selectedChar.name}
                          </h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 font-semibold">
                            {selectedChar.role}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                            {selectedChar.realmOrRank}
                          </span>
                        </div>

                        {selectedChar.pinyinOrAlias && (
                          <p className="text-xs md:text-sm text-pink-300/90 font-medium italic">
                            Đạo Hiệu: {selectedChar.pinyinOrAlias}
                          </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300 pt-1">
                          <span>⛩️ Tông Môn: <strong className="text-white">{selectedChar.sectOrFaction || 'Tán tu'}</strong></span>
                          {selectedChar.factionPosition && (
                            <span>🛡️ Chức Vụ: <strong className="text-white">{selectedChar.factionPosition}</strong></span>
                          )}
                          <span>⏳ Tuổi Thọ: <strong className="text-white">{selectedChar.age || 'Không rõ'}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2 self-start">
                      {onInsertText && (
                        <button
                          onClick={() => {
                            const snippet = `[HỒ SƠ NHÂN VẬT: ${selectedChar.name} - ${selectedChar.realmOrRank}]\n- Đạo hiệu: ${selectedChar.pinyinOrAlias || 'Không có'}\n- Vai trò: ${selectedChar.role} | Tông môn: ${selectedChar.sectOrFaction || 'Tán tu'}\n- Thể chất: ${selectedChar.specialPhysique || 'Phàm thể'}\n- Linh căn: ${selectedChar.spiritualRoots || 'Bình thường'}\n- Binh khí & Thần thông: ${selectedChar.weaponOrAbility}\n- Tính cách: ${selectedChar.personality}\n- Lai lịch: ${selectedChar.backstory}`;
                            onInsertText(snippet);
                            alert(`Đã chèn hồ sơ nhân vật ${selectedChar.name} vào tác phẩm!`);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg text-xs font-bold text-white shadow-md transition-all flex items-center gap-1.5"
                        >
                          <span>📝</span>
                          <span>Chèn Vào Truyện</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setActiveTab('spiritualAppraisal');
                        }}
                        className="px-3 py-1.5 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 rounded-lg text-xs font-bold text-purple-200 transition-all flex items-center gap-1.5"
                      >
                        <span>🔮</span>
                        <span>Trắc Thí Linh Căn</span>
                      </button>
                      <button
                        onClick={() => {
                          setClueSearchQuery(selectedChar.name);
                          setNewClueCharName(selectedChar.name);
                          setNewClueRole(selectedChar.role);
                          setActiveTab('chronicleClues');
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 hover:from-indigo-800 hover:to-purple-800 border border-indigo-400/40 rounded-lg text-xs font-bold text-indigo-200 transition-all flex items-center gap-1.5 shadow"
                        title="Xem hoặc thiết kế manh mối thời-không cho nhân vật này"
                      >
                        <span>🧩</span>
                        <span>Manh Mối Thời-Không</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Grid 1: Mệnh Cách & Thể Chất & Linh Căn */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Mệnh Cách */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300">👑 Mệnh Cách & Khí Vận:</span>
                      <span className="text-[10px] font-mono text-purple-400">DESTINY</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-950 border border-white/5 text-xs font-bold text-amber-200">
                      {selectedChar.destinyFate || 'Lam Sắc Trung Phẩm (Cơ Duyên Bất Phàm)'}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Định đoạt tỷ lệ gặp kỳ ngộ cơ duyên, phá vỡ bình cảnh và thoát chết trong gang tấc.
                    </p>
                  </div>

                  {/* Đặc Thù Thể Chất */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-cyan-300">⚡ Đặc Thù Thể Chất:</span>
                      <span className="text-[10px] font-mono text-cyan-400">PHYSIQUE</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-950 border border-white/5 text-xs font-bold text-cyan-200">
                      {selectedChar.specialPhysique || 'Tiên Thiên Phàm Thể (Chưa thức tỉnh)'}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Nhục thân dị biệt quyết định tốc độ hấp thu linh khí và uy lực thần thông quyền cước.
                    </p>
                  </div>

                  {/* Đạo Căn Tổng Quan */}
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-pink-300">🌿 Linh Căn Khởi Thủy:</span>
                      <span className="text-[10px] font-mono text-pink-400">SPIRITUAL ROOT</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-gray-950 border border-white/5 text-xs font-bold text-pink-200 truncate">
                      {selectedChar.spiritualRoots || 'Ngũ Hành Tạp Căn'}
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Phẩm giai linh căn quyết định độ tinh thuần nguyên khí và độ khó khi đột phá đại cảnh giới.
                    </p>
                  </div>
                </div>

                {/* Detailed Spiritual Root Breakdown (if available) */}
                {selectedChar.spiritualRootDetail && (
                  <div className="p-5 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔮</span>
                        <h4 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 uppercase">
                          CHI TIẾT PHÂN CẤP LINH CĂN & THUẦN ĐỘ
                        </h4>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold font-mono">
                        {selectedChar.spiritualRootDetail.grade}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <span className="text-gray-400">Tên Linh Căn Chuẩn Mực:</span>
                        <p className="font-bold text-amber-300 text-sm">
                          {selectedChar.spiritualRootDetail.rootName}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-400">Hệ Số Tốc Độ Tu Luyện:</span>
                        <p className="font-bold text-emerald-300">
                          {selectedChar.spiritualRootDetail.cultivationSpeedMultiplier}
                        </p>
                      </div>
                    </div>

                    {/* Elements bar */}
                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-semibold text-gray-300 block">
                        Các Nguyên Tố Linh Căn Cấu Thành:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {selectedChar.spiritualRootDetail.elements.map((el, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-gray-900 border border-white/5 space-y-1"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold" style={{ color: el.color || '#fff' }}>
                                Hệ {el.element}
                              </span>
                              <span className="font-mono text-vip-gold font-bold">
                                {el.purity}% Thuần độ
                              </span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-gray-950 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${el.purity}%`,
                                  backgroundColor: el.color || '#a855f7',
                                }}
                              />
                            </div>
                            {el.description && (
                              <p className="text-[10px] text-gray-400 leading-tight">
                                {el.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedChar.spiritualRootDetail.specialAuraEffect && (
                      <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs">
                        <strong className="text-purple-300 block mb-0.5">Dị Tượng Tu Luyện:</strong>
                        <p className="text-purple-100/90 leading-relaxed italic">
                          {selectedChar.spiritualRootDetail.specialAuraEffect}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Mental Soul & Dao Heart Attributes */}
                {selectedChar.mentalAttributes && (
                  <div className="p-5 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🧘</span>
                        <h4 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 uppercase">
                          ĐẠO TÂM & THẦN THỨC NGUYÊN HỒN
                        </h4>
                      </div>
                      <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold font-mono">
                        {selectedChar.mentalAttributes.soulRealm}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                        <span className="text-gray-400 block text-[11px]">Điểm Thần Hồn:</span>
                        <strong className="text-cyan-300 text-sm font-mono">
                          {selectedChar.mentalAttributes.soulPowerPoints.toLocaleString()} Điểm
                        </strong>
                      </div>
                      <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                        <span className="text-gray-400 block text-[11px]">Phạm Vi Thần Thức:</span>
                        <strong className="text-blue-300 text-sm">
                          {selectedChar.mentalAttributes.perceptionRange}
                        </strong>
                      </div>
                      <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                        <span className="text-gray-400 block text-[11px]">Cấp Bậc Ngộ Tính:</span>
                        <strong className="text-amber-300 text-sm">
                          {selectedChar.mentalAttributes.comprehensionTier}
                        </strong>
                      </div>
                      <div className="p-3 rounded-xl bg-gray-900 border border-white/5 space-y-1">
                        <span className="text-gray-400 block text-[11px]">Kháng Tâm Ma:</span>
                        <strong className="text-emerald-300 text-sm font-mono">
                          {selectedChar.mentalAttributes.innerDemonResistance}% Ổn định
                        </strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-900/80 border border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-indigo-300">Đạo Tâm: {selectedChar.mentalAttributes.daoHeartType}</strong>
                        <span className="text-amber-400 font-mono font-bold">
                          Độ Vững: {selectedChar.mentalAttributes.daoHeartStability}/100
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-950 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                          style={{ width: `${selectedChar.mentalAttributes.daoHeartStability}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Innate Talents list */}
                {selectedChar.talents && selectedChar.talents.length > 0 && (
                  <div className="p-5 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🌟</span>
                        <h4 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200 uppercase">
                          THIÊN PHÚ BẨM SINH & THẦN THÔNG DỊ NĂNG
                        </h4>
                      </div>
                      <span className="text-xs text-amber-400 font-mono font-bold">
                        {selectedChar.talents.length} Thiên Phú Đã Thức Tỉnh
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedChar.talents.map((tal) => (
                        <div
                          key={tal.id}
                          className="p-3.5 rounded-xl bg-gray-900/90 border border-amber-500/20 space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-amber-300 text-xs">{tal.name}</h5>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold">
                              {tal.tier}
                            </span>
                          </div>
                          <span className="text-[10px] text-purple-300 font-medium block">
                            Phân loại: {tal.category}
                          </span>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {tal.description}
                          </p>
                          <div className="text-[11px] p-2 rounded bg-black/40 border border-white/5 text-emerald-300">
                            <strong>Hiệu ứng:</strong> {tal.combatBuffEffect}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grid 2: Combat & Gear & Cultivation Base */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-2">
                    <strong className="text-amber-300 block text-xs">⚔️ Binh Khí & Bản Mệnh Pháp Bảo:</strong>
                    <p className="text-gray-200 font-medium leading-relaxed">
                      {selectedChar.weaponOrAbility || 'Chưa rõ'}
                    </p>
                    {selectedChar.natalArtifact && (
                      <div className="text-[11px] text-cyan-300 pt-1 border-t border-white/5">
                        <strong>Bản Mệnh Kiếm Thai / Bảo Vật:</strong> {selectedChar.natalArtifact}
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-2">
                    <strong className="text-emerald-300 block text-xs">🐾 Linh Thú Khế Ước & Động Phủ:</strong>
                    <p className="text-gray-200 font-medium leading-relaxed">
                      Linh Thú: {selectedChar.bondedBeast || 'Chưa thuần phục'}
                    </p>
                    {selectedChar.grottoDwelling && (
                      <div className="text-[11px] text-emerald-200 pt-1 border-t border-white/5">
                        <strong>Động Phủ Tu Luyện:</strong> {selectedChar.grottoDwelling}
                      </div>
                    )}
                  </div>
                </div>

                {/* Personality, Appearance, Flaw */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-1.5">
                    <strong className="text-purple-300 block">🎭 Tính Cách & Đạo Phong:</strong>
                    <p className="text-gray-300 leading-relaxed text-xs">
                      {selectedChar.personality}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-white/10 space-y-1.5">
                    <strong className="text-pink-300 block">✨ Ngoại Hình & Thần Thái:</strong>
                    <p className="text-gray-300 leading-relaxed text-xs">
                      {selectedChar.appearance}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900/80 border border-red-500/20 space-y-1.5">
                    <strong className="text-red-300 block">⚠️ Nhược Điểm Chí Mạng / Tử Huyệt:</strong>
                    <p className="text-gray-300 leading-relaxed text-xs">
                      {selectedChar.fatalFlawOrTaboo || 'Chưa có thông tin'}
                    </p>
                  </div>
                </div>

                {/* Backstory & Current Objective */}
                <div className="p-5 rounded-2xl bg-gray-950/90 border border-purple-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <strong className="text-amber-300 text-sm">📜 Lai Lịch, Cố Sự & Mối Hận:</strong>
                    {selectedChar.currentObjective && (
                      <span className="text-xs text-cyan-300 font-medium">
                        Mục tiêu hiện tại: {selectedChar.currentObjective}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {selectedChar.backstory}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                Vui lòng chọn một nhân vật từ danh sách bên trái.
              </div>
            )}
          </>
        )}

        {/* ================= TAB 2: AI CHARACTER CREATOR ================= */}
        {activeTab === 'creator' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-gray-950/90 border border-purple-500/30 shadow-2xl space-y-5">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                  <span>✨</span>
                  <span>KIẾN TẠO NHÂN VẬT ĐỘC BẢN BẰNG TRÍ TUỆ NHÂN TẠO</span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Nhập các ý tưởng cốt lõi, AI sẽ tự động sinh hồ sơ toàn diện: linh căn, thể chất, mệnh cách, thiên phú, binh khí và lai lịch chuẩn văn phong Tiên Hiệp.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Tên Nhân Vật (Để trống nếu muốn AI tự đặt):
                  </label>
                  <input
                    type="text"
                    value={aiName}
                    onChange={(e) => setAiName(e.target.value)}
                    placeholder="Ví dụ: Dạ Hàn Phong, Tiêu Dao Tử, Thẩm Thanh Thu..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Vai Trò Cốt Truyện:
                    </label>
                    <select
                      value={aiRole}
                      onChange={(e) => setAiRole(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-purple-200 focus:outline-none"
                    >
                      <option value="Chính diện">Chính Diện (Khí Vận Chi Tử / Nhân vật chính)</option>
                      <option value="Hồng nhan/Tri kỷ">Hồng Nhan / Tri Kỷ (Đạo Lữ / Mỹ nhân)</option>
                      <option value="Đối thủ">Đối Thủ (Thiên Kiêu đối địch / Bá vương)</option>
                      <option value="Phản diện">Phản Diện (Ma Tôn / Giáo chủ mưu sâu kế độc)</option>
                      <option value="Sư phụ/Tiền bối">Sư Phụ / Tiền Bối (Cao nhân chỉ điểm)</option>
                      <option value="Nội gián / Điệp viên">Nội Gián / Điệp Viên (Ám tuyến ngầm hai mang)</option>
                      <option value="Hỗ trợ">Hỗ Trợ (Bách nghệ đan / khí / phù / trận)</option>
                      <option value="Ẩn thế lão tổ">Ẩn Thế Lão Tổ (Cổ ma đoạt xá / Tiên nhân tàn hồn)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Cảnh Giới Khởi Đầu:
                    </label>
                    <select
                      value={aiRealm}
                      onChange={(e) => setAiRealm(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-amber-200 focus:outline-none"
                    >
                      <option value="Luyện Khí Kỳ (Tầng 1 - 9)">Luyện Khí Kỳ</option>
                      <option value="Trúc Cơ Kỳ (Đỉnh Phong)">Trúc Cơ Kỳ</option>
                      <option value="Kim Đan Kỳ (Sơ - Hậu Kỳ)">Kim Đan Kỳ</option>
                      <option value="Nguyên Anh Kỳ (Đại Năng)">Nguyên Anh Kỳ</option>
                      <option value="Hóa Thần Kỳ (Chí Tôn)">Hóa Thần Kỳ</option>
                      <option value="Luyện Hư Kỳ (Cự Phách)">Luyện Hư Kỳ</option>
                      <option value="Hợp Thể Kỳ (Chuẩn Tiên)">Hợp Thể Kỳ</option>
                      <option value="Đại Thừa / Độ Kiếp Kỳ">Đại Thừa / Độ Kiếp Kỳ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Ý Tưởng Phong Cách, Tính Cách & Kỳ Ngộ Riêng Biệt:
                  </label>
                  <textarea
                    rows={4}
                    value={aiTheme}
                    onChange={(e) => setAiTheme(e.target.value)}
                    placeholder="Ví dụ: Trùng sinh từ vạn năm trước, mang kiếm ý tàn phá, tính tình dứt khoát quyết liệt, sở hữu thể chất Lôi Đình Thần Ma..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400 leading-relaxed"
                  />
                </div>

                <button
                  onClick={handleGenerateCustomChar}
                  disabled={isGeneratingAi}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 rounded-xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-2 text-sm"
                >
                  {isGeneratingAi ? <Spinner /> : <span>⚡</span>}
                  <span>{isGeneratingAi ? 'Đang Khởi Tạo Đạo Cốt & Thần Hồn...' : 'Khởi Lò Kiến Tạo Nhân Vật'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SPIRITUAL ROOTS APPRAISAL CEREMONY ================= */}
        {activeTab === 'spiritualAppraisal' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Header Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-950 via-purple-950/60 to-gray-950 border border-purple-500/40 shadow-xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-amber-300 flex items-center gap-2">
                      <span>🔮</span>
                      <span>ĐẠI ĐIỂN TRẮC THÍ LINH CĂN & GIÁM ĐỊNH ĐẠO CỐT</span>
                    </h3>
                    <p className="text-xs text-gray-300 mt-1">
                      Mô phỏng nghi lễ đo đạc kinh mạch, thức tỉnh thiên phú bẩm sinh trước Trắc Linh Thạch và bia đá ngàn năm của tiên môn.
                    </p>
                  </div>

                  {/* Character selector */}
                  <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-xl border border-white/10">
                    <span className="text-xs text-gray-400">Đối tượng:</span>
                    <select
                      value={selectedCharId}
                      onChange={(e) => setSelectedCharId(e.target.value)}
                      className="bg-gray-950 text-amber-300 text-xs font-bold border border-purple-500/40 rounded px-2.5 py-1 focus:outline-none"
                    >
                      {characters.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.realmOrRank})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ceremony Config */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Hình Thức / Quy Mô Nghi Lễ:
                    </label>
                    <select
                      value={ceremonyType}
                      onChange={(e) => setCeremonyType(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                    >
                      <option value="Đại Điển Trắc Căn Khai Sơn Tông Môn (Vạn người chứng kiến)">
                        Đại Điển Trắc Căn Khai Sơn Tông Môn
                      </option>
                      <option value="Bí Mật Trắc Thí Tại Tàng Kinh Các Cấm Địa">
                        Bí Mật Trắc Thí Tại Tàng Kinh Các Cấm Địa
                      </option>
                      <option value="Thái Cổ Thần Thạch Thức Tỉnh Tại Cổ Di Tích">
                        Thái Cổ Thần Thạch Thức Tỉnh Tại Cổ Di Tích
                      </option>
                      <option value="Gia Tộc Trắc Linh Hội Đoạt Quyền Thiếu Chủ">
                        Gia Tộc Trắc Linh Hội Đoạt Quyền Thiếu Chủ
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">
                      Chủ Trì / Giám Khảo Khảo Hạch:
                    </label>
                    <input
                      type="text"
                      value={examinerName}
                      onChange={(e) => setExaminerName(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAppraiseRoots}
                  disabled={isAppraising}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:to-pink-500 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 text-xs md:text-sm"
                >
                  {isAppraising ? <Spinner /> : <span>⚡</span>}
                  <span>
                    {isAppraising
                      ? 'Trắc Linh Thạch Đang Phát Quang Chói Lọi...'
                      : `Khởi Động Trắc Thí Cho ${selectedChar.name}`}
                  </span>
                </button>
              </div>

              {/* Appraisal Result Showcase */}
              {appraisalResult && (
                <div className="p-6 rounded-2xl bg-gray-950/90 border border-cyan-500/40 shadow-2xl space-y-5 animate-fade-in">
                  <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-mono uppercase font-bold tracking-wider">
                        KẾT QUẢ GIÁM ĐỊNH THIÊN ĐẠO
                      </span>
                      <h4 className="text-base font-black text-amber-300">
                        {appraisalResult.updatedSpiritualRootDetail.rootName}
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                      {appraisalResult.updatedSpiritualRootDetail.grade}
                    </span>
                  </div>

                  {/* Narrative of the testing */}
                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs space-y-1">
                    <strong className="text-purple-300 block">📜 Diễn Biến Nghi Lễ:</strong>
                    <p className="text-gray-200 leading-relaxed italic">
                      "{appraisalResult.testingCeremonyNarrative}"
                    </p>
                  </div>

                  {/* Examiner Conclusion */}
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs space-y-1">
                    <strong className="text-amber-300 block">⚖️ Lời Phán Của Chủ Khảo:</strong>
                    <p className="text-amber-100 font-medium leading-relaxed">
                      {appraisalResult.appraisalConclusion}
                    </p>
                  </div>

                  {/* Elements display */}
                  <div className="space-y-2">
                    <strong className="text-xs text-gray-300 block">Thuần Độ Ngũ Hành / Dị Hệ:</strong>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      {appraisalResult.updatedSpiritualRootDetail.elements.map((el, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-gray-900 border border-white/5 text-xs">
                          <div className="flex justify-between font-bold" style={{ color: el.color || '#fff' }}>
                            <span>Hệ {el.element}</span>
                            <span>{el.purity}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Newly awakened talents */}
                  {appraisalResult.awakenedTalents && appraisalResult.awakenedTalents.length > 0 && (
                    <div className="space-y-2">
                      <strong className="text-xs text-amber-300 block">🌟 Thiên Phú Mới Thức Tỉnh:</strong>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {appraisalResult.awakenedTalents.map((t) => (
                          <div key={t.id} className="p-3 rounded-xl bg-gray-900 border border-amber-500/30 text-xs space-y-1">
                            <div className="flex justify-between font-bold text-amber-300">
                              <span>{t.name}</span>
                              <span className="font-mono text-[10px] text-pink-300">{t.tier}</span>
                            </div>
                            <p className="text-gray-300 text-[11px]">{t.description}</p>
                            <span className="text-emerald-300 block text-[10px]">{t.combatBuffEffect}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {onInsertText && (
                    <button
                      onClick={() => {
                        const text = `[KẾT QUẢ TRẮC THÍ LINH CĂN: ${selectedChar.name}]\n- Chủ khảo: ${examinerName}\n- Nghi lễ: ${ceremonyType}\n- Linh căn: ${appraisalResult.updatedSpiritualRootDetail.rootName} (${appraisalResult.updatedSpiritualRootDetail.grade})\n- Nhận định: ${appraisalResult.appraisalConclusion}\n- Trích đoạn cảnh tượng:\n${appraisalResult.testingCeremonyNarrative}`;
                        onInsertText(text);
                        alert('Đã chèn kết quả trắc thí vào truyện!');
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white transition-all shadow-md"
                    >
                      📝 Chèn Kết Quả Vào Tác Phẩm
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: RELATIONSHIP NETWORK & CAUSALITY ================= */}
        {activeTab === 'relationships' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Active Character Selector */}
              <div className="p-5 rounded-2xl bg-gray-950/90 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase">
                    MẠNG LƯỚI QUAN HỆ & DÂY DƯA NHÂN QUẢ CỦA {selectedChar.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Theo dõi sư đồ, đạo lữ, kẻ thù truyền kiếp, huynh đệ sinh tử và quan hệ nội gián
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Chọn Nhân Vật:</span>
                  <select
                    value={selectedCharId}
                    onChange={(e) => setSelectedCharId(e.target.value)}
                    className="bg-gray-900 text-amber-300 text-xs font-bold border border-purple-500/40 rounded px-3 py-1.5 focus:outline-none"
                  >
                    {characters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add Relationship Box */}
              <div className="p-5 rounded-2xl bg-gray-950/80 border border-white/10 space-y-4">
                <h4 className="text-xs font-bold text-purple-300 uppercase">
                  ➕ Thiết Lập Mối Quan Hệ Mới Cho {selectedChar.name}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1">Nhân Vật Liên Kết:</label>
                    <select
                      value={newRelTargetId}
                      onChange={(e) => setNewRelTargetId(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                    >
                      <option value="">-- Chọn nhân vật mục tiêu --</option>
                      {characters
                        .filter((c) => c.id !== selectedChar.id)
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.role} - {c.realmOrRank})
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1">Loại Hình Quan Hệ:</label>
                    <select
                      value={newRelType}
                      onChange={(e) => setNewRelType(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-300 focus:outline-none"
                    >
                      <option value="Sư Đồ (Thầy - Trò)">Sư Đồ (Thầy - Trò)</option>
                      <option value="Đạo Lữ (Bạn đời tu tiên)">Đạo Lữ (Bạn đời tu tiên)</option>
                      <option value="Tri Kỷ Hồng Nhan">Tri Kỷ Hồng Nhan</option>
                      <option value="Huynh Đệ Sinh Tử">Huynh Đệ Sinh Tử</option>
                      <option value="Kẻ Thù Truyền Kiếp / Huyết Cừu">Kẻ Thù Truyền Kiếp / Huyết Cừu</option>
                      <option value="Chủ Tớ / Khế Ước Mệnh Hồn">Chủ Tớ / Khế Ước Mệnh Hồn</option>
                      <option value="Đồng Môn / Cạnh Tranh">Đồng Môn / Cạnh Tranh</option>
                      <option value="Nội Gián Giám Sát / Đề Phòng">Nội Gián Giám Sát / Đề Phòng</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 text-xs">Ghi Chú Nguồn Gốc Mối Quan Hệ:</label>
                  <input
                    type="text"
                    value={newRelDesc}
                    onChange={(e) => setNewRelDesc(e.target.value)}
                    placeholder="Ví dụ: Từng cùng nhau vượt qua Huyết Hải bí cảnh, cứu mạng lẫn nhau..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleAddRelationship}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-xs font-bold text-white transition-all shadow-md"
                >
                  Ghi Nhận Mối Quan Hệ
                </button>
              </div>

              {/* Current Relationships Roster */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase">
                  Danh Sách Quan Hệ Đã Có ({selectedChar.relationships?.length || 0}):
                </h4>

                {(!selectedChar.relationships || selectedChar.relationships.length === 0) ? (
                  <div className="p-8 text-center rounded-xl bg-gray-950/60 border border-white/5 text-gray-500 text-xs">
                    Nhân vật này chưa được thiết lập mối quan hệ liên kết nào. Hãy thêm ở ô phía trên!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {selectedChar.relationships.map((rel, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-gray-950 border border-purple-500/20 space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-amber-300 text-sm">
                            {rel.targetCharacterName}
                          </strong>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono font-bold">
                            {rel.relationType}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {rel.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4.5: TRAJECTORY ROUTING STUDIO ================= */}
        {activeTab === 'trajectoryRouting' && (
          <div className="flex-1 overflow-hidden h-full">
            <CharacterTrajectoryRoutingStudio
              characters={characters}
              onUpdateCharacters={onUpdateCharacters}
              genre={genre}
              onInsertText={onInsertText}
            />
          </div>
        )}

        {/* ================= TAB 5: ENCOUNTER SIMULATOR ================= */}
        {activeTab === 'encounterSim' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-5">
              {/* Encounter Setup Header */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-950 via-purple-950/60 to-gray-950 border border-purple-500/40 shadow-xl space-y-5">
                <div>
                  <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-purple-300 flex items-center gap-2">
                    <span>⚔️</span>
                    <span>TRÌNH MÔ PHỎNG TAO NGỘ & ĐỐI ĐẦU ĐỈNH PHONG</span>
                  </h3>
                  <p className="text-xs text-gray-300 mt-1">
                    Mô phỏng chân thực cuộc gặp gỡ, đối đáp sắc bén, khí thế áp bách và chạm trán bùng nổ giữa hai nhân vật bất kỳ trong tác phẩm.
                  </p>
                </div>

                {/* Character Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-900 border border-cyan-500/30 space-y-2">
                    <span className="text-xs font-bold text-cyan-300 block">👤 Nhân Vật 1 (Bên Khởi Sự):</span>
                    <select
                      value={simChar1Id}
                      onChange={(e) => setSimChar1Id(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                    >
                      {characters.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.role} - {c.realmOrRank})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-900 border border-red-500/30 space-y-2">
                    <span className="text-xs font-bold text-red-300 block">👤 Nhân Vật 2 (Bên Đối Diện):</span>
                    <select
                      value={simChar2Id}
                      onChange={(e) => setSimChar2Id(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                    >
                      {characters.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.role} - {c.realmOrRank})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Type & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Loại Hình Gặp Gỡ:</label>
                    <select
                      value={encounterType}
                      onChange={(e) => setEncounterType(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-amber-200 focus:outline-none"
                    >
                      <option value="Đấu Trí & Đấu Khí Tranh Đoạt Duyên">Đấu Trí & Đấu Khí Tranh Đoạt Duyên</option>
                      <option value="Tông Môn Lôi Đài Quyết Chiến Sinh Tử">Tông Môn Lôi Đài Quyết Chiến Sinh Tử</option>
                      <option value="Bất Ngờ Tương Phùng Trong Ma Cảnh">Bất Ngờ Tương Phùng Trong Ma Cảnh</option>
                      <option value="Lật Mặt Phản Bội & Chém Giết Đồng Môn">Lật Mặt Phản Bội & Chém Giết Đồng Môn</option>
                      <option value="Hồng Nhan Gặp Nạn & Anh Hùng Cứu Mỹ Nhân">Hồng Nhan Gặp Nạn & Anh Hùng Cứu Mỹ Nhân</option>
                      <option value="Luận Đạo Đàm Kiếm Giữa Hai Tuyệt Thế Thiên Kiêu">Luận Đạo Đàm Kiếm Giữa Hai Tuyệt Thế Thiên Kiêu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Địa Điểm Xảy Ra:</label>
                    <input
                      type="text"
                      value={encounterLocation}
                      onChange={(e) => setEncounterLocation(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1 text-xs">
                    Chi Tiết Tình Tiết & Điểm Mấu Chốt Bổ Sung:
                  </label>
                  <input
                    type="text"
                    value={encounterPrompt}
                    onChange={(e) => setEncounterPrompt(e.target.value)}
                    placeholder="Mục đích, mâu thuẫn tranh đoạt, lời thoại then chốt..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSimulateEncounter}
                  disabled={isSimulatingEncounter}
                  className="w-full py-3 bg-gradient-to-r from-red-600 via-amber-600 to-purple-600 hover:from-red-500 hover:to-purple-500 rounded-xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-2 text-xs md:text-sm"
                >
                  {isSimulatingEncounter ? <Spinner /> : <span>⚔️</span>}
                  <span>
                    {isSimulatingEncounter
                      ? 'Linh Áp Cuồn Cuộn, Kiếm Khí Đang Bộc Phát...'
                      : 'Bắt Đầu Mô Phỏng Cuộc Chạm Trán'}
                  </span>
                </button>
              </div>

              {/* Encounter Simulation Output */}
              {encounterResult && (
                <div className="p-6 rounded-2xl bg-gray-950/90 border border-amber-500/40 shadow-2xl space-y-5 animate-fade-in">
                  <div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-amber-400 font-mono uppercase font-bold tracking-wider">
                        KẾT QUẢ MÔ PHỎNG CHI TIẾT
                      </span>
                      <h4 className="text-base font-black text-white">
                        {encounterResult.character1Name} VS {encounterResult.character2Name}
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                      📍 {encounterResult.location}
                    </span>
                  </div>

                  {/* Context Narrative */}
                  <div className="p-4 rounded-xl bg-gray-900 border border-white/10 text-xs space-y-1">
                    <strong className="text-amber-300 block">🌌 Khởi Đầu Tao Ngộ:</strong>
                    <p className="text-gray-200 leading-relaxed italic">
                      {encounterResult.contextNarrative}
                    </p>
                  </div>

                  {/* Dialogue exchange */}
                  <div className="space-y-2">
                    <strong className="text-xs text-cyan-300 block">💬 Khẩu Chiến & Thần Thái:</strong>
                    <div className="space-y-2">
                      {encounterResult.dialogueExchange.map((item, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-gray-900/80 border border-white/5 text-xs space-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-300">{item.speaker}</span>
                            <span className="text-[10px] text-pink-300 italic">{item.expression}</span>
                          </div>
                          <p className="text-gray-100 font-medium pl-2 border-l-2 border-purple-500/50">
                            "{item.line}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Combat Climax */}
                  <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 text-xs space-y-1">
                    <strong className="text-red-300 block">⚡ Cao Trào Giao Phong:</strong>
                    <p className="text-gray-100 leading-relaxed">
                      {encounterResult.combatOrActionClimax}
                    </p>
                  </div>

                  {/* Resolution & Impact */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1">
                    <strong className="text-emerald-300 block">🏆 Kết Cục & Dư Âm Vận Mệnh:</strong>
                    <p className="text-emerald-100 leading-relaxed">
                      {encounterResult.resolutionAndImpact}
                    </p>
                  </div>

                  {/* Novel Snippet (500-800 words) */}
                  <div className="p-5 rounded-2xl bg-gray-900/90 border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <strong className="text-vip-gold text-xs uppercase flex items-center gap-1.5">
                        <span>📖</span>
                        <span>Trích Đoạn Tiểu Thuyết Đạt Chuẩn Xuất Bản:</span>
                      </strong>
                      {onInsertText && (
                        <button
                          onClick={() => {
                            onInsertText(encounterResult.novelSnippet);
                            alert('Đã chèn trích đoạn cuộc chạm trán vào bản thảo!');
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-bold text-white shadow-md transition-all flex items-center gap-1"
                        >
                          <span>1-Click</span>
                          <span>Chèn Vào Truyện</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-200 leading-relaxed whitespace-pre-line font-serif italic">
                      {encounterResult.novelSnippet}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 6: MA TRẬN MANH MỐI THỜI-KHÔNG (CHRONICLE CLUES MATRIX) ================= */}
        {activeTab === 'chronicleClues' && (
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar bg-gradient-to-b from-[#070b19] via-[#050811] to-[#04060c]">
            {/* Header Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950 border border-indigo-500/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl animate-pulse">🧩</span>
                  <h3 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300 uppercase tracking-wide">
                    MA TRẬN THÔNG TIN ĐA TUYẾN & MANH MỐI THỜI-KHÔNG
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 font-mono font-bold">
                    ĐỒNG THỜI & DỊ THỜI
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-1 max-w-4xl leading-relaxed">
                  Quản lý các mảng dữ kiện của nhân vật phụ diễn ra <strong className="text-cyan-300">đồng thời</strong> (ở phương xa khi Main đang làm việc khác) hoặc <strong className="text-amber-300">dị thời</strong> (quá khứ 10 năm, 300 năm trước hay điềm báo tương lai). Khi nhân vật chính xâu chuỗi các mảnh ghép này, chân tướng kinh thiên sẽ phát lộ tự nhiên, không bị gượng ép.
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3 text-[11px]">
                  <span className="px-2.5 py-1 rounded-md bg-gray-900/80 text-gray-300 border border-white/10 font-mono">
                    Tổng số: <strong className="text-white">{chronicleCluesList.length}</strong> manh mối
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-mono">
                    ⚡ Đồng thời: <strong className="text-white">{chronicleCluesList.filter((c) => c.syncMode === 'simultaneous').length}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/30 font-mono">
                    ⏳ Dị thời tiền sử: <strong className="text-white">{chronicleCluesList.filter((c) => c.syncMode === 'asynchronous_past').length}</strong>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/30 font-mono">
                    🎯 Đang chọn đối chiếu: <strong className="text-amber-300">{selectedClueIdsForTriangulation.length}</strong>/5
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowAddClueModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-900/40 border border-indigo-400/40 flex items-center gap-1.5 transition-all"
                >
                  <span>✨</span>
                  <span>Tạo Manh Mối AI Mới</span>
                </button>
                <button
                  onClick={() => setChronicleCluesList(PRESET_CHRONICLE_CLUES)}
                  className="px-3 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-all"
                  title="Khôi phục danh sách 8 manh mối mẫu kinh điển"
                >
                  <span>🔄</span>
                  <span>Nạp 8 Manh Mối Chuẩn</span>
                </button>
              </div>
            </div>

            {/* Triangulation Lab (Phòng Điều Tra & Xâu Chuỗi Manh Mối) */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-gray-950 border border-indigo-500/40 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧠</span>
                  <h4 className="text-sm font-black text-amber-300 uppercase tracking-wide">
                    PHÒNG ĐỐI CHIẾU & XÂU CHUỖI CHÂN TƯỚNG (CLUE TRIANGULATION LAB)
                  </h4>
                  <span className="text-[10px] text-gray-400">
                    (Chọn 2 - 5 manh mối bất kỳ ở danh sách dưới để tìm ra bí mật toàn cảnh)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedClueIdsForTriangulation(['clue_chronicle_1', 'clue_chronicle_2'])}
                    className="text-[11px] px-2.5 py-1 rounded bg-indigo-900/40 hover:bg-indigo-800/60 text-indigo-200 border border-indigo-400/30"
                  >
                    Chọn Cặp 1 & 2 (Đan Phường + Tuần Tra)
                  </button>
                  <button
                    onClick={() => setSelectedClueIdsForTriangulation(['clue_chronicle_5', 'clue_chronicle_7'])}
                    className="text-[11px] px-2.5 py-1 rounded bg-amber-900/40 hover:bg-amber-800/60 text-amber-200 border border-amber-400/30"
                  >
                    Chọn Cặp Dị Thời (300 Năm + 10 Năm)
                  </button>
                  <button
                    onClick={() => setSelectedClueIdsForTriangulation([])}
                    className="text-[11px] px-2 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-400"
                  >
                    Xóa chọn
                  </button>
                </div>
              </div>

              {/* Selected chips bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-400">Manh mối đã chọn:</span>
                {selectedClueIdsForTriangulation.length === 0 ? (
                  <span className="text-xs text-gray-500 italic">
                    Chưa chọn manh mối nào. Hãy tích chọn các hộp kiểm ở danh sách bên dưới!
                  </span>
                ) : (
                  selectedClueIdsForTriangulation.map((cid) => {
                    const clue = chronicleCluesList.find((c) => c.id === cid);
                    if (!clue) return null;
                    return (
                      <span
                        key={cid}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-900/60 text-indigo-200 text-xs border border-indigo-400/40 font-medium"
                      >
                        <span>{clue.syncMode === 'simultaneous' ? '⚡' : '⏳'}</span>
                        <strong className="text-white">{clue.characterName}</strong>
                        <span className="text-[10px] text-gray-300">({clue.locationName.split('•')[0].trim()})</span>
                        <button
                          onClick={() => handleToggleClueSelection(cid)}
                          className="hover:text-red-400 ml-1 font-bold text-xs"
                          title="Bỏ chọn"
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })
                )}
              </div>

              {/* Investigation Settings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">
                    BỐI CẢNH VỤ ÁN / BIẾN CỐ HIỆN TẠI:
                  </label>
                  <input
                    type="text"
                    value={investigationContext}
                    onChange={(e) => setInvestigationContext(e.target.value)}
                    placeholder="Ví dụ: Ngoại môn xảy ra biến cố mất cắp đan dược..."
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/90 border border-white/10 text-xs text-gray-200 focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">
                    MỤC TIÊU CỦA MAIN / BÍ ẨN CẦN PHÁ GIẢI:
                  </label>
                  <input
                    type="text"
                    value={investigationGoal}
                    onChange={(e) => setInvestigationGoal(e.target.value)}
                    placeholder="Ví dụ: Tìm ra kẻ chủ mưu hạ độc..."
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/90 border border-white/10 text-xs text-gray-200 focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-300 mb-1">
                    PHONG CÁCH XÂU CHUỖI & ĐỐN NGỘ:
                  </label>
                  <select
                    value={discoveryStyle}
                    onChange={(e) => setDiscoveryStyle(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/90 border border-white/10 text-xs text-gray-200 focus:outline-none focus:border-indigo-400"
                  >
                    <option value="deductive_reasoning">Bóc Tách Suy Luận Logic (Thám tử Tu Chân)</option>
                    <option value="sudden_enlightenment">Đốn Ngộ Chớp Nhoáng (Aha Moment Trực Giác)</option>
                    <option value="interrogation_breakthrough">Tra Vấn & Đối Chất Đột Phá</option>
                    <option value="accidental_overlap">Sự Trùng Hợp Địa Lý Hé Lộ Đại Âm Mưu</option>
                  </select>
                </div>
              </div>

              {/* Action Trigger Button */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-[11px] text-gray-400 italic">
                  * Hệ thống AI sẽ phân tích tương quan giữa các sự kiện đồng thời và dị thời để tái dựng dòng thời gian và hé lộ chân tướng.
                </span>
                <button
                  onClick={handleTriangulateClues}
                  disabled={isTriangulating || selectedClueIdsForTriangulation.length < 2}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider flex items-center gap-2 shadow-lg transition-all ${
                    selectedClueIdsForTriangulation.length >= 2 && !isTriangulating
                      ? 'bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white shadow-purple-900/50 cursor-pointer animate-pulse'
                      : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                  }`}
                >
                  {isTriangulating ? (
                    <>
                      <Spinner />
                      <span>ĐANG PHÂN TÍCH & XÂU CHUỖI DỮ KIỆN...</span>
                    </>
                  ) : (
                    <>
                      <span>⚡</span>
                      <span>XÂU CHUỖI & PHÁ VỠ CHÂN TƯỚNG ({selectedClueIdsForTriangulation.length} MẢNH GHÉP)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Triangulation Result Display */}
              {triangulationResult && (
                <div className="mt-4 p-5 rounded-2xl bg-gray-950/90 border-2 border-amber-400/40 shadow-2xl space-y-4 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold uppercase">
                        KẾT QUẢ ĐỐI CHIẾU ĐA TUYẾN
                      </span>
                      <h4 className="text-base font-black text-amber-200 mt-1">
                        {triangulationResult.investigationTitle}
                      </h4>
                    </div>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          const formattedText = `\n\n### ${triangulationResult.investigationTitle}\n**Chân tướng:** ${triangulationResult.theHiddenTruth}\n\n**Khoảnh khắc giác ngộ:** ${triangulationResult.mainCharacterDiscoveryBeat}\n\n${triangulationResult.sceneDraftPrompt}\n`;
                          onInsertText(formattedText);
                          alert('Đã chèn nội dung phân cảnh xâu chuỗi vào bản thảo!');
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow flex items-center gap-1.5"
                      >
                        <span>1-Click</span>
                        <span>Chèn Vào Bản Thảo</span>
                      </button>
                    )}
                  </div>

                  {/* Badges of involved entities */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
                      <strong className="text-indigo-300 block mb-1">👥 Nhân vật liên quan đến manh mối:</strong>
                      <div className="flex flex-wrap gap-1.5">
                        {triangulationResult.charactersInvolved.map((name, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-indigo-900/50 text-indigo-100 font-medium">
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20">
                      <strong className="text-purple-300 block mb-1">📍 Không gian địa lý trải dài:</strong>
                      <div className="flex flex-wrap gap-1.5">
                        {triangulationResult.locationsSpan.map((loc, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-purple-900/50 text-purple-100 font-medium">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Reconstruction */}
                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs space-y-1">
                    <strong className="text-cyan-300 flex items-center gap-1.5">
                      <span>⏳</span>
                      <span>Tái Dựng Dòng Thời Gian Logic (Timeline Reconstruction):</span>
                    </strong>
                    <p className="text-gray-200 leading-relaxed">
                      {triangulationResult.timelineReconstruction}
                    </p>
                  </div>

                  {/* The Hidden Truth */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/40 via-purple-950/30 to-gray-900 border border-red-500/40 text-xs space-y-1.5">
                    <strong className="text-red-300 flex items-center gap-1.5 text-sm">
                      <span>👁️</span>
                      <span>CHÂN TƯỚNG KINH HOÀNG ĐƯỢC XÂU CHUỖI TỪ CÁC MẢNH GHÉP:</span>
                    </strong>
                    <p className="text-gray-100 leading-relaxed font-medium">
                      {triangulationResult.theHiddenTruth}
                    </p>
                  </div>

                  {/* Main Discovery Beat & Story Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                      <strong className="text-amber-300 block">💡 Khoảnh Khắc Nhân Vật Chính Giác Ngộ:</strong>
                      <p className="text-amber-100/90 leading-relaxed">
                        {triangulationResult.mainCharacterDiscoveryBeat}
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                      <strong className="text-emerald-300 block">🏆 Bước Ngoặt Thay Đổi Cán Cân Cốt Truyện:</strong>
                      <p className="text-emerald-100/90 leading-relaxed">
                        {triangulationResult.storyImpactAndDramaticPayoff}
                      </p>
                    </div>
                  </div>

                  {/* Scene Draft Prompt */}
                  <div className="p-4 rounded-xl bg-gray-900 border border-purple-500/30 space-y-2">
                    <strong className="text-xs text-vip-gold uppercase flex items-center gap-1.5">
                      <span>📖</span>
                      <span>Đoạn Văn Mẫu Phân Cảnh Xâu Chuỗi (Novel Scene Draft):</span>
                    </strong>
                    <p className="text-xs text-gray-200 leading-relaxed whitespace-pre-line font-serif italic border-l-2 border-amber-400 pl-3">
                      {triangulationResult.sceneDraftPrompt}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Toolbar: Filters and Search */}
            <div className="p-4 rounded-xl bg-gray-950/80 border border-white/10 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={clueSearchQuery}
                    onChange={(e) => setClueSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên nhân vật, vật chứng, địa điểm, từ khóa..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-xs text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-400"
                  />
                  <span className="absolute left-3 top-2.5 text-xs text-gray-400">🔍</span>
                </div>

                {/* Filter Time Mode */}
                <div className="flex items-center gap-1 overflow-x-auto text-xs">
                  <span className="text-[11px] font-bold text-gray-400 shrink-0 mr-1">Thời gian:</span>
                  {[
                    { id: 'ALL', label: 'Tất cả' },
                    { id: 'simultaneous', label: '⚡ Đồng thời' },
                    { id: 'asynchronous_past', label: '⏳ Dị thời quá khứ' },
                    { id: 'asynchronous_future_planted', label: '🌱 Gieo mầm tương lai' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setClueTimeFilter(filter.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        clueTimeFilter === filter.id
                          ? 'bg-indigo-600 text-white shadow'
                          : 'bg-gray-900 text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Clue Type */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1 border-t border-white/5">
                <span className="text-[11px] font-bold text-gray-400 mr-1">Loại manh mối:</span>
                {[
                  { id: 'ALL', label: 'Tất cả loại' },
                  { id: 'physical_evidence', label: 'Vật chứng tàn tích' },
                  { id: 'intel_rumor', label: 'Lời đồn / Mật báo' },
                  { id: 'anomaly_witness', label: 'Dị tượng nhân chứng' },
                  { id: 'economic_fluctuation', label: 'Biến động thị trường' },
                  { id: 'combat_residue', label: 'Dấu vết chiến trường' },
                  { id: 'identity_leak', label: 'Sơ hở thân phận' },
                  { id: 'ancient_records', label: 'Ngọc giản cổ đại' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setClueTypeFilter(t.id)}
                    className={`px-2 py-1 rounded text-[11px] transition-all ${
                      clueTypeFilter === t.id
                        ? 'bg-purple-900 text-amber-200 border border-purple-400/40 font-bold'
                        : 'bg-gray-900/60 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clues Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
              {chronicleCluesList
                .filter((clue) => {
                  const q = clueSearchQuery.toLowerCase().trim();
                  const matchSearch =
                    !q ||
                    clue.characterName.toLowerCase().includes(q) ||
                    clue.locationName.toLowerCase().includes(q) ||
                    clue.clueArtifactOrProof.toLowerCase().includes(q) ||
                    clue.surfaceAppearance.toLowerCase().includes(q) ||
                    clue.secretTruth.toLowerCase().includes(q);
                  const matchTime = clueTimeFilter === 'ALL' || clue.syncMode === clueTimeFilter;
                  const matchType = clueTypeFilter === 'ALL' || clue.clueType === clueTypeFilter;
                  return matchSearch && matchTime && matchType;
                })
                .map((clue) => {
                  const isSelected = selectedClueIdsForTriangulation.includes(clue.id);
                  return (
                    <div
                      key={clue.id}
                      className={`p-4 rounded-2xl border transition-all space-y-3 relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-br from-indigo-950/70 via-gray-950 to-purple-950/50 border-amber-400/60 shadow-lg shadow-indigo-950/50 ring-1 ring-amber-300/40'
                          : 'bg-gray-950/70 hover:bg-gray-900/60 border-white/10 hover:border-indigo-500/30'
                      }`}
                    >
                      {/* Top ribbon: Sync Mode Badge + Checkbox */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {clue.syncMode === 'simultaneous' ? (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono font-bold flex items-center gap-1">
                              <span>⚡</span>
                              <span>ĐỒNG THỜI (SIMULTANEOUS)</span>
                            </span>
                          ) : clue.syncMode === 'asynchronous_past' ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold flex items-center gap-1">
                              <span>⏳</span>
                              <span>DỊ THỜI TIỀN SỬ (PAST EPOCH)</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono font-bold flex items-center gap-1">
                              <span>🌱</span>
                              <span>DỊ THỜI GIEO MẦM (FUTURE)</span>
                            </span>
                          )}

                          <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px] font-mono">
                            {clue.clueType}
                          </span>
                        </div>

                        {/* Select checkbox button */}
                        <button
                          onClick={() => handleToggleClueSelection(clue.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            isSelected
                              ? 'bg-amber-400 text-gray-950 shadow'
                              : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-white/10'
                          }`}
                        >
                          <span>{isSelected ? '✓' : '+'}</span>
                          <span>{isSelected ? 'Đang Đối Chiếu' : 'Chọn Xâu Chuỗi'}</span>
                        </button>
                      </div>

                      {/* Character & Spatio-Temporal Anchor */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-black text-white hover:text-amber-300 transition-colors">
                            {clue.characterName}
                          </h4>
                          {clue.characterRoleTag && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-200 border border-purple-500/30">
                              {clue.characterRoleTag}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2 text-[11px] text-gray-300">
                          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                            <span className="text-indigo-400">📍 Vị trí:</span>
                            <span className="font-semibold text-gray-200 truncate">{clue.locationName}</span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-white/5">
                            <span className="text-amber-400">⏱️ Thời điểm:</span>
                            <span className="font-semibold text-gray-200 truncate">{clue.timeAnchor}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contrast: Surface Appearance vs Secret Truth */}
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-gray-900/80 border border-white/5 space-y-0.5">
                          <span className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                            <span>🎭</span>
                            <span>Hiện tượng bề ngoài (Vỏ bọc giả tượng):</span>
                          </span>
                          <p className="text-gray-300 leading-relaxed italic">
                            "{clue.surfaceAppearance}"
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 space-y-0.5">
                          <span className="text-[10px] font-bold text-purple-300 uppercase flex items-center gap-1">
                            <span>👁️</span>
                            <span>Chân tướng ngầm (Sự thật diễn ra sau lưng):</span>
                          </span>
                          <p className="text-purple-100 leading-relaxed font-medium">
                            {clue.secretTruth}
                          </p>
                        </div>
                      </div>

                      {/* Clue Artifact & Plot Hook */}
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-0.5">
                          <span className="text-[10px] font-bold text-amber-300 uppercase flex items-center gap-1">
                            <span>🔍</span>
                            <span>Manh mối / Vật chứng cụ thể lưu lại:</span>
                          </span>
                          <p className="text-amber-100/90 leading-relaxed font-mono text-[11px]">
                            {clue.clueArtifactOrProof}
                          </p>
                        </div>

                        <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-0.5">
                          <span className="text-[10px] font-bold text-indigo-300 uppercase flex items-center gap-1">
                            <span>🔗</span>
                            <span>Móc xích cốt truyện chính (Main thu hoạch & kết nối):</span>
                          </span>
                          <p className="text-indigo-100/90 leading-relaxed">
                            {clue.linkedPlotHook}
                          </p>
                        </div>
                      </div>

                      {/* Triangulation Partners tag list */}
                      {clue.triangulationPartners && clue.triangulationPartners.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
                          <span className="text-gray-400 text-[10px]">🤝 Gợi ý đối chiếu:</span>
                          {clue.triangulationPartners.map((partner, pidx) => (
                            <span
                              key={pidx}
                              className="px-2 py-0.5 rounded bg-gray-900 text-gray-300 border border-white/5 text-[10px]"
                            >
                              {partner}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Author Writing Tip */}
                      {clue.authorWritingTip && (
                        <p className="text-[11px] text-gray-400 italic border-l-2 border-indigo-500/40 pl-2">
                          💡 <strong>Gợi ý tác giả:</strong> {clue.authorWritingTip}
                        </p>
                      )}

                      {/* Card Bottom Actions */}
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {onInsertText && (
                            <button
                              onClick={() => {
                                const snippet = `\n\n[Dữ kiện thời-không: ${clue.characterName}]\n- Địa điểm: ${clue.locationName}\n- Thời điểm: ${clue.timeAnchor}\n- Vật chứng: ${clue.clueArtifactOrProof}\n- Móc xích cốt truyện: ${clue.linkedPlotHook}\n`;
                                onInsertText(snippet);
                                alert('Đã chèn manh mối vào bản thảo!');
                              }}
                              className="px-2.5 py-1 rounded bg-indigo-900/40 hover:bg-indigo-800 text-indigo-200 text-xs font-semibold"
                            >
                              Chèn Vào Bản Thảo
                            </button>
                          )}
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${clue.characterName} (${clue.locationName} - ${clue.timeAnchor})\nVật chứng: ${clue.clueArtifactOrProof}\nChân tướng: ${clue.secretTruth}`
                              );
                              alert('Đã sao chép chi tiết manh mối!');
                            }}
                            className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs"
                          >
                            📋 Sao chép
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteClue(clue.id)}
                          className="text-gray-500 hover:text-red-400 text-xs px-2 py-1"
                          title="Xóa manh mối này"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Tạo Manh Mối Thời-Không Mới */}
            {showAddClueModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                <div className="w-full max-w-lg p-6 rounded-2xl bg-gray-950 border border-indigo-500/40 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✨</span>
                      <h4 className="text-sm font-black text-amber-300 uppercase">
                        AI THIẾT KẾ MANH MỐI THỜI-KHÔNG CHO NHÂN VẬT
                      </h4>
                    </div>
                    <button
                      onClick={() => setShowAddClueModal(false)}
                      className="text-gray-400 hover:text-white font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    Nhập thông tin nhân vật phụ hoặc chọn từ danh sách. AI sẽ tự động kiến tạo sự đối lập giữa vỏ bọc bên ngoài và chân tướng ngầm cùng vật chứng cụ thể.
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">
                        TÊN NHÂN VẬT PHỤ:
                      </label>
                      <input
                        type="text"
                        value={newClueCharName}
                        onChange={(e) => setNewClueCharName(e.target.value)}
                        placeholder="Ví dụ: Lý Tam Cửu / Tử Tố Cô Nương / Triệu Trưởng Lão"
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-gray-200 focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">
                        VAI TRÒ / THÂN PHẬN NHÂN VẬT:
                      </label>
                      <input
                        type="text"
                        value={newClueRole}
                        onChange={(e) => setNewClueRole(e.target.value)}
                        placeholder="Ví dụ: Chưởng quỹ đan phường / Mật thám / Tán tu thợ săn..."
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-gray-200 focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">
                        ĐỊA ĐIỂM HOẠT ĐỘNG / TỒN TẠI:
                      </label>
                      <input
                        type="text"
                        value={newClueLocation}
                        onChange={(e) => setNewClueLocation(e.target.value)}
                        placeholder="Ví dụ: Chợ Đen U Minh Cốc / Vạn Kiếm Nhai / Rừng rậm Vạn Thú..."
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-gray-200 focus:outline-none focus:border-indigo-400"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">
                        CHẾ ĐỘ THỜI GIAN SO VỚI MAIN:
                      </label>
                      <select
                        value={newClueSyncMode}
                        onChange={(e) => setNewClueSyncMode(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-white/10 text-gray-200 focus:outline-none focus:border-indigo-400"
                      >
                        <option value="simultaneous">⚡ Đồng thời (Xảy ra song song cùng lúc Main ở nơi khác)</option>
                        <option value="asynchronous_past">⏳ Dị thời quá khứ (Xảy ra trước đó vài ngày, vài năm, hoặc trăm năm trước)</option>
                        <option value="asynchronous_future_planted">🌱 Dị thời tương lai (Điềm báo gieo mầm đón đầu)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                    <button
                      onClick={() => setShowAddClueModal(false)}
                      className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      onClick={handleGenerateClueForChar}
                      disabled={isGeneratingClue}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg flex items-center gap-2"
                    >
                      {isGeneratingClue ? (
                        <>
                          <Spinner />
                          <span>Đang sáng tạo manh mối...</span>
                        </>
                      ) : (
                        <>
                          <span>✨</span>
                          <span>Bắt Đầu Khởi Tạo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
