import { SUPABASE_ANON_KEY } from '$env/static/private'
import { createSupabaseServerClient } from '$lib/supabase.js'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
	const supabase = createSupabaseServerClient(SUPABASE_ANON_KEY, cookies)
	
	const {
		data: { session }
	} = await supabase.auth.getSession()

	// Get authenticated user data instead of relying on session user
	const {
		data: { user },
		error
	} = await supabase.auth.getUser()

	return {
		session: session ? { ...session, user } : null,
		supabaseAnonKey: SUPABASE_ANON_KEY
	}
}