import { io } from 'socket.io-client';
import { baseUrl } from '../hooks/useFetch';

const socket = io(`${baseUrl}/notification`);

export default socket;
