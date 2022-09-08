import {Component} from 'react'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeId: '',
    reposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    const {activeId} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.repos.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }

    setActiveLanguageId = id => {
      this.setState({activeId: id})
    }

    renderLanguageList = () => {
      const {activeId} = this.state
      return (
        <ul className="list">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageData={eachLanguage}
              setActiveLanguageId={this.setActiveLanguageId}
              isActive={eachLanguage.id === activeId}
            />
          ))}
        </ul>
      )
    }

    renderReposList = () => {
      const {reposList} = this.state
      return (
        <div className="repo-container">
          <ul className="repo-list">
            {reposList.map(eachRepo => (
              <RepositoryItem repoData={eachRepo} key={eachRepo.id} />
            ))}
          </ul>
        </div>
      )
    }

    renderReposFailureView = () => (
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view-img.png"
        alt="failure view"
        className="failure-image"
      />
    )

    renderLoader = () => (
      <div className="products-loader-container" testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )

    render(){
        const {apiStatus}=this.state
         switch (apiStatus) {
        case apiStatusConstants.success:
        return this.renderPrimeDealsList()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return (
            <div className="githubContainer">
                <div className="container">
                    <h1 className="heading">Popular</h1>
                </div>
                {this.renderLanguageList()}

            </div>
        )
    }

    }
  }
}

export default GithubPopularRepos
