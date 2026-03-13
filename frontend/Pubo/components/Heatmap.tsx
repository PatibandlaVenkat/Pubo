import React, { useMemo } from "react"
import { View, StyleSheet } from "react-native"

/* -----------------------------
   Types
------------------------------*/

type DayData = {
  date: string
  count: number
}

type WeekData = (DayData | null)[]

/* -----------------------------
   Helpers
------------------------------*/

function generateLast30Days(): DayData[] {
  const days: DayData[] = []
  const today = new Date()

  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)

    days.push({
      date: d.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5),
    })
  }

  return days
}

function groupIntoWeeks(data: DayData[]): WeekData[] {
  const weeks: WeekData[] = []
  let currentWeek: WeekData = new Array(7).fill(null)

  data.forEach((item) => {
    const dayIndex = new Date(item.date).getDay()
    currentWeek[dayIndex] = item

    if (dayIndex === 6) {
      weeks.push(currentWeek)
      currentWeek = new Array(7).fill(null)
    }
  })

  if (currentWeek.some((day) => day !== null)) {
    weeks.push(currentWeek)
  }

  return weeks
}

function getColor(count: number): string {
  if (!count) return "#1f2937"
  if (count === 1) return "#0e4429"
  if (count === 2) return "#006d32"
  if (count === 3) return "#26a641"
  return "#39d353"
}

/* -----------------------------
   Component
------------------------------*/

export default function HeatmapMonth() {
  const data = useMemo<DayData[]>(() => generateLast30Days(), [])
  const weeks = useMemo<WeekData[]>(() => groupIntoWeeks(data), [data])

  return (
    <View style={styles.container}>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekColumn}>
          {week.map((day, dayIndex) => (
            <View
              key={dayIndex}
              style={[
                styles.daySquare,
                {
                  backgroundColor: day
                    ? getColor(day.count)
                    : "#111827",
                },
              ]}
            />
          ))}
        </View>
      ))}
    </View>
  )
}

/* -----------------------------
   Styles
------------------------------*/

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  weekColumn: {
    marginRight: 4,
  },
  daySquare: {
    width: 14,
    height: 14,
    marginBottom: 4,
    borderRadius: 3,
  },
})