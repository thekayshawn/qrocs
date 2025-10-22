<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldError
	} from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { goto } from '$app/navigation';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '$lib/convex/_generated/api';
	import { browser } from '$app/environment';
	import { ConvexError } from 'convex/values';

	const client = useConvexClient();

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let errorMessage = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		errorMessage = '';
		isLoading = true;

		try {
			const user = await client.mutation(api.users.signIn, {
				email,
				password
			});

			if (browser) {
				localStorage.setItem('qrocs_user_id', user._id);
			}

			goto('/app');
		} catch (error) {
			console.error(error);
			errorMessage = 'Invalid email or password';
		} finally {
			isLoading = false;
		}
	}
</script>

<Card>
	<CardHeader class="text-center">
		<CardTitle class="text-xl">Welcome</CardTitle>
		<CardDescription>Login with your email and password</CardDescription>
	</CardHeader>
	<CardContent>
		<form onsubmit={handleSubmit}>
			<FieldGroup>
				<Field>
					<FieldLabel for="email">Email</FieldLabel>
					<Input
						id="email"
						type="email"
						placeholder="m@example.com"
						required
						bind:value={email}
						disabled={isLoading}
					/>
				</Field>
				<Field>
					<div class="flex items-center">
						<FieldLabel for="password">Password</FieldLabel>
					</div>
					<Input
						id="password"
						type="password"
						required
						bind:value={password}
						disabled={isLoading}
					/>
					<FieldError>{errorMessage}</FieldError>
				</Field>
				<Field>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? 'Logging in...' : 'Login'}
					</Button>
					<FieldDescription class="text-center">
						Don't have an account?
						<a href="/app/register" class="underline-offset-4 hover:underline">Sign up</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</CardContent>
</Card>
