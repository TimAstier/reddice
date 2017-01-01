import { ADD_FLASH_MESSAGE } from './types';
import shortid from 'shortid';

export function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message: {
      type: message.type,
      text: message.text,
      id: shortid.generate()
    }
  }
}
