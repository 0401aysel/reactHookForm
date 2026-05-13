import "./App.css";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/*interface IForm {
  name: string;
  surname: string;
  email: string;
  password: string;
}
*/
const schema = yup
  .object({
    name: yup.string(),
    surname: yup.string(),
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function App() {
  const { register, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  console.log(watch());

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Enter name:</label>
        {
          <input
            defaultValue="Aysel"
            type="text"
            {...register("name")}
            placeholder="enter name . . ."
          />
        }
        <label htmlFor="surname">Enter surname:</label>
        {
          <input
            type="text"
            defaultValue={"Sadiqova"}
            placeholder="enter surname"
            {...register("surname")}
          />
        }
        <label htmlFor="email">Enter email:</label>
        {<input type="text" placeholder="enter email" {...register("email")} />}
        <label htmlFor="name">Enter password:</label>
        {
          <input
            type="password"
            placeholder="enter password"
            {...register("password")}
          />
        }
        {<input type="submit" />}
      </form>
    </>
  );
}

export default App;
