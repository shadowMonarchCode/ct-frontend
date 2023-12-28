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
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";

const SignupForm = () => {
  // const { toast } = useToast();
  // const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      shop: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values);
    // const newUser = await createUserAccount(values);
    // if (!newUser) {
    //   return toast({
    //     title: "Sign up failed. Please try again.",
    //   });
    // }
    // const session = await signInAccount({
    //   email: values.email,
    //   password: values.password,
    // });
    // if (!session) {
    //   return toast({ title: "Sign in failed. Please try again." });
    // }
    // const isLoggedIn = await checkAuthUser();
    // if (isLoggedIn) {
    //   form.reset();
    //   navigate("/");
    // } else {
    //   return toast({ title: "Sign up failed. Please try again." });
    // }
  }

  const formFields = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "John Doe",
    },
    {
      id: "email",
      label: "Email",
      type: "text",
      placeholder: "example@gmail.com",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "*******",
    },
    {
      id: "shop",
      label: "Shop No.",
      type: "text",
      placeholder: "123",
    },
  ] as const;

  const isCreatingAccount = false;
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <img src="/assets/icons/logo.svg" alt="logo" className="h-9 w-9" />
          <p className="h3-semibold md:h2-semibold">Custom Tailoring</p>
        </div>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-dark-3">
          Create a new account
        </h2>
        <p className="text-center text-dark-4 small-medium md:base-regular mt-2">
          Please create a new account with your shop number
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
                  <FormMessage className="text-secondary-500 subtle-medium space-y-0" />
                </FormItem>
              )}
            />
          ))}

          {/* <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shop"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shop No.</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit" className="shad-button_primary">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="small-regular text-dark-3 text-center mt-2">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-primary-500 small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
