import { defineTable } from 'convex/server';
import { v } from 'convex/values';

const restaurantsSchema = defineTable({
	id: v.id('restaurants'),
	name: v.string(),
	userId: v.id('users')
});

export default restaurantsSchema;
