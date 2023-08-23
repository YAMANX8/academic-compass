import {DashboardWrapper} from "../components/index.js"
function Dashboard_Student() {
    const name = 'Yaman'
  return (
    <section className="px-[120px] py-[48px] text-dark">
        <div className="">
            <DashboardWrapper heading="My Profile" optionalText={`Welcome back, ${name}`}>
            
            </DashboardWrapper>
        </div>
    </section>
  )
}

export default Dashboard_Student