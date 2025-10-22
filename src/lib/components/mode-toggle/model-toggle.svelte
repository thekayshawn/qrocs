<script lang="ts">
	import { SunIcon, MoonIcon } from 'lucide-svelte';

	import { resetMode, setMode } from 'mode-watcher';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuTrigger
	} from '../ui/dropdown-menu';
</script>

<DropdownMenu>
	<DropdownMenuTrigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		<SunIcon
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
		/>
		<MoonIcon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end">
		<DropdownMenuItem onclick={() => setMode('light')}>Light</DropdownMenuItem>
		<DropdownMenuItem onclick={() => setMode('dark')}>Dark</DropdownMenuItem>
		<DropdownMenuItem onclick={() => resetMode()}>System</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>
