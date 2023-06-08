import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../API/Api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';
import { GoRepo } from 'react-icons/go'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip';
import { useState } from "react";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className="flex-center">
      {languages.map((language) => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={selected === language ? { color: 'rgb(187,46,31)' } : null}
            onClick={() => onUpdateLanguage(language)}>
            {language}
          </button>
        </li>
      ))}
    </ul>
  )
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
}

function ReposGrid({ repos, theme }) {
  return (
    <ul className="grid space-around">
      {repos.map((repo, index) => {
        const { name, owner, html_url, stargazers_count, forks, open_issues } = repo
        const { login, avatar_url } = owner

        return (
          <li key={html_url}>
            <Card theme={theme} header={`#${index + 1}`} avatar={avatar_url} href={html_url} name={login}>
              <ul className="card-list">
                <li>
                  <Tooltip text="Github username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <GoRepo color="red" size={22} />
                  <a href={html_url}>{name}</a>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}

const Popular = ({theme}) => {
    const [currentLanguage,setCurrentLanguage] = useState("All");
    const [error,setError] = useState(null);
    const [repo,setRepo] = useState({});

    function isLoading(){
        return !repo[currentLanguage] && error === null
    };

    const onUpdateLanguage = (updateLanguage) => {
        setCurrentLanguage(updateLanguage);
    };

    if(!repo[currentLanguage]){
        fetchPopularRepos(currentLanguage)
        .then((data) => {
           let newData = {...repo,[currentLanguage]:data};
            setRepo(newData);
        })
        .catch((err) => {
            setError("Something went wrong❌");
        })
    };
  


    return (
        <>
        <LanguagesNav selected={currentLanguage} onUpdateLanguage={onUpdateLanguage}  />
        {isLoading() && <Loading text = "Fetching Repos" />}
        {error && <p className='error center-text'>{error}</p>}
        {repo[currentLanguage] && <ReposGrid theme={theme} repos={repo[currentLanguage]} />}
        </>

    )
};
export default Popular;