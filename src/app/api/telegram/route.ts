import { NextRequest, NextResponse } from 'next/server';

// Helper function to escape Markdown characters
function escapeMarkdown(text: string): string {
  // Escapes characters that have special meaning in Telegram's Markdown mode
  // Specifically * and _ are the most common ones that break formatting if unclosed
  // Added backtick (`) to regex
  return text.replace(/[_*[`]/g, '\\$&');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, message } = body;

    // Input validation
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: fullName, email, or message' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram configuration missing. TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set.');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Escape user input to prevent Markdown parsing errors
    const safeFullName = escapeMarkdown(fullName);
    const safeEmail = escapeMarkdown(email);
    const safeMessage = escapeMarkdown(message);

    // Format the message for Telegram
    const telegramMessage = `
🔔 *Nuovo Messaggio dal Sito Web*

👤 *Nome:* ${safeFullName}
📧 *Email:* ${safeEmail}

💬 *Messaggio:*
${safeMessage}
    `;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    const data = await response.json();

    if (data.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });
    } else {
      console.error('Telegram API Error:', data);
      return NextResponse.json(
        { success: false, message: 'Failed to send message to Telegram: ' + (data.description || 'Unknown error') },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in telegram route handler:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
