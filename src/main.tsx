import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './style/globals.css';
import GoogleMapComponent from './googleMap.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
        <GoogleMapComponent></GoogleMapComponent>
    </StrictMode>
);
