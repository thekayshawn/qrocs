import { defineTable } from 'convex/server';
import { v } from 'convex/values';

const usersSchema = defineTable({
	email: v.string(),
	passwordHash: v.string()
}).index('by_email', ['email']);

export default usersSchema;
