import { normalizeTagColor, type TagColorValue } from "./tag-colors";
import { Icon, List, Grid } from "@raycast/api";
import { useEffect, useState } from "react";




export interface TagPickerItemIcon {
  source: string;
  tintColor?: TagColorValue;
}

export interface TagPickerItemConfig {
  value: string;
  title: string;
  icon?: TagPickerItemIcon;
}

export type TagPickerItemsByValue = Record<string, TagPickerItemConfig>;

export function normalizeTagPickerItems(raw: unknown): TagPickerItemsByValue {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(raw as Record<string, unknown>).flatMap(([key, value]) => {
      const item = normalizeTagPickerItem(value, key);
      return item ? [[item.value, item]] : [];
    }),
  );
}

export function normalizeTagPickerItem(raw: unknown, fallbackValue = ""): TagPickerItemConfig | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return undefined;
  }

  const item = raw as Record<string, unknown>;
  const value = stringValue(item.value) || fallbackValue.trim();
  if (!value) {
    return undefined;
  }

  const title = stringValue(item.title) || value;
  const icon = normalizeIcon(item.icon);

  return {
    value,
    title,
    ...(icon ? { icon } : {}),
  };
}

function normalizeIcon(raw: unknown): TagPickerItemIcon | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return undefined;
  }

  const icon = raw as Record<string, unknown>;
  const source = stringValue(icon.source);
  if (!source) {
    return undefined;
  }

  const tintColor = normalizeTagColor(icon.tintColor);
  return {
    source,
    ...(tintColor ? { tintColor } : {}),
  };
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}
