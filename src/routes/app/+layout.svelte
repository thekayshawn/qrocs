<script lang="ts">
	import { browser } from '$app/environment';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '$lib/convex/_generated/api';
	import usersApi from '../../features/users/users.api.svelte';

	const client = useConvexClient();
	const { children } = $props();

	// Check authentication and load user
	$effect(() => {
		if (!browser) return;

		const session = usersApi.getSession();

		// If no session, sign out to ensure no leaks
		if (!session?.userId) {
			usersApi.signOut();
			return;
		}

		// If already signed in, do nothing
		if (usersApi.user) {
			return;
		}

		// We have a session but no user, fetch the user
		(async () => {
			try {
				const user = await client.query(api.users.getById, {
					id: session.userId
				});

				usersApi.user = user;
			} catch (error) {
				console.error('Error fetching user', error);
				usersApi.signOut(); // No such user exists, signOut
			}
		})();
	});

	// Refresh session on user activity with proper cleanup
	$effect(() => {
		if (!browser) return;

		const refreshHandler = () => usersApi.refreshSession();
		const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];

		events.forEach((event) => {
			window.addEventListener(event, refreshHandler, { passive: true });
		});

		// Cleanup function
		return () => {
			events.forEach((event) => {
				window.removeEventListener(event, refreshHandler);
			});
		};
	});
</script>

{@render children()}
