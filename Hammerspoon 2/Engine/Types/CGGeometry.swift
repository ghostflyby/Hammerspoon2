//
//  CGGeometry.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 03/11/2025.
//

import Foundation
import JavaScriptCore
import CoreGraphics

// ---------------------------------------------------------------
// MARK: - Existing Bridge Classes (from before)
// ---------------------------------------------------------------

@objc protocol HSPointJSExports: JSExport {
    var x: Double { get set }
    var y: Double { get set }
    init(x: Double, y: Double)
}

@objc class HSPoint: NSObject, HSPointJSExports {
    var point: CGPoint

    var x: Double {
        get { Double(point.x) }
        set { point.x = CGFloat(newValue) }
    }

    var y: Double {
        get { Double(point.y) }
        set { point.y = CGFloat(newValue) }
    }

    required init(x: Double, y: Double) {
        point = CGPoint(x: x, y: y)
    }
}

@objc protocol HSSizeJSExports: JSExport {
    var w: Double { get set }
    var h: Double { get set }
    init(w: Double, h: Double)
}

@objc class HSSize: NSObject, HSSizeJSExports {
    var size: CGSize

    var w: Double {
        get { Double(size.width) }
        set { size.width = CGFloat(newValue) }
    }

    var h: Double {
        get { Double(size.height) }
        set { size.height = CGFloat(newValue) }
    }

    required init(w: Double, h: Double) {
        size = CGSize(width: w, height: h)
    }
}

@objc protocol HSRectJSExports: JSExport {
    var x: Double { get set }
    var y: Double { get set }
    var w: Double { get set }
    var h: Double { get set }
    var origin: HSPoint { get set }
    var size: HSSize { get set }

    init(x: Double, y: Double, w: Double, h: Double)
}

@objc class HSRect: NSObject, HSRectJSExports {
    var rect: CGRect

    var x: Double {
        get { Double(rect.origin.x) }
        set { rect.origin.x = CGFloat(newValue) }
    }
    var y: Double {
        get { Double(rect.origin.y) }
        set { rect.origin.y = CGFloat(newValue) }
    }
    var w: Double {
        get { Double(rect.size.width) }
        set { rect.size.width = CGFloat(newValue) }
    }
    var h: Double {
        get { Double(rect.size.height) }
        set { rect.size.height = CGFloat(newValue) }
    }

    var origin: HSPoint {
        get { HSPoint(x: x, y: y) }
        set { rect.origin = newValue.point }
    }

    var size: HSSize {
        get { HSSize(w: w, h: h) }
        set { rect.size = newValue.size }
    }

    required init(x: Double, y: Double, w: Double, h: Double) {
        rect = CGRect(x: x, y: y, width: w, height: h)
    }
}

// ---------------------------------------------------------------
// MARK: - Conversion Helpers (Bridge Layer)
// ---------------------------------------------------------------

protocol JSConvertible {
    associatedtype BridgeType: NSObject
    init(from bridge: BridgeType)
    func toBridge() -> BridgeType
}

// --- CGPoint <-> HSPoint ---
extension CGPoint: JSConvertible {
    typealias BridgeType = HSPoint

    init(from bridge: HSPoint) {
        self.init(x: bridge.x, y: bridge.y)
    }

    func toBridge() -> HSPoint {
        HSPoint(x: Double(x), y: Double(y))
    }
}

// --- CGSize <-> HSSize ---
extension CGSize: JSConvertible {
    typealias BridgeType = HSSize

    init(from bridge: HSSize) {
        self.init(width: bridge.w, height: bridge.h)
    }

    func toBridge() -> HSSize {
        HSSize(w: Double(width), h: Double(height))
    }
}

// --- CGRect <-> HSRect ---
extension CGRect: JSConvertible {
    typealias BridgeType = HSRect

    init(from bridge: HSRect) {
        self.init(x: bridge.x, y: bridge.y, width: bridge.w, height: bridge.h)
    }

    func toBridge() -> HSRect {
        HSRect(x: Double(origin.x), y: Double(origin.y),
               w: Double(size.width), h: Double(size.height))
    }
}

// ---------------------------------------------------------------
// MARK: - JSContext Integration
// ---------------------------------------------------------------

extension JSContext {
    /// Registers all bridge types so JS can use them
    func injectGeometryBridges() {
        setObject(HSPoint.self, forKeyedSubscript: "HSPoint" as NSString)
        setObject(HSSize.self, forKeyedSubscript: "HSSize" as NSString)
        setObject(HSRect.self, forKeyedSubscript: "HSRect" as NSString)
    }
}

// Optional: detect and auto-unbox from JSValue
extension JSValue {
    func toCGRect() -> CGRect? {
        guard let bridge = toObjectOf(HSRect.self) as? HSRect else { return nil }
        return CGRect(from: bridge)
    }
    func toCGPoint() -> CGPoint? {
        guard let bridge = toObjectOf(HSPoint.self) as? HSPoint else { return nil }
        return CGPoint(from: bridge)
    }
    func toCGSize() -> CGSize? {
        guard let bridge = toObjectOf(HSSize.self) as? HSSize else { return nil }
        return CGSize(from: bridge)
    }
}
