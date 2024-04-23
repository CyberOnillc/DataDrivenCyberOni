import CaseStudyCardSkeleton from "@/components/casestudies/CaseStudyCardSkeleton";
import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";
import { LoadingSpinner } from "@/components/shared/icons";

async function CaseStudyListLoader() {
  return (
    <div className="h-fit w-full">
      <LoadingSpinner />
    </div>
  );
}

async function getData(list: string) {
  return [];
}

export default CaseStudyListLoader;
