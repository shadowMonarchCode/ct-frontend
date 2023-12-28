import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    try {
      await login(values);
    } catch (error) {
      console.log(error);
    }
    const isLoggedIn = await checkAuthUser();
    console.log(isLoggedIn);
    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({ title: "Sign in failed. Please try again." });
    }
  }

  const formFields = [
    {
      id: "username",
      type: "text",
      placeholder: "johndoe2",
      label: "Username",
    },
    {
      id: "password",
      type: "password",
      placeholder: "********",
      label: "Password",
    },
  ] as const;

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <img src="/assets/icons/logo.svg" alt="logo" className="h-9 w-9" />
          <p className="h3-semibold md:h2-semibold">Custom Tailoring</p>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-dark-3">
          Log in to your account
        </h2>
        <p className="text-center text-dark-4 small-medium md:base-regular mt-2">
          Please enter your account details
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          {formFields.map((formField) => (
            <FormField
              key={formField.id}
              control={form.control}
              name={formField.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {formField.label}
                    <span className="text-secondary-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={formField.type}
                      placeholder={formField.placeholder}
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-secondary-500 subtle-medium" />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Log in"
            )}
          </Button>
          <p className="small-regular text-dark-3 text-center mt-2">
            Don't have an account?
            <Link
              to="/sign-up"
              className="text-primary-500 small-semibold ml-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
