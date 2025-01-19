/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { LABELS } from "../../utilities/constants";

const COLORS = ["#0088FE", "#FF8042"];

const PieGraph = ({ pieGraphData }) => {
 
  return (
    <>
      <h1 className="text-xl font-bold mb-4">
        {LABELS.ACTIVE_VS_DELETED}
      </h1>
     {pieGraphData.length ? <PieChart width={400} height={400}>
        <Pie
          data={pieGraphData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {pieGraphData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart> : LABELS.NO_DATA_FOR_GRAPH}
    </>
  );
};

export default PieGraph;
