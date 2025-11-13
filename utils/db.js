import mongoose from 'mongoose';

/**
 * 连接MongoDB数据库
 * 重要提示：在Vercel部署时，必须在项目设置中正确配置MONGODB_URI环境变量
 */
const connectDB = async () => {
  try {
    // 检查是否提供了MongoDB连接字符串
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI环境变量未设置，请在Vercel项目设置中配置');
    }

    // 连接MongoDB数据库
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('MongoDB数据库连接成功');
  } catch (error) {
    console.error('MongoDB连接错误:', error.message);
    // 开发模式下提供更详细的错误信息
    if (process.env.NODE_ENV !== 'production') {
      console.error('请确保已正确设置MONGODB_URI环境变量，并检查MongoDB Atlas的IP白名单配置');
    }
  }
    // 在Vercel上，我们不希望因为数据库连接失败而导致整个函数终止
    // process.exit(1); // 注释掉这行，允许服务继续运行
};

export default connectDB;