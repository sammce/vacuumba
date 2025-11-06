export default function useScroll<T extends HTMLElement>(
  elementRef: React.RefObject<T>
) {
  return () =>
    // Smoothly scroll the element to the top of the viewport
    elementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
}
