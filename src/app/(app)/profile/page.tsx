"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateUserProfile } from "@/app/actions/profile"; // 确保路径与你第一步创建的文件一致

export default function ProfileSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata) {
        // 读取 Supabase 默认存储昵称和头像的字段
        setFullName(user.user_metadata.full_name || "");
        setAvatarUrl(user.user_metadata.avatar_url || "");
      }
      setIsFetching(false);
    }
    loadUserData();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await updateUserProfile(fullName, avatarUrl);

    if (result?.error) {
      setMessage({ type: "error", text: result.error });
    } else if (result?.success) {
      setMessage({ type: "success", text: result.success });
    }
    
    setIsLoading(false);
  };

  if (isFetching) {
    return <div className="flex justify-center p-24"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">个人资料</h1>
        <p className="text-muted-foreground mt-2">定制你在南开课表系统中的对外展示形象。</p>
      </div>

      <div className="p-6 border rounded-lg bg-card">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex items-center space-x-6 mb-6">
            <div className="h-20 w-20 rounded-full bg-muted overflow-hidden flex items-center justify-center shrink-0 border">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <UserCircle className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium leading-none">预览效果</h3>
              <p className="text-sm text-muted-foreground">头像图片将在全站导航栏中显示。</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">显示昵称 (Display Name)</Label>
            <Input 
              id="fullName" 
              placeholder="例如：张三" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">头像图片链接 (Avatar URL)</Label>
            <Input 
              id="avatarUrl" 
              placeholder="https://example.com/my-avatar.jpg" 
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              请填入有效的网络图片绝对地址，暂不支持本地文件上传。
            </p>
          </div>

          {message && (
            <div className={`p-3 text-sm rounded-md ${message.type === "error" ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
              {message.text}
            </div>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            保存更改
          </Button>
        </form>
      </div>
    </div>
  );
}
