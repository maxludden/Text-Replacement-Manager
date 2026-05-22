import { describe, expect, it } from "vitest";

import { DEFAULT_TAG_COLOR, normalizeTagColor, normalizeTagColors, tagColorFor } from "../src/lib/tag-colors";

describe("tag colors", () => {
  it("keeps supported color choices and removes colors for missing tags", () => {
    expect(
      normalizeTagColors(
        {
          chat: "Blue",
          personal: "Red",
          unknown: "Magenta",
          work: "NotAColor",
        },
        ["chat", "personal", "work"],
      ),
    ).toEqual({
      chat: "Blue",
      personal: "Red",
    });
  });

  it("uses the default tag color when a tag does not have a custom color", () => {
    expect(tagColorFor("personal", { chat: "Green" })).toBe(DEFAULT_TAG_COLOR);
    expect(tagColorFor("chat", { chat: "Green" })).toBe("Green");
  });

  it("normalizes 3 and 6 digit hex colors", () => {
    expect(normalizeTagColor("#abc")).toBe("#ABC");
    expect(normalizeTagColor("def")).toBe("#DEF");
    expect(normalizeTagColor("#123456")).toBe("#123456");
    expect(normalizeTagColor("a1b2c3")).toBe("#A1B2C3");
  });
});
