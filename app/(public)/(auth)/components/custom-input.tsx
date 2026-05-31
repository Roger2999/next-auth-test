interface Props {
  children: React.ReactNode;
  label: string;
  defaultValue?: string;
  name: string;
  type?: string;
}
export default function CustomInput({
  children,
  label,
  defaultValue,
  name,
  type,
}: Props) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        defaultValue={defaultValue || undefined}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        name={name}
        type={type}
      />
      {children}
    </div>
  );
}
