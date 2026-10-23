import React, { useState } from 'react';
import {
  WeaponTierItem,
  ForgingMethod,
  ForgingSimulation,
  CharacterProfile,
  WeaponEvolutionResult,
  WeaponRank,
  WeaponCategory
} from '../types';
import { PRESET_WEAPON_TIERS, PRESET_FORGING_METHODS } from '../data/presetWeapons';
import {
  generateWeaponTier,
  evolveWeapon,
  simulateWeaponForging
} from '../services/geminiService';
import { Spinner } from './Spinner';

interface WeaponArsenalStudioProps {
  genre?: string;
  characters?: CharacterProfile[];
  onUpdateCharacters?: (chars: CharacterProfile[]) => void;
  onInsertText?: (text: string) => void;
}

export const WeaponArsenalStudio: React.FC<WeaponArsenalStudioProps> = ({
  genre = 'Tiên Hiệp',
  characters = [],
  onUpdateCharacters,
  onInsertText
}) => {
  const [activeTab, setActiveTab] = useState<'weapons' | 'evolution' | 'methods' | 'simulate' | 'creator'>('weapons');

  // Weapon list state
  const [weapons, setWeapons] = useState<WeaponTierItem[]>(PRESET_WEAPON_TIERS);
  const [selectedRank, setSelectedRank] = useState<string>('Tất cả');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  // Weapon Evolution State
  const [selectedWeaponForEvolution, setSelectedWeaponForEvolution] = useState<WeaponTierItem>(PRESET_WEAPON_TIERS[1]);
  const [catalystMaterial, setCatalystMaterial] = useState('Vạn Niên Canh Kim Thần Sa & Cửu Trọng Lôi Kiếp');
  const [catalystType, setCatalystType] = useState('Tôi Luyện Lôi Kiếp & Dung Hợp Thần Thạch');
  const [evolutionCharacter, setEvolutionCharacter] = useState<string>(characters[0]?.name || 'Nhân vật chính');
  const [isEvolving, setIsEvolving] = useState(false);
  const [evolutionResult, setEvolutionResult] = useState<(WeaponEvolutionResult & { proseNarrative?: string }) | null>(null);

  // AI Weapon Creator State
  const [createName, setCreateName] = useState('');
  const [createCategory, setCreateCategory] = useState<WeaponCategory>('Kiếm (Phi Kiếm / Trọng Kiếm)');
  const [createRank, setCreateRank] = useState<WeaponRank>('Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)');
  const [createIdea, setCreateIdea] = useState('Kiếm uẩn dưỡng lôi đình, tự động bảo vệ chủ nhân, có kiếm linh hình hài thiếu nữ áo tím');
  const [createOwner, setCreateOwner] = useState(characters[0]?.name || 'Nhân vật chính');
  const [isCreatingWeapon, setIsCreatingWeapon] = useState(false);

  // Simulation Form State
  const [simWeaponName, setSimWeaponName] = useState(PRESET_WEAPON_TIERS[0].name);
  const [simTargetRank, setSimTargetRank] = useState('Đạo Khí');
  const [simMethodName, setSimMethodName] = useState(PRESET_FORGING_METHODS[0].name);
  const [simMaterials, setSimMaterials] = useState('Thái Ất Canh Kim, Chân Long Cốt, Huyền Hoàng Tinh Sa');
  const [simFurnace, setSimFurnace] = useState('Đài Dẫn Lôi & Hỗn Độn Lò');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<ForgingSimulation | null>(null);

  // Filtered Weapons
  const filteredWeapons = weapons.filter(w => {
    const matchRank = selectedRank === 'Tất cả' || w.rank.includes(selectedRank);
    const matchCat = selectedCategory === 'Tất cả' || w.category === selectedCategory;
    const matchSearch =
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.spiritSoul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.ultimateTechnique.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRank && matchCat && matchSearch;
  });

  // Handle Equip to Character
  const handleEquipWeapon = (weapon: WeaponTierItem, charId: string) => {
    if (!onUpdateCharacters) return;
    const char = characters.find(c => c.id === charId);
    if (!char) return;

    const updated = characters.map(c => {
      if (c.id === charId) {
        const currentCombat = c.combatPower || '';
        const note = `[Trang bị: ${weapon.name} (${weapon.rank})]`;
        return {
          ...c,
          combatPower: currentCombat.includes(weapon.name) ? currentCombat : `${currentCombat} ${note}`.trim()
        };
      }
      return c;
    });

    onUpdateCharacters(updated);
    // Mark weapon as equipped
    setWeapons(weapons.map(w => w.id === weapon.id ? { ...w, assignedCharacterId: charId } : w));
    alert(`Đã trang bị "${weapon.name}" cho nhân vật "${char.name}"!`);
  };

  // Handle AI Create Weapon
  const handleCreateWeapon = async () => {
    setIsCreatingWeapon(true);
    try {
      const newW = await generateWeaponTier({
        name: createName,
        category: createCategory,
        rank: createRank,
        customIdea: createIdea,
        characterName: createOwner,
        genre
      });
      setWeapons([newW, ...weapons]);
      setActiveTab('weapons');
      setSelectedRank('Tất cả');
      setSelectedCategory('Tất cả');
    } catch (err: any) {
      alert('Lỗi kiến tạo thần binh: ' + (err.message || 'Thất bại'));
    } finally {
      setIsCreatingWeapon(false);
    }
  };

  // Handle Evolve Weapon
  const handleEvolve = async () => {
    setIsEvolving(true);
    try {
      const res = await evolveWeapon({
        weapon: selectedWeaponForEvolution,
        catalystMaterial,
        catalystType,
        characterName: evolutionCharacter
      });
      setEvolutionResult(res);

      // Add evolved weapon to list
      const evolvedItem: WeaponTierItem = {
        id: 'weapon_evolved_' + Date.now(),
        name: res.evolvedName,
        category: selectedWeaponForEvolution.category,
        rank: res.evolvedRank,
        materials: selectedWeaponForEvolution.materials + ' + ' + res.catalystMaterial,
        spiritSoul: res.spiritAwakening,
        inscribedArrays: selectedWeaponForEvolution.inscribedArrays + ' + Phù Văn Lột Xác',
        combatPowerEffect: res.newAbilities,
        evolutionPath: 'Đã hoàn thành đại cảnh tiến hóa',
        ultimateTechnique: res.newAbilities.split('.')[0] || 'Vô Thượng Thần Thông',
        backstory: `Thần binh tiến hóa từ ${selectedWeaponForEvolution.name} sau khi dung hợp ${catalystMaterial}.`
      };
      setWeapons([evolvedItem, ...weapons]);
    } catch (err: any) {
      alert('Lỗi thăng phẩm binh khí: ' + (err.message || 'Thất bại'));
    } finally {
      setIsEvolving(false);
    }
  };

  // Handle Simulation
  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await simulateWeaponForging({
        weaponName: simWeaponName,
        targetRank: simTargetRank,
        methodUsed: simMethodName,
        materialsList: simMaterials.split(',').map(s => s.trim()),
        flameOrFurnace: simFurnace,
        genre
      });
      setSimulationResult(res);
    } catch (err: any) {
      alert('Lỗi rèn đúc thần binh: ' + (err.message || 'Thất bại'));
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header Banner */}
      <div className="p-4 border-b border-orange-500/20 bg-gradient-to-r from-gray-950 via-orange-950/40 to-gray-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 via-amber-700 to-red-800 flex items-center justify-center text-xl shadow-lg shadow-orange-950/60 border border-orange-400/40">
            ⚔️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-wide text-orange-300">THẦN BINH CÁC & LUYỆN KHÍ BẢN MỆNH</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">
                7 PHẨM CẤP TIÊU CHUẨN
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Phàm Binh ➔ Linh Khí ➔ Bảo Khí ➔ Thông Thiên Linh Bảo ➔ Đạo Khí ➔ Cực Đạo Đế Binh ➔ Hỗn Độn Chí Bảo
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setActiveTab('creator')}
          className="px-3.5 py-1.5 bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 hover:brightness-110 rounded-xl text-xs font-black text-white shadow-lg shadow-orange-950/60 flex items-center gap-1.5 transition-all border border-orange-400/30"
        >
          <span>✨</span>
          <span>Đại Thần Đình AI</span>
        </button>
      </div>

      {/* Ribbon Navigation */}
      <div className="px-4 pt-2.5 flex items-center gap-2 border-b border-white/10 bg-gray-950/90 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('weapons')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'weapons'
              ? 'border-orange-400 text-orange-300 bg-orange-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🗡️</span>
          <span>Binh Khí Phổ ({weapons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('evolution')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'evolution'
              ? 'border-red-400 text-red-300 bg-red-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span>Thăng Phẩm & Tiến Hóa</span>
        </button>

        <button
          onClick={() => setActiveTab('creator')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'creator'
              ? 'border-amber-400 text-amber-300 bg-amber-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>⚒️</span>
          <span>Đại Thần Đình (AI Đúc Binh)</span>
        </button>

        <button
          onClick={() => setActiveTab('methods')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'methods'
              ? 'border-yellow-400 text-yellow-300 bg-yellow-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>📜</span>
          <span>Thuật Rèn Đúc ({PRESET_FORGING_METHODS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('simulate')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'simulate'
              ? 'border-purple-400 text-purple-300 bg-purple-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>💥</span>
          <span>Đúc Kiếm Thực Chiến</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: WEAPONS ARSENAL */}
        {/* ========================================================= */}
        {activeTab === 'weapons' && (
          <div className="space-y-4">
            {/* Filter Ribbons */}
            <div className="space-y-2 bg-gray-900/60 p-3 rounded-2xl border border-white/5">
              {/* Rank Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
                <span className="text-[10px] uppercase font-bold text-gray-400 shrink-0">Phẩm Cấp:</span>
                {[
                  'Tất cả',
                  'Phàm Binh',
                  'Linh Khí',
                  'Bảo Khí',
                  'Thông Thiên Linh Bảo',
                  'Đạo Khí',
                  'Cực Đạo Đế Binh',
                  'Hồng Hoang'
                ].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRank(r)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                      selectedRank === r
                        ? 'bg-orange-600 text-white shadow'
                        : 'bg-gray-800/80 text-gray-400 hover:text-white'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Category Filter & Search */}
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between pt-1 border-t border-white/5">
                <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
                  <span className="text-[10px] uppercase font-bold text-gray-400 shrink-0">Khí Giới:</span>
                  {[
                    'Tất cả',
                    'Kiếm (Phi Kiếm / Trọng Kiếm)',
                    'Đao (Bá Đao / Trảm Ma Đao)',
                    'Thương / Kích / Mâu (Trường Thương)',
                    'Cung / Tiễn / Nỏ',
                    'Quyền Thao / Chiến Giáp / Hộ Thể',
                    'Trọng Binh (Chùy / Phủ / Côn Bổng)',
                    'Kỳ Môn / Pháp Bảo (Chuông / Gương / Tháp / Quạt / Cầm)',
                    'Ám Khí & Châm Bí Thuật'
                  ].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? 'bg-amber-600 text-white shadow'
                          : 'bg-gray-800/60 text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat.split('(')[0].trim()}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Tìm kiếm thần binh, vật liệu, tuyệt kỹ..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-gray-950 border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-full sm:w-60"
                />
              </div>
            </div>

            {/* Weapon Cards Grid */}
            <div className="space-y-4">
              {filteredWeapons.map(weapon => {
                const assignedChar = characters.find(c => c.id === weapon.assignedCharacterId);

                return (
                  <div
                    key={weapon.id}
                    className="p-5 rounded-2xl bg-gray-950 border border-orange-500/25 space-y-4 shadow-xl hover:border-orange-500/50 transition-all"
                  >
                    {/* Header line */}
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono uppercase text-orange-400 font-bold px-2 py-0.5 rounded-md bg-orange-950/80 border border-orange-500/30">
                            {weapon.rank}
                          </span>
                          <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30">
                            {weapon.category}
                          </span>
                          {assignedChar && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                              👤 {assignedChar.name}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-black text-amber-300 mt-1.5 flex items-center gap-2">
                          <span>⚔️</span>
                          <span>{weapon.name}</span>
                        </h3>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Equip Dropdown */}
                        {characters.length > 0 && onUpdateCharacters && (
                          <select
                            onChange={e => {
                              if (e.target.value) handleEquipWeapon(weapon, e.target.value);
                            }}
                            defaultValue=""
                            className="bg-gray-900 border border-gray-700 rounded-xl px-2.5 py-1 text-xs text-emerald-300 font-bold focus:outline-none"
                          >
                            <option value="" disabled>
                              Trang bị cho...
                            </option>
                            {characters.map(c => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        )}

                        {/* Evolution trigger */}
                        <button
                          onClick={() => {
                            setSelectedWeaponForEvolution(weapon);
                            setActiveTab('evolution');
                          }}
                          className="px-3 py-1 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <span>⚡</span>
                          <span>Tiến Hóa</span>
                        </button>

                        {/* Insert to Chapter */}
                        {onInsertText && (
                          <button
                            onClick={() => {
                              const fullText = `[THẦN BINH BẢO GIÁM: ${weapon.name} (${weapon.rank})]\n- Chủng Loại: ${weapon.category}\n- Chất Liệu Thần Kim: ${weapon.materials}\n- Khí Linh Uẩn Dưỡng: ${weapon.spiritSoul}\n- Trận Pháp Khắc Thân: ${weapon.inscribedArrays}\n- Uy Lực Thực Chiến & Dị Tượng: ${weapon.combatPowerEffect}\n- Tuyệt Kỹ Thức Tỉnh: ${weapon.ultimateTechnique}\n- Lai Lịch Cổ Xưa: ${weapon.backstory}`;
                              onInsertText(fullText);
                              alert(`Đã chèn thần binh "${weapon.name}" vào chương truyện!`);
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-orange-600 to-amber-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
                          >
                            <span>✍️</span>
                            <span>Chèn Vào Truyện</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Weapon Specs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                        <span className="text-amber-300 font-bold flex items-center gap-1">
                          <span>⚒️</span>
                          <span>Chất Liệu Khoáng Thạch Viễn Cổ:</span>
                        </span>
                        <p className="text-gray-200 leading-relaxed">{weapon.materials}</p>
                      </div>

                      <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/20 space-y-1">
                        <span className="text-purple-300 font-bold flex items-center gap-1">
                          <span>🐉</span>
                          <span>Khí Linh Uẩn Dưỡng Độc Lập:</span>
                        </span>
                        <p className="text-gray-200 leading-relaxed">{weapon.spiritSoul}</p>
                      </div>

                      <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                        <span className="text-cyan-300 font-bold flex items-center gap-1">
                          <span>🌀</span>
                          <span>Trận Pháp Phù Văn Khắc Trên Thân:</span>
                        </span>
                        <p className="text-gray-300 leading-relaxed">{weapon.inscribedArrays}</p>
                      </div>

                      <div className="p-3 bg-red-950/30 rounded-xl border border-red-500/20 space-y-1">
                        <span className="text-red-300 font-bold flex items-center gap-1">
                          <span>💥</span>
                          <span>Tuyệt Kỹ Thức Tỉnh Tối Thượng:</span>
                        </span>
                        <p className="text-amber-200 font-bold leading-relaxed">{weapon.ultimateTechnique}</p>
                      </div>

                      <div className="p-3 bg-orange-950/20 rounded-xl border border-orange-500/20 space-y-1 md:col-span-2">
                        <span className="text-orange-300 font-bold flex items-center gap-1">
                          <span>⚡</span>
                          <span>Uy Lực Thực Chiến & Dị Tượng Thiên Địa:</span>
                        </span>
                        <p className="text-gray-200 leading-relaxed">{weapon.combatPowerEffect}</p>
                      </div>

                      <div className="p-3 bg-gray-900/40 rounded-xl border border-white/5 space-y-1 md:col-span-2 text-[11px] text-gray-400">
                        <strong className="text-gray-300">Lai Lịch Huyền Thoại: </strong>
                        <span>{weapon.backstory}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: WEAPON EVOLUTION */}
        {/* ========================================================= */}
        {activeTab === 'evolution' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950 border border-red-500/30 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h3 className="text-sm font-black text-red-300 uppercase tracking-wider">
                      HỆ THỐNG THĂNG PHẨM & TIẾN HÓA BINH KHÍ (WEAPON EVOLUTION)
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Đập phôi ➔ Tôi lửa ➔ Lôi kiếp giáng lâm ➔ Khí linh lột xác ➔ Mở khóa thần thông chiến đấu mới
                    </p>
                  </div>
                </div>
              </div>

              {/* Evolution Setup Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Chọn Binh Khí Cần Tiến Hóa:</label>
                  <select
                    value={selectedWeaponForEvolution.id}
                    onChange={e => {
                      const found = weapons.find(w => w.id === e.target.value);
                      if (found) setSelectedWeaponForEvolution(found);
                    }}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  >
                    {weapons.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.rank})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Chủ Nhân Sở Hữu:</label>
                  <input
                    type="text"
                    value={evolutionCharacter}
                    onChange={e => setEvolutionCharacter(e.target.value)}
                    placeholder="VD: Nhân vật chính"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Loại Hình Tiến Hóa / Phương Thức:</label>
                  <input
                    type="text"
                    value={catalystType}
                    onChange={e => setCatalystType(e.target.value)}
                    placeholder="VD: Tôi Luyện Lôi Kiếp & Dung Hợp Thần Thạch, Huyết Tế Long Huyết"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Khoáng Thạch / Dị Bảo / Cơ Duyên Kết Hợp:</label>
                  <input
                    type="text"
                    value={catalystMaterial}
                    onChange={e => setCatalystMaterial(e.target.value)}
                    placeholder="VD: Vạn Niên Canh Kim Thần Sa, Chân Long Nghịch Lân, Cửu Trọng Thiên Kiếp"
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Action Trigger */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleEvolve}
                  disabled={isEvolving}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl shadow-red-950/60 flex items-center gap-2 transition-all"
                >
                  {isEvolving ? <Spinner /> : <span>⚡</span>}
                  <span>{isEvolving ? 'ĐANG TIẾN HÓA THẦN BINH...' : 'KÍCH HOẠT ĐẠI CẢNH TIẾN HÓA'}</span>
                </button>
              </div>
            </div>

            {/* Evolution Result Card */}
            {evolutionResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-red-500/40 space-y-5 shadow-2xl animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-500/30">
                      Tiến Hóa Thành Công
                    </span>
                    <h3 className="text-lg font-black text-amber-300 mt-1 flex items-center gap-2">
                      <span>✨</span>
                      <span>{evolutionResult.evolvedName}</span>
                      <span className="text-xs text-orange-400 font-bold">({evolutionResult.evolvedRank})</span>
                    </h3>
                  </div>

                  {onInsertText && (
                    <button
                      onClick={() => {
                        const fullText = `[ĐẠI CẢNH TIẾN HÓA THẦN BINH: ${evolutionResult.evolvedName}]\n- Phẩm Cấp Mới: ${evolutionResult.evolvedRank}\n- Khí Linh Lột Xác: ${evolutionResult.spiritAwakening}\n- Thần Thông Mới: ${evolutionResult.newAbilities}\n\n${evolutionResult.proseNarrative || ''}`;
                        onInsertText(fullText);
                        alert('Đã chèn đại cảnh tiến hóa thần binh vào chương truyện!');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:brightness-110 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-1.5"
                    >
                      <span>✍️</span>
                      <span>Chèn Vào Chương Truyện</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-900/60 p-4 rounded-xl border border-white/5">
                  <div>
                    <strong className="text-amber-300 block mb-0.5">Quá Trình Rèn Đúc & Tôi Luyện:</strong>
                    <span className="text-gray-200">{evolutionResult.forgingProcess}</span>
                  </div>
                  <div>
                    <strong className="text-purple-300 block mb-0.5">Khí Linh Lột Xác Thức Tỉnh:</strong>
                    <span className="text-gray-200">{evolutionResult.spiritAwakening}</span>
                  </div>
                  <div className="md:col-span-2">
                    <strong className="text-red-300 block mb-0.5">Thần Thông & Tuyệt Kỹ Mới Mở Khóa:</strong>
                    <span className="text-amber-200 font-bold">{evolutionResult.newAbilities}</span>
                  </div>
                </div>

                {evolutionResult.proseNarrative && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                      <span>📖</span>
                      <span>Phân Cảnh Tiến Hóa Văn Phong Đại Thần:</span>
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-200 text-xs md:text-sm leading-relaxed font-serif whitespace-pre-line bg-gray-900/90 p-5 rounded-2xl border border-red-500/20 shadow-inner">
                      {evolutionResult.proseNarrative}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: AI CREATOR (ĐẠI THẦN ĐÌNH) */}
        {/* ========================================================= */}
        {activeTab === 'creator' && (
          <div className="p-6 rounded-2xl bg-gray-950 border border-amber-500/30 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚒️</span>
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                    ĐẠI THẦN ĐÌNH LUYỆN KHÍ (SÁNG TẠO BẰNG AI)
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Phối hợp linh hoạt Chủng loại + Phẩm cấp ➔ AI tự động kiến tạo chất liệu, khí linh, trận pháp, tuyệt kỹ thức tỉnh và lai lịch
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
                  placeholder="VD: Cửu U Trảm Ma Kiếm, Hoang Thiên Bá Đao..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Chủng Loại Khí Giới:</label>
                <select
                  value={createCategory}
                  onChange={e => setCreateCategory(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                >
                  <option value="Kiếm (Phi Kiếm / Trọng Kiếm)">Kiếm (Phi Kiếm / Trọng Kiếm)</option>
                  <option value="Đao (Bá Đao / Trảm Ma Đao)">Đao (Bá Đao / Trảm Ma Đao)</option>
                  <option value="Thương / Kích / Mâu (Trường Thương)">Thương / Kích / Mâu (Trường Thương)</option>
                  <option value="Cung / Tiễn / Nỏ">Cung / Tiễn / Nỏ</option>
                  <option value="Quyền Thao / Chiến Giáp / Hộ Thể">Quyền Thao / Chiến Giáp / Hộ Thể</option>
                  <option value="Trọng Binh (Chùy / Phủ / Côn Bổng)">Trọng Binh (Chùy / Phủ / Côn Bổng)</option>
                  <option value="Kỳ Môn / Pháp Bảo (Chuông / Gương / Tháp / Quạt / Cầm)">Kỳ Môn / Pháp Bảo (Chuông / Gương / Tháp / Quạt / Cầm)</option>
                  <option value="Ám Khí & Châm Bí Thuật">Ám Khí & Châm Bí Thuật</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Phẩm Cấp Chuẩn (7 Bậc):</label>
                <select
                  value={createRank}
                  onChange={e => setCreateRank(e.target.value as any)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                >
                  <option value="Phàm Binh (Phàm Thiết Bách Luyện)">1. Phàm Binh (Phàm Thiết Bách Luyện)</option>
                  <option value="Linh Khí (Hạ - Trung - Thượng - Cực Phẩm)">2. Linh Khí (Hạ - Trung - Thượng - Cực Phẩm)</option>
                  <option value="Bảo Khí (Có Linh Quang / Biến Đổi Kích Thước)">3. Bảo Khí (Có Linh Quang / Biến Đổi Kích Thước)</option>
                  <option value="Thông Thiên Linh Bảo / Cổ Bảo">4. Thông Thiên Linh Bảo / Cổ Bảo</option>
                  <option value="Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)">5. Đạo Khí / Chuẩn Đế Binh (Uẩn Dưỡng Khí Linh)</option>
                  <option value="Cực Đạo Đế Binh / Thần Binh Viễn Cổ">6. Cực Đạo Đế Binh / Thần Binh Viễn Cổ</option>
                  <option value="Hồng Hoang Tiên Khí / Hỗn Độn Chí Bảo">7. Hồng Hoang Tiên Khí / Hỗn Độn Chí Bảo</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-bold">Trang Bị Cho Nhân Vật:</label>
                <input
                  type="text"
                  value={createOwner}
                  onChange={e => setCreateOwner(e.target.value)}
                  placeholder="VD: Nhân vật chính"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 font-bold">Ý Tưởng Đặc Thù & Dị Tượng Mong Muốn:</label>
                <textarea
                  value={createIdea}
                  onChange={e => setCreateIdea(e.target.value)}
                  rows={2}
                  placeholder="VD: Kiếm uẩn dưỡng lôi đình, tự động bảo vệ chủ nhân, có kiếm linh hình hài thiếu nữ áo tím..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCreateWeapon}
                disabled={isCreatingWeapon}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl flex items-center gap-2"
              >
                {isCreatingWeapon ? <Spinner /> : <span>✨</span>}
                <span>{isCreatingWeapon ? 'ĐANG ĐÚC THẦN BINH...' : 'KIẾN TẠO THẦN BINH MỚI'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: FORGING METHODS */}
        {/* ========================================================= */}
        {activeTab === 'methods' && (
          <div className="space-y-4">
            {PRESET_FORGING_METHODS.map(m => (
              <div key={m.id} className="p-5 rounded-2xl bg-gray-950 border border-yellow-500/25 space-y-3 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-yellow-400 font-bold px-2 py-0.5 rounded bg-yellow-950/80">
                      {m.category}
                    </span>
                    <h3 className="text-base font-black text-amber-300 mt-1">{m.name}</h3>
                  </div>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        const fullText = `[THUẬT RÈN ĐÚC BẢN MỆNH: ${m.name}]\n- Phân Loại: ${m.category}\n- Mô Tả: ${m.description}\n- Lò Rèn / Hỏa Diễm: ${m.requiredFurnaceOrFlame}\n- Quy Trình Cốt Lõi:\n  • ${m.coreSteps.join('\n  • ')}\n- Bí Quyết Độc Môn: ${m.secretTechnique}\n- Ưu/Nhược Điểm: ${m.prosAndCons.pros} | ${m.prosAndCons.cons}`;
                        onInsertText(fullText);
                        alert(`Đã chèn thuật rèn "${m.name}" vào truyện!`);
                      }}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl text-xs font-bold"
                    >
                      Chèn Vào Truyện
                    </button>
                  )}
                </div>

                <p className="text-xs text-gray-300">{m.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-900/60 p-3 rounded-xl">
                  <div>
                    <strong className="text-yellow-300 block mb-1">Lò Rèn / Hỏa Diễm Cần Thiết:</strong>
                    <span className="text-gray-300">{m.requiredFurnaceOrFlame}</span>
                  </div>
                  <div>
                    <strong className="text-amber-300 block mb-1">Bí Quyết Độc Môn:</strong>
                    <span className="text-gray-300">{m.secretTechnique}</span>
                  </div>
                  <div className="md:col-span-2">
                    <strong className="text-emerald-400 block mb-1">Quy Trình Rèn Đúc Từng Bước:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-gray-300">
                      {m.coreSteps.map((st, i) => (
                        <li key={i}>{st}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SIMULATE FORGING */}
        {/* ========================================================= */}
        {activeTab === 'simulate' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950 border border-purple-500/30 space-y-4 shadow-2xl">
              <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                <span>💥</span> MÔ PHỎNG ĐÚC KIẾM THỰC CHIẾN
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Thần Binh Muốn Đúc:</label>
                  <input
                    type="text"
                    value={simWeaponName}
                    onChange={e => setSimWeaponName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Phẩm Cấp Mục Tiêu:</label>
                  <input
                    type="text"
                    value={simTargetRank}
                    onChange={e => setSimTargetRank(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Thuật Rèn Đúc:</label>
                  <input
                    type="text"
                    value={simMethodName}
                    onChange={e => setSimMethodName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 font-bold">Lò Rèn / Hỏa Diễm:</label>
                  <input
                    type="text"
                    value={simFurnace}
                    onChange={e => setSimFurnace(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-400 mb-1 font-bold">Khoáng Thạch / Vật Liệu:</label>
                  <input
                    type="text"
                    value={simMaterials}
                    onChange={e => setSimMaterials(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl flex items-center gap-2"
                >
                  {isSimulating ? <Spinner /> : <span>💥</span>}
                  <span>{isSimulating ? 'ĐANG ĐÚC THẦN BINH...' : 'BẮT ĐẦU ĐÚC KIẾM THỰC CHIẾN'}</span>
                </button>
              </div>
            </div>

            {simulationResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-purple-500/40 space-y-4 shadow-2xl animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-purple-400 font-bold bg-purple-950/80 px-2 py-0.5 rounded">
                      Kết Quả Rèn Đúc
                    </span>
                    <h3 className="text-lg font-black text-amber-300 mt-1">
                      {simulationResult.weaponName} ({simulationResult.finalStats.gradeAchieved})
                    </h3>
                  </div>
                  {onInsertText && (
                    <button
                      onClick={() => {
                        onInsertText(
                          `[PHÂN CẢNH RÈN THẦN BINH: ${simulationResult.weaponName}]\n- Phẩm Cấp: ${simulationResult.finalStats.gradeAchieved}\n- Khí Linh: ${simulationResult.finalStats.spiritSoulBorn}\n- Tuyệt Kỹ: ${simulationResult.finalStats.ultimateSkill}\n\n${simulationResult.craftingNarrative}`
                        );
                        alert('Đã chèn phân cảnh rèn thần binh vào truyện!');
                      }}
                      className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white shadow"
                    >
                      Chèn Vào Truyện
                    </button>
                  )}
                </div>

                <div className="prose prose-invert max-w-none text-gray-200 text-xs md:text-sm leading-relaxed font-serif whitespace-pre-line bg-gray-900/90 p-5 rounded-2xl border border-purple-500/20 shadow-inner">
                  {simulationResult.craftingNarrative}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
