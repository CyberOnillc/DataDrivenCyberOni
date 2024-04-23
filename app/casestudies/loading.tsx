import CaseStudyCardSkeleton from "@/components/casestudies/CaseStudyCardSkeleton";
import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton";

async function CaseStudyListLoader() {
  return (
    <div className="h-fit w-full">
      <div className="container mx-auto ">
        <div className="container mx-auto">
          <div className="sm:text-3l mx-10 my-5 text-5xl capitalize">
          Case Studies
          </div>
        </div>
        <div className="conatiner mx-10 my-10 flex flex-wrap items-center overflow-hidden ">
          {new Array(5).fill(1).map((value, index) => {
            return (
              <div key={index} className={`w-full p-5 lg:w-1/2 `}>
                <CaseStudyCardSkeleton />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

async function getData(list: string) {
  return [];
}

export default CaseStudyListLoader;
