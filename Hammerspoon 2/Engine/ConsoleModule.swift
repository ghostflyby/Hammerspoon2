//
//  ConsoleModule.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 24/12/2025.
//

import Foundation
import JavaScriptCore

@_documentation(visibility: private)
@objc protocol ConsoleModuleAPI: JSExport {
    @objc func log(_ message: String)
    @objc func error(_ message: String)
    @objc func warn(_ message: String)
    @objc func info(_ message: String)
    @objc func debug(_ message: String)
}

@_documentation(visibility: private)
@objc class ConsoleModule: NSObject, ConsoleModuleAPI {
    @objc func log(_ message: String) {
        AKConsole(message)
    }
    
    @objc func error(_ message: String) {
        AKError(message)
    }

    @objc func warn(_ message: String) {
        AKWarning(message)
    }

    @objc func info(_ message: String) {
        AKInfo(message)
    }

    @objc func debug(_ message: String) {
        AKTrace(message)
    }
}
