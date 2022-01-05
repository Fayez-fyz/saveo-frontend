import React from "react";

const Header = ({ lat, long, loc, setLat, setLong, setLoc, handleSubmit,todo,setTodo }) => {
  return (
    <nav
      className="navbar navbar-expand-sm py-4 px-2"
      style={{ backgroundColor: "#074770" }}
    >
      <form className="container-fluid mx-2" onSubmit={handleSubmit}>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <label htmlFor="inputLocation" className="text-white">
                Location Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLocation"
                placeholder="Location"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
              />
            </li>
            <li className="nav-item mx-2">
              <label htmlFor="inputLatitude" className="text-white">
                Enter Latitude
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLatitude"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </li>
            <li className="nav-item mx-2">
              <label htmlFor="inputLongitude" className="text-white">
                Enter Longitude
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLongitude"
                placeholder="Longitude"
                value={long}
                onChange={(e) => setLong(e.target.value)}
              />
            </li>
          </ul>
          <span className="navbar-text">
            <button
              type="submit"
              disabled={!loc || !lat || !long }
              className="btn btn-primary rounded-pill px-5"
              
              style={{ backgroundColor: "#72A1BF" }}
              
            >
              {!loc || !lat || !long  ? 'Add' : 'Submit'}
            </button>
          </span>
        </div>
      </form>

      {/* <form className="row ">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="col-auto mx-1">
              <label htmlFor="inputLocation" className="text-white">
                Location Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLocation"
                placeholder="Location"
              />
            </div>
            <div className="col-auto mx-1">
              <label htmlFor="inputLatitude" className="text-white">
                Enter Latitude
              </label>
              <input
                type="password"
                className="form-control"
                id="inputLatitude"
                placeholder="Latitude"
              />
            </div>
            <div className="col-auto mx-1">
              <label htmlFor="inputLongitude" className="text-white">
                Enter Longitude
              </label>
              <input
                type="password"
                className="form-control"
                id="inputLongitude"
                placeholder="Longitude"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary rounded-pill px-5">
            Submit
          </button>
        </div>
      </form> */}
    </nav>
  );
};

export default Header;
