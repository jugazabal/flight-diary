const http = require('http');

function check(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      const { statusCode } = res;
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ statusCode, body }));
    }).on('error', (err) => resolve({ error: err.message }));
  });
}

const FRONTEND_PORT = 5173;
(async () => {
  console.log(`Checking frontend (http://localhost:${FRONTEND_PORT}/)...`);
  const f = await check(`http://localhost:${FRONTEND_PORT}/`);
  if (f.error) {
    console.error('Frontend check failed:', f.error);
  } else {
    console.log('Frontend status:', f.statusCode);
  }

  console.log('Checking backend API (http://localhost:3000/api/patients)...');
  const b = await check('http://localhost:3000/api/patients');
  if (b.error) {
    console.error('Backend check failed:', b.error);
    process.exitCode = 2;
  } else {
    try {
      const parsed = JSON.parse(b.body);
      if (Array.isArray(parsed)) console.log('Backend returned array of length', parsed.length);
      else console.error('Backend returned unexpected body');
    } catch (e) {
      console.error('Backend returned non-JSON or malformed JSON');
      process.exitCode = 2;
    }
  }
})();
