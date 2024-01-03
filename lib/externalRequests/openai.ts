
import {JSDOM} from 'jsdom'
export async function searchGpt(query: string) {
    const search = new URLSearchParams();
    search.set('q', `site:chat.openai.com ${query}`)
    const res = await fetch(`https://www.google.com/search?${search.toString()}`);
    const content = await res.text()
    const dom = new JSDOM(`${content}`)
    const resultElements =  dom.window.document.querySelectorAll('.Gx5Zad.fP1Qef.xpd.EtOod.pkphOe')
    const results = Array.from(resultElements).map((result) => {
        let title =""
        let url= ""
        let description =""
        title = result.querySelector('.BNeawe.vvjwJb.AP7Wnd')?.textContent ?? '';
        url = (result.querySelector('a') as HTMLAnchorElement)?.href.slice(7)??'';
        description = result.querySelector('.BNeawe.s3v9rd.AP7Wnd')?.textContent?? ''
        return {
            title, description, url
        }
        
    })
    // console.log(results);
    return results

    
}