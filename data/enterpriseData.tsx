import { FeatureCardProps } from "@/components/enterprise/FeatureCard";
import { StepCardProps } from "@/components/enterprise/HowItWorks";
import { Lightbulb, Mail, MessageSquare, MessageSquareText } from "lucide-react";

export const featureCards: FeatureCardProps[] = [
    {
        image: "/images/team.png",
        title: "Experience",
        description: "With Cyberoni, you gain access to a wealth of professional Web Development experience. We stay at the forefront of technology and trends to ensure that your project not only meets but exceeds industry standards. Our goal is to transform your vision into a digital reality, delivering a project that is not just complete but ahead of its time. Our team’s dedication to growth ensures your website will always be on the cutting edge."
    },
    {
        image: "/images/brain.png",
        title: "Committed Team",
        description: "Our team is the heart of Cyberoni. We are a group of driven, tech-savvy professionals, dedicated to delivering only the best. We understand that our success is measured by the success of your website. That’s why we immerse ourselves in every project, applying meticulous attention to detail to create websites that are not just functional but also thrive in today’s digital landscape."
    },
    {
        image: "/images/stopwatch.png",
        title: "Efficient Delivery",
        description: "At Cyberoni, we value your time. That's why we are committed to delivering high-quality, fully-tested websites promptly. We understand the pace of business and strive to provide you with fast turnaround times without compromising on quality. From initial concept to final launch, we streamline our development process to get your project live, allowing you to start meeting your business objectives faster."
    },
    {
        image: "/images/price-tag.png",
        title: "Fair Pricing",
        description: "We believe in offering outstanding value without hidden costs. Cyberoni provides competitive pricing structures that cater to businesses of all sizes. While maintaining high-quality standards, we ensure that your investment in your website is transparent and yields tangible results. Partner with us for cost-effective solutions that don't sacrifice quality."
    }


]


export const HowItWorksSteps: StepCardProps[] = [

    {
        icon: <MessageSquareText className="h-20 w-20" />,
        content: "Give one sentence describing the transformation your service offers from start to finish."
    },
    {
        icon: <Lightbulb className="h-20 w-20" />,
        content: "Give one sentence describing the transformation your service offers from start to finish."
    },
    {
        icon: <Mail className="h-20 w-20" />,
        content: "Give one sentence describing the transformation your service offers from start to finish."
    }
]