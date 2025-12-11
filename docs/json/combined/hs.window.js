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
 * Focus this window
 *
 * @returns {boolean} true if successful
 */
hs.window.focus = function() {};

/**
 * Minimize this window
 *
 * @returns {boolean} true if successful
 */
hs.window.minimize = function() {};

/**
 * Unminimize this window
 *
 * @returns {boolean} true if successful
 */
hs.window.unminimize = function() {};

/**
 * Raise this window to the front
 *
 * @returns {boolean} true if successful
 */
hs.window.raise = function() {};

/**
 * Toggle fullscreen mode
 *
 * @returns {boolean} true if successful
 */
hs.window.toggleFullscreen = function() {};

/**
 * Close this window
 *
 * @returns {boolean} true if successful
 */
hs.window.close = function() {};

/**
 * Center the window on the screen
 *
 */
hs.window.centerOnScreen = function() {};

/**
 * Get the underlying AXElement
 *
 * @returns {HSAXElement} The accessibility element for this window
 */
hs.window.axElement = function() {};

/**
 * The window's title
 * @type {*}
 */
hs.window.title;

/**
 * The application that owns this window
 * @type {*}
 */
hs.window.application;

/**
 * The process ID of the application that owns this window
 * @type {*}
 */
hs.window.pid;

/**
 * Whether the window is minimized
 * @type {*}
 */
hs.window.isMinimized;

/**
 * Whether the window is visible (not minimized or hidden)
 * @type {*}
 */
hs.window.isVisible;

/**
 * Whether the window is focused
 * @type {*}
 */
hs.window.isFocused;

/**
 * Whether the window is fullscreen
 * @type {*}
 */
hs.window.isFullscreen;

/**
 * Whether the window is standard (has a titlebar)
 * @type {*}
 */
hs.window.isStandard;

/**
 * The window's position on screen {x: Int, y: Int}
 * @type {*}
 */
hs.window.position;

/**
 * The window's size {w: Int, h: Int}
 * @type {*}
 */
hs.window.size;

/**
 * The window's frame {x: Int, y: Int, w: Int, h: Int}
 * @type {*}
 */
hs.window.frame;

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

