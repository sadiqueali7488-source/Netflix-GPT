export const checkValidData = (
  email,
  password,
  fullname,
  address,
  isSignUp
) => {
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  const isFullNameValid =
    !isSignUp || /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(fullname);
  const isAddressValid =
    !isSignUp || /^[a-zA-Z0-9\s,.'\-/#]{5,100}$/.test(address);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";
  if (!isFullNameValid) return "Name is not valid";
  if (!isAddressValid) return "Address is not valid";

  return null;
};
