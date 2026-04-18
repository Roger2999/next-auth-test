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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        name={name}
        type={type}
      />
      {children}
    </div>
  );
}
