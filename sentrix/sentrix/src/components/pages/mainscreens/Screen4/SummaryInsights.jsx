import PageContainer from "../../../../components/Reusable UI components/layout/PageContainer";

function SummaryInsights() {
    return (
        <PageContainer title="Summary Insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-2xl p-4">
                    <h3 className="font-semibold">Chargeback Rate</h3>
                    <p className="text-6xl font-bold text-riskMedium">2.3%</p>
                    <p className="text-textSecondary mt-2">Healthy trend; keep monitoring.</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-4">
                    <h3 className="font-semibold">Failed Payment Rate</h3>
                    <p className="text-6xl font-bold text-riskHigh">4.1%</p>
                    <p className="text-textSecondary mt-2">Alert on spike in the last 24h.</p>
                </div>
            </div>
        </PageContainer>
    );
}

export default SummaryInsights;
