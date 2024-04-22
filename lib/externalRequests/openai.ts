import { fetchHtml } from "../utils";
import { HTMLElement, parse } from 'node-html-parser';

export async function fetchOpenAIPrices() {

    const url = 'https://openai.com/pricing';
    const html = await fetchHtml(url)
    const root = parse(html);
    // table.inference-table:nth-child(1) > tbody:nth-child(2) > tr   // css query for table
    let prices: any[] = []
    root.querySelectorAll('table').forEach((table: HTMLElement, index) => {
        //gpt4 turbo prices
        if(index===0 || index===2 || index===3 || index===10    )  {
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                return {
                    model: cells[0].innerText.trim(),
                    price: { input: cells[1].innerText.trim(), output:  cells[2].innerText.trim(), type: 'per-token' }
                };
            });

            prices = [...prices, ...rows]


        }
        
    });
    return prices
}