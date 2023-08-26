/** @type {import('next').NextConfig} */
// const { PHASE_PRODUCTION_SERVER } = require('next/constants')

const nextDevConfig = {
    async redirects() {
        return [
            {
                source: "/api/auth/callback",
                destination: "/",
                permanent: true
            }
        ];
    },
    reactStrictMode: false,
    swcMinify: true,
    publicRuntimeConfig: {
        API_URL: "http://localhost:8080",
        REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
        AUTH0_IDENTIFIER: process.env.AUTH0_IDENTIFIER,
        AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        PUBLIC_KEY: process.env.PUBLIC_KEY
    }
};

// const nextProdConfig = {
//     async redirects() {
//         return [
//             {
//                 source: "/api/auth/callback",
//                 destination: "/",
//                 permanent: true
//             }
//         ];
//     },
//     reactStrictMode: true,
//     swcMinify: true,
// };

// module.exports = (phase, { defaultConfig }) => {
//     if (phase === PHASE_PRODUCTION_SERVER) {
//         return nextProdConfig;
//     }

//     return nextDevConfig
// }

module.exports = () => {
    // if (phase === PHASE_PRODUCTION_SERVER) {
    //     return nextProdConfig;
    // }

    return nextDevConfig
}
