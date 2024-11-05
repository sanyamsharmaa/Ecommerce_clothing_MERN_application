import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "@/components/ui/Loading";
// import img from "../../assets/images/auth-frame.png";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const [isloading,setloading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    // setloading(true);
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      // setloading(false);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-5 z-10">
      <Loading isloading={isloading} />
      {/* <img src={img} alt="this is image" className="absolute  "/> */}
      <div className="text-center">

        <h1 className="text-3xl font-bold tracking-tight text-foreground ">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
