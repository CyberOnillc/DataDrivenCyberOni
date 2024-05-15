/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { Owner } from "../data/ownerData";
export const runtime = "edge";
export const alt = Owner.company;
export const contentType = "image/png";

export default async function OG() {
  // console.log("Og Url", import.meta.url);
  const sfPro = await fetch(
    new URL("./fonts/SF-Pro-Display-Medium.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #CFFAFE 75%)",
        }}
      >
        <img
          src={`${process.env.HOST}/images/monster_5.jpg`}
          alt="CyberOni Logo"
          className="mb-4 h-20 w-20 opacity-95"
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "SF Pro",
          data: sfPro,
        },
      ],
    },
  );
}
