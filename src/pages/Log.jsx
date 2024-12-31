//import { GPSContext } from "@/components/features/geolocation/GPSContext";
import { GPSProvider } from "@/components/features/geolocation";
import { LoggingApplet } from "@/components/motoLeanApp/LoggingApplet";

export function Log() {
    return (
        <>
            <GPSProvider>
                <LoggingApplet />
            </GPSProvider> 
            <a href="/" className="btn btn-sm rounded-badge btn-accent fixed bottom-4 right-4">Home</a>
        </>
    );
}