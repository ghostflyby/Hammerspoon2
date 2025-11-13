//
//  AlertModule.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 13/11/2025.
//


import Foundation
import JavaScriptCore
import AppKit
import SwiftUI

// MARK: - Declare our JavaScript API

/// Module for accessing information about the Hammerspoon application itself
@objc protocol HSAlertModuleAPI: JSExport {
    @objc func newAlert() -> HSAlertObject
    @objc func showAlert(_ alert: HSAlertObject)
}

// MARK: - Implementation

@_documentation(visibility: private)
@objc class HSAlertModule: NSObject, HSModuleAPI, HSAlertModuleAPI {
    var name = "hs.alert"

    // MARK: - Module lifecycle
    override required init() {
        super.init()
    }

    func shutdown() {}

    deinit {
        print("Deinit of \(name)")
    }

    func makeAlertWindow(for screen: NSScreen, message: HSAlertObject) -> NSWindow {
        let window = NSWindow(contentRect: screen.visibleFrame, styleMask: [.borderless], backing: .buffered, defer: false)

        window.contentView = NSHostingView(rootView: AlertView(message: message))
        window.isOpaque = false
        window.backgroundColor = .clear
        window.ignoresMouseEvents = true
        window.level = .screenSaver
        window.isReleasedWhenClosed = false

        return window
    }

    @objc func newAlert() -> HSAlertObject {
        return HSAlertObject()
    }

    @objc func showAlert(_ alert: HSAlertObject) {
        guard let screen = NSScreen.main else {
            AKError("Unable to find main screen for alert")
            return
        }

        let window = makeAlertWindow(for: screen, message: alert)

        window.makeKeyAndOrderFront(nil)
        window.orderFrontRegardless()

        Task { @MainActor in
            AKTrace("Sleeping alert for \(alert.expire)s")
            try? await Task.sleep(for: .seconds(alert.expire))
            AKTrace("Closing alert")
            window.orderOut(nil)
        }
    }
}
