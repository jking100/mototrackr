import { createContext } from 'react';

// Create a context to hold our motion data
// null defualt since this will always be access thru a provider
export const DeviceMotionContext = createContext(null);