"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteSchoolYear } from "@/app/actions/school-year";

export default function DeleteYearButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    // 阻止事件冒泡，防止误触触发整张卡片的“选择(Select)”跳转
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("确定要彻底删除该学期记录吗？相关的课程与成绩数据将被清空且无法恢复。")) {
      return;
    }

    try {
      setIsDeleting(true);
      // 调用我们在上一环节写好的后端删除函数
      await deleteSchoolYear(id);
    } catch (error) {
      console.error("Failed to delete school year:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-3 top-3 h-8 w-8 text-muted-foreground hover:bg-red-500/10 hover:text-red-500"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
