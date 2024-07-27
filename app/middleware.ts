export { auth as middleware } from "../auth"

export const config = {
    matcher:
        (pathname: string) => pathname.startsWith("/account") || pathname.startsWith("/ticket"),
}