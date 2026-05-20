import "./App.css";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z
  .object({
    name: z.enum(["aysel", "zaxra", "other"]),
    surname: z
      .string()
      .min(1, "surname is required")
      .max(40, "max 40 characters")
      .regex(/^[A-Za-z]+$/, "only letters allowed"),
    email: z.string().min(1, "email is required"),
    password: z.string().min(1, "password is required"),
    confirmPassword: z.string().min(1, "password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function App() {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = () => console.log(getValues());

  return (
    <>
      <h1>Complete form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Enter name:</label>
        {errors.name && (
          <span className="errorMessage">*{errors.name.message}</span>
        )}
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input placeholder="First name" {...field} />}
        />

        <label htmlFor="surname">Enter surname:</label>
        {errors.surname && (
          <span className="errorMessage">*{errors.surname.message}</span>
        )}
        <Controller
          name="surname"
          control={control}
          render={({ field }) => <input placeholder="Surname" {...field} />}
        />

        <label htmlFor="email">Enter email:</label>
        {errors.email && (
          <span className="errorMessage">*{errors.email.message}</span>
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => <input placeholder="Email" {...field} />}
        />

        <label htmlFor="password">Enter password:</label>
        {errors.password && (
          <span className="errorMessage">*{errors.password.message}</span>
        )}
        <Controller
          name="password"
          control={control}
          render={({ field }) => <input placeholder="Password" {...field} />}
        />

        <label htmlFor="confrimPassword">Enter password:</label>
        {errors.confirmPassword && (
          <span className="errorMessage">
            *{errors.confirmPassword.message}
          </span>
        )}
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input placeholder="confirm Password" {...field} />
          )}
        />

        {<input className="submitBtn" type="submit" />}
      </form>
    </>
  );
}

export default App;
