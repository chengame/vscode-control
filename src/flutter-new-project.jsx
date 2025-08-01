import { Toast, showToast, closeMainWindow } from "@raycast/api";
import connectionManager from "./utils/connection-manager";

export default async function Command() {
  try {
    await connectionManager.sendCommand({
      command: "flutter.createProject",
      args: {},
    });

    await showToast({
      title: "Opened project creation window!",
      style: Toast.Style.Success,
    });
    await closeMainWindow();
  } catch (error) {
    console.error("Operation failed:", error);
    showToast({
      title: "Operation failed",
      message: error.message || error,
      style: Toast.Style.Failure,
    });
  }
}
