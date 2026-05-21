import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CreditCard,
  FileSpreadsheet,
  Heart,
  Landmark,
  Lock,
  Plus,
  ShieldCheck,
  UserRound,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useVariant, type UiVariant } from "../context/VariantContext";

export type CommPrefPage =
  | "statements"
  | "contributions"
  | "payments"
  | "wex-benefits-card";

export const COMM_PREF_PAGES: CommPrefPage[] = [
  "statements",
  "contributions",
  "payments",
  "wex-benefits-card",
];

export function isCommPrefPage(page: CommPrefPage): boolean {
  return COMM_PREF_PAGES.includes(page);
}

type MenuItem = {
  label: string;
  icon: LucideIcon;
  page?: CommPrefPage;
  /** Test A: single entry for all comm pref sections */
  commPrefHub?: boolean;
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const TEST_B_COMM_ITEMS: MenuItem[] = [
  { label: "Statements", icon: FileSpreadsheet, page: "statements" },
  { label: "Contributions", icon: Plus, page: "contributions" },
  { label: "Payments", icon: Wallet, page: "payments" },
  { label: "WEX Benefits Card", icon: CreditCard, page: "wex-benefits-card" },
];

function buildMenu(variant: UiVariant): MenuSection[] {
  if (variant === "testA") {
    return [
      {
        title: "ACCOUNT",
        items: [
          { label: "My Profile", icon: UserRound },
          { label: "Dependents", icon: UsersRound },
          { label: "Beneficiaries", icon: Heart },
          { label: "Authorized Signers", icon: ShieldCheck },
        ],
      },
      {
        title: "PAYMENTS",
        items: [
          { label: "Bank Accounts", icon: Landmark },
          { label: "Debit Card", icon: CreditCard },
        ],
      },
      {
        title: "PREFERENCES & SECURITY",
        items: [
          { label: "Login & Security", icon: Lock },
          {
            label: "Communication Preferences",
            icon: Bell,
            page: "statements",
            commPrefHub: true,
          },
        ],
      },
    ];
  }

  return [
    {
      title: "ACCOUNT",
      items: [
        { label: "My Profile", icon: UserRound },
        { label: "Dependents", icon: UsersRound },
        { label: "Beneficiaries", icon: Heart },
        { label: "Authorized Signers", icon: ShieldCheck },
      ],
    },
    {
      title: "PAYMENTS",
      items: [
        { label: "Bank Accounts", icon: Landmark },
        { label: "Debit Card", icon: CreditCard },
      ],
    },
    {
      title: "SECURITY",
      items: [{ label: "Login & Security", icon: Lock }],
    },
    {
      title: "COMMUNICATION PREFERENCES",
      items: TEST_B_COMM_ITEMS,
    },
  ];
}

type AccountSidebarProps = {
  activePage: CommPrefPage;
  onNavigate: (page: CommPrefPage) => void;
};

function SidebarItem({
  item,
  active,
  onClick,
}: {
  item: MenuItem;
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex w-full items-center gap-[7px] rounded px-[10.5px] py-[7px] text-left text-sm",
        active
          ? "bg-brand-icon-bg text-brand-primary"
          : "text-label hover:bg-gray-50",
      ].join(" ")}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="leading-none">{item.label}</span>
    </button>
  );
}

function isItemActive(item: MenuItem, activePage: CommPrefPage): boolean {
  if (item.commPrefHub) {
    return isCommPrefPage(activePage);
  }
  return item.page === activePage;
}

export function AccountSidebar({ activePage, onNavigate }: AccountSidebarProps) {
  const { variant } = useVariant();
  const menu = buildMenu(variant);

  return (
    <aside className="w-[264px] shrink-0 rounded-bl-2xl rounded-tl-2xl border border-border-default bg-white p-4">
      <nav className="flex flex-col gap-4">
        {menu.map((section, sectionIndex) => (
          <div key={section.title}>
            {sectionIndex > 0 && (
              <hr className="mb-4 border-0 border-t border-border-disabled" />
            )}
            <p className="mb-3 text-[13px] text-text-secondary">{section.title}</p>
            <div className="flex flex-col gap-2">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.label}
                  item={item}
                  active={isItemActive(item, activePage)}
                  onClick={
                    item.page ? () => onNavigate(item.page!) : undefined
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
