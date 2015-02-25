/**
 * Convert strings!
 *
 * Common behavior:
 *
 * - Strip leading / trailing spaces.
 * - Internal spaces are treated as a delimeter.
 * - Collapse multiple occurences of delimeter.
 */

/**
 * Camel case a string.
 *
 *     myString -> myString
 *     mySTring -> myString
 *     my_string -> myString
 *     my-string -> myString
 *
 * @param   {String} val  string to convert
 * @returns {String}      camel-cased string
 */
function camel(val) {
  return (val || "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/([A-Z])([A-Z]+)/g, function (m, first, second) {
      return first + second.toLowerCase();
    })
    .replace(/[-_ ]+(.)/g, function (m, first) {
      return first.toUpperCase();
    });
}

/**
 * Parse string into delimeter version.
 *
 * Works for snake and dashed cases.
 *
 * @param   {String} val    string to convert
 * @param   {String} delim  delimiter to case string with
 * @returns {String}        cased string
 * @api private
 */
function _convert(val, delim) {
  return (val || "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/([a-z])([A-Z])/g, function (m, first, second) {
      return first + delim + second;
    })
    .split(/[-_ ]+/).join(delim)
    .toLowerCase();
}

/**
 * Snake case a string.
 *
 *     myString  -> my_string
 *     mySTring  -> my_string
 *     my_string -> my_string
 *     my-string -> my_string
 *
 * @param   {String} val  string to convert
 * @returns {String}      snake-cased string
 */
function snake(val) {
  return _convert(val, "_");
}

/**
 * Dasherize a string.
 *
 *     myString  -> my-string
 *     my_string -> my-string
 *     my-string -> my-string
 *
 * @param   {String} val  string to convert
 * @returns {String}      dasherized string
 */
function dash(val) {
  return _convert(val, "-");
}

module.exports = {
  camel: camel,
  snake: snake,
  dash: dash
};
