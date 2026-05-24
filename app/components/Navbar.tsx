import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      {" | "}
      <Link href="/my-projects">My Projects</Link>
      {" | "}
      <Link href="/about-me">About Me</Link>
    </nav>
  );
}
