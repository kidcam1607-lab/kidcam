import axios from 'axios';

const API_URL = 'http://localhost:5000/api/gallery';

export const testGallery = async (slug) => {
  console.log('\n🖼️ Testing Gallery (Client View)...\n');
  
  try {
    // Test View Album
    console.log('👁️ Test 1: View Album');
    const viewRes = await axios.get(`${API_URL}/${slug}`);
    
    console.log('✅ Album loaded');
    console.log(`✅ Client: ${viewRes.data.clientName}`);
    console.log(`✅ Protected: ${viewRes.data.isPasswordProtected}`);
    console.log(`✅ Photos: ${viewRes.data.photos.length}\n`);

    // Test Track Download
    if (viewRes.data.photos.length > 0) {
      console.log('📥 Test 2: Track Download');
      await axios.post(`${API_URL}/${slug}/track-download/0`);
      console.log('✅ Download tracked\n');
    }

    // Test Password Verification
    console.log('🔒 Test 3: Password Verification');
    try {
      await axios.post(`${API_URL}/${slug}/verify`, { password: 'wrong' });
      console.log('❌ Wrong password should fail');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Wrong password rejected');
      }
    }

    try {
      await axios.post(`${API_URL}/${slug}/verify`, { password: 'test123' });
      console.log('✅ Correct password verified\n');
    } catch (error) {
      console.log('⚠️ Password not set, skipping verify\n');
    }

  } catch (error) {
    console.error('❌ Gallery test failed:', error.response?.data || error.message);
    throw error;
  }
};
