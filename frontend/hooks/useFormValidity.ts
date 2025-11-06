import all from "../util/all";
import type { ValidatedInput } from "./useValidation";

export default function useFormValidity(): [
  (input: ValidatedInput) => void,
  () => boolean
] {
  const validations = [] as boolean[];

  function validity(input: ValidatedInput) {
    validations.push(input.uiValid);
  }

  function evaluateValidity() {
    return all(...validations);
  }

  return [validity, evaluateValidity];
}
