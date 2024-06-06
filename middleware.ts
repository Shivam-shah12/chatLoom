import { clerkMiddleware,createRouteMatcher } from "@clerk/nextjs/server";

// const isHomeRoute = createRouteMatcher(['/']);

// basic diff between authMiddleware() & clerkMiddleware() is
// In a authMiddleware() -> all routes are byDefault protected
// but In a clerkMiddleware() -> all routes are byDefault Not protected
export default clerkMiddleware()


export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};