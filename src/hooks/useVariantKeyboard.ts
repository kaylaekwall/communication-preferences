import { useEffect } from "react";
import type { UiVariant } from "../context/VariantContext";

type UseVariantKeyboardOptions = {
  setVariant: (variant: UiVariant) => void;
  cycleVariant: () => void;
};

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

export function useVariantKeyboard({
  setVariant,
  cycleVariant,
}: UseVariantKeyboardOptions) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;

      if (event.key === "1" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setVariant("testA");
        return;
      }

      if (event.key === "2" && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setVariant("testB");
        return;
      }

      if (
        event.key.toLowerCase() === "v" &&
        event.altKey &&
        !event.metaKey &&
        !event.ctrlKey
      ) {
        event.preventDefault();
        cycleVariant();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setVariant, cycleVariant]);
}
