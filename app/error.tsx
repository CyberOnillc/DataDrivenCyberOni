'use client'
import Error from "@/components/shared/ErrorPage";

function ErrorPage() {
    return (
        <div className="h-full max-h-full">
            <Error errorMessage="Oops! An Error occured on our servers try again later"
                redirect="/"
                errorButtonMessage="back to home" />
        </div>);
}

export default ErrorPage;