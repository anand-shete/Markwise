import { lazy } from 'react';

export const Landing = lazy(() => import('./Landing'));
export const TeacherSignUp = lazy(() => import('./Teacher/Signup'));
export const TeacherLogin = lazy(() => import('./Teacher/Login'));
export const TeacherDashBoard = lazy(() => import('./Teacher/Dashboard'));
export const TeacherLogout = lazy(() => import('./Teacher/Logout'));
export const StudentSignUp = lazy(() => import('./Student/Signup'));
export const StudentLogin = lazy(() => import('./Student/Login'));
export const StudentDashBoard = lazy(() => import('./Student/Dashboard'));
export const StudentLogout = lazy(() => import('./Student/Logout'));
export const StudentScanner = lazy(() => import('./Student/Scanner'));
