import { beforeEach, describe, expect, it } from "vitest";
import { getEnv, getRequiredEnv } from "./env";

beforeEach(() => {
    process.env.ENV = "ENV";
});

it(getEnv.name, () => {
    expect(getEnv("ENV")).toBe("ENV");
    expect(getEnv("UNDEFINED_ENV")).toBe(undefined);
});

describe(getRequiredEnv.name, () => {
    it("throws error if it doesn't exist", () => {
        expect(() => getRequiredEnv("UNDEFINED_ENV")).toThrowError();
    });

    it("doesn't throw if it exists", () => {
        expect(getRequiredEnv("ENV")).toBe("ENV");
        expect(() => getRequiredEnv("ENV")).not.toThrowError();
    });
});
