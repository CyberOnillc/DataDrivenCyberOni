import { read } from "@/crud/casestudy";
import prisma from "@/lib/prisma";
import { Metadata, ResolvingMetadata } from "next";
import { extractUUID, stripFileExtension } from "@/lib/utils";
import { Article, WithContext } from "schema-dts";
import { redirect } from "next/navigation";
import { CaseStudy } from "@/components/component/case-study";
import { CreateCaseStudyDTO } from "@/crud/DTOs";
import { Owner } from "@/data/ownerData";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const seoTitle = params.id;
  const id = extractUUID(seoTitle);
  const caseStudy = (await read(id, {orgId: Owner.orgId})) as unknown as CreateCaseStudyDTO;

  // optionally access and extend (rather than replace) parent metadata
  let metadata: Metadata = {};
  if (caseStudy) {
    metadata.title = caseStudy?.title as string;
    metadata.description = caseStudy?.preview;
    metadata.openGraph = {
      type: "article",
      title: caseStudy?.title,
      description: caseStudy?.preview,
      images: [...caseStudy.images.map((image) => image.src)],
    };
    metadata.twitter = {
      title: caseStudy?.title,
      images: [...caseStudy.images.map((image) => image.src)],
      description: caseStudy?.preview,
    };
    metadata.keywords = caseStudy?.title.split("");
  }
  return metadata;
}
async function CaseStudyPage({ params }: { params: { id: string } }) {
  const seoTitle = params.id;
  const id = extractUUID(seoTitle);
  const caseStudy = (await read(id,{orgId: Owner.orgId})) as unknown as CreateCaseStudyDTO;
  if (!caseStudy) redirect("/404");

  const jsonLd: WithContext<Article> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": id,
    description: caseStudy.preview,
    name: caseStudy.title,
    image: {
      "@type": "ImageObject",
      url:
        caseStudy.images && caseStudy.images.length > 0
          ? caseStudy.images[0].src
          : "",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudy caseStudy={caseStudy} />
    </>
  );
}

export default CaseStudyPage;
