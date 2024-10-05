import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export default function SignUp({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  function validateForm() {
    let isValid = true;
    const newErrors = { username: "", email: "", password: "" };

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  const signUpMutation = useMutation({
    mutationFn: async (registerFormData: RegisterFormData) =>
      await register(registerFormData),
    onSuccess: async (data) => {
      setIsOpen(false);
      toast.success("Account created successfully.");
    },
    onError: (error) => {
      console.error("Sign up failed", error);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (validateForm()) {
      signUpMutation.mutate(formData);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="Jhondoe123"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && (
            <span className="text-red-500 text-xs">{errors.username}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={signUpMutation.isPending}
      >
        {signUpMutation.isPending ? "Signing Up..." : "Sign Up"}
      </Button>
      {signUpMutation.isError && (
        <p className="text-red-500 mt-2 text-xs">
          {signUpMutation.error.message || "Sign up failed."}
        </p>
      )}
    </form>
  );
}
