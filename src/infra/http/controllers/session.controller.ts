import { Body, Post, Controller, UnauthorizedException } from '@nestjs/common';

import { CreateSession } from 'application/use-cases/create-session';

import { SessionLoginInput } from '../inputs/session.input';

@Controller('session')
export class SessionController {
  constructor(private readonly createSession: CreateSession) {}

  @Post('/login')
  async login(
    @Body()
    { password, username }: SessionLoginInput,
  ): Promise<void> {
    const session = await this.createSession.handle({
      password,
      username,
    });

    if (session?.hasError) {
      throw new UnauthorizedException(
        `${session.value.name} - ${session.value.message}`,
      );
    }
  }
}
