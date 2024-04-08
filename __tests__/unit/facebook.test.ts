/**
 * @jest-environment node
 */

import { getPagesList, postToFacebook } from "@/lib/externalRequests/facebook";
import { generateRandomString } from "@/lib/utils";
import { describe, expect, test, it, beforeAll } from "@jest/globals";
import { createCanvas } from 'canvas'
export function createTestImage() {
    const width: number = 500;
    const height: number = 500;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Draw on the canvas with random colors
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            ctx.fillStyle = `rgb(${red},${green},${blue})`;
            ctx.fillRect(x, y, 1, 1);
        }
    }

    // Convert the canvas to base64
    const binaryImage = canvas.toBuffer("image/jpeg");
    return binaryImage;
}
describe("test Facebook functions", () => {
    const accessToken = "EAAlZCjrHXQlABOxAUwosCO1OEtquJVcJZCWoygSUIEfUhDF1EiSdSFCWf3WHZAqat4PKoN0tgahdbMiN2N9rOXBrpJvlxx3TH8oRigK6B0u0Mz87wqt9ldZAxx5T5R2HTo9fzh6VhprjCmfF0NCyVVlWvHMTZAl7WKDXblt5uPfq55tpmTtqDgNShZBoKFVJlZBtSk47w3ONCDaeblLUrdUKbNgIoLDknZBrxIh2ZC1Sb5SMmpLgZCtt4mAjjVhT5p"
    const blogUrl = "https://www.cybershoptech.com"
    let pageId = ""
    let pageAccessToken = ""
    test("test retrieving pages with access", async () => {

        const res = await getPagesList(accessToken)
        pageId = res[0].id as string
        pageAccessToken = res[0].access_token as string
        expect(res.length).toBeGreaterThan(0);
    })
    test("test posting use rest api provided valid access token", async () => {

        const res = await postToFacebook({
            accessToken: pageAccessToken, pageId: pageId, post: {
                message: "tset_post",
                published: true,
                link: 'https://www.cybershoptech.com'
            }
        })

        expect(res.id).toBeDefined();
    }, 10000)


})