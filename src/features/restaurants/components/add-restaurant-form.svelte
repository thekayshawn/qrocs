<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { FieldGroup, Field, FieldLabel, FieldDescription } from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { api } from '$lib/convex/_generated/api';
	import { useConvexClient } from 'convex-svelte';
	import { goto } from '$app/navigation';
	import usersApi from '../../users/users.api.svelte';

	let restaurantName = $state('');
	let isSubmitting = $state(false);
	let error = $state<string | null>(null);

	async function handleSubmit(e: Event) {
		e.preventDefault();

		// Get current user
		const currentUser = usersApi.user;
		if (!currentUser) {
			error = 'You must be logged in to create a restaurant';
			return;
		}

		isSubmitting = true;
		error = null;

		try {
			const client = useConvexClient();
			const restaurantId = await client.mutation(api.restaurants.create, {
				name: restaurantName,
				userId: currentUser._id
			});

			console.log('Restaurant created:', restaurantId);

			// Navigate to restaurants list
			await goto('/app/restaurants');
		} catch (err) {
			console.error('Failed to create restaurant:', err);
			error = err instanceof Error ? err.message : 'Failed to create restaurant';
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={handleSubmit}>
	<FieldGroup>
		{#if error}
			<div class="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
				{error}
			</div>
		{/if}

		<Field>
			<FieldLabel for="restaurant-name">Restaurant Name</FieldLabel>
			<Input
				id="restaurant-name"
				type="text"
				placeholder="Enter restaurant name"
				bind:value={restaurantName}
				required
				disabled={isSubmitting}
			/>
		</Field>

		<Field>
			<Button type="submit" class="w-full" disabled={isSubmitting || !restaurantName.trim()}>
				{isSubmitting ? 'Creating...' : 'Add Restaurant'}
			</Button>
			<FieldDescription class="text-center">
				<a href="/app/restaurants">Cancel</a>
			</FieldDescription>
		</Field>
	</FieldGroup>
</form>
