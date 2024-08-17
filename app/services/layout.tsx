import CompanyCarousel from "@/components/home/CompanyCarousel";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";


function ServiceLayout({ children }: { children: ReactNode }) {
    return (<>

        <div>
            <section className="container mx-auto flex flex-col lg:flex-row  gap-10 justify-center items-center">
                <div className="p-5 lg:w-1/3">
                    <div className="text-service-green">A TRUSTED COMPANY</div>
                    <h1 className="text-7xl">Next-Gen Software Services for Businesses.</h1>
                    <div className="border-l-4 border-service-green px-3">Checkout Services We Offer Below!</div>
                    <Link href={'/schedule'} className="rounded-full p-3 bg-service-green text-white flex items-center w-fit gap-3 my-5 shadow-[0_10px_40px_0px_#33D3D454]">Sturggling? Book a Call <MoveRight /></Link>

                </div>
                <div className="lg:w-1/2">
                    <Image className="object-fill" src={'/images/service-hero.png'} alt="service-hero" height={500} width={500} />
                </div>

            </section>
            <section className="container mx-auto">
                <div className="container my-4">
                    <CompanyCarousel cards={companies}></CompanyCarousel>
                </div>
            </section>
            <section>

            </section>
            {children}
            <section>

            </section>

        </div>


    </>);
}

const companies = [{ name: 'google', image: '/images/Google cloud.png' },
{ name: 'Ebay', image: '/images/Ebay.png' },
{ name: 'Tux', image: '/images/Tux.png' },
{ name: 'Spotify', image: '/images/Spotify.png' },]


export default ServiceLayout;