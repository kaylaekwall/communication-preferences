import { ControlCards } from "../components/communication-preferences/ControlCards";
import { CurrencyInput } from "../components/communication-preferences/CurrencyInput";
import { NotificationLegalCopy } from "../components/communication-preferences/NotificationLegalCopy";
import {
  NotificationRowWithDescription,
  NotificationRowWithInput,
  NotificationTableHeader,
} from "../components/communication-preferences/NotificationTable";
import { PreferenceActions } from "../components/communication-preferences/PreferenceActions";
import { useCommunicationPreferences } from "../context/CommunicationPreferencesContext";

export function PaymentsPreferences() {
  const {
    preferences,
    dirty,
    setPreferences,
    setGoPaperless,
    setEnableTexting,
    save,
    cancel,
  } = useCommunicationPreferences();

  const p = preferences.payments;

  const updatePayments = <K extends keyof typeof preferences.payments>(
    key: K,
    value: (typeof preferences.payments)[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      payments: { ...prev.payments, [key]: value },
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
          <NotificationRowWithDescription
            label="Payment issued out of your HSA"
            description="Automatically emailed based on whether or not you have an email address."
            emailChecked={p.paymentIssuedEmail}
            onEmailChange={(v) => updatePayments("paymentIssuedEmail", v)}
            emailAriaLabel="Payment issued out of your HSA email notification"
          />

          <NotificationRowWithInput
            label="Withdrawal from your HSA exceeds"
            input={
              <CurrencyInput
                value={p.withdrawalExceedsAmount}
                onChange={(v) => updatePayments("withdrawalExceedsAmount", v)}
                aria-label="Withdrawal from HSA exceeds threshold"
              />
            }
            emailChecked={p.withdrawalExceedsEmail}
            onEmailChange={(v) => updatePayments("withdrawalExceedsEmail", v)}
            emailAriaLabel="Withdrawal from your HSA exceeds email notification"
          />
        </div>
      </div>

      <PreferenceActions dirty={dirty} onCancel={cancel} onSave={save} />
    </div>
  );
}
