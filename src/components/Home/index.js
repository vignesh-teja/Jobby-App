import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onFindJobsBtnClick = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-bg-container">
      <Header />
      <h1 className="home-main-heading">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="home-desc">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link className="link" to="/jobs">
        <button
          type="button"
          className="find-jobs-btn"
          onClick={onFindJobsBtnClick}
        >
          Find Jobs
        </button>
      </Link>
    </div>
  )
}

export default Home
