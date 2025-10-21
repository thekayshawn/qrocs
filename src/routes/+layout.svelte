<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Qrocs</title>
	<meta name="description" content="" />
</svelte:head>

{@render children?.()}
