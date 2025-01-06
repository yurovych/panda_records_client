import { UserMessageType } from '../types/UserMessage';

export function getTime(message: UserMessageType) {
  const dateObject = new Date(message.created_at);

  const day = dateObject.getDate().toString().padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours().toString().padStart(2, '0');
  const minutes = dateObject.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} / ${hours}:${minutes}`;
}
