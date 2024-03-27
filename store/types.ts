import { UseFormRegister } from "react-hook-form";

export type RegisterNameTypes =
  | "image"
  | "position"
  | "name"
  | "email"
  | "phone"
  | "bookingLink"
  | "linkedin";

export type InputsTypes = {
  label: string;
  type: string;
  registerName: RegisterNameTypes;
};

export type InputInteractiveTypes = {
  handleKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | undefined;
};

export type SFCAInputGroupTypes = InputsTypes & InputInteractiveTypes & {
  register: UseFormRegister<Brands>;
};

export type WRInputGroupTypes = InputsTypes & InputInteractiveTypes & {
  register: UseFormRegister<Brands>;
};

export type LEXInputGroupTypes = InputsTypes & InputInteractiveTypes & {
  register: UseFormRegister<Brands>;
};

export type Data = {
  name: string;
  position: string;
  email: string;
  phone: string;
  bookingLink: string;
  image: string;
};

export type WR = Data & {
  source: string;
};

export type LEX = Data & {
  linkedin: string
}

export type InputTypes = InputsTypes;
export type InputGroupTypes = SFCAInputGroupTypes | WRInputGroupTypes | LEXInputGroupTypes;
export type Brands = Data | WR | LEX;