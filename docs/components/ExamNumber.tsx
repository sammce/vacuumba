import { Text } from "@chakra-ui/react";
const ExamNumber = () => {
  return (
    <Text color="gray.500" fontSize="2xl" textAlign="center">
      Exam number:{" "}
      <Text as="span" color="primary" fontWeight="bold" letterSpacing="widest">
        121384
      </Text>
    </Text>
  );
};

export default ExamNumber;
