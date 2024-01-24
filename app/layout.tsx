import ContactButton from "@/components/ConactButton";
import Notification from "@/components/Notification";
import Footer from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import { Owner } from "@/data/ownerData";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Head from "next/head";
import { cookies } from "next/headers";
import Script from "next/script";
import { Suspense } from "react";
import { abel, inter, nunito, sfPro } from "./fonts";
import "./globals.css";
import { authOptions } from "@/lib/nextAuthAdapter";
import { WebVitals } from "@/components/WebVitals";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: Owner.seo.metaTitle,
  description: Owner.seo.metaDescription,
  keywords: Owner.seo.keywords,
  metadataBase: new URL(process.env.NEXTAUTH_URL as string),
  twitter: {
    card: "summary_large_image",
    title: Owner.seo.metaTitle,
    description: Owner.seo.metaDescription,
    creator: "@softwear4u", // Make sure to include the correct Twitter handle here
    images: ["/images/monster_5.jpg"],
  },
  openGraph: {
    title: Owner.seo.metaTitle,
    description: Owner.seo.metaDescription,
    url: Owner.url,
    siteName: "CyberShopTech | CyberOni",
    locale: "en_US",
    type: "website",
  },
  themeColor: "#0074e4",
  other: {
    "fb:app_id": process.env.FACEBOOK_ID as string,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5
  },

};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  return (
    <html lang="en">

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`}
        async
      />
      <Script strategy="afterInteractive" id="google-tag-manager">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}', {
      page_path: window.location.pathname,
    });
  `}
      </Script>
      <Script strategy="afterInteractive" id="facebook-pixel">
        {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL}');
      fbq('track', 'PageView');
    `}
      </Script>

      <body
        className={`${cx(
          sfPro.variable,
          inter.variable,
          abel.variable,
          nunito.variable,
        )} 
                        ${theme?.value} overflow-x-hidden antialiased`}
      >
        <div className="fixed h-full w-screen dark:bg-gray-900 dark:text-white " />
        <Suspense fallback="...">
          <NavBar
            session={session}
            darkMode={theme?.value === "dark" ? true : false}
          />
        </Suspense>
        <main className="relative min-h-screen w-full  overflow-x-hidden pt-16 xl:pt-24 dark:bg-gray-900 dark:text-white">
          {children}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=G-55E14FBFE1"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        </main>
        {
          <Suspense>
            <Notification />
          </Suspense>
        }
        <ContactButton />
        <Footer />
        <Analytics  />
        <SpeedInsights />
        {/* <WebVitals /> */}
      </body>
    </html>
  );
}
