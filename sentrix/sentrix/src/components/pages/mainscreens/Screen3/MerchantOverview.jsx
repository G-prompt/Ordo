import PageContainer from "../../../../components/Reusable UI components/layout/PageContainer";
import MerchantTable from "../../../../components/Reusable UI components/tables/MerchantTable";

const sampleMerchants = [
    { name: "Smart Retail", riskScore: 72, txCount: 423, status: "Monitoring" },
    { name: "QuickPay", riskScore: 38, txCount: 218, status: "Normal" },
    { name: "Urban Store", riskScore: 89, txCount: 122, status: "Flagged" },
];

function MerchantOverview() {
    return (
        <PageContainer title="Merchant Overview">
            <p className="text-textSecondary mb-3">Review merchants, risk, and transaction volumes.</p>
            <MerchantTable merchants={sampleMerchants} />
        </PageContainer>
    );
}

export default MerchantOverview;
