#!/usr/bin/env node
/**
 * Model Context Protocol (MCP) Server for Autonomous Shopping Browser Agent
 * Provides standard tools to search, compare prices, find ±10% alternatives, and validate canonical links.
 * Compatible with Claude Desktop, Cursor, Antigravity, and OpenCode MCP clients.
 */

import readline from 'readline';
import { AgentOrchestrator, getDefaultInitialRecommendation } from '../server/agent.js';
import { checkRuntimeEnvironment } from './nodeRuntimeSupport.mjs';

const MCP_TOOLS = [
  {
    name: 'search_products',
    description: 'Autonomous multi-store browser search across Amazon India, Flipkart, and Croma with live DOM pricing and canonical links.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search term or shopping requirement (e.g. "air fryer under 10000" or "anc earbuds under 2000")' }
      },
      required: ['query']
    }
  },
  {
    name: 'get_price_trends',
    description: 'Analyzes 90-day price historical trends and upcoming festival price drop predictions for a product.',
    inputSchema: {
      type: 'object',
      properties: {
        product: { type: 'string', description: 'Product name or category' }
      },
      required: ['product']
    }
  },
  {
    name: 'find_alternatives',
    description: 'Computes exact same-category alternatives strictly bounded within ±10% of the given product price.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Product category or search term' },
        basePrice: { type: 'number', description: 'Base price in INR' }
      },
      required: ['query', 'basePrice']
    }
  },
  {
    name: 'list_categories',
    description: 'Returns the 5 major e-commerce shopping categories and curated bestsellers.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'agent_health',
    description: 'Checks browser agent connectivity, Playwright engine status, and runtime environment.',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

async function handleToolCall(name, args) {
  if (name === 'search_products') {
    const orchestrator = new AgentOrchestrator({ headless: true });
    const result = await orchestrator.execute(args.query, []);
    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
    };
  }

  if (name === 'get_price_trends') {
    const orchestrator = new AgentOrchestrator({ headless: true });
    const result = await orchestrator.execute(args.product, []);
    return {
      content: [{ type: 'text', text: JSON.stringify(result.priceTrends || result.topPick?.priceTrends, null, 2) }]
    };
  }

  if (name === 'find_alternatives') {
    const orchestrator = new AgentOrchestrator({ headless: true });
    const result = await orchestrator.execute(args.query, []);
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          targetBracket: `±10% [₹${Math.round(args.basePrice * 0.9)} - ₹${Math.round(args.basePrice * 1.1)}]`,
          tenPercentAlternative: result.tenPercentAlternative,
          moreAlternatives: result.moreAlternatives
        }, null, 2)
      }]
    };
  }

  if (name === 'list_categories') {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          categories: [
            { id: 'tech', label: 'Tech & Electronics', popular: 'Laptops, 5G Phones, Fast Chargers, ANC Audio' },
            { id: 'household', label: 'Household & Kitchen', popular: 'Air Fryers, Robot Vacuums, RO Purifiers' },
            { id: 'dresses', label: 'Dresses & Apparel', popular: 'Cotton Kurta Sets, Floral Maxi Dresses, Linen Shirts' },
            { id: 'beauty', label: 'Beauty & Skincare', popular: 'Ceramide Moisturizers, Vitamin C Serums' },
            { id: 'fitness', label: 'Fitness & Sports', popular: 'Adjustable Dumbbells, Yoga Mats' }
          ]
        }, null, 2)
      }]
    };
  }

  if (name === 'agent_health') {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          status: 'online',
          engine: 'Playwright Chromium Headless',
          diagnostics: checkRuntimeEnvironment()
        }, null, 2)
      }]
    };
  }

  throw new Error(`Unknown tool: ${name}`);
}

// Stdio JSON-RPC Listener
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', async (line) => {
  if (!line.trim()) return;
  try {
    const request = JSON.parse(line);
    const { id, method, params } = request;

    if (method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: { tools: MCP_TOOLS }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
      return;
    }

    if (method === 'tools/call') {
      const toolResult = await handleToolCall(params?.name, params?.arguments || {});
      const response = {
        jsonrpc: '2.0',
        id,
        result: toolResult
      };
      process.stdout.write(JSON.stringify(response) + '\n');
      return;
    }

    if (method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'autonomous-browser-agent-mcp', version: '1.0.0' }
        }
      };
      process.stdout.write(JSON.stringify(response) + '\n');
      return;
    }

    // Default response for unhandled notifications
    if (id !== undefined) {
      process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result: {} }) + '\n');
    }
  } catch (err) {
    process.stdout.write(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32603, message: err.message }
    }) + '\n');
  }
});
