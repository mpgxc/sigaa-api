import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { SIGAA_PATHS } from 'commons/constants';
import { Either, failure } from 'commons/logic';
import {
  ICreateSession,
  CreateSessionInput,
} from 'domain/use-cases/create-session';
import { firstValueFrom } from 'rxjs';

import { SessionError } from '../errors/session.erros';

type CreateSessionOutput = Either<void, SessionError>;

@Injectable()
class CreateSession implements ICreateSession<CreateSessionOutput> {
  constructor(private readonly httpService: HttpService) {}

  private get cookie() {
    return this.httpService.axiosRef.defaults.headers.common.Cookie as string;
  }

  private set cookie(cookie: string) {
    this.httpService.axiosRef.defaults.headers.common.Cookie = cookie;
  }

  private async session(): Promise<void> {
    if (!this.cookie) {
      const response = await firstValueFrom(
        this.httpService.get(SIGAA_PATHS.SESSION),
      );

      this.cookie = response.headers['set-cookie'].pop();
    }
  }

  async handle({
    username,
    password,
  }: CreateSessionInput): Promise<CreateSessionOutput> {
    try {
      await this.session();
    } catch (error) {
      failure(SessionError.build('Unexpected error on create session!'));
    }

    const payload = new URLSearchParams({
      'user.login': username,
      'user.senha': password,
    });

    const response = await firstValueFrom(
      this.httpService.post(SIGAA_PATHS.LOGIN, payload, {
        params: {
          dispatch: 'logOn',
        },
      }),
    );

    if (response.request.path === SIGAA_PATHS.DISPATCH) {
      this.cookie = '';

      return failure(SessionError.build('Invalid credentials!'));
    }
  }
}

export { CreateSession };
