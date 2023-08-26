import jwt from 'jsonwebtoken';

interface JwtPayload {
    exp: number;
}

function isJwtValid(jwtToken: string): boolean {
    try {
        const decodedJwt: JwtPayload | null = jwt.decode(
            jwtToken,
        ) as JwtPayload | null;
        const expirationTime: number | null = decodedJwt?.exp
            ? decodedJwt.exp * 1000
            : null;
        return expirationTime ? Date.now() > expirationTime : true;
    } catch (error) {
        console.error(error);
        return true;
    }
}

export { isJwtValid };
