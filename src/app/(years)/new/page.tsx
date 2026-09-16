"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { createSchoolYear } from "@/app/actions/school-year";
import { useTranslation } from "@/hooks/use-translation";
import BackButton from "@/components/shared/back-button";

export default function NewYearPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 定制南开专属的表单验证逻辑
  const formSchema = z.object({
    class: z.coerce
      .number({
        invalid_type_error: "请输入有效的年级数字",
      })
      .min(1, "最低为大一 (1)")
      .max(4, "最高为大四 (4)") // 本科四年制
      .refine((val) => !isNaN(val), {
        message: "年级必须是数字",
      }),
    country: z.string(), // 复用字段：改为代表“校区”
    grading_system: z.string().default("nankai_100_point"),
    vacation_region: z.string().default("autumn_semester"), // 复用字段：改为代表“学期”
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class: 1, // 默认大一
      country: "jinnan", // 默认津南校区
      vacation_region: "autumn", // 默认秋季学期
      grading_system: "nankai_100_point", // 默认百分制
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await createSchoolYear({
        class: values.class,
        grading_system: values.grading_system,
        vacation_region: values.vacation_region,
      });
      // 依然原样传给后端，数据库存入的将是我们自定义的字符串
      router.push("/home");
    } catch (error) {
      console.error("Failed to create school year:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <BackButton url="/years" />
      <div className="mb-8 pt-8 text-center">
        <h1 className="text-3xl font-bold">创建新学期</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* 1. 年级选项 (Class) */}
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前年级 (本科)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  请输入 1 到 4 之间的数字（1代表大一，以此类推）。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 2. 校区选项 (原 Country) */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>所在校区</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择校区" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="jinnan">津南校区</SelectItem>
                    <SelectItem value="balitai">八里台校区</SelectItem>
                    <SelectItem value="teda">泰达校区</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 3. 学期选项 (原 Region) */}
          <FormField
            control={form.control}
            name="vacation_region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前学期</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择学期" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="autumn">秋季学期</SelectItem>
                    <SelectItem value="spring">春季学期</SelectItem>
                    <SelectItem value="summer">夏季小学期</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 4. 评分系统 (Grading System) */}
          <FormField
            control={form.control}
            name="grading_system"
            render={({ field }) => (
              <FormItem>
                <FormLabel>成绩评定系统</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择评分系统" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nankai_100_point">百分制 (0-100分)</SelectItem>
                    <SelectItem value="nankai_gpa">绩点制 (GPA)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2">正在创建...</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              "确认创建"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
