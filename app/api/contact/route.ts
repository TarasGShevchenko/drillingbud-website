import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

// Optional fields: label in the Telegram message, keyed by request field
const OPTIONAL_FIELDS = {
  callTime: 'Коли зателефонувати',
  pileType: 'Тип палі',
  pileCount: 'Кількість паль',
  diameter: 'Діаметр, мм',
  depth: 'Глибина, м',
  comment: 'Коментар',
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { name, phone, type } = body

    if (!name || !phone) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
    }

    const extraLines = Object.entries(OPTIONAL_FIELDS)
      .map(([field, label]) => {
        const value = String(body[field] ?? '')
          .trim()
          .slice(0, 1000)
        return value ? `<b>${label}:</b> ${escapeHtml(value)}` : ''
      })
      .filter(Boolean)
      .join('\n')

    const title = type === 'calculation' ? 'Розрахунок вартості' : 'Замовлення дзвінка'

    const message = `
        <b>Нова заявка! ${title}</b>
        <b>Ім'я:</b> ${name}
        <b>Телефон:</b> ${phone}
${extraLines}
    `

    // Local testing: CONTACT_DRY_RUN=1 npm run dev logs the lead instead of sending it
    if (process.env.CONTACT_DRY_RUN === '1' && process.env.NODE_ENV !== 'production') {
      console.log('[CONTACT_DRY_RUN] Telegram message not sent:', message)
      return NextResponse.json({ success: true })
    }

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
