import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 20,
    duration: '30s',
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% request di bawah 500ms
    },
};

export default function () {
    let payload = JSON.stringify({
        id: 4444,
        idBook: 0,
        firstName: "sdfsdfsd",
        lastName: "sdfsd"
    });

    let params = {
        headers: { 'Content-Type': 'application/json' },
    };

    let res = http.post('https://fakerestapi.azurewebsites.net/api/v1/Authors', payload, params);
    check(res, {
        'status is 200 or 201': (r) => r.status === 200 || r.status === 201,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });
    sleep(1);
}
