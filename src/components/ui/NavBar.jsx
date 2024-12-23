import { Link } from "react-router-dom";

export function NavBar() {
    const siteTitle = "React+JS+TailWind+DaisyUI Template";

    return (
        <>
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <button className="btn btn-ghost text-xl"><Link to="/">{siteTitle}</Link></button>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost text-xl"><Link to="/about">About</Link></button>
                <button className="btn btn-ghost text-xl"><Link to="/log">Log</Link></button>
                <button className="btn btn-ghost text-xl"><Link to="/admin">Admin</Link></button>
            </div>
                
        </div>
        </>
    )
}