import { useToast } from "@chakra-ui/react";
import type { FetchSuccess, FetchError } from "../api";
import type { ValidatedInput } from "./useValidation";

export const useInputFeedback = (): [
  (v: ValidatedInput) => void,
  (res: FetchSuccess<unknown> | FetchError) => void
] => {
  const toast = useToast();
  let inputs: ValidatedInput[] = [];

  function feedback(validatedInput: ValidatedInput) {
    inputs.push(validatedInput);
  }

  function evaluate(response: FetchSuccess<unknown> | FetchError) {
    if (!response.isError) return;

    if (typeof response.data.detail === "string") {
      toast({
        title: "Something went wrong :(",
        description: response.data.detail,
        status: "error",
        isClosable: true,
      });
    } else {
      Object.entries(response.data as Record<string, string[]>).forEach(
        ([key, errors]) => {
          inputs.forEach(input => {
            if (key == input._listener.key) {
              input._listener.setErrors(errors);
            }
          });
        }
      );
    }
  }

  return [feedback, evaluate];
};
