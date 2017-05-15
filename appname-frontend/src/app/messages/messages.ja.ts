import {messagesEn} from './messages.en';

export const messagesJa: typeof messagesEn = {
    title: 'TypeScript によるシンプルな i18n 実装',
    greeting: (name = '名無しの権兵衛') => `こんにちは、 ${name} さん`,
    unreadNotification: (unread: number) => `未読メッセージ${unread === 0 ? 'はありません' : `が ${unread} 通あります`}`
};
