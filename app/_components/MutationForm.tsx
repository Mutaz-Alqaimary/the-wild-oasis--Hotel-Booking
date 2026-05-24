"use client";

import type { ReactNode } from "react";
import { toast } from "sonner";

type MutationFormProps = {
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  loadingMessage: string;
  successMessage?: string;
  errorMessage: string;
  onSuccess?: () => void;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function isNextRedirectError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string" &&
    error.digest.startsWith("NEXT_REDIRECT")
  );
}

export default function MutationForm({
  action,
  children,
  className,
  ariaLabel,
  loadingMessage,
  successMessage,
  errorMessage,
  onSuccess,
}: MutationFormProps) {
  return (
    <form
      action={async (formData) => {
        const toastId = toast.loading(loadingMessage);

        try {
          await action(formData);
          onSuccess?.();

          if (successMessage) {
            toast.success(successMessage, { id: toastId });
          } else {
            toast.dismiss(toastId);
          }
        } catch (error) {
          if (isNextRedirectError(error)) {
            toast.dismiss(toastId);
            throw error;
          }

          toast.error(getErrorMessage(error, errorMessage), { id: toastId });
        }
      }}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </form>
  );
}
