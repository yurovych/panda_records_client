import { UserMessageType } from '../types/UserMessage';

export function getTime(message: UserMessageType) {
  const dateObject = new Date(message.created_at);

  const day = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  return `${day}.${month + 1}.${year} / ${hours}:${minutes}`;
}
