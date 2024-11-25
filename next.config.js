/** @type {import('next').NextConfig} */
const nextConfig = {
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV !== "production",
    sw: {
      dynamic: true,
    },
  },
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
