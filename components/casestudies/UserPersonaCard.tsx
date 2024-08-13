import { Image as userImage } from "@prisma/client";
import Image from "next/image";

export type UserPersonaProps = {
    name: string,
    age: number,
    gender: string,
    bio: string,
    goals: string[],
    painPoints: string[],
    image ?: userImage
}

function UserPersonaCard({ name, age, bio, gender, goals, image, painPoints }: UserPersonaProps) {
    return (<>
        <div className="flex flex-col lg:flex-row rounded-2xl shadow-lg p-4">
            <div className="relative lg:w-1/2 text-white">
                <Image className="w-full h-full rounded-lg object-cover" src={image ? image.src : '/placeholder.svg'} alt={name} height={500} width={500} />
                <div className="absolute bottom-0 w-full flex flex-col justify-end items-center">
                    <p className="text-xl font-bold">Name: {name}</p>
                    <p className="text-xl font-bold"><strong>Age:</strong>  {age ?? 'N/A'}</p>
                    <p className="text-xl font-bold"><strong>Gender:</strong> {gender}</p>
                </div>
            </div>
            <div className="lg:w-1/2 p-4">
                <h2 className=" text-[#7850CD] font-bold mt-4 mb-2">Bio</h2>
                <p>{bio}</p>
                <div className="flex flex-col justify-center py-2">
                    <div className="">
                        <h3 className="text-[#7850CD]">Pain Points</h3>
                        <div className="list-disc">{painPoints.map((point, index) => <li key={index}>{point}</li>)}</div>
                    </div>
                    <div className="">
                        <h3 className="text-[#7850CD]">Goals</h3>
                        <div className="list-disc">{goals.map((goal, index) => <li key={index}>{goal}</li>)}</div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}





export default UserPersonaCard;
