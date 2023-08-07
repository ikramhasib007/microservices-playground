import buildClient from "../build-client";

export async function getCurrentUser(): Promise<SessionUser> {
  const client = buildClient();
  let currentUser = null;
  try {
    // kubectl get svc -A
    const { data } = await client.get("/api/users/current-user");
    currentUser = data.currentUser;
  } catch (error) {
    console.log("[getCurrentUser] error: ", error);
  }
  return currentUser;
}
