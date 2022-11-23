const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Should Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("Should ignore (event.partitionKey) that more than max length allowed", () => {
    const partitionKey = "hello world!".repeat(300);
    const keyExpected =
      "6955dff255d95bfb11b02b395e03d2046a36f9a83401510fcce3d2beb103085ecb53183765ea663aae0fe4eddf75f1a3abeccc52e40d120acde60d06055a3330";

    expect(deterministicPartitionKey({ partitionKey })).toBe(keyExpected);
  });

  it("Should return partition key provided in event (property partitionKey)", () => {
    const partitionKey = "example-key";

    expect(deterministicPartitionKey({ partitionKey })).toBe(partitionKey);
  });
});
