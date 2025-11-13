//
//  AlertObject.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 13/11/2025.
//

import Foundation
import JavaScriptCore
import SwiftUI

@objc protocol HSAlertObjectAPI: JSExport {
    @objc var message: String { get set }
    @objc var expire: Int { get set }
    @objc var fontSize: HSFont { get set }
    @objc var padding: Int { get set }
}

@objc class HSAlertObject: NSObject, HSAlertObjectAPI {
    @objc var message: String = ""
    @objc var expire: Int = 5
    @objc var fontSize: HSFont = HSFont(size: "body")
    @objc var padding: Int = -1

    var swiftUIPadding: CGFloat? {
        guard padding >= 0 else {
            return nil
        }
        return CGFloat(padding)
    }
    var swiftUIFont: Font {
        return fontSize.font
    }
}
