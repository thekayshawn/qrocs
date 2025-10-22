<script>
	import { m } from '$lib/paraglide/messages';
	import { GalleryVerticalEndIcon } from 'lucide-svelte';
</script>

<a href="/app" class="flex items-center gap-2 self-center font-medium">
	<div
		class="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground"
	>
		<GalleryVerticalEndIcon class="size-4" />
	</div>
	{m.appName()}
</a>
