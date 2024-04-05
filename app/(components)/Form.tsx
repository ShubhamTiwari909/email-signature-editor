"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputTypes } from "@/store/types";
import InputGroup from "./InputGroup";
import { baseSchema } from "@/store/schema";
import { usePathname } from "next/navigation";
import { useSignatureStore } from "@/store/store";
import { useEffect } from "react";

const SignatureForm = ({
  content,
  inputFields,
}: {
  content: string;
  inputFields: InputTypes[] | undefined;
}) => {
  // Global state and setter method from the store
  const { setIsFormValid, setInputFocus } = useSignatureStore((state) => state);

  const brandsWithRegions = ["sf", "ac", "lex", "af"];

  // Pathname to determine which form to render with initial data
  const pathname = usePathname();
  const index = pathname.split("/")[2];

  const getCurrentRouteSchema = (currentRoute: string) => {
    switch (currentRoute) {
      case "/signatures/sf":
        return baseSchema;
      default:
        return baseSchema;
    }
  };

  const finalSchema = getCurrentRouteSchema(pathname); // Implement this function to return the correct schema based on the route

  const {
    register, // register's input fields to the form
    handleSubmit, // handles form submission automatically with onSubmit
    formState: { errors, isValid }, // Gives access to the errors object
    setValue, // sets the value of the input manually
    watch, // watches the value of the input
    setFocus, // sets the focus on the input
  } = useForm({
    resolver: yupResolver(finalSchema), // yup schema validation with resolver
    mode: "all", // mode to validate the form inputs - all = onChange, onBlue, onSubmit
  });

  const watchData = watch(); // watches the value of all the inputs in real time

  useEffect(() => {
    setIsFormValid(true);
  }, []);

  /**
   * Handles the keyup event for an input field, updating the field value
   * and updating the global state with the latest form data.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyup event.
   * @param {RegisterNameTypes} registerName - The name of the input field.
   */
  const handleKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>,
    registerName: any
  ) => {
    // Update the field value on keyup
    const updatedValue = event.currentTarget.value; // Get the updated value from the input field
    setFocus(registerName); // sets the focus on the current input
    setValue(registerName, updatedValue); // Update the value of the input field in the form state
    setIsFormValid(isValid);
  };

  /**
   * Handles the download of the HTML content of the form.
   *
   * This function generates a Blob object from the HTML content,
   * creates a URL for the Blob, creates a download link element,
   * sets the URL and file name of the download link, triggers the
   * click event of the download link, and finally revokes the URL.
   */

  const handleDownload = () => {
    // Generate a Blob object from the HTML content
    const htmlContent = content;
    const blob = new Blob([htmlContent], { type: "text/html" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a download link element
    const fileName = "Template.html";
    const a = document.createElement("a");

    // Set the URL and file name of the download link
    a.href = url;
    a.download = `${fileName}.html`;

    // Trigger the click event of the download link
    a.click();

    // Revoke the URL after the download is complete
    URL.revokeObjectURL(url);
  };

  /**
   * Handles the form submission.
   *
   * This function updates the global state with the form data,
   * triggers the download of the HTML content, updates the
   * global state with the default data, and resets the form.
   *
   * @param {Brands} data - The form data.
   */
  const onSubmitHandler: SubmitHandler<any> = (data: any) => {
    // Trigger the download of the HTML content
    handleDownload();
  };

  return (
    <div className="flex flex-col">
      <form
        id="signature-form"
        className="space-y-8"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {inputFields?.map(({ label, type, registerName }: InputTypes) => {
          return (
            <InputGroup
              key={registerName as RegisterNameTypes}
              label={label}
              type={type}
              register={register}
              registerName={registerName as RegisterNameTypes}
              error={errors?.[registerName as keyof typeof errors]?.message}
              handleKeyUp={(e) => handleKeyUp(e, registerName)}
              onFocus={() => setInputFocus(true)}
            />
          );
        })}
      </form>
    </div>
  );
};

export default SignatureForm;
