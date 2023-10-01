import { IBootStrapConfiguration, RxType } from '../../typings';
import { configurationContainer } from '../../containers/container';
import { WATERMARK } from '../../constants/watermark.constant';
import projectConfig from '../../project.config';

export function BootConfiguration(target: RxType<IBootStrapConfiguration>) {
  const newed = new target();
  configurationContainer.push({
    target,
    newed: newed,
  });
  const currentConfig: (string | symbol)[] = Reflect.getMetadata(WATERMARK.CURRENT_CONFIG, newed) || [];
  currentConfig.forEach((item) => {
    newed[item] = projectConfig;
  });
}
