//
//  AXModule.swift
//  Hammerspoon 2
//
//  Created by Claude Code
//

import Foundation
import JavaScriptCore
import AppKit
import AXSwift

// MARK: - Declare our JavaScript API

/// Module for interacting with the macOS Accessibility API
@objc protocol HSAXModuleAPI: JSExport {
    /// Get the system-wide accessibility element
    /// - Returns: The system-wide AXElement, or nil if accessibility is not available
    @objc func systemWideElement() -> HSAXElement?

    /// Get the accessibility element for an application
    /// - Parameter pid: The process identifier of the application
    /// - Returns: The application's AXElement, or nil if not found
    @objc func applicationElement(_ pid: Int) -> HSAXElement?

    /// Get the accessibility element at a specific screen position
    /// - Parameters:
    ///   - x: The x coordinate
    ///   - y: The y coordinate
    /// - Returns: The AXElement at that position, or nil if none found
    @objc func elementAtPosition(_ x: Int, _ y: Int) -> HSAXElement?

    /// Check if the application has accessibility permissions
    /// - Returns: true if accessibility is enabled, false otherwise
    @objc func isAccessibilityEnabled() -> Bool

    /// Request accessibility permissions (will prompt the user)
    /// - Returns: true if accessibility is enabled after the request
    @objc func requestAccessibility() -> Bool
}

// MARK: - Implementation

@_documentation(visibility: private)
@MainActor
@objc class HSAXModule: NSObject, HSModuleAPI, HSAXModuleAPI {
    var name = "hs.ax"

    override required init() {
        super.init()
    }

    func shutdown() {
        // No cleanup needed for this module
    }

    deinit {
        print("Deinit of \(name)")
    }

    // MARK: - API Implementation

    @objc func systemWideElement() -> HSAXElement? {
        guard isAccessibilityEnabled() else {
            AKError("hs.ax.systemWideElement(): Accessibility permissions not granted")
            return nil
        }

        do {
            let systemWide = try SystemWideElement()
            return HSAXElement(element: systemWide)
        } catch {
            AKError("hs.ax.systemWideElement(): Failed to get system-wide element: \(error.localizedDescription)")
            return nil
        }
    }

    @objc func applicationElement(_ pid: Int) -> HSAXElement? {
        guard isAccessibilityEnabled() else {
            AKError("hs.ax.applicationElement(): Accessibility permissions not granted")
            return nil
        }

        guard let app = NSWorkspace.shared.runningApplications.first(where: { $0.processIdentifier == pid }) else {
            AKError("hs.ax.applicationElement(): No application found with pid \(pid)")
            return nil
        }

        guard let axApp = Application(app) else {
            AKError("hs.ax.applicationElement(): Failed to create AX element for pid \(pid)")
            return nil
        }

        return HSAXElement(element: axApp)
    }

    @objc func elementAtPosition(_ x: Int, _ y: Int) -> HSAXElement? {
        guard isAccessibilityEnabled() else {
            AKError("hs.ax.elementAtPosition(): Accessibility permissions not granted")
            return nil
        }

        do {
            let systemWide = try SystemWideElement()
            let position = CGPoint(x: x, y: y)

            if let element: UIElement = try systemWide.elementAtPosition(position) {
                return HSAXElement(element: element)
            }

            return nil
        } catch {
            AKError("hs.ax.elementAtPosition(): Failed to get element at (\(x), \(y)): \(error.localizedDescription)")
            return nil
        }
    }

    @objc func isAccessibilityEnabled() -> Bool {
        return AXIsProcessTrusted()
    }

    @objc func requestAccessibility() -> Bool {
        let options = [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true]
        return AXIsProcessTrustedWithOptions(options as CFDictionary)
    }
}
