/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yyqjcfzddjozcwahhugs.supabase.co",
        pathname: "/storage/v1/object/public/upload/**",
      },
    ],
  },
};

module.exports = nextConfig;
