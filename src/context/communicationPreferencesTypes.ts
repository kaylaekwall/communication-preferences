export type StatementRow = {
  id: string;
  title: string;
  description?: string;
  feeNote?: string;
  textAvailable: boolean;
  channels: { paper: boolean; email: boolean; text: boolean };
};

export type CommunicationPreferencesState = {
  goPaperless: boolean;
  enableTexting: boolean;
  statements: {
    rows: StatementRow[];
  };
  contributions: {
    contributionPostedEmail: boolean;
    balanceBelowEmail: boolean;
    contributionsWithinEmail: boolean;
    balanceBelowAmount: string;
    contributionsWithinAmount: string;
  };
  payments: {
    paymentIssuedEmail: boolean;
    withdrawalExceedsEmail: boolean;
    withdrawalExceedsAmount: string;
  };
  wexBenefitsCard: {
    cardMailedEmail: boolean;
    cardMailedText: boolean;
    followUpNoticeText: boolean;
    purchaseMadeEmail: boolean;
    purchaseMadeText: boolean;
    cardSuspendedText: boolean;
    cardPurseSuspendedText: boolean;
  };
};

const INITIAL_STATEMENT_ROWS: StatementRow[] = [
  {
    id: "hsa-summary",
    title: "HSA Account Summary",
    feeNote: "$1.50 fee per printed summary",
    description:
      "Automatically emailed based on whether or not you have an email address.",
    textAvailable: false,
    channels: { paper: false, email: true, text: false },
  },
  {
    id: "hsa-tax",
    title: "HSA Tax Documents",
    description:
      "Automatically emailed based on whether or not you have an email address.",
    textAvailable: false,
    channels: { paper: false, email: true, text: false },
  },
];

export type StatementDeliveryChannel = "paper" | "email" | "text";

/** Update a statement row channel; checking paper while go paperless is on clears that global flag. */
export function updateStatementChannel(
  state: CommunicationPreferencesState,
  id: string,
  channel: StatementDeliveryChannel,
  value: boolean
): CommunicationPreferencesState {
  const next: CommunicationPreferencesState = {
    ...state,
    statements: {
      rows: state.statements.rows.map((row) =>
        row.id === id
          ? { ...row, channels: { ...row.channels, [channel]: value } }
          : row
      ),
    },
  };
  if (channel === "paper" && value && state.goPaperless) {
    return { ...next, goPaperless: false };
  }
  return next;
}

export function createInitialPreferences(): CommunicationPreferencesState {
  return {
    goPaperless: false,
    enableTexting: false,
    statements: { rows: INITIAL_STATEMENT_ROWS.map((r) => ({ ...r, channels: { ...r.channels } })) },
    contributions: {
      contributionPostedEmail: false,
      balanceBelowEmail: false,
      contributionsWithinEmail: false,
      balanceBelowAmount: "",
      contributionsWithinAmount: "",
    },
    payments: {
      paymentIssuedEmail: false,
      withdrawalExceedsEmail: false,
      withdrawalExceedsAmount: "",
    },
    wexBenefitsCard: {
      cardMailedEmail: false,
      cardMailedText: false,
      followUpNoticeText: false,
      purchaseMadeEmail: false,
      purchaseMadeText: false,
      cardSuspendedText: false,
      cardPurseSuspendedText: false,
    },
  };
}

/** When go paperless is on: all available email on, all available paper off. */
export function applyGoPaperless(
  state: CommunicationPreferencesState
): CommunicationPreferencesState {
  return {
    ...state,
    goPaperless: true,
    statements: {
      rows: state.statements.rows.map((row) => ({
        ...row,
        channels: {
          paper: false,
          email: true,
          text: row.textAvailable ? true : row.channels.text,
        },
      })),
    },
    contributions: {
      ...state.contributions,
      contributionPostedEmail: true,
      balanceBelowEmail: true,
      contributionsWithinEmail: true,
    },
    payments: {
      ...state.payments,
      paymentIssuedEmail: true,
      withdrawalExceedsEmail: true,
    },
    wexBenefitsCard: {
      ...state.wexBenefitsCard,
      cardMailedEmail: true,
      purchaseMadeEmail: true,
    },
  };
}

/** When enable texting is on: all available text alerts on. */
export function applyEnableTexting(
  state: CommunicationPreferencesState
): CommunicationPreferencesState {
  return {
    ...state,
    enableTexting: true,
    statements: {
      rows: state.statements.rows.map((row) =>
        row.textAvailable
          ? {
              ...row,
              channels: { ...row.channels, text: true },
            }
          : row
      ),
    },
    wexBenefitsCard: {
      ...state.wexBenefitsCard,
      cardMailedText: true,
      followUpNoticeText: true,
      purchaseMadeText: true,
      cardSuspendedText: true,
      cardPurseSuspendedText: true,
    },
  };
}

/** When go paperless is off: clear paper and email selections that bulk mode set. */
export function applyDisableGoPaperless(
  state: CommunicationPreferencesState
): CommunicationPreferencesState {
  return {
    ...state,
    goPaperless: false,
    statements: {
      rows: state.statements.rows.map((row) => ({
        ...row,
        channels: { paper: false, email: false, text: row.channels.text },
      })),
    },
    contributions: {
      ...state.contributions,
      contributionPostedEmail: false,
      balanceBelowEmail: false,
      contributionsWithinEmail: false,
    },
    payments: {
      ...state.payments,
      paymentIssuedEmail: false,
      withdrawalExceedsEmail: false,
    },
    wexBenefitsCard: {
      ...state.wexBenefitsCard,
      cardMailedEmail: false,
      purchaseMadeEmail: false,
    },
  };
}

/** When enable texting is off: clear all text alert checkboxes. */
export function applyDisableEnableTexting(
  state: CommunicationPreferencesState
): CommunicationPreferencesState {
  return {
    ...state,
    enableTexting: false,
    statements: {
      rows: state.statements.rows.map((row) =>
        row.textAvailable
          ? { ...row, channels: { ...row.channels, text: false } }
          : row
      ),
    },
    wexBenefitsCard: {
      ...state.wexBenefitsCard,
      cardMailedText: false,
      followUpNoticeText: false,
      purchaseMadeText: false,
      cardSuspendedText: false,
      cardPurseSuspendedText: false,
    },
  };
}
