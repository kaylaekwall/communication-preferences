type CurrencyInputProps = {
  value: string;
  onChange: (value: string) => void;
  "aria-label": string;
};

export function CurrencyInput({
  value,
  onChange,
  "aria-label": ariaLabel,
}: CurrencyInputProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-md border border-[#a5aeb4] shadow-[0px_1px_2px_rgba(18,18,23,0.05)]">
      <div className="flex min-w-[35px] items-center justify-center border-r border-[#a5aeb4] bg-white px-2 py-2 text-sm text-[#a5aeb4]">
        $
      </div>
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="min-w-[80px] w-20 border-0 bg-white px-3 py-2 text-sm text-label focus:outline-none focus:ring-0"
      />
    </div>
  );
}
