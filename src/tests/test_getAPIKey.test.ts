import { describe, expect, test } from "vitest";

import { getAPIKey } from "../api/auth.js";
import { IncomingHttpHeaders } from "http";

/*
// Test of getAPIKey function:

// function:
export function getAPIKey(headers: IncomingHttpHeaders): string | null {
  const authHeader = headers["authorization"];
  if (!authHeader) {
    return null;
  }

  const splitAuth = authHeader.split(" ");
  if (splitAuth.length < 2 || splitAuth[0] !== "ApiKey") {
    return null;
  }

  return splitAuth[1];
}
*/

// tests:
describe("getAPIKey", () => {
  test("returns null when the authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when the authorization scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer abc123",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when the authorization header does not contain a key", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns the API key when the authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123",
      //authorization: "ApiKey",
    };

    expect(getAPIKey(headers)).toBe("abc123");
  });

  test("returns the second token when additional values are present", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc123 extra",
    };

    expect(getAPIKey(headers)).toBe("abc123");
  });
});

/*
// Example:
const person = {
  isActive: true,
  age: 32,
};

describe("person", () => {
  test("person is defined", () => {
    expect(person).toBeDefined();
  });

  test("is active", () => {
    expect(person.isActive).toBeTruthy();
  });
});
*/
