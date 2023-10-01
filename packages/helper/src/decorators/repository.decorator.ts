import 'reflect-metadata';
import { ScopeOptions, Type } from '@nestjs/common';
import { INJECTABLE_WATERMARK, SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { WATERMARK } from '../constants/watermark.constant';

export function Repository(options?: ScopeOptions): ClassDecorator;
export function Repository(target?: Type): void;
export function Repository(targetOrOptions: Type | ScopeOptions = {}) {
  function definer(target?: Type) {
    Reflect.defineMetadata(WATERMARK.REPOSITORY, true, target);
    Reflect.defineMetadata(INJECTABLE_WATERMARK, true, target);
    Reflect.defineMetadata(SCOPE_OPTIONS_METADATA, undefined, target);
  }

  if (!targetOrOptions || typeof targetOrOptions === 'object') return definer;

  if (typeof targetOrOptions === 'function') {
    definer(targetOrOptions as Type);
  }
}
