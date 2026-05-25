/**
 * Test script to validate legacy multilingual URL redirects
 * Tests that EN/RU URLs redirect 301 to Spanish canonical URLs
 */

const http = require('http');

// Test cases: [legacyUrl, expectedRedirect]
const testCases = [
  // English service + city + district
  ['/en/air-conditioning/sevilla/sur', '/aire-acondicionado/sevilla/sur'],
  
  // Russian service + city + district
  ['/ru/santekhnik/sevilla/macarena', '/fontanero/sevilla/macarena'],
  
  // English service + city
  ['/en/plumber/madrid', '/fontanero/madrid'],
  ['/en/electrician/barcelona', '/electricista/barcelona'],
  ['/en/drain-cleaning/valencia', '/desatascos/valencia'],
  ['/en/heating/malaga', '/calefaccion/malaga'],
  
  // Russian service + city
  ['/ru/elektrik/madrid', '/electricista/madrid'],
  ['/ru/prochistka-trub/barcelona', '/desatascos/barcelona'],
  ['/ru/otoplenie/sevilla', '/calefaccion/sevilla'],
  
  // English service only
  ['/en/plumber', '/fontanero'],
  ['/en/electrician', '/electricista'],
  ['/en/air-conditioning', '/aire-acondicionado'],
  
  // Russian service only
  ['/ru/santekhnik', '/fontanero'],
  ['/ru/elektrik', '/electricista'],
  ['/ru/konditsionirovanie', '/aire-acondicionado'],
  
  // District variations
  ['/en/plumber/madrid/centro', '/fontanero/madrid/centro'],
  ['/en/electrician/barcelona/eixample', '/electricista/barcelona/eixample'],
  ['/ru/santekhnik/valencia/ciutat-vella', '/fontanero/valencia/ciutat-vella'],
  
  // More district examples from the task
  ['/en/air-conditioning/madrid/salamanca', '/aire-acondicionado/madrid/salamanca'],
  ['/ru/otoplenie/barcelona/gracia', '/calefaccion/barcelona/gracia'],
  
  // Legacy URLs with Spanish slugs + EN/RU prefix (canonical variants)
  ['/en/desatascos/valencia/ciutat-vella', '/desatascos/valencia/ciutat-vella'],
  ['/ru/electricista/barcelona/sants', '/electricista/barcelona/sants'],
  ['/en/fontanero/madrid/centro', '/fontanero/madrid/centro'],
  ['/ru/desatascos/sevilla/macarena', '/desatascos/sevilla/macarena'],
  ['/en/calefaccion/malaga/centro', '/calefaccion/malaga/centro'],
  ['/ru/aire-acondicionado/valencia/extramurs', '/aire-acondicionado/valencia/extramurs'],
];

function testRedirect(path, expectedRedirect) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Redirect-Test-Script'
      }
    };

    const req = http.request(options, (res) => {
      const status = res.statusCode;
      const location = res.headers.location;
      
      const passed = status === 301 && location === expectedRedirect;
      
      resolve({
        path,
        expectedRedirect,
        status,
        location,
        passed
      });
    });

    req.on('error', (e) => {
      resolve({
        path,
        expectedRedirect,
        status: 'ERROR',
        location: null,
        passed: false,
        error: e.message
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing Legacy Multilingual URL Redirects\n');
  console.log('=' .repeat(80));
  
  const results = [];
  
  for (const [path, expectedRedirect] of testCases) {
    const result = await testRedirect(path, expectedRedirect);
    results.push(result);
    
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.path}`);
    console.log(`   Expected: 301 → ${result.expectedRedirect}`);
    console.log(`   Got:      ${result.status} → ${result.location || 'N/A'}`);
    
    if (!result.passed && result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
  }
  
  console.log('=' .repeat(80));
  
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log(`\n📊 Results: ${passed}/${testCases.length} passed, ${failed} failed\n`);
  
  if (failed === 0) {
    console.log('✅ All redirects working correctly!\n');
    process.exit(0);
  } else {
    console.log('❌ Some redirects failed. Review output above.\n');
    process.exit(1);
  }
}

// Check if dev server is running
console.log('Checking if dev server is running on http://localhost:3000...\n');

const checkServer = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'HEAD'
}, (res) => {
  console.log('✅ Dev server is running\n');
  runTests();
});

checkServer.on('error', (e) => {
  console.error('❌ Dev server is not running. Please start it with: npm run dev\n');
  console.error(`Error: ${e.message}\n`);
  process.exit(1);
});

checkServer.end();
