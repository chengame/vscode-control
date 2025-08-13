import { getPreferenceValues } from "@raycast/api";
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

function getCurrentWorkspace() {
  const vscodeStorage = join((getPreferenceValues()?.vscodePath || homedir(), "Library", "Application Support", "Code"), "User", "globalStorage", "storage.json");

  if (existsSync(vscodeStorage)) {
    const storage = JSON.parse(readFileSync(vscodeStorage, "utf8"));
    const recent =
      storage.windowsState?.openedWindows?.find((workspace) => workspace?.folder?.length > 0) ||
      storage.windowsState?.lastActiveWindow ||
      {};

    if (recent) return decodeURIComponent(recent.folder.replace("file://", ""));
  }

  return null;
}

module.exports = getCurrentWorkspace;
