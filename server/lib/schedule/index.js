var schedule = require("node-schedule")

// 每天凌晨4点执行（几乎不影响用户操作的时间）
var rule04 = new schedule.RecurrenceRule()
rule04.dayOfWeek = [0, new schedule.Range(0, 6)]
rule04.hour = 4
rule04.minute = 0
schedule.scheduleJob(rule04, function () {　
	console.log("执行任务")
})