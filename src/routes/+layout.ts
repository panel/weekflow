import { createSupabaseLoadClient } from '$lib/supabase.js'
import type { LayoutLoad } from './$types'

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends('supabase:auth')

	const supabase = createSupabaseLoadClient(data.supabaseAnonKey)

	const {
		data: { session }
	} = await supabase.auth.getSession()

	// Get authenticated user data for client-side too
	const {
		data: { user }
	} = await supabase.auth.getUser()

	return {
		supabase,
		session: session ? { ...session, user } : data.session
	}
}