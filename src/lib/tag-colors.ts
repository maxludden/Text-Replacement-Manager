export const DEFAULT_TAG_COLOR = "SecondaryText" as const;

export const TAG_COLOR_OPTIONS = [
  DEFAULT_TAG_COLOR,
  "Blue",
  "Green",
  "Magenta",
  "Orange",
  "Purple",
  "Red",
  "Yellow",
] as const;

export type TagColorName = (typeof TAG_COLOR_OPTIONS)[number];
export type TagColorsByTag = Record<string, TagColorName>;

const supportedTagColors = new Set<string>(TAG_COLOR_OPTIONS);

export function normalizeTagColors(raw: unknown, tags: string[]): TagColorsByTag {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }

  const knownTags = new Set(tags);
  const colors = raw as Record<string, unknown>;

  return Object.fromEntries(
    Object.entries(colors).filter(
      (entry): entry is [string, TagColorName] =>
        knownTags.has(entry[0]) && entry[1] !== DEFAULT_TAG_COLOR && typeof entry[1] === "string" && supportedTagColors.has(entry[1]),
    ),
  );
}

export function tagColorFor(tag: string, colors: TagColorsByTag): TagColorName {
  return colors[tag] ?? DEFAULT_TAG_COLOR;
}
