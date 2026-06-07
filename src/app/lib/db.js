import dns from 'dns';

// Override DNS servers to Google DNS to resolve MongoDB SRV/TXT lookup issues (e.g. querySrv ECONNREFUSED)
if (typeof window === 'undefined' && dns && typeof dns.setServers === 'function') {
  try {
    dns.setServers(['8.8.8.8', '8.8.4.4']);
  } catch (err) {
    console.warn('Could not set custom DNS servers:', err);
  }
}

const {mongo_username, mongo_password}=process.env
// console.log("Username:", username);
// console.log("Password:", password);

export const connectionStr=process.env.MONGODB_URI;