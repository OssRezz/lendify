import lendifyLogo from "../../assets/images/lendify.png";
import LoginForm from "../../modules/auth/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex items-center justify-center bg-gray-100 p-6">
        <img
          src={lendifyLogo}
          alt="Lendify Login"
          className="max-w-full h-auto object-contain"
        />
      </div>

      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;