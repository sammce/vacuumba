import type { Validators } from ".";

/**
 * Ensures email is in the following form:
 *    At least 2 alphanumeric characters (incl. dashes, periods and underscores);
 *    Then an '@' symbol;
 *    At least 2 more alphanumeric characters;
 *    A full stop '.';
 *    2 or more letters for the top level domain
 */
const emailValidators: Validators = {
  "Email must contain an '@' symbol and top level domain": value =>
    /^[a-z0-9._-]{2,}@[a-z0-9._-]{2,}.[a-z]{2,}$/i.test(value),
};

export default emailValidators;
