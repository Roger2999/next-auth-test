import Link from "next/link";

export default function Home() {
  return (
   
      <main className="flex flex-col items-center w-full gap-5 p-10 flex-1">
        <h1 className={`text-2xl`}>Welcome to my project</h1>
        <div className="flex gap-5">
      <Link className="text-blue-500 hover:text-blue-600 border rounded-md w-20 p-1 text-center" href="/signin">Sign in</Link>
      <Link className="text-blue-500 hover:text-blue-600 border rounded-md w-20 p-1 text-center" href="/signup">Sign up</Link>
        </div>
      </main>
 
  );
}
