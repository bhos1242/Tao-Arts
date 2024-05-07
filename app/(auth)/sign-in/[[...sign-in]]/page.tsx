import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
  <div className="min-h-screen text-center flex justify-center items-center">
    <SignIn path="/sign-in" />
    </div>)
}