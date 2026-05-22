import { describe, expect, it } from "vitest";

import { normalizeTagPickerItem, normalizeTagPickerItems } from "../src/lib/tag-picker-items";

describe("tag picker items", () => {
  it("keeps custom value, title, icon source, and supported tint colors", () => {
    expect(
      normalizeTagPickerItems({
        personal: {
          value: "personal",
          title: "Personal",
          icon: {
            source: "Tag",
            tintColor: "#f00",
          },
        },
      }),
    ).toEqual({
      personal: {
        value: "personal",
        title: "Personal",
        icon: {
          source: "Tag",
          tintColor: "#F00",
        },
      },
    });
  });

  it("uses the object key as a fallback value and drops invalid icon tint colors", () => {
    expect(
      normalizeTagPickerItem(
        {
          title: "Work",
          icon: {
            source: "Briefcase",
            tintColor: "not-a-color",
          },
        },
        "work",
      ),
    ).toEqual({
      value: "work",
      title: "Work",
      icon: {
        source: "Briefcase",
      },
    });
  });
});
