import axios from 'axios';

export function getMarginVideos(): Promise<any> {
    return axios.get('/margins/list');
}