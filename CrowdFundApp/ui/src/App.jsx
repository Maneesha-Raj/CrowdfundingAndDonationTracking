import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
// import NotFoundPage from "./pages/NotFoundPage";
// import CreateCarPage from "./pages/CreateCarPage";
import MainLayout from "./layouts/MainLayout";
// import ReadCarPage from "./pages/ReadCarPage";
// import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import CreateCampaignPage from "./pages/CreateCampaignPage";
import Homepage from "./pages/Homepage";
import DonatePage from "./pages/DonatePage";
import FundraiserDashboard from "./pages/FundraiserDashboard";
import IndexPage from "./pages/IndexPage";
import DonorsDashboard from "./pages/DonorsDashboard";
import AuthoritiesDashboard from "./pages/AuthoritiesDashboard";
import BankDashboard from "./pages/BankDashboard";
import CampaignListPage from "./pages/CampaignListPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<IndexPage/>} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/fundraiser" element={<FundraiserDashboard />} />
          {/* <Route path="/read-car" element={<ReadCarPage />} /> */}
          <Route path="/create-campaign" element={<CreateCampaignPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/authorities" element={<AuthoritiesDashboard/>} />
          <Route path="/donor" element={<DonorsDashboard />} />
          <Route path="/bank" element={<BankDashboard />} />
          <Route path="/campaignlist" element={<CampaignListPage />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;