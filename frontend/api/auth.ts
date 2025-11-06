import apiFetch from ".";
import { ValidatedInput } from "../hooks/useValidation";

interface LoginReturnData {
  access: string;
  refresh: string;
}

interface LoginParams {
  email: ValidatedInput;
  password: ValidatedInput;
}

export function login({ email, password }: LoginParams) {
  return apiFetch<LoginReturnData>("auth/login", {
    body: {
      email: email.value,
      password: password.value,
    },
  });
}

interface SignupParams extends LoginParams {
  passwordConfirmation: ValidatedInput;
}

export function signup({
  email,
  password,
  passwordConfirmation: password_confirmation,
}: SignupParams) {
  return apiFetch<LoginReturnData>("auth/signup", {
    body: {
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
    },
  });
}
