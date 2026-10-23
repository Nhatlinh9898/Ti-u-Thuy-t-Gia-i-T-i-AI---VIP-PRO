import React, { useState } from 'react';
import { sendChatMessage } from '../services/geminiService';
import { Spinner } from './Spinner';

interface AiAssistantChatProps {
  context?: any;
  onInsertText?: (text: string) => void;
}

export const AiAssistantChat: React.FC<AiAssistantChatProps> = ({ context, onInsertText }) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Chào tác giả! Tôi là Cố Vấn Văn Học AI VIP PRO. Bạn cần hỗ trợ gì về ý tưởng cốt truyện, thiết kế chiêu thức, gỡ nút thắt hay phát triển tình huống bất ngờ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user' as const, content: input.trim() };
    const nextMsgs = [...messages, userMsg];
    setMessages(nextMsgs);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendChatMessage(nextMsgs, context);
      setMessages([...nextMsgs, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setMessages([...nextMsgs, { role: 'assistant', content: 'Lỗi: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#070a12] text-white">
      {/* Header */}
      <div className="p-4 border-b border-purple-500/20 bg-gradient-to-r from-gray-950 via-purple-950/40 to-gray-950 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💬</span>
          <div>
            <h3 className="font-bold text-sm text-vip-gold">TRỢ LÝ CỐ VẤN VĂN HỌC AI VIP PRO</h3>
            <p className="text-[11px] text-gray-400">Tư vấn cốt truyện, giải quyết bí ý tưởng và phân tích kịch bản</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs md:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-vip-purple to-pink-600 text-white rounded-br-none shadow-md'
                  : 'bg-gray-900 border border-purple-500/20 text-gray-200 rounded-bl-none shadow-md'
              }`}
            >
              <div className="whitespace-pre-line font-serif">{m.content}</div>
              {m.role === 'assistant' && onInsertText && idx > 0 && (
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => {
                      onInsertText(m.content);
                      alert('Đã chèn nội dung vào chương truyện!');
                    }}
                    className="text-[11px] text-vip-gold hover:underline font-sans"
                  >
                    + Chèn vào chương
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-purple-300 italic p-2">
            <Spinner />
            <span>Cố vấn đang suy nghĩ và gieo mầm ý tưởng...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-white/10 bg-gray-950 flex items-center gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Nhập câu hỏi hoặc yêu cầu cố vấn cốt truyện..."
          rows={1}
          className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-2.5 text-xs text-white focus:ring-1 focus:ring-vip-purple outline-none resize-none"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 bg-gradient-to-r from-vip-purple to-pink-600 rounded-xl font-bold text-xs text-white shadow-md disabled:opacity-40"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};
