//
//  SettingsManagerProtocol.swift
//  Hammerspoon 2
//
//  Created by Claude on 05/11/2025.
//

import Foundation

/// Protocol abstraction for settings management to enable dependency injection and testability
@_documentation(visibility: private)
protocol SettingsManagerProtocol {
    /// The location of the user's configuration file
    var configLocation: URL { get set }

    /// The maximum number of console history entries to retain
    var consoleHistoryLength: Int { get set }

    /// Resets all settings to their default values
    func resetToDefaults()
}
