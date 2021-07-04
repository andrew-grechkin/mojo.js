import type {MojoContext} from '../../../../../lib/core.js';

export default class FooController {
  async hello (ctx: MojoContext): Promise<void> {
    await ctx.render({text: 'Hello TypeScript controller!'});
  }
}
