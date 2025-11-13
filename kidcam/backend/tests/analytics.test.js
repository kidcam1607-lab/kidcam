import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/albums';

export const testAnalytics = async (albumId, token) => {
  console.log('\n📊 Testing Analytics...\n');
  
  try {
    // Simulate downloads
    console.log('📥 Test 1: Simulate Downloads');
    const galleryAPI = `http://localhost:5000/api/gallery`;
    
    // Get album to find slug
    const albumRes = await axios.get(`${API_URL}/${albumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    const slug = albumRes.data.albumSlug;
    
    // Track 3 downloads
    for (let i = 0; i < 3; i++) {
      await axios.post(`${galleryAPI}/${slug}/track-download/${i}`);
    }
    console.log('✅ 3 downloads tracked\n');

    // Get Analytics
    console.log('📈 Test 2: Get Analytics');
    const analyticsRes = await axios.get(
      `${API_URL}/${albumId}/analytics`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    console.log(`✅ Total Views: ${analyticsRes.data.totalViews}`);
    console.log(`✅ Total Downloads: ${analyticsRes.data.totalDownloads}\n`);

  } catch (error) {
    console.error('❌ Analytics test failed:', error.response?.data || error.message);
    throw error;
  }
};
