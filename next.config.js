export default { webpack4: true,
    webpack: (config) => {
      config.resolve.fallback = { fs: false, net: false };
  
      return config;
    },
  };