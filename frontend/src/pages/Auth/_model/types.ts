export interface regUser {
	email?: string,
	password?: string,
	is_active?: true,
	is_superuser?: false,
	is_verified?: false,
	favourite_books_ids: Array<string>,
	matched_users: Array<string>,
	age?: number,
	gender?: string,
	name?: string,
	city?: string,
}
export interface authUser {
	username: string,
	password: string
}