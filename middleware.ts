import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"; 

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. Agar user login page, pricing page, ya auth api par ja raha hai, toh use mat roko
  if (pathname.startsWith("/login") || pathname.startsWith("/pricing") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 2. Agar user logged in nahi hai, toh use login par bhejo
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. User ki payment check karo
  const isPremium = token.isPremium;
  const expiresAt = token.subscriptionExpires ? new Date(token.subscriptionExpires as string) : null;
  const isExpired = expiresAt ? new Date() > expiresAt : true;

  // 4. MAIN LOCK: Agar user premium nahi hai ya plan khatam ho gaya hai, toh seedhe Pricing page par patko!
  if (!isPremium || isExpired) {
    return NextResponse.redirect(new URL("/pricing", req.url));
  }

  return NextResponse.next();
}

// Yeh lock dashboard aur home page par kaam karega
export const config = {
  matcher: ["/dashboard/:path*", "/"],
};

