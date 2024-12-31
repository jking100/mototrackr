//import { GPSContext } from "@/components/features/geolocation/GPSContext";
import { GPSProvider } from "@/components/features/geolocation";
import { LoggingApplet } from "@/components/motoLeanApp/LoggingApplet";

export function Log() {
    return (
        <>
            <GPSProvider>
                <LoggingApplet />
            </GPSProvider> 
        </>
    );
}