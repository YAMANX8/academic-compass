import { paths } from './routes/paths';

// API
export const ACADEMIC_COMPASS_HOST_API = import.meta.env.VITE_ACADEMIC_COMPASS_HOST_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.student.root; // as '/dashboard'
