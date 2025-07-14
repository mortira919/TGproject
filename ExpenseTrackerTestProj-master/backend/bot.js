import { Telegraf } from 'telegraf';

const bot = new Telegraf('8194849046:AAGE0atgOipBKF-akWVPZ308aoj50X8Ptk4');

// Твой задеплоенный фронт (Vercel)
const WEB_APP_URL = "tg-project-drab.vercel.app";




bot.start((ctx) => {
  console.log("▶️ Получен /start от:", ctx.from?.id);

  ctx.reply('👋 Привет! Открой трекер расходов через одну из кнопок ниже:', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '💸 Открыть мини-приложение',
            web_app: { url: WEB_APP_URL },
          },
        ],
      ],
    },
  });
});

// fallback: чтобы можно было вручную открыть с текстовой команды
bot.hears('Открыть приложение', (ctx) => {
  ctx.reply('Вот кнопка для открытия 👇', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '💸 Открыть',
            web_app: { url: WEB_APP_URL },
          },
        ],
      ],
    },
  });
});

export default bot;
