import { prisma } from '.'
import bcrypt from 'bcrypt'

export const createUser = (userData) => {
	// hashing password, install bcrypt with: npm i bcrypt
	const finalUserData = {
		...userData,
		password: bcrypt.hashSync(userData.password, 10),
	}

	return prisma.user.create({ data: finalUserData })
}

export const getUserByUsername = (username) => {
	return prisma.user.findUnique({ where: { username } })
}

export const getUserById = (userId) => {
	return prisma.user.findUnique({ where: { id: userId } })
}
