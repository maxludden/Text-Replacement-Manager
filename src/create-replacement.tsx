import {
  Action,
  ActionPanel,
  Detail,
  environment,
  showToast,
  Toast,
} from "@raycast/api";
import { useEffect, useState } from "react";

import { createReplacement } from "./lib/operations";
import { SystemReplacementStore } from "./lib/system-store";
import type { ReplacementInput, TextReplacement } from "./lib/types";
import { ReplacementForm } from "./replacement-form";

const store = new SystemReplacementStore({
  supportPath: environment.supportPath,
});

export default function Command() {
  const [replacements, setReplacements] = useState<TextReplacement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  async function loadReplacements() {
    setIsLoading(true);
    setError(undefined);
    try {
      setReplacements(await store.readAll());
    } catch (caught) {
      const message = formatError(caught);
      setError(message);
      await showToast({
        style: Toast.Style.Failure,
        title: "Could not read Text Replacements",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadReplacements();
  }, []);

  async function submit(input: ReplacementInput): Promise<void> {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Creating replacement",
    });

    try {
      await store.replaceAll(createReplacement(replacements, input));
      toast.style = Toast.Style.Success;
      toast.title = "Synced Text Replacements";
    } catch (caught) {
      toast.style = Toast.Style.Failure;
      toast.title = "Sync failed";
      toast.message = `${formatError(caught)} Apple supports importing/exporting replacements from System Settings > Keyboard > Text Replacements.`;
      throw caught;
    }
  }

  if (error) {
    return (
      <Detail
        markdown={`# Unable to Read Text Replacements\n\n${error}`}
        actions={
          <ActionPanel>
            <ActionPanel.Section>
              <Action title="Reload from macOS" onAction={loadReplacements} />
            </ActionPanel.Section>
          </ActionPanel>
        }
      />
    );
  }

  return (
    <ReplacementForm
      title="Create Text Replacement"
      submitTitle="Create Replacement"
      existing={replacements}
      isLoading={isLoading}
      onSubmit={submit}
    />
  );
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
