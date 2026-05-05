export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-[89dvh] w-full flex-col items-center justify-center gap-5 px-0 md:p-10">
      {children}
    </div>
  );
}
