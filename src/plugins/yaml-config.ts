import type {MojoApp, ConfigOptions} from 'types';
import {loadConfig} from 'plugins/json-config';
import yaml from 'js-yaml';

/**
 * YAML config plugin.
 */
export default function yamlConfigPlugin(app: MojoApp, options: ConfigOptions): void {
  if (options.ext === undefined) options.ext = 'yml';
  loadConfig(app, options, yaml.load);
}
