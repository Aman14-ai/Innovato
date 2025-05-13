import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCards from './StartupCards';

const UserStartups = async({id} : {id : string}) => {

    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY , {id});
    // console.log("Startups are: ");
    // console.log(startups);

  return (
    <>
      {
        startups?.length > 0 ? startups.map((startup : any , index:any) => <StartupCards key={startup._id} post={startup} />)
        : <p className='no-result'>No Posts of this user</p>
      }
    </>
  )
}

export default UserStartups
