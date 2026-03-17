import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatusConstantValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    similarJobsList: [],
    jobItemInfo: {},
    jobApiStatus: apiStatusConstantValues.initial,
  }

  componentDidMount() {
    this.getJobInfoAndSimilarJobs()
  }

  onRetrySpecificJobAPIFailure = () => {
    this.getJobInfoAndSimilarJobs()
  }

  getJobInfoAndSimilarJobs = async () => {
    this.setState({jobApiStatus: apiStatusConstantValues.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobSpecificUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobSpecificUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobInfo = {
        title: fetchedData.job_details.title,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        skillsList: fetchedData.job_details.skills.map(eachSkill => ({
          skillImageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompanyInfo: {
          companyDescription:
            fetchedData.job_details.life_at_company.description,
          companyLifeUrl: fetchedData.job_details.life_at_company.image_url,
        },
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
      }
      const similarJobsData = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobItemInfo: updatedJobInfo,
        similarJobsList: similarJobsData,
        jobApiStatus: apiStatusConstantValues.success,
      })
    } else {
      this.setState({jobApiStatus: apiStatusConstantValues.failure})
    }
  }

  renderSpecificJobSuccessView = () => {
    const {jobItemInfo, similarJobsList} = this.state
    const {
      title,
      companyLogoUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      skillsList,
      lifeAtCompanyInfo,
      companyWebsiteUrl,
    } = jobItemInfo
    const {companyDescription, companyLifeUrl} = lifeAtCompanyInfo
    return (
      <div className="job-main-bg">
        <div className="job-item-details-container">
          <div className="logo-title-rating-container">
            <img
              src={companyLogoUrl}
              className="comapny-logo"
              alt="job details company logo"
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
                <BsBriefcaseFill size={19} className="j-icon" />{' '}
                {employmentType}
              </p>
            </div>
            <p className="details-ctc">{packagePerAnnum}</p>
          </div>
          <hr className="seperator" />
          <div className="desc-vist-container">
            <h1 className="info-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="vist-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit <FaExternalLinkAlt className="vist-icon" size={17} />
            </a>
          </div>
          <p className="job-desc">{jobDescription}</p>
          <h1 className="info-heading">Skills</h1>
          <ul className="skills-container">
            {skillsList.map(eachSkillItem => (
              <li className="individual-skill-item" key={eachSkillItem.name}>
                <img
                  src={eachSkillItem.skillImageUrl}
                  alt={eachSkillItem.name}
                  className="skill-img"
                />
                <p className="skill-name">{eachSkillItem.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="info-heading">Life at Company</h1>
          <div className="life-at-company-div">
            <p className="comapany-life-desc">{companyDescription}</p>
            <img
              src={companyLifeUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-ul">
          {similarJobsList.map(eachSimilarJob => (
            <SimilarJobItem
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSpecificJobFailureView = () => (
    <div className="job-api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-api-failure-img"
      />
      <h1 className="job-api-failure-heading">Oops! Something Went Wrong</h1>
      <p className="job-api-failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onRetrySpecificJobAPIFailure}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetailsUI = () => {
    const {jobApiStatus} = this.state
    switch (jobApiStatus) {
      case apiStatusConstantValues.inProgress:
        return this.renderLoadingView()
      case apiStatusConstantValues.failure:
        return this.renderSpecificJobFailureView()
      case apiStatusConstantValues.success:
        return this.renderSpecificJobSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jid-div">
        <Header />
        {this.renderJobItemDetailsUI()}
      </div>
    )
  }
}

export default JobItemDetails
