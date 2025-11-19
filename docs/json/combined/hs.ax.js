/**
 * @namespace hs.ax
 */
globalThis['hs.ax'] = {};

/**
 * The element's role (e.g., "AXWindow", "AXButton")
 * @type {*}
 */
hs.ax.role;

/**
 * Get the system-wide accessibility element
 *
 * @returns {HSAXElement} The system-wide AXElement, or nil if accessibility is not available
 */
hs.ax.systemWideElement = function() {};

/**
 * Get the accessibility element for an application
 *
 * @param {HSApplication} element
 * @returns {HSAXElement} The AXElement for the application, or nil if accessibility is not available
 */
hs.ax.applicationElement = function(element) {};

/**
 * Get the accessibility element for a window
 *
 * @param {HSWindow} window
 * @returns {HSAXElement} The AXElement for the window, or nil if accessibility is not available
 */
hs.ax.windowElement = function(window) {};

/**
 * Get the accessibility element at the specific screen position
 *
 * @param {HSPoint} point
 * @returns {HSAXElement} The AXElement at that position, or nil if none found
 */
hs.ax.elementAtPoint = function(point) {};

/**
 * A dictionary containing all of the notification types that can be used with hs.ax.addWatcher()
 * @type {*}
 */
hs.ax.notificationTypes;

/**
 */
hs.ax.addWatcher = function(application, notification, listener) {};

/**
 */
hs.ax.removeWatcher = function(application, notification, listener) {};

/**
 */
hs.ax.focusedElement = function() {};

/**
 */
hs.ax.findByRole = function(role, parent) {};

/**
 */
hs.ax.findByTitle = function(title, parent) {};

/**
 */
hs.ax.printHierarchy = function(element, depth = 0) {};

