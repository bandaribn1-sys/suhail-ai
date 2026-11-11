import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    await new Promise((resolve) => setTimeout(resolve, 800));

    let reply = '';
    if (message.includes('تيك توك') || message.includes('فيديو')) {
      reply = '🎥 فكرة فيديو تيك توك مقترحة:\nابدأ بأول 3 ثوانٍ بسؤال صادم أو مشكلة يواجهها عميلك في السعودية، ثم اعرض المنتج كحل سريع مع موسيقى ترند وهاشتاقات محلية.';
    } else if (message.includes('سناب') || message.includes('إعلان')) {
      reply = '👻 نص إعلان سناب شات:\n"تبي ترفع مبيعاتك هالشهر؟ عرضنا الحصري لفترة محدودة! ارفع الشاشة الآن واستفد من الخصم."';
    } else {
      reply = `✨ تحليل سهيل لسؤالك "${message}":\nأنصحك بالتركيز على القيمة المضافة للعميل الخليجي، واستخدام لهجة قريبة وواضحة مع دعوة صريحة لاتخاذ إجراء (CTA) مثل "اطلب الآن" أو "تواصل معنا واتساب".`;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ في معالجة الرسالة' }, { status: 500 });
  }
}
