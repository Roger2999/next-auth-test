import Link from "next/link";
import { deleteAllDbUser } from "./(auth)/actions/auth";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full gap-5 p-10 flex-1">
      <h1 className={`text-2xl`}>Welcome to my project</h1>
      <div className="flex gap-5">
        <Link
          className="text-blue-500 hover:text-blue-600 border rounded-md w-20 p-1 text-center"
          href="/signin"
        >
          Sign in
        </Link>
        <Link
          className="text-blue-500 hover:text-blue-600 border rounded-md w-20 p-1 text-center"
          href="/signup"
        >
          Sign up
        </Link>
        <button onClick={deleteAllDbUser} className="border rounded-md p-1">
          Delete all db users
        </button>
      </div>
    </main>
  );
}
