"use client";
import { Check, Info, X, XCircle } from "lucide-react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { NotificationType } from "./server";

export type NotificationProps = {
  message: string;
  type: NotificationType;
  visible: boolean;
};
function useNavigate() {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push, replace }] = useState({
    push: (path: string) => routerRef.current.push(path),
    replace: (path: string) => routerRef.current.replace(path),
  });

  return { push, replace };
}

export function useNotify() {
  const router = useRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push, replace }] = useState({
    push: (path: string) => routerRef.current.push(path),
    replace: (path: string) => routerRef.current.replace(path,  { scroll: false, }),
  });
  return (
    message: string,
    type: NotificationType,
    option?: {
      autoClose: boolean;
    }
  ) =>
    replace(
      `?notify=true&notifyType=${type}&message=${message}&autoClose=${option?.autoClose}`
    );
}

const Notification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(searchParams.get("message") as string);
  // console.log(searchParams.get('notifyType'));
  const [type, setType] = useState(searchParams.get("notifyType") || "success");
  const [autoClose, setAutoClose] = useState(
    searchParams.get("autoClose") === "false" ? false : true
  );
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    setMessage(searchParams.get("message") as string);
    setNotify(searchParams.get("notify") === "true" ? true : false);
    setAutoClose(searchParams.get("autoClose") === "false" ? false : true);
    setType(searchParams.get("notifyType") || "success");
  }, [searchParams]);

  useEffect(() => {
    if (notify && autoClose) {
      if (autoClose) {
        setTimeout(() => {
          const newSearch = new URLSearchParams(searchParams);
          newSearch.delete("notify");
          newSearch.delete("message");
          newSearch.delete("autoClose");
          newSearch.delete("notifyType");
          router.replace("?" + newSearch.toString(), { scroll: false });
          setNotify(false);
        }, 3000);
      }
    }
  }, [notify, router, autoClose, searchParams]);

  function close() {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.delete("notify");
    newSearch.delete("message");
    newSearch.delete("autoClose");
    newSearch.delete("notifyType");
    router.replace("?" + newSearch.toString(), { scroll: false });
    setNotify(false);
  }

  return (
    <div
      className={`fixed bottom-10 right-2 flex items-center justify-center gap-2 rounded p-4 lg:bottom-10 lg:right-10 ${type === "success"
        ? "bg-green-500 text-white "
        : type === "fail"
          ? "bg-red-500 text-white"
          : "bg-red-700 text-zinc-900"
        } ${notify ? " z-[10000] animate-slide-up-fade" : "opacity-0 hidden"
        } text-base  transition-opacity duration-300  lg:font-semibold `}
    >
      {type === "success" ? (
        <Check className="mr-2" />
      ) : type === "fail" ? (
        <XCircle className="mr-2" />
      ) : (
        <Info className="mr-2" />
      )}
      {message}
      {
        <button
          className="flex items-center justify-center rounded-xl p-2 hover:shadow-inner"
          onClick={close}
        >
          <X />
        </button>
      }
    </div>
  );
};

export default Notification;
