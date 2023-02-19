// Stores the current logged-in user's information that mirrors the data in the database.
import { writable } from 'svelte/store';

// The reason for using zod is mainly curiosity and exploration.
// It seems like a useful library for validating data, so I
// want to familiarize myself with it. On first glance, it
// seems to have similarities with Rust's type system.
import { z } from 'zod';

// This schema is used to define the type of the user object
// that is stored in the userStore mirrored from the database.
// This allows us to work with the user's data locally in the
// app without having to fetch it from the database every time.
// The interface should be kept in sync with the User type in
// the database.
const UserSchema = z.object({
	email: z.string().email(),
	firebase_id: z.string().uuid(),
	categories: z.array(z.string())
});

export type AppUser = z.infer<typeof UserSchema>;

function createUserStore() {
	const { subscribe, set, update } = writable<AppUser | null>(null);

	return {
		subscribe,
		login: (user: AppUser) => set(user),
		update,
		logout: () => set(null)
	};
}

export const userStore = createUserStore();
