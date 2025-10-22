<script lang="ts">
	import { Logo } from '$lib/components/logo';
	import SignInForm from '$features/users/components/sign-in-form.svelte';
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
	<div class="flex w-full max-w-sm flex-col gap-6">
		<Logo />
		<div class="flex flex-col gap-6">
			<SignInForm />
		</div>
	</div>
</div>
