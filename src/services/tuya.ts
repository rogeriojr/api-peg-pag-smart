import axios from 'axios';
import crypto from 'node:crypto'

const clientId = 'pxatjt7e5f3cs7dvpwxj';
const clientSecret = '532035cf3f2f43cd9edc35bdd9208b4b';
const endpoint = '/v1.0/token'; // Apenas o caminho do endpoint
const baseUrl = 'https://openapi.tuyaus.com';
const method = 'GET'; // Método HTTP
const timestamp = Date.now(); // Timestamp atual em milissegundos
const nonce = crypto.randomUUID(); // UUID gerado automaticamente

// Gerar a assinatura
function generateSignature(clientSecret: any, method: any, endpoint: any, clientId: any, timestamp: any, nonce: any) {
  // Corrigir stringToSign conforme a documentação
  const stringToSign = `${method}\n${endpoint}\n${clientId}\n${timestamp}`;
  const str = `${clientId}${timestamp}${nonce}${stringToSign}`;
  return crypto.createHmac('sha256', clientSecret).update(str).digest('hex').toUpperCase();
}

const signature = generateSignature(clientSecret, method, endpoint, clientId, timestamp, nonce);

const getToken = async () => {
  const url = `${baseUrl}${endpoint}?grant_type=1`;

  try {
    console.log(signature)
    const response = await axios.get(url, {
      headers: {
        // 'Content-Type': 'application/json',
        client_id: clientId,
        sign_method: 'HMAC-SHA256',
        t: timestamp.toString(), // O timestamp deve ser uma string
        sign: signature,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
  }
};

export const controlDevice = async (deviceId: string, command: boolean) => {
    const tokenData = await getToken();
    // const accessToken = tokenData.result.access_token;

    console.log("tokenData >", tokenData)

    // const response = await axios.post(`https://openapi.tuyaus.com/v1.0/devices/${deviceId}/commands`, {
    //     commands: [{
    //         code: 'switch_1', // Certifique-se de que 'switch_1' é o Data Point correto para controlar a trava
    //         value: command,
    //     }]
    // }, {
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //     }
    // });

    // return response.data;
    return { success: true };
}
