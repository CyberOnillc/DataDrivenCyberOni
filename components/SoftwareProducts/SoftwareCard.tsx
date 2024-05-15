/**
 * v0 by Vercel.
 * @see https://v0.dev/t/0MNo62hAEeM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function SoftwareCard({
  image,
  title,
  subTitle,
  pageLink,
  codeLink
}: {
  image: string;
  title: string;
  subTitle: string;
  pageLink?: string | null;
  codeLink?: string | null;
}) {

  return (
    <Card className="flex aspect-[3/4] h-auto w-[12em] md:w-[14em] max-w-sm flex-col items-center justify-center overflow-hidden rounded-xl bg-white shadow-lg  hover:border-blue-600 hover:dark:border-emerald-500">
      <div className="relative flex h-4/6 w-full flex-grow justify-center">
        <Image
          alt="Product Image"
          className="h-full w-full object-cover"
          height={300}
          src={image}
          width={300}
        />
      </div>
      <div className=" relative w-full px-2 pl-5 py-4">
        <div className="absolute left-0 -top-3 flex w-full justify-end gap-2">
          {pageLink && <Link href={pageLink} className=" rounded-2xl px-2 py-1 hover:scale-105 bg-emerald-300 dark:bg-emerald-500 text-xs text-black">Try it Out</Link>}
          {codeLink && <Link href={codeLink} className=" rounded-2xl px-2 py-1 hover:scale-105 bg-amber-300 dark:bg-amber-500 text-xs text-black">View Code</Link>}

        </div>
        <p className="m-0 text-sm line-clamp-2 w-full text-wrap  font-bold text-gray-900 dark:text-gray-50">
          {title}
        </p>
        <p className="m-0 line-clamp-2 text-xs text-gray-700 dark:text-gray-300">
          {subTitle}
        </p>
      </div>
    </Card>
  );
}
