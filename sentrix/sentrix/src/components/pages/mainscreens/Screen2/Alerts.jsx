import PageContainer from "../../../../components/Reusable UI components/layout/PageContainer";

const sampleAlerts = [
    { id: 1, title: "High-risk merchant", description: "Merchant B reached risk score 95." },
    { id: 2, title: "Suspicious volume", description: "Unusual large transaction detected." },
    { id: 3, title: "Login anomaly", description: "Admin signin from new location." },
];

function Alerts() {
    return (
        <PageContainer title="Alerts">
            <div className="space-y-3">
                {sampleAlerts.map((alert) => (
                    <div key={alert.id} className="border border-border bg-card rounded-lg p-3">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <p className="text-textSecondary">{alert.description}</p>
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}

export default Alerts;
