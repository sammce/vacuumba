import { useState, useEffect } from "react";
import { FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import type { InputProps, FormControlProps } from "@chakra-ui/react";
import type { Validator } from "../validators";

export type UseValidation = (
  key: string,
  validators: Record<string, Validator>,
  options?: {
    delay?: number;
    helperText?: string;
    defaultValue?: string;
    plugins?: Function[];
  }
) => ValidatedInput;

export interface ValidatedInput {
  inputProps: InputProps;
  controlProps: FormControlProps;
  messages: React.ReactElement;
  isInvalid: boolean;
  uiValid: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  _listener: {
    key: string;
    setErrors: (msgs: string[]) => void;
  };
}

const useValidation: UseValidation = (
  key,
  validators,
  { delay = 1000, helperText, defaultValue = "", plugins = [] } = {}
) => {
  const [input, setInput] = useState(defaultValue);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [hasTyped, setHasTyped] = useState(false);

  const isInvalid = errorMessages.length > 0 && hasTyped;
  const uiValid = errorMessages.length === 0 && hasTyped;

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    setInput(event.target.value);
    setHasTyped(event.target.value.length > 0);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasTyped) return;

      const newMessages: string[] = [];

      Object.entries(validators).forEach(([message, validator]) => {
        const result = validator(input);

        if (!result) {
          newMessages.push(message);
        }
      });

      setErrorMessages(newMessages);
    }, delay);

    if (hasTyped && input.length === 0) setHasTyped(false);

    return () => clearTimeout(timeout);
  }, [input, delay, hasTyped]);

  const messages = isInvalid ? (
    <>
      {errorMessages.map(message => (
        <FormErrorMessage key={message}>{message}</FormErrorMessage>
      ))}
    </>
  ) : (
    <>{!!helperText && <FormHelperText>{helperText}</FormHelperText>}</>
  );

  const validatedInput: ValidatedInput = {
    inputProps: {
      value: input,
      onChange: handleInputChange,
    },
    controlProps: {
      isInvalid,
    },
    isInvalid,
    uiValid,
    messages,
    value: input,
    setValue: setInput,
    _listener: {
      key,
      setErrors: msgs => setErrorMessages(msgs),
    },
  };

  for (const plugin of plugins) {
    plugin(validatedInput);
  }

  return validatedInput;
};

export default useValidation;
