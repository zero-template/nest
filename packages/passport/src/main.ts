import '@zero-template/shared';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { IBootStrap, NestExpressApplication } from '@zero-template/helper';

@NestExpressApplication(AppModule)
export class BootStrap extends Logger implements IBootStrap {
  constructor() {
    super('BootStrap');
  }

  public main(): number {
    return 3000;
  }

  public afterListen(port: number): void {
    this.verbose(`Server running on http://localhost:${port}`);
  }
}
