# Hammerspoon 2

A modernized rewrite of [Hammerspoon](https://github.com/Hammerspoon/hammerspoon) - a powerful macOS application for automating your Mac using JavaScript.

## Features

- **JavaScript API** - Script your Mac using modern JavaScript
- **Modular Architecture** - Clean separation of concerns across modules
- **Swift + JavaScript** - Core functionality in Swift, enhancements in JavaScript
- **Accessibility API** - Control windows, applications, and UI elements
- **Timers & Hotkeys** - Schedule callbacks and bind keyboard shortcuts
- **Console** - Built-in console for testing and debugging

## Modules

Hammerspoon 2 provides several modules for different functionality:

- **hs.alert** - Display on-screen alerts
- **hs.application** - Control and monitor applications  
- **hs.appinfo** - Access Hammerspoon application metadata
- **hs.ax** - Low-level accessibility API access
- **hs.console** - Control the Hammerspoon console window
- **hs.hash** - Encoding and hashing utilities
- **hs.hotkey** - Keyboard hotkey management
- **hs.permissions** - System permission management
- **hs.timer** - Scheduled callbacks and timers
- **hs.window** - High-level window management

See the [Modules README](Modules/README.md) for detailed documentation.

## API Documentation

Comprehensive API documentation is available in multiple formats:

### Generate Documentation

```bash
# Install dependencies
npm install

# Generate all documentation (JSON + HTML)
npm run docs:generate

# View HTML documentation
open docs/api/index.html
```

The documentation system extracts API information from:
1. Swift JSExport protocols (documented with `///` comments)
2. JavaScript enhancement files (documented with JSDoc comments)

See [docs/SYSTEM.md](docs/SYSTEM.md) for details on the documentation system.

### Documentation Formats

- **HTML** - Browse at `docs/api/index.html` after generation
- **JSON** - Machine-readable format in `docs/json/`
  - Individual modules: `docs/json/hs.modulename.json`
  - Module index: `docs/json/index.json`

## Examples

See the `examples/` directory for working examples:

- `examples/window-management-example.js` - Comprehensive window management examples

## Development

### Building

This is an Xcode project. Open `Hammerspoon 2.xcodeproj` in Xcode to build.

### Project Structure

```
Hammerspoon 2/
├── Engine/              # JavaScript engine integration
├── Modules/             # API modules (Swift + JS)
│   └── hs.*/           # Individual modules
├── Windows/            # UI components
└── Managers/           # Application managers

docs/                   # Documentation
├── api/               # Generated HTML docs
├── json/              # Generated JSON data
└── SYSTEM.md          # Documentation system guide

scripts/               # Build and documentation scripts
```

### Adding a New Module

1. Create module directory: `Hammerspoon 2/Modules/hs.newmodule/`
2. Add `ModuleNameModule.swift` with `@objc protocol` JSExport
3. Optionally add `hs.newmodule.js` for JavaScript enhancements
4. Document with `///` comments in Swift and JSDoc in JavaScript
5. Generate docs: `npm run docs:generate`

See [Modules README](Modules/README.md) for detailed module development guide.

## License

See the LICENSE file for details.

## Acknowledgments

This is a modernized rewrite of the original [Hammerspoon](https://github.com/Hammerspoon/hammerspoon) project.
