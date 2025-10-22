<script lang="ts">
	import { goto } from '$app/navigation';
	import usersStore from '../../features/users/users.store.svelte';

	const { children } = $props();

	// Check authentication on mount
	$effect(() => {
		// TODO: Implement actual authentication check with Convex
		if (!usersStore.user) {
			goto('/signin');
		}
	});
</script>

{@render children()}
