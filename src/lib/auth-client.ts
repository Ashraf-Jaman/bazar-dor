import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://bazar-dor-five-theta.vercel.app/"
})

export const { signIn, signUp, signOut, useSession } = authClient;
