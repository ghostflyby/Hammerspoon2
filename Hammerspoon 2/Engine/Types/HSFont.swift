//
//  Font.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 13/11/2025.
//

import Foundation
import JavaScriptCore
import SwiftUI

/// A font object
@objc protocol HSFontJAPI: HSTypeAPI, JSExport {
    // Text style static factory methods
    /// Body text style
    /// - Returns: An HSFont object
    static func body() -> HSFont
    static func callout() -> HSFont
    static func caption() -> HSFont
    static func caption2() -> HSFont
    static func footnote() -> HSFont
    static func headline() -> HSFont
    static func largeTitle() -> HSFont
    static func subheadline() -> HSFont
    static func title() -> HSFont
    static func title2() -> HSFont
    static func title3() -> HSFont

    // System fonts
    /// The system font in a custom size
    /// - Parameter size: The font size in points
    /// - Returns: An HSFont object
    static func system(_ size: Double) -> HSFont
    static func system(_ size: Double, weight: String) -> HSFont

    // Custom fonts
    static func custom(_ name: String, size: Double) -> HSFont
}

@objc class HSFont: NSObject, HSFontJAPI {
    @objc var typeName = "HSFont"
    var font: Font

    private init(font: Font) {
        self.font = font
        super.init()
    }

    // MARK: - Text Styles

    @objc static func body() -> HSFont {
        HSFont(font: .body)
    }

    @objc static func callout() -> HSFont {
        HSFont(font: .callout)
    }

    @objc static func caption() -> HSFont {
        HSFont(font: .caption)
    }

    @objc static func caption2() -> HSFont {
        HSFont(font: .caption2)
    }

    @objc static func footnote() -> HSFont {
        HSFont(font: .footnote)
    }

    @objc static func headline() -> HSFont {
        HSFont(font: .headline)
    }

    @objc static func largeTitle() -> HSFont {
        HSFont(font: .largeTitle)
    }

    @objc static func subheadline() -> HSFont {
        HSFont(font: .subheadline)
    }

    @objc static func title() -> HSFont {
        HSFont(font: .title)
    }

    @objc static func title2() -> HSFont {
        HSFont(font: .title2)
    }

    @objc static func title3() -> HSFont {
        HSFont(font: .title3)
    }

    // MARK: - System Fonts

    @objc static func system(_ size: Double) -> HSFont {
        HSFont(font: .system(size: size))
    }

    @objc static func system(_ size: Double, weight: String) -> HSFont {
        let fontWeight: Font.Weight
        switch weight.lowercased() {
        case "ultralight":
            fontWeight = .ultraLight
        case "thin":
            fontWeight = .thin
        case "light":
            fontWeight = .light
        case "regular":
            fontWeight = .regular
        case "medium":
            fontWeight = .medium
        case "semibold":
            fontWeight = .semibold
        case "bold":
            fontWeight = .bold
        case "heavy":
            fontWeight = .heavy
        case "black":
            fontWeight = .black
        default:
            AKError("Unknown font weight: \(weight), using regular")
            fontWeight = .regular
        }
        return HSFont(font: .system(size: size, weight: fontWeight))
    }

    // MARK: - Custom Fonts

    @objc static func custom(_ name: String, size: Double) -> HSFont {
        HSFont(font: .custom(name, size: size))
    }
}
