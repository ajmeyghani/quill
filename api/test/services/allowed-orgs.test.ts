import assert from "assert";
import app from "../../src/app";

describe("'allowed-orgs' service", () => {
  it("registered the service", () => {
    const service = app.service("allowed-orgs");

    assert.ok(service, "Registered the service");
  });
});
