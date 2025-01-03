//import { GPSContext } from "@/components/features/geolocation/GPSContext";
import { LoggerProvider } from "@/components/motoLeanApp/LoggerProvider";
import AppViewCoordinator from "@/components/motoLeanApp/AppViewCoordinator";

export function Log() {
    return (
        <>
            <LoggerProvider>
                <AppViewCoordinator />
            </LoggerProvider> 
            <a href="/" className="btn btn-sm rounded-badge btn-accent fixed bottom-4 right-4">Home</a>
        </>
    );
}