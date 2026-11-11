import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-slate-900 text-white border-b border-slate-800 dir-rtl">
      <div className="text-xl font-bold text-amber-500">منصة سهيل 🚀</div>
      <div className="flex gap-6">
        <Link href="/" className="hover:text-amber-400">الرئيسية</Link>
        <Link href="/chat" className="hover:text-amber-400">المساعد الذكي (Chat)</Link>
        <Link href="/dashboard" className="hover:text-amber-400">لوحة التحكم</Link>
      </div>
    </nav>
  );
}
