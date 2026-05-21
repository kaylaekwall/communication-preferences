import {
  ChevronDown,
  FileText,
  Globe,
  Home,
  Mail,
  Receipt,
  Wallet,
} from "lucide-react";

function NavItem({
  icon: Icon,
  label,
  badge,
  showChevron,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
  showChevron?: boolean;
}) {
  return (
    <button
      type="button"
      className="relative flex items-center gap-2 rounded p-2 text-sm font-medium text-text-primary hover:bg-gray-50"
    >
      <Icon className="h-4 w-4" />
      <span className="tracking-[-0.084px]">{label}</span>
      {showChevron && <ChevronDown className="h-4 w-4" />}
      {badge != null && (
        <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-2xl border-2 border-white bg-[#c8102e] px-1.5 text-[9px] font-semibold leading-4 tracking-[0.144px] text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

function NavDivider() {
  return <div className="mx-1 h-10 w-px bg-border-disabled" />;
}

export function TopNavigation() {
  return (
    <header className="sticky top-0 z-10 border-b border-border-default bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-16 px-8 py-4">
        <div className="flex items-center gap-6">
          <span className="text-[28px] font-bold leading-none tracking-tight text-wex-red">
            wex
          </span>
        </div>

        <nav className="flex flex-1 items-center gap-1">
          <NavItem icon={Home} label="Home" />
          <NavItem icon={Wallet} label="Accounts" showChevron />
          <NavItem icon={Receipt} label="Claims" />
          <NavItem icon={FileText} label="Resources" />
        </nav>

        <div className="flex items-center">
          <button
            type="button"
            className="rounded p-2 text-text-primary hover:bg-gray-50"
            aria-label="Language"
          >
            <Globe className="h-4 w-4" />
          </button>
          <NavDivider />
          <NavItem icon={Mail} label="Messages" badge={8} />
          <NavDivider />
          <div
            className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#e3e7f4] bg-[#f1f3fb] text-base text-text-secondary"
            aria-label="User avatar AV"
          >
            AV
          </div>
        </div>
      </div>
    </header>
  );
}
