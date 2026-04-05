const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@honeybakes.com' });
    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@honeybakes.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user seeded properly: admin@honeybakes.com / admin123');
    } else {
      console.log('✅ Admin user already exists.');
    }
    process.exit();
  } catch (error) {
    console.error(`❌ Error connecting to database: ${error.message} - Make sure MongoDB is running!`);
    process.exit(1);
  }
};

seedData();
