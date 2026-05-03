interface Props {
  title?: string;
  items?: string[];
}
export default function HomeCard({ title, items }: Props) {
  return (
    <div className="space-y-5 rounded-md border border-white/40 px-4 py-2 shadow-2xl backdrop-blur-xl sm:px-10">
      <h2>{title ? title : "title"}:</h2>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {items?.map((item) => (
          <li
            key={item}
            className="hover:bg-accent cursor-pointer rounded-md border border-black/10 bg-white/20 p-2 text-center backdrop-blur-md transition-all duration-100 ease-in hover:scale-105"
          >
            {item ? item : ["item"]}
          </li>
        ))}
      </ul>
    </div>
  );
}
