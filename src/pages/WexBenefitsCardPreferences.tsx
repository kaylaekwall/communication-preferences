import { ControlCards } from "../components/communication-preferences/ControlCards";
import { NotificationLegalCopy } from "../components/communication-preferences/NotificationLegalCopy";
import {
  FlexibleNotificationRow,
  NotificationTableHeader,
} from "../components/communication-preferences/NotificationTable";
import { PreferenceActions } from "../components/communication-preferences/PreferenceActions";
import { useCommunicationPreferences } from "../context/CommunicationPreferencesContext";

const NOT_AVAILABLE = "not-available" as const;

export function WexBenefitsCardPreferences() {
  const {
    preferences,
    dirty,
    setPreferences,
    setGoPaperless,
    setEnableTexting,
    save,
    cancel,
  } = useCommunicationPreferences();

  const w = preferences.wexBenefitsCard;

  const updateWex = <K extends keyof typeof preferences.wexBenefitsCard>(
    key: K,
    value: (typeof preferences.wexBenefitsCard)[K]
  ) => {
    setPreferences((prev) => ({
      ...prev,
      wexBenefitsCard: { ...prev.wexBenefitsCard, [key]: value },
    }));
  };

  const checkbox = (
    key: keyof typeof preferences.wexBenefitsCard,
    ariaLabel: string
  ) => ({
    checked: w[key] as boolean,
    onChange: (v: boolean) => updateWex(key, v),
    ariaLabel,
  });

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
          <FlexibleNotificationRow
            label="WEX Benefit Card has been mailed"
            paper={NOT_AVAILABLE}
            email={checkbox(
              "cardMailedEmail",
              "WEX Benefit Card has been mailed email notification"
            )}
            text={checkbox(
              "cardMailedText",
              "WEX Benefit Card has been mailed text notification"
            )}
          />

          <FlexibleNotificationRow
            label="WEX Benefit Card follow up notice has been sent"
            description={
              <>
                <p className="mb-0">
                  Automatically alert when a debit card follow up notice has been
                  sent about on of your purchases.
                </p>
                <p>Helps to quickly know when a receipt needs to be supplied.</p>
              </>
            }
            paper={NOT_AVAILABLE}
            email={NOT_AVAILABLE}
            text={checkbox(
              "followUpNoticeText",
              "WEX Benefit Card follow up notice text notification"
            )}
          />

          <FlexibleNotificationRow
            label="WEX Benefit Card purchase has been made"
            description={
              <>
                <p className="mb-0">
                  Automatically alert when a debit card purchase has been made on
                  one of your accounts.
                </p>
                <p>Helps to quickly identify possible fraudulent activity.</p>
              </>
            }
            paper={NOT_AVAILABLE}
            email={checkbox(
              "purchaseMadeEmail",
              "WEX Benefit Card purchase email notification"
            )}
            text={checkbox(
              "purchaseMadeText",
              "WEX Benefit Card purchase text notification"
            )}
          />

          <FlexibleNotificationRow
            label="WEX Benefits Card has been suspended or unsuspended"
            paper={NOT_AVAILABLE}
            email={NOT_AVAILABLE}
            text={checkbox(
              "cardSuspendedText",
              "WEX Benefits Card suspended or unsuspended text notification"
            )}
          />

          <FlexibleNotificationRow
            label="WEX Benefit Card Purse has been suspended or unsuspended"
            paper={NOT_AVAILABLE}
            email={NOT_AVAILABLE}
            text={checkbox(
              "cardPurseSuspendedText",
              "WEX Benefit Card Purse suspended or unsuspended text notification"
            )}
          />
        </div>
      </div>

      <PreferenceActions dirty={dirty} onCancel={cancel} onSave={save} />
    </div>
  );
}
