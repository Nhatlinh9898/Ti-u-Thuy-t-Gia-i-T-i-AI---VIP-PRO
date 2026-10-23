import React, { useState } from 'react';
import {
  ElementalCultivationManual,
  TechniqueFusionResult,
  CatalyzedBreakthrough,
  CharacterProfile
} from '../types';
import {
  COMPREHENSIVE_MANUALS_DATABASE,
  PRESET_CATALYZED_BREAKTHROUGHS
} from '../data/presetElementalManuals';
import {
  generateCultivationManual,
  fuseTechniques,
  simulateCatalyzedBreakthrough
} from '../services/geminiService';

interface ElementalManualsStudioProps {
  genre?: string;
  characters?: CharacterProfile[];
  onInsertText?: (text: string) => void;
}

const ELEMENT_TAGS = [
  { key: 'all', label: 'Tất cả (15+)', icon: '🌟', bg: 'bg-gray-800' },
  { key: 'Kim', label: 'Kim (Sát Phạt)', icon: '🟡', bg: 'bg-amber-950/80 text-amber-300 border-amber-500/40' },
  { key: 'Mộc', label: 'Mộc (Trường Sinh)', icon: '🟢', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' },
  { key: 'Thủy', label: 'Thủy (Triều Dâng)', icon: '🔵', bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40' },
  { key: 'Hỏa', label: 'Hỏa (Liệt Diễm)', icon: '🔴', bg: 'bg-rose-950/80 text-rose-300 border-rose-500/40' },
  { key: 'Thổ', label: 'Thổ (Sơn Nhạc)', icon: '🟤', bg: 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40' },
  { key: 'Lôi', label: 'Lôi (Thiên Kiếp)', icon: '⚡', bg: 'bg-violet-950/80 text-violet-300 border-violet-500/40' },
  { key: 'Phong', label: 'Phong (Cuồng Phong)', icon: '🌪️', bg: 'bg-teal-950/80 text-teal-300 border-teal-500/40' },
  { key: 'Băng', label: 'Băng (Cực Âm)', icon: '❄️', bg: 'bg-sky-950/80 text-sky-300 border-sky-500/40' },
  { key: 'Âm Dương', label: 'Âm Dương', icon: '☯️', bg: 'bg-slate-900/90 text-slate-200 border-slate-500/40' },
  { key: 'Thôn Phệ', label: 'Thôn Phệ', icon: '🕳️', bg: 'bg-purple-950/80 text-purple-300 border-purple-500/40' },
  { key: 'Không Gian', label: 'Thời Không', icon: '🌌', bg: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40' },
  { key: 'Huyết Mạch', label: 'Thần Thú', icon: '🐉', bg: 'bg-red-950/80 text-red-300 border-red-500/40' },
  { key: 'Hỗn Độn', label: 'Hỗn Độn', icon: '🌀', bg: 'bg-fuchsia-950/80 text-fuchsia-300 border-fuchsia-500/40' }
];

export const ElementalManualsStudio: React.FC<ElementalManualsStudioProps> = ({
  genre = 'Tiên Hiệp',
  characters = [],
  onInsertText
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'encyclopedia' | 'fusion' | 'breakthrough' | 'aiCreator'>('encyclopedia');

  // Manuals list state
  const [manuals, setManuals] = useState<ElementalCultivationManual[]>(COMPREHENSIVE_MANUALS_DATABASE);
  const [selectedManualId, setSelectedManualId] = useState<string>(COMPREHENSIVE_MANUALS_DATABASE[0].id);

  // Filter states
  const [filterElement, setFilterElement] = useState<string>('all');
  const [filterSchool, setFilterSchool] = useState<string>('all');
  const [filterRank, setFilterRank] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  // Chant modal state
  const [chantRecitingManual, setChantRecitingManual] = useState<ElementalCultivationManual | null>(null);

  // -------------------------------------------------------------------------
  // FUSION STUDIO STATE
  // -------------------------------------------------------------------------
  const [primaryManualId, setPrimaryManualId] = useState<string>(COMPREHENSIVE_MANUALS_DATABASE[0].id);
  const [secondaryManualId, setSecondaryManualId] = useState<string>(COMPREHENSIVE_MANUALS_DATABASE[1].id);
  const [catalystIdea, setCatalystIdea] = useState<string>('Lấy Âm Dương điều hòa hoặc Hỗn Độn quy nhất, biến tương khắc thành tương sinh');
  const [fusionResults, setFusionResults] = useState<TechniqueFusionResult[]>([
    {
      id: 'fusion_demo_1',
      parentNames: ['Thái Ất Canh Kim Sát Kiếm Quyết', 'Cửu Chuyển Thanh Mộc Trường Sinh Kinh'],
      fusedName: 'Thanh Mộc Canh Kim Vạn Kiếm Trường Sinh Điển',
      fusedElement: 'Kim Mộc Song Tu (Cực Hạn Sinh & Sát)',
      fusedSchool: 'Tâm Pháp Kiếm Trận Hợp Nhất',
      fusedRank: 'Thiên Giai Đỉnh Phong',
      fusionPrinciple: 'Lấy mầm sống Ất Mộc nuôi dưỡng Canh Kim sát ý; khi kiếm chém ra vừa mang sức hủy diệt vô song, vừa tự động hút sinh cơ hồi phục cho chủ nhân.',
      uniquePhenomenon: 'Sau lưng mọc lên một gốc Cổ Thụ bằng kiếm khí vàng rực, lá rụng hóa thành vạn thanh phi kiếm xé rách mây trời.',
      corePhilosophy: 'Sát trong Sinh, Sinh trong Sát. Chém đứt vạn vật để tạo lập cõi trường sinh.',
      chantMnemonic: 'Kim Mộc giao hòa, sinh tử tuần hoàn.\nKiếm khai vạn dặm, mộc dưỡng trường sinh.\nNhất kiếm diệt tà, nhất diệp hóa thần.\nSinh sát tại ngã, vạn cổ bất ma!',
      proseNarrative: 'Hai luồng chân khí xanh lục và vàng ánh kim va chạm dữ dội trong khí hải, như rồng thiêng quấn lấy đại thụ. Đan điền nứt toác rồi liền lại trong nháy mắt. Khi Lăng Tiêu vung tay, một thanh mộc kiếm xanh biếc bao bọc bởi Canh Kim sát khí sắc lẹm xé rách hư không, vừa trảm đứt đầu ma đầu vừa cứu sống đồng môn bên cạnh!',
      layers: [
        {
          layerNumber: 1,
          name: 'Kim Mộc Đan Thai (Tầng 1 - 3)',
          requirements: 'Trúc Cơ Kỳ',
          effects: 'Kinh mạch biến thành màu vàng lục, vừa sắc bén như bảo kiếm vừa dẻo dai bất tử.',
          cultivationMethod: 'Luyện hóa Canh Kim Chi Tinh hòa quyện với Thái Ất Mộc Tinh vào huyệt Lao Cung.'
        },
        {
          layerNumber: 2,
          name: 'Vạn Kiếm Bồ Đề Trận (Tầng 4 - 6)',
          requirements: 'Kim Đan Kỳ',
          effects: 'Triệu hồi vạn kiếm cắm quanh chiến trường tạo thành kiếm vực, đồng đội trong trận liên tục hồi phục thể lực, kẻ thù bị vạn kiếm lăng trì.',
          cultivationMethod: 'Đưa mười thanh bản mệnh phi kiếm cắm rễ vào đan điền nuôi bằng sinh khí.'
        },
        {
          layerNumber: 3,
          name: 'Hóa Kiếm Vi Sinh (Viên Mãn)',
          requirements: 'Nguyên Anh Kỳ',
          effects: 'Một cọng cỏ ngọn lá trên tay đều có uy lực của thần kiếm trảm diệt ma đầu, thân thể tan vỡ có thể mượn kiếm đúc lại hình hài.',
          cultivationMethod: 'Tham ngộ quy tắc luân hồi Kim Mộc tại Hỗn Độn Giới.'
        }
      ],
      ultimateMoves: [
        {
          name: 'Bồ Đề Trảm Thiên Vạn Kiếm Quy',
          description: 'Hàng triệu chiếc lá bồ đề biến thành kim quang phi kiếm phủ kín vòm trời rồi hợp nhất thành một thanh cự kiếm bổ đôi sơn hà.',
          drawback: 'Cần tiêu hao 50 năm thọ nguyên nếu cưỡng ép thi triển khi chân nguyên cạn kiệt.'
        }
      ]
    },
    {
      id: 'fusion_demo_2',
      parentNames: ['Cửu U Phần Thiên Diễm Quyết', 'Cực Âm Huyền Băng Phá Hồn Kinh'],
      fusedName: 'Băng Hỏa Lưỡng Nghi Cực Cảnh Thần Quyết',
      fusedElement: 'Băng Hỏa Song Cực (Tuyệt Cảnh Âm Dương)',
      fusedSchool: 'Tâm Pháp Nội Công',
      fusedRank: 'Thần Giai / Cấm Kỵ',
      fusionPrinciple: 'Lấy âm hàn cực hạn bao bọc liệt hỏa cực hạn, nén áp lực tạo ra phản ứng bùng nổ chân nguyên gấp mười lần.',
      uniquePhenomenon: 'Nửa bên thân thể bốc cháy ngọn lửa tím đỏ, nửa bên tỏa sương lam đóng băng hư không, đất dưới chân vừa sôi trào nham thạch vừa hóa sông băng.',
      corePhilosophy: 'Vật cực tất phản. Lửa đốt cháy băng, băng nuôi dưỡng lửa, âm dương hỗ trợ phá toái càn khôn.',
      chantMnemonic: 'Cực hàn sinh nhiệt, chí nhiệt hóa hàn.\nBăng hỏa tương dung, nghịch thiên cải mệnh.\nTả thủ chưởng băng, hữu thủ chấp hỏa.\nNhất niệm luân hồi, vạn pháp quy tịch!',
      proseNarrative: 'Cả căn mật thất rung chuyển bần bật khi hai dòng năng lượng đối nghịch cùng tràn vào kinh mạch. Da thịt chàng rách toạc rồi đóng băng, máu trào ra bốc cháy ngùn ngụt. Đột nhiên, một tiếng nổ trầm đục vang lên, hai luồng sáng hòa làm một tạo thành ngọn lửa màu tím lam kỳ dị không tỏa nhiệt nhưng lại thiêu rụi cả thần hồn!',
      layers: [
        {
          layerNumber: 1,
          name: 'Lưỡng Cực Đan Phôi (Tầng 1 - 3)',
          requirements: 'Trúc Cơ Đỉnh Phong',
          effects: 'Đòn đánh mang đồng thời hai hiệu ứng thiêu đốt và đóng băng, phá hủy hộ thể linh quang của mọi đối thủ.',
          cultivationMethod: 'Ngồi thiền tại giao điểm giữa hồ băng và suối nước nóng địa nhiệt.'
        },
        {
          layerNumber: 2,
          name: 'Băng Hỏa Long Phượng (Tầng 4 - 6)',
          requirements: 'Kim Đan Kỳ',
          effects: 'Triệu hoán Băng Phượng và Hỏa Long hộ thể, tự động phản kích đòn đánh cận chiến và tầm xa.',
          cultivationMethod: 'Luyện hóa đồng thời Địa Hỏa Tinh Sa và Vạn Niên Băng Tủy.'
        },
        {
          layerNumber: 3,
          name: 'Tịch Diệt Sương Diễm (Viên Mãn)',
          requirements: 'Hóa Thần Kỳ',
          effects: 'Phát tán ngọn lửa màu lam tím đóng băng linh lực và thiêu rụi nguyên thần kẻ địch trong bán kính vạn trượng.',
          cultivationMethod: 'Tham ngộ quy tắc Lưỡng Nghi tại Hỗn Độn Chi Nhãn.'
        }
      ],
      ultimateMoves: [
        {
          name: 'Băng Diễm Hủy Diệt Đóa Liên',
          description: 'Ngưng tụ một đóa sen băng trong suốt với nhụy sen là hỏa diễm Cửu U nén lại, ném ra tạo hố sâu ngàn trượng xóa sổ quân đoàn địch.',
          drawback: 'Nếu dao động tâm cảnh sẽ bị chân hỏa phản phệ đốt cháy kinh mạch.'
        }
      ]
    }
  ]);
  const [isFusing, setIsFusing] = useState<boolean>(false);

  // -------------------------------------------------------------------------
  // CATALYZED BREAKTHROUGH STATE
  // -------------------------------------------------------------------------
  const [breakthroughs, setBreakthroughs] = useState<Array<CatalyzedBreakthrough & { proseSegment?: string }>>(PRESET_CATALYZED_BREAKTHROUGHS);
  const [selectedBreakthroughId, setSelectedBreakthroughId] = useState<string>(PRESET_CATALYZED_BREAKTHROUGHS[0].id);

  // Form for new breakthrough simulation
  const [breakthroughCharacter, setBreakthroughCharacter] = useState<string>(characters[0]?.name || 'Lăng Tiêu');
  const [breakthroughTargetRealm, setBreakthroughTargetRealm] = useState<string>('Kim Đan Kỳ (Tử Phủ Đan Thai)');
  const [breakthroughCatalystType, setBreakthroughCatalystType] = useState<string>('Kỳ Chân Dị Bảo');
  const [breakthroughCatalystName, setBreakthroughCatalystName] = useState<string>('Cửu U Quỷ Hỏa & Cửu Chuyển Hoàn Hồn Thảo');
  const [breakthroughPlace, setBreakthroughPlace] = useState<string>('Đáy Miệng Núi Lửa Băng Hỏa Cực Uyên');
  const [breakthroughTechnique, setBreakthroughTechnique] = useState<string>('Hỗn Độn Khai Thiên Quyết');
  const [breakthroughPrompt, setBreakthroughPrompt] = useState<string>('Đột phá giữa lúc bị kẻ thù vây hãm, dẫn thiên kiếp diệt sát đối phương');
  const [isSimulatingBreakthrough, setIsSimulatingBreakthrough] = useState<boolean>(false);

  // -------------------------------------------------------------------------
  // AI CREATOR STATE
  // -------------------------------------------------------------------------
  const [aiManualName, setAiManualName] = useState<string>('');
  const [aiManualElement, setAiManualElement] = useState<string>('Lôi (Thiên Kiếp / Tử Tiêu)');
  const [aiManualSchool, setAiManualSchool] = useState<string>('Tâm Pháp Nội Công');
  const [aiManualRank, setAiManualRank] = useState<string>('Thiên Giai');
  const [aiManualIdea, setAiManualIdea] = useState<string>('Khống chế thiên lôi tôi luyện thể phách, ngưng tụ Tử Tiêu Thần Lôi trảm sát tà ma');
  const [isGeneratingManual, setIsGeneratingManual] = useState<boolean>(false);

  // Derived filtered manuals
  const filteredManuals = manuals.filter(m => {
    if (filterElement !== 'all' && !m.element.includes(filterElement)) return false;
    if (filterSchool !== 'all' && m.school !== filterSchool) return false;
    if (filterRank !== 'all' && m.rank !== filterRank) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.corePhilosophy.toLowerCase().includes(q) ||
        m.origin.toLowerCase().includes(q) ||
        (m.chantMnemonic && m.chantMnemonic.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const selectedManual = manuals.find(m => m.id === selectedManualId) || manuals[0];
  const selectedBreakthrough = breakthroughs.find(b => b.id === selectedBreakthroughId) || breakthroughs[0];

  // Quick Fusion Presets
  const handleApplyFusionPreset = (primaryId: string, secondaryId: string, idea: string) => {
    setPrimaryManualId(primaryId);
    setSecondaryManualId(secondaryId);
    setCatalystIdea(idea);
    setActiveTab('fusion');
  };

  // Handlers
  const handleFuseTechniques = async () => {
    const primary = manuals.find(m => m.id === primaryManualId) || manuals[0];
    const secondary = manuals.find(m => m.id === secondaryManualId) || manuals[1];
    if (primary.id === secondary.id) {
      alert('Vui lòng chọn 2 môn công pháp khác nhau để dung hợp!');
      return;
    }

    try {
      setIsFusing(true);
      const fused = await fuseTechniques({
        primaryManual: primary,
        secondaryManual: secondary,
        catalystIdea,
        genre
      });
      setFusionResults(prev => [fused, ...prev]);
      alert(`Đã dung hợp thành công môn công pháp mới: ${fused.fusedName}!`);
    } catch (err: any) {
      alert('Lỗi dung hợp công pháp: ' + err.message);
    } finally {
      setIsFusing(false);
    }
  };

  const handleSimulateBreakthrough = async () => {
    try {
      setIsSimulatingBreakthrough(true);
      const characterObj = characters.find(c => c.name === breakthroughCharacter) || {
        name: breakthroughCharacter,
        realmOrRank: 'Trúc Cơ Kỳ'
      };

      const result = await simulateCatalyzedBreakthrough({
        character: characterObj,
        targetRealm: breakthroughTargetRealm,
        catalystType: breakthroughCatalystType,
        catalystName: breakthroughCatalystName,
        ritualPlace: breakthroughPlace,
        techniqueUsed: breakthroughTechnique,
        customPrompt: breakthroughPrompt,
        genre
      });

      setBreakthroughs(prev => [result, ...prev]);
      setSelectedBreakthroughId(result.id);
      alert(`Đã mô phỏng đột phá thành công: ${result.title}!`);
    } catch (err: any) {
      alert('Lỗi mô phỏng đột phá: ' + err.message);
    } finally {
      setIsSimulatingBreakthrough(false);
    }
  };

  const handleGenerateManual = async () => {
    try {
      setIsGeneratingManual(true);
      const generated = await generateCultivationManual({
        name: aiManualName,
        element: aiManualElement,
        school: aiManualSchool,
        rank: aiManualRank,
        userIdea: aiManualIdea,
        genre
      });

      setManuals(prev => [generated, ...prev]);
      setSelectedManualId(generated.id);
      setActiveTab('encyclopedia');
      alert(`Đã sáng tạo công pháp thành công: ${generated.name}!`);
    } catch (err: any) {
      alert('Lỗi sáng tạo công pháp: ' + err.message);
    } finally {
      setIsGeneratingManual(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white select-none">
      {/* Header Banner */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-emerald-950/60 to-purple-950/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-700 to-indigo-800 flex items-center justify-center text-xl shadow-lg shadow-emerald-950/60 border border-emerald-400/40">
            📜
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 tracking-wide uppercase">
                Tạng Kinh Các • Ngũ Hành Công Pháp & Dung Hợp Đột Phá
              </h2>
              <span className="text-[10px] bg-emerald-950 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                {manuals.length} Môn Bí Điển
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Ngũ Hành & Dị Chủng • Khẩu quyết chu thiên • Lò luyện dung hợp • Đột phá cùng kỳ chân dị bảo & thần binh
            </p>
          </div>
        </div>

        {/* Action quick shortcut */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('aiCreator')}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-gray-950 text-xs font-black rounded-lg shadow-md flex items-center gap-1.5 transition-all"
          >
            <span>✨</span> Sáng Tạo Công Pháp
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="px-4 py-2 border-b border-white/10 bg-gray-900/70 flex items-center gap-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('encyclopedia')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
            activeTab === 'encyclopedia'
              ? 'bg-gradient-to-r from-emerald-700 to-teal-800 text-vip-gold border border-emerald-400/50 shadow-md'
              : 'bg-gray-800/60 text-gray-400 hover:text-white'
          }`}
        >
          <span>📚</span> Bách Khoa Công Pháp ({manuals.length})
        </button>

        <button
          onClick={() => setActiveTab('fusion')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
            activeTab === 'fusion'
              ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-pink-200 border border-purple-400/50 shadow-md'
              : 'bg-gray-800/60 text-gray-400 hover:text-white'
          }`}
        >
          <span>⚗️</span> Lò Dung Hợp Công Pháp ({fusionResults.length})
        </button>

        <button
          onClick={() => setActiveTab('breakthrough')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
            activeTab === 'breakthrough'
              ? 'bg-gradient-to-r from-amber-700 to-rose-800 text-amber-200 border border-amber-400/50 shadow-md'
              : 'bg-gray-800/60 text-gray-400 hover:text-white'
          }`}
        >
          <span>⚡</span> Đột Phá Kèm Kỳ Bảo & Dị Biến ({breakthroughs.length})
        </button>

        <button
          onClick={() => setActiveTab('aiCreator')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
            activeTab === 'aiCreator'
              ? 'bg-gradient-to-r from-cyan-700 to-blue-800 text-cyan-200 border border-cyan-400/50 shadow-md'
              : 'bg-gray-800/60 text-gray-400 hover:text-white'
          }`}
        >
          <span>🤖</span> AI Tông Sư Sáng Chế
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5">
        {/* ================================================================= */}
        {/* TAB 1: BÁCH KHOA CÔNG PHÁP NGŨ HÀNH                                */}
        {/* ================================================================= */}
        {activeTab === 'encyclopedia' && (
          <div className="space-y-5">
            {/* 1-Click Elemental Quick Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {ELEMENT_TAGS.map(tag => (
                <button
                  key={tag.key}
                  onClick={() => setFilterElement(tag.key)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 whitespace-nowrap transition-all border ${
                    filterElement === tag.key
                      ? 'ring-2 ring-emerald-400 font-black scale-105 shadow-md ' + tag.bg
                      : 'bg-gray-950/60 text-gray-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span>{tag.icon}</span> {tag.label}
                </button>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="p-3 bg-gray-900/80 rounded-xl border border-white/10 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 flex-1 min-w-[200px]">
                <span className="text-gray-400 text-xs">🔍</span>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={e => setSearchKeyword(e.target.value)}
                  placeholder="Tìm công pháp, khẩu quyết, lai lịch..."
                  className="w-full bg-gray-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* School Filter */}
              <select
                value={filterSchool}
                onChange={e => setFilterSchool(e.target.value)}
                className="bg-gray-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-gray-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả Hệ Phái</option>
                <option value="Tâm Pháp Nội Công">Tâm Pháp Nội Công</option>
                <option value="Luyện Thể Ngoại Công">Luyện Thể Ngoại Công</option>
                <option value="Thân Pháp Bộ Pháp">Thân Pháp Bộ Pháp</option>
                <option value="Kiếm Pháp / Đao Quyết Sát Phạt">Kiếm Pháp / Đao Quyết</option>
                <option value="Thần Hồn & Huyễn Thuật Bí Pháp">Thần Hồn & Huyễn Thuật</option>
                <option value="Phụ Tu (Đan / Trận / Phù / Khí)">Phụ Tu (Đan / Trận / Phù / Khí)</option>
              </select>

              {/* Rank Filter */}
              <select
                value={filterRank}
                onChange={e => setFilterRank(e.target.value)}
                className="bg-gray-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-gray-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tất cả Phẩm Giai</option>
                <option value="Hoàng Giai">Hoàng Giai</option>
                <option value="Huyền Giai">Huyền Giai</option>
                <option value="Địa Giai">Địa Giai</option>
                <option value="Thiên Giai">Thiên Giai</option>
                <option value="Thần Giai / Cấm Kỵ">Thần Giai / Cấm Kỵ</option>
              </select>
            </div>

            {/* List and Details Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Selector List */}
              <div className="lg:col-span-4 space-y-2 max-h-[620px] overflow-y-auto custom-scrollbar pr-1">
                {filteredManuals.map(m => {
                  const isSelected = m.id === selectedManual.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedManualId(m.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-emerald-400/80 shadow-lg'
                          : 'bg-gray-950/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                          {m.rank}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400">
                          {m.element.split(' ')[0]}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-vip-gold line-clamp-1">{m.name}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">{m.school}</p>
                      <p className="text-[10px] text-gray-500 italic mt-1 line-clamp-1">"{m.corePhilosophy}"</p>
                    </div>
                  );
                })}
              </div>

              {/* Right Manual Details */}
              <div className="lg:col-span-8">
                {selectedManual && (
                  <div className="p-6 rounded-2xl bg-gray-950 border border-emerald-500/30 space-y-5">
                    {/* Header Details */}
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
                      <div>
                        <div className="flex flex-wrap gap-2 items-center mb-1.5">
                          <span className="text-xs font-mono uppercase text-emerald-300 font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40">
                            {selectedManual.element}
                          </span>
                          <span className="text-xs font-mono text-purple-300 font-bold px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-500/40">
                            {selectedManual.rank}
                          </span>
                          <span className="text-xs font-mono text-amber-300 font-bold px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/40">
                            {selectedManual.school}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-vip-gold mt-1">{selectedManual.name}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Nguồn gốc: {selectedManual.origin}</p>
                        {selectedManual.compatibilities && (
                          <p className="text-[11px] text-amber-300/90 mt-1">
                            ✨ Thể chất / Linh căn tương thích: {selectedManual.compatibilities}
                          </p>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {onInsertText && (
                          <button
                            onClick={() => {
                              const manualText = `[CÔNG PHÁP TU LUYỆN: ${selectedManual.name} (${selectedManual.rank})]\n` +
                                `• Thuộc tính: ${selectedManual.element}\n` +
                                `• Hệ phái: ${selectedManual.school}\n` +
                                `• Lai lịch: ${selectedManual.origin}\n` +
                                `• Yêu cầu nhập môn: ${selectedManual.entryRequirements}\n` +
                                (selectedManual.compatibilities ? `• Thể chất tương thích: ${selectedManual.compatibilities}\n` : '') +
                                `• Triết lý đạo pháp: "${selectedManual.corePhilosophy}"\n` +
                                (selectedManual.chantMnemonic ? `• KHẨU QUYẾT CHÂN NGÔN:\n${selectedManual.chantMnemonic}\n` : '') +
                                (selectedManual.meridianRoute ? `• Lộ trình kinh mạch: ${selectedManual.meridianRoute}\n` : '') +
                                `• CÁC TẦNG CẢNH GIỚI TIẾN HÓA:\n` +
                                selectedManual.layers.map(l => `  - Tầng ${l.layerNumber} (${l.name} - Yêu cầu: ${l.requirements}): ${l.effects} (Cách luyện: ${l.cultivationMethod})`).join('\n') +
                                (selectedManual.ultimateMoves?.length ? `\n• TUYỆT KỸ SÁT CHIÊU TRẤN PHÁI: ` + selectedManual.ultimateMoves.map(u => `${u.name} (${u.description} - Hạn chế: ${u.drawback})`).join('; ') : '');
                              onInsertText(manualText);
                              alert('Đã chèn toàn bộ chi tiết công pháp vào chương truyện!');
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1"
                          >
                            <span>📥</span> Chèn Cả Bộ Công Pháp
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setPrimaryManualId(selectedManual.id);
                            setActiveTab('fusion');
                          }}
                          className="px-3 py-1.5 bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-purple-200 rounded-lg text-xs font-bold flex items-center gap-1"
                        >
                          <span>⚗️</span> Đưa Vào Lò Dung Hợp
                        </button>
                      </div>
                    </div>

                    {/* Entry Requirements & Core Philosophy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-gray-900/70 border border-white/5 rounded-xl space-y-1">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <span>🚪</span> Điều Kiện Nhập Môn:
                        </span>
                        <p className="text-gray-300 leading-relaxed">{selectedManual.entryRequirements}</p>
                      </div>
                      <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span>📜</span> Triết Lý Đạo Tâm:
                        </span>
                        <p className="text-gray-200 italic font-medium leading-relaxed">"{selectedManual.corePhilosophy}"</p>
                      </div>
                    </div>

                    {/* HIGHLIGHT: KHẨU QUYẾT CHÂN NGÔN & VẬN HÀNH KINH MẠCH */}
                    {selectedManual.chantMnemonic && (
                      <div className="p-4 bg-gradient-to-br from-amber-950/30 via-gray-950 to-emerald-950/30 border-2 border-amber-500/40 rounded-2xl space-y-3 relative overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase text-amber-300 flex items-center gap-1.5 tracking-wider">
                            <span>🪷</span> Khẩu Quyết Chân Ngôn & Chu Thiên Kinh Mạch
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setChantRecitingManual(selectedManual)}
                              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 rounded text-[11px] font-bold flex items-center gap-1"
                            >
                              <span>🧘‍♂️</span> Ngâm Tụng Khẩu Quyết
                            </button>
                            {onInsertText && (
                              <button
                                onClick={() => {
                                  const chantText = `[KHẨU QUYẾT ${selectedManual.name.toUpperCase()}]:\n"${selectedManual.chantMnemonic}"\n${selectedManual.meridianRoute ? `(Lộ trình kinh mạch: ${selectedManual.meridianRoute})` : ''}`;
                                  onInsertText(chantText);
                                  alert('Đã chèn khẩu quyết vào bản thảo!');
                                }}
                                className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-emerald-200 rounded text-[11px] font-bold flex items-center gap-1"
                              >
                                <span>📥</span> Chèn Khẩu Quyết
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Poetic Chant Box */}
                        <div className="p-3.5 bg-black/50 border border-amber-500/20 rounded-xl text-center">
                          <p className="text-sm font-serif font-bold text-amber-200 whitespace-pre-line leading-relaxed tracking-wide italic">
                            "{selectedManual.chantMnemonic}"
                          </p>
                        </div>

                        {/* Meridian Route if present */}
                        {selectedManual.meridianRoute && (
                          <div className="text-[11px] text-gray-300 bg-gray-900/60 p-2.5 rounded-lg border border-white/5">
                            <strong className="text-cyan-300 font-bold block mb-0.5">🌀 Tuyến Đường Dẫn Khí Chu Thiên:</strong>
                            <p className="leading-relaxed">{selectedManual.meridianRoute}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Cultivation Layers by Progression */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider flex items-center gap-2">
                        <span>📈</span> Các Tầng Cảnh Giới Tiến Hóa ({selectedManual.layers.length} Tầng)
                      </h4>
                      <div className="space-y-3">
                        {selectedManual.layers.map(layer => (
                          <div
                            key={layer.layerNumber}
                            className="p-4 bg-gray-900/70 rounded-xl border border-white/10 space-y-2 text-xs hover:border-emerald-500/30 transition-all"
                          >
                            <div className="flex flex-wrap justify-between items-center pb-1.5 border-b border-white/5 gap-2">
                              <span className="text-sm font-bold text-vip-gold">
                                Tầng {layer.layerNumber}: {layer.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-purple-300 font-mono bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                                  Yêu cầu: {layer.requirements}
                                </span>
                                {onInsertText && (
                                  <button
                                    onClick={() => {
                                      const layerText = `[${selectedManual.name} - Tầng ${layer.layerNumber}: ${layer.name}]\n• Yêu cầu: ${layer.requirements}\n• Hiệu quả: ${layer.effects}\n• Vận công: ${layer.cultivationMethod}`;
                                      onInsertText(layerText);
                                      alert(`Đã chèn Tầng ${layer.layerNumber} vào bản thảo!`);
                                    }}
                                    className="text-[10px] text-emerald-300 hover:underline"
                                  >
                                    Chèn tầng này
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                              <div>
                                <span className="text-emerald-400 font-bold block mb-0.5">💥 Hiệu Quả Thực Chiến & Biến Đổi:</span>
                                <p className="text-gray-300 leading-relaxed">{layer.effects}</p>
                              </div>
                              <div>
                                <span className="text-cyan-400 font-bold block mb-0.5">🧘‍♂️ Phương Pháp Vận Hành Chu Thiên:</span>
                                <p className="text-gray-300 leading-relaxed">{layer.cultivationMethod}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ultimate Moves */}
                    {selectedManual.ultimateMoves && selectedManual.ultimateMoves.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                          <span>🗡️</span> Tuyệt Kỹ Sát Chiêu Trấn Phái
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedManual.ultimateMoves.map((move, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 bg-rose-950/20 border border-rose-500/30 rounded-xl text-xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-rose-300 font-bold text-sm">{move.name}</span>
                                {onInsertText && (
                                  <button
                                    onClick={() => {
                                      const moveText = `[TUYỆT KỸ: ${move.name}]\n${move.description}\n(Hạn chế: ${move.drawback})`;
                                      onInsertText(moveText);
                                      alert('Đã chèn tuyệt kỹ vào bản thảo!');
                                    }}
                                    className="text-[10px] text-rose-300 hover:underline"
                                  >
                                    Chèn tuyệt kỹ
                                  </button>
                                )}
                              </div>
                              <p className="text-gray-200 leading-relaxed">{move.description}</p>
                              <div className="pt-1 border-t border-rose-500/20">
                                <span className="text-gray-400 text-[11px] font-semibold">⚠️ Hạn chế / Phản phệ: </span>
                                <span className="text-gray-300 text-[11px]">{move.drawback}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: LÒ DUNG HỢP CÔNG PHÁP                                      */}
        {/* ================================================================= */}
        {activeTab === 'fusion' && (
          <div className="space-y-6">
            {/* Quick Fusion Presets */}
            <div className="p-3 bg-purple-950/30 rounded-xl border border-purple-500/30 flex items-center gap-2 overflow-x-auto custom-scrollbar">
              <span className="text-[11px] font-bold text-purple-300 whitespace-nowrap">⚡ Mẫu Dung Hợp Tiêu Biểu:</span>
              <button
                onClick={() => handleApplyFusionPreset('manual_thai_at_canh_kim', 'manual_thanh_moc_truong_sinh', 'Lấy mầm sống Ất Mộc nuôi dưỡng Canh Kim sát ý; khi kiếm chém ra vừa mang sức hủy diệt vô song, vừa tự động hút sinh cơ hồi phục')}
                className="px-2.5 py-1 bg-gray-900 border border-purple-400/40 hover:bg-purple-900/40 text-[11px] rounded-lg text-vip-gold font-bold whitespace-nowrap"
              >
                🌾 Canh Kim + Ất Mộc (Kiếm Sinh Điển)
              </button>
              <button
                onClick={() => handleApplyFusionPreset('manual_cuu_u_phan_thien', 'manual_cuc_bang_huyen_nguyet', 'Lấy âm hàn cực hạn bao bọc liệt hỏa cực hạn, nén áp lực tạo ra phản ứng bùng nổ chân nguyên')}
                className="px-2.5 py-1 bg-gray-900 border border-purple-400/40 hover:bg-purple-900/40 text-[11px] rounded-lg text-cyan-300 font-bold whitespace-nowrap"
              >
                ❄️🔥 Hỏa + Băng (Băng Hỏa Lưỡng Cực)
              </button>
              <button
                onClick={() => handleApplyFusionPreset('manual_thai_at_canh_kim', 'manual_cuu_thien_than_loi', 'Lấy Tử Tiêu Thần Lôi nung nấu Canh Kim Kiếm Khí, biến thành phi kiếm sấm sét trảm ma')}
                className="px-2.5 py-1 bg-gray-900 border border-purple-400/40 hover:bg-purple-900/40 text-[11px] rounded-lg text-amber-300 font-bold whitespace-nowrap"
              >
                ⚡ Kim + Lôi (Tử Tiêu Sát Kiếm)
              </button>
              <button
                onClick={() => handleApplyFusionPreset('manual_hon_don_khai_thien', 'manual_thap_phuong_thon_thien', 'Mượn Hỗn Độn vạn vật để tiêu hóa lực thôn phệ, nuốt chửng linh khí chư thiên mà không bị ma hóa')}
                className="px-2.5 py-1 bg-gray-900 border border-purple-400/40 hover:bg-purple-900/40 text-[11px] rounded-lg text-fuchsia-300 font-bold whitespace-nowrap"
              >
                🌀 Hỗn Độn + Thôn Phệ (Thái Sơ Ma Điển)
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 border border-purple-500/30 space-y-5">
              <div>
                <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-amber-300">
                  ⚗️ Lò Bát Quái Dung Hợp Công Pháp Độc Bản
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Chọn hai môn công pháp khác nhau (ví dụ: Hỏa + Băng, Kim + Mộc, Kiếm Pháp + Luyện Thể) để hòa quyện kinh mạch, triệt tiêu xung khắc và đột phá tạo thành môn võ học tuyệt thế mới.
                </p>
              </div>

              {/* Selection inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Primary Manual */}
                <div className="p-4 bg-gray-900/80 rounded-xl border border-white/10 space-y-2">
                  <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <span>1️⃣</span> Môn Công Pháp Cốt Lõi Thứ Nhất:
                  </label>
                  <select
                    value={primaryManualId}
                    onChange={e => setPrimaryManualId(e.target.value)}
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {manuals.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} [{m.element.split(' ')[0]} - {m.rank}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Secondary Manual */}
                <div className="p-4 bg-gray-900/80 rounded-xl border border-white/10 space-y-2">
                  <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>2️⃣</span> Môn Công Pháp Dung Nạp Thứ Hai:
                  </label>
                  <select
                    value={secondaryManualId}
                    onChange={e => setSecondaryManualId(e.target.value)}
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    {manuals.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name} [{m.element.split(' ')[0]} - {m.rank}]
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Catalyst and Idea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <span>💡</span> Vật Dẫn Hoặc Ý Tưởng Dung Hợp:
                </label>
                <input
                  type="text"
                  value={catalystIdea}
                  onChange={e => setCatalystIdea(e.target.value)}
                  placeholder="Ví dụ: Dùng Âm Dương Lưỡng Nghi Châu điều hòa, hoặc hòa quyện Hỏa Băng tương sinh tương khắc..."
                  className="w-full bg-gray-950 border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleFuseTechniques}
                disabled={isFusing}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isFusing
                    ? 'bg-purple-900/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:brightness-110 text-white shadow-purple-950/60'
                }`}
              >
                {isFusing ? (
                  <>
                    <span className="animate-spin text-base">🌀</span>
                    Đang nung chảy kinh mạch & dung hợp công pháp...
                  </>
                ) : (
                  <>
                    <span>⚗️</span> Tiến Hành Dung Hợp Sáng Tạo Công Pháp Mới
                  </>
                )}
              </button>
            </div>

            {/* List of Fused Techniques */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <span>🌟</span> Kho Tàng Công Pháp Sau Dung Hợp ({fusionResults.length})
              </h4>

              <div className="grid grid-cols-1 gap-5">
                {fusionResults.map(fused => (
                  <div
                    key={fused.id}
                    className="p-6 rounded-2xl bg-gray-950 border border-purple-500/40 space-y-4 shadow-xl"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex flex-wrap gap-2 items-center mb-1">
                          <span className="text-xs font-mono text-purple-300 font-bold px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-500/40">
                            {fused.fusedRank}
                          </span>
                          <span className="text-xs font-mono text-pink-300 font-bold px-2.5 py-0.5 rounded-full bg-pink-950 border border-pink-500/40">
                            {fused.fusedElement}
                          </span>
                          <span className="text-xs font-mono text-cyan-300 font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40">
                            {fused.fusedSchool}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-vip-gold mt-1">{fused.fusedName}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Dung hợp từ: <span className="text-amber-300 font-medium">{fused.parentNames.join(' ⨉ ')}</span>
                        </p>
                      </div>

                      {onInsertText && (
                        <button
                          onClick={() => {
                            const fusedText = `[CÔNG PHÁP DUNG HỢP: ${fused.fusedName} (${fused.fusedRank})]\n` +
                              `• Nguồn gốc: Dung hợp từ ${fused.parentNames.join(' và ')}\n` +
                              `• Thuộc tính biến dị: ${fused.fusedElement}\n` +
                              `• Hệ phái: ${fused.fusedSchool}\n` +
                              `• Nguyên lý dung hợp: ${fused.fusionPrinciple}\n` +
                              `• Dị tượng thiên địa: ${fused.uniquePhenomenon}\n` +
                              `• Khẩu quyết: "${fused.corePhilosophy}"\n` +
                              (fused.chantMnemonic ? `• KHẨU QUYẾT CHÂN NGÔN:\n"${fused.chantMnemonic}"\n` : '') +
                              `• Các tầng cảnh giới:\n` +
                              fused.layers.map(l => `  - Tầng ${l.layerNumber} (${l.name}): ${l.effects} (Cách tu: ${l.cultivationMethod})`).join('\n') +
                              (fused.ultimateMoves?.length ? `\n• Tuyệt kỹ mới: ` + fused.ultimateMoves.map(u => `${u.name} (${u.description})`).join('; ') : '') +
                              (fused.proseNarrative ? `\n\n--- PHÂN CẢNH TIỂU THUYẾT ---\n${fused.proseNarrative}` : '');
                            onInsertText(fusedText);
                            alert('Đã chèn công pháp dung hợp vào chương truyện!');
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1"
                        >
                          <span>📥</span> Chèn Vào Truyện
                        </button>
                      )}
                    </div>

                    {/* Fusion Principle and Phenomenon */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl space-y-1">
                        <span className="text-purple-300 font-bold flex items-center gap-1">
                          <span>🔬</span> Nguyên Lý Dung Hợp:
                        </span>
                        <p className="text-gray-300 leading-relaxed">{fused.fusionPrinciple}</p>
                      </div>

                      <div className="p-3 bg-pink-950/30 border border-pink-500/30 rounded-xl space-y-1">
                        <span className="text-pink-300 font-bold flex items-center gap-1">
                          <span>🌌</span> Dị Tượng Khi Vận Công:
                        </span>
                        <p className="text-gray-300 leading-relaxed">{fused.uniquePhenomenon}</p>
                      </div>
                    </div>

                    {/* Chant if present */}
                    {fused.chantMnemonic && (
                      <div className="p-3 bg-black/40 border border-amber-500/30 rounded-xl text-center">
                        <span className="text-[10px] text-amber-400 font-bold block mb-1 uppercase tracking-wider">
                          🪷 Khẩu Quyết Dung Hợp:
                        </span>
                        <p className="text-xs font-serif italic text-amber-200 whitespace-pre-line leading-relaxed">
                          "{fused.chantMnemonic}"
                        </p>
                      </div>
                    )}

                    {/* Narrative Prose Segment if present */}
                    {fused.proseNarrative && (
                      <div className="p-3.5 bg-gray-900/80 rounded-xl border border-yellow-500/30 text-xs space-y-1.5">
                        <span className="text-yellow-400 font-bold block">
                          📖 Phân Cảnh Dung Hợp Vào Tiểu Thuyết:
                        </span>
                        <p className="text-gray-300 italic border-l-2 border-amber-400 pl-3 leading-relaxed">
                          {fused.proseNarrative}
                        </p>
                      </div>
                    )}

                    {/* Layers */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                        Các Tầng Cảnh Giới Dung Hợp:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {fused.layers.map(layer => (
                          <div key={layer.layerNumber} className="p-3 bg-gray-900/60 rounded-xl border border-white/5 space-y-1 text-xs">
                            <div className="flex justify-between items-center text-vip-gold font-bold">
                              <span>Tầng {layer.layerNumber}: {layer.name}</span>
                            </div>
                            <p className="text-[11px] text-purple-300">Yêu cầu: {layer.requirements}</p>
                            <p className="text-gray-300 text-[11px]">• {layer.effects}</p>
                            <p className="text-gray-400 text-[10px] italic">• {layer.cultivationMethod}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ultimate Moves */}
                    {fused.ultimateMoves && fused.ultimateMoves.length > 0 && (
                      <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl text-xs space-y-1">
                        <span className="text-red-400 font-bold block mb-1">⚔️ Tuyệt Kỹ Độc Bản Đột Phá:</span>
                        {fused.ultimateMoves.map((m, idx) => (
                          <div key={idx}>
                            <p className="text-red-300 font-bold">
                              {m.name}: <span className="font-normal text-gray-200">{m.description}</span>
                            </p>
                            <p className="text-gray-400 text-[11px]">Hạn chế: {m.drawback}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: ĐỘT PHÁ CÙNG KỲ BẢO & DỊ BIẾN                              */}
        {/* ================================================================= */}
        {activeTab === 'breakthrough' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-gray-950 via-amber-950/30 to-rose-950/30 border border-amber-500/30 space-y-5">
              <div>
                <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-200 to-yellow-300">
                  ⚡ Nghi Thức Đột Phá Kèm Kỳ Chân Dị Bảo & Thần Binh
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Thiết lập phân cảnh nhân vật mượn một loại cơ duyên đặc thù (Dị Hỏa, Kiếm Thai Huyết Tế, Tàn Hồn Cổ Thần, Lôi Kiếp Hoá Đan) để xé rách bình cảnh, đón nhận biến dị thể chất và thần thông nghịch thiên.
                </p>
              </div>

              {/* Form setup */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Character */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Nhân Vật Đột Phá:</label>
                  <select
                    value={breakthroughCharacter}
                    onChange={e => setBreakthroughCharacter(e.target.value)}
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {characters.map(c => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.realmOrRank})
                      </option>
                    ))}
                    {!characters.some(c => c.name === 'Lăng Tiêu') && (
                      <option value="Lăng Tiêu">Lăng Tiêu (Trúc Cơ Kỳ)</option>
                    )}
                  </select>
                </div>

                {/* Target Realm */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Cảnh Giới Mục Tiêu Đạt Được:</label>
                  <input
                    type="text"
                    value={breakthroughTargetRealm}
                    onChange={e => setBreakthroughTargetRealm(e.target.value)}
                    placeholder="Ví dụ: Kim Đan Kỳ (Tử Phủ Đan Thai)"
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Catalyst Type */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Hình Thức Kết Hợp:</label>
                  <select
                    value={breakthroughCatalystType}
                    onChange={e => setBreakthroughCatalystType(e.target.value)}
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Kỳ Chân Dị Bảo">Kỳ Chân Dị Bảo (Dị Hỏa, Băng Tinh, Thần Thảo)</option>
                    <option value="Pháp Khí Bản Mệnh">Pháp Khí Bản Mệnh (Kiếm Thai, Cổ Đỉnh, Huyết Tế)</option>
                    <option value="Bí Cảnh / Tàn Hồn Truyền Thừa">Bí Cảnh / Tàn Hồn Truyền Thừa (Thần Ma Di Chỉ)</option>
                    <option value="Thiên Lôi Tôi Thể">Thiên Lôi Tôi Thể (Cửu Trọng Lôi Kiếp)</option>
                    <option value="Tử Địa Niết Bàn (Sinh Tử Quan)">Tử Địa Niết Bàn (Sinh Tử Quan)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Catalyst Name */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Tên Bảo Vật / Cơ Duyên:</label>
                  <input
                    type="text"
                    value={breakthroughCatalystName}
                    onChange={e => setBreakthroughCatalystName(e.target.value)}
                    placeholder="Ví dụ: U Minh Quỷ Hỏa & Cửu Chuyển Hoàn Hồn Thảo"
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Ritual Place */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Địa Điểm Đột Phá:</label>
                  <input
                    type="text"
                    value={breakthroughPlace}
                    onChange={e => setBreakthroughPlace(e.target.value)}
                    placeholder="Ví dụ: Đáy Vực Sinh Tử / Miệng Núi Lửa Cổ"
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Technique Used */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Công Pháp Vận Hành:</label>
                  <input
                    type="text"
                    value={breakthroughTechnique}
                    onChange={e => setBreakthroughTechnique(e.target.value)}
                    placeholder="Ví dụ: Hỗn Độn Khai Thiên Quyết"
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Context Prompt */}
              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-300">Tình Huống Bối Cảnh / Động Lực Sinh Tử:</label>
                <input
                  type="text"
                  value={breakthroughPrompt}
                  onChange={e => setBreakthroughPrompt(e.target.value)}
                  placeholder="Ví dụ: Đột phá giữa lúc bị kẻ thù vây hãm, dẫn thiên kiếp diệt sát đối phương..."
                  className="w-full bg-gray-950 border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleSimulateBreakthrough}
                disabled={isSimulatingBreakthrough}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isSimulatingBreakthrough
                    ? 'bg-amber-900/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-600 via-rose-600 to-yellow-600 hover:brightness-110 text-white shadow-amber-950/60'
                }`}
              >
                {isSimulatingBreakthrough ? (
                  <>
                    <span className="animate-spin text-base">⚡</span>
                    Đang mô phỏng quá trình lôi kiếp & biến dị đột phá...
                  </>
                ) : (
                  <>
                    <span>⚡</span> Khởi Động Mô Phỏng Đột Phá Kỳ Cảnh
                  </>
                )}
              </button>
            </div>

            {/* List and Details Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Selector List */}
              <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
                {breakthroughs.map(b => {
                  const isSelected = b.id === selectedBreakthrough.id;
                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBreakthroughId(b.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-950/80 to-rose-950/80 border-amber-400/80 shadow-lg'
                          : 'bg-gray-950/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                          {b.catalystType}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">{b.characterName}</span>
                      </div>
                      <h4 className="text-xs font-bold text-vip-gold line-clamp-1">{b.title}</h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">➔ {b.targetRealm}</p>
                    </div>
                  );
                })}
              </div>

              {/* Right Detail Pane */}
              <div className="lg:col-span-8">
                {selectedBreakthrough && (
                  <div className="p-6 rounded-2xl bg-gray-950 border border-amber-500/40 space-y-5 shadow-xl">
                    <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex flex-wrap gap-2 items-center mb-1">
                          <span className="text-xs font-mono text-amber-300 font-bold px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/40">
                            {selectedBreakthrough.catalystType}
                          </span>
                          <span className="text-xs font-mono text-rose-300 font-bold px-2.5 py-0.5 rounded-full bg-rose-950 border border-rose-500/40">
                            Mục tiêu: {selectedBreakthrough.targetRealm}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-vip-gold mt-1">{selectedBreakthrough.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Nhân vật: <span className="text-white font-bold">{selectedBreakthrough.characterName}</span> •
                          Địa điểm: <span className="text-gray-300">{selectedBreakthrough.ritualPlace}</span>
                        </p>
                      </div>

                      {onInsertText && (
                        <button
                          onClick={() => {
                            const text = `[PHÂN CẢNH ĐỘT PHÁ: ${selectedBreakthrough.title}]\n` +
                              `• Nhân vật: ${selectedBreakthrough.characterName}\n` +
                              `• Cảnh giới đạt được: ${selectedBreakthrough.targetRealm}\n` +
                              `• Loại hình kết hợp: ${selectedBreakthrough.catalystType} (${selectedBreakthrough.catalystName})\n` +
                              `• Địa điểm: ${selectedBreakthrough.ritualPlace}\n` +
                              `• Diễn biến đột phá: ${selectedBreakthrough.breakthroughProcess}\n` +
                              `• Hiểm nguy sinh tử: ${selectedBreakthrough.dangerAndPain}\n` +
                              `• Dị biến thể chất & thần thông: ${selectedBreakthrough.breakthroughMutation}\n` +
                              (selectedBreakthrough.proseSegment ? `\n--- VĂN PHONG TIỂU THUYẾT ---\n${selectedBreakthrough.proseSegment}` : '');
                            onInsertText(text);
                            alert('Đã chèn phân cảnh đột phá vào chương truyện!');
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-rose-600 hover:brightness-110 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1"
                        >
                          <span>📥</span> Chèn Vào Truyện
                        </button>
                      )}
                    </div>

                    {/* Breakthrough Process */}
                    <div className="p-4 bg-gray-900/80 rounded-xl border border-white/10 space-y-2 text-xs">
                      <span className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                        <span>🌀</span> Quá Trình Dẫn Khí & Luyện Hóa Kỳ Bảo:
                      </span>
                      <p className="text-gray-300 leading-relaxed">{selectedBreakthrough.breakthroughProcess}</p>
                    </div>

                    {/* Danger and Mutation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-4 bg-rose-950/30 border border-rose-500/30 rounded-xl space-y-1.5">
                        <span className="text-rose-400 font-bold flex items-center gap-1">
                          <span>💀</span> Hiểm Nguy Sinh Tử & Tâm Ma:
                        </span>
                        <p className="text-gray-300 leading-relaxed">{selectedBreakthrough.dangerAndPain}</p>
                      </div>

                      <div className="p-4 bg-amber-950/30 border border-amber-500/30 rounded-xl space-y-1.5">
                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <span>✨</span> Biến Dị Thể Chất & Thần Thông Mới:
                        </span>
                        <p className="text-gray-300 leading-relaxed">{selectedBreakthrough.breakthroughMutation}</p>
                      </div>
                    </div>

                    {/* Prose Segment if available */}
                    {selectedBreakthrough.proseSegment && (
                      <div className="p-4 bg-gray-900/90 rounded-xl border border-yellow-500/30 space-y-2 text-xs">
                        <span className="text-yellow-400 font-bold flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <span>📖</span> Đoạn Văn Mẫu Chương Truyện (Văn Phong Đại Thần):
                          </span>
                          {onInsertText && (
                            <button
                              onClick={() => {
                                onInsertText(selectedBreakthrough.proseSegment || '');
                                alert('Đã chèn đoạn văn vào bản thảo!');
                              }}
                              className="text-[10px] text-amber-300 hover:underline font-normal"
                            >
                              Chèn đoạn này
                            </button>
                          )}
                        </span>
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed italic border-l-2 border-amber-500/50 pl-3">
                          {selectedBreakthrough.proseSegment}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: AI TÔNG SƯ SÁNG CHẾ                                         */}
        {/* ================================================================= */}
        {activeTab === 'aiCreator' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-950 via-cyan-950/30 to-blue-950/30 border border-cyan-500/40 space-y-5">
              <div>
                <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-amber-300">
                  🤖 AI Tông Sư Sáng Chế Công Pháp Theo Ý Muốn
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Nhập ý tưởng bất kỳ của bạn, AI sẽ tự động phân tích kinh mạch, xây dựng khẩu quyết cổ kính, các tầng cảnh giới phân bậc chi tiết và tuyệt kỹ sát chiêu tương thích hoàn hảo với tác phẩm của bạn.
                </p>
              </div>

              {/* Idea Inspiration Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
                <span className="text-[11px] font-bold text-cyan-300 whitespace-nowrap">💡 Gợi ý nhanh:</span>
                <button
                  type="button"
                  onClick={() => {
                    setAiManualName('Bát Môn Độn Giáp Ma Thần Thể');
                    setAiManualElement('Huyết Mạch & Thần Thú');
                    setAiManualSchool('Luyện Thể Ngoại Công');
                    setAiManualRank('Thiên Giai');
                    setAiManualIdea('Mở từng cửa phong ấn kinh mạch trong cơ thể, mỗi cửa giải phóng sức mạnh thể chất gấp bội nhưng gây tổn thương huyết khí');
                  }}
                  className="px-2 py-1 bg-gray-900 border border-cyan-500/30 hover:bg-cyan-900/30 text-[11px] rounded text-gray-300 whitespace-nowrap"
                >
                  Bát Môn Độn Giáp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAiManualName('Cửu Thiên Vạn Kiếm Tru Tiên Trận Điển');
                    setAiManualElement('Kim (Canh Kim / Sát Phạt)');
                    setAiManualSchool('Kiếm Pháp / Đao Quyết Sát Phạt');
                    setAiManualRank('Thần Giai / Cấm Kỵ');
                    setAiManualIdea('Luyện kiếm trận ngàn dặm, dung nạp bốn thanh cổ kiếm tru tiên, sát phạt thần ma');
                  }}
                  className="px-2 py-1 bg-gray-900 border border-cyan-500/30 hover:bg-cyan-900/30 text-[11px] rounded text-gray-300 whitespace-nowrap"
                >
                  Vạn Kiếm Tru Tiên
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAiManualName('Đại La Hư Không Du Thần Quyết');
                    setAiManualElement('Không Gian & Thời Gian');
                    setAiManualSchool('Thần Hồn & Huyễn Thuật Bí Pháp');
                    setAiManualRank('Thiên Giai');
                    setAiManualIdea('Thần hồn xuất khiếu du ngoạn cửu tiêu, ngưng tụ thần thức thành kiếm vô hình chém nát tâm trí');
                  }}
                  className="px-2 py-1 bg-gray-900 border border-cyan-500/30 hover:bg-cyan-900/30 text-[11px] rounded text-gray-300 whitespace-nowrap"
                >
                  Hư Không Du Thần
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Manual Name */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Tên Công Pháp (Để trống nếu muốn AI tự đặt):</label>
                  <input
                    type="text"
                    value={aiManualName}
                    onChange={e => setAiManualName(e.target.value)}
                    placeholder="Ví dụ: Cửu Tiêu Lôi Phạt Chấn Ngục Quyết"
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Element */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Thuộc Tính / Nguyên Tố:</label>
                  <select
                    value={aiManualElement}
                    onChange={e => setAiManualElement(e.target.value)}
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Kim (Canh Kim / Sát Phạt)">Kim (Canh Kim / Sát Phạt)</option>
                    <option value="Mộc (Ất Mộc / Trường Sinh)">Mộc (Ất Mộc / Trường Sinh)</option>
                    <option value="Thủy (Bích Thủy / Triều Dâng)">Thủy (Bích Thủy / Triều Dâng)</option>
                    <option value="Hỏa (Liệt Diễm / Dị Hỏa)">Hỏa (Liệt Diễm / Dị Hỏa)</option>
                    <option value="Thổ (Đại Địa / Sơn Nhạc)">Thổ (Đại Địa / Sơn Nhạc)</option>
                    <option value="Lôi (Thiên Kiếp / Tử Tiêu)">Lôi (Thiên Kiếp / Tử Tiêu)</option>
                    <option value="Phong (Tật Phong / Cuồng Phong)">Phong (Tật Phong / Cuồng Phong)</option>
                    <option value="Băng (Băng Hàn / Cực Âm)">Băng (Băng Hàn / Cực Âm)</option>
                    <option value="Âm Dương & Thái Cực">Âm Dương & Thái Cực</option>
                    <option value="Thôn Phệ & Hắc Ám">Thôn Phệ & Hắc Ám</option>
                    <option value="Không Gian & Thời Gian">Không Gian & Thời Gian</option>
                    <option value="Huyết Mạch & Thần Thú">Huyết Mạch & Thần Thú</option>
                    <option value="Hỗn Độn & Thái Sơ">Hỗn Độn & Thái Sơ</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* School */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Hệ Phái:</label>
                  <select
                    value={aiManualSchool}
                    onChange={e => setAiManualSchool(e.target.value)}
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Tâm Pháp Nội Công">Tâm Pháp Nội Công</option>
                    <option value="Luyện Thể Ngoại Công">Luyện Thể Ngoại Công</option>
                    <option value="Thân Pháp Bộ Pháp">Thân Pháp Bộ Pháp</option>
                    <option value="Kiếm Pháp / Đao Quyết Sát Phạt">Kiếm Pháp / Đao Quyết Sát Phạt</option>
                    <option value="Thần Hồn & Huyễn Thuật Bí Pháp">Thần Hồn & Huyễn Thuật Bí Pháp</option>
                    <option value="Phụ Tu (Đan / Trận / Phù / Khí)">Phụ Tu (Đan / Trận / Phù / Khí)</option>
                  </select>
                </div>

                {/* Rank */}
                <div className="space-y-1 text-xs">
                  <label className="font-bold text-gray-300">Phẩm Giai:</label>
                  <select
                    value={aiManualRank}
                    onChange={e => setAiManualRank(e.target.value)}
                    className="w-full bg-gray-950 border border-white/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Hoàng Giai">Hoàng Giai</option>
                    <option value="Huyền Giai">Huyền Giai</option>
                    <option value="Địa Giai">Địa Giai</option>
                    <option value="Thiên Giai">Thiên Giai</option>
                    <option value="Thần Giai / Cấm Kỵ">Thần Giai / Cấm Kỵ</option>
                  </select>
                </div>
              </div>

              {/* Idea Prompt */}
              <div className="space-y-1 text-xs">
                <label className="font-bold text-gray-300">Ý Tưởng Sáng Chế / Đặc Tính Độc Đáo:</label>
                <textarea
                  rows={4}
                  value={aiManualIdea}
                  onChange={e => setAiManualIdea(e.target.value)}
                  placeholder="Mô tả ý tưởng của bạn: Cách thức dẫn khí, nguồn gốc từ tàn hài thần thú, uy lực khi chém ra, sự tương phản âm dương..."
                  className="w-full bg-gray-950 border border-white/20 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-500 custom-scrollbar"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleGenerateManual}
                disabled={isGeneratingManual}
                className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  isGeneratingManual
                    ? 'bg-cyan-900/50 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 text-white shadow-cyan-950/60'
                }`}
              >
                {isGeneratingManual ? (
                  <>
                    <span className="animate-spin text-base">🤖</span>
                    Đại Tông Sư AI đang biên soạn bí tịch & khẩu quyết...
                  </>
                ) : (
                  <>
                    <span>✨</span> Biên Soạn & Nhập Vào Tạng Kinh Các
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recitation Modal for Chant Mnemonic */}
      {chantRecitingManual && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0b0f19] border-2 border-amber-500/60 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪷</span>
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                  Ngâm Tụng Khẩu Quyết • {chantRecitingManual.name}
                </h3>
              </div>
              <button
                onClick={() => setChantRecitingManual(null)}
                className="text-gray-400 hover:text-white text-base"
              >
                ✕
              </button>
            </div>

            <div className="p-5 bg-gradient-to-b from-amber-950/40 to-black/80 border border-amber-500/30 rounded-2xl text-center space-y-3">
              <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-mono">
                {chantRecitingManual.element} • {chantRecitingManual.rank}
              </span>
              <p className="text-base font-serif font-black text-amber-200 whitespace-pre-line leading-loose tracking-widest italic py-2">
                "{chantRecitingManual.chantMnemonic || chantRecitingManual.corePhilosophy}"
              </p>
              {chantRecitingManual.meridianRoute && (
                <div className="pt-2 border-t border-amber-500/20 text-xs text-cyan-300 italic">
                  🌀 {chantRecitingManual.meridianRoute}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {onInsertText && (
                <button
                  onClick={() => {
                    const text = `[KHẨU QUYẾT ${chantRecitingManual.name.toUpperCase()}]:\n"${chantRecitingManual.chantMnemonic || chantRecitingManual.corePhilosophy}"`;
                    onInsertText(text);
                    setChantRecitingManual(null);
                    alert('Đã chèn khẩu quyết vào chương truyện!');
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:brightness-110 text-gray-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <span>📥</span> Chèn Vào Bản Thảo
                </button>
              )}
              <button
                onClick={() => setChantRecitingManual(null)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-xl"
              >
                Đóng Lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
