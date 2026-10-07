import { Button } from "@heroui/react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0d1514] px-4 text-[#e8f1ef]">
      <div className="mx-auto flex min-h-screen w-full max-w-150 items-center justify-center">
        <div className="w-full text-center">
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-[#3cc4c2]">
              CIRCLE
            </h1>
          </div>

          {/* 404 */}
          <div className="relative mb-8">
            <h2 className="select-none text-[140px] font-extrabold leading-none tracking-[-0.08em] text-[#152220] sm:text-[180px]">
              404
            </h2>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-2xl border border-[#243634] bg-[#152220]/90 px-6 py-3 shadow-lg backdrop-blur-md">
                <span className="text-sm font-semibold text-[#3cc4c2]">
                  Page not found
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-[#243634] bg-[#152220] p-6 shadow-[0_1px_3px_rgba(18,33,31,.25)] sm:p-8">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0e1d1b] text-[#3cc4c2]">
              <Search size={26} strokeWidth={2} />
            </div>

            <h3 className="mb-2 text-2xl font-extrabold tracking-tight">
              Lost your way?
            </h3>

            <p className="mx-auto mb-7 max-w-105 text-sm leading-6 text-[#8fa5a1]">
              The page you are looking for does not exist or has been moved.
              Head back home and continue where you left off.
            </p>

            {/* Actions */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                onPress={() => navigate("/")}
                startContent={<Home size={17} />}
                className="h-11 rounded-full bg-[#3cc4c2] px-6 font-semibold text-[#062322] hover:bg-[#46d0d3]"
              >
                Back to Home
              </Button>

              <Button
                variant="bordered"
                onPress={() => navigate(-1)}
                startContent={<ArrowLeft size={17} />}
                className="h-11 rounded-full border-[#243634] px-6 font-semibold text-[#e8f1ef] hover:bg-[#0e1d1b]"
              >
                Go Back
              </Button>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-xs text-[#5b6d6a]">
            CIRCLE · Stay connected with your people
          </p>
        </div>
      </div>
    </div>
  );
}
