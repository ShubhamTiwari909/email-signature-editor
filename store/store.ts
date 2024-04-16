import { create } from "zustand";

type SignatureStoreTypes = {
  isFormValid: boolean;
  inputFocus: boolean;
  setIsFormValid: (isFormValid: boolean) => void;
  setInputFocus: (inputFocus: boolean) => void;
};

export const useSignatureStore = create<SignatureStoreTypes>()((set) => ({
  isFormValid: false,
  inputFocus: true,
  setIsFormValid: (isFormValid: boolean) => set(() => ({ isFormValid })),
  setInputFocus: (inputFocus: boolean) => set(() => ({ inputFocus })),
}));
