import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LABELS } from "../utilities/constants";
import { ROUTES } from "../utilities/routes";
import { useTicketsContext } from "../hooks/useTicketsContext";
import { ticketAction } from "../store/actions/actionTypes";
import { useEffect } from "react";
import PieGraph from "../components/graphs/pieGraph";
import Button from "../components/elements/button";

const Dashboard = () => {
  const { state, dispatch } = useTicketsContext();
  const [pieGraphData, setPieGraphData] = useState([
    { name: "Active Tickets", value: state.tickets.length },
    { name: "Deleted Tickets", value: state.recentlyDeleted.length },
  ]);
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate(ROUTES.CREATE);
  };

  const handleDataImport = () => {
    dispatch({ type: ticketAction.IMPORT_DUMMY_DATA });
  };

  useEffect(() => {
    setPieGraphData([
      { name: "Active Tickets", value: state.tickets.length },
      { name: "Deleted Tickets", value: state.recentlyDeleted.length },
    ]);
  }, [state.tickets, state.recentlyDeleted]);

  return (
    <div className="h-full flex flex-col items-center justify-between text-center p-4 bg-white-50 ">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          {LABELS.MAIN_HEADING_DASHBOARD}{" "}
          {!state.import.status ? (
            <Button
              btnSecondary
              id="import-data-btn"
              type="button"
              isDisabled={false}
              label={LABELS.IMPORT_DUMMY_DATA}
              onClickHandler={handleDataImport}
            />
          ) : null}
        </h1>
        <p className="text-lg mb-6">{LABELS.SUB_HEADING_DASHBOARD}</p>
      </div>
      <section className="flex flex-col justify-center items-center gap-6 mb-6">
        <PieGraph pieGraphData={pieGraphData} />
      </section>

      <div className="flex flex-col gap-4">
        <Button
          id="create-ticket-btn"
          type="button"
          isDisabled={false}
          label={LABELS.CREATE_NEW_TICKET}
          onClickHandler={handleCTAClick}
        />
      </div>
    </div>
  );
};

export default Dashboard;
