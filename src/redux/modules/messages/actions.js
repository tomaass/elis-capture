export const DISPLAY_MESSAGE = 'DISPLAY_MESSAGE';

export const displayMessage = message => ({
  type: DISPLAY_MESSAGE,
  payload: message,
});
