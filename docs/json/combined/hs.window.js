/**
 * @namespace hs.window
 */
globalThis['hs.window'] = {};

/**
 * Get the currently focused window
 *
 * @returns {HSWindow} The focused window, or nil if none
 */
hs.window.focusedWindow = function() {};

/**
 * Get all windows from all applications
 *
 * @returns {Array<HSWindow>} An array of all windows
 */
hs.window.allWindows = function() {};

/**
 * Get all visible (not minimized) windows
 *
 * @returns {Array<HSWindow>} An array of visible windows
 */
hs.window.visibleWindows = function() {};

/**
 * Get windows for a specific application
 *
 * @param {HSApplication} app
 * @returns {Array<HSWindow>} An array of windows for that application
 */
hs.window.windowsForApp = function(app) {};

/**
 * Get all windows on a specific screen
 *
 * @param {number} screenIndex
 * @returns {Array<HSWindow>} An array of windows on that screen
 */
hs.window.windowsOnScreen = function(screenIndex) {};

/**
 * Get the window at a specific screen position
 *
 * @param {HSPoint} point
 * @returns {HSWindow} The topmost window at that position, or nil if none
 */
hs.window.windowAtPoint = function(point) {};

/**
 * Get ordered windows (front to back)
 *
 * @returns {Array<HSWindow>} An array of windows in z-order
 */
hs.window.orderedWindows = function() {};

/**
 * The window's title
 * @type {*}
 */
hs.window.title;

/**
 */
hs.window.findByTitle = function(title) {};

/**
 */
hs.window.currentWindows = function() {};

/**
 */
hs.window.moveToLeftHalf = function(win) {};

/**
 */
hs.window.moveToRightHalf = function(win) {};

/**
 */
hs.window.maximize = function(win) {};

/**
 */
hs.window.cycleWindows = function() {};

