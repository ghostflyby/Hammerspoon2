//
//  WindowModule.swift
//  Hammerspoon 2
//
//  Created by Claude Code
//

import Foundation
import JavaScriptCore
import AppKit
import AXSwift

// MARK: - Declare our JavaScript API

/// Module for interacting with windows
@objc protocol HSWindowsAPI: JSExport {
    /// Get the currently focused window
    /// - Returns: The focused window, or nil if none
    @objc func focusedWindow() -> HSWindow?

    /// Get all windows from all applications
    /// - Returns: An array of all windows
    @objc func allWindows() -> [HSWindow]

    /// Get all visible (not minimized) windows
    /// - Returns: An array of visible windows
    @objc func visibleWindows() -> [HSWindow]

    /// Get windows for a specific application
    /// - Parameter pid: The process identifier of the application
    /// - Returns: An array of windows for that application
    @objc func windowsForApp(_ pid: Int) -> [HSWindow]

    /// Get all windows on a specific screen
    /// - Parameter screenIndex: The screen index (0 for main screen)
    /// - Returns: An array of windows on that screen
    @objc func windowsOnScreen(_ screenIndex: Int) -> [HSWindow]

    /// Get the window at a specific screen position
    /// - Parameters:
    ///   - x: The x coordinate
    ///   - y: The y coordinate
    /// - Returns: The topmost window at that position, or nil if none
    @objc func windowAtPosition(_ x: Int, _ y: Int) -> HSWindow?

    /// Get ordered windows (front to back)
    /// - Returns: An array of windows in z-order
    @objc func orderedWindows() -> [HSWindow]
}

// MARK: - Implementation

@_documentation(visibility: private)
@MainActor
@objc class HSWindowModule: NSObject, HSModuleAPI, HSWindowsAPI {
    var name = "hs.window"

    override required init() {
        super.init()
    }

    func shutdown() {
        // No cleanup needed for this module
    }

    deinit {
        print("Deinit of \(name)")
    }

    // MARK: - Helper Methods

    private func checkAccessibility() -> Bool {
        guard AXIsProcessTrusted() else {
            AKError("hs.window: Accessibility permissions not granted")
            return false
        }
        return true
    }

    private func getWindowElements(for app: NSRunningApplication) -> [UIElement] {
        guard let axApp = Application(app) else {
            return []
        }

        do {
            let windows: [UIElement] = try axApp.windows() ?? []
            return windows
        } catch {
            AKTrace("Failed to get windows for \(app.localizedName ?? "unknown"): \(error.localizedDescription)")
            return []
        }
    }

    // MARK: - API Implementation

    @objc func focusedWindow() -> HSWindow? {
        guard checkAccessibility() else { return nil }

        guard let frontApp = NSWorkspace.shared.frontmostApplication else {
            return nil
        }

        guard let axApp = Application(frontApp) else {
            return nil
        }

        do {
            guard let focusedWindow: UIElement = try axApp.attribute(.focusedWindow) else {
                return nil
            }

            return HSWindow(element: focusedWindow, app: frontApp)
        } catch {
            AKTrace("Failed to get focused window: \(error.localizedDescription)")
            return nil
        }
    }

    @objc func allWindows() -> [HSWindow] {
        guard checkAccessibility() else { return [] }

        var windows: [HSWindow] = []

        for app in NSWorkspace.shared.runningApplications {
            let windowElements = getWindowElements(for: app)
            windows.append(contentsOf: windowElements.map { HSWindow(element: $0, app: app) })
        }

        return windows
    }

    @objc func visibleWindows() -> [HSWindow] {
        return allWindows().filter { !$0.isMinimized }
    }

    @objc func windowsForApp(_ pid: Int) -> [HSWindow] {
        guard checkAccessibility() else { return [] }

        guard let app = NSWorkspace.shared.runningApplications.first(where: { $0.processIdentifier == pid }) else {
            AKWarning("hs.window.windowsForApp(): No application found with pid \(pid)")
            return []
        }

        let windowElements = getWindowElements(for: app)
        return windowElements.map { HSWindow(element: $0, app: app) }
    }

    @objc func windowsOnScreen(_ screenIndex: Int) -> [HSWindow] {
        let screens = NSScreen.screens
        guard screenIndex >= 0 && screenIndex < screens.count else {
            AKWarning("hs.window.windowsOnScreen(): Invalid screen index \(screenIndex)")
            return []
        }

        let screen = screens[screenIndex]
        let screenFrame = screen.frame

        return visibleWindows().filter { window in
            guard let frame = window.frame,
                  let x = frame["x"], let y = frame["y"],
                  let w = frame["w"], let h = frame["h"] else {
                return false
            }

            let windowRect = CGRect(x: x, y: y, width: w, height: h)
            return screenFrame.intersects(windowRect)
        }
    }

    @objc func windowAtPosition(_ x: Int, _ y: Int) -> HSWindow? {
        guard checkAccessibility() else { return nil }

        do {
            let systemWide = try SystemWideElement()
            let position = CGPoint(x: x, y: y)

            guard let element: UIElement = try systemWide.elementAtPosition(position) else {
                return nil
            }

            // Walk up the hierarchy to find the window
            var current: UIElement? = element
            while let elem = current {
                if let role = try? elem.role(), role == .window {
                    // Find the app for this window
                    let pid = elem.pid
                    if let app = NSWorkspace.shared.runningApplications.first(where: { $0.processIdentifier == pid }) {
                        return HSWindow(element: elem, app: app)
                    }
                }

                current = try? elem.attribute(.parent)
            }

            return nil
        } catch {
            AKError("hs.window.windowAtPosition(): Failed: \(error.localizedDescription)")
            return nil
        }
    }

    @objc func orderedWindows() -> [HSWindow] {
        guard checkAccessibility() else { return [] }

        // Get windows from apps in activation order
        var orderedApps: [NSRunningApplication] = []

        // Start with frontmost app
        if let frontApp = NSWorkspace.shared.frontmostApplication {
            orderedApps.append(frontApp)
        }

        // Add other apps
        for app in NSWorkspace.shared.runningApplications {
            if app.activationPolicy == .regular && !orderedApps.contains(app) {
                orderedApps.append(app)
            }
        }

        var windows: [HSWindow] = []
        for app in orderedApps {
            let appWindows = getWindowElements(for: app).map { HSWindow(element: $0, app: app) }
            windows.append(contentsOf: appWindows)
        }

        return windows
    }
}
