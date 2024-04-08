/**
 * @jest-environment node
 */

import { postToLinkedIn } from "@/lib/externalRequests/linkdeIn";
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
describe("test linkedin functions", () => {
    const accessToken = "AQV6lmnIN8znNaAeP6Pks3lD7hU8ntAZ7cO_aFj3h33QOyPS6sGm32G4768q-IuXc69PbfiaLhemkQKiPCaKWorsSKGHtNLnmcnWo4OtxU7t9a71p8wtRdxUgtiYgN7XN3IOoBN6KdaJkL6HHyi2BUxmAA3wDpCb0fUZZOiy5JCrqoxVF2ikR91h-yBNkZEGOKbdfLB1IDQxGGJW5J8tuFtvJNtQ2VNAkUzSWaytm-Ne3Wubhy_utRNxfX0Y5afgs7HyTzRWcf3-jJULeKBEuB3wHsMR-Ih8DWmu7TPCIdLWBbnxossjKc4jD6wOn6BpN4LHXcW4IwlNpo48OOGO9uMrwlUC5w"
    const blogUrl = "https://www.cybershoptech.com"


    test("test posting use rest api provided valid access token", async () => {

        const res = await postToLinkedIn({ accessToken, author: "C-vB17a282", content: { type: "text", content: `test-content-${generateRandomString(10)}` } })

        expect(res).toBe(true);
    })

    test("test posting use rest api provided valid access token Article type", async () => {

        const res = await postToLinkedIn({ accessToken, author: "C-vB17a282", content: { type: "article", description: "Blog share", title: "Saheing cyberoni -blog", url: `${blogUrl}/${generateRandomString(10)}` } })

        expect(res).toBe(true);
    })

    test("test posting use rest api provided valid access token Media upload", async () => {
        const image = createTestImage()
        const res = await postToLinkedIn({ accessToken, author: "C-vB17a282", content: { type: "media", media: [{ content: image, description: "Blog share", title: "Saheing cyberoni -blog" }] } })

        expect(res).toBe(true);
    }, 10000)
})