import styles from './organisms.module.css';
import instagramIcn from '@/public/icons/instagram.svg';
import youtubeIcn from '@/public/icons/youtube.svg';

import React from 'react';
import Image from 'next/image';

import { useOrganizationGet } from '@/app/queries/queryHooks/organization/useOrganizationGet';

const Footer = () => {
  const { isLoading, data: organization } = useOrganizationGet();

  return (
    <>
      {!isLoading && (
        <div className={styles.footer}>
          <div className={styles['footer-section']}>
            <div>
              <h4>{organization.name}</h4>
              <ul>
                <li>ADDRESS: {organization.address}</li>
                <li>BUSINESS NUMBER: {organization.businessNumber}</li>
                <li>CEO: {organization.ceo}</li>
                <li>C/S NUMBER: {organization.phoneNumber}</li>
                <li>EMAIL: {organization.email}</li>
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
              <div>
                <div>
                  <a href={organization.instagramUrl} target='_blank'>
                    <Image
                      width={20}
                      height={20}
                      className={styles.icon}
                      src={instagramIcn}
                      alt={'insta-icon'}
                    />
                  </a>
                </div>
                <div>
                  <a href={organization.youTubeUrl} target='_blank'>
                    <Image
                      width={20}
                      height={20}
                      className={styles.icon}
                      src={youtubeIcn}
                      alt={'youtube-icon'}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
