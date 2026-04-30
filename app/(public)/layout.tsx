export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-8 px-0 md:p-10 w-full">
      {children}
    </div>
  );
}
