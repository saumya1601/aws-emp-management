/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
};
nextConfig.exports = {
  output: 'export'
}

export default nextConfig;
