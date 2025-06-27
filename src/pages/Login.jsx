import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-hot-toast";

// ✅ Yup schema for validation
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// ✅ Firebase error messages mapped
const getFriendlyFirebaseMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'Invalid username or password.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Unable to log in. Please verify your password.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    default:
      return `Something went wrong. [${errorCode}]`;
  }
};

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [error, setError] = useState('');

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Login handler using form values
  const signInWithEmail = async (data) => {
    setAuthing(true);
    setError('');

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response.user.uid);
        toast.success("Login successful!");
        navigate("/home"); // ✅ Redirect to home after login
      })
      .catch((error) => {
        console.log("🔥 Firebase error:", error);
        const msg = getFriendlyFirebaseMessage(error.code);
        setError(msg);
        toast.error(msg);
        setAuthing(false);
      });
  };

  return (
   
    <div className="w-full h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#80CBC4" }}>
      <h1 className="absolute top-8 text-4xl font-serif font-bold text-white text-center ">Welcome to React Project!</h1>
      <div className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md p-10 w-full max-w-md">
        <h2 className="text-3xl font-serif font-bold mb-7 text-center tracking-wide whitespace-nowrap"> Sign in to your account</h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        {/* ✅ Login Form */}
        <form onSubmit={handleSubmit(signInWithEmail)} className="flex flex-col mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="p-3 mb-5 rounded-full border border-black focus:outline-none focus:border-blue-500"
            style={{ backgroundColor: "white" }}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="p-3 mb-4 rounded-full border border-black focus:outline-none focus:border-blue-500"
            style={{ backgroundColor: "white" }}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}

          <button
            type="submit"
            disabled={authing || isSubmitting}
            className="w-full text-white py-3 rounded-full font-semibold transition-colors flex justify-center items-center gap-2"
            style={{ backgroundColor: "#00796B" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#009688")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#00796B")}
          >
            Login
            {authing && (
              <span className="flex items-center gap-1 ml-2">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
              </span>
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
