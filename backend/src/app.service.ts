import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHeartBeat(): string {
    return 'I am alive!';
  }
}
