import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./auth/LogoutButton";

export default function HeaderDashboard() {
  return (
    <div className="bg-white py-8 px-[5%] shadow-sm">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/hw_logo.png"
            alt="High Wire Logo"
            width={50}
            height={50}
            className="inline-block mr-2"
          />
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/dashboard/articles"
            className="text-lg font-medium hover:opacity-80"
          >
            Articles
          </Link>

          <Link
            href="/dashboard/inquiries"
            className="text-lg font-medium hover:opacity-80"
          >
            Inquiries
          </Link>

          <Link
            href="/dashboard/users"
            className="text-lg font-medium hover:opacity-80"
          >
            Users
          </Link>
          <LogoutButton />
        </nav>
      </div>
    </div>
  );
}
