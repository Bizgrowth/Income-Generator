# How to Run the Remote Income Generator

Follow these steps to generate and view your remote work opportunities:

### 1. Install Dependencies
If you haven't already, open your terminal in the `d:\Google Code\Daily Income Generator` directory and run:
```bash
npm install
```

### 2. Run the Scraper
This script will search the web for roles matching your search criteria and save them to `raw_results.json`.
```bash
node scraper.js
```

### 3. Rank the Results
This script will analyze the found roles against your resume and rules, scoring them and saving the top 25 to `ranked_results.json`.
```bash
node ranker.js
```

### 4. View the Dashboard
To see the results in the premium dashboard, open the `index.html` file in your browser. 

> [!TIP]
> You can simply right-click `index.html` in your file explorer and select "Open with..." and choose your favorite browser.

---

### File Structure
- `scraper.js`: The search engine.
- `ranker.js`: The scoring logic.
- `index.html`: The visual dashboard.
- `DANIEL SCHLEY.txt`: Your resume (used for matching).
- `Job-Hunter.txt`: Your search and ranking rules.
