import {DashboardWrapper} from "../components/index.js"
function Dashboard_Student() {
    const name = 'Yaman'
  return (
    <section>
        <div>
            <DashboardWrapper heading="My Profile" optionalText={`Welcome back, ${name}`}>
            
            </DashboardWrapper>
        </div>
    </section>
  )
}

export default Dashboard_Student