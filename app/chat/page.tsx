'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'أهلاً بك! أنا سهيل، مستشارك التسويقي. كيف أقدر أساعدك في حملتك اليوم؟ 🚀' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || data.error }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: '❌ تعذر الاتصال بالسيرفر.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100 dir-rtl">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto p-4 flex flex-col">
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 flex-1 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-950 text-white flex items-center justify-between">
            <h1 className="font-bold text-lg">محادثة سهيل الذكي 💬</h1>
            <span className="text-xs bg-amber-500 text-slate-950 px-2 py-1 rounded-full font-bold">متصل</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[60vh]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-slate-800 text-slate-400 p-3 rounded-2xl text-sm animate-pulse">
                  سهيل يكتب الآن...
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 flex gap-2 overflow-x-auto">
            <button onClick={() => sendMessage('أعطني فكرة فيديو تيك توك')} className="text-xs bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full hover:border-amber-500 whitespace-nowrap transition">
              🎥 فكرة تيك توك
            </button>
            <button onClick={() => sendMessage('اكتب لي نص إعلان سناب شات')} className="text-xs bg-slate-900 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-full hover:border-amber-500 whitespace-nowrap transition">
              👻 إعلان سناب شات
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="p-4 border-t border-slate-800 bg-slate-950 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك التسويقي هنا..."
              className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 rounded-xl transition disabled:opacity-50"
            >
              إرسال
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
