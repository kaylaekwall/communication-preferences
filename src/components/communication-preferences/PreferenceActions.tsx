type PreferenceActionsProps = {
  dirty: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export function PreferenceActions({
  dirty,
  onCancel,
  onSave,
}: PreferenceActionsProps) {
  return (
    <div className="flex justify-end gap-5 px-6 pb-2 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md border border-[#f7f7f7] bg-slate-15 px-[11.5px] py-2 text-sm font-medium text-slate-50 hover:bg-[#e4e6e9]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={!dirty}
        className="rounded-md border border-brand-primary bg-brand-primary px-[11.5px] py-2 text-sm font-medium text-white hover:bg-[#2f4ab0] disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save preferences
      </button>
    </div>
  );
}
