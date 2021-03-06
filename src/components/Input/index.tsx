import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";

interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  error?: FieldError | null;
  icon?: IconType;
}

type inputVariationOption = {
  [key: string]: string;
};

const inputVariation: inputVariationOption = {
  error: "feedback.negative",
  default: "grey.0",
  focus: "grey.600",
  filled: "feedback.success",
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, icon: Icon, label, ...rest },
  ref
) => {
  const [value, setValue] = useState("");
  const [variation, setVariation] = useState("default");

  useEffect(() => {
    if (error) {
      return setVariation("error");
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation("focus");
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVariation("filled");
    }
  }, [error, value]);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup flexDirection="column">
      {!!label && (
        <FormLabel color="grey.300" h="15px" fontSize="xs">
          {label}
        </FormLabel>
      )}
      <ChakraInput
        id={name}
        name={name}
        onChangeCapture={(e) => setValue(e.currentTarget.value)}
        onBlurCapture={handleInputBlur}
        onFocus={handleInputFocus}
        borderColor={inputVariation[variation]}
        color={inputVariation[variation]}
        variant="outline"
        _hover={{ bgColor: "grey.0" }}
        _placeholder={{ color: "grey.300" }}
        _focus={{
          bg: "grey.0",
        }}
        size="lg"
        h="60px"
        ref={ref}
        {...rest}
      />
        {Icon && (
          <InputRightElement>
            <Button bg="primaryPalette.primary" color="white" right="20px" top="10px">
              <Icon />
            </Button>
          </InputRightElement>
        )}
        {!!error && (
          <FormErrorMessage color="feedback.negative">
            {error.message}
          </FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
