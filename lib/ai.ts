import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMarketingCampaign(brandData: {
  name: string;
  niche: string;
  tone: string;
  targetAudience: string;
}) {
  const systemPrompt = `أنت "سهيل"، الخبير التسويقي الذكي والمختص بالسوق الخليجي والسعودي.
تكتب بلغة تسويقية جاذبة، بأسلوب يفهمه الجمهور المحلي بعيداً عن التكلف أو الترجمة الآلية.
المطلوب إخراج النتيجة بصيغة JSON حصراً.`;

  const userPrompt = `أنشئ خطة محتوى تسويقية لـ:
- اسم البراند: ${brandData.name}
- المجال: ${brandData.niche}
- نبرة الصوت: ${brandData.tone}
- الجمهور المستهدف: ${brandData.targetAudience}

أضف 3 منشورات كعينة، بحيث يحتوي الـ JSON على المفتاح "posts" وكل منشور يحتوي على: id, type, hook, caption, visualDescription.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}
