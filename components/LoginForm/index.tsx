"use client";
import { ArrowRight, Facebook } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ClientInput from "@/components/layout/ClientInput";
import { getCsrfToken, signIn } from "next-auth/react";
import { Github, Google } from "../shared/icons";
import AuthFormFooter from "../shared/auth-form-footer";
import OauthLogin from "../OauthLogin";

function LoginForm() {
  const searchParams = useSearchParams();
  const [csrfToken, setCsrfToken] = useState("");
  const [search, setSearch] = useState({
    error: searchParams.get("error") as string,
  });

  useEffect(() => {
    async function loadToken() {
      const csrfToken = await getCsrfToken();
      setCsrfToken(csrfToken as string);
    }
    loadToken();
  }, []);

  useEffect(() => {
    setSearch({
      error: searchParams.get("error") as string,
    });
  }, [searchParams]);

  return (
    <>
      <div className="container mx-auto max-w-md rounded-xl border bg-white/30 py-5 backdrop-blur-lg dark:bg-black/5">
        <form
          method="POST"
          action={"/api/auth/callback/credentials"}
          className="flex flex-col rounded-2xl bg-transparent px-5 pb-1 pt-5 text-gray-950 dark:text-gray-50"
        >
          <h1 className="text-bold my-1 text-2xl dark:text-gray-50">Login</h1>
          <p className="my-1 text-base">Glad you are back</p>
          {search.error === "CredentialsSignin" ? (
            <div className="my-3 rounded-lg bg-rose-500/80 px-4 py-1 text-gray-200 ring-2 ring-red-600">
              Wrong credentials try again with correct credentials
            </div>
          ) : (
            <></>
          )}
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="relative my-4">
            <ClientInput
              className="focus:shadow-outline peer w-full appearance-none rounded-xl border bg-transparent px-4 py-4 leading-tight text-gray-700 shadow-lg  focus:outline-none dark:border-gray-200 dark:text-gray-100"
              name="username"
              id="username"
              type="email"
              placeholder=""
              required
            />
            <label
              className="absolute left-3 top-0 mb-2 block -translate-y-3 rounded-full px-1 text-sm  font-bold text-gray-700 transition-all peer-placeholder-shown:translate-y-3  peer-placeholder-shown:bg-white/10 peer-focus:-translate-y-3 peer-focus:text-blue-500 peer-focus:backdrop-blur-lg   dark:bg-slate-900 dark:text-gray-100 dark:backdrop-blur-sm peer-placeholder-shown:dark:bg-slate-900"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="relative my-4">
            <ClientInput
              className="focus:shadow-outline peer w-full appearance-none rounded-xl border bg-transparent px-4 py-4 leading-tight text-gray-700 shadow-lg   focus:outline-none dark:border-gray-200 dark:text-gray-100"
              name="password"
              type="password"
              placeholder=""
              required
            />
            <label
              className="absolute left-3 top-0 mb-2 block -translate-y-3 rounded-full px-1 text-sm  font-bold text-gray-500  backdrop-blur-sm transition-all peer-placeholder-shown:translate-y-3 peer-placeholder-shown:bg-white/80 peer-focus:-translate-y-3  peer-focus:text-blue-500   dark:bg-slate-900 dark:text-gray-50 dark:backdrop-blur-sm peer-placeholder-shown:dark:bg-slate-900"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="flex items-center justify-center px-1 py-2">
            <button
              disabled={csrfToken == ""}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-[#628EFF] via-[#8740CD] to-[#580475] p-4 px-10 text-center text-base font-bold hover:shadow-sm disabled:cursor-not-allowed disabled:text-gray-400"
              type="submit"
            >
              <div className="flex-1">Login</div>
            </button>
          </div>

          <Link
            className="py-1 text-center text-sm hover:text-blue-500 hover:underline"
            href={"/auth/forgot"}
          >
            Forgot Password?
          </Link>
        </form>
        <div className="my-4 flex items-center  justify-center gap-3 text-center font-bold">
          <hr className="w-1/3" /> OR <hr className="w-1/3" />
        </div>
        <OauthLogin />
        <AuthFormFooter />
      </div>
    </>
  );
}

export default LoginForm;
