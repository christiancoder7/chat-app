import { DocumentData } from "firebase/firestore"
import "./SidebarChannel.scss"
import React from 'react'
import { userAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/appSlice";

type Props = {
    id: string;
    channel: DocumentData;
};

const SidebarChannel = (props: Props) => {
    const { id, channel} = props
    const dispatch = userAppDispatch()

    return (
    <div 
        className="sidebarChannel" 
        onClick={() => 
            dispatch(
                setChannelInfo({
                    channelId: id,
                    channelName: channel.channel.channelName,
                })
            )}>
        <h4>
            <span className="sidebarChannelHash">#</span>
            {channel.channel.channelName}
        </h4>
    </div>
    
    )
}

export default SidebarChannel