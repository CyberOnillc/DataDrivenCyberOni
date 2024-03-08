'use client'
import { useState } from "react";
import { Star } from "lucide-react";
import ClientInput from "../layout/ClientInput";
import { submitReview } from "./submit";
import ErrorModal from "../shared/ErrorModal";
export type ReviewFormState = {
  rating: number,
  contact: string,
  name: string,
  message: string,
  success: boolean,
  category: 'Product' | 'Service' | 'Support'
  error: string

}
const ReviewForm = ({ category, name, contact }: { category: 'Product' | 'Service' | 'Support', name: string, contact: string }) => {
  const [feedback, setFeedback] = useState<ReviewFormState>({ rating: 0, message: "", name: name, contact: contact, category: category, success: false, error: "" });
  const [form_filled, setFilled] = useState(false);

  const [hoveredRating, setHoveredRating] = useState(0);

  // Function to handle rating selection
  const handleRating = (rating: number) => {
    setFilled(true);
    setFeedback({ ...feedback, rating });
  };

  // Function to handle mouse enter on stars
  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  // Function to handle mouse leave on stars
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };
  const handleSubmit = async () => {
    if (feedback.rating < 4) {
      // Show comment box if rating is less than 4
      console.log("submit");
      const state = await submitReview(feedback)
      setFeedback(state)
    } else {
      // Submit the feedback here
      console.log("Feedback submitted:", feedback);
      // If you need to redirect to Google after submission
      window.location.href = "https://www.cybershoptech.com/leave_a_review";
    }
  };
  // Function to render stars
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const filled = feedback.rating > index || hoveredRating > index;
      return (
        <Star
          key={index}
          className={`cursor-pointer text-blue-600 ${filled ? 'fill-amber-300 stroke-0' : 'dark:fill-slate-700 fill-slate-100 stroke-2'} `}
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleRating(index + 1)}
        />
      );
    });
  };

  return (
    <div>
      {!feedback.success ? <form action={handleSubmit} className="flex flex-col items-center space-y-4 rounded bg-white dark:bg-slate-900 p-4 shadow-lg">
        <h2 className="text-xl font-semibold">
          {form_filled && feedback.rating < 4
            ? "Oh No!"
            : feedback.rating >= 4 || !form_filled
              ? "How was your experience?"
              : "Thank you for your feedback"}
        </h2>
        <p className="text-gray-600">
          {form_filled && feedback.rating < 4
            ? "We’re sorry you didn’t have a good experience, please let us know how we can improve."
            : feedback.rating >= 4 || !form_filled
              ? "Thank you for putting the word out for us!"
              : "How was your experience?"}{" "}
        </p>
        <div className="flex space-x-1">{renderStars()}</div>
        {feedback.rating < 4 && feedback.rating > 0 && (
          <>
            <div className="flex gap-4">
              <div className="relative my-4">
                <ClientInput
                  className="peer shadow-lg appearance-none border
                   dark:border-gray-200 rounded-xl w-full py-4 px-4
                    bg-transparent text-gray-700 dark:text-gray-100  
                    invalid:text-red-400 invalid:border-red-400 invalid:outline-red-400
                    dark:invalid:text-red-400 dark:invalid:border-red-400 dark:invalid:outline-red-400

                    leading-tight focus:outline-none focus:shadow-outline"
                  name="contact"
                  type="text"
                  title="valid email address or US phone number"
                  placeholder=""
                  pattern="^(?:[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}|(?:\+(?:[0-9] ?){6,14}[0-9])|(?:\+?(1)?[\-. ]?\(?[2-9][0-9]{2}\)?[\-. ]?[2-9][0-9]{2}[\-. ]?[0-9]{4}))$"
                  value={feedback.contact}
                  onChange={(e) => setFeedback(prev => ({ ...prev, contact: e.target.value }))}
                  required
                />
                <label className="block absolute top-0 left-3 -translate-y-3 peer-focus:-translate-y-3 ]
                            peer-placeholder-shown:translate-y-3 peer-focus:text-blue-500 peer-placeholder-shown:bg-white bg-slate-50
                           peer-focus:backdrop-blur-lg peer-placeholder-shown:dark:bg-slate-900 dark:bg-slate-900 
                           dark:backdrop-blur-sm  px-1 dark:text-gray-100 text-gray-700 
                           peer-invalid:text-red-400 dark:peer-invalid:text-red-400
                           transition-all   text-sm font-bold mb-2 rounded-full" htmlFor="email">
                  Email or Phone
                </label>
              </div>
              <div className="relative my-4">
                <ClientInput
                  className="peer shadow-lg appearance-none border dark:border-gray-200 rounded-xl w-full py-4 px-4 bg-transparent text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  id="name"
                  placeholder=""
                  value={feedback.name}
                  onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
                <label className="block absolute top-0 left-3 -translate-y-3 peer-focus:-translate-y-3 peer-placeholder-shown:translate-y-3 peer-focus:text-blue-500 peer-placeholder-shown:bg-white/10  peer-focus:backdrop-blur-lg peer-placeholder-shown:dark:bg-slate-900 dark:bg-slate-900 dark:backdrop-blur-sm  px-1 dark:text-gray-100 text-gray-700 transition-all   text-sm font-bold mb-2 rounded-full" htmlFor="email">
                  Name
                </label>
              </div>
            </div>
            <textarea
              className="peer shadow-lg appearance-none border dark:border-gray-200 rounded-xl w-full py-4 px-4 bg-transparent text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Please let us know how we can improve."
              title="Please let us know how we can improve"
              required
              onChange={(e) =>
                setFeedback({ ...feedback, message: e.target.value })
              }
            /></>
        )}
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit
        </button>
        {feedback.error && <ErrorModal show={feedback.error.length > 0} message={feedback.error} />}

      </form> :

        <div className="flex flex-col justify-center items-center py-10 my-10">
          <h2>Thank You for your feedback !!</h2>

        </div>

      }
    </div>

  );
};

export default ReviewForm;
