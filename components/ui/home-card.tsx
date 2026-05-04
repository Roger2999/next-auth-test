interface Props {
  title?: string;
  items?: string[];
}

export default function HomeCard({ title = "Título", items = [] }: Props) {
  return (
    <div className="border-border/50 space-y-5 rounded-md border p-4 shadow-2xl sm:px-10">
      <h2>{title}:</h2>
      <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="border-border/50 bg-card/50 hover:bg-card/80 flex items-center justify-center gap-4 rounded-lg border p-4 transition-colors sm:w-full"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
