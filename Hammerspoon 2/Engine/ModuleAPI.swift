//
//  ModuleAPI.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 27/09/2025.
//

import Foundation
import JavaScriptCore

@_documentation(visibility: private)
@objc protocol HSModuleAPI: JSExport {
    @objc var name: String { get }
    init()
}

@objc class HSModule: NSObject, HSModuleAPI {
    @objc var name = "BASE MODULE (you should never see this)"

    required override init() {}

    deinit {
        print("deinit of \(name)")
    }
}
