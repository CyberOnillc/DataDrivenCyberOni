declare global {
  interface Window {
    fbq?: Function; // Define fbq as a function
    gtag?: Function;
  }
}


export type TableType =
  | "blogs"
  | "services"
  | "softwares"
  | "casestudies"
  | "users"
  | "products"
  | "prompts"
  | "events"
  | "discounts"
  | "referrals";
export type OrderTableBy =
  | "updatedAt"
  | "title"
  | "name"
  | "email"
  | "prefix"
  | "click"
  | "expires"
  | "value"
  | "profitMargin"
  | "timesUsed"
  | "price"
  | "date"
  | "publishDate"
  | "inventory"
  | "status"
  | "pricing"
  ;
export type OrderTable = "desc" | "asc";


export type CategoryType = "product" | "prompt" | "blog" | "service" | "software"