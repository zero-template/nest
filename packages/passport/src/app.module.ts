import { AppController } from './app.controller';
import { Configuration } from '@zero-template/helper';

@Configuration({
  controllers: [AppController],
})
export class AppModule {}
