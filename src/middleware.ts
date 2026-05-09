import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
export default createMiddleware(routing);
export const config = {
  matcher: [
    // Skip Next.js internals, static files, and WP proxy paths
    "/((?!_next|_vercel|api|wp-json|wp-admin|wp-login\\.php|cart|checkout|my-account|.*\\..*).*)",
  ],
};
