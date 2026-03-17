import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <div className="header-lg-container">
        <Link className="link" to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="lg-logo-img"
          />
        </Link>
        <ul className="links-ul">
          <li>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="log-out-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="header-sm-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="sm-logo-img"
        />
        <ul className="small-link-ul">
          <li>
            <Link to="/" className="link">
              <AiFillHome size={27} className="icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link">
              <BsFillBriefcaseFill size={27} className="icon" />
            </Link>
          </li>
          <li>
            <button
              className="sm-log-out-btn"
              onClick={onClickLogout}
              type="button"
            >
              <FiLogOut size={27} className="icon" />
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default withRouter(Header)
