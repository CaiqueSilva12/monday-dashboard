import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export function saveToken(token: string) {
  localStorage.setItem('token', token);
}

/**
 * Initiates the Monday.com OAuth login flow by requesting the backend and handling the JWT token if returned.
 */
export async function loginWithMonday() {
  try {
    const response = await axios.get(`${BACKEND_URL}/auth/monday/redirect`, { withCredentials: true });
    // If backend returns a redirect, follow it
    if (response.data && response.data.url) {
      window.location.href = response.data.url;
    } else if (response.data && response.data.token) {
      // If backend returns a token directly (for dev/testing)
      saveToken(response.data.token);
      window.location.href = '/dashboard';
    } else {
      window.location.href = `${BACKEND_URL}/auth/monday/redirect`;
    }
  } catch (error) {
    window.location.href = `${BACKEND_URL}/auth/monday/redirect`;
  }
} 