import type { User } from './users.types';

let user = $state<User | null>(null);

const usersStore = {
	get user(): User | null {
		return user;
	},
	set user(value: User) {
		user = value;
	},
	clear() {
		user = null;
	}
};

export default usersStore;
