import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("should merge classes correctly", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("should handle tailwind class conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("should handle conditional classes", () => {
    expect(cn("flex", true && "items-center", false && "hidden")).toBe("flex items-center");
  });
});
