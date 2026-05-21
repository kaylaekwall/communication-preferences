# Communication Preferences B

Prototype implementing the **Consumer Experience Redesign** — Communication Preferences → Statements screen from Figma.

## Design source

- [Consumer Experience Redesign (Figma)](https://www.figma.com/design/hn260IU0WqDWR76GStcB8M/Consumer-Experience-Redesign?node-id=38476-38504)
- Node: `38476:38504` — Test B | statements

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Lucide React icons

## UI variants (Test A / Test B)

Two layouts share the same preference state (go paperless, enable texting, row checkboxes):

| Version | Description |
|---------|-------------|
| **Test B** | Sidebar links per section + three control cards (default) |
| **Test A** | “Preferences & Security” sidebar (Communication Preferences + Login & Security), profile header with inline toggles, horizontal tabs ([Figma](https://www.figma.com/design/hn260IU0WqDWR76GStcB8M/Consumer-Experience-Redesign?node-id=38476-79388)) |

**Switch versions**

- Floating panel bottom-right (“Prototype version”)
- Keyboard: `1` = Test A, `2` = Test B, `Alt+V` = toggle
- Choice is saved in `localStorage`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Features

- My Account shell with top navigation, sidebar, and footer
- **Statements** — statement delivery preferences (Paper / Email / Text)
- **Contributions** — notification preferences with dollar threshold inputs
- **Payments** — payment notification preferences with optional withdrawal threshold
- **WEX Benefits Card** — card alerts with Email and/or Text per notification type
- Shared control cards: Contact info, Go paperless, Enable texting
- Cancel and Save preferences actions per page

## Remote

- [kaylaekwall/communication-preferences-b](https://github.com/kaylaekwall/communication-preferences-b)
