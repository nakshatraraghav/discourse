import React from "react";
import Link from "next/link";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <React.Fragment>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>We&apos;re excited to see you again!</CardDescription>
      </CardHeader>
      <CardContent>Login Form</CardContent>
      <CardFooter className="flex space-x-2 text-sm text-muted-foreground">
        <div>Need an account?</div>
        <Link href="/register" className="underline">
          Register
        </Link>
      </CardFooter>
    </React.Fragment>
  );
}
