//
//  ManagerManager.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 08/10/2025.
//

import Foundation
import AppKit

@_documentation(visibility: private)
class ManagerManager {
    // Singleton instance using default dependencies
    static let shared = ManagerManager()

    // Dependencies (protocols for testability)
    let engine: JSEngineProtocol
    let settings: SettingsManagerProtocol
    let fileSystem: FileSystemProtocol

    /// Initializer with dependency injection
    /// - Parameters:
    ///   - engine: The JavaScript engine to use (defaults to JSEngine.shared)
    ///   - settings: The settings manager to use (defaults to SettingsManager.shared)
    ///   - fileSystem: The file system to use (defaults to FileManager.default)
    init(engine: JSEngineProtocol = JSEngine.shared,
         settings: SettingsManagerProtocol = SettingsManager.shared,
         fileSystem: FileSystemProtocol = FileManager.default) {
        self.engine = engine
        self.settings = settings
        self.fileSystem = fileSystem
    }

    func boot() throws {
        try engine.resetContext()

        if !fileSystem.fileExists(atPath: settings.configLocation.path) {
            AKError("No config file found at: \(settings.configLocation.path)")
            return
        }
        try engine.evalFromURL(settings.configLocation)
    }

    func shutdown() {
        NSApp.terminate(self)
    }
}
