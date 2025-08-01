import { List, Action, ActionPanel, closeMainWindow, getPreferenceValues, Toast, showToast } from "@raycast/api";
import React, { useEffect, useState } from "react";
import { resolve } from "path";
import getCurrentWorkspace from "./utils/get-workspace";
import { findAllPackageScripts } from "./utils/find-package-scripts";
import connectionManager from "./utils/connection-manager";

export default function () {
  const [workspace, setWorkspace] = useState(null);
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const ws = await getCurrentWorkspace();

      if (ws) {
        const foundScripts = findAllPackageScripts(ws);
        console.log(`Found ${foundScripts.length} scripts/bins`);
        setScripts(foundScripts);
      }

      setWorkspace(ws);
      setLoading(false);
    }

    loadData();
  }, []);

  const scriptsList = scripts.filter((item) => item.type === "script");
  const binsList = scripts.filter((item) => item.type === "bin");

  function getDetailMarkdown(item) {
    return `
# ${item.name}

### Relative Path

\`\`\`
${item.relativePath}
\`\`\`

${
  item.type === "script"
    ? `

### Command
\`\`\`bash
${item.command}
\`\`\`

`
    : `

### Binary Path
\`\`\`
${item.path}
\`\`\`

`
}

    `;
  }

  return (
    <List isLoading={loading} isShowingDetail={!loading && scriptsList.length + binsList.length > 0}>
      {!workspace ? (
        <List.EmptyView title="No Workspace Found" />
      ) : (
        <>
          {/* Scripts Section */}
          {scriptsList.length > 0 && (
            <List.Section title="Scripts" subtitle={`${scriptsList.length} found`}>
              {scriptsList.map((item, index) => (
                <List.Item
                  key={`script-${index}`}
                  title={item.name}
                  subtitle={item.command}
                  detail={<List.Item.Detail markdown={getDetailMarkdown(item)} />}
                  actions={
                    <ActionPanel>
                      <Action
                        title="Run Script"
                        onAction={async () => {
                          try {
                            await connectionManager.sendCommand({
                              command: "workbench.action.terminal.sendSequence",
                              args: {
                                text: `cd ${resolve(workspace, item.relativePath, "..")}; ${getPreferenceValues()?.nodePackageManager || "npm"} run ${item.name}\n`,
                              },
                            });
                            await closeMainWindow();
                          } catch (error) {
                            showToast({
                              title: "Operation failed",
                              message: error.message || error,
                              style: Toast.Style.Failure,
                            });
                          }
                        }}
                      />
                    </ActionPanel>
                  }
                />
              ))}
            </List.Section>
          )}

          {/* Binaries Section */}
          {binsList.length > 0 && (
            <List.Section title="Binaries" subtitle={`${binsList.length} found`}>
              {binsList.map((item, index) => (
                <List.Item
                  key={`bin-${index}`}
                  title={item.name}
                  subtitle={item.path}
                  detail={<List.Item.Detail markdown={getDetailMarkdown(item)} />}
                  actions={
                    <ActionPanel>
                      <Action
                        title="Run Binary"
                        onAction={async () => {
                          try {
                            await connectionManager.sendCommand({
                              command: "workbench.action.terminal.sendSequence",
                              args: { text: `cd ${resolve(workspace, item.relativePath, "..")}; ${item.name}\n` },
                            });
                            await closeMainWindow();
                          } catch (error) {
                            showToast({
                              title: "Operation failed",
                              message: error.message || error,
                              style: Toast.Style.Failure,
                            });
                          }
                        }}
                      />
                    </ActionPanel>
                  }
                />
              ))}
            </List.Section>
          )}
        </>
      )}
    </List>
  );
}
