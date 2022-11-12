import CreateTicket from "../../components/create-ticket";
import Header from "../../components/header";
import RecentTickets from "../../components/recent-tickets";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <CreateTicket />
      <RecentTickets />
    </div>
  );
};

export default Dashboard;
