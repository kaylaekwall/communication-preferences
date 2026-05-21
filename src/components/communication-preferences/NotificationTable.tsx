import { Checkbox } from "../Checkbox";

export function NotificationTableHeader({
  firstColumnLabel,
}: {
  firstColumnLabel: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_120px_120px_120px] items-center gap-4 px-6">
      <span className="text-lg font-medium leading-6 tracking-[-0.252px] text-label">
        {firstColumnLabel}
      </span>
      <span className="text-center text-lg font-medium leading-6 tracking-[-0.252px] text-label">
        Paper
      </span>
      <span className="text-center text-lg font-medium leading-6 tracking-[-0.252px] text-label">
        Email
      </span>
      <span className="text-center text-lg font-medium leading-6 tracking-[-0.252px] text-label">
        Text
      </span>
    </div>
  );
}

export function NotAvailable() {
  return (
    <span className="text-xs leading-6 text-black">Not available</span>
  );
}

type NotificationRowProps = {
  label: React.ReactNode;
  emailChecked: boolean;
  onEmailChange: (checked: boolean) => void;
  emailAriaLabel: string;
};

export function NotificationRow({
  label,
  emailChecked,
  onEmailChange,
  emailAriaLabel,
}: NotificationRowProps) {
  return (
    <div className="grid min-h-[90px] grid-cols-[1fr_120px_120px_120px] items-center gap-4 border-t border-border-default px-6 py-4">
      <div className="text-sm font-medium leading-6 tracking-[-0.084px] text-black">
        {label}
      </div>
      <div className="flex justify-center">
        <NotAvailable />
      </div>
      <div className="flex justify-center">
        <Checkbox
          checked={emailChecked}
          aria-label={emailAriaLabel}
          onChange={onEmailChange}
        />
      </div>
      <div className="flex justify-center">
        <NotAvailable />
      </div>
    </div>
  );
}

type NotificationRowWithDescriptionProps = NotificationRowProps & {
  description: string;
};

export function NotificationRowWithDescription({
  label,
  description,
  emailChecked,
  onEmailChange,
  emailAriaLabel,
}: NotificationRowWithDescriptionProps) {
  return (
    <div className="grid min-h-[90px] grid-cols-[1fr_120px_120px_120px] items-center gap-4 border-t border-border-default px-6 py-4">
      <div className="flex flex-col gap-1 text-sm leading-6 tracking-[-0.084px]">
        <p className="font-medium text-black">{label}</p>
        <p className="text-slate-70">{description}</p>
      </div>
      <div className="flex justify-center">
        <NotAvailable />
      </div>
      <div className="flex justify-center">
        <Checkbox
          checked={emailChecked}
          aria-label={emailAriaLabel}
          onChange={onEmailChange}
        />
      </div>
      <div className="flex justify-center">
        <NotAvailable />
      </div>
    </div>
  );
}

type NotificationRowWithInputProps = NotificationRowProps & {
  input: React.ReactNode;
};

export function NotificationRowWithInput({
  label,
  input,
  emailChecked,
  onEmailChange,
  emailAriaLabel,
}: NotificationRowWithInputProps) {
  return (
    <div className="grid min-h-[90px] grid-cols-[1fr_120px_120px_120px] items-center gap-4 border-t border-border-default px-6 py-4">
      <div className="flex flex-wrap items-center gap-2 text-sm font-medium leading-6 tracking-[-0.084px] text-black">
        {label}
        {input}
      </div>
      <div className="flex justify-center">
        <NotAvailable />
      </div>
      <div className="flex justify-center">
        <Checkbox
          checked={emailChecked}
          aria-label={emailAriaLabel}
          onChange={onEmailChange}
        />
      </div>
      <div className="flex justify-center">
        <NotAvailable />
      </div>
    </div>
  );
}

type ChannelConfig =
  | "not-available"
  | {
      checked: boolean;
      onChange: (checked: boolean) => void;
      ariaLabel: string;
    };

function ChannelCell({ config }: { config: ChannelConfig }) {
  if (config === "not-available") {
    return <NotAvailable />;
  }
  return (
    <Checkbox
      checked={config.checked}
      aria-label={config.ariaLabel}
      onChange={config.onChange}
    />
  );
}

type FlexibleNotificationRowProps = {
  label: string;
  description?: React.ReactNode;
  paper: ChannelConfig;
  email: ChannelConfig;
  text: ChannelConfig;
};

export function FlexibleNotificationRow({
  label,
  description,
  paper,
  email,
  text,
}: FlexibleNotificationRowProps) {
  return (
    <div className="grid min-h-[90px] grid-cols-[1fr_120px_120px_120px] items-center gap-4 border-t border-border-default px-6 py-4">
      <div className="flex flex-col gap-1 text-sm leading-6 tracking-[-0.084px]">
        <p className="font-medium text-black">{label}</p>
        {description && (
          <div className="text-slate-70 leading-[19px]">{description}</div>
        )}
      </div>
      <div className="flex justify-center">
        <ChannelCell config={paper} />
      </div>
      <div className="flex justify-center">
        <ChannelCell config={email} />
      </div>
      <div className="flex justify-center">
        <ChannelCell config={text} />
      </div>
    </div>
  );
}
