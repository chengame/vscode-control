import { Action, ActionPanel, List, launchCommand, LaunchType, getPreferenceValues } from "@raycast/api";
import packageJson from "../package.json";

const commands = packageJson.commands
  .map(cmd => ({
    name: cmd.name,
    title: cmd.title, 
    description: cmd.description,
    icon: cmd._icon
  }))
  .filter(cmd => cmd.icon);

const commandsBySection = commands.reduce((acc, cmd) => {
  const [section, ...titleParts] = cmd.title.split(':');
  const sectionName = section.trim();
  const commandTitle = titleParts.join(':').trim();

  if (!acc[sectionName]) acc[sectionName] = [];

  acc[sectionName].push({
    ...cmd,
    displayTitle: commandTitle || cmd.title
  });

  return acc;
}, {});

export default function Command() {
  console.log("getPreferenceValues():", getPreferenceValues())

  return (
    <List>
      {Object.entries(commandsBySection).map(([sectionName, sectionCommands]) => (
        <List.Section key={sectionName} title={sectionName}>
          {sectionCommands.map((cmd) => (
            <List.Item
              key={cmd.name}
              title={cmd.displayTitle}
              subtitle={cmd.description}
              icon={cmd.icon}
              actions={
                <ActionPanel>
                  <Action
                    title="Run Command"
                    onAction={async () => {
                      await launchCommand({ 
                        name: cmd.name,
                        type: LaunchType.UserInitiated 
                      });
                    }}
                  />
                </ActionPanel>
              }
            />
          ))}
        </List.Section>
      ))}
    </List>
  );
}
