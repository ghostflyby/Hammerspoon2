/**
 * @namespace hs.timer
 */
globalThis['hs.timer'] = {};

/**
 * Create a new timer
 *
 * @param {number} interval
 * @param {JSValue} callback
 * @param {boolean} continueOnError
 * @returns {HSTimerObject} A timer object. Call start() to begin the timer.
 */
hs.timer._new = function(interval, callback, continueOnError) {};

/**
 * Create and start a one-shot timer
 *
 * @param {number} seconds
 * @param {JSValue} callback
 * @returns {HSTimerObject} A timer object (already started)
 */
hs.timer.doAfter = function(seconds, callback) {};

/**
 * Create and start a repeating timer
 *
 * @param {number} interval
 * @param {JSValue} callback
 * @returns {HSTimerObject} A timer object (already started)
 */
hs.timer.doEvery = function(interval, callback) {};

/**
 * Create and start a timer that fires at a specific time
 *
 * @param {number} microseconds
 */
hs.timer.usleep = function(microseconds) {};

/**
 * Get the current time as seconds since the UNIX epoch with sub-second precision
 *
 * @returns {number} Fractional seconds since midnight, January 1, 1970 UTC
 */
hs.timer.secondsSinceEpoch = function() {};

/**
 * Get the number of nanoseconds since the system was booted (excluding sleep time)
 *
 * @returns {UInt64} Nanoseconds since boot
 */
hs.timer.absoluteTime = function() {};

/**
 * Get the number of seconds since local midnight
 *
 * @returns {number} Seconds since midnight in the local timezone
 */
hs.timer.localTime = function() {};

/**
 * The timer's interval in seconds
 * @type {*}
 */
hs.timer.interval;

/**
 */
hs.timer.minutes = function(n) {};

/**
 */
hs.timer.hours = function(n) {};

/**
 */
hs.timer.days = function(n) {};

/**
 */
hs.timer.weeks = function(n) {};

/**
 */
hs.timer.seconds = function(timeString) {};

/**
 */
hs.timer.doUntil = function(predicateFn, actionFn, checkInterval) {};

/**
 */
hs.timer.doWhile = function(predicateFn, actionFn, checkInterval) {};

/**
 */
hs.timer.waitUntil = function(predicateFn, actionFn, checkInterval) {};

/**
 */
hs.timer.waitWhile = function(predicateFn, actionFn, checkInterval) {};

/**
 */
hs.timer.delayed = function(delay, fn) {};

