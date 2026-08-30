import Link from "next/link";
import LoginForm from "@/components/ui/dashboard/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Login</h1>

        <p className="text-sm text-gray-500 mb-6">
          Sign in to access your dashboard.
        </p>

        <LoginForm />

        <p className="text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-black font-medium underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
