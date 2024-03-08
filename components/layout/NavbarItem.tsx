import { ChevronDown } from "lucide-react";
import MegaMenu, { MegaMenuProps } from "../MegaMenu";
import { getRandomIntWithSeed } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
type NavbarItemProps = {

    menuOpen: boolean;
    menuOptions?: MegaMenuProps
    itemName: string;
    setMenuOpen: Dispatch<SetStateAction<boolean>>
}

function NavbarItem({ menuOpen, menuOptions, itemName, setMenuOpen: closeMenu }: NavbarItemProps) {
    const peer = itemName
    return (
        <div className="xl:flex justify-center items-center xl:h-full">
            <label htmlFor={`${itemName}`} className=" h-full flex flex-col justify-center items-center cursor-pointer">
                <input
                    id={`${itemName}`}
                    type="checkbox"
                    className={`peer md:focus:outline-none hidden absolute h-full cursor-pointer`}
                    disabled={menuOpen}
                />
                <div className=" hover:text-blue-500 hover:cursor-pointer">
                    {itemName}
                    <ChevronDown className="text-blue-400 inline-block"></ChevronDown>
                </div>
                {menuOptions &&
                    <div className={`xl:absolute transition-all duration-300 xl:top-20 xl:w-[600px] hidden peer-default:hidden peer-checked:block xl:peer-checked:hidden  xl:peer-focus:block xl:peer-hover:block hover:block`}>
                        <MegaMenu setMenuOpen={closeMenu} groups={menuOptions} />
                    </div>

                }
            </label>
        </div>);
}

export default NavbarItem;