import { api } from '$lib/convex/_generated/api';
import { browser } from '$app/environment';
import type { User } from './users.types';
import { useConvexClient } from 'convex-svelte';

// Session management constants
// TODO: Encrypt session data in localStorage for production use
// TODO: Add CSRF protection for production use
const SESSION_KEY = 'qrocs_session';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

type Session = {
	userId: User['_id'];
	timestamp: number;
};

// Reactive state for current user
let user = $state<User | null>(null);

const usersApi = {
	// Get current user (reactive)
	get user(): User | null {
		return user;
	},

	// Set user manually (for initializing from session)
	set user(newUser: User | null) {
		user = newUser;
		if (user) {
			this.saveSession(user._id);
		}
	},

	// Register a new user
	async register(email: string, password: string) {
		try {
			const client = useConvexClient();
			const userId = await client.mutation(api.users.register, { email, password });
			return userId;
		} catch (error) {
			console.error('Registration failed:', error);
			throw error;
		}
	},

	// Sign in user - calls Convex, updates store and session
	async signIn(email: string, password: string) {
		try {
			const client = useConvexClient();
			const currentUser = await client.mutation(api.users.signIn, { email, password });

			if (currentUser) {
				this.user = currentUser;
			}

			return this.user;
		} catch (error) {
			console.error('Sign in failed:', error);
			throw error;
		}
	},

	// Sign out user - clears store and session
	signOut() {
		this.user = null;
		this.clearSession();
	},

	// Refresh session timestamp
	refreshSession() {
		if (!browser) return;

		const session = this.getSession();
		if (this.user && session?.userId) {
			this.saveSession(session.userId);
		}
	},

	// Save session with current timestamp
	saveSession(userId: User['_id']) {
		if (!browser) return;

		const session: Session = {
			userId,
			timestamp: Date.now()
		};
		localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	},

	// Get session if valid (not expired)
	getSession(): Session | null {
		if (!browser) return null;

		const sessionStr = localStorage.getItem(SESSION_KEY);
		if (!sessionStr) {
			return null;
		}

		try {
			const session: Session = JSON.parse(sessionStr);
			const now = Date.now();
			const timeDiff = now - session.timestamp;

			// Check if session is expired
			if (timeDiff > SESSION_TIMEOUT) {
				this.clearSession();
				return null;
			}

			return session;
		} catch {
			this.clearSession();
			return null;
		}
	},

	// Clear session
	clearSession() {
		if (!browser) return;
		localStorage.removeItem(SESSION_KEY);
	}
};

export default usersApi;
