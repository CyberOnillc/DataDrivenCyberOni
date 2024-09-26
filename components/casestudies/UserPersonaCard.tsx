import { Image as userImage } from "@prisma/client";
import Image from "next/image";

export type UserPersonaProps = {
    name: string;
    age: number;
    gender: string;
    bio: string;
    goals: string[];
    painPoints: string[];
    image?: userImage;
}

function UserPersonaCard({ name, age, bio, gender, goals, image, painPoints }: UserPersonaProps) {
    return (
        <div className="flex flex-col lg:flex-row rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-800 dark:shadow-gray-700 transition-all">
            <div className="relative lg:w-1/2">
                <Image
                    className="w-full h-full rounded-lg object-cover"
                    src={image ? image.src : '/placeholder.svg'}
                    alt={name}
                    height={500}
                    width={500}
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
                    <p className="text-lg font-bold">Name: {name}</p>
                    <p className="text-lg font-bold"><strong>Age:</strong> {age ?? 'N/A'}</p>
                    <p className="text-lg font-bold"><strong>Gender:</strong> {gender}</p>
                </div>
            </div>
            <div className="lg:w-1/2 p-4">
                <h2 className="text-[#7850CD] dark:text-[#A58BFF] font-bold text-xl mt-4 lg:mt-0 mb-4">Bio</h2>
                <p className="mb-6 dark:text-gray-300">{bio}</p>
                <div className="flex flex-col space-y-6">
                    <div>
                        <h3 className="text-[#7850CD] dark:text-[#A58BFF] font-bold mb-2">Pain Points</h3>
                        <ul className="list-disc pl-5 space-y-2 dark:text-gray-300">
                            {painPoints.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#7850CD] dark:text-[#A58BFF] font-bold mb-2">Goals</h3>
                        <ul className="list-disc pl-5 space-y-2 dark:text-gray-300">
                            {goals.map((goal, index) => (
                                <li key={index}>{goal}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPersonaCard;
