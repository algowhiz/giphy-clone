import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { SiCodechef } from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";

const FollowOn = () => {
    return (
        <div className='faded-text pt-3 ml-3 flex  items-center gap-4'>
            <span className='mt-2'>Follow on :</span>
            <div className="flex gap-4 pt-3">
                <a href="">
                    <FaInstagram size={25} />
                </a>
                <a href="https://www.codechef.com/users/mandy_3636">
                    <SiCodechef size={25} />
                </a>
                <a href="https://www.linkedin.com/in/manishkadam1/">
                    <CiLinkedin size={25} />
                </a>
            </div>
        </div>
    )
}

export default FollowOn