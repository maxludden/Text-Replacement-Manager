
import { Action, ActionPanel, Clipboard, Form, Icon, showToast, Toast } from "@raycast/api";
import React, { useMemo, useState } from "react";

type IconKey = keyof typeof Icon;

type IconPickerValues = {
  selectedIcons?: string[];
};

type RaycastIconOption = {
  key: IconKey;
  title: string;
  icon: (typeof Icon)[IconKey];
};

function titleizeIconName(iconName: string): string {
  return iconName
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim();
}

function getRaycastIconOptions(): RaycastIconOption[] {
  return Object.keys(Icon)
    .filter((iconName): iconName is IconKey => typeof Icon[iconName as IconKey] === "string")
    .sort((firstIconName, secondIconName) => firstIconName.localeCompare(secondIconName))
    .map((iconName) => ({
      key: iconName,
      title: titleizeIconName(iconName),
      icon: Icon[iconName],
    }));
}

function createTagPickerItemSnippet(iconName: IconKey): string {
  return `<Form.TagPicker.Item value="${iconName}" title="${titleizeIconName(iconName)}" icon={Icon.${iconName}} />`;
}

function createImportSnippet(): string {
  return `import { Form, Icon } from "@raycast/api";`;
}

function createTagPickerSnippet(iconNames: IconKey[]): string {
  const itemSnippets = iconNames.map((iconName) => `        ${createTagPickerItemSnippet(iconName)}`).join("\n");

  return `${createImportSnippet()}\n\n<Form.TagPicker id="tags" title="Tags">\n${itemSnippets}\n</Form.TagPicker>`;
}

async function copySnippetToClipboard(snippet: string, successMessage: string): Promise<void> {
  await Clipboard.copy(snippet);
  await showToast({
    style: Toast.Style.Success,
    title: successMessage,
  });
}

export default function Command(): React.JSX.Element {
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const iconOptions = useMemo(() => getRaycastIconOptions(), []);

  const selectedIconPreview = useMemo(() => {
    const validSelectedIcons = selectedIcons.filter((iconName): iconName is IconKey => iconName in Icon);

    if (validSelectedIcons.length === 0) {
      return "Select one or more Raycast icons to generate Form.TagPicker.Item JSX.";
    }

    return createTagPickerSnippet(validSelectedIcons);
  }, [selectedIcons]);

  return (
    <Form
      navigationTitle="Browse Raycast Icons"
      actions={
        <ActionPanel>
          <Action.SubmitForm<IconPickerValues>
            title="Copy TagPicker JSX"
            icon={Icon.Clipboard}
            onSubmit={async (values) => {
              const validSelectedIcons = (values.selectedIcons ?? []).filter(
                (iconName): iconName is IconKey => iconName in Icon,
              );

              if (validSelectedIcons.length === 0) {
                await showToast({
                  style: Toast.Style.Failure,
                  title: "No icons selected",
                  message: "Pick at least one icon before copying JSX.",
                });
                return;
              }

              await copySnippetToClipboard(createTagPickerSnippet(validSelectedIcons), "Copied TagPicker JSX");
            }}
          />
          <Action.CopyToClipboard title="Copy Current Preview" icon={Icon.Clipboard} content={selectedIconPreview} />
          <Action.CopyToClipboard
            title="Copy Import"
            icon={Icon.Code}
            content={createImportSnippet()}
          />
        </ActionPanel>
      }
    >
      <Form.TagPicker
        id="selectedIcons"
        title="Raycast Icons"
        info="Search by icon name, then select one or more icons. Each item uses Raycast's built-in Icon enum as its preview icon."
        value={selectedIcons}
        onChange={setSelectedIcons}
      >
        {iconOptions.map((option) => (
          <Form.TagPicker.Item key={option.key} value={option.key} title={option.title} icon={option.icon} />
        ))}
      </Form.TagPicker>

      <Form.Separator />

      <Form.Description title="Generated JSX" text={selectedIconPreview} />
    </Form>
  );
}
