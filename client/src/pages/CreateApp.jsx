import { useForm } from "react-hook-form";
import { createApp } from "../api/appApi";
import { toast } from "react-toastify";

export default function CreateApp() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createApp(data);

      toast.success(res.data.message);

      reset();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Create App
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          placeholder="App Code"
          {...register("appCode")}
          className="border p-2 w-full mb-4"
        />

        <input
          placeholder="App Name"
          {...register("appName")}
          className="border p-2 w-full mb-4"
        />

        <button className="bg-blue-500 text-white px-5 py-2 rounded">
          Create
        </button>

      </form>

    </div>
  );
}