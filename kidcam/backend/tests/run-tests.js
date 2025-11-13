import { testAuth } from './auth.test.js';
import { testAlbums } from './albums.test.js';
import { testGallery } from './gallery.test.js';
import { testAnalytics } from './analytics.test.js';
import { testSharing } from './sharing.test.js';

const runTests = async () => {
  console.log('\n🧪 =====================================');
  console.log('   KidCam Automated Test Suite');
  console.log('===================================== 🧪\n');

  try {
    // 1. Authentication Tests
    const token = await testAuth();

    // 2. Album Tests
    const { albumId, slug } = await testAlbums(token);

    // 3. Gallery Tests
    await testGallery(slug);

    // 4. Analytics Tests
    await testAnalytics(albumId, token);

    // 5. Sharing Tests
    await testSharing(albumId, token);

    console.log('✅ ====================================');
    console.log('   All Tests Passed! 🎉');
    console.log('===================================== ✅\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ ====================================');
    console.error('   Test Suite Failed');
    console.error('===================================== ❌\n');
    process.exit(1);
  }
};

runTests();
