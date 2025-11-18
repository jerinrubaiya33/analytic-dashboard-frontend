// "use client";

// import { useLoginMutation } from "@/src/lib/api/authApi";
// import { useRouter } from "next/navigation";
// import { useForm, SubmitHandler } from "react-hook-form";

// interface LoginFormInputs {
//   email: string;
//   password: string;
// }

// export default function LoginPage() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

//   const [login, { isLoading, error }] = useLoginMutation();

//   const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
//     try {
//       // Call the RTK Query login mutation
//       const result = await login(data).unwrap();
//       alert(result.message || "Logged in successfully");
      
//       // Optional: you can log the result (backend sets cookie)
//       console.log("Login success:", result);

//       // Redirect to Product Management page
//       // router.push("/products");
//       router.replace("/products");

//     } catch (err) {
//       console.error("Login failed:", err);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
//       <h1 className="text-2xl font-bold mb-6">Login</h1>
      
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//         {/* Email */}
//         <input
//           type="email"
//           placeholder="Email"
//           {...register("email", { required: "Email is required" })}
//           className="p-2 border rounded"
//         />
//         {errors.email && <p className="text-red-500">{errors.email.message}</p>}

//         {/* Password */}
//         <input
//           type="password"
//           placeholder="Password"
//           {...register("password", { required: "Password is required" })}
//           className="p-2 border rounded"
//         />
//         {errors.password && <p className="text-red-500">{errors.password.message}</p>}

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>

//         {/* Display backend errors */}
//         {error && <p className="text-red-500 mt-2">Invalid email or password</p>}
//       </form>
//     </div>
//   );
// }


// login/page.tsx
"use client";

import { useLoginMutation } from "@/src/lib/api/authApi";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      console.log("Attempting login with:", data);
      const result = await login(data).unwrap();
      console.log("Login success:", result);
      
      // Use full page reload to ensure cookies are properly set
      window.location.href = "/products";
      
    } catch (err: any) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
          className="p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className="p-2 border rounded"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 mt-2">
            {(error as any)?.data?.message || "Invalid email or password"}
          </p>
        )}
      </form>
    </div>
  );
}
