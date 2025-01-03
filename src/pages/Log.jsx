//import { GPSContext } from "@/components/features/geolocation/GPSContext";
import { LoggerProvider } from "@/components/motoLeanApp/LoggerProvider";
import { LoggingApplet } from "@/components/motoLeanApp/LoggingApplet";

export function Log() {
    return (
        <>
            <LoggerProvider>
                <LoggingApplet />
            </LoggerProvider> 
            <a href="/" className="btn btn-sm rounded-badge btn-accent fixed bottom-4 right-4">Home</a>
        </>
    );
}