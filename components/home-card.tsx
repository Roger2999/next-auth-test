interface Props {
  title?: string;
  items?: string[];
}
export default function HomeCard({ title, items }: Props) {
  return (
    <div className="space-y-5 py-2 px-4 sm:px-10 border border-white/40 shadow-2xl rounded-md backdrop-blur-xl">
      <h2>{title ? title : "title"}:</h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {items?.map((item) => (
          <li
            key={item}
            className="backdrop-blur-md bg-white/20 border border-black/10 p-2 rounded-md hover:scale-105 transition-all duration-100 ease-in text-center hover:bg-accent cursor-pointer"
          >
            {item ? item : ["item"]}
          </li>
        ))}
      </ul>
    </div>
  );
}
