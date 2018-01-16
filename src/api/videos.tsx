import axios from 'axios';

export function getMarginVideos(): Promise<any> {
    return axios.get('/margins/list');
}

export function updateMarginVideo(info:any): Promise<any> {
    return axios.post('/margins/' + info.id, info);
}