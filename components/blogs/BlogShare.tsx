'use client'
import React, { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
function BlogShare({href}: {href:string}) {
    const [isClient, setIsClient] = useState(false);
    const urls = {
        facebook: 'https://www.facebook.com/sharer.php?u=',
        twitter: 'https://twitter.com/intent/tweet?url=',
        linkedin: 'https://www.linkedin.com/shareArticle?mini=true&url=',
        instagram: 'https://www.facebook.com/sharer.php?u=',
    }

    // useEffect(()=> {

    //    // if ( typeof window !== "undefined" ) setIsClient(true)
    // }, [])
    return (
        <>
            {
                <>
                    <Link href={`${urls.facebook}${href}`}>
                        <Facebook />
                    </Link>
                    <Link href={`${urls.twitter}${href}`}>
                        <Twitter />
                    </Link>
                    <Link href={`${urls.linkedin}${href}`}>
                        <Linkedin />
                    </Link>
                </>
               
            }

        </>);
}

export default BlogShare;