import { writable } from 'svelte/store'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '$lib/supabase'

export const user = writable<User | null>(null)
export const session = writable<Session | null>(null)
export const loading = writable(true)

// Initialize auth state
supabase.auth.onAuthStateChange((event, newSession) => {
	session.set(newSession)
	user.set(newSession?.user ?? null)
	loading.set(false)
})

// Auth functions
export const signInWithGoogle = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`
		}
	})
	if (error) console.error('Error signing in with Google:', error)
}

export const signInWithGitHub = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'github',
		options: {
			redirectTo: `${window.location.origin}/auth/callback`
		}
	})
	if (error) console.error('Error signing in with GitHub:', error)
}

export const signOut = async () => {
	const { error } = await supabase.auth.signOut()
	if (error) console.error('Error signing out:', error)
}