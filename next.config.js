/** @type {import('next').NextConfig} */
module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "replicate.com",
          },
          {
            protocol: "https",
            hostname: "replicate.delivery",
          },
          {
            protocol: "https",
            hostname: "usytjdazrcoyiyofaycd.supabase.co",
          },
        ],
      },
      output: "standalone"
}
