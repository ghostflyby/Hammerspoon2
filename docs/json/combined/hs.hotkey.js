/**
 * @module hs.hotkey
 */

/**
 * HSHotkeyModuleAPI
 * @category module
 */

/**
 * Bind a hotkey
- Parameters:
- mods: An array of modifier key strings (e.g., ["cmd", "shift"])
- key: The key name or character (e.g., "a", "space", "return")
- callbackPressed: A JavaScript function to call when the hotkey is pressed
- callbackReleased: A JavaScript function to call when the hotkey is released
- Returns: A hotkey object, or nil if binding failed
 * @param {JSValue} mods
 * @param {string} key
 * @param {JSValue} callbackPressed
 * @param {JSValue} callbackReleased
 * @returns {HSHotkeyObject} A hotkey object, or nil if binding failed
 * @memberof hs.hotkey
 * @instance
 */
function bind(mods, key, callbackPressed, callbackReleased) {}

/**
 * Bind a hotkey with a message description
- Parameters:
- mods: An array of modifier key strings
- key: The key name or character
- message: A description of what this hotkey does (currently unused, for future features)
- callbackPressed: A JavaScript function to call when the hotkey is pressed
- callbackReleased: A JavaScript function to call when the hotkey is released
- Returns: A hotkey object, or nil if binding failed
Get the system-wide mapping of key names to key codes
- Returns: A dictionary mapping key names to numeric key codes
 * @returns {Object<String, UInt32>} A hotkey object, or nil if binding failed
 * @memberof hs.hotkey
 * @instance
 */
function getKeyCodeMap() {}

/**
 * Get the mapping of modifier names to modifier flags
- Returns: A dictionary mapping modifier names to their numeric values
 * @returns {Object<String, UInt32>} A dictionary mapping modifier names to their numeric values
 * @memberof hs.hotkey
 * @instance
 */
function getModifierMap() {}

/**
 * HSHotkeyObjectAPI
 * @category object
 */

/**
 * Enable the hotkey
 * @returns {boolean} 
 * @memberof hs.hotkey
 * @instance
 */
function enable() {}

/**
 * Disable the hotkey
 * @memberof hs.hotkey
 * @instance
 */
function disable() {}

/**
 * Check if the hotkey is currently enabled
 * @returns {boolean} 
 * @memberof hs.hotkey
 * @instance
 */
function isEnabled() {}

/**
 * Delete the hotkey (disables and clears callbacks)
 * @memberof hs.hotkey
 * @instance
 */
function _delete() {}

