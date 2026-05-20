

# Text Replacement Manager

## Purpose 

I would like to build a raycast extension for mac os (only) called `Text Replacement Manager` that automatically syncs with their mac's system Text Replacements[^1] [^2]. Should allow viewing, creating, editing, deleting, cloning, and sharing Text Replacments.


## Features

In addition to viewing/browsing their mac's TR, it should also allow users to:

### Create new `Text Replacement`:

- Allow users to create a new Text Replacement[^1][^3]
- Require a unique `trigger` [^4]
- Require a phrase[^5] (`replacement text`) to replace the `trigger` with.[^5]

### Edit existing `Text Replacement`

- Edit existing `Text Replacement`'s `trigger`[^3][^4]

- Edit existing `Text Replacement`'s `replacement text`[^5]
- Sync any edits performed in Raycast Extension with their Mac's `Text Replacements`[^1]

### Clone existing `Text Replacements` 

- Clone new `Text Replacements` from existing ones (ensure that the clone uses a different `trigger` than the original)[^1][^4]

### Share their existing `Text Replacements` 

- Share via email/messaging/share sheet

### Import/Export `Text Replacments`

- Allow users to export a `Text Replacement` or all of their `Text Replacements` as a JSON dictionary.
- Allow users to import a JSON file into their `Text Replacments`



[^1]: Every action in the `Text Replacement Manager` Raycast Extension must be synced with their Mac's automatically.
[^2]: Their mac's `Text Replacements` are sually accessed/edited via: `System Settings` > `Keyboard` > `Text Replacements`
[^3]: Every `Text Replacement`'s `trigger` must be match the regular expression" `^\S{1,64}$`
[^4]: Every``Text Replacement`'s `trigger`must be unique.
[^5]: This phrase will hereto be refered to as `replacement text`
[^6]: Every `Text Replacement`requires `replacement text` to replace their `trigger` with.
[^7]: Text Replacements that are exported/imported must use this schema:
```json
{
    "Text Replacements": [
        {
            "uuid": "019e43e2-0247-7751-a148-67818279d073",
    		"trigger": "omy",
            "replacement-text": "On my way!",
            "tags": [
                "Favorite",
                "default"
            ]
}
```

^ This is an example of the schema



