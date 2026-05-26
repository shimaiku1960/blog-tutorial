"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const login = async (formData: FormData) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })
  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  redirect("/")

}

export const signup = async (formData: FormData) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })
  if (error) {
    redirect("/signup?error=" + encodeURIComponent(error.message));
  }
  redirect("/signup?message=" + encodeURIComponent("確認メールを送信しました。メールを確認してください。"));
}

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}