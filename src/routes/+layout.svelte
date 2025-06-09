<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any, data: LayoutData } = $props();

	onMount(() => {
		const { data: authListener } = data.supabase.auth.onAuthStateChange((event, _session) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
				invalidate('supabase:auth');
			}
		});

		return () => {
			authListener.subscription.unsubscribe();
		};
	});
</script>

<div class="min-h-screen bg-surface-50-900-token">
	{@render children()}
</div>
