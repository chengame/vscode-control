import { getPreferenceValues } from "@raycast/api";
import WebSocket from "ws";

class ConnectionManager {
  constructor() {
    if (ConnectionManager.instance) {
      return ConnectionManager.instance;
    }

    this.ws = null;
    this.expireTimer = null;
    this.PORT = getPreferenceValues()?.remoteControlPort || 3710;
    this.TIMEOUT = 5 * 60 * 1000; // 5 mins

    ConnectionManager.instance = this;
  }

  static getInstance() {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  async getConnection() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.resetTimer();
      return this.ws;
    }

    return this.createConnection();
  }

  createConnection() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`ws://localhost:${this.PORT}`);

      this.ws.on("open", () => {
        console.log("Connected to VS Code socket");
        this.resetTimer();
        resolve(this.ws);
      });

      this.ws.on("error", (error) => {
        console.error("WebSocket error:", error);
        this.close();
        reject(
          error?.code == "ECONNREFUSED"
            ? `Connection refused. Is VS Code running? Is Remote Control extension listening on port ${this.PORT}?`
            : error,
        );
      });
    });
  }

  resetTimer() {
    if (this.expireTimer) clearTimeout(this.expireTimer);

    this.expireTimer = setTimeout(() => {
      console.log("Closing connection to socket after inactivity");
      this.close();
    }, this.TIMEOUT);
  }

  close() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    if (this.expireTimer) {
      clearTimeout(this.expireTimer);
      this.expireTimer = null;
    }
  }

  async sendCommand(command) {
    const ws = await this.getConnection();
    ws.send(JSON.stringify(command));
  }
}

module.exports = new ConnectionManager();
