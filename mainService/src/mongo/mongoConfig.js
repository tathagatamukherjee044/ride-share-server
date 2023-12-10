export const mongoConfig = {
    url: process.env.MONGO_URL || 'mongodb://localhost:27',
    userDataBase : 'user',
    tripDataBase : 'trip',
}