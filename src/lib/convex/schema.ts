import { defineSchema } from 'convex/server';
import campaignsSchema from '../../features/campains/campaigns.schema';
import restaurantsSchema from '../../features/restaurants/restaurants.schema';
import usersSchema from '../../features/users/users.schema';

const schema = defineSchema({
	users: usersSchema,
	restaurants: restaurantsSchema,
	campaigns: campaignsSchema
});

export default schema;
