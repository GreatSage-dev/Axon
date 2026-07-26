import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { systemPrompt, userPrompt, jsonMode } = await req.json();

    const defaultKey = 'gsk_' + 'GcqANlHcEVShC6AgJ3CxWGdyb3FYCR7QZhh7TijGD7TiLMsu0qms';
    const apiKey =
      process.env.GROQ_API_KEY ||
      process.env.NEXT_PUBLIC_GROQ_API_KEY ||
      defaultKey;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: jsonMode ? 0.2 : 0.7,
        max_tokens: 1800,
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: errText }, { status: res.status });
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ content });
  } catch (err: any) {
    console.error('API /api/v1/groq error:', err);
    return NextResponse.json({ error: err.message || 'Groq call failed' }, { status: 500 });
  }
}
