import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
import { NextResponse } from 'next/server';

export default withMiddlewareAuthRequired(async (req) => {
  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard/:path*'],
};


