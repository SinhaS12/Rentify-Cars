import z from 'zod';

export const booking_val=z.object({
    carName:z.string().min(7).max(12),
    days:z.number(),
    rentPerDay:z.number()
})

