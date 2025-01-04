export interface User {
    email_verified: boolean;
    session_state: string;
    moduleRoles: string[];
    department: string;
    avatarColor: string;
    auth_time: number;
    baseRole: string;
    username: string;
    at_hash: string;
    flags: string[];
    email: string;
    nonce: string;
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    acr: string;
    sid: string;
    name: string;
}
