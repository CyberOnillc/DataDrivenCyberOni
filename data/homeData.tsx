import { SectionProps } from "@/components/home/HomeSection";
import { Company } from "@/components/home/CompanyCarousel";
import { SlideProps } from "@/components/home/Slide";

export const mainHero: SectionProps = {
  title: "Understand Your Business Data",
  subTitle: "Focus On Bringing Customers Value",
  content: (
    <div>
      Our cutting-edge tools are designed to automate your daily tasks, freeing
      you up to focus on what really matters. From boosting your online
      visibility and automating customer interactions to integrating seamlessly
      across platforms, we&apos;re here to help you leverage your data and
      transform your business operations.
    </div>
  ),
  image: "",
  linkTo: "",
};

export const homeSections: SectionProps[] = [
  {
    title: "Automated Organic Content and Seo Creation",
    subTitle:
      "Struggling to keep up with constant content creation and updates? Let our automated tools handle it and watch your traffic grow!",
    content: (
      <div>
        Easily attract more visitors and boost your sales with our{" "}
        <span className="font-bold text-blue-500">smart SEO</span> and
        <span className="font-bold text-blue-500">
          automated marketing tools
        </span>
        . Just set it up and watch your business grow! Our tools enable you to
        quickly create and{" "}
        <span className="font-bold text-blue-500">
          manage organic social media {" "}
        </span>
        content tailored for your target audience
      </div>
    ),
    image: "/images/HomeSections/Organic-Content-1.png",
    imageFirst: false,
    linkTo: "/blogs",
  },
  {
    title: "User friendly Data Science Tools",
    subTitle: "Streamline Your Operations with Smarter Solutions!",
    content: (
      <div>
        Facing tough choices with{" "}
        <span className="font-bold text-blue-500">too much or not enough</span>{" "}
        data? Our solutions work behind the scenes to streamline your workflows,
        gather your target users preferences ensuring you’re focusing on what
        counts. Our tools react to changes, optimize processes, and
        automatically adjust to new data, helping you stay{" "}
        <span className="font-bold text-blue-500">proactive and efficient.</span>
      </div>
    ),
    image: "/images/HomeSections/Data-1.png",
    imageFirst: true,
    linkTo: "/blogs",
  },
  {
    title: "Streamline Customer Contact & Lead Acquisition",
    subTitle:
      "Tired of manually keeping up with customer queries and communications or Running out of leads?",
    content: (
      <div>
        Leverage our{" "}
        <span className="font-bold text-blue-500">
          proprietary lead scraping tools
        </span>{" "}
        and customer retention software to maintain a constant connection with
        your customers. Our system tracks interactions to{" "}
        <span className="font-bold text-blue-500">
          optimize communication strategies
        </span>
        , enhancing customer satisfaction and loyalty without the overhead of
        constant manual oversight.
      </div>
    ),
    image: "/images/HomeSections/Streamline-1.png",
    imageFirst: true,
    linkTo: "/blogs",
  },
  {
    title: "Seamless Integration Across Platforms",
    subTitle: "Is juggling multiple software solutions slowing you down?",
    content: (
      <div>
        Our platform integrates{" "}
        <span className="font-bold text-blue-500">
          seamlessly across your existing tools
        </span>
        , enhancing your workflow without disrupting what works. By connecting
        your services, we help you
        <span className="font-bold text-blue-500">
          {" "}
          manage everything from one central point
        </span>
        , simplifying your operations and saving you valuable time.
      </div>
    ),
    image: "/images/HomeSections/Integrations-1.png",
    imageFirst: false,
    linkTo: "/blogs",
  },
];

export const companies: Company[] = [
  { name: "google", image: "/images/Google cloud.png" },
  { name: "", image: "/images/Ebay.png" },
  { name: "", image: "/images/Tux.png" },
  { name: "", image: "/images/Spotify.png" },
  { name: "", image: "/images/Airbnb.png" },
  { name: "", image: "/images/Facebook.png" },
  { name: "", image: "/images/Coca Cola.png" },
  { name: "", image: "/images/Zoom.png" },
  { name: "", image: "/images/Creative Cloud.png" },
  { name: "", image: "/images/Netflix.png" },
  { name: "", image: "/images/Discord.png" },
  { name: "", image: "/images/Figma.png" },
  { name: "", image: "/images/Paypal.png" },
  { name: "", image: "/images/Adobe.png" },
];

const images = [
  "/images/reviews/Black Shirt.png",
  "/images/reviews/Green_Shirt.png",
  "/images/reviews/Pink_Girl.jpg",
];
function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

let imageIndex = 0;
function getNextImage(): string {
  const selectedImage = images[imageIndex];
  imageIndex = (imageIndex + 1) % images.length;
  return selectedImage;
}
export const sildes: SlideProps[] = [
  {
    name: "Ankit Gupta",
    image: "/images/reviews/review-1.png", // Placeholder image path, replace with the actual path if needed
    content:
      "Using CyberOni's advanced AI tools has revolutionized how we handle data at our company. The automation of mundane tasks has allowed our team to focus on innovation and strategy. It's been a game-changer for our productivity!",
    designation: "IT Solutions Architect", // You may want to update the designation based on the context.
  },
  {
    name: "Josh Praus",
    image: "/images/reviews/review-2.png", // Placeholder image path, replace with the actual path if needed
    // Placeholder image path, replace with the actual path if needed
    content:
      "CyberOni's SEO and automated marketing tools have transformed our online presence. I no longer worry about daily content updates — it's all handled seamlessly in the background, boosting our visibility and engagement rates.",
    designation: "Digital Marketing Specialist",
    // No response provided for this review
  },
  {
    name: "Nate Robert-Eze",
    image: "/images/reviews/review-3.png", // Placeholder image path, replace with the actual path if needed
    content:
      "The automated customer contact system from CyberOni has made it incredibly easy to stay connected with our customers. It's like having a 24/7 support team without the overhead. Our customer satisfaction has never been higher!",
    designation: "Creative Director",
  },
  {
    name: "Ja'Lyn Lee",
    image: "/images/reviews/review-4.png", // Placeholder image path, replace with the actual path if needed
    // Placeholder image path, replace with the actual path if needed
    content:
      "The integration capabilities of CyberOni have streamlined our operations significantly. Connecting all our tools into one cohesive system has saved us countless hours and reduced errors. It's the smoothest workflow we've ever had!",
    designation: "Operations Manager",
    // No response provided for this review
  },
  {
    name: "Jaynie Deocampo",
    image: "/images/reviews/review-5.png", // Placeholder image path, replace with the actual path if needed
    // Placeholder image path, replace with the actual path if needed
    content:
      "The automated support from CyberOni is phenomenal. It works tirelessly around the clock, ensuring our clients always have the help they need. This has greatly improved our client relations and reduced our support costs.",
    designation: "Brand Strategist",
    // No response provided for this review
  },
  {
    name: "Rotunda Coleman",
    image: "/images/reviews/review-6.png", // Placeholder image path, replace with the actual path if needed
    // Placeholder image path, replace with the actual path if needed
    content:
      "As an Apartment Hunter, the AI-driven analytics and automated communication tools from CyberOni have been invaluable. They help me understand client needs better and respond faster than ever before",
    designation: "Apartment Hunter",
    // No response provided for this review
  },
  {
    name: "Gina Stauble",
    image: "/images/reviews/review-7.png", // Placeholder image path, replace with the actual path if needed
    // Placeholder image path, replace with the actual path if needed
    content:
      "The real-time data analysis and automated marketing provided by CyberOni have enhanced how I connect with potential buyers. I can now target the right audience effortlessly, increasing my closing rates dramatically.",
    designation: "Real estate agent",
    // No response provided for this review
  },

  // Add more slides as needed
];

export const softwareProducts = [
  {
    image: "/images/Zoom.png",
    title: "Zoom",
    subTitle: "Video Calling",
  },
  {
    image: "/images/Creative Cloud.png",
    title: "Creative Cloud",
    subTitle: "Video Editing",
  },

  {
    image: "/images/Slack.png",
    title: "Discord",
    subTitle: "Discord",
  },
  {
    image: "/images/Zoom.png",
    title: "Zoom",
    subTitle: "Video Calling",
  },
  {
    image: "/images/Creative Cloud.png",
    title: "Creative Cloud",
    subTitle: "Video Editing",
  },

  {
    image: "/images/Slack.png",
    title: "Discord",
    subTitle: "Discord",
  },
  {
    image: "/images/Zoom.png",
    title: "Zoom",
    subTitle: "Video Calling",
  },
  {
    image: "/images/Creative Cloud.png",
    title: "Creative Cloud",
    subTitle: "Video Editing",
  },

  {
    image: "/images/Slack.png",
    title: "Discord",
    subTitle: "Discord",
  },
  {
    image: "/images/Zoom.png",
    title: "Zoom",
    subTitle: "Video Calling",
  },
  {
    image: "/images/Creative Cloud.png",
    title: "Creative Cloud",
    subTitle: "Video Editing",
  },

  {
    image: "/images/Slack.png",
    title: "Discord",
    subTitle: "Discord",
  },
  {
    image: "/images/Zoom.png",
    title: "Zoom",
    subTitle: "Video Calling",
  },
  {
    image: "/images/Creative Cloud.png",
    title: "Creative Cloud",
    subTitle: "Video Editing",
  },

  {
    image: "/images/Slack.png",
    title: "Discord",
    subTitle: "Discord",
  },
  {
    image: "/images/Zoom.png",
    title: "Zoom",
    subTitle: "Video Calling",
  },
  {
    image: "/images/Creative Cloud.png",
    title: "Creative Cloud",
    subTitle: "Video Editing",
  },

  {
    image: "/images/Discord.png",
    title: "Discord",
    subTitle: "Discord",
  },
];

export const softwareCategories = [
  { name: "Video Calling" },
  { name: "Social Media" },
  { name: "Video Editing" },
  { name: "Messaging" },
];
