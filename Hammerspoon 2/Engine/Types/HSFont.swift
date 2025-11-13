//
//  Font.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 13/11/2025.
//

import Foundation
import JavaScriptCore
import SwiftUI

@objc protocol HSFontJSExports: JSExport {
    @objc var sizes: [String] { get }
    init(size: String)
}

@objc class HSFont: NSObject, HSFontJSExports {
    @objc var sizes = [
        "body",
        "title"
    ]
    var font: Font = .body

    required init(size: String) {
        guard sizes.contains(size) else {
            AKError("Unknown font size: \(size)")
            return
        }
        switch size {
        case "body":
            font = .body
        case "caption":
            font = .caption
        case "title":
            font = .title
        case "title2":
            font = .title2
        case "title3":
            font = .title3
        // FIXME: Add more of these, or figure out a smarter way to do this
        default:
            return
        }
    }
}
