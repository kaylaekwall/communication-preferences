import { useState } from "react";
import {
  AccountSidebar,
  type CommPrefPage,
} from "./components/AccountSidebar";
import { TestACommPrefHeader } from "./components/test-a/TestACommPrefHeader";
import { TestACommPreferencesTabs } from "./components/test-a/TestACommPreferencesTabs";
import { Footer } from "./components/Footer";
import { TopNavigation } from "./components/TopNavigation";
import { VariantControlPanel } from "./components/VariantControlPanel";
import { CommunicationPreferencesProvider } from "./context/CommunicationPreferencesContext";
import { VariantProvider, useVariant, type UiVariant } from "./context/VariantContext";
import { useVariantKeyboard } from "./hooks/useVariantKeyboard";
import { ContributionsPreferences } from "./pages/ContributionsPreferences";
import { PaymentsPreferences } from "./pages/PaymentsPreferences";
import { StatementsPreferences } from "./pages/StatementsPreferences";
import { WexBenefitsCardPreferences } from "./pages/WexBenefitsCardPreferences";

const PAGE_TITLES: Record<CommPrefPage, string> = {
  statements: "Statements",
  contributions: "Contributions",
  payments: "Payments",
  "wex-benefits-card": "WEX Benefits Card",
};

function MainContent({ page }: { page: CommPrefPage }) {
  switch (page) {
    case "statements":
      return <StatementsPreferences />;
    case "contributions":
      return <ContributionsPreferences />;
    case "payments":
      return <PaymentsPreferences />;
    case "wex-benefits-card":
      return <WexBenefitsCardPreferences />;
  }
}

const INITIAL_PAGE_BY_VARIANT: Record<UiVariant, CommPrefPage> = {
  testA: "statements",
  testB: "statements",
};

function AppShell() {
  const [pageByVariant, setPageByVariant] = useState(INITIAL_PAGE_BY_VARIANT);
  const { variant, setVariant, cycleVariant } = useVariant();
  const activePage = pageByVariant[variant];

  const setActivePage = (page: CommPrefPage) => {
    setPageByVariant((prev) => ({ ...prev, [variant]: page }));
  };

  useVariantKeyboard({ setVariant, cycleVariant });

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <TopNavigation />

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 pb-8 pt-8">
        <h1 className="mb-8 text-[30px] font-bold leading-10 tracking-[-0.63px] text-black">
          My Account
        </h1>

        <div className="flex overflow-hidden rounded-2xl">
          <AccountSidebar
            activePage={activePage}
            onNavigate={setActivePage}
          />
          <section
            className="flex min-h-[681px] flex-1 flex-col overflow-hidden rounded-br-2xl rounded-tr-2xl border border-l-0 border-border-default bg-white"
            aria-label={PAGE_TITLES[activePage]}
          >
            {variant === "testA" ? (
              <>
                <TestACommPrefHeader />
                <TestACommPreferencesTabs
                  activePage={activePage}
                  onNavigate={setActivePage}
                />
                <div className="flex flex-1 flex-col overflow-auto">
                  <MainContent page={activePage} />
                </div>
              </>
            ) : (
              <MainContent page={activePage} />
            )}
          </section>
        </div>
      </main>

      <Footer />
      <VariantControlPanel />
    </div>
  );
}

export default function App() {
  return (
    <VariantProvider>
      <CommunicationPreferencesProvider>
        <AppShell />
      </CommunicationPreferencesProvider>
    </VariantProvider>
  );
}
