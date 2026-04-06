# Global Tour — Kickstarter Campaign Assets

This folder contains the planning and narrative assets for the Global Tour Kickstarter campaign.

## Contents

| File | Purpose |
|------|---------|
| `pitch-deck.md` | Full 13-section pitch deck in Markdown. Source of truth for the campaign narrative. |
| `payment-flow-diagram.md` | Four Mermaid diagrams covering user journey, payment flow, currency conversion, and escrow state machine. |
| `README.md` | This file. |

---

## How to use the pitch deck

### Option A — Convert to PDF with pandoc

```bash
pandoc pitch-deck.md -o pitch-deck.pdf --pdf-engine=xelatex -V geometry:margin=1in
```

Requires pandoc + a TeX distribution (MikTeX on Windows, TeX Live on Linux/macOS).

### Option B — Convert to slides with Marp

1. Install Marp CLI: `npm install -g @marp-team/marp-cli`
2. Add Marp front-matter to `pitch-deck.md` (or copy to `pitch-deck-slides.md`):
   ```yaml
   ---
   marp: true
   theme: default
   paginate: true
   ---
   ```
3. Split sections with `---` (already present).
4. Export: `marp pitch-deck-slides.md --pdf` or `marp pitch-deck-slides.md --pptx`

### Option C — Use directly on Kickstarter

Copy section-by-section into the Kickstarter campaign editor. The platform supports Markdown-ish formatting (headers, bold, lists, tables). Tables may need to be reformatted as simple lists.

---

## How to render the Mermaid diagrams

| Tool | How |
|------|-----|
| [mermaid.live](https://mermaid.live) | Paste the diagram code between the ` ```mermaid ` fences. Click "Actions → Download SVG/PNG". |
| GitHub | Push the file to any GitHub repo. GitHub renders Mermaid natively in `.md` files. |
| VS Code | Install the extension `Markdown Preview Mermaid Support` (bierner.markdown-mermaid). |
| CLI export | Install `@mermaid-js/mermaid-cli` (`npm i -g @mermaid-js/mermaid-cli`) then `mmdc -i payment-flow-diagram.md -o diagrams.pdf`. |

For the Kickstarter campaign, export each diagram as PNG (1600px wide) and upload as inline images in the campaign page.

---

## Launch checklist

What still needs to be produced before going live on Kickstarter:

### Campaign content
- [ ] **Campaign video** (60–180 seconds) — founder intro, product demo, ask
- [ ] **Hero image** for Kickstarter page (1024×576 minimum)
- [ ] **Gallery images** — app screenshots, host portraits, city scenes (6–10 images)
- [ ] **Campaign story page** — assembled from `pitch-deck.md` sections
- [ ] **FAQ section** — minimum 10 common questions
- [ ] **Risks & challenges section** — Kickstarter requires this

### Legal & compliance
- [ ] Terms of Service for the Kickstarter rewards
- [ ] Privacy policy update to cover Kickstarter backer data
- [ ] Trademark search for "Global Tour" name
- [ ] Review of Kickstarter prohibited items (confirm we are a service marketplace, NOT a financial product)

### Reward fulfillment plan
- [ ] Travel credit redemption system (tie to user account at launch)
- [ ] Founder badge implementation in-app
- [ ] Merch sourcing & fulfillment partner (tees, totes, stickers)
- [ ] Shipping logistics for physical rewards (international)
- [ ] Email sequence for backer updates (monthly minimum)

### Team & social proof
- [ ] Replace `{PLACEHOLDER_*}` fields in pitch deck with real team bios
- [ ] Secure 2–3 advisor commitments for the Advisor tier
- [ ] Collect 5–10 beta testimonials from demo users
- [ ] LinkedIn profiles up-to-date for all founding team

### Marketing pre-launch
- [ ] Landing page with email capture (aim for 1000+ subs before launch)
- [ ] Twitter/X, Instagram, TikTok accounts created and seeded
- [ ] Press kit with logos, screenshots, founder photos
- [ ] Outreach list: travel bloggers, nomad newsletters, crypto-travel press
- [ ] 3–5 launch-day partners lined up for cross-promotion

### Product readiness
- [ ] Vercel deploy URL finalized (replace `{VERCEL_URL}` in pitch deck)
- [ ] Demo account credentials ready for press/backers
- [ ] Load test of demo (expect traffic spikes on launch day)
- [ ] Analytics in place on demo site

### Financials
- [ ] Detailed 12-month budget spreadsheet (matches budget breakdown in pitch deck)
- [ ] Stripe account for Kickstarter payout
- [ ] Tax advisor consulted on reward fulfillment tax implications

---

## Honesty guardrails

Per Kickstarter's terms and our own principles:

- **No equity.** Kickstarter is rewards-based. All rewards are product/merch, not ownership.
- **No financial returns.** "Lifetime 1% fee" is a product discount, not a dividend.
- **No inflated traction.** Keep `{PLACEHOLDER}` fields honest until we have real numbers.
- **Not a regulated financial service.** The platform facilitates tour bookings. Payments/escrow are product features, not investment products.

---

*Last updated: 2026-04-05*
