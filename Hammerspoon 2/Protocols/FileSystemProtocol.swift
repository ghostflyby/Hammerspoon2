//
//  FileSystemProtocol.swift
//  Hammerspoon 2
//
//  Created by Claude on 05/11/2025.
//

import Foundation

/// Protocol abstraction for file system operations to enable dependency injection and testability
@_documentation(visibility: private)
protocol FileSystemProtocol {
    /// Checks if a file exists at the given path
    /// - Parameter path: The file path to check
    /// - Returns: true if the file exists, false otherwise
    func fileExists(atPath path: String) -> Bool

    /// Reads the contents of a file as a string
    /// - Parameter url: The URL of the file to read
    /// - Returns: The contents of the file as a string
    /// - Throws: Error if the file cannot be read
    func contentsOf(url: URL) throws -> String
}

/// FileManager extension to conform to FileSystemProtocol
extension FileManager: FileSystemProtocol {
    func contentsOf(url: URL) throws -> String {
        return try String(contentsOf: url, encoding: .utf8)
    }
}
