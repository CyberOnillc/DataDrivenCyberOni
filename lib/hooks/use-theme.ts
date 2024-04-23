import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState(getCookie('theme'));
    useEffect(() => {
        // Handler to call on window resize
        function themeChange(event: CustomEventInit) {
            setTheme(event.detail.theme)
            console.log("resize event: " + event.detail);
        }
        window.addEventListener("theme", themeChange);
    })
    return { theme }

}
