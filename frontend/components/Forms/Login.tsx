import {
  VStack,
  StackProps,
  Heading,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button,
  useBoolean,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { motion, MotionProps } from "framer-motion";
import useFormValidity from "../../hooks/useFormValidity";
import useValidation from "../../hooks/useValidation";
import tv from "../../util/themeVariable";
import emailValidators from "../../validators/email";
import { login } from "../../api/auth";
import { useInputFeedback } from "../../hooks/useInputFeedback";
import { useAuth } from "../../context/auth";
import passwordValidators from "../../validators/password";
import useResetForm from "../../hooks/useResetForm";

const MotionVStack = motion(VStack) as React.FC<MotionProps & StackProps>;

interface LoginProps {
  rotate: boolean;
}

const LoginForm: React.FC<LoginProps> = ({ rotate }) => {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useBoolean();
  const [validity, evaluateValidity] = useFormValidity();
  const [feedback, evaluateFeedback] = useInputFeedback();

  // Email input setup
  const email = useValidation("email", emailValidators, {
    plugins: [feedback, validity],
  });

  // Password input setup
  const password = useValidation("password", passwordValidators, {
    plugins: [feedback, validity],
  });

  const resetForm = useResetForm(email, password);

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();

    const res = await login({ email, password });

    evaluateFeedback(res);

    if (!res.isError) {
      localStorage.setItem("access", res.data.access);
      auth.login(res.data.access);
    }
  }

  return (
    <MotionVStack
      onSubmit={handleFormSubmit}
      initial={{
        opacity: 0,
        y: 40,
      }}
      as="form"
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          stiffness: 150,
        },
      }}
      borderRadius={12}
      w="80%"
      py={4}
      px={6}
      mb="20px"
      gap="1rem"
      bg="alternateBackground"
      style={{
        pointerEvents: rotate ? "none" : "inherit",
        backfaceVisibility: "hidden",
      }}
    >
      <Heading fontSize="2xl">Log in</Heading>

      <FormControl {...email.controlProps}>
        <FormLabel htmlFor="si-email">Email</FormLabel>
        <Input
          autoComplete="off"
          {...email.inputProps}
          id="si-email"
          placeholder="someone@example.com"
        />
        {email.messages}
      </FormControl>
      <FormControl {...password.controlProps}>
        <FormLabel htmlFor="si-password">Password</FormLabel>
        <InputGroup>
          <Input
            {...password.inputProps}
            autoComplete="current-password"
            id="si-password"
            type={showPassword ? "text" : "password"}
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
      <HStack justify="space-between" w="full">
        <Button
          color="red.400"
          _focus={{ boxShadow: tv("shadows.error") }}
          onClick={resetForm}
        >
          Reset form
        </Button>
        <Button
          type="submit"
          disabled={!evaluateValidity()}
          variant="primary"
          color="white"
        >
          Submit
        </Button>
      </HStack>
    </MotionVStack>
  );
};

export default LoginForm;
