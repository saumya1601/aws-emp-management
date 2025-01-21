// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],
//   },
// };
// nextConfig.exports = {
//   output: 'export'
// }

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  output: 'export', // This should be part of the main configuration object
};

export default nextConfig;
