import { defineTable } from 'convex/server';
import { v } from 'convex/values';

const campaignsSchema = defineTable({
	name: v.string(),
	category: v.optional(v.string()),
	qrCodeUrl: v.string(),
	restaurantId: v.id('restaurants'),
	destinationUrl: v.string()
});

export default campaignsSchema;
