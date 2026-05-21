import { Checkbox } from "../Checkbox";
import { useCommunicationPreferences } from "../../context/CommunicationPreferencesContext";

export function TestACommPrefHeader() {
  const { preferences, setGoPaperless, setEnableTexting } =
    useCommunicationPreferences();

  return (
    <div className="shrink-0 bg-white px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-default pb-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6b7c93] text-lg font-normal tracking-[-0.252px] text-white"
            aria-hidden
          >
            EM
          </div>
          <p className="text-sm leading-6 tracking-[-0.084px] text-text-secondary">
            <span>123-456-7890</span>
            <span className="mx-2 text-slate-50" aria-hidden>
              |
            </span>
            <span>emily.smith@example.com</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-[17px]">
          <div className="flex items-center gap-[7px]">
            <Checkbox
              checked={preferences.goPaperless}
              aria-label="Go paperless"
              onChange={setGoPaperless}
            />
            <button
              type="button"
              className="cursor-pointer text-sm text-label"
              onClick={() => setGoPaperless(!preferences.goPaperless)}
            >
              Go paperless
            </button>
          </div>
          <div className="flex items-center gap-[7px]">
            <Checkbox
              checked={preferences.enableTexting}
              aria-label="Enable texting"
              onChange={setEnableTexting}
            />
            <button
              type="button"
              className="cursor-pointer text-sm text-label"
              onClick={() => setEnableTexting(!preferences.enableTexting)}
            >
              Enable texting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
