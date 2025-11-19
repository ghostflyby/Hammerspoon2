/**
 * @namespace hs.hash
 */
globalThis['hs.hash'] = {};

/**
 * Encode a string to base64
 *
 * @param {string} data
 * @returns {string} Base64 encoded string
 */
hs.hash.base64Encode = function(data) {};

/**
 * Decode a base64 string
 *
 * @param {string} data
 * @returns {string} Decoded string, or nil if the input is invalid
 */
hs.hash.base64Decode = function(data) {};

/**
 * Generate MD5 hash of a string
 *
 * @param {string} data
 * @returns {string} Hexadecimal MD5 hash
 */
hs.hash.md5 = function(data) {};

/**
 * Generate SHA1 hash of a string
 *
 * @param {string} data
 * @returns {string} Hexadecimal SHA1 hash
 */
hs.hash.sha1 = function(data) {};

/**
 * Generate SHA256 hash of a string
 *
 * @param {string} data
 * @returns {string} Hexadecimal SHA256 hash
 */
hs.hash.sha256 = function(data) {};

/**
 * Generate SHA512 hash of a string
 *
 * @param {string} data
 * @returns {string} Hexadecimal SHA512 hash
 */
hs.hash.sha512 = function(data) {};

/**
 * Generate HMAC-MD5 of a string with a key
 *
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-MD5
 */
hs.hash.hmacMD5 = function(key, data) {};

/**
 * Generate HMAC-SHA1 of a string with a key
 *
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-SHA1
 */
hs.hash.hmacSHA1 = function(key, data) {};

/**
 * Generate HMAC-SHA256 of a string with a key
 *
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-SHA256
 */
hs.hash.hmacSHA256 = function(key, data) {};

/**
 * Generate HMAC-SHA512 of a string with a key
 *
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-SHA512
 */
hs.hash.hmacSHA512 = function(key, data) {};

