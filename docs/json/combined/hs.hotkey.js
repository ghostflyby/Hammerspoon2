/**
 * @namespace hs.hotkey
 */
globalThis['hs.hotkey'] = {};

/**
 * Bind a hotkey
 *
 * @param {JSValue} mods
 * @param {string} key
 * @param {JSValue} callbackPressed
 * @param {JSValue} callbackReleased
 * @returns {HSHotkeyObject} A hotkey object, or nil if binding failed
 */
hs.hotkey.bind = function(mods, key, callbackPressed, callbackReleased) {};

/**
 * Bind a hotkey with a message description
 *
 * @param {JSValue} mods
 * @param {string} key
 * @param {string} message
 * @param {JSValue} callbackPressed
 * @param {JSValue} callbackReleased
 * @returns {HSHotkeyObject} A hotkey object, or nil if binding failed
 */
hs.hotkey.bindSpec = function(mods, key, message, callbackPressed, callbackReleased) {};

/**
 * Get the system-wide mapping of key names to key codes
 *
 * @returns {Object<String, UInt32>} A dictionary mapping key names to numeric key codes
 */
hs.hotkey.getKeyCodeMap = function() {};

/**
 * Get the mapping of modifier names to modifier flags
 *
 * @returns {Object<String, UInt32>} A dictionary mapping modifier names to their numeric values
 */
hs.hotkey.getModifierMap = function() {};

/**
 * Enable the hotkey
 *
 * @returns {boolean}
 */
hs.hotkey.enable = function() {};

/**
 * Disable the hotkey
 *
 */
hs.hotkey.disable = function() {};

/**
 * Check if the hotkey is currently enabled
 *
 * @returns {boolean}
 */
hs.hotkey.isEnabled = function() {};

/**
 * Delete the hotkey (disables and clears callbacks)
 *
 */
hs.hotkey._delete = function() {};

