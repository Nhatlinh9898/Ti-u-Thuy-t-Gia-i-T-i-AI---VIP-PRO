import React, { useState } from 'react';
import { CharacterProfile, NovelNode, NodeType } from '../types';
import {
  PRESET_MARTIAL_TRAINING_SCENES,
  MartialTrainingScene,
  MARTIAL_DISCIPLINES_LIST,
  TRAINING_FORCE_EXPRESSIONS,
  TRAINING_ENVIRONMENT_PRESETS
} from '../data/presetMartialTrainingBible';
import {
  PRESET_PHYSICAL_DUEL_SCENES,
  PhysicalDuelScene,
  DUEL_CATEGORIES_LIST,
  PHYSICS_IMPACT_PRINCIPLES
} from '../data/presetPhysicalDuelBible';
import { generateContent } from '../services/geminiService';
import { Spinner } from './Spinner';

interface MartialTrainingStudioProps {
  characters?: CharacterProfile[];
  genre?: string;
  onInsertText?: (text: string) => void;
}

export const MartialTrainingStudio: React.FC<MartialTrainingStudioProps> = ({
  characters = [],
  genre = 'Tiên Hiệp',
  onInsertText
}) => {
  // Top-Level Mode: 'training' (Khổ luyện) vs 'duel' (Thư hùng giao đấu)
  const [activeSection, setActiveSection] = useState<'training' | 'duel'>('duel');

  // ==========================================
  // SECTION 1: MARTIAL TRAINING STATE
  // ==========================================
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSceneId, setSelectedSceneId] = useState<string>(PRESET_MARTIAL_TRAINING_SCENES[0].id);

  // Custom Training Simulator State
  const [customCharName, setCustomCharName] = useState<string>(characters[0]?.name || 'Tiêu Cảnh');
  const [customDiscipline, setCustomDiscipline] = useState<string>('Bá Vương Huyền Thiết Thương & Thập Tam Thức Bạo Long Thương');
  const [customEnvironment, setCustomEnvironment] = useState<string>(TRAINING_ENVIRONMENT_PRESETS[1]);
  const [customForceStyle, setCustomForceStyle] = useState<string>(TRAINING_FORCE_EXPRESSIONS[1]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedProse, setSimulatedProse] = useState<string>('');

  // ==========================================
  // SECTION 2: PHYSICAL DUEL & EXEGESIS STATE
  // ==========================================
  const [selectedDuelCategory, setSelectedDuelCategory] = useState<string>('all');
  const [duelSearchQuery, setDuelSearchQuery] = useState<string>('');
  const [selectedDuelId, setSelectedDuelId] = useState<string>(PRESET_PHYSICAL_DUEL_SCENES[0].id);

  // Custom Duel Simulator State
  const [duelCharA, setDuelCharA] = useState<string>(characters[0]?.name || 'Tiêu Cảnh');
  const [duelWeaponA, setDuelWeaponA] = useState<string>('Thái Cổ Trọng Kiếm nặng 1.200 cân');
  const [duelCharB, setDuelCharB] = useState<string>(characters[1]?.name || 'Lăng Phong');
  const [duelWeaponB, setDuelWeaponB] = useState<string>('Thu Thủy Linh Kiếm siêu thanh rung 12.000 Hz');
  const [duelEnvironment, setDuelEnvironment] = useState<string>('Cầu đá cổ Đoạn Long Kiều bắc qua hẻm vực sâu muôn trượng gió bấc gào rít');
  const [duelPhysicsEffect, setDuelPhysicsEffect] = useState<string>(PHYSICS_IMPACT_PRINCIPLES[0].principle);
  const [isDuelSimulating, setIsDuelSimulating] = useState<boolean>(false);
  const [duelSimulatedProse, setDuelSimulatedProse] = useState<string>('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered training scenes
  const filteredTrainingScenes = PRESET_MARTIAL_TRAINING_SCENES.filter((scene) => {
    const matchesCat = selectedCategory === 'all' || scene.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      scene.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.weaponOrDiscipline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scene.spaceAndTime.locationAndAtmosphere.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentTrainingScene =
    PRESET_MARTIAL_TRAINING_SCENES.find((s) => s.id === selectedSceneId) || PRESET_MARTIAL_TRAINING_SCENES[0];

  // Filtered duel scenes
  const filteredDuelScenes = PRESET_PHYSICAL_DUEL_SCENES.filter((duel) => {
    const matchesCat = selectedDuelCategory === 'all' || duel.category === selectedDuelCategory;
    const matchesSearch =
      !duelSearchQuery ||
      duel.title.toLowerCase().includes(duelSearchQuery.toLowerCase()) ||
      duel.alias.toLowerCase().includes(duelSearchQuery.toLowerCase()) ||
      duel.combatantA.name.toLowerCase().includes(duelSearchQuery.toLowerCase()) ||
      duel.combatantB.name.toLowerCase().includes(duelSearchQuery.toLowerCase()) ||
      duel.spaceAndTime.locationAndTerrain.toLowerCase().includes(duelSearchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const currentDuelScene =
    PRESET_PHYSICAL_DUEL_SCENES.find((d) => d.id === selectedDuelId) || PRESET_PHYSICAL_DUEL_SCENES[0];

  // AI Training Simulator Runner
  const handleGenerateCustomTraining = async () => {
    setIsSimulating(true);
    setSimulatedProse('');
    try {
      const prompt = `Bạn là đại sư văn học Tiên Hiệp / Huyền Huyễn đỉnh cao.
Hãy viết một đoạn văn miêu tả cực kỳ sống động, kịch tính và chân thực về cảnh khổ luyện võ học theo thông số sau:
- Nhân vật: ${customCharName}
- Võ công / Vũ khí luyện tập: ${customDiscipline}
- Địa điểm, không gian & thời gian: ${customEnvironment}
- Kình lực / Cách phát lực & Chân khí: ${customForceStyle}
- Thể loại: ${genre}

YÊU CẦU BÚT PHÁP CHI TIẾT:
1. Mô tả cụ thể không gian xung quanh (vách đá, bọt nước, cát bay, sương tuyết, ánh trăng hay nắng gắt) và thời khắc (giờ Mão, chính ngọ, canh ba đêm tuyết...).
2. Mô tả chuyển động cơ bắp, thế đứng mã bộ, cánh tay, gân cốt, từng giọt mồ hôi rơi trên nền đá nổ khói, hơi thở trầm đục dồn dập.
3. Kỹ thuật xuất chiêu (cung tên kéo căng vầng trăng rằm, mũi thương đâm ngược dòng thác, nắm đấm thốn kình nứt đá, chân khí đại chu thiên luân chuyển).
4. Sự tương tác mãnh liệt với môi trường (đá vỡ, nước rẽ sóng, lá rơi bị đâm trúng gân lá, gió rít).
5. Độ dài: khoảng 300 - 450 chữ, giàu nhạc tính, nhịp văn hào hùng dồn dập, tuyệt đối không viết tóm tắt hời hợt.`;

      const dummyNode: NovelNode = {
        id: 'training_sim_' + Date.now(),
        type: NodeType.CHAPTER,
        title: `Diễn Võ Khổ Luyện: ${customDiscipline}`,
        summary: `Nhân vật ${customCharName} khổ luyện tại ${customEnvironment}`,
        content: '',
        children: []
      };

      const result = await generateContent(
        dummyNode,
        `Nhân vật ${customCharName} khổ luyện võ công, xạ thuật, thương pháp hoặc công pháp. Thể loại: ${genre}`,
        'MARTIAL_TRAINING',
        prompt
      );
      setSimulatedProse(result);
      showToast('Đã mô phỏng phân cảnh diễn võ thành công!');
    } catch (err: any) {
      showToast('Lỗi mô phỏng: ' + err.message);
    } finally {
      setIsSimulating(false);
    }
  };

  // AI Duel Simulator Runner
  const handleGenerateCustomDuel = async () => {
    setIsDuelSimulating(true);
    setDuelSimulatedProse('');
    try {
      const prompt = `Bạn là Đại Văn Hào Tiên Hiệp / Huyền Huyễn viết về các trận huyết chiến thư hùng đỉnh cao.
Hãy viết một phân cảnh giao đấu đối kháng cực kỳ kịch tính, chân thực và có chiều sâu lực học theo thông số sau:
- Đấu thủ 1: ${duelCharA} (Vũ khí/Tuyệt kỹ: ${duelWeaponA})
- Đấu thủ 2: ${duelCharB} (Vũ khí/Tuyệt kỹ: ${duelWeaponB})
- Không gian & Thời gian giao đấu: ${duelEnvironment}
- Nguyên lý vật lý chi phối: ${duelPhysicsEffect}
- Thể loại: ${genre}

QUY TẮC BÚT PHÁP CHI TIẾT THEO YÊU CẦU:
1. MIÊU TẢ CẢ CHIÊU THỨC VÀ DIỄN GIẢI BẢN CHẤT CHIÊU THỨC CỦA TỪNG ĐỐI THỦ:
   - Cách vận kình của Đấu thủ 1, đường đi của lực học, góc xuất chiêu, ý đồ chiến thuật.
   - Cách phản đòn/hóa giải của Đấu thủ 2, mượn lực tá lực, chuyển hướng xung lượng hoặc đánh vào điểm yếu.
2. MÔ TẢ CHI TIẾT KHÔNG GIAN VÀ THỜI GIAN:
   - Thời khắc (hoàng hôn ráng máu, canh ba bão tuyết, chính ngọ nắng chang chang...).
   - Địa hình đấu trường, khí áp, âm thanh gió lốc hay tiếng sấm.
3. TÁC ĐỘNG VẬT LÝ CHI TIẾT LÊN MÔI TRƯỜNG XUNG QUANH:
   - Sóng xung kích nén khí (Mach cone), vùng chân không cục bộ.
   - Truyền động năng xuyên vật chất làm nứt vỡ vi mô nền đá, hất văng sỏi cát.
   - Biến dạng nhiệt, ma sát nung đỏ kim loại, giãn nở hơi nước khi băng hỏa va chạm.
4. Độ dài: khoảng 400 - 550 chữ, tiết tấu dồn dập, hình ảnh mãn nhãn như phim điện ảnh bom tấn.`;

      const dummyNode: NovelNode = {
        id: 'duel_sim_' + Date.now(),
        type: NodeType.CHAPTER,
        title: `Thư Hùng Giao Đấu: ${duelCharA} vs ${duelCharB}`,
        summary: `Trận đối quyết vật lý tại ${duelEnvironment}`,
        content: '',
        children: []
      };

      const result = await generateContent(
        dummyNode,
        `Trận giao đấu đỉnh cao giữa ${duelCharA} và ${duelCharB}. Thể loại: ${genre}`,
        'PHYSICAL_DUEL',
        prompt
      );
      setDuelSimulatedProse(result);
      showToast('Đã mô phỏng trận thư hùng vật lý thành công!');
    } catch (err: any) {
      showToast('Lỗi mô phỏng đối quyết: ' + err.message);
    } finally {
      setIsDuelSimulating(false);
    }
  };

  return (
    <div className="p-4 space-y-5 bg-gray-950 text-gray-100 min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xl border border-amber-300 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header Banner with Mode Switch */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-amber-950/40 to-gray-900 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{activeSection === 'training' ? '🥋' : '⚡'}</span>
            <h2 className="text-lg font-black text-amber-200 tracking-wide font-serif">
              {activeSection === 'training'
                ? 'DIỄN VÕ TU LUYỆN BẢO ĐIỂN'
                : 'VÕ ĐẠO THƯ HÙNG BẢO ĐIỂN (VẬT LÝ CHIẾN TRƯỜNG)'}
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-700 font-bold">
              {activeSection === 'training'
                ? '16 Tuyệt Kỹ: Cung • Thương • Võ • Pháp'
                : '6 Đại Chiến • Biện Giải Chiêu Thức • Lực Học Vật Lý'}
            </span>
          </div>
          <p className="text-xs text-gray-300">
            {activeSection === 'training'
              ? 'Kho tàng miêu tả chi tiết kỹ thuật xuất chiêu, kình lực phát ra, không gian & thời gian khổ luyện đỉnh cao.'
              : 'Phân tích chiêu thức đối kháng, nguyên lý lực học của từng đấu thủ, sóng xung kích và sự tàn phá môi trường theo cách có tính vật lý.'}
          </p>
        </div>

        {/* Section Switcher Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('training')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'training'
                ? 'bg-amber-600 text-white shadow-lg ring-1 ring-amber-300'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <span>🥋</span>
            <span>Khổ Luyện Cá Nhân ({PRESET_MARTIAL_TRAINING_SCENES.length})</span>
          </button>
          <button
            onClick={() => setActiveSection('duel')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeSection === 'duel'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg ring-1 ring-red-300'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <span>⚡</span>
            <span>Thư Hùng Giao Đấu ({PRESET_PHYSICAL_DUEL_SCENES.length})</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SECTION A: MARTIAL TRAINING (KHỔ LUYỆN CÁ NHÂN) */}
      {/* ===================================================================== */}
      {activeSection === 'training' && (
        <div className="space-y-4">
          {/* Discipline Quick Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bg-gray-900/80 rounded-xl border border-white/5">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0 scrollbar-thin">
              <span className="text-amber-300 font-bold mr-1 whitespace-nowrap">Môn Loại Luyện Tập:</span>
              {[
                { id: 'all', label: `Tất Cả (${PRESET_MARTIAL_TRAINING_SCENES.length})` },
                { id: 'Luyện Cung', label: '🏹 Xạ Thuật & Cung Pháp' },
                { id: 'Luyện Thương', label: '🔱 Bá Khí Thương Pháp' },
                { id: 'Luyện Võ Công', label: '🥋 Luyện Thể & Quyền Cước' },
                { id: 'Luyện Công Pháp', label: '🧘 Công Pháp & Thổ Nạp' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap text-xs ${
                    selectedCategory === cat.id
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-950 ring-1 ring-amber-300'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Tìm theo vũ khí, không gian, thời gian..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Main Grid: Left List (4 cols) & Right Detailed View (8 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: Scene List */}
            <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1 scrollbar-thin">
              <div className="text-xs font-bold text-gray-400 px-1 flex items-center justify-between">
                <span>Danh Sách Phân Cảnh Khổ Luyện ({filteredTrainingScenes.length}):</span>
                <span className="text-[10px] text-amber-400">Chọn để xem chi tiết</span>
              </div>

              {filteredTrainingScenes.map((scene) => {
                const isSelected = scene.id === selectedSceneId;
                return (
                  <div
                    key={scene.id}
                    onClick={() => setSelectedSceneId(scene.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-950/70 to-red-950/60 border-amber-400 shadow-lg ring-1 ring-amber-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          scene.category === 'Luyện Cung'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : scene.category === 'Luyện Thương'
                            ? 'bg-red-950 text-red-300 border-red-700'
                            : scene.category === 'Luyện Võ Công'
                            ? 'bg-amber-950 text-amber-300 border-amber-700'
                            : 'bg-purple-950 text-purple-300 border-purple-700'
                        }`}
                      >
                        {scene.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {scene.spaceAndTime.timeOfDay.split(',')[0]}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-100 group-hover:text-amber-200">
                      {scene.title}
                    </h4>

                    <p className="text-[11px] text-gray-300 line-clamp-2 italic font-serif">
                      &quot;{scene.alias}&quot;
                    </p>

                    <div className="text-[10px] text-amber-200/80 bg-black/40 px-2 py-1 rounded border border-white/5 truncate">
                      ⚡ <strong>Vũ khí:</strong> {scene.weaponOrDiscipline}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Breakdown & Master Excerpt */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 rounded-2xl bg-gray-900/80 border border-amber-500/30 space-y-4 shadow-xl">
                {/* Header of Selected Scene */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 font-bold">
                        {currentTrainingScene.category}
                      </span>
                      <h3 className="text-base font-black text-amber-200 font-serif">
                        {currentTrainingScene.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-300 italic pt-1 font-serif">
                      &quot;{currentTrainingScene.alias}&quot;
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentTrainingScene.masterProseExcerpt);
                        showToast('Đã sao chép trích đoạn diễn võ!');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors flex items-center gap-1 border border-gray-700"
                    >
                      📋 Sao chép
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          onInsertText(`\n${currentTrainingScene.masterProseExcerpt}\n`);
                          showToast('Đã chèn phân cảnh diễn võ vào nội dung chương!');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white text-xs font-black shadow-lg shadow-amber-950 transition-all flex items-center gap-1"
                      >
                        ✍️ Chèn vào chương
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. Space and Time Breakdown */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🌌</span> Không Gian & Thời Gian Khổ Luyện
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-gray-200">
                    <div className="p-2 rounded bg-gray-900/90 border border-white/5">
                      <span className="text-amber-400 font-bold block mb-0.5">Thời Khắc:</span>
                      <p>{currentTrainingScene.spaceAndTime.timeOfDay}</p>
                    </div>
                    <div className="p-2 rounded bg-gray-900/90 border border-white/5">
                      <span className="text-amber-400 font-bold block mb-0.5">Tiết Trời Khí Hậu:</span>
                      <p>{currentTrainingScene.spaceAndTime.seasonAndWeather}</p>
                    </div>
                    <div className="p-2 rounded bg-gray-900/90 border border-white/5">
                      <span className="text-amber-400 font-bold block mb-0.5">Địa Điểm & Khí Quyển:</span>
                      <p>{currentTrainingScene.spaceAndTime.locationAndAtmosphere}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Training Motions & Force Execution */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/30 to-amber-950/20 border border-red-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡</span> Bộ Pháp, Phát Lực & Vận Khí Đan Điền
                  </h4>
                  <div className="space-y-2 text-xs text-gray-200">
                    <div className="p-2 rounded bg-black/40 border border-white/5">
                      <span className="text-red-400 font-bold">Thế Đứng & Mã Bộ: </span>
                      {currentTrainingScene.trainingMotions.stanceAndForm}
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-white/5">
                      <span className="text-amber-400 font-bold">Phát Lực & Chân Khí: </span>
                      {currentTrainingScene.trainingMotions.forceAndQiExecution}
                    </div>
                    <div className="p-2 rounded bg-black/40 border border-white/5">
                      <span className="text-cyan-400 font-bold">Hơi Thở & Thần Niệm: </span>
                      {currentTrainingScene.trainingMotions.breathAndMentalFocus}
                    </div>
                  </div>
                </div>

                {/* 3. Environmental Interactions */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                  <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <span>🌪️</span> Tương Tác Sống Động Với Môi Trường Tự Nhiên
                  </h4>
                  <p className="text-xs text-emerald-100 font-serif leading-relaxed italic">
                    {currentTrainingScene.environmentalInteractions}
                  </p>
                </div>

                {/* 4. Five Sensory Details Grid */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Khắc Họa 5 Giác Quan Sống Động (Sensory Details):
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-gray-900 border border-white/5 space-y-1">
                      <span className="text-blue-400 font-bold block">👁️ Thị giác</span>
                      <p className="text-gray-300 text-[10px] leading-relaxed">
                        {currentTrainingScene.sensoryDetails.visual}
                      </p>
                    </div>
                    <div className="p-2 rounded bg-gray-900 border border-white/5 space-y-1">
                      <span className="text-purple-400 font-bold block">👂 Thính giác</span>
                      <p className="text-gray-300 text-[10px] leading-relaxed">
                        {currentTrainingScene.sensoryDetails.auditory}
                      </p>
                    </div>
                    <div className="p-2 rounded bg-gray-900 border border-white/5 space-y-1">
                      <span className="text-amber-400 font-bold block">✋ Xúc giác</span>
                      <p className="text-gray-300 text-[10px] leading-relaxed">
                        {currentTrainingScene.sensoryDetails.tactile}
                      </p>
                    </div>
                    <div className="p-2 rounded bg-gray-900 border border-white/5 space-y-1">
                      <span className="text-emerald-400 font-bold block">👃 Khứu giác</span>
                      <p className="text-gray-300 text-[10px] leading-relaxed">
                        {currentTrainingScene.sensoryDetails.olfactory}
                      </p>
                    </div>
                    <div className="p-2 rounded bg-gray-900 border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                      <span className="text-pink-400 font-bold block">👅 Vị giác</span>
                      <p className="text-gray-300 text-[10px] leading-relaxed">
                        {currentTrainingScene.sensoryDetails.gustatory}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Master Prose Excerpt */}
                <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-amber-300 font-serif flex items-center gap-1.5">
                      <span>📜</span> Đoạn Văn Mẫu Diễn Võ Chuẩn Văn Phong Kinh Điển:
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {currentTrainingScene.masterProseExcerpt.split(/\s+/).length} chữ
                    </span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed text-gray-200 whitespace-pre-line italic bg-gray-950/70 p-3 rounded-lg border border-white/5">
                    {currentTrainingScene.masterProseExcerpt}
                  </p>
                </div>
              </div>

              {/* AI Custom Training Simulator Panel */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border border-purple-500/30 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-xs font-black text-purple-300 uppercase tracking-wider flex items-center gap-2">
                    <span>✨</span> Trình Mô Phỏng Khổ Luyện Tùy Chỉnh Bằng AI (Custom Training Simulator)
                  </h3>
                  <span className="text-[10px] text-gray-400">Tự do kết hợp nhân vật, võ công & môi trường</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-gray-300 block mb-1">Nhân Vật Luyện Tập:</label>
                    <input
                      type="text"
                      value={customCharName}
                      onChange={(e) => setCustomCharName(e.target.value)}
                      placeholder="Tên nhân vật..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-300 block mb-1">Võ Công / Vũ Khí:</label>
                    <input
                      type="text"
                      value={customDiscipline}
                      onChange={(e) => setCustomDiscipline(e.target.value)}
                      placeholder="Tên vũ khí hoặc tâm pháp..."
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-300 block mb-1">Không Gian & Thời Gian:</label>
                    <select
                      value={customEnvironment}
                      onChange={(e) => setCustomEnvironment(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-amber-200"
                    >
                      {TRAINING_ENVIRONMENT_PRESETS.map((env, eIdx) => (
                        <option key={eIdx} value={env}>
                          {env}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-gray-300 block mb-1">Kình Lực & Chân Khí:</label>
                    <select
                      value={customForceStyle}
                      onChange={(e) => setCustomForceStyle(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-amber-200"
                    >
                      {TRAINING_FORCE_EXPRESSIONS.map((force, fIdx) => (
                        <option key={fIdx} value={force}>
                          {force}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleGenerateCustomTraining}
                    disabled={isSimulating}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white text-xs font-black shadow-lg shadow-orange-950 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSimulating ? (
                      <>
                        <Spinner size="sm" />
                        <span>Đang diễn võ mô phỏng...</span>
                      </>
                    ) : (
                      <>
                        <span>⚡</span>
                        <span>TẠO PHÂN CẢNH DIỄN VÕ VĂN MẪU (AI GENERATOR)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Generated Output */}
                {simulatedProse && (
                  <div className="p-4 rounded-xl bg-black/80 border border-amber-500/40 space-y-2 mt-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        <span>✨</span> Kết Quả Khổ Luyện: {customCharName}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(simulatedProse);
                            showToast('Đã sao chép văn bản!');
                          }}
                          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-[10px] text-gray-300 rounded font-bold cursor-pointer"
                        >
                          📋 Copy
                        </button>
                        {onInsertText && (
                          <button
                            onClick={() => {
                              onInsertText(`\n${simulatedProse}\n`);
                              showToast('Đã chèn vào chương!');
                            }}
                            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-500 text-[10px] text-white rounded font-black cursor-pointer"
                          >
                            ✍️ Chèn vào truyện
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-200 font-serif leading-relaxed whitespace-pre-line italic">
                      {simulatedProse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* SECTION B: PHYSICAL DUEL & MOVE EXEGESIS (THƯ HÙNG GIAO ĐẤU VẬT LÝ) */}
      {/* ===================================================================== */}
      {activeSection === 'duel' && (
        <div className="space-y-4">
          {/* Duel Category Filter Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bg-gray-900/80 rounded-xl border border-white/5">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0 scrollbar-thin">
              <span className="text-red-400 font-bold mr-1 whitespace-nowrap">Đấu Trường Thư Hùng:</span>
              {DUEL_CATEGORIES_LIST.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedDuelCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap text-xs cursor-pointer ${
                    selectedDuelCategory === cat.id
                      ? 'bg-red-600 text-white shadow-md shadow-red-950 ring-1 ring-red-300'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Duel Search Input */}
            <div className="w-full sm:w-64">
              <input
                type="text"
                placeholder="Tìm theo đấu thủ, chiêu thức, không gian..."
                value={duelSearchQuery}
                onChange={(e) => setDuelSearchQuery(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-400"
              />
            </div>
          </div>

          {/* Main Duel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column: Duel Scene List */}
            <div className="lg:col-span-4 space-y-2.5 max-h-[850px] overflow-y-auto pr-1 scrollbar-thin">
              <div className="text-xs font-bold text-gray-400 px-1 flex items-center justify-between">
                <span>Trận Thư Hùng Kinh Điển ({filteredDuelScenes.length}):</span>
                <span className="text-[10px] text-red-400">Chọn để xem biện giải</span>
              </div>

              {filteredDuelScenes.map((duel) => {
                const isSelected = duel.id === selectedDuelId;
                return (
                  <div
                    key={duel.id}
                    onClick={() => setSelectedDuelId(duel.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-950/80 via-amber-950/70 to-gray-900 border-red-400 shadow-xl ring-1 ring-red-400/50'
                        : 'bg-gray-900/60 border-gray-800 hover:border-gray-700 hover:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold border bg-red-950 text-red-300 border-red-700">
                        {duel.category}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {duel.spaceAndTime.timeOfDay.split(',')[0]}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-100 group-hover:text-red-300">
                      {duel.title}
                    </h4>

                    {/* Combatant Clash Badge */}
                    <div className="grid grid-cols-11 items-center text-[10px] bg-black/40 p-2 rounded-lg border border-white/5 font-semibold">
                      <div className="col-span-5 text-amber-300 truncate">
                        👤 {duel.combatantA.name}
                      </div>
                      <div className="col-span-1 text-center text-red-500 font-black">
                        VS
                      </div>
                      <div className="col-span-5 text-right text-cyan-300 truncate">
                        {duel.combatantB.name} 👤
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-300 line-clamp-2 italic font-serif">
                      &quot;{duel.alias}&quot;
                    </p>

                    <div className="text-[10px] text-slate-300 bg-black/30 p-1.5 rounded border border-white/5 truncate">
                      🌪️ <strong>Địa hình:</strong> {duel.spaceAndTime.locationAndTerrain.slice(0, 50)}...
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: In-Depth Move Exegesis & Physics Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 rounded-2xl bg-gray-900/80 border border-red-500/30 space-y-4 shadow-xl">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-700 font-bold">
                        {currentDuelScene.category}
                      </span>
                      <h3 className="text-base font-black text-amber-200 font-serif">
                        {currentDuelScene.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-300 italic pt-1 font-serif">
                      &quot;{currentDuelScene.alias}&quot;
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentDuelScene.masterProseExcerpt);
                        showToast('Đã sao chép phân cảnh giao đấu!');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-bold transition-colors flex items-center gap-1 border border-gray-700 cursor-pointer"
                    >
                      📋 Sao chép
                    </button>
                    {onInsertText && (
                      <button
                        onClick={() => {
                          onInsertText(`\n${currentDuelScene.masterProseExcerpt}\n`);
                          showToast('Đã chèn phân cảnh giao đấu vào chương!');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-black shadow-lg shadow-red-950 transition-all flex items-center gap-1 cursor-pointer"
                      >
                        ✍️ Chèn vào chương
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. Combatant Profiles Confrontation Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Combatant A */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/40 to-black/60 border border-amber-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                        <span>⚔️</span> {currentDuelScene.combatantA.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-200 border border-amber-700/50">
                        {currentDuelScene.combatantA.cultivationStage}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono">
                      {currentDuelScene.combatantA.factionAndTitle}
                    </p>
                    <div className="text-[11px] text-gray-200">
                      <strong className="text-amber-400">Vũ khí / Tuyệt kỹ: </strong>
                      {currentDuelScene.combatantA.weaponAndDiscipline}
                    </div>
                    <div className="text-[11px] text-gray-300 bg-black/40 p-2 rounded border border-white/5">
                      <strong className="text-amber-300/90">Thế đứng & Trọng tâm: </strong>
                      {currentDuelScene.combatantA.combatStanceAndWeight}
                    </div>
                  </div>

                  {/* Combatant B */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/40 to-black/60 border border-cyan-500/30 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                        <span>🛡️</span> {currentDuelScene.combatantB.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-200 border border-cyan-700/50">
                        {currentDuelScene.combatantB.cultivationStage}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono">
                      {currentDuelScene.combatantB.factionAndTitle}
                    </p>
                    <div className="text-[11px] text-gray-200">
                      <strong className="text-cyan-400">Vũ khí / Tuyệt kỹ: </strong>
                      {currentDuelScene.combatantB.weaponAndDiscipline}
                    </div>
                    <div className="text-[11px] text-gray-300 bg-black/40 p-2 rounded border border-white/5">
                      <strong className="text-cyan-300/90">Thế đứng & Trọng tâm: </strong>
                      {currentDuelScene.combatantB.combatStanceAndWeight}
                    </div>
                  </div>
                </div>

                {/* 2. Space, Time & Atmospheric Arena */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-slate-700/50 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🌌</span> Đấu Trường Không Gian, Thời Khắc & Khí Áp
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-200">
                    <div className="p-2 rounded bg-gray-900/90 border border-white/5">
                      <span className="text-amber-400 font-bold block mb-0.5">Thời Khắc & Tiết Trời:</span>
                      <p>{currentDuelScene.spaceAndTime.timeOfDay}. {currentDuelScene.spaceAndTime.seasonAndWeather}.</p>
                    </div>
                    <div className="p-2 rounded bg-gray-900/90 border border-white/5">
                      <span className="text-cyan-400 font-bold block mb-0.5">Địa Hình Đấu Trường:</span>
                      <p>{currentDuelScene.spaceAndTime.locationAndTerrain}</p>
                    </div>
                  </div>
                  <div className="p-2 rounded bg-red-950/20 border border-red-500/20 text-xs text-red-200 font-mono">
                    <strong>Áp lực khí quyển & Trường khí:</strong> {currentDuelScene.spaceAndTime.atmosphericPressureAndQiField}
                  </div>
                </div>

                {/* 3. Technique Clash Exchanges: Move-by-Move & Exegesis */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>⚡</span> Chi Tiết Chiêu Thức, Biện Giải Kỹ Thuật & Điểm Tiếp Xúc
                  </h4>

                  {currentDuelScene.exchanges.map((ex) => (
                    <div
                      key={ex.roundIndex}
                      className="p-4 rounded-xl bg-gradient-to-br from-black/80 to-gray-900/80 border border-red-500/40 space-y-3 shadow-lg"
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <span className="text-xs font-black text-amber-300 font-serif">
                          {ex.roundTitle}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          Hiệp {ex.roundIndex}
                        </span>
                      </div>

                      {/* Two Moves Confrontation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        {/* Combatant A Move */}
                        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-amber-300">{ex.combatantA.moveName}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-900 text-amber-200 font-bold">
                              Tiến Công
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-300">
                            <strong className="text-amber-400">Ý đồ chiến thuật: </strong>
                            {ex.combatantA.tacticalIntent}
                          </div>
                          <div className="text-[11px] text-gray-300">
                            <strong className="text-amber-400">Quỹ đạo kình lực: </strong>
                            {ex.combatantA.kineticExecution}
                          </div>
                          <div className="p-2 rounded bg-black/50 border border-amber-500/20 text-[11px] text-amber-100 font-serif italic">
                            <strong>Diễn giải bản chất chiêu thức: </strong>
                            {ex.combatantA.techniqueExegesis}
                          </div>
                        </div>

                        {/* Combatant B Counter */}
                        <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-black text-cyan-300">{ex.combatantB.moveName}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-900 text-cyan-200 font-bold">
                              Phản Đòn
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-300">
                            <strong className="text-cyan-400">Chiến thuật khắc chế: </strong>
                            {ex.combatantB.counterTactics || ex.combatantB.tacticalIntent}
                          </div>
                          <div className="text-[11px] text-gray-300">
                            <strong className="text-cyan-400">Quỹ đạo đón đỡ: </strong>
                            {ex.combatantB.kineticExecution}
                          </div>
                          <div className="p-2 rounded bg-black/50 border border-cyan-500/20 text-[11px] text-cyan-100 font-serif italic">
                            <strong>Diễn giải cơ chế phá chiêu: </strong>
                            {ex.combatantB.techniqueExegesis}
                          </div>
                        </div>
                      </div>

                      {/* Collision Nexus */}
                      <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200 font-semibold flex items-center gap-2">
                        <span>💥</span>
                        <span><strong>Điểm va chạm tiếp xúc:</strong> {ex.collisionNexus}</span>
                      </div>

                      {/* 4. Physics Impact on Environment (Tác động vật lý chi tiết) */}
                      <div className="p-3.5 rounded-xl bg-black/70 border border-white/10 space-y-2">
                        <h5 className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span>🔬</span> Tác Động Lực Học Vật Lý Lên Không Gian & Cảnh Vật:
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-gray-900/90 border border-white/5 space-y-1">
                            <span className="text-blue-400 font-bold block">💨 Sóng Xung Kích & Nén Khí</span>
                            <p className="text-gray-300 leading-relaxed">
                              {ex.physicsImpactDetail.shockwaveAndAirCompression}
                            </p>
                          </div>
                          <div className="p-2 rounded bg-gray-900/90 border border-white/5 space-y-1">
                            <span className="text-emerald-400 font-bold block">🪨 Truyền Động Năng & Nứt Đá</span>
                            <p className="text-gray-300 leading-relaxed">
                              {ex.physicsImpactDetail.kineticTransferThroughMedium}
                            </p>
                          </div>
                          <div className="p-2 rounded bg-gray-900/90 border border-white/5 space-y-1">
                            <span className="text-orange-400 font-bold block">🔥 Nhiệt Động Học & Ma Sát</span>
                            <p className="text-gray-300 leading-relaxed">
                              {ex.physicsImpactDetail.thermodynamicsAndFriction}
                            </p>
                          </div>
                          <div className="p-2 rounded bg-gray-900/90 border border-white/5 space-y-1">
                            <span className="text-red-400 font-bold block">🌋 Phá Hủy Địa Hình Thực Thụ</span>
                            <p className="text-gray-300 leading-relaxed">
                              {ex.physicsImpactDetail.structuralDamageToEnvironment}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Physics Mechanics Summary */}
                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200">
                  <span className="font-bold text-purple-300 block mb-0.5">⚛️ Tổng kết nguyên lý vật lý chi phối:</span>
                  <p className="font-mono text-[11px]">{currentDuelScene.physicsMechanicsSummary}</p>
                </div>

                {/* 5. Master Prose Excerpt */}
                <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-bold text-amber-300 font-serif flex items-center gap-1.5">
                      <span>📜</span> Đoạn Văn Mẫu Giao Đấu Đỉnh Cao (Văn Phong Chuẩn Điện Ảnh):
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {currentDuelScene.masterProseExcerpt.split(/\s+/).length} chữ
                    </span>
                  </div>
                  <p className="text-xs font-serif leading-relaxed text-gray-200 whitespace-pre-line italic bg-gray-950/70 p-3 rounded-lg border border-white/5">
                    {currentDuelScene.masterProseExcerpt}
                  </p>
                </div>
              </div>

              {/* AI Custom Duel Simulator Panel */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border border-red-500/30 space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-xs font-black text-red-300 uppercase tracking-wider flex items-center gap-2">
                    <span>⚡</span> Trình Mô Phỏng Thư Hùng Đối Kháng Tùy Chỉnh (Custom Duel Simulator)
                  </h3>
                  <span className="text-[10px] text-gray-400">Chọn 2 nhân vật, vũ khí & hiện tượng vật lý</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-amber-300 block mb-1">Đấu Thủ 1 (Tên):</label>
                    <input
                      type="text"
                      value={duelCharA}
                      onChange={(e) => setDuelCharA(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-amber-300 block mb-1">Vũ Khí / Tuyệt Kỹ 1:</label>
                    <input
                      type="text"
                      value={duelWeaponA}
                      onChange={(e) => setDuelWeaponA(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-cyan-300 block mb-1">Đấu Thủ 2 (Tên):</label>
                    <input
                      type="text"
                      value={duelCharB}
                      onChange={(e) => setDuelCharB(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-cyan-300 block mb-1">Vũ Khí / Tuyệt Kỹ 2:</label>
                    <input
                      type="text"
                      value={duelWeaponB}
                      onChange={(e) => setDuelWeaponB(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-gray-300 block mb-1">Không Gian & Thời Gian Đấu Trường:</label>
                    <input
                      type="text"
                      value={duelEnvironment}
                      onChange={(e) => setDuelEnvironment(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-[11px] font-bold text-purple-300 block mb-1">Nguyên Lý Vật Lý Chi Phối Trận Đánh:</label>
                    <select
                      value={duelPhysicsEffect}
                      onChange={(e) => setDuelPhysicsEffect(e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg bg-black/60 border border-gray-700 text-xs text-purple-200"
                    >
                      {PHYSICS_IMPACT_PRINCIPLES.map((prin, pIdx) => (
                        <option key={pIdx} value={prin.principle}>
                          {prin.principle} — {prin.desc.slice(0, 70)}...
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleGenerateCustomDuel}
                    disabled={isDuelSimulating}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-black shadow-lg shadow-red-950 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isDuelSimulating ? (
                      <>
                        <Spinner size="sm" />
                        <span>Đang mô phỏng thư hùng vật lý...</span>
                      </>
                    ) : (
                      <>
                        <span>⚡</span>
                        <span>MÔ PHỎNG TRẬN THƯ HÙNG VẬT LÝ BẰNG AI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Generated Duel Output */}
                {duelSimulatedProse && (
                  <div className="p-4 rounded-xl bg-black/80 border border-red-500/40 space-y-2 mt-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-300 flex items-center gap-1.5">
                        <span>✨</span> Kết Quả Giao Đấu: {duelCharA} vs {duelCharB}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(duelSimulatedProse);
                            showToast('Đã sao chép phân cảnh!');
                          }}
                          className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-[10px] text-gray-300 rounded font-bold cursor-pointer"
                        >
                          📋 Copy
                        </button>
                        {onInsertText && (
                          <button
                            onClick={() => {
                              onInsertText(`\n${duelSimulatedProse}\n`);
                              showToast('Đã chèn vào chương!');
                            }}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-[10px] text-white rounded font-black cursor-pointer"
                          >
                            ✍️ Chèn vào truyện
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-200 font-serif leading-relaxed whitespace-pre-line italic">
                      {duelSimulatedProse}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
