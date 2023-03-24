import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const from = location.state?.from?.pathname || '/';

  const fieldChanged = (name) => {
    return (event) => {
      let { value } = event.target;
      setData((prevData) => ({ ...prevData, [name]: value }));
    };
  };

  const signup = async (e) => {
    e.preventDefault();
    let { username, password } = data;

    try {
      await auth.signup(username, password);
      // setRedirectToReferrer(true); // used in react-router v5
      // in react-router v6 navigate changes the pages directly.
      // comment from official docs example:
      //    Send them back to the page they tried to visit when they were
      //    redirected to the login page. Use { replace: true } so we don't create
      //    another entry in the history stack for the login page.  This means that
      //    when they get to the protected page and click the back button, they
      //    won't end up back on the login page, which is also really nice for the
      //    user experience.
      navigate(from, { replace: true });
    } catch (error) {
      setErrorText(error.message);
      setError(true);
    }
  };

  let errorMessage = '';
  if (error) {
    errorMessage = (
      <div className="alert alert-danger" role="alert">
        {errorText}
      </div>
    );
  }

  return (
    <div className="row justify-content-center mt-3">
      <div className="col-10 col-md-8 col-lg-7">
        <form onSubmit={signup}>
          <div className="form-row">
            {errorMessage}
            <div className="signup-requirements bg-white ms-3">
              <ul style={{ listStyleType: 'none' }} className="mx-auto w-75">
                <li
                  style={
                    data.username.length >= 4
                      ? { color: 'black' }
                      : { color: 'red' }
                  }
                >
                  Username length must be grater than 3.
                </li>
                <li
                  style={
                    data.password.length >= 7
                      ? { color: 'black' }
                      : { color: 'red' }
                  }
                >
                  Password length must be greater than 6.
                </li>
              </ul>
            </div>
            <input
              type="username"
              className="form-control p-2 m-2"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={fieldChanged('username')}
            />
            <input
              type="password"
              className="form-control p-2 m-2"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={fieldChanged('password')}
            />
            <button type="submit" className="btn text-white p-3 mt-4">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
