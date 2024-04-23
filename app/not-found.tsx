import Error from "@/components/shared/ErrorPage";

export default function notFound() {
    return (
        <div className="h-full max-h-full">
            <Error errorMessage="Oops! The page you're looking for doesn't seem to exist."
                redirect="/"
                errorButtonMessage="back to home" />
        </div>
    );
}
