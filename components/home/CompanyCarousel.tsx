import React from 'react'
import Image from "next/image";
export type Company = {
    name: string;
    image: string;
}

function CompanyCarousel({ cards }: { cards: Company[] }) {
    return (
        <>
            <div className="relative flex flex-wrap gap-1 justify-center items-center object-contain">
                {cards.map((card, index)=> {
                    return (
                        <div key={index} className="flex items-center h-20 w-30">
                            <Image key={index} className="object-scale-down p-5" src={card.image} alt={card.name} width={160} height={100}></Image>
                        </div>
                    )
                })}
            </div>
            <div className="text-center">Our Technology is <span className="font-bold">Used</span> and <span className="font-bold">Trusted</span> by the world’s most ambitious teams.</div>

        </>
    )
}

export default CompanyCarousel