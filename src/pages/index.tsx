import { signIn } from "next-auth/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <button
        className="bg-blue-500 py-3 px-7 rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          signIn("google", { callbackUrl: "/" });
        }}
      >
        Log in with Google
      </button>
    </main>
  );
}
