const crypto = require("crypto");

// Constants

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// Helpers

const createHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const stringifyJson = (event) => {
  return typeof event === "string" ? event : JSON.stringify(event);
};

// Exports

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const partitionKey = event.partitionKey
    ? stringifyJson(event.partitionKey)
    : createHash(stringifyJson(event));

  const candidate =
    partitionKey.length > MAX_PARTITION_KEY_LENGTH
      ? createHash(partitionKey)
      : partitionKey;

  return candidate;
};
