/**
 * @module hs.timer
 */

/**
 * HSTimerModuleAPI
 * @category module
 */

/**
 * Create a new timer
- Parameters:
- interval: The interval in seconds at which the timer should fire
- callback: A JavaScript function to call when the timer fires
- continueOnError: If true, the timer will continue running even if the callback throws an error
- Returns: A timer object. Call start() to begin the timer.
 * @param {number} interval
 * @param {JSValue} callback
 * @param {boolean} continueOnError
 * @returns {HSTimerObject} A timer object. Call start() to begin the timer.
 * @memberof hs.timer
 * @instance
 */
function _new(interval, callback, continueOnError) {}

/**
 * Create and start a one-shot timer
- Parameters:
- seconds: Number of seconds to wait before firing
- callback: A JavaScript function to call when the timer fires
- Returns: A timer object (already started)
 * @param {number} seconds
 * @param {JSValue} callback
 * @returns {HSTimerObject} A timer object (already started)
 * @memberof hs.timer
 * @instance
 */
function doAfter(seconds, callback) {}

/**
 * Create and start a repeating timer
- Parameters:
- interval: The interval in seconds at which the timer should fire
- callback: A JavaScript function to call when the timer fires
- Returns: A timer object (already started)
 * @param {number} interval
 * @param {JSValue} callback
 * @returns {HSTimerObject} A timer object (already started)
 * @memberof hs.timer
 * @instance
 */
function doEvery(interval, callback) {}

/**
 * Create and start a timer that fires at a specific time
- Parameters:
- time: Seconds since midnight (local time) when the timer should first fire
- repeatInterval: If provided, the timer will repeat at this interval. Pass 0 for one-shot.
- callback: A JavaScript function to call when the timer fires
- continueOnError: If true, the timer will continue running even if the callback throws an error
- Returns: A timer object (already started)
Block execution for a specified number of microseconds (strongly discouraged)
- Parameter microseconds: Number of microseconds to sleep
- Note: This blocks the entire application and should be avoided. Use timers instead.
 * @param {number} microseconds
 * @memberof hs.timer
 * @instance
 */
function usleep(microseconds) {}

/**
 * Get the current time as seconds since the UNIX epoch with sub-second precision
- Returns: Fractional seconds since midnight, January 1, 1970 UTC
 * @returns {number} Fractional seconds since midnight, January 1, 1970 UTC
 * @memberof hs.timer
 * @instance
 */
function secondsSinceEpoch() {}

/**
 * Get the number of nanoseconds since the system was booted (excluding sleep time)
- Returns: Nanoseconds since boot
 * @returns {UInt64} Nanoseconds since boot
 * @memberof hs.timer
 * @instance
 */
function absoluteTime() {}

/**
 * Get the number of seconds since local midnight
- Returns: Seconds since midnight in the local timezone
 * @returns {number} Seconds since midnight in the local timezone
 * @memberof hs.timer
 * @instance
 */
function localTime() {}

/**
 * HSTimerObjectAPI
 * @category object
 */

/**
 * The timer's interval in seconds
 * @memberof hs.timer
 * @instance
 */
var interval;

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.minutes = function(n) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.hours = function(n) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.days = function(n) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.weeks = function(n) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.seconds = function(timeString) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.doUntil = function(predicateFn, actionFn, checkInterval) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.doWhile = function(predicateFn, actionFn, checkInterval) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.waitUntil = function(predicateFn, actionFn, checkInterval) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.waitWhile = function(predicateFn, actionFn, checkInterval) {}

/**
 * @memberof hs.timer
 * @function
 */
hs.timer.delayed = function(delay, fn) {}

