import React, { useState } from 'react';
import {
  SpiritBeastItem,
  BeastTamingMethod,
  BeastEvolutionSimulation,
  BeastTamingSimulationResult,
  CharacterProfile,
  BeastBloodlineTier,
  BeastRealmTier,
  BeastContractType,
  BeastEcologyTerritory
} from '../types';
import { PRESET_SPIRIT_BEASTS, PRESET_TAMING_METHODS, PRESET_ECOLOGY_TERRITORIES } from '../data/presetSpiritBeasts';
import {
  generateSpiritBeast,
  simulateBeastEvolution,
  simulateBeastTaming
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface SpiritBeastStudioProps {
  genre?: string;
  characters?: CharacterProfile[];
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
  onInsertText?: (text: string) => void;
}

export const SpiritBeastStudio: React.FC<SpiritBeastStudioProps> = ({
  genre = 'Tiên Hiệp',
  characters = [],
  onUpdateCharacters,
  onInsertText
}) => {
  const [activeTab, setActiveTab] = useState<'beasts' | 'evolution' | 'taming' | 'ecology' | 'creator'>('beasts');

  // Beast Catalog State
  const [beasts, setBeasts] = useState<SpiritBeastItem[]>(PRESET_SPIRIT_BEASTS);
  const [selectedBloodline, setSelectedBloodline] = useState<string>('Tất cả');
  const [selectedRole, setSelectedRole] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  // Evolution Simulator State
  const [selectedBeastForEvo, setSelectedBeastForEvo] = useState<SpiritBeastItem>(PRESET_SPIRIT_BEASTS[2]);
  const [targetRealm, setTargetRealm] = useState('Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)');
  const [catalyst, setCatalyst] = useState('Hóa Hình Đan Cực Phẩm & Vạn Năm Long Huyết');
  const [evoCharacter, setEvoCharacter] = useState<string>(characters[0]?.name || 'Nhân vật chính');
  const [isEvolving, setIsEvolving] = useState(false);
  const [evoResult, setEvoResult] = useState<BeastEvolutionSimulation | null>(null);

  // Taming Ritual State
  const [selectedBeastForTame, setSelectedBeastForTame] = useState<SpiritBeastItem>(PRESET_SPIRIT_BEASTS[0]);
  const [selectedTamingMethod, setSelectedTamingMethod] = useState<BeastTamingMethod>(PRESET_TAMING_METHODS[0]);
  const [tameCharacter, setTameCharacter] = useState<string>(characters[0]?.name || 'Nhân vật chính');
  const [tameCircumstance, setTameCircumstance] = useState('Cứu linh thú khỏi cạm bẫy của thợ săn hoặc thu phục sau đại chiến');
  const [isTaming, setIsTaming] = useState(false);
  const [tameResult, setTameResult] = useState<BeastTamingSimulationResult | null>(null);

  // AI Beast Creator State
  const [createName, setCreateName] = useState('');
  const [createBloodline, setCreateBloodline] = useState<BeastBloodlineTier>(
    'Vương Huyết Yêu Thú (Hậu Duệ Thần Thú / Giao Long / Phượng Điểu)'
  );
  const [createRealm, setCreateRealm] = useState<BeastRealmTier>('Tam Giai (Ngưng Đan Kết Tinh)');
  const [createElement, setCreateElement] = useState('Lôi Đình & Hắc Ám');
  const [createRole, setCreateRole] = useState<'Tiên Phong Cận Chiến' | 'Pháp Thuật Oanh Tạc' | 'Tọa Kỵ Phi Hành' | 'Trinh Sát & Ảo Thuật' | 'Hộ Vệ & Khiên Chắn' | 'Trị Liệu & Tầm Bảo'>('Tiên Phong Cận Chiến');
  const [createIdea, setCreateIdea] = useState('Thú sủng có khả năng độ kiếp hóa hình thành mỹ thiếu nữ, tuyệt đối trung thành');
  const [createOwner, setCreateOwner] = useState(characters[0]?.name || 'Nhân vật chính');
  const [isCreating, setIsCreating] = useState(false);

  // Filtering
  const filteredBeasts = beasts.filter(b => {
    const matchBloodline = selectedBloodline === 'Tất cả' || b.bloodlineTier.includes(selectedBloodline);
    const matchRole = selectedRole === 'Tất cả' || b.combatRole === selectedRole;
    const matchSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.species.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.element.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.innateAbilities.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchBloodline && matchRole && matchSearch;
  });

  // Equip to character as Pet
  const handleAssignBeast = (beast: SpiritBeastItem, charId: string) => {
    if (!onUpdateCharacters) return;
    const char = characters.find(c => c.id === charId);
    if (!char) return;

    const updated = characters.map(c => {
      if (c.id === charId) {
        const currentCombat = c.combatPower || '';
        const note = `[Thú sủng: ${beast.name} (${beast.realmTier})]`;
        return {
          ...c,
          combatPower: currentCombat.includes(beast.name) ? currentCombat : `${currentCombat} ${note}`.trim()
        };
      }
      return c;
    });

    onUpdateCharacters(updated);
    setBeasts(beasts.map(b => (b.id === beast.id ? { ...b, assignedCharacterId: charId } : b)));
    alert(`Đã gán thú sủng "${beast.name}" cho nhân vật "${char.name}"!`);
  };

  // AI Create Beast
  const handleCreateBeast = async () => {
    setIsCreating(true);
    try {
      const newBeast = await generateSpiritBeast({
        name: createName,
        bloodlineTier: createBloodline,
        realmTier: createRealm,
        element: createElement,
        combatRole: createRole,
        customIdea: createIdea,
        characterName: createOwner,
        genre
      });
      setBeasts([newBeast, ...beasts]);
      setActiveTab('beasts');
      setSelectedBloodline('Tất cả');
    } catch (err: any) {
      alert('Lỗi tạo thú sủng: ' + (err.message || 'Thất bại'));
    } finally {
      setIsCreating(false);
    }
  };

  // Simulate Evolution
  const handleSimulateEvolution = async () => {
    setIsEvolving(true);
    try {
      const res = await simulateBeastEvolution({
        beast: selectedBeastForEvo,
        originalRealm: selectedBeastForEvo.realmTier,
        targetRealm,
        catalyst,
        characterName: evoCharacter
      });
      setEvoResult(res);

      // Add evolved variant
      const evolvedVariant: SpiritBeastItem = {
        id: 'beast_evolved_' + Date.now(),
        name: `${selectedBeastForEvo.name} (Đột Phá Hóa Hình)`,
        species: selectedBeastForEvo.species,
        bloodlineTier: selectedBeastForEvo.bloodlineTier,
        realmTier: targetRealm,
        element: selectedBeastForEvo.element,
        habitat: selectedBeastForEvo.habitat,
        appearance: `${selectedBeastForEvo.appearance}. Dáng người sau hóa hình: ${res.humanoidAppearance}`,
        innateAbilities: [
          ...selectedBeastForEvo.innateAbilities,
          ...res.newAbilitiesUnlocked.map(name => ({ name, description: 'Thần thông mới sau độ kiếp hóa hình.' }))
        ],
        combatRole: selectedBeastForEvo.combatRole,
        temperament: `${selectedBeastForEvo.temperament} (Tâm ý tương thông tuyệt đối cùng chủ nhân)`,
        contractType: selectedBeastForEvo.contractType,
        evolutionPath: 'Đã hoàn thành đại cảnh hóa hình',
        backstory: `Phiên bản tiến hóa sau khi vượt qua thiên kiếp cùng ${evoCharacter}.`
      };
      setBeasts([evolvedVariant, ...beasts]);
    } catch (err: any) {
      alert('Lỗi mô phỏng tiến hóa: ' + (err.message || 'Thất bại'));
    } finally {
      setIsEvolving(false);
    }
  };

  // Simulate Taming Ritual
  const handleSimulateTaming = async () => {
    setIsTaming(true);
    try {
      const res = await simulateBeastTaming({
        beast: selectedBeastForTame,
        tamingMethod: selectedTamingMethod,
        characterName: tameCharacter,
        customCircumstance: tameCircumstance
      });
      setTameResult(res);
    } catch (err: any) {
      alert('Lỗi thu phục linh thú: ' + (err.message || 'Thất bại'));
    } finally {
      setIsTaming(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header Banner */}
      <div className="p-4 border-b border-teal-500/20 bg-gradient-to-r from-gray-950 via-teal-950/40 to-gray-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-600 via-cyan-700 to-emerald-800 flex items-center justify-center text-xl shadow-lg shadow-teal-950/60 border border-teal-400/40">
            🐾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-wide text-teal-300">
                HỆ THỐNG LINH THÚ, YÊU THÚ & NGỰ THÚ CHÍ TÔN
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                HUYẾT MẠCH & HÓA HÌNH
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Phàm Thú ➔ Dị Chủng ➔ Vương Huyết ➔ Thuần Huyết Thần Thú ➔ Hồng Hoang Hung Thú • Khế Ước Huyết Mạch
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('creator')}
          className="px-3.5 py-1.5 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:brightness-110 rounded-xl text-xs font-black text-white shadow-lg shadow-teal-950/60 flex items-center gap-1.5 transition-all border border-teal-400/30"
        >
          <span>✨</span>
          <span>Sáng Tạo Bằng AI</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="px-4 pt-2.5 flex items-center gap-2 border-b border-white/10 bg-gray-950/90 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('beasts')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'beasts'
              ? 'border-teal-400 text-teal-300 bg-teal-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🐉</span>
          <span>Vạn Thú Phổ ({beasts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('evolution')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'evolution'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span>Độ Kiếp & Hóa Hình</span>
        </button>

        <button
          onClick={() => setActiveTab('taming')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'taming'
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>📜</span>
          <span>Ngự Thú & Huyết Khế ({PRESET_TAMING_METHODS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ecology')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'ecology'
              ? 'border-amber-400 text-amber-300 bg-amber-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🗺️</span>
          <span>Sinh Thái Yêu Vực ({PRESET_ECOLOGY_TERRITORIES.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('creator')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'creator'
              ? 'border-purple-400 text-purple-300 bg-purple-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>✨</span>
          <span>AI Khai Sáng Yêu Thú</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: VẠN THÚ PHỔ (CATALOG) */}
        {/* ========================================================= */}
        {activeTab === 'beasts' && (
          <div className="space-y-4">
            {/* Filter Ribbons */}
            <div className="space-y-2 bg-gray-900/60 p-3 rounded-2xl border border-white/5">
              {/* Bloodline Tier Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 shrink-0">Huyết Mạch:</span>
                {[
                  'Tất cả',
                  'Phàm Thú',
                  'Linh Thú Thường',
                  'Biến Dị',
                  'Vương Huyết',
                  'Thuần Huyết Thần Thú',
                  'Hồng Hoang Hung Thú'
                ].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setSelectedBloodline(tier)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                      selectedBloodline === tier
                        ? 'bg-teal-600 text-white shadow'
                        : 'bg-gray-800/80 text-gray-400 hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              {/* Combat Role & Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
                  <span className="text-[10px] uppercase font-bold text-gray-400 shrink-0">Chiến Đấu:</span>
                  {[
                    'Tất cả',
                    'Tiên Phong Cận Chiến',
                    'Pháp Thuật Oanh Tạc',
                    'Tọa Kỵ Phi Hành',
                    'Trinh Sát & Ảo Thuật',
                    'Hộ Vệ & Khiên Chắn'
                  ].map(role => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all ${
                        selectedRole === role
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-gray-800/60 text-gray-400 hover:text-white'
                      }`}
                    >
                      {role.split('&')[0].trim()}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Tìm linh thú, chủng loài, nguyên tố, kỹ năng..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-gray-950 border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 w-full sm:w-60"
                />
              </div>
            </div>

            {/* Beast Cards List */}
            <div className="space-y-4">
              {filteredBeasts.map(beast => {
                const assignedChar = characters.find(c => c.id === beast.assignedCharacterId);

                return (
                  <div
                    key={beast.id}
                    className="p-5 rounded-2xl bg-gray-950 border border-teal-500/25 space-y-4 shadow-xl hover:border-teal-500/50 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-teal-400 font-bold px-2 py-0.5 rounded-md bg-teal-950/80 border border-teal-500/30">
                            {beast.realmTier}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30">
                            {beast.bloodlineTier.split('(')[0].trim()}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-950/80 text-amber-300 border border-amber-500/30">
                            🎯 {beast.combatRole}
                          </span>
                          {assignedChar && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-950/80 text-purple-300 border border-purple-500/30">
                              👤 {assignedChar.name}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-black text-amber-300 mt-1.5 flex items-center gap-2">
                          <span>🐾</span>
                          <span>{beast.name}</span>
                          <span className="text-xs text-gray-400 font-medium">({beast.species})</span>
                        </h3>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Assign dropdown */}
                        {characters.length > 0 && onUpdateCharacters && (
                          <select
                            onChange={e => {
                              if (e.target.value) handleAssignBeast(beast, e.target.value);
                            }}
                            defaultValue=""
                            className="bg-gray-900 border border-gray-700 rounded-xl px-2.5 py-1 text-xs text-teal-300 font-bold focus:outline-none"
                          >
                            <option value="" disabled>
                              Gán cho chủ nhân...
                            </option>
                            {characters.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Evolve button */}
                        <button
                          onClick={() => {
                            setSelectedBeastForEvo(beast);
                            setActiveTab('evolution');
                          }}
                          className="px-3 py-1 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <span>⚡</span>
                          <span>Tiến Hóa</span>
                        </button>

                        {/* Tame button */}
                        <button
                          onClick={() => {
                            setSelectedBeastForTame(beast);
                            setActiveTab('taming');
                          }}
                          className="px-3 py-1 bg-cyan-950/80 hover:bg-cyan-900 text-cyan-200 border border-cyan-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <span>📜</span>
                          <span>Khế Ước</span>
                        </button>

                        {/* Insert Text */}
                        {onInsertText && (
                          <button
                            onClick={() => {
                              const skills = beast.innateAbilities.map(a => `${a.name}: ${a.description}`).join('; ');
                              const fullText = `[VẠN THÚ PHỔ: ${beast.name} - ${beast.realmTier}]\n- Huyết Mạch: ${beast.bloodlineTier}\n- Nguyên Tố: ${beast.element}\n- Ngoại Hình: ${beast.appearance}\n- Kỹ Năng Thiên Phú: ${skills}\n- Vai Trò Chiến Đấu: ${beast.combatRole}\n- Tập Tính & Khế Ước: ${beast.temperament} (${beast.contractType || 'Huyết Khế'})\n- Lộ Trình Tiến Hóa: ${beast.evolutionPath}\n- Lai Lịch: ${beast.backstory}`;
                              onInsertText(fullText);
                              alert(`Đã chèn thú sủng "${beast.name}" vào chương truyện!`);
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-teal-600 to-emerald-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
                          >
                            <span>✍️</span>
                            <span>Chèn Vào Truyện</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                        <span className="text-teal-300 font-bold flex items-center gap-1">
                          <span>👁️</span>
                          <span>Ngoại Hình & Khí Thế Uy Áp:</span>
                        </span>
                        <p className="text-gray-200 leading-relaxed">{beast.appearance}</p>
                      </div>

                      <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                        <span className="text-cyan-300 font-bold flex items-center gap-1">
                          <span>⚡</span>
                          <span>Thuộc Tính & Môi Trường Sống:</span>
                        </span>
                        <p className="text-gray-200">{beast.element}</p>
                        <p className="text-[11px] text-gray-400 italic">Môi trường: {beast.habitat}</p>
                      </div>

                      {/* Innate Abilities */}
                      <div className="p-3 bg-purple-950/20 rounded-xl border border-purple-500/20 space-y-1 md:col-span-2">
                        <span className="text-purple-300 font-bold flex items-center gap-1">
                          <span>🔥</span>
                          <span>Kỹ Năng Thiên Phú Độc Môn (Innate Abilities):</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {beast.innateAbilities.map((ab, idx) => (
                            <div key={idx} className="p-2 bg-gray-950/70 rounded-lg border border-white/5">
                              <span className="font-bold text-amber-300 block">{ab.name}</span>
                              <span className="text-gray-300 text-[11px]">{ab.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-500/20 space-y-1 md:col-span-2">
                        <span className="text-amber-300 font-bold flex items-center gap-1">
                          <span>📈</span>
                          <span>Lộ Trình Tiến Hóa & Hóa Hình:</span>
                        </span>
                        <p className="text-gray-200">{beast.evolutionPath}</p>
                      </div>

                      <div className="p-3 bg-gray-900/40 rounded-xl border border-white/5 space-y-1 md:col-span-2 text-[11px] text-gray-400">
                        <strong className="text-gray-300">Lai Lịch & Gặp Gỡ: </strong>
                        <span>{beast.backstory}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ĐỘ KIẾP & HÓA HÌNH (EVOLUTION) */}
        {/* ========================================================= */}
        {activeTab === 'evolution' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950 border border-emerald-500/30 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="text-sm font-black text-emerald-300 uppercase tracking-wider">
                      MÔ PHỎNG LINH THÚ ĐỘ KIẾP & HÓA HÌNH
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Vượt lôi kiếp ➔ Tái cấu trúc cốt cách ➔ Dung mạo hóa hình nửa người hoặc yêu tiên tuyệt mỹ ➔ Mở khóa thần thông yêu vương
                    </p>
                  </div>
                </div>
              </div>

              {/* Evolution Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Linh Thú Độ Kiếp:</label>
                  <select
                    value={selectedBeastForEvo.id}
                    onChange={e => {
                      const found = beasts.find(b => b.id === e.target.value);
                      if (found) setSelectedBeastForEvo(found);
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  >
                    {beasts.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.realmTier})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Chủ Nhân Hộ Pháp:</label>
                  <input
                    type="text"
                    value={evoCharacter}
                    onChange={e => setEvoCharacter(e.target.value)}
                    placeholder="VD: Nhân vật chính"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Cảnh Giới Mục Tiêu:</label>
                  <select
                    value={targetRealm}
                    onChange={e => setTargetRealm(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  >
                    <option value="Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)">Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)</option>
                    <option value="Ngũ Giai (Yêu Vương Hoàn Toàn Hóa Người - Hóa Thần)">Ngũ Giai (Yêu Vương Hoàn Toàn Hóa Người - Hóa Thần)</option>
                    <option value="Lục Giai / Thất Giai (Yêu Hoàng Thống Lĩnh - Luyện Hư / Hợp Thể)">Lục Giai / Thất Giai (Yêu Hoàng Thống Lĩnh)</option>
                    <option value="Bát Giai / Cửu Giai (Yêu Đế / Yêu Thần Cực Đạo - Đại Thừa / Độ Kiếp)">Bát Giai / Cửu Giai (Yêu Đế Cực Đạo)</option>
                    <option value="Chân Linh Thái Cổ / Thần Thú Khai Thiên">Chân Linh Thái Cổ / Thần Thú Khai Thiên</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Xúc Tác Đột Phá (Đan Dược / Dị Bảo / Long Huyết):</label>
                  <input
                    type="text"
                    value={catalyst}
                    onChange={e => setCatalyst(e.target.value)}
                    placeholder="VD: Hóa Hình Đan Cực Phẩm, Giọt Máu Tổ Long"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSimulateEvolution}
                  disabled={isEvolving}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl shadow-teal-950/60 flex items-center gap-2 transition-all"
                >
                  {isEvolving ? <Spinner /> : <span>⚡</span>}
                  <span>{isEvolving ? 'ĐANG ĐỘ KIẾP HÓA HÌNH...' : 'BẮT ĐẦU ĐẠI CẢNH HÓA HÌNH'}</span>
                </button>
              </div>
            </div>

            {/* Evolution Result Card */}
            {evoResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-emerald-500/40 space-y-5 shadow-2xl animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      Hóa Hình Thành Công
                    </span>
                    <h3 className="text-lg font-black text-amber-300 mt-1 flex items-center gap-2">
                      <span>✨</span>
                      <span>{evoResult.beastName}</span>
                      <span className="text-xs text-teal-400 font-bold">➔ {evoResult.targetRealm}</span>
                    </h3>
                  </div>

                  {onInsertText && (
                    <button
                      onClick={() => {
                        const fullText = `[ĐẠI CẢNH TIẾN HÓA HÓA HÌNH: ${evoResult.beastName}]\n- Cảnh Giới Mới: ${evoResult.targetRealm}\n- Dung Mạo Hóa Hình: ${evoResult.humanoidAppearance || ''}\n- Kỹ Năng Mới: ${evoResult.newAbilitiesUnlocked?.join(', ')}\n\n${evoResult.evolutionNarrative}`;
                        onInsertText(fullText);
                        alert('Đã chèn đại cảnh tiến hóa hóa hình vào chương truyện!');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-1.5"
                    >
                      <span>✍️</span>
                      <span>Chèn Vào Chương Truyện</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-900/60 p-4 rounded-xl border border-white/5">
                  <div>
                    <strong className="text-amber-300 block mb-0.5">Dung Mạo Sau Hóa Hình:</strong>
                    <span className="text-gray-200">{evoResult.humanoidAppearance}</span>
                  </div>
                  <div>
                    <strong className="text-teal-300 block mb-0.5">Thần Thông Mới Thức Tỉnh:</strong>
                    <span className="text-gray-200">{evoResult.newAbilitiesUnlocked?.join(', ')}</span>
                  </div>
                  <div className="md:col-span-2">
                    <strong className="text-purple-300 block mb-0.5">Sự Biến Đổi Chiến Lực:</strong>
                    <span className="text-gray-300">{evoResult.powerSurgeDescription}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <span>📖</span>
                    <span>Phân Cảnh Độ Kiếp Hóa Hình Văn Phong Đại Thần:</span>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-200 text-xs md:text-sm leading-relaxed font-serif whitespace-pre-line bg-gray-900/90 p-5 rounded-2xl border border-emerald-500/20 shadow-inner">
                    {evoResult.evolutionNarrative}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: NGỰ THÚ & HUYẾT KHẾ (TAMING RITUAL) */}
        {/* ========================================================= */}
        {activeTab === 'taming' && (
          <div className="space-y-6">
            {/* Taming Simulator Setup */}
            <div className="p-6 rounded-2xl bg-gray-950 border border-cyan-500/30 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📜</span>
                  <div>
                    <h3 className="text-sm font-black text-cyan-300 uppercase tracking-wider">
                      MÔ PHỎNG THU PHỤC & KÝ KẾT KHẾ ƯỚC HUYẾT MẠCH
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Bình Đẳng Huyết Khế • Chủ Nô Linh Khế • Cộng Sinh Huyết Mạch • Tâm Ý Tương Thông
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Linh Thú Cần Thu Phục:</label>
                  <select
                    value={selectedBeastForTame.id}
                    onChange={e => {
                      const found = beasts.find(b => b.id === e.target.value);
                      if (found) setSelectedBeastForTame(found);
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  >
                    {beasts.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.realmTier})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Phương Pháp Ký Kết Khế Ước:</label>
                  <select
                    value={selectedTamingMethod.id}
                    onChange={e => {
                      const found = PRESET_TAMING_METHODS.find(m => m.id === e.target.value);
                      if (found) setSelectedTamingMethod(found);
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  >
                    {PRESET_TAMING_METHODS.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Nhân Vật Thu Phục:</label>
                  <input
                    type="text"
                    value={tameCharacter}
                    onChange={e => setTameCharacter(e.target.value)}
                    placeholder="VD: Nhân vật chính"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Tình Huống Bối Cảnh Thu Phục:</label>
                  <input
                    type="text"
                    value={tameCircumstance}
                    onChange={e => setTameCircumstance(e.target.value)}
                    placeholder="VD: Cứu linh thú khỏi cạm bẫy hoặc giao chiến đốn ngộ"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSimulateTaming}
                  disabled={isTaming}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl shadow-cyan-950/60 flex items-center gap-2 transition-all"
                >
                  {isTaming ? <Spinner /> : <span>📜</span>}
                  <span>{isTaming ? 'ĐANG KÝ KẾT KHẾ ƯỚC...' : 'TIẾN HÀNH NGHI THỨC KHẾ ƯỚC'}</span>
                </button>
              </div>
            </div>

            {/* Taming Result */}
            {tameResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-cyan-500/40 space-y-5 shadow-2xl animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      Khế Ước Thành Công
                    </span>
                    <h3 className="text-lg font-black text-amber-300 mt-1 flex items-center gap-2">
                      <span>✨</span>
                      <span>{tameResult.beastName}</span>
                      <span className="text-xs text-cyan-400 font-bold">({tameResult.bondStrength})</span>
                    </h3>
                  </div>

                  {onInsertText && (
                    <button
                      onClick={() => {
                        const fullText = `[PHÂN CẢNH KHẾ ƯỚC LINH THÚ: ${tameResult.beastName}]\n- Loại Khế Ước: ${tameResult.contractFormed}\n- Khoảnh Khắc Khắc Ấn: ${tameResult.contractSealingMoment}\n\n${tameResult.battleStorySegment}`;
                        onInsertText(fullText);
                        alert('Đã chèn phân cảnh khế ước linh thú vào chương truyện!');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-1.5"
                    >
                      <span>✍️</span>
                      <span>Chèn Vào Chương Truyện</span>
                    </button>
                  )}
                </div>

                <div className="prose prose-invert max-w-none text-gray-200 text-xs md:text-sm leading-relaxed font-serif whitespace-pre-line bg-gray-900/90 p-5 rounded-2xl border border-cyan-500/20 shadow-inner">
                  {tameResult.battleStorySegment}
                </div>
              </div>
            )}

            {/* Methods Reference List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                CẨM NANG CÁC PHƯƠNG PHÁP NGỰ THÚ CỔ TRUYỀN:
              </h4>
              {PRESET_TAMING_METHODS.map(m => (
                <div key={m.id} className="p-4 bg-gray-950 border border-white/10 rounded-2xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-300 text-sm">{m.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">{m.contractType}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{m.description}</p>
                  <div className="pt-2 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <strong className="text-emerald-400">Ưu điểm:</strong> {m.prosAndCons.pros}
                    </div>
                    <div>
                      <strong className="text-rose-400">Nguy cơ phản phệ:</strong> {m.prosAndCons.backfireDanger}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SINH THÁI YÊU VỰC & ĐỊA BÀN CẤM ĐỊA */}
        {/* ========================================================= */}
        {activeTab === 'ecology' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-950 border border-amber-500/20 rounded-2xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide flex items-center gap-2">
                  <span>🗺️</span>
                  <span>CẨM NANG SINH THÁI YÊU VỰC & ĐỊA BÀN CẤM ĐỊA</span>
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Địa bàn phân bố các loài yêu thú, tài nguyên kỳ trân dị bảo và cấm chế nguy hiểm sinh tử
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {PRESET_ECOLOGY_TERRITORIES.map(terr => {
                const dangerColor =
                  terr.dangerLevel === 'Tuyệt Cấm Chi Vực'
                    ? 'text-red-400 bg-red-950/80 border-red-500/40'
                    : terr.dangerLevel === 'Tử Địa'
                    ? 'text-purple-400 bg-purple-950/80 border-purple-500/40'
                    : 'text-amber-400 bg-amber-950/80 border-amber-500/40';

                return (
                  <div
                    key={terr.id}
                    className="p-5 rounded-2xl bg-gray-950 border border-amber-500/25 space-y-3 shadow-xl hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${dangerColor}`}>
                          {terr.dangerLevel}
                        </span>
                        <h4 className="text-base font-black text-amber-300 flex items-center gap-1.5">
                          <span>🏞️</span>
                          <span>{terr.name}</span>
                        </h4>
                      </div>

                      {onInsertText && (
                        <button
                          onClick={() => {
                            const fullText = `[ĐỊA BÀN YÊU VỰC: ${terr.name} (${terr.dangerLevel})]\n- Loài Thống Trị: ${terr.dominantSpecies}\n- Địa Hình & Khí Hậu: ${terr.landscapeDescription}\n- Tài Nguyên Kỳ Trân: ${terr.naturalResources}\n- Bí Mật & Hiểm Nguy: ${terr.legendOrMystery}`;
                            onInsertText(fullText);
                            alert(`Đã chèn khu vực "${terr.name}" vào chương truyện!`);
                          }}
                          className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <span>✍️</span>
                          <span>Chèn Khu Vực Vào Truyện</span>
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-200 leading-relaxed">{terr.landscapeDescription}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-900/60 p-3 rounded-xl border border-white/5">
                      <div>
                        <strong className="text-teal-300 block mb-0.5">Yêu Thú Thống Trị:</strong>
                        <span className="text-gray-300">{terr.dominantSpecies}</span>
                      </div>
                      <div>
                        <strong className="text-emerald-300 block mb-0.5">Tài Nguyên Kỳ Trân Dị Bảo:</strong>
                        <span className="text-gray-300">{terr.naturalResources}</span>
                      </div>
                      <div className="md:col-span-2 pt-1 border-t border-white/5">
                        <strong className="text-rose-300 block mb-0.5">Hiểm Họa Cấm Chế & Truyền Thuyết:</strong>
                        <span className="text-gray-300">{terr.legendOrMystery}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AI CREATOR */}
        {/* ========================================================= */}
        {activeTab === 'creator' && (
          <div className="p-6 rounded-2xl bg-gray-950 border border-purple-500/30 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="text-sm font-black text-purple-300 uppercase tracking-wider">
                    AI SÁNG TẠO LINH THÚ, YÊU THÚ & THẦN THÚ
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Phối hợp tự do: Huyết Mạch + Cảnh Giới + Nguyên Tố + Kỹ Năng Thiên Phú ➔ AI sinh ra linh thú độc bản
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-bold">Tên Gợi Ý (Hoặc để trống AI tự đặt):</label>
                <input
                  type="text"
                  value={createName}
                  onChange={e => setCreateName(e.target.value)}
                  placeholder="VD: Cửu U Lôi Đế Hổ, Thất Thải Huyễn Phượng..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Phẩm Cấp Huyết Mạch (6 Cấp):</label>
                <select
                  value={createBloodline}
                  onChange={e => setCreateBloodline(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                >
                  <option value="Phàm Thú / Dã Thú (Chưa Khai Trí)">1. Phàm Thú / Dã Thú (Chưa Khai Trí)</option>
                  <option value="Linh Thú / Yêu Thú Thường (Hạ - Trung - Thượng Phẩm)">2. Linh Thú / Yêu Thú Thường</option>
                  <option value="Biến Dị Yêu Thú / Dị Chủng Thượng Cổ">3. Biến Dị Yêu Thú / Dị Chủng Thượng Cổ</option>
                  <option value="Vương Huyết Yêu Thú (Hậu Duệ Thần Thú / Giao Long / Phượng Điểu)">4. Vương Huyết Yêu Thú (Hậu Duệ Thần Thú)</option>
                  <option value="Thuần Huyết Thần Thú (Tứ Linh: Long - Hổ - Tước - Vũ / Côn Bằng / Kỳ Lân)">5. Thuần Huyết Thần Thú (Tứ Linh / Côn Bằng)</option>
                  <option value="Hồng Hoang Hung Thú / Hỗn Độn Ma Thú (Thao Thiết / Cùng Kỳ / Hỗn Độn)">6. Hồng Hoang Hung Thú (Thao Thiết / Cùng Kỳ)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Cảnh Giới Tu Vi Yêu Thú:</label>
                <select
                  value={createRealm}
                  onChange={e => setCreateRealm(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                >
                  <option value="Nhất Giai (Sơ Khai Luyện Khí)">Nhất Giai (Luyện Khí)</option>
                  <option value="Nhị Giai (Thông Linh Trúc Cơ)">Nhị Giai (Trúc Cơ)</option>
                  <option value="Tam Giai (Ngưng Đan Kết Tinh)">Tam Giai (Kết Đan)</option>
                  <option value="Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)">Tứ Giai (Hóa Hình Nửa Người - Nguyên Anh)</option>
                  <option value="Ngũ Giai (Yêu Vương Hoàn Toàn Hóa Người - Hóa Thần)">Ngũ Giai (Yêu Vương Hóa Người - Hóa Thần)</option>
                  <option value="Lục Giai / Thất Giai (Yêu Hoàng Thống Lĩnh - Luyện Hư / Hợp Thể)">Lục Giai / Thất Giai (Yêu Hoàng)</option>
                  <option value="Bát Giai / Cửu Giai (Yêu Đế / Yêu Thần Cực Đạo - Đại Thừa / Độ Kiếp)">Bát Giai / Cửu Giai (Yêu Đế Cực Đạo)</option>
                  <option value="Chân Linh Thái Cổ / Thần Thú Khai Thiên">Chân Linh Thái Cổ / Thần Thú Khai Thiên</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Vai Trò Chiến Đấu:</label>
                <select
                  value={createRole}
                  onChange={e => setCreateRole(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                >
                  <option value="Tiên Phong Cận Chiến">Tiên Phong Cận Chiến</option>
                  <option value="Pháp Thuật Oanh Tạc">Pháp Thuật Oanh Tạc</option>
                  <option value="Tọa Kỵ Phi Hành">Tọa Kỵ Phi Hành</option>
                  <option value="Trinh Sát & Ảo Thuật">Trinh Sát & Ảo Thuật</option>
                  <option value="Hộ Vệ & Khiên Chắn">Hộ Vệ & Khiên Chắn</option>
                  <option value="Trị Liệu & Tầm Bảo">Trị Liệu & Tầm Bảo</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Thuộc Tính Nguyên Tố:</label>
                <input
                  type="text"
                  value={createElement}
                  onChange={e => setCreateElement(e.target.value)}
                  placeholder="VD: Lôi Đình & Hắc Ám, Cực Âm Băng Sương..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Chủ Nhân Đồng Hành:</label>
                <input
                  type="text"
                  value={createOwner}
                  onChange={e => setCreateOwner(e.target.value)}
                  placeholder="VD: Nhân vật chính"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 font-bold">Ý Tưởng Đặc Thù & Kỹ Năng Mong Muốn:</label>
                <textarea
                  value={createIdea}
                  onChange={e => setCreateIdea(e.target.value)}
                  rows={2}
                  placeholder="VD: Thú sủng có khả năng ngửi thấy bảo vật ngàn dặm, khi nguy cấp có thể nuốt chửng không gian..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCreateBeast}
                disabled={isCreating}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl flex items-center gap-2"
              >
                {isCreating ? <Spinner /> : <span>✨</span>}
                <span>{isCreating ? 'ĐANG SÁNG TẠO YÊU THÚ...' : 'KIẾN TẠO THÚ SỦNG MỚI'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
