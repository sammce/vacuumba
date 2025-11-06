import { ValidatedInput } from "./useValidation";

export default function useResetForm(...inputs: ValidatedInput[]) {
  return () => {
    inputs.forEach(input => input.setValue(""));
  };
}
