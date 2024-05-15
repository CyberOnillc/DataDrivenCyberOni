'use client'
import { ChevronDown } from "lucide-react";
import MegaMenu, { MegaMenuProps } from "../MegaMenu";
import { getRandomIntWithSeed } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
type NavbarItemProps = {
    menuOpen: boolean;
    menuOptions?: MegaMenuProps;
    itemName: string;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

function NavbarItem({
    menuOpen,
    menuOptions,
    itemName,
    setMenuOpen: closeMenu,
}: NavbarItemProps) {

    const [open, setOpen] = useState(false);
    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    return (
        <div className="relative items-center justify-center xl:relative xl:flex xl:h-full"
            onMouseLeave={handleMouseLeave}
        >
            <Popover open={open} onOpenChange={setOpen}  >
                <PopoverTrigger onMouseEnter={handleMouseEnter}   >
                    <input
                        id={`${itemName}`}
                        type="checkbox"
                        className={`peer absolute hidden h-full cursor-pointer md:focus:outline-none`}
                        disabled={menuOpen}
                    />
                    <div className=" text-sm hover:cursor-pointer hover:text-blue-500">
                        {itemName}
                        <ChevronDown className="inline-block text-blue-400"></ChevronDown>
                    </div>
                </PopoverTrigger>
                <PopoverContent className=" xl:w-fit p-0 xl:mx-2 z-[999] w-screen">
                    {menuOptions && (
                        <div
                            className={`relative xl:w-[35em] block w-full`}
                        >
                            <MegaMenu closeMenu={()=> (closeMenu(false), setOpen(false))} groups={menuOptions} />
                        </div>
                    )}
                </PopoverContent>
            </Popover>

        </div>
    );
}

// <div className="xl:relative xl:flex justify-center items-center xl:h-full">
//             <label htmlFor={`${itemName}`} className=" h-full flex flex-col justify-center items-center cursor-pointer">
//                 <input
//                     id={`${itemName}`}
//                     type="checkbox"
//                     className={`peer md:focus:outline-none hidden absolute h-full cursor-pointer`}
//                     disabled={menuOpen}
//                 />
//                 <div className=" hover:text-blue-500 hover:cursor-pointer text-sm">
//                     {itemName}
//                     <ChevronDown className="text-blue-400 inline-block"></ChevronDown>
//                 </div>
//                 {menuOptions &&
//                     <div className={`xl:absolute transition-all duration-300 xl:top-20 xl:w-[600px] hidden peer-default:hidden peer-checked:block xl:peer-checked:hidden  xl:peer-focus:block xl:peer-hover:block hover:block`}>
//                         <MegaMenu setMenuOpen={closeMenu} groups={menuOptions} />
//                     </div>

//                 }
//             </label>
//         </div>
export default NavbarItem;
