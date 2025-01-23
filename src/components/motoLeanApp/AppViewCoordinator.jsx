import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoggerProvider } from "./LoggerProvider";

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
  SUBMIT: "SUBMIT",
};

export default function AppViewCoordinator() {
  const [currentView, setCurrentView] = useState(appViews.HOME);
  const navigate = useNavigate();

  const navigationHandlers = {
    goToHome: () => setCurrentView(appViews.HOME),
    goToInstructions: () => setCurrentView(appViews.INSTRUCTIONS),
    goToRecord: () => setCurrentView(appViews.RECORD),
    goToResults: () => setCurrentView(appViews.RESULTS),
    goToSubmit: () => setCurrentView(appViews.SUBMIT),
    goToDBRecords: () => navigate("/results"),
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case appViews.HOME:
        return (
          <AppHome
            onStart={navigationHandlers.goToInstructions}
            onViewResults={navigationHandlers.goToDBRecords}
          />
        );
      case appViews.INSTRUCTIONS:
        return <AppInstructions onStartRide={navigationHandlers.goToRecord} />;
      case appViews.RECORD:
        return <AppRecord onEndRide={navigationHandlers.goToResults} />;
      case appViews.RESULTS:
        return (
          <AppResults
            onBackToRide={navigationHandlers.goToRecord}
            onRestartRide={navigationHandlers.goToRecord}
            onSubmitRide={navigationHandlers.goToSubmit}
          />
        );
      case appViews.SUBMIT:
        return (
          <AppSubmit
            onHome={navigationHandlers.goToHome}
            onSubmitRideToDB={navigationHandlers.goToDBRecords}
            onBackToResults={navigationHandlers.goToResults}
          />
        );
      default:
        return (
          <AppHome
            onStart={navigationHandlers.goToInstructions}
            onViewResults={navigationHandlers.goToDBRecords}
          />
        );
    }
  };

  return (
    <div className="h-dvh overflow-x-hidden overflow-y-auto">
      <LoggerProvider>{renderCurrentView()}</LoggerProvider>
    </div>
  );
}
