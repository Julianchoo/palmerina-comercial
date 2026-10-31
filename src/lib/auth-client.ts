"use client";

import { createAuthClient } from "better-auth/react";

// Same-origin endpoints only; no server configuration or credentials reach the browser.
export const authClient = createAuthClient();
