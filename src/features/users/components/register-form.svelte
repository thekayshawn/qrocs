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
			// Register the user
			await client.mutation(api.users.register, {
				email,
				password
			});

			// After registration, sign in automatically
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
			errorMessage = 'Registration failed';
		} finally {
			isLoading = false;
		}
	}
</script>

<Card>
	<CardHeader class="text-center">
		<CardTitle class="text-xl">Create an account</CardTitle>
		<CardDescription>Sign up with your email and password</CardDescription>
	</CardHeader>
	<CardContent>
		<form onsubmit={handleSubmit}>
			<FieldGroup>
				<Field>
					<FieldLabel for="register-email">Email</FieldLabel>
					<Input
						id="register-email"
						type="email"
						placeholder="qr+crocs@example.com"
						required
						bind:value={email}
						disabled={isLoading}
					/>
				</Field>
				<Field>
					<FieldLabel for="register-password">Password</FieldLabel>
					<Input
						id="register-password"
						type="password"
						required
						bind:value={password}
						disabled={isLoading}
					/>
				</Field>
				<FieldError>{errorMessage}</FieldError>
				<Field>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? 'Creating account...' : 'Sign up'}
					</Button>
					<FieldDescription class="text-center">
						Already have an account?
						<a href="/app/sign-in" class="underline-offset-4 hover:underline">Sign in</a>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</CardContent>
</Card>
