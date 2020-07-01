import assert from "assert";
import app from "../../src/app";

describe("'copy-todos' service", () => {
  it("registered the service", () => {
    const service = app.service("copy-todos");

    assert.ok(service, "Registered the service");
  });
});
