export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[89dvh] w-full flex-col items-center justify-center gap-5 px-10 py-16 sm:px-10 md:p-10">
      {children}
    </div>
  );
}
