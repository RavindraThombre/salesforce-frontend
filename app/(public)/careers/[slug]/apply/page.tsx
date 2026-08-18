import ApplyPageLayout from "./components/ApplyPageLayout";

interface ApplyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ApplyPage({ params }: ApplyPageProps) {
  const { slug } = await params;

  return <ApplyPageLayout slug={slug} />;
}
