import { fetchHtml } from "../utils";
import { HTMLElement, parse } from 'node-html-parser';

export async function fetchHuggingfacePrices() {

    const url = 'https://huggingface.co/pricing#endpoints';
    const html = await fetchHtml(url)
    const root = parse(html);
    // table.inference-table:nth-child(1) > tbody:nth-child(2) > tr   // css query for table
    const prices = root.querySelectorAll('table.inference-table:nth-child(1) > tbody:nth-child(2) > tr').map((tr: HTMLElement) => {
        const cells = tr.querySelectorAll('td');
        return {
            provider: cells[0].innerText.trim(),
            architecture: cells[1].innerText.trim(),
            specs: { memory: cells[2].innerText.trim(), vCpu: cells[3].innerText.trim() },
            price: { cost: cells[4].innerText.trim(), type: 'hourly' }
        };
    });
    return prices
}
