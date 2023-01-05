import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const auth = useAuth();
  let navigate = useNavigate();

  const redirectCreateRoom = () => {
    let path = '/create-room';
    navigate(path);
  };

  const redirectListOfRooms = () => {
    let path = '/rooms';
    navigate(path);
  };
  return (
    <>
      {!auth.isAuthenticated && (
        <div className="home text-white">
          <h1 className="head-1">New way of learning!</h1>
          <div className="container-home rounded">
            <h2 className="header text-center">Welcome to e-Study!</h2>
            <div className="content justify-content-center">
              <p className="p-2 text-start">
                <span className="h1">A</span>
                &nbsp;&nbsp;platform that allows users to create and participate
                in Kahoot-style quizzes, as well as engage in discussions
                through the use of forums.
              </p>
              <img
                className="img-section p-2 rounded"
                src={require('../imgs/online_education.png')}
                alt="online education"
              />
            </div>
            <br />
            <div className="content d-flex flex-row-reverse justify-content-center">
              <p className="p-2 text-start">
                <span className="h1">U</span>
                sers can create their own rooms where they can host their
                quizzes and invite others to participate. They can also create
                forum posts and answer posts made by others in the community.
                This platform provides a fun and interactive way for users to
                learn and test their knowledge on a variety of topics.
              </p>
              <img
                className="img-section p-2 rounded"
                src={require('../imgs/online_education2.png')}
                alt="online education"
              />
            </div>
            <br />
            <div className="content d-flex justify-content-center">
              <p className="text-start p-2">
                <span className="h1">T</span>he app e-Study is constantly being
                updated with new features to enhance the user experience. These
                updates ensure that the platform remains current and relevant,
                and provide users with new ways to interact with the content and
                each other. The addition of new features also allows users to
                discover new ways to engage with the platform, and keeps them
                coming back for more. Whether you are creating quizzes,
                participating in discussions, or simply exploring the various
                features of the platform, there is always something new and
                exciting to discover.
              </p>
              <img
                className="img-section p-2"
                src={require('../imgs/online_education3.png')}
                alt="online education"
              />
            </div>
            <br />
            <br />
          </div>

          <footer className="mb-3">
            <figcaption className="text-center">
              <h6>Image Credits:</h6>
              <div className="mx-auto w-25 text-start">
                <a href="https://www.freepik.com/free-vector/open-book-icon-education-symbol-flat-design-vector-illustration_18234114.htm#page=2&query=e%20learning%20logo&position=42&from_view=keyword">
                  Image by rawpixel.com
                </a>{' '}
                on Freepik
                <br />
                <a href="https://www.freepik.com/free-vector/online-tutorials-concept_7915189.htm#query=e%20learning&position=4&from_view=keyword">
                  Image by pikisuperstar
                </a>{' '}
                on Freepik
                <br />
                <a href="https://www.freepik.com/free-vector/online-education-teacher-students-webinar-via-video-conference-internet-connection-female-tutor-conduct-lesson-through-laptop-screen-people-distant-school-training-line-art-vector-illustration_24025496.htm#query=home%20training&position=0&from_view=keyword">
                  Image by upklyak
                </a>{' '}
                on Freepik
                <br />
                <a href="https://www.freepik.com/free-vector/female-student-listening-webinar-online_9175118.htm#&position=25&from_view=author">
                  Image by pch.vector
                </a>{' '}
                on Freepik
              </div>
            </figcaption>
          </footer>
        </div>
      )}
      {auth.isAuthenticated && (
        <div className="session-options mt-3">
          <div className="session-options">
            <button
              onClick={redirectCreateRoom}
              className="btn-session rounded "
            >
              New Room
            </button>
          </div>
          <div className="session-options">
            <button
              onClick={redirectListOfRooms}
              className="btn-session rounded"
            >
              Join Room
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
