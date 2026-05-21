import type { CommPrefPage } from "../AccountSidebar";

const TABS: { id: CommPrefPage; label: string }[] = [
  { id: "statements", label: "Statements" },
  { id: "contributions", label: "Contributions" },
  { id: "payments", label: "Payments" },
  { id: "wex-benefits-card", label: "WEX Benefits Card" },
];

type TestACommPreferencesTabsProps = {
  activePage: CommPrefPage;
  onNavigate: (page: CommPrefPage) => void;
};

export function TestACommPreferencesTabs({
  activePage,
  onNavigate,
}: TestACommPreferencesTabsProps) {
  return (
    <div
      className="flex w-full shrink-0 border-b border-border-default bg-white pr-9"
      role="tablist"
      aria-label="Communication preference sections"
    >
      {TABS.map((tab) => {
        const active = tab.id === activePage;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onNavigate(tab.id)}
            className={[
              "border-b px-[15.75px] pb-[15px] pt-[14px] text-sm transition-colors",
              active
                ? "border-brand-primary font-bold text-brand-primary"
                : "border-border-default font-normal text-slate-50 hover:text-label",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
