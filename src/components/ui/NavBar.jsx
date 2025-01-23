import { Link } from "react-router-dom";

export function NavBar() {
  const siteTitle = "MotoTrackr";
  /*
    return (
        <>
        <div className="navbar bg-base-300 rounded-box">
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
    );
    */
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl" href="/">
          {siteTitle}
        </a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/log">Ride Tracker</a>
            </li>
            <li>
              <a href="/results">View Ride Boards</a>
            </li>
            <li>
              <a href="/test">Test Device Sensors</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
