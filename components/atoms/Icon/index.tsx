// THIS EXAMPLES ALLOWS FOR AUTOCOMPLETE FEATURE FOR THE ICON SIZES <SM, MD, LG> BUT ALSO OTHER VARIABLE STRINGS ARE ACCEPTED AS INPUT TOO.

type IconSize = LooseAutoComplete<"sm" | "md" | "lg">

type LooseAutoComplete<T extends string> = T | Omit<string, T>

interface IconProps {
  size: IconSize;
}

export const Icon = (props: IconProps) => {
  return <></>;
};

const Component = () => {
  return (
    <>
      <Icon size="sm"></Icon>
      <Icon size="something"></Icon>
    </>
  );
};
