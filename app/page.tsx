'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const AGENTS = [
  { id: 'strategist', name: 'المخطط الاستراتيجي', icon: '📊', desc: 'خطة تسويقية من وإلى + نصائح' },
  { id: 'designer', name: 'مصمم الجرافيك', icon: '🎨', desc: 'ألوان، هوية، وأفكار تصاميم' },
  { id: 'ads', name: 'مختص الإعلانات', icon: '📢', desc: 'نصوص إعلانية و CTA جاهزة' },
  { id: 'video', name: 'مخرج المونتاج', icon: '🎬', desc: 'سيناريو ريلز وتيك توك بالثواني' },
];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState('strategist');
  const [formData, setFormData] = useState({
    brand: '',
    niche: '',
    tone: 'احترافية',
    audience: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    setErrorMsg('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, agent: selectedAgent }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'حدث خطأ في السيرفر');
        return;
      }

      const generatedText = data.result || 'تم التوليد بنجاح';
      setResult(generatedText);

      const agentName = AGENTS.find((a) => a.id === selectedAgent)?.name || 'سهيل';
      const newCampaign = {
        id: Date.now(),
        brand: `${formData.brand} (${agentName})`,
        niche: formData.niche,
        status: 'نشطة',
        date: new Date().toISOString().split('T')[0],
        result: generatedText,
      };

      const existing = JSON.parse(localStorage.getItem('suhail_campaigns') || '[]');
      localStorage.setItem('suhail_campaigns', JSON.stringify([newCampaign, ...existing]));
    } catch {
      setErrorMsg('تعذر الاتصال بالسيرفر، تأكد من تشغيل npm run dev');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dir-rtl">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6 mt-6">
        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">منصة سهيل (Suhail AI) 🚀</h1>
            <p className="text-slate-400">اختاري الوكيل المتخصص وابدئي ببناء مشروعك.</p>
          </div>

          {/* شبكة اختيار الوكلاء */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-3">1. اختاري الوكيل الذكي:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`p-4 rounded-xl border text-right transition duration-200 ${
                    selectedAgent === agent.id
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-2xl mb-2">{agent.icon}</div>
                  <div className="font-bold text-sm text-white">{agent.name}</div>
                  <div className="text-xs text-slate-400 mt-1">{agent.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">اسم البراند / المشروع</label>
                <input 
                  type="text" 
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  placeholder="مثال: كافيين ورست"
                  required
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 placeholder-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">المجال (Niche)</label>
                <input 
                  type="text" 
                  value={formData.niche}
                  onChange={(e) => setFormData({...formData, niche: e.target.value})}
                  placeholder="مثال: القهوة المختصة والمحمصة"
                  required
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 placeholder-slate-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">نبرة الصوت (Tone)</label>
                <select 
                  value={formData.tone}
                  onChange={(e) => setFormData({...formData, tone: e.target.value})}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="احترافية">احترافية</option>
                  <option value="ودية وجذابة">ودية وجذابة</option>
                  <option value="حماسية وتسويقية">حماسية وتسويقية</option>
                  <option value="رسمية">رسمية</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">الجمهور المستهدف</label>
                <input 
                  type="text" 
                  value={formData.audience}
                  onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  placeholder="مثال: عشاق القهوة والموظفين"
                  required
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500 placeholder-slate-500"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold p-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? 'جاري العمل بواسطة الوكيل المختار...' : 'تشغيل الوكيل الآن 🚀'}
            </button>
          </form>

          {errorMsg && (
            <div className="mt-6 p-4 bg-red-950 text-red-300 rounded-xl border border-red-800 text-center font-semibold">
              ❌ {errorMsg}
            </div>
          )}

          {result && (
            <div className="mt-8 p-6 bg-slate-950 text-slate-200 rounded-xl whitespace-pre-line border border-slate-800">
              <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                <h3 className="text-amber-400 font-bold text-lg">
                  مخرجات {AGENTS.find((a) => a.id === selectedAgent)?.name}:
                </h3>
                <button
                  onClick={() => navigator.clipboard.writeText(result)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition"
                >
                  📋 نسخ النتيجة
                </button>
              </div>
              <p className="leading-relaxed">{result}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
