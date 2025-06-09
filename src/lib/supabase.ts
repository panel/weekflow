import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'

export const createSupabaseLoadClient = (supabaseAnonKey: string) => {
	return createBrowserClient(PUBLIC_SUPABASE_URL, supabaseAnonKey, {
		global: {
			fetch,
		},
	})
}

export const createSupabaseServerClient = (supabaseAnonKey: string, cookies: any) => {
	return createServerClient(PUBLIC_SUPABASE_URL, supabaseAnonKey, {
		cookies: {
			get: (key) => cookies.get(key),
			set: (key, value, options) => cookies.set(key, value, { ...options, path: '/' }),
			remove: (key, options) => cookies.delete(key, { ...options, path: '/' })
		}
	})
}