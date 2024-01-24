import ServiceCardSkeleton from "@/components/services/ServiceCardSkeleton"
import React from 'react'

async function BlogListLoader() {
    return (
        <div className="w-full h-fit">
            <div className="container mx-auto ">
                <div className="conatiner mx-10 my-10 flex flex-wrap items-center overflow-hidden ">
                    {new Array(4).fill(1).map((value, index) => {

                        return (
                            <div key={index} className={`w-full lg:w-1/4 p-5 `}>

                                <ServiceCardSkeleton />
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

async function getData(list: string) {
    return []
}

export default BlogListLoader