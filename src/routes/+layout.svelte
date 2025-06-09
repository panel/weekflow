<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { user, session, loading } from '$lib/stores/auth';
	import { supabase } from '$lib/supabase';

	let { children } = $props();

	onMount(async () => {
		// Get initial session
		const { data: { session: initialSession } } = await supabase.auth.getSession();
		session.set(initialSession);
		user.set(initialSession?.user ?? null);
		loading.set(false);
	});
</script>

<div class="min-h-screen bg-surface-50-900-token">
	{@render children()}
</div>
