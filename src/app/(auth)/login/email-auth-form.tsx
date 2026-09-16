"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// 指向同级目录下的 actions.ts
import { handleEmailLogin, handleEmailSignUp } from "./actions"; 

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function EmailAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setMessage(null);
    const result = await handleEmailLogin(values);
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    }
    setIsLoading(false);
  };

  const onSignUp = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setMessage(null);
    const result = await handleEmailSignUp(values);
    
    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result?.success) {
      setMessage({ type: "success", text: result.success });
      form.reset();
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input placeholder="name@example.com" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Input type="password" placeholder="••••••••" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
        )}
      </div>

      {message && (
        <div className={`p-3 text-sm rounded-md ${message.type === "error" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-2">
        <Button className="w-full" variant="default" disabled={isLoading} onClick={form.handleSubmit(onLogin)}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          登录
        </Button>
        <Button className="w-full" variant="outline" disabled={isLoading} onClick={form.handleSubmit(onSignUp)}>
          注册并验证
        </Button>
      </div>
    </div>
  );
}
