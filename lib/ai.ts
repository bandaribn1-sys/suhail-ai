import OpenAI from 'openai';

export function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('مفتاح OPENAI_API_KEY غير مضاف في إعدادات البيئة');
  }
  return new OpenAI({ apiKey });
}
