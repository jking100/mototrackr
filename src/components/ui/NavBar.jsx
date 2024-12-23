import { Link } from "react-router-dom";

export function NavBar() {
    const siteTitle = "MotoTrackr";

    return (
        <>
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <button className="btn btn-ghost text-xl"><Link to="/">{siteTitle}</Link></button>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost text-xl"><Link to="/log">Log</Link></button>
                <button className="btn btn-ghost text-xl"><Link to="/results">Results</Link></button>
                <button className="btn btn-ghost text-xl"><Link to="/test">Test</Link></button>
            </div>
                
        </div>
        </>
    )
}