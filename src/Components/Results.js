import { battle } from "../API/Api";
import { FaUser, FaCompass, FaBriefcase, FaUserFriends, FaUsers } from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import PropTypes from 'prop-types'
import Tooltip from './Tooltip'
import queryString from 'query-string'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';



function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  )
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

const Results = ({theme}) => {

    const [winner,setWinner] = useState("");
    const [loser,setLoser] = useState("");
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const { search } = useLocation();
    const { playerOne,playerTwo } = queryString.parse(search);


    useEffect(() => {
         battle([playerOne, playerTwo])
          .then((players) => {
            setWinner(players[0])
            setLoser(players[1])
            setError(null)
            setLoading(false);
            
          })
          .catch(({ message }) => {
            setError(message);
            setLoading(false)
          })
    },[]);


    return (

        <>
           { loading && <Loading text="Battling" />}
           {error && <p className="center-text error">{error}</p>}
{ 
       winner &&
       <>
          <div className="grid space-around container-sm">
          <Card
           theme={theme}
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score}`}
            avatar={winner.profile.avatar_url}
            href={winner.profile.html_url}
            name={winner.profile.login}>
            <ProfileList profile={winner.profile} />
          </Card>
          <Card
          theme={theme}
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score}`}
            avatar={loser.profile.avatar_url}
            name={loser.profile.login}
            href={loser.profile.html_url}>
            <ProfileList profile={loser.profile} />
          </Card>
        </div>
        <Link to="/battle" className="btn dark-btn btn-space">
                Reset
        </Link>
       </>
        }

    </>
    )
   
}

export default Results;