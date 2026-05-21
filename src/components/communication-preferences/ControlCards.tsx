import { useVariant } from "../../context/VariantContext";
import { Checkbox } from "../Checkbox";

type ControlCardsProps = {
  goPaperless: boolean;
  enableTexting: boolean;
  onGoPaperlessChange: (checked: boolean) => void;
  onEnableTextingChange: (checked: boolean) => void;
};

const cardBaseClassName =
  "flex min-h-[106px] w-full max-w-[339px] flex-1 flex-col rounded-lg border border-slate-15 bg-white p-6 shadow-card text-left";

function ControlCardContent({
  title,
  subtitle,
  titleBold,
  trailing,
}: {
  title: string;
  subtitle?: React.ReactNode;
  titleBold?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p
          className={[
            "text-base leading-6 tracking-[-0.176px] text-label",
            titleBold ? "font-bold" : "font-semibold",
          ].join(" ")}
        >
          {title}
        </p>
        {subtitle && (
          <div className="text-[11px] leading-4 tracking-[0.055px] text-slate-50">
            {subtitle}
          </div>
        )}
      </div>
      {trailing}
    </div>
  );
}

function ControlCard({
  title,
  subtitle,
  titleBold,
}: {
  title: string;
  subtitle?: React.ReactNode;
  titleBold?: boolean;
}) {
  return (
    <div className={cardBaseClassName}>
      <ControlCardContent title={title} subtitle={subtitle} titleBold={titleBold} />
    </div>
  );
}

function ToggleControlCard({
  title,
  subtitle,
  titleBold,
  checked,
  onChange,
  ariaLabel,
}: {
  title: string;
  subtitle?: React.ReactNode;
  titleBold?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      className={[
        cardBaseClassName,
        "cursor-pointer transition-colors hover:border-[#0058a3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0058a3]",
      ].join(" ")}
      aria-pressed={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
    >
      <ControlCardContent
        title={title}
        subtitle={subtitle}
        titleBold={titleBold}
        trailing={<Checkbox checked={checked} displayOnly />}
      />
    </button>
  );
}

function ControlCardsRedesign({
  goPaperless,
  enableTexting,
  onGoPaperlessChange,
  onEnableTextingChange,
}: ControlCardsProps) {
  return (
    <div className="flex flex-wrap gap-6 px-6">
      <ControlCard
        title="Contact info"
        subtitle={
          <>
            <p className="mb-0">123-456-7890</p>
            <p>emily.smith@example.com</p>
          </>
        }
      />
      <ToggleControlCard
        title="Go paperless"
        titleBold
        subtitle="Email communications when available"
        checked={goPaperless}
        ariaLabel="Go paperless"
        onChange={onGoPaperlessChange}
      />
      <ToggleControlCard
        title="Enable texting"
        subtitle="Turn on SMS for all available alerts"
        checked={enableTexting}
        ariaLabel="Enable texting"
        onChange={onEnableTextingChange}
      />
    </div>
  );
}

/** Test A renders header chrome in App shell; only Test B uses control cards. */
export function ControlCards(props: ControlCardsProps) {
  const { variant } = useVariant();
  if (variant === "testA") {
    return null;
  }
  return <ControlCardsRedesign {...props} />;
}
