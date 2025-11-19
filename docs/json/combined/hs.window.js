/**
 * @module hs.window
 */

/**
 * HSWindowModuleAPI
 * @category module
 */

/**
 * Get the currently focused window
- Returns: The focused window, or nil if none
 * @returns {HSWindow} The focused window, or nil if none
 * @memberof hs.window
 * @instance
 */
function focusedWindow() {}

/**
 * Get all windows from all applications
- Returns: An array of all windows
 * @returns {Array<HSWindow>} An array of all windows
 * @memberof hs.window
 * @instance
 */
function allWindows() {}

/**
 * Get all visible (not minimized) windows
- Returns: An array of visible windows
 * @returns {Array<HSWindow>} An array of visible windows
 * @memberof hs.window
 * @instance
 */
function visibleWindows() {}

/**
 * Get windows for a specific application
- Parameter app: An HSApplication object
- Returns: An array of windows for that application
 * @param {HSApplication} app
 * @returns {Array<HSWindow>} An array of windows for that application
 * @memberof hs.window
 * @instance
 */
function windowsForApp(app) {}

/**
 * Get all windows on a specific screen
- Parameter screenIndex: The screen index (0 for main screen)
- Returns: An array of windows on that screen
 * @param {number} screenIndex
 * @returns {Array<HSWindow>} An array of windows on that screen
 * @memberof hs.window
 * @instance
 */
function windowsOnScreen(screenIndex) {}

/**
 * Get the window at a specific screen position
- Parameters:
- point: An HSPoint containing the coordinates
- Returns: The topmost window at that position, or nil if none
 * @param {HSPoint} point
 * @returns {HSWindow} The topmost window at that position, or nil if none
 * @memberof hs.window
 * @instance
 */
function windowAtPoint(point) {}

/**
 * Get ordered windows (front to back)
- Returns: An array of windows in z-order
 * @returns {Array<HSWindow>} An array of windows in z-order
 * @memberof hs.window
 * @instance
 */
function orderedWindows() {}

/**
 * HSWindowAPI
 * @category object
 */

/**
 * The window's title
 * @memberof hs.window
 * @instance
 */
var title;

/**
 * @memberof hs.window
 * @function
 */
hs.window.findByTitle = function(title) {}

/**
 * @memberof hs.window
 * @function
 */
hs.window.currentWindows = function() {}

/**
 * @memberof hs.window
 * @function
 */
hs.window.moveToLeftHalf = function(win) {}

/**
 * @memberof hs.window
 * @function
 */
hs.window.moveToRightHalf = function(win) {}

/**
 * @memberof hs.window
 * @function
 */
hs.window.maximize = function(win) {}

/**
 * @memberof hs.window
 * @function
 */
hs.window.cycleWindows = function() {}

