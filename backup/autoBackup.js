const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const mongoose = require('mongoose');

// Backup MongoDB to JSON files every night at 2am
cron.schedule('0 2 * * *', async () => {
  const db = mongoose.connection.db;
  const collections = await db.listCollections().toArray();
  const backupDir = path.join(__dirname, '../backup', new Date().toISOString().slice(0,10));
  fs.mkdirSync(backupDir, { recursive: true });
  for (const col of collections) {
    const data = await db.collection(col.name).find().toArray();
    fs.writeFileSync(path.join(backupDir, col.name + '.json'), JSON.stringify(data, null, 2));
  }
  console.log('Backup complete:', backupDir);
});
