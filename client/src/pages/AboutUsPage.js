import React from 'react';
import PersonIcon from '../components/PersonIcon';
function AboutUsPage() {
  return (
    <>
      <div className="about-us col text-center">
        <h2 className="my-3">About our project</h2>
        <p className="mb-5 text-start">
          Welcome to our project! We are a team of educators and technology
          enthusiasts who are passionate about using game-based learning to
          engage and inspire students. Our project was inspired by Kahoot, a
          popular platform for creating and playing quizzes, and discussions. We
          believe that learning should be fun and interactive, and we have
          designed our platform to reflect this philosophy. Our platform allows
          users to create and play their own quizzes or participate in those
          created by others. We are constantly innovating and updating our
          platform to provide the best possible experience for our users. We
          hope that you will join us on this journey and discover the power of
          game-based learning for yourself!
        </p>
        <h2 className="mb-3">About our Team</h2>
        <div className="row justify-content-around bg-light text-dark rounded-5">
          <div className="col-lg-4 m-5">
            <h3>Kevin do Canto </h3>
            <div className="d-flex">
              <div>
                <PersonIcon />
                <div className="mt-3">
                  <a href="https://www.linkedin.com/in/kevindocanto/">
                    <img
                      className="about-button"
                      style={{ width: '30px' }}
                      src={require('../imgs/linkedIn_logo.png')}
                      alt=""
                    />
                  </a>
                  <a href="https://github.com/KevinDocanto">
                    <img
                      className="about-button"
                      style={{ width: '30px' }}
                      src={require('../imgs/github_logo.png')}
                      alt=""
                    />
                  </a>
                </div>
              </div>
              <p className="ms-3 text-start mt-4">
                Hello there! I am a senior student at Brooklyn College and I
                have always been passionate about web development. I love the
                creativity and problem-solving that comes with building web
                applications, and I am constantly seeking out new challenges and
                opportunities to grow as a developer."
              </p>
            </div>
          </div>
          <div className="col-lg-4 m-5">
            <h3>SeungHoon Shin</h3>
            <div className="d-flex">
              <div>
                <PersonIcon />
                <div className="mt-3">
                  <a href="https://www.linkedin.com/in/seunghoon-shin-8115b5224/">
                    <img
                      className="about-button"
                      style={{ width: '30px' }}
                      src={require('../imgs/linkedIn_logo.png')}
                      alt=""
                    />
                  </a>
                  <a href="https://github.com/shino022">
                    <img
                      className="about-button"
                      style={{ width: '30px' }}
                      src={require('../imgs/github_logo.png')}
                      alt=""
                    />
                  </a>
                </div>
              </div>

              <p className="ms-3 text-start mt-4">
                Hello! I'm SeungHoon Shin. I’ve just graduated from Queens
                College majoring in Computer Science. I love exploring and
                learning new things. Currently, I'm studying web development and
                looking for opportunities where I can learn and grow as a
                software engineer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default AboutUsPage;
