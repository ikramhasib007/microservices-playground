import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  private _client?: Stan;

  connect(clusterID: string, clientID: string, url: string): Promise<void> {
    this._client = nats.connect(clusterID, clientID, { url });

    return new Promise((resolve, reject) => {
      this._client?.on("connect", () => {
        console.log("Connected to NATS!");
        resolve();
      });
      this._client?.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
