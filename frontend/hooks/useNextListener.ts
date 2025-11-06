import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useQueryParam from "./useQueryParam";

export default function useNextListener(
  changeOn: unknown,
  { invert } = { invert: false }
) {
  const [next, setNext] = useState("");
  const router = useRouter();

  useQueryParam(params => setNext(params.next || ""), ["next"]);

  useEffect(() => {
    if ((invert ? !changeOn : changeOn) && next.length > 0) {
      router.push(next);
    }
  }, [changeOn, next, invert, router]);
}
