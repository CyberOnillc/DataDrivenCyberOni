import ms from "ms";
import slugify from "slugify";
import seedRandom from 'seedrandom'
import { Discount, ServiceCartItem } from "@prisma/client";
import { DisplayServiceCartItemDTO } from "@/crud/DTOs";
export interface HttpError extends Error {
  status: number;
  message: string;
}

export function HttpError(status: number, message: string) {
  const error = Error(message) as HttpError;
  error.status = status;
  return error
}
export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? "" : " ago"
    }`;
};

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export function getRandomFromArray(arr: Array<any>): any {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


export function createBackgroundTemplate(formData: FormData) {
  const backgroundData: { [key: string]: string } = {
    "Cutting-edge Machine Learning Models": formData.get('mlModels') as string,
    "Innovative Data Analysis": formData.get('dataAnalysis') as string,
    "Real-time Data Processi": formData.get('relatimeData') as string,
    "Web development": formData.get('webDev') as string,
    "App developement": formData.get('appDev') as string,
  }
  let backgroundString = ``

  for (let key of Object.keys(backgroundData)) {
    if (backgroundData[key]) {
      backgroundString = backgroundString.concat(`<p>${backgroundData[key]}</p>`)
    }
  }

  // console.log(backgroundData, backgroundString);
  if (backgroundString === '') {
    backgroundString = backgroundString.concat(`<p>None</p>`)
  }
  return { requirementString: backgroundString, requirement: backgroundData }
}


export function wrappedSlice(arr: Array<any>, startIndex: number, endIndex: number) {
  if (arr.length === 0) {
    return [];
  }

  // Handle negative indices
  if (startIndex < 0) {
    startIndex = arr.length + startIndex;
  }
  if (endIndex < 0) {
    endIndex = arr.length + endIndex;
  }

  // Wrap indices to stay within the array bounds
  startIndex = startIndex % arr.length;
  endIndex = endIndex % arr.length;

  // Handle wrapping where endIndex is smaller than startIndex
  if (endIndex < startIndex) {
    return arr.slice(startIndex).concat(arr.slice(0, endIndex + 1));
  } else {
    return arr.slice(startIndex, endIndex + 1);
  }
}


export function bufferToB64(buffer: any, mimetype: string) {
  const b64 = Buffer.from(buffer).toString("base64");
  let dataURI = "data:" + mimetype + ";base64," + b64;
  return dataURI
}


export function extractUUID(dataURI: string) {
  const sections = dataURI.split('-');
  const lastFiveSections = sections.slice(-5);
  // fetch data
  const uuid = lastFiveSections.join('-')
  return uuid
}


export function seoUrl(title: string, id: string) {
  return encodeURIComponent(slugify(`${title} ${id}`, {
    replacement: '-'
  }))


}

export function stripFileExtension(fileName: string): string {
  // Find the last occurrence of the dot (.) character
  const lastDotIndex = fileName.lastIndexOf('.');

  // Check if a dot was found and it is not the first character
  if (lastDotIndex !== -1 && lastDotIndex > 0) {
    // Extract the substring without the file extension
    return fileName.slice(0, lastDotIndex);
  }

  // If there is no dot or it's the first character, return the original file name
  return fileName;
}

export function generateRandomArray(originalArray: string[] | number[], n: number, seed: string) {
  const randomArray = [];
  const originalArrayLength = originalArray.length;

  const rng = seedRandom(seed);

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(rng() * originalArrayLength);
    randomArray.push(originalArray[randomIndex]);
  }

  return randomArray;
}

export function getRandomIntWithSeed(seed: string, min: number, max: number): number {
  const rng = seedRandom(seed);
  return Math.floor(rng() * (max - min) + min);
}

export function cleanHtmlString(inputString: string) {
  // Remove HTML tags (including partial tags)
  const withoutTags = inputString.replace(/<[^>]*>?/g, '');

  // Remove HTML keywords (you can customize this list)
  const withoutKeywords = withoutTags.replace(/\b(?:html|head|body|div|span|p|h[1-6])\b/gi, '');

  return withoutKeywords;
}


export function objectToSearchParams(obj: any): string {
  const searchParams = new URLSearchParams();

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        // If it's an array, add each element separately
        obj[key].forEach((element: string | number) => searchParams.append(key, element.toString()));
      } else {
        searchParams.set(key, obj[key].toString());
      }
    }
  }

  return searchParams.toString();
}

export function calculateServiceCartTotal(cartItems: DisplayServiceCartItemDTO[], discounts?: Discount[]) {
  let total: number = cartItems.reduce((total, item) => {
    return total + parseFloat(((item.service?.hourlyRate ?? 0) * item.addons.reduce((total, addon) => { return total + addon.estimated_hours_times_one_hundred_percent * (addon.pricingModel === 'DEFAULT' ? 1 : 1.5) }, 0)).toFixed(2))
  }, 0);

  if (discounts) {

    total = calculateDiscountedPrice(total, discounts)
  }
  return total
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export function calculateDiscountedPrice(total: number, discounts: Discount[]): number {
  let discountedPrice = total;

  for (const discount of discounts) {
    // Calculate the discount amount based on the percentage value
    const discountAmount = (total * discount.value) / 100;
    // Subtract the discount amount from the discounted price
    discountedPrice -= discountAmount;
  }

  // Ensure the discounted price is not negative
  return parseFloat(Math.max(discountedPrice, 0).toFixed(2));
}

// Fetch the HTML document
export const fetchHtml = async (url: string) => {
  const response = await fetch(url);
  return await response.text();
};
