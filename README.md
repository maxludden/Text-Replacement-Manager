# Text Replacement Manager

Manage macOS Text Replacements from Raycast.

This Raycast extension reads the system Text Replacement list, lets you create and update entries, and syncs changes back to macOS. It also keeps Raycast-only metadata for tags and tag colors so large replacement lists are easier to scan.

## Features

- Browse macOS Text Replacements in Raycast.
- Create, edit, clone, and delete replacements.
- Validate unique triggers with the macOS-friendly `^\S{1,64}$` pattern.
- Add tags to replacements for search and organization.
- Assign colors to tags for easier visual identification.
- Import and export replacements as JSON.
- Open macOS Text Replacement settings from Raycast.

## Development

Install dependencies:

```bash
npm install
```

Run checks:

```bash
npm test
npm run typecheck
npm run build
```

Start the extension in Raycast development mode:

```bash
npm run dev
```

## Notes

The extension writes Text Replacement changes through macOS `defaults` and keeps extension metadata in Raycast support storage. Exported JSON follows the schema documented in [Text Replacement Manager.md](./Text%20Replacement%20Manager.md).

## License

MIT
