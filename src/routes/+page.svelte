<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const signInWithGoogle = async () => {
		const { error } = await data.supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
		if (error) console.error('Error signing in with Google:', error);
	};

	const signInWithGitHub = async () => {
		const { error } = await data.supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
		if (error) console.error('Error signing in with GitHub:', error);
	};

	const signOut = async () => {
		const { error } = await data.supabase.auth.signOut();
		if (error) console.error('Error signing out:', error);
	};
</script>

<div class="container mx-auto p-8">
	<header class="text-center mb-12">
		<h1 class="h1 gradient-heading">WeekFlow</h1>
		<p class="text-lg opacity-75">Engineering Leadership Goals Tracker</p>
	</header>

	{#if data.session?.user}
		<!-- Authenticated State -->
		<div class="card variant-soft-surface p-6 max-w-md mx-auto">
			<header class="card-header text-center">
				<h2 class="h3">Welcome back!</h2>
			</header>
			<section class="p-4">
				<div class="flex flex-col items-center space-y-4">
					{#if data.session.user.user_metadata?.avatar_url}
						<img 
							src={data.session.user.user_metadata.avatar_url} 
							alt="Profile" 
							class="w-16 h-16 rounded-full"
						/>
					{/if}
					<div class="text-center">
						<p class="font-bold">{data.session.user.user_metadata?.full_name || 'User'}</p>
						<p class="text-sm opacity-75">{data.session.user.email}</p>
					</div>
				</div>
			</section>
			<footer class="card-footer">
				<button 
					class="btn variant-filled-error w-full" 
					onclick={signOut}
				>
					Sign Out
				</button>
			</footer>
		</div>
	{:else}
		<!-- Unauthenticated State -->
		<div class="card variant-soft-primary p-6 max-w-md mx-auto">
			<header class="card-header text-center">
				<h2 class="h3">Get Started</h2>
				<p>Sign in to start tracking your weekly goals</p>
			</header>
			<section class="p-4 space-y-4">
				<button 
					class="btn variant-filled-primary w-full" 
					onclick={signInWithGoogle}
				>
					<i class="fa-brands fa-google mr-2"></i>
					Continue with Google
				</button>
				<button 
					class="btn variant-filled-surface w-full" 
					onclick={signInWithGitHub}
				>
					<i class="fa-brands fa-github mr-2"></i>
					Continue with GitHub
				</button>
			</section>
		</div>
	{/if}
</div>

<style>
	.gradient-heading {
		background: linear-gradient(135deg, rgb(var(--color-primary-500)), rgb(var(--color-secondary-500)));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>
