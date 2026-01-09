const fs = require('fs');
const path = require('path');

const resume = fs.readFileSync(path.join(__dirname, 'DANIEL SCHLEY.txt'), 'utf8');

function scoreOpportunity(job) {
    let score = 0;

    // 1. Position Level (Simplified match)
    const title = job.title.toLowerCase();
    if (title.includes('director') || title.includes('senior manager')) score += 25;
    else if (title.includes('manager') || title.includes('lead')) score += 20;
    else if (title.includes('consultant') || title.includes('specialist')) score += 15;

    // 2. Skill Alignment (Keyword-based for now, LLM would be better)
    const keywords = ['ai', 'automation', 'crm', 'operations', 'hubspot', 'zapier', 'make.com', 'glg', 'alphasights', 'testing', 'tester'];
    let skillScore = 0;
    keywords.forEach(kw => {
        if (title.includes(kw)) skillScore += 5;
    });
    score += Math.min(skillScore, 25);

    // 3. Work Type (Assumption for test)
    if (title.includes('remote')) score += 15;

    // Defaulting some scores for demo
    score += 15; // Work Type Preference
    score += 10; // Income potential assumption

    return Math.min(score, 100);
}

function rankResults() {
    const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, 'raw_results.json'), 'utf8'));

    const ranked = rawData.map(job => {
        const score = scoreOpportunity(job);
        // Map to new sections if not already categorized
        let category = job.category;
        if (!category) {
            if (job.title.toLowerCase().includes('consultant') || job.title.toLowerCase().includes('expert')) {
                category = "Section 3 – GLG-Style Expert & Testing Platforms";
            } else if (job.title.toLowerCase().includes('automation') || job.title.toLowerCase().includes('operations')) {
                category = "Section 2 – AI Operations Expert Gigs";
            } else {
                category = "Section 1 – Remote Quick/Easy Income";
            }
        }
        return {
            ...job,
            score: score,
            tier: category
        };
    }).sort((a, b) => b.score - a.score);

    // Ensure we keep all 30 for display
    fs.writeFileSync(path.join(__dirname, 'ranked_results.json'), JSON.stringify(ranked.slice(0, 30), null, 2));
    console.log(`Ranked ${ranked.length} results into 3 sections.`);
}

function getTier(score) {
    // This function is still used but the main 'tier' is set based on category above
    return "Categorized";
}

if (require.main === module) {
    rankResults();
}
