import Image from "next/image";

export type SlideProps = {
  name: string;
  designation?: string; // Optional since some reviews don't include this
  image?: string; // Optional as not all reviews might have associated images
  content: string;
  additionalInfo?: string; // For owner responses or any additional review details
};
function Slide({ image, name, content, designation }: SlideProps) {
  return (
    <div className="mx-10 flex flex-col items-center justify-center gap-5 p-10 lg:flex-row">
      <div className="m-4 h-60 w-60 overflow-hidden rounded-[15%] bg-gradient-purple p-0.5  shadow-left-shift-lg">
        {image && (
          <Image
            className="h-full w-full rounded-[15%] object-cover"
            src={image}
            alt={name}
            width={500}
            height={500}
          ></Image>
        )}
      </div>
      <div className="lg:mx-10 flex flex-1 flex-col justify-center lg:h-60">
        <div className="my-2 whitespace-pre-line text-center lg:text-lg lg:text-left">
          {content}
        </div>
        <div className="my-2 text-center lg:text-left">{name}</div>
        <div className="my-2 text-center lg:text-left">{designation}</div>
      </div>
    </div>
  );
}

export default Slide;
