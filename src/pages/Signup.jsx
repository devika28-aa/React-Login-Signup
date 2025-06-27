import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { handleSignup } from "../services/auth";
import InputField from "../components/InputField";

// Yup schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await handleSignup(data.email, data.password, data.name);
      toast.success("Account created successfully!");
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center" style={{ backgroundColor: " #80CBC4"}}>
      <div className="bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md p-10 w-full max-w-md">
        <h2 className="text-3xl font-serif mb-8 text-center tracking-wide">Create your account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <InputField label="Name" type="text" {...register("name")}/>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <InputField label="Email" type="email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <InputField label="Password" type="password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div>
            <InputField label="Confirm Password" type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-3 rounded-full font-semibold transition-colors flex justify-center items-center gap-2"
              style={{ backgroundColor: "#80CBC4" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#009688")}  
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#00796B")}>

            Sign Up
            {isSubmitting && (
              <span className="flex items-center gap-1 ml-2">
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
              </span>
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Log In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
