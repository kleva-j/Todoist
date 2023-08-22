import {
  useRadioGroup,
  RadioProps,
  useRadio,
  useToast,
  HStack,
  VStack,
  chakra,
  Box,
} from "@chakra-ui/react";

export const Radio = (props: any) => {
  const { getInputProps, getCheckboxProps, htmlProps } = useRadio(props);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps()} hidden />
      <Box
        {...getCheckboxProps()}
        w="26px"
        h="26px"
        cursor="pointer"
        position="relative"
        outline="2px solid"
        outlineColor="gray.200"
        borderRadius="full"
        _checked={{
          outlineColor: props.colorScheme,
          _before: { bg: props.colorScheme },
        }}
        _focus={{ boxShadow: "none" }}
        _before={{
          content: `""`,
          position: "absolute",
          top: "3px",
          left: "3px",
          right: "3px",
          bottom: "3px",
          borderRadius: "full",
        }}
      />
    </chakra.label>
  );
};

interface RadioButtonProps extends RadioProps {
  defaultValue: string | number;
  handleChange?: (value: string) => void
}

let options = [
  { value: "red", colorScheme: "red" },
  { value: "orange", colorScheme: "orange" },
  { value: "yellow", colorScheme: "yellow" },
  { value: "green", colorScheme: "green" },
  { value: "blue", colorScheme: "blue" },
  { value: "teal", colorScheme: "teal" },
  { value: "cyan", colorScheme: "cyan" },
  { value: "purple", colorScheme: "purple" },
];

export const RadioButtons = (props: RadioButtonProps) => {
  const toast = useToast();

  const handleChange = (value: string) => {
    toast({
      title: `The value got changed to ${value}!`,
      status: "success",
      duration: 2000,
    });
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    ...props,
    defaultValue: props.defaultValue,
    onChange: handleChange,
  });

  return (
    <VStack
      mt="3"
      py="6"
      defaultValue="blue"
      borderTop="1px solid"
      borderColor="gray.200"
      gap="2"
      {...getRootProps()}
    >
      <HStack gap={2}>
        {options.slice(0, 4).map(({ value, ...rest }) => (
          <Radio key={value} {...getRadioProps({ value })} {...rest} />
        ))}
      </HStack>

      <HStack gap={2}>
        {options.slice(4).map(({ value, ...rest }) => (
          <Radio key={value} {...getRadioProps({ value })} {...rest} />
        ))}
      </HStack>
    </VStack>
  );
};
