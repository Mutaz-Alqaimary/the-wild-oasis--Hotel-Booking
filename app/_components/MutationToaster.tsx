"use client";

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Toaster, toast } from "sonner";

const toastMessages = {
  "booking-created": {
    title: "Reservation confirmed",
    description: "Your cabin stay has been added to your reservations.",
  },
  "booking-updated": {
    title: "Reservation updated",
    description: "Your stay details are saved.",
  },
  "signed-out": {
    title: "Signed out",
    description: "Your session has ended.",
  },
  "signed-in": {
    title: "Signed in",
    description: "You are now logged in.",
  },
} as const;

type ToastKey = keyof typeof toastMessages;

const loadingToastIds: Partial<Record<ToastKey, string>> = {
  "signed-in": "auth-sign-in",
  "signed-out": "auth-sign-out",
};

function MutationToastBridge() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const lastToast = useRef<string | null>(null);

  useEffect(() => {
    const toastKey = searchParams.get("toast") as ToastKey | null;

    if (!toastKey || !(toastKey in toastMessages)) return;

    const dedupeKey = `${pathname}:${toastKey}`;
    if (lastToast.current === dedupeKey) return;

    lastToast.current = dedupeKey;
    const message = toastMessages[toastKey];
    const loadingToastId = loadingToastIds[toastKey];

    if (loadingToastId) toast.dismiss(loadingToastId);

    toast.success(message.title, {
      description: message.description,
      duration: 4200,
    });

    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("toast");
    const query = nextParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  return null;
}

export default function MutationToaster() {
  return (
    <>
      <Toaster
        richColors
        closeButton
        expand
        position="top-center"
        visibleToasts={4}
        gap={12}
        offset={20}
        icons={{
          success: <CheckCircleIcon className="size-5" />,
          error: <ExclamationTriangleIcon className="size-5" />,
          info: <InformationCircleIcon className="size-5" />,
          loading: <SparklesIcon className="size-5 animate-pulse" />,
        }}
        toastOptions={{
          classNames: {
            toast:
              "group border border-primary-700/70 bg-primary-900/95 text-primary-100 shadow-2xl shadow-primary-950/40 backdrop-blur-xl",
            title: "text-sm font-semibold text-primary-50",
            description: "text-sm text-primary-300",
            success:
              "border-emerald-400/40 bg-gradient-to-r from-emerald-950/95 to-primary-900/95 text-emerald-50",
            error:
              "border-red-400/40 bg-gradient-to-r from-red-950/95 to-primary-900/95 text-red-50",
            loading:
              "border-accent-400/40 bg-gradient-to-r from-accent-950/95 to-primary-900/95 text-accent-50",
            closeButton:
              "border-primary-600 bg-primary-950 text-primary-200 hover:bg-primary-800",
          },
        }}
      />
      <MutationToastBridge />
    </>
  );
}
