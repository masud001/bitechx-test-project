🎨 colors.md
🧾 Project Theme Setup

Tech Stack: Next.js (App Router) + TypeScript + TailwindCSS v4
Design Goal: Rich, modern, and accessible UI with elegant contrast and brand consistency.

🌈 Color Palette
Color Name	HEX	Purpose
Rich Black	#0D1821	Primary dark color — used for dark backgrounds, typography contrast, and depth.
Anti-Flash White	#EFF1F3	Clean, minimal background for light sections. Enhances clarity and whitespace.
Hooker’s Green	#4E6E5D	Calm, elegant green — used for primary buttons, links, and highlights.
Lion	#AD8A64	Warm golden-brown — used for secondary accents, hover effects, and visual warmth.
Chestnut	#A44A3F	Deep red-brown — used for alerts, warnings, or strong call-to-actions.
⚙️ TailwindCSS v4 Color Configuration

Since Tailwind v4 is CSS variable-based, define all color tokens inside your globals.css using the @theme directive.

📄 globals.css
@import "tailwindcss";

@theme {
  /* Core Brand Colors */
  --color-rich-black: #0D1821;
  --color-anti-flash-white: #EFF1F3;
  --color-hookers-green: #4E6E5D;
  --color-lion: #AD8A64;
  --color-chestnut: #A44A3F;

  /* Semantic Color Tokens */
  --color-bg: var(--color-anti-flash-white);
  --color-bg-dark: var(--color-rich-black);
  --color-primary: var(--color-hookers-green);
  --color-secondary: var(--color-lion);
  --color-accent: var(--color-chestnut);
  --color-text: var(--color-rich-black);
  --color-text-light: var(--color-anti-flash-white);
}


✅ Now usable directly in Tailwind utility classes:

<div class="bg-bg text-text p-4 rounded-lg shadow-md">
  Consistent color usage via semantic tokens
</div>

🧩 Semantic Color System
Semantic Token	Example Class	Purpose
bg	bg-bg	Main app background for light mode
bg-dark	bg-bg-dark	Dark background for hero or dark sections
primary	bg-primary text-text-light hover:bg-primary/90	Primary buttons, CTAs
secondary	text-secondary	Subtle accents, secondary buttons
accent	bg-accent text-text-light	Alerts, highlights
text	text-text	Default text color
text-light	text-text-light	Text on dark surfaces
💎 UI Design Guidelines
1. Backgrounds

Use bg-bg for page or card backgrounds.

Use bg-bg-dark for hero sections, modals, or footers.

Alternate background sections: bg-primary/5 or bg-secondary/5.

2. Typography

Default text: text-text (#0D1821)

Light text on dark surfaces: text-text-light (#EFF1F3)

Emphasized elements: text-secondary or text-accent

3. Buttons
Type	Background	Text	Hover
Primary	bg-primary	text-text-light	hover:bg-primary/90
Secondary	bg-secondary	text-text-light	hover:bg-secondary/90
Danger / Accent	bg-accent	text-text-light	hover:bg-accent/90
4. Cards / Surfaces

Use bg-bg with shadow-md or shadow-lg for elevation.

Optional: bg-primary/5 for subtle surface contrast.

5. Borders & Dividers

Use border-primary/30 or border-bg-dark/10 for light contrast lines.

Maintain consistent border radius: rounded-xl or rounded-2xl.

6. Dark Mode (optional)

Add an alternate color theme later with:

@theme dark {
  --color-bg: var(--color-rich-black);
  --color-text: var(--color-anti-flash-white);
  --color-primary: var(--color-hookers-green);
}

🪄 Example Component
<section class="bg-bg-dark text-text-light p-10 rounded-2xl shadow-lg">
  <h1 class="text-3xl font-bold text-secondary mb-3">
    Welcome to Your Dashboard
  </h1>
  <p class="text-text-light/80 mb-6">
    Manage projects, track performance, and visualize progress.
  </p>
  <button class="bg-primary text-text-light px-6 py-2 rounded-lg hover:bg-primary/90 transition">
    Get Started
  </button>
</section>

💡 Visual Design Principles

Contrast → Maintain strong contrast between text and background (Rich Black vs Anti-Flash White).

Hierarchy → Use Lion for secondary accents and Chestnut for attention.

Harmony → Keep Hooker’s Green as the primary focus color across CTAs and icons.

Consistency → Always use semantic color tokens, not raw hex codes.

Accessibility → Ensure WCAG 2.1 AA color contrast (4.5:1 minimum).

Balance → Apply Chestnut sparingly to prevent visual fatigue.

🧠 AI Styling Intent (for Trea AI IDE)

Prompt to Trea AI:

“Apply this color system to all components.
Use bg-bg as default background, text-text for typography, bg-primary for primary buttons, bg-secondary for accents, and bg-accent for warnings or alerts.
Maintain modern depth with subtle shadows, rounded-2xl corners, and hover transitions.
Ensure all typography maintains accessibility contrast and consistent padding.”