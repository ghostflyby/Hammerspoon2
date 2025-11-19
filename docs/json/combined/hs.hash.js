/**
 * @module hs.hash
 */

/**
 * HSHashModuleAPI
 * @category module
 */

/**
 * Encode a string to base64
- Parameter raw: The string to encode
- Returns: Base64 encoded string
 * @param {string} data
 * @returns {string} Base64 encoded string
 * @memberof hs.hash
 * @instance
 */
function base64Encode(data) {}

/**
 * Decode a base64 string
- Parameter raw: The base64 string to decode
- Returns: Decoded string, or nil if the input is invalid
 * @param {string} data
 * @returns {string} Decoded string, or nil if the input is invalid
 * @memberof hs.hash
 * @instance
 */
function base64Decode(data) {}

/**
 * Generate MD5 hash of a string
- Parameter data: The string to hash
- Returns: Hexadecimal MD5 hash
 * @param {string} data
 * @returns {string} Hexadecimal MD5 hash
 * @memberof hs.hash
 * @instance
 */
function md5(data) {}

/**
 * Generate SHA1 hash of a string
- Parameter data: The string to hash
- Returns: Hexadecimal SHA1 hash
 * @param {string} data
 * @returns {string} Hexadecimal SHA1 hash
 * @memberof hs.hash
 * @instance
 */
function sha1(data) {}

/**
 * Generate SHA256 hash of a string
- Parameter data: The string to hash
- Returns: Hexadecimal SHA256 hash
 * @param {string} data
 * @returns {string} Hexadecimal SHA256 hash
 * @memberof hs.hash
 * @instance
 */
function sha256(data) {}

/**
 * Generate SHA512 hash of a string
- Parameter data: The string to hash
- Returns: Hexadecimal SHA512 hash
 * @param {string} data
 * @returns {string} Hexadecimal SHA512 hash
 * @memberof hs.hash
 * @instance
 */
function sha512(data) {}

/**
 * Generate HMAC-MD5 of a string with a key
- Parameters:
- key: The secret key
- data: The data to authenticate
- Returns: Hexadecimal HMAC-MD5
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-MD5
 * @memberof hs.hash
 * @instance
 */
function hmacMD5(key, data) {}

/**
 * Generate HMAC-SHA1 of a string with a key
- Parameters:
- key: The secret key
- data: The data to authenticate
- Returns: Hexadecimal HMAC-SHA1
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-SHA1
 * @memberof hs.hash
 * @instance
 */
function hmacSHA1(key, data) {}

/**
 * Generate HMAC-SHA256 of a string with a key
- Parameters:
- key: The secret key
- data: The data to authenticate
- Returns: Hexadecimal HMAC-SHA256
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-SHA256
 * @memberof hs.hash
 * @instance
 */
function hmacSHA256(key, data) {}

/**
 * Generate HMAC-SHA512 of a string with a key
- Parameters:
- key: The secret key
- data: The data to authenticate
- Returns: Hexadecimal HMAC-SHA512
 * @param {string} key
 * @param {string} data
 * @returns {string} Hexadecimal HMAC-SHA512
 * @memberof hs.hash
 * @instance
 */
function hmacSHA512(key, data) {}

