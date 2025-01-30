/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'cdn.sanity.io',
            'images.unsplash.com',
            'localhost',
            'via.placeholder.com'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
