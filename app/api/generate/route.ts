import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { brand, niche, tone, audience } = body;

    // محاكاة استجابة ذكاء اصطناعي ردا على المدخلات
    const mockResult = `
      🚀 خطة الحملة التسويقية لبراند "${brand || 'مشروعك'}" في مجال "${niche || 'التسويق'}" بنبرة "${tone || 'احترافية'}" موجهة إلى "${audience || 'الجمهور المستهدف'}":
      
      1. الإعلان المبدئي (Teaser): إطلاق فيديو قصير يوضح المشكلة التي يحلها البراند في السوق السعودي.
      2. المحتوى التفاعلي: طرح أسئلة استطلاعية عبر منصات التواصل الاجتماعي لرفع معدل التفاعل (Engagement).
      3. العرض الترويجي: تقديم خصم حصري لفترة محدودة لعملاء الخليج والسعودية لتحفيز الشراء السريع.
    `;

    // تأخير بسيط لمسح ثقل الشبكة الوهمي
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ result: mockResult });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'حدث خطأ في السيرفر' },
      { status: 500 }
    );
  }
}

