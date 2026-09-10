#!/usr/bin/env node
/**
 * Autonomous Shopping Browser Agent CLI Tool
 * Fast terminal entry to run autonomous browser searches, inspect categories, and test price radar.
 */

import { AgentOrchestrator } from '../server/agent.js';
import { checkRuntimeEnvironment } from './nodeRuntimeSupport.mjs';

const command = process.argv[2];
const queryArg = process.argv.slice(3).join(' ');

async function main() {
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    console.log(`
PATHFINDER — "Your Destination, Our Path" Autonomous Browser Agent CLI
==================================================
Usage:
  node bin/agent.mjs search <query>       Run live Playwright search and extraction
  node bin/agent.mjs categories           List top shopping categories and departments
  node bin/agent.mjs health               Check agent runtime health and Playwright status
  node bin/agent.mjs trends <query>       Inspect 90-day price trends and festival drop prediction
  node bin/agent.mjs diagnostics          Print full system memory & runtime diagnostics

Examples:
  node bin/agent.mjs search "air fryer under 10000"
  node bin/agent.mjs search "boAt airdopes 141 anc"
  node bin/agent.mjs trends "smartphones under 25000"
`);
    process.exit(0);
  }

  if (command === 'health') {
    const diag = checkRuntimeEnvironment();
    console.log('✔ Agent Status: ONLINE');
    console.log(`✔ Node Runtime: ${diag.nodeVersion} (${diag.platform}-${diag.arch})`);
    console.log(`✔ Memory Available: ${diag.memoryFreeMB} MB / ${diag.memoryTotalMB} MB`);
    process.exit(0);
  }

  if (command === 'diagnostics') {
    console.log(JSON.stringify(checkRuntimeEnvironment(), null, 2));
    process.exit(0);
  }

  if (command === 'categories') {
    console.log(`
Available Departments & Categories:
-----------------------------------
1. Tech & Electronics      - Laptops, 5G Smartphones, Fast Chargers, TWS ANC Earbuds, Smartwatches, 4K TVs
2. Household & Appliances  - Digital Air Fryers, Robot Vacuums, RO Purifiers, Coffee Makers, Cookware
3. Dresses & Apparel       - Pure Cotton Kurta Sets, Floral Maxi Dresses, Linen Shirts, Formal Blazers
4. Beauty & Personal Care  - Ceramide Face Moisturizers, Vitamin C Serums, Sunscreens, Hair Serums
5. Fitness & Sports Gear   - Adjustable Dial Dumbbells, High-Density Yoga Mats, Resistance Bands
`);
    process.exit(0);
  }

  if (command === 'search') {
    if (!queryArg) {
      console.error('Error: Please specify a search query (e.g. node bin/agent.mjs search "air fryer under 10000")');
      process.exit(1);
    }

    console.log(`\n⚡ Launching Autonomous Browser Agent for: "${queryArg}"...`);
    const orchestrator = new AgentOrchestrator({ headless: true });
    const startTime = Date.now();

    try {
      const result = await orchestrator.execute(queryArg, []);
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);

      console.log(`\n✅ Autonomous Search Completed in ${duration}s!`);
      console.log('==================================================');
      console.log(`Title:       ${result.topPick?.title}`);
      console.log(`Deal Price:  ${result.topPick?.price} (${result.topPick?.discount || 'Verified Deal'})`);
      console.log(`Rating:      ⭐ ${result.topPick?.rating} (${result.topPick?.reviewsCount})`);
      console.log(`Direct Link: ${result.topPick?.directProductUrl}`);
      console.log(`Platform:    ${result.topPick?.bestPlatform?.name}`);
      console.log(`Verdict:     ${result.priceTrends?.verdictBadge || 'Good Time to Buy'}`);

      if (result.tenPercentAlternative) {
        console.log('\n±10% Same-Category Alternative:');
        console.log(`  Name:  ${result.tenPercentAlternative.title}`);
        console.log(`  Price: ${result.tenPercentAlternative.price} (${result.tenPercentAlternative.bracketBadge || 'Within ±10%'})`);
        console.log(`  Link:  ${result.tenPercentAlternative.url}`);
      }

      console.log('==================================================\n');
    } catch (err) {
      console.error('❌ Agent execution error:', err.message);
      process.exit(1);
    }
    process.exit(0);
  }

  if (command === 'trends') {
    if (!queryArg) {
      console.error('Error: Please specify a product or query (e.g. node bin/agent.mjs trends "laptop under 65000")');
      process.exit(1);
    }

    console.log(`\n📊 Analyzing 90-day price trend radar for "${queryArg}"...`);
    const orchestrator = new AgentOrchestrator({ headless: true });
    const result = await orchestrator.execute(queryArg, []);
    const trends = result.priceTrends || result.topPick?.priceTrends;

    console.log('==================================================');
    console.log(`Current Deal: ${trends?.currentDeal}`);
    console.log(`Average Mkt:  ${trends?.averageMarketPrice}`);
    console.log(`All-Time Low: ${trends?.allTimeLow}`);
    console.log(`Verdict:      ${trends?.verdictBadge}`);
    console.log(`Upcoming Drop: ${trends?.upcomingSalePrice}`);
    console.log('==================================================\n');
    process.exit(0);
  }

  console.error(`Unknown command: ${command}. Run "node bin/agent.mjs --help" for options.`);
  process.exit(1);
}

main();
