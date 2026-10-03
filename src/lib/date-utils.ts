// 传入开学日期，计算今天是第几周
export function getCurrentTeachingWeek(startDateString: string | null | undefined): number {
  if (!startDateString) return 1; // 如果用户还没设置，默认返回第1周
  
  const startDate = new Date(startDateString);
  // 将开学时间强制重置为当日凌晨 00:00:00，消除时分秒误差
  startDate.setHours(0, 0, 0, 0); 
  
  const now = new Date();
  
  // 计算当前时间与开学时间的毫秒差
  const diffTime = now.getTime() - startDate.getTime();
  
  // 毫秒转换为天数（向下取整避免跨天计算误差）
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 如果当前时间早于开学时间，说明还在放假，返回第1周或0周
  if (diffDays < 0) return 1; 

  // 天数除以7得到完整周数，加1得到当前周次
  return Math.floor(diffDays / 7) + 1;
}
