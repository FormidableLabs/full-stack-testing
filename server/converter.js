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
 *     mySTring -> mySTring
 *     my_string -> myString
 *     my-string -> myString
 *
 * @param   {String} val  string to convert
 * @returns {String}      camel-cased string
 */
function camel(val) {
  return (val || "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/[-_ ]+(.)/g, function (m, first) {
      return first.toUpperCase();
    });
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
  return (val || "")
    .replace(/^\s+|\s+$/g, "")
    .replace(/([a-z])([A-Z])/, function (m, first, second) {
      return first + "-" + second;
    })
    .split(/[-_ ]+/).join("-")
    .toLowerCase();
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
  return "TODO: dash " + val;
}

module.exports = {
  camel: camel,
  snake: snake,
  dash: dash
};
