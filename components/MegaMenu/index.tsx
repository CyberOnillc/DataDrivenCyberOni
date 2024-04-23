'use client'
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type MegaMenuProps = Array<{
    type: "Links"
    title: string,
    links: {
        name: string,
        href: string,
        subTitle: string,
        icon: ReactNode
    }[]
} | {
    type: "Node",
    node: ReactNode
}>



function MegaMenu({ groups, setMenuOpen: closeMenu }: { groups: MegaMenuProps, setMenuOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="shadow-lg dark:shadow-2xl rounded-lg bg-gray-50 dark:bg-slate-900 z-50 lg:px-5 lg:py-5 max-h-[65vh] xl:max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400  scrollbar-track-gray-50 scrollbar-thumb-rounded-md dark:scrollbar-track-slate-600 " >
            <div className="p-5 my-1">  
                {groups.map((group, index) => {

                    if (group.type === 'Links') return (
                        <div key={index} className="p-2 mb-4">
                            <div className="text-gray-500 text-sm">{group.title}</div>
                            <div className="w-fit flex flex-wrap  my-2 mx-auto">
                                {group.links.map((link, index) => (
                                    <div key={index} className="px-2 flex gap-2 w-1/2 my-2 items-center">
                                        {link.icon}
                                        <Link onClick={() => closeMenu(false)} href={link.href} className="text-xl font-bold w-fit p-1">
                                            {link.name}
                                            <div className="text-sm font-normal text-gray-600 dark:text-gray-200">{link.subTitle}</div>
                                        </Link>
                                    </div>))}
                            </div>
                        </div>
                    )
                    else return (<div key={index} className="mx-auto">{group.node}</div>)
                })}
            </div>
        </div>

    );
}

export default MegaMenu;