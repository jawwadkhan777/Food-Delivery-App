const {mongo_username, mongo_password}=process.env
// console.log("Username:", username);
// console.log("Password:", password);

export const connectionStr=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.1ooieyf.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0`