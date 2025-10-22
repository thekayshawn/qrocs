<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { LoaderCircle } from 'lucide-svelte';
	import type { ComponentProps } from 'svelte';

	let {
		class: className,
		classes: classNames,
		...restProps
	}: ComponentProps<LoaderCircle> & { classes?: { root?: string; spinner?: string } } = $props();
</script>

<div
	class={cn(
		'flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10',
		classNames?.root
	)}
>
	<LoaderCircle
		role="status"
		aria-label="Loading"
		class={cn('size-6 animate-spin', className, classNames?.spinner)}
		{...restProps}
	/>
</div>
