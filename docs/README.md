# Hammerspoon 2 JavaScript API Documentation

This documentation describes the JavaScript API provided by Hammerspoon 2 for automating macOS.

## Overview

Hammerspoon 2 is a modernized rewrite of [Hammerspoon](https://github.com/Hammerspoon/hammerspoon), a powerful macOS application that allows you to script and automate your Mac using JavaScript.

The API is split across Swift and JavaScript:
- **Swift modules** provide core functionality through JSExport protocols
- **JavaScript enhancements** add convenience functions and higher-level abstractions

## Available Modules

The API is organized into modules, each providing specific functionality:

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

## Documentation Format

This documentation is automatically generated from:
1. Swift JSExport protocol declarations (documented with `///` comments)
2. JavaScript function definitions (documented with JSDoc comments)

The documentation is available in two formats:
- **JSON** - Machine-readable structured data in `docs/json/`
- **HTML** - Human-readable browsable documentation in `docs/api/`

## Generating Documentation

To regenerate the documentation:

```bash
npm install
npm run docs:generate
```

This will:
1. Extract API information from Swift and JavaScript files
2. Combine them by module into JSON files
3. Generate HTML documentation using JSDoc

## Examples

See the `examples/` directory for working examples of using the Hammerspoon 2 API.
