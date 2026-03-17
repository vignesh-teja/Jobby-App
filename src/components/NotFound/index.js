import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="not-found-img"
      alt="not found"
    />
    <h1 className="not-found-heding">Page Not Found</h1>
    <p className="not-found-desc">
      We are Sorry, the page you requested could <br /> not be found
    </p>
  </div>
)

export default NotFound
