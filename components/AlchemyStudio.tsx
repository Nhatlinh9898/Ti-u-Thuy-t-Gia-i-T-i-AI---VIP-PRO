import React, { useState } from 'react';
import { PillRecipe, AlchemyCauldron, HerbGuide, AlchemySimulation, PillCategory } from '../types';
import { PRESET_PILL_RECIPES, PRESET_CAULDRONS, PRESET_HERB_GUIDES } from '../data/presetAlchemy';
import { generatePillRecipe, forgeCauldron, simulateAlchemyProcess } from '../services/geminiService';
import { Spinner } from './Spinner';

interface AlchemyStudioProps {
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const AlchemyStudio: React.FC<AlchemyStudioProps> = ({ genre = 'Tiên Hiệp', onInsertText }) => {
  const [activeTab, setActiveTab] = useState<'recipes' | 'cauldrons' | 'herbs' | 'simulate' | 'custom-creator'>('recipes');

  // Pill recipes state
  const [recipes, setRecipes] = useState<PillRecipe[]>(PRESET_PILL_RECIPES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchPill, setSearchPill] = useState('');

  // Cauldrons state
  const [cauldrons, setCauldrons] = useState<AlchemyCauldron[]>(PRESET_CAULDRONS);
  const [selectedCauldronRank, setSelectedCauldronRank] = useState<string>('Tất cả');

  // Herbs state
  const [herbs, setHerbs] = useState<HerbGuide[]>(PRESET_HERB_GUIDES);
  const [herbSearch, setHerbSearch] = useState('');

  // Simulation Form State
  const [customPillName, setCustomPillName] = useState(PRESET_PILL_RECIPES[0].name);
  const [customCauldronName, setCustomCauldronName] = useState(PRESET_CAULDRONS[0].name);
  const [flameType, setFlameType] = useState('Thanh Liên Địa Tâm Hỏa (Dị Hỏa Xếp Hạng 19)');
  const [alchemistLevel, setAlchemistLevel] = useState('Đan Đạo Đại Tông Sư (Thất Phẩm trở lên)');
  const [specialCircumstance, setSpecialCircumstance] = useState('Luyện đan giữa lúc đại địch vây công hoặc chuẩn bị độ thiên kiếp sinh tử');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<AlchemySimulation | null>(null);

  // AI Generator forms state
  const [createMode, setCreateMode] = useState<'recipe' | 'cauldron'>('recipe');
  const [isGenerating, setIsGenerating] = useState(false);
  // Recipe generation inputs
  const [genCategory, setGenCategory] = useState<PillCategory>('Đột Phá Cảnh Giới');
  const [genRank, setGenRank] = useState('Ngũ Phẩm Tiên Đan');
  const [genEffect, setGenEffect] = useState('Phá vỡ bình cảnh Hóa Thần, rèn đúc Hoàn Mỹ Linh Thể, gia tăng thọ nguyên');
  const [genContext, setGenContext] = useState('Nhân vật chính bế quan trong bí cảnh cổ, cần đột phá để báo thù');
  // Cauldron forging inputs
  const [forgeName, setForgeName] = useState('Cửu U Minh Hỏa Đỉnh');
  const [forgeRank, setForgeRank] = useState<'Phàm Khí' | 'Linh Khí' | 'Bảo Khí' | 'Cổ Đỉnh' | 'Đạo Khí' | 'Thần Khí Viễn Cổ'>('Cổ Đỉnh');
  const [forgeMaterials, setForgeMaterials] = useState('Xích Đồng vạn năm, Vực Ngoại Hắc Thiết, Long Cốt Thượng Cổ');
  const [forgeIdea, setForgeIdea] = useState('Đỉnh có khả năng tự động điều tiết nhiệt lượng, khắc 108 đạo Tụ Hỏa Phù Văn');

  // Handle Simulation
  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await simulateAlchemyProcess({
        pillName: customPillName,
        cauldronName: customCauldronName,
        flameType,
        alchemistLevel,
        specialCircumstance,
        genre
      });
      setSimulationResult(res);
    } catch (err: any) {
      alert('Lỗi luyện đan: ' + (err.message || 'Không thể mô phỏng'));
    } finally {
      setIsSimulating(false);
    }
  };

  // Handle AI Generate Recipe
  const handleGenerateRecipe = async () => {
    setIsGenerating(true);
    try {
      const newRecipe = await generatePillRecipe({
        category: genCategory,
        targetRank: genRank,
        targetEffect: genEffect,
        currentStoryContext: genContext
      });
      setRecipes([newRecipe, ...recipes]);
      setActiveTab('recipes');
      setSelectedCategory('Tất cả');
    } catch (err: any) {
      alert('Lỗi sinh đan phương: ' + (err.message || 'Thất bại'));
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle AI Forge Cauldron
  const handleForgeCauldron = async () => {
    setIsGenerating(true);
    try {
      const newCauldron = await forgeCauldron({
        cauldronName: forgeName,
        targetRank: forgeRank,
        materials: forgeMaterials,
        customIdea: forgeIdea
      });
      setCauldrons([newCauldron, ...cauldrons]);
      setActiveTab('cauldrons');
      setSelectedCauldronRank('Tất cả');
    } catch (err: any) {
      alert('Lỗi đúc lò luyện đan: ' + (err.message || 'Thất bại'));
    } finally {
      setIsGenerating(false);
    }
  };

  // Filter recipes
  const filteredRecipes = recipes.filter(r => {
    const matchCat = selectedCategory === 'Tất cả' || r.category === selectedCategory;
    const matchSearch = r.name.toLowerCase().includes(searchPill.toLowerCase()) ||
      r.effects.toLowerCase().includes(searchPill.toLowerCase()) ||
      r.mainHerbs.some(h => h.name.toLowerCase().includes(searchPill.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Filter cauldrons
  const filteredCauldrons = cauldrons.filter(c => {
    const matchRank = selectedCauldronRank === 'Tất cả' || c.rank === selectedCauldronRank;
    return matchRank;
  });

  // Filter herbs
  const filteredHerbs = herbs.filter(h => {
    return h.name.toLowerCase().includes(herbSearch.toLowerCase()) ||
      h.habitat.toLowerCase().includes(herbSearch.toLowerCase()) ||
      h.guardianBeast.toLowerCase().includes(herbSearch.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header Banner */}
      <div className="p-4 border-b border-emerald-500/20 bg-gradient-to-r from-gray-950 via-emerald-950/50 to-gray-950 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-xl shadow-lg shadow-emerald-900/40 border border-emerald-400/40">
            🧪
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black tracking-wide text-emerald-300">ĐAN ĐẠO CHÍ TÔN & DƯỢC THẢO BÁCH KHOA</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                QUÂN - THẦN - TÁ - SỨ
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Hệ thống đan phương cổ truyền, lò đúc thần đỉnh, dược điền thảo mộc & mô phỏng đại cảnh luyện đan
            </p>
          </div>
        </div>

        {/* Action Trigger */}
        <button
          onClick={() => setActiveTab('custom-creator')}
          className="px-3.5 py-1.5 bg-gradient-to-r from-amber-600 via-emerald-600 to-teal-600 hover:brightness-110 rounded-xl text-xs font-black text-white shadow-lg shadow-emerald-950/60 flex items-center gap-1.5 transition-all border border-emerald-400/30"
        >
          <span>✨</span>
          <span>Sáng Tạo Bằng AI</span>
        </button>
      </div>

      {/* Sub Tabs Ribbon */}
      <div className="px-4 pt-2.5 flex items-center gap-2 border-b border-white/10 bg-gray-950/90 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('recipes')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'recipes'
              ? 'border-emerald-400 text-emerald-300 bg-emerald-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>💊</span>
          <span>Đan Phương ({recipes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('cauldrons')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'cauldrons'
              ? 'border-amber-400 text-amber-300 bg-amber-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🔥</span>
          <span>Lò Luyện & Đan Đỉnh ({cauldrons.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('herbs')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'herbs'
              ? 'border-teal-400 text-teal-300 bg-teal-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>🌿</span>
          <span>Cẩm Nang Dược Thảo ({herbs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('simulate')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'simulate'
              ? 'border-rose-400 text-rose-300 bg-rose-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>⚡</span>
          <span>Đại Cảnh Luyện Đan</span>
        </button>

        <button
          onClick={() => setActiveTab('custom-creator')}
          className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === 'custom-creator'
              ? 'border-purple-400 text-purple-300 bg-purple-950/50'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          <span>✨</span>
          <span>AI Khai Sáng</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: RECIPES */}
        {/* ========================================================= */}
        {activeTab === 'recipes' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between bg-gray-900/60 p-3 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1 sm:pb-0">
                {['Tất cả', 'Đột Phá Cảnh Giới', 'Tẩy Tủy Phạt Mao', 'Chữa Thương & Hồi Hồn', 'Bạo Phát Tiềm Năng', 'Thọ Mệnh Duyên Thọ', 'Độc Đan & Ảo Giác'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                        : 'bg-gray-800/80 text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Tìm đan dược, dược liệu, công hiệu..."
                value={searchPill}
                onChange={e => setSearchPill(e.target.value)}
                className="bg-gray-950 border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 w-full sm:w-60"
              />
            </div>

            {/* Recipes Grid */}
            <div className="space-y-4">
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} className="p-5 rounded-2xl bg-gray-950 border border-emerald-500/25 space-y-4 shadow-xl hover:border-emerald-500/50 transition-all">
                  {/* Top Line */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30">
                          {recipe.rank}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30">
                          {recipe.category}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-amber-300 mt-1.5 flex items-center gap-2">
                        <span>💊</span>
                        <span>{recipe.name}</span>
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          setCustomPillName(recipe.name);
                          setActiveTab('simulate');
                        }}
                        className="px-3 py-1.5 bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 rounded-xl text-xs font-bold border border-emerald-500/30 transition-all flex items-center gap-1"
                      >
                        <span>🔥</span>
                        <span>Luyện Thử</span>
                      </button>
                      {onInsertText && (
                        <button
                          onClick={() => {
                            const herbsText = recipe.mainHerbs.map(h => `${h.name} (${h.role}, ${h.ageRequirement}${h.spiritualProperty ? ' - ' + h.spiritualProperty : ''})`).join('\n  • ');
                            const fullText = `[ĐAN PHƯƠNG: ${recipe.name} (${recipe.rank})]\n- Phân Loại: ${recipe.category}\n- Dược Liệu Chuẩn Quân - Thần - Tá - Sứ:\n  • ${herbsText}\n- Thần Hiệu Dược Lực: ${recipe.effects}\n- Bí Quyết Hỏa Hầu: ${recipe.refiningKeynotes}\n- Quy Tắc Lửa: ${recipe.fireControl || 'Văn Hỏa ôn dưỡng, Vũ Hỏa thu đan'}\n- Dị Tượng Xuất Đan: ${recipe.phenomenon || recipe.pillAroma}\n- Kháng Đan & Tác Dụng Phụ: ${recipe.sideEffects}${recipe.drugResistance ? ' | Hạn mức: ' + recipe.drugResistance : ''}`;
                            onInsertText(fullText);
                            alert(`Đã chèn đan phương "${recipe.name}" vào bản thảo!`);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950 transition-all flex items-center gap-1"
                        >
                          <span>✍️</span>
                          <span>Chèn Vào Truyện</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Herbs Matrix (Quân - Thần - Tá - Sứ) */}
                  <div className="p-3.5 bg-gray-900/70 rounded-xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                        <span>🌿</span>
                        <span>Phối Ngũ Dược Liệu Chuẩn (Quân - Thần - Tá - Sứ):</span>
                      </span>
                      <span className="text-[10px] text-gray-400 italic">4 Thảo Dược Cốt Lõi</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {recipe.mainHerbs.map((h, i) => {
                        const roleColor = h.role.includes('Quân')
                          ? 'text-amber-400 bg-amber-950/80 border-amber-500/40'
                          : h.role.includes('Thần')
                          ? 'text-purple-400 bg-purple-950/80 border-purple-500/40'
                          : h.role.includes('Tá')
                          ? 'text-cyan-400 bg-cyan-950/80 border-cyan-500/40'
                          : 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40';

                        return (
                          <div key={i} className="p-2.5 rounded-lg bg-gray-950/80 border border-white/5 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white text-xs">{h.name}</span>
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border font-bold ${roleColor}`}>
                                {h.role}
                              </span>
                            </div>
                            <div className="text-[11px] text-gray-400 flex items-center justify-between">
                              <span>Niên đại: <strong className="text-gray-300">{h.ageRequirement}</strong></span>
                            </div>
                            {h.spiritualProperty && (
                              <p className="text-[11px] text-gray-300 italic">
                                {h.spiritualProperty}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Effects & Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-900/50 rounded-xl border border-white/5 space-y-1">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <span>✨</span>
                        <span>Công Hiệu Dược Lực:</span>
                      </span>
                      <p className="text-gray-200 leading-relaxed">{recipe.effects}</p>
                    </div>

                    <div className="p-3 bg-gray-900/50 rounded-xl border border-white/5 space-y-1">
                      <span className="text-teal-300 font-bold flex items-center gap-1">
                        <span>🌈</span>
                        <span>Đan Hương & Dị Tượng:</span>
                      </span>
                      <p className="text-gray-300 leading-relaxed">{recipe.pillAroma}</p>
                      {recipe.phenomenon && (
                        <p className="text-purple-300 text-[11px] font-semibold mt-1">
                          Dị tượng: {recipe.phenomenon}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Fire Control & Side Effects */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20 space-y-1">
                      <span className="text-emerald-300 font-bold flex items-center gap-1">
                        <span>🔥</span>
                        <span>Bí Quyết Hỏa Hầu:</span>
                      </span>
                      <p className="text-gray-300">{recipe.refiningKeynotes}</p>
                      {recipe.fireControl && (
                        <p className="text-amber-300 text-[11px] font-medium mt-1">
                          Văn/Vũ Hỏa: {recipe.fireControl}
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-500/20 space-y-1">
                      <span className="text-rose-300 font-bold flex items-center gap-1">
                        <span>⚠️</span>
                        <span>Phản Phệ & Kháng Đan:</span>
                      </span>
                      <p className="text-gray-300">{recipe.sideEffects}</p>
                      {recipe.drugResistance && (
                        <p className="text-rose-400 text-[11px] font-medium mt-1">
                          Giới hạn: {recipe.drugResistance}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CAULDRONS & FORGING */}
        {/* ========================================================= */}
        {activeTab === 'cauldrons' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-900/60 p-3 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
                {['Tất cả', 'Phàm Khí', 'Linh Khí', 'Bảo Khí', 'Cổ Đỉnh', 'Đạo Khí', 'Thần Khí Viễn Cổ'].map(rank => (
                  <button
                    key={rank}
                    onClick={() => setSelectedCauldronRank(rank)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedCauldronRank === rank
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {rank}
                  </button>
                ))}
              </div>
            </div>

            {/* Cauldrons Grid */}
            <div className="space-y-5">
              {filteredCauldrons.map(c => (
                <div key={c.id} className="p-5 rounded-2xl bg-gray-950 border border-amber-500/25 space-y-4 shadow-xl hover:border-amber-500/50 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-500/30">
                        {c.rank}
                      </span>
                      <h3 className="text-base font-black text-amber-300 mt-1.5 flex items-center gap-2">
                        <span>🏺</span>
                        <span>{c.name}</span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setCustomCauldronName(c.name);
                          setActiveTab('simulate');
                        }}
                        className="px-3 py-1.5 bg-amber-900/60 hover:bg-amber-800 text-amber-200 rounded-xl text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-1"
                      >
                        <span>🔥</span>
                        <span>Chọn Lò Này</span>
                      </button>
                      {onInsertText && (
                        <button
                          onClick={() => {
                            const stepsText = c.forgingSteps ? '\n- Các bước đúc đỉnh:\n  • ' + c.forgingSteps.join('\n  • ') : '';
                            const fullText = `[ĐAN ĐỈNH: ${c.name} (${c.rank})]\n- Chất Liệu Thân Đỉnh: ${c.materials}\n- Thiết Kế Hỏa Nhãn & Trận Pháp: ${c.fireVentDesign}\n- Tính Năng Đặc Biệt: ${c.features}\n- Lai Lịch Khai Sáng: ${c.craftingMethod}${c.cauldronSoul ? '\n- Khí Linh / Linh Tính: ' + c.cauldronSoul : ''}${stepsText}`;
                            onInsertText(fullText);
                            alert(`Đã chèn thông tin "${c.name}" vào truyện!`);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
                        >
                          <span>✍️</span>
                          <span>Chèn Vào Truyện</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cauldron Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                      <span className="text-gray-400 font-bold flex items-center gap-1">
                        <span>⚒️</span>
                        <span>Chất Liệu Rèn Đúc:</span>
                      </span>
                      <p className="text-gray-200">{c.materials}</p>
                    </div>

                    <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <span>🔥</span>
                        <span>Hỏa Nhãn & Bát Quái Trận:</span>
                      </span>
                      <p className="text-gray-200">{c.fireVentDesign}</p>
                    </div>

                    <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1 md:col-span-2">
                      <span className="text-teal-300 font-bold flex items-center gap-1">
                        <span>✨</span>
                        <span>Đặc Tính & Trận Pháp Uẩn Dưỡng (Giảm Nguy Cơ Tạc Đỉnh):</span>
                      </span>
                      <p className="text-gray-300">{c.features}</p>
                    </div>
                  </div>

                  {/* Forging Steps */}
                  {c.forgingSteps && c.forgingSteps.length > 0 && (
                    <div className="p-3.5 bg-amber-950/20 rounded-xl border border-amber-500/20 space-y-2">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <span>🔨</span>
                        <span>Quy Trình Đúc Lò Từng Bước (Cauldron Forging Method):</span>
                      </span>
                      <div className="space-y-1.5 text-xs text-gray-300">
                        {c.forgingSteps.map((st, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-900/60 text-amber-300 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-gray-200">{st}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {c.cauldronSoul && (
                    <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl text-xs flex items-center gap-2">
                      <span className="text-purple-300 font-bold shrink-0">🐉 Khí Linh / Linh Tính:</span>
                      <span className="text-gray-300">{c.cauldronSoul}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: HERBS ENCYCLOPEDIA */}
        {/* ========================================================= */}
        {activeTab === 'herbs' && (
          <div className="space-y-4">
            <div className="bg-gray-900/60 p-3 rounded-2xl border border-white/5 flex items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Tìm tên thảo dược, môi trường sống hiểm trở, yêu thú canh giữ..."
                value={herbSearch}
                onChange={e => setHerbSearch(e.target.value)}
                className="bg-gray-950 border border-gray-700/80 rounded-xl px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 w-full"
              />
            </div>

            <div className="space-y-4">
              {filteredHerbs.map(herb => (
                <div key={herb.id} className="p-5 rounded-2xl bg-gray-950 border border-teal-500/25 space-y-4 shadow-xl hover:border-teal-500/50 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-teal-400 font-bold px-2 py-0.5 rounded-md bg-teal-950/80 border border-teal-500/30">
                        {herb.rarity}
                      </span>
                      <h3 className="text-base font-black text-teal-300 mt-1.5 flex items-center gap-2">
                        <span>🌱</span>
                        <span>{herb.name}</span>
                      </h3>
                    </div>

                    {onInsertText && (
                      <button
                        onClick={() => {
                          const fullText = `[CẨM NANG THẢO DƯỢC: ${herb.name} (${herb.rarity})]\n- Hình Thái: ${herb.appearance}\n- Địa Hình Hiểm Trở: ${herb.habitat}\n- Dụng Cụ Thu Hái (Phi Kim): ${herb.gatheringTool}\n- Yêu Thú Thủ Hộ: ${herb.guardianBeast}\n- Kỹ Thuật Dược Điền: Đất ${herb.soilType} | Nước: ${herb.wateringSource}\n- Gia Tốc Niên Đại: ${herb.ageAcceleration}\n- Bảo Quản Giữ 100% Linh Khí: ${herb.preservation}`;
                          onInsertText(fullText);
                          alert(`Đã chèn cẩm nang "${herb.name}" vào truyện!`);
                        }}
                        className="px-3 py-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1"
                      >
                        <span>✍️</span>
                        <span>Chèn Vào Truyện</span>
                      </button>
                    )}
                  </div>

                  {/* 2 Column Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                      <span className="text-teal-300 font-bold flex items-center gap-1">
                        <span>👁️</span>
                        <span>Hình Thái Nhận Dạng:</span>
                      </span>
                      <p className="text-gray-200">{herb.appearance}</p>
                    </div>

                    <div className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1">
                      <span className="text-amber-300 font-bold flex items-center gap-1">
                        <span>⛰️</span>
                        <span>Địa Hình Hiểm Trở Ngoài Tự Nhiên:</span>
                      </span>
                      <p className="text-gray-200">{herb.habitat}</p>
                    </div>

                    <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-500/20 space-y-1">
                      <span className="text-rose-300 font-bold flex items-center gap-1">
                        <span>🔪</span>
                        <span>Dụng Cụ Chuyên Dụng (Tránh Kim Khí):</span>
                      </span>
                      <p className="text-gray-200">{herb.gatheringTool}</p>
                    </div>

                    <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/20 space-y-1">
                      <span className="text-purple-300 font-bold flex items-center gap-1">
                        <span>🐉</span>
                        <span>Yêu Thú / Ma Thú Thủ Hộ:</span>
                      </span>
                      <p className="text-gray-200">{herb.guardianBeast}</p>
                    </div>
                  </div>

                  {/* Cultivation / Dược Điền */}
                  <div className="p-3.5 bg-emerald-950/20 rounded-xl border border-emerald-500/20 space-y-2 text-xs">
                    <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <span>🌾</span>
                      <span>Kỹ Thuật Gieo Trồng Trong Dược Điền & Bảo Quản:</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-300">
                      <div>
                        <strong className="text-emerald-400 block mb-0.5">Linh Thổ:</strong>
                        <span>{herb.soilType}</span>
                      </div>
                      <div>
                        <strong className="text-cyan-400 block mb-0.5">Nước Tưới:</strong>
                        <span>{herb.wateringSource}</span>
                      </div>
                      <div>
                        <strong className="text-amber-400 block mb-0.5">Gia Tốc Niên Đại:</strong>
                        <span>{herb.ageAcceleration}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-start gap-1.5 text-gray-300">
                      <span className="text-emerald-400 font-bold shrink-0">Bảo Quản 100% Linh Khí:</span>
                      <span>{herb.preservation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: EPIC ALCHEMY SCENE SIMULATION */}
        {/* ========================================================= */}
        {activeTab === 'simulate' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950 border border-emerald-500/30 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <div>
                    <h3 className="text-sm font-black text-emerald-300 uppercase tracking-wider">
                      MÔ PHỎNG ĐẠI CẢNH LUYỆN ĐAN CAO TRÀO (EPIC ALCHEMY SCENE)
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Tự động hóa phối hợp: Đan Phương + Đan Đỉnh + Dị Hỏa ➔ Trích xuất linh dịch ➔ Nguy cơ nổ lò ➔ Đan lôi kiếp ➔ Xuất đan cực phẩm
                    </p>
                  </div>
                </div>
              </div>

              {/* Form inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Linh Đan Muốn Luyện:</label>
                  <input
                    type="text"
                    value={customPillName}
                    onChange={e => setCustomPillName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white font-bold focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Đan Đỉnh Khai Lô:</label>
                  <input
                    type="text"
                    value={customCauldronName}
                    onChange={e => setCustomCauldronName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white font-bold focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Dị Hỏa / Ngọn Lửa Luyện Chế:</label>
                  <input
                    type="text"
                    value={flameType}
                    onChange={e => setFlameType(e.target.value)}
                    placeholder="VD: Thanh Liên Địa Tâm Hỏa, Cửu U Minh Hỏa, Tam Muội Chân Hỏa"
                    className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1.5 font-bold">Trình Độ Đan Sư:</label>
                  <select
                    value={alchemistLevel}
                    onChange={e => setAlchemistLevel(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white font-bold focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Đan Đồ (Mới học việc)">Đan Đồ (Mới học việc)</option>
                    <option value="Đan Sư Sơ Cấp (Nhất - Nhị Phẩm)">Đan Sư Sơ Cấp (Nhất - Nhị Phẩm)</option>
                    <option value="Luyện Đan Đại Sư (Tam - Tứ Phẩm)">Luyện Đan Đại Sư (Tam - Tứ Phẩm)</option>
                    <option value="Đan Đạo Tông Sư (Ngũ - Lục Phẩm)">Đan Đạo Tông Sư (Ngũ - Lục Phẩm)</option>
                    <option value="Đan Đạo Đại Tông Sư (Thất Phẩm trở lên)">Đan Đạo Đại Tông Sư (Thất Phẩm trở lên)</option>
                    <option value="Thánh Đan Sư / Tiên Đan Sư Thần Thoại">Thánh Đan Sư / Tiên Đan Sư Thần Thoại</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-1.5 font-bold">Bối Cảnh / Tình Huống Kịch Tính:</label>
                  <input
                    type="text"
                    value={specialCircumstance}
                    onChange={e => setSpecialCircumstance(e.target.value)}
                    placeholder="VD: Đang bị tông môn vây kích, đan dược là hy vọng sống sót duy nhất..."
                    className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSimulate}
                  disabled={isSimulating}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl shadow-emerald-950/60 flex items-center gap-2 transition-all"
                >
                  {isSimulating ? <Spinner /> : <span>💥</span>}
                  <span>{isSimulating ? 'ĐANG KHỞI HỎA LUYỆN ĐAN...' : 'KHAI ĐỈNH LUYỆN ĐAN (VIẾT ĐẠI CẢNH)'}</span>
                </button>
              </div>
            </div>

            {/* Simulation Result */}
            {simulationResult && (
              <div className="p-6 rounded-2xl bg-gray-950 border border-emerald-500/40 space-y-5 shadow-2xl animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      Kết Quả Luyện Đan
                    </span>
                    <h3 className="text-lg font-black text-amber-300 mt-1 flex items-center gap-2">
                      <span>✨</span>
                      <span>{simulationResult.pillName}</span>
                      <span className="text-xs text-emerald-400 font-bold">({simulationResult.finalPillQuality})</span>
                    </h3>
                  </div>

                  {onInsertText && (
                    <button
                      onClick={() => {
                        const fullText = `[ĐẠI CẢNH LUYỆN ĐAN: ${simulationResult.pillName}]\n- Đan Đỉnh: ${simulationResult.cauldronName}\n- Dị Hỏa: ${simulationResult.flameType}\n- Phẩm Chất: ${simulationResult.finalPillQuality}\n- Đan Kiếp & Dị Tượng: ${simulationResult.pillTribulation}\n\n${simulationResult.processNarrative}`;
                        onInsertText(fullText);
                        alert('Đã chèn toàn bộ đại cảnh luyện đan vào chương truyện!');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 rounded-xl text-xs font-bold text-white shadow-lg transition-all flex items-center gap-1.5"
                    >
                      <span>✍️</span>
                      <span>Chèn Toàn Bộ Vào Chương</span>
                    </button>
                  )}
                </div>

                {/* Stages Summary Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-gray-900/60 p-4 rounded-xl border border-white/5">
                  <div>
                    <strong className="text-amber-300 block mb-0.5">Đan Đỉnh & Hỏa Diễm:</strong>
                    <span className="text-gray-200">{simulationResult.cauldronName} • {simulationResult.flameType}</span>
                  </div>
                  <div>
                    <strong className="text-rose-300 block mb-0.5">Nguy Cơ Tạc Đỉnh (Nổ Lò):</strong>
                    <span className="text-gray-200">{simulationResult.cauldronExplosionRisk || 'Hóa giải êm thấm nhờ ấn quyết tuyệt đỉnh'}</span>
                  </div>
                  <div className="md:col-span-2">
                    <strong className="text-purple-300 block mb-0.5">Đan Lôi Kiếp & Dị Tượng:</strong>
                    <span className="text-gray-200">{simulationResult.pillTribulation}</span>
                  </div>
                </div>

                {/* Narrative Prose */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <span>📖</span>
                      <span>Đoạn Văn Mẫu Cao Trào (Văn Phong Tác Giả Đại Thần):</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">Sẵn sàng chèn vào bản thảo</span>
                  </div>
                  <div className="prose prose-invert max-w-none text-gray-200 text-xs md:text-sm leading-relaxed font-serif whitespace-pre-line bg-gray-900/90 p-5 rounded-2xl border border-emerald-500/20 shadow-inner">
                    {simulationResult.processNarrative}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AI CREATOR (RECIPES & CAULDRONS) */}
        {/* ========================================================= */}
        {activeTab === 'custom-creator' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gray-950 border border-purple-500/30 space-y-5 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h3 className="text-sm font-black text-purple-300 uppercase tracking-wider">
                      LÒ BÁT QUÁI AI: KHAI SÁNG ĐAN PHƯƠNG & ĐÚC THẦN ĐỈNH
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Sáng tạo đan phương độc nhất vô nhị hoặc thiết kế lò luyện đan cổ đại theo ý tưởng riêng
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-gray-900 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setCreateMode('recipe')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      createMode === 'recipe'
                        ? 'bg-emerald-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    💊 Đan Phương Mới
                  </button>
                  <button
                    onClick={() => setCreateMode('cauldron')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      createMode === 'cauldron'
                        ? 'bg-amber-600 text-white shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    🏺 Đúc Thần Đỉnh
                  </button>
                </div>
              </div>

              {/* Mode 1: Recipe Generator */}
              {createMode === 'recipe' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 font-bold">Phân Loại Mục Đích:</label>
                      <select
                        value={genCategory}
                        onChange={e => setGenCategory(e.target.value as any)}
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white font-bold"
                      >
                        <option value="Đột Phá Cảnh Giới">Đột Phá Cảnh Giới</option>
                        <option value="Tẩy Tủy Phạt Mao">Tẩy Tủy Phạt Mao</option>
                        <option value="Chữa Thương & Hồi Hồn">Chữa Thương & Hồi Hồn</option>
                        <option value="Bạo Phát Tiềm Năng">Bạo Phát Tiềm Năng</option>
                        <option value="Gia Tăng Tu Vi">Gia Tăng Tu Vi</option>
                        <option value="Thọ Mệnh Duyên Thọ">Thọ Mệnh Duyên Thọ</option>
                        <option value="Độc Đan & Ảo Giác">Độc Đan & Ảo Giác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 font-bold">Phẩm Cấp Đan Dược:</label>
                      <input
                        type="text"
                        value={genRank}
                        onChange={e => setGenRank(e.target.value)}
                        placeholder="VD: Tam Phẩm Thượng Phẩm, Lục Phẩm Tiên Đan..."
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white font-bold"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-1 font-bold">Công Hiệu Kỳ Vọng:</label>
                      <input
                        type="text"
                        value={genEffect}
                        onChange={e => setGenEffect(e.target.value)}
                        placeholder="VD: Cứu sống người chỉ còn một hơi thở, hàn gắn thần hồn..."
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-1 font-bold">Bối Cảnh Truyện Hiện Tại:</label>
                      <textarea
                        value={genContext}
                        onChange={e => setGenContext(e.target.value)}
                        rows={2}
                        placeholder="VD: Tu sĩ lạc vào bí cảnh thượng cổ, tình cờ phát hiện tàn phiến đan phương..."
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleGenerateRecipe}
                      disabled={isGenerating}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl flex items-center gap-2"
                    >
                      {isGenerating ? <Spinner /> : <span>✨</span>}
                      <span>{isGenerating ? 'ĐANG KHAI SÁNG ĐAN PHƯƠNG...' : 'SINH ĐAN PHƯƠNG QUÂN - THẦN - TÁ - SỨ'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Mode 2: Cauldron Forging Generator */}
              {createMode === 'cauldron' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 font-bold">Tên Dự Kiến Đan Đỉnh:</label>
                      <input
                        type="text"
                        value={forgeName}
                        onChange={e => setForgeName(e.target.value)}
                        placeholder="VD: Cửu Long Xích Diễm Đỉnh, Thần Nông Lô..."
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 font-bold">Phẩm Giai Mục Tiêu:</label>
                      <select
                        value={forgeRank}
                        onChange={e => setForgeRank(e.target.value as any)}
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white font-bold"
                      >
                        <option value="Phàm Khí">Phàm Khí</option>
                        <option value="Linh Khí">Linh Khí</option>
                        <option value="Bảo Khí">Bảo Khí</option>
                        <option value="Cổ Đỉnh">Cổ Đỉnh</option>
                        <option value="Đạo Khí">Đạo Khí</option>
                        <option value="Thần Khí Viễn Cổ">Thần Khí Viễn Cổ</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-1 font-bold">Vật Liệu Đúc Thân Đỉnh:</label>
                      <input
                        type="text"
                        value={forgeMaterials}
                        onChange={e => setForgeMaterials(e.target.value)}
                        placeholder="VD: Xích đồng ngàn năm, vảy rồng lửa, thiên thạch hắc thiết..."
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-1 font-bold">Ý Tưởng Hỏa Nhãn & Trận Pháp:</label>
                      <textarea
                        value={forgeIdea}
                        onChange={e => setForgeIdea(e.target.value)}
                        rows={2}
                        placeholder="VD: Khắc Thất Tinh Tụ Hỏa Trận, có 9 miệng rồng nhả lửa giúp kiểm soát áp suất..."
                        className="w-full bg-gray-900 border border-gray-700/80 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleForgeCauldron}
                      disabled={isGenerating}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:brightness-110 disabled:opacity-50 rounded-xl text-xs font-black text-white shadow-xl flex items-center gap-2"
                    >
                      {isGenerating ? <Spinner /> : <span>🔨</span>}
                      <span>{isGenerating ? 'ĐANG RÈN ĐÚC ĐAN ĐỈNH...' : 'BẮT ĐẦU ĐÚC LÒ LUYỆN ĐAN'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
