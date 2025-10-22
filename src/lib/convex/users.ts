import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Register a new user
export const register = mutation({
	args: {
		email: v.string(),
		password: v.string()
	},
	handler: async (ctx, args) => {
		// Check if user already exists
		const existingUser = await ctx.db
			.query('users')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (existingUser) {
			throw new Error('User already exists');
		}

		// In production, use proper password hashing (bcrypt, argon2, etc.)
		// For now, storing plain text (NOT SECURE - just for MVP)
		const userId = await ctx.db.insert('users', {
			email: args.email,
			passwordHash: args.password // TODO: Hash this properly
		});

		return userId;
	}
});

// Sign in user
export const signIn = mutation({
	args: {
		email: v.string(),
		password: v.string()
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('users')
			.withIndex('by_email', (q) => q.eq('email', args.email))
			.first();

		if (!user) {
			throw new Error('Invalid credentials');
		}

		// In production, use proper password comparison
		if (user.passwordHash !== args.password) {
			throw new Error('Invalid credentials');
		}

		return user;
	}
});

// Get user by ID
export const getById = query({
	args: {
		id: v.id('users')
	},
	handler: async (ctx, args) => {
		const user = await ctx.db.get(args.id);

		if (!user) {
			return null;
		}

		return user;
	}
});
