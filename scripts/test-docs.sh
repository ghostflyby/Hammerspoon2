#!/bin/bash
# Quick test script to verify documentation generation

set -e

echo "Testing Hammerspoon 2 Documentation System"
echo "==========================================="
echo

# Check Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi
echo "✓ Node.js is available: $(node --version)"

# Check npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✓ npm is available: $(npm --version)"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠ node_modules not found, running npm install..."
    npm install
fi
echo "✓ Dependencies installed"

# Run documentation extraction
echo
echo "Running documentation extraction..."
npm run docs:extract

# Check JSON output
if [ ! -f "docs/json/index.json" ]; then
    echo "❌ index.json not generated"
    exit 1
fi
echo "✓ JSON documentation generated"

MODULE_COUNT=$(cat docs/json/index.json | grep -c '"name":' || echo "0")
echo "  Found $MODULE_COUNT modules in index"

# Run HTML generation
echo
echo "Running HTML documentation generation..."
npm run docs:html

# Check HTML output
if [ ! -f "docs/api/index.html" ]; then
    echo "❌ index.html not generated"
    exit 1
fi
echo "✓ HTML documentation generated"

HTML_FILE_COUNT=$(find docs/api -name "*.html" | wc -l)
echo "  Generated $HTML_FILE_COUNT HTML files"

# Summary
echo
echo "==========================================="
echo "✅ All tests passed!"
echo
echo "Documentation available at:"
echo "  - JSON: docs/json/"
echo "  - HTML: docs/api/index.html"
echo
echo "To view HTML documentation:"
echo "  open docs/api/index.html"
