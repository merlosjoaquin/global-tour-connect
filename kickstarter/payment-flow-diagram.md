# Global Tour — Flow Diagrams

This document contains the core flows of Global Tour in Mermaid syntax. Render on [mermaid.live](https://mermaid.live), GitHub, or with the VS Code Mermaid extension.

---

## 1. User Journey (Discovery to Payout)

```mermaid
flowchart TD
    A[Tourist opens app] --> B[Browse hosts by city & interest]
    B --> C[View host profile & reviews]
    C --> D{Book a tour?}
    D -->|No| B
    D -->|Yes| E[Select time slot]
    E --> F[See price in tourist's currency]
    F --> G[Confirm booking & pay]
    G --> H[Funds authorized & moved to escrow]
    H --> I[Host receives booking notification]
    I --> J[Tour day: tourist meets host]
    J --> K[Tour happens]
    K --> L{Both confirm completion?}
    L -->|Yes| M[Escrow releases to host]
    L -->|Dispute| N[Dispute resolution flow]
    N --> O{Resolution}
    O -->|Host wins| M
    O -->|Tourist wins| P[Refund to tourist]
    M --> Q[Host receives payout in their currency]
    Q --> R[Platform fee 2% settled to USDT treasury]
```

---

## 2. Payment Flow (Sequence Diagram)

```mermaid
sequenceDiagram
    actor Tourist
    participant App as Global Tour App
    participant Stripe as Stripe Connect
    participant Escrow as Escrow Ledger
    participant Treasury as USDT Treasury
    actor Host

    Tourist->>App: Select tour & confirm booking
    App->>Stripe: Create PaymentIntent (tourist currency)
    Stripe-->>Tourist: 3DS / card auth challenge
    Tourist-->>Stripe: Auth success
    Stripe-->>App: PaymentIntent authorized
    App->>Escrow: Mark funds HELD (bookingId, amount)
    App-->>Tourist: Booking confirmed
    App-->>Host: New booking notification

    Note over Tourist,Host: Tour day — experience happens

    Tourist->>App: Confirm tour completed
    Host->>App: Confirm tour completed
    App->>Escrow: Release funds (bookingId)
    Escrow->>Stripe: Transfer to host connected account (98%)
    Stripe-->>Host: Payout in host currency
    Escrow->>Treasury: Settle platform fee 2% to USDT
    App-->>Tourist: Receipt sent
    App-->>Host: Payout confirmation sent
```

---

## 3. Currency Conversion Flow

```mermaid
flowchart LR
    A[Host sets price<br/>e.g. ARS 25,000] --> B[FX rate service]
    B --> C[Store canonical price<br/>in USD]
    C --> D{Who is viewing?}
    D -->|Tourist from DE| E[Display EUR]
    D -->|Tourist from US| F[Display USD]
    D -->|Tourist from JP| G[Display JPY]
    D -->|Host dashboard| H[Display ARS<br/>host native]
    E --> I[Tourist pays in EUR]
    F --> J[Tourist pays in USD]
    G --> K[Tourist pays in JPY]
    I --> L[Convert at booking time<br/>lock rate for 15 min]
    J --> L
    K --> L
    L --> M[Settle to host in ARS<br/>minus 2% fee in USDT]
```

---

## 4. Escrow State Machine

```mermaid
stateDiagram-v2
    [*] --> AUTHORIZED: Tourist confirms booking
    AUTHORIZED --> HELD: Payment captured
    AUTHORIZED --> CANCELLED: Tourist cancels<br/>before capture
    HELD --> RELEASED: Both parties confirm<br/>tour completed
    HELD --> DISPUTED: Either party opens dispute
    HELD --> REFUNDED: Tourist cancels<br/>within refund window
    DISPUTED --> RELEASED: Resolution favors host
    DISPUTED --> REFUNDED: Resolution favors tourist
    DISPUTED --> SPLIT: Partial resolution
    RELEASED --> [*]: Payout complete
    REFUNDED --> [*]: Refund complete
    SPLIT --> [*]: Both parties paid
    CANCELLED --> [*]
```

---

## Notes on rendering

- All diagrams use standard Mermaid 10+ syntax
- State diagram uses `stateDiagram-v2` (required for nested states and notes)
- Sequence diagram uses `actor` keyword for human participants
- For exporting as PNG/SVG: use [mermaid.live](https://mermaid.live) → Actions → Download
