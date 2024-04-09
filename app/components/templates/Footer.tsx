import styles from "./templates.module.css";
import instagramIcn from '@/public/instagram.svg'
import youtubeIcn from '@/public/youtube.svg'

import React, { useEffect, useState } from 'react'
import Organization, { getOrganization } from "@/app/service/useOrganizationApi"
import Image from 'next/image'


const Footer = () => {
const [organization, setOrganization] = useState<Organization>({
    name: '', address: '', businessNumber: '', ceo: '', phoneNumber: '', email: '' ,instagramUrl: '', youTubeUrl: '' });
const { name, address, businessNumber, ceo, phoneNumber, email, instagramUrl, youTubeUrl } = organization;

  useEffect(() => {
    _getOrganizationInfo();
  }, []);

  const _getOrganizationInfo = async () => {
    const organization = await getOrganization();
    setOrganization(organization);
  }
  return (
    <div className={styles.footer}>
      <div className={styles['footer-section']}>
        <div>
          <h4>{ name }</h4>
          <ul>
            <li>ADDRESS: { address }</li>
            <li>BUSINESS NUMBER: { businessNumber }</li>
            <li>CEO: { ceo }</li>
            <li>C/S NUMBER: { phoneNumber }</li>
            <li>EMAIL: { email }</li>
          </ul>
        </div>
        <div>
          <h4>POLICY</h4>
          <ul>
            <li>TERMS AND CONDITIONS</li>
            <li>RETURN POLICY</li>
          </ul>
        </div>
        <div>
          <h4>C/S CENTER</h4>
          <ul>
            <li>MON-FRIㅣ09:00 - 18:00</li>
            <li>LUNCH ㅣ 12:00 - 13:00</li>
            <li>SAT, SUN, HOLIDAY OFF</li>
          </ul>
        </div>
        <div>
          <h4>SNS</h4>
          <div className={styles['icons-section']}>
            <div>
              <Image className={styles.icon} src={instagramIcn} alt={'insta-icon'} />
            </div>
            <div>
              <Image className={styles.icon} src={youtubeIcn} alt={'youtube-icon'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
