'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Campaign {
  id: number;
  brand: string;
  niche: string;
  status: string;
  date: string;
  result?: string;
}

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('suhail_campaigns') || '[]');
    setCampaigns(saved);
  }, []);

  const clearCampaigns = () => {
    localStorage.removeItem('suhail_campaigns');
    setCampaigns([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dir-rtl">
      <Navbar />

      <main className="max-w-5xl mx-auto p-6 mt-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">لوحة التحكم 📊</h1>
            <p className="text-slate-400 mt-1">نظرة عامة على حملاتك التسويقية في سهيل AI</p>
          </div>
          <div className="flex gap-3">
            {campaigns.length > 0 && (
              <button
                onClick={clearCampaigns}
                className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold px-4 py-3 rounded-xl transition"
              >
                مسح السجل
              </button>
            )}
            <Link 
              href="/" 
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-xl transition"
            >
              + حملة جديدة
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
            <p className="text-sm text-slate-400">إجمالي الحملات</p>
            <p className="text-3xl font-bold text-white mt-2">{campaigns.length}</p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
            <p className="text-sm text-slate-400">الحملات النشطة</p>
            <p className="text-3xl font-bold text-amber-400 mt-2">
              {campaigns.filter((c) => c.status === 'نشطة').length}
            </p>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
            <p className="text-sm text-slate-400">الرصيد المتبقي</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">غير محدود</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h2 className="font-bold text-lg text-white">أحدث الحملات</h2>
          </div>

          {campaigns.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              لا توجد حملات محفوظة بعد. ابدئي بتوليد أول حملة من الصفحة الرئيسية!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-950 text-slate-400 text-sm">
                  <tr>
                    <th className="p-4">البراند</th>
                    <th className="p-4">المجال</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {campaigns.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50">
                      <td className="p-4 font-semibold text-white">{item.brand}</td>
                      <td className="p-4 text-slate-300">{item.niche}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 text-sm">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
