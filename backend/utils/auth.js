const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * * Hash Password using Bcrypt
 *
 * @param {string} password
 * @returns {string}
 */
module.exports.hash = async (password = null) => {
  try {
    if (!password) return null;
    const hash = await bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUND || 10)
    );
    return hash;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * * Compare Two hashes using Bcrypt
 *
 * @param {string} hash1
 * @param {string} hash2
 * @returns {boolean}
 */
module.exports.comparePasswords = async (hash1 = null, hash2 = null) => {
  try {
    if (!hash1 || !hash2) return null;
    const compare = await bcrypt?.compare(hash1, hash2);
    return !!compare;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * * Generate JWT Token from Payload
 *
 * @param {object} payload
 * @returns {string}
 */
module.exports.jwtToken = (payload = null) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (payload && secret) {
      const token = jwt.sign(payload, secret);
      return token;
    }
    throw new Error("jwtToken: No payload or secret passed");
  } catch (error) {
    throw new Error(error);
  }
};
