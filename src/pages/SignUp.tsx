import { Alert, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../schemas/signUpSchema";
import { authServices } from "../services/authService";
import type { RegisterData } from "../types/registerData";
import getInputProps from "../utils/Helpers";

export default function SignUp() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  async function signUp(values: RegisterData) {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await authServices.signUp(values);

      setSuccessMsg(data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
      //
    } catch (error: any) {
      setErrMsg(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07100f] px-5 py-16 text-white">
      <div className="mx-auto w-full max-w-99">
        <div className="mb-4">
          <h1 className="text-[40px] font-bold  text-[#3cc1c4]">CIRCLE</h1>

          <p className="mt-5 text-[12px] text-[#8bb5b7]">
            Create your account. It takes a minute.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(signUp)}
          className="rounded-[15px] border border-[#263c3a] bg-[#101d1b] p-4"
        >
          <div className="grid gap-3.5">
            <Input
              {...register("name")}
              {...getInputProps("text", "Name")}
              isInvalid={!!errors.name?.message}
              errorMessage={errors.name?.message as string}
              classNames={{
                base: "auth-input-base",
                label: "auth-input-label",
                inputWrapper: "auth-input-wrapper",
                input: "auth-input",
              }}
            />


            <Input
              {...register("email")}
              {...getInputProps("email", "Email")}
              isInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message as string}
              classNames={{
                base: "auth-input-base",
                label: "auth-input-label",
                inputWrapper: "auth-input-wrapper",
                input: "auth-input",
              }}
            />

            <Input
              {...register("password")}
              {...getInputProps("password", "Password")}
              isInvalid={!!errors.password?.message}
              errorMessage={errors.password?.message as string}
              classNames={{
                base: "auth-input-base",
                label: "auth-input-label",
                inputWrapper: "auth-input-wrapper",
                input: "auth-input",
              }}
            />

            <Input
              {...register("rePassword")}
              {...getInputProps("password", "Confirm password")}
              isInvalid={!!errors.rePassword?.message}
              errorMessage={errors.rePassword?.message as string}
              classNames={{
                base: "auth-input-base",
                label: "auth-input-label",
                inputWrapper: "auth-input-wrapper",
                input: "auth-input",
              }}
            />

            <Input
              {...register("dateOfBirth")}
              {...getInputProps("date", "Birth Date")}
              isInvalid={!!errors.dateOfBirth?.message}
              errorMessage={errors.dateOfBirth?.message as string}
              classNames={{
                base: "auth-input-base",
                label: "auth-input-label",
                inputWrapper: "auth-input-wrapper",
                input: "auth-input",
              }}
            />

            <select
              {...register("gender")}
              {...getInputProps(undefined, "Gender")}
              className="h-12 w-full rounded-[11px] border border-[#29403e] bg-[#07100f] px-3 text-[13px] text-[#8bb5b7] outline-none focus:border-[#3cc1c4]"
              defaultValue=""
            >
              <option value="" disabled>
                Select gender
              </option>

              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {errors.gender && (
              <p className="text-xs text-danger">
                {errors.gender.message as string}
              </p>
            )}

            <Button
              isLoading={isLoading}
              color="primary"
              variant="solid"
              type="submit"
              className="mt-1 h-9.5 w-full rounded-full bg-[#3cc1c4] text-[13px] font-semibold text-[#07100f] hover:bg-[#45cdd0]"
            >
              Create account
            </Button>

            {errMsg && (
              <Alert
                hideIcon
                color="danger"
                title={errMsg}
                variant="faded"
                classNames={{
                  base: "py-2 text-center bg-red-500/10 border-red-500/20",
                  title: "text-xs",
                }}
              />
            )}

            {successMsg && (
              <Alert
                hideIcon
                color="success"
                title={successMsg}
                variant="faded"
                classNames={{
                  base: "py-2 text-center bg-green-500/10 border-green-500/20",
                  title: "text-xs",
                }}
              />
            )}
          </div>
        </form>

        <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-[#8bb5b7]">
          <span>Already have an account?</span>

          <Link
            to="/signin"
            className="rounded-full border border-[#29403e] px-3 py-1.5 text-[#8bb5b7] transition hover:border-[#3cc1c4] hover:text-[#3cc1c4]"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
