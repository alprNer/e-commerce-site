import { useState } from "react";
import Layout from "../../components/Layout";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase/FirebaseConfig";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) return toast.error("Please fill all fields",{
      autoClose: 800,
      closeOnClick: true,
    });

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", JSON.stringify(result));
      toast.success("Login Successfully", {
        autoClose: 800,
        closeOnClick: true,
      });
      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              alprN-STORE'a hoşgeldiniz 
            </h1>
            
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Login to alprN-Store
            </h2>
            <form method="post" onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="text-white bg-violet-500 border-0 py-2 px-8 focus:outline-none hover:bg-violet-600 rounded text-lg">
                Giriş
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              Hesabınız yok mu?{" "}
              <Link className="text-blue-800" to={"/signup"}>
                Tıklayın ve hemen kayıt olun
              </Link>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
