import JobDetailsPageLayout from "./components/JobDetailsPageLayout";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  return <JobDetailsPageLayout id={slug} />;
}
