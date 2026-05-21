type NotificationLegalCopyProps = {
  variant: "statements" | "notifications";
};

export function NotificationLegalCopy({ variant }: NotificationLegalCopyProps) {
  const intro =
    variant === "statements" ? (
      <>
        Set how you want to receive your account documents. Select either Paper,
        Email, and/or Text for each statement type. Standard text message rates
        may apply. Disable text alerts by unchecking the boxes below. By opting
        into our text alerts, you agree to our{" "}
      </>
    ) : (
      <>
        Manage how you receive real-time alerts for account activity. You can
        enable Email and/or Text for each notification. Standard text message
        rates may apply. Disable text alerts by unchecking the boxes below. By
        opting into our text alerts, you agree to our{" "}
      </>
    );

  return (
    <p className="mt-2 max-w-[1069px] text-sm leading-6 tracking-[-0.084px] text-slate-70">
      {intro}
      <a href="#terms" className="text-link hover:underline">
        terms of service
      </a>
      . Please review our{" "}
      <a href="#privacy" className="text-link hover:underline">
        privacy policy
      </a>{" "}
      for more information.
    </p>
  );
}
