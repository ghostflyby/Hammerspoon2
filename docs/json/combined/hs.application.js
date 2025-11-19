/**
 * @module hs.application
 */

/**
 * HSApplicationModuleAPI
 * @category module
 */

/**
 * Fetch all running applications
- Returns: An array of all currently running applications
 * @returns {Array<HSApplication>} An array of all currently running applications
 * @memberof hs.application
 * @instance
 */
function runningApplications() {}

/**
 * Fetch the first running application that matches a name
- Parameter name: The applicaiton name to search for
- Returns: The first matching application, or nil if none matched
 * @param {string} name
 * @returns {HSApplication} The first matching application, or nil if none matched
 * @memberof hs.application
 * @instance
 */
function matchingName(name) {}

/**
 * Fetch the first running application that matches a Bundle ID
- Parameter bundleID: The identifier to search for
- Returns: The first matching application, or nil if none matched
 * @param {string} bundleID
 * @returns {HSApplication} The first matching application, or nil if none matched
 * @memberof hs.application
 * @instance
 */
function matchingBundleID(bundleID) {}

/**
 * Fetch the running application that matches a POSIX PID
- Parameter pid: The PID to search for
- Returns: The matching application, or nil if none matched
 * @param {number} pid
 * @returns {HSApplication} The matching application, or nil if none matched
 * @memberof hs.application
 * @instance
 */
function fromPID(pid) {}

/**
 * Fetch the currently focused application
- Returns: The matching application, or nil if none matched
 * @returns {HSApplication} The matching application, or nil if none matched
 * @memberof hs.application
 * @instance
 */
function frontmost() {}

/**
 * Fetch the application which currently owns the menu bar
- Returns: The matching application, or nil if none matched
 * @returns {HSApplication} The matching application, or nil if none matched
 * @memberof hs.application
 * @instance
 */
function menuBarOwner() {}

/**
 * Fetch the filesystem path for an application
- Parameter bundleID: The application bundle identifier to search for (e.g. "com.apple.Safari")
- Returns: The application's filesystem path, or nil if it was not found
 * @param {string} bundleID
 * @returns {string} The application's filesystem path, or nil if it was not found
 * @memberof hs.application
 * @instance
 */
function pathForBundleID(bundleID) {}

/**
 * Fetch filesystem paths for an application
- Parameter bundleID: The application bundle identifier to search for (e.g. "com.apple.Safari")
- Returns: An array of strings containing any filesystem paths that were found
 * @param {string} bundleID
 * @returns {Array<String>} An array of strings containing any filesystem paths that were found
 * @memberof hs.application
 * @instance
 */
function pathsForBundleID(bundleID) {}

/**
 * @param {string} bundlePath
 * @returns {Object<String, Any>} 
 * @memberof hs.application
 * @instance
 */
function infoForBundlePath(bundlePath) {}

/**
 * Fetch filesystem path for an application able to open a given file type
- Parameter fileType: The file type to search for. This can be a UTType identifier, a MIME type, or a filename extension
- Returns: The path to an application for the given filetype, or il if none were found
 * @param {string} fileType
 * @returns {string} The path to an application for the given filetype, or il if none were found
 * @memberof hs.application
 * @instance
 */
function pathForFileType(fileType) {}

/**
 * Fetch filesystem paths for applications able to open a given file type
- Parameter fileType: The file type to search for. This can be a UTType identifier, a MIME type, or a filename extension
- Returns: An array of strings containing the filesystem paths for any applications that were found
 * @param {string} fileType
 * @returns {Array<String>} An array of strings containing the filesystem paths for any applications that were found
 * @memberof hs.application
 * @instance
 */
function pathsForFileType(fileType) {}

/**
 * Launch an application, or give it focus if it's already running
- Parameter bundleID: A bundle identifier for the app to launch/focus (e.g. "com.apple.Safari")
 * @param {string} bundleID
 * @memberof hs.application
 * @instance
 */
function launchOrFocus(bundleID) {}

/**
 * @param {string} eventName
 * @param {JSValue} callback
 * @memberof hs.application
 * @instance
 */
function _addWatcher(eventName, callback) {}

/**
 * @param {string} eventName
 * @memberof hs.application
 * @instance
 */
function _removeWatcher(eventName) {}

/**
 * HSApplicationAPI
 * @category object
 */

/**
 * POSIX Process Identifier
 * @memberof hs.application
 * @instance
 */
var pid;

/**
 * @memberof hs.application
 * @function
 */
hs.application.addWatcher = function(event, listener) {}

/**
 * @memberof hs.application
 * @function
 */
hs.application.removeWatcher = function(event, listener) {}

