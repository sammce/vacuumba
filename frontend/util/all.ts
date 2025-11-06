export default function all(...items: any[]) {
  let result = true;

  items.forEach(item => {
    result = result && (Array.isArray(item) ? all(item) : !!item);
  });

  return result;
}
