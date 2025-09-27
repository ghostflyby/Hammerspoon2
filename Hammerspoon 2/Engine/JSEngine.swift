//
//  HammerCore.swift
//  Hammerspoon 2 Demo
//
//  Created by Chris Jones on 23/09/2025.
//

import Foundation
import JavaScriptCore

@objc protocol HammerspoonModule: JSExport {
    @objc var name: String { get }
}

class JSEngine {
    static let shared = JSEngine()

    var id = UUID()
    private var vm: JSVirtualMachine?
    private var context: JSContext?

    subscript(key: String) -> Any? {
        get {
            context?.objectForKeyedSubscript(key as (NSCopying & NSObjectProtocol))
        }
        set {
            context?.setObject(newValue, forKeyedSubscript: key as (NSCopying & NSObjectProtocol))
        }
    }

    @discardableResult func eval(_ script: String) -> Any? {
        return context?.evaluateScript(script)?.toObject()
    }

    // MARK: - Log handling
    func injectLogging() {
        // Provide console.log
        let consoleLog: @convention(block) (Any?) -> Void = { message in
            AKInfo("JS console: \(message ?? "nil")")
        }

        let console = JSValue(newObjectIn: context)!
        console.setObject(consoleLog, forKeyedSubscript: "log" as (NSCopying & NSObjectProtocol))
        context?.setObject(console, forKeyedSubscript: "console" as (NSCopying & NSObjectProtocol))

        // Exception handler
        context?.exceptionHandler = { _, exception in
            AKError("JavaScript Error: \(exception?.toString() ?? "unknown")")
        }
    }

    // MARK: - JSContext Managing
    func createContext() throws(HammerspoonError) {
        AKTrace("createContext()")
        vm = JSVirtualMachine()
        guard vm != nil else {
            throw HammerspoonError(.vmCreation, msg: "Unknown error (vm)")
        }

        context = JSContext(virtualMachine: vm)
        guard context != nil else {
            throw HammerspoonError(.vmCreation, msg: "Unknown error (context)")
        }

        context?.name = "Hammerspoon \(id)"
        injectLogging()
        injectModules()
    }

    func deleteContext() {
        AKTrace("deleteContext()")
        // FIXME: This will need to go through and cleanup any resources currently held by our modules
        context = nil
        vm = nil
    }

    func resetContext() throws {
        AKTrace("resetContext()")
        deleteContext()
        try createContext()
    }

    // MARK: - Module registration
    func register(_ name: String, object: any HammerspoonModule) {
        guard self[name] == nil else {
            AKError("Module '\(name)' already registered")
            return
        }

        self[name] = object
    }

    func injectModules() {
        let modules = [
            "timer": HSTimer()
        ]

        for (module, object) in modules {
            register(module, object: object)
        }
    }
}

