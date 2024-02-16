'use client'
import { PaymentElement, AddressElement, useStripe, useElements, CartElement } from '@stripe/react-stripe-js';
import { LoadingCircle, LoadingDots } from "../shared/icons";
import Image from "next/image";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Loading from "../Loading";
import { PaymentIntent, PaymentIntentResult, StripeElements } from "@stripe/stripe-js";
import { useNotify } from "../Notification";


const CheckoutForm = ({ clientSecret, cartId, active, activationError , message }: { clientSecret: string, cartId: string, active: boolean, activationError: string , message?:string}) => {
  const stripe = useStripe();
  const elements = useElements();
  const notify = useNotify();

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState({
    price: 0,
    name: '',
    description: '',
  });

  const searchParams = useSearchParams();

  async function handlePayment() {

    if(!active) {

      notify(activationError, 'fail', { autoClose: true })
      setLoading(false);

      return 
    }

    const { error } = await stripe?.confirmPayment({
      elements: elements as StripeElements,

      confirmParams: {
        return_url: `${window.origin}/orders?id=${cartId}`,
      },
    }) as PaymentIntentResult;

    setLoading(false);
  }



  useEffect(() => {
    async function fetchData() {
      const { paymentIntent, error } = await stripe?.retrievePaymentIntent(clientSecret) as PaymentIntentResult

      if (!error) {
        setProduct({
          description: paymentIntent?.description as string,
          price: paymentIntent?.amount ?? 0,
          name: "Service Checkout",
        })
      }

    }
    if (stripe) {
      fetchData()

    }

  }, [clientSecret, stripe])



  return (
    <>
      {loading && (
        <>
          <div className="fixed inset-0 left-0 top-0  z-50 mx-auto flex h-full items-center justify-center backdrop-blur-lg ">
            <Loading />
          </div>
        </>
      )}

      {error && (
        <>
          <div className="fixed inset-0 left-0 top-0  z-50 mx-auto flex h-full items-center justify-center backdrop-blur-lg ">
            <div className="container mx-auto flex flex-col items-center justify-center py-10">
              <XCircle className="text-rose-600" />
              <div>{error}</div>
            </div>
          </div>
        </>
      )}
      {!showSuccess ? (
        <>
          <div className="z-30  flex flex-col items-center justify-center  gap-5 lg:flex-row container mx-auto dark:bg-slate-800">
            <form
              action={() => {
                setLoading(true);
                handlePayment();
              }}
              className="w-fit rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white p-3 px-6 shadow-lg ">
              <div className="max-h-[400px] min-h-[380px] w-fit overflow-y-auto p-2">
                <div>Checkout</div>
                {stripe ? (
                  <>
                    <PaymentElement
                      className="bg-gray-50 dark:bg-gray-800 dark:text-white "
                      onLoadError={() => console.log("load error")}
                      options={{
                        wallets: {
                          applePay: "auto",
                          googlePay: "auto",
                        },
                        layout: "tabs",

                        fields: {
                          billingDetails: {
                            address: {
                              city: "auto",
                              line1: "auto",
                              postalCode: "auto",
                              state: "auto",
                              country: "auto",
                            },
                            email: 'auto',
                            phone: 'auto',
                            name: 'auto',
                          },

                        },

                      }}
                    />

                  </>
                ) : (
                  <div className="flex h-96 w-96 items-center justify-center">
                    <LoadingDots />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className={`container flex justify-between items-center mx-auto my-5 rounded-xl bg-guru-blue p-3 text-white ${active ? 'bg-emerald-400' : 'bg-gray-600'} 0`}
              >
                <div>{(product.price / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}</div>
                <div className="flex gap-2 items-center">
                  <span>checkout</span>
                  <ArrowRight />
                </div>
              </button>
              <div>
                
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div className="my-24 flex h-full w-full flex-col items-center justify-center gap-5">
            <CheckCircle className="h-40 w-40 text-green-400" />
          </div>
        </>
      )}
    </>
  );

};

export default CheckoutForm;