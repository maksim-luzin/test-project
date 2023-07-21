import { Injectable } from '@nestjs/common';

@Injectable()
export class ProtectedService {
  getInfo() {
    return 'Hello';
  }
}
