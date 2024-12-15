import React, { useEffect, useState } from 'react'
import "./Sidebar.scss"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; //moreアイコン
import AddIcon from '@mui/icons-material/Add';//追加アイコン
import SidebarChannel from './SidebarChannel';
import MicIcon from '@mui/icons-material/Mic';//マイクアイコン
import HeadphonesIcon from '@mui/icons-material/Headphones';//ヘッドホン
import SettingsIcon from '@mui/icons-material/Settings';//歯車アイコン
import { auth, db } from '../../firebase';
import { userAppSelector } from '../../app/hooks';
import useCollection from '../../hooks/useCollection';
import { addDoc, collection } from 'firebase/firestore';

const Sidebar = () => {
    const user = userAppSelector((state) => state.user.user)
    const { documents: channels } = useCollection("channels")

    const addChannel = async () => {
        let channelName: string | null = prompt("新しいチャンネルを作成します")

        if(channelName) {
            await addDoc(collection(db, "channels"), {
                channelName: channelName,
            })
        }
    }

    return (
    <div className='sidebar'>
        {/* sidebarLeft*/}
        <div className='sidebarLeft'>
            <div className='serverIcon'>
                <img src="./face.png" alt="" />
            </div>
            <div className='serverIcon'>
                <img src="./logo192.png" alt="" />
            </div>

        </div>
        {/* sidebarLeft*/}
        <div className='sidebarRight'>
            <div className='sidebarTop'>
                <h3>ChatApp</h3>
                <ExpandMoreIcon />
            </div>

            {/* sidebarChannels */}
            <div className='sidebarChannels'>
                <div className="sidebarChannelsHeader">
                    <div className="sidebarHeader">
                        <ExpandMoreIcon />
                        <h4>test</h4>
                    </div>
                    <AddIcon className='sidebarAddIcon' onClick={() => addChannel()} />
                </div>

                <div className="sidebarChannelList">
                    {channels.map((channel) => (
                        <SidebarChannel
                        id={channel.id}
                        channel={channel}
                        key={channel.id}
                        />
                    ))}

                </div>

                <div className="sidebarFooter">
                    <div className="sidebarAccount">
                        <img src={user?.photo} alt="" onClick={() => auth.signOut()}/>
                        <div className="accountName">
                            <h4>{user?.displayName}</h4>
                            <span>#{user?.uid.substring(0, 4)}</span>
                        </div>
                    </div>

                    <div className="sidebarVoice">
                        <MicIcon />
                        <HeadphonesIcon />
                        <SettingsIcon />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Sidebar