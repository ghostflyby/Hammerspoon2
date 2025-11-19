/**
 * @module hs.permissions
 */

/**
 * HSPermissionsModuleAPI
 * @category module
 */

/**
 * Check if the app has Accessibility permission
- Returns: true if permission is granted, false otherwise
 * @returns {boolean} true if permission is granted, false otherwise
 * @memberof hs.permissions
 * @instance
 */
function checkAccessibility() {}

/**
 * Request Accessibility permission (shows system dialog if not granted)
 * @memberof hs.permissions
 * @instance
 */
function requestAccessibility() {}

/**
 * Check if the app has Screen Recording permission
- Returns: true if permission is granted, false otherwise
 * @returns {boolean} true if permission is granted, false otherwise
 * @memberof hs.permissions
 * @instance
 */
function checkScreenRecording() {}

/**
 * Request Screen Recording permission
- Note: This will trigger a screen capture which prompts the system dialog
 * @memberof hs.permissions
 * @instance
 */
function requestScreenRecording() {}

/**
 * Check if the app has Camera permission
- Returns: true if permission is granted, false otherwise
 * @returns {boolean} true if permission is granted, false otherwise
 * @memberof hs.permissions
 * @instance
 */
function checkCamera() {}

/**
 * Request Camera permission (shows system dialog if not granted)
- Parameter callback: Optional callback that receives true if granted, false if denied
Check if the app has Microphone permission
- Returns: true if permission is granted, false otherwise
 * @returns {boolean} true if permission is granted, false otherwise
 * @memberof hs.permissions
 * @instance
 */
function checkMicrophone() {}

