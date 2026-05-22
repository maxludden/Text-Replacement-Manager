/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `manage-replacements` command */
  export type ManageReplacements = ExtensionPreferences & {}
  /** Preferences accessible in the `create-replacement` command */
  export type CreateReplacement = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `manage-replacements` command */
  export type ManageReplacements = {}
  /** Arguments passed to the `create-replacement` command */
  export type CreateReplacement = {}
}

