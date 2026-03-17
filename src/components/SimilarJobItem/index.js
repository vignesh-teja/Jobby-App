import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="individual-similar-job-item">
      <div className="logo-title-rating-container">
        <img
          src={companyLogoUrl}
          className="comapny-logo"
          alt="similar job company logo"
        />
        <div>
          <h1 className="job-title">{title}</h1>
          <p className="details">
            <FaStar className="star-icon" size={17} /> {rating}
          </p>
        </div>
      </div>
      <h1 className="description-heading">Description</h1>
      <p className="job-desc">{jobDescription}</p>
      <div className="location-type-div">
        <p className="details">
          <MdLocationOn size={17} className="j-icon" /> {location}
        </p>
        <p className="details">
          <BsBriefcaseFill size={17} className="j-icon" /> {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarJobItem
