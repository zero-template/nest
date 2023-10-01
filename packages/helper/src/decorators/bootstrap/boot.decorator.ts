import { NestApplicationOptions, Type } from '@nestjs/common';
import { IBootStrap, RxType } from '../../typings';
import { NestFactory } from '@nestjs/core';
import { configurationContainer } from '../../containers/container';

export function NestExpressApplication(rootModule: Type, options: NestApplicationOptions = {}) {
  return (target: RxType<IBootStrap>) => {
    const newed = new target();

    NestFactory.create(rootModule, options).then(async (app) => {
      configurationContainer.forEach((item) => {
        if (item.newed.intercept) item.newed.intercept(app);
      });
      const port = await newed.main(app);
      await app.listen(port);
      if (newed.afterListen) await newed.afterListen(port);
    });
  };
}
