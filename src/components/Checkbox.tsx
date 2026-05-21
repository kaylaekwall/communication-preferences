type CheckboxProps = {
  checked?: boolean;
  disabled?: boolean;
  /** Visual-only; parent control owns click and accessibility. */
  displayOnly?: boolean;
  onChange?: (checked: boolean) => void;
  "aria-label"?: string;
};

function CheckIcon() {
  return (
    <svg
      width="12.25"
      height="12.25"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M2.5 6.25L5.1 8.85L9.5 3.5"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function checkboxClassName(isChecked: boolean, disabled: boolean) {
  return [
    "flex size-[17.5px] shrink-0 items-center justify-center rounded-[4px] border border-solid p-px transition-colors",
    disabled
      ? "cursor-not-allowed border-[#a5aeb4] bg-[#edeff0] opacity-60"
      : "cursor-pointer",
    !disabled && !isChecked && "border-[#a5aeb4] bg-white hover:border-[#0058a3]",
    isChecked && "border-[#0058a3] bg-[#0058a3]",
  ]
    .filter(Boolean)
    .join(" ");
}

export function Checkbox({
  checked = false,
  disabled = false,
  displayOnly = false,
  onChange,
  "aria-label": ariaLabel,
}: CheckboxProps) {
  const isChecked = checked && !disabled;

  if (displayOnly) {
    return (
      <span className={checkboxClassName(isChecked, disabled)} aria-hidden>
        {isChecked && <CheckIcon />}
      </span>
    );
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) onChange?.(!checked);
      }}
      className={checkboxClassName(isChecked, disabled)}
    >
      {isChecked && <CheckIcon />}
    </button>
  );
}
