import { setCookie } from "cookies-next";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle({ enabled, className }: { enabled: boolean, className?: string }) {
    const [isToggled, setIsToggled] = useState(enabled);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    useEffect(() => {
        if (typeof document !== 'undefined') {

            const root = document.getElementsByTagName('body')[0];
            if (isToggled) {

                setCookie('theme', 'dark');
                root.classList.add('dark');
                window.dispatchEvent(new CustomEvent("theme", { detail: { 'theme': 'dark' } }));
            }
            else {
                // cookies().set('theme', 'light');
                setCookie('theme', 'light')
                window.dispatchEvent(new CustomEvent("theme", { detail: { 'theme': 'light' } }));
                root.classList.remove('dark');
            }

        }


    }, [isToggled]);

    return (
        <div className={"container flex justify-center items-center  xl:mx-auto xl:w-12 " + className}>
            <label className="flex items-center cursor-pointer">
                <div className="relative">
                    <input
                        type="checkbox"
                        className="hidden"
                        checked={isToggled}
                        onChange={handleToggle}
                    />
                    <div className=" w-12 h-6 bg-gray-400 rounded-full shadow-inner"></div>
                    <div
                        className={`absolute w-6 h-6  flex justify-center items-center rounded-full shadow inset-y-0 left-0 transition-transform duration-100 ease-in  ${isToggled ? 'transform translate-x-full bg-blue-500 ' : 'bg-white   '}`}
                    >
                        {isToggled ? <Moon className='p-1' /> : <Sun className='p-1 text-yellow-400' />}

                    </div>
                </div>
            </label>
        </div>
    );
}

export default ThemeToggle
