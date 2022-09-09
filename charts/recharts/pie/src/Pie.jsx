import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import numeral from "numeral";
import { useData } from "@motor-js/engine";

const PieExampleCompact = () => {
  const colors = [
    "#B03060",
    "#FE9A76",
    "#FFD700",
    "#32CD32",
    "#016936",
    "#008080",
    "#0E6EB8",
    "#EE82EE",
    "#B413EC",
    "#FF1493",
    "#A52A2A",
    "#A0A0A0",
    "#000000",
  ];

  const cols = [
    {
      qField: "[Porte2]",
      qLabel: "Porte",
    },
    {
      qField: "=count(NUM_CNPJ)",
      qLabel: "TOTAL EMPRESAS",
      // useFormatting: true,
      // qNumType: "M",
      // qNumFmt: "£#,##0",
    },
  ];

  const { dataSet, select } = useData({
    cols,
  });
  

  const { data, dataKeys, nameKey } = dataSet;

  return (
    <ResponsiveContainer width="100%" height={250}>
      {data ? (
        <PieChart margin={50}>
          {dataKeys &&
            dataKeys.map((key, index) => (
              <Pie
                nameKey={nameKey}
                key={index}
                dataKey={key}
                isAnimationActive={false}
                data={data}
                label={(value) => numeral(value.percent).format("0.00%")}
                onClick={(c) => select(0, [c.elemNumber], false)}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            ))}
          <Legend />
          <Tooltip />
        </PieChart>
      ) : (
        <h1>loading</h1>
      )}
    </ResponsiveContainer>
  );
};

export default PieExampleCompact;
