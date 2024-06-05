'use client';
import styles from './templates.module.css';

import React from 'react';
import Image from 'next/image';
import mainBanner from '@/public/images/about-main-banner.jpg';
import sectionImage1 from '@/public/images/about-section-1.jpg';
import sectionImage2 from '@/public/images/about-section-2.jpg';
import sectionImage3 from '@/public/images/about-section-3.jpg';
import sectionImage4 from '@/public/images/about-section-4.jpg';

import { InView } from 'react-intersection-observer';

const AboutTemplate = () => {
  return (
    <div className={styles['about-container']}>
      <div className={styles.about}>
        <InView>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={inView ? styles['banner-show'] : styles.banner}
            >
              <Image
                src={mainBanner}
                alt={'about-main-banner'}
                style={{ maxWidth: '100%', height: 'inherit' }}
              />
              <div className={styles['banner-label']}>
                <div className={styles['banner-title']}>Our Mission</div>
                <div className={styles.italic}>
                  “We believe that your pet needs and deserves healthy food in
                  order to grow and thrive.”
                </div>
              </div>
            </div>
          )}
        </InView>
        <InView>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={inView ? styles['section-show'] : styles.section}
            >
              <div className={styles.subtitle}>The reason we exist</div>
              <div className={styles.articles}>
                <article>
                  <div className={styles.subsubtitle}>Our Purpose</div>
                  <div>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </div>
                </article>
                <article>
                  <div className={styles.subsubtitle}>Commitment</div>
                  <div>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source.
                  </div>
                </article>
                <article>
                  <div className={styles.subsubtitle}>Benefits</div>
                  <div>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem.
                  </div>
                </article>
                <article>
                  <div className={styles.subsubtitle}>Inquiries</div>
                  <div>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour, or randomised words which don't
                    look even slightly believable. If you are going to use a
                    passage of Lorem Ipsum, you need to be sure there isn't
                    anything embarrassing hidden in the middle of text. All the
                    Lorem Ipsum generators.
                  </div>
                </article>
              </div>
            </div>
          )}
        </InView>
        <InView>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={inView ? styles['section-show'] : styles.section}
            >
              <div className={styles.subtitle}>Principles</div>
              <div className={styles.images}>
                <Image
                  src={sectionImage1}
                  alt={''}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <Image
                  src={sectionImage2}
                  alt={''}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <Image
                  src={sectionImage3}
                  alt={''}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
                <Image
                  src={sectionImage4}
                  alt={''}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <div className={styles.labels}>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
                </div>
                <div>
                  Vestibulum viverra, nisi vel blandit ultrices, lectus dui
                  gravida augue, vel fringilla.{' '}
                </div>
                <div>
                  Quisque commodo, ligula at sollicitudin sollicitudin, tellus.{' '}
                </div>
                <div>
                  Donec lacinia accumsan justo non luctus. Fusce et nunc a justo
                  hendrerit pellentesque.{' '}
                </div>
              </div>
            </div>
          )}
        </InView>
        <InView>
          {({ inView, ref }) => (
            <div
              ref={ref}
              className={inView ? styles['section-show'] : styles.section}
            >
              <div className={styles.subtitle}>Commitment</div>
              <div className={styles['last-section']}>
                <article>
                  <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean blandit, justo lobortis sodales ornare, magna mi
                    laoreet nisl, non suscipit sem turpis sed ligula. Phasellus
                    vulputate gravida magna ut venenatis. Cras leo ex, porttitor
                    sit amet volutpat nec, lacinia sed dolor. In id nunc sed
                    ligula finibus sagittis. Praesent ut finibus nibh. Etiam ac
                    metus est.
                  </div>
                </article>
              </div>
            </div>
          )}
        </InView>
      </div>
    </div>
  );
};

export default AboutTemplate;
