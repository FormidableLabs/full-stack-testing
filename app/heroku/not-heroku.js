/**
 * Exit code 0 if not Heroku, 1 otherwise.
 */
// Use `DYNO` as proxy for Heroku test.
var isHeroku = !!process.env.DYNO;
var exitCode = isHeroku ? 1 : 0;

/*eslint-disable no-process-exit*/
process.exit(exitCode);
/*eslint-enable no-process-exit*/
