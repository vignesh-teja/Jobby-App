import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FilterJobs from '../FilterJobs'
import JobItem from '../JobItem'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstantValues = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstantValues.initial,
    jobapiStatus: apiStatusConstantValues.initial,
    userProfileData: {},
    jobsList: [],
    employmentType: '',
    searchInput: '',
    minimumPackage: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsData()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstantValues.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        userProfileData: updatedData,
        apiStatus: apiStatusConstantValues.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstantValues.failure})
    }
  }

  getJobsData = async () => {
    this.setState({jobapiStatus: apiStatusConstantValues.inProgress})
    const {employmentType, searchInput, minimumPackage} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobapiStatus: apiStatusConstantValues.success,
      })
    } else {
      this.setState({jobapiStatus: apiStatusConstantValues.failure})
    }
  }

  onRetryProfileFailure = () => {
    this.getProfileDetails()
  }

  onRetryJobsAPIFailure = () => {
    this.getJobsData()
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.onRetryProfileFailure}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {userProfileData} = this.state
    const {name, profileUrl, shortBio} = userProfileData
    return (
      <div className="profile-container">
        <img className="profile-img" alt="profile" src={profileUrl} />
        <h1 className="user-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileUI = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstantValues.inProgress:
        return this.renderLoadingView()
      case apiStatusConstantValues.failure:
        return this.renderProfileFailureView()
      case apiStatusConstantValues.success:
        return this.renderProfileSuccessView()
      default:
        return null
    }
  }

  onChangeSearchInput = searchInput => {
    this.setState({searchInput}, this.getJobsData)
  }

  onChangeEmploymentType = employmentType => {
    this.setState({employmentType}, this.getJobsData)
  }

  onChangeMinSalary = minimumPackage => {
    this.setState({minimumPackage}, this.getJobsData)
  }

  renderJobFailureView = () => (
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
        onClick={this.onRetryJobsAPIFailure}
      >
        Retry
      </button>
    </div>
  )

  renderJobsSuccesseView = () => {
    const {jobsList} = this.state
    const jobsListLength = jobsList.length
    return (
      <>
        {jobsListLength > 0 ? (
          <ul className="jobs-ul">
            {jobsList.map(eachJob => (
              <JobItem jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-jobs-heading">No Jobs Found</h1>
            <p className="no-jobs-desc">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </>
    )
  }

  renderJobsUI = () => {
    const {jobapiStatus} = this.state
    switch (jobapiStatus) {
      case apiStatusConstantValues.inProgress:
        return this.renderLoadingView()
      case apiStatusConstantValues.failure:
        return this.renderJobFailureView()
      case apiStatusConstantValues.success:
        return this.renderJobsSuccesseView()
      default:
        return null
    }
  }

  render() {
    const {jobsList} = this.state
    console.log(jobsList)
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <FilterJobs
            renderProfileUI={this.renderProfileUI}
            renderJobsUI={this.renderJobsUI}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onChangeSearchInput={this.onChangeSearchInput}
            onChangeMinSalary={this.onChangeMinSalary}
            onChangeEmploymentType={this.onChangeEmploymentType}
          />
        </div>
      </>
    )
  }
}

export default Jobs
