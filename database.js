import mongoose from 'mongoose';

const connectDB = async () => {
    const URI = process.env.MONGODB_URI;
    
    if (!URI) {
        console.error('❌ Error: MONGODB_URI is not defined in environment variables')
        console.error('Please make sure you have a .env file with MONGODB_URI set')
        process.exit(1)
      }
      
      console.log('Attempting to connect to MongoDB...')
      mongoose.connect(URI)
        .then(() => {
          console.log('✅ Connected to MongoDB successfully')
        })
        .catch((err) => {
          console.error("❌ Error connecting to MongoDB:", err.message)
          console.error('Make sure MongoDB is running on:', URI)
          process.exit(1)
        })
      
}

export default connectDB;