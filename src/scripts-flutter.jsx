import { List, Action, ActionPanel, Toast, showToast, closeMainWindow, getPreferenceValues } from "@raycast/api";
import React, { useEffect, useState } from "react";
import { exec } from "child_process";
import getCurrentWorkspace from "./utils/get-workspace";
import connectionManager from "./utils/connection-manager";

export default function () {
  const [workspace, setWorkspace] = useState(null);
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const ws = await getCurrentWorkspace();
      setWorkspace(ws);
      loadFlutterTargets();
    }

    loadData();

    async function loadFlutterTargets() {
      try {
        const devices = await getFlutterDevices();
        console.log(`Found ${devices.length} Flutter targets`);

        const sortedTargets = sortTargetsByPriority(devices);
        setTargets(sortedTargets);
      } catch (error) {
        console.error("Error loading Flutter targets:", error);
      }

      setLoading(false);
    }
  }, []);

  function getFlutterDevices() {
    return new Promise((resolve, reject) => {
      exec(
        `${getPreferenceValues()?.flutterPath || "flutter"} devices --machine`,
        { cwd: workspace, shell: true },
        (error, stdout) => {
          if (error) {
            reject(error);

            console.error("Couldn't get devices list:", error);
            showToast({
              title: "Couldn't get devices list",
              message: error.message || error,
              style: Toast.Style.Failure,
            });
          }

          try {
            const devices = JSON.parse(stdout);
            resolve(devices);
          } catch {
            resolve([]);

            console.error("Couldn't read devices list:", error);
            showToast({
              title: "Couldn't read devices list",
              message: error.message || error,
              style: Toast.Style.Failure,
            });
          }
        },
      );
    });
  }

  function sortTargetsByPriority(devices) {
    return devices
      .sort((a, b) => {
        if (a.isSupported !== b.isSupported) {
          return b.isSupported ? 1 : -1;
        }

        const scoreA = getCapabilityScore(a.capabilities || {});
        const scoreB = getCapabilityScore(b.capabilities || {});

        return scoreB - scoreA;
      })
      .map((device) => ({
        ...device,
        // Icon detection based on platform name
        icon: device.targetPlatform.startsWith("web") ? "🌐" : device.targetPlatform.startsWith("darwin") ? "🖥️" : "❓",
        capabilities: device.capabilities || {},
      }));
  }

  function getCapabilityScore(capabilities) {
    let score = 0;
    if (capabilities.hotReload) score += 10;
    if (capabilities.hotRestart) score += 8;
    if (capabilities.fastStart) score += 4;
    if (capabilities.hardwareRendering) score += 4;
    if (capabilities.screenshot) score += 3;
    if (capabilities.flutterExit) score += 2;
    if (capabilities.startPaused) score += 1;
    return score;
  }

  function getDetailMarkdown(target) {
    const caps = target.capabilities || {};
    const capsList = Object.entries(caps)
      .map(([key, value]) => `- ${value ? "✅" : "❌"} ${key}`)
      .join("\n");

    return `
# ${target.name}

${target.isSupported ? "" : "⚠️ *This target is not fully supported*"}

### Device Info
- **ID**: \`${target.id}\`
- **Platform**: \`${target.targetPlatform || "Unknown"}\`
- **SDK**: \`${target.sdk || "Unknown"}\`

### Capabilities
${capsList || "No capabilities info"}
    `;
  }

  const supportedTargets = targets.filter((t) => t.isSupported);
  const unsupportedTargets = targets.filter((t) => !t.isSupported);

  return (
    <List isLoading={loading} isShowingDetail={!loading && targets.length > 0}>
      {targets.length === 0 ? (
        <List.EmptyView
          title="No Flutter Targets Found"
          description="Make sure Flutter is installed and available in PATH"
        />
      ) : (
        <>
          {/* Supported Targets */}
          {supportedTargets.length > 0 && (
            <List.Section title="Available Targets" subtitle={`${supportedTargets.length} found`}>
              {supportedTargets.map((target, index) => (
                <List.Item
                  key={`supported-${index}`}
                  title={target.name}
                  subtitle={target.id}
                  icon={target.icon}
                  detail={<List.Item.Detail markdown={getDetailMarkdown(target)} />}
                  actions={
                    <ActionPanel>
                      <Action
                        title="Run in Debug Mode"
                        onAction={async () => {
                          try {
                            await connectionManager.sendCommand({
                              command: "workbench.action.terminal.sendSequence",
                              args: { text: `cd ${workspace}; flutter run -d ${target.id}\n` },
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
                      <Action
                        title="Run in Release Mode"
                        onAction={async () => {
                          try {
                            await connectionManager.sendCommand({
                              command: "workbench.action.terminal.sendSequence",
                              args: { text: `cd ${workspace}; flutter run -d ${target.id} --release\n` },
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

          {/* Unsupported Targets */}
          {unsupportedTargets.length > 0 && (
            <List.Section title="Unsupported Targets" subtitle={`${unsupportedTargets.length} found`}>
              {unsupportedTargets.map((target, index) => (
                <List.Item
                  key={`unsupported-${index}`}
                  title={target.name}
                  subtitle={`${target.id} `}
                  icon="⚠️"
                  detail={<List.Item.Detail markdown={getDetailMarkdown(target)} />}
                />
              ))}
            </List.Section>
          )}
        </>
      )}
    </List>
  );
}
