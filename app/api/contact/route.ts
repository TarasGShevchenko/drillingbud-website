import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { name, phone } = body

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
    }

    const message = `
        <b>Нова заявка!</b>
        <b>Ім'я:</b> ${name}
        <b>Телефон:</b> ${phone}
    `

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })

    if (!telegramResponse.ok) {
      throw new Error('Telegram API error')
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
