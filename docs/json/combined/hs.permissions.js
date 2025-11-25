/**
 * @namespace hs.permissions
 */
globalThis['hs.permissions'] = {};

/**
 * Check if the app has Accessibility permission
 *
 * @returns {boolean} true if permission is granted, false otherwise
 */
hs.permissions.checkAccessibility = function() {};

/**
 * Request Accessibility permission (shows system dialog if not granted)
 *
 */
hs.permissions.requestAccessibility = function() {};

/**
 * Check if the app has Screen Recording permission
 *
 * @returns {boolean} true if permission is granted, false otherwise
 */
hs.permissions.checkScreenRecording = function() {};

/**
 * Request Screen Recording permission
 *
 */
hs.permissions.requestScreenRecording = function() {};

/**
 * Check if the app has Camera permission
 *
 * @returns {boolean} true if permission is granted, false otherwise
 */
hs.permissions.checkCamera = function() {};

/**
 * Request Camera permission (shows system dialog if not granted)
 *
 * @param {JSValue} callback
 */
hs.permissions.requestCamera = function(callback) {};

/**
 * Check if the app has Microphone permission
 *
 * @returns {boolean} true if permission is granted, false otherwise
 */
hs.permissions.checkMicrophone = function() {};

/**
 * Request Microphone permission (shows system dialog if not granted)
 *
 * @param {JSValue} callback
 */
hs.permissions.requestMicrophone = function(callback) {};

