import LoadingAnimation from "./icons/loading-animation";

function FormLoading() {
    return (

        <div className="absolute z-[9999] top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-md bg-gray-100/20 dark:bg-slate-600/20">

            <LoadingAnimation />
        </div>);
}

export default FormLoading;