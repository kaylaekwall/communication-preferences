import { Checkbox } from "../components/Checkbox";
import { ControlCards } from "../components/communication-preferences/ControlCards";
import { NotificationLegalCopy } from "../components/communication-preferences/NotificationLegalCopy";
import {
  NotificationTableHeader,
  NotAvailable,
} from "../components/communication-preferences/NotificationTable";
import { PreferenceActions } from "../components/communication-preferences/PreferenceActions";
import { useCommunicationPreferences } from "../context/CommunicationPreferencesContext";
import {
  updateStatementChannel,
  type StatementDeliveryChannel,
  type StatementRow,
} from "../context/communicationPreferencesTypes";

function StatementRow({
  row,
  onToggle,
}: {
  row: StatementRow;
  onToggle: (id: string, channel: StatementDeliveryChannel, value: boolean) => void;
}) {
  return (
    <div className="grid min-h-[90px] grid-cols-[1fr_120px_120px_120px] items-center gap-4 border-t border-border-default px-6 py-4">
      <div className="flex flex-col gap-1 text-sm leading-6 tracking-[-0.084px]">
        <p className="font-medium text-black">{row.title}</p>
        {row.feeNote && (
          <p className="italic text-slate-70">{row.feeNote}</p>
        )}
        {row.description && (
          <p className="text-slate-70">{row.description}</p>
        )}
      </div>
      <div className="flex justify-center">
        <Checkbox
          checked={row.channels.paper}
          aria-label={`${row.title} paper delivery`}
          onChange={(v) => onToggle(row.id, "paper", v)}
        />
      </div>
      <div className="flex justify-center">
        <Checkbox
          checked={row.channels.email}
          aria-label={`${row.title} email delivery`}
          onChange={(v) => onToggle(row.id, "email", v)}
        />
      </div>
      <div className="flex justify-center">
        {row.textAvailable ? (
          <Checkbox
            checked={row.channels.text}
            aria-label={`${row.title} text delivery`}
            onChange={(v) => onToggle(row.id, "text", v)}
          />
        ) : (
          <NotAvailable />
        )}
      </div>
    </div>
  );
}

export function StatementsPreferences() {
  const {
    preferences,
    dirty,
    setPreferences,
    setGoPaperless,
    setEnableTexting,
    save,
    cancel,
  } = useCommunicationPreferences();

  const { rows } = preferences.statements;

  const toggleChannel = (
    id: string,
    channel: StatementDeliveryChannel,
    value: boolean
  ) => {
    setPreferences((prev) => updateStatementChannel(prev, id, channel, value));
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
            Statement delivery preferences
          </h2>
          <NotificationLegalCopy variant="statements" />
        </div>

        <NotificationTableHeader firstColumnLabel="Statements" />

        <div className="border-t border-border-default">
          {rows.map((row) => (
            <StatementRow key={row.id} row={row} onToggle={toggleChannel} />
          ))}
        </div>
      </div>

      <PreferenceActions dirty={dirty} onCancel={cancel} onSave={save} />
    </div>
  );
}
