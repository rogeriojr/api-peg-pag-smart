import axios from 'axios';

export const access = async (deviceId: string, status: string | 'true' | 'false') => {
    return (await axios.post('http://tuya.acutistecnologia.com/access', {
        // deviceId: 'ebe2ff6900c7a53401ln3q'
        deviceId, status, accessKey: 'CTA_ACT_TCN_@2023'
    })).data
}