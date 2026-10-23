import React, { useState } from 'react';
import { NovelNode } from '../types';

interface VisualAndAudioStudioProps {
  node: NovelNode | null;
  onUpdateNode?: (updatedNode: NovelNode) => void;
}

export const VisualAndAudioStudio: React.FC<VisualAndAudioStudioProps> = ({ node, onUpdateNode }) => {
  const [coverUrl, setCoverUrl] = useState(node?.coverImage || '');
  const [audioUrl, setAudioUrl] = useState(node?.audioNarrationUrl || '');
  const [musicUrl, setMusicUrl] = useState(node?.musicThemeUrl || '');
  const [videoUrl, setVideoUrl] = useState(node?.videoTrailerUrl || '');

  const handleSave = () => {
    if (!node || !onUpdateNode) return;
    onUpdateNode({
      ...node,
      coverImage: coverUrl,
      audioNarrationUrl: audioUrl,
      musicThemeUrl: musicUrl,
      videoTrailerUrl: videoUrl,
    });
    alert('Đã lưu cấu hình thị giác & âm thanh cho phân cảnh!');
  };

  if (!node) {
    return (
      <div className="p-6 text-center text-gray-500">
        Vui lòng chọn một chương hoặc phân cảnh để thiết lập đa phương tiện.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-pink-950/40 to-gray-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎬</span>
          <div>
            <h2 className="text-base font-bold text-pink-300">THỊ GIÁC & ÂM THANH ĐA PHƯƠNG TIỆN</h2>
            <p className="text-[11px] text-gray-400">Ảnh bìa phân cảnh, nhạc nền chủ đạo và trailer cho {node.title}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        <div className="p-6 rounded-2xl bg-gray-950 border border-pink-500/30 space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1 font-bold">🖼️ Ảnh bìa / Tranh minh họa phân cảnh (URL):</label>
            <input
              type="text"
              value={coverUrl}
              onChange={e => setCoverUrl(e.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
            />
            {coverUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-white/10 max-h-48 flex justify-center bg-black/40">
                <img src={coverUrl} alt="Cover preview" className="object-contain h-48" onError={(e)=>{(e.target as any).style.display='none'}} />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1 font-bold">🎵 Nhạc nền phong cách tiên hiệp (Audio URL):</label>
            <input
              type="text"
              value={musicUrl}
              onChange={e => setMusicUrl(e.target.value)}
              placeholder="https://example.com/theme.mp3"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1 font-bold">🎙️ File thu âm diễn đọc (Narration Audio URL):</label>
            <input
              type="text"
              value={audioUrl}
              onChange={e => setAudioUrl(e.target.value)}
              placeholder="https://example.com/narration.mp3"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1 font-bold">🎥 Video Trailer / Hoạt hình ngắn (Video URL):</label>
            <input
              type="text"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              placeholder="https://example.com/trailer.mp4"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2.5 text-xs text-white"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 font-bold rounded-xl text-xs text-white shadow-lg transition-all"
          >
            LƯU CẤU HÌNH ĐA PHƯƠNG TIỆN
          </button>
        </div>
      </div>
    </div>
  );
};
