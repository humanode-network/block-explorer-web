import { parseAddress } from "./search";

describe("parseAddress", () => {
  it("parses sample address (treasury)", () => {
    const sample = "hmpwhPbL5XJTYPWd3Gw9dUzdWrPwx2nbMFK7CmCQTrYNSfrW4";

    expect(parseAddress(sample)).toBe(sample);
  });
});
