/**
 * Takes a callback as an argument and calls it whenever the user
 * has the element focused and presses one of the keys passed as the
 * second argument.
 */
export default function useAccessibleKeyPress(
  callback: (event: React.KeyboardEvent) => unknown,
  keys: string[] = ["Space", "Enter"]
) {
  return (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (keys.includes(event.code)) {
      callback(event);
    }
  };
}
