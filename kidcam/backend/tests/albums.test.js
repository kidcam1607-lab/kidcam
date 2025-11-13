import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/albums';

export const testAlbums = async (token) => {
  console.log('\n📁 Testing Album Management...\n');
  
  let albumId;
  
  try {
    // Test Create Album
    console.log('✏️ Test 1: Create Album');
    const createRes = await axios.post(
      `${API_URL}/create`,
      {
        clientName: `Test Client ${Date.now()}`,
        albumTitle: 'Test Album',
        password: 'test123',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    albumId = createRes.data._id;
    console.log('✅ Album created');
    console.log(`✅ Album ID: ${albumId}`);
    console.log(`✅ Album Slug: ${createRes.data.albumSlug}\n`);

    // Test Get Albums
    console.log('📋 Test 2: Get All Albums');
    const getRes = await axios.get(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    console.log(`✅ Found ${getRes.data.length} albums\n`);

    // Test Get Single Album
    console.log('🔍 Test 3: Get Single Album');
    const singleRes = await axios.get(`${API_URL}/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    console.log(`✅ Album details retrieved`);
    console.log(`✅ Client: ${singleRes.data.clientName}\n`);

    return { albumId, slug: createRes.data.albumSlug };
  } catch (error) {
    console.error('❌ Album test failed:', error.response?.data || error.message);
    throw error;
  }
};
