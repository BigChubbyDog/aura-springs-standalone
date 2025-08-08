// Azure Static Web Apps Authentication Service
export interface User {
  userId: string;
  userDetails: string;
  userRoles: string[];
  identityProvider: string;
  claims?: Array<{
    typ: string;
    val: string;
  }>;
}

export interface AuthInfo {
  clientPrincipal: User | null;
}

// Get current authenticated user
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch('/.auth/me');
    const authInfo: AuthInfo = await response.json();
    return authInfo.clientPrincipal;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

// Check if user has specific role
export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false;
  return user.userRoles.includes(role);
}

// Check if user has any of the specified roles
export function hasAnyRole(user: User | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.some(role => user.userRoles.includes(role));
}

// Check if user is authenticated
export function isAuthenticated(user: User | null): boolean {
  return user !== null && user.userId !== null;
}

// Get user display name
export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest';
  
  // Try to get name from claims
  const nameClaim = user.claims?.find(c => c.typ === 'name');
  if (nameClaim) return nameClaim.val;
  
  // Fall back to userDetails (usually email)
  return user.userDetails || user.userId || 'User';
}

// Get user email
export function getUserEmail(user: User | null): string | null {
  if (!user) return null;
  
  // Try to get email from claims
  const emailClaim = user.claims?.find(c => 
    c.typ === 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress' ||
    c.typ === 'emails'
  );
  if (emailClaim) return emailClaim.val;
  
  // Fall back to userDetails if it looks like an email
  if (user.userDetails && user.userDetails.includes('@')) {
    return user.userDetails;
  }
  
  return null;
}

// Role definitions
export const ROLES = {
  ADMIN: 'admin',
  WORKER: 'worker',
  CUSTOMER: 'customer',
  ANONYMOUS: 'anonymous',
  AUTHENTICATED: 'authenticated'
} as const;

// Auth provider paths
export const AUTH_PROVIDERS = {
  AZURE_AD: {
    name: 'Microsoft',
    login: '/.auth/login/aad',
    icon: '🔐'
  },
  GITHUB: {
    name: 'GitHub',
    login: '/.auth/login/github',
    icon: '👤'
  }
} as const;

// Logout path (same for all providers)
export const LOGOUT_PATH = '/.auth/logout';

// Protected route configurations
export const PROTECTED_ROUTES = {
  '/admin': [ROLES.ADMIN],
  '/admin/*': [ROLES.ADMIN],
  '/worker': [ROLES.WORKER, ROLES.ADMIN],
  '/worker/*': [ROLES.WORKER, ROLES.ADMIN],
  '/account': [ROLES.AUTHENTICATED],
  '/account/*': [ROLES.AUTHENTICATED],
  '/booking/history': [ROLES.AUTHENTICATED],
  '/booking/manage': [ROLES.AUTHENTICATED]
} as const;

// Redirect after login
export function getPostLoginRedirect(user: User | null): string {
  if (!user) return '/';
  
  // Admin goes to admin dashboard
  if (hasRole(user, ROLES.ADMIN)) {
    return '/admin';
  }
  
  // Worker goes to worker dashboard
  if (hasRole(user, ROLES.WORKER)) {
    return '/worker';
  }
  
  // Customer goes to account page
  return '/account';
}

// Build login URL with redirect
export function buildLoginUrl(provider: keyof typeof AUTH_PROVIDERS, redirectTo?: string): string {
  const loginPath = AUTH_PROVIDERS[provider].login;
  if (!redirectTo) return loginPath;
  
  // Encode the redirect URL
  const encodedRedirect = encodeURIComponent(redirectTo);
  return `${loginPath}?post_login_redirect_uri=${encodedRedirect}`;
}

// Build logout URL with redirect
export function buildLogoutUrl(redirectTo: string = '/'): string {
  const encodedRedirect = encodeURIComponent(redirectTo);
  return `${LOGOUT_PATH}?post_logout_redirect_uri=${encodedRedirect}`;
}