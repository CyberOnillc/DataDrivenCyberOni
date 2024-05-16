export const GOOGLE_TAG_MANAGER = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER;

export const googleEvent = (name: string, options = {}) => {
    if (window.gtag) window.gtag("event", name, options);
};