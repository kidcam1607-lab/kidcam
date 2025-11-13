import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const testAuth = async () => {
  console.log('\n🔐 Testing Authentication...\n');
  
  try {
    // Test Register
    console.log('📝 Test 1: Admin Registration');
    const registerRes = await axios.post(`${API_URL}/register`, {
      email: `test-${Date.now()}@example.com`,
      password: 'testpass123',
      studioName: 'Test Studio',
    });
    console.log('✅ Registration successful\n');

    // Test Login
    console.log('🔑 Test 2: Admin Login');
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: `test-${Date.now() - 1000}@example.com`,
      password: 'testpass123',
    });
    
    if (!loginRes.data.token) {
      throw new Error('No token received');
    }
    console.log('✅ Login successful');
    console.log(`✅ Token received: ${loginRes.data.token.substring(0, 20)}...\n`);
    
    return loginRes.data.token;
  } catch (error) {
    console.error('❌ Auth test failed:', error.response?.data || error.message);
    throw error;
  }
};
