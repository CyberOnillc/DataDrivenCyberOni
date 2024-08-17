import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function PayLater({ value, type }: { value?: string[], type?: 'service' | 'product' }) {
    return (
        <div className="relative flex flex-col justify-center items-center my-10">
            <div className="w-full flex gap-5 justify-around lg:text-lg text-sm">
                <div className="relative flex w-30 lg:w-60 justify-center items-center aspect-square rounded-[119px_157px_130px_158px/116px_121px_120px_150px] bg-gradient-to-tl from-yellow-500/60 to-orange-400/60 dark:from-yellow-300 dark:to-yellow-600 backdrop-blur-sm p-6 shadow-md">
                    <p className="text-orange-700 dark:text-gray-100  whitespace-pre-wrap font-bold m-2 text-xs lg:text-base line-clamp-3"> {value ? (value[0] || '3 Months free data storage') : '3 Months free data storage'}</p>
                </div>
                <div className="relative flex w-30 lg:w-60 justify-center items-center aspect-square rounded-[189px_180px_153px_124px/168px_196px_171px_155px] bg-gradient-to-bl from-emerald-300/95 via-emerald-400 to-emerald-500 dark:from-emerald-200 dark:to-emerald-700 backdrop-blur-sm p-6 shadow-md">
                    <p className="text-emerald-800 dark:text-gray-100  dark whitespace-pre-wrap font-bold m-2 text-xs lg:text-base line-clamp-3">{value ? (value[3] || 'Custom add-ons without the monthly cost') : 'Custom add-ons without the monthly cost'}</p>
                </div>
                <div className="relative flex w-30 lg:w-60 justify-center items-center aspect-square rounded-[107px_122px_108px_96px/117px_137px_111px_107px] bg-gradient-to-tl from-rose-300 to-rose-500 backdrop-blur-sm p-6 shadow-md">
                    <p className="text-white dark:text-gray-100 whitespace-pre-wrap font-bold m-2 text-xs lg:text-base line-clamp-3">{value ? (value[2] || 'Custom AI Integration') : 'Custom AI Integration'} </p>
                </div>
            </div>
            <Image src={'/images/pay-later.png'} alt="pay-later" height={500} width={500} />

            <div className="text-center font-bold mb-5 font-nunito text-2xl">Build Now Pay later</div>
            <div>
                <Link href={type==='service'? '/cart/services': '/cart/product'} className="rounded-full flex gap-3 bg-[#33D460] shadow-[0_10px_25px_0_#33D3D454] p-3 w-fit text-white text-center justify-center items-center">Apply Now <MoveRight /></Link>
            </div>
        </div>);
}

export default PayLater;