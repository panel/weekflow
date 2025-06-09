<script>
	import { user, loading, signInWithGoogle, signInWithGitHub, signOut } from '$lib/stores/auth';
</script>

<div class="container mx-auto p-8">
	<header class="text-center mb-12">
		<h1 class="h1 gradient-heading">WeekFlow</h1>
		<p class="text-lg opacity-75">Engineering Leadership Goals Tracker</p>
	</header>

	{#if $loading}
		<div class="flex justify-center">
			<div class="placeholder animate-pulse w-64 h-32"></div>
		</div>
	{:else if $user}
		<!-- Authenticated State -->
		<div class="card variant-soft-surface p-6 max-w-md mx-auto">
			<header class="card-header text-center">
				<h2 class="h3">Welcome back!</h2>
			</header>
			<section class="p-4">
				<div class="flex flex-col items-center space-y-4">
					{#if $user.user_metadata?.avatar_url}
						<img 
							src={$user.user_metadata.avatar_url} 
							alt="Profile" 
							class="w-16 h-16 rounded-full"
						/>
					{/if}
					<div class="text-center">
						<p class="font-bold">{$user.user_metadata?.full_name || 'User'}</p>
						<p class="text-sm opacity-75">{$user.email}</p>
					</div>
				</div>
			</section>
			<footer class="card-footer">
				<button 
					class="btn variant-filled-error w-full" 
					on:click={signOut}
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
					on:click={signInWithGoogle}
				>
					<i class="fa-brands fa-google mr-2"></i>
					Continue with Google
				</button>
				<button 
					class="btn variant-filled-surface w-full" 
					on:click={signInWithGitHub}
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
