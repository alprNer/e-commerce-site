import { useState } from "react";
import Layout from "../../components/Layout";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "@firebase/firestore";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !cpassword) {
      return toast.error("Lütfen tüm bilgileri doldurunuz");
    }
    if (password !== cpassword) {
      return toast.error("Girdiğiniz şifreler uyuşmuyor", {
        autoClose: 800,
        closeOnClick: true,
      });
    }
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const userData = {
        name: name,
        email: email,
        uid: user.user.uid,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(fireDB, "users"), userData);

      toast.success("Hesabınız başarıyla oluşturuldu", {
        autoClose: 800,
        closeOnClick: true,
      });
    } catch (error) {
      console.error(Error);
      return toast.error("Hata lütfen bilgilerinizi kontol edip tekrar deneyin", {
        autoClose: 800,
        closeOnClick: true,
      });
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
            <p className="leading-relaxed mt-4">
              
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              alprN-Store'a kayıt ol
            </h2>
            <form onSubmit={handleSubmit} method="POST">
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Ad-Soyad
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
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
                  Şifreniz
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
              <div className="relative mb-4">
                <label
                  htmlFor="cpassword"
                  className="leading-7 text-sm text-gray-600"
                >
                  Şifreyi doğrula
                </label>
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button className="text-white bg-violet-500 border-0 py-2 px-8 focus:outline-none hover-bg-violet-600 rounded text-lg">
                Kayıt Ol
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">
              Zaten hesabınız var mı?{" "}
              <Link className="text-blue-800" to={"/login"}>
                Giriş Yap
              </Link>
            </p>

            
          </div>
        </div>
      </section>
    </Layout>
  );
}
