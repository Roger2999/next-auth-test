import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full">
      <Link className="text-blue-500 hover:text-blue-600" href="/signin">Signin</Link>
      <Link className="text-blue-500 hover:text-blue-600" href="/signup">Signup</Link>
      </main>
    </div>
  );
}
