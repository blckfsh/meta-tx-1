const { AutotaskClient } = require('defender-autotask-client');

async function run() {
    const credentials = { apiKey: 'Gt7X79CnUThX8y2Jynr8Tz5Tp6dNUqkq', apiSecret: 'AWnzhzesdjNajowxcSzq6qirgSt1QZwbZYbFPmCXthVXTUD3mtrWpZvht48g4bMj' };

    const client = new AutotaskClient({ apiKey, apiSecret });
    const { autotaskId } = await client.create({
        name: "Relay MetaTX",
        encodedZippedCode: await client.getEncodedZippedCodeFromFolder('./build/relay'),
        relayerId: relayerId,
        trigger: {
            type: 'webhook'
        },
        paused: false
    });

    console.log("Autotask created with ID ", autotaskId);
}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});