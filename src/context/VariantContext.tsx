import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type UiVariant = "testA" | "testB";

const STORAGE_KEY = "communication-preferences-ui-variant";

export const VARIANT_LABELS: Record<UiVariant, { title: string; short: string }> =
  {
    testA: {
      title: "Test A",
      short: "Test A",
    },
    testB: {
      title: "Test B",
      short: "Test B",
    },
  };

type VariantContextValue = {
  variant: UiVariant;
  setVariant: (variant: UiVariant) => void;
  cycleVariant: () => void;
};

const VariantContext = createContext<VariantContextValue | null>(null);

function readStoredVariant(): UiVariant {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "testA" || stored === "testB") return stored;
    if (stored === "classic") return "testA";
    if (stored === "redesign") return "testB";
  } catch {
    /* ignore */
  }
  return "testB";
}

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<UiVariant>(readStoredVariant);

  const setVariant = useCallback((next: UiVariant) => {
    setVariantState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const cycleVariant = useCallback(() => {
    setVariant(variant === "testB" ? "testA" : "testB");
  }, [variant, setVariant]);

  useEffect(() => {
    document.documentElement.dataset.uiVariant = variant;
  }, [variant]);

  const value = useMemo(
    () => ({ variant, setVariant, cycleVariant }),
    [variant, setVariant, cycleVariant]
  );

  return (
    <VariantContext.Provider value={value}>{children}</VariantContext.Provider>
  );
}

export function useVariant() {
  const ctx = useContext(VariantContext);
  if (!ctx) {
    throw new Error("useVariant must be used within VariantProvider");
  }
  return ctx;
}
