//
//  Windows.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 09/10/2025.
//

/*
 -(NSArray<HSwindow *>*)allWindows {
 NSMutableArray<HSwindow *> *allWindows = [[NSMutableArray alloc] init];
 CFArrayRef windows;
 AXError result = AXUIElementCopyAttributeValues(self.elementRef, kAXWindowsAttribute, 0, 100, &windows);
 if (result == kAXErrorSuccess) {
 CFIndex windowCount = CFArrayGetCount(windows);
 allWindows = [[NSMutableArray alloc] initWithCapacity:windowCount];
 for (NSInteger i = 0; i < windowCount; i++) {
 AXUIElementRef win = CFArrayGetValueAtIndex(windows, i);
 HSwindow *window = [[HSwindow alloc] initWithAXUIElementRef:win];
 [allWindows addObject:window];
 }
 CFRelease(windows);
 }
 return allWindows;
 }
 */

import Foundation
import JavaScriptCore
import AppKit
//
//@objc protocol HSWindowsAPI: JSExport {
//    @objc func allWindows() -> [String]
//}
//
//@_documentation(visibility: private)
//@objc class HSWindows: NSObject, HSModule, HSWindowsAPI {
//    @objc var name = "hs.window"
//
//    var accessibilityManager = AccessibilityManager.shared
//
//    required override init() {}
//
//    @objc func allWindows() -> [String] {
//        let appElement = accessibilityManager.getAXUIElement()
//
//        var windowList: CFArray?
//        let result = AXUIElementCopyAttributeValues(appElement, kAXWindowsAttribute as CFString, 0, 100, &windowList)
//
//        guard result == .success,
//              let windows = windowList as? [AXUIElement] else {
//            return []
//        }
//
//        let windowTitles = windows.compactMap { $0.title() }
//        return windowTitles
//    }
//}
