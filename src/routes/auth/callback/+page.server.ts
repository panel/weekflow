import { redirect } from '@sveltejs/kit'
import { supabase } from '$lib/supabase'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, cookies }) => {
	const code = url.searchParams.get('code')

	if (code) {
		const { data, error } = await supabase.auth.exchangeCodeForSession(code)
		
		if (!error && data.session) {
			// Set session cookie
			cookies.set('sb-access-token', data.session.access_token, {
				path: '/',
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			})
			
			cookies.set('sb-refresh-token', data.session.refresh_token, {
				path: '/',
				httpOnly: true,
				secure: true,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			})
		}
	}

	throw redirect(303, '/')
}