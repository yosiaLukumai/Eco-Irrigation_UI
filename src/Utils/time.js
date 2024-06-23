export const TimeHasPassed = (nowTime=Date("'2024-06-22T15:00:00'"), expireTime=Date('2024-06-22T15:00:00')) => {
    return expireTime > nowTime
   
}

