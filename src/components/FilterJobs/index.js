import {Component} from 'react'
import {FaSearch} from 'react-icons/fa'
import './index.css'

class FilterJobs extends Component {
  state = {
    empTypeList: [],
    searchIp: '',
  }

  onSearchJob = event => {
    this.setState({searchIp: event.target.value})
  }

  onInitiateSearch = () => {
    const {searchIp} = this.state
    const {onChangeSearchInput} = this.props
    onChangeSearchInput(searchIp)
  }

  onhandleChange = event => {
    const {empTypeList} = this.state
    const {value, checked} = event.target
    const {onChangeEmploymentType} = this.props
    let updatedList
    if (checked) {
      updatedList = [...empTypeList, value]
    } else {
      updatedList = empTypeList.filter(each => each !== value)
    }
    this.setState({empTypeList: updatedList}, () => {
      onChangeEmploymentType(updatedList.join(','))
    })
  }

  onKeyDownEvent = event => {
    if (event.key === 'Enter') {
      this.onInitiateSearch()
    }
  }

  onHandleRadioChange = event => {
    const {onChangeMinSalary} = this.props
    onChangeMinSalary(event.target.value)
  }

  render() {
    const {
      employmentTypesList,
      salaryRangesList,
      renderProfileUI,
      renderJobsUI,
    } = this.props
    const {searchIp} = this.state
    return (
      <div className="filter-groups-container">
        <div className="filter-group-left-container">
          <div className="search-container">
            <input
              type="search"
              value={searchIp}
              className="search-ip"
              placeholder="Search"
              onChange={this.onSearchJob}
              onKeyDown={this.onKeyDownEvent}
            />
            <button
              className="search-btn"
              data-testid="searchButton"
              type="button"
              onClick={this.onInitiateSearch}
            >
              <FaSearch className="s-icon" size={20} />
            </button>
          </div>
          {renderProfileUI()}
          <hr className="seperator" />
          <h1 className="filter-heading">Type of Employment</h1>
          <ul>
            {employmentTypesList.map(eachType => (
              <li className="li-item" key={eachType.employmentTypeId}>
                <input
                  type="checkbox"
                  className="ip-checkbox"
                  id={eachType.employmentTypeId}
                  value={eachType.employmentTypeId}
                  onChange={this.onhandleChange}
                />
                <label htmlFor={eachType.employmentTypeId}>
                  {eachType.label}
                </label>
              </li>
            ))}
          </ul>
          <hr className="seperator" />
          <h1 className="filter-heading">Salary Range</h1>
          <ul className="sal-ul">
            {salaryRangesList.map(eachItem => (
              <li className="li-item" key={eachItem.salaryRangeId}>
                <input
                  type="radio"
                  id={eachItem.salaryRangeId}
                  value={eachItem.salaryRangeId}
                  className="radio"
                  name="radio-group"
                  onChange={this.onHandleRadioChange}
                />
                <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="jobs-container">
          <div className="search-container-lg">
            <input
              type="search"
              value={searchIp}
              className="search-ip-lg"
              placeholder="Search"
              onChange={this.onSearchJob}
              onKeyDown={this.onKeyDownEvent}
            />
            <button
              className="search-btn"
              type="button"
              onClick={this.onInitiateSearch}
            >
              <FaSearch className="s-icon" size={20} />
            </button>
          </div>
          {renderJobsUI()}
        </div>
      </div>
    )
  }
}

export default FilterJobs
