/**
 * @namespace hs.alert
 */
globalThis['hs.alert'] = {};

/**
 * @typedef {Object} HSAlert
 * @property {string} message - The message to display in an alert
 * @property {number} expire - How many seconds the alert should be shown for
 * @property {HSFont} font - An HSFont describing the font to use in the alert
 * @property {number} padding - How many points of padding to use in the alert
 */

/**
 * Create a new HSAlert object
 *
 * @returns {HSAlert} An HSAlert object
 */
hs.alert.newAlert = function() {};

/**
 * Show an HSAlert object
 *
 * @param {HSAlert} alert
 */
hs.alert.showAlert = function(alert) {};

/**
 * Show an alert to the user
 *
 * @param {string} message
 */
hs.alert.show = function(message) {};

