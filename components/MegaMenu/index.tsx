"use client";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type MegaMenuProps = Array<
  | {
      type: "Links";
      title: string;
      links: {
        name: string;
        href: string;
        subTitle: string;
        icon: ReactNode;
      }[];
    }
  | {
      type: "Node";
      node: ReactNode;
    }
>;

function MegaMenu({
  groups,
  setMenuOpen: closeMenu,
}: {
  groups: MegaMenuProps;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="z-50 max-h-[65vh] overflow-y-auto rounded-lg bg-gray-50 shadow-lg scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-md dark:bg-slate-900 dark:shadow-2xl dark:scrollbar-track-slate-600  lg:px-5 lg:py-5 xl:max-h-[85vh] ">
      <div className="my-1 p-5">
        {groups.map((group, index) => {
          if (group.type === "Links")
            return (
              <div key={index} className="mb-4 p-2">
                <div className="text-sm text-gray-500">{group.title}</div>
                <div className="mx-auto my-2 flex  w-fit flex-wrap">
                  {group.links.map((link, index) => (
                    <div
                      key={index}
                      className="my-2 flex w-1/2 items-center gap-2 px-2"
                    >
                      {link.icon}
                      <Link
                        onClick={() => closeMenu(false)}
                        href={link.href}
                        className="w-fit p-1 text-xl font-bold"
                      >
                        {link.name}
                        <div className="text-sm font-normal text-gray-600 dark:text-gray-200">
                          {link.subTitle}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          else
            return (
              <div key={index} className="mx-auto">
                {group.node}
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default MegaMenu;
