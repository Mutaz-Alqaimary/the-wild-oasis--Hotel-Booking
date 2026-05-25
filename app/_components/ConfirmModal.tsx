"use client";

import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import SpinnerMini from "./SpinnerMini";

type ConfirmModalVariant = "danger" | "accent";

const variantStyles: Record<
  ConfirmModalVariant,
  {
    icon: string;
    confirm: string;
    glow: string;
  }
> = {
  danger: {
    icon: "border-red-400/30 bg-red-500/15 text-red-200",
    confirm:
      "bg-red-500 text-primary-50 shadow-lg shadow-red-950/30 hover:bg-red-400 focus-visible:ring-red-300",
    glow: "from-red-500/20 via-accent-500/10 to-transparent",
  },
  accent: {
    icon: "border-accent-400/30 bg-accent-500/15 text-accent-200",
    confirm:
      "bg-accent-500 text-primary-950 shadow-lg shadow-accent-950/30 hover:bg-accent-400 focus-visible:ring-accent-300",
    glow: "from-accent-500/20 via-primary-500/10 to-transparent",
  },
};

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: ConfirmModalVariant;
  icon?: ReactNode;
  isPending?: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "accent",
  icon,
  isPending = false,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const styles = variantStyles[variant];

  const handleClose = useCallback(() => {
    if (!isPending) onClose();
  }, [isPending, onClose]);

  useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement;
    cancelButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [handleClose, open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-primary-950/75 px-4 py-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={(event) => {
            if (event.currentTarget === event.target) handleClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="relative w-full max-w-md overflow-hidden rounded-md border border-primary-700/80 bg-primary-900 text-primary-100 shadow-2xl shadow-primary-950/60"
            initial={{ y: 18, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 14, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`absolute inset-x-0 top-0 h-24 bg-linear-to-b ${styles.glow} pointer-events-none`}
            />

            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-md text-primary-300 transition-colors hover:bg-primary-800 hover:text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Close confirmation dialog"
            >
              <XMarkIcon className="size-5" aria-hidden />
            </button>

            <div className="relative px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
              <div
                className={`relative z-10 mb-5 grid size-12 place-items-center rounded-md border ${styles.icon}`}
                aria-hidden
              >
                {icon ?? <ExclamationTriangleIcon className="size-6" />}
              </div>

              <h2
                id={titleId}
                className="pr-10 text-xl font-semibold leading-tight text-primary-50"
              >
                {title}
              </h2>
              <p
                id={descriptionId}
                className="mt-3 text-sm leading-6 text-primary-300 sm:text-base"
              >
                {description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  ref={cancelButtonRef}
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="min-h-11 rounded-md border border-primary-700 bg-primary-950/50 px-4 text-sm font-semibold text-primary-200 transition-colors hover:border-primary-500 hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {cancelLabel}
                </button>

                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isPending}
                  className={`min-h-11 rounded-md px-5 text-sm font-bold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-70 ${styles.confirm}`}
                >
                  {isPending ? (
                    <span className="flex min-w-24 items-center justify-center">
                      <SpinnerMini />
                    </span>
                  ) : (
                    confirmLabel
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export default ConfirmModal;
