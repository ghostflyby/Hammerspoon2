//
//  Console.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 08/10/2025.
//

import Foundation
import JavaScriptCore
import AppKit

@objc protocol HSConsoleAPI: JSExport {
    @objc func open()
    @objc func close()
}

@objc class HSConsole: NSObject, HSModule, HSConsoleAPI {
    @objc var name = "Console"

    required override init() {}
    
    @objc func open() {
        if let url = URL(string:"hammerspoon2://openConsole") {
            NSWorkspace.shared.open(url)
        }
    }

    @objc func close() {
        if let url = URL(string:"hammerspoon2://closeConsole") {
            NSWorkspace.shared.open(url)
        }
    }
}

