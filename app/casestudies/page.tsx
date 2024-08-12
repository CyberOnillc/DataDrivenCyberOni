import CaseStudyCard from "@/components/casestudies/CaseStudyCard";
import Pagination from "@/components/Pagination";
import { getAll } from "@/crud/casestudy";
import { CreateCaseStudyDTO } from "@/crud/DTOs";
import { Owner } from "@/data/ownerData";
import { Image } from "@prisma/client";

async function CaseStudyList({
  searchParams,
}: {
  searchParams: { page: number };
}) {
  let page  =  searchParams.page && Number(searchParams.page) !== 0 ? Number(searchParams.page) : 1;

  const data = await getData(page);

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="sm:text-3l mx-10 my-5 text-5xl capitalize">
          Case Studies
        </div>
      </div>
      <div className="w-full">
        <div className="container mx-auto ">
          <div className="conatiner mx-10 my-10 flex flex-wrap">
            {(data.records as unknown as CreateCaseStudyDTO[]).map(
              (casestudy, index) => {
                return (
                  <div key={index} className={`w-full p-5 lg:h-96  lg:w-1/2`}>
                    <CaseStudyCard
                      id={casestudy.id as string}
                      image={
                        casestudy.images
                          ? (casestudy.images as unknown as Image[])[0]
                          : null
                      }
                      previewContent={casestudy.preview}
                      title={casestudy.title}
                    />
                  </div>
                );
              },
            )}
          </div>
          <Pagination
            currentPage={searchParams.page ?? 1}
            pathname="/casestudies"
            totalPages={data.totalPages}
          />
        </div>
      </div>
    </div>
  );
}

async function getData(page: number) {
  const cases = await getAll(page,10, { orgId: Owner.orgId });

  return cases;
}

export default CaseStudyList;
