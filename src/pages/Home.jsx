import { NavBar } from "@/components/ui/NavBar";
export function Home() {
    return (
        <>
            <div className="flex justify-center h-dvh items-center p-4">
            <div className="card w-full max-w-md shadow-xl">
            <div className="card-body">
    <h1 className="card-title text-4xl font-bold justify-left mb-4">MotoTrackr</h1>

    <div className="text-left mb-6">
        <p className="text-center text-lg text-primary">Track your riding performance with precision</p>
        <p className="text-left text-sm text-base-content/80 mt-2">
            Capture essential metrics from your motorcycle rides including maximum lean angles, 
            acceleration data, and route analytics. Perfect for riders looking to improve their 
            technique and track their progress over time.
        </p>
    </div>

    {/* Install Instructions - Collapsible */}
    <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" /> 
        <div className="collapse-title font-medium">
            📱 Installation Instructions
        </div>
        <div className="collapse-content">
            <div className="space-y-4 text-sm pt-2">
                <div className="space-y-2">
                    <p className="font-medium">iPhone / iPad:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-1">
                        <li>Tap the share button <span className="inline-block">⎋</span></li>
                        <li>Choose &quot;Add to Home Screen&quot;</li>
                    </ol>
                </div>

                <div className="space-y-2">
                    <p className="font-medium">Android:</p>
                    <ol className="list-decimal list-inside space-y-1 pl-1">
                        <li>Tap the menu button <span className="inline-block">⋮</span></li>
                        <li>Choose &quot;Install App&quot;</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</div>         
</div> 
</div>            
        </>
    );
}