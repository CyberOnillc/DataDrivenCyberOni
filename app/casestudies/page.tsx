import CaseStudyCard from "@/components/casestudies/CaseStudyCard";
import ServiceCard from "@/components/services/ServiceCard";
import { getAll } from "@/crud/casestudy";
import prisma from "@/lib/prisma";
import { Image } from "@prisma/client";

async function CasestudyList() {
  const data = await getData();

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
            {data.records.map((casestudy, index) => {
              return (
                <div key={index} className={`w-full p-5 lg:h-96  lg:w-1/2`}>
                  <CaseStudyCard
                    id={casestudy.id}
                    image={casestudy.images ? (casestudy.images as unknown as Image[])[0] : null}
                    previewContent={casestudy.preview}
                    title={casestudy.title}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

async function getData() {
  const cases = await getAll(0, 0, prisma);

  return cases;
}

export default CasestudyList;
