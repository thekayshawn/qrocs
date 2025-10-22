<script lang="ts" module>
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type VariantProps, tv } from 'tailwind-variants';

	export const textVariants = tv({
		base: '',
		variants: {
			variant: {
				h1: 'scroll-m-20 text-balance text-4xl font-extrabold tracking-tight',
				h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors',
				h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
				h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
				p: 'leading-7',
				lead: 'text-muted-foreground text-xl leading-7',
				large: 'text-lg font-semibold',
				small: 'text-sm font-medium leading-none',
				muted: 'text-muted-foreground text-sm',
				blockquote: 'border-l-2 pl-6 italic',
				code: 'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
				link: 'text-primary font-medium underline underline-offset-4'
			}
		},
		defaultVariants: {
			variant: 'p'
		}
	});

	export type TextVariant = VariantProps<typeof textVariants>['variant'];

	export type TextProps = WithElementRef<HTMLAttributes<HTMLElement>> & {
		as?: keyof HTMLElementTagNameMap;
		variant?: TextVariant;
	};
</script>

<script lang="ts">
	let {
		as = 'p',
		ref = $bindable(null),
		class: className,
		variant = 'p',
		children,
		...restProps
	}: TextProps = $props();
</script>

<svelte:element
	this={as}
	bind:this={ref}
	class={cn(textVariants({ variant }), className)}
	{...restProps}
>
	{@render children?.()}
</svelte:element>
