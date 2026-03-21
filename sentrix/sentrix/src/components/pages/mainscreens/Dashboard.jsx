import Navbar from "../../Reusable UI components/layout/Navbar";
import Card from "../../Reusable UI components/ui/Card";
import Badge from "../../Reusable UI components/ui/Badge";
import RiskChart from "../../Reusable UI components/charts/RiskChart";
import TransactionChart from "../../Reusable UI components/charts/TransactionChart";

const mockTransactions = [
    { id: 1, amount: "₦45,000", risk: "high", score: 75 },
    { id: 2, amount: "₦5,000", risk: "low", score: 20 },
    { id: 3, amount: "₦120,000", risk: "medium", score: 50 },
    { id: 4, amount: "₦8,400", risk: "low", score: 18 },
    { id: 5, amount: "₦30,000", risk: "medium", score: 42 },
];

function Dashboard() {
    return (
        <div>
            <Navbar />

            <div className="p-6 space-y-6">

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <p className="text-textSecondary">Total Transactions</p>
                        <h2 className="text-2xl font-bold">1,245</h2>
                    </Card>

                    <Card>
                        <p className="text-textSecondary">Flagged</p>
                        <h2 className="text-2xl font-bold text-riskHigh">32</h2>
                    </Card>

                    <Card>
                        <p className="text-textSecondary">Avg Risk Score</p>
                        <h2 className="text-2xl font-bold text-riskMedium">48</h2>
                    </Card>
                </div>

                {/* Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <Card className="lg:col-span-2">
                        <h2 className="mb-4 font-semibold">Live Transactions</h2>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {mockTransactions.map((tx) => (
                                <div
                                    key={tx.id}
                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-border py-2"
                                >
                                    <div>
                                        <p className="font-medium">{tx.amount}</p>
                                        <p className="text-xs text-textSecondary">
                                            Transaction #{tx.id}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                        <p className="font-semibold">{tx.score}</p>
                                        <Badge type={tx.risk} text={tx.risk.toUpperCase()} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 gap-4">
                        <RiskChart />
                        <TransactionChart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;