import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen text-center flex justify-center items-center">
    <SignUp path="/sign-up" />
    </div>
  );
}