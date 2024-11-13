/*!
 * mojo.js
 * Copyright (C) 2021-2024 Sebastian Riedel
 * MIT Licensed
 */
import type {AppOptions} from 'types';
import {App} from 'app';
import Path from '@mojojs/path';

export const version = JSON.parse(
  Path.currentFile().dirname().sibling('package.json').readFileSync().toString()
).version;

/**
 * Create a new mojo.js application.
 */
export default function mojo(options?: AppOptions): App {
  const app = new App(options);

  const caller = (app.home = Path.callerFile().dirname());
  const uplevel = caller.dirname();
  const callerExists = caller.child('package.json').existsSync();
  const uplevelExists = uplevel.child('package.json').existsSync();
  const dirName = caller.basename();

  // App in dist/lib/src and "package.json" in parent directory (but not in app directory)
  if (callerExists === false && uplevelExists === true && ['dist', 'lib', 'src'].includes(dirName)) {
    app.home = uplevel;
  }

  app.cli.commandPaths.push(caller.child('cli').toString());
  app.router.controllerPaths.push(caller.child('controllers').toString());
  app.static.publicPaths.push(app.home.child('public').toString());
  app.renderer.viewPaths.push(app.home.child('views').toString());

  return app;
}

// "Professor: These old Doomsday devices are dangerously unstable. I'll rest easier not knowing where they are."
export {default as jsonConfigPlugin} from 'plugins/json-config';
export {default as yamlConfigPlugin} from 'plugins/yaml-config';
export {default as mountPlugin} from 'plugins/mount';
export {CGI} from 'cgi';
export {Logger} from 'logger';
export {Server} from 'server';
export {Session} from 'session';
export {TestUserAgent} from 'user-agent/test';
export {UserAgent} from 'user-agent';
export * as util from 'util';

export type {
  JSONValue,
  MojoAction,
  MojoApp,
  MojoContext,
  MojoModels,
  MojoRenderOptions,
  MojoRoute,
  MojoTags,
  MojoURLOptions
} from 'types';
