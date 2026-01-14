'use client';

import React, { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { VscEyeClosed, VscEye } from "react-icons/vsc"; // Updated icons
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Loader2, UserPlus } from "lucide-react"; // Next.js friendly icons

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { createUser, signInGoogle } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const name = form.displayName.value;
    const photo = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    // Password Validation
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!regex.test(password)) {
      setIsLoading(false);
      return Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Password must be 6+ characters with uppercase, lowercase, and a number.",
        confirmButtonColor: "var(--color-primary)",
      });
    }

    try {
      // 1. Create User
      const result = await createUser(email, password);
      
      // 2. Update Profile
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      });

      Swal.fire({
        icon: "success",
        title: "Welcome to BookWorm!",
        text: "Your account has been created successfully.",
        showConfirmButton: false,
        timer: 2000,
      });

      // 3. Next.js Prefetch & Push
      router.push("/library");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background py-24 px-4">
      {/* Note: In Next.js App Router, Metadata should ideally be in 
         layout.js or a separate metadata export. 
      */}
      
      <div className="bg-card border border-border shadow-2xl rounded-3xl w-full max-w-lg p-8 md:p-12">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <UserPlus size={32} />
          </div>
          <h2 className="text-4xl font-bold text-primary mb-3 tracking-tight">Create Account</h2>
          <p className="text-foreground/60">Start your personalized reading journey today.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/80 ml-1">Full Name</label>
              <input 
                type="text" 
                name="displayName" 
                className="input-field" 
                placeholder="John Doe" 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground/80 ml-1">Photo URL</label>
              <input 
                type="text" 
                name="photoURL" 
                className="input-field" 
                placeholder="https://image.com/pic.jpg" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/80 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email" 
              className="input-field" 
              placeholder="example@mail.com" 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/80 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input-field pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VscEyeClosed size={22} /> : <VscEye size={22} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 py-2">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary" 
              required 
            />
            <span className="text-sm text-foreground/70">
              I agree to the <Link href="/terms" className="text-secondary font-bold hover:underline">Terms of Service</Link>
            </span>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full text-lg py-4 shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Creating Account...
              </span>
            ) : "Create Account"}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-foreground/40 font-bold tracking-widest">Or join with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => signInGoogle().then(() => router.push("/library"))}
          className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl border border-border bg-white hover:bg-slate-50 hover:border-primary/30 transition-all active:scale-95 font-bold text-foreground/80"
        >
          <FcGoogle size={24} /> <span>Sign Up with Google</span>
        </button>

        <p className="text-center mt-10 text-foreground/60 text-sm">
          Already a member? <Link href="/login" className="text-primary font-extrabold hover:underline">Login here</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;