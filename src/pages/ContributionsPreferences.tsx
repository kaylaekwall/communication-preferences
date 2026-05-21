import { ControlCards } from "../components/communication-preferences/ControlCards";
import { CurrencyInput } from "../components/communication-preferences/CurrencyInput";
import { NotificationLegalCopy } from "../components/communication-preferences/NotificationLegalCopy";
import {
  NotificationRow,
  NotificationRowWithInput,
  NotificationTableHeader,
} from "../components/communication-preferences/NotificationTable";
import { PreferenceActions } from "../components/communication-preferences/PreferenceActions";
import { useCommunicationPreferences } from "../context/CommunicationPreferencesContext";

export function ContributionsPreferences() {
  const {
    preferences,
    dirty,
    setPreferences,
    setGoPaperless,
    setEnableTexting,
    save,
    cancel,
  } = useCommunicationPreferences();

  const c = preferences.contributions;

  const updateContributions = <
    K extends keyof typeof preferences.contributions,
  >(
    key: K,
    value: (typeof preferences.contributions)[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      contributions: { ...prev.contributions, [key]: value },
    }));
  };

  return (
    <div className="flex flex-1 flex-col gap-6 py-6">
      <ControlCards
        goPaperless={preferences.goPaperless}
        enableTexting={preferences.enableTexting}
        onGoPaperlessChange={setGoPaperless}
        onEnableTextingChange={setEnableTexting}
      />

      <div className="flex flex-col gap-6">
        <div className="px-6">
          <h2 className="text-xl font-bold leading-8 tracking-[-0.34px] text-label">
            Notification preferences
          </h2>
          <NotificationLegalCopy variant="notifications" />
        </div>

        <NotificationTableHeader firstColumnLabel="Notification type" />

        <div className="border-t border-border-default">
          <NotificationRow
            label="Contribution posted to your HSA"
            emailChecked={c.contributionPostedEmail}
            onEmailChange={(v) => updateContributions("contributionPostedEmail", v)}
            emailAriaLabel="Contribution posted to your HSA email notification"
          />

          <NotificationRowWithInput
            label="HSA available cash balance is below"
            input={
              <CurrencyInput
                value={c.balanceBelowAmount}
                onChange={(v) => updateContributions("balanceBelowAmount", v)}
                aria-label="HSA available cash balance threshold"
              />
            }
            emailChecked={c.balanceBelowEmail}
            onEmailChange={(v) => updateContributions("balanceBelowEmail", v)}
            emailAriaLabel="HSA available cash balance below email notification"
          />

          <NotificationRowWithInput
            label={<span>HSA contributions year-to-date are within</span>}
            input={
              <>
                <CurrencyInput
                  value={c.contributionsWithinAmount}
                  onChange={(v) =>
                    updateContributions("contributionsWithinAmount", v)
                  }
                  aria-label="HSA contributions year-to-date threshold"
                />
                <span>of the IRS maximum</span>
              </>
            }
            emailChecked={c.contributionsWithinEmail}
            onEmailChange={(v) => updateContributions("contributionsWithinEmail", v)}
            emailAriaLabel="HSA contributions within IRS maximum email notification"
          />
        </div>
      </div>

      <PreferenceActions dirty={dirty} onCancel={cancel} onSave={save} />
    </div>
  );
}
