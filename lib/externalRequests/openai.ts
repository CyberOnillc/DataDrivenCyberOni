import { fetchHtml } from "../utils";
import { HTMLElement, parse } from 'node-html-parser';

export async function fetchOpenAIPrices() {

    const url = 'https://openai.com/pricing';
    const html = await fetchHtml(url)
    const root = parse(html);
    // table.inference-table:nth-child(1) > tbody:nth-child(2) > tr   // css query for table
    let prices: any[] = []
    root.querySelectorAll('table').forEach((table: HTMLElement, index: number) => {


        if (index === 1) {
            const row = table.querySelectorAll('tr')[0].querySelectorAll('td')
            const rows = {
                tool: 'Vision-gpt-4',
                price: { input: `${row[1].innerText.trim()} /${row[0].innerText.trim()}`, type: 'per-token' }
            };
            prices = [...prices, rows]

        }
        if (index === 4) {
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                return {
                    type: "Tools",
                    tool: cells[0].innerText.trim(),
                    price: { input: cells[1].innerText.trim(), type: 'per-token' }
                };
            });
            prices = [...prices, ...rows]

        }
        if (index === 5) {
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                return {
                    type: "FineTune",
                    model: cells[0].innerText,
                    price: { training: cells[1].innerText.trim(), input: cells[2].innerText.trim(), output: cells[3].innerText.trim(), type: 'per-token' }
                };
            });
            prices = [...prices, ...rows]

        }

        if (index === 6) {
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                return {
                    type: "EmbeddingModels",
                    model: cells[0].innerText,
                    price: { usage: cells[1].innerText.trim(), type: 'per-token' }
                };
            });
            prices = [...prices, ...rows]

        }
        if (index === 7) {
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                return {
                    type: "baseModels",
                    model: cells[0].innerText,
                    price: { usage: cells[1].innerText.trim(), type: 'per-token' }
                };
            });
            prices = [...prices, ...rows]

        }
        if (index === 8) {
            let currentModel ="";
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                currentModel = cells[0].innerText? cells[0].innerText : currentModel
                return {
                    type: "ImageModel",
                    model: cells[0].innerText? cells[0].innerText : currentModel,
                    price: { quality: cells[1].innerText.trim(), resolution: cells[2].innerText.trim(), usage: cells[3].innerText.trim(), type: 'per-image' }
                };
            });
            prices = [...prices, ...rows]

        }

        if (index === 9) {
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                return {
                    type: "AudioModel",
                    model: cells[0].innerText,
                    price: { usage: cells[0].innerText.trim(), type: 'per-use' }
                };
            });
            prices = [...prices, ...rows]

        }
        if (index === 0 || index === 2 || index === 3 || index === 10) {
            const rows = table.querySelectorAll('tr').slice(1).map((tr: HTMLElement) => {
                const cells = tr.querySelectorAll('td');
                return {
                    model: cells[0].innerText.trim(),
                    price: { input: cells[1].innerText.trim(), output: cells[2].innerText.trim(), type: 'per-token' }
                };
            });

            prices = [...prices, ...rows]


        }

    });
    return prices
}