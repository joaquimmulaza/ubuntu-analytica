/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as authActions from "../authActions.js";
import type * as demos from "../demos.js";
import type * as resetPassword from "../resetPassword.js";
import type * as storage from "../storage.js";
import type * as users from "../users.js";
import type * as usersActions from "../usersActions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  authActions: typeof authActions;
  demos: typeof demos;
  resetPassword: typeof resetPassword;
  storage: typeof storage;
  users: typeof users;
  usersActions: typeof usersActions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
