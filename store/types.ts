import { UseFormRegister } from "react-hook-form";

export type InputsTypes = {
  label: string;
  type: string;
  registerName: string;
};

export type InputInteractiveTypes = {
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | undefined;
  register: UseFormRegister<any>;
};

export type InputTypes = InputsTypes & InputInteractiveTypes;
