import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import MatchList from './components/match-list'
import Leaderboard from './components/leaderboard';
import Compare from './components/compare';
import { SessionCollection } from '/imports/api/collections.js'
import { BiArrowBack, BiGroup, BiListUl, BiSort } from 'react-icons/bi';

export const SessionView = (props) => {

    const [tabState, setTabState] = useState('matchlist')
    const user = useTracker(() => Meteor.user());

    // Load session
    const session = useTracker(() => SessionCollection.find({ code: props.sessionCode }).fetch()[0])
    if (session == undefined) props.setSessionCode('')

    const sessionId = session._id
    const ownerLoggedIn = user != undefined && session.owner == user._id;

    return (
        <div>
            <div className='flex flex-row justify-between w-full'>
                <div className='w-1/3 text-left flex items-center'
                    onClick={() => { props.setSessionCode('') }}>
                    <BiArrowBack className='cursor-pointer' />
                </div>

                <div className="rounded-lg flex flex-row justify-between py-2 px-3 bg-gray-100 cursor-pointer w-1/2">
                    <div
                        className={'rounded-lg py-2 px-3 flex flex-row items-center justify-center space-x-2 w-1/3' + (tabState == 'matchlist' ? ' bg-white text-black shadow-md' : '')}
                        onClick={() => { setTabState('matchlist') }}>
                        <BiListUl className='text-xl' /> <div className='cursor-pointer'>Matches</div>
                    </div>
                    <div
                        className={'rounded-lg py-2 px-3 flex flex-row items-center justify-center space-x-2 w-1/3' + (tabState == 'leaderboard' ? ' bg-white text-black shadow-md' : '')}
                        onClick={() => { setTabState('leaderboard') }}>
                        <BiSort className='text' /> <div className='cursor-pointer'>Leaderboard</div>
                    </div>
                    <div
                        className={'rounded-lg py-2 px-3 flex flex-row items-center justify-center space-x-2 w-1/3' + (tabState == 'comparator' ? ' bg-white text-black shadow-md' : '')}
                        onClick={() => { setTabState('comparator') }}>
                        <BiGroup className='text-lg' /> <div className='cursor-pointer'>Compare</div>
                    </div>
                </div>

                <div className='w-1/3 text-left'></div>
            </div>

            <div style={{ height: '50px' }}></div>

            {tabState == 'matchlist' && (<MatchList sessionId={sessionId} ownerLoggedIn={ownerLoggedIn} />)}
            {tabState == 'leaderboard' && (<Leaderboard sessionId={sessionId} />)}
            {tabState == 'comparator' && (<Compare sessionId={sessionId} />)}
        </div>
    )
};
