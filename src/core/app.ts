import dotenv from 'dotenv';


dotenv.config();

export const PORT: number = process.env.PORT ? Number(process.env.PORT) : 5000;
