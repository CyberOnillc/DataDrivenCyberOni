'use client'
import { AlertCircle, Mail, PlaneIcon, Send, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from 'react';
import { LoadingCircle } from "../shared/icons";
import Balancer from "react-wrap-balancer";
import ClientInput from "../layout/ClientInput";
import GoogleCaptchaWrapper from "../GoogleCaptchaWrapper";
import { useReCaptcha } from "next-recaptcha-v3";
import Link from "next/link";
import xss from "xss";

function ContactForm(props: { onModal?: boolean, showModal?: boolean, setShowModal?: Dispatch<SetStateAction<boolean>> }) {
  return <>
    <GoogleCaptchaWrapper >
      <ContactFormLOC {...props} />
    </GoogleCaptchaWrapper>
  </>
}
function ContactFormLOC(props: { onModal?: boolean, showModal?: boolean, setShowModal?: Dispatch<SetStateAction<boolean>> }) {

  const referralOptions = [
    "Google",
    "Facebook",
    "Twitter",
    "Friend",
    "Other",
  ];


  const [showForm, setShowForm] = useState(true);
  const [showThanks, setShowThanks] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [referral, setReferral] = useState(referralOptions[0]);


  const handleInterestClick = (interest: string) => {
    setSelectedInterest(interest);
  };
  const { executeRecaptcha, loaded } = useReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here, you can handle form submission, e.g., sending data to a server.
    // console.log('Form submitted:', { selectedInterest, name, email, message });

    if (name && email && message) {
      const token = await executeRecaptcha('Contact_Submit_Modal')

      let captchaRes = await fetch('/api/captcha', { method: 'POST', body: JSON.stringify({ token }) })
      if (captchaRes.status !== 200) {
        setShowError(true);
        setShowForm(false)

        return
      }
      let res = await fetch(`/api/marketing/contact`, { method: "POST", body: JSON.stringify({ name, email, subject: selectedInterest, message, referral }) , credentials: 'include'})
      setShowForm(false)
      if (res.status === 200) {
        setShowThanks(true)
        hideModal()
      }
      else {
        setShowError(true)
      }

    }
  };

  function hideModal() {
    if (props.onModal && props.setShowModal) props.setShowModal(false);

  }

  return (
    <div className="relative mx-auto h-full min-h-fit w-full rounded-lg bg-[#5001EAAD] p-6 shadow-lg">
      {props.setShowModal && <button className="absolute top-4 right-4 hover:text-red-500 cursor-pointer" onClick={()=>props.setShowModal? props.setShowModal(false):{}}><X /></button>}
      {showForm && (
        <form className="h-full w-full lg:p-6 " onSubmit={handleSubmit}>
          <h1 className="my-2 text-4xl">Contact us</h1>
          <div className="mb-4 w-full">
            <label
              htmlFor="name"
              className="text-sm text-white transition-all duration-300 ease-in-out"
            >
              Name :
            </label>
            <input
              type="text"
              id="name"
              className="autofill-neutral w-full border-0  border-b-2 bg-transparent p-2 placeholder-white outline-none  ring-0 focus:border-[#A91079] focus:border-transparent focus:outline-none"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full lg:w-auto">
            <label htmlFor="email" className="mb-2 block">
              Your Email:
            </label>
            <ClientInput
              type="email"
              id="email"
              className="autofill-neutral w-full  border-0 border-b-2 bg-transparent p-2 placeholder-white ring-0  focus:border-[#A91079] focus:border-transparent focus:outline-none"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 w-full lg:w-auto">
            <label htmlFor="referral" className="mb-2 block">
              How did you hear about us?
            </label>
            <select
              id="referral"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              className="autofill-neutral w-full border-0 border-b-2 bg-transparent p-2 placeholder-black ring-0 focus:border-[#A91079] focus:border-transparent focus:outline-none"
              required
            >
              {referralOptions.map((option, index) => (
                <option className="bg-white dark:bg-slate-950 text-white" key={index} value={option} >
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-full lg:w-auto">
            <label htmlFor="message" className="mb-2 block">
              Message:
            </label>
            <textarea
              id="message"
              rows={4}
              className="foucs:ring-0 autofill-neutral  w-full border-0 border-b-2 bg-transparent p-2 placeholder-white focus:border-b-2 focus:border-none focus:border-[#A91079] focus:outline-none"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-center lg:justify-start gap-5 p-3">
            <button
              type="submit"
              className="flex items-center justify-center rounded-lg bg-[#A91079] px-8 py-4 text-white hover:bg-blue-900"
            >
              <Send color="white" className="mx-2" />
              <span className="mx-2">Send Message</span>
            </button>
            <Link onClick={hideModal} href={`/contact?name=${xss(name)}&email=${xss(email)}&message=${xss(message)}`} className="bg-gradient-to-b from-orange-400 to-orange-500 text-center text-white p-4 rounded-lg">
              Enterprise Contact
            </Link>
          </div>
        </form>
      )}

      {!showForm && !showThanks && !showError && (
        <>
          <LoadingCircle></LoadingCircle>
        </>
      )}

      {showThanks && (
        <>
          <div className="flex w-full h-full flex-col items-center justify-center p-10 text-center">
            <Mail />
            <Balancer>Check you email</Balancer>
          </div>
        </>
      )}

      {showError && (
        <>
          <div className="flex w-full h-full flex-col items-center justify-center p-10 text-center">
            <AlertCircle color="red" />
            <Balancer>An error occurred</Balancer>
          </div>
        </>
      )}
    </div>
  );
}

export default ContactForm;
