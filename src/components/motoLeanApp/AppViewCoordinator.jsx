import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppHome from "./AppHome";
import AppInstructions from "./AppInstructions";
import AppRecord from "./AppRecord";
import AppResults from "./AppResults";
import AppSubmit from "./AppSubmit";

const appViews = {
    HOME: "HOME",
    INSTRUCTIONS: "INSTRUCTIONS",
    RECORD: "RECORD",
    RESULTS: "RESULTS",
    SUBMIT: "SUBMIT"
};

export default function AppViewCoordinator () {
    const [currentView, setCurrentView] = useState(appViews.HOME);
    const navigate = useNavigate();

    const renderCurrentView = () => {
        switch(currentView) {
            case appViews.HOME:
                return (
                    <AppHome />
                );
            case appViews.INSTRUCTIONS:
                return (
                    <AppInstructions />
                );
            case appViews.RECORD:
                return (
                    <AppRecord />
                );
            case appViews.RESULTS:
                return (
                    <AppResults />
                );
            case appViews.SUBMIT:
                return (
                    <AppSubmit />
                );
        
        
        }
    };

    return (
        <div>
            {renderCurrentView()}
        </div>
    );
}