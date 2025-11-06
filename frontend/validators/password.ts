import type { Validators } from ".";

/**
 * Ensures passwords are:
 *    At least 8 characters long;
 *    Have at least 1 uppercase and 1 lowercase letter;
 */
const passwordValidators: Validators = {
  "Password is shorter than 8 characters": value => value.length >= 8,
  "Password must contain 1 uppercase and lowercase letter": value =>
    value.toLowerCase() !== value && value.toUpperCase() !== value,
};

export default passwordValidators;
