import { sign, verify } from "jsonwebtoken";

// export function generateAccessToken(user) {
//     return sign({ id: user.id }, process.env.ACCESS_SECRET, { expiresIn: '10s' });
// }

export function generateAuthToken(user: any) {
    delete user['password']
    return sign(user, process.env.REFRESH_SECRET ?? '', { expiresIn: '7d' });
}

// export function generateLocalToken(user) {
//     return sign({ id: user.id, email: user.email }, process.env.LOCAL_SECRET, { expiresIn: '7d' });
// }

export const authenticated = (fn: (arg0: any, arg1: any) => void | PromiseLike<void>) => async(req: { cookies: { auth: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
    verify(req.cookies.auth, process.env.REFRESH_SECRET ?? '', async function(err: any, decoded: any) {
        if (!err && decoded) {
            return await fn(req, res);
        }
        res.status(401).json({ message: 'Unauthorized' });
    })
}