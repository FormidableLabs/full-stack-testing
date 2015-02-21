/**
 * Convert strings!
 */

/**
 * Camel case a string.
 *
 *     my_string -> myString
 *     my-string -> myString
 *
 * @param   {String} val  string to convert
 * @returns {String}      camel-cased string
 */
function camel(val) {
  return "TODO: camel " + val;
}

/**
 * Snake case a string.
 *
 *     myString  -> my_string
 *     my-string -> my_string
 *
 * @param   {String} val  string to convert
 * @returns {String}      snake-cased string
 */
function snake(val) {
  return "TODO: snake " + val;
}

/**
 * Dasherize a string.
 *
 *     myString  -> my-string
 *     my_string -> my-string
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
