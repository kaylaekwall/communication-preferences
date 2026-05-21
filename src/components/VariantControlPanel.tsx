import { useState } from "react";
import { ChevronDown, ChevronUp, Keyboard } from "lucide-react";
import {
  useVariant,
  VARIANT_LABELS,
  type UiVariant,
} from "../context/VariantContext";

const VARIANTS: UiVariant[] = ["testA", "testB"];

export function VariantControlPanel() {
  const { variant, setVariant } = useVariant();
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2"
      role="region"
      aria-label="UI version switcher"
    >
      <div
        className={[
          "overflow-hidden rounded-lg border border-border-default bg-white shadow-[0px_4px_12px_rgba(2,13,36,0.15)] transition-all",
          expanded ? "w-[280px]" : "w-auto",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-gray-50"
          aria-expanded={expanded}
          aria-controls="variant-panel-body"
        >
          <span className="text-xs font-medium text-text-secondary">
            Prototype version
          </span>
          <span className="flex items-center gap-2">
            <span className="rounded bg-brand-icon-bg px-2 py-0.5 text-xs font-semibold text-brand-primary">
              {VARIANT_LABELS[variant].short}
            </span>
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-text-secondary" aria-hidden />
            ) : (
              <ChevronUp className="h-4 w-4 text-text-secondary" aria-hidden />
            )}
          </span>
        </button>

        {expanded && (
          <div
            id="variant-panel-body"
            className="border-t border-border-disabled px-3 pb-3 pt-2"
          >
            <fieldset className="m-0 border-0 p-0">
              <legend className="sr-only">Choose UI version</legend>
              <div className="flex flex-col gap-1">
                {VARIANTS.map((v) => (
                  <label
                    key={v}
                    className={[
                      "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                      variant === v
                        ? "bg-brand-icon-bg text-brand-primary"
                        : "text-label hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="ui-variant"
                      value={v}
                      checked={variant === v}
                      onChange={() => setVariant(v)}
                      className="accent-[#0058a3]"
                    />
                    <span>{VARIANT_LABELS[v].title}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-3 flex items-start gap-2 rounded-md bg-page px-2 py-2">
              <Keyboard
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-secondary"
                aria-hidden
              />
              <p className="text-[11px] leading-4 text-text-secondary">
                Press <kbd className="rounded border border-slate-15 bg-white px-1 font-mono text-[10px]">1</kbd>{" "}
                or <kbd className="rounded border border-slate-15 bg-white px-1 font-mono text-[10px]">2</kbd> to
                switch. <kbd className="rounded border border-slate-15 bg-white px-1 font-mono text-[10px]">Alt</kbd>+
                <kbd className="rounded border border-slate-15 bg-white px-1 font-mono text-[10px]">V</kbd> toggles.
                Each version keeps its own tab and preference state.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
