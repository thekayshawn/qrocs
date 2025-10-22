import { defineTable } from 'convex/server';
import { v } from 'convex/values';

const restaurantsSchema = defineTable({
	name: v.string(),
	userId: v.id('users')
});

export default restaurantsSchema;
