import { Injectable } from '@nestjs/common'
import * as argon2 from 'argon2'
import { PrismaService } from 'prisma/prisma.service'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UpdateUserDto } from './dto/update-user.dto'
@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	async create(register: RegisterDto) {
		const hashedPassword = await argon2.hash(register.password)
		return this.prisma.user.create({
			data: {
				username: register.username,
				email: register.email,
				password: hashedPassword,
				role: register.role,
			},
		})
	}

	async findAll() {
		return await this.prisma.user.findMany({
			select: { username: true, role: true },
		})
	}

	async findOne(id: number) {
		return await this.prisma.user.findFirst({
			where: { id },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
			},
		});
	}

	async findByUsername(username: string) {
		return await this.prisma.user.findFirst({ where: { username } })
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return await this.prisma.user.update({
			data: updateUserDto,
			where: { id },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
			},
		})
	}
	async setAdmin(id: number) {
		return await this.prisma.user.update({
			data: { role: 'Admin' },
			where: { id },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
			},
		})
	}

	async remove(id: number) {
		return await this.prisma.user.delete({
			where: { id },
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
			},
		})
	}
}
