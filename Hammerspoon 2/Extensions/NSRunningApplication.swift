//
//  NSRunningApplication.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 17/10/2025.
//

import Foundation
import JavaScriptCore
import Cocoa

/// API provided by NSRunningApplication objects
@_documentation(visibility: private)
@objc protocol NSRunningApplicationExports: JSExport {
    @objc var pid: Int { get }
    @objc var bundleID: String? { get }

    @objc var isHidden: Bool { get }
    @objc var isActive: Bool { get }

    @objc func hide() -> Bool
    @objc func unhide() -> Bool
}

@_documentation(visibility: private)
@objc extension NSRunningApplication: @retroactive JSExport {}

@_documentation(visibility: private)
@objc extension NSRunningApplication: @MainActor NSRunningApplicationExports {
    @objc var pid: Int { Int(self.processIdentifier) }
    @objc var bundleID: String? { self.bundleIdentifier }
}
