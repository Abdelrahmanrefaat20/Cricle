import { Alert, Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";
import { signInSchema } from "../schemas/signInSchema";
import { authServices } from "../services/authService";
import type { LoginData } from "../types/loginDate";
import getInputProps from "../utils/Helpers";

export default function SignIn() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setIsLoggedIn } = useContext(authContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  async function signIn(values: LoginData) {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await authServices.signIn(values);
      console.log(data.data.token);
      localStorage.setItem("token", data.data.token);

      setSuccessMsg(data.message);
      setIsLoading(false);

      // navigate("/");
      setIsLoggedIn(true);
    } catch (error: any) {
      setErrMsg(error.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07100f] text-white flex items-center justify-center px-5">
      <div className="w-full max-w-87">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-[42px] leading-none font-bold tracking-[-1.5px] text-[#3cc1c4]">
            CIRCLE
          </h1>

          <p className="mt-6 text-[13px] text-[#8bb5b7]">
            Sign in to see what your people are up to.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit(signIn)}
          className="rounded-[15px] border border-[#263c3a] bg-[#101d1b] p-4"
        >
          <div className="grid gap-3.5">
            <Input
              {...register("email")}
              {...getInputProps("email", "Email or username")}
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

            <Button
              isLoading={isLoading}
              color="primary"
              variant="solid"
              type="submit"
              className="mt-1 h-9.5 w-full rounded-full bg-[#3cc1c4] text-[14px] font-semibold text-[#07100f] hover:bg-[#45cdd0]"
            >
              Sign in
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

        {/* Signup */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[13px] text-[#8bb5b7]">
          <span>New here?</span>

          <Link
            to="/signup"
            className="rounded-full border border-[#29403e] px-3 py-1.5 text-[#8bb5b7] transition hover:border-[#3cc1c4] hover:text-[#3cc1c4]"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
