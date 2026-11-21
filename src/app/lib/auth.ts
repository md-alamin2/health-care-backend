import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { envVars } from "../config/env";
import ms, { StringValue } from "ms";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "sqlite", ...etc
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.PATIENT,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
      },
    },
  },
  trustedOrigins: [envVars.BETTER_AUTH_URL || "http://localhost:5000"],

  session: {
    expiresIn: Number(
      ms(envVars.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue)/1000,
    ),
    updateAge: Number(
      ms(envVars.BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE as StringValue)/1000,
    ),
    cookieCache: {
      enabled: true,
      maxAge: Number(
        ms(envVars.BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN as StringValue)/1000,
      ),
    },
  },
});
