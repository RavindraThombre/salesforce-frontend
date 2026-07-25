"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RichTextEditor from "@/app/components/common/RichTextEditor";

interface BlogContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BlogContentEditor({
  value,
  onChange,
}: BlogContentEditorProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Blog Content</CardTitle>

        <p className="text-sm text-muted-foreground">
          Write the complete article using headings, images, lists, code blocks,
          and other formatting options.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-xl border bg-background overflow-hidden">
          <RichTextEditor value={value} onChange={onChange} />
        </div>

        <div className="rounded-lg bg-muted/40 p-4">
          <h4 className="text-sm font-semibold">Writing Tips</h4>

          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Use clear headings to organize your content.</li>
            <li>Add screenshots where necessary.</li>
            <li>Keep paragraphs short for better readability.</li>
            <li>Highlight important Salesforce concepts.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
