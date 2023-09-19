import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Public from './Components/Public';
import Login from './Features/Auth/Login';
import AdminNavbar from './Components/AdminNavbar';
import AdminDashboard from './Features/Admin/AdminDashboard';
import AdminAccounts from './Features/Admin/AdminAccounts';
import AdminWorkOrder from './Features/Admin/AdminWorkOrder';
import ManagerNavbar from './Components/ManagerNavbar';
import ManagerDashboard from './Features/Manager/ManagerDashboard';
import ManagerWO from './Features/Manager/ManagerWO';
import FinalInspection from './Features/Manager/FinalInspection';
import WOHistory from './Features/Manager/WOHistory';
import ClientNavbar from './Components/ClientNavbar';
import ClientDashboard from './Features/Client/ClientDashboard';
import ClientWO from './Features/Client/ClientWO';
import EmployeeNavbar from './Components/EmployeeNavbar';
import EmployeeDashboard from './Features/Employee/EmployeeDashboard';
import EmployeeWO from './Features/Employee/EmployeeWO';
import './App.css';
import Menu from './Features/Auth/Menu';
import ManagerLogin from './Features/Auth/ManagerLogin';
import ClientLogin from './Features/Auth/ClientLogin';
import EmployeeLogin from './Features/Auth/EmployeeLogin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Menu />} />
        <Route path='login' element={<Login />} />
        <Route path='manager-login' element={<ManagerLogin />} />
        <Route path='client-login' element={<ClientLogin />} />
        <Route path='employee-login' element={<EmployeeLogin />} />

        <Route path='admin' element={<AdminNavbar />}>
          <Route index element={<AdminDashboard />} />
          <Route path='accounts' element={<AdminAccounts />} />
          <Route path='work-order' element={<AdminWorkOrder />} />
        </Route>

        <Route path='manager' element={<ManagerNavbar />}>
          <Route index element={<ManagerDashboard />} />
          <Route path='work-order' element={<ManagerWO />} />
          <Route path='final-inspect' element={<FinalInspection />} />
          <Route path='wo-history' element={<WOHistory />} />
        </Route>

        <Route path='client' element={<ClientNavbar />}>
          <Route index element={<ClientDashboard />} />
          <Route path='work-order' element={<ClientWO />} />
          <Route path='wo-history' element={<WOHistory />} />
        </Route>

        <Route path='employee' element={<EmployeeNavbar />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path='work-order' element={<EmployeeWO />} />
          <Route path='wo-history' element={<WOHistory />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
