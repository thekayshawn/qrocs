<script lang="ts">
	import usersApi from '../../features/users/users.api.svelte';

	const user = usersApi.user;
</script>

{#if user}
	{user.email}
{:else}
	Unauthenticated
{/if}
