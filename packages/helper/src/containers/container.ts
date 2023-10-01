import { IBootStrapConfiguration, RxType } from '../typings';

interface IConfigurationContainer {
  target: RxType<IBootStrapConfiguration>;
  newed: IBootStrapConfiguration;
}

export const configurationContainer: IConfigurationContainer[] = [];
