/**
 * @jest-environment node
 */

import { createFacebookAd, getPagesList, postToFacebook } from "@/lib/externalRequests/facebook";
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
    const accessToken = "EAAlZCjrHXQlABO9qLsZBdpHy5uoYS2Pi02tpKdge21PF8Wgte0T60iNdQWzZA26Xpy39W3aeVURKzfk8tudZC5Gm2CWptoGmmwWh9N3NySZBZAPPLyHNcG7ZBC68TeCFRwr9vSGsAPc5UKdQSWFE42DzouDk1bjqfMyASIHXnrw7Gr1okGRwlYzC2QppsZBYyXtB5qII8B2rC2ITkoOzH6bkL7ZAatu3rhJ26FIjytWxw9IzrskTsD75Bhx3CB1QT"
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

    test("test create adset and ad creative", async () => {
        const today: Date = new Date();// Get the date one week from today
        const oneWeekLater: Date = new Date();
        oneWeekLater.setDate(today.getDate() + 7);
        const res = await createFacebookAd(accessToken, "act_797505938829409", "120209335476350615", {
            bid_amount: "1000",
            name: "test add0",
            daily_budget: "3777",
            billing_event: 'IMPRESSIONS',
            startTime: today,
            endTime: oneWeekLater,
            status: "PAUSED",
            targeting: {
                geo_locations: {
                    countries: ["US"]

                }
            }
        }, {
            body: "tets ad body",
            image_url: "https://picsum.photos/200",
            link_url: "https://cybershoptech.com",
            name: "test ad title",
            title: "test ad title",
            object_story_spec: {
                page_id: "293524287172624",

            }
        },
            "293524287172624"

        )

        expect(res).toBe(true);

    }, 10000)




})