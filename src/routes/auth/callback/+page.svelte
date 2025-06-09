<script>
	// This page is just for the OAuth callback
	// Users will be redirected automatically by the server load function
</script>

<div class="flex items-center justify-center min-h-screen">
	<div class="text-center">
		<h1 class="text-2xl font-bold mb-4">Signing you in...</h1>
		<div class="loading-spinner"></div>
	</div>
</div>

<style>
	.loading-spinner {
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 2s linear infinite;
		margin: 0 auto;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
</style>