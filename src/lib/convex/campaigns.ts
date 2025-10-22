import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Create a new campaign
export const create = mutation({
	args: {
		name: v.string(),
		restaurantId: v.id('restaurants'),
		destinationUrl: v.string(),
		qrCodeUrl: v.string(),
		category: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const campaignId = await ctx.db.insert('campaigns', {
			name: args.name,
			restaurantId: args.restaurantId,
			destinationUrl: args.destinationUrl,
			qrCodeUrl: args.qrCodeUrl,
			category: args.category
		});

		return campaignId;
	}
});

// Get all campaigns for a specific restaurant
export const getByRestaurantId = query({
	args: {
		restaurantId: v.id('restaurants')
	},
	handler: async (ctx, args) => {
		const campaigns = await ctx.db
			.query('campaigns')
			.filter((q) => q.eq(q.field('restaurantId'), args.restaurantId))
			.collect();

		return campaigns;
	}
});

// Get a single campaign by ID
export const getById = query({
	args: {
		id: v.id('campaigns')
	},
	handler: async (ctx, args) => {
		const campaign = await ctx.db.get(args.id);

		if (!campaign) {
			return null;
		}

		return campaign;
	}
});

// Update a campaign
export const update = mutation({
	args: {
		id: v.id('campaigns'),
		name: v.optional(v.string()),
		destinationUrl: v.optional(v.string()),
		qrCodeUrl: v.optional(v.string()),
		category: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const { id, ...updates } = args;

		// Only include fields that are defined
		const fieldsToUpdate: Record<string, string> = {};
		if (updates.name !== undefined) fieldsToUpdate.name = updates.name;
		if (updates.destinationUrl !== undefined) fieldsToUpdate.destinationUrl = updates.destinationUrl;
		if (updates.qrCodeUrl !== undefined) fieldsToUpdate.qrCodeUrl = updates.qrCodeUrl;
		if (updates.category !== undefined) fieldsToUpdate.category = updates.category;

		await ctx.db.patch(id, fieldsToUpdate);
	}
});

// Delete a campaign
export const remove = mutation({
	args: {
		id: v.id('campaigns')
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	}
});
