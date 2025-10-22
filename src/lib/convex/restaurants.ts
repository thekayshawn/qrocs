import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Create a new restaurant
export const create = mutation({
	args: {
		name: v.string(),
		userId: v.id('users')
	},
	handler: async (ctx, args) => {
		const restaurantId = await ctx.db.insert('restaurants', {
			name: args.name,
			userId: args.userId
		});

		return restaurantId;
	}
});

// Get all restaurants for a specific user
export const getByUserId = query({
	args: {
		userId: v.id('users')
	},
	handler: async (ctx, args) => {
		const restaurants = await ctx.db
			.query('restaurants')
			.filter((q) => q.eq(q.field('userId'), args.userId))
			.collect();

		return restaurants;
	}
});

// Get a single restaurant by ID
export const getById = query({
	args: {
		id: v.id('restaurants')
	},
	handler: async (ctx, args) => {
		const restaurant = await ctx.db.get(args.id);

		if (!restaurant) {
			return null;
		}

		return restaurant;
	}
});

// Update a restaurant
export const update = mutation({
	args: {
		id: v.id('restaurants'),
		name: v.string()
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.id, {
			name: args.name
		});
	}
});

// Delete a restaurant
export const remove = mutation({
	args: {
		id: v.id('restaurants')
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	}
});
