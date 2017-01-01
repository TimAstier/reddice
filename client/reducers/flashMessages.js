import { ADD_FLASH_MESSAGE } from '../actions/types';

export default (state = [], action = {}) => {
  switch(action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          type: action.message.type,
          text: action.message.text,
          // id is generated in the action creator to keep this function pure
          id: action.message.id
        }
      ];
    default:
      return state;
  }
};
