import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="individual-job-item">
        <div className="logo-title-rating-container">
          <img
            src={companyLogoUrl}
            className="comapny-logo"
            alt="company logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <p className="details">
              <FaStar className="star-icon" size={18} /> {rating}
            </p>
          </div>
        </div>
        <div className="location-type-ctc-container">
          <div className="location-type-div">
            <p className="details">
              <MdLocationOn size={19} className="j-icon" /> {location}
            </p>
            <p className="details">
              <BsBriefcaseFill size={19} className="j-icon" /> {employmentType}
            </p>
          </div>
          <p className="details-ctc">{packagePerAnnum}</p>
        </div>
        <hr className="seperator" />
        <h1 className="description-heading">Description</h1>
        <p className="job-desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
