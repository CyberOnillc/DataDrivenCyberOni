import Image from "next/image";

export type FeatureCardProps = {
    image:string,
    title:string,
    description:string
}

function FeatureCard({image, title, description}: FeatureCardProps) {
    return (
    <div className=" flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-200 p-5 text-black shadow-md  h-full">
        <Image
            src={image}
            alt={title}
            height={50}
            width={50}
        ></Image>
        <div className="text-2xl font-bold">{title}</div>
        <div className="text-base text-zinc-800">
            {description}
        </div>
    </div>);
}

export default FeatureCard;