import type { InputProps } from "../types/InputProps";

export default function getInputProps(
  type: string = "text",
  label?: string,
): InputProps {
  return {
    variant: "bordered",
    type: type,
    label: label,
  };
}
export function calcDateOfBirth(dateOfBirth: string):number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age ;
}
