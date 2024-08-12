import { getAll } from "@/crud/casestudy";
import { Owner } from "@/data/ownerData";
import { seoUrl } from "@/lib/utils";
import { ReactNode } from "react";
export async function generateStaticParams() {
  const cases = await getAll(0, 0, { orgId: Owner.orgId });
  return cases.records.map((caseStudy) => ({
    id: seoUrl(caseStudy.title, caseStudy.id),
  }));
}

export default async function CaseStudyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
