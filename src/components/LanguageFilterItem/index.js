// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageData, setActiveLanguageId, isActive} = props
  const {id, language} = languageData
  const languageClassName = isActive ? 'button active' : 'button'

  const onClickLanguage = () => {
    setActiveLanguageId(id)
  }

  return (
    <li className="holder">
      <button
        className={languageClassName}
        type="button"
        onClick={onClickLanguage}
      >
        <p className="description">{language}</p>
      </button>
    </li>
  )
}
export default LanguageFilterItem
