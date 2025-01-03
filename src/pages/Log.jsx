import { GPSProvider } from "@/components/features/geolocation";
import AppViewCoordinator from "@/components/motoLeanApp/AppViewCoordinator";

export function Log() {
    return (
        <>
            <GPSProvider>
                <AppViewCoordinator />
            </GPSProvider> 
            <a href="/" className="btn btn-sm rounded-badge btn-accent fixed bottom-4 right-4">Home</a>
        </>
    );
}