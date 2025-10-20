//
//  Permissions.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 17/10/2025.
//

import Foundation
import JavaScriptCore

@objc protocol HSPermissionsAPI: JSExport {
    @objc func checkAccessibility() -> Bool
    @objc func requestAccessibility()
}

@_documentation(visibility: private)
@objc class HSPermissions: HSModule, HSPermissionsAPI {
    required init() {
        super.init()
        self.name = "hs.permissions"
    }

    @objc func checkAccessibility() -> Bool {
        return PermissionsManager.shared.check(.accessibility) == .trusted
    }

    @objc func requestAccessibility() {
        PermissionsManager.shared.request(.accessibility)
    }
}
