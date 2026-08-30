import RegisterForm from "@/components/ui/dashboard/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white border rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Create New User</h1>

        <RegisterForm />
      </div>
    </main>
  );
}
