<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '$lib/convex/_generated/api';
	import Loader from '$lib/components/ui/loader/loader.svelte';
	import { setContext } from 'svelte';
	import type { User } from '$features/users/users.types';

	const client = useConvexClient();
	const { children } = $props();

	const USER_ID_KEY = 'qrocs_user_id';

	let user = $state<User | null>(null);
	let isLoading = $state(true);

	// Set user context for child components
	setContext('user', {
		get user() {
			return user;
		},
		signOut() {
			user = null;
			if (browser) {
				localStorage.removeItem(USER_ID_KEY);
			}
			goto('/app/sign-in');
		}
	});

	// Check authentication and load user
	$effect(() => {
		if (!browser) return;

		const userId = localStorage.getItem(USER_ID_KEY);

		// If no user ID, redirect to sign-in
		if (!userId) {
			isLoading = false;
			goto('/app/sign-in');
			return;
		}

		// If already signed in, stop loading
		if (user) {
			isLoading = false;
			return;
		}

		// Fetch the user
		(async () => {
			try {
				const fetchedUser = await client.query(api.users.getById, {
					id: userId as User['_id']
				});

				if (fetchedUser) {
					user = fetchedUser;
				} else {
					throw new Error('No user received from API');
				}
			} catch (error) {
				console.error('Error fetching user', error);
				localStorage.removeItem(USER_ID_KEY);
				goto('/app/sign-in');
			} finally {
				isLoading = false;
			}
		})();
	});
</script>

{#if isLoading}
	<Loader />
{:else}
	{@render children()}
{/if}
