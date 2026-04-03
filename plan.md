# Rebrand Plan: Capital Topologies → Machine Adjacent Systems (MAS)

## Files in scope

| File | Layout | Changes |
|------|--------|---------|
| `index.html` | Standalone (top-nav, fullscreen hero) | Rebrand + add myCode card + update hero |
| `explained.html` | Sidebar layout | Rebrand + rename section heading |
| `products/miaf.html` | Sidebar layout | Rebrand nav/header only (content untouched) |
| `products/raa.html` | Sidebar layout | Rebrand nav/header only |
| `products/cognitive-ledger.html` | Sidebar layout | Rebrand nav/header only |
| `contact.html` | Sidebar layout | Rebrand + add email |
| `careers.html` | Sidebar layout | Rebrand |
| `documentation.html` | Sidebar layout | Rebrand |
| `newsroom.html` | Sidebar layout | Rebrand |
| `application-studies.html` | Sidebar layout | Rebrand |
| **`products/mycode.html`** | **NEW** — Sidebar layout | Full new product page |

**Not touched:** `css/`, `js/`, `assets/`, `index-old.html`

---

## 1. Global rebrand (all 10 existing HTML files)

### 1a. Text replacements
- `<title>` tags: "Capital Topologies" → "Machine Adjacent Systems"
- `<meta name="description">`: "Mapping value transformation across complex systems" → "Analytical frameworks and developer tools for complex systems"
- Logo text (`class="logo"` and `class="top-nav-logo"`): "Capital Topologies" → "Machine Adjacent Systems"
- Any body-text mention of "Capital Topologies" → "Machine Adjacent Systems" (e.g. careers hero, contact hero, application-studies hero, documentation hero)

### 1b. Nav: add myCode to Products dropdown
Every sidebar has a Products `<ul>` listing MIAF, RAA, Cognitive Ledger. Add myCode as the **first** item:

```html
<li class="nav-item"><a href="mycode.html" class="nav-link">myCode</a></li>   <!-- products/ pages -->
<li class="nav-item"><a href="products/mycode.html" class="nav-link">myCode</a></li>  <!-- root pages -->
```

For `index.html` (top-nav style — currently just links to `products/miaf.html` as "Products"), no dropdown exists. Leave the top-nav link pointing to `products/mycode.html` (first product) or keep as-is. Decision: change the single "Products" link target to `products/mycode.html` since myCode is now the flagship product.

### 1c. Contact email
In `contact.html`, add the email address `Machine.Adjacent.Systems@protonmail.com` to the contact section.

### 1d. Explained page section rename
- Page `<title>`: "Capital Topologies Explained" → "Machine Adjacent Systems Explained"
- `<h1>`: "Capital Topologies Explained" → "Analytical Frameworks Explained"
- Card labels: "Capital Topologies Explained, #N" → "Analytical Frameworks Explained, #N"
- Body text: "all Capital Topologies products" → "all Machine Adjacent Systems products"

---

## 2. Homepage (`index.html`) updates

### 2a. Hero section
- Headline: "Mapping value transformation across complex systems" → "Analytical frameworks and developer tools for complex systems"
- Subheadline: Update to reflect both developer tools (myCode) and analytical frameworks (MIAF/RAA/CL). New text:
  > "Pre-deployment stress testing for AI-generated code. Validated analytical frameworks for strategic decision-making in defense, enterprise, and research domains."
- Primary CTA: "Explore Frameworks" → "Explore Products", link stays `products/mycode.html`
- Secondary CTA: "Learn More" stays, link stays `explained.html`

### 2b. Product cards
Add a **new myCode card before MIAF** in the `.content-grid`:

```html
<div class="content-card">
  <h3 class="content-card-title">myCode</h3>
  <p class="content-card-text">
    Pre-deployment stress testing for AI-generated code. Submit a repo, declare your intent,
    get a diagnostic report showing where and when it breaks.
  </p>
</div>
```

Existing MIAF, RAA, Cognitive Ledger cards stay unchanged.

---

## 3. New file: `products/mycode.html`

Create using the **same sidebar layout and styles as `products/miaf.html`** (grid-based content-wrapper).

### Structure:
```
<head>
  <title>myCode - Machine Adjacent Systems</title>
  <link rel="stylesheet" href="../css/style.css">
  <style> /* same grid styles as miaf.html */ </style>
</head>
<body>
  <div class="layout">
    <!-- mobile toggle (copy from miaf.html) -->
    <!-- sidebar nav (rebranded, with myCode in Products list) -->

    <main class="main-content">
      <header class="hero">
        <h1 class="hero-title">myCode</h1>
        <p class="hero-subtitle">Pre-deployment stress testing for AI-generated code</p>
      </header>

      <div class="content-wrapper"> <!-- 3-column grid like miaf.html -->

        <!-- Row 1: What It Does (spans 2 cols) + Links/Access (col 3, tool-box style) -->
        What It Does:
          "myCode takes a GitHub repo, installs dependencies in a sandbox, and runs
           runtime stress tests against stated intent. A prediction model trained on
           7,500+ repos predicts likely failures before tests run."

        Links box (tool-box style):
          - Web: mycode-ai.vercel.app
          - CLI: pip install mycode-ai
          - GitHub: github.com/Manav-Guha/mycode

        <!-- Row 2: How It Works (spans 2 cols) + Supported Languages (col 3) -->
        How It Works:
          1. Submit a GitHub repo URL
          2. Declare intended behavior
          3. Dependencies installed in sandbox
          4. Prediction model flags likely failures (trained on 7,500+ repos)
          5. Runtime stress tests execute
          6. Diagnostic report generated

        Supported Languages:
          - Python
          - JavaScript / TypeScript
          - (more coming)

        <!-- Row 3 (full width): The Corpus -->
        The Corpus:
          "Trained on 7,500+ public repositories. The prediction model achieves 0.91 AUC
           for failure prediction. Continuously expanding corpus improves accuracy."

        <!-- Row 4 (full width): CI Gate Integration -->
        CI Gate:
          "Integrate myCode into your CI/CD pipeline. Run as a pre-merge check to catch
           failures before they reach production. Available as a GitHub Action."

      </div>
    </main>
  </div>
  <script src="../js/main.js"></script>
</body>
```

---

## 4. Summary of changes per file

| # | File | Edits |
|---|------|-------|
| 1 | `index.html` | Rebrand title/meta/logo/hero, add myCode card, update CTA |
| 2 | `explained.html` | Rebrand title/logo/nav, rename section to "Analytical Frameworks Explained", add myCode to nav |
| 3 | `products/miaf.html` | Rebrand title/logo, add myCode to nav |
| 4 | `products/raa.html` | Rebrand title/logo, add myCode to nav |
| 5 | `products/cognitive-ledger.html` | Rebrand title/logo, add myCode to nav |
| 6 | `contact.html` | Rebrand title/logo/hero, add myCode to nav, add email |
| 7 | `careers.html` | Rebrand title/logo/hero, add myCode to nav |
| 8 | `documentation.html` | Rebrand title/logo/hero, add myCode to nav |
| 9 | `newsroom.html` | Rebrand title/logo/hero, add myCode to nav |
| 10 | `application-studies.html` | Rebrand title/logo/hero, add myCode to nav |
| 11 | `products/mycode.html` | **New file** — full product page |

## 5. What stays untouched
- `css/style.css` — no changes
- `js/main.js`, `js/raa-viz.js` — no changes
- `assets/` — no changes
- `index-old.html` — no changes
- MIAF product page **content** (only nav/header rebranded)
- RAA product page content
- Cognitive Ledger product page content
