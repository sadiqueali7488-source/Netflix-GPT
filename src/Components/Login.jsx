import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE, LOGOUT } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const fullname = useRef(null);
  const address = useRef(null);

  const toggleSignInform = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButton = (e) => {
    e.preventDefault();

    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    const fullnameValue = fullname.current?.value || "";
    const addressValue = address.current?.value || "";

    if (!isSignInForm) {[]}

    const message = checkValidData(
      emailValue,
      passwordValue,
      fullnameValue,
      addressValue,
      !isSignInForm
    );

    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // SIGN UP
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullnameValue,
            photoURL: LOGOUT,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  photoURL: photoURL,
                  fullname: displayName,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => setErrorMessage(error.code + "-" + error.message));
    } else {
      // SIGN IN
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          const { uid, email, displayName, photoURL } = user;
          dispatch(
            addUser({
              uid: uid,
              email: email,
              photoURL: photoURL,
              fullname: displayName,
            })
          );
        })
        .catch((error) => setErrorMessage(error.code + "-" + error.message));
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BG_IMAGE} alt="image" />
      </div>
      <div className="mx-120">
        <div className="absolute flex min-h-screen items-center justify-center  bg-black bg-opacity-70 mt-10">
          <div className="w-full max-w-sm rounded-md bg-black bg-opacity-80 p-8 shadow-lg">
            <h2 className="mb-6 text-3xl font-bold text-white">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h2>

            <form className="space-y-4">
              {!isSignInForm && (
                <input
                  ref={fullname}
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded bg-neutral-800 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              )}

              {!isSignInForm && (
                <input
                  ref={address}
                  type="text"
                  placeholder="Address"
                  className="w-full rounded bg-neutral-800 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              )}

              <input
                ref={email}
                type="text"
                placeholder="Email or mobile number"
                className="w-full rounded bg-neutral-800 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              />

              <input
                ref={password}
                type="password"
                placeholder="Password"
                className="w-full rounded bg-neutral-800 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              />

              <p className="text-red-500 font-bold text-lg py-2">
                {errorMessage}
              </p>

              <button
                onSubmit={(e) => e.preventDefault}
                type="submit"
                className="w-full rounded bg-red-600 py-3 font-semibold text-white hover:bg-red-700 transition"
                onClick={handleButton}
              >
                {isSignInForm ? "Sign In" : "Sign Up"}
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-400">
                <span className="h-px flex-1 bg-gray-600"></span>
                <span>OR</span>
                <span className="h-px flex-1 bg-gray-600"></span>
              </div>

              <button
                type="button"
                className="w-full rounded bg-neutral-700 py-3 font-semibold text-white hover:bg-neutral-600 transition"
              >
                Use a sign-in code
              </button>

              <a
                href="#"
                className="block text-center text-sm text-gray-400 hover:underline"
              >
                Forgot password?
              </a>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-red-600 cursor-pointer"
                  />
                  Remember me
                </label>

                <span
                  className="text-white hover:underline cursor-pointer"
                  onClick={toggleSignInform}
                >
                  {isSignInForm
                    ? "New to Netflix Sign up Now"
                    : "Already Registered? Sign In Now"}
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
