#!/usr/bin/env node
(async () => {
  try {
    const base = 'http://localhost:3000';

    const ping = await fetch(`${base}/ping`);
    console.log('/ping', ping.status, await ping.text());

    const listRes = await fetch(`${base}/api/patients`);
    const before = await listRes.json();
    console.log('patients before:', Array.isArray(before) ? before.length : typeof before);

    const newPatient = {
      name: 'E2E Sam',
      ssn: '222-33-4444',
      occupation: 'Engineer',
      gender: 'male',
      dateOfBirth: '1995-03-04'
    };

    const createRes = await fetch(`${base}/api/patients`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newPatient)
    });
    console.log('create status', createRes.status);
    const created = await createRes.json();
    console.log('created:', created);

    const listRes2 = await fetch(`${base}/api/patients`);
    const after = await listRes2.json();
    console.log('patients after:', Array.isArray(after) ? after.length : typeof after);

    // add an entry to the created patient
    if (created && created.id) {
      const entry = {
        date: '2025-10-31',
        description: 'E2E test entry',
        specialist: 'Dr E2E',
        type: 'HealthCheck',
        healthCheckRating: 0
      };
      const addRes = await fetch(`${base}/api/patients/${created.id}/entries`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(entry)
      });
      console.log('add entry status', addRes.status);
      const added = await addRes.json();
      console.log('added entry:', added);
    } else {
      console.log('no created id, skipping entry add');
    }

    process.exit(0);
  } catch (e) {
    console.error('E2E script error', e);
    process.exit(2);
  }
})();
