import LoadingAnimation from "./icons/loading-animation";

function Redirecting({ message }: { message: string }) {
    return (
        <div className="grid h-screen place-content-center text-gray-900 dark:text-gray-100  bg-white dark:bg-slate-950 px-4 font-nunito">
            <div className="text-center">
                {/* Lucide's XCircle icon */}
                <div className="mx-auto h-5 w-full  sm:h-64">
                    <LoadingAnimation />
                </div>

                <h3 className="w- mt-6 text-xl font-bold tracking-tight sm:text-2xl">
                    {message}
                </h3>


            </div>
        </div>
    );
}

export default Redirecting;