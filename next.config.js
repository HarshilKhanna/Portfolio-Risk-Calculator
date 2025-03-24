/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  // Add this to ensure client-side state is preserved
  reactStrictMode: false
}

module.exports = nextConfig 