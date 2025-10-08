import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MetricsGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="energy" stroke="#8884d8" dot={false} />
        <Line type="monotone" dataKey="momentum" stroke="#82ca9d" dot={false} />
        <Line type="monotone" dataKey="angularMomentum" stroke="#ff7300" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
