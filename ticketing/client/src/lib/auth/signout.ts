import "server-only";
import buildClient from "../build-client";

export async function getSignOut(): Promise<void> {
  const client = buildClient();
  try {
    // kubectl get svc -A
    await client.post("/api/users/signout", {});
  } catch (error) {
    console.log("[getSignOut] error: ", error);
  }
}
