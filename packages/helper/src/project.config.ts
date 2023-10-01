import { defineConfig } from './vendors/define';
import { DocumentBuilder } from '@nestjs/swagger';

export default defineConfig({
  globalModuleConfig: {
    controllers: [],
    providers: [],
    exports: [],
    imports: [],
    repositories: [],
  },
  swaggerBuilder: new DocumentBuilder()
    .setTitle('Zero Template Swagger Title')
    .setDescription('Zero Template API Document')
    .setVersion('1.0.0')
    .setContact('Zero', 'https://blog.naily.cc', 'gczgroup@qq.com')
    .setLicense('UNLICENSE', '')
    .addBearerAuth(),
  typeormConfig: false,
});
