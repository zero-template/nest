import { WATERMARK } from '../../constants/watermark.constant';

export function CurrentConfig(target: object, propertyKey: string | symbol) {
  let currentConfig: (string | symbol)[] = Reflect.getMetadata(WATERMARK.CURRENT_CONFIG, target);
  if (!currentConfig) currentConfig = [];
  currentConfig.push(propertyKey);
  Reflect.defineMetadata(WATERMARK.CURRENT_CONFIG, currentConfig, target);
}
