'use client';

import React, { useContext } from "react";
import { AuthContext } from "@/providers/AuthContext";
import { Loader2, Mail, User, ShieldCheck } from "lucide-react";

const Profile = () => {
  // Destructuring user and loading from context
  const { user, loading } = useContext(AuthContext);

  // 1. Loading State: Wait until Firebase returns user data
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  // 2. Fallback: If no user is found after loading
  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-foreground">Please log in to view your profile.</h2>
      </div>
    );
  }

  // Safe to destructure now
  const { displayName, email, photoURL, metadata } = user;

  return (
    <section className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-card border border-border shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Top Decorative Header with your instruction's gradient */}
          <div className="h-32 bg-linear-to-b from-primary to-primary/80"></div>

          <div className="px-8 pb-10">
            {/* Avatar Section */}
            <div className="relative -mt-16 mb-6">
              <img
                src={photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                alt={displayName}
                className="w-32 h-32 rounded-2xl border-4 border-card shadow-lg object-cover bg-background"
              />
              <div className="absolute bottom-2 left-24 bg-green-500 border-2 border-card w-5 h-5 rounded-full" title="Active"></div>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">{displayName || "Anonymous Reader"}</h1>
                <p className="text-primary font-medium flex items-center gap-1">
                  <ShieldCheck size={16} /> Verified Member
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-background rounded-2xl border border-border">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 uppercase font-bold tracking-wider">Email Address</p>
                    <p className="font-semibold text-foreground">{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-background rounded-2xl border border-border">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/50 uppercase font-bold tracking-wider">Account ID</p>
                    <p className="font-semibold text-foreground text-sm truncate">{user.uid}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="btn-primary flex-1">
                  Edit Profile
                </button>
                <button className="px-6 py-3 border border-border rounded-2xl font-bold hover:bg-red-50 hover:text-red-600 transition-all">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;