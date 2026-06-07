const mongoose = require('mongoose');

// Standard connection string (NOT using SRV or TXT records)
const connectionStr = 'mongodb://mjawwadkhan777:RestoApp2025@ac-1lbaneq-shard-00-00.1ooieyf.mongodb.net:27017,ac-1lbaneq-shard-00-01.1ooieyf.mongodb.net:27017,ac-1lbaneq-shard-00-02.1ooieyf.mongodb.net:27017/restoDB?replicaSet=atlas-v59a5w-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority';

async function test() {
  try {
    console.log('Connecting to MongoDB using standard connection string...');
    await mongoose.connect(connectionStr);
    console.log('Successfully connected!');
    await mongoose.disconnect();
    console.log('Disconnected.');
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

test();
