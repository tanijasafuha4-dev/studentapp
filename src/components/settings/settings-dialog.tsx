"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/language-context";
import {
  BookCheck,
  Languages,
  LogOut,
  Moon,
  Settings,
  Sun,
  Trash,
  UserRound,
  BarChart3,
  CalendarDays, // 新增图标
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/use-translation";
import Icon from "../shared/icon";
import { languages } from "@/config/languages";
import { Button } from "../ui/button";
import ExamSettingsContent from "./exams/exam-settings-content";
import {
  getExamTypeGroupsForCurrentSchoolYear,
  getExamTypesForCurrentSchoolYear,
} from "@/app/actions/exams";
import { useEffect, useState } from "react";
import { logOutUser } from "@/app/actions/user";
import { ExamType, ExamTypeGroup } from "@/types/exams";
import { deleteUserAccount } from "@/app/actions/user";
import { Badge } from "../ui/badge";
import { SchoolYearSettings } from "@/types/school-year";
import { updateSchoolYearSettings } from "@/app/actions/school-year";
import { toast } from "sonner";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input"; // 新增 Input 组件
import { Label } from "../ui/label"; // 新增 Label 组件

interface SettingsDialogProps {
  children: React.ReactNode;
  settings?: SchoolYearSettings;
}

export default function SettingsDialog({
  children,
  settings: initialSettings,
}: SettingsDialogProps) {
  const defaultSettings: SchoolYearSettings = {
    enableStatistics: false,
    // 兼容可能存在的默认值
  };

  const [settings, setSettings] = useState<SchoolYearSettings & { term_start_date?: string; total_weeks?: number }>(
    initialSettings || defaultSettings,
  );

  const [initialExamTypeGroups, setInitialExamTypeGroups] = useState<
    ExamTypeGroup[]
  >([]);
  const [initialExamTypes, setInitialExamTypes] = useState<ExamType[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function getInitialData() {
      const examTypeGroups = await getExamTypeGroupsForCurrentSchoolYear();
      const examTypes = await getExamTypesForCurrentSchoolYear();
      setInitialExamTypeGroups(examTypeGroups);
      setInitialExamTypes(examTypes);
    }
    getInitialData();
  }, []);

  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  console.log(settings);

  // 修改了类型声明以支持字符串和数字的更新
  async function handleSettingChange(
    key: string,
    value: boolean | string | number,
  ) {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings as any);
    try {
      await updateSchoolYearSettings(newSettings as any);
      // 可选：静默保存不打扰用户，或者加上提示
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error(t("common.error"));
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("settings")}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="general" className="h-[450px] w-full overflow-y-auto overflow-x-hidden p-1">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="w-1/3" value="general">
              <span className="flex items-center">
                <Settings className="mr-1 h-4 w-4" /> {t("settings.general")}
              </span>
            </TabsTrigger>
            <TabsTrigger className="w-1/3" value="examTypes">
              <span className="flex items-center">
                <BookCheck className="mr-1 h-4 w-4" />{" "}
                {t("settings.exam_types")}
              </span>
            </TabsTrigger>
            <TabsTrigger className="w-1/3" value="account">
              <span className="flex items-center">
                <UserRound className="mr-1 h-4 w-4" /> {t("settings.account")}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-2">
            <div className="flex w-full items-center justify-between rounded-[1rem] py-2 text-neutral-700 transition-all duration-200 ease-in-out dark:text-neutral-300">
              <div className="flex items-center">
                <Icon className="mr-2">
                  <Sun className="h-5 w-5 dark:hidden" />
                  <Moon className="hidden h-5 w-5 dark:block" />
                </Icon>
                {t("settings.theme")}
              </div>
              <Select onValueChange={(value) => setTheme(value)} value={theme}>
                <SelectTrigger className="w-[170px]">
                  <SelectValue>
                    {theme
                      ? theme.charAt(0).toUpperCase() + theme.slice(1)
                      : ""}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">
                    {t("settings.theme.system")}
                  </SelectItem>
                  <SelectItem value="light">
                    {t("settings.theme.light")}
                  </SelectItem>
                  <SelectItem value="dark">
                    {t("settings.theme.dark")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full items-center justify-between rounded-[1rem] py-2 text-neutral-700 transition-all duration-200 ease-in-out dark:text-neutral-300">
              <div className="flex items-center">
                <Icon className="mr-2">
                  <Languages className="h-5 w-5" />
                </Icon>
                {t("settings.language")}
              </div>
              <Select
                onValueChange={(value: "en" | "de") => setLanguage(value)}
                value={language}
              >
                <SelectTrigger className="w-[170px]">
                  <SelectValue>
                    {t(`settings.language.${language}`)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {t(`settings.language.${lang}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex w-full items-center justify-between rounded-[1rem] py-2 text-neutral-700 transition-all duration-200 ease-in-out dark:text-neutral-300">
              <div className="flex items-center">
                <Icon className="mr-2">
                  <BarChart3 className="h-5 w-5" />
                </Icon>
                <div className="flex flex-col">
                  <span>{t("settings.statistics.enable")}</span>
                  <span className="text-sm text-muted-foreground">
                    {t("settings.statistics.description")}
                  </span>
                </div>
              </div>
              <Switch
                checked={settings.enableStatistics}
                onCheckedChange={() =>
                  handleSettingChange(
                    "enableStatistics",
                    !settings.enableStatistics,
                  )
                }
              />
            </div>

            {/* 新增的教学周历配置区域 */}
            <div className="mt-4 flex w-full flex-col rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="mb-4 flex items-center text-neutral-700 dark:text-neutral-300">
                <Icon className="mr-2">
                  <CalendarDays className="h-5 w-5" />
                </Icon>
                <div className="flex flex-col">
                  <span className="font-medium">教学周历配置</span>
                  <span className="text-xs text-muted-foreground">
                    设置开学日期与总周数，系统将自动推算当前教学周次
                  </span>
                </div>
              </div>
              
              <div className="space-y-4 pl-9">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="term_start_date" className="text-xs font-semibold text-neutral-500">开学首周星期一</Label>
                  <Input
                    id="term_start_date"
                    type="date"
                    className="h-9"
                    value={settings.term_start_date || ""}
                    onChange={(e) => handleSettingChange("term_start_date", e.target.value)}
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="total_weeks" className="text-xs font-semibold text-neutral-500">学期总周数 (默认 18)</Label>
                  <Input
                    id="total_weeks"
                    type="number"
                    min={1}
                    max={40}
                    className="h-9"
                    value={settings.total_weeks || 18}
                    onChange={(e) => handleSettingChange("total_weeks", Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

          </TabsContent>
          <TabsContent value="examTypes">
            <ExamSettingsContent
              initialExamTypeGroups={initialExamTypeGroups}
              initialExamTypes={initialExamTypes}
            />
          </TabsContent>
          <TabsContent value="account">
            <SettingsItem>
              <div className="flex items-center">
                <Icon className="mr-2">
                  <LogOut className="h-5 w-5" />
                </Icon>
                {t("settings.logout")}
              </div>

              <Button
                onClick={() => logOutUser()}
                variant="outline"
                className="w-[170px]"
              >
                {t("settings.logout")}
              </Button>
            </SettingsItem>

            <SettingsItem>
              <div className="flex items-center">
                <Icon className="mr-2">
                  <Trash className="h-5 w-5" />
                </Icon>
                {t("settings.account.delete")}
              </div>

              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    variant="destructive"
                    className="w-[170px]"
                    disabled={isDeleting}
                  >
                    {isDeleting
                      ? t("common.loading")
                      : t("settings.account.delete.button")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {t("settings.account.delete.confirm.title")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("settings.account.delete.confirm.description")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive hover:bg-destructive/80"
                      onClick={async (e) => {
                        e.preventDefault();
                        setIsDeleting(true);
                        try {
                          await deleteUserAccount();
                        } catch (error) {
                          console.error("Failed to delete account:", error);
                          setIsDeleting(false);
                        }
                      }}
                    >
                      {t("settings.account.delete.button")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SettingsItem>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex w-full items-center justify-between border-t pt-4 mt-2">
          <p className="text-sm text-neutral-500">
            Studentapp by Kevin Shek
          </p>
          <Badge className="ml-1 mr-2 bg-indigo-100 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-500">
            v1
          </Badge>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SettingsItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex w-full cursor-pointer items-center justify-between rounded-[1rem] py-2 text-neutral-700 transition-all duration-200 ease-in-out dark:text-neutral-300">
      {children}
    </div>
  );
}
