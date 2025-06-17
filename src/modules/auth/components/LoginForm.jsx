import { useForm } from "react-hook-form";
import { useState } from "react";
import { ErrorIcon } from "../../../assets/icons/Icons";
import { useAuth }  from "../../../context/auth/AuthContext";
import AlertClose from "../../../components/alerts/AlertClose";
import { LoginController } from "../controller/LoginController";

const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState({
    title: "",
    message: "",
    success: true,
  });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await LoginController(data);
    if (!response.success) {
      setError({
        title: response.title,
        message: response.message,
        success: response.success,
      });
      setShow(true);
      setLoading(false);
      return;
    }
    setLoading(false);
    login(response.user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-1">Lendify</h1>
        <p className="text-gray-500 text-sm">Smart. Simple. Library Lending.</p>
      </div>
      <div>
        {show && (
          <AlertClose
            icon={ErrorIcon}
            title={error.title}
            content={error.message}
            colorClass="bg-red-100 text-red-700"
            onClose={() => setShow(false)}
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="ejemplo@correo.com"
          {...register("email", { required: "Email es requerido" })}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", { required: "Contraseña es requerida" })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 pr-10 ${
              errors.password
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.058 10.058 0 012.75-4.5m3.75-2.25a9.963 9.963 0 014.5-1c4.478 0 8.268 2.943 9.542 7a9.98 9.98 0 01-1.185 2.385M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3l18 18"
                />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
