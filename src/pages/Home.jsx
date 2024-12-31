import { NavBar } from "@/components/ui/NavBar";
export function Home() {
    return (
        <>
            <NavBar />
            <p>The app will track your 0 to 60</p>
            <p>Click log to enter the timing screen or click view to view submitted runs from all users</p>
            <p>This website is designed to be used only on devices with motion sensors</p>
        </>
    );
}