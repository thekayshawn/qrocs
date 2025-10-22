<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import AddRestaurantForm from '$features/restaurants/components/add-restaurant-form.svelte';
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
	<div class="flex w-full max-w-sm flex-col gap-6">
		<Card>
			<CardHeader class="text-center">
				<CardTitle class="text-xl">Add Restaurant</CardTitle>
				<CardDescription>Create a new restaurant to manage</CardDescription>
			</CardHeader>
			<CardContent>
				<AddRestaurantForm />
			</CardContent>
		</Card>
	</div>
</div>
