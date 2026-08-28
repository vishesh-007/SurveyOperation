import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import ApplicationLayout from "../components/layout/ApplicationLayout";
import SurveyPage from "../pages/SurveyPage";
import PracticeDataRequestPage from "../pages/PracticeDataRequestPage";

const AppRoutes = () => {
    return (
        <Routes>

            <Route
                element={<ApplicationLayout />}
            >

                <Route
                    path="/surveys"
                    element={<SurveyPage />}
                />

                <Route
                    path="/practice-data-request"
                    element={<PracticeDataRequestPage />}
                />

            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to="/surveys"
                        replace
                    />
                }
            />

        </Routes>
    );
};

export default AppRoutes;