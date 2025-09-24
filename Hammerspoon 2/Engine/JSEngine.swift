//
//  HammerCore.swift
//  Hammerspoon 2 Demo
//
//  Created by Chris Jones on 23/09/2025.
//

import Foundation
import JavaScriptCore

// MARK: - Test Harness

func runJSCTest() {
    let engine = JSEngine.shared
    try? engine.createContext()

    // Inject TimerManager
    let timerManager = HammerTimerManager()
    engine.context?.setObject(timerManager, forKeyedSubscript: "timerManager" as (NSCopying & NSObjectProtocol))

    // JS Script
    let script = """
    console.log("I AM JAVASCRIPT, WATCH ME RUN");
    console.log("Manager: " + timerManager.description);
    var timer = timerManager.every(2, function(timer) {
        console.log("I AM IN THE TIMER: " + timer);
    });
    console.log("Timer scheduled: " + timer.description);
    """

    // Execute the JS code
    engine.context?.evaluateScript(script)

    print("*** DONE WITH JSCTEST: \(String(describing: engine.context?.exception)) ***")
}

class JSEngine {
    static let shared = JSEngine()

    var vm: JSVirtualMachine?
    var context: JSContext?

    func createContext() throws(HammerspoonError) {
        vm = JSVirtualMachine()
        guard vm != nil else {
            throw HammerspoonError(.vmCreation, msg: "Unknown error (vm)")
        }

        context = JSContext(virtualMachine: vm)
        guard context != nil else {
            throw HammerspoonError(.vmCreation, msg: "Unknown error (context)")
        }

        injectLogging()
    }

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

    func deleteContext() {
        // FIXME: This will need to go through and cleanup any resources currently held by our modules
        context = nil
        vm = nil
    }

    func resetContext() throws {
        deleteContext()
        try createContext()
    }
}

