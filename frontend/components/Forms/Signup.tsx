import useValidation from "../../hooks/useValidation";
import {
  Heading,
  VStack,
  FormLabel,
  Input,
  FormControl,
  HStack,
  Button,
  StackProps,
  InputGroup,
  InputRightElement,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion, MotionProps } from "framer-motion";
import useFormValidity from "../../hooks/useFormValidity";
import tv from "../../util/themeVariable";
import emailValidators from "../../validators/email";
import passwordValidators from "../../validators/password";
import { useInputFeedback } from "../../hooks/useInputFeedback";
import { signup } from "../../api/auth";
import { useAuth } from "../../context/auth";
import useResetForm from "../../hooks/useResetForm";

const MotionVStack = motion(VStack) as React.FC<MotionProps & StackProps>;

interface SignUpProps {
  rotate: boolean;
}

const SignUpForm: React.FC<SignUpProps> = ({ rotate }) => {
  const toast = useToast();
  const auth = useAuth();

  const [showPassword, setShowPassword] = useBoolean();

  const [validity, evaluateValidity] = useFormValidity();
  const [feedback, evaluateFeedback] = useInputFeedback();

  const email = useValidation("email", emailValidators, {
    plugins: [feedback, validity],
  });

  const password = useValidation("password", passwordValidators, {
    plugins: [feedback, validity],
  });

  const passwordConfirmation = useValidation(
    "passwordConfirmation",
    {
      "Passwords must match": value => value === password.value,
    },
    {
      plugins: [feedback, validity],
    }
  );

  const resetForm = useResetForm(email, password, passwordConfirmation);

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const res = await signup({ email, password, passwordConfirmation });

    evaluateFeedback(res);

    if (!res.isError) {
      localStorage.setItem("access", res.data.access);
      auth.login(res.data.access);
    }
  }

  return (
    <MotionVStack
      borderRadius={12}
      pos="absolute"
      as="form"
      onSubmit={handleFormSubmit}
      w="80%"
      py={4}
      px={6}
      gap="1rem"
      transform="rotateY(180deg)"
      bg="alternateBackground"
      style={{
        pointerEvents: rotate ? "inherit" : "none",
        backfaceVisibility: "hidden",
      }}
    >
      <Heading fontSize="2xl">Sign up</Heading>
      <FormControl {...email.controlProps}>
        <FormLabel htmlFor="su-email">Email</FormLabel>
        <Input
          id="su-email"
          autoComplete="email"
          {...email.inputProps}
          placeholder="someone@example.com"
        />
        {email.messages}
      </FormControl>
      <FormControl {...password.controlProps}>
        <FormLabel htmlFor="su-password">Password</FormLabel>
        <InputGroup>
          <Input
            {...password.inputProps}
            type={showPassword ? "text" : "password"}
            id="su-password"
            autoComplete="new-password"
            placeholder="••••••••••"
          />
          <InputRightElement>
            <Button
              h="calc(100% - .6rem)"
              mr=".6rem"
              onClick={setShowPassword.toggle}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {password.messages}
      </FormControl>
      <FormControl {...passwordConfirmation.controlProps}>
        <FormLabel htmlFor="su-passwordc">Confirm Password</FormLabel>
        <Input
          {...passwordConfirmation.inputProps}
          placeholder="••••••••••"
          autoComplete="none"
          id="su-passwordc"
          type="password"
        />
        {passwordConfirmation.messages}
      </FormControl>
      <HStack justify="space-between" w="full">
        <Button
          color="red.400"
          _focus={{ boxShadow: tv("shadows.error") }}
          onClick={resetForm}
        >
          Reset form
        </Button>
        <Button
          disabled={!evaluateValidity()}
          variant="primary"
          color="white"
          type="submit"
        >
          Submit
        </Button>
      </HStack>
    </MotionVStack>
  );
};

export default SignUpForm;
