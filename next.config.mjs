/** @type {import('next').NextConfig}
 * NOTE: this file would not be in the GitHub repo in production circumstances*/
const nextConfig = {
  reactStrictMode: true,
  env: {
    googleMapsApiKey: "AIzaSyDkXsE1zfNo5PTeapsdHBCfpVyNVCn8cjU",
    weatherApiKey: '15ae4c2dd12343b6973124019242206',
  },
};

export default nextConfig;
