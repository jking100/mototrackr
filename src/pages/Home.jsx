export function Home() {
  const installInstructions = (
    <div className="collapse collapse-arrow bg-accent text-accent-content">
      <input type="checkbox" />
      <div className="collapse-title font-medium">
        📱 Installation Instructions
      </div>
      <div className="collapse-content">
        <div className="space-y-4 text-sm pt-2">
          <div className="space-y-2">
            <p className="font-medium">iPhone:</p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>
                Tap the share button <span className="inline-block">⎋</span>
              </li>
              <li>Choose &quot;Add to Home Screen&quot;</li>
            </ol>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Android:</p>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>
                Tap the menu button <span className="inline-block">⋮</span>
              </li>
              <li>Choose &quot;Install App&quot;</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-dvh items-center">
      <div className="card bg-base-300 ml-2 mr-2 shadow-2xl">
        <div className="card-body">
          <h1 className="text-5xl">MotoTrackr</h1>
          <p className="text-center text-lg text-primary">
            Track your riding performance with precision
          </p>
          <p className="text-left text-sm text-base-content/70 mt-4 mb-2">
            Capture essential metrics from your motorcycle rides including
            maximum lean angles, acceleration data, and route analytics. Perfect
            for riders looking to improve their technique and track their
            progress over time.
          </p>
          <div className="card-actions justify-center">
            {installInstructions}
          </div>
        </div>
      </div>
    </div>
  );
}
