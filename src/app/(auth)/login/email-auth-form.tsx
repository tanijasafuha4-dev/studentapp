"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleEmailLogin, handleEmailSignUp } from "./actions";

const loginSchema = z.object({
  email: z.string().email("无效的邮箱地址"),
  password: z.string().min(6, "密码长度必须至少为 6 位"),
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
    try {
      // 设定 8 秒超时拦截
      const timeoutPromise = new Promise<{ error?: string }>((resolve) =>
        setTimeout(() => resolve({ error: "登录请求超时，请检查网络或稍后重试。" }), 8000)
      );
      
      const result = await Promise.race([handleEmailLogin(values), timeoutPromise]);

      if (result?.error) {
        // 精准拦截 Supabase 的未验证报错并汉化
        if (result.error.includes("Email not confirmed")) {
          setMessage({ type: "error", text: "该邮箱尚未验证，请前往收件箱点击验证链接。" });
        } else if (result.error.includes("Invalid login credentials")) {
          setMessage({ type: "error", text: "账号或密码错误，请重新输入。" });
        } else {
          setMessage({ type: "error", text: result.error });
        }
      }
    } finally {
      // 无论发什么情况，强制停止转圈动画
      setIsLoading(false);
    }
  };

  const onSignUp = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    setMessage(null);
    try {
      // 设定 8 秒超时拦截
      const timeoutPromise = new Promise<{ error?: string; success?: string }>((resolve) =>
        setTimeout(() => resolve({ error: "注册请求超时，请检查网络或稍后重试。" }), 8000)
      );
      
      const result = await Promise.race([handleEmailSignUp(values), timeoutPromise]);
      
      if (result?.error) {
        setMessage({ type: "error", text: result.error });
      } else if (result?.success) {
        setMessage({ type: "success", text: result.success });
        form.reset();
      }
    } finally {
      setIsLoading(false);
    }
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
