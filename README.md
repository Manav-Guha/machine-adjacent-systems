# Capital Topologies Website

## Local Testing Instructions

The CSS not loading is likely due to browser security restrictions when opening HTML files directly from your file system.

### Option 1: Use a Local Web Server (Recommended)

**If you have Python installed:**

```bash
cd capital-topologies
python3 -m http.server 8000
```

Then open: http://localhost:8000

**If you have Node.js installed:**

```bash
cd capital-topologies
npx serve
```

**If you have VS Code:**
- Install "Live Server" extension
- Right-click on index.html → "Open with Live Server"

### Option 2: Check File Structure

Make sure the folder structure looks like this:

```
capital-topologies/
├── index.html
├── explained.html
├── application-studies.html
├── documentation.html
├── newsroom.html
├── careers.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── products/
    ├── miaf.html
    ├── raa.html
    └── cognitive-ledger.html
```

### Option 3: Browser Settings

Some browsers (especially Chrome) block local file access. Try:
- Firefox (usually more permissive with local files)
- Or use the web server method above

## Deployment to Vercel

Once you've reviewed locally:

1. Create a GitHub repository
2. Push these files to the repo
3. Go to vercel.com
4. Import the GitHub repo
5. Deploy (no configuration needed - Vercel auto-detects static sites)

## File Structure

- `/index.html` - Homepage
- `/products/*.html` - Product pages
- `/explained.html` - Capital Topologies Explained
- `/css/style.css` - All styling
- `/js/main.js` - Mobile menu functionality
- Other HTML files - Placeholder pages

## Notes

- Dark theme matching MIAF tool aesthetic
- Responsive design (mobile hamburger menu)
- All placeholder pages ready for content
- MIAF page links to: https://military-innovation-tool.vercel.app/
