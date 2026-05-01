export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 px-0 py-8 md:p-10">
      {children}
    </div>
  );
}
