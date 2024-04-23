import Image from "next/image";

function DevelopmentPathItem({ name, content, image }: {
    name: string,
    content: string,
    image: string
}) {
    return (
        <div className="flex flex-1 flex-col items-center justify-start min-h-full">
            <Image
                src={image}
                alt="step-2"
                className=" h-40 w-40 object-contain lg:w-full"
                height={300}
                width={300}
            />
            <div className="flex flex-col gap-3">
                <div className="text-3xl text-[#E4A321]">{name}</div>
                <div className="mx-auto w-2/3">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default DevelopmentPathItem;