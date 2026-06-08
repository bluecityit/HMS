import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Bed, Activity, DollarSign } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    { name: "Total Patients", value: "1,248", icon: Users, color: "text-blue-500" },
    { name: "Bed Occupancy", value: "85%", icon: Bed, color: "text-orange-500" },
    { name: "Active Doctors", value: "42", icon: Activity, color: "text-green-500" },
    { name: "Today's Revenue", value: "$12,400", icon: DollarSign, color: "text-purple-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Patient Admission Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-zinc-500">
            Chart Component Placeholder
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-medium">
                    {`P${i}`}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-white">Patient Name {i}</p>
                    <p className="text-sm text-zinc-400">Dr. Smith - Cardiology</p>
                  </div>
                  <div className="ml-auto font-medium text-sm text-zinc-400">10:00 AM</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
