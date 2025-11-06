import { useEffect } from "react";

export default function useQueryParam<T extends string>(
  callback: (result: Record<T, string | null>) => unknown,
  paramList: T[]
) {
  const effectCheck =
    typeof window === "undefined" ? undefined : window.location.search;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      let result_obj = {} as Record<T, string | null>;

      paramList.forEach(param => {
        result_obj[param] = searchParams.get(param);
      });

      callback(result_obj);
    }
  }, [effectCheck]);
}
