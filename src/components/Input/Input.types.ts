export interface InputProps {
  className?: string;
  id: string;
  label: string;
  withSubmit?: boolean;
  onSubmit?: () => void;
  required?: boolean;
}
