/**
 * @namespace hs.application
 */
globalThis['hs.application'] = {};

/**
 * Fetch all running applications
 *
 * @returns {Array<HSApplication>} An array of all currently running applications
 */
hs.application.runningApplications = function() {};

/**
 * Fetch the first running application that matches a name
 *
 * @param {string} name
 * @returns {HSApplication} The first matching application, or nil if none matched
 */
hs.application.matchingName = function(name) {};

/**
 * Fetch the first running application that matches a Bundle ID
 *
 * @param {string} bundleID
 * @returns {HSApplication} The first matching application, or nil if none matched
 */
hs.application.matchingBundleID = function(bundleID) {};

/**
 * Fetch the running application that matches a POSIX PID
 *
 * @param {number} pid
 * @returns {HSApplication} The matching application, or nil if none matched
 */
hs.application.fromPID = function(pid) {};

/**
 * Fetch the currently focused application
 *
 * @returns {HSApplication} The matching application, or nil if none matched
 */
hs.application.frontmost = function() {};

/**
 * Fetch the application which currently owns the menu bar
 *
 * @returns {HSApplication} The matching application, or nil if none matched
 */
hs.application.menuBarOwner = function() {};

/**
 * Fetch the filesystem path for an application
 *
 * @param {string} bundleID
 * @returns {string} The application's filesystem path, or nil if it was not found
 */
hs.application.pathForBundleID = function(bundleID) {};

/**
 * Fetch filesystem paths for an application
 *
 * @param {string} bundleID
 * @returns {Array<String>} An array of strings containing any filesystem paths that were found
 */
hs.application.pathsForBundleID = function(bundleID) {};

/**
 * @param {string} bundlePath
 * @returns {Object<String, Any>}
 */
hs.application.infoForBundlePath = function(bundlePath) {};

/**
 * Fetch filesystem path for an application able to open a given file type
 *
 * @param {string} fileType
 * @returns {string} The path to an application for the given filetype, or il if none were found
 */
hs.application.pathForFileType = function(fileType) {};

/**
 * Fetch filesystem paths for applications able to open a given file type
 *
 * @param {string} fileType
 * @returns {Array<String>} An array of strings containing the filesystem paths for any applications that were found
 */
hs.application.pathsForFileType = function(fileType) {};

/**
 * Launch an application, or give it focus if it's already running
 *
 * @param {string} bundleID
 */
hs.application.launchOrFocus = function(bundleID) {};

/**
 * @param {string} eventName
 * @param {JSValue} callback
 */
hs.application._addWatcher = function(eventName, callback) {};

/**
 * @param {string} eventName
 */
hs.application._removeWatcher = function(eventName) {};

/**
 * POSIX Process Identifier
 * @type {*}
 */
hs.application.pid;

/**
 */
hs.application.addWatcher = function(event, listener) {};

/**
 */
hs.application.removeWatcher = function(event, listener) {};

