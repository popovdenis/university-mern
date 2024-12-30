import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar"
import Dashboard from "./scenes/dashboard";

import Customers from "./pages/customers/Customers";
import CustomerEdit from "./pages/customers/CustomerEdit";
import CreateCustomer from "./pages/customers/CustomerCreate";

import Courses from "./pages/courses/Courses";
import CourseEdit from "./pages/courses/CourseEdit";
import CreateCourse from "./pages/courses/CourseCreate";

import Users from "./pages/users/Users";
import UserEdit from "./pages/users/UserEdit";
import UserCreate from "./pages/users/UserCreate";

import Invoices from "./scenes/Invoices";
import Contact from "./scenes/Constact";
import Bar from "./scenes/Bar";
import Form from "./scenes/Form";
import Line from "./scenes/Line";
import Pie from "./scenes/Pie";
import Faq from "./scenes/Faq";
function App() {
const [theme, colorMode] = useMode();

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route path="/" element={<Dashboard />} />

                <Route path="/customers" element={<Customers />} />
                <Route path="/customers/edit/:id" element={<CustomerEdit />} />
                <Route path="/customers/create" element={<CreateCustomer />} />

                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/edit/:id" element={<CourseEdit />} />
                <Route path="/courses/create" element={<CreateCourse />} />

                <Route path="/users" element={<Users />} />
                <Route path="/users/edit/:id" element={<UserEdit />} />
                <Route path="/users/create" element={<UserCreate />} />

                <Route path="/invoices" element={<Invoices />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/form" element={<Form />} />
                <Route path="/line" element={<Line />} />
                <Route path="/pie" element={<Pie />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;