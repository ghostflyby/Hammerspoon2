//
//  PermissionsModule.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 06/11/2025.
//

import Foundation
import JavaScriptCore
import AVFoundation

// MARK: - Declare our JavaScript API

/// Module for checking and requesting system permissions
@objc protocol HSPermissionsModuleAPI: JSExport {
    /// Check if the app has Accessibility permission
    /// - Returns: true if permission is granted, false otherwise
    @objc func checkAccessibility() -> Bool

    /// Request Accessibility permission (shows system dialog if not granted)
    @objc func requestAccessibility()

    /// Check if the app has Screen Recording permission
    /// - Returns: true if permission is granted, false otherwise
    @objc func checkScreenRecording() -> Bool

    /// Request Screen Recording permission
    /// - Note: This will trigger a screen capture which prompts the system dialog
    @objc func requestScreenRecording()

    /// Check if the app has Camera permission
    /// - Returns: true if permission is granted, false otherwise
    @objc func checkCamera() -> Bool

    /// Request Camera permission (shows system dialog if not granted)
    /// - Parameter callback: Optional callback that receives true if granted, false if denied
    @objc(requestCamera:)
    func requestCamera(_ callback: JSValue?)

    /// Check if the app has Microphone permission
    /// - Returns: true if permission is granted, false otherwise
    @objc func checkMicrophone() -> Bool

    /// Request Microphone permission (shows system dialog if not granted)
    /// - Parameter callback: Optional callback that receives true if granted, false if denied
    @objc(requestMicrophone:)
    func requestMicrophone(_ callback: JSValue?)
}

// MARK: - Implementation

@_documentation(visibility: private)
@objc class HSPermissionsModule: NSObject, HSModuleAPI, HSPermissionsModuleAPI {
    var name = "hs.permissions"
    var cameraCallback: JSValue? = nil
    var microphoneCallback: JSValue? = nil

    // MARK: - Module lifecycle
    override required init() { super.init() }

    func shutdown() {}

    deinit {
        print("Deinit of \(name)")
    }

    // MARK: - Accessibility

    @objc func checkAccessibility() -> Bool {
        return PermissionsManager.shared.check(.accessibility)
    }

    @objc func requestAccessibility() {
        PermissionsManager.shared.request(.accessibility)
    }

    // MARK: - Screen Recording
    // FIXME: Things below here should be implemented in PermissionsManager
    @objc func checkScreenRecording() -> Bool {
        return CGPreflightScreenCaptureAccess()
    }

    @objc func requestScreenRecording() {
        CGRequestScreenCaptureAccess()
    }

    // MARK: - Camera

    @objc func checkCamera() -> Bool {
        let status = AVCaptureDevice.authorizationStatus(for: .video)
        return status == .authorized
    }

    @objc func requestCamera(_ callback: JSValue? = nil) {
        let currentStatus = AVCaptureDevice.authorizationStatus(for: .video)

        switch currentStatus {
        case .authorized:
            callback?.call(withArguments: [true])
        case .notDetermined:
            cameraCallback = callback
            AVCaptureDevice.requestAccess(for: .video) { granted in
                DispatchQueue.main.async {
                    self.cameraCallback?.call(withArguments: [granted])
                    self.cameraCallback = nil
                }
            }
        case .denied, .restricted:
            callback?.call(withArguments: [false])
        @unknown default:
            callback?.call(withArguments: [false])
        }
    }

    // MARK: - Microphone

    @objc func checkMicrophone() -> Bool {
        let status = AVCaptureDevice.authorizationStatus(for: .audio)
        return status == .authorized
    }

    @objc func requestMicrophone(_ callback: JSValue? = nil) {
        let currentStatus = AVCaptureDevice.authorizationStatus(for: .audio)

        switch currentStatus {
        case .authorized:
            callback?.call(withArguments: [true])
        case .notDetermined:
            microphoneCallback = callback
            AVCaptureDevice.requestAccess(for: .audio) { granted in
                DispatchQueue.main.async {
                    self.microphoneCallback?.call(withArguments: [granted])
                    self.microphoneCallback = nil
                }
            }
        case .denied, .restricted:
            callback?.call(withArguments: [false])
        @unknown default:
            callback?.call(withArguments: [false])
        }
    }
}
