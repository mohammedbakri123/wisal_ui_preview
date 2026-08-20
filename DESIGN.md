# X (Twitter) Dark Identity — DESIGN.md

## Overview

- **Focus:** High information density, speed, and real-time updates.
- **Layout:** Three-column desktop layout — fixed 275px nav rail, fixed 600px center feed, 350px right rail — collapsing to two columns, then a single mobile column with bottom navigation.
- **Aesthetic:** Pure black background with crisp, neutral typography and iconic electric blue accents. Flat surfaces separated by 1px structural borders — no elevation, no shadows, no rounded cards in the feed.
- **Mood:** Industrial, fast, information-first. Color is used sparingly as a signal, never as decoration.

## Design Tokens (YAML)

```yaml
name: "X/Twitter Dark"
mode: "dim-black"

colors:
  background: "#000000"        # App background (pure black)
  surface: "#16181c"           # Secondary surface (popovers, dropdowns, toasts)
  surface-elevated: "#202327"  # Tertiary surface (search box background, chips)
  hover: "rgba(255,255,255,0.03)" # Row/nav hover wash (on black ≈ #080808)
  border: "#2f3336"            # Primary dividers, structural lines, column separators
  border-hover: "#536471"      # Outlined control border (secondary buttons)
  text: "#e7e9ea"              # High-emphasis white (titles, body, names)
  text-muted: "#71767b"        # Secondary grey (handles, timestamps, counts, metadata)
  accent: "#1d9bf0"            # X Blue — interactive, active, verified, links
  accent-hover: "#1a8cd8"      # Accent hover / pressed
  accent-soft: "rgba(29,155,240,0.1)"  # Accent tint backgrounds (nav active, toggles)
  danger: "#f4212e"            # Errors, destructive actions, blocked
  success: "#00ba7c"           # Repost/retweet, online, positive
  like: "#f91880"              # Heart/like, engagement
  verified-blue: "#1d9bf0"     # Standard verified badge
  verified-gold: "#ffd400"     # Verified organizations
  button-inverse-bg: "#eff3f4" # Follow button background (inverted)
  button-inverse-text: "#0f1419" # Follow button text
  overlay: "rgba(91,112,131,0.4)" # Modal backdrop
  skeleton: "#2f3336"          # Loading skeleton blocks

typography:
  fontFamily: "TwitterChirp, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  baseSize: "15px"
  body: "15px / 20px"          # Tweet body, names, handles, metadata
  composer: "17px"             # Compose / reply input text
  title: "20px bold"           # Page titles, trending headers
  display: "36px bold"         # Profile page name, big stats
  weights: "400 / 700"         # Regular and bold; medium(500) for secondary emphasis

spacing:
  page-padding: "16px"         # Horizontal padding inside a column
  feed-item-padding: "12px"    # Tweet/row padding
  section-gap: "4px"
  icon-button: "34.75px"       # Circular action-button hit area
  avatar-sm: "32px"
  avatar-md: "40px"            # Default inline avatar
  avatar-lg: "48px"
  avatar-xl: "64px"
  avatar-profile: "112px+"

layout:
  maxWidth: "1280px"           # Centered app shell
  navRail: "275px"             # Left rail (collapses to 68px icon-only)
  feedWidth: "600px"           # Fixed center feed
  rightRail: "350px"           # Right rail (trends, suggestions, search)
  breakpoints:                 # columnCount
    mobile: "0–686px (1 col)"
    tablet: "687–1279px (2 col: rail + feed)"
    desktop: "1280px+ (3 col)"

rounded:
  button: "9999px"             # Fully pill-shaped buttons
  input: "9999px"              # Search and inline inputs are pills
  card: "0px"                  # Feed items are seamless edge-to-edge
  panel: "16px"                # Modals, dropdowns, toasts, menus
  avatar: "9999px"             # Circular avatars
```

## Layout Structure

- **App shell:** `max-width: 1280px`, horizontally centered, `height: 100dvh`, `overflow: hidden`.
- **Column separators:** 1px `#2f3336` vertical rules between nav rail, feed, and right rail.
- **Sticky column headers:** `backdrop-filter: blur(12px)` over a `rgba(0,0,0,0.65)` scrim so content scrolls beneath while the header label stays legible; bottom border `1px #2f3336`.
- **Nav rail (desktop):** X logo at top, then icon + label nav items (e.g. Home, Explore, Notifications, Messages, Communities, Profile, Settings), followed by a primary post CTA. Collapses to a 68px icon-only rail below the tablet breakpoint.
- **Center feed:** 600px fixed; items scroll under the sticky header; header hosts the page title plus a blue compose/action icon.
- **Right rail (desktop only):** sticky search pill at top, then "Trends for you" and "Who to follow" panels; each panel is a rounded-2xl (`16px`) block with `#16181c` surface and hover washes.
- **Mobile:** single feed column; a 5-item bottom navigation bar replaces the nav rail; a floating blue compose button sits above the bottom-right corner.

## Component Rules & Intent

### Feed items (posts, chats, rows)
- **No elevation.** Transparent background, no shadows, no floating cards. Rows are separated by `1px #2f3336` horizontal rules spanning full container width.
- **Hover:** `rgba(255,255,255,0.03)` wash across the full row width; active/pressed `rgba(255,255,255,0.06)`.
- **Radius:** `0`. Avatars inside rows remain circular.
- The row is a single interactive unit; secondary actions (reply, repost, like, share) are icon buttons in the bottom-right gutter.

### Buttons
- **Primary:** pill (`9999px`), `#1d9bf0` background, `#e7e9ea` text, `font-weight: 700`; hover `#1a8cd8`; active scales to `0.97`.
- **Secondary (outline):** pill, transparent background, `1px #536471` border, white text; hover border → white, subtle wash.
- **Inverse (Follow):** pill, `#eff3f4` background, `#0f1419` text; hover lightens; toggles to outlined "Following" state.
- **Ghost/icon:** circular `34.75px` hit area with a `24px` glyph; default `#71767b`; hover uses the action's semantic color at `10%` opacity for the background and the color for the glyph.
- **Danger:** `#f4212e` background or red-tinted outline for destructive confirmation.

### Inputs & search
- **Shape:** pill (`9999px`), height `44px`; the classic X search is the canonical example.
- **Background:** `#202327` (search) or transparent with a `1px #2f3336` border (inline inputs); placeholder `#71767b`.
- **Focus:** border and caret switch to `#1d9bf0`; subtle `rgba(29,155,240,0.2)` ring.
- **Error:** `#f4212e` border with red helper text.

### Avatars & badges
- **Avatars:** circular (`9999px`); sizes per tokens above.
- **Online/presence:** small `#00ba7c` status dot on avatars.
- **Verified badge:** 16px blue (`#1d9bf0`) check seal on names; verified organizations use `#ffd400` gold.

### Engagement / action semantics
- Glyphs are `#71767b` at rest; each action takes its own color **on hover and when active**:
  - Reply / quote / bookmark / share → `#1d9bf0`
  - Repost → `#00ba7c`
  - Like (heart) → `#f91880`
- Active (toggled) states keep the semantic color and may fill the glyph.
- Counts sit beside the glyph, also `#71767b`, colored only when active.

### Navigation
- Nav item: icon + label, left-aligned, `font-weight: 400` at rest, `700` when active; active icon and label → `#1d9bf0`.
- Active pill background: `rgba(29,155,240,0.1)` rounded-full.
- Hover: `rgba(29,155,240,0.1)` background without changing glyph color, plus `text-muted → text`.

### Search, trends, suggestions
- **Search:** sticky pill, `#202327` background, `#71767b` placeholder, focus ring `#1d9bf0`.
- **Trend panels:** rounded-2xl `#16181c` block; rows separated by `#2f3336` dividers; row hover wash `rgba(255,255,255,0.03)`.
- Trend row content: category + "· Trending" (`text-muted`), trend name (`text`, bold), count (`text-muted`).

### Modals, dropdowns, toasts
- **Modal:** `rgba(91,112,131,0.4)` backdrop blur; panel `background: #000000`, `1px #2f3336` border, `16px` radius, white text.
- **Dropdown menu:** `#16181c` surface, `1px #2f3336` border, `16px` radius, `0.15s` fade + scale-in.
- **Toast:** fixed bottom-center, `#16181c` surface, `#2f3336` border, `16px` radius, `#e7e9ea` text, icon in `#1d9bf0`.

### Feedback & loading
- **Spinner / streaming indicator:** three animated `#1d9bf0` dots.
- **Skeleton loaders:** `#2f3336` blocks with a subtle shimmer; avatars are circular skeletons, text uses rounded bars.
- **Pull-to-refresh:** blue spinner over the feed top edge.
- **Error states:** `#f4212e` text/icons; retry presented as a pill `#1d9bf0` button.

## Color Usage Rules

- `#1d9bf0` is reserved **exclusively** for: active links, primary CTAs, active nav, verified marks, unread indicators, focus rings, and blue-tinted engagement actions. It is never decorative.
- `#e7e9ea` for all primary text: names, post bodies, titles, button labels.
- `#71767b` for all metadata: handles, timestamps, counts, section labels, placeholders, disabled text.
- Semantic colors appear only where the interaction warrants them (repost green, like pink, error red, verified gold).
- Hover states use **background washes** (`10%` tinted / `3%` white) rather than hue shifts or brightness changes.

## Motion

- **Hover transitions:** `150ms ease` for colors, borders, and background washes.
- **Button press:** `scale(0.97)` on active.
- **Modal/sheet:** `0.2s` scale-in (`0.95 → 1.0`) with fade.
- **Dropdown:** `0.15s` fade + translateY(`-4px`).
- **Like (heart):** single `0.2s` pop/bounce scale on activation.
- **Streaming/typing dots:** continuous staggered pulse.
- **Page/column transitions:** `0.25s ease-out` slide/fade; never more than `300ms`.
- **Reduced motion:** respect `prefers-reduced-motion` — disable decorative animation, keep essential feedback.
