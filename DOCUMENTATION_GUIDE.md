# Hammerspoon 2 Documentation System - Quick Start Guide

This PR adds a comprehensive documentation extraction system for the Hammerspoon 2 JavaScript API.

## What Was Added

### 1. Documentation Extraction System
- **Swift parser**: Extracts JSExport protocols and `///` comments
- **JavaScript parser**: Extracts JSDoc comments and function definitions
- **Type converter**: Converts Swift types to JSDoc-compatible types
- **Module combiner**: Merges Swift and JS documentation by module

### 2. Output Formats
- **JSON**: Machine-readable structured data (`docs/json/`)
- **HTML**: Browsable documentation with search (`docs/api/`)

### 3. Tools & Scripts
- **extract-docs.js**: Main extraction script
- **test-docs.sh**: Validation tests
- **docs-coverage.js**: Coverage statistics

### 4. NPM Scripts
```bash
npm run docs:generate   # Generate all documentation
npm run docs:coverage   # Show coverage report
npm run docs:test       # Validate generation
```

## How to Use

### Generate Documentation

```bash
# One-time setup
npm install

# Generate documentation
npm run docs:generate

# View HTML documentation
open docs/api/index.html
```

### Check Coverage

```bash
npm run docs:coverage
```

Output shows documentation coverage for Swift methods, properties, and JS functions.

### Run Tests

```bash
npm run docs:test
```

Validates that all documentation generates correctly.

## Documentation Files

- **docs/SYSTEM.md** - Complete technical guide
- **docs/EXAMPLES.md** - Usage examples and best practices  
- **docs/README.md** - User-facing overview
- **README.md** - Updated main project README

## What's Documented

All 10 modules are processed:
- hs.alert - Display on-screen alerts
- hs.appinfo - Application metadata
- hs.application - Application control
- hs.ax - Accessibility API
- hs.console - Console window control
- hs.hash - Hashing utilities
- hs.hotkey - Keyboard hotkeys
- hs.permissions - Permission management
- hs.timer - Scheduled callbacks
- hs.window - Window management

## Example Output

### JSON (docs/json/hs.timer.json)
```json
{
  "name": "hs.timer",
  "swift": {
    "protocols": [{
      "methods": [
        {
          "name": "new",
          "signature": "func new(...) -> HSTimerObject",
          "documentation": "Create a new timer...",
          "params": [...],
          "returns": {...}
        }
      ]
    }]
  },
  "javascript": {
    "functions": [...]
  }
}
```

### HTML (docs/api/index.html)
Browsable documentation with:
- Module index
- Function/method listings
- Parameter types
- Return values
- Search functionality

## Coverage Statistics

Current documentation coverage:
- Swift Methods: 60/65 (92%)
- Swift Properties: 6/7 (86%)
- JS Functions: 0/25 (0% - simple implementations)
- Overall: 66/97 (68%)

## Adding Documentation

### In Swift Files
```swift
/// Brief description
/// - Parameter name: Description
/// - Returns: Description
@objc func methodName(_ param: Type) -> ReturnType
```

### In JavaScript Files
```javascript
/**
 * Brief description
 * @param {type} name - Description
 * @returns {type} Description
 */
hs.module.functionName = function(param) { }
```

## Files Changed

- `package.json` - NPM configuration
- `jsdoc.config.json` - JSDoc settings
- `.gitignore` - Exclude node_modules
- `scripts/extract-docs.js` - Main extraction script
- `scripts/test-docs.sh` - Test script
- `scripts/docs-coverage.js` - Coverage reporter
- `docs/` - Documentation and generated files
- `README.md` - Updated project README

## Next Steps

1. Review the generated documentation at `docs/api/index.html`
2. Check coverage with `npm run docs:coverage`
3. Consider adding JSDoc comments to JavaScript enhancement files
4. Optionally exclude `docs/api/` and `docs/json/` from git (currently included for review)

## Questions?

See the comprehensive guides:
- **docs/SYSTEM.md** - Full system documentation
- **docs/EXAMPLES.md** - Usage examples
