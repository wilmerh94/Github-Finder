import { useContext, useEffect } from 'react';
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { getUserAndRepos } from '../context/github/GithubActions';
import { GithubContext } from '../context/github/GithubContext';
import { Spinner } from '../layout/Spinner';
import { ReposList } from '../repos/ReposList';

export const User = () => {
 const { user, loading, repos, dispatch } = useContext(GithubContext);

 const params = useParams();

 useEffect(() => {
  dispatch({ type: 'SET_LOADING' });
  const getUserData = async () => {
   const userData = await getUserAndRepos(params.login);
   dispatch({ type: 'FETCH_USER_AND_REPOS', payload: userData });
  };
  getUserData();
 }, [dispatch, params.login]);

 //DONT ADD THIS  FUNCTION DOWN TO [] BECAUSE EVERY TIME THE PAGE IS REFRESHED IT WILL BE CALLED AGAIN AND AGAIN AND AGAIN
 const {
  name,
  type,
  avatar_url,
  bio,
  blog,
  twitter_username,
  login,
  location,
  html_url,
  public_repos,
  public_gists,
  followers,
  following,
  hireable,
 } = user;

 if (loading) {
  return <Spinner />;
 }

 return (
  <>
   <div className='w-full mx-auto lg:w-10/12'>
    <div className='mb-4'>
     <Link to='/' className='btn btn-ghost'>
      Back To Search
     </Link>
    </div>
    <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
     <div className='custom-card-image mb-6 md:mb-0'>
      <div className='rounded-lg shadow-xl card image-full'>
       <figure>
        <img src={avatar_url} alt='' />
       </figure>

       <div className='card-body  justify-end '>
        <div className='flex flex-col align-super'>
         <h2 className=' card-title mb-0  '>{name}</h2>
         <p>{login}</p>
        </div>
       </div>
      </div>
     </div>
     <div className='col-span-2'>
      <div className='mb-6'>
       <h1 className='text-3xl card-title'>{name}</h1>
       <div className='ml-2 mr-1 badge badge-success'>{type}</div>
       {hireable && (
        <div className='ml-2 mr-1 badge badge-success'>Hireable</div>
       )}
       <p className='text-base-content text-opacity-40'>{bio}</p>
       <div className='mt-4 card-actions'>
        <a
         href={html_url}
         target='_blank'
         rel='noreferrer'
         className='btn btn-outline'>
         Visit Github Profile
        </a>
       </div>
      </div>
      <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
       {location && (
        <div className='stat'>
         <div className='stat-title text-md'>Location</div>
         <div className='text-lg stat-value'>{location}</div>
        </div>
       )}
       {blog && (
        <div className='stat'>
         <div className='stat-title text-md'>Website</div>
         <div className='text-lg stat-value'>
          <a href={`https://${blog}`} target='_blank' rel='noreferrer'>
           {blog}
          </a>
         </div>
        </div>
       )}
       {twitter_username && (
        <div className='stat'>
         <div className='stat-title text-md'>Twitter</div>
         <div className='text-lg stat-value'>
          <a
           href={`https://twitter.com/${twitter_username}`}
           target='_blank'
           rel='noreferrer'>
           {twitter_username}
          </a>
         </div>
        </div>
       )}
      </div>
     </div>
    </div>
    <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
     <div className='stat'>
      <div className='stat-figure text-secondary'>
       <FaUsers className='text-3xl md:text-5xl' />
      </div>
      <div className='stat-title pr-5'>Followers</div>
      <div className='stat-value pr-5 text-3xl md:text-4xl'>{followers}</div>
     </div>
     <div className='stat'>
      <div className='stat-figure text-secondary'>
       <FaUserFriends className='text-3xl md:text-5xl' />
      </div>
      <div className='stat-title pr-5'>Following</div>
      <div className='stat-value pr-5 text-3xl md:text-4xl'>{following}</div>
     </div>
     <div className='stat'>
      <div className='stat-figure text-secondary'>
       <FaCodepen className='text-3xl md:text-5xl' />
      </div>
      <div className='stat-title pr-5'>Public Repos</div>
      <div className='stat-value pr-5 text-3xl md:text-4xl'>{public_repos}</div>
     </div>
     <div className='stat'>
      <div className='stat-figure text-secondary'>
       <FaStore className='text-3xl md:text-5xl' />
      </div>
      <div className='stat-title pr-5'>Public Gists</div>
      <div className='stat-value pr-5 text-3xl md:text-4xl'>{public_gists}</div>
     </div>
    </div>
    <ReposList repos={repos} required />
   </div>
  </>
 );
};