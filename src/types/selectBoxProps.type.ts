export interface SelectBoxProps {
  placeholder: string;
  items: Array<{ value: string; text: string }>;
  onChange?: (value: string) => void;
}
