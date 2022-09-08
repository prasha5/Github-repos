// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoData} = props
  const {name, issuesCount, forkCount, starsCount, avatarUrl} = repoData

  return (
    <li className="repo-list">
      <img src={avatarUrl} alt="avatar" className="image" />
      <p className="description">{name}</p>
      <div className="containerOne">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="containerOne">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star"
        />
        <p className="count">{forkCount} forks</p>
      </div>
      <div className="containerOne">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
