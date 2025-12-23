import { NavLink, Outlet } from 'react-router-dom'
import { HomeIcon, ClipboardCheckIcon, CurrencyDollarIcon, UsersIcon, PlusCircleIcon, TruckIcon, ChartBarIcon } from '@heroicons/react/outline'
import { HiHome } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

  const navigate = useNavigate()

  async function handleLogOut() {
    // const response = await api.delete("/sign_out")
    // .then(response => {
    //   if (response.data.status === 200){
    //     localStorage.removeItem("auth_token");
    //     navigate('/')
    //   }
    // })
    // .catch((err) =>{
    //   console.log(err)
    // })
    localStorage.removeItem("auth_token");
    navigate('/')
  }
  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between p-5">
        <nav className="flex flex-col space-y-4 flex-1 justify-center flex-grow">
          <NavLink to="/dashboard" className="flex items-center p-3 rounded hover:bg-gray-700">
            <HomeIcon className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/order-status" className="flex items-center p-3 rounded hover:bg-gray-700">
            <ClipboardCheckIcon className="w-5 h-5 mr-3" />
            Order Status
          </NavLink>
          <NavLink to="/dashboard/transactions" className="flex items-center p-3 rounded hover:bg-gray-700">
            <CurrencyDollarIcon className="w-5 h-5 mr-3" />
            Transactions
          </NavLink>
          <NavLink to="/dashboard/users" className="flex items-center p-3 rounded hover:bg-gray-700">
            <UsersIcon className="w-5 h-5 mr-3" />
            Users
          </NavLink>
          <NavLink to="/dashboard/create-restaurant" className="flex items-center p-3 rounded hover:bg-gray-700">
            <PlusCircleIcon className="w-5 h-5 mr-3" />
            Create Restaurant
          </NavLink>
          <NavLink to="/dashboard/manage-restaurants" className="flex items-center p-3 rounded hover:bg-gray-700">
            <HiHome className="w-5 h-5 mr-3" />
            Manage Restaurants
          </NavLink>
          <NavLink to="/dashboard/manage-riders" className="flex items-center p-3 rounded hover:bg-gray-700">
            <TruckIcon className="w-5 h-5 mr-3" />
            Manage Riders
          </NavLink>
          <NavLink to="/dashboard/revenue" className="flex items-center p-3 rounded hover:bg-gray-700">
            <ChartBarIcon className="w-5 h-5 mr-3" />
            Revenue
          </NavLink>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleLogOut}
          >
            Sign-Out
          </button>
        </nav>
      
      </div>
    

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
