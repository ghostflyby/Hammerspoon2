/**
 * @namespace hs.ax
 */
globalThis['hs.ax'] = {};

/**
 * The element's children
 *
 * @returns {Array<HSAXElement>}
 */
hs.ax.children = function() {};

/**
 * Get a specific child by index
 *
 * @param {number} index
 * @returns {HSAXElement}
 */
hs.ax.childAtIndex = function(index) {};

/**
 * Get all available attribute names
 *
 * @returns {Array<String>}
 */
hs.ax.attributeNames = function() {};

/**
 * Get the value of a specific attribute
 *
 * @param {string} attribute
 * @returns {*}
 */
hs.ax.attributeValue = function(attribute) {};

/**
 * Set the value of a specific attribute
 *
 * @param {string} attribute
 * @param {*} value
 * @returns {boolean}
 */
hs.ax.setAttributeValue = function(attribute, value) {};

/**
 * Check if an attribute is settable
 *
 * @param {string} attribute
 * @returns {boolean}
 */
hs.ax.isAttributeSettable = function(attribute) {};

/**
 * Get all available action names
 *
 * @returns {Array<String>}
 */
hs.ax.actionNames = function() {};

/**
 * Perform a specific action
 *
 * @param {string} action
 * @returns {boolean}
 */
hs.ax.performAction = function(action) {};

/**
 * The element's role (e.g., "AXWindow", "AXButton")
 * @type {*}
 */
hs.ax.role;

/**
 * The element's subrole
 * @type {*}
 */
hs.ax.subrole;

/**
 * The element's title
 * @type {*}
 */
hs.ax.title;

/**
 * The element's value
 * @type {*}
 */
hs.ax.value;

/**
 * The element's description
 * @type {*}
 */
hs.ax.elementDescription;

/**
 * Whether the element is enabled
 * @type {*}
 */
hs.ax.isEnabled;

/**
 * Whether the element is focused
 * @type {*}
 */
hs.ax.isFocused;

/**
 * The element's position on screen
 * @type {*}
 */
hs.ax.position;

/**
 * The element's size
 * @type {*}
 */
hs.ax.size;

/**
 * The element's frame (position and size combined)
 * @type {*}
 */
hs.ax.frame;

/**
 * The element's parent
 * @type {*}
 */
hs.ax.parent;

/**
 * Get the process ID of the application that owns this element
 * @type {*}
 */
hs.ax.pid;

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
 * @param {HSApplication} application
 * @param {string} notification
 * @param {JSValue} callback
 */
hs.ax._addWatcher = function(application, notification, callback) {};

/**
 * @param {HSApplication} application
 * @param {string} notification
 */
hs.ax._removeWatcher = function(application, notification) {};

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

