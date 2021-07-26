const dev = process.env.NODE_ENV !== 'production';

export const baseURL = dev ? 'http://localhost:8080' : 'https://task-lists-api.herokuapp.com';
