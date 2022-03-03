import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Email',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Your email',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: (credentials) => {
				if (
					credentials.username === process.env.SIGNED_IN_EMAIL &&
					credentials.password === process.env.LOGIN_PASSWORD
				) {
					return {
						id: 2,
						name: process.env.USER_NAME,
						email: process.env.SIGNED_IN_EMAIL,
					};
				}
				return null;
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.id = token.id;
			}
			return session;
		},
	},
	secret: 'test',
	jwt: {
		secret: 'test',
		encryption: true,
	},
});