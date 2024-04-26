'use client'

import { useEffect, useRef, useState } from "react";

import { getCookie, } from 'cookies-next';
import TextLoaders from "../loaders/TextLoaders";
import { generateRandomArray, getRandomFromArray } from "@/lib/utils";


function BlogContent({ content, theme, href }: { content: string, theme: 'dark' | 'light', href: string }) {

    const [loaded, setLoaded] = useState(false);

    const iframe = useRef<HTMLIFrameElement>(null)
    const resizeScript = `<script id="resizeScript" >
    document.documentElement.style.overflow= "hidden"
    const body= document.querySelector('body')
    const html = document.getElementsByTagName('html')[0];
    let size = html.scrollHeight;
    var observer = new  ResizeObserver(function(mutations) {
        console.log('size changed!' , size , html.scrollHeight);

        if(size!== html.scrollHeight) {
            window.parent.postMessage({ type:"resize", size: html.scrollHeight, src:'resize'});
        }
    });
    observer.observe(html);



    // window.addEventListener('resize',()=> {
    //     console.log("html resizeing: " , window);
    //     window.parent.postMessage({ type:"resize",size: window.document.getElementsByTagName('html')[0].scrollHeight,src:'resize'});
    // })
    window.parent.postMessage({ type:"resize", size: window.document.getElementsByTagName('html')[0].scrollHeight, src:'initial'});

    console.log("iframe-origin" ,window.orgin, "sent m,essage");

    const links = document.getElementsByTagName('a');
      for (let link of links) {
        link.target= "_top"
      }

      window.addEventListener('message', (event)=> {

        if(event.data.type === 'theme' && event.data.theme==='dark') {
            body.classList.add('dark');
        
        } 
        if(event.data.type === 'theme' && event.data.theme==='light') {
            body.classList.remove('dark');
        
        } 

      })
      

      ${theme == 'dark' ? ' body.classList.add(\'dark\');' : ''}

    </script>`
    const fontScript = ` 
    <script id="FontScript" >
        const fonts = document.createElement('link');
        fonts.rel="stylesheet"
        fonts.href="https://fonts.googleapis.com/css?family=Inter"
        document.head.appendChild(fonts);
        const styles = document.createElement('style');
        styles.textContent=\`
        body {
            font-family: "Inter", sans-serif;
        }
        a {
            color: #3b82f6;
        }
        a:visited { 
            color: #4a044e;
        }
        \`
        document.head.appendChild(styles);
    </script>
`


    const themeScript = `

    <script id="themeScript" >
    const themeStyles = document.createElement('style');
    themeStyles.textContent=\`

    body {
        font-family: "Inter", sans-serif;
        color: black;
        margin: 5px 35px;    
      }
      body.dark {
        font-family: "Inter", sans-serif;
        color: white;
      }
    \`
    document.head.appendChild(themeStyles);

    </script>
    `
    const container = `
    
    <!DOCTYPE html>
        <html>
        <head>
        <base href="${typeof window !== 'undefined' ? window.location.href : href}">      
        ${themeScript}
        ${fontScript}
        <script src="https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver"></script>
        </head>
        <body id="tinymce" class="mce-content-body ">
        ${content}
        </body>
        ${resizeScript}

        </html>

    `
    useEffect(() => {

        window.addEventListener("message", (event) => {
            //console.log("iframe-message-recieved", window.origin, event.origin);
            if (iframe.current && event.data.type === "resize" && event.origin === window.origin) {
                console.log("revievev resizer", event.data);
                iframe.current.style.height = (event.data.size).toString() + "px";
                if (event.data.src === 'initial') setLoaded(true)
            }
        });

    }, []);

    useEffect(() => {
        iframe.current?.contentWindow?.location.reload();
    }, []);

    useEffect(() => {
        window.addEventListener('theme', (event: CustomEventInit) => {
            if (event.detail.theme === 'dark') {
                // console.log("sending message to dark theme");
                iframe.current?.contentWindow?.postMessage({ theme: 'dark', type: 'theme' }, window.origin)
            }
            else {
                iframe.current?.contentWindow?.postMessage({ theme: 'light', type: 'theme' }, window.origin)

            }
        });
    }, []);
    return (<>
        {<iframe ref={iframe} className={`w-full h-max min-h-max z-50 scrollbar-none overflow-hidden  ${loaded ? 'opacity-100' : 'opacity-0'} lg:px-[2rem]`} sandbox="allow-scripts allow-same-origin allow-top-navigation allow-top-navigation-by-user-activation" srcDoc={container}></iframe>}
        {!loaded && <div className="w-full h-full z-50  flex flex-wrap ">
            {generateRandomArray(['w-64', 'w-80', 'w-96', 'w-72', 'w-52', 'w-full'], 30, content.slice(0, 30)).map((value, index) => {

                return (
                    <div key={index} className={`${value}`}>
                        <TextLoaders></TextLoaders>
                    </div>
                )
            })}
        </div>}
    </>);
}

export default BlogContent;