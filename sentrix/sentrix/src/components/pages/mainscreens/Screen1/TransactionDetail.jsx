import PageContainer from "../../../../components/Reusable UI components/layout/PageContainer";
import TransactionTable from "../../../../components/Reusable UI components/tables/TransactionTable";

const sampleTransactions = [
    { id: "TX-001", amount: "₦19,500", merchant: "Shop A", risk: "Low", date: "2026-03-20" },
    { id: "TX-002", amount: "₦95,000", merchant: "Vendor B", risk: "High", date: "2026-03-20" },
    { id: "TX-003", amount: "₦57,200", merchant: "Merchant C", risk: "Medium", date: "2026-03-19" },
];

function TransactionDetail() {
    return (
        <PageContainer title="Transaction Details">
            <p className="text-textSecondary mb-3">Detailed view of transactions and risk metrics.</p>
            <TransactionTable rows={sampleTransactions} />
        </PageContainer>
    );
}

export default TransactionDetail;
