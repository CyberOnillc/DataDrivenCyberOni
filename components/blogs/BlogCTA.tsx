"use client";

import Link from "next/link";

interface BlogCTAProps {
  title?: string;
  subTitle?: string;
  button?: string;
  link?: string;
}
function BlogCTA({ title, subTitle, link, button }: BlogCTAProps) {
  return (
    <div className="mx-2 flex items-center justify-between gap-2 rounded-lg bg-violet-500 p-5 py-8 text-white lg:mx-10">
      <div className="flex-grow text-ellipsis">
        <h1 className="line-clamp-1 p-1">
          {title ? title : "Join Us grow Your Business"}
        </h1>
        <p className="line-clamp-2 p-2">
          {subTitle
            ? subTitle
            : "Let's Explore Opportunities, Tailor Strategies, and Chart a Course to Success Together"}
        </p>
      </div>

      <div className="flex h-fit w-1/4 max-w-[25%] items-center justify-end text-ellipsis px-5">
        <Link
          href={link ? link : "/contact"}
          target="_blank"
          rel="noopener noreferrer"
          className="line-clamp-1 min-w-16 max-w-md text-ellipsis h-full rounded-full bg-white px-3 leading-10 text-center text-sm font-semibold text-black hover:bg-gray-300"
        >
          {button ? button : "Get Started"}
        </Link>

      </div>
    </div>
  );
}

export default BlogCTA;
