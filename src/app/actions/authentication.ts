"use server"

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password
        },
        asResponse: true
    })

    if (!response.ok) {
        const error = await response.json();
        return { status: false, message: error.message || "Sign-up failed." };
    }
    redirect("/dashboard")

}

export const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await auth.api.signInEmail({
        body: {
            email,
            password
        },
        asResponse: true
    })

    if (!response.ok) {
        const error = await response.json();
        return { status: false, message: error.message || "Sign-in failed." };
    }
    redirect("/dashboard")
}
