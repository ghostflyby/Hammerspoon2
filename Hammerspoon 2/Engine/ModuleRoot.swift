//
//  ModuleRoot.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 27/09/2025.
//

import Foundation
import JavaScriptCore

@objc protocol ModuleRootAPI: JSExport {
    @objc var timer: HSTimer { get }
}

@objc class ModuleRoot: NSObject, ModuleRootAPI {
    @objc var modules: [String: any HSModule] = [:]
    @objc var timer: HSTimer { get { getOrCreate(name: "timer", type: HSTimer.self) } }

    private func getOrCreate<T>(name: String, type: T.Type) -> T where T:HSModule {
        if let result = modules[name] as? T {
            return result
        } else {
            let module = type.init()
            modules[name] = module
            return module
        }
    }
}
