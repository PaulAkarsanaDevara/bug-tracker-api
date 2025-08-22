export const connectDB = async () => {
  try {
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error("MongoDB Connection Failed", err);
    process.exit(1);
  }
};