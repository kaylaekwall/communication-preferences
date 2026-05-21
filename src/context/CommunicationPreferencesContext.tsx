import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyDisableGoPaperless,
  applyDisableEnableTexting,
  applyGoPaperless,
  applyEnableTexting,
  createInitialPreferences,
  type CommunicationPreferencesState,
} from "./communicationPreferencesTypes";
import { useVariant, type UiVariant } from "./VariantContext";

type VariantPreferencesBundle = {
  preferences: CommunicationPreferencesState;
  saved: CommunicationPreferencesState;
};

function createVariantBundle(): VariantPreferencesBundle {
  const initial = createInitialPreferences();
  return { preferences: initial, saved: initial };
}

function createPreferencesByVariant(): Record<
  UiVariant,
  VariantPreferencesBundle
> {
  return {
    testA: createVariantBundle(),
    testB: createVariantBundle(),
  };
}

type CommunicationPreferencesContextValue = {
  preferences: CommunicationPreferencesState;
  dirty: boolean;
  setPreferences: React.Dispatch<React.SetStateAction<CommunicationPreferencesState>>;
  setGoPaperless: (checked: boolean) => void;
  setEnableTexting: (checked: boolean) => void;
  save: () => void;
  cancel: () => void;
};

const CommunicationPreferencesContext =
  createContext<CommunicationPreferencesContextValue | null>(null);

export function CommunicationPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { variant } = useVariant();
  const [byVariant, setByVariant] = useState(createPreferencesByVariant);

  const { preferences, saved } = byVariant[variant];

  const dirty = useMemo(
    () => JSON.stringify(preferences) !== JSON.stringify(saved),
    [preferences, saved]
  );

  const setPreferences = useCallback<
    React.Dispatch<React.SetStateAction<CommunicationPreferencesState>>
  >(
    (action) => {
      setByVariant((all) => {
        const prev = all[variant].preferences;
        const next =
          typeof action === "function"
            ? (action as (p: CommunicationPreferencesState) => CommunicationPreferencesState)(
                prev
              )
            : action;
        return {
          ...all,
          [variant]: { ...all[variant], preferences: next },
        };
      });
    },
    [variant]
  );

  const setGoPaperless = useCallback(
    (checked: boolean) => {
      setPreferences((prev) => {
        if (checked) {
          return applyGoPaperless({ ...prev, goPaperless: true });
        }
        return applyDisableGoPaperless(prev);
      });
    },
    [setPreferences]
  );

  const setEnableTexting = useCallback(
    (checked: boolean) => {
      setPreferences((prev) => {
        if (checked) {
          return applyEnableTexting({ ...prev, enableTexting: true });
        }
        return applyDisableEnableTexting(prev);
      });
    },
    [setPreferences]
  );

  const save = useCallback(() => {
    setByVariant((all) => ({
      ...all,
      [variant]: { ...all[variant], saved: all[variant].preferences },
    }));
  }, [variant]);

  const cancel = useCallback(() => {
    setByVariant((all) => ({
      ...all,
      [variant]: { ...all[variant], preferences: all[variant].saved },
    }));
  }, [variant]);

  const value = useMemo(
    () => ({
      preferences,
      dirty,
      setPreferences,
      setGoPaperless,
      setEnableTexting,
      save,
      cancel,
    }),
    [
      preferences,
      dirty,
      setGoPaperless,
      setEnableTexting,
      save,
      cancel,
    ]
  );

  return (
    <CommunicationPreferencesContext.Provider value={value}>
      {children}
    </CommunicationPreferencesContext.Provider>
  );
}

export function useCommunicationPreferences() {
  const ctx = useContext(CommunicationPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useCommunicationPreferences must be used within CommunicationPreferencesProvider"
    );
  }
  return ctx;
}
