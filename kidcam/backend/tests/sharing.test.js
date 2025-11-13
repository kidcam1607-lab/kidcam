import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sharing';

export const testSharing = async (albumId, token) => {
  console.log('\n🔗 Testing Sharing Features...\n');
  
  try {
    // Test QR Code Generation
    console.log('📱 Test 1: Generate QR Code');
    const qrRes = await axios.get(`${API_URL}/${albumId}/qrcode`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (qrRes.data.qrCode && qrRes.data.qrCode.startsWith('data:image')) {
      console.log('✅ QR code generated');
      console.log(`✅ Album URL: ${qrRes.data.albumUrl}\n`);
    }

    // Test Email Sending (if email configured)
    console.log('✉️ Test 2: Send Email Link');
    try {
      const emailRes = await axios.post(
        `${API_URL}/${albumId}/send-email`,
        { email: 'test@example.com' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('✅ Email sent successfully\n');
    } catch (error) {
      console.log('⚠️ Email test skipped (check EMAIL credentials in .env)\n');
    }

    // Test WhatsApp Link
    console.log('💬 Test 3: Generate WhatsApp Link');
    const waRes = await axios.get(
      `${API_URL}/${albumId}/whatsapp-link?phone=%2B919876543210`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    if (waRes.data.whatsappLink) {
      console.log('✅ WhatsApp link generated');
      console.log(`✅ Link: ${waRes.data.whatsappLink.substring(0, 50)}...\n`);
    }

  } catch (error) {
    console.error('❌ Sharing test failed:', error.response?.data || error.message);
  }
};
