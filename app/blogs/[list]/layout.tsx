import { Suspense } from "react";

export async function generateStaticParams() {
    return [
        {list: 'new'},
        {list: 'popular'},
        {list: 'essential'}

    ]
  }

  
function BlogListLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="pb-20">
                <Suspense>{children}</Suspense>
            </div>
        </>
    );
}

export default BlogListLayout;