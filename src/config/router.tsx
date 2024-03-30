import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Home,
  Login,
  SignUp,
  Shopping,
  Orders,
  Checkout,
  StorePage,
  Electricity,
  Internet,
  Mobile,
  Cable,
  FundWallet,
  AddNewCard,
  Send,
  ActivateUser,
  VerifyResetPassword,
  ForgotPassword,
  ResetPassword,
  Beneficairies,
  ExportStorePage,
  SavedItems,
  Exports,
  AfricanStores,
  InsurancePage,
  InsuranceCheckOut,
  FundingConfirmation,
  OrderWithCardConfirmation,
  GatewayPage,
  OrderPlacedPage,
  TransactionHistory,
  BillPayments,
  AxaInvestments,
  AxaPayment,
} from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/activate" element={<ActivateUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-reset-password" element={<VerifyResetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Home />} />
      <Route path="send" element={<Send />} />
      <Route path="shopping">
        <Route index element={<Shopping />} />
        <Route path=":id" element={<StorePage />} />
      </Route>
      <Route path="/orders" element={<Orders />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/electricity" element={<Electricity />} />
      <Route path="/internet" element={<Internet />} />
      <Route path="/mobile" element={<Mobile />} />
      <Route path="/cable" element={<Cable />} />
      <Route path="/fund-wallet" element={<FundWallet />} />
      <Route path="/confirm-wallet-fund" element={<AddNewCard />} />
      <Route path="/proceed-to-gateway" element={<GatewayPage />} />
      <Route path="/beneficiaries" element={<Beneficairies />} />
      <Route path="/african-stores" element={<AfricanStores />} />
      <Route path="/transaction-history" element={<TransactionHistory />} />
      <Route path="axa-investment-managers">
        <Route index element={<AxaInvestments />} />
        <Route path=":id" element={<AxaPayment />} />
      </Route>
      <Route path="/axa-investment-managers" element={<AxaInvestments />} />
      <Route path="export">
        <Route index element={<Exports />} />
        <Route path=":id" element={<ExportStorePage />} />
      </Route>
      <Route path="/saved-items" element={<SavedItems />} />
      <Route path="/order-success" element={<OrderPlacedPage />} />
      <Route path="/bill-payments" element={<BillPayments />} />
      <Route
        path="/order-confirmation"
        element={<OrderWithCardConfirmation />}
      />
      <Route
        path="/fund-wallet/confirmation"
        element={<FundingConfirmation />}
      />
      <Route path="insurance-services">
        <Route index element={<InsurancePage />} />
        <Route path=":id" element={<InsuranceCheckOut />} />
      </Route>
      {/* 404 Page */}
      <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
);

export default router;
