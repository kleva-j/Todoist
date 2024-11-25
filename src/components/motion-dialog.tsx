"use client";

import {
  type Variant,
  AnimatePresence,
  motion,
  MotionConfig,
} from "framer-motion";

import { useOnClickOutside } from "@/hooks/use-click-outside";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  useId,
} from "react";
import { XIcon } from "lucide-react";

interface MotionDialogProps extends PropsWithChildren {
  className?: string;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

interface MotionDialogSharedProps extends PropsWithChildren {
  className?: string;
  style?: React.CSSProperties;
}

interface MotionDialogDescriptionProps extends MotionDialogSharedProps {
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
}

type MotionDialogCloseProps = Omit<
  MotionDialogDescriptionProps,
  "disableLayoutAnimation"
>;

interface DialogContextType {
  open: boolean;
  uniqueId: string;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const DialogContext = createContext<DialogContextType | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
}

function MotionDialog(props: MotionDialogProps) {
  const { children, onOpenChange, defaultOpen = false } = props;

  const [open, setIsOpen] = useState(defaultOpen);

  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const contextValue = useMemo(
    () => ({
      open,
      uniqueId,
      triggerRef,
      onOpenChange: handleOpenChange,
    }),
    [open, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={{ type: "spring", duration: 0.4 }}>
        {children}
      </MotionConfig>
    </DialogContext.Provider>
  );
}

function DialogTrigger({
  children,
  className,
  style,
}: MotionDialogSharedProps) {
  const { uniqueId, onOpenChange, open, triggerRef } = useDialogContext();

  const handleClick = useCallback(() => {
    onOpenChange(!open);
  }, [open, onOpenChange]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpenChange(!open);
      }
    },
    [open, onOpenChange]
  );

  return (
    <motion.div
      ref={triggerRef}
      className={cn("relative cursor-pointer", className)}
      layoutId={`dialog-${uniqueId}`}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      style={style}
      aria-controls={`dialog-content-${uniqueId}`}
      aria-haspopup="dialog"
      aria-expanded={open}
      role="button"
    >
      {children}
    </motion.div>
  );
}

function DialogContent({
  children,
  className,
  style,
}: MotionDialogSharedProps) {
  const { open, uniqueId, onOpenChange, triggerRef } = useDialogContext();

  const containerRef = useRef<HTMLDivElement>(null);

  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
      if (event.key === "Tab") {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpenChange, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);

    if (open) {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(
          focusableElements[focusableElements.length - 1] as HTMLElement
        );
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      document.body.classList.remove("overflow-hidden");
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  useOnClickOutside(containerRef, () => {
    if (open) onOpenChange(false);
  });

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn("overflow-hidden p-4 rounded", className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

function DialogContainer(props: MotionDialogSharedProps) {
  const { children } = props;

  const { open, uniqueId } = useDialogContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode="sync">
      {open && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 size-full bg-white/40 backdrop-blur-sm dark:bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

function DialogTitle({ children, className, style }: MotionDialogSharedProps) {
  const { uniqueId } = useDialogContext();

  return (
    <motion.div
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.div>
  );
}

function DialogDescription(props: MotionDialogDescriptionProps) {
  const { children, className, variants, disableLayoutAnimation } = props;
  const { uniqueId } = useDialogContext();

  const key = `dialog-description-${uniqueId}`;

  return (
    <motion.div
      id={key}
      key={key}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      className={cn("text-xs text-muted-foreground", className)}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

function DialogClose(props: MotionDialogCloseProps) {
  const { children, className, variants } = props;
  const { onOpenChange, uniqueId } = useDialogContext();

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn("absolute right-6 top-6", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <XIcon size={24} />}
    </motion.button>
  );
}

MotionDialog.Description = DialogDescription;
MotionDialog.Container = DialogContainer;
MotionDialog.Trigger = DialogTrigger;
MotionDialog.Content = DialogContent;
MotionDialog.Title = DialogTitle;
MotionDialog.Close = DialogClose;

export { MotionDialog };
