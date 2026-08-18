import { Card, CardContent } from "@/components/ui/card";

interface JobSectionProps {
  title: string;
  content: string;
}

export default function JobSection({ title, content }: JobSectionProps) {
  if (!content?.trim()) {
    return null;
  }

  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>

        {lines.length > 1 ? (
          <ul className="space-y-3">
            {lines.map((line, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-primary" />

                <span className="leading-7 text-muted-foreground">{line}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="leading-8 text-muted-foreground">{content}</p>
        )}
      </CardContent>
    </Card>
  );
}
