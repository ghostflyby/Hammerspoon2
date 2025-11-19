# Hammerspoon 2 Documentation System

This directory contains the documentation extraction and generation system for Hammerspoon 2's JavaScript API.

## Overview

The documentation system extracts API information from two sources:
1. **Swift JSExport protocols** - Core functionality exposed from Swift to JavaScript
2. **JavaScript enhancement files** - Convenience functions and higher-level abstractions

The system combines these sources and generates documentation in two formats:
- **JSON** - Machine-readable structured data
- **HTML** - Human-readable browsable documentation

## Quick Start

```bash
# Install dependencies
npm install

# Generate all documentation (JSON + HTML)
npm run docs:generate

# Generate only JSON (extracts from Swift and JS files)
npm run docs:extract

# Generate only HTML (from JSON)
npm run docs:html

# Check documentation coverage statistics
npm run docs:coverage

# Run validation tests
npm run docs:test

# Clean all generated documentation
npm run docs:clean
```

## How It Works

### 1. Extraction (`scripts/extract-docs.js`)

The extraction script:

- Scans `Hammerspoon 2/Modules/hs.*/` directories
- Parses Swift files to extract `@objc protocol` JSExport declarations
- Extracts documentation from `///` comments in Swift
- Parses JavaScript files to extract JSDoc comments and function definitions
- Combines data by module and outputs to `docs/json/`

**Swift Parsing:**
- Finds `@objc protocol XyzAPI: JSExport` declarations
- Extracts method signatures, parameters, and return types
- Captures `///` documentation comments
- Categorizes as "module" or "object" based on file naming

**JavaScript Parsing:**
- Finds JSDoc comments (`/** */`)
- Extracts `@param`, `@returns`, `@example` tags
- Captures function definitions (both `function name()` and `name = function()` syntax)

### 2. Type Conversion

Swift types are converted to JSDoc-compatible types:
- `[Type]` → `Array<Type>`
- `[Key: Value]` → `Object<Key, Value>`
- `String` → `string`
- `Int`, `Double`, `Float` → `number`
- `Bool` → `boolean`
- `Any` → `*`

### 3. HTML Generation (JSDoc)

Uses JSDoc with the Docdash template to generate browsable HTML documentation from the combined data.

## Output Structure

```
docs/
├── README.md                    # This file
├── json/                        # Machine-readable structured data
│   ├── index.json              # Index of all modules
│   ├── hs.alert.json           # Per-module JSON
│   ├── hs.window.json
│   └── combined/               # JSDoc-compatible combined files
│       ├── hs.alert.js
│       └── hs.window.js
└── api/                        # HTML documentation
    ├── index.html
    ├── hs.module_alert.html
    └── ...
```

## JSON Format

Each module's JSON file contains:

```json
{
  "name": "hs.modulename",
  "swift": {
    "protocols": [
      {
        "name": "HSModuleNameAPI",
        "type": "protocol",
        "category": "module",
        "methods": [
          {
            "name": "methodName",
            "signature": "func methodName(...) -> ReturnType",
            "documentation": "Method description",
            "params": [{"name": "param", "type": "Type"}],
            "returns": {"type": "Type", "description": "..."}
          }
        ],
        "properties": [...]
      }
    ]
  },
  "javascript": {
    "functions": [
      {
        "name": "hs.modulename.functionName",
        "params": ["param1", "param2"],
        "documentation": {
          "description": "...",
          "params": [...],
          "returns": {...}
        }
      }
    ]
  }
}
```

## Adding Documentation

### In Swift Files

Use `///` comments above methods and properties in `@objc protocol` declarations:

```swift
@objc protocol HSExampleAPI: JSExport {
    /// Brief description of the method
    /// - Parameter param: Description of parameter
    /// - Returns: Description of return value
    @objc func exampleMethod(_ param: String) -> Bool
}
```

### In JavaScript Files

Use JSDoc comments above function definitions:

```javascript
/**
 * Brief description of the function
 * @param {string} param - Description of parameter
 * @returns {boolean} Description of return value
 * @example
 * hs.example.functionName("value")
 */
hs.example.functionName = function(param) {
    // implementation
}
```

## Extending the System

### Adding a New Module

1. Create module directory: `Hammerspoon 2/Modules/hs.newmodule/`
2. Add Swift files with JSExport protocols
3. Optionally add `hs.newmodule.js` with JavaScript enhancements
4. Run `npm run docs:generate`

The documentation will be automatically included.

### Customizing the HTML Output

Edit `jsdoc.config.json` to customize:
- Template settings
- Output destination
- Plugins
- Display options

## Troubleshooting

**"Unable to parse a tag's type expression"**
- Check that Swift types are being properly converted
- Verify dictionary types use `Object<K, V>` in output
- Ensure array types use `Array<T>` in output

**Missing methods in output**
- Verify the protocol extends `JSExport`
- Check that methods are marked with `@objc`
- Ensure methods are inside the protocol `{}`

**JavaScript functions not appearing**
- Add JSDoc comments for better documentation
- Check that function syntax is recognized (see `parseJavaScriptFile`)

## Dependencies

- **jsdoc** - HTML documentation generator
- **docdash** - Clean JSDoc template
- **jsdoc-to-markdown** - Markdown generation (optional)

## Future Enhancements

Possible improvements:
- Generate Markdown documentation for GitHub
- Add search functionality to HTML docs
- Cross-reference Swift and JavaScript components
- Generate TypeScript definitions
- Add example code validation
- Generate API comparison between versions
