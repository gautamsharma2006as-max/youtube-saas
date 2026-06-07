/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

const nextConfig: import('next').NextConfig = {
  // Aapki baaki ki settings yahan aayengi
};

module.exports = withPWA(nextConfig);

