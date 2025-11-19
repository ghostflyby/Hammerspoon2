/**
 * @module hs.ax
 */

/**
 * HSAXElementAPI
 * @category object
 */

/**
 * The element's role (e.g., "AXWindow", "AXButton")
 * @memberof hs.ax
 * @instance
 */
var role;

/**
 * HSAXModuleAPI
 * @category module
 */

/**
 * Get the system-wide accessibility element
- Returns: The system-wide AXElement, or nil if accessibility is not available
 * @returns {HSAXElement} The system-wide AXElement, or nil if accessibility is not available
 * @memberof hs.ax
 * @instance
 */
function systemWideElement() {}

/**
 * Get the accessibility element for an application
- Parameters:
- element: An HSApplication object
- Returns: The AXElement for the application, or nil if accessibility is not available
 * @param {HSApplication} element
 * @returns {HSAXElement} The AXElement for the application, or nil if accessibility is not available
 * @memberof hs.ax
 * @instance
 */
function applicationElement(element) {}

/**
 * Get the accessibility element for a window
- Parameters:
- window: An HSWindow  object
- Returns: The AXElement for the window, or nil if accessibility is not available
 * @param {HSWindow} window
 * @returns {HSAXElement} The AXElement for the window, or nil if accessibility is not available
 * @memberof hs.ax
 * @instance
 */
function windowElement(window) {}

/**
 * Get the accessibility element at the specific screen position
- Parameter point: An HSPoint object containing screen coordinates
- Returns: The AXElement at that position, or nil if none found
 * @param {HSPoint} point
 * @returns {HSAXElement} The AXElement at that position, or nil if none found
 * @memberof hs.ax
 * @instance
 */
function elementAtPoint(point) {}

/**
 * A dictionary containing all of the notification types that can be used with hs.ax.addWatcher()
 * @memberof hs.ax
 * @instance
 */
var notificationTypes;

/**
 * @memberof hs.ax
 * @function
 */
hs.ax.addWatcher = function(application, notification, listener) {}

/**
 * @memberof hs.ax
 * @function
 */
hs.ax.removeWatcher = function(application, notification, listener) {}

/**
 * @memberof hs.ax
 * @function
 */
hs.ax.focusedElement = function() {}

/**
 * @memberof hs.ax
 * @function
 */
hs.ax.findByRole = function(role, parent) {}

/**
 * @memberof hs.ax
 * @function
 */
hs.ax.findByTitle = function(title, parent) {}

/**
 * @memberof hs.ax
 * @function
 */
hs.ax.printHierarchy = function(element, depth = 0) {}

