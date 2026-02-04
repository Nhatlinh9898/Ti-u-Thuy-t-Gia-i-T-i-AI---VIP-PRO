import React, { useState, useEffect } from 'react';
import { VoiceConfig } from '../types';

interface VoiceStudioProps {
  text: string;
}

export const VoiceStudio: React.FC<VoiceStudioProps> = ({ text }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [config, setConfig] = useState<VoiceConfig>({
    enabled: false,
    voiceURI: null,
    rate: 1.0,
    pitch: 1.0,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      // Filter for Vietnamese if available, else all
      const viVoices = available.filter(v => v.lang.includes('vi'));
      setVoices(viVoices.length > 0 ? viVoices : available);
      if (viVoices.length > 0 && !config.voiceURI) {
        setConfig(prev => ({ ...prev, voiceURI: viVoices[0].voiceURI }));
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [config.voiceURI]);

  const handleSpeak = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (config.voiceURI) {
      const voice = voices.find(v => v.voiceURI === config.voiceURI);
      if (voice) utterance.voice = voice;
    }
    utterance.rate = config.rate;
    utterance.pitch = config.pitch;

    utterance.onend = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div className="p-4 rounded-xl border border-vip-purple/30 bg-gray-800/50 mt-4 backdrop-blur-sm">
      <h3 className="text-vip-gold font-bold mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
        </svg>
        VOICE STUDIO PRO
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Giọng đọc</label>
          <select 
            className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg p-2 focus:ring-vip-purple focus:border-vip-purple"
            value={config.voiceURI || ''}
            onChange={(e) => setConfig({ ...config, voiceURI: e.target.value })}
          >
            {voices.map(v => (
              <option key={v.voiceURI} value={v.voiceURI}>
                {v.name} ({v.lang})
              </option>
            ))}
            {voices.length === 0 && <option>Không tìm thấy giọng đọc</option>}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div>
                 <label className="block text-xs text-gray-400 mb-1">Tốc độ ({config.rate}x)</label>
                 <input 
                    type="range" min="0.5" max="2" step="0.1" 
                    value={config.rate}
                    onChange={(e) => setConfig({...config, rate: parseFloat(e.target.value)})}
                    className="w-full accent-vip-accent"
                 />
            </div>
            <div>
                 <label className="block text-xs text-gray-400 mb-1">Cao độ ({config.pitch})</label>
                 <input 
                    type="range" min="0.5" max="2" step="0.1" 
                    value={config.pitch}
                    onChange={(e) => setConfig({...config, pitch: parseFloat(e.target.value)})}
                    className="w-full accent-vip-accent"
                 />
            </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button 
            onClick={handleSpeak}
            className={`flex-1 py-2 rounded-lg font-bold transition-all duration-300 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-gradient-to-r from-vip-purple to-vip-accent hover:opacity-90'}`}
        >
            {isPlaying ? 'DỪNG ĐỌC' : 'ĐỌC NGAY'}
        </button>
      </div>
    </div>
  );
};
