
/**
 *  返回 天 时 分
 * @param startTime 开始时间
 * @param endTime  结束时间
 *
 * return day(天),hour(时...小时),minute(分)
 */
export function dataTime(startTime,endTime){
  const dateStartTime=new Date(startTime);
  const dateEndTime=new Date(endTime);
  const resultDate=(dateEndTime-dateStartTime)/1000;
  const resultDay=parseInt(resultDate/60/60/24);
  const resultHour=parseInt(resultDate/60/60%24);
  const resultMinute=parseInt(resultDate/60%60);
  const  day=resultDay>0?`${resultDay}天`:"";
  const hour=resultHour>0?`${resultHour}时`:"";
  const minute=resultMinute>0?`${resultMinute}分`:"";
  return {day,hour,minute};
}
