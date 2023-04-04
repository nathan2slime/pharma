export type SelectValue = {
  title: string;
  key: string;
};

export type SelectProps = {
  value?: SelectValue;
  className?: string;
  open?: boolean;
  placeholder?: string;
  options?: SelectValue[];
  disabled?: boolean;
  label?: string;
  onChange?: (value: SelectValue) => void;
  onToggle?: (value: boolean) => void;
};
