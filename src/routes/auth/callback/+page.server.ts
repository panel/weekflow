import { redirect } from '@sveltejs/kit'
import { createSupabaseServerClient } from '$lib/supabase'
import { SUPABASE_ANON_KEY } from '$env/static/private'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, cookies }) => {
	const code = url.searchParams.get('code')

	if (code) {
		const supabase = createSupabaseServerClient(SUPABASE_ANON_KEY, cookies)
		const { error } = await supabase.auth.exchangeCodeForSession(code)
		
		if (error) {
			console.error('Auth callback error:', error)
		}
	}

	throw redirect(303, '/')
}