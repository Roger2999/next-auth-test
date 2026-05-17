import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
interface Props {
  data: {
    title?: string;
    description?: string;
    icon?: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  };
}

export default function FeatureCard({ data }: Props) {
  return (
    <div className="border-border/50 bg-card/50 hover:bg-card/80 flex min-h-28 w-sm max-w-[80%] items-center justify-center gap-4 rounded-lg border p-4 transition-colors sm:w-full sm:max-w-full sm:justify-start">
      <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
        {data.icon && <data.icon className="h-5 w-5" />}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{data.title && data.title}</h3>
        <p className="text-muted-foreground text-sm">
          {data.description && data.description}
        </p>
      </div>
    </div>
  );
}
