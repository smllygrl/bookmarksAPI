import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      // save user to db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `Account already exists for ${dto.email}`,
          );
        }
      } else {
        throw error;
      }
    }
  }
  async signin(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if !user throw exceptions
    if (!user) throw new ForbiddenException("We couldn't find that email");

    // compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    // send back the user
    delete user.hash;
    return user;
  }
}
