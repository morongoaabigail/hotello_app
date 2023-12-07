import React from 'react'
import { LogoWhite } from '../../../components/Imports'
import { Link , useNavigate} from 'react-router-dom'
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";

function DashboardNav() {
    
    const navigate = useNavigate();

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          // Sign-out successful, you can redirect the user to the login page or other pages as needed.
          navigate("/login");
        })
        .catch((error) => {
          console.log(error.message);
          alert("Error signing out. Please try again.");
        });
    };
  

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/dashboard"><img src={LogoWhite} alt="logo" width="150" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard"> <i className="bi bi-speedometer2"></i> Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list_hotels"><i className="bi bi-building-add"></i> Rooms</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"> <i className="bi bi-basket"></i> Reservation</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add_gallery"> <i className="bi bi-images"></i> Gallery</Link>
                            </li>

                            <li className="nav-item">
                            <Link className="btn btn-outline-danger" onClick={handleSignOut}>Sign Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className=" container input-group">
                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fa fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </nav>
        </div>
    )
}

export default DashboardNav
