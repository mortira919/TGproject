import { Telegraf } from 'telegraf';

// 🔐 Замените на ваш реальный токен
const bot = new Telegraf('8194849046:AAGE0atgOipBKF-akWVPZ308aoj50X8Ptk4');

// URL твоего фронтенда
const WEB_APP_URL = 'https://tg-project-kappa.vercel.app';

bot.start((ctx) => {
  ctx.reply('Добро пожаловать! 👋\n\nОткрой трекер расходов с помощью одной из кнопок ниже 👇', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Открыть через Inline-кнопку',
            web_app: { url: WEB_APP_URL },
          },
        ],
      ],
    },
  });

  // Дополнительно отправим клавиатуру с web_app кнопкой
  ctx.reply('Или используй клавиатуру:', {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Открыть приложение',
            web_app: { url: WEB_APP_URL },
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

export default bot;
