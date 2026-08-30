"use client";

import { registerUser } from "@/lib/firebase/users";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser({
        firstName,
        lastName,
        email,
        password,
      });

      router.push("/dashboard");
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        setError("This email address is already registered.");
      } else if (
        error instanceof FirebaseError &&
        error.code === "auth/weak-password"
      ) {
        setError("Password should be at least 6 characters.");
      } else if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-email"
      ) {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4 max-w-sm w-full">
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          className="border rounded-lg p-2 w-full"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          className="border rounded-lg p-2 w-full"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <input
          type="email"
          className="border rounded-lg p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="border rounded-lg p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded-lg px-4 py-2 w-full disabled:opacity-50"
      >
        {loading ? "Creating user..." : "Create User"}
      </button>
    </form>
  );
}
