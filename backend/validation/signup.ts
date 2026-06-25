import z from 'zod';

export const signup_val=z.object({
    username:z.string().min(6).max(10),
    password:z.string()
})

