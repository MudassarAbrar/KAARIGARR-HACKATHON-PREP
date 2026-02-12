import { NextRequest, NextResponse } from 'next/server';

// Session cookie configuration
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
};

// POST - Create/Update session
export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();
    
    if (!user || !user.email || !user.role) {
      return NextResponse.json(
        { error: 'Invalid user data' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ success: true, user });
    
    response.cookies.set('karigar_session', JSON.stringify(user), COOKIE_OPTIONS);
    
    return response;
  } catch (error) {
    console.error('Session creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}

// GET - Get current session
export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get('karigar_session');
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ user: null, isAuthenticated: false });
    }

    const user = JSON.parse(sessionCookie.value);
    return NextResponse.json({ user, isAuthenticated: true });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json({ user: null, isAuthenticated: false });
  }
}

// DELETE - Clear session (logout)
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  
  response.cookies.set('karigar_session', '', {
    ...COOKIE_OPTIONS,
    maxAge: 0,
  });
  
  return response;
}
