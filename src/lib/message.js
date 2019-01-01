import Toast from 'react-native-root-toast';

export default () => {
// Add a Toast on screen.
  const toast = Toast.show('This is a message', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
    // calls on toast\`s appear animation start
    },
    onShown: () => {
    // calls on toast\`s appear animation end.
    },
    onHide: () => {
    // calls on toast\`s hide animation start.
    },
    onHidden: () => {
    // calls on toast\`s hide animation end.
    },
  });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(() => {
    Toast.hide(toast);
  }, 500);
};
