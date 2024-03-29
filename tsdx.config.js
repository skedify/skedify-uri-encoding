// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, opts) {
    // see https://github.com/formium/tsdx/issues/179
    if (config.output.format === 'umd') {
      delete config.external;
    }

    // See https://github.com/formium/tsdx/issues/981
    config.plugins = config.plugins.map(p =>
      p.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : p
    );
    return config;
  },
};
