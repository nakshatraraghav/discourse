import React from "react";
import Link from "next/link";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "@/components/auth/form/register-form";

export default function RegisterPage() {
  return (
    <React.Fragment>
      <CardHeader>
        <CardTitle>Create an Account</CardTitle>
        <CardDescription>Join us and get started!</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex space-x-2 text-sm text-muted-foreground">
        <div>Already have an account?</div>
        <Link href="/login" className="underline">
          Login
        </Link>
      </CardFooter>
    </React.Fragment>
  );
}
