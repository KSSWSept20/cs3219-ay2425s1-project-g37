import type { User } from "@peerprep/schemas";
import { elysiaAuthPlugin } from "@peerprep/utils/server";
import Elysia, { t } from "elysia";

import { handleLogin } from "~/controllers/auth";
import { getJwt } from "~/lib/get-jwt";

export const authRoutes = new Elysia()
  .use(elysiaAuthPlugin)
  .post(
    "/login",
    async ({ jwt, body: { email, password }, cookie: { auth_token } }) => {
      const id = await handleLogin(email, password);
      auth_token.set(await getJwt(id, jwt.sign));
    },
    { body: t.Object({ email: t.String(), password: t.String() }) },
  )
  .post("/logout", async ({ cookie: { auth_token } }) => auth_token.remove())
  .get("/verify-token", ({ user }): User | null => user);