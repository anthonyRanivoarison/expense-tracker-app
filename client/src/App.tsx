import {Routes, Route} from "react-router-dom";
import {SidebarProvider} from "@/components/sidebar-context";
import DefaultLayout from "@/pages/layouts/AppLayout.tsx";
import Home from "@/pages/Home"
import Dashboard from "@/pages/Dashboard";
import Expenses from "@/pages/Expenses";
import Incomes from "@/pages/Incomes"
import Receipts from "@/pages/Receipts";
import UserProfile from "@/pages/UserProfile"


export default function App() {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<DefaultLayout> <Home/> </DefaultLayout>}/>
        <Route path="/dashboard" element={<DefaultLayout> <Dashboard/> </DefaultLayout>}/>
        <Route path="/expenses" element={<DefaultLayout> <Expenses/> </DefaultLayout>}/>
        <Route path="/incomes" element={<DefaultLayout> <Incomes/> </DefaultLayout>}/>
        <Route path="/receipts" element={<DefaultLayout> <Receipts/> </DefaultLayout>}/>
        <Route path="/profile" element={<DefaultLayout> <UserProfile/> </DefaultLayout>}/>
      </Routes>
    </SidebarProvider>
  );
}
