import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    transpilePackages: [
        '@mydomain/newModule',
    ],
};

export default nextConfig;
